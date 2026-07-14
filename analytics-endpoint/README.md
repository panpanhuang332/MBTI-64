# 匿名統計端點（Cloudflare Workers + KV 參考實作）

與前端 `src/lib/analytics.ts` 成對的極簡事件計數器。**選配**：不部署它，網站完全正常運作（統計預設關閉）。

## 它保存什麼

只有「日期 × 事件 × 語系」的計數器，例如：

```
c:2026-07-14:test_started:zh-TW = 42
c:2026-07-14:test_completed:zh-TW = 31
```

- 事件白名單：`test_started`、`test_completed`、`result_shared`、`compare_used`
- 語系白名單：`zh-TW`、`zh-CN`、`en`
- payload 欄位必須恰好是 `{event, locale, v}`，多任何欄位直接拒絕
- 不記錄 IP、User-Agent、Cookie 或任何識別資訊

## 部署

```bash
cd analytics-endpoint
npx wrangler kv namespace create EVENTS   # 把 id 填入 wrangler.toml
npx wrangler secret put STATS_TOKEN       # /stats 查詢權杖（自訂一段隨機字串）
# 編輯 wrangler.toml 的 ALLOWED_ORIGIN 為你的網站網域
npx wrangler deploy
```

然後在網站的部署平台設定：

```
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://pa64-analytics.<你的帳號>.workers.dev/
```

## 查詢統計

```bash
curl "https://pa64-analytics.<你的帳號>.workers.dev/stats?token=＜STATS_TOKEN＞"
```

回傳：

```json
{
  "totals": { "test_started": 42, "test_completed": 31 },
  "byDay": { "2026-07-14": { "test_started": { "zh-TW": 40, "en": 2 } } },
  "completionRate": 0.738
}
```

未設定 `STATS_TOKEN` 時 `/stats` 一律回 404（等於停用查詢介面）。

## 已知限制

- KV 沒有原子遞增：高併發下 read-modify-write 可能少算幾筆。對「了解完測率量級」足夠；需要精確計數請改用 Durable Objects。
- 計數永久保存於 KV；若要自動過期，可在 `put` 加上 `expirationTtl`。

## 測試

Worker 的單元測試包含在專案的 `npm run test`（`analytics-endpoint/worker.test.ts`，以記憶體 KV 替身驗證白名單、CORS、計數與彙總）。
