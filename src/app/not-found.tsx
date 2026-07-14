import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-ice-deep">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-deep">
        這條路不在地圖上
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        你要找的頁面不存在，或連結已失效。
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="min-h-12 rounded-full bg-amber px-6 py-3 font-bold text-ink-deep hover:bg-amber-deep"
        >
          回到首頁
        </Link>
        <Link
          href="/test"
          className="min-h-12 rounded-full border-2 border-ice-deep px-6 py-3 font-semibold text-ink hover:border-ink-soft"
        >
          開始測驗
        </Link>
      </div>
    </div>
  );
}
