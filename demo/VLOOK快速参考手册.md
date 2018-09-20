###### ^VLOOK™^ <br>快速参考手册 Quick Reference Manual<br><br>`+ 文档密级｜对外公开 +`<br><br><br><br>**Max**<br>*COPYRIGHT © 2017-2018. MAX°DESIGN.*

[TOC]

# VLOOK™是什么

`最新版本｜V8`    `+ 官网｜https://github.com/madmaxchow/VLOOK +`    `* 适用平台｜Typora for Win & macOS *`    `- 开源协议｜MIT -`   `! 开发语言｜JavaScript, CSS !`

[VLOOK™](https://github.com/MadMaxChow/VLOOK)是针对由[Typora](https://www.typora.io)[^Typora]所导出的HTML文件进行增强的插件。VLOOK™为开源软件，遵从[MIT许可证](#许可协议)。

VLOOK插件包括[排版增强](#排版增强)和[功能增强](#功能增强)两大类特性：

- **排版增强**：为Typora编辑模式，以及导出的HTML文件提供更人性化、美观的样式与排版；
- **功能增强**：为导出的HTML文件提供文档导航、插图浏览、内容交互、有效性检测等便捷功能。

`= 本文通过 VLOOK™ 插件和 Typora 进行创建 =`

---

> [-] **Markdown 是什么？**
>
> > - 2004年，[John Gruber](https://en.wikipedia.org/wiki/John_Gruber)创造了[Markdown](https://en.wikipedia.org/wiki/Markdown)，一种专门针对网络写作的文本标记语言。使用Markdown，你只需在写作过程中插入少量的标记符号，就能很轻松地进行排版（例如设置标题、加粗、列表、引用等）。
> > - Markdown文档以纯文本格式存储，这意味着，它们可以用几乎任一种文本编辑器打开。同时，又能通过Markdown编辑器导出为带排版的富文本文档、HTML网页等等。纯粹、简洁、易用、灵活，都是人们喜欢Markdown的原因。
> > - 目前Markdown的标准化项目是[CommonMark](http://commonmark.org)。
>
> [+] **Markdown 语法：**
>
> > 1. 标准化CommonMark语法参考：[60秒学会Markdown语法](http://commonmark.org/help/)、[10分钟深入学习Markdown](http://commonmark.org/help/tutorial/)
> > 2. GitHub采用Flavored Markdown的语法参考：Typora目前采用该标准  [详细](https://support.typora.io/Markdown-Reference/)

[^Typora]: Typora是非常棒的跨平台的Markdown编辑器，支持直接预览与编辑，更详细的特性详见[官网](https://www.typora.io)。

# 特性介绍

## 排版增强

### 浅色、深色样式主题

+ 文档的样式显示支持`浅色`与`深色`主题；
+ 通过右上角的`= 主题 =`按钮进行切换。

`- 注意事项 -`该特性须导出HTML并加入插件代码后才能生效。

### 结构化的封面、封底

###### 封面
+ 封面样式支持多个信息项，包括：**主标题**、**副标题**、**文档类型/密级**、**作者**、**版权信息**；

+ 封面必须以`6级标题`（<kbd>Ctrl</kbd>+<kbd>6</kbd>）作为整篇文章的`第1个`章节，同时各信息项的顺序与格式规则如下：

   - **主标题**：无须指定格式标记
   - **副标题**：可直接使用Markdown的上标、下标标记（仅为建议写法，自己可根据实际情况选择），举例哪下：
     - `^上标式副标题^`
     - `~下标式副标题~`
     - 若内容含空格，在空格前通过`\`进行转义，`<br>`标记前加空格以使其生效
   - **文档类型/密级**：使用Markdown的代码格式标记`` ` ``，同时支持VLOOK的[药丸样式](#药丸样式)写法，应用举例如下：
     - `+ 文档密级｜对外公开 +`
     - `* 文档密级｜内部公开 *`
     - `- 文档密级｜机密资料 -`
   - **作者**：使用粗体格式标记`**作者**`（插件会自动增加`By`前缀）
   - **版权信息**：使用Markdown的斜体格式标记`*版权信息*`

+ 样式见本文的封面，完整示例参考如下（其中`<br>`为换行符，可选）：

   ```
   ### **在此输入主标题**<br>在此输入副标题<br><br><br><u>在此输入作者姓名</u><br>*在此输入版权信息*
   ```

###### 封底

+ 以最后一个`6级标题`作为封底；

+ 样式见本文的封底，完整示例参考如下：

   ```
   ### 在此输入封底内容
   ```

### 多级章节标题自动编号

+ 自动对1级~5级标题进行自动编号，6级标题因作特殊用途，不在自动编号范围内；
+ 自动编号格式为阿拉伯数字，多级标题编号以`.`分隔。

### 强制多级列表编号方式

+ 统一对所有序/无序的多级列表进行自动分级编号。

###### 列表分级编号样式：

+ 一级列表内容
   - 二级列表内容
     - 三级列表内容
       - 四级列表内容
         - 五级列表内容
           - 六级列表内容

+ 用Markdown编写参考如下，每级缩进`2`个空格：

    ```
    - 一级列表内容
       - 二级列表内容
         - 三级列表内容
           - 四级列表内容
             - 五级列表内容
               - 六级列表内容
    1. 一级列表内容
       - 二级列表内容
         - 三级列表内容
    ```

### 表格行自动编号

+ 在表格自动编号会在以下两种特定格式下出现：

+ 在列表下（**注意须缩进一级**）：

   | 列1    | 列2    |   列3    |    列4 |
   | --- | --- | :---: | ---: |
   | 第一行 | 左对齐 | 居中对齐 | 右对齐 |
   | 第二行 | 左对齐 | 居中对齐 | 右对齐 |

+ 在6级标题（H6）下（**无须不缩进**）：

###### 这是6级标题

| 列1    | 列2    |   列3    |    列4 |
| --- | --- | :---: | ---: |
| 第一行 | 左对齐 | 居中对齐 | 右对齐 |
| 第二行 | 左对齐 | 居中对齐 | 右对齐 |

### 更美观的脚本化图表

+ 统一优化**mermaid**、**flowchart.js**、**JS Sequence Diagrams**三类脚本化图表的样式；
+ 更多脚本化图表样式，以及结合VLOOK相关的脚本编写规则内容详见《[脚本化图表 for Markdown](https://madmaxchow.github.io/VLOOK/chart.html)》。

###### mermaid｜流程图

```mermaid
graph LR
START(( )) --> |默认实线|round_edges(圆角矩形节点)
subgraph 子图A
	round_edges --> text[方角矩形节点]
end

text ==> |加粗实线|circle((圆形节点))
circle --> asymetric>旗形节点]

subgraph 子图B
	asymetric -.-> |虚线|rhombus{条件判断节点}
end

rhombus --> END
END(( ))
```

###### mermaid｜状态图

```mermaid
graph LR
INIT(( ))
INIT --> |初始<br>ACT/动作|状态A
状态A --> |复杂变更|trans(( ))
trans(( )) --> |变更条件说明|状态B
状态B --> |变更条件说明<br>ACT/动作|状态C
trans{ } -.-> |非正常/次要变更条件说明|状态C
状态C --> FINAL
trans{ } -.-> |非正常/次要变更条件说明|状态D
状态D --> FINAL
FINAL(( ))
```
###### mermaid｜时序图

```mermaid
sequenceDiagram
participant User as @人物角色
participant Client as 标准系统角色
participant Server as =重要系统角色=
participant Extend as -外部系统角色-

User ->> Client: 同步发送消息1
Client ->> Server: 同步发送消息1
Client -X Server: 异步发送消息2
Note left of Extend: 显示在外部系统<br>左侧备注说明
Note right of Extend: 显示在外部系统<br>右侧备注说明
Note over Client,Server: 跨对象备注说明
loop 循环组
	Client ->> Extend: 发送消息A
	alt 情景1
		Server ->> Client: 同步返回消息A1
	else 情景2
		Server -X Client: 异步返回消息A2
	end
	opt 可选
		Extend ->> Server: 发送消息X
	end
end
```
`- 注意事项 -`因Typora的原因，部分特性暂不提供在编辑时进行实时预览，须导出HTML并加入插件代码后才能生效。

###### flowchart.js｜流程图

```flow
st=>start:  
e=>end:  
op1=>operation: 操作
op2=>operation: 材料
sub1=>subroutine: 子流程
cond=>condition: 是 / 否？
c2=>condition: 好主意
io=>inputoutput: 获得数据

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```
###### JS Sequence Diagrams｜时序图

```sequence
Title: 在此填写流程图标题
participant 客服端 as CLIENT
participant 服务器 as SERVER
Note right of CLIENT: 通过角色、对象列表，\n您可以更改它们的顺序
CLIENT -> SERVER: 请求消息：实线+实箭头
SERVER -> CLIENT: 返回消息：虚线+实箭头
Note over CLIENT: 说明
Note over CLIENT, SERVER: 跨对象说明
CLIENT ->> SERVER: 请求消息：实线+虚箭头
SERVER ->> CLIENT: 返回消息：虚线+虚箭头
Note left of SERVER: 我在最后一位
```

### 扩展了行内代码应用样式

对于Markdown的行内代码标记`` ` `` ，通过特定的**扩展标识**，来用不同的样式渲染指定的代码标签内容。

`- 注意事项 -`因Typora的原因，增强代码标签样式暂不提供在编辑时进行实时预览，样式效果须导出HTML并加入插件代码后才能生效。

#### 标签样式

+ 分类样式通过内容前增加**扩展标识**的内容来标记；

+ 可用于文档中例如修订记录说明、界面元素（按钮、标签）说明、突出标记等，应用举例如下：

   - `+ 新增 +`本次修订新增XXX功能
   - `* 优化 *`本次修订删除XXX功能
   - 用户点击`# 立即购买 #`后进入XXX页面
   - `- 注意事项 -`有关的注意事项说明

+ 可支持多种样式，举例如下（文本内容前后须加空格）：

   | 扩展标识示例 |    渲染效果    |
   | :----------: | :------: |
   |   `` `= 文本内容 =` ``   | `= 文本内容 =` |
   | `` `+ 文本内容 +` ``  | `+ 文本内容 +` |
   |     `` `* 文本内容 *` ``     | `* 文本内容 *` |
   | `` `- 文本内容 -` ``  | `- 文本内容 -` |
   |  `` `! 文本内容 !` ``  | `! 文本内容 !` |
   |     `` `# 文本内容 #` ``     | `# 文本内容 #` |


#### 药丸样式

+ 目前支持药丸式的两段结构，可用于例如版本号说明、变量说明等，例如：
   - `= 版本号｜V1.0.2 =`
   - `!! X取值｜1234 !!`
   - `- 优先级｜高 -`

+ 可支持多种样式，举例如下：

   | 写法示例     | 渲染效果              | 备注         |
   | :---------: | ----------- | ----------- |
   | `` `= 样式类型｜样式1 =` `` | `= 样式类型｜样式1 =` | 如果只加`｜`分隔符，前后不带前后标记，则默认为该样式<br>举例：默认样式｜不加前后标记 |
   | `` `+ 样式类型｜样式2 +` `` | `+ 样式类型｜样式2 +` |  |
   | `` `* 样式类型｜样式3 *` `` | `* 样式类型｜样式3 *` |  |
   | `` `- 样式类型｜样式4 -` `` | `- 样式类型｜样式4 -` |  |
   | `` `! 样式类型｜样式5 !` `` | `! 样式类型｜样式5 !` |  |
   | `` `# 样式类型｜样式6 #` `` | `# 样式类型｜样式6 #` |  |

+ 旧语法，举例如下：

   | 写法示例（风格1）         | 渲染效果                    |
   | ------------- | -------------- |
   | `` `样式类型｜样式1` ``  | `样式类型｜样式1`           |
   | `` `样式类型｜｜样式2` `` | `样式类型｜｜样式2`         |
   | `` `样式类型｜｜｜样式3` `` | `样式类型｜｜｜样式3`       |
   | `` `样式类型｜｜｜｜样式4` `` | `样式类型｜｜｜｜样式4`     |
   | `` `样式类型｜｜｜｜｜样式5` `` | `样式类型｜｜｜｜｜样式5`   |
   | `` `样式类型｜｜｜｜｜｜样式6` `` | `样式类型｜｜｜｜｜｜样式6` |

`+ 提示 +`其中的竖线符号可用英文半角`<空格>|<空格>`，或中文全角`｜`。

#### 多行代码

多行代码没有针对多行代码的特殊样式，此处仅用于展示`# 深色 #`主题时的样式效果。

```javascript
function funName() {
    var a = true;
    if (a = false)
        console.log("Hello World!");
}
```

### 扩展了多行代码应用样式

对于Markdown的多行代码块标记``  ``` ``，支持行内代码的[标签样式](#标签样式)扩展标识，以实现对指定的代码内容进行高亮突出。

`- 注意事项 -`因Typora的原因，增强代码标签样式暂不提供在编辑时进行实时预览，样式效果须导出HTML并加入插件代码后才能生效。

###### 原始版本

```javascript
function appleTheme(theme ) {
  var abc = 1234.56;
  _darkTheme = (theme == "dark") ? false : true;
  toggleTheme();
}
function gotoHeader(obj) {
  var dataAnchor = obj.attr("data-anchor");
  if (dataAnchor == "cover")
      gotoTop();
  else
      window.location.href = "#" + obj.attr("data-anchor");
}
```

###### 加亮指定内容

```javascript
function appleTheme(`= theme =`) {
  var abc = 1234.56;
  _darkTheme = (theme == "dark") ? `- false -` : `+ true +`;
  `# toggleTheme() #`;
}
function gotoHeader(obj) {
  var dataAnchor = obj.attr(`! "data-anchor" !`);
  if (dataAnchor == "cover")
      gotoTop();
  else
      `* window.location.href *` = "#" + obj.attr("data-anchor");
}
```

### 应用在线字体

+ 优化导出HTML文件使用的字体集，优先以网络字体（WebFont）方式使用开源字体：思源宋体、思源黑体、Noto Sans、Noto Sans Mono；
+ 若无法加载优先字体，则使用微软雅黑等本地化字体呈现；
+ 由于思源宋体暂无免费网络资源，如需使用可下载并放置到Typora的主题目录的子目录`font`下、导出HTML文件的目录的子目录`font`下。

### 打印样式

+ 打印输出时自动优化页面显示样式，以适应用打印输出的应用场景。

## 功能增强

### 文档导航Plus

#### 大纲式导航

+ 支持页面左侧显示目录大纲，并能根据页面位置自动高亮当前章节；
+ 目录大纲默认显示前三级，可自行修改样式文件进行调整

`- 注意 -`编写Markdown文档时，须在封面后添加标签`[TOC]`。

#### 飞行式导航

+ 支持在页面顶部显示当前章节标题内容（除第6级标题）；
+ 根据页面位置自动识别当前章节，正如你现在看到的那样；
+ 显示`= ＜ 章节名称 =`、`= 章节名称 ＞ =`的标题，点击上/下章节标题可在上/下章节间进行快速跳转；

`- 注意 -`编写Markdown文档时，须在封面后添加标签`[TOC]`。

### 文档插图浏览器

+ 支持丰富的图片、图表格式：
   - 浏览器支持的所有图片（jpg / png / gif / bmp / ...）
   - 脚本化图表（mermaid[^mermaid] / flowchart.js[^flowchart.js] / JS Sequence Diagrams[^JS Sequence Diagrams]）
+ 点击任意图片、图表，或右上角的插图浏览器按钮激活插图浏览器；
+ 支持显示图片/图表标题（图片/图表前须增加h6标题）；
+ 支持按前一张、后一张方式浏览文档中的所有插图；
+ 对于缺失的图片以默认图片进行替换显示；
+ 点击插图能直接跳转到文档中对应的位置，支持通过快捷键<kbd>esc</kbd>关闭插图浏览器；

[^mermaid]: mermaid 是一个用于画流程图、状态图、时序图、甘特图的库，使用 JS 进行本地渲染，广泛集成于许多 Markdown 编辑器中。详[mermaid官网](https://mermaidjs.github.io)，或VLOOK项目的示例文档《[脚本化图表 for Markdown](https://madmaxchow.github.io/VLOOK/chart.html)》
[^flowchart.js]: flowchart.js基于SVG的流程图插件，它仅需几行代码即可在 Web 上完成流程图的构建。可以从文字表述中画出简单的 SVG 流程图，也可以画出彩色的图。表详[flowchart.js官网](http://flowchart.js.org)，或VLOOK项目的示例文档《[脚本化图表 for Markdown](https://madmaxchow.github.io/VLOOK/chart.html)》
[^JS Sequence Diagrams]: JS sequence diagrams是一个方便建立UML的时序图（序列图or循序图）在线工具，使用简单。详[JS Sequence Diagrams](https://bramp.github.io/js-sequence-diagrams/) 官网，或VLOOK项目的示例文档《[脚本化图表 for Markdown](https://madmaxchow.github.io/VLOOK/chart.html)》

###### 这是普通的图片示例

![普通的图片](http://www.mjjq.com/pic/2011/01/2011010435845.jpg)

###### 这是缺失的图片示例

![缺失的图片](vlook-lost-image.jpg)

### 自动识别缺失的图片

+ 识别出无法加载的图片，并替换为提示图片已缺失提示图，示例详见[这里](#这是缺失的图片示例)。

### 可折叠的引用内容

1. 对于「引用」，支持动态折叠操作；
2. 在编辑时可指定默认的折叠状态（收起/展开）。
3. 举例如下：

> [+] **这里是引用的折叠标题**
>
> > 1. 标题前加`[+]<空格>`或`[-]<空格>`；
> > 2. `[+]`指默认为「收起」状态；
> > 3. `[-]`指默认为「展开」状态。
> >
> > [+] **支持多级引用的折叠**
> >
> > > 这里是多级引用折叠的内容
>
> [-] **这是默认展开的「引用」**
>
> > 展示的引用的内容

### 更友好的脚注

+ 默认情况下，查看脚注信息须在文档中来回跳转；
+ 增强后的脚注功能可以直接在当前页面位置全屏显示；
+ 点击文末的**脚注编号**查看脚注信息[^脚注1]

[^脚注1]: 这是增**强的脚注**的信息，该增强由VLOOK插件提供。[VLOOK是什么？](#VLOOK™是什么)

### 外链强制新标签打开

+ 为提高文档阅读与交互体验，对于外链（http、https、ftp等），自动强制设置为在新标签页中打开。

### 内链有效性检查

###### 无效内链

+ 自动检查页面内部链接的正确性；
+ 若存在无效的页内链接，则通过弹窗提示。

###### 重名章节标题

+ 自动检查文档是否存在重名的标题，以提示作者检查是否会存在页内链接不能跳转到重名的标题位置的可能性；
+ 重名章节标题的警告提示信息须启动浏览器的开发者工具或调试工具后，打开其控制台窗口进行查看。

### 优化任务列表

+ 保留原始有序/无序列表信息；
+ 勾选按钮样式为正常样式，同时保持为不可点击；
+ [ ] 示例：这是一级样式
   - [ ] 这是二级样式
   - [x] 这是已选中的二级样式

### 支持全局快捷键

|  键盘快捷键  |    页面    | 功能                |
| :----------: | :--------: | ------------------- |
| <kbd>T</kbd> |    全局    | 切换文档主题        |
| <kbd>O</kbd> |    文档    | 显示/隐藏大纲面板   |
| <kbd>F</kbd> |    文档    | 进入/退出全屏       |
| <kbd>I</kbd> |    文档    | 显示/隐藏插图浏览器 |
| <kbd>←</kbd> |    文档    | 上一章              |
| <kbd>→</kbd> |    文档    | 下一章              |
| <kbd>P</kbd> |    文档    | 打印文档            |
| <kbd>←</kbd> | 插图浏览器 | 前一张插图          |
| <kbd>→</kbd> | 插图浏览器 | 后一张插图          |



# 如何使用

## 捐赠

###### 若喜欢VLOOK™的话，可以请Max喝杯咖啡～

![捐赠二维码](https://ws1.sinaimg.cn/large/006tKfTcgy1fsmnridvyxj303y04mt94.jpg)

## 下载插件

访问官方主页下载最新发布版本：[https://github.com/MadMaxChow/VLOOK/releases](https://github.com/MadMaxChow/VLOOK/releases)

## 应用主题

+ 将`released\vlook.css`文件复制至Typora的主题目录；
+ 重启Typora，点击菜单`主题 ▶ VLOOK`即可启用VLOOK主题。

> **如何找到Typora主题目录？**
>
> 打开Typora设置界面，在常规设置中点击【打开主题目录】按钮即可定位到该目录

## 应用插件

+ 在Typora中将Markdown文件导出为`HTML`文件；
+ 打开文件`released\vlook-toolbox.txt`，全选所有内容，并复制；
+ 用纯文件编辑器（如：Windows下的记事本）打开该导出的HTML文件，并拖到文件最末尾，将复制的内容粘贴在`</body>`前；
+ 保存，大功告成。

> 强烈建议使用Chrome或Firefox浏览器浏览HTML文件

# 许可协议

**MIT许可证**

版权所有 (c) 2018 MAX°DESIGN | Max Chow
在此授予任何获得此软件和相关文档文件（“软件”）副本的人免费许可，以无限制地处理本软件，包括但不限于使用，复制，修改，合并，发布，分发，再授权和/或出售本软件的副本，并允许本软件的授予人员遵从以下情况：
上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。
本软件按“原样”提供，不提供任何以表达或暗示，包括但不限于销售，适用于特定用途和不侵权的保证。在任何情况下，作者或版权所有人不对因软件或软件的使用或其他事宜产生的任何索赔，损害或其他责任（无论是在合同，侵权或其他方面的诉讼中）负责。

###### 终了<br>