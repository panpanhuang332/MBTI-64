import { canonicalBundle, type Bundle } from "./canonical";
import { enBundle } from "./en";
import zhCnGenerated from "./zh-cn.generated.json";
import type { Locale } from "./locales";
import type { CoreProfile } from "../profiles/cores";
import type { SubtypeCode, SubtypeProfile } from "../profiles/subtypes";
import { allCodes, isValidCode } from "../scoring";
import { SUBTYPE_CODES } from "../profiles/subtypes";

export * from "./locales";
export type { Bundle } from "./canonical";

const BUNDLES: Record<Locale, Bundle> = {
  "zh-TW": canonicalBundle,
  // 生成的 JSON 與 canonical 結構一致（由 validate-data 檢查）
  "zh-CN": zhCnGenerated as unknown as Bundle,
  en: enBundle,
};

export function getBundle(locale: Locale): Bundle {
  return BUNDLES[locale] ?? canonicalBundle;
}

/** 語系化的 64 型完整資料（結構同 profiles/index 的 FullProfile） */
export interface LocalizedProfile {
  code: string;
  coreCode: string;
  subtypeCode: SubtypeCode;
  name: string;
  enName: string;
  subtitle: string;
  summary: string;
  core: CoreProfile;
  subtype: SubtypeProfile;
  motto: string;
}

export function getLocalizedProfile(
  code: string,
  locale: Locale
): LocalizedProfile | null {
  if (!isValidCode(code)) return null;
  const bundle = getBundle(locale);
  const [coreCode, subtypeCode] = code.split("-");
  const core = bundle.cores[coreCode];
  const subtype = bundle.subtypes[subtypeCode as SubtypeCode];
  if (!core || !subtype) return null;
  return {
    code,
    coreCode,
    subtypeCode: subtypeCode as SubtypeCode,
    name: `${subtype.name}${bundle.site.nameSeparator}${core.name}`,
    enName: `${subtype.enName} ${core.enName.replace(/^The /, "")}`,
    subtitle: subtype.tagline,
    summary: `${core.summary}${subtype.summary}`,
    core,
    subtype,
    motto: core.motto,
  };
}

export function getAllLocalizedProfiles(locale: Locale): LocalizedProfile[] {
  return allCodes().map((code) => {
    const profile = getLocalizedProfile(code, locale);
    if (!profile) throw new Error(`無法產生類型資料：${code} (${locale})`);
    return profile;
  });
}

/**
 * 檢查非預設語系 bundle 的結構是否與 canonical 同步
 * （鍵集合一致、字串型別一致；由 validate-data 呼叫）。
 */
export function validateBundles(): string[] {
  const errors: string[] = [];

  function walk(base: unknown, other: unknown, path: string, locale: string) {
    if (typeof base === "string") {
      if (typeof other !== "string" || other.length === 0) {
        errors.push(`[${locale}] ${path} 缺少翻譯字串`);
      }
      return;
    }
    if (Array.isArray(base)) {
      if (!Array.isArray(other) || other.length !== base.length) {
        errors.push(`[${locale}] ${path} 陣列長度不一致`);
        return;
      }
      base.forEach((item, i) => walk(item, other[i], `${path}[${i}]`, locale));
      return;
    }
    if (base && typeof base === "object") {
      if (!other || typeof other !== "object") {
        errors.push(`[${locale}] ${path} 結構缺失`);
        return;
      }
      for (const key of Object.keys(base as Record<string, unknown>)) {
        walk(
          (base as Record<string, unknown>)[key],
          (other as Record<string, unknown>)[key],
          path ? `${path}.${key}` : key,
          locale
        );
      }
      return;
    }
    // number / boolean 等：直接比對型別
    if (typeof base !== typeof other) {
      errors.push(`[${locale}] ${path} 型別不一致`);
    }
  }

  walk(canonicalBundle, BUNDLES["zh-CN"], "", "zh-CN");
  walk(canonicalBundle, BUNDLES.en, "", "en");

  // 每個語系的 64 型名稱唯一
  for (const locale of ["zh-TW", "zh-CN", "en"] as Locale[]) {
    const names = new Set<string>();
    for (const p of getAllLocalizedProfiles(locale)) {
      if (names.has(p.name)) {
        errors.push(`[${locale}] 類型名稱重複：${p.name}`);
      }
      names.add(p.name);
    }
    // 子型代碼完整
    const bundle = getBundle(locale);
    for (const sc of SUBTYPE_CODES) {
      if (!bundle.subtypes[sc]) errors.push(`[${locale}] 缺少子型 ${sc}`);
    }
  }

  return errors;
}
