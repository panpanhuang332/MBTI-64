"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TypeEmblem } from "@/components/TypeEmblem";
import {
  compareDimensions,
  extractCode,
  sameCount,
} from "@/lib/compare";
import { getFullProfile } from "@/lib/profiles";
import { loadResult } from "@/lib/storage";

/**
 * /compare：兩個類型的維度對照。
 * URL 形式 /compare?a=INTJ-OC&b=ENFP-AH（皆經驗證，非法時退回輸入表單）。
 */
export function CompareView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const codeA = extractCode(searchParams.get("a") ?? "");
  const codeB = extractCode(searchParams.get("b") ?? "");
  const profileA = codeA ? getFullProfile(codeA) : null;
  const profileB = codeB ? getFullProfile(codeB) : null;
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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const a = extractCode(inputA);
    const b = extractCode(inputB);
    if (!a || !b) {
      setFormError(
        "請輸入兩個有效的類型代碼（如 INTJ-OC），或直接貼上對方的結果分享連結。"
      );
      return;
    }
    setFormError(null);
    router.push(`/compare?a=${a}&b=${b}`);
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
          類型對照
        </h1>
        <p className="mt-3 text-base leading-relaxed text-mist">
          放入你和朋友的六字母代碼（或結果分享連結），逐一對照六個維度的偏好——目的是開啟對話，不是評分。
        </p>
        {(searchParams.get("a") || searchParams.get("b")) && (
          <p
            role="alert"
            className="mt-4 rounded-card bg-amber-soft/50 p-3 text-sm font-semibold text-ink"
          >
            網址中的類型代碼無效或不完整，請重新輸入。
          </p>
        )}
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="compare-a"
              className="mb-1 block text-sm font-semibold text-ink"
            >
              你的類型
            </label>
            <input
              id="compare-a"
              type="text"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="如 INTJ-OC，或貼上你的結果連結"
              className="min-h-12 w-full rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
            />
          </div>
          <div>
            <label
              htmlFor="compare-b"
              className="mb-1 block text-sm font-semibold text-ink"
            >
              朋友的類型
            </label>
            <input
              id="compare-b"
              type="text"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="如 ENFP-AH，或貼上對方的結果連結"
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
            開始對照
          </button>
        </form>
        <p className="mt-6 text-xs leading-relaxed text-mist">
          對照只使用六字母代碼，不涉及雙方的作答內容。還沒有自己的類型？
          <Link
            href="/test"
            className="mx-1 font-semibold text-ink underline underline-offset-4"
          >
            先做測驗
          </Link>
        </p>
      </div>
    );
  }

  const comparisons = compareDimensions(profileA.code, profileB.code);
  const same = sameCount(comparisons);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-center text-3xl font-bold text-ink-deep sm:text-4xl">
        類型對照
      </h1>

      {/* 兩人卡片 */}
      <div
        className="mt-8 grid grid-cols-2 gap-4"
        data-testid="compare-header"
      >
        {[profileA, profileB].map((p, i) => (
          <Link
            key={`${p.code}-${i}`}
            href={`/types/${p.code}`}
            className="rounded-card border border-ice-deep/60 bg-white p-4 text-center transition hover:border-ink-soft"
          >
            <div className="mx-auto w-20 sm:w-24">
              <TypeEmblem code={p.code} />
            </div>
            <p className="mt-2 font-mono text-sm font-bold text-ink-soft">
              {p.code}
            </p>
            <p className="font-bold text-ink-deep">{p.name}</p>
            <p className="mt-1 text-xs text-mist">
              {i === 0 ? "你" : "朋友"}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-6 rounded-card bg-ice p-4 text-center text-sm leading-relaxed text-ink-soft">
        你們在 <strong className="text-ink-deep">{same} / 6</strong>{" "}
        個維度上偏好相同。相同帶來默契，差異帶來互補——沒有哪種組合比較好，重點是理解彼此的訊號。
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
                  c.same
                    ? "bg-ice text-ink-soft"
                    : "bg-amber-soft/60 text-ink"
                }`}
              >
                {c.same ? "相同" : "不同"}
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-cloud p-3 text-sm leading-relaxed">
                <p className="font-bold text-ink">
                  你：{c.letterA}
                </p>
                <p className="mt-1 text-mist">{c.descriptionA}</p>
              </div>
              <div className="rounded-lg bg-cloud p-3 text-sm leading-relaxed">
                <p className="font-bold text-ink">
                  朋友：{c.letterB}
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
          onClick={() => router.push("/compare")}
          className="min-h-12 rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          對照其他類型
        </button>
        <Link
          href="/types"
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          瀏覽 64 型圖鑑
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">
        對照描述的是偏好差異，不是契合度評分；請勿將其作為伴侶、合作或任何甄選決策的依據。
      </p>
    </div>
  );
}
