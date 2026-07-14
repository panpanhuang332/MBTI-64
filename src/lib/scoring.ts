import type {
  AnswerMap,
  Dimension,
  DimensionResult,
  DimensionScores,
  PreferenceStrength,
  Question,
  Stability,
  TestResult,
} from "./types";
import { DIMENSIONS } from "./types";
import { DIMENSION_META } from "./dimensions";

/**
 * 計分引擎（純函式、確定性、可重現）：
 *
 * 1. 作答值 1–5 轉為 -2 ~ +2（3 = 0，代表中立）
 * 2. 每題分數 = 轉換值 × direction × weight
 * 3. 各維度加總後，除以該維度理論最大值，標準化為 -100 ~ +100
 * 4. 分數 >= 0 取第一字母，< 0 取第二字母（固定規則，不用隨機數）
 *
 * 百分比代表「作答傾向」，不是人格純度，也不是準確率。
 */

export function convertAnswer(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const v = Math.round(value);
  if (v < 1 || v > 5) return 0;
  return v - 3; // 1→-2, 2→-1, 3→0, 4→+1, 5→+2
}

/** 各維度標準化分數 -100 ~ +100 */
export function computeDimensionScores(
  questions: Question[],
  answers: AnswerMap
): DimensionScores {
  const raw: Record<Dimension, number> = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
    AO: 0,
    HC: 0,
  };
  const max: Record<Dimension, number> = { ...raw };

  for (const q of questions) {
    max[q.dimension] += 2 * q.weight; // 每題理論最大貢獻
    const answer = answers[q.id];
    if (answer === undefined) continue;
    raw[q.dimension] += convertAnswer(answer) * q.direction * q.weight;
  }

  const scores = {} as DimensionScores;
  for (const d of DIMENSIONS) {
    const normalized = max[d] === 0 ? 0 : (raw[d] / max[d]) * 100;
    // + 0 將 -0 正規化為 0
    scores[d] = Math.max(-100, Math.min(100, Math.round(normalized))) + 0;
  }
  return scores;
}

export function strengthOf(score: number): PreferenceStrength {
  const abs = Math.abs(score);
  if (abs <= 14) return "close";
  if (abs <= 39) return "moderate";
  return "clear";
}

export const STRENGTH_LABEL: Record<PreferenceStrength, string> = {
  close: "偏好接近",
  moderate: "中度偏好",
  clear: "明顯偏好",
};

/** 固定規則選字母：分數 >= 0 取第一字母（同分時偏第一字母，永遠可重現） */
export function letterOf(dimension: Dimension, score: number): string {
  const meta = DIMENSION_META[dimension];
  return score >= 0 ? meta.first : meta.second;
}

export function dimensionResult(
  dimension: Dimension,
  score: number
): DimensionResult {
  const firstPercent = Math.round((score + 100) / 2);
  return {
    dimension,
    score,
    letter: letterOf(dimension, score),
    firstPercent,
    secondPercent: 100 - firstPercent,
    strength: strengthOf(score),
  };
}

/** 由六維分數組出六字母代碼，例如 INTJ-OC */
export function codeFromScores(scores: DimensionScores): string {
  const four = (["EI", "SN", "TF", "JP"] as Dimension[])
    .map((d) => letterOf(d, scores[d]))
    .join("");
  const two = (["AO", "HC"] as Dimension[])
    .map((d) => letterOf(d, scores[d]))
    .join("");
  return `${four}-${two}`;
}

/**
 * 作答穩定度：根據語意配對題計算。
 * 每組配對題將兩題的「有效值」（轉換值 × direction）相減，
 * 差距越小代表語意相近題目的回答越一致。
 *
 * 穩定度不是準確率，只表示語意相近或反向題之間的答案是否大致一致。
 */
export function computeStability(
  questions: Question[],
  answers: AnswerMap
): Stability {
  const pairs = new Map<string, Question[]>();
  for (const q of questions) {
    if (!q.pairId) continue;
    if (!pairs.has(q.pairId)) pairs.set(q.pairId, []);
    pairs.get(q.pairId)!.push(q);
  }

  let total = 0;
  let count = 0;
  for (const members of pairs.values()) {
    if (members.length !== 2) continue;
    const [a, b] = members;
    const answerA = answers[a.id];
    const answerB = answers[b.id];
    if (answerA === undefined || answerB === undefined) continue;
    const effectiveA = convertAnswer(answerA) * a.direction;
    const effectiveB = convertAnswer(answerB) * b.direction;
    total += Math.abs(effectiveA - effectiveB); // 0（完全一致）～ 4（完全相反）
    count += 1;
  }

  if (count === 0) return "medium";
  const avg = total / count;
  if (avg <= 1.0) return "high";
  if (avg <= 2.0) return "medium";
  return "low";
}

export const STABILITY_LABEL: Record<Stability, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export const LOW_STABILITY_NOTE =
  "你的部分回答呈現較大的情境差異。這不代表結果無效，但建議將報告視為探索起點，或在不同狀態下重新測驗。";

/** 主要入口：由完整作答計算測驗結果（相同答案必得相同結果） */
export function computeResult(
  questions: Question[],
  answers: AnswerMap
): TestResult {
  const scores = computeDimensionScores(questions, answers);
  return {
    code: codeFromScores(scores),
    dimensions: DIMENSIONS.map((d) => dimensionResult(d, scores[d])),
    scores,
    stability: computeStability(questions, answers),
  };
}

/**
 * 單題作答的傾向方向（復盤視圖用）：
 * 'first' = 推向維度第一字母、'second' = 推向第二字母、'neutral' = 中立
 */
export function answerLean(
  question: Question,
  answer: number
): "first" | "second" | "neutral" {
  const effective = convertAnswer(answer) * question.direction;
  if (effective > 0) return "first";
  if (effective < 0) return "second";
  return "neutral";
}

/** 六字母代碼格式驗證，例如 INTJ-OC */
export const CODE_PATTERN = /^[EI][SN][TF][JP]-[AO][HC]$/;

export function isValidCode(code: string): boolean {
  return CODE_PATTERN.test(code);
}

/** 全部 64 個合法代碼 */
export function allCodes(): string[] {
  const codes: string[] = [];
  for (const ei of ["E", "I"])
    for (const sn of ["S", "N"])
      for (const tf of ["T", "F"])
        for (const jp of ["J", "P"])
          for (const ao of ["A", "O"])
            for (const hc of ["H", "C"])
              codes.push(`${ei}${sn}${tf}${jp}-${ao}${hc}`);
  return codes;
}
