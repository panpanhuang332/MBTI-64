import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultView } from "@/components/ResultView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata(
  "zh-TW",
  "/result",
  t.meta.result,
  { noindex: true }
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-mist" />
      }
    >
      <ResultView locale="zh-TW" />
    </Suspense>
  );
}
