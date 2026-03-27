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

# ===========================
# 提取主题类型信息
# 参数: 主题文件路径
# ===========================
get_theme_type() {
	local srcfile="$1"
	local extracted=""
	
	# 如果源文件存在且包含 CSS_BEFORE，则提取 content 内容
	if [ -f "$srcfile" ] && grep -q "$CSS_BEFORE" "$srcfile"; then
	  extracted=$(sed -n 's/.*\'"${CSS_BEFORE}"'"\([^"]*\)".*/\1/p' "$srcfile" | head -n1)
	  if [ -n "$extracted" ]; then
    	thmtype="$extracted"
	  fi
	fi
	
	# 输出结果
	echo "$extracted"
}

# ===========================
# 生成 live CSS 文件
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
    fi
    
    # 提取主题类型信息
	thmtype=$(get_theme_type "$srcfile")
	# echo "${thmtype}"

    # 生成文件
    {
      echo "@import 'https://${host_theme}/$VERSION/vlook-${kw}.css';"
      if [ -n "$fscss" ]; then
        echo "@import 'https://${host_fs}/$VERSION/$fscss';"
      fi
      echo "${CSS_BEFORE}'${thmtype} •• live';${CSS_COLOR}}"
    } > "$outcss"

    #echo "✅ 已生成 $outcss"
  done
}

# ===========================
# 分组处理
# 第 1 组 KEYWORDS & HOST
#VLOOK_HOST="madmaxchow.github.io/VLOOK"
OPENFONTS_HOST="madmaxchow.github.io/openfonts/css"
#generate_css_files "$VLOOK_HOST" "$OPENFONTS_HOST" fancy geek hope joint solaris thinking
generate_css_files "<your-host>" "<your-host>" fancy geek hope joint solaris thinking

# 第 2 组 KEYWORDS & HOST
generate_css_files "lohas.pages.dev" "lohas.pages.dev" x-dic
generate_css_files "ignorance-shiyao.github.io/ignorance" "ignorance-shiyao.github.io/ignorance" x-ignorance
generate_css_files "github.com/RE-TikaRa/Article" "github.com/RE-TikaRa/Article" x-alp-studio

# ===========================
# Owl 主题关键字清单
KEYWORDS=("owl" "owl-en" "owl-vip" "owl-vip-en")
# 如果源文件存在且包含 CSS_BEFORE，则提取 content 内容
	if [ -f "$srcfile" ] && grep -q "$CSS_BEFORE" "$srcfile"; then
	  extracted=$(sed -n 's/.*\'"${CSS_BEFORE}"'"\([^"]*\)".*/\1/p' "$srcfile" | head -n1)
	  if [ -n "$extracted" ]; then
    	thmtype="$extracted"
	  fi
	fi
# 遍历关键字生成文件
for kw in "${KEYWORDS[@]}"; do
  outcss="$THEME_PATH"/vlook-live-$kw.css
  srcfile="$THEME_PATH"/dev-vlook-$kw.css
  thmtype=$(get_theme_type "$srcfile")
  {
	  echo "@import 'https://$OPENFONTS_HOST/github-io/$VERSION/vlook-$kw.css';"
	  echo "${CSS_BEFORE}'${thmtype} •• live';${CSS_COLOR}}"
  } > "$outcss"
  #echo "✅ 已生成 $outcss"
done
