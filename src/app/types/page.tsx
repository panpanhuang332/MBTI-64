import type { Metadata } from "next";
import { TypesExplorer } from "@/components/TypesExplorer";

export const metadata: Metadata = {
  title: "64 型人格圖鑑",
  description:
    "瀏覽全部 64 種人格組合：16 個核心人格 × 4 個表達子型。按核心類型、決策推進方式與表達溫度篩選，或搜尋代碼與名稱。",
  alternates: { canonical: "/types" },
};

export default function TypesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        64 型人格圖鑑
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">
        16 個四字母核心人格 × 4
        個表達子型，構成一張探索地圖。每一型都是一種偏好組合，沒有高低之分，也沒有稀有度排名。
      </p>
      <div className="mt-8">
        <TypesExplorer />
      </div>
    </div>
  );
}
