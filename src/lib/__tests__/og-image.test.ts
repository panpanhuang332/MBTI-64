import { describe, expect, it } from "vitest";
import {
  OG_HEIGHT,
  OG_WIDTH,
  collectOgChars,
  defaultOgSvg,
  ogSvg,
} from "../og-image";
import { getAllProfiles } from "../profiles";

const sample = {
  code: "INTJ-OC",
  name: "深林・星圖測繪者",
  tagline: "細照慢行，沉穩內斂",
  motto: "先看清全局，再落下每一步。",
};

describe("OG 圖 SVG 產生器", () => {
  it("輸出正確尺寸（1200×630）且包含代碼、名稱與免責小字", () => {
    const svg = ogSvg(sample);
    expect(svg).toContain(`width="${OG_WIDTH}"`);
    expect(svg).toContain(`height="${OG_HEIGHT}"`);
    expect(svg).toContain("INTJ-OC");
    expect(svg).toContain("深林・星圖測繪者");
    expect(svg).toContain("僅供自我探索");
  });

  it("同樣輸入產生相同輸出（確定性）", () => {
    expect(ogSvg(sample)).toBe(ogSvg(sample));
  });

  it("XML 特殊字元被跳脫，不會產生非法 SVG", () => {
    const svg = ogSvg({
      ...sample,
      name: 'A<&>"測試"',
    });
    expect(svg).toContain("A&lt;&amp;&gt;&quot;測試&quot;");
    expect(svg).not.toContain('A<&>"');
  });

  it("64 型都能產生含各自代碼的 SVG", () => {
    for (const p of getAllProfiles()) {
      const svg = ogSvg({
        code: p.code,
        name: p.name,
        tagline: p.subtitle,
        motto: p.motto,
      });
      expect(svg).toContain(p.code);
      expect(svg).toContain(p.name);
    }
  });

  it("預設 OG 圖包含站名", () => {
    expect(defaultOgSvg()).toContain("人格座標 64");
  });

  it("collectOgChars 涵蓋所有將出現在圖上的字元", () => {
    const profiles = getAllProfiles();
    const datas = profiles.map((p) => ({
      code: p.code,
      name: p.name,
      tagline: p.subtitle,
      motto: p.motto,
    }));
    const chars = new Set(collectOgChars(datas));
    for (const d of datas) {
      for (const ch of `${d.code}${d.name}${d.tagline}${d.motto}`) {
        expect(chars.has(ch), `缺少字元：${ch}`).toBe(true);
      }
    }
  });
});
