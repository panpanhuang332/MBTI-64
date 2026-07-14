"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractCode } from "@/lib/compare";
import { DimensionBars } from "@/components/DimensionBars";
import { TypeEmblem } from "@/components/TypeEmblem";
import { getFullProfile, type FullProfile } from "@/lib/profiles";
import { decodeResultParams, encodeResultParams } from "@/lib/result-url";
import {
  LOW_STABILITY_NOTE,
  STABILITY_LABEL,
} from "@/lib/scoring";
import { downloadShareCard } from "@/lib/share-card";
import { clearSession, loadResult } from "@/lib/storage";
import type { DimensionScores, Stability } from "@/lib/types";

interface ViewData {
  profile: FullProfile;
  scores: DimensionScores;
  stability: Stability;
}

/**
 * 結果頁：優先讀取經驗證的 URL 參數（可分享）；
 * 沒有參數時退回 localStorage 的最近結果；兩者皆無或參數非法時顯示友善錯誤。
 */
export function ResultView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<
    { status: "loading" } | { status: "invalid" } | ({ status: "ok" } & ViewData)
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
      const profile = shared && getFullProfile(shared.code);
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
    const profile = saved && getFullProfile(saved.code);
    if (saved && profile) {
      // 補上參數，讓網址可直接分享
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
  }, [searchParams]);

  if (state.status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-mist">
        <p>載入結果中…</p>
      </div>
    );
  }

  if (state.status === "invalid") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-ink-deep">
          找不到有效的測驗結果
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          這個結果連結可能不完整或已失效，也可能你還沒有完成測驗。別擔心，花
          8–10 分鐘就能取得你的座標。
        </p>
        <Link
          href="/test"
          className="mt-6 min-h-12 rounded-full bg-amber px-8 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          開始測驗
        </Link>
        <Link
          href="/types"
          className="mt-3 text-sm font-semibold text-ink underline underline-offset-4"
        >
          或先瀏覽 64 型圖鑑
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
      // 剪貼簿不可用時退回選取提示
      window.prompt("請手動複製這段連結：", window.location.href);
    }
  };

  const retake = () => {
    clearSession();
    router.push("/test");
  };

  const shareData = {
    code: profile.code,
    name: profile.name,
    motto: profile.motto,
    scores,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      {/* 標頭 */}
      <header className="text-center" data-testid="result-header">
        <p className="text-sm font-semibold tracking-widest text-ink-soft">
          你的座標
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
          {profile.enName}・{profile.subtitle}
        </p>
        <div className="mx-auto mt-6 w-40 sm:w-48">
          <TypeEmblem code={profile.code} />
        </div>
        <p className="mt-5 text-lg font-semibold text-ink">
          「{profile.motto}」
        </p>
      </header>

      {/* 摘要 */}
      <section className="mt-10 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">結果摘要</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {core.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">
            {subtype.name}子型（{profile.subtypeCode}）：
          </strong>
          {subtype.summary}
        </p>
      </section>

      {/* 六維橫條 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-ink-deep">
          六維度傾向
        </h2>
        <DimensionBars scores={scores} />
      </section>

      {/* 穩定度 */}
      <section className="mt-8 rounded-card border border-ice-deep/60 p-5">
        <h2 className="font-bold text-ink-deep">
          作答穩定度：{STABILITY_LABEL[stability]}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          {stability === "low"
            ? LOW_STABILITY_NOTE
            : stability === "medium"
              ? "語意相近的題目之間，你的回答大致一致，部分題目呈現情境差異。穩定度只反映作答一致性，不是準確率。"
              : "語意相近的題目之間，你的回答相當一致。穩定度只反映作答一致性，不是準確率。"}
        </p>
      </section>

      {/* 優勢與盲點 */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-ice-deep/60 p-5">
          <h2 className="font-bold text-ink-deep">優勢</h2>
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
          <h2 className="font-bold text-ink-deep">可能盲點</h2>
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
        <DetailBlock title="工作與學習">
          <p>{core.workStyle}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的節奏：</strong>
            {subtype.decisionStyle}
          </p>
        </DetailBlock>
        <DetailBlock title="合作與關係">
          <p>{core.collaboration}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的表達：</strong>
            {subtype.socialStyle}
            {subtype.communicationStyle}
          </p>
        </DetailBlock>
        <DetailBlock title="壓力狀態">
          <p>{core.stress}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的壓力表現：</strong>
            {subtype.stressStyle}
          </p>
        </DetailBlock>
        <DetailBlock title="成長方向">
          <p>{core.growth}</p>
        </DetailBlock>
        <DetailBlock title="常見誤解">
          <p>{core.misconception}</p>
        </DetailBlock>
      </section>

      {/* 與朋友類型對照 */}
      <section className="mt-8 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">與朋友類型對照</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          貼上朋友的六字母代碼或結果連結，逐一對照你們六個維度的偏好——開啟對話，不是評分。
        </p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const friend = extractCode(friendInput);
            if (!friend) {
              setFriendError("代碼格式不正確，例：ENFP-AH");
              return;
            }
            setFriendError(null);
            router.push(`/compare?a=${profile.code}&b=${friend}`);
          }}
        >
          <label htmlFor="friend-code" className="sr-only">
            朋友的類型代碼或結果連結
          </label>
          <input
            id="friend-code"
            type="text"
            value={friendInput}
            onChange={(e) => setFriendInput(e.target.value)}
            placeholder="如 ENFP-AH，或貼上對方的結果連結"
            className="min-h-12 flex-1 rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-ink-deep"
          >
            開始對照
          </button>
        </form>
        {friendError && (
          <p role="alert" className="mt-2 text-sm font-semibold text-amber-deep">
            {friendError}
          </p>
        )}
      </section>

      {/* 反思問題 */}
      <section className="mt-8 rounded-card bg-ice p-6">
        <h2 className="font-bold text-ink-deep">
          適合與他人討論的三個問題
        </h2>
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
          {copied ? "已複製連結 ✓" : "複製分享連結"}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => downloadShareCard(shareData, "portrait")}
            className="min-h-12 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ice"
          >
            下載圖卡（直式）
          </button>
          <button
            type="button"
            onClick={() => downloadShareCard(shareData, "square")}
            className="min-h-12 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ice"
          >
            下載圖卡（方形）
          </button>
        </div>
        <Link
          href={`/types/${profile.code}`}
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          查看類型詳情
        </Link>
        <Link
          href="/types"
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          查看全部 64 型
        </Link>
        <button
          type="button"
          onClick={retake}
          className="min-h-12 rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft sm:col-span-2"
        >
          重新測驗
        </button>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-mist">
        分享連結只包含人格代碼、六維傾向分數與穩定度，不含姓名或作答內容。本報告僅供自我探索，不是醫療或心理診斷，也不應作為職業或伴侶選擇的依據。
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
