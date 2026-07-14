import { CORE_PROFILES, type CoreProfile } from "./cores";
import {
  SUBTYPE_PROFILES,
  SUBTYPE_CODES,
  type SubtypeCode,
  type SubtypeProfile,
} from "./subtypes";
import { allCodes, isValidCode } from "../scoring";

export type { CoreProfile } from "./cores";
export type { SubtypeProfile, SubtypeCode } from "./subtypes";
export { CORE_PROFILES, CORE_CODES } from "./cores";
export { SUBTYPE_PROFILES, SUBTYPE_CODES } from "./subtypes";

/**
 * 64 型完整結果 = 16 個四字母核心人格 × 4 個表達子型（組合式架構）。
 * 每型有獨立中文名稱（子型名＋核心名）與組合摘要。
 */
export interface FullProfile {
  /** 六字母代碼，如 INTJ-OC */
  code: string;
  coreCode: string;
  subtypeCode: SubtypeCode;
  /** 獨立中文類型名稱，如「深林・星圖測繪者」 */
  name: string;
  enName: string;
  /** 簡短副標 */
  subtitle: string;
  /** 完整摘要（核心＋子型） */
  summary: string;
  core: CoreProfile;
  subtype: SubtypeProfile;
  motto: string;
}

export function splitCode(code: string): {
  coreCode: string;
  subtypeCode: SubtypeCode;
} | null {
  if (!isValidCode(code)) return null;
  const [coreCode, subtypeCode] = code.split("-");
  if (!CORE_PROFILES[coreCode]) return null;
  if (!SUBTYPE_CODES.includes(subtypeCode as SubtypeCode)) return null;
  return { coreCode, subtypeCode: subtypeCode as SubtypeCode };
}

export function getFullProfile(code: string): FullProfile | null {
  const parts = splitCode(code);
  if (!parts) return null;
  const core = CORE_PROFILES[parts.coreCode];
  const subtype = SUBTYPE_PROFILES[parts.subtypeCode];
  return {
    code,
    coreCode: parts.coreCode,
    subtypeCode: parts.subtypeCode,
    name: `${subtype.name}・${core.name}`,
    enName: `${subtype.enName} ${core.enName.replace(/^The /, "")}`,
    subtitle: subtype.tagline,
    summary: `${core.summary}${subtype.summary}`,
    core,
    subtype,
    motto: core.motto,
  };
}

/** 產生全部 64 型（順序固定） */
export function getAllProfiles(): FullProfile[] {
  return allCodes().map((code) => {
    const profile = getFullProfile(code);
    if (!profile) {
      throw new Error(`無法產生類型資料：${code}`);
    }
    return profile;
  });
}

/** profile 資料驗證：build 前自動執行 */
export function validateProfiles(): string[] {
  const errors: string[] = [];

  const coreCodes = Object.keys(CORE_PROFILES);
  if (coreCodes.length !== 16) {
    errors.push(`核心人格應有 16 個，實際為 ${coreCodes.length}`);
  }
  if (SUBTYPE_CODES.length !== 4) {
    errors.push(`表達子型應有 4 個，實際為 ${SUBTYPE_CODES.length}`);
  }

  // 核心型欄位完整性
  for (const [code, core] of Object.entries(CORE_PROFILES)) {
    if (core.code !== code) errors.push(`核心 ${code} 的 code 欄位不一致`);
    if (!core.name) errors.push(`核心 ${code} 缺少名稱`);
    if (core.summary.length < 60 || core.summary.length > 160) {
      errors.push(
        `核心 ${code} 摘要長度應約 80–120 字，實際 ${core.summary.length}`
      );
    }
    if (core.strengths.length !== 4) errors.push(`核心 ${code} 應有 4 項優勢`);
    if (core.blindspots.length !== 4)
      errors.push(`核心 ${code} 應有 4 項盲點`);
    for (const field of [
      "workStyle",
      "collaboration",
      "stress",
      "growth",
      "misconception",
      "motto",
    ] as const) {
      if (!core[field]) errors.push(`核心 ${code} 缺少欄位 ${field}`);
    }
    if (core.reflectionQuestions.length !== 3) {
      errors.push(`核心 ${code} 應有 3 個反思問題`);
    }
  }

  // 子型欄位完整性
  for (const code of SUBTYPE_CODES) {
    const sub = SUBTYPE_PROFILES[code];
    if (!sub) {
      errors.push(`缺少子型 ${code}`);
      continue;
    }
    if (sub.summary.length < 30 || sub.summary.length > 100) {
      errors.push(
        `子型 ${code} 摘要長度應約 40–80 字，實際 ${sub.summary.length}`
      );
    }
    for (const field of [
      "name",
      "tagline",
      "decisionStyle",
      "socialStyle",
      "stressStyle",
      "communicationStyle",
    ] as const) {
      if (!sub[field]) errors.push(`子型 ${code} 缺少欄位 ${field}`);
    }
  }

  // 64 型生成完整性
  const profiles = getAllProfiles();
  if (profiles.length !== 64) {
    errors.push(`64 型應有 64 個，實際為 ${profiles.length}`);
  }
  const codes = new Set<string>();
  const names = new Set<string>();
  for (const p of profiles) {
    if (codes.has(p.code)) errors.push(`64 型代碼重複：${p.code}`);
    codes.add(p.code);
    if (names.has(p.name)) errors.push(`64 型名稱重複：${p.name}`);
    names.add(p.name);
    if (!p.name || !p.summary) errors.push(`類型 ${p.code} 缺少名稱或摘要`);
  }

  return errors;
}
