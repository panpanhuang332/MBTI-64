import { expect, test } from "@playwright/test";

test.describe("類型對照", () => {
  test("合法參數直接顯示對照結果", async ({ page }) => {
    await page.goto("/compare?a=INTJ-OC&b=ENFP-AH");
    const header = page.getByTestId("compare-header");
    await expect(header.getByText("INTJ-OC")).toBeVisible();
    await expect(header.getByText("ENFP-AH")).toBeVisible();
    await expect(header.getByText("深林・星圖測繪者")).toBeVisible();
    await expect(header.getByText("晨光・曠野燃想者")).toBeVisible();
    // INTJ-OC 與 ENFP-AH 只有 S/N 維度相同（都是 N）：1/6
    await expect(page.getByText("1 / 6")).toBeVisible();
    // 六個維度區塊都在
    for (const d of ["EI", "SN", "TF", "JP", "AO", "HC"]) {
      await expect(page.getByTestId(`compare-${d}`)).toBeVisible();
    }
    await expect(page.getByTestId("compare-JP").getByText("聊聊看：", { exact: false })).toBeVisible();
  });

  test("相同代碼顯示 6/6 相同", async ({ page }) => {
    await page.goto("/compare?a=ISTP-AC&b=ISTP-AC");
    await expect(page.getByText("6 / 6")).toBeVisible();
  });

  test("無效參數退回輸入表單並提示", async ({ page }) => {
    await page.goto("/compare?a=BAD!!&b=ENFP-AH");
    await expect(page.getByText("網址中的類型代碼無效或不完整")).toBeVisible();
    await expect(page.getByLabel("你的類型")).toBeVisible();
  });

  test("表單輸入代碼與分享連結後導向對照頁", async ({ page }) => {
    await page.goto("/compare");
    await page.getByLabel("你的類型").fill("intj-oc");
    await page
      .getByLabel("朋友的類型")
      .fill("https://example.com/result?c=ESFJ-OH&ei=1");
    await page.getByRole("button", { name: "開始對照" }).click();
    await expect(page).toHaveURL(/\/compare\?a=INTJ-OC&b=ESFJ-OH/);
    await expect(
      page.getByTestId("compare-header").getByText("ESFJ-OH")
    ).toBeVisible();
  });

  test("從結果頁輸入朋友代碼進入對照", async ({ page }) => {
    await page.goto(
      "/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await page
      .getByLabel("朋友的類型代碼或結果連結")
      .fill("ENFP-AH");
    await page.getByRole("button", { name: "開始對照" }).click();
    await expect(page).toHaveURL(/\/compare\?a=INTJ-OC&b=ENFP-AH/);
    await expect(page.getByText("1 / 6")).toBeVisible();
  });

  test("結果頁輸入非法代碼顯示錯誤，不導向", async ({ page }) => {
    await page.goto(
      "/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await page.getByLabel("朋友的類型代碼或結果連結").fill("not-a-code");
    await page.getByRole("button", { name: "開始對照" }).click();
    await expect(page.getByText("代碼格式不正確")).toBeVisible();
    await expect(page).toHaveURL(/\/result/);
  });
});
