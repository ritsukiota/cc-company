#!/usr/bin/env node
/**
 * SVG プレビュージェネレーター
 * Usage: node generate-svg.mjs <input.json> <output-dir/>
 *
 * slides.json を読み込み、各スライドを SVG として描画し、
 * index.html にまとめたプレビューを生成する。
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ─── レイアウト定数 (16:9) ───
const W = 1333;
const H = 750;
const M = { top: 40, bottom: 30, left: 50, right: 50 };
const CW = W - M.left - M.right;
const CH = H - M.top - M.bottom;
const TITLE_H = 65;
const BODY_Y = M.top + TITLE_H + 10;
const BODY_H = CH - TITLE_H - 10;

// ─── カラースキーム ───
const COLOR_SCHEMES = {
  "navy-professional": {
    primary: "#1B2A4A", secondary: "#2D4A7A",
    accent1: "#3B82F6", accent2: "#10B981", accent3: "#F59E0B",
    textDark: "#1F2937", textLight: "#FFFFFF", textMuted: "#6B7280",
    background: "#FFFFFF", backgroundAlt: "#F3F4F6",
    positive: "#10B981", negative: "#EF4444", warning: "#F59E0B", border: "#E5E7EB",
  },
  "dark-executive": {
    primary: "#1F2937", secondary: "#374151",
    accent1: "#60A5FA", accent2: "#34D399", accent3: "#FBBF24",
    textDark: "#F9FAFB", textLight: "#FFFFFF", textMuted: "#9CA3AF",
    background: "#111827", backgroundAlt: "#1F2937",
    positive: "#34D399", negative: "#F87171", warning: "#FBBF24", border: "#374151",
  },
  "clean-minimal": {
    primary: "#374151", secondary: "#6B7280",
    accent1: "#2563EB", accent2: "#059669", accent3: "#D97706",
    textDark: "#111827", textLight: "#FFFFFF", textMuted: "#9CA3AF",
    background: "#FFFFFF", backgroundAlt: "#F9FAFB",
    positive: "#059669", negative: "#DC2626", warning: "#D97706", border: "#E5E7EB",
  },
  "warm-corporate": {
    primary: "#991B1B", secondary: "#B91C1C",
    accent1: "#DC2626", accent2: "#059669", accent3: "#D97706",
    textDark: "#1F2937", textLight: "#FFFFFF", textMuted: "#6B7280",
    background: "#FFFBEB", backgroundAlt: "#FEF3C7",
    positive: "#059669", negative: "#DC2626", warning: "#D97706", border: "#E5E7EB",
  },
};

const FONT = "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// ─── SVGヘルパー ───
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function svgOpen() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}">`;
}

function rect(x, y, w, h, fill, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}"/>`;
}

function text(x, y, content, { size = 14, fill = "#1F2937", weight = "normal", anchor = "start", baseline = "auto" } = {}) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="${baseline}">${esc(content)}</text>`;
}

function wrapText(x, y, content, maxWidth, { size = 14, fill = "#1F2937", weight = "normal", lineHeight = 1.4 } = {}) {
  const charWidth = size * 0.55;
  const maxChars = Math.floor(maxWidth / charWidth);
  const lines = [];
  let remaining = content;
  while (remaining.length > 0) {
    if (remaining.length <= maxChars) {
      lines.push(remaining);
      break;
    }
    lines.push(remaining.slice(0, maxChars));
    remaining = remaining.slice(maxChars);
  }
  return lines.map((line, i) =>
    `<text x="${x}" y="${y + i * size * lineHeight}" font-size="${size}" fill="${fill}" font-weight="${weight}">${esc(line)}</text>`
  ).join("\n");
}

function slideTitle(title, colors) {
  let svg = "";
  svg += wrapText(M.left, M.top + 30, title, CW, { size: 28, fill: colors.primary, weight: "bold" });
  svg += rect(M.left, M.top + TITLE_H + 2, CW, 3, colors.accent1);
  return svg;
}

function pageNumber(num, colors) {
  return text(W - 60, H - 20, String(num), { size: 10, fill: colors.textMuted, anchor: "end" });
}

function bullets(x, y, items, { size = 14, fill = "#1F2937", lineHeight = 1.6 } = {}) {
  return items.map((item, i) => {
    const ty = y + i * size * lineHeight;
    return `<text x="${x}" y="${ty}" font-size="${size}" fill="${fill}">• ${esc(item)}</text>`;
  }).join("\n");
}

// ─── スライドレンダラー ───

function renderTitle(data, colors) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.primary);
  svg += text(W / 2, 260, data.title, { size: 36, fill: colors.textLight, weight: "bold", anchor: "middle" });
  if (data.subtitle) {
    svg += text(W / 2, 310, data.subtitle, { size: 18, fill: colors.textLight, anchor: "middle" });
  }
  if (data.authorLine) {
    svg += text(W / 2, 550, data.authorLine, { size: 14, fill: colors.textMuted, anchor: "middle" });
  }
  svg += rect(0, H - 8, W, 8, colors.accent1);
  svg += "</svg>";
  return svg;
}

function renderExecutiveSummary(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const hasMetric = data.keyMetric;
  const bulletW = hasMetric ? CW * 0.62 : CW;
  svg += bullets(M.left + 15, BODY_Y + 30, data.bullets, { size: 14, fill: colors.textDark });

  if (hasMetric) {
    const mx = M.left + CW * 0.65;
    const mw = CW * 0.35;
    svg += rect(mx, BODY_Y + 20, mw, 180, colors.backgroundAlt, 8);
    svg += text(mx + mw / 2, BODY_Y + 100, data.keyMetric.value, { size: 48, fill: colors.accent1, weight: "bold", anchor: "middle" });
    svg += text(mx + mw / 2, BODY_Y + 150, data.keyMetric.label, { size: 14, fill: colors.textMuted, anchor: "middle" });
  }

  svg += "</svg>";
  return svg;
}

function renderAgenda(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const items = data.items;
  const itemH = Math.min(90, BODY_H / items.length);

  items.forEach((item, i) => {
    const y = BODY_Y + i * itemH;
    svg += text(M.left + 25, y + 40, String(item.number).padStart(2, "0"), { size: 28, fill: colors.accent1, weight: "bold", anchor: "middle" });
    svg += text(M.left + 60, y + 35, item.text, { size: 18, fill: colors.textDark, weight: "bold" });
    if (item.description) {
      svg += text(M.left + 60, y + 58, item.description, { size: 12, fill: colors.textMuted });
    }
    if (i < items.length - 1) {
      svg += rect(M.left + 60, y + itemH - 2, CW - 60, 1, colors.border);
    }
  });

  svg += "</svg>";
  return svg;
}

function renderMarketAnalysis(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  let tableY = BODY_Y;
  if (data.insight) {
    svg += rect(M.left, BODY_Y, CW, 40, colors.accent1, 5);
    svg += text(M.left + 12, BODY_Y + 26, data.insight, { size: 12, fill: colors.textLight, weight: "bold" });
    tableY += 55;
  }

  if (data.data) {
    const headers = data.data.headers;
    const rows = data.data.rows;
    const colW = CW / headers.length;
    const rowH = 38;

    // ヘッダー行
    svg += rect(M.left, tableY, CW, rowH, colors.primary);
    headers.forEach((h, ci) => {
      svg += text(M.left + ci * colW + colW / 2, tableY + 24, h, { size: 12, fill: colors.textLight, weight: "bold", anchor: "middle" });
    });

    // データ行
    rows.forEach((row, ri) => {
      const ry = tableY + (ri + 1) * rowH;
      const bg = ri % 2 === 0 ? colors.backgroundAlt : colors.background;
      svg += rect(M.left, ry, CW, rowH, bg);
      row.forEach((cell, ci) => {
        svg += text(M.left + ci * colW + colW / 2, ry + 24, cell, { size: 11, fill: colors.textDark, anchor: "middle" });
      });
    });
  }

  if (data.source) {
    svg += text(M.left, H - 40, data.source, { size: 10, fill: colors.textMuted });
  }

  svg += "</svg>";
  return svg;
}

function renderSwot(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const gap = 12;
  const soWhatH = data.soWhat ? 50 : 0;
  const qw = (CW - gap) / 2;
  const qh = (BODY_H - gap - soWhatH) / 2;
  const labelH = 32;

  const quads = [
    { label: "Strengths", items: data.strengths || [], x: M.left, y: BODY_Y, color: colors.accent1 },
    { label: "Weaknesses", items: data.weaknesses || [], x: M.left + qw + gap, y: BODY_Y, color: colors.textMuted },
    { label: "Opportunities", items: data.opportunities || [], x: M.left, y: BODY_Y + qh + gap, color: colors.accent2 },
    { label: "Threats", items: data.threats || [], x: M.left + qw + gap, y: BODY_Y + qh + gap, color: colors.warning },
  ];

  quads.forEach(({ label, items, x, y, color }) => {
    svg += rect(x, y, qw, qh, colors.backgroundAlt, 5);
    svg += rect(x, y, qw, labelH, color, 0);
    svg += text(x + 10, y + 22, label, { size: 13, fill: colors.textLight, weight: "bold" });
    svg += bullets(x + 12, y + labelH + 18, items, { size: 11, fill: colors.textDark, lineHeight: 1.5 });
  });

  if (data.soWhat) {
    const soY = BODY_Y + qh * 2 + gap + 8;
    svg += rect(M.left, soY, CW, 38, colors.accent1, 5);
    svg += text(M.left + 12, soY + 24, `So What?  ${data.soWhat}`, { size: 12, fill: colors.textLight, weight: "bold" });
  }

  svg += "</svg>";
  return svg;
}

function renderCompetitiveLandscape(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const headers = ["", ...data.criteria];
  const rows = data.competitors.map((comp, i) => [comp, ...data.scores[i]]);
  const colCount = headers.length;
  const firstColW = 200;
  const otherColW = (CW - firstColW) / (colCount - 1);
  const rowH = 42;

  // ヘッダー
  svg += rect(M.left, BODY_Y, CW, rowH, colors.primary);
  headers.forEach((h, ci) => {
    const cx = ci === 0 ? M.left + firstColW / 2 : M.left + firstColW + (ci - 1) * otherColW + otherColW / 2;
    svg += text(cx, BODY_Y + 28, h, { size: 12, fill: colors.textLight, weight: "bold", anchor: "middle" });
  });

  // データ行
  rows.forEach((row, ri) => {
    const ry = BODY_Y + (ri + 1) * rowH;
    const bg = ri === 0 ? "#DBEAFE" : ri % 2 === 0 ? colors.backgroundAlt : colors.background;
    svg += rect(M.left, ry, CW, rowH, bg);
    row.forEach((cell, ci) => {
      const cx = ci === 0 ? M.left + 10 : M.left + firstColW + (ci - 1) * otherColW + otherColW / 2;
      const anc = ci === 0 ? "start" : "middle";
      svg += text(cx, ry + 28, cell, { size: 11, fill: colors.textDark, anchor: anc, weight: ci === 0 ? "bold" : "normal" });
    });
  });

  if (data.positioning) {
    svg += text(M.left, H - 50, data.positioning, { size: 12, fill: colors.textMuted });
  }

  svg += "</svg>";
  return svg;
}

function renderStrategicFramework(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const type = data.frameworkType;

  if (type === "process") {
    const steps = data.steps || [];
    const n = steps.length;
    const gap = 10;
    const stepW = (CW - gap * (n - 1)) / n;
    const stepH = 100;
    const stepY = BODY_Y + 40;
    const stepColors = [colors.accent1, colors.accent2, colors.accent3, colors.primary, colors.secondary];

    steps.forEach((step, i) => {
      const x = M.left + i * (stepW + gap);
      const c = stepColors[i % stepColors.length];
      svg += rect(x, stepY, stepW, stepH, c, 5);
      svg += wrapText(x + 10, stepY + 30, step.label, stepW - 20, { size: 13, fill: colors.textLight, weight: "bold" });
      if (step.description) {
        svg += wrapText(x + 5, stepY + stepH + 20, step.description, stepW - 10, { size: 10, fill: colors.textDark });
      }
      if (i < n - 1) {
        svg += text(x + stepW + gap / 2, stepY + stepH / 2 + 6, "\u25B6", { size: 18, fill: colors.textMuted, anchor: "middle" });
      }
    });
  } else if (type === "matrix") {
    const qw = CW * 0.42;
    const qh = BODY_H * 0.40;
    const cx = M.left + CW / 2;
    const cy = BODY_Y + BODY_H / 2;
    const gap = 12;
    const quads = [
      { key: "topLeft", x: cx - qw - gap / 2, y: cy - qh - gap / 2 },
      { key: "topRight", x: cx + gap / 2, y: cy - qh - gap / 2 },
      { key: "bottomLeft", x: cx - qw - gap / 2, y: cy + gap / 2 },
      { key: "bottomRight", x: cx + gap / 2, y: cy + gap / 2 },
    ];
    quads.forEach(({ key, x, y }) => {
      svg += rect(x, y, qw, qh, colors.backgroundAlt, 5);
      if (data.quadrants && data.quadrants[key]) {
        svg += wrapText(x + 15, y + qh / 2, data.quadrants[key], qw - 30, { size: 12, fill: colors.textDark });
      }
    });
  } else if (type === "pyramid") {
    const levels = data.levels || [];
    const n = levels.length;
    const pw = CW * 0.5;
    const ph = BODY_H * 0.85;
    const lh = ph / n;
    const sx = M.left + CW * 0.05;
    const sy = BODY_Y + 10;
    const lColors = [colors.accent1, colors.accent2, colors.accent3];

    levels.forEach((level, i) => {
      const ratio = (i + 0.5) / n;
      const w = pw * (0.3 + ratio * 0.7);
      const x = sx + (pw - w) / 2;
      const y = sy + (n - 1 - i) * lh;
      svg += rect(x, y, w, lh - 8, lColors[i % lColors.length], 5);
      svg += text(x + w / 2, y + lh / 2, level.label, { size: 13, fill: colors.textLight, weight: "bold", anchor: "middle" });
      if (level.description) {
        svg += wrapText(sx + pw + 30, y + 10, level.description, CW - pw - 60, { size: 11, fill: colors.textDark });
      }
    });
  }

  svg += "</svg>";
  return svg;
}

function renderRoadmap(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const phases = data.phases || [];
  const n = phases.length;
  const gap = 8;
  const pw = (CW - gap * (n - 1)) / n;
  const chevH = 80;
  const chevY = BODY_Y + 35;
  const pColors = [colors.accent1, colors.accent2, colors.accent3, colors.primary, colors.secondary];

  phases.forEach((phase, i) => {
    const x = M.left + i * (pw + gap);
    const c = pColors[i % pColors.length];

    svg += text(x + pw / 2, BODY_Y + 20, phase.period, { size: 10, fill: colors.textMuted, anchor: "middle" });
    svg += rect(x, chevY, pw, chevH, c, 5);
    svg += wrapText(x + 8, chevY + 25, phase.name, pw - 16, { size: 14, fill: colors.textLight, weight: "bold" });

    if (phase.milestones) {
      svg += bullets(x + 5, chevY + chevH + 22, phase.milestones, { size: 10, fill: colors.textDark, lineHeight: 1.5 });
    }
    if (i < n - 1) {
      svg += text(x + pw + gap / 2, chevY + chevH / 2 + 6, "\u25B6", { size: 16, fill: colors.textMuted, anchor: "middle" });
    }
  });

  svg += "</svg>";
  return svg;
}

function renderFinancialImpact(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const metrics = data.metrics || [];
  const n = metrics.length;
  const gap = 30;
  const cardW = (CW - gap * (n - 1)) / n;
  const cardH = 180;

  metrics.forEach((m, i) => {
    const x = M.left + i * (cardW + gap);
    svg += rect(x, BODY_Y + 10, cardW, cardH, colors.backgroundAlt, 8);
    svg += text(x + cardW / 2, BODY_Y + 80, m.value, { size: 48, fill: colors.accent1, weight: "bold", anchor: "middle" });
    svg += text(x + cardW / 2, BODY_Y + 120, m.label, { size: 14, fill: colors.textMuted, anchor: "middle" });
    if (m.delta) {
      const isPos = m.delta.includes("+") || m.delta.includes("\u2191");
      svg += text(x + cardW / 2, BODY_Y + 150, m.delta, { size: 14, fill: isPos ? colors.positive : colors.negative, weight: "bold", anchor: "middle" });
    }
  });

  svg += "</svg>";
  return svg;
}

function renderRecommendations(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const items = data.items || [];
  const itemH = Math.min(90, BODY_H / items.length);
  const prioColors = { high: colors.negative, medium: colors.warning, low: colors.accent1 };
  const prioLabels = { high: "HIGH", medium: "MED", low: "LOW" };

  items.forEach((item, i) => {
    const y = BODY_Y + i * itemH;

    // 番号丸
    svg += `<circle cx="${M.left + 22}" cy="${y + 30}" r="20" fill="${colors.accent1}"/>`;
    svg += text(M.left + 22, y + 36, String(item.number), { size: 18, fill: colors.textLight, weight: "bold", anchor: "middle" });

    // テキスト
    svg += wrapText(M.left + 55, y + 28, item.text, CW - 200, { size: 14, fill: colors.textDark });

    // 優先度バッジ
    const pc = prioColors[item.priority] || colors.textMuted;
    svg += rect(M.left + CW - 120, y + 12, 65, 28, pc, 4);
    svg += text(M.left + CW - 88, y + 32, prioLabels[item.priority] || "", { size: 9, fill: colors.textLight, weight: "bold", anchor: "middle" });

    // 区切り線
    if (i < items.length - 1) {
      svg += rect(M.left + 55, y + itemH - 2, CW - 55, 1, colors.border);
    }
  });

  svg += "</svg>";
  return svg;
}

function renderNextSteps(data, colors, pn) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.background);
  svg += slideTitle(data.title, colors);
  svg += pageNumber(pn, colors);

  const items = data.items || [];
  const headers = ["\u30A2\u30AF\u30B7\u30E7\u30F3", "\u62C5\u5F53", "\u671F\u9650"];
  const colW = [CW * 0.55, CW * 0.22, CW * 0.23];
  const rowH = 40;

  // ヘッダー
  svg += rect(M.left, BODY_Y, CW, rowH, colors.primary);
  let cx = M.left;
  headers.forEach((h, ci) => {
    svg += text(cx + colW[ci] / 2, BODY_Y + 26, h, { size: 12, fill: colors.textLight, weight: "bold", anchor: "middle" });
    cx += colW[ci];
  });

  // データ行
  items.forEach((item, ri) => {
    const ry = BODY_Y + (ri + 1) * rowH;
    const bg = ri % 2 === 0 ? colors.backgroundAlt : colors.background;
    svg += rect(M.left, ry, CW, rowH, bg);
    const vals = [item.action, item.owner, item.deadline];
    let vx = M.left;
    vals.forEach((v, ci) => {
      const anc = ci === 0 ? "start" : "middle";
      const tx = ci === 0 ? vx + 10 : vx + colW[ci] / 2;
      svg += text(tx, ry + 26, v, { size: 11, fill: colors.textDark, anchor: anc });
      vx += colW[ci];
    });
  });

  svg += "</svg>";
  return svg;
}

function renderSectionDivider(data, colors) {
  let svg = svgOpen();
  svg += rect(0, 0, W, H, colors.primary);
  svg += text(W / 2, 300, data.title, { size: 32, fill: colors.textLight, weight: "bold", anchor: "middle" });
  if (data.subtitle) {
    svg += text(W / 2, 350, data.subtitle, { size: 16, fill: colors.textMuted, anchor: "middle" });
  }
  svg += rect(W * 0.35, 400, W * 0.3, 3, colors.accent1);
  svg += "</svg>";
  return svg;
}

// ─── ディスパッチャー ───
const RENDERERS = {
  title: (d, c) => renderTitle(d, c),
  "executive-summary": (d, c, pn) => renderExecutiveSummary(d, c, pn),
  agenda: (d, c, pn) => renderAgenda(d, c, pn),
  "market-analysis": (d, c, pn) => renderMarketAnalysis(d, c, pn),
  swot: (d, c, pn) => renderSwot(d, c, pn),
  "competitive-landscape": (d, c, pn) => renderCompetitiveLandscape(d, c, pn),
  "strategic-framework": (d, c, pn) => renderStrategicFramework(d, c, pn),
  roadmap: (d, c, pn) => renderRoadmap(d, c, pn),
  "financial-impact": (d, c, pn) => renderFinancialImpact(d, c, pn),
  recommendations: (d, c, pn) => renderRecommendations(d, c, pn),
  "next-steps": (d, c, pn) => renderNextSteps(d, c, pn),
  "section-divider": (d, c) => renderSectionDivider(d, c),
};

// ─── メイン ───
function main() {
  const [inputPath, outputDir] = process.argv.slice(2);
  if (!inputPath || !outputDir) {
    console.error("Usage: node generate-svg.mjs <input.json> <output-dir/>");
    process.exit(1);
  }

  const definition = JSON.parse(readFileSync(inputPath, "utf-8"));
  const { meta, slides } = definition;
  const colors = COLOR_SCHEMES[meta.colorScheme] || COLOR_SCHEMES["navy-professional"];

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const svgFiles = [];

  slides.forEach((slide, i) => {
    const pn = i + 1;
    const renderer = RENDERERS[slide.type];
    if (!renderer) {
      console.warn(`Unknown slide type: ${slide.type}, skipping.`);
      return;
    }
    const svgContent = renderer(slide, colors, pn);
    const fileName = `slide-${String(pn).padStart(2, "0")}.svg`;
    writeFileSync(join(outputDir, fileName), svgContent, "utf-8");
    console.log(`SVG generated: ${fileName}`);
    svgFiles.push(fileName);
  });

  // index.html 生成
  const html = `<!DOCTYPE html>
<html lang="${meta.language || "ja"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(meta.title || "Presentation Preview")}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; color: #fff; font-family: ${FONT}; padding: 20px; }
    h1 { text-align: center; margin-bottom: 20px; font-size: 1.5rem; opacity: 0.8; }
    .slides { display: flex; flex-direction: column; align-items: center; gap: 24px; max-width: 1200px; margin: 0 auto; }
    .slide-wrapper { width: 100%; background: #16213e; border-radius: 8px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .slide-wrapper img { width: 100%; height: auto; border-radius: 4px; }
    .slide-label { font-size: 0.85rem; opacity: 0.5; margin-bottom: 8px; }
    nav { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 6px; }
    nav a { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.25); display: block; transition: background 0.2s; }
    nav a:hover, nav a.active { background: #3B82F6; }
  </style>
</head>
<body>
  <h1>${esc(meta.title || "Presentation Preview")}</h1>
  <nav>${svgFiles.map((_, i) => `<a href="#slide-${i + 1}" title="Slide ${i + 1}"></a>`).join("")}</nav>
  <div class="slides">
    ${svgFiles.map((f, i) => `
    <div class="slide-wrapper" id="slide-${i + 1}">
      <div class="slide-label">Slide ${i + 1}</div>
      <img src="${f}" alt="Slide ${i + 1}">
    </div>`).join("")}
  </div>
</body>
</html>`;

  writeFileSync(join(outputDir, "index.html"), html, "utf-8");
  console.log(`Preview: ${join(outputDir, "index.html")}`);
}

main();
