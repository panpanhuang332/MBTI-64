import type { Metadata } from "next";
import { MethodologyView } from "@/views/InfoViews";
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
  return pageMetadata(l, "/methodology", getBundle(l).meta.methodology);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <MethodologyView locale={locale as Locale} />
  );
}
