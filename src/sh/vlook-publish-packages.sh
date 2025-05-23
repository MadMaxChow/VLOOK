#!/bin/bash

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的下载包
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

# 输入/输出目录
INPUT_DIR="/Users/max/Documents/GitHub/VLOOK"
OUTPUT_DIR="/Users/max/Documents/GitHub/VLOOK-misc/packages"

echo "删除旧的下载包..."
cd ${OUTPUT_DIR}
rm *.zip

cd ${INPUT_DIR}

# 提取当前的版本号信息
latestVer=$(grep 'latestVer = "' "${INPUT_DIR}/docs/act/chk-update.html" | sed -E 's/.*latestVer = "(.*)";$/\1/')

# 检查版本号是否成功提取
if [[ -z "$latestVer" ]]; then
    echo "未找到 latestVer 信息"
    exit 1
fi

# 指定要打包的文件夹或文件
packages=(
    "VLOOK-released:released"
    "VLOOK-src:docs released src README*.md LICENSE"
)

# 创建下载包
for package in "${packages[@]}"; do
    name="${package%%:*}"       # 获取包名
    contents="${package#*:}"    # 获取内容
    
    echo -e "\n--------------------"
    echo -e "创建下载包 ${OUTPUT_DIR}/${name}-${latestVer}.zip\n内容包括：${contents}"
    
    zip -r -q -9 "${OUTPUT_DIR}/${name}-${latestVer}.zip" $contents --exclude "*.DS_Store" "*/._*" "config.codekit*" ".git" ".gitignore" ".idea" "thumbs.db" ".Trashes"
    
    echo ""
done

echo "[ ALL DONE ]"