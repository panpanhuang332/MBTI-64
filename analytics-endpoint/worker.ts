/**
 * 人格座標 64 — 匿名統計端點參考實作（Cloudflare Workers + KV）
 *
 * 與前端 src/lib/analytics.ts 成對使用：
 *   NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://<worker 網域>/
 *
 * 隱私設計：
 * - 只接受白名單事件與語系，payload 欄位必須恰好是 {event, locale, v}
 * - 不記錄、不讀取 IP、User-Agent、Cookie 或任何請求中介資料
 * - 只保存「日期 × 事件 × 語系」的計數器
 *
 * 已知限制：KV 沒有原子遞增，高併發下 read-modify-write 可能少算；
 * 對「了解完測率」的量級足夠。需要精確計數請改用 Durable Objects。
 */

/** KV 介面（避免依賴 @cloudflare/workers-types，也方便單元測試替身） */
export interface KVLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  list(options: {
    prefix: string;
    cursor?: string;
  }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
    cursor?: string;
  }>;
}

export interface Env {
  /** KV namespace binding（見 wrangler.toml） */
  EVENTS: KVLike;
  /** GET /stats 的存取權杖；未設定時 /stats 一律 404 */
  STATS_TOKEN?: string;
  /** 限制 CORS 來源（建議設成你的網站網域）；未設定時為 "*" */
  ALLOWED_ORIGIN?: string;
}

const ALLOWED_EVENTS = new Set([
  "test_started",
  "test_completed",
  "result_shared",
  "compare_used",
]);

const ALLOWED_LOCALES = new Set(["zh-TW", "zh-CN", "en"]);

const MAX_BODY_BYTES = 256;
const KEY_PREFIX = "c:"; // c:<YYYY-MM-DD>:<event>:<locale>

function corsHeaders(env: Env): Record<string, string> {
  return {
    "access-control-allow-origin": env.ALLOWED_ORIGIN ?? "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };
}

function response(
  env: Env,
  status: number,
  body?: unknown
): Response {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(env),
      ...(body !== undefined
        ? { "content-type": "application/json" }
        : {}),
    },
  });
}

/** 驗證並解析事件 payload；非法回傳 null */
export function parseEventPayload(
  raw: string
): { event: string; locale: string } | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return null;
  }
  const obj = data as Record<string, unknown>;
  // 欄位必須恰好是 {event, locale, v}（白名單，拒絕任何多餘欄位）
  const keys = Object.keys(obj).sort();
  if (keys.join(",") !== "event,locale,v") return null;
  if (obj.v !== 1) return null;
  if (typeof obj.event !== "string" || !ALLOWED_EVENTS.has(obj.event)) {
    return null;
  }
  if (typeof obj.locale !== "string" || !ALLOWED_LOCALES.has(obj.locale)) {
    return null;
  }
  return { event: obj.event, locale: obj.locale };
}

async function handleEvent(request: Request, env: Env): Promise<Response> {
  const raw = await request.text();
  if (raw.length === 0 || raw.length > MAX_BODY_BYTES) {
    return response(env, 400, { error: "invalid body" });
  }
  const payload = parseEventPayload(raw);
  if (!payload) {
    return response(env, 400, { error: "invalid payload" });
  }
  const day = new Date().toISOString().slice(0, 10);
  const key = `${KEY_PREFIX}${day}:${payload.event}:${payload.locale}`;
  const current = parseInt((await env.EVENTS.get(key)) ?? "0", 10) || 0;
  await env.EVENTS.put(key, String(current + 1));
  return response(env, 204);
}

interface Stats {
  totals: Record<string, number>;
  byDay: Record<string, Record<string, Record<string, number>>>;
  completionRate: number | null;
}

async function aggregate(kv: KVLike): Promise<Stats> {
  const totals: Stats["totals"] = {};
  const byDay: Stats["byDay"] = {};
  let cursor: string | undefined;
  do {
    const page = await kv.list({ prefix: KEY_PREFIX, cursor });
    for (const { name } of page.keys) {
      const [, day, event, locale] = name.split(":");
      if (!day || !event || !locale) continue;
      const count = parseInt((await kv.get(name)) ?? "0", 10) || 0;
      totals[event] = (totals[event] ?? 0) + count;
      byDay[day] ??= {};
      byDay[day][event] ??= {};
      byDay[day][event][locale] =
        (byDay[day][event][locale] ?? 0) + count;
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  const started = totals["test_started"] ?? 0;
  const completed = totals["test_completed"] ?? 0;
  return {
    totals,
    byDay,
    completionRate:
      started > 0 ? Math.round((completed / started) * 1000) / 1000 : null,
  };
}

async function handleStats(request: Request, env: Env): Promise<Response> {
  if (!env.STATS_TOKEN) return response(env, 404);
  const url = new URL(request.url);
  const token =
    url.searchParams.get("token") ??
    (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (token !== env.STATS_TOKEN) return response(env, 401);
  return response(env, 200, await aggregate(env.EVENTS));
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return response(env, 204);
    }
    if (request.method === "POST" && url.pathname === "/") {
      return handleEvent(request, env);
    }
    if (request.method === "GET" && url.pathname === "/stats") {
      return handleStats(request, env);
    }
    return response(env, 404);
  },
};

export default worker;
