# 部署別テンプレート集

組織構築時に各部署フォルダへ配置する `_template.md` のテンプレート。
言語設定に応じて日本語版または英語版を使い分ける。

---

## 1. 秘書室

### デイリーTODO（secretary/todos/_template.md）

```markdown
---
date: "{{YYYY-MM-DD}}"
type: daily
---

# {{YYYY-MM-DD}} ({{DAY_OF_WEEK}})

## 最優先
- [ ]

## 通常
- [ ]

## 余裕があれば
- [ ]

## 完了
- [x]

## メモ・振り返り
-
```

### Inbox（secretary/inbox/_template.md）

```markdown
---
date: "{{YYYY-MM-DD}}"
type: inbox
---

# Inbox - {{YYYY-MM-DD}}

## キャプチャ

- **{{HH:MM}}** |
```

### 壁打ち・相談メモ（secretary/notes/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
topic: ""
type: note
tags: []
---

# [相談テーマ]

## 背景・きっかけ
何について考えたい？

## 議論・思考メモ
-

## 結論・ネクストアクション
- [ ]
```

### 秘書室トップ（secretary/_template.md）

```markdown
---
type: department
name: 秘書室
role: 窓口・相談役・タスク管理
---

# 秘書室

何でもお気軽にどうぞ。TODO管理、壁打ち、メモ、何でも承ります。

## サブフォルダ
- `inbox/` - クイックキャプチャ。とりあえずここに
- `todos/` - 日次タスク管理
- `notes/` - 壁打ち・相談メモ
```

---

## 2. CEO

### 意思決定ログ（ceo/decisions/_template.md）

```markdown
---
date: "{{YYYY-MM-DD}}"
decision: ""
departments: []
status: decided
---

# 意思決定: [タイトル]

## 背景
何が起きた？何が求められた？

## 判断内容
何を決めた？

## 振り分け先
| 部署 | 指示内容 |
|------|---------|
|      |         |

## 理由
なぜこの判断？

## フォローアップ
- [ ]
```

---

## 3. レビュー

### 週次レビュー（reviews/_template.md）

```markdown
---
week: "{{YYYY}}-W{{WW}}"
period: "{{START_DATE}} ~ {{END_DATE}}"
type: weekly-review
---

# 週次レビュー: {{YYYY}}-W{{WW}}

## 完了したタスク
- [x]

## 各部署の動き

### 秘書室
-

### PM
-

### その他
-

## うまくいったこと
-

## 改善できること
-

## 学び・気づき
-

## 来週の目標
- [ ]

## 持ち越し（未完了）
- [ ]
```

---

## 4. PM（プロジェクト管理）

### 部署トップ（pm/_template.md）

```markdown
---
type: department
name: PM
role: プロジェクト進捗・マイルストーン・チケット管理
---

# PM（プロジェクト管理）

プロジェクトの立ち上げから完了まで管理します。

## サブフォルダ
- `projects/` - プロジェクトごとの管理ファイル
- `tickets/` - タスクチケット
```

### プロジェクト（pm/projects/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
project: ""
status: planning
tags: []
---

# プロジェクト: [名前]

## 概要
このプロジェクトは何？

## ゴール
何を達成する？

## マイルストーン
| # | マイルストーン | 期限 | 状態 |
|---|-------------|------|------|
| 1 |             |      | 未着手 |

## 関連部署
-

## メモ
-
```

### チケット（pm/tickets/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
project: ""
assignee: ""
priority: normal
status: open
---

# [チケットタイトル]

## 内容
何をする？

## 完了条件
- [ ]

## メモ
-
```

---

## 5. リサーチ

### 部署トップ（research/_template.md）

```markdown
---
type: department
name: リサーチ
role: 市場調査・競合分析・技術調査
---

# リサーチ

調査・分析を担当します。

## サブフォルダ
- `topics/` - 調査トピックごとのファイル
```

### 調査トピック（research/topics/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
topic: ""
status: in-progress
tags: []
---

# 調査: [トピック]

## 目的
なぜ調査する？

## 調査内容

### 情報源 1
- URL:
- 要点:

## 結論
-

## ネクストアクション
- [ ]

## 参考リンク
-
```

---

## 6. マーケティング

### 部署トップ（marketing/_template.md）

```markdown
---
type: department
name: マーケティング
role: コンテンツ企画・SNS戦略・集客
---

# マーケティング

コンテンツ企画と集客を担当します。

## サブフォルダ
- `content-plan/` - コンテンツ企画
- `campaigns/` - キャンペーン管理
```

### コンテンツ企画（marketing/content-plan/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
platform: ""
status: draft
publish_date: ""
tags: []
---

# [コンテンツタイトル]

## プラットフォーム
ブログ / YouTube / SNS / その他

## ターゲット
誰に向けて？

## 構成
1.
2.
3.

## キーメッセージ


## 下書き


## ステータス
- [ ] 構成
- [ ] 下書き
- [ ] レビュー
- [ ] 公開
```

### キャンペーン（marketing/campaigns/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
campaign: ""
status: planning
period: ""
---

# キャンペーン: [名前]

## 目的
何を達成する？

## ターゲット
-

## チャネル
-

## 予算
-

## KPI
| 指標 | 目標 | 実績 |
|------|------|------|
|      |      |      |

## 振り返り
-
```

