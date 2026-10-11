// Renders assets/icon.svg to PNG 1024x1024 (icon) and 2732x2732 (splash) for @capacitor/assets.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

const svg = await readFile("assets/icon.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
await page.screenshot({ path: "assets/icon-only.png" });
await page.screenshot({ path: "assets/icon-foreground.png" });

// Splash: the app's dark background with the icon in the middle
await page.setViewportSize({ width: 2732, height: 2732 });
await page.setContent(`<html><body style="margin:0;background:#070913;display:flex;align-items:center;justify-content:center;height:2732px">
  <div style="width:700px;height:700px;border-radius:160px;overflow:hidden">${svg.replace('width="1024" height="1024"', 'width="700" height="700"')}</div></body></html>`);
await page.screenshot({ path: "assets/splash.png" });
await page.screenshot({ path: "assets/splash-dark.png" });
await browser.close();
console.log("icon + splash rendered");
