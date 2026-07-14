import type { Metadata } from "next";
import { HomeView } from "@/views/HomeView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/", t.meta.home);

export default function Page() {
  return <HomeView locale="zh-TW" />;
}
