#!/usr/bin/perl
use strict;
use warnings;
use File::Spec;

# 检查参数
my $dir = shift @ARGV or die "用法: $0 <css目录路径>\n";
my $VERSION = shift @ARGV or die "缺少版本号参数\n";

# 确认目录存在
-d $dir or die "目录不存在: $dir\n";

# 遍历指定目录下所有 .css 文件
for my $file (glob(File::Spec->catfile($dir, "fs-*.css"))) {
    local $/ = undef;  # 一次性读取整个文件
    open my $fh, "<", $file or die "无法读取 $file: $!";
    my $content = <$fh>;
    close $fh;

    # 替换 github-io 路径为 <your-host>/res/
    $content =~ s{https://openfonts\.pages\.dev/}{https://<your-host>/$VERSION/}g;

    # 写回原文件
    open my $out, ">", $file or die "无法写入 $file: $!";
    print $out $content;
    close $out;

   #  print "已处理 $file (版本：$VERSION)\n";
}