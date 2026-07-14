"use client";

/**
 * 輕量匿名統計（隱私優先，預設關閉）。
 *
 * 原則：
 * - 未設定 NEXT_PUBLIC_ANALYTICS_ENDPOINT 時完全不送出任何資料（預設）
 * - 尊重瀏覽器 Do Not Track 與本機退出旗標（pa64.analytics.optout = "1"）
 * - 事件內容極簡：事件名稱、語系、schema 版本——
 *   沒有識別碼、沒有 cookie、沒有作答內容、沒有人格結果代碼、沒有網址參數
 * - 用途：了解「開始測驗 → 完成測驗」的完測率與功能使用量
 */

export type AnalyticsEvent =
  | "test_started"
  | "test_completed"
  | "result_shared"
  | "compare_used";

export const ANALYTICS_OPTOUT_KEY = "pa64.analytics.optout";

interface AnalyticsGlobal {
  __PA64_ANALYTICS_ENDPOINT__?: string;
}

function endpoint(): string | undefined {
  // 測試可透過 globalThis 覆寫；正式環境由 build 時的環境變數決定
  const fromGlobal = (globalThis as AnalyticsGlobal)
    .__PA64_ANALYTICS_ENDPOINT__;
  return fromGlobal ?? process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? undefined;
}

function optedOut(): boolean {
  try {
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") {
      return true;
    }
    return window.localStorage.getItem(ANALYTICS_OPTOUT_KEY) === "1";
  } catch {
    return true; // 無法確認時寧可不送
  }
}

/** 允許的欄位白名單：確保 payload 永遠極簡（防止未來誤加個資欄位） */
export interface AnalyticsPayload {
  event: AnalyticsEvent;
  locale: string;
  v: 1;
}

export function buildPayload(
  event: AnalyticsEvent,
  locale: string
): AnalyticsPayload {
  return { event, locale, v: 1 };
}

/**
 * 送出匿名事件。失敗時靜默——統計永遠不能影響功能。
 * @returns 是否實際送出（供測試驗證）
 */
export function track(event: AnalyticsEvent, locale: string): boolean {
  const url = endpoint();
  if (!url) return false;
  if (typeof window === "undefined") return false;
  if (optedOut()) return false;

  const body = JSON.stringify(buildPayload(event, locale));
  try {
    if (navigator.sendBeacon) {
      return navigator.sendBeacon(
        url,
        new Blob([body], { type: "application/json" })
      );
    }
    void fetch(url, {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
      keepalive: true,
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

export function setAnalyticsOptOut(optOut: boolean): void {
  try {
    if (optOut) {
      window.localStorage.setItem(ANALYTICS_OPTOUT_KEY, "1");
    } else {
      window.localStorage.removeItem(ANALYTICS_OPTOUT_KEY);
    }
  } catch {
    // ignore
  }
}

export function isAnalyticsConfigured(): boolean {
  return endpoint() !== undefined;
}
