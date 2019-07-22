# 应用主题

+ 将`released\theme`下所有CSS文件复制至Typora的主题目录[^主题目录]；
+ 进入Typora的偏好设置，启用Markdown语法扩展下的所有选项（如：公式、上标、下标、高亮、图表等）；
+ 重启Typora，点击菜单`主题`，选择以`vlook-*`形式命名的主题，即可启用对应的VLOOK样式主题。

[^主题目录]: 打开Typora「偏好设置」界面，在常规设置中点击<kbd>打开主题目录</kbd>按钮即可定位到该目录

> **如何找到Typora主题目录？**
>
> 打开Typora「偏好设置」界面，点击<kbd>打开主题目录</kbd>按钮即可定位到该目录

# 应用插件

+ 在Typora中将Markdown文件导出为`HTML`文件；
+ 打开文件`released\vlook-toolbox.txt`，全选所有内容，并复制；
+ 用纯文件编辑器（如：Windows下的记事本）打开该导出的HTML文件，并拖到文件最末尾；
+ 将复制的内容粘贴在`<body>`之后：
  ```
  <body ...>
  ← ← ← ← ← 复制的toolbox内容粘贴于此！
  ...
  </body>
  ```
+ 保存，大吉大利。

> 强烈建议使用Chrome或Firefox浏览器查看