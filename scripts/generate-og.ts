/**
 * build 時產生三語系的每型專屬 OG 圖（64 型 + 預設圖，各 65 張，1200×630 PNG）。
 * 由 prebuild 自動執行：npm run validate-data && npm run generate-og
 *
 * 輸出：
 *  - zh-TW → public/og/<code>.png（維持原路徑）
 *  - zh-CN → public/og/zh-CN/<code>.png
 *  - en    → public/og/en/<code>.png
 *
 * 字型：assets/fonts/ 內的 Noto Sans TC/SC 子集（SIL OFL 1.1，
 * 僅供 build 時算圖使用，不會送到使用者瀏覽器）。
 * 若修改了類型名稱／標語出現新字元，需重新執行 scripts/subset-og-font.sh。
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { getAllLocalizedProfiles } from "../src/lib/i18n";
import { LOCALES, type Locale } from "../src/lib/i18n/locales";
import {
  collectOgChars,
  defaultOgSvg,
  ogSvg,
  OG_FONT_FAMILY,
  type OgData,
} from "../src/lib/og-image";

const ROOT = process.cwd();
const FONT_DIR = join(ROOT, "assets", "fonts");
const OUT_BASE = join(ROOT, "public", "og");

const FONT_FILES: Record<string, string[]> = {
  "Noto Sans TC": [
    join(FONT_DIR, "NotoSansTC-OG-Bold.otf"),
    join(FONT_DIR, "NotoSansTC-OG-Regular.otf"),
  ],
  "Noto Sans SC": [
    join(FONT_DIR, "NotoSansSC-OG-Bold.otf"),
    join(FONT_DIR, "NotoSansSC-OG-Regular.otf"),
  ],
};

const CHARS_MANIFEST: Record<string, string> = {
  "Noto Sans TC": join(FONT_DIR, "og-chars-tc.txt"),
  "Noto Sans SC": join(FONT_DIR, "og-chars-sc.txt"),
};

for (const files of Object.values(FONT_FILES)) {
  for (const f of files) {
    if (!existsSync(f)) {
      console.error(`❌ 缺少 OG 字型檔：${f}（執行 scripts/subset-og-font.sh）`);
      process.exit(1);
    }
  }
}

function datasFor(locale: Locale): OgData[] {
  return getAllLocalizedProfiles(locale).map((p) => ({
    code: p.code,
    name: p.name,
    tagline: p.subtitle,
    motto: p.motto,
  }));
}

// 字元涵蓋檢查：內容若新增了子集字型沒有的字，直接讓 build 失敗
for (const locale of LOCALES) {
  const family = OG_FONT_FAMILY[locale];
  const manifest = CHARS_MANIFEST[family];
  if (!existsSync(manifest)) {
    console.error(`❌ 缺少字元清單 ${manifest}，請執行 scripts/subset-og-font.sh`);
    process.exit(1);
  }
  const subsetChars = new Set(readFileSync(manifest, "utf8"));
  const needed = collectOgChars(datasFor(locale), locale);
  const missing = [...needed].filter(
    (ch) => !subsetChars.has(ch) && ch.trim() !== ""
  );
  if (missing.length > 0) {
    console.error(
      `❌ [${locale}] OG 內容包含子集字型沒有的字元：${missing.join(" ")}\n` +
        `   請執行 scripts/subset-og-font.sh 重新子集化字型。`
    );
    process.exit(1);
  }
}

function render(svg: string, family: string, outFile: string) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: {
      fontFiles: FONT_FILES[family],
      loadSystemFonts: false,
      defaultFontFamily: family,
    },
  });
  writeFileSync(outFile, resvg.render().asPng());
}

let total = 0;
for (const locale of LOCALES) {
  const family = OG_FONT_FAMILY[locale];
  const outDir = locale === "zh-TW" ? OUT_BASE : join(OUT_BASE, locale);
  mkdirSync(outDir, { recursive: true });
  render(defaultOgSvg(locale), family, join(outDir, "default.png"));
  total += 1;
  for (const data of datasFor(locale)) {
    render(ogSvg(data, locale), family, join(outDir, `${data.code}.png`));
    total += 1;
  }
}

console.log(`✅ 已產生 ${total} 張 OG 圖（3 語系 × 65）→ public/og/`);
