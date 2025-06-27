#!/bin/bash

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的插件
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

# 设定源、目标文件名
FILE_TO_INSERT="/Users/max/Documents/GitHub/VLOOK/docs/js/vlook-min.js"
TARGET_FILE="/Users/max/Documents/GitHub/VLOOK/released/plugin/plugin.txt"

# 设置开始与结束内容的特定模式
start_pattern="\/\* \↓↓↓ VLOOK\.js \↓↓↓ \*\/"
end_pattern="\/\* \↑↑↑ VLOOK\.js \↑↑↑ \*\/"

echo "删除插件中旧的 vlook-min.js 内容..."
sed -i '' "/$start_pattern/,/$end_pattern/{//!d;}" "$TARGET_FILE"

echo "发布最新的插件..."
sed -i '' "/$start_pattern/G" "$TARGET_FILE"
sed -i '' "/$start_pattern/r $FILE_TO_INSERT" "$TARGET_FILE"

echo "将最新插件的内容复制到粘贴板..."
cat "$TARGET_FILE" | LANG=zh_CN.UTF-8 pbcopy

echo "[ ALL DONE ]"
echo "----------"
echo "请到 Typora 对应的导出配置中直接粘贴插件内容到「在 <head /> 中添加」配置内"