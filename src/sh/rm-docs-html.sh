#!/bin/bash

# # # # # # # # # # # # # # # # # # # #
#
# 重新生成私人定制主题案例展示的 HTML 前，删除旧的文件
#
# powered by MAX°孟兆
# QQ Group: 805502564
# Telegram Channel: t.me/vlook_markdown
#
# # # # # # # # # # # # # # # # # # # #

cd /Users/max/Documents/GitHub/VLOOK/docs

echo "删除旧的私人定制主题案例展示 html ..."
FILENAME="$1.html"
rm $FILENAME

echo "[ ALL DONE ]"