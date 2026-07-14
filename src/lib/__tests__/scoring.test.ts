import { describe, expect, it } from "vitest";
import { QUESTIONS } from "../questions";
import {
  allCodes,
  codeFromScores,
  computeDimensionScores,
  computeResult,
  computeStability,
  convertAnswer,
  isValidCode,
  letterOf,
  strengthOf,
} from "../scoring";
import { DIMENSIONS, type AnswerMap } from "../types";

function answersWithValue(value: number): AnswerMap {
  const answers: AnswerMap = {};
  for (const q of QUESTIONS) answers[q.id] = value;
  return answers;
}

describe("convertAnswer", () => {
  it("將 1–5 轉為 -2～+2", () => {
    expect(convertAnswer(1)).toBe(-2);
    expect(convertAnswer(2)).toBe(-1);
    expect(convertAnswer(3)).toBe(0);
    expect(convertAnswer(4)).toBe(1);
    expect(convertAnswer(5)).toBe(2);
  });

  it("非法值視為中立 0，不崩潰", () => {
    expect(convertAnswer(0)).toBe(0);
    expect(convertAnswer(6)).toBe(0);
    expect(convertAnswer(NaN)).toBe(0);
    expect(convertAnswer(Infinity)).toBe(0);
  });
});

describe("computeDimensionScores", () => {
  it("全部選 3（中立）不崩潰，且各維度為 0", () => {
    const scores = computeDimensionScores(QUESTIONS, answersWithValue(3));
    for (const d of DIMENSIONS) {
      expect(scores[d]).toBe(0);
    }
  });

  it("全部選 5：正向題推向第一字母、反向題推向第二字母，總分在合法範圍", () => {
    const scores = computeDimensionScores(QUESTIONS, answersWithValue(5));
    for (const d of DIMENSIONS) {
      expect(scores[d]).toBeGreaterThanOrEqual(-100);
      expect(scores[d]).toBeLessThanOrEqual(100);
    }
  });

  it("全部選 1 與全部選 5 的分數互為相反數", () => {
    const scores1 = computeDimensionScores(QUESTIONS, answersWithValue(1));
    const scores5 = computeDimensionScores(QUESTIONS, answersWithValue(5));
    for (const d of DIMENSIONS) {
      expect(scores1[d]).toBe(-scores5[d] + 0); // + 0 正規化 -0
    }
  });

  it("反向題計分正確：對正向題與反向題都答 5，效果相互抵銷", () => {
    const ei01 = QUESTIONS.find((q) => q.id === "EI01")!; // direction 1
    const ei02 = QUESTIONS.find((q) => q.id === "EI02")!; // direction -1
    expect(ei01.direction).toBe(1);
    expect(ei02.direction).toBe(-1);
    const scores = computeDimensionScores(QUESTIONS, {
      EI01: 5,
      EI02: 5,
    });
    expect(scores.EI).toBe(0);
  });

  it("只回答反向題且選 5 時，分數為負（偏第二字母）", () => {
    const scores = computeDimensionScores(QUESTIONS, { EI02: 5 });
    expect(scores.EI).toBeLessThan(0);
    expect(letterOf("EI", scores.EI)).toBe("I");
  });

  it("極端作答可達到滿分 ±100", () => {
    const answers: AnswerMap = {};
    for (const q of QUESTIONS) {
      answers[q.id] = q.direction === 1 ? 5 : 1;
    }
    const scores = computeDimensionScores(QUESTIONS, answers);
    for (const d of DIMENSIONS) {
      expect(scores[d]).toBe(100);
    }
  });
});

describe("確定性（相同答案必得相同結果）", () => {
  it("同一份答案重複計算 10 次，結果完全一致", () => {
    const answers: AnswerMap = {};
    QUESTIONS.forEach((q, i) => {
      answers[q.id] = ((i * 7) % 5) + 1;
    });
    const first = computeResult(QUESTIONS, answers);
    for (let i = 0; i < 10; i++) {
      const again = computeResult(QUESTIONS, answers);
      expect(again).toEqual(first);
    }
  });
});

describe("strengthOf 偏好強度", () => {
  it("0–14 偏好接近、15–39 中度、40+ 明顯", () => {
    expect(strengthOf(0)).toBe("close");
    expect(strengthOf(14)).toBe("close");
    expect(strengthOf(-14)).toBe("close");
    expect(strengthOf(15)).toBe("moderate");
    expect(strengthOf(39)).toBe("moderate");
    expect(strengthOf(-39)).toBe("moderate");
    expect(strengthOf(40)).toBe("clear");
    expect(strengthOf(100)).toBe("clear");
  });
});

describe("代碼產生", () => {
  it("產生的代碼格式正確", () => {
    const result = computeResult(QUESTIONS, answersWithValue(4));
    expect(isValidCode(result.code)).toBe(true);
  });

  it("中立答案（全 0 分）依固定規則取第一字母：ESTJ-AH", () => {
    const result = computeResult(QUESTIONS, answersWithValue(3));
    expect(result.code).toBe("ESTJ-AH");
  });

  it("codeFromScores 對負分取第二字母", () => {
    expect(
      codeFromScores({ EI: -1, SN: -1, TF: -1, JP: -1, AO: -1, HC: -1 })
    ).toBe("INFP-OC");
  });

  it("所有可能的六維組合共 64 種且互不重複", () => {
    const codes = allCodes();
    expect(codes.length).toBe(64);
    expect(new Set(codes).size).toBe(64);
    for (const code of codes) {
      expect(isValidCode(code)).toBe(true);
    }
  });
});

describe("六維結果均在合法範圍", () => {
  it("隨機樣式答案的六維分數與百分比皆合法", () => {
    const answers: AnswerMap = {};
    QUESTIONS.forEach((q, i) => {
      answers[q.id] = ((i * 13 + 3) % 5) + 1;
    });
    const result = computeResult(QUESTIONS, answers);
    expect(result.dimensions).toHaveLength(6);
    for (const d of result.dimensions) {
      expect(d.score).toBeGreaterThanOrEqual(-100);
      expect(d.score).toBeLessThanOrEqual(100);
      expect(d.firstPercent + d.secondPercent).toBe(100);
      expect(d.firstPercent).toBeGreaterThanOrEqual(0);
      expect(d.firstPercent).toBeLessThanOrEqual(100);
    }
  });
});

describe("computeStability 作答穩定度", () => {
  it("配對題完全一致 → 高穩定度", () => {
    // 每組配對：正向題答 5、反向題答 1 → 有效值一致
    const answers: AnswerMap = {};
    for (const q of QUESTIONS) {
      if (q.pairId) answers[q.id] = q.direction === 1 ? 5 : 1;
    }
    expect(computeStability(QUESTIONS, answers)).toBe("high");
  });

  it("配對題完全矛盾 → 低穩定度", () => {
    // 正向題答 5、反向題也答 5 → 有效值相反
    const answers: AnswerMap = {};
    for (const q of QUESTIONS) {
      if (q.pairId) answers[q.id] = 5;
    }
    expect(computeStability(QUESTIONS, answers)).toBe("low");
  });

  it("沒有配對題作答時回傳中等，不崩潰", () => {
    expect(computeStability(QUESTIONS, {})).toBe("medium");
  });
});
