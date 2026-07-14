/**
 * 資料驗證腳本：build 前自動執行（npm run validate-data / prebuild）。
 * 驗證題庫與 64 型 profile 資料，任何錯誤都會讓 build 失敗。
 */
import { QUESTIONS } from "../src/lib/questions";
import { validateQuestionBank } from "../src/lib/validate-questions";
import { validateProfiles } from "../src/lib/profiles";
import { validateBundles } from "../src/lib/i18n";
import { QUESTIONS_EN } from "../src/lib/i18n/en/questions";

const questionIssues = validateQuestionBank(QUESTIONS);
const profileErrors = validateProfiles();

let failed = false;

// 語系 bundle 驗證（zh-CN 生成檔與 en 翻譯結構須與 canonical 同步）
const bundleErrors = validateBundles();
for (const q of QUESTIONS) {
  if (!QUESTIONS_EN[q.id]) {
    bundleErrors.push(`[en] 題目 ${q.id} 缺少英文翻譯`);
  }
}
if (bundleErrors.length > 0) {
  console.error("❌ 語系資料驗證失敗：");
  for (const message of bundleErrors) console.error(`  ${message}`);
  failed = true;
} else {
  console.log("✅ 語系資料驗證通過（zh-TW / zh-CN / en）");
}

if (questionIssues.length > 0) {
  console.error("❌ 題庫驗證失敗：");
  for (const issue of questionIssues) {
    console.error(`  [${issue.level}] ${issue.message}`);
  }
  failed = failed || questionIssues.some((i) => i.level === "error");
} else {
  console.log(`✅ 題庫驗證通過（${QUESTIONS.length} 題）`);
}

if (profileErrors.length > 0) {
  console.error("❌ 類型資料驗證失敗：");
  for (const message of profileErrors) {
    console.error(`  ${message}`);
  }
  failed = true;
} else {
  console.log("✅ 類型資料驗證通過（16 核心 × 4 子型 = 64 型）");
}

if (failed) {
  process.exit(1);
}
