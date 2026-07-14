/**
 * build 時產生每型專屬 OG 圖（64 型 + 預設圖，1200×630 PNG）。
 * 由 prebuild 自動執行：npm run validate-data && npm run generate-og
 *
 * 字型：assets/fonts/ 內的 Noto Sans TC 子集（SIL OFL 1.1 授權，
 * 僅供 build 時算圖使用，不會送到使用者瀏覽器）。
 * 若修改了類型名稱／標語出現新字元，需重新執行 scripts/subset-og-font.sh。
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { getAllProfiles } from "../src/lib/profiles";
import {
  collectOgChars,
  defaultOgSvg,
  ogSvg,
  type OgData,
} from "../src/lib/og-image";

const ROOT = process.cwd();
const FONT_DIR = join(ROOT, "assets", "fonts");
const OUT_DIR = join(ROOT, "public", "og");
const CHARS_MANIFEST = join(FONT_DIR, "og-chars.txt");

const fontFiles = [
  join(FONT_DIR, "NotoSansTC-OG-Bold.otf"),
  join(FONT_DIR, "NotoSansTC-OG-Regular.otf"),
];

for (const f of fontFiles) {
  if (!existsSync(f)) {
    console.error(`❌ 缺少 OG 字型檔：${f}（見 scripts/subset-og-font.sh）`);
    process.exit(1);
  }
}

const profiles = getAllProfiles();
const datas: OgData[] = profiles.map((p) => ({
  code: p.code,
  name: p.name,
  tagline: p.subtitle,
  motto: p.motto,
}));

// 字元涵蓋檢查：內容若新增了子集字型沒有的字，直接讓 build 失敗
const needed = collectOgChars(datas);
if (!existsSync(CHARS_MANIFEST)) {
  console.error(`❌ 缺少字元清單 ${CHARS_MANIFEST}，請重新執行字型子集化`);
  process.exit(1);
}
const subsetChars = new Set(readFileSync(CHARS_MANIFEST, "utf8"));
const missing = [...needed].filter(
  (ch) => !subsetChars.has(ch) && ch.trim() !== ""
);
if (missing.length > 0) {
  console.error(
    `❌ OG 內容包含子集字型沒有的字元：${missing.join(" ")}\n` +
      `   請執行 scripts/subset-og-font.sh 重新子集化字型。`
  );
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

function render(svg: string, outFile: string) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: "Noto Sans TC",
    },
  });
  writeFileSync(outFile, resvg.render().asPng());
}

render(defaultOgSvg(), join(OUT_DIR, "default.png"));
for (const data of datas) {
  render(ogSvg(data), join(OUT_DIR, `${data.code}.png`));
}

console.log(`✅ 已產生 ${datas.length + 1} 張 OG 圖 → public/og/`);
