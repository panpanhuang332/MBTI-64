import { TypesExplorer } from "@/components/TypesExplorer";
import { getBundle } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";

export function TypesView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {t.types.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">
        {t.types.lead}
      </p>
      <div className="mt-8">
        <TypesExplorer locale={locale} />
      </div>
    </div>
  );
}
