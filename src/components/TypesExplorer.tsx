"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TypeEmblem } from "@/components/TypeEmblem";
import { CORE_PROFILES, getAllProfiles } from "@/lib/profiles";

const CORE_ORDER = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

/** 64 型圖鑑：搜尋＋篩選（核心型 / A-O / H-C），卡片式瀏覽，無稀有度階級 */
export function TypesExplorer() {
  const [query, setQuery] = useState("");
  const [coreFilter, setCoreFilter] = useState<string>("all");
  const [aoFilter, setAoFilter] = useState<string>("all");
  const [hcFilter, setHcFilter] = useState<string>("all");

  const profiles = useMemo(() => getAllProfiles(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles.filter((p) => {
      if (coreFilter !== "all" && p.coreCode !== coreFilter) return false;
      if (aoFilter !== "all" && p.subtypeCode[0] !== aoFilter) return false;
      if (hcFilter !== "all" && p.subtypeCode[1] !== hcFilter) return false;
      if (!q) return true;
      return (
        p.code.toLowerCase().includes(q) ||
        p.name.includes(query.trim()) ||
        p.core.name.includes(query.trim()) ||
        p.enName.toLowerCase().includes(q)
      );
    });
  }, [profiles, query, coreFilter, aoFilter, hcFilter]);

  return (
    <div>
      {/* 控制列 */}
      <div className="rounded-card border border-ice-deep/60 bg-cloud p-4">
        <label htmlFor="type-search" className="sr-only">
          搜尋代碼或中文名稱
        </label>
        <input
          id="type-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋代碼（如 INTJ-OC）或中文名稱"
          className="min-h-12 w-full rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <label
              htmlFor="core-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              四字母核心類型
            </label>
            <select
              id="core-filter"
              value={coreFilter}
              onChange={(e) => setCoreFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">全部核心型</option>
              {CORE_ORDER.map((code) => (
                <option key={code} value={code}>
                  {code}・{CORE_PROFILES[code].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="ao-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              決策推進（A/O）
            </label>
            <select
              id="ao-filter"
              value={aoFilter}
              onChange={(e) => setAoFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">全部</option>
              <option value="A">A・行動推進</option>
              <option value="O">O・觀察沉思</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="hc-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              表達溫度（H/C）
            </label>
            <select
              id="hc-filter"
              value={hcFilter}
              onChange={(e) => setHcFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">全部</option>
              <option value="H">H・外顯溫度</option>
              <option value="C">C・沉穩內斂</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-mist" aria-live="polite">
        顯示 {filtered.length} / 64 型
      </p>

      {/* 卡片：手機 1–2 欄、桌面多欄 */}
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.code}>
            <Link
              href={`/types/${p.code}`}
              className="flex h-full gap-4 rounded-card border border-ice-deep/60 bg-white p-4 transition hover:border-ink-soft hover:shadow-md"
            >
              <div className="w-20 shrink-0">
                <TypeEmblem code={p.code} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm font-bold text-ink-soft">
                  {p.code}
                </p>
                <h2 className="mt-0.5 font-bold text-ink-deep">{p.name}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist">
                  {p.subtitle}・{p.core.motto}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-mist">
          沒有符合的類型，試試調整搜尋或篩選條件。
        </p>
      )}
    </div>
  );
}
