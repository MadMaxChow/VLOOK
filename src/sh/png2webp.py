#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from PIL import Image
from pathlib import Path
import argparse
import re
import sys


def natural_sort_key(path: Path):
    nums = re.findall(r"\d+", path.stem)
    return int(nums[-1]) if nums else 0


def parse_input_path(input_path: str):
    p = Path(input_path)

    if p.suffix == "":
        directory = p.parent
        prefix = p.name
    else:
        directory = p.parent
        prefix = p.stem

    if str(directory) == ".":
        directory = Path(".")

    return directory, prefix


def main():
    parser = argparse.ArgumentParser(description="PNG sequence → Animated WebP")

    parser.add_argument("prefix_path")
    parser.add_argument("--duration", type=int, default=80)
    parser.add_argument("--loop", type=int, default=0)
    parser.add_argument("--quality", type=int, default=90)
    parser.add_argument("--lossless", action="store_true")
    parser.add_argument("-o", "--output")

    args = parser.parse_args()

    # ✅ 关键：必须在这里解析 prefix
    directory, prefix = parse_input_path(args.prefix_path)

    # ✅ 在 prefix 定义之后再使用
    patterns = [
        f"{prefix}*.png",
        f"{prefix}*.PNG",
    ]

    files = []
    for p in patterns:
        files = list(directory.glob(p))
        if files:
            break

    if not files:
        print("❌ No files found")
        print(f"📁 directory: {directory}")
        print(f"🔤 prefix: {prefix}")
        print("📌 tried patterns:")
        for p in patterns:
            print("   -", p)

        print("\n📄 sample files:")
        for f in list(directory.iterdir())[:20]:
            print("   -", f.name)

        sys.exit(1)

    files = sorted(files, key=natural_sort_key)

    print(f"📁 Directory : {directory}")
    print(f"🔤 Prefix    : {prefix}")
    print(f"🖼️ Frames    : {len(files)}")

    frames = [Image.open(f).convert("RGBA") for f in files]

    output = args.output or str(directory / f"{prefix}.webp")

    print(f"💾 Output    : {output}")

    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=args.duration,
        loop=args.loop,
        quality=args.quality,
        lossless=args.lossless,
    )

    print("✅ Done")


if __name__ == "__main__":
    main()