#!/bin/bash

# 检查是否传入版本号参数
if [ -z "$1" ]; then
  echo "❌ 使用方法: $0 <版本号>"
  echo "例如: $0 V30.2"
  exit 1
fi

VERSION="$1"
THEME_PATH="/Users/max/Library/Application Support/abnerworks.Typora/themes"

# ===========================
# 公共函数
# 参数1: 主题关键字数组名称
# 参数2: host 地址（不带 https://，例如 madmaxchow.github.io/VLOOK）
# ===========================
generate_css_files() {
  local host_theme=$1
  local host_fs=$2
  shift 2  # 剩余参数即关键字列表

  for kw in "$@"; do
    srcfile="$THEME_PATH/dev-vlook-${kw}.css"
    outcss="$THEME_PATH/vlook-live-${kw}.css"

    # 提取 fs-*.css
    if [ -f "$srcfile" ]; then
      fscss=$(grep -oE 'fs-[^[:space:]]*-min\.css' "$srcfile" | head -n1)
    else
      fscss=""
    fi

    # 生成文件
    {
      echo "@import 'https://${host_theme}/$VERSION/vlook-${kw}.css';"
      if [ -n "$fscss" ]; then
        echo "@import 'https://${host_fs}/github-io/$VERSION/$fscss';"
      fi
    } > "$outcss"

    #echo "✅ 已生成 $outcss"
  done
}

# ===========================
# 分组处理
# 第 1 组 KEYWORDS & HOST
VLOOK_HOST="madmaxchow.github.io/VLOOK"
OPENFONTS_HOST="madmaxchow.github.io/openfonts/css"
generate_css_files "$VLOOK_HOST" "$OPENFONTS_HOST" fancy geek hope joint solaris thinking

# 第 2 组 KEYWORDS & HOST
VIP_HOST="<your-host>"
generate_css_files "$VIP_HOST" "$VIP_HOST" x-dic x-tianmi

# ===========================
# Owl 主题关键字清单
KEYWORDS=("owl" "owl-en" "owl-vip" "owl-vip-en")
# 遍历关键字生成文件
for kw in "${KEYWORDS[@]}"; do
  outcss="$THEME_PATH"/vlook-live-$kw.css
  echo "@import 'https://$OPENFONTS_HOST/github-io/$VERSION/vlook-$kw.css';" > "$outcss"
  #echo "✅ 已生成 $outcss"
done
