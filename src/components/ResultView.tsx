"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractCode } from "@/lib/compare";
import { DimensionBars } from "@/components/DimensionBars";
import { TypeEmblem } from "@/components/TypeEmblem";
import {
  getBundle,
  getLocalizedProfile,
  type LocalizedProfile,
} from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";
import { decodeResultParams, encodeResultParams } from "@/lib/result-url";
import { downloadShareCard } from "@/lib/share-card";
import { clearSession, loadResult } from "@/lib/storage";
import type { DimensionScores, Stability } from "@/lib/types";

interface ViewData {
  profile: LocalizedProfile;
  scores: DimensionScores;
  stability: Stability;
}

/**
 * 結果頁：優先讀取經驗證的 URL 參數（可分享）；
 * 沒有參數時退回 localStorage 的最近結果；兩者皆無或參數非法時顯示友善錯誤。
 */
export function ResultView({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = getBundle(locale);
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "invalid" }
    | ({ status: "ok" } & ViewData)
  >({ status: "loading" });
  const [copied, setCopied] = useState(false);
  const [friendInput, setFriendInput] = useState("");
  const [friendError, setFriendError] = useState<string | null>(null);

  useEffect(() => {
    const hasParams = searchParams.size > 0;
    if (hasParams) {
      const shared = decodeResultParams(
        new URLSearchParams(searchParams.toString())
      );
      const profile = shared && getLocalizedProfile(shared.code, locale);
      if (shared && profile) {
        setState({
          status: "ok",
          profile,
          scores: shared.scores,
          stability: shared.stability,
        });
      } else {
        setState({ status: "invalid" });
      }
      return;
    }
    // 無參數：讀取本機保存的結果
    const saved = loadResult();
    const profile = saved && getLocalizedProfile(saved.code, locale);
    if (saved && profile) {
      const query = encodeResultParams({
        code: saved.code,
        scores: saved.scores,
        stability: saved.stability,
      });
      window.history.replaceState(null, "", `?${query}`);
      setState({
        status: "ok",
        profile,
        scores: saved.scores,
        stability: saved.stability,
      });
    } else {
      setState({ status: "invalid" });
    }
  }, [searchParams, locale]);

  if (state.status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-mist">
        <p>{t.result.loading}</p>
      </div>
    );
  }

  if (state.status === "invalid") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-ink-deep">
          {t.result.invalidTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {t.result.invalidBody}
        </p>
        <Link
          href={localeHref(locale, "/test")}
          className="mt-6 min-h-12 rounded-full bg-amber px-8 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          {t.result.invalidStart}
        </Link>
        <Link
          href={localeHref(locale, "/types")}
          className="mt-3 text-sm font-semibold text-ink underline underline-offset-4"
        >
          {t.result.invalidBrowse}
        </Link>
      </div>
    );
  }

  const { profile, scores, stability } = state;
  const { core, subtype } = profile;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t.result.copyPrompt, window.location.href);
    }
  };

  const retake = () => {
    clearSession();
    router.push(localeHref(locale, "/test"));
  };

  const shareData = {
    code: profile.code,
    name: profile.name,
    motto: profile.motto,
    scores,
    brand:
      t.site.name === t.site.nameEn
        ? t.site.name
        : `${t.site.name}  ${t.site.nameEn}`,
    disclaimer: t.shareCard.disclaimer,
  };

  const stabilityText =
    stability === "low"
      ? t.result.stabilityLow
      : stability === "medium"
        ? t.result.stabilityMedium
        : t.result.stabilityHigh;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      {/* 標頭 */}
      <header className="text-center" data-testid="result-header">
        <p className="text-sm font-semibold tracking-widest text-ink-soft">
          {t.result.kicker}
        </p>
        <p
          className="mt-2 text-5xl font-extrabold tracking-wide text-ink-deep sm:text-6xl"
          data-testid="result-code"
        >
          {profile.code}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-sm text-mist">
          {locale === "en" ? profile.subtitle : `${profile.enName}・${profile.subtitle}`}
        </p>
        <div className="mx-auto mt-6 w-40 sm:w-48">
          <TypeEmblem
            code={profile.code}
            ariaLabel={fmt(t.typeDetail.emblemAria, { code: profile.code })}
          />
        </div>
        <p className="mt-5 text-lg font-semibold text-ink">
          「{profile.motto}」
        </p>
      </header>

      {/* 摘要 */}
      <section className="mt-10 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">{t.result.summaryTitle}</h2>
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
      </section>

      {/* 六維橫條 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-ink-deep">
          {t.result.dimsTitle}
        </h2>
        <DimensionBars scores={scores} locale={locale} />
      </section>

      {/* 穩定度 */}
      <section className="mt-8 rounded-card border border-ice-deep/60 p-5">
        <h2 className="font-bold text-ink-deep">
          {fmt(t.result.stabilityTitle, {
            label: t.dimensionBars.stability[stability],
          })}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          {stabilityText}
        </p>
      </section>

      {/* 優勢與盲點 */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-ice-deep/60 p-5">
          <h2 className="font-bold text-ink-deep">
            {t.result.strengthsTitle}
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
            {t.result.blindspotsTitle}
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

      {/* 詳細段落 */}
      <section className="mt-8 space-y-5">
        <DetailBlock title={t.result.workTitle}>
          <p>{core.workStyle}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.result.subtypeRhythm, { name: subtype.name })}
            </strong>
            {subtype.decisionStyle}
          </p>
        </DetailBlock>
        <DetailBlock title={t.result.collabTitle}>
          <p>{core.collaboration}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.result.subtypeExpression, { name: subtype.name })}
            </strong>
            {subtype.socialStyle}
            {subtype.communicationStyle}
          </p>
        </DetailBlock>
        <DetailBlock title={t.result.stressTitle}>
          <p>{core.stress}</p>
          <p className="mt-2">
            <strong className="text-ink">
              {fmt(t.result.subtypeStress, { name: subtype.name })}
            </strong>
            {subtype.stressStyle}
          </p>
        </DetailBlock>
        <DetailBlock title={t.result.growthTitle}>
          <p>{core.growth}</p>
        </DetailBlock>
        <DetailBlock title={t.result.misconceptionTitle}>
          <p>{core.misconception}</p>
        </DetailBlock>
      </section>

      {/* 與朋友類型對照 */}
      <section className="mt-8 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">{t.result.compareTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          {t.result.compareBody}
        </p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const friend = extractCode(friendInput);
            if (!friend) {
              setFriendError(t.result.compareError);
              return;
            }
            setFriendError(null);
            router.push(
              localeHref(locale, `/compare?a=${profile.code}&b=${friend}`)
            );
          }}
        >
          <label htmlFor="friend-code" className="sr-only">
            {t.result.compareInputLabel}
          </label>
          <input
            id="friend-code"
            type="text"
            value={friendInput}
            onChange={(e) => setFriendInput(e.target.value)}
            placeholder={t.result.comparePlaceholder}
            className="min-h-12 flex-1 rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
            aria-label={t.result.compareInputLabel}
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-ink-deep"
          >
            {t.result.compareSubmit}
          </button>
        </form>
        {friendError && (
          <p
            role="alert"
            className="mt-2 text-sm font-semibold text-amber-deep"
          >
            {friendError}
          </p>
        )}
      </section>

      {/* 反思問題 */}
      <section className="mt-8 rounded-card bg-ice p-6">
        <h2 className="font-bold text-ink-deep">{t.result.reflectionTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
          {core.reflectionQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>

      {/* 動作 */}
      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={copyLink}
          className="min-h-12 rounded-full bg-amber px-6 py-3 font-bold text-ink-deep transition hover:bg-amber-deep"
        >
          {copied ? t.result.copied : t.result.copyLink}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => downloadShareCard(shareData, "portrait")}
            className="min-h-12 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ice"
          >
            {t.result.downloadPortrait}
          </button>
          <button
            type="button"
            onClick={() => downloadShareCard(shareData, "square")}
            className="min-h-12 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ice"
          >
            {t.result.downloadSquare}
          </button>
        </div>
        <Link
          href={localeHref(locale, `/types/${profile.code}`)}
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          {t.result.viewDetail}
        </Link>
        <Link
          href={localeHref(locale, "/types")}
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          {t.result.viewAll}
        </Link>
        <button
          type="button"
          onClick={retake}
          className="min-h-12 rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft sm:col-span-2"
        >
          {t.result.retake}
        </button>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-mist">
        {t.result.footNote}
      </p>
    </div>
  );
}

function DetailBlock({
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
