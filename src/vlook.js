/**************************************
 *
 * VLOOK JS - Typora Plugin
 *
 * V15.1
 * 2022-06-25
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 * https://gitee.com/madmaxchow/VLOOK
 *
 *************************************/

let vVer = "V15.1",
    iStopwatch = new Stopwatch(), // 初始化计时器
    gUndefined = undefined,
    gTrue = true,
    gFalse = false,
    gTimes = 0,
    gTotalTimes = 0,
    gHoldKeyAlt = gFalse,
    gLastHash = null,
    s_4space = "    ",
    s_Absolute = "absolute",
    s_Actived = "actived",
    s_Alt = "alt",
    s_Audio = "audio",
    s_Animation = "animation",
    s_Auto = "auto",
    s_Autoplay = "autoplay",
    s_Background = "background",
    s_BackgroundColor = "background-color",
    s_BackgroundImage = "background-image",
    s_BeforePrintWidth = "before-print-width",
    s_BeforePrintMaxWidth = "before-print-max-width",
    s_Block = "block",
    s_Blockquote = "blockquote",
    s_Bold = "bold",
    s_Border = "border",
    s_BorderBottomRightRadius = "border-bottom-right-radius",
    s_BorderColor = "border-color",
    s_BorderRadius = "border-radius",
    s_BorderTopLeftRadius = "border-top-left-radius",
    s_BorderTopRightRadius = "border-top-right-radius",
    s_BorderWidth = "border-width",
    s_Bottom = "bottom",
    s_Br = "<br>",
    s_Bubble = "bubble",
    s_Caption1 = ".v-cap-1",
    s_Caption2 = ".v-cap-2",
    s_CssAccentBtn = "v-accent-btn",
    s_CssActorKeySys = "v-actor-key-sys",
    s_CssActorExtSys = "v-actor-ext-sys",
    s_CssAudioMiniControl = "v-audio-mini-control",
    s_CssBadgeValue = "v-badge-value",
    s_CssBlockquoteFolder = "v-blockquote-folder",
    s_CssBtn_BtnGroup = ".v-btn, .v-btn-group",
    s_CssBtn__Assistor = ".v-btn.assistor",
    s_CssCaptionContainer = "v-cap-cntr",
    s_CssCaption__Mermaid = "v-caption.mermaid",
    s_CssCodeMirrorLine = "CodeMirror-line",
    s_CssContentExpander = "v-content-expander",
    s_CssCursorLaser = "v-cursor-laser",
    s_CssFences = "md-fences",
    s_CssFloatCard = "v-float-card",
    s_CssFig = "v-fig",
    s_CssFigNavBtns = ".v-fig-nav-btns",
    s_CssFocusSearch = "v-focus-search",
    s_CssTocHistory = "v-toc-history",
    s_CssImgInvertDark = "v-img-invert-dark",
    s_CssMermaidRestyler = "v-mermaid-restyler",
    s_CssNavCenterBlock = "v-nav-center-block",
    s_CssNavCenterFloat = "v-nav-center-float",
    s_CssPgCurrentItem = "v-pg-current-item",
    s_CssPipBtn = ".v-pip-btn",
    s_CssRbCoat = "v-rb-coat",
    s_CssResultNone = "v-result-none",
    s_CssSegmentBtn = "v-segment-btn",
    s_CssTableCross = ".v-table-cross",
    s_CssTableCrossCell = "v-table-cross-cell",
    s_CssTableRowGroupNotFolder = "v-tbl-row-g-not-folder",
    s_CssTableRowGroupBtn = ".v-tbl-row-g-btn",
    s_CssTableRowNumHidden = "v-tbl-row-num-hidden",
    s_CssTableColumnFormatMark = "v-tbl-col-fmt-mark",
    s_CssTableColumnFormatNumNeg = "v-tbl-col-fmt-num-negative",
    s_CssTableColumnFormatNumPos = "v-tbl-col-fmt-num-positive",
    s_CssText = "cssText",
    s_CssTextFieldFocus = "v-textfield-focus",
    s_CssThRepeater = "v-th-repeater",
    s_CssTocFolder = ".v-toc-folder",
    s_CssTocFilterResult = "v-toc-filter-result",
    s_CssTocItem = "v-toc-item",
    s_CssTocItemCurrent = "v-toc-item-current",
    s_CssTransitionAll = "v-transition-all",
    s_Checked = "checked",
    s_Class = "class",
    s_Click = "click",
    s_Codeblock = "codeblock",
    s_Color = "color",
    s_ColSpan = "colspan",
    s_Content = "content",
    s_Controls = "controls",
    s_Cursor = "cursor",
    s_ColorScheme = "color-scheme",
    s_Cost = "    COST ",
    s_Cover = "cover",
    s_Dark = "dark",
    s_Darksrc = "darksrc",
    s_Darksrcset = "darksrcset",
    s_DataAnchor = "d-anchor",
    s_DataBeforePrintFolded = "d-before-print-folded",
    s_DataBlockquoteFolded = "d-blockquote-folded",
    s_DataBtnGroup = "d-btn-group",
    s_DataCaptionCount ="d-cap-count",
    s_DataCatalogEmpty = "d-catalog-empty",
    s_DataCellMerge = "d-cell-merge",
    s_DataClipboardText = "data-clipboard-text",
    s_DataColspan = "d-colspan",
    s_DataColumnFmting = "d-column-fmting",
    s_DataContainer = "d-cntr",
    s_DataContentExpanded = "d-content-expanded",
    s_DataContentFolded = "d-content-folded",
    s_DataContentType = "d-content-type",
    s_DataDefault = "d-default",
    s_DataExtend = "d-extend",
    s_DataFigNum = "d-fig-num",
    s_DataFigType = "d-fig-type",
    s_DataFolded = "d-folded",
    s_DataFolder = "d-folder",
    s_DataFolderId = "d-folder-id",
    s_DataFoldingQuote = "d-folding-quote",
    s_DataForSearch = "data-for-search",
    s_DataDarkSrc = "d-darksrc",
    s_DataDuration = "d-duration",
    s_DataFigureGrid = "d-fig-grid",
    s_DataHeaderNum = "d-header-num",
    s_DataHistory = "d-history",
    s_DataIcon = "d-icon",
    s_DataIdFigType = "d-id-fig-type",
    s_DataKeywordMatch = "d-keyword-match",
    s_DataLmc = "d-lmc",
    s_DataNode = "d-node",
    s_DataParentFolderId = "d-parent-folder-id",
    s_DataPid = "d-pid",
    s_DataQuoteGroup = "d-quote-group",
    s_DataRef = "data-ref",
    s_DataRowFolded = "d-row-folded",
    s_DataRowOpenMode = "d-row-open-mode",
    s_DataSrc_ = "d-src-",
    s_DataSrcDark = "d-src-dark",
    s_DataSrcLight = "d-src-light",
    s_DataSrcset_ = "d-srcset-",
    s_DataSrcsetDark = "d-srcset-dark",
    s_DataSrcsetLight = "d-srcset-light",
    s_DataTd2th = "d-td2th",
    s_DataTitle = "d-title",
    s_DataId = "d-id",
    s_DataIdentLevel = "d-ident-level",
    s_DataImgFill = "d-img-fill",
    s_DataPause = "d-pause",
    s_DataPgIdx = "d-pg-idx",
    s_DataResult = "d-result",
    s_DataRbCoatData = "d-rb-coat-data",
    s_DataRbCoatShowed = "d-rb-coat-showed",
    s_DataRowGroup = "d-row-group",
    s_DataTblCol = "d-tbl-col",
    s_DataThRpt = "d-th-rpt",
    s_DataTips = "d-tips",
    s_Disabled = "disabled",
    s_Display = "display",
    s_Effect = "effect",
    s_Enabled = "enabled",
    s_Error = "error",
    s_Failed = "Failed [ ",
    s_False = "false",
    s_Fig = "fig",
    s_Fill = "fill",
    s_Filter = "filter",
    s_Float = "float",
    s_FontTheme = "font-theme",
    s_FootnotesArea = "footnotes-area",
    s_Freeze = "freeze",
    s_Function = "function",
    s_Height = "height",
    s_Hidden = "hidden",
    s_Hotkey = "Hotkey",
    s_Hover = "hover",
    s_HoverAction = "hover-action",
    s_Href = "href",
    s_Id = "id",
    s_InStart = "in-start",
    s_Interactive = "Interactive",
    s_Invert = "invert",
    s_Italic = "italic",
    s_Lang = "lang",
    s_LaserPointer = "laser-pointer",
    s_Left = "left",
    s_Light = "light",
    s_Line = "line",
    s_Loading = "loading",
    s_Loop = "loop",
    s_Margin = "margin",
    s_MarginBottom = "margin-bottom",
    s_MarginLeft = "margin-left",
    s_MaxHeight = "max-height",
    s_MaxWidth = "max-width",
    s_MdToc = "md-toc",
    s_Min = "min",
    s_Mini = "mini",
    s_MinWidth = "min-width",
    s_MouseUp = "mouseup",
    s_Name = "name",
    s_NavCenter = "nav-center",
    s_None = "none",
    s_Normal = "normal",
    s_Off = "off",
    s_Opacity = "opacity",
    s_Opened = "opened",
    s_Overflow = "overflow",
    s_OverflowX = "overflow-x",
    s_OverflowY = "overflow-y",
    s_Padding = "padding",
    s_PaddingBottom = "padding-bottom",
    s_PaddingLeft = "padding-left",
    s_PaddingRight = "padding-right",
    s_PaddingTop = "padding-top",
    s_ParagraphNav = "paragraph-nav",
    s_Placeholder = "placeholder",
    s_Playing = "playing",
    s_Position = "position",
    s_Preload = "preload",
    s_Presentation = "Presentation",
    s_Print = "print",
    s_Right = "right",
    s_RowSpan = "rowspan",
    s_Rx = "rx",
    s_Ry = "ry",
    s_Selected = "selected",
    s_Spotlight = "spotlight",
    s_Src = "src",
    s_Srcset = "srcset",
    s_Style = "style",
    s_SuffixImg = ".img",
    s_SuffixSvg = ".svg",
    s_Tabindex = "tabindex",
    s_Table = "table",
    s_TagName = "tagName",
    s_Target = "target",
    s_Text = "text",
    s_TextAlign = "text-align",
    s_TextLength = "textLength",
    s_Title = "title",
    s_Toc = "#vlook-toc>.md-toc-item",
    s_ToolbarSpliter = "toolbar-spliter",
    s_Top = "top",
    s_Transform = "transform",
    s_TransformOrigin = "transform-origin",
    s_True = "true",
    s_TTF = "ttf",
    s_Unfreeze = "unfreeze",
    s_VLOOK_ = "VLOOK-",
    s_varDBc = "var(--d-bc)",
    s_varDFC = "var(--d-f-c)",
    s_varMarkBg = "var(--mark-bg)",
    s_varMmCyan = "var(--mm-c-cyan-lg)",
    s_varMmCyanAlt = "var(--mm-c-cyan-alt-lg)",
    s_varMmOrange = "var(--mm-c-orange-lg)",
    s_varMmOrangeAlt = "var(--mm-c-orange-alt-lg)",
    s_varMmRed = "var(--mm-c-red-lg)",
    s_varMmRedAlt = "var(--mm-c-red-alt-lg)",
    s_varNavCenterHiddenLeft = "var(--v-nav-center-hidden-left)",
    s_varNavCenterWidth = "var(--v-nav-center-width)",
    s_varRB = "var(--v-r-b)",
    s_varRB__ = "--v-r-b",
    s_varRC__ = "--v-r-c",
    s_varRS__ = "--v-r-s",
    s_varRT__ = "--v-r-t",
    s_varRTag__ = "--v-r-tag",
    s_varTblRowAlpha = "var(--tbl-row-g-alpha)",
    s_VerticalAlign = "vertical-align",
    s_Video = "video",
    s_ViewBox = "viewBox",
    s_Visibility = "visibility",
    s_Wait = "wait",
    s_Width = "width",
    s_WOFF2 = "woff2",
    s_Zindex = "z-index",
    tag_2space = "&nbsp;&nbsp;";
iStopwatch.st();

// ==================== 内置函数调用简化 ==================== //

// 控制台打印日志
function LOG() {
    console.log.apply(console, arguments);
}
// 控制台打印通知
function INFO() {
    console.info.apply(console, arguments);
}
// 控制台打印警告
function WARN() {
    console.warn.apply(console, arguments);
}
// 控制台打印错误
function ERROR() {
    console.error.apply(console, arguments);
}
// 弹窗显示信息
function ALERT(m) {
    alert(m);
}

// 获得文档 URL
function WINDOW_getHref() {
    return window.location.href;
}

// 设置文档 URL
function WINDOW_setHref(value) {
    window.location.href = value;
}

// 获得文档 URL 的 hash
function WINDOW_getHash() {
    return window.location.hash;
}

// ==================== JQuery 方法调用简化 ==================== //

function JQ_addClass(target, className) {
    if (target !== gUndefined)
        target.addClass(className);
}

function JQ_removeClass(target, className) {
    if (target !== gUndefined)
        target.removeClass(className);
}

function JQ_exchangeClass(target, oldClassName, newClassName) {
    if (target !== gUndefined) {
        target.removeClass(oldClassName);
        target.addClass(newClassName);
    }
}

// attr 简化版
$.prototype.a = function (key, value) {
    if (value === gUndefined)
        return this.attr(key);
    else
        return this.attr(key, value);
}

// css 简化版
$.prototype.c = function (key, value) {
    if (value === gUndefined)
        return this.css(key);
    else
        return this.css(key, value);
}

// click 简化版
$.prototype.ck = function (callback) {
    this.click(callback);
}

// children 简化版
$.prototype.ch = function (value) {
    return this.children(value);
}

// each 简化版
$.prototype.e = function (callback) {
    this.each(callback);
}

// find 简化版
$.prototype.f = function (value) {
    return this.find(value);
}

// html 简化版
$.prototype.h = function (value) {
    if (value === gUndefined)
        return this.html();
    else
        return this.html(value);
}

// height 简化版
$.prototype.ht = function () {
    return this.height();
}

// offset 简化版
$.prototype.o = function () {
    return this.offset();
}

// parent 简化版
$.prototype.p = function () {
    return this.parent();
}

// text 简化版
$.prototype.t = function (value) {
    if (value === gUndefined)
        return this.text();
    else
        return this.text(value);
}

// toggle 简化版
$.prototype.tg = function (value) {
    this.toggle(value);
}

// trigger 简化版
$.prototype.tr = function (value) {
    this.trigger(value);
}

// unbind("click") 简化版
$.prototype.uC = function () {
    return this.unbind(s_Click);
}

// unbind("hover") 简化版
$.prototype.uH = function () {
    return this.unbind(s_Hover);
}

// width 简化版
$.prototype.w = function () {
    return this.width();
}

// ==================== JavaScript 方法调用简化 ==================== //

// match 简化版
String.prototype.m = function (value) {
    return this.match(value);
}

// replace 简化版
String.prototype.r = function (searchValue, replaceValue) {
    return this.replace(searchValue, replaceValue);
}

// trim 简化版
String.prototype.x = function (value) {
    return this.trim(value);
}

/**
 * replaceAll 简化版
 */
String.prototype.rA = function (exp, value) {
    const reg = new RegExp(exp, "g");
    return this.replaceAll(reg, value);
}

/**
 * startsWith 简化版
 */
String.prototype.sW = function (value) {
    return this.startsWith(value);
}

/**
 * endsWith 简化版
 */
String.prototype.eW = function (value) {
    return this.endsWith(value);
}

// indexOf 简化版
String.prototype.i = function (value) {
    return this.indexOf(value);
}

// toLowerCase 简化版
String.prototype.l = function (value) {
    return this.toLowerCase(value);
}

// substring 简化版
String.prototype.s = function (start, end) {
    return this.substring(start, end);
}

// parseInt 简化版
function JS_parseInt(value) {
    return parseInt(value);
}

// parseFloat 简化版
function JS_parseFloat(value) {
    return parseFloat(value);
}

// Math.round 简化版
function JS_mathRound(value) {
    return Math.round(value);
}

// Math.ceil 简化版
function JS_mathCeil(value) {
    return Math.ceil(value);
}

// decodeURI 简化版
function JS_decodeURI(value) {
    return decodeURI(value);
}

// ======================================== //

LOG(":::::::::::::::::::");
LOG("!!! " + (devMode === gTrue ? "- DEV -" : "RELEASED" ) + " !!!");
LOG("::: " + vVer + " :::");
LOG(":::::::::::::::::::");

INFO("=== Load Document ===");

// UI 元素
let iToolbar = gUndefined,
    iNavCenter = gUndefined,
    iChapNav = gUndefined,
    iParagraphNav = gUndefined,
    iSpotlight = gUndefined,
    iLaserPointer = gUndefined,
    iFontTheme = gUndefined,
    iFigNav = gUndefined,
    iInfoTips = gUndefined,
    iFootNote = gUndefined;

// ==================== 文档对象模型 ==================== //

// 文档的 html 对象
let DOM_h = gUndefined;
function DOM_html() {
    if (DOM_h === gUndefined) {
        DOM_h = $("html");
        if (DOM_h.length === 0) {
            DOM_h = gUndefined;
            ERROR(s_Failed + "DOM.html ]");
        }
    }
    return DOM_h;
}

// 文档的 body 对象
let DOM_b = gUndefined;
function DOM_body() {
    if (DOM_b === gUndefined) {
        DOM_b = $("body");
        if (DOM_b.length === 0) {
            DOM_b = gUndefined;
            ERROR(s_Failed + "DOM.body ]");
        }
    }
    return DOM_b;
}

// ==================== VLOOK 对象模型 ==================== //

// Markdown 导出为 HTML 的内容对象
let VOM_d = gUndefined;
function VOM_doc() {
    if (VOM_d === gUndefined) {
        VOM_d = $("#write");
        if (VOM_d.length === 0) {
            VOM_d = gUndefined;
            ERROR(s_Failed + "VOM.doc ]");
        }
    }
    return VOM_d;
}

// 封面对象
let VOM_c = gUndefined;
function VOM_cover() {
    if (VOM_c === gUndefined) {
        VOM_c = $("#write>pre.md-meta-block:first-child + h6, #write>h6:first-child");
        if (VOM_c.length === 0) {
            VOM_c = gUndefined;
            if (VOM_docTitle() === gUndefined)
                WARN(s_Failed + "VOM.c ], maybe no cover");
        }
    }
    return VOM_c;
}

// 封底对象
let VOM_bc = gUndefined;
function VOM_backcover() {
    // 注意该方法调用，必须在 #vk-footer-area 的位置调整前完成
    if (VOM_bc === gUndefined) {
        let fns = $("." + s_FootnotesArea);
        if (fns !== gUndefined) {
            let backcover = fns.prev(),
                tagName = backcover.prop(s_TagName);
            if (tagName !== gUndefined && tagName.l() === "h1")
                VOM_bc = backcover;
        }
        else {
            VOM_bc = gUndefined;
            WARN(s_Failed + "VOM.bc ], maybe no backcover");
        }
    }
    return VOM_bc;
}

// 文档标题对象（无封面模式）
let VOM_dt = gUndefined;
function VOM_docTitle() {
    if (VOM_dt === gUndefined) {
        VOM_dt = $("#vk-id-doc-title");
        if (VOM_dt.length === 0) {
            VOM_dt = gUndefined;
            WARN(s_Failed + "VOM.dt ]");
        }
    }
    return VOM_dt;
}

// ==================== 通用方法 ==================== //

/**
 * 检查是否为空对象
 */
$.prototype.isEmpty = function () {
    return (typeof (this) == "undefined");
}

/**
 * 判断对象是否已隐藏
 */
$.prototype.isHidden = function () {
    let T = this;
    return T !== gUndefined
        && (T.c(s_Display) === s_None || T.c(s_Visibility) === s_Hidden || T.c(s_Opacity) === "0");
}

/**
 * 判断对象是否已显示
 */
$.prototype.isShowed = function () {
    return !this.isHidden();
}

/**
 * 在元素前后以指定的前缀和后缀文本进行包裹
 * @param pre 前缀文本
 * @param suff 后缀文本
*/
$.prototype.wrapText = function (pre, suff) {
    this.h(pre + this.h() + suff);
}

/**
 * 替换 innerHTML 的内容
 * @param exp 用于匹配内容的正则表达式
 * @param value 将匹配的内容替换成该内容
*/
$.prototype.rHTML = function (exp, value) {
    this.h(this.h().replace(exp, value));
}

/**
 * 从指定内容开始，替换之后的匹配的内容
 * @param str 从指定内容出现的位置开始进行替换
 * @param oldValue 被替换的内容
 * @param newValue 用于替换的新内容
 */
String.prototype.rAfter = function (str, oldValue, newValue) {
    let T = this,
        i = T.i(str);
    if (i > -1) {
        let pre = T.s(0, i),
            suff = T.s(i, T.length);
        return pre + suff.r(oldValue, newValue);
    }
    return this;
};

/**
 * 判断是否为数值型
 */
String.prototype.isNumber = function () {
    return /^([-+])*\d+(\.\d+)?$/.test(this);
}

/**
 * 判断是否为百分数
 */
String.prototype.isPercent = function () {
    return /^([-+])*\d+(\.\d+)?%$/.test(this);
}

/**
 * 判断是否为货币型
 */
String.prototype.isCurrency = function () {
    return /^(.{1,3}\s)([-+])*\d+(\.\d+)?$/.test(this);
}

/**
 * 环境信息类
 */
const env = {
    /*
    Windows 平台样例：
        - (Chrome) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
        - (Firefox) Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
        - (Edge) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362

    macOS 平台样例：
        - (Chrome) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
        - (Firefox) Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:69.0) Gecko/20100101 Firefox/69.0
        - (Safari) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.2 Safari/605.1.15

    iPhone 平台样例：
        - (Chrome) Mozilla/5.0 (iPhone; CPU iPhone OS 15_02 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/97.0.04692.72 Mobile/15E148 Safari/604.1
        - (Firefox) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/40.2 Mobile/15E148 Safari/605.1.15
        - (Safari) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1
    */

    // 浏览器内核信息
    core : function () {
        const u = navigator.userAgent;
        return {
            trident: u.i("Trident") > -1, //IE内核
            presto: u.i("Presto") > -1, //opera内核
            webkit: u.i("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.i("Gecko") > -1 && u.i("KHTML") === -1 //火狐内核
        };
    }(),

    // 设备信息
    device : function () {
        const u = navigator.userAgent;
        return {
            mobile: u.i("Mobile") > -1, // 是否为移动终端
            iOS: u.i("iPhone") > -1, // iOS 类终端
            android: u.i("Android") > -1 || u.i("Linux") > -1, // android 终端或者 UC 浏览器
            iPhone: u.i("iPhone") > -1, // 是否为 iPhone 或者 QQHD 浏览器
            iPad: u.i("iPad") > -1 // 是否 iPad
        };
    }(),

    // 浏览器类型
    browser : function () {
        const u = navigator.userAgent;
        return {
            Chrome: u.i("Chrome") > -1 || u.i(") CriOS") > -1, // Chrome 浏览器
            Firefox: u.i("Firefox") > -1 || u.i(") FxiOS") > -1, // Firefox 浏览器
            Safari: u.i("Safari") > -1, // Safari 浏览器
            Edge: u.i(" Edg/") > -1 // Edge 浏览器
        };
    }(),

    // 浏览器版本信息
    browserVer : function () {
        const u = navigator.userAgent;
        return {
            Chrome: u.m(/Chrome\/[\d.]+/gi) ? u.m(/Chrome\/[\d.]+/gi)[0].m(/\d+/)[0] : "0", // Chrome 浏览器版本
            Firefox: u.m(/Firefox\/[\d.]+/gi) ? u.m(/Firefox\/[\d.]+/gi)[0].m(/\d+/)[0] : "0", // Firefox 浏览器版本
            Safari: u.m(/Version\/[\d.]+.+Safari\/[\d.]+/gi) ? u.m(/Version\/[\d.]+.+Safari\/[\d.]+/gi)[0].m(/\d+/)[0] : "0", // Safari 浏览器版本
            Edge: u.m(/Edg\/[\d.]+/gi) ? u.m(/Edg\/[\d.]+/gi)[0].m(/\d+/)[0] : "0" // Edge 浏览器版本
        };
    }(),

    // 操作系统信息
    os : function () {
        const u = navigator.userAgent;
        return {
            Windows: /windows|win32|win64/i.test(u), // 是否为 Windows 平台
            macOS: /macintosh/i.test(u), // 是否为 macOS 平台
            iOS: /iphone os/i.test(u), // 是否为 iOS 平台
            Linux: /linux/i.test(u) // 是否为 iOS 平台
        };
    }(),

    // 语言信息
    language : function () {
        const lang = navigator.language;
        return {
            full: lang.l(),
            base: lang.s(0, 2),
            subset: lang.s(3, lang.length)
        };
    }(),

    // 显示信息
    display : function () {
        return {
            DPR : window.devicePixelRatio
        };
    }(),

    /**
     * 打印环境信息
     * @param silent 是否为静默模式，静默模式只反馈环境信息值，不打印到控制台
     * @returns string 环境信息
     */
    print : function (silent) {
        let info = "::: Environmental :::\n",
            r = info;
        if (!silent) LOG(info);

        info = "    ├ Language   [ "
            + env.language.base
            + (env.language.subset.length > 0 ? "_" + env.language.subset : "")
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Device     [ "
            + (env.device.mobile ? "Mobile" : "")
            + (env.device.iOS ? "/iOS" : "")
            + (env.device.android ? "/Android" : "")
            + (env.device.iPhone ? "/iPhone" : "")
            + (env.device.iPad ? "/iPad" : "")
            + "]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ OS         " +
            (env.os.macOS ? "[ macOS ]"
                : (env.os.Windows ? "[ Windows ]"
                    : (env.os.iOS ? "[ iOS ]"
                        : (env.os.Linux ? "[Linux]" : "[Others]"))))
            + "\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Browser    [ "
            + (env.browser.Chrome ? "Chrome / " + env.browserVer.Chrome : "")
            + (env.browser.Firefox ? " Firefox / " + env.browserVer.Firefox : "")
            + (env.browser.Safari ? " Safari / " + env.browserVer.Safari : "")
            + (env.browser.Edge ? " Edge / " + env.browserVer.Edge : "")
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Core       [ "
            + (env.core.gecko ? "Gecko" : "")
            + (env.core.presto ? "Presto" : "")
            + (env.core.trident ? "Trident" : "")
            + (env.core.webkit ? "WebKit" : "")
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    └ DPR        [ "
            + env.display.DPR
            + " ]\n"; // Device Pixel Ratio
        r += info;
        if (!silent) LOG(info);

        info = "    └ VLOOK Type [ "
            + V_type
            + " ]\n"; // Device Pixel Ratio
        r += info;
        if (!silent) LOG(info);

        info = navigator.userAgent + "\n";
        r += info;
        if (!silent) LOG(info);

        return r;
    },

    // 打印 Mermaid 缩放信息
    printMermaidDPR : function() {
        let info = "::: Mermaid DPR :::\n"
            + "    ├ DPR of builder  [ " + RepairTool_mermaidDPR_builder + " ]\n"
            + "    └ DPR of render   [ " + RepairTool_mermaidDPR_render + " ]\n";
        LOG(info);
        return info;
    },

    /**
     * 屏幕上显示环境信息、Mermaid 信息等
     **/
    show : function (source) {
        let info = env.print()
            + env.printMermaidDPR()
            + "\n----------\nPowered by MAX°孟兆\n";
        console.log(info);
        Copyer_action(source, info, gFalse);
        ALERT(info);
    }
};

// ==================== VLOOK 关键信息类 ==================== //

let V_ver = vVer, // VLOOK 版本信息
    V_debugMode = debugMode, // 是否为开发模式
    V_type = "max", // 插件运行类型：max, pro, mini
    V_params_url = [], // VLOOK 的调校参数
    V_params_yaml = []; // VLOOK 文档的 YAML

// 初始化调校参数
function V_params_init() {
    V_params_url = V_util_getQueryParams(WINDOW_getHref());
    let vp = V_util_getMetaByName("vlook-query");
    V_params_yaml = V_util_getQueryParams("file.html" + (vp !== gUndefined ? "?" + vp : ""));
}
// ========================================


// ========================================
// 在 debug 模式下输出调试信息
function DEBUG(...info) {
    if (V_debugMode === gTrue)
        WARN(...info);
}

// ========================================
// VLOOK 本地数据读/写
// 获得数据
function V_data_get(key) {
    return localStorage[s_VLOOK_ + key];
}
// 写入数据
function V_data_set(key, value) {
    localStorage[s_VLOOK_ + key] = value;
}
// ========================================

// ========================================
// VLOOK 工具包
/**
 * 获取 HTML 文档标题
 */
function V_util_getDocTitle() {
    return $(document).a(s_Title);
}

/**
 * 获取 HTML <meta> 标签的内容
 * @param metaName 指定 meta 的名称
 * @returns 指定 meta 的内容
 */
function V_util_getMetaByName(metaName) {
    let content = $("meta[name='" + metaName + "']").a(s_Content);
    return (content === "${" + metaName + "}" ? gUndefined : content);
}

/**
 * 获取启动参数的值
 * @param pName 启动参数名称
 * @returns 启动参数的值
 */
function V_util_getParamVal(pName) {
    let v = V_params_url[pName];
    // URL 中无指定，则深度通过 YAML 中获取
    if (v === gUndefined)
        v = V_params_yaml[pName];
    return v;
}

/**
 * 获取 URL 中的参数数组
 * @param u 完整的 URL 内容
 */
function V_util_getQueryParams(u) {
    let h = u.i("#");
    u = h > -1 ? u.s(0, h) : u; // 只截取 URL 中 # 前的内容

    let si = u.i("?"),
        qs = u.s(si > -1 ? si + 1 : u.length, u.length), // 获取url中"?"符后的字串
        p = {}, // 保存参数数据的对象
        is = (qs.length > 0) ? qs.split("&") : [], // 取得每一个参数项,
        item = null,
        l = is.length;

    // 将所有参数拆解至数组中
    for (let i = 0; i < l; i++) {
        item = is[i].split("=");
        p[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
    }
    return p;
}

/**
 * 获取 URL 中的锚点
 * @param u 完整的 URL 内容
 */
function V_util_getHash(u) {
    return u.s(u.i("#"), u.length);
}

/**
 * 获取 URL 中的参数字符串
 * @param u 完整的 URL 内容
 */
function V_util_getQueryString(u) {
    let i = u.i("?");
    return i > -1 ? u.s(i + 1, u.length) : "";
}

/**
 * 获取 Alt / Option 修饰键情况
 * @returns true：按下，false：未按下
 */
function V_util_holdKey_Alt() {
    return (event.altKey);// || event.metaKey);
}

/**
 * 批量修改指定的 CSS 变量集
 * @param varSet 变量数组
 * @param flag 修改为指定变量集的标识
 */
function V_util_changeCssVarSet(varSet, flag) {
    // 生成目标颜色方案值列表
    let tmp = [];
    if (flag !== gUndefined) {
        for (let i = 0, len = varSet.length; i < len; i++) {
            tmp.push(V_util_getVarVal(varSet[i] + "-" + flag));
        }
    }
    // 遍历所有变量实现 ColorScheme 切换
    for (let i = 0, len = varSet.length; i < len; i++) {
        if (flag !== gUndefined)
            V_util_setVarVal(varSet[i], tmp[i]);
        else
            V_util_setVarVal(varSet[i], 0);
    }
}

/**
 * 获得 URL 中的路径部分
 * @param u URL 地址
 */
function V_util_getPath(u) {
    let qi = u.i("?"),
        ti = u.s(0, qi).lastIndexOf("/"),
        pi = ti === -1 ? 0 : ti;
    return u.s(0, pi + 1);
}

/**
 * 进行 HTML 特殊符号进行转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlEncode(text) {
    if (text.length === 0)
        return "";
    return text.r(/&/g, "&amp;")
        .r(/</g, "&lt;")
        .r(/>/g, "&gt;")
        .r(/ /g, "&nbsp;")
        .r(/'/g, "&apos;")
        .r(/"/g, "&quot;")
        .r(/<br>/g, "");
}

/**
 * 进行 HTML 标签符转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlTagEncode(text) {
    if (text.length === 0)
        return "";
    return text.r(/</g, "&lt;")
        .r(/>/g, "&gt;");
}

/**
 * 进行 HTML 单、双引号转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlQuotEncode(text) {
    if (text.length === 0)
        return "";
    return text.r(/'/g, "&apos;")
        .r(/"/g, "&quot;");
}

/**
 * 清理 HTML 中的单、双引号
 * @param text 原始文本
 * @return String 清理后的文本
 */
function V_util_clearHtmlQuot(text) {
    if (text.length === 0)
        return "";
    return text.r(/'/g, "")
        .r(/"/g, "");
}

/**
 * 处理并返回省略后的文本
 * @param text 原始文本
 * @param limit 头、尾长度限制
 * @return String 省略后的文本
 */
function V_util_ellipsisText(text, limit) {
    // 多个空格替换为 1 个
    text = text.r(/\s+/g, " ");

    // 不需要进行省略处理
    if (text.length <= limit * 2)
        return V_util_htmlTagEncode(text);

    // 默认先按 1 个字占 1 个字节长度取头、尾部分
    let h = text.s(0, limit).x(),
        t = text.s(text.length - limit, text.length).x();
    // 判断头、尾部分是否含中文
    let cjkHeader = h.m(/\p{Unified_Ideograph}/ug),
        cjkTailer = t.m(/\p{Unified_Ideograph}/ug);
    if (cjkHeader != null && cjkHeader.length > 0)
        h = __getChs(h, limit, cjkHeader);
    if (cjkTailer != null && cjkTailer.length > 0)
        t = __getChsRev(t, limit, cjkTailer);

    /**
     * 正序获取字符串（ 1 个 CJK 算两个字符）
     *
     * @param {*} str 原始字符
     * @param {*} limit 限制长度
     * @param {*} cjk CJK 字符数组
     * @returns 新的字符串
     */
    function __getChs(str, limit, cjk) {
        let cnt = 0;
        while (limit > 0) {
            if (cjk.i(str[cnt]) > -1)
                limit -= 2;
            else
                limit--;
            cnt++;
        }
        return str.s(0, cnt);
    }
    /**
     * 反序获取字符串（ 1 个 CJK 算两个字符）
     *
     * @param {*} str 原始字符
     * @param {*} limit 限制长度
     * @param {*} cjk CJK 字符数组
     * @returns 新的字符串
     */
    function __getChsRev(str, limit, cjk) {
        let count = 0,
            len = str.length - 1;
        while (limit > 0) {
            if (cjk.i(str[len - count]) > -1)
                limit -= 2;
            else
                limit--;
            count++;
        }
        return str.s(len + 1 - count);
    }

    return V_util_htmlTagEncode(h + " . . . " + t);
}

/**
 * 重定位至锚点
 * @return boolean true：已进行重定向，false：无须进行重定向
 */
function V_util_redirectTo() {
    let h = WINDOW_getHash();
    // 如果 URL 带锚点
    if (h.length > 0 && h !== "#vk-id-doc-title") {
        LOG("    ↩ Redirect to h: " + JS_decodeURI(h));
        WINDOW_setHref("#"); // 强制先清空当前 h
        WINDOW_setHref(h);
        // 若最后访问的锚点与本次相同，则强制进行一次微调
        setTimeout(function () {
            V_ui_tuningScrollTop(h);
        }, 300);
        return gTrue;
    }
    return gFalse;
}

/**
 * 跳转至页内锚点，并自动进行位置微调适配
 */
function V_util_gotoHash(hash) {
    let last = JS_decodeURI(WINDOW_getHash());
    WINDOW_setHref(hash);
    // 若前后锚点一样，则会导致不会触发 hashchange 事件，须强制进行一次微调
    if (last === JS_decodeURI(hash))
        V_ui_tuningScrollTop(hash);
}

/**
 * 获取 CSS 变量值
 * @param varName CSS 变量名
 */
function V_util_getVarVal(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
}

/**
 * 设置 CSS 变量值
 * @param varName CSS 变量名
 * @param value CSS 变量值
 */
function V_util_setVarVal(varName, value) {
    document.documentElement.style.setProperty(varName, value);
}
// VLOOK 工具 包
// ========================================

// ========================================
// 通用的格式化操作
/**
 * 添加千位符
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_thousands(str) {
    return str.r(/(\d)(?=(\d{3})+(\.\d+)*(\D)*$)/g, "$1,");
}

/**
 * 对小数部分进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_decimal(str) {
    return str.r(/\.(\d+)/, ".<span class='v-tbl-col-fmt-num-decimal'>$1</span>");
}

/**
 * 对百分号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_percent(str) {
    return str.r(/%</, "<span class='v-tbl-col-fmt-percent'> %</span><");
}

/**
 * 对货币符号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_currency(str) {
    // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
    return str.r(/(>.{1,3}\s)/, "><span class='v-tbl-col-fmt-currency'$1</span>");
}
// ========================================

// ========================================
// 检查文档结构是否符合 VLOOK 规范程度
function V_checkSpec () {
    let v = gTrue,
        c = [
            "因以下原因无法激活 VLOOK 插件：\n\n",
            // "因以下原因無法激活 VLOOK 插件：\n\n",
            "The VLOOK plugin cannot be activated for the following reasons:\n\n",
            // "Le plugin VLOOK ne peut pas être activé pour les raisons suivantes:\n\n",
            // "Das VLOOK-Plugin kann aus folgenden Gründen nicht aktiviert werden:\n\n",
            // "El complemento VLOOK no se puede activar por las siguientes razones:\n\n",
            // "Плагин VLOOK не может быть активирован по следующим причинам:\n\n",
            // "次の理由により、VLOOKプラグインをアクティブ化できません：\n\n",
            // "다음과 같은 이유로 VLOOK 플러그인을 활성화 할 수 없습니다 :\n\n"
            ][V_lang_id];

    // 只支持由 Typora 导出的 HTML 文件
    if (DOM_body().a(s_Class).i("typora-export") === -1) {
        c += [
            "• 只支持由 Typora 导出的 HTML 文件\n",
            // "• 只支持由 Typora 導出的 HTML 文件\n",
            "• Only HTML files exported by Typora are supported\n",
            // "• Seuls les fichiers HTML exportés par Typora sont pris en charge\n",
            // "• Es werden nur von Typora exportierte HTML-Dateien unterstützt\n",
            // "• Solo se admiten archivos HTML exportados por Typora\n",
            // "• Поддерживаются только файлы HTML, экспортированные Typora\n",
            // "• Typora によってエクスポートされたHTMLファイルのみがサポートされています\n",
            // "• Typora 에서 내 보낸 HTML 파일 만 지원됩니다\n"
            ][V_lang_id];
        v = gFalse;
    }

    // 缺少目录
    if ($("." + s_MdToc).length === 0) {
        c += [
            "• 缺少 [TOC], 这是 GFM 标准的「目录」语法\n",
            // "• 缺少 [TOC], 这是 GFM 標準的「目錄」语法\n",
            "• Missing [TOC], the GFM standard \"Table of Content\"\n",
            // "• Manquant [TOC], la \"Table des matières\" standard GFM\n",
            // "• Fehlendes [TOC], der GFM-Standard \"Inhaltsverzeichnis\"\n",
            // "• Falta [TOC], la \"Tabla de contenido\" estándar de GFM\n",
            // "• Отсутствует [TOC], стандарт GFM \"Table of Content\".\n",
            // "• [TOC] がない、GFM標準の「目次」\n",
            // "•GFM 표준 '목차'인 [TOC] 누락\n"
            ][V_lang_id];
    }

    // 存在不符合规范的情况
    if (v === gFalse) {
        c += [
            "\n建议参考文档模板：",
            // "\n建議參考文檔模板：",
            "\nSuggestion Reference document template: ",
            // "\nModèle de document de référence de suggestion: ",
            // "\nVorschlag Referenzdokumentvorlage: ",
            // "\nPlantilla de documento de referencia de sugerencia: ",
            // "\nПредложение Шаблон справочного документа: ",
            // "\n提案参照ドキュメントテンプレート：",
            // "\n제안 참조 문서 템플릿 : "
        ][V_lang_id] + "\nreleased/demo/VLOOK-Document-Template.md";

        ALERT(c);
        return gFalse;
    }

    // 符合规范
    return gTrue;
}
// ========================================


/**
 * 初始化关键组件实例
 */
function V_init() {
    let sw = new Stopwatch();
    sw.st();
    iFontTheme = new FontTheme(new BgMask(s_FontTheme, "center"), V_util_getVarVal("--v-f-theme"));
    if (iFontTheme === gFalse)
        ALERT(s_Failed + "iFntThm ]");
    else
        iFontTheme.init(V_util_getParamVal("wf")); // 初始化
    sw.ed("    ├ Font Themer: ");

    // ==================== UI --------------------

    // 聚光灯
    sw.st();
    iSpotlight = new Spotlight(180, new BottomTips(s_Spotlight));
    if (iSpotlight === gFalse)
        ALERT(s_Failed + "iSpotlight ]");
    sw.ed("    ├ Spotlight: ");

    // 激光笔
    iLaserPointer = new LaserPointer(new BottomTips("laserPointe"));
    if (iLaserPointer === gFalse)
        ALERT(s_Failed + "iPter ]");
    sw.ed("    ├ LaserPointer: ");

    // 长内容折叠
    sw.st();
    // iContentFolder = new ContentFolder();
    // if (iContentFolder.length === 0)
        // ALERT(s_Failed + "iCtFolder ]");
    ContentFolder_enabled = (V_util_getParamVal("cf") !== s_Off) ? true : false;
    ContentFolder_init();
    sw.ed("    ├ Content Folding: ");

    // 工具提示
    // iToolTips = new ToolTips();
    // if (iToolTips.length === 0)
    //     ALERT(s_Failed + "iToolTips ]");
    ToolTips_init();

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BgMask("info-tips", "center"));
    if (iInfoTips.length === 0)
        ALERT(s_Failed + "iInfoTips ]");

    // 导航中心
    sw.st();
    let runMode = V_util_getParamVal("nc");
    iNavCenter = new NavCenter(new BgMask(s_NavCenter, s_Left, gTrue), runMode);
    if (iNavCenter === gFalse)
        ALERT(s_Failed + "iNavCenter ]");
    sw.ed("    ├ Nav Center: ");

    // 逐章导航
    sw.st();
    iChapNav = new ChapterNav(iNavCenter);
    if (iChapNav === gFalse)
        ALERT(s_Failed + "iChapNav ]");
    else {
        // 添加关联组件
        iNavCenter.chpNav = iChapNav;
    }
    sw.ed("    ├ Chapter Nav: ");

    // 工具栏
    sw.st();
    iToolbar = new Toolbar(iNavCenter, iChapNav);
    if (iToolbar === gFalse)
        ALERT(s_Failed + "iTb ]");
    else {
        // 导航中心按钮
        iToolbar.add(s_NavCenter, function () {
            iNavCenter.tg();
        });

        // 字体风格
        iToolbar.add(s_FontTheme, function () {
            iFontTheme.tg();
        });

        // 颜色方案（Light/Dark）
        iToolbar.add(s_ColorScheme, function () {
            ColorScheme.tg();
        });

        // 分隔条
        iToolbar.addSpliter(s_ToolbarSpliter);

        // 段落导航
        iToolbar.add(s_ParagraphNav, function () {
            iInfoTips.inform([
                "开启方式：<br /><strong>三击文档中的「任意段落」</strong>",
                // "开启方式：<br /><strong>三击文档中的「任意段落」</strong>",
                "Open method:<br /><strong>three click \"any paragraph\" in the document</strong>",
                // "Méthode ouverte: <br /><strong>trois clics \"n'importe quel paragraphe\" dans le document</strong>",
                // "Methode öffnen: <br /><strong>drei Klick Sie im Dokument auf \"einen beliebigen Absatz\"</strong>",
                // "Método abierto: <br /><strong>haga tres clics en \"cualquier párrafo\" en el documento</strong>",
                // "Метод открытия: <br /><strong>тройной щелчок «любой абзац» в документе.</strong>",
                // "開く方法：<br /><strong>ドキュメント内の「任意の段落」をスリークリックします</strong>",
                // "열기 방법 : <br /><strong>문서에서 \"임 의 단락\"세 번 클릭.</strong>"
            ][V_lang_id], 10000, gTrue);
        });

        // 聚光灯
        iToolbar.add(s_Spotlight, function () {
            iLaserPointer.hide();
            if (iSpotlight.tg() === gTrue)
                iParagraphNav.hide();
        });

        // 激光笔
        iToolbar.add(s_LaserPointer, function () {
            // DEBUG(iLaserPointer);
            iSpotlight.hide();
            if (iLaserPointer.tg() === gTrue)
                iParagraphNav.hide();
        });

        // 打印按钮
        iToolbar.add(s_Print, function () {
            V_print_ready();
        });

        // 添加关联组件
        iNavCenter.toolbar = iToolbar;
        iSpotlight.toolbar = iToolbar;
        iLaserPointer.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontTheme.bindButton(iToolbar.btns[s_FontTheme]);
    }
    sw.ed("    ├ Toolbar: ");

    // 插图浏览器
    sw.st();
    iFigNav = new FigureNav();
    if (iFigNav === gFalse)
        ALERT(s_Failed + "iFigNav ]");
    sw.ed("    ├ Figure Nav: ");

    // ----------------------------------------
    sw.st();

    // 文档更多内容栏遮罩栏
    MoreDocContent_init();

    // 脚注
    iFootNote = new FootNote(new BgMask("foot-note", s_Bottom, gTrue));
    if (iFootNote === gFalse)
        ALERT(s_Failed + "iFootNote ]");

    // 文档信息
    DocInfo_init();

    // 缩放显示
    ZoomView_init();

    // 链接检查
    LinkTool_init(new BgMask("link-checker", s_Right, gTrue));

    // 状态栏
    StatusBar_init();
    StatusBar_add("doc-info", DocInfo_ui);
    StatusBar_add("zoom-view", ZoomView_ui);
    StatusBar_add("link-checker", LinkTool_ui);

    sw.ed("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
function V_initKernel() {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.st("* Document Logo");
    let icoLg = $(".v-doc-logo-light").c(s_BackgroundImage),
        icoDk = $(".v-doc-logo-dark").c(s_BackgroundImage);
    $("head").append("<link rel='icon' id='doc-icon-light' href='" + icoLg.s(5, icoLg.length - 2) + "' type='image/x-icon'/>"
        + "<link rel='icon' id='doc-icon-dark' href='" + icoDk.s(5, icoDk.length - 2) + "' type='image/x-icon'/>");
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 封面、封底处理
    if (VOM_cover() === gUndefined) {
        let vTp = (V_type === s_Mini ? " mini" : "");
        VOM_doc().prepend('<div id="vk-id-doc-title" class="v-doc-title' + vTp + '">' + V_util_getDocTitle() +'</div>');
    }

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.st("* UI i18n");
    V_ui_initI18n();
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 初始化题注生成器配置
    // let capNum = V_util_getParamVal("capnum");
    // if (capNum !== gUndefined && capNum.i(s_Fig) > -1)
    //     ExtFigure_blockCapNum = gTrue;
    // if (capNum !== gUndefined && capNum.i(s_Table) > -1)
    //     ExtTable.blockCapNum = gTrue;
    // if (capNum !== gUndefined && capNum.i(s_Audio) > -1)
    //     ExtAudio_blockCapNum = gTrue;
    // if (capNum !== gUndefined && capNum.i(s_Video) > -1)
    //     ExtVideo_blockCapNum = gTrue;
    // if (capNum !== gUndefined && capNum.i(s_Codeblock) > -1)
    //     ExtCodeBlock_blockCapNum = gTrue;
    if (V_util_getParamVal("capauto") === "on")
        CaptionGenerator_autoContent = gTrue;

    // ----------------------------------------
    // 初始化音频数据
    iStopwatch.st("* Audio: ");
    ExtAudio_init();
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 初始化视频数据
    iStopwatch.st("* Video: ");
    ExtVideo_init();
    iStopwatch.ed(s_4space);

    // ========================================
    // 初始化引用块
    iStopwatch.st("* Quote: ");
    ExtQuote_init();
    ExtQuote_adjustHoverStyle();
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 初始化插图数据
    iStopwatch.st("* Figure: ");
    ExtFigure_init();
    iStopwatch.ed(s_Cost);

    // ----------------------------------------
    // 初始化表格
    iStopwatch.st("* Table: ");
    ExtTable_init();
    iStopwatch.ed(s_Cost);

    TableCross_init();
    // // 设置表格阅读模式的开关状态（不指定则默认开启）
    // if (V_util_getParamVal("tr") !== s_Off)
    //     TableCross_toggle();
    RowGroup_adjustHoverStyle();

    // ----------------------------------------
    // 初始化代码块
    iStopwatch.st("* Code Block: ");
    ExtCodeBlock_init();
    iStopwatch.ed(s_4space);

    // // ========================================
    // // 初始化引用块
    // iStopwatch.st("* Quote: ");
    // ExtQuote_init();
    // ExtQuote_adjustHoverStyle();
    // iStopwatch.ed(s_4space);
    // ----------------------------------------
    // Code Magic 处理
    // （注意：须在 ExtQuote 初始化之后执行）
    // 包括了：彩虹标签、彩虹徽章、彩虹引用、刮刮卡、文字注音等
    iStopwatch.st("* Code°Magic: ");
    CodeMagic_init();
    iStopwatch.ed(s_4space);
    // ========================================

    // ----------------------------------------
    // 文档没有任何可索引的对象时，默认不显示导航中心
    if (iNavCenter.catalog.hasIndexItem() === gFalse
        && iNavCenter.figure.hasIndexItem() === gFalse
        && iNavCenter.table.hasIndexItem() === gFalse
        && iNavCenter.media.hasIndexItem() === gFalse
        && iNavCenter.codeblock.hasIndexItem() === gFalse) {
            iNavCenter.runMode = "closed";
    }

    // ----------------------------------------
    // 增强脚注
    iStopwatch.st("* Foot Note: ");
    FootNote.init();
    iStopwatch.ed(s_4space);

    // VLOOK UI 统一样式适配处理
    V_ui_adjustHoverStyle();

    // 主要针对小屏情况，完成表格初始化后进行适配
    // 如果不是小屏，则由 adjustAll 触发
    ContentFolder_adjust();

    // ----------------------------------------
    // 初始化 导航中心、章节导航 数据
    iStopwatch.st("* Adjust NavCenter/ChapterNav/FigureNav/Toolbar/StatusBar");
    if (NavCenter.init()) {
        if (!env.device.mobile)
            iNavCenter.showHandle();

        iNavCenter.adjust();
        iChapNav.adjust();
        iToolbar.adjust();
        StatusBar_adjust();

        // 根据设备类型自适应 hover 样式
        iNavCenter.catalog.adjustHoverStyle();
        iChapNav.adjustHoverStyle();
        iFigNav.adjustHoverStyle();
    }
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 自动生成可通过 DOM 引用的目录自动编号
    ChpAutoNum_initToc();

    // ----------------------------------------
    iStopwatch.st("* Binding Event");
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    document.addEventListener("mousemove", function () {
        iSpotlight.repaint(event || window.event);
        iNavCenter.snap(event || window.event);
    });

    // 绑定文档的单击事件
    $(document).uC().ck(function () {
        TableCross_hide();
    });

    // 绑定文档的滚动事件
    $(document).scroll(function () {
        let currentTime = new Date().getTime(),
            scrollTop = $(document).scrollTop();

        // 显示或隐藏文档更多内容遮罩栏
        if (scrollTop < 10
            || scrollTop > (scrollTop - 10)
            || currentTime - V_doc_scroll_lastUpdate > 500)
                MoreDocContent_refresh(scrollTop);

        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop < 10
            || scrollTop > (scrollTop - 10)
            || currentTime - V_doc_scroll_lastUpdate > 500
            || (Math.abs(scrollTop - V.doc.scroll.lastTop) > 50 && (currentTime - V_doc_scroll_lastUpdate) > 500)) {
                // 更新控制执行频率相关判断数据
                V_doc_scroll_update(currentTime, $(document).scrollTop());
                // 根据是屏幕大小进行不同的适配控制
                V_ui_adjustAll();
        }

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iNavCenter.catalog.focusHeader();
    });

    // 绑定窗口大小缩放事件
    $(window).resize(function () {
        TableCross_hide();
        iNavCenter.catalog.focusHeader();
        V_ui_adjustAll();
        ExtQuote_uniteColumnsHeight();
    });

    // 绑定打印前的触发事件
    window.onbeforeprint = function () {
        if (V_type === s_Mini)
            return;
        // 不是通过 VLOOK 打印按钮进行打印时进行提醒
        if (V_print_mode !== "VLOOK")
            ALERT([
                "注意！为确保打印正常，建议使用文档内工具栏左侧的【打印】按钮进行打印！",
                // "注意！為保證打印正常，建議使用文檔中工具欄左側的【打印】按鈕進行打印！",
                "Notice! To ensure normal printing, it is recommended to use the [Print] button on the left side of the toolbar in the document to print!",
                // "Avis! Pour assurer une impression normale, il est recommandé d'utiliser le bouton [Imprimer] sur le côté gauche de la barre d'outils dans le document à imprimer !",
                // "Notiz! Um einen normalen Druck zu gewährleisten, wird empfohlen, die Schaltfläche [Drucken] auf der linken Seite der Symbolleiste im Dokument zum Drucken zu verwenden!",
                // "¡Aviso! Para garantizar una impresión normal, se recomienda utilizar el botón [Imprimir] en el lado izquierdo de la barra de herramientas del documento para imprimir.",
                // "Уведомление! Чтобы обеспечить нормальную печать, рекомендуется использовать кнопку [Печать] в левой части панели инструментов документа для печати!",
                // "知らせ！ 通常の印刷を行うために、ドキュメントのツールバーの左側にある[印刷]ボタンを使用して印刷することをお勧めします。",
                // "알아 채다! 정상적인 인쇄를 위해서는 인쇄할 문서의 툴바 왼쪽에 있는 [인쇄] 버튼을 이용하시는 것을 권장합니다!"
            ][V_lang_id]);
    };
    // 绑定打印后的触发事件
    window.onafterprint = function () {
        if (V_type === s_Mini)
            return;
        V_print_done();
    };

    // 监听页内锚点链接跳转
    // 注意：同一个锚点连续点击不会触发该事件
    $(window).on("hashchange", function(event) {
        let h = WINDOW_getHash(),
            anchor = h.s(1, h.length);
        if (anchor.x().length === 0)
            return;

        iNavCenter.history.add(h);

        // 锚点未显示的处理（如所在父元素被隐藏）
        let aObj = $("#" + JS_decodeURI(anchor) + ", a[name='" + anchor + "']");
        if (aObj !== gUndefined && aObj.o() !== gUndefined && aObj.o().top === 0) {
            let hiddenObj = aObj.closest(s_Blockquote);
            // 若属于被折叠的引用，则模拟点击展开，并重新定位到该引用
            if (hiddenObj.length > 0 && hiddenObj.isHidden()) {
                let fd = hiddenObj.prev().f("." + s_CssBlockquoteFolder);
                if (fd.length > 0) {
                    fd.tr(s_MouseUp);
                    WINDOW_setHref(h);
                }
            }
        }

        // 页内位置改变后，微调滚动条位置
        if (gLastHash == null || gLastHash !== h) {
            // 其中对于 Firefox 若不延时微调会存在微调无效的情况
            setTimeout(function () {
                V_ui_tuningScrollTop(JS_decodeURI(anchor));
            }, env.browser.Firefox ? 300 : 0);
        }
        gLastHash = h;

        // 若导航中心没有显示，则强制进行延时适配处理（如从封面直接到指定章节）
        if (iNavCenter.showed === gFalse)
            V_ui_adjustAllDelay();
    });

    iStopwatch.ed(s_4space);
}

/**
 * 初始化须在页面 body 显示后才能执行的部分
 */
function V_initRestyle() {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 重置任务列表样式
    sw.st();
    Restyler_forTaskList();
    sw.ed("    ├ TaskList: ");

    // ----------------------------------------
    // 重置脚本化图表样式，须在以上页面内容恢复显示后再处理
    sw.st();
    Restyler_forMermaid();
    sw.ed("    └ Mermaid: ");
}

// ========================================
// VLOOK UI
let V_ui_effect = 0, // 0: 无动效
    V_ui_processingAdjust= gFalse;

/**
 * 淡入显示
 * @param t 目标对象
 */
function V_ui_show(t) {
    if (t === gUndefined)
        return;

    t.c(s_Visibility, "visible")
        .c(s_Opacity, 1);
}

/**
 * 淡出隐藏
 * @param t 目标对象
 */
function V_ui_hide(t) {
    if (t === gUndefined)
        return;

    t.c(s_Visibility, s_Hidden)
        .c(s_Opacity, 0);
}

function V_ui_wrap_kbd(src) {
    return "<kbd>" + src + "</kbd>"
}
/**
 * 获得当前 OS 环境下的 Ctrl 键 UI 元素
 */
function V_ui_getCtrlKeyUI() {
    return V_ui_wrap_kbd("⌃ control / Ctrl");
}

/**
 * 获得当前 OS 环境下的 Shift 键 UI 元素
 */
function V_ui_getShiftKeyUI() {
    return V_ui_wrap_kbd("⇧ shift");
}

/**
 * 获得当前 OS 环境下的 Alt / Option 键 UI 元素
 */
function V_ui_getAltKeyUI() {
    return V_ui_wrap_kbd(env.os.macOS ? "⌥ option" : "Alt");
}

/**
 * 获得当前 OS 环境下的 Windows / Command 键 UI 元素
 */
function V_ui_getMetaKeyUI() {
    return V_ui_wrap_kbd(env.os.macOS ? "⌘ command" : "Win");
}

/**
 * 获得滚动条宽度
 */
function V_ui_scrollWidth() {
    let sc,
        d = document.createElement("DIV");
    d.style.cssText = "position: absolute; top: -9999px; width: 100px; height: 100px; overflow: hidden;";
    sc = document.body.appendChild(d).clientWidth;
    d.style.overflowY = "scroll";
    document.body.removeChild(d);
    return sc - d.clientWidth;
}

/**
 * 获得 VLOOK 与技术支持信息内容
 * @returns string VLOOK 与技术支持信息内容
 */
function V_ui_copyrightInfo() {
    return '<div class="v-copyright">'
        + '<svg class="v-copyright-svg-ico" width="24px" height="24px" style="display: inline-block; vertical-align: middle; cursor: pointer;"><use xlink:href="#icoVLOOK"></use></svg>' + tag_2space
        // + 'Document author: ' + V_util_getMetaByName("author") + '.' + tag_2space
        + 'Published with <a href="https://github.com/MadMaxChow/VLOOK" target="_blank"><strong>VLOOK</strong></a>™ (V15.1) &amp; <a href="https://www.typora.io" target="_blank"><strong>Typora</strong></a>.'
        + tag_2space + 'Support: <strong><a href="https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi">QQ Group</a></strong> / <strong><a href="mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + V_ver + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(gTrue)) + '">Email</a></strong>.'
        + '</div>'
}

/**
 * 判断是否为小屏
 */
function V_ui_isSmallScreen() {
    return $(window).w() <= 1280;
}

/**
 * 微调页内跳转后的滚动条位置
 * @param anchor 锚点名称，不含 #，如含 # 会自动过滤
 */
function V_ui_tuningScrollTop(anchor) {
    if (anchor !== gUndefined && anchor.sW("#"))
        anchor = anchor.s(1, anchor.length);
    if (anchor === gUndefined || anchor.x().length === 0)
        return;

    let t = JS_parseInt(iChapNav.ui.c(s_Top)),
        h = JS_parseInt(iChapNav.ui.c(s_Height)),
        y = 10,
        aObj = $("#" + JS_decodeURI(anchor) + ", a[name='" + anchor + "']"),
        tag = aObj.prop(s_TagName);

    if (tag !== gUndefined)
        tag = tag.l();

    // h1-6
    if (tag !== gUndefined && "h1h2h3h4h5h6".i(tag) > -1) {
        y += (tag === "h6")
            ? (t + h + 16)
            : (aObj.ht() + 10 + (JS_parseInt(tag.s(1, 2)) - 1) * 6);
        y -= JS_parseInt(V_util_getVarVal("--v-top-margin"));
    }
    // 从底部脚注列表回到脚注位置
    else if (anchor.sW("ref-footnote"))
        y += 70;
    // 其他情况
    else
        y += t + h;
    // 微调滚动位置
    $(document).scrollTop($(document).scrollTop() - y);
}

/**
 * 生成 SVG 图标
 * @param i 图标资源集标识
 * @param w 图标宽度
 * @param h 图标高度
 * @param c 内置图标样式 v-svg-ico-xxx 标识：light / dark / alpha / ...
 * @param s 扩展补充的 style 样式
 */
function V_ui_generateSvgIcon(i, w, h, c, s) {
    s = (s !== gUndefined) ? ' style="' + s + '"' : ""
    return '<svg width="' + w + 'px" height="' + h + 'px"' + s + ' class="v-svg-small-ico">'
        + '<use class="v-svg-ico-' + c + '" xlink:href="#' + i + '">'
        + '</use></svg>';
}

/**
 * 初始 UI 国际化
 */
function V_ui_initI18n() {
    if (ContentFolder_ui !== gUndefined) {
        ContentFolder_ui.f("div > span").a(s_Title, [
            "查看更多",
            // "查看更多",
            "View More",
            // "Voir Plus",
            // "Mehr sehen",
            // "Ver más",
            // "Посмотреть ещё",
            // "もっと見る",
            // "더보기"
        ][V_lang_id]);
    }

    iToolbar.btns[s_NavCenter].a(s_DataTips, [
        "<strong>隐藏</strong> / <strong>显示</strong> 导航中心",
        // "<strong>隱藏</strong> / <strong>顯示</strong> 導航中心",
        "<strong>Hide</strong> / <strong>Show</strong> Navigation Center",
        // "<strong>Cacher</strong> / <strong>Montrer</strong> Centre de navigation",
        // "<strong>Esconder</strong> / <strong>Show</strong> Navigationszentrum",
        // "<strong>Esconder</strong> / <strong>Show</strong> Centro de navegación",
        // "<strong>Скрывать</strong> / <strong>Показывать</strong> Центр навигации",
        // "<strong>隠れる</strong> / <strong>見せる</strong> ナビゲーションセンター",
        // "<strong>숨다</strong> / <strong>보여 주다</strong> 내비게이션 센터"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("O") + "</sub>");

    iToolbar.btns[s_ColorScheme].a(s_DataTips, [
        "切换 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
        // "切換 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
        "Switch <strong>Dark</strong> / <strong>Light</strong> Mode",
        // "Basculer en mode <strong>Sombre</strong> / <strong>Clair</strong>",
        // "Schalten Sie den  / <strong>Hell</strong> -Modus um",
        // "Cambiar el modo <strong>Oscuro</strong> / <strong>Claro</strong>",
        // "Переключить <strong>Темный</strong> / <strong>Светлый</strong> режим",
        // "<strong>ダーク</strong> / <strong>ライト</strong> モードの切り替え",
        // "<strong>다크</strong> / <strong>라이트</strong> 모드 전환"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("D") + "</sub>");

    iToolbar.btns[s_FontTheme].a(s_DataTips, [
        "切换 字体风格",
        // "切換 字體風格",
        "Switch Font Theme",
        // "Changer de style de police",
        // "Schriftart wechseln",
        // "Cambiar estilo de fuente",
        // "Переключить стиль шрифта",
        // "フォントスタイルの切り替え",
        // "글꼴 스타일 전환"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("A") + "</sub>");

    iToolbar.btns[s_ParagraphNav].a(s_DataTips, [
        "段落导航 模式",
        // "段落導航 模式",
        "Paragraph Navigation mode",
        // "Mode de navigation de paragraphe",
        // "Absatznavigationsmodus",
        // "Modo de navegación de párrafo",
        // "Режим навигации по абзацам",
        // "段落ナビゲーションモード",
        // "단락 탐색 모드"
    ][V_lang_id]);

    iToolbar.btns[s_Spotlight].a(s_DataTips, [
        "聚光灯",
        // "聚光燈",
        s_Spotlight,
        // "Projecteur",
        // "Scheinwerfer",
        // "Destacar",
        // "Прожектор",
        // "スポットライト",
        // "스포트라이트"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("S") + "</sub>");

    iToolbar.btns[s_LaserPointer].a(s_DataTips, [
        "激光笔",
        // "激光筆",
        "Laser Pointer",
        // "Pointeur Laser",
        // "Laserpointer",
        // "Puntero Láser",
        // "Лазерный Указатель",
        // "レーザーポインター",
        // "레이저 포인터"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("P") + "</sub>");

    iToolbar.btns[s_Print].a(s_DataTips, [
        "打印...",
        // "打印...",
        "Print...",
        // "Imprimer...",
        // "Drucken...",
        // "Impresión...",
        // "Печать...",
        // "印刷する...",
        // "인쇄..."
    ][V_lang_id]);

    iChapNav.prev.ui.a(s_DataTips, [
        "前一章",
        // "前一章",
        "Previous Chapter",
        // "Chapitre Précédent",
        // "Vorheriges Kapitel",
        // "Capítulo previo",
        // "Предыдущая глава",
        // "前の章",
        // "이전 장"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("◄") + "</sub>");

    iChapNav.next.ui.a(s_DataTips, [
        "后一章",
        // "後一章",
        "Next Chapter",
        // "Chapitre Suivant",
        // "Nächstes Kapitel",
        // "Siguiente capítulo",
        // "Следующая глава",
        // "次の章",
        // "다음 장"
    ][V_lang_id] + "\n<sub>" + V_ui_wrap_kbd("►") + "</sub>");

    iChapNav.dt.a(s_DataTips, [
        "回到封面",
        // "回到封面",
        "Back to cover",
        // "Retour à la couverture",
        // "Zurück zur Titelseite",
        // "Volver a la portada",
        // "Вернуться к обложке",
        // "表紙に戻る",
        // "표지로 돌아 가기"
    ][V_lang_id]);

    iChapNav.current.ui.a(s_DataTips, [
        "回到本章的开始",
        // "回到本章的開始",
        "Go back to the beginning of this chapter",
        // "Retourner au début de ce chapitre",
        // "Gehen Sie zurück zum Anfang dieses Kapitels",
        // "Regrese al comienzo de este capítulo",
        // "Вернитесь к началу этой главы",
        // "この章の始めに戻る",
        // "이 장의 시작 부분으로 돌아 가기"
    ][V_lang_id]);

    iFigNav.btns.prev.a(s_Title, "[ ← ] " + [
        "前一张",
        // "前一張",
        "Previous",
        // "Précédent",
        // "Previo",
        // "Próximo",
        // "Предыдущая фотографияs",
        // "前へ",
        // "이전"
    ][V_lang_id]);

    iFigNav.btns.next.a(s_Title, "[ → ] " + [
        "后一张",
        // "後一張",
        "Next",
        // "Le suivant",
        // "Nächster",
        // "Próximo",
        // "Следующий",
        // "次の",
        // "다음"
    ][V_lang_id]);

    iFigNav.btns.close.a(s_Title, "[ ESC ] " + [
        "关闭",
        // "關閉",
        "Close",
        // "Fermer",
        // "Schließen",
        // "Cerrar",
        // "близко",
        // "閉じる",
        // "닫기"
    ][V_lang_id]);

    iFontTheme.ui.f(".v-font-package").t([
        "字体",
        // "字體包",
        "Font",
        // "Package de polices",
        // "Schriftpaket",
        // "Paquete de fuentes",
        // "Пакет шрифтов",
        // "フォントパッケージ",
        // "글꼴 패키지"
    ][V_lang_id] + " ");

    iFontTheme.ui.f(".v-font-theme-info").h([
        "若无法连接互联网加载在线版本字体，建议将字体直接下载到本地",
        // "若無法連接互聯網加載在線版本字體，建議將字體直接下載到本地",
        "If you cannot connect to the Internet to load the online version of the font, it is recommended to download the font directly to the local",
        // "Si vous ne pouvez pas vous connecter à Internet pour charger la version en ligne de la police, il est recommandé de télécharger la police directement sur le",
        // "Wenn Sie keine Verbindung zum Internet herstellen können, um die Online-Version der Schriftart zu laden, wird empfohlen, die Schriftart direkt auf die lokale Version herunterzuladen",
        // "Si no puede conectarse a Internet para cargar la versión en línea de la fuente, se recomienda descargar la fuente directamente al local.",
        // "Если вы не можете подключиться к Интернету для загрузки онлайн-версии шрифта, рекомендуется загрузить шрифт непосредственно на локальный компьютер.",
        // "インターネットに接続してオンラインバージョンのフォントを読み込めない場合は、フォントをローカルに直接ダウンロードすることをお勧めします。",
        // "온라인 버전의 글꼴을로드하기 위해 인터넷에 연결할 수없는 경우 글꼴을 로컬로 직접 다운로드하는 것이 좋습니다."
    ][V_lang_id] + " (<a href='https://github.com/MadMaxChow/VLOOK/blob/master/FONT.md'>" + [
        "主站",
        // "主站",
        "Primary",
        // "Primaire",
        // "Primär",
        // "Primario",
        // "Первичный",
        // "主要",
        // "위성을 가진 행성"
    ][V_lang_id] + "</a> | <a href='https://gitee.com/madmaxchow/VLOOK/blob/master/FONT.md'>" + [
        "备用",
        // "備用",
        "Standby",
        // "Veille",
        // "Standby",
        // "En espera",
        // "Резервный",
        // "スタンバイ",
        // "대기"
    ][V_lang_id] + "</a>)");

    iFootNote.buttonSeeAll.ch("a").t([
        "查看所有脚注",
        // "查看所有腳註",
        "View all footnotes",
        // "Afficher toutes les notes de bas de page",
        // "Alle Fußnoten anzeigen",
        // "Ver todas las notas al pie",
        // "Просмотреть все сноски",
        // "すべての脚注を見る",
        // "모든 각주보기"
    ][V_lang_id] + " ▶");

    ZoomView_ui.t("⊖ " + [
        "缩放",
        // "縮放",
        "Zoom",
        // "Zoom",
        // "Zoomen",
        // "Zoom",
        // "Увеличить",
        // "ズーム",
        // "줌"
    ][V_lang_id] + " ⊕");
}

/**
 * 移动到中间
 * @param s 源对象
 */
function V_ui_moveToCenter(s) {
    let l = ($(window).w() - s.w()) / 2,
        r = s_Auto;
    if (env.device.mobile) { // 移动端
        l = 10;
        r = 10;
    }

    s.c(s_Left, l)
        .c(s_Right, r)
        .c(s_Top, ($(window).ht() - s.ht()) / 2);
}

/**
 * 移动到中间
 * @param s 源对象
 * @param t 目标对象
 */
function V_ui_moveToTarget(s, t) {
    let l = t.o().left,
        w = s.w() + JS_parseInt(s.c(s_PaddingLeft))
            + JS_parseInt(s.c(s_PaddingRight))
            + JS_parseInt(s.c(s_BorderWidth)) * 2;

    if (l + w + 10 > $(window).w())
        l = $(window).w() - w - 10;

    s.c(s_Left, l)
        .c(s_Top, t.o().top - $(document).scrollTop() + t.ht() + 10);
}

/**
 * 进行文档导航相关的 UI 元素的适配处理
 */
function V_ui_adjustAll() {
    if (V_ui_processingAdjust === gTrue)
        return;

    V_ui_processingAdjust = gTrue;

    if (iNavCenter.adjust() === gTrue)
        ContentFolder_adjust();
    iChapNav.adjust();
    iToolbar.adjust();

    V_ui_processingAdjust = gFalse;
}

/**
 * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
 */
function V_ui_adjustAllDelay() {
    // LOG("Adjust all delay ...");
    setTimeout(function () {
        V_ui_adjustAll();
        ExtQuote_uniteColumnsHeight();
    }, 500);
}

/**
 * 根据设备类型自适应hover样式
 */
function V_ui_adjustHoverStyle() {
    // 移动设备时解绑样式事件
    if (env.device.mobile) {
        $(s_CssBtn_BtnGroup).uH();
        $("." + s_CssSegmentBtn).uH();
        $("." + s_CssAccentBtn).uH();
        ZoomView_ui.uH();
        $(".v-doc-lib-board>.item").uH();
        $(".v-std-code, .v-tag, .v-badge-name").uH();
        $("." + s_CssBadgeValue).uH();
    }
    // 非移动设备时绑定样式事件
    else {
        // 所有常规按钮 hover 事件处理
        V_ui_bindHover($(s_CssBtn_BtnGroup));
        // 所有导航中心分段控制按钮 hover 事件处理
        V_ui_bindHover($("." + s_CssSegmentBtn));
        // 所有辅助按钮 hover 事件处理
        V_ui_bindHover($("." + s_CssAccentBtn));
        // 状态栏上缩放文档按钮
        V_ui_bindHover(ZoomView_ui);
        // 文库按钮 hover 事件处理
        V_ui_bindHover($(".v-doc-lib-board>.item"));
        // 代码、标签类 hover 事件处理
        V_ui_bindHover($(".v-std-code, .v-tag, .v-badge-name"));
        V_ui_bindHover($("." + s_CssBadgeValue), gTrue);
    }
}

/**
 * 为对象绑定 hover 事件
 * @param target 目标对象
 * @param cancleParent 是否临时模拟取消父元素的 hover 处理（即 mouseenter）
 */
function V_ui_bindHover(target, cancleParent) {
    target.hover(function () {
        let _t = $(this);
        JQ_addClass(_t, s_Hover);
        if (cancleParent === gTrue)
            JQ_removeClass(_t.p(), s_Hover);
    }, function () {
        let _t = $(this);
        JQ_removeClass(_t, s_Hover);
        if (cancleParent === gTrue)
            _t.p().tr("mouseenter");
    });
}

/**
 * 为对象取消 hover 事件绑定
 * @param t 目标对象
 */
function V_ui_unbindHover(t) {
    t.unbind("mouseenter").unbind("mouseleave");
}

/**
 * 初始化动效处理
 */
function V_ui_initEffectLevel() {
    // 不启用动效
    if (V_ui_effect < 1)
        V_util_setVarVal("--v-trans-value", s_None);
    // 动效等级为 2 或更高级时才开启毛玻璃动效（如遮罩、插图浏览器背景）
    else if (V_ui_effect >= 2)
        JQ_addClass($(".v-backdrop-blurs"), s_Enabled);
    // 以下动效等级为 1 或更高级时才开启
    // V_ui_addAnimate($(".v-btn, .v-btn-group, .v-doc-lib-board, .v-doc-lib-board.flip"));
    V_ui_addAnimate($(".v-doc-lib-board>.flip"));
    V_ui_addAnimate($("a kbd, a img"));
}

/**
 * 为指定对象添加过渡动画
 * @param t 目标对象
 * @param css 应用的属性，不指定时默认为 “all”
 */
function V_ui_addAnimate(t, css) {
    if (V_ui_effect >= 1) {
        if  (css === gUndefined)
            JQ_addClass(t, s_CssTransitionAll);
        else {
            let attrSet = css.split(" ");
            for (let i = 0; i < attrSet.length; i++)
                JQ_addClass(t, "v-transition-" + attrSet[i]);
        }
    }
}

/**
 * 为指定对象移除过渡动画
 * @param t 目标对象
 * @param css 应用的属性，不指定时默认为 “all”
 */
function V_ui_removeAnimate(t, css) {
    if  (css === gUndefined)
        JQ_removeClass(t, s_CssTransitionAll);
    else {
        let attrSet = css.split(" ");
        for (let i = 0; i < attrSet.length; i++)
            JQ_removeClass(t, "v-transition-" + attrSet[i]);
    }
}

/**
 * 检查目标对象是否有指定的任意过渡动画
 * @param t 目标对象
 * @returns boolean true：有，false：无
 */
function V_ui_existAnimate(t) {
    return t.a(s_Class).i("v-transition-") > -1;
}

/**
 * 初始化热键
 */
function V_ui_initHotkey() {
    // 键盘按下事件
    $(document).keydown(function (event) {
        const c = event.keyCode || event.which || event.charCode;
        let cK = (event.ctrlKey ? "⌃ Ctrl _ " : "")
            + (event.shiftKey ? "⇧ Shift _ " : "")
            + (event.altKey ? "⌥ Alt / Option_ " : "")
            + (event.metaKey ? "Windows / ⌘ Command _ " : "");

        // 按下 alt / option 键
        if (V_util_holdKey_Alt() === true) {
            gHoldKeyAlt = gTrue;
            // 切换复制光标、内容助手的复制图标
            V_util_setVarVal("--cur-copy", V_util_getVarVal("--cur-copy-as-md"));
            ContentAssistor_btns_copyContent.h(V_ui_generateSvgIcon("icoCopyAsMd", 16, 16, s_Light));
        }

        // 按了组合键时忽略（除 Shift）
        if (event.ctrlKey || event.altKey || event.metaKey)
            return;

        // 焦点不在文档内容上时的子模块热键操作处理
        // 第一梯队，避免同时触发（如 ESC 导致同时退出多个）
        iSpotlight.disposeHotkey(c, cK);
        iLaserPointer.disposeHotkey(c, cK);
        iParagraphNav.disposeHotkey(c, cK);
        // 第二梯队
        WelcomePage_disposeHotkey(c, cK);
        iFigNav.disposeHotkey(c, cK);
        iNavCenter.disposeHotkey(c, cK);
        iFontTheme.disposeHotkey(c, cK);
        iInfoTips.disposeHotkey(c, cK);
        iFootNote.disposeHotkey(c, cK);
        LinkTool_disposeHotkey(c, cK);

        // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
        if (V_doc_block === gTrue || document.activeElement.tagName.l() !== "body")
            return;

        // 逐章导航热键操作处理
        iChapNav.disposeHotkey(c, cK);

        switch (c) {
            case 79: // O
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iFigNav.ui.isShowed())
                    return;
                iToolbar.btns[s_NavCenter].tr(s_Click);
                break;
            case 76: // L
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iNavCenter.docLib.enabled === gTrue)
                    iNavCenter.docLib.handle.tr(s_Click);
                break;
            case 68: // D
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iToolbar.btns[s_ColorScheme].tr(s_Click);
                break;
            case 65: // A
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iFontTheme.ui.isHidden())
                    iToolbar.btns[s_FontTheme].tr(s_Click);
                else
                    iFontTheme.hide();
                break;
            case 88: // X
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                TableCross_toggle();
                break;
            case 80: // P
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iParagraphNav.hide();
                iSpotlight.hide();
                iLaserPointer.tg();
                break;
            case 83: // S
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iParagraphNav.hide();
                iLaserPointer.hide();
                iSpotlight.tg();
                break;
            case 27: // ESC
                V_report_push([s_Hotkey, cK, 'ESC', 0]);
                if (V_doc_block === gFalse) {
                    ToolTips_hide();
                    LinkTool_hide();
                }

                // 表格为阅读模式时，则退出
                if (!TableCross_ui.isHidden())
                    TableCross_disable();

                // 拦截该按键事件，避免退出全屏（如：Safari）
                window.event.returnValue = gFalse;
                break;
        }
    });

    $(document).keyup(function (event) {
        // 松开 alt / option 键
        if (gHoldKeyAlt === true) {
            gHoldKeyAlt = gFalse;
            // 恢复复制光标、内容助手的复制图标
            V_util_setVarVal("--cur-copy", V_util_getVarVal("--cur-copy-normal"));
            ContentAssistor_btns_copyContent.h(V_ui_generateSvgIcon("icoCopy", 16, 16, s_Light));
        }
    });
}
// V.ui
// ========================================

// ========================================
// VLOOK 语言类
let V_lang_id = 1;

/**
 * 初始化语言
 */
function V_lang_init() {
    switch (env.language.base) {
        case "zh":
            // V_lang_id = 1; // 中（繁）
            // if (env.language.subset.l() === "cn" || env.language.subset.l() === "chs")
                V_lang_id = 0; // 中（简）
            break;
        // case "en":
        //     V_lang_id = 2; // 英语
        //     break;
        // case "fr":
        //     V_lang_id = 3; // 法语
        //     break;
        // case "de":
        //     V_lang_id = 4; // 德语
        //     break;
        // case "es":
        //     V_lang_id = 5; // 西班牙语
        //     break;
        // case "ru":
        //     V_lang_id = 6; // 俄语
        //     break;
        // case "ja":
        //     V_lang_id = 7; // 日语
        //     break;
        // case "ko":
        //     V_lang_id = 8; // 韩语
        //     break;
        default:
            V_lang_id = 1; // 默认：英语
    }
}
// V.lang
// ========================================

// 动画类
// V.animate = {
//     speed : 300, // 动画速度，值越小越快
//     tension : 200, // 动画张力参数
//     friction : 20 // 动画摩擦力参数
// }

// ========================================
// 文档类
let V_doc_block = gFalse; // 当前文档是否被模态窗口阻塞

// 滚动信息
let V_doc_scroll_lastUpdate = 0, // 最后一次根据滚动变动更新 UI 的时间
    V_doc_scroll_lastTop = 0; // 最后一次记录的滚动位置
/**
 * 更新页面滚动信息
 *
 * @param u 最后更新滚动信息的时间时间
 * @param t 最后更新的滚动位置
 */
function V_doc_scroll_update(u, t) {
    V_doc_scroll_lastUpdate = u;
    V_doc_scroll_lastTop = t;
}

/**
 * 冻结文档滚动
 */
function V_doc_scroll_freeze() {
    JQ_exchangeClass(DOM_body(), s_Unfreeze, s_Freeze);
}

/**
 * 解冻文档滚动
 */
function V_doc_scroll_unfreeze() {
    JQ_exchangeClass(DOM_body(), s_Freeze, s_Unfreeze);
}

// 内容计数器
let V_doc_counter_fig = 0, // 插图总数
    V_doc_counter_table = 0, // 表格总数
    V_doc_counter_codeblock = 0, // 代码块总数
    V_doc_counter_audio = 0, // 非 mini 模式音频总数
    V_doc_counter_audiomini = 0, // mini 模式音频总数
    V_doc_counter_video = 0; // 视频总数

/**
 * 初始化外部链接（如：http://、https://、ftp://、站内链接等），为其添加 target 参数
 */
function V_doc_link_adjustExternal() {
    $("a:not([href^='#'])").e(function () {
        let a = $(this);
        a.a(s_Target, a.a(s_Href));
    });
}
// ========================================

// ========================================
// 打印类
// 打印模式。none：指由直接使用浏览器自带的打印，vlook：指先通过 vlook 进行预处理
let V_print_mode = s_None;

/**
 * 打印文档前处理
 */
function V_print_ready() {
    V_report_push([s_Style, 'Print', '', 0]);
    V_print_mode = "VLOOK";

    // 若当前为 Dark Mode 则强制临时切换为 Light 模式
    if (ColorScheme.scheme === s_Dark) {
        ColorScheme.schemeBeforePrint = ColorScheme.scheme;
        ColorScheme.scheme = s_Light;
        ColorScheme.refresh();
    }

    // 将 Mermaid 图表题注 width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    $("." + s_CssCaption__Mermaid).e(function () {
        let _t = $(this);
        _t.a(s_BeforePrintWidth, _t.c(s_Width));
        _t.c(s_Width, "100%");
    });

    // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    $("." + s_CssCaption__Mermaid + " svg").e(function () {
        let _t = $(this);
        if (_t.a(s_Width) === "100%") {
            // 针对流程图
            if (_t.a(s_Style).i(s_MaxWidth + ":") > -1) {
                _t.a(s_BeforePrintMaxWidth, _t.c(s_MaxWidth));
                _t.c(s_MaxWidth, "");
            }
            // 针对状态机图
            else if (_t.a(s_Style).i(s_Width + ":") > -1) {
                _t.a(s_BeforePrintWidth, _t.c(s_Width));
                _t.c(s_Width, "100%");
            }
        } else { // 针对顺序图
            _t.a(s_BeforePrintWidth, _t.a(s_Width));
            _t.c(s_Width, "100%");
        }
    });

    // 展开折叠的引用块
    $("[" + s_DataBlockquoteFolded + "='true']").e(function () {
        ExtQuote_unfold($(this));
    });

    // 展开所有折叠的长内容
    $("[" + s_DataContentFolded + "='true']").e(function () {
        $(this).next("." + s_CssContentExpander).ch(".v-btn").tr(s_Click);
    });

    // 展开所有折叠的表格行
    $(".v-tbl-row-g-btn").e(function () {
        RowGroup_open($(this).p().p());
    });

    // 隐藏画中画
    PicInPic_hide();

    // 若存在「刮刮卡」内容，则先让用户确认是否显示
    let rainbowCoats = $("." + s_CssRbCoat);
    if (rainbowCoats.length > 0) {
        if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？") === gTrue) {
            rainbowCoats.e(function () {
                let _t = $(this);
                if (_t.a(s_DataRbCoatShowed).sW("f"))
                    RainbowCoat_show(_t);
            });
        }
    }

    // 调用浏览器的打印功能
    // 延后是为以上相关的异步和界面完成刷新
    setTimeout(function () {
        window.print();
    }, 2000);
}

/**
 * 打印文档后处理
 */
function V_print_done () {
    // 若打印前为 Dark Mode 则先恢复为 Dark Mode
    if (ColorScheme.schemeBeforePrint === s_Dark) {
        ColorScheme.tg();
    }

    // 恢复打印前的配置，详见 V_print_ready()
    $("." + s_CssCaption__Mermaid).e(function () {
        let _t = $(this);
        _t.c(s_Width, _t.a(s_BeforePrintWidth));
        _t.removeAttr(s_BeforePrintWidth);
    });

    //恢复打印前的配置，详见 V_print_ready()
    $("." + s_CssCaption__Mermaid + " svg").e(function () {
        let _t = $(this);
        if (_t.a(s_Width) === "100%") {
            // 针对流程图
            if (_t.a(s_Style).i(s_MaxWidth + ":") > -1) {
                _t.c(s_MaxWidth, _t.a(s_BeforePrintMaxWidth));
                _t.removeAttr(s_BeforePrintMaxWidth);
            }
            // 针对状态机图
            else if (_t.a(s_Style).i(s_Width + ":") > -1) {
                _t.c(s_Width, _t.a(s_BeforePrintWidth));
                _t.removeAttr(s_BeforePrintWidth);
            }
        } else { // 针对顺序图
            _t.c(s_Width, _t.a(s_BeforePrintWidth));
            _t.removeAttr(s_BeforePrintWidth);
        }
    });

    // 隐藏所有刮刮卡
    $("." + s_CssRbCoat).e(function () {
        let _t = $(this);
        if (_t.a(s_DataRbCoatShowed).sW("t"))
            RainbowCoat_hide(_t);
    });

    V_print_mode = s_None;
}
// ========================================

// ========================================
// VLOOK 埋点数据统计
// 上报事件的累计次数，用于标识不同的上报事件 iframe 的 id
let V_report_count =  0;

/**
 * 提交统计数据
 */
function V_report_submit(loadTimeCost) {
    // VLOOK 基本信息
    let sd = "?p=vlook"
        + "&ver=" + V_ver
        + "&thm=" + V_util_getVarVal("--v-theme-name").rA("\"", "").x();

    sd += "&d=" + (env.device.mobile ? "mob" : "") // 设备类型
        + "&dpr=" + env.display.DPR; // DPR

    // OS 信息
    sd += "&os=";
    if (env.os.macOS)
        sd += "macOS";
    else if (env.os.Windows)
        sd += "Windows";
    else if (env.os.iOS)
        sd += "iPhone";
    else if (env.os.Linux)
        sd += "iPhone";
    else
        sd += "others";

    // 浏览器及版本
    sd += "&b=";
    if (env.browser.Edge)
        sd += "edge&bv=" + env.browserVer.Edge;
    else if (env.browser.Chrome)
        sd += "chrome&bv=" + env.browserVer.Chrome;
    else if (env.browser.Firefox)
        sd += "firefox&bv=" + env.browserVer.Firefox;
    else if (env.browser.Safari)
        sd += "safari&bv=" + env.browserVer.Safari;
    else
        sd += "others&bv=";

    // 浏览器的颜色方案
    sd += "&cs=" + V_util_getVarVal("--v-color-scheme").rA("\"", "").x();

    sd += "&lang=" + V_lang_id // 浏览器语言
        + "&size=" + VOM_doc().t().length // 文档大小
        + "&time=" + loadTimeCost; // 加载文档时间

    // 图片插图数据
    sd += "&img=" + $("." + s_CssFig).length
        + "&img-fold=" + $("p[" + s_DataContainer + "='img'][" + s_DataContentFolded + "='true']").length
        + "&img-fill=" + $("img:not([" + s_DataImgFill + "])").length
        + "&img-invert=" + $("img[" + s_DataDarkSrc + "='invert']").length
        + "&img-alter=" + $("img[" + s_DataDarkSrc + "='alter']").length
        + "&img-cap1=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='img'] .v-cap-1 strong").length
        + "&img-cap2=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='img'] .v-cap-2").length;

    // Mermaid 插图数据
    let mermaid = $(".md-diagram-panel");
    sd += "&mm=" + mermaid.length
        + "&mm-fold=" + $("div[" + s_DataContainer + "='svg'][" + s_DataContentFolded + "='true']").length
        + "&mm-cap1=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='svg'] .v-cap-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='svg'] .v-cap-2").length;

    // Mermaid 音频数据
    sd += "&audio=" + $(s_Audio).length
        + "&mm-cap1=" + $("div[id^=vk-id-audio] .v-cap-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-audio] .v-cap-2").length;

    // Mermaid 视频数据
    sd += "&video=" + $(s_Video).length
        + "&mm-cap1=" + $("div[id^=vk-id-video] .v-cap-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-video] .v-cap-2").length;

    // Mermaid 图的细类
    let pie = 0,
        flow = 0,
        flowSTART = 0,
        flowINIT = 0,
        state = 0,
        seq = 0,
        classD = 0,
        gantt = 0;
    mermaid.e(function () {
        let _t = $(this);
        if (_t.f("g.legend").length > 0)
            pie++; // 饼图
        else if (_t.f("g.output g.nodes").length > 0) {
            flow++; // 流程图
            if (_t.f("g.output g.nodes g#START.node").length > 0)
                flowSTART++; // VLOOK 标准的流程图
            else if (_t.f("g.output g.nodes g#INIT.node").length > 0)
                flowINIT++; // VLOOK 标准的状态机图
        }
        else if (_t.f("g.stateGroup").length > 0)
            state++; // 状态机图（原生）
        else if (_t.f("g rect.actor").length > 0)
            seq++; // 顺序图
        else if (_t.f("g.classGroup").length > 0)
            classD++; // 类图
        else if (_t.f("g rect.section").length > 0)
            gantt++; // 甘特图
    });
    sd += "&mm-pie=" + pie
        + "&mm-flow=" + flow
        + "&mm-flow-S=" + flowSTART
        + "&mm-flow-I=" + flowINIT
        + "&mm-state=" + state
        + "&mm-seq=" + seq
        + "&mm-class=" + classD
        + "&mm-gantt=" + gantt;

    // 表格数据
    sd += "&tbl=" + $(s_Table).length
        + "&tbl-fold=" + $("figure[" + s_DataContainer + "='" + s_Table + "'][" + s_DataContentFolded + "='true']").length
        + "&tbl-cap1=" + $("div[id^=vk-id-tbl] .v-cap-1 strong").length
        + "&tbl-cap2=" + $("div[id^=vk-id-tbl] .v-cap-2").length;

    // 表格列格式数据
    let fmBold = 0,
        fmEm = 0,
        fmUnderline = 0,
        fmMark = 0,
        fmDel = 0,
        fmChk = 0,
        fmNum = 0;
    $(s_Table + "[" + s_DataColumnFmting + "='true']").e(function () {
        let _t = $(this);
        if (_t.f("thead .v-tbl-col-fmt-bold").length > 0)
            fmBold++;
        if (_t.f("thead .v-tbl-col-fmt-em").length > 0)
            fmEm++;
        if (_t.f("thead u").length > 0)
            fmUnderline++;
        if (_t.f("thead .v-tbl-col-fmt-mark").length > 0)
            fmMark++;
        if (_t.f("thead del").length > 0)
            fmDel++;
        if (_t.f("thead .v-tbl-col-fmt-checkbox").length > 0)
            fmChk++;
        if (_t.f("thead .v-tbl-col-fmt-num").length > 0)
            fmNum++;
    });
    sd += "&tbl-fm-b=" + fmBold
        + "&tbl-fm-em=" + fmEm
        + "&tbl-fm-u=" + fmUnderline
        + "&tbl-fm-m=" + fmMark
        + "&tbl-fm-d=" + fmDel
        + "&tbl-fm-chk=" + fmChk
        + "&tbl-fm-num=" + fmNum;

    // 带单元格合并的表格数
    sd += "&tbl-cell-merge=" + $(s_Table + "[" + s_DataCellMerge + "='true']").length;

    // 带行折叠的表格数
    sd += "&tbl-row-group=" + $(s_Table + "[" + s_DataRowGroup + "='true']").length;

    // 代码块数据
    sd += "&cb=" + $("." + s_CssFences).length
        + "&cb-fold=" + $("p[" + s_DataContainer + "='pre'][" + s_DataContentFolded + "='true']").length
        + "&cb-cap1=" + $("div[id^=vk-id-codeblock] .v-cap-1 strong").length
        + "&cb-cap2=" + $("div[id^=vk-id-codeblock] .v-cap-2").length;

    // 标签数据
    sd += "&tag=" + $("code[class^=v-tag]").length
        + "&badge=" + $("code[class^=v-badge-name]").length;

    // 引用数据
    sd += "&bq=" + $(s_Blockquote).length
        + "&bq-fold=" + $("[" + s_DataBlockquoteFolded + "='true']").length;

    // 脚注数据
    sd += "&fn=" + $(".md-footnote").length;

    // 当前文档的 URL
    sd += "&url=" + WINDOW_getHref();

    // 提交统计数据
    let vlookStat = $("iframe[name='vlook-stat-gitee']");
    vlookStat.a(s_Src,
        "https://madmaxchow.gitee.io/vlook/act/" + (V_debugMode ? "dev-" : "") + "stat-gitee.html"
        + encodeURI(sd));
    // DEBUG("Stat. in Gitee:\n" + vlookStat.a(s_Src));
}

/**
 * 上报事件统计数据（基于百度统计）
 * 为兼容在本地打开的 HTML 文件，所以通过 iframe 的方式进行数据上报
 * @param d 数据数组，与百度统计的 _hmt.push(["_trackEvent", data[0], data[1], data[2], data[3]) 的参数保持一致
 */
function V_report_push(d) {
    return false; // 暂停事件数据上报，因百度统计免费版已下线了事件服务
    // ---
    $("body").append('<iframe name="vk-event-' + V_report_count + '" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"'
        + ' src="https://madmaxchow.gitee.io/vlook/act/'
        + (V_debugMode ? "dev-" : "")
        + 'event-gitee.html'
        + "?category=" + (V_debugMode ? "dev-" : "") + d[0]
        + "&action=" + d[1]
        + "&label=" + d[2]
        + "&value=" + d[3]
        + "&debug=" + V_debugMode
        + '"></iframe>');

    // 默认在指定时间后回收 iframe 资源
    setTimeout(V_report_recycleResources, 10000);
    V_report_count++;
}

/**
 * 转换标签名为 VLOOK 中的特定内容类型名称
 */
function V_report_transTagName(t) {
    if (t.sW("i"))
        return s_Fig + s_SuffixImg;
    else if (t.sW("s"))
        return s_Fig + s_SuffixSvg;
    else if (t.sW("t"))
        return s_Table;
    else if (t.sW("p"))
        return s_Codeblock;
    return "Unknown";
}

/**
 * 移除上报事件的资源
 */
function V_report_recycleResources() {
    $("iframe[name^=vk-event-]").e(function () {
        $(this).remove();
        return gFalse; // 执行一次即跳出，即每次只删除当前最早创建的
    });
}
// V.report
// ========================================

// ==================== 随机颜色类 ==================== //

let RandomColor_palette = []; // 不相似颜色的色板

/**
 * 生成随机颜色
 * @returns string R/G/B 颜色分量是数组
 */
function RandomColor_generate() {
    let c = [0, 0, 0];
    c[0] = Math.floor(Math.random() * 255);
    c[1] = Math.floor(Math.random() * 255);
    c[2] = Math.floor(Math.random() * 255);
    return c;
}

/**
 * 生成不相似的随机颜色
 * @returns string R/G/B 颜色分量是数组
 */
function RandomColor_dissimilarRgb() {
    // 色板为空时，生成随机颜色后直接返回
    let c = [0, 0, 0];
    if (RandomColor_palette.length === 0) {
        c = RandomColor_generate();
        RandomColor_palette.push(c);
        return c;
    }

    // 色板不为空时，避免相似的颜色
    let f = gFalse,
        t = 0,
        d = [0, 0, 0];

    // 随机生成不相似的颜色（最多尝试次数上限为 20）
    while (f === gFalse && t < 20) {
        c = RandomColor_generate();
        // 判断新生成的随机颜色，色板中是否已有相似的
        let idx = 0;
        for (let i = 0; i < RandomColor_palette.length; i++) {
            idx = i;
            d[0] = (RandomColor_palette[i][0] - c[0]) / 256;
            d[1] = (RandomColor_palette[i][1] - c[1]) / 256;
            d[2] = (RandomColor_palette[i][2] - c[2]) / 256;
            // 比例两个颜色的 RGB 色差来作为相似性的依据（0.3 为经验值，值越大差异最大）
            if (Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) < 0.3)
                break;
        }

        // 色板中没有找到相似的颜色
        if (idx === RandomColor_palette.length) {
            RandomColor_palette.push(c);
            f = gTrue;
        }
        t++;
    }
    return c;
}

/**
 * 格式化颜色为 rgba 格式
 * @param rgb RGB 颜色分量数组
 * @param opacity 透明度，0:透明，1:不透明
 */
function RandomColor_format(rgb, opacity) {
    return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + opacity + ")";
}

// ==================== 处理耗时计时器类 ==================== //

/**
 * 构造函数
 */
function Stopwatch() {
    let T = this;
    T.sT = null; // 重置后的初始时间
    T.lT = null; // 每次中间计时的初始时间

    /**
     * 重置计时器
     */
    T.reset = function () {
        T.sT = new Date().getTime();
    }

    /**
     * 一次中间计时开始
     */
    T.st = function (t) {
        if (t !== gUndefined)
            LOG(t);
        T.lT = new Date().getTime();
    }

    /**
     * 一次中间计时结束
     * @param pre 输出内容前缀
     * @param s 是否为静默模式，true：是
     */
    T.ed = function (pre, s) {
        let c = new Date().getTime() - T.lT;
        // 非静默模式时，输出计时结果
        if (s !== gTrue) {
            let msg = pre + "⏱ " + c + " ms";
            if (c < 300)
                INFO(msg);
            else if (c < 500)
                WARN(msg);
            else
                ERROR(msg);
        }
        return c;
    }

    /**
     * 计时器结束
     */
    T.stop = function () {
        return new Date().getTime() - T.sT;
    }

    // 初始化计时器
    T.reset();
}

// ==================== 欢迎页 ==================== //

let WelcomePage_uiName = ".v-welcome-page",
    WelcomePage_ui = gUndefined, // 欢迎页主界面
    WelcomePage_button = gUndefined, // 关闭欢迎页按钮
    WelcomePage_tips = gUndefined, // 欢迎信息
    WelcomePage_finished = gFalse, // 是否已加载
    WelcomePage_mode = "auto"; // 模式
/**
 * 构造函数
 * @param mode 欢迎页显示模式
 */
function WelcomePage_init(mode) {
    WelcomePage_ui = $(WelcomePage_uiName); // 欢迎页主界面
    WelcomePage_button = $(WelcomePage_uiName + ">.v-loading"); // 关闭欢迎页按钮
    WelcomePage_tips = $(WelcomePage_uiName + ">.v-tips"); // 欢迎信息
    WelcomePage_finished = gFalse; // 是否已加载
    WelcomePage_mode = mode; // 模式

    // 初始执行
    if (WelcomePage_mode === s_None)
        WelcomePage_close();
    else
        V_ui_show(WelcomePage_ui);
}
/**
 * 完成所有内容加载后调用
 */
function WelcomePage_done() {
    // 关闭欢迎页事件
    WelcomePage_button.uC().ck(function () {
        WelcomePage_close();
    });

    WelcomePage_ui.c(s_Cursor, "default");
    WelcomePage_stopAni();

    WelcomePage_tips.c(s_Animation, s_None);

    WelcomePage_updateCloseButton(null);
    JQ_addClass(WelcomePage_button, "v-btn-done");

    WelcomePage_finished = gTrue;

    // auto 模式时延时自动关闭
    if (WelcomePage_mode === s_Auto)
        WelcomePage_autoClose();
    // wait 模式
    else if (WelcomePage_mode === s_Wait)
        JQ_addClass(WelcomePage_button, s_Wait);
}

/**
 * 自动延时关闭
 */
function WelcomePage_autoClose() {
    let delaySecs = 3,
        closeTimer = null;

    __timeToClose();
    function __timeToClose() {
        WelcomePage_updateCloseButton(delaySecs);
        delaySecs--;
        if (delaySecs < 0) { // 倒计时结束
            clearTimeout(closeTimer);
            WelcomePage_close();
        }
        else
            closeTimer = setTimeout(__timeToClose, 1000);
    }
}

/**
 * 更新关闭按钮
 * @param sec 显示倒计时的秒数
 */
function WelcomePage_updateCloseButton(sec) {
    WelcomePage_button.h([
        "开始阅览",
        // "開始閱覽",
        "Start Reading",
        // "Commence À Lire",
        // "Lesen Starten",
        // "Haga Clic Para Comenzar",
        // "Начать Чтение",
        // "読み始める",
        // "읽 기 시작 하 다"
    ][V_lang_id]
        + (sec == null ? "" : " <span> (" + sec + "s)</span>"));
}

/**
 * 停止加载时的呼吸动画
 */
function WelcomePage_stopAni() {
    WelcomePage_tips.c(s_Animation, s_None);
}

/**
 * 关闭欢迎页
 */
function WelcomePage_close() {
    WelcomePage_ui.hide();
    V_doc_scroll_unfreeze();
}

/**
 * 处理热键操作
 * @param code 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 */
function WelcomePage_disposeHotkey(code, combKeys) {
    if (WelcomePage_finished === gFalse || WelcomePage_ui.isHidden())
        return;

    switch (code) {
        case 13: // ENTER
            // 关闭欢迎页
            WelcomePage_close();
            break;
    }
}

// ==================== 内容助手类 ==================== //

let ContentAssistor_ui = gUndefined,
    ContentAssistor_btns_openInFigureNav = gUndefined, // 插图浏览器中打开
    ContentAssistor_btns_tableCross = gUndefined, // 表格阅读模式（十字光标）
    ContentAssistor_btns_copyContent = gUndefined, // 复制代码块
    ContentAssistor_btns_picInPic = gUndefined, // 「画中画」
    // 最后显示新标签打开按钮的内容（插图/表格等）
    ContentAssistor_lastHover = gUndefined,
    ContentAssistor_lastContentType = gUndefined;

function ContentAssistor_init() {
    ContentAssistor_ui = $(".v-content-assistor");
    ContentAssistor_btns_openInFigureNav = $(s_CssBtn__Assistor + ".open-in-figure-nav"); // 插图浏览器中打开
    ContentAssistor_btns_tableCross = $(s_CssBtn__Assistor + ".table-cross"); // 表格阅读模式（十字光标）
    ContentAssistor_btns_copyContent = $(s_CssBtn__Assistor + ".copy"); // 复制代码块
    ContentAssistor_btns_picInPic = $(s_CssBtn__Assistor + ".pic-in-pic"); // 「画中画」

    ContentAssistor_btns_openInFigureNav.a(s_DataTips, [
        "全屏显示",
        // "全屏顯示",
        "Full screen",
        // "Plein écran",
        // "Vollbild",
        // "Pantalla completa",
        // "Полноэкранный",
        // "全画面表示",
        // "전체 화면"
    ][V_lang_id]);

    ContentAssistor_btns_tableCross.a(s_DataTips, V_ui_wrap_kbd("X") + tag_2space + [
        "阅读模式",
        // "閱讀模式",
        "Reading mode",
        // "Mode de lecture",
        // "Lesemodus",
        // "Modo de lectura",
        // "Режим чтения",
        // "読書モード",
        // "읽기 모드"
    ][V_lang_id]);

    ContentAssistor_btns_picInPic.a(s_DataTips, [
        "画中画",
        // "畫中畫",
        "Picture in picture",
        // "Image dans l'image",
        // "Bild im Bild",
        // "Imagen en imagen",
        // "Картинка в картинке",
        // "ピクチャーインピクチャー",
        // "사진 속 사진"
    ][V_lang_id]);

    /**
     * 初始化内容助手
     */
    // T.init = function () {
    // 在插图浏览器中打开
    ContentAssistor_btns_openInFigureNav.uC().ck(function () {
        ContentAssistor_hide();
        iFigNav.show(ContentAssistor_lastHover);
    });
    //  开/关表格阅读模式（十字光标）
    ContentAssistor_btns_tableCross.uC().ck(function () {
        TableCross_toggle(ContentAssistor_lastHover);
    });
    // 复制（代码块内容、图片地址）
    ContentAssistor_btns_copyContent.uC().ck(function () {
        if (ContentAssistor_lastHover === gUndefined)
            return;

        let _t = $(this);
        if (ContentAssistor_lastContentType === s_Codeblock)
            ExtCodeBlock_copyContent(_t);
        else if (ContentAssistor_lastContentType === s_Fig + s_SuffixImg)
            ExtFigure_copySrc(_t);
    });
    // 画中画
    ContentAssistor_btns_picInPic.uC().ck(function () {
        PicInPic_show(ContentAssistor_lastHover);
    });

    __bindButtonEvent(ContentAssistor_btns_openInFigureNav);
    __bindButtonEvent(ContentAssistor_btns_tableCross);
    __bindButtonEvent(ContentAssistor_btns_copyContent);
    __bindButtonEvent(ContentAssistor_btns_picInPic);

    /**
     * 绑定事件
     * @param source 源对象
     */
    function __bindButtonEvent(source) {
        source.hover(function () {
            ToolTips_show($(this), s_Auto);
        }, function () {
            ToolTips_hide();
        });
    }
}

/**
 * 绑定对象的 hover 行为
 * @param target 目标对象
 * @param contentType 内容类型：Figure/Table/CodeBlock
 */
function ContentAssistor_bind(target, contentType) {
    target.hover(function () {
        V_ui_removeAnimate(ContentAssistor_ui);
        if (ContentAssistor_lastHover !== target)
            ContentAssistor_hide();

        ContentAssistor_lastHover = target;
        ContentAssistor_lastContentType = contentType;

        let asMarkdown =  "\n<sub>" + [
            "按住",
            // "按住",
            "Hold",
            // "Tenir", "Halt", "Sostener", "Держать", "所有", "잡고있다"
        ][V_lang_id]
            + tag_2space+ V_ui_getAltKeyUI() + [
                tag_2space +"- 复制为 Markdown",
                // tag_2space +"- 複製為 Markdown",
                tag_2space +"- Copy as Markdown",
                // tag_2space +"- Copier comme Markdown",
                // tag_2space +"- Kopieren als Markdown",
                // tag_2space +"- Copiar como Markdown",
                // tag_2space +"- Скопировать как Markdown",
                // tag_2space +"- としてコピー Markdown",
                // tag_2space +"- 다른 이름으로 복사 Markdown"
            ][V_lang_id] + "</sub>";
        if (contentType === s_Codeblock) {
            ContentAssistor_btns_copyContent.a(s_DataTips, [
                "复制全部代码",
                // "複製全部代碼",
                "Copy code",
                // "Copiez tout le code",
                // "Kopieren Sie den gesamten Code",
                // "Copiar todo el código",
                // "Скопируйте весь код",
                // "すべてのコードをコピー",
                // "모든 코드 복사"
            ][V_lang_id] + asMarkdown);
        }
        else if (contentType === s_Fig + s_SuffixImg) {
            ContentAssistor_btns_copyContent.a(s_DataTips, [
                "复制图片地址",
                // "複製圖片鏈接",
                "Copy Image Link",
                // "Copier le lien de l'image",
                // "Bildlink kopieren",
                // "Copiar enlace de imagen",
                // "Скопировать ссылку на изображение",
                // "画像リンクをコピー",
                // "이미지 링크 복사"
            ][V_lang_id] + asMarkdown);
        }

        ContentAssistor_show();
    }, function () {
        if (__mouseDropIn(ContentAssistor_lastHover) === gFalse) {
            ContentAssistor_hide();
        }
    });

    /**
     * 判断鼠标当前位置是否落在指定对象的区域范围内
     * @param target 指定对象
     */
    function __mouseDropIn (target) {
        let e = (event || window.event),
            mx = e.pageX || e.clientX + document.body.scrollLeft,
            my = e.pageY || e.clientY + document.body.scrollTop,
            padding = JS_parseInt(target.c(s_PaddingTop)) * 2;
        return !(mx < target.o().left || mx > (target.o().left + target.w() + padding)
            || my < target.o().top || my > (target.o().top + target.ht() + padding));
    }
}

/**
 * 显示指定内容的内容助手
 */
function ContentAssistor_show() {
    // 移动端不显示
    if (env.device.mobile)
        return;

    // 圆角重置样式
    JQ_removeClass(ContentAssistor_btns_openInFigureNav, "first enabled last");
    JQ_removeClass(ContentAssistor_btns_tableCross, "first enabled last");
    JQ_removeClass(ContentAssistor_btns_copyContent, "first enabled last");
    JQ_removeClass(ContentAssistor_btns_picInPic, "first enabled last");

    // 插图
    if (ContentAssistor_lastContentType.sW(s_Fig)) {
        JQ_addClass(ContentAssistor_btns_openInFigureNav, "enabled first");
        if (ContentAssistor_lastContentType.eW("img"))
            JQ_addClass(ContentAssistor_btns_copyContent, s_Enabled);
        JQ_addClass(ContentAssistor_btns_picInPic, "enabled last");
    }
    // 表格
    else if (ContentAssistor_lastContentType === s_Table) {
        JQ_addClass(ContentAssistor_btns_tableCross, "enabled first");
        JQ_addClass(ContentAssistor_btns_picInPic, "enabled last");
    }
    // 代码块
    else if (ContentAssistor_lastContentType === s_Codeblock) {
        JQ_addClass(ContentAssistor_btns_copyContent, "enabled first");
        JQ_addClass(ContentAssistor_btns_picInPic, "enabled last");
    }

    // ----------------------------------------
    // 计算助手显示的位置
    let caption = ContentAssistor_lastHover.p(),
        className = caption.a(s_Class),
        container = caption.p(),
        offset = 0;
        // 对于存在横向滚动的情况时，须计算其偏移量用来位置调整
    if (className !== gUndefined && className.i("v-caption") > -1
        && container !== gUndefined) {
            className = container.a(s_Class);
            if (className !== gUndefined && className.i(s_CssCaptionContainer) > -1) {
                let capWidth = JS_parseInt(caption.w()),
                    conWidth = JS_parseInt(container.w());
                if (capWidth > conWidth)
                    offset = capWidth - conWidth + 1;
            }
    }
    ContentAssistor_ui.c(s_Left, ContentAssistor_lastHover.o().left
            + ContentAssistor_lastHover.w() + 1
            - ContentAssistor_ui.w()
            + JS_parseInt(ContentAssistor_lastHover.c(s_PaddingLeft))
            + JS_parseInt(ContentAssistor_lastHover.c(s_PaddingRight))
            - offset)
        .c(s_Top, ContentAssistor_lastHover.o().top + 3);

    // 须延时后再执行显示，让以上代码先完成
    setTimeout(function () {
        V_ui_addAnimate(ContentAssistor_ui);
        V_ui_show(ContentAssistor_ui);
    }, 50);
}

/**
 * 隐藏内容辅助动作按钮
 */
function ContentAssistor_hide() {
    V_ui_hide(ContentAssistor_ui);
}

// ==================== 画中画类 ==================== //

let PicInPic_ui_body = gUndefined,
    PicInPic_ui_content = gUndefined,
    PicInPic_ui_zoom = gUndefined,
    PicInPic_ui_close = gUndefined;

let PicInPic_ratio = 0.75;

let PicInPic_size_width = 0,
    PicInPic_size_height = 0;

/**
 * 初始化画中画
 */
function PicInPic_init() {
    PicInPic_ui_body = $(".v-pic-in-pic");
    PicInPic_ui_content = PicInPic_ui_body.ch(".v-content");
    // PicInPic_ui_content = $(".v-pic-in-pic>.v-content");
    PicInPic_ui_zoom = $(s_CssPipBtn + ".v-zoom");
    PicInPic_ui_close = $(s_CssPipBtn + ".v-close");

    // 缩放事件处理
    PicInPic_ui_zoom.uC().ck(function () {
        let _t = $(this),
            pipBtn = $(s_CssPipBtn);
        if (PicInPic_ratio === 1) {
            PicInPic_ratio = 0.75;
            JQ_exchangeClass(pipBtn, "zoom-in", "zoom-out");
            _t.h(V_ui_generateSvgIcon("icoZoomIn", 16, 16, "theme"));
        }
        else {
            PicInPic_ratio = 1;
            JQ_exchangeClass(pipBtn, "zoom-out", "zoom-in");
            _t.h(V_ui_generateSvgIcon("icoZoomOut", 16, 16, "theme"));
        }
        PicInPic_zoom();
    });

    PicInPic_ui_close.uC().ck(function () {
        PicInPic_hide();
    });

    PicInPic_ui_body.hover(function () {
        // 高度过小时调整操作按钮位置
        if (PicInPic_ui_body.ht() < 30) {
            JQ_addClass(PicInPic_ui_zoom, s_Min);
            JQ_addClass(PicInPic_ui_close, s_Min);
        }
        else {
            JQ_removeClass(PicInPic_ui_zoom, s_Min);
            JQ_removeClass(PicInPic_ui_close, s_Min);
        }
        V_ui_show(PicInPic_ui_zoom);
        V_ui_show(PicInPic_ui_close);
    }, function () {
        V_ui_hide(PicInPic_ui_zoom);
        V_ui_hide(PicInPic_ui_close);
    });
}

/**
 * 显示画中画
 * @param source 显示内容的来源对象
 */
function PicInPic_show(source) {
    PicInPic_calcSize();

    // 清空原有内容（除关闭按钮）
    PicInPic_ui_content.empty();

    // 为画中画进行克隆处理
    let pic = __cloneForPicInPic(source);

    // 缩放并显示
    PicInPic_zoom();
    PicInPic_ui_body.show();

    // 根据内容调整画中画的展示
    PicInPic_fitContentSize(pic);
    PicInPic_ui_content.scrollTop(0);

    /**
     * 为画中画进行克隆处理
     * @param source 源对象
     */
    function __cloneForPicInPic (source) {
        let openAll = gFalse,
            tagName = source.prop(s_TagName).l();
        // 针对表格的处理
        if (tagName === s_Table) {
            // 1. 先展开所有行分组
            openAll = RowGroup_openAll(source, s_Auto);
            // 2. 先展开长内容
            let container = source.p().p();
            if (container.a(s_DataContentFolded) === s_True)
                ContentFolder_expand(container.next());
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.c(s_Margin, 0)
            .c(s_Border, 0);
        PicInPic_ui_content.append(newClone);

        // 针对插图的处理
        let img = (tagName === "img"),
            svg = tagName === "svg";
        if (img || svg) {
            newClone.removeAttr(s_DataFigNum);
            if (svg)
                JQ_addClass(newClone, s_CssMermaidRestyler);
        }

        // 对展开了所有行分组的表格进行克隆后的干净处理
        if (openAll === gTrue) {
            RowGroup_reset(newClone); // 重置、切断
            RowGroup_closeAll(source, s_Auto); // 全部收起
        }

        return newClone;
    }
}

/**
 * 隐藏画中画
 */
function PicInPic_hide() {
    PicInPic_ui_body.hide();
}

/**
 * 计算画中画建议的基准尺寸
 */
function PicInPic_calcSize() {
    // 计算基准大小
    let baseW = 550,
        baseH = 350,
        w = $(window).w() / 2.5,
        h = $(window).ht() / 3;
    PicInPic_size_width = w < baseW ? baseW : w;
    PicInPic_size_height = h < baseH ? baseH : h;
    PicInPic_ui_body.c(s_Width, PicInPic_size_width)
        .c(s_Height, PicInPic_size_height);
}

/**
 * 调整画中画的基准大小，以适应内容的实际大小
 */
function PicInPic_fitContentSize(source) {
    // 宽度
    let tagName = source.prop(s_TagName).l(),
        w = source.w(),
        h = source.ht(),
        sourcePadding = JS_parseInt(source.c(s_PaddingTop)) * 2,
        uiPadding = JS_parseInt(PicInPic_ui_body.c(s_PaddingTop)) * 2;

    // 针对图片尺寸的兼容性处理（部分浏览器不使用该处理尺寸不正常，如：Firefox）
    if (tagName === "img") {
        let img = new Image();
        img.src = source.a(s_Src);
        if (img.complete)
            __getImgSize(img);
        else
            img.onload = function () {
                __getImgSize(img);
            }
    }

    // 宽度
    let wWithPadding = w + sourcePadding;
    if (w > 0 && wWithPadding < PicInPic_size_width) {
        PicInPic_size_width = w;
        PicInPic_ui_body.c(s_Width, wWithPadding)
            .c(s_TransformOrigin, PicInPic_size_width + "px " + PicInPic_size_height + "px");
    }

    // 高度
    h = source.ht(); // 重新获得画中画最新高度
    let hWithPadding = h + uiPadding + sourcePadding;
    if (h > 0 && hWithPadding < PicInPic_size_height) {
        // 针对会进行等比缩放的对象进行高度微调
        if ((tagName === "img" || tagName === "svg")
            && h > source.ht()) {
                h = source.ht();
                hWithPadding = h + uiPadding + sourcePadding;
        }
        PicInPic_size_height = h;
        PicInPic_ui_body.c(s_Height, hWithPadding)
            .c(s_TransformOrigin, PicInPic_size_width + "px " + PicInPic_size_height + "px");
    }

    /**
     * 获得 img 对象的实际长宽
     * @param img img 对象
     */
    function __getImgSize(img) {
        w = img.width;
        h = img.height;
    }
}

/**
 * 放大、缩放显示
 */
function PicInPic_zoom() {
    V_ui_removeAnimate(PicInPic_ui_zoom);
    V_ui_removeAnimate(PicInPic_ui_close);

    PicInPic_ui_body.c(s_Transform, "scale(" + PicInPic_ratio + ")")
        .c(s_TransformOrigin, PicInPic_size_width + "px " + PicInPic_size_height + "px");

    setTimeout(function () {
        V_ui_addAnimate(PicInPic_ui_zoom);
        V_ui_addAnimate(PicInPic_ui_close);
    }, 50);
}

// ==================== 聚光灯类 ==================== //

/**
 * 构造函数
 * @param radius 半径大小
 * @param tips 操作提示栏对象
 */
function Spotlight(radius, tips) {
    let T = this;
    T.ui = $(".v-spotlight");
    T.radius = radius; // 聚光灯半径
    T.tips = tips;
    T.zoom = {
        normal: radius, // 标准大半径
        bigger: radius * 1.4, // 放大的半径
    };
    T.lastPos = {
        x : -1,
        y : -1
    };

    T.toolbar = gUndefined; // 联动的工具栏

    /**
     * 切换聚光灯的不同大小
     */
    T.toggleZoom = function () {
        if (T.ui.isHidden())
            return;

        V_report_push([s_Presentation, 'Spotlight', 'Zoom', 0]);

        T.radius = T.radius < T.zoom.bigger
            ? T.zoom.bigger
            : T.zoom.normal;

        T.repaint();
    }

    /**
     * 使用聚光灯模式
     */
    T.useSpotlight = function () {
        JQ_removeClass(T.toolbar.btns[s_LaserPointer], s_Selected);
        JQ_addClass(T.toolbar.btns[s_Spotlight], s_Selected);

        T.pointer = gFalse;
        T.mode = "S";
        T.ui.show();
        JQ_removeClass($(T.pointerScope), s_CssCursorLaser);
        T.repaint();

        let key1 = V_ui_wrap_kbd("⇧ Shift") + tag_2space,
            key2 = tag_2space + tag_2space +"-" + tag_2space + tag_2space + V_ui_wrap_kbd("ESC") + tag_2space;
        T.tips.show([
            key1 + "调整聚光灯大小" + key2 + "退出",
            // key1 + "調整聚光燈大小" + key2 + "退出",
            key1 + "Adjust the size of the spotlight" + key2 + "Exit",
            // key1 + "Ajustez la taille du projecteur" + key2 + "Sortie",
            // key1 + "Passen Sie die Größe des Scheinwerfers an" + key2 + "Ausfahrt",
            // key1 + "Ajusta el tamaño del foco" + key2 + "Salida",
            // key1 + "Отрегулируйте размер прожектора" + key2 + "Выход",
            // key1 + "スポットライトのサイズを調整します" + key2 + "終了",
            // key1 + "스포트라이트의 크기를 조정하십시오" + key2 + "종료"
        ][V_lang_id]);
    }

    /**
     * 刷新聚光灯的显示
     * @param event window.event 鼠标事件对象
     */
    T.repaint = function (event) {
        // 记录鼠标最新位置，避免通过快捷键显示时无法在鼠标位置正常渲染
        if (event !== gUndefined) {
            if (event.clientX !== gUndefined)
                T.lastPos.x = event.clientX;
            if (event.clientY !== gUndefined)
                T.lastPos.y = event.clientY;
        }

        // 未启用则跳过
        if (T.isEnabled() === gFalse)
            return;

        // 聚光灯模式
        if (T.pointer === gFalse) {
            T.ui.c(s_Background, "radial-gradient(circle at "
                + T.lastPos.x + "px " + T.lastPos.y + "px, "
                + "transparent " + T.radius + "px, "
                + "rgba(0, 0, 0, 0.4)" + (T.radius + 5) + "px, rgba(0, 0, 0, 0.9) 900px)");
        }
    }

    /**
     * 是否已显示
     */
    T.isEnabled = function () {
        return T.ui.isShowed();
    }

    /**
     * 切换聚光灯的开关
     */
    T.tg = function () {
        V_report_push([s_Presentation, 'Spotlight', 'Show/Hide', 0]);

        // 已打开，则关闭
        if (T.isEnabled()) {
            T.hide();
        }
        // 未打开，则打开
        else {
            T.useSpotlight();
            return gTrue;
        }
        return gFalse;
    }

    /**
     * 隐藏聚光灯
     */
    T.hide = function () {
        MoreDocContent_refresh();
        T.tips.hide();
        JQ_removeClass(T.toolbar.btns[s_Spotlight], s_Selected);
        T.ui.hide();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (V_doc_block === gTrue)
            return;

        switch (code) {
            case 16: // Shift
                if (T.pointer === gFalse)
                    T.toggleZoom();
                break;
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 激光笔类 ==================== //

/**
 * 构造函数
 * @param tips 操作提示栏对象
 */
 function LaserPointer(tips) {
    let T = this;
    T.tips = tips;
    T.toolbar = gUndefined; // 联动的工具栏

    T.enable = gFalse;

    // 激光笔模式时鼠标形状影响的范围
    T.pointerScope = "body, rt, #write, .v-std-code, .v-tag, .v-badge-name, .v-badge-value, .v-textfield>input, .v-blockquote-folder, audio, video, .v-audio-mini-control, .v-tbl-row-g-btn, .v-textfield-action, .v-segment-btn, .v-nav-center, .md-toc-item, .v-toc-item, .v-btn, .v-accent-btn, .v-toolbar, .v-fig, .v-fig-nav, .v-fig-content, .v-fig-nav-btns, .v-btn-close-figure-nav, .v-rb-coat, a, img, .v-chapter-nav-prev, .v-chapter-nav-current, .v-chapter-nav-next, .v-link-chk-result.error, .v-toc-tab-button";

    /**
     * 使用激光笔
     */
    T.useLaserPointer = function () {
        JQ_removeClass(T.toolbar.btns[s_Spotlight], s_Selected);
        JQ_addClass(T.toolbar.btns[s_LaserPointer], s_Selected);

        T.enable = gTrue;
        JQ_addClass($(T.pointerScope), s_CssCursorLaser);

        T.tips.show(V_ui_wrap_kbd("ESC") + tag_2space + [
            "退出",
            // "退出",
            "Exit",
            // "Sortie", "Ausfahrt", "Salida", "Выход", "終了", "종료"
        ][V_lang_id]);
    }

    /**
     * 是否已显示
     */
    T.isEnabled = function () {
        return T.enable === gTrue;
    }

    /**
     * 切换激活笔开关
     */
    T.tg = function () {
        V_report_push([s_Presentation, 'LaserPointer', 'Show/Hide', 0]);

        // 已打开，则关闭
        if (T.isEnabled()) {
            T.hide();
        }
        // 未打开，则打开
        else {
            T.useLaserPointer();
            return gTrue;
        }
        return gFalse;
    }

    /**
     * 隐藏激活笔
     */
    T.hide = function () {
        MoreDocContent_refresh();
        T.tips.hide();
        T.enable = gFalse;
        JQ_removeClass(T.toolbar.btns[s_LaserPointer], s_Selected);
        JQ_removeClass($(T.pointerScope), s_CssCursorLaser);
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
     T.disposeHotkey = function (code, combKeys) {
        if (V_doc_block === gTrue)
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 分段控制器类 ==================== //

/**
 * @param control 控件 UI 对象
 * @param group 分段控制器分组标识
 */
function SegmentControl(control, group) {
    let T = this;
    T.ui = control;
    T.group = group;

    T.last = gUndefined;
    T.segs = [];
    T.segCnt = 0;

    T.ui.append('<span class="v-segment-indicator"></span>');
    T.indicator = T.ui.ch(".v-segment-indicator"); // 当前选中分段的滑块

    V_ui_addAnimate(T.indicator);

    /**
     * 添加分段
     * @param target 分段对应的组件
     * @param icon 分段使用的图标标识
     * @param checked 是否为默认选中
     * @param status 默认状态
     */
    T.add = function (target, icon, checked, status) {
        let name = target.typeName();
        T.segCnt++;
        T.segs[name] = target;

        // 新增段的 UI
        let id = T.group + "-" + name,
            ui = '<input id="' + id + '" onfocus="T.blur()" type="radio" name="' + T.group
                + '"' + (status === gTrue ? '' : ' ' + s_DataResult + '="' + s_None + '"')
                + ' value="' + name + '"' + (checked === gTrue ? ' checked' : '' ) + ' />'
                + '<label for="' + id + '" class="v-segment-btn ' + name + '" ' + s_DataIcon + '="' + icon + '">'
                + V_ui_generateSvgIcon(icon, 16, 16, s_Dark)
                + '</label>';
        T.ui.append(ui);
        target.ui.entry = T.ui.ch("." + s_CssSegmentBtn + "." + name);
        // V_ui_addAnimate(target.ui.entry);

        // 指定为默认选项
        if (checked === gTrue) {
            T.last = target;
            __updateIcon(gTrue);
        }

        // 为新添加的段绑定事件
        T.ui.f("input#" + id).change(function () {
            // 隐藏切换前选择的组件
            T.last.hide();
            __updateIcon(gFalse);
            // 显示最新选择的组件
            T.last = T.segs[$(this).val()];
            __updateIcon(gTrue);

            T.last.show();
            T.update();
        });

        return T.segs[name];

        /**
         * 更新分段的图标
         *
         * @param checked 是否为选择状态
         */
        function __updateIcon(checked) {
            T.last.ui.entry.h(V_ui_generateSvgIcon(T.last.ui.entry.a(s_DataIcon)
                + (checked ? "-checked" : "") , 16, 16, s_Dark));
        }
    }

    /**
     * 获得当前选中的分段
     * @returns 当前选中的分段
     */
    T.checkedItem = function () {
        return T.ui.f('input[name="' + T.group + '"]:checked').val();
    }

    /**
     * 获得、设置指定分段的状态
     * @returns 无 value 时，返回指定分段的状态
     */
    T.sts = function (target, value) {
        let id = T.group + "-" + target.typeName();
        if (value === gUndefined) {
            JQ_addClass(T.ui.f('label[for="' + id + '"]'), s_CssCursorLaser);
            return T.ui.f('input[id="' + id + '"]').a(s_DataResult);
        }

        if (value === gTrue) {
            JQ_removeClass(T.ui.f('label[for="' + id + '"]'), s_CssCursorLaser);
            T.ui.f('input[id="' + id+ '"]').removeAttr(s_DataResult);
        }
        else {
            JQ_addClass(T.ui.f('label[for="' + id + '"]'), s_CssCursorLaser);
            T.ui.f('input[id="' + id+ '"]').a(s_DataResult, s_None);
        }
    }

    /**
     * 更新分段控制器界面
     */
    T.update = function () {
        // 更新各分段 UI 大小、间隔等
        let space = 2,
            spacePercent = (space * (T.segCnt - 1)) / T.ui.w() * 100,
            width = (100 - spacePercent) / T.segCnt;
        T.ui.ch("." + s_CssSegmentBtn).c(s_Margin, "0 0 0 " + space + "px")
            .c(s_Width, width + "%");
        // 修正第一个
        T.ui.ch("." + s_CssSegmentBtn + ":first").c(s_Margin, 0);

        // 更新当前选择分段相关 UI
        if (T.last === gUndefined)
            return;
        let target = T.last.ui.entry;
        T.indicator.c(s_Left, target.position().left + JS_parseInt(target.c(s_MarginLeft)))
            .c(s_Width, target.w());
    }
}

// ==================== 导航中心类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param runMode 关闭模式
 */
function NavCenter(mask, runMode) {
    let T = this;
    T.ui = $(".v-nav-center"); // 导航中心主界面
    T.handle = $(".v-toc-handle"); // 导航中心引导把手

    // 关键字搜索
    T.__keywordBody = $(".v-search-by-keyword");
    T.keyword = new TextField(T.__keywordBody, "toc-filter-nav-center", gTrue);

    T.runMode = (runMode === gUndefined) ? s_Auto : runMode; // 导航中心运行方式
    T.lastDisplayType = s_Float; // 最后一次的显示方式（float/block）
    T.showed = gFalse; // 是否已显示

    T.width = T.ui.w(); // 导航中心宽度

    T.chpNav = gUndefined; // 联动的章节导航栏
    T.toolbar = gUndefined; // 联动的工具栏

    T.snapTimer = null; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    T.segs = new SegmentControl($(".v-segment.toc"), "toc-segment");
    TocIndex_segments = T.segs;

    // 目录索引组件
    T.catalog = T.segs.add(new TocCatalog(this, gFalse), "icoTocTabCatalog", gTrue, gFalse);
    // 插图索引组件
    T.figure = T.segs.add(new TocFigure(this, gTrue), "icoTocTabFigure", gFalse, gFalse);
    // 表格索引组件
    T.table = T.segs.add(new TocTable(this, gTrue), "icoTocTabTable", gFalse, gFalse);
    // 多媒体索引组件
    T.media = T.segs.add(new TocMedia(this, gTrue), "icoTocTabMedia", gFalse, gFalse);
    // 代码块索引组件
    T.codeblock = T.segs.add(new TocCodeblock(this, gTrue), "icoTocTabCodeblock", gFalse, gFalse);
    // 访问历史组件
    T.history = T.segs.add(new TocHistory(this, gTrue), "icoTocTabHistory", gFalse, gFalse);

    // 文库
    T.docLib = new DocLib(new BgMask("doc-lib", "center"), this);

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    T.segs.update();

    V_ui_addAnimate(T.handle);
    // V_ui_addAnimate(T.keyword.ui);

    /**
     * 当前章节变化事件
     */
    T.catalog.onChapterChanged = function () {
        // 更新逐章导航内容
        if (T.chpNav !== gUndefined)
            T.chpNav.update();
    }

    // 关键字输入组件属性设置
    T.keyword.setIcon(V_ui_generateSvgIcon("icoRetrieval", 16, 16, "alpha"));
    T.keyword.placeholder([
        "输入搜索",
        // "輸入搜尋",
        "Type to search",
        // "Tapez à la recherche",
        // "TYPEN, um zu suchen",
        // "Tipo para buscar",
        // "Тип для поиска",
        // "検索するタイプ",
        // "검색 할 입력하십시오"
    ][V_lang_id]);

    // 绑定输入框事件处理
    T.keyword.onInput = function (source, value) {
        T.catalog.resultNav.reset();
        T.figure.resultNav.reset();
        T.table.resultNav.reset();
        T.table.resultNav.reset();
        T.media.resultNav.reset();
        T.codeblock.resultNav.reset();

        if (value.x().length === 0) {
            // 目录
            T.catalog.ui.result.empty();
            if (T.segs.checkedItem() === T.catalog.typeName())
               T.catalog.ui.body.show();
            T.catalog.hideFilterResult();
            T.catalog.scrollToCurrent();
            T.catalog.updateStatus();
            // 插图、表格、多媒体、代码块
            TocIndex_noneKeyword(T.figure);
            TocIndex_noneKeyword(T.table);
            TocIndex_noneKeyword(T.media);
            TocIndex_noneKeyword(T.codeblock);
        }
        else {
            // 目录
            T.catalog.filter(value.l());
            // 插图、表格、多媒体、代码块
            TocIndex_filter(T.figure, value.l());
            TocIndex_filter(T.table, value.l());
            TocIndex_filter(T.media, value.l());
            TocIndex_filter(T.codeblock, value.l());
        }
    }

    T.keyword.onFocus = function (source) {
        if (T.lastDisplayType !== s_Float) {
            JQ_addClass(VOM_doc(), s_Actived);
            let search = $("." + s_CssFocusSearch);
            JQ_addClass(search, s_Actived);
            // V_ui_addAnimate(search);
        }
    }

    T.keyword.onBlur = function (source) {
        JQ_removeClass(VOM_doc(), s_Actived);
        JQ_removeClass($("." + s_CssFocusSearch), s_Actived);
    }

    // 绑定输入框事件处理
    T.keyword.pressEnter = function (source, value) {
        T.keyword.input.focus();
    }

    /**
     * 触发互动事件
     */
    T.onInteractive = function () {
        T.adjustClickHash();
    }

    // 当前文档不是 mini 类型（文库类文档一般为 mini 类型）
    if (V_type !== s_Mini) {
        // 文库
        if (T.docLib.length === 0)
            ALERT(s_Failed + "iDocLib ]");
        else if (V_util_getParamVal("dl") !== s_Off)
            T.docLib.init();
    }

    /**
     * 跳转回文档封面
     */
    T.gotoCover = function () {
        V_report_push(['nav-center', 'Goto', 'Cover', 0]);
        WINDOW_setHref("#");
        // 【有封面】模式时处理
        if (VOM_cover() !== gUndefined) {
            if (T.catalog.currentItem !== gUndefined) {
                JQ_removeClass(T.catalog.currentItem, s_CssTocItemCurrent);
                T.catalog.currentHeaderIndex = -1;
            }
            T.adjust();
            T.chpNav.adjust();
            T.toolbar.adjust();
        }
        // 【无封面】模式时处理
        else {
            ToolTips_hide();
        }
    }

    /**
     * 适配锚点击事件
     */
    T.adjustClickHash = function () {
        if (T.lastDisplayType === s_Float)
            T.hide(s_Auto);
    }

    /**
     * 显示/隐藏导航中心
     * @param callback 显示/隐藏导航中心后执行回调函数
     */
    T.tg = function (callback) {
        // 导航中心已显示
        if (T.showed === gTrue) {
            T.hide("closed");
        }
        // 导航中心未显示
        else {
            T.runMode = s_Auto;
            // 在封面，或小屏
            if (T.catalog.inHeader() === gFalse || V_ui_isSmallScreen() === gTrue) {
                T.show(s_Float);
            }
            // 在章节内，非小屏
            else {
                // 导航中心运行模式为 auto 时，自动显示导航中心
                if (T.runMode === s_Auto)
                    T.show(s_Block);
            }
        }

        typeof(callback) === s_Function && callback();
        T.afterToggle();
    }

    /**
     * 显示导航中心
     * @param lastDisplayType float: 以浮动形式显示，block: 以占位形式显示
     * @returns boolean true: 需要处理显示，false: 已显示，无须重复处理
     */
    T.show = function (lastDisplayType) {
        // 已显示，或在以动画显示过程中
        if (V_type !== "max" || T.showed === gTrue || T.ui.o().left > -T.width) {
            // T.handle.hide();
            return gFalse;
        }

        T.ui.c(s_Left, 20);
        T.handle.hide();

        T.lastDisplayType = lastDisplayType;
        // 以「占位方式」显示导航中心
        if (T.lastDisplayType === s_Block) {
            // 占位方式的样式设置
            JQ_removeClass(T.ui, s_CssNavCenterFloat);
            JQ_removeClass(T.ui, s_CssFloatCard);
            JQ_addClass(T.ui, s_CssNavCenterBlock);

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_addClass(T.toolbar.btns[s_NavCenter], s_Selected);

            VOM_doc().c(s_MarginLeft, "calc(var(--v-nav-center-width) + 30px)");

            // 因为从切换为占位显示后，会影响文档内容布局，所以须调整随大小变化的内容
            if (T.showed !== gTrue) {
                setTimeout(function () {
                    // 重定位至当前锚点
                    V_util_redirectTo();
                    // 统一同组的分栏引用的高度
                    ExtQuote_uniteColumnsHeight();
                }, 300);
            }
        }
        // 以「浮动方式」显示导航中心
        else if (T.lastDisplayType === s_Float) {
            // 浮动方式的样式设置
            JQ_removeClass(T.ui, s_CssNavCenterBlock);
            JQ_addClass(T.ui, s_CssNavCenterFloat);
            JQ_addClass(T.ui, s_CssFloatCard);

            // 显示联动的遮罩
            T.mask.show();

            // 若文档可视空间比导航中心宽度要小，则进行微调
            if ($(window).w() < T.width + 20)
                T.ui.c(s_Width, $(window).w() - 20);
            // 若文档空间比导航中心宽度大，则直接显示原始大小
            else
                T.ui.c(s_Width, T.width);
        }

        T.showed = gTrue;
        return gTrue;
    }

    /**
     * 隐藏导航中心
     * @param runMode 导航中心的运行模式（auto/closed）
     * @returns boolean true: 需要处理隐藏，false: 已显示，无须重复处理
     */
    T.hide = function (runMode) {
        // 已隐藏，或在以动画隐藏过程中
        if (T.showed === gFalse || T.ui.o().left < 10)
            return gFalse;

        // 若最后一次显示以是「占位方式」显示
        if (T.lastDisplayType === s_Block) {
            // 更新运行模式
            T.runMode = runMode;

            // 统一同组的分栏引用的高度
            ExtQuote_uniteColumnsHeight();

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_removeClass(T.toolbar.btns[s_NavCenter], s_Selected);
        }

        T.ui.c(s_Left, V_util_getVarVal("--v-nav-center-hidden-left"));

        // 恢复不挤压文档正文区
        VOM_doc().c(s_MarginLeft, 0);

        T.mask.hide();

        // 非移动设备时显示把手
        if (!env.device.mobile)
            T.showHandle();

        T.showed = gFalse;

        return gTrue;
    }

    /**
     * 导航中心根据规则进行布局的自适应处理
     * @returns boolean true: 需要处理显示/隐藏，false: 已显示/隐藏，无须重复处理
     */
    T.adjust = function () {
        let result = gFalse;

        // 根据导航中心宽度更新相关界面组件的样式
        if (T.showed && T.lastDisplayType === s_Block)
            VOM_doc().c(s_MarginLeft, "calc(var(--v-nav-center-width) + 30px)");

        T.width = T.ui.w();

        T.keyword.setWidth(T.width - 2 - JS_parseInt(T.__keywordBody.c(s_MarginLeft)) * 2);

        // 根据最新窗口大小调整宽度
        T.segs.update();

        // 在封面，或为小屏
        if (T.catalog.inHeader() === gFalse || V_ui_isSmallScreen() === gTrue) {
            // 自动隐藏导航中心
            result = T.hide(s_Auto);

            // 根据最新窗口大小调整收起位置
            T.ui.c(s_Left, s_varNavCenterHiddenLeft);

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_removeClass(T.toolbar.btns[s_NavCenter], s_Selected);
        }
        // 不在封面
        else {
            // 导航中心运行模式为 auto 时，自动显示导航中心
            if (T.runMode === s_Auto) {
                // 以占位方式显示导航中心
                result = T.show(s_Block);

                // 根据最新窗口大小调整导航中心宽度
                T.ui.c(s_Width, s_varNavCenterWidth);

                // 更新工具栏导航中心按钮图标
                if (!env.device.mobile)
                    JQ_addClass(T.toolbar.btns[s_NavCenter], s_Selected);
            }
        }
        return result;
    }

    /**
     * 显示导航中心引导把手
     */
    T.showHandle = function () {
        if (V_type !== "max")
            return;

        T.handle.c(s_Top, ($(window).ht() - T.handle.ht()) / 2);
        T.handle.show();
    }

    /**
     * 鼠标位置变化对导航中心处理
     */
    T.snap = function (event) {
        // 已显示则跳过
        if (T.showed === gTrue || env.device.mobile)
            return;

        // 鼠标离左边缘小于指定值时
        if (event.clientY > 200 && event.clientY < ($(window).ht() - 300) && event.clientX <= 20) {
            if (T.snapTimer != null)
                return;

            JQ_addClass(T.handle, s_Hover);

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            T.snapTimer = setTimeout(function () {
                JQ_removeClass(T.handle, s_Hover);
                T.show(s_Float);
            }, 1000);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (T.snapTimer != null) {
                clearTimeout(T.snapTimer);
                T.snapTimer = null;
                JQ_removeClass(T.handle, s_Hover);
            }
        }
    }

    /**
     * 显示/隐藏导航中心，并进行关联处理
     */
     T.afterToggle = function () {
        if (iNavCenter.lastDisplayType === s_Block)
            ContentFolder_adjust();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        // 文档库热键操作
        T.docLib.disposeHotkey(code, combKeys);

        if (T.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                if (T.lastDisplayType === s_Float)
                    T.hide();
                break;
        }
    }
}

/**
 * 导航中心初始化
 */
NavCenter.init = function () {
    // 提取文档中由[toc]标签生成的文档目录作为浮动 outline 中的内容
    let toc = $("." + s_MdToc);
    // 没有生成目录
    if (toc.isEmpty()) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 有生成目录，则复制 toc 内容
    let vlookToc = toc.clone();
    // 隐藏原目录
    toc.hide();
    // 将复制的目录进行唯一性标识
    vlookToc.f(".md-toc-content").a(s_Id, "vlook-toc")
    iNavCenter.catalog.ui.body.append(vlookToc);

    // 没有目录内容
    ChpAutoNum_tocContent = $("#vlook-toc");
    if (ChpAutoNum_tocContent.isEmpty()) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 有 Typora 生成的原始目录节点，针对 VLOOK 的封面规则进行调整
    let tocSet = ChpAutoNum_tocContent.ch(".md-toc-h1, .md-toc-h2, .md-toc-h3, .md-toc-h4, .md-toc-h5, .md-toc-h6"),
        tocSetLength = tocSet.length,
        hasCover = (VOM_cover() !== gUndefined);
    tocSet.e(function (i) {
        let _t = $(this);
        // 只处理 h1～h5 的目录节点
        if (_t.a(s_Class).i("md-toc-h6") === -1) {
            if (hasCover) { // 文档有封面时
                if (i < tocSetLength - 1) // 未到最后一个元素
                    iNavCenter.catalog.add(_t);
                else // 最后一个 h1 为封底，移除
                    _t.remove();
            }
            else
                iNavCenter.catalog.add(_t);
        }
        // 移除无效的目录节点（如：封面、封底、普通的 h6 节点）
        else
            _t.remove();
    });

    // 不指定打开，则默认收起所有含子章节的 h1 章节
    let tocAutoCloseLevel = V_util_getParamVal("toc");
    tocAutoCloseLevel = (tocAutoCloseLevel !== gUndefined) ? JS_parseInt(tocAutoCloseLevel) : 2;
    if (tocAutoCloseLevel >= 1 && tocAutoCloseLevel <=5) {
        ChpAutoNum_tocContent.ch(".md-toc-h" + tocAutoCloseLevel + "[" + s_DataNode + "='1'][" + s_DataFolded + "='false']").e(function () {
            iNavCenter.catalog.disposeFold($(this).a(s_Id), "c", gTrue);
        });
    }

    return gTrue;
}

/**
 * 隐藏导航中心（异常情况使用）
 */
NavCenter.hideOnError = function () {
    iNavCenter.hide();

    ERROR([
        "文档中没有找到目录信息，请用Typora最新版本导出，并应用最新VLOOK插件",
        // "文檔中沒有找到目錄信息，請用Typora最新版本導出，並應用最新VLOOK插件",
        "No [TOC] information was found in the document, export it with the latest version of Typora and apply the latest VLOOK plug-in.",
        // "Les informations du répertoire ne figurent pas dans la documentation, veuillez les exporter avec la dernière version de Typora et appliquer le dernier plug-in V.",
        // "Das Dokument enthält keine [TOC] -Informationen. Exportieren Sie es mit der neuesten Version von Typora und wenden Sie das neueste VLOOK-Plug-In an.",
        // "No se encontró información [TOC] en el documento, expórtelo con la última versión de Typora y aplique el último complemento V.",
        // "Информация в каталоге не найдена в документации, пожалуйста, экспортируйте ее с последней версией Typora и примените последний плагин VLOOK",
        // "ドキュメントにディレクトリ情報が見つからない場合は、Typoraの最新バージョンでエクスポートし、最新のVLOOKプラグインを適用してください",
        // "설명서에 디렉토리 정보가 없으므로 Typora 최신 버전으로 내보내고 최신 VLOOK 플러그인을 적용하십시오."
    ][V_lang_id]);
}

// ==================== 逐章导航类 ==================== //

/**
 * 构造函数
 */
function ChapterNav() {
    let T = this,
        __prev = ".v-chapter-nav-prev",
        __current = ".v-chapter-nav-current",
        __next = ".v-chapter-nav-next",
        __dt = ".v-chapter-nav-doc-title";
    // 逐章导航面板主界面
    T.ui = $(".v-chapter-nav");

    T.prev = {
        ui : $(__prev), // 前一章界面
        text: $(".v-chapter-nav-prev-text"), // 前一章文本界面
    };

    T.current = {
        ui : $(__current), // 当前章节界面
    };

    T.next = {
        ui : $(__next), // 后一章界面
        text : $(".v-chapter-nav-next-text"), // 后一章文本界面
    };

    // 文档标题
    T.dt = $(__dt);
    T.dt.t(V_util_getDocTitle());

    if (V_type !== "max")
        T.ui.hide();

    /**
     * 初始化动效
     */
    T.adjustEffectLevel = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (V_ui_effect >= 1) {
            JQ_addClass($(target), s_Effect);
            V_ui_addAnimate($(target + ".effect"));
        }
        else {
            JQ_exchangeClass($(target), s_Effect, "noeffect");
        }
    }
    // 初始化动效
    T.adjustEffectLevel(__prev);
    T.adjustEffectLevel(__current);
    T.adjustEffectLevel(__next);
    T.adjustEffectLevel(__dt);

    /**
     * 跳转至前一章节
     */
    T.prev.ui.uC().ck(function () {
        ToolTips_hide();
        if (T.prev.text.a(s_DataAnchor) === s_Cover)
            iNavCenter.gotoCover();
        else
            iNavCenter.catalog.gotoHeader(T.prev.text);
    });

    /**
     * 回到封面
     */
    T.dt.uC().ck(function () {
        ToolTips_hide();
        if ($(this).a(s_Disabled) === gUndefined)
            iNavCenter.gotoCover();
    });

    /**
     * 跳转至当前章节
     */
    T.current.ui.uC().ck(function () {
        ToolTips_hide();
        iNavCenter.catalog.gotoHeader(T.current.ui);
    });

    /**
     * 跳转至后一章节
     */
    T.next.ui.uC().ck(function () {
        ToolTips_hide();
        iNavCenter.catalog.gotoHeader(T.next.text);
    });

    /**
     * 更新逐章导航栏 UI 及数据
     */
    T.update = function () {
        let curIdx = iNavCenter.catalog.currentHeaderIndex;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (curIdx > 0) {
            T.prev.ui.show();
            T.prev.ui.c(s_Display, s_Block);
            T.prev.text.t($("#" + iNavCenter.catalog.h[curIdx - 1]).t());
            T.prev.text.a(s_DataAnchor, iNavCenter.catalog.h[curIdx - 1]);

            // 【无封面】模式时处理
            if (VOM_cover() === gUndefined) {
                JQ_removeClass(T.dt, s_InStart);
                T.dt.removeAttr(s_Disabled);
                T.adjustEffectLevel(__dt);
                __bindEvent(T.dt, "center");
            }
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (iNavCenter.catalog.inFirstHeader()) {
            T.prev.text.t([
                "封面",
                // "封面",
                "Cover",
                // "Couverture", "Startseite", "Cubrir", "передняя крышка", "カバー", "표지"
            ][V_lang_id]);
            T.prev.text.a(s_DataAnchor, s_Cover);
        }
        // 「无封面」模式时对「文档标题」章节的特殊处理
        else if (iNavCenter.catalog.inDocTitle()) {
            T.prev.ui.hide();
            T.current.ui.hide();
            // 调整为在文档开始位置时的样式
            JQ_removeClass(T.dt, "noeffect effect hover");
            JQ_addClass(T.dt, s_InStart);
            T.dt.a(s_Disabled, s_True);
            V_ui_unbindHover(T.dt);
        }

        // ----------------------------------------
        // 更新「当前章节」导航内容
        if (iNavCenter.catalog.currentItem !== gUndefined) {
            // 【无封面】模式
            if (iNavCenter.catalog.inDocTitle())
                T.current.ui.hide();
            else
                T.current.ui.show();

            T.current.ui.h("<span>" + iNavCenter.catalog.currentItem.a(s_DataHeaderNum) + "</span>"
                + iNavCenter.catalog.currentItem.a(s_Title));
            T.current.ui.a(s_DataAnchor, iNavCenter.catalog.h[curIdx]);
            // T.current.ui.a(s_DataHeaderNum, iNavCenter.catalog.currentItem.a(s_DataHeaderNum));
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (curIdx < iNavCenter.catalog.h.length - 1) {
            T.next.ui.show();
            T.next.text.t($("#" + iNavCenter.catalog.h[curIdx + 1]).t());
            T.next.text.a(s_DataAnchor, iNavCenter.catalog.h[curIdx + 1]);
        }
        else
            T.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    T.show = function () {
        // 若已显示则直接退出
        if (V_type !== "max" || JS_parseInt(T.ui.c(s_Top)) >= 0)
            return;

        JQ_addClass(T.ui, s_CssFloatCard);
        T.ui.c(s_Top, 0);
        T.ui.show();
    }

    /**
     * 隐藏逐章导航栏
     */
    T.hide = function () {
        // 若已隐藏则直接退出
        if (JS_parseInt(T.ui.c(s_Top)) < 0)
            return;

        JQ_removeClass(T.ui, s_CssFloatCard);
        T.ui.c(s_Top, -50);
        T.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    T.adjust = function () {
        // 在封面时，隐藏逐章导航栏
        if (iNavCenter.catalog.inHeader() === gFalse) {
            T.hide();
            JQ_addClass(MoreDocContent_ui_before, s_Cover);

            // 初始化前 / 后章节数据
            T.prev.text.a(s_DataAnchor, s_Cover);
            T.next.text.a(s_DataAnchor, iNavCenter.catalog.h[0]);
        }
        // 不在封面时，显示逐章导航栏
        else {
            JQ_removeClass(MoreDocContent_ui_before, s_Cover);
            T.show();
            T.update();
        }
    }

    /**
     * 逐章导航导航按钮在不同终端的适配处理
     */
    T.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            T.prev.ui.uH();
            T.current.ui.uH();
            T.next.ui.uH();
        }
        // 非移动设备时绑定样式事件
        else {
            // 上一章
            __bindEvent(T.prev.ui, s_Auto);
            // 文档标题
            __bindEvent(T.dt, "center");
            // 当前章节
            __bindEvent(T.current.ui, "center");
            // 下一章
            __bindEvent(T.next.ui, s_Right);
        }
    }

    /**
     * 绑定操作相关事件
     * @param source 对象
     * @param align 对齐方式，auto/center/right
     */
    function __bindEvent(source, align) {
        V_ui_bindHover(source);
        source.hover(function () {
            ToolTips_show(source, align);
        }, function () {
            ToolTips_hide();
        });
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (V_doc_block === gTrue)
            return;

        switch (code) {
            case 188: // <
            case 37: // ←
                T.prev.ui.tr(s_Click);
                // 自适应页面内容显示
                iNavCenter.catalog.focusHeader();
                break;
            case 190: // >
            case 39: // →
                T.next.ui.tr(s_Click);
                // 强制设置滚动间隔已超时，以强制触发 focusHeader 中的处理
                V_doc_scroll_update(0, 0);
                // 自适应页面内容显示
                iNavCenter.catalog.focusHeader();
                break;
        }
    }
}

// ==================== 段落导航类 ==================== //

/**
 * 构造函数
 * @param tips 操作提示栏对象
 */
function ParagraphNav(tips) {
    let T = this;
    T.tips = tips;
    T.count = 0; // 段的总数量
    T.curIdx = -1; // 当前段索引号
    T.enabled = gFalse; // 是否段落导航激活

    T.toolbar = gUndefined; // 联动的工具栏

    /**
     * 返回当前段落
     */
    T.cur = function () {
        if (T.curIdx === -1)
            return gUndefined;
        return $("[" + s_DataId + "='vk-pg-" + T.curIdx + "']");
    }

    /**
     * 切换段落导航开关
     * @returns boolean true：开启，false：关闭
     */
    T.tg = function (target) {
        T.enabled = !T.enabled;
        if (T.enabled === gTrue) {
            V_report_push(['ParagraphNav', 'Action', s_Enabled, 0]);

            JQ_addClass(T.toolbar.btns[s_ParagraphNav], s_Selected);
            MoreDocContent_hideAfter();

            // 显示工具底栏提示信息
            let key1 = V_ui_wrap_kbd("J") + " / " + V_ui_wrap_kbd("K") + tag_2space,
                key2 = tag_2space + tag_2space + V_ui_wrap_kbd("H") + " / " + V_ui_wrap_kbd("L") + tag_2space,
                key3 = tag_2space + tag_2space +"-" + tag_2space + tag_2space + V_ui_wrap_kbd("ESC") + tag_2space;
            T.tips.show([
                key1 + "前/后段落" + key2 + "前/后十个段落" + key3 + "退出",
                // key1 + "前/後段落" + key2 + "前/後十個段落" + key3 + "退出",
                key1 + "front/back paragraph" + key2 + "front/back ten paragraphs" + key3 + "Exit",
                // key1 + "paragraphe avant/arrière" + key2 + "dix paragraphes avant/arrière" + key3 + "Sortie",
                // key1 + "vorderer/hinterer Absatz" + key2 + "vorne/hinten 10 Absätze" + key3 + "Ausfahrt",
                // key1 + "párrafo delantero/trasero" + key2 + "anverso/reverso 10 párrafos" + key3 + "Salida",
                // key1 + "передний / задний абзац" + key2 + "передний / задний десять абзацев" + key3 + "Выход",
                // key1 + "前後の段落" + key2 + "前後の10段落" + key3 + "終了",
                // key1 + "앞 / 뒤 단락" + key2 + "앞 / 뒤 10 단락" + key3 + "종료"
            ][V_lang_id]);

            T.goto(target);
            return gTrue;
        }
        else {
            T.hide();
        }
        return gFalse;
    }

    /**
     * 添加段落
     */
    T.add = function (item) {
        item.a(s_DataId, "vk-pg-" + T.count);
        item.a(s_DataPgIdx, T.count);
        T.count++;

        // 单击内容块处理
        item.uC().ck(function () {
            // 未激活段落导航模式模式
            if (iParagraphNav.enabled === gFalse) {
                if (ThreeClicker_tick() === gTrue
                    && iParagraphNav.tg(item) === gTrue) {
                        iSpotlight.hide();
                        iLaserPointer.hide();
                        // // 取消文本选择
                        // window.getSelection().removeAllRanges();
                    }
            }
            else {
                // event.stopPropagation(); // 停止事件冒泡
                T.goto(item);
                if (ThreeClicker_tick() === gTrue) {
                    iParagraphNav.tg(item);
                    // // 取消文本选择
                    // window.getSelection().removeAllRanges();
                }
            }
        });
    }

    /**
     * 上一个段
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    T.prev = function (step) {
        if (T.enabled === gFalse)
            return;

        T.blurFocus();

        // 未到首段
        if (T.curIdx > 0) {
            T.curIdx = T.curIdx - step;

            if (T.curIdx < 0)
                T.curIdx = 0;

            // 如果目标内容块 item 跳转失败，则再尝试上一个
            if (T.goto() === gFalse)
                T.prev(1);

            return gTrue;
        }
        return gFalse
    }

    /**
     * 下一个段
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    T.next = function (step) {
        if (T.enabled === gFalse)
            return;

        T.blurFocus();

        // 未到末段
        if (T.curIdx < T.count - 1) {
            T.curIdx = T.curIdx + step;

            // 跳转 step 后修正超出最大值的情况
            if (T.curIdx > T.count - 1)
                T.curIdx = T.count - 1;

            // 如果目标内容块item跳转失败，则再尝试下一个
            if (T.goto() === gFalse)
                T.next(1);

            return gTrue;
        }
        return gFalse;
    }

    /**
     * 跳到指定的内容块，或最新的_blockFocusItemIndex指定的内容块
     * @param target 跳转的目标。null: 指定跳到上/下一个位置，非null: 指定的目标位置
     */
    T.goto = function (target) {
        T.blurFocus();

        // 初始化目标段
        let item = (target !== gUndefined)
            ? target
            : T.cur();

        // 若目标聚焦块为空（可能是对象已在其他处理过程中被删除）、不可视等情况
        // 则返回跳转失败
        if (item === gUndefined || item.isHidden() || item.o() === gUndefined)
            return gFalse;

        // 添加高亮样式
        JQ_addClass(item, s_CssPgCurrentItem);
        T.curIdx = JS_parseInt(item.a(s_DataPgIdx));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.ht() * 3;
        if (item.o().top !== 0
            && ((item.o().top - height) < $(document).scrollTop()
            || (item.o().top + height) > ($(document).scrollTop() + $(window).ht()))) {
                DOM_html().scrollTop(item.o().top - $(window).ht() / 2);
        }

        return gTrue; // 返回跳转成功
    }

    /**
     * 让当前聚焦段其失去聚焦效果
     */
    T.blurFocus = function () {
        if (T.cur() !== gUndefined)
            JQ_removeClass(T.cur(), s_CssPgCurrentItem);
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    T.hide = function () {
        MoreDocContent_refresh();
        T.tips.hide();
        JQ_removeClass(T.toolbar.btns[s_ParagraphNav], s_Selected);
        T.enabled = gFalse;
        T.blurFocus();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.enabled === gFalse)
            return;

        switch (code) {
            case 74: // J
                TableCross_hide();
                if (T.next(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用
                break;
            case 75: // K
                TableCross_hide();
                if (T.prev(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用
                break;
            case 72: // H
                TableCross_hide();
                if (T.prev(10)) // 步长10，快速移动
                    ExtQuote_autoUnfold(); // 自动展开引用
                break;
            case 76: // L
                TableCross_hide();
                if (T.next(10)) // 步长10，快速移动
                    ExtQuote_autoUnfold(); // 自动展开引用
                break;
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

/**
 * 初始化段落导航模式
 */
ParagraphNav.init = function() {
    iParagraphNav = new ParagraphNav(new BottomTips(s_ParagraphNav));
    // 添加关联组件
    iParagraphNav.toolbar = iToolbar;

    // 先清理多余的段落标签
    $("li>p:only-child").contents().unwrap();

    // 初始化
    $("h1, h2, h3, h4, h5, h6, ul>li, ol>li, p[class!=md-toc-content][class!=v-cap-1][class!=v-cap-2], figure, .md-diagram-panel, .MathJax_SVG_Display").e(function () {
        let item = $(this);
        // 跳过不可见元素、子元素有嵌套 p 的情况，如li > p
        if (item.is(":visible") && item.ch("p").length === 0) {
            iParagraphNav.add(item);

            // 双击内容块
            item.dblclick(function () {
                // 激活三击检查
                // 配合段落的单击事件对 ThreeClicker_tick() 的判断实现
                ThreeClicker_active();
            });
        } // if
    });
}

// ==================== 三击处理器 ==================== //

let ThreeClicker_activeTime = 0;

/**
 * 进入激活状态（在双击事件中触发）
 */
function ThreeClicker_active() {
    ThreeClicker_activeTime = new Date().getTime();
}

/**
 * 三击触发尝试
 * @returns boolean true：成功触发三击，false：未满足触发三击
 */
function ThreeClicker_tick() {
    // 未进入激活状态
    if (ThreeClicker_activeTime === 0)
        return gFalse;

        // 与进入激活状态时间隔小于指定时间，则满足触发三击条件
    if (new Date().getTime() - ThreeClicker_activeTime < 300) {
        // 取消文本选择
        window.getSelection().removeAllRanges();
        return gTrue;
    }

    // 超过指定时间隔音则恢复为未激活
    ThreeClicker_activeTime = 0;
    return gFalse;
}

// ==================== 工具栏类 ==================== //

/**
 * 构造函数
 * @param chpNav 章节导航对象
 */
function Toolbar(chpNav) {
    let T = this;
    T.ui = $(".v-toolbar"); // 工具栏主界面
    T.btns = []; // 工具栏按钮集
    T.chpNav = chpNav;

    if (V_type !== "max")
        T.ui.hide();

    /**
     * 添加按钮
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    T.add = function (name, clickEvent) {
        T.btns[name] = $(".v-btn." + name);

        T.btns[name].uC().ck(function () {
            // DEBUG(name);
            ToolTips_hide();
            typeof(clickEvent) == s_Function && clickEvent();
        });

        // hover 事件处理
        T.btns[name].hover(function () {
            let _t = $(this),
                btnGroup = _t.a(s_DataBtnGroup);
            if (btnGroup !== gUndefined)
                JQ_addClass($(".v-btn-group." + btnGroup), s_Hover);
            ToolTips_show(_t, s_Auto);
        }, function () {
            let btnGroup = $(this).a(s_DataBtnGroup);
            if (btnGroup !== gUndefined)
                JQ_removeClass($(".v-btn-group." + btnGroup), s_Hover);
            ToolTips_hide();
        });
    }

    /**
     * 添加分隔条
     * @param name 分隔条标识
     */
    T.addSpliter = function (name) {
        T.btns[name] = $(".v-" + name);
    }

    /**
     * 自适应显示工具栏
     */
    T.adjust = function () {
        if (V_type !== "max")
            return;

        // 移动端下隐藏不必要的功能入口
        if (env.device.mobile === gTrue) {
            T.btns[s_ParagraphNav].hide();
            T.btns[s_Spotlight].hide();
            T.btns[s_LaserPointer].hide();
            T.btns[s_Print].hide();
            T.btns[s_ToolbarSpliter].hide();
        }

        // 如果是小屏，或在封面
        if (V_ui_isSmallScreen() || iNavCenter.catalog.inHeader() === gFalse) {
            // 调整具栏按钮分隔空间
            V_util_setVarVal("--v-toolbar-btn-space", "5px");

            let offsetY = 0;//JS_parseInt(T.chpNav.ui.c(s_Top));
            // 小屏
            if (V_ui_isSmallScreen()) {
                T.ui.c(s_PaddingLeft, 0)
                    .c(s_PaddingRight, 0)
                    .c(s_Top, 50 + offsetY);
            }

            // 微调工具栏分隔宽度
            T.btns[s_ToolbarSpliter].c(s_Width, 20);

            // 调整工具栏样式
            JQ_removeClass(T.ui, s_CssFloatCard);
            JQ_addClass(T.ui, s_Cover);

            // 为去掉工具栏背景的按钮添加浮动样式
            JQ_addClass(T.ui.ch(s_CssBtn_BtnGroup), s_CssFloatCard);
            JQ_addClass(T.ui.ch(s_CssBtn_BtnGroup), s_Float);

            // 大屏，回到封面及最开始位置进行二次调整
            if (V_ui_isSmallScreen() === gFalse
                && iNavCenter.catalog.inHeader() === gFalse) {
                if ($(document).scrollTop() <= 5) {
                    T.ui.c(s_PaddingLeft, 10)
                        .c(s_PaddingRight, 10)
                        .c(s_Top, 10);
                }
                else {
                    T.ui.c(s_PaddingLeft, 10)
                        .c(s_PaddingRight, 10)
                        .c(s_Top, 0);
                }
            }
            else {
                // 小屏，在非封面位置进行二次调整
                if (V_ui_isSmallScreen() && iNavCenter.catalog.inHeader())
                    T.ui.c(s_PaddingLeft, 0)
                        .c(s_PaddingRight, 0)
                        .c(s_Top, 50 + offsetY);
                else {
                    // 小屏，在封面及最开始位置进行二次调整
                    if ($(document).scrollTop() <= 5)
                        T.ui.c(s_PaddingLeft, 10)
                            .c(s_PaddingRight, 10)
                            .c(s_Top, 10);
                    // 小屏，在封面位置进行二次调整
                    else
                        T.ui.c(s_PaddingLeft, 10)
                            .c(s_PaddingRight, 10)
                            .c(s_Top, 0);
                }
            }
        }
        // 宽屏，且不在封面
        else {
            if (T.ui.o().top === 0)
                return;

            // 调整具栏按钮分隔空间
            V_util_setVarVal("--v-toolbar-btn-space", "2px");

            // 调整工具栏样式
            JQ_removeClass(T.ui, s_Cover);
            JQ_addClass(T.ui, s_CssFloatCard);

            // 微调工具栏分隔宽度
            let btnCount = T.ui.f(".v-btn").length,
                btnWidth = JS_parseInt(V_util_getVarVal("--v-toolbar-btn-width")),
                space = JS_parseInt(V_util_getVarVal("--v-toolbar-btn-space"));
            T.btns[s_ToolbarSpliter].c(s_Width, "calc((var(--v-nav-center-width) - "
                    + (btnCount * btnWidth + JS_parseInt(T.ui.c(s_PaddingLeft)) * 2 + (btnCount - 4) * space) + "px) / 2)");

            T.ui.c(s_PaddingLeft, 10)
                .c(s_PaddingRight, 10)
                .c(s_Top, 0);
            // 为增加了工具栏按钮的背景去掉浮动样式
            JQ_removeClass(T.ui.ch(s_CssBtn_BtnGroup), s_CssFloatCard);
            JQ_removeClass(T.ui.ch(s_CssBtn_BtnGroup), s_Float);
        } // else
        T.ui.show();
    }

    /**
     * 更新工具栏按钮图标
     */
    T.updateIcons = function () {
        // 调整模式切换按钮图标
        if (ColorScheme.scheme === s_Light)
            T.btns[s_ColorScheme].h(
                "<svg width='18px' height='18px'><use xlink:href='#icoDarkMode' class='v-svg-ico-light'/></svg>"
            );
        else
            T.btns[s_ColorScheme].h(
                "<svg width='20px' height='20px'><use xlink:href='#icoLightMode' class='v-svg-ico-light'/></svg>"
            );
    }
}

// ==================== 颜色方案类 ==================== //

/**
 * 构造函数
 */
function ColorScheme(button) {}

ColorScheme.scheme = s_Light; // 当前颜色以方案，light/dark
ColorScheme.schemeBeforePrint = s_Light; // 打印前的颜色方案

/**
 * 初始化
 */
ColorScheme.init = function () {
    const __lightIcon = document.querySelector('link#doc-icon-light');
    const __darkIcon = document.querySelector('link#doc-icon-dark');

    // Light Mode 时的文档图标
    function __setLightIcon() {
        __darkIcon.remove();
        document.head.append(__lightIcon);
    }

    // Dark Mode 时的文档图标
    function __setDarkIcon() {
        __lightIcon.remove();
        document.head.append(__darkIcon);
    }

    // 根据系统 Color Scheme 变化进行适配更新颜色方案
    function __syncScheme(matcher) {
        if (matcher.matches === gTrue) {
            __updateIcons(gTrue);
            ColorScheme.tg(s_Dark);
        }
        else {
            __updateIcons(gFalse);
            ColorScheme.tg(s_Light);
        }
    }

    // 根据系统 Color Scheme 变化进行适配更新图标
    function __updateIcons(flag) {
        if (flag === gTrue) {
            __setDarkIcon();
            ColorScheme.scheme = s_Dark;
        }
        else {
            __setLightIcon();
            ColorScheme.scheme = s_Light;
        }
        iToolbar.updateIcons();
    }

    // 监听系统的 Color Scheme 变化
    const matcher = window.matchMedia('(prefers-color-scheme:dark)');
    matcher.addListener(__syncScheme);

    // 初始执行
    __updateIcons(matcher.matches);
}

/**
 * 切换颜色方案
 * @param scheme 指定方案，为空时则轮换
 */
ColorScheme.tg = function (scheme) {
    if (scheme === gUndefined)
        scheme = (ColorScheme.scheme === s_Light) ? s_Dark : s_Light;

    ColorScheme.scheme = scheme;
    INFO("    Switch to ... [ " + ColorScheme.scheme + " ]");
    // 应用最新颜色方案
    ColorScheme.refresh();

    if (iNavCenter.docLib.enabled === gTrue) {
        iNavCenter.docLib.reload(ColorScheme.scheme);
    }
    INFO("    DONE!");
}

/**
 * 根据指定的颜色方案进行文档刷新
 */
ColorScheme.refresh = function () {
    iToolbar.updateIcons();

    // 批量修改颜色方案相关的 CSS 变量为指定的新值
    let ac = "--ac-",
        _alt = "-alt",
        _fade = "-fade",
        _title = "-title",
        // ---
        acRed = ac + "red",
        acOrange = ac + "orange",
        acYellow = ac + "yellow",
        acLime = ac + "lime",
        acGreen = ac + "green",
        acAqua = ac + "aqua",
        acCyan = ac + "cyan",
        acBlue = ac + "blue",
        acSea = ac + "sea",
        acSteel = ac + "steel",
        acPurple = ac + "purple",
        acRose = ac + "rose",
        acPink = ac + "pink",
        acGold = ac + "gold",
        acBrown = ac + "brown",
        acGray = ac + "gray",
        acTheme1 = ac + "theme1",
        acTheme2 = ac + "theme2",
        // ---
        mm = "--mm-c-",
        // ---
        mmRed = mm + "red",
        mmOrange = mm + "orange",
        mmYellow = mm + "yellow",
        mmGreen = mm + "green",
        mmCyan = mm + "cyan",
        mmBlue = mm + "blue",
        mmPurple = mm + "purple",
        mmPink = mm + "pink",
        mmBrown = mm + "brown",
        mmGray = mm + "gray",
        // ---
        cm = "--cm-";

    V_util_changeCssVarSet([
        "--v-invert-dark",
        "--v-brightness-dark",
        "--d-bc",
        "--d-bc-tsp",
        "--d-f-c",
        "--pn-c",
        "--pn-c-alt",
        "--pn-c-tsp",
        "--blockquote-bg",
        "--a-color",
        "--mark-bg",
        "--tbl-bder",
        "--tbl-th-bg",
        "--tbl-td-bg",
        "--tbl-cell-bder",
        "--tbl-row-g-alpha",
        "--toc-h-num-color",
        "--h-f",
        "--h-box-shadow",
        "--h-bg-start",
        "--h-bg-end",
        "--code-bg",
        "--std-code-shadow",
        "--rb-code-shadow",
        "--key-bg",
        "--key-reflect",
        "--key-shadow",
        acRed,
        acRed + _alt,
        acRed + _fade,
        acRed + _title,
        acOrange,
        acOrange + _alt,
        acOrange + _fade,
        acOrange + _title,
        acYellow,
        acYellow + _alt,
        acYellow + _fade,
        acYellow + _title,
        acLime,
        acLime + _alt,
        acLime + _fade,
        acLime + _title,
        acGreen,
        acGreen + _alt,
        acGreen + _fade,
        acGreen + _title,
        acAqua,
        acAqua + _alt,
        acAqua + _fade,
        acAqua + _title,
        acCyan,
        acCyan + _alt,
        acCyan + _fade,
        acCyan + _title,
        acBlue,
        acBlue + _alt,
        acBlue + _fade,
        acBlue + _title,
        acSea,
        acSea + _alt,
        acSea + _fade,
        acSea + _title,
        acSteel,
        acSteel + _alt,
        acSteel + _fade,
        acSteel + _title,
        acPurple,
        acPurple + _alt,
        acPurple + _fade,
        acPurple + _title,
        acRose,
        acRose + _alt,
        acRose + _fade,
        acRose + _title,
        acPink,
        acPink + _alt,
        acPink + _fade,
        acPink + _title,
        acGold,
        acGold + _alt,
        acGold + _fade,
        acGold + _title,
        acBrown,
        acBrown + _alt,
        acBrown + _fade,
        acBrown + _title,
        acGray,
        acGray + _alt,
        acGray + _fade,
        acGray + _title,
        acTheme1,
        acTheme1 + _alt,
        acTheme1 + _fade,
        acTheme1 + _title,
        acTheme2,
        acTheme2 + _alt,
        acTheme2 + _fade,
        acTheme2 + _title,
        mmRed,
        mmRed + _alt,
        mmOrange,
        mmOrange + _alt,
        mmYellow,
        mmYellow + _alt,
        mmGreen,
        mmGreen + _alt,
        mmCyan,
        mmCyan + _alt,
        mmBlue,
        mmBlue + _alt,
        mmPurple,
        mmPurple + _alt,
        mmPink,
        mmPink + _alt,
        mmBrown,
        mmBrown + _alt,
        mmGray,
        mmGray + _alt,
        cm + "keyword",
        cm + "variable",
        cm + "variable-2",
        cm + "variable-3",
        cm + "tag",
        cm + "attribute",
        cm + "CodeMirror-cursor",
        cm + "string",
        cm + "string-2",
        cm + "comment",
        cm + "header",
        cm + "quote",
        cm + "hr",
        cm + "link",
        cm + "negative",
        cm + "positive",
        cm + "meta",
        cm + "bulidin",
        cm + "bracket",
        cm + "atom",
        cm + "number"
    ], (ColorScheme.scheme === s_Dark) ? "dk" : "lg");

    // 针对 Dark Mode 进行适配处理
    ExtFigure_adjustColorScheme(gTrue);

}

/**
 * 根据颜色方案对浏览器兼容性处理
 */
// ColorScheme.afterToggle = function () {
//     $(".v-copyright").ch("svg").h("<use xlink:href='#icoVLOOK-" + ColorScheme.scheme + "'></use>");
// }

// ==================== 字体风格选项、选择器类 ==================== //

let webfontHostAlt = "https://madmaxchow.github.io/openfonts/";
// let webfontHostAlt = "https://cdn.jsdelivr.net/gh/MadMaxChow/openfonts@master/";

/**
 * 构造函数
 * @param ui 选项的 UI
 * @param fonts 字体集数组
 */
function FontThemeOption(ui, fonts) {
    let T = this;
    T.ui = ui;
    T.fonts = fonts;
    T.fontCount = T.fonts.length;
}

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param theme 默认的字体主题
 */
function FontTheme(mask, theme) {
    let T = this;
    T.theme = theme; // 当前字体风格，sans：非衬线（小清新），serif：衬线（文艺范）
    T.ui = $(".v-font-theme"); // 字体风格切换选择界面
    // 系统默认字体风格选项
    T.localTheme = new FontThemeOption($(".v-font-theme-opt-local"), []);
    // 小清新字体风格选项
    T.sansTheme = new FontThemeOption($(".v-font-theme-opt-sans"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Digital Sans/normal/normal", "VLOOK Digital Sans/normal/500", "VLOOK Digital Sans/normal/bold", "VLOOK Digital Sans/normal/900",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
            ]);
    // 艺术范字体风格选项
    T.serifTheme = new FontThemeOption($(".v-font-theme-opt-serif"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Digital Serif/normal/normal", "VLOOK Digital Serif/normal/bold", "VLOOK Digital Serif/italic/normal", "VLOOK Digital Serif/italic/bold",
            "VLOOK Serif Mono/normal/normal", "VLOOK Serif Mono/normal/bold", "VLOOK Serif Mono/italic/normal", "VLOOK Serif Mono/italic/bold",
            "VLOOK Serif/normal/500", "VLOOK Serif/normal/900",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
        ]);
    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    // 绑定各字体风格选项事件
    T.localTheme.ui.uC().ck(function () {
        T.apply("local");
        T.hide();
    });
    T.sansTheme.ui.uC().ck(function () {
        T.apply("sans");
        DEBUG("fontCount", T.sansTheme.fontCount, "fontLength", T.sansTheme.fonts.length);
        T.initWebFont();
        T.hide();
    });
    T.serifTheme.ui.uC().ck(function () {
        T.apply("serif");
        DEBUG("fontCount", T.serifTheme.fontCount, "fontLength", T.serifTheme.fonts.length);
        T.initWebFont();
        T.hide();
    });

    /**
     * 初始化
     * @param theme 可选。强制指定的字体主题
     */
    T.init = function (theme) {
        // 有指定强制主题，同时指定的主题合法且与文档配套的不一致，则进行处理
        if (theme !== gUndefined
            && theme.m(/^(local|sans|serif)$/i) != null
            && theme !== T.theme) {
                T.theme = theme;
                T.apply(T.theme);
        }

        LOG("_____ FONT THEME (" + T.theme + ") _____ ");

        T.initWebFont();

        // 对于本地字体主题的状态，直接为就绪
        $(".v-fontinfo-local > #fontset-status").t("✅ " + [
            "已就绪",
            // "已就緒",
            "Ready",
            // "Prêt", "Bereit", "Listo", "готов", "準備完了", "준비된"
        ][V_lang_id],);
    }

    /**
     * 初始化 WebFont
     */
    T.initWebFont = function () {
        let fontWeight500 = "500",
            fontWeight900 = "900",
            _Regular = "-Regular",
            _Medium = "-Medium",
            _Bold = "-Bold",
            _Black = "-Black",
            _Italic = "-Italic";
        let unicodeRange = "U+0021-002F," // !"#$%&'()*+,-./（不含空格）
            + "U+0030-0039," // 0123456789
            + "U+003A-0040," // :;<=>?@
            + "U+005B-0060," // [\]^_`
            + "U+007B-007E"; // {|}~
        let timeOutMsg = "❌ " + ["超时", "Timeout"][V_lang_id];

        if (T.theme === "local") {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
        }
        else if (T.theme === "sans") {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
            // 动态加载字体 VLOOK Digital Sans
            __LoadDigitalSansFont();
            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Noto Sans CJK SC
            __loadSansCjkFont();

            // Sans 字体主题的加载超时检测
            setTimeout(function () {
                if (T.sansTheme.fonts.length > 0)
                    $(".v-fontinfo-sans > #fontset-status").t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }
        else if (T.theme === "serif") {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
            // 动态加载字体 VLOOK Digital Serif
            __LoadDigitalSerifFont();
            // 动态加载字体 VLOOK Serif Mono
            __loadSerifMonoFont();
            // 动态加载字体 VLOOK Noto Serif CJK SC
            __loadSerifCjkFont();

            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Noto Sans CJK SC
            __loadSansCjkFont();

            // Serif 字体主题的加载超时检测
            setTimeout(function () {
                if (T.serifTheme.fonts.length > 0)
                    $(".v-fontinfo-serif > #fontset-status").t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }

        // 动态加载字体 VLOOK Number
        function __loadNumberFont() {
            let fontName = "VLOOK Number",
                srcName = "Altinn-DIN";
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName, "otf", s_WOFF2);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, "otf", s_WOFF2);
            T.loadFont(fontName, s_Italic, s_Normal, srcName, srcName + _Italic, "otf", s_WOFF2);
        }

        // 动态加载字体 VLOOK Digital Sans
        function __LoadDigitalSansFont() {
            let fontName = "VLOOK Digital Sans",
                srcName = "NotoSansMono";
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName + _Medium, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, s_TTF, s_WOFF2, unicodeRange);
        }

        // 动态加载字体 VLOOK Digital Serif
        function __LoadDigitalSerifFont() {
            let fontName = "VLOOK Digital Serif",
                srcName = "LuxiMono";
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Italic, s_Normal, srcName, luxiMonoSubName + _Regular, s_TTF, s_WOFF2, unicodeRange);
            T.loadFont(fontName, s_Italic, s_Bold, srcName, luxiMonoSubName + _Bold, s_TTF, s_WOFF2, unicodeRange);
        }

        // 动态加载字体 VLOOK Sans Mono
        function __loadSansMonoFont() {
            let fontName = "VLOOK Sans Mono",
                srcName = "NotoSansMono";
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName +_Medium, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, s_TTF, s_WOFF2);
        }

        // 动态加载字体 VLOOK Serif Mono
        function __loadSerifMonoFont() {
            let fontName = "VLOOK Serif Mono",
                srcName = "LuxiMono";
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Italic, s_Normal, srcName, luxiMonoSubName + _Regular, s_TTF, s_WOFF2);
            T.loadFont(fontName, s_Italic, s_Bold, srcName, luxiMonoSubName + _Bold, s_TTF, s_WOFF2);
        }

        // 动态加载字体 VLOOK Noto Sans CJK SC
        function __loadSansCjkFont() {
            let fontName = "VLOOK Sans",
                srcName = "NotoSansCJKsc";
            T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, "otf", s_WOFF2);
            T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, "otf", s_WOFF2);
            T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, "otf", s_WOFF2);
        }

        // 动态加载字体 VLOOK Noto Serif CJK SC
        function __loadSerifCjkFont() {
            let fontName = "VLOOK Serif",
                srcName = "NotoSerifCJKsc";
            T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName + _Medium, "otf", s_WOFF2);
            T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, "otf", s_WOFF2);
        }
    }

    /**
     * 绑定选择字体风格操作按钮
     * @param button 绑定的工具栏按钮
     */
    T.bindButton = function (button) {
        T.button = button; // 绑定的工具栏按钮
    }

    /**
     * 加载自定义字体
     * @param fontFamily 自定义字体名称
     * @param fontStyle 字体样式
     * @param fontWeight 字重
     * @param srcFontName 字体源名称
     * @param srcFontSubName 字体源子名称
     * @param suffix 字体扩展名，支持 otf ttf
     * @param woff 加载 woff 的版本，支持 woff woff2，不加载不指定
     * @param unicodeRange 指定应用的字符范围
     */
    T.loadFont = function (fontFamily, fontStyle, fontWeight, srcFontName, srcFontSubName, suffix, woff, unicodeRange) {
        if (document.fonts && !T.isExist(fontFamily, fontStyle, fontWeight)) {
            let woffURL = "url('" + webfontHostAlt + srcFontName + "-" + woff + "/" + srcFontSubName + "." + woff + "') format('woff2')",
                fontFace;
            if (unicodeRange === gUndefined) {
                fontFace = new FontFace(fontFamily,
                    ((woff !== gUndefined) ? woffURL : ""), {
                        style: fontStyle,
                        weight: fontWeight,
                        display: "swap"
                    });
            }
            else {
                fontFace = new FontFace(fontFamily,
                    ((woff !== gUndefined) ? woffURL : ""), {
                        style: fontStyle,
                        weight: fontWeight,
                        display: "swap",
                        unicodeRange: "U+0030-0039"
                    });
            }

            // 指定字体加载完成后回调函数
            fontFace.load().then(function(loadedFontFace) {
                document.fonts.add(loadedFontFace);

                let fontID = fontFamily + "/" + fontStyle + "/" + fontWeight,
                    readyMsg = "✅ " + ["已就绪", "Ready"][V_lang_id],
                    loadingMsg = ["加载中", "Loading"][V_lang_id];
                LOG("↓↓↓ FONT LOADED ↓↓↓");
                LOG(fontID);

                // --------------------
                // 更新小清新风格字体包下载进度
                // 剔除已下载的字体字形
                for (let i = 0; i < T.sansTheme.fonts.length; i++) {
                    if (T.sansTheme.fonts[i] === fontID) {
                        T.sansTheme.fonts.splice(i, 1);
                        break;
                    }
                }
                // 计算进度
                let sansLoadedCount = T.sansTheme.fontCount - T.sansTheme.fonts.length,
                    sansStatus = $(".v-fontinfo-sans > #fontset-status");
                if (sansLoadedCount < T.sansTheme.fontCount)
                    sansStatus.t(loadingMsg + "... (" + JS_mathRound(sansLoadedCount / T.sansTheme.fontCount * 100) + "%)");
                else
                    sansStatus.t(readyMsg);

                // --------------------
                // 更新艺术范风格字体包下载进度
                // 剔除已下载的字体字形
                for (let i = 0; i < T.serifTheme.fonts.length; i++) {
                    if (T.serifTheme.fonts[i] === fontID) {
                        T.serifTheme.fonts.splice(i, 1);
                        break;
                    }
                }
                // 计算进度
                let serifLoadedCount = T.serifTheme.fontCount - T.serifTheme.fonts.length,
                    serifStatus = $(".v-fontinfo-serif > #fontset-status");
                if (serifLoadedCount < T.serifTheme.fontCount)
                    serifStatus.t(loadingMsg + "... (" + JS_mathRound(serifLoadedCount / T.serifTheme.fontCount * 100) + "%)");
                else
                    serifStatus.t(readyMsg);
            });
        }
    }

    /**
     * 检测指定自定义字体是否已加载
     * @param fontFamily 自定义字体名称
     * @param fontStyle 字体样式
     * @param fontWeight 字重
     */
    T.isExist = function (fontFamily, fontStyle, fontWeight) {
        let values = document.fonts.values(),
            isHave = gFalse,
            item = values.next();

        while (!item.done && isHave === gFalse) {
            let fontFace = item.value;
            if (fontFace.family === fontFamily
                && fontFace.style === fontStyle
                && fontFace.weight === fontWeight) {
                    isHave = gTrue;
                    LOG("///// FONT IS EXIST /////");
                    LOG(fontFamily + "/" + fontStyle + "/" + fontWeight);
            }
            item = values.next();
        }
        return isHave;
    }

    /**
     * 显示字体风格选择器
     */
    T.show = function () {
        T.mask.show();
        V_ui_moveToCenter(T.ui);
        T.ui.show();

        LOG("'" + T.theme + "'");
        if (T.theme === "local") {
            JQ_addClass(T.localTheme.ui, s_Selected);
            JQ_removeClass(T.sansTheme.ui, s_Selected);
            JQ_removeClass(T.serifTheme.ui, s_Selected);
        }
        else if (T.theme === "sans") {
            JQ_addClass(T.sansTheme.ui, s_Selected);
            JQ_removeClass(T.localTheme.ui, s_Selected);
            JQ_removeClass(T.serifTheme.ui, s_Selected);
        }
        else {
            JQ_addClass(T.serifTheme.ui, s_Selected);
            JQ_removeClass(T.localTheme.ui, s_Selected);
            JQ_removeClass(T.sansTheme.ui, s_Selected);
        }
    }

    /**
     * 显示/隐藏字体风格选择器
     */
    T.tg = function () {
        if (T.ui.c(s_Display) === s_Block) {
            T.hide();
        }
        else {
            T.show();
        }
    }

    /**
     * 隐藏字体风格选择器
     */
    T.hide = function () {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 应用指定字体风格
     * @param theme 指定应用的字体风格（sans/serif），不指定则以为当前字体风格
     */
    T.apply = function (theme) {
        // 修正无指定样式的情况
        if (theme === gUndefined)
            theme = T.theme;
        T.theme = theme;

        V_report_push([s_Style, 'FontTheme', theme, 0]);

        // CSS 变量名称列表
        const varList = [
            "--v-f-fm-title",
            "--v-f-fm-subtitle",
            "--v-f-fm-h",
            "--v-f-fm-text",
            "--v-f-fm-bd",
            "--v-f-fm-key",
            "--v-f-fm-num",
            "--v-f-fm-tag",
            "--v-f-fm-code",
            "--v-f-w-bd",
            "--v-f-w-title",
            "--v-f-w-text"
        ];
        // 生成目标字体主题变量值列表
        let fontVarList = [];
        for (let i = 0, len = varList.length; i < len; i++) {
            fontVarList.push(V_util_getVarVal(varList[i] + "-" + T.theme));
        }
        // 遍历所有变量实现字体主题的切换
        for (let i = 0, len = varList.length; i < len; i++) {
            V_util_setVarVal(varList[i], fontVarList[i]);
        }
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 脚注类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 */
function FootNote(mask) {
    let T = this;
    T.ui = $(".v-foot-note-panel"); // 脚注主界面
    T.content = $(".v-foot-note-panel-content"); // 脚注内容区

    T.buttonSeeAll = $(".v-foot-note-panel-all"); // 查看所有脚注按钮
    T.buttonSeeAll.uC().ck(function () {
        T.hide();
        // 跳转至所有脚注区域
        WINDOW_setHref("#vk-footer-area");
    });

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    /**
     * 显示脚注弹层
     */
    T.show = function () {
        // 显示关联的遮罩
        T.mask.show();

        if (V_ui_isSmallScreen())
            T.ui.c(s_Left, 20)
                .c(s_Right, 20);
        else
            T.ui.c(s_Left, "15%")
                .c(s_Right, "15%");

        T.ui.show();
    }

    /**
     * 隐藏脚注弹层
     */
    T.hide = function () {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

/**
 * 初始化脚注
 */
FootNote.init = function () {
    // 将 Typora 的脚注调整到封底前，VLOOK 规范的文档中最后一个 <h6> 是封底
    let footnotesArea = $("." + s_FootnotesArea);
    // 「有封面」模式
    if (VOM_backcover() !== gUndefined)
        footnotesArea.insertBefore(VOM_backcover());
    // 「无封面」模式
    else
        VOM_doc().append(footnotesArea);

    // 将 VLOOK 生成的脚注区锚点调整到生成 HTML 后的实际位置
    $("#vk-footer-area").insertBefore(footnotesArea);

    // 移除默认的跳转属性
    let a = $("a[name^='ref-footnote-'], a[id^='ref-footnote-']");
    a.removeAttr(s_Href);
    // 将脚注角标的事件替换为指定的处理事件
    a.uC().ck(function () {
        // 获取脚注【返回】链接对应的脚注原文信息
        let _t = $(this),
            target = $("a[name='df" + _t.a(s_Name) + "'], a[id='df" + _t.a(s_Name) + "']").p().clone();

        // 更新脚注弹层内容区
        LOG(target, target.t());
        iFootNote.content.h(target);
        // 移除默认的返回链接
        target.f("a[name^='dfref-footnote'], a[id^='dfref-footnote']").remove();

        // 显示脚注弹层
        iFootNote.show();
    });
}

// ==================== 状态栏类 ==================== //

let StatusBar_ui = gUndefined,
    StatusBar_items = [], // 状态栏条目集
    StatusBar_options = V_util_getParamVal("stsbar");
/**
 * 构造函数
 */
function StatusBar_init() {
    StatusBar_ui = $(".v-status-bar");
    if (V_type !== "max")
        StatusBar_ui.hide();
}

/**
 * 添加状态栏条目
 * @param name 条目标识
 * @param item 条目对象
 */
function StatusBar_add(name, item) {
    StatusBar_items[name] = item;
    if (StatusBar_options !== gUndefined && StatusBar_options.i(name) > -1) {
        item.enabled = gFalse;
        item.ui.remove();
    }
}

/**
 * 自适应显示状态栏
 */
function StatusBar_adjust() {
    // 移动端下隐藏不必要的功能入口
    if (env.device.mobile === gTrue) {
        StatusBar_items["zoom-view"].remove();
    }
}

// ==================== 文档信息类 ==================== //

let DocInfo_ui = gUndefined,
    DocInfo_enabled = gTrue;
/**
 * 构造函数
 */
function DocInfo_init() {
    DocInfo_ui = $(".v-doc-info");
}

/**
 * 统计字数
 */
function DocInfo_countWord() {
    if (DocInfo_enabled === gFalse)
        return;

    let latin = VOM_doc().t().m(/[\w\-]+/g),
        cjk = VOM_doc().t().m(/\p{Unified_Ideograph}/ug);
        // docInfo = $(".v-doc-info");
    let latinCount = (latin == null) ? 0 : latin.length,
        cjkCount = (cjk == null) ? 0 : cjk.length,
        wordCount = latinCount + cjkCount,
        readCountPerMin = 180;

    // 计算阅读时长
    let mins = wordCount < readCountPerMin ? 1 : JS_parseInt(wordCount / readCountPerMin),
        times = mins + " " + [
            "分钟",
            // "分鐘",
            "minutes",
            // "minutes", "minute", "minutos", "минута", "分", "분."
        ][V_lang_id];
    if (mins > 60)
        times = (mins / 60).toFixed(1) + " " + [
            "小时",
            // "小時",
            "hours",
            // "heures", "stunden", "horas", "час", "時間", "시간."
        ][V_lang_id];
    // 默认信息
    DocInfo_ui.a(s_DataDefault,
        times + " / " + V_formatting_thousands(wordCount.toString()) + " "
        + [
            "字",
            // "字",
            "words",
            // "mots", "Wörter", "palabras", "слова", "言葉", "말"
        ][V_lang_id]);
    // 扩展信息
    DocInfo_ui.a(s_DataExtend,
        " ( " + V_formatting_thousands(cjkCount.toString()) + " " + [
            "中日韩，",
            // "中日韓，",
            "CJK, ",
            // "CJK, ", "CJK, ", "CJK, ", "CJK, ", "CJK，", "CJK, "
        ][V_lang_id]
        + V_formatting_thousands(latinCount.toString()) + " " + [
            "非中日韩",
            // "非中日韓",
            "Non-CJK",
            // "Non CJC", "Nicht-CJK", "No CJK", "Не-CJK", "非CJK", "비 CJK"
        ][V_lang_id] + " )");
    // hover 时显示扩展信息
    DocInfo_ui.hover(function () {
        DocInfo_ui.h(DocInfo_ui.a(s_DataDefault) + " <span style='color: var(--d-f-c-alt)'>" + DocInfo_ui.a(s_DataExtend) + "</span>");
    }, function () {
        DocInfo_ui.h(DocInfo_ui.a(s_DataDefault));
    });
    DocInfo_ui.h(DocInfo_ui.a(s_DataDefault));
}

// ==================== 缩放显示类 ==================== //

let ZoomView_ui = gUndefined,
    ZoomView_enabled = gTrue;
/**
 * 构造函数
 */
function ZoomView_init() {
    ZoomView_ui = $(".v-zoom-view");

    ZoomView_ui.uC().ck(function () {
        let cmdKey = env.os.macOS ? V_ui_getMetaKeyUI() : V_ui_getCtrlKeyUI();
        iInfoTips.inform([
            "放大 - ",
            // "放大 - ",
            "Zoom In - ",
            // "Zoom - ",
            // "Vergrößern In - ",
            // "Ampliación - ",
            // "Увеличить - ",
            // "ズーム - ",
            // "확대 - "
        ][V_lang_id] + tag_2space + cmdKey + tag_2space + V_ui_wrap_kbd("&nbsp;+&nbsp;") + s_Br + s_Br + [
            "缩小 - ",
            // "縮小 - ",
            "Zoom Out - ",
            // "Réduction - ",
            // "Vergrößern Sie - ",
            // "Encoger - ",
            // "Уменьшить - ",
            // "ズームアウト - ",
            // "줄다 - "
        ][V_lang_id] + tag_2space + cmdKey + tag_2space + V_ui_wrap_kbd("&nbsp;-&nbsp;") + s_Br + s_Br + [
            "实际大小 - ",
            // "實際大小 - ",
            "Actual Size - ",
            // "Taille réelle - ",
            // "Tatsächliche Größe - ",
            // "Tamaño real - ",
            // "Фактический Размер - ",
            // "実物大 - ",
            // "실제 치수 - "
        ][V_lang_id] + tag_2space + cmdKey + tag_2space + V_ui_wrap_kbd("&nbsp;0&nbsp;")
        , null, gTrue);
    });
}

// ==================== 链接检查器类 ==================== //

let LinkTool_ui = gUndefined,
    LinkTool_panel_list = gUndefined,
    LinkTool_panel_header = gUndefined,
    LinkTool_panel_body = gUndefined,
    LinkTool_enabled = gTrue,
    LinkTool_icon_error = "",
    LinkTool_icon_close = "",
    LinkTool_mask = gUndefined;

/**
 * 构造函数
 */
function LinkTool_init(mask) {
    // let T = this;
    LinkTool_ui = $(".v-link-chk-result"); // 检查结果
    LinkTool_panel_list = $(".v-link-error-list"); // 坏链主界面
    LinkTool_panel_header = $(".v-link-error-list-header");
    LinkTool_panel_body = $(".v-link-error-list-items"); // 坏链内容列表
    LinkTool_enabled = gTrue;

    LinkTool_icon_error = V_ui_generateSvgIcon("icoLinkError", 16, 14, s_Light);
    LinkTool_icon_close = V_ui_generateSvgIcon("icoClose", 16, 16, s_Light);

    // 遮罩
    LinkTool_mask = mask;
    LinkTool_mask.bindPartner(function () {
        LinkTool_hide()
    }, LinkTool_panel_list);

    // 滚动事件处理
    LinkTool_panel_body.scroll(function () {
        // 滚出了顶部则显示顶部渐变条
        if (LinkTool_panel_header.isHidden() && LinkTool_panel_body.scrollTop() > 10)
            LinkTool_panel_header.show()
        // 否则隐藏
        else if (LinkTool_panel_body.scrollTop() <= 10)
            LinkTool_panel_header.hide()
    });
}

/**
 * 将 .md 的链接转换为 .html 链接（或指定后缀）
 */
function LinkTool_mdToHtml() {
    let mdx = V_util_getParamVal("mdx"),
        newExt = ".html";
    // 全局配置，禁用转换，则停止
    if (mdx === s_Off)
        return;

    // 全局配置，指定转换的后缀
    if (mdx !== gUndefined)
        newExt = "." + mdx;

    $("a[href*='.md']").e(function () {
        let _t = $(this),
            href = _t.a(s_Href),
            mdx = V_util_getQueryParams(href)["mdx"];
        // 单个链接指定禁用转换，则停止
        if (mdx === s_Off)
            return gFalse;

        // 单个链接指定转换的后缀
        if (mdx !== gUndefined)
            _t.a(s_Href, href.r(".md", "." + mdx));
        else // 默认的全局后缀
            _t.a(s_Href, href.r(".md", newExt));
    });
}

/**
 * 添加坏链项目
 * @param id 坏链对象的标识
 * @param content 坏链项目显示的内容
 */
function LinkTool_addToCheck(id, content) {
    let item = $('<span ' + s_DataAnchor + '="#' + id + '" class="' + s_CssTocItem + '">' + content + "</span>");
    // 添加链接异常样式及属性
    JQ_addClass($(item.a(s_DataAnchor)).a(s_Tabindex, 0), "v-link-error-source");
    // 添加节点
    LinkTool_panel_body.append(item);
    item.uC().ck(function () {
        JQ_removeClass(LinkTool_panel_body.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
        JQ_addClass(item, s_CssTocItemCurrent);

        V_util_gotoHash(item.a(s_DataAnchor));
        LinkTool_hide();
    });
}

/**
 * 检查链接
 */
function LinkTool_checkLink() {
    if (LinkTool_enabled === gFalse)
        return;

    let count = 0;
    // 检查所有页内链接对应的锚点是否都存在
    $("#write a").e(function () {
        let _t = $(this),
            href = _t.a(s_Href);
        // 忽略空链接，如 href="#"
        if (href === gUndefined || href.length <= 1)
            return gTrue;

        // --------------------
        // 页内链接
        // 以 #mjx- 开始的链接为行间公式的页内引用，会导致 jQuery 的正则表达式解析错误，须跳过
        if (href.sW("#") && !href.sW("#mjx-")) {
            // 检索是否存在与该内链对应的锚点
            let anchor = href.s(1, href.length);
            // 没有检索到对应的锚点
            if ($("#write #" + anchor + ", #write a[name='" + anchor + "']").length === 0) {
                count++;

                // 设置坏链 id 值，用于跳转定位
                let id = "vk-error-anchor" + count;
                _t.a(s_Id, id);

                LinkTool_addToCheck(id, "🔗 <strong>" + [
                    "无效页内链接",
                    // "無效頁內鏈接",
                    "Invalid Inner Link",
                    // "Lien de page non valide",
                    // "Ungültiger innerer Link",
                    // "Enlace interno no válido",
                    // "Недопустимая ссылка на страницу",
                    // "ページリンクが無効です",
                    // "잘못된 페이지 링크"
                ][V_lang_id] + ":</strong> " + $(this).t());
            }
        }
    });

    // 无错误链接
    if (count === 0) {
        LinkTool_ui.remove();
    }
    else {
        // 显示错误链接错误图标
        JQ_addClass(LinkTool_ui, s_Error);
        LinkTool_ui.h(LinkTool_icon_error);

        // 点击图标行为
        LinkTool_ui.uC().ck(function () {
            if (LinkTool_panel_list.isHidden())
                LinkTool_show();
            else
                LinkTool_hide();
        });
    }
}

/**
 * 显示坏链列表
 */
function LinkTool_show() {
    LinkTool_panel_list.show()
    LinkTool_mask.show();
}

/**
 * 隐藏坏链列表
 */
function LinkTool_hide() {
    LinkTool_panel_list.hide()
    LinkTool_mask.hide();

    LinkTool_ui.h(LinkTool_icon_error);
    V_doc_scroll_unfreeze();
}

/**
 * 处理热键操作
 * @param code 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 */
function LinkTool_disposeHotkey(code, combKeys) {
    if (LinkTool_panel_list.isHidden())
        return;

    switch (code) {
        case 27: // ESC
            LinkTool_hide();
            break;
    }
}

// ==================== 背景遮罩类 ==================== //

/**
 * 构造函数
 * @param id 标识
 * @param style 扩展样式：left / right / bottom / center
 * @param close 是否显示关闭提示器
 */
function BgMask(id, style, close) {
    let T = this;
    T.style = style;

    // DOM_body().after
    VOM_doc().after('<div class="v-mask '
        + (style !== gUndefined ? style + ' ' : '') + id + ' v-backdrop-blurs">'
        + V_ui_copyrightInfo()
        + '</div>');

    // 根据动效等级初始化遮罩样式
    V_ui_initEffectLevel();

    T.ui = $(".v-mask." + id);
    T.close = gUndefined;

    // 生成关闭提示器
    if (close !== gUndefined && close === gTrue) {
        T.ui.append('<div class="v-mask-close ' + T.style + '">'
            + V_ui_generateSvgIcon("icoCloseTo-" + T.style, 60, 60, s_Light)
            + '</div>');
        T.close = T.ui.ch(".v-mask-close");
    }

    T.partner = gUndefined;
    T.partnerUI = gUndefined;

    /**
     * 绑定联动对象
     * @param partner 联动对象
     * @param ui 联动对象的 UI
     */
    T.bindPartner = function (partner, ui) {
        T.partner = partner;
        T.partnerUI = ui;
    }

    /**
     * 显示遮罩
     */
    T.show = function () {
        // 冻结滚动
        V_doc_scroll_freeze();
        V_doc_block = gTrue;

        // 总是在 target 下显示
        T.ui.c(s_Zindex, T.partnerUI.c(s_Zindex) - 1);

        // 「关闭提示器」的处理
        if (T.close !== gUndefined) {
            // 默认是 style = left 的位置
            let offset = 30,
                x = JS_parseInt(T.partnerUI.c(s_Left)) + T.partnerUI.w() + offset,
                y = JS_parseInt(T.partnerUI.c(s_Top)) + (T.partnerUI.ht() - T.close.ht()) / 2;
            // left / right 的处理
            if (T.style === s_Left || T.style === s_Right) {
                T.close.c(s_Left, T.style === s_Right
                        ? JS_parseInt(T.partnerUI.c(s_Left)) - T.close.w() - offset
                        : x)
                    .c(s_Top, y);
            }
            // bottom 的处理
            else if (T.style === s_Bottom) {
                // x = JS_parseInt(T.partnerUI.c(s_Left)) + (T.partnerUI.w() - T.close.w()) / 2;
                y = JS_parseInt(T.partnerUI.c(s_Bottom)) + T.partnerUI.ht() + offset;
                T.close.c(s_Left, s_Auto)
                    .c(s_Top, s_Auto)
                    .c(s_Bottom, y)
                    .c(s_MarginLeft, "-" + (T.close.w() / 2) + 'px')
                    .c(s_Padding, "0px 50%");
            }
        }

        // 绑定 VLOOK logo 的点击事件
        T.ui.f(".v-copyright .v-copyright-svg-ico").uC().ck(function () {
            env.show($(this));
        });

        // 点击遮罩隐藏联动对象
        T.ui.uC().ck(function () {
            // 取消冻结滚动
            V_doc_scroll_unfreeze();
            // 隐藏联动对应
            if (typeof(T.partner) == s_Function)
                 T.partner();
            else
                T.partner.hide();

            T.hide();
        });

        T.ui.show();
        // V_ui_show(T.ui);
    }

    /**
     * 隐藏遮罩
     */
    T.hide = function () {
        // 取消冻结滚动
        V_doc_scroll_unfreeze();
        V_doc_block = gFalse;

        T.ui.hide();
    }
}

// ==================== 长内容折叠类 ==================== //

let ContentFolder_enabled = true,
    ContentFolder_ui = gUndefined, // 展开操作区的 UI 模板
    ContentFolder_limit = V_debugMode ? 300 : 600, // 内容须折叠的高度限值
    ContentFolder_contents = [], // 须进行折叠判断和处理的内容集
    ContentFolder_buildTimers = [],
    ContentFolder_rowNumFilter = s_Table + " tbody tr";

function ContentFolder_init() {
    if (!ContentFolder_enabled)
        return;
    ContentFolder_ui = $("." + s_CssContentExpander)
}

/**
 * 添加内容
 */
function ContentFolder_add(content) {
    if (!ContentFolder_enabled)
        return;

    ContentFolder_contents.push(content);
}

/**
 * 适配内容展开操作区
 */
function ContentFolder_adjust() {
    if (!ContentFolder_enabled)
        return;

    // 提前中断未完成的处理
    if (ContentFolder_buildTimers.length > 0) {
        for (let i = 0, len = ContentFolder_buildTimers.length; i < len; i++)
            clearTimeout(ContentFolder_buildTimers.shift());
    }
    // 重新开始构建内容展开操作区
    ContentFolder_rebuild();
}

/**
 * 重建部分内容展开操作区，主要是 img, table, .md-fences 等会因导航中心的显示/关闭
 * 导致文档宽度变化而引起的内容高度也跟随变化的情况
 * 如在不显示导航中心时因宽度较变，高度等比变高，或高度反而变短
 * 会导致应该显示展开操作区即不显示，或不应显示却显示的情况
 */
function ContentFolder_rebuild() {
    if (!ContentFolder_enabled)
        return;

    // 重建需要重建的部分
    for (let i = 0, len = ContentFolder_contents.length; i < len; i++) {
        // img 类长内容
        if (ContentFolder_contents[i].prop(s_TagName).l().sW("i")) {
            // 创建一个Image对象，实现图片的预下载
            let img = new Image();
            img.src = ContentFolder_contents[i].a(s_Src);
            // 如果图片已经存在于浏览器缓存，直接处理
            if (img.complete)
                ContentFolder_buildTimers.push(
                    setTimeout(function () {
                        ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue);
                    }, 50)
                );
            // 等待图片下载完成后再处理
            else
                img.onload = function () {
                    // DEBUG("img [" + img.src + "] loaded");
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue);
                }
        }
        // 非 img 类长内容
        else {
            // 设置按不同时间间隔执行，减少在处理数量过多时，会阻塞 UI
            ContentFolder_buildTimers.push(
                setTimeout(function () {
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue);
                }, 50)
            );
        }
    }
}

/**
 * 检测内容是否过长，过长则进行处理。适用于「插图、表格、代码块」等
 * @param target 折叠的目标对象
 * @param rebuild 本次折叠是否属于重建的（如在页面加载后，由于页面正文区宽度变化后调用时属于重建）
 */
function ContentFolder_checkAndProcess(target, rebuild) {
    if (!ContentFolder_enabled)
        return;

    let container = target.p(),
        tagName = target.prop(s_TagName).l();

    // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
    if (rebuild === gTrue)
        container = container.p();

    // 获得上一轮构建时生成的展开操作区，没有则初始为 undefined
    let oldExpander = container.next(),
        className = oldExpander.a(s_Class);
    if (className === gUndefined || className.i(s_CssContentExpander) === -1)
        oldExpander = gUndefined;

    // 已被点击展开过了，在重建时则跳过
    let expanded = container.a(s_DataContentExpanded);
    if (expanded !== gUndefined && expanded.sW("t")) {
        let folded = container.a(s_DataBeforePrintFolded);
        if (folded !== gUndefined && startsWith("t") === gFalse) {
            ContentFolder_buildTimers.shift();
            return;
        }
    }

    // 针对 img 内容，进行父容器的正确性处理
    if (tagName.sW("i")) {
        // 图像若加载晚于 img 的题注生成，其父容器则题注而不是 VLOOK 标记的 img 父容器
        if (container.a(s_DataContainer) === gUndefined)
            container = container.p();
    }

    // 初始化折叠配置
    container.a(s_DataContentFolded, s_False); // 未折叠
    container.a(s_DataContentExpanded, s_False); // 已被点击扩展了
    container.c(s_Height, s_Auto);
    // 针对 Mermaid 图表，不添加会导致出现滚动条
    if (tagName.sW("s"))
        container.c(s_PaddingBottom, "10px");

    let h = JS_parseInt(target.c(s_Height));
    // 高度超出折叠要求高度时进行折叠
    if (h > ContentFolder_limit) {
        // 构建内容展开操作区
        ContentFolder_buildContentExpander(target, container, tagName, h, oldExpander);
    }
    // 高度没有超出折叠要求
    else {
        // 若之前须折叠，目前不需要折叠，则清除对应的展开操作区
        if (oldExpander !== gUndefined && className !== gUndefined
            && className.i(s_CssContentExpander) > -1)
                oldExpander.remove();
    }

    ContentFolder_buildTimers.shift();
}

/**
 * 构建内容展开操作区
 * @param target 为目标对象创建展开操作区（如 table）
 * @param container 指定对象所属的容器（如 table 的容器为父元素 figure）
 * @param tagName target 的 HTML 标签名
 * @param tHeight target 的高度
 * @param oldExpander 上一轮重建前的展开操作区（没有则为 undefined）
 */
function ContentFolder_buildContentExpander(target, container, tagName, tHeight, oldExpander) {
    if (!ContentFolder_enabled)
        return;

    // 设置为已折叠
    container.a(s_DataContentFolded, s_True);

    // 表格 <table>、Mermaid <svg> 图表的特性处理
    if (tagName.sW("t") || tagName.sW("s")) {
        container.c(s_Height, ContentFolder_limit)
            .c(s_OverflowX, s_Auto) // 可横向滚动
            .c(s_OverflowY, s_Hidden);
    }
    // 非表格，非 Mermaid 图表的处理
    else {
        container.c(s_Height, ContentFolder_limit)
            .c(s_OverflowY, s_Hidden);
    }

    let expander,
        w = JS_mathCeil(JS_parseFloat(container.c(s_Width)));
        // w = JS_parseInt(container.c(s_Width));

    // 上一轮构建时没有生成展开操作区，则生成一个新的
    if (oldExpander === gUndefined) {
        expander = ContentFolder_ui.clone();
        container.after(expander);
    }
    // 直接复用上一轮构建时生成的展开操作区
    else
        expander = oldExpander;

    // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
    if (container.f(s_Table).length > 0)
        JQ_addClass(container.f(ContentFolder_rowNumFilter), s_CssTableRowNumHidden);

    // 动态生成按钮文本内容
    let btn = expander.f("div>span");
    btn.h(btn.a(s_Title) + " <span style='font-weight: normal;'>"
        + JS_mathRound((1 - ContentFolder_limit / tHeight) * 100) + "%</span>");

    // 重新适配展开操作区尺寸
    let tW = JS_mathCeil(JS_parseFloat(target.c(s_Width)));//JS_parseInt(target.c(s_Width));
    if (w > tW) {
        w = tW;// + JS_parseInt(target.c(s_BorderWidth)) * 2;
        // 表格、mermarid 插图与比容器宽度小时，右下角不是圆角，须进行适配调整
        expander.c(s_BorderBottomRightRadius, 0);
    }
    expander.a(s_DataContentType, tagName);
    expander.c(s_MarginLeft, container.c(s_MarginLeft))
        .c(s_Width, w + "px");
    // 设置为可视
    expander.c(s_Visibility, "visible");

    // 展开按钮 click 事件处理
    expander.ch(".v-btn").uC().ck(function () {
        ContentFolder_expand(expander);
    });

    // 展开按钮 hover 事件处理
    V_ui_bindHover(expander.ch(".v-btn"));
}

/**
 * 展开被折叠的内容
 * @param expander 点击的按钮所在父元素
 */
function ContentFolder_expand(expander) {
    if (!ContentFolder_enabled)
        return;

    let container = expander.prev(),
        tagName = expander.a(s_DataContentType);
    V_report_push([s_Interactive, V_report_transTagName(tagName), 'ExpandLongContent', 0]);

    // 移除内容展开操作区
    expander.remove();

    // 展开对应的内容
    container.a(s_DataContentFolded, s_False);
    container.a(s_DataContentExpanded, s_True);
    container.c(s_Height, s_Auto);
    // 针对表格 <table>、Mermaid <svg> 图表增加滚动属性
    if (tagName.sW("t") || tagName.sW("s"))
        container.c(s_Overflow, s_Auto);
    // 非表格、非 Mermaid 图表的处理
    else
        container.c(s_OverflowY, "initial");

    // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
    if (container.f(s_Table).length > 0)
        JQ_removeClass(container.f(ContentFolder_rowNumFilter), s_CssTableRowNumHidden);
}

// ==================== 工具提示信息类 ==================== //

let ToolTips_ui = gUndefined,
    ToolTips_continueShow = gFalse, // 是否激活持续显示
    ToolTips_lastStyle = gUndefined,
    ToolTips_aniTimer = null,
    ToolTips_continueTimer = null,
    ToolTips_delay = 2000;

/**
 * 构造函数
 */
function ToolTips_init() {
    ToolTips_ui = $(".v-tool-tips");

    V_ui_addAnimate(ToolTips_ui, s_Opacity);
}

/**
 * 显示工具提示信息
 *
 * @param follow 提示的目标元素
 * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
 * @param style 指定微调的样式
 */
function ToolTips_show(follow, align, style) {
    if (env.device.mobile === gTrue)
        return;

    ToolTips_ui.h(follow.a(s_DataTips));

    // 强制取消最后一次延时显示的处理
    clearTimeout(ToolTips_aniTimer);
    // 强制取消隐藏后指定时间内取消持续显示的处理
    clearTimeout(ToolTips_continueTimer);

    ToolTips_lastStyle = style;

    const ow = ToolTips_ui.w();
    const ww = $(window).w();
    const gap = 20;
    let left = follow.o().left;
    ToolTips_ui.c(s_BorderTopLeftRadius, "0")
        .c(s_BorderTopRightRadius, s_varRB);

    // 指定对齐方式或提示超出屏幕
    if (align !== s_Auto || (left + ow + gap) > ww) {
        // align: right
        ToolTips_ui.c(s_BorderTopLeftRadius, s_varRB)
            .c(s_BorderTopRightRadius, "0");
        left = follow.o().left - ow + follow.w() - gap;
        // 右侧顶边，则微调
        if (left + ow + gap>= ww)
            left = left - gap;

        // align: center
        if (align === "center") {
            left = follow.o().left + (follow.w() - ow) / 2 - gap / 2;
            ToolTips_ui.c(s_BorderTopLeftRadius, s_varRB)
                .c(s_BorderTopRightRadius, s_varRB);
        }
    }
    // 左侧顶边，则微调
    if (left <= 0)
        left = 10;

    if (ToolTips_lastStyle !== gUndefined)
        JQ_addClass(ToolTips_ui, ToolTips_lastStyle);

    ToolTips_ui.c(s_Left, left)
        .c(s_Top, follow.o().top - $(document).scrollTop() + follow.ht() + 10);

    // 延时，或立即显示提示
    let waitTime = (ToolTips_continueShow === gTrue) ? 0 : ToolTips_delay;
    ToolTips_aniTimer = setTimeout(function () {
        ToolTips_continueShow = gTrue; // 一旦显示后，激活持续显示
        V_ui_show(ToolTips_ui);
    }, waitTime);
}

/**
 * 隐藏工具提示
 */
function ToolTips_hide() {
    // 隐藏后在指定时间内取消持续显示
    clearTimeout(ToolTips_continueTimer);
    ToolTips_continueTimer = setTimeout(function () {
        ToolTips_continueShow = gFalse;
    }, ToolTips_delay);

    // V_doc_scroll_unfreeze();
    // 强制取消最后一次延时显示的处理
    clearTimeout(ToolTips_aniTimer);
    V_ui_hide(ToolTips_ui);

    if (ToolTips_lastStyle !== gUndefined)
        JQ_removeClass(ToolTips_ui, ToolTips_lastStyle);
}

// ==================== 弹层提示信息类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 */
function InfoTips(mask) {
    let T = this;
    T.ui = $(".v-info-tips");
    T.aniTimer = null;

    // 绑定点击事件
    T.ui.uC().click = function () {
        T.hide();
    }

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    /**
     * 显示通知信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    T.inform = function (message, delay, mask, target) {
        T.show(message, delay, mask, "inform", target);
    }

    /**
     * 显示泡泡信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    T.bubble = function (message, delay, mask, target) {
        T.show(message, delay, mask, s_Bubble, target);
    }

    /**
     * 显示错误信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    T.error = function (message, delay, mask, target) {
        T.show(message, delay, mask, s_Error, target);
    }

    /**
     * 显示通知提示信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param type 类型。info/error
     * @param target 事件源，不为空时则跟随显示
     */
    T.show = function (message, delay, mask, type, target) {
        clearTimeout(T.aniTimer);

        T.ui.h(message);

        // 先重置为默认值
        JQ_removeClass(T.ui, s_Error);
        JQ_removeClass(T.ui, s_Bubble);
        T.ui.c(s_Width, "")
            .c(s_Height, "")
            .c(s_Right, s_Auto)
            .c(s_Bottom, s_Auto)
            .c(s_BorderRadius, s_varRB);
        if (type === s_Error)
            JQ_addClass(T.ui, s_Error);
        else if (type === s_Bubble)
            JQ_addClass(T.ui, s_Bubble);

        // 跟随事件源显示
        if (target !== gUndefined) {
            V_ui_moveToTarget(T.ui, target);
        }
        // 居中显示
        else
            V_ui_moveToCenter(T.ui);

        // V_ui_show(T.ui);
        T.ui.show();

        // 延时后自动关闭
        if (delay != null) {
            T.aniTimer = setTimeout(function () {
                    T.hide();
                }, delay);
        }

        // 显示遮罩
        if (mask === gTrue)
            T.mask.show();
    }

    /**
     * 隐藏弹窗信息
     */
    T.hide = function () {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 底部提示信息类 ==================== //

/**
 * 构造函数
 * @param id 对象标识
 */
function BottomTips(id) {
    let T = this;
    // DOM_body().after('<div class="v-bottom-tips ' + id + '"><div></div></div>');
    VOM_doc().after('<div class="v-bottom-tips ' + id + '"><div></div></div>');

    T.ui = $(".v-bottom-tips." + id);

    /**
     * 显示底部提示栏
     * @param message 提示内容
     */
    T.show = function (message) {
        T.ui.ch("div").h(message);
        T.ui.show();
    }

    /**
     * 隐藏底部提示栏
     */
    T.hide = function () {
        T.ui.hide();
    }
}

// ==================== 文档更多内容遮罩栏 ==================== //

let MoreDocContent_ui_before = gUndefined,
    MoreDocContent_ui_after = gUndefined;
/**
 * 构造函数
 */
function MoreDocContent_init() {
    // let T = this;
    // T.chpNav = chpNav;
    // MoreDocContent_ui = {
    //     before : $(".v-more-doc-content-before"),
    //     after : $(".v-more-doc-content-after")
    // }
    MoreDocContent_ui_before = $(".v-more-doc-content-before");
    MoreDocContent_ui_after = $(".v-more-doc-content-after")
}

/**
 * 刷新显示更多内容遮罩栏
 * @param scrollTop 文档当前滚动位置，如果为空则自动获取
 */
function MoreDocContent_refresh(scrollTop) {
    if (scrollTop === gUndefined)
        scrollTop = $(document).scrollTop();

    // if (T.chpNav.ui.c(gStrDisplay) === s_Block &&  scrollTop > 800)
    if (scrollTop > 10)
        MoreDocContent_ui_before.show();
    else
        MoreDocContent_ui_before.hide();

    if (scrollTop + $(window).ht() > ($(document).ht() - 10))
        MoreDocContent_ui_after.hide();
    else
        MoreDocContent_ui_after.show();
}

/**
 * 隐藏更多内容遮罩栏
 */
function MoreDocContent_hideAfter() {
    MoreDocContent_ui_after.hide();
}

// ==================== 题注生成器类 ==================== //

let CaptionGenerator_spliter = ". ",
    CaptionGenerator_autoContent = gFalse; // 自动根据内索引对象内容生成题注

/**
 * 生成题注
 * @param target 需要添加题注的对象
 * @param tagName HTML 标签名称
 */
function CaptionGenerator_actionForTextContent(target, tagName) {
    let caption = "",
        indexObj = gUndefined,
        anchor = "",
        dataForSearch = "";

    // 代码块 <pre>
    if (tagName.sW("p")) {
        indexObj = iNavCenter.codeblock;
        caption = [
            "代码块 ",
            // "代碼塊 ",
            "Code Block ",
            // "Bloc de Code ", "Codeblock ", "Bloque de código ", "Блок Кода ", "コードブロック ", "코드 블록 "
        ][V_lang_id]
            + (V_doc_counter_codeblock);
    }
    // 表格 <table>
    else if (tagName.sW("t")) {
        indexObj = iNavCenter.table;
        caption = [
            "表 ",
            // "表 ",
            "Table ",
            // "Table ", "Tabelle ", "Mesa ", "Таблица ", "テーブル ", "표 "
        ][V_lang_id] + (V_doc_counter_table);
    }

    // 尝试获得带题注语法的内容
    let fcSet = CaptionGenerator_getCaptions(target.p().prev(), tagName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.x().length === 0) {
        fc = "";
        if (CaptionGenerator_autoContent === gTrue) {
            if (tagName.sW("p")) // 代码块
                fc = target.f("." + s_CssCodeMirrorLine).t().x();
            else if (tagName.sW("t")) // 表格，并过滤掉列格式相关语法标记内容
                fc = target.f("td").t().x().r(/(==|\[\s]|\.\.|<<|\^\^|##\s)/ig, "");
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.x(), 20);
        }
    }
    caption = "<span>" + caption + CaptionGenerator_spliter + "</span>" + fc;

    // 代码块 <pre>
    if (tagName.sW("p")) {
        anchor = "vk-id-codeblock" + V_doc_counter_codeblock;
        target.wrap("<div id='" + anchor + "' class='v-caption' style='width: 100%'>");
        dataForSearch += target.f("." + s_CssCodeMirrorLine).t();
    }
    // 表格 <table>
    else if (tagName.sW("t")) {
        anchor = "vk-id-tbl" + V_doc_counter_table;
        target.wrap("<div id='" + anchor + "' class='v-caption'>");
        dataForSearch += target.t();
    }

    // 添加第 1 题注
    target.before("<p class='v-cap-1'>" + caption + "</p>");
    // 添加第 2 题注
    let has2Captions = (fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='v-cap-2'>" + fc2 + "</p>");
        target.p().a(s_DataCaptionCount, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).a(s_DataTitle, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }
}

/**
 * 针对插图（img、mermaid）生成题注
 * @param target 需要添加题注的对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
function CaptionGenerator_actionForMediaContent(target, tagName) {
    let fc = target.a(s_Alt), // 默认尝试获取图片的 alt 内容作为题注内容
        fc2 = target.a(s_Title), // 默认尝试获得图片的 title 作为第二题注内容
        indexObj = iNavCenter.figure,
        anchor = "",
        dataForSearch = "";

    let fcSet = null;
    // 若图片 alt 无内容，则尝试获取前面段落（如<p>、<h6>）作为第 1、2 题注的内容
    if (fc === gUndefined || fc.x().length === 0) {
        fcSet = CaptionGenerator_getCaptions(target.p().prev(), tagName);
        if (fcSet[0] != null)
            fc = fcSet[0];
        if (fcSet[1] != null)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption = [
        "图 ",
        // "圖 ",
        "Figure ",
        // "La figure ", "Zahl ", "Figura ", "карта ", "図 ", "그림 "
    ][V_lang_id] + (V_doc_counter_fig);
    // 音频题注 audio
    if (tagName.sW("a")) {
        indexObj = iNavCenter.media;
        caption = [
            "音频 ",
            // "音頻 ",
            "Audio ",
            // "l'audio ", "Audio ", "Audio ", "аудио ", "オーディオ ", "오디오 "
        ][V_lang_id] + (V_doc_counter_audio);
    }
    // 视频频题注 video
    else if (tagName.sW("v")) {
        indexObj = iNavCenter.media;
        caption = [
            "视频 ",
            // "視頻 ",
            "Video ",
            // "Vidéo ", "Video ", "Vídeo ", "видео ", "ビデオ ", "비디오 "
        ][V_lang_id] + (V_doc_counter_video);
    }

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.x().length === 0) {
        fc = "";
        if (CaptionGenerator_autoContent === gTrue) {
            if (tagName.sW("s")) // Mermaid SVG
                fc = target.f("g").t().x();
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.x(), 20);
        }
    }
    if (fc != null && fc.x().length > 0)
        caption = "<span>" + caption + CaptionGenerator_spliter + "</span>" + fc;
    else
        caption = "<span>" + caption + "</span>";

    // 为插图（mermaid）增加题注 <svg>
    if (tagName.sW("s")) {
        anchor = "vk-id-fig" + V_doc_counter_fig;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption mermaid'></div>");
        dataForSearch += target.f("div, span, tspan, text").t();
    }
    // 为插图（img）增加题注 <img>
    else if (tagName.sW("i")) {
        anchor = "vk-id-fig" + V_doc_counter_fig;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'></div>");
        dataForSearch += target.a(s_Src);
    }
    // 为音频增加题注 audio
    else if (tagName.sW("a")) {
        anchor = "vk-id-audio" + V_doc_counter_audio;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'>");
        dataForSearch += target.a(s_Src);
    }
    // 为视频增加题注 video
    else if (tagName.sW("v")) {
        anchor = "vk-id-video" + V_doc_counter_video;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'>");
    }

    // 生成第 1 题注
    target.before("<p class='v-cap-1'>" + caption + "</p>");
    // 生成第 2 题注
    let has2Captions = (fc !== gUndefined && fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='v-cap-2'>" + fc2 + "</p>");
        target.p().a(s_DataCaptionCount, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).a(s_DataTitle, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // ----------------------------------------
    // 修正在 SVG 插图套上题注后的自适应尺寸 <svg>
    if (tagName.sW("s")) {
        if (target.a(s_Height) !== s_None || target.c(s_Height) !== s_None) { // 有指定高度的
            target.removeAttr(s_Height);
            target.c(s_Height, "");
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        let style = gUndefined;
        if (target.c(s_MaxWidth) !== s_None) // CSS 中指定了最大宽度
            target.p().c(s_Width, target.c(s_MaxWidth));
        else if ((style = target.a(s_Style)) !== gUndefined && style.i(s_Width) > -1) // 通过 style 指定了宽度
            target.p().c(s_Width, target.c(s_Width));
        else if (target.a(s_Width) !== "100%") // 指定了 width 属性，且不为 100%
            target.p().c(s_Width, JS_parseInt(target.a(s_Width)) + 4); // 4 为两边 border 的宽度
        else if (target.a(s_ViewBox) !== s_None) // 指定 width 为 100% 的情况
            target.p().c(s_Width, target.a(s_ViewBox).split(" ")[2] + "px");
        else
            target.p().c(s_Width, "100%");
    }
}

/**
 * 返回插图、表格、代码块上方的题注
 * @param caption 潜在的题注内容对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
function CaptionGenerator_getCaptions(caption, tagName) {
    let fcSet = [], // 题注集
        captionTagName = caption.prop(s_TagName),
        hideCaptionSrc = gFalse; // 是否隐藏题注源

    if (captionTagName !== gUndefined)
        captionTagName = captionTagName.l();

    let capResult = __parseCaptionSyntax(caption);
    // 双题注
    if (capResult[1] === 2) {
        fcSet = __getCaptionSet(caption, 2, capResult[0]);
        hideCaptionSrc = gTrue;
    }
    // 单题注
    else if (capResult[1] === 1) {
        fcSet = __getCaptionSet(caption, 1, capResult[0]);
        fcSet[1] = null;
        hideCaptionSrc = gTrue;
    }
    // 无题注语法，但由有 h1-h6 引导
    else if (captionTagName !== gUndefined && captionTagName.sW("h")) {
        fcSet[0] = caption.t().x();
        fcSet[1] = null;
        // 不能直接隐藏，会影响页内链接跳转至该位置
        // 设置为不可见，并调整位置布局实现隐藏效果，同时不影响跳转
        if (captionTagName === "h6") { // 只针对 h6，h1-h5不隐藏
           caption.c(s_Visibility, s_Hidden)
                .c(s_Position, s_Absolute);
        }
    }

    // 若成功匹配出题注，且内容不是 <img> 则隐藏原始内容
    if (hideCaptionSrc === gTrue && (tagName.sW("i") === gFalse || capResult[0] === 200)) {
        caption.hide();
    }
    return fcSet;

    /**
     * 返回匹配的题注数量
     * @returns [0] type, [1] number
     */
    function __parseCaptionSyntax(target) {
        let reg2 = /^!\[.+]".+"$/, // 有 2 个题注
            reg1 = /^!\[.+]$/, // 只有 1 个题注
            html = "";
        // 标准语法，双题注
        if (reg2.test(target.t().x()) === gTrue)
            return [100, 2]; // 100: 标准语法
        // 标准语法，单题注
        else if (reg1.test(target.t().x()) === gTrue)
            return [100, 1]; // 100: 标准语法
        // 简化语法
        else if ((html = target.h()) !== gUndefined) {
            if (html.sW("<em><mar") && html.eW("/em>")) {
                if (html.i("/u></mark>") === -1)
                    return [200, 1]; // 200: 简化语法
                else
                    return [200, 2]; // 200: 简化语法
            }
        }
        return [0, 0]; // 无题注
    }

    /**
     * 返回题注数据数组
     * @param target 题注数据的目标对象
     * @param count 题注数量
     * @param type 题注语法类型，100：标准，200：简化语法
     * @returns [0] 为第 1 个题注，[1] 为第 2 个题注
     */
    function __getCaptionSet(target, count, type) {
        let fcSet = [];
        // 标准语法
        if (type === 100) {
            let text = target.t().x();
            fcSet[0] = text.s(2, text.i("]", 2));
            if (count === 2)
                fcSet[1] = "▲ " + text.s(text.i("]\"", 2) + 2, text.length - 1);
        }
        // 简化语法
        else if (type === 200) {
            if (count === 2)
                fcSet[1] = "▲ " + target.f("u").t().x();
            target.f("mark > em").remove();
            fcSet[0] = target.t().x();
        }
        return fcSet;
    }
}

// ==================== 代码块增强类 ==================== //

/**
 * 初始化代码块
 */
function ExtCodeBlock_init() {
    // 获取自动生成题注并编号的行数下限，大于该行数的代码才会自动生成题注和编号
    let lmc = V_util_getParamVal("lmc");
    lmc = (lmc === gUndefined ? 1 : JS_parseInt(lmc));
    // 遍历所有代码块
    $("." + s_CssFences).e(function () {
        let _t = $(this);

        // 绑定内容助手
        ContentAssistor_bind(_t, s_Codeblock);

        // 折叠长代码块
        // if (ExtCodeBlock_blockCapNum !== gTrue)
            ContentFolder_add(_t);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        if (_t.f("." + s_CssCodeMirrorLine).length > lmc) {
            V_doc_counter_codeblock++;
            // 外套一个 <p> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
            _t.wrap("<p " + s_DataContainer + "='pre' class='v-cap-cntr'></p>");

            // 先根据题注语法生成题注
            // if (ExtCodeBlock_blockCapNum !== gTrue)
                CaptionGenerator_actionForTextContent(_t, "pre");
        }
        else {
            _t.a(s_DataLmc, s_True);
        }
    });
}

/**
 * 复制代码块内容增强版
 */
function ExtCodeBlock_copyContent(source) {
    V_report_push([s_Interactive, 'CodeBlock', 'Copy', 0]);
    // if (iCtAss.lastHover === undefined)
    //     return;

    let content = "",
        lines = ContentAssistor_lastHover.ch().f(".CodeMirror-code ." + s_CssCodeMirrorLine),
        lineNo = 0,
        lineCount = lines.length;
    // 逐行读取代码
    lines.e(function () {
        lineNo++;
        let encodeText = encodeURI($(this).t()),
            badChars = [
                "%E2%80%8B", // ZERO WIDTH SPACE \u200b
                "%C2%A0" // NO-BREAK SPACE \u00A0
            ],
            goodChars = [
                "", // 替换 ZERO WIDTH SPACE
                "%20" // for NO-BREAK SPACE
            ];
        // 清除特殊字符
        for (let i = 0; i < badChars.length; i++) {
            if (encodeText.i(badChars[i]) > -1)
                encodeText = encodeText.rA(badChars[i], goodChars[i]);
        }
        content += JS_decodeURI(encodeText) + (lineNo < lineCount ? "\n" : "");
    });

    // 复制目标内容
    if (V_util_holdKey_Alt() === gTrue) {
        let lang = "";
        if (ContentAssistor_lastHover !== gUndefined)
            lang = ContentAssistor_lastHover.a(s_Lang);
        content = "```" + (lang !== gUndefined ? lang : "") + "\n" + content + "\n```";
    }
    Copyer_action(source, content, function () {
        // 显示已复制动效
        let codeBlock = ContentAssistor_lastHover.ch().f(".CodeMirror-sizer>div");
        V_ui_removeAnimate(codeBlock);
        codeBlock.c(s_BackgroundColor, s_varMarkBg);
        // 延时后消退
        setTimeout(function () {
            V_ui_addAnimate(codeBlock);
            codeBlock.c(s_BackgroundColor, "inherit");
        }, 500);
    });
}

// ==================== 复制类 ==================== //

let Copyer_lastActionTime = 0,
    Copyer_processing = gFalse;

/**
 * 执行复制
 * @param source 触发复制动作的对象
 * @param content 要复制的内容
 * @param md 是否支持 as Markdown
 * @param successCallback 复制成功后的回调函数
 * @param errorCallback 复制失败后的回调函数
 */
function Copyer_action(source, content, md, successCallback, errorCallback) {
    Copyer_processing = gTrue;
    // 控制两次复制操作的时间间隔（同时也是解决嵌套情况下的复制失效问题）
    let ts = new Date().getTime();
    if (ts - Copyer_lastActionTime < 200) {
        Copyer_processing = gFalse;
        return;
    }

    Copyer_lastActionTime = ts;

    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    let targetName = "." + source.a(s_Class).rA(" ", ".");
    $(targetName).a(s_DataClipboardText, content);

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(targetName);

    // 复制成功事件
    clipboard.on("success", function(e) {
        // 显示复制成功提示
        let note = (md === gTrue && V_util_holdKey_Alt() === gTrue) ? " (<strong>as Markdown</strong>)" : "";
        iInfoTips.bubble([
            "已复制",
            // "已復制",
            "Copied",
            // "Copié",
            // "Kopiert",
            // "Copiado",
            // "Скопировано",
            // "コピー",
            // "복사"
        ][V_lang_id] + note, 2000, gFalse, source);

        e.clearSelection();

        typeof(successCallback) === s_Function && successCallback();
        Copyer_processing = gFalse;
    });
    // 复制失败事件
    clipboard.on(s_Error, function() {
        // 显示复制失败提示
        iInfoTips.error("<strong>" + [
            "非常抱歉～暂不支持在该浏览器中复制",
            // "非常抱歉～暫不支持在該瀏覽器中復制",
            "I'm very sorry~ I don't support copying in this browser",
            // "Je suis vraiment désolé ~ Je ne supporte pas la copie dans ce navigateur",
            // "Es tut mir sehr leid ~ Ich unterstütze das Kopieren in diesem Browser nicht",
            // "Lo siento mucho ~ No apoyo la copia en este navegador",
            // "Я очень сожалею ~ Я не поддерживаю копирование в этом браузере",
            // "すみません〜このブラウザでのコピーはサポートしていません",
            // "죄송합니다 ~이 브라우저에서 복사를 지원하지 않습니다"
        ][V_lang_id] + "</strong>", 3000, gFalse, source);

        typeof(errorCallback) === s_Function && errorCallback();
        Copyer_processing = gFalse;
    });
}

// ==================== 章节目录自动编号增强类 ==================== //

let ChpAutoNum_tocContent = gUndefined,
    ChpAutoNum_counter = [],
    ChpAutoNum_lastLevel = 1,
    // 自定义的自动编号格式模板（可只指定任意 h1~h6）
    ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }},h6{{❖ ### }}",
    // 默认的自动编号格式模板
    ChpAutoNum_tplSet = ChpAutoNum_tpl.split(","),
    ChpAutoNum_tpl_syntax = /h([1-6]){{(.*)(#(0*)(#|zh|ZH|alpha|ALPHA|roman|ROMAN|none)(-min|-sup)?#)(.*)}}/,
    ChpAutoNum_tpl_leftPad = ["", "", "", "", "", ""],
    ChpAutoNum_tpl_format = ["#", "#", "#", "#", "#", "#"], // 编号格式
    ChpAutoNum_tpl_formatOpt = [0, 0, 0, 0, 0, 0], // 特殊格式选项
    ChpAutoNum_tpl_prefix = ["", "", "", "", "", ""], // 前缀
    ChpAutoNum_tpl_suffix = ["", "", "", "", "", ""]; // 后缀

// 特殊格式选项
const CHPAUTONUM_TPL_FORMAT_OPT_NONE = 0, // 无
    CHPAUTONUM_TPL_FORMAT_OPT_MIN = 1, // -min
    CHPAUTONUM_TPL_FORMAT_OPT_SUP = 2; // -sup

/**
 * 初始化章节目录自动编号
 */
function ChpAutoNum_initToc() {
    if (ChpAutoNum_tocContent.isEmpty())
        return;

    // 重置自动编号格式模板
    ChpAutoNum_resetTpl();

    // 对目录大纲内的章节条目进行处理
    ChpAutoNum_resetCounter();
    ChpAutoNum_tocContent.ch(".md-toc-item").e(function () {
        let item = $(this);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(item.a("class")));
    });

    // 对文档中的章节条目进行处理
    ChpAutoNum_resetCounter();
    VOM_doc().ch("h1:not(:last-child), h2, h3, h4, h5").e(function () {
        let item = $(this);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(item.prop(s_TagName).l()));
    });

    // 对文档中的 h6 章节条目进行处理
    ChpAutoNum_resetCounter();
    VOM_doc().ch("h6:not(:first-child)").e(function () {
        $(this).a(s_DataHeaderNum, ChpAutoNum_tpl_prefix[5]);
    });

    function __genNumContent(item, lv) {
        let diff = lv - ChpAutoNum_lastLevel,
            absDiff = Math.abs(diff);
        // 当前层级比上一层级低
        if (diff > 0) {
            for (let i = 0; i < absDiff; i++)
                ChpAutoNum_push();
        }
        // 当前层级比上一层级高
        else if (diff < 0) {
            for (let i = 0; i < absDiff; i++)
                ChpAutoNum_pop();
        }
        // 当前层级与上一层级一样
        else {
            ChpAutoNum_counter[ChpAutoNum_lastLevel - 1]++;
        }

        item.a(s_DataHeaderNum, ChpAutoNum_toString());
    }
}

/**
 * 进入下一级的处理
 */
function ChpAutoNum_push() {
    ChpAutoNum_lastLevel++;
    ChpAutoNum_counter[ChpAutoNum_lastLevel - 1] = 1;
}

/**
 * 返回上一级的处理
 */
function ChpAutoNum_pop() {
    ChpAutoNum_counter[ChpAutoNum_lastLevel - 1] = 0;
    ChpAutoNum_lastLevel--;
    ChpAutoNum_counter[ChpAutoNum_lastLevel - 1]++;
}

/**
 * 重置自动编号计数器
 */
function ChpAutoNum_resetCounter() {
    ChpAutoNum_counter = [0, 0, 0, 0, 0, 0];
    ChpAutoNum_lastLevel = 1;
}

/**
 * 根据自动编号格式模板重新重置 h1~h6 自动编号格式
 */
function ChpAutoNum_resetTpl() {
    // 判断是否有指定自定义自动编号模板
    let metaTpl = V_util_getMetaByName("vlook-chp-autonum");
    if (metaTpl !== gUndefined)
        ChpAutoNum_tpl = metaTpl;
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{Chapter #alpha# }},h5{{### }},h4{{### - }},h3{{§ ###}}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{步骤 #000## }}";
    // ChpAutoNum_tpl = "h6{{X ### }}";
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }}";

    if (ChpAutoNum_tpl.length === 0)
        return;

    // 对自动编号格式模板内容进行处理
    let tplSet = ChpAutoNum_tpl.split(","),
        lv;
    for (let i = 0; i < tplSet.length; i++) {
        lv = tplSet[i].s(1, 2);
        if (!isNaN(lv))
            ChpAutoNum_tplSet[lv - 1] = tplSet[i].x();
    }

    // 解析自定义编码格式模板内容
    __parseTplItem(0); // h1
    __parseTplItem(1); // h2
    __parseTplItem(2); // h3
    __parseTplItem(3); // h4
    __parseTplItem(4); // h5
    __parseTplItem(5); // h6

    // 解析模板条目
    function __parseTplItem(lv) {
        let result = null;
        // result = ChpAutoNum_tplSet[lv].m(ChpAutoNum_tpl_syntax);
        // DEBUG(result);
        if ((result = ChpAutoNum_tplSet[lv].m(ChpAutoNum_tpl_syntax)) != null
            && result.length === 8) {
                ChpAutoNum_tpl_prefix[lv] = result[2];
                ChpAutoNum_tpl_leftPad[lv] = result[4];
                ChpAutoNum_tpl_format[lv] = result[5];
                ChpAutoNum_tpl_formatOpt[lv] =
                    (result[6] === "-min") ? CHPAUTONUM_TPL_FORMAT_OPT_MIN
                    : (result[6] === "-sup") ? CHPAUTONUM_TPL_FORMAT_OPT_SUP
                    : CHPAUTONUM_TPL_FORMAT_OPT_NONE;
                ChpAutoNum_tpl_suffix[lv] = result[7];
            // DEBUG(lv, ChpAutoNum_tpl_prefix[lv], ChpAutoNum_tpl_format[lv], ChpAutoNum_tpl_suffix[lv]);
        }
    }
}

/**
 * 将当前层级信息转换为字符串
 */
function ChpAutoNum_toString() {
    let lv = ChpAutoNum_lastLevel - 1,
        superLv = (lv > 0) ? lv - 1 : -1,
        opt = ChpAutoNum_tpl_formatOpt[lv],
        numStr = "";

    // 若指定了特殊的格式选项
    if (opt > CHPAUTONUM_TPL_FORMAT_OPT_NONE) {
        if (opt === CHPAUTONUM_TPL_FORMAT_OPT_SUP && superLv >= 0)
            numStr =  __formatNum(superLv, opt) + ".";
        numStr += __formatNum(lv, opt);
        // 结束并返回
        return ChpAutoNum_tpl_prefix[lv]
            + numStr
            + ChpAutoNum_tpl_suffix[lv];
    }

    // 没有指定特殊的格式选项
    for (let i = 0; i < ChpAutoNum_lastLevel; i++) {
        numStr += __formatNum(i, false);
        if (i < lv)
            numStr += ".";
    }

    return ChpAutoNum_tpl_prefix[lv]
        + numStr
        + ChpAutoNum_tpl_suffix[lv];

    /**
     * 指定层级的编号进行格式化
     * @param i 层级
     * @param opt 特殊格式选项
     */
    function __formatNum(i, opt) {
        let ns = "",
            counter = ChpAutoNum_counter[i],
            upperCase = (ChpAutoNum_tpl_format[i].s(0, 1).m(/[A-Z]/) != null),
            format = ChpAutoNum_tpl_format[i].l();

        // 十进制数字
        if (format === "#")
            ns += ChpAutoNum_leftPadForDecimal(counter, i);
        // 中文数字
        else if (format === "zh") {
            ns += (ChpAutoNum_lastLevel === 1)
                // h1
                ? ChpAutoNum_decimalToZh(counter, upperCase)
                // h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        // 英文字母
        else if (format === "alpha") {
            ns += (ChpAutoNum_lastLevel === 1 || opt > CHPAUTONUM_TPL_FORMAT_OPT_NONE)
                // h1
                ? ChpAutoNum_decimalToAlpha(counter, upperCase)
                // h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        // 罗马数字
        else if (format === "roman") {
            ns += (ChpAutoNum_lastLevel === 1 || opt > CHPAUTONUM_TPL_FORMAT_OPT_NONE)
                // h1
                ? ChpAutoNum_decimalToRoman(counter, upperCase)
                // h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        else if (format === "off")
            ns += "";
        return ns;
    }
}

/**
 * 解析 Typora 生成的目录大纲节点样式名称对应的目录层级（h1~h6）
 * @param value 包含 h1~h6 的标识内容，如：md-toc-h1、h1 等
 * @returns 目录层级：1~6
 */
function ChpAutoNum_parseTocHeaderLevel(value) {
    let lv = value.m(/(h([1-5]))/)[2];
    return isNaN(lv) ? 0 : JS_parseInt(lv);
}

/**
 * 左侧补 0
 * @param value 当前值
 * @param lv 级别
 * @returns
 */
function ChpAutoNum_leftPadForDecimal(value, lv) {
    let pad = ChpAutoNum_tpl_leftPad[lv].length,
        gap = pad - value.toString().length,
        padStr = "";
    if (gap > 0) {
        for (let i = 0; i < gap; i++)
            padStr += "0";
    }
    return padStr + value;
}

// 算法参考：https://blog.csdn.net/lavendersue/article/details/81066091
let ChpAutoNum_zhNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], // 数字
    ChpAutoNum_zhUnit = ["", "十", "百", "千", "万"]; // 单位，最大支持 99,999,999
/**
 * 数字格式转换：十进制 to 中文
 * @param num 十进制数字
 * @param upperCase 是否使用大写
 */
function ChpAutoNum_decimalToZh(num, upperCase) {
    let overWan = Math.floor(num / 10000),
        noWan = num % 10000;
    if (noWan.toString().length < 4)
        noWan = "0" + noWan;

    let numeral = overWan ? __numToZh(overWan) + "万" + __numToZh(noWan) : __numToZh(num);
    // 对于 10－19 的特殊处理
    if (num >= 10 && num <= 19)
        numeral = numeral.r("一十", "十");
    return upperCase ? __toZhUpperCase(numeral) : numeral;

    // 阿拉伯数字转换为中文数字
    function __numToZh(value) {
        let strArr = value.toString().split("").reverse();
        let newNum = "";
        for (let i = 0; i < strArr.length; i++) {
          newNum = (
            (i === 0 && strArr[i] === 0) ? ""
            : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? ""
            : ChpAutoNum_zhNum[strArr[i]] + (strArr[i] === 0 ? ChpAutoNum_zhUnit[0] : ChpAutoNum_zhUnit[i])
            ))
            + newNum;
        }
        return newNum;
    }

    // 将中文数字转换为大写
    function __toZhUpperCase(value) {
        return value.rA(/一/g, "壹")
            .rA(/二/g, "贰")
            .rA(/三/g, "叁")
            .rA(/四/g, "肆")
            .rA(/五/g, "伍")
            .rA(/六/g, "陆")
            .rA(/七/g, "柒")
            .rA(/八/g, "捌")
            .rA(/九/g, "玖")
            .rA(/十/g, "拾")
            .rA(/百/g, "佰")
            .rA(/千/g, "仟");
    }
}

/**
 * 数字格式转换：十进制 to 英文字母
 * @param value 十进制数字
 * @param upperCase 是否使用大写
 */
function ChpAutoNum_decimalToAlpha(value, upperCase) {
    let numeral = "";
    while (value > 0) {
        let m = value % 26
        if (m === 0)
            m = 26;
        numeral = String.fromCharCode(64 + JS_parseInt(m)) + numeral;
        value = (value - m) / 26;
    }
    return upperCase ? numeral : numeral.l();
}

// 罗马数字参考：https://baike.baidu.com/item/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97/772296
// 算法参考：https://www.mianshigee.com/note/detail/180314zvm/
let ChpAutoNum_romanNum = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"], // 罗马数字
    ChpAutoNum_romanNumArea = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]; // 进位区间
/**
 * 数字格式转换：十进制 to 罗马
 * @param value 十进制数字
 * @param upperCase 是否使用大写
 */
function ChpAutoNum_decimalToRoman(value, upperCase) {
    if (value <= 0 || value >= 4000)
       return value;
    let numeral = "";
    for (let i = 0; i < ChpAutoNum_romanNum.length; i++) {
       while (value >= ChpAutoNum_romanNumArea[i]) {
          value -= ChpAutoNum_romanNumArea[i];
          numeral += ChpAutoNum_romanNum[i];
       }
    }
    return upperCase ? numeral : numeral.l();
}

// ==================== 引用块增强类 ==================== //

let ExtQuote_icoClosed = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoFolded" class="v-blockquote-folder-ico"/></svg>&nbsp;',
    ExtQuote_icoOpened = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoUnfold" class="v-blockquote-folder-ico"/></svg>&nbsp;',
    ExtQuote_columnsGroupCount = 0,
    ExtQuote_processingUCH = gFalse;

/**
 * 初始化引用块以实现折叠支持
 */
function ExtQuote_init() {
    // 初始化彩虹引用的默认颜色标识
    let dcQuote = V_util_getParamVal("dc-quote");
    if (dcQuote !== gUndefined)
        RainbowQuote_defalutColor = dcQuote;

    // 遍历所有引用
    $(s_Blockquote).e(function () {
        let _t = $(this),
            matched = gFalse;
        // ====================
        // 针对引用内的段落
        _t.ch("p").e(function () {
            matched = __disposeQuoteFolder($(this));
        });
        // 针对引用内列表下的段落
        _t.f("li>p").e(function () {
            matched = __disposeQuoteFolder($(this));
        });
        // 注意：以上两个操作，须在插图初始化 ExtFigure_init() 之前执行，
        // 避免折叠段落内容的插图处理因以上操作重置了 DOM 导致失效
        // ====================

        // 存在折叠，则标记，不参与分栏引用的统一高度处理
        if (matched === gTrue)
            _t.a(s_DataFoldingQuote, gTrue);

        // --------------------
        // 默认引用，转换为彩虹引用
        let parentTag = _t.p().prop(s_TagName).l();
        // 跳过列表内、引用内的嵌套引用
        if (parentTag === "li" || parentTag === s_Blockquote)
            return gTrue;
        let rainbowQuote = gFalse;
        // 判断引用内是否包含了彩虹引用语法
        _t.f("code").e(function () {
            if ($(this).t().m(/^>(\(.+\))?$/i) != null) {
                rainbowQuote = gTrue;
                return gFalse;
            }
        });
        // 引用内不包含彩虹引用语法的，才进行不处理
        if (rainbowQuote === gFalse) {
            let preObj = _t.prev().a("class");
            // 不处理紧跟表格、插图、代码块、媒体后的引用
            if (preObj !== gUndefined && preObj.i("v-cap-") === -1)
                _t.append("<p><code>&gt;(" + RainbowQuote_defalutColor + ")</code></p>");
        }
    });

    // 针对分栏引用进行初始化
    ExtQuote_initColumns();
    // 针对分栏列表进行初始化
    ExtList_initColumns();

    /**
     * 展开/收起引用块
     * @param target 用于折叠其下引用块对象
     */
    function __toggleQuoteFolding(target) {
        if (target.a(s_DataBlockquoteFolded).sW("t")) {
            ExtQuote_unfold(target);
        }
        else {
            ExtQuote_fold(target);
        }
    }

    /**
     * 对引用的折叠进行处理
     * @param target 带折叠引子的行对象
     * @returns 是否存在折叠
     */
    function __disposeQuoteFolder(target) {
        let next = target.next(s_Blockquote),
            text = target.t(),
            matched = gFalse;

        // 默认收起
        if (text.sW("[+] ")
            && next.length > 0
            && next.prop(s_TagName).l().sW("bl")) { // <blockquote>
                matched = gTrue;
                // 分离折叠引子中的标题
                __separateTitle(target);

                // target.c(s_Color, "var(--h-f)");
                target.next(s_Blockquote).c(s_Display, s_None);
                target.rHTML("[+] ", "<span class='v-blockquote-folder'>" + ExtQuote_icoClosed + "</span>");

                target.a(s_DataBlockquoteFolded, s_True);

                // 因此处的 click 会与 $(document).uC().ck() 冲突
                // 所以改为 mouseup
                target.f("." + s_CssBlockquoteFolder).unbind(s_MouseUp).mouseup(function () {
                    V_report_push([s_Interactive, 'Quote', 'Fold/Unfold', 0]);
                    __toggleQuoteFolding(target);
                });
        }
        // 默认展开
        else if (text.sW("[-] ")) {
            matched = gTrue;
            // 分离折叠引子中的标题
            __separateTitle(target);

            // target.c(s_Color, "var(--h-f)");
            target.rHTML("[-] ", "<span class='v-blockquote-folder'>" + ExtQuote_icoOpened + "</span>"); // ⊖▽

            target.a(s_DataBlockquoteFolded, s_False);

            // 因此处的 click 会与 $(document).uC().ck() 冲突
            // 所以改为 mouseup
            target.f("." + s_CssBlockquoteFolder).unbind(s_MouseUp).mouseup(function () {
                V_report_push([s_Interactive, 'Quote', 'Fold/Unfold', 0]);
                __toggleQuoteFolding(target);
            });
        }
        return matched;
    }

    /**
     * 分离折叠引子中的标题
     * @param target 带折叠引子的行对象
     */
    function __separateTitle(target) {
        let firstSpan = target.ch("span:first"),
            text = firstSpan.t();
        // 折叠的标题与引子在同一个 <span> 对象内，则需要进行剥离
        if (text.length > 4) {
            let folder = text.s(0, 4);
            firstSpan.h(firstSpan.rHTML(/\[([+\-])]\s/, ""));
            firstSpan.before("<span>" + folder + "</span>");
        }
    }
}

/**
 * 对分栏引用进行初始化
 */
function ExtQuote_initColumns() {
    // 针对分栏引用进行修正
    // let groupId = 1;
    $("hr + blockquote").e(function () {
        ExtQuote_columnsGroupCount++;
        let _t = $(this),
            hr = _t.prev(),
            colCount = 0;

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        hr.c(s_Display, s_None);
        colCount = hr.prevUntil(":not(hr)").length + 2; // 计算分栏数量
        if (colCount > 2) // 有更多的 <hr>
            hr.prevUntil(":not(hr)").c(s_Display, s_None);

        // ----------------------------------------
        // 对分栏按组进行初始处理
        __groupingColumns(_t);
        _t.nextUntil(":not(blockquote)").e(function () {
            if (colCount > 0) {
                __groupingColumns($(this));
            }
        });

        // 进行分组标识
        function __groupingColumns(quote) {
            // 若为带折叠的引用，则跳过
            if (quote.a(s_DataFoldingQuote) === gTrue)
                return;

            quote.a(s_DataQuoteGroup, ExtQuote_columnsGroupCount);
            colCount--;
        }
    });
}

/**
 * 对文档内所有分栏，按组为单位进行统一高度处理
 */
function ExtQuote_uniteColumnsHeight() {
    if (ExtQuote_processingUCH === gTrue)
        return;

    ExtQuote_processingUCH = gTrue;
    for (let i = 1; i <= ExtQuote_columnsGroupCount; i++) {
        ExtQuote_uniteColumnsHeightForGroup(i);
    }
    ExtQuote_processingUCH = gFalse;
}

/**
 * 对指定组的分栏进行统一高度处理
 * @param groupId 分栏组 id
 */
function ExtQuote_uniteColumnsHeightForGroup(groupId) {
    // 找出同一组中最大的高度
    let maxHeight = 0,
        quote = $(s_Blockquote + "[" + s_DataQuoteGroup + "=" + groupId + "]");
    quote.e(function () {
        let _t = $(this);
        _t.c(s_Height, s_Auto);
        // 没有被小屏强制适配为不分栏时才处理
        if (_t.c(s_Display) !== s_Block) {
            let height = JS_parseInt(_t.c(s_Height));
            if (height > maxHeight)
                maxHeight = height;
        }
    });

    // 没有被小屏强制适配为不分栏时才处理
    if (quote.c(s_Display) !== s_Block) {
        // 将同一组中最大的高度
        quote.c(s_Height, maxHeight);
    }
}

/**
 * 根据设备类型自适应 hover 样式
 */
function ExtQuote_adjustHoverStyle() {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $("." + s_CssBlockquoteFolder).uH();
    else // 为折叠的引用的折叠控件绑定 hover 事件
        V_ui_bindHover($("." + s_CssBlockquoteFolder));
}

/**
 * 收起引用块
 * @param target 用于折叠其下引用块对象
 */
function ExtQuote_fold(target) {
    // 先恢复默认高度
    target.parentsUntil(s_Blockquote + "[" + s_DataQuoteGroup + "]").c(s_Height, s_Auto);

    target.next(s_Blockquote).c(s_Display, s_None);
    target.a(s_DataBlockquoteFolded, s_True);
    target.f("." + s_CssBlockquoteFolder).h(ExtQuote_icoClosed);
}

/**
 * 展开引用块
 */
function ExtQuote_unfold(target) {
    // 先恢复分组引用、普通引用默认高度
    target.parentsUntil(s_Blockquote + "[" + s_DataQuoteGroup + "]").c(s_Height, s_Auto);
    target.p().c(s_Height, s_Auto);

    target.next(s_Blockquote).c(s_Display, s_Block);
    target.a(s_DataBlockquoteFolded, s_False);
    target.f("." + s_CssBlockquoteFolder).h(ExtQuote_icoOpened);
}

/**
 * 自动展开引用块
 */
function ExtQuote_autoUnfold() {
    if (iParagraphNav.cur() === gUndefined)
        return;

    let target = iParagraphNav.cur();
    // 或目标段是引用块折叠操作区，且为未展开状态
    if (target.a(s_Class) !== gUndefined) {
        let folded = target.a(s_DataBlockquoteFolded);
        if (folded !== gUndefined && folded.sW("t"))
            // 模拟操作
            ExtQuote_unfold(target);
    }
}

// ==================== 列表增强类 ==================== //

/**
 * 对分栏列表进行初始化
 */
function ExtList_initColumns() {

}

// ==================== 表格增强类 ==================== //

/**
 * 初始化表格数据
 */
function ExtTable_init() {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 表格预处理
    sw.st();
    $(s_Table).e(function () {
        let _t = $(this),
            container = _t.p();

        V_doc_counter_table++;

        // 绑定内容助手
        ContentAssistor_bind(_t, s_Table);

        // 表格自定义属性数据
        container.a(s_DataContainer, s_Table);
        JQ_addClass(container, s_CssCaptionContainer);

        // 表格滚动事件
        container.scroll(function () {
            TableCross_hide();
        });

        // 表格单元格初始化处理
        __initCell(_t);

        // if (ExtTable.blockCapNum !== gTrue) {
            // 折叠长表格
            ContentFolder_add(_t);
            // 先根据题注语法生成题注
            CaptionGenerator_actionForTextContent(_t, s_Table);
        // }
    }); // table
    sw.ed("    ├ Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    sw.st();
    $(s_Table + "[" + s_DataCellMerge + "='true']").e(function () {
        let _t = $(this);
        CellMerge_dispose(_t);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        _t.f("thead>tr>th").e(function () {
            ColumnFormatting_init(_t, $(this));
        });
    });
    sw.ed("    ├ Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标记为带列格式的表格，进行列格式化处理
    sw.st();
    $(s_Table + "[" + s_DataColumnFmting + "='true']").e(function () {
        ColumnFormatting_format($(this));
    });
    sw.ed("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    sw.st();
    $(s_Table + "[" + s_DataRowGroup + "='true']").e(function () {
        let _t = $(this);
        RowGroup_init(_t);

        // 修正行分组的首个单元格的缩进
        _t.f("tr[" + s_DataFolder + "='true']").e(function () {
            let td = $(this).ch("td:first");
            if (td.a(s_DataIdentLevel) !== gUndefined)
                td.c(s_PaddingLeft, "0.5em");
        });
    });
    sw.ed("    ├ Row Group: ");

    // ----------------------------------------
    // 表格单元格重复表头引用处理，group 模式重复将在行分组展开/收起时再进行处理
    sw.st();
    $(s_Table + "[" + s_DataThRpt + "='true']").e(function () {
        ThRepeater_init( $(this));
    });
    sw.ed("    └ Th Repeater: ");

    /**
     * 表格单元格初始化
     * @param table 表格对象
     */
    function __initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0,
            maxCol = 0;
        table.f("thead>tr").e(function () {
            colIndex = 0;
            let needCheckCellMerge = gTrue,
                needCheckColumnFormatting = gTrue,
                needCheckThRpt = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(this).f("th").e(function () {
                let th = $(this),
                    text = th.t();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === gTrue
                    && table.a(s_DataCellMerge) !== s_True
                    && (CellMerge_syntax_row.test(text) === gTrue
                    || CellMerge_syntax_col.test(text) === gTrue)) {
                        // 将表格标记为带合并单元格语法
                        table.a(s_DataCellMerge, s_True);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带列格式语法
                if (needCheckColumnFormatting === gTrue) {
                    if (ColumnFormatting_init(table, th) === gTrue)
                        needCheckColumnFormatting = gFalse;
                }
                // 检测是否带重复表头语法
                if (needCheckThRpt === gTrue
                    && colIndex === 0 // 只检测第 1 列
                    && ThRepeater_syntax_tag.test(text) === gTrue) {
                        // 将表格标记为带行折叠语法
                        table.a(s_DataThRpt, s_True);
                        th.rHTML("## ", "");
                        needCheckThRpt = gFalse;
                }

                // ----------------------------------------
                // 添加列号标识，用于列格式化时使用
                th.a(s_DataTblCol, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 非列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross_bind(table, th);
            });
            if (colIndex > maxCol)
                maxCol = colIndex;
        });

        // ----------------------------------------
        // 遍历表格「非列头」行
        table.f("tbody>tr").e(function () {
            let colIndex = 0,
                needCheckCellMerge = gTrue,
                needCheckRowGroup = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(this).f("td").e(function () {
                let td = $(this),
                    text = td.t();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === gTrue
                    && table.a(s_DataCellMerge) !== s_True
                    && (CellMerge_syntax_row.test(text) === gTrue
                    || CellMerge_syntax_col.test(text) === gTrue)) {
                        // 将表格标记为带合并单元格语法
                        table.a(s_DataCellMerge, s_True);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带行折叠语法
                if (needCheckRowGroup === gTrue
                    && colIndex === 0 // 只检测第 1 列
                    && table.a(s_DataRowGroup) !== s_True
                    && RowGroup_syntax_tag.test(text) === gTrue) {
                        // 将表格标记为带行折叠语法
                        table.a(s_DataRowGroup, s_True);
                        needCheckRowGroup = gFalse;
                }
                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<ma.+rk>$/.test(td.h()) === gTrue) {
                    td.ch().ch().unwrap(); // 解包 <mark>
                    JQ_addClass(td, s_CssTableColumnFormatMark);
                }

                // 添加列号标识，用于列格式化时使用
                td.a(s_DataTblCol, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross_bind(table, td);
            }); // find(th, td)
        }); // find(tr)
    }
}

// ==================== 表格单元格合并类 ==================== //

// 单元格合并语法
let CellMerge_syntax_row = /^(:|\^\^)$/, // 行，纵向合并
    CellMerge_syntax_col = /^(==|<<)$/ // 列，横向合并

/**
 * 表格单元格合并
 * @param table 要进行单元格合并处理的表格对象
 */
function CellMerge_dispose(table) {
    let colSpanCount = 0,
        colSpanCell = null,
        colIndex = 0,
        colCount = 0,
        lastCell = null,
        tblData = [],
        tblSpan = [],
        tblTd2ThData = [],
        rowIndex = 0,
        needRowSpan = gFalse;

    // 遍历表格行
    table.f("tr").e(function () {
        tblData[rowIndex] = [];
        tblSpan[rowIndex] = [];
        let tr = $(this);
        tr.f("td, th").e(function () {
            let cell = $(this);

            // --- 行合并：预处理（纵向） ---
            // 克隆表格数据
            tblData[rowIndex][colIndex] = cell;
            tblSpan[rowIndex][colIndex] = 0;
            if (CellMerge_syntax_row.test(cell.t()) === gTrue) {
                tblSpan[rowIndex][colIndex] = 1;
                needRowSpan = gTrue;
            }
            colIndex++;
            colCount++;

            // --- 列合并（横向） ---
            // 是列合并标记
            if (CellMerge_syntax_col.test(cell.t()) === gTrue) {
                colSpanCount++;
                cell.remove();
                if (colSpanCount === 1)
                    colSpanCell = lastCell;
            }
            // 不是列标记，则进行最近列标记数据进行处理
            else {
                if (colSpanCount > 0 && colSpanCell != null) {
                    colSpanCell.a(s_ColSpan, colSpanCount + 1);
                    CellMerge_emptyBlankCell(colSpanCell);
                    colSpanCell.c(s_TextAlign, "center");
                    // colSpanCell.c(s_VerticalAlign, "middle");
                }
                colSpanCount = 0;
            }
            lastCell = cell;
        }); // find(td, th)

        // 如果列合并了所有列，且内容为空，则取消表格行号等样式
        if (colCount === colSpanCount + 1 && tr.t().x().length === 0) {
            JQ_addClass(tr, "v-table-colspan-all");
        }

        // 列间合并：对于最后一列的补充处理
        if (colSpanCount > 0 && colSpanCell != null) {
            colSpanCell.a(s_ColSpan, colSpanCount + 1);
            CellMerge_emptyBlankCell(colSpanCell);
            colSpanCell.c(s_TextAlign, "center");
            // colSpanCell.c(s_VerticalAlign, "middle");
        }
        colSpanCount = 0;

        rowIndex++;
        colIndex = 0;
        colCount = 0;
    }); // tr

    rowIndex = 0;

    // --- 行间合并（纵向）---
    if (needRowSpan === gTrue) {
        tblTd2ThData = [];
        // 列式遍历（从左到右）
        for (let c = 0, len = tblSpan[0].length; c < len; c++) {
            let rowSpanCount = 0,
                rowSpanCell = null;
            let r = 0,
                thSpanFlag = gFalse;

            // 列式遍历（从上到下）
            while (r < tblSpan.length) {
                if (tblSpan[r][c] === 1) { // 要合并
                    rowSpanCount++;
                    if (rowSpanCell == null) {
                        rowSpanCell = tblData[r - 1][c];
                    }
                    // 记录最大列头行合并深度
                    if (r === 1)
                        thSpanFlag = gTrue;
                    if (thSpanFlag === gTrue)
                        tblTd2ThData[tblTd2ThData.length] = tblData[r][c].p();
                    tblData[r][c].remove(); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    if (c + 1 < tblSpan[r].length)
                        tblData[r][c + 1].c(s_PaddingLeft, "5px");
                } else {
                    thSpanFlag = gFalse;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell != null) {
                        rowSpanCell.a(s_RowSpan, rowSpanCount + 1);
                        CellMerge_emptyBlankCell(rowSpanCell);
                        // rowSpanCell.c(s_TextAlign, "center");
                        rowSpanCell.c(s_VerticalAlign, "middle");
                        rowSpanCount = 0;
                        rowSpanCell = null;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell != null) {
                rowSpanCell.a(s_RowSpan, rowSpanCount + 1);
                CellMerge_emptyBlankCell(rowSpanCell);
                // rowSpanCell.c(s_TextAlign, "center");
                rowSpanCell.c(s_VerticalAlign, "middle");
            }
        } // for

        // 处理列头的纵向合并（行合并）
        for (let i = 0, len = tblTd2ThData.length; i < len; i++) {
            tblData[0][0].p().p().append(tblTd2ThData[i]);
            // 将 thead 内的 td 标签转换为 th
            let foundTd = gFalse;
            tblTd2ThData[i].f("td").e(function () {
                foundTd = gTrue;
                // 暂存 td 的属性数据
                let td = $(this),
                    style = td.a(s_Style),
                    tblCol = td.a(s_DataTblCol),
                    classValue = td.a(s_Class),
                    colspan = td.a(s_DataColspan);
                // td 转换为 th 标签
                td.a(s_DataTd2th, s_True);
                td.prop("outerHTML", td.prop("outerHTML").rA("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.p().a(s_Style, style);
                td.p().a(s_DataTblCol, tblCol);
                td.p().a(s_Class, classValue);
                td.p().a(s_DataColspan, colspan);
            });
            // 对被从 td 转换为 th 单元格，重新绑定：鼠标点击单元格时显示阅读模式（十字光标）
            if (foundTd === gTrue) {
                tblTd2ThData[i].f("th[" + s_DataTd2th + "]").e(function () {
                    TableCross_bind(table, $(this));
                });
            }
        }
    } // if

    needRowSpan = gFalse;
}

/**
 * 清空单元格内容（无内容情况下清空空格 &nbsp;）
 * @param cell 表格单元格对象
 */
function CellMerge_emptyBlankCell(cell) {
    if (cell.t().x().length === 0) {
        cell.h("");
        JQ_addClass(cell, "v-empty-cell");
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

let TableCross_enabled = gFalse,
    TableCross_ui = gUndefined,
    TableCross_lastTable = gUndefined, // 最后/当前显示阅读模式（十字光标）的表格
    TableCross_lastCell = gUndefined; // 最后/当前显示阅读模式（十字光标）的表格单元格

function TableCross_init() {
    TableCross_ui = $(".v-table-cross");
    V_ui_addAnimate(TableCross_ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
function TableCross_toggle(table) {
    // 已打开，则关闭
    if (TableCross_enabled)
        TableCross_disable();
    // 未打开，则打开
    else
        TableCross_enable(table);
}

// 打开表格阅读模式（十字光标）
function TableCross_enable(table) {
    V_report_push([s_Presentation, 'Table Cross', s_Enabled, 0]);

    TableCross_enabled = gTrue;
    JQ_addClass(ContentAssistor_btns_tableCross, s_Selected);

    if (table !== gUndefined && table != null)
        table.p().p().next("." + s_CssContentExpander).ch(".v-btn").tr(s_Click);
}

// 关闭表格阅读模式（十字光标）
function TableCross_disable() {
    TableCross_enabled = gFalse;
    JQ_removeClass(ContentAssistor_btns_tableCross, s_Selected);
    TableCross_hide();
}

/**
 * 绑定单元格，鼠标点击单元格时显示阅读模式（十字光标）
 * @param table 单元格所属表格对象
 * @param cell 单元格对象
 */
function TableCross_bind(table, cell) {
    cell.uC().ck(function () {
        if (TableCross_enabled === gFalse || Copyer_processing === gTrue)
            return;

        // vvv 不同表格之间点击，先强制移除动画 vvv
        if (TableCross_lastTable !== table)
            V_ui_removeAnimate(TableCross_ui);

        // 同一单元格不重复处理
        if (TableCross_lastCell === cell)
            return;

        let container = table.p().p();
        // 跳过被折叠表格
        if (container.a(s_DataContentFolded).sW("t"))
            return;

        // 若点击同时也触发了「代码 / 标签 / 徽章」的复制
        if (Copyer_processing === gFalse)
            event.stopPropagation(); // 停止事件冒泡，避免与其他事件的处理冲突（如：document.click）

        TableCross_hide();
        JQ_addClass(cell, s_CssTableCrossCell);

        TableCross_lastCell = cell;
        TableCross_lastTable = table;

        let tblWidth = JS_parseInt(table.c(s_Width)),
            tblHeight = JS_parseInt(table.c(s_Height));
            // scrollLeft = container.scrollLeft();

        let cellWidth = JS_parseInt(cell.c(s_Width)),
            cellHeight = JS_parseInt(cell.c(s_Height)),
            cornerLeftX = table.o().left,
            cornerUpY = table.o().top,
            cornerLeftWidth = cell.o().left - table.o().left,
            cornerUpHeight = cell.o().top - table.o().top,
            cornerRightX = cell.o().left  + cellWidth,
            cornerDownY = cell.o().top + cellHeight,
            cornerRightWidth = tblWidth - cornerLeftWidth - cellWidth,
            cornerDownHeight = tblHeight - cornerUpHeight - cellHeight;

        // 1. 左上角
        let leftUp = $(s_CssTableCross + ".left-up");
        leftUp.c(s_Left, cornerLeftX)
            .c(s_Top, cornerUpY)
            .c(s_Width, cornerLeftWidth)
            .c(s_Height, cornerUpHeight)
            .c(s_Zindex, 9);

        // 2. 右上角
        let rightUp = $(s_CssTableCross + ".right-up");
        rightUp.c(s_Left, cornerRightX)
            .c(s_Top, cornerUpY)
            .c(s_Width, cornerRightWidth)
            .c(s_Height,  cornerUpHeight)
            .c(s_Zindex, 9);

        // 3. 左下角
        let leftDown = $(s_CssTableCross + ".left-down");
        leftDown.c(s_Left, cornerLeftX)
            .c(s_Top, cornerDownY)
            .c(s_Width, cornerLeftWidth)
            .c(s_Height, cornerDownHeight)
            .c(s_Zindex, 9);

        // 4. 右下角
        let rightDown = $(s_CssTableCross + ".right-down");
        rightDown.c(s_Left, cornerRightX)
            .c(s_Top, cornerDownY)
            .c(s_Width, cornerRightWidth)
            .c(s_Height, cornerDownHeight)
            .c(s_Zindex, 9);

        // 须延时后再执行显示，让以上代码先完成
        setTimeout(function () {
            // 针对不同表格之间点击强制移除动画后的恢复
            V_ui_addAnimate(TableCross_ui);
            V_ui_show(leftUp);
            V_ui_show(rightUp);
            V_ui_show(leftDown);
            V_ui_show(rightDown);
        }, 50);
    });
}

/**
 * 隐藏表格阅读模式（十字光标）
 */
function TableCross_hide() {
    if (TableCross_lastCell === gUndefined)
        return;

    V_ui_hide(TableCross_ui);

    JQ_removeClass(TableCross_lastCell, s_CssTableCrossCell);
    // TableCross_lastCell = gUndefined;
    TableCross_lastTable = gUndefined;
}

/**
 * 判断当前内容块是否与已显示了阅读模式（十字光标）的表格重叠
 * @param target 内容块对象
*/
function TableCross_checkFallWith(target) {
    return (TableCross_lastTable !== gUndefined
        && target.ch().a(s_Id) === TableCross_lastTable.a(s_Id));
}

// ==================== 表格列格式化类 ==================== //

let ColumnFormatting_syntax_checkbox = /^\[(\s|x|-)](\s.+)*/; // 复选框列格式语法

/**
 * 初始化
 * @param table 表格对象
 * @param cell 单元格对象
 */
function ColumnFormatting_init(table, cell) {
    // WARN(cell.t(), ColumnFormatting_syntax_checkbox.test(cell.t()));
    if (table.a(s_DataColumnFmting) !== s_True
        && (cell.f("strong, em, u, mark, del").length > 0 // 普通列格式
        || cell.c(s_TextAlign) === s_Right // 右对齐表示使用数值格式
        || ColumnFormatting_syntax_checkbox.test(cell.t()) === gTrue)) { // 复选框列格式
            // 将表格标记为带列格式语法
            table.a(s_DataColumnFmting, s_True);
            return gTrue; // 匹配到列格式
    }
    return gFalse; // 未匹配到列格式
}

/**
 * 返回表格内所有非合并的同列单元格对象集合
 * @param table 表格格对象
 * @param th 列头单元格对象
 * @param cells 集合变量
 */
function ColumnFormatting_getCells(table, th, cells) {
    if (cells === gUndefined)
        cells = table.f("[" + s_DataColspan + "!='true'][" + s_DataTblCol + "='" + th.a(s_DataTblCol) + "']");
    return cells;
}

/**
 * 返回表格 tbody 内的同列单元格对象集合
 * @param table 表格格对象
 * @param th 列头单元格对象
 * @param tbodyCells 集合变量，为 gUndefined 则重新生成
 */
function ColumnFormatting_getTbodyCells(table, th, tbodyCells) {
    if (tbodyCells === gUndefined)
        tbodyCells = table.f("td[" + s_DataTblCol + "='" + th.a(s_DataTblCol) + "']");
    return tbodyCells;
}

/**
 * 列格式化
 * @param table 表格对象
 */
function ColumnFormatting_format(table) {
    table.f("thead th").e(function () {
        let th = $(this),
            cells = gUndefined,
            tbodyCells = gUndefined,
            cellsCSS = "";

        // 粗体
        if (th.f("strong:first-child").length > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += "v-tbl-col-fmt-bold ";
        }

        // 斜体
        if (th.f("em:first-child").length > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += "v-tbl-col-fmt-em ";
        }

        // 高亮
        let thHTML = th.h();
        if (thHTML.sW("<mar") && thHTML.eW("rk>") // <mark>...</mark>
            || th.a(s_Class) !== gUndefined
            && th.a(s_Class).i(s_CssTableColumnFormatMark) > -1) {
                $("[" + s_DataTblCol + "='" + th.a(s_DataTblCol) + "']").f("mark").ch().unwrap();
                cells = ColumnFormatting_getCells(table, th, cells);
                cellsCSS += "v-tbl-col-fmt-mark ";
        }

        // 批量添加以上列样式
        if (cells !== gUndefined && cellsCSS.length > 0)
        JQ_addClass(cells, cellsCSS);

        // 下划线
        if (th.f("u:first-child").length > 0) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            tbodyCells.contents().wrap("<u></u>");
        }

        // 删除线
        if (th.f("del:first-child").length > 0) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            tbodyCells.contents().wrap("<del></del>");
        }

        // 复选框
        if (ColumnFormatting_syntax_checkbox.test(th.t()) === gTrue) {
            cells = ColumnFormatting_getCells(table, th, cells);
            JQ_addClass(cells, "v-tbl-col-fmt-checkbox");

            // 删除列头的复选框语法
            ColumnFormatting_removeCheckboxSyntax(th);

            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);

            tbodyCells.e(function () {
                let ce = $(this),
                    syntaxText = ce.t(),
                    chkStatus = "uncheck",
                    chkStyle = s_Dark;

                // 跳过横向合并的单元格
                if (ce.a(s_ColSpan) !== gUndefined)
                    return gTrue;

                // 移除单元格的复选框语法内容
                ColumnFormatting_removeCheckboxSyntax(ce);

                // 指定为 checked- 已选择
                if (syntaxText.sW("[x]"))
                    chkStatus = s_Checked;
                // 指定为 indeterminate - 不确定选择
                else if (syntaxText.sW("[-]"))
                    chkStatus = "indeterminate";
                // 无指定
                else
                    ce.rHTML("&nbsp;", "");

                // 添加复选框样式
                ce.prepend("<svg width='14px' height='14px' class='v-svg-small-ico'><use xlink:href='#icoCheckbox_"
                    + chkStatus + "' class='v-svg-ico-" + chkStyle + "'/></svg>");
            });
        }

        // 数值格式
        if (th.c(s_TextAlign).sW("r")) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            JQ_addClass(tbodyCells, "v-tbl-col-fmt-num");
            // 数值格式化处理
            tbodyCells.e(function () {
                let ce = $(this),
                    text = ce.t();
                // 内容为数值
                if (text.isNumber()) {
                    // 添加千位符
                    ce.h(V_formatting_decimal( // 添加千位符
                        V_formatting_thousands(ce.h()))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting_coloringNumber(ce, text, gTrue);
                }
                // 内容为百分数
                else if (text.isPercent()) {
                    // 对小数进行处理
                    ce.h(V_formatting_percent( // 对小数进行处理
                        V_formatting_decimal(ce.h()))); // 对百分数进行格式化处理
                    // 根据正负号进行着色处理
                    let coloring = ColumnFormatting_coloringNumber(ce, text, gTrue),
                        percent = text.r(/(-|\+|\s)/g, ""),
                        percentValue = JS_mathRound(percent.r("%", "")),
                        bg1 = "rgba(128, 128, 128, 0.1)",
                        bg2 = "rgba(128, 128, 128, 0.4)",
                        bgSplit = "rgba(128, 128, 128, 0.8)";
                    // 对有首色的进行渐变颜色调整
                    if (coloring === gTrue) {
                        let baseBg = ce.c(s_Color).r("rgb", "rgba");
                        bg1 = baseBg.r(")", ", 0.05)");
                        bg2 = baseBg.r(")", ", 0.2)");
                        bgSplit = baseBg.r(")", ", 0.7)");
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.c(s_Background, "linear-gradient(90deg, " + bg1 + " 0%, " + bg2 + " " + (percentValue > 1 ? percentValue - 1 : 0)
                        + "%, " + bgSplit + " " + percent
                        + ", transparent " + percent + ")")
                            .c(s_MinWidth, "100px");
                    // 对 +/- 符号进行处理
                    ce.h(ce.h().r(">+", ">▴ ").r(">-", ">▾ "));
                }
                // 内容为货币
                else if (text.isCurrency()) {
                    // 对货币符号进行格式货
                    ce.h(V_formatting_decimal( // 对货币符号进行格式货
                        V_formatting_thousands( // 添加千位符
                            V_formatting_currency(ce.h())))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting_coloringNumber(ce, text, gFalse);
                }
            });
        } // 数值格式

        // 标记单元格是否为横向合并，横向合并的单元不应用列格式
        if (th.a(s_ColSpan) !== gUndefined)
            th.a(s_DataColspan, s_True);
        else
            th.a(s_DataColspan, s_False);
    });
}

/**
 * 根据数值的正、负号进行着色处理
 * @param target 着色的对象
 * @param text 依据的数值文本
 * @param mode 正负号位置模式，true：在开头，false: 在任意位置
 * @returns boolean 着色结果，true：有着色，false：没有着色
 */
function ColumnFormatting_coloringNumber(target, text, mode) {
    // 正、负号在文本的开头
    if (mode === gTrue) {
        if (text.sW("-")) {
            JQ_addClass(target, s_CssTableColumnFormatNumNeg);
            return gTrue;
        }
        else if (text.sW("+")) {
            JQ_addClass(target, s_CssTableColumnFormatNumPos);
            return gTrue;
        }
    }
    // 正、负号在文本的任意位置
    else {
        if (text.i("-") > -1) {
            JQ_addClass(target, s_CssTableColumnFormatNumNeg);
            return gTrue;
        }
        else if (text.i("+") > -1) {
            JQ_addClass(target, s_CssTableColumnFormatNumPos);
            return gTrue;
        }
    }
    return gFalse;
}

/**
 * 移除复选框的语法内容
 */
function ColumnFormatting_removeCheckboxSyntax(target) {
    target.rHTML(/\[(\s|x|-)]\s*/, "");
}

// ==================== 表格行分组/折叠类 ==================== //

let RowGroup_folderCount = 0, // 折叠行内行分组类型的数量
    RowGroup_syntax_tag = /^>+(\s)./, // 用于匹配行折叠语法
    RowGroup_syntax_tag2Replace = /(&gt;)+(\s)/, // 用于匹配将行折叠语法替换为指定字符
    RowGroup_spliter = "> ", // 行折叠语法与内容的分隔标识
    RowGroup_parentStack = [], // 上级行的堆栈
    RowGroup_colorStack = [], // 不同分组的背景颜色堆栈
    // 表格折叠行图标：已收起
    RowGroup_icoClosed = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoFolded" class="v-rowgroup-folder-ico"/></svg>',
    // 表格折叠行图标：已展开
    RowGroup_icoOpened = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoUnfold" class="v-rowgroup-folder-ico"/></svg>';

/**
 * 初始化
 * @param table 表格对象
 */
function RowGroup_init(table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    JQ_addClass(table.f("[" + s_DataTblCol + "$='-0']"), s_CssTableRowGroupNotFolder);

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0; // 当前缩进等级
        // bgColor = new RandomColor();

    // 遍历所有行的第 1 个单元格
    table.f("td:first-child").e(function () {
        let td = $(this),
            tr = td.p(),
            text = td.t();

        // 判断每行的首列，是否有行折叠标记
        // 没有则进入下一个循环
        if (RowGroup_syntax_tag.test(text) === gFalse) {
            lastLevel = 0;
            RowGroup_parentStack.length = 0;
            RowGroup_colorStack.length = 0;
            return gTrue;
        }

        // 从语法中获得当前缩进等级
        currentLevel = text.i(RowGroup_spliter) + 1;
        // 当前等级比上一次等级要深
        if (currentLevel > lastLevel) {
            let beforeChanged = lastLevel;
            lastLevel = currentLevel;
            // 设置为新的行分组
            RowGroup_newFolder(tr, currentLevel, beforeChanged === 0,
                RandomColor_format(RandomColor_dissimilarRgb(), s_varTblRowAlpha));
            // 设置为行缩进行
            RowGroup_ident(tr, td, currentLevel);
        }
        // 当前等级不比上一次等级要深
        else {
            // 获得等级差进行
            let count = lastLevel - currentLevel;
            // 获得当前行对应的上级行
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    RowGroup_parentStack.pop();
                    RowGroup_colorStack.pop();
                }
            }
            lastLevel = currentLevel;
            // 设置为行缩进行
            RowGroup_ident(tr, td, currentLevel);
        }
    });
}

/**
 * 获得最近一个分组行分组对象
 */
function RowGroup_lastParent() {
    return RowGroup_parentStack[RowGroup_parentStack.length - 1];
}

/**
 * 获得最近一个分组颜色对象
 */
function RowGroup_lastColor() {
    return RowGroup_colorStack[RowGroup_colorStack.length - 1];
}

/**
 * 设置为新的行分组
 * @param tr 对应的行对象
 * @param level 缩进层级
 * @param reset 是否重置回第一级
 * @param color 该分组背景色
 */
function RowGroup_newFolder(tr, level, reset, color) {
    let folderRow = tr.prev();
    RowGroup_folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup_parentStack.push(RowGroup_folderCount);
    // 将当前行分组的随机背景颜色入栈
    RowGroup_colorStack.push(color);

    // 设置折叠行分组的属性
    folderRow.a(s_DataFolderId, RowGroup_folderCount);
    folderRow.a(s_DataFolder, s_True);
    folderRow.a(s_DataRowFolded, s_True);

    // // 生成新的行分组的标识颜色
    // let tbody = tr.p(),
    //     prevLevel = folderRow.prev().ch("td:first").a(s_DataIdentLevel),
    //     curentLevel = folderRow.ch("td:first").a(s_DataIdentLevel),
    //     c1 = folderRow.prev().c(gStrBackgroundColor);

    // // 修正背景色中的透明度不为 CSS 变量的情况
    // if (c1 !== gUndefined) {
    //     let alphaIdx = c1.i(", 0.");
    //     if (alphaIdx > -1)
    //     c1 = c1.s(0, alphaIdx) + ", var(--tbl-row-g-alpha))";
    // }
    // // 当前行分组的缩进等级，与前一行的缩进等级不同，则用父分组的背景色
    // if (curentLevel !== gUndefined && prevLevel !== gUndefined && curentLevel !== prevLevel) {
    //     let parentFolder = tbody.f("tr[" + s_DataFolder + "-id=" + folderRow.a(s_DataParentFolderId) +"]");
    //     c1 = parentFolder.a("vk-bg");
    // }

    // // 上一行没有背景，直接单色填充
    // if (c1 === "rgba(0, 0, 0, 0)" || reset === gT) {
    //     c1 = RowGroup_lastColor();
    //     folderRow.a("vk-bg", c1);
    //     folderRow.c({
    //         gStrBackgroundColor : c1
    //     });
    // }
    // // 上一行有背景色，则采用组合背景色表达其从属的相关性
    // else {
    //     let c2 = RowGroup_lastColor(),
    //         c1Width = level * 50;
    //     folderRow.a("vk-bg", c1);
    //     folderRow.c({
    //         s_Background :
    //             "linear-gradient(135deg, " + c1 + " " + c1Width + "px, var(--pn-c-alt) " + (c1Width + 1) + "px, "
    //             + c2 + " " + (c1Width + 1) + "px)"
    //     });
    // }

    // 获得折叠行分组首个单元格
    let td = folderRow.ch("td:first"),
        tdHadIdent = td.f(".v-tbl-row-g-identer:last");

    // 设置折叠控件样式
    if (tdHadIdent.length > 0)
        tdHadIdent.after("<span class='v-tbl-row-g-btn'>" + RowGroup_icoClosed + "</span>");
    else
        td.prepend("<label class='v-tbl-row-g-btn'>" + RowGroup_icoClosed + "</label>");

    // 调整折叠行的缩进样式
    JQ_removeClass(td, s_CssTableRowGroupNotFolder);
    JQ_addClass(td, "v-tbl-row-g-folder");
    JQ_addClass(tdHadIdent, "v-tbl-row-g-identer-folder");

    // 添加代表目录的括号及样式
    // 重新组合生成新的单元格内容，以支持原始带格式的单元格内容
    let preClass = ".v-tbl-row-g-identer, " + s_CssTableRowGroupBtn,
        preObjs = td.f(preClass),
        cloneTd = td.clone();
    cloneTd.ch(preClass).remove();
    td.h(__echoOuterHTML(preObjs) + " <span class='folder-marker'>[</span> <strong>" + cloneTd.h() + " </strong><span class='folder-marker'>]</span>");

    // 设置展开、收起事件
    td.ch(s_CssTableRowGroupBtn).ck(function () {
        RowGroup_toggle(folderRow);
    });

    /**
     * 遍历获得指定对象集合的所有 outerHTML 内容
     * @param objectSet 对象集合
     * @returns String
     */
    function __echoOuterHTML(objectSet) {
        let outerHTML = "";
        objectSet.e(function () {
            outerHTML += $(this).prop("outerHTML");
        });
        return outerHTML;
    }
}

/**
 * 展开、收起表格行分组下的表格行
 * @param folderRow 折叠按钮所在的表格行对象
 */
function RowGroup_toggle(folderRow) {
    // 取消事件冒泡，用于避免显示表格的阅读模式（十字光标）
    event.stopPropagation();

    // 处理行分组的打开、关闭
    if (folderRow.a(s_DataRowFolded).sW("t"))
        RowGroup_open(folderRow);
    else
        RowGroup_close(folderRow);

    // 隐藏表格的阅读模式（十字光标）
    TableCross_hide();
}

/**
 * 展开所有表格行分组
 * @param table 指定的表格对象
 * @param mode 指定打开模式。auto：系统自动打开
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
function RowGroup_openAll(table, mode) {
    if (table.a(s_DataRowGroup) !== s_True)
        return gFalse;

    table.f(s_CssTableRowGroupBtn).e(function () {
        let folderRow = $(this).p().p();
        if (folderRow.a(s_DataRowFolded) === s_True)
            RowGroup_open(folderRow, mode);
    });
    return gTrue;
}

/**
 * 收起全部表格行分级
 * @param table 指定的表格对象
 * @param mode 指定处理范围。auto：关闭被自动打开的，不指定时默认全部关闭
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
function RowGroup_closeAll(table, mode) {
    if (table.a(s_DataRowGroup) !== s_True)
        return gFalse;

    // 只对第一级的行分组进行处理，非第一级的行分级为 span.v-tbl-row-g-btn
    table.f("label" + s_CssTableRowGroupBtn).e(function () {
        let folderRow = $(this).p().p();
        LOG(mode, folderRow.a(s_DataRowOpenMode), folderRow.a(s_DataRowFolded));
        if (mode === s_Auto) {
            if (folderRow.a(s_DataRowOpenMode) === s_Auto && folderRow.a(s_DataRowFolded) === s_False)
                RowGroup_close(folderRow);
        }
        else {
            if (folderRow.a(s_DataRowFolded) !== s_True)
                RowGroup_close(folderRow);
        }
    });
    return gTrue;
}

/**
 * 重置清空表格中的行分组相关信息
 * @param target 目标表格
 */
function RowGroup_reset(target) {
    target.removeAttr(s_DataRowGroup);
    target.f("tr[" + s_DataParentFolderId + "]").removeAttr(s_DataParentFolderId);
}

/**
 * 设置为缩进行
 * @param tr 对应的行对象
 * @param td 对应的行的首个单元格
 * @param level 缩进层级
 */
function RowGroup_ident(tr, td, level) {
    // 统一缩进节点符号转换，尾行在完成的有处理后再进行修正
    td.rHTML(RowGroup_syntax_tag2Replace, "");

    // 设置被折叠行的属性
    tr.a(s_DataParentFolderId, RowGroup_lastParent());
    // 设置缩进样式
    td.a(s_DataIdentLevel, level);
    // 调整样式
    JQ_removeClass(td, s_CssTableRowGroupNotFolder);
    JQ_addClass(td, "v-tbl-row-g-sub");
    // 设置被折叠行的背景色
    tr.c(s_BackgroundColor, RowGroup_lastColor());

    // 生成缩进占位元素
    for (let i = 0; i < level; i++) {
        let identer = td.f(".v-tbl-row-g-identer:last"),
            identObj = "<label class='v-tbl-row-g-identer'></label>";
        if (identer.length > 0)
            identer.after(identObj);
        else
            td.prepend(identObj);
    }

    // 隐藏被折叠的行
    tr.c(s_Display, s_Table + "-column");
}

/**
 * 展开表格行分组
 * @param folderRow 行分组对象
 * @param mode 指定打开模式。auto：系统自动打开
 */
function RowGroup_open(folderRow, mode) {
    // 处理展开行分组
    let id = folderRow.a(s_DataFolderId),
        table = folderRow.p().p(),
        subRows = table.f("tr[" + s_DataParentFolderId + "='" + id + "']"),
        folderButton = folderRow.ch("td:first").ch(s_CssTableRowGroupBtn + ":last");

    folderRow.a(s_DataRowFolded, s_False);
    if (mode !== gUndefined)
        folderRow.a(s_DataRowOpenMode, mode);
    folderButton.prop("innerHTML", RowGroup_icoOpened);
    subRows.c(s_Display, "");

    // 如表格指定了重复表头则进行对应处理
    let thRow = table.f("thead>tr:last-child");
    if (table.a(s_DataThRpt) === "group") {
        // 从第 2 列开始进行处理
        folderRow.f("td:not(:first-child)").e(function () {
            let td = $(this),
                tdHTML = td.h().x();
            if (tdHTML.length === 0 || tdHTML === "&nbsp;") {
                let colID = td.a(s_DataTblCol),
                    th = thRow.f("th[" + s_DataTblCol + "='" + colID + "']").h();
                // 如果对应的列头可能因向下合并单元格为空时，尝试找上一行对应的列头
                if (th === gUndefined) {
                    let prevThRow = thRow.prev();
                    if (prevThRow !== gUndefined)
                        th = prevThRow.f("th[" + s_DataTblCol + "='" + colID + "']").h();
                }
                // 临时将行分组中的单元格替换为对应的列头
                td.h(th);
                JQ_addClass(td, s_CssThRepeater);
            }
        });
    }
}

/**
 * 折叠表格行分组
 * @param folderRow 行分组对象
 */
function RowGroup_close(folderRow) {
    // 处理折叠行分组
    let id = folderRow.a(s_DataFolderId),
        subRows = $("tr[" + s_DataParentFolderId + "='" + id + "']"),
        folderButton = folderRow.ch("td:first").ch(s_CssTableRowGroupBtn + ":last");

    folderRow.a(s_DataRowFolded, s_True);
    folderRow.removeAttr(s_DataRowOpenMode);
    folderButton.prop("innerHTML", RowGroup_icoClosed);

    // 折叠所有子行（包括行分组）
    subRows.e(function () {
        let tr = $(this),
            folder = tr.a(s_DataFolder);
        if (folder !== gUndefined && folder.sW("t"))
            RowGroup_close(tr);
        tr.c(s_Display, s_Table + "-column");
    });

    // 如表格指定了重复表头则进行对应处理
    let table = folderRow.p().p();
    if (table.a(s_DataThRpt) === "group") {
        // 从第 2 列开始进行处理
        folderRow.f("td:not(:first-child)").e(function () {
            let td = $(this);
            // 将行分组中临时替换的列头删除
            if (td.a(s_Class).i(s_CssThRepeater) > -1) {
                td.h("");
                JQ_removeClass(td, s_CssThRepeater);
            }
        });
    }
}

/**
 * 根据设备类型自适应hover样式
 */
function RowGroup_adjustHoverStyle() {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(s_CssTableRowGroupBtn).uH();
    else // 为表格行分组的折叠控件绑定 hover 事件
        V_ui_bindHover($(s_CssTableRowGroupBtn));
}

// ==================== 表格列头重复生成器 ==================== //

let ThRepeater_syntax_tag = /^(##\s).+/; // 用于匹配表格列头重复的语法

/**
 * 初始化重复表头处理
 */
function ThRepeater_init(table) {
    let hasRowGroup = table.a(s_DataRowGroup) === s_True;

    // 带行分组时，表头重复模式为 group，其他则为 page
    table.a(s_DataThRpt, hasRowGroup ? "group" : "page");
    if (hasRowGroup)
        return;

    // 处理 page 模式的表头重复
    let rowIndex = 1,
        pageSize = 15 + rowIndex,
        thRow = table.f("thead>tr"),
        skipRowCount = 0,
        lastSkipRowCount = 0,
        tbody = table.f("tbody>tr"),
        rowCount = tbody.length;

    tbody.e(function () {
        let tr = $(this),
            td = tr.ch("td[rowspan]");

        // 跳过有跨行合并的行
        if (td.length > 0) {
            td.e(function () {
                let rowSpan = JS_parseInt($(this).a(s_RowSpan));
                if (rowSpan > skipRowCount) {
                    skipRowCount = rowSpan - 1;
                }
                lastSkipRowCount = skipRowCount - 1;
            });
        }

        // 每 15 行为 1 页
        if (skipRowCount === 0 && rowIndex % (pageSize + lastSkipRowCount - 1) === 0
            && rowIndex < rowCount) {
                let colIndex = 0;
                thRow.e(function () {
                    tr.after($(this).prop("outerHTML").rA("<th ", "<td "));
                    JQ_addClass(tr.next().ch("td"), s_CssThRepeater);
                    if (colIndex === 0)
                        JQ_addClass(tr.next().ch("." + s_CssThRepeater), "first");
                    else
                        JQ_addClass(tr.next().ch("." + s_CssThRepeater), "not-first");
                    tr = tr.next();
                    colIndex++;
                });
        }
        rowIndex++;

        // 未完成须跳过的行
        if (skipRowCount > 0)
            skipRowCount--;
        // 已完成须跳过的行
        else
            lastSkipRowCount = 0;
    });
}

// ==================== 音频增强类 ==================== //

let ExtAudio_icon_loading = V_ui_generateSvgIcon("icoLoading", 16, 16, s_Light),
    ExtAudio_icon_play = V_ui_generateSvgIcon("icoPlay", 16, 16, s_Light),
    ExtAudio_icon_pause = V_ui_generateSvgIcon("icoPause", 16, 16, s_Light),
    ExtAudio_icon_stop = V_ui_generateSvgIcon("icoStop", 16, 16, s_Light),
    ExtAudio_icon_forbidden = V_ui_generateSvgIcon("icoForbidden", 16, 16, s_Light);

/**
 * 初始化音频数据
 */
function ExtAudio_init() {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("#write img[src$='.mp3'], #write [src$='.m4a'], #write [src$='.ogg'], #write [src$='.wav'],"
    + "[src*='.mp3?'], #write [src*='.m4a?'], #write [src*='.ogg?'], #write [src*='.wav?']").e(function () {
        let audioLike = $(this),
            audio = gUndefined,
            src = audioLike.a(s_Src),
            container = audioLike.p(),
            params = V_util_getQueryParams(src);

        // 指定为 mini 模式（扩展的自定义控件）
        if (params[s_Controls] === s_Mini) {
            V_doc_counter_audiomini++;

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.a(s_Id, "vk-id-mini-audio" + V_doc_counter_audiomini);

            // 添加音频播放 mini 控件
            audio.after("<div id='vk-id-mini-audio" + V_doc_counter_audiomini + "-control"
                + "' " + s_DataTitle + "='mini audio " + (V_doc_counter_audiomini)
                + "' class='v-audio-mini-control'></div>");

            // 开始加载音频
            audio.bind("loadstart", function () {
                let controls = $("#" + $(this).a(s_Id) + "-control");
                JQ_addClass(controls, s_CssAudioMiniControl);
                JQ_addClass(controls, s_Loading);
                controls.h(ExtAudio_icon_loading);
            });

            // 音频就绪可以开始播放
            audio.bind("canplay", function () {
                let controls = $("#" + $(this).a(s_Id) + "-control");
                JQ_removeClass(controls, s_Loading);

                // 绑定点击事件
                controls.uC().ck(function () {
                    __play(this, audio[0]);
                });
                controls.h(ExtAudio_icon_play);
                controls.a(s_DataPause, params["pause"]);

                // 须显示持续时长
                let dur = params["duration"];
                if (dur !== gUndefined && dur.sW("t")) {
                    let dur2 = audio.a(s_DataDuration);
                    if (dur2 === gUndefined || dur2.sW("t") === gFalse) {
                        // 计算音频时长
                        let duration = audio[0].duration,
                            min = Math.floor(duration / 60),
                            sec = Math.floor(duration -  min * 60);
                        let minStr = min > 0 ? min + "′" : "";
                        audio.next().after(" <sup class='v-duration-info'>" + minStr + sec + "″</sup>");
                        audio.a(s_DataDuration, s_True);
                    }
                }
            });

            // 正在播放
            audio.bind(s_Playing, function () {
                let controls = $("#" + $(this).a(s_Id) + "-control"),
                    pause = controls.a(s_DataPause);

                JQ_addClass(controls, s_CssAudioMiniControl)
                JQ_addClass(controls, s_Playing);

                // 支持暂停播放
                if (pause !== gUndefined && pause.sW("t")) {
                    controls.h(ExtAudio_icon_pause);
                }
                // 不支持暂停播放，暂时即结束
                else {
                    controls.h(ExtAudio_icon_stop);
                    audio.currentTime = 0; // 播放都是从头开始
                }
            });

            // 播放结束后恢复按钮状态
            audio.bind("ended", function () {
                let controls = $("#" + $(this).a(s_Id) + "-control");
                controls.h(ExtAudio_icon_play);
                JQ_removeClass(controls, s_Playing);
            });

            // 故障或不可用
            audio.bind("emptied", function () {
                let id = $(this).a(s_Id) + "-control",
                    controls = $("#" + id);
                JQ_removeClass(controls, s_Loading);
                controls.h(ExtAudio_icon_forbidden);
                JQ_addClass(controls, s_CssAudioMiniControl);
                JQ_addClass(controls, s_Disabled);
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(id, controls.a(s_DataTitle));
            });

            // 加载错误
            audio.bind(s_Error, function () {
                audio.tr("emptied");
            });

            // 鼠标 hover 事件
            audio.hover(function () {
                let _t =  $(this);
                if (_t.a(s_Class).i(s_Disabled) === -1)
                    JQ_addClass(_t, s_Hover);
            }, function () {
                JQ_removeClass($(this), s_Hover);
            });
        }
        // 标准控件模式
        else {
            V_doc_counter_audio++;

            // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (container.prop(s_TagName).l() !== "p") {
                audioLike.wrap("<p></p>");
                container = audioLike.p();
            }
            // 设置容器样式数据，用于折叠内容时使用
            container.a(s_DataContainer, "audio");
            JQ_addClass(container, s_CssCaptionContainer);

            // 先根据题注语法生成题注
            // if (ExtAudio_blockCapNum !== gTrue)
                CaptionGenerator_actionForMediaContent(audioLike, s_Audio);

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.a(s_Controls, s_Controls);

            // 若有第 2 题注，则微调样式
            if (audio.next(s_Caption2).length > 0)
                audio.c(s_MarginBottom, "-10px");

            // 故障或不可用
            audio.bind("emptied", function () {
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.p().a(s_Id), audio.p().a(s_DataTitle));
            });

            // 加载错误
            audio.bind(s_Error, function () {
                audio.tr("emptied");
            });
        }

        /**
         * 将无效音频源的信息添加到链接检查器
         *
         * @param id 坏链对象的标识
         * @param content 显示的内容
         */
        function __addToLinkChecker(id, content) {
            // 将无法加载的音频信息添加到链接检查器
            LinkTool_addToCheck(id, "🔈 <strong>" + [
                "无效的音频源",
                // "無效的音頻源",
                "Invalid audio source",
                // "Source audio invalide",
                // "Ungültige Audioquelle",
                // "Fuente de audio no válida",
                // "Недействительный источник звука",
                // "無効なオーディオ ソース",
                // "잘못된 오디오 소스"
            ][V_lang_id] + ":</strong> " + content);
        }
    });

    /**
     * 转换为 audio 标签
     * @param audioLike 类 audio 标签（即 src 为音频的 img 标签)
     * @param src 音频 URL
     */
    function __transToAudio(audioLike, src) {
        let tips = [
            "您的浏览器不支持音频标签。",
            // "您的瀏覽器不支持音頻標籤。",
            "Your browser does not support the audio tag.",
            // "Votre navigateur ne prend pas en charge la balise audio.",
            // "Ihr Browser unterstützt das audio -Tag nicht.",
            // "Su navegador no es compatible con la etiqueta audio.",
            // "Ваш браузер не поддерживает аудио тег.",
            // "お使いのブラウザは音声タグをサポートしていません。",
            // "브라우저가 오디오 태그를 지원하지 않습니다."
        ][V_lang_id];

        // 对 audio 标签的属性进行支持
        let autoplay = V_util_getQueryParams(src)[s_Autoplay],
            loop = V_util_getQueryParams(src)[s_Loop],
            preload = V_util_getQueryParams(src)[s_Preload];

        // 将 URL 为音频资源的 img 标签转换为 audio
        audioLike.wrap("<audio src='" + src + "'>" + tips + "</audio>");
        let audio = audioLike.p();
        // 移除图片 img 标签
        audioLike.remove();

        // 设置 audio 属性
        if (autoplay !== gUndefined) audio.a(s_Autoplay, s_Autoplay);
        if (loop !== gUndefined) audio.a(s_Loop, s_Loop);
        if (preload !== gUndefined) audio.a(s_Preload, s_Auto);

        return audio;
    }

    /**
     * 播放音频
     * @param self 自定义的播放控件对象
     * @param audio 音频的 JavaScript 对象
     */
    function __play(self, audio) {
        let controls = $(self);

        // 已暂停、未播放
        if (audio.paused === gTrue) {
            audio.play();
        }
        // 播放中
        else {
            controls.h(ExtAudio_icon_play);
            JQ_removeClass(controls, s_Playing);
            audio.pause();

            // 不支持暂时播放时，暂时即结束
            if (controls.a(s_DataPause) === gUndefined)
                audio.currentTime = 0; // 播放都是从头开始
        }
    }
}

// ==================== 音频增强类 ==================== //

/**
 * 初始化音频数据
 */
function ExtVideo_init() {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("#write img[src$='.ogv'], #write img[src$='.mp4'], #write img[src$='.webm'],"
    + "#write img[src*='.ogv?'], #write img[src*='.mp4?'], #write img[src*='.webm?']").e(function () {
        let videoLike = $(this),
            video = gUndefined,
            src = videoLike.a(s_Src),
            container = videoLike.p();
        V_doc_counter_video++;

        // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
        if (container.prop(s_TagName).l() !== "p") {
            videoLike.wrap("<p></p>");
            container = videoLike.p();
        }
        // 设置容器样式数据，用于折叠内容时使用
        container.a(s_DataContainer, "video");
        JQ_addClass(container, s_CssCaptionContainer);

        // 先根据题注语法生成题注
        // if (ExtVideo_blockCapNum !== gTrue)
            CaptionGenerator_actionForMediaContent(videoLike, s_Video);

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.bind("emptied", function () {
            // 将无法加载的音频信息添加到链接检查器
            __addToLinkChecker(video.p().a(s_Id), video.p().a(s_DataTitle));
        });

        // 加载错误
        video.bind(s_Error, function () {
            video.tr("emptied");
        });
    });

    /**
     * 将无效视频源的信息添加到链接检查器
     * @param id 坏链对象的标识
     * @param content 用于显示的内容
     */
    function __addToLinkChecker(id, content) {
        // 将无法加载的音频信息添加到链接检查器
        LinkTool_addToCheck(id, "📺 <strong>" + [
            "无效的视频源",
            // "無效的視頻源",
            "Invalid video source",
            // "Source vidéo non valide",
            // "Ungültige Videoquelle",
            // "Fuente de video no válida",
            // "Недействительный источник видео",
            // "無効なビデオ ソース",
            // "잘못된 비디오 소스"
        ][V_lang_id] + ":</strong> " + content);
    }

    /**
     * 转换为 video 标签
     * @param videoLike 类 video 标签（即 src 为视频的 img 标签)
     * @param src 视频 URL
     */
    function __transToVideo(videoLike, src) {
        let tips = [
            "您的浏览器不支持视频标签。",
            // "您的瀏覽器不支持視頻標籤。",
            "Your browser does not support the video tag.",
            // "Votre navigateur ne prend pas en charge la balise video.",
            // "Ihr Browser unterstützt das video -Tag nicht.",
            // "Su navegador no es compatible con la etiqueta video.",
            // "Ваш браузер не поддерживает видео тег.",
            // "お使いのブラウザは動画タグをサポートしていません。",
            // "브라우저가 비디오 태그를 지원하지 않습니다."
        ][V_lang_id];

        // 对 video 标签的属性进行支持
        let autoplay = V_util_getQueryParams(src)[s_Autoplay],
            loop = V_util_getQueryParams(src)[s_Loop],
            preload = V_util_getQueryParams(src)[s_Preload],
            width = V_util_getQueryParams(src)[s_Width],
            height = V_util_getQueryParams(src)[s_Height];

        // 将 URL 为音频资源的 img 标签转换为 video
        videoLike.wrap("<video src='" + src + "'>" + tips + "</video>");
        let video = videoLike.p();
        // 移除图片 img 标签
        videoLike.remove();

        // 设置 video 为标准控件
        video.a(s_Controls, s_Controls);

        // 设置 video 属性
        if (autoplay !== gUndefined) video.a(s_Autoplay, s_Autoplay);
        if (loop !== gUndefined) video.a(s_Loop, s_Loop);
        if (preload !== gUndefined) video.a(s_Preload, s_Auto);
        if (width !== gUndefined) video.a(s_Width, width);
        if (height !== gUndefined) video.a(s_Height, height);

        return video;
    }
}

// ==================== 文本输入框类 ==================== //

/**
 * 构造函数
 * @param target 须在其后添加文本输入组件的目标对象
 * @param id 对象标识
 * @param append 添加模式。true：作为子元素添加，false：作为兄弟元素添加
 */
function TextField(target, id, append) {
    let T = this;
    // 文本输入框属性
    T.ui = gUndefined;
    T.icon = gUndefined;
    T.input = gUndefined;
    T.reset = gUndefined;
    T.action = gUndefined;

    T.lastValue = "";
    T.timerValueChanged = null;

    // 文本输入框事件
    T.onInput = gUndefined;
    T.onFocus = gUndefined;
    T.onBlur = gUndefined;
    T.onKeyDown = gUndefined;
    T.onAction = gUndefined;
    T.pressEnter = gUndefined;
    T.pressESC = gUndefined;

    /**
     * 将文本输入框实例添加到指定对象之后
     * @param target 指定对象
     * @param id 添加到目标对象的 id 值
     * @param append true: 添加，false: 插入
     */
    T.__appendTo = function (target, id, append) {
        // 文本输入框 UI
        let ui = '<div class="v-textfield ' + id + '">'
            + '<div class="v-textfield-icon" style="display: none"></div>'
            + '<input type=s_Text />'
            + '<div class="v-textfield-action" style="display: none"></div>'
            + '<div class="v-textfield-reset">'
            + V_ui_generateSvgIcon("icoResetInput", 16, 16, "alpha")
            + '</div></div>';
        if (append === gTrue) {
            target.append(ui);
            T.ui = target.ch(".v-textfield." + id);
        }
        else {
            target.after(ui);
            T.ui = target.p().ch(".v-textfield." + id);
        }

        // 获得实例的各关键对象
        T.input = T.ui.ch("input");
        T.reset = T.ui.ch(".v-textfield-reset");

        /**
         * 绑定文本输入事件
         */
        T.input.on("input", function () {
            // 跳过中文输入法过程
            if ($(this).prop("compositionStatus") !== "start")
                __processInput();
        });
        /**
         * 绑定开始中文输入事件
         */
        T.input.on("compositionstart", function () {
            $(this).prop("compositionStatus", "start");
        });
        /**
         * 绑定结束中文输入事件
         */
        T.input.on("compositionend", function () {
            $(this).prop("compositionStatus", "end");
        });
        /**
         * 绑定文本按键事件
         */
        T.input.on("keypress", function (event) {
            __processInput();
        });
        /**
         * 绑定文本获得焦点事件
         */
        T.input.focus(function () {
            JQ_addClass(T.ui, s_CssTextFieldFocus);
            __checkComValueChanged();

            // 针对输入中文的情况，若输入了新的内容则进行查询
            function __checkComValueChanged() {
                if (T.input.prop("compositionStatus") !== "start" && T.lastValue !== T.input.val()) {
                    clearTimeout(T.timerValueChanged);
                    T.lastValue = T.input.val();
                    __processInput();
                }
                T.timerValueChanged = setTimeout(__checkComValueChanged, 800);
            }
            // 触发外部重定义事件
            typeof(T.onFocus) == s_Function && T.onFocus(T.input);
        });
        /**
         * 绑定文本失去焦点事件
         */
        T.input.blur(function () {
            JQ_removeClass(T.ui, s_CssTextFieldFocus);
            clearTimeout(T.timerValueChanged);
            // 触发外部重定义事件
            typeof(T.onBlur) == s_Function && T.onBlur(T.input);
        });

        /**
         * 处理文本框输入的内容
         */
        function __processInput() {
            let value = T.input.val().x();
            if (value === "") {
                T.reset.hide();

                // 无内容时移除样式
                if (T.action !== gUndefined && T.action.a(s_Class).i(s_Enabled) !== -1) {
                    JQ_removeClass(T.action, s_Enabled);
                    V_ui_unbindHover(T.action);
                }
            }
            else {
                T.reset.show();

                // 有内容时移除样式
                if (T.action !== gUndefined && T.action.a(s_Class).i(s_Enabled) === -1) {
                    JQ_addClass(T.action, s_Enabled);
                    T.action.hover(function () {
                        T.actionHover(gTrue);
                    }, function () {
                        T.actionHover(gFalse);
                    });
                }
            }
            // 触发外部重定义事件
            typeof(T.onInput) == s_Function && T.onInput(T.input, value);
        }

        /**
         * 绑定键盘按下事件
         */
        T.input.bind("keydown", function (event) {
            let code = event.keyCode || event.which || event.charCode,
                value = T.input.val();
            switch (code) {
                case 13: // ENTER
                    if (T.action !== gUndefined)
                        T.action.tr(s_Click);
                    typeof(T.pressEnter) == s_Function && T.pressEnter(T.input, value);
                    break;
                case 27: // ESC
                    T.reset.tr(s_Click);
                    typeof(T.pressESC) == s_Function && T.pressESC(T.input);
                    break;
            }
            // 触发外部重定义事件
            typeof(T.onKeyDown) == s_Function && T.onKeyDown(T.input, value, code);
        });

        /**
         * 绑定重置输入内容按钮
         */
        T.reset.uC().ck(function () {
            T.input.val("");
            T.input.select();
            T.reset.hide();

            if (T.action !== gUndefined && T.action.a(s_Class).i(s_Enabled) !== -1) {
                JQ_removeClass(T.action, s_Enabled);
                V_ui_unbindHover(T.action);
            }
            // 触发外部重定义事件
            typeof(T.onInput) == s_Function && T.onInput(T.input, "");
        });
    }

    /**
     * 清空输入框内容
     */
    T.clear = function () {
        T.reset.tr(s_Click);
    }

    /**
     * 开启输入框前图标
     * @param icon 图标
     */
    T.setIcon = function (icon) {
        T.icon = T.ui.ch(".v-textfield-icon");
        T.icon.h(icon);
        T.icon.show();
    }

    /**
     * 开启动作按钮
     * @param icon 按钮图标
     */
    T.setAction = function (icon) {
        T.action = T.ui.ch(".v-textfield-action");
        T.action.h(icon);
        T.action.show();

        T.action.hover(function () {
            T.actionHover(gTrue);
        }, function () {
            T.actionHover(gFalse);
        });
        T.action.uC().ck(function () {
            let value = T.input.val();
            // 输入内容不为空
            if (value.length > 0)
                T.input.select();

            // 触发外部重定义事件
            typeof(T.onAction) == s_Function && T.onAction(T.input, value);
        });
    }

    /**
     * 动作按钮鼠标 hover 处理
     * @param enter true: 鼠标光标进入，false: 鼠标光标离开
     */
    T.actionHover = function (enter) {
        if (enter === gTrue) {
            JQ_addClass(T.action, s_Hover);
            if (T.action.a(s_Class).i(s_Enabled) !== -1)
                JQ_addClass(T.ui, s_HoverAction);
        }
        else {
            JQ_removeClass(T.action, s_Hover);
            JQ_removeClass(T.ui, s_HoverAction);
        }
    }

    /**
     * 设置提示文本
     * @param text 提示文本
     */
    T.placeholder = function (text) {
        T.input.a(s_Placeholder, text);
    }

    /**
     * 显示文本输入框
     */
    T.show = function () {
        T.ui.show();
    }

    /**
     * 隐藏文本输入框
     */
    T.hide = function () {
        T.ui.hide();
    }

    /**
     * 设置文本框宽度
     * @param width 宽度
     */
    T.setWidth = function (width) {
        T.ui.c(s_Width, width);
        T.input.c(s_Width, width
            - (T.reset.w() + JS_parseInt(T.reset.c(s_PaddingLeft)) * 2)
            - (T.icon === gUndefined ? 0 : T.icon.w() + JS_parseInt(T.icon.c(s_PaddingLeft)) * 2)
            - (T.action === gUndefined ? 0 : T.action.w() + JS_parseInt(T.action.c(s_PaddingLeft)) * 2));
        if (T.icon !== gUndefined)
            JQ_addClass(T.input, "set-icon");
    }

    // 生成控件
    T.__appendTo(target, id, append);
}

// ==================== 过滤结果导航器类 ==================== //

function FilterResultNavigator(result) {
    let T = this;
    T.index = 0;
    T.result = result;

    T.nextItem = function () {
        if (T.result.isHidden())
            return;

        let set = T.result.ch(":visible"),
            item = set.eq(T.index);
        T.index++;
        if (T.index >= set.length)
            T.index = 0;
        return item;
    }

    T.reset = function () {
        T.index = 0;
    }
}

// ==================== 导航中心【目录】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocCatalog(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".catalog"), // 入口
        body : $(".v-toc-catalog-body"), // 目录索引内容
        result : $("." + s_CssTocFilterResult + ".catalog") // 过滤结果面板
    }

    T.holder = holder;

    T.h = []; // 目录集
    // 针对无封面的情况
    if (VOM_cover() === gUndefined)
        T.h.push("vk-id-doc-title");

    T.currentHeaderIndex = -1; // 当前章节在目录集中的索引
    T.currentItem = gUndefined; // 当前章节对象

    T.foldItems = []; // 非叶子章节集
    T.lastHeaderFolder = gUndefined; // 上一个非叶子章节
    T.lastHeaderLevel = 0; // 上一个章节的层级

    T.lastDocScrollTop = 0; // 记录最后一次文档滚动位置

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // V_ui_addAnimate(T.panel.body.f(".md-toc-item, .v-toc-item"));

    // 当前章节变化事件
    T.onChapterChanged = gUndefined;

    // 目录相关图标集
    T.icon = {
        // 章节：已收起
        folded : '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoFolded" class="v-toc-folder-ico"/></svg>',
        // 章节：已展开
        unfold : '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoUnfold" class="v-toc-folder-ico"/></svg>',
    };

    // 更新无目录情况下的提示信息
    T.ui.body.a(s_DataCatalogEmpty, [
        "( 无目录 )",
        // "( 無目錄 )",
        "( Catalog is Empty )",
        // "( Le Répertoire Est Vide )",
        // "( Katalog ist Leer )",
        // "( El Directorio Está Vacío )",
        // "( Каталог Пуст )",
        // "( カタログは空です )",
        // "( 디 렉 터 리 가 비어 있 음 )"
        ][V_lang_id]);

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return "catalog";
    }

    /**
     * 是否有目录索引项目
     */
    T.hasIndexItem = function () {
        return (T.ui.body.ch().length > 0);
    }

    /**
     * 根据设备类型自适应hover样式
     */
    T.adjustHoverStyle = function () {
        if (env.device.mobile) // 移动设备时解绑样式事件
            $(s_CssTocFolder).uH();
        else // 非移动设备时绑定样式事件
            V_ui_bindHover($(s_CssTocFolder));
    }

    /**
     * 添加目录节点
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    T.add = function (item) {
        T.holder.segs.sts(this, gTrue);

        // 将章节记录到目录集中
        let a = item.ch("a"),
            href = a.a(s_Href);
        T.h.push(href.s(1, href.length));

        // 自定义目录节点元数据
        item.a(s_Id, "vk-header-" + item.a(s_DataRef)); // 添加id属性
        item.a(s_DataNode, "0"); // 添加节点类型：0:叶子节点, 1:目录节点
        item.a(s_DataFolded, s_False); // 添加节点状态：true:收起, false:展开
        item.a(s_Title, a.t().x());
        // item.addClass("v-toc-item");
        // V_ui_addAnimate(item);

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.after(a.t());
        a.t("");

        // 点击目录节点事件
        item.uC().ck(function () {
            // 跳转至对应的页内锚点
            let hash = $("#" + item.a(s_Id)).ch("a").a(s_Href);
            V_util_gotoHash(hash);

            // 触发锚点点击事件
            typeof(T.holder.onInteractive) == s_Function && T.holder.onInteractive();
            // typeof(T.onClickHash) == s_Function && T.onClickHash();
        });

        // -----------------------------------
        // 目录非叶子章节的折叠功能实现
        // 所有目录节点都添加 folding 空白控件备用
        $("<div id='fd-vk-header-" + item.a(s_DataRef)
            + "' class='v-toc-folder'>&nbsp;</div>").insertBefore(item.f("a"));

        // 记录所有非叶子节点的folder控件
        let lv = ChpAutoNum_parseTocHeaderLevel(item.a("class"));
        if (T.lastHeaderFolder !== gUndefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (lv > T.lastHeaderLevel) {
                // 将最近一个子目录节点折叠控件入栈
                T.foldItems.push(T.lastHeaderFolder);

                // 为非叶子的章节添加折叠图标
                let folder = T.lastHeaderFolder.h(T.icon.unfold),
                    folderParent = folder.p();
                folderParent.a(s_DataNode, "1"); // 0:叶子, 1:目录
                folderParent.a(s_DataFolded, s_False); // true:收起， false:展开

                // 折叠控件事件
                folder.uC().ck(function () {
                    let id = $(this).p().a(s_Id);
                    T.disposeFold(id, ($("#" + id).a(s_DataFolded).sW("t")) ? "e" : "c", gTrue);
                    event.cancelBubble = gTrue;
                });
            }
            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            else if (lv < T.lastHeaderLevel)
                T.foldItems.pop();

            // 设置当前节点的父级信息
            if (T.foldItems.length > 0)
                item.a(s_DataPid, T.foldItems[T.foldItems.length - 1].p().a(s_Id));
        }

        // 更新最后处理的folder控件
        T.lastHeaderFolder = $("#fd-vk-header-" + item.a(s_DataRef));
        T.lastHeaderLevel = lv;
    }

    /**
     * 页面滚动时根据页面当前的位置，高亮对应目录中的章节
     */
    T.focusHeader = function () {
        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        let scrollTop = $(document).scrollTop();
        if (Math.abs(scrollTop - T.lastDocScrollTop) < 20)
            return;

        T.lastDocScrollTop = scrollTop;

        // ----------------------------------------
        // 寻找文档当前显示的章节
        // 默认为最后一章
        let curIdx = T.h.length - 1;
        for (let i = 0, len = T.h.length; i < len; i++) {
            let anchor = (env.browser.Firefox === gFalse)
                    ? T.h[i] // 非 Firefox 浏览器
                    : JS_decodeURI(T.h[i]), // Firefox 浏览器
                target = $("#" + JS_decodeURI(anchor));
                // target = $("#" + JS_decodeURI(anchor) + ", a[name='" + anchor + "']");
            let headerHeight = target.ht();
            // 将最近一个章节从文档可视空间上方滚出的章节定义为「当前章节」
            if ((target.o().top - $(document).scrollTop()) > (headerHeight * 3)) {
                curIdx = i - 1;
                break;
            }
        }

        // 章节没有变化则直接退出
        if (T.currentHeaderIndex === curIdx)
            return;

        // 章节有变化，并记录
        T.currentHeaderIndex = curIdx;

        // 当前文档位置在实际内容章节中时
        if (T.inHeader() === gTrue) {
            // ----------------------------------------
            // 更新目录内当前节点的样式
            // 先清除目录中上一次的「当前章节」的样式
            if (T.currentItem !== gUndefined)
                JQ_removeClass(T.currentItem, s_CssTocItemCurrent);
            // 更新「当前章节」的样式
            T.currentItem = $("#vlook-toc a[href='#" + T.h[curIdx] + "']").p();
            JQ_addClass(T.currentItem, s_CssTocItemCurrent);

            // 若当前目录节点被折叠隐藏，则向上展开父级目录节点
            if (T.currentItem.isHidden())
                __expandUpFolder(T.currentItem.a(s_DataPid));

            // 导航中心内容自动滚动当前章节所在位置
            T.scrollToCurrent();
        }

        // 触发当前章节变化事件
        typeof(T.onChapterChanged) == s_Function && T.onChapterChanged();

        /**
         * 向上展开父级目录
         *
         * @param id 父级目录 id 值
         */
        function __expandUpFolder(id) {
            // 展开
            T.disposeFold(id, "e", gTrue);
            // 若未到 h1（即第一级目录），则继续向上展开
            let item = $("#" + id),
                tagName = item.prop(s_TagName);
            if (tagName !== gUndefined && tagName.l() !== "h1")
                __expandUpFolder(item.a(s_DataPid));
        }
    }

    /**
     * 导航中心内容自动滚动到当前章节所在位置
     */
    T.scrollToCurrent = function () {
        if (T.currentItem === gUndefined || T.currentItem.position() === gUndefined)
            return;

        // 根据当前节点情况，目录内的可视空间自动滚动该节点所在位置
        const preDis = T.currentItem.ht() * 3, // 用于目录节点触动滚动的大小
            sTop = T.ui.body.scrollTop(), // 目录内当前滚动位置
            sBottom = sTop + T.ui.body.ht(); // 当前可视空间中位于目录底部的位置

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (T.currentItem.position().top < sTop)
            T.ui.body.scrollTop(T.currentItem.position().top);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (T.currentItem.position().top > (sBottom - preDis))
            T.ui.body.scrollTop(T.currentItem.position().top - T.ui.body.ht() + preDis);
    }

    /**
     * 文档当前位置是否在章节内
     */
    T.inHeader = function () {
        return T.currentHeaderIndex > -1;
    }

    /**
     * 当前章节为第 1 章时特殊处理（有封面模式时）
     */
    T.inFirstHeader = function () {
        return (VOM_cover() !== gUndefined && T.currentHeaderIndex === 0);
    }

    /**
     * 当前文档位置位于文档标题（无封面模式时）
     */
    T.inDocTitle = function () {
        return (VOM_cover() === gUndefined && T.currentHeaderIndex === 0);
    }

    /**
     * 按关键字过滤
     * @param value 过滤的关键字内容
     * @returns true - 有匹配的结果，false - 无匹配的结果
     */
    T.filter = function (value) {
        if (value.x() === "")
            return gFalse;

        if (T.holder.segs.checkedItem() === T.typeName())
            T.showFilterResult();

        let matched = gFalse;
        T.ui.result.empty();
        // 遍历目录节点进行关键字匹配
        $(s_Toc).e(function () {
            let item = $(this),
                title = item.a(s_DataHeaderNum) + item.a(s_Title);
            if (title.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                JQ_addClass(cloneItem, s_CssTocItem);
                JQ_removeClass(cloneItem, "md-toc-item md-toc-h1 md-toc-h2 md-toc-h3 md-toc-h4 md-toc-h5");
                cloneItem.ch(s_CssTocFolder).remove();
                cloneItem.prepend("<span>" + cloneItem.a(s_DataHeaderNum) + " </span>");
                cloneItem.show();
                cloneItem.a(s_DataKeywordMatch, s_True);

                // V_ui_addAnimate(cloneItem);
                // 绑定同源的点击事件
                cloneItem.uC().ck(function () {
                    JQ_removeClass(T.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
                    item.tr(s_Click);
                    JQ_addClass($(this), s_CssTocItemCurrent);
                });
                // 将匹配的节点添加到过滤结果中
                T.ui.result.append(cloneItem);
                matched = gTrue;
            }
        });

        // 过滤结果为空
        if (matched === gFalse) {
            T.ui.result.empty();
            T.ui.result.append("<div class='v-toc-filter-result-none'>" + [
                "无匹配结果!",
                // "無匹配結果!",
                "No Results!",
                // "Aucun résultat!",
                // "Keine Ergebnisse!",
                // "¡No hay resultados!",
                // "Нет результатов!",
                // "結果がありません!",
                // "결과가 없습니다!"
            ][V_lang_id] + "</div>");
            // if (T.holder.segs.checkedItem() !== T.typeName())
                TocIndex_updateStatus(this);
        }

        return gTrue;
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        if ($(s_Toc).length > 0)
            T.holder.segs.sts(this, gTrue);
        else
            T.holder.segs.sts(this, gFalse);
    }

    /**
     * 显示目录索引组件
     */
    T.show = function () {
        if (T.holder.keyword.input.val().length > 0) {
            T.ui.body.hide();
            T.showFilterResult();
        }
        else {
            T.ui.body.show();
            T.hideFilterResult();
        }
    }

    /**
     * 隐藏目录索引组件
     */
    T.hide = function () {
        T.ui.body.hide();
        T.hideFilterResult();
    }
    if (hidden) T.hide();

    /**
     * 显示过滤结果
     */
    T.showFilterResult = function () {
        T.ui.body.hide();

        T.ui.result.show();
        JQ_removeClass(T.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
    }

    /**
     * 隐藏过滤结果
     */
    T.hideFilterResult = function () {
        T.ui.result.hide();
    }

    /**
     * 跳转至指定章节
     */
    T.gotoHeader = function (target) {
        V_util_gotoHash("#" + target.a(s_DataAnchor));
    }

    /**
     * 处理展开或收起指定章节下的子章节
     * @param id 对象的id值
     * @param action 执行动作（c: collect, e: expand）
     * @param traversal 是否遍历子元素
     */
    T.disposeFold = function (id, action, traversal) {
        let lastItem = null,
            item = $("#" + id),
            itemSet = item.nextAll(),
            btnFolder = $("#fd-" + id);

        // 更新折叠控件图标
        item.a(s_DataFolded, (action === "e") ? s_False : s_True);
        btnFolder.h((action === "e") ? T.icon.unfold : T.icon.folded);

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = itemSet.length; i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem != null) {
                const hd1 = ChpAutoNum_parseTocHeaderLevel(item.a("class"));
                const hd2 = ChpAutoNum_parseTocHeaderLevel(lastItem.a("class"));
                if (hd1 > hd2) // 当前节点层级大于上一个节点的层级，继续
                    continue;
                else if (hd1 < hd2) // 当前节点层级小于上一个节点的层级，终止
                    break;
            }

            // 如果是目录节点，同时是已展开，且执行动作为「收起」，才进行递归调用展开子节点
            if (traversal === gTrue
                && item.a(s_DataNode) === "1"
                && item.a(s_DataFolded).sW("f")
                && action === "c") {
                    item.a(s_DataFolded, s_True);
                    // 递归处理
                    T.disposeFold(item.a(s_Id), action, traversal);
            }

            // 收起 / 展开
            item.c(s_Display, (action === "c") ? s_None : s_Block);
            lastItem = item;
        }
    }
}

// ==================== 导航中心分类索引通用类 ==================== //

let TocIndex_segments = gUndefined;

/**
 * 初始化 UI
 * @param indexObj 目标对象
 */
function TocIndex_initUI(indexObj) {
    let ui = indexObj.ui;

    V_ui_addAnimate(ui.entry);

    // 生成提示信息 UI
    ui.result.append("<div class='v-toc-filter-result-none'></div>");
    ui.tips = ui.result.ch(".v-toc-filter-result-none");

    TocIndex_showTips(ui);
}

/**
 * 无输入关键字的处理
 * @param indexObj 目标对象
 */
function TocIndex_noneKeyword(indexObj) {
    let ui = indexObj.ui,
        items = ui.result.ch("." + s_CssTocItem);
    items.show();
    if (items.length === 0)
        TocIndex_showTips(ui);
    else {
        ui.tips.hide();
        items.a(s_DataKeywordMatch, s_True);
        TocIndex_updateStatus(indexObj);
    }
    // __showTips();
}

/**
 * 更新所属分段状态
 * @param indexObj 目标对象
 */
function TocIndex_updateStatus(indexObj) {
    TocIndex_segments.sts(indexObj,
        indexObj.ui.result.ch("." + s_CssTocItem + "[" + s_DataKeywordMatch + "]").length > 0);
}

/**
 * 显示提示信息
 */
function TocIndex_showTips(ui) {
    ui.tips.t("( " + [
        "无此类内容",
        // "無此類內容",
        "No such content",
        // "Aucun contenu de ce type",
        // "Kein solcher Inhalt",
        // "No hay tal contenido",
        // "Нет такого контента",
        // "そのようなコンテンツはありません",
        // "그러한 콘텐츠 없음"
    ][V_lang_id] + " )");
    ui.tips.show();
}

/**
 * 添加索引项目
 * @param indexObj 目标对象
 * @param text 显示的文本
 * @param anchor 锚点
 * @param forSearch 用于搜索时检索的内容
 */
function TocIndex_add(indexObj, text, anchor, forSearch) {
    TocIndex_segments.sts(indexObj, gTrue);

    if (indexObj.ui.tips.isShowed())
        indexObj.ui.tips.hide();
    let item = $('<span class="' + s_CssTocItem + '" data-for-search="'
            + V_util_clearHtmlQuot((forSearch === gUndefined || forSearch.x().length === 0) ? "" : forSearch)
            + '">' + text + "</span>");
    indexObj.ui.result.append(item);
    // V_ui_addAnimate(item);
    item.uC().ck(function () {
        JQ_removeClass(indexObj.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
        JQ_addClass(item, s_CssTocItemCurrent);

        V_util_gotoHash("#" + anchor);

        // 触发锚点点击事件
        typeof(indexObj.holder.onInteractive) == s_Function && indexObj.holder.onInteractive();
        // typeof(indexObj.onClickHash) == s_Function && indexObj.onClickHash();
    });
}

/**
 * 按关键字过滤
 * @param indexObj 目标对象
 * @param value 过滤的关键字内容
 * @returns true - 有匹配的结果，false - 无匹配的结果
 */
function TocIndex_filter(indexObj, value) {
    if (value.x().length === 0) {
        TocIndex_segments.sts(indexObj, gFalse);
        return gFalse;
    }

    // 清空索引列表项
    indexObj.ui.tips.hide();
    indexObj.ui.result.ch().hide();
    JQ_removeClass(indexObj.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
    indexObj.ui.result.ch().removeAttr(s_DataKeywordMatch);

    // 遍历目录节点进行关键字匹配
    let matched = gFalse;
    indexObj.ui.result.ch("." + s_CssTocItem).e(function () {
        let item = $(this),
            dataForSearch = item.a(s_DataForSearch);
        if (item.t().l().i(value) > -1
            || (dataForSearch !== gUndefined && dataForSearch.l().i(value) > -1)) {
                item.show();
                item.a(s_DataKeywordMatch, s_True);
                TocIndex_segments.sts(indexObj, gTrue);
                matched = gTrue;
        }
    });

    // 过滤结果为空
    if (matched === gFalse) {
        indexObj.ui.tips.t([
            "无匹配结果!",
            // "無匹配結果!",
            "No Results!",
            // "Aucun résultat!",
            // "Keine Ergebnisse!",
            // "¡No hay resultados!",
            // "Нет результатов!",
            // "結果がありません!",
            // "결과가 없습니다!"
        ][V_lang_id]);
        indexObj.ui.tips.show();
        TocIndex_segments.sts(indexObj, gFalse);
    }

    return gTrue;
}

/**
 * 是否有对应的索引项目
 * @param indexObj 目标对象
 */
function TocIndex_hasIndexItem(indexObj) {
    return (indexObj.ui.result.ch("span").length > 0);
}

/**
 * 显示索引组件
 * @param indexObj 目标对象
 */
function TocIndex_show(indexObj) {
    indexObj.ui.result.show();
    JQ_removeClass(indexObj.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);
}

/**
 * 隐藏索引组件
 * @param indexObj 目标对象
 */
function TocIndex_hide(indexObj) {
    indexObj.ui.result.hide();
}

// ==================== 导航中心【插图】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocFigure(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".figure"), // 入口
        result : $("." + s_CssTocFilterResult + ".figure"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return "figure";
    }

    /**
     * 是否有图片索引项目
     */
    T.hasIndexItem = function () {
        return TocIndex_hasIndexItem(this);
    }

    /**
     * 初始化插图索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex_updateStatus(this);
    }

    /**
     * 显示插图组件
     */
    T.show = function () {
        // T.ui.figureNav.show();
        TocIndex_show(this);
    }

    /**
     * 隐藏插图组件
     */
    T.hide = function () {
        // T.ui.figureNav.hide();
        TocIndex_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【表格】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocTable(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".table"), // 入口
        result : $("." + s_CssTocFilterResult + ".table"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return s_Table;
    }

    /**
     * 是否有表格索引项目
     */
    T.hasIndexItem = function () {
        return TocIndex_hasIndexItem(this);
    }

    /**
     * 初始化表格索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
     T.updateStatus = function () {
        TocIndex_updateStatus(this);
    }

    /**
     * 显示表格组件
     */
    T.show = function () {
        TocIndex_show(this);
    }

    /**
     * 隐藏表格组件
     */
    T.hide = function () {
        TocIndex_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【多媒体】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocMedia(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".media"), // 入口
        result : $("." + s_CssTocFilterResult + ".media"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return "mulitmedia";
    }

    /**
     * 是否有多媒体索引项目
     */
    T.hasIndexItem = function () {
        return TocIndex_hasIndexItem(this);
    }

    /**
     * 初始化多媒体索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex_updateStatus(this);
    }

    /**
     * 显示多媒体组件
     */
    T.show = function () {
        TocIndex_show(this);
    }

    /**
     * 隐藏多媒体组件
     */
    T.hide = function () {
        TocIndex_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【代码块】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocCodeblock(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".codeblock"), // 入口
        result : $("." + s_CssTocFilterResult + ".codeblock"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return s_Codeblock;
    }

    /**
     * 是否有代码块索引项目
     */
    T.hasIndexItem = function () {
        return TocIndex_hasIndexItem(this);
    }

    /**
     * 初始化代码块索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex_updateStatus(this);
    }

    /**
     * 显示代码块组件
     */
    T.show = function () {
        TocIndex_show(this);
    }

    /**
     * 隐藏代码块组件
     */
    T.hide = function () {
        TocIndex_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【访问历史】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocHistory(holder, hidden) {
    let T = this;
    T.ui = {
        entry : $("." + s_CssSegmentBtn + ".history"), // 入口
        title : $("." + s_CssTocHistory + "-title"), // 历史记录标题
        result : $("." + s_CssTocHistory + "-result") // 历史记录面板
    };

    T.holder = holder;

    /**
     * 返回 Toc 组件类型名称
     * @returns Toc 组件类型名称
     */
    T.typeName = function () {
        return "history";
    }

    /**
     * 是否有访问历史索引项目
     */
    T.hasIndexItem = function () {
        return TocIndex_hasIndexItem(this);
    }

    /**
     * 添加访问历史记录
     * @param hash 页内锚点链接
     */
    T.add = function (hash) {
        if (hash === gUndefined || hash === "#" || hash.x().length === 0)
            return;

        // 清空当前条目的样式
        JQ_removeClass(T.ui.result.ch("." + s_CssTocItemCurrent), s_CssTocItemCurrent);

        // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
        let title = gUndefined,
            anchor = hash.s(1, hash.length);
        if (anchor.sW("vk-id"))
            title = $(hash).a(s_DataTitle);
        else if (anchor.sW("vk-err")) // 错误的内链
            title = $(hash).t();
        if (title === gUndefined) {
            let hashObj = $(s_Toc + ">.md-toc-inner[href='" + JS_decodeURI(hash) + "']").p();
            title = "<span>" + hashObj.a(s_DataHeaderNum) + " </span>"
                + JS_decodeURI(anchor);
        }
        let result = T.ui.result.ch("span[" + s_DataHistory + "='" + hash + "']");

        // 不存在相同的历史访问记录
        if (result.length === 0) {
            T.ui.result.prepend('<span ' + s_DataHistory + '="'
                + hash + '" class="' + s_CssTocItem + '">'
                + title + '</span>');
        }
        // 已存在相同的历史访问记录
        else {
            // 将相同的记录移动到最前面
            let existsItem = result.clone();
            T.ui.result.prepend(existsItem);
            JQ_addClass(existsItem, s_CssTocItemCurrent);
            result.remove();
        }

        // 为新增加 / 移动后的记录添加鼠标事件
        let item = T.ui.result.ch("span[" + s_DataHistory + "='" + hash + "']");
        JQ_addClass(item, s_CssTocItemCurrent);
        item.a(s_DataKeywordMatch, s_True);
        // V_ui_addAnimate(item);
        item.uC().ck(function () {
            V_util_gotoHash(hash);
            // 触发锚点点击事件
            typeof(T.holder.onInteractive) == s_Function && T.holder.onInteractive();
            // typeof(T.onClickHash) == s_Function && T.onClickHash();
        });

        T.updateStatus();
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex_updateStatus(this);
    }

    /**
     * 显示历史组件
     */
    T.show = function () {
        T.ui.title.show();
        T.ui.result.show();

        let tocItem = "span." + s_CssTocItem,
            noneHistory = "div.v-toc-history-none";
        // 没有历史访问记录，也没有提示信息内容
        if (T.ui.result.ch(tocItem + ", " + noneHistory).length === 0) {
            // 添加提示信息
            T.ui.result.append("<div class='v-toc-history-none'>" + [
                "暂无记录!",
                // "暫無記錄!",
                "No records!",
                // "Pas d'enregistrements!",
                // "Keine Aufzeichnungen!",
                // "¡No hay registros!",
                // "Нет записей!",
                // "記録なし!",
                // "기록이 없습니다!"
            ][V_lang_id] + "</div>");
        }
        // 有历史访问记录
        else if (T.ui.result.ch(tocItem).length > 0) {
            // 移除提示信息
            T.ui.result.ch(noneHistory).remove();
        }
    }

    /**
     * 隐藏历史组件
     */
    T.hide = function () {
        T.ui.title.hide();
        T.ui.result.hide();
    }
    if (hidden) T.hide();
}

// ==================== 导航中心 DocLib 文库类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param holder 关联的上级容器
 */
function DocLib(mask, holder) {
    let T = this;
    T.ui = $(".v-doc-lib");
    T.iframe = gUndefined;
    T.handle = $(".v-doc-lib-board>.item");
    T.enabled = gFalse;
    T.src = gUndefined;
    T.identifier = "vlook://doc-lib";

    T.holder = holder;

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    T.init = function () {
        let docLibBoard = $(".v-doc-lib-board"),
            timerGetTitle = null,
            getTitleTimes = 10; // 最多尝试 10 次

        T.iframe = $("iframe[name='vlook-doc-lib']");
        T.src = V_util_getMetaByName("vlook-doc-lib");

        // 有指定文库
        if (T.src !== gUndefined) {
            LOG("    ├ DocLib: " + T.src);
            T.enabled = gTrue;
            // 传递父页面的 wf 启动参数
            let wf = V_util_getParamVal("wf");
            wf = (wf !== gUndefined) ? "&wf=" + wf : "";
            T.iframe.a(s_Src, T.src + "?ws=none&type=mini" + wf);
            // 尝试获得 DocLib 的文档标题
            __getDocLibTitle();
        }
        else {
            LOG("    ├ DocLib: none");
        }

        T.handle.uC().ck(function () {
            T.show();
        });

        // ------------------------------
        // 处理文库专用链接
        $("a[href='" + T.identifier + "']").e(function () {
            let a = $(this);
            a.removeAttr(s_Href);
            a.a(s_Target, T.identifier);
            a.uC().ck(function () {
                T.show();
            });
        });

        /**
         * 获得文库的文档标题
         */
        function __getDocLibTitle() {
            V_data_set("doc-lib-title", "");
            timerGetTitle = setTimeout(function () {
                getTitleTimes--;
                WARN("Try to get DocLib title (" + getTitleTimes + ")");
                let title = V_data_get("doc-lib-title");
                if (getTitleTimes > 0 && (title === gUndefined || title.length === 0)) {
                    __getDocLibTitle();
                }
                else {
                    if (getTitleTimes <= 0) {
                        title = [
                            "浏 览 文 库",
                            // "瀏 覽 文 庫",
                            "Document Library",
                            // "Bibliothèque de documents",
                            // "Bibliothek der Dokumente",
                            // "Biblioteca de documentos",
                            // "библиотека документов",
                            // "ドキュメントライブラリ",
                            // "문서 라 이브 러 리"
                        ][V_lang_id];
                        ERROR("    ├ DocLib: timeout");
                    }
                    docLibBoard.show();
                    T.handle.t(title);
                    T.handle.a(s_Title, title);
                    JQ_addClass($(".v-nav-center-body, .v-nav-center-footer"), "has-doc-lib");
                    clearTimeout(timerGetTitle);
                }
            }, 1000);
        }
    }

    /**
     * 重新加载文库内容
     * @param scheme （可选）指定的颜色方案，light / dark
     */
    T.reload = function (scheme) {
        let cs = "";
        if (scheme !== gUndefined)
            cs = "&cs=" + scheme;
        T.iframe.a(s_Src, T.src + "?ws=none&type=mini" + cs);
    }

    /**
     * 显示文库
     */
    T.show = function () {
        typeof(T.holder.onInteractive) == s_Function && T.holder.onInteractive();

        T.mask.show();
        T.ui.show();
    }

    /**
     * 隐藏文库
     */
    T.hide = function () {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 插图增强类 ==================== //

/**
 * 初始化插图数据
 */
function ExtFigure_init() {
    let ignoreImgLost = gFalse,
        sw = new Stopwatch();

    // ----------------------------------------
    // 对 svg 类插图（Mermaid）进行初始化处理
    sw.st();
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    $(".md-diagram-panel>svg>svg>g").e(function () {
        $(this).unwrap();
    });
    sw.ed("    ├ prepare svg: ");

    // ----------------------------------------
    // 对 img 类插图（Mermaid）进行初始化处理
    sw.st();
    $("#write p>img, #write .md-diagram-panel svg,"
    + "img[src*='mode=figure'], img[src*='mode=icon'], img[src*='mode=logo'], img[src*='mode=frame'], "
    + "img[src*='#figure'], img[src*='#icon'], img[src*='#logo'], img[src*='#frame']").e(function () {
        let fig = $(this),
            src = fig.a(s_Src),
            container = fig.p(),
            tagName = (src !== gUndefined ? "img" : "svg");
        // ----------------------------------------
        // img 类插图的处理
        if (src !== gUndefined) {
            // 对于 img 类插图的预处理
            let params = V_util_getQueryParams(src),
                hash = V_util_getHash(src);

            // 初始化图片「颜色替换」的适配处理
            __initFillAlter(fig, params, src);

            // 初始化图片对「颜色方案」的适配处理
            __initColorScheme(fig, params);

            // 初始化图片对「高分屏」的适配处理
            __initHighDPI(fig, params);

            // 对图片「加载结果」进行是跟踪检查
            __bindLoadChecker(fig);

            // 跳过带指定显示版式的图片
            if (__isNotFigure(src))
                return gTrue;

            // 初始化图片背景的适配处理
            __initBackground(fig, params);

            // 添加插图容器
            container = fig.p();
            // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (container.prop(s_TagName).l() !== "p") {
                fig.wrap("<p></p>");
                container = fig.p();
            }

            // 初始化对齐方式
            __initAlign(container, hash, params);
        }

        // 绑定内容助手
        if (src !== gUndefined)
            ContentAssistor_bind(fig, s_Fig + s_SuffixImg);
        else
            ContentAssistor_bind(fig, s_Fig + s_SuffixSvg);

        V_doc_counter_fig++;

        // 处理题注
        __disposeCaption(fig, tagName);

        // 设置容器数据，用于折叠内容时使用
        container.a(s_DataContainer, tagName);
        JQ_addClass(container, s_CssCaptionContainer);
        // 折叠长插图
        // if (ExtFigure_blockCapNum !== gTrue)
            ContentFolder_add(fig);
    }); // 结束初始化处理
    sw.ed("    ├ figure set: ");

    // ----------------------------------------
    // srcset 为 auto 模式的处理
    sw.st();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && V_util_getParamVal(s_Srcset) === s_Auto) {
            $("p[" + s_DataContainer + "='img'] img").e(function () {
                let fig = $(this);
                if (fig.a(s_Src).i(s_SuffixSvg, 1) === -1 // 跳过 svg 文件
                    && fig.a(s_Srcset) === gUndefined) {
                        fig.a(s_Srcset, fig.a(s_Src) + " 2x");
                }
            });
    }

    // 进行图片对颜色方案的适配处理
    ExtFigure_adjustColorScheme(gFalse);
    sw.ed("    └ DPR & misc.: ");

    /**
     * 处理题注
     * @param fig 插图对象
     * @param tagName 插图所属标签 img、svg
     */
    function __disposeCaption(fig, tagName) {
       // 设置插图属性数据
       fig.a(s_DataFigNum, V_doc_counter_fig);
       JQ_addClass(fig, s_CssFig);

       // 先根据题注语法生成题注
    //    if (ExtFigure_blockCapNum !== gTrue)
           CaptionGenerator_actionForMediaContent(fig, tagName);
    }

    /**
     * 绑定加载失败处理
     * @param fig 插图对象
     */
    function __bindLoadChecker(fig) {
        let src = fig.a(s_Src);
        // 图片无法加载时加载默认图片
        fig.bind(s_Error, function () {
            if (ignoreImgLost === gFalse) {
                // 将无法加载的图片信息添加到链接检查器
                let cp1 = fig.p().f(s_Caption1).h(),
                    cp2 = fig.p().f(s_Caption2).t();
                LinkTool_addToCheck(fig.p().a(s_Id), "🖼 <strong>" + [
                    "无效的图片源",
                    // "無效的圖片源",
                    "Invalid image source",
                    // "Source d'image non valide",
                    // "Ungültige Bildquelle",
                    // "Fuente de imagen no válida",
                    // "Неверный источник изображения",
                    // "無効な画像ソース",
                    // "잘못된 이미지 소스"
                ][V_lang_id] + ":</strong> " + cp1 + (cp2.x().length > 0 ? " | " + cp2 : ""));
            }

            __loadDefaultOnError($(this));
        });

        // 强制重新加载一次以触发error事件
        fig.a(s_Src, src);
    }

    /**
     * 判断是否属于插图
     * @param src 插图路径
     * @returns true：不属于插图，false：属于插图
     */
    function __isNotFigure(src) {
        let ai = src.i("#", 4),
            mi = src.i("mode", 5), // 分段检过提高处理性能
            iconMode = src.i("#icon", ai - 1) > -1 || src.i("=icon", mi + 4) > -1,
            logoMode = src.i("#logo", ai - 1) > -1 || src.i("=logo", mi + 4) > -1,
            frameMode = src.i("#frame", ai - 1) > -1 || src.i("=frame", mi + 4) > -1;
        return (iconMode || logoMode || frameMode);
    }

    /**
     * 初始化图片对齐方式的处理
     * 注意：在 Typora 编辑模式时的对齐方式，直接通过 CSS 实现
     * @param container img 的题注容器对象
     * @param hash img 对象 src 值的锚点内容（如：#center#logo）
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initAlign(container, hash, params) {
        let align = gUndefined;
        // 针对通过锚点设置对齐方式
        if (hash.i("#center") > -1)
            align = "center";
        else if (align === gUndefined && hash.i("#right") > -1)
            align = s_Right;
        else if (align === gUndefined && hash.i("#left") > -1)
            align = s_Left;
        // 针对通过 URL 参数设置对齐方式
        else if (align === gUndefined && params["align"] !== gUndefined)
            align = params["align"];
        else
            return;
        // 设置父级对象的对齐方式
        container.c(s_TextAlign, align);
    }

    /**
     * 初始化图片对网格背景的的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initBackground(img, params) {
        let grid = params["grid"];
        if (grid === gUndefined)
            return;
        img.a(s_DataFigureGrid, grid);
    }

    /**
     * 初始化图片颜色替换的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     * @param src img 对象的 src 值
     */
    function __initFillAlter(img, params, src) {
        if (params[s_Fill] === gUndefined)
            return;

        img.a(s_DataImgFill, params[s_Fill]);

        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.i(s_SuffixSvg, 1) > -1) {
            SVGInject(img[0], {
                // SVG 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    if (!__isNotFigure(src))
                        ContentAssistor_bind(svgObj, s_Fig + s_SuffixSvg);
                    // 对颜色进行替换的适配处理
                    ExtFigure_adjustFillAlterForSVG(svgObj.a(s_DataImgFill), svgObj);
                },
                // SVG 注入失败
                onFail : function (img, svg) {
                    ERROR("SVGInject ERROR:", $(img).a(s_Src));
                }
            });
        }
    }

    /**
     * 初始化图片对颜色方案（Light / Dark）的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initColorScheme(img, params) {
        // 未指定 darksrc 参数，或同时指定了 fill 参数，则跳过
        if (params[s_Darksrc] === gUndefined)
            return;

        // 适配 Dark Mode 的方式：反转
        if (params[s_Darksrc] === s_Invert) {
            img.a(s_DataDarkSrc, s_Invert);
        }
        // 适配 Dark Mode 的方式：替换
        else {
            img.a(s_DataDarkSrc, "alter");

            let src = img.a(s_Src),
                path = V_util_getPath(src),
                queryString = V_util_getQueryString(src);
            // 补全 URL 参数内容
            let darksrc = params[s_Darksrc] + (queryString !== "" ? ("?" + queryString) : "");
            // 如果 darksrc 只含文件名，则用 src 的路径进行补全
            if (darksrc.i("/") === -1)
                darksrc = path + darksrc;

            // 初始化不同颜色方案的 src 内容
            img.a(s_DataSrcLight, img.a(s_Src));
            img.a(s_DataSrcDark, darksrc);

            // 初始化不同颜色方案的 srcset 内容
            if (params[s_Srcset] !== gUndefined)
                img.a(s_DataSrcsetLight, params[s_Srcset]);
            if (params[s_Darksrcset] !== gUndefined)
                img.a(s_DataSrcsetDark, params[s_Darksrcset]);
        }
    }

    /**
     * 初始化图片高分屏的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let src = img.a(s_Src),
            srcset = params[s_Srcset],
            darksrcset = params[s_Darksrcset];

        // Light Mode 对应的图片集
        if (srcset !== gUndefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.a(s_DataSrcsetLight, srcset);
            // 设置默认值
            img.a(s_Srcset, srcset);
        }

        // Dark Mode 对应的图片集
        if (darksrcset !== gUndefined) {
            darksrcset = __transUrlSrcSet(img.a(s_DataSrcDark), darksrcset);
            img.a(s_DataSrcsetDark, darksrcset);
        }
    }

    /**
     * 加载默认图片
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        let alt = target.a(s_Alt);
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        if (alt !== gUndefined && alt.length > 0) {
            target.a(s_Title, alt);
            target.removeAttr(s_Alt);
        }
        JQ_addClass(target, "v-img-lost");
    }

    /**
     * 转换图片 URL 中的 srcset / darksrcset 参数为符合 <img> srcset 属性的格式
     * @param src 图片 URL
     * @param srcset srcset 或 darksrcset 参数的内容
     */
    function __transUrlSrcSet(src, srcset) {
        // 针对 html 与 图片同一目录的情况
        let path = V_util_getPath(src);

        // @2x/@3x 图片资源为自动匹配名称的语法
        // 2x/3x 的文件名为 <文件名@2x.xxx> 或 <文件名@3x.xxx> 的情况
        if (/^@[2]x(,@[3]x)?$/.test(srcset) === gTrue) {
            let pureSrc = src.s(0, src.i("?", 5)),
                fileName = pureSrc.s(0, pureSrc.lastIndexOf(".")), // 图片资源文件名（不含扩展名）
                suffix = pureSrc.s(pureSrc.lastIndexOf("."), pureSrc.length); // 图片资源扩展名
            // 自动补全图片资源 URL
            srcset = srcset.r(/@2x/, fileName + "@2x" + suffix + " 2x");
            srcset = srcset.r(/@3x/, fileName + "@3x" + suffix + " 3x");
        }
        // @2x/@3x 图片资源为指定文件名的语法
        else {
            // 将倍数标识转换为 srcset 标准语法
            // 要从图片扩展名开始替换，避免将文件中的 @2x @3x 误替换掉
            srcset = srcset.rAfter(".", "@2x", " 2x");
            srcset = srcset.rAfter(".", "@3x", " 3x");
        }

        // 为 2x 图添加图片路径
        let sss = srcset.split(",");
        if (sss[0].i("/") === -1) // 仅为文件名时才添加路径
            srcset = path + srcset;
        // 为 3x 图添加图片路径
        if (sss.length > 1 && sss[1].i("/") === -1) // 仅为文件名时才添加路径
            srcset = srcset.r(" 2x,", " 2x," + path);

        return srcset;
    }
}

/**
 * 复制图片地址
 */
function ExtFigure_copySrc(source) {
    let content = ContentAssistor_lastHover.a(s_Src);
    // 若复制为 Markdown
    if (V_util_holdKey_Alt() === gTrue) {
        let alt = ContentAssistor_lastHover.a(s_Alt),
            title = ContentAssistor_lastHover.a(s_Title);
        content = "![" + (alt !== gUndefined ? alt : "")
            + "](" + content + (title !== gUndefined ? ' "' + title + '"' : "") + ")";
    }
    Copyer_action(source, content, gTrue);
 }

/**
 * 适配指定图片在 Light / Dark Mode 的适配处理
 * @param grid 是否进行网格背景适配处理：true / false
 */
function ExtFigure_adjustColorScheme(grid) {
    let scheme = ColorScheme.scheme,
        darkMode = scheme === s_Dark;
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 1. 对适配方式为「反转」的处理
    $("img[" + s_DataDarkSrc + "='invert'], svg[" + s_DataDarkSrc + "='invert']").e(function () {
        let img = $(this),
            src = img.a(s_Src);
        if (darkMode === gTrue) {
            // 如果图片没有指定替换颜色时才进行处理
            if (img.a(s_DataImgFill) === gUndefined) {
                // 设置默认的 srcset
                if (src !== gUndefined)
                    img.a(s_Srcset, img.a(s_DataSrcsetLight));
                // 添加反转样式
                JQ_addClass(img, s_CssImgInvertDark);
            }
        }
        else {
            JQ_removeClass(img, s_CssImgInvertDark);
            if (src !== gUndefined)
                img.a(s_Srcset, img.a(s_DataSrcsetLight));
        }
    });
    // 2. 对适配方式为「替换」的处理
    $("img[" + s_DataDarkSrc + "='alter']").e(function () {
        let img = $(this);
        JQ_removeClass(img, s_CssImgInvertDark);
        img.a(s_Src, img.a(s_DataSrc_ + scheme));
        img.a(s_Srcset, img.a(s_DataSrcset_ + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $("img[" + s_DataImgFill + "='text'], img[" + s_DataImgFill + "='theme1'], img[" + s_DataImgFill + "='theme2'], svg[" + s_DataImgFill + "='text'], svg[" + s_DataImgFill + "='theme1'], svg[" + s_DataImgFill + "='theme2']").e(function () {
        let fig = $(this),
            fill = fig.a(s_DataImgFill);
        // SVG 对象，或 src 为 .svg 的 img 对象
        if (fig.prop(s_TagName).l().sW("s") || fig.a(s_Src).i(s_SuffixSvg, 1) > -1) {
            ExtFigure_adjustFillAlterForSVG(fill, fig);
        }
        // 其他情况
        else {
            if (fill === s_Text)
                fig.c(s_Filter, "drop-shadow(12345px 0px " + fig.p().c(s_Color) + ")");
            else
                fig.c(s_Filter, "drop-shadow(12345px 0px var(--ac-" + fill + "-lg))");

            if (fig.a(s_DataFigNum) !== gUndefined)
                fig.c(s_Background, s_None);
        }
    });

    // --------------------
    // 非初始化时执行，避免与 CSS 默认配置冲突
    // 如：@media (prefers-color-scheme: dark) 部分
    if (grid === gTrue) {
        // 适配图片网格背景的处理
        $("img[" + s_DataFigureGrid + "='line'],img[" + s_DataFigureGrid + "='block']").e(function () {
            let img = $(this);
            // 先清空所有涉及的样式
            if (darkMode === gTrue) {
                JQ_removeClass(img, "v-fig-solid-bg-light");
                JQ_removeClass(img, "v-fig-grid-line-light");
                JQ_removeClass(img, "v-fig-grid-block-light");
            }
            else {
                JQ_removeClass(img, "v-fig-solid-bg-dark");
                JQ_removeClass(img, "v-fig-grid-line-dark");
                JQ_removeClass(img, "v-fig-grid-line-dark-invert");
                JQ_removeClass(img, "v-fig-grid-block-dark");
                JQ_removeClass(img, "v-fig-grid-block-dark-invert");
            }

            let gridType = img.a(s_DataFigureGrid),
                darkInvert = img.a(s_DataDarkSrc) === s_Invert;
            // 网络背景
            if (gridType === s_Line || gridType === s_Block) {
                if (darkMode === gTrue && darkInvert === gTrue)
                    // 先添加反色后的背景，以适配反色样式后能正常显示
                    JQ_addClass(img, "v-fig-grid-" + gridType + "-" + scheme + "-invert");
                else
                    JQ_addClass(img, "v-fig-grid-" + gridType + "-" + scheme);
            }
            // 非网格背景
            else
                JQ_addClass(img, "v-fig-solid-bg-" + scheme);
        });
    }
}

/**
 * 适配 *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 * @param fill 图片颜色替换方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
function ExtFigure_adjustFillAlterForSVG(fill, svg) {
    // 先取消可能会因数 darksrc=invert 的 CSS 配置影响
    svg.c(s_Filter, s_None);
    // 再针对进行微调
    if (fill === s_Text)
        svg.f("path, rect, ellipse, polygon").c(s_Fill, svg.p().c(s_Color));
    else
        svg.f("path, rect, ellipse, polygon").c(s_Fill, "var(--ac-" + fill + "-lg)");
}

// ==================== 插图导航模块 ==================== //

function FigureNav() {
    let T = this;
    T.ui = $(".v-fig-nav"); // 插图导航主界面
    T.btns = {
        ui : $(s_CssFigNavBtns), // 所有导航按钮
        prev : $(s_CssFigNavBtns + ".prev"), // 上一张插图按钮
        next : $(s_CssFigNavBtns + ".next"), // 下一张插图按钮
        close : $(".v-btn-close-figure-nav"), // 关闭按钮
    };
    T.content = $(".v-fig-content"); // 显示插图内容的控件
    T.figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

    V_ui_addAnimate(T.content.ch("img, svg"));

    // 绑定各按钮事件
    T.btns.prev.uC().ck(function () {
        T.prev();
    });
    T.btns.next.uC().ck(function () {
        T.next();
    });
    T.btns.close.uC().ck(function () {
        T.hide();
    });
    T.content.uC().ck(function () {
        T.hide();
    });

    /**
     * 插图导航导航按钮在不同终端的适配处理
     */
    T.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            T.btns.prev.uH();
            T.btns.next.uH();
        }
        // 非移动设备时绑定样式事件
        else {
            T.btns.ui.hover(function () {
                $(this).c(s_Transform, "translateY(-2px)");
            }, function () {
                $(this).c(s_Transform, s_None);
            });
            // 鼠标键按下事件，模拟 :active
            T.btns.ui.mousedown(function () {
                $(this).c(s_Transform, s_None);
            });
            // 鼠标键释放事件，模拟恢复正常
            T.btns.ui.mouseup(function () {
                $(this).c(s_Transform, "translateY(-2px)");
            });
        }
    }

    /**
     * 显示插图导航
     */
    T.show = function (fig) {
        V_report_push([s_Interactive, 'Figure Nav', 'Show/Hide', 0]);
        if (V_doc_counter_fig === 0)
            return;

        V_doc_scroll_freeze();
        V_doc_block = gTrue;

        if (fig == null)
            fig = $("[" + s_DataFigNum + "='" + T.figNum + "']");

        // 在插图导航中显示对应插图
        T.figNum = JS_parseInt(fig.a(s_DataFigNum));

        V_ui_show(T.ui);

        T.display();
        T.updateUI();
    }

    /**
     * 关闭插图导航
     */
    T.hide = function () {
        T.content.empty();
        V_ui_hide(T.ui);

        V_doc_scroll_unfreeze();
        V_doc_block = gFalse;
    }

    /**
     * 显示插图内容
     */
    T.display = function () {
        let fig = $("[" + s_DataFigNum + "='" + T.figNum + "']");
        T.content.empty();
        T.content.show();
        T.content.c(s_Width, $(window).w())
            .c(s_Height, $(window).ht());

        let newFig = fig.clone();
        newFig.c(s_MaxWidth, $(window).w() - 90)
            .c(s_MaxHeight, $(window).ht() - 90)
            .c(s_BorderRadius, s_varRB);
        JQ_addClass(newFig, "v-interactive");
        V_ui_hide(newFig);

        // 添加鼠标移入/移出事件
        V_ui_bindHover(newFig);

        // 添加鼠标点击事件
        newFig.uC().ck(function () {
            // 跳转到对应位置
            V_util_gotoHash("#vk-id-fig" + T.figNum);
            T.hide();
        });

        T.content.append(newFig);
        V_ui_show(newFig);
    }

    /**
     * 查看上一个插图
     */
    T.prev = function () {
        if (T.figNum > 1) {
            T.figNum--;
            T.display();
            T.updateUI();
        }
    }

    /**
     * 查看下一个插图
     */
    T.next = function () {
        if (T.figNum < V_doc_counter_fig) {
            T.figNum++;
            T.display();
            T.updateUI();
        }
    }

    /**
     * 更新插图导航界面
     */
    T.updateUI = function () {
        let pageNum = $(".v-fig-nav-title");

        pageNum.h("<span class='v-fig-page-num'>"
            + T.figNum + "/" + V_doc_counter_fig + "</span> "
            + $("#vk-id-fig" + T.figNum + ">.v-cap-1").t());

        // 更新导航按钮位置
        T.btns.prev.c(s_Top, (T.ui.ht() - T.btns.prev.ht()) / 2);
        T.btns.next.c(s_Top, T.btns.prev.c(s_Top))
            .c(s_Right, "10px");

        // 根据当前插图索引更新浏览按钮有效状态
        T.btns.prev.c(s_Opacity, "0");
        T.btns.next.c(s_Opacity, "0");
        if (T.figNum > 1) {
            T.btns.prev.c(s_Opacity, "1");
        }
        if (T.figNum < V_doc_counter_fig) {
            T.btns.next.c(s_Opacity, "1");
        }
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (iFigNav.ui.isHidden())
            return;

        switch (code) {
            case 188: // <
            case 37: // ←
                T.prev();
                break;
            case 190: // >
            case 39: // →
                T.next();
                break;
            case 27: // ESC
                T.hide();
                break;
        }
    }
}

// ==================== 样式重制类 ==================== //

/**
 * 调整任务列表复选框的样式
 */
function Restyler_forTaskList() {
    // 遍历所有正文下的无序列表
    $("#write>ul").e(function () {
        // 遍历所有含 checkbox 组件的无序列表项
        $(this).f(".md-task-list-item input[type='checkbox']").e(function () {
            let li = $(this).p();
            // 遍历其下级无序列表
            li.ch("ul").e(function () {
                let chkCount = 0,
                    notDone = gFalse;
                // 遍历下级无序列表的所有一级子元素内 checkbox 的 checked 状态
                $(this).ch("li").e(function () {
                    // 只对有两个或以上的 checkbox 子元素，因为只有 1 个 checkbox 是无法判断是否为不确定选择
                    if (chkCount > 0 && $(this).f("input").a(s_Checked) === gUndefined) {
                        notDone = gTrue;
                        return gFalse;
                    }
                    chkCount++;
                });
                // 若下级无序列表的一级子元素中，有任意一个 checkbox 为未完成的，则视为不确定选择
                if (notDone === gTrue)
                    li.ch("input")[0].indeterminate = gTrue;
            });
        });
    });

    // 对任务列表的 checkbox 组件转换为 SVG 图标
    $("#write input[type='checkbox']").e(function () {
        let chkStatus = "uncheck", // 默认为未完成
            chkStyle = s_Dark; // 默认样式

        // 已完成
        let _t =  $(this),
            checked = _t.a(s_Checked);
        if (checked !== gUndefined && checked.sW("c")) { // checked
            chkStatus = s_Checked;
            // chkStyle = "btn";
        }
        // 部分完成（不确定选择）
        else if (_t[0].indeterminate === gTrue) {
            chkStatus = "indeterminate";
            // chkStyle = "btn";
        }

        // 替换为 SVG 图标
        _t.before("<svg width='14px' height='14px' class='v-svg-input-checkbox'><use xlink:href='#icoCheckbox_"
            + chkStatus + "' class='v-svg-ico-" + chkStyle + "'/></svg>");
        _t.remove();
    });
}

/**
 * 调整默认的 Mermaid 样式
 */
function Restyler_forMermaid() {
    // 修正顺序图整体的样式
    $(".md-diagram-panel svg[id^='mermaidChart'][viewBox^='-']").e(function () {
        let target = $(this),
            viewBox = target.a(s_ViewBox).split(/\s+/),
            paddingBottom = (target.c(s_PaddingBottom));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.a(s_ViewBox,
            viewBox[0] + " " + viewBox[1] + " " + viewBox[2] + " "
            + (JS_parseInt(viewBox[3]) + JS_parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        JQ_addClass(target, s_CssMermaidRestyler);
    });

    // 更新顺序图中的角色样式
    $(".md-diagram-panel svg[id^='mermaidChart']>g>rect[class='actor']").e(function () {
        let actor = $(this),
            text = actor.next(s_Text).ch(), // actor text object
            tmpText = text.t(),
            prefix = "";
        const person = /@.+/g, // 人物角色
            keySys = /^\*\*.+/g, // 重要系统角色
            extSys = /^--.+/g; // 外部系统角色

        // 更新 <人物角色> 样式
        if (person.test(tmpText) === gTrue) {
            let h = actor.ht(),
                line = actor.prev(s_Line);
            actor.a(s_Rx, (h - 20) / 2);
            actor.a(s_Ry, (h - 20) / 2);
            actor.a("y", JS_parseInt(actor.a("y")) + 10);
            actor.a(s_Height, h - 20);
            line.a("y1", JS_parseInt(line.a("y1")) + 10);
            line.a("y2", JS_parseInt(line.a("y2")) - 20);
            JQ_addClass(actor.prev(s_Line), "v-actor-person");
            text.t(prefix + tmpText.s(1, tmpText.length));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText) === gTrue) {
            JQ_addClass(actor, s_CssActorKeySys);
            JQ_addClass(actor.prev(s_Line), s_CssActorKeySys);
            JQ_addClass(actor.nextAll(s_Text).ch(), s_CssActorKeySys);
            text.t(prefix + tmpText.s(2, tmpText.length));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText) === gTrue) {
            JQ_addClass(actor, s_CssActorExtSys);
            JQ_addClass(actor.nextAll(s_Text).ch(), s_CssActorExtSys);
            text.t(prefix + tmpText.s(2, tmpText.length));
        }
        else {
            text.t(prefix + tmpText);
        }
    });

    // 更新顺序图中消息序号的样式
    $(".md-diagram-panel svg[id^='mermaidChart']>text.sequenceNumber").e(function () {
        // 移除文本宽度，避免不同字体大小时显示效果问题
        $(this).removeAttr(s_TextLength);
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    $(".md-diagram-panel polygon+.labelText").e(function () {
        let fragment = $(this),
            g = fragment.p();

        // 默认的样式（par 片断）
        let bgColor = s_varMmOrange,
            borderColor = s_varMmOrange,
            titleColor = s_varMmOrange,
            labelText = s_varMmOrangeAlt;
        // 为 alt 片断设置样式
        if (fragment.t() === s_Alt) {
            bgColor = s_varMmRed;
            borderColor = s_varMmRed;
            titleColor = s_varMmRed;
            labelText = s_varMmRedAlt;
        }
        // 为 loop 片断设置样式
        else if (fragment.t() === s_Loop) {
            bgColor = s_varMmCyan;
            borderColor = s_varMmCyan;
            titleColor = s_varMmCyan;
            labelText = s_varMmCyanAlt;
        }

        // 为 alt、loop、par 片断应用样式设置
        if (fragment.t() !== "opt") {
            // 背景色
            g.f("polygon.labelBox").c(s_CssText, "fill: " + bgColor + " !important;");
            // 边框色
            g.f("line.loopLine").c(s_CssText, "stroke: " + borderColor + " !important;");
            // 片断类型名称颜色
            g.f("text.labelText").c(s_CssText, "fill:" + labelText + " !important;");
            g.f("text.labelText").c(s_CssText, "fill:" + labelText + " !important;");
            // 片断标题颜色
            g.f("text.loopText, text.loopText>tspan").c(s_CssText, "fill:" + titleColor + " !important;");
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (fragment.t() === s_Alt)
            fragment.t([
                "选择",
                // "選擇",
                "Alt.",
                // "Alt.", "Alt.", "Alt.", "Alt.", "代替", "대안"
            ][V_lang_id]);
        else if (fragment.t() === "opt")
            fragment.t([
                "可选",
                // "可選",
                "Opt.",
                // "Opt.", "Opt.", "Opt.", "Opt.", "ション", "매칭"
            ][V_lang_id]);
        else if (fragment.t() === s_Loop)
            fragment.t([
                "循环",
                // "循環",
                "Loop.",
                // "Loop.", "Loop.", "Loop.", "Loop.", "ループ", "루프"
            ][V_lang_id]);
        else if (fragment.t() === "par")
            fragment.t([
                "平行",
                // "平行",
                "Par.",
                // "Par.", "Par.", "Par.", "Par.", "平行", "평행"
            ][V_lang_id]);
    });

    // 调整片断的标题文本
    $("svg text.loopText>tspan").e(function () {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(this);
        fragmentTitle.p().a(s_Style, "text-anchor: start");

        // 调整文本的位置
        let label = fragmentTitle.p().p().f(".labelBox"),
            rect = label[0].getBBox();
            // y = JS_parseInt(fragmentTitle.p().a("y"));
        fragmentTitle.a("x", rect.x + rect.width + 10);

        let nextText = fragmentTitle.p().next();
        if (nextText !== gUndefined && nextText.a(s_Class) !== gUndefined && nextText.a(s_Class).i("loopText") > -1) {
            nextText.a("x", rect.x + rect.width + 40);
        }
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态机图节点
    let radius = V_util_getVarVal("--v-r-b");
    // 针对 VLOOK 顺序图开始、结束节点、子图
    // $("#START rect, #END rect, g[id^=flowchart-START] rect, g[id^=flowchart-END] rect, .cluster rect, rect[class=rect]").e(function () {
    $("svg .cluster rect").e(function () {
        // __processStatusNodes($(this));
        $(this).a(s_Rx, radius);
        $(this).a(s_Ry, radius);
    });
}

// ==================== 第三方库修复工具类 ==================== //

// Mermaid 相关的 DPR
let RepairTool_mermaidDPR_builder = 1, // 生成 Mermaid 时系统的 DPR
    RepairTool_mermaidDPR_render = 1; // Mermaid 流程图显示的 DPR

/**
 * 按倍数调整函数元组数据，目前只支持单个函数，且只能有两个参数
 * @param funcString 函数字符串，如：translate(-12,-18)
 * @param rate1 对第1个参数的调整倍数
 * @param rate2 对第2个参数的调整倍数
 */
function RepairTool_scaleTupleByTimes(funcString, rate1, rate2) {
    let lbIndex = funcString.i("("),
        dotIndex = funcString.i(","),
        rbIndex = funcString.i(")");

    // 提取两个参数值
    let r1 = funcString.s(lbIndex + 1, dotIndex),
        r2 = funcString.s(dotIndex + 1, rbIndex);

    if (rate1 !== 1) r1 = r1 * rate1;
    if (rate2 !== 1) r2 = r2 * rate2;

    return funcString.s(0, lbIndex + 1) +
        r1 + "," + r2 + ")";
}

// ==================== Code Magic 模块 ==================== //

/**
 * 初始化
 */
function CodeMagic_init() {
    // 初始化彩虹标签、彩虹徽章、刮刮卡的默认颜色标识
    // 注：彩虹引用的初始化在 ExtQuote 中进行
    let dcTag = V_util_getParamVal("dc-tag"),
        dcBadge = V_util_getParamVal("dc-badge"),
        dcCoat = V_util_getParamVal("dc-coat");
    if (dcTag !== gUndefined)
        RainbowTag_defalutColor = dcTag;
    if (dcBadge !== gUndefined)
        RainbowBadge_defalutColor = dcBadge;
    if (dcCoat !== gUndefined)
        RainbowCoat_defalutColor = dcCoat;

    // 遍历所有 code
    $("code").e(function () {
        let _t = $(this),
            codeText = _t.t(),
            stdCount = 0,
            result;

        // 徽章格式
        if ((result = codeText.m(RainbowBadge_syntax_color)) != null)
            RainbowBadge_build(_t, result);
        // 彩虹单标签格式
        else if ((result = codeText.m(RainbowTag_syntax)) != null)
            RainbowTag_build(_t, result);
        // 文字注音格式
        else if ((result = codeText.m(TextPhonetic_syntax)) != null)
            TextPhonetic_build(_t, result);
        // 刮刮卡格式
        else if ((result = codeText.m(RainbowCoat_syntax)) != null)
            RainbowCoat_build(_t, result);
        // 彩虹引用
        else if ((result = codeText.m(RainbowQuote_syntax)) != null)
            RainbowQuote_build(_t, result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else {
            stdCount++;
            JQ_addClass(_t, "v-std-code" + " id-" + stdCount);
            _t.uC().ck(function () {
                let content = _t.t();
                if (V_util_holdKey_Alt() === gTrue)
                    content = "`" + content + "`";
                Copyer_action(_t, content, gTrue);
            });
        }
    });
}

// ==================== Code Magic：彩虹单标签模块 ==================== //

// 语法：#tag#(color)
let RainbowTag_syntax = /^#(.+)#(\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|rose|pink|gold|brown|gray|black|theme1|theme2)\))?$/i,
    RainbowTag_count = 0,
    RainbowTag_defalutColor = "theme1";

/**
 * 构建单标签样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
function RainbowTag_build(target, result) {
    let tag = result[1],
        color = RainbowTag_getColor(result[3]);

    RainbowTag_count++;

    // 过滤语法内容
    target.t(tag);
    target.a(s_Class, "v-tag " + color + " id-" + RainbowTag_count);
    // 复制内容
    target.uC().ck(function () {
        let _t = $(this),
            content = _t.t();
        if (V_util_holdKey_Alt() === gTrue)
            content = __asMarkdown(content);
        Copyer_action(_t, content, gTrue);
    });

    /**
     * 生成标签的 Markdown 格式
     * @param value 标签内容
     */
    function __asMarkdown(value) {
        let content = "#" + value + "#";
        if (color !== RainbowBadge_defalutColor)
            content += "(" + color + ")";
        content = "`" + content + "`";
        return content;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function RainbowTag_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowTag_defalutColor;
    return color;
}

// ==================== Code Magic：徽章模块 ==================== //

// 语法：#badge_name|badge_value#(color{{variable}})
let RainbowBadge_syntax_color = /^#(.+)\|(.+)#(\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|rose|pink|gold|brown|gray|black|theme1|theme2)(!)?\))?$/i, // 颜色
    RainbowBadge_syntax_variable = /^(.*)({{.+}}|%.+%|\${.+}|#{.+}|\$.+\$|var\(.+\))(.*)$/i, // 变量语法
    // RainbowBadge_syntax_variable = /^(.*)({{.+}}|%.+%|\${.+})(.*)$/i, // 变量语法
    RainbowBadge_defalutColor = "gray",
    RainbowBadge_count = 0;

/**
 * 构建徽章样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
function RainbowBadge_build(target, result) {
    let color = RainbowBadge_getColor(result[4], target), // 颜色标识
        em = result[5], // 强调样式的标识
        badgeName = result[1],
        badgeValue = result[2],
        varStr;

    RainbowBadge_count++;

    // ----- 徽章标题
    target.wrap("<code class='v-badge-name " + color + " id-" + RainbowBadge_count + "'>" + badgeName + "</code>");
    // 复制徽章标题内容
    $(".v-badge-name." + color + ".id-" + RainbowBadge_count).uC().ck(function () {
        if (Copyer_processing === gTrue)
            return;

        // $(this)[0].childNodes[0].nodeValue
        let content = badgeName,
            _t = $(this);
        if (V_util_holdKey_Alt() === gTrue)
            content = __asMarkdown(_t.ch().t());
        Copyer_action(_t, content, gTrue);
    });

    // ----- 徽章内容
    JQ_addClass(target, "v-badge-value id-" + RainbowBadge_count);
    // 处理含变量的情况
    if ((varStr = badgeValue.m(RainbowBadge_syntax_variable)) != null)
        badgeValue = badgeValue.r(varStr[2], "<span class='var " + color + "'>" + varStr[2] + "</span>");
    target.h(badgeValue);
    // 指定的颜色标识带强调样式
    if (em !== gUndefined)
        JQ_addClass(target, color);
    // 复制徽章内容内容
    target.uC().ck(function () {
        if (Copyer_processing === gTrue)
            return;

        let _t = $(this),
            content = _t.t();
        if (V_util_holdKey_Alt() === gTrue)
            content = __asMarkdown(_t.t());
        Copyer_action(_t, content, gTrue);
    });

    /**
     * 生成徽章的 Markdown 格式
     * @param value 徽章内容
     */
    function __asMarkdown(value) {
        let content = "#" + badgeName + "|" + value + "#";
        if (color !== RainbowBadge_defalutColor)
            content += "(" + color + (em !== gUndefined ? "!" : "") +")";
        content = "`" + content + "`";
        return content;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @param target 目标 code 对象
 * @returns string 返回有效的的颜色值
 */
function RainbowBadge_getColor(color, target) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined) {
        // 若父级元素是 h6 (封面)，则默认使用颜色 theme2
        if (target.p().prop(s_TagName).l() === "h6")
            return "theme2";
        return RainbowBadge_defalutColor;
    }
    return color;
}

// ==================== Code Magic：彩虹引用模块 ==================== //

// 语法：>(color)
let RainbowQuote_syntax = /^>\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|rose|pink|gold|brown|gray|theme1|theme2)(!)?\)$/i,
    RainbowQuote_defalutColor = "theme1!";

/**
 * 构建彩虹引用样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
function RainbowQuote_build(target, result) {
    let quote = target.p().p(),
        color = RainbowQuote_getColor(result[1]), // 颜色标识
        em = (result[2] !== gUndefined) ? " em" : " "; // 判断是否指定了强调样式
    if (quote.prop(s_TagName).l().sW("bl")) { // <blockquote>
        if (target.p().children().length > 0)
            target.remove();
        else
            target.p().remove();
        JQ_addClass(quote, "v-q " + color + em);
        JQ_addClass(quote.ch("h6"), "title-" + color + em);
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function RainbowQuote_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowQuote_defalutColor;
    return color;
}

// ==================== Code Magic：刮刮卡模块 ==================== //

// 语法：*{tips}(text "color")
let RainbowCoat_syntax = /^\*{(.*)}\(([^"]+)(\s"(red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|rose|pink|gold|brown|gray|theme1|theme2)")?\)$/,
    RainbowCoat_defalutColor = "gray";

/**
 * 构建「刮刮卡」
 * @param target 源对象
 * @param result 语法通过正则解析后的结果数组
 */
function RainbowCoat_build(target, result) {
    let tips = " **** ",
        text = result[2],
        color = "var(--ac-" + RainbowCoat_getColor(result[4]) + "-lg)";

    // 自定义提示信息
    if (result[1] !== gUndefined && result[1] !== "")
        tips = result[1];

    // 初始化「刮刮卡」数据
    JQ_addClass(target, s_CssRbCoat);
    target.a(s_DataRbCoatData, text);
    target.a(s_DataRbCoatShowed, s_False);
    target.a(s_Title, [
        "点击查看有效的原始内容",
        // "點擊查看有效的原始內容",
        "Click to view valid original content",
        // "Cliquez pour afficher le contenu original valide",
        // "Klicken Sie hier, um gültigen Originalinhalt anzuzeigen",
        // "Haga clic para ver contenido original válido",
        // "Нажмите, чтобы просмотреть действительный исходный контент",
        // "クリックして有効なオリジナルコンテンツを表示",
        // "유효한 원본 콘텐츠를 보려면 클릭하십시오."
        ][V_lang_id]);
    target.t(tips);
    target.c(s_Background, __generateBg(tips.length, color))
        .c(s_BorderColor, color);

    // 「刮刮卡」的点击事件
    target.uC().ck(function () {
        RainbowCoat_toggle($(this));
    });

    /**
     * 根据提示信息字数生成条纹背景
     * @param charCount 提示信息字数
     * @param color 条纹背景色
     * @returns string 生成 CSS 规范的背景
     */
    function __generateBg(charCount, color) {
        let count = 16,
            result = "linear-gradient(45deg, ";
        // 根据字数调整条纹数量
        if (charCount <= 8)
            count = 4;
        else if (charCount <= 12)
            count = 8;
        else if (charCount <= 20)
            count = 10;
        // 计算每个条纹的步长
        let step = 100 / count;
        // 自动生成条纹背景
        for (let i = 0; i < count; i++) {
            let start = i * step,
                end = start + step,
                c = (i % 2 === 0) ? color : s_varDFC;
            result += c + " " + start + "%, " + c + " " + end + "%"; // 分段渐变
            result += (i < count - 1) ? "," : ")";
        }
        return result;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function RainbowCoat_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowCoat_defalutColor;
    return color;
}

/**
 * 显示 / 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function RainbowCoat_toggle(target) {
    event.stopPropagation(); // 停止事件冒泡

    if (target.a(s_DataRbCoatShowed).sW("f"))
        RainbowCoat_show(target);
    else
        RainbowCoat_hide(target);
}

/**
 * 显示「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function RainbowCoat_show(target) {
    let tmp = target.t();
    JQ_addClass(target, s_Opened);
    target.c(s_Color, target.c(s_BorderColor));
    // 显示原始信息
    target.t(target.a(s_DataRbCoatData));
    // 「刮刮卡」自定义数据
    target.a(s_DataRbCoatData, tmp);
    target.a(s_DataRbCoatShowed, s_True)
}

/**
 * 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function RainbowCoat_hide(target) {
    let tmp = target.t();
    JQ_removeClass(target, s_Opened);
    target.c(s_Color, s_varDBc);
    // 显示提示信息
    target.t(target.a(s_DataRbCoatData));
    // 「刮刮卡」自定义数据
    target.a(s_DataRbCoatData, tmp);
    target.a(s_DataRbCoatShowed, s_False);
}

// ==================== Code Magic：文本注音模块 ==================== //

// 语法：{text}(symbol)
let TextPhonetic_syntax = /^{(.+)}\((.+)\)$/i;

/**
 * 构建「注音」
 * @param target 源对象
 * @param result 语法通过正则解析后的结果数组
 */
function TextPhonetic_build(target, result) {
    let text = result[1],
        symbol = result[2];
    target.after("<ruby>" + text
        + "<rp>(</rp><rt onclick='TextPhonetic_translation(\"" + text + "\", \"" + symbol + "\")'>"
        + symbol + "</rt><rp>)&nbsp;</rp></ruby>");
    target.remove();
}

/**
 * 释义或翻译
 * @param text 被注音的内容
 * @param symbol 注音
 */
function TextPhonetic_translation(text, symbol) {
    event.stopPropagation(); // 停止事件冒泡
    // 默认跳转至 Google 翻译 text
    let url = "https://translate.google.cn/?langpair=auto&sl=auto&op=translate&text=" + encodeURI(text);
    // 若 symbol 为日文假名，则跳转至 Google 翻译 symbol
    if (/^[\u3040-\u30FF]/.test(symbol))
        url = "https://translate.google.cn/?langpair=auto&sl=auto&op=translate&text=" + encodeURI(symbol);
    // 若 text 为中文，则跳转至汉典，翻译 text
    else if (/^[\u4e00-\u9fa5]/.test(text))
        url = "https://www.zdic.net/hans/" + encodeURI(text);

    window.open(url, text);
}

// ==================== VLOOK UI 模块 ==================== //

/**
 * 加载欢迎页资源
 */
function VLOOKui_loadWelcomePage() {
    let ui = '',
        // defalutContent = '<div>Don\'t worry, the best will always appear in the most casual time.</div>'
        //     + '<div>不要著急，最好的總會在最不經意的時候出現。</div>'
        //     + '<div>Keine Sorge, das Beste wird immer in der ungezwungensten Zeit erscheinen.</div>'
        //     + '<div>心配しないで、最高のものが常に最もカジュアルな時間に表示されます。</div>'
        //     + '<div>No te preocupes, lo mejor siempre aparecerá en el momento más casual.</div>'
        //     + '<div>걱정하지 마세요. 최고는 항상 가장 캐주얼 한 시간에 나타납니다.</div>'
        //     + '<div>Ne vous inquiétez pas, le meilleur apparaîtra toujours au moment le plus décontracté.</div>'
        //     + '<div>Не волнуйтесь, лучшее всегда будет появляться в самое случайное время.<br><br>:</div>',
        title = V_util_getDocTitle(),
        date = V_util_getMetaByName("date"),
        author = V_util_getMetaByName("author"),
        defalutContent = (title !== gUndefined ? "<div>" + title + "</div>" : "")
            + (date !== gUndefined ? "<div class='v-date'>( " + date + " )</div>" : "")
            + (author !== gUndefined ? "<div class='v-author'>" + author + "</div>" : ""),
        metaContent = V_util_getMetaByName("vlook-welcome");

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === gUndefined)
        metaContent = defalutContent;
    metaContent +=  s_Br + s_Br;
    // --------------------------------------------------
    // 欢迎页
    ui += '<div class="v-welcome-page">'
            // 文档专属图标
            + '<div class="v-doc-logo-light"></div><div class="v-doc-logo-dark"></div>'
            // 欢迎信息
            + '<div class="v-tips">'
                + metaContent.x()
            + '</div>'
            // 文档加载进度及进入按钮
            + '<div class="v-loading">Loading...</div>'
        + '</div>';
    return ui;
}

/**
 * 加载图标集资源
 */
function VLOOKui_loadIconSet() {
    let ui = '<svg style="display: none;">';
        // SVG 图标集：图标|VLOOK LOGO
    ui += '<symbol id="icoVLOOK">'
        + '<path d="M17.15 0c2.382 0 3.245.248 4.116.714a4.856 4.856 0 0 1 2.02 2.02c.466.87.714 1.734.714 4.116v10.3c0 2.382-.248 3.245-.714 4.116a4.856 4.856 0 0 1-2.02 2.02c-.87.466-1.734.714-4.116.714H6.85c-2.382 0-3.245-.248-4.116-.714a4.856 4.856 0 0 1-2.02-2.02C.248 20.396 0 19.532 0 17.15V6.85c0-2.382.248-3.245.714-4.116a4.856 4.856 0 0 1 2.02-2.02C3.604.248 4.468 0 6.85 0h10.3zm-4.935 16.976a.26.26 0 0 0-.334 0l-.956.795a.26.26 0 0 0-.05.345l.956 1.432a.26.26 0 0 0 .434 0l.956-1.432a.26.26 0 0 0-.05-.345zM7.27 9.292a4.34 4.34 0 0 0-4.343 4.336 4.34 4.34 0 0 0 4.343 4.336 4.34 4.34 0 0 0 4.343-4.336A4.34 4.34 0 0 0 7.27 9.292zm9.554 0a4.34 4.34 0 0 0-4.343 4.336 4.34 4.34 0 0 0 4.343 4.336 4.34 4.34 0 0 0 4.343-4.336 4.34 4.34 0 0 0-4.343-4.336zm-9.554 1.3a3.038 3.038 0 0 1 3.04 3.036 3.038 3.038 0 0 1-3.04 3.035 3.038 3.038 0 0 1-3.04-3.035 3.038 3.038 0 0 1 3.04-3.035zm9.554 0a3.038 3.038 0 0 1 3.04 3.036 3.038 3.038 0 0 1-3.04 3.035 3.038 3.038 0 0 1-3.04-3.035 3.038 3.038 0 0 1 3.04-3.035zm2.883-5.174a.652.652 0 0 0-.853-.32l-.013.005-6.795 2.83-6.793-2.83-.014-.006a.65.65 0 1 0-.537 1.185l7.035 2.931.014.006c.097.043.2.06.299.055a.649.649 0 0 0 .293-.055l.014-.006 7.035-2.93.084-.048a.65.65 0 0 0 .23-.817z" fill="#FFF" fill-rule="evenodd"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心
        + '<symbol id="icoNavCenter">'
        + '<path d="M10 0c5.518 0 10 4.482 10 10s-4.482 10-10 10S0 15.518 0 10 4.482 0 10 0zM4.286 4.286c.16.16 3.464 7.946 3.464 7.946s7.786 3.304 7.946 3.464c.09 0-3.482-7.946-3.482-7.946S4.125 4.125 4.286 4.286zm8.518 8.535c-.304-.66-1.25-3.071-1.572-3.803l-2.125 2.107c.59.268 3.572 1.643 3.697 1.696z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|目录索引
        + '<symbol id="icoTocTabCatalog">'
        + '<path d="M13.5 1A2.5 2.5 0 0 1 16 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5v-9A2.5 2.5 0 0 1 2.5 1h11zm0 1h-11A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 2z"/><rect x="5" y="3.5" width="9" height="2" rx="1"/><rect x="2" y="3.5" width="2" height="2" rx="1"/><rect x="8" y="7" width="6" height="2" rx="1"/><rect x="5" y="7" width="2" height="2" rx="1"/><rect x="8" y="10.5" width="6" height="2" rx="1"/>'
        + '<rect x="5" y="10.5" width="2" height="2" rx="1"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabCatalog-checked">'
        + '<path d="M13.5 1A2.5 2.5 0 0 1 16 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5v-9A2.5 2.5 0 0 1 2.5 1h11zm-.5 9.5H9a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zm-7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM13 7H9a1 1 0 1 0 0 2h4a1 1 0 0 0 0-2zM6 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7-3.5H6a1 1 0 1 0 0 2h7a1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|插图索引
        + '<symbol id="icoTocTabFigure">'
        + '<path d="M13.5 1A2.5 2.5 0 0 1 16 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5v-9A2.5 2.5 0 0 1 2.5 1h11zm0 1h-11A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 2z"/>'
        + '<path d="M2.596 11.294l1.86-3.21a1 1 0 0 1 1.655-.112l1.821 2.343a1 1 0 0 0 1.34.221l1.567-1.034a1 1 0 0 1 1.331.21l1.188 1.483a.8.8 0 0 1-.624 1.3H3.288a.8.8 0 0 1-.692-1.201z"/>'
        + '<circle cx="10" cy="6" r="2"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabFigure-checked">'
        + '<path d="M13.5 1A2.5 2.5 0 0 1 16 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5v-9A2.5 2.5 0 0 1 2.5 1h11zM5.823 7.72a1 1 0 0 0-1.367.364l-1.86 3.21a.8.8 0 0 0 .692 1.201h9.446a.8.8 0 0 0 .624-1.3L12.17 9.712a1 1 0 0 0-1.331-.21l-1.567 1.034a1 1 0 0 1-1.34-.221L6.111 7.972a1 1 0 0 0-.288-.252zM10 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|表格索引
        + '<symbol id="icoTocTabTable">'
        + '<path d="M13.286 1H2.714A2.717 2.717 0 0 0 0 3.714v8.57A2.718 2.718 0 0 0 2.714 15h10.572A2.717 2.717 0 0 0 16 12.285V3.714A2.716 2.716 0 0 0 13.286 1zM1.2 6.508h6.298v2.986H1.2V6.508zM2.714 2.2h4.783v3.108H1.2V3.714c0-.836.68-1.514 1.514-1.514zm4.784 8.494V13.8H2.714A1.517 1.517 0 0 1 1.2 12.285v-1.591h6.298zm7.302 0v1.59c0 .837-.678 1.515-1.514 1.516H8.49v-3.106h6.31zm0-4.186v2.986H8.49V6.508h6.31zM13.286 2.2c.835 0 1.514.678 1.514 1.514v1.594H8.49V2.2h4.796z"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabTable-checked">'
        + '<path d="M7.5 11v4H2.714A2.718 2.718 0 0 1 0 12.285V11h7.5zm8.5 0v1.285A2.717 2.717 0 0 1 13.286 15H8.5v-4H16zM7.5 6.199V9.8H0V6.2l7.5-.001zM16 6.2v3.6H8.5V6.199L16 6.2zM13.286 1A2.716 2.716 0 0 1 16 3.714V5l-7.5-.001V1zM7.5 4.999L0 5V3.714A2.717 2.717 0 0 1 2.714 1H7.5v3.999z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|多媒体索引
        + '<symbol id="icoTocTabMedia">'
        + '<path d="M9.748 8.4l-2.667 2a.503.503 0 0 1-.7-.1.495.495 0 0 1-.1-.3V6a.5.5 0 0 1 .8-.4l2.667 2a.499.499 0 0 1 0 .8zM2 1h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3c0-1.105.897-2 2-2zm10 1.001H4v12h8v-12zM1 5.001h2V2h-.998a1 1 0 0 0-1 1v2h-.002zM15 5V3a1 1 0 0 0-1-1h-.998v3h1.998zM1 10.999v2a1 1 0 0 0 1 1h.998v-3H1.001zm0-.999h2V6h-2v4zM15 11h-2v2.999h.998a1 1 0 0 0 1-1v-2h.002zm0-1V6h-2v4h2z"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabMedia-checked">'
        + '<path d="M3 11v4H2a2 2 0 0 1-2-2v-2h3zM14 1a2 2 0 0 1 2 2v2h-3V1h1zm-1 10h3v2a2 2 0 0 1-2 2h-1v-4zM6.78 5.5a.5.5 0 0 0-.499.5v4a.503.503 0 0 0 .8.4l2.667-2a.499.499 0 0 0 0-.8l-2.667-2a.515.515 0 0 0-.3-.1zM13 6h3v4h-3V6zM3 6v4H0V6h3zm0-5v4H0V3c0-1.105.897-2 2-2h1zm9 14H4V1h8v14z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|代码块索引
        + '<symbol id="icoTocTabCodeblock">'
        + '<path d="M13.333 1A2.667 2.667 0 0 1 16 3.667v8.666A2.667 2.667 0 0 1 13.333 15H2.667A2.667 2.667 0 0 1 0 12.333V3.667A2.667 2.667 0 0 1 2.667 1h10.666zm.164 1H2.503c-.733 0-1.445.673-1.5 1.41L1 3.514v8.97c0 .739.667 1.456 1.398 1.511l.105.004h10.994c.733 0 1.445-.673 1.5-1.41l.003-.105v-8.97c0-.739-.667-1.456-1.398-1.511L13.497 2zM9.701 3.817l-.02.076-2.08 8.642a.667.667 0 0 1-1.287-.342l.02-.075 2.08-8.643a.667.667 0 0 1 1.287.342zM5.396 5.768l-.047.07-1.61 2.147L5.35 10.13a.667.667 0 0 1-.07.88l-.063.054a.667.667 0 0 1-.88-.069l-.054-.064-1.91-2.547a.667.667 0 0 1-.048-.726l.048-.074 1.91-2.546a.667.667 0 0 1 1.113.729zm6.267-.793l.054.063 1.91 2.547.048.073a.667.667 0 0 1 0 .653l-.048.074-1.91 2.546-.054.065a.667.667 0 0 1-.809.115l-.07-.046-.064-.054a.667.667 0 0 1-.116-.809l.047-.07 1.61-2.147-1.61-2.147-.047-.07a.667.667 0 0 1 1.059-.793z"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabCodeblock-checked">'
        + '<path d="M13.333 1A2.667 2.667 0 0 1 16 3.667v8.666A2.667 2.667 0 0 1 13.333 15H2.667A2.667 2.667 0 0 1 0 12.333V3.667A2.667 2.667 0 0 1 2.667 1h10.666zM9.256 3.05a.667.667 0 0 0-.842.425l-2.08 8.643-.02.075a.667.667 0 0 0 1.287.342l2.08-8.642.02-.076a.667.667 0 0 0-.445-.766zM4.827 4.773l-.105.007a.667.667 0 0 0-.439.26l-1.91 2.546-.048.074c-.13.23-.11.515.048.726l1.91 2.547.054.064c.234.241.611.27.88.069l.063-.054a.667.667 0 0 0 .07-.88L3.74 7.985l1.61-2.147.046-.07a.666.666 0 0 0-.674-.99zm6.836.203a.666.666 0 0 0-1.059.793l.047.07 1.61 2.147-1.61 2.147-.047.07a.667.667 0 0 0 .116.81l.064.053.07.046c.264.15.597.103.809-.115l.054-.065 1.91-2.546.048-.074a.667.667 0 0 0 0-.653l-.048-.073-1.91-2.547z"/>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|访问史
        + '<symbol id="icoTocTabHistory">'
        + '<path d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1C4.142 1 1 4.142 1 8s3.142 7 7 7 7-3.142 7-7-3.142-7-7-7zm.695 1.77v5.2l2.394 2.544c.28.298.27.764-.02 1.05l-.012.013a.752.752 0 0 1-1.05-.02l-.013-.012-2.599-2.76a.752.752 0 0 1-.204-.497V2.786a.752.752 0 0 1 1.504-.016z"/>'
        + '</symbol>'
        + '<symbol id="icoTocTabHistory-checked">'
        + '<path d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-.057 2.034a.752.752 0 0 0-.752.752v5.502a.752.752 0 0 0 .204.496l2.599 2.76.012.014c.286.29.753.3 1.05.019l.014-.013c.29-.286.3-.752.019-1.05L8.695 7.97v-5.2a.752.752 0 0 0-.752-.736z"/>'
        + '</symbol>'
        // SVG 图标集：图标|检索
        + '<symbol id="icoRetrieval">'
        + '<path d="M14.999 14.596a1.375 1.375 0 0 1-1.953 0L11.46 12.94a6.372 6.372 0 0 1-3.466 1.032c-3.559 0-6.444-2.904-6.444-6.486S4.435 1 7.994 1c3.56 0 6.445 2.904 6.445 6.486a6.47 6.47 0 0 1-1.026 3.488l1.586 1.656c.54.543.54 1.423 0 1.966zM7.993 2.32c-2.834 0-5.132 2.313-5.132 5.166s2.298 5.165 5.132 5.165c2.835 0 5.133-2.312 5.133-5.165s-2.298-5.166-5.133-5.166z"/>'
        + '</symbol>'
        // SVG 图标集：图标|向左关闭
        + '<symbol id="icoCloseTo-left">'
        + '<path d="M13.98.176l.035.013c1.506.534 2.311 2.123 1.86 3.607L6.21 30l9.61 26.04c.546 1.475-.186 3.097-1.64 3.707l-.2.077c-1.502.532-3.154-.18-3.781-1.597l-.065-.16L.315 31.916a5.987 5.987 0 0 1 0-3.832l9.818-26.151C10.702.41 12.422-.375 13.979.176z"/>'
        + '</symbol>'
        // SVG 图标集：图标|向右关闭
        + '<symbol id="icoCloseTo-right">'
        + '<path d="M2.02.176L1.986.19C.479.723-.326 2.312.125 3.796L9.79 30 .181 56.04c-.546 1.475.186 3.097 1.64 3.707l.2.077c1.502.532 3.154-.18 3.781-1.597l.065-.16 9.818-26.151a5.987 5.987 0 0 0 0-3.832L5.867 1.933C5.298.41 3.578-.375 2.021.176z"/>'
        + '</symbol>'
        // SVG 图标集：图标|向下关闭
        + '<symbol id="icoCloseTo-bottom">'
        + '<path d="M.176 2.02l.013-.035C.723.479 2.312-.326 3.796.125L30 9.79 56.04.181c1.475-.546 3.097.186 3.707 1.64l.077.2c.532 1.502-.18 3.154-1.597 3.781l-.16.065-26.151 9.818a5.987 5.987 0 0 1-3.832 0L1.933 5.867C.41 5.298-.375 3.578.176 2.021z"/>'
        + '</symbol>'
        // SVG 图标集：图标|插图导航的上一张
        + '<symbol id="icoPrevFig">'
        + '<path d="M11.03.091c.765.284 1.159 1.147.88 1.927L3.002 27l8.91 24.982a1.516 1.516 0 0 1-.75 1.87l-.13.057a1.462 1.462 0 0 1-1.834-.765l-.055-.134L.12 27.705C.112 27.685 0 27.435 0 27c0-.435.111-.684.12-.706L9.141.99A1.465 1.465 0 0 1 11.03.09z"/>'
        + '</symbol>'
        // SVG 图标集：图标|插图导航的下一张
        + '<symbol id="icoNextFig">'
        + '<path d="M.97.091C.205.375-.19 1.238.09 2.018L8.998 27 .089 51.982a1.516 1.516 0 0 0 .75 1.87l.13.057c.72.267 1.511-.073 1.834-.765l.055-.134 9.023-25.305c.007-.02.119-.27.119-.705 0-.435-.111-.684-.12-.706L2.859.99A1.465 1.465 0 0 0 .97.09z"/>'
        + '</symbol>'
        // SVG 图标集：图标|逐章导航的上一章'
        + '<symbol id="icoPrevChapter">'
        + '<path d="M7.364.293a1 1 0 0 1 0 1.414l-4.97 4.969 4.974 4.974a1 1 0 0 1-1.415 1.414L.296 7.407a.996.996 0 0 1-.291-.658.995.995 0 0 1 .288-.8L5.95.294a1 1 0 0 1 1.414 0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|逐章导航的下一章
        + '<symbol id="icoNextChapter">'
        + '<path d="M.296.293a1 1 0 0 0 0 1.414l4.97 4.969L.293 11.65a1 1 0 0 0 1.414 1.414l5.657-5.657a.996.996 0 0 0 .292-.658.995.995 0 0 0-.288-.8L1.71.294a1 1 0 0 0-1.415 0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|已收起的目录节点 / 引用折叠 / 表格折叠行节点
        + '<symbol id="icoFolded">'
        + '<path fill="none" d="M0 0h16v16H0z"/><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm-.336 2.757A1 1 0 1 0 6.25 5.172l2.835 2.835-2.835 2.836a1 1 0 1 0 1.414 1.414l3.535-3.536a.997.997 0 0 0 .293-.707V8a.997.997 0 0 0-.293-.707z"/>'
        + '</symbol>'
        // SVG 图标集：图标|已展开的目录节点 / 引用折叠 / 表格折叠行节点
        + '<symbol id="icoUnfold">'
        + '<path fill="none" d="M0 0h16v16H0z"/><path d="M2.337 7.075A1 1 0 1 1 3.751 5.66l4.247 4.247 4.246-4.247a1 1 0 0 1 1.414 1.415l-4.95 4.95a.997.997 0 0 1-.71.292.996.996 0 0 1-.711-.293l-4.95-4.95z"/>'
        + '</symbol>'
        // SVG 图标集：图标|展开长内容
        + '<symbol id="icoExtend">'
        + '<path fill="none" d="M0 1h20v20H0z"/><path d="M5.05 6.364A1 1 0 0 1 6.464 4.95L10 8.485l3.536-3.535a1 1 0 1 1 1.414 1.414l-4.243 4.243a1 1 0 0 1-1.414 0L5.05 6.364z" fill="#FFF"/><path d="M5.05 12.364a1 1 0 0 1 1.414-1.414L10 14.485l3.536-3.535a1 1 0 1 1 1.414 1.414l-4.243 4.243a1 1 0 0 1-1.414 0L5.05 12.364z"/>'
        + '</symbol>'
        // SVG 图标集：图标|关闭
        + '<symbol id="icoClose">'
        + '<path d="M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|清空输入
        + '<symbol id="icoResetInput">'
        + '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM5.737 4.606a.8.8 0 0 0-1.131 1.131L6.869 8l-2.263 2.263a.8.8 0 1 0 1.131 1.131L8 9.131l2.263 2.263a.8.8 0 1 0 1.131-1.131L9.131 8l2.263-2.263a.8.8 0 1 0-1.131-1.131L8 6.869z"/>'
        + '</symbol>'
        // SVG 图标集：图标|亮色模式
        + '<symbol id="icoLightMode">'
        + '<path d="M10 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414zm-11.314 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm9 5a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zM2 9a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h1zm15.071-6.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-12.728 0l.707.707A1 1 0 1 1 3.636 5.05l-.707-.707A1 1 0 0 1 4.343 2.93zM10 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"/>'
        + '</symbol>'
        // SVG 图标集：图标|深色模式
        + '<symbol id="icoDarkMode">'
        + '<path d="M11.338 0C15.176 1.107 18 4.605 18 8.8c0 5.08-4.117 9.2-9.198 9.2C4.607 18 1.107 15.174 0 11.338c1.226.705 2.628 1.14 4.144 1.14a8.336 8.336 0 0 0 8.336-8.336c0-1.516-.435-2.919-1.142-4.142zM4.743 5.243l.83 2.106a1 1 0 0 0 .564.563l2.106.83-2.106.831a1 1 0 0 0-.564.564l-.83 2.106-.831-2.106a1 1 0 0 0-.563-.564l-2.106-.83 2.106-.831a1 1 0 0 0 .563-.563l.83-2.106zM8.828.828l.69 1.748a1 1 0 0 0 .563.563l1.747.69-1.747.689a1 1 0 0 0-.563.563l-.69 1.747-.689-1.747a1 1 0 0 0-.563-.563l-1.748-.69 1.748-.689a1 1 0 0 0 .563-.563L8.83.828zm-5.5 0l.548 1.39a1 1 0 0 0 .564.563l1.388.547-1.388.548a1 1 0 0 0-.564.564l-.548 1.388-.547-1.388a1 1 0 0 0-.564-.564L.828 3.328l1.39-.547a1 1 0 0 0 .563-.564L3.328.828z"/>'
        + '</symbol>'
        // SVG 图标集：图标|聚光灯
        + '<symbol id="icoSpotlight">'
        + '<path d="M7 0a7 7 0 0 1 6.992 6.67A7.002 7.002 0 0 1 11 20a7 7 0 0 1-6.992-6.67A7.002 7.002 0 0 1 7 0zm4 6a7 7 0 0 0-6.992 7.33 7 7 0 0 0 9.985-6.662A6.984 6.984 0 0 0 11 6.001z"/>'
        + '</symbol>'
        // SVG 图标集：图标|激光笔
        + '<symbol id="icoLaserPointer">'
        + '<path d="M10.951 5.006L12.04 6.57l5.306 7.63a3.662 3.662 0 0 1-.89 5.074l-.096.067a3.602 3.602 0 0 1-1.829.65l-.218.009a3.615 3.615 0 0 1-2.991-1.553L4.929 9.253a3.662 3.662 0 0 1 .887-5.075l.098-.067a3.602 3.602 0 0 1 5.037.895zm-3.853.504l-.147.094v-.002l-.097.07a1.83 1.83 0 0 0-.538 2.387l.094.148 1.088 1.565 3.06-2.158L9.47 6.051a1.801 1.801 0 0 0-2.372-.541zm-6.012.836l1.102.125a.862.862 0 0 1 .595.343c.143.192.2.435.159.672a.98.98 0 0 1-1.072.807L.767 8.168a.862.862 0 0 1-.595-.343.874.874 0 0 1-.16-.67v-.002a.98.98 0 0 1 1.074-.807zM4.608.696l.78 1.12A.93.93 0 0 1 5.15 3.09a.916.916 0 0 1-1.27-.213L3.1 1.757A.93.93 0 0 1 3.328.468h-.001a.916.916 0 0 1 1.28.228zm5.91-.681c.237.042.446.18.58.38.134.201.18.448.129.685l-.222 1.023a.957.957 0 0 1-1.102.743.882.882 0 0 1-.579-.38.893.893 0 0 1-.13-.684L9.418.76a.957.957 0 0 1 1.101-.744z"/>'
        + '</symbol>'
        // SVG 图标集：图标|段落导航
        + '<symbol id="icoParagraphNav">'
        + '<path d="M3.698 17.714v-5.036A.68.68 0 0 0 3.02 12a.68.68 0 0 0-.678.678v5.047L1.155 16.54a.689.689 0 0 0-.96 0c-.26.26-.26.69 0 .96l2.294 2.294a.67.67 0 0 0 .474.204h.068a.65.65 0 0 0 .475-.204L5.799 17.5c.26-.26.26-.689 0-.96-.237-.271-.666-.271-.926 0l-1.175 1.175zm0-15.432V7.32a.68.68 0 0 1-.678.678.68.68 0 0 1-.678-.678V2.27L1.155 3.458c-.26.26-.689.26-.96 0a.689.689 0 0 1 0-.96L2.489.202A.67.67 0 0 1 2.963 0h.068c.17 0 .35.068.475.203l2.293 2.294c.26.26.26.69 0 .96-.237.272-.666.272-.926 0L3.698 2.283zM8 9h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3.5h7a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 16h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 5.5h7a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 2h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2z"/>'
        + '</symbol>'
        // SVG 图标集：图标|字体风格
        + '<symbol id="icoFont">'
        + '<path d="M13.576 0l6.048 2.73a.5.5 0 0 1 .28.57l-.978 4.134a1 1 0 0 1-1.224.737l-1.093-.283.391 9.065a1 1 0 0 1-.999 1.043H4.022a1 1 0 0 1-1-1.04l.369-9.068-1.093.283a1 1 0 0 1-1.224-.737L.095 3.3a.5.5 0 0 1 .28-.571L6.425 0c.417 1.178 1.926 1.92 3.603 1.92 1.677 0 3.131-.742 3.55-1.92zm.76 15h-9a.5.5 0 0 0 0 1h9a.5.5 0 1 0 0-1zm0-2h-9a.5.5 0 0 0 0 1h9a.5.5 0 1 0 0-1zM10.17 4h-.675a1 1 0 0 0-.905.573L5.513 11.08a.644.644 0 0 0 .582.919h.38a1 1 0 0 0 .906-.578l.604-1.299h3.703l.566 1.28a1 1 0 0 0 .914.597h.391a.659.659 0 0 0 .595-.941L11.073 4.57A1 1 0 0 0 10.169 4zm-.333 1.813l1.308 2.967h-2.59l1.282-2.967z"/>'
        + '</symbol>'
        // SVG 图标集：图标|打印
        + '<symbol id="icoPrint">'
        + '<path d="M15 0a2 2 0 0 1 2 2v4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V2a2 2 0 0 1 2-2h10zm1 13H4v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4zm-2 2v1H6v-1h8zm3.5-7h-1a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-3.372 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM15 1H5a1 1 0 0 0-1 1v4h12V2a1 1 0 0 0-.883-.993L15 1z"/>'
        + '</symbol>'
        // SVG 图标集：图标|插图浏览器中打开
        + '<symbol id="icoOpenInFigureNav">'
        + '<path d="M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zm.25 6.5a.75.75 0 0 0-.75.75v2.996l-.007.057a.25.25 0 0 1-.244.193H9.25l-.102.006a.75.75 0 0 0 .102 1.494h3l.143-.006A1.75 1.75 0 0 0 14 10.246V7.25l-.007-.102a.75.75 0 0 0-.743-.648zM6.748 2H3.75l-.144.006A1.75 1.75 0 0 0 2 3.75v2.996l.007.101A.75.75 0 0 0 3.5 6.746V3.75l.007-.057A.25.25 0 0 1 3.75 3.5h2.998l.101-.007A.75.75 0 0 0 6.748 2z"/>'
        + '</symbol>'
        // SVG 图标集：图标|表格阅读模式（十字光标）
        + '<symbol id="icoTableCross">'
        + '<path d="M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zM1 11a2 2 0 0 0 1.85 1.995L3 13h2v-3h6v3h2a2 2 0 0 0 1.995-1.85L15 11v-1h-4V7h4V3a2 2 0 0 0-2-2h-2v6H5V1H3a2 2 0 0 0-1.995 1.85L1 3v4h4v3H1v1z"/>'
        + '</symbol>'
        // SVG 图标集：图标|画中画
        + '<symbol id="icoPicInPic">'
        + '<path d="M14 7a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4zm-2-7a3 3 0 0 1 3 3v3h-1V3a2 2 0 0 0-1.85-1.995L12 1H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4v1H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h9zM2.663 2.663a.556.556 0 0 1 .786 0l2.94 2.909V3.61a.556.556 0 1 1 1.111 0v3.334a.556.556 0 0 1-.556.556H3.611a.556.556 0 0 1 0-1.111h2.023l-2.971-2.94a.556.556 0 0 1 0-.786z"/>'
        + '</symbol>'
        // SVG 图标集：图标|画中画的放大模式
        + '<symbol id="icoZoomIn">'
        + '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.75a.75.75 0 0 0-.75.75v2.996l-.007.057a.25.25 0 0 1-.244.193H7.5l-.102.006a.75.75 0 0 0 .102 1.494h3l.143-.006a1.75 1.75 0 0 0 1.607-1.744V7.5l-.007-.102a.75.75 0 0 0-.743-.648zm-3.002-3H5.5l-.144.006A1.75 1.75 0 0 0 3.75 5.5v2.996l.007.101a.75.75 0 0 0 1.493-.101V5.5l.007-.057A.25.25 0 0 1 5.5 5.25h2.998l.101-.007a.75.75 0 0 0-.101-1.493z"/>'
        + '</symbol>'
        // SVG 图标集：图标|画中画的缩小模式
        + '<symbol id="icoZoomOut">'
        + '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4.998 8.25H10l-.144.006A1.75 1.75 0 0 0 8.25 10v2.996l.007.101a.75.75 0 0 0 1.493-.101V10l.007-.057A.25.25 0 0 1 10 9.75h2.998l.101-.007a.75.75 0 0 0-.101-1.493zM7 2.25a.75.75 0 0 0-.75.75v2.996l-.007.057a.25.25 0 0 1-.244.193H3l-.102.006A.75.75 0 0 0 3 7.746h3l.143-.006A1.75 1.75 0 0 0 7.75 5.996V3l-.007-.102A.75.75 0 0 0 7 2.25z"/>'
        + '</symbol>'
        // SVG 图标集：图标|复制
        + '<symbol id="icoCopy">'
        + '<path d="M14.15 0A1.851 1.851 0 0 1 16 1.849V12.15A1.851 1.851 0 0 1 14.15 14H11.6v.151A1.85 1.85 0 0 1 9.751 16H1.85A1.85 1.85 0 0 1 0 14.151V3.85A1.85 1.85 0 0 1 1.849 2H4.4v-.151A1.851 1.851 0 0 1 6.25 0h7.9zM1.85 14.8h7.9a.65.65 0 0 0 .65-.649V3.85a.65.65 0 0 0-.649-.649H1.85a.65.65 0 0 0-.649.649V14.15a.65.65 0 0 0 .65.649zM8.2 5.6a.6.6 0 0 1 0 1.2H3.4a.6.6 0 0 1 0-1.2h4.8zm0 2.8a.6.6 0 0 1 0 1.2H3.4a.6.6 0 0 1 0-1.2h4.8zm-1.6 2.8a.6.6 0 0 1 0 1.2H3.4a.6.6 0 1 1 0-1.2h3.2z"/>'
        + '</symbol>'
        // SVG 图标集：图标|复制 as Markdown
        + '<symbol id="icoCopyAsMd">'
        + '<path d="M14.15 0A1.851 1.851 0 0 1 16 1.849V12.15A1.851 1.851 0 0 1 14.15 14H11.6v.151A1.85 1.85 0 0 1 9.751 16H1.85A1.85 1.85 0 0 1 0 14.151V3.85A1.85 1.85 0 0 1 1.849 2H4.4v-.151A1.851 1.851 0 0 1 6.25 0h7.9zM9.752 3.2H1.85a.65.65 0 0 0-.649.649V14.15a.65.65 0 0 0 .65.649h7.9a.65.65 0 0 0 .65-.649V3.85a.65.65 0 0 0-.649-.649zM13.897 6h-1.549v2.574H10.8L13.123 11l2.322-2.426h-1.548V6zM4.248 6l1.549 1.838L7.345 6h1.549v5H7.345V8.132L5.797 9.971 4.248 8.132V11H2.7V6h1.548z"/>'
        + '</symbol>'
        // SVG 图标集：图标|加载中
        + '<symbol id="icoLoading">'
        + '<rect x="7" width="2" height="4" rx="1"/><rect transform="rotate(45 12.243 3.757)" x="11.243" y="1.757" width="2" height="4" rx="1"/><rect transform="rotate(90 14 8)" x="13" y="6" width="2" height="4" rx="1"/><rect transform="rotate(135 12.243 12.243)" x="11.243" y="10.243" width="2" height="4" rx="1"/><rect transform="rotate(180 8 14)" x="7" y="12" width="2" height="4" rx="1"/><rect transform="rotate(-135 3.757 12.243)" x="2.757" y="10.243" width="2" height="4" rx="1"/><rect transform="rotate(-90 2 8)" x="1" y="6" width="2" height="4" rx="1"/><rect transform="rotate(-45 3.757 3.757)" x="2.757" y="1.757" width="2" height="4" rx="1"/>'
        + '</symbol>'
        // SVG 图标集：图标|播放
        + '<symbol id="icoPlay">'
        + '<path d="M14.133 9.605l-7.86 6.028c-.93.633-2.223.427-2.887-.459A1.909 1.909 0 0 1 3 14.028V1.972C3 .882 3.927 0 5.07 0c.432 0 .852.128 1.203.367l7.86 6.028c.93.633 1.146 1.865.481 2.751a2.024 2.024 0 0 1-.481.459z"/><path fill="none" d="M0 0h16v16H0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|暂停
        + '<symbol id="icoPause">'
        + '<path d="M3 2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 0h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="none" d="M0 0h16v16H0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|停止
        + '<symbol id="icoStop">'
        + '<rect x="2" y="2" width="12" height="12" rx="2"/><path fill="none" d="M0 0h16v16H0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|无法播放
        + '<symbol id="icoForbidden">'
        + '<path d="M3.11 4.523a6.001 6.001 0 0 0 8.368 8.367L3.11 4.523zM4.522 3.11l8.368 8.367A6 6 0 0 0 4.522 3.11zM8 16A8.001 8.001 0 1 1 8.002.002 8.001 8.001 0 0 1 8 16z" /><path fill="none" d="M0 0h16v16H0z"/>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（未选择）
        + '<symbol id="icoCheckbox_uncheck">'
        + '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 1H4l-.205.007a2.99 2.99 0 0 0-1.916.872A2.99 2.99 0 0 0 1 4v6l.007.205a2.99 2.99 0 0 0 .872 1.916A2.99 2.99 0 0 0 4 13h6l.205-.007a2.99 2.99 0 0 0 1.916-.872A2.99 2.99 0 0 0 13 10V4l-.007-.205a2.99 2.99 0 0 0-.872-1.916A2.99 2.99 0 0 0 10 1z"/>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（已选择）
        + '<symbol id="icoCheckbox_checked">'
        + '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm.435 3.36a1 1 0 0 0-1.393.245L5.703 8.372 4.421 7.09a1 1 0 1 0-1.414 1.414l2.121 2.121a1 1 0 0 0 1.225.15l.01-.007.01-.005a.997.997 0 0 0 .292-.277l4.015-5.734a1 1 0 0 0-.245-1.393z"/>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（不确定选择）
        + '<symbol id="icoCheckbox_indeterminate">'
        + '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 6H4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2z" opacity=".5"/><path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 1H4l-.205.007a2.99 2.99 0 0 0-1.916.872A2.99 2.99 0 0 0 1 4v6l.007.205a2.99 2.99 0 0 0 .872 1.916A2.99 2.99 0 0 0 4 13h6l.205-.007a2.99 2.99 0 0 0 1.916-.872A2.99 2.99 0 0 0 13 10V4l-.007-.205a2.99 2.99 0 0 0-.872-1.916A2.99 2.99 0 0 0 10 1z"/>'
        + '</symbol>'
        // SVG 图标集：图标|链接检查结果异常
        + '<symbol id="icoLinkError">'
        + '<path d="M8 0c.462 0 .887.24 1.11.626l6.73 11.572c.219.375.213.834-.016 1.204-.228.371-.645.598-1.095.598H1.271c-.45 0-.867-.227-1.095-.598a1.166 1.166 0 0 1-.016-1.204L6.89.626A1.28 1.28 0 0 1 8 0zm0 10.361c-.841 0-1.524.652-1.524 1.456 0 .52.29 1 .762 1.26.472.26 1.052.26 1.524 0 .471-.26.762-.74.762-1.26 0-.804-.683-1.456-1.524-1.456zm0-7.278l-.154.005c-.744.047-1.116.45-1.116 1.208v3.64c0 .808.424 1.212 1.27 1.212l.154-.005c.744-.047 1.116-.45 1.116-1.208V4.296c0-.808-.424-1.213-1.27-1.213z"/>'
        + '</symbol>'
        + '</svg>';
    return ui;
}

/**
 * 加载顶栏 UI 资源
 */
function VLOOKui_loadTopbar() {
    let ui = '';
    // ui += '<div class="v-topbar v-focus-search">';
    // ==================================================
    // 页面工具栏
    ui += '<div class="v-toolbar v-focus-search">'
            // 导航中心
            + '<div class="v-btn nav-center">'
                + V_ui_generateSvgIcon("icoNavCenter", 20, 20, s_Light)
            + '</div>'
            // 打印
            + '<div class="v-btn print">'
                + V_ui_generateSvgIcon("icoPrint", 20, 19, s_Light)
            + '</div>'
            + '<div class="v-btn-group prs">'
                // 段落导航
                + '<div ' + s_DataBtnGroup + '="prs" class="v-btn paragraph-nav">'
                    + V_ui_generateSvgIcon("icoParagraphNav", 20, 20, s_Light)
                + '</div>'
                // 聚光灯
                + '<div ' + s_DataBtnGroup + '="prs" class="v-btn spotlight">'
                    + V_ui_generateSvgIcon("icoSpotlight", 18, 20, s_Light)
                + '</div>'
                // 激光笔
                + '<div ' + s_DataBtnGroup + '="prs" class="v-btn laser-pointer">'
                    + V_ui_generateSvgIcon("icoLaserPointer", 18, 20, s_Light)
                + '</div>'
            + '</div>'
            // 分隔符
            + '<div class="v-toolbar-spliter"></div>'
            // Light/Dark模式
            + '<div class="v-btn color-scheme">'
                + V_ui_generateSvgIcon("icoDarkMode", 18, 18, s_Light)
            + '</div>'
            // 字体风格
            + '<div class="v-btn font-theme">'
                + V_ui_generateSvgIcon("icoFont", 20, 18, s_Light)
            + '</div>'
        + '</div>';

    // ==================================================
    // 逐章导航栏
    ui += '<div class="v-chapter-nav v-focus-search">'
            // 上一章
            + '<div class="v-chapter-nav-prev">'
                + V_ui_generateSvgIcon("icoPrevChapter", 10, 15, s_Light, "position: absolute; top: 18px; left: 15px;")
            + '<div class="v-chapter-nav-prev-text"></div>'
            + '</div>'
            // 文档标题
            + '<div class="v-chapter-nav-doc-title">Document title</div>'
            // 当前章节
            + '<div class="v-chapter-nav-current"></div>'
            // 下一章
            + '<div class="v-chapter-nav-next">'
                + '<div class="v-chapter-nav-next-text">next</div>'
                    + V_ui_generateSvgIcon("icoNextChapter", 10, 15, s_Light, "position: absolute; top: 18px; right: 15px;")
            + '</div>'
        + '</div>';

    // ui += '</div>';

    return ui;
}

/**
 * 加载导航中心 UI 资源
 */
function VLOOKui_loadNavCenter() {
    let ui = '';
    // --------------------------------------------------
    // 导航中心
    ui += '<div class="v-nav-center v-float-card">'
            // --- 导航中心头部 ---
            + '<div class="v-nav-center-header">'
                // 关键字搜索
                + '<div class="v-search-by-keyword"></div>'
                // 分段控制器组件
                + '<div class="v-segment toc"></div>'
            // 访问历史标题
            + '<div class="v-toc-history-title">访问历史</div>'
            + '</div>'
            // --- 导航中心内容区 ---
            + '<div class="v-nav-center-body">'
                + '<div class="v-toc-catalog-body" ' + s_DataCatalogEmpty + '="( Catalog is Empty )"></div>'
                + '<div class="v-toc-filter-result catalog"></div>'
                + '<div class="v-toc-filter-result figure"></div>'
                + '<div class="v-toc-filter-result table"></div>'
                + '<div class="v-toc-filter-result media"></div>'
                + '<div class="v-toc-filter-result codeblock"></div>'
                + '<div class="v-toc-history-result"></div>'
            + '</div>'
            + '<div class="v-nav-center-footer"></div>'
            // 文库
            + '<div class="v-doc-lib-board">'
                + '<div class="item"></div>'
                + '<div class="flip"></div>'
                + '<div class="flip"></div>'
                + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 导航中心收起/展开引导把手
    ui += '<div class="v-toc-handle"></div>';

    return ui;
 }

/**
 * 加载共用的 UI 资源
 */
function VLOOKui_loadCommon() {
    let ui = '';

    // --------------------------------------------------
    // 聚光灯
    ui += '<div class="v-spotlight"><div></div></div>';

    // --------------------------------------------------
    // 字体风格选择器
    ui += '<div class="v-font-theme">'
            + '<div style="display: inline-block; margin: 0 0 30px 0;">'
                + '<img alt="系统默认" class="v-font-theme-opt-local" src="https://madmaxchow.gitee.io/vlook/pic/fs-local.png" srcset="https://madmaxchow.gitee.io/vlook/pic/fs-local@2x.png 2x">'
                + '<div class="v-fontinfo-local"><div class="v-font-package">Font</div><div id="fontset-status">Ready</div></div>'
            + '</div>'
            + '<div style="display: inline-block; margin: 0 0 30px 10px;">'
                + '<img alt="小清新" class="v-font-theme-opt-sans" src="https://madmaxchow.gitee.io/vlook/pic/fs-sans.png" srcset="https://madmaxchow.gitee.io/vlook/pic/fs-sans@2x.png 2x">'
                + '<div class="v-fontinfo-sans"><div class="v-font-package">Font</div><div id="fontset-status">NOT LOADED</div></div>'
            + '</div>'
            + '<div style="display: inline-block; margin: 0 0 30px 10px;">'
                + '<img alt="文艺范" class="v-font-theme-opt-serif" src="https://madmaxchow.gitee.io/vlook/pic/fs-serif.png" srcset="https://madmaxchow.gitee.io/vlook/pic/fs-serif@2x.png 2x">'
                + '<div class="v-fontinfo-serif"><div class="v-font-package">Font</div><div id="fontset-status">NOT LOADED</div></div>'
            + '</div>'
            + '<div class="v-font-theme-info">Download Font Package</div>'
        + '</div>';

    // --------------------------------------------------
    // 插图导航面板
    ui += '<div class="v-fig-nav v-backdrop-blurs">'
            + '<div class="v-fig-content"></div>'
            + '<div class="v-fig-nav-title"></div>'
            + '<div class="v-fig-nav-btns prev">'
                + V_ui_generateSvgIcon("icoPrevFig", 12, 54, s_Light)
            + '</div>'
            + '<div class="v-fig-nav-btns next">'
                + V_ui_generateSvgIcon("icoNextFig", 12, 54, s_Light)
            + '</div>'
            + '<div class="v-btn-close-figure-nav">'
                + V_ui_generateSvgIcon("icoClose", 16, 16, s_Light)
            + '</div>'
            + V_ui_copyrightInfo()
        + '</div>';

    // --------------------------------------------------
    // 脚注弹层
    ui += '<div class="v-foot-note-panel">'
            + '<div class="v-foot-note-panel-content"></div>'
            + '<div class="v-foot-note-panel-header"></div>'
            + '<div class="v-foot-note-panel-all"><a>查看所有脚注</a></div>'
            + '<a id="vk-footer-area"></a>'
        + '</div>';

    // --------------------------------------------------
    // 复制代码块内容的按钮
    ui += '<div class="v-content-assistor v-float-card">'
            + '<div class="v-btn assistor open-in-figure-nav">'
                + V_ui_generateSvgIcon("icoOpenInFigureNav", 16, 14, s_Light)
            + '</div>'
            + '<div class="v-btn assistor table-cross">'
                + V_ui_generateSvgIcon("icoTableCross", 16, 14, s_Light)
            + '</div>'
            + '<div class="v-btn assistor copy">'
                + V_ui_generateSvgIcon("icoCopy", 16, 16, s_Light)
            + '</div>'
            + '<div class="v-btn assistor pic-in-pic">'
                + V_ui_generateSvgIcon("icoPicInPic", 16, 16, s_Light)
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 画中画容器
    ui += '<div class="v-pic-in-pic">'
            + '<div class="v-pip-btn v-zoom zoom-out v-float-card">'
                + V_ui_generateSvgIcon("icoZoomIn", 16, 16, "theme")
            + '</div>'
            + '<div class="v-pip-btn v-close zoom-out v-float-card">'
                + V_ui_generateSvgIcon("icoResetInput", 16, 16, "theme")
            + '</div>'
            + '<div class="v-content">'
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 提示信息
    ui += '<div class="v-tool-tips"></div>'
        + '<div class="v-info-tips v-float-card"></div>';

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += '<div class="v-more-doc-content-before cover"></div>'
        + '<div class="v-more-doc-content-after"></div>';

    // --------------------------------------------------
    // 表格阅读模式（十字光标）
    ui += '<div d-direction="1" class="v-table-cross left-up">&nbsp;</div>'
        + '<div d-direction="2" class="v-table-cross right-up">&nbsp;</div>'
        + '<div d-direction="3" class="v-table-cross left-down">&nbsp;</div>'
        + '<div d-direction="4" class="v-table-cross right-down">&nbsp;</div>';

    // --------------------------------------------------
    // 内容展开操作区
    ui += '<div class="v-content-expander">'
            + '<div class="v-btn">'
            + '<span></span>'
                + V_ui_generateSvgIcon("icoExtend", 20, 20, s_Light)
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += '<div class="v-link-error-list v-float-card">'
            + '<div class="v-link-error-list-header"></div>'
            + '<div class="v-link-error-list-body"><div class="v-link-error-list-items"></div></div>'
            + '<div class="v-link-error-list-footer"></div>'
        + '</div>'
        + '<div class="v-status-bar v-float-card v-backdrop-blurs v-focus-search">'
            + '<div class="v-doc-info">- - / - -</div>'
            + '<div class="v-zoom-view">- Zoom +</div>'
            + '<div class="v-link-chk-result">'
                + V_ui_generateSvgIcon("icoLoading", 16, 16, s_Light)
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += '<iframe name="vlook-stat-gitee" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"></iframe>';
    ui += '<div class="v-doc-lib v-float-card"><iframe name="vlook-doc-lib"></iframe></div>';
    return ui;
}

// ==================== 加载与初始化 VLOOK ==================== //

/**
 * 文档加载完成后执行主流程
 */
$(document).ready(function () {
    // 完成页面加载后，移除预加载的初始 UI
    $("#VLOOK").remove();

    // ----------------------------------------
    // 初始化启动参数
    V_params_init();

    // 判断文档类型
    if (V_util_getParamVal("type") === s_Mini) {
        V_type = s_Mini;
        V_data_set("doc-lib-title", V_util_getDocTitle());
    }

    // ----------------------------------------
    INFO("- Ready");
    gTimes = iStopwatch.ed(s_4space);
    // 打印环境信息
    env.print();

    iStopwatch.st();
    INFO("=== Load VLOOK ===");

    // ----------------------------------------
    // 初始化语言
    V_lang_init();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 动效初始化
    iStopwatch.st("* Effect");
    let effect = V_util_getParamVal(s_Effect);
    V_ui_effect = (effect === gUndefined) ? 2 : JS_parseInt(effect);
    V_ui_effect = env.device.mobile ? 0 : V_ui_effect;
    LOG("    └ Level [ " + V_ui_effect + " ]");
    V_ui_initEffectLevel();
    iStopwatch.ed(s_Cost);

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.st("* Welcome Page Init");
    let wsMode = V_util_getParamVal("ws");
    wsMode = (wsMode === gUndefined) ? s_Auto : wsMode;
    LOG("    └ mode: " + wsMode);
    WelcomePage_init(wsMode);

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (V_checkSpec() === gFalse) {
        $(".v-welcome-page").hide();
        $(".v-toolbar").hide();
        $(".v-btn").hide();
        return;
    }
    iStopwatch.ed(s_Cost);

    // ----------------------------------------
    // 初始化关键组件实例
    iStopwatch.st("* Intance");
    V_init();
    iStopwatch.ed(s_Cost);

    // ----------------------------------------
    // 延后加载 VLOOK 插件，避免欢迎页的 UI 刷新阻塞
    // 独立线程进行处理
    setTimeout(loadVLOOKplugin, 100);
});

/**
 * 字体加载完成后执行的主流程
 */
document.fonts.ready.then(function() {
    // 字体加载完成后的逻辑
    LOG("!!! ALL FONT READY !!!");
});

/**
 * 加载 VLOOK UI 资源
 */
function loadVLOOKui() {
    $(".v-vlook-inside").after(VLOOKui_loadWelcomePage()
        + VLOOKui_loadIconSet()
        + VLOOKui_loadTopbar()
        + VLOOKui_loadNavCenter()
        + VLOOKui_loadCommon());
}

/**
 * 加载 VLOOK 插件
 */
function loadVLOOKplugin() {
    // ----------------------------------------
    // 推荐的浏览器类型检测
    iStopwatch.st("* Browser Check");
    if (env.browser.Chrome === gFalse && env.browser.Firefox === gFalse && env.browser.Safari === gFalse) {
        V_report_push(['Error', 'Browser', navigator.userAgent, ]);
        ALERT([
            "为获得最佳兼容性，建议使用 Chrome / Firefox / Edge 浏览器",
            // "為獲得最佳兼容性，建議使用 Chrome / Firefox / Edge 瀏覽器",
            "For best compatibility, it is recommended to use Chrome / Firefox / Edge browser",
            // "Pour une meilleure compatibilité, il est recommandé d'utiliser le navigateur Chrome / Firefox / Edge",
            // "Für eine optimale Kompatibilität wird empfohlen, den Chrome / Firefox / Edge-Browser zu verwenden",
            // "Para una mejor compatibilidad, se recomienda utilizar el navegador Chrome / Firefox / Edge",
            // "Для лучшей совместимости рекомендуется использовать браузер Chrome / Firefox / Edge.",
            // "最高の互換性のために、Chrome / Firefox / Edgeブラウザを使用することをお勧めします",
            // "최상의 호환성을 위해 Chrome / Firefox / Edge 브라우저를 사용하는 것이 좋습니다."
        ][V_lang_id]);
    }

    iStopwatch.ed(s_4space);

    // ========================================
    // 初始化 VLOOK 核心模块
    V_initKernel();

    // ----------------------------------------
    // 修改主题默认的圆角风格
    let newRadius = V_util_getParamVal("radius");
    if (newRadius === "small" || newRadius === "big") {
        // 批量修改圆角相关的 CSS 变量为指定的新值
        V_util_changeCssVarSet([
            s_varRB__,
            s_varRS__,
            s_varRT__,
            s_varRTag__,
            // "--v-tag-small-radius",
            s_varRC__
        ], newRadius);
    }
    else if (newRadius === s_None) {
        // 批量修改圆角相关的 CSS 变量为 0
        V_util_changeCssVarSet([
            s_varRB__,
            s_varRS__,
            s_varRT__,
            s_varRTag__,
            s_varRC__
        ]);
    }

    // ----------------------------------------
    // 统一同组的分栏引用的高度
    __fork("Quote Unite Columns Height", function () {
        ExtQuote_uniteColumnsHeight();
    }, 1000);

    // ----------------------------------------
    // 段落导航初始化
    __fork("Paragraph Nav", function () {
        ParagraphNav.init();
    }, 100);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.st("* Write Ready");
    JQ_addClass(VOM_doc(), "v-load-done v-focus-search");
    iStopwatch.ed(s_4space);

    // ----------------------------------------
    // 初始化外部链接
    __fork("External Link", function () {
        V_doc_link_adjustExternal();
    }, 100);

    // ----------------------------------------
    // 初始化全局热键
    __fork("Hotkey", function () {
        V_ui_initHotkey();
    }, 150);

    // ----------------------------------------
    // 初始化须在页面 body 显示后才能执行的部分
    __fork("Restyle", function () {
        V_initRestyle();
    }, 200);

    // ----------------------------------------
    // 检查页内链接坏链
    __fork("Check Hash Link", function () {
        LinkTool_mdToHtml();
        LinkTool_checkLink();
    }, 250);

    // ----------------------------------------
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    __fork("Color Scheme", function () {
        ColorScheme.scheme = V_util_getVarVal("--v-color-scheme").x();
        INFO("    System [ " + ColorScheme.scheme + " ]");
        ColorScheme.init();
        // 判断当前文档是否强制指定了颜色方案
        let colorScheme = V_util_getParamVal("cs");
        if (colorScheme === s_Light || colorScheme === s_Dark) {
            INFO("    Force use [ " + colorScheme + " ]");
            ColorScheme.tg(colorScheme);
        }
        // 若系统当前颜色方案是 dark，则强制同步
        else if (ColorScheme.scheme === s_Dark)
            ColorScheme.tg(ColorScheme.scheme);
    }, 300);

    // ----------------------------------------
    // 提交统计数据
    __fork("Push Stat", function () {
        V_report_submit(gTotalTimes - gTimes);
        V_report_push(['DocLoadTime', 'All', 'Times', gTimes]);
        V_report_push(['VlookLoadTime', 'All', 'Times', gTotalTimes - gTimes]);
    }, 350);

    // ----------------------------------------
    // 初始化内容助手
    // 须隐藏文档原始内容前执行，避免部分样式失效
    __fork("Content Assistor", function () {
        ContentAssistor_init();
        PicInPic_init();

        // 设置表格阅读模式的开关状态（不指定则默认开启）
        if (V_util_getParamVal("tr") !== s_Off)
            TableCross_toggle();
    }, 400);

    // ----------------------------------------
    // URL 带锚点的处理
    __fork("Redirect to Hash", function () {
        let redirect = V_util_redirectTo();
        if (VOM_cover() === gUndefined && redirect === gFalse) {
            iNavCenter.catalog.currentHeaderIndex = 0;
            V_ui_adjustAll();
            ExtQuote_uniteColumnsHeight();
        }
    }, 450);

    // ----------------------------------------
    // 字数统计
    // if (V_type === "max") {
    __fork("Words count", function () {
        DocInfo_countWord();
        // __countWord();
    }, 500);
    // }

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.st();
    INFO("* Welcome Page Done (" + WelcomePage_mode + ")");
    WelcomePage_done();
    iStopwatch.ed(s_Cost);

    // ----------------------------------------
    // VLOOK 加载完成
    gTotalTimes = iStopwatch.stop() - 200;
    INFO("=== !!! MAIN PROCESS DONE !!! ===");
    INFO("TOTAL COST   ⏱ " + gTotalTimes + " ms");
    INFO("    ├ HTML   ⏱ " + gTimes + " ms");
    INFO("    └ VLOOK  ⏱ " + (gTotalTimes - gTimes) + " ms");

    /**
     * 创建独立线程执行
     * @param msg 线程信息
     * @param callback 线程执行的回调函数
     * @param delay 0 - 立即时间，>0 - 延时执行（毫秒）
     */
    function __fork(msg, callback, delay) {
        setTimeout(function () {
            let sw = new Stopwatch();
            sw.st("* thread * [" + msg + "]");
            typeof(callback) === s_Function && callback();
            sw.ed(s_4space);
        }, delay);
    }
}
