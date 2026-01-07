# 执行方式
# python3 ext-lang-id.py ext-lang-id.csv

import re
import sys

if len(sys.argv) < 2:
    print("Usage: python extract_v_lang_text.py <file.js>")
    sys.exit(1)

with open(sys.argv[1], "r", encoding="utf-8") as f:
    code = f.read()

pattern = re.compile(r'V_lang_text\s*\(\s*([0-9]+)\s*,')
values = sorted(set(pattern.findall(code)), key=int)

for v in values:
    print(v)