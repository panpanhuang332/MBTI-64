/**
 * 以 OpenCC 將 zh-TW canonical bundle 逐字轉換為 zh-CN，
 * 輸出 src/lib/i18n/zh-cn.generated.json（提交進版本庫）。
 *
 * 修改任何繁中文案後執行：npm run generate-zh-cn
 * （validate-data 會檢查生成檔結構是否與 canonical 同步）
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import * as OpenCC from "opencc-js";
import { canonicalBundle } from "../src/lib/i18n/canonical";

// twp：含台灣用語→大陸用語的詞彙轉換（資訊→信息、瀏覽器→浏览器…）
const convert = OpenCC.Converter({ from: "twp", to: "cn" });

/** OpenCC 詞庫沒涵蓋的少數用語，轉換後再修正 */
const FIXUPS: Array<[RegExp, string]> = [
  [/座标/g, "坐标"], // 座標 → 坐标
];

function convertText(s: string): string {
  let out = convert(s);
  for (const [pattern, replacement] of FIXUPS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function deepConvert(value: unknown): unknown {
  if (typeof value === "string") return convertText(value);
  if (Array.isArray(value)) return value.map(deepConvert);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        deepConvert(v),
      ])
    );
  }
  return value;
}

const converted = deepConvert(canonicalBundle);
const outPath = join(process.cwd(), "src/lib/i18n/zh-cn.generated.json");
writeFileSync(outPath, JSON.stringify(converted, null, 1) + "\n", "utf8");
console.log(`✅ zh-CN bundle 已生成 → ${outPath}`);
