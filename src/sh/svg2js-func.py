#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 用法
# python3 svg2js-func.py < icon.svg > icon-js-func.js

#!/usr/bin/env python3
import sys
import xml.etree.ElementTree as ET
import re

def normalize_number(value):
    """
    数值格式化：
    - 0.5 -> .5
    - 1.0 -> 1
    """
    try:
        if '.' in value:
            value = str(float(value))
            value = re.sub(r'^0\.', '.', value)
            value = re.sub(r'\.0$', '', value)
        return value
    except ValueError:
        return '_'

def get_attr(elem, name, is_string=False):
    """
    属性读取：
    - 不存在 → _
    - 字符串 → 反引号包裹
    """
    val = elem.get(name)
    if val is None:
        return '_'
    if is_string:
        return f'"{val}"'
    return normalize_number(val)

def parse_svg(svg_text):
    root = ET.fromstring(svg_text)
    calls = []

    for elem in root.iter():
        tag = elem.tag.split('}')[-1]  # 处理 namespace

        if tag == 'path':
            calls.append(
                f"V_ui_path("
                f"{get_attr(elem, 'd', True)}, "
                f"{get_attr(elem, 'fill', True)}, "
                f"{get_attr(elem, 'opacity')})"
            )

        elif tag == 'rect':
            calls.append(
                f"V_ui_rect("
                f"{get_attr(elem, 'x')}, "
                f"{get_attr(elem, 'y')}, "
                f"{get_attr(elem, 'width')}, "
                f"{get_attr(elem, 'height')}, "
                f"{get_attr(elem, 'rx')}, "
                f"{get_attr(elem, 'transform')}, "
                f"{get_attr(elem, 'opacity')})"
            )

        elif tag == 'circle':
            calls.append(
                f"V_ui_circle("
                f"{get_attr(elem, 'cx')}, "
                f"{get_attr(elem, 'cy')}, "
                f"{get_attr(elem, 'r')}, "
                f"{get_attr(elem, 'opacity')})"
            )

    # 拼接输出：首行不加 +
    if not calls:
        return ""

    output = [calls[0]]
    for call in calls[1:]:
        output.append(f"+ {call}")

    return "\n".join(output)

def main():
    svg_text = sys.stdin.read().strip()
    if not svg_text:
        sys.exit("❌ 未从 stdin 读取到 SVG 内容")

    try:
        print(parse_svg(svg_text))
    except Exception as e:
        sys.exit(f"❌ SVG 解析失败: {e}")

if __name__ == "__main__":
    main()