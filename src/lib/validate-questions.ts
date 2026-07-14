import type { Dimension, Question } from "./types";
import { DIMENSIONS } from "./types";

export interface ValidationIssue {
  level: "error" | "warning";
  message: string;
}

const VALID_CATEGORIES = new Set([
  "work",
  "learning",
  "relationship",
  "daily",
  "decision",
  "stress",
]);

/** 情境式題目的類別（帶有明確場景的題目） */
const SCENARIO_CATEGORIES = new Set(["work", "stress", "decision"]);

/**
 * 題庫驗證：build 前自動執行（scripts/validate-data.ts）。
 */
export function validateQuestionBank(questions: Question[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const error = (message: string) => issues.push({ level: "error", message });

  // 總題數
  if (questions.length !== 72) {
    error(`總題數應為 72，實際為 ${questions.length}`);
  }

  // ID 唯一
  const seen = new Set<string>();
  for (const q of questions) {
    if (seen.has(q.id)) error(`題目 ID 重複：${q.id}`);
    seen.add(q.id);
  }

  const byDimension = new Map<Dimension, Question[]>();
  for (const d of DIMENSIONS) byDimension.set(d, []);

  for (const q of questions) {
    // direction 合法
    if (q.direction !== 1 && q.direction !== -1) {
      error(`題目 ${q.id} 的 direction 不合法：${q.direction}`);
    }
    // weight 合理範圍
    if (!(q.weight >= 0.5 && q.weight <= 2)) {
      error(`題目 ${q.id} 的 weight 應介於 0.5–2，實際為 ${q.weight}`);
    }
    if (!VALID_CATEGORIES.has(q.category)) {
      error(`題目 ${q.id} 的 category 不合法：${q.category}`);
    }
    if (!q.text || q.text.trim().length < 5) {
      error(`題目 ${q.id} 的題目文字過短`);
    }
    const bucket = byDimension.get(q.dimension);
    if (!bucket) {
      error(`題目 ${q.id} 的 dimension 不合法：${q.dimension}`);
    } else {
      bucket.push(q);
    }
  }

  // 每個維度的規則
  for (const d of DIMENSIONS) {
    const list = byDimension.get(d) ?? [];
    if (list.length !== 12) {
      error(`維度 ${d} 應有 12 題，實際為 ${list.length}`);
    }
    const reversed = list.filter((q) => q.direction === -1);
    if (reversed.length < 3) {
      error(`維度 ${d} 的反向題應至少 3 題，實際為 ${reversed.length}`);
    }
    const scenario = list.filter((q) => SCENARIO_CATEGORIES.has(q.category));
    if (scenario.length < 3) {
      error(`維度 ${d} 的情境式題目應至少 3 題，實際為 ${scenario.length}`);
    }

    // 配對題：每組 pairId 恰好 2 題、同維度，且每維度至少 2 組
    const pairs = new Map<string, Question[]>();
    for (const q of list) {
      if (q.pairId) {
        if (!pairs.has(q.pairId)) pairs.set(q.pairId, []);
        pairs.get(q.pairId)!.push(q);
      }
    }
    if (pairs.size < 2) {
      error(`維度 ${d} 的語意配對題應至少 2 組，實際為 ${pairs.size} 組`);
    }
    for (const [pid, members] of pairs) {
      if (members.length !== 2) {
        error(`配對 ${pid} 應恰好包含 2 題，實際為 ${members.length}`);
      }
    }
  }

  // 跨維度的 pairId 不可混用
  const pairDimension = new Map<string, Dimension>();
  for (const q of questions) {
    if (!q.pairId) continue;
    const existing = pairDimension.get(q.pairId);
    if (existing && existing !== q.dimension) {
      error(`配對 ${q.pairId} 橫跨了不同維度（${existing} 與 ${q.dimension}）`);
    }
    pairDimension.set(q.pairId, q.dimension);
  }

  return issues;
}
