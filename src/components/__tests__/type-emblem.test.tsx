import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { TypeEmblem } from "../TypeEmblem";
import { allCodes } from "@/lib/scoring";

function markup(code: string): string {
  return renderToStaticMarkup(<TypeEmblem code={code} />);
}

describe("TypeEmblem 徽章差異化", () => {
  it("64 個代碼產生 64 張互不相同的圖", () => {
    const svgs = allCodes().map(markup);
    expect(new Set(svgs).size).toBe(64);
  });

  it("每個字母對應可辨識的視覺特徵", () => {
    // E 太陽 / I 彎月
    expect(markup("ESTJ-AH")).toContain('data-f="sun"');
    expect(markup("ISTJ-AH")).toContain('data-f="moon"');
    // S 小徑 / N 星座
    expect(markup("ESTJ-AH")).toContain('data-f="trail"');
    expect(markup("ESTJ-AH")).not.toContain('data-f="constellation"');
    expect(markup("ENTJ-AH")).toContain('data-f="constellation"');
    expect(markup("ENTJ-AH")).not.toContain('data-f="trail"');
    // J 尖銳 / P 圓潤
    expect(markup("ESTJ-AH")).toContain('data-f="sharp"');
    expect(markup("ESTP-AH")).toContain('data-f="round"');
    // A 旗幟 / O 湖泊
    expect(markup("ESTJ-AH")).toContain('data-f="flag"');
    expect(markup("ESTJ-OH")).toContain('data-f="lake"');
    // T/F 山色、H/C 天空色
    expect(markup("ESTJ-AH")).toContain("#0e4a5a");
    expect(markup("ESFJ-AH")).toContain("#2d6b7d");
    expect(markup("ESTJ-AH")).toContain("#fbe3b5");
    expect(markup("ESTJ-AC")).toContain("#eaf4fa");
  });

  it("同一代碼輸出固定（確定性）", () => {
    expect(markup("INFP-OC")).toBe(markup("INFP-OC"));
  });

  it("只差一個字母的兩型，徽章明顯不同（特徵層級的差異）", () => {
    const pairs: Array<[string, string, string]> = [
      ["ESTJ-AH", "ISTJ-AH", "sun"],
      ["ESTJ-AH", "ENTJ-AH", "trail"],
      ["ESTJ-AH", "ESTP-AH", "sharp"],
      ["ESTJ-AH", "ESTJ-OH", "flag"],
    ];
    for (const [a, b, feature] of pairs) {
      expect(markup(a)).toContain(`data-f="${feature}"`);
      expect(markup(b)).not.toContain(`data-f="${feature}"`);
    }
  });
});
