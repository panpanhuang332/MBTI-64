"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DIMENSION_ORDER } from "@/lib/dimensions";
import { getBundle } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";
import { QUESTIONS } from "@/lib/questions";
import { answerLean } from "@/lib/scoring";
import { loadResult, loadSession, saveSession } from "@/lib/storage";
import type { TestSession } from "@/lib/types";

/**
 * 作答復盤：逐題檢視本機保存的作答與其傾向方向。
 * 只讀取 localStorage，資料不離開裝置；分享連結開啟者（無本機紀錄）會看到空狀態。
 */
export function ReviewView({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const t = getBundle(locale);
  const [session, setSession] = useState<TestSession | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSession(loadSession());
    setHasResult(loadResult() !== null);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-mist">
        <p>{t.result.loading}</p>
      </div>
    );
  }

  const answeredCount = session ? Object.keys(session.answers).length : 0;

  if (!session || answeredCount === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-ink-deep">
          {t.review.emptyTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {t.review.emptyBody}
        </p>
        <Link
          href={localeHref(locale, "/test")}
          className="mt-6 min-h-12 rounded-full bg-amber px-8 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          {t.review.emptyCta}
        </Link>
      </div>
    );
  }

  const editQuestion = (questionId: string) => {
    const current = loadSession();
    if (!current) return;
    const orderIndex = current.questionOrder.indexOf(questionId);
    if (orderIndex < 0) return;
    const next: TestSession = {
      ...current,
      currentIndex: orderIndex,
      updatedAt: new Date().toISOString(),
    };
    delete next.completedAt;
    saveSession(next);
    router.push(localeHref(locale, "/test/questions"));
  };

  const completedDate = session.completedAt
    ? new Date(session.completedAt).toLocaleDateString(
        locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW"
      )
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        {t.review.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">
        {t.review.lead}
      </p>
      <p className="mt-4 text-sm font-semibold text-ink" data-testid="review-count">
        {fmt(t.review.answeredCount, {
          done: answeredCount,
          total: QUESTIONS.length,
        })}
        {completedDate && (
          <span className="ml-3 font-normal text-mist">
            {fmt(t.review.completedAtLabel, { date: completedDate })}
          </span>
        )}
      </p>
      <p className="mt-2 rounded-card bg-amber-soft/40 p-3 text-xs leading-relaxed text-ink">
        {t.review.editNote}
      </p>

      {hasResult && (
        <Link
          href={localeHref(locale, "/result")}
          className="mt-4 inline-block text-sm font-semibold text-ink underline underline-offset-4"
        >
          {t.review.backToResult}
        </Link>
      )}

      <div className="mt-8 space-y-10">
        {DIMENSION_ORDER.map((d) => {
          const meta = t.dimensions[d];
          const questions = QUESTIONS.filter((q) => q.dimension === d);
          return (
            <section key={d} aria-label={meta.title}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-ink-deep">
                {meta.title}
                <span className="rounded-full bg-ice px-2.5 py-1 text-xs font-bold text-ink-soft">
                  {meta.first} / {meta.second}
                </span>
              </h2>
              <ul className="mt-4 space-y-3">
                {questions.map((q) => {
                  const answer = session.answers[q.id];
                  const lean =
                    answer !== undefined ? answerLean(q, answer) : null;
                  const leanText =
                    lean === null
                      ? "—"
                      : lean === "neutral"
                        ? t.review.neutralLabel
                        : fmt(t.review.leanLabel, {
                            letter:
                              lean === "first" ? meta.first : meta.second,
                            name:
                              lean === "first"
                                ? meta.firstName
                                : meta.secondName,
                          });
                  return (
                    <li
                      key={q.id}
                      className="rounded-card border border-ice-deep/60 bg-white p-4"
                      data-testid="review-item"
                    >
                      <p className="text-sm font-semibold leading-relaxed text-ink">
                        {t.questions[q.id] ?? q.text}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        {answer !== undefined && (
                          <span className="flex items-center gap-1.5 rounded-full bg-ice px-2.5 py-1 font-bold text-ink">
                            <span
                              aria-hidden="true"
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[11px] text-ink-deep"
                            >
                              {answer}
                            </span>
                            {t.review.yourAnswer}：
                            {t.quiz.likert[answer - 1]}
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2.5 py-1 font-semibold ${
                            lean === "neutral" || lean === null
                              ? "bg-cloud text-mist"
                              : "bg-amber-soft/60 text-ink"
                          }`}
                        >
                          {leanText}
                        </span>
                        {q.direction === -1 && (
                          <span className="rounded-full border border-ice-deep px-2.5 py-1 text-mist">
                            {t.review.reverseTag}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => editQuestion(q.id)}
                          className="ml-auto min-h-8 rounded-full border border-ice-deep px-3 py-1 font-semibold text-ink transition hover:border-ink-soft hover:bg-ice"
                        >
                          {t.review.editQuestion}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
