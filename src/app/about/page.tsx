import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/site";

export const metadata: Metadata = {
  title: "關於本站",
  description:
    "人格座標 64 是一個免費的繁體中文自我探索工具，以六個維度與 64 種組合幫助你理解自己的偏好傾向。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        關於 {SITE_NAME}
      </h1>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          {SITE_NAME}（{SITE_NAME_EN}）是一個免費、免註冊的繁體中文人格探索網站。我們相信，理解自己的偏好——能量從哪裡來、如何接收資訊、如何做決定、以什麼節奏生活、如何推進行動、如何表達溫度——是自我成長的起點。
        </p>
        <p>
          在常見的四組偏好之外，我們加入了兩個自訂探索維度：A/O
          決策推進方式與 H/C 人際表達溫度，形成 2⁶ = 64
          種組合。這不是要把人分得更細，而是想更貼近「日常裡的你」：同樣的四個字母，行動節奏與表達方式不同的人，樣貌可以非常不同。
        </p>
        <p>
          本站的定位是
          <strong className="text-ink">自我探索與個人成長工具</strong>
          ，不是心理疾病診斷工具。我們刻意不做的事：不宣稱準確率、不引用不存在的使用人數、不把任何類型描述成更聰明或更成功、不顯示沒有真實統計依據的人口比例、不收集你的個資。
        </p>
        <p>
          測驗的計分方式完全透明，歡迎閱讀
          <Link
            href="/methodology"
            className="mx-1 font-semibold text-ink underline underline-offset-4"
          >
            方法說明
          </Link>
          了解每一分是怎麼算出來的。
        </p>
      </div>

      <div className="mt-10 rounded-card bg-cloud p-6 text-sm leading-relaxed text-mist">
        <h2 className="font-bold text-ink">聲明</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>本測驗不是官方 MBTI 測驗，與任何官方測驗機構無關。</li>
          <li>不提供醫療、心理診斷或人事甄選結論。</li>
          <li>結果描述的是偏好傾向，不是固定身分。</li>
          <li>人格可能隨情境、經驗與時間改變。</li>
        </ul>
      </div>
    </div>
  );
}
