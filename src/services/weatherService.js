// Weather Service
// Every value shown in the app comes from Open-Meteo (Forecast, Multi-Model, Air Quality / Pollen, Marine).
// Derived indices (lifestyle scores, sun exposure, barometric trend) are computed from those real values.
// No simulated or random data: when the network fails the caller gets an error (and may show cached data).

const API_KEY = import.meta.env.VITE_OPEN_METEO_API_KEY || "";

// Commercial plan uses the customer-* hosts with an API key; without a key the free
// (non-commercial, development only) endpoints are used.
export function apiUrl(service, path, params) {
  const host = API_KEY ? `https://customer-${service}.open-meteo.com` : `https://${service}.open-meteo.com`;
  const query = new URLSearchParams(params);
  if (API_KEY) query.set("apikey", API_KEY);
  return `${host}${path}?${query.toString()}`;
}

export const COMPARISON_MODELS = [
  { id: "ecmwf_ifs025", name: "ECMWF IFS", origin: "EU", resolution: "25 km" },
  { id: "gfs_seamless", name: "NOAA GFS", origin: "US", resolution: "13–25 km" },
  { id: "icon_seamless", name: "DWD ICON", origin: "DE", resolution: "2–11 km" },
  { id: "meteofrance_seamless", name: "Météo-France ARPEGE/AROME", origin: "FR", resolution: "1.5–25 km" },
  { id: "ukmo_seamless", name: "UK Met Office", origin: "GB", resolution: "2–10 km" }
];

const POLLEN_TYPES = ["alder", "birch", "grass", "mugwort", "olive", "ragweed"];

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchCompleteWeather(lat, lon, timezone = "auto") {
  const tz = timezone || "auto";

  const forecastUrl = apiUrl("api", "/v1/forecast", {
    latitude: lat,
    longitude: lon,
    timezone: tz,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
    minutely_15: "precipitation",
    forecast_minutely_15: 8,
    hourly: "temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day",
    past_hours: 24,
    forecast_hours: 168,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant",
    forecast_days: 14
  });

  const modelsUrl = apiUrl("api", "/v1/forecast", {
    latitude: lat,
    longitude: lon,
    timezone: tz,
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
    models: COMPARISON_MODELS.map(m => m.id).join(","),
    forecast_days: 2
  });

  const aqiUrl = apiUrl("air-quality-api", "/v1/air-quality", {
    latitude: lat,
    longitude: lon,
    timezone: tz,
    current: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi," + POLLEN_TYPES.map(p => `${p}_pollen`).join(",")
  });

  const marineUrl = apiUrl("marine-api", "/v1/marine", {
    latitude: lat,
    longitude: lon,
    timezone: tz,
    current: "wave_height,wave_direction,wave_period,sea_surface_temperature"
  });

  // The forecast is mandatory; the other sources are optional and their sections are hidden when missing.
  const [forecast, modelsRes, aqiRes, marineRes] = await Promise.allSettled([
    getJson(forecastUrl),
    getJson(modelsUrl),
    getJson(aqiUrl),
    getJson(marineUrl)
  ]);

  if (forecast.status !== "fulfilled" || !forecast.value.current) {
    throw new Error("Forecast unavailable");
  }

  return processRawWeatherData(
    forecast.value,
    modelsRes.status === "fulfilled" ? modelsRes.value : null,
    aqiRes.status === "fulfilled" ? aqiRes.value : null,
    marineRes.status === "fulfilled" ? marineRes.value : null,
    lat,
    lon
  );
}

// Lightweight current conditions for several points in a single request (route weather).
export async function fetchPointsWeather(points) {
  const url = apiUrl("api", "/v1/forecast", {
    latitude: points.map(p => p.lat.toFixed(4)).join(","),
    longitude: points.map(p => p.lon.toFixed(4)).join(","),
    timezone: "auto",
    current: "temperature_2m,weather_code,is_day,precipitation,wind_speed_10m,wind_gusts_10m,visibility",
    hourly: "visibility",
    forecast_hours: 1
  });
  const data = await getJson(url);
  const list = Array.isArray(data) ? data : [data];
  return list.map(d => ({
    temp: d.current.temperature_2m,
    code: d.current.weather_code,
    meta: getWeatherCodeMeta(d.current.weather_code, d.current.is_day),
    precipitation: d.current.precipitation,
    windSpeed: Math.round(d.current.wind_speed_10m),
    windGusts: Math.round(d.current.wind_gusts_10m),
    visibilityKm: d.hourly && d.hourly.visibility ? Math.round(d.hourly.visibility[0] / 1000) : null
  }));
}

