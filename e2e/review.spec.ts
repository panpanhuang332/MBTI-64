import { expect, test } from "@playwright/test";
import { QUESTION_IDS } from "../src/lib/questions";

/** 在瀏覽器載入前注入一份完整作答的合法 session */
function completedSession() {
  const now = new Date().toISOString();
  const answers: Record<string, number> = {};
  QUESTION_IDS.forEach((id, i) => {
    answers[id] = (i % 5) + 1;
  });
  return {
    version: 1,
    sessionId: "s-e2e-review",
    seed: "e2e-review",
    startedAt: now,
    updatedAt: now,
    questionOrder: QUESTION_IDS,
    answers,
    currentIndex: QUESTION_IDS.length - 1,
    completedAt: now,
  };
}

test.describe("作答復盤", () => {
  test("沒有本機紀錄時顯示空狀態", async ({ page }) => {
    await page.goto("/review");
    await expect(page.getByText("找不到本機的作答紀錄")).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "開始測驗" })
    ).toBeVisible();
  });

  test("有完整作答時顯示 72 題、答案與傾向標記", async ({ page }) => {
    await page.addInitScript((session) => {
      window.localStorage.setItem("pa64.session.v1", JSON.stringify(session));
    }, completedSession());

    await page.goto("/review");
    await expect(page.getByTestId("review-count")).toContainText(
      "已作答 72 / 72 題"
    );
    await expect(page.getByTestId("review-item")).toHaveCount(72);
    // 反向題標記存在（每維度至少 3 題）
    expect(
      await page.getByText("反向計分題", { exact: true }).count()
    ).toBeGreaterThanOrEqual(18);
    // 中立作答（答 3）顯示中立標記
    await expect(
      page.getByText("中立，不影響此維度").first()
    ).toBeVisible();
    // 傾向標記存在
    await expect(page.getByText(/推向 [EISNTFJPAOHC]・/).first()).toBeVisible();
  });

  test("點「修改這一題」會跳到該題並可重新作答", async ({ page }) => {
    // 注意：不能用 addInitScript（每次導覽都會重跑、蓋掉編輯後的答案），
    // 改為載入後一次性注入再 reload。
    await page.goto("/review");
    await page.evaluate((session) => {
      window.localStorage.setItem("pa64.session.v1", JSON.stringify(session));
    }, completedSession());
    await page.reload();
    const firstItem = page.getByTestId("review-item").first();
    const questionText = await firstItem
      .locator("p")
      .first()
      .textContent();
    await firstItem.getByRole("button", { name: "修改這一題" }).click();

    await expect(page).toHaveURL(/\/test\/questions/);
    await expect(page.locator("h1")).toHaveText(questionText ?? "");
    // 修改答案：選「非常同意」
    await page.getByRole("button", { name: "非常同意", exact: true }).click();
    // 回到復盤確認新答案已保存
    await page.goto("/review");
    await expect(
      page.getByTestId("review-item").first().getByText("你的作答：非常同意")
    ).toBeVisible();
  });

  test("結果頁在有本機作答時顯示復盤入口", async ({ page }) => {
    await page.addInitScript((session) => {
      window.localStorage.setItem("pa64.session.v1", JSON.stringify(session));
    }, completedSession());
    await page.goto(
      "/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await page.getByRole("link", { name: "回顧我的作答" }).click();
    await expect(page).toHaveURL(/\/review/);
    await expect(page.getByTestId("review-count")).toBeVisible();
  });

  test("英文復盤頁", async ({ page }) => {
    await page.addInitScript((session) => {
      window.localStorage.setItem("pa64.session.v1", JSON.stringify(session));
    }, completedSession());
    await page.goto("/en/review");
    await expect(page.getByTestId("review-count")).toContainText(
      "72 / 72 answered"
    );
    await expect(
      page.getByText("Reverse-scored", { exact: true }).first()
    ).toBeVisible();
  });
});
