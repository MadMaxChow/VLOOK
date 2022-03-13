/**************************************
 *
 * VLOOK JS - Typora Plugin
 *
 * V14.0
 * 2022-03-13
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 * https://gitee.com/madmaxchow/VLOOK
 *
 *************************************/

let vVer = "V14.0",
    iStopwatch = new Stopwatch(), // 初始化计时器
    gUndefined = undefined,
    gTrue = true,
    gFalse = false,
    gTimes = 0,
    gTotalTimes = 0,
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
    s_Caption1 = ".v-caption-1",
    s_Caption2 = ".v-caption-2",
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
    s_CssText = "cssText",
    s_Dark = "dark",
    s_Darksrc = "darksrc",
    s_Darksrcset = "darksrcset",
    s_DataAnchor = "data-v-anchor",
    s_DataBeforePrintFolded = "data-v-before-print-folded",
    s_DataBlockquoteFolded = "data-v-blockquote-folded",
    s_DataBtnGroup = "data-v-btn-group",
    s_DataCaptionCount ="data-v-caption-count",
    s_DataCatalogEmpty = "data-v-catalog-empty",
    s_DataCellMerge = "data-v-cell-merge",
    s_DataClipboardText = "data-clipboard-text",
    s_DataColspan = "data-v-colspan",
    s_DataColumnFmting = "data-v-column-fmting",
    s_DataContainer = "data-v-container",
    s_DataContentExpanded = "data-v-content-expanded",
    s_DataContentFolded = "data-v-content-folded",
    s_DataContentType = "data-v-content-type",
    s_DataDefault = "data-v-default",
    s_DataExtend = "data-v-extend",
    s_DataFigNum = "data-v-fig-num",
    s_DataFigType = "data-v-fig-type",
    s_DataFolded = "data-v-folded",
    s_DataFolder = "data-v-folder",
    s_DataFolderId = "data-v-folder-id",
    s_DataFoldingQuote = "data-v-folding-quote",
    s_DataForSearch = "data-for-search",
    s_DataDarkSrc = "data-v-darksrc",
    s_DataDuration = "data-v-duration",
    s_DataFigureGrid = "data-v-fig-grid",
    s_DataHistory = "data-v-history",
    s_DataIcon = "data-v-icon",
    s_DataIdFigType = "data-v-id-fig-type",
    s_DataKeywordMatch = "data-v-keyword-match",
    s_DataLmc = "data-v-lmc",
    s_DataNode = "data-v-node",
    s_DataParentFolderId = "data-v-parent-folder-id",
    s_DataPid = "data-v-pid",
    s_DataQuoteGroup = "data-v-quote-group",
    s_DataRef = "data-ref",
    s_DataRowFolded = "data-v-row-folded",
    s_DataRowOpenMode = "data-v-row-open-mode",
    s_DataSrc_ = "data-v-src-",
    s_DataSrcDark = "data-v-src-dark",
    s_DataSrcLight = "data-v-src-light",
    s_DataSrcset_ = "data-v-srcset-",
    s_DataSrcsetDark = "data-v-srcset-dark",
    s_DataSrcsetLight = "data-v-srcset-light",
    s_DataTd2th = "data-v-td2th",
    s_DataTitle = "data-v-title",
    s_DataId = "data-v-id",
    s_DataIdentLevel = "data-v-ident-level",
    s_DataImgFill = "data-v-img-fill",
    s_DataPause = "data-v-pause",
    s_DataPgIdx = "data-v-pg-idx",
    s_DataResult = "data-v-result",
    s_DataRbCoatData = "data-v-rb-coat-data",
    s_DataRbCoatShowed = "data-v-rb-coat-showed",
    s_DataRowGroup = "data-v-row-group",
    s_DataTblCol = "data-v-tbl-col",
    s_DataThRpt = "data-v-th-rpt",
    s_DataTips = "data-v-tips",
    s_Disabled = "disabled",
    s_Display = "display",
    s_Effect = "effect",
    s_Enabled = "enabled",
    s_Failed = "Failed [ ",
    s_False = "false",
    s_Fig = "fig",
    s_Fill = "fill",
    s_Filter = "filter",
    s_Float = "float",
    s_FontTheme = "font-theme",
    s_Freeze = "freeze",
    s_Height = "height",
    s_Hidden = "hidden",
    s_Hotkey = "Hotkey",
    s_Hover = "hover",
    s_Href = "href",
    s_Id = "id",
    s_Interactive = "Interactive",
    s_Invert = "invert",
    s_Italic = "italic",
    s_Lang = "lang",
    s_LaserPointer = "laster-pointer",
    s_Left = "left",
    s_Light = "light",
    s_Line = "line",
    s_Loop = "loop",
    s_Margin = "margin",
    s_MarginBottom = "margin-bottom",
    s_MarginLeft = "margin-left",
    s_MaxHeight = "max-height",
    s_MaxWidth = "max-width",
    s_Mini = "mini",
    s_MinWidth = "min-width",
    s_Name = "name",
    s_NavCenter = "nav-center",
    s_None = "none",
    s_Normal = "normal",
    s_Off = "off",
    s_Opacity = "opacity",
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
    s_Tabindex = "tabindex",
    s_Table = "table",
    s_TagName = "tagName",
    s_Target = "target",
    s_Text = "text",
    s_TextAlign = "text-align",
    s_TextLength = "textLength",
    s_Title = "title",
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
    s_Width = "width",
    s_WOFF2 = "woff2",
    s_Zindex = "z-index",
    tag_2space = "&nbsp;&nbsp;";
iStopwatch.lapStart();

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
function ERR() {
    console.error.apply(console, arguments);
}
// 弹窗显示信息
function A(m) {
    alert(m);
}

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
    iDocLib = gUndefined,
    iDocInfo = gUndefined,
    iZoomView = gUndefined,
    iStsBar = gUndefined,
    iMoreDocCt = gUndefined,
    iSpotlight = gUndefined,
    iLaserPointer = gUndefined,
    iFontTheme = gUndefined,
    iFigNav = gUndefined,
    iWelcomePage = gUndefined,
    iToolTips = gUndefined,
    iInfoTips = gUndefined,
    iFootNote = gUndefined,
    iContentFolder = gUndefined,
    iLinkTool = gUndefined,
    iContentAssistor = gUndefined;

// ==================== 文档对象模型 ==================== //

function DOM() {}

// 文档的 html 对象
let DOM_h = gUndefined;
function DOM_html() {
    if (DOM_h === gUndefined) {
        DOM_h = $("html");
        if (DOM_h.length === 0) {
            DOM_h = gUndefined;
            ERR(s_Failed + "DOM.html ]");
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
            ERR(s_Failed + "DOM.body ]");
        }
    }
    return DOM_b;
}

// ==================== VLOOK 对象模型 ==================== //

function VOM() {}

// Markdown 导出为 HTML 的内容对象
let VOM_d = gUndefined;
function VOM_doc() {
    if (VOM_d === gUndefined) {
        VOM_d = $("#write");
        if (VOM_d.length === 0) {
            VOM_d = gUndefined;
            ERR(s_Failed + "VOM.doc ]");
        }
    }
    return VOM_d;
}

// 封面对象
let VOM_c = gUndefined;
function VOM_cover() {
    if (VOM_c === gUndefined) {
        VOM_c = $("#write > pre.md-meta-block:first-child + h6, #write > h6:first-child");
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
        let fns = $(".footnotes-area");
        if (fns !== gUndefined) {
            let backcover = fns.prev(),
                tagName = backcover.prop(s_TagName);
            if (tagName !== gUndefined && tagName.toLowerCase() === "h1")
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
        && (T.css(s_Display) === s_None || T.css(s_Visibility) === s_Hidden || T.css(s_Opacity) === "0");
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
    this.html(pre + this.html() + suff);
}

/**
 * 替换所有内容
 */
String.prototype.rplAll = function (exp, value) {
    const reg = new RegExp(exp, "g");
    return this.replace(reg, value);
};

/**
 * 替换 innerHTML 的内容
 * @param exp 用于匹配内容的正则表达式
 * @param value 将匹配的内容替换成该内容
*/
$.prototype.rplHTML = function (exp, value) {
    this.html(this.html().replace(exp, value));
}

String.prototype.iO = function (value) {
    return this.indexOf(value);
}

/**
 * 从指定内容开始，替换之后的匹配的内容
 * @param str 从指定内容出现的位置开始进行替换
 * @param oldValue 被替换的内容
 * @param newValue 用于替换的新内容
 */
String.prototype.rplAfter = function (str, oldValue, newValue) {
    let T = this,
        i = T.iO(str);
    if (i > -1) {
        let pre = T.substring(0, i),
            suff = T.substring(i, T.length);
        return pre + suff.replace(oldValue, newValue);
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
 * 以指定字符结束
 */
String.prototype.endWith = function (str) {
    let T = this;
    if (str == null || str === "" || T.length === 0 || str.length > T.length)
        return gFalse;
    return T.substring(T.length - str.length) === str;
};

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
            trident: u.iO("Trident") > -1, //IE内核
            presto: u.iO("Presto") > -1, //opera内核
            webkit: u.iO("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.iO("Gecko") > -1 && u.iO("KHTML") === -1 //火狐内核
        };
    }(),

    // 设备信息
    device : function () {
        const u = navigator.userAgent;
        return {
            mobile: u.iO("Mobile") > -1, // 是否为移动终端
            iOS: u.iO("iPhone") > -1, // iOS 类终端
            android: u.iO("Android") > -1 || u.iO("Linux") > -1, // android 终端或者 UC 浏览器
            iPhone: u.iO("iPhone") > -1, // 是否为 iPhone 或者 QQHD 浏览器
            iPad: u.iO("iPad") > -1 // 是否 iPad
        };
    }(),

    // 浏览器类型
    browser : function () {
        const u = navigator.userAgent;
        return {
            Chrome: u.iO("Chrome") > -1 || u.iO(") CriOS") > -1, // Chrome 浏览器
            Firefox: u.iO("Firefox") > -1 || u.iO(") FxiOS") > -1, // Firefox 浏览器
            Safari: u.iO("Safari") > -1, // Safari 浏览器
            Edge: u.iO(" Edg/") > -1 // Edge 浏览器
        };
    }(),

    // 浏览器版本信息
    browserVer : function () {
        const u = navigator.userAgent;
        return {
            Chrome: u.match(/Chrome\/[\d.]+/gi) ? u.match(/Chrome\/[\d.]+/gi)[0].match(/[\d]+/)[0] : "0", // chrome浏览器版本
            Firefox: u.match(/Firefox\/[\d.]+/gi) ? u.match(/Firefox\/[\d.]+/gi)[0].match(/[\d]+/)[0] : "0", // firefox浏览器版本
            Safari: u.match(/Version\/[\d.]+.+Safari\/[\d.]+/gi) ? u.match(/Version\/[\d.]+.+Safari\/[\d.]+/gi)[0].match(/[\d]+/)[0] : "0", // safari浏览器版本
            Edge: u.match(/Edg\/[\d.]+/gi) ? u.match(/Edg\/[\d.]+/gi)[0].match(/[\d]+/)[0] : "0" // chrome浏览器版本
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
            full: lang.toLowerCase(),
            base: lang.substring(0, 2),
            subset: lang.substring(3, lang.length)
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
            + "    ├ DPR of builder  [ " + RepairTool.mermaidDPR.builder + " ]\n"
            + "    └ DPR of render   [ " + RepairTool.mermaidDPR.render + " ]\n";
        LOG(info);
        return info;
    },

    /**
     * 屏幕上显示环境信息、Mermaid 信息等
     **/
    show : function () {
        let info = env.print()
            + env.printMermaidDPR()
            + "\n----------\nPowered by MAX°孟兆\n";
        Copyer.action($(".v-copyright-svg-ico"), info, gFalse);
        A(info);
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
    V_params_url = V_util_getQueryParams(window.location.href);
    let vp = V_util_getMetaByName("vlook-query");
    V_params_yaml = V_util_getQueryParams("file.html" + (vp !== gUndefined ? "?" + vp : ""));
}
// ========================================


// ========================================
// 在 debug 模式下输出调试信息
function V_debug(...info) {
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
    return $(document).attr(s_Title);
}

/**
 * 获取 HTML <meta> 标签的内容
 * @param metaName 指定 meta 的名称
 * @returns 指定 meta 的内容
 */
function V_util_getMetaByName(metaName) {
    let content = $("meta[name='" + metaName + "']").attr(s_Content);
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
    let h = u.iO("#");
    u = h > -1 ? u.substring(0, h) : u; // 只截取 URL 中 # 前的内容

    let si = u.iO("?"),
        qs = u.substring(si > -1 ? si + 1 : u.length, u.length), // 获取url中"?"符后的字串
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
    return u.substring(u.iO("#"), u.length);
}

/**
 * 获取 URL 中的参数字符串
 * @param u 完整的 URL 内容
 */
function V_util_getQueryString(u) {
    let i = u.iO("?");
    return i > -1 ? u.substring(i + 1, u.length) : "";
}

/**
 * 获取 Alt / Option 修饰键情况
 * @returns true：按下，false：未按下
 */
function V_util_holdAltKey() {
    return (event.altKey || event.metaKey);
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
    let qi = u.iO("?"),
        ti = u.substring(0, qi).lastIndexOf("/"),
        pi = ti === -1 ? 0 : ti;
    return u.substring(0, pi + 1);
}

/**
 * 进行 HTML 特殊符号进行转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlEncode(text) {
    if (text.length === 0)
        return "";
    return text.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")
        .replace(/<br>/g, "");
}

/**
 * 进行 HTML 标签符转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlTagEncode(text) {
    if (text.length === 0)
        return "";
    return text.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * 进行 HTML 单、双引号转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlQuotEncode(text) {
    if (text.length === 0)
        return "";
    return text.replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;");
}

/**
 * 清理 HTML 中的单、双引号
 * @param text 原始文本
 * @return String 清理后的文本
 */
function V_util_clearHtmlQuot(text) {
    if (text.length === 0)
        return "";
    return text.replace(/'/g, "")
        .replace(/"/g, "");
}

/**
 * 处理并返回省略后的文本
 * @param text 原始文本
 * @param limit 头、尾长度限制
 * @return String 省略后的文本
 */
function V_util_ellipsisText(text, limit) {
    // 多个空格替换为 1 个
    text = text.replace(/\s+/g, " ");

    // 不需要进行省略处理
    if (text.length <= limit * 2)
        return V_util_htmlTagEncode(text);

    // 默认先按 1 个字占 1 个字节长度取头、尾部分
    let h = text.substring(0, limit).trim(),
        t = text.substring(text.length - limit, text.length).trim();
    // 判断头、尾部分是否含中文
    let cjkHeader = h.match(/\p{Unified_Ideograph}/ug),
        cjkTailer = t.match(/\p{Unified_Ideograph}/ug);
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
            if (cjk.iO(str[cnt]) > -1)
                limit -= 2;
            else
                limit--;
            cnt++;
        }
        return str.substring(0, cnt);
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
            if (cjk.iO(str[len - count]) > -1)
                limit -= 2;
            else
                limit--;
            count++;
        }
        return str.substring(len + 1 - count);
    }

    return V_util_htmlTagEncode(h + " . . . " + t);
}

/**
 * 重定位至锚点
 * @return boolean true：已进行重定向，false：无须进行重定向
 */
function V_util_redirectTo() {
    let h = window.location.hash;
    // 如果 URL 带锚点
    if (h.length > 0 && h !== "#vk-id-doc-title") {
        LOG("    ↩ Redirect to h: " + decodeURI(h));
        window.location.href = "#"; // 强制先清空当前 h
        window.location.href = h;
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
    let last = decodeURI(window.location.hash);
    window.location.href = hash;
    // 若前后锚点一样，则会导致不会触发 hashchange 事件，须强制进行一次微调
    if (last === decodeURI(hash))
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
    return str.replace(/(\d)(?=(\d{3})+(\.\d+)*(\D)*$)/g, "$1,");
}

/**
 * 对小数部分进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_decimal(str) {
    return str.replace(/\.(\d+)/, ".<span class='v-tbl-col-fmt-num-decimal'>$1</span>");
}

/**
 * 对百分号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_percent(str) {
    return str.replace(/%</, "<span class='v-tbl-col-fmt-percent'> %</span><");
}

/**
 * 对货币符号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_currency(str) {
    // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
    return str.replace(/(>.{1,3}\s)/, "><span class='v-tbl-col-fmt-currency'$1</span>");
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
    if (DOM_body().attr(s_Class).iO("typora-export") === -1) {
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
    if ($(".md-toc").length === 0) {
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

        A(c);
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
    sw.lapStart();
    iFontTheme = new FontTheme(new BgMask(s_FontTheme, "center"), V_util_getVarVal("--v-f-theme"));
    if (iFontTheme === gFalse)
        A(s_Failed + "iFntThm ]");
    else
        iFontTheme.init(); // 初始化
    sw.lapStop("    ├ Font Themer: ");

    // ==================== UI --------------------

    // 聚光灯
    sw.lapStart();
    iSpotlight = new Spotlight(180, new BottomTips(s_Spotlight));
    if (iSpotlight === gFalse)
        A(s_Failed + "iSpotlight ]");
    sw.lapStop("    ├ Spotlight: ");

    iLaserPointer = new LaserPointer(new BottomTips("laserPointe"));
    if (iLaserPointer === gFalse)
        A(s_Failed + "iPter ]");
    sw.lapStop("    ├ LaserPointer: ");

    // 长内容折叠
    sw.lapStart();
    iContentFolder = new ContentFolder();
    if (iContentFolder.length === 0)
        A(s_Failed + "iCtFolder ]");
    sw.lapStop("    ├ Content Folding: ");

    // 工具提示
    iToolTips = new ToolTips();
    if (iToolTips.length === 0)
        A(s_Failed + "iToolTips ]");

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BgMask("info-tips", "center"));
    if (iInfoTips.length === 0)
        A(s_Failed + "iInfoTips ]");

    // 导航中心
    sw.lapStart();
    let runMode = V_util_getParamVal("nc");
    iNavCenter = new NavCenter(new BgMask(s_NavCenter, s_Left, gTrue), runMode);
    if (iNavCenter === gFalse)
        A(s_Failed + "iNavCenter ]");
    sw.lapStop("    ├ Nav Center: ");

    // 逐章导航
    sw.lapStart();
    iChapNav = new ChapterNav(iNavCenter);
    if (iChapNav === gFalse)
        A(s_Failed + "iChapNav ]");
    else {
        // 添加关联组件
        iNavCenter.chapterNav = iChapNav;
    }
    sw.lapStop("    ├ Chapter Nav: ");

    // 工具栏
    sw.lapStart();
    iToolbar = new Toolbar(iNavCenter, iChapNav);
    if (iToolbar === gFalse)
        A(s_Failed + "iTb ]");
    else {
        // 导航中心按钮
        iToolbar.add(s_NavCenter, function () {
            iNavCenter.toggle();
        });

        // 字体风格
        iToolbar.add(s_FontTheme, function () {
            iFontTheme.toggle();
        });

        // 颜色方案（Light/Dark）
        iToolbar.add(s_ColorScheme, function () {
            ColorScheme.toggle();
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
            if (iSpotlight.toggle() === gTrue)
                iParagraphNav.hide();
        });

        // 激光笔
        iToolbar.add(s_LaserPointer, function () {
            iSpotlight.hide();
            if (iLaserPointer.toggle() === gTrue)
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
    sw.lapStop("    ├ Toolbar: ");

    // 插图浏览器
    sw.lapStart();
    iFigNav = new FigureNav();
    if (iFigNav === gFalse)
        A(s_Failed + "iFigNav ]");
    sw.lapStop("    ├ Figure Nav: ");

    // ----------------------------------------
    sw.lapStart();

    // 文档更多内容栏遮罩栏
    iMoreDocCt = new MoreDocContent();
    if (iMoreDocCt === gFalse)
        A(s_Failed + "iMoreDocCt ]");

    // 脚注
    iFootNote = new FootNote(new BgMask("foot-note", s_Bottom, gTrue));
    if (iFootNote === gFalse)
        A(s_Failed + "iFootNote ]");

    // 缩放显示
    iDocInfo = new DocInfo();
    if (iDocInfo.length === 0)
        A(s_Failed + "iDocInfo ]");

    // 缩放显示
    iZoomView = new ZoomView(new BgMask("zoom-view", s_Right, gTrue));
    if (iZoomView.length === 0)
        A(s_Failed + "iZoomView ]");

    // 链接检查
    iLinkTool = new LinkTool(new BgMask("link-checker", s_Right, gTrue));
    if (iLinkTool.length === 0)
        A(s_Failed + "iLinkTool ]");

    // 状态栏
    iStsBar = new StatusBar(V_util_getParamVal("stsbar"));
    if (iStsBar.length === 0)
        A(s_Failed + "iStsBar ]");
    else {
        iStsBar.add("doc-info", iDocInfo.ui);
        iStsBar.add("zoom-view", iZoomView.ui);
        iStsBar.add("link-checker", iLinkTool.ui);
    }

    // 内容助手
    iContentAssistor = new ContentAssistor();
    if (iContentAssistor.length === 0)
        A(s_Failed + "iCtAss ]");

    sw.lapStop("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
function V_initKernel() {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.lapStart("* Document Logo");
    let icoLg = $(".v-doc-logo-light").css(s_BackgroundImage),
        icoDk = $(".v-doc-logo-dark").css(s_BackgroundImage);
    $("head").append("<link rel='icon' id='doc-icon-light' href='" + icoLg.substring(5, icoLg.length - 2) + "' type='image/x-icon'/>"
        + "<link rel='icon' id='doc-icon-dark' href='" + icoDk.substring(5, icoDk.length - 2) + "' type='image/x-icon'/>");
    iStopwatch.lapStop(s_4space);

    // ----------------------------------------
    // 封面、封底处理
    if (VOM_cover() === gUndefined) {
        let vTp = (V_type === s_Mini ? " mini" : "");
        VOM_doc().prepend('<div id="vk-id-doc-title" class="v-doc-title' + vTp + '">' + V_util_getDocTitle() +'</div>');
    }

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.lapStart("* UI i18n");
    V_ui_initI18n();
    iStopwatch.lapStop(s_4space);

    // ========================================
    // 初始化引用块
    iStopwatch.lapStart("* Quote: ");
    ExtQuote.init();
    ExtQuote.adjustHoverStyle();
    iStopwatch.lapStop(s_4space);
    // ----------------------------------------
    // 注意：须在 ExtQuote 初始化之后执行
    // Code Magic 处理
    // 包括了：彩虹标签、彩虹徽章、彩虹引用、刮刮卡、文字注音等
    iStopwatch.lapStart("* Code°Magic: ");
    CodeMagic.init();
    iStopwatch.lapStop(s_4space);
    // ========================================

    // ----------------------------------------
    // 初始化题注生成器配置
    let capNum = V_util_getParamVal("capnum");
    if (capNum !== gUndefined && capNum.iO(s_Fig) > -1)
        ExtFigure.blockCapNum = gTrue;
    if (capNum !== gUndefined && capNum.iO(s_Table) > -1)
        ExtTable.blockCapNum = gTrue;
    if (capNum !== gUndefined && capNum.iO(s_Audio) > -1)
        ExtAudio.blockCapNum = gTrue;
    if (capNum !== gUndefined && capNum.iO(s_Video) > -1)
        ExtVideo.blockCapNum = gTrue;
    if (capNum !== gUndefined && capNum.iO(s_Codeblock) > -1)
        ExtCodeBlock.blockCapNum = gTrue;
    if (V_util_getParamVal("capauto") === "on")
        CaptionGenerator.autoCt = gTrue;

    // ----------------------------------------
    // 初始化音频数据
    iStopwatch.lapStart("* Audio: ");
    ExtAudio.init();
    iStopwatch.lapStop(s_4space);

    // ----------------------------------------
    // 初始化视频数据
    iStopwatch.lapStart("* Video: ");
    ExtVideo.init();
    iStopwatch.lapStop(s_4space);

    // ----------------------------------------
    // 初始化插图数据
    iStopwatch.lapStart("* Figure: ");

    ExtFigure.init();
    iStopwatch.lapStop(s_Cost);

    // ----------------------------------------
    // 初始化表格
    iStopwatch.lapStart("* Table: ");
    ExtTable.init();
    iStopwatch.lapStop(s_Cost);

    TableCross.init();
    // 设置表格阅读模式的开关状态（不指定则默认开启）
    if (V_util_getParamVal("tr") !== s_Off)
        TableCross.toggle();
    RowGroup.adjustHoverStyle();

    // ----------------------------------------
    // 初始化代码块
    iStopwatch.lapStart("* Code Block: ");
    ExtCodeBlock.init();
    iStopwatch.lapStop(s_4space);

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
    iStopwatch.lapStart("* Foot Note: ");
    FootNote.init();
    iStopwatch.lapStop(s_4space);

    // VLOOK UI 统一样式适配处理
    V_ui_adjustHoverStyle();

    // 主要针对小屏情况，完成表格初始化后进行适配
    // 如果不是小屏，则由 adjustAll 触发
    iContentFolder.adjust();

    // ----------------------------------------
    // 初始化 导航中心、章节导航 数据
    iStopwatch.lapStart("* Adjust NavCenter/ChapterNav/FigureNav/Toolbar/StatusBar");
    if (NavCenter.init()) {
        if (!env.device.mobile)
            iNavCenter.showHandle();

        iNavCenter.adjust();
        iChapNav.adjust();
        iToolbar.adjust();
        iStsBar.adjust();

        // 根据设备类型自适应 hover 样式
        iNavCenter.catalog.adjustHoverStyle();
        iChapNav.adjustHoverStyle();
        iFigNav.adjustHoverStyle();
    }
    iStopwatch.lapStop(s_4space);

    // ----------------------------------------
    iStopwatch.lapStart("* Binding Event");
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    document.addEventListener("mousemove", function () {
        iSpotlight.repaint(event || window.event);
        iNavCenter.snap(event || window.event);
    });

    // 绑定文档的单击事件
    $(document).unbind(s_Click).click(function () {
        TableCross.hide();
    });

    // 绑定文档的滚动事件
    $(document).scroll(function () {
        let currentTime = new Date().getTime(),
            scrollTop = $(document).scrollTop();

        // 显示或隐藏文档更多内容遮罩栏
        if (scrollTop < 10
            || scrollTop > (scrollTop - 10)
            || currentTime - V_doc_scroll_lastUpdate > 500)
                iMoreDocCt.refresh(scrollTop);

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
        TableCross.hide();
        iNavCenter.catalog.focusHeader();
        V_ui_adjustAll();
    });

    // 绑定打印前的触发事件
    window.onbeforeprint = function () {
        if (V_type === s_Mini)
            return;
        // 不是通过 VLOOK 打印按钮进行打印时进行提醒
        if (V_print_mode !== "VLOOK")
            A([
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
        let h = window.location.hash,
            anchor = h.substring(1, h.length);
        if (anchor.trim().length === 0)
            return;

        iNavCenter.history.add(h);

        // 锚点未显示的处理（如所在父元素被隐藏）
        let aObj = $("#" + decodeURI(anchor) + ", a[name='" + anchor + "']");
        if (aObj !== gUndefined && aObj.offset() !== gUndefined && aObj.offset().top === 0) {
            let hiddenObj = aObj.closest(s_Blockquote);
            // 若属于被折叠的引用，则模拟点击展开，并重新定位到该引用
            if (hiddenObj.length > 0 && hiddenObj.isHidden()) {
                let fd = hiddenObj.prev().find(".v-blockquote-folder");
                if (fd.length > 0) {
                    fd.trigger("mouseup");
                    window.location.href = h;
                }
            }
        }

        // 页内位置改变后，微调滚动条位置
        if (gLastHash == null || gLastHash !== h) {
            // 其中对于 Firefox 若不延时微调会存在微调无效的情况
            setTimeout(function () {
                V_ui_tuningScrollTop(decodeURI(anchor));
            }, env.browser.Firefox ? 300 : 0);
        }
        gLastHash = h;

        // 若导航中心没有显示，则强制进行延时适配处理（如从封面直接到指定章节）
        if (iNavCenter.showed === gFalse)
            V_ui_adjustAllDelay();
    });

    iStopwatch.lapStop(s_4space);
}

/**
 * 初始化须在页面 body 显示后才能执行的部分
 */
function V_initRestyle() {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 重置任务列表样式
    sw.lapStart();
    Restyler.forTaskList();
    sw.lapStop("    ├ TaskList: ");

    // ----------------------------------------
    // 重置脚本化图表样式，须在以上页面内容恢复显示后再处理
    sw.lapStart();
    Restyler.forMermaid();
    sw.lapStop("    └ Mermaid: ");
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

    t.css(s_Visibility, "visible")
        .css(s_Opacity, 1);
}

/**
 * 淡出隐藏
 * @param t 目标对象
 */
function V_ui_hide(t) {
    if (t === gUndefined)
        return;

    t.css(s_Visibility, s_Hidden)
        .css(s_Opacity, 0);
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
        + '<svg class="v-copyright-svg-ico" width="24px" height="24px" style="display: inline-block; vertical-align: middle; cursor: pointer;" onclick="env.show()" ontouchstart="env.show()"><use xlink:href="#icoVLOOK-dark"></use></svg>' + tag_2space
        // + 'Document author: ' + V_util_getMetaByName("author") + '.' + tag_2space
        + 'Published with <a href="https://github.com/MadMaxChow/VLOOK" target="_blank"><strong>VLOOK</strong></a>™ (V14.0) &amp; <a href="https://www.typora.io" target="_blank"><strong>Typora</strong></a>.'
        + tag_2space + 'Support: <strong><a href="https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi">QQ Group</a></strong> / <strong><a href="mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + V_ver + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(gTrue)) + '">Email</a></strong>.'
        + '</div>'
}

/**
 * 判断是否为小屏
 */
function V_ui_isSmallScreen() {
    return $(window).width() <= 1280;
}

/**
 * 微调页内跳转后的滚动条位置
 * @param anchor 锚点名称，不含 #，如含 # 会自动过滤
 */
function V_ui_tuningScrollTop(anchor) {
    if (anchor !== gUndefined && anchor.startsWith("#"))
        anchor = anchor.substring(1, anchor.length);
    if (anchor === gUndefined || anchor.trim().length === 0)
        return;

    let t = parseInt(iChapNav.ui.css(s_Top)),
        h = parseInt(iChapNav.ui.css(s_Height)),
        y = 10,
        aObj = $("#" + decodeURI(anchor) + ", a[name='" + anchor + "']"),
        tag = aObj.prop(s_TagName);

    if (tag !== gUndefined)
        tag = tag.toLowerCase();

    // h1-6
    if (tag !== gUndefined && "h1h2h3h4h5h6".iO(tag) > -1) {
        y += (tag === "h6")
            ? (t + h + 16)
            : (aObj.height() + 10 + (parseInt(tag.substring(1, 2)) - 1) * 6);
        y -= parseInt(V_util_getVarVal("--v-top-margin"));
    }
    // 从底部脚注列表回到脚注位置
    else if (anchor.startsWith("ref-footnote"))
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
    return '<svg width="' + w + 'px" height="' + h + 'px"' + s + '>'
        + '<use class="v-svg-ico-' + c + '" xlink:href="#' + i + '">'
        + '</use></svg>';
}

/**
 * 初始 UI 国际化
 */
function V_ui_initI18n() {
    iContentFolder.ui.find("div > span").attr(s_Title, [
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

    iToolbar.btns[s_NavCenter].attr(s_DataTips, [
        "<strong>隐藏</strong> / <strong>显示</strong> 导航中心",
        // "<strong>隱藏</strong> / <strong>顯示</strong> 導航中心",
        "<strong>Hide</strong> / <strong>Show</strong> Navigation Center",
        // "<strong>Cacher</strong> / <strong>Montrer</strong> Centre de navigation",
        // "<strong>Esconder</strong> / <strong>Show</strong> Navigationszentrum",
        // "<strong>Esconder</strong> / <strong>Show</strong> Centro de navegación",
        // "<strong>Скрывать</strong> / <strong>Показывать</strong> Центр навигации",
        // "<strong>隠れる</strong> / <strong>見せる</strong> ナビゲーションセンター",
        // "<strong>숨다</strong> / <strong>보여 주다</strong> 내비게이션 센터"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("O") + "</sup>");

    iToolbar.btns[s_ColorScheme].attr(s_DataTips, [
        "切换 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
        // "切換 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
        "Switch <strong>Dark</strong> / <strong>Light</strong> Mode",
        // "Basculer en mode <strong>Sombre</strong> / <strong>Clair</strong>",
        // "Schalten Sie den  / <strong>Hell</strong> -Modus um",
        // "Cambiar el modo <strong>Oscuro</strong> / <strong>Claro</strong>",
        // "Переключить <strong>Темный</strong> / <strong>Светлый</strong> режим",
        // "<strong>ダーク</strong> / <strong>ライト</strong> モードの切り替え",
        // "<strong>다크</strong> / <strong>라이트</strong> 모드 전환"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("D") + "</sup>");

    iToolbar.btns[s_FontTheme].attr(s_DataTips, [
        "切换 字体风格",
        // "切換 字體風格",
        "Switch Font Theme",
        // "Changer de style de police",
        // "Schriftart wechseln",
        // "Cambiar estilo de fuente",
        // "Переключить стиль шрифта",
        // "フォントスタイルの切り替え",
        // "글꼴 스타일 전환"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("A") + "</sup>");

    iToolbar.btns[s_ParagraphNav].attr(s_DataTips, [
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

    iToolbar.btns[s_Spotlight].attr(s_DataTips, [
        "聚光灯",
        // "聚光燈",
        s_Spotlight,
        // "Projecteur",
        // "Scheinwerfer",
        // "Destacar",
        // "Прожектор",
        // "スポットライト",
        // "스포트라이트"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("S") + "</sup>");

    iToolbar.btns[s_LaserPointer].attr(s_DataTips, [
        "激光笔",
        // "激光筆",
        "Laser Pointer",
        // "Pointeur Laser",
        // "Laserpointer",
        // "Puntero Láser",
        // "Лазерный Указатель",
        // "レーザーポインター",
        // "레이저 포인터"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("P") + "</sup>");

    iToolbar.btns[s_Print].attr(s_DataTips, [
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

    iChapNav.prev.ui.attr(s_DataTips, [
        "前一章",
        // "前一章",
        "Previous Chapter",
        // "Chapitre Précédent",
        // "Vorheriges Kapitel",
        // "Capítulo previo",
        // "Предыдущая глава",
        // "前の章",
        // "이전 장"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("◄") + "</sup>");

    iChapNav.next.ui.attr(s_DataTips, [
        "后一章",
        // "後一章",
        "Next Chapter",
        // "Chapitre Suivant",
        // "Nächstes Kapitel",
        // "Siguiente capítulo",
        // "Следующая глава",
        // "次の章",
        // "다음 장"
    ][V_lang_id] + "\n<sup>" + V_ui_wrap_kbd("►") + "</sup>");

    iChapNav.dt.attr(s_DataTips, [
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

    iChapNav.current.ui.attr(s_DataTips, [
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

    iFigNav.btns.prev.attr(s_Title, "[ ← ] " + [
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

    iFigNav.btns.next.attr(s_Title, "[ → ] " + [
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

    iFigNav.btns.close.attr(s_Title, "[ ESC ] " + [
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

    iFontTheme.ui.find(".v-font-package").text([
        "字体包",
        // "字體包",
        "Font Package",
        // "Package de polices",
        // "Schriftpaket",
        // "Paquete de fuentes",
        // "Пакет шрифтов",
        // "フォントパッケージ",
        // "글꼴 패키지"
    ][V_lang_id] + " •• ");

    iFontTheme.ui.find(".v-font-theme-info").html([
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

    iFootNote.buttonSeeAll.children("a").text([
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

    iContentAssistor.btns.openInFigureNav.attr(s_DataTips, [
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

    iContentAssistor.btns.tableCross.attr(s_DataTips, V_ui_wrap_kbd("X") + tag_2space + [
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

    iContentAssistor.btns.picInPic.attr(s_DataTips, [
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

    iZoomView.ui.text("⊖ " + [
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
    let l = ($(window).width() - s.width()) / 2,
        r = s_Auto;
    if (env.device.mobile) { // 移动端
        l = 10;
        r = 10;
    }

    s.css(s_Left, l)
        .css(s_Right, r)
        .css(s_Top, ($(window).height() - s.height()) / 2);
}

/**
 * 移动到中间
 * @param s 源对象
 * @param t 目标对象
 */
function V_ui_moveToTarget(s, t) {
    let l = t.offset().left,
        w = s.width() + parseInt(s.css(s_PaddingLeft))
            + parseInt(s.css(s_PaddingRight))
            + parseInt(s.css(s_BorderWidth)) * 2;

    if (l + w + 10 > $(window).width())
        l = $(window).width() - w - 10;

    s.css(s_Left, l)
        .css(s_Top, t.offset().top - $(document).scrollTop() + t.height() + 10);
}

/**
 * 进行文档导航相关的 UI 元素的适配处理
 */
function V_ui_adjustAll() {
    if (V_ui_processingAdjust === gTrue)
        return;

    V_ui_processingAdjust = gTrue;

    if (iNavCenter.adjust() === gTrue)
        iContentFolder.adjust();
    iChapNav.adjust();
    iToolbar.adjust();

    ExtQuote.uniteColumnsHeight();

    V_ui_processingAdjust = gFalse;
}

/**
 * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
 */
function V_ui_adjustAllDelay() {
    // LOG("Adjust all delay ...");
    setTimeout(function () {
        V_ui_adjustAll()
    }, 500);
}

/**
 * 根据设备类型自适应hover样式
 */
function V_ui_adjustHoverStyle() {
    // 移动设备时解绑样式事件
    if (env.device.mobile) {
        $(".v-btn, .v-btn-group").unbind(s_Hover);
        $(".v-segment-btn").unbind(s_Hover);
        $(".v-accent-btn").unbind(s_Hover);
        iZoomView.ui.unbind(s_Hover);
        $(".v-doc-lib-board.item").unbind(s_Hover);
        $(".v-std-code, .v-tag, .v-badge-name").unbind(s_Hover);
        $(".v-badge-value").unbind(s_Hover);
    }
    // 非移动设备时绑定样式事件
    else {
        // 所有常规按钮 hover 事件处理
        V_ui_bindHover($(".v-btn, .v-btn-group"));
        // 所有导航中心分段控制按钮 hover 事件处理
        V_ui_bindHover($(".v-segment-btn"));
        // 所有辅助按钮 hover 事件处理
        V_ui_bindHover($(".v-accent-btn"));
        // 状态栏上缩放文档按钮
        V_ui_bindHover(iZoomView.ui);
        // 文库按钮 hover 事件处理
        V_ui_bindHover($(".v-doc-lib-board.item"));
        // 代码、标签类 hover 事件处理
        V_ui_bindHover($(".v-std-code, .v-tag, .v-badge-name"));
        V_ui_bindHover($(".v-badge-value"), gTrue);
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
        _t.addClass(s_Hover);
        if (cancleParent === gTrue)
            _t.parent().removeClass(s_Hover);
    }, function () {
        let _t = $(this);
        _t.removeClass(s_Hover);
        if (cancleParent === gTrue)
            _t.parent().trigger("mouseenter");
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
        $(".v-backdrop-blurs").addClass(s_Enabled);
    // 以下动效等级为 1 或更高级时才开启
    // V_ui_addAnimate($(".v-btn, .v-btn-group, .v-doc-lib-board, .v-doc-lib-board.flip"));
    V_ui_addAnimate($(".v-doc-lib-board.flip"));
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
            t.addClass("v-transition-all");
        else {
            let attrSet = css.split(" ");
            for (let i = 0; i < attrSet.length; i++)
                t.addClass("v-transition-" + attrSet[i]);
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
        t.removeClass("v-transition-all");
    else {
        let attrSet = css.split(" ");
        for (let i = 0; i < attrSet.length; i++)
            t.removeClass("v-transition-" + attrSet[i]);
    }
}

/**
 * 检查目标对象是否有指定的任意过渡动画
 * @param t 目标对象
 * @returns boolean true：有，false：无
 */
function V_ui_existAnimate(t) {
    return t.attr(s_Class).iO("v-transition-") > -1;
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

        V_debug("Keydown: " + cK + " [" + c + "]");
        // 按了组合键时忽略（除 Shift）
        if (event.ctrlKey || event.altKey || event.metaKey)
            return;

        // 焦点不在文档内容上时的子模块热键操作处理
        // 第一梯队，避免同时触发（如 ESC 导致同时退出多个）
        iSpotlight.disposeHotkey(c, cK);
        iLaserPointer.disposeHotkey(c, cK);
        iParagraphNav.disposeHotkey(c, cK);
        // 第二梯队
        iWelcomePage.disposeHotkey(c, cK);
        iFigNav.disposeHotkey(c, cK);
        iNavCenter.disposeHotkey(c, cK);
        iFontTheme.disposeHotkey(c, cK);
        iInfoTips.disposeHotkey(c, cK);
        iFootNote.disposeHotkey(c, cK);
        iLinkTool.disposeHotkey(c, cK);

        // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
        if (V_doc_block === gTrue || document.activeElement.tagName.toLowerCase() !== "body")
            return;

        // 逐章导航热键操作处理
        iChapNav.disposeHotkey(c, cK);

        switch (c) {
            case 79: // O
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iFigNav.ui.isShowed())
                    return;
                iToolbar.btns[s_NavCenter].trigger(s_Click);
                break;
            case 76: // L
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iNavCenter.docLib.enabled === gTrue)
                    iNavCenter.docLib.handle.trigger(s_Click);
                break;
            case 68: // D
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iToolbar.btns[s_ColorScheme].trigger(s_Click);
                break;
            case 65: // A
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                if (iFontTheme.ui.isHidden())
                    iToolbar.btns[s_FontTheme].trigger(s_Click);
                else
                    iFontTheme.hide();
                break;
            case 88: // X
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                TableCross.toggle();
                break;
            case 80: // P
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iParagraphNav.hide();
                iSpotlight.hide();
                iLaserPointer.toggle();
                break;
            case 83: // S
                V_report_push([s_Hotkey, cK, String.fromCharCode(c), 0]);
                iParagraphNav.hide();
                iLaserPointer.hide();
                iSpotlight.toggle();
                break;
            case 27: // ESC
                V_report_push([s_Hotkey, cK, 'ESC', 0]);
                if (V_doc_block === gFalse) {
                    iToolTips.hide();
                    iLinkTool.hide();
                }

                // 表格为阅读模式时，则退出
                if (!TableCross_ui.isHidden())
                    TableCross.disable();

                // 拦截该按键事件，避免退出全屏（如：Safari）
                window.event.returnValue = gFalse;
                break;
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
            // if (env.language.subset.toLowerCase() === "cn" || env.language.subset.toLowerCase() === "chs")
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
    DOM_body().removeClass(s_Unfreeze).addClass(s_Freeze);
}

/**
 * 解冻文档滚动
 */
function V_doc_scroll_unfreeze() {
    DOM_body().removeClass(s_Freeze).addClass(s_Unfreeze);
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
    $("a:not([href^='#'])").each(function () {
        let a = $(this);
        a.attr(s_Target, a.attr(s_Href));
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
    $(".v-caption.mermaid").each(function () {
        let _t = $(this);
        _t.attr(s_BeforePrintWidth, _t.css(s_Width));
        _t.css(s_Width, "100%");
    });

    // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    $(".v-caption.mermaid svg").each(function () {
        let _t = $(this);
        if (_t.attr(s_Width) === "100%") {
            // 针对流程图
            if (_t.attr(s_Style).iO(s_MaxWidth + ":") > -1) {
                _t.attr(s_BeforePrintMaxWidth, _t.css(s_MaxWidth));
                _t.css(s_MaxWidth, "");
            }
            // 针对状态机图
            else if (_t.attr(s_Style).iO(s_Width + ":") > -1) {
                _t.attr(s_BeforePrintWidth, _t.css(s_Width));
                _t.css(s_Width, "100%");
            }
        } else { // 针对顺序图
            _t.attr(s_BeforePrintWidth, _t.attr(s_Width));
            _t.css(s_Width, "100%");
        }
    });

    // 展开折叠的引用块
    $("[" + s_DataBlockquoteFolded + "='true']").each(function () {
        ExtQuote.unfold($(this));
    });

    // 展开所有折叠的长内容
    $("[" + s_DataContentFolded + "='true']").each(function () {
        $(this).next(".v-content-expander").children(".v-btn").trigger(s_Click);
    });

    // 展开所有折叠的表格行
    $(".v-tbl-row-g-btn").each(function () {
        RowGroup.open($(this).parent().parent());
    });

    // 隐藏画中画
    PicInPic.hide();

    // 若存在「刮刮卡」内容，则先让用户确认是否显示
    let rainbowCoats = $(".v-rb-coat");
    if (rainbowCoats.length > 0) {
        if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？") === gTrue) {
            rainbowCoats.each(function () {
                let _t = $(this);
                if (_t.attr(s_DataRbCoatShowed).startsWith("f"))
                    RainbowCoat.show(_t);
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
        ColorScheme.toggle();
    }

    // 恢复打印前的配置，详见 V_print_ready()
    $(".v-caption.mermaid").each(function () {
        let _t = $(this);
        _t.css(s_Width, _t.attr(s_BeforePrintWidth));
        _t.removeAttr(s_BeforePrintWidth);
    });

    //恢复打印前的配置，详见 V_print_ready()
    $(".v-caption.mermaid svg").each(function () {
        let _t = $(this);
        if (_t.attr(s_Width) === "100%") {
            // 针对流程图
            if (_t.attr(s_Style).iO(s_MaxWidth + ":") > -1) {
                _t.css(s_MaxWidth, _t.attr(s_BeforePrintMaxWidth));
                _t.removeAttr(s_BeforePrintMaxWidth);
            }
            // 针对状态机图
            else if (_t.attr(s_Style).iO(s_Width + ":") > -1) {
                _t.css(s_Width, _t.attr(s_BeforePrintWidth));
                _t.removeAttr(s_BeforePrintWidth);
            }
        } else { // 针对顺序图
            _t.css(s_Width, _t.attr(s_BeforePrintWidth));
            _t.removeAttr(s_BeforePrintWidth);
        }
    });

    // 隐藏所有刮刮卡
    $(".v-rb-coat").each(function () {
        let _t = $(this);
        if (_t.attr(s_DataRbCoatShowed).startsWith("t"))
            RainbowCoat.hide(_t);
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
        + "&thm=" + V_util_getVarVal("--v-theme-name").rplAll("\"", "").trim();

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
    sd += "&cs=" + V_util_getVarVal("--v-color-scheme").rplAll("\"", "").trim();

    sd += "&lang=" + V_lang_id // 浏览器语言
        + "&size=" + VOM_doc().text().length // 文档大小
        + "&time=" + loadTimeCost; // 加载文档时间

    // 图片插图数据
    sd += "&img=" + $(".v-fig").length
        + "&img-fold=" + $("p[" + s_DataContainer + "='img'][" + s_DataContentFolded + "='true']").length
        + "&img-fill=" + $("img:not([" + s_DataImgFill + "])").length
        + "&img-invert=" + $("img[" + s_DataDarkSrc + "='invert']").length
        + "&img-alter=" + $("img[" + s_DataDarkSrc + "='alter']").length
        + "&img-cap1=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='img'] .v-caption-1 strong").length
        + "&img-cap2=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='img'] .v-caption-2").length;

    // Mermaid 插图数据
    let mermaid = $(".md-diagram-panel");
    sd += "&mm=" + mermaid.length
        + "&mm-fold=" + $("div[" + s_DataContainer + "='svg'][" + s_DataContentFolded + "='true']").length
        + "&mm-cap1=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='svg'] .v-caption-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-fig][" + s_DataIdFigType + "='svg'] .v-caption-2").length;

    // Mermaid 音频数据
    sd += "&audio=" + $(s_Audio).length
        + "&mm-cap1=" + $("div[id^=vk-id-audio] .v-caption-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-audio] .v-caption-2").length;

    // Mermaid 视频数据
    sd += "&video=" + $(s_Video).length
        + "&mm-cap1=" + $("div[id^=vk-id-video] .v-caption-1 strong").length
        + "&mm-cap2=" + $("div[id^=vk-id-video] .v-caption-2").length;

    // Mermaid 图的细类
    let pie = 0,
        flow = 0,
        flowSTART = 0,
        flowINIT = 0,
        state = 0,
        seq = 0,
        classD = 0,
        gantt = 0;
    mermaid.each(function () {
        let _t = $(this);
        if (_t.find("g.legend").length > 0)
            pie++; // 饼图
        else if (_t.find("g.output g.nodes").length > 0) {
            flow++; // 流程图
            if (_t.find("g.output g.nodes g#START.node").length > 0)
                flowSTART++; // VLOOK 标准的流程图
            else if (_t.find("g.output g.nodes g#INIT.node").length > 0)
                flowINIT++; // VLOOK 标准的状态机图
        }
        else if (_t.find("g.stateGroup").length > 0)
            state++; // 状态机图（原生）
        else if (_t.find("g rect.actor").length > 0)
            seq++; // 顺序图
        else if (_t.find("g.classGroup").length > 0)
            classD++; // 类图
        else if (_t.find("g rect.section").length > 0)
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
        + "&tbl-cap1=" + $("div[id^=vk-id-tbl] .v-caption-1 strong").length
        + "&tbl-cap2=" + $("div[id^=vk-id-tbl] .v-caption-2").length;

    // 表格列格式数据
    let fmBold = 0,
        fmEm = 0,
        fmUnderline = 0,
        fmMark = 0,
        fmDel = 0,
        fmChk = 0,
        fmNum = 0;
    $(s_Table + "[" + s_DataColumnFmting + "='true']").each(function () {
        let _t = $(this);
        if (_t.find("thead .v-tbl-col-fmt-bold").length > 0)
            fmBold++;
        if (_t.find("thead .v-tbl-col-fmt-em").length > 0)
            fmEm++;
        if (_t.find("thead u").length > 0)
            fmUnderline++;
        if (_t.find("thead .v-tbl-col-fmt-mark").length > 0)
            fmMark++;
        if (_t.find("thead del").length > 0)
            fmDel++;
        if (_t.find("thead .v-tbl-col-fmt-checkbox").length > 0)
            fmChk++;
        if (_t.find("thead .v-tbl-col-fmt-num").length > 0)
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
    sd += "&cb=" + $(".md-fences").length
        + "&cb-fold=" + $("p[" + s_DataContainer + "='pre'][" + s_DataContentFolded + "='true']").length
        + "&cb-cap1=" + $("div[id^=vk-id-codeblock] .v-caption-1 strong").length
        + "&cb-cap2=" + $("div[id^=vk-id-codeblock] .v-caption-2").length;

    // 标签数据
    sd += "&tag=" + $("code[class^=v-tag]").length
        + "&badge=" + $("code[class^=v-badge-name]").length;

    // 引用数据
    sd += "&bq=" + $(s_Blockquote).length
        + "&bq-fold=" + $("[" + s_DataBlockquoteFolded + "='true']").length;

    // 脚注数据
    sd += "&fn=" + $(".md-footnote").length;

    // 当前文档的 URL
    sd += "&url=" + window.location.href;

    // 提交统计数据
    let vlookStat = $("iframe[name='vlook-stat-gitee']");
    vlookStat.attr(s_Src,
        "https://madmaxchow.gitee.io/vlook/act/" + (V_debugMode ? "dev-" : "") + "stat-gitee.html"
        + encodeURI(sd));
    V_debug("Stat. in Gitee:\n" + vlookStat.attr(s_Src));
}

/**
 * 上报事件统计数据（基于百度统计）
 * 为兼容在本地打开的 HTML 文件，所以通过 iframe 的方式进行数据上报
 * @param d 数据数组，与百度统计的 _hmt.push(["_trackEvent", data[0], data[1], data[2], data[3]) 的参数保持一致
 */
function V_report_push(d) {
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
    if (t.startsWith("i"))
        return s_Fig + ".img";
    else if (t.startsWith("s"))
        return s_Fig + ".svg";
    else if (t.startsWith("t"))
        return s_Table;
    else if (t.startsWith("p"))
        return s_Codeblock;
    return "Unknown";
}

/**
 * 移除上报事件的资源
 */
function V_report_recycleResources() {
    $("iframe[name^=vk-event-]").each(function () {
        $(this).remove();
        return gFalse; // 执行一次即跳出，即每次只删除当前最早创建的
    });
}
// V.report
// ========================================

// ==================== 随机颜色类 ==================== //

// 颜色
function RandomColor() {
    let T = this;
    T.p = []; // 不相似颜色的色板

    /**
     * 生成随机颜色
     * @returns string R/G/B 颜色分量是数组
     */
    T.generate = function () {
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
    T.dissimilarRgb = function () {
        // 色板为空时，生成随机颜色后直接返回
        let c = [0, 0, 0];
        if (T.p.length === 0) {
            c = T.generate();
            T.p.push(c);
            return c;
        }

        // 色板不为空时，避免相似的颜色
        let f = gFalse,
            t = 0,
            d = [0, 0, 0];

        // 随机生成不相似的颜色（最多尝试次数上限为 20）
        while (f === gFalse && t < 20) {
            c = T.generate();
            // 判断新生成的随机颜色，色板中是否已有相似的
            let idx = 0;
            for (let i = 0; i < T.p.length; i++) {
                idx = i;
                d[0] = (T.p[i][0] - c[0]) / 256;
                d[1] = (T.p[i][1] - c[1]) / 256;
                d[2] = (T.p[i][2] - c[2]) / 256;
                // 比例两个颜色的 RGB 色差来作为相似性的依据（0.3 为经验值，值越大差异最大）
                if (Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) < 0.3)
                    break;
            }

            // 色板中没有找到相似的颜色
            if (idx === T.p.length) {
                T.p.push(c);
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
    T.format = function (rgb, opacity) {
        return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + opacity + ")";
    }

    /**
     * 重置调色板
     */
    T.reset = function () {
        VLOOL.color.p.length = 0;
    }
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
    T.lapStart = function (t) {
        if (t !== gUndefined)
            LOG(t);
        T.lT = new Date().getTime();
    }

    /**
     * 一次中间计时结束
     * @param pre 输出内容前缀
     * @param s 是否为静默模式，true：是
     */
    T.lapStop = function (pre, s) {
        let c = new Date().getTime() - T.lT;
        // 非静默模式时，输出计时结果
        if (s !== gTrue) {
            let msg = pre + "⏱ " + c + " ms";
            if (c < 300)
                INFO(msg);
            else if (c < 500)
                WARN(msg);
            else
                ERR(msg);
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

/**
 * 构造函数
 * @param mode 欢迎页显示模式
 */
function WelcomePage(mode) {
    let T = this,
        _ui = ".v-welcome-page";
    T.ui = $(_ui); // 欢迎页主界面
    T.button = $(_ui + " > .v-loading"); // 关闭欢迎页按钮
    T.tips = $(_ui + " > .v-tips"); // 欢迎信息
    T.finished = gFalse; // 是否已加载
    T.mode = mode; // 模式：

    /**
     * 完成所有内容加载后调用
     */
    T.done = function () {
        // 关闭欢迎页事件
        T.button.unbind(s_Click).click(function () {
            T.close();
        });

        T.ui.css(s_Cursor, "default");
        T.stopAni();

        T.tips.css(s_Animation, s_None);

        T.updateCloseButton(null);
        T.button.addClass("v-btn-done");

        T.finished = gTrue;

        // auto 模式时延时自动关闭
        if (T.mode === s_Auto)
            T.autoClose();
        // wait 模式
        else if (T.mode === "wait")
            T.button.addClass("wait");
    }

    /**
     * 自动延时关闭
     */
    T.autoClose = function () {
        let delaySecs = 3,
            closeTimer = null;

        __timeToClose();
        function __timeToClose() {
            T.updateCloseButton(delaySecs);
            delaySecs--;
            if (delaySecs < 0) { // 倒计时结束
                clearTimeout(closeTimer);
                T.close();
            }
            else
                closeTimer = setTimeout(__timeToClose, 1000);
        }
    }

    /**
     * 更新关闭按钮
     * @param sec 显示倒计时的秒数
     */
    T.updateCloseButton = function (sec) {
        T.button.html([
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
    T.stopAni = function () {
        T.tips.css(s_Animation, s_None);
    }

    /**
     * 关闭欢迎页
     */
    T.close = function () {
        T.ui.hide();
        V_doc_scroll_unfreeze();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.finished === gFalse || T.ui.isHidden())
            return;

        switch (code) {
            case 13: // ENTER
                // 关闭欢迎页
                T.close();
                break;
        }
    }

    // 初始执行
    if (T.mode === s_None)
        T.close();
    else
        V_ui_show(T.ui);
}

// ==================== 内容助手类 ==================== //

function ContentAssistor() {
    let T = this;
    T.ui = $(".v-content-assistor");
    T.btns = {
        openInFigureNav : $(".v-btn.assistor.open-in-figure-nav"), // 插图浏览器中打开
        tableCross : $(".v-btn.assistor.table-cross"), // 表格阅读模式（十字光标）
        copyContent : $(".v-btn.assistor.copy-code-block"), // 复制代码块
        picInPic : $(".v-btn.assistor.pic-in-pic") // 「画中画」
    }

    // 最后显示新标签打开按钮的内容（插图/表格等）
    T.lastHover = gUndefined;
    T.lastContentType = gUndefined;

    /**
     * 初始化内容助手
     */
    T.init = function () {
        // 在插图浏览器中打开
        T.btns.openInFigureNav.unbind(s_Click).click(function () {
            iContentAssistor.hide();
            iFigNav.show(T.lastHover);
        });
        //  开/关表格阅读模式（十字光标）
        T.btns.tableCross.unbind(s_Click).click(function () {
            TableCross.toggle(T.lastHover);
        });
        // 复制（代码块内容、图片地址）
        T.btns.copyContent.unbind(s_Click).click(function () {
            if (T.lastHover === gUndefined)
                return;

            let _t = $(this);
            if (T.lastContentType === s_Codeblock)
                ExtCodeBlock.copyContent(_t);
            else if (T.lastContentType === s_Fig + ".img")
                ExtFigure.copySrc(_t);
        });
        // 画中画
        T.btns.picInPic.unbind(s_Click).click(function () {
            PicInPic.show(T.lastHover);
        });

        __bindButtonEvent(T.btns.openInFigureNav);
        __bindButtonEvent(T.btns.tableCross);
        __bindButtonEvent(T.btns.copyContent);
        __bindButtonEvent(T.btns.picInPic);

        /**
         * 绑定事件
         * @param source 源对象
         */
        function __bindButtonEvent(source) {
            source.hover(function () {
                iToolTips.show($(this), s_Auto);
            }, function () {
                iToolTips.hide();
            });
        }
    }

    /**
     * 绑定对象的 hover 行为
     * @param target 目标对象
     * @param contentType 内容类型：Figure/Table/CodeBlock
     */
    T.bind = function (target, contentType) {
        target.hover(function () {
            V_ui_removeAnimate(T.ui);
            if (T.lastHover !== target)
                T.hide();

            T.lastHover = target;
            T.lastContentType = contentType;

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
                T.btns.copyContent.attr(s_DataTips, [
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
            else if (contentType === s_Fig + ".img") {
                T.btns.copyContent.attr(s_DataTips, [
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

            T.show();
        }, function () {
            if (__mouseDropIn(T.lastHover) === gFalse) {
                T.hide();
            }
        });
    }

    /**
     * 显示指定内容的内容助手
     */
    T.show = function () {
        // 移动端不显示
        if (env.device.mobile)
            return;

        // 圆角重置样式
        T.btns.openInFigureNav.removeClass("first enabled last");
        T.btns.tableCross.removeClass("first enabled last");
        T.btns.copyContent.removeClass("first enabled last");
        T.btns.picInPic.removeClass("first enabled last");

        // 插图
        if (T.lastContentType.startsWith(s_Fig)) {
            T.btns.openInFigureNav.addClass("enabled first");
            if (T.lastContentType.endWith("img"))
                T.btns.copyContent.addClass(s_Enabled);
            T.btns.picInPic.addClass("enabled last");
        }
        // 表格
        else if (T.lastContentType === s_Table) {
            T.btns.tableCross.addClass("enabled first");
            T.btns.picInPic.addClass("enabled last");
        }
        // 代码块
        else if (T.lastContentType === s_Codeblock) {
            T.btns.copyContent.addClass("enabled first");
            T.btns.picInPic.addClass("enabled last");
        }

        // ----------------------------------------
        // 计算助手显示的位置
        let caption = T.lastHover.parent(),
            className = caption.attr(s_Class),
            container = caption.parent(),
            offset = 0;
            // 对于存在横向滚动的情况时，须计算其偏移量用来位置调整
        if (className !== gUndefined && className.iO("v-caption") > -1
            && container !== gUndefined) {
                className = container.attr(s_Class);
                if (className !== gUndefined && className.iO("v-caption-container") > -1) {
                    let capWidth = parseInt(caption.width()),
                        conWidth = parseInt(container.width());
                    if (capWidth > conWidth)
                        offset = capWidth - conWidth + 1;
                }
        }
        T.ui.css(s_Left, T.lastHover.offset().left
                + T.lastHover.width() + 1
                - T.ui.width()
                + parseInt(T.lastHover.css(s_PaddingLeft))
                + parseInt(T.lastHover.css(s_PaddingRight))
                - offset)
            .css(s_Top, T.lastHover.offset().top + 3);

        // 须延时后再执行显示，让以上代码先完成
        setTimeout(function () {
            V_ui_addAnimate(T.ui);
            V_ui_show(T.ui);
        }, 50);
    }

    /**
     * 隐藏内容辅助动作按钮
     */
    T.hide = function () {
        V_ui_hide(T.ui);
    }

    /**
     * 判断鼠标当前位置是否落在指定对象的区域范围内
     * @param target 指定对象
     */
    function __mouseDropIn (target) {
        let e = (event || window.event),
            mx = e.pageX || e.clientX + document.body.scrollLeft,
            my = e.pageY || e.clientY + document.body.scrollTop,
            padding = parseInt(target.css(s_PaddingTop)) * 2;
        return !(mx < target.offset().left || mx > (target.offset().left + target.width() + padding)
            || my < target.offset().top || my > (target.offset().top + target.height() + padding));
    }
}

// ==================== 画中画类 ==================== //

function PicInPic() {}

PicInPic.ui = {
    body : gUndefined,
    content : gUndefined,
    close : gUndefined
}

PicInPic.ratio = 0.75;

PicInPic.size = {
    width : 0,
    height : 0
}

/**
 * 初始化画中画
 */
PicInPic.init = function () {
    PicInPic.ui.body = $(".v-pic-in-pic");
    PicInPic.ui.content = $(".v-pic-in-pic > .v-content");
    PicInPic.ui.zoom = $(".v-pip-btn.v-zoom");
    PicInPic.ui.close = $(".v-pip-btn.v-close");

    // 缩放事件处理
    PicInPic.ui.zoom.unbind(s_Click).click(function () {
        let _t = $(this),
            pipBtn = $(".v-pip-btn");
        if (PicInPic.ratio === 1) {
            PicInPic.ratio = 0.75;
            pipBtn.removeClass("zoom-in").addClass("zoom-out");
            _t.html(V_ui_generateSvgIcon("icoZoomIn", 16, 16, "theme"));
        }
        else {
            PicInPic.ratio = 1;
            pipBtn.removeClass("zoom-out").addClass("zoom-in");
            _t.html(V_ui_generateSvgIcon("icoZoomOut", 16, 16, "theme"));
        }
        PicInPic.zoom();
    });

    PicInPic.ui.close.unbind(s_Click).click(function () {
        PicInPic.hide();
    });

    PicInPic.ui.body.hover(function () {
        // 高度过小时调整操作按钮位置
        if (PicInPic.ui.body.height() < 30) {
            PicInPic.ui.zoom.addClass("min");
            PicInPic.ui.close.addClass("min");
        }
        else {
            PicInPic.ui.zoom.removeClass("min");
            PicInPic.ui.close.removeClass("min");
        }
        V_ui_show(PicInPic.ui.zoom);
        V_ui_show(PicInPic.ui.close);
    }, function () {
        V_ui_hide(PicInPic.ui.zoom);
        V_ui_hide(PicInPic.ui.close);
    });
}

/**
 * 显示画中画
 * @param source 显示内容的来源对象
 */
PicInPic.show = function (source) {
    PicInPic.calcSize();

    // 清空原有内容（除关闭按钮）
    PicInPic.ui.content.empty();

    // 为画中画进行克隆处理
    let pic = __cloneForPicInPic(source);

    // 缩放并显示
    PicInPic.zoom();
    PicInPic.ui.body.show();

    // 根据内容调整画中画的展示
    PicInPic.fitContentSize(pic);
    PicInPic.ui.content.scrollTop(0);

    /**
     * 为画中画进行克隆处理
     * @param source 源对象
     */
    function __cloneForPicInPic (source) {
        let openAll = gFalse,
            tagName = source.prop(s_TagName).toLowerCase();
        // 针对表格的处理
        if (tagName === s_Table) {
            // 1. 先展开所有行分组
            openAll = RowGroup.openAll(source, s_Auto);
            // 2. 先展开长内容
            let container = source.parent().parent();
            if (container.attr(s_DataContentFolded) === s_True)
                iContentFolder.expand(container.next());
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.css(s_Margin, 0)
            .css(s_Border, 0);
        PicInPic.ui.content.append(newClone);

        // 针对插图的处理
        let img = (tagName === "img"),
            svg = tagName === "svg";
        if (img || svg) {
            newClone.removeAttr(s_DataFigNum);
            if (svg)
                newClone.addClass("v-mermaid-restyler");
        }

        // 对展开了所有行分组的表格进行克隆后的干净处理
        if (openAll === gTrue) {
            RowGroup.reset(newClone); // 重置、切断
            RowGroup.closeAll(source, s_Auto); // 全部收起
        }

        return newClone;
    }
}

/**
 * 隐藏画中画
 */
PicInPic.hide = function () {
    PicInPic.ui.body.hide();
}

/**
 * 计算画中画建议的基准尺寸
 */
PicInPic.calcSize = function () {
    // 计算基准大小
    let baseW = 550,
        baseH = 350,
        w = $(window).width() / 2.5,
        h = $(window).height() / 3;
    PicInPic.size.width = w < baseW ? baseW : w;
    PicInPic.size.height = h < baseH ? baseH : h;
    PicInPic.ui.body.css(s_Width, PicInPic.size.width)
        .css(s_Height, PicInPic.size.height);
}

/**
 * 调整画中画的基准大小，以适应内容的实际大小
 */
PicInPic.fitContentSize = function (source) {
    // 宽度
    let tagName = source.prop(s_TagName).toLowerCase(),
        w = source.width(),
        h = source.height(),
        sourcePadding = parseInt(source.css(s_PaddingTop)) * 2,
        uiPadding = parseInt(PicInPic.ui.body.css(s_PaddingTop)) * 2;

    // 针对图片尺寸的兼容性处理（部分浏览器不使用该处理尺寸不正常，如：Firefox）
    if (tagName === "img") {
        let img = new Image();
        img.src = source.attr(s_Src);
        if (img.complete)
            __getImgSize(img);
        else
            img.onload = function () {
                __getImgSize(img);
            }
    }

    // 宽度
    let wWithPadding = w + sourcePadding;
    if (w > 0 && wWithPadding < PicInPic.size.width) {
        PicInPic.size.width = w;
        PicInPic.ui.body.css(s_Width, wWithPadding)
            .css(s_TransformOrigin, PicInPic.size.width + "px " + PicInPic.size.height + "px");
    }

    // 高度
    h = source.height(); // 重新获得画中画最新高度
    let hWithPadding = h + uiPadding + sourcePadding;
    if (h > 0 && hWithPadding < PicInPic.size.height) {
        // 针对会进行等比缩放的对象进行高度微调
        if ((tagName === "img" || tagName === "svg")
            && h > source.height()) {
                h = source.height();
                hWithPadding = h + uiPadding + sourcePadding;
        }
        PicInPic.size.height = h;
        PicInPic.ui.body.css(s_Height, hWithPadding)
            .css(s_TransformOrigin, PicInPic.size.width + "px " + PicInPic.size.height + "px");
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
PicInPic.zoom = function () {
    V_ui_removeAnimate(PicInPic.ui.zoom);
    V_ui_removeAnimate(PicInPic.ui.close);

    PicInPic.ui.body.css(s_Transform, "scale(" + PicInPic.ratio + ")")
        .css(s_TransformOrigin, PicInPic.size.width + "px " + PicInPic.size.height + "px");

    setTimeout(function () {
        V_ui_addAnimate(PicInPic.ui.zoom);
        V_ui_addAnimate(PicInPic.ui.close);
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
        T.toolbar.btns[s_LaserPointer].removeClass(s_Selected);
        T.toolbar.btns[s_Spotlight].addClass(s_Selected);

        T.pointer = gFalse;
        T.mode = "S";
        T.ui.show();
        $(T.pointerScope).removeClass("v-cursor-laser");
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
            T.ui.css(s_Background, "radial-gradient(circle at "
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
    T.toggle = function () {
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
        iMoreDocCt.refresh();
        T.tips.hide();
        T.toolbar.btns[s_Spotlight].removeClass(s_Selected);
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
    T.pointerScope = "body, rt, #write, .v-textfield > input, .v-blockquote-folder, audio, video, .v-audio-mini-control, .v-tbl-row-g-btn, .v-textfield-action, .v-segment-btn, .v-nav-center, .md-toc-item, .v-toc-item, .v-btn, .v-accent-btn, .v-toolbar, .v-fig, .v-fig-nav, .v-fig-content, .v-fig-nav-btns, .v-btn-close-figure-nav, .v-rb-coat, a, img, .v-chapter-nav-prev, .v-chapter-nav-current, .v-chapter-nav-next, .v-link-chk-result.error, .v-toc-tab-button";

    /**
     * 使用激光笔
     */
    T.useLaserPointer = function () {
        T.toolbar.btns[s_Spotlight].removeClass(s_Selected);
        T.toolbar.btns[s_LaserPointer].addClass(s_Selected);

        T.enable = gTrue;
        $(T.pointerScope).addClass("v-cursor-laser");

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
    T.toggle = function () {
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
        iMoreDocCt.refresh();
        T.tips.hide();
        T.enable = gFalse;
        T.toolbar.btns[s_LaserPointer].removeClass(s_Selected);
        $(T.pointerScope).removeClass("v-cursor-laser");
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
    T.segments = [];
    T.segmentCount = 0;

    T.ui.append('<span class="v-segment-indicator"></span>');
    T.indicator = T.ui.children(".v-segment-indicator"); // 当前选中分段的滑块

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
        T.segmentCount++;
        T.segments[name] = target;

        // 新增段的 UI
        let id = T.group + "-" + name,
            ui = '<input id="' + id + '" onfocus="T.blur()" type="radio" name="' + T.group
                + '"' + (status === gTrue ? '' : ' ' + s_DataResult + '="' + s_None + '"')
                + ' value="' + name + '"' + (checked === gTrue ? ' checked' : '' ) + ' />'
                + '<label for="' + id + '" class="v-segment-btn ' + name + '" ' + s_DataIcon + '="' + icon + '">'
                + V_ui_generateSvgIcon(icon, 16, 16, s_Dark)
                + '</label>';
        T.ui.append(ui);
        target.ui.entry = T.ui.children(".v-segment-btn." + name);
        // V_ui_addAnimate(target.ui.entry);

        // 指定为默认选项
        if (checked === gTrue) {
            T.last = target;
            __updateIcon(gTrue);
        }

        // 为新添加的段绑定事件
        T.ui.find("input#" + id).change(function () {
            // 隐藏切换前选择的组件
            T.last.hide();
            __updateIcon(gFalse);
            // 显示最新选择的组件
            T.last = T.segments[$(this).val()];
            __updateIcon(gTrue);

            T.last.show();
            T.update();
        });

        return T.segments[name];

        /**
         * 更新分段的图标
         *
         * @param checked 是否为选择状态
         */
        function __updateIcon(checked) {
            T.last.ui.entry.html(V_ui_generateSvgIcon(T.last.ui.entry.attr(s_DataIcon)
                + (checked ? "-checked" : "") , 16, 16, s_Dark));
        }
    }

    /**
     * 获得当前选中的分段
     * @returns 当前选中的分段
     */
    T.checkedItem = function () {
        return T.ui.find('input[name="' + T.group + '"]:checked').val();
    }

    /**
     * 获得、设置指定分段的状态
     * @returns 无 value 时，返回指定分段的状态
     */
    T.status = function (target, value) {
        let id = T.group + "-" + target.typeName();
        if (value === gUndefined) {
            T.ui.find('label[for="' + id + '"]').addClass("v-result-none");//.css(gStrOpacity, "0.2");
            return T.ui.find('input[id="' + id + '"]').attr(s_DataResult);
        }

        if (value === gTrue) {
            T.ui.find('label[for="' + id + '"]').removeClass("v-result-none");//.css(gStrOpacity, "1");
            T.ui.find('input[id="' + id+ '"]').removeAttr(s_DataResult);
        }
        else {
            T.ui.find('label[for="' + id + '"]').addClass("v-result-none");//.css(gStrOpacity, "0.2");
            T.ui.find('input[id="' + id+ '"]').attr(s_DataResult, s_None);
        }
    }

    /**
     * 更新分段控制器界面
     */
    T.update = function () {
        // 更新各分段 UI 大小、间隔等
        let space = 2,
            spacePercent = (space * (T.segmentCount - 1)) / T.ui.width() * 100,
            width = (100 - spacePercent) / T.segmentCount;
        T.ui.children(".v-segment-btn").css(s_Margin, "0 0 0 " + space + "px")
            .css(s_Width, width + "%");
        // 修正第一个
        T.ui.children(".v-segment-btn:first").css(s_Margin, 0);

        // 更新当前选择分段相关 UI
        if (T.last === gUndefined)
            return;
        let target = T.last.ui.entry;
        T.indicator.css(s_Left, target.position().left + parseInt(target.css(s_MarginLeft)))
            .css(s_Width, target.width());
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

    T.width = T.ui.width(); // 导航中心宽度

    T.chapterNav = gUndefined; // 联动的章节导航栏
    T.toolbar = gUndefined; // 联动的工具栏

    T.snapTimer = null; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    T.segments = new SegmentControl($(".v-segment.toc"), "toc-segment");
    TocIndex.segments = T.segments;

    // 目录索引组件
    T.catalog = T.segments.add(new TocCatalog(this, gFalse), "icoTocTabCatalog", gTrue, gFalse);
    // 插图索引组件
    T.figure = T.segments.add(new TocFigure(this, gTrue), "icoTocTabFigure", gFalse, gFalse);
    // 表格索引组件
    T.table = T.segments.add(new TocTable(this, gTrue), "icoTocTabTable", gFalse, gFalse);
    // 多媒体索引组件
    T.media = T.segments.add(new TocMedia(this, gTrue), "icoTocTabMedia", gFalse, gFalse);
    // 代码块索引组件
    T.codeblock = T.segments.add(new TocCodeblock(this, gTrue), "icoTocTabCodeblock", gFalse, gFalse);
    // 访问历史组件
    T.history = T.segments.add(new TocHistory(this, gTrue), "icoTocTabHistory", gFalse, gFalse);

    // 文库
    T.docLib = new DocLib(new BgMask("doc-lib", "center"), this);

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    T.segments.update();

    V_ui_addAnimate(T.handle);
    // V_ui_addAnimate(T.keyword.ui);

    /**
     * 当前章节变化事件
     */
    T.catalog.onChapterChanged = function () {
        // 更新逐章导航内容
        if (T.chapterNav !== gUndefined)
            T.chapterNav.update();
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
        T.catalog.resultNav.restart();
        T.figure.resultNav.restart();
        T.table.resultNav.restart();
        T.media.resultNav.restart();
        T.codeblock.resultNav.restart();

        if (value.trim().length === 0) {
            // 目录
            T.catalog.ui.result.empty();
            if (T.segments.checkedItem() === T.catalog.typeName())
               T.catalog.ui.body.show();
            T.catalog.hideFilterResult();
            T.catalog.scrollToCurrent();
            T.catalog.updateStatus();
            // 插图、表格、多媒体、代码块
            TocIndex.noneKeyword(T.figure);
            TocIndex.noneKeyword(T.table);
            TocIndex.noneKeyword(T.media);
            TocIndex.noneKeyword(T.codeblock);
        }
        else {
            // 目录
            T.catalog.filter(value.toLowerCase());
            // 插图、表格、多媒体、代码块
            TocIndex.filter(T.figure, value.toLowerCase());
            TocIndex.filter(T.table, value.toLowerCase());
            TocIndex.filter(T.media, value.toLowerCase());
            TocIndex.filter(T.codeblock, value.toLowerCase());
        }
    }

    T.keyword.onFocus = function (source) {
        if (T.lastDisplayType !== s_Float) {
            VOM_doc().addClass(s_Actived);
            let search = $(".v-focus-search");
            search.addClass(s_Actived);
            // V_ui_addAnimate(search);
        }
    }

    T.keyword.onBlur = function (source) {
        VOM_doc().removeClass(s_Actived);
        $(".v-focus-search").removeClass(s_Actived);
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
            A(s_Failed + "iDocLib ]");
        else if (V_util_getParamVal("dl") !== s_Off)
            T.docLib.init();
    }

    /**
     * 跳转回文档封面
     */
    T.gotoCover = function () {
        V_report_push(['nav-center', 'Goto', 'Cover', 0]);
        window.location.href = "#";
        // 【有封面】模式时处理
        if (VOM_cover() !== gUndefined) {
            if (T.catalog.currentItem !== gUndefined) {
                T.catalog.currentItem.removeClass("v-toc-item-current");
                T.catalog.currentHeaderIndex = -1;
            }
            T.adjust();
            T.chapterNav.adjust();
            T.toolbar.adjust();
        }
        // 【无封面】模式时处理
        else {
            iToolTips.hide();
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
    T.toggle = function (callback) {
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

        ExtQuote.uniteColumnsHeight();

        typeof(callback) === "function" && callback();
        T.afterToggle();
    }

    /**
     * 显示导航中心
     * @param lastDisplayType float: 以浮动形式显示，block: 以占位形式显示
     * @returns boolean true: 需要处理显示，false: 已显示，无须重复处理
     */
    T.show = function (lastDisplayType) {
        // 已显示，或在以动画显示过程中
        if (V_type !== "max" || T.showed === gTrue || T.ui.offset().left > -T.width) {
            // T.handle.hide();
            return gFalse;
        }

        T.ui.css(s_Left, 20);
        T.handle.hide();

        T.lastDisplayType = lastDisplayType;
        // 以「占位方式」显示导航中心
        if (T.lastDisplayType === s_Block) {
            // 占位方式的样式设置
            T.ui.removeClass("v-nav-center-float");
            T.ui.removeClass("v-float-card");
            T.ui.addClass("v-nav-center-block");

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                T.toolbar.btns[s_NavCenter].addClass(s_Selected);

            VOM_doc().css(s_MarginLeft, "calc(var(--v-nav-center-width) + 30px)");

            // 因为从切换为占位显示后，会影响文档内容布局，所以须重定位至当前锚点
            if (T.showed !== gTrue) {
                setTimeout(function () {
                    V_util_redirectTo();
                }, 300);
            }
        }
        // 以「浮动方式」显示导航中心
        else if (T.lastDisplayType === s_Float) {
            // 浮动方式的样式设置
            T.ui.removeClass("v-nav-center-block");
            T.ui.addClass("v-nav-center-float");
            T.ui.addClass("v-float-card");

            // 显示联动的遮罩
            T.mask.show();

            // 若文档可视空间比导航中心宽度要小，则进行微调
            if ($(window).width() < T.width + 20)
                T.ui.css(s_Width, $(window).width() - 20);
            // 若文档空间比导航中心宽度大，则直接显示原始大小
            else
                T.ui.css(s_Width, T.width);
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
        if (T.showed === gFalse || T.ui.offset().left < 10)
            return gFalse;

        // 若最后一次显示以是「占位方式」显示
        if (T.lastDisplayType === s_Block) {
            // 更新运行模式
            T.runMode = runMode;

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                T.toolbar.btns[s_NavCenter].removeClass(s_Selected);
        }

        T.ui.css(s_Left, V_util_getVarVal("--v-nav-center-hidden-left"));

        // 恢复不挤压文档正文区
        VOM_doc().css(s_MarginLeft, 0);

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
            VOM_doc().css(s_MarginLeft, "calc(var(--v-nav-center-width) + 30px)");

        T.width = T.ui.width();

        T.keyword.setWidth(T.width - 2 - parseInt(T.__keywordBody.css(s_MarginLeft)) * 2);

        // 根据最新窗口大小调整宽度
        T.segments.update();

        // 在封面，或为小屏
        if (T.catalog.inHeader() === gFalse || V_ui_isSmallScreen() === gTrue) {
            // 自动隐藏导航中心
            result = T.hide(s_Auto);

            // 根据最新窗口大小调整收起位置
            T.ui.css(s_Left, s_varNavCenterHiddenLeft);

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                T.toolbar.btns[s_NavCenter].removeClass(s_Selected);
        }
        // 不在封面
        else {
            // 导航中心运行模式为 auto 时，自动显示导航中心
            if (T.runMode === s_Auto) {
                // 以占位方式显示导航中心
                result = T.show(s_Block);

                // 根据最新窗口大小调整导航中心宽度
                T.ui.css(s_Width, s_varNavCenterWidth);

                // 更新工具栏导航中心按钮图标
                if (!env.device.mobile)
                    T.toolbar.btns[s_NavCenter].addClass(s_Selected);
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

        T.handle.css(s_Top, ($(window).height() - T.handle.height()) / 2);
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
        if (event.clientY > 200 && event.clientY < ($(window).height() - 300) && event.clientX <= 20) {
            if (T.snapTimer != null)
                return;

            T.handle.addClass(s_Hover);

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            T.snapTimer = setTimeout(function () {
                T.handle.removeClass(s_Hover);
                T.show(s_Float);
            }, 1000);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (T.snapTimer != null) {
                clearTimeout(T.snapTimer);
                T.snapTimer = null;
                T.handle.removeClass(s_Hover);
            }
        }
    }

    /**
     * 显示/隐藏导航中心，并进行关联处理
     */
     T.afterToggle = function () {
        if (iNavCenter.lastDisplayType === s_Block)
            iContentFolder.adjust();
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
    let toc = $(".md-toc");
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
    vlookToc.find(".md-toc-content").attr(s_Id, "vlook-toc")
    iNavCenter.catalog.ui.body.append(vlookToc);

    // 没有目录内容
    let tocContent = $("#vlook-toc");
    if (tocContent.isEmpty()) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 有 Typora 生成的原始目录
    let tocSet = tocContent.children(".md-toc-h1, .md-toc-h2, .md-toc-h3, .md-toc-h4, .md-toc-h5, .md-toc-h6"),
        tocSetLength = tocSet.length,
        hasCover = (VOM_cover() !== gUndefined);
    tocSet.each(function (i) {
        let _t = $(this);
        // 只处理 h1～h5 的目录节点
        if (_t.attr(s_Class).iO("md-toc-h6") === -1) {
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
    tocAutoCloseLevel = (tocAutoCloseLevel !== gUndefined) ? parseInt(tocAutoCloseLevel) : 2;
    if (tocAutoCloseLevel >= 1 && tocAutoCloseLevel <=5) {
        tocContent.children(".md-toc-h" + tocAutoCloseLevel + "[" + s_DataNode + "='1'][" + s_DataFolded + "='false']").each(function () {
            iNavCenter.catalog.disposeFold($(this).attr(s_Id), "c", gTrue);
        });
    }

    return gTrue;
}

/**
 * 隐藏导航中心（异常情况使用）
 */
NavCenter.hideOnError = function () {
    iNavCenter.hide();

    ERR([
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
    T.dt.text(V_util_getDocTitle());

    if (V_type !== "max")
        T.ui.hide();

    /**
     * 初始化动效
     */
    T.adjustEffectLevel = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (V_ui_effect >= 1) {
            $(target).addClass(s_Effect);
            V_ui_addAnimate($(target + ".effect"));
        }
        else {
            $(target).removeClass(s_Effect).addClass("noeffect");
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
    T.prev.ui.unbind(s_Click).click(function () {
        iToolTips.hide();
        if (T.prev.text.attr(s_DataAnchor) === "cover")
            iNavCenter.gotoCover();
        else
            iNavCenter.catalog.gotoHeader(T.prev.text);
    });

    /**
     * 回到封面
     */
    T.dt.unbind(s_Click).click(function () {
        iToolTips.hide();
        if ($(this).attr(s_Disabled) === gUndefined)
            iNavCenter.gotoCover();
    });

    /**
     * 跳转至当前章节
     */
    T.current.ui.unbind(s_Click).click(function () {
        iToolTips.hide();
        iNavCenter.catalog.gotoHeader(T.current.ui);
    });

    /**
     * 跳转至后一章节
     */
    T.next.ui.unbind(s_Click).click(function () {
        iToolTips.hide();
        iNavCenter.catalog.gotoHeader(T.next.text);
    });

    /**
     * 更新逐章导航栏 UI 及数据
     */
    T.update = function () {
        let currentIndex = iNavCenter.catalog.currentHeaderIndex;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (currentIndex > 0) {
            T.prev.ui.show();
            T.prev.ui.css(s_Display, s_Block);
            T.prev.text.text($("#" + iNavCenter.catalog.headers[currentIndex - 1]).text());
            T.prev.text.attr(s_DataAnchor, iNavCenter.catalog.headers[currentIndex - 1]);

            // 【无封面】模式时处理
            if (VOM_cover() === gUndefined) {
                T.dt.removeClass("in-start");
                T.dt.removeAttr(s_Disabled);
                T.adjustEffectLevel(__dt);
                __bindEvent(T.dt, "center");
            }
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (iNavCenter.catalog.inFirstHeader()) {
            T.prev.text.text([
                "封面",
                // "封面",
                "Cover",
                // "Couverture", "Startseite", "Cubrir", "передняя крышка", "カバー", "표지"
            ][V_lang_id]);
            T.prev.text.attr(s_DataAnchor, "cover");
        }
        // 「无封面」模式时对「文档标题」章节的特殊处理
        else if (iNavCenter.catalog.inDocTitle()) {
            T.prev.ui.hide();
            T.current.ui.hide();
            // 调整为在文档开始位置时的样式
            T.dt.removeClass("noeffect effect hover");
            T.dt.addClass("in-start");
            T.dt.attr(s_Disabled, s_True);
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

            T.current.ui.text(iNavCenter.catalog.currentItem.attr(s_Title));
            T.current.ui.attr(s_DataAnchor, iNavCenter.catalog.headers[currentIndex]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (currentIndex < iNavCenter.catalog.headers.length - 1) {
            T.next.ui.show();
            T.next.text.text($("#" + iNavCenter.catalog.headers[currentIndex + 1]).text());
            T.next.text.attr(s_DataAnchor, iNavCenter.catalog.headers[currentIndex + 1]);
        }
        else
            T.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    T.show = function () {
        // 若已显示则直接退出
        if (V_type !== "max" || parseInt(T.ui.css(s_Top)) >= 0)
            return;

        T.ui.addClass("v-float-card");
        T.ui.css(s_Top, 0);
        T.ui.show();
    }

    /**
     * 隐藏逐章导航栏
     */
    T.hide = function () {
        // 若已隐藏则直接退出
        if (parseInt(T.ui.css(s_Top)) < 0)
            return;

        T.ui.removeClass("v-float-card");
        T.ui.css(s_Top, -50);
        T.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    T.adjust = function () {
        // 在封面时，隐藏逐章导航栏
        if (iNavCenter.catalog.inHeader() === gFalse) {
            T.hide();
            iMoreDocCt.ui.before.addClass("cover");

            // 初始化前 / 后章节数据
            T.prev.text.attr(s_DataAnchor, "cover");
            T.next.text.attr(s_DataAnchor, iNavCenter.catalog.headers[0]);
        }
        // 不在封面时，显示逐章导航栏
        else {
            iMoreDocCt.ui.before.removeClass("cover");
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
            T.prev.ui.unbind(s_Hover);
            T.current.ui.unbind(s_Hover);
            T.next.ui.unbind(s_Hover);
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
            iToolTips.show(source, align);
        }, function () {
            iToolTips.hide();
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
                T.prev.ui.trigger(s_Click);
                // 自适应页面内容显示
                iNavCenter.catalog.focusHeader();
                break;
            case 190: // >
            case 39: // →
                T.next.ui.trigger(s_Click);
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
    T.currentIndex = -1; // 当前段索引号
    T.enabled = gFalse; // 是否段落导航激活

    T.toolbar = gUndefined; // 联动的工具栏

    /**
     * 返回当前段落
     */
    T.current = function () {
        if (T.currentIndex === -1)
            return gUndefined;
        return $("[" + s_DataId + "='vk-pg-" + T.currentIndex + "']");
    }

    /**
     * 切换段落导航开关
     * @returns boolean true：开启，false：关闭
     */
    T.toggle = function (target) {
        T.enabled = !T.enabled;
        if (T.enabled === gTrue) {
            V_report_push(['ParagraphNav', 'Action', s_Enabled, 0]);

            T.toolbar.btns[s_ParagraphNav].addClass(s_Selected);
            iMoreDocCt.hideAfter();

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
        item.attr(s_DataId, "vk-pg-" + T.count);
        item.attr(s_DataPgIdx, T.count);
        T.count++;

        // 单击内容块处理
        item.unbind(s_Click).click(function () {
            // 未激活段落导航模式模式
            if (iParagraphNav.enabled === gFalse) {
                if (ThreeClicker.tick() === gTrue
                    && iParagraphNav.toggle(item) === gTrue) {
                        iSpotlight.hide();
                        iLaserPointer.hide();
                        // 取消文本选择
                        window.getSelection().removeAllRanges();
                    }
            }
            else {
                // event.stopPropagation(); // 停止事件冒泡
                T.goto(item);
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
        if (T.currentIndex > 0) {
            T.currentIndex = T.currentIndex - step;

            if (T.currentIndex < 0)
                T.currentIndex = 0;

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
        if (T.currentIndex < T.count - 1) {
            T.currentIndex = T.currentIndex + step;

            // 跳转 step 后修正超出最大值的情况
            if (T.currentIndex > T.count - 1)
                T.currentIndex = T.count - 1;

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
            : T.current();

        // 若目标聚焦块为空（可能是对象已在其他处理过程中被删除）、不可视等情况
        // 则返回跳转失败
        if (item === gUndefined || item.isHidden() || item.offset() === gUndefined)
            return gFalse;

        // 添加高亮样式
        item.addClass("v-pg-current-item");
        T.currentIndex = parseInt(item.attr(s_DataPgIdx));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.height() * 3;
        if (item.offset().top !== 0
            && ((item.offset().top - height) < $(document).scrollTop()
            || (item.offset().top + height) > ($(document).scrollTop() + $(window).height()))) {
                DOM_html().scrollTop(item.offset().top - $(window).height() / 2);
        }

        return gTrue; // 返回跳转成功
    }

    /**
     * 让当前聚焦段其失去聚焦效果
     */
    T.blurFocus = function () {
        if (T.current() !== gUndefined)
            T.current().removeClass("v-pg-current-item");
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    T.hide = function () {
        iMoreDocCt.refresh();
        T.tips.hide();
        T.toolbar.btns[s_ParagraphNav].removeClass(s_Selected);
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
                TableCross.hide();
                if (T.next(1)) // 步长1
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 75: // K
                TableCross.hide();
                if (T.prev(1)) // 步长1
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 72: // H
                TableCross.hide();
                if (T.prev(10)) // 步长10，快速移动
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 76: // L
                TableCross.hide();
                if (T.next(10)) // 步长10，快速移动
                    ExtQuote.autoUnfold(); // 自动展开引用
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
    $("li > p:only-child").contents().unwrap();

    // 初始化
    $("h1, h2, h3, h4, h5, h6, ul > li, ol > li, p[class!=md-toc-content][class!=v-caption-1][class!=v-caption-2], figure, .md-diagram-panel, .MathJax_SVG_Display").each(function () {
        let item = $(this);
        // 跳过子元素有嵌套p的情况，如li > p
        if (item.children("p").length === 0) {
            iParagraphNav.add(item);

            // 双击内容块激活/关闭段落导航模式模式
            item.dblclick(function () {
                ThreeClicker.active();
            });
        } // if
    });
}

// ==================== 三击处理器 ==================== //

function ThreeClicker() {}

ThreeClicker.activeTime = 0;

/**
 * 进入激活状态（在双击事件中触发）
 */
ThreeClicker.active = function () {
    ThreeClicker.activeTime = new Date().getTime();
}

/**
 * 三击触发尝试
 * @returns boolean true：成功触发三击，false：未满足触发三击
 */
ThreeClicker.tick = function () {
    // 未进入激活状态
    if (ThreeClicker.activeTime === 0)
        return gFalse;

        // 与进入激活状态时间隔小于指定时间，则满足触发三击条件
    if (new Date().getTime() - ThreeClicker.activeTime < 300)
        return gTrue;

    // 超过指定时间隔音则恢复为未激活
    ThreeClicker.activeTime = 0;
    return gFalse;
}

// ==================== 工具栏类 ==================== //

/**
 * 构造函数
 * @param navCenter 导航中心对象
 * @param chapterNav 章节导航对象
 */
function Toolbar(navCenter, chapterNav) {
    let T = this;
    T.ui = $(".v-toolbar"); // 工具栏主界面
    T.btns = []; // 工具栏按钮集
    iNavCenter = navCenter;
    T.chapterNav = chapterNav;

    if (V_type !== "max")
        T.ui.hide();

    /**
     * 添加按钮
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    T.add = function (name, clickEvent) {
        T.btns[name] = $(".v-btn." + name);

        T.btns[name].unbind(s_Click).click(function () {
            iToolTips.hide();
            typeof(clickEvent) == "function" && clickEvent();
        });

        // hover 事件处理
        T.btns[name].hover(function () {
            let _t = $(this),
                btnGroup = _t.attr(s_DataBtnGroup);
            if (btnGroup !== gUndefined)
                $(".v-btn-group." + btnGroup).addClass(s_Hover);
            iToolTips.show(_t, s_Auto);
        }, function () {
            let btnGroup = $(this).attr(s_DataBtnGroup);
            if (btnGroup !== gUndefined)
                $(".v-btn-group." + btnGroup).removeClass(s_Hover);
            iToolTips.hide();
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

            let offsetY = parseInt(T.chapterNav.ui.css(s_Top));
            // 小屏
            if (V_ui_isSmallScreen()) {
                T.ui.css(s_PaddingLeft, 0)
                    .css(s_PaddingRight, 0)
                    .css(s_Top, 50 + offsetY);
            }

            // 微调工具栏分隔宽度
            T.btns[s_ToolbarSpliter].css(s_Width, 20);

            // 调整工具栏样式
            T.ui.removeClass("v-float-card");
            T.ui.addClass("cover");

            // 为去掉工具栏背景的按钮添加浮动样式
            T.ui.children(".v-btn, .v-btn-group").addClass("v-float-card");
            T.ui.children(".v-btn, .v-btn-group").addClass(s_Float);

            // 大屏，回到封面及最开始位置进行二次调整
            if (V_ui_isSmallScreen() === gFalse
                && iNavCenter.catalog.inHeader() === gFalse) {
                if ($(document).scrollTop() <= 5) {
                    T.ui.css(s_PaddingLeft, 10)
                        .css(s_PaddingRight, 10)
                        .css(s_Top, 10);
                }
                else {
                    T.ui.css(s_PaddingLeft, 10)
                        .css(s_PaddingRight, 10)
                        .css(s_Top, 0);
                }
            }
            else {
                // 小屏，在非封面位置进行二次调整
                if (V_ui_isSmallScreen() && iNavCenter.catalog.inHeader())
                    T.ui.css(s_PaddingLeft, 0)
                        .css(s_PaddingRight, 0)
                        .css(s_Top, 50 + offsetY);
                else {
                    // 小屏，在封面及最开始位置进行二次调整
                    if ($(document).scrollTop() <= 5)
                        T.ui.css(s_PaddingLeft, 10)
                            .css(s_PaddingRight, 10)
                            .css(s_Top, 10);
                    // 小屏，在封面位置进行二次调整
                    else
                        T.ui.css(s_PaddingLeft, 10)
                            .css(s_PaddingRight, 10)
                            .css(s_Top, 0);
                }
            }
        }
        // 宽屏，且不在封面
        else {
            if (T.ui.offset().top === 0)
                return;

            // 调整具栏按钮分隔空间
            V_util_setVarVal("--v-toolbar-btn-space", "2px");

            // 调整工具栏样式
            T.ui.removeClass("cover");
            T.ui.addClass("v-float-card");

            // 微调工具栏分隔宽度
            let btnCount = T.ui.find(".v-btn").length,
                btnWidth = parseInt(V_util_getVarVal("--v-toolbar-btn-width")),
                space = parseInt(V_util_getVarVal("--v-toolbar-btn-space"));
            T.btns[s_ToolbarSpliter].css(s_Width, "calc((var(--v-nav-center-width) - "
                    + (btnCount * btnWidth + parseInt(T.ui.css(s_PaddingLeft)) * 2 + (btnCount - 4) * space) + "px) / 2)");

            T.ui.css(s_PaddingLeft, 10)
                .css(s_PaddingRight, 10)
                .css(s_Top, 0);
            // 为增加了工具栏按钮的背景去掉浮动样式
            T.ui.children(".v-btn, .v-btn-group").removeClass("v-float-card");
            T.ui.children(".v-btn, .v-btn-group").removeClass(s_Float);
        } // else
        T.ui.show();
    }

    /**
     * 更新工具栏按钮图标
     */
    T.updateIcons = function () {
        // 调整模式切换按钮图标
        if (ColorScheme.scheme === s_Light)
            T.btns[s_ColorScheme].html(
                "<svg width='18px' height='18px'><use xlink:href='#icoDarkMode' class='v-svg-ico-light'/></svg>"
            );
        else
            T.btns[s_ColorScheme].html(
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
            ColorScheme.toggle(s_Dark);
        }
        else {
            __updateIcons(gFalse);
            ColorScheme.toggle(s_Light);
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
ColorScheme.toggle = function (scheme) {
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
        "--ac-red",
        "--ac-red-alt",
        "--ac-red-fade",
        "--ac-red-title",
        "--ac-orange",
        "--ac-orange-alt",
        "--ac-orange-fade",
        "--ac-orange-title",
        "--ac-yellow",
        "--ac-yellow-alt",
        "--ac-yellow-fade",
        "--ac-yellow-title",
        "--ac-lime",
        "--ac-lime-alt",
        "--ac-lime-fade",
        "--ac-lime-title",
        "--ac-green",
        "--ac-green-alt",
        "--ac-green-fade",
        "--ac-green-title",
        "--ac-aqua",
        "--ac-aqua-alt",
        "--ac-aqua-fade",
        "--ac-aqua-title",
        "--ac-cyan",
        "--ac-cyan-alt",
        "--ac-cyan-fade",
        "--ac-cyan-title",
        "--ac-blue",
        "--ac-blue-alt",
        "--ac-blue-fade",
        "--ac-blue-title",
        "--ac-sea",
        "--ac-sea-alt",
        "--ac-sea-fade",
        "--ac-sea-title",
        "--ac-steel",
        "--ac-steel-alt",
        "--ac-steel-fade",
        "--ac-steel-title",
        "--ac-purple",
        "--ac-purple-alt",
        "--ac-purple-fade",
        "--ac-purple-title",
        "--ac-magenta",
        "--ac-magenta-alt",
        "--ac-magenta-fade",
        "--ac-magenta-title",
        "--ac-pink",
        "--ac-pink-alt",
        "--ac-pink-fade",
        "--ac-pink-title",
        "--ac-gold",
        "--ac-gold-alt",
        "--ac-gold-fade",
        "--ac-gold-title",
        "--ac-brown",
        "--ac-brown-alt",
        "--ac-brown-fade",
        "--ac-brown-title",
        "--ac-gray",
        "--ac-gray-alt",
        "--ac-gray-fade",
        "--ac-gray-title",
        "--ac-theme1",
        "--ac-theme1-alt",
        "--ac-theme1-fade",
        "--ac-theme1-title",
        "--ac-theme2",
        "--ac-theme2-alt",
        "--ac-theme2-fade",
        "--ac-theme2-title",
        "--mm-c-red",
        "--mm-c-red-alt",
        "--mm-c-orange",
        "--mm-c-orange-alt",
        "--mm-c-yellow",
        "--mm-c-yellow-alt",
        "--mm-c-green",
        "--mm-c-green-alt",
        "--mm-c-cyan",
        "--mm-c-cyan-alt",
        "--mm-c-blue",
        "--mm-c-blue-alt",
        "--mm-c-purple",
        "--mm-c-purple-alt",
        "--mm-c-pink",
        "--mm-c-pink-alt",
        "--mm-c-brown",
        "--mm-c-brown-alt",
        "--mm-c-gray",
        "--mm-c-gray-alt",
        "--cm-keyword",
        "--cm-variable",
        "--cm-variable-2",
        "--cm-variable-3",
        "--cm-tag",
        "--cm-attribute",
        "--cm-CodeMirror-cursor",
        "--cm-string",
        "--cm-string-2",
        "--cm-comment",
        "--cm-header",
        "--cm-quote",
        "--cm-hr",
        "--cm-link",
        "--cm-negative",
        "--cm-positive",
        "--cm-meta",
        "--cm-bulidin",
        "--cm-bracket",
        "--cm-atom",
        "--cm-number"
    ], (ColorScheme.scheme === s_Dark) ? "dk" : "lg");

    // 针对 Dark Mode 进行适配处理
    ExtFigure.adjustColorScheme(gTrue);

}

/**
 * 根据颜色方案对浏览器兼容性处理
 */
ColorScheme.afterToggle = function () {
    $(".v-copyright").children("svg").html("<use xlink:href='#icoVLOOK-" + ColorScheme.scheme + "'></use>");
}

// ==================== 字体风格选项、选择器类 ==================== //

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
    // 小清新字体风格选项
    T.sansTheme = new FontThemeOption($(".v-font-theme-opt-sans"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
            ]);
    // 艺术范字体风格选项
    T.serifTheme = new FontThemeOption($(".v-font-theme-opt-serif"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
        ]);
    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    // 绑定各字体风格选项事件
    T.sansTheme.ui.unbind(s_Click).click(function () {
        T.apply("sans");
        T.hide();
    });
    T.serifTheme.ui.unbind(s_Click).click(function () {
        T.apply("serif");
        T.hide();
    });

    /**
     * 初始化
     */
    T.init = function () {
        // 没有指定关闭 WebFont 则默认开启
        if (V_util_getParamVal("wf") !== s_Off)
            T.initWebFont();
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
            _Black = "-Black";
        // 动态加载字体 VLOOK Number
        let fontName = "VLOOK Number",
            srcName = "Altinn-DIN";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, "Altinn-DIN", "otf", s_WOFF2);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, "Altinn-DIN-Bold", "otf", s_WOFF2);
        T.loadFont(fontName, s_Italic, s_Normal, srcName, "Altinn-DIN-Italic", "otf", s_WOFF2);

        let unicodeRange = "U+0021-002F," // !"#$%&'()*+,-./（不含空格）
            + "U+0030-0039," // 0123456789
            + "U+003A-0040," // :;<=>?@
            + "U+005B-0060," // [\]^_`
            + "U+007B-007E"; // {|}~
        // 动态加载字体 VLOOK Digital Sans
        fontName = "VLOOK Digital Sans",
        srcName = "NotoSansMono";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2, unicodeRange);
        T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName + _Medium, s_TTF, s_WOFF2, unicodeRange);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2, unicodeRange);
        T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, s_TTF, s_WOFF2, unicodeRange);

        // 动态加载字体 VLOOK Digital Serif
        fontName = "VLOOK Digital Serif",
        srcName = "LuxiMono";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2, unicodeRange);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2, unicodeRange);
        let luxiMonoSubName = srcName + "-Italic";
        T.loadFont(fontName, s_Italic, s_Normal, srcName, luxiMonoSubName + _Regular, s_TTF, s_WOFF2, unicodeRange);
        T.loadFont(fontName, s_Italic, s_Bold, srcName, luxiMonoSubName + _Bold, s_TTF, s_WOFF2, unicodeRange);

        // 动态加载字体 VLOOK Sans Mono
        fontName = "VLOOK Sans Mono",
        srcName = "NotoSansMono";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName +_Medium, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, s_TTF, s_WOFF2);

        // 动态加载字体 VLOOK Serif Mono
        fontName = "VLOOK Serif Mono",
        srcName = "LuxiMono";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Italic, s_Normal, srcName, luxiMonoSubName + _Regular, s_TTF, s_WOFF2);
        T.loadFont(fontName, s_Italic, s_Bold, srcName, luxiMonoSubName + _Bold, s_TTF, s_WOFF2);

        // 动态加载字体 VLOOK Noto Sans CJK SC
        fontName = "VLOOK Sans",
        srcName = "NotoSansCJKsc";
        T.loadFont(fontName, s_Normal, s_Normal, srcName, srcName + _Regular, "otf", s_WOFF2);
        T.loadFont(fontName, s_Normal, s_Bold, srcName, srcName + _Bold, "otf", s_WOFF2);
        T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, "otf", s_WOFF2);

        // 动态加载字体 VLOOK Noto Serif CJK SC
        fontName = "VLOOK Serif",
        srcName = "NotoSerifCJKsc";
        T.loadFont(fontName, s_Normal, fontWeight500, srcName, srcName + _Medium, "otf", s_WOFF2);
        T.loadFont(fontName, s_Normal, fontWeight900, srcName, srcName + _Black, "otf", s_WOFF2);

        // 加载超时检测
        setTimeout(function () {
            let langTimeout = "❌ " + [
                "超时",
                // "超時",
                "Timeout",
                // "Temps libre", "Auszeit", "Se acabó el tiempo", "Тайм-аут", "タイムアウト", "타임 아웃"
            ][V_lang_id];
            if (T.sansTheme.fonts.length > 0)
                $("#fontset-sans-status").text(langTimeout);
            if (T.serifTheme.fonts.length > 0)
                $("#fontset-serif-status").text(langTimeout);
        }, 600000); // 10 分钟后进行超时检测
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
            let woffURL = "url('" + fontHost + srcFontName + "-" + woff + "/" + srcFontSubName + "." + woff + "') format('woff2')",
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
                    webFontReady = "✅ " + [
                        "已就绪",
                        // "已就緒",
                        "Ready",
                        // "Prêt", "Bereit", "Listo", "готов", "準備完了", "준비된"
                    ][V_lang_id],
                    webFontLoading = [
                        "加载中",
                        // "加載中",
                        "Loading",
                        // "Chargement", "Wird geladen", "Cargando", "Загрузка", "読み込み中", "로딩 중"
                    ][V_lang_id];
                LOG("_____ FONT LOADED _____ ");
                LOG(fontID);

                // 更新小清新风格字体包下载进度
                for (let i = 0; i < T.sansTheme.fonts.length; i++) {
                    if (T.sansTheme.fonts[i] === fontID) {
                        T.sansTheme.fonts.splice(i, 1);
                        break;
                    }
                }
                let sansLoadedCount = T.sansTheme.fontCount - T.sansTheme.fonts.length,
                    sansStatus = $("#fontset-sans-status");
                if (sansLoadedCount < T.sansTheme.fontCount)
                    sansStatus.text(webFontLoading + "... (" + Math.round(sansLoadedCount / T.sansTheme.fontCount * 100) + "%)");
                else
                    sansStatus.text(webFontReady);

                // 更新艺术范风格字体包下载进度
                for (let i = 0; i < T.serifTheme.fonts.length; i++) {
                    if (T.serifTheme.fonts[i] === fontID) {
                        T.serifTheme.fonts.splice(i, 1);
                        break;
                    }
                }
                let serifLoadedCount = T.serifTheme.fontCount - T.serifTheme.fonts.length,
                    serifStatus = $("#fontset-serif-status");
                if (serifLoadedCount < T.serifTheme.fontCount)
                    serifStatus.text(webFontLoading + "... (" + Math.round(serifLoadedCount / T.serifTheme.fontCount * 100) + "%)");
                else
                    serifStatus.text(webFontReady);
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
        if (T.theme === "sans") {
            T.sansTheme.ui.addClass(s_Selected);
            T.serifTheme.ui.removeClass(s_Selected);
        }
        else {
            T.serifTheme.ui.addClass(s_Selected);
            T.sansTheme.ui.removeClass(s_Selected);
        }
    }

    /**
     * 显示/隐藏字体风格选择器
     */
    T.toggle = function () {
        if (T.ui.css(s_Display) === s_Block) {
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
    T.buttonSeeAll.unbind(s_Click).click(function () {
        T.hide();
        // 跳转至所有脚注区域
        window.location.href = "#vk-footer-area";
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
            T.ui.css(s_Left, 20)
                .css(s_Right, 20);
        else
            T.ui.css(s_Left, "15%")
                .css(s_Right, "15%");

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
    let footnotesArea = $(".footnotes-area");
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
    a.unbind(s_Click).click(function () {
        // 获取脚注【返回】链接对应的脚注原文信息
        let _t = $(this),
            target = $("a[name='df" + _t.attr(s_Name) + "'], a[id='df" + _t.attr(s_Name) + "']").parent().clone();

        // 更新脚注弹层内容区
        LOG(target, target.text());
        iFootNote.content.html(target);
        // 移除默认的返回链接
        target.find("a[name^='dfref-footnote'], a[id^='dfref-footnote']").remove();

        // 显示脚注弹层
        iFootNote.show();
    });
}

// ==================== 状态栏类 ==================== //

/**
 * 构造函数
 * @param options 调校参数 stsbar 的值
 */
function StatusBar(options) {
    let T = this;
    T.ui = $(".v-status-bar");
    T.items = []; // 状态栏条目集
    T.options = options;

    if (V_type !== "max")
        T.ui.hide();

    /**
     * 添加状态栏条目
     * @param name 条目标识
     * @param item 条目对象
     */
    T.add = function (name, item) {
        T.items[name] = item;
        if (T.options !== gUndefined && T.options.iO(name) > -1) {
            item.enabled = gFalse;
            item.ui.remove();
        }
    }

    /**
     * 自适应显示状态栏
     */
    T.adjust = function () {
        // 移动端下隐藏不必要的功能入口
        if (env.device.mobile === gTrue) {
            T.items["zoom-view"].remove();
        }
    }
}

// ==================== 文档信息类 ==================== //

/**
 * 构造函数
 */
function DocInfo() {
    let T = this;
    T.ui = $(".v-doc-info");
    T.enabled = gTrue;

    /**
     * 统计字数
     */
    T.countWord = function () {
        if (T.enabled === gFalse)
            return;

        let latin = VOM_doc().text().match(/[\w\-]+/g),
            cjk = VOM_doc().text().match(/\p{Unified_Ideograph}/ug);
            // docInfo = $(".v-doc-info");
        let latinCount = (latin == null) ? 0 : latin.length,
            cjkCount = (cjk == null) ? 0 : cjk.length,
            wordCount = latinCount + cjkCount,
            readCountPerMin = 180;

        // 计算阅读时长
        let mins = wordCount < readCountPerMin ? 1 : parseInt(wordCount / readCountPerMin),
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
        T.ui.attr(s_DataDefault,
            times + " / " + V_formatting_thousands(wordCount.toString()) + " "
            + [
                "字",
                // "字",
                "words",
                // "mots", "Wörter", "palabras", "слова", "言葉", "말"
            ][V_lang_id]);
        // 扩展信息
        T.ui.attr(s_DataExtend,
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
        T.ui.hover(function () {
            T.ui.html(T.ui.attr(s_DataDefault) + " <span style='color: var(--d-f-c-alt)'>" + T.ui.attr(s_DataExtend) + "</span>");
        }, function () {
            T.ui.html(T.ui.attr(s_DataDefault));
        });
        T.ui.html(T.ui.attr(s_DataDefault));
    }
}

// ==================== 缩放显示类 ==================== //

/**
 * 构造函数
 */
function ZoomView() {
    let T = this;
    T.ui = $(".v-zoom-view");
    T.enabled = gTrue;

    T.ui.unbind(s_Click).click(function () {
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
        ][V_lang_id] + tag_2space + cmdKey + tag_2space + V_ui_wrap_kbd("&nbsp;+&nbsp;") + "<br />" + [
            "缩小 - ",
            // "縮小 - ",
            "Zoom Out - ",
            // "Réduction - ",
            // "Vergrößern Sie - ",
            // "Encoger - ",
            // "Уменьшить - ",
            // "ズームアウト - ",
            // "줄다 - "
        ][V_lang_id] + tag_2space + cmdKey + tag_2space + V_ui_wrap_kbd("&nbsp;-&nbsp;") + "<br />" + [
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

/**
 * 构造函数
 */
function LinkTool(mask) {
    let T = this;
    T.ui = $(".v-link-chk-result"); // 检查结果
    T.panel = {
        list : $(".v-link-error-list"), // 坏链主界面
        header : $(".v-link-error-list-header"),
        body : $(".v-link-error-list-items") // 坏链内容列表
    };
    T.enabled = gTrue;

    T.icon = {
        error : V_ui_generateSvgIcon("icoLinkError", 20, 18, s_Light),
        close : V_ui_generateSvgIcon("icoClose", 16, 16, s_Light)
    }

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.panel.list);

    // 滚动事件处理
    T.panel.body.scroll(function () {
        // 滚出了顶部则显示顶部渐变条
        if (T.panel.header.isHidden() && T.panel.body.scrollTop() > 10)
            T.panel.header.show()
        // 否则隐藏
        else if (T.panel.body.scrollTop() <= 10)
            T.panel.header.hide()
    });

    /**
     * 将 .md 的链接转换为 .html 链接（或指定后缀）
     */
    T.mdToHtml = function () {
        let mdx = V_util_getParamVal("mdx"),
            newExt = ".html";
        // 全局配置，禁用转换，则停止
        if (mdx === s_Off)
            return;

        // 全局配置，指定转换的后缀
        if (mdx !== gUndefined)
            newExt = "." + mdx;

        $("a[href*='.md']").each(function () {
            let _t = $(this),
                href = _t.attr(s_Href),
                mdx = V_util_getQueryParams(href)["mdx"];
            // 单个链接指定禁用转换，则停止
            if (mdx === s_Off)
                return gFalse;

            // 单个链接指定转换的后缀
            if (mdx !== gUndefined)
                _t.attr(s_Href, href.replace(".md", "." + mdx));
            else // 默认的全局后缀
                _t.attr(s_Href, href.replace(".md", newExt));
        });
    }

    /**
     * 添加坏链项目
     * @param id 坏链对象的标识
     * @param content 坏链项目显示的内容
     */
    T.addToCheck = function (id, content) {
        let item = $('<span ' + s_DataAnchor + '="#' + id + '" class="v-toc-item">' + content + "</span>");
        // 添加链接异常样式及属性
        $(item.attr(s_DataAnchor)).attr(s_Tabindex, 0).addClass("v-link-error-source");
        // 添加节点
        T.panel.body.append(item);
        item.unbind(s_Click).click(function () {
            T.panel.body.children(".v-toc-item-current").removeClass("v-toc-item-current");
            item.addClass("v-toc-item-current");

            V_util_gotoHash(item.attr(s_DataAnchor));
            T.hide();
        });
    }

    /**
     * 检查链接
     */
    T.checkLink = function () {
        if (T.enabled === gFalse)
            return;

        let count = 0;
        // 检查所有页内链接对应的锚点是否都存在
        $("#write a").each(function () {
            let _t = $(this),
                href = _t.attr(s_Href);
            // 忽略空链接，如 href="#"
            if (href === gUndefined || href.length <= 1)
                return gTrue;

            // --------------------
            // 页内链接
            // 以 #mjx- 开始的链接为行间公式的页内引用，会导致 jQuery 的正则表达式解析错误，须跳过
            if (href.startsWith("#") && !href.startsWith("#mjx-")) {
                // 检索是否存在与该内链对应的锚点
                let anchor = href.substring(1, href.length);
                // 没有检索到对应的锚点
                if ($("#write #" + anchor + ", #write a[name='" + anchor + "']").length === 0) {
                    count++;

                    // 设置坏链 id 值，用于跳转定位
                    let id = "vk-error-anchor" + count;
                    _t.attr(s_Id, id);

                    T.addToCheck(id, "🔗 <strong>" + [
                        "无效页内链接",
                        // "無效頁內鏈接",
                        "Invalid Inner Link",
                        // "Lien de page non valide",
                        // "Ungültiger innerer Link",
                        // "Enlace interno no válido",
                        // "Недопустимая ссылка на страницу",
                        // "ページリンクが無効です",
                        // "잘못된 페이지 링크"
                    ][V_lang_id] + ":</strong> " + $(this).text());
                }
            }
        });

        // 无错误链接
        if (count === 0) {
            T.ui.remove();
        }
        else {
            // 显示错误链接错误图标
            T.ui.addClass("error");
            T.ui.html(T.icon.error);

            // 点击图标行为
            T.ui.unbind(s_Click).click(function () {
                if (T.panel.list.isHidden())
                    T.show();
                else
                    T.hide();
            });
        }
    }

    /**
     * 显示坏链列表
     */
    T.show = function () {
        T.panel.list.show()
        T.mask.show();
    }

    /**
     * 隐藏坏链列表
     */
    T.hide = function () {
        T.panel.list.hide()
        T.mask.hide();

        T.ui.html(T.icon.error);
        V_doc_scroll_unfreeze();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    T.disposeHotkey = function (code, combKeys) {
        if (T.panel.list.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                T.hide();
                break;
        }
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
        T.close = T.ui.children(".v-mask-close");
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
        T.ui.css(s_Zindex, T.partnerUI.css(s_Zindex) - 1);

        // 「关闭提示器」的处理
        if (T.close !== gUndefined) {
            // 默认是 style = left 的位置
            let offset = 30,
                x = parseInt(T.partnerUI.css(s_Left)) + T.partnerUI.width() + offset,
                y = parseInt(T.partnerUI.css(s_Top)) + (T.partnerUI.height() - T.close.height()) / 2;
            // left / right 的处理
            if (T.style === s_Left || T.style === s_Right) {
                T.close.css(s_Left, T.style === s_Right
                        ? parseInt(T.partnerUI.css(s_Left)) - T.close.width() - offset
                        : x)
                    .css(s_Top, y);
            }
            // bottom 的处理
            else if (T.style === s_Bottom) {
                // x = parseInt(T.partnerUI.css(s_Left)) + (T.partnerUI.width() - T.close.width()) / 2;
                y = parseInt(T.partnerUI.css(s_Bottom)) + T.partnerUI.height() + offset;
                T.close.css(s_Left, s_Auto)
                    .css(s_Top, s_Auto)
                    .css(s_Bottom, y)
                    .css(s_MarginLeft, "-" + (T.close.width() / 2) + 'px')
                    .css(s_Padding, "0px 50%");
            }
        }

        // 点击遮罩隐藏联动对象
        T.ui.unbind(s_Click).click(function () {
            // 取消冻结滚动
            V_doc_scroll_unfreeze();
            // 隐藏联动对应
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

function ContentFolder() {
    let T = this;
    T.ui = $(".v-content-expander"); // 展开操作区的 UI 模板
    T.limit = V_debugMode ? 300 : 600; // 内容须折叠的高度限值
    T.contents = []; // 须进行折叠判断和处理的内容集
    T.buildTimers = [];

    T.rowNumFilter = s_Table + " tbody tr";

    /**
     * 添加内容
     */
    T.add = function (content) {
        T.contents.push(content);
    }

    /**
     * 适配内容展开操作区
     */
    T.adjust = function () {
        // 提前中断未完成的处理
        if (T.buildTimers.length > 0) {
            for (let i = 0, len = T.buildTimers.length; i < len; i++)
                clearTimeout(T.buildTimers.shift());
        }
        // 重新开始构建内容展开操作区
        T.rebuild();
    }

    /**
     * 重建部分内容展开操作区，主要是 img, table, .md-fences 等会因导航中心的显示/关闭
     * 导致文档宽度变化而引起的内容高度也跟随变化的情况
     * 如在不显示导航中心时因宽度较变，高度等比变高，或高度反而变短
     * 会导致应该显示展开操作区即不显示，或不应显示却显示的情况
     */
    T.rebuild = function () {
        // 重建需要重建的部分
        for (let i = 0, len = T.contents.length; i < len; i++) {
            // img 类长内容
            if (T.contents[i].prop(s_TagName).toLowerCase().startsWith("i")) {
                // 创建一个Image对象，实现图片的预下载
                let img = new Image();
                img.src = T.contents[i].attr(s_Src);
                // 如果图片已经存在于浏览器缓存，直接处理
                if (img.complete)
                    T.buildTimers.push(
                        setTimeout(function () {
                            T.checkAndProcess(T.contents[i], gTrue);
                        }, 50)
                    );
                // 等待图片下载完成后再处理
                else
                    img.onload = function () {
                        V_debug("img [" + img.src + "] loaded");
                        T.checkAndProcess(T.contents[i], gTrue);
                    }
            }
            // 非 img 类长内容
            else {
                // 设置按不同时间间隔执行，减少在处理数量过多时，会阻塞 UI
                T.buildTimers.push(
                    setTimeout(function () {
                        T.checkAndProcess(T.contents[i], gTrue);
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
    T.checkAndProcess = function (target, rebuild) {
        let container = target.parent(),
            tagName = target.prop(s_TagName).toLowerCase();

        // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
        if (rebuild === gTrue)
            container = container.parent();

        // 获得上一轮构建时生成的展开操作区，没有则初始为 undefined
        let oldExpander = container.next(),
            className = oldExpander.attr(s_Class);
        if (className === gUndefined || className.iO("v-content-expander") === -1)
            oldExpander = gUndefined;

        // 已被点击展开过了，在重建时则跳过
        let expanded = container.attr(s_DataContentExpanded);
        if (expanded !== gUndefined && expanded.startsWith("t")) {
            let folded = container.attr(s_DataBeforePrintFolded);
            if (folded !== gUndefined && startsWith("t") === gFalse) {
                T.buildTimers.shift();
                return;
            }
        }

        // 针对 img 内容，进行父容器的正确性处理
        if (tagName.startsWith("i")) {
            // 图像若加载晚于 img 的题注生成，其父容器则题注而不是 VLOOK 标记的 img 父容器
            if (container.attr(s_DataContainer) === gUndefined)
                container = container.parent();
        }

        // 初始化折叠配置
        container.attr(s_DataContentFolded, s_False); // 未折叠
        container.attr(s_DataContentExpanded, s_False); // 已被点击扩展了
        container.css(s_Height, s_Auto);
        // 针对 Mermaid 图表，不添加会导致出现滚动条
        if (tagName.startsWith("s"))
            container.css(s_PaddingBottom, "2px");

        let h = parseInt(target.css(s_Height));
        // 高度超出折叠要求高度时进行折叠
        if (h > T.limit) {
            // 构建内容展开操作区
            T.buildContentExpander(target, container, tagName, h, oldExpander);
        }
        // 高度没有超出折叠要求
        else {
            // 若之前须折叠，目前不需要折叠，则清除对应的展开操作区
            if (oldExpander !== gUndefined && className !== gUndefined
                && className.iO("v-content-expander") > -1)
                    oldExpander.remove();
        }

        T.buildTimers.shift();
    }

    /**
     * 构建内容展开操作区
     * @param target 为目标对象创建展开操作区（如 table）
     * @param container 指定对象所属的容器（如 table 的容器为父元素 figure）
     * @param tagName target 的 HTML 标签名
     * @param tHeight target 的高度
     * @param oldExpander 上一轮重建前的展开操作区（没有则为 undefined）
     */
    T.buildContentExpander = function (target, container, tagName, tHeight, oldExpander) {
        // 设置为已折叠
        container.attr(s_DataContentFolded, s_True);

        // 表格 <table>、Mermaid <svg> 图表的特性处理
        if (tagName.startsWith("t") || tagName.startsWith("s")) {
            container.css(s_Height, T.limit)
                .css(s_OverflowX, s_Auto) // 可横向滚动
                .css(s_OverflowY, s_Hidden);
        }
        // 非表格，非 Mermaid 图表的处理
        else {
            container.css(s_Height, T.limit)
                .css(s_OverflowY, s_Hidden);
        }

        let expander,
            w = parseInt(container.css(s_Width));

        // 上一轮构建时没有生成展开操作区，则生成一个新的
        if (oldExpander === gUndefined) {
            expander = iContentFolder.ui.clone();
            container.after(expander);
        }
        // 直接复用上一轮构建时生成的展开操作区
        else
            expander = oldExpander;

        // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
        if (container.find(s_Table).length > 0)
            container.find(T.rowNumFilter).addClass("v-tbl-row-num-hidden");

        // 动态生成按钮文本内容
        let btn = expander.find("div > span");
        btn.html(btn.attr(s_Title) + " <span style='font-weight: normal;'>"
            + Math.round((1 - T.limit / tHeight) * 100) + "%</span>");

        // 重新适配展开操作区尺寸
        if (w > parseInt(target.css(s_Width))) {
            w = target.css(s_Width);
            // 表格、mermarid 插图与比容器宽度小时，右下角不是圆角，须进行适配调整
            expander.css(s_BorderBottomRightRadius, 0);
        }
        expander.attr(s_DataContentType, tagName);
        expander.css(s_MarginLeft, container.css(s_MarginLeft))
            .css(s_Width, w);
        // 设置为可视
        expander.css(s_Visibility, "visible");

        // 展开按钮 click 事件处理
        expander.children(".v-btn").unbind(s_Click).click(function () {
            T.expand(expander);
        });

        // 展开按钮 hover 事件处理
        V_ui_bindHover(expander.children(".v-btn"));
    }

    /**
     * 展开被折叠的内容
     * @param expander 点击的按钮所在父元素
     */
    T.expand = function (expander) {
        let container = expander.prev(),
            tagName = expander.attr(s_DataContentType);
        V_report_push([s_Interactive, V_report_transTagName(tagName), 'ExpandLongContent', 0]);

        // 移除内容展开操作区
        expander.remove();

        // 展开对应的内容
        container.attr(s_DataContentFolded, s_False);
        container.attr(s_DataContentExpanded, s_True);
        container.css(s_Height, s_Auto);
        // 针对表格 <table>、Mermaid <svg> 图表增加滚动属性
        if (tagName.startsWith("t") || tagName.startsWith("s"))
            container.css(s_Overflow, s_Auto);
        // 非表格、非 Mermaid 图表的处理
        else
            container.css(s_OverflowY, "initial");

        // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
        if (container.find(s_Table).length > 0)
            container.find(T.rowNumFilter).removeClass("v-tbl-row-num-hidden");
    }
}

// ==================== 工具提示信息类 ==================== //

/**
 * 构造函数
 */
function ToolTips() {
    let T = this;
    T.ui = $(".v-tool-tips");

    T.continueShow = gFalse; // 是否激活持续显示
    T.lastStyle = gUndefined;

    T.aniTimer = null;
    T.continueTimer = null;
    T.delay = 2000;

    V_ui_addAnimate(T.ui, s_Opacity);

    /**
    * 显示工具提示信息
    *
    * @param follow 提示的目标元素
    * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
    * @param style 指定微调的样式
    */
    T.show = function (follow, align, style) {
        if (env.device.mobile === gTrue)
            return;

        // T.hide();
        T.ui.html(follow.attr(s_DataTips));

        // 强制取消最后一次延时显示的处理
        clearTimeout(T.aniTimer);
        // 强制取消隐藏后指定时间内取消持续显示的处理
        clearTimeout(T.continueTimer);

        T.lastStyle = style;

        const ow = T.ui.width();
        const ww = $(window).width();
        const gap = 20;
        let left = follow.offset().left;
        T.ui.css(s_BorderTopLeftRadius, "0")
            .css(s_BorderTopRightRadius, s_varRB);

        // 指定对齐方式或提示超出屏幕
        if (align !== s_Auto || (left + ow + gap) > ww) {
            // align: right
            T.ui.css(s_BorderTopLeftRadius, s_varRB)
                .css(s_BorderTopRightRadius, "0");
            left = follow.offset().left - ow + follow.width() - gap;
            // 右侧顶边，则微调
            if (left + ow + gap>= ww)
                left = left - gap;

            // align: center
            if (align === "center") {
                left = follow.offset().left + (follow.width() - ow) / 2 - gap / 2;
                T.ui.css(s_BorderTopLeftRadius, s_varRB)
                    .css(s_BorderTopRightRadius, s_varRB);
            }
        }
        // 左侧顶边，则微调
        if (left <= 0)
            left = 10;

        if (T.lastStyle !== gUndefined)
            T.ui.addClass(T.lastStyle);

        T.ui.css(s_Left, left)
            .css(s_Top, follow.offset().top - $(document).scrollTop() + follow.height() + 10);

        // 延时，或立即显示提示
        let waitTime = (T.continueShow === gTrue) ? 0 : T.delay;
        T.aniTimer = setTimeout(function () {
            T.continueShow = gTrue; // 一旦显示后，激活持续显示
            V_ui_show(T.ui);
        }, waitTime);
    }

    /**
     * 隐藏工具提示
     */
    T.hide = function () {
        // 隐藏后在指定时间内取消持续显示
        clearTimeout(T.continueTimer);
        T.continueTimer = setTimeout(function () {
            T.continueShow = gFalse;
        }, T.delay);

        // V_doc_scroll_unfreeze();
        // 强制取消最后一次延时显示的处理
        clearTimeout(T.aniTimer);
        V_ui_hide(T.ui);

        if (T.lastStyle !== gUndefined)
            T.ui.removeClass(T.lastStyle);
    }
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
    T.ui.unbind(s_Click).click = function () {
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
        T.show(message, delay, mask, "bubble", target);
    }

    /**
     * 显示错误信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    T.error = function (message, delay, mask, target) {
        T.show(message, delay, mask, "error", target);
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

        T.ui.html(message);

        // 先重置为默认值
        T.ui.removeClass("error");
        T.ui.removeClass("bubble");
        T.ui.css(s_Width, "")
            .css(s_Height, "")
            .css(s_Right, s_Auto)
            .css(s_Bottom, s_Auto)
            .css(s_BorderRadius, s_varRB);
        if (type === "error")
            T.ui.addClass("error");
        else if (type === "bubble")
            T.ui.addClass("bubble");

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
        T.ui.children("div").html(message);
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

/**
 * 构造函数
 */
function MoreDocContent() {
    let T = this;
    // T.chapterNav = chapterNav;
    T.ui = {
        before : $(".v-more-doc-content-before"),
        after : $(".v-more-doc-content-after")
    }

    /**
     * 刷新显示更多内容遮罩栏
     * @param scrollTop 文档当前滚动位置，如果为空则自动获取
     */
    T.refresh = function (scrollTop) {
        if (scrollTop === gUndefined)
            scrollTop = $(document).scrollTop();

        // if (T.chapterNav.ui.css(gStrDisplay) === s_Block &&  scrollTop > 800)
        if (scrollTop > 10)
            T.ui.before.show();
        else
            T.ui.before.hide();

        if (scrollTop + $(window).height() > ($(document).height() - 10))
            T.ui.after.hide();
        else
            T.ui.after.show();
    }

    /**
     * 隐藏更多内容遮罩栏
     */
    T.hideAfter = function () {
        T.ui.after.hide();
    }
}

// ==================== 题注生成器类 ==================== //

function CaptionGenerator() {}

CaptionGenerator.spliter = ". ";
CaptionGenerator.autoContent = gFalse; // 自动根据内索引对象内容生成题注

/**
 * 生成题注
 * @param target 需要添加题注的对象
 * @param tagName HTML 标签名称
 */
CaptionGenerator.actionForTextContent = function (target, tagName) {
    let caption = "",
        indexObj = gUndefined,
        anchor = "",
        dataForSearch = "";

    // 代码块 <pre>
    if (tagName.startsWith("p")) {
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
    else if (tagName.startsWith("t")) {
        indexObj = iNavCenter.table;
        caption = [
            "表 ",
            // "表 ",
            "Table ",
            // "Table ", "Tabelle ", "Mesa ", "Таблица ", "テーブル ", "표 "
        ][V_lang_id] + (V_doc_counter_table);
    }

    // 尝试获得带题注语法的内容
    let fcSet = CaptionGenerator.getCaptions(target.parent().prev(), tagName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.trim().length === 0) {
        fc = "";
        if (CaptionGenerator.autoCt === gTrue) {
            if (tagName.startsWith("p")) // 代码块
                fc = target.find(".CodeMirror-line").text().trim();
            else if (tagName.startsWith("t")) // 表格，并过滤掉列格式相关语法标记内容
                fc = target.find("td").text().trim().replace(/(==|\[\s]|\.\.|<<|\^\^|##\s)/ig, "");
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.trim(), 20);
        }
    }
    caption = "<span>" + caption + CaptionGenerator.spliter + "</span>" + fc;

    // 代码块 <pre>
    if (tagName.startsWith("p")) {
        anchor = "vk-id-codeblock" + V_doc_counter_codeblock;
        target.wrap("<div id='" + anchor + "' class='v-caption' style='width: 100%'>");
        dataForSearch += target.find(".CodeMirror-line").text();
    }
    // 表格 <table>
    else if (tagName.startsWith("t")) {
        anchor = "vk-id-tbl" + V_doc_counter_table;
        target.wrap("<div id='" + anchor + "' class='v-caption'>");
        dataForSearch += target.text();
    }

    // 添加第 1 题注
    target.before("<p class='v-caption-1'>" + caption + "</p>");
    // 添加第 2 题注
    let has2Captions = (fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='v-caption-2'>" + fc2 + "</p>");
        target.parent().attr(s_DataCaptionCount, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).attr(s_DataTitle, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }
}

/**
 * 针对插图（img、mermaid）生成题注
 * @param target 需要添加题注的对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
CaptionGenerator.actionForMediaContent = function (target, tagName) {
    let fc = target.attr(s_Alt), // 默认尝试获取图片的 alt 内容作为题注内容
        fc2 = target.attr(s_Title), // 默认尝试获得图片的 title 作为第二题注内容
        indexObj = iNavCenter.figure,
        anchor = "",
        dataForSearch = "";

    let fcSet = null;
    // 若图片 alt 无内容，则尝试获取前面段落（如<p>、<h6>）作为第 1、2 题注的内容
    if (fc === gUndefined || fc.trim().length === 0) {
        fcSet = CaptionGenerator.getCaptions(target.parent().prev(), tagName);
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
    if (tagName.startsWith("a")) {
        indexObj = iNavCenter.media;
        caption = [
            "音频 ",
            // "音頻 ",
            "Audio ",
            // "l'audio ", "Audio ", "Audio ", "аудио ", "オーディオ ", "오디오 "
        ][V_lang_id] + (V_doc_counter_audio);
    }
    // 视频频题注 video
    else if (tagName.startsWith("v")) {
        indexObj = iNavCenter.media;
        caption = [
            "视频 ",
            // "視頻 ",
            "Video ",
            // "Vidéo ", "Video ", "Vídeo ", "видео ", "ビデオ ", "비디오 "
        ][V_lang_id] + (V_doc_counter_video);
    }

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.trim().length === 0) {
        fc = "";
        if (CaptionGenerator.autoCt === gTrue) {
            if (tagName.startsWith("s")) // Mermaid SVG
                fc = target.find("g").text().trim();
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.trim(), 20);
        }
    }
    if (fc != null && fc.trim().length > 0)
        caption = "<span>" + caption + CaptionGenerator.spliter + "</span>" + fc;
    else
        caption = "<span>" + caption + "</span>";

    // 为插图（mermaid）增加题注 <svg>
    if (tagName.startsWith("s")) {
        anchor = "vk-id-fig" + V_doc_counter_fig;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption mermaid'></div>");
        dataForSearch += target.find("div, span, tspan, text").text();
    }
    // 为插图（img）增加题注 <img>
    else if (tagName.startsWith("i")) {
        anchor = "vk-id-fig" + V_doc_counter_fig;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'></div>");
        dataForSearch += target.attr(s_Src);
    }
    // 为音频增加题注 audio
    else if (tagName.startsWith("a")) {
        anchor = "vk-id-audio" + V_doc_counter_audio;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'>");
        dataForSearch += target.attr(s_Src);
    }
    // 为视频增加题注 video
    else if (tagName.startsWith("v")) {
        anchor = "vk-id-video" + V_doc_counter_video;
        target.wrap("<div id='" + anchor + "' " + s_DataFigType + "='" + tagName
            + "' class='v-caption'>");
    }

    // 生成第 1 题注
    target.before("<p class='v-caption-1'>" + caption + "</p>");
    // 生成第 2 题注
    let has2Captions = (fc !== gUndefined && fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='v-caption-2'>" + fc2 + "</p>");
        target.parent().attr(s_DataCaptionCount, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).attr(s_DataTitle, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // ----------------------------------------
    // 修正在 SVG 插图套上题注后的自适应尺寸 <svg>
    if (tagName.startsWith("s")) {
        if (target.attr(s_Height) !== s_None || target.css(s_Height) !== s_None) { // 有指定高度的
            target.removeAttr(s_Height);
            target.css(s_Height, "");
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        let style = gUndefined;
        if (target.css(s_MaxWidth) !== s_None) // CSS 中指定了最大宽度
            target.parent().css(s_Width, target.css(s_MaxWidth));
        else if ((style = target.attr(s_Style)) !== gUndefined && style.iO(s_Width) > -1) // 通过 style 指定了宽度
            target.parent().css(s_Width, target.css(s_Width));
        else if (target.attr(s_Width) !== "100%") // 指定了 width 属性，且不为 100%
            target.parent().css(s_Width, parseInt(target.attr(s_Width)) + 4); // 4 为两边 border 的宽度
        else if (target.attr(s_ViewBox) !== s_None) // 指定 width 为 100% 的情况
            target.parent().css(s_Width, target.attr(s_ViewBox).split(" ")[2] + "px");
        else
            target.parent().css(s_Width, "100%");
    }
}

/**
 * 返回插图、表格、代码块上方的题注
 * @param caption 潜在的题注内容对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
CaptionGenerator.getCaptions = function (caption, tagName) {
    let fcSet = [], // 题注集
        captionTagName = caption.prop(s_TagName),
        hideCaptionSrc = gFalse; // 是否隐藏题注源

    if (captionTagName !== gUndefined)
        captionTagName = captionTagName.toLowerCase();

    // 双题注的标准语法
    if (__getCaptionCount(caption) === 2) {
        fcSet[0] = __getCaptionSet(caption, 2)[0];
        fcSet[1] = __getCaptionSet(caption, 2)[1];
        hideCaptionSrc = gTrue;
    }
    // 单题注的标准语法
    else if (__getCaptionCount(caption) === 1) {
        fcSet[0] = __getCaptionSet(caption, 1)[0];
        fcSet[1] = null;
        hideCaptionSrc = gTrue;
    }
    // 无题注语法，但由有 h1-h6 引导
    else if (captionTagName !== gUndefined && captionTagName.startsWith("h")) {
        fcSet[0] = caption.text().trim();
        fcSet[1] = null;
        // 不能直接隐藏，会影响页内链接跳转至该位置
        // 设置为不可见，并调整位置布局实现隐藏效果，同时不影响跳转
        if (captionTagName === "h6") { // 只针对 h6，h1-h5不隐藏
           caption.css(s_Visibility, s_Hidden)
                .css(s_Position, s_Absolute);
        }
    }

    // 若成功匹配出题注，且内容不是 <img> 则隐藏原始内容
    if (hideCaptionSrc === gTrue && tagName.startsWith("i") === gFalse) {
        caption.hide();
    }
    return fcSet;

    /**
     * 返回匹配的题注数量
     * @returns number
     */
    function __getCaptionCount(target) {
        let reg2 = /^!\[.+]".+"$/; // 有2个题注
        let reg1 = /^!\[.+]$/; // 只有1个题注
        if (reg2.test(target.text().trim()) === gTrue)
            return 2;
        else if (reg1.test(target.text().trim()) === gTrue)
            return 1;
        return 0; // 无题注
    }

    /**
     * 返回题注数据数组
     * @returns [] [0] 为第 1 个题注，[1] 为第 2 个题注
     */
    function __getCaptionSet(target, count) {
        let fcSet = [],
            text = target.text().trim();
        fcSet[0] = text.substring(2, text.iO("]", 2));
        if (count === 2)
            fcSet[1] = text.substring(text.iO("]\"", 2) + 2, text.length - 1);
        return fcSet;
    }
}

// ==================== 代码块增强类 ==================== //

function ExtCodeBlock() {}

// ExtCodeBlock.blockCaptionNumbering = gFalse;

/**
 * 初始化代码块
 */
ExtCodeBlock.init = function () {
    // 获取自动生成题注并编号的行数下限，大于该行数的代码才会自动生成题注和编号
    let lmc = V_util_getParamVal("lmc");
    lmc = (lmc === gUndefined ? 1 : parseInt(lmc));
    // 遍历所有代码块
    $(".md-fences").each(function () {
        let _t = $(this);

        // 绑定内容助手
        iContentAssistor.bind(_t, s_Codeblock);

        // 折叠长代码块
        if (ExtCodeBlock.blockCapNum !== gTrue)
            iContentFolder.add(_t);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        if (_t.find(".CodeMirror-line").length > lmc) {
            V_doc_counter_codeblock++;
            // 外套一个 <p> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
            _t.wrap("<p " + s_DataContainer + "='pre' class='v-caption-container'></p>");

            // 先根据题注语法生成题注
            if (ExtCodeBlock.blockCapNum !== gTrue)
                CaptionGenerator.actionForTextContent(_t, "pre");
        }
        else {
            _t.attr(s_DataLmc, s_True);
        }
    });
}

/**
 * 复制代码块内容增强版
 */
ExtCodeBlock.copyContent = function (source) {
    V_report_push([s_Interactive, 'CodeBlock', 'Copy', 0]);
    // if (iCtAss.lastHover === undefined)
    //     return;

    let content = "",
        lines = iContentAssistor.lastHover.children().find(".CodeMirror-code .CodeMirror-line"),
        lineNo = 0,
        lineCount = lines.length;
    // 逐行读取代码
    lines.each(function () {
        lineNo++;
        let encodeText = encodeURI($(this).text()),
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
            if (encodeText.iO(badChars[i]) > -1)
                encodeText = encodeText.rplAll(badChars[i], goodChars[i]);
        }
        content += decodeURI(encodeText) + (lineNo < lineCount ? "\n" : "");
    });

    // 复制目标内容
    if (V_util_holdAltKey() === gTrue) {
        let lang = "";
        if (iContentAssistor.lastHover !== gUndefined)
            lang = iContentAssistor.lastHover.attr(s_Lang);
        content = "```" + (lang !== gUndefined ? lang : "") + "\n" + content + "\n```";
    }
    Copyer.action(source, content, function () {
        // 显示已复制动效
        let codeBlock = iContentAssistor.lastHover.children().find(".CodeMirror-sizer > div");
        V_ui_removeAnimate(codeBlock);
        codeBlock.css(s_BackgroundColor, s_varMarkBg);
        // 延时后消退
        setTimeout(function () {
            V_ui_addAnimate(codeBlock);
            codeBlock.css(s_BackgroundColor, "inherit");
        }, 500);
    });
}

// ==================== 复制类 ==================== //

function Copyer() {}

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
Copyer.action = function (source, content, md, successCallback, errorCallback) {
    Copyer_processing = gTrue;
    // 控制两次复制操作的时间间隔（同时也是解决嵌套情况下的复制失效问题）
    let ts = new Date().getTime();
    if (ts - Copyer_lastActionTime < 200) {
        Copyer_processing = gFalse;
        return;
    }

    Copyer_lastActionTime = ts;

    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    let targetName = "." + source.attr(s_Class).rplAll(" ", ".");
    $(targetName).attr(s_DataClipboardText, content);

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(targetName);

    // 复制成功事件
    clipboard.on("success", function(e) {
        // 显示复制成功提示
        let note = (md === gTrue && V_util_holdAltKey() === gTrue) ? " (<strong>as Markdown</strong>)" : "";
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

        typeof(successCallback) === "function" && successCallback();
        Copyer_processing = gFalse;
    });
    // 复制失败事件
    clipboard.on("error", function() {
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

        typeof(errorCallback) === "function" && errorCallback();
        Copyer_processing = gFalse;
    });
}

// ==================== 引用块增强类 ==================== //

function ExtQuote() {}

let ExtQuote_icoClosed = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoQuoteClosed" class="v-blockquote-folder-ico"/></svg>&nbsp;',
    ExtQuote_icoOpened = '<svg width="16px" height="16px" class="v-svg-small-ico"><use xlink:href="#icoQuoteOpened" class="v-blockquote-folder-ico"/></svg>&nbsp;',
    ExtQuote_columnsGroupCount = 0,
    ExtQuote_processingUCH = gFalse;

/**
 * 初始化引用块以实现折叠支持
 */
ExtQuote.init = function () {
    // 初始化彩虹引用的默认颜色标识
    let dcQuote = V_util_getParamVal("dc-quote");
    if (dcQuote !== gUndefined)
        RainbowQuote_defalutColor = dcQuote;

    // 遍历所有引用
    $(s_Blockquote).each(function () {
        let _t = $(this),
            matched = gFalse;
        // 针对引用内的段落
        _t.children("p").each(function () {
            matched = __disposeQuoteFolder($(this));
        });
        // 针对引用内列表下的段落
        _t.find("li > p").each(function () {
            matched = __disposeQuoteFolder($(this));
        });

        // 存在折叠，则标记，不参与分栏引用的统一高度处理
        if (matched === gTrue)
            _t.attr(s_DataFoldingQuote, gTrue);

        // 默认引用，转换为彩虹引用
        let parentTag = _t.parent().prop(s_TagName).toLowerCase();
        if (parentTag === "li" || parentTag === s_Blockquote)
            return gTrue;
        let rainbowQuote = gFalse;
        _t.find("code").each(function () {
            if ($(this).text().match(/^>(\(.+\))?$/i) != null) {
                rainbowQuote = gTrue;
                return gFalse;
            }
        });
        if (rainbowQuote === gFalse)
            _t.append("<p><code>&gt;(" + RainbowQuote_defalutColor + ")</code></p>");
    });

    // 针对分栏引用进行修正
    ExtQuote.initColumns();
    // 统一同组的分栏引用的高度
    ExtQuote.uniteColumnsHeight();

    /**
     * 展开/收起引用块
     * @param target 用于折叠其下引用块对象
     */
    function __toggleQuoteFolding(target) {
        if (target.attr(s_DataBlockquoteFolded).startsWith("t")) {
            ExtQuote.unfold(target);
        } else {
            ExtQuote.fold(target);
        }
    }

    /**
     * 对引用的折叠进行处理
     * @param target 带折叠引子的行对象
     * @returns 是否存在折叠
     */
    function __disposeQuoteFolder(target) {
        let next = target.next(s_Blockquote),
            text = target.text(),
            matched = gFalse;

        // 默认收起
        if (text.startsWith("[+] ")
            && next.length > 0
            && next.prop(s_TagName).toLowerCase().startsWith("bl")) { // <blockquote>
                matched = gTrue;
                // 分离折叠引子中的标题
                __separateTitle(target);

                // target.css(s_Color, "var(--h-f)");
                target.next(s_Blockquote).css(s_Display, s_None);
                target.rplHTML("[+] ", "<span class='v-blockquote-folder'>" + ExtQuote_icoClosed + "</span>");

                target.attr(s_DataBlockquoteFolded, s_True);

                // 因此处的 click 会与 $(document).unbind(s_Click).click() 冲突
                // 所以改为 mouseup
                target.find(".v-blockquote-folder").unbind("mouseup").mouseup(function () {
                    V_report_push([s_Interactive, 'Quote', 'Fold/Unfold', 0]);
                    __toggleQuoteFolding(target);
                });
        }
        // 默认展开
        else if (text.startsWith("[-] ")) {
            matched = gTrue;
            // 分离折叠引子中的标题
            __separateTitle(target);

            // target.css(s_Color, "var(--h-f)");
            target.rplHTML("[-] ", "<span class='v-blockquote-folder'>" + ExtQuote_icoOpened + "</span>"); // ⊖▽

            target.attr(s_DataBlockquoteFolded, s_False);

            // 因此处的 click 会与 $(document).unbind(s_Click).click() 冲突
            // 所以改为 mouseup
            target.find(".v-blockquote-folder").unbind("mouseup").mouseup(function () {
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
        let firstSpan = target.children("span:first"),
            text = firstSpan.text();
        // 折叠的标题与引子在同一个 <span> 对象内，则需要进行剥离
        if (text.length > 4) {
            let folder = text.substring(0, 4);
            firstSpan.html(firstSpan.rplHTML(/\[([+\-])]\s/, ""));
            firstSpan.before("<span>" + folder + "</span>");
        }
    }
}

/**
 * 对分栏引用进行初始化
 */
ExtQuote.initColumns = function () {
    // 针对分栏引用进行修正
    // let groupId = 1;
    $("hr + blockquote").each(function () {
        ExtQuote_columnsGroupCount++;
        let _t = $(this),
            hr = _t.prev(),
            colCount = 0;

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        hr.css(s_Display, s_None);
        colCount = hr.prevUntil(":not(hr)").length + 2; // 计算分栏数量
        if (colCount > 2) // 有更多的 <hr>
            hr.prevUntil(":not(hr)").css(s_Display, s_None);

        // ----------------------------------------
        // 对分栏按组进行初始处理
        __groupingColumns(_t);
        _t.nextUntil(":not(blockquote)").each(function () {
            if (colCount > 0) {
                __groupingColumns($(this));
            }
        });

        // 进行分组标识
        function __groupingColumns(quote) {
            // 若为带折叠的引用，则跳过
            if (quote.attr(s_DataFoldingQuote) === gTrue)
                return;

            quote.attr(s_DataQuoteGroup, ExtQuote_columnsGroupCount);
            colCount--;
        }
    });
}

/**
 * 统一分栏高度
 */
ExtQuote.uniteColumnsHeight = function () {
    if (ExtQuote_processingUCH === gTrue)
        return;

    ExtQuote_processingUCH = gTrue;
    for (let i = 1; i <= ExtQuote_columnsGroupCount; i++) {
        // 找出同一组中最大的高度
        let maxHeight = 0,
            quote = $("blockquote[" + s_DataQuoteGroup + "=" + i + "]");
        quote.each(function () {
            let _t = $(this);
            _t.css(s_Height, s_Auto);
            // 没有被小屏强制适配为不分栏时才处理
            if (_t.css(s_Display) !== s_Block) {
                let height = parseInt(_t.css(s_Height));
                if (height > maxHeight)
                    maxHeight = height;
            }
        });

        // 没有被小屏强制适配为不分栏时才处理
        if (quote.css(s_Display) !== s_Block) {
            // 将同一组中最大的高度
            quote.css(s_Height, maxHeight);
        }
    }
    ExtQuote_processingUCH = gFalse;
}

/**
 * 根据设备类型自适应hover样式
 */
ExtQuote.adjustHoverStyle = function () {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(".v-blockquote-folder").unbind(s_Hover);
    else // 为折叠的引用的折叠控件绑定 hover 事件
        V_ui_bindHover($(".v-blockquote-folder"));
}

/**
 * 收起引用块
 * @param target 用于折叠其下引用块对象
 */
ExtQuote.fold = function (target) {
    let nextQuote = target.next(s_Blockquote);
    nextQuote.css(s_Display, s_None);
    target.attr(s_DataBlockquoteFolded, s_True);
    target.find(".v-blockquote-folder").html(ExtQuote_icoClosed);
}

/**
 * 展开引用块
 */
ExtQuote.unfold = function (target) {
    // 先恢复默认高度
    target.parent().css(s_Height, s_Auto);

    let nextQuote = target.next(s_Blockquote);
    nextQuote.css(s_Display, s_Block);
    target.attr(s_DataBlockquoteFolded, s_False);
    target.find(".v-blockquote-folder").html(ExtQuote_icoOpened);
}

/**
 * 自动展开引用块
 */
ExtQuote.autoUnfold = function () {
    if (iParagraphNav.current() === gUndefined)
        return;

    let target = iParagraphNav.current();
    // 或目标段是引用块折叠操作区，且为未展开状态
    if (target.attr(s_Class) !== gUndefined) {
        let folded = target.attr(s_DataBlockquoteFolded);
        if (folded !== gUndefined && folded.startsWith("t"))
            // 模拟操作
            ExtQuote.unfold(target);
    }
}

// ==================== 表格增强类 ==================== //

function ExtTable() {}

// ExtTable.blockCaptionNumbering = gFalse;

/**
 * 初始化表格数据
 */
ExtTable.init = function () {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 表格预处理
    sw.lapStart();
    $(s_Table).each(function () {
        let _t = $(this),
            container = _t.parent();

        V_doc_counter_table++;

        // 绑定内容助手
        iContentAssistor.bind(_t, s_Table);

        // 表格自定义属性数据
        container.attr(s_DataContainer, s_Table);
        container.addClass("v-caption-container");

        // 表格滚动事件
        container.scroll(function () {
            TableCross.hide();
        });

        // 表格单元格初始化处理
        __initCell(_t);

        if (ExtTable.blockCapNum !== gTrue) {
            // 折叠长表格
            iContentFolder.add(_t);
            // 先根据题注语法生成题注
            CaptionGenerator.actionForTextContent(_t, s_Table);
        }
    }); // table
    sw.lapStop("    ├ Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    sw.lapStart();
    $(s_Table + "[" + s_DataCellMerge + "='true']").each(function () {
        let _t = $(this);
        CellMerge.dispose(_t);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        _t.find("thead > tr > th").each(function () {
            ColumnFormatting.init(_t, $(this));
        });
    });
    sw.lapStop("    ├ Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标记为带列格式的表格，进行列格式化处理
    sw.lapStart();
    $(s_Table + "[" + s_DataColumnFmting + "='true']").each(function () {
        ColumnFormatting.format($(this));
    });
    sw.lapStop("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    sw.lapStart();
    $(s_Table + "[" + s_DataRowGroup + "='true']").each(function () {
        let _t = $(this);
        RowGroup.init(_t);

        // 修正行分组的首个单元格的缩进
        _t.find("tr[" + s_DataFolder + "='true']").each(function () {
            let td = $(this).children("td:first");
            if (td.attr(s_DataIdentLevel) !== gUndefined)
                td.css(s_PaddingLeft, "0.5em");
        });
    });
    sw.lapStop("    ├ Row Group: ");

    // ----------------------------------------
    // 表格单元格重复表头引用处理，group 模式重复将在行分组展开/收起时再进行处理
    sw.lapStart();
    $(s_Table + "[" + s_DataThRpt + "='true']").each(function () {
        ThRepeater.init( $(this));
    });
    sw.lapStop("    └ Th Repeater: ");

    /**
     * 表格单元格初始化
     * @param table 表格对象
     */
    function __initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0,
            maxCol = 0;
        table.find("thead > tr").each(function () {
            colIndex = 0;
            let needCheckCellMerge = gTrue,
                needCheckColumnFormatting = gTrue,
                needCheckThRpt = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(this).find("th").each(function () {
                let th = $(this),
                    text = th.text();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === gTrue
                    && table.attr(s_DataCellMerge) !== s_True
                    && (CellMerge_syntax_row.test(text) === gTrue
                    || CellMerge_syntax_col.test(text) === gTrue)) {
                        // 将表格标记为带合并单元格语法
                        table.attr(s_DataCellMerge, s_True);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带列格式语法
                if (needCheckColumnFormatting === gTrue) {
                    if (ColumnFormatting.init(table, th) === gTrue)
                        needCheckColumnFormatting = gFalse;
                }
                // 检测是否带重复表头语法
                if (needCheckThRpt === gTrue
                    && colIndex === 0 // 只检测第 1 列
                    && ThRepeater_syntax_tag.test(text) === gTrue) {
                        // 将表格标记为带行折叠语法
                        table.attr(s_DataThRpt, s_True);
                        th.rplHTML("## ", "");
                        needCheckThRpt = gFalse;
                }

                // ----------------------------------------
                // 添加列号标识，用于列格式化时使用
                th.attr(s_DataTblCol, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 非列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross.bind(table, th);
            });
            if (colIndex > maxCol)
                maxCol = colIndex;
        });

        // ----------------------------------------
        // 遍历表格「非列头」行
        table.find("tbody > tr").each(function () {
            let colIndex = 0,
                needCheckCellMerge = gTrue,
                needCheckRowGroup = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(this).find("td").each(function () {
                let td = $(this),
                    text = td.text();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === gTrue
                    && table.attr(s_DataCellMerge) !== s_True
                    && (CellMerge_syntax_row.test(text) === gTrue
                    || CellMerge_syntax_col.test(text) === gTrue)) {
                        // 将表格标记为带合并单元格语法
                        table.attr(s_DataCellMerge, s_True);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带行折叠语法
                if (needCheckRowGroup === gTrue
                    && colIndex === 0 // 只检测第 1 列
                    && table.attr(s_DataRowGroup) !== s_True
                    && RowGroup_syntax_tag.test(text) === gTrue) {
                        // 将表格标记为带行折叠语法
                        table.attr(s_DataRowGroup, s_True);
                        needCheckRowGroup = gFalse;
                }
                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<ma.+rk>$/.test(td.html()) === gTrue) {
                    td.children().children().unwrap(); // 解包 <mark>
                    td.addClass("v-tbl-col-fmt-mark");
                }

                // 添加列号标识，用于列格式化时使用
                td.attr(s_DataTblCol, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross.bind(table, td);
            }); // find(th, td)
        }); // find(tr)
    }
}

// ==================== 表格单元格合并类 ==================== //

function CellMerge() {}

// 单元格合并语法
let CellMerge_syntax_row = /^(:|\^\^)$/, // 行，纵向合并
    CellMerge_syntax_col = /^(==|<<)$/ // 列，横向合并

/**
 * 表格单元格合并
 * @param table 要进行单元格合并处理的表格对象
 */
CellMerge.dispose = function (table) {
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
    table.find("tr").each(function () {
        tblData[rowIndex] = [];
        tblSpan[rowIndex] = [];
        let tr = $(this);
        tr.find("td, th").each(function () {
            let cell = $(this);

            // --- 行合并：预处理（纵向） ---
            // 克隆表格数据
            tblData[rowIndex][colIndex] = cell;
            tblSpan[rowIndex][colIndex] = 0;
            if (CellMerge_syntax_row.test(cell.text()) === gTrue) {
                tblSpan[rowIndex][colIndex] = 1;
                needRowSpan = gTrue;
            }
            colIndex++;
            colCount++;

            // --- 列合并（横向） ---
            // 是列合并标记
            if (CellMerge_syntax_col.test(cell.text()) === gTrue) {
                colSpanCount++;
                cell.remove();
                if (colSpanCount === 1)
                    colSpanCell = lastCell;
            }
            // 不是列标记，则进行最近列标记数据进行处理
            else {
                if (colSpanCount > 0 && colSpanCell != null) {
                    colSpanCell.attr(s_ColSpan, colSpanCount + 1);
                    CellMerge.emptyBlankCell(colSpanCell);
                    colSpanCell.css(s_TextAlign, "center");
                    // colSpanCell.css(s_VerticalAlign, "middle");
                }
                colSpanCount = 0;
            }
            lastCell = cell;
        }); // find(td, th)

        // 如果列合并了所有列，且内容为空，则取消表格行号等样式
        if (colCount === colSpanCount + 1 && tr.text().trim().length === 0) {
            tr.addClass("v-table-colspan-all");
        }

        // 列间合并：对于最后一列的补充处理
        if (colSpanCount > 0 && colSpanCell != null) {
            colSpanCell.attr(s_ColSpan, colSpanCount + 1);
            CellMerge.emptyBlankCell(colSpanCell);
            colSpanCell.css(s_TextAlign, "center");
            // colSpanCell.css(s_VerticalAlign, "middle");
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
                        tblTd2ThData[tblTd2ThData.length] = tblData[r][c].parent();
                    tblData[r][c].remove(); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    if (c + 1 < tblSpan[r].length)
                        tblData[r][c + 1].css(s_PaddingLeft, "5px");
                } else {
                    thSpanFlag = gFalse;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell != null) {
                        rowSpanCell.attr(s_RowSpan, rowSpanCount + 1);
                        CellMerge.emptyBlankCell(rowSpanCell);
                        // rowSpanCell.css(s_TextAlign, "center");
                        rowSpanCell.css(s_VerticalAlign, "middle");
                        rowSpanCount = 0;
                        rowSpanCell = null;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell != null) {
                rowSpanCell.attr(s_RowSpan, rowSpanCount + 1);
                CellMerge.emptyBlankCell(rowSpanCell);
                // rowSpanCell.css(s_TextAlign, "center");
                rowSpanCell.css(s_VerticalAlign, "middle");
            }
        } // for

        // 处理列头的纵向合并（行合并）
        for (let i = 0, len = tblTd2ThData.length; i < len; i++) {
            tblData[0][0].parent().parent().append(tblTd2ThData[i]);
            // 将 thead 内的 td 标签转换为 th
            let foundTd = gFalse;
            tblTd2ThData[i].find("td").each(function () {
                foundTd = gTrue;
                // 暂存 td 的属性数据
                let td = $(this),
                    style = td.attr(s_Style),
                    tblCol = td.attr(s_DataTblCol),
                    classValue = td.attr(s_Class),
                    colspan = td.attr(s_DataColspan);
                // td 转换为 th 标签
                td.attr(s_DataTd2th, s_True);
                td.prop("outerHTML", td.prop("outerHTML").rplAll("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.parent().attr(s_Style, style);
                td.parent().attr(s_DataTblCol, tblCol);
                td.parent().attr(s_Class, classValue);
                td.parent().attr(s_DataColspan, colspan);
            });
            // 对被从 td 转换为 th 单元格，重新绑定：鼠标点击单元格时显示阅读模式（十字光标）
            if (foundTd === gTrue) {
                tblTd2ThData[i].find("th[" + s_DataTd2th + "]").each(function () {
                    TableCross.bind(table, $(this));
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
CellMerge.emptyBlankCell = function (cell) {
    if (cell.text().trim().length === 0) {
        cell.html("");
        cell.addClass("v-empty-cell");
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

function TableCross() {}

let TableCross_enabled = gFalse,
    TableCross_ui = gUndefined,
    TableCross_lastTable = gUndefined, // 最后/当前显示阅读模式（十字光标）的表格
    TableCross_lastCell = gUndefined; // 最后/当前显示阅读模式（十字光标）的表格单元格

TableCross.init = function () {
    TableCross_ui = $(".v-table-cross");
    V_ui_addAnimate(TableCross_ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
TableCross.toggle = function (table) {
    // 已打开，则关闭
    if (TableCross_enabled)
        TableCross.disable();
    // 未打开，则打开
    else
        TableCross.enable(table);
}

// 打开表格阅读模式（十字光标）
TableCross.enable = function (table) {
    V_report_push([s_Presentation, 'Table Cross', s_Enabled, 0]);

    TableCross_enabled = gTrue;
    iContentAssistor.btns.tableCross.addClass(s_Selected);

    if (table !== gUndefined && table != null)
        table.parent().parent().next(".v-content-expander").children(".v-btn").trigger(s_Click);
}

// 关闭表格阅读模式（十字光标）
TableCross.disable = function () {
    TableCross_enabled = gFalse;
    iContentAssistor.btns.tableCross.removeClass(s_Selected);
    TableCross.hide();
}

/**
 * 绑定单元格，鼠标点击单元格时显示阅读模式（十字光标）
 * @param table 单元格所属表格对象
 * @param cell 单元格对象
 */
TableCross.bind = function (table, cell) {
    cell.unbind(s_Click).click(function () {
        if (TableCross_enabled === gFalse || Copyer_processing === gTrue)
            return;

        // vvv 不同表格之间点击，先强制移除动画 vvv
        if (TableCross_lastTable !== table)
            V_ui_removeAnimate(TableCross_ui);

        // 同一单元格不重复处理
        if (TableCross_lastCell === cell)
            return;

        let container = table.parent().parent();
        // 跳过被折叠表格
        if (container.attr(s_DataContentFolded).startsWith("t"))
            return;

        // 若点击同时也触发了「代码 / 标签 / 徽章」的复制
        if (Copyer_processing === gFalse)
            event.stopPropagation(); // 停止事件冒泡，避免与其他事件的处理冲突（如：document.click）

        // // vvv 不同表格之间点击，先强制移除动画 vvv
        // if (TableCross_lastTable !== table)
        //     V_ui_removeAnimate(TableCross_ui);

        // // 同一单元格不重复处理
        // if (TableCross_lastCell === cell)
        //     return;

        TableCross.hide();
        cell.addClass("v-table-cross-cell");

        TableCross_lastCell = cell;
        TableCross_lastTable = table;

        let tblWidth = parseInt(table.css(s_Width)),
            tblHeight = parseInt(table.css(s_Height));
            // scrollLeft = container.scrollLeft();

        let cellWidth = parseInt(cell.css(s_Width)),
            cellHeight = parseInt(cell.css(s_Height)),
            cornerLeftX = table.offset().left,
            cornerUpY = table.offset().top,
            cornerLeftWidth = cell.offset().left - table.offset().left,
            cornerUpHeight = cell.offset().top - table.offset().top,
            cornerRightX = cell.offset().left  + cellWidth,
            cornerDownY = cell.offset().top + cellHeight,
            cornerRightWidth = tblWidth - cornerLeftWidth - cellWidth,
            cornerDownHeight = tblHeight - cornerUpHeight - cellHeight;

        // 1. 左上角
        let leftUp = $(".v-table-cross.left-up");
        leftUp.css(s_Left, cornerLeftX)
            .css(s_Top, cornerUpY)
            .css(s_Width, cornerLeftWidth)
            .css(s_Height, cornerUpHeight)
            .css(s_Zindex, 9);

        // 2. 右上角
        let rightUp = $(".v-table-cross.right-up");
        rightUp.css(s_Left, cornerRightX)
            .css(s_Top, cornerUpY)
            .css(s_Width, cornerRightWidth)
            .css(s_Height,  cornerUpHeight)
            .css(s_Zindex, 9);

        // 3. 左下角
        let leftDown = $(".v-table-cross.left-down");
        leftDown.css(s_Left, cornerLeftX)
            .css(s_Top, cornerDownY)
            .css(s_Width, cornerLeftWidth)
            .css(s_Height, cornerDownHeight)
            .css(s_Zindex, 9);

        // 4. 右下角
        let rightDown = $(".v-table-cross.right-down");
        rightDown.css(s_Left, cornerRightX)
            .css(s_Top, cornerDownY)
            .css(s_Width, cornerRightWidth)
            .css(s_Height, cornerDownHeight)
            .css(s_Zindex, 9);

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
TableCross.hide = function () {
    if (TableCross_lastCell === gUndefined)
        return;

    V_ui_hide(TableCross_ui);

    TableCross_lastCell.removeClass("v-table-cross-cell");
    // TableCross_lastCell = undefined;
    TableCross_lastTable = gUndefined;
}

/**
 * 判断当前内容块是否与已显示了阅读模式（十字光标）的表格重叠
 * @param target 内容块对象
*/
TableCross.checkFallWith = function (target) {
    return (TableCross_lastTable !== gUndefined
        && target.children().attr(s_Id) === TableCross_lastTable.attr(s_Id));
}

// ==================== 表格列格式化类 ==================== //

function ColumnFormatting() {}

let ColumnFormatting_syntax_checkbox = /^\[(\s|x|-)](\s.+)*/; // 复选框列格式语法

/**
 * 初始化
 * @param table 表格对象
 * @param cell 单元格对象
 */
ColumnFormatting.init = function (table, cell) {
    // WARN(cell.text(), ColumnFormatting_syntax_checkbox.test(cell.text()));
    if (table.attr(s_DataColumnFmting) !== s_True
        && (cell.find("strong, em, u, mark, del").length > 0 // 普通列格式
        || cell.css(s_TextAlign) === s_Right // 右对齐表示使用数值格式
        || ColumnFormatting_syntax_checkbox.test(cell.text()) === gTrue)) { // 复选框列格式
            // 将表格标记为带列格式语法
            table.attr(s_DataColumnFmting, s_True);
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
ColumnFormatting.getCells = function (table, th, cells) {
    if (cells === gUndefined)
        cells = table.find("[" + s_DataColspan + "!='true'][" + s_DataTblCol + "='" + th.attr(s_DataTblCol) + "']");
    return cells;
}

/**
 * 返回表格 tbody 内的同列单元格对象集合
 * @param table 表格格对象
 * @param th 列头单元格对象
 * @param tbodyCells 集合变量，为 undefined 则重新生成
 */
ColumnFormatting.getTbodyCells = function (table, th, tbodyCells) {
    if (tbodyCells === gUndefined)
        tbodyCells = table.find("td[" + s_DataTblCol + "='" + th.attr(s_DataTblCol) + "']");
    return tbodyCells;
}

/**
 * 列格式化
 * @param table 表格对象
 */
ColumnFormatting.format = function (table) {
    table.find("thead th").each(function () {
        let th = $(this),
            cells = gUndefined,
            tbodyCells = gUndefined,
            cellsCSS = "";

        // 粗体
        if (th.find("strong:first-child").length > 0) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cellsCSS += "v-tbl-col-fmt-bold ";
        }

        // 斜体
        if (th.find("em:first-child").length > 0) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cellsCSS += "v-tbl-col-fmt-em ";
        }

        // 高亮
        let thHTML = th.html();
        if (thHTML.startsWith("<ma") && thHTML.endWith("rk>") // <mark>...</mark>
            || th.attr(s_Class) !== gUndefined
            && th.attr(s_Class).iO("v-tbl-col-fmt-mark") > -1) {
                $("[" + s_DataTblCol + "='" + th.attr(s_DataTblCol) + "']").find("mark").children().unwrap();
                cells = ColumnFormatting.getCells(table, th, cells);
                cellsCSS += "v-tbl-col-fmt-mark ";
        }

        // 批量添加以上列样式
        if (cells !== gUndefined && cellsCSS.length > 0)
            cells.addClass(cellsCSS);

        // 下划线
        if (th.find("u:first-child").length > 0) {
            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);
            tbodyCells.contents().wrap("<u></u>");
        }

        // 删除线
        if (th.find("del:first-child").length > 0) {
            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);
            tbodyCells.contents().wrap("<del></del>");
        }

        // 复选框
        if (ColumnFormatting_syntax_checkbox.test(th.text()) === gTrue) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cells.addClass("v-tbl-col-fmt-checkbox");

            // 删除列头的复选框语法
            ColumnFormatting.removeCheckboxSyntax(th);

            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);

            tbodyCells.each(function () {
                let ce = $(this),
                    syntaxText = ce.text(),
                    chkStatus = "uncheck",
                    chkStyle = s_Dark;

                // 跳过横向合并的单元格
                if (ce.attr(s_ColSpan) !== gUndefined)
                    return gTrue;

                // 移除单元格的复选框语法内容
                ColumnFormatting.removeCheckboxSyntax(ce);

                // 指定为 checked- 已选择
                if (syntaxText.startsWith("[x]"))
                    chkStatus = s_Checked;
                // 指定为 indeterminate - 不确定选择
                else if (syntaxText.startsWith("[-]"))
                    chkStatus = "indeterminate";
                // 无指定
                else
                    ce.rplHTML("&nbsp;", "");

                // 添加复选框样式
                ce.prepend("<svg width='14px' height='14px' class='v-svg-small-ico'><use xlink:href='#icoCheckbox_"
                    + chkStatus + "' class='v-svg-ico-" + chkStyle + "'/></svg>");
            });
        }

        // 数值格式
        if (th.css(s_TextAlign).startsWith("r")) {
            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            tbodyCells.addClass("v-tbl-col-fmt-num");
            // 数值格式化处理
            tbodyCells.each(function () {
                let ce = $(this),
                    text = ce.text();
                // 内容为数值
                if (text.isNumber()) {
                    // 添加千位符
                    ce.html(V_formatting_decimal( // 添加千位符
                        V_formatting_thousands(ce.html()))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting.coloringNumber(ce, text, gTrue);
                }
                // 内容为百分数
                else if (text.isPercent()) {
                    // 对小数进行处理
                    ce.html(V_formatting_percent( // 对小数进行处理
                        V_formatting_decimal(ce.html()))); // 对百分数进行格式化处理
                    // 根据正负号进行着色处理
                    let coloring = ColumnFormatting.coloringNumber(ce, text, gTrue),
                        percent = text.replace(/(-|\+|\s)/g, ""),
                        percentValue = Math.round(percent.replace("%", "")),
                        bg1 = "rgba(128, 128, 128, 0.1)",
                        bg2 = "rgba(128, 128, 128, 0.4)",
                        bgSplit = "rgba(128, 128, 128, 0.8)";
                    // 对有首色的进行渐变颜色调整
                    if (coloring === gTrue) {
                        let baseBg = ce.css(s_Color).replace("rgb", "rgba");
                        bg1 = baseBg.replace(")", ", 0.05)");
                        bg2 = baseBg.replace(")", ", 0.2)");
                        bgSplit = baseBg.replace(")", ", 0.7)");
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.css(s_Background, "linear-gradient(90deg, " + bg1 + " 0%, " + bg2 + " " + (percentValue > 1 ? percentValue - 1 : 0)
                        + "%, " + bgSplit + " " + percent
                        + ", transparent " + percent + ")")
                            .css(s_MinWidth, "100px");
                    // 对 +/- 符号进行处理
                    ce.html(ce.html().replace(">+", ">▴ ").replace(">-", ">▾ "));
                }
                // 内容为货币
                else if (text.isCurrency()) {
                    // 对货币符号进行格式货
                    ce.html(V_formatting_decimal( // 对货币符号进行格式货
                        V_formatting_thousands( // 添加千位符
                            V_formatting_currency(ce.html())))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting.coloringNumber(ce, text, gFalse);
                }
            });
        } // 数值格式

        // 标记单元格是否为横向合并，横向合并的单元不应用列格式
        if (th.attr(s_ColSpan) !== gUndefined)
            th.attr(s_DataColspan, s_True);
        else
            th.attr(s_DataColspan, s_False);
    });
}

/**
 * 根据数值的正、负号进行着色处理
 * @param target 着色的对象
 * @param text 依据的数值文本
 * @param mode 正负号位置模式，true：在开头，false: 在任意位置
 * @returns boolean 着色结果，true：有着色，false：没有着色
 */
ColumnFormatting.coloringNumber = function (target, text, mode) {
    // 正、负号在文本的开头
    if (mode === gTrue) {
        if (text.startsWith("-")) {
            target.addClass("v-tbl-col-fmt-num-negative");
            return gTrue;
        }
        else if (text.startsWith("+")) {
            target.addClass("v-tbl-col-fmt-num-positive");
            return gTrue;
        }
    }
    // 正、负号在文本的任意位置
    else {
        if (text.iO("-") > -1) {
            target.addClass("v-tbl-col-fmt-num-negative");
            return gTrue;
        }
        else if (text.iO("+") > -1) {
            target.addClass("v-tbl-col-fmt-num-positive");
            return gTrue;
        }
    }
    return gFalse;
}

/**
 * 移除复选框的语法内容
 */
ColumnFormatting.removeCheckboxSyntax = function (target) {
    target.rplHTML(/\[(\s|x|-)]\s*/, "");
}

// ==================== 表格行分组/折叠类 ==================== //

function RowGroup() {}

let RowGroup_folderCount = 0, // 折叠行内行分组类型的数量
    RowGroup_syntax_tag = /^>+(\s)./, // 用于匹配行折叠语法
    RowGroup_syntax_tag2Replace = /(&gt;)+(\s)/, // 用于匹配将行折叠语法替换为指定字符
    RowGroup_spliter = "> ", // 行折叠语法与内容的分隔标识
    RowGroup_parentStack = [], // 上级行的堆栈
    RowGroup_colorStack = [], // 不同分组的背景颜色堆栈
    // 表格折叠行图标：已收起
    RowGroup_icoClosed = '<svg width="12px" height="12px" class="v-svg-small-ico"><use xlink:href="#icoRowGroupClosed" class="v-rowgroup-folder-ico"/></svg>',
    // 表格折叠行图标：已展开
    RowGroup_icoOpened = '<svg width="12px" height="12px" class="v-svg-small-ico"><use xlink:href="#icoRowGroupOpened" class="v-rowgroup-folder-ico"/></svg>';

/**
 * 初始化
 * @param table 表格对象
 */
RowGroup.init = function (table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    table.find("[" + s_DataTblCol + "$='-0']").addClass("v-tbl-row-g-not-folder");

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0, // 当前缩进等级
        bgColor = new RandomColor();

    // 遍历所有行的第 1 个单元格
    table.find("td:first-child").each(function () {
        let td = $(this),
            tr = td.parent(),
            text = td.text();

        // 判断每行的首列，是否有行折叠标记
        // 没有则进入下一个循环
        if (RowGroup_syntax_tag.test(text) === gFalse) {
            lastLevel = 0;
            RowGroup_parentStack.length = 0;
            RowGroup_colorStack.length = 0;
            return gTrue;
        }

        // 从语法中获得当前缩进等级
        currentLevel = text.iO(RowGroup_spliter) + 1;
        // 当前等级比上一次等级要深
        if (currentLevel > lastLevel) {
            let beforeChanged = lastLevel;
            lastLevel = currentLevel;
            // 设置为新的行分组
            RowGroup.newFolder(tr, currentLevel, beforeChanged === 0,
                bgColor.format(bgColor.dissimilarRgb(), s_varTblRowAlpha));
            // 设置为行缩进行
            RowGroup.ident(tr, td, currentLevel);
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
            RowGroup.ident(tr, td, currentLevel);
        }
    });
}

/**
 * 获得最近一个分组行分组对象
 */
RowGroup.lastParent = function () {
    return RowGroup_parentStack[RowGroup_parentStack.length - 1];
}

/**
 * 获得最近一个分组颜色对象
 */
RowGroup.lastColor = function () {
    return RowGroup_colorStack[RowGroup_colorStack.length - 1];
}

/**
 * 设置为新的行分组
 * @param tr 对应的行对象
 * @param level 缩进层级
 * @param reset 是否重置回第一级
 * @param color 该分组背景色
 */
RowGroup.newFolder = function (tr, level, reset, color) {
    let folderRow = tr.prev();
    RowGroup_folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup_parentStack.push(RowGroup_folderCount);
    // 将当前行分组的随机背景颜色入栈
    RowGroup_colorStack.push(color);

    // 设置折叠行分组的属性
    folderRow.attr(s_DataFolderId, RowGroup_folderCount);
    folderRow.attr(s_DataFolder, s_True);
    folderRow.attr(s_DataRowFolded, s_True);

    // // 生成新的行分组的标识颜色
    // let tbody = tr.parent(),
    //     prevLevel = folderRow.prev().children("td:first").attr(s_DataIdentLevel),
    //     curentLevel = folderRow.children("td:first").attr(s_DataIdentLevel),
    //     c1 = folderRow.prev().css(gStrBackgroundColor);

    // // 修正背景色中的透明度不为 CSS 变量的情况
    // if (c1 !== undefined) {
    //     let alphaIdx = c1.iO(", 0.");
    //     if (alphaIdx > -1)
    //     c1 = c1.substring(0, alphaIdx) + ", var(--tbl-row-g-alpha))";
    // }
    // // 当前行分组的缩进等级，与前一行的缩进等级不同，则用父分组的背景色
    // if (curentLevel !== undefined && prevLevel !== undefined && curentLevel !== prevLevel) {
    //     let parentFolder = tbody.find("tr[" + s_DataFolder + "-id=" + folderRow.attr(s_DataParentFolderId) +"]");
    //     c1 = parentFolder.attr("vk-bg");
    // }

    // // 上一行没有背景，直接单色填充
    // if (c1 === "rgba(0, 0, 0, 0)" || reset === gT) {
    //     c1 = RowGroup.lastColor();
    //     folderRow.attr("vk-bg", c1);
    //     folderRow.css({
    //         gStrBackgroundColor : c1
    //     });
    // }
    // // 上一行有背景色，则采用组合背景色表达其从属的相关性
    // else {
    //     let c2 = RowGroup.lastColor(),
    //         c1Width = level * 50;
    //     folderRow.attr("vk-bg", c1);
    //     folderRow.css({
    //         s_Background :
    //             "linear-gradient(135deg, " + c1 + " " + c1Width + "px, var(--pn-c-alt) " + (c1Width + 1) + "px, "
    //             + c2 + " " + (c1Width + 1) + "px)"
    //     });
    // }

    // 获得折叠行分组首个单元格
    let td = folderRow.children("td:first"),
        tdHadIdent = td.find(".v-tbl-row-g-identer:last");

    // 设置折叠控件样式
    if (tdHadIdent.length > 0)
        tdHadIdent.after("<span class='v-tbl-row-g-btn'>" + RowGroup_icoClosed + "</span>");
    else
        td.prepend("<label class='v-tbl-row-g-btn'>" + RowGroup_icoClosed + "</label>");

    // 调整折叠行的缩进样式
    td.removeClass("v-tbl-row-g-not-folder");
    td.addClass("v-tbl-row-g-folder");
    tdHadIdent.addClass("v-tbl-row-g-identer-folder");

    // 添加代表目录的括号及样式
    // 重新组合生成新的单元格内容，以支持原始带格式的单元格内容
    let preClass = ".v-tbl-row-g-identer, .v-tbl-row-g-btn",
        preObjs = td.find(preClass),
        cloneTd = td.clone();
    cloneTd.children(preClass).remove();
    td.html(__echoOuterHTML(preObjs) + " <span class='folder-marker'>[</span> <strong>" + cloneTd.html() + " </strong><span class='folder-marker'>]</span>");

    // 设置展开、收起事件
    td.children(".v-tbl-row-g-btn").click(function () {
        RowGroup.toggle(folderRow);
    });

    /**
     * 遍历获得指定对象集合的所有 outerHTML 内容
     * @param objectSet 对象集合
     * @returns String
     */
    function __echoOuterHTML(objectSet) {
        let outerHTML = "";
        objectSet.each(function () {
            outerHTML += $(this).prop("outerHTML");
        });
        return outerHTML;
    }
}

/**
 * 展开、收起表格行分组下的表格行
 * @param folderRow 折叠按钮所在的表格行对象
 */
RowGroup.toggle = function (folderRow) {
    // 取消事件冒泡，用于避免显示表格的阅读模式（十字光标）
    event.stopPropagation();

    // 处理行分组的打开、关闭
    if (folderRow.attr(s_DataRowFolded).startsWith("t"))
        RowGroup.open(folderRow);
    else
        RowGroup.close(folderRow);

    // 隐藏表格的阅读模式（十字光标）
    TableCross.hide();
}

/**
 * 展开所有表格行分组
 * @param table 指定的表格对象
 * @param mode 指定打开模式。auto：系统自动打开
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
RowGroup.openAll = function (table, mode) {
    if (table.attr(s_DataRowGroup) !== s_True)
        return gFalse;

    table.find(".v-tbl-row-g-btn").each(function () {
        let folderRow = $(this).parent().parent();
        if (folderRow.attr(s_DataRowFolded) === s_True)
            RowGroup.open(folderRow, mode);
    });
    return gTrue;
}

/**
 * 收起全部表格行分级
 * @param table 指定的表格对象
 * @param mode 指定处理范围。auto：关闭被自动打开的，不指定时默认全部关闭
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
RowGroup.closeAll = function (table, mode) {
    if (table.attr(s_DataRowGroup) !== s_True)
        return gFalse;

    // 只对第一级的行分组进行处理，非第一级的行分级为 span.v-tbl-row-g-btn
    table.find("label.v-tbl-row-g-btn").each(function () {
        let folderRow = $(this).parent().parent();
        LOG(mode, folderRow.attr(s_DataRowOpenMode), folderRow.attr(s_DataRowFolded));
        if (mode === s_Auto) {
            if (folderRow.attr(s_DataRowOpenMode) === s_Auto && folderRow.attr(s_DataRowFolded) === s_False)
                RowGroup.close(folderRow);
        }
        else {
            if (folderRow.attr(s_DataRowFolded) !== s_True)
                RowGroup.close(folderRow);
        }
    });
    return gTrue;
}

/**
 * 重置清空表格中的行分组相关信息
 * @param target 目标表格
 */
RowGroup.reset = function (target) {
    target.removeAttr(s_DataRowGroup);
    target.find("tr[" + s_DataParentFolderId + "]").removeAttr(s_DataParentFolderId);
}

/**
 * 设置为缩进行
 * @param tr 对应的行对象
 * @param td 对应的行的首个单元格
 * @param level 缩进层级
 */
RowGroup.ident = function (tr, td, level) {
    // 统一缩进节点符号转换，尾行在完成的有处理后再进行修正
    td.rplHTML(RowGroup_syntax_tag2Replace, "");

    // 设置被折叠行的属性
    tr.attr(s_DataParentFolderId, RowGroup.lastParent());
    // 设置缩进样式
    td.attr(s_DataIdentLevel, level);
    // 调整样式
    td.removeClass("v-tbl-row-g-not-folder");
    td.addClass("v-tbl-row-g-sub");
    // 设置被折叠行的背景色
    tr.css(s_BackgroundColor, RowGroup.lastColor());

    // 生成缩进占位元素
    for (let i = 0; i < level; i++) {
        let identer = td.find(".v-tbl-row-g-identer:last"),
            identObj = "<label class='v-tbl-row-g-identer'></label>";
        if (identer.length > 0)
            identer.after(identObj);
        else
            td.prepend(identObj);
    }

    // 隐藏被折叠的行
    tr.css(s_Display, s_Table + "-column");
}

/**
 * 展开表格行分组
 * @param folderRow 行分组对象
 * @param mode 指定打开模式。auto：系统自动打开
 */
RowGroup.open = function (folderRow, mode) {
    // 处理展开行分组
    let id = folderRow.attr(s_DataFolderId),
        table = folderRow.parent().parent(),
        subRows = table.find("tr[" + s_DataParentFolderId + "='" + id + "']"),
        folderButton = folderRow.children("td:first").children(".v-tbl-row-g-btn:last");

    folderRow.attr(s_DataRowFolded, s_False);
    if (mode !== gUndefined)
        folderRow.attr(s_DataRowOpenMode, mode);
    folderButton.prop("innerHTML", RowGroup_icoOpened);
    subRows.css(s_Display, "");

    // 如表格指定了重复表头则进行对应处理
    let thRow = table.find("thead > tr:last-child");
    if (table.attr(s_DataThRpt) === "group") {
        // 从第 2 列开始进行处理
        folderRow.find("td:not(:first-child)").each(function () {
            let td = $(this),
                tdHTML = td.html().trim();
            if (tdHTML.length === 0 || tdHTML === "&nbsp;") {
                let colID = td.attr(s_DataTblCol),
                    th = thRow.find("th[" + s_DataTblCol + "='" + colID + "']").html();
                // 如果对应的列头可能因向下合并单元格为空时，尝试找上一行对应的列头
                if (th === gUndefined) {
                    let prevThRow = thRow.prev();
                    if (prevThRow !== gUndefined)
                        th = prevThRow.find("th[" + s_DataTblCol + "='" + colID + "']").html();
                }
                // 临时将行分组中的单元格替换为对应的列头
                td.html(th);
                td.addClass("v-th-repeater");
            }
        });
    }
}

/**
 * 折叠表格行分组
 * @param folderRow 行分组对象
 */
RowGroup.close = function (folderRow) {
    // 处理折叠行分组
    let id = folderRow.attr(s_DataFolderId),
        subRows = $("tr[" + s_DataParentFolderId + "='" + id + "']"),
        folderButton = folderRow.children("td:first").children(".v-tbl-row-g-btn:last");

    folderRow.attr(s_DataRowFolded, s_True);
    folderRow.removeAttr(s_DataRowOpenMode);
    folderButton.prop("innerHTML", RowGroup_icoClosed);

    // 折叠所有子行（包括行分组）
    subRows.each(function () {
        let tr = $(this),
            folder = tr.attr(s_DataFolder);
        if (folder !== gUndefined && folder.startsWith("t"))
            RowGroup.close(tr);
        tr.css(s_Display, s_Table + "-column");
    });

    // 如表格指定了重复表头则进行对应处理
    let table = folderRow.parent().parent();
    if (table.attr(s_DataThRpt) === "group") {
        // 从第 2 列开始进行处理
        folderRow.find("td:not(:first-child)").each(function () {
            let td = $(this);
            // 将行分组中临时替换的列头删除
            if (td.attr(s_Class).iO("v-th-repeater") > -1) {
                td.html("");
                td.removeClass("v-th-repeater");
            }
        });
    }
}

/**
 * 根据设备类型自适应hover样式
 */
RowGroup.adjustHoverStyle = function () {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(".v-tbl-row-g-btn").unbind(s_Hover);
    else // 为表格行分组的折叠控件绑定 hover 事件
        V_ui_bindHover($(".v-tbl-row-g-btn"));
}

// ==================== 表格列头重复生成器 ==================== //

function ThRepeater() {}

let ThRepeater_syntax_tag = /^(##\s).+/; // 用于匹配表格列头重复的语法

/**
 * 初始化重复表头处理
 */
ThRepeater.init = function (table) {
    let hasRowGroup = table.attr(s_DataRowGroup) === s_True;

    // 带行分组时，表头重复模式为 group，其他则为 page
    table.attr(s_DataThRpt, hasRowGroup ? "group" : "page");
    if (hasRowGroup)
        return;

    // 处理 page 模式的表头重复
    let rowIndex = 1,
        pageSize = 15 + rowIndex,
        thRow = table.find("thead > tr"),
        skipRowCount = 0,
        lastSkipRowCount = 0,
        tbody = table.find("tbody > tr"),
        rowCount = tbody.length;

    tbody.each(function () {
        let tr = $(this),
            td = tr.children("td[rowspan]");

        // 跳过有跨行合并的行
        if (td.length > 0) {
            td.each(function () {
                let rowSpan = parseInt($(this).attr(s_RowSpan));
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
                thRow.each(function () {
                    tr.after($(this).prop("outerHTML").rplAll("<th ", "<td "));
                    tr.next().children("td").addClass("v-th-repeater");
                    if (colIndex === 0)
                        tr.next().children(".v-th-repeater").addClass("first");
                    else
                        tr.next().children(".v-th-repeater").addClass("not-first");
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

function ExtAudio() {}

ExtAudio.icon = {
    loading : V_ui_generateSvgIcon("icoLoading", 16, 16, s_Light),
    play : V_ui_generateSvgIcon("icoPlay", 16, 16, s_Light),
    pause : V_ui_generateSvgIcon("icoPause", 16, 16, s_Light),
    stop : V_ui_generateSvgIcon("icoStop", 16, 16, s_Light),
    forbidden : V_ui_generateSvgIcon("icoForbidden", 16, 16, s_Light)
}

// ExtAudio.blockCaptionNumbering = gFalse;

/**
 * 初始化音频数据
 */
ExtAudio.init = function () {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("img[src$='.mp3'],[src$='.m4a'],[src$='.ogg'],[src$='.wav'],[src*='.mp3?'],[src*='.m4a?'],[src*='.ogg?'],[src*='.wav?']").each(function () {
        let audioLike = $(this),
            audio = gUndefined,
            src = audioLike.attr(s_Src),
            params = V_util_getQueryParams(src);

        // 指定为 mini 模式（扩展的自定义控件）
        if (params[s_Controls] === s_Mini) {
            V_doc_counter_audiomini++;

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.attr(s_Id, "vk-id-mini-audio" + V_doc_counter_audiomini);

            // 添加音频播放 mini 控件
            audio.after("<div id='vk-id-mini-audio" + V_doc_counter_audiomini + "-control"
                + "' " + s_DataTitle + "='mini audio " + (V_doc_counter_audiomini)
                + "' class='v-audio-mini-control'></div>");

            // 开始加载音频
            audio.bind("loadstart", function () {
                let controls = $("#" + $(this).attr(s_Id) + "-control");
                controls.addClass("v-audio-mini-control").addClass("loading");
                controls.html(ExtAudio.icon.loading);
            });

            // 音频就绪可以开始播放
            audio.bind("canplay", function () {
                let controls = $("#" + $(this).attr(s_Id) + "-control");
                controls.removeClass("loading");

                // 绑定点击事件
                controls.unbind(s_Click).click(function () {
                    __play(this, audio[0]);
                });
                controls.html(ExtAudio.icon.play);
                controls.attr(s_DataPause, params["pause"]);

                // 须显示持续时长
                let dur = params["duration"];
                if (dur !== gUndefined && dur.startsWith("t")) {
                    let dur2 = audio.attr(s_DataDuration);
                    if (dur2 === gUndefined || dur2.startsWith("t") === gFalse) {
                        // 计算音频时长
                        let duration = audio[0].duration,
                            min = Math.floor(duration / 60),
                            sec = Math.floor(duration -  min * 60);
                        let minStr = min > 0 ? min + "′" : "";
                        audio.next().after(" <sup class='v-duration-info'>" + minStr + sec + "″</sup>");
                        audio.attr(s_DataDuration, s_True);
                    }
                }
            });

            // 正在播放
            audio.bind("playing", function () {
                let controls = $("#" + $(this).attr(s_Id) + "-control"),
                    pause = controls.attr(s_DataPause);

                controls.addClass("v-audio-mini-control").addClass("playing");

                // 支持暂停播放
                if (pause !== gUndefined && pause.startsWith("t")) {
                    controls.html(ExtAudio.icon.pause);
                }
                // 不支持暂停播放，暂时即结束
                else {
                    controls.html(ExtAudio.icon.stop);
                    audio.currentTime = 0; // 播放都是从头开始
                }
            });

            // 播放结束后恢复按钮状态
            audio.bind("ended", function () {
                let controls = $("#" + $(this).attr(s_Id) + "-control");
                controls.html(ExtAudio.icon.play);
                controls.removeClass("playing");
            });

            // 故障或不可用
            audio.bind("emptied", function () {
                let id = $(this).attr(s_Id) + "-control",
                    controls = $("#" + id);
                controls.removeClass("loading");
                controls.html(ExtAudio.icon.forbidden);
                controls.addClass("v-audio-mini-control").addClass(s_Disabled);
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(id, controls.attr(s_DataTitle));
            });

            // 加载错误
            audio.bind("error", function () {
                audio.trigger("emptied");
            });

            // 鼠标 hover 事件
            audio.hover(function () {
                let _t =  $(this);
                if (_t.attr(s_Class).iO(s_Disabled) === -1)
                    _t.addClass(s_Hover);
            }, function () {
                $(this).removeClass(s_Hover);
            });
        }
        // 标准控件模式
        else {
            V_doc_counter_audio++;

            // 先根据题注语法生成题注
            if (ExtAudio.blockCapNum !== gTrue)
                CaptionGenerator.actionForMediaContent(audioLike, s_Audio);

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.attr(s_Controls, s_Controls);

            // 若有第 2 题注，则微调样式
            if (audio.next(s_Caption2).length > 0)
                audio.css(s_MarginBottom, "-10px");

            // 故障或不可用
            audio.bind("emptied", function () {
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.parent().attr(s_Id), audio.parent().attr(s_DataTitle));
            });

            // 加载错误
            audio.bind("error", function () {
                audio.trigger("emptied");
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
            iLinkTool.addToCheck(id, "🔈 <strong>" + [
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
        let audio = audioLike.parent();
        // 移除图片 img 标签
        audioLike.remove();

        // 设置 audio 属性
        if (autoplay !== gUndefined) audio.attr(s_Autoplay, s_Autoplay);
        if (loop !== gUndefined) audio.attr(s_Loop, s_Loop);
        if (preload !== gUndefined) audio.attr(s_Preload, s_Auto);

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
            controls.html(ExtAudio.icon.play);
            controls.removeClass("playing");
            audio.pause();

            // 不支持暂时播放时，暂时即结束
            if (controls.attr(s_DataPause) === gUndefined)
                audio.currentTime = 0; // 播放都是从头开始
        }
    }
}

// ==================== 音频增强类 ==================== //

function ExtVideo() {}

// ExtVideo.blockCaptionNumbering = gFalse;

/**
 * 初始化音频数据
 */
ExtVideo.init = function () {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("img[src$='.ogv'],[src$='.mp4'],[src$='.webm'],[src*='.ogv?'],[src*='.mp4?'],[src*='.webm?']").each(function () {
        let videoLike = $(this),
            video = gUndefined,
            src = videoLike.attr(s_Src);
        V_doc_counter_video++;

        // 先根据题注语法生成题注
        if (ExtVideo.blockCapNum !== gTrue)
            CaptionGenerator.actionForMediaContent(videoLike, s_Video);

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.bind("emptied", function () {
            // 将无法加载的音频信息添加到链接检查器
            __addToLinkChecker(video.parent().attr(s_Id), video.parent().attr(s_DataTitle));
        });

        // 加载错误
        video.bind("error", function () {
            video.trigger("emptied");
        });
    });

    /**
     * 将无效视频源的信息添加到链接检查器
     * @param id 坏链对象的标识
     * @param content 用于显示的内容
     */
    function __addToLinkChecker(id, content) {
        // 将无法加载的音频信息添加到链接检查器
        iLinkTool.addToCheck(id, "📺 <strong>" + [
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
        let video = videoLike.parent();
        // 移除图片 img 标签
        videoLike.remove();

        // 设置 video 为标准控件
        video.attr(s_Controls, s_Controls);

        // 设置 video 属性
        if (autoplay !== gUndefined) video.attr(s_Autoplay, s_Autoplay);
        if (loop !== gUndefined) video.attr(s_Loop, s_Loop);
        if (preload !== gUndefined) video.attr(s_Preload, s_Auto);
        if (width !== gUndefined) video.attr(s_Width, width);
        if (height !== gUndefined) video.attr(s_Height, height);

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
            T.ui = target.children(".v-textfield." + id);
        }
        else {
            target.after(ui);
            T.ui = target.parent().children(".v-textfield." + id);
        }

        // 获得实例的各关键对象
        T.input = T.ui.children("input");
        T.reset = T.ui.children(".v-textfield-reset");

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
            T.ui.addClass("v-textfield-focus");
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
            typeof(T.onFocus) == "function" && T.onFocus(T.input);
        });
        /**
         * 绑定文本失去焦点事件
         */
        T.input.blur(function () {
            T.ui.removeClass("v-textfield-focus");
            clearTimeout(T.timerValueChanged);
            // 触发外部重定义事件
            typeof(T.onBlur) == "function" && T.onBlur(T.input);
        });

        /**
         * 处理文本框输入的内容
         */
        function __processInput() {
            let value = T.input.val().trim();
            if (value === "") {
                T.reset.hide();

                // 无内容时移除样式
                if (T.action !== gUndefined && T.action.attr(s_Class).iO(s_Enabled) !== -1) {
                    T.action.removeClass(s_Enabled);
                    V_ui_unbindHover(T.action);
                }
            }
            else {
                T.reset.show();

                // 有内容时移除样式
                if (T.action !== gUndefined && T.action.attr(s_Class).iO(s_Enabled) === -1) {
                    T.action.addClass(s_Enabled);
                    T.action.hover(function () {
                        T.actionHover(gTrue);
                    }, function () {
                        T.actionHover(gFalse);
                    });
                }
            }
            // 触发外部重定义事件
            typeof(T.onInput) == "function" && T.onInput(T.input, value);
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
                        T.action.trigger(s_Click);
                    typeof(T.pressEnter) == "function" && T.pressEnter(T.input, value);
                    break;
                case 27: // ESC
                    T.reset.trigger(s_Click);
                    typeof(T.pressESC) == "function" && T.pressESC(T.input);
                    break;
            }
            // 触发外部重定义事件
            typeof(T.onKeyDown) == "function" && T.onKeyDown(T.input, value, code);
        });

        /**
         * 绑定重置输入内容按钮
         */
        T.reset.unbind(s_Click).click(function () {
            T.input.val("");
            T.input.select();
            T.reset.hide();

            if (T.action !== gUndefined && T.action.attr(s_Class).iO(s_Enabled) !== -1) {
                T.action.removeClass(s_Enabled);
                V_ui_unbindHover(T.action);
            }
            // 触发外部重定义事件
            typeof(T.onInput) == "function" && T.onInput(T.input, "");
        });
    }

    /**
     * 清空输入框内容
     */
    T.clear = function () {
        T.reset.trigger(s_Click);
    }

    /**
     * 开启输入框前图标
     * @param icon 图标
     */
    T.setIcon = function (icon) {
        T.icon = T.ui.children(".v-textfield-icon");
        T.icon.html(icon);
        T.icon.show();
    }

    /**
     * 开启动作按钮
     * @param icon 按钮图标
     */
    T.setAction = function (icon) {
        T.action = T.ui.children(".v-textfield-action");
        T.action.html(icon);
        T.action.show();

        T.action.hover(function () {
            T.actionHover(gTrue);
        }, function () {
            T.actionHover(gFalse);
        });
        T.action.unbind(s_Click).click(function () {
            let value = T.input.val();
            // 输入内容不为空
            if (value.length > 0)
                T.input.select();

            // 触发外部重定义事件
            typeof(T.onAction) == "function" && T.onAction(T.input, value);
        });
    }

    /**
     * 动作按钮鼠标 hover 处理
     * @param enter true: 鼠标光标进入，false: 鼠标光标离开
     */
    T.actionHover = function (enter) {
        if (enter === gTrue) {
            T.action.addClass(s_Hover);
            if (T.action.attr(s_Class).iO(s_Enabled) !== -1)
                T.ui.addClass("hover-action");
        }
        else {
            T.action.removeClass(s_Hover);
            T.ui.removeClass("hover-action");
        }
    }

    /**
     * 设置提示文本
     * @param text 提示文本
     */
    T.placeholder = function (text) {
        T.input.attr(s_Placeholder, text);
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
        T.ui.css(s_Width, width);
        T.input.css(s_Width, width - T.reset.width()
            - (T.icon === gUndefined ? 0 : T.icon.width())
            - (T.action === gUndefined ? 0 : T.action.width()));
        if (T.icon !== gUndefined)
            T.input.addClass("set-icon");
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

        let set = T.result.children(":visible"),
            item = set.eq(T.index);
        T.index++;
        if (T.index >= set.length)
            T.index = 0;
        return item;
    }

    T.restart = function () {
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
        entry : $(".v-segment-btn.catalog"), // 入口
        body : $(".v-toc-catalog-body"), // 目录索引内容
        result : $(".v-toc-filter-result.catalog") // 过滤结果面板
    }

    T.holder = holder;

    T.headers = []; // 目录集
    // 针对无封面的情况
    if (VOM_cover() === gUndefined)
        T.headers.push("vk-id-doc-title");

    T.currentHeaderIndex = -1; // 当前章节在目录集中的索引
    T.currentItem = gUndefined; // 当前章节对象

    T.foldItems = []; // 非叶子章节集
    T.lastHeaderFolder = gUndefined; // 上一个非叶子章节
    T.lastHeaderLevel = 0; // 上一个章节的层级

    T.lastDocScrollTop = 0; // 记录最后一次文档滚动位置

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // V_ui_addAnimate(T.panel.body.find(".md-toc-item, .v-toc-item"));

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
    T.ui.body.attr(s_DataCatalogEmpty, [
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
        return (T.ui.body.children().length > 0);
    }

    /**
     * 根据设备类型自适应hover样式
     */
    T.adjustHoverStyle = function () {
        if (env.device.mobile) // 移动设备时解绑样式事件
            $(".v-toc-folder").unbind(s_Hover);
        else // 非移动设备时绑定样式事件
            V_ui_bindHover($(".v-toc-folder"));
    }

    /**
     * 添加目录节点
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    T.add = function (item) {
        T.holder.segments.status(this, gTrue);

        // 将章节记录到目录集中
        let a = item.children("a"),
            href = a.attr(s_Href);
        T.headers.push(href.substring(1, href.length));

        // 自定义目录节点元数据
        item.attr(s_Id, "vk-header-" + item.attr(s_DataRef)) // 添加id属性
            .attr(s_DataNode, "0") // 添加节点类型：0:叶子节点, 1:目录节点
            .attr(s_DataFolded, s_False) // 添加节点状态：true:收起, false:展开
            .attr(s_Title, a.text().trim());
        // item.addClass("v-toc-item");
        // V_ui_addAnimate(item);

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.after(a.text());
        a.text("");

        // 点击目录节点事件
        item.unbind(s_Click).click(function () {
            // 跳转至对应的页内锚点
            let hash = $("#" + item.attr(s_Id)).children("a").attr(s_Href);
            V_util_gotoHash(hash);

            // 触发锚点点击事件
            typeof(T.holder.onInteractive) == "function" && T.holder.onInteractive();
            // typeof(T.onClickHash) == "function" && T.onClickHash();
        });

        // -----------------------------------
        // 目录非叶子章节的折叠功能实现
        // 所有目录节点都添加 folding 空白控件备用
        $("<div id='fd-vk-header-" + item.attr(s_DataRef)
            + "' class='v-toc-folder'>&nbsp;</div>").insertBefore(item.find("a"));

        // 记录所有非叶子节点的folder控件
        if (T.lastHeaderFolder !== gUndefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (T.parseHeaderLevel(item) > T.lastHeaderLevel) {
                // 将最近一个子目录节点折叠控件入栈
                T.foldItems.push(T.lastHeaderFolder);

                // 为非叶子的章节添加折叠图标
                let folder = T.lastHeaderFolder.html(T.icon.unfold);
                folder.parent().attr(s_DataNode, "1") // 0:叶子, 1:目录
                    .attr(s_DataFolded, s_False); // true:收起， false:展开

                // 折叠控件事件
                folder.unbind(s_Click).click(function () {
                    let id = $(this).parent().attr(s_Id);
                    T.disposeFold(id, ($("#" + id).attr(s_DataFolded).startsWith("t")) ? "e" : "c", gTrue);
                    event.cancelBubble = gTrue;
                });
            }

            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            if (T.parseHeaderLevel(item) < T.lastHeaderLevel)
                T.foldItems.pop();

            // 设置当前节点的父级信息
            if (T.foldItems.length > 0)
                item.attr(s_DataPid, T.foldItems[T.foldItems.length - 1].parent().attr(s_Id));
        }

        // 更新最后处理的folder控件
        T.lastHeaderFolder = $("#fd-vk-header-" + item.attr(s_DataRef));
        T.lastHeaderLevel = T.parseHeaderLevel(item);
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
        let currentIndex = T.headers.length - 1;
        for (let i = 0, len = T.headers.length; i < len; i++) {
            let anchor = (env.browser.Firefox === gFalse)
                    ? T.headers[i] // 非 Firefox 浏览器
                    : decodeURI(T.headers[i]), // Firefox 浏览器
                target = $("#" + decodeURI(anchor));
                // target = $("#" + decodeURI(anchor) + ", a[name='" + anchor + "']");
            let headerHeight = target.height();
            // 将最近一个章节从文档可视空间上方滚出的章节定义为「当前章节」
            if ((target.offset().top - $(document).scrollTop()) > (headerHeight * 3)) {
                currentIndex = i - 1;
                break;
            }
        }

        // 章节没有变化则直接退出
        if (T.currentHeaderIndex === currentIndex)
            return;

        // 章节有变化，并记录
        T.currentHeaderIndex = currentIndex;

        // 当前文档位置在实际内容章节中时
        if (T.inHeader() === gTrue) {
            // ----------------------------------------
            // 更新目录内当前节点的样式
            // 先清除目录中上一次的「当前章节」的样式
            if (T.currentItem !== gUndefined)
                T.currentItem.removeClass("v-toc-item-current");
            // 更新「当前章节」的样式
            T.currentItem = $("#vlook-toc a[href='#" + T.headers[currentIndex] + "']").parent();
            T.currentItem.addClass("v-toc-item-current");

            // 若当前目录节点被折叠隐藏，则向上展开父级目录节点
            if (T.currentItem.isHidden())
                __expandUpFolder(T.currentItem.attr(s_DataPid));

            // 导航中心内容自动滚动当前章节所在位置
            T.scrollToCurrent();
        }

        // 触发当前章节变化事件
        typeof(T.onChapterChanged) == "function" && T.onChapterChanged();

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
            if (tagName !== gUndefined && tagName.toLowerCase() !== "h1")
                __expandUpFolder(item.attr(s_DataPid));
        }
    }

    /**
     * 导航中心内容自动滚动到当前章节所在位置
     */
    T.scrollToCurrent = function () {
        if (T.currentItem === gUndefined || T.currentItem.position() === gUndefined)
            return;

        // 根据当前节点情况，目录内的可视空间自动滚动该节点所在位置
        const preDis = T.currentItem.height() * 3, // 用于目录节点触动滚动的大小
            sTop = T.ui.body.scrollTop(), // 目录内当前滚动位置
            sBottom = sTop + T.ui.body.height(); // 当前可视空间中位于目录底部的位置

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (T.currentItem.position().top < sTop)
            T.ui.body.scrollTop(T.currentItem.position().top);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (T.currentItem.position().top > (sBottom - preDis))
            T.ui.body.scrollTop(T.currentItem.position().top - T.ui.body.height() + preDis);
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
        if (value.trim() === "")
            return gFalse;

        if (T.holder.segments.checkedItem() === T.typeName())
            T.showFilterResult();

        let matched = gFalse;
        T.ui.result.empty();
        // 遍历目录节点进行关键字匹配
        $("#vlook-toc > .md-toc-item").each(function () {
            let item = $(this),
                title = item.attr(s_Title);
            if (title.toLowerCase().iO(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                cloneItem.addClass("v-toc-item");
                cloneItem.removeClass("md-toc-item md-toc-h1 md-toc-h2 md-toc-h3 md-toc-h4 md-toc-h5");
                cloneItem.children(".v-toc-folder").remove();
                cloneItem.prepend("<span>" + [
                    "章节",
                    // "章節",
                    "Chapter",
                    // "Chapitre", "Kapitel", "Capítulo", "Глава", "章", "장"
                ][V_lang_id] + ". </span>");
                cloneItem.show();
                cloneItem.attr(s_DataKeywordMatch, s_True);

                // V_ui_addAnimate(cloneItem);
                // 绑定同源的点击事件
                cloneItem.unbind(s_Click).click(function () {
                    T.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");
                    item.trigger(s_Click);
                    $(this).addClass("v-toc-item-current");
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
            // if (T.holder.segments.checkedItem() !== T.typeName())
                TocIndex.updateStatus(this);
        }

        return gTrue;
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        if ($("#vlook-toc > .md-toc-item").length > 0)
            T.holder.segments.status(this, gTrue);
        else
            T.holder.segments.status(this, gFalse);
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
        T.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");
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
        V_util_gotoHash("#" + target.attr(s_DataAnchor));
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
        item.attr(s_DataFolded, (action === "e") ? s_False : s_True);
        btnFolder.html((action === "e") ? T.icon.unfold : T.icon.folded);

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = itemSet.length; i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem != null) {
                const hd1 = T.parseHeaderLevel(item);
                const hd2 = T.parseHeaderLevel(lastItem);
                if (hd1 > hd2) // 当前节点层级大于上一个节点的层级，继续
                    continue;
                else if (hd1 < hd2) // 当前节点层级小于上一个节点的层级，终止
                    break;
            }

            // 如果是目录节点，同时是已展开，且执行动作为「收起」，才进行递归调用展开子节点
            if (traversal === gTrue
                && item.attr(s_DataNode) === "1"
                && item.attr(s_DataFolded).startsWith("f")
                && action === "c") {
                    item.attr(s_DataFolded, s_True);
                    // 递归处理
                    T.disposeFold(item.attr(s_Id), action, traversal);
            }

            // 收起 / 展开
            item.css(s_Display, (action === "c") ? s_None : s_Block);
            lastItem = item;
        }
    }

    /**
     * 返回指定对象的CSS的header的样式层级
     */
    T.parseHeaderLevel = function (target) {
        let cname = target.attr(s_Class);
        return cname.substr(cname.iO("md-toc-h") + "md-toc-h".length, 1)
    }
}

// ==================== 导航中心分类索引通用类 ==================== //

function TocIndex() {}

TocIndex.segments = gUndefined;

/**
 * 初始化 UI
 * @param indexObj 目标对象
 */
TocIndex.initUI = function (indexObj) {
    let ui = indexObj.ui;

    V_ui_addAnimate(ui.entry);

    // 生成提示信息 UI
    ui.result.append("<div class='v-toc-filter-result-none'></div>");
    ui.tips = ui.result.children(".v-toc-filter-result-none");

    TocIndex.__showTips(ui);
}

/**
 * 无输入关键字的处理
 * @param indexObj 目标对象
 */
TocIndex.noneKeyword = function (indexObj) {
    let ui = indexObj.ui,
        items = ui.result.children(".v-toc-item");
    items.show();
    if (items.length === 0)
        TocIndex.__showTips(ui);
    else {
        ui.tips.hide();
        items.attr(s_DataKeywordMatch, s_True);
        TocIndex.updateStatus(indexObj);
    }
    // __showTips();
}

/**
 * 更新所属分段状态
 * @param indexObj 目标对象
 */
TocIndex.updateStatus = function (indexObj) {
    TocIndex.segments.status(indexObj,
        indexObj.ui.result.children(".v-toc-item[" + s_DataKeywordMatch + "]").length > 0);
}

/**
 * 显示提示信息
 */
TocIndex.__showTips = function (ui) {
    ui.tips.text("( " + [
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
TocIndex.add = function (indexObj, text, anchor, forSearch) {
    TocIndex.segments.status(indexObj, gTrue);

    if (indexObj.ui.tips.isShowed())
        indexObj.ui.tips.hide();
    let item = $('<span class="v-toc-item" data-for-search="'
            + V_util_clearHtmlQuot((forSearch === gUndefined || forSearch.trim().length === 0) ? "" : forSearch)
            + '">' + text + "</span>");
    indexObj.ui.result.append(item);
    // V_ui_addAnimate(item);
    item.unbind(s_Click).click(function () {
        indexObj.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");
        item.addClass("v-toc-item-current");

        V_util_gotoHash("#" + anchor);

        // 触发锚点点击事件
        typeof(indexObj.holder.onInteractive) == "function" && indexObj.holder.onInteractive();
        // typeof(indexObj.onClickHash) == "function" && indexObj.onClickHash();
    });
}

/**
 * 按关键字过滤
 * @param indexObj 目标对象
 * @param value 过滤的关键字内容
 * @returns true - 有匹配的结果，false - 无匹配的结果
 */
TocIndex.filter = function (indexObj, value) {
    if (value.trim().length === 0) {
        TocIndex.segments.status(indexObj, gFalse);
        return gFalse;
    }

    // 清空索引列表项
    indexObj.ui.tips.hide();
    indexObj.ui.result.children().hide();
    indexObj.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");
    indexObj.ui.result.children().removeAttr(s_DataKeywordMatch);

    // 遍历目录节点进行关键字匹配
    let matched = gFalse;
    indexObj.ui.result.children(".v-toc-item").each(function () {
        let item = $(this),
            dataForSearch = item.attr(s_DataForSearch);
        if (item.text().toLowerCase().iO(value) > -1
            || (dataForSearch !== gUndefined && dataForSearch.toLowerCase().iO(value) > -1)) {
                item.show();
                item.attr(s_DataKeywordMatch, s_True);
                TocIndex.segments.status(indexObj, gTrue);
                matched = gTrue;
        }
    });

    // 过滤结果为空
    if (matched === gFalse) {
        indexObj.ui.tips.text([
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
        TocIndex.segments.status(indexObj, gFalse);
    }

    return gTrue;
}

/**
 * 是否有对应的索引项目
 * @param indexObj 目标对象
 */
TocIndex.hasIndexItem = function (indexObj) {
    return (indexObj.ui.result.children("span").length > 0);
}

/**
 * 显示索引组件
 * @param indexObj 目标对象
 */
TocIndex.show = function (indexObj) {
    indexObj.ui.result.show();
    indexObj.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");
}

/**
 * 隐藏索引组件
 * @param indexObj 目标对象
 */
TocIndex.hide = function (indexObj) {
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
        entry : $(".v-segment-btn.figure"), // 入口
        result : $(".v-toc-filter-result.figure"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

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
        return TocIndex.hasIndexItem(this);
    }

    /**
     * 初始化插图索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示插图组件
     */
    T.show = function () {
        // T.ui.figureNav.show();
        TocIndex.show(this);
    }

    /**
     * 隐藏插图组件
     */
    T.hide = function () {
        // T.ui.figureNav.hide();
        TocIndex.hide(this);
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
        entry : $(".v-segment-btn.table"), // 入口
        result : $(".v-toc-filter-result.table"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

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
        return TocIndex.hasIndexItem(this);
    }

    /**
     * 初始化表格索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
     T.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示表格组件
     */
    T.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏表格组件
     */
    T.hide = function () {
        TocIndex.hide(this);
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
        entry : $(".v-segment-btn.media"), // 入口
        result : $(".v-toc-filter-result.media"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

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
        return TocIndex.hasIndexItem(this);
    }

    /**
     * 初始化多媒体索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示多媒体组件
     */
    T.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏多媒体组件
     */
    T.hide = function () {
        TocIndex.hide(this);
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
        entry : $(".v-segment-btn.codeblock"), // 入口
        result : $(".v-toc-filter-result.codeblock"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

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
        return TocIndex.hasIndexItem(this);
    }

    /**
     * 初始化代码块索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示代码块组件
     */
    T.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏代码块组件
     */
    T.hide = function () {
        TocIndex.hide(this);
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
        entry : $(".v-segment-btn.history"), // 入口
        title : $(".v-toc-history-title"), // 历史记录标题
        result : $(".v-toc-history-result") // 历史记录面板
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
        return TocIndex.hasIndexItem(this);
    }

    /**
     * 添加访问历史记录
     * @param hash 页内锚点链接
     */
    T.add = function (hash) {
        if (hash === gUndefined || hash === "#" || hash.trim().length === 0)
            return;

        // 清空当前条目的样式
        T.ui.result.children(".v-toc-item-current").removeClass("v-toc-item-current");

        // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
        let title = gUndefined,
            anchor = hash.substring(1, hash.length);
        if (anchor.startsWith("vk-id"))
            title = $(hash).attr(s_DataTitle);
        else if (anchor.startsWith("vk-err")) // 错误的内链
            title = $(hash).text();
        if (title === gUndefined)
            title = "<span>" + [
                "章节",
                // "章節",
                "Chapter",
                // "Chapitre", "Kapitel", "Capítulo", "Глава", "章", "장"
            ][V_lang_id] + ". </span>" + decodeURI(anchor);
        let result = T.ui.result.children("span[" + s_DataHistory + "='" + hash + "']");

        // 不存在相同的历史访问记录
        if (result.length === 0) {
            T.ui.result.prepend('<span ' + s_DataHistory + '="'
                + hash + '" class="v-toc-item">'
                + title + '</span>');
        }
        // 已存在相同的历史访问记录
        else {
            // 将相同的记录移动到最前面
            let existsItem = result.clone();
            T.ui.result.prepend(existsItem);
            existsItem.addClass("v-toc-item-current");
            result.remove();
        }

        // 为新增加 / 移动后的记录添加鼠标事件
        let item = T.ui.result.children("span[" + s_DataHistory + "='" + hash + "']");
        item.addClass("v-toc-item-current");
        item.attr(s_DataKeywordMatch, s_True);
        // V_ui_addAnimate(item);
        item.unbind(s_Click).click(function () {
            V_util_gotoHash(hash);
            // 触发锚点点击事件
            typeof(T.holder.onInteractive) == "function" && T.holder.onInteractive();
            // typeof(T.onClickHash) == "function" && T.onClickHash();
        });

        T.updateStatus();
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示历史组件
     */
    T.show = function () {
        T.ui.title.show();
        T.ui.result.show();

        let tocItem = "span.v-toc-item",
            noneHistory = "div.v-toc-history-none";
        // 没有历史访问记录，也没有提示信息内容
        if (T.ui.result.children(tocItem + ", " + noneHistory).length === 0) {
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
        else if (T.ui.result.children(tocItem).length > 0) {
            // 移除提示信息
            T.ui.result.children(noneHistory).remove();
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
    T.handle = $(".v-doc-lib-board.item");
    T.enabled = gFalse;
    T.src = gUndefined;
    T.identifier = "vlook-doc-lib";
    // T.placeholder = "•• Loading Doc Lib ••";

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
            T.iframe.attr(s_Src, T.src + "?ws=none&type=mini" + wf);
            // 尝试获得 DocLib 的文档标题
            __getDocLibTitle();
        }
        else {
            LOG("    ├ DocLib: none");
        }

        T.handle.unbind(s_Click).click(function () {
            T.show();
        });

        // ------------------------------
        // 处理文库专用链接
        $("a[href='" + T.identifier + "']").each(function () {
            let a = $(this);
            a.removeAttr(s_Href);
            a.attr(s_Target, T.identifier);
            a.unbind(s_Click).click(function () {
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
                        ERR("    ├ DocLib: timeout");
                    }
                    docLibBoard.show();
                    T.handle.text(title);
                    T.handle.attr(s_Title, title);
                    $(".v-nav-center-body, .v-nav-center-footer").addClass("has-doc-lib");
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
        T.iframe.attr(s_Src, T.src + "?ws=none&type=mini" + cs);
    }

    /**
     * 显示文库
     */
    T.show = function () {
        typeof(T.holder.onInteractive) == "function" && T.holder.onInteractive();

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

function ExtFigure() {}

// ExtFigure.blockCaptionNumbering = gFalse;

/**
 * 初始化插图数据
 */
ExtFigure.init = function () {
    let ignoreImgLost = gFalse,
        sw = new Stopwatch();

    // ----------------------------------------
    // 对 svg 类插图（Mermaid）进行初始化处理
    sw.lapStart();
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    $(".md-diagram-panel > svg > svg > g").each(function () {
        $(this).unwrap();
    });
    sw.lapStop("    ├ prepare svg: ");

    // ----------------------------------------
    // 对 img 类插图（Mermaid）进行初始化处理
    sw.lapStart();
    $("#write p > img, #write .md-diagram-panel svg,"
        + "img[src*='mode=figure'], img[src*='mode=icon'], img[src*='mode=logo'], img[src*='mode=frame'], "
        + "img[src*='#figure'], img[src*='#icon'], img[src*='#logo'], img[src*='#frame']").each(function () {
        let fig = $(this),
            src = fig.attr(s_Src),
            container = fig.parent(),
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
            container = fig.parent();
            // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (container.prop(s_TagName).toLowerCase() !== "p") {
                fig.wrap("<p></p>");
                container = fig.parent();
            }

            // 初始化对齐方式
            __initAlign(container, hash, params);
        }

        // 绑定内容助手
        if (src !== gUndefined)
            iContentAssistor.bind(fig, s_Fig + ".img");
        else
            iContentAssistor.bind(fig, s_Fig + ".svg");

        V_doc_counter_fig++;

        // 处理题注
        __disposeCaption(fig, tagName);

        // 设置容器数据，用于折叠内容时使用
        container.attr(s_DataContainer, tagName);
        container.addClass("v-caption-container");
        // 折叠长插图
        if (ExtFigure.blockCapNum !== gTrue)
            iContentFolder.add(fig);
    }); // 结束初始化处理
    sw.lapStop("    ├ figure set: ");

    // ----------------------------------------
    // srcset 为 auto 模式的处理
    sw.lapStart();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && V_util_getParamVal(s_Srcset) === s_Auto) {
            $("p[" + s_DataContainer + "='img'] img").each(function () {
                let fig = $(this);
                if (fig.attr(s_Src).iO(".svg", 1) === -1 // 跳过 svg 文件
                    && fig.attr(s_Srcset) === gUndefined) {
                        fig.attr(s_Srcset, fig.attr(s_Src) + " 2x");
                }
            });
    }

    // 进行图片对颜色方案的适配处理
    ExtFigure.adjustColorScheme(gFalse);
    sw.lapStop("    └ DPR & misc.: ");

    /**
     * 处理题注
     * @param fig 插图对象
     * @param tagName 插图所属标签 img、svg
     */
    function __disposeCaption(fig, tagName) {
       // 设置插图属性数据
       fig.attr(s_DataFigNum, V_doc_counter_fig);
       fig.addClass("v-fig");

       // 先根据题注语法生成题注
       if (ExtFigure.blockCapNum !== gTrue)
           CaptionGenerator.actionForMediaContent(fig, tagName);
    }

    /**
     * 绑定加载失败处理
     * @param fig 插图对象
     */
    function __bindLoadChecker(fig) {
        let src = fig.attr(s_Src);
        // 图片无法加载时加载默认图片
        fig.bind("error", function () {
            if (ignoreImgLost === gFalse) {
                // 将无法加载的图片信息添加到链接检查器
                let cp1 = fig.parent().find(s_Caption1).html(),
                    cp2 = fig.parent().find(s_Caption2).text();
                iLinkTool.addToCheck(fig.parent().attr(s_Id), "🖼 <strong>" + [
                    "无效的图片源",
                    // "無效的圖片源",
                    "Invalid image source",
                    // "Source d'image non valide",
                    // "Ungültige Bildquelle",
                    // "Fuente de imagen no válida",
                    // "Неверный источник изображения",
                    // "無効な画像ソース",
                    // "잘못된 이미지 소스"
                ][V_lang_id] + ":</strong> " + cp1 + (cp2.trim().length > 0 ? " | " + cp2 : ""));
            }

            __loadDefaultOnError($(this));
        });

        // 强制重新加载一次以触发error事件
        fig.attr(s_Src, src);
    }

    /**
     * 判断是否属于插图
     * @param src 插图路径
     * @returns true：不属于插图，false：属于插图
     */
    function __isNotFigure(src) {
        let ai = src.iO("#", 4),
            mi = src.iO("mode", 5), // 分段检过提高处理性能
            iconMode = src.iO("#icon", ai - 1) > -1 || src.iO("=icon", mi + 4) > -1,
            logoMode = src.iO("#logo", ai - 1) > -1 || src.iO("=logo", mi + 4) > -1,
            frameMode = src.iO("#frame", ai - 1) > -1 || src.iO("=frame", mi + 4) > -1;
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
        if (hash.iO("#center") > -1)
            align = "center";
        else if (align === gUndefined && hash.iO("#right") > -1)
            align = s_Right;
        else if (align === gUndefined && hash.iO("#left") > -1)
            align = s_Left;
        // 针对通过 URL 参数设置对齐方式
        else if (align === gUndefined && params["align"] !== gUndefined)
            align = params["align"];
        else
            return;
        // 设置父级对象的对齐方式
        container.css(s_TextAlign, align);
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
        img.attr(s_DataFigureGrid, grid);
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

        img.attr(s_DataImgFill, params[s_Fill]);

        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.iO(".svg", 1) > -1) {
            SVGInject(img[0], {
                // SVG 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    if (!__isNotFigure(src))
                        iContentAssistor.bind(svgObj, s_Fig + ".svg");
                    // 对颜色进行替换的适配处理
                    ExtFigure.adjustFillAlterForSVG(svgObj.attr(s_DataImgFill), svgObj);
                },
                // SVG 注入失败
                onFail : function (img, svg) {
                    ERR("SVGInject ERROR:", $(img).attr(s_Src));
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
            img.attr(s_DataDarkSrc, s_Invert);
        }
        // 适配 Dark Mode 的方式：替换
        else {
            img.attr(s_DataDarkSrc, "alter");

            let src = img.attr(s_Src),
                path = V_util_getPath(src),
                queryString = V_util_getQueryString(src);
            // 补全 URL 参数内容
            let darksrc = params[s_Darksrc] + (queryString !== "" ? ("?" + queryString) : "");
            // 如果 darksrc 只含文件名，则用 src 的路径进行补全
            if (darksrc.iO("/") === -1)
                darksrc = path + darksrc;

            // 初始化不同颜色方案的 src 内容
            img.attr(s_DataSrcLight, img.attr(s_Src));
            img.attr(s_DataSrcDark, darksrc);

            // 初始化不同颜色方案的 srcset 内容
            if (params[s_Srcset] !== gUndefined)
                img.attr(s_DataSrcsetLight, params[s_Srcset]);
            if (params[s_Darksrcset] !== gUndefined)
                img.attr(s_DataSrcsetDark, params[s_Darksrcset]);
        }
    }

    /**
     * 初始化图片高分屏的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let src = img.attr(s_Src),
            srcset = params[s_Srcset],
            darksrcset = params[s_Darksrcset];

        // Light Mode 对应的图片集
        if (srcset !== gUndefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.attr(s_DataSrcsetLight, srcset);
            // 设置默认值
            img.attr(s_Srcset, srcset);
        }

        // Dark Mode 对应的图片集
        if (darksrcset !== gUndefined) {
            darksrcset = __transUrlSrcSet(img.attr(s_DataSrcDark), darksrcset);
            img.attr(s_DataSrcsetDark, darksrcset);
        }
    }

    /**
     * 加载默认图片
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        let alt = target.attr(s_Alt);
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        if (alt !== gUndefined && alt.length > 0) {
            target.attr(s_Title, alt);
            target.removeAttr(s_Alt);
        }
        target.addClass("v-img-lost");
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
            let pureSrc = src.substring(0, src.iO("?", 5)),
                fileName = pureSrc.substring(0, pureSrc.lastIndexOf(".")), // 图片资源文件名（不含扩展名）
                suffix = pureSrc.substring(pureSrc.lastIndexOf("."), pureSrc.length); // 图片资源扩展名
            // 自动补全图片资源 URL
            srcset = srcset.replace(/@2x/, fileName + "@2x" + suffix + " 2x");
            srcset = srcset.replace(/@3x/, fileName + "@3x" + suffix + " 3x");
        }
        // @2x/@3x 图片资源为指定文件名的语法
        else {
            // 将倍数标识转换为 srcset 标准语法
            // 要从图片扩展名开始替换，避免将文件中的 @2x @3x 误替换掉
            srcset = srcset.rplAfter(".", "@2x", " 2x");
            srcset = srcset.rplAfter(".", "@3x", " 3x");
        }

        // 为 2x 图添加图片路径
        let sss = srcset.split(",");
        if (sss[0].iO("/") === -1) // 仅为文件名时才添加路径
            srcset = path + srcset;
        // 为 3x 图添加图片路径
        if (sss.length > 1 && sss[1].iO("/") === -1) // 仅为文件名时才添加路径
            srcset = srcset.replace(" 2x,", " 2x," + path);

        return srcset;
    }
}

/**
 * 复制图片地址
 */
ExtFigure.copySrc = function (source) {
    let content = iContentAssistor.lastHover.attr(s_Src);
    // 若复制为 Markdown
    if (V_util_holdAltKey() === gTrue) {
        let alt = iContentAssistor.lastHover.attr(s_Alt),
            title = iContentAssistor.lastHover.attr(s_Title);
        content = "![" + (alt !== gUndefined ? alt : "")
            + "](" + content + (title !== gUndefined ? ' "' + title + '"' : "") + ")";
    }
    Copyer.action(source, content, gTrue);
 }

/**
 * 适配指定图片在 Light / Dark Mode 的适配处理
 * @param grid 是否进行网格背景适配处理：true / false
 */
ExtFigure.adjustColorScheme = function (grid) {
    let scheme = ColorScheme.scheme,
        darkMode = scheme === s_Dark;
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 1. 对适配方式为「反转」的处理
    $("img[" + s_DataDarkSrc + "='invert'], svg[" + s_DataDarkSrc + "='invert']").each(function () {
        let img = $(this),
            src = img.attr(s_Src);
        if (darkMode === gTrue) {
            // 如果图片没有指定替换颜色时才进行处理
            if (img.attr(s_DataImgFill) === gUndefined) {
                // 设置默认的 srcset
                if (src !== gUndefined)
                    img.attr(s_Srcset, img.attr(s_DataSrcsetLight));
                // 添加反转样式
                img.addClass("v-img-invert-dark");
            }
        }
        else {
            img.removeClass("v-img-invert-dark");
            if (src !== gUndefined)
                img.attr(s_Srcset, img.attr(s_DataSrcsetLight));
        }
    });
    // 2. 对适配方式为「替换」的处理
    $("img[" + s_DataDarkSrc + "='alter']").each(function () {
        let img = $(this);
        img.removeClass("v-img-invert-dark");
        img.attr(s_Src, img.attr(s_DataSrc_ + scheme));
        img.attr(s_Srcset, img.attr(s_DataSrcset_ + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $("img[" + s_DataImgFill + "='text'], img[" + s_DataImgFill + "='theme1'], img[" + s_DataImgFill + "='theme2'], svg[" + s_DataImgFill + "='text'], svg[" + s_DataImgFill + "='theme1'], svg[" + s_DataImgFill + "='theme2']").each(function () {
        let fig = $(this),
            fill = fig.attr(s_DataImgFill);
        // SVG 对象，或 src 为 .svg 的 img 对象
        if (fig.prop(s_TagName).toLowerCase().startsWith("s") || fig.attr(s_Src).iO(".svg", 1) > -1) {
            ExtFigure.adjustFillAlterForSVG(fill, fig);
        }
        // 其他情况
        else {
            if (fill === s_Text)
                fig.css(s_Filter, "drop-shadow(12345px 0px " + fig.parent().css(s_Color) + ")");
            else
                fig.css(s_Filter, "drop-shadow(12345px 0px var(--ac-" + fill + "-lg))");

            if (fig.attr(s_DataFigNum) !== gUndefined)
                fig.css(s_Background, s_None);
        }
    });

    // --------------------
    // 非初始化时执行，避免与 CSS 默认配置冲突
    // 如：@media (prefers-color-scheme: dark) 部分
    if (grid === gTrue) {
        // 适配图片网格背景的处理
        $("img[" + s_DataFigureGrid + "='line'],img[" + s_DataFigureGrid + "='block']").each(function () {
            let img = $(this);
            // 先清空所有涉及的样式
            if (darkMode === gTrue) {
                img.removeClass("v-fig-solid-bg-light");
                img.removeClass("v-fig-grid-line-light");
                img.removeClass("v-fig-grid-block-light");
            }
            else {
                img.removeClass("v-fig-solid-bg-dark");
                img.removeClass("v-fig-grid-line-dark");
                img.removeClass("v-fig-grid-line-dark-invert");
                img.removeClass("v-fig-grid-block-dark");
                img.removeClass("v-fig-grid-block-dark-invert");
            }

            let gridType = img.attr(s_DataFigureGrid),
                darkInvert = img.attr(s_DataDarkSrc) === s_Invert;
            // 网络背景
            if (gridType === s_Line || gridType === s_Block) {
                if (darkMode === gTrue && darkInvert === gTrue)
                    // 先添加反色后的背景，以适配反色样式后能正常显示
                    img.addClass("v-fig-grid-" + gridType + "-" + scheme + "-invert");
                else
                    img.addClass("v-fig-grid-" + gridType + "-" + scheme);
            }
            // 非网格背景
            else
                img.addClass("v-fig-solid-bg-" + scheme);
        });
    }
}

/**
 * 适配 *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 * @param fill 图片颜色替换方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
ExtFigure.adjustFillAlterForSVG = function (fill, svg) {
    // 先取消可能会因数 darksrc=invert 的 CSS 配置影响
    svg.css(s_Filter, s_None);
    // 再针对进行微调
    if (fill === s_Text)
        svg.find("path, rect, ellipse, polygon").css(s_Fill, svg.parent().css(s_Color));
    else
        svg.find("path, rect, ellipse, polygon").css(s_Fill, "var(--ac-" + fill + "-lg)");
}

// ==================== 插图导航模块 ==================== //

function FigureNav() {
    let T = this;
    T.ui = $(".v-fig-nav"); // 插图导航主界面
    T.btns = {
        ui : $(".v-fig-nav-btns"), // 所有导航按钮
        prev : $(".v-fig-nav-btns.prev"), // 上一张插图按钮
        next : $(".v-fig-nav-btns.next"), // 下一张插图按钮
        close : $(".v-btn-close-figure-nav"), // 关闭按钮
    };
    T.content = $(".v-fig-content"); // 显示插图内容的控件
    T.figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

    V_ui_addAnimate(T.content.children("img, svg"));

    // 绑定各按钮事件
    T.btns.prev.unbind(s_Click).click(function () {
        T.prev();
    });
    T.btns.next.unbind(s_Click).click(function () {
        T.next();
    });
    T.btns.close.unbind(s_Click).click(function () {
        T.hide();
    });
    T.content.unbind(s_Click).click(function () {
        T.hide();
    });

    /**
     * 插图导航导航按钮在不同终端的适配处理
     */
    T.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            T.btns.prev.unbind(s_Hover);
            T.btns.next.unbind(s_Hover);
        }
        // 非移动设备时绑定样式事件
        else {
            T.btns.ui.hover(function () {
                $(this).css(s_Transform, "translateY(-2px)");
            }, function () {
                $(this).css(s_Transform, s_None);
            });
            // 鼠标键按下事件，模拟 :active
            T.btns.ui.mousedown(function () {
                $(this).css(s_Transform, s_None);
            });
            // 鼠标键释放事件，模拟恢复正常
            T.btns.ui.mouseup(function () {
                $(this).css(s_Transform, "translateY(-2px)");
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
        T.figNum = parseInt(fig.attr(s_DataFigNum));

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
        T.content.css(s_Width, $(window).width())
            .css(s_Height, $(window).height());

        let newFig = fig.clone();
        newFig.css(s_MaxWidth, $(window).width() - 90)
            .css(s_MaxHeight, $(window).height() - 90)
            .css(s_BorderRadius, s_varRB);
        newFig.addClass("v-interactive");
        V_ui_hide(newFig);

        // 添加鼠标移入/移出事件
        V_ui_bindHover(newFig);

        // 添加鼠标点击事件
        newFig.unbind(s_Click).click(function () {
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

        pageNum.html("<span class='v-fig-page-num'>"
            + T.figNum + "/" + V_doc_counter_fig + "</span> "
            + $("#vk-id-fig" + T.figNum + " > .v-caption-1").text());

        // 更新导航按钮位置
        T.btns.prev.css(s_Top, (T.ui.height() - T.btns.prev.height()) / 2);
        T.btns.next.css(s_Top, T.btns.prev.css(s_Top))
            .css(s_Right, "10px");

        // 根据当前插图索引更新浏览按钮有效状态
        T.btns.prev.css(s_Opacity, "0");
        T.btns.next.css(s_Opacity, "0");
        if (T.figNum > 1) {
            T.btns.prev.css(s_Opacity, "1");
        }
        if (T.figNum < V_doc_counter_fig) {
            T.btns.next.css(s_Opacity, "1");
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

function Restyler() {}

/**
 * 调整任务列表复选框的样式
 */
Restyler.forTaskList = function () {
    // 遍历所有正文下的无序列表
    $("#write > ul").each(function () {
        // 遍历所有含 checkbox 组件的无序列表项
        $(this).find(".md-task-list-item input[type='checkbox']").each(function () {
            let li = $(this).parent();
            // 遍历其下级无序列表
            li.children("ul").each(function () {
                let chkCount = 0,
                    notDone = gFalse;
                // 遍历下级无序列表的所有一级子元素内 checkbox 的 checked 状态
                $(this).children("li").each(function () {
                    // 只对有两个或以上的 checkbox 子元素，因为只有 1 个 checkbox 是无法判断是否为不确定选择
                    if (chkCount > 0 && $(this).find("input").attr(s_Checked) === gUndefined) {
                        notDone = gTrue;
                        return gFalse;
                    }
                    chkCount++;
                });
                // 若下级无序列表的一级子元素中，有任意一个 checkbox 为未完成的，则视为不确定选择
                if (notDone === gTrue)
                    li.children("input")[0].indeterminate = gTrue;
            });
        });
    });

    // 对任务列表的 checkbox 组件转换为 SVG 图标
    $("#write input[type='checkbox']").each(function () {
        let chkStatus = "uncheck", // 默认为未完成
            chkStyle = s_Dark; // 默认样式

        // 已完成
        let _t =  $(this),
            checked = _t.attr(s_Checked);
        if (checked !== gUndefined && checked.startsWith("c")) { // checked
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
Restyler.forMermaid = function () {
    // 修正顺序图整体的样式
    $(".md-diagram-panel svg[id^='mermaidChart'][viewBox^='-']").each(function () {
        let target = $(this),
            viewBox = target.attr(s_ViewBox).split(/\s+/),
            paddingBottom = (target.css(s_PaddingBottom));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.attr(s_ViewBox,
            viewBox[0] + " " + viewBox[1] + " " + viewBox[2] + " "
            + (parseInt(viewBox[3]) + parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        target.addClass("v-mermaid-restyler");
    });

    // 更新顺序图中的角色样式
    $(".md-diagram-panel svg[id^='mermaidChart'] > g > rect[class='actor']").each(function () {
        let actor = $(this),
            text = actor.next(s_Text).children(), // actor text object
            tmpText = text.text(),
            prefix = "";
        const person = /@.+/g, // 人物角色
            keySys = /^\*\*.+/g, // 重要系统角色
            extSys = /^--.+/g; // 外部系统角色

        // 统一调整角色的圆角
        // let radius = V_util_getVarVal(s_varRS__);
        // actor.attr({
        //     s_Rx : radius,
        //     s_Ry : radius
        // });

        // 更新 <人物角色> 样式
        if (person.test(tmpText) === gTrue) {
            let h = actor.height(),
                line = actor.prev(s_Line);
            actor.attr(s_Rx, (h - 20) / 2)
                .attr(s_Ry, (h - 20) / 2)
                .attr("y", parseInt(actor.attr("y")) + 10)
                .attr(s_Height, h - 20);
            line.attr("y1", parseInt(line.attr("y1")) + 10)
                .attr("y2", parseInt(line.attr("y2")) - 20);
            actor.prev(s_Line).addClass("v-actor-person");
            text.text(prefix + tmpText.substring(1, tmpText.length));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText) === gTrue) {
            actor.addClass("v-actor-key-sys");
            actor.prev(s_Line).addClass("v-actor-key-sys");
            actor.nextAll(s_Text).children().addClass("v-actor-key-sys");
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText) === gTrue) {
            // actor.css("stroke-dasharray", "5 2");
            actor.addClass("v-actor-ext-sys");
            // actor.prev(s_Line).addClass("v-actor-ext-sys");
            actor.nextAll(s_Text).children().addClass("v-actor-ext-sys");
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        else {
            text.text(prefix + tmpText);
        }
    });

    // 更新顺序图中消息序号的样式
    $(".md-diagram-panel svg[id^='mermaidChart'] > text.sequenceNumber").each(function () {
        // 移除文本宽度，避免不同字体大小时显示效果问题
        $(this).removeAttr(s_TextLength);
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    $(".md-diagram-panel polygon+.labelText").each(function () {
        let fragment = $(this),
            g = fragment.parent();

        // 默认的样式（par 片断）
        let bgColor = s_varMmOrange,
            borderColor = s_varMmOrange,
            titleColor = s_varMmOrange,
            labelText = s_varMmOrangeAlt;
        // 为 alt 片断设置样式
        if (fragment.text() === s_Alt) {
            bgColor = s_varMmRed;
            borderColor = s_varMmRed;
            titleColor = s_varMmRed;
            labelText = s_varMmRedAlt;
        }
        // 为 loop 片断设置样式
        else if (fragment.text() === s_Loop) {
            bgColor = s_varMmCyan;
            borderColor = s_varMmCyan;
            titleColor = s_varMmCyan;
            labelText = s_varMmCyanAlt;
        }

        // 为 alt、loop、par 片断应用样式设置
        if (fragment.text() !== "opt") {
            // 背景色
            g.find("polygon.labelBox").css(s_CssText, "fill: " + bgColor + " !important;");
            // 边框色
            g.find("line.loopLine").css(s_CssText, "stroke: " + borderColor + " !important;");
            // 片断类型名称颜色
            g.find("text.labelText").css(s_CssText, "fill:" + labelText + " !important;");
            g.find("text.labelText").css(s_CssText, "fill:" + labelText + " !important;");
            // 片断标题颜色
            g.find("text.loopText, text.loopText > tspan").css(s_CssText, "fill:" + titleColor + " !important;");
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (fragment.text() === s_Alt)
            fragment.text([
                "选择",
                // "選擇",
                "Alt.",
                // "Alt.", "Alt.", "Alt.", "Alt.", "代替", "대안"
            ][V_lang_id]);
        else if (fragment.text() === "opt")
            fragment.text([
                "可选",
                // "可選",
                "Opt.",
                // "Opt.", "Opt.", "Opt.", "Opt.", "ション", "매칭"
            ][V_lang_id]);
        else if (fragment.text() === s_Loop)
            fragment.text([
                "循环",
                // "循環",
                "Loop.",
                // "Loop.", "Loop.", "Loop.", "Loop.", "ループ", "루프"
            ][V_lang_id]);
        else if (fragment.text() === "par")
            fragment.text([
                "平行",
                // "平行",
                "Par.",
                // "Par.", "Par.", "Par.", "Par.", "平行", "평행"
            ][V_lang_id]);
    });

    // 调整片断的标题文本
    $("svg text.loopText > tspan").each(function () {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(this);
        fragmentTitle.parent().attr(s_Style, "text-anchor: start");

        // 调整文本的位置
        let label = fragmentTitle.parent().parent().find(".labelBox"),
            rect = label[0].getBBox();
            // y = parseInt(fragmentTitle.parent().attr("y"));
        fragmentTitle.attr("x", rect.x + rect.width + 10);

        let nextText = fragmentTitle.parent().next();
        if (nextText !== gUndefined && nextText.attr(s_Class) !== gUndefined && nextText.attr(s_Class).iO("loopText") > -1) {
            nextText.attr("x", rect.x + rect.width + 40);
        }
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态机图节点
    let radius = V_util_getVarVal("--v-r-b");
    // $("#INIT ~ g > rect, g[id^=flowchart-INIT] ~ g > rect").each(function () {
    //     __processStatusNodes($(this));
    //     // $(this).attr(s_Rx, radius)
    //     //     .attr(s_Ry, radius);
    // });
    // $("g[id^=flowchart-INIT]").parent().find("rect").each(function () {
    //     $(this).addClass("v-status-node");
    //     // __processStatusNodes($(this), "v-status-node");
    //     // $(this).find("rect").attr(s_Rx, radius)
    //     //     .attr(s_Ry, radius).addClass("v-status-node");
    // });
    // 针对 VLOOK 顺序图开始、结束节点、子图
    // $("#START rect, #END rect, g[id^=flowchart-START] rect, g[id^=flowchart-END] rect, .cluster rect, rect[class=rect]").each(function () {
    $("svg .cluster rect").each(function () {
        // __processStatusNodes($(this));
        $(this).attr(s_Rx, radius)
            .attr(s_Ry, radius);
    });

    // // 处理状态图节点
    // function __processStatusNodes(target, style) {
    //     target.attr(s_Rx, radius)
    //         .attr(s_Ry, radius);
    //     if (style !== gUndefined)
    //         target.addClass(style);
    // }
}

// ==================== 第三方库修复工具类 ==================== //

function RepairTool() {}

// Mermaid 相关的 DPR
RepairTool.mermaidDPR = {
    builder : 1, // 生成 Mermaid 时系统的 DPR
    render : 1 // Mermaid 流程图显示的 DPR
}

/**
 * 按倍数调整函数元组数据，目前只支持单个函数，且只能有两个参数
 * @param funcString 函数字符串，如：translate(-12,-18)
 * @param rate1 对第1个参数的调整倍数
 * @param rate2 对第2个参数的调整倍数
 */
RepairTool.scaleTupleByTimes = function (funcString, rate1, rate2) {
    let lbIndex = funcString.iO("("),
        dotIndex = funcString.iO(","),
        rbIndex = funcString.iO(")");

    // 提取两个参数值
    let r1 = funcString.substring(lbIndex + 1, dotIndex),
        r2 = funcString.substring(dotIndex + 1, rbIndex);

    if (rate1 !== 1) r1 = r1 * rate1;
    if (rate2 !== 1) r2 = r2 * rate2;

    return funcString.substring(0, lbIndex + 1) +
        r1 + "," + r2 + ")";
}

// ==================== Code Magic 模块 ==================== //

function CodeMagic() {}

/**
 * 初始化
 */
CodeMagic.init = function () {
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
        rainbowCoat.defalutColor = dcCoat;

    // 遍历所有 code
    $("code").each(function () {
        let _t = $(this),
            codeText = _t.text(),
            stdCount = 0,
            result;

        // 徽章格式
        if ((result = codeText.match(RainbowBadge_syntax_color)) != null)
            RainbowBadge.build(_t, result);
        // 彩虹单标签格式
        else if ((result = codeText.match(RainbowTag_syntax)) != null)
            RainbowTag.build(_t, result);
        // 文字注音格式
        else if ((result = codeText.match(TextPhonetic_syntax)) != null)
            TextPhonetic.build(_t, result);
        // 刮刮卡格式
        else if ((result = codeText.match(RainbowCoat_syntax)) != null)
            RainbowCoat.build(_t, result);
        // 彩虹引用
        else if ((result = codeText.match(RainbowQuote_syntax)) != null)
            RainbowQuote.build(_t, result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else {
            stdCount++;
            _t.addClass("v-std-code" + " id-" + stdCount);
            _t.unbind(s_Click).click(function () {
                let content = _t.text();
                if (V_util_holdAltKey() === gTrue)
                    content = "`" + content + "`";
                Copyer.action(_t, content, gTrue);
            });
        }
    });
}

// ==================== Code Magic：彩虹单标签模块 ==================== //

function RainbowTag() {}

// 语法：#tag#(color)
let RainbowTag_syntax = /^#(.+)#(\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|magenta|pink|gold|brown|gray|black|theme1|theme2)\))?$/i,
    RainbowTag_count = 0,
    RainbowTag_defalutColor = "theme1";

/**
 * 构建单标签样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowTag.build = function (target, result) {
    let tag = result[1],
        color = RainbowTag.getColor(result[3]);

    RainbowTag_count++;

    // 过滤语法内容
    target.text(tag);
    target.attr(s_Class, "v-tag " + color + " id-" + RainbowTag_count);
    // 复制内容
    target.unbind(s_Click).click(function () {
        let _t = $(this),
            content = _t.text();
        if (V_util_holdAltKey() === gTrue)
            content = __asMarkdown(content);
        Copyer.action(_t, content, gTrue);
    });

    /**
     * 生成标签的 Markdown 格式
     * @param value 标签内容
     */
    function __asMarkdown(value) {
        let content = "#" + value + "#";
        if (color !== RainbowTag.defalutStyle)
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
RainbowTag.getColor = function (color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowTag_defalutColor;
    return color;
}

// ==================== Code Magic：徽章模块 ==================== //

function RainbowBadge() {}

// 语法：#badge_name|badge_value#(color{{variable}})
let RainbowBadge_syntax_color = /^#(.+)\|(.+)#(\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|magenta|pink|gold|brown|gray|black|theme1|theme2)(!)?\))?$/i, // 颜色
    RainbowBadge_syntax_variable = /^(.*)({{.+}}|%.+%|\${.+})(.*)$/i, // 变量语法
    RainbowBadge_defalutColor = "gray",
    RainbowBadge_count = 0;

/**
 * 构建徽章样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowBadge.build = function (target, result) {
    let color = RainbowBadge.getColor(result[4], target), // 颜色标识
        em = result[5], // 强调样式的标识
        badgeName = result[1],
        badgeValue = result[2],
        varStr;

    RainbowBadge_count++;

    // ----- 徽章标题
    target.wrap("<code class='v-badge-name " + color + " id-" + RainbowBadge_count + "'>" + badgeName + "</code>");
    // 复制徽章标题内容
    $(".v-badge-name." + color + ".id-" + RainbowBadge_count).unbind(s_Click).click(function () {
        if (Copyer_processing === gTrue)
            return;

        // $(this)[0].childNodes[0].nodeValue
        let content = badgeName,
            _t = $(this);
        if (V_util_holdAltKey() === gTrue)
            content = __asMarkdown(_t.children().text());
        Copyer.action(_t, content, gTrue);
    });

    // ----- 徽章内容
    target.addClass("v-badge-value id-" + RainbowBadge_count);
    // 处理含变量的情况
    if ((varStr = badgeValue.match(RainbowBadge_syntax_variable)) != null)
        badgeValue = badgeValue.replace(varStr[2], "<span class='var " + color + "'>" + varStr[2] + "</span>");
    target.html(badgeValue);
    // 指定的颜色标识带强调样式
    if (em !== gUndefined)
        target.addClass(color);
    // 复制徽章内容内容
    target.unbind(s_Click).click(function () {
        if (Copyer_processing === gTrue)
            return;

        let _t = $(this),
            content = _t.text();
        if (V_util_holdAltKey() === gTrue)
            content = __asMarkdown(_t.text());
        Copyer.action(_t, content, gTrue);
    });

    /**
     * 生成徽章的 Markdown 格式
     * @param value 徽章内容
     */
    function __asMarkdown(value) {
        let content = "#" + badgeName + "|" + value + "#";
        if (color !== RainbowBadge.defalutStyle)
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
RainbowBadge.getColor = function (color, target) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined) {
        // 若父级元素是 h6 (封面)，则默认使用颜色 theme2
        if (target.parent().prop(s_TagName).toLowerCase() === "h6")
            return "theme2";
        return RainbowBadge_defalutColor;
    }
    return color;
}

// ==================== Code Magic：彩虹引用模块 ==================== //

function RainbowQuote() {}

// 语法：>(color)
let RainbowQuote_syntax = /^>\((red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|magenta|pink|gold|brown|gray|theme1|theme2)(!)?\)$/i,
    RainbowQuote_defalutColor = "theme1!";

/**
 * 构建彩虹引用样式
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowQuote.build = function (target, result) {
    let quote = target.parent().parent(),
        color = RainbowQuote.getColor(result[1]), // 颜色标识
        em = (result[2] !== gUndefined) ? " em" : " "; // 判断是否指定了强调样式
    if (quote.prop(s_TagName).toLowerCase().startsWith("bl")) { // <blockquote>
        target.parent().remove();
        quote.addClass("v-q " + color + em);
        quote.children("h6").addClass("title-" + color + em);
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
RainbowQuote.getColor = function (color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowQuote_defalutColor;
    return color;
}

// ==================== Code Magic：刮刮卡模块 ==================== //

function RainbowCoat() {}

// 语法：*{tips}(text "color")
let RainbowCoat_syntax = /^\*{(.*)}\(([^"]+)(\s"(red|orange|yellow|lime|green|aqua|cyan|blue|sea|steel|purple|magenta|pink|gold|brown|gray|theme1|theme2)")?\)$/,
    RainbowCoat_defalutColor = "gray";

/**
 * 构建「刮刮卡」
 * @param target 源对象
 * @param result 语法通过正则解析后的结果数组
 */
RainbowCoat.build = function (target, result) {
    let tips = " **** ",
        text = result[2],
        color = "var(--ac-" + RainbowCoat.getColor(result[4]) + "-lg)";

    // 自定义提示信息
    if (result[1] !== gUndefined && result[1] !== "")
        tips = result[1];

    // 初始化「刮刮卡」数据
    target.addClass("v-rb-coat");
    target.attr(s_DataRbCoatData, text);
    target.attr(s_DataRbCoatShowed, s_False);
    target.attr(s_Title, [
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
    target.text(tips);
    target.css(s_Background, __generateBg(tips.length, color))
        .css(s_BorderColor, color);

    // 「刮刮卡」的点击事件
    target.unbind(s_Click).click(function () {
        RainbowCoat.toggle($(this));
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
 RainbowCoat.getColor = function (color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return RainbowCoat_defalutColor;
    return color;
}

/**
 * 显示 / 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
RainbowCoat.toggle = function (target) {
    event.stopPropagation(); // 停止事件冒泡

    if (target.attr(s_DataRbCoatShowed).startsWith("f"))
        RainbowCoat.show(target);
    else
        RainbowCoat.hide(target);
}

/**
 * 显示「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
RainbowCoat.show = function (target) {
    let tmp = target.text();
    target.addClass("opened");
    target.css(s_Color, target.css(s_BorderColor));
    // 显示原始信息
    target.text(target.attr(s_DataRbCoatData));
    // 「刮刮卡」自定义数据
    target.attr(s_DataRbCoatData, tmp);
    target.attr(s_DataRbCoatShowed, s_True)
}

/**
 * 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
RainbowCoat.hide = function (target) {
    let tmp = target.text();
    target.removeClass("opened");
    target.css(s_Color, s_varDBc);
    // 显示提示信息
    target.text(target.attr(s_DataRbCoatData));
    // 「刮刮卡」自定义数据
    target.attr(s_DataRbCoatData, tmp);
    target.attr(s_DataRbCoatShowed, s_False);
}

// ==================== Code Magic：文本注音模块 ==================== //

function TextPhonetic() {}

// 语法：{text}(symbol)
let TextPhonetic_syntax = /^{(.+)}\((.+)\)$/i;

/**
 * 构建「注音」
 * @param target 源对象
 * @param result 语法通过正则解析后的结果数组
 */
TextPhonetic.build = function (target, result) {
    let text = result[1],
        symbol = result[2];
    target.after("<ruby>" + text
        + "<rp>(</rp><rt onclick='TextPhonetic.translation(\"" + text + "\", \"" + symbol + "\")'>"
        + symbol + "</rt><rp>)&nbsp;</rp></ruby>");
    target.remove();
}

/**
 * 释义或翻译
 * @param text 被注音的内容
 * @param symbol 注音
 */
TextPhonetic.translation = function (text, symbol) {
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

// function VLOOKui() {}

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
            + (author !== gUndefined ? "<div class='v-author'>" + author + "</div>" : "") + s_Br + s_Br,
        metaContent = V_util_getMetaByName("vlook-welcome");

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === gUndefined)
        metaContent = defalutContent;
    // --------------------------------------------------
    // 欢迎页
    ui += '<div class="v-welcome-page">'
            // 文档专属图标
            + '<div class="v-doc-logo-light"></div><div class="v-doc-logo-dark"></div>'
            // 欢迎信息
            + '<div class="v-tips">'
                + metaContent.trim()
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
    // SVG 图标集：图标|VLOOK LOGO for Light Mode
    ui += '<symbol id="icoVLOOK-light">'
        + '<path d="M17.1496192,2.76763582e-16 C19.5316459,-1.60807611e-16 20.3954263,0.24801843 21.2662596,0.713745193 C22.1370929,1.17947196 22.820528,1.86290705 23.2862548,2.73374039 C23.7519816,3.60457372 24,4.46835414 24,6.85038077 L24,17.1496192 C24,19.5316459 23.7519816,20.3954263 23.2862548,21.2662596 C22.820528,22.1370929 22.1370929,22.820528 21.2662596,23.2862548 C20.3954263,23.7519816 19.5316459,24 17.1496192,24 L6.85038077,24 C4.46835414,24 3.60457372,23.7519816 2.73374039,23.2862548 C1.86290705,22.820528 1.17947196,22.1370929 0.713745193,21.2662596 C0.24801843,20.3954263 1.07205074e-16,19.5316459 -1.84509055e-16,17.1496192 L1.84509055e-16,6.85038077 C-1.07205074e-16,4.46835414 0.24801843,3.60457372 0.713745193,2.73374039 C1.17947196,1.86290705 1.86290705,1.17947196 2.73374039,0.713745193 C3.60457372,0.24801843 4.46835414,1.60807611e-16 6.85038077,-2.76763582e-16 L17.1496192,2.76763582e-16 Z M12.2146664,16.9756299 C12.1180865,16.895267 11.9779135,16.895267 11.8813336,16.9756299 L11.8813336,16.9756299 L10.9253862,17.7710616 C10.8229145,17.856327 10.8013222,18.0051829 10.875344,18.1160496 L10.875344,18.1160496 L11.8312914,19.5478266 C11.8503268,19.576337 11.8748008,19.600811 11.9033112,19.6198464 C12.0229961,19.6997558 12.1847992,19.6675114 12.2647086,19.5478266 L12.2647086,19.5478266 L13.220656,18.1160496 C13.2946778,18.0051829 13.2730855,17.856327 13.1706138,17.7710616 L13.1706138,17.7710616 Z M7.27085714,9.29167619 C4.87236337,9.29167619 2.928,11.2331323 2.928,13.6280398 C2.928,16.0229473 4.87236337,17.9644035 7.27085714,17.9644035 C9.66935091,17.9644035 11.6137143,16.0229473 11.6137143,13.6280398 C11.6137143,11.2331323 9.66935091,9.29167619 7.27085714,9.29167619 Z M16.8251429,9.29167619 C14.4266491,9.29167619 12.4822857,11.2331323 12.4822857,13.6280398 C12.4822857,16.0229473 14.4266491,17.9644035 16.8251429,17.9644035 C19.2236366,17.9644035 21.168,16.0229473 21.168,13.6280398 C21.168,11.2331323 19.2236366,9.29167619 16.8251429,9.29167619 Z M7.27085714,10.5925853 C8.94980278,10.5925853 10.3108571,11.9516046 10.3108571,13.6280398 C10.3108571,15.3044751 8.94980278,16.6634944 7.27085714,16.6634944 C5.5919115,16.6634944 4.23085714,15.3044751 4.23085714,13.6280398 C4.23085714,11.9516046 5.5919115,10.5925853 7.27085714,10.5925853 Z M16.8251429,10.5925853 C18.5040885,10.5925853 19.8651429,11.9516046 19.8651429,13.6280398 C19.8651429,15.3044751 18.5040885,16.6634944 16.8251429,16.6634944 C15.1461972,16.6634944 13.7851429,15.3044751 13.7851429,13.6280398 C13.7851429,11.9516046 15.1461972,10.5925853 16.8251429,10.5925853 Z M19.7076586,5.41807306 C19.5576382,5.09691923 19.1785253,4.95542019 18.8553524,5.09721484 L18.8553524,5.09721484 L18.84192,5.10328717 L12.047,7.93263636 L5.25388278,5.10328717 L5.24045038,5.09721484 C4.91727744,4.95542019 4.53816455,5.09691923 4.38814418,5.41807306 C4.2360402,5.74368736 4.37695721,6.13068784 4.70306552,6.28244085 L4.70306552,6.28244085 L11.738187,9.21340744 L11.7516194,9.21947977 C11.8488977,9.26216139 11.9512445,9.2791746 12.0508883,9.27366779 C12.1486432,9.27848497 12.2488474,9.26130919 12.3441834,9.21947977 L12.3441834,9.21947977 L12.3576158,9.21340744 L19.3927372,6.28244085 L19.4770033,6.23544395 C19.7420451,6.06083144 19.8459349,5.71408606 19.7076586,5.41807306 Z" fill="#303438"></path>'
        + '</symbol>'
        // SVG 图标集：图标|VLOOK LOGO for Dark Mode
        + '<symbol id="icoVLOOK-dark">'
        + '<path d="M17.1496192,-1.49959326e-15 C19.5316459,-1.93716445e-15 20.3954263,0.24801843 21.2662596,0.713745193 C22.1370929,1.17947196 22.820528,1.86290705 23.2862548,2.73374039 C23.7519816,3.60457372 24,4.46835414 24,6.85038077 L24,17.1496192 C24,19.5316459 23.7519816,20.3954263 23.2862548,21.2662596 C22.820528,22.1370929 22.1370929,22.820528 21.2662596,23.2862548 C20.3954263,23.7519816 19.5316459,24 17.1496192,24 L6.85038077,24 C4.46835414,24 3.60457372,23.7519816 2.73374039,23.2862548 C1.86290705,22.820528 1.17947196,22.1370929 0.713745193,21.2662596 C0.24801843,20.3954263 1.07205074e-16,19.5316459 -1.84509055e-16,17.1496192 L1.84509055e-16,6.85038077 C-1.07205074e-16,4.46835414 0.24801843,3.60457372 0.713745193,2.73374039 C1.17947196,1.86290705 1.86290705,1.17947196 2.73374039,0.713745193 C3.60457372,0.24801843 4.46835414,-1.61554923e-15 6.85038077,-2.05312042e-15 L17.1496192,-1.49959326e-15 Z M12.1666664,16.9756299 C12.0700865,16.895267 11.9299135,16.895267 11.8333336,16.9756299 L11.8333336,16.9756299 L10.8773862,17.7710616 C10.7749145,17.856327 10.7533222,18.0051829 10.827344,18.1160496 L10.827344,18.1160496 L11.7832914,19.5478266 C11.8023268,19.576337 11.8268008,19.600811 11.8553112,19.6198464 C11.9749961,19.6997558 12.1367992,19.6675114 12.2167086,19.5478266 L12.2167086,19.5478266 L13.172656,18.1160496 C13.2466778,18.0051829 13.2250855,17.856327 13.1226138,17.7710616 L13.1226138,17.7710616 Z M7.22285714,9.29167619 C4.82436337,9.29167619 2.88,11.2331323 2.88,13.6280398 C2.88,16.0229473 4.82436337,17.9644035 7.22285714,17.9644035 C9.62135091,17.9644035 11.5657143,16.0229473 11.5657143,13.6280398 C11.5657143,11.2331323 9.62135091,9.29167619 7.22285714,9.29167619 Z M16.7771429,9.29167619 C14.3786491,9.29167619 12.4342857,11.2331323 12.4342857,13.6280398 C12.4342857,16.0229473 14.3786491,17.9644035 16.7771429,17.9644035 C19.1756366,17.9644035 21.12,16.0229473 21.12,13.6280398 C21.12,11.2331323 19.1756366,9.29167619 16.7771429,9.29167619 Z M7.22285714,10.5925853 C8.90180278,10.5925853 10.2628571,11.9516046 10.2628571,13.6280398 C10.2628571,15.3044751 8.90180278,16.6634944 7.22285714,16.6634944 C5.5439115,16.6634944 4.18285714,15.3044751 4.18285714,13.6280398 C4.18285714,11.9516046 5.5439115,10.5925853 7.22285714,10.5925853 Z M16.7771429,10.5925853 C18.4560885,10.5925853 19.8171429,11.9516046 19.8171429,13.6280398 C19.8171429,15.3044751 18.4560885,16.6634944 16.7771429,16.6634944 C15.0981972,16.6634944 13.7371429,15.3044751 13.7371429,13.6280398 C13.7371429,11.9516046 15.0981972,10.5925853 16.7771429,10.5925853 Z M19.6596586,5.41807306 C19.5096382,5.09691923 19.1305253,4.95542019 18.8073524,5.09721484 L18.8073524,5.09721484 L18.79392,5.10328717 L11.999,7.93263636 L5.20588278,5.10328717 L5.19245038,5.09721484 C4.86927744,4.95542019 4.49016455,5.09691923 4.34014418,5.41807306 C4.1880402,5.74368736 4.32895721,6.13068784 4.65506552,6.28244085 L4.65506552,6.28244085 L11.690187,9.21340744 L11.7036194,9.21947977 C11.8008977,9.26216139 11.9032445,9.2791746 12.0028883,9.27366779 C12.1006432,9.27848497 12.2008474,9.26130919 12.2961834,9.21947977 L12.2961834,9.21947977 L12.3096158,9.21340744 L19.3447372,6.28244085 L19.4290033,6.23544395 C19.6940451,6.06083144 19.7979349,5.71408606 19.6596586,5.41807306 Z" fill="#FFFFFF"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心
        + '<symbol id="icoNavCenter">'
        + '<path d="M10,0 C4.48214286,0 0,4.48214286 0,10 C0,15.5178571 4.48214286,20 10,20 C15.5178571,20 20,15.5178571 20,10 C20,4.48214286 15.5178571,0 10,0 Z M15.7142857,4.28571429 C15.5535714,4.44642857 12.25,12.2321429 12.25,12.2321429 C12.25,12.2321429 4.46428571,15.5357143 4.30357143,15.6964286 C4.21428571,15.6964286 7.78571429,7.75 7.78571429,7.75 C7.78571429,7.75 15.875,4.125 15.7142857,4.28571429 Z M7.19642857,12.8214286 C7.5,12.1607143 8.44642857,9.75 8.76785714,9.01785714 L10.8928571,11.125 C10.3035714,11.3928571 7.32142857,12.7678571 7.19642857,12.8214286 Z" transform="translate(10.000000, 10.000000) scale(-1, 1) translate(-10.000000, -10.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|封面
        + '<symbol id="icoCover">'
        + '<path d="M3.57422129,13.6887758 C3.57422129,13.232197 3.23103845,12.8611754 2.80785961,12.8611754 L0.765561722,12.8611754 C0.343182841,12.8611754 9.9475983e-14,13.2313744 9.9475983e-14,13.6887758 C9.9475983e-14,14.1453545 0.343982801,14.5163762 0.765561722,14.5163762 L2.80785961,14.5163762 C3.23183841,14.5163762 3.57422129,14.1453545 3.57422129,13.6887758 Z M9.99200722e-14,8.99958867 C9.99200722e-14,9.45699008 0.343982801,9.82636639 0.765561722,9.82636639 L2.80785961,9.82636639 C3.23183841,9.82636639 3.57422129,9.45616741 3.57422129,8.99958867 C3.57422129,8.54218726 3.23103845,8.17116561 2.80785961,8.17116561 L0.765561722,8.17116561 C0.343982801,8.17116561 9.99200722e-14,8.54136459 9.99200722e-14,8.99958867 Z M0.765561722,5.13717929 L2.80785961,5.13717929 C3.23183841,5.13717929 3.57422129,4.76698031 3.57422129,4.3095789 C3.57422129,3.85217749 3.23183841,3.48280117 2.80785961,3.48280117 L0.765561722,3.48280117 C0.343182841,3.48280117 9.9475983e-14,3.85300015 9.9475983e-14,4.3095789 C9.9475983e-14,4.76615764 0.343182841,5.13800195 0.765561722,5.13800195 L0.765561722,5.13717929 Z M11,7.15935132 L12.5332144,6.00037568 C12.7997224,5.78999436 13.2669046,5.78999436 13.6000397,6.00037568 L13.6000397,6.00037568 L15,7.15872519 L15,0.000626134869 L16,0 C17.1045695,7.78148667e-16 18,0.8954305 18,2 L18,16 C18,17.1045695 17.1045695,18 16,18 L3.75,18 C2.6454305,18 1.75,17.1045695 1.75,16 L1.749,15.516 L2.80785961,15.5163762 C3.30441272,15.5163762 3.75727314,15.3058129 4.08347347,14.9535464 C4.38331192,14.6297484 4.57422129,14.1839226 4.57422129,13.6887758 C4.57422129,13.1938235 4.38323306,12.7480421 4.08336979,12.4242172 C3.79314057,12.1107963 3.40281186,11.9096956 2.97143481,11.8688759 L2.80785961,11.8611754 L1.749,11.861 L1.749,10.826 L2.80785961,10.8263664 C3.3044231,10.8263664 3.75714238,10.6160051 4.08323992,10.2641997 C4.38317726,9.94061687 4.57422129,9.4950166 4.57422129,8.99958867 C4.57422129,8.50422578 4.38328776,8.05851591 4.08379013,7.73476442 C3.79349633,7.4209621 3.40303333,7.21971793 2.97149603,7.17887111 L2.80785961,7.17116561 L1.749,7.171 L1.749,6.137 L2.80785961,6.13718726 C3.30461065,6.13718726 3.75749045,5.92668971 4.08366066,5.57445578 C4.38323199,5.25094619 4.57422129,4.8054174 4.57422129,4.3095789 C4.57422129,3.81345899 4.38309701,3.36815569 4.08342707,3.0448613 C3.79358939,2.7321743 3.4036658,2.53127841 2.97170291,2.49049521 L2.80785961,2.48280117 L1.749,2.482 L1.75,2 C1.75,0.8954305 2.6454305,2.02906125e-16 3.75,0 L11,0 L11,7.15935132 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|目录索引
        + '<symbol id="icoTocTabCatalog">'
        + '<rect fill-opacity="0" x="1.30739863e-12" y="0" width="16" height="16"></rect><path d="M13.5,1 C14.8807119,1 16,2.11928813 16,3.5 L16,12.5 C16,13.8807119 14.8807119,15 13.5,15 L2.5,15 C1.11928813,15 1.30756772e-12,13.8807119 1.30739863e-12,12.5 L1.30739863e-12,3.5 C1.30722955e-12,2.11928813 1.11928813,1 2.5,1 L13.5,1 Z M13.5,2 L2.5,2 C1.67157288,2 1,2.67157288 1,3.5 L1,3.5 L1,12.5 C1,13.3284271 1.67157288,14 2.5,14 L2.5,14 L13.5,14 C14.3284271,14 15,13.3284271 15,12.5 L15,12.5 L15,3.5 C15,2.67157288 14.3284271,2 13.5,2 L13.5,2 Z M6,3.5 L13,3.5 C13.5522847,3.5 14,3.94771525 14,4.5 C14,5.05228475 13.5522847,5.5 13,5.5 L6,5.5 C5.44771525,5.5 5,5.05228475 5,4.5 C5,3.94771525 5.44771525,3.5 6,3.5 Z M3,3.5 C3.55228475,3.5 4,3.94771525 4,4.5 C4,5.05228475 3.55228475,5.5 3,5.5 C2.44771525,5.5 2,5.05228475 2,4.5 C2,3.94771525 2.44771525,3.5 3,3.5 Z M9,7 L13,7 C13.5522847,7 14,7.44771525 14,8 C14,8.55228475 13.5522847,9 13,9 L9,9 C8.44771525,9 8,8.55228475 8,8 C8,7.44771525 8.44771525,7 9,7 Z M6,7 C6.55228475,7 7,7.44771525 7,8 C7,8.55228475 6.55228475,9 6,9 C5.44771525,9 5,8.55228475 5,8 C5,7.44771525 5.44771525,7 6,7 Z M9,10.5 L13,10.5 C13.5522847,10.5 14,10.9477153 14,11.5 C14,12.0522847 13.5522847,12.5 13,12.5 L9,12.5 C8.44771525,12.5 8,12.0522847 8,11.5 C8,10.9477153 8.44771525,10.5 9,10.5 Z M6,10.5 C6.55228475,10.5 7,10.9477153 7,11.5 C7,12.0522847 6.55228475,12.5 6,12.5 C5.44771525,12.5 5,12.0522847 5,11.5 C5,10.9477153 5.44771525,10.5 6,10.5 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabCatalog-checked">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.5,1 C14.8807119,1 16,2.11928813 16,3.5 L16,12.5 C16,13.8807119 14.8807119,15 13.5,15 L2.5,15 C1.11928813,15 1.69088438e-16,13.8807119 0,12.5 L0,3.5 C-1.69088438e-16,2.11928813 1.11928813,1 2.5,1 L13.5,1 Z M13,10.5 L9,10.5 C8.44771525,10.5 8,10.9477153 8,11.5 C8,12.0522847 8.44771525,12.5 9,12.5 L9,12.5 L13,12.5 C13.5522847,12.5 14,12.0522847 14,11.5 C14,10.9477153 13.5522847,10.5 13,10.5 L13,10.5 Z M6,10.5 C5.44771525,10.5 5,10.9477153 5,11.5 C5,12.0522847 5.44771525,12.5 6,12.5 C6.55228475,12.5 7,12.0522847 7,11.5 C7,10.9477153 6.55228475,10.5 6,10.5 Z M13,7 L9,7 C8.44771525,7 8,7.44771525 8,8 C8,8.55228475 8.44771525,9 9,9 L9,9 L13,9 C13.5522847,9 14,8.55228475 14,8 C14,7.44771525 13.5522847,7 13,7 L13,7 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 C6.55228475,9 7,8.55228475 7,8 C7,7.44771525 6.55228475,7 6,7 Z M13,3.5 L6,3.5 C5.44771525,3.5 5,3.94771525 5,4.5 C5,5.05228475 5.44771525,5.5 6,5.5 L6,5.5 L13,5.5 C13.5522847,5.5 14,5.05228475 14,4.5 C14,3.94771525 13.5522847,3.5 13,3.5 L13,3.5 Z M3,3.5 C2.44771525,3.5 2,3.94771525 2,4.5 C2,5.05228475 2.44771525,5.5 3,5.5 C3.55228475,5.5 4,5.05228475 4,4.5 C4,3.94771525 3.55228475,3.5 3,3.5 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|插图索引
        + '<symbol id="icoTocTabFigure">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.5,1 C14.8807119,1 16,2.11928813 16,3.5 L16,12.5 C16,13.8807119 14.8807119,15 13.5,15 L2.5,15 C1.11928813,15 1.69088438e-16,13.8807119 0,12.5 L0,3.5 C-1.69088438e-16,2.11928813 1.11928813,1 2.5,1 L13.5,1 Z M13.5,2 L2.5,2 C1.67157288,2 1,2.67157288 1,3.5 L1,3.5 L1,12.5 C1,13.3284271 1.67157288,14 2.5,14 L2.5,14 L13.5,14 C14.3284271,14 15,13.3284271 15,12.5 L15,12.5 L15,3.5 C15,2.67157288 14.3284271,2 13.5,2 L13.5,2 Z M5.8225503,7.72018987 C5.93390796,7.78471541 6.03176293,7.8701303 6.11074482,7.9717469 L7.9320726,10.3150324 C8.25259425,10.7274095 8.83648624,10.8236668 9.27241436,10.535994 L10.838902,9.50225523 C11.2701177,9.21769223 11.8471129,9.30845987 12.170134,9.71167255 L13.3584006,11.1949323 C13.6346433,11.5397536 13.5790493,12.0432255 13.234228,12.3194683 C13.0923089,12.4331622 12.9158905,12.495114 12.7340463,12.495114 L3.28815434,12.495114 C2.84632654,12.495114 2.48815434,12.1369418 2.48815434,11.695114 C2.48815434,11.554259 2.52534365,11.4159008 2.59596244,11.2940275 L4.45595231,8.08407163 C4.73284475,7.60621285 5.34469151,7.44329743 5.8225503,7.72018987 Z M10,4 C11.1045695,4 12,4.8954305 12,6 C12,7.1045695 11.1045695,8 10,8 C8.8954305,8 8,7.1045695 8,6 C8,4.8954305 8.8954305,4 10,4 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabFigure-checked">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.5,1 C14.8807119,1 16,2.11928813 16,3.5 L16,12.5 C16,13.8807119 14.8807119,15 13.5,15 L2.5,15 C1.11928813,15 1.69088438e-16,13.8807119 0,12.5 L0,3.5 C-1.69088438e-16,2.11928813 1.11928813,1 2.5,1 L13.5,1 Z M5.8225503,7.72018987 C5.34469151,7.44329743 4.73284475,7.60621285 4.45595231,8.08407163 L4.45595231,8.08407163 L2.59596244,11.2940275 C2.52534365,11.4159008 2.48815434,11.554259 2.48815434,11.695114 C2.48815434,12.1369418 2.84632654,12.495114 3.28815434,12.495114 L3.28815434,12.495114 L12.7340463,12.495114 C12.9158905,12.495114 13.0923089,12.4331622 13.234228,12.3194683 C13.5790493,12.0432255 13.6346433,11.5397536 13.3584006,11.1949323 L13.3584006,11.1949323 L12.170134,9.71167255 C11.8471129,9.30845987 11.2701177,9.21769223 10.838902,9.50225523 L10.838902,9.50225523 L9.27241436,10.535994 C8.83648624,10.8236668 8.25259425,10.7274095 7.9320726,10.3150324 L7.9320726,10.3150324 L6.11074482,7.9717469 C6.03176293,7.8701303 5.93390796,7.78471541 5.8225503,7.72018987 Z M10,4 C8.8954305,4 8,4.8954305 8,6 C8,7.1045695 8.8954305,8 10,8 C11.1045695,8 12,7.1045695 12,6 C12,4.8954305 11.1045695,4 10,4 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|表格索引
        + '<symbol id="icoTocTabTable">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.2856,1 L2.7144,1 C1.2161387,1.00132252 0.0017641647,2.21533915 0,3.71359999 L0,12.2848 C0.00132252119,13.7835031 1.21569733,14.9982358 2.7144,15 L13.2856,15 C14.7844854,14.9986761 15.9991178,13.7836857 16,12.2848 L16,3.71359999 C15.9986761,2.21515646 14.7840439,1.00088215 13.2856,1 Z M1.19999999,6.50813261 L7.49802003,6.50813261 L7.49802003,9.49366407 L1.19999999,9.49366407 L1.19999999,6.50813261 Z M2.7144,2.19999999 L7.49722004,2.19999999 L7.49722004,5.30813261 L1.19999999,5.30813261 L1.19999999,3.71359999 C1.19999999,2.87839998 1.87999998,2.19999999 2.7144,2.19999999 Z M7.49802003,10.6936641 L7.49802003,13.8 L2.7144,13.8 C1.87825613,13.7986775 1.20088095,13.1209445 1.19999999,12.2848 L1.19999999,10.6936641 L7.49802003,10.6936641 Z M14.8,10.6936641 L14.8,12.2848 C14.799119,13.1209445 14.1217439,13.7986775 13.2856,13.8 L8.49038695,13.8 L8.49038695,10.6936641 L14.8,10.6936641 Z M14.8,6.50813261 L14.8,9.49366407 L8.49038695,9.49366407 L8.49038695,6.50813261 L14.8,6.50813261 Z M13.2856,2.19999999 C14.1208,2.19999999 14.8,2.87839998 14.8,3.71359999 L14.8,5.30813261 L8.49038695,5.30813261 L8.49038695,2.19999999 L13.2856,2.19999999 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabTable-checked">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M7.5,11 L7.5,15 L2.7144,15 C1.21569733,14.9982358 0.00132252119,13.7835031 0,12.2848 L0,12.2848 L0,11 L7.5,11 Z M16,11 L16,12.2848 C15.9991178,13.7836857 14.7844854,14.9986761 13.2856,15 L13.2856,15 L8.5,15 L8.5,11 L16,11 Z M7.5,6.199 L7.5,9.8 L0,9.8 L0,6.2 L7.5,6.199 Z M16,6.2 L16,9.8 L8.5,9.8 L8.5,6.199 L16,6.2 Z M13.2856,1 C14.7840439,1.00088215 15.9986761,2.21515646 16,3.71359999 L16,3.71359999 L16,5 L8.5,4.999 L8.5,1 Z M7.5,4.999 L0,5 L0,3.71359999 C0.0017641647,2.21533915 1.2161387,1.00132252 2.7144,1 L2.7144,1 L7.5,1 L7.5,4.999 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|多媒体索引
        + '<symbol id="icoTocTabMedia">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M9.74826953,8.40006458 L7.08122616,10.4003875 C6.85972595,10.5653859 6.54781749,10.5201808 6.38056223,10.3009364 C6.31501625,10.2150468 6.28111315,10.108815 6.28111315,10.0003229 L6.28111315,5.99967711 C6.28111315,5.72392638 6.50487357,5.50016145 6.78061873,5.50016145 C6.88910863,5.50016145 6.99307812,5.53632548 7.08122616,5.59961253 L9.74826953,7.59993542 C9.96976974,7.76493381 10.0149739,8.07910881 9.8477186,8.3006135 C9.82059613,8.33677753 9.78669304,8.3706813 9.74826953,8.40006458 Z M2.00028253,1 L13.9997175,1 C15.1049583,1 16,1.89505974 16,3.00032289 L16,12.9996771 C16,14.1049403 15.1049583,15 13.9997175,15 L2.00028253,15 C0.895041673,15 0,14.1049403 0,12.9996771 L0,3.00032289 C0,1.89505974 0.897301879,1 2.00028253,1 Z M11.9994349,2.00129157 L4.00056505,2.00129157 L4.00056505,14.0009687 L11.9994349,14.0009687 L11.9994349,2.00129157 Z M1.00127137,5.00064579 L3.00155389,5.00064579 L3.00155389,2.00129157 L2.00254273,2.00129157 C1.45105241,2.00129157 1.00353157,2.44882144 1.00353157,3.00032289 L1.00353157,5.00064579 L1.00127137,5.00064579 Z M14.9987286,5.00064579 L14.9987286,3.00032289 C14.9987286,2.44882144 14.5512078,2.00129157 13.9997175,2.00129157 L13.0007063,2.00129157 L13.0007063,5.00064579 L14.9987286,5.00064579 L14.9987286,5.00064579 Z M1.00127137,10.9993542 L1.00127137,12.9996771 C1.00127137,13.5511786 1.4487922,13.9987084 2.00028253,13.9987084 L2.99929369,13.9987084 L2.99929369,10.9993542 L1.00127137,10.9993542 L1.00127137,10.9993542 Z M1.00127137,10.0003229 L3.00155389,10.0003229 L3.00155389,5.99967711 L1.00127137,5.99967711 L1.00127137,10.0003229 Z M14.9987286,10.9993542 L12.9984461,10.9993542 L12.9984461,13.9987084 L13.9974573,13.9987084 C14.5489476,13.9987084 14.9964684,13.5511786 14.9964684,12.9996771 L14.9964684,10.9993542 L14.9987286,10.9993542 Z M14.9987286,10.0003229 L14.9987286,5.99967711 L12.9984461,5.99967711 L12.9984461,10.0003229 L14.9987286,10.0003229 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabMedia-checked">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M3,11 L3,15 L2.00028253,15 C0.895041673,15 0,14.1049403 0,12.9996771 L0,11 L3,11 Z M13.9997175,1 C15.1049583,1 16,1.89505974 16,3.00032289 L16,5 L13,5 L13,1 L13.9997175,1 Z M13,11 L16,11 L16,12.9996771 C16,14.1049403 15.1049583,15 13.9997175,15 L13,15 L13,11 Z M6.78061873,5.50016145 C6.50487357,5.50016145 6.28111315,5.72392638 6.28111315,5.99967711 L6.28111315,5.99967711 L6.28111315,10.0003229 C6.28111315,10.108815 6.31501625,10.2150468 6.38056223,10.3009364 C6.54781749,10.5201808 6.85972595,10.5653859 7.08122616,10.4003875 L7.08122616,10.4003875 L9.74826953,8.40006458 C9.78669304,8.3706813 9.82059613,8.33677753 9.8477186,8.3006135 C10.0149739,8.07910881 9.96976974,7.76493381 9.74826953,7.59993542 L9.74826953,7.59993542 L7.08122616,5.59961253 C6.99307812,5.53632548 6.88910863,5.50016145 6.78061873,5.50016145 Z M13,6 L16,6 L16,10 L13,10 L13,6 Z M3,6 L3,10 L0,10 L0,6 L3,6 Z M3,1 L3,5 L0,5 L0,3.00032289 C0,1.89505974 0.897301879,1 2.00028253,1 L3,1 Z M12,15 L4,15 L4,1 L12,1 L12,15 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|代码块索引
        + '<symbol id="icoTocTabCodeblock">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.3333333,1 C14.8060927,1 16,2.19390733 16,3.66666667 L16,12.3333333 C16,13.8060927 14.8060927,15 13.3333333,15 L2.66666667,15 C1.19390733,15 0,13.8060927 0,12.3333333 L0,3.66666667 C0,2.19390733 1.19390733,1 2.66666667,1 L13.3333333,1 Z M13.4970588,2 L2.50294159,2 C1.77030428,1.99976668 1.05844823,2.67261789 1.00350047,3.40933106 L1,3.51521341 L1,12.4847871 C0.999768614,13.2235811 1.66736769,13.9410611 2.39794159,13.9964707 L2.50294159,14 L13.4970588,14 C14.2296961,14.0002339 14.9415522,13.3273827 14.9964999,12.5906695 L15,12.4847871 L15,3.51521341 C15.0002318,2.77641949 14.3326327,2.0589394 13.6020588,2.00352989 L13.4970588,2 Z M9.70105374,3.81728068 L9.68105374,3.89261402 L7.60075942,12.5353709 C7.49126034,12.8720553 7.13768575,13.0644257 6.79552353,12.9734779 C6.45336132,12.8825301 6.24196775,12.5399895 6.31409275,12.1933709 L6.33409275,12.1180375 L8.41438707,3.47528068 C8.4696935,3.30728519 8.58948957,3.16815178 8.74740655,3.08850561 C8.90532354,3.00885943 9.08841753,2.99522881 9.25638707,3.05061402 C9.57761506,3.15638829 9.76874959,3.48593058 9.70105374,3.81728068 Z M5.396,5.768 L5.34933333,5.838 L3.73933333,7.98466667 L5.35,10.1313333 C5.55203719,10.4003138 5.52201979,10.7776755 5.28,11.0113333 L5.21666667,11.0646667 C4.94813556,11.2666509 4.57125481,11.2372205 4.33733333,10.996 L4.28333333,10.932 L2.37266667,8.38533333 C2.21409416,8.17401976 2.19526731,7.88900223 2.32466667,7.65866667 L2.37266667,7.58533333 L4.28333333,5.03866667 C4.38941993,4.89721787 4.54735181,4.80370519 4.72238576,4.77870034 C4.89741972,4.75369549 5.07521787,4.79924674 5.21666667,4.90533333 C5.48539743,5.10617538 5.56224658,5.47613692 5.396,5.768 Z M11.6626667,4.97466667 L11.7173333,5.038 L13.6273333,7.58466667 L13.6753333,7.658 C13.7893578,7.86085249 13.7893578,8.10848085 13.6753333,8.31133333 L13.6273333,8.38466667 L11.7173333,10.9313333 L11.6626667,10.996 C11.450984,11.2144191 11.1183033,11.2618666 10.854,11.1113333 L10.784,11.0646667 L10.72,11.0113333 C10.5010274,10.7997113 10.4532845,10.4666086 10.604,10.202 L10.6506667,10.132 L12.2606667,7.98466667 L10.6506667,5.838 L10.604,5.768 C10.4378957,5.47597654 10.5150376,5.10598124 10.784,4.90466667 C11.05219,4.70302715 11.4290973,4.73303114 11.6626667,4.97466667 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabCodeblock-checked">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.3333333,1 C14.8060927,1 16,2.19390733 16,3.66666667 L16,12.3333333 C16,13.8060927 14.8060927,15 13.3333333,15 L2.66666667,15 C1.19390733,15 0,13.8060927 0,12.3333333 L0,3.66666667 C0,2.19390733 1.19390733,1 2.66666667,1 L13.3333333,1 Z M9.25638707,3.05061402 C9.08841753,2.99522881 8.90532354,3.00885943 8.74740655,3.08850561 C8.58948957,3.16815178 8.4696935,3.30728519 8.41438707,3.47528068 L8.41438707,3.47528068 L6.33409275,12.1180375 L6.31409275,12.1933709 C6.24196775,12.5399895 6.45336132,12.8825301 6.79552353,12.9734779 C7.13768575,13.0644257 7.49126034,12.8720553 7.60075942,12.5353709 L7.60075942,12.5353709 L9.68105374,3.89261402 L9.70105374,3.81728068 C9.76874959,3.48593058 9.57761506,3.15638829 9.25638707,3.05061402 Z M4.82742493,4.77208399 L4.72238576,4.77870034 C4.54735181,4.80370519 4.38941993,4.89721787 4.28333333,5.03866667 L4.28333333,5.03866667 L2.37266667,7.58533333 L2.32466667,7.65866667 C2.19526731,7.88900223 2.21409416,8.17401976 2.37266667,8.38533333 L2.37266667,8.38533333 L4.28333333,10.932 L4.33733333,10.996 C4.57125481,11.2372205 4.94813556,11.2666509 5.21666667,11.0646667 L5.21666667,11.0646667 L5.28,11.0113333 C5.52201979,10.7776755 5.55203719,10.4003138 5.35,10.1313333 L5.35,10.1313333 L3.73933333,7.98466667 L5.34933333,5.838 L5.396,5.768 C5.56224658,5.47613692 5.48539743,5.10617538 5.21666667,4.90533333 C5.07521787,4.79924674 4.89741972,4.75369549 4.72238576,4.77870034 Z M11.6626667,4.97466667 C11.4290973,4.73303114 11.05219,4.70302715 10.784,4.90466667 C10.5150376,5.10598124 10.4378957,5.47597654 10.604,5.768 L10.604,5.768 L10.6506667,5.838 L12.2606667,7.98466667 L10.6506667,10.132 L10.604,10.202 C10.4532845,10.4666086 10.5010274,10.7997113 10.72,11.0113333 L10.72,11.0113333 L10.784,11.0646667 L10.854,11.1113333 C11.1183033,11.2618666 11.450984,11.2144191 11.6626667,10.996 L11.6626667,10.996 L11.7173333,10.9313333 L13.6273333,8.38466667 L13.6753333,8.31133333 C13.7893578,8.10848085 13.7893578,7.86085249 13.6753333,7.658 L13.6753333,7.658 L13.6273333,7.58466667 L11.7173333,5.038 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|导航中心分段控制|访问史
        + '<symbol id="icoTocTabHistory">'
        + '<path d="M8,0 C12.4113555,0 16,3.58880564 16,8.00001836 C16,12.4112127 12.4113555,16 8,16 C3.58864449,16 0,12.4112311 0,8.00003673 C0,3.58880564 3.58864449,0 8,0 Z M8,1 C4.14152278,1 1,4.14157771 1,8.00001979 C1,11.8584421 4.14154257,15 8,15 C11.8584772,15 15,11.8584619 15,8.00001979 C15,4.14157771 11.8584574,1 8,1 Z M8.69469927,2.77007623 L8.69486454,2.7858137 L8.69486454,7.97032467 L11.0890204,10.5135155 C11.3696142,10.8116094 11.3597346,11.278243 11.0698856,11.5642721 L11.056921,11.5767592 C10.7588268,11.8573527 10.2921743,11.8474732 10.0061632,11.5576245 L9.99367608,11.5446599 L7.39502465,8.78421111 C7.2683526,8.64965351 7.19564981,8.47317198 7.19078613,8.2884347 L7.19052904,8.2686389 L7.19052904,2.7858137 C7.19052904,2.37039575 7.52727836,2.03364682 7.94269679,2.03364682 C8.3528449,2.03364682 8.68632553,2.3619302 8.69469927,2.77007623 Z"></path>'
        + '</symbol>'
        + '<symbol id="icoTocTabHistory-checked">'
        + '<path d="M8,0 C12.4113555,0 16,3.58880564 16,8.00001836 C16,12.4112127 12.4113555,16 8,16 C3.58864449,16 0,12.4112311 0,8.00003673 C0,3.58880564 3.58864449,0 8,0 Z M7.94269679,2.03364682 C7.52727836,2.03364682 7.19052904,2.37039575 7.19052904,2.7858137 L7.19052904,2.7858137 L7.19078613,8.2884347 C7.19564981,8.47317198 7.2683526,8.64965351 7.39502465,8.78421111 L7.39502465,8.78421111 L9.99367608,11.5446599 L10.0061632,11.5576245 C10.2921743,11.8474732 10.7588268,11.8573527 11.056921,11.5767592 L11.056921,11.5767592 L11.0698856,11.5642721 C11.3597346,11.278243 11.3696142,10.8116094 11.0890204,10.5135155 L11.0890204,10.5135155 L8.69486454,7.97032467 L8.69469927,2.77007623 C8.68632553,2.3619302 8.3528449,2.03364682 7.94269679,2.03364682 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|过滤
        + '<symbol id="icoFilter">'
        + '<path d="M8.84956005,15.9164574 L6.03223988,14.3895147 C5.77665501,14.2866085 5.61736842,14.0233946 5.64069537,13.7425051 L5.64069537,8.43795061 L0.161772723,1.28572151 C-0.021205139,1.02861724 -0.0513123934,0.68888983 0.0834638197,0.402091243 C0.233954752,0.150943046 0.501082607,-0.00145082454 0.78824392,1.04144974e-05 L14.8757449,1.04144974e-05 C15.1429049,0.00501946587 15.3967557,0.120689845 15.5796249,0.320752891 C15.714969,0.607760947 15.684842,0.94806687 15.501316,1.20530746 L10.0232934,8.35753657 L10.0232934,15.1890338 C10.0245887,15.4836328 9.87617952,15.7576004 9.63174894,15.9118359 C9.47423103,15.9118359 9.39682224,15.99225 9.24020443,15.99225 C9.10536415,16.0147418 8.96711356,15.9879185 8.84956005,15.9164574 L8.84956005,15.9164574 Z M12.5867848,15.6853826 C12.1289439,15.6853826 11.7577905,15.3042516 11.7577905,14.8341028 C11.7577905,14.3639539 12.1289439,13.982823 12.5867848,13.982823 L17.1710057,13.982823 C17.4671769,13.982823 17.7408503,14.145076 17.8889358,14.4084629 C18.0370214,14.6718497 18.0370214,14.9963558 17.8889358,15.2597427 C17.7408503,15.5231296 17.4671769,15.6853826 17.1710057,15.6853826 L12.5867848,15.6853826 Z M12.5867848,12.2793391 C12.2906136,12.2793391 12.0169402,12.1170861 11.8688547,11.8536992 C11.7207691,11.5903123 11.7207691,11.2658063 11.8688547,11.0024194 C12.0169402,10.7390325 12.2906136,10.5767795 12.5867848,10.5767795 L17.1710057,10.5767795 C17.4671769,10.5767795 17.7408503,10.7390325 17.8889358,11.0024194 C18.0370214,11.2658063 18.0370214,11.5903123 17.8889358,11.8536992 C17.7408503,12.1170861 17.4671769,12.2793391 17.1710057,12.2793391 L12.5867848,12.2793391 Z M12.5867848,8.87329565 C12.1289439,8.87329565 11.7577905,8.49216471 11.7577905,8.02201586 C11.7577905,7.55186702 12.1289439,7.17073607 12.5867848,7.17073607 L17.1710057,7.17073607 C17.6288466,7.17073607 18,7.55186702 18,8.02201586 C18,8.49216471 17.6288466,8.87329565 17.1710057,8.87329565 L12.5867848,8.87329565 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|检索
        + '<symbol id="icoRetrieval">'
        + '<path d="M6.54545451,0 C7.43175754,0 8.2792727,0.173333386 9.08799997,0.520000057 C9.89672724,0.866666727 10.5927272,1.33163643 11.176,1.91490915 C11.7592727,2.49818188 12.2242424,3.19418188 12.5709091,4.00290915 C12.9175757,4.81163642 13.0909091,5.65915158 13.0909091,6.54545461 C13.0909091,7.30666674 12.9667879,8.03587886 12.7185454,8.73309097 C12.470303,9.43030308 12.1170909,10.0627879 11.6589091,10.6305455 L15.7898182,14.7556364 C15.9299394,14.8957576 16,15.0681213 16,15.2727273 C16,15.4812122 15.9309091,15.6545455 15.7927273,15.7927273 C15.6545455,15.9309091 15.4812121,16 15.2727273,16 C15.0681212,16 14.8957576,15.9299394 14.7556364,15.7898182 L10.6305455,11.6589091 C10.062303,12.117091 9.42981819,12.4703031 8.73309092,12.7185455 C8.03636364,12.9667879 7.30715153,13.0909091 6.54545456,13.0909091 C5.65915153,13.0909091 4.81163637,12.9175758 4.0029091,12.5709091 C3.19418183,12.2242424 2.49818183,11.7592727 1.9149091,11.176 C1.33163637,10.5927273 0.866666676,9.89672729 0.520000005,9.08800002 C0.173333335,8.27927275 0,7.43175759 0,6.54545456 C0,5.65915153 0.173333335,4.81163637 0.520000005,4.0029091 C0.866666676,3.19418183 1.33163637,2.49818183 1.9149091,1.9149091 C2.49818183,1.33163637 3.19418183,0.866666676 4.0029091,0.520000005 C4.81163637,0.173333335 5.65915153,0 6.54545456,0 L6.54545451,0 Z M6.54545451,1.4545455 C5.85599996,1.4545455 5.19684845,1.58909095 4.56799996,1.85818186 C3.93915147,2.12727277 3.39757571,2.48896974 2.94327269,2.94327278 C2.48896967,3.39757581 2.1272727,3.93915157 1.85818178,4.56800004 C1.58909086,5.19684852 1.45454541,5.85600004 1.45454541,6.54545459 C1.45454541,7.23490915 1.58909088,7.89406067 1.85818178,8.52290914 C2.12727268,9.15175762 2.48896965,9.69333338 2.94327269,10.1476364 C3.39757574,10.6019394 3.93915149,10.9636364 4.56799996,11.2327273 C5.19684842,11.5018182 5.85599994,11.6363637 6.54545451,11.6363637 C7.23490908,11.6363637 7.89406059,11.5018182 8.52290906,11.2327273 C9.15175753,10.9636364 9.69333328,10.6019394 10.1476363,10.1476364 C10.6019394,9.69333338 10.9636363,9.15175762 11.2327272,8.52290914 C11.5018181,7.89406067 11.6363636,7.23490915 11.6363636,6.54545459 C11.6363636,5.85600004 11.5018182,5.19684852 11.2327272,4.56800004 C10.9636363,3.93915157 10.6019393,3.39757581 10.1476363,2.94327278 C9.6933333,2.48896974 9.15175755,2.12727277 8.52290906,1.85818186 C7.89406057,1.58909095 7.23490905,1.4545455 6.54545451,1.4545455 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|向左关闭
        + '<symbol id="icoCloseTo-left">'
        + '<path d="M13.9791715,0.176477427 L14.0154251,0.189323743 C15.5212,0.722890207 16.3261424,2.31174457 15.875093,3.79570421 L6.20859385,30 L15.8197795,56.039902 C16.3646269,57.5145002 15.632921,59.1369628 14.1798211,59.7471073 L13.9791715,59.8235226 C12.4774152,60.3556651 10.8245904,59.6444033 10.1979056,58.2273068 L10.1325565,58.0669743 L0.314759836,31.9158354 C-0.104917664,30.6730285 -0.104920005,29.3272583 0.31475317,28.0844499 L10.1325565,1.93302569 C10.7019517,0.409988422 12.4217946,-0.375374037 13.9791715,0.176477427 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|向右关闭
        + '<symbol id="icoCloseTo-right">'
        + '<path d="M13.9791715,0.176477427 L14.0154251,0.189323743 C15.5212,0.722890207 16.3261424,2.31174457 15.875093,3.79570421 L6.20859385,30 L15.8197795,56.039902 C16.3646269,57.5145002 15.632921,59.1369628 14.1798211,59.7471073 L13.9791715,59.8235226 C12.4774152,60.3556651 10.8245904,59.6444033 10.1979056,58.2273068 L10.1325565,58.0669743 L0.314759836,31.9158354 C-0.104917664,30.6730285 -0.104920005,29.3272583 0.31475317,28.0844499 L10.1325565,1.93302569 C10.7019517,0.409988422 12.4217946,-0.375374037 13.9791715,0.176477427 Z" transform="translate(8.000000, 30.000000) scale(-1, 1) translate(-8.000000, -30.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|向下关闭
        + '<symbol id="icoCloseTo-bottom">'
        + '<path d="M35.9791715,-21.8235226 L36.0154251,-21.8106763 C37.5212,-21.2771098 38.3261424,-19.6882554 37.875093,-18.2042958 L28.2085938,8 L37.8197795,34.039902 C38.3646269,35.5145002 37.632921,37.1369628 36.1798211,37.7471073 L35.9791715,37.8235226 C34.4774152,38.3556651 32.8245904,37.6444033 32.1979056,36.2273068 L32.1325565,36.0669743 L22.3147598,9.91583543 C21.8950823,8.67302848 21.89508,7.32725835 22.3147532,6.08444994 L32.1325565,-20.0669743 C32.7019517,-21.5900116 34.4217946,-22.375374 35.9791715,-21.8235226 Z" transform="translate(30.000000, 8.000000) rotate(270.000000) translate(-30.000000, -8.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|插图导航的上一张
        + '<symbol id="icoPrevFig">'
        + '<path d="M11.0303682,0.091084328 C11.7948436,0.375093579 12.1890102,1.237894 11.9107639,2.018203 L3.00130389,26.9997408 L11.9107639,51.981797 C12.1726428,52.7162055 11.8388895,53.5236859 11.1613701,53.8529228 L11.0303682,53.9089157 C10.310862,54.1762185 9.51976648,53.8355526 9.19721032,53.1440006 L9.14235361,53.0102855 C5.13199059,41.7636939 2.12421833,33.3287502 0.11903682,27.7054544 C0.11186687,27.6853471 0,27.43485 0,26.9997408 C0,26.5646315 0.111310594,26.3162129 0.119265149,26.2939053 C2.12439592,20.6707518 5.13209207,12.2360215 9.14235361,0.989714523 C9.4205999,0.20940552 10.2658928,-0.192924923 11.0303682,0.091084328 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|插图导航的下一张
        + '<symbol id="icoNextFig">'
        + '<path d="M11.0303682,0.091084328 C11.7948436,0.375093579 12.1890102,1.237894 11.9107639,2.018203 L3.00130389,26.9997408 L11.9107639,51.981797 C12.1726428,52.7162055 11.8388895,53.5236859 11.1613701,53.8529228 L11.0303682,53.9089157 C10.310862,54.1762185 9.51976648,53.8355526 9.19721032,53.1440006 L9.14235361,53.0102855 C5.13199059,41.7636939 2.12421833,33.3287502 0.11903682,27.7054544 C0.11186687,27.6853471 0,27.43485 0,26.9997408 C0,26.5646315 0.111310594,26.3162129 0.119265149,26.2939053 C2.12439592,20.6707518 5.13209207,12.2360215 9.14235361,0.989714523 C9.4205999,0.20940552 10.2658928,-0.192924923 11.0303682,0.091084328 Z" transform="translate(6.000000, 27.000000) scale(-1, 1) translate(-6.000000, -27.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|逐章导航的上一章'
        + '<symbol id="icoPrevChapter">'
        + '<path d="M2.56507664,7.09086552 L7.5381691,12.063958 C7.92869339,12.4544823 7.92869339,13.0876472 7.5381691,13.4781715 C7.14764481,13.8686958 6.51447983,13.8686958 6.12395554,13.4781715 L0.467101288,7.82131729 C0.287321184,7.64153719 0.190303885,7.41033487 0.176049391,7.17505536 C0.145971879,6.88568746 0.241806749,6.58570828 0.463554001,6.36396103 L6.12040825,0.707106781 C6.51093254,0.316582489 7.14409752,0.316582489 7.53462181,0.707106781 C7.9251461,1.09763107 7.9251461,1.73079605 7.53462181,2.12132034 L2.56507664,7.09086552 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|逐章导航的下一章
        + '<symbol id="icoNextChapter">'
        + '<path d="M2.73310223,7.09086552 L7.70619469,12.063958 C8.09671898,12.4544823 8.09671898,13.0876472 7.70619469,13.4781715 C7.3156704,13.8686958 6.68250542,13.8686958 6.29198113,13.4781715 L0.635126876,7.82131729 C0.455346772,7.64153719 0.358329473,7.41033487 0.344074979,7.17505536 C0.313997467,6.88568746 0.409832337,6.58570828 0.631579589,6.36396103 L6.28843384,0.707106781 C6.67895813,0.316582489 7.31212311,0.316582489 7.7026474,0.707106781 C8.09317169,1.09763107 8.09317169,1.73079605 7.7026474,2.12132034 L2.73310223,7.09086552 Z" transform="translate(4.168887, 7.092639) scale(-1, 1) translate(-4.168887, -7.092639) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|已收起的目录节点
        + '<symbol id="icoFolded">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '<path d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M7.66396103,3.75735931 C7.27343674,3.36683502 6.64027176,3.36683502 6.24974747,3.75735931 C5.85922318,4.1478836 5.85922318,4.78104858 6.24974747,5.17157288 L6.24974747,5.17157288 L9.08528137,8.00710678 L6.24974747,10.8426407 C5.85922318,11.233165 5.85922318,11.86633 6.24974747,12.2568542 C6.64027176,12.6473785 7.27343674,12.6473785 7.66396103,12.2568542 L7.66396103,12.2568542 L11.1994949,8.72132034 C11.3947571,8.5260582 11.4923882,8.27013588 11.4923882,8.01421356 L11.4923882,8.01421356 L11.4923882,8 C11.4923882,7.74407768 11.3947571,7.48815536 11.1994949,7.29289322 L11.1994949,7.29289322 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|已展开的目录节点
        + '<symbol id="icoUnfold">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '<path d="M11.500027,1.86500179 C12.0523118,1.86500179 12.500027,2.31271704 12.500027,2.86500179 C12.500027,3.41728654 12.0523118,3.86500179 11.500027,3.86500179 L5.49500179,3.86500179 L5.49500179,9.87002705 C5.49500179,10.4223118 5.04728654,10.870027 4.49500179,10.870027 C3.94271704,10.870027 3.49500179,10.4223118 3.49500179,9.87002705 L3.49500179,2.87002705 C3.49500179,2.59244142 3.60810365,2.34127215 3.79073809,2.16008851 C3.97127215,1.97810365 4.22244142,1.86500179 4.50002705,1.86500179 L11.500027,1.86500179 Z" transform="translate(7.997514, 6.367514) rotate(-135.000000) translate(-7.997514, -6.367514) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|已收起的引用折叠
        + '<symbol id="icoQuoteClosed">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '<path d="M11,1 C13.209139,1 15,2.790861 15,5 L15,11 C15,13.209139 13.209139,15 11,15 L5,15 C2.790861,15 1,13.209139 1,11 L1,5 C1,2.790861 2.790861,1 5,1 L11,1 Z M8,3 C7.44771525,3 7,3.44771525 7,4 L7,4 L7,7 L4,7 C3.44771525,7 3,7.44771525 3,8 C3,8.55228475 3.44771525,9 4,9 L4,9 L7,9 L7,12 C7,12.5522847 7.44771525,13 8,13 C8.55228475,13 9,12.5522847 9,12 L9,12 L9,9 L12,9 C12.5522847,9 13,8.55228475 13,8 C13,7.44771525 12.5522847,7 12,7 L12,7 L9,7 L9,4 C9,3.44771525 8.55228475,3 8,3 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|已展开的引用折叠
        + '<symbol id="icoQuoteOpened">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '<path d="M11,1 C13.209139,1 15,2.790861 15,5 L15,11 C15,13.209139 13.209139,15 11,15 L5,15 C2.790861,15 1,13.209139 1,11 L1,5 C1,2.790861 2.790861,1 5,1 L11,1 Z M11,2 L5,2 C3.34314575,2 2,3.34314575 2,5 L2,5 L2,11 C2,12.6568542 3.34314575,14 5,14 L5,14 L11,14 C12.6568542,14 14,12.6568542 14,11 L14,11 L14,5 C14,3.34314575 12.6568542,2 11,2 L11,2 Z"></path>'
        + '<rect x="4" y="7" width="8" height="2" rx="1"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|已收起的表格折叠行节点
        + '<symbol id="icoRowGroupClosed">'
        + '<rect fill-opacity="0" x="1" y="1" width="10" height="10"></rect>'
        + '<path d="M8,0 C10.209139,-4.05812251e-16 12,1.790861 12,4 L12,8 C12,10.209139 10.209139,12 8,12 L4,12 C1.790861,12 2.705415e-16,10.209139 0,8 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L8,0 Z M6,2 C5.44771525,2 5,2.44771525 5,3 L5,3 L5,5 L3,5 C2.44771525,5 2,5.44771525 2,6 C2,6.55228475 2.44771525,7 3,7 L3,7 L5,7 L5,9 C5,9.55228475 5.44771525,10 6,10 C6.55228475,10 7,9.55228475 7,9 L7,9 L7,7 L9,7 C9.55228475,7 10,6.55228475 10,6 C10,5.44771525 9.55228475,5 9,5 L9,5 L7,5 L7,3 C7,2.44771525 6.55228475,2 6,2 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|已展开的表格折叠行节点
        + '<symbol id="icoRowGroupOpened">'
        + '<rect fill-opacity="0" x="1" y="1" width="10" height="10"></rect>'
        + '<path d="M8,0 C10.209139,-4.05812251e-16 12,1.790861 12,4 L12,8 C12,10.209139 10.209139,12 8,12 L4,12 C1.790861,12 2.705415e-16,10.209139 0,8 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L8,0 Z M8,1 L4,1 C2.34314575,1 1,2.34314575 1,4 L1,4 L1,8 C1,9.65685425 2.34314575,11 4,11 L4,11 L8,11 C9.65685425,11 11,9.65685425 11,8 L11,8 L11,4 C11,2.34314575 9.65685425,1 8,1 L8,1 Z"></path>'
        + '<rect x="3" y="5" width="6" height="2" rx="1"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|展开长内容
        + '<symbol id="icoExtend">'
        + '<path d="M13,1.65685425 C13.5522847,1.65685425 14,2.1045695 14,2.65685425 C14,3.209139 13.5522847,3.65685425 13,3.65685425 L8,3.65685425 L8,8.65685425 C8,9.209139 7.55228475,9.65685425 7,9.65685425 C6.44771525,9.65685425 6,9.209139 6,8.65685425 L6,2.65685425 C6,2.1045695 6.44771525,1.65685425 7,1.65685425 L13,1.65685425 Z" transform="translate(10.000000, 5.656854) rotate(-135.000000) translate(-10.000000, -5.656854) "></path>'
        + '<path d="M13,7.65685425 C13.5522847,7.65685425 14,8.1045695 14,8.65685425 C14,9.209139 13.5522847,9.65685425 13,9.65685425 L8,9.65685425 L8,14.6568542 C8,15.209139 7.55228475,15.6568542 7,15.6568542 C6.44771525,15.6568542 6,15.209139 6,14.6568542 L6,8.65685425 C6,8.1045695 6.44771525,7.65685425 7,7.65685425 L13,7.65685425 Z" transform="translate(10.000000, 11.656854) rotate(-135.000000) translate(-10.000000, -11.656854) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|关闭
        + '<symbol id="icoClose">'
        + '<path d="M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "></path>'
        + '</symbol>'
        // SVG 图标集：图标|清空输入
        + '<symbol id="icoResetInput">'
        + '<path d="M8,0 C12.418278,-8.11624501e-16 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 5.41083001e-16,12.418278 0,8 C-5.41083001e-16,3.581722 3.581722,8.11624501e-16 8,0 Z M5.7372583,4.60588745 C5.42483887,4.29346802 4.91830688,4.29346802 4.60588745,4.60588745 C4.29346802,4.91830688 4.29346802,5.42483887 4.60588745,5.7372583 L4.60588745,5.7372583 L6.86862915,8 L4.60588745,10.2627417 C4.29346802,10.5751611 4.29346802,11.0816931 4.60588745,11.3941125 C4.91830688,11.706532 5.42483887,11.706532 5.7372583,11.3941125 L5.7372583,11.3941125 L8,9.13137085 L10.2627417,11.3941125 C10.5751611,11.706532 11.0816931,11.706532 11.3941125,11.3941125 C11.706532,11.0816931 11.706532,10.5751611 11.3941125,10.2627417 L11.3941125,10.2627417 L9.13137085,8 L11.3941125,5.7372583 C11.706532,5.42483887 11.706532,4.91830688 11.3941125,4.60588745 C11.0816931,4.29346802 10.5751611,4.29346802 10.2627417,4.60588745 L10.2627417,4.60588745 L8,6.86862915 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|画中画的放大模式
        + '<symbol id="icoZoomIn">'
        + '<path d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M11.4996893,6.75 C11.0853041,6.75 10.7493786,7.08578644 10.7493786,7.5 L10.7493786,7.5 L10.7493786,10.4956177 L10.7427732,10.5529405 C10.7168519,10.6633843 10.6176708,10.7456177 10.499275,10.7456177 L10.499275,10.7456177 L7.50031071,10.7456177 L7.39849799,10.7524644 C7.03227077,10.8021268 6.75,11.115922 6.75,11.4956177 C6.75,11.9098313 7.08592555,12.2456177 7.50031071,12.2456177 L7.50031071,12.2456177 L10.499275,12.2456177 L10.6428617,12.2398165 C11.5425968,12.1668101 12.25,11.4137911 12.25,10.4956177 L12.25,10.4956177 L12.25,7.5 L12.2431505,7.39822944 C12.1934676,7.03215388 11.8795424,6.75 11.4996893,6.75 Z M8.49772239,3.75 L5.5,3.75 L5.35647279,3.7558012 C4.45711027,3.82880766 3.75,4.5818266 3.75,5.5 L3.75,5.5 L3.75,8.49561775 L3.75684662,8.5973883 C3.80650904,8.96346387 4.12030423,9.24561775 4.5,9.24561775 C4.91421356,9.24561775 5.25,8.90983131 5.25,8.49561775 L5.25,8.49561775 L5.25,5.5 L5.25660268,5.44267729 C5.28251318,5.33223341 5.38165327,5.25 5.5,5.25 L5.5,5.25 L8.49772239,5.25 L8.59949294,5.24315338 C8.96556851,5.19349096 9.24772239,4.87969577 9.24772239,4.5 C9.24772239,4.08578644 8.91193595,3.75 8.49772239,3.75 L8.49772239,3.75 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|画中画的缩小模式
        + '<symbol id="icoZoomOut">'
        + '<path d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M12.9977224,8.25 L10,8.25 L9.85647279,8.2558012 C8.95711027,8.32880766 8.25,9.0818266 8.25,10 L8.25,10 L8.25,12.9956177 L8.25684662,13.0973883 C8.30650904,13.4634639 8.62030423,13.7456177 9,13.7456177 C9.41421356,13.7456177 9.75,13.4098313 9.75,12.9956177 L9.75,12.9956177 L9.75,10 L9.75660268,9.94267729 C9.78251318,9.83223341 9.88165327,9.75 10,9.75 L10,9.75 L12.9977224,9.75 L13.0994929,9.74315338 C13.4655685,9.69349096 13.7477224,9.37969577 13.7477224,9 C13.7477224,8.58578644 13.4119359,8.25 12.9977224,8.25 L12.9977224,8.25 Z M6.99968929,2.25 C6.58530412,2.25 6.24937858,2.58578644 6.24937858,3 L6.24937858,3 L6.24937858,5.99561775 L6.24277316,6.05294045 C6.21685193,6.16338433 6.11767077,6.24561775 5.999275,6.24561775 L5.999275,6.24561775 L3.00031071,6.24561775 L2.89849799,6.25246436 C2.53227077,6.30212679 2.25,6.61592198 2.25,6.99561775 C2.25,7.40983131 2.58592555,7.74561775 3.00031071,7.74561775 L3.00031071,7.74561775 L5.999275,7.74561775 L6.14286167,7.73981655 C7.04259678,7.66681009 7.75,6.91379114 7.75,5.99561775 L7.75,5.99561775 L7.75,3 L7.74315055,2.89822944 C7.69346755,2.53215388 7.37954235,2.25 6.99968929,2.25 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|插图导航
        + '<symbol id="icoFigureNav">'
        + '<path d="M18,3 C19.1045695,3 20,3.8954305 20,5 L20,14 C20,15.1045695 19.1045695,16 18,16 L4,16 C2.9456382,16 2.08183488,15.1841222 2.00548574,14.1492623 L2,14 L15.5,14 C16.8807119,14 18,12.8807119 18,11.5 L18,3 Z M15,0 C16.1045695,-1.18396092e-15 17,0.8954305 17,2 L17,11 C17,12.1045695 16.1045695,13 15,13 L2,13 C0.8954305,13 -1.13551567e-13,12.1045695 -1.13686838e-13,11 L-1.13686838e-13,2 C-1.13822108e-13,0.8954305 0.8954305,2.02906125e-16 2,0 L15,0 Z M5.73928706,4.46929968 C5.247001,4.21895416 4.64497916,4.41508571 4.39463363,4.90737177 L4.39463363,4.90737177 L2.03225639,9.55281283 C1.96084272,9.69324256 1.92361915,9.84855852 1.92361915,10.0061035 C1.92361915,10.5583883 2.3713344,11.0061035 2.92361915,11.0061035 L2.92361915,11.0061035 L14.2120421,11.0061035 C14.4392714,11.0061035 14.6597254,10.9287155 14.8370963,10.7866848 C15.2681995,10.4414769 15.3378313,9.81215247 14.9926234,9.38104929 L14.9926234,9.38104929 L12.9645536,6.84835144 C12.6449335,6.44920285 12.075683,6.35548344 11.6449719,6.63110012 L11.6449719,6.63110012 L9.29545309,8.13458249 C9.28589453,8.14069912 9.27623255,8.14665259 9.26647134,8.15244033 C8.79141623,8.43411583 8.17796486,8.27735069 7.89628936,7.80229559 L7.89628936,7.80229559 L6.14615975,4.85064382 C6.04943866,4.68752049 5.90832711,4.55526275 5.73928706,4.46929968 Z M11,2 C9.8954305,2 9,2.8954305 9,4 C9,5.1045695 9.8954305,6 11,6 C12.1045695,6 13,5.1045695 13,4 C13,2.8954305 12.1045695,2 11,2 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|亮色模式
        + '<symbol id="icoLightMode">'
        + '<path d="M10,17 C10.5522847,17 11,17.4477153 11,18 L11,19 C11,19.5522847 10.5522847,20 10,20 C9.44771525,20 9,19.5522847 9,19 L9,18 C9,17.4477153 9.44771525,17 10,17 Z M16.363961,14.9497475 L17.0710678,15.6568542 C17.4615921,16.0473785 17.4615921,16.6805435 17.0710678,17.0710678 C16.6805435,17.4615921 16.0473785,17.4615921 15.6568542,17.0710678 L14.9497475,16.363961 C14.5592232,15.9734367 14.5592232,15.3402718 14.9497475,14.9497475 C15.3402718,14.5592232 15.9734367,14.5592232 16.363961,14.9497475 Z M5.05025253,14.9497475 C5.44077682,15.3402718 5.44077682,15.9734367 5.05025253,16.363961 L4.34314575,17.0710678 C3.95262146,17.4615921 3.31945648,17.4615921 2.92893219,17.0710678 C2.5384079,16.6805435 2.5384079,16.0473785 2.92893219,15.6568542 L3.63603897,14.9497475 C4.02656326,14.5592232 4.65972824,14.5592232 5.05025253,14.9497475 Z M10,4 C13.31375,4 16,6.68624999 16,10 C16,13.31375 13.31375,16 10,16 C6.68624999,16 4,13.31375 4,10 C4,6.68624999 6.68624999,4 10,4 Z M19,9 C19.5522847,9 20,9.44771525 20,10 C20,10.5522847 19.5522847,11 19,11 L18,11 C17.4477153,11 17,10.5522847 17,10 C17,9.44771525 17.4477153,9 18,9 L19,9 Z M2,9 C2.55228475,9 3,9.44771525 3,10 C3,10.5522847 2.55228475,11 2,11 L1,11 C0.44771525,11 2.4125371e-16,10.5522847 3.83475851e-17,10 C-1.6455854e-16,9.44771525 0.44771525,9 1,9 L2,9 Z M17.0710678,2.92893219 C17.4615921,3.31945648 17.4615921,3.95262146 17.0710678,4.34314575 L16.363961,5.05025253 C15.9734367,5.44077682 15.3402718,5.44077682 14.9497475,5.05025253 C14.5592232,4.65972824 14.5592232,4.02656326 14.9497475,3.63603897 L15.6568542,2.92893219 C16.0473785,2.5384079 16.6805435,2.5384079 17.0710678,2.92893219 Z M4.34314575,2.92893219 L5.05025253,3.63603897 C5.44077682,4.02656326 5.44077682,4.65972824 5.05025253,5.05025253 C4.65972824,5.44077682 4.02656326,5.44077682 3.63603897,5.05025253 L2.92893219,4.34314575 C2.5384079,3.95262146 2.5384079,3.31945648 2.92893219,2.92893219 C3.31945648,2.5384079 3.95262146,2.5384079 4.34314575,2.92893219 Z M10,0 C10.5522847,-1.01453063e-16 11,0.44771525 11,1 L11,2 C11,2.55228475 10.5522847,3 10,3 C9.44771525,3 9,2.55228475 9,2 L9,1 C9,0.44771525 9.44771525,1.01453063e-16 10,0 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|深色模式
        + '<symbol id="icoDarkMode">'
        + '<path d="M11.33775,0 C15.17625,1.10703459 18,4.60533142 18,8.800025 C18,13.8801213 13.8825,18 8.802,18 C4.6074375,18 1.107,15.1744742 0,11.3375418 C1.22625,12.0429388 2.628,12.4783274 4.1439375,12.4783274 C8.7496875,12.4783274 12.4801875,8.74489828 12.4801875,4.14181693 C12.4801875,2.62583206 12.045375,1.22347573 11.33775,0 Z M4.74264069,5.24264069 L5.57324417,7.34866397 C5.67488851,7.60638666 5.87889472,7.81039286 6.1366174,7.91203721 L8.24264069,8.74264069 L6.1366174,9.57324417 C5.87889472,9.67488851 5.67488851,9.87889472 5.57324417,10.1366174 L4.74264069,12.2426407 L3.91203721,10.1366174 C3.81039286,9.87889472 3.60638666,9.67488851 3.34866397,9.57324417 L1.24264069,8.74264069 L3.34866397,7.91203721 C3.60638666,7.81039286 3.81039286,7.60638666 3.91203721,7.34866397 L4.74264069,5.24264069 Z M8.82842712,0.828427125 L9.51760925,2.57587176 C9.61925359,2.83359445 9.8232598,3.03760066 10.0809825,3.139245 L11.8284271,3.82842712 L10.0809825,4.51760925 C9.8232598,4.61925359 9.61925359,4.8232598 9.51760925,5.08098249 L8.82842712,6.82842712 L8.139245,5.08098249 C8.03760066,4.8232598 7.83359445,4.61925359 7.57587176,4.51760925 L5.82842712,3.82842712 L7.57587176,3.139245 C7.83359445,3.03760066 8.03760066,2.83359445 8.139245,2.57587176 L8.82842712,0.828427125 Z M3.32842712,0.828427125 L3.87618789,2.21729312 C3.97783224,2.47501581 4.18183844,2.67902201 4.43956113,2.78066636 L5.82842712,3.32842712 L4.43956113,3.87618789 C4.18183844,3.97783224 3.97783224,4.18183844 3.87618789,4.43956113 L3.32842712,5.82842712 L2.78066636,4.43956113 C2.67902201,4.18183844 2.47501581,3.97783224 2.21729312,3.87618789 L0.828427125,3.32842712 L2.21729312,2.78066636 C2.47501581,2.67902201 2.67902201,2.47501581 2.78066636,2.21729312 L3.32842712,0.828427125 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|搜索
        + '<symbol id="icoSearch">'
        + '<path d="M528.455431,171.449968 C527.72681,172.183344 526.545225,172.183344 525.816124,171.449968 L522.393223,168.134885 C521.038907,169.008011 519.437731,169.529774 517.709652,169.529774 C512.899726,169.529774 509,165.605956 509,160.764898 C509,155.924138 512.899726,152 517.709652,152 C522.52015,152 526.419327,155.924138 526.419327,160.764898 C526.419327,162.504086 525.901039,164.11525 525.032622,165.478481 L528.455408,168.793541 C529.184624,169.527465 529.184624,170.716112 528.455431,171.449968 Z M517.709652,154.504244 C514.274066,154.504244 511.488381,157.3073 511.488381,160.764898 C511.488381,164.222748 514.274066,167.02553 517.709652,167.02553 C521.14581,167.02553 523.930901,164.222748 523.930901,160.764898 C523.930901,157.3073 521.14581,154.504244 517.709652,154.504244 Z" transform="translate(-509 -152)"></path>'
        + '</symbol>'
        // SVG 图标集：图标|聚光灯
        + '<symbol id="icoSpotlight">'
        + '<path d="M7,0 C10.7551223,0 13.8196406,2.95682698 13.9923239,6.66924983 C16.3611232,7.79146111 18,10.2043405 18,13 C18,16.8659932 14.8659932,20 11,20 C7.24487772,20 4.18035939,17.043173 4.00767611,13.3307502 C1.6388768,12.2085389 0,9.79565954 0,7 C0,3.13400675 3.13400675,0 7,0 Z M11,6 C7.13400675,6 4,9.13400675 4,13 C4,13.110871 4.00257759,13.2211399 4.00767611,13.3307502 C4.91543987,13.7597761 5.92966629,14 7,14 C10.8659932,14 14,10.8659932 14,7 C14,6.88912903 13.9974224,6.77886009 13.9923239,6.66924983 C13.0845601,6.24022387 12.0703337,6 11,6 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|激光笔
        + '<symbol id="icoLaserPointer">'
        + '<path d="M10.951381,5.00614803 L12.0396176,6.57032267 L17.3457737,14.2000489 C17.8961516,14.9915099 18.1116877,15.9707153 17.9449559,16.9222029 C17.7782241,17.8736904 17.2428856,18.7194998 16.4567352,19.2735207 L16.3604784,19.340826 C15.8164041,19.7245739 15.1829366,19.9467693 14.5310651,19.9915531 L14.3131903,19.9998885 C14.0948286,20.0016095 13.8752985,19.9834224 13.657229,19.9447397 C12.7122615,19.7771146 11.8721398,19.2383609 11.3217023,18.4470119 L4.92864642,9.25311104 C4.37771148,8.46171625 4.16171393,7.48230924 4.32820583,6.53050734 C4.49469773,5.57870545 5.03002974,4.73253928 5.81634803,4.1782931 L5.91394173,4.11098782 C7.55057037,2.95790063 9.80564043,3.35862983 10.951381,5.00614803 Z M7.09843515,5.50959151 L6.95137615,5.6038189 L6.95137615,5.60247278 L6.85378242,5.67112416 C6.09067447,6.20903376 5.85807951,7.24252802 6.31634864,8.05911542 L6.40993164,8.20718703 L7.498,9.772 L10.558,7.614 L9.47009576,6.05072592 C8.93586473,5.28236342 7.90943819,5.04816688 7.09843515,5.50959151 Z M1.0863958,6.34552304 L2.18800139,6.47071085 C2.42489812,6.49754112 2.64024445,6.62177293 2.78303568,6.81398205 C2.92582691,7.00619117 2.98336171,7.2492805 2.94201299,7.48567445 C2.85211159,7.99749099 2.38283962,8.3509847 1.8698192,8.29333778 L0.766876686,8.16814995 C0.53025693,8.14128643 0.315151709,8.01724676 0.172401749,7.82534805 C0.0296517894,7.63344933 -0.0280750656,7.39072097 0.0128650894,7.15453248 L0.0128650894,7.15318638 C0.102787372,6.64079459 0.572890352,6.28711589 1.0863958,6.34552304 Z M4.60779042,0.695918042 L5.38720313,1.81587785 C5.66642036,2.23467814 5.56142729,2.80144903 5.15103845,3.09073596 C4.74064962,3.3800229 4.17580662,3.28542572 3.88051682,2.87795514 L3.10110412,1.75664921 C2.96147742,1.55550829 2.90697688,1.30673553 2.94960445,1.06511502 C2.99223201,0.823494514 3.12849183,0.608841455 3.32837711,0.468426199 L3.32704019,0.468426199 C3.74312293,0.175245254 4.31645492,0.277082713 4.60779042,0.695918042 Z M10.5182254,0.0147886333 C10.754798,0.0568442423 10.9641128,0.194205748 11.0978347,0.395153585 C11.2315566,0.596101422 11.2781236,0.843260997 11.2267824,1.07955814 L11.004857,2.10259834 C10.895061,2.60771659 10.4089597,2.93559952 9.90325135,2.84564861 C9.66696618,2.80356486 9.45789382,2.66640177 9.32421017,2.46576537 C9.19052652,2.26512898 9.14376269,2.01832555 9.19469435,1.78222523 L9.41661976,0.759185021 C9.52581005,0.253521611 10.0120966,-0.0750804945 10.5182254,0.0147886333 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|段落导航
        + '<symbol id="icoParagraphNav">'
        + '<path d="M3.01977401,12 C3.39265537,12 3.69774011,12.3050847 3.69774011,12.6779661 L3.69774011,12.6779661 L3.69774011,17.714056 L4.87288136,16.5389147 C5.13276836,16.2677283 5.56214689,16.2677283 5.79943503,16.5389147 C6.05932203,16.8101012 6.05932203,17.2394797 5.79943503,17.4993667 L5.79943503,17.4993667 L3.50564972,19.793152 C3.38135593,19.9287452 3.20056497,19.9965418 3.03107345,19.9965418 L3.03107345,19.9965418 L2.96327684,19.9965418 C2.79378531,19.9965418 2.62429379,19.9287452 2.48870056,19.793152 L2.48870056,19.793152 L0.194915254,17.4993667 C-0.0649717514,17.2281803 -0.0649717514,16.7988017 0.194915254,16.5389147 C0.466101695,16.2790277 0.895480226,16.2790277 1.15536723,16.5389147 L1.15536723,16.5389147 L2.34180791,17.7253554 L2.34180791,12.6779661 C2.34180791,12.3050847 2.64689266,12 3.01977401,12 Z M19,16 C19.5522847,16 20,16.4477153 20,17 C20,17.5522847 19.5522847,18 19,18 L8,18 C7.44771525,18 7,17.5522847 7,17 C7,16.4477153 7.44771525,16 8,16 L19,16 Z M15,12.5 C15.5522847,12.5 16,12.9477153 16,13.5 C16,14.0522847 15.5522847,14.5 15,14.5 L8,14.5 C7.44771525,14.5 7,14.0522847 7,13.5 C7,12.9477153 7.44771525,12.5 8,12.5 L15,12.5 Z M19,9 C19.5522847,9 20,9.44771525 20,10 C20,10.5522847 19.5522847,11 19,11 L8,11 C7.44771525,11 7,10.5522847 7,10 C7,9.44771525 7.44771525,9 8,9 L19,9 Z M3.03107345,0 C3.20056497,0 3.38135593,0.0677966102 3.50564972,0.203389831 L5.79943503,2.49717514 C6.05932203,2.75706215 6.05932203,3.18644068 5.79943503,3.45762712 C5.56214689,3.72881356 5.13276836,3.72881356 4.87288136,3.45762712 L3.69774011,2.28248588 L3.69774011,7.31857574 C3.69774011,7.6914571 3.39265537,7.99654184 3.01977401,7.99654184 C2.64689266,7.99654184 2.34180791,7.6914571 2.34180791,7.31857574 L2.34180791,2.27118644 L1.15536723,3.45762712 C0.895480226,3.71751412 0.466101695,3.71751412 0.194915254,3.45762712 C-0.0649717514,3.19774011 -0.0649717514,2.76836158 0.194915254,2.49717514 L2.48870056,0.203389831 C2.62429379,0.0677966102 2.79378531,0 2.96327684,0 L3.03107345,0 Z M15,5.5 C15.5522847,5.5 16,5.94771525 16,6.5 C16,7.05228475 15.5522847,7.5 15,7.5 L8,7.5 C7.44771525,7.5 7,7.05228475 7,6.5 C7,5.94771525 7.44771525,5.5 8,5.5 L15,5.5 Z M19,2 C19.5522847,2 20,2.44771525 20,3 C20,3.55228475 19.5522847,4 19,4 L8,4 C7.44771525,4 7,3.55228475 7,3 C7,2.44771525 7.44771525,2 8,2 L19,2 Z" id="形状结合"></path>'
        + '</symbol>'
        // SVG 图标集：图标|字体风格
        + '<symbol id="icoFont">'
        + '<path d="M13.5762602,0 L19.6240589,2.72949935 C19.8423438,2.82801594 19.9601208,3.06747857 19.9049054,3.30051307 L19.9049054,3.30051307 L18.9255405,7.43389084 C18.9239258,7.44070599 18.9222394,7.44750398 18.9204818,7.4542837 C18.781886,7.98889537 18.2361435,8.30992963 17.7015318,8.1713338 L17.7015318,8.1713338 L16.6090545,7.88811365 L17.0004095,16.9530131 C17.0010298,16.9673822 17.0013401,16.981763 17.0013401,16.9961455 C17.0013401,17.5484303 16.5536248,17.9961455 16.0013401,17.9961455 L16.0013401,17.9961455 L4.0220839,17.9961455 C4.00856119,17.9961455 3.99503987,17.9958712 3.98152828,17.9953228 C3.42969791,17.9729246 3.00050837,17.5074203 3.02290662,16.9555899 L3.02290662,16.9555899 L3.39094547,7.88814065 L2.2984682,8.1713608 C2.29168849,8.17311841 2.2848905,8.17480475 2.27807535,8.17641954 C1.74066982,8.30375271 1.20179262,7.97132338 1.07445945,7.43391784 L1.07445945,7.43391784 L0.0950940831,3.300538 C0.0398789749,3.06750442 0.157654736,2.82804263 0.375938263,2.72952533 L0.375938263,2.72952533 L6.42371282,0 C6.84120201,1.17779603 8.35034026,1.92020134 10.0273836,1.92020134 C11.7041575,1.92020134 13.1584477,1.17779606 13.5762602,0 L13.5762602,0 Z M14.3362925,15 L5.33629254,15 C5.06015017,15 4.83629254,15.2238576 4.83629254,15.5 C4.83629254,15.7761424 5.06015017,16 5.33629254,16 L5.33629254,16 L14.3362925,16 C14.6124349,16 14.8362925,15.7761424 14.8362925,15.5 C14.8362925,15.2238576 14.6124349,15 14.3362925,15 L14.3362925,15 Z M14.3362925,13 L5.33629254,13 C5.06015017,13 4.83629254,13.2238576 4.83629254,13.5 C4.83629254,13.7761424 5.06015017,14 5.33629254,14 L5.33629254,14 L14.3362925,14 C14.6124349,14 14.8362925,13.7761424 14.8362925,13.5 C14.8362925,13.2238576 14.6124349,13 14.3362925,13 L14.3362925,13 Z M10.1692801,4 L9.49356401,4 C9.10681163,4 8.75473295,4.22301476 8.58946486,4.57267725 L8.58946486,4.57267725 L5.51323262,11.0811511 C5.47258031,11.1671604 5.45149579,11.2611105 5.45149579,11.3562431 C5.45149579,11.7117802 5.73971557,12 6.09525268,12 L6.09525268,12 L6.47408711,12 C6.86292903,12 7.21651458,11.7745963 7.38064094,11.4220902 L7.38064094,11.4220902 L7.98538301,10.1232417 L11.6882178,10.1232417 L12.2536219,11.4038874 C12.4135943,11.7662263 12.772349,12 13.1684307,12 L13.1684307,12 L13.5590129,12 C13.6567871,12 13.7533353,11.9782359 13.8416532,11.9362865 C14.1702934,11.7801886 14.3101665,11.3872307 14.1540686,11.0585905 L14.1540686,11.0585905 L11.0725642,4.57095699 C10.9069259,4.22223103 10.5553447,4 10.1692801,4 L10.1692801,4 Z M9.83629254,5.81301032 L11.1439071,8.7799378 L8.55457137,8.7799378 L9.83629254,5.81301032 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|非衬线字（小清新）体风格
        + '<symbol id="icoFont-sans">'
        + '<path d="M18,16 L14.0598232,16 L12.4935418,12.2464833 L5.32290959,12.2464833 L3.84228416,16 L0,16 L6.98708362,0 L10.8171312,0 L18,16 Z M11.3310673,9.55987559 L8.8592794,3.62602064 L6.4364378,9.55987559 L11.3310673,9.55987559 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|衬线（文艺范）字体风格
        + '<symbol id="icoFont-serif">'
        + '<path d="M10.45,11.2169143 L4.4625,11.2169143 L3.75,12.8525809 C3.5166655,13.3978058 3.4,13.8480227 3.4,14.203245 C3.4,14.6741211 3.59166475,15.0210772 3.975,15.2441238 C4.20000112,15.3762995 4.75416225,15.4754298 5.6375,15.5415177 L5.6375,16 L0,16 L0,15.5415177 C0.608336375,15.4506469 1.10833138,15.2007559 1.5,14.7918372 C1.89166862,14.3829185 2.37499713,13.5382455 2.95,12.257793 L9.0125,0 L9.25,0 L15.3625,12.6295355 C15.9458363,13.9347709 16.4249981,14.7567265 16.8,15.0954268 C17.0833347,15.3515173 17.4833307,15.5002128 18,15.5415177 L18,16 L9.8,16 L9.8,15.5415177 L10.1375,15.5415177 C10.7958366,15.5415177 11.258332,15.4506482 11.525,15.2689066 C11.7083342,15.1367308 11.8,14.9467311 11.8,14.6989016 C11.8,14.5502038 11.7750002,14.3973779 11.725,14.2404192 C11.7083332,14.1660704 11.5833345,13.8562881 11.35,13.3110632 L10.45,11.2169143 Z M10.025,10.2619342 L7.5,4.49650206 L4.9,10.2619342 L10.025,10.2619342 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|打印
        + '<symbol id="icoPrint">'
        + '<path d="M15,7.38964445e-12 C16.1045695,7.38944155e-12 17,0.8954305 17,2 L17,6 L18,6 C19.1045695,6 20,6.8954305 20,8 L20,14 C20,15.1045695 19.1045695,16 18,16 L17,16 L17,17 C17,18.1045695 16.1045695,19 15,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,8 C-1.3527075e-16,6.8954305 0.8954305,6 2,6 L3,6 L3,2 C3,0.8954305 3.8954305,7.38984736e-12 5,7.38964445e-12 L15,7.38964445e-12 Z M16,13 L4,13 L4,17 C4,17.5522847 4.44771525,18 5,18 L5,18 L15,18 C15.5522847,18 16,17.5522847 16,17 L16,17 L16,13 Z M14,15 L14,16 L6,16 L6,15 L14,15 Z M17.5,8 L16.5,8 C16.2238576,8 16,8.22385763 16,8.5 C16,8.77614237 16.2238576,9 16.5,9 L16.5,9 L17.5,9 C17.7761424,9 18,8.77614237 18,8.5 C18,8.22385763 17.7761424,8 17.5,8 L17.5,8 Z M14.1275656,8 C13.8514233,8 13.6275656,8.22385763 13.6275656,8.5 C13.6275656,8.77614237 13.8514233,9 14.1275656,9 C14.403708,9 14.6275656,8.77614237 14.6275656,8.5 C14.6275656,8.22385763 14.403708,8 14.1275656,8 Z M15,1 L5,1 C4.44771525,1 4,1.44771525 4,2 L4,2 L4,6 L16,6 L16,2 C16,1.48716416 15.6139598,1.06449284 15.1166211,1.00672773 L15,1 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|插图浏览器中打开
        + '<symbol id="icoOpenInFigureNav">'
        + '<path d="M13,0 C14.6568542,-3.04359188e-16 16,1.34314575 16,3 L16,11 C16,12.6568542 14.6568542,14 13,14 L3,14 C1.34314575,14 2.02906125e-16,12.6568542 0,11 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L13,0 Z M13.2496893,6.5 C12.8353041,6.5 12.4993786,6.83578644 12.4993786,7.25 L12.4993786,7.25 L12.4993786,10.2456177 L12.4927732,10.3029405 C12.4668519,10.4133843 12.3676708,10.4956177 12.249275,10.4956177 L12.249275,10.4956177 L9.25031071,10.4956177 L9.14849799,10.5024644 C8.78227077,10.5521268 8.5,10.865922 8.5,11.2456177 C8.5,11.6598313 8.83592555,11.9956177 9.25031071,11.9956177 L9.25031071,11.9956177 L12.249275,11.9956177 L12.3928617,11.9898165 C13.2925968,11.9168101 14,11.1637911 14,10.2456177 L14,10.2456177 L14,7.25 L13.9931505,7.14822944 C13.9434676,6.78215388 13.6295424,6.5 13.2496893,6.5 Z M6.74772239,2 L3.75,2 L3.60647279,2.0058012 C2.70711027,2.07880766 2,2.8318266 2,3.75 L2,3.75 L2,6.74561775 L2.00684662,6.8473883 C2.05650904,7.21346387 2.37030423,7.49561775 2.75,7.49561775 C3.16421356,7.49561775 3.5,7.15983131 3.5,6.74561775 L3.5,6.74561775 L3.5,3.75 L3.50660268,3.69267729 C3.53251318,3.58223341 3.63165327,3.5 3.75,3.5 L3.75,3.5 L6.74772239,3.5 L6.84949294,3.49315338 C7.21556851,3.44349096 7.49772239,3.12969577 7.49772239,2.75 C7.49772239,2.33578644 7.16193595,2 6.74772239,2 L6.74772239,2 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|表格阅读模式（十字光标）
        + '<symbol id="icoTableCross">'
        + '<path d="M13,0 C14.6568542,-3.04359188e-16 16,1.34314575 16,3 L16,11 C16,12.6568542 14.6568542,14 13,14 L3,14 C1.34314575,14 2.02906125e-16,12.6568542 0,11 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L13,0 Z M1,11 C1,12.0543618 1.81587779,12.9181651 2.85073766,12.9945143 L3,13 L5,13 L5,10 L11,10 L11,13 L13,13 C14.0543618,13 14.9181651,12.1841222 14.9945143,11.1492623 L15,11 L15,10 L11,10 L11,7 L15,7 L15,3 C15,1.8954305 14.1045695,1 13,1 L11,1 L11,7 L5,7 L5,1 L3,1 C1.9456382,1 1.08183488,1.81587779 1.00548574,2.85073766 L1,3 L1,7 L5,7 L5,10 L1,10 L1,11 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|画中画
        + '<symbol id="icoPicInPic">'
        + '<path d="M13,0 C14.6568542,-3.04359188e-16 16,1.34314575 16,3 L16,6 L15,6 L15,3 C15,1.9456382 14.1841222,1.08183488 13.1492623,1.00548574 L13,1 L3,1 C1.8954305,1 1,1.8954305 1,3 L1,3 L1,11 C1,12.1045695 1.8954305,13 3,13 L3,13 L7,13 L7,14 L3,14 C1.34314575,14 2.02906125e-16,12.6568542 0,11 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L13,0 Z M14,7 C15.1045695,7 16,7.8954305 16,9 L16,12 C16,13.1045695 15.1045695,14 14,14 L10,14 C8.8954305,14 8,13.1045695 8,12 L8,9 C8,7.8954305 8.8954305,7 10,7 L14,7 Z M2.66274033,2.66274829 C2.87972744,2.44575057 3.23153306,2.44575057 3.44852017,2.66274829 L3.44852017,2.66274829 L6.38842247,5.57186872 L6.38874078,3.61039798 C6.38874078,3.30351686 6.63750491,3.05474055 6.94437103,3.05474055 C7.25123715,3.05474055 7.5,3.30351686 7.5,3.61039798 L7.5,3.61039798 L7.5,6.94434257 C7.5,7.25122369 7.25123715,7.5 6.94437103,7.5 L6.94437103,7.5 L3.61058951,7.5 C3.30372339,7.5 3.05495926,7.25122369 3.05495926,6.94434257 C3.05495926,6.63746144 3.30372339,6.38868514 3.61058951,6.38868514 L3.61058951,6.38868514 L5.63387659,6.38868514 L2.66274033,3.44856657 C2.44575322,3.23156884 2.44575322,2.87974602 2.66274033,2.66274829 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|复制代码块
        + '<symbol id="icoCopyCodeBlock">'
        + '<path d="M14.1508,0 C15.1714721,0.00110186107 15.9986773,0.828128183 16,1.84879999 L16,12.1512 C15.9986773,13.1718718 15.1714721,13.9988981 14.1508,14 L11.6,14 L11.6,14.1512 C11.5988977,15.1718071 10.7718071,15.9988977 9.7512,16 L1.84879999,16 C0.828192884,15.9988977 0.00110229095,15.1718071 0,14.1512 L0,3.84879999 C0.00110229095,2.82819288 0.828192884,2.00110229 1.84879999,2 L4.4,2 L4.4,1.84879999 C4.40132267,0.828128183 5.22852793,0.00110186107 6.2492,0 L14.1508,0 Z M1.8492,14.8 L9.7508,14.8 C10.1089136,14.7993404 10.3991196,14.5093131 10.4,14.1512 L10.4,3.84879999 C10.4,3.49119999 10.1088,3.2 9.7512,3.2 L1.8492,3.2 C1.4916,3.2 1.19999999,3.49119999 1.19999999,3.84879999 L1.19999999,14.1512 C1.19999999,14.5092 1.4916,14.8 1.8492,14.8 Z M8.20000001,5.59999999 C8.53137085,5.59999999 8.80000001,5.86862915 8.80000001,6.19999999 C8.80000001,6.53137083 8.53137085,6.8 8.20000001,6.8 L3.39999999,6.8 C3.06862915,6.8 2.80000001,6.53137083 2.80000001,6.19999999 C2.80000001,5.86862915 3.06862915,5.59999999 3.39999999,5.59999999 L8.20000001,5.59999999 L8.20000001,5.59999999 Z M8.20000001,8.4 C8.53137085,8.4 8.80000001,8.66862916 8.80000001,9 C8.80000001,9.33137084 8.53137085,9.6 8.20000001,9.6 L3.39999999,9.6 C3.06862915,9.6 2.80000001,9.33137084 2.80000001,9 C2.80000001,8.66862916 3.06862915,8.4 3.39999999,8.4 L8.20000001,8.4 L8.20000001,8.4 Z M6.60000001,11.2 C6.93137086,11.2 7.20000001,11.4686292 7.20000001,11.8 C7.20000001,12.1313709 6.93137086,12.4 6.60000001,12.4 L3.39999999,12.4 C3.06862914,12.4 2.79999999,12.1313709 2.79999999,11.8 C2.79999999,11.4686292 3.06862914,11.2 3.39999999,11.2 L6.60000001,11.2 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|加载中
        + '<symbol id="icoLoading">'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '<path d="M6.72865086,1.26496983 C6.71911605,1.71977213 6.95629588,2.14416725 7.34865392,2.37436546 C7.74101196,2.60456367 8.2271863,2.60456367 8.61954434,2.37436546 C9.01190238,2.14416725 9.24908222,1.71977213 9.23954741,1.26496983 C9.23959745,0.816309443 9.00026873,0.401708736 8.61172578,0.177364095 C8.22318283,-0.0469805467 7.74446372,-0.0469805467 7.35592077,0.177364095 C6.96737782,0.401708736 6.72804909,0.816309443 6.72809913,1.26496983 L6.72865086,1.26496983 L6.72865086,1.26496983 Z M1.85885777,3.33890086 C1.85885777,4.01230737 2.4047616,4.5582112 3.07816811,4.5582112 C3.75157462,4.5582112 4.29747845,4.01230737 4.29747845,3.33890086 C4.29747845,2.66549435 3.75157462,2.11959052 3.07816811,2.11959052 C2.4047616,2.11959052 1.85885777,2.66549435 1.85885777,3.33890086 L1.85885777,3.33890086 Z M0.00285776562,7.92428017 C0.00293049529,8.5373029 0.499903995,9.03421744 1.11292673,9.03421744 C1.72594946,9.03421744 2.22292296,8.5373029 2.22299569,7.92428017 C2.22292296,7.31125744 1.72594946,6.8143429 1.11292673,6.8143429 C0.499903995,6.8143429 0.00293049529,7.31125744 0.00285776562,7.92428017 Z M1.96809914,12.9275905 C1.96816693,13.4601736 2.39992984,13.8918816 2.93251293,13.8918816 C3.46509602,13.8918816 3.89685893,13.4601736 3.89692672,12.9275905 C3.89685893,12.3950074 3.46509602,11.9632995 2.93251293,11.9632995 C2.39992984,11.9632995 1.96816693,12.3950074 1.96809914,12.9275905 L1.96809914,12.9275905 Z M7.18382328,15.0175215 C7.18382328,15.4809837 7.55953357,15.856694 8.0229957,15.856694 C8.48645782,15.856694 8.86216811,15.4809837 8.86216811,15.0175215 C8.86216811,14.5540594 8.48645782,14.1783491 8.0229957,14.1783491 C7.55953357,14.1783491 7.18382328,14.5540594 7.18382328,15.0175215 Z M12.5874095,13.0920043 C12.5874095,13.4241369 12.8566562,13.6933836 13.1887888,13.6933836 C13.5209214,13.6933836 13.7901681,13.4241369 13.7901681,13.0920043 C13.7901681,12.7598717 13.5209214,12.490625 13.1887888,12.490625 C12.8566562,12.490625 12.5874095,12.7598717 12.5874095,13.0920043 Z M15.0892026,7.90138363 C15.0892026,8.13677119 15.2800219,8.32759052 15.5154095,8.32759052 C15.7507971,8.32759052 15.9416164,8.13677119 15.9416164,7.90138363 C15.9416164,7.66599606 15.7507971,7.47517673 15.5154095,7.47517673 C15.2800219,7.47517673 15.0892026,7.66599606 15.0892026,7.90138363 Z M13.8089267,3.4310388 C13.8089267,3.59916189 13.9452174,3.73545259 14.1133405,3.73545259 C14.2814636,3.73545259 14.4177543,3.59916189 14.4177543,3.4310388 C14.4177543,3.2629157 14.2814636,3.126625 14.1133405,3.126625 C13.9452174,3.126625 13.8089267,3.2629157 13.8089267,3.4310388 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|播放
        + '<symbol id="icoPlay">'
        + '<path d="M14.1329221,9.60458431 L6.2734657,15.6325342 C5.34309563,16.2655554 4.05015741,16.0602894 3.38560736,15.1740596 C3.13481735,14.8396114 3,14.4388779 3,14.0278733 L3,1.97197357 C3,0.882882638 3.92685626,-1.95399252e-14 5.07019139,-1.95399252e-14 C5.50166685,-1.95399252e-14 5.92235968,0.128421099 6.2734657,0.367312671 L14.1329221,6.39526252 C15.0632922,7.02828376 15.2787819,8.25988003 14.6142318,9.14610977 C14.4814505,9.32318416 14.318816,9.4781026 14.1329221,9.60458431 Z"></path>'
        + '<rect id="Rectangle" fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|暂停
        + '<symbol id="icoPause">'
        + '<path d="M4,2 C5.1045695,2 6,2.8954305 6,4 L6,12 C6,13.1045695 5.1045695,14 4,14 L3,14 C1.8954305,14 1,13.1045695 1,12 L1,4 C1,2.8954305 1.8954305,2 3,2 L4,2 Z M13,2 C14.1045695,2 15,2.8954305 15,4 L15,12 C15,13.1045695 14.1045695,14 13,14 L12,14 C10.8954305,14 10,13.1045695 10,12 L10,4 C10,2.8954305 10.8954305,2 12,2 L13,2 Z"></path>'
        + '<rect  fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|停止
        + '<symbol id="icoStop">'
        + '<rect x="2" y="2" width="12" height="12" rx="2"></rect>'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|无法播放
        + '<symbol id="icoForbidden">'
        + '<path d="M3.11014702,4.52295457 C1.18968426,7.22400289 1.82212581,10.9699964 4.52157146,12.8902277 C6.60400096,14.3708881 9.39599904,14.3708881 11.4784285,12.8902277 L3.11014702,4.52295457 Z M4.52157146,3.10977226 L12.889853,11.4770454 C14.8103157,8.77599711 14.1798024,5.03000361 11.4784285,3.10977226 C9.39599904,1.62911194 6.60400096,1.62911194 4.52157146,3.10977226 L4.52157146,3.10977226 Z M8,16 C3.58062184,16 0,12.4178817 0,8.00096397 C0,3.58404627 3.58062184,0 8,0 C12.4193782,0 16,3.58211833 16,8.00096397 C16,12.4198096 12.4193782,16 8,16 Z"></path>'
        + '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（未选择）
        + '<symbol id="icoCheckbox_uncheck">'
        + '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 -1.73547709e-16,12.209139 0,10 L0,4 C-7.1463071e-16,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,1 L4,1 L3.79460158,1.00692108 C3.04801112,1.05740265 2.37633177,1.38102754 1.87867966,1.87867966 C1.33578644,2.42157288 1,3.17157288 1,4 L1,4 L1,10 L1.00692108,10.2053984 C1.05740265,10.9519889 1.38102754,11.6236682 1.87867966,12.1213203 C2.42157288,12.6642136 3.17157288,13 4,13 L4,13 L10,13 L10.2053984,12.9930789 C10.9519889,12.9425974 11.6236682,12.6189725 12.1213203,12.1213203 C12.6642136,11.5784271 13,10.8284271 13,10 L13,10 L13,4 L12.9930789,3.79460158 C12.9425974,3.04801112 12.6189725,2.37633177 12.1213203,1.87867966 C11.5784271,1.33578644 10.8284271,1 10,1 L10,1 Z" opacity="0.5"></path>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（已选择）
        + '<symbol id="icoCheckbox_checked">'
        + '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 -1.13860385e-13,12.209139 -1.13686838e-13,10 L-1.13686838e-13,4 C-1.14401468e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10.4345054,3.35937475 C9.98210026,3.04259723 9.35855448,3.15254517 9.04177696,3.60495035 L9.04177696,3.60495035 L5.70337129,8.3716637 L4.42132034,7.08974545 C4.03079605,6.69922116 3.39763107,6.69922116 3.00710678,7.08974545 C2.61658249,7.48026975 2.61658249,8.11343472 3.00710678,8.50395902 L3.00710678,8.50395902 L5.12842712,10.6252794 C5.44611554,10.9429678 5.92437612,11.0022192 6.30159501,10.8029483 C6.31888566,10.7941174 6.33594939,10.7847657 6.35288228,10.7742207 L6.36250295,10.7684416 L6.36250295,10.7684416 L6.37216074,10.7632115 C6.48435662,10.6938722 6.58459456,10.6010641 6.665046,10.4861675 L6.665046,10.4861675 L10.6800811,4.75210323 C10.9968586,4.29969805 10.8869106,3.67615226 10.4345054,3.35937475 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|复选框（不确定选择）
        + '<symbol id="icoCheckbox_indeterminate">'
        + '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 2.27200128e-13,12.209139 2.27373675e-13,10 L2.27373675e-13,4 C2.26659045e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,6 L4,6 C3.44771525,6 3,6.44771525 3,7 C3,7.55228475 3.44771525,8 4,8 L4,8 L10,8 C10.5522847,8 11,7.55228475 11,7 C11,6.44771525 10.5522847,6 10,6 L10,6 Z" opacity="0.5"></path>'
        + '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 1.1351329e-13,12.209139 1.13686838e-13,10 L1.13686838e-13,4 C1.12972207e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,1 L4,1 L3.79460158,1.00692108 C3.04801112,1.05740265 2.37633177,1.38102754 1.87867966,1.87867966 C1.33578644,2.42157288 1,3.17157288 1,4 L1,4 L1,10 L1.00692108,10.2053984 C1.05740265,10.9519889 1.38102754,11.6236682 1.87867966,12.1213203 C2.42157288,12.6642136 3.17157288,13 4,13 L4,13 L10,13 L10.2053984,12.9930789 C10.9519889,12.9425974 11.6236682,12.6189725 12.1213203,12.1213203 C12.6642136,11.5784271 13,10.8284271 13,10 L13,10 L13,4 L12.9930789,3.79460158 C12.9425974,3.04801112 12.6189725,2.37633177 12.1213203,1.87867966 C11.5784271,1.33578644 10.8284271,1 10,1 L10,1 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|链接检查结果正常
        + '<symbol id="icoLinkChecking">'
        + '<rect fill-opacity="0" x="0" y="0" width="20" height="18"></rect>'
        + '<path d="M8.72865086,2.26496983 C8.71911605,2.71977213 8.95629588,3.14416725 9.34865392,3.37436546 C9.74101196,3.60456367 10.2271863,3.60456367 10.6195443,3.37436546 C11.0119024,3.14416725 11.2490822,2.71977213 11.2395474,2.26496983 C11.2395975,1.81630944 11.0002687,1.40170874 10.6117258,1.17736409 C10.2231828,0.953019453 9.74446372,0.953019453 9.35592077,1.17736409 C8.96737782,1.40170874 8.72804909,1.81630944 8.72809913,2.26496983 L8.72865086,2.26496983 L8.72865086,2.26496983 Z M3.85885777,4.33890086 C3.85885777,5.01230737 4.4047616,5.5582112 5.07816811,5.5582112 C5.75157462,5.5582112 6.29747845,5.01230737 6.29747845,4.33890086 C6.29747845,3.66549435 5.75157462,3.11959052 5.07816811,3.11959052 C4.4047616,3.11959052 3.85885777,3.66549435 3.85885777,4.33890086 L3.85885777,4.33890086 Z M2.00285777,8.92428017 C2.0029305,9.5373029 2.499904,10.0342174 3.11292673,10.0342174 C3.72594946,10.0342174 4.22292296,9.5373029 4.22299569,8.92428017 C4.22292296,8.31125744 3.72594946,7.8143429 3.11292673,7.8143429 C2.499904,7.8143429 2.0029305,8.31125744 2.00285777,8.92428017 Z M3.96809914,13.9275905 C3.96816693,14.4601736 4.39992984,14.8918816 4.93251293,14.8918816 C5.46509602,14.8918816 5.89685893,14.4601736 5.89692672,13.9275905 C5.89685893,13.3950074 5.46509602,12.9632995 4.93251293,12.9632995 C4.39992984,12.9632995 3.96816693,13.3950074 3.96809914,13.9275905 L3.96809914,13.9275905 Z M9.18382328,16.0175215 C9.18382328,16.4809837 9.55953357,16.856694 10.0229957,16.856694 C10.4864578,16.856694 10.8621681,16.4809837 10.8621681,16.0175215 C10.8621681,15.5540594 10.4864578,15.1783491 10.0229957,15.1783491 C9.55953357,15.1783491 9.18382328,15.5540594 9.18382328,16.0175215 Z M14.5874095,14.0920043 C14.5874095,14.4241369 14.8566562,14.6933836 15.1887888,14.6933836 C15.5209214,14.6933836 15.7901681,14.4241369 15.7901681,14.0920043 C15.7901681,13.7598717 15.5209214,13.490625 15.1887888,13.490625 C14.8566562,13.490625 14.5874095,13.7598717 14.5874095,14.0920043 Z M17.0892026,8.90138363 C17.0892026,9.13677119 17.2800219,9.32759052 17.5154095,9.32759052 C17.7507971,9.32759052 17.9416164,9.13677119 17.9416164,8.90138363 C17.9416164,8.66599606 17.7507971,8.47517673 17.5154095,8.47517673 C17.2800219,8.47517673 17.0892026,8.66599606 17.0892026,8.90138363 Z M15.8089267,4.4310388 C15.8089267,4.59916189 15.9452174,4.73545259 16.1133405,4.73545259 C16.2814636,4.73545259 16.4177543,4.59916189 16.4177543,4.4310388 C16.4177543,4.2629157 16.2814636,4.126625 16.1133405,4.126625 C15.9452174,4.126625 15.8089267,4.2629157 15.8089267,4.4310388 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|链接检查结果正常
        + '<symbol id="icoLinkOK">'
        + '<path d="M10.8685137,7.01413306 C10.8603674,6.99758704 10.8549366,6.98104102 10.8467903,6.964495 C10.8440748,6.96173733 10.8440748,6.95897966 10.8413594,6.95346432 C10.6458484,6.55360221 10.2249565,6.29438125 9.75790233,6.33023095 C9.14693029,6.37986901 8.6880224,6.92312996 8.73690017,7.54360565 C8.75047732,7.7035505 8.79392422,7.849707 8.86181,7.98207515 C9.17136917,8.69079628 9.03559761,9.55394691 8.46535704,10.1358152 L5.47838262,13.1747673 C4.73706988,13.9276112 3.53141839,13.9276112 2.79010565,13.1747673 C2.04879291,12.4219235 2.04879291,11.1975181 2.79010565,10.4446743 L3.90343247,9.31402964 L3.89528618,9.30575664 C4.15325215,9.07962771 4.30260087,8.73491899 4.27544656,8.36539124 C4.2265688,7.74491555 3.69162883,7.27886936 3.08065679,7.32850741 C2.78739022,7.35056877 2.53213967,7.48845226 2.34749035,7.69251982 L2.34477492,7.68976215 L1.20972464,8.84246811 C-0.403241546,10.480524 -0.403241546,13.1334023 1.20972464,14.7714581 C2.82269082,16.409514 5.43493572,16.409514 7.04790191,14.7714581 L10.0430226,11.7297484 C11.2975519,10.4529473 11.569095,8.56394347 10.8685137,7.01413306 L10.8685137,7.01413306 Z"></path>'
        + '<path d="M14.7923119,1.22854188 C13.1793458,-0.409513961 10.5671009,-0.409513961 8.95413467,1.22854188 L5.95901396,4.27025164 C4.7044847,5.54429507 4.43294158,7.43329886 5.13080742,8.98310927 C5.13895371,8.99965529 5.14438457,9.01620131 5.15253087,9.03274733 C5.1552463,9.035505 5.1552463,9.03826267 5.15796173,9.04377801 C5.35347278,9.44364012 5.77436463,9.70286108 6.24141881,9.66701138 C6.85239085,9.61737332 7.31129874,9.07411238 7.26242098,8.45363668 C7.24884382,8.29369183 7.20539692,8.14753533 7.13751114,8.01516718 C6.82795197,7.30644605 6.96372354,6.44329542 7.53396411,5.86142709 L10.523654,2.82523268 C11.2649667,2.07238883 12.4706182,2.07238883 13.2119309,2.82523268 C13.9532437,3.57807653 13.9532437,4.8024819 13.2119309,5.55532575 L12.0986041,6.68597036 L12.1067504,6.69424336 C11.8487844,6.92037229 11.6994357,7.26508101 11.72659,7.63460876 C11.7754678,8.25508445 12.3104077,8.72113064 12.9213798,8.67149259 C13.2146464,8.64943123 13.4698969,8.51154774 13.6545462,8.30748018 L13.6572617,8.31023785 L14.7923119,7.15753189 C16.4025627,5.51947604 16.4025627,2.86384006 14.7923119,1.22854188 Z"></path>'
        + '<path d="M16,10 C18.2091404,10 20,11.7908606 20,14 C20,16.2091394 18.2091404,18 16,18 C13.7908596,18 12,16.2091394 12,14 C12,11.7908606 13.7908596,10 16,10 Z M17.6822792,12.5943032 L17.6771246,12.5990389 L15.1407928,14.9394845 L14.2240628,14.1910878 L14.2147843,14.1837134 C14.0430722,14.0516383 13.7963288,14.079336 13.6584279,14.2482481 C13.5194611,14.4184535 13.5431028,14.6682744 13.7103242,14.8095238 L13.7156012,14.8138925 L14.8814335,15.7656793 L14.890712,15.7730537 C14.9667027,15.831608 15.0611853,15.8609385 15.1569732,15.8557099 C15.2615489,15.8607738 15.3639537,15.8247085 15.4422806,15.7552294 L15.4484837,15.7496024 L18.2223678,13.189882 L18.2311046,13.1815815 C18.38585,13.0301092 18.3929966,12.7820183 18.2451708,12.6218261 C18.0961916,12.4603582 17.8456041,12.4486675 17.6822792,12.5943032 Z"></path>'
        + '</symbol>'
        // SVG 图标集：图标|链接检查结果异常
        + '<symbol id="icoLinkError">'
        + '<path d="M15,9 C15.2886741,9 15.5545759,9.15405217 15.6943297,9.40226501 L15.6943297,9.40226501 L19.8999835,16.8412623 C20.0367271,17.0829025 20.0330292,17.3776316 19.8902645,17.6158855 C19.7474998,17.8541393 19.4870188,18.0002871 19.2056539,18 L19.2056539,18 L10.7943461,18 C10.5129812,18.0002871 10.2525002,17.8541393 10.1097355,17.6158855 C9.96697079,17.3776316 9.9632729,17.0829025 10.1000165,16.8412623 L10.1000165,16.8412623 L14.3056703,9.40226501 C14.4454241,9.15405217 14.7113259,9 15,9 Z M15,15.6606918 C14.4741015,15.6606918 14.0477765,16.0796293 14.0477765,16.5964148 C14.0477765,16.9307164 14.2292692,17.2396238 14.5238882,17.4067746 C14.8185072,17.5739254 15.1814928,17.5739254 15.4761118,17.4067746 C15.7707308,17.2396238 15.9522235,16.9307164 15.9522235,16.5964148 C15.9522235,16.0796293 15.5258985,15.6606918 15,15.6606918 Z M15,10.9820772 L14.8732573,10.9874923 C14.4287394,11.0272027 14.2064804,11.2853208 14.2064804,11.7618463 L14.2064804,11.7618463 L14.2064804,14.1011536 C14.2064804,14.6209997 14.4709869,14.8809227 15,14.8809227 L15,14.8809227 L15.1267427,14.8755077 C15.5712606,14.8357972 15.7935196,14.5776792 15.7935196,14.1011536 L15.7935196,14.1011536 L15.7935196,11.7618463 C15.7935196,11.2420002 15.5290131,10.9820772 15,10.9820772 L15,10.9820772 Z"></path>'
        + '<path d="M8.61062487,5.50299998 C8.99983668,5.47312522 9.35057989,5.68914268 9.51350577,6.02236112 C9.51576863,6.02695723 9.51576863,6.02925529 9.51803149,6.03155335 C9.52482007,6.0453417 9.52934579,6.05913005 9.53613436,6.07291839 C10.1199521,7.36442707 9.89366615,8.9385969 8.8482251,10.0025978 L8.8482251,10.0025978 L6.35229118,12.5373559 C5.00815269,13.9024025 2.83128194,13.9024025 1.48714346,12.5373559 C0.14300497,11.1723094 0.14300497,8.96157748 1.48714346,7.59653094 L1.48714346,7.59653094 L2.43301869,6.63594264 C2.58915599,6.46818439 2.80186477,6.35328149 3.04625359,6.33489702 C3.55539695,6.29353198 4.00118026,6.6819038 4.04191173,7.19896688 C4.06454032,7.50690667 3.94008305,7.79416394 3.72511141,7.98260471 L3.72511141,7.98260471 L3.73189999,7.98949888 L2.80412763,8.93170272 C2.18636701,9.55907259 2.18636701,10.5794104 2.80412763,11.2067803 C3.42188825,11.8341502 4.42659783,11.8341502 5.04435844,11.2067803 L5.04435844,11.2067803 L7.53350379,8.67432021 C8.00870426,8.18942994 8.12184723,7.47013774 7.86388126,6.8795368 C7.80730978,6.76923001 7.77110403,6.64743293 7.75978973,6.51414556 C7.71905826,5.99708248 8.1014815,5.54436502 8.61062487,5.50299998 Z M11.392581,0.774705066 C13.2202354,0.200475309 15.1422982,1.22245422 15.6882515,3.05875357 C16.2332857,4.89196151 15.1943311,6.84595101 13.3686747,7.42124311 L13.3686747,7.42124311 L12.0825475,7.82533072 C11.8659287,7.90015044 11.6241744,7.90174296 11.3997609,7.80324188 C10.9307943,7.60073671 10.7195205,7.04854216 10.9263032,6.57288029 C11.0508923,6.29036211 11.2956406,6.09515815 11.5739169,6.0296979 L11.5739169,6.0296979 L11.5711596,6.02042366 L12.8326718,5.62406979 C13.6726544,5.36015611 14.151674,4.45925129 13.9007561,3.61529553 C13.6498381,2.77133977 12.7627322,2.29965719 11.9227497,2.56357087 L11.9227497,2.56357087 L8.53512766,3.62792603 C7.88790836,3.83296561 7.45032181,4.41494552 7.4008219,5.05752289 C7.39898565,5.18147671 7.37377317,5.30601472 7.32118847,5.42901222 C7.11440581,5.90467409 6.56420816,6.12486304 6.09524153,5.92235788 C5.73756255,5.76601184 5.52928873,5.41061578 5.5418703,5.0399123 C5.54203006,5.03479182 5.54310893,5.03276276 5.54218982,5.02967135 C5.5426691,5.01430991 5.54514636,5.00001083 5.54562564,4.98464939 C5.63846977,3.57129144 6.57729636,2.2876168 7.99880532,1.84099365 L7.99880532,1.84099365 Z"></path>'
        + '<path d="M0.782543585,3.4507195 L3.40869759,3.9137813 C3.7712938,3.9777168 4.01340614,4.32348905 3.94947064,4.68608526 C3.88553515,5.04868146 3.53976289,5.2907938 3.17716669,5.22685831 L0.551012682,4.7637965 C0.188416479,4.69986101 -0.0536958622,4.35408875 0.0102396313,3.99149255 C0.0741751249,3.62889634 0.419947383,3.386784 0.782543585,3.4507195 Z M3.67286326,0.33344465 L5.0061966,2.64284573 C5.19029151,2.96170748 5.08104141,3.36943441 4.76217966,3.55352933 C4.44331791,3.73762425 4.03559098,3.62837414 3.85149606,3.30951239 L2.51816273,1.00011132 C2.33406781,0.681249568 2.44331791,0.273522631 2.76217966,0.0894277143 C3.08104141,-0.0946672023 3.48876835,0.0145829012 3.67286326,0.33344465 Z"></path>'
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
                + '<div class="v-doc-lib-board item"></div>'
                + '<div class="v-doc-lib-board flip"></div>'
                + '<div class="v-doc-lib-board flip"></div>'
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
            + '<div style="float: left; margin-bottom: 30px;">'
                + '<img alt="小清新" class="v-font-theme-opt-sans" src="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-sans.png" srcset="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-sans@2x.png 2x">'
                + '<div class="v-fontinfo-sans"><span class="v-font-package">Font Package - </span><span id="fontset-sans-status">Loading... 0%</span></div>'
            + '</div>'
            + '<div style="float: right; margin-bottom: 30px;">'
                + '<img alt="文艺范" class="v-font-theme-opt-serif" src="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-serif.png" srcset="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-serif@2x.png 2x">'
                + '<div class="v-fontinfo-serif"><span class="v-font-package">Font Package - </span><span id="fontset-serif-status">Loading... 0%</span></div>'
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
            + '<div class="v-btn assistor copy-code-block">'
                + V_ui_generateSvgIcon("icoCopyCodeBlock", 16, 16, s_Light)
            + '</div>'
            + '<div class="v-btn assistor pic-in-pic">'
                + V_ui_generateSvgIcon("icoPicInPic", 16, 14, s_Light)
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
    ui += '<div data-v-direction="1" class="v-table-cross left-up">&nbsp;</div>'
        + '<div data-v-direction="2" class="v-table-cross right-up">&nbsp;</div>'
        + '<div data-v-direction="3" class="v-table-cross left-down">&nbsp;</div>'
        + '<div data-v-direction="4" class="v-table-cross right-down">&nbsp;</div>';

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
                + V_ui_generateSvgIcon("icoLinkChecking", 20, 18, s_Light)
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
    // 添加主题色
    // $("head").append("<meta name='theme-color' content='" + V_util_getVarVal("--v-btn-bg") + "'>");

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
    gTimes = iStopwatch.lapStop(s_4space);
    // 打印环境信息
    env.print();

    iStopwatch.lapStart();
    INFO("=== Load VLOOK ===");

    // ----------------------------------------
    // 初始化语言
    V_lang_init();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 动效初始化
    iStopwatch.lapStart("* Effect");
    let effect = V_util_getParamVal(s_Effect);
    V_ui_effect = (effect === gUndefined) ? 2 : parseInt(effect);
    V_ui_effect = env.device.mobile ? 0 : V_ui_effect;
    LOG("    └ Level [ " + V_ui_effect + " ]");
    V_ui_initEffectLevel();
    iStopwatch.lapStop(s_Cost);

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.lapStart("* Welcome Page Init");
    let wsMode = V_util_getParamVal("ws");
    wsMode = (wsMode === gUndefined) ? s_Auto : wsMode;
    LOG("    └ mode: " + wsMode);
    iWelcomePage = new WelcomePage(wsMode);
    if (iWelcomePage === gFalse)
        A(s_Failed + "iWelPg ]");

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (V_checkSpec() === gFalse) {
        $(".v-welcome-page").hide();
        $(".v-toolbar").hide();
        $(".v-btn").hide();
        return;
    }
    iStopwatch.lapStop(s_Cost);

    // ----------------------------------------
    // 初始化关键组件实例
    iStopwatch.lapStart("* Intance");
    V_init();
    iStopwatch.lapStop(s_Cost);

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
    iStopwatch.lapStart("* Browser Check");
    if (env.browser.Chrome === gFalse && env.browser.Firefox === gFalse && env.browser.Safari === gFalse) {
        V_report_push(['Error', 'Browser', navigator.userAgent, ]);
        A([
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

    iStopwatch.lapStop(s_4space);

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
            // "--v-tag-small-radius",
            s_varRC__
        ]);
    }

    // ----------------------------------------
    // 段落导航初始化
    __fork("Paragraph Nav", function () {
        ParagraphNav.init();
    }, 100);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.lapStart("* Write Ready");
    VOM_doc().addClass("v-load-done v-focus-search");
    iStopwatch.lapStop(s_4space);

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
        iLinkTool.mdToHtml();
        iLinkTool.checkLink();
    }, 250);

    // ----------------------------------------
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    __fork("Color Scheme", function () {
        ColorScheme.scheme = V_util_getVarVal("--v-color-scheme").trim();
        INFO("    System [ " + ColorScheme.scheme + " ]");
        ColorScheme.init();
        // 判断当前文档是否强制指定了颜色方案
        let colorScheme = V_util_getParamVal("cs");
        if (colorScheme === s_Light || colorScheme === s_Dark) {
            INFO("    Force use [ " + colorScheme + " ]");
            ColorScheme.toggle(colorScheme);
        }
        // 若系统当前颜色方案是 dark，则强制同步
        else if (ColorScheme.scheme === s_Dark)
            ColorScheme.toggle(ColorScheme.scheme);
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
        iContentAssistor.init();
        PicInPic.init();
    }, 400);

    // ----------------------------------------
    // URL 带锚点的处理
    __fork("Redirect to Hash", function () {
        let redirect = V_util_redirectTo();
        if (VOM_cover() === gUndefined && redirect === gFalse) {
            iNavCenter.catalog.currentHeaderIndex = 0;
            V_ui_adjustAll();
        }
    }, 450);

    // ----------------------------------------
    // 字数统计
    // if (V_type === "max") {
    __fork("Words count", function () {
        iDocInfo.countWord();
        // __countWord();
    }, 500);
    // }

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.lapStart();
    INFO("* Welcome Page Done (" + iWelcomePage.mode + ")");
    iWelcomePage.done();
    iStopwatch.lapStop(s_Cost);

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
            sw.lapStart("* thread * [" + msg + "]");
            typeof(callback) === "function" && callback();
            sw.lapStop(s_4space);
        }, delay);
    }
}
