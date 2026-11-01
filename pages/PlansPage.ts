import { Page } from '@playwright/test';
import { ReservePage } from './ReservePage';

// 宿泊プラン一覧画面
export class PlansPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 指定したプランの予約画面を開いて、宿泊予約画面の部品を返す
  async openReserve(planName: string): Promise<ReservePage> {
    await this.page.goto('/ja/plans.html');
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.locator('.card').filter({ hasText: planName }).getByRole('link', { name: 'このプランで予約' }).click();
    const page1 = await page1Promise;
    return new ReservePage(page1);
  }
}
