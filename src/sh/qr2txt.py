from PIL import Image

# ===================== 【你只需要改这里！】 =====================
# 手动设置：二维码最小方块的像素大小（看你的图片是多少就填多少）
block_size = 5  # 例如：10px 一个方块，横向方块数量*block_size为基准尺寸
image_path = "qr.png"  # 你的图片路径
# ===============================================================

# 打开图片，转灰度
img = Image.open(image_path).convert("L")
pixels = img.load()
width, height = img.size

ascii_result = []

# 按【指定方块大小】逐行逐列采样
for y in range(0, height, block_size):
    line = ""
    for x in range(0, width, block_size):
        # 取当前方块的中心点像素
        cx = x + block_size // 2
        cy = y + block_size // 2
        
        if 0 <= cx < width and 0 <= cy < height:
            # 规则：不是纯白色 → 输出黑色█
            if pixels[cx, cy] < 250:  # 非纯白 = 黑格
                line += "██"  # 两个字符 = 正方形
            else:
                line += "  "  # 白色 = 空格
    
    # 只保留有效行
    if line.strip():
        ascii_result.append(line)

# 输出最终结果
final_art = "\n".join(ascii_result)
print("\n✅ 完美字符二维码（按指定方块大小转换）：\n")
print(final_art)

# 保存到文件
with open("qr.txt", "w", encoding="utf-8") as f:
    f.write(final_art)