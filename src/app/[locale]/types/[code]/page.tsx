import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TypeDetailView } from "@/views/TypeDetailView";
import { getBundle, getLocalizedProfile } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/locales";
import { allCodes } from "@/lib/scoring";

/** 靜態輸出：每個前綴語系 × 64 個代碼 */
export function generateStaticParams() {
  return allCodes().map((code) => ({ code }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { locale, code } = await params;
  const l = locale as Locale;
  const profile = getLocalizedProfile(code, l);
  if (!profile) return { title: getBundle(l).typeDetail.notFoundTitle };
  return pageMetadata(
    l,
    `/types/${profile.code}`,
    {
      title: `${profile.code} ${profile.name}`,
      description: `${profile.name} (${profile.code}): ${profile.core.summary.slice(0, 100)}…`,
    },
    { ogImage: `/og/${profile.code}.png` }
  );
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  const profile = getLocalizedProfile(code, locale as Locale);
  if (!profile) notFound();
  return <TypeDetailView locale={locale as Locale} code={code} />;
}
