import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { DIMENSION_ORDER } from "@/lib/dimensions";
import { getBundle } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n/locales";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getBundle(locale);
  const testHref = localeHref(locale, "/test");
  const typesHref = localeHref(locale, "/types");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 pb-4 pt-10 text-center sm:pt-16">
          <p className="text-sm font-semibold tracking-widest text-ink-soft">
            {t.home.heroKicker}
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold leading-tight text-ink-deep sm:text-5xl">
            {t.home.heroTitle1}
            <br className="hidden sm:block" />
            {t.home.heroTitle2}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {t.home.heroLead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={testHref}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep shadow-lg shadow-amber/30 transition hover:bg-amber-deep sm:w-auto"
            >
              {t.home.ctaStart}
            </Link>
            <Link
              href={typesHref}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full border-2 border-ice-deep bg-white px-8 py-3 text-lg font-semibold text-ink transition hover:border-ink-soft sm:w-auto"
            >
              {t.home.ctaBrowse}
            </Link>
          </div>

          {/* 可信數據（不誇大） */}
          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4">
            {t.home.stats.map((s) => (
              <div key={s.label} className="rounded-card bg-cloud px-3 py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-ink-deep sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-xs text-mist sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroScene ariaLabel={t.home.heroAria} />
      </section>

      {/* 為什麼不是只有四個字母 */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          {t.home.whyTitle}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          {t.home.whyParagraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      {/* 六個維度簡介 */}
      <section className="bg-cloud py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
            {t.home.dimensionsTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSION_ORDER.map((d) => {
              const meta = t.dimensions[d];
              return (
                <article
                  key={d}
                  className="rounded-card border border-ice-deep/60 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink">{meta.title}</h3>
                    <span className="rounded-full bg-ice px-2.5 py-1 text-xs font-bold text-ink-soft">
                      {meta.first} / {meta.second}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    <strong className="text-ink-soft">
                      {meta.first}・{meta.firstName}：
                    </strong>
                    {meta.firstDescription}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    <strong className="text-ink-soft">
                      {meta.second}・{meta.secondName}：
                    </strong>
                    {meta.secondDescription}
                  </p>
                  {meta.custom && (
                    <p className="mt-3 text-xs text-mist">
                      {t.home.customDimensionNote}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 測驗流程 */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          {t.home.stepsTitle}
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-card border border-ice-deep/60 p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber font-bold text-ink-deep"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 隱私與資料說明 */}
      <section className="bg-ice py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-ink-deep sm:text-3xl">
            {t.home.privacyTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {t.home.privacyBody}
          </p>
          <Link
            href={localeHref(locale, "/privacy")}
            className="mt-4 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink-deep"
          >
            {t.home.privacyLink}
          </Link>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          {t.home.faqTitle}
        </h2>
        <div className="mt-8 space-y-3">
          {t.home.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-card border border-ice-deep/60 bg-white p-5"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-ink-soft transition group-open:rotate-45"
                  >
                    ＋
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-mist">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 再次 CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16 text-center sm:pb-24">
        <div className="rounded-card bg-ink-deep px-6 py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t.home.finalCtaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ice">
            {t.home.finalCtaBody}
          </p>
          <Link
            href={testHref}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-amber px-10 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
          >
            {t.home.ctaStart}
          </Link>
        </div>
      </section>
    </>
  );
}
