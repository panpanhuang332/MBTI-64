import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TypeDetailView } from "@/views/TypeDetailView";
import { getBundle, getLocalizedProfile } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";
import { ogImagePath } from "@/lib/og-paths";
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
  const profile = getLocalizedProfile(code, "zh-TW");
  if (!profile) return { title: getBundle("zh-TW").typeDetail.notFoundTitle };
  return pageMetadata(
    "zh-TW",
    `/types/${profile.code}`,
    {
      title: `${profile.code} ${profile.name}`,
      description: `${profile.name}（${profile.code}）：${profile.core.summary.slice(0, 80)}…`,
    },
    { ogImage: ogImagePath("zh-TW", profile.code) }
  );
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const profile = getLocalizedProfile(code, "zh-TW");
  if (!profile) notFound();
  return <TypeDetailView locale="zh-TW" code={code} />;
}
