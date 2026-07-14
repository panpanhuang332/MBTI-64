import { describe, expect, it } from "vitest";
import {
  OG_HEIGHT,
  OG_WIDTH,
  collectOgChars,
  defaultOgSvg,
  ogSvg,
} from "../og-image";
import { ogDefaultPath, ogImagePath } from "../og-paths";
import { getAllLocalizedProfiles } from "../i18n";
import { LOCALES } from "../i18n/locales";

const sample = {
  code: "INTJ-OC",
  name: "深林・星圖測繪者",
  tagline: "細照慢行，沉穩內斂",
  motto: "先看清全局，再落下每一步。",
};

describe("OG 圖 SVG 產生器", () => {
  it("輸出正確尺寸（1200×630）且包含代碼、名稱與免責小字", () => {
    const svg = ogSvg(sample, "zh-TW");
    expect(svg).toContain(`width="${OG_WIDTH}"`);
    expect(svg).toContain(`height="${OG_HEIGHT}"`);
    expect(svg).toContain("INTJ-OC");
    expect(svg).toContain("深林・星圖測繪者");
    expect(svg).toContain("僅供自我探索");
  });

  it("同樣輸入產生相同輸出（確定性）", () => {
    expect(ogSvg(sample, "zh-TW")).toBe(ogSvg(sample, "zh-TW"));
  });

  it("XML 特殊字元被跳脫，不會產生非法 SVG", () => {
    const svg = ogSvg({ ...sample, name: 'A<&>"測試"' }, "zh-TW");
    expect(svg).toContain("A&lt;&amp;&gt;&quot;測試&quot;");
    expect(svg).not.toContain('A<&>"');
  });

  it("三個語系 × 64 型都能產生含各自代碼與名稱的 SVG", () => {
    for (const locale of LOCALES) {
      for (const p of getAllLocalizedProfiles(locale)) {
        const svg = ogSvg(
          { code: p.code, name: p.name, tagline: p.subtitle, motto: p.motto },
          locale
        );
        expect(svg).toContain(p.code);
        expect(svg).toContain(p.name);
      }
    }
  });

  it("各語系使用對應字型與免責文字", () => {
    expect(ogSvg(sample, "zh-TW")).toContain("Noto Sans TC");
    expect(ogSvg(sample, "zh-CN")).toContain("Noto Sans SC");
    expect(ogSvg(sample, "zh-CN")).toContain("仅供自我探索");
    const en = ogSvg(
      { code: "INTJ-OC", name: "Deepwood Starchart Drafter", tagline: "x", motto: "y" },
      "en"
    );
    expect(en).toContain("For self-exploration only");
  });

  it("預設 OG 圖包含各語系站名", () => {
    expect(defaultOgSvg("zh-TW")).toContain("人格座標 64");
    expect(defaultOgSvg("zh-CN")).toContain("人格坐标 64");
    expect(defaultOgSvg("en")).toContain("Personality Atlas 64");
  });

  it("collectOgChars 涵蓋該語系所有將出現在圖上的字元", () => {
    for (const locale of LOCALES) {
      const datas = getAllLocalizedProfiles(locale).map((p) => ({
        code: p.code,
        name: p.name,
        tagline: p.subtitle,
        motto: p.motto,
      }));
      const chars = new Set(collectOgChars(datas, locale));
      for (const d of datas) {
        for (const ch of `${d.code}${d.name}${d.tagline}${d.motto}`) {
          expect(chars.has(ch), `[${locale}] 缺少字元：${ch}`).toBe(true);
        }
      }
    }
  });
});

describe("OG 圖路徑", () => {
  it("zh-TW 維持原路徑，其他語系加前綴", () => {
    expect(ogImagePath("zh-TW", "INTJ-OC")).toBe("/og/INTJ-OC.png");
    expect(ogImagePath("zh-CN", "INTJ-OC")).toBe("/og/zh-CN/INTJ-OC.png");
    expect(ogImagePath("en", "INTJ-OC")).toBe("/og/en/INTJ-OC.png");
    expect(ogDefaultPath("en")).toBe("/og/en/default.png");
  });
});
