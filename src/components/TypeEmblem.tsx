/**
 * 類型抽象圖形：依六字母代碼以固定規則產生的原創幾何徽章
 * （山形、星點、光暈隨字母變化，同代碼永遠相同）。
 */
export function TypeEmblem({ code }: { code: string }) {
  const letters = code.replace("-", "");
  const isE = letters[0] === "E";
  const isS = letters[1] === "S";
  const isT = letters[2] === "T";
  const isJ = letters[3] === "J";
  const isA = letters[4] === "A";
  const isH = letters[5] === "H";

  // 由字母組合決定圖形參數（固定規則，可重現）
  const skyColor = isH ? "#fbe3b5" : "#eaf4fa";
  const mountainColor = isT ? "#0e4a5a" : "#2d6b7d";
  const backMountainColor = isS ? "#b3d7e8" : "#cfe6f2";
  const peakX = isJ ? 60 : 74;
  const backPeakX = isJ ? 100 : 86;
  const starCount = isE ? 5 : 3;
  const sunY = isA ? 38 : 52;

  const stars = Array.from({ length: starCount }, (_, i) => ({
    x: 18 + ((i * 97 + letters.charCodeAt(i % 6) * 7) % 104),
    y: 14 + ((i * 53 + letters.charCodeAt((i + 1) % 6) * 5) % 30),
  }));

  return (
    <svg viewBox="0 0 140 120" role="img" aria-label={`${code} 類型徽章`}>
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
        {/* 日／月：A 型高掛（前進），O 型低垂（沉思） */}
        <circle cx={isE ? 104 : 36} cy={sunY} r="12" fill="#f2a93b" />
        {/* 星點 */}
        <g fill="#7fb6d4">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={i % 2 === 0 ? 2.6 : 1.8} />
          ))}
        </g>
        {/* 後山 */}
        <path
          d={`M0 96 L${backPeakX - 34} 58 L${backPeakX} 44 L${backPeakX + 30} 76 L140 62 L140 120 L0 120 Z`}
          fill={backMountainColor}
        />
        {/* 前山 */}
        <path
          d={`M-8 120 L${peakX - 38} 74 L${peakX} 34 L${peakX + 42} 88 L108 72 L148 120 Z`}
          fill={mountainColor}
        />
        {/* 雪頂 */}
        <path
          d={`M${peakX} 34 L${peakX + 12} 52 L${peakX + 4} 49 L${peakX} 58 L${peakX - 5} 49 L${peakX - 11} 52 Z`}
          fill="white"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}
