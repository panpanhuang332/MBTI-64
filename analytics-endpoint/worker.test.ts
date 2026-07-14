import { beforeEach, describe, expect, it } from "vitest";
import worker, { parseEventPayload, type Env, type KVLike } from "./worker";

/** 記憶體 KV 替身 */
function memoryKV(): KVLike & { store: Map<string, string> } {
  const store = new Map<string, string>();
  return {
    store,
    async get(key) {
      return store.get(key) ?? null;
    },
    async put(key, value) {
      store.set(key, value);
    },
    async list({ prefix }) {
      return {
        keys: [...store.keys()]
          .filter((k) => k.startsWith(prefix))
          .map((name) => ({ name })),
        list_complete: true,
      };
    },
  };
}

let kv: ReturnType<typeof memoryKV>;
let env: Env;

beforeEach(() => {
  kv = memoryKV();
  env = { EVENTS: kv, STATS_TOKEN: "secret" };
});

function post(body: unknown): Request {
  return new Request("https://stats.example.com/", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const VALID = { event: "test_started", locale: "zh-TW", v: 1 };

describe("parseEventPayload", () => {
  it("接受合法 payload", () => {
    expect(parseEventPayload(JSON.stringify(VALID))).toEqual({
      event: "test_started",
      locale: "zh-TW",
    });
  });

  it("拒絕多餘欄位（白名單）", () => {
    expect(
      parseEventPayload(JSON.stringify({ ...VALID, userId: "abc" }))
    ).toBeNull();
    expect(
      parseEventPayload(JSON.stringify({ ...VALID, ip: "1.2.3.4" }))
    ).toBeNull();
  });

  it("拒絕未知事件、未知語系、錯誤版本與非 JSON", () => {
    expect(
      parseEventPayload(JSON.stringify({ ...VALID, event: "page_view" }))
    ).toBeNull();
    expect(
      parseEventPayload(JSON.stringify({ ...VALID, locale: "fr" }))
    ).toBeNull();
    expect(
      parseEventPayload(JSON.stringify({ ...VALID, v: 2 }))
    ).toBeNull();
    expect(parseEventPayload("not-json")).toBeNull();
    expect(parseEventPayload("[1,2]")).toBeNull();
  });
});

describe("worker fetch", () => {
  it("合法事件回 204 並遞增當日計數", async () => {
    const res1 = await worker.fetch(post(VALID), env);
    expect(res1.status).toBe(204);
    const res2 = await worker.fetch(post(VALID), env);
    expect(res2.status).toBe(204);

    const day = new Date().toISOString().slice(0, 10);
    expect(kv.store.get(`c:${day}:test_started:zh-TW`)).toBe("2");
  });

  it("非法 payload 回 400，不寫入", async () => {
    const res = await worker.fetch(post({ event: "hack" }), env);
    expect(res.status).toBe(400);
    expect(kv.store.size).toBe(0);
  });

  it("過大的 body 回 400", async () => {
    const res = await worker.fetch(post("x".repeat(500)), env);
    expect(res.status).toBe(400);
  });

  it("OPTIONS 預檢回 CORS 標頭", async () => {
    const res = await worker.fetch(
      new Request("https://stats.example.com/", { method: "OPTIONS" }),
      env
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
  });

  it("ALLOWED_ORIGIN 限制 CORS 來源", async () => {
    const res = await worker.fetch(post(VALID), {
      ...env,
      ALLOWED_ORIGIN: "https://example.com",
    });
    expect(res.headers.get("access-control-allow-origin")).toBe(
      "https://example.com"
    );
  });

  it("/stats 需要正確 token", async () => {
    expect(
      (
        await worker.fetch(
          new Request("https://stats.example.com/stats"),
          env
        )
      ).status
    ).toBe(401);
    expect(
      (
        await worker.fetch(
          new Request("https://stats.example.com/stats?token=wrong"),
          env
        )
      ).status
    ).toBe(401);
    // 未設定 STATS_TOKEN 時一律 404
    expect(
      (
        await worker.fetch(
          new Request("https://stats.example.com/stats?token=secret"),
          { EVENTS: kv }
        )
      ).status
    ).toBe(404);
  });

  it("/stats 彙總計數並計算完測率", async () => {
    for (let i = 0; i < 4; i++) await worker.fetch(post(VALID), env);
    for (let i = 0; i < 3; i++) {
      await worker.fetch(
        post({ event: "test_completed", locale: "en", v: 1 }),
        env
      );
    }
    await worker.fetch(
      post({ event: "result_shared", locale: "zh-CN", v: 1 }),
      env
    );

    const res = await worker.fetch(
      new Request("https://stats.example.com/stats?token=secret"),
      env
    );
    expect(res.status).toBe(200);
    const stats = await res.json();
    expect(stats.totals).toEqual({
      test_started: 4,
      test_completed: 3,
      result_shared: 1,
    });
    expect(stats.completionRate).toBe(0.75);
    const day = new Date().toISOString().slice(0, 10);
    expect(stats.byDay[day].test_completed.en).toBe(3);
  });

  it("其他路徑與方法回 404", async () => {
    expect(
      (
        await worker.fetch(
          new Request("https://stats.example.com/other", { method: "POST" }),
          env
        )
      ).status
    ).toBe(404);
    expect(
      (
        await worker.fetch(
          new Request("https://stats.example.com/", { method: "GET" }),
          env
        )
      ).status
    ).toBe(404);
  });
});
