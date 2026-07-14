"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import { computeResult } from "@/lib/scoring";
import { loadSession, saveResult, SCHEMA_VERSION } from "@/lib/storage";
import { encodeResultParams } from "@/lib/result-url";

const STAGES = [
  "正在整理六個維度…",
  "正在比對人格組合…",
  "正在產生個人報告…",
];

const STAGE_INTERVAL = 600;

/**
 * 計算過場：以約 1.8 秒的平滑動畫呈現實際的本地計算流程，
 * 不假裝呼叫 AI 或進行不存在的複雜運算。
 */
export function CalculatingScreen() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [error, setError] = useState(false);
  const started = useRef(false);

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
    STAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setStage(i), i * STAGE_INTERVAL));
    });
    timers.push(
      setTimeout(() => {
        const query = encodeResultParams({
          code: result.code,
          scores: result.scores,
          stability: result.stability,
        });
        router.replace(`/result?${query}`);
      }, STAGES.length * STAGE_INTERVAL)
    );
    return () => timers.forEach(clearTimeout);
  }, [router]);

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-bold text-ink-deep">
          還沒有完整的作答紀錄
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          需要完成全部 {QUESTIONS.length} 題才能產生結果。
        </p>
        <button
          type="button"
          onClick={() => router.replace("/test/questions")}
          className="mt-6 min-h-12 rounded-full bg-amber px-8 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          回到測驗
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
      <p
        aria-live="polite"
        className="mt-6 text-lg font-semibold text-ink-deep"
      >
        {STAGES[stage]}
      </p>
      <p className="mt-2 text-sm text-mist">
        所有計算都在你的裝置上完成，答案不會離開瀏覽器。
      </p>
    </div>
  );
}
