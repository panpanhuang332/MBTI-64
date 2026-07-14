import type { Locale } from "./i18n/locales";

/**
 * OG 圖的公開路徑（不含產圖邏輯，client/server 皆可安全 import）。
 * zh-TW 維持原路徑 /og/<code>.png；其他語系在 /og/<locale>/ 底下。
 * 僅用於 metadata（由 metadataBase 拼接完整網址，含子路徑部署的 basePath）。
 */
export function ogImagePath(locale: Locale, code: string): string {
  return locale === "zh-TW" ? `/og/${code}.png` : `/og/${locale}/${code}.png`;
}

export function ogDefaultPath(locale: Locale): string {
  return ogImagePath(locale, "default");
}
