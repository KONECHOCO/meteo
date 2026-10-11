// Builds the offline place database in public/geo from GeoNames (CC BY 4.0, commercial use allowed).
//   node scripts/build-geo.mjs [geonamesDir]
// Without a directory argument the GeoNames dumps are downloaded into .geonames-cache/ (~1 GB unzipped).
//
// Output ("loc" = { it: "Milano", de: "Mailand", ... } names in the app languages, or 0 when none differ):
//   public/geo/countries.json      [[cc, englishName, placeCount], ...]
//   public/geo/admin1.json         { "IT.09": [name, loc], ... }
//   public/geo/c/<CC>.json         { regions: [{ code, name, loc, cities: [[name, lat, lon, pop, loc?], ...] }] }
//   public/geo/s/<n>.json          search bucket n = hash(first 2 letters of a normalized name) % SEARCH_BUCKETS:
//                                  [[name, "alt|alt"|0, cc, admin1, lat, lon, pop, loc], ...]
//   public/geo/r/<lat>_<lon>.json  5° tiles for nearest-place lookup (GPS): [[name, cc, admin1, lat, lon, loc?], ...]
// Time zone and elevation are not stored: the weather API returns both for any coordinate.

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = path.join(ROOT, "public", "geo");
const SRC = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, ".geonames-cache");
const BASE_URL = "https://download.geonames.org/export/dump/";

const APP_LANGS = ["it", "en", "es", "fr", "de", "ja", "zh", "ar", "pt", "ru"];
// Populated places only: skip city sections, historical, abandoned and destroyed places.
const SKIP_FEATURES = new Set(["PPLX", "PPLH", "PPLQ", "PPLW", "PPLCH"]);
// Larger places get translated names and other-language search names; smaller ones keep their native name.
const LOCALIZE_MIN_POP = 50000;
const TILE_DEG = 5;
export const SEARCH_BUCKETS = 512;

async function ensureSource() {
  fs.mkdirSync(SRC, { recursive: true });
  for (const [zip, txt] of [["cities500.zip", "cities500.txt"], ["alternateNamesV2.zip", "alternateNamesV2.txt"], [null, "countryInfo.txt"], [null, "admin1CodesASCII.txt"]]) {
    if (fs.existsSync(path.join(SRC, txt))) continue;
    const file = zip || txt;
    if (!fs.existsSync(path.join(SRC, file))) {
      console.log(`Downloading ${file}…`);
      const res = await fetch(BASE_URL + file);
      if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
      fs.writeFileSync(path.join(SRC, file), Buffer.from(await res.arrayBuffer()));
    }
    // bsdtar (Windows 10+, macOS) and GNU tar with zip support can extract .zip archives
    if (zip) execFileSync("tar", ["-xf", zip, txt], { cwd: SRC, stdio: "inherit" });
  }
}

export function normalize(s) {
  return s
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

// Must stay identical to bucketOf() in src/data/geoHierarchy.js
export function bucketKey(normalized) {
  const prefix = [...normalized.replace(/ /g, "")].slice(0, 2).join("");
  if (!prefix) return null;
  let h = 0;
  for (const c of prefix) h = (h * 31 + c.codePointAt(0)) >>> 0;
  return h % SEARCH_BUCKETS;
}

const round4 = (v) => Math.round(v * 1e4) / 1e4;
const readTsv = (file) => fs.readFileSync(path.join(SRC, file), "utf8").split("\n").filter(l => l && !l.startsWith("#")).map(l => l.split("\t"));

function writeJson(rel, data) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data));
}

// Names in the app languages for the given GeoNames ids: Map<id, { lang: name }>
async function loadTranslations(ids) {
  const best = new Map(); // id -> lang -> { name, score }
  const rl = readline.createInterface({ input: fs.createReadStream(path.join(SRC, "alternateNamesV2.txt"), "utf8"), crlfDelay: Infinity });
  for await (const line of rl) {
    const tab1 = line.indexOf("\t");
    const tab2 = line.indexOf("\t", tab1 + 1);
    const id = line.slice(tab1 + 1, tab2);
    if (!ids.has(id)) continue;
    const [, , lang, name, preferred, short, colloquial, historic] = line.split("\t");
    if (!APP_LANGS.includes(lang) || colloquial === "1" || historic === "1" || !name) continue;
    const score = (preferred === "1" ? 2 : 0) + (short === "1" ? 0 : 1);
    if (!best.has(id)) best.set(id, {});
    const entry = best.get(id);
    if (!entry[lang] || score > entry[lang].score) entry[lang] = { name, score };
  }
  const result = new Map();
  for (const [id, langs] of best) result.set(id, Object.fromEntries(Object.entries(langs).map(([l, v]) => [l, v.name])));
  return result;
}

// Only keep translations that differ from the base name
function locFor(translations, id, baseName) {
  const all = translations.get(id);
  if (!all) return 0;
  const loc = {};
  for (const [lang, name] of Object.entries(all)) if (name !== baseName) loc[lang] = name;
  return Object.keys(loc).length ? loc : 0;
}

