import type { MetadataRoute } from "next";
import {
  BASE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}｜${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e4a5a",
    icons: [
      {
        src: `${BASE_PATH}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
