import { test, expect } from '@playwright/test';

test('曜日-01（素泊まり・直近の月曜から1泊・1人・追加なし2）', async ({ page }) => {
await page.goto('https://hotel-example-site.takeyaqa.dev/ja/');
await page.getByRole('link', { name: '宿泊予約' }).click();
const page1Promise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'このプランで予約' }).nth(1).click();
const page1 = await page1Promise;
await page1.getByRole('textbox', { name: '宿泊日 必須' }).click();
await page1.getByRole('link', { name: '2', exact: true }).click();
await page1.getByRole('spinbutton', { name: '宿泊数 必須' }).click();
await page1.getByRole('spinbutton', { name: '宿泊数 必須' }).fill('1');
await page1.getByRole('spinbutton', { name: '人数 必須' }).click();
await page1.getByRole('spinbutton', { name: '人数 必須' }).fill('1');
await expect(page1.locator('#total-bill')).toContainText('5,500円');
});
