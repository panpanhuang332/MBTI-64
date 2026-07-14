import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { allCodes } from "@/lib/scoring";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/test",
    "/types",
    "/methodology",
    "/about",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const typePages = allCodes().map((code) => ({
    url: `${SITE_URL}/types/${code}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...typePages];
}
