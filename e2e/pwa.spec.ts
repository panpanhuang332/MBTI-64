import { expect, test } from "@playwright/test";

test.describe("PWA 離線快取", () => {
  test("service worker 註冊成功並預快取核心頁面", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(
      () => navigator.serviceWorker?.controller !== null,
      undefined,
      { timeout: 15_000 }
    );
    const cachedUrls = await page.evaluate(async () => {
      const keys = await caches.keys();
      const urls: string[] = [];
      for (const key of keys) {
        const cache = await caches.open(key);
        for (const request of await cache.keys()) {
          urls.push(new URL(request.url).pathname);
        }
      }
      return urls;
    });
    expect(cachedUrls).toContain("/");
    expect(cachedUrls).toContain("/test");
    expect(cachedUrls).toContain("/types");
  });

  test("離線時仍可瀏覽已快取的頁面", async ({ page, context }) => {
    // 先上線載入，讓 SW 安裝並預快取
    await page.goto("/");
    await page.waitForFunction(
      () => navigator.serviceWorker?.controller !== null,
      undefined,
      { timeout: 15_000 }
    );

    await context.setOffline(true);

    // 已預快取的頁面離線可用
    await page.goto("/types");
    await expect(page.getByText("顯示 64 / 64 型")).toBeVisible();

    await page.goto("/test");
    await expect(
      page.getByRole("button", { name: "開始測驗" })
    ).toBeVisible();

    await context.setOffline(false);
  });

  test("manifest 可存取且包含 PWA 必要欄位", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.ok()).toBe(true);
    const manifest = await response.json();
    expect(manifest.name).toContain("人格座標 64");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThan(0);
  });
});
