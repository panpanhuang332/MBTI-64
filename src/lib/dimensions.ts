import type { Dimension } from "./types";

export interface DimensionMeta {
  code: Dimension;
  /** 第一字母（分數為正時） */
  first: string;
  /** 第二字母（分數為負時） */
  second: string;
  title: string;
  firstName: string;
  secondName: string;
  firstDescription: string;
  secondDescription: string;
  /** 是否為本站自訂探索維度（非官方 MBTI 構面） */
  custom: boolean;
}

export const DIMENSION_META: Record<Dimension, DimensionMeta> = {
  EI: {
    code: "EI",
    first: "E",
    second: "I",
    title: "能量來源",
    firstName: "外向互動",
    secondName: "內向沉澱",
    firstDescription: "從外部互動與行動中取得能量，邊做邊想、邊說邊整理。",
    secondDescription: "從內在思考與獨處中恢復能量，先想清楚再對外表達。",
    custom: false,
  },
  SN: {
    code: "SN",
    first: "S",
    second: "N",
    title: "資訊接收",
    firstName: "具體實感",
    secondName: "抽象直覺",
    firstDescription: "偏好具體資訊、事實與實際經驗，重視此刻確定的東西。",
    secondDescription: "偏好模式、可能性與抽象概念，常思考事情背後的意涵。",
    custom: false,
  },
  TF: {
    code: "TF",
    first: "T",
    second: "F",
    title: "決策依據",
    firstName: "邏輯衡量",
    secondName: "價值考量",
    firstDescription: "決策時優先考量邏輯、一致性與原則，重視站得住腳的理由。",
    secondDescription: "決策時優先考量價值、關係與對人的影響，重視共感與和諧。",
    custom: false,
  },
  JP: {
    code: "JP",
    first: "J",
    second: "P",
    title: "生活節奏",
    firstName: "計畫結構",
    secondName: "彈性探索",
    firstDescription: "偏好結構、規劃、決定與明確進度，事情定下來比較安心。",
    secondDescription: "偏好彈性、探索、調整與保留選項，喜歡邊走邊看。",
    custom: false,
  },
  AO: {
    code: "AO",
    first: "A",
    second: "O",
    title: "決策推進方式（本站自訂維度）",
    firstName: "行動推進",
    secondName: "觀察沉思",
    firstDescription:
      "Action-oriented：在資訊足夠時傾向做出決定並推進行動，邊做邊修正。",
    secondDescription:
      "Observant-reflective：傾向反覆觀察、比較風險並保留修正空間，重視周全。",
    custom: true,
  },
  HC: {
    code: "HC",
    first: "H",
    second: "C",
    title: "人際表達溫度（本站自訂維度）",
    firstName: "外顯溫度",
    secondName: "沉穩內斂",
    firstDescription:
      "Humanly expressive：情緒與善意較容易被他人感受到，表達直接而溫暖。",
    secondDescription:
      "Composed-reserved：表達較克制、重視邊界與情緒穩定，溫度放在行動裡。",
    custom: true,
  },
};

export const DIMENSION_ORDER = ["EI", "SN", "TF", "JP", "AO", "HC"] as const;
