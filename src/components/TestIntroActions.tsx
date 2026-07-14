"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import { clearAll, loadSession } from "@/lib/storage";
import { getBundle } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";

/**
 * 測驗說明頁的動作區：
 * - 沒有舊紀錄：顯示「開始測驗」
 * - 有進行中的紀錄：顯示「繼續上次進度」＋「清除舊紀錄重新開始」（需確認）
 */
export function TestIntroActions({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const router = useRouter();
  const t = getBundle(locale);
  const [progress, setProgress] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const questionsHref = localeHref(locale, "/test/questions");

  useEffect(() => {
    const session = loadSession();
    if (session && !session.completedAt) {
      setProgress(Object.keys(session.answers).length);
    } else {
      setProgress(null);
    }
  }, []);

  const handleRestart = () => {
    clearAll();
    setConfirming(false);
    router.push(questionsHref);
  };

  return (
    <div className="mt-8 space-y-3">
      {progress !== null && progress > 0 ? (
        <>
          <button
            type="button"
            onClick={() => router.push(questionsHref)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
          >
            {fmt(t.testIntro.continueProgress, {
              done: progress,
              total: QUESTIONS.length,
            })}
          </button>
          {confirming ? (
            <div
              role="alertdialog"
              aria-label={t.testIntro.confirmAria}
              className="rounded-card border border-amber bg-amber-soft/40 p-4 text-sm"
            >
              <p className="font-semibold text-ink">
                {fmt(t.testIntro.confirmTitle, { done: progress })}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-11 rounded-full bg-ink px-5 py-2 font-semibold text-white hover:bg-ink-deep"
                >
                  {t.testIntro.confirmYes}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="min-h-11 rounded-full border border-ice-deep px-5 py-2 font-semibold text-ink hover:bg-ice"
                >
                  {t.testIntro.confirmNo}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-ice-deep bg-white px-8 py-2.5 font-semibold text-ink transition hover:border-ink-soft"
            >
              {t.testIntro.restart}
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => router.push(questionsHref)}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
        >
          {t.testIntro.start}
        </button>
      )}
    </div>
  );
}
