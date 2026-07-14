import type { Metadata } from "next";
import { QuestionFlow } from "@/components/QuestionFlow";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata(
  "zh-TW",
  "/test/questions",
  t.meta.questions,
  { noindex: true }
);

export default function Page() {
  return (
    <QuestionFlow locale="zh-TW" />
  );
}
