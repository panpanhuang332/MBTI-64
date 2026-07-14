"use client";

import type { DimensionScores } from "./types";
import { DIMENSION_META, DIMENSION_ORDER } from "./dimensions";
import { SITE_URL } from "./site";

/**
 * 結果分享圖卡：以 Canvas 繪製本站原創圖形語言（冰藍山景＋星點），
 * 只包含人格結果，不含姓名、作答內容或任何個資，也沒有排名或稀有度。
 */

export type ShareCardSize = "portrait" | "square";

const SIZES: Record<ShareCardSize, { width: number; height: number }> = {
  portrait: { width: 1080, height: 1350 },
  square: { width: 1080, height: 1080 },
};

const COLORS = {
  ink: "#0e4a5a",
  inkDeep: "#093542",
  ice: "#eaf4fa",
  iceDeep: "#cfe6f2",
  iceMist: "#b3d7e8",
  amber: "#f2a93b",
  mist: "#5b7280",
  white: "#ffffff",
};

const FONT =
  '"PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif';

export interface ShareCardData {
  code: string;
  name: string;
  motto: string;
  scores: DimensionScores;
  /** 圖卡上的品牌文字（依語系） */
  brand: string;
  /** 「僅供自我探索」免責小字（依語系） */
  disclaimer: string;
}

export function drawShareCard(
  canvas: HTMLCanvasElement,
  data: ShareCardData,
  size: ShareCardSize
): void {
  const { width, height } = SIZES[size];
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("無法建立 canvas context");

  // 背景
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, COLORS.white);
  bg.addColorStop(1, COLORS.ice);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // 星點
  ctx.fillStyle = COLORS.iceMist;
  const stars: Array<[number, number, number]> = [
    [120, 110, 5],
    [260, 70, 3],
    [420, 130, 4],
    [640, 80, 3],
    [820, 120, 5],
    [940, 70, 3],
    [180, 200, 3],
    [880, 210, 4],
  ];
  for (const [x, y, r] of stars) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 山景（底部）
  const mountainBase = height - 150;
  ctx.fillStyle = COLORS.iceDeep;
  ctx.beginPath();
  ctx.moveTo(0, mountainBase);
  ctx.lineTo(200, mountainBase - 170);
  ctx.lineTo(380, mountainBase - 40);
  ctx.lineTo(560, mountainBase - 200);
  ctx.lineTo(780, mountainBase - 30);
  ctx.lineTo(940, mountainBase - 140);
  ctx.lineTo(width, mountainBase - 60);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = COLORS.iceMist;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, mountainBase + 40);
  ctx.lineTo(300, mountainBase - 70);
  ctx.lineTo(520, mountainBase + 30);
  ctx.lineTo(760, mountainBase - 90);
  ctx.lineTo(width, mountainBase + 20);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = "center";

  // 品牌
  ctx.fillStyle = COLORS.mist;
  ctx.font = `600 34px ${FONT}`;
  ctx.fillText(data.brand, width / 2, 130);

  const compact = size === "square";
  const codeY = compact ? 260 : 320;

  // 六字母代碼
  ctx.fillStyle = COLORS.inkDeep;
  ctx.font = `800 ${compact ? 128 : 150}px ${FONT}`;
  ctx.fillText(data.code, width / 2, codeY);

  // 類型名稱
  ctx.fillStyle = COLORS.ink;
  ctx.font = `700 ${compact ? 64 : 72}px ${FONT}`;
  ctx.fillText(data.name, width / 2, codeY + (compact ? 100 : 120));

  // 一句代表語
  ctx.fillStyle = COLORS.mist;
  ctx.font = `400 ${compact ? 40 : 44}px ${FONT}`;
  ctx.fillText(`「${data.motto}」`, width / 2, codeY + (compact ? 175 : 210));

  // 六維簡化圖表
  const chartTop = codeY + (compact ? 240 : 290);
  const rowHeight = compact ? 62 : 72;
  const barWidth = 520;
  const barLeft = (width - barWidth) / 2;
  ctx.font = `700 30px ${FONT}`;

  DIMENSION_ORDER.forEach((d, i) => {
    const meta = DIMENSION_META[d];
    const score = data.scores[d];
    const firstPercent = Math.round((score + 100) / 2);
    const y = chartTop + i * rowHeight;

    // 左右字母
    ctx.fillStyle = score >= 0 ? COLORS.ink : COLORS.mist;
    ctx.textAlign = "right";
    ctx.fillText(meta.first, barLeft - 28, y + 12);
    ctx.fillStyle = score < 0 ? COLORS.ink : COLORS.mist;
    ctx.textAlign = "left";
    ctx.fillText(meta.second, barLeft + barWidth + 28, y + 12);

    // 底條
    ctx.fillStyle = COLORS.white;
    roundRect(ctx, barLeft, y - 10, barWidth, 22, 11);
    ctx.fill();
    ctx.strokeStyle = COLORS.iceDeep;
    ctx.lineWidth = 2;
    roundRect(ctx, barLeft, y - 10, barWidth, 22, 11);
    ctx.stroke();

    // 傾向指示點
    const dotX = barLeft + ((100 - firstPercent) / 100) * barWidth;
    ctx.fillStyle = COLORS.amber;
    ctx.beginPath();
    ctx.arc(dotX, y + 1, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.inkDeep;
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // 網址與免責小字
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.ink;
  ctx.font = `600 32px ${FONT}`;
  const urlText = SITE_URL.replace(/^https?:\/\//, "");
  ctx.fillText(urlText, width / 2, height - 88);
  ctx.fillStyle = COLORS.mist;
  ctx.font = `400 26px ${FONT}`;
  ctx.fillText(data.disclaimer, width / 2, height - 44);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function downloadShareCard(
  data: ShareCardData,
  size: ShareCardSize
): void {
  const canvas = document.createElement("canvas");
  drawShareCard(canvas, data, size);
  const link = document.createElement("a");
  link.download = `personality-atlas-64-${data.code}-${size}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
