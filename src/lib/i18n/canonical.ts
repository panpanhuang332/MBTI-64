import { DIMENSION_META } from "../dimensions";
import { QUESTIONS } from "../questions";
import { CORE_PROFILES } from "../profiles/cores";
import { SUBTYPE_PROFILES } from "../profiles/subtypes";

/**
 * zh-TW canonical bundle：全站文案的單一來源。
 * - zh-CN 由 scripts/generate-zh-cn.ts 以 OpenCC 自動轉換生成
 * - en 為 src/lib/i18n/en.ts 手工翻譯（結構必須與本檔一致）
 */

const questionsText: Record<string, string> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q.text])
);

export const canonicalBundle = {
  site: {
    name: "人格座標 64",
    nameEn: "Personality Atlas 64",
    tagline: "六維度・64 型人格探索",
    description:
      "免費的繁體中文人格探索工具：以六個維度、72 題原創題目，探索你在 64 種人格組合中的位置。了解你的決策與人際表達方式。本測驗僅供自我探索，非官方 MBTI 測驗，不提供醫療或心理診斷。",
    /** 64 型名稱的組合分隔（子型名＋分隔＋核心名） */
    nameSeparator: "・",
  },
  meta: {
    home: {
      title: "人格座標 64｜六維度・64 型人格探索",
      description:
        "以六個維度、72 題原創題目，探索你在 64 種人格組合中的位置。免費、免註冊、資料保存在你的裝置。了解你的決策與人際表達方式。",
    },
    test: { title: "測驗說明" },
    questions: { title: "作答中" },
    calculating: { title: "產生報告中" },
    result: { title: "你的測驗結果" },
    compare: {
      title: "類型對照",
      description:
        "把你和朋友的 64 型人格代碼放在一起，逐一對照六個維度的偏好差異，開啟理解彼此的對話。",
    },
    types: {
      title: "64 型人格圖鑑",
      description:
        "瀏覽全部 64 種人格組合：16 個核心人格 × 4 個表達子型。按核心類型、決策推進方式與表達溫度篩選，或搜尋代碼與名稱。",
    },
    methodology: {
      title: "方法說明",
      description:
        "了解人格座標 64 的六個維度定義、計分方式、百分比與作答穩定度的意義，以及本測驗的限制與隱私原則。",
    },
    about: {
      title: "關於本站",
      description:
        "人格座標 64 是一個免費的繁體中文自我探索工具，以六個維度與 64 種組合幫助你理解自己的偏好傾向。",
    },
    privacy: {
      title: "隱私說明",
      description:
        "人格座標 64 的隱私原則：免帳號、答案只保存在你的瀏覽器、不上傳伺服器、不收集個資。",
    },
    terms: { title: "使用條款", description: "人格座標 64 的使用條款與免責聲明。" },
  },
  header: {
    logoAria: "人格座標 64 首頁",
    nav: {
      test: "開始測驗",
      types: "全部類型",
      methodology: "方法說明",
      about: "關於",
    },
    localeSwitcherAria: "切換語言",
  },
  footer: {
    blurb:
      "自我探索與個人成長工具。本測驗不是官方 MBTI 測驗，不提供醫療、心理診斷或人事甄選結論。",
    exploreTitle: "探索",
    infoTitle: "資訊",
    links: {
      test: "開始測驗",
      types: "64 型圖鑑",
      methodology: "方法說明",
      compare: "類型對照",
      about: "關於本站",
      privacy: "隱私說明",
      terms: "使用條款",
    },
    smallPrint:
      "結果描述的是偏好傾向，不是固定身分；人格可能隨情境、經驗與時間改變。A/O 與 H/C 為本站自訂探索維度，非官方 MBTI 構面。",
  },
  home: {
    heroKicker: "PERSONALITY ATLAS 64",
    heroTitle1: "找到你在 64 型人格",
    heroTitle2: "地圖上的座標",
    heroLead:
      "六個維度、72 題原創情境題，探索你的能量來源、決策推進方式與人際表達溫度。免費、免註冊，答案只留在你的裝置。",
    ctaStart: "開始測驗",
    ctaBrowse: "先看 64 型圖鑑",
    heroAria: "冰藍色的山景下，一群抽象的旅人圍著營火，天上有星圖與羅盤",
    stats: [
      { value: "6", label: "個探索維度" },
      { value: "64", label: "種人格組合" },
      { value: "8–10", label: "分鐘完成" },
    ],
    whyTitle: "為什麼不是只有四個字母？",
    whyParagraphs: [
      "四個字母能描述你的能量來源、資訊接收、決策依據與生活節奏，但兩個同為 INTJ 的人，推進決策的節奏、對人表達溫度的方式，仍可能完全不同。",
      "所以我們加入兩個本站自訂的探索維度：A/O 決策推進方式——你傾向資訊足夠就行動，還是反覆觀察比較後再出手；以及 H/C 人際表達溫度——你的情緒與善意是外顯可見，還是收在穩定克制的表達裡。",
      "16 × 4 = 64 種組合，讓描述更貼近「日常裡的你」。兩個新維度沒有好壞之分：慢不是優柔寡斷，克制也不是冷漠。",
    ],
    dimensionsTitle: "六個探索維度",
    customDimensionNote: "＊本站自訂探索維度，非官方 MBTI 構面",
    stepsTitle: "測驗怎麼進行",
    steps: [
      {
        title: "回答 72 題",
        text: "以日常情境描述作答，沒有標準答案，依平常的你選擇即可。",
      },
      {
        title: "六維度計分",
        text: "每一題只對應一個維度，系統將作答轉為六個維度上的傾向分數。",
      },
      {
        title: "取得你的座標",
        text: "產生六字母代碼與完整報告：優勢、盲點、合作方式與成長方向。",
      },
      {
        title: "探索與分享",
        text: "瀏覽 64 型圖鑑、下載分享圖卡，或把結果連結傳給朋友對照。",
      },
    ],
    privacyTitle: "你的答案，只留在你的裝置",
    privacyBody:
      "全程不需要帳號。作答與結果保存在你瀏覽器的 localStorage，不上傳伺服器、不用於廣告或分析。分享結果時，連結只包含人格代碼與傾向分數，不含姓名或作答內容。",
    privacyLink: "閱讀完整隱私說明",
    faqTitle: "常見問題",
    faqs: [
      {
        q: "這是官方 MBTI 測驗嗎？",
        a: "不是。本站是獨立的自我探索工具，前四組字母採用常見的人格偏好表達方式，A/O 與 H/C 則是本站自訂的探索維度。本站與任何官方測驗機構無關。",
      },
      {
        q: "結果會很準嗎？",
        a: "我們不宣稱準確率。百分比代表你這次作答的傾向強度，而不是人格純度或科學認證。人格會隨情境、經驗與時間改變，建議把報告當作探索起點。",
      },
      {
        q: "需要註冊或留下個資嗎？",
        a: "不需要。全程免登入，不收集姓名、Email 或任何個資。作答紀錄只保存在你自己的瀏覽器，不會上傳到伺服器。",
      },
      {
        q: "可以中途離開嗎？",
        a: "可以。每答一題都會自動保存進度，重新整理或之後再回來，都能從上次的地方繼續。",
      },
      {
        q: "結果可以用在求職或心理診斷嗎？",
        a: "不行。本測驗不提供醫療、心理診斷或人事甄選結論，請不要把結果用於任何評選或診斷用途。",
      },
    ],
    finalCtaTitle: "準備好探索你的座標了嗎？",
    finalCtaBody: "約 8–10 分鐘、72 題，隨時可以中斷再繼續。",
  },
  testIntro: {
    title: "開始之前",
    lead: "建議在平常的狀態下作答：不趕時間、不特別疲倦或情緒激動時，結果會更貼近日常的你。",
    notes: [
      { title: "約 72 題", text: "共 72 題，預估 8–10 分鐘完成。" },
      {
        title: "沒有標準答案",
        text: "每一題都沒有好壞之分，請依「平常的你」而不是「理想的你」作答。",
      },
      {
        title: "自動保存進度",
        text: "每答一題就自動保存在你的裝置（瀏覽器 localStorage），可以中途離開，之後回來繼續。",
      },
      {
        title: "不收集個人資料",
        text: "全程免登入，不需要姓名或 Email，答案不會上傳到伺服器。",
      },
    ],
    start: "開始測驗",
    continueProgress: "繼續上次進度（已完成 {done} / {total} 題）",
    restart: "清除舊紀錄重新開始",
    confirmTitle:
      "確定要清除舊紀錄重新開始嗎？已作答的 {done} 題將被刪除，且無法復原。",
    confirmYes: "確定清除並重新開始",
    confirmNo: "取消",
    confirmAria: "確認重新開始",
    disclaimer:
      "本測驗為自我探索工具，不是官方 MBTI 測驗，不提供醫療、心理診斷或人事甄選結論。結果描述的是偏好傾向，不是固定身分。",
  },
  quiz: {
    loading: "載入測驗中…",
    progressCurrent: "第",
    progressOf: "/ {total} 題",
    progressPercent: "已完成 {percent}%",
    progressAria: "測驗進度",
    legend: "請選擇你的同意程度（可按鍵盤 1 到 5）",
    likert: [
      "非常不同意",
      "不同意",
      "不確定／視情況而定",
      "同意",
      "非常同意",
    ],
    missingAlert: "還有 {missing} 題尚未作答，請用「上一題」回頭補答後才能送出。",
    prev: "← 上一題",
    next: "下一題 →",
    finish: "完成 →",
    keyboardHint: "鍵盤：1–5 作答，← → 前後移動",
  },
  calculating: {
    stages: ["正在整理六個維度…", "正在比對人格組合…", "正在產生個人報告…"],
    note: "所有計算都在你的裝置上完成，答案不會離開瀏覽器。",
    incompleteTitle: "還沒有完整的作答紀錄",
    incompleteBody: "需要完成全部 {total} 題才能產生結果。",
    backToTest: "回到測驗",
  },
  result: {
    loading: "載入結果中…",
    kicker: "你的座標",
    summaryTitle: "結果摘要",
    subtypeLabel: "{name}子型（{code}）：",
    dimsTitle: "六維度傾向",
    stabilityTitle: "作答穩定度：{label}",
    stabilityHigh:
      "語意相近的題目之間，你的回答相當一致。穩定度只反映作答一致性，不是準確率。",
    stabilityMedium:
      "語意相近的題目之間，你的回答大致一致，部分題目呈現情境差異。穩定度只反映作答一致性，不是準確率。",
    stabilityLow:
      "你的部分回答呈現較大的情境差異。這不代表結果無效，但建議將報告視為探索起點，或在不同狀態下重新測驗。",
    strengthsTitle: "優勢",
    blindspotsTitle: "可能盲點",
    workTitle: "工作與學習",
    collabTitle: "合作與關係",
    stressTitle: "壓力狀態",
    growthTitle: "成長方向",
    misconceptionTitle: "常見誤解",
    subtypeRhythm: "{name}子型的節奏：",
    subtypeExpression: "{name}子型的表達：",
    subtypeStress: "{name}子型的壓力表現：",
    reflectionTitle: "適合與他人討論的三個問題",
    compareTitle: "與朋友類型對照",
    compareBody:
      "貼上朋友的六字母代碼或結果連結，逐一對照你們六個維度的偏好——開啟對話，不是評分。",
    compareInputLabel: "朋友的類型代碼或結果連結",
    comparePlaceholder: "如 ENFP-AH，或貼上對方的結果連結",
    compareSubmit: "開始對照",
    compareError: "代碼格式不正確，例：ENFP-AH",
    copyLink: "複製分享連結",
    copied: "已複製連結 ✓",
    copyPrompt: "請手動複製這段連結：",
    downloadPortrait: "下載圖卡（直式）",
    downloadSquare: "下載圖卡（方形）",
    viewDetail: "查看類型詳情",
    viewAll: "查看全部 64 型",
    retake: "重新測驗",
    invalidTitle: "找不到有效的測驗結果",
    invalidBody:
      "這個結果連結可能不完整或已失效，也可能你還沒有完成測驗。別擔心，花 8–10 分鐘就能取得你的座標。",
    invalidStart: "開始測驗",
    invalidBrowse: "或先瀏覽 64 型圖鑑",
    footNote:
      "分享連結只包含人格代碼、六維傾向分數與穩定度，不含姓名或作答內容。本報告僅供自我探索，不是醫療或心理診斷，也不應作為職業或伴侶選擇的依據。",
  },
  dimensionBars: {
    strength: { close: "偏好接近", moderate: "中度偏好", clear: "明顯偏好" },
    stability: { high: "高", medium: "中", low: "低" },
    closeNote: "兩側偏好接近：這個維度上，你可能依情境靈活切換。",
    footnote:
      "＊AO 與 HC 為本站自訂探索維度，非官方 MBTI 構面。百分比代表本次作答的傾向強度，不是人格純度，也不是準確率。",
  },
  compare: {
    title: "類型對照",
    lead: "放入你和朋友的六字母代碼（或結果分享連結），逐一對照六個維度的偏好——目的是開啟對話，不是評分。",
    invalidUrl: "網址中的類型代碼無效或不完整，請重新輸入。",
    labelA: "你的類型",
    labelB: "朋友的類型",
    placeholderA: "如 INTJ-OC，或貼上你的結果連結",
    placeholderB: "如 ENFP-AH，或貼上對方的結果連結",
    submit: "開始對照",
    formError:
      "請輸入兩個有效的類型代碼（如 INTJ-OC），或直接貼上對方的結果分享連結。",
    noCodeNote: "對照只使用六字母代碼，不涉及雙方的作答內容。還沒有自己的類型？",
    noCodeLink: "先做測驗",
    youLabel: "你",
    friendLabel: "朋友",
    youPrefix: "你：{letter}",
    friendPrefix: "朋友：{letter}",
    sameSummaryPrefix: "你們在",
    sameSummarySuffix:
      "個維度上偏好相同。相同帶來默契，差異帶來互補——沒有哪種組合比較好，重點是理解彼此的訊號。",
    sameBadge: "相同",
    diffBadge: "不同",
    compareOther: "對照其他類型",
    browseTypes: "瀏覽 64 型圖鑑",
    disclaimer:
      "對照描述的是偏好差異，不是契合度評分；請勿將其作為伴侶、合作或任何甄選決策的依據。",
    promptsDifferent: {
      EI: "聊聊看：忙碌的一週結束後，你們各自靠什麼恢復能量？對方的方式你能配合到什麼程度？",
      SN: "聊聊看：規劃一件事時，一個人想先看細節、一個人想先談方向——你們通常誰先讓步？",
      TF: "聊聊看：上次意見不合時，你們各自最在意的是「道理」還是「感受」？當時對方接住了嗎？",
      JP: "聊聊看：臨時改變計畫時，你們的第一反應差多少？什麼樣的提前告知對彼此最友善？",
      AO: "聊聊看：做決定的節奏一快一慢時，快的一方怎麼等、慢的一方怎麼給進度，會讓彼此都安心？",
      HC: "聊聊看：你們表達在乎的方式不同——一個外顯、一個內斂。各自最希望對方怎麼接收？",
    },
    promptsSame: {
      EI: "你們在能量來源上相似，相處節奏容易同步；偶爾留意是否需要有人主動打破同溫層。",
      SN: "你們接收資訊的方式相似，溝通省力；做重要決定時，記得補上另一種視角。",
      TF: "你們的決策依據相似，容易有共識；小心一起忽略掉另一種考量。",
      JP: "你們的生活節奏相似，計畫（或不計畫）起來很合拍。",
      AO: "你們推進決策的節奏相似，合作時少了互相等待的張力。",
      HC: "你們表達溫度的方式相似，理解彼此的訊號相對容易。",
    },
  },
  types: {
    title: "64 型人格圖鑑",
    lead: "16 個四字母核心人格 × 4 個表達子型，構成一張探索地圖。每一型都是一種偏好組合，沒有高低之分，也沒有稀有度排名。",
    searchLabel: "搜尋代碼或中文名稱",
    searchPlaceholder: "搜尋代碼（如 INTJ-OC）或中文名稱",
    coreFilterLabel: "四字母核心類型",
    allCores: "全部核心型",
    aoLabel: "決策推進（A/O）",
    hcLabel: "表達溫度（H/C）",
    filterAll: "全部",
    aoA: "A・行動推進",
    aoO: "O・觀察沉思",
    hcH: "H・外顯溫度",
    hcC: "C・沉穩內斂",
    showing: "顯示 {shown} / 64 型",
    empty: "沒有符合的類型，試試調整搜尋或篩選條件。",
  },
  typeDetail: {
    breadcrumbAll: "64 型圖鑑",
    summaryTitle: "類型摘要",
    customNote: "子型所屬的 A/O 與 H/C 為本站自訂探索維度，非官方 MBTI 構面。",
    strengthsTitle: "優勢",
    blindspotsTitle: "可能盲點",
    workTitle: "工作與學習",
    collabTitle: "合作與溝通",
    stressTitle: "壓力反應",
    growthTitle: "成長方向",
    misconceptionTitle: "常見誤解",
    reflectionTitle: "適合與他人討論的三個問題",
    subtypeDecision: "{name}子型的決策節奏：",
    subtypeExpression: "{name}子型的表達：",
    subtypeStress: "{name}子型的壓力表現：",
    ctaTest: "測測看你的類型",
    ctaBack: "回到 64 型圖鑑",
    disclaimer:
      "類型描述的是偏好傾向，不是固定身分；每一型都沒有高低之分。內容僅供自我探索，不應作為職業、伴侶或任何甄選決策的依據。",
    emblemAria: "{code} 類型徽章",
    notFoundTitle: "找不到類型",
  },
  methodology: {
    title: "方法說明",
    lead: "這一頁說明測驗如何運作、結果代表什麼、以及——同樣重要的——它不代表什麼。",
    dimsTitle: "六個維度的定義",
    customNote:
      "重要：A/O（決策推進方式）與 H/C（人際表達溫度）是本站自訂的探索維度，不是官方 MBTI 構面。本測驗也不是官方 MBTI 測驗。",
    scoringTitle: "題目如何計分",
    scoringP1:
      "共 72 題，每個維度 12 題，採五點量尺（非常不同意～非常同意）。作答值 1–5 會轉換為 -2～+2（「不確定」= 0），再乘上該題的方向（部分題目為反向計分）與權重。每個維度分別加總後，依理論最大值標準化為 -100～+100 的傾向分數。",
    scoringP2:
      "分數為正取該維度的第一個字母（E/S/T/J/A/H），為負取第二個字母。規則固定且可重現：相同答案永遠得到相同結果，不使用任何隨機數。",
    percentTitle: "百分比代表什麼",
    percentP1:
      "結果頁的百分比（例如 E 63% / I 37%）是傾向分數換算成的比例，代表這次作答的傾向強度，不是人格純度，更不是「準確率」。分數接近中間（±14 以內）時，我們會標示「偏好接近」——代表你在這個維度上可能依情境靈活切換。",
    percentList: ["0–14：偏好接近", "15–39：中度偏好", "40 以上：明顯偏好"],
    stabilityTitle: "作答穩定度代表什麼",
    stabilityP1:
      "題庫中每個維度都有語意相近或反向的「配對題」。穩定度比較這些配對題之間答案的一致程度，分為高、中、低三級。穩定度不是準確率——它只表示你在語意相近的題目上回答是否大致一致。穩定度低可能代表你的狀態受情境影響較大，建議把報告視為探索起點，或在不同狀態下重新測驗。",
    labelTitle: "為什麼人格不能只看一個標籤",
    labelP1:
      "六個字母是描述偏好的速記，不是把人裝進盒子的分類。同一個代碼底下，每個人的經歷、價值觀與行為仍然千差萬別；同一個人在不同的情境、階段與壓力狀態下，作答也可能改變。請把結果當成一面幫助反思的鏡子，而不是一張定義你的標籤。",
    diffTitle: "本站與正式心理測驗的差異",
    diffP1:
      "正式的心理測量工具需要經過信效度研究、常模建立與專業審查。本站題庫為原創編寫，計分透明，但未經學術信效度驗證，定位是自我探索與個人成長工具，而不是心理疾病診斷工具。我們不提供醫療、心理診斷或人事甄選結論，也不宣稱任何準確率或科學認證。",
    limitsTitle: "測驗限制",
    limitsList: [
      "結果完全依賴自我報告，會受作答當下的狀態與自我認知影響。",
      "二元字母是連續傾向的簡化，接近中間值時尤其應謹慎解讀。",
      "人格可能隨情境、經驗與時間改變，結果不是固定身分。",
      "不應將結果用於職業選擇、伴侶篩選、招募、保險或任何評選決策。",
    ],
    privacyTitle: "隱私原則",
    privacyP1:
      "作答與結果只保存在你的瀏覽器（localStorage），不上傳伺服器。分享連結只包含人格代碼、六維分數與穩定度。詳見",
    privacyLink: "隱私說明",
  },
  about: {
    title: "關於 {siteName}",
    paragraphs: [
      "{siteName}（{siteNameEn}）是一個免費、免註冊的人格探索網站。我們相信，理解自己的偏好——能量從哪裡來、如何接收資訊、如何做決定、以什麼節奏生活、如何推進行動、如何表達溫度——是自我成長的起點。",
      "在常見的四組偏好之外，我們加入了兩個自訂探索維度：A/O 決策推進方式與 H/C 人際表達溫度，形成 2⁶ = 64 種組合。這不是要把人分得更細，而是想更貼近「日常裡的你」：同樣的四個字母，行動節奏與表達方式不同的人，樣貌可以非常不同。",
      "本站的定位是自我探索與個人成長工具，不是心理疾病診斷工具。我們刻意不做的事：不宣稱準確率、不引用不存在的使用人數、不把任何類型描述成更聰明或更成功、不顯示沒有真實統計依據的人口比例、不收集你的個資。",
      "測驗的計分方式完全透明，歡迎閱讀方法說明了解每一分是怎麼算出來的。",
    ],
    methodologyLink: "方法說明",
    statementTitle: "聲明",
    statements: [
      "本測驗不是官方 MBTI 測驗，與任何官方測驗機構無關。",
      "不提供醫療、心理診斷或人事甄選結論。",
      "結果描述的是偏好傾向，不是固定身分。",
      "人格可能隨情境、經驗與時間改變。",
    ],
  },
  privacy: {
    title: "隱私說明",
    lead: "原則很簡單：你的答案是你的，我們不碰。",
    points: [
      {
        title: "預設不需要帳號",
        text: "全站免登入、免註冊。我們不要求也不收集姓名、Email、電話或任何可識別個人身分的資料。",
      },
      {
        title: "回答保存在你的瀏覽器",
        text: "作答進度與結果儲存在你裝置的 localStorage，完全在本機運作，不會上傳到伺服器。我們沒有資料庫，也看不到你的任何答案。",
      },
      {
        title: "清除瀏覽器資料後紀錄可能消失",
        text: "因為資料只存在你的裝置上，若你清除瀏覽器資料、使用無痕模式或更換裝置，作答紀錄與結果可能消失，且無法復原。",
      },
      {
        title: "分享時只分享人格結果",
        text: "分享連結與分享圖卡只包含人格代碼、六個維度的傾向分數與作答穩定度，不包含姓名、作答內容或任何個資。",
      },
      {
        title: "不用於就業、保險或醫療判斷",
        text: "我們不會（也無從）使用你的答案做就業、保險、醫療或任何評選判斷；也請你不要將測驗結果用於這類用途。",
      },
    ],
    footnote:
      "本站為靜態網站，核心功能在沒有後端服務的情況下運作。若未來部署平台（如 Vercel、Netlify）提供基本的匿名流量統計，該統計不包含你的作答內容。另外，站方可選擇性啟用極簡的匿名事件計數（預設關閉）：只記錄「開始測驗」「完成測驗」等事件名稱與介面語言，用於了解完測率；不含任何識別碼、cookie、作答內容或人格結果，並尊重瀏覽器的「請勿追蹤（DNT）」設定。",
  },
  terms: {
    title: "使用條款",
    sections: [
      {
        title: "服務性質",
        paragraphs: [
          "{siteName}提供免費的自我探索測驗與相關內容。本服務僅供個人自我探索與成長參考，不構成任何形式的專業建議。",
        ],
        list: [],
      },
      {
        title: "免責聲明",
        paragraphs: [],
        list: [
          "本測驗不是官方 MBTI 測驗，未經學術信效度驗證，不提供醫療、心理診斷或人事甄選結論。",
          "測驗結果描述的是作答當下的偏好傾向，不是固定身分，也不應作為職業、伴侶、招募、保險或任何評選決策的依據。",
          "若你正經歷心理困擾，請尋求合格的心理專業人員協助，而不是依賴本測驗。",
        ],
      },
      {
        title: "內容使用",
        paragraphs: [
          "本站的題庫、類型名稱與描述文案皆為原創內容。歡迎分享結果連結與分享圖卡；未經同意請勿大量轉載或將內容用於商業用途。",
        ],
        list: [],
      },
      {
        title: "服務變更",
        paragraphs: [
          "我們可能隨時調整題庫、計分方式或內容以改善品質；調整後你的舊結果連結仍會以當時的分數呈現，但重新測驗的結果可能不同。",
        ],
        list: [],
      },
    ],
  },
  shareCard: {
    disclaimer: "僅供自我探索・非官方 MBTI・非心理診斷",
    /** 預設 OG 圖（首頁等）上的一句話 */
    ogMotto: "了解你的決策與人際表達方式",
  },
  dimensions: DIMENSION_META,
  questions: questionsText,
  cores: CORE_PROFILES,
  subtypes: SUBTYPE_PROFILES,
};

/** Bundle 的結構型別（en 與 zh-CN 必須符合同一結構） */
export type Bundle = typeof canonicalBundle;
