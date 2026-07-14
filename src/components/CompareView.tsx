"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TypeEmblem } from "@/components/TypeEmblem";
import { track } from "@/lib/analytics";
import { compareDimensions, extractCode, sameCount } from "@/lib/compare";
import { getBundle, getLocalizedProfile } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";
import { loadResult } from "@/lib/storage";

/**
 * /compare：兩個類型的維度對照。
 * URL 形式 /compare?a=INTJ-OC&b=ENFP-AH（皆經驗證，非法時退回輸入表單）。
 */
export function CompareView({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = getBundle(locale);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const codeA = extractCode(searchParams.get("a") ?? "");
  const codeB = extractCode(searchParams.get("b") ?? "");
  const profileA = codeA ? getLocalizedProfile(codeA, locale) : null;
  const profileB = codeB ? getLocalizedProfile(codeB, locale) : null;
  const ready = profileA && profileB;

  // 預填自己的類型（本機保存的最近結果）
  useEffect(() => {
    if (ready) return;
    if (codeA) {
      setInputA(codeA);
      return;
    }
    const saved = loadResult();
    if (saved) setInputA(saved.code);
  }, [codeA, ready]);

  // 匿名事件：只記「對照功能被使用」，不含任何代碼
  useEffect(() => {
    if (ready) track("compare_used", locale);
  }, [ready, locale]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const a = extractCode(inputA);
    const b = extractCode(inputB);
    if (!a || !b) {
      setFormError(t.compare.formError);
      return;
    }
    setFormError(null);
    router.push(localeHref(locale, `/compare?a=${a}&b=${b}`));
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
          {t.compare.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-mist">
          {t.compare.lead}
        </p>
        {(searchParams.get("a") || searchParams.get("b")) && (
          <p
            role="alert"
            className="mt-4 rounded-card bg-amber-soft/50 p-3 text-sm font-semibold text-ink"
          >
            {t.compare.invalidUrl}
          </p>
        )}
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="compare-a"
              className="mb-1 block text-sm font-semibold text-ink"
            >
              {t.compare.labelA}
            </label>
            <input
              id="compare-a"
              type="text"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder={t.compare.placeholderA}
              className="min-h-12 w-full rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
            />
          </div>
          <div>
            <label
              htmlFor="compare-b"
              className="mb-1 block text-sm font-semibold text-ink"
            >
              {t.compare.labelB}
            </label>
            <input
              id="compare-b"
              type="text"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder={t.compare.placeholderB}
              className="min-h-12 w-full rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
            />
          </div>
          {formError && (
            <p role="alert" className="text-sm font-semibold text-amber-deep">
              {formError}
            </p>
          )}
          <button
            type="submit"
            className="min-h-12 w-full rounded-full bg-amber px-8 py-3 font-bold text-ink-deep transition hover:bg-amber-deep"
          >
            {t.compare.submit}
          </button>
        </form>
        <p className="mt-6 text-xs leading-relaxed text-mist">
          {t.compare.noCodeNote}
          <Link
            href={localeHref(locale, "/test")}
            className="mx-1 font-semibold text-ink underline underline-offset-4"
          >
            {t.compare.noCodeLink}
          </Link>
        </p>
      </div>
    );
  }

  const comparisons = compareDimensions(profileA.code, profileB.code, locale);
  const same = sameCount(comparisons);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-center text-3xl font-bold text-ink-deep sm:text-4xl">
        {t.compare.title}
      </h1>

      {/* 兩人卡片 */}
      <div className="mt-8 grid grid-cols-2 gap-4" data-testid="compare-header">
        {[profileA, profileB].map((p, i) => (
          <Link
            key={`${p.code}-${i}`}
            href={localeHref(locale, `/types/${p.code}`)}
            className="rounded-card border border-ice-deep/60 bg-white p-4 text-center transition hover:border-ink-soft"
          >
            <div className="mx-auto w-20 sm:w-24">
              <TypeEmblem
                code={p.code}
                ariaLabel={fmt(t.typeDetail.emblemAria, { code: p.code })}
              />
            </div>
            <p className="mt-2 font-mono text-sm font-bold text-ink-soft">
              {p.code}
            </p>
            <p className="font-bold text-ink-deep">{p.name}</p>
            <p className="mt-1 text-xs text-mist">
              {i === 0 ? t.compare.youLabel : t.compare.friendLabel}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-6 rounded-card bg-ice p-4 text-center text-sm leading-relaxed text-ink-soft">
        {t.compare.sameSummaryPrefix}{" "}
        <strong className="text-ink-deep">{same} / 6</strong>{" "}
        {t.compare.sameSummarySuffix}
      </p>

      {/* 六維度對照 */}
      <div className="mt-6 space-y-4">
        {comparisons.map((c) => (
          <section
            key={c.dimension}
            className="rounded-card border border-ice-deep/60 p-5"
            data-testid={`compare-${c.dimension}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ink-deep">{c.title}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  c.same ? "bg-ice text-ink-soft" : "bg-amber-soft/60 text-ink"
                }`}
              >
                {c.same ? t.compare.sameBadge : t.compare.diffBadge}
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-cloud p-3 text-sm leading-relaxed">
                <p className="font-bold text-ink">
                  {fmt(t.compare.youPrefix, { letter: c.letterA })}
                </p>
                <p className="mt-1 text-mist">{c.descriptionA}</p>
              </div>
              <div className="rounded-lg bg-cloud p-3 text-sm leading-relaxed">
                <p className="font-bold text-ink">
                  {fmt(t.compare.friendPrefix, { letter: c.letterB })}
                </p>
                <p className="mt-1 text-mist">{c.descriptionB}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {c.talkPrompt}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => router.push(localeHref(locale, "/compare"))}
          className="min-h-12 rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          {t.compare.compareOther}
        </button>
        <Link
          href={localeHref(locale, "/types")}
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          {t.compare.browseTypes}
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">
        {t.compare.disclaimer}
      </p>
    </div>
  );
}
