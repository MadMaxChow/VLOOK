#!/bin/bash
set -e
# 定义错误捕获
trap 'echo "❌ 出错了！文件：${BASH_SOURCE[1]} 行号：${BASH_LINENO[0]}"; exit 1' ERR
# 引入工具库
source ./vlook-utils.sh

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的插件
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

# Typora 相关变量
TYPORA_THEME_DIR="$HOME/Library/Application Support/abnerworks.Typora/themes"
# 判断文件/目录是否存在
check_exists "$TYPORA_THEME_DIR"

# VLOOK 相关变量
VLOOK_OWL_CSS="$TYPORA_THEME_DIR/dev-vlook-owl.css"
VLOOK_HOME="$HOME/Documents/GitHub/VLOOK"
VLOOK_RELEASED_DIR="$VLOOK_HOME/released"
VLOOK_DOCS_DIR="$VLOOK_HOME/docs"

# 提取并检查主题的版本信息
VERSION=$(grep 'v-theme-version' "$VLOOK_OWL_CSS" | sed -E 's/.*v-theme-version:"([^"]+)".*/\1/')
check_version "$VERSION"
echo "当前版本：$VERSION"

# 创建对应版本目录
mkdir -p "$VLOOK_RELEASED_DIR/plugin-live/$VERSION"
mkdir -p "$VLOOK_DOCS_DIR/$VERSION"

# ----------

# 发布「在线模式」插件
echo "发布在线模式插件..."
cd "$VLOOK_DOCS_DIR/dev"
cp -f clipboard.js jquery.* start.js svg-inject.js vlook-min.* "$VLOOK_RELEASED_DIR/plugin-live/$VERSION/"
cp -f clipboard.js jquery.* start.js svg-inject.js vlook-min.* "$VLOOK_DOCS_DIR/$VERSION"

# 发布「在线模式」语言包
echo "发布在线模式语言包..."
cd "$VLOOK_RELEASED_DIR/plugin/lang"
LANG_DIR="$VLOOK_DOCS_DIR/$VERSION/lang"
mkdir -p "$LANG_DIR"
rm -f "$LANG_DIR"/*.js
cp -f Detusch.txt "$LANG_DIR"/de.js
cp -f Español.txt "$LANG_DIR"/es.js
cp -f Français.txt "$LANG_DIR"/fr.js
cp -f Português.txt "$LANG_DIR"/pt.js
cp -f Русский.txt "$LANG_DIR"/ru.js
cp -f العربية.txt "$LANG_DIR"/ar.js
cp -f 한국어.txt "$LANG_DIR"/ko.js
cp -f 日本語.txt "$LANG_DIR"/ja.js
cp -f 繁体中文.txt "$LANG_DIR"/zhtd.js
# 清除文件中的 <script> 和 </script>
cd "$LANG_DIR"
perl -pi -e 's/<script>//g; s/<\/script>//g' *.js

# 同时将处理后的语言文件发布到 dev、released
cp -f "$VLOOK_DOCS_DIR/$VERSION/lang"/*.js "$VLOOK_DOCS_DIR/dev/lang"
mkdir -p "$VLOOK_RELEASED_DIR/plugin-live/$VERSION/lang"
cp -f "$VLOOK_DOCS_DIR/$VERSION/lang"/*.js "$VLOOK_RELEASED_DIR/plugin-live/$VERSION/lang"

# ----------

# 发布「离线模式」插件

# 设定源、目标文件名
FILE_TO_INSERT="$VLOOK_DOCS_DIR/dev/vlook-min.js"
TARGET_FILE="$VLOOK_RELEASED_DIR/plugin/plugin.txt"
# 判断文件/目录是否存在
check_exists "$FILE_TO_INSERT"
check_exists "$TARGET_FILE"

# 设置开始与结束内容的特定模式
start_pattern="\/\* \↓↓↓ VLOOK\.js \↓↓↓ \*\/"
end_pattern="\/\* \↑↑↑ VLOOK\.js \↑↑↑ \*\/"

# 删除插件中旧的 vlook-min.js 内容
sed -i '' "/$start_pattern/,/$end_pattern/{//!d;}" "$TARGET_FILE"

# 发布最新的插件
sed -i '' "/$start_pattern/G" "$TARGET_FILE"
sed -i '' "/$start_pattern/r $FILE_TO_INSERT" "$TARGET_FILE"

# 将最新插件的内容复制到粘贴板
cat "$TARGET_FILE" | LANG=zh_CN.UTF-8 pbcopy

# 判断是否发布成功
if ! grep -q "vlook_min=function()" "$TARGET_FILE"; then
  echo "Error: 插件内容未发布成功"
  exit 1
fi
echo "插件内容已发布"

echo "[ ALL DONE ]"
