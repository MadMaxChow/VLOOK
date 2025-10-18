#!/bin/bash
#
# 通用检查函数库
# 用于文件存在性、文件数量验证等
#

# 退出时统一报错
fail() {
    echo "❌ $1"
    exit 1
}

# 检查指定版本变量是否有值
# 用法: check_version "$VERSION"
check_version() {
    local ver="$1"
    if [[ -z "$ver" ]]; then
    	echo "未找到版本信息"
 		exit 1
	fi
}

# 检查文件或目录是否存在
# 用法: check_exists /path/to/file
# 用法: check_exists /path/to/dir
check_exists() {
    local file="$1"
    if [ ! -e "$file" ]; then
        fail "缺少文件/目录: $file"
    fi
}

# 检查文件是否存在
# 用法: check_file_exists /path/to/file
check_file_exists() {
    local file="$1"
    if [ ! -f "$file" ]; then
        fail "缺少文件: $file"
    fi
}

# 检查目录是否存在
# 用法: check_dir_exists /path/to/dir
check_dir_exists() {
    local dir="$1"
    if [ ! -d "$dir" ]; then
        fail "缺少目录: $dir"
    fi
}

# 检查通配符文件数量是否等于预期
# 用法: check_file_count "/tmp/*.log" 3
check_file_count() {
    local pattern="$1"
    local expected="$2"
    # 处理通配符，防止空匹配
    local count=$(find . -maxdepth 1 -type f -name "${pattern##*/}" | wc -l)

    if [ "$count" -ne "$expected" ]; then
        fail "文件数量不符: $pattern 期望 $expected，实际 $count"
    fi
}

# 检查通配符至少有 N 个文件
# 用法: check_file_min "/tmp/*.csv" 2
check_file_min() {
    local pattern="$1"
    local min="$2"
    local count=$(find . -maxdepth 1 -type f -name "${pattern##*/}" | wc -l)

    if [ "$count" -lt "$min" ]; then
        fail "文件数量不足: $pattern 至少 $min 个，实际 $count"
    fi
}