async function main() {
  await ensureSource();
  fs.mkdirSync(OUT, { recursive: true });
  for (const entry of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, entry), { recursive: true, force: true });

  const countryNames = new Map(readTsv("countryInfo.txt").map(r => [r[0], r[4]]));
  const admin1Rows = readTsv("admin1CodesASCII.txt");

  const places = [];
  for (const r of readTsv("cities500.txt")) {
    const [id, name, ascii, alternates, latS, lonS, , feature, cc, , adm1, , , , popS] = r;
    if (SKIP_FEATURES.has(feature) || !cc) continue;
    places.push({
      id, name, ascii, alternates,
      lat: round4(parseFloat(latS)),
      lon: round4(parseFloat(lonS)),
      pop: parseInt(popS, 10) || 0,
      cc,
      admin: adm1 && adm1 !== "00" ? adm1 : ""
    });
  }

  const idsToTranslate = new Set(admin1Rows.map(r => r[3]));
  for (const p of places) if (p.pop >= LOCALIZE_MIN_POP) idsToTranslate.add(p.id);
  console.log(`Reading translations for ${idsToTranslate.size} places and regions…`);
  const translations = await loadTranslations(idsToTranslate);

  const admin1 = {};
  for (const [key, name, , id] of admin1Rows) admin1[key] = [name, locFor(translations, id, name)];

  const byCountry = new Map();
  const buckets = new Map();
  const tiles = new Map();

  for (const p of places) {
    const loc = p.pop >= LOCALIZE_MIN_POP ? locFor(translations, p.id, p.name) : 0;

    // Country → region → cities
    if (!byCountry.has(p.cc)) byCountry.set(p.cc, new Map());
    const regions = byCountry.get(p.cc);
    if (!regions.has(p.admin)) regions.set(p.admin, []);
    regions.get(p.admin).push(loc ? [p.name, p.lat, p.lon, p.pop, loc] : [p.name, p.lat, p.lon, p.pop]);

    // Search buckets: native and ASCII names, plus translated and other-language names for larger places
    const searchNames = new Set([p.name, p.ascii]);
    if (loc) Object.values(loc).forEach(n => searchNames.add(n));
    if (p.pop >= LOCALIZE_MIN_POP && p.alternates) {
      for (const alt of p.alternates.split(",")) {
        if (alt.length >= 2 && alt.length <= 40 && !/[0-9]|https?:/.test(alt)) searchNames.add(alt);
      }
    }
    const nameNorm = normalize(p.name);
    const perBucket = new Map(); // bucket -> Map(normalized alt -> original alt)
    for (const candidate of searchNames) {
      const norm = normalize(candidate);
      if (!norm) continue;
      const key = bucketKey(norm);
      if (key === null) continue;
      if (!perBucket.has(key)) perBucket.set(key, new Map());
      // The client always tests the base name, so only names normalizing differently are stored
      if (norm !== nameNorm) perBucket.get(key).set(norm, candidate);
    }
    for (const [key, alts] of perBucket) {
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push([p.name, alts.size ? [...alts.values()].join("|") : 0, p.cc, p.admin, p.lat, p.lon, p.pop, loc]);
    }

    // Nearest-place tiles
    const tileKey = `${Math.floor(p.lat / TILE_DEG) * TILE_DEG}_${Math.floor(p.lon / TILE_DEG) * TILE_DEG}`;
    if (!tiles.has(tileKey)) tiles.set(tileKey, []);
    tiles.get(tileKey).push(loc ? [p.name, p.cc, p.admin, p.lat, p.lon, loc] : [p.name, p.cc, p.admin, p.lat, p.lon]);
  }

  const collator = new Intl.Collator("en", { sensitivity: "base" });
  const countries = [];
  for (const [cc, regions] of byCountry) {
    let count = 0;
    const regionList = [...regions].map(([code, cities]) => {
      count += cities.length;
      cities.sort((a, b) => collator.compare(a[0], b[0]));
      const [name, loc] = code ? admin1[`${cc}.${code}`] || [code, 0] : ["", 0];
      return { code, name, loc, cities };
    }).sort((a, b) => (a.code === "") - (b.code === "") || collator.compare(a.name, b.name));
    writeJson(`c/${cc}.json`, { regions: regionList });
    countries.push([cc, countryNames.get(cc) || cc, count]);
  }
  countries.sort((a, b) => collator.compare(a[1], b[1]));
  writeJson("countries.json", countries);
  writeJson("admin1.json", admin1);

  for (const [key, entries] of buckets) {
    entries.sort((a, b) => b[6] - a[6]);
    writeJson(`s/${key}.json`, entries);
  }
  for (const [key, entries] of tiles) writeJson(`r/${key}.json`, entries);

  console.log(`Places: ${places.length}, translated: ${translations.size}, countries: ${countries.length}, search buckets: ${buckets.size}, tiles: ${tiles.size}`);
}

if (import.meta.url.endsWith(path.basename(process.argv[1] || ""))) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
