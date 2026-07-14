import { DIMENSION_META, DIMENSION_ORDER } from "@/lib/dimensions";
import { STRENGTH_LABEL, dimensionResult } from "@/lib/scoring";
import type { DimensionScores } from "@/lib/types";

/** 六維度百分比橫條圖（百分比代表作答傾向，不是人格純度） */
export function DimensionBars({ scores }: { scores: DimensionScores }) {
  return (
    <div className="space-y-5">
      {DIMENSION_ORDER.map((d) => {
        const meta = DIMENSION_META[d];
        const r = dimensionResult(d, scores[d]);
        const firstActive = r.score >= 0;
        return (
          <div key={d}>
            <div className="flex items-baseline justify-between text-sm">
              <span
                className={`font-bold ${firstActive ? "text-ink-deep" : "text-mist"}`}
              >
                {meta.first}・{meta.firstName} {r.firstPercent}%
              </span>
              <span className="text-xs text-mist">
                {meta.title}
                {meta.custom && "＊"}・{STRENGTH_LABEL[r.strength]}
              </span>
              <span
                className={`font-bold ${!firstActive ? "text-ink-deep" : "text-mist"}`}
              >
                {r.secondPercent}% {meta.second}・{meta.secondName}
              </span>
            </div>
            <div
              className="relative mt-1.5 h-4 overflow-hidden rounded-full bg-ice"
              role="img"
              aria-label={`${meta.title}：${meta.first} ${r.firstPercent}%，${meta.second} ${r.secondPercent}%，${STRENGTH_LABEL[r.strength]}`}
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
                兩側偏好接近：這個維度上，你可能依情境靈活切換。
              </p>
            )}
          </div>
        );
      })}
      <p className="text-xs leading-relaxed text-mist">
        ＊AO 與 HC 為本站自訂探索維度，非官方 MBTI
        構面。百分比代表本次作答的傾向強度，不是人格純度，也不是準確率。
      </p>
    </div>
  );
}
