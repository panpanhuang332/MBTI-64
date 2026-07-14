import type { Metadata } from "next";
import { getBundle } from "./index";
import {
  languageAlternates,
  localeHref,
  OG_LOCALE,
  type Locale,
} from "./locales";

/** 組出語系化頁面的 metadata（canonical、hreflang、OG locale） */
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description?: string },
  extra?: { noindex?: boolean; ogImage?: string }
): Metadata {
  const t = getBundle(locale);
  const canonical = localeHref(locale, path);
  const images = extra?.ogImage
    ? [{ url: extra.ogImage, width: 1200, height: 630 }]
    : undefined;
  // 用 absolute title 避免根 layout 的 zh-TW title template 污染其他語系
  const separator = locale === "en" ? " | " : "｜";
  const fullTitle =
    path === "/" ? meta.title : `${meta.title}${separator}${t.site.name}`;
  return {
    title: { absolute: fullTitle },
    description: meta.description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description: meta.description,
      locale: OG_LOCALE[locale],
      ...(images ? { images } : {}),
    },
    ...(extra?.noindex ? { robots: { index: false } } : {}),
    ...(images ? { twitter: { card: "summary_large_image", images: [extra!.ogImage!] } } : {}),
  };
}
