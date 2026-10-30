/**
 * Visual audit helper — captures what a visitor actually sees at each landmark,
 * so before/after comparisons are made from renders rather than from the source.
 *
 *   node scripts/visual-audit.mjs <outDir> [dark|light] [path]
 *
 * Requires the dev server on http://localhost:3000 (or BASE=...).
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = process.argv[2] || '/tmp/shots/before';
const scheme = process.argv[3] || 'dark';
const path = process.argv[4] || '/';
mkdirSync(OUT, { recursive: true });

const LANDMARKS = ['#comparison', '#features', '#install', '#providers'];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: scheme,
});
const page = await ctx.newPage();
await page.goto(BASE + path, { waitUntil: 'networkidle' });

// Reveal everything, then return to the top before shooting.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 30));
  }
});
await page.waitForTimeout(600);

// Hero: what a first-time visitor lands on.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/00-hero.png` });
console.log(`${OUT}/00-hero.png`);

for (const [i, sel] of LANDMARKS.entries()) {
  const found = await page.$(sel);
  if (!found) { console.log(`skip ${sel} (absent)`); continue; }
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, sel);
  await page.waitForTimeout(700);
  const name = `${String(i + 1).padStart(2, '0')}-${sel.slice(1)}.png`;
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log(`${OUT}/${name}`);
}

await browser.close();
console.log('done →', OUT);
