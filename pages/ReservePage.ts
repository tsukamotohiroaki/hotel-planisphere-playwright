import { Page, Locator } from '@playwright/test';

// 宿泊予約画面
export class ReservePage {
  readonly planName: Locator;   // プラン名
  readonly checkIn: Locator;   // 宿泊日の欄
  readonly nights: Locator;    // 宿泊数の欄
  readonly people: Locator;    // 人数の欄
  readonly total: Locator;     // 合計

  constructor(page: Page) {
    this.planName = page.locator('#plan-name');
    this.checkIn = page.getByRole('textbox', { name: '宿泊日 必須' });
    this.nights = page.getByRole('spinbutton', { name: '宿泊数 必須' });
    this.people = page.getByRole('spinbutton', { name: '人数 必須' });
    this.total = page.locator('#total-bill');
  }
}
