import { describe, expect, it } from "vitest";
import { compareDimensions, extractCode, sameCount } from "../compare";
import { allCodes } from "../scoring";

describe("extractCode", () => {
  it("接受純代碼（大小寫不拘、含空白）", () => {
    expect(extractCode("INTJ-OC")).toBe("INTJ-OC");
    expect(extractCode("  intj-oc ")).toBe("INTJ-OC");
    expect(extractCode("EnFp-Ah")).toBe("ENFP-AH");
  });

  it("接受結果分享網址（?c=）", () => {
    expect(
      extractCode(
        "https://example.com/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
      )
    ).toBe("INTJ-OC");
  });

  it("接受類型詳情頁網址（/types/CODE）", () => {
    expect(extractCode("https://example.com/types/ESFJ-OH")).toBe("ESFJ-OH");
  });

  it("接受夾在文字中的代碼", () => {
    expect(extractCode("我的結果是 ISTP-AC！")).toBe("ISTP-AC");
  });

  it("非法輸入回傳 null", () => {
    expect(extractCode("")).toBeNull();
    expect(extractCode("XXXX-YY")).toBeNull();
    expect(extractCode("INTJ")).toBeNull();
    expect(extractCode("https://example.com/result?c=ZZZZ-11")).toBeNull();
    expect(extractCode("hello world")).toBeNull();
  });
});

describe("compareDimensions", () => {
  it("完全相同的代碼：6 個維度皆相同", () => {
    const c = compareDimensions("INTJ-OC", "INTJ-OC");
    expect(c).toHaveLength(6);
    expect(sameCount(c)).toBe(6);
    for (const row of c) {
      expect(row.same).toBe(true);
      expect(row.talkPrompt.length).toBeGreaterThan(0);
    }
  });

  it("完全相反的代碼：0 個維度相同，且每個維度都有討論問題", () => {
    const c = compareDimensions("INTJ-OC", "ESFP-AH");
    expect(sameCount(c)).toBe(0);
    for (const row of c) {
      expect(row.same).toBe(false);
      expect(row.letterA).not.toBe(row.letterB);
      expect(row.talkPrompt).toContain("聊聊看");
    }
  });

  it("部分相同：正確計算相同數", () => {
    // INTJ-OC vs INTP-OC：E/I、S/N、T/F、A/O、H/C 同，J/P 不同
    const c = compareDimensions("INTJ-OC", "INTP-OC");
    expect(sameCount(c)).toBe(5);
    const jp = c.find((r) => r.dimension === "JP")!;
    expect(jp.same).toBe(false);
    expect(jp.letterA).toBe("J");
    expect(jp.letterB).toBe("P");
  });

  it("描述文字不打分數、不做適配結論", () => {
    for (const codeB of ["ESFP-AH", "INTJ-OC"]) {
      const rows = compareDimensions("INTJ-OC", codeB);
      for (const row of rows) {
        const text =
          row.descriptionA + row.descriptionB + row.talkPrompt;
        expect(text).not.toMatch(/契合度|適合當|不適合|分數|%/);
      }
    }
  });

  it("任意兩個合法代碼都能對照，不崩潰", () => {
    const codes = allCodes();
    // 抽樣對照（全對照 64×64 太多，取步進樣本）
    for (let i = 0; i < codes.length; i += 7) {
      for (let j = 0; j < codes.length; j += 13) {
        const rows = compareDimensions(codes[i], codes[j]);
        expect(rows).toHaveLength(6);
      }
    }
  });
});
