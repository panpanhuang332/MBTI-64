"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuestionById, QUESTIONS } from "@/lib/questions";
import type { TestSession } from "@/lib/types";
import { createSession, loadSession, saveSession } from "@/lib/storage";

const LIKERT_OPTIONS = [
  { value: 1, label: "非常不同意" },
  { value: 2, label: "不同意" },
  { value: 3, label: "不確定／視情況而定" },
  { value: 4, label: "同意" },
  { value: 5, label: "非常同意" },
] as const;

/** 選擇後自動前進前的短暫回饋時間（毫秒） */
const ADVANCE_DELAY = 350;

export function QuestionFlow() {
  const router = useRouter();
  const [session, setSession] = useState<TestSession | null>(null);
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  // 載入或建立工作階段（seed 固定洗牌：重新整理後題序不變）
  useEffect(() => {
    const existing = loadSession();
    if (existing && !existing.completedAt) {
      setSession(existing);
    } else {
      const fresh = createSession();
      saveSession(fresh);
      setSession(fresh);
    }
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const total = QUESTIONS.length;
  const index = session ? Math.min(session.currentIndex, total - 1) : 0;
  const questionId = session?.questionOrder[index];
  const question = questionId ? getQuestionById(questionId) : undefined;
  const answeredCount = session ? Object.keys(session.answers).length : 0;
  const selected =
    pendingValue ?? (session && questionId ? session.answers[questionId] : undefined);

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
          router.push("/test/calculating");
        }
        return;
      }
      persist({ ...session, currentIndex: nextIndex });
    },
    [session, total, persist, router]
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

      // 短暫回饋後自動前進（可返回修改）
      advanceTimer.current = setTimeout(() => {
        setPendingValue(null);
        const isLast = index === total - 1;
        if (isLast) {
          if (Object.keys(next.answers).length === total) {
            const done = { ...next, completedAt: new Date().toISOString() };
            persist(done);
            router.push("/test/calculating");
          } else {
            // 有跳題未答：留在原地提示
            persist(next);
          }
        } else {
          persist({ ...next, currentIndex: index + 1 });
        }
      }, ADVANCE_DELAY);
    },
    [session, questionId, index, total, persist, router]
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
        <p>載入測驗中…</p>
      </div>
    );
  }

  const percent = Math.round((answeredCount / total) * 100);
  const missingBefore =
    index === total - 1 && answeredCount < total
      ? total - answeredCount
      : 0;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-4 py-8">
      {/* 進度 */}
      <div>
        <div className="flex items-baseline justify-between text-sm text-mist">
          <p>
            第{" "}
            <span className="font-bold text-ink">
              {index + 1}
            </span>{" "}
            / {total} 題
          </p>
          <p aria-live="polite">已完成 {percent}%</p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="測驗進度"
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
          {question.text}
        </h1>

        <fieldset className="mt-8">
          <legend className="sr-only">
            請選擇你的同意程度（可按鍵盤 1 到 5）
          </legend>
          <div className="space-y-2.5">
            {LIKERT_OPTIONS.map((option) => {
              const active = selected === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => answer(option.value)}
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
                    {option.value}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {missingBefore > 0 && (
          <p
            ref={liveRef}
            role="alert"
            className="mt-4 rounded-card bg-amber-soft/50 p-3 text-sm font-semibold text-ink"
          >
            還有 {missingBefore}{" "}
            題尚未作答，請用「上一題」回頭補答後才能送出。
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
          ← 上一題
        </button>
        <p className="hidden text-xs text-mist sm:block">
          鍵盤：1–5 作答，← → 前後移動
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={selected === undefined}
          className="min-h-12 rounded-full border-2 border-ice-deep bg-white px-6 py-2.5 font-semibold text-ink transition hover:border-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index === total - 1 ? "完成 →" : "下一題 →"}
        </button>
      </div>
    </div>
  );
}
