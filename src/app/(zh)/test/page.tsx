import type { Metadata } from "next";
import { TestIntroView } from "@/views/TestIntroView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/test", t.meta.test);

export default function Page() {
  return <TestIntroView locale="zh-TW" />;
}
