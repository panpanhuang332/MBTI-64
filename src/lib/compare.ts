import type { Dimension } from "./types";
import { DIMENSION_META, DIMENSION_ORDER } from "./dimensions";
import { isValidCode } from "./scoring";

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

const TALK_PROMPTS_DIFFERENT: Record<Dimension, string> = {
  EI: "聊聊看：忙碌的一週結束後，你們各自靠什麼恢復能量？對方的方式你能配合到什麼程度？",
  SN: "聊聊看：規劃一件事時，一個人想先看細節、一個人想先談方向——你們通常誰先讓步？",
  TF: "聊聊看：上次意見不合時，你們各自最在意的是「道理」還是「感受」？當時對方接住了嗎？",
  JP: "聊聊看：臨時改變計畫時，你們的第一反應差多少？什麼樣的提前告知對彼此最友善？",
  AO: "聊聊看：做決定的節奏一快一慢時，快的一方怎麼等、慢的一方怎麼給進度，會讓彼此都安心？",
  HC: "聊聊看：你們表達在乎的方式不同——一個外顯、一個內斂。各自最希望對方怎麼接收？",
};

const TALK_PROMPTS_SAME: Record<Dimension, string> = {
  EI: "你們在能量來源上相似，相處節奏容易同步；偶爾留意是否需要有人主動打破同溫層。",
  SN: "你們接收資訊的方式相似，溝通省力；做重要決定時，記得補上另一種視角。",
  TF: "你們的決策依據相似，容易有共識；小心一起忽略掉另一種考量。",
  JP: "你們的生活節奏相似，計畫（或不計畫）起來很合拍。",
  AO: "你們推進決策的節奏相似，合作時少了互相等待的張力。",
  HC: "你們表達溫度的方式相似，理解彼此的訊號相對容易。",
};

export function compareDimensions(
  codeA: string,
  codeB: string
): DimensionComparison[] {
  const lettersA = codeA.replace("-", "");
  const lettersB = codeB.replace("-", "");

  return DIMENSION_ORDER.map((d, i) => {
    const meta = DIMENSION_META[d];
    const letterA = lettersA[i];
    const letterB = lettersB[i];
    const same = letterA === letterB;
    const describe = (letter: string) =>
      letter === meta.first
        ? `${meta.firstName}：${meta.firstDescription}`
        : `${meta.secondName}：${meta.secondDescription}`;
    return {
      dimension: d,
      title: meta.title,
      letterA,
      letterB,
      same,
      descriptionA: describe(letterA),
      descriptionB: describe(letterB),
      talkPrompt: same ? TALK_PROMPTS_SAME[d] : TALK_PROMPTS_DIFFERENT[d],
    };
  });
}

export function sameCount(comparisons: DimensionComparison[]): number {
  return comparisons.filter((c) => c.same).length;
}
