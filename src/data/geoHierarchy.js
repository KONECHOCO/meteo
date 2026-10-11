import { apiUrl } from "../services/weatherService.js";

// Geographic Hierarchy: Countries -> Regions/States -> Cities
// Covers major global countries with realistic micro-coordinates, elevations & timezones.
// Also provides global dynamic geocoding for any location on Earth.

export const geoHierarchy = [
  {
    code: "IT",
    name: "Italia",
    flag: "🇮🇹",
    lat: 41.8719,
    lon: 12.5674,
    regions: [
      {
        name: "Lombardia",
        lat: 45.4654,
        lon: 9.1859,
        cities: [
          { name: "Milano", lat: 45.4642, lon: 9.1900, elevation: 120, timezone: "Europe/Rome" },
          { name: "Bergamo", lat: 45.6983, lon: 9.6773, elevation: 249, timezone: "Europe/Rome" },
          { name: "Brescia", lat: 45.5416, lon: 10.2118, elevation: 149, timezone: "Europe/Rome" },
          { name: "Como", lat: 45.8081, lon: 9.0852, elevation: 201, timezone: "Europe/Rome" },
          { name: "Monza", lat: 45.5845, lon: 9.2744, elevation: 162, timezone: "Europe/Rome" },
          { name: "Varese", lat: 45.8206, lon: 8.8251, elevation: 382, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Lazio",
        lat: 41.9028,
        lon: 12.4964,
        cities: [
          { name: "Roma", lat: 41.9028, lon: 12.4964, elevation: 21, timezone: "Europe/Rome" },
          { name: "Latina", lat: 41.4676, lon: 12.9037, elevation: 21, timezone: "Europe/Rome" },
          { name: "Viterbo", lat: 42.4174, lon: 12.1047, elevation: 326, timezone: "Europe/Rome" },
          { name: "Frosinone", lat: 41.6406, lon: 13.3444, elevation: 291, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Campania",
        lat: 40.8518,
        lon: 14.2681,
        cities: [
          { name: "Napoli", lat: 40.8518, lon: 14.2681, elevation: 17, timezone: "Europe/Rome" },
          { name: "Salerno", lat: 40.6824, lon: 14.7681, elevation: 4, timezone: "Europe/Rome" },
          { name: "Caserta", lat: 41.0726, lon: 14.3323, elevation: 68, timezone: "Europe/Rome" },
          { name: "Sorrento", lat: 40.6263, lon: 14.3758, elevation: 50, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Veneto",
        lat: 45.4408,
        lon: 12.3155,
        cities: [
          { name: "Venezia", lat: 45.4408, lon: 12.3155, elevation: 1, timezone: "Europe/Rome" },
          { name: "Verona", lat: 45.4384, lon: 10.9916, elevation: 59, timezone: "Europe/Rome" },
          { name: "Padova", lat: 45.4064, lon: 11.8768, elevation: 12, timezone: "Europe/Rome" },
          { name: "Vicenza", lat: 45.5455, lon: 11.5354, elevation: 39, timezone: "Europe/Rome" },
          { name: "Cortina d'Ampezzo", lat: 46.5405, lon: 12.1357, elevation: 1224, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Toscana",
        lat: 43.7696,
        lon: 11.2558,
        cities: [
          { name: "Firenze", lat: 43.7696, lon: 11.2558, elevation: 50, timezone: "Europe/Rome" },
          { name: "Pisa", lat: 43.7228, lon: 10.4017, elevation: 4, timezone: "Europe/Rome" },
          { name: "Siena", lat: 43.3188, lon: 11.3308, elevation: 322, timezone: "Europe/Rome" },
          { name: "Livorno", lat: 43.5485, lon: 10.3106, elevation: 3, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Piemonte",
        lat: 45.0703,
        lon: 7.6869,
        cities: [
          { name: "Torino", lat: 45.0703, lon: 7.6869, elevation: 239, timezone: "Europe/Rome" },
          { name: "Novara", lat: 45.4469, lon: 8.6200, elevation: 160, timezone: "Europe/Rome" },
          { name: "Asti", lat: 44.9006, lon: 8.2068, elevation: 123, timezone: "Europe/Rome" },
          { name: "Cuneo", lat: 44.3845, lon: 7.5427, elevation: 534, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Sicilia",
        lat: 38.1157,
        lon: 13.3615,
        cities: [
          { name: "Palermo", lat: 38.1157, lon: 13.3615, elevation: 14, timezone: "Europe/Rome" },
          { name: "Catania", lat: 37.5079, lon: 15.0830, elevation: 7, timezone: "Europe/Rome" },
          { name: "Messina", lat: 38.1938, lon: 15.5540, elevation: 3, timezone: "Europe/Rome" },
          { name: "Siracusa", lat: 37.0755, lon: 15.2866, elevation: 17, timezone: "Europe/Rome" },
          { name: "Taormina", lat: 37.8523, lon: 15.2863, elevation: 204, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Emilia-Romagna",
        lat: 44.4949,
        lon: 11.3426,
        cities: [
          { name: "Bologna", lat: 44.4949, lon: 11.3426, elevation: 54, timezone: "Europe/Rome" },
          { name: "Modena", lat: 44.6471, lon: 10.9252, elevation: 34, timezone: "Europe/Rome" },
          { name: "Parma", lat: 44.8015, lon: 10.3279, elevation: 55, timezone: "Europe/Rome" },
          { name: "Rimini", lat: 44.0678, lon: 12.5695, elevation: 6, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Puglia",
        lat: 41.1171,
        lon: 16.8719,
        cities: [
          { name: "Bari", lat: 41.1171, lon: 16.8719, elevation: 5, timezone: "Europe/Rome" },
          { name: "Lecce", lat: 40.3515, lon: 18.1750, elevation: 49, timezone: "Europe/Rome" },
          { name: "Taranto", lat: 40.4644, lon: 17.2470, elevation: 15, timezone: "Europe/Rome" },
          { name: "Foggia", lat: 41.4622, lon: 15.5447, elevation: 76, timezone: "Europe/Rome" }
        ]
      },
      {
        name: "Sardegna",
        lat: 39.2238,
        lon: 9.1217,
        cities: [
          { name: "Cagliari", lat: 39.2238, lon: 9.1217, elevation: 23, timezone: "Europe/Rome" },
          { name: "Sassari", lat: 40.7259, lon: 8.5556, elevation: 225, timezone: "Europe/Rome" },
          { name: "Olbia", lat: 40.9238, lon: 9.4975, elevation: 10, timezone: "Europe/Rome" }
        ]
      }
    ]
  },

  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    lat: 37.0902,
    lon: -95.7129,
    regions: [
      {
        name: "California",
        lat: 36.7783,
        lon: -119.4179,
        cities: [
          { name: "Los Angeles", lat: 34.0522, lon: -118.2437, elevation: 71, timezone: "America/Los_Angeles" },
          { name: "San Francisco", lat: 37.7749, lon: -122.4194, elevation: 16, timezone: "America/Los_Angeles" },
          { name: "San Diego", lat: 32.7157, lon: -117.1611, elevation: 20, timezone: "America/Los_Angeles" },
          { name: "Sacramento", lat: 38.5816, lon: -121.4944, elevation: 9, timezone: "America/Los_Angeles" }
        ]
      },
      {
        name: "New York",
        lat: 40.7128,
        lon: -74.0060,
        cities: [
          { name: "New York City", lat: 40.7128, lon: -74.0060, elevation: 10, timezone: "America/New_York" },
          { name: "Buffalo", lat: 42.8864, lon: -78.8784, elevation: 183, timezone: "America/New_York" },
          { name: "Albany", lat: 42.6526, lon: -73.7562, elevation: 43, timezone: "America/New_York" }
        ]
      },
      {
        name: "Florida",
        lat: 27.6648,
        lon: -81.5158,
        cities: [
          { name: "Miami", lat: 25.7617, lon: -80.1918, elevation: 2, timezone: "America/New_York" },
          { name: "Orlando", lat: 28.5383, lon: -81.3792, elevation: 25, timezone: "America/New_York" },
          { name: "Tampa", lat: 27.9506, lon: -82.4572, elevation: 14, timezone: "America/New_York" },
          { name: "Key West", lat: 24.5551, lon: -81.7800, elevation: 1, timezone: "America/New_York" }
        ]
      },
      {
        name: "Texas",
        lat: 31.9686,
        lon: -99.9018,
        cities: [
          { name: "Austin", lat: 30.2672, lon: -97.7431, elevation: 149, timezone: "America/Chicago" },
          { name: "Houston", lat: 29.7604, lon: -95.3698, elevation: 15, timezone: "America/Chicago" },
          { name: "Dallas", lat: 32.7767, lon: -96.7970, elevation: 131, timezone: "America/Chicago" }
        ]
      },
      {
        name: "Washington",
        lat: 47.7511,
        lon: -120.7401,
        cities: [
          { name: "Seattle", lat: 47.6062, lon: -122.3321, elevation: 53, timezone: "America/Los_Angeles" },
          { name: "Spokane", lat: 47.6588, lon: -117.4260, elevation: 572, timezone: "America/Los_Angeles" }
        ]
      },
      {
        name: "Illinois",
        lat: 40.6331,
        lon: -89.3985,
        cities: [
          { name: "Chicago", lat: 41.8781, lon: -87.6298, elevation: 181, timezone: "America/Chicago" }
        ]
      }
    ]
  },

  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    lat: 46.2276,
    lon: 2.2137,
    regions: [
      {
        name: "Île-de-France",
        lat: 48.8566,
        lon: 2.3522,
        cities: [
          { name: "Paris", lat: 48.8566, lon: 2.3522, elevation: 35, timezone: "Europe/Paris" },
          { name: "Versailles", lat: 48.8014, lon: 2.1301, elevation: 130, timezone: "Europe/Paris" }
        ]
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        lat: 43.9352,
        lon: 6.0679,
        cities: [
          { name: "Marseille", lat: 43.2965, lon: 5.3698, elevation: 12, timezone: "Europe/Paris" },
          { name: "Nice", lat: 43.7102, lon: 7.2620, elevation: 10, timezone: "Europe/Paris" },
          { name: "Cannes", lat: 43.5528, lon: 7.0174, elevation: 8, timezone: "Europe/Paris" }
        ]
      },
      {
        name: "Auvergne-Rhône-Alpes",
        lat: 45.7640,
        lon: 4.8357,
        cities: [
          { name: "Lyon", lat: 45.7640, lon: 4.8357, elevation: 173, timezone: "Europe/Paris" },
          { name: "Grenoble", lat: 45.1885, lon: 5.7245, elevation: 212, timezone: "Europe/Paris" },
          { name: "Chamonix", lat: 45.9237, lon: 6.8694, elevation: 1035, timezone: "Europe/Paris" }
        ]
      },
      {
        name: "Nouvelle-Aquitaine",
        lat: 44.8378,
        lon: -0.5792,
        cities: [
          { name: "Bordeaux", lat: 44.8378, lon: -0.5792, elevation: 6, timezone: "Europe/Paris" }
        ]
      }
    ]
  },

  {
    code: "DE",
    name: "Deutschland",
    flag: "🇩🇪",
    lat: 51.1657,
    lon: 10.4515,
    regions: [
      {
        name: "Bayern",
        lat: 48.1351,
        lon: 11.5820,
        cities: [
          { name: "München", lat: 48.1351, lon: 11.5820, elevation: 519, timezone: "Europe/Berlin" },
          { name: "Nürnberg", lat: 49.4521, lon: 11.0767, elevation: 309, timezone: "Europe/Berlin" },
          { name: "Garmisch-Partenkirchen", lat: 47.4917, lon: 11.0955, elevation: 708, timezone: "Europe/Berlin" }
        ]
      },
      {
        name: "Berlin",
        lat: 52.5200,
        lon: 13.4050,
        cities: [
          { name: "Berlin", lat: 52.5200, lon: 13.4050, elevation: 34, timezone: "Europe/Berlin" }
        ]
      },
      {
        name: "Nordrhein-Westfalen",
        lat: 50.9375,
        lon: 6.9603,
        cities: [
          { name: "Köln", lat: 50.9375, lon: 6.9603, elevation: 53, timezone: "Europe/Berlin" },
          { name: "Düsseldorf", lat: 51.2277, lon: 6.7735, elevation: 38, timezone: "Europe/Berlin" }
        ]
      },
      {
        name: "Hamburg",
        lat: 53.5511,
        lon: 9.9937,
        cities: [
          { name: "Hamburg", lat: 53.5511, lon: 9.9937, elevation: 6, timezone: "Europe/Berlin" }
        ]
      }
    ]
  },

  {
    code: "ES",
    name: "España",
    flag: "🇪🇸",
    lat: 40.4637,
    lon: -3.7492,
    regions: [
      {
        name: "Comunidad de Madrid",
        lat: 40.4168,
        lon: -3.7038,
        cities: [
          { name: "Madrid", lat: 40.4168, lon: -3.7038, elevation: 657, timezone: "Europe/Madrid" }
        ]
      },
      {
        name: "Cataluña",
        lat: 41.3879,
        lon: 2.1699,
        cities: [
          { name: "Barcelona", lat: 41.3879, lon: 2.1699, elevation: 12, timezone: "Europe/Madrid" },
          { name: "Girona", lat: 41.9794, lon: 2.8214, elevation: 70, timezone: "Europe/Madrid" }
        ]
      },
      {
        name: "Andalucía",
        lat: 37.3891,
        lon: -5.9845,
        cities: [
          { name: "Sevilla", lat: 37.3891, lon: -5.9845, elevation: 7, timezone: "Europe/Madrid" },
          { name: "Málaga", lat: 36.7213, lon: -4.4214, elevation: 11, timezone: "Europe/Madrid" },
          { name: "Granada", lat: 37.1773, lon: -3.5986, elevation: 738, timezone: "Europe/Madrid" }
        ]
      },
      {
        name: "Islas Baleares",
        lat: 39.5696,
        lon: 2.6502,
        cities: [
          { name: "Palma de Mallorca", lat: 39.5696, lon: 2.6502, elevation: 13, timezone: "Europe/Madrid" },
          { name: "Ibiza", lat: 38.9067, lon: 1.4206, elevation: 6, timezone: "Europe/Madrid" }
        ]
      }
    ]
  },

  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    lat: 55.3781,
    lon: -3.4360,
    regions: [
      {
        name: "England",
        lat: 51.5074,
        lon: -0.1278,
        cities: [
          { name: "London", lat: 51.5074, lon: -0.1278, elevation: 25, timezone: "Europe/London" },
          { name: "Manchester", lat: 53.4808, lon: -2.2426, elevation: 38, timezone: "Europe/London" },
          { name: "Birmingham", lat: 52.4862, lon: -1.8904, elevation: 140, timezone: "Europe/London" },
          { name: "Oxford", lat: 51.7520, lon: -1.2577, elevation: 60, timezone: "Europe/London" }
        ]
      },
      {
        name: "Scotland",
        lat: 55.9533,
        lon: -3.1883,
        cities: [
          { name: "Edinburgh", lat: 55.9533, lon: -3.1883, elevation: 47, timezone: "Europe/London" },
          { name: "Glasgow", lat: 55.8642, lon: -4.2518, elevation: 26, timezone: "Europe/London" },
          { name: "Highlands (Inverness)", lat: 57.4778, lon: -4.2247, elevation: 15, timezone: "Europe/London" }
        ]
      }
    ]
  },

  {
    code: "JP",
    name: "日本 (Japan)",
    flag: "🇯🇵",
    lat: 36.2048,
    lon: 138.2529,
    regions: [
      {
        name: "関東 (Kanto)",
        lat: 35.6762,
        lon: 139.6503,
        cities: [
          { name: "Tokyo", lat: 35.6762, lon: 139.6503, elevation: 40, timezone: "Asia/Tokyo" },
          { name: "Yokohama", lat: 35.4437, lon: 139.6380, elevation: 14, timezone: "Asia/Tokyo" }
        ]
      },
      {
        name: "近畿 (Kansai)",
        lat: 34.6937,
        lon: 135.5023,
        cities: [
          { name: "Kyoto", lat: 35.0116, lon: 135.7681, elevation: 54, timezone: "Asia/Tokyo" },
          { name: "Osaka", lat: 34.6937, lon: 135.5023, elevation: 15, timezone: "Asia/Tokyo" }
        ]
      },
      {
        name: "北海道 (Hokkaido)",
        lat: 43.0618,
        lon: 141.3545,
        cities: [
          { name: "Sapporo", lat: 43.0618, lon: 141.3545, elevation: 29, timezone: "Asia/Tokyo" },
          { name: "Niseko", lat: 42.8048, lon: 140.6874, elevation: 210, timezone: "Asia/Tokyo" }
        ]
      }
    ]
  },

  {
    code: "CN",
    name: "中国 (China)",
    flag: "🇨🇳",
    lat: 35.8617,
    lon: 104.1954,
    regions: [
      {
        name: "北京 (Beijing)",
        lat: 39.9042,
        lon: 116.4074,
        cities: [
          { name: "Beijing", lat: 39.9042, lon: 116.4074, elevation: 43, timezone: "Asia/Shanghai" }
        ]
      },
      {
        name: "上海 (Shanghai)",
        lat: 31.2304,
        lon: 121.4737,
        cities: [
          { name: "Shanghai", lat: 31.2304, lon: 121.4737, elevation: 4, timezone: "Asia/Shanghai" }
        ]
      },
      {
        name: "广东 (Guangdong)",
        lat: 23.1291,
        lon: 113.2644,
        cities: [
          { name: "Guangzhou", lat: 23.1291, lon: 113.2644, elevation: 11, timezone: "Asia/Shanghai" },
          { name: "Shenzhen", lat: 22.5431, lon: 114.0579, elevation: 18, timezone: "Asia/Shanghai" }
        ]
      }
    ]
  },

  {
    code: "BR",
    name: "Brasil",
    flag: "🇧🇷",
    lat: -14.2350,
    lon: -51.9253,
    regions: [
      {
        name: "São Paulo",
        lat: -23.5505,
        lon: -46.6333,
        cities: [
          { name: "São Paulo", lat: -23.5505, lon: -46.6333, elevation: 760, timezone: "America/Sao_Paulo" },
          { name: "Campinas", lat: -22.9099, lon: -47.0626, elevation: 685, timezone: "America/Sao_Paulo" }
        ]
      },
      {
        name: "Rio de Janeiro",
        lat: -22.9068,
        lon: -43.1729,
        cities: [
          { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, elevation: 6, timezone: "America/Sao_Paulo" }
        ]
      }
    ]
  },

  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    lat: -25.2744,
    lon: 133.7751,
    regions: [
      {
        name: "New South Wales",
        lat: -33.8688,
        lon: 151.2093,
        cities: [
          { name: "Sydney", lat: -33.8688, lon: 151.2093, elevation: 19, timezone: "Australia/Sydney" }
        ]
      },
      {
        name: "Victoria",
        lat: -37.8136,
        lon: 144.9631,
        cities: [
          { name: "Melbourne", lat: -37.8136, lon: 144.9631, elevation: 31, timezone: "Australia/Melbourne" }
        ]
      },
      {
        name: "Queensland",
        lat: -27.4698,
        lon: 153.0251,
        cities: [
          { name: "Brisbane", lat: -27.4698, lon: 153.0251, elevation: 28, timezone: "Australia/Brisbane" },
          { name: "Cairns", lat: -16.9186, lon: 145.7781, elevation: 8, timezone: "Australia/Brisbane" }
        ]
      }
    ]
  },

  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    lat: 23.4241,
    lon: 53.8478,
    regions: [
      {
        name: "Dubai",
        lat: 25.2048,
        lon: 55.2708,
        cities: [
          { name: "Dubai", lat: 25.2048, lon: 55.2708, elevation: 5, timezone: "Asia/Dubai" }
        ]
      },
      {
        name: "Abu Dhabi",
        lat: 24.4539,
        lon: 54.3773,
        cities: [
          { name: "Abu Dhabi", lat: 24.4539, lon: 54.3773, elevation: 7, timezone: "Asia/Dubai" }
        ]
      }
    ]
  },

  {
    code: "CH",
    name: "Schweiz / Suisse / Svizzera",
    flag: "🇨🇭",
    lat: 46.8182,
    lon: 8.2275,
    regions: [
      {
        name: "Zürich",
        lat: 47.3769,
        lon: 8.5417,
        cities: [
          { name: "Zürich", lat: 47.3769, lon: 8.5417, elevation: 408, timezone: "Europe/Zurich" }
        ]
      },
      {
        name: "Genève",
        lat: 46.2044,
        lon: 6.1432,
        cities: [
          { name: "Genève", lat: 46.2044, lon: 6.1432, elevation: 375, timezone: "Europe/Zurich" }
        ]
      },
      {
        name: "Ticino",
        lat: 46.0037,
        lon: 8.9511,
        cities: [
          { name: "Lugano", lat: 46.0037, lon: 8.9511, elevation: 273, timezone: "Europe/Zurich" }
        ]
      },
      {
        name: "Valais",
        lat: 45.9765,
        lon: 7.7491,
        cities: [
          { name: "Zermatt (Matterhorn)", lat: 45.9765, lon: 7.7491, elevation: 1608, timezone: "Europe/Zurich" }
        ]
      }
    ]
  }
];

// Dynamic Global Geocoding Query (GeoNames data via Open-Meteo, localized names)
export async function searchGlobalLocations(query, lang = "en") {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(apiUrl("geocoding-api", "/v1/search", {
      name: query.trim(),
      count: 20,
      language: lang,
      format: "json"
    }));
    if (!res.ok) throw new Error("Network geocoding error");
    const data = await res.json();
    if (!data.results || !data.results.length) return [];

    return data.results.map(r => ({
      name: r.name,
      country: r.country || "",
      countryCode: r.country_code || "",
      region: [r.admin2 && r.admin2 !== r.name ? r.admin2 : null, r.admin1].filter(Boolean).join(", "),
      population: r.population || null,
      lat: r.latitude,
      lon: r.longitude,
      elevation: r.elevation ?? null,
      timezone: r.timezone || "auto"
    }));
  } catch (err) {
    console.warn("Geocoding API fallback to internal search:", err);
    // Local fallback matching
    const q = query.toLowerCase();
    const matches = [];
    for (const c of geoHierarchy) {
      for (const r of c.regions) {
        for (const city of r.cities) {
          if (city.name.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)) {
            matches.push({
              name: city.name,
              country: c.name,
              countryCode: c.code,
              region: r.name,
              lat: city.lat,
              lon: city.lon,
              elevation: city.elevation,
              timezone: city.timezone
            });
          }
        }
      }
    }
    return matches.slice(0, 8);
  }
}
