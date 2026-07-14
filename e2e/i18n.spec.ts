import { expect, test } from "@playwright/test";

test.describe("多語系", () => {
  test("英文首頁載入並可進入測驗說明", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "map of 64 personalities"
    );
    await page
      .getByRole("main")
      .getByRole("link", { name: "Take the Test" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/en\/test$/);
    await expect(
      page.getByRole("button", { name: "Start the Test" })
    ).toBeVisible();
  });

  test("簡中首頁與圖鑑", async ({ page }) => {
    await page.goto("/zh-CN");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "地图上的坐标"
    );
    await page.goto("/zh-CN/types");
    await expect(page.getByText("显示 64 / 64 型")).toBeVisible();
  });

  test("英文類型詳情頁", async ({ page }) => {
    await page.goto("/en/types/INTJ-OC");
    await expect(
      page.getByRole("heading", { name: "Deepwood Starchart Drafter" })
    ).toBeVisible();
    await expect(page.getByText("Type Summary")).toBeVisible();
  });

  test("英文結果頁（分享參數）", async ({ page }) => {
    await page.goto(
      "/en/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await expect(page.getByTestId("result-code")).toHaveText("INTJ-OC");
    await expect(page.getByText("Answer consistency: High")).toBeVisible();
    await expect(page.getByText("Six-Dimension Tendencies")).toBeVisible();
  });

  test("語言切換器：繁 → EN → 繁 保持相同頁面", async ({ page }) => {
    await page.goto("/types/INTJ-OC");
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/types\/INTJ-OC$/);
    await expect(
      page.getByRole("heading", { name: "Deepwood Starchart Drafter" })
    ).toBeVisible();
    await page.getByRole("link", { name: "繁體中文" }).click();
    await expect(page).toHaveURL(/\/types\/INTJ-OC$/);
    await expect(
      page.getByRole("heading", { name: "深林・星圖測繪者" })
    ).toBeVisible();
  });

  test("英文測驗流程：回答第一題並保存進度", async ({ page }) => {
    await page.goto("/en/test/questions");
    await expect(page.getByText(/Question\s*1\s*of 72/)).toBeVisible();
    await page.getByRole("button", { name: "Agree", exact: true }).click();
    await expect(page.getByText(/Question\s*2\s*of 72/)).toBeVisible();
    // 英文語系下的 localStorage 與繁中共用（同一份題庫作答）
    await page.goto("/test/questions");
    await expect(page.getByText(/第\s*2\s*\/\s*72 題/)).toBeVisible();
  });

  test("非法語系路徑回傳 404", async ({ page }) => {
    const response = await page.goto("/fr/types");
    expect(response?.status()).toBe(404);
  });
});
