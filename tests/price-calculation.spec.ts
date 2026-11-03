import { test, expect } from '@playwright/test';
import { PlansPage } from '../pages/PlansPage';
import * as holiday_jp from '@holiday-jp/holiday_jp';

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

  return formatDate(date);
}

// 実行日から見て、直近の平日の祝日の日付を「yyyy/mm/dd」の形で返す。
// 宿泊日は当日を選べないため、明日から数え始める。
// 祝日は国が決めるため、祝日の一覧はパッケージ（@holiday-jp/holiday_jp）を使う。
function nearestWeekdayHoliday(): string {
  // 今日の日付を用意して、明日にする
  const date = new Date();
  date.setDate(date.getDate() + 1);

  // 平日（月〜金）の祝日になるまで、1日ずつ進める
  while (!(holiday_jp.isHoliday(date) && date.getDay() >= 1 && date.getDay() <= 5)) {
    date.setDate(date.getDate() + 1);
  }

  return formatDate(date);
}

// 日付を、宿泊日の欄に入力できる「yyyy/mm/dd」の形にする
// getMonth() は 1月が 0 なので +1 する。1桁のときは前に 0 を付けて 2桁にする
function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}

test('曜日-01（素泊まり・直近の月曜から1泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(1), '1', '1');
  await expect(reserve.total).toContainText('5,500円');
});

test('曜日-02（素泊まり・直近の土曜から1泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(6), '1', '1');
  await expect(reserve.total).toContainText('6,875円');
});

test('曜日-03（素泊まり・直近の金曜から2泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(5), '2', '1');
  await expect(reserve.total).toContainText('12,375円');
});

test('曜日-04（素泊まり・直近の日曜から2泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(0), '2', '1');
  await expect(reserve.total).toContainText('12,375円');
});

test('曜日-05（素泊まり・直近の平日の祝日から1泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestWeekdayHoliday(), '1', '1');
  await expect(reserve.total).toContainText('5,500円');
});

test('宿泊数-02（素泊まり・月曜から9泊・1人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(1), '9', '1');
  await expect(reserve.total).toContainText('52,250円');
});

test('宿泊数-03（カップル限定プラン・月曜から1泊・2人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('カップル限定プラン');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('カップル限定プラン');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(1), '1', '2');
  await expect(reserve.total).toContainText('16,000円');
});

test('宿泊数-04（カップル限定プラン・月曜から2泊・2人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('カップル限定プラン');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('カップル限定プラン');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(1), '2', '2');
  await expect(reserve.total).toContainText('32,000円');
});

test('人数-02（素泊まり・直近の月曜から1泊・2人・追加なし）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(1), '1', '2');
  await expect(reserve.total).toContainText('11,000円');
});

test.describe('追加プラン（素泊まり・直近の月曜から2泊・2人）', () => {
  test('追加プラン-01（朝食バイキング・昼からチェックインプラン・お得な観光プラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.check();
    await reserve.earlyCheckIn.check();
    await reserve.sightseeing.check();
    await expect(reserve.total).toContainText('30,000円');
  });

  test('追加プラン-02（朝食バイキング・昼からチェックインプラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.check();
    await reserve.earlyCheckIn.check();
    await reserve.sightseeing.uncheck();
    await expect(reserve.total).toContainText('28,000円');
  });

  test('追加プラン-03（朝食バイキング・お得な観光プラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.check();
    await reserve.earlyCheckIn.uncheck();
    await reserve.sightseeing.check();
    await expect(reserve.total).toContainText('28,000円');
  });

  test('追加プラン-04（朝食バイキング）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.check();
    await reserve.earlyCheckIn.uncheck();
    await reserve.sightseeing.uncheck();
    await expect(reserve.total).toContainText('26,000円');
  });

  test('追加プラン-05（昼からチェックインプラン・お得な観光プラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.uncheck();
    await reserve.earlyCheckIn.check();
    await reserve.sightseeing.check();
    await expect(reserve.total).toContainText('26,000円');
  });

  test('追加プラン-06（昼からチェックインプラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.uncheck();
    await reserve.earlyCheckIn.check();
    await reserve.sightseeing.uncheck();
    await expect(reserve.total).toContainText('24,000円');
  });

  test('追加プラン-07（お得な観光プラン）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.uncheck();
    await reserve.earlyCheckIn.uncheck();
    await reserve.sightseeing.check();
    await expect(reserve.total).toContainText('24,000円');
  });

  test('追加プラン-08（追加プランなし）', async ({ page }) => {
    const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
    const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
    await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
    await reserve.fillStay(nearestDay(1), '2', '2');
    await reserve.breakfast.uncheck();
    await reserve.earlyCheckIn.uncheck();
    await reserve.sightseeing.uncheck();
    await expect(reserve.total).toContainText('22,000円');
  });
});

test('追加プラン-土日-01（素泊まり・直近の土曜から2泊・2人・朝食バイキング・昼からチェックインプラン・お得な観光プラン）', async ({ page }) => {
  const plans = new PlansPage(page);                    // 宿泊プラン一覧の部品を作る
  const reserve = await plans.openReserve('素泊まり');   // プランを選んで、宿泊予約画面の部品を受け取る
  await expect(reserve.planName).toHaveText('素泊まり');   // 準備が終わるのを待つ
  await reserve.fillStay(nearestDay(6), '2', '2');
  await reserve.breakfast.check();
  await reserve.earlyCheckIn.check();
  await reserve.sightseeing.check();
  await expect(reserve.total).toContainText('35,500円');
});