// Store screenshots from the real web app with real data, in the chosen language.
// Prerequisite: dev server on port 5174 (`npm run dev -- --port 5174`), ideally with
// VITE_WEATHER_API_BASE in .env.development.local so the data comes from our own server.
// Usage: node scripts/capture-store-screenshots.mjs [iphone|ipad|android] [it|en|es|fr|de|ja|zh|ar|pt|ru|all]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const device = ["ipad", "android"].includes(process.argv[2]) ? process.argv[2] : "iphone";
const langArg = process.argv[3] || "it";
const SIZES = {
  iphone: { viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, suffix: "1320x2868" },
  ipad: { viewport: { width: 1032, height: 1376 }, deviceScaleFactor: 2, suffix: "ipad-2064x2752" },
  android: { viewport: { width: 360, height: 640 }, deviceScaleFactor: 3, suffix: "android-1080x1920" }
};
// One representative city per language
const SCENES = {
  it: { name: "Roma", lat: 41.8933, lon: 12.4829, cc: "IT", region: "Lazio", unit: "C" },
  en: { name: "New York", lat: 40.7143, lon: -74.006, cc: "US", region: "New York", unit: "F" },
  es: { name: "Madrid", lat: 40.4165, lon: -3.7026, cc: "ES", region: "Comunidad de Madrid", unit: "C" },
  fr: { name: "Paris", lat: 48.8534, lon: 2.3488, cc: "FR", region: "Île-de-France", unit: "C" },
  de: { name: "Berlin", lat: 52.5244, lon: 13.4105, cc: "DE", region: "Berlin", unit: "C" },
  ja: { name: "東京", lat: 35.6895, lon: 139.6917, cc: "JP", region: "東京都", unit: "C" },
  zh: { name: "上海", lat: 31.2222, lon: 121.4581, cc: "CN", region: "上海市", unit: "C" },
  ar: { name: "دبي", lat: 25.0772, lon: 55.3093, cc: "AE", region: "دبي", unit: "C" },
  pt: { name: "São Paulo", lat: -23.5475, lon: -46.6361, cc: "BR", region: "São Paulo", unit: "C" },
  ru: { name: "Москва", lat: 55.7522, lon: 37.6156, cc: "RU", region: "Москва", unit: "C" }
};
const size = SIZES[device];
const langs = langArg === "all" ? Object.keys(SCENES) : [langArg];

const browser = await chromium.launch();
for (const lang of langs) {
  const scene = SCENES[lang];
  const OUT = `store-assets/screenshots/${lang}`;
  await mkdir(OUT, { recursive: true });

  const context = await browser.newContext({
    viewport: size.viewport,
    deviceScaleFactor: size.deviceScaleFactor,
    isMobile: device !== "ipad",
    hasTouch: true,
    locale: lang
  });
  await context.addInitScript(([l, s]) => {
    localStorage.setItem("aetheria_lang", l);
    localStorage.setItem("aetheria_unit", s.unit);
    localStorage.setItem("aetheria_location", JSON.stringify({
      city: { name: s.name, lat: s.lat, lon: s.lon, timezone: "auto" },
      countryCode: s.cc,
      regionCode: null,
      label: { region: s.region, countryCode: s.cc }
    }));
  }, [lang, scene]);
  const page = await context.newPage();
  await page.goto("http://localhost:5174/?storeshot");
  await page.waitForSelector(".hero-temp-value", { timeout: 120000 });

  const shot = async (name) => {
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/${name}-${size.suffix}.png` });
    console.log("saved", lang, device, name);
  };
  // Scroll so the element starts just below the sticky header
  const scrollTo = async (selector, offset = 12) => {
    await page.evaluate(([sel, off]) => {
      const el = document.querySelector(sel);
      const header = document.querySelector(".app-header").getBoundingClientRect().bottom;
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - header - off);
    }, [selector, offset]);
  };

  // 1) Satellite globe: today's real clouds, turned towards the side lit by the Sun right now
  await page.waitForTimeout(9000);
  await page.evaluate(async () => {
    const { subSolarPoint } = await import("/src/3d/globeScene.js");
    const sun = subSolarPoint(new Date());
    window.__aetheria.globeScene.flyTo(Math.max(-35, Math.min(35, sun.lat)), sun.lon);
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
  await shot("01-globo");

  // 2) Current weather and rain in the next 2 hours
  await scrollTo(".hero-weather-card");
  await shot("02-meteo");

  // 3) Model comparison and health
  await scrollTo(".deep-analytics-grid");
  await shot("03-modelli");

  // 4) Wind & sea with the satellite rain map
  await page.locator('[data-view="radar"]').click();
  await page.waitForTimeout(6000);
  await scrollTo(".area-rain-map", 70);
  await shot("04-pioggia");

  // 5) Pro (no ads)
  await page.locator('[data-view="dashboard"]').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator("#btnPro").click();
  await shot("05-pro");

  await context.close();
}
await browser.close();
