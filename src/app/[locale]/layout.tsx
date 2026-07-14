import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LangSetter } from "@/components/LangSetter";
import {
  HTML_LANG,
  PREFIX_LOCALES,
  isLocale,
  type Locale,
} from "@/lib/i18n/locales";

/** 前綴語系：/zh-CN 與 /en（zh-TW 在根路徑） */
export function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "zh-TW") notFound();
  const l = locale as Locale;
  return (
    <>
      <LangSetter lang={HTML_LANG[l]} />
      <SiteHeader locale={l} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={l} />
    </>
  );
}
