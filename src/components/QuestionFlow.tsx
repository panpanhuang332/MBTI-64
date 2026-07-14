"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuestionById, QUESTIONS } from "@/lib/questions";
import type { TestSession } from "@/lib/types";
import { createSession, loadSession, saveSession } from "@/lib/storage";
import { track } from "@/lib/analytics";
import { getBundle } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";

/** 選擇後自動前進前的短暫回饋時間（毫秒） */
const ADVANCE_DELAY = 350;

export function QuestionFlow({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const t = getBundle(locale);
  const [session, setSession] = useState<TestSession | null>(null);
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 載入或建立工作階段（seed 固定洗牌：重新整理後題序不變）
  useEffect(() => {
    const existing = loadSession();
    if (existing && !existing.completedAt) {
      setSession(existing);
    } else {
      const fresh = createSession();
      saveSession(fresh);
      setSession(fresh);
      track("test_started", locale); // 匿名事件（預設關閉，見 lib/analytics）
    }
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, [locale]);

  const total = QUESTIONS.length;
  const index = session ? Math.min(session.currentIndex, total - 1) : 0;
  const questionId = session?.questionOrder[index];
  const question = questionId ? getQuestionById(questionId) : undefined;
  const answeredCount = session ? Object.keys(session.answers).length : 0;
  const selected =
    pendingValue ??
    (session && questionId ? session.answers[questionId] : undefined);

  const persist = useCallback((next: TestSession) => {
    next.updatedAt = new Date().toISOString();
    saveSession(next);
    setSession({ ...next });
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!session) return;
      if (nextIndex < 0) return;
      if (nextIndex >= total) {
        // 全部作答完成才能提交
        if (Object.keys(session.answers).length === total) {
          const done = { ...session, completedAt: new Date().toISOString() };
          persist(done);
          router.push(localeHref(locale, "/test/calculating"));
        }
        return;
      }
      persist({ ...session, currentIndex: nextIndex });
    },
    [session, total, persist, router, locale]
  );

  const answer = useCallback(
    (value: number) => {
      if (!session || !questionId) return;
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      setPendingValue(value);

      const next: TestSession = {
        ...session,
        answers: { ...session.answers, [questionId]: value },
      };
      // 答案立即寫入（中途離開也不遺失）；只有「前進」延遲以保留回饋
      persist(next);

      advanceTimer.current = setTimeout(() => {
        setPendingValue(null);
        const isLast = index === total - 1;
        if (isLast) {
          if (Object.keys(next.answers).length === total) {
            const done = { ...next, completedAt: new Date().toISOString() };
            persist(done);
            router.push(localeHref(locale, "/test/calculating"));
          }
        } else {
          persist({ ...next, currentIndex: index + 1 });
        }
      }, ADVANCE_DELAY);
    },
    [session, questionId, index, total, persist, router, locale]
  );

  // 鍵盤操作：1–5 作答、← 上一題、→ 下一題
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        answer(Number(e.key));
      } else if (e.key === "ArrowLeft") {
        goTo(index - 1);
      } else if (e.key === "ArrowRight" && selected !== undefined) {
        goTo(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, goTo, index, selected]);

  if (!session || !question) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-mist">
        <p>{t.quiz.loading}</p>
      </div>
    );
  }

  const percent = Math.round((answeredCount / total) * 100);
  const missingBefore =
    index === total - 1 && answeredCount < total ? total - answeredCount : 0;
  const questionText = t.questions[question.id] ?? question.text;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-4 py-8">
      {/* 進度 */}
      <div>
        <div className="flex items-baseline justify-between text-sm text-mist">
          <p>
            {t.quiz.progressCurrent}{" "}
            <span className="font-bold text-ink">{index + 1}</span>{" "}
            {fmt(t.quiz.progressOf, { total })}
          </p>
          <p aria-live="polite">{fmt(t.quiz.progressPercent, { percent })}</p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.quiz.progressAria}
          className="mt-2 h-2 overflow-hidden rounded-full bg-ice"
        >
          <div
            className="h-full rounded-full bg-amber transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* 題目 */}
      <div key={question.id} className="animate-rise mt-10 flex-1">
        <h1 className="min-h-20 text-xl font-bold leading-relaxed text-ink-deep sm:text-2xl">
          {questionText}
        </h1>

        <fieldset className="mt-8">
          <legend className="sr-only">{t.quiz.legend}</legend>
          <div className="space-y-2.5">
            {t.quiz.likert.map((label, i) => {
              const value = i + 1;
              const active = selected === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => answer(value)}
                  aria-pressed={active}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-card border-2 px-4 py-3 text-left transition ${
                    active
                      ? "border-amber bg-amber-soft/50 font-bold text-ink-deep"
                      : "border-ice-deep/60 bg-white text-ink hover:border-ink-soft hover:bg-cloud"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      active
                        ? "border-amber-deep bg-amber text-ink-deep"
                        : "border-ice-deep text-mist"
                    }`}
                  >
                    {value}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {missingBefore > 0 && (
          <p
            role="alert"
            className="mt-4 rounded-card bg-amber-soft/50 p-3 text-sm font-semibold text-ink"
          >
            {fmt(t.quiz.missingAlert, { missing: missingBefore })}
          </p>
        )}
      </div>

      {/* 導覽 */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="min-h-12 rounded-full border-2 border-ice-deep bg-white px-6 py-2.5 font-semibold text-ink transition hover:border-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.quiz.prev}
        </button>
        <p className="hidden text-xs text-mist sm:block">
          {t.quiz.keyboardHint}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={selected === undefined}
          className="min-h-12 rounded-full border-2 border-ice-deep bg-white px-6 py-2.5 font-semibold text-ink transition hover:border-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index === total - 1 ? t.quiz.finish : t.quiz.next}
        </button>
      </div>
    </div>
  );
}
