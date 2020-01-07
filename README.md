# 概况

开源中国（[OSChina.net](https://www.oschina.net/p/vlook)）编辑推荐的国产开源产品。<br>
![OSChina 编辑推荐国产开源产品](https://tva1.sinaimg.cn/large/006tNbRwgy1ganzltootuj30w808yq4f.jpg)

VLOOK™ 是针对由 [Typora](https://www.typora.io)（目前最好的跨平台 Markdown 编辑器，没有之一）导出的 HTML 文件进行增强的插件。

VLOOK™ 为开源软件，遵从 MIT 许可证。

## 主要特性：

**排版样式增强**<br>
- 多主题样式、封面&封底、Light/Dark 模式、mermaid样式优化、标题/表格行自动编号、表格单元格合并、彩虹标签、自动添加图注/表注

**文档导航工具**<br>
- 大纲导航、逐章导航

**文档评审/演示辅助工具**<br>
- 聚光灯、内容块聚焦、表格十字聚焦、文档插图浏览器

**文档交互**<br>
- 折叠引用内容、链接/图片有效性检查、快捷键

---

有关 VLOOK 特性的详细介绍、样例及使用说明详见《[VLOOK 快速参考手册](https://madmaxchow.github.io/VLOOK/index.html)》<br/>
有关脚本化图表的详细介绍、样例及使用说明详见《[脚本化图表 for Markdown](https://madmaxchow.github.io/VLOOK/chart.html)》

---

# 多主题样式

![内置主题样式](https://tva1.sinaimg.cn/large/006y8mN6gy1g6vex2odrxj33ji0u04c6.jpg)

- 针对 VLOOK 内置多套优化的主题样式（在导出 HTML 通过 Typora 的「主题」菜单选择名称以 VLOOK 打头的主题）；
  - **Hope 海洋之心**：[预览 ＞](https://madmaxchow.github.io/VLOOK/index.html)
  - **Joint 榫卯**：[预览 ＞](https://madmaxchow.github.io/VLOOK/theme-joint.html)
  - **Geek 极邃**：[预览 ＞](https://madmaxchow.github.io/VLOOK/theme-geek.html)
  - **Fancy 慕幻**：[预览 ＞](https://madmaxchow.github.io/VLOOK/theme-fancy.html)
- 所有主题的文档导出为 HTML 后，都支持`Light (明亮)`与`Dark (黑暗)`模式。

## 主题定制服务

- 主题定制，请加微信：**MaxChow**

---

# 第1步：下载、配置

- 访问官方主页下载最新发布版本：[https://github.com/MadMaxChow/VLOOK/releases](https://github.com/MadMaxChow/VLOOK/releases)
- 下载并安装 [Typora](https://www.typora.io) ，启动后进入「偏好设置」，启用一些建议的选项，详细如下图：
![开启「Markdown 扩展语法」下的所有选项](https://tva1.sinaimg.cn/large/006tNbRwgy1ganwt7vwlaj31540cita9.jpg)
![开启「代码块」「公式」下的所有选项](https://tva1.sinaimg.cn/large/006tNbRwgy1ganwt7l785j315k0fuwg4.jpg)

# 第2步：应用主题

+ 将`released\theme`下所有CSS文件复制至 Typora 的主题目录（ Typora「偏好设置」中点击「外观 - 打开主题目录」定位到该目录）；
+ 重启 Typora ，点击菜单`主题`，选择以`vlook-*`形式命名的主题，即可启用对应的 VLOOK 主题样式；
+ 可基于`VLOOK\3-demo\VLOOK-Template 文档模板.md`来创建你自己的文档，`VLOOK\3-demo`目录下也有本文档的 Markdown 源文件。

# 第3步：植入插件

+ 在 Typora 中将 Markdown 文件导出为`HTML`文件；
+ 打开文件`released\VLOOK-TOOLBOX 插件.txt`，全选所有内容，并复制；
+ 用纯文件编辑器，如：记事本、[Visual Studio Code](https://code.visualstudio.com/)，打开该导出的 HTML 文件；
+ 搜索「**<body **」，并将复制的内容粘贴到body标签的「**>**」之后：
  ```
  <body ...>
  ← ← ← ← ← 复制的「VLOOK-TOOLBOX 插件」内容粘贴于此！
  ...
  </body>
  ```
+ 保存，大吉大利。

> 强烈建议使用 Chrome 或 Firefox 浏览器查看

---

# 字体

VLOOK 优先显示开源的思源黑体和思源宋体，建议下载安装获得更好的视觉体验；

- 思源黑体 / Noto Sans（[常规体](https://github.com/googlefonts/noto-cjk/blob/master/NotoSansCJKsc-Regular.otf)、[粗体](https://github.com/googlefonts/noto-cjk/blob/master/NotoSansCJKsc-Bold.otf)）
- 思源宋体 / Noto Serif（[常规体](https://github.com/googlefonts/noto-cjk/blob/master/NotoSerifCJKsc-Regular.otf)、[粗体](https://github.com/googlefonts/noto-cjk/blob/master/NotoSerifCJKsc-Bold.otf)）

---

# 打赏

**若喜欢 VLOOK™ 的话，可以请 Max 喝杯咖啡：**<br>
![微信支付](https://raw.githubusercontent.com/MadMaxChow/uploads/master/pic/donate-wechat.png)

---

# 目录说明

| 目录 | 说明                         |
| ---------- | ---------------------------- |
| VLOOK      |                              |
| └ 2-released | 发布版的主目录               |
| &nbsp;&nbsp;&nbsp;&nbsp;└ theme | 主题文件                     |
| └ 3-demo  | 基于 VLOOK 主题的示例、模板文件 |
| └ 4-src    | 源码目录                     |
| &nbsp;&nbsp;&nbsp;&nbsp;└ dev | 开发测试用示例文件 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ less | 主题 CSS 文件的源文件 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ misc | 杂项文件，包括图标源文件、产品原型、主题图形素材设计源文件等 |
| └ docs     | VLOOK 快速参考手册及相关文档 |

---

# Overview

VLOOK is a plugin for enhancements to HTML files exported by Typora. Includes two major features: Layout Enhancements and Feature Enhancements:

- **Layout enhancements**: Provides more user-friendly, beautiful document layout and style for the Typora editing mode and exported HTML files;
- **Feature enhancement**: Provides convenient reading accessibility functions such as document navigation, illustration browsing, content interaction, and validity detection for exported HTML files.

VLOOK™ is open source software and is compliant with the MIT license.

Detailed description of the features, as well as instructions for use, can be found in the "[VLOOK Quick Reference Manual](https://madmaxchow.github.io/VLOOK/index.html)".
