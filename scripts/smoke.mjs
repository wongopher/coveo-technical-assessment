import { chromium } from 'playwright'

const BASE = process.env.SMOKE_URL ?? 'http://localhost:5173/'
const OUT = process.env.SMOKE_OUT ?? '/tmp/robomotion'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

const cards = await page.locator('.card').count()
const summary = await page
  .locator('atomic-commerce-query-summary')
  .first()
  .innerText()
  .catch(() => '(none)')
const facets = await page.evaluate(() =>
  [...document.querySelectorAll('atomic-commerce-facets *')]
    .map((el) => el.shadowRoot?.querySelector('[part="label-button"]')?.textContent?.trim())
    .filter(Boolean)
)

console.log('cards:', cards)
console.log('summary:', summary.replace(/\s+/g, ' ').trim())
console.log('facets:', JSON.stringify(facets))
console.log('console errors:', errors.length)
errors.slice(0, 8).forEach((e) => console.log('  -', e.slice(0, 200)))

await page.screenshot({ path: `${OUT}-01-landing.png`, fullPage: false })

// Drive the demo path: search, then anchor a robot, then shortlist a part.
await page.evaluate(() => {
  const box = document.querySelector('atomic-commerce-search-box')
  const input = box?.shadowRoot?.querySelector('input, textarea')
  if (!input) return
  const proto =
    input instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(input, 'welding')
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
})
await page.waitForTimeout(3000)
await page.screenshot({ path: `${OUT}-02-search.png`, fullPage: false })

const searchCards = await page.locator('.card').count()
const searchSummary = await page
  .locator('atomic-commerce-query-summary')
  .first()
  .innerText()
  .catch(() => '(none)')
console.log('after search — cards:', searchCards, '| summary:', searchSummary.replace(/\s+/g, ' ').trim())

const partsBtn = page.locator('button', { hasText: 'Add to your parts' }).first()
if (await partsBtn.count()) {
  await partsBtn.click()
  await page.waitForTimeout(800)
  const panel = await page.locator('.config-panel').count()
  console.log('parts panel visible after add:', panel > 0)
  await page.screenshot({ path: `${OUT}-03-parts.png`, fullPage: false })
}

console.log('final console errors:', errors.length)
await browser.close()
