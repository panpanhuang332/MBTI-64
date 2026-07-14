"use client";

import { z } from "zod";
import type { SavedResult, TestSession } from "./types";
import { QUESTION_IDS } from "./questions";
import { seededShuffle } from "./shuffle";

/**
 * versioned localStorage schema。
 * 所有讀取都經過 Zod 驗證；資料損壞或版本不符時安全地捨棄，不讓網站崩潰。
 * 不儲存任何可識別個人身分的資料。
 */

export const SESSION_KEY = "pa64.session.v1";
export const RESULT_KEY = "pa64.result.v1";
export const SCHEMA_VERSION = 1;

const sessionSchema = z.object({
  version: z.literal(SCHEMA_VERSION),
  sessionId: z.string().min(1),
  seed: z.string().min(1),
  startedAt: z.string(),
  updatedAt: z.string(),
  questionOrder: z.array(z.string()).length(QUESTION_IDS.length),
  answers: z.record(z.string(), z.number().int().min(1).max(5)),
  currentIndex: z.number().int().min(0),
  completedAt: z.string().optional(),
});

const dimensionScoresSchema = z.object({
  EI: z.number().min(-100).max(100),
  SN: z.number().min(-100).max(100),
  TF: z.number().min(-100).max(100),
  JP: z.number().min(-100).max(100),
  AO: z.number().min(-100).max(100),
  HC: z.number().min(-100).max(100),
});

const savedResultSchema = z.object({
  version: z.literal(SCHEMA_VERSION),
  code: z.string().regex(/^[EI][SN][TF][JP]-[AO][HC]$/),
  scores: dimensionScoresSchema,
  stability: z.enum(["high", "medium", "low"]),
  completedAt: z.string(),
});

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // 私密模式或空間不足時靜默失敗，網站仍可運作（僅無法保存進度）
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function loadSession(): TestSession | null {
  const rawValue = safeGet(SESSION_KEY);
  if (!rawValue) return null;
  try {
    const parsed = sessionSchema.safeParse(JSON.parse(rawValue));
    if (!parsed.success) {
      // 舊版或損壞資料：安全移除，不讓網站崩潰
      safeRemove(SESSION_KEY);
      return null;
    }
    const session = parsed.data;
    // 題序必須恰好涵蓋所有題目 ID（防止竄改或版本不符造成計分錯誤）
    const orderSet = new Set(session.questionOrder);
    if (
      orderSet.size !== QUESTION_IDS.length ||
      QUESTION_IDS.some((id) => !orderSet.has(id))
    ) {
      safeRemove(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    safeRemove(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: TestSession): void {
  safeSet(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  safeRemove(SESSION_KEY);
}

export function createSession(): TestSession {
  const now = new Date().toISOString();
  const seed = `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
  return {
    version: SCHEMA_VERSION,
    sessionId: `s-${seed}`,
    seed,
    startedAt: now,
    updatedAt: now,
    questionOrder: seededShuffle(QUESTION_IDS, seed),
    answers: {},
    currentIndex: 0,
  };
}

export function loadResult(): SavedResult | null {
  const rawValue = safeGet(RESULT_KEY);
  if (!rawValue) return null;
  try {
    const parsed = savedResultSchema.safeParse(JSON.parse(rawValue));
    if (!parsed.success) {
      safeRemove(RESULT_KEY);
      return null;
    }
    return parsed.data;
  } catch {
    safeRemove(RESULT_KEY);
    return null;
  }
}

export function saveResult(result: SavedResult): void {
  safeSet(RESULT_KEY, JSON.stringify(result));
}

export function clearResult(): void {
  safeRemove(RESULT_KEY);
}

export function clearAll(): void {
  clearSession();
  clearResult();
}
