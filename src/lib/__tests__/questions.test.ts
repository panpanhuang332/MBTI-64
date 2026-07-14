import { describe, expect, it } from "vitest";
import { QUESTIONS } from "../questions";
import { validateQuestionBank } from "../validate-questions";
import { DIMENSIONS } from "../types";

describe("題庫驗證", () => {
  it("正式題庫通過所有驗證規則", () => {
    const issues = validateQuestionBank(QUESTIONS);
    expect(issues).toEqual([]);
  });

  it("總題數為 72，每維度恰好 12 題", () => {
    expect(QUESTIONS.length).toBe(72);
    for (const d of DIMENSIONS) {
      expect(QUESTIONS.filter((q) => q.dimension === d).length).toBe(12);
    }
  });

  it("每題 ID 唯一", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("驗證器能偵測出壞資料", () => {
    const broken = QUESTIONS.slice(0, 71); // 少一題
    const issues = validateQuestionBank(broken);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.some((i) => i.level === "error")).toBe(true);
  });

  it("驗證器能偵測重複 ID", () => {
    const broken = [...QUESTIONS.slice(0, 71), { ...QUESTIONS[0] }];
    const issues = validateQuestionBank(broken);
    expect(issues.some((i) => i.message.includes("重複"))).toBe(true);
  });

  it("驗證器能偵測不合法 weight", () => {
    const broken = QUESTIONS.map((q, i) =>
      i === 0 ? { ...q, weight: 99 } : q
    );
    const issues = validateQuestionBank(broken);
    expect(issues.some((i) => i.message.includes("weight"))).toBe(true);
  });
});
