import type { Metadata } from "next";
import { TermsView } from "@/views/InfoViews";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/terms", t.meta.terms);

export default function Page() {
  return <TermsView locale="zh-TW" />;
}
