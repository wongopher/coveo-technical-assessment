import { chromium } from 'playwright'

const BASE = process.env.SMOKE_URL ?? 'http://localhost:5173/'
const OUT = process.env.SMOKE_OUT ?? '/tmp/robomotion-config'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

const errors = []
page.on('pageerror', (err) => errors.push(err.message))
page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))

const search = async (query) => {
  const input = page.locator('atomic-commerce-search-box [part="textarea"]').first()
  await input.click()
  await input.fill('')
  await input.type(query, { delay: 20 })
  await page.keyboard.press('Enter')
  await page.waitForTimeout(2800)
}

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

// 1. Broad query for a robot.
await search('6-axis robot arm')
console.log('1. after "6-axis robot arm":', await summary())

const anchorBtn = page.locator('button', { hasText: 'Find parts for this' }).first()
console.log('   robots offering parts anchor:', await page.locator('button', { hasText: 'Find parts for this' }).count())

if (!(await anchorBtn.count())) {
  console.log('   NO ROBOT CARD FOUND — cannot test configuration flow')
  await page.screenshot({ path: `${OUT}-no-robot.png` })
  await browser.close()
  process.exit(1)
}

const anchorName = await anchorBtn.locator('xpath=../..').locator('.card__title').innerText()
console.log('   anchoring on:', anchorName.replace(/\s+/g, ' ').trim())
await page.screenshot({ path: `${OUT}-01-robots.png` })

// 2. Anchor the configuration on that robot.
await anchorBtn.click()
await page.waitForTimeout(2800)
console.log('2. after anchoring:', await summary())

const selectedFacets = await page.evaluate(() =>
  [...document.querySelectorAll('atomic-commerce-breadbox')]
    .map((el) => el.shadowRoot?.textContent?.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
)
console.log('   breadbox:', JSON.stringify(selectedFacets).slice(0, 300))
await page.screenshot({ path: `${OUT}-02-anchored.png` })

// 3. Now search for tooling; results should be fitment-filtered.
await search('MIG torch')
console.log('3. after "MIG torch" with robot anchored:', await summary())

const matchPills = await page.locator('.pill--match').count()
const reasons = await page.locator('.card__reason').count()
console.log('   fitment-match pills:', matchPills, '| fitment notes:', reasons)

const addBtn = page.locator('button', { hasText: 'Add to your parts' }).first()
if (await addBtn.count()) {
  await addBtn.click()
  await page.waitForTimeout(900)
}
await page.screenshot({ path: `${OUT}-03-fitment.png` })

const rows = await page.locator('.compare tbody tr').count()
const total = await page.locator('.compare tfoot td').innerText().catch(() => '(none)')
console.log('4. parts list rows:', rows, '| total:', total.trim())

console.log('console errors:', errors.length)
errors.slice(0, 5).forEach((e) => console.log('  -', e.slice(0, 160)))

await browser.close()
