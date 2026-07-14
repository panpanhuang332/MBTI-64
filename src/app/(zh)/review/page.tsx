import type { Metadata } from "next";
import { ReviewView } from "@/components/ReviewView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata(
  "zh-TW",
  "/review",
  t.meta.review,
  { noindex: true }
);

export default function Page() {
  return <ReviewView locale="zh-TW" />;
}
