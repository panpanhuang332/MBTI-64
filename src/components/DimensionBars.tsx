import { DIMENSION_ORDER } from "@/lib/dimensions";
import { dimensionResult } from "@/lib/scoring";
import type { DimensionScores } from "@/lib/types";
import { getBundle } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

/** 六維度百分比橫條圖（百分比代表作答傾向，不是人格純度） */
export function DimensionBars({
  scores,
  locale = DEFAULT_LOCALE,
}: {
  scores: DimensionScores;
  locale?: Locale;
}) {
  const t = getBundle(locale);
  return (
    <div className="space-y-5">
      {DIMENSION_ORDER.map((d) => {
        const meta = t.dimensions[d];
        const r = dimensionResult(d, scores[d]);
        const firstActive = r.score >= 0;
        const strengthLabel = t.dimensionBars.strength[r.strength];
        return (
          <div key={d}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span
                className={`font-bold ${firstActive ? "text-ink-deep" : "text-mist"}`}
              >
                {meta.first}・{meta.firstName} {r.firstPercent}%
              </span>
              <span className="hidden text-xs text-mist sm:inline">
                {meta.title}
                {meta.custom && "＊"}・{strengthLabel}
              </span>
              <span
                className={`text-right font-bold ${!firstActive ? "text-ink-deep" : "text-mist"}`}
              >
                {r.secondPercent}% {meta.second}・{meta.secondName}
              </span>
            </div>
            <div
              className="relative mt-1.5 h-4 overflow-hidden rounded-full bg-ice"
              role="img"
              aria-label={`${meta.title}: ${meta.first} ${r.firstPercent}%, ${meta.second} ${r.secondPercent}%, ${strengthLabel}`}
            >
              <div
                className={`animate-bargrow absolute inset-y-0 rounded-full ${
                  firstActive ? "left-0 bg-amber" : "right-0 bg-ink-soft"
                }`}
                style={{
                  width: `${Math.max(firstActive ? r.firstPercent : r.secondPercent, 4)}%`,
                }}
              />
              {/* 中線 */}
              <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
            </div>
            {r.strength === "close" && (
              <p className="mt-1 text-xs text-mist">
                {t.dimensionBars.closeNote}
              </p>
            )}
          </div>
        );
      })}
      <p className="text-xs leading-relaxed text-mist">
        {t.dimensionBars.footnote}
      </p>
    </div>
  );
}
