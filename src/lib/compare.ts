import type { Dimension } from "./types";
import { DIMENSION_ORDER } from "./dimensions";
import { isValidCode } from "./scoring";
import { getBundle } from "./i18n";
import { DEFAULT_LOCALE, type Locale } from "./i18n/locales";

/**
 * 「與朋友類型對照」：以兩個六字母代碼做維度層級的對照。
 * 原則（見 CONTENT_GUIDE.md）：
 * - 只描述差異與相似，不打「契合度分數」、不做伴侶／合作適配結論
 * - 差異被框成「值得聊聊的地方」，不是問題
 */

/**
 * 從使用者輸入取出六字母代碼。
 * 接受：純代碼（大小寫不拘）、結果分享網址（?c=）、類型頁網址（/types/CODE）。
 */
export function extractCode(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  // 1) 純代碼
  const direct = raw.toUpperCase();
  if (isValidCode(direct)) return direct;

  // 2) 網址：?c= 參數或 /types/CODE 路徑
  try {
    const url = new URL(raw);
    const fromQuery = url.searchParams.get("c")?.toUpperCase() ?? "";
    if (isValidCode(fromQuery)) return fromQuery;
    const match = url.pathname.match(/\/types\/([A-Za-z]{4}-[A-Za-z]{2})/);
    if (match && isValidCode(match[1].toUpperCase())) {
      return match[1].toUpperCase();
    }
  } catch {
    // 不是合法網址：繼續嘗試從文字中撈代碼
  }

  // 3) 從任意文字中比對代碼樣式
  const inline = raw.toUpperCase().match(/[EI][SN][TF][JP]-[AO][HC]/);
  if (inline && isValidCode(inline[0])) return inline[0];

  return null;
}

export interface DimensionComparison {
  dimension: Dimension;
  title: string;
  letterA: string;
  letterB: string;
  same: boolean;
  /** 兩人各自偏好的簡述 */
  descriptionA: string;
  descriptionB: string;
  /** 差異時值得討論的問題；相同時為共鳴提示 */
  talkPrompt: string;
}

export function compareDimensions(
  codeA: string,
  codeB: string,
  locale: Locale = DEFAULT_LOCALE
): DimensionComparison[] {
  const t = getBundle(locale);
  const colon = locale === "en" ? ": " : "：";
  const lettersA = codeA.replace("-", "");
  const lettersB = codeB.replace("-", "");

  return DIMENSION_ORDER.map((d, i) => {
    const meta = t.dimensions[d];
    const letterA = lettersA[i];
    const letterB = lettersB[i];
    const same = letterA === letterB;
    const describe = (letter: string) =>
      letter === meta.first
        ? `${meta.firstName}${colon}${meta.firstDescription}`
        : `${meta.secondName}${colon}${meta.secondDescription}`;
    return {
      dimension: d,
      title: meta.title,
      letterA,
      letterB,
      same,
      descriptionA: describe(letterA),
      descriptionB: describe(letterB),
      talkPrompt: same
        ? t.compare.promptsSame[d]
        : t.compare.promptsDifferent[d],
    };
  });
}

export function sameCount(comparisons: DimensionComparison[]): number {
  return comparisons.filter((c) => c.same).length;
}
