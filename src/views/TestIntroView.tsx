import { TestIntroActions } from "@/components/TestIntroActions";
import { getBundle } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";

export function TestIntroView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {t.testIntro.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">
        {t.testIntro.lead}
      </p>

      <ul className="mt-8 space-y-4">
        {t.testIntro.notes.map((note) => (
          <li
            key={note.title}
            className="rounded-card border border-ice-deep/60 bg-white p-5"
          >
            <h2 className="font-bold text-ink">{note.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">
              {note.text}
            </p>
          </li>
        ))}
      </ul>

      <TestIntroActions locale={locale} />

      <p className="mt-6 text-xs leading-relaxed text-mist">
        {t.testIntro.disclaimer}
      </p>
    </div>
  );
}
