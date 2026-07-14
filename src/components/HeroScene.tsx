/**
 * 首頁原創 SVG 場景：冰藍山景 + 星圖 + 營火旁聚集的抽象人物。
 * 完全以幾何圖形手繪，不使用任何外部圖片素材。
 */
export function HeroScene() {
  return (
    <svg
      viewBox="0 0 960 420"
      role="img"
      aria-label="冰藍色的山景下，一群抽象的旅人圍著營火，天上有星圖與羅盤"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaf4fa" />
        </linearGradient>
        <linearGradient id="fire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d98f1f" />
          <stop offset="100%" stopColor="#f8c96a" />
        </linearGradient>
      </defs>

      <rect width="960" height="420" fill="url(#sky)" />

      {/* 星圖：以線相連的星點（64 型的探索地圖意象） */}
      <g stroke="#b3d7e8" strokeWidth="1">
        <line x1="120" y1="70" x2="210" y2="45" />
        <line x1="210" y1="45" x2="300" y2="90" />
        <line x1="300" y1="90" x2="395" y2="60" />
        <line x1="640" y1="55" x2="730" y2="85" />
        <line x1="730" y1="85" x2="820" y2="50" />
      </g>
      <g fill="#7fb6d4">
        {[
          [120, 70],
          [210, 45],
          [300, 90],
          [395, 60],
          [520, 40],
          [640, 55],
          [730, 85],
          [820, 50],
          [890, 100],
          [70, 120],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.5 : 2.5} />
        ))}
      </g>

      {/* 羅盤 */}
      <g transform="translate(848, 148)">
        <circle
          r="34"
          fill="white"
          stroke="#0e4a5a"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <path d="M0 -22 L7 0 L0 22 L-7 0 Z" fill="#f2a93b" />
        <circle r="4" fill="#0e4a5a" />
        <g stroke="#5b7280" strokeWidth="1.5">
          <line x1="0" y1="-30" x2="0" y2="-26" />
          <line x1="0" y1="26" x2="0" y2="30" />
          <line x1="-30" y1="0" x2="-26" y2="0" />
          <line x1="26" y1="0" x2="30" y2="0" />
        </g>
      </g>

      {/* 遠山（冰藍層疊） */}
      <path
        d="M0 300 L110 190 L200 265 L305 160 L420 285 L470 250 L560 300 Z"
        fill="#cfe6f2"
      />
      <path
        d="M380 300 L520 175 L610 250 L700 150 L830 280 L900 235 L960 300 Z"
        fill="#b3d7e8"
      />
      {/* 山頂雪線 */}
      <path
        d="M305 160 L340 200 L322 196 L305 214 L288 196 L272 200 Z"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M700 150 L732 192 L716 188 L700 205 L684 188 L668 192 Z"
        fill="white"
        opacity="0.85"
      />

      {/* 地面 */}
      <rect y="298" width="960" height="122" fill="#eaf4fa" />
      <ellipse cx="480" cy="330" rx="330" ry="26" fill="#dcedf6" />

      {/* 營火 */}
      <g transform="translate(480, 330)">
        <line
          x1="-16"
          y1="12"
          x2="16"
          y2="2"
          stroke="#8a6d3b"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="-16"
          y1="2"
          x2="16"
          y2="12"
          stroke="#a5854e"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M0 -34 C10 -20 16 -12 16 -2 A16 16 0 0 1 -16 -2 C-16 -12 -10 -20 0 -34 Z"
          fill="url(#fire)"
        />
        <path
          d="M0 -18 C5 -10 8 -7 8 -1 A8 8 0 0 1 -8 -1 C-8 -7 -5 -10 0 -18 Z"
          fill="#fdf0d5"
        />
      </g>

      {/* 抽象人物：圍著營火的旅人（圓頭＋斗篷形身體） */}
      <g fill="#0e4a5a">
        <g transform="translate(388, 322)">
          <circle cx="0" cy="-26" r="10" />
          <path d="M-14 12 C-14 -10 14 -10 14 12 Z" />
        </g>
        <g transform="translate(432, 342)" fill="#2d6b7d">
          <circle cx="0" cy="-24" r="9" />
          <path d="M-13 10 C-13 -9 13 -9 13 10 Z" />
        </g>
        <g transform="translate(552, 320)" fill="#2d6b7d">
          <circle cx="0" cy="-26" r="10" />
          <path d="M-14 12 C-14 -10 14 -10 14 12 Z" />
        </g>
        <g transform="translate(524, 344)">
          <circle cx="0" cy="-24" r="9" />
          <path d="M-13 10 C-13 -9 13 -9 13 10 Z" />
        </g>
        {/* 一位正走向營火的旅人（探索者） */}
        <g transform="translate(650, 335)" fill="#5b7280">
          <circle cx="0" cy="-28" r="9" />
          <path d="M-11 10 C-13 -8 11 -12 11 8 L6 10 L2 -2 L-4 12 Z" />
          <line
            x1="8"
            y1="-16"
            x2="16"
            y2="10"
            stroke="#8a6d3b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
