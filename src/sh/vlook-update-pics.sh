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

echo "复制 pic-temp 的内容至 VLOOK/docs/pic..."
cp -f * ../VLOOK/docs/pic

echo "复制 pic-temp 的内容至 VLOOK/released/docs/pic..."
cp -f * ../VLOOK/released/docs/pic

echo "复制 pic-temp 的内容至 VLOOKres/pic..."
cp -f * ../VLOOKres/pic

echo "[ ALL DONE ]"