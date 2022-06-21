---
title: 简介 - VLOOK™ - Markdown 编辑器 Typora 的主题包和增强插件
author: MAX°孟兆
keywords:
- Markdown,Typora,VLOOK,Plugin,插件,主题包,自动排版,跨平台,i18n,开源,MIT,开源中国,OSC,编辑推荐
- 表格增强,单元格合并,行分组,表格阅读模式,表格十字光标,重复表头,刮刮卡,黑幕,标签,图片增强,演示辅助,聚光灯,激光笔,自动折叠,打印,Mermaid,音频,视频,注音,主题,字体,模板,深色模式,Dark Mode,封面,封底,私人定制
- PRD,设计,需求,文档,博客,手册,指南,在线,运维,知识库,WIKI
- 产品经理,程序员,运维工程师,售前,售后
vlook-chp-autonum: h1{{#ZH# ° }},h2{{步骤 ##-min#：}}
vlook-query: effects=2&ws=auto&lmc=1
vlook-doc-lib: vlook-lib.html
---

###### <sub>VLOOK™</sub><br>让你的 Markdown 有了新`{看}(wán)`法<br>──<br><sup>简介</sup><br>`#最新版本|V14.0#`<br><br><br>**MAX°孟兆**<br>*COPYRIGHT © 2016-2022. MAX°DESIGN.*

[TOC]

> **Select language ❯ **[<kbd>🇬🇧 English</kbd>](index-en.md)

# VLOOK™ 是什么

`#Editor|Typora#(gray)` `#OS|macOS#(black)` `#OS|Windows#(blue)` `#License|MIT#(red)`



>
>![VLOOK™](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/vlook-mark-light.svg?darksrc=vlook-mark-dark.svg#logo)
>
>![OSChina](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/oschina.png#icon) **[开源中国](https://www.oschina.net/p/vlook) 推荐的国产开源产品。**
>
>![VLOOK](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/vlook-light.svg?darksrc=vlook-dark.svg#icon) VLOOK™ 是针对 ![Typora](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/typora.png#icon) [Typora](https://www.typora.io)[^Typora] （跨平台 Markdown 编辑器）的 **主题包** 和 **增强插件**（针对导出的 HTML 文件)。
>
>VLOOK™ 属于开源软件（遵从 **MIT License**）。
>
>`>(theme1)`

> 代码托管：[![Github](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/github-light.svg?darksrc=github-dark.svg#logo)](https://github.com/MadMaxChow/VLOOK?lnkcss=none)　　[![Gitee](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/gitee-light.svg?darksrc=gitee-dark.svg#logo)](https://gitee.com/madmaxchow/VLOOK?lnkcss=none)

> [+] **许可协议**
>
> > VLOOK™ 属于开源软件，遵从以下开源协议：
> >
> > *==VLOOK™ 的许可协议==*
> >
> > ```
> > MIT License
> > Copyright (c) 2016-2022 MAX°DESIGN | Max Chow
> > Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> > The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
> > ```
>
> [+] ![Markdown](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/markdown-mark-solid.svg?fill=text#icon) **Markdown 是什么？**
>
> > - 2004 年，[John Gruber](https://en.wikipedia.org/wiki/John_Gruber) 创造了 [![Markdown](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/markdown-mark-solid.svg?fill=text#icon) Markdown](https://zh.wikipedia.org/wiki/Markdown)，一种专门针对网络写作的 `文本标记语言` 。使用 Markdown，你只需在写作过程中插入少量的标记符号，就能很轻松地进行排版（例如设置标题、加粗、列表、引用等）；
> >- Markdown 文档以 `纯文本格式存储` ，这意味着，它们可以用几乎任一种文本编辑器打开。同时，又能通过 Markdown 编辑器导出为带排版的富文本文档、HTML 网页等等。==纯粹、简洁、易用、灵活==，都是人们喜欢 Markdown 的原因；
> > - 目前 Markdown 的标准化项目是 [CommonMark](http://commonmark.org)。
> > 
> > ![Markdown](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/markdown-mark.svg?fill=text#logo)
>
> [+] **60 秒学会、10 分钟深入学习 Markdown 语法**
>
> > 1. `#推荐#` **Github Flavored Markdown** (GFM) 语法参考：Typora 目前采用该标准 [详细](https://support.typora.io/Markdown-Reference/)；
> > 2. 标准化 **CommonMark** 语法参考：[60 秒学会 Markdown 语法](http://commonmark.org/help/)、[10 分钟深入学习 Markdown](http://commonmark.org/help/tutorial/)。

[^Typora]: Typora 是跨平台的 Markdown 编辑器（也许是目前最好的编辑器），支持直接预览与编辑，更详细的特性详见[官网](https://www.typora.io)。

# 为谁准备

**如果你也有以下一个或多个需求或痛点，就可以放心地尝试基于 Markdown 的文档解决方案进行文档的编辑、发布、管理，建议组合是 ==Typora + VLOOK™==：**

- 使用 Markdown 写文档，但对 Markdown 编辑器，或其输出的 HTML 的排版、交互有更多的需求
- 对于编写的文档，希望 `*{ ??? }(统一模板与输出 "theme1")` ，并且最好 `*{ ??? }(随时切换不同模板 "theme1")`
- 希望只关注文档内容的撰写，排版这种繁琐工作希望能==自动化==完成
- ==减少==在文档（如：Word）、制图（如：Visio）等软件工具方面的==购买支出==，或是这些软件排版==操作感觉厌烦==
- 需要支持==跨平台==、==跨终端==进行文档浏览和文档发布方式
- 输出的文档能在阅读、评审、演示时，能提供交互辅助的工具（如目录大纲、聚光灯、激光笔、脚注等）

---

> ###### 💡 你知道吗？
>
> 你正在浏览的这份文档，就是由 Typora 编辑并应用 VLOOK™ 插件生成的！**AMAZING!!!**
>
> `>(brown!)`

# 快速入坑

VLOOK™ 通过持续**挖掘和扩展** Markdown 和 CSS，同时结合了文档的互联网化应用场景～

在 **文档排版**、**内容导航**、**演示辅助**、**交互体验** 等方面提供了 **一致**、**简洁**、**友好** 的体验。

---

>　　　　###### ![°文档排版](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/qico-types-light.svg?fill=text&darksrc=invert#icon) ° 文档排版
>
>---
>
>**有了 VLOOK™ 主题及插件的支持，让你对 Markdown 编辑器（暂只支持 Typora）的自动化排版能力有了全新的理解。**
>
>得益于成熟的 Web 技术，让静态的文档也能与你一起「动」起来～
>
>
>
>[<kbd>了解更多 ![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/icon-forward.svg?fill=text#icon)</kbd>](guide.md#快速入坑°文档排版)
>
>`>(green!)`

> ###### ![°内容导航](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/qico-nav-light.svg?fill=text&darksrc=invert#icon) ° 内容导航
>
> ---
>
> **VLOOK™ 提供了对文档章节、插图、表格、多媒体提供了多种形式的导航、快速定位和内容组织的工具，全面改善和提高发布的 HTML 文件的浏览体验和效率。**
>
> 无多余动作，聚焦文档撰写。一键导出之时，即完成自动集成～
>
> 
>
> [<kbd>了解更多 ![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/icon-forward.svg?fill=text#icon)</kbd>](guide2.md#快速入坑°内容导航)
>
> `>(blue!)`

---

>
>###### ![°演示与出版辅助](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/qico-pres-light.svg?fill=text&darksrc=invert#icon) ° 演示与出版辅助
>
>---
>
>**VLOOK™ 独创性地提供了强大的演示与出版辅助工具，让 Typora + VLOOK 成为更具生产力的 Markdown 文档解决方案。**
>
>非常适合现场和远程的演示辅助工具，为你的文档开启 Turbo 模式～
>
>
>
>[<kbd>了解更多 ![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/icon-forward.svg?fill=text#icon)</kbd>](guide2.md#快速入坑°演示与出版辅助)
>
>`>(orange!)`

>
>###### ![°主题与不杂项](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/qico-theme-light.svg?fill=text&darksrc=invert#icon) ° 主题与不杂项
>
>---
>
>「**人类从来都是视觉动物，自己或他人在阅读时，让眼睛感受愉悦和美好，是一种美德、一种力量、一种信仰。**」
>
>　　　　—— MAX°孟兆
>
>
>
>[<kbd>了解更多 ![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/icon-forward.svg?fill=text#icon)</kbd>](guide2.md#快速入坑°主题与不杂项)
>
>`>(brown!)`

---

###### **[点击这里，浏览更多 VLOOK™ 的话题 ![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/icon-forward.svg?fill=text#icon)](vlook://doc-lib)**

# 打赏

**若喜欢 VLOOK™ 的话，可以贡献一杯咖啡 :-)**

`#支付方式|微信支付#(green!)`

![打赏 VLOOK™ (微信支付)](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/donate-wechat-light.png?darksrc=donate-wechat-dark.png&srcset=@2x&darksrcset=@2x#frame)

# 安装与使用

> 只需要三步，让你快速上车，开启不一样的 Mardown 体验之旅！
>
> 让你的 Markdown 有了新`{看}(wán)`法！
>

## 下载与设置

> ---
>
> ---
>
> > ###### 下载插件
> >
> > ---
> >
> > 
> >
> > 1. 从 VLOOK™ 在 **[GitHub](https://github.com/MadMaxChow/VLOOK/releases)** 或 **[Gitee](https://gitee.com/madmaxchow/VLOOK/releases)** 的主页下载最新发布的版本；
> > 2. 也可直接在项目主页中[下载主题文件](https://github.com/MadMaxChow/VLOOK/tree/master/released/theme)（[备用链接](https://gitee.com/madmaxchow/VLOOK/tree/master/released/theme)）。
> >
> > `>(green)`
>
> > ###### 安装 Typora
> >
> > ---
> >
> > 
> >
> > 1. 下载并安装 [Typora](https://www.typora.io) 的最新版本；
> > 2. 启动 Typora 并进入「**偏好设置**」，启用「**Markdown 扩展语法、代码块**」下的所有选项。详见下图：
> >
> > `>(green)`
>
> > ###### 安装字体（可选）
> >
> > ---
> >
> > 
> >
> > 下载并安装 VLOOK™ 主题配套字体包 •• 详见「[字体主题](guide.md#字体主题)」。
> >
> > `>(gray)`
>
> `>(gray!)`

*==Typora ▸ 偏好设置 ▸ Markdown==*

![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/typora-opt1-light.png?srcset=@2x&darksrc=typora-opt1-dark.png&darksrcset=@2x)

---

## 安装主题包

> ---
>
> ---
>
> > ###### 安装主题
> >
> > ---
> >
> > 
> >
> > 1. 将 `released\theme` 下所有 CSS 文件复制至 Typora 的主题目录；
> > 2. 主题目录在哪？可通过「**偏好设置 ▸ 外观 ▸ 打开主题目录**」定位到该目录。
> >
> > `>(orange)`
>
> > ###### 选用主题
> >
> > ---
> >
> > 
> >
> > 1. 重启 Typora；
> > 2. 点击「**主题**」菜单，选择以 `Vlook *` 形式命名的任意主题即可。
> >
> > `>(orange)`
>
> > ###### 从模板开始编写
> >
> > ---
> >
> > 
> >
> > 建议基于 VLOOK™ 规范的文档模板来创建你自己的 Markdown 文档，这样能更快上手
> >
> > `>(orange)`
>
> `>(gray!)`

**模板文件在哪？**

1. 在目录 `released` 下的 ***.md** 文件
   1. 标准模板：*VLOOK-Document-Template.md*
   2. 无封面模板：*VLOOK-Document-Template-nocover.md*
   3. 文库模板：*VLOOK-Document-Template-doc_lib.md*
2. 也可直接在项目主页中[下载文档模板](https://github.com/MadMaxChow/VLOOK/tree/master/released/demo)（[备用链接](https://gitee.com/madmaxchow/VLOOK/tree/master/released/demo)）

---

## 配置导出选项

> ---
>
> ---
>
> ---
>
> > ###### 配置导出设置
> >
> > ---
> >
> > 
> >
> > 1. 启动 Typora 并进入「**偏好设置**」；
> > 2. 点击「**导出**」，添加配置（==选择 HTML 模板==），并将配置命名为 `VLOOK` 。
> >
> > `>(cyan)`
>
> > ###### 安装元标签代码
> >
> > ---
> >
> > 
> >
> > 1. 打开元标签文件：released\plugin\\[**meta.txt**](https://raw.githubusercontent.com/MadMaxChow/VLOOK/master/released/plugin/meta.txt)（[备用链接](https://gitee.com/madmaxchow/VLOOK/raw/master/released/plugin/meta.txt)）；
> > 2. 全选并复制所有内容；
> > 3. 将内容粘贴至「**偏好设置 ▸ VLOOK ▸ 在 &lt;head /&gt; 中添加**」。
> >
> > `>(cyan)`
>
> > ###### 安装插件代码
> >
> > ---
> >
> > 
> >
> > 1. 打开插件文件：released\plugin\\[**plugin.txt**](https://raw.githubusercontent.com/MadMaxChow/VLOOK/master/released/plugin/plugin.txt)（[备用链接](https://gitee.com/madmaxchow/VLOOK/raw/master/released/plugin/plugin.txt)）；
> > 2. 全选并复制所有内容；
> > 3. 将内容粘贴至「**偏好设置 ▸ VLOOK ▸ 在 &lt;body /&gt; 中添加**」。
> >
> > `>(cyan)`
>
> > ###### 一键导出
> >
> > ---
> >
> > 
> >
> > 1. 打开符合 VLOOK™ 规范的 md 文件；
> > 2. 点击「**文件 ▸ 导出 ▸ VLOOK**」即可。
> >
> > `>(cyan)`
>
> `>(gray!)`

*==Typora ▸ 偏好设置 ▸ 导出==*

![](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/typora-opt2-light.png?srcset=@2x&darksrc=typora-opt2-dark.png&darksrcset=@2x)

# 补充说明

> ###### 在线版插件
>
> ---
>
> 以上配置方式为离线插件，完整的插件代码与 HTML 文件集成，适合浏览文档时须在内网或无网络的情况，但不便于实时更新插件和[在线切换模板主题](guide.md#模板主题)等。
>
> 目前 VLOOK 支持提供在线版插件方式，可参考以上方式增加新的「导出配置」即可（建议配置命名为 `VLOOK (live)`）。
>
> 在线版的插件文件为：released\plugin\\**plugin_live.txt**，或直接打开线上版本的 [plugin_live.txt](https://raw.githubusercontent.com/MadMaxChow/VLOOK/master/released/plugin/plugin_live.txt)（[备用链接](https://gitee.com/madmaxchow/VLOOK/raw/master/released/plugin/plugin.txt)）
>
> `>(orange!)`

---

> ###### 如何更新插件到最新版本？
>
> ---
>
> 旧版本的 VLOOK 若要升级到最新版本，按以上的**第 1 步**下载最新发布版本，并按**第 2、3 步**更新对应的「主题」和「导出配置」即可。
>
> `>(cyan!)`

> ###### 推荐选择兼容的浏览器！
>
> ---
>
> 为保障最佳的使用体验，强烈建议使用以下浏览器访问：
>
> ![Chrome](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/chrome.png#icon2x) **[Chrome](https://www.google.cn/chrome/)**　　![Edge](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/edge.png#icon2x) **[Edge](https://www.microsoft.com/zh-cn/edge)**　　![Firefox](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/firefox.png#icon2x) **[Firefox](https://www.mozilla.org/zh-CN/firefox/)**
>
> `>(blue)`

---

如有建议和需求，欢迎随时反馈～ [![VLOOK™ @ QQ Group](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/feedback-light.svg?darksrc=invert#logo)](https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi&lnkcss=none)

# The End