// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_OPTOUT_KEY,
  buildPayload,
  isAnalyticsConfigured,
  setAnalyticsOptOut,
  track,
} from "../analytics";

interface AnalyticsGlobal {
  __PA64_ANALYTICS_ENDPOINT__?: string;
}

const g = globalThis as AnalyticsGlobal;

let beaconCalls: Array<{ url: string; body: Blob }> = [];

beforeEach(() => {
  window.localStorage.clear();
  beaconCalls = [];
  Object.defineProperty(navigator, "sendBeacon", {
    configurable: true,
    writable: true,
    value: (url: string, body: Blob) => {
      beaconCalls.push({ url, body });
      return true;
    },
  });
  delete g.__PA64_ANALYTICS_ENDPOINT__;
});

afterEach(() => {
  delete g.__PA64_ANALYTICS_ENDPOINT__;
  vi.unstubAllGlobals();
});

describe("匿名統計", () => {
  it("未設定端點時完全不送出（預設隱私）", () => {
    expect(isAnalyticsConfigured()).toBe(false);
    expect(track("test_started", "zh-TW")).toBe(false);
    expect(beaconCalls.length).toBe(0);
  });

  it("設定端點後以 sendBeacon 送出極簡 payload", async () => {
    g.__PA64_ANALYTICS_ENDPOINT__ = "https://stats.example.com/e";
    expect(isAnalyticsConfigured()).toBe(true);
    expect(track("test_completed", "en")).toBe(true);
    expect(beaconCalls.length).toBe(1);
    expect(beaconCalls[0].url).toBe("https://stats.example.com/e");
    const json = JSON.parse(await new Response(beaconCalls[0].body).text());
    expect(json).toEqual({ event: "test_completed", locale: "en", v: 1 });
  });

  it("payload 白名單：不含識別碼、作答內容或結果代碼欄位", () => {
    const payload = buildPayload("result_shared", "zh-TW");
    expect(Object.keys(payload).sort()).toEqual(["event", "locale", "v"]);
  });

  it("本機退出旗標會停用統計", () => {
    g.__PA64_ANALYTICS_ENDPOINT__ = "https://stats.example.com/e";
    setAnalyticsOptOut(true);
    expect(window.localStorage.getItem(ANALYTICS_OPTOUT_KEY)).toBe("1");
    expect(track("test_started", "zh-TW")).toBe(false);
    expect(beaconCalls.length).toBe(0);
    setAnalyticsOptOut(false);
    expect(track("test_started", "zh-TW")).toBe(true);
  });

  it("尊重 Do Not Track", () => {
    g.__PA64_ANALYTICS_ENDPOINT__ = "https://stats.example.com/e";
    Object.defineProperty(navigator, "doNotTrack", {
      configurable: true,
      get: () => "1",
    });
    expect(track("test_started", "zh-TW")).toBe(false);
    expect(beaconCalls.length).toBe(0);
    Object.defineProperty(navigator, "doNotTrack", {
      configurable: true,
      get: () => undefined,
    });
  });

  it("sendBeacon 不存在時退回 fetch keepalive，且失敗不拋錯", () => {
    g.__PA64_ANALYTICS_ENDPOINT__ = "https://stats.example.com/e";
    Object.defineProperty(navigator, "sendBeacon", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    expect(track("compare_used", "zh-CN")).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://stats.example.com/e");
    expect(init.keepalive).toBe(true);
  });
});
