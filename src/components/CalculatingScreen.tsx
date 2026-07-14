"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import { computeResult } from "@/lib/scoring";
import { loadSession, saveResult, SCHEMA_VERSION } from "@/lib/storage";
import { encodeResultParams } from "@/lib/result-url";
import { getBundle } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";

const STAGE_INTERVAL = 600;

/**
 * 計算過場：以約 1.8 秒的平滑動畫呈現實際的本地計算流程，
 * 不假裝呼叫 AI 或進行不存在的複雜運算。
 */
export function CalculatingScreen({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const t = getBundle(locale);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState(false);
  const started = useRef(false);
  const stageCount = t.calculating.stages.length;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const session = loadSession();
    const answeredAll =
      session && Object.keys(session.answers).length === QUESTIONS.length;

    if (!answeredAll) {
      setError(true);
      return;
    }

    // 實際計算（同步、毫秒級）：過場只是為了平滑的視覺回饋
    const result = computeResult(QUESTIONS, session.answers);
    const completedAt = session.completedAt ?? new Date().toISOString();
    saveResult({
      version: SCHEMA_VERSION,
      code: result.code,
      scores: result.scores,
      stability: result.stability,
      completedAt,
    });

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < stageCount; i++) {
      timers.push(setTimeout(() => setStage(i), i * STAGE_INTERVAL));
    }
    timers.push(
      setTimeout(() => {
        const query = encodeResultParams({
          code: result.code,
          scores: result.scores,
          stability: result.stability,
        });
        router.replace(localeHref(locale, `/result?${query}`));
      }, stageCount * STAGE_INTERVAL)
    );
    return () => timers.forEach(clearTimeout);
  }, [router, locale, stageCount]);

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-bold text-ink-deep">
          {t.calculating.incompleteTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {fmt(t.calculating.incompleteBody, { total: QUESTIONS.length })}
        </p>
        <button
          type="button"
          onClick={() => router.replace(localeHref(locale, "/test/questions"))}
          className="mt-6 min-h-12 rounded-full bg-amber px-8 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          {t.calculating.backToTest}
        </button>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center"
      aria-busy="true"
    >
      {/* 羅盤動畫 */}
      <svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        aria-hidden="true"
        className="animate-softpulse"
      >
        <circle
          cx="44"
          cy="44"
          r="38"
          fill="none"
          stroke="var(--color-ice-deep)"
          strokeWidth="4"
        />
        <path d="M44 14 L52 44 L44 74 L36 44 Z" fill="var(--color-amber)" />
        <circle cx="44" cy="44" r="5" fill="var(--color-ink)" />
      </svg>
      <p aria-live="polite" className="mt-6 text-lg font-semibold text-ink-deep">
        {t.calculating.stages[stage]}
      </p>
      <p className="mt-2 text-sm text-mist">{t.calculating.note}</p>
    </div>
  );
}
