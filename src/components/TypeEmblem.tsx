/**
 * 類型抽象徽章：依六字母代碼以固定規則產生的原創幾何圖形（同代碼永遠相同）。
 *
 * 每個字母對應一個肉眼可辨的特徵，64 型組合出 64 張明顯不同的徽章：
 * - E / I：太陽（帶光芒）vs 彎月＋小星
 * - S / N：山坡上的健行小徑 vs 天空中的星座連線
 * - T / F：山體深墨色 vs 柔和藍綠色
 * - J / P：尖銳稜角山形 vs 圓潤丘陵曲線
 * - A / O：峰頂的琥珀旗幟 vs 山腳的倒影湖
 * - H / C：暖色天空 vs 冰藍天空
 */
export function TypeEmblem({
  code,
  ariaLabel,
}: {
  code: string;
  ariaLabel?: string;
}) {
  const letters = code.replace("-", "");
  const isE = letters[0] === "E";
  const isS = letters[1] === "S";
  const isT = letters[2] === "T";
  const isJ = letters[3] === "J";
  const isA = letters[4] === "A";
  const isH = letters[5] === "H";

  const skyColor = isH ? "#fbe3b5" : "#eaf4fa";
  const frontColor = isT ? "#0e4a5a" : "#2d6b7d";
  const backColor = isT ? "#9cc4dd" : "#cfe6f2";

  // 山形：J 尖銳稜角、P 圓潤丘陵（主峰頂點供旗幟定位）
  const peak: [number, number] = isJ ? [74, 38] : [74, 52];
  const frontPath = isJ
    ? "M-6 120 L16 94 L36 60 L54 90 L74 38 L94 92 L112 68 L146 120 Z"
    : "M-6 120 C8 88 28 80 44 90 C58 98 60 64 74 52 C88 64 90 98 106 88 C122 80 134 102 146 120 Z";
  const backPath = isJ
    ? "M-6 104 L24 70 L44 92 L76 56 L104 94 L124 74 L146 100 L146 120 L-6 120 Z"
    : "M-6 106 C14 82 34 88 52 96 C72 74 88 72 104 90 C120 100 134 88 146 98 L146 120 L-6 120 Z";

  // 微變化：星點位置由字母組合決定（固定可重現）
  const seed = (i: number) =>
    (letters.charCodeAt(i % 6) * 7 + letters.charCodeAt((i + 2) % 6) * 13 + i * 29) %
    100;

  return (
    <svg
      viewBox="0 0 140 120"
      role="img"
      aria-label={ariaLabel ?? `${code} 類型徽章`}
    >
      <defs>
        <clipPath id={`emblem-clip-${code}`}>
          <rect x="4" y="4" width="132" height="112" rx="16" />
        </clipPath>
      </defs>
      <rect
        x="4"
        y="4"
        width="132"
        height="112"
        rx="16"
        fill={skyColor}
        stroke="#0e4a5a"
        strokeWidth="2.5"
      />
      <g clipPath={`url(#emblem-clip-${code})`}>
        {/* E：太陽與光芒 / I：彎月與小星 */}
        {isE ? (
          <g data-f="sun">
            <circle cx="106" cy="30" r="11" fill="#f2a93b" />
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * Math.PI) / 4;
              const x1 = 106 + Math.cos(angle) * 14;
              const y1 = 30 + Math.sin(angle) * 14;
              const x2 = 106 + Math.cos(angle) * 19;
              const y2 = 30 + Math.sin(angle) * 19;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#f2a93b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        ) : (
          <g data-f="moon">
            <path
              d="M112 19 A12 12 0 1 0 118 40 A9.5 9.5 0 1 1 112 19 Z"
              fill="#f2a93b"
            />
            <circle cx={88 + (seed(0) % 10)} cy={16 + (seed(1) % 8)} r="1.6" fill="#7fb6d4" />
            <circle cx={122 + (seed(2) % 8)} cy={44 + (seed(3) % 6)} r="1.4" fill="#7fb6d4" />
          </g>
        )}

        {/* N：星座連線（抽象模式） */}
        {!isS && (
          <g data-f="constellation">
            {(() => {
              const pts: Array<[number, number]> = [
                [18 + (seed(0) % 12), 20 + (seed(1) % 10)],
                [38 + (seed(2) % 10), 12 + (seed(3) % 10)],
                [56 + (seed(4) % 10), 24 + (seed(5) % 10)],
                [70 + (seed(1) % 8), 14 + (seed(2) % 8)],
              ];
              return (
                <>
                  <polyline
                    points={pts.map((p) => p.join(",")).join(" ")}
                    fill="none"
                    stroke="#7fb6d4"
                    strokeWidth="1.2"
                  />
                  {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2.4 : 1.8} fill="#5b9cc0" />
                  ))}
                </>
              );
            })()}
          </g>
        )}

        {/* 山景 */}
        <path d={backPath} fill={backColor} data-f={isJ ? "sharp" : "round"} />
        <path d={frontPath} fill={frontColor} />
        {/* 雪頂 */}
        <path
          d={`M${peak[0]} ${peak[1]} L${peak[0] + 10} ${peak[1] + 16} L${peak[0] + 4} ${peak[1] + 13} L${peak[0]} ${peak[1] + 21} L${peak[0] - 4} ${peak[1] + 13} L${peak[0] - 10} ${peak[1] + 16} Z`}
          fill="white"
          opacity="0.9"
        />

        {/* S：健行小徑（具體模式） */}
        {isS && (
          <polyline
            data-f="trail"
            points={`30,114 44,${102 + (seed(0) % 4)} 56,${106 + (seed(1) % 4)} 66,${peak[1] + 34} ${peak[0] - 2},${peak[1] + 24}`}
            fill="none"
            stroke="#f2a93b"
            strokeWidth="2.2"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        )}

        {/* A：峰頂旗幟 / O：山腳倒影湖 */}
        {isA ? (
          <g data-f="flag">
            <line
              x1={peak[0]}
              y1={peak[1]}
              x2={peak[0]}
              y2={peak[1] - 15}
              stroke="#093542"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={`M${peak[0]} ${peak[1] - 15} L${peak[0] + 13} ${peak[1] - 11} L${peak[0]} ${peak[1] - 7} Z`}
              fill="#f2a93b"
            />
          </g>
        ) : (
          <g data-f="lake">
            <ellipse cx="70" cy="109" rx="36" ry="8" fill="#8fc3de" opacity="0.9" />
            <path
              d={`M${peak[0] - 10} 109 L${peak[0]} ${109 - 6} L${peak[0] + 10} 109 Z`}
              fill="white"
              opacity="0.5"
            />
            <line
              x1="46"
              y1="112"
              x2="94"
              y2="112"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.7"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
