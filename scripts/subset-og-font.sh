#!/usr/bin/env bash
# 將 Noto Sans TC（SIL OFL 1.1）子集化為 OG 圖所需的字元，
# 產生 assets/fonts/NotoSansTC-OG-{Bold,Regular}.otf 與 og-chars.txt。
#
# 何時需要執行：修改了品牌名、類型名稱、副標或代表語，
# generate-og 回報「子集字型沒有的字元」時。
#
# 需求：python3 + fonttools（pip install fonttools）、curl。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_DIR="$ROOT/assets/fonts"
TMP_DIR="${TMPDIR:-/tmp}/noto-tc-download"
mkdir -p "$FONT_DIR" "$TMP_DIR"

BASE_URL="https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/TC"

for weight in Bold Regular; do
  src="$TMP_DIR/NotoSansTC-$weight.otf"
  if [ ! -f "$src" ]; then
    echo "下載 NotoSansTC-$weight.otf …"
    curl -sSL -o "$src" "$BASE_URL/NotoSansTC-$weight.otf"
  fi
done

if [ ! -f "$FONT_DIR/LICENSE-OFL.txt" ]; then
  curl -sSL -o "$FONT_DIR/LICENSE-OFL.txt" \
    "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/LICENSE"
fi

# 由程式碼收集 OG 圖實際用到的字元
npx tsx "$ROOT/scripts/collect-og-chars.ts" > "$FONT_DIR/og-chars.txt"
echo "OG 字元數：$(python3 -c "print(len(open('$FONT_DIR/og-chars.txt', encoding='utf8').read()))")"

for weight in Bold Regular; do
  python3 -m fontTools.subset "$TMP_DIR/NotoSansTC-$weight.otf" \
    --text-file="$FONT_DIR/og-chars.txt" \
    --output-file="$FONT_DIR/NotoSansTC-OG-$weight.otf" \
    --layout-features='*' --no-hinting --desubroutinize
  ls -la "$FONT_DIR/NotoSansTC-OG-$weight.otf"
done

echo "✅ 字型子集化完成 → $FONT_DIR"
