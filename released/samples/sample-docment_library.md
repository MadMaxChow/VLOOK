---
title: 自定义导出 HTML 后的文档标题（文档库）
vlook-welcome: 自定义文档加载过程中显示的欢迎屏信息（须在导出设置中添加对应的 head 信息，详见 VLOOK™ 使用攻略）
---

> 引用块小标题
>
> 这是一条普通的引用块



如果希望「引用块小标题」能突出显示，只需要将该行内容加粗即可，举例如下：

> **引用块小标题**
>
> 这是一条普通的引用块



如果希望双栏显示「引用块」，可以试试在水平分隔线 `---` 后添加引用块即可，举例如下：

---

> **左分栏**
>
> 这是左分栏的内容

> **右分栏**
>
> 这是右分栏的内容
>
> **[<kbd>这是超链接的按钮 ❯</kbd>](https://gitee.com/madmaxchow/VLOOK)**



若希望「三栏引用块」，则添加两条水平分隔线（最多三条，即四栏），举例如下：

---

---

> ###### 第 1 行：分栏 1
>
> 这是第 1 行的分栏 1 的内容（也支持标签）
>
> **[<kbd>这是超链接的按钮 ❯</kbd>](https://gitee.com/madmaxchow/VLOOK)**
>
> _~Bn!~_

> ###### 第 1 行：分栏 2
>
> 这是第 1 行的分栏 2 的内容（也支持标签）
>
> _~Gn!~_

> ###### 第 1 行：分栏 3
>
> 这是第 1 行的分栏 3 的内容（也支持标签）
>
> _~Og!~_

---

> ###### 第 2 行：折叠的左分栏
>
> 这是第 2 行的这是左分栏的内容（也支持标签）
>
> _~Gn~_

> ###### 第 2 行：折叠的右分栏
>
> 这是第 2 行的这是右分栏的内容（也支持标签）
>
> _~Gn~_



> **其他参考模板**
>
> - VLOOK™ 使用攻略的 md 源文件，位于目录 `released\demo` 下
> - [标准模板（VLOOK-Document-Template.md）](VLOOK-Document-Template.md?xmd=off)
> - [无封面模板（VLOOK-Document-Template-nocover.md）](VLOOK-Document-Template-nocover.md?xmd=off)
>   - [文库（VLOOK-Document-Template-doc_lib.md）](VLOOK-Document-Template-doc_lib.md?xmd=off)
