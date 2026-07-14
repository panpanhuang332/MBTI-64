import { describe, expect, it } from "vitest";
import {
  CORE_PROFILES,
  SUBTYPE_PROFILES,
  SUBTYPE_CODES,
  getAllProfiles,
  getFullProfile,
  splitCode,
  validateProfiles,
} from "../profiles";
import { allCodes } from "../scoring";

describe("64 型生成", () => {
  it("16 個核心型完整", () => {
    expect(Object.keys(CORE_PROFILES).length).toBe(16);
  });

  it("4 個子型完整", () => {
    expect(SUBTYPE_CODES.length).toBe(4);
    for (const code of SUBTYPE_CODES) {
      expect(SUBTYPE_PROFILES[code]).toBeDefined();
    }
  });

  it("可生成 64 個唯一代碼，每個都有名稱與摘要", () => {
    const profiles = getAllProfiles();
    expect(profiles.length).toBe(64);
    const codes = new Set(profiles.map((p) => p.code));
    const names = new Set(profiles.map((p) => p.name));
    expect(codes.size).toBe(64);
    expect(names.size).toBe(64); // 沒有重複名稱
    for (const p of profiles) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(50);
      expect(p.core).toBeDefined();
      expect(p.subtype).toBeDefined();
      expect(p.core.strengths.length).toBe(4);
      expect(p.core.blindspots.length).toBe(4);
      expect(p.core.reflectionQuestions.length).toBe(3);
    }
  });

  it("正式資料通過 validateProfiles", () => {
    expect(validateProfiles()).toEqual([]);
  });

  it("getFullProfile 對每個合法代碼都回傳資料", () => {
    for (const code of allCodes()) {
      expect(getFullProfile(code)).not.toBeNull();
    }
  });

  it("getFullProfile 對非法代碼回傳 null，不崩潰", () => {
    expect(getFullProfile("XXXX-YY")).toBeNull();
    expect(getFullProfile("")).toBeNull();
    expect(getFullProfile("INTJ")).toBeNull();
    expect(getFullProfile("INTJ-XX")).toBeNull();
    expect(getFullProfile("ABCD-OC")).toBeNull();
  });

  it("splitCode 正確拆解", () => {
    expect(splitCode("INTJ-OC")).toEqual({
      coreCode: "INTJ",
      subtypeCode: "OC",
    });
    expect(splitCode("bad")).toBeNull();
  });
});
