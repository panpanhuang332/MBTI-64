"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TypeEmblem } from "@/components/TypeEmblem";
import { getAllLocalizedProfiles, getBundle } from "@/lib/i18n";
import {
  fmt,
  localeHref,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";

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
export function TypesExplorer({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const t = getBundle(locale);
  const [query, setQuery] = useState("");
  const [coreFilter, setCoreFilter] = useState<string>("all");
  const [aoFilter, setAoFilter] = useState<string>("all");
  const [hcFilter, setHcFilter] = useState<string>("all");

  const profiles = useMemo(() => getAllLocalizedProfiles(locale), [locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles.filter((p) => {
      if (coreFilter !== "all" && p.coreCode !== coreFilter) return false;
      if (aoFilter !== "all" && p.subtypeCode[0] !== aoFilter) return false;
      if (hcFilter !== "all" && p.subtypeCode[1] !== hcFilter) return false;
      if (!q) return true;
      return (
        p.code.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.core.name.toLowerCase().includes(q) ||
        p.enName.toLowerCase().includes(q)
      );
    });
  }, [profiles, query, coreFilter, aoFilter, hcFilter]);

  return (
    <div>
      {/* 控制列 */}
      <div className="rounded-card border border-ice-deep/60 bg-cloud p-4">
        <label htmlFor="type-search" className="sr-only">
          {t.types.searchLabel}
        </label>
        <input
          id="type-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.types.searchPlaceholder}
          aria-label={t.types.searchLabel}
          className="min-h-12 w-full rounded-full border-2 border-ice-deep bg-white px-5 text-ink placeholder:text-mist focus:border-ink-soft"
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <label
              htmlFor="core-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              {t.types.coreFilterLabel}
            </label>
            <select
              id="core-filter"
              value={coreFilter}
              onChange={(e) => setCoreFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">{t.types.allCores}</option>
              {CORE_ORDER.map((code) => (
                <option key={code} value={code}>
                  {code}・{t.cores[code].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="ao-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              {t.types.aoLabel}
            </label>
            <select
              id="ao-filter"
              value={aoFilter}
              onChange={(e) => setAoFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">{t.types.filterAll}</option>
              <option value="A">{t.types.aoA}</option>
              <option value="O">{t.types.aoO}</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="hc-filter"
              className="mb-1 block text-xs font-semibold text-mist"
            >
              {t.types.hcLabel}
            </label>
            <select
              id="hc-filter"
              value={hcFilter}
              onChange={(e) => setHcFilter(e.target.value)}
              className="min-h-11 w-full rounded-lg border-2 border-ice-deep bg-white px-3 text-sm text-ink"
            >
              <option value="all">{t.types.filterAll}</option>
              <option value="H">{t.types.hcH}</option>
              <option value="C">{t.types.hcC}</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-mist" aria-live="polite">
        {fmt(t.types.showing, { shown: filtered.length })}
      </p>

      {/* 卡片：手機 1–2 欄、桌面多欄 */}
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.code}>
            <Link
              href={localeHref(locale, `/types/${p.code}`)}
              className="flex h-full gap-4 rounded-card border border-ice-deep/60 bg-white p-4 transition hover:border-ink-soft hover:shadow-md"
            >
              <div className="w-20 shrink-0">
                <TypeEmblem
                  code={p.code}
                  ariaLabel={fmt(t.typeDetail.emblemAria, { code: p.code })}
                />
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
        <p className="mt-8 text-center text-mist">{t.types.empty}</p>
      )}
    </div>
  );
}
