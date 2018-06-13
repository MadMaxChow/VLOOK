## Features

- Automatically generate outline structure (based on `[TOC]`), and hierarchical serial number
- Support to pin/collect outline navigation, forward/back
- Automatically generate watermark background based on document title
- Check invalid pages for links and duplicate headings
- Adaptive device screen size display
- Beautiful, exquisite, dynamic page style

## 特性

+ 自动生成文档大纲工具箱
  - 支持当前章节自动跟踪高亮
  - 支持章节快速跳转定位
  - 支持返回/前进操作
  - 支持钉住/收起大纲导航
+ 当前章节浮动显示
  - 随页面滚动在屏幕顶部自动更新显示当前章节
  - 特别适合在小屏或收起大纲后易于识别当前所在章节
+ 优化页面显示
  - 支持封面/封底、主标题/副标题、作者、版本信息等内容样式
  - 章节自动生成多级编号（最多5级）
  - 特殊标签样式（added、modified、removed），适用于标识修订记录类型
  - 章节自动生成多级编号
  - 自适应设备屏幕大小显示
  - 深度定制页面的各类元素的样式，美观细腻
+ 自动化内链错误检测
  - 检查无效的页内链接
  - 检查重复的章节标题
+ 自动根据文档标题生成水印背景（可自行手动开启）

## How to use? 

1. Copy `typora-theme\*.css` to Typora's `Theme Folder`, and selected this theme in Typora.
2. Edit `md` file with `[TOC]` tag.
3. Export to HTML file, and open the HTML file with any code editor.
4. Paste the `outline-code_(paste-before-</body>).html` content before the exported file's `</body>` tag.

## 如何使用？

1. 将`typora-theme\*.css`的文件复制至Typora的`Theme Folder`下，重启Typora并选择该主题；
2. 编辑你的`md`文件，并添加`[TOC]`标签；
3. 将文件导出为HTML，并用文本编辑器打开该HTML文件；
4. 将`outline-code_(paste-before-</body>).html`中的内容粘贴至该HTML文件的`</body>`标签前。
