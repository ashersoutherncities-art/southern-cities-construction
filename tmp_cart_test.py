from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto('http://localhost:3001/services/investors', wait_until='networkidle')
    page.get_by_role('link', name='View Details').first.click()
    page.wait_for_load_state('networkidle')
    page.get_by_role('link', name='Add to Cart').click()
    page.wait_for_load_state('networkidle')
    print('after first add:', page.url)
    print('cart text 1:', page.get_by_role('link', name='Cart (1)').count())

    page.goto('http://localhost:3001/services/investors', wait_until='networkidle')
    page.get_by_role('link', name='View Details').nth(1).click()
    page.wait_for_load_state('networkidle')
    page.get_by_role('link', name='Add to Cart').click()
    page.wait_for_load_state('networkidle')
    print('after second add:', page.url)
    print('cart page content snippet:', page.locator('body').inner_text()[:1200])
    browser.close()
