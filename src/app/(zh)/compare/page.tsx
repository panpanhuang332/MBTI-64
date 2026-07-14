import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareView } from "@/components/CompareView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata(
  "zh-TW",
  "/compare",
  t.meta.compare
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-mist" />
      }
    >
      <CompareView locale="zh-TW" />
    </Suspense>
  );
}
