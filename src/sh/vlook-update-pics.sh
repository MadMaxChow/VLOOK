#!/bin/bash

# # # # # # # # # # # # # # # # # # # #
#
# 用于将新的 pic 资源更新至 VLOOK™ 的多个子目录内
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

cd /Users/max/Documents/GitHub/pic-temp

echo "复制 pic-temp 的内容至 VLOOK/samples/pic..."
cp -f * ../VLOOK/samples/pic

echo "复制 pic-temp 的内容至 VLOOK/released/samples/pic..."
cp -f * ../VLOOK/released/samples/pic

# echo "复制 pic-temp 的内容至 VLOOKres/pic..."
# cp -f * ../VLOOKres/pic

rm *.jpg *.png *.jpeg *.ico *.svg

echo "[ ALL DONE ]"