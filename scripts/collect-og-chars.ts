/** 輸出 OG 圖用到的所有字元（供 subset-og-font.sh 子集化字型） */
import { getAllProfiles } from "../src/lib/profiles";
import { collectOgChars } from "../src/lib/og-image";

const profiles = getAllProfiles();
process.stdout.write(
  collectOgChars(
    profiles.map((p) => ({
      code: p.code,
      name: p.name,
      tagline: p.subtitle,
      motto: p.motto,
    }))
  )
);