---

## 7. 開発

### 部署トップ（engineering/_template.md）

```markdown
---
type: department
name: 開発
role: 技術ドキュメント・設計・デバッグ
---

# 開発

技術的なドキュメントと設計を管理します。

## サブフォルダ
- `docs/` - 技術ドキュメント・設計書
- `debug-log/` - デバッグ・バグ調査ログ
```

### 技術ドキュメント（engineering/docs/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
topic: ""
type: technical-doc
tags: []
---

# [ドキュメントタイトル]

## 概要


## 設計・方針


## 詳細


## 参考
-
```

### デバッグログ（engineering/debug-log/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
status: open
tags: []
---

# [バグ・問題のタイトル]

## 症状
何が起きている？

## 期待する動作


## 再現手順
1.

## 調査

### 仮説
-

### 発見
-

## 解決策
-

## 再発防止
-
```

---

## 8. 経理

### 部署トップ（finance/_template.md）

```markdown
---
type: department
name: 経理
role: 請求書・経費・売上管理
---

# 経理

お金周りを管理します。

## サブフォルダ
- `invoices/` - 請求書
- `expenses/` - 経費
```

### 請求書（finance/invoices/_template.md）

```markdown
---
date: "{{YYYY-MM-DD}}"
client: ""
amount: 0
status: unpaid
due_date: ""
---

# 請求書: [クライアント名] - {{YYYY-MM-DD}}

## 明細
| 項目 | 数量 | 単価 | 小計 |
|------|------|------|------|
|      |      |      |      |

## 合計


## 支払い状況
- [ ] 送付済み
- [ ] 入金確認済み
```

### 経費（finance/expenses/_template.md）

```markdown
---
date: "{{YYYY-MM-DD}}"
category: ""
amount: 0
---

# 経費: [概要]

## 詳細
| 日付 | 項目 | カテゴリ | 金額 | メモ |
|------|------|---------|------|------|
|      |      |         |      |      |

## 合計

```

---

## 9. 営業

### 部署トップ（sales/_template.md）

```markdown
---
type: department
name: 営業
role: クライアント管理・提案書・案件パイプライン
---

# 営業

クライアントとの関係を管理します。

## サブフォルダ
- `clients/` - クライアント情報
- `proposals/` - 提案書
```

### クライアント（sales/clients/_template.md）

```markdown
---
client: ""
created: "{{YYYY-MM-DD}}"
status: active
---

# クライアント: [名前]

## 連絡先
- 名前:
- メール:
- 会社:

## 案件履歴
| 案件 | 期間 | 金額 | 状態 |
|------|------|------|------|
|      |      |      |      |

## コミュニケーション履歴

### {{YYYY-MM-DD}}
-

## メモ
-
```

### 提案書（sales/proposals/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
client: ""
status: draft
---

# 提案書: [タイトル]

## クライアント


## 課題・ニーズ


## 提案内容


## スケジュール
| フェーズ | 期間 | 内容 |
|---------|------|------|
|         |      |      |

## 見積もり
| 項目 | 金額 |
|------|------|
|      |      |

## 合計

```

---

## 10. クリエイティブ

### 部署トップ（creative/_template.md）

```markdown
---
type: department
name: クリエイティブ
role: デザインブリーフ・ブランド管理・アセット管理
---

# クリエイティブ

デザインとブランドを管理します。

## サブフォルダ
- `briefs/` - デザインブリーフ
- `assets/` - アセット管理
```

### デザインブリーフ（creative/briefs/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
project: ""
status: draft
---

# デザインブリーフ: [タイトル]

## 目的
何のためのデザイン？

## ターゲット


## トーン・雰囲気


## 要件
- サイズ:
- 形式:
- 納期:

## 参考イメージ
-

## フィードバック
-
```

### アセット管理（creative/assets/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
type: asset-list
---

# アセット管理

| アセット名 | 種類 | 場所 | 更新日 | メモ |
|-----------|------|------|-------|------|
|           |      |      |       |      |
```

---

## 11. 人事

### 部署トップ（hr/_template.md）

```markdown
---
type: department
name: 人事
role: 採用管理・オンボーディング・チーム管理
---

# 人事

チームと採用を管理します。

## サブフォルダ
- `hiring/` - 採用管理
```

### 採用（hr/hiring/_template.md）

```markdown
---
created: "{{YYYY-MM-DD}}"
position: ""
status: open
---

# 採用: [ポジション名]

## 要件
-

## 候補者
| 名前 | 応募日 | ステータス | メモ |
|------|-------|----------|------|
|      |       |          |      |

## 選考プロセス
- [ ] 書類選考
- [ ] 面接
- [ ] 最終面接
- [ ] オファー
```

---

## 12. 汎用テンプレート

ユーザーが追加するカスタム部署用のフォールバック。

```markdown
---
type: department
name: "[部署名]"
role: "[役割]"
---

# [部署名]

## 概要
この部署の役割。

## メモ
-
```

### 汎用ファイルテンプレート

```markdown
---
created: "{{YYYY-MM-DD}}"
tags: []
---

# [タイトル]

## 内容
-

## メモ
-
```
