"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import { clearAll, loadSession } from "@/lib/storage";

/**
 * 測驗說明頁的動作區：
 * - 沒有舊紀錄：顯示「開始測驗」
 * - 有進行中的紀錄：顯示「繼續上次進度」＋「清除舊紀錄重新開始」（需確認）
 */
export function TestIntroActions() {
  const router = useRouter();
  const [progress, setProgress] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);

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
    router.push("/test/questions");
  };

  return (
    <div className="mt-8 space-y-3">
      {progress !== null && progress > 0 ? (
        <>
          <button
            type="button"
            onClick={() => router.push("/test/questions")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
          >
            繼續上次進度（已完成 {progress} / {QUESTIONS.length} 題）
          </button>
          {confirming ? (
            <div
              role="alertdialog"
              aria-label="確認重新開始"
              className="rounded-card border border-amber bg-amber-soft/40 p-4 text-sm"
            >
              <p className="font-semibold text-ink">
                確定要清除舊紀錄重新開始嗎？已作答的 {progress}{" "}
                題將被刪除，且無法復原。
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-11 rounded-full bg-ink px-5 py-2 font-semibold text-white hover:bg-ink-deep"
                >
                  確定清除並重新開始
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="min-h-11 rounded-full border border-ice-deep px-5 py-2 font-semibold text-ink hover:bg-ice"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-ice-deep bg-white px-8 py-2.5 font-semibold text-ink transition hover:border-ink-soft"
            >
              清除舊紀錄重新開始
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => router.push("/test/questions")}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-8 py-3 text-lg font-bold text-ink-deep transition hover:bg-amber-deep"
        >
          開始測驗
        </button>
      )}
    </div>
  );
}
