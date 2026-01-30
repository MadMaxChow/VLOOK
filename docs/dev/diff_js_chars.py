#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# 用于对比压缩发布后的 js 代码不同版本间的差异

from sourcemap import load
import sys

def safe_lookup(sm, line, column, max_backtrack=50):
    """
    安全地在 source map 中查找最接近的映射点
    """
    # ❶ 非法坐标直接拒绝
    if line is None or column is None:
        return None
    if line < 0 or column < 0:
        return None

    # ❷ 回退 column 查找
    for delta in range(max_backtrack + 1):
        col = column - delta
        if col < 0:
            break
        try:
            return sm.lookup(line, col)
        except (IndexError, KeyError):
            continue

    return None
    
def load_file(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()

def build_line_col_map(js_code):
    """把 index 映射成 (line, col)"""
    line = col = 0
    mapping = []
    for ch in js_code:
        mapping.append((line, col))
        if ch == "\n":
            line += 1
            col = 0
        else:
            col += 1
    return mapping

def format_orig(token):
    if not token:
        return "[no mapping]"

    src = getattr(token, "src", None)
    line = getattr(token, "src_line", None)
    col = getattr(token, "src_col", None)
    name = getattr(token, "name", None)

    if src is None or line is None:
        return "[no mapping]"

    # source map 行列通常是 0-based，输出给人看时 +1
    line += 1
    if col is not None:
        col += 1

    result = f"{src}:{line}"
    if col is not None:
        result += f":{col}"
    if name:
        result += f"  ({name})"

    return result
    
def main(js1, map1, js2, map2):
    code1 = load_file(js1)
    code2 = load_file(js2)

    sm1 = load(open(map1, "r", encoding="utf-8"))
    sm2 = load(open(map2, "r", encoding="utf-8"))

    pos1 = build_line_col_map(code1)
    pos2 = build_line_col_map(code2)

    max_len = max(len(code1), len(code2))

    diff = 0

    for i in range(max_len):
        c1 = code1[i] if i < len(code1) else None
        c2 = code2[i] if i < len(code2) else None

        if c1 != c2:
            diff += 1

            l1, c1_pos = pos1[i] if i < len(pos1) else (-1, -1)
            l2, c2_pos = pos2[i] if i < len(pos2) else (-1, -1)

            orig1 = safe_lookup(sm1, l1, c1_pos)
            orig2 = safe_lookup(sm2, l2, c2_pos)

            print("=" * 80)
            print(f"Diff #{diff} at minified index {i}")
            print(f"JS1 char: {repr(c1)}")
            print(f"JS2 char: {repr(c2)}")

            print("→ Source from file1:")
            print(format_orig(orig1))

            print("→ Source from file2:")
            print(format_orig(orig2))

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python diff_with_sourcemap.py a.min.js a.min.js.map b.min.js b.min.js.map")
        sys.exit(1)

    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])