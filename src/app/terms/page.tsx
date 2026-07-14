import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "使用條款",
  description: "人格座標 64 的使用條款與免責聲明。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        使用條款
      </h1>
      <div className="mt-6 space-y-6 text-base leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-lg font-bold text-ink-deep">服務性質</h2>
          <p className="mt-2">
            {SITE_NAME}
            提供免費的自我探索測驗與相關內容。本服務僅供個人自我探索與成長參考，不構成任何形式的專業建議。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-deep">免責聲明</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
            <li>
              本測驗不是官方 MBTI
              測驗，未經學術信效度驗證，不提供醫療、心理診斷或人事甄選結論。
            </li>
            <li>
              測驗結果描述的是作答當下的偏好傾向，不是固定身分，也不應作為職業、伴侶、招募、保險或任何評選決策的依據。
            </li>
            <li>
              若你正經歷心理困擾，請尋求合格的心理專業人員協助，而不是依賴本測驗。
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-deep">內容使用</h2>
          <p className="mt-2 text-sm">
            本站的題庫、類型名稱與描述文案皆為原創內容。歡迎分享結果連結與分享圖卡；未經同意請勿大量轉載或將內容用於商業用途。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-deep">服務變更</h2>
          <p className="mt-2 text-sm">
            我們可能隨時調整題庫、計分方式或內容以改善品質；調整後你的舊結果連結仍會以當時的分數呈現，但重新測驗的結果可能不同。
          </p>
        </section>
      </div>
    </div>
  );
}
