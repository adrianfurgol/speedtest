const { test, expect } = require('@playwright/test');
const { baseUrls } = require('./helpers/env');

test.describe('Docker stability title configuration', () => {
  test('falls back to TITLE with the stability suffix', async ({ page }) => {
    const expectedTitle = 'Grüße "Tempo" \'Österreich\' - Stability Test';
    await page.goto(`${baseUrls.standaloneNew}/stability.html`);
    await expect(page).toHaveTitle(expectedTitle);
    await expect(page.locator('h1')).toHaveText(expectedTitle);
  });

  test('TITLE_STABILITY overrides TITLE and safely renders special characters', async ({ page }) => {
    const stabilityTitle = 'Stabilité "Test" <custom> & \'quotes\' / $value';
    await page.goto(`${baseUrls.standaloneStabilityTitle}/stability.html`);
    await expect(page).toHaveTitle(stabilityTitle);
    await expect(page.locator('h1')).toHaveText(stabilityTitle);
    await expect(page.locator('h1 custom')).toHaveCount(0);

    await page.goto(`${baseUrls.standaloneStabilityTitle}/index-classic.html`);
    await expect(page).toHaveTitle('Main speed test');
    await expect(page.locator('h1')).toHaveText('Main speed test');
  });
});
