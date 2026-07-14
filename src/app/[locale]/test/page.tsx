import type { Metadata } from "next";
import { TestIntroView } from "@/views/TestIntroView";
import { getBundle } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return pageMetadata(l, "/test", getBundle(l).meta.test);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <TestIntroView locale={locale as Locale} />
  );
}
