import { Suspense } from "react";
import type { Metadata } from "next";
import { ResultView } from "@/components/ResultView";

export const metadata: Metadata = {
  title: "你的測驗結果",
  description:
    "你的 64 型人格探索結果：六字母代碼、六維度傾向、優勢、盲點與成長方向。",
  robots: { index: false },
};

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-mist">
          <p>載入結果中…</p>
        </div>
      }
    >
      <ResultView />
    </Suspense>
  );
}