// Convert WMO weather codes to semantic representations
export function getWeatherCodeMeta(code, isDay = 1) {
  switch (code) {
    case 0:
      return { key: "clearSky", icon: isDay ? "sun" : "moon", skyType: isDay ? "sunny" : "clear_night", precipitationIntensity: 0 };
    case 1:
      return { key: "mainlyClear", icon: isDay ? "sun" : "moon", skyType: isDay ? "mostly_sunny" : "clear_night", precipitationIntensity: 0 };
    case 2:
      return { key: "partlyCloudy", icon: isDay ? "cloud-sun" : "cloud-moon", skyType: "partly_cloudy", precipitationIntensity: 0 };
    case 3:
      return { key: "overcast", icon: "cloud", skyType: "overcast", precipitationIntensity: 0 };
    case 45:
    case 48:
      return { key: code === 48 ? "rimeFog" : "fog", icon: "cloud-fog", skyType: "fog", precipitationIntensity: 0 };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { key: code === 51 || code === 56 ? "drizzleLight" : code === 53 ? "drizzleMod" : "drizzleDense", icon: "cloud-drizzle", skyType: "rain", precipitationIntensity: 0.15 };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { key: code === 61 || code === 66 ? "rainSlight" : code === 63 ? "rainMod" : "rainHeavy", icon: "cloud-rain", skyType: "rain", precipitationIntensity: code === 61 || code === 66 ? 0.3 : code === 63 ? 0.6 : 0.95 };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { key: code === 71 || code === 77 || code === 85 ? "snowSlight" : code === 73 ? "snowMod" : "snowHeavy", icon: "snowflake", skyType: "snow", precipitationIntensity: code === 71 || code === 77 || code === 85 ? 0.3 : 0.8 };
    case 80:
    case 81:
    case 82:
      return { key: code === 80 ? "rainSlight" : code === 81 ? "rainMod" : "rainHeavy", icon: "cloud-rain", skyType: "rain", precipitationIntensity: code === 80 ? 0.4 : code === 81 ? 0.7 : 0.95 };
    case 95:
    case 96:
    case 99:
      return { key: code === 95 ? "thunderstorm" : "thunderstormHail", icon: "cloud-lightning", skyType: "thunderstorm", precipitationIntensity: 1.0 };
    default:
      return { key: "partlyCloudy", icon: "cloud-sun", skyType: "partly_cloudy", precipitationIntensity: 0 };
  }
}

const round1 = (v) => Math.round(v * 10) / 10;

