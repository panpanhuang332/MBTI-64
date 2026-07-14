import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultView } from "@/components/ResultView";
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
  return pageMetadata(l, "/result", getBundle(l).meta.result, {
    noindex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-mist" />
      }
    >
      <ResultView locale={locale as Locale} />
    </Suspense>
  );
}
