"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/locales";

const LABELS: Record<Locale, string> = {
  "zh-TW": "繁",
  "zh-CN": "简",
  en: "EN",
};

const FULL_LABELS: Record<Locale, string> = {
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  en: "English",
};

export function LocaleSwitcher({
  current,
  ariaLabel,
}: {
  current: Locale;
  ariaLabel: string;
}) {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-0.5">
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={switchLocalePath(pathname, locale)}
          aria-label={FULL_LABELS[locale]}
          aria-current={locale === current ? "true" : undefined}
          className={`rounded-lg px-1.5 py-1 text-xs font-semibold sm:px-2 ${
            locale === current
              ? "bg-ink text-white"
              : "text-mist hover:bg-ice hover:text-ink"
          }`}
        >
          {LABELS[locale]}
        </Link>
      ))}
    </nav>
  );
}
