// UI strings for the 10 app languages. Every key here is read by src/main.js.
export const translations = {
  it: {
    appName: "AETHERIA 3D",
    tagline: "Previsioni Meteo Iper-Dettagliate & Simulazione Globale 3D",
    searchPlaceholder: "Cerca qualsiasi città o paese nel mondo...",
    views: {
      globe: "Globo 3D",
      sky: "Simulatore Cielo 3D",
      dashboard: "Dashboard Dettagliata",
      radar: "Vento & Mare",
      route: "Meteo Percorso / Viaggio"
    },
    geo: {
      country: "Paese",
      region: "Regione / Stato",
      city: "Città / Località",
      currentLocation: "Posizione Corrente (GPS)",
      elevation: "Altitudine",
      otherPlaces: "Altre località"
    },
    current: {
      feelsLike: "Percepita",
      highLow: "Max / Min",
      humidity: "Umidità",
      dewPoint: "Punto di Rugiada",
      pressure: "Pressione Atmosferica",
      wind: "Vento",
      windGusts: "Raffiche fino a",
      visibility: "Visibilità",
      uvIndex: "Indice UV",
      cloudCover: "Copertura Nuvolosa"
    },
    minuteCast: {
      subtitle: "Previsione a intervalli di 15 minuti",
      noPrecip: "Nessuna precipitazione prevista nelle prossime 2 ore",
      lightRainSoon: "Pioggia leggera prevista tra",
      moderateRain: "Pioggia moderata in arrivo tra",
      heavyRain: "Rovesci intensi attesi tra",
      endingSoon: "Precipitazioni in attenuazione entro",
      minutes: "minuti",
      title: "Pioggia nelle prossime 2 ore",
      continuing: "Precipitazioni per almeno 2 ore",
      unavailable: "Previsione a breve termine non disponibile per questa località"
    },
    hourly: {
      title: "Previsioni Orarie Dettagliate (48 Ore)",
      now: "Adesso",
      scrubHelp: "Trascina per visualizzare l'evoluzione oraria nel simulatore 3D"
    },
    daily: {
      title: "Previsioni a 14 Giorni",
      today: "Oggi",
      tomorrow: "Domani"
    },
    models: {
      title: "Confronto tra modelli meteo",
      subtitle: "Previsione di oggi secondo i principali centri meteorologici",
      consensus: "Media dei modelli",
      confidence: "Affidabilità Previsionale",
      spread: "Differenza tra modelli",
      agreement: "Accordo tra modelli",
      agreementHigh: "Alto",
      agreementMedium: "Medio",
      agreementLow: "Basso",
      colModel: "Modello",
      colResolution: "Risoluzione",
      colMaxMin: "Max / Min",
      colRain: "Pioggia",
      colWind: "Vento max"
    },
    biometeo: {
      title: "Salute e benessere",
      headacheAlert: "Sensibilità barometrica",
      headacheLow: "Rischio Basso - Pressione stabile",
      headacheModerate: "Rischio Moderato - Calo pressorio in corso",
      headacheHigh: "Variazione rapida di pressione (>3 hPa in 3 ore)",
      maxSunExposure: "Tempo indicativo prima di scottarsi",
      sunMinutes: "minuti",
      pollenTitle: "Pollini (granuli/m³)",
      subtitle: "Variazione di pressione, esposizione al sole e pollini",
      skinTypeIII: "Pelle chiara-media (fototipo III)",
      noUv: "UV assente: nessun rischio di scottature",
      pollenNames: {
        alder: "Ontano",
        birch: "Betulla",
        grass: "Graminacee",
        mugwort: "Artemisia",
        olive: "Olivo",
        ragweed: "Ambrosia"
      },
      pollenLevels: {
        low: "Basso",
        medium: "Moderato",
        high: "Alto",
        veryHigh: "Molto alto"
      },
      pollenUnavailable: "Dati sui pollini disponibili solo per l'Europa"
    },
    aqi: {
      title: "Qualità dell'aria",
      good: "Ottima",
      fair: "Buona",
      moderate: "Moderata",
      poor: "Scadente",
      veryPoor: "Molto Scadente",
      hazardous: "Pericolosa",
      healthAdvice: "Consiglio Salute",
      noData: "Dati sulla qualità dell'aria non disponibili",
      pollutants: {
        o3: "Ozono (O₃)",
        no2: "Biossido di azoto (NO₂)",
        so2: "Biossido di zolfo (SO₂)",
        co: "Monossido di carbonio (CO)"
      },
      advice: {
        good: "Aria pulita: ideale per tutte le attività all'aperto.",
        fair: "Qualità buona: nessuna precauzione particolare.",
        moderate: "Le persone sensibili dovrebbero limitare gli sforzi prolungati all'aperto.",
        poor: "Evita attività sportive intense all'aperto.",
        veryPoor: "Limita il tempo all'aperto, soprattutto bambini, anziani e asmatici.",
        hazardous: "Resta al chiuso il più possibile e tieni le finestre chiuse."
      }
    },
    lifestyle: {
      title: "Attività e abbigliamento",
      outfitTitle: "Cosa mi metto oggi?",
      laundry: "Stendere Bucato",
      running: "Running & Sport",
      carWash: "Lavaggio Auto",
      stargazing: "Astronomia & Cielo Notturno",
      bbq: "Barbecue & Picnic",
      outfit: {
        umbrellaNeeded: "Porta l'ombrello o un impermeabile",
        heavyCoat: "Cappotto pesante, sciarpa e guanti",
        jacketSweater: "Giacca di mezza stagione e maglione",
        lightLayers: "Strati leggeri: camicia o felpa",
        summerClothes: "Abiti estivi leggeri e traspiranti",
        windbreaker: "Giacca antivento",
        sunglassesUv: "Occhiali da sole e crema solare"
      }
    },
    sunMoon: {
      sunrise: "Alba",
      sunset: "Tramonto",
      daylight: "Ore di Luce",
      moonPhase: "Fase Lunare",
      moonPhases: {
        new: "Luna Nuova",
        waxingCrescent: "Luna Crescente",
        firstQuarter: "Primo Quarto",
        waxingGibbous: "Gibbosa Crescente",
        full: "Luna Piena",
        waningGibbous: "Gibbosa Calante",
        lastQuarter: "Ultimo Quarto",
        waningCrescent: "Luna Calante"
      }
    },
    routeWeather: {
      title: "Meteo Percorso di Viaggio",
      subtitle: "Visualizza le condizioni meteorologiche lungo il tuo itinerario di guida o volo",
      calcRoute: "Calcola Meteo Itinerario",
      checkPoints: "Tappe Intermedie",
      routeAdvice: "Consiglio di Viaggio"
    },
    audio: {
      ambientSounds: "Audio Atmosferico 3D",
      rainSound: "Pioggia"
    },
    alerts: {
      yellowWarning: "Attenzione: fenomeni localmente intensi",
      orangeWarning: "Fenomeni intensi previsti",
      redWarning: "Fenomeni estremi previsti",
      notOfficial: "Avviso calcolato dalla previsione delle prossime 24 ore, non è un'allerta ufficiale. Consulta il servizio meteo nazionale.",
      reasons: {
        thunder: "temporali",
        gusts: "raffiche forti",
        heavyRain: "piogge abbondanti",
        heavySnow: "nevicate intense",
        fog: "nebbia"
      },
      maxGust: "Raffica max",
      totalRain: "Pioggia 24 h"
    },
    conditions: {
      clearSky: "Cielo Sereno",
      mainlyClear: "Prevalentemente Sereno",
      partlyCloudy: "Parzialmente Nuvoloso",
      overcast: "Coperto",
      fog: "Nebbia o Foschia Densa",
      rimeFog: "Nebbia con Galaverna",
      drizzleLight: "Pioviggine Leggera",
      drizzleMod: "Pioviggine Moderata",
      drizzleDense: "Pioviggine Intensa",
      rainSlight: "Pioggia Debole",
      rainMod: "Pioggia Moderata",
      rainHeavy: "Pioggia Intensa",
      snowSlight: "Nevicata Debole",
      snowMod: "Nevicata Moderata",
      snowHeavy: "Forte Nevicata",
      thunderstorm: "Temporale con Fulmini",
      thunderstormHail: "Temporale con Grandine",
      windy: "Vento Forte"
    },
    status: {
      updatedAt: "Aggiornato alle",
      offlineCached: "Connessione assente: stai vedendo i dati dell'ultimo aggiornamento.",
      loadError: "Impossibile caricare il meteo. Controlla la connessione.",
      retry: "Riprova",
      loading: "Caricamento del meteo…",
      slowLoading: "Prima volta per questa zona: il caricamento può richiedere fino a 30 secondi.",
      myLocation: "La mia posizione",
      gpsUnsupported: "La geolocalizzazione non è supportata da questo dispositivo.",
      gpsError: "Impossibile rilevare la posizione. Cerca una città manualmente.",
      dataSource: "Dati meteo: Open-Meteo.com (CC BY 4.0) · Città: GeoNames"
    },
    comparison: {
      vsYesterday: "Rispetto a ieri alla stessa ora",
      warmer: "più caldo",
      colder: "più freddo",
      same: "come ieri"
    },
    meteogram: {
      title: "Meteogramma 24 ore",
      subtitle: "Temperatura, punto di rugiada, pressione e pioggia"
    },
    windSea: {
      title: "Vento e mare",
      currentWind: "Vento attuale",
      direction: "Direzione",
      beaufort: "Scala Beaufort",
      force: "Forza",
      waveHeight: "Altezza onde",
      wavePeriod: "Periodo onde",
      seaTemp: "Temperatura del mare",
      noMarine: "Nessun dato marino: località lontana dal mare.",
      animationNote: "Animazione basata su velocità e direzione del vento attuali in questa località."
    },
    route: {
      originPlaceholder: "Città di partenza",
      destPlaceholder: "Città di arrivo",
      start: "Partenza",
      end: "Arrivo",
      waypoint: "Punto intermedio",
      calculating: "Calcolo in corso…",
      notFound: "Località non trovata:",
      error: "Impossibile calcolare il meteo del percorso.",
      straightLineNote: "Condizioni attuali in 5 punti lungo la linea diretta tra le due città (non il percorso stradale).",
      visibility: "Visibilità",
      advice: {
        good: "Nessun fenomeno significativo lungo il tragitto.",
        rain: "Pioggia in alcuni tratti: riduci la velocità e aumenta la distanza di sicurezza.",
        snow: "Neve lungo il tragitto: verifica gli obblighi di catene o pneumatici invernali.",
        storm: "Temporali lungo il tragitto: valuta di rimandare la partenza.",
        wind: "Raffiche forti: attenzione con veicoli alti e sui viadotti.",
        fog: "Visibilità ridotta per nebbia in alcuni tratti."
      }
    },
    globe: {
      today: "Satellite di oggi",
      relief: "Senza nuvole",
      rain: "Pioggia",
      cloudsDate: "Nuvole del",
      rainTime: "Pioggia stimata dai satelliti alle",
      source: "Immagini: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Immagini satellitari non disponibili: mostro la mappa salvata nell'app.",
      rainError: "Pioggia satellitare non disponibile al momento."
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "Il giorno e la notte seguono la posizione reale del Sole. Trascina per ruotare, usa + e − (o due dita) per lo zoom. «Satellite di oggi» mostra le nuvole reali fotografate dai satelliti NASA; «Pioggia» la stima satellitare delle precipitazioni più recente.",
      skyTitle: "Simulatore del cielo",
      skyText: "Usa il cursore per vedere il cielo nelle diverse ore del giorno, con le condizioni meteo attuali della località."
    }
  },
  en: {
    appName: "AETHERIA 3D",
    tagline: "Ultra-Detailed Weather Forecasts & Photorealistic 3D Globe",
    searchPlaceholder: "Search any city or country worldwide...",
    views: {
      globe: "3D Globe",
      sky: "3D Sky Simulator",
      dashboard: "Detailed Dashboard",
      radar: "Wind & Sea",
      route: "Trip & Route Weather"
    },
    geo: {
      country: "Country",
      region: "Region / State",
      city: "City / District",
      currentLocation: "Current Location (GPS)",
      elevation: "Elevation",
      otherPlaces: "Other places"
    },
    current: {
      feelsLike: "Feels Like",
      highLow: "High / Low",
      humidity: "Humidity",
      dewPoint: "Dew Point",
      pressure: "Atmospheric Pressure",
      wind: "Wind",
      windGusts: "Gusts up to",
      visibility: "Visibility",
      uvIndex: "UV Index",
      cloudCover: "Cloud Cover"
    },
    minuteCast: {
      subtitle: "Forecast in 15-minute steps",
      noPrecip: "No precipitation expected for at least 120 minutes",
      lightRainSoon: "Light rain expected in",
      moderateRain: "Moderate rain arriving in",
      heavyRain: "Heavy downpour expected in",
      endingSoon: "Precipitation easing off in",
      minutes: "minutes",
      title: "Rain in the next 2 hours",
      continuing: "Precipitation for at least 2 hours",
      unavailable: "Short-term forecast not available for this location"
    },
    hourly: {
      title: "Detailed Hourly Forecast (48 Hours)",
      now: "Now",
      scrubHelp: "Drag slider to preview dynamic 3D sky at that exact hour"
    },
    daily: {
      title: "14-Day Extended Forecast",
      today: "Today",
      tomorrow: "Tomorrow"
    },
    models: {
      title: "Weather model comparison",
      subtitle: "Today's forecast from the main weather centres",
      consensus: "Model average",
      confidence: "Forecast Confidence",
      spread: "Model spread",
      agreement: "Model agreement",
      agreementHigh: "High",
      agreementMedium: "Medium",
      agreementLow: "Low",
      colModel: "Model",
      colResolution: "Resolution",
      colMaxMin: "High / Low",
      colRain: "Rain",
      colWind: "Max wind"
    },
    biometeo: {
      title: "Health & wellbeing",
      headacheAlert: "Barometric sensitivity",
      headacheLow: "Low Risk - Pressure is stable",
      headacheModerate: "Moderate Risk - Pressure dropping",
      headacheHigh: "Rapid pressure change (>3 hPa in 3 hours)",
      maxSunExposure: "Approximate time to sunburn",
      sunMinutes: "minutes",
      pollenTitle: "Pollen (grains/m³)",
      subtitle: "Pressure changes, sun exposure and pollen",
      skinTypeIII: "Light-medium skin (type III)",
      noUv: "No UV: no sunburn risk",
      pollenNames: {
        alder: "Alder",
        birch: "Birch",
        grass: "Grass",
        mugwort: "Mugwort",
        olive: "Olive",
        ragweed: "Ragweed"
      },
      pollenLevels: {
        low: "Low",
        medium: "Moderate",
        high: "High",
        veryHigh: "Very high"
      },
      pollenUnavailable: "Pollen data is only available for Europe"
    },
    aqi: {
      title: "Air quality",
      good: "Excellent",
      fair: "Fair",
      moderate: "Moderate",
      poor: "Poor",
      veryPoor: "Very Poor",
      hazardous: "Hazardous",
      healthAdvice: "Health Advice",
      noData: "Air quality data not available",
      pollutants: {
        o3: "Ozone (O₃)",
        no2: "Nitrogen dioxide (NO₂)",
        so2: "Sulphur dioxide (SO₂)",
        co: "Carbon monoxide (CO)"
      },
      advice: {
        good: "Clean air: ideal for all outdoor activities.",
        fair: "Good air quality: no special precautions.",
        moderate: "Sensitive people should limit prolonged outdoor exertion.",
        poor: "Avoid intense outdoor exercise.",
        veryPoor: "Limit time outdoors, especially children, the elderly and people with asthma.",
        hazardous: "Stay indoors as much as possible and keep windows closed."
      }
    },
    lifestyle: {
      title: "Activities & clothing",
      outfitTitle: "What should I wear today?",
      laundry: "Outdoor Laundry Drying",
      running: "Running & Outdoor Sports",
      carWash: "Car Washing",
      stargazing: "Astronomy & Stargazing",
      bbq: "Barbecue & Picnic",
      outfit: {
        umbrellaNeeded: "Take an umbrella or a raincoat",
        heavyCoat: "Heavy coat, scarf and gloves",
        jacketSweater: "Light jacket and a sweater",
        lightLayers: "Light layers: shirt or hoodie",
        summerClothes: "Light, breathable summer clothes",
        windbreaker: "Windproof jacket",
        sunglassesUv: "Sunglasses and sunscreen"
      }
    },
    sunMoon: {
      sunrise: "Sunrise",
      sunset: "Sunset",
      daylight: "Daylight Hours",
      moonPhase: "Moon Phase",
      moonPhases: {
        new: "New Moon",
        waxingCrescent: "Waxing Crescent",
        firstQuarter: "First Quarter",
        waxingGibbous: "Waxing Gibbous",
        full: "Full Moon",
        waningGibbous: "Waning Gibbous",
        lastQuarter: "Last Quarter",
        waningCrescent: "Waning Crescent"
      }
    },
    routeWeather: {
      title: "Trip & Route Weather Planner",
      subtitle: "Inspect meteorological conditions along your driving or flight itinerary",
      calcRoute: "Analyze Route Weather",
      checkPoints: "Waypoints",
      routeAdvice: "Travel Recommendation"
    },
    audio: {
      ambientSounds: "3D Ambient Soundscape",
      rainSound: "Rainfall"
    },
    alerts: {
      yellowWarning: "Caution: locally intense weather",
      orangeWarning: "Severe weather expected",
      redWarning: "Extreme weather expected",
      notOfficial: "Notice computed from the next 24 hours of forecast, not an official warning. Check your national weather service.",
      reasons: {
        thunder: "thunderstorms",
        gusts: "strong gusts",
        heavyRain: "heavy rain",
        heavySnow: "heavy snow",
        fog: "fog"
      },
      maxGust: "Max gust",
      totalRain: "24 h rain"
    },
    conditions: {
      clearSky: "Clear Sky",
      mainlyClear: "Mainly Clear",
      partlyCloudy: "Partly Cloudy",
      overcast: "Overcast",
      fog: "Fog or Dense Mist",
      rimeFog: "Freezing Fog",
      drizzleLight: "Light Drizzle",
      drizzleMod: "Moderate Drizzle",
      drizzleDense: "Dense Drizzle",
      rainSlight: "Slight Rain",
      rainMod: "Moderate Rain",
      rainHeavy: "Heavy Rain",
      snowSlight: "Slight Snowfall",
      snowMod: "Moderate Snowfall",
      snowHeavy: "Heavy Snowstorm",
      thunderstorm: "Thunderstorm with Lightning",
      thunderstormHail: "Severe Thunderstorm with Hail",
      windy: "Strong Winds"
    },
    status: {
      updatedAt: "Updated at",
      offlineCached: "No connection: showing data from the last update.",
      loadError: "Could not load the weather. Check your connection.",
      retry: "Retry",
      loading: "Loading weather…",
      slowLoading: "First time for this area: loading can take up to 30 seconds.",
      myLocation: "My location",
      gpsUnsupported: "Geolocation is not supported on this device.",
      gpsError: "Could not get your location. Search for a city instead.",
      dataSource: "Weather data: Open-Meteo.com (CC BY 4.0) · Places: GeoNames"
    },
    comparison: {
      vsYesterday: "Compared with yesterday at this time",
      warmer: "warmer",
      colder: "colder",
      same: "same as yesterday"
    },
    meteogram: {
      title: "24-hour meteogram",
      subtitle: "Temperature, dew point, pressure and rain"
    },
    windSea: {
      title: "Wind & sea",
      currentWind: "Current wind",
      direction: "Direction",
      beaufort: "Beaufort scale",
      force: "Force",
      waveHeight: "Wave height",
      wavePeriod: "Wave period",
      seaTemp: "Sea temperature",
      noMarine: "No marine data: this location is far from the sea.",
      animationNote: "Animation based on the current wind speed and direction at this location."
    },
    route: {
      originPlaceholder: "Departure city",
      destPlaceholder: "Destination city",
      start: "Departure",
      end: "Arrival",
      waypoint: "Waypoint",
      calculating: "Calculating…",
      notFound: "Place not found:",
      error: "Could not calculate the route weather.",
      straightLineNote: "Current conditions at 5 points along the straight line between the two cities (not the road route).",
      visibility: "Visibility",
      advice: {
        good: "No significant weather along the way.",
        rain: "Rain on some stretches: slow down and keep a safe distance.",
        snow: "Snow along the way: check chain or winter tyre requirements.",
        storm: "Thunderstorms along the way: consider delaying your trip.",
        wind: "Strong gusts: take care with high-sided vehicles and on bridges.",
        fog: "Reduced visibility due to fog on some stretches."
      }
    },
    globe: {
      today: "Today's satellite",
      relief: "No clouds",
      rain: "Rain",
      cloudsDate: "Clouds of",
      rainTime: "Satellite rain estimate at",
      source: "Imagery: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Satellite imagery unavailable: showing the map stored in the app.",
      rainError: "Satellite rain is not available right now."
    },
    info: {
      globeTitle: "3D globe",
      globeText: "Day and night follow the real position of the Sun. Drag to rotate, use + and − (or two fingers) to zoom. “Today's satellite” shows the real clouds photographed by NASA satellites; “Rain” shows the latest satellite precipitation estimate.",
      skyTitle: "Sky simulator",
      skyText: "Use the slider to see the sky at different times of day, with the current weather at this location."
    }
  },
  es: {
    appName: "AETHERIA 3D",
    tagline: "Pronóstico Meteorológico Ultra Detallado y Globo 3D Fotorrealista",
    searchPlaceholder: "Buscar cualquier ciudad o país del mundo...",
    views: {
      globe: "Globo 3D",
      sky: "Simulador de Cielo 3D",
      dashboard: "Panel Detallado",
      radar: "Viento y mar",
      route: "Clima de Ruta / Viaje"
    },
    geo: {
      country: "País",
      region: "Región / Estado",
      city: "Ciudad / Localidad",
      currentLocation: "Ubicación Actual (GPS)",
      elevation: "Altitud",
      otherPlaces: "Otros lugares"
    },
    current: {
      feelsLike: "Sensación Térmica",
      highLow: "Máx / Mín",
      humidity: "Humedad",
      dewPoint: "Punto de Rocío",
      pressure: "Presión Atmosférica",
      wind: "Viento",
      windGusts: "Ráfagas hasta",
      visibility: "Visibilidad",
      uvIndex: "Índice UV",
      cloudCover: "Nubosidad"
    },
    minuteCast: {
      subtitle: "Previsión en intervalos de 15 minutos",
      noPrecip: "Sin precipitaciones en las próximas 2 horas",
      lightRainSoon: "Lluvia ligera esperada en",
      moderateRain: "Lluvia moderada en camino en",
      heavyRain: "Chubascos fuertes previstos en",
      endingSoon: "Precipitaciones cesando en",
      minutes: "minutos",
      title: "Lluvia en las próximas 2 horas",
      continuing: "Precipitación durante al menos 2 horas",
      unavailable: "Previsión a corto plazo no disponible para esta ubicación"
    },
    hourly: {
      title: "Pronóstico Horario Detallado (48 Horas)",
      now: "Ahora",
      scrubHelp: "Arrastra para previsualizar el cielo 3D en esa hora exacta"
    },
    daily: {
      title: "Pronóstico a 14 Días",
      today: "Hoy",
      tomorrow: "Mañana"
    },
    models: {
      title: "Comparación de modelos meteorológicos",
      subtitle: "Previsión de hoy según los principales centros meteorológicos",
      consensus: "Media de los modelos",
      confidence: "Confianza del Pronóstico",
      spread: "Diferencia entre modelos",
      agreement: "Acuerdo entre modelos",
      agreementHigh: "Alto",
      agreementMedium: "Medio",
      agreementLow: "Bajo",
      colModel: "Modelo",
      colResolution: "Resolución",
      colMaxMin: "Máx / Mín",
      colRain: "Lluvia",
      colWind: "Viento máx"
    },
    biometeo: {
      title: "Salud y bienestar",
      headacheAlert: "Sensibilidad barométrica",
      headacheLow: "Riesgo Bajo - Presión estable",
      headacheModerate: "Riesgo Moderado - Descenso de presión",
      headacheHigh: "Cambio rápido de presión (>3 hPa en 3 horas)",
      maxSunExposure: "Tiempo aproximado hasta quemarse",
      sunMinutes: "minutos",
      pollenTitle: "Polen (granos/m³)",
      subtitle: "Cambios de presión, exposición al sol y polen",
      skinTypeIII: "Piel clara-media (fototipo III)",
      noUv: "Sin UV: sin riesgo de quemaduras",
      pollenNames: {
        alder: "Aliso",
        birch: "Abedul",
        grass: "Gramíneas",
        mugwort: "Artemisa",
        olive: "Olivo",
        ragweed: "Ambrosía"
      },
      pollenLevels: {
        low: "Bajo",
        medium: "Moderado",
        high: "Alto",
        veryHigh: "Muy alto"
      },
      pollenUnavailable: "Datos de polen disponibles solo para Europa"
    },
    aqi: {
      title: "Calidad del aire",
      good: "Excelente",
      fair: "Buena",
      moderate: "Moderada",
      poor: "Mala",
      veryPoor: "Muy Mala",
      hazardous: "Peligrosa",
      healthAdvice: "Consejo de Salud",
      noData: "Datos de calidad del aire no disponibles",
      pollutants: {
        o3: "Ozono (O₃)",
        no2: "Dióxido de nitrógeno (NO₂)",
        so2: "Dióxido de azufre (SO₂)",
        co: "Monóxido de carbono (CO)"
      },
      advice: {
        good: "Aire limpio: ideal para cualquier actividad al aire libre.",
        fair: "Buena calidad: sin precauciones especiales.",
        moderate: "Las personas sensibles deberían limitar los esfuerzos prolongados al aire libre.",
        poor: "Evita el ejercicio intenso al aire libre.",
        veryPoor: "Limita el tiempo al aire libre, sobre todo niños, mayores y asmáticos.",
        hazardous: "Permanece en interiores lo máximo posible con las ventanas cerradas."
      }
    },
    lifestyle: {
      title: "Actividades y ropa",
      outfitTitle: "¿Qué me pongo hoy?",
      laundry: "Tender la Ropa",
      running: "Running y Deporte",
      carWash: "Lavado de Coche",
      stargazing: "Astronomía y Cielo Nocturno",
      bbq: "Barbacoa y Picnic",
      outfit: {
        umbrellaNeeded: "Lleva paraguas o chubasquero",
        heavyCoat: "Abrigo grueso, bufanda y guantes",
        jacketSweater: "Chaqueta ligera y jersey",
        lightLayers: "Capas ligeras: camisa o sudadera",
        summerClothes: "Ropa de verano ligera y transpirable",
        windbreaker: "Cortavientos",
        sunglassesUv: "Gafas de sol y protector solar"
      }
    },
    sunMoon: {
      sunrise: "Amanecer",
      sunset: "Atardecer",
      daylight: "Horas de Luz",
      moonPhase: "Fase Lunar",
      moonPhases: {
        new: "Luna Nueva",
        waxingCrescent: "Luna Creciente",
        firstQuarter: "Cuarto Creciente",
        waxingGibbous: "Gibosa Creciente",
        full: "Luna Llena",
        waningGibbous: "Gibosa Menguante",
        lastQuarter: "Cuarto Menguante",
        waningCrescent: "Luna Menguante"
      }
    },
    routeWeather: {
      title: "Clima para Rutas y Viajes",
      subtitle: "Consulta las condiciones climáticas a lo largo de tu viaje",
      calcRoute: "Calcular Clima de Ruta",
      checkPoints: "Puntos de Ruta",
      routeAdvice: "Consejo de Viaje"
    },
    audio: {
      ambientSounds: "Audio Atmosférico 3D",
      rainSound: "Lluvia"
    },
    alerts: {
      yellowWarning: "Atención: fenómenos localmente intensos",
      orangeWarning: "Se prevén fenómenos intensos",
      redWarning: "Se prevén fenómenos extremos",
      notOfficial: "Aviso calculado a partir de la previsión de las próximas 24 horas, no es una alerta oficial. Consulta el servicio meteorológico nacional.",
      reasons: {
        thunder: "tormentas",
        gusts: "rachas fuertes",
        heavyRain: "lluvias abundantes",
        heavySnow: "nevadas intensas",
        fog: "niebla"
      },
      maxGust: "Racha máx",
      totalRain: "Lluvia 24 h"
    },
    conditions: {
      clearSky: "Cielo Despejado",
      mainlyClear: "Mayormente Despejado",
      partlyCloudy: "Parcialmente Nublado",
      overcast: "Cubierto",
      fog: "Niebla o Neblina Densa",
      rimeFog: "Niebla Engelante",
      drizzleLight: "Llovizna Ligera",
      drizzleMod: "Llovizna Moderada",
      drizzleDense: "Llovizna Intensa",
      rainSlight: "Lluvia Débil",
      rainMod: "Lluvia Moderada",
      rainHeavy: "Lluvia Fuerte",
      snowSlight: "Nevada Débil",
      snowMod: "Nevada Moderada",
      snowHeavy: "Fuerte Nevada",
      thunderstorm: "Tormenta Eléctrica",
      thunderstormHail: "Tormenta con Granizo",
      windy: "Vientos Fuertes"
    },
    status: {
      updatedAt: "Actualizado a las",
      offlineCached: "Sin conexión: se muestran los datos de la última actualización.",
      loadError: "No se pudo cargar el tiempo. Comprueba la conexión.",
      retry: "Reintentar",
      loading: "Cargando el tiempo…",
      slowLoading: "Primera vez para esta zona: la carga puede tardar hasta 30 segundos.",
      myLocation: "Mi ubicación",
      gpsUnsupported: "La geolocalización no es compatible con este dispositivo.",
      gpsError: "No se pudo obtener tu ubicación. Busca una ciudad manualmente.",
      dataSource: "Datos meteorológicos: Open-Meteo.com (CC BY 4.0) · Lugares: GeoNames"
    },
    comparison: {
      vsYesterday: "Respecto a ayer a esta hora",
      warmer: "más cálido",
      colder: "más frío",
      same: "igual que ayer"
    },
    meteogram: {
      title: "Meteograma de 24 horas",
      subtitle: "Temperatura, punto de rocío, presión y lluvia"
    },
    windSea: {
      title: "Viento y mar",
      currentWind: "Viento actual",
      direction: "Dirección",
      beaufort: "Escala de Beaufort",
      force: "Fuerza",
      waveHeight: "Altura de las olas",
      wavePeriod: "Periodo de las olas",
      seaTemp: "Temperatura del mar",
      noMarine: "Sin datos marinos: ubicación alejada del mar.",
      animationNote: "Animación basada en la velocidad y dirección actuales del viento en esta ubicación."
    },
    route: {
      originPlaceholder: "Ciudad de salida",
      destPlaceholder: "Ciudad de llegada",
      start: "Salida",
      end: "Llegada",
      waypoint: "Punto intermedio",
      calculating: "Calculando…",
      notFound: "Lugar no encontrado:",
      error: "No se pudo calcular el tiempo de la ruta.",
      straightLineNote: "Condiciones actuales en 5 puntos de la línea recta entre las dos ciudades (no la ruta por carretera).",
      visibility: "Visibilidad",
      advice: {
        good: "Sin fenómenos significativos en el trayecto.",
        rain: "Lluvia en algunos tramos: reduce la velocidad y aumenta la distancia de seguridad.",
        snow: "Nieve en el trayecto: comprueba la obligación de cadenas o neumáticos de invierno.",
        storm: "Tormentas en el trayecto: considera retrasar la salida.",
        wind: "Rachas fuertes: precaución con vehículos altos y en viaductos.",
        fog: "Visibilidad reducida por niebla en algunos tramos."
      }
    },
    globe: {
      today: "Satélite de hoy",
      relief: "Sin nubes",
      rain: "Lluvia",
      cloudsDate: "Nubes del",
      rainTime: "Lluvia estimada por satélite a las",
      source: "Imágenes: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Imágenes de satélite no disponibles: se muestra el mapa guardado en la app.",
      rainError: "La lluvia por satélite no está disponible ahora."
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "El día y la noche siguen la posición real del Sol. Arrastra para girar y usa + y − (o dos dedos) para hacer zoom. «Satélite de hoy» muestra las nubes reales fotografiadas por los satélites de la NASA; «Lluvia», la estimación satelital de precipitación más reciente.",
      skyTitle: "Simulador del cielo",
      skyText: "Usa el control deslizante para ver el cielo a distintas horas del día, con el tiempo actual de esta ubicación."
    }
  },
  fr: {
    appName: "AETHERIA 3D",
    tagline: "Prévisions Météo Ultra Détaillées & Globe 3D Photoréaliste",
    searchPlaceholder: "Recherchez n'importe quelle ville ou pays...",
    views: {
      globe: "Globe 3D",
      sky: "Simulateur Ciel 3D",
      dashboard: "Tableau de Bord",
      radar: "Vent et mer",
      route: "Météo Itinéraire / Voyage"
    },
    geo: {
      country: "Pays",
      region: "Région / État",
      city: "Ville / Quartier",
      currentLocation: "Position Actuelle (GPS)",
      elevation: "Altitude",
      otherPlaces: "Autres lieux"
    },
    current: {
      feelsLike: "Ressentie",
      highLow: "Max / Min",
      humidity: "Humidité",
      dewPoint: "Point de Rosée",
      pressure: "Pression Atmosphérique",
      wind: "Vent",
      windGusts: "Rafales jusqu'à",
      visibility: "Visibilité",
      uvIndex: "Indice UV",
      cloudCover: "Couverture Nuageuse"
    },
    minuteCast: {
      subtitle: "Prévision par pas de 15 minutes",
      noPrecip: "Aucune précipitation prévue pendant les 2 prochaines heures",
      lightRainSoon: "Pluie légère attendue dans",
      moderateRain: "Pluie modérée imminente dans",
      heavyRain: "Fortes averses attendues dans",
      endingSoon: "Fin des précipitations d'ici",
      minutes: "minutes",
      title: "Pluie dans les 2 prochaines heures",
      continuing: "Précipitations pendant au moins 2 heures",
      unavailable: "Prévision à court terme indisponible pour ce lieu"
    },
    hourly: {
      title: "Prévisions Horaires Détaillées (48 Heures)",
      now: "Maintenant",
      scrubHelp: "Faites glisser pour visualiser le ciel 3D à cette heure exacte"
    },
    daily: {
      title: "Prévisions à 14 Jours",
      today: "Aujourd'hui",
      tomorrow: "Demain"
    },
    models: {
      title: "Comparaison des modèles météo",
      subtitle: "Prévision du jour selon les principaux centres météorologiques",
      consensus: "Moyenne des modèles",
      confidence: "Indice de Confiance",
      spread: "Écart entre modèles",
      agreement: "Accord entre modèles",
      agreementHigh: "Élevé",
      agreementMedium: "Moyen",
      agreementLow: "Faible",
      colModel: "Modèle",
      colResolution: "Résolution",
      colMaxMin: "Max / Min",
      colRain: "Pluie",
      colWind: "Vent max"
    },
    biometeo: {
      title: "Santé et bien-être",
      headacheAlert: "Sensibilité barométrique",
      headacheLow: "Risque Faible - Pression stable",
      headacheModerate: "Risque Modéré - Baisse de pression en cours",
      headacheHigh: "Variation rapide de pression (>3 hPa en 3 heures)",
      maxSunExposure: "Temps indicatif avant un coup de soleil",
      sunMinutes: "minutes",
      pollenTitle: "Pollens (grains/m³)",
      subtitle: "Variations de pression, exposition au soleil et pollens",
      skinTypeIII: "Peau claire à mate (phototype III)",
      noUv: "Pas d’UV : aucun risque de coup de soleil",
      pollenNames: {
        alder: "Aulne",
        birch: "Bouleau",
        grass: "Graminées",
        mugwort: "Armoise",
        olive: "Olivier",
        ragweed: "Ambroisie"
      },
      pollenLevels: {
        low: "Faible",
        medium: "Modéré",
        high: "Élevé",
        veryHigh: "Très élevé"
      },
      pollenUnavailable: "Données polliniques disponibles uniquement pour l’Europe"
    },
    aqi: {
      title: "Qualité de l’air",
      good: "Excellent",
      fair: "Bon",
      moderate: "Moyen",
      poor: "Mauvais",
      veryPoor: "Très Mauvais",
      hazardous: "Dangereux",
      healthAdvice: "Conseil Santé",
      noData: "Données de qualité de l’air indisponibles",
      pollutants: {
        o3: "Ozone (O₃)",
        no2: "Dioxyde d’azote (NO₂)",
        so2: "Dioxyde de soufre (SO₂)",
        co: "Monoxyde de carbone (CO)"
      },
      advice: {
        good: "Air pur : idéal pour toutes les activités en plein air.",
        fair: "Bonne qualité : aucune précaution particulière.",
        moderate: "Les personnes sensibles devraient limiter les efforts prolongés en extérieur.",
        poor: "Évitez le sport intense en extérieur.",
        veryPoor: "Limitez le temps passé dehors, surtout enfants, seniors et asthmatiques.",
        hazardous: "Restez à l’intérieur autant que possible, fenêtres fermées."
      }
    },
    lifestyle: {
      title: "Activités et tenue",
      outfitTitle: "Que porter aujourd’hui ?",
      laundry: "Séchage Linge Extérieur",
      running: "Course & Sport Outdoor",
      carWash: "Lavage Voiture",
      stargazing: "Astronomie & Ciel Étoilé",
      bbq: "Barbecue & Pique-nique",
      outfit: {
        umbrellaNeeded: "Prenez un parapluie ou un imperméable",
        heavyCoat: "Manteau chaud, écharpe et gants",
        jacketSweater: "Veste légère et pull",
        lightLayers: "Couches légères : chemise ou sweat",
        summerClothes: "Vêtements d’été légers et respirants",
        windbreaker: "Coupe-vent",
        sunglassesUv: "Lunettes de soleil et crème solaire"
      }
    },
    sunMoon: {
      sunrise: "Lever du Soleil",
      sunset: "Coucher du Soleil",
      daylight: "Heures de Jour",
      moonPhase: "Phase Lunaire",
      moonPhases: {
        new: "Nouvelle Lune",
        waxingCrescent: "Premier Croissant",
        firstQuarter: "Premier Quartier",
        waxingGibbous: "Gibbeuse Croissante",
        full: "Pleine Lune",
        waningGibbous: "Gibbeuse Décroissante",
        lastQuarter: "Dernier Quartier",
        waningCrescent: "Dernier Croissant"
      }
    },
    routeWeather: {
      title: "Météo d'Itinéraire & Voyage",
      subtitle: "Vérifiez les conditions météo tout au long de votre trajet",
      calcRoute: "Analyser l'Itinéraire",
      checkPoints: "Étapes",
      routeAdvice: "Conseil Trajet"
    },
    audio: {
      ambientSounds: "Ambiance Sonore 3D",
      rainSound: "Pluie"
    },
    alerts: {
      yellowWarning: "Attention : phénomènes localement intenses",
      orangeWarning: "Phénomènes intenses prévus",
      redWarning: "Phénomènes extrêmes prévus",
      notOfficial: "Avis calculé d’après la prévision des prochaines 24 heures, ce n’est pas une vigilance officielle. Consultez le service météo national.",
      reasons: {
        thunder: "orages",
        gusts: "fortes rafales",
        heavyRain: "fortes pluies",
        heavySnow: "fortes chutes de neige",
        fog: "brouillard"
      },
      maxGust: "Rafale max",
      totalRain: "Pluie 24 h"
    },
    conditions: {
      clearSky: "Ciel Dégagé",
      mainlyClear: "Généralement Ensoleillé",
      partlyCloudy: "Partiellement Nuageux",
      overcast: "Couvert",
      fog: "Brouillard ou Brume Épaisse",
      rimeFog: "Brouillard Givrant",
      drizzleLight: "Bruine Légère",
      drizzleMod: "Bruine Modérée",
      drizzleDense: "Bruine Dense",
      rainSlight: "Pluie Faible",
      rainMod: "Pluie Modérée",
      rainHeavy: "Forte Pluie",
      snowSlight: "Neige Faible",
      snowMod: "Neige Modérée",
      snowHeavy: "Tempête de Neige",
      thunderstorm: "Orage avec Éclairs",
      thunderstormHail: "Orage avec Grêle",
      windy: "Vents Forts"
    },
    status: {
      updatedAt: "Mis à jour à",
      offlineCached: "Pas de connexion : affichage des données de la dernière mise à jour.",
      loadError: "Impossible de charger la météo. Vérifiez votre connexion.",
      retry: "Réessayer",
      loading: "Chargement de la météo…",
      slowLoading: "Première fois pour cette zone : le chargement peut prendre jusqu’à 30 secondes.",
      myLocation: "Ma position",
      gpsUnsupported: "La géolocalisation n’est pas prise en charge sur cet appareil.",
      gpsError: "Impossible d’obtenir votre position. Recherchez une ville.",
      dataSource: "Données météo : Open-Meteo.com (CC BY 4.0) · Lieux : GeoNames"
    },
    comparison: {
      vsYesterday: "Par rapport à hier à la même heure",
      warmer: "plus chaud",
      colder: "plus froid",
      same: "comme hier"
    },
    meteogram: {
      title: "Météogramme 24 heures",
      subtitle: "Température, point de rosée, pression et pluie"
    },
    windSea: {
      title: "Vent et mer",
      currentWind: "Vent actuel",
      direction: "Direction",
      beaufort: "Échelle de Beaufort",
      force: "Force",
      waveHeight: "Hauteur des vagues",
      wavePeriod: "Période des vagues",
      seaTemp: "Température de la mer",
      noMarine: "Pas de données marines : lieu éloigné de la mer.",
      animationNote: "Animation basée sur la vitesse et la direction actuelles du vent à cet endroit."
    },
    route: {
      originPlaceholder: "Ville de départ",
      destPlaceholder: "Ville d’arrivée",
      start: "Départ",
      end: "Arrivée",
      waypoint: "Point intermédiaire",
      calculating: "Calcul en cours…",
      notFound: "Lieu introuvable :",
      error: "Impossible de calculer la météo du trajet.",
      straightLineNote: "Conditions actuelles en 5 points sur la ligne droite entre les deux villes (pas l’itinéraire routier).",
      visibility: "Visibilité",
      advice: {
        good: "Aucun phénomène notable sur le trajet.",
        rain: "Pluie sur certains tronçons : ralentissez et augmentez les distances de sécurité.",
        snow: "Neige sur le trajet : vérifiez l’obligation de chaînes ou de pneus hiver.",
        storm: "Orages sur le trajet : envisagez de reporter le départ.",
        wind: "Fortes rafales : prudence avec les véhicules hauts et sur les viaducs.",
        fog: "Visibilité réduite par le brouillard sur certains tronçons."
      }
    },
    globe: {
      today: "Satellite du jour",
      relief: "Sans nuages",
      rain: "Pluie",
      cloudsDate: "Nuages du",
      rainTime: "Pluie estimée par satellite à",
      source: "Images : NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Images satellite indisponibles : affichage de la carte enregistrée dans l’app.",
      rainError: "La pluie satellite n’est pas disponible pour le moment."
    },
    info: {
      globeTitle: "Globe 3D",
      globeText: "Le jour et la nuit suivent la position réelle du Soleil. Faites glisser pour tourner, utilisez + et − (ou deux doigts) pour zoomer. « Satellite du jour » montre les vrais nuages photographiés par les satellites de la NASA ; « Pluie » la dernière estimation satellite des précipitations.",
      skyTitle: "Simulateur de ciel",
      skyText: "Utilisez le curseur pour voir le ciel à différentes heures, avec la météo actuelle de ce lieu."
    }
  },
  de: {
    appName: "AETHERIA 3D",
    tagline: "Hochdetaillierte Wettervorhersage & Fotorealistischer 3D-Globus",
    searchPlaceholder: "Stadt oder Land weltweit suchen...",
    views: {
      globe: "3D-Globus",
      sky: "3D-Himmelssimulator",
      dashboard: "Detail-Dashboard",
      radar: "Wind & Meer",
      route: "Routen- & Reisewetter"
    },
    geo: {
      country: "Land",
      region: "Region / Bundesland",
      city: "Stadt / Ort",
      currentLocation: "Aktueller Standort (GPS)",
      elevation: "Höhe",
      otherPlaces: "Weitere Orte"
    },
    current: {
      feelsLike: "Gefühlt",
      highLow: "Max / Min",
      humidity: "Luftfeuchtigkeit",
      dewPoint: "Taupunkt",
      pressure: "Luftdruck",
      wind: "Wind",
      windGusts: "Böen bis zu",
      visibility: "Sichtweite",
      uvIndex: "UV-Index",
      cloudCover: "Bewölkung"
    },
    minuteCast: {
      subtitle: "Vorhersage in 15-Minuten-Schritten",
      noPrecip: "Kein Niederschlag in den nächsten 2 Stunden erwartet",
      lightRainSoon: "Leichter Regen erwartet in",
      moderateRain: "Mäßiger Regen naht in",
      heavyRain: "Starker Schauer erwartet in",
      endingSoon: "Niederschlag lässt nach in",
      minutes: "Minuten",
      title: "Regen in den nächsten 2 Stunden",
      continuing: "Niederschlag für mindestens 2 Stunden",
      unavailable: "Kurzfristvorhersage für diesen Ort nicht verfügbar"
    },
    hourly: {
      title: "Detaillierte Stundenvorhersage (48 Stunden)",
      now: "Jetzt",
      scrubHelp: "Schieberegler ziehen für interaktive 3D-Himmelsvorschau"
    },
    daily: {
      title: "14-Tage-Trend",
      today: "Heute",
      tomorrow: "Morgen"
    },
    models: {
      title: "Vergleich der Wettermodelle",
      subtitle: "Heutige Vorhersage der wichtigsten Wetterzentren",
      consensus: "Modellmittel",
      confidence: "Vorhersage-Sicherheit",
      spread: "Modellstreuung",
      agreement: "Modellübereinstimmung",
      agreementHigh: "Hoch",
      agreementMedium: "Mittel",
      agreementLow: "Niedrig",
      colModel: "Modell",
      colResolution: "Auflösung",
      colMaxMin: "Max / Min",
      colRain: "Regen",
      colWind: "Max. Wind"
    },
    biometeo: {
      title: "Gesundheit & Wohlbefinden",
      headacheAlert: "Wetterfühligkeit",
      headacheLow: "Geringes Risiko - Stabiler Luftdruck",
      headacheModerate: "Mäßiges Risiko - Sinkender Luftdruck",
      headacheHigh: "Schnelle Luftdruckänderung (>3 hPa in 3 Stunden)",
      maxSunExposure: "Ungefähre Zeit bis zum Sonnenbrand",
      sunMinutes: "Minuten",
      pollenTitle: "Pollen (Körner/m³)",
      subtitle: "Luftdruckänderung, Sonnenexposition und Pollen",
      skinTypeIII: "Hell-mittlere Haut (Hauttyp III)",
      noUv: "Kein UV: kein Sonnenbrandrisiko",
      pollenNames: {
        alder: "Erle",
        birch: "Birke",
        grass: "Gräser",
        mugwort: "Beifuß",
        olive: "Olive",
        ragweed: "Ambrosia"
      },
      pollenLevels: {
        low: "Gering",
        medium: "Mäßig",
        high: "Hoch",
        veryHigh: "Sehr hoch"
      },
      pollenUnavailable: "Pollendaten nur für Europa verfügbar"
    },
    aqi: {
      title: "Luftqualität",
      good: "Sehr gut",
      fair: "Gut",
      moderate: "Mäßig",
      poor: "Schlecht",
      veryPoor: "Sehr schlecht",
      hazardous: "Gefährlich",
      healthAdvice: "Gesundheitshinweis",
      noData: "Keine Daten zur Luftqualität verfügbar",
      pollutants: {
        o3: "Ozon (O₃)",
        no2: "Stickstoffdioxid (NO₂)",
        so2: "Schwefeldioxid (SO₂)",
        co: "Kohlenmonoxid (CO)"
      },
      advice: {
        good: "Saubere Luft: ideal für alle Aktivitäten im Freien.",
        fair: "Gute Luftqualität: keine besonderen Vorkehrungen nötig.",
        moderate: "Empfindliche Personen sollten längere Anstrengungen im Freien begrenzen.",
        poor: "Intensiven Sport im Freien vermeiden.",
        veryPoor: "Zeit im Freien begrenzen, besonders Kinder, Ältere und Asthmatiker.",
        hazardous: "Möglichst drinnen bleiben und Fenster geschlossen halten."
      }
    },
    lifestyle: {
      title: "Aktivitäten & Kleidung",
      outfitTitle: "Was ziehe ich heute an?",
      laundry: "Wäsche im Freien trocknen",
      running: "Laufen & Outdoorsport",
      carWash: "Autowäsche",
      stargazing: "Sternenbeobachtung",
      bbq: "Grillen & Picknick",
      outfit: {
        umbrellaNeeded: "Regenschirm oder Regenjacke mitnehmen",
        heavyCoat: "Warmer Mantel, Schal und Handschuhe",
        jacketSweater: "Leichte Jacke und Pullover",
        lightLayers: "Leichte Schichten: Hemd oder Pulli",
        summerClothes: "Leichte, atmungsaktive Sommerkleidung",
        windbreaker: "Windjacke",
        sunglassesUv: "Sonnenbrille und Sonnencreme"
      }
    },
    sunMoon: {
      sunrise: "Sonnenaufgang",
      sunset: "Sonnenuntergang",
      daylight: "Tageslichtstunden",
      moonPhase: "Mondphase",
      moonPhases: {
        new: "Neumond",
        waxingCrescent: "Zunehmende Sichel",
        firstQuarter: "Erstes Viertel",
        waxingGibbous: "Zunehmender Mond",
        full: "Vollmond",
        waningGibbous: "Abnehmender Mond",
        lastQuarter: "Letztes Viertel",
        waningCrescent: "Abnehmende Sichel"
      }
    },
    routeWeather: {
      title: "Routen- & Reisewetter-Planer",
      subtitle: "Wetterbedingungen entlang Ihrer Fahr- oder Flugstrecke prüfen",
      calcRoute: "Routenwetter analysieren",
      checkPoints: "Wegpunkte",
      routeAdvice: "Reiseempfehlung"
    },
    audio: {
      ambientSounds: "3D-Atmosphären-Audio",
      rainSound: "Regen"
    },
    alerts: {
      yellowWarning: "Achtung: örtlich intensives Wetter",
      orangeWarning: "Unwetter erwartet",
      redWarning: "Extremes Unwetter erwartet",
      notOfficial: "Hinweis aus der Vorhersage der nächsten 24 Stunden, keine amtliche Unwetterwarnung. Bitte den nationalen Wetterdienst prüfen.",
      reasons: {
        thunder: "Gewitter",
        gusts: "starke Böen",
        heavyRain: "Starkregen",
        heavySnow: "starker Schneefall",
        fog: "Nebel"
      },
      maxGust: "Max. Böe",
      totalRain: "Regen 24 h"
    },
    conditions: {
      clearSky: "Klarer Himmel",
      mainlyClear: "Überwiegend Heiter",
      partlyCloudy: "Teilweise Bewölkt",
      overcast: "Bedeckt",
      fog: "Dichter Nebel",
      rimeFog: "Gefrierender Nebel",
      drizzleLight: "Leichter Nieselregen",
      drizzleMod: "Mäßiger Nieselregen",
      drizzleDense: "Dichter Nieselregen",
      rainSlight: "Leichter Regen",
      rainMod: "Mäßiger Regen",
      rainHeavy: "Starker Regen",
      snowSlight: "Leichter Schneefall",
      snowMod: "Mäßiger Schneefall",
      snowHeavy: "Starker Schneesturm",
      thunderstorm: "Gewitter mit Blitzschlag",
      thunderstormHail: "Schweres Gewitter mit Hagel",
      windy: "Stürmischer Wind"
    },
    status: {
      updatedAt: "Aktualisiert um",
      offlineCached: "Keine Verbindung: Daten der letzten Aktualisierung werden angezeigt.",
      loadError: "Wetter konnte nicht geladen werden. Bitte Verbindung prüfen.",
      retry: "Erneut versuchen",
      loading: "Wetter wird geladen…",
      slowLoading: "Erstes Mal für dieses Gebiet: Das Laden kann bis zu 30 Sekunden dauern.",
      myLocation: "Mein Standort",
      gpsUnsupported: "Standortbestimmung wird auf diesem Gerät nicht unterstützt.",
      gpsError: "Standort nicht verfügbar. Bitte eine Stadt suchen.",
      dataSource: "Wetterdaten: Open-Meteo.com (CC BY 4.0) · Orte: GeoNames"
    },
    comparison: {
      vsYesterday: "Im Vergleich zu gestern um diese Zeit",
      warmer: "wärmer",
      colder: "kälter",
      same: "wie gestern"
    },
    meteogram: {
      title: "24-Stunden-Meteogramm",
      subtitle: "Temperatur, Taupunkt, Luftdruck und Regen"
    },
    windSea: {
      title: "Wind & Meer",
      currentWind: "Aktueller Wind",
      direction: "Richtung",
      beaufort: "Beaufort-Skala",
      force: "Stärke",
      waveHeight: "Wellenhöhe",
      wavePeriod: "Wellenperiode",
      seaTemp: "Wassertemperatur",
      noMarine: "Keine Meeresdaten: Ort liegt nicht am Meer.",
      animationNote: "Animation basierend auf aktueller Windgeschwindigkeit und -richtung an diesem Ort."
    },
    route: {
      originPlaceholder: "Abfahrtsort",
      destPlaceholder: "Zielort",
      start: "Abfahrt",
      end: "Ankunft",
      waypoint: "Zwischenpunkt",
      calculating: "Wird berechnet…",
      notFound: "Ort nicht gefunden:",
      error: "Routenwetter konnte nicht berechnet werden.",
      straightLineNote: "Aktuelle Bedingungen an 5 Punkten auf der Luftlinie zwischen beiden Städten (nicht die Straßenroute).",
      visibility: "Sichtweite",
      advice: {
        good: "Kein nennenswertes Wetter auf der Strecke.",
        rain: "Regen auf einigen Abschnitten: langsamer fahren und Abstand halten.",
        snow: "Schnee auf der Strecke: Ketten- oder Winterreifenpflicht prüfen.",
        storm: "Gewitter auf der Strecke: Abfahrt eventuell verschieben.",
        wind: "Starke Böen: Vorsicht mit hohen Fahrzeugen und auf Brücken.",
        fog: "Eingeschränkte Sicht durch Nebel auf einigen Abschnitten."
      }
    },
    globe: {
      today: "Satellit heute",
      relief: "Ohne Wolken",
      rain: "Regen",
      cloudsDate: "Wolken vom",
      rainTime: "Satellitengestützte Regenschätzung um",
      source: "Bilder: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Satellitenbilder nicht verfügbar: Es wird die in der App gespeicherte Karte angezeigt.",
      rainError: "Satellitenregen ist gerade nicht verfügbar."
    },
    info: {
      globeTitle: "3D-Globus",
      globeText: "Tag und Nacht folgen dem tatsächlichen Sonnenstand. Ziehen zum Drehen, + und − (oder zwei Finger) zum Zoomen. „Satellit heute“ zeigt die echten Wolken aus NASA-Satellitenbildern, „Regen“ die neueste satellitengestützte Niederschlagsschätzung.",
      skyTitle: "Himmelssimulator",
      skyText: "Mit dem Regler den Himmel zu verschiedenen Tageszeiten sehen, mit dem aktuellen Wetter an diesem Ort."
    }
  },
  ja: {
    appName: "AETHERIA 3D",
    tagline: "超高精度気象予報＆写実的3D地球儀シミュレーター",
    searchPlaceholder: "世界中の都市や国を検索...",
    views: {
      globe: "3D地球儀",
      sky: "3D天空シミュレーター",
      dashboard: "詳細ダッシュボード",
      radar: "風と海",
      route: "移動ルート気象"
    },
    geo: {
      country: "国",
      region: "都道府県 / 州",
      city: "都市 / 市区町村",
      currentLocation: "現在地 (GPS)",
      elevation: "標高",
      otherPlaces: "その他の地域"
    },
    current: {
      feelsLike: "体感温度",
      highLow: "最高 / 最低",
      humidity: "湿度",
      dewPoint: "露点温度",
      pressure: "気圧",
      wind: "風速",
      windGusts: "最大瞬間風速",
      visibility: "視程",
      uvIndex: "UVインデックス",
      cloudCover: "雲量"
    },
    minuteCast: {
      title: "今後2時間の雨",
      subtitle: "15分ごとの予報",
      noPrecip: "今後2時間降水の心配はありません",
      lightRainSoon: "まもなく小雨が降り始めます:",
      moderateRain: "本降りの雨が近づいています:",
      heavyRain: "激しい雨が予想されます:",
      endingSoon: "雨が止む見込み:",
      minutes: "分後",
      continuing: "少なくとも2時間は降水が続きます",
      unavailable: "この地点の短時間予報はありません"
    },
    hourly: {
      title: "48時間詳細予報",
      now: "現在",
      scrubHelp: "スライダーを動かして特定時刻の3D天空を再現"
    },
    daily: {
      title: "14日間週間予報",
      today: "今日",
      tomorrow: "明日"
    },
    models: {
      title: "気象モデルの比較",
      subtitle: "主要気象機関による今日の予報",
      consensus: "モデル平均",
      confidence: "予測信頼度",
      spread: "モデル間の差",
      agreement: "モデルの一致度",
      agreementHigh: "高",
      agreementMedium: "中",
      agreementLow: "低",
      colModel: "モデル",
      colResolution: "解像度",
      colMaxMin: "最高 / 最低",
      colRain: "降水量",
      colWind: "最大風速"
    },
    biometeo: {
      title: "健康",
      headacheAlert: "気圧変化による体調への影響",
      headacheLow: "低リスク - 気圧は安定",
      headacheModerate: "注意 - 気圧低下中",
      headacheHigh: "急な気圧変化（3時間で3hPa超）",
      maxSunExposure: "日焼けまでのおおよその時間",
      sunMinutes: "分",
      pollenTitle: "花粉（個/m³）",
      subtitle: "気圧変化・日差し・花粉",
      skinTypeIII: "標準的な肌（スキンタイプIII）",
      noUv: "紫外線なし：日焼けの心配はありません",
      pollenNames: {
        alder: "ハンノキ",
        birch: "シラカバ",
        grass: "イネ科",
        mugwort: "ヨモギ",
        olive: "オリーブ",
        ragweed: "ブタクサ"
      },
      pollenLevels: {
        low: "少ない",
        medium: "やや多い",
        high: "多い",
        veryHigh: "非常に多い"
      },
      pollenUnavailable: "花粉データはヨーロッパのみ対応しています"
    },
    aqi: {
      title: "大気質",
      good: "極めて良好",
      fair: "良好",
      moderate: "普通",
      poor: "やや悪化",
      veryPoor: "悪化",
      hazardous: "極めて危険",
      healthAdvice: "健康アドバイス",
      noData: "大気質データはありません",
      pollutants: {
        o3: "オゾン (O₃)",
        no2: "二酸化窒素 (NO₂)",
        so2: "二酸化硫黄 (SO₂)",
        co: "一酸化炭素 (CO)"
      },
      advice: {
        good: "きれいな空気：屋外活動に最適です。",
        fair: "良好：特別な注意は不要です。",
        moderate: "敏感な方は長時間の屋外での運動を控えてください。",
        poor: "屋外での激しい運動は避けてください。",
        veryPoor: "外出を控えてください。特に子ども・高齢者・ぜんそくの方。",
        hazardous: "できるだけ屋内で過ごし、窓を閉めてください。"
      }
    },
    lifestyle: {
      title: "アクティビティと服装",
      outfitTitle: "今日の服装",
      laundry: "洗濯物干し指数",
      running: "ランニング＆運動",
      carWash: "洗車指数",
      stargazing: "天体観測・星空",
      bbq: "バーベキュー",
      outfit: {
        umbrellaNeeded: "傘かレインコートを持って行きましょう",
        heavyCoat: "厚手のコート・マフラー・手袋",
        jacketSweater: "薄手のジャケットとセーター",
        lightLayers: "軽い重ね着：シャツやパーカー",
        summerClothes: "軽くて通気性のよい夏服",
        windbreaker: "ウインドブレーカー",
        sunglassesUv: "サングラスと日焼け止め"
      }
    },
    sunMoon: {
      sunrise: "日の出",
      sunset: "日の入り",
      daylight: "昼間の長さ",
      moonPhase: "月齢・月相",
      moonPhases: {
        new: "新月",
        waxingCrescent: "三日月",
        firstQuarter: "上弦の月",
        waxingGibbous: "十三夜",
        full: "満月",
        waningGibbous: "寝待月",
        lastQuarter: "下弦の月",
        waningCrescent: "有明月"
      }
    },
    routeWeather: {
      title: "移動ルート・旅先ウェザー",
      subtitle: "出発地から目的地までの天候変化をリアルタイム分析",
      calcRoute: "ルート気象を解析",
      checkPoints: "中継地点",
      routeAdvice: "旅のワンポイント助言"
    },
    audio: {
      ambientSounds: "3D自然環境サウンド",
      rainSound: "雨音"
    },
    alerts: {
      yellowWarning: "注意：局地的に激しい天気",
      orangeWarning: "荒れた天気の見込み",
      redWarning: "非常に激しい天気の見込み",
      notOfficial: "今後24時間の予報から算出した注意情報で、公式の警報ではありません。各国の気象機関の情報を確認してください。",
      reasons: {
        thunder: "雷雨",
        gusts: "強い突風",
        heavyRain: "大雨",
        heavySnow: "大雪",
        fog: "霧"
      },
      maxGust: "最大瞬間風速",
      totalRain: "24時間降水量"
    },
    conditions: {
      clearSky: "快晴",
      mainlyClear: "晴れ",
      partlyCloudy: "晴れ時々曇り",
      overcast: "曇り",
      fog: "濃霧",
      rimeFog: "着氷性の霧",
      drizzleLight: "小雨・霧雨",
      drizzleMod: "霧雨",
      drizzleDense: "強い霧雨",
      rainSlight: "弱雨",
      rainMod: "並みの雨",
      rainHeavy: "大雨",
      snowSlight: "小雪",
      snowMod: "雪",
      snowHeavy: "大雪・吹雪",
      thunderstorm: "雷雨",
      thunderstormHail: "雹（ひょう）を伴う雷雨",
      windy: "強風"
    },
    status: {
      updatedAt: "更新時刻",
      offlineCached: "オフライン：前回更新時のデータを表示しています。",
      loadError: "天気を読み込めませんでした。接続を確認してください。",
      retry: "再試行",
      loading: "天気を読み込み中…",
      slowLoading: "この地域は初めてのため、読み込みに最大30秒かかることがあります。",
      myLocation: "現在地",
      gpsUnsupported: "この端末は位置情報に対応していません。",
      gpsError: "現在地を取得できません。都市を検索してください。",
      dataSource: "気象データ：Open-Meteo.com (CC BY 4.0) · 地名：GeoNames"
    },
    comparison: {
      vsYesterday: "昨日の同時刻との比較",
      warmer: "暖かい",
      colder: "寒い",
      same: "昨日と同じ"
    },
    meteogram: {
      title: "24時間メテオグラム",
      subtitle: "気温・露点・気圧・降水量"
    },
    windSea: {
      title: "風と海",
      currentWind: "現在の風",
      direction: "風向",
      beaufort: "ビューフォート風力階級",
      force: "風力",
      waveHeight: "波の高さ",
      wavePeriod: "波の周期",
      seaTemp: "海水温",
      noMarine: "海洋データなし：海から離れた地点です。",
      animationNote: "この地点の現在の風速と風向に基づくアニメーションです。"
    },
    route: {
      originPlaceholder: "出発地",
      destPlaceholder: "目的地",
      start: "出発",
      end: "到着",
      waypoint: "中間地点",
      calculating: "計算中…",
      notFound: "見つかりません：",
      error: "ルートの天気を計算できませんでした。",
      straightLineNote: "2都市間の直線上の5地点の現在の天気です（道路ルートではありません）。",
      visibility: "視程",
      advice: {
        good: "経路上に目立った気象現象はありません。",
        rain: "一部で雨：速度を落とし、車間距離を広げてください。",
        snow: "経路上で雪：チェーンや冬用タイヤの規制を確認してください。",
        storm: "経路上で雷雨：出発の延期を検討してください。",
        wind: "強い突風：背の高い車両や橋の上では注意してください。",
        fog: "一部で霧による視界不良があります。"
      }
    },
    globe: {
      today: "今日の衛星画像",
      relief: "雲なし",
      rain: "雨",
      cloudsDate: "雲の撮影日",
      rainTime: "衛星による降水推定",
      source: "画像: NASA GIBS / EOSDIS（VIIRS、Blue Marble、Black Marble、IMERG）",
      fallback: "衛星画像を取得できないため、アプリ内の地図を表示しています。",
      rainError: "衛星降水データは現在利用できません。"
    },
    info: {
      globeTitle: "3D地球儀",
      globeText: "昼と夜は太陽の実際の位置に合わせて表示されます。ドラッグで回転、＋/−（または2本指）でズーム。「今日の衛星画像」はNASA衛星が撮影した実際の雲、「雨」は最新の衛星降水推定です。",
      skyTitle: "空のシミュレーター",
      skyText: "スライダーで時間帯ごとの空を表示します。この地点の現在の天気を反映しています。"
    }
  },
  zh: {
    appName: "AETHERIA 3D",
    tagline: "超高精度天气预报与逼真3D地球气象模拟系统",
    searchPlaceholder: "搜索全球任意城市或国家...",
    views: {
      globe: "3D地球仪",
      sky: "3D天空模拟器",
      dashboard: "综合仪表盘",
      radar: "风与海",
      route: "行程与路线气象"
    },
    geo: {
      country: "国家",
      region: "省份 / 地区",
      city: "城市 / 区县",
      currentLocation: "当前位置 (GPS)",
      elevation: "海拔高度",
      otherPlaces: "其他地点"
    },
    current: {
      feelsLike: "体感温度",
      highLow: "最高 / 最低",
      humidity: "相对湿度",
      dewPoint: "露点温度",
      pressure: "大气气压",
      wind: "风速",
      windGusts: "阵风达",
      visibility: "能见度",
      uvIndex: "紫外线指数",
      cloudCover: "云量覆盖"
    },
    minuteCast: {
      title: "未来2小时降水",
      subtitle: "每15分钟预报",
      noPrecip: "未来2小时内无降水",
      lightRainSoon: "小雨预计在",
      moderateRain: "中雨预计在",
      heavyRain: "强降雨预计在",
      endingSoon: "降水减弱在",
      minutes: "分钟后",
      continuing: "降水将持续至少2小时",
      unavailable: "该地点暂无短时预报"
    },
    hourly: {
      title: "逐小时天气预报 (48小时)",
      now: "现在",
      scrubHelp: "拖动时间轴实时渲染对应时刻的逼真3D天空"
    },
    daily: {
      title: "14天趋势预报",
      today: "今天",
      tomorrow: "明天"
    },
    models: {
      title: "气象模式对比",
      subtitle: "主要气象中心的今日预报",
      consensus: "模式平均",
      confidence: "预报置信度",
      spread: "模式差异",
      agreement: "模式一致性",
      agreementHigh: "高",
      agreementMedium: "中",
      agreementLow: "低",
      colModel: "模式",
      colResolution: "分辨率",
      colMaxMin: "最高 / 最低",
      colRain: "降水",
      colWind: "最大风速"
    },
    biometeo: {
      title: "健康",
      headacheAlert: "气压敏感度",
      headacheLow: "低风险 - 气压平稳",
      headacheModerate: "中等风险 - 气压正在下降",
      headacheHigh: "气压快速变化（3小时内超过3百帕）",
      maxSunExposure: "大约多久会晒伤",
      sunMinutes: "分钟",
      pollenTitle: "花粉（粒/立方米）",
      subtitle: "气压变化、日晒与花粉",
      skinTypeIII: "中等肤色（III型）",
      noUv: "无紫外线：没有晒伤风险",
      pollenNames: {
        alder: "桤木",
        birch: "桦树",
        grass: "禾本科",
        mugwort: "艾草",
        olive: "橄榄",
        ragweed: "豚草"
      },
      pollenLevels: {
        low: "低",
        medium: "中等",
        high: "高",
        veryHigh: "很高"
      },
      pollenUnavailable: "花粉数据仅覆盖欧洲"
    },
    aqi: {
      title: "空气质量",
      good: "优",
      fair: "良",
      moderate: "轻度污染",
      poor: "中度污染",
      veryPoor: "重度污染",
      hazardous: "严重污染",
      healthAdvice: "健康建议",
      noData: "暂无空气质量数据",
      pollutants: {
        o3: "臭氧 (O₃)",
        no2: "二氧化氮 (NO₂)",
        so2: "二氧化硫 (SO₂)",
        co: "一氧化碳 (CO)"
      },
      advice: {
        good: "空气清新：适合所有户外活动。",
        fair: "空气良好：无需特别防护。",
        moderate: "敏感人群应减少长时间户外运动。",
        poor: "避免剧烈户外运动。",
        veryPoor: "减少外出，尤其是儿童、老人和哮喘患者。",
        hazardous: "尽量留在室内并关闭门窗。"
      }
    },
    lifestyle: {
      title: "活动与穿衣",
      outfitTitle: "今天穿什么？",
      laundry: "晾晒指数",
      running: "晨练与跑步",
      carWash: "洗车指数",
      stargazing: "夜空天文观测",
      bbq: "露营烧烤",
      outfit: {
        umbrellaNeeded: "带上雨伞或雨衣",
        heavyCoat: "厚外套、围巾和手套",
        jacketSweater: "薄外套加毛衣",
        lightLayers: "轻薄叠穿：衬衫或卫衣",
        summerClothes: "轻薄透气的夏装",
        windbreaker: "防风外套",
        sunglassesUv: "太阳镜和防晒霜"
      }
    },
    sunMoon: {
      sunrise: "日出时刻",
      sunset: "日落时刻",
      daylight: "昼长",
      moonPhase: "月相状态",
      moonPhases: {
        new: "新月 / 朔月",
        waxingCrescent: "蛾眉月",
        firstQuarter: "上弦月",
        waxingGibbous: "盈凸月",
        full: "满月 / 望月",
        waningGibbous: "亏凸月",
        lastQuarter: "下弦月",
        waningCrescent: "残月"
      }
    },
    routeWeather: {
      title: "行程路线气象研判",
      subtitle: "可视化分析您自驾或飞行沿途各个节点的气象变化",
      calcRoute: "分析路线天气",
      checkPoints: "沿途检查点",
      routeAdvice: "行车安全建议"
    },
    audio: {
      ambientSounds: "3D自然白噪音",
      rainSound: "雨声"
    },
    alerts: {
      yellowWarning: "注意：局部天气较强",
      orangeWarning: "预计有强天气",
      redWarning: "预计有极端天气",
      notOfficial: "根据未来24小时预报计算的提示，并非官方预警。请查看本国气象部门的信息。",
      reasons: {
        thunder: "雷暴",
        gusts: "强阵风",
        heavyRain: "强降雨",
        heavySnow: "大雪",
        fog: "雾"
      },
      maxGust: "最大阵风",
      totalRain: "24小时降水"
    },
    conditions: {
      clearSky: "晴朗少云",
      mainlyClear: "大部晴天",
      partlyCloudy: "多云",
      overcast: "阴天",
      fog: "大雾",
      rimeFog: "冻雾 / 雾凇",
      drizzleLight: "毛毛细雨",
      drizzleMod: "中度细雨",
      drizzleDense: "密集细雨",
      rainSlight: "小雨",
      rainMod: "中雨",
      rainHeavy: "大暴雨",
      snowSlight: "小雪",
      snowMod: "中雪",
      snowHeavy: "暴风雪",
      thunderstorm: "雷暴天气",
      thunderstormHail: "冰雹强雷暴",
      windy: "大风"
    },
    status: {
      updatedAt: "更新于",
      offlineCached: "无网络：显示上次更新的数据。",
      loadError: "无法加载天气，请检查网络连接。",
      retry: "重试",
      loading: "正在加载天气…",
      slowLoading: "首次加载该地区，可能需要最多30秒。",
      myLocation: "我的位置",
      gpsUnsupported: "此设备不支持定位。",
      gpsError: "无法获取位置，请手动搜索城市。",
      dataSource: "气象数据：Open-Meteo.com (CC BY 4.0) · 地名：GeoNames"
    },
    comparison: {
      vsYesterday: "与昨天同一时间相比",
      warmer: "更暖",
      colder: "更冷",
      same: "与昨天相同"
    },
    meteogram: {
      title: "24小时气象图",
      subtitle: "气温、露点、气压和降水"
    },
    windSea: {
      title: "风与海",
      currentWind: "当前风",
      direction: "风向",
      beaufort: "蒲福风级",
      force: "级",
      waveHeight: "浪高",
      wavePeriod: "波浪周期",
      seaTemp: "海水温度",
      noMarine: "无海洋数据：该地点远离海洋。",
      animationNote: "动画基于该地点当前的风速和风向。"
    },
    route: {
      originPlaceholder: "出发城市",
      destPlaceholder: "目的城市",
      start: "出发",
      end: "到达",
      waypoint: "途经点",
      calculating: "正在计算…",
      notFound: "未找到地点：",
      error: "无法计算路线天气。",
      straightLineNote: "两城市之间直线上5个点的当前天气（非道路路线）。",
      visibility: "能见度",
      advice: {
        good: "沿途无明显天气现象。",
        rain: "部分路段有雨：请减速并保持车距。",
        snow: "沿途有雪：请确认防滑链或冬季轮胎要求。",
        storm: "沿途有雷暴：建议推迟出发。",
        wind: "强阵风：高大车辆及桥梁路段请注意。",
        fog: "部分路段有雾，能见度较低。"
      }
    },
    globe: {
      today: "今日卫星图",
      relief: "无云",
      rain: "降雨",
      cloudsDate: "云图日期",
      rainTime: "卫星降水估算时间",
      source: "影像：NASA GIBS / EOSDIS（VIIRS、Blue Marble、Black Marble、IMERG）",
      fallback: "无法获取卫星影像，显示应用内保存的地图。",
      rainError: "暂时无法获取卫星降水数据。"
    },
    info: {
      globeTitle: "3D地球",
      globeText: "昼夜按太阳的真实位置显示。拖动旋转，使用＋/−（或双指）缩放。“今日卫星图”显示NASA卫星拍摄的真实云层，“降雨”显示最新的卫星降水估算。",
      skyTitle: "天空模拟器",
      skyText: "拖动滑块查看一天中不同时间的天空，并反映该地点的当前天气。"
    }
  },
  ar: {
    appName: "AETHERIA 3D",
    tagline: "توقعات جوية فائقة الدقة ومحاكاة ثلاثية الأبعاد واقعية للأرض",
    searchPlaceholder: "ابحث عن أي مدينة أو دولة في العالم...",
    views: {
      globe: "الكرة الأرضية 3D",
      sky: "محاكي السماء 3D",
      dashboard: "لوحة التحكم المفصلة",
      radar: "الرياح والبحر",
      route: "طقس المسار والسفر"
    },
    geo: {
      country: "الدولة",
      region: "المنطقة / المحافظة",
      city: "المدينة / الحي",
      currentLocation: "الموقع الحالي (GPS)",
      elevation: "الارتفاع",
      otherPlaces: "أماكن أخرى"
    },
    current: {
      feelsLike: "الحرارة المحسوسة",
      highLow: "العظمى / الصغرى",
      humidity: "الرطوبة",
      dewPoint: "نقطة الندى",
      pressure: "الضغط الجوي",
      wind: "الرياح",
      windGusts: "الهبات حتى",
      visibility: "مدى الرؤية",
      uvIndex: "مؤشر الأشعة فوق البنفسجية",
      cloudCover: "الغطاء السحابي"
    },
    minuteCast: {
      title: "المطر خلال الساعتين القادمتين",
      subtitle: "توقعات كل 15 دقيقة",
      noPrecip: "لا أمطار متوقعة خلال الساعتين القادمتين",
      lightRainSoon: "مطر خفيف متوقع بعد",
      moderateRain: "مطر معتدل قادم بعد",
      heavyRain: "أمطار غزيرة متوقعة بعد",
      endingSoon: "تراجع الأمطار خلال",
      minutes: "دقيقة",
      continuing: "هطول لمدة ساعتين على الأقل",
      unavailable: "التوقعات القصيرة المدى غير متاحة لهذا الموقع"
    },
    hourly: {
      title: "التوقعات الساعية المفصلة (48 ساعة)",
      now: "الآن",
      scrubHelp: "اسحب لمشاهدة السماء ثلاثية الأبعاد في تلك الساعة"
    },
    daily: {
      title: "توقعات 14 يوماً",
      today: "اليوم",
      tomorrow: "غداً"
    },
    models: {
      title: "مقارنة نماذج الطقس",
      subtitle: "توقعات اليوم من أهم مراكز الأرصاد",
      consensus: "متوسط النماذج",
      confidence: "نسبة الثقة",
      spread: "الفرق بين النماذج",
      agreement: "توافق النماذج",
      agreementHigh: "مرتفع",
      agreementMedium: "متوسط",
      agreementLow: "منخفض",
      colModel: "النموذج",
      colResolution: "الدقة",
      colMaxMin: "العظمى / الصغرى",
      colRain: "المطر",
      colWind: "أقصى رياح"
    },
    biometeo: {
      title: "الصحة والعافية",
      headacheAlert: "الحساسية لتغيّر الضغط",
      headacheLow: "خطر منخفض - ضغط مستقر",
      headacheModerate: "خطر معتدل - انخفاض الضغط الجوي",
      headacheHigh: "تغيّر سريع في الضغط (أكثر من 3 هكتوباسكال خلال 3 ساعات)",
      maxSunExposure: "الوقت التقريبي قبل حروق الشمس",
      sunMinutes: "دقيقة",
      pollenTitle: "حبوب اللقاح (حبة/م³)",
      subtitle: "تغيّر الضغط والتعرض للشمس وحبوب اللقاح",
      skinTypeIII: "بشرة فاتحة إلى متوسطة (النوع III)",
      noUv: "لا أشعة فوق بنفسجية: لا خطر من حروق الشمس",
      pollenNames: {
        alder: "الجار المائي",
        birch: "البتولا",
        grass: "الأعشاب",
        mugwort: "الشيح",
        olive: "الزيتون",
        ragweed: "الرجيد"
      },
      pollenLevels: {
        low: "منخفض",
        medium: "متوسط",
        high: "مرتفع",
        veryHigh: "مرتفع جدًا"
      },
      pollenUnavailable: "بيانات حبوب اللقاح متاحة لأوروبا فقط"
    },
    aqi: {
      title: "جودة الهواء",
      good: "ممتاز",
      fair: "جيد",
      moderate: "متوسط",
      poor: "رديء",
      veryPoor: "رديء جداً",
      hazardous: "خطير",
      healthAdvice: "نصيحة صحية",
      noData: "بيانات جودة الهواء غير متاحة",
      pollutants: {
        o3: "الأوزون (O₃)",
        no2: "ثاني أكسيد النيتروجين (NO₂)",
        so2: "ثاني أكسيد الكبريت (SO₂)",
        co: "أول أكسيد الكربون (CO)"
      },
      advice: {
        good: "هواء نقي: مثالي لجميع الأنشطة الخارجية.",
        fair: "جودة جيدة: لا حاجة لاحتياطات خاصة.",
        moderate: "على الأشخاص الحساسين تقليل المجهود الطويل في الخارج.",
        poor: "تجنب الرياضة الشاقة في الخارج.",
        veryPoor: "قلّل الوقت في الخارج، خاصة للأطفال وكبار السن ومرضى الربو.",
        hazardous: "ابقَ في الداخل قدر الإمكان وأغلق النوافذ."
      }
    },
    lifestyle: {
      title: "الأنشطة والملابس",
      outfitTitle: "ماذا أرتدي اليوم؟",
      laundry: "تجفيف الغسيل",
      running: "الجري والرياضة",
      carWash: "غسيل السيارة",
      stargazing: "رصد النجوم والفلك",
      bbq: "الشواء والنزهات",
      outfit: {
        umbrellaNeeded: "خذ مظلة أو معطفًا واقيًا من المطر",
        heavyCoat: "معطف ثقيل ووشاح وقفازات",
        jacketSweater: "سترة خفيفة وكنزة",
        lightLayers: "طبقات خفيفة: قميص أو سترة رياضية",
        summerClothes: "ملابس صيفية خفيفة ومريحة",
        windbreaker: "سترة واقية من الرياح",
        sunglassesUv: "نظارات شمسية وواقي شمس"
      }
    },
    sunMoon: {
      sunrise: "الشروق",
      sunset: "الغروب",
      daylight: "ساعات النهار",
      moonPhase: "طور القمر",
      moonPhases: {
        new: "محاق",
        waxingCrescent: "هلال متزايد",
        firstQuarter: "تربيع أول",
        waxingGibbous: "أحدب متزايد",
        full: "بدر",
        waningGibbous: "أحدب متناقص",
        lastQuarter: "تربيع ثان",
        waningCrescent: "هلال متناقص"
      }
    },
    routeWeather: {
      title: "طقس مسار الرحلة والسفر",
      subtitle: "تحليل الأحوال الجوية على طول مسار قيادتك أو رحلتك الجوية",
      calcRoute: "تحليل طقس الطريق",
      checkPoints: "محطات المسار",
      routeAdvice: "إرشادات السفر"
    },
    audio: {
      ambientSounds: "صوتيات الطبيعة ثلاثية الأبعاد",
      rainSound: "المطر"
    },
    alerts: {
      yellowWarning: "تنبيه: ظواهر جوية قوية محليًا",
      orangeWarning: "يُتوقع طقس شديد",
      redWarning: "يُتوقع طقس متطرف",
      notOfficial: "تنبيه محسوب من توقعات الساعات الـ24 القادمة، وليس تحذيرًا رسميًا. راجع هيئة الأرصاد الوطنية.",
      reasons: {
        thunder: "عواصف رعدية",
        gusts: "هبات رياح قوية",
        heavyRain: "أمطار غزيرة",
        heavySnow: "ثلوج كثيفة",
        fog: "ضباب"
      },
      maxGust: "أقصى هبة",
      totalRain: "مطر 24 ساعة"
    },
    conditions: {
      clearSky: "سماء صافية",
      mainlyClear: "صافٍ غالباً",
      partlyCloudy: "غائم جزئياً",
      overcast: "غائم كلياً",
      fog: "ضباب كثيف",
      rimeFog: "ضباب متجمد",
      drizzleLight: "رذاذ خفيف",
      drizzleMod: "رذاذ معتدل",
      drizzleDense: "رذاذ كثيف",
      rainSlight: "أمطار خفيفة",
      rainMod: "أمطار معتدلة",
      rainHeavy: "أمطار غزيرة",
      snowSlight: "ثلوج خفيفة",
      snowMod: "ثلوج معتدلة",
      snowHeavy: "عاصفة ثلجية",
      thunderstorm: "عاصفة رعدية مع برق",
      thunderstormHail: "عاصفة رعدية مع برد",
      windy: "رياح قوية"
    },
    status: {
      updatedAt: "آخر تحديث",
      offlineCached: "لا يوجد اتصال: يتم عرض بيانات آخر تحديث.",
      loadError: "تعذّر تحميل الطقس. تحقق من الاتصال.",
      retry: "إعادة المحاولة",
      loading: "جارٍ تحميل الطقس…",
      slowLoading: "أول مرة لهذه المنطقة: قد يستغرق التحميل حتى 30 ثانية.",
      myLocation: "موقعي",
      gpsUnsupported: "تحديد الموقع غير مدعوم على هذا الجهاز.",
      gpsError: "تعذّر تحديد موقعك. ابحث عن مدينة يدويًا.",
      dataSource: "بيانات الطقس: Open-Meteo.com (CC BY 4.0) · الأماكن: GeoNames"
    },
    comparison: {
      vsYesterday: "مقارنة بالأمس في الوقت نفسه",
      warmer: "أدفأ",
      colder: "أبرد",
      same: "مثل الأمس"
    },
    meteogram: {
      title: "مخطط الطقس لـ24 ساعة",
      subtitle: "الحرارة ونقطة الندى والضغط والمطر"
    },
    windSea: {
      title: "الرياح والبحر",
      currentWind: "الرياح الحالية",
      direction: "الاتجاه",
      beaufort: "مقياس بوفورت",
      force: "القوة",
      waveHeight: "ارتفاع الموج",
      wavePeriod: "دورة الموج",
      seaTemp: "حرارة البحر",
      noMarine: "لا توجد بيانات بحرية: الموقع بعيد عن البحر.",
      animationNote: "رسوم متحركة مبنية على سرعة الرياح واتجاهها الحاليين في هذا الموقع."
    },
    route: {
      originPlaceholder: "مدينة الانطلاق",
      destPlaceholder: "مدينة الوصول",
      start: "الانطلاق",
      end: "الوصول",
      waypoint: "نقطة وسيطة",
      calculating: "جارٍ الحساب…",
      notFound: "لم يتم العثور على المكان:",
      error: "تعذّر حساب طقس المسار.",
      straightLineNote: "الأحوال الحالية في 5 نقاط على الخط المستقيم بين المدينتين (وليس الطريق البري).",
      visibility: "مدى الرؤية",
      advice: {
        good: "لا ظواهر جوية مهمة على الطريق.",
        rain: "أمطار في بعض المقاطع: خفّف السرعة وزد مسافة الأمان.",
        snow: "ثلوج على الطريق: تحقق من إلزامية السلاسل أو الإطارات الشتوية.",
        storm: "عواصف رعدية على الطريق: فكّر في تأجيل الرحلة.",
        wind: "هبات قوية: انتبه مع المركبات العالية وعلى الجسور.",
        fog: "رؤية منخفضة بسبب الضباب في بعض المقاطع."
      }
    },
    globe: {
      today: "صورة الأقمار الصناعية اليوم",
      relief: "بدون غيوم",
      rain: "المطر",
      cloudsDate: "غيوم يوم",
      rainTime: "تقدير المطر بالأقمار الصناعية الساعة",
      source: "الصور: NASA GIBS / EOSDIS (VIIRS وBlue Marble وBlack Marble وIMERG)",
      fallback: "صور الأقمار الصناعية غير متاحة: يتم عرض الخريطة المحفوظة في التطبيق.",
      rainError: "بيانات المطر من الأقمار الصناعية غير متاحة حاليًا."
    },
    info: {
      globeTitle: "الكرة الأرضية ثلاثية الأبعاد",
      globeText: "يتبع الليل والنهار الموقع الحقيقي للشمس. اسحب للتدوير واستخدم + و− (أو إصبعين) للتكبير. «صورة الأقمار الصناعية اليوم» تعرض الغيوم الحقيقية التي صورتها أقمار ناسا، و«المطر» أحدث تقدير للأمطار بالأقمار الصناعية.",
      skyTitle: "محاكي السماء",
      skyText: "استخدم شريط التمرير لرؤية السماء في أوقات مختلفة من اليوم، مع الطقس الحالي لهذا الموقع."
    }
  },
  pt: {
    appName: "AETHERIA 3D",
    tagline: "Previsões Meteorológicas Hiperdetalhadas & Globo 3D Fotorrealista",
    searchPlaceholder: "Pesquise qualquer cidade ou país do mundo...",
    views: {
      globe: "Globo 3D",
      sky: "Simulador de Céu 3D",
      dashboard: "Painel Detalhado",
      radar: "Vento e mar",
      route: "Clima na Rota / Viagem"
    },
    geo: {
      country: "País",
      region: "Região / Estado",
      city: "Cidade / Bairro",
      currentLocation: "Localização Atual (GPS)",
      elevation: "Altitude",
      otherPlaces: "Outros locais"
    },
    current: {
      feelsLike: "Sensação Térmica",
      highLow: "Máx / Mín",
      humidity: "Umidade",
      dewPoint: "Ponto de Orvalho",
      pressure: "Pressão Atmosférica",
      wind: "Vento",
      windGusts: "Rajadas até",
      visibility: "Visibilidade",
      uvIndex: "Índice UV",
      cloudCover: "Cobertura de Nuvens"
    },
    minuteCast: {
      subtitle: "Previsão em intervalos de 15 minutos",
      noPrecip: "Sem chuvas previstas para as próximas 2 horas",
      lightRainSoon: "Chuva fraca prevista em",
      moderateRain: "Chuva moderada a caminho em",
      heavyRain: "Pancadas fortes previstas em",
      endingSoon: "Precipitações diminuindo em",
      minutes: "minutos",
      title: "Chuva nas próximas 2 horas",
      continuing: "Precipitação por pelo menos 2 horas",
      unavailable: "Previsão de curto prazo indisponível para este local"
    },
    hourly: {
      title: "Previsão Horária Detalhada (48 Horas)",
      now: "Agora",
      scrubHelp: "Arraste para pré-visualizar o céu 3D exatamente nesta hora"
    },
    daily: {
      title: "Tendência para 14 Dias",
      today: "Hoje",
      tomorrow: "Amanhã"
    },
    models: {
      title: "Comparação de modelos meteorológicos",
      subtitle: "Previsão de hoje dos principais centros meteorológicos",
      consensus: "Média dos modelos",
      confidence: "Confiabilidade",
      spread: "Diferença entre modelos",
      agreement: "Concordância entre modelos",
      agreementHigh: "Alta",
      agreementMedium: "Média",
      agreementLow: "Baixa",
      colModel: "Modelo",
      colResolution: "Resolução",
      colMaxMin: "Máx / Mín",
      colRain: "Chuva",
      colWind: "Vento máx"
    },
    biometeo: {
      title: "Saúde e bem-estar",
      headacheAlert: "Sensibilidade barométrica",
      headacheLow: "Risco Baixo - Pressão estável",
      headacheModerate: "Risco Moderado - Queda de pressão em andamento",
      headacheHigh: "Variação rápida de pressão (>3 hPa em 3 horas)",
      maxSunExposure: "Tempo aproximado até queimar",
      sunMinutes: "minutos",
      pollenTitle: "Pólen (grãos/m³)",
      subtitle: "Variação de pressão, exposição ao sol e pólen",
      skinTypeIII: "Pele clara a média (fototipo III)",
      noUv: "Sem UV: sem risco de queimaduras",
      pollenNames: {
        alder: "Amieiro",
        birch: "Bétula",
        grass: "Gramíneas",
        mugwort: "Artemísia",
        olive: "Oliveira",
        ragweed: "Ambrósia"
      },
      pollenLevels: {
        low: "Baixo",
        medium: "Moderado",
        high: "Alto",
        veryHigh: "Muito alto"
      },
      pollenUnavailable: "Dados de pólen disponíveis apenas para a Europa"
    },
    aqi: {
      title: "Qualidade do ar",
      good: "Excelente",
      fair: "Bom",
      moderate: "Moderado",
      poor: "Ruim",
      veryPoor: "Muito Ruim",
      hazardous: "Perigoso",
      healthAdvice: "Recomendação de Saúde",
      noData: "Dados de qualidade do ar indisponíveis",
      pollutants: {
        o3: "Ozônio (O₃)",
        no2: "Dióxido de nitrogênio (NO₂)",
        so2: "Dióxido de enxofre (SO₂)",
        co: "Monóxido de carbono (CO)"
      },
      advice: {
        good: "Ar limpo: ideal para todas as atividades ao ar livre.",
        fair: "Boa qualidade: sem cuidados especiais.",
        moderate: "Pessoas sensíveis devem limitar esforços prolongados ao ar livre.",
        poor: "Evite exercícios intensos ao ar livre.",
        veryPoor: "Limite o tempo ao ar livre, sobretudo crianças, idosos e asmáticos.",
        hazardous: "Fique em ambientes fechados o máximo possível, com as janelas fechadas."
      }
    },
    lifestyle: {
      title: "Atividades e roupas",
      outfitTitle: "O que vestir hoje?",
      laundry: "Secar Roupa no Varal",
      running: "Corrida e Esportes",
      carWash: "Lavar o Carro",
      stargazing: "Observação de Estrelas",
      bbq: "Churrasco e Piquenique",
      outfit: {
        umbrellaNeeded: "Leve guarda-chuva ou capa de chuva",
        heavyCoat: "Casaco pesado, cachecol e luvas",
        jacketSweater: "Jaqueta leve e suéter",
        lightLayers: "Camadas leves: camisa ou moletom",
        summerClothes: "Roupas de verão leves e respiráveis",
        windbreaker: "Corta-vento",
        sunglassesUv: "Óculos de sol e protetor solar"
      }
    },
    sunMoon: {
      sunrise: "Nascer do Sol",
      sunset: "Pôr do Sol",
      daylight: "Horas de Sol",
      moonPhase: "Fase da Lua",
      moonPhases: {
        new: "Lua Nova",
        waxingCrescent: "Lua Crescente",
        firstQuarter: "Quarto Crescente",
        waxingGibbous: "Gibosa Crescente",
        full: "Lua Cheia",
        waningGibbous: "Gibosa Minguante",
        lastQuarter: "Quarto Minguante",
        waningCrescent: "Lua Minguante"
      }
    },
    routeWeather: {
      title: "Clima na Rota de Viagem",
      subtitle: "Consulte o clima ao longo do seu percurso de carro ou voo",
      calcRoute: "Calcular Clima da Rota",
      checkPoints: "Pontos de Parada",
      routeAdvice: "Dica de Viagem"
    },
    audio: {
      ambientSounds: "Áudio Atmosférico 3D",
      rainSound: "Chuva"
    },
    alerts: {
      yellowWarning: "Atenção: fenômenos localmente intensos",
      orangeWarning: "Previsão de fenômenos intensos",
      redWarning: "Previsão de fenômenos extremos",
      notOfficial: "Aviso calculado a partir da previsão das próximas 24 horas, não é um alerta oficial. Consulte o serviço meteorológico nacional.",
      reasons: {
        thunder: "trovoadas",
        gusts: "rajadas fortes",
        heavyRain: "chuva forte",
        heavySnow: "neve intensa",
        fog: "nevoeiro"
      },
      maxGust: "Rajada máx",
      totalRain: "Chuva 24 h"
    },
    conditions: {
      clearSky: "Céu Limpo",
      mainlyClear: "Predominantemente Limpo",
      partlyCloudy: "Parcialmente Nublado",
      overcast: "Nublado",
      fog: "Nevoeiro Denso",
      rimeFog: "Nevoeiro com Geada",
      drizzleLight: "Garoa Fraca",
      drizzleMod: "Garoa Moderada",
      drizzleDense: "Garoa Densa",
      rainSlight: "Chuva Fraca",
      rainMod: "Chuva Moderada",
      rainHeavy: "Chuva Forte",
      snowSlight: "Neve Fraca",
      snowMod: "Neve Moderada",
      snowHeavy: "Nevasca Forte",
      thunderstorm: "Tempestade com Raios",
      thunderstormHail: "Tempestade com Granizo",
      windy: "Ventos Fortes"
    },
    status: {
      updatedAt: "Atualizado às",
      offlineCached: "Sem conexão: mostrando os dados da última atualização.",
      loadError: "Não foi possível carregar o tempo. Verifique a conexão.",
      retry: "Tentar novamente",
      loading: "Carregando o tempo…",
      slowLoading: "Primeira vez para esta área: o carregamento pode levar até 30 segundos.",
      myLocation: "Minha localização",
      gpsUnsupported: "A geolocalização não é compatível com este dispositivo.",
      gpsError: "Não foi possível obter sua localização. Pesquise uma cidade.",
      dataSource: "Dados meteorológicos: Open-Meteo.com (CC BY 4.0) · Locais: GeoNames"
    },
    comparison: {
      vsYesterday: "Em relação a ontem no mesmo horário",
      warmer: "mais quente",
      colder: "mais frio",
      same: "igual a ontem"
    },
    meteogram: {
      title: "Meteograma de 24 horas",
      subtitle: "Temperatura, ponto de orvalho, pressão e chuva"
    },
    windSea: {
      title: "Vento e mar",
      currentWind: "Vento atual",
      direction: "Direção",
      beaufort: "Escala de Beaufort",
      force: "Força",
      waveHeight: "Altura das ondas",
      wavePeriod: "Período das ondas",
      seaTemp: "Temperatura do mar",
      noMarine: "Sem dados marinhos: local afastado do mar.",
      animationNote: "Animação baseada na velocidade e direção atuais do vento neste local."
    },
    route: {
      originPlaceholder: "Cidade de partida",
      destPlaceholder: "Cidade de chegada",
      start: "Partida",
      end: "Chegada",
      waypoint: "Ponto intermediário",
      calculating: "Calculando…",
      notFound: "Local não encontrado:",
      error: "Não foi possível calcular o tempo da rota.",
      straightLineNote: "Condições atuais em 5 pontos na linha reta entre as duas cidades (não a rota rodoviária).",
      visibility: "Visibilidade",
      advice: {
        good: "Nenhum fenômeno significativo no trajeto.",
        rain: "Chuva em alguns trechos: reduza a velocidade e aumente a distância de segurança.",
        snow: "Neve no trajeto: verifique a obrigatoriedade de correntes ou pneus de inverno.",
        storm: "Trovoadas no trajeto: considere adiar a partida.",
        wind: "Rajadas fortes: cuidado com veículos altos e em viadutos.",
        fog: "Visibilidade reduzida por nevoeiro em alguns trechos."
      }
    },
    globe: {
      today: "Satélite de hoje",
      relief: "Sem nuvens",
      rain: "Chuva",
      cloudsDate: "Nuvens de",
      rainTime: "Chuva estimada por satélite às",
      source: "Imagens: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Imagens de satélite indisponíveis: mostrando o mapa salvo no app.",
      rainError: "A chuva por satélite não está disponível agora."
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "O dia e a noite seguem a posição real do Sol. Arraste para girar e use + e − (ou dois dedos) para ampliar. “Satélite de hoje” mostra as nuvens reais fotografadas pelos satélites da NASA; “Chuva” mostra a estimativa de precipitação por satélite mais recente.",
      skyTitle: "Simulador do céu",
      skyText: "Use o controle deslizante para ver o céu em diferentes horas do dia, com o tempo atual deste local."
    }
  },
  ru: {
    appName: "AETHERIA 3D",
    tagline: "Сверхдетальный прогноз погоды и фотореалистичный 3D глобус",
    searchPlaceholder: "Поиск любого города или страны в мире...",
    views: {
      globe: "3D Глобус",
      sky: "3D Симулятор Неба",
      dashboard: "Детальная панель",
      radar: "Ветер и море",
      route: "Погода по маршруту"
    },
    geo: {
      country: "Страна",
      region: "Регион / Область",
      city: "Город / Район",
      currentLocation: "Текущее местоположение (GPS)",
      elevation: "Высота",
      otherPlaces: "Другие места"
    },
    current: {
      feelsLike: "Ощущается как",
      highLow: "Макс / Мин",
      humidity: "Влажность",
      dewPoint: "Точка росы",
      pressure: "Атмосферное давление",
      wind: "Ветер",
      windGusts: "Порывы до",
      visibility: "Видимость",
      uvIndex: "УФ-индекс",
      cloudCover: "Облачность"
    },
    minuteCast: {
      subtitle: "Прогноз с шагом 15 минут",
      noPrecip: "Осадков в ближайшие 2 часа не ожидается",
      lightRainSoon: "Небольшой дождь начнется через",
      moderateRain: "Умеренный дождь начнется через",
      heavyRain: "Сильный ливень ожидается через",
      endingSoon: "Осадки прекратятся в течение",
      minutes: "минут",
      title: "Осадки в ближайшие 2 часа",
      continuing: "Осадки не менее 2 часов",
      unavailable: "Краткосрочный прогноз для этого места недоступен"
    },
    hourly: {
      title: "Почасовой прогноз (48 часов)",
      now: "Сейчас",
      scrubHelp: "Перемещайте ползунок для просмотра 3D-неба в выбранный час"
    },
    daily: {
      title: "Прогноз на 14 дней",
      today: "Сегодня",
      tomorrow: "Завтра"
    },
    models: {
      title: "Сравнение погодных моделей",
      subtitle: "Прогноз на сегодня от ведущих метеоцентров",
      consensus: "Среднее моделей",
      confidence: "Надежность прогноза",
      spread: "Разброс моделей",
      agreement: "Согласованность моделей",
      agreementHigh: "Высокая",
      agreementMedium: "Средняя",
      agreementLow: "Низкая",
      colModel: "Модель",
      colResolution: "Разрешение",
      colMaxMin: "Макс / Мин",
      colRain: "Осадки",
      colWind: "Макс. ветер"
    },
    biometeo: {
      title: "Здоровье и самочувствие",
      headacheAlert: "Метеочувствительность",
      headacheLow: "Низкий риск - Давление стабильно",
      headacheModerate: "Умеренный риск - Давление падает",
      headacheHigh: "Резкое изменение давления (>3 гПа за 3 часа)",
      maxSunExposure: "Примерное время до солнечного ожога",
      sunMinutes: "минут",
      pollenTitle: "Пыльца (зёрен/м³)",
      subtitle: "Изменение давления, солнце и пыльца",
      skinTypeIII: "Светлая или средняя кожа (тип III)",
      noUv: "УФ отсутствует: риска ожога нет",
      pollenNames: {
        alder: "Ольха",
        birch: "Берёза",
        grass: "Злаки",
        mugwort: "Полынь",
        olive: "Олива",
        ragweed: "Амброзия"
      },
      pollenLevels: {
        low: "Низкий",
        medium: "Умеренный",
        high: "Высокий",
        veryHigh: "Очень высокий"
      },
      pollenUnavailable: "Данные о пыльце доступны только для Европы"
    },
    aqi: {
      title: "Качество воздуха",
      good: "Отличное",
      fair: "Хорошее",
      moderate: "Умеренное",
      poor: "Плохое",
      veryPoor: "Очень плохое",
      hazardous: "Опасное",
      healthAdvice: "Совет по здоровью",
      noData: "Данные о качестве воздуха недоступны",
      pollutants: {
        o3: "Озон (O₃)",
        no2: "Диоксид азота (NO₂)",
        so2: "Диоксид серы (SO₂)",
        co: "Угарный газ (CO)"
      },
      advice: {
        good: "Чистый воздух: идеально для любых занятий на улице.",
        fair: "Хорошее качество: особых мер не требуется.",
        moderate: "Чувствительным людям стоит ограничить длительные нагрузки на улице.",
        poor: "Избегайте интенсивных тренировок на улице.",
        veryPoor: "Сократите время на улице, особенно детям, пожилым и астматикам.",
        hazardous: "По возможности оставайтесь в помещении с закрытыми окнами."
      }
    },
    lifestyle: {
      title: "Занятия и одежда",
      outfitTitle: "Что надеть сегодня?",
      laundry: "Сушка белья на улице",
      running: "Бег и спорт на воздухе",
      carWash: "Мойка автомобиля",
      stargazing: "Наблюдение за звездами",
      bbq: "Барбекю и пикник",
      outfit: {
        umbrellaNeeded: "Возьмите зонт или дождевик",
        heavyCoat: "Тёплое пальто, шарф и перчатки",
        jacketSweater: "Лёгкая куртка и свитер",
        lightLayers: "Лёгкие слои: рубашка или толстовка",
        summerClothes: "Лёгкая дышащая летняя одежда",
        windbreaker: "Ветровка",
        sunglassesUv: "Солнцезащитные очки и крем"
      }
    },
    sunMoon: {
      sunrise: "Восход солнца",
      sunset: "Закат солнца",
      daylight: "Световой день",
      moonPhase: "Фаза Луны",
      moonPhases: {
        new: "Новолуние",
        waxingCrescent: "Молодая луна",
        firstQuarter: "Первая четверть",
        waxingGibbous: "Прибывающая луна",
        full: "Полнолуние",
        waningGibbous: "Убывающая луна",
        lastQuarter: "Последняя четверть",
        waningCrescent: "Старая луна"
      }
    },
    routeWeather: {
      title: "Погода в пути и маршруте",
      subtitle: "Анализ погодных условий на протяжении вашей поездки или полета",
      calcRoute: "Рассчитать погоду пути",
      checkPoints: "Контрольные точки",
      routeAdvice: "Совет путешественнику"
    },
    audio: {
      ambientSounds: "3D Звуки природы",
      rainSound: "Шум дождя"
    },
    alerts: {
      yellowWarning: "Внимание: местами сильные явления",
      orangeWarning: "Ожидается опасная погода",
      redWarning: "Ожидается чрезвычайно опасная погода",
      notOfficial: "Уведомление рассчитано по прогнозу на ближайшие 24 часа и не является официальным предупреждением. Сверьтесь с национальной метеослужбой.",
      reasons: {
        thunder: "грозы",
        gusts: "сильные порывы",
        heavyRain: "сильный дождь",
        heavySnow: "сильный снег",
        fog: "туман"
      },
      maxGust: "Макс. порыв",
      totalRain: "Осадки 24 ч"
    },
    conditions: {
      clearSky: "Ясно",
      mainlyClear: "Преимущественно ясно",
      partlyCloudy: "Переменная облачность",
      overcast: "Пасмурно",
      fog: "Густой туман",
      rimeFog: "Ледяной туман",
      drizzleLight: "Слабая морось",
      drizzleMod: "Умеренная морось",
      drizzleDense: "Густая морось",
      rainSlight: "Небольшой дождь",
      rainMod: "Умеренный дождь",
      rainHeavy: "Сильный дождь",
      snowSlight: "Небольшой снег",
      snowMod: "Умеренный снегопад",
      snowHeavy: "Сильная метель",
      thunderstorm: "Гроза с молниями",
      thunderstormHail: "Гроза с градом",
      windy: "Штормовой ветер"
    },
    status: {
      updatedAt: "Обновлено в",
      offlineCached: "Нет соединения: показаны данные последнего обновления.",
      loadError: "Не удалось загрузить погоду. Проверьте подключение.",
      retry: "Повторить",
      loading: "Загрузка погоды…",
      slowLoading: "Первая загрузка для этого района может занять до 30 секунд.",
      myLocation: "Моё местоположение",
      gpsUnsupported: "Геолокация не поддерживается на этом устройстве.",
      gpsError: "Не удалось определить местоположение. Найдите город вручную.",
      dataSource: "Данные о погоде: Open-Meteo.com (CC BY 4.0) · Места: GeoNames"
    },
    comparison: {
      vsYesterday: "По сравнению со вчерашним днём в это же время",
      warmer: "теплее",
      colder: "холоднее",
      same: "как вчера"
    },
    meteogram: {
      title: "Метеограмма на 24 часа",
      subtitle: "Температура, точка росы, давление и осадки"
    },
    windSea: {
      title: "Ветер и море",
      currentWind: "Текущий ветер",
      direction: "Направление",
      beaufort: "Шкала Бофорта",
      force: "Баллы",
      waveHeight: "Высота волн",
      wavePeriod: "Период волн",
      seaTemp: "Температура моря",
      noMarine: "Нет морских данных: место далеко от моря.",
      animationNote: "Анимация основана на текущей скорости и направлении ветра в этом месте."
    },
    route: {
      originPlaceholder: "Город отправления",
      destPlaceholder: "Город прибытия",
      start: "Отправление",
      end: "Прибытие",
      waypoint: "Промежуточная точка",
      calculating: "Расчёт…",
      notFound: "Место не найдено:",
      error: "Не удалось рассчитать погоду на маршруте.",
      straightLineNote: "Текущие условия в 5 точках на прямой между двумя городами (не автомобильный маршрут).",
      visibility: "Видимость",
      advice: {
        good: "Значимых погодных явлений на пути нет.",
        rain: "Дождь на отдельных участках: снизьте скорость и увеличьте дистанцию.",
        snow: "Снег на пути: проверьте требования к цепям или зимней резине.",
        storm: "Грозы на пути: рассмотрите перенос поездки.",
        wind: "Сильные порывы: осторожно на высоких автомобилях и на мостах.",
        fog: "Ухудшение видимости из-за тумана на отдельных участках."
      }
    },
    globe: {
      today: "Спутник сегодня",
      relief: "Без облаков",
      rain: "Осадки",
      cloudsDate: "Облака за",
      rainTime: "Спутниковая оценка осадков на",
      source: "Снимки: NASA GIBS / EOSDIS (VIIRS, Blue Marble, Black Marble, IMERG)",
      fallback: "Спутниковые снимки недоступны: показана карта, сохранённая в приложении.",
      rainError: "Спутниковые данные об осадках сейчас недоступны."
    },
    info: {
      globeTitle: "3D-глобус",
      globeText: "День и ночь соответствуют реальному положению Солнца. Перетаскивайте для вращения, используйте + и − (или два пальца) для масштаба. «Спутник сегодня» показывает реальные облака со спутников NASA, «Осадки» — последнюю спутниковую оценку осадков.",
      skyTitle: "Симулятор неба",
      skyText: "Используйте ползунок, чтобы увидеть небо в разное время суток с текущей погодой в этом месте."
    }
  }
};
