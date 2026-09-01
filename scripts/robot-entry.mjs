import { chromium } from 'playwright'

const BASE = process.env.SMOKE_URL ?? 'http://localhost:5173/'
const OUT = process.env.SMOKE_OUT ?? '/tmp/robomotion-entry'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

const summary = () =>
  page.evaluate(
    () =>
      document
        .querySelector('atomic-commerce-query-summary')
        ?.shadowRoot?.textContent?.replace(/\s+/g, ' ')
        .trim() ?? '(none)'
  )

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
await page.screenshot({ path: `${OUT}-01-landing.png` })

// Path A: the sticky robot-select empty-state entry point.
console.log('A. "Find parts for your robot" visible:', await page.locator('button', { hasText: 'Find parts for your robot' }).count())
await page.locator('button', { hasText: 'Find parts for your robot' }).click()
await page.waitForTimeout(3000)
console.log('   after click:', await summary())
console.log('   robot cards offering parts:', await page.locator('button', { hasText: 'Find parts for this' }).count())
await page.screenshot({ path: `${OUT}-02-robots.png` })

// Path B: reproduce the reported confusion. Shortlist a part with no anchor,
// then use the Compatible Robots facet and check the panel reacts.
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

const add = page.locator('button', { hasText: 'Add to your parts' }).first()
await add.waitFor({ timeout: 15000 })
await add.click()
await page.waitForTimeout(700)
const emptyText = await page.locator('.config-panel__anchor').innerText()
console.log('B. panel with parts, no robot:', emptyText.replace(/\s+/g, ' ').trim())
console.log('   "Browse robots" affordance present:', await page.locator('.config-panel button', { hasText: 'Browse robots' }).count())
await page.screenshot({ path: `${OUT}-03-panel-empty.png` })

// Now select a Compatible Robots facet value the way a user would.
const facetCheckbox = page
  .locator('atomic-commerce-facet')
  .filter({ hasText: 'Compatible Robots' })
  .locator('[part~="value-checkbox"]')
  .first()
if (await facetCheckbox.count()) {
  await facetCheckbox.click()
  await page.waitForTimeout(3000)
  const afterFacet = await page.locator('.config-panel__anchor').innerText()
  console.log('   panel after selecting a Compatible Robots value:', afterFacet.replace(/\s+/g, ' ').trim())
  await page.screenshot({ path: `${OUT}-04-panel-facet.png` })
} else {
  console.log('   could not find Compatible Robots checkbox')
}

console.log('console errors:', errors.length)
errors.slice(0, 5).forEach((e) => console.log('  -', e.slice(0, 160)))
await browser.close()
