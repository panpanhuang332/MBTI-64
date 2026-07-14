import Link from "next/link";
import { getBundle } from "@/lib/i18n";
import { localeHref, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export function SiteFooter({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const t = getBundle(locale);
  return (
    <footer className="no-print border-t border-ice-deep/60 bg-cloud">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-ink">
              {t.site.name}
              {t.site.nameEn !== t.site.name && (
                <span className="ml-2 text-xs font-normal text-mist">
                  {t.site.nameEn}
                </span>
              )}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {t.footer.blurb}
            </p>
          </div>
          <nav aria-label="Explore" className="text-sm">
            <p className="mb-2 font-semibold text-ink">
              {t.footer.exploreTitle}
            </p>
            <ul className="space-y-1.5 text-mist">
              <li>
                <Link
                  href={localeHref(locale, "/test")}
                  className="hover:text-ink"
                >
                  {t.footer.links.test}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/types")}
                  className="hover:text-ink"
                >
                  {t.footer.links.types}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/compare")}
                  className="hover:text-ink"
                >
                  {t.footer.links.compare}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/methodology")}
                  className="hover:text-ink"
                >
                  {t.footer.links.methodology}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Info" className="text-sm">
            <p className="mb-2 font-semibold text-ink">{t.footer.infoTitle}</p>
            <ul className="space-y-1.5 text-mist">
              <li>
                <Link
                  href={localeHref(locale, "/about")}
                  className="hover:text-ink"
                >
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/privacy")}
                  className="hover:text-ink"
                >
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/terms")}
                  className="hover:text-ink"
                >
                  {t.footer.links.terms}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-ice-deep/60 pt-4 text-xs leading-relaxed text-mist">
          {t.footer.smallPrint} © {new Date().getFullYear()} {t.site.name}
        </p>
      </div>
    </footer>
  );
}
