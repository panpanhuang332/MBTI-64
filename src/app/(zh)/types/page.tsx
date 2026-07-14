import type { Metadata } from "next";
import { TypesView } from "@/views/TypesView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata("zh-TW", "/types", t.meta.types);

export default function Page() {
  return <TypesView locale="zh-TW" />;
}
