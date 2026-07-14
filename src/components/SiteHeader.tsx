import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/test", label: "開始測驗" },
  { href: "/types", label: "全部類型" },
  { href: "/methodology", label: "方法說明" },
  { href: "/about", label: "關於" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ice-deep/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-ink"
          aria-label="人格座標 64 首頁"
        >
          <CompassMark />
          <span className="text-base sm:text-lg">{SITE_NAME}</span>
        </Link>
        <nav aria-label="主要導覽">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm text-ink-soft hover:bg-ice hover:text-ink sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function CompassMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="14"
        cy="14"
        r="12"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <path d="M14 5 L17 14 L14 23 L11 14 Z" fill="var(--color-amber)" />
      <circle cx="14" cy="14" r="2" fill="var(--color-ink)" />
    </svg>
  );
}
