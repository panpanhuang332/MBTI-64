# 視覺設計說明（DESIGN_NOTES.md）

## 視覺概念

主題是「探索地圖上的座標」：冰藍山景、星圖、羅盤、營火旁聚集的旅人。整體追求清爽、可信、帶探索感——適合成年人的自我探索工具，保留輕度遊戲化（類型徽章、進度條、過場動畫），但避免廉價心理測驗感與過度卡通。

## 色彩

Design tokens 定義於 `src/app/globals.css` 的 Tailwind v4 `@theme`：

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-ink` | `#0e4a5a` | 深藍綠：主標與核心文字 |
| `--color-ink-deep` | `#093542` | 更深的標題／深色區塊背景 |
| `--color-ink-soft` | `#2d6b7d` | 內文次強調 |
| `--color-ice` | `#eaf4fa` | 冰藍背景 |
| `--color-ice-deep` | `#cfe6f2` | 山景、邊框 |
| `--color-ice-mist` | `#b3d7e8` | 遠山、星點 |
| `--color-amber` | `#f2a93b` | 暖黃琥珀：主要 CTA、進度、傾向指示 |
| `--color-amber-deep` | `#d98f1f` | CTA hover、focus ring |
| `--color-mist` | `#5b7280` | 次要資訊 |
| `--color-cloud` | `#f4f8fb` | 淺色卡片背景 |

文字色與背景維持 WCAG AA 以上對比（ink 系列對白色背景約 7:1 以上；amber CTA 上使用深色文字）。

## 字型

僅使用系統內建繁體中文字型堆疊（PingFang TC → Noto Sans TC → Microsoft JhengHei → 系統 sans-serif），不內嵌任何字型檔，避免授權問題並加快載入。

## 元件

- `SiteHeader` / `SiteFooter`：簡潔導覽＋免責聲明
- `HeroScene`：首頁原創 SVG 場景（山、星圖、羅盤、營火、抽象旅人）
- `QuestionFlow`：單題卡片、五點量尺、進度條、前後導覽
- `DimensionBars`：六維雙向橫條（中線＋琥珀／藍綠指示）
- `TypeEmblem`：依代碼以固定規則生成的幾何徽章（64 個各不相同、可重現）
- `TypesExplorer`：搜尋＋三組篩選＋卡片格線
- `CalculatingScreen`：羅盤脈動過場（誠實標示為本地計算）

## 響應式策略

手機優先。內容容器 `max-w-3xl`（閱讀頁）／`max-w-5xl`（清單頁）；圖鑑卡片 1 → 2 → 3 欄（`sm` / `lg` 斷點）；首屏在手機上即可看到「開始測驗」CTA。所有觸控目標最小 44px（按鈕統一 `min-h-11`/`min-h-12`，即 44–48px）。

## 無障礙設計

- 語意化 HTML：`header/nav/main/footer/fieldset/legend`、正確的標題層級
- 鍵盤操作：作答頁支援 1–5 選答、←→ 移動；所有互動元素可 Tab 到達
- `:focus-visible` 琥珀色 3px focus ring
- `aria-label`／`aria-pressed`／`aria-live`（進度）／`role="progressbar"`／`role="alert"`（缺答提示）
- `prefers-reduced-motion: reduce` 時關閉所有動畫
- SVG 場景與徽章提供 `role="img"` ＋ 中文 `aria-label`；裝飾性圖形標記 `aria-hidden`

## 與參考網站的差異、如何避免直接複製

參考截圖僅作為「版面節奏」參考（大面積留白、置中 Hero、清楚 CTA）。以下皆為原創：

- 品牌名稱「人格座標 64 / Personality Atlas 64」與 Logo（羅盤標記）
- 所有插圖：純手寫 SVG（山景、營火、旅人、徽章），無任何下載素材
- 64 型命名系統：4 個子型以自然地景命名（晨光／稜線／湖岸／深林），16 核心以「探索者職能」命名（星圖測繪者、磐石整備者…），不使用任何動物映射
- 題目與結果文案全部原創編寫
- 不使用準確率、使用人數、名人案例、稀有度排名等元素