function processRawWeatherData(forecast, modelsData, aqi, marine, lat, lon) {
  const current = forecast.current;
  const hourly = forecast.hourly;
  const daily = forecast.daily;

  const currentMeta = getWeatherCodeMeta(current.weather_code, current.is_day);

  // Hourly series starts 24h in the past: find the slot of the current hour.
  const currentHourPrefix = current.time.slice(0, 13);
  let nowIdx = hourly.time.findIndex(t => t.slice(0, 13) === currentHourPrefix);
  if (nowIdx < 0) nowIdx = 24;

  const toHour = (i) => {
    const code = hourly.weather_code[i];
    const isDay = hourly.is_day[i];
    return {
      time: hourly.time[i],
      hour: parseInt(hourly.time[i].slice(11, 13), 10),
      temp: round1(hourly.temperature_2m[i]),
      feelsLike: round1(hourly.apparent_temperature[i]),
      humidity: hourly.relative_humidity_2m[i],
      dewPoint: round1(hourly.dew_point_2m[i]),
      rainProb: hourly.precipitation_probability[i] ?? 0,
      precipitation: hourly.precipitation[i] ?? 0,
      code,
      isDay,
      meta: getWeatherCodeMeta(code, isDay),
      pressure: Math.round(hourly.pressure_msl[i]),
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
      windDirection: hourly.wind_direction_10m[i],
      windGusts: Math.round(hourly.wind_gusts_10m[i]),
      uvIndex: round1(hourly.uv_index[i] ?? 0),
      cloudCover: hourly.cloud_cover[i],
      visibility: hourly.visibility[i] != null ? Math.round(hourly.visibility[i] / 1000) : null
    };
  };

  const hourlyList = [];
  for (let i = nowIdx; i < Math.min(hourly.time.length, nowIdx + 48); i++) hourlyList.push(toHour(i));
  const next7Days = [];
  for (let i = nowIdx; i < hourly.time.length; i++) next7Days.push(toHour(i));
  const yesterdaySameHour = nowIdx >= 24 ? toHour(nowIdx - 24) : null;

  const dailyList = daily.time.map((date, d) => ({
    date,
    tempMax: Math.round(daily.temperature_2m_max[d]),
    tempMin: Math.round(daily.temperature_2m_min[d]),
    code: daily.weather_code[d],
    meta: getWeatherCodeMeta(daily.weather_code[d], 1),
    rainProb: daily.precipitation_probability_max[d] ?? 0,
    precipitationSum: round1(daily.precipitation_sum[d] ?? 0),
    windSpeedMax: Math.round(daily.wind_speed_10m_max[d]),
    windGustsMax: Math.round(daily.wind_gusts_10m_max[d]),
    uvIndexMax: round1(daily.uv_index_max[d] ?? 0),
    sunrise: daily.sunrise[d],
    sunset: daily.sunset[d],
    daylightHours: daily.daylight_duration ? round1(daily.daylight_duration[d] / 3600) : null
  }));

  const temp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;
  const uv = hourlyList[0] ? hourlyList[0].uvIndex : 0;

  const nowcast = buildNowcast(forecast.minutely_15);
  const models = buildModelComparison(modelsData);
  const biometeo = calculateBiometeorology(hourlyList, uv);
  const airQuality = buildAirQuality(aqi);
  const marineData = buildMarine(marine);
  const lifestyle = calculateLifestyleIndices(temp, humidity, wind, current.precipitation, currentMeta.precipitationIntensity, uv, hourlyList, current.cloud_cover);
  const sunMoon = calculateSunAndMoon(dailyList[0]);

  const comparison = yesterdaySameHour ? {
    vsYesterdayTemp: round1(temp - yesterdaySameHour.temp),
    vsYesterdayHumidity: Math.round(humidity - yesterdaySameHour.humidity)
  } : null;

  const alert = assessForecastHazards(hourlyList.slice(0, 24));

  return {
    updatedAt: Date.now(),
    observedAt: current.time,
    coordinates: { lat, lon, elevation: Math.round(forecast.elevation ?? 0) },
    current: {
      temp: round1(temp),
      feelsLike: round1(current.apparent_temperature),
      tempMax: dailyList[0] ? dailyList[0].tempMax : null,
      tempMin: dailyList[0] ? dailyList[0].tempMin : null,
      humidity,
      dewPoint: hourlyList[0] ? hourlyList[0].dewPoint : null,
      pressure: Math.round(current.pressure_msl),
      windSpeed: Math.round(wind),
      windDirection: current.wind_direction_10m,
      windGusts: Math.round(current.wind_gusts_10m),
      uvIndex: uv,
      cloudCover: current.cloud_cover,
      precipitation: current.precipitation,
      rainProbability: hourlyList[0] ? hourlyList[0].rainProb : null,
      visibility: hourlyList[0] ? hourlyList[0].visibility : null,
      isDay: current.is_day,
      weatherCode: current.weather_code,
      meta: currentMeta
    },
    nowcast,
    hourly: hourlyList,
    hourly7d: next7Days,
    daily: dailyList,
    models,
    biometeo,
    airQuality,
    marine: marineData,
    lifestyle,
    sunMoon,
    comparison,
    alert
  };
}

