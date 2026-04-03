---
name: presentation
description: >
  コンサルティング品質のプレゼンテーション自動生成。
  戦略提案、市場分析、SWOT、ロードマップなどをPPTX/SVG形式で出力。
trigger: /presentation
---

# コンサル品質プレゼン自動生成

## いつ使うか

- `/presentation` を実行したとき
- 「プレゼン作って」「資料作成」「スライド」「PPTX」と言われたとき
- 戦略提案書、市場分析資料、提案書の作成を依頼されたとき

---

## ワークフロー

### Step 1: コンテキスト検出

1. `.company/CLAUDE.md` が存在するか確認
   - **存在する場合**: 読み込んで事業情報（事業・活動、目標・課題）を取得し、プレゼンのコンテキストに活用
   - **存在しない場合**: コンテキストなしで進行
2. `references/slide-templates.md` を読み込み、利用可能なスライドタイプを把握
3. `references/color-schemes.md` を読み込み、配色オプションを把握

### Step 2: ブリーフィング（Interactive）

`AskUserQuestion` で対話的にヒアリングする。プロフェッショナルかつ親しみやすい口調で。

#### Q1: トピック・目的

> どんなプレゼンテーションを作成しますか？
>
> 例:
> - 「新規事業の戦略提案」
> - 「投資家向けピッチデック」
> - 「DX推進の市場分析レポート」
> - 「競合分析と参入戦略」

#### Q2: 対象者・期待アクション

> 対象は誰ですか？どんなアクションを期待しますか？
>
> 例:
> - 「経営陣に新規投資を承認してもらう」
> - 「クライアントに提案を受注してもらう」
> - 「チームに戦略方針を共有する」

#### Q3: データ・ポイント（任意）

> 含めたい具体的なデータやポイントはありますか？（スキップ可）
>
> 例:
> - 市場規模: 3.2兆円
> - 競合: A社、B社、C社
> - 目標KPI: 売上30%増
> - 特に強調したい強み

### Step 3: 配色選択（Interactive）

> どの配色テーマを使いますか？
>
> 1. Navy Professional（デフォルト）— 信頼感のある紺ベース
> 2. Dark Executive — 重厚な経営提案向け
> 3. Clean Minimal — シンプルで洗練されたデザイン
> 4. Warm Corporate — 温かみのある提案向け

### Step 4: スライド構成の自動設計

ブリーフィングに基づいて、`references/slide-templates.md` のベストプラクティスを参考に構成を設計する。

**コンサル品質の原則:**
- タイトルはアクション指向（"SWOT分析" ではなく "技術力を活かしDX市場を攻める"）
- 各スライドに「So what?」（だから何？）の視点を入れる
- データは具体的・定量的に
- 結論を先に、根拠を後に（ピラミッドストラクチャー）

**構成案をユーザーに提示:**

```
以下の構成で作成します（全13枚）:

1. タイトル: 「[メインタイトル]」
2. アジェンダ: 4項目
3. エグゼクティブサマリー: [要約]
4. セクション区切り: 「現状分析」
5. 市場分析: [市場データ]
6. 競合分析: [比較軸]
7. SWOT分析: [要約]
8. セクション区切り: 「戦略提案」
9. 戦略フレームワーク: [タイプ]
10. 提言: [項目数]
11. ロードマップ: [フェーズ数]
12. 財務インパクト: [メトリクス]
13. ネクストステップ: [アクション数]

この構成でよろしいですか？変更があれば教えてください。
```

### Step 5: コンテンツ生成（Automatic）

ユーザーの承認後、スライド定義JSONを生成する。

**JSONスキーマ:**

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "subtitle": "サブタイトル",
    "author": "作成者名",
    "date": "YYYY-MM-DD",
    "colorScheme": "navy-professional",
    "language": "ja"
  },
  "slides": [
    {
      "type": "スライドタイプ名",
      "title": "アクション指向のタイトル",
      ...各タイプ固有のフィールド
    }
  ]
}
```

**各スライドタイプの必須フィールドは `references/slide-templates.md` を参照。**

### Step 6: ファイル生成（Automatic）

1. 出力ディレクトリを作成: カレントディレクトリに `presentation-output/` を作成
2. JSONファイルを書き出し: `presentation-output/slides.json`
3. npm依存確認: `plugins/company/skills/presentation/generator/node_modules/` が存在しなければ `npm install` を実行
4. PPTX生成:
   ```bash
   python3 plugins/company/skills/presentation/generator/generate-pptx-py.py presentation-output/slides.json presentation-output/presentation.pptx
   ```
5. SVGプレビュー生成:
   ```bash
   node plugins/company/skills/presentation/generator/generate-svg.mjs presentation-output/slides.json presentation-output/preview/
   ```

### Step 7: 完了報告

```
プレゼンテーションの生成が完了しました！

📄 PPTX: presentation-output/presentation.pptx
🖼 プレビュー: presentation-output/preview/index.html
📋 定義JSON: presentation-output/slides.json

ブラウザで preview/index.html を開くとスライドのプレビューを確認できます。
PPTXファイルはPowerPointやGoogleスライドで開けます。

修正が必要な場合は、変更したいスライドを教えてください。
```

---

## スライドタイプ一覧

| タイプ | 用途 | 主なフィールド |
|--------|------|---------------|
| `title` | 表紙 | title, subtitle, authorLine |
| `executive-summary` | 要約 | title, bullets, keyMetric? |
| `agenda` | 目次 | title, items[] |
| `market-analysis` | 市場分析 | title, insight, data, source? |
| `swot` | SWOT分析 | title, strengths[], weaknesses[], opportunities[], threats[], soWhat? |
| `competitive-landscape` | 競合比較 | title, competitors[], criteria[], scores[][], positioning? |
| `strategic-framework` | 戦略FW | title, frameworkType, (タイプ別フィールド) |
| `roadmap` | ロードマップ | title, phases[] |
| `financial-impact` | 財務影響 | title, metrics[], details? |
| `recommendations` | 提言 | title, items[] |
| `next-steps` | 次のステップ | title, items[] |
| `section-divider` | 区切り | title, subtitle? |

**各タイプの詳細仕様は `references/slide-templates.md` を参照すること。**

---

## 修正・再生成

ユーザーが修正を要求した場合:

1. `presentation-output/slides.json` を読み込む
2. 指定されたスライドの内容を修正
3. JSONを更新して再度 generate-pptx.mjs と generate-svg.mjs を実行
4. 差分を報告

---

## .company/ との連携

`.company/` が存在する場合:
- `.company/CLAUDE.md` から事業コンテキストを読み取る
- 既存のリサーチ部門のデータがあれば活用
- 生成完了後、定義JSONの情報を `.company/secretary/notes/YYYY-MM-DD-presentation.md` に記録

---

## 重要な注意事項

- インタラクティブなステップでは必ず `AskUserQuestion` を使い、勝手に推測しない
- コンサル品質の原則を常に守る: アクション指向タイトル、定量データ、So what?
- 出力は常に16:9アスペクト比
- 日本語と英語の両方に対応（meta.language で制御）
- フォントは Noto Sans JP をデフォルトとする
- generatorのパスは相対パスで指定（プロジェクトルートから `plugins/company/skills/presentation/generator/`）
- 既存のファイルを上書きする前にユーザーに確認する

## ファイル参照

- スライドテンプレート定義: `references/slide-templates.md`
- 配色・タイポグラフィ: `references/color-schemes.md`
- レイアウトパターン: `references/layout-patterns.md`
- PPTXジェネレーター: `generator/generate-pptx.mjs`
- SVGジェネレーター: `generator/generate-svg.mjs`
