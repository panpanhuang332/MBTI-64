import { DIMENSION_ORDER } from "./dimensions";
import { SITE_NAME, SITE_NAME_EN, SITE_TAGLINE, SITE_URL } from "./site";

/**
 * 每型專屬 OG 圖（1200×630）的 SVG 產生器。
 * 純函式：同樣輸入永遠產生同樣的 SVG；由 scripts/generate-og.ts 在 build 時轉為 PNG。
 * 視覺沿用網站的原創圖形語言（冰藍山景、星點、琥珀傾向點）。
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgData {
  code: string;
  name: string;
  tagline: string;
  motto: string;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const STARS: Array<[number, number, number]> = [
  [90, 80, 5],
  [220, 50, 3],
  [340, 105, 4],
  [980, 70, 4],
  [1090, 130, 3],
  [1140, 60, 5],
];

function mountains(): string {
  const base = OG_HEIGHT - 90;
  return `
  <path d="M0 ${base} L170 ${base - 130} L320 ${base - 30} L470 ${base - 160} L640 ${base - 20} L780 ${base - 110} L940 ${base - 10} L1080 ${base - 90} L1200 ${base - 40} L1200 630 L0 630 Z" fill="#cfe6f2"/>
  <path d="M0 630 L0 ${base + 30} L260 ${base - 55} L520 ${base + 25} L760 ${base - 70} L1000 ${base + 20} L1200 ${base - 30} L1200 630 Z" fill="#b3d7e8"/>`;
}

/** 六字母沿線排列的裝飾（右側） */
function letterTrail(code: string): string {
  const letters = code.replace("-", "").split("");
  const startX = 830;
  const y = 210;
  return letters
    .map((letter, i) => {
      const x = startX + i * 58;
      return `
   <circle cx="${x}" cy="${y}" r="24" fill="${i >= 4 ? "#f2a93b" : "#eaf4fa"}" stroke="#0e4a5a" stroke-width="2.5"/>
   <text x="${x}" y="${y + 10}" text-anchor="middle" font-family="Noto Sans TC" font-size="28" font-weight="700" fill="#0e4a5a">${letter}</text>`;
    })
    .join("");
}

export function ogSvg(data: OgData): string {
  const code = escapeXml(data.code);
  const name = escapeXml(data.name);
  const tagline = escapeXml(data.tagline);
  const motto = escapeXml(data.motto);
  const url = escapeXml(SITE_URL.replace(/^https?:\/\//, ""));

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eaf4fa"/>
    </linearGradient>
  </defs>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>
  ${STARS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#b3d7e8"/>`).join("\n  ")}
  ${mountains()}
  <text x="80" y="110" font-family="Noto Sans TC" font-size="34" font-weight="600" fill="#5b7280">${escapeXml(SITE_NAME)}  ${escapeXml(SITE_NAME_EN)}</text>
  <text x="80" y="248" font-family="Noto Sans TC" font-size="120" font-weight="800" fill="#093542" letter-spacing="2">${code}</text>
  <text x="80" y="340" font-family="Noto Sans TC" font-size="60" font-weight="700" fill="#0e4a5a">${name}</text>
  <text x="80" y="410" font-family="Noto Sans TC" font-size="36" fill="#2d6b7d">${tagline}</text>
  <text x="80" y="470" font-family="Noto Sans TC" font-size="30" fill="#5b7280">「${motto}」</text>
  ${letterTrail(data.code)}
  <text x="80" y="${OG_HEIGHT - 36}" font-family="Noto Sans TC" font-size="26" font-weight="600" fill="#0e4a5a">${url}</text>
  <text x="${OG_WIDTH - 80}" y="${OG_HEIGHT - 36}" text-anchor="end" font-family="Noto Sans TC" font-size="22" fill="#5b7280">僅供自我探索・非官方 MBTI・非心理診斷</text>
</svg>`;
}

/** 預設 OG 圖（首頁與一般頁面） */
export function defaultOgSvg(): string {
  return ogSvg({
    code: "64",
    name: SITE_NAME,
    tagline: SITE_TAGLINE,
    motto: "了解你的決策與人際表達方式",
  });
}

/** 收集 OG 圖會用到的所有字元（供字型子集化與涵蓋檢查） */
export function collectOgChars(datas: OgData[]): string {
  const set = new Set<string>();
  const add = (s: string) => {
    for (const ch of s) set.add(ch);
  };
  add(SITE_NAME);
  add(SITE_NAME_EN);
  add(SITE_TAGLINE);
  add(SITE_URL.replace(/^https?:\/\//, ""));
  add("僅供自我探索・非官方 MBTI・非心理診斷");
  add("「」64");
  add("了解你的決策與人際表達方式");
  add("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.·・");
  for (const d of datas) {
    add(d.code);
    add(d.name);
    add(d.tagline);
    add(d.motto);
  }
  return [...set].sort().join("");
}

export { DIMENSION_ORDER };
