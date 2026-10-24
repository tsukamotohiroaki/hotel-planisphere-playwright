import { test, expect } from '@playwright/test';

test('baseURLが反映されている', async ({ page }) => {
  await page.goto('/ja/');
  await expect(page).toHaveURL('https://hotel-example-site.takeyaqa.dev/ja/');
});