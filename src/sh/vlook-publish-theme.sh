#!/bin/bash

# # # # # # # # # # # # # # # # # # # #
#
# 用于发布 VLOOK™ 的主题包
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

echo "删除旧的主题文件..."
cd /Users/max/Documents/GitHub/VLOOK/docs/css
rm *.css

echo "复制新生成的主题文件到 docs/css 目录..."
cp /Users/max/Library/Application\ Support/abnerworks.Typora/themes/dev-vlook*.css ./
# find /Users/max/Library/Application\ Support/abnerworks.Typora/themes -type f -name "dev-vlook*.css" -exec grep -L 'version:"EXPIRED"' {} + | while IFS= read -r file; do
#     cp "$file" ./
# done

echo "替换开发版本主题文件的标识..."
find . -type f -name "dev-*.css" -exec bash -c 'mv "$0" "$(echo $0 | sed s/dev-//)"' {} \;

echo "将私人定制主题移动到 vip 目录..."
rm ../../../VLOOK-misc/vip-themes/*.css
mv vlook-x-*.css ../../../VLOOK-misc/vip-themes/

echo "将默认配套主题复制到发行版本的 theme 目录..."
cp -f vlook-*.css ../../released/themes

echo "[ ALL DONE ]"