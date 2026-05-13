const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  async function logState(label) {
    const state = await page.evaluate(() => ({
      href: window.location.href,
      cookie: document.cookie,
      search: window.location.search,
      cartText: document.body.innerText.includes('Your cart is empty')
        ? 'empty'
        : document.body.innerText.includes('Review your selected services')
          ? 'has-items'
          : 'unknown',
    }));
    console.log(label, JSON.stringify(state));
  }

  await page.goto('https://southerncitiesconstruction.com/services/investors/investor-review', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Add to Cart' }).first().click();
  await page.waitForLoadState('networkidle');
  await logState('after-first-add');

  await page.goto('https://southerncitiesconstruction.com/services/investors/budget-review', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Add to Cart' }).first().click();
  await page.waitForLoadState('networkidle');
  await logState('after-second-add');

  await browser.close();
})();