// Precipitation in the next 2 hours from the 15-minute forecast (high resolution in Europe / North America).
function buildNowcast(minutely) {
  if (!minutely || !minutely.time || !minutely.precipitation) return null;
  const slots = minutely.time.map((time, i) => ({
    time,
    minute: i * 15,
    mm: minutely.precipitation[i] ?? 0
  }));
  const wet = (s) => s.mm >= 0.1;
  const rainingNow = slots[0] && wet(slots[0]);
  let statusKey = "noPrecip";
  let targetMinute = null;
  if (rainingNow) {
    const stop = slots.findIndex(s => !wet(s));
    if (stop > 0) {
      statusKey = "endingSoon";
      targetMinute = slots[stop].minute;
    } else {
      statusKey = "continuing";
    }
  } else {
    const start = slots.findIndex(wet);
    if (start > 0) {
      const peak = Math.max(...slots.map(s => s.mm));
      statusKey = peak >= 2 ? "heavyRain" : peak >= 0.5 ? "moderateRain" : "lightRainSoon";
      targetMinute = slots[start].minute;
    }
  }
  return { statusKey, targetMinute, timeline: slots };
}

// Real comparison of today's forecast from several global/regional models.
function buildModelComparison(data) {
  if (!data || !data.daily) return null;
  const d = data.daily;
  const models = COMPARISON_MODELS.map(m => {
    const max = d[`temperature_2m_max_${m.id}`];
    const min = d[`temperature_2m_min_${m.id}`];
    const rain = d[`precipitation_sum_${m.id}`];
    const windMax = d[`wind_speed_10m_max_${m.id}`];
    if (!max || max[0] == null) return null;
    return {
      ...m,
      tempMax: round1(max[0]),
      tempMin: min && min[0] != null ? round1(min[0]) : null,
      rainMm: rain && rain[0] != null ? round1(rain[0]) : null,
      wind: windMax && windMax[0] != null ? Math.round(windMax[0]) : null
    };
  }).filter(Boolean);

  if (models.length < 2) return null;

  const maxes = models.map(m => m.tempMax);
  const consensusTemp = round1(maxes.reduce((a, b) => a + b, 0) / maxes.length);
  const spread = round1(Math.max(...maxes) - Math.min(...maxes));
  const rains = models.map(m => m.rainMm).filter(v => v != null);
  const rainDisagreement = rains.length ? Math.max(...rains) - Math.min(...rains) : 0;
  // Agreement level: how close the models are on temperature and rain.
  let agreementKey = "agreementHigh";
  if (spread > 3 || rainDisagreement > 10) agreementKey = "agreementLow";
  else if (spread > 1.5 || rainDisagreement > 3) agreementKey = "agreementMedium";

  return { consensusTemp, spread, agreementKey, models };
}

function buildAirQuality(aqi) {
  if (!aqi || !aqi.current) return null;
  const c = aqi.current;
  const v = (x) => (x == null ? null : round1(x));
  const pollenValues = {};
  let hasPollen = false;
  for (const p of POLLEN_TYPES) {
    const val = c[`${p}_pollen`];
    pollenValues[p] = val == null ? null : round1(val);
    if (val != null) hasPollen = true;
  }
  return {
    usAqi: c.us_aqi ?? null,
    europeanAqi: c.european_aqi ?? null,
    pm25: v(c.pm2_5),
    pm10: v(c.pm10),
    o3: v(c.ozone),
    no2: v(c.nitrogen_dioxide),
    so2: v(c.sulphur_dioxide),
    co: v(c.carbon_monoxide),
    // Pollen is only modelled for Europe (CAMS); elsewhere the section is hidden.
    pollen: hasPollen ? pollenValues : null
  };
}

function buildMarine(marine) {
  if (!marine || !marine.current || marine.current.wave_height == null) return null;
  const c = marine.current;
  return {
    waveHeight: round1(c.wave_height),
    waveDirection: c.wave_direction,
    wavePeriod: c.wave_period != null ? round1(c.wave_period) : null,
    seaTemp: c.sea_surface_temperature != null ? round1(c.sea_surface_temperature) : null
  };
}

