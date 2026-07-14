import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { allCodes } from "@/lib/scoring";
import { LOCALES, localeHref } from "@/lib/i18n/locales";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/test",
    "/types",
    "/compare",
    "/methodology",
    "/about",
    "/privacy",
    "/terms",
  ];
  const typePaths = allCodes().map((code) => `/types/${code}`);

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}${localeHref(locale, path)}`,
        changeFrequency: "monthly",
        priority: path === "/" ? (locale === "zh-TW" ? 1 : 0.8) : 0.6,
      });
    }
    for (const path of typePaths) {
      entries.push({
        url: `${SITE_URL}${localeHref(locale, path)}`,
        changeFrequency: "monthly",
        priority: 0.4,
      });
    }
  }
  return entries;
}
