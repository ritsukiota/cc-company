# 配色・タイポグラフィ定義

## カラースキーム

### navy-professional（デフォルト）

万能型。信頼感と専門性を表現。

```json
{
  "primary": "#1B2A4A",
  "secondary": "#2D4A7A",
  "accent1": "#3B82F6",
  "accent2": "#10B981",
  "accent3": "#F59E0B",
  "textDark": "#1F2937",
  "textLight": "#FFFFFF",
  "textMuted": "#6B7280",
  "background": "#FFFFFF",
  "backgroundAlt": "#F3F4F6",
  "positive": "#10B981",
  "negative": "#EF4444",
  "warning": "#F59E0B",
  "border": "#E5E7EB"
}
```

### dark-executive

重厚感のある経営提案向け。

```json
{
  "primary": "#1F2937",
  "secondary": "#374151",
  "accent1": "#60A5FA",
  "accent2": "#34D399",
  "accent3": "#FBBF24",
  "textDark": "#F9FAFB",
  "textLight": "#FFFFFF",
  "textMuted": "#9CA3AF",
  "background": "#111827",
  "backgroundAlt": "#1F2937",
  "positive": "#34D399",
  "negative": "#F87171",
  "warning": "#FBBF24",
  "border": "#374151"
}
```

### clean-minimal

シンプルで洗練されたデザイン。

```json
{
  "primary": "#374151",
  "secondary": "#6B7280",
  "accent1": "#2563EB",
  "accent2": "#059669",
  "accent3": "#D97706",
  "textDark": "#111827",
  "textLight": "#FFFFFF",
  "textMuted": "#9CA3AF",
  "background": "#FFFFFF",
  "backgroundAlt": "#F9FAFB",
  "positive": "#059669",
  "negative": "#DC2626",
  "warning": "#D97706",
  "border": "#E5E7EB"
}
```

### warm-corporate

温かみのある提案向け。

```json
{
  "primary": "#991B1B",
  "secondary": "#B91C1C",
  "accent1": "#DC2626",
  "accent2": "#059669",
  "accent3": "#D97706",
  "textDark": "#1F2937",
  "textLight": "#FFFFFF",
  "textMuted": "#6B7280",
  "background": "#FFFBEB",
  "backgroundAlt": "#FEF3C7",
  "positive": "#059669",
  "negative": "#DC2626",
  "warning": "#D97706",
  "border": "#E5E7EB"
}
```

---

## タイポグラフィ

### フォント

- **メイン**: Noto Sans JP
- **フォールバック**: Calibri, Arial, sans-serif
- **PptxGenJS設定**: `fontFace: "Noto Sans JP"`

### サイズ体系

| 用途 | サイズ (pt) | ウェイト | 用途詳細 |
|------|------------|----------|----------|
| スライドタイトル | 28 | Bold | 各スライドの見出し |
| プレゼンタイトル | 36 | Bold | 表紙のメインタイトル |
| サブタイトル | 18 | Regular | 補足テキスト |
| 本文 | 14 | Regular | 箇条書き・説明文 |
| テーブルヘッダー | 12 | Bold | テーブルの見出し行 |
| テーブル本文 | 11 | Regular | テーブルのデータ行 |
| キャプション | 10 | Italic | 出典・注釈 |
| 大数値 | 48 | Bold | メトリクスの強調数値 |
| セクションタイトル | 32 | Bold | セクション区切り |

### 行間

- タイトル系: 1.2
- 本文: 1.5
- 箇条書き: 1.4

---

## レイアウト定数

### スライドサイズ（16:9）

- 幅: 13.33 インチ (33.867 cm)
- 高さ: 7.5 インチ (19.05 cm)

### マージン

- 上: 0.7 インチ
- 下: 0.5 インチ
- 左: 0.8 インチ
- 右: 0.8 インチ
- コンテンツ幅: 11.73 インチ
- コンテンツ高さ: 6.3 インチ

### タイトルバー

- 高さ: 0.8 インチ
- タイトル位置: マージン左, マージン上
- タイトル下の区切り線: 2pt, accent1 色
