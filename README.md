
通过Typora导出的HTML文件，可以支持浮动目录大纲浏览。<br>
1. 导出的MD文档必须要添加`[toc]`标签；<br>
2. 导出后添加`outline.md`的代码到HTML文件的`</body>`前即可，详见示例。

如果输出的HTML为自动编号的样式，需要手工隐藏outline-code中的样式：
```
/* if use xxx.user.css. for example: Auto Numbering for Headings
must be comment css ".md-toc-hx:before" and "#write hx:before"
*/
/*.md-toc-h1:before,
.md-toc-h2:before,
.md-toc-h3:before,
.md-toc-h4:before,
.md-toc-h5:before,
.md-toc-h6:before {
	content: "";
}
#write h1:before,
#write h2:before,
#write h3:before,
#write h4:before,
#write h5:before,
#write h6:before {
	content: "";
}*/
```
