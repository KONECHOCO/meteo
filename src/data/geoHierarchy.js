// Offline place database built from GeoNames (CC BY 4.0) by scripts/build-geo.mjs.
// Country → region → city browsing, name search and nearest-place lookup all run on the
// static files in public/geo, so they work offline and need no commercial geocoding API.

const GEO_BASE = `${import.meta.env.BASE_URL}geo/`;
const SEARCH_BUCKETS = 512;

const cache = new Map();

async function loadJson(rel) {
  if (!cache.has(rel)) {
    const promise = fetch(GEO_BASE + rel).then(res => {
      if (!res.ok) throw new Error(`${rel}: HTTP ${res.status}`);
      return res.json();
    });
    // Do not keep failed requests in the cache
    promise.catch(() => cache.delete(rel));
    cache.set(rel, promise);
  }
  return cache.get(rel);
}

export function normalize(s) {
  return s
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

// Must stay identical to bucketKey() in scripts/build-geo.mjs
function bucketOf(normalized) {
  const prefix = [...normalized.replace(/ /g, "")].slice(0, 2).join("");
  if (!prefix) return null;
  let h = 0;
  for (const c of prefix) h = (h * 31 + c.codePointAt(0)) >>> 0;
  return h % SEARCH_BUCKETS;
}

const displayNamesCache = new Map();
export function countryName(cc, lang) {
  if (!displayNamesCache.has(lang)) {
    try {
      displayNamesCache.set(lang, new Intl.DisplayNames([lang], { type: "region" }));
    } catch (e) {
      displayNamesCache.set(lang, null);
    }
  }
  const dn = displayNamesCache.get(lang);
  try {
    return (dn && dn.of(cc)) || cc;
  } catch (e) {
    return cc;
  }
}

// Name in the app language when GeoNames has a translation ("Milan" → "Milano" in Italian)
export function localName(name, loc, lang) {
  return (loc && loc[lang]) || name;
}

export function flagEmoji(cc) {
  return /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map(c => 0x1f1e6 + c.charCodeAt(0) - 65)) : "";
}

// [{ code, name, count }] sorted by the localized country name
export async function loadCountries(lang) {
  const list = await loadJson("countries.json");
  const collator = new Intl.Collator(lang);
  return list
    .map(([code, englishName, count]) => ({ code, name: countryName(code, lang) || englishName, count }))
    .sort((a, b) => collator.compare(a.name, b.name));
}

// [{ code, name, cities: [{ name, lat, lon, population }] }] with names in the app language
export async function loadCountryRegions(cc, lang) {
  const data = await loadJson(`c/${cc}.json`);
  const collator = new Intl.Collator(lang, { sensitivity: "base" });
  return data.regions
    .map(r => ({
      code: r.code,
      name: localName(r.name, r.loc, lang),
      cities: r.cities
        .map(([name, lat, lon, population, loc]) => ({ name: localName(name, loc, lang), lat, lon, population, timezone: "auto" }))
        .sort((a, b) => collator.compare(a.name, b.name))
    }))
    .sort((a, b) => (a.code === "") - (b.code === "") || collator.compare(a.name, b.name));
}

async function regionName(cc, admin1, lang) {
  if (!admin1) return "";
  const names = await loadJson("admin1.json");
  const entry = names[`${cc}.${admin1}`];
  return entry ? localName(entry[0], entry[1], lang) : "";
}

// Search by name prefix (native, ASCII or — for larger places — other-language names).
export async function searchGlobalLocations(query, lang = "en", limit = 20) {
  const q = normalize(query || "");
  if ([...q.replace(/ /g, "")].length < 2) return [];
  let entries;
  try {
    entries = await loadJson(`s/${bucketOf(q)}.json`);
  } catch (err) {
    console.warn("Place search failed:", err);
    return [];
  }

  const results = [];
  const seen = new Set();
  // Entries are sorted by population, so the first matches are the most relevant places
  for (const [baseName, alts, cc, admin1, lat, lon, population, loc] of entries) {
    const candidates = [baseName, ...(alts ? alts.split("|") : [])];
    const matched = candidates.find(c => normalize(c).startsWith(q));
    if (!matched) continue;
    const id = `${cc}|${admin1}|${baseName}|${lat}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const name = localName(baseName, loc, lang);
    // Show which name matched when it is not the displayed one (e.g. "München" → Monaco di Baviera)
    const matchedName = normalize(name).startsWith(q) ? null : matched;
    results.push({ name, matchedName, countryCode: cc, admin1, lat, lon, population });
    if (results.length >= limit) break;
  }

  return Promise.all(results.map(async r => ({
    ...r,
    country: countryName(r.countryCode, lang),
    region: await regionName(r.countryCode, r.admin1, lang),
    timezone: "auto"
  })));
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Nearest known place to a coordinate (for GPS). Looks in the 5° tile and its neighbours.
export async function findNearestPlace(lat, lon, lang = "en") {
  const TILE = 5;
  const baseLat = Math.floor(lat / TILE) * TILE;
  const baseLon = Math.floor(lon / TILE) * TILE;
  const keys = [];
  for (const dLat of [-TILE, 0, TILE]) {
    for (const dLon of [-TILE, 0, TILE]) {
      let tLon = baseLon + dLon;
      if (tLon >= 180) tLon -= 360;
      if (tLon < -180) tLon += 360;
      keys.push(`${baseLat + dLat}_${tLon}`);
    }
  }
  const tiles = await Promise.all(keys.map(k => loadJson(`r/${k}.json`).catch(() => [])));

  let best = null;
  for (const tile of tiles) {
    for (const [name, cc, admin1, pLat, pLon, loc] of tile) {
      const d = distanceKm(lat, lon, pLat, pLon);
      if (!best || d < best.distanceKm) best = { name: localName(name, loc, lang), countryCode: cc, admin1, lat: pLat, lon: pLon, distanceKm: d };
    }
  }
  if (!best || best.distanceKm > 50) return null;
  return {
    ...best,
    country: countryName(best.countryCode, lang),
    region: await regionName(best.countryCode, best.admin1, lang)
  };
}
