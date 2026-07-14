import Link from "next/link";
import { TypeEmblem } from "@/components/TypeEmblem";
import { getBundle, getLocalizedProfile } from "@/lib/i18n";
import { fmt, localeHref, type Locale } from "@/lib/i18n/locales";

export function TypeDetailView({
  locale,
  code,
}: {
  locale: Locale;
  code: string;
}) {
  const t = getBundle(locale);
  const profile = getLocalizedProfile(code, locale);
  if (!profile) return null;
  const { core, subtype } = profile;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-mist">
        <Link href={localeHref(locale, "/types")} className="hover:text-ink">
          {t.typeDetail.breadcrumbAll}
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{profile.code}</span>
      </nav>

      <header className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="w-36 shrink-0 sm:w-44">
          <TypeEmblem
            code={profile.code}
            ariaLabel={fmt(t.typeDetail.emblemAria, { code: profile.code })}
          />
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-ink-soft">
            {profile.code}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-ink-deep sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-mist">
            {locale === "en"
              ? profile.subtitle
              : `${profile.enName}・${profile.subtitle}`}
          </p>
          <p className="mt-3 font-semibold text-ink">「{profile.motto}」</p>
        </div>
      </header>

      <section className="mt-8 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">{t.typeDetail.summaryTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {core.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">
            {fmt(t.result.subtypeLabel, {
              name: subtype.name,
              code: profile.subtypeCode,
            })}
          </strong>
          {subtype.summary}
        </p>
        <p className="mt-3 text-xs text-mist">{t.typeDetail.customNote}</p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-ice-deep/60 p-5">
          <h2 className="font-bold text-ink-deep">
            {t.typeDetail.strengthsTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
            {core.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden="true" className="text-amber-deep">
                  ◆
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-ice-deep/60 p-5">
          <h2 className="font-bold text-ink-deep">
            {t.typeDetail.blindspotsTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
            {core.blindspots.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden="true" className="text-ink-soft">
                  ◇
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 space-y-5">
        <Block title={t.typeDetail.workTitle}>
          <p>{core.workStyle}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.typeDetail.subtypeDecision, { name: subtype.name })}
            </strong>
            {subtype.decisionStyle}
          </p>
        </Block>
        <Block title={t.typeDetail.collabTitle}>
          <p>{core.collaboration}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.typeDetail.subtypeExpression, { name: subtype.name })}
            </strong>
            {subtype.socialStyle}
            {subtype.communicationStyle}
          </p>
        </Block>
        <Block title={t.typeDetail.stressTitle}>
          <p>{core.stress}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.typeDetail.subtypeStress, { name: subtype.name })}
            </strong>
            {subtype.stressStyle}
          </p>
        </Block>
        <Block title={t.typeDetail.growthTitle}>
          <p>{core.growth}</p>
        </Block>
        <Block title={t.typeDetail.misconceptionTitle}>
          <p>{core.misconception}</p>
        </Block>
        <Block title={t.typeDetail.reflectionTitle}>
          <ol className="list-decimal space-y-2 pl-5">
            {core.reflectionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </Block>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href={localeHref(locale, "/test")}
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-amber px-6 py-3 font-bold text-ink-deep transition hover:bg-amber-deep"
        >
          {t.typeDetail.ctaTest}
        </Link>
        <Link
          href={localeHref(locale, "/types")}
          className="flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          {t.typeDetail.ctaBack}
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">
        {t.typeDetail.disclaimer}
      </p>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-ice-deep/60 p-5">
      <h2 className="font-bold text-ink-deep">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}
