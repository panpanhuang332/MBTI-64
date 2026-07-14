import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionFlow } from "@/components/QuestionFlow";
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
  return pageMetadata(l, "/test/questions", getBundle(l).meta.questions, {
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
      <QuestionFlow locale={locale as Locale} />
    </Suspense>
  );
}
