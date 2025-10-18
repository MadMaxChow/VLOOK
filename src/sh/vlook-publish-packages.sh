#!/bin/bash
set -e
# 定义错误捕获
trap 'echo "❌ 出错了！文件：${BASH_SOURCE[1]} 行号：${BASH_LINENO[0]}"; exit 1' ERR
# 引入工具库
source ./vlook-utils.sh

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的下载包
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

# 输入 / 输出目录
VLOOK_HOME="$HOME/Documents/GitHub/VLOOK"
OUTPUT_DIR="$HOME/Documents/GitHub/VLOOK-misc/packages"
UPDATE_FILE="$VLOOK_HOME/docs/act/chk-update.html"

# 判断文件/目录是否存在
check_exists "$UPDATE_FILE"

# 删除旧的下载包
rm -f "$OUTPUT_DIR"/*.zip

# 提取并检查当前的版本号信息
cd "$VLOOK_HOME"
VERSION=$(grep 'lstVer = "' "$UPDATE_FILE" | sed -E 's/.*lstVer = "(.*)";$/\1/')
check_version "$VERSION"
echo "当前版本：$VERSION"

# 指定要打包的文件夹或文件
PACKAGES=(
    "VLOOK-released:released"
    "VLOOK-src:docs released src README*.md LICENSE"
)

# 创建下载包
for item in "${PACKAGES[@]}"; do
    name="${item%%:*}"       # 获取包名
    contents="${item#*:}"    # 获取内容
    
    echo "--------------------"
    echo "创建下载包 ${OUTPUT_DIR}/${name}-${VERSION}.zip"
    echo "内容包括：${contents}"
    
    zip -r -q -9 "$OUTPUT_DIR/${name}-${VERSION}.zip" $contents --exclude "*.DS_Store" "*/._*" "config.codekit*" ".git" ".gitignore" ".idea" "thumbs.db" ".Trashes"
    
    echo ""
done

(
	# 检查文件数量是否达到预期
	cd $OUTPUT_DIR
	check_file_count "*-${VERSION}.zip" 2
	echo "下载包已生成"
)

echo "[ ALL DONE ]"