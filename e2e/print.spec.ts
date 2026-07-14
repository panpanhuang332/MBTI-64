import { expect, test } from "@playwright/test";

const RESULT_URL =
  "/result?c=INTJ-OC&ei=-42&sn=-18&tf=25&jp=40&ao=-12&hc=-30&st=high";

test.describe("列印／PDF 報告", () => {
  test("結果頁有列印按鈕且會呼叫 window.print", async ({ page }) => {
    await page.goto(RESULT_URL);
    await expect(page.getByTestId("result-code")).toHaveText("INTJ-OC");
    await page.evaluate(() => {
      (window as unknown as { __printed: boolean }).__printed = false;
      window.print = () => {
        (window as unknown as { __printed: boolean }).__printed = true;
      };
    });
    await page.getByRole("button", { name: "列印／存成 PDF" }).click();
    expect(
      await page.evaluate(
        () => (window as unknown as { __printed: boolean }).__printed
      )
    ).toBe(true);
  });

  test("列印模式：隱藏導覽與動作按鈕、保留報告內容、顯示來源列", async ({
    page,
  }) => {
    await page.goto(RESULT_URL);
    await expect(page.getByTestId("result-code")).toHaveText("INTJ-OC");
    await page.emulateMedia({ media: "print" });

    const display = (selector: string) =>
      page.$eval(selector, (el) => getComputedStyle(el).display);

    // 導覽、頁尾、動作按鈕隱藏
    expect(await display("header")).toBe("none");
    expect(await display("footer")).toBe("none");
    const copyButton = page.getByRole("button", { name: "複製分享連結" });
    await expect(copyButton).toBeHidden();

    // 報告主要內容仍在
    await expect(page.getByTestId("result-code")).toBeVisible();
    await expect(page.getByText("六維度傾向")).toBeVisible();
    await expect(page.getByText("優勢")).toBeVisible();

    // print-only 來源列在列印模式顯示
    await expect(page.getByText(/本報告列印自/)).toBeVisible();

    await page.emulateMedia({ media: "screen" });
    await expect(page.getByText(/本報告列印自/)).toBeHidden();
  });

  test("英文結果頁的列印按鈕", async ({ page }) => {
    await page.goto(`/en${RESULT_URL}`);
    await expect(
      page.getByRole("button", { name: "Print / Save as PDF" })
    ).toBeVisible();
  });
});
