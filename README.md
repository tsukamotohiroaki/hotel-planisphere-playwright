# hotel-planisphere-playwright

テスト自動化練習サイト「HOTEL PLANISPHERE」を対象に、
**テスト分析・設計からPlaywrightによる自動化まで**を一貫して実践するリポジトリです。

## 🎯 目的

- 手動テストで培ったテスト設計の観点を、自動テストとして再実行できる資産にする
- 「何を自動化し、何を手動に残すか」の線引きを設計段階で判断する

## 🧪 テスト対象

- [HOTEL PLANISPHERE](https://hotel-example-site.takeyaqa.dev/)

## 🔁 進め方

テスト分析 → テスト設計 → 自動化対象の選別 → 実装 → CIで実行

## 🛠 技術スタック

- Playwright / TypeScript
- GitHub Actions（pushのたびにテストを自動実行）

## 📁 構成

```
hotel-planisphere-playwright/
 ├ docs/
 │  └ test-design.md
 ├ tests/
 │  ├ login.spec.ts
 │  └ reserve.spec.ts
 ├ playwright.config.ts
 └ README.md
```

## ▶ 実行方法

    npm ci
    npx playwright test
    npx playwright test --ui

## 🗺 ロードマップ

- [x] 初期セットアップ・CI構築
- [ ] トップページのUI表示確認
- [ ] ログイン
- [ ] 宿泊予約（境界値・デシジョンテーブル）
