# hotel-planisphere-playwright

テスト自動化練習サイト「HOTEL PLANISPHERE」を対象に、個人でテストプロジェクトを立ち上げ、
**テスト計画・分析・設計からPlaywrightによる自動化・CIまで**を一貫して実践しています。

## 🎯 目的

- 手動テストで培ったテスト設計の観点を、自動テストとして再実行できる資産にする
- 「何を自動化し、何を手動に残すか」の線引きを設計段階で判断する

## 🧪 テスト対象

- [HOTEL PLANISPHERE](https://hotel-example-site.takeyaqa.dev/)

## 🔁 進め方

テスト計画 → テスト分析 → テスト設計 → 自動化対象の選別 → 実装 → CIで実行

分析・設計は、各工程の成果物に対してレビューを受け、指摘をもとに書き直すサイクルで進めています。
初版・レビュー・書き直しをすべて履歴に残し、「なぜその判断に至ったか」を後から追えるようにしています。

- 成果物：`docs/test-analysis.md`、`docs/test-design.md`
- レビュー記録：`docs/reviews/`（回ごとに1ファイル）
- 設計の途中で分析の抜けに気づいた場合は、分析に戻って見直す

## 🛠 技術スタック

- Playwright / TypeScript
- GitHub Actions（pushのたびにテストを自動実行）

## 📁 構成

```
hotel-planisphere-playwright/
 ├ docs/
 │  ├ test-analysis.md
 │  ├ test-design.md
 │  └ reviews/
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
