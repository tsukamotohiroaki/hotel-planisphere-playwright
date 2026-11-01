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

  // 宿泊日・宿泊数・人数を入力する
  // 最後に Tab で人数の欄から離れて、合計を計算し直させる（Enter だとフォームを送信してしまうため Tab にする）
  async fillStay(checkIn: string, nights: string, people: string) {
    await this.checkIn.fill(checkIn);
    await this.nights.fill(nights);
    await this.people.fill(people);
    await this.people.press('Tab');
  }
}