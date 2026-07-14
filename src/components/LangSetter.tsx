"use client";

import { useEffect } from "react";

/**
 * 靜態輸出下 <html lang> 由根 layout 固定為 zh-Hant-TW；
 * 前綴語系頁面掛載後修正 document 的 lang 屬性。
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "zh-Hant-TW";
    };
  }, [lang]);
  return null;
}
