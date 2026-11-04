import { Page, expect } from '@playwright/test';
import { ReservePage } from './ReservePage';

// 宿泊プラン一覧画面
export class PlansPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 指定したプランの予約画面を開いて、宿泊予約画面の部品を返す
  async openReserve(planName: string): Promise<ReservePage> {
    // 宿泊プラン一覧の画面を開く
    await this.page.goto('/ja/plans.html');

    // 予約画面は新しいタブで開くため、クリックする前に「新しいタブが開くのを待つ」準備をしておく
    const page1Promise = this.page.waitForEvent('popup');

    // 指定したプランのカードの中にある「このプランで予約」をクリックする
    await this.page.locator('.card').filter({ hasText: planName }).getByRole('link', { name: 'このプランで予約' }).click();

    // 開いた新しいタブ（予約画面）を受け取る
    const page1 = await page1Promise;

    // 新しいタブを使って、宿泊予約画面の部品を作る
    const reserve = new ReservePage(page1);

    // 予約画面にプラン名が表示されるまで待つ（準備が終わる前に入力しないようにするため）
    await expect(reserve.planName).toHaveText(planName);

    // 準備ができた宿泊予約画面の部品を返す
    return reserve;
  }
}
