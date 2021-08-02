###### <sub>VLOOK™</sub><br />让你的 Markdown 有了新`{看}(wán)`法<br />──<br /><sup>快速参考手册</sup><br />`#最新版本|V10.7.1#(theme2)`<br /><br />**MAX°孟兆**<br />*COPYRIGHT © 2016-2021. MAX°DESIGN.*

[TOC]

# 安装与使用

## Step 1•下载与偏好设置

1. **下载插件：**
   1. 从 VLOOK™ 在 **[GitHub](https://github.com/MadMaxChow/VLOOK/releases)** 或 **[Gitee](https://gitee.com/madmaxchow/VLOOK/releases)** 的主页下载最新发布的版本
   2. 也可直接在项目主页中[下载主题文件](https://github.com/MadMaxChow/VLOOK/tree/master/released/theme)（[备用链接](https://gitee.com/madmaxchow/VLOOK/tree/master/released/theme)）
2. **安装字体：（可选）**
   1. 下载并安装 VLOOK™ 主题配套字体包 •• 详见「[字体主题](#字体主题)」
3. **安装 Typora：**
   1. 下载并安装 [Typora](https://www.typora.io) 的最新版本（Version 0.10.3 或更高版本）
   2. 启动 Typora 并进入「偏好设置」，启用「Markdown 扩展语法、代码块」下的所有选项。详见下图：

![开启「Typora▸偏好设置▸Markdown」相关选项](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/typora-opt1-light.png?srcset=@2x&darksrc=typora-opt1-dark.png&darksrcset=@2x)

## Step 2•安装主题包

1. **安装主题：**
   1. 将 `released\theme` 下所有 CSS 文件复制至 Typora 的主题目录
   2. 主题目录在哪？可通过「偏好设置」中点击「**外观▸打开主题目录**」定位到该目录
2. **选用主题：**
   1. 重启 Typora
   2. 点击「**主题**」菜单，选择以 `Vlook-*` 形式命名的任意主题即可
3. **编写文档：**
   1. 建议基于 VLOOK™ 规范的文档模板来创建你自己的 Markdown 文档，这样能更快上手
   2. 文档模板在哪？
      1. 在目录 `released` 下的文件「**VLOOK-Document-Template.md** 或 **VLOOK-Document-Template_nocover.md**」
      2. 也可直接在项目主页中[下载文档模板](https://github.com/MadMaxChow/VLOOK/tree/master/released/demo)（[备用链接](https://gitee.com/madmaxchow/VLOOK/tree/master/released/demo)）

## Step 3•配置导出选项

![进入「Typora▸偏好设置▸导出」进行配置](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/typora-opt2-light.png?srcset=@2x&darksrc=typora-opt2-dark.png&darksrcset=@2x)

1. **配置导出选项安装 Typora：**
   1. 启动 Typora 并进入「**偏好设置**」
   2. 点击「导出」，添加配置（选择 HTML 模板），并将配置命名为 `HTML (VLOOK)`
2. **安装插件代码：**
   1. 打开插件文件：released\plugin\\**plugin.txt**，或直接打开线上版本的 [plugin.txt](https://raw.githubusercontent.com/MadMaxChow/VLOOK/master/released/plugin/plugin.txt)（[备用链接](https://gitee.com/madmaxchow/VLOOK/raw/master/released/plugin/plugin.txt)）
   2. 全选里面的所有内容，并复制
   3. 回到导出配置「**HTML (VLOOK)**」中的 在`<body />`中添加，将内容粘贴至下方的文本框内即可
3. **一键导出：**
   1. 打开符合 VLOOK™ 规范的 md 文件
   2. 点击「**文件▸导出▸HTML (VLOOK)**」即可

## 补充说明

###### 更新插件

> 旧版本的 VLOOK 若要升级到最新版本，按以上的 **Step 1** 下载最新发布版本，并按 **Step 2**、**Step 3** 更新对应的「主题」和「导出配置」即可。
>
> `>(theme1)`

###### 在线版插件

> 以上配置方式为离线插件，完整的插件代码与 HTML 文件集成，适合浏览文档时须在内网或无网络的情况，但不便于实时更新插件和[在线切换模板主题](#模板主题)等。
>
> 
>
> 目前 VLOOK 支持提供在线版插件方式，可参考以上方式增加新的「导出配置」即可（建议配置命名为`HTML (VLOOK live)`）。
>
> 在线版的插件文件为：released\plugin\\**plugin-live.txt**，或直接打开线上版本的 [plugin-live.txt](https://raw.githubusercontent.com/MadMaxChow/VLOOK/master/released/plugin/plugin-live.txt)（[备用链接](https://gitee.com/madmaxchow/VLOOK/raw/master/released/plugin/plugin.txt)）
>
> `>(red)`

###### 选择合适的浏览器

> 为保障最佳的使用体验，强烈建议使用以下浏览器访问：
>
> ![Chrome](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/chrome.png?mode=icon) Google **[Chrome](https://www.google.cn/chrome/)**　　![Edge](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/edge.png?mode=icon) Microsoft **[Edge](https://www.microsoft.com/zh-cn/edge)**^(Chromium)^　　![Firefox](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/firefox.png?mode=icon) Mozilla **[Firefox](https://www.mozilla.org/zh-CN/firefox/)**
>
> `>(brown)`

---

如有建议和需求，欢迎随时反馈～ [![VLOOK™ @ QQ Group](https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres/pic/feedback-light.svg?mode=logo&darksrc=feedback-dark.svg)](https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi&lnkcss=none)

###### The End
