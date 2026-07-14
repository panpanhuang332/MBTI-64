import { Suspense } from "react";
import type { Metadata } from "next";
import { CompareView } from "@/components/CompareView";

export const metadata: Metadata = {
  title: "類型對照",
  description:
    "把你和朋友的 64 型人格代碼放在一起，逐一對照六個維度的偏好差異，開啟理解彼此的對話。",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-mist">
          <p>載入中…</p>
        </div>
      }
    >
      <CompareView />
    </Suspense>
  );
}
