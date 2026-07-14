import type { Metadata } from "next";
import { AboutView } from "@/views/InfoViews";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/about", t.meta.about);

export default function Page() {
  return <AboutView locale="zh-TW" />;
}
