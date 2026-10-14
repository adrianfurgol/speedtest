const { test, expect } = require('@playwright/test');
const { baseUrls } = require('./helpers/env');

const specialTitle = 'Grüße "Tempo" \'Österreich\'';
const specialTagline = 'No "Flash", <No Java>, No Websockets & No Bullsh*t';
const apostropheTagline = "It'd rather be fast!";

test.describe('TITLE and TAGLINE special characters', () => {
  test('modern page title supports umlauts and quotes', async ({ page }) => {
    await page.goto(`${baseUrls.standaloneNew}/index-modern.html`);
    await expect(page).toHaveTitle(`${specialTitle} - Free and Open Source Speedtest`);
    await expect(page.locator('main > h1')).toHaveText(specialTitle);
    await expect(page.locator('main > p.tagline')).toHaveText(specialTagline);
  });

  test('classic heading supports umlauts and quotes', async ({ page }) => {
    await page.goto(`${baseUrls.standaloneNew}/index-classic.html`);
    await expect(page.locator('h1').first()).toHaveText(specialTitle);
  });

  test('stability title falls back to TITLE with the stability suffix', async ({ page }) => {
    await page.goto(`${baseUrls.standaloneNew}/stability.html`);
    await expect(page).toHaveTitle(`${specialTitle} - Stability Test`);
    await expect(page.locator('h1')).toHaveText(`${specialTitle} - Stability Test`);
  });

  test('stability-specific title overrides TITLE and safely renders special characters', async ({ page }) => {
    const stabilityTitle = 'Stabilité "Test" <custom> & \'quotes\' / $value';
    await page.goto(`${baseUrls.standaloneApostrophe}/stability.html`);
    await expect(page).toHaveTitle(stabilityTitle);
    await expect(page.locator('h1')).toHaveText(stabilityTitle);
    await expect(page.locator('h1 custom')).toHaveCount(0);
  });

  test('modern page tagline renders apostrophe correctly', async ({ page }) => {
    await page.goto(`${baseUrls.standaloneApostrophe}/index-modern.html`);
    await expect(page.locator('main > p.tagline')).toHaveText(apostropheTagline);
  });
});
