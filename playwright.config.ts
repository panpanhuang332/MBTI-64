import { defineConfig, devices } from "@playwright/test";

/**
 * E2E 測試：對 `next build` 的靜態輸出（out/）執行，
 * 與正式部署環境一致。執行 `npm run test:e2e` 會先 build 再啟動靜態伺服器。
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  timeout: 120_000,
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    // 部分環境（如 CI 容器）預裝 Chromium 於固定路徑，避免重新下載
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : undefined,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && node scripts/serve-out.mjs 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
