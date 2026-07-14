import type { Metadata } from "next";
import { MethodologyView } from "@/views/InfoViews";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/methodology", t.meta.methodology);

export default function Page() {
  return <MethodologyView locale="zh-TW" />;
}
