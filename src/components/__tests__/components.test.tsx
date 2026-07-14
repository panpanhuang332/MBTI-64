// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DimensionBars } from "../DimensionBars";
import { TypeEmblem } from "../TypeEmblem";
import { TestIntroActions } from "../TestIntroActions";
import { allCodes } from "@/lib/scoring";
import type { DimensionScores } from "@/lib/types";

// next/navigation 在測試環境的替身
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

const scores: DimensionScores = {
  EI: -42,
  SN: 8,
  TF: 25,
  JP: 40,
  AO: -12,
  HC: -30,
};

describe("DimensionBars", () => {
  it("渲染六個維度與正確百分比", () => {
    render(<DimensionBars scores={scores} />);
    // EI = -42 → I 側 71%
    expect(screen.getByText(/I・內向沉澱/)).toBeTruthy();
    expect(screen.getByText(/E・外向互動 29%/)).toBeTruthy();
    // 偏好接近的提示（SN = 8）
    expect(
      screen.getAllByText(/兩側偏好接近/).length
    ).toBeGreaterThanOrEqual(1);
    // 自訂維度註記
    expect(screen.getByText(/本站自訂探索維度/)).toBeTruthy();
  });
});

describe("TypeEmblem", () => {
  it("64 個代碼都能渲染出徽章", () => {
    for (const code of allCodes()) {
      const { unmount } = render(<TypeEmblem code={code} />);
      expect(screen.getByRole("img", { name: `${code} 類型徽章` })).toBeTruthy();
      unmount();
    }
  });
});

describe("TestIntroActions", () => {
  it("沒有舊紀錄時顯示「開始測驗」", () => {
    render(<TestIntroActions />);
    expect(screen.getByRole("button", { name: "開始測驗" })).toBeTruthy();
  });
});
