import { test, expect } from '@playwright/test';
import { ReservePage } from '../pages/ReservePage';
import { PlansPage } from '../pages/PlansPage';

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
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.checkIn.fill(nearestDay(1));
  await reserve.nights.fill('1');
  await reserve.people.fill('1');
  await expect(reserve.total).toContainText('5,500円');
});

test('曜日-02（素泊まり・直近の土曜から1泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.checkIn.fill(nearestDay(6));
  await reserve.nights.fill('1');
  await reserve.people.fill('1');
  await expect(reserve.total).toContainText('6,875円');
});

test('曜日-03（素泊まり・直近の金曜から2泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.checkIn.fill(nearestDay(5));
  await reserve.nights.fill('2');
  await reserve.people.fill('1');
  await expect(reserve.total).toContainText('12,375円');
});

test('曜日-04（素泊まり・直近の日曜から2泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.checkIn.fill(nearestDay(0));
  await reserve.nights.fill('2');
  await reserve.people.fill('1');
  await expect(reserve.total).toContainText('12,375円');
});