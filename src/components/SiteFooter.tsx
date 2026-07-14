import Link from "next/link";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ice-deep/60 bg-cloud">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-ink">
              {SITE_NAME}
              <span className="ml-2 text-xs font-normal text-mist">
                {SITE_NAME_EN}
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              自我探索與個人成長工具。本測驗不是官方 MBTI
              測驗，不提供醫療、心理診斷或人事甄選結論。
            </p>
          </div>
          <nav aria-label="網站連結" className="text-sm">
            <p className="mb-2 font-semibold text-ink">探索</p>
            <ul className="space-y-1.5 text-mist">
              <li>
                <Link href="/test" className="hover:text-ink">
                  開始測驗
                </Link>
              </li>
              <li>
                <Link href="/types" className="hover:text-ink">
                  64 型圖鑑
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-ink">
                  方法說明
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="政策連結" className="text-sm">
            <p className="mb-2 font-semibold text-ink">資訊</p>
            <ul className="space-y-1.5 text-mist">
              <li>
                <Link href="/about" className="hover:text-ink">
                  關於本站
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  隱私說明
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink">
                  使用條款
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-ice-deep/60 pt-4 text-xs leading-relaxed text-mist">
          結果描述的是偏好傾向，不是固定身分；人格可能隨情境、經驗與時間改變。A/O
          與 H/C 為本站自訂探索維度，非官方 MBTI 構面。©{" "}
          {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
