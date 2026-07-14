#!/usr/bin/env bash
# 將 Noto Sans TC / SC（SIL OFL 1.1）子集化為 OG 圖所需的字元，
# 產生 assets/fonts/NotoSans{TC,SC}-OG-{Bold,Regular}.otf 與 og-chars-{tc,sc}.txt。
#
# 何時需要執行：修改了品牌名、類型名稱、副標或代表語（任一語系），
# generate-og 回報「子集字型沒有的字元」時。
#
# 需求：python3 + fonttools（pip install fonttools）、curl。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_DIR="$ROOT/assets/fonts"
TMP_DIR="${TMPDIR:-/tmp}/noto-cjk-dl"
mkdir -p "$FONT_DIR" "$TMP_DIR"

BASE_URL="https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF"

for script in TC SC; do
  for weight in Bold Regular; do
    src="$TMP_DIR/NotoSans$script-$weight.otf"
    if [ ! -f "$src" ]; then
      echo "下載 NotoSans$script-$weight.otf …"
      curl -sSL -o "$src" "$BASE_URL/$script/NotoSans$script-$weight.otf"
    fi
  done
done

if [ ! -f "$FONT_DIR/LICENSE-OFL.txt" ]; then
  curl -sSL -o "$FONT_DIR/LICENSE-OFL.txt" \
    "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/LICENSE"
fi

# 由程式碼收集 OG 圖實際用到的字元（tc = zh-TW + en；sc = zh-CN）
npx tsx "$ROOT/scripts/collect-og-chars.ts" tc > "$FONT_DIR/og-chars-tc.txt"
npx tsx "$ROOT/scripts/collect-og-chars.ts" sc > "$FONT_DIR/og-chars-sc.txt"

subset() {
  local script="$1" weight="$2" chars="$3"
  python3 -m fontTools.subset "$TMP_DIR/NotoSans$script-$weight.otf" \
    --text-file="$chars" \
    --output-file="$FONT_DIR/NotoSans$script-OG-$weight.otf" \
    --layout-features='*' --no-hinting --desubroutinize
  ls -la "$FONT_DIR/NotoSans$script-OG-$weight.otf"
}

for weight in Bold Regular; do
  subset TC "$weight" "$FONT_DIR/og-chars-tc.txt"
  subset SC "$weight" "$FONT_DIR/og-chars-sc.txt"
done

# 舊版單語系檔案不再使用
rm -f "$FONT_DIR/og-chars.txt"

echo "✅ 字型子集化完成 → $FONT_DIR"
