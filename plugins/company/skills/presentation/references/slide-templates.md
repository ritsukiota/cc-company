# スライドテンプレート定義

コンサルティングファーム品質のスライドテンプレート12種。
Claude はこのリファレンスを読み、ユーザーのブリーフに応じて適切なスライドタイプを選択・組み合わせる。

---

## 1. title（タイトルスライド）

プレゼンテーションの表紙。クリーンで印象的なレイアウト。

### 必須フィールド
- `title`: プレゼンテーションのメインタイトル
- `subtitle`: サブタイトル（日付、プロジェクト名など）
- `authorLine`: 作成者・組織名

### レイアウト
- 中央寄せ
- タイトル: 36pt bold, primary color
- サブタイトル: 18pt, secondary color
- 下部に作成者ライン

### コンサル品質のポイント
- タイトルは簡潔かつインパクトのある表現（20文字以内推奨）
- サブタイトルで文脈を補足

---

## 2. executive-summary（エグゼクティブサマリー）

経営層向けの要約。3-5個の箇条書きとキーメトリクス。

### 必須フィールド
- `title`: アクション指向のタイトル（例: "DX投資により3年で売上30%増を実現"）
- `bullets`: string[] (3-5項目)

### オプションフィールド
- `keyMetric`: `{ value: string, label: string }` — 右上の強調数値

### レイアウト
- 左側: 箇条書きリスト（コンテンツ幅の65%）
- 右側: キーメトリクスボックス（コンテンツ幅の30%）
- keyMetric がない場合は箇条書きを全幅で表示

### コンサル品質のポイント
- 各箇条書きは「結論 → 根拠」の順で記述
- キーメトリクスは最も訴求力のある数値を1つ選ぶ
- タイトルで結論を先に述べる（"エグゼクティブサマリー"ではなく結論を書く）

---

## 3. agenda（目次・アジェンダ）

プレゼンテーションの構成を示す。

### 必須フィールド
- `title`: タイトル（例: "本日のアジェンダ"）
- `items`: `{ number: number, text: string, description?: string }[]`

### レイアウト
- 縦方向のリスト
- 各項目: 番号（大きく・accent色）+ テキスト + 説明
- 番号間に薄い区切り線

### コンサル品質のポイント
- 3-5項目が最適。7以上は避ける
- 各項目は動詞で始める（"分析する"、"提案する"、"議論する"）

---

## 4. market-analysis（市場分析）

データテーブルとインサイトで市場を分析。

### 必須フィールド
- `title`: アクション指向のタイトル（例: "国内SaaS市場は年率15%で成長、2028年に1.2兆円規模へ"）
- `insight`: キーインサイト（スライド上部のアノテーション）
- `data`: `{ headers: string[], rows: string[][] }` — データテーブル

### オプションフィールド
- `source`: データ出典（例: "出典: IDC Japan, 2026"）

### レイアウト
- 上部: インサイトバー（accent背景、白文字）
- 中央: データテーブル
- 下部: 出典テキスト（小さく・グレー）

### コンサル品質のポイント
- タイトルでデータから導ける結論を述べる
- インサイトは「So what?（だから何？）」に答える
- 出典を必ず明記する

---

## 5. swot（SWOT分析）

2x2グリッドで強み・弱み・機会・脅威を整理。

### 必須フィールド
- `title`: アクション指向のタイトル（例: "技術力を活かしDX需要を取り込む"）
- `strengths`: string[] (3-4項目)
- `weaknesses`: string[] (3-4項目)
- `opportunities`: string[] (3-4項目)
- `threats`: string[] (3-4項目)

### オプションフィールド
- `soWhat`: この分析から導く結論・次のアクション

### レイアウト
```
| S: Strengths (accent1) | W: Weaknesses (gray)   |
| O: Opportunities (green)| T: Threats (amber/red) |
```
- 下部: soWhat アノテーションバー
- 各象限にラベル + 箇条書き

### コンサル品質のポイント
- 各項目は具体的・定量的に（"シェアが高い" → "国内シェア32%でトップ"）
- soWhat で次のアクションへ接続
- S×O（強み×機会）の交差点が戦略の核心

---

## 6. competitive-landscape（競合分析）

競合比較マトリクス。

### 必須フィールド
- `title`: アクション指向のタイトル
- `competitors`: string[] — 行ラベル（競合名）
- `criteria`: string[] — 列ラベル（比較軸）
- `scores`: string[][] — 各セルの値（"◎", "○", "△", "×" または数値）

### オプションフィールド
- `positioning`: ポジショニングに関する結論

### レイアウト
- 比較テーブル（ヘッダー行: accent背景）
- 自社行をハイライト（薄いaccent背景）
- 下部: positioning テキスト

