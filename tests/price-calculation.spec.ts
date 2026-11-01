import { test, expect } from '@playwright/test';
import { ReservePage } from '../pages/ReservePage';

// 実行日から見て、直近の指定した曜日の日付を「yyyy/mm/dd」の形で返す。
// 宿泊日は当日を選べないため、明日から数え始める。
// weekday：曜日の数字（日=0, 月=1, 火=2, 水=3, 木=4, 金=5, 土=6）
// 使い方：宿泊日を直近の月曜日でテストしたい場合は、const checkIn = nearestDay(1); にする
function nearestDay(weekday: number): string {
  // 今日の日付を用意して、明日にする
  const date = new Date();
  date.setDate(date.getDate() + 1);

  // 指定した曜日になるまで、1日ずつ進める（カレンダーをめくるイメージ）
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() + 1);
  }

  // 宿泊日の欄に入力できる「yyyy/mm/dd」の形にする
  // getMonth() は 1月が 0 なので +1 する。1桁のときは前に 0 を付けて 2桁にする
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}
test('曜日-01（素泊まり・直近の月曜から1泊・1人・追加なし）', async ({ page }) => {
await page.goto('/ja/plans.html');
const page1Promise = page.waitForEvent('popup');
await page.locator('.card').filter({ hasText: '素泊まり' }).getByRole('link', { name: 'このプランで予約' }).click();
const page1 = await page1Promise;
const reserve = new ReservePage(page1);        // 宿泊予約画面の部品を作る
await reserve.checkIn.fill(nearestDay(1));
await reserve.nights.fill('1');
await reserve.people.fill('1');
await expect(reserve.total).toContainText('5,500円');
});
