import Link from "next/link";
import { DIMENSION_ORDER } from "@/lib/dimensions";
import { getBundle } from "@/lib/i18n";
import { fmt, localeHref, type Locale } from "@/lib/i18n/locales";

/** 方法說明、關於、隱私、條款：資料驅動的靜態內容頁 */

export function MethodologyView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  const m = t.methodology;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {m.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">{m.lead}</p>

      <Section title={m.dimsTitle}>
        <div className="space-y-4">
          {DIMENSION_ORDER.map((d) => {
            const meta = t.dimensions[d];
            return (
              <div
                key={d}
                className="rounded-card border border-ice-deep/60 p-4"
              >
                <h3 className="font-bold text-ink">
                  {meta.first}/{meta.second}・{meta.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  <strong>
                    {meta.first}（{meta.firstName}）：
                  </strong>
                  {meta.firstDescription}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mist">
                  <strong>
                    {meta.second}（{meta.secondName}）：
                  </strong>
                  {meta.secondDescription}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-card bg-amber-soft/40 p-4 text-sm leading-relaxed text-ink">
          {m.customNote}
        </p>
      </Section>

      <Section title={m.scoringTitle}>
        <p>{m.scoringP1}</p>
        <p className="mt-3">{m.scoringP2}</p>
      </Section>

      <Section title={m.percentTitle}>
        <p>{m.percentP1}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {m.percentList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={m.stabilityTitle}>
        <p>{m.stabilityP1}</p>
      </Section>

      <Section title={m.labelTitle}>
        <p>{m.labelP1}</p>
      </Section>

      <Section title={m.diffTitle}>
        <p>{m.diffP1}</p>
      </Section>

      <Section title={m.limitsTitle}>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {m.limitsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={m.privacyTitle}>
        <p>
          {m.privacyP1}
          <Link
            href={localeHref(locale, "/privacy")}
            className="mx-1 font-semibold text-ink underline underline-offset-4"
          >
            {m.privacyLink}
          </Link>
          。
        </p>
      </Section>
    </div>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  const a = t.about;
  const vars = { siteName: t.site.name, siteNameEn: t.site.nameEn };
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {fmt(a.title, vars)}
      </h1>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft">
        {a.paragraphs.map((p, i) => (
          <p key={i}>
            {fmt(p, vars)}
            {i === a.paragraphs.length - 1 && (
              <>
                {" "}
                <Link
                  href={localeHref(locale, "/methodology")}
                  className="font-semibold text-ink underline underline-offset-4"
                >
                  {a.methodologyLink}
                </Link>
              </>
            )}
          </p>
        ))}
      </div>

      <div className="mt-10 rounded-card bg-cloud p-6 text-sm leading-relaxed text-mist">
        <h2 className="font-bold text-ink">{a.statementTitle}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {a.statements.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  const p = t.privacy;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {p.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">{p.lead}</p>
      <div className="mt-8 space-y-4">
        {p.points.map((point) => (
          <section
            key={point.title}
            className="rounded-card border border-ice-deep/60 p-5"
          >
            <h2 className="font-bold text-ink">{point.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {point.text}
            </p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-mist">{p.footnote}</p>
    </div>
  );
}

export function TermsView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  const vars = { siteName: t.site.name, siteNameEn: t.site.nameEn };
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {t.terms.title}
      </h1>
      <div className="mt-6 space-y-6 text-base leading-relaxed text-ink-soft">
        {t.terms.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold text-ink-deep">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="mt-2 text-sm">
                {fmt(paragraph, vars)}
              </p>
            ))}
            {section.list.length > 0 && (
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-ink-deep">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
