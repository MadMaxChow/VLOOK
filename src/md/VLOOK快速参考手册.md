###### **VLOOK™**<br>快速参考手册<br><br><br><u>Max</u><br>*COPYRIGHT © 2018. MAX°DESIGN.*

[TOC]

# VLOOK™是什么

[VLOOK™](https://github.com/MadMaxChow/VLOOK)是针对[Typora](https://www.typora.io)导出的HTML文件的增强插件，VLOOK™为开源软件，遵从[MIT许可证](#许可协议)。

VLOOK包括[主题样式](#主题样式)和[工具箱](#工具箱)两个部分：

- 主题样式：基于CSS制作，为Typora编辑的Markdown文件和导出的HTML文件提供强化、丰富的格式细节，以支持更为复杂的文档排版和视觉呈现要求；
- 工具箱：基于JQuery制作，为导出的HTML提供便捷的章节、图片导航，以及页内、外部链接检查与优化等特性。

**（本文档是基于最新的VLOOK™插件进行创建）**

---

> **Markdown是什么？**
>
> 十四年前，John Gruber创造了Markdown，一种专门针对网络写作的文本标记语言。使用Markdown，你只需在写作过程中插入少量的标记符号，就能很轻松地进行排版（例如设置标题、加粗、列表、引用等）。
>
> Markdown文档以纯文本格式存储，这意味着，它们可以用几乎任一种文本编辑器打开。同时，又能通过Markdown编辑器导出为带排版的富文本文档、HTML网页等等。纯粹、简洁、易用、灵活，都是人们喜欢Markdown的原因。目前Markdown的标准化项目是[CommonMark](http://commonmark.org)。
>
> 
>
> **Markdown语法参考：**
>
> - 标准化CommonMark语法参考：[60秒学会Markdown语法](http://commonmark.org/help/)、[10分钟深入学习Markdown](http://commonmark.org/help/tutorial/)
> - GitHub采用Flavored Markdown的语法参考：Typora目前采用该标准  [详细](https://support.typora.io/Markdown-Reference/)

# 特性说明

## 主题样式

### 封面与封底

###### 封面
1. 封面样式支持多个信息项，包括：**主标题**、**副标题**、**作者**、**版权信息**；

2. 封面必须以`6级标题`（快捷键`Ctrl+6`）作为整篇文章的`第1个`章节，同时各信息项的顺序与格式规则如下：

   - 主标题，使用Markdown的粗体格式标记`**主标题**`
   - 副标题，无须指定格式标记
   - 作者，使用HTML的下划线格式标记`<u>作者</u>`（会自动增加`By`前缀）
   - 版权信息，使用Markdown的斜体格式标记`*版权信息*`

3. 样式见本文的封面，完整示例参考如下（其中`<br>`为换行符，可选）：

   ```
   ###### **在此输入主标题**<br>在此输入副标题<br><br><br><u>在此输入作者姓名</u><br>*在此输入版权信息*
   ```

###### 封底

1. 以最后一个`6级标题`作为封底；

2. 样式见本文的封底，完整示例参考如下：

   ```
   ###### 在此输入封底内容
   ```

### 章节标题自动编号

1. 自动对1级~5级标题进行自动编号，6级标题因作特殊用途，不在自动编号范围内；
2. 自动编号格式为阿拉伯数字，多级标题编号以`.`分隔。

### 列表分级编号

1. 自动对列表进行分级编号；
2. 要求编写文档时第一级列表为有序列表，二级及其下列表均为使用无序标记`-`或`*`，会自动进行分级编号设置；

###### 列表分级编号样式：

1. 一级列表内容
   - 二级列表内容
     - 三级列表内容
       - 四级列表内容
         - 五级列表内容
           - 六级列表内容

2. 用Markdown编写参考如下，每级缩进4个空格：

    ```
    1. 一级列表内容
       - 二级列表内容
         - 三级列表内容
           - 四级列表内容
             - 五级列表内容
               - 六级列表内容
    ```

### 表格行自动编号

1. 在表格自动编号会在以下两种特定格式下出现：

2. 在一级列表下，**注意须缩进一级**：

   | 列1    | 列2    |   列3    |    列4 |
   | ------ | ------ | :------: | -----: |
   | 第一行 | 左对齐 | 居中对齐 | 右对齐 |
   | 第二行 | 左对齐 | 居中对齐 | 右对齐 |

###### 或者在6级标题下：

| 列1    | 列2    |   列3    |    列4 |
| ------ | ------ | :------: | -----: |
| 第一行 | 左对齐 | 居中对齐 | 右对齐 |
| 第二行 | 左对齐 | 居中对齐 | 右对齐 |

### 脚本化图表样式

统一mermaid、flowchart.js、JS Sequence Diagrams三类脚本化图表的样式，更多脚本化图表的内容详见《Markdown风格画图脚本Demo》

###### mermaid

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
```mermaid
sequenceDiagram
participant user as <用户角色>
participant client as 客户端程序
participant server as 服务端系统

user ->> client: 同步发送消息1
client ->> server: 同步发送消息1
client -X server: 异步发送消息2
Note left of client: 左侧备注说明
Note right of server: 右侧备注说明
Note over client,server: 跨对象备注说明
loop 循环组
	client ->> server: 发送消息A
	alt 情景1
		server -->> client: 同步返回消息A1
	else 情景2
		server --X client: 异步返回消息A2
	end
	opt 可选
		client ->> server: 发送消息X
	end
end
```
###### flowchart.js

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
###### JS Sequence Diagrams

```sequence
Title: 在此填写流程图标题
participant 客服端 as CLIENT
participant 服务器 as SERVER
Note right of CLIENT: 通过角色、对象列表，\n您可以更改它们的顺序
CLIENT -> SERVER: 请求消息：实线+实箭头
SERVER --> CLIENT: 返回消息：虚线+实箭头
Note over CLIENT: 说明
Note over CLIENT, SERVER: 跨对象说明
CLIENT ->> SERVER: 请求消息：实线+虚箭头
SERVER -->> CLIENT: 返回消息：虚线+虚箭头
Note left of SERVER: 我在最后一位
```
### 优化字体集

1. 优化导出HTML文件使用的字体集，优先以网络字体方式使用开源字体：思源宋体、思源黑体、Noto Sans、Noto Sans Mono；
2. 若无法加载优先字体，则使用微软雅黑等本地化字体呈现；
3. 由于思源宋体暂无免费网络资源，如需使用可下载并放置到Typora的主题目录的子目录`font`下、导出HTML文件的目录的子目录`font`下。

### 预置标签内容样式

1. 对于Markdown的代码/标签标记` `` `，针对特定内容设置特定的样式，以供特殊应用场景；
2. 目前主要产品更新/文档新修订说明中的修订类型，目前支持的预置样式的代码内容如下：
   - `added`、`add`、`新增`
   - `modified`、`mod`、`optimized`、`修改`、`优化`
   - `removed`、`rm`、`del`、`删除`、`移除`
   - `fixed`、`修复`

### 打印

1. 打印时字体自动缩小为屏幕显示尺寸的50%，以减少纸张浪费。

## 工具箱

### 章节导航

###### 大纲导航

1. 支持页面左侧←←←显示目录大纲，并能根据页面位置自动高亮当前章节；
2. 目录大纲默认显示前三级，可自行修改样式文件进行调整
3. 编写Markdown文档时，须在封面后添加标签`[TOC]`。

###### 面包屑导航

1. 支持在页面顶部↑↑↑显示当前章节标题内容（除第6级标题）；
2. 根据页面位置自动识别当前章节，正如你现在看到的那样。

### 插图浏览器

1. 自动将文档中所有图片添加点击操作，点击后显示插图浏览器；
2. 在插图浏览器中完整显示插图，并能直接按前/后按钮浏览文档中的其他插图；
3. 在插图浏览器中点击插图能直接跳转到对应的文档位置；
4. 点击以下图片体验插图浏览器：

![](http://f.hiphotos.baidu.com/image/pic/item/bd315c6034a85edf50107fa445540923dc54759d.jpg)

![](http://e.hiphotos.baidu.com/image/pic/item/500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg)

![](http://a.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f788a28152790e0cf3d6cad6a4.jpg)

### 自动更新外链

1. 为提高文档阅读与交互体验，对于外链（http、https、ftp等），自动强制设置为在新标签页中打开。

### 内容有效性检查

###### 无效内链

1. 自动检查页面内部链接的正确性；
2. 若存在无效的页内链接，则通过弹窗提示。

###### 重名章节标题

1. 自动检查文档是否存在重名的标题，以提示作者检查是否会存在页内链接不能跳转到重名的标题位置的可能性；
2. 重名章节标题的警告提示信息须启动浏览器的开发者工具或调试工具后，打开其控制台窗口进行查看。

# 如何使用

## 配置主题

1. 将`released\vlook.css`文件复制至Typora的主题目录；
2. 重启Typora，点击菜单`主题 > VLOOK`即可启用VLOOK主题。

> **如何找到Typora主题目录？**
>
> 打开Typora设置界面，在常规设置中点击【打开主题目录】按钮即可定位到该目录

## 安装插件

1. 在Typora中将Markdown文件导出为`HTML`文件；
2. 打开文件`released\vlook-toolbox.txt`，全选所有内容，并复制；
3. 用纯文件编辑器（如：Windows下的记事本）打开该导出的HTML文件，并拖到文件最末尾，将复制的内容粘贴在`</body>`前；
4. 保存，大功告成。

> 强烈建议使用Chrome或Firefox浏览器打开该HTML文件

## 本地配置字体（可选）

不进行本地字体配置，不会影响VLOOK™的任何功能，只对部分内容的字体呈现细节有区别（如标题）。

目前VLOOK须进行本地配置的字体只有「思源黑体 Black」，只须[下载](https://pan.baidu.com/s/10TGdjOgYe3xTFG0UhYdf-w)并安装该字体即可。

# 许可协议

**MIT许可证**

版权所有 (c) 2018 MAX°DESIGN | Max Chow
在此授予任何获得此软件和相关文档文件（“软件”）副本的人免费许可，以无限制地处理本软件，包括但不限于使用，复制，修改，合并，发布，分发，再授权和/或出售本软件的副本，并允许本软件的授予人员遵从以下情况：
上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。
本软件按“原样”提供，不提供任何以表达或暗示，包括但不限于销售，适用于特定用途和不侵权的保证。在任何情况下，作者或版权所有人不对因软件或软件的使用或其他事宜产生的任何索赔，损害或其他责任（无论是在合同，侵权或其他方面的诉讼中）负责。

# 官方主页

[https://github.com/MadMaxChow/VLOOK](https://github.com/MadMaxChow/VLOOK)

# 捐赠

若喜欢VLOOK™的话，可以请Max喝杯咖啡～

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fsmnridvyxj303y04mt94.jpg)



###### 终了