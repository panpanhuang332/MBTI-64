# 人格座標 64（Personality Atlas 64）

免費、免註冊的繁體中文人格探索網站：以六個維度、72 題原創情境題，探索你在 2⁶ = 64 種人格組合中的位置。

> 本測驗是自我探索與個人成長工具，**不是官方 MBTI 測驗**，不提供醫療、心理診斷或人事甄選結論。結果描述的是偏好傾向，不是固定身分；人格可能隨情境、經驗與時間改變。

## 功能

- **首頁**：原創冰藍山景 SVG、六維度介紹、測驗流程、FAQ、隱私說明
- **完整測驗流程**：72 題五點量尺、一次一題、進度條、上一題／下一題、鍵盤操作（1–5、←→）、選後自動前進
- **進度保存**：每題自動寫入 localStorage（Zod schema 驗證），重新整理不遺失；題序以 session seed 固定洗牌，重整後不變
- **六維度計分引擎**：純函式、確定性、可重現（相同答案必得相同結果），含反向題、權重、標準化與偏好強度三級
- **作答穩定度**：由語意配對題計算高／中／低（不是準確率）
- **64 型結果**：16 個四字母核心人格 × 4 個表達子型（AH／AC／OH／OC）組合生成，皆為原創中文名稱與文案
- **結果頁**：六字母代碼、類型徽章、六維百分比橫條、優勢／盲點／工作／關係／壓力／成長／反思問題
- **列印／PDF 報告**：結果頁一鍵 `window.print()`，列印樣式隱藏導覽與按鈕、防卡片跨頁截斷、附來源與免責列，可直接存成 PDF
- **分享**：經驗證的 URL query 參數（防竄改、防崩潰）＋ Canvas 分享圖卡（1080×1350、1080×1080）
- **64 型圖鑑**：搜尋（代碼／中文名）、篩選（核心型／A-O／H-C），無稀有度階級
- **SEO**：title template、OG／Twitter meta、robots.txt、sitemap.xml、manifest、favicon
- **多語系**：繁中（根路徑）＋ 簡中（`/zh-CN`，OpenCC 詞彙級自動轉換）＋ 英文（`/en`，人工翻譯），含 hreflang、語言切換器；三語共 219 個靜態頁
- **類型對照**：`/compare` 把你和朋友的代碼放在一起，逐維度對照偏好差異並附「聊聊看」對話題；不打契合度分數
- **PWA 離線快取**：手寫 service worker（`public/sw.js`）——導覽 network-first（新版即時生效）、靜態資產 cache-first、核心頁面預快取，離線仍可作答與瀏覽已載入的頁面；`manifest.webmanifest` 支援安裝到主畫面
- **匿名統計（選配、預設關閉）**：設定 `NEXT_PUBLIC_ANALYTICS_ENDPOINT` 後才會以 sendBeacon 記錄極簡事件（test_started / test_completed / result_shared / compare_used ＋介面語言），無識別碼、無 cookie、無作答內容、無結果代碼，尊重 DNT；留空則完全停用
- **每型專屬 OG 圖**：build 時以 `@resvg/resvg-js` 將原創 SVG 轉成 1200×630 PNG（3 語系 × 65 張＝195 張：繁中 `/og/`、簡中 `/og/zh-CN/`、英文 `/og/en/`），社群分享每型每語系都有自己的預覽圖

## 六個維度

| 維度 | 說明 |
| --- | --- |
| E / I | 能量來源：外部互動 vs. 內在沉澱 |
| S / N | 資訊接收：具體實感 vs. 抽象直覺 |
| T / F | 決策依據：邏輯衡量 vs. 價值考量 |
| J / P | 生活節奏：計畫結構 vs. 彈性探索 |
| A / O | **本站自訂**・決策推進方式：行動推進 vs. 觀察沉思 |
| H / C | **本站自訂**・人際表達溫度：外顯溫度 vs. 沉穩內斂 |

結果代碼格式如 `INTJ-OC`、`ENFP-AH`。A/O 與 H/C 為本站自訂探索維度，非官方 MBTI 構面。

## 技術架構

- [Next.js 15](https://nextjs.org)（App Router、`output: "export"` 靜態輸出）
- TypeScript（strict mode）
- Tailwind CSS v4（design tokens 在 `src/app/globals.css` 的 `@theme`）
- Zod（localStorage schema 驗證）
- Vitest + Testing Library（單元／元件測試）
- Playwright（E2E 流程測試）
- 無後端、無資料庫、無外部 API：所有核心功能在瀏覽器本機完成

### 重要目錄

```
src/
  app/                 頁面（/、/test、/test/questions、/test/calculating、
                       /result、/types、/types/[code]、/methodology、
                       /about、/privacy、/terms）
  components/          UI 元件（QuestionFlow、ResultView、TypesExplorer…）
  lib/
    questions.ts       72 題原創題庫
    validate-questions.ts  題庫驗證器
    scoring.ts         計分引擎（轉換、標準化、代碼、穩定度）
    profiles/
      cores.ts         16 個核心人格內容
      subtypes.ts      4 個表達子型內容
      index.ts         64 型組合生成與資料驗證
    storage.ts         versioned localStorage schema（Zod）
    result-url.ts      分享網址編碼／驗證
    share-card.ts      Canvas 分享圖卡
scripts/
  validate-data.ts     build 前自動執行的資料驗證
  serve-out.mjs        零依賴靜態伺服器（E2E／本機預覽）
e2e/                   Playwright 測試
```

## 安裝與開發

需求：Node.js 20+（建議 22）。

```bash
npm install
npm run dev        # 開發伺服器 http://localhost:3000
```

## 測試

```bash
npm run lint       # ESLint
npm run test       # 資料驗證 + Vitest 單元／元件測試
npm run test:e2e   # Playwright E2E（會自動 build 並啟動靜態伺服器）
```

E2E 需要 Playwright 的 Chromium。若環境已預裝瀏覽器，可用環境變數指定執行檔，避免重新下載：

```bash
PW_CHROMIUM_PATH=/path/to/chromium npm run test:e2e
# 否則先執行 npx playwright install chromium
```

## 建置

```bash
npm run build      # prebuild 會自動執行資料驗證 + OG 圖生成
```

### OG 圖與字型

`npm run generate-og` 會把 `src/lib/og-image.ts` 的 SVG 轉成 `public/og/*.png`（已 gitignore，build 時重新生成）。算圖字型是 `assets/fonts/` 內的 Noto Sans TC **子集**（SIL OFL 1.1，約 76KB，只在 build 時使用、不會送到瀏覽器）。若修改了站名、類型名稱或代表語出現新字元，generate-og 會直接讓 build 失敗並提示執行：

```bash
bash scripts/subset-og-font.sh   # 需要 python3 + fonttools（pip install fonttools）
```

輸出為純靜態網站（`out/`），共 81 頁（含 64 個類型詳情頁）。本機預覽：

```bash
node scripts/serve-out.mjs 4173
```

## 部署

### Vercel

1. 將 repo 匯入 Vercel，框架選 Next.js（零設定即可）。
2. 在專案設定加上環境變數 `NEXT_PUBLIC_SITE_URL=https://你的網域`。
3. 部署。因為是 `output: "export"`，也可以改用任何靜態主機。

### Netlify

已附 `netlify.toml`（build command `npm run build`、publish `out`）。匯入 repo 後設定 `NEXT_PUBLIC_SITE_URL` 即可。

### 其他靜態主機

`npm run build` 之後把 `out/` 上傳到任何靜態空間（GitHub Pages、Cloudflare Pages…）。

## 如何修改題庫

編輯 `src/lib/questions.ts`。每題結構見 `src/lib/types.ts` 的 `Question`。規則（由 `npm run validate-data` 強制檢查）：

- 總數 72 題、每維度恰 12 題、ID 唯一
- `direction` 只能是 `1`（同意偏第一字母）或 `-1`（反向計分）
- `weight` 介於 0.5–2
- 每維度至少 3 題反向題、2 組配對題（`pairId` 恰好兩題一組、同維度）、3 題情境題（work/stress/decision）

改完執行 `npm run test` 確認驗證與計分測試通過。**多語系注意**：英文題目文案在 `src/lib/i18n/en/questions.ts`（缺翻譯會讓 validate-data 失敗）；簡中執行 `npm run generate-zh-cn` 重新生成。

## 如何修改 64 型內容

- 16 個核心人格：`src/lib/profiles/cores.ts`
- 4 個表達子型：`src/lib/profiles/subtypes.ts`
- 64 型 = 核心 × 子型，自動組合（`src/lib/profiles/index.ts`），不需要手寫 64 篇

欄位完整性由 `validateProfiles()` 檢查（缺欄位、名稱重複都會讓 build 失敗）。文案語氣規範見 `CONTENT_GUIDE.md`。

## 多語系

- 繁中 canonical 文案：`src/lib/i18n/canonical.ts`（UI 與頁面）＋既有資料檔（題庫/類型）
- 英文：`src/lib/i18n/en/`（結構必須與 canonical 一致，缺漏會讓 build 失敗）
- 簡中：`npm run generate-zh-cn` 由 OpenCC（twp→cn 詞彙級）自動生成 `zh-cn.generated.json`，特例修正表在 `scripts/generate-zh-cn.ts` 的 `FIXUPS`
- 路由：zh-TW 在根路徑、其他語系在 `/zh-CN`、`/en` 前綴（`src/app/[locale]/`）

## 如何變更品牌

1. `src/lib/site.ts`：站名、副標、網址、描述
2. `src/app/globals.css`：`@theme` 色彩 tokens
3. `src/app/icon.svg`：favicon
4. `src/components/SiteHeader.tsx` / `HeroScene.tsx`：Logo 與首頁場景

## PWA

- Service worker 只在正式建置註冊（開發模式停用）；改版時調整 `public/sw.js` 的 `CACHE_VERSION` 即可讓舊快取在 activate 時被清除
- 導覽請求採 network-first，部署新版後使用者下一次連線瀏覽即取得新內容

## 免責聲明

- 本測驗不是官方 MBTI 測驗，與任何官方測驗機構無關；A/O、H/C 為本站自訂探索維度。
- 題庫未經學術信效度驗證，不宣稱任何準確率，不提供醫療、心理診斷或人事甄選結論。
- 請勿將結果用於招募、保險、醫療或任何評選決策。
- 所有作答資料僅保存在使用者瀏覽器，本站不收集個資。

其他文件：計分細節見 [SCORING.md](./SCORING.md)、視覺設計見 [DESIGN_NOTES.md](./DESIGN_NOTES.md)、內容規範見 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。