// Pollen level per CAMS/EAN thresholds (grains/m³)
export function pollenLevel(type, value) {
  if (value == null) return null;
  const thresholds = {
    alder: [10, 50, 100], birch: [10, 50, 100], olive: [10, 50, 200],
    grass: [5, 25, 50], mugwort: [5, 25, 50], ragweed: [5, 15, 30]
  }[type] || [10, 50, 100];
  if (value < thresholds[0]) return "low";
  if (value < thresholds[1]) return "medium";
  if (value < thresholds[2]) return "high";
  return "veryHigh";
}

// European AQI bands → advice key
export function aqiBand(europeanAqi, usAqi) {
  if (europeanAqi != null) {
    if (europeanAqi <= 20) return "good";
    if (europeanAqi <= 40) return "fair";
    if (europeanAqi <= 60) return "moderate";
    if (europeanAqi <= 80) return "poor";
    if (europeanAqi <= 100) return "veryPoor";
    return "hazardous";
  }
  if (usAqi != null) {
    if (usAqi <= 50) return "good";
    if (usAqi <= 100) return "moderate";
    if (usAqi <= 150) return "poor";
    if (usAqi <= 200) return "veryPoor";
    return "hazardous";
  }
  return null;
}

function calculateBiometeorology(hourly, uv) {
  // Barometric trend over the next 3 hours (known migraine trigger for weather-sensitive people)
  const deltaPressure = hourly.length >= 4 ? Math.abs(hourly[3].pressure - hourly[0].pressure) : 0;

  let headacheRisk = "headacheLow";
  let headacheLevel = 1;
  if (deltaPressure >= 3.0) {
    headacheRisk = "headacheHigh";
    headacheLevel = 3;
  } else if (deltaPressure >= 1.5) {
    headacheRisk = "headacheModerate";
    headacheLevel = 2;
  }

  // Indicative time to sunburn by Fitzpatrick skin type (minimal erythema dose / UV index)
  const safe = (med) => (uv > 0 ? Math.round(med / uv) : null);
  const safeSunTimes = {
    typeI: safe(67),
    typeII: safe(100),
    typeIII: safe(135),
    typeIV: safe(200),
    typeV: safe(300)
  };

  return { deltaPressure: round1(deltaPressure), headacheRisk, headacheLevel, safeSunTimes };
}

function calculateLifestyleIndices(temp, humidity, wind, precip, precipIntensity, uv, hourly, cloudCover) {
  const next = (h) => hourly.slice(0, h);
  const maxRainProb = (h) => Math.max(0, ...next(h).map(x => x.rainProb));

  // Laundry drying: warm, dry, breezy, no rain in the next 6 hours
  let laundry = 90;
  if (precip > 0 || precipIntensity > 0) laundry = 5;
  else {
    if (humidity > 70) laundry -= (humidity - 70) * 1.5;
    if (temp < 15) laundry -= (15 - temp) * 2;
    if (wind < 5) laundry -= 10;
    else if (wind > 35) laundry -= 15;
    laundry -= maxRainProb(6) * 0.6;
  }
  laundry = clampScore(laundry);

  // Running: 8-20°C ideal, dry, calm
  let running = 95;
  if (precip > 0.5) running -= 40;
  if (temp < 5) running -= (5 - temp) * 3;
  if (temp > 24) running -= (temp - 24) * 4;
  if (humidity > 80) running -= 15;
  if (wind > 30) running -= 20;
  running = clampScore(running);

  // Car wash: driven by rain probability over the next 48 hours
  const carWash = clampScore(precip > 0 ? 5 : 100 - maxRainProb(48));

  // Stargazing: cloud cover tonight (next 12 hours, night slots only)
  const nightSlots = next(12).filter(h => !h.isDay);
  const nightCloud = nightSlots.length ? nightSlots.reduce((a, h) => a + h.cloudCover, 0) / nightSlots.length : cloudCover;
  const stargazing = clampScore(100 - nightCloud - (humidity > 85 ? 10 : 0));

  // BBQ & picnic
  let bbq = 90;
  if (precip > 0) bbq = 5;
  if (temp < 18) bbq -= (18 - temp) * 4;
  if (wind > 25) bbq -= 25;
  bbq -= maxRainProb(6) * 0.5;
  bbq = clampScore(bbq);

  return { laundry, running, carWash, stargazing, bbq, outfit: generateOutfitAdvice(temp, wind, precip, uv, maxRainProb(12)) };
}

