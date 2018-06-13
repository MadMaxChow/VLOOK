**This plug-in implements enhancements to the Markup editor Typora export HTML file, specifically supporting the following features:**

**本插件实现对Markdown编辑器Typora导出HTML文件实现增强，具体支持以下特性：**

## Features

+ Automatically Generate Document Outline Toolbox
  - Supports current chapter auto track highlighting
  - Supports chapter quick jump positioning
  - Support return/forward operation
  - Support pinning/retracting outline navigation
+ Current chapter floating display
  - Automatically update the current chapter as the page scrolls at the top of the screen
  - Particularly suitable for easily recognizing the current section after a small screen or retracting an outline
+ Optimize page display
  - Support cover/back cover, main title/subtitle, author, version information and other content styles
  - Chapters automatically generate multi-level numbers (up to 5 levels)
  - Special label styles (added, modified, removed) for identifying revision record types
  - Chapters automatically generate multi-level numbers
  - Adaptive device screen size display
  - Deeply customize the style of the various elements of the page, beautiful and delicate
+ Automated inner chain error detection
  - Check for invalid intrapage links
  - Check duplicate chapter headings
+ Automatically generate a watermark background based on the document title (can be manually opened)

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

1. Copy the `maxdesign.css` file to the `Theme Folder` of Typora, restart Typora and select the theme;
2. Edit your `md` file and add the `[TOC]` tag. It is highly recommended to modify the Demo file as a template.
3. Export the file as HTML via Typora, and then open the HTML file with a text editor;
4. Paste everything in `outline-code_(paste-before-</body>).html` before the `</body>` tag in the exported HTML file....

## 如何使用？

1. 将`maxdesign.css`的文件复制至Typora的`Theme Folder`下，重启Typora并选择该主题；
2. 编辑你的`md`文件，并添加`[TOC]`标签，强烈建议以Demo文件为模板进行修改；
3. 通过Typora将文件导出为HTML，然后用文本编辑器打开该HTML文件；
4. 将`outline-code_(paste-before-</body>).html`中的所有内容粘贴至导出的HTML文件的`</body>`标签前。
