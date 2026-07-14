import { describe, expect, it } from "vitest";
import { decodeResultParams, encodeResultParams } from "../result-url";
import type { DimensionScores } from "../types";

const scores: DimensionScores = {
  EI: -42,
  SN: -18,
  TF: 25,
  JP: 40,
  AO: -12,
  HC: -30,
};

describe("結果分享網址", () => {
  it("encode 後可 decode 回相同結果（round-trip）", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const decoded = decodeResultParams(new URLSearchParams(encoded));
    expect(decoded).toEqual({ code: "INTJ-OC", scores, stability: "high" });
  });

  it("缺少參數時回傳 null，不崩潰", () => {
    expect(decodeResultParams(new URLSearchParams(""))).toBeNull();
    expect(decodeResultParams(new URLSearchParams("c=INTJ-OC"))).toBeNull();
  });

  it("非法代碼回傳 null", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const params = new URLSearchParams(encoded);
    params.set("c", "ZZZZ-99");
    expect(decodeResultParams(params)).toBeNull();
  });

  it("分數超出範圍回傳 null", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const params = new URLSearchParams(encoded);
    params.set("ei", "999");
    expect(decodeResultParams(params)).toBeNull();
  });

  it("分數不是整數或帶垃圾字元時回傳 null", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const params = new URLSearchParams(encoded);
    params.set("sn", "abc");
    expect(decodeResultParams(params)).toBeNull();
    params.set("sn", "1.5");
    expect(decodeResultParams(params)).toBeNull();
  });

  it("代碼與分數矛盾時回傳 null（防竄改）", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const params = new URLSearchParams(encoded);
    params.set("c", "ENTJ-AH"); // 與負的 EI 分數矛盾
    expect(decodeResultParams(params)).toBeNull();
  });

  it("非法穩定度回傳 null", () => {
    const encoded = encodeResultParams({
      code: "INTJ-OC",
      scores,
      stability: "high",
    });
    const params = new URLSearchParams(encoded);
    params.set("st", "excellent");
    expect(decodeResultParams(params)).toBeNull();
  });
});
