#!/bin/bash

# 检查是否传入版本号参数
if [ -z "$1" ]; then
  echo "❌ 使用方法: $0 <版本号>"
  echo "例如: $0 V30.2"
  exit 1
fi

VERSION="$1"
THEME_PATH="/Users/max/Library/Application Support/abnerworks.Typora/themes"
CSS_BEFORE=".sidebar-content:before{content:"
CSS_COLOR="color:var(--ac-t2);background:var(--ac-t2-a);"
CSS_CONTENT_OFFICAL="${CSS_BEFORE}'VLOOK™ only •• live';${CSS_COLOR}}"
CSS_CONTENT_BUILD_IN="${CSS_BEFORE}'VLOOK™ built-in •• live';${CSS_COLOR}}"
CSS_CONTENT_VIP="${CSS_BEFORE}'💎 VIP •• live';${CSS_COLOR}}"

# ===========================
# 公共函数
# 参数1: 主题关键字数组名称
# 参数2: host 地址（不带 https://，例如 madmaxchow.github.io/VLOOK）
# ===========================
generate_css_files() {
  local css_content=$1
  local host_theme=$2
  local host_fs=$3
  shift 3  # 剩余参数即关键字列表

  for kw in "$@"; do
    srcfile="$THEME_PATH/dev-vlook-${kw}.css"
    outcss="$THEME_PATH/vlook-live-${kw}.css"

    # 提取 fs-*.css
    if [ -f "$srcfile" ]; then
      fscss=$(grep -oE 'fs-[^[:space:]]*-min\.css' "$srcfile" | head -n1)
    else
      fscss="${css_content}"
    fi

    # 生成文件
    {
      echo "@import 'https://${host_theme}/$VERSION/vlook-${kw}.css';"
      if [ -n "$fscss" ]; then
        echo "@import 'https://${host_fs}/$VERSION/$fscss';"
      fi
      echo "${css_content}"
    } > "$outcss"

    #echo "✅ 已生成 $outcss"
  done
}

# ===========================
# 分组处理
# 第 1 组 KEYWORDS & HOST
VLOOK_HOST="madmaxchow.github.io/VLOOK"
OPENFONTS_HOST="madmaxchow.github.io/openfonts/css"
generate_css_files "$CSS_CONTENT_BUILD_IN" "$VLOOK_HOST" "$OPENFONTS_HOST" fancy geek hope joint solaris thinking

# 第 2 组 KEYWORDS & HOST
VIP_HOST="<your-host>"
generate_css_files "$CSS_CONTENT_VIP" "lohas.pages.dev" "lohas.pages.dev" x-dic
#generate_css_files ""$CSS_CONTENT_VIP" "$VIP_HOST" "$VIP_HOST" x-tianmi

# ===========================
# Owl 主题关键字清单
KEYWORDS=("owl" "owl-en" "owl-vip" "owl-vip-en")
# 遍历关键字生成文件
for kw in "${KEYWORDS[@]}"; do
  outcss="$THEME_PATH"/vlook-live-$kw.css
  echo "@import 'https://$OPENFONTS_HOST/github-io/$VERSION/vlook-$kw.css';${CSS_CONTENT_OFFICAL}" > "$outcss"
  #echo "✅ 已生成 $outcss"
done
