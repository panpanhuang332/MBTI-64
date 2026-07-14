/**
 * 輸出各字型子集所需的 OG 字元清單（供 subset-og-font.sh）。
 * 用法：tsx scripts/collect-og-chars.ts tc|sc
 *  - tc：zh-TW ＋ en 的字元（Noto Sans TC 子集）
 *  - sc：zh-CN 的字元（Noto Sans SC 子集）
 */
import { getAllLocalizedProfiles } from "../src/lib/i18n";
import type { Locale } from "../src/lib/i18n/locales";
import { collectOgChars } from "../src/lib/og-image";

function charsFor(locale: Locale): string {
  return collectOgChars(
    getAllLocalizedProfiles(locale).map((p) => ({
      code: p.code,
      name: p.name,
      tagline: p.subtitle,
      motto: p.motto,
    })),
    locale
  );
}

const which = process.argv[2];
if (which === "tc") {
  const merged = new Set([...charsFor("zh-TW"), ...charsFor("en")]);
  process.stdout.write([...merged].sort().join(""));
} else if (which === "sc") {
  process.stdout.write(charsFor("zh-CN"));
} else {
  console.error("用法：tsx scripts/collect-og-chars.ts tc|sc");
  process.exit(1);
}
