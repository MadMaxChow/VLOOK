#!/bin/bash
# ./toggle-typora-print.sh ../../docs/index.html
# ./toggle-typora-print.sh ../../docs/guide.html

HTML_FILE="$1"

cd ../../docs/

if [[ ! -f "$HTML_FILE" ]]; then
  echo "File not found: $HTML_FILE"
  exit 1
fi

if grep -q "<body class='typora-print " "$HTML_FILE"; then
  # 已存在 typora-print → 移除
  sed -i '' "s/<body class='typora-print /<body class='/g" "$HTML_FILE"
  echo "${HTML_FILE} [- REMOVED] body.typora-print"
else
  # 不存在 → 添加
  sed -i '' "s/<body class='/<body class='typora-print /g" "$HTML_FILE"
  echo "${HTML_FILE} [+ ADDED] body.typora-print"
fi

echo "---"