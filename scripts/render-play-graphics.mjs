// Google Play graphics: 512x512 icon and 1024x500 feature graphic (from assets/icon.svg).
import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";

const OUT = "store-assets/play";
await mkdir(OUT, { recursive: true });
const svg = await readFile("assets/icon.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
await page.setContent(`<html><body style="margin:0">${svg.replace('width="1024" height="1024"', 'width="512" height="512"')}</body></html>`);
await page.screenshot({ path: `${OUT}/icon-512.png` });

await page.setViewportSize({ width: 1024, height: 500 });
const pill = (label, c) => `<div style="padding:10px 20px;border-radius:14px;background:${c};color:#fff;font:800 26px system-ui;box-shadow:0 8px 24px rgba(0,0,0,.35)">${label}</div>`;
await page.setContent(`<html><body style="margin:0;width:1024px;height:500px;overflow:hidden;
  background:radial-gradient(circle at 78% 25%,#0ea5e955,transparent 55%),linear-gradient(135deg,#050812,#0b2545);font-family:system-ui">
  <div style="position:absolute;left:64px;top:95px;display:flex;align-items:center;gap:34px">
    <div style="width:270px;height:270px;border-radius:60px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5)">${svg.replace('width="1024" height="1024"', 'width="270" height="270"')}</div>
    <div style="color:#fff;font-weight:900;font-size:72px;letter-spacing:-2px;line-height:1;margin-top:-80px">Aetheria<br><span style="color:#38bdf8">Weather 3D</span></div>
  </div>
  <div style="position:absolute;left:368px;top:300px;display:flex;gap:14px">
    ${pill("🌍 3D", "#0284c7")}${pill("🌧 2h", "#2563eb")}${pill("📅 14", "#7c3aed")}${pill("☀️ UV", "#d97706")}
  </div>
</body></html>`);
await page.screenshot({ path: `${OUT}/feature-graphic-1024x500.png` });
await browser.close();
console.log("play graphics rendered");