### コンサル品質のポイント
- 自社に有利な比較軸だけでなく、弱みも正直に示す（信頼性）
- 比較軸は顧客にとって重要な順に並べる

---

## 7. strategic-framework（戦略フレームワーク）

柔軟なフレームワーク表示。3タイプから選択。

### 必須フィールド
- `title`: タイトル
- `frameworkType`: `"matrix"` | `"pyramid"` | `"process"`

### matrix タイプ
- `axisX`: X軸ラベル, `axisY`: Y軸ラベル
- `quadrants`: `{ topLeft: string, topRight: string, bottomLeft: string, bottomRight: string }`
- レイアウト: 2x2マトリクス with 軸ラベル

### pyramid タイプ
- `levels`: `{ label: string, description?: string }[]` (上→下の順、3-5段)
- レイアウト: 上が小さく下が大きい台形の積み重ね

### process タイプ
- `steps`: `{ label: string, description?: string }[]` (3-6ステップ)
- レイアウト: 横方向の矢印/シェブロン

### コンサル品質のポイント
- フレームワークは「考え方の整理」であり、結論ではない
- タイトルでフレームワークから導かれる示唆を述べる

---

## 8. roadmap（ロードマップ）

時系列の実行計画。フェーズとマイルストーン。

### 必須フィールド
- `title`: タイトル（例: "3フェーズでDX基盤を構築"）
- `phases`: `{ name: string, period: string, milestones: string[] }[]` (3-5フェーズ)

### レイアウト
- 横方向のシェブロン/矢印（各フェーズ）
- フェーズ名: シェブロン内
- 期間: シェブロン上部
- マイルストーン: シェブロン下部に箇条書き

### コンサル品質のポイント
- 各フェーズに明確な成果物を定義
- 期間は具体的に（"Phase 1" ではなく "2026年Q2-Q3"）
- マイルストーンは検証可能な形で記述

---

## 9. financial-impact（財務インパクト）

大きな数字で投資対効果を訴求。

### 必須フィールド
- `title`: タイトル（例: "3年間で投資額の2.5倍のリターンを実現"）
- `metrics`: `{ value: string, label: string, delta?: string }[]` (2-4個)

### オプションフィールド
- `details`: `{ headers: string[], rows: string[][] }` — 詳細テーブル

### レイアウト
- 上部: メトリクスカード横並び（各カード: 大きな数値 + ラベル + 変化量）
- 下部: 詳細テーブル（ある場合）

### コンサル品質のポイント
- 最重要指標を左に配置（視線の流れ）
- delta は矢印で表現（"↑15%" "↓3%"）
- 数値は丸めて分かりやすく（"1,234,567円" → "約1.2M円"）

---

## 10. recommendations（提言）

優先度付きの提言リスト。

### 必須フィールド
- `title`: タイトル（例: "3つの重点施策を提言"）
- `items`: `{ number: number, text: string, priority: "high" | "medium" | "low", owner?: string }[]`

### レイアウト
- 番号付きリスト
- 優先度バッジ: high=赤, medium=黄, low=青
- 各項目: 番号 + テキスト + 優先度バッジ + 担当

### コンサル品質のポイント
- 3-5項目が最適
- 各提言は具体的アクションとして記述（"検討する" ではなく "〜を導入する"）
- high は1-2個に絞る

---

## 11. next-steps（ネクストステップ）

アクションアイテムテーブル。

### 必須フィールド
- `title`: タイトル（例: "今後2週間のアクション"）
- `items`: `{ action: string, owner: string, deadline: string }[]`

### レイアウト
- 3列テーブル: アクション | 担当 | 期限
- ヘッダー行: accent背景
- 交互行の背景色

### コンサル品質のポイント
- 期限は具体的な日付で
- 担当は個人名またはチーム名
- 5-8項目が適切

---

## 12. section-divider（セクション区切り）

セクション間の区切りスライド。

### 必須フィールド
- `title`: セクションタイトル

### オプションフィールド
- `subtitle`: 補足テキスト

### レイアウト
- 中央寄せ
- primary色の背景
- 白文字で大きくタイトル表示

### コンサル品質のポイント
- セクションの「問い」を投げかける形も効果的（"どう成長するか？"）

---

## スライド構成のベストプラクティス

### 戦略提案書の推奨構成（10-15枚）

1. title
2. agenda
3. executive-summary
4. section-divider: "現状分析"
5. market-analysis
6. competitive-landscape
7. swot
8. section-divider: "戦略提案"
9. strategic-framework
10. recommendations
11. roadmap
12. financial-impact
13. next-steps

### 短縮版（5-7枚）

1. title
2. executive-summary
3. swot または market-analysis
4. recommendations
5. roadmap
6. next-steps
