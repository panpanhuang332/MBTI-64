// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import {
  RESULT_KEY,
  SESSION_KEY,
  clearAll,
  createSession,
  loadResult,
  loadSession,
  saveResult,
  saveSession,
} from "../storage";
import { QUESTION_IDS } from "../questions";
import { seededShuffle } from "../shuffle";

beforeEach(() => {
  window.localStorage.clear();
});

describe("localStorage 測驗狀態", () => {
  it("createSession 產生完整題序，且 seed 洗牌可重現", () => {
    const session = createSession();
    expect(session.questionOrder.length).toBe(QUESTION_IDS.length);
    expect(new Set(session.questionOrder).size).toBe(QUESTION_IDS.length);
    // 同一 seed 再洗一次會得到同樣順序（重新整理不變）
    expect(seededShuffle(QUESTION_IDS, session.seed)).toEqual(
      session.questionOrder
    );
  });

  it("save / load round-trip", () => {
    const session = createSession();
    session.answers["EI01"] = 4;
    session.currentIndex = 1;
    saveSession(session);
    expect(loadSession()).toEqual(session);
  });

  it("損壞的 JSON 不會讓網站崩潰，回傳 null 並清除", () => {
    window.localStorage.setItem(SESSION_KEY, "{not-json");
    expect(loadSession()).toBeNull();
    expect(window.localStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it("舊版本／schema 不符的資料被安全捨棄", () => {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ version: 0, foo: "bar" })
    );
    expect(loadSession()).toBeNull();
  });

  it("題序被竄改（缺題）時捨棄資料", () => {
    const session = createSession();
    session.questionOrder[0] = "FAKE99";
    saveSession(session);
    expect(loadSession()).toBeNull();
  });

  it("答案超出 1–5 範圍時捨棄資料", () => {
    const session = createSession();
    session.answers["EI01"] = 9;
    saveSession(session);
    expect(loadSession()).toBeNull();
  });

  it("結果 save / load round-trip 與損壞防護", () => {
    saveResult({
      version: 1,
      code: "INTJ-OC",
      scores: { EI: -42, SN: -18, TF: 25, JP: 40, AO: -12, HC: -30 },
      stability: "high",
      completedAt: new Date().toISOString(),
    });
    expect(loadResult()?.code).toBe("INTJ-OC");

    window.localStorage.setItem(RESULT_KEY, JSON.stringify({ code: "HAX" }));
    expect(loadResult()).toBeNull();
  });

  it("clearAll 清除所有測驗資料", () => {
    saveSession(createSession());
    clearAll();
    expect(loadSession()).toBeNull();
    expect(loadResult()).toBeNull();
  });
});
