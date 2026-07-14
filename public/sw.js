/**
 * 人格座標 64 — Service Worker（PWA 離線快取）
 *
 * 策略：
 * - 導覽請求（HTML）：network-first，離線時退回快取，再退回首頁殼
 * - 靜態資產（/_next/static、/og、圖示）：cache-first（檔名帶 hash，不會過期）
 * - 只處理同源 GET；統計 beacon 等 POST 一律放行
 *
 * 改版：調整 CACHE_VERSION 會在 activate 時清掉舊快取。
 */
const CACHE_VERSION = "pa64-v1";
const CACHE_NAME = `${CACHE_VERSION}-runtime`;

/** 安裝時預快取的核心頁面（其餘頁面於瀏覽時寫入） */
const PRECACHE_URLS = [
  "/",
  "/test",
  "/test/questions",
  "/test/calculating",
  "/result",
  "/types",
  "/compare",
  "/icon.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/og/") ||
    url.pathname === "/icon.svg" ||
    url.pathname === "/favicon.ico"
  );
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // 離線且沒快取過這一頁：退回首頁殼（client-side 路由仍可運作）
    const shell = await caches.match("/");
    if (shell) return shell;
    return new Response("Offline", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (
    request.mode === "navigate" ||
    (request.headers.get("accept") ?? "").includes("text/html")
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 其他同源 GET（RSC payload、字型等）：network-first 亦可離線退回
  event.respondWith(networkFirst(request));
});
