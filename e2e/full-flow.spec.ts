import { expect, test } from "@playwright/test";

const TOTAL = 72;
const CODE_RE = /^[EI][SN][TF][JP]-[AO][HC]$/;

test.describe("完整測驗流程", () => {
  test("首頁 → 測驗說明 → 完成 72 題 → 結果頁 → 分享與重測", async ({
    page,
    browser,
  }) => {
    // 1. 首頁能進入測驗
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toContainText("64 型人格");
    await page.getByRole("link", { name: "開始測驗" }).first().click();
    await expect(page).toHaveURL(/\/test$/);
    await page.getByRole("button", { name: "開始測驗" }).click();
    await expect(page).toHaveURL(/\/test\/questions/);

    // 2. 可以回答題目（點擊選項）
    await expect(page.getByText(/第\s*1\s*\/\s*72 題/)).toBeVisible();
    await page.getByRole("button", { name: /同意/ }).first().waitFor();
    await page.getByRole("button", { name: "同意", exact: true }).click();
    await expect(page.getByText(/第\s*2\s*\/\s*72 題/)).toBeVisible();

    // 3. 重新整理後進度保留（題序與進度不變）
    const questionBefore = await page
      .locator("h1")
      .first()
      .textContent();
    await page.reload();
    await expect(page.getByText(/第\s*2\s*\/\s*72 題/)).toBeVisible();
    const questionAfter = await page.locator("h1").first().textContent();
    expect(questionAfter).toBe(questionBefore);

    // 4. 可以返回上一題修改
    await page.getByRole("button", { name: "← 上一題" }).click();
    await expect(page.getByText(/第\s*1\s*\/\s*72 題/)).toBeVisible();
    // 原本選 4，改選 2
    await expect(
      page.getByRole("button", { name: "同意", exact: true })
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "不同意", exact: true }).click();
    await expect(page.getByText(/第\s*2\s*\/\s*72 題/)).toBeVisible();

    // 5. 用鍵盤完成其餘題目（1–5 循環作答）
    for (let i = 2; i <= TOTAL; i++) {
      await expect(page.getByText(new RegExp(`第\\s*${i}\\s*/\\s*72 題`))).toBeVisible();
      await page.keyboard.press(String(((i - 1) % 5) + 1));
      // 等待自動前進
      if (i < TOTAL) {
        await expect(
          page.getByText(new RegExp(`第\\s*${i + 1}\\s*/\\s*72 題`))
        ).toBeVisible({ timeout: 5000 });
      }
    }

    // 6. 完成後經過計算頁進入結果頁，顯示合法人格代碼
    await page.waitForURL(/\/result\?/, { timeout: 15_000 });
    const code = (await page.getByTestId("result-code").textContent())?.trim();
    expect(code).toMatch(CODE_RE);
    await expect(page.getByText("六維度傾向")).toBeVisible();
    await expect(page.getByText(/作答穩定度：(高|中|低)/)).toBeVisible();

    // 7. 分享網址重新開啟後結果相同（無 localStorage 的新分頁）
    const shareUrl = page.url();
    const freshContext = await browser.newContext();
    const freshPage = await freshContext.newPage();
    await freshPage.goto(shareUrl);
    const sharedCode = (
      await freshPage.getByTestId("result-code").textContent()
    )?.trim();
    expect(sharedCode).toBe(code);
    await freshContext.close();

    // 8. 可以重新測驗
    await page.getByRole("button", { name: "重新測驗" }).click();
    await expect(page).toHaveURL(/\/test$/);
    await expect(
      page.getByRole("button", { name: "開始測驗" })
    ).toBeVisible();
  });
});

test.describe("結果頁防護", () => {
  test("無效結果網址不會崩潰，顯示友善錯誤", async ({ page }) => {
    await page.goto("/result?c=HAXX-99&ei=abc");
    await expect(page.getByText("找不到有效的測驗結果")).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "開始測驗" })
    ).toBeVisible();
  });

  test("代碼與分數矛盾的網址被拒絕", async ({ page }) => {
    // EI 分數為正（偏 E）卻宣稱 I 開頭
    await page.goto(
      "/result?c=INTJ-OC&ei=50&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await expect(page.getByText("找不到有效的測驗結果")).toBeVisible();
  });

  test("合法分享網址直接顯示結果", async ({ page }) => {
    await page.goto(
      "/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high"
    );
    await expect(page.getByTestId("result-code")).toHaveText("INTJ-OC");
    await expect(page.getByText("深林・星圖測繪者")).toBeVisible();
  });
});

test.describe("64 型圖鑑", () => {
  test("可以瀏覽、篩選、搜尋並進入詳情", async ({ page }) => {
    await page.goto("/types");
    await expect(page.getByText("顯示 64 / 64 型")).toBeVisible();

    // 篩選 A/O
    await page.getByLabel("決策推進（A/O）").selectOption("O");
    await expect(page.getByText("顯示 32 / 64 型")).toBeVisible();

    // 搜尋代碼
    await page.getByLabel("搜尋代碼或中文名稱").fill("INTJ-OC");
    await expect(page.getByText("顯示 1 / 64 型")).toBeVisible();

    // 進入詳情
    await page.getByRole("link", { name: /INTJ-OC/ }).click();
    await expect(page).toHaveURL(/\/types\/INTJ-OC/);
    await expect(
      page.getByRole("heading", { name: "深林・星圖測繪者" })
    ).toBeVisible();
    await expect(page.getByText("類型摘要")).toBeVisible();
  });

  test("64 個類型詳情頁皆為預先生成的合法路徑（抽查）", async ({ page }) => {
    for (const code of ["ESTJ-AH", "INFP-OC", "ISTP-AC", "ENFJ-OH"]) {
      await page.goto(`/types/${code}`);
      await expect(page.getByText(code, { exact: true }).first()).toBeVisible();
    }
  });
});
