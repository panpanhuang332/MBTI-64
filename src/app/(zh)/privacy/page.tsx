import type { Metadata } from "next";
import { PrivacyView } from "@/views/InfoViews";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/privacy", t.meta.privacy);

export default function Page() {
  return <PrivacyView locale="zh-TW" />;
}
