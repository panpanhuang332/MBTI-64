import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/test/questions",
        "/test/calculating",
        "/result",
        "/review",
        "/zh-CN/test/questions",
        "/zh-CN/test/calculating",
        "/zh-CN/result",
        "/zh-CN/review",
        "/en/test/questions",
        "/en/test/calculating",
        "/en/result",
        "/en/review",
      ].map((p) => `${BASE_PATH}${p}`),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
