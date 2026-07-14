import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TypeEmblem } from "@/components/TypeEmblem";
import { getFullProfile } from "@/lib/profiles";
import { allCodes } from "@/lib/scoring";

/** 靜態輸出：預先生成全部 64 個合法路徑 */
export function generateStaticParams() {
  return allCodes().map((code) => ({ code }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const profile = getFullProfile(code);
  if (!profile) return { title: "找不到類型" };
  return {
    title: `${profile.code} ${profile.name}`,
    description: `${profile.name}（${profile.code}）：${profile.core.summary.slice(0, 80)}…`,
    alternates: { canonical: `/types/${profile.code}` },
  };
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const profile = getFullProfile(code);
  if (!profile) notFound();

  const { core, subtype } = profile;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="麵包屑" className="text-sm text-mist">
        <Link href="/types" className="hover:text-ink">
          64 型圖鑑
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{profile.code}</span>
      </nav>

      <header className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="w-36 shrink-0 sm:w-44">
          <TypeEmblem code={profile.code} />
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-ink-soft">
            {profile.code}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-ink-deep sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-mist">
            {profile.enName}・{profile.subtitle}
          </p>
          <p className="mt-3 font-semibold text-ink">「{profile.motto}」</p>
        </div>
      </header>

      <section className="mt-8 rounded-card border border-ice-deep/60 bg-cloud p-6">
        <h2 className="font-bold text-ink-deep">類型摘要</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {core.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">
            {subtype.name}子型（{profile.subtypeCode}）：
          </strong>
          {subtype.summary}
        </p>
        <p className="mt-3 text-xs text-mist">
          子型所屬的 A/O 與 H/C 為本站自訂探索維度，非官方 MBTI 構面。
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
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

      <section className="mt-6 space-y-5">
        <Block title="工作與學習">
          <p>{core.workStyle}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的決策節奏：</strong>
            {subtype.decisionStyle}
          </p>
        </Block>
        <Block title="合作與溝通">
          <p>{core.collaboration}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的表達：</strong>
            {subtype.socialStyle}
            {subtype.communicationStyle}
          </p>
        </Block>
        <Block title="壓力反應">
          <p>{core.stress}</p>
          <p className="mt-2">
            <strong className="text-ink">{subtype.name}子型的壓力表現：</strong>
            {subtype.stressStyle}
          </p>
        </Block>
        <Block title="成長方向">
          <p>{core.growth}</p>
        </Block>
        <Block title="常見誤解">
          <p>{core.misconception}</p>
        </Block>
        <Block title="適合與他人討論的三個問題">
          <ol className="list-decimal space-y-2 pl-5">
            {core.reflectionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </Block>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/test"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-amber px-6 py-3 font-bold text-ink-deep transition hover:bg-amber-deep"
        >
          測測看你的類型
        </Link>
        <Link
          href="/types"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink transition hover:border-ink-soft"
        >
          回到 64 型圖鑑
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">
        類型描述的是偏好傾向，不是固定身分；每一型都沒有高低之分。內容僅供自我探索，不應作為職業、伴侶或任何甄選決策的依據。
      </p>
    </div>
  );
}

function Block({
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
