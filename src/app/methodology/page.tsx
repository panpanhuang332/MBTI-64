import type { Metadata } from "next";
import Link from "next/link";
import { DIMENSION_META, DIMENSION_ORDER } from "@/lib/dimensions";

export const metadata: Metadata = {
  title: "方法說明",
  description:
    "了解人格座標 64 的六個維度定義、計分方式、百分比與作答穩定度的意義，以及本測驗的限制與隱私原則。",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        方法說明
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">
        這一頁說明測驗如何運作、結果代表什麼、以及——同樣重要的——它不代表什麼。
      </p>

      <Section title="六個維度的定義">
        <div className="space-y-4">
          {DIMENSION_ORDER.map((d) => {
            const meta = DIMENSION_META[d];
            return (
              <div key={d} className="rounded-card border border-ice-deep/60 p-4">
                <h3 className="font-bold text-ink">
                  {meta.first}/{meta.second}・{meta.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  <strong>{meta.first}（{meta.firstName}）：</strong>
                  {meta.firstDescription}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mist">
                  <strong>{meta.second}（{meta.secondName}）：</strong>
                  {meta.secondDescription}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-card bg-amber-soft/40 p-4 text-sm leading-relaxed text-ink">
          <strong>重要：</strong>A/O（決策推進方式）與 H/C（人際表達溫度）是
          本站自訂的探索維度，不是官方 MBTI 構面。本測驗也不是官方 MBTI 測驗。
        </p>
      </Section>

      <Section title="題目如何計分">
        <p>
          共 72 題，每個維度 12 題，採五點量尺（非常不同意～非常同意）。作答值
          1–5 會轉換為 -2～+2（「不確定」= 0），再乘上該題的方向（部分題目為反向計分）與權重。每個維度分別加總後，依理論最大值標準化為
          -100～+100 的傾向分數。
        </p>
        <p className="mt-3">
          分數為正取該維度的第一個字母（E/S/T/J/A/H），為負取第二個字母。規則固定且可重現：相同答案永遠得到相同結果，不使用任何隨機數。
        </p>
      </Section>

      <Section title="百分比代表什麼">
        <p>
          結果頁的百分比（例如 E 63% / I 37%）是傾向分數換算成的比例，代表
          <strong>這次作答的傾向強度</strong>
          ，不是人格純度，更不是「準確率」。分數接近中間（±14
          以內）時，我們會標示「偏好接近」——代表你在這個維度上可能依情境靈活切換。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>0–14：偏好接近</li>
          <li>15–39：中度偏好</li>
          <li>40 以上：明顯偏好</li>
        </ul>
      </Section>

      <Section title="作答穩定度代表什麼">
        <p>
          題庫中每個維度都有語意相近或反向的「配對題」。穩定度比較這些配對題之間答案的一致程度，分為高、中、低三級。
          <strong>穩定度不是準確率</strong>
          ——它只表示你在語意相近的題目上回答是否大致一致。穩定度低可能代表你的狀態受情境影響較大，建議把報告視為探索起點，或在不同狀態下重新測驗。
        </p>
      </Section>

      <Section title="為什麼人格不能只看一個標籤">
        <p>
          六個字母是描述偏好的速記，不是把人裝進盒子的分類。同一個代碼底下，每個人的經歷、價值觀與行為仍然千差萬別；同一個人在不同的情境、階段與壓力狀態下，作答也可能改變。請把結果當成一面幫助反思的鏡子，而不是一張定義你的標籤。
        </p>
      </Section>

      <Section title="本站與正式心理測驗的差異">
        <p>
          正式的心理測量工具需要經過信效度研究、常模建立與專業審查。本站題庫為原創編寫，計分透明，但
          <strong>未經學術信效度驗證</strong>
          ，定位是自我探索與個人成長工具，而不是心理疾病診斷工具。我們不提供醫療、心理診斷或人事甄選結論，也不宣稱任何準確率或科學認證。
        </p>
      </Section>

      <Section title="測驗限制">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>結果完全依賴自我報告，會受作答當下的狀態與自我認知影響。</li>
          <li>二元字母是連續傾向的簡化，接近中間值時尤其應謹慎解讀。</li>
          <li>人格可能隨情境、經驗與時間改變，結果不是固定身分。</li>
          <li>不應將結果用於職業選擇、伴侶篩選、招募、保險或任何評選決策。</li>
        </ul>
      </Section>

      <Section title="隱私原則">
        <p>
          作答與結果只保存在你的瀏覽器（localStorage），不上傳伺服器。分享連結只包含人格代碼、六維分數與穩定度。詳見
          <Link href="/privacy" className="mx-1 font-semibold text-ink underline underline-offset-4">
            隱私說明
          </Link>
          。
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-ink-deep">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