function clampScore(v) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function generateOutfitAdvice(temp, wind, precip, uv, rainProb12h) {
  const items = [];
  if (precip > 0.2 || rainProb12h >= 50) items.push({ icon: "umbrella", textKey: "umbrellaNeeded" });
  if (temp < 5) items.push({ icon: "shirt", textKey: "heavyCoat" });
  else if (temp < 14) items.push({ icon: "shirt", textKey: "jacketSweater" });
  else if (temp < 23) items.push({ icon: "shirt", textKey: "lightLayers" });
  else items.push({ icon: "shirt", textKey: "summerClothes" });
  if (wind > 28) items.push({ icon: "wind", textKey: "windbreaker" });
  if (uv >= 5) items.push({ icon: "glasses", textKey: "sunglassesUv" });
  return items;
}

// Moon phase from the synodic cycle (astronomical approximation, ±1 day)
function calculateSunAndMoon(today) {
  const now = new Date();
  const refDate = new Date("2024-01-11T11:57:00Z"); // known new moon
  const diffDays = (now.getTime() - refDate.getTime()) / 86400000;
  const moonAge = (diffDays % 29.530588 + 29.530588) % 29.530588;

  let phaseKey = "new";
  if (moonAge < 1.84) phaseKey = "new";
  else if (moonAge < 5.53) phaseKey = "waxingCrescent";
  else if (moonAge < 9.22) phaseKey = "firstQuarter";
  else if (moonAge < 12.91) phaseKey = "waxingGibbous";
  else if (moonAge < 16.61) phaseKey = "full";
  else if (moonAge < 20.30) phaseKey = "waningGibbous";
  else if (moonAge < 23.99) phaseKey = "lastQuarter";
  else if (moonAge < 27.68) phaseKey = "waningCrescent";

  const hhmm = (s) => (s && s.includes("T") ? s.split("T")[1].slice(0, 5) : null);
  return {
    sunrise: today ? hhmm(today.sunrise) : null,
    sunset: today ? hhmm(today.sunset) : null,
    daylightHours: today ? today.daylightHours : null,
    moonPhase: phaseKey,
    illumination: Math.round((1 - Math.cos((moonAge / 29.530588) * 2 * Math.PI)) / 2 * 100),
    moonAge: round1(moonAge)
  };
}

// Hazard notice derived from the next 24 hours of forecast. This is NOT an official
// warning from a national weather service and the UI labels it accordingly.
function assessForecastHazards(next24) {
  if (!next24.length) return null;
  const maxGust = Math.max(...next24.map(h => h.windGusts));
  const maxHourlyRain = Math.max(...next24.map(h => h.precipitation));
  const totalRain = next24.reduce((a, h) => a + h.precipitation, 0);
  const codes = next24.map(h => h.code);
  const hasThunder = codes.some(c => c >= 95);
  const hasHeavySnow = codes.some(c => c === 75 || c === 86);
  const hasFog = codes.some(c => c === 45 || c === 48);

  const reasons = [];
  if (hasThunder) reasons.push("thunder");
  if (maxGust > 60) reasons.push("gusts");
  if (totalRain > 30 || maxHourlyRain > 10) reasons.push("heavyRain");
  if (hasHeavySnow) reasons.push("heavySnow");
  if (hasFog) reasons.push("fog");

  let severity = null;
  if ((hasThunder && maxGust > 85) || maxGust > 100 || totalRain > 80) severity = "red";
  else if (maxGust > 75 || totalRain > 40 || maxHourlyRain > 20 || hasHeavySnow || (hasThunder && maxHourlyRain > 10)) severity = "orange";
  else if (reasons.length) severity = "yellow";

  if (!severity) return null;
  return {
    severity,
    titleKey: severity === "red" ? "redWarning" : severity === "orange" ? "orangeWarning" : "yellowWarning",
    reasons,
    maxGust,
    totalRain: round1(totalRain)
  };
}
