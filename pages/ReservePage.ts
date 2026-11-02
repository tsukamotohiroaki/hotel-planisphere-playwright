import { Page, Locator } from '@playwright/test';

// 宿泊予約画面
export class ReservePage {
  readonly planName: Locator;   // プラン名
  readonly checkIn: Locator;   // 宿泊日の欄
  readonly nights: Locator;    // 宿泊数の欄
  readonly people: Locator;    // 人数の欄
  readonly total: Locator;     // 合計
  readonly breakfast: Locator;     // 追加プラン：朝食バイキング
  readonly earlyCheckIn: Locator;  // 追加プラン：昼からチェックインプラン
  readonly sightseeing: Locator;   // 追加プラン：お得な観光プラン

  constructor(page: Page) {
    this.planName = page.locator('#plan-name');
    this.checkIn = page.getByRole('textbox', { name: '宿泊日 必須' });
    this.nights = page.getByRole('spinbutton', { name: '宿泊数 必須' });
    this.people = page.getByRole('spinbutton', { name: '人数 必須' });
    this.total = page.locator('#total-bill');
    this.breakfast = page.getByRole('checkbox', { name: '朝食バイキング' });
    this.earlyCheckIn = page.getByRole('checkbox', { name: '昼からチェックインプラン' });
    this.sightseeing = page.getByRole('checkbox', { name: 'お得な観光プラン' });
  }

  // 宿泊日・宿泊数・人数を入力する
  // 最後に Tab で人数の欄から離れて、合計を計算し直させる（Enter だとフォームを送信してしまうため Tab にする）
  async fillStay(checkIn: string, nights: string, people: string) {
    await this.checkIn.fill(checkIn);
    await this.checkIn.press('Escape');   // 宿泊日のカレンダーを閉じる（開いたままだと追加プランのチェックボックスにかぶさって押せないため）
    await this.nights.fill(nights);
    await this.people.fill(people);
    await this.people.press('Tab');
  }
}