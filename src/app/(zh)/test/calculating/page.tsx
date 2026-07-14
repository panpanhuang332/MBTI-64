import type { Metadata } from "next";
import { CalculatingScreen } from "@/components/CalculatingScreen";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

const t = getBundle("zh-TW");
export const metadata: Metadata = pageMetadata(
  "zh-TW",
  "/test/calculating",
  t.meta.calculating,
  { noindex: true }
);

export default function Page() {
  return (
    <CalculatingScreen locale="zh-TW" />
  );
}
