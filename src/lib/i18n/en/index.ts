import type { Bundle } from "../canonical";
import { DIMENSION_META_EN } from "./dimensions";
import { QUESTIONS_EN } from "./questions";
import { CORE_PROFILES_EN } from "./cores";
import { SUBTYPE_PROFILES_EN } from "./subtypes";

/** English bundle — structure must mirror canonical.ts (zh-TW). */
export const enBundle: Bundle = {
  site: {
    name: "Personality Atlas 64",
    nameEn: "Personality Atlas 64",
    tagline: "A 6-dimension, 64-type personality exploration",
    description:
      "A free personality exploration tool: 72 original questions across six dimensions locate you among 64 personality combinations. Understand how you decide and how you express warmth. For self-exploration only — not the official MBTI, and not a medical or psychological diagnosis.",
    nameSeparator: " ",
  },
  meta: {
    home: {
      title: "Personality Atlas 64 | 6-dimension · 64-type exploration",
      description:
        "72 original questions across six dimensions locate you among 64 personality combinations. Free, no sign-up, data stays on your device.",
    },
    test: { title: "Before You Start" },
    questions: { title: "Taking the Test" },
    calculating: { title: "Preparing Your Report" },
    result: { title: "Your Result" },
    compare: {
      title: "Compare Types",
      description:
        "Put your 64-type code next to a friend's and compare your preferences across all six dimensions — a conversation starter, not a score.",
    },
    types: {
      title: "All 64 Types",
      description:
        "Browse all 64 combinations: 16 core personalities × 4 expression subtypes. Filter by core type, decision momentum and expressive warmth, or search by code and name.",
    },
    methodology: {
      title: "Methodology",
      description:
        "How Personality Atlas 64 works: the six dimensions, scoring, what percentages and answer consistency mean, plus the test's limits and privacy principles.",
    },
    about: {
      title: "About",
      description:
        "Personality Atlas 64 is a free self-exploration tool that uses six dimensions and 64 combinations to help you understand your preferences.",
    },
    privacy: {
      title: "Privacy",
      description:
        "Privacy principles of Personality Atlas 64: no account, answers stay in your browser, nothing uploaded, no personal data collected.",
    },
    terms: {
      title: "Terms of Use",
      description: "Terms of use and disclaimer for Personality Atlas 64.",
    },
  },
  header: {
    logoAria: "Personality Atlas 64 home",
    nav: {
      test: "Take the Test",
      types: "All Types",
      methodology: "Methodology",
      about: "About",
    },
    localeSwitcherAria: "Switch language",
  },
  footer: {
    blurb:
      "A self-exploration and personal-growth tool. This is not the official MBTI test and provides no medical, psychological or hiring conclusions.",
    exploreTitle: "Explore",
    infoTitle: "Info",
    links: {
      test: "Take the Test",
      types: "All 64 Types",
      methodology: "Methodology",
      compare: "Compare Types",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
    },
    smallPrint:
      "Results describe preference tendencies, not fixed identity; personality can shift with context, experience and time. A/O and H/C are site-specific dimensions, not official MBTI facets.",
  },
  home: {
    heroKicker: "PERSONALITY ATLAS 64",
    heroTitle1: "Find your coordinates on the",
    heroTitle2: "map of 64 personalities",
    heroLead:
      "Six dimensions, 72 original scenario questions — explore where your energy comes from, how you drive decisions, and how you express warmth. Free, no sign-up, answers never leave your device.",
    ctaStart: "Take the Test",
    ctaBrowse: "Browse the 64 Types",
    heroAria:
      "Under ice-blue mountains, abstract travellers gather around a campfire beneath a star chart and compass",
    stats: [
      { value: "6", label: "dimensions" },
      { value: "64", label: "personality combinations" },
      { value: "8–10", label: "minutes to finish" },
    ],
    whyTitle: "Why not just four letters?",
    whyParagraphs: [
      "Four letters describe your energy source, information intake, decision basis and life rhythm. But two people who are both INTJ can still differ completely in how fast they drive decisions and how visibly they express warmth.",
      "So we add two site-specific dimensions: A/O decision momentum — whether you act once the information is good enough, or keep observing and comparing before you move; and H/C expressive warmth — whether your emotions and goodwill show openly, or live inside a steadier, more reserved style.",
      "16 × 4 = 64 combinations bring the description closer to the everyday you. Neither new dimension has a better side: slow isn't indecisive, and reserved isn't cold.",
    ],
    dimensionsTitle: "The Six Dimensions",
    customDimensionNote:
      "* Site-specific dimension, not an official MBTI facet",
    stepsTitle: "How It Works",
    steps: [
      {
        title: "Answer 72 questions",
        text: "Everyday scenarios with no right answers — just choose as your usual self.",
      },
      {
        title: "Six-dimension scoring",
        text: "Each question maps to exactly one dimension; answers become tendency scores.",
      },
      {
        title: "Get your coordinates",
        text: "A six-letter code plus a full report: strengths, blind spots, collaboration and growth.",
      },
      {
        title: "Explore and share",
        text: "Browse the 64-type atlas, download a share card, or compare results with friends.",
      },
    ],
    privacyTitle: "Your answers stay on your device",
    privacyBody:
      "No account needed. Answers and results live in your browser's localStorage — never uploaded, never used for ads or analytics. Share links contain only the type code and tendency scores, no names, no raw answers.",
    privacyLink: "Read the full privacy note",
    faqTitle: "FAQ",
    faqs: [
      {
        q: "Is this the official MBTI test?",
        a: "No. This is an independent self-exploration tool. The first four letter pairs use a common vocabulary of personality preferences; A/O and H/C are our own exploratory dimensions. We are unaffiliated with any official testing organisation.",
      },
      {
        q: "How accurate is it?",
        a: "We claim no accuracy figures. Percentages express the strength of this sitting's answers — not personality purity or scientific certification. Personality shifts with context and time; treat the report as a starting point.",
      },
      {
        q: "Do I need to register or hand over personal data?",
        a: "No. No login, and we collect no names, emails or any personal data. Your answers are stored only in your own browser and never uploaded.",
      },
      {
        q: "Can I leave partway through?",
        a: "Yes. Progress saves automatically after every answer — refresh or come back later and continue where you left off.",
      },
      {
        q: "Can results be used for hiring or diagnosis?",
        a: "No. This test provides no medical, psychological or personnel-selection conclusions. Please don't use results for any screening or diagnostic purpose.",
      },
    ],
    finalCtaTitle: "Ready to find your coordinates?",
    finalCtaBody: "About 8–10 minutes, 72 questions, pause anytime.",
  },
  testIntro: {
    title: "Before You Start",
    lead: "Answer in an ordinary state of mind — not rushed, exhausted or worked up — and the result will better reflect your everyday self.",
    notes: [
      {
        title: "About 72 questions",
        text: "72 questions in total, roughly 8–10 minutes.",
      },
      {
        title: "No right answers",
        text: "No option is better than another. Answer as your usual self, not your ideal self.",
      },
      {
        title: "Progress saves automatically",
        text: "Every answer is saved on your device (browser localStorage). Leave anytime and pick up later.",
      },
      {
        title: "No personal data collected",
        text: "No login, no name or email required; answers are never uploaded.",
      },
    ],
    start: "Start the Test",
    continueProgress: "Continue ({done} / {total} answered)",
    restart: "Clear old record and restart",
    confirmTitle:
      "Clear the old record and restart? Your {done} answered questions will be deleted and cannot be recovered.",
    confirmYes: "Clear and restart",
    confirmNo: "Cancel",
    confirmAria: "Confirm restart",
    disclaimer:
      "This is a self-exploration tool — not the official MBTI test, and no medical, psychological or hiring conclusions are provided. Results describe preference tendencies, not fixed identity.",
  },
  quiz: {
    loading: "Loading the test…",
    progressCurrent: "Question",
    progressOf: "of {total}",
    progressPercent: "{percent}% complete",
    progressAria: "Test progress",
    legend: "Choose how much you agree (keyboard 1–5 works too)",
    likert: [
      "Strongly disagree",
      "Disagree",
      "Not sure / depends",
      "Agree",
      "Strongly agree",
    ],
    missingAlert:
      "{missing} question(s) still unanswered — use “Previous” to fill them in before finishing.",
    prev: "← Previous",
    next: "Next →",
    finish: "Finish →",
    keyboardHint: "Keyboard: 1–5 to answer, ← → to move",
  },
  calculating: {
    stages: [
      "Organising the six dimensions…",
      "Matching your personality combination…",
      "Preparing your personal report…",
    ],
    note: "All computation happens on your device — answers never leave the browser.",
    incompleteTitle: "No complete answer record yet",
    incompleteBody: "All {total} questions must be answered to generate a result.",
    backToTest: "Back to the test",
  },
  result: {
    loading: "Loading your result…",
    kicker: "Your Coordinates",
    summaryTitle: "Summary",
    subtypeLabel: "{name} subtype ({code}): ",
    dimsTitle: "Six-Dimension Tendencies",
    stabilityTitle: "Answer consistency: {label}",
    stabilityHigh:
      "Your answers to semantically similar questions were highly consistent. Consistency reflects only answer agreement — it is not accuracy.",
    stabilityMedium:
      "Your answers to semantically similar questions were broadly consistent, with some situational variation. Consistency reflects only answer agreement — it is not accuracy.",
    stabilityLow:
      "Some of your answers varied notably across similar questions. This doesn't invalidate the result, but treat the report as a starting point, or retake the test in a different state of mind.",
    strengthsTitle: "Strengths",
    blindspotsTitle: "Possible Blind Spots",
    workTitle: "Work & Learning",
    collabTitle: "Collaboration & Relationships",
    stressTitle: "Under Stress",
    growthTitle: "Growth Direction",
    misconceptionTitle: "Common Misconception",
    subtypeRhythm: "{name} subtype rhythm: ",
    subtypeExpression: "{name} subtype expression: ",
    subtypeStress: "{name} subtype under stress: ",
    reflectionTitle: "Three Questions Worth Discussing",
    compareTitle: "Compare with a Friend",
    compareBody:
      "Paste a friend's six-letter code or result link and compare your preferences across all six dimensions — a conversation, not a score.",
    compareInputLabel: "Friend's type code or result link",
    comparePlaceholder: "e.g. ENFP-AH, or paste their result link",
    compareSubmit: "Compare",
    compareError: "Invalid code format — e.g. ENFP-AH",
    copyLink: "Copy Share Link",
    copied: "Link copied ✓",
    copyPrompt: "Copy this link manually:",
    downloadPortrait: "Download card (portrait)",
    downloadSquare: "Download card (square)",
    viewDetail: "View Type Details",
    viewAll: "See All 64 Types",
    retake: "Retake the Test",
    invalidTitle: "No valid result found",
    invalidBody:
      "This result link may be incomplete or expired — or you haven't finished the test yet. No worries: 8–10 minutes gets you your coordinates.",
    invalidStart: "Take the Test",
    invalidBrowse: "or browse the 64 types first",
    footNote:
      "Share links contain only the type code, six tendency scores and consistency level — no names, no raw answers. This report is for self-exploration only; it is not a medical or psychological diagnosis and shouldn't guide career or partner decisions.",
  },
  dimensionBars: {
    strength: {
      close: "close preference",
      moderate: "moderate preference",
      clear: "clear preference",
    },
    stability: { high: "High", medium: "Medium", low: "Low" },
    closeNote:
      "Preferences are close on this dimension — you likely switch flexibly with context.",
    footnote:
      "* AO and HC are site-specific dimensions, not official MBTI facets. Percentages express the strength of this sitting's answers — not personality purity, and not accuracy.",
  },
  compare: {
    title: "Compare Types",
    lead: "Enter your code and a friend's (or paste result links) and compare preferences across the six dimensions — the goal is conversation, not scoring.",
    invalidUrl: "The type codes in the URL are invalid or incomplete — please re-enter.",
    labelA: "Your type",
    labelB: "Friend's type",
    placeholderA: "e.g. INTJ-OC, or paste your result link",
    placeholderB: "e.g. ENFP-AH, or paste their result link",
    submit: "Compare",
    formError:
      "Please enter two valid type codes (e.g. INTJ-OC), or paste a result share link.",
    noCodeNote:
      "Comparison uses only the six-letter codes — no answer data involved. Don't have your type yet?",
    noCodeLink: "Take the test first",
    youLabel: "You",
    friendLabel: "Friend",
    youPrefix: "You: {letter}",
    friendPrefix: "Friend: {letter}",
    sameSummaryPrefix: "You share the same preference on",
    sameSummarySuffix:
      "of 6 dimensions. Sameness brings rapport; difference brings complement — neither combination is better. What matters is learning each other's signals.",
    sameBadge: "Same",
    diffBadge: "Different",
    compareOther: "Compare other types",
    browseTypes: "Browse the 64 types",
    disclaimer:
      "Comparison describes preference differences, not a compatibility score; please don't use it for partner, collaboration or any screening decisions.",
    promptsDifferent: {
      EI: "Talk about it: after a packed week, how does each of you recharge? How far can you accommodate the other's way?",
      SN: "Talk about it: planning something, one of you wants details first, the other direction first — who usually yields?",
      TF: "Talk about it: in your last disagreement, did each of you care more about the reasoning or the feelings? Did the other catch it?",
      JP: "Talk about it: when plans change last-minute, how different are your first reactions? What kind of heads-up feels kindest to each of you?",
      AO: "Talk about it: when one decides fast and the other slow — how should the fast one wait, and the slow one share progress, so both feel at ease?",
      HC: "Talk about it: you express care differently — one openly, one reserved. How does each of you most want it to be received?",
    },
    promptsSame: {
      EI: "You recharge similarly, so your rhythms sync easily; occasionally check whether someone needs to break the bubble.",
      SN: "You take in information similarly — communication is easy; for big decisions, remember to add the other lens.",
      TF: "You decide on similar grounds and reach consensus easily; beware of jointly missing the other consideration.",
      JP: "Your life rhythms are similar — planning (or not planning) together comes naturally.",
      AO: "You drive decisions at a similar pace, so there's little waiting tension between you.",
      HC: "You express warmth similarly, making each other's signals relatively easy to read.",
    },
  },
  types: {
    title: "All 64 Types",
    lead: "16 four-letter core personalities × 4 expression subtypes form one map of exploration. Every type is a combination of preferences — no hierarchy, no rarity ranking.",
    searchLabel: "Search by code or name",
    searchPlaceholder: "Search a code (e.g. INTJ-OC) or a name",
    coreFilterLabel: "Four-letter core type",
    allCores: "All core types",
    aoLabel: "Decision momentum (A/O)",
    hcLabel: "Expressive warmth (H/C)",
    filterAll: "All",
    aoA: "A · Action-oriented",
    aoO: "O · Observant-reflective",
    hcH: "H · Humanly expressive",
    hcC: "C · Composed-reserved",
    showing: "Showing {shown} / 64 types",
    empty: "No matching types — try adjusting the search or filters.",
  },
  typeDetail: {
    breadcrumbAll: "All 64 Types",
    summaryTitle: "Type Summary",
    customNote:
      "The subtype's A/O and H/C are site-specific dimensions, not official MBTI facets.",
    strengthsTitle: "Strengths",
    blindspotsTitle: "Possible Blind Spots",
    workTitle: "Work & Learning",
    collabTitle: "Collaboration & Communication",
    stressTitle: "Under Stress",
    growthTitle: "Growth Direction",
    misconceptionTitle: "Common Misconception",
    reflectionTitle: "Three Questions Worth Discussing",
    subtypeDecision: "{name} subtype decision rhythm: ",
    subtypeExpression: "{name} subtype expression: ",
    subtypeStress: "{name} subtype under stress: ",
    ctaTest: "Find Your Own Type",
    ctaBack: "Back to All Types",
    disclaimer:
      "Type descriptions capture preference tendencies, not fixed identity; no type ranks above another. For self-exploration only — not a basis for career, partner or any screening decisions.",
    emblemAria: "{code} type emblem",
    notFoundTitle: "Type not found",
  },
  methodology: {
    title: "Methodology",
    lead: "This page explains how the test works, what results mean — and, just as important, what they don't.",
    dimsTitle: "The Six Dimensions",
    customNote:
      "Important: A/O (decision momentum) and H/C (expressive warmth) are site-specific exploratory dimensions, not official MBTI facets. This is not the official MBTI test.",
    scoringTitle: "How Questions Are Scored",
    scoringP1:
      "72 questions, 12 per dimension, on a five-point scale (strongly disagree – strongly agree). Answers 1–5 convert to −2…+2 (“not sure” = 0), then multiply by each question's direction (some are reverse-scored) and weight. Each dimension's total is normalised to a −100…+100 tendency score against its theoretical maximum.",
    scoringP2:
      "A positive score takes the dimension's first letter (E/S/T/J/A/H); a negative score the second. The rule is fixed and reproducible: identical answers always produce identical results — no randomness anywhere.",
    percentTitle: "What Percentages Mean",
    percentP1:
      "Percentages (e.g. E 63% / I 37%) are tendency scores expressed as ratios: the strength of this sitting's answers — not personality purity, and not “accuracy”. Near the midpoint (within ±14) we label it “close preference”, meaning you likely switch with context on that dimension.",
    percentList: [
      "0–14: close preference",
      "15–39: moderate preference",
      "40+: clear preference",
    ],
    stabilityTitle: "What Answer Consistency Means",
    stabilityP1:
      "Each dimension includes semantically paired (similar or reversed) questions. Consistency compares your answers within those pairs, graded high / medium / low. It is not accuracy — only whether you answered similar questions similarly. Low consistency may mean your state varies strongly with context; treat the report as a starting point, or retake in a different state.",
    labelTitle: "Why One Label Can't Hold a Person",
    labelP1:
      "Six letters are shorthand for preferences, not boxes for people. Under the same code, histories, values and behaviour still differ enormously; the same person may answer differently across situations, life stages and stress levels. Use the result as a mirror for reflection, not a label that defines you.",
    diffTitle: "How This Differs from Formal Psychometrics",
    diffP1:
      "Formal psychometric instruments require validity and reliability studies, norm samples and professional review. Our item bank is originally written and the scoring is transparent, but it has not undergone academic validation. This is a self-exploration and growth tool, not a diagnostic instrument — no medical, psychological or personnel conclusions, and no accuracy or certification claims.",
    limitsTitle: "Limitations",
    limitsList: [
      "Results rely entirely on self-report and reflect your state and self-perception at answering time.",
      "Binary letters simplify continuous tendencies — interpret near-midpoint scores with extra care.",
      "Personality can change with context, experience and time; results are not fixed identity.",
      "Never use results for career selection, partner screening, hiring, insurance or any evaluation decisions.",
    ],
    privacyTitle: "Privacy Principles",
    privacyP1:
      "Answers and results stay in your browser (localStorage) and are never uploaded. Share links carry only the type code, six scores and consistency level. See",
    privacyLink: "the privacy note",
  },
  about: {
    title: "About {siteName}",
    paragraphs: [
      "{siteName} is a free, no-registration personality exploration site. We believe understanding your own preferences — where energy comes from, how you take in information, how you decide, what rhythm you live by, how you drive action, how you express warmth — is where self-growth starts.",
      "Beyond the four familiar preference pairs, we add two exploratory dimensions of our own: A/O decision momentum and H/C expressive warmth, giving 2⁶ = 64 combinations. The point isn't finer sorting — it's coming closer to the everyday you: people with identical four letters can look very different in pace and expression.",
      "This site is a self-exploration and personal-growth tool, not a diagnostic instrument. Things we deliberately don't do: claim accuracy rates, cite invented user counts, describe any type as smarter or more successful, display population percentages without real statistics, or collect your personal data.",
      "The scoring is fully transparent — read the methodology page to see exactly how every point is computed.",
    ],
    methodologyLink: "Methodology",
    statementTitle: "Statement",
    statements: [
      "This is not the official MBTI test and is unaffiliated with any official testing organisation.",
      "No medical, psychological or personnel-selection conclusions are provided.",
      "Results describe preference tendencies, not fixed identity.",
      "Personality can change with context, experience and time.",
    ],
  },
  privacy: {
    title: "Privacy",
    lead: "The principle is simple: your answers are yours. We don't touch them.",
    points: [
      {
        title: "No account by default",
        text: "No login, no registration. We neither request nor collect names, emails, phone numbers or anything personally identifying.",
      },
      {
        title: "Answers live in your browser",
        text: "Progress and results are stored in your device's localStorage and processed entirely locally — nothing is uploaded. We have no database and cannot see any of your answers.",
      },
      {
        title: "Clearing browser data may erase records",
        text: "Because data exists only on your device, clearing browser data, using private mode or switching devices may erase your record irrecoverably.",
      },
      {
        title: "Sharing shares only the personality result",
        text: "Share links and cards contain only the type code, six tendency scores and consistency level — no names, no answer content, no personal data.",
      },
      {
        title: "Never for employment, insurance or medical use",
        text: "We do not (and cannot) use your answers for employment, insurance, medical or any screening judgements — and please don't use your results that way either.",
      },
    ],
    footnote:
      "This is a static site whose core features work without any backend. If a hosting platform (e.g. Vercel, Netlify) provides basic anonymous traffic statistics, those statistics contain none of your answer content. Additionally, the operator may optionally enable a minimal anonymous event counter (off by default): it records only event names like “test started” / “test completed” plus the interface language, to understand completion rates — no identifiers, no cookies, no answer content, no personality results, and the browser's Do Not Track setting is respected.",
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        title: "Nature of the Service",
        paragraphs: [
          "{siteName} offers a free self-exploration test and related content, for personal exploration and growth reference only — it constitutes no form of professional advice.",
        ],
        list: [],
      },
      {
        title: "Disclaimer",
        paragraphs: [],
        list: [
          "This is not the official MBTI test; it has no academic validation and provides no medical, psychological or hiring conclusions.",
          "Results describe preference tendencies at answering time — not fixed identity — and must not ground career, partner, hiring, insurance or any screening decisions.",
          "If you are experiencing psychological distress, please seek qualified professional help rather than relying on this test.",
        ],
      },
      {
        title: "Content Use",
        paragraphs: [
          "The question bank, type names and descriptions are original content. Feel free to share result links and cards; please don't mass-republish or use the content commercially without permission.",
        ],
        list: [],
      },
      {
        title: "Changes to the Service",
        paragraphs: [
          "We may adjust the question bank, scoring or content to improve quality; old result links keep showing their original scores, but retaking the test may yield different results.",
        ],
        list: [],
      },
    ],
  },
  shareCard: {
    disclaimer: "For self-exploration only · Not official MBTI · Not a diagnosis",
    ogMotto: "Understand how you decide and how you connect",
  },
  dimensions: DIMENSION_META_EN,
  questions: QUESTIONS_EN,
  cores: CORE_PROFILES_EN,
  subtypes: SUBTYPE_PROFILES_EN,
};
