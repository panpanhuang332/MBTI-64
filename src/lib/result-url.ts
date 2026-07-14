import type { DimensionScores, Stability } from "./types";
import { DIMENSIONS } from "./types";
import { codeFromScores, isValidCode } from "./scoring";

/**
 * 結果分享網址的編碼與驗證。
 *
 * 格式：/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high
 *
 * 所有參數都經過驗證：
 * - 代碼必須符合六字母格式
 * - 分數必須是 -100 ~ 100 的整數
 * - 代碼必須與分數推導出的代碼一致（防止亂改參數產生矛盾頁面）
 * 無效參數不會造成頁面崩潰，改為導向友善錯誤狀態。
 */

export interface SharedResult {
  code: string;
  scores: DimensionScores;
  stability: Stability;
}

const PARAM_KEYS: Record<string, keyof DimensionScores> = {
  ei: "EI",
  sn: "SN",
  tf: "TF",
  jp: "JP",
  ao: "AO",
  hc: "HC",
};

export function encodeResultParams(result: SharedResult): string {
  const params = new URLSearchParams();
  params.set("c", result.code);
  for (const [key, dim] of Object.entries(PARAM_KEYS)) {
    params.set(key, String(result.scores[dim]));
  }
  params.set("st", result.stability);
  return params.toString();
}

function parseScore(value: string | null): number | null {
  if (value === null || value.trim() === "" || !/^-?\d+$/.test(value.trim())) {
    return null;
  }
  const n = Number(value);
  if (!Number.isInteger(n) || n < -100 || n > 100) return null;
  return n;
}

export function decodeResultParams(
  params: URLSearchParams
): SharedResult | null {
  const code = params.get("c") ?? "";
  if (!isValidCode(code)) return null;

  const scores = {} as DimensionScores;
  for (const [key, dim] of Object.entries(PARAM_KEYS)) {
    const score = parseScore(params.get(key));
    if (score === null) return null;
    scores[dim] = score;
  }

  // 代碼與分數必須一致
  if (codeFromScores(scores) !== code) return null;

  const st = params.get("st");
  if (st !== "high" && st !== "medium" && st !== "low") return null;

  // 保底檢查：六維皆存在
  for (const d of DIMENSIONS) {
    if (typeof scores[d] !== "number") return null;
  }

  return { code, scores, stability: st };
}
