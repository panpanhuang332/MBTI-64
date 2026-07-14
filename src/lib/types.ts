/**
 * 核心型別定義
 *
 * 注意：EI / SN / TF / JP 為常見的人格偏好表達方式；
 * AO（決策推進方式）與 HC（人際表達溫度）為「人格座標 64」自訂的探索維度，
 * 不是官方 MBTI 構面。本測驗亦非官方 MBTI 測驗。
 */

export type Dimension = "EI" | "SN" | "TF" | "JP" | "AO" | "HC";

export const DIMENSIONS: readonly Dimension[] = [
  "EI",
  "SN",
  "TF",
  "JP",
  "AO",
  "HC",
] as const;

export type QuestionCategory =
  | "work"
  | "learning"
  | "relationship"
  | "daily"
  | "decision"
  | "stress";

export interface Question {
  id: string;
  text: string;
  dimension: Dimension;
  /** 1 = 同意時偏向該維度第一個字母（E/S/T/J/A/H）；-1 = 反向計分 */
  direction: 1 | -1;
  weight: number;
  /** 語意配對題群組 ID，用於計算作答穩定度 */
  pairId?: string;
  category: QuestionCategory;
}

/** 1–5 Likert 作答值 */
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

/** questionId -> answer */
export type AnswerMap = Record<string, number>;

/** 各維度標準化分數：-100（偏第二字母）～ +100（偏第一字母） */
export type DimensionScores = Record<Dimension, number>;

export type PreferenceStrength = "close" | "moderate" | "clear";

export type Stability = "high" | "medium" | "low";

export interface DimensionResult {
  dimension: Dimension;
  /** -100 ~ +100 */
  score: number;
  /** 被選出的字母（固定規則、可重現） */
  letter: string;
  /** 第一字母側百分比 0–100（作答傾向，非「準確率」） */
  firstPercent: number;
  /** 第二字母側百分比 0–100 */
  secondPercent: number;
  strength: PreferenceStrength;
}

export interface TestResult {
  /** 六字母代碼，如 INTJ-OC */
  code: string;
  dimensions: DimensionResult[];
  scores: DimensionScores;
  stability: Stability;
}

/** localStorage 中的測驗工作階段（versioned schema） */
export interface TestSession {
  version: number;
  sessionId: string;
  seed: string;
  startedAt: string;
  updatedAt: string;
  questionOrder: string[];
  answers: Record<string, number>;
  currentIndex: number;
  completedAt?: string;
}

/** localStorage 中保存的最近一次結果 */
export interface SavedResult {
  version: number;
  code: string;
  scores: DimensionScores;
  stability: Stability;
  completedAt: string;
}
