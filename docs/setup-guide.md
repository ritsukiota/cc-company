# セットアップガイド — cc-company

Claude Codeで `/company:presentation`（プレゼン自動生成）を使うための手順書です。

---

## 前提条件

| 必要なもの | 用途 |
|-----------|------|
| Claude Code デスクトップアプリ | スキルの実行環境 |
| Python 3 | PPTX（PowerPointファイル）生成 |
| Node.js | SVGプレビュー生成 |
| Git | リポジトリのクローン |

---

## 手順

### Step 1: Claude Code デスクトップアプリのインストール

1. https://claude.ai/download にアクセス
2. お使いのOS（Mac / Windows）に合ったインストーラーをダウンロード
3. インストール後、Anthropicアカウントでログイン
   - アカウントがない場合は新規作成が必要です

### Step 2: Python のインストール

#### Mac の場合
ターミナルを開いて以下を実行：
```bash
# Homebrewがインストール済みの場合
brew install python3

# Homebrewがない場合は https://www.python.org/downloads/ からダウンロード
```

#### Windows の場合
1. https://www.python.org/downloads/ にアクセス
2. 最新版をダウンロード・インストール
3. インストール時に **「Add Python to PATH」にチェック** を入れる

#### 確認
```bash
python3 --version
```

### Step 3: Node.js のインストール

1. https://nodejs.org/ にアクセス
2. **LTS版（推奨版）** をダウンロード・インストール

#### 確認
```bash
node --version
npm --version
```

### Step 4: リポジトリをクローン

ターミナルで以下を実行：
```bash
git clone https://github.com/ritsukiota/cc-company.git
```

### Step 5: プラグインをClaude Codeに登録

**この手順が必要です。** cloneしただけではClaude Codeがプラグインを認識しません。

#### Mac の場合
```bash
mkdir -p ~/.claude/plugins/marketplaces
ln -s $(pwd)/cc-company ~/.claude/plugins/marketplaces/cc-company
```

#### Windows の場合（PowerShell を管理者権限で実行）
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\plugins\marketplaces"
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.claude\plugins\marketplaces\cc-company" -Target "C:\path\to\cc-company"
```
※ `C:\path\to\cc-company` はcloneした実際のパスに置き換えてください。

#### 確認方法
Claude Code デスクトップアプリを再起動し、チャット欄に `/company` と入力して候補が表示されればOKです。

### Step 6: 依存パッケージのインストール

```bash
# Python依存（PPTX生成用）
pip3 install python-pptx

# Node.js依存（SVGプレビュー用）
cd cc-company/plugins/company/skills/presentation/generator
npm install
cd -
```

### Step 7: Claude Code で使う

1. Claude Code デスクトップアプリを起動
2. cloneした `cc-company` フォルダを開く
3. チャット欄に `/company:presentation` と入力
4. 対話形式で以下を聞かれるので回答する：
   - プレゼンのトピック・目的
   - 対象者・期待アクション
   - 含めたいデータやポイント（任意）
   - 配色テーマ
5. 構成案が提示されるので、OKであれば承認
6. PPTX と SVGプレビューが自動生成される

---

## 出力ファイル

生成が完了すると、以下のファイルが作成されます：

| ファイル | 説明 |
|---------|------|
| `presentation-output/presentation.pptx` | PowerPointファイル（PowerPoint / Google スライドで開けます） |
| `presentation-output/preview/index.html` | ブラウザで確認できるSVGプレビュー |
| `presentation-output/slides.json` | スライド定義（修正時に使用） |

---

## スライド修正

生成後に修正したい場合は、Claude Codeのチャットで変更内容を伝えてください。

例：
- 「3枚目のタイトルを変更して」
- 「ロードマップのフェーズを4つに増やして」
- 「配色をDark Executiveに変更して」

---

## トラブルシューティング

### `/company:presentation` が表示されない

- Step 5 のプラグイン登録が完了しているか確認
- Claude Code デスクトップアプリを再起動してみる
- シンボリックリンクが正しいか確認：
  ```bash
  ls -la ~/.claude/plugins/marketplaces/cc-company
  ```

### PPTX生成でエラーが出る

```bash
# python-pptx がインストールされているか確認
pip3 show python-pptx

# インストールされていなければ
pip3 install python-pptx
```

### SVGプレビュー生成でエラーが出る

```bash
# node_modules がインストールされているか確認
cd plugins/company/skills/presentation/generator
npm install
```

### PowerPointで文字化けする

フォント「Hiragino Kaku Gothic ProN」（Mac標準）を使用しています。
Windowsの場合は、PowerPointが自動的に代替フォントを適用します。

---

## 対応スライドタイプ

| タイプ | 用途 |
|--------|------|
| タイトル | 表紙 |
| エグゼクティブサマリー | 経営層向け要約 |
| アジェンダ | 目次 |
| 市場分析 | データテーブル + インサイト |
| SWOT分析 | 強み・弱み・機会・脅威 |
| 競合比較 | 比較マトリクス |
| 戦略フレームワーク | マトリクス / ピラミッド / プロセス |
| ロードマップ | 時系列の実行計画 |
| 財務インパクト | 投資対効果 |
| 提言 | 優先度付きアクション |
| ネクストステップ | アクションアイテム一覧 |
| セクション区切り | 章の区切り |

---

## 配色テーマ

| テーマ | 特徴 |
|--------|------|
| Navy Professional（デフォルト） | 信頼感のある紺ベース。万能型 |
| Dark Executive | 重厚な経営提案向け |
| Clean Minimal | シンプルで洗練されたデザイン |
| Warm Corporate | 温かみのある提案向け |
