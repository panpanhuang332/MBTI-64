/**
 * 4 個雙字母表達子型（A/O × H/C），為本站自訂探索維度的組合。
 * A/O：決策推進方式；H/C：人際表達溫度。皆非官方 MBTI 構面。
 */

export type SubtypeCode = "AH" | "AC" | "OH" | "OC";

export interface SubtypeProfile {
  code: SubtypeCode;
  /** 子型名稱（用於組合 64 型中文名稱） */
  name: string;
  enName: string;
  /** 一句話描述 */
  tagline: string;
  /** 40–80 字子型摘要 */
  summary: string;
  /** 決策節奏修飾 */
  decisionStyle: string;
  /** 人際表達修飾 */
  socialStyle: string;
  /** 壓力表現修飾 */
  stressStyle: string;
  /** 溝通風格修飾 */
  communicationStyle: string;
}

export const SUBTYPE_PROFILES: Record<SubtypeCode, SubtypeProfile> = {
  AH: {
    code: "AH",
    name: "晨光",
    enName: "Daybreak",
    tagline: "明快推進，溫度外顯",
    summary:
      "你傾向在資訊足夠時就拍板前進，同時讓身邊的人清楚感受到你的情緒與善意。行動與溫暖並行，是你給人的第一印象。",
    decisionStyle:
      "決策節奏明快，傾向「先推進、再修正」，不喜歡讓事情懸著；願意當第一個表態的人。",
    socialStyle:
      "情緒與關心外顯，讚美與感謝說得出口，容易讓人覺得親近、好靠近。",
    stressStyle:
      "壓力下傾向立刻做點什麼，並會向身邊的人直接表達感受；小心行動過快而略過必要的沉澱。",
    communicationStyle:
      "直接而帶溫度，習慣把立場與心情一起說清楚；對慢節奏的討論需要多一點耐心。",
  },
  AC: {
    code: "AC",
    name: "稜線",
    enName: "Ridgeline",
    tagline: "明快推進，沉穩內斂",
    summary:
      "你傾向果斷做決定、俐落往前走，但情緒表達克制，重視界線與穩定。人們常先看見你的效率，之後才慢慢讀懂你的在乎。",
    decisionStyle:
      "決策乾脆，準備好了就行動，不拖泥帶水；對議而不決的場面容忍度低。",
    socialStyle:
      "表達克制、對事不對人，與多數人維持清爽的距離；信任建立後才逐漸展現溫度。",
    stressStyle:
      "壓力下傾向沉默地加速處理問題，情緒不外露；留意身邊的人可能因此不知道你需要支援。",
    communicationStyle:
      "簡潔、聚焦結論與下一步；記得偶爾補上一句心情或肯定，訊息會更完整。",
  },
  OH: {
    code: "OH",
    name: "湖岸",
    enName: "Lakeshore",
    tagline: "細照慢行，溫度外顯",
    summary:
      "你傾向多觀察、多比較後再決定，但對人的溫度藏不住。你走得不急，卻讓同行的人感到安心與被照顧。",
    decisionStyle:
      "決策前喜歡把選項攤開來比較，保留修正空間；「再確認一次」是你的口頭禪，也常因此避開陷阱。",
    socialStyle:
      "關心與情緒自然流露，擅長傾聽與陪伴，人們願意對你說出真心話。",
    stressStyle:
      "壓力下容易反覆思量、尋求身邊的人討論與安撫；小心在徵詢太多意見後反而更難決定。",
    communicationStyle:
      "溫和、有商量餘地，習慣先照顧感受再談事情；重要立場值得更早、更明確地說出口。",
  },
  OC: {
    code: "OC",
    name: "深林",
    enName: "Deepwood",
    tagline: "細照慢行，沉穩內斂",
    summary:
      "你傾向安靜地觀察、完整地思考，再謹慎行動；情緒表達克制而穩定。你的深思常在事後才被人看懂價值。",
    decisionStyle:
      "決策謹慎，重視風險與長期後果，寧可慢一點也不想重來；適合擔任把關的角色。",
    socialStyle:
      "安靜、重視界線，社交圈小而深；你的在乎多半放在行動與細節裡，而不是話語上。",
    stressStyle:
      "壓力下傾向獨自消化、反覆推演；留意過度內收可能讓支援進不來，適時透露狀態是一種保護。",
    communicationStyle:
      "措辭謹慎、想清楚才說，說出口的話通常有份量；面對需要即時回應的場合，可先給出「初步看法」再補完整版。",
  },
};

export const SUBTYPE_CODES: SubtypeCode[] = ["AH", "AC", "OH", "OC"];
