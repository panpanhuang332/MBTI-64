import { describe, expect, it } from "vitest";
import {
  getAllLocalizedProfiles,
  getBundle,
  getLocalizedProfile,
  validateBundles,
} from "../i18n";
import {
  LOCALES,
  fmt,
  isLocale,
  localeHref,
  switchLocalePath,
} from "../i18n/locales";
import { QUESTIONS } from "../questions";
import { allCodes } from "../scoring";

describe("語系 bundle", () => {
  it("三個語系的結構驗證通過", () => {
    expect(validateBundles()).toEqual([]);
  });

  it("每個語系涵蓋全部 72 題翻譯", () => {
    for (const locale of LOCALES) {
      const bundle = getBundle(locale);
      for (const q of QUESTIONS) {
        expect(
          bundle.questions[q.id],
          `${locale} 缺 ${q.id}`
        ).toBeTruthy();
      }
    }
  });

  it("zh-CN 為簡體轉換（抽查詞彙）", () => {
    const cn = getBundle("zh-CN");
    expect(cn.site.name).toBe("人格坐标 64");
    expect(cn.header.nav.test).toBe("开始测验");
    expect(cn.questions.EI01).toContain("连续");
  });

  it("en 為英文（抽查）", () => {
    const en = getBundle("en");
    expect(en.site.name).toBe("Personality Atlas 64");
    expect(en.questions.EI01).toMatch(/^After several/);
    expect(en.cores.INTJ.name).toBe("Starchart Drafter");
  });

  it("每個語系都能生成 64 個唯一類型名稱", () => {
    for (const locale of LOCALES) {
      const profiles = getAllLocalizedProfiles(locale);
      expect(profiles.length).toBe(64);
      expect(new Set(profiles.map((p) => p.name)).size).toBe(64);
    }
  });

  it("getLocalizedProfile 對非法代碼回傳 null", () => {
    for (const locale of LOCALES) {
      expect(getLocalizedProfile("XXXX-YY", locale)).toBeNull();
    }
    expect(getLocalizedProfile(allCodes()[0], "en")).not.toBeNull();
  });
});

describe("locale 路徑工具", () => {
  it("localeHref 組出正確前綴", () => {
    expect(localeHref("zh-TW", "/test")).toBe("/test");
    expect(localeHref("zh-CN", "/test")).toBe("/zh-CN/test");
    expect(localeHref("en", "/")).toBe("/en");
    expect(localeHref("zh-TW", "/")).toBe("/");
  });

  it("switchLocalePath 正確換語系", () => {
    expect(switchLocalePath("/types/INTJ-OC", "en")).toBe(
      "/en/types/INTJ-OC"
    );
    expect(switchLocalePath("/en/types", "zh-TW")).toBe("/types");
    expect(switchLocalePath("/zh-CN/test", "en")).toBe("/en/test");
    expect(switchLocalePath("/en", "zh-CN")).toBe("/zh-CN");
    expect(switchLocalePath("/", "en")).toBe("/en");
  });

  it("isLocale 與 fmt", () => {
    expect(isLocale("zh-TW")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(fmt("第 {n} / {total} 題", { n: 3, total: 72 })).toBe(
      "第 3 / 72 題"
    );
    expect(fmt("hi {name}", {})).toBe("hi {name}");
  });
});
