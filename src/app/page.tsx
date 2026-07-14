import Link from "next/link";
import type { Metadata } from "next";
import { HeroScene } from "@/components/HeroScene";
import { DIMENSION_META, DIMENSION_ORDER } from "@/lib/dimensions";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME}｜${SITE_TAGLINE}`,
  description:
    "以六個維度、72 題原創題目，探索你在 64 種人格組合中的位置。免費、免註冊、資料保存在你的裝置。了解你的決策與人際表達方式。",
};

const STATS = [
  { value: "6", label: "個探索維度" },
  { value: "64", label: "種人格組合" },
  { value: "8–10", label: "分鐘完成" },
];

const STEPS = [
  {
    title: "回答 72 題",
    text: "以日常情境描述作答，沒有標準答案，依平常的你選擇即可。",
  },
  {
    title: "六維度計分",
    text: "每一題只對應一個維度，系統將作答轉為六個維度上的傾向分數。",
  },
  {
    title: "取得你的座標",
    text: "產生六字母代碼與完整報告：優勢、盲點、合作方式與成長方向。",
  },
  {
    title: "探索與分享",
    text: "瀏覽 64 型圖鑑、下載分享圖卡，或把結果連結傳給朋友對照。",
  },
];

const FAQS = [
  {
    q: "這是官方 MBTI 測驗嗎？",
    a: "不是。本站是獨立的自我探索工具，前四組字母採用常見的人格偏好表達方式，A/O 與 H/C 則是本站自訂的探索維度。本站與任何官方測驗機構無關。",
  },
  {
    q: "結果會很準嗎？",
    a: "我們不宣稱準確率。百分比代表你這次作答的傾向強度，而不是人格純度或科學認證。人格會隨情境、經驗與時間改變，建議把報告當作探索起點。",
  },
  {
    q: "需要註冊或留下個資嗎？",
    a: "不需要。全程免登入，不收集姓名、Email 或任何個資。作答紀錄只保存在你自己的瀏覽器，不會上傳到伺服器。",
  },
  {
    q: "可以中途離開嗎？",
    a: "可以。每答一題都會自動保存進度，重新整理或之後再回來，都能從上次的地方繼續。",
  },
  {
    q: "結果可以用在求職或心理診斷嗎？",
    a: "不行。本測驗不提供醫療、心理診斷或人事甄選結論，請不要把結果用於任何評選或診斷用途。",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 pb-4 pt-10 text-center sm:pt-16">
          <p className="text-sm font-semibold tracking-widest text-ink-soft">
            PERSONALITY ATLAS 64
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold leading-tight text-ink-deep sm:text-5xl">
            找到你在 64 型人格
            <br className="hidden sm:block" />
            地圖上的座標
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            六個維度、72 題原創情境題，探索你的能量來源、決策推進方式與人際表達溫度。免費、免註冊，答案只留在你的裝置。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/test"
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep shadow-lg shadow-amber/30 transition hover:bg-amber-deep sm:w-auto"
            >
              開始測驗
            </Link>
            <Link
              href="/types"
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full border-2 border-ice-deep bg-white px-8 py-3 text-lg font-semibold text-ink transition hover:border-ink-soft sm:w-auto"
            >
              先看 64 型圖鑑
            </Link>
          </div>

          {/* 可信數據（不誇大） */}
          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-card bg-cloud px-3 py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-ink-deep sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-xs text-mist sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroScene />
      </section>

      {/* 為什麼不是只有四個字母 */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          為什麼不是只有四個字母？
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            四個字母能描述你的能量來源、資訊接收、決策依據與生活節奏，但兩個同為
            INTJ 的人，推進決策的節奏、對人表達溫度的方式，仍可能完全不同。
          </p>
          <p>
            所以我們加入兩個本站自訂的探索維度：
            <strong className="text-ink">A/O 決策推進方式</strong>
            ——你傾向資訊足夠就行動，還是反覆觀察比較後再出手；以及
            <strong className="text-ink">H/C 人際表達溫度</strong>
            ——你的情緒與善意是外顯可見，還是收在穩定克制的表達裡。
          </p>
          <p>
            16 × 4 = 64 種組合，讓描述更貼近「日常裡的你」。兩個新維度沒有好壞之分：慢不是優柔寡斷，克制也不是冷漠。
          </p>
        </div>
      </section>

      {/* 六個維度簡介 */}
      <section className="bg-cloud py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
            六個探索維度
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSION_ORDER.map((d) => {
              const meta = DIMENSION_META[d];
              return (
                <article
                  key={d}
                  className="rounded-card border border-ice-deep/60 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink">{meta.title}</h3>
                    <span className="rounded-full bg-ice px-2.5 py-1 text-xs font-bold text-ink-soft">
                      {meta.first} / {meta.second}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    <strong className="text-ink-soft">
                      {meta.first}・{meta.firstName}：
                    </strong>
                    {meta.firstDescription}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    <strong className="text-ink-soft">
                      {meta.second}・{meta.secondName}：
                    </strong>
                    {meta.secondDescription}
                  </p>
                  {meta.custom && (
                    <p className="mt-3 text-xs text-mist">
                      ＊本站自訂探索維度，非官方 MBTI 構面
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 測驗流程 */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          測驗怎麼進行
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-card border border-ice-deep/60 p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber font-bold text-ink-deep"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 隱私與資料說明 */}
      <section className="bg-ice py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-ink-deep sm:text-3xl">
            你的答案，只留在你的裝置
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            全程不需要帳號。作答與結果保存在你瀏覽器的
            localStorage，不上傳伺服器、不用於廣告或分析。分享結果時，連結只包含人格代碼與傾向分數，不含姓名或作答內容。
          </p>
          <Link
            href="/privacy"
            className="mt-4 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink-deep"
          >
            閱讀完整隱私說明
          </Link>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          常見問題
        </h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-card border border-ice-deep/60 bg-white p-5"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-ink-soft transition group-open:rotate-45"
                  >
                    ＋
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-mist">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 再次 CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16 text-center sm:pb-24">
        <div className="rounded-card bg-ink-deep px-6 py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            準備好探索你的座標了嗎？
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ice">
            約 8–10 分鐘、72 題，隨時可以中斷再繼續。
          </p>
          <Link
            href="/test"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-amber px-10 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
          >
            開始測驗
          </Link>
        </div>
      </section>
    </>
  );
}
