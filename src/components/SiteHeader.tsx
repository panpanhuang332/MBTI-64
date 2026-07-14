import Link from "next/link";
import { getBundle } from "@/lib/i18n";
import { localeHref, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const t = getBundle(locale);
  const navItems = [
    { href: localeHref(locale, "/test"), label: t.header.nav.test },
    { href: localeHref(locale, "/types"), label: t.header.nav.types },
    {
      href: localeHref(locale, "/methodology"),
      label: t.header.nav.methodology,
    },
    { href: localeHref(locale, "/about"), label: t.header.nav.about },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-ice-deep/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4">
        <Link
          href={localeHref(locale, "/")}
          className="flex min-w-0 items-center gap-2 font-bold text-ink"
          aria-label={t.header.logoAria}
        >
          <CompassMark />
          <span className="truncate text-base sm:text-lg">{t.site.name}</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Main">
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-lg px-1.5 py-2 text-sm text-ink-soft hover:bg-ice hover:text-ink sm:px-2.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitcher
            current={locale}
            ariaLabel={t.header.localeSwitcherAria}
          />
        </div>
      </div>
    </header>
  );
}

function CompassMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="14"
        cy="14"
        r="12"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <path d="M14 5 L17 14 L14 23 L11 14 Z" fill="var(--color-amber)" />
      <circle cx="14" cy="14" r="2" fill="var(--color-ink)" />
    </svg>
  );
}
