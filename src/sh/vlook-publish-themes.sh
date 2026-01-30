#!/bin/bash
set -e
# 定义错误捕获
trap 'echo "❌ 出错了！文件：${BASH_SOURCE[1]} 行号：${BASH_LINENO[0]}"; exit 1' ERR
# 引入工具库
source ./vlook-utils.sh

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的主题包
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
VLOOK_SRC_SH_DIR="$VLOOK_HOME/src/sh"
VIP_THEME_DIR="$HOME/Documents/GitHub/VLOOK-vip-themes/css"
OPENFONTS_CSS_DIR="$HOME/Documents/GitHub/openfonts/css"
# 判断文件/目录是否存在
check_exists "$VLOOK_OWL_CSS"
check_exists "$VLOOK_HOME"
check_exists "$VLOOK_RELEASED_DIR"
check_exists "$VLOOK_DOCS_DIR"
check_exists "$VLOOK_SRC_SH_DIR"
check_exists "$VIP_THEME_DIR"
check_exists "$VIP_THEME_DIR"

# 提取并检查主题的版本信息
VERSION=$(grep 'v-theme-version' "$VLOOK_OWL_CSS" | sed -E 's/.*v-theme-version:"([^"]+)".*/\1/')
check_version "$VERSION"
echo "当前版本：$VERSION"

# ----------

echo "处理主题文件..."

# 生成当前版本的 live 主题
./vlook-gen-live-themes.sh "$VERSION"

# 复制生成的 live 主题到发布目录下
cd "$VLOOK_RELEASED_DIR"
cp -f "$TYPORA_THEME_DIR"/vlook-live-*.css themes-live/
# 删除不需要对外发布的 live 主题
rm -f themes-live/vlook-live-x-*.css
rm -f themes-live/vlook-live-owl*.css

# 先删除旧的离线版主题文件
rm -f themes/*.css
# 复制新版本离线版主题到 themes 目录
cd themes
cp "$TYPORA_THEME_DIR"/dev-vlook-*.css ./
# 移除主题文件名的 dev- 前缀
find . -type f -name "dev-*.css" -exec bash -c 'mv "$0" "$(echo $0 | sed s/dev-//)"' {} \;

# 将私人定制主题移动到 themes-vip 目录
rm -f "$VIP_THEME_DIR"/*.css
mv vlook-x-*.css "$VIP_THEME_DIR"

# 创建 openfonts 项目的相关目录
rm -rf "$OPENFONTS_CSS_DIR/pages-dev/$VERSION/*.css"
rm -rf "$OPENFONTS_CSS_DIR/github-io/$VERSION/*.css"
#mkdir -p "$OPENFONTS_CSS_DIR/$VERSION"
#mkdir -p "$OPENFONTS_CSS_DIR/$VERSION/pages-dev"
#mkdir -p "$OPENFONTS_CSS_DIR/$VERSION/github-io"
mkdir -p "$OPENFONTS_CSS_DIR/pages-dev/$VERSION"
mkdir -p "$OPENFONTS_CSS_DIR/github-io/$VERSION"

# 将 Owl 主题是复制到 openfonts 项目目录
#mv vlook-owl*.css "$OPENFONTS_CSS_DIR/pages-dev/$VERSION"
mv vlook-owl*.css "$OPENFONTS_CSS_DIR/github-io/$VERSION"
(
	# 检查文件数量是否达到预期
	cd "$OPENFONTS_CSS_DIR/github-io/$VERSION"
	check_file_count "vlook-owl*.css" 4
	echo " - Owl (live) 主题已发布"
)

# 将内置主题复制到 docs 的当前版本目录下
cp vlook-*.css "$VLOOK_DOCS_DIR/$VERSION/"
(
	# 检查文件数量是否达到预期
	cd "$VLOOK_DOCS_DIR/$VERSION"
	check_file_count "vlook-*.css" 6
	echo " - 内置主题已发布"
)

# 将内置主题复制到发行版本的 themes 和 themes-live 目录
mkdir -p ../themes-live/$VERSION
cp -f vlook-*.css ../themes-live/$VERSION
# ----------

echo "处理网络字体..."

# 将网络字体定义文件复制到 openfonts/css 目录下
# cd "$OPENFONTS_CSS_DIR/dev"
cp -f "$OPENFONTS_CSS_DIR"/pages-dev/dev/fs-*-min.css "$OPENFONTS_CSS_DIR/pages-dev/$VERSION"
cp -f "$OPENFONTS_CSS_DIR"/github-io/dev/fs-*-min.css "$OPENFONTS_CSS_DIR/github-io/$VERSION"
(
	# 检查文件数量是否达到预期
	cd "$OPENFONTS_CSS_DIR/pages-dev/$VERSION"
	check_file_count "fs-*-min.css" 6
	cd "$OPENFONTS_CSS_DIR/github-io/$VERSION"
	check_file_count "fs-*-min.css" 6
	echo " - 字体风格定义文件已发布至 openfonts"
)

# 将网络字体定义文件复制到发布目录下的 themes/vlook 目录下
rm -f "$VLOOK_RELEASED_DIR"/themes/vlook/pages-dev/*.css
cd "$OPENFONTS_CSS_DIR"
cp -f pages-dev/dev/fs-*-min.css "$VLOOK_RELEASED_DIR/themes/vlook/pages-dev"
cp -f github-io/dev/fs-*-min.css "$VLOOK_RELEASED_DIR/themes/vlook/github-io"
(
	# 检查文件数量是否达到预期
	cd "$VLOOK_RELEASED_DIR/themes/vlook/pages-dev"
	check_file_count "fs-*-min.css" 6
	cd "$VLOOK_RELEASED_DIR/themes/vlook/github-io"
	check_file_count "fs-*-min.css" 6
	echo " - 字体风格定义文件已更新至 Typora"
)

# 将网络字体定义文件复制到 Typora 的主题目录下
rm -rf "$TYPORA_THEME_DIR/vlook"
cp -a "$VLOOK_RELEASED_DIR/themes/vlook" "$TYPORA_THEME_DIR"

# 将网络字体定义文件复制到 plugin-live 目录下
#rm -rf "$VLOOK_RELEASED_DIR/plugin-live"/V*/
mkdir -p "$VLOOK_RELEASED_DIR/plugin-live/$VERSION"
cd "$OPENFONTS_CSS_DIR/pages-dev/dev"
cp -f fs-*.css "$VLOOK_RELEASED_DIR/themes-live/$VERSION"
(
	# 检查文件数量是否达到预期
	cd "$VLOOK_RELEASED_DIR/themes-live/$VERSION"
	check_file_count "fs-*-min.css" 6
	echo " - 字体风格定义文件已发布至 released"
)
# 并将域名内容更新为 <your-host>
cd "$VLOOK_SRC_SH_DIR"
# perl process-fs-min-for-live.pl "$VLOOK_RELEASED_DIR/themes-live/$VERSION" "$VERSION"
perl process-fs-min-for-live.pl "$VLOOK_RELEASED_DIR/themes-live/$VERSION"

# 将 themes-live 目录下在线主题的网络字体 @import 内容更新为 <your-host>
perl process-themes-for-live.pl "$VLOOK_RELEASED_DIR/themes-live" "$VERSION"

# 将 themes-live 目录下被引用主题（实体）的网络字体 @import 内容更新为 <your-host>
perl process-themes-for-live.pl "$VLOOK_RELEASED_DIR/themes-live/$VERSION" "$VERSION"

echo "[ ALL DONE ]"
