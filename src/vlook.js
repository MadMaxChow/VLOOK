/**************************************
 *
 * VLOOK JS - Typora Plugin
 *
 * V23.0
 * 2024-03-14
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * Telegram Channel: t.me/vlook_markdown
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 * https://gitee.com/madmaxchow/VLOOK
 *
 *************************************/

let gVer = "V23.0",
    iStopwatch = new Stopwatch(), // 初始化计时器
    gUndefined = undefined,
    gTrue = true,
    gFalse = false,
    gTimes = 0,
    gTotalTimes = 0,
    gLastHash = null,
    // **********
    // 修改时须同步修改 media.less 的同名参数
    gSmallScreenWidth = 1270,
    // **********
    gToc = gUndefined, // 文档大纲对象
    gTocContent = gUndefined, // 文档大纲内容
    gStyle = gUndefined, // 文档的 style 对象
    // 以下 _xxx_ 格式变量为字符串
    _100pc_ = "100%",
    _ = "",
    ___ = " ",
    _4space_ = ___+___+___+___,
    _absolute_ = "absolute",
    _actived_ = "actived",
    _alt_ = "alt",
    _alter_ = "alter",
    _alpha_ = "alpha",
    _audio_ = "audio",
    _animation_ = "animation",
    _auto_ = "auto",
    _autoplay_ = "autoplay",
    _background_ = "background",
    _backgroundColor_ = _background_ + "-color",
    _backgroundImage_ = _background_ + "-image",
    _beforePrint_ = "before-print-",
    _width_ = "width",
    _maxWidth_ = "max-width",
    _beforePrintWidth_ = _beforePrint_ + _width_,
    _beforePrintMaxWidth_ = _beforePrint_ + _maxWidth_,
    _block_ = "block",
    _blockquote_ = "blockquote",
    _bold_ = "bold",
    _border_ = "border",
    _borderBottomWidth_ = _border_ + "-bottom-width",
    _borderBottomRightRadius_ = _border_ + "-bottom-right-radius",
    _borderColor_ = _border_ + "-color",
    _borderImage_ = _border_ + "-image",
    _borderRadius_ = _border_ + "-radius",
    _borderWidth_ = _border_ + "-width",
    _borderLeftWidth_ = _border_ + "-left-width",
    _borderTopWidth_ = _border_ + "-top-width",
    _bottom_ = "bottom",
    _boxShadow_ = "box-shadow",
    _br_ = "<br>",
    _bubble_ = "bubble",
    _card_ = "card",
    _catalog_ = "catalog",
    _center_ = "center",
    _cssText_ = "cssText",
    _checkbox_ = "checkbox",
    _checked_ = "checked",
    __checked_ = "-" + _checked_,
    _class_ = "class",
    _click_ = "click",
    _code_ = "code",
    _codeblock_ = "codeblock",
    _color_ = "color",
    _colspan_ = "colspan",
    _content_ = "content",
    _controls_ = "controls",
    _cursor_ = "cursor",
    _cost_ = "    COST ",
    _cover_ = "cover",
    _dark_ = "dark",
    _darksrc_ = "darksrc",
    _darksrcset_ = "darksrcset",
    _dataAnchor_ = "d-anchor",
    _dataAsMarkdown_ = "d-as-markdown",
    _dataBeforePrintFolded_ = "d-before-print-folded",
    _dataBtnGroup_ = "d-btn-group",
    _dataCaptionCount_ ="d-cap-count",
    _dataCatalogEmpty_ = "d-catalog-empty",
    _dataCellMerge_ = "d-cell-merge",
    _dataChk_ = "data-chk",
    _dataClipboardText_ = "data-clipboard-text",
    _dataColspan_ = "d-colspan",
    _dataColumnFmting_ = "d-column-fmting",
    _dataContainer_ = "d-cntr",
    _dataContentExpanded_ = "d-content-expanded",
    _dataContentFolded_ = "d-content-folded",
    _dataContentType_ = "d-content-type",
    _dataDefault_ = "d-default",
    _dataExtend_ = "d-extend",
    _dataFigNum_ = "d-fig-num",
    _dataFigType_ = "d-fig-type",
    _dataFolded_ = "d-folded",
    _dataFolder_ = "d-folder",
    _dataFolderId_ = "d-folder-id",
    _dataFolding_ = "d-folding",
    _dataForSearch_ = "data-for-search",
    _dataDarkSrc_ = "d-darksrc",
    _dataDuration_ = "d-duration",
    _dataFigGrid_ = "d-fig-grid",
    _dataHeaderNum_ = "d-header-num",
    _dataHash_ = "d-hash",
    _dataHistory_ = "d-history",
    _dataIcon_ = "d-icon",
    _dataIdFigType_ = "d-id-fig-type",
    _dataKeywordMatch_ = "d-keyword-match",
    // _dataLmc_ = "d-lmc",
    _dataNode_ = "d-node",
    _dataPage_ = "d-page",
    _dataParentFolderId_ = "d-parent-folder-id",
    _dataPid_ = "d-pid",
    _dataQuoteGroup_ = "d-quote-group",
    _dataRef_ = "data-ref",
    _dataRbCellBg_ = "d-rb-cell-bg",
    _dataRbText_ = "d-rb-text",
    _dataRbWholeText_ = "d-rb-whole-text",
    _dataRowFolded_ = "d-row-folded",
    _dataRowOpenMode_ = "d-row-open-mode",
    _dataSrc_ = "d-src-",
    _dataSrcDark_ = "d-src-dark",
    _dataSrcLight_ = "d-src-light",
    _dataSrcset_ = "d-srcset-",
    _dataSrcsetDark_ = "d-srcset-dark",
    _dataSrcsetLight_ = "d-srcset-light",
    _dataTd2th_ = "d-td2th",
    _dataTitle_ = "d-title",
    _dataId_ = "d-id",
    _dataIdentLevel_ = "d-ident-level",
    _dataImgFill_ = "d-img-fill",
    _dataPause_ = "d-pause",
    _dataPgIdx_ = "d-pg-idx",
    _dataResult_ = "d-result",
    _dataCoatingHidden_ = "d-coating-hidden",
    _dataCoatingTip_ = "d-coating-tip",
    _dataCoatingShowed_ = "d-coating-showed",
    _dataRowGroup_ = "d-row-group",
    _dataTblCol_ = "d-tbl-col",
    _dataTblX_ = "d-tbl-x",
    _dataThRpt_ = "d-th-rpt",
    _dataTips_ = "d-tips",
    _del_ = "del",
    _details_ = "details",
    _disabled_ = "disabled",
    _display_ = "display",
    _div_ = "div",
    _docLib_ = "doc-lib",
    _docLibToc_ = _docLib_ + "-toc",
    _docIcon_ = "doc-icon-",
    _effect_ = "effect",
    _enabled_ = "enabled",
    _enabled__first_ = "enabled first",
    _enabled__last_ = "enabled last",
    _emptied_ = "emptied",
    _error_ = "error",
    _failed_ = "Failed [ ",
    _false_ = "false",
    _fig_ = "fig",
    // _figcaption_ = "figcaption",
    // _figcaptionHTML_ = "<" + _figcaption_ + "></" + _figcaption_ + ">",
    _figure_ = "figure",
    _fill_ = "fill",
    _filter_ = "filter",
    _first_ = ":first",
    _first__enable__last_ = "first enabled last",
    _firstChild_ = _first_ + "-child",
    _float_ = "float",
    _font_ = "Font",
    _fontTheme_ = "font-theme",
    _footnotesArea_ = "footnotes-area",
    _freeze_ = "freeze",
    _function_ = "function",
    _h6_ = "h6",
    _height_ = "height",
    _hidden_ = "hidden",
    _hover_ = "hover",
    _hoverAction_ = "hover-action",
    _href_ = "href",
    _ico_ = "ico",
    _alert_ = "Alert",
    _icoAlertNote_ = _ico_ + _alert_ + "Note",
    _icoAlertTip_ = _ico_ + _alert_ + "Tip",
    _icoAlertImportant_ = _ico_ + _alert_ + "Important",
    _icoAlertWarning_ = _ico_ + _alert_ + "Warning",
    _icoAlertCaution_ = _ico_ + _alert_ + "Caution",
    _icoChkbox__ = _ico_ + "Chkbox_",
    _icoClose_ = _ico_ + "Close",
    _icoCopy_ = _ico_ + "Copy",
    _icoCopyAsMd_ = _ico_ + "CopyAsMd",
    _icoDarkMode_ = _ico_ + "DarkMode",
    _icoDetailsOpen_ = _ico_ + "DetailsOpen",
    _icoDocLib_ = _ico_ + "DocLib",
    _icoDocLibExt_ = _ico_ + "DocLibExt",
    _icoFolded_ = _ico_ + "Folded",
    _icoFontTheme_ = _ico_ + "FontTheme",
    _icoForbidden_ = _ico_ + "Forbidden",
    _icoLaserPointer_ = _ico_ + "LaserPointer",
    _icoLightMode_ = _ico_ + "LightMode",
    _icoLinkError_ = _ico_ + "LinkError",
    _icoLoading_ = _ico_ + "Loading",
    _icoMaskCloser_ = _ico_ + "MaskCloser",
    _icoNavCenter_ = _ico_ + "NavCenter",
    _icoOpenInFigureNav_ = _ico_ + "OpenInFigureNav",
    _icoParagraphNav_ = _ico_ + "ParagraphNav",
    _icoPause_ = _ico_ + "Pause",
    _icoPicInPic_ = _ico_ + "PicInPic",
    _icoPlay_ = _ico_ + "Play",
    _icoPrevFig_ = _ico_ + "PrevFig",
    _icoPrevChapter_ = _ico_ + "PrevChapter",
    _icoPrint_ = _ico_ + "Print",
    _icoResetInput_ = _ico_ + "ResetInput",
    _icoRetrieval_ = _ico_ + "Retrieval",
    _icoSpotlight_ = _ico_ + "Spotlight",
    _icoStop_ = _ico_ + "Stop",
    _icoTableX_ = _ico_ + "TableX",
    _icoTocFolded_ = _ico_ + "TocFolded",
    _icoTocTab_ = _ico_ + "TocTab",
    _icoTocTabCatalog_ = _icoTocTab_ + "Catalog",
    _icoTocTabCodeblock_ = _icoTocTab_ + "Codeblock",
    _icoTocTabFigure_ = _icoTocTab_ + "Figure",
    _icoTocTabHistory_ = _icoTocTab_ + "History",
    _icoTocTabMedia_ = _icoTocTab_ + "Media",
    _icoTocTabTable_ = _icoTocTab_ + "Table",
    _icoTableWrap_ = _ico_ + "TableWrap",
    _VLOOK_ = "VLOOK",
    _icoVLOOK_ = _ico_ + _VLOOK_,
    _icoZoomIn_ = _ico_ + "ZoomIn",
    _icoZoomOut_ = _ico_ + "ZoomOut",
    _id_ = "id",
    _fontsetStatus_ = "fontset-status",
    _iframe_ = "iframe",
    _img_ = "img",
    _important_ = " !important;",
    _input_ = "input",
    _inStart_ = "in-start",
    _invert_ = "invert",
    _italic_ = "italic",
    _italic_bold_ = "/" + _italic_ + "/bold",
    _label_ = "label",
    _lang_ = "lang",
    _laserPointer_ = "laser-pointer",
    _last_ = ":last",
    _lastChild_ = ":last-child",
    _left_ = "left",
    _light_ = "light",
    _linkChecker_ = "link-checker",
    _line_ = "line",
    _linearGradient_ = "linear-gradient",
    _loading_ = "loading",
    _loop_ = "loop",
    _margin_ = "margin",
    _right_ = "right",
    _marginBottom_ =_margin_ +  "-bottom",
    _marginLeft_ = _margin_ + "-" + _left_,
    _marginRight_ = _margin_ + "-" + _right_,
    _mark_ = "mark",
    _mata_ = "meta",
    _maxHeight_ = "max-height",
    _media_ = "media",
    _mdTocItem_ = "md-toc-item",
    _min_ = "min",
    _mini_ = "mini",
    _minWidth_ = "min-width",
    _mouse_ = "mouse",
    _mouseDown_ = _mouse_ + "down",
    _mouseUp_ = _mouse_ + "up",
    _mouseEnter_ = _mouse_ + "enter",
    _mouseLeave_ = _mouse_ + "leave",
    _name_ = "name",
    _navCenter_ = "nav-center",
    _no_ = "no",
    _none_ = "none",
    _normal_ = "normal",
    _normal_normal_ = "/" + _normal_ + "/" + _normal_,
    _normal_bold_ = "/" + _normal_ + "/" + _bold_,
    _normal_500_ = "/" + _normal_ + "/500",
    _normal_900_ = "/" + _normal_ + "/900",
    _normal_italic_ = "/" + _italic_ + "/" + _normal_,
    _notLoaded_ = "NOT LOADED",
    _off_ = "off",
    _on_ = "on",
    _opacity_ = "opacity",
    _open_ = "open",
    _opened_ = "opened",
    _outerHTML_ = "outerHTML",
    _outlineStyle_ = "outline-style",
    // _outline_ = "outline",
    _outlineWidth_ = "outline-width",
    _overflow_ = "overflow",
    _overflowX_ = _overflow_ + "-x",
    _overflowY_ = _overflow_ + "-y",
    _padding_ = "padding",
    _paddingBottom_ = _padding_ + "-bottom",
    _paddingLeft_ = _padding_ + "-left",
    _paddingRight_ = _padding_ + "-right",
    _paddingTop_ = _padding_ + "-top",
    _paragraphNav_ = "paragraph-nav",
    _placeholder_ = "placeholder",
    _playing_ = "playing",
    _position_ = "position",
    _pre_ = "pre",
    _preload_ = "preload",
    _preWrap_ = "pre-wrap",
    _print_ = "print",
    _ready_ = "Ready",
    _rowspan_ = "rowspan",
    _rx_ = "rx",
    _ry_ = "ry",
    _selected_ = "selected",
    _span_ = "span",
    _sub_ = "sub",
    _spotlight_ = "spotlight",
    _src_ = "src",
    _srcset_ = "srcset",
    _stroke_ = "stroke",
    _strong_ = "strong",
    _style_ = "style",
    _svg_ = "svg",
    _suffixImg_ = "." + _img_,
    _suffixSvg_ = "." + _svg_,
    _summary_ = "summary",
    _tabindex_ = "tabindex",
    _table_ = "table",
    _tagName_ = "tagName",
    _target_ = "target",
    _text_ = "text",
    _textAlign_ = _text_ + "-align",
    _textLength_ = _text_ + "Length",
    _textShadow_ = _text_ + "-shadow",
    _theme_ = "theme",
    _title_ = "title",
    _vlookToc_ = "vlook-toc",
    _tocItem_ = "#" + _vlookToc_ + ">." + _mdTocItem_,
    _toolbarSpliter_ = "toolbar-spliter",
    _top_ = "top",
    _transform_ = "transform",
    _transformOrigin_ = _transform_ + "-origin",
    _true_ = "true",
    _ttf_ = "ttf",
    _hastwo_ = "hastwo",
    _un_ = "un",
    _unfreeze_ = "unfreeze",
    _vdl_ = "vdl",
    _vkHeader_ = "vk-header-",
    _vkIdDocTitle_ = "vk-id-doc-title",
    _vkIdFig_ = "vk-id-fig",
    _vkIdAudio_ = "vk-id-audio",
    _vkIdVideo_ = "vk-id-video",
    _vkIdTbl_ = "vk-id-tbl",
    _vkIdCodeblock_ = "vk-id-codeblock",
    _vkIdMiniAudio_ = "vk-id-mini-audio",
    _vlookDocLib_ = "vlook-doc-lib",
    _vlookStatGitee_ = "vlook-stat-gitee",
    _varAcRedLg_ = V_ui_var("--ac-rd-lg"),
    _varAcOrangeLg_ = V_ui_var("--ac-og-lg"),
    _varAcCyanLg_ = V_ui_var("--ac-cy-lg"),
    _varColorScheme_ = "--v-color-scheme",
    _varDBc_ = V_ui_var("--d-bc"),
    _varDFC_ = V_ui_var("--d-fc"),
    _varMarkBg_ = V_ui_var("--mark-bg"),
    _varMmCyan_ = V_ui_var("--mm-c-cy"),
    _varMmOrange_ = V_ui_var("--mm-c-og"),
    _varMmRed_ = V_ui_var("--mm-c-rd"),
    _varNavCenterHiddenLeft_ = "--v-nav-center-hidden-l",
    _varNavCenterWidth_ = V_ui_var("--v-nav-center-w"),
    _V_R_ = "--v-r-",
    _V_R_B_ = _V_R_ + "b",
    _varVRB_ = V_ui_var(_V_R_B_),
    _V_R_C_ = _V_R_ + "c",
    _V_R_S_ = _V_R_ + "s",
    _V_R_T_ = _V_R_ + "t",
    _V_R_Tag_ = _V_R_ + "tag",
    _varTblRowAlpha_ = V_ui_var("--tbl-row-g-alpha"),
    _vAccentBtn_ = "v-accent-btn",
    _vActorKeySys_ = "v-actor-key-sys",
    _vActorExtSys_ = "v-actor-ext-sys",
    _vAudioMiniControl_ = "v-audio-mini-control",
    _vBackdropBlurs_ = "v-backdrop-blurs",
    _vBadge_ = "v-badge-",
    _vBadgeName_ = _vBadge_ + "name",
    _value_ = "value",
    _vBadgeValue_ = _vBadge_ + _value_,
    _vBlockquoteFolder_ = "v-blockquote-folder",
    _vBtn_ = "v-btn",
    _vBtn__BtnGroup_ = "." + _vBtn_ + ", ." + _vBtn_ + "-group",
    _vBtn_Assistor_ = "." + _vBtn_ + ".assistor",
    _vColorScheme_ = "v-color-scheme",
    _vCap1_ = ".v-cap-1",
    _vCap2_ = ".v-cap-2",
    _vCaptionContainer_ = "v-cap-cntr",
    _vCaption_Mermaid_ = "v-caption.mermaid",
    _vChapterNav_ = "v-chapter-nav",
    _vCodeMirrorLine_ = "CodeMirror-line",
    _vCopyright_ = "v-copyright",
    _vCopyrightSvgIco_ = _vCopyright_ + "-svg-ico",
    _vCursorLaser_ = "v-cursor-laser",
    _vDoc_ = "v-doc-",
    _vDocInfo_ = _vDoc_ + "info",
    _vDocLib_ = _vDoc_ + "lib",
    _vDocLibItem_ = _vDocLib_ + "-item",
    _vDocLog_ = _vDoc_ + "logo-",
    _expander_ = "expander",
    _vFences_ = "md-fences",
    _vFloatCard_ = "v-float-card",
    _vFig_ = "v-fig",
    _vFigContent_ = "v-fig-content",
    _vFigNav_ = _vFig_ + "-nav",
    _vFigNavBtns_ = "." + _vFigNav_ + "-btns",
    _vFocusSearch_ = "v-focus-serch",
    _vFontInfo_ = "v-fontinfo-",
    _vFontnotePn_ = "v-footnote-pn",
    _vFontPackage_ = "v-font-package",
    _vFontThemeOpt_ = "v-font-theme-opt",
    _vInfoTips_ = "v-info-tips",
    _vStdCode_ = "v-std-code",
    _vBreadcrumbStyle_ = "v-stepwise",
    _vTag_ = "v-tag",
    _vTocHistory_ = "v-toc-history",
    _vToolTips_ = "v-tool-tips",
    _vToolbar_ = "v-toolbar",
    _vImgInvertDark_ = "v-img-invert-dark",
    _vLinkChkResult_ = "v-link-chk-result",
    _vLinkErrorList_ = "v-link-error-list",
    _vMdToc_ = "md-toc",
    _vMermaidRestyler_ = "v-mermaid-restyler",
    _vMoreDocContent_ = "v-more-doc-content-",
    _vNavCenter_ = "v-nav-center-",
    _vNavCenterBlock_ = _vNavCenter_ + "block",
    _vNavCenterFloat_ = _vNavCenter_ + "float",
    _vPgCurrentItem_ = "v-pg-current-item",
    _vPipBtn_ = ".v-pip-btn",
    _vCoating_ = "v-coating",
    _vRotate_ = "v-rotate",
    _vRotate45_ = _vRotate_ + "45",
    _vRotate90_ = _vRotate_ + "90",
    _vSegmentBtn_ = "v-segment-btn",
    _vStsFontTheme_ = "v-sts-font-theme",
    _vSpotlightInDark_ = "v-spotlight-in-dark",
    _vStatusBar_ = "v-status-bar",
    _vSvgDetails_ = "v-svg-details",
    _vTblX_ = ".v-tbl-x",
    _vTblXCell_ = "v-tbl-x-cell",
    _vTblRow_ = "v-tbl-row-",
    _vTblRowGFolder_ = _vTblRow_ + "g-folder",
    _vTblRowGIdenterFolder_ = _vTblRow_ + "g-identer-folder",
    _vTblRowGNotFolder_ = _vTblRow_ + "g-not-folder",
    _vTblRowGBtn_ = "." + _vTblRow_ + "g-btn",
    _vTblRowNumHidden_ = _vTblRow_ + "num-hidden",
    _vTblColFmt__ = "v-tbl-col-fmt-",
    _vTblColFmt_Chkbox_ = _vTblColFmt__ + "chkbox",
    _vTblColFmt_Bold_ = _vTblColFmt__ + "bold",
    _vTblColFmt_Em_ = _vTblColFmt__ + "em",
    // _vTblColFmt_U_ = _vTblColFmt__ + "u",
    _vTblColFmtMark_ = _vTblColFmt__ + _mark_,
    // _vTblColFmtDel_ = _vTblColFmt__ + _del_,
    _vTblColFmtNum_ = _vTblColFmt__ + "num",
    _vTblColFmtNumDecimal_ = _vTblColFmt__ + "num-decimal",
    _vTblColFmtNumNegative_ = _vTblColFmt__ + "num-negative",
    _vTblColFmtNumPositive_ = _vTblColFmt__ + "num-positive",
    _vTblColFmtPercent_ = _vTblColFmt__ + "percent",
    _vTblColFmtCurrency_ = _vTblColFmt__ + "currency",
    _vTblRowGSub_ = _vTblRow_ + "g-sub",
    _vTblRowGIdenter_ = _vTblRow_ + "g-identer",
    _vTextFieldFocus_ = "v-textfield-focus",
    _vThRepeater_ = "v-th-repeater",
    _vTocFolder_ = ".v-toc-folder",
    _vTocFilterResult_ = "v-toc-filter-result",
    _vTocItem_ = "v-toc-item",
    _vTocItemCurrent_ = _vTocItem_ + "-current",
    _vTransitionAll_ = "v-transition-all",
    _verticalAlign_ = "vertical-align",
    _video_ = "video",
    _viewBox_ = "viewBox",
    _visible_ = "visible",
    _visibility_ = "visibility",
    _wait_ = "wait",
    _whiteSpace_ = "white-space",
    _write_ = "#write",
    _woff2_ = "woff2",
    _writeMarginLeft_ = "calc(" + _varNavCenterWidth_ + " + 30px)",
    _yes_ = "yes",
    _zIndex_ = "z-index",
    _nbsp_ = "&nbsp;",
    _2nbsp_ = _nbsp_ + _nbsp_;
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
// 在 debug 模式下输出调试信息
function DEBUG(...info) {
    if (V_debugMode) {
        ERROR("| DEBUG INFO |");
        WARN(...info);
    }
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

function JQ_removeAttr(target, attrName) {
    if (target !== gUndefined)
        target.removeAttr(attrName);
}

function JQ_exchangeClass(target, oldClassName, newClassName) {
    if (target !== gUndefined) {
        target.removeClass(oldClassName);
        target.addClass(newClassName);
    }
}

function JQ_remove(target) {
    if (target !== gUndefined)
        target.remove();
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

// prev 简化版
$.prototype.pr = function (value) {
    return this.prev(value);
}

// next 简化版
$.prototype.n = function (value) {
    return this.next(value);
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
$.prototype.hm = function (value) {
    if (value === gUndefined)
        return this.html();
    else
        return this.html(value);
}

// width 简化版
$.prototype.w = function () {
    return this.width();
}
// innerWidth 简化版
$.prototype.iW = function () {
    return this.innerWidth();
}
// outerWidth 简化版
$.prototype.oW = function (margin) {
    if (margin !== gTrue)
        return this.outerWidth();
    else
        return this.outerWidth(gTrue);
}

// height 简化版
$.prototype.h = function () {
    return this.height();
}
// innerHeight 简化版
$.prototype.iH = function () {
    return this.innerHeight();
}

// offset 简化版
$.prototype.o = function () {
    return this.offset();
}

// offset().left 简化版
$.prototype.oL = function () {
    return this.offset().left;
}

// offset().top 简化版
$.prototype.oT = function () {
    return this.offset().top;
}

// position 简化版
$.prototype.pos = function () {
    return this.position();
}

// parent 简化版
$.prototype.p = function () {
    return this.parent();
}

// parents 简化版
$.prototype.ps = function (value) {
    return this.parents(value);
}

// append 简化版
$.prototype.ap = function (value) {
    return this.append(value);
}

// prepend 简化版
$.prototype.pp = function (value) {
    return this.prepend(value);
}

// after 简化版
$.prototype.af = function (value) {
    return this.after(value);
}

// before 简化版
$.prototype.bf = function (value) {
    return this.before(value);
}

// replaceWith 简化版（outerHTML）
$.prototype.rW = function (value) {
    return this.replaceWith(value);
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
    return this.unbind(_click_);
}

// unbind("hover") 简化版
$.prototype.uH = function () {
    return this.unbind(_hover_);
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

// replaceAll 简化版
String.prototype.rA = function (regExpString, value) {
    const re = new RegExp(regExpString, "g");
    return this.replaceAll(re, value);
}

// 去掉字符串中的英文句号 .
String.prototype.xD = function () {
    return this.replaceAll(/\./g, _);
}

// trim 简化版
String.prototype.x = function () {
    return this.trim();
}

// startsWith 简化版
String.prototype.sW = function (value) {
    return this.startsWith(value);
}

// endsWith 简化版
String.prototype.eW = function (value) {
    return this.endsWith(value);
}

// indexOf 简化版
String.prototype.i = function (value) {
    return this.indexOf(value);
}

// toLowerCase 简化版
String.prototype.l = function () {
    return this.toLowerCase();
}

// substring 简化版
String.prototype.s = function (start, end) {
    return this.substring(start, end);
}

// split 简化版
String.prototype.sp = function (exp) {
    return this.split(exp);
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
// LOG(devMode,lVer);
LOG("!!! " + (devMode ? "- DEV -" : "RELEASED" ) + " !!!");
LOG("::: " + gVer + " :::");
LOG(":::::::::::::::::::");

INFO("=== Load Document ===");

// UI 元素
let iToolbar = gUndefined,
    iNavCenter = gUndefined,
    iChapterNav = gUndefined,
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
            ERROR(_failed_ + "DOM.html ]");
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
            ERROR(_failed_ + "DOM.body ]");
        }
    }
    return DOM_b;
}

// ==================== VLOOK 对象模型 ==================== //

// Markdown 导出为 HTML 的内容对象
let VOM_d = gUndefined;
function VOM_doc() {
    if (VOM_d === gUndefined) {
        VOM_d = $(_write_);
        if (VOM_d.length === 0) {
            VOM_d = gUndefined;
            ERROR(_failed_ + "VOM.doc ]");
        }
    }
    return VOM_d;
}

// 封面对象
let VOM_c = gUndefined;
function VOM_cover() {
    if (VOM_c === gUndefined) {
        VOM_c = $(_write_ + ">pre.md-meta-block" + _firstChild_ + "+" + _h6_ + ", " + _write_ + ">" + _h6_ + _firstChild_);
        if (VOM_c.length === 0) {
            VOM_c = gUndefined;
            if (VOM_docTitle() === gUndefined)
                WARN(_failed_ + "VOM.c ], maybe no cover: " + WINDOW_getHref());
        }
    }
    return VOM_c;
}

// 封底对象
let VOM_bc = gUndefined;
function VOM_backcover() {
    // 注意该方法调用，必须在 #vk-footer-area 的位置调整前完成
    if (VOM_bc === gUndefined) {
        let fns = $("." + _footnotesArea_);
        if (fns !== gUndefined) {
            let backcover = fns.pr(),
                tagName = V_util_getTagName(backcover);
            if (tagName === "h1")
                VOM_bc = backcover;
        }
        else {
            VOM_bc = gUndefined;
            WARN(_failed_ + "VOM.bc ], maybe no backcover");
        }
    }
    return VOM_bc;
}

// 文档标题对象（无封面模式）
let VOM_dt = gUndefined;
function VOM_docTitle() {
    if (VOM_dt === gUndefined) {
        VOM_dt = $("#" + _vkIdDocTitle_);
        if (VOM_dt.length === 0) {
            VOM_dt = gUndefined;
            WARN(_failed_ + "VOM.dt ] " + WINDOW_getHref());
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
        && (T.c(_display_) === _none_ || T.c(_visibility_) === _hidden_ || T.c(_opacity_) === "0");
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
    this.hm(pre + this.hm() + suff);
}

/**
 * 替换 innerHTML 的内容
 * @param exp 用于匹配内容的正则表达式
 * @param value 将匹配的内容替换成该内容
*/
$.prototype.rHTML = function (exp, value) {
    this.hm(this.hm().replace(exp, value));
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
    return /^(\D{1,3} )([-+])*\d+(\.\d+)?$/.test(this);
}

/**
 * 环境信息类
 */
const env = {
    /*
    Windows 平台样例：
        - (Chrome) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
        - (Edge) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362
        - (Firefox) Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0

    macOS 平台样例：
        - (Safari) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.2 Safari/605.1.15
        - (Chrome) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
        - (Edge) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35
        - (Firefox) Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:69.0) Gecko/20100101 Firefox/69.0

    iPhone 平台样例：
        - (Safari) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1
        - (Chrome) Mozilla/5.0 (iPhone; CPU iPhone OS 15_02 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/97.0.04692.72 Mobile/15E148 Safari/604.1
        - (Edge) Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0
        - (Firefox) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/40.2 Mobile/15E148 Safari/605.1.15
        // 以下情况建议暂按以内核为判断标准 //
        - (QQ) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QQ/8.9.75.613 V1_IPH_SQ_8.9.75_1_APP_A Pixel/1125 MiniAppEnable SimpleUISwitch/0 StudyMode/0 CurrentMode/0 CurrentFontScale/1.000000 QQTheme/1000 AppId/537172547 Core/WKWebView Device/Apple(iPhone XS) NetType/WIFI QBWebViewType/1 WKType/1
        - (微信) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x18002830) NetType/WIFI Language/zh_CN
        - (钉钉) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20G75 AliApp(DingTalk/7.0.50) com.laiwang.DingTalk/31322509 Channel/201200 language/zh-Hans-CN UT4Aplus/0.0.6 WK
    */

    // 浏览器内核信息
    core : function () {
        const u = navigator.userAgent;
        return {
            trident: u.i("Trident") > -1, // IE内核
            presto: u.i("Presto") > -1, // Opera内核
            webkit: u.i("AppleWebKit") > -1, // 苹果、谷歌内核
            gecko: u.i("Gecko") > -1 && u.i("KHTML") === -1 // 火狐内核
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
            Chrome: (u.i("Chrome") > -1 && u.i("Edg") < 0) || u.i("CriOS") > -1, // Chrome 浏览器
            Firefox: u.i("Firefox") > -1 || u.i("FxiOS") > -1, // Firefox 浏览器
            Safari: u.i("Safari") > -1 && (u.i("Chrome") < 0 || u.i("CriOSc") < 0 || u.i("Edg") < 0 || u.i("FxiOS") < 0), // Safari 浏览器
            Edge: u.i("Edg") > -1 // Edge 浏览器
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
            Linux: /linux/i.test(u) // 是否为 Linux 平台
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
    print : function (silent = gFalse) {
        let info = "::: Environmental :::\n",
            r = info;
        if (!silent) LOG(info);

        info = "    ├ Language   [ "
            + env.language.base
            + (env.language.subset.length > 0 ? "_" + env.language.subset : _)
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Device     [ "
            + (env.device.mobile ? "Mobile" : _)
            + (env.device.iOS ? "/iOS" : _)
            + (env.device.android ? "/Android" : _)
            + (env.device.iPhone ? "/iPhone" : _)
            + (env.device.iPad ? "/iPad" : _)
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
            + (env.browser.Chrome ? "Chrome / " + env.browserVer.Chrome : _)
            + (env.browser.Firefox ? "Firefox / " + env.browserVer.Firefox : _)
            + (env.browser.Safari ? "Safari / " + env.browserVer.Safari : _)
            + (env.browser.Edge ? "Edge / " + env.browserVer.Edge : _)
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Core       [ "
            + (env.core.gecko ? "Gecko" : _)
            + (env.core.presto ? "Presto" : _)
            + (env.core.trident ? "Trident" : _)
            + (env.core.webkit ? "WebKit" : _)
            + " ]\n";
        r += info;
        if (!silent) LOG(info);

        info = "    ├ DPR        [ "
            + env.display.DPR
            + " ]\n"; // Device Pixel Ratio
        r += info;
        if (!silent) LOG(info);

        info = "    ├ Theme      [ "
            + V_util_getTemplateTheme()
            + " ]\n"; // 文档风格主题
        r += info;
        if (!silent) LOG(info);

        info = "    └ VLOOK Type [ "
            + V_pageMode
            + " ]\n"; // VLOOK 插件运行类型
        r += info;
        if (!silent) LOG(info);

        info = navigator.userAgent + "\n";
        r += info;
        if (!silent) LOG(info);

        return r;
    },

    // 打印 Mermaid 缩放信息
    printMermaidDPR : function () {
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

let V_ver = gVer, // VLOOK 版本信息
    V_debugMode = debugMode, // 是否为开发模式
    V_pageMode = "max", // 页面模式：max, pro, mini
    V_params_url = [], // VLOOK 的调校参数
    V_params_yaml = []; // VLOOK 文档的 YAML

// 初始化调校参数
function V_params_init() {
    V_params_url = V_util_getUrlQueryParams(WINDOW_getHref());
    let vp = V_util_getMetaByName("vlook-query");
    V_params_yaml = V_util_getUrlQueryParams("file.html" + (vp !== gUndefined ? "?" + vp : _));
}
// ========================================

// ========================================
// VLOOK 本地数据读/写
// 获得数据
// function V_data_get(key) {
//     return localStorage[_VLOOK_ + "-" + key];
// }
// 写入数据
// function V_data_set(key, value) {
//     localStorage[_VLOOK_ + "-" + key] = value;
// }
// ========================================

// ========================================
// VLOOK 工具包
/**
 * 获取 HTML 文档标题
 */
function V_util_getDocTitle() {
    return $(document).a(_title_);
}

/**
 * 获取 HTML <meta> 标签的内容
 * @param metaName 指定 meta 的名称
 * @returns 指定 meta 的内容
 */
function V_util_getMetaByName(metaName) {
    let content = $(_mata_ + V_attrX(_name_, metaName)).a(_content_);
    return ((content === gUndefined || content.length === 0 || content === "${" + metaName + "}") ? gUndefined : content);
}
// function V_util_getMetaByProperty(metaProperty) {
//     let content = $(_mata_ + V_attrX("property", metaProperty)).a(_content_);
//     return ((content === gUndefined || content.length === 0) ? gUndefined : content);
// }

/**
 * 获取启动参数的值
 * @param pName 启动参数名称
 * @returns string 启动参数的值
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
function V_util_getUrlQueryParams(u) {
    let h = u.i("#");
    u = h > -1 ? u.s(0, h) : u; // 只截取 URL 中 # 前的内容

    let si = u.i("?"),
        qs = u.s(si > -1 ? si + 1 : u.length, u.length), // 获取url中"?"符后的字串
        p = {}, // 保存参数数据的对象
        is = (qs.length > 0) ? qs.sp("&") : [], // 取得每一个参数项,
        item = null,
        l = is.length;

    // 将所有参数拆解至数组中
    for (let i = 0; i < l; i++) {
        item = is[i].sp("=");
        p[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
    }
    return p;
}

/**
 * 获取 URL 中的锚点
 * @param u 完整的 URL 内容
 */
function V_util_getUrlHash(u) {
    let i = u.i("#");
    return i > -1 ? u.s(i, u.length) : _;
}

/**
 * 获取 URL 中的参数字符串
 * @param u 完整的 URL 内容
 */
function V_util_getUrlQueryString(u) {
    let i = u.i("?");
    return i > -1 ? u.s(i + 1, u.length) : _;
}

/**
 * 获取 URL 中的不含锚点的部分
 * @param u 完整的 URL 内容
 */
function V_util_getUrlWithoutHash(u) {
    let i = u.i("#");
    return i > -1 ? u.s(0, i) : u;
}

/**
 * 获取 URL 中的不含锚点、参数的部分
 * @param u 完整的 URL 内容
 */
function V_util_getUrlPathWithoutQueryAndHash(u) {
    let queryIdx = u.i('?');
    if (queryIdx > -1)
        u = u.s(0, queryIdx);
    else {
        let hashIdx = u.i('#');
        if (hashIdx > -1)
            u = u.s(0, hashIdx);
    }
    return u;
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
// function V_util_htmlEncode(text) {
//     if (text.length === 0)
//         return _;
//     return text.r(/&/g, "&amp;")
//         .r(/</g, "&lt;")
//         .r(/>/g, "&gt;")
//         .r(/ /g, "&nbsp;")
//         .r(/'/g, "&apos;")
//         .r(/"/g, "&quot;")
//         .r(/<br>/g, _);
// }

/**
 * 进行 HTML 标签符转义
 * @param text 原始文本
 * @return String 转义后文本
 */
function V_util_htmlTagEncode(text) {
    if (text.length === 0)
        return _;
    return text.r(/</g, "&lt;")
        .r(/>/g, "&gt;");
}

/**
 * 进行 HTML 单、双引号转义
 * @param text 原始文本
 * @return String 转义后文本
 */
// function V_util_htmlQuotEncode(text) {
//     if (text.length === 0)
//         return _;
//     return text.r(/'/g, "&apos;")
//         .r(/"/g, "&quot;");
// }

/**
 * 清理 HTML 中的单、双引号
 * @param text 原始文本
 * @return String 清理后的文本
 */
function V_util_clearHtmlQuot(text) {
    if (text.length === 0)
        return _;
    return text.r(/'/g, _)
        .r(/"/g, _);
}

/**
 * 处理并返回省略后的文本
 * @param text 原始文本
 * @param limit 头、尾长度限制
 * @return String 省略后的文本
 */
function V_util_ellipsisText(text, limit) {
    // 多个空格替换为 1 个
    text = text.r(/\s+/g, ___);

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
     * @returns string 新的字符串
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
     * @param str 原始字符
     * @param limit 限制长度
     * @param cjk CJK 字符数组
     * @returns string 新的字符串
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
    let hash = WINDOW_getHash();
    // 如果 URL 带锚点
    if (hash.length > 0 && hash !== "#" + _vkIdDocTitle_) {
        LOG("    ↩ Redirect to h: " + JS_decodeURI(hash));
        WINDOW_setHref("#"); // 强制先清空当前 hash
        WINDOW_setHref(hash);
        // 若最后访问的锚点与本次相同，则强制进行一次微调
        setTimeout(function () {
            V_ui_tuningScrollTop(hash);
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
/**
 * 获取 HTML 文档使用的模板主题
 */
function V_util_getTemplateTheme() {
    return V_util_getVarVal("--v-theme-name").rA('"', _).x();
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
 * 获取 HTML 标签名称
 * @param target 标签对象
 */
function V_util_getTagName(target) {
    let tagName = (target === gUndefined ? _ : target.prop(_tagName_));
    return (tagName === gUndefined ? _ : tagName.l());
}

/**
 * 生成用反引号包裹的文本
 * @param text 文本
 */
function V_util_wrapBackquote(text) {
    let bq1 = __hasBackquote(text) ? "`` " : "`",
        bq2 = __hasBackquote(text) ? " ``" : "`";
    return bq1 + text + bq2;

    // 是否含有反引号 `
    function __hasBackquote(text) {
        return (text.i("`") > -1);
    }
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
    return str.r(/\.(\d+)/, "." + V_ui_span(_vTblColFmtNumDecimal_, _, "$1"));
    // return str.r(/\.(\d+)/, ".<span class='v-tbl-col-fmt-num-decimal'>$1</span>");
}

/**
 * 对百分号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_percent(str) {
    return str.r(/%</, V_ui_span(_vTblColFmtPercent_, _, " %") + "<");
}

let gRE_CurrencyNoEscape = new RegExp("<\\/" + _span_ + "><" + _span_ + ">([$])<\\/" + _span_ + "><" + _span_ + ">", _),
    gRE_CurrencyNoEscape2 = new RegExp(">([$])<\\/" + _span_ + "><" + _span_ + ">", _);
/**
 * 对货币符号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_currency(str) {
    // 对于存在转义符号 $ 时（与 Markdown 的数学公式格式冲突，所以一般会写成 \$）
    // 先将其处理成不存在转义的标准形式，如：HK$
    str = str.r(gRE_CurrencyNoEscape, "$1");
    // str = str.r(/<\/span><span>([$])<\/span><span>/, "$1");
    str = str.r(gRE_CurrencyNoEscape2, ">$1");
    // str = str.r(/>([$])<\/span><span>/, ">$1");
    // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
    return str.r(/>([a-z$¥￥]{0,3})\s/i, ">" + V_ui_span(_vTblColFmtCurrency_, _, "$1"));
}
// ========================================

// ========================================
// 检查文档结构是否符合 VLOOK 规范程度
function V_checkSpec () {
    let v = gTrue,
        c = [
            "因以下原因无法激活 VLOOK 插件：\n\n",
            "The VLOOK plugin cannot be activated for the following reasons:\n\n"
            ][V_lang_id];

    // 只支持由 Typora 导出的 HTML 文件
    if (DOM_body().a(_class_).i("typora-export") === -1) {
        c += [
            "• 只支持由 Typora 导出的 HTML 文件\n",
            "• Only HTML files exported by Typora are supported\n"
            ][V_lang_id];
        v = gFalse;
    }

    // 缺少目录
    gToc = $("." + _vMdToc_);
    if (gToc.length === 0) {
        c += [
            "• 缺少 [TOC], 这是 GFM 标准的「目录」语法\n",
            "• Missing [TOC], the GFM standard \"Table of Content\"\n"
            ][V_lang_id];
    }

    // 存在不符合规范的情况
    if (!v) {
        c += [
            "\n建议参考文档模板：",
            "\nSuggestion Reference document template: "
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
    iFontTheme = new FontTheme(new BgMask(_fontTheme_, _center_), V_util_getVarVal("--v-f-theme"));
    if (iFontTheme === gFalse)
        ALERT(_failed_ + "iFntThm ]");
    else
        iFontTheme.init(V_util_getParamVal("wf")); // 初始化
    sw.ed("    ├ Font Themer: ");

    // ==================== UI --------------------

    // 聚光灯
    sw.st();
    iSpotlight = new Spotlight(180, new BottomTips(_spotlight_));
    if (iSpotlight === gFalse)
        ALERT(_failed_ + "iSpotlight ]");
    sw.ed("    ├ Spotlight: ");

    // 激光笔
    iLaserPointer = new LaserPointer(new BottomTips("laserPointe"));
    if (iLaserPointer === gFalse)
        ALERT(_failed_ + "iPter ]");
    sw.ed("    ├ LaserPointer: ");

    // 长内容折叠
    sw.st();
    let cf = V_util_getParamVal("cf");
    ContentFolder_enabled = (cf !== _off_);
    // 指定对象（table,figure,codeblock）启用的处理
    if (cf !== gUndefined && cf !== _on_ && cf !== _off_) {
        ContentFolder_enabled_table = (cf.i(_table_) > -1);
        ContentFolder_enabled_figure = (cf.i(_figure_) > -1);
        ContentFolder_enabled_codeblock = (cf.i(_codeblock_) > -1);
    }
    ContentFolder_init();
    sw.ed("    ├ Content Folding: ");

    // 工具提示
    ToolTips_init();

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BgMask("info-tips", _center_));
    if (iInfoTips.length === 0)
        ALERT(_failed_ + "iInfoTips ]");

    // 导航中心
    sw.st();
    let runMode = V_util_getParamVal("nc");
    iNavCenter = new NavCenter(new BgMask(_navCenter_, _left_, gTrue), runMode);
    if (iNavCenter === gFalse)
        ALERT(_failed_ + "iNavCenter ]");
    sw.ed("    ├ Nav Center: ");

    // 逐章导航
    sw.st();
    iChapterNav = new ChapterNav(iNavCenter);
    if (iChapterNav === gFalse)
        ALERT(_failed_ + "iChapNav ]");
    else {
        // 添加关联组件
        iNavCenter.chpNav = iChapterNav;
    }
    sw.ed("    ├ Chapter Nav: ");

    // 工具栏
    sw.st();
    iToolbar = new Toolbar(iNavCenter, iChapterNav);
    if (iToolbar === gFalse)
        ALERT(_failed_ + "iTb ]");
    else {
        // 导航中心按钮
        iToolbar.add(_navCenter_, function () {
            iNavCenter.tg();
        });

        // 文库
        iToolbar.add(_docLib_, function () {
            if (iNavCenter.docLib.counter > 1) {
                if (!iNavCenter.showed)
                    iNavCenter.tg();
                iNavCenter.keyword.input.focus();
                iNavCenter.keyword.input.val(_vdl_);
                iNavCenter.keyword.input.select();
            }
            else
                iNavCenter.docLib.show(_, _);
        });

        // 分隔条
        iToolbar.addSpliter(_toolbarSpliter_);

        // 段落导航
        iToolbar.add(_paragraphNav_, function () {
            iInfoTips.inform([
                "开启方式：<br />" + V_ui_strong("三击文档中的「任意段落」"),
                "Open method:<br />" + V_ui_strong("three click \"any paragraph\" in the document")
            ][V_lang_id], 10000, gTrue);
        });

        // 聚光灯
        iToolbar.add(_spotlight_, function () {
            iLaserPointer.hide();
            if (iSpotlight.tg())
                iParagraphNav.hide();
        });

        // 激光笔
        iToolbar.add(_laserPointer_, function () {
            iSpotlight.hide();
            if (iLaserPointer.tg())
                iParagraphNav.hide();
        });

        // 打印按钮
        iToolbar.add(_print_, function () {
            V_print_ready();
        });

        // 添加关联组件
        iNavCenter.toolbar = iToolbar;
        iSpotlight.toolbar = iToolbar;
        iLaserPointer.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontTheme.bindButton(iToolbar.btns[_fontTheme_]);
    }
    sw.ed("    ├ Toolbar: ");

    // 插图浏览器
    sw.st();
    iFigNav = new FigureNav();
    if (iFigNav === gFalse)
        ALERT(_failed_ + "iFigNav ]");
    sw.ed("    ├ Figure Nav: ");

    // ----------------------------------------
    sw.st();

    // 文档更多内容栏遮罩栏
    MoreDocContent_init();

    // 脚注
    iFootNote = new FootNote(new BgMask("foot-note", _bottom_, gTrue));
    if (iFootNote === gFalse)
        ALERT(_failed_ + "iFootNote ]");

    // 状态栏相关
    StsDocInfo_init();
    // StsDocLib_init();
    StsFontTheme_init();
    StsColorScheme_init();
    // StsZoomView_init();
    StsLinkTool_init(new BgMask(_linkChecker_, _right_, gTrue));

    // 状态栏
    StatusBar_init();
    StatusBar_add("doc-info", StsDocInfo_ui);
    StatusBar_add(_fontTheme_, StsFontTheme_ui);
    StatusBar_add("color-scheme", StsColorScheme_ui);
    StatusBar_add(_linkChecker_, StsLinkTool_ui);

    sw.ed("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
function V_initKernel() {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.st("* Document Logo");
    let icoLg = $("." + _vDocLog_ + _light_).c(_backgroundImage_),
        icoDk = $("." + _vDocLog_ + _dark_).c(_backgroundImage_);
    $("head").ap("<link rel='icon' id='" + _docIcon_ + _light_ + "' " + V_attr(_href_ , icoLg.s(5, icoLg.length - 2)) + " type='image/x-icon'/>"
        + "<link rel='icon' id='" + _docIcon_ + _dark_ + "' " + V_attr(_href_, icoDk.s(5, icoDk.length - 2)) + " type='image/x-icon'/>");
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 无封面时的处理
    if (VOM_cover() === gUndefined) {
        let pageMode = _;
        // 页面模式为 mini 时的处理
        if (V_pageMode === _mini_) {
            pageMode = " mini";
            JQ_addClass(MoreDocContent_ui_before, _mini_);
        }
        // 添加文档大标题
        VOM_doc().pp(V_ui_div(_vkIdDocTitle_, _vDoc_ + "title" + pageMode, V_util_getDocTitle()));
    }

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.st("* UI i18n");
    V_ui_initI18n();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化题注生成器配置
    if (V_util_getParamVal("capauto") === _on_)
        CaptionGenerator_autoContent = gTrue;

    // ----------------------------------------
    // 初始化音频数据
    iStopwatch.st("* Audio: ");
    ExtAudio_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化视频数据
    iStopwatch.st("* Video: ");
    ExtVideo_init();
    iStopwatch.ed(_4space_);

    // ========================================
    // 初始化引用块
    // 须在 ExtFigure 处理前，避免引用块折叠处理中，对其内含有 svg 颜色替换处理导致 DOM 冲突而失效
    iStopwatch.st("* Quote: ");
    ExtQuote_init();
    ExtQuote_adjustHoverStyle();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化插图数据
    iStopwatch.st("* Figure: ");
    ExtFigure_init();
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // 初始化表格
    iStopwatch.st("* Table: ");
    ExtTable_init();
    iStopwatch.ed(_cost_);

    TableCross_init();
    // 设置表格阅读模式的开关状态（不指定则默认开启）
    RowGroup_adjustHoverStyle();

    // ----------------------------------------
    // 初始化代码块
    iStopwatch.st("* Code Block: ");
    ExtCodeBlock_init();
    iStopwatch.ed(_4space_);

    // ========================================
    // Code Magic 处理
    // （注意：须在 ExtQuote 初始化之后执行）
    // 包括了：标签、徽章、引用块着色、刮刮卡、文字注音等
    iStopwatch.st("* Code & Xscript °Magic: ");
    ColorCode_init();
    CodeMagic_init();
    SupSubMagic_preprocess();
    Progressbar_init();
    iStopwatch.ed(_4space_);
    // ========================================

    // ========================================
    // 在插图、表格、代码等内容的题注处理后，进行引用块的二次初始化
    // ExtQuote_initAfterCap();
    // ========================================

    // ----------------------------------------
    // 检查页内链接坏链
    // 因涉及对 xmd 的处理，需要在文库处理之前（DocLib）进行
    // __fork("Check Hash Link", function () {
    iStopwatch.st("* Check Hash Link: ");
    LinkTool_mdToHtml();
    LinkTool_checkLink();
    iStopwatch.ed(_4space_);
    // }, 250);

    // ----------------------------------------
    // 增强脚注
    iStopwatch.st("* Foot Note: ");
    FootNote.init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 分步分级处理
    iStopwatch.st("* Stepwise: ");
    BreadcrumbStyle_init();
    iStopwatch.ed(_4space_);

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
        iChapterNav.adjust();
        iToolbar.adjust();
        StatusBar_adjust();

        // 根据设备类型自适应 hover 样式
        iNavCenter.catalog.adjustHoverStyle();
        iChapterNav.adjustHoverStyle();
        iFigNav.adjustHoverStyle();
    }
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 自动生成可通过 DOM 引用块的目录自动编号
    ChpAutoNum_initToc();

    // ----------------------------------------
    // 文档没有任何可索引的对象时，默认不显示导航中心
    if (!iNavCenter.catalog.hasIndexItem()
        && !iNavCenter.figure.hasIndexItem()
        && !iNavCenter.table.hasIndexItem()
        && !iNavCenter.media.hasIndexItem()
        && !iNavCenter.codeblock.hasIndexItem()) {
            iNavCenter.runMode = "closed";
    }

    // ----------------------------------------
    iStopwatch.st("* Binding Event");
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    document.addEventListener("mousemove", function (event) {
        iSpotlight.repaint(event);
        iNavCenter.snap(event);
    });

    // to-do
    // mmMindmap_init();

    // 绑定文档的单击事件
    $(document).uC().ck(function (event) {
        TableCross_hide();
    });

    // 绑定文档的鼠标滚轮事件
    document.addEventListener("mousewheel", function (event) {
        // 忽略处理，提升性能
        return false;
    }, false);

    // 绑定文档的滚动事件
    $(document).on("scroll", function () {
        let currentTime = new Date().getTime(),
            scrollTop = $(document).scrollTop(),
            timeInterval = gFalse,
            docHeight = $(document).h();

        // 显示或隐藏文档更多内容遮罩栏
        if (scrollTop < 20
            || scrollTop > (docHeight - 20)
            || currentTime - V_doc_scroll_lastUpdate > 500)
                MoreDocContent_refresh(scrollTop);

        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop < 20
            || scrollTop > (docHeight - 20)
            || (timeInterval = (currentTime - V_doc_scroll_lastUpdate) > 500)
            || (timeInterval && Math.abs(scrollTop - V_doc_scroll_lastTop) > 100)) {
                // 更新控制执行频率相关判断数据
                V_doc_scroll_update(currentTime, $(document).scrollTop());
                // 根据是屏幕大小进行不同的适配控制
                V_ui_adjustAll();
        }

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iNavCenter.catalog.focusHeader(scrollTop);
    });

    // 绑定窗口大小缩放事件
    $(window).on("resize", function () {
        TableCross_hide();
        iNavCenter.catalog.focusHeader();
        V_ui_adjustAll();
        ExtQuote_uniteColumnsHeight();
    });

    // 绑定打印前的触发事件
    window.onbeforeprint = function () {
        if (V_pageMode === _mini_)
            return;
        // 不是通过 VLOOK 打印按钮进行打印时进行提醒
        if (V_print_mode !== _VLOOK_)
            ALERT([
                "注意！为确保打印正常，建议使用文档内工具栏左侧的【打印】按钮进行打印！",
                "Notice! To ensure normal printing, it is recommended to use the [Print] button on the left side of the toolbar in the document to print!"
            ][V_lang_id]);
    };
    // 绑定打印后的触发事件
    window.onafterprint = function () {
        if (V_pageMode === _mini_)
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
        let aObj = $("#" + JS_decodeURI(anchor) + ", a" + V_attrX(_name_, anchor));
        if (aObj !== gUndefined && aObj.o() !== gUndefined && aObj.oT() === 0) {
            let hiddenObj = aObj.closest(_blockquote_);
            // 若属于被折叠的引用块，则模拟点击展开，并重新定位到该引用块
            if (hiddenObj.length > 0 && hiddenObj.isHidden()) {
                let fd = hiddenObj.pr().f("." + _vBlockquoteFolder_);
                if (fd.length > 0) {
                    fd.tr(_mouseUp_);
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
        if (!iNavCenter.showed)
            V_ui_adjustAllDelay();
    });

    iStopwatch.ed(_4space_);
}

/**
 * 初始化须在页面 body 显示后才能执行的部分
 */
function V_initRestyle() {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 重置任务清单样式
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
// VLOOK UI 包
let V_ui_effect = 0, // 0: 无动效
    V_ui_processingAdjust= gFalse;

/**
 * 淡入显示
 * @param t 目标对象
 */
function V_ui_show(t) {
    if (t === gUndefined)
        return;

    t.c(_visibility_, _visible_)
        .c(_opacity_, 1);
}

/**
 * 淡出隐藏
 * @param t 目标对象
 */
function V_ui_hide(t) {
    if (t === gUndefined)
        return;

    t.c(_visibility_, _hidden_)
        .c(_opacity_, 0);
}

function V_ui_wrap_kbd(src) {
    return "<kbd>" + src + "</kbd>"
}
/**
 * 获得当前 OS 环境下的 Ctrl 键 UI 元素
 */
function V_ui_getCtrlKeyUI(unwrap, short) {
    let key = short ? "⌃"
        : (env.os.macOS ? "⌃ control" : "⌃ Ctrl");
    return unwrap ? key : V_ui_wrap_kbd(key);
}

/**
 * 获得当前 OS 环境下的 Shift 键 UI 元素
 */
function V_ui_getShiftKeyUI(unwrap, short) {
    let key = short ? "⇧" : "⇧ shift";
    return unwrap ? key : V_ui_wrap_kbd(key);
}

/**
 * 获得当前 OS 环境下的 Alt / Option 键 UI 元素
 */
function V_ui_getAltKeyUI(unwrap, short) {
    let str = env.os.macOS
        ? (short ? "⌥" : "⌥ option") : "Alt";
    return unwrap ? str : V_ui_wrap_kbd(str);
}

/**
 * 获得当前 OS 环境下的 Windows / Command 键 UI 元素
 */
function V_ui_getMetaKeyUI(unwrap, short) {
    let str = env.os.macOS
        ? (short ? "⌘" : "⌘ command") : "Win";
    return unwrap ? str : V_ui_wrap_kbd(str);
}

/**
 * 获得滚动条宽度
 */
// function V_ui_scrollWidth() {
//     let sc,
//         d = document.createElement("DIV");
//     d.style.cssText = "position: absolute; top: -9999px; width: 100px; height: 100px; overflow: hidden;";
//     sc = document.body.appendChild(d).clientWidth;
//     d.style.overflowY = "scroll";
//     document.body.removeChild(d);
//     return sc - d.clientWidth;
// }

/**
 * 获得 VLOOK 与技术支持信息内容
 * @returns string VLOOK 与技术支持信息内容
 */
function V_ui_copyrightInfo() {
    return V_ui_div(_, _vCopyright_,
                V_ui_svgIcon(_icoVLOOK_, 24, 24, _dark_, _vCopyrightSvgIco_)
                + _2nbsp_
                + 'Published with ' + V_ui_a(_, "https://github.com/MadMaxChow/VLOOK", V_ui_strong(_VLOOK_), "_blank")
                + '™ (V23.0) &amp; ' + V_ui_a(_, "https://www.typora.io", V_ui_strong("Typora"), "_blank") + '.' + _2nbsp_
                + 'Support: ' + V_ui_a(_, "https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi", V_ui_strong("QQ Group"))
                + ' / ' + V_ui_a(_, 'mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + V_ver + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(gTrue)), V_ui_strong("Email")) + '.'
        );
}

/**
 * 判断是否为小屏
 */
function V_ui_isSmallScreen() {
    return $(window).oW() <= gSmallScreenWidth;
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

    let t = JS_parseInt(iChapterNav.ui.c(_top_)),
        h = JS_parseInt(iChapterNav.ui.c(_height_)),
        y = 10,
        aObj = $("#" + JS_decodeURI(anchor) + ", a" + V_attrX(_name_, anchor)),
        tag = V_util_getTagName(aObj);

    // h1-6
    if ("h1h2h3h4h5h6".i(tag) > -1) {
        y += (tag === _h6_)
            ? (t + h + 16)
            : (aObj.h() + 10 + (JS_parseInt(tag.s(1, 2)) - 1) * 6);
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
 * 生成 HTML 标签属性与值内容（指定关系运算符）
 * @param attrName 属性名称
 * @param attrValue 属性值
 * @param op 关系运算符，不指定时默认为 =
 */
function V_attr(attrName, attrValue, op) {
    if (op === gUndefined)
        op = "=";
    return attrName + op + '"' + attrValue + '"';
}

/**
 * 生成 jQuery / CSS 选择器的属性与值内容
 * @param attrName 属性名称
 * @param attrValue 属性值
 * @param op 关系运算符，不指定时默认为 =
 */
function V_attrX(attrName, attrValue, op) {
    if (op === gUndefined)
        op = "=";
    attrValue = (attrValue !== gUndefined) ? op + '"' + attrValue + '"': _;
    if (attrName.length > 0 )
        attrValue += "]";
    return "[" + attrName + attrValue;
}

/**
 * 生成 SVG 图标
 * @param icon 图标资源集标识
 * @param w 图标宽度
 * @param h 图标高度
 * @param color 内置图标样式 v-svg-ico-xxx 标识：light / dark / alpha / ...
 * @param classValue 扩展补充的 class 样式
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 */
function V_ui_svgIcon(icon, w, h, color, classValue, extAttr) {
    // class
    classValue = (classValue !== gUndefined && classValue.length > 0) ? ___ + classValue : _;
    // ext attr
    extAttr = (extAttr !== gUndefined && extAttr.length > 0) ? ' ' + extAttr : _;
    return '<svg width="' + w + 'px" height="' + h + 'px" class="v-svg-small-ico' + classValue + '"' + extAttr + '>'
        + '<use class="v-svg-ico-' + color + '" xlink:href="#' + icon + '">'
        + '</use></svg>';
}
function V_ui_svgIcon2(icon, w, h) {
    return '<svg width="' + w + 'px" height="' + h + 'px">'
        + '<use xlink:href="#' + icon + '">'
        + '</use></svg>';
}

/**
 * 生成 svg 的 symbol 标签（不用于嵌套）
 * @param idValue id 属性值
 * @param content 标签的内容
 */
function V_ui_symbol(idValue, content) {
    return V_ui_htmlTag("symbol", idValue, _, _, content);
}

/**
 * 生成 img 标签
 * @param classValue class 属性值
 * @param alt alt 属性值
 * @param src src 属性值
 * @param srcset srcset 属性值
 */
function V_ui_img(classValue, alt, src, srcset) {
    classValue = (classValue !== gUndefined && classValue.length > 0) ? ' class="' + classValue + '"' : '';
    alt = (alt !== gUndefined && alt.length > 0) ? ' alt="' + alt + '"' : '';
    src = (src !== gUndefined && src.length > 0) ? ' src="' + src + '"' : '';
    srcset = (srcset !== gUndefined && srcset.length > 0) ? ' srcset="' + srcset + '"' : '';
    return '<' + _img_ + classValue + alt + src + srcset + '>';
}

/**
 * 生成 iframe 标签
 * @param name name 属性值
 */
function V_ui_iframe(name) {
    name = (name !== gUndefined && name.length > 0) ? ' name="' + name + '"' : '';
    return V_ui_htmlTag(_iframe_, _, _, name, _);
    // return '<' + _iframe_ + name + "></" + _iframe_ + ">";
}

/**
 * 生成 input 标签
 * @param id id 属性值
 * @param name name 属性值
 * @param type type 属性值
 * @param value value 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 */
function V_ui_input(id, name, type, value, extAttr) {
    id = (id !== gUndefined && id.length > 0) ? ' id="' + id + '"' : '';
    name = (name !== gUndefined && name.length > 0) ? ' name="' + name + '"' : '';
    type = (type !== gUndefined && type.length > 0) ? ' type="' + type + '"' : '';
    value = (value !== gUndefined && value.length > 0) ? ' value="' + value + '"' : '';
    extAttr = (extAttr !== gUndefined && extAttr.length > 0) ? ' ' + extAttr : _;
    return '<' + _input_ + id + name + type + value + extAttr + ' />';
}

/**
 * 生成 figcaption 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
*/
function V_ui_figcaption(classValue, extAttr, content) {
    return V_ui_htmlTag("figcaption", _, classValue, extAttr, content);
}

/**
 * 生成 div 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param content 标签的内容
 */
function V_ui_div(idValue, classValue, content) {
    return V_ui_htmlTag("div", idValue, classValue, _, content);
}

/**
 * 生成 div 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_div2(idValue, classValue, extAttr, content) {
    return V_ui_htmlTag("div", idValue, classValue, extAttr, content);
}

/**
 * 生成 CSS 变量
 * @param varName 变量名称
 */
function V_ui_var(varName) {
    return 'var(' + varName+ ')';
}

/**
 * 生成 strong 标签
 * @param content 标签的内容
 */
function V_ui_strong(content) {
    return V_ui_htmlTag(_strong_, _, _, _, content);
}

/**
 * 生成 span 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_span(classValue, extAttr, content) {
    return V_ui_htmlTag(_span_, _, classValue, extAttr, content);
}

/**
 * 生成 sub 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_sub(classValue, extAttr, content) {
    return V_ui_htmlTag(_sub_, _, classValue, extAttr, content);
}

/**
 * 生成 label 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_label(classValue, extAttr, content) {
    return V_ui_htmlTag(_label_, _, classValue, extAttr, content);
}

/**
 * 生成 a 标签
 * @param idValue id 属性值
 * @param href href 属性值
 * @param content 标签的内容
 * @param target href 属性值
 */
function V_ui_a(idValue, href, content, target) {
    href = (href !== gUndefined && href.length > 0) ? ' href="' + href + '"': _;
    target = (target !== gUndefined && target.length > 0) ? ' target="' + target + '"' : _;
    return V_ui_htmlTag("a", idValue, _, href + target, content);
}

/**
 * 生成 audio 标签
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_audio(extAttr, content) {
    return V_ui_htmlTag(_audio_, _, _, extAttr, content);
}

/**
 * 生成 video 标签
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_video(extAttr, content) {
    return V_ui_htmlTag(_video_, _, _, extAttr, content);
}

/**
 * 生成 html 的标签
 * @param tag 标签名称，如：strong, div, span 等
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_htmlTag(tag, idValue, classValue, extAttr, content) {
    // id
    idValue = (idValue !== gUndefined && idValue.length > 0) ? ' id="' + idValue + '"' : '';
    // class
    classValue = (classValue !== gUndefined && classValue.length > 0) ? ' class="' + classValue + '"' : '';
    // ext attr
    extAttr = (extAttr !== gUndefined && extAttr.length > 0) ? ' ' + extAttr : _;
    // content
    if (content === gUndefined)
        content = _;
    return '<' + tag + idValue + classValue + extAttr + '>' + content + '</' + tag + '>';
}

/**
 * 获取 Alt / Option 修饰键情况
 * @returns boolean true：按下，false：未按下
 */
function V_ui_holdKey_Alt(event) {
    return (event.altKey);
}

/**
 * 判断鼠标当前位置是否落在指定对象的区域范围内
 * @param target 指定对象
 * @param event 事件对象
 */
function v_ui_mouseDropIn(target, event) {
    let mx = event.pageX || event.clientX + document.body.scrollLeft,
        my = event.pageY || event.clientY + document.body.scrollTop,
        padding = JS_parseInt(target.c(_paddingTop_)) * 2,
        borderBottomWidth = JS_parseInt(target.c(_borderBottomWidth_));
    return !(mx <= target.oL() || mx >= (target.oL() + target.w() + padding)
        || my <= target.oT() || my >= (target.oT() + target.h() + padding + borderBottomWidth));
}

/**
 * 将预置颜色标识转换为驼峰格式
 * @param color 预置的颜色标识
 */
function V_ui_campColor(color) {
    // 渐变色
    if (color.length > 3) {
        let gradientColors = V_ui_splitColors(color),
            count = gradientColors.length,
            colorStr = _, gColor;
        for (let i = 0; i < count; i++) {
            gColor = gradientColors[i];
            colorStr += gColor.charAt(0).toUpperCase() + gColor.slice(1);
        }
        return colorStr;
    }
    // 单色
    return color.charAt(0).toUpperCase() + color.slice(1);
}

/**
 * 拆分渐变的预置颜色标识
 * @param color 预置的颜色标识
 * @return Array[] 颜色标识数组
 */
function V_ui_splitColors(color) {
    let gradientColors = color.l().split(/(\S{2})/i);
    return gradientColors.filter(item => item !== _);
}

/**
 * 将 HEX 颜色格式转换为 RGB 数组
 * @param hex 十六进制格式颜色，如：#F1A2C3
 */
function V_ui_hexToRGB(hex) {
    let rgb = [];
    rgb.push(parseInt(hex.s(1, 3), 16));
    rgb.push(parseInt(hex.s(3, 5), 16));
    rgb.push(parseInt(hex.s(5, 7), 16));

    return rgb;
}

/**
 * 格式化颜色为 rgba 格式
 * @param rgb RGB 颜色分量数组
 * @param opacity 透明度，0:透明，1:不透明
 */
function V_ui_formatRGBA(rgb, opacity) {
    return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + opacity + ")";
}

/**
 * 生成文本渐变色 CSS 代码
 * @param gradientColors 渐变色色号内容，如：RdBuYe
 * @param fade 透明度子标识
 * @param suffix 颜色后缀子标识
 */
function V_ui_genGradColorCSS(gradientColors, fade, suffix) {
    let css = _,
        count = gradientColors.length,
        color = _;
    for (let i = 0; i < count; i++) {
        color = gradientColors[i];
        css += V_ui_var("--ac-" + color + fade
            + (color === "bk" ? _ : suffix));
        if (i < count - 1)
            css += ",";
    }
    return css;
}

/**
 * 初始 UI 国际化
 */
function V_ui_initI18n() {
    iToolbar.btns[_navCenter_].a(_dataTips_, [
        V_ui_strong("隐藏") + " / " + V_ui_strong("显示") + " 导航中心",
        V_ui_strong("Hide") + " / " + V_ui_strong("Show") + " Navigation Center"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("O")));

    iToolbar.btns[_docLib_].a(_dataTips_, [
        "浏览文库",
        "Document Library"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("L")));

    iToolbar.btns[_paragraphNav_].a(_dataTips_, [
        "段落导航 模式",
        "Paragraph Navigation mode"
    ][V_lang_id]);

    iToolbar.btns[_spotlight_].a(_dataTips_, [
        "聚光灯",
        "Spotlight"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("S")));

    iToolbar.btns[_laserPointer_].a(_dataTips_, [
        "激光笔",
        "Laser Pointer"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("P")));

    iToolbar.btns[_print_].a(_dataTips_, [
        "打印...",
        "Print..."
    ][V_lang_id]);

    iChapterNav.prev.ui.a(_dataTips_, [
        "前一章",
        "Previous Chapter"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("◄")));

    iChapterNav.next.ui.a(_dataTips_, [
        "后一章",
        "Next Chapter"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("►")));

    iChapterNav.dt.a(_dataTips_, [
        "回到封面",
        "Back to cover"
    ][V_lang_id]);

    iChapterNav.current.ui.a(_dataTips_, [
        "回到本章的开始",
        "Go back to the beginning of this chapter"
    ][V_lang_id]);

    iFigNav.btns.prev.a(_title_, "[ ← ] " + [
        "前一张",
        "Previous"
    ][V_lang_id]);

    iFigNav.btns.next.a(_title_, "[ → ] " + [
        "后一张",
        "Next"
    ][V_lang_id]);

    iFigNav.btns.close.a(_title_, "[ ESC ] " + [
        "关闭",
        "Close"
    ][V_lang_id]);

    iFontTheme.ui.f("." + _vFontPackage_).t([
        "字体",
        _font_
    ][V_lang_id] + ___);

    iFontTheme.ui.f(".v-font-theme-info").hm([
        "若无法连接互联网加载在线版本字体，建议将字体直接下载到本地",
        "If you cannot connect to the Internet to load the online version of the font, it is recommended to download the font directly to the local"
    ][V_lang_id] + " (" + V_ui_a(_, "https://github.com/MadMaxChow/openfonts", [
        "主站",
        "Primary"
    ][V_lang_id]) + " | " + V_ui_a(_, "https://gitee.com/MadMaxChow/openfonts", [
        "备用",
        "Standby"
    ][V_lang_id]) + ")");

    iFootNote.buttonSeeAll.ch("a").t([
        "查看所有脚注",
        "View all footnotes"
    ][V_lang_id] + " ▶");
}

/**
 * 移动到中间
 * @param s 源对象
 */
function V_ui_moveToCenter(s) {
    let l = ($(window).w() - s.w()) / 2,
        r = _auto_;
    if (env.device.mobile) { // 移动端
        l = 10;
        r = 10;
    }

    s.c(_left_, l)
        .c(_right_, r)
        .c(_top_, ($(window).h() - s.h()) / 2);
}

/**
 * 移动到中间
 * @param s 源对象
 * @param t 目标对象
 */
function V_ui_moveToTarget(s, t) {
    let l = t.oL(),
        w = s.w() + JS_parseInt(s.c(_paddingLeft_))
            + JS_parseInt(s.c(_paddingRight_))
            + JS_parseInt(s.c(_borderWidth_)) * 2;

    if (l + w + 10 > $(window).w())
        l = $(window).w() - w - 10;

    s.c(_left_, l)
        .c(_top_, t.oT() - $(document).scrollTop() + t.h() + 10);
}

/**
 * 进行文档导航相关的 UI 元素的适配处理
 */
function V_ui_adjustAll() {
    if (V_ui_processingAdjust)
        return;

    V_ui_processingAdjust = gTrue;

    if (iNavCenter.adjust())
        ContentFolder_adjust();
    iChapterNav.adjust();
    iToolbar.adjust();

    V_ui_processingAdjust = gFalse;
}

/**
 * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
 */
function V_ui_adjustAllDelay() {
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
        $(_vBtn__BtnGroup_).uH();
        $("." + _vSegmentBtn_).uH();
        $("." + _vAccentBtn_).uH();
        StsFontTheme_ui.uH();
        StsColorScheme_ui.uH();
        $("#" + _docLibToc_ + ">." + _vDocLibItem_).uH();
        $("." + _vStdCode_ + ", ." + _vTag_ + ", ." + _vBadgeName_).uH();
        $("." + _vBadgeValue_).uH();
    }
    // 非移动设备时绑定样式事件
    else {
        // 所有常规按钮 hover 事件处理
        V_ui_bindHover($(_vBtn__BtnGroup_));
        // 所有导航中心分段控制按钮 hover 事件处理
        V_ui_bindHover($("." + _vSegmentBtn_));
        // 所有辅助按钮 hover 事件处理
        V_ui_bindHover($("." + _vAccentBtn_));
        // 状态栏上的按钮
        V_ui_bindHover(StsFontTheme_ui);
        V_ui_bindHover(StsColorScheme_ui);
        // 文库按钮 hover 事件处理
        V_ui_bindHover($("#" + _docLibToc_ + ">." + _vDocLibItem_));
        // 代码、标签类 hover 事件处理
        V_ui_bindHover($("." + _vBadgeValue_), gTrue);
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
        JQ_addClass(_t, _hover_);
        if (cancleParent)
            JQ_removeClass(_t.p(), _hover_);
    }, function () {
        let _t = $(this);
        JQ_removeClass(_t, _hover_);
        if (cancleParent)
            _t.p().tr(_mouseEnter_);
    });
}

/**
 * 为对象取消 hover 事件绑定
 * @param t 目标对象
 */
function V_ui_unbindHover(t) {
    t.unbind(_mouseEnter_).unbind(_mouseLeave_);
}

/**
 * 初始化动效处理
 */
function V_ui_initEffectLevel() {
    // 不启用动效
    if (V_ui_effect < 1)
        V_util_setVarVal("--v-trans-value", _none_);
    // 动效等级为 2 或更高级时才开启毛玻璃动效（如遮罩、插图浏览器背景）
    else if (V_ui_effect >= 2)
        JQ_addClass($("." + _vBackdropBlurs_), _enabled_);
    // 以下动效等级为 1 或更高级时才开启
    V_ui_addAnimate($("a kbd, a " + _img_));
}
function V_ui_initEffectLevel2() {
    if (V_ui_effect >= 2)
        JQ_addClass($("." + _vBackdropBlurs_), _enabled_);
}

/**
 * 为指定对象添加过渡动画
 * @param t 目标对象
 * @param css 应用的属性，不指定时默认为 “all”
 */
function V_ui_addAnimate(t, css) {
    if (V_ui_effect >= 1) {
        if  (css === gUndefined) {
            JQ_addClass(t, _vTransitionAll_);
        }
        else {
            let attrSet = css.sp(___);
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
        JQ_removeClass(t, _vTransitionAll_);
    else {
        let attrSet = css.sp(___);
        for (let i = 0; i < attrSet.length; i++)
            JQ_removeClass(t, "v-transition-" + attrSet[i]);
    }
}

/**
 * 检查目标对象是否有指定的任意过渡动画
 * @param t 目标对象
 * @returns boolean true：有，false：无
 */
// function V_ui_existAnimate(t) {
//     return t.a(_class_).i("v-transition-") > -1;
// }

/**
 * 初始化热键
 */
function V_ui_initHotkey() {
    // 键盘按下事件
    $(document).on("keydown", function (event) {
        const code = event.keyCode || event.which || event.charCode;
        let combKeys = (event.ctrlKey ? V_ui_getCtrlKeyUI(true) : _)
            + (event.shiftKey ? V_ui_getShiftKeyUI(true) : _)
            + (event.altKey ? V_ui_getAltKeyUI(true) : _)
            + (event.metaKey ? V_ui_getMetaKeyUI(true) : _);

        // if (V_debugMode) {
        DEBUG(`KEY: ${combKeys} ${String.fromCharCode(code)} (${code})`);
        DEBUG(`keyCode: ${event.keyCode}, key: ${event.key}, code: ${event.code}`);
        // }

        // 按下 alt / option 键
        if (V_ui_holdKey_Alt(event) === gTrue) {
            ContentAssistor_toggleCopyMode(gTrue);
        }

        // 热键操作处理
        iSpotlight.disposeHotkey(code, combKeys, event);
        iLaserPointer.disposeHotkey(code, combKeys, event);
        iParagraphNav.disposeHotkey(code, combKeys, event);
        WelcomePage_disposeHotkey(code, combKeys, event);
        iFigNav.disposeHotkey(code, combKeys, event);
        iNavCenter.disposeHotkey(code, combKeys, event);
        iFontTheme.disposeHotkey(code, combKeys, event);
        iInfoTips.disposeHotkey(code, combKeys, event);
        iFootNote.disposeHotkey(code, combKeys, event);
        LinkTool_disposeHotkey(code, combKeys, event);

        // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
        if (V_doc_block || document.activeElement.tagName.l() !== "body")
            return;

        // 逐章导航热键操作处理
        iChapterNav.disposeHotkey(code, combKeys, event);

        let handled = false;
        switch (code) {
            case 79: // O 显示/隐藏导航中心
                __showHideNavCenter();
                handled = true;
                break;
            case 191: // / 导航中心搜索
                // 与 Firefox 的 / 快捷键会存在冲突
                // 所以针对 Firefox，快捷键为 Ctrl + / 或 Cmd + /
                // 阻止默认的浏览器行为
                event.preventDefault();
                if (!iNavCenter.showed) {
                    __showHideNavCenter();
                }
                iNavCenter.keyword.input.focus();

                // 自动读取并粘贴剪粘板的文本内容
                navigator.clipboard.readText().then(function (v) {
                        iNavCenter.keyword.input.val(v);
                        iNavCenter.keyword.input.select();
                    }).catch(function (v) {
                        ERROR("GET CLIPBOARD FAILED：", v);
                    });
                handled = true;
                break;
            case 76: // L
                if (iNavCenter.docLib.enabled)
                    iToolbar.btns[_docLib_].tr(_click_);
                handled = true;
                break;
            case 68: // D
                StsColorScheme_ui.tr(_click_);
                handled = true;
                break;
            case 65: // A
                if (iFontTheme.ui.isHidden())
                    StsFontTheme_ui.tr(_click_);
                else
                    iFontTheme.hide();
                handled = true;
                break;
            case 80: // P
                iParagraphNav.hide();
                iSpotlight.hide();
                iLaserPointer.tg();
                handled = true;
                break;
            case 83: // S
                iParagraphNav.hide();
                iLaserPointer.hide();
                iSpotlight.tg();
                handled = true;
                break;
            case 27: // ESC
                // 表格为阅读模式时，则退出
                if (!TableCross_ui.isHidden()) {
                    TableCross_disable();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();

        function __showHideNavCenter() {
            if (iFigNav.ui.isShowed())
                return;
            iToolbar.btns[_navCenter_].tr(_click_);
        }
    });

    // 松开任意键
    $(document).on("keyup", function (event) {
        // 更新复制模式
        if (ContentAssistor_copyAsMarkdown === gTrue) {
            ContentAssistor_toggleCopyMode(gFalse);
        }
    });
}
// VLOOK UI 包
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
            V_lang_id = 0; // 中（简）
            break;
        default:
            V_lang_id = 1; // 默认：英语
    }
}
// V.lang
// ========================================

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
    JQ_exchangeClass(DOM_body(), _unfreeze_, _freeze_);
}

/**
 * 解冻文档滚动
 */
function V_doc_scroll_unfreeze() {
    JQ_exchangeClass(DOM_body(), _freeze_, _unfreeze_);
}

// 内容计数器
let V_doc_counter_img = 0, // 图片总数
    V_doc_counter_figure = 0, // 插图总数
    V_doc_counter_postcard = 0, // 明信片数量
    V_doc_counter_table = 0, // 表格总数
    V_doc_counter_codeblock = 0, // 代码块总数
    V_doc_counter_audio = 0, // 非 mini 模式音频总数
    V_doc_counter_audiomini = 0, // mini 模式音频总数
    V_doc_counter_video = 0, // 视频总数
    V_doc_counter_details = 0; // 详情总数

/**
 * 初始化外部链接（如：http://、https://、ftp://、站内链接等），为其添加 target 参数
 */
function V_doc_link_adjustExternal() {
    $("a:not([href^='#'])").e(function () {
        let a = $(this);
        a.a(_target_, a.a(_href_));
    });
}
// ========================================

// ========================================
// 打印类
// 打印模式。none：指由直接使用浏览器自带的打印，vlook：指先通过 vlook 进行预处理
let V_print_mode = _none_;

/**
 * 打印文档前处理
 */
function V_print_ready() {
    V_print_mode = _VLOOK_;

    // 若当前为 Dark Mode 则强制临时切换为 Light 模式
    if (ColorScheme.scheme === _dark_) {
        ColorScheme.schemeBeforePrint = ColorScheme.scheme;
        ColorScheme.scheme = _light_;
        ColorScheme.refresh();
    }

    // 将 Mermaid 图表题注 width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    $("." + _vCaption_Mermaid_).e(function () {
        let _t = $(this);
        _t.a(_beforePrintWidth_, _t.c(_width_));
        _t.c(_width_, _100pc_);
    });

    // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    $("." + _vCaption_Mermaid_ + ___ + _svg_).e(function () {
        let _t = $(this);
        if (_t.a(_width_) === _100pc_) {
            // 针对流程图
            if (_t.a(_style_).i(_maxWidth_ + ":") > -1) {
                _t.a(_beforePrintMaxWidth_, _t.c(_maxWidth_));
                _t.c(_maxWidth_, _);
            }
            // 针对状态机图
            else if (_t.a(_style_).i(_width_ + ":") > -1) {
                _t.a(_beforePrintWidth_, _t.c(_width_));
                _t.c(_width_, _100pc_);
            }
        }
        else { // 针对顺序图
            _t.a(_beforePrintWidth_, _t.a(_width_));
            _t.c(_width_, _100pc_);
        }
    });

    // 展开折叠的引用块
    $(_details_ + ":not(" + V_attrX(_open_) + ")").e(function () {
        $(this).ch(_summary_).tr(_click_);
    });

    // 展开所有折叠的长内容
    $(V_attrX(_dataContentFolded_, _true_)).e(function () {
        $(this).tr(_mouseUp_);
    });

    // 展开所有折叠的表格行
    $(_vTblRowGBtn_).e(function () {
        RowGroup_open($(this).p().p());
    });

    // 隐藏画中画
    PicInPic_hide();

    // 若存在「刮刮卡」内容，则先让用户确认是否显示
    let coatings = $("." + _vCoating_);
    if (coatings.length > 0) {
        if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？")) {
            coatings.e(function () {
                let _t = $(this);
                if (_t.a(_dataCoatingShowed_).sW("f"))
                    Coating_show(_t);
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
    if (ColorScheme.schemeBeforePrint === _dark_) {
        ColorScheme.tg();
    }

    // 恢复打印前的配置，详见 V_print_ready()
    $("." + _vCaption_Mermaid_).e(function () {
        let _t = $(this);
        _t.c(_width_, _t.a(_beforePrintWidth_));
        JQ_removeAttr(_t, _beforePrintWidth_);
    });

    // 恢复打印前的配置，详见 V_print_ready()
    $("." + _vCaption_Mermaid_ + ___ + _svg_).e(function () {
        let _t = $(this);
        if (_t.a(_width_) === _100pc_) {
            // 针对流程图
            if (_t.a(_style_).i(_maxWidth_ + ":") > -1) {
                _t.c(_maxWidth_, _t.a(_beforePrintMaxWidth_));
                JQ_removeAttr(_t, _beforePrintMaxWidth_);
            }
            // 针对状态机图
            else if (_t.a(_style_).i(_width_ + ":") > -1) {
                _t.c(_width_, _t.a(_beforePrintWidth_));
                JQ_removeAttr(_t, _beforePrintWidth_);
            }
        } else { // 针对顺序图
            _t.c(_width_, _t.a(_beforePrintWidth_));
            JQ_removeAttr(_t, _beforePrintWidth_);
        }
    });

    // 隐藏所有刮刮卡
    // $("." + s_CssRbCoat).e(function () {
    //     let _t = $(this);
    //     if (_t.a(s_DataRbCoatShowed).sW("t"))
    //         RainbowCoat_hide(_t);
    // });

    V_print_mode = _none_;
}

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
        + "&thm=" + V_util_getTemplateTheme();

    sd += "&d=" + (env.device.mobile ? "mob" : _) // 设备类型
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
    sd += "&cs=" + V_util_getVarVal(_varColorScheme_).rA('"', _).x();

    sd += "&lang=" + V_lang_id // 浏览器语言
        + "&size=" + VOM_doc().t().length // 文档大小
        + "&time=" + loadTimeCost; // 加载文档时间

    // 图片插图数据
    sd += "&" + _img_ + "=" + $("." + _vFig_).length
        + "&" + _img_ + "-fold=" + $("p" + V_attrX(_dataContainer_, _img_) + V_attrX(_dataContentFolded_, _true_)).length
        + "&" + _img_ + "-fill=" + $(_img_ + ":not(" + V_attrX(_dataImgFill_) + ")").length
        + "&" + _img_ + "-invert=" + $(_img_ + V_attrX(_dataDarkSrc_, _invert_)).length
        + "&" + _img_ + "-alter=" + $(_img_ + V_attrX(_dataDarkSrc_, _alter_)).length
        + "&" + _img_ + "-cap1=" + $(_div_ + V_attrX(_id_, _vkIdFig_, "^=") + V_attrX(_dataIdFigType_, _img_) + ___ + _vCap1_).length
        + "&" + _img_ + "-cap2=" + $(_div_ + V_attrX(_id_, _vkIdFig_, "^=") + V_attrX(_dataIdFigType_, _img_) + ___ + _vCap2_).length;

    // Mermaid 插图数据
    let mermaid = $(".md-diagram-panel");
    sd += "&mm=" + mermaid.length
        + "&mm-fold=" + $(_div_ + V_attrX(_dataContainer_, _svg_) + V_attrX(_dataContentFolded_, _true_)).length
        + "&mm-cap1=" + $(_div_ + V_attrX(_id_, _vkIdFig_, "^=") + V_attrX(_dataIdFigType_, _svg_) + ___ + _vCap1_).length
        + "&mm-cap2=" + $(_div_ + V_attrX(_id_, _vkIdFig_, "^=") + V_attrX(_dataIdFigType_, _svg_) + ___ + _vCap2_).length;

    // Mermaid 音频数据
    sd += "&audio=" + $(_audio_).length
        + "&mm-cap1=" + $(_div_ + V_attrX(_id_, _vkIdAudio_, "^=") + ___ + _vCap1_).length
        + "&mm-cap2=" + $(_div_ + V_attrX(_id_, _vkIdAudio_, "^=") + ___ + _vCap2_).length;

    // Mermaid 视频数据
    sd += "&video=" + $(_video_).length
        + "&mm-cap1=" + $(_div_ + V_attrX(_id_, _vkIdVideo_, "^=") + ___ + _vCap1_).length
        + "&mm-cap2=" + $(_div_ + V_attrX(_id_, _vkIdVideo_, "^=") + ___ + _vCap2_).length;

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
    sd += "&tbl=" + $(_table_).length
        + "&tbl-fold=" + $(_figure_ + V_attrX(_dataContainer_, _table_) + V_attrX(_dataContentFolded_, _true_)).length
        + "&tbl-cap1=" + $(_div_ + V_attrX(_id_, _vkIdTbl_) + ___ + _vCap1_).length
        + "&tbl-cap2=" + $(_div_ + V_attrX(_id_, _vkIdTbl_) + ___ + _vCap2_).length;

    // 表格列格式数据
    let fmBold = 0,
        fmEm = 0,
        fmUnderline = 0,
        fmMark = 0,
        fmDel = 0,
        fmChk = 0,
        fmNum = 0;
    $(_table_ + V_attrX(_dataColumnFmting_, _true_)).e(function () {
        let _t = $(this);
        if (_t.f("thead ." + _vTblColFmt_Bold_).length > 0)
            fmBold++;
        if (_t.f("thead ." + _vTblColFmt_Em_).length > 0)
            fmEm++;
        if (_t.f("thead u").length > 0)
            fmUnderline++;
        if (_t.f("thead ." + _vTblColFmtMark_).length > 0)
            fmMark++;
        if (_t.f("thead " + _del_).length > 0)
            fmDel++;
        if (_t.f("thead ." + _vTblColFmt_Chkbox_).length > 0)
            fmChk++;
        if (_t.f("thead ." + _vTblColFmtNum_).length > 0)
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
    sd += "&tbl-cell-merge=" + $(_table_ + V_attrX(_dataCellMerge_, _true_)).length;

    // 带行折叠的表格数
    sd += "&tbl-row-group=" + $(_table_ + V_attrX(_dataRowGroup_, _true_)).length;

    // 代码块数据
    sd += "&cb=" + $("." + _vFences_).length
        + "&cb-fold=" + $("p" + V_attrX(_dataContainer_, _pre_) + V_attrX(_dataContentFolded_, _true_)).length
        + "&cb-cap1=" + $(_div_ + V_attrX(_id_, _vkIdCodeblock_) + ___ + _vCap1_).length
        + "&cb-cap2=" + $(_div_ + V_attrX(_id_, _vkIdCodeblock_) + ___ + _vCap2_).length;

    // 标签数据
    sd += "&tag=" + $(_code_ + V_attrX(_class_, _vTag_)).length
        + "&badge=" + $(_code_ + V_attrX(_class_, _vBadgeName_)).length;

    // 折叠引用块数据
    sd += "&dt=" + $(_details_).length;

    // 脚注数据
    sd += "&fn=" + $(".md-footnote").length;

    // 当前文档的 URL
    sd += "&url=" + WINDOW_getHref();

    // 提交统计数据
    let vlookStat = $(_iframe_ + V_attrX(_name_, _vlookStatGitee_));
    vlookStat.a(_src_,
        "https://madmaxchow.gitee.io/vlook/act/" + (V_debugMode ? "dev-" : _) + "stat-gitee.html"
        + encodeURI(sd));
    // if (V_debugMode)
    DEBUG("STAT DATA:", vlookStat.a(_src_));
}

/**
 * 上报事件统计数据（基于百度统计）
 * 为兼容在本地打开的 HTML 文件，所以通过 iframe 的方式进行数据上报
 * @param d 数据数组，与百度统计的 _hmt.push(["_trackEvent", data[0], data[1], data[2], data[3]) 的参数保持一致
 */
// function V_report_push(d) {
//     return false; // 暂停事件数据上报，因百度统计免费版已下线了事件服务
//     // ---
//     $("body").ap('<iframe name="vk-event-' + V_report_count + '" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"'
//         + ' src="https://madmaxchow.gitee.io/vlook/act/'
//         + (V_debugMode ? "dev-" : __)
//         + 'event-gitee.html'
//         + "?category=" + (V_debugMode ? "dev-" : __) + d[0]
//         + "&action=" + d[1]
//         + "&label=" + d[2]
//         + "&value=" + d[3]
//         + "&debug=" + V_debugMode
//         + '"></iframe>');
//
//     // 默认在指定时间后回收 iframe 资源
//     setTimeout(V_report_recycleResources, 10000);
//     V_report_count++;
// }

/**
 * 转换标签名为 VLOOK 中的特定内容类型名称
 */
// function V_report_transTagName(t) {
//     if (t.sW("i"))
//         return _fig_ + _suffixImg_;
//     else if (t.sW("s"))
//         return _fig_ + _suffixSvg_;
//     else if (t.sW("t"))
//         return _table_;
//     else if (t.sW("pr"))
//         return _codeblock_;
//     return "Unknown";
// }

/**
 * 移除上报事件的资源
 */
// function V_report_recycleResources() {
//     $(_iframe_ + V_attrX(_name_, "vk-event-", "^=")).e(function () {
//         JQ_remove($(this));
//         return gFalse; // 执行一次即跳出，即每次只删除当前最早创建的
//     });
// }
// V.report
// ========================================

// ==================== 随机颜色类 ==================== //

let RandomColor_palette = []; // 不相似颜色的色板

/**
 * 生成随机颜色
 * @returns number[] R/G/B 颜色分量是数组
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
 * @returns number[] R/G/B 颜色分量是数组
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
    let flag = gFalse,
        t = 0,
        d = [0, 0, 0];

    // 随机生成不相似的颜色（最多尝试次数上限为 20）
    while (!flag && t < 20) {
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
            flag = gTrue;
        }
        t++;
    }
    return c;
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
     * @param slient 是否为静默模式，true：是
     */
    T.ed = function (pre, slient) {
        let c = new Date().getTime() - T.lT;
        // 非静默模式时，输出计时结果
        if (!slient) {
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
    if (WelcomePage_mode === _none_)
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

    WelcomePage_ui.c(_cursor_, "default");
    WelcomePage_stopAni();

    WelcomePage_tips.c(_animation_, _none_);

    WelcomePage_updateCloseButton(null);
    JQ_addClass(WelcomePage_button, "v-btn-done");

    WelcomePage_finished = gTrue;

    // auto 模式时延时自动关闭
    let delay = JS_parseInt(WelcomePage_mode);
    if (delay > 60) // 控制秒数上限
        delay = 60;
    if (WelcomePage_mode === _auto_ || delay >= 0)
        WelcomePage_autoClose(delay);
    // wait 模式
    else if (WelcomePage_mode === _wait_)
        JQ_addClass(WelcomePage_button, _wait_);
}

/**
 * 自动延时关闭
 * @param delay VLOOK Query 调校参数指定的延时自动关闭秒数
 */
function WelcomePage_autoClose(delay) {
    let delaySecs = (delay >= 0 ? delay : JS_parseInt(V_util_getVarVal("--v-ws-delay"))),
        closeTimer = null;

    __timeToClose();

    // 关闭倒计时
    function __timeToClose() {
        WelcomePage_updateCloseButton(delaySecs);
        delaySecs--;
        if (delaySecs < 0) { // 倒计时结束
            clearTimeout(closeTimer);
            closeTimer = null;
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
    WelcomePage_button.hm([
        "开始阅览",
        "Start Reading"
    ][V_lang_id]
        + (sec == null ? _ : ___ + V_ui_span(_, _, "(" + sec + "s)")));
}

/**
 * 停止加载时的呼吸动画
 */
function WelcomePage_stopAni() {
    WelcomePage_tips.c(_animation_, _none_);
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
 * @param event 事件对象
 */
function WelcomePage_disposeHotkey(code, combKeys, event) {
    if (!WelcomePage_finished || WelcomePage_ui.isHidden())
        return;

    let handled = false;
    switch (code) {
        case 13: // ENTER
            // 关闭欢迎页
            WelcomePage_close();
            handled = true;
            break;
    }

    // 如果事件已处理，则禁止双重操作
    if (handled)
        event.preventDefault();
}

// ==================== 内容助手类 ==================== //

let ContentAssistor_ui = gUndefined,
    ContentAssistor_btns_openInFigureNav = gUndefined, // 插图浏览器中打开
    ContentAssistor_btns_copyContent = gUndefined, // 复制内容
    ContentAssistor_btns_tableCross = gUndefined, // 表格阅读模式（十字光标）
    ContentAssistor_btns_tableWrap = gUndefined, // 表格自动换行
    ContentAssistor_btns_picInPic = gUndefined, // 「画中画」
    ContentAssistor_copyAsMarkdown = gFalse, // 复制模式
    // 最后显示新标签打开按钮的内容（插图/表格等
    ContentAssistor_lastTarget = gUndefined, // 用于代码、标签、徽章
    ContentAssistor_lastHover = gUndefined,
    ContentAssistor_lastContentType = gUndefined;

function ContentAssistor_init() {
    ContentAssistor_ui = $(".v-content-assistor");
    ContentAssistor_btns_copyContent = $(_vBtn_Assistor_ + ".copy"); // 复制内容
    ContentAssistor_btns_openInFigureNav = $(_vBtn_Assistor_ + ".open-in-figure-nav"); // 插图浏览器中打开
    ContentAssistor_btns_tableCross = $(_vBtn_Assistor_ + ".table-cross"); // 表格阅读模式（十字光标）
    ContentAssistor_btns_tableWrap = $(_vBtn_Assistor_ + ".table-wrap"); // 表格自动换行
    ContentAssistor_btns_picInPic = $(_vBtn_Assistor_ + ".pic-in-pic"); // 「画中画」

    ContentAssistor_btns_openInFigureNav.a(_dataTips_, [
        "全屏显示",
        "Full screen"
    ][V_lang_id]);

    ContentAssistor_btns_tableCross.a(_dataTips_, [
        "阅读模式",
        "Reading mode"
    ][V_lang_id]);

    ContentAssistor_btns_tableWrap.a(_dataTips_,  [
        "自动换行 / 不换行",
        "Wrap / Unwrap"
    ][V_lang_id]);

    ContentAssistor_btns_picInPic.a(_dataTips_, [
        "画中画",
        "Picture in picture"
    ][V_lang_id]);

    ContentAssistor_ui.on(_mouseLeave_, function (event) {
        if (!v_ui_mouseDropIn(ContentAssistor_lastHover, event))
            ContentAssistor_hide();
    });

    /**
     * 初始化内容助手
     */
    // 在插图浏览器中打开
    ContentAssistor_btns_openInFigureNav.uC().ck(function () {
        ContentAssistor_hide();
        iFigNav.show(ContentAssistor_lastHover);
    });

    //  开/关表格阅读模式（十字光标）
    ContentAssistor_btns_tableCross.uC().ck(function () {
        TableCross_toggle(ContentAssistor_lastHover);
    });

    //  开/关表格自动换行
    ContentAssistor_btns_tableWrap.uC().ck(function () {
        TableWrap_toggle(ContentAssistor_lastHover);
    });

    ContentAssistor_btns_copyContent.uC().ck(function (event) {
        __actionCopy($(this), event);
    });

    // 画中画
    ContentAssistor_btns_picInPic.uC().ck(function () {
        PicInPic_show(ContentAssistor_lastHover);
    });

    ToolTips_bind(ContentAssistor_btns_copyContent);
    ToolTips_bind(ContentAssistor_btns_openInFigureNav);
    ToolTips_bind(ContentAssistor_btns_tableCross);
    ToolTips_bind(ContentAssistor_btns_tableWrap);
    ToolTips_bind(ContentAssistor_btns_picInPic);

    function __actionCopy(target, event) {
        if (ContentAssistor_lastHover === gUndefined)
            return;

        if (ContentAssistor_lastContentType === _codeblock_)
            ExtCodeBlock_copyContent(target, event);
        else if (ContentAssistor_lastContentType === _fig_ + _suffixImg_)
            ExtFigure_copySrc(target, event);
        else if (ContentAssistor_lastContentType === _table_)
            ExtTable_copyContent(target, event);
    }
}

/**
 * 切换「复制」模式
 * @param mode false: 普通，true: 复制为 Markdown
 */
function ContentAssistor_toggleCopyMode(mode) {
    ContentAssistor_copyAsMarkdown = mode;
    if (ContentAssistor_copyAsMarkdown) {
        // 切换复制光标、内容助手的复制图标
        V_util_setVarVal("--cur-copy", V_util_getVarVal("--cur-copy-as-md"));
        ContentAssistor_btns_copyContent.hm(V_ui_svgIcon(_icoCopyAsMd_, 16, 16, _light_));
    }
    else {
        // 恢复复制光标、内容助手的复制图标
        V_util_setVarVal("--cur-copy", V_util_getVarVal("--cur-copy-normal"));
        ContentAssistor_btns_copyContent.hm(V_ui_svgIcon(_icoCopy_, 16, 16, _light_));
    }
}

/**
 * 绑定对象的 hover 行为
 * @param target 目标对象
 * @param contentType 内容类型：Figure/Table/CodeBlock
 */
function ContentAssistor_bind(target, contentType) {
    // 鼠标悬停时事件处理
    target.hover(function () {
        V_ui_removeAnimate(ContentAssistor_ui);

        // 更新复制模式
        if (ContentAssistor_lastHover !== target)
            ContentAssistor_toggleCopyMode(gFalse);

        ContentAssistor_lastHover = target;
        ContentAssistor_lastContentType = contentType;

        let asMarkdown =  "\n" + V_ui_sub(_, _, [
            "按住",
            "Hold"
            ][V_lang_id]
            + _2nbsp_+ V_ui_getAltKeyUI() + [
                _2nbsp_ +"- 复制为 Markdown",
                _2nbsp_ +"- Copy as Markdown"
                ][V_lang_id]);
        if (contentType === _codeblock_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, [
                "复制全部代码",
                "Copy code"
            ][V_lang_id] + asMarkdown);
        }
        else if (contentType === _fig_ + _suffixImg_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, [
                "复制图片地址",
                "Copy Image Link"
            ][V_lang_id] + asMarkdown);
        }
        else if (contentType === _table_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, [
                "复制表格内容",
                "Copy Table Content"
            ][V_lang_id] + asMarkdown);
        }

        ContentAssistor_show();
    }, function (event) {
        if (!v_ui_mouseDropIn(ContentAssistor_lastHover, event))
            ContentAssistor_hide();
    });
}

/**
 * 显示指定内容的内容助手
 */
function ContentAssistor_show() {
    if (ContentAssistor_lastHover === gUndefined)
        return;

    // 圆角重置样式
    JQ_removeClass(ContentAssistor_btns_copyContent, _first__enable__last_);
    JQ_removeClass(ContentAssistor_btns_openInFigureNav, _first__enable__last_);
    JQ_removeClass(ContentAssistor_btns_tableCross, _first__enable__last_);
    JQ_removeClass(ContentAssistor_btns_tableWrap, _first__enable__last_);
    JQ_removeClass(ContentAssistor_btns_picInPic, _first__enable__last_);

    // 插图
    if (ContentAssistor_lastContentType.sW(_fig_)) {
        // 图片插图
        if (ContentAssistor_lastContentType.eW(_svg_)) {
            JQ_addClass(ContentAssistor_btns_copyContent, _enabled__first_);
            JQ_addClass(ContentAssistor_btns_openInFigureNav, _enabled_);
        }
        // 非图片插图
        else
            JQ_addClass(ContentAssistor_btns_openInFigureNav, _enabled__first_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled__last_);
    }
    // 表格
    else if (ContentAssistor_lastContentType === _table_) {
        // 复制
        JQ_addClass(ContentAssistor_btns_copyContent, _enabled__first_);
        // 阅读模式
        JQ_addClass(ContentAssistor_btns_tableCross, _enabled_);
        if (ContentAssistor_lastHover.a(_dataTblX_) === _true_)
            JQ_addClass(ContentAssistor_btns_tableCross, _selected_);
        else
            JQ_removeClass(ContentAssistor_btns_tableCross, _selected_);
        // 自动换行
        JQ_addClass(ContentAssistor_btns_tableWrap, _enabled_);
        if (ContentAssistor_lastHover.c(_whiteSpace_) === _preWrap_)
            JQ_addClass(ContentAssistor_btns_tableWrap, _selected_);
        else
            JQ_removeClass(ContentAssistor_btns_tableWrap, _selected_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled__last_);
    }
    // 代码块
    else if (ContentAssistor_lastContentType === _codeblock_) {
        // 复制
        JQ_addClass(ContentAssistor_btns_copyContent, _enabled__first_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled__last_);
    }

    // ----------------------------------------
    // 计算助手显示的位置
    let caption = ContentAssistor_lastHover.p(),
        className = caption.a(_class_),
        container = caption.p(),
        offset = 0;
    // 对于存在横向滚动的情况时，须计算其偏移量用来位置调整
    if (className !== gUndefined && className.i("v-caption") > -1
        && container !== gUndefined) {
            className = container.a(_class_);
            if (className !== gUndefined && className.i(_vCaptionContainer_) > -1) {
                let capWidth = JS_parseInt(caption.w()),
                    conWidth = JS_parseInt(container.w());
                if (capWidth > conWidth)
                    offset = capWidth - conWidth + 1;
            }
    }
    // 显示
    ContentAssistor_ui.c(_left_, ContentAssistor_lastHover.oL()
            + ContentAssistor_lastHover.w()
            + JS_parseInt(ContentAssistor_lastHover.c(_borderLeftWidth_))
            - ContentAssistor_ui.w()
            + JS_parseInt(ContentAssistor_lastHover.c(_paddingLeft_))
            + JS_parseInt(ContentAssistor_lastHover.c(_paddingRight_))
            - offset)
        .c(_top_, ContentAssistor_lastHover.oT()
            + JS_parseInt(ContentAssistor_lastHover.c(_borderTopWidth_)));

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
    PicInPic_ui_zoom = $(_vPipBtn_ + ".zoom");
    PicInPic_ui_close = $(_vPipBtn_ + ".close");

    // 缩放事件处理
    PicInPic_ui_zoom.uC().ck(function () {
        let _t = $(this),
            pipBtn = $(_vPipBtn_);
        if (PicInPic_ratio === 1) {
            PicInPic_ratio = 0.75;
            JQ_exchangeClass(pipBtn, "zoom-in", "zoom-out");
            _t.hm(V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_));
        }
        else {
            PicInPic_ratio = 1;
            JQ_exchangeClass(pipBtn, "zoom-out", "zoom-in");
            _t.hm(V_ui_svgIcon(_icoZoomOut_, 16, 16, _theme_));
        }
        PicInPic_zoom();
    });

    PicInPic_ui_close.uC().ck(function () {
        PicInPic_hide();
    });

    PicInPic_ui_body.hover(function () {
        // 高度过小时调整操作按钮位置
        if (PicInPic_ui_body.h() < 30) {
            JQ_addClass(PicInPic_ui_zoom, _min_);
            JQ_addClass(PicInPic_ui_close, _min_);
        }
        else {
            JQ_removeClass(PicInPic_ui_zoom, _min_);
            JQ_removeClass(PicInPic_ui_close, _min_);
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
            tagName = V_util_getTagName(source);
        // 针对表格的处理
        if (tagName === _table_) {
            // 1. 先展开所有行分组
            openAll = RowGroup_openAll(source, _auto_);
            // 2. 先展开长内容
            let container = source.p().p();
            if (container.a(_dataContentFolded_) === _true_)
                ContentFolder_expand(container.n());
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.c(_margin_, 0)
            .c(_border_, 0);
        PicInPic_ui_content.ap(newClone);

        // 针对插图的处理
        let img = (tagName === _svg_),
            svg = tagName === _svg_;
        if (img || svg) {
            JQ_removeAttr(newClone, _dataFigNum_);
            if (svg)
                JQ_addClass(newClone, _vMermaidRestyler_);
        }

        // 对展开了所有行分组的表格进行克隆后的干净处理
        if (openAll) {
            RowGroup_reset(newClone); // 重置、切断
            RowGroup_closeAll(source, _auto_); // 全部收起
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
        h = $(window).h() / 3;
    PicInPic_size_width = w < baseW ? baseW : w;
    PicInPic_size_height = h < baseH ? baseH : h;
    PicInPic_ui_body.c(_width_, PicInPic_size_width)
        .c(_height_, PicInPic_size_height);
}

/**
 * 调整画中画的基准大小，以适应内容的实际大小
 */
function PicInPic_fitContentSize(source) {
    // 宽度
    let tagName = V_util_getTagName(source),
        w = source.w(),
        h = source.h(),
        sourcePadding = JS_parseInt(source.c(_paddingTop_)) * 2,
        uiPadding = JS_parseInt(PicInPic_ui_body.c(_paddingTop_)) * 2;

    // 针对图片尺寸的兼容性处理（部分浏览器不使用该处理尺寸不正常，如：Firefox）
    if (tagName === _svg_) {
        let img = new Image();
        img.src = source.a(_src_);
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
        PicInPic_ui_body.c(_width_, wWithPadding)
            .c(_transformOrigin_, PicInPic_size_width + "px " + PicInPic_size_height + "px");
    }

    // 高度
    h = source.h(); // 重新获得画中画最新高度
    let hWithPadding = h + uiPadding + sourcePadding;
    if (h > 0 && hWithPadding < PicInPic_size_height) {
        // 针对会进行等比缩放的对象进行高度微调
        if ((tagName === _svg_ || tagName === _svg_)
            && h > source.h()) {
                h = source.h();
                hWithPadding = h + uiPadding + sourcePadding;
        }
        PicInPic_size_height = h;
        PicInPic_ui_body.c(_height_, hWithPadding)
            .c(_transformOrigin_, PicInPic_size_width + "px " + PicInPic_size_height + "px");
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

    PicInPic_ui_body.c(_transform_, "scale(" + PicInPic_ratio + ")")
        .c(_transformOrigin_, PicInPic_size_width + "px " + PicInPic_size_height + "px");

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

        T.radius = T.radius < T.zoom.bigger
            ? T.zoom.bigger
            : T.zoom.normal;

        T.repaint();
    }

    /**
     * 使用聚光灯模式
     */
    T.show = function () {
        JQ_removeClass(T.toolbar.btns[_laserPointer_], _selected_);
        JQ_addClass(T.toolbar.btns[_spotlight_], _selected_);

        // Dark Mode 时先添加微调的样式
        if (ColorScheme.scheme === _dark_)
            JQ_addClass(VOM_doc(), _vSpotlightInDark_);

        T.mode = "S";
        T.ui.show();
        JQ_removeClass($(T.pointerScope), _vCursorLaser_);
        T.repaint();

        let key1 = V_ui_wrap_kbd("⇧ Shift") + _2nbsp_,
            key2 = _2nbsp_ + _2nbsp_ +"-" + _2nbsp_ + _2nbsp_ + V_ui_wrap_kbd("ESC") + _2nbsp_;
        T.tips.show([
            key1 + "调整聚光灯大小" + key2 + "退出",
            key1 + "Adjust the size of the spotlight" + key2 + "Exit"
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
        if (!T.isEnabled())
            return;

        // 聚光灯模式
        T.ui.c(_background_, "radial-gradient(circle at "
            + T.lastPos.x + "px " + T.lastPos.y + "px, "
            + "transparent " + T.radius + "px, "
            + "rgba(0, 0, 0, 0.4)" + (T.radius + 5) + "px, rgba(0, 0, 0, 0.9) 900px)");
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
        // 已打开，则关闭
        if (T.isEnabled()) {
            T.hide();
        }
        // 未打开，则打开
        else {
            T.show();
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
        JQ_removeClass(T.toolbar.btns[_spotlight_], _selected_);
        JQ_removeClass(VOM_doc(), _vSpotlightInDark_);
        T.ui.hide();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (code) {
            case 16: // Shift
                T.toggleZoom();
                handled = true;
                break;
            case 27: // ESC
                if (T.isEnabled()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
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
    T.pointerScope = "body *";

    /**
     * 使用激光笔
     */
    T.show = function () {
        JQ_removeClass(T.toolbar.btns[_spotlight_], _selected_);
        JQ_addClass(T.toolbar.btns[_laserPointer_], _selected_);

        T.enable = gTrue;
        JQ_addClass($(T.pointerScope), _vCursorLaser_);

        T.tips.show(V_ui_wrap_kbd("ESC") + _2nbsp_ + [
            "退出",
            "Exit"
        ][V_lang_id]);
    }

    /**
     * 是否已显示
     */
    T.isEnabled = function () {
        return T.enable;
    }

    /**
     * 切换激活笔开关
     */
    T.tg = function () {
        // 已打开，则关闭
        if (T.isEnabled()) {
            T.hide();
        }
        // 未打开，则打开
        else {
            T.show();
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
        JQ_removeClass(T.toolbar.btns[_laserPointer_], _selected_);
        JQ_removeClass($(T.pointerScope), _vCursorLaser_);
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (T.isEnabled()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
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

    T.ui.ap(V_ui_span("v-segment-indicator"));
    // T.ui.ap('<span class="v-segment-indicator"></span>');
    T.indicator = T.ui.ch(".v-segment-indicator"); // 当前选中分段的滑块

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
            ui = V_ui_input(id, T.group, "radio", name, 'onfocus="this.blur()"' + (status ? ' ' : ' ' + _dataResult_ + '="' + _none_ + '"' + (checked ? ' checked' : '')))
                + V_ui_label(_vSegmentBtn_ + ___ + name, V_attr("for", id) + ___ + V_attr(_dataIcon_, icon),
                    V_ui_svgIcon(icon, 16, 16, _dark_)
                );

        T.ui.ap(ui);
        target.ui.entry = T.ui.ch("." + _vSegmentBtn_ + "." + name);

        // 指定为默认选项
        if (checked) {
            T.last = target;
            __updateIcon(gTrue);
        }

        // 为新添加的段绑定事件
        T.ui.f(_input_ + "#" + id).change(function () {
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
            T.last.ui.entry.hm(V_ui_svgIcon(T.last.ui.entry.a(_dataIcon_)
                + (checked ? __checked_ : _) , 16, 16, _dark_));
        }
    }

    /**
     * 获得当前选中的分段
     * @returns string 当前选中的分段
     */
    T.checkedItem = function () {
        return T.ui.f(_input_ + V_attrX(_name_, T.group) + ":" + _checked_).val();
    }

    /**
     * 获得、设置指定分段的状态
     * @returns 无 value 时，返回指定分段的状态
     */
    T.sts = function (target, value) {
        let id = T.group + "-" + target.typeName();
        if (value === gUndefined) {
            return T.ui.f(_input_ + V_attrX(_id_, id)).a(_dataResult_);
        }

        if (value) {
            JQ_removeAttr(T.ui.f(_input_ + V_attrX(_id_, id)), _dataResult_);
        }
        else {
            T.ui.f(_input_ + V_attrX(_id_, id)).a(_dataResult_, _none_);
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
        T.ui.ch("." + _vSegmentBtn_).c(_margin_, "0 0 0 " + space + "px")
            .c(_width_, width + "%");
        // 修正第一个
        T.ui.ch("." + _vSegmentBtn_ + _first_).c(_margin_, 0);

        // 更新当前选择分段相关 UI
        if (T.last === gUndefined)
            return;
        let target = T.last.ui.entry;
        T.indicator.c(_left_, target.pos().left + JS_parseInt(target.c(_marginLeft_)))
            .c(_width_, target.w());
    }
}

// ==================== 导航中心类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param runMode 关闭模式
 */
function NavCenter(mask, runMode = _auto_) {
    let T = this;
    T.ui = $(".v-nav-center"); // 导航中心主界面
    T.handle = $(".v-toc-handle"); // 导航中心引导把手

    // 关键字搜索
    T.__keywordBody = $(".v-serch-by-keyword");
    T.keyword = new TextField(T.__keywordBody, "toc-filter-nav-center", gTrue);

    T.runMode = (runMode === gUndefined) ? _auto_ : runMode; // 导航中心运行方式
    T.lastDisplayType = _float_; // 最后一次的显示方式（float/block）
    T.showed = gFalse; // 是否已显示

    T.width = T.ui.w(); // 导航中心宽度

    T.chpNav = gUndefined; // 联动的章节导航栏
    T.toolbar = gUndefined; // 联动的工具栏

    T.snapTimer = null; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    T.segs = new SegmentControl($(".v-segment.toc"), "toc-segment");
    TocIndex_segments = T.segs;

    // 目录索引组件
    T.catalog = T.segs.add(new TocCatalog(this, gFalse), _icoTocTabCatalog_, gTrue, gFalse);
    // 插图索引组件
    T.figure = T.segs.add(new TocFigure(this, gTrue), _icoTocTabFigure_, gFalse, gFalse);
    // 表格索引组件
    T.table = T.segs.add(new TocTable(this, gTrue), _icoTocTabTable_, gFalse, gFalse);
    // 多媒体索引组件
    T.media = T.segs.add(new TocMedia(this, gTrue), _icoTocTabMedia_, gFalse, gFalse);
    // 代码块索引组件
    T.codeblock = T.segs.add(new TocCodeblock(this, gTrue), _icoTocTabCodeblock_, gFalse, gFalse);
    // 访问历史组件
    T.history = T.segs.add(new TocHistory(this, gTrue), _icoTocTabHistory_, gFalse, gFalse);

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    T.segs.update();

    V_ui_addAnimate(T.handle);

    /**
     * 当前章节变化事件
     */
    T.catalog.onChapterChanged = function () {
        // 更新逐章导航内容
        if (T.chpNav !== gUndefined)
            T.chpNav.update();
    }

    // 关键字输入组件属性设置
    T.keyword.setIcon(V_ui_svgIcon(_icoRetrieval_, 16, 16, _alpha_));

    let cmdKey = _;
    T.keyword.placeholder([
        "按下 [" + cmdKey + "／] 进行搜索",
        "Type [" + cmdKey + "／] to search"
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
        if (T.lastDisplayType !== _float_) {
            JQ_addClass(VOM_doc(), _actived_);
            let search = $("." + _vFocusSearch_);
            JQ_addClass(search, _actived_);
        }
    }

    T.keyword.onBlur = function (source) {
        JQ_removeClass(VOM_doc(), _actived_);
        JQ_removeClass($("." + _vFocusSearch_), _actived_);
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

    /**
     * 跳转回文档封面
     */
    T.gotoCover = function () {
        WINDOW_setHref("#");
        // 【有封面】模式时处理
        if (VOM_cover() !== gUndefined) {
            if (T.catalog.currentItem !== gUndefined) {
                JQ_removeClass(T.catalog.currentItem, _vTocItemCurrent_);
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
        if (T.lastDisplayType === _float_)
            T.hide(_auto_);
    }

    /**
     * 显示/隐藏导航中心
     * @param callback 显示/隐藏导航中心后执行回调函数
     */
    T.tg = function (callback) {
        // 导航中心已显示
        if (T.showed) {
            T.hide("closed");
        }
        // 导航中心未显示
        else {
            T.runMode = _auto_;
            // 在封面，或小屏
            if (!T.catalog.inHeader() || V_ui_isSmallScreen()) {
                T.show(_float_);
            }
            // 在章节内，非小屏
            else {
                // 导航中心运行模式为 auto 时，自动显示导航中心
                if (T.runMode === _auto_)
                    T.show(_block_);
            }
        }

        typeof(callback) === _function_ && callback();
        T.afterToggle();
    }

    /**
     * 显示导航中心
     * @param lastDisplayType float: 以浮动形式显示，block: 以占位形式显示
     * @returns boolean true: 需要处理显示，false: 已显示，无须重复处理
     */
    T.show = function (lastDisplayType) {
        // 已显示，或在以动画显示过程中
        if (V_pageMode !== "max" || T.showed || T.ui.oL() > -T.width) {
            return gFalse;
        }

        T.ui.c(_left_, 20);
        T.handle.hide();

        T.lastDisplayType = lastDisplayType;
        // 以「占位方式」显示导航中心
        if (T.lastDisplayType === _block_) {
            // 占位方式的样式设置
            JQ_removeClass(T.ui, _vNavCenterFloat_);
            JQ_removeClass(T.ui, _vFloatCard_);
            JQ_addClass(T.ui, _vNavCenterBlock_);

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_addClass(T.toolbar.btns[_navCenter_], _selected_);

            VOM_doc().c(_marginLeft_, _writeMarginLeft_);

            // 因为从切换为占位显示后，会影响文档内容布局，所以须调整随大小变化的内容
            if (!T.showed) {
                setTimeout(function () {
                    // 重定位至当前锚点
                    V_util_redirectTo();
                    // 统一同组的分栏引用块的高度
                    ExtQuote_uniteColumnsHeight();
                }, 300);
            }
        }
        // 以「浮动方式」显示导航中心
        else if (T.lastDisplayType === _float_) {
            // 浮动方式的样式设置
            JQ_removeClass(T.ui, _vNavCenterBlock_);
            JQ_addClass(T.ui, _vNavCenterFloat_);
            JQ_addClass(T.ui, _vFloatCard_);

            // 显示联动的遮罩
            T.mask.show();

            // 若文档可视空间比导航中心宽度要小，则进行微调
            if ($(window).w() < T.width + 20)
                T.ui.c(_width_, $(window).w() - 20);
            // 若文档空间比导航中心宽度大，则直接显示原始大小
            else
                T.ui.c(_width_, T.width);
        }

        T.showed = gTrue;
        return gTrue;
    }

    /**
     * 隐藏导航中心
     * @param runMode 导航中心的运行模式（auto/closed）
     * @returns boolean true: 需要处理隐藏，false: 已显示，无须重复处理
     */
    T.hide = function (runMode = _auto_) {
        // 已隐藏，或在以动画隐藏过程中
        if (!T.showed || T.ui.oL() < 10)
            return gFalse;

        // 若最后一次显示以是「占位方式」显示
        if (T.lastDisplayType === _block_) {
            // 更新运行模式
            T.runMode = runMode;

            // 统一同组的分栏引用块的高度
            ExtQuote_uniteColumnsHeight();

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_removeClass(T.toolbar.btns[_navCenter_], _selected_);
        }

        T.ui.c(_left_, V_util_getVarVal(_varNavCenterHiddenLeft_));

        // 恢复不挤压文档正文区
        VOM_doc().c(_marginLeft_, 0);

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
        if (T.showed && T.lastDisplayType === _block_)
            VOM_doc().c(_marginLeft_, _writeMarginLeft_);

        T.width = T.ui.w();

        T.keyword.setWidth(T.width - 2 - JS_parseInt(T.__keywordBody.c(_marginLeft_)) * 2);

        // 根据最新窗口大小调整宽度
        T.segs.update();

        // 在封面，或为小屏
        if (!T.catalog.inHeader() || V_ui_isSmallScreen()) {
            // 自动隐藏导航中心
            result = T.hide(_auto_);

            // 根据最新窗口大小调整收起位置
            T.ui.c(_left_, V_ui_var(_varNavCenterHiddenLeft_));

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                JQ_removeClass(T.toolbar.btns[_navCenter_], _selected_);
        }
        // 不在封面
        else {
            // 导航中心运行模式为 auto 时，自动显示导航中心
            if (T.runMode === _auto_) {
                // 以占位方式显示导航中心
                result = T.show(_block_);

                // 根据最新窗口大小调整导航中心宽度
                T.ui.c(_width_, _varNavCenterWidth_);

                // 更新工具栏导航中心按钮图标
                if (!env.device.mobile)
                    JQ_addClass(T.toolbar.btns[_navCenter_], _selected_);
            }
        }
        return result;
    }

    /**
     * 显示导航中心引导把手
     */
    T.showHandle = function () {
        if (V_pageMode !== "max")
            return;

        T.handle.c(_top_, ($(window).h() - T.handle.h()) / 2);
        T.handle.show();
    }

    /**
     * 鼠标位置变化对导航中心处理
     */
    T.snap = function (event) {
        // 已显示则跳过
        if (T.showed || env.device.mobile)
            return;

        // 鼠标离左边缘小于指定值时
        if (event.clientY > 200 && event.clientY < ($(window).h() - 300) && event.clientX <= 20) {
            if (T.snapTimer != null)
                return;

            JQ_addClass(T.handle, _hover_);

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            T.snapTimer = setTimeout(function () {
                JQ_removeClass(T.handle, _hover_);
                T.show(_float_);
            }, 1000);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (T.snapTimer != null) {
                clearTimeout(T.snapTimer);
                T.snapTimer = null;
                JQ_removeClass(T.handle, _hover_);
            }
        }
    }

    /**
     * 显示/隐藏导航中心，并进行关联处理
     */
     T.afterToggle = function () {
        if (iNavCenter.lastDisplayType === _block_)
            ContentFolder_adjust();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        // 文档库热键操作
        T.docLib.disposeHotkey(code, combKeys, event);

        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (!T.keyword.inputing && T.showed && T.lastDisplayType === _float_) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

/**
 * 导航中心初始化
 */
NavCenter.init = function () {
    // 提取文档中由[toc]标签生成的文档目录作为浮动 outline 中的内容
    // let toc = $("." + s_MdToc);
    // 没有生成目录
    if (gToc.isEmpty()) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 有生成目录，则复制 toc 内容
    let vlookToc = gToc.clone();
    // 隐藏原目录
    gToc.hide();
    // 将复制的目录进行唯一性标识
    vlookToc.f(".md-toc-content").a(_id_, _vlookToc_);
    iNavCenter.catalog.ui.body.ap(vlookToc);

    gTocContent = $("#" + _vlookToc_);
    gToc = gTocContent.p(); // 更新引用块
    // 检查目录内容情况
    if (gTocContent.isEmpty()) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 文库
    iNavCenter.docLib = new DocLib(new BgMask("doc-lib", _center_), this);
    // 当前文档不是 mini 类型（文库类文档一般为 mini 类型）
    if (V_pageMode !== _mini_) {
        // 文库
        if (iNavCenter.docLib.length === 0)
            ALERT(_failed_ + "iDocLib ]");
        else if (V_util_getParamVal(_vdl_) !== _off_) {
            iNavCenter.docLib.init();
        }
    }
    // 根据文库配置显示入口
    if (iNavCenter.docLib.enabled)
        iToolbar.btns[_docLib_].c(_display_, "flex");

    // 有 Typora 生成的原始目录节点，针对 VLOOK 的封面规则进行调整
    let tocSet = gTocContent.ch(".md-toc-h1, .md-toc-h2, .md-toc-h3, .md-toc-h4, .md-toc-h5, .md-toc-h6"),
        tocSetLength = tocSet.length,
        hasCover = (VOM_cover() !== gUndefined);
    tocSet.e(function (i) {
        let _t = $(this);
        // 只处理 h1～h5 的目录节点
        if (_t.a(_class_).i("md-toc-h6") === -1) {
            if (hasCover) { // 文档有封面时
                if (i < tocSetLength - 1) // 未到最后一个元素
                    iNavCenter.catalog.add(_t);
                else // 最后一个 h1 为封底，移除
                    JQ_remove(_t);
            }
            else
                iNavCenter.catalog.add(_t);
        }
        // 移除无效的目录节点（如：封面、封底、普通的 h6 节点）
        else
            JQ_remove(_t);
    });

    // 不指定打开，则默认收起所有含子章节的 h1 章节
    let tocAutoCloseLevel = V_util_getParamVal("toc");
    tocAutoCloseLevel = (tocAutoCloseLevel !== gUndefined) ? JS_parseInt(tocAutoCloseLevel) : 1;
    if (tocAutoCloseLevel >= 1 && tocAutoCloseLevel <=5) {
        gTocContent.ch(".md-toc-h" + tocAutoCloseLevel + V_attrX(_dataNode_, "1") + V_attrX(_dataFolded_, _false_)).e(function () {
            iNavCenter.catalog.disposeFold($(this).a(_id_), "c", gTrue);
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
        "No [TOC] information was found in the document, export it with the latest version of Typora and apply the latest VLOOK plug-in."
    ][V_lang_id]);
}

// ==================== 逐章导航类 ==================== //

/**
 * 构造函数
 */
function ChapterNav() {
    let T = this,
        __prev = "." + _vChapterNav_ + "-prev",
        __current = "." + _vChapterNav_ + "-current",
        __next = "." + _vChapterNav_ + "-next",
        __dt = "." + _vChapterNav_ + "-doc-title";
    // 逐章导航面板主界面
    T.ui = $("." + _vChapterNav_ + "");

    T.prev = {
        ui : $(__prev), // 前一章界面
        text: $("." + _vChapterNav_ + "-prev-text"), // 前一章文本界面
    };

    T.current = {
        ui : $(__current), // 当前章节界面
    };

    T.next = {
        ui : $(__next), // 后一章界面
        text : $("." + _vChapterNav_ + "-next-text"), // 后一章文本界面
    };

    // 文档标题
    T.dt = $(__dt);
    T.dt.t(V_util_getDocTitle());

    if (V_pageMode !== "max")
        T.ui.hide();

    /**
     * 初始化动效
     */
    T.adjustEffectLevel = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (V_ui_effect >= 1) {
            JQ_addClass($(target), _effect_);
            V_ui_addAnimate($(target + ".effect"));
        }
        else {
            JQ_exchangeClass($(target), _effect_, "noeffect");
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
        if (T.prev.text.a(_dataAnchor_) === _cover_)
            iNavCenter.gotoCover();
        else
            iNavCenter.catalog.gotoHeader(T.prev.text);
    });

    /**
     * 回到封面
     */
    T.dt.uC().ck(function () {
        ToolTips_hide();
        if ($(this).a(_disabled_) === gUndefined)
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
            T.prev.ui.c(_display_, _block_);
            T.prev.text.t($("#" + iNavCenter.catalog.h[curIdx - 1]).t());
            T.prev.text.a(_dataAnchor_, iNavCenter.catalog.h[curIdx - 1]);

            // 【无封面】模式时处理
            if (VOM_cover() === gUndefined) {
                JQ_removeClass(T.dt, _inStart_);
                JQ_removeAttr(T.dt, _disabled_);
                T.adjustEffectLevel(__dt);
                ToolTips_bind(T.dt, _center_);
                // __bindEvent(T.dt, s_Center);
            }
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (iNavCenter.catalog.inFirstHeader()) {
            T.prev.text.t([
                "封面",
                "Cover"
            ][V_lang_id]);
            T.prev.text.a(_dataAnchor_, _cover_);
        }
        // 「无封面」模式时对「文档标题」章节的特殊处理
        else if (iNavCenter.catalog.inDocTitle()) {
            T.prev.ui.hide();
            T.current.ui.hide();
            // 调整为在文档开始位置时的样式
            JQ_removeClass(T.dt, "noeffect effect hover");
            JQ_addClass(T.dt, _inStart_);
            T.dt.a(_disabled_, _true_);
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

            let headerNum = iNavCenter.catalog.currentItem.a(_dataHeaderNum_);
            if (headerNum === gUndefined)
                headerNum = _;
            T.current.ui.hm(V_ui_span(_, _, headerNum)
                + iNavCenter.catalog.currentItem.a(_title_));
            T.current.ui.a(_dataAnchor_, iNavCenter.catalog.h[curIdx]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (curIdx < iNavCenter.catalog.h.length - 1) {
            T.next.ui.show();
            T.next.text.t($("#" + iNavCenter.catalog.h[curIdx + 1]).t());
            T.next.text.a(_dataAnchor_, iNavCenter.catalog.h[curIdx + 1]);
        }
        else
            T.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    T.show = function () {
        // 若已显示则直接退出
        if (V_pageMode !== "max" || JS_parseInt(T.ui.c(_top_)) >= 0)
            return;

        JQ_addClass(T.ui, _vFloatCard_);
        T.ui.c(_top_, 0);
        T.ui.show();
    }

    /**
     * 隐藏逐章导航栏
     */
    T.hide = function () {
        // 若已隐藏则直接退出
        if (JS_parseInt(T.ui.c(_top_)) < 0)
            return;

        JQ_removeClass(T.ui, _vFloatCard_);
        T.ui.c(_top_, -50);
        T.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    T.adjust = function () {
        // 在封面时，隐藏逐章导航栏
        if (!iNavCenter.catalog.inHeader()) {
            T.hide();
            JQ_addClass(MoreDocContent_ui_before, _cover_);

            // 初始化前 / 后章节数据
            T.prev.text.a(_dataAnchor_, _cover_);
            T.next.text.a(_dataAnchor_, iNavCenter.catalog.h[0]);
        }
        // 不在封面时，显示逐章导航栏
        else {
            JQ_removeClass(MoreDocContent_ui_before, _cover_);
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
            ToolTips_bind(T.prev.ui, _auto_);
            // 文档标题
            ToolTips_bind(T.dt, _center_);
            // 当前章节
            ToolTips_bind(T.current.ui, _center_);
            // 下一章
            ToolTips_bind(T.next.ui, _right_);
        }
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (code) {
            case 188: // ,
            case 37: // ←
                T.prev.ui.tr(_click_);
                // 自适应页面内容显示
                iNavCenter.catalog.focusHeader();
                handled = true;
                break;
            case 190: // .
            case 39: // →
                T.next.ui.tr(_click_);
                // 强制设置滚动间隔已超时，以强制触发 focusHeader 中的处理
                V_doc_scroll_update(0, 0);
                // 自适应页面内容显示
                iNavCenter.catalog.focusHeader();
                handled = true;
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
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
        return $(V_attrX(_dataId_, "vk-pg-" + T.curIdx));
    }

    /**
     * 切换段落导航开关
     * @returns boolean true：开启，false：关闭
     */
    T.tg = function (target) {
        T.enabled = !T.enabled;
        if (T.enabled) {
            JQ_addClass(T.toolbar.btns[_paragraphNav_], _selected_);
            MoreDocContent_hideAfter();

            // 显示工具底栏提示信息
            let key1 = V_ui_wrap_kbd("J") + _2nbsp_ + "↑" + _2nbsp_,
                key2 = _2nbsp_ +"-" + _2nbsp_ + V_ui_wrap_kbd("K") + _2nbsp_ + "↓" + _2nbsp_,
                key3 = _2nbsp_ + _2nbsp_ +"/" + _2nbsp_ + _2nbsp_ + V_ui_wrap_kbd("ESC") + _2nbsp_;
            T.tips.show([
                key1 + "上一个段落"
                    + key2 + "下一个段落"
                    + key3 + "退出",
                key1 + "Previous paragraph"
                    + key2 + "Next paragraphs"
                    + key3 + "Exit"
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
        item.a(_dataId_, "vk-pg-" + T.count);
        item.a(_dataPgIdx_, T.count);
        T.count++;

        // 单击内容块处理
        item.uC().ck(function () {
            // 未激活段落导航模式模式
            if (!iParagraphNav.enabled) {
                if (ThreeClicker_tick()
                    && iParagraphNav.tg(item)) {
                        iSpotlight.hide();
                        iLaserPointer.hide();
                    }
            }
            else {
                T.goto(item);
                if (ThreeClicker_tick()) {
                    iParagraphNav.tg(item);
                }
            }
        });
    }

    /**
     * 上一个段
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    T.prevPg = function (step) {
        if (!T.enabled)
            return gFalse;

        T.blurFocus();

        // 未到首段
        if (T.curIdx > 0) {
            T.curIdx = T.curIdx - step;

            if (T.curIdx < 0)
                T.curIdx = 0;

            // 如果目标内容块 item 跳转失败，则再尝试上一个
            if (!T.goto(0))
                T.prevPg(1);

            return gTrue;
        }
        return gFalse
    }

    /**
     * 下一个段
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    T.nextPg = function (step) {
        if (!T.enabled)
            return gFalse;

        T.blurFocus();

        // 未到末段
        if (T.curIdx < T.count - 1) {
            T.curIdx = T.curIdx + step;

            // 跳转 step 后修正超出最大值的情况
            if (T.curIdx > T.count - 1)
                T.curIdx = T.count - 1;

            // 如果目标内容块 item 跳转失败，则再尝试下一个
            if (!T.goto(0))
                T.nextPg(1);

            return gTrue;
        }
        return gFalse;
    }

    /**
     * 跳到指定的内容块，或最新的_blockFocusItemIndex指定的内容块
     * @param target 跳转的目标。0: 指定跳到上/下一个位置，非0: 指定的目标位置
     */
    T.goto = function (target) {
        T.blurFocus();

        // 初始化目标段
        let item = (target === 0)
            ? T.cur()
            : target;

        // 若目标聚焦块为空（可能是对象已在其他处理过程中被删除）、不可视等情况
        // 则返回跳转失败
        if (item === gUndefined || item.isHidden() || item.o() === gUndefined)
            return gFalse;

        // 添加高亮样式
        JQ_addClass(item, _vPgCurrentItem_);
        T.curIdx = JS_parseInt(item.a(_dataPgIdx_));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.h() * 3;
        if (item.oT() !== 0
            && ((item.oT() - height) < $(document).scrollTop()
            || (item.oT() + height) > ($(document).scrollTop() + $(window).h()))) {
                DOM_html().scrollTop(item.oT() - $(window).h() / 2);
        }

        return gTrue; // 返回跳转成功
    }

    /**
     * 让当前聚焦段其失去聚焦效果
     */
    T.blurFocus = function () {
        if (T.cur() !== gUndefined)
            JQ_removeClass(T.cur(), _vPgCurrentItem_);
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    T.hide = function () {
        MoreDocContent_refresh();
        T.tips.hide();
        JQ_removeClass(T.toolbar.btns[_paragraphNav_], _selected_);
        T.enabled = gFalse;
        T.blurFocus();
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (!T.enabled)
            return;

        let handled = false;
        switch (code) {
            case 74: // J
                TableCross_hide();
                if (T.nextPg(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用块
                handled = true;
                break;
            case 75: // K
                TableCross_hide();
                if (T.prevPg(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用块
                handled = true;
                break;
            case 27: // ESC
                if (T.enabled) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

/**
 * 初始化段落导航模式
 */
ParagraphNav.init = function () {
    iParagraphNav = new ParagraphNav(new BottomTips(_paragraphNav_));
    // 添加关联组件
    iParagraphNav.toolbar = iToolbar;

    // 先清理多余的段落标签
    $("li>p:only-child").contents().unwrap();

    // 初始化
    $("h1, h2, h3, h4, h5, h6, ul>li, summary, ol>li, p[class!=md-toc-content], figure, .md-diagram-panel, .MathJax_SVG_Display").e(function () {
        let item = $(this);
        // 跳过不可见元素、子元素有嵌套 p 的情况，如li > p
        if (item.is(":" + _visible_)
            && (item.ch("p").length === 0 || V_util_getTagName(item) === "details")) {
            iParagraphNav.add(item);

            // 双击内容块
            item.on("dblclick", function () {
                // 激活三击检查
                // 配合段落的单击事件对 ThreeClicker_tick() 的判断实现
                ThreeClicker_active();
            });
        }
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
    T.ui = $("." + _vToolbar_); // 工具栏主界面
    T.btns = []; // 工具栏按钮集
    T.chpNav = chpNav;

    if (V_pageMode !== "max")
        T.ui.hide();

    /**
     * 添加按钮
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    T.add = function (name, clickEvent) {
        T.btns[name] = $(".v-btn." + name);

        T.btns[name].uC().ck(function () {
            ToolTips_hide();
            typeof(clickEvent) === _function_ && clickEvent();
        });

        // hover 事件处理
        T.btns[name].hover(function () {
            let _t = $(this),
                btnGroup = _t.a(_dataBtnGroup_);
            if (btnGroup !== gUndefined)
                JQ_addClass($(".v-btn-group." + btnGroup), _hover_);
            ToolTips_show(_t, _auto_);
        }, function () {
            let btnGroup = $(this).a(_dataBtnGroup_);
            if (btnGroup !== gUndefined)
                JQ_removeClass($(".v-btn-group." + btnGroup), _hover_);
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
        if (V_pageMode !== "max")
            return;

        // 移动端下隐藏不必要的功能入口
        if (env.device.mobile) {
            T.btns[_paragraphNav_].hide();
            T.btns[_spotlight_].hide();
            T.btns[_laserPointer_].hide();
            T.btns[_print_].hide();
            T.btns[_toolbarSpliter_].hide();
        }

        // 如果是小屏，或在封面
        if (V_ui_isSmallScreen() || !iNavCenter.catalog.inHeader()) {
            let offsetY = 0;
            // 小屏
            if (V_ui_isSmallScreen()) {
                T.ui.c(_paddingLeft_, 0)
                    .c(_paddingRight_, 0)
                    .c(_top_, 50 + offsetY);
            }

            // 微调工具栏分隔宽度
            T.btns[_toolbarSpliter_].c(_width_, 20);

            // 调整工具栏样式
            JQ_removeClass(T.ui, _vFloatCard_);
            JQ_addClass(T.ui, _cover_);

            // 为去掉工具栏背景的按钮添加浮动样式
            JQ_addClass(T.ui.ch(_vBtn__BtnGroup_), _vFloatCard_);
            JQ_addClass(T.ui.ch(_vBtn__BtnGroup_), _float_);

            // 大屏，回到封面及最开始位置进行二次调整
            if (!V_ui_isSmallScreen()
                && !iNavCenter.catalog.inHeader()) {
                if ($(document).scrollTop() <= 5) {
                    T.ui.c(_paddingLeft_, 10)
                        .c(_paddingRight_, 10)
                        .c(_top_, 10);
                }
                else {
                    T.ui.c(_paddingLeft_, 10)
                        .c(_paddingRight_, 10)
                        .c(_top_, 0);
                }
            }
            else {
                // 小屏，在非封面位置进行二次调整
                if (V_ui_isSmallScreen() && iNavCenter.catalog.inHeader())
                    T.ui.c(_paddingLeft_, 0)
                        .c(_paddingRight_, 0)
                        .c(_top_, 50 + offsetY);
                else {
                    // 小屏，在封面及最开始位置进行二次调整
                    if ($(document).scrollTop() <= 5)
                        T.ui.c(_paddingLeft_, 10)
                            .c(_paddingRight_, 10)
                            .c(_top_, 10);
                    // 小屏，在封面位置进行二次调整
                    else
                        T.ui.c(_paddingLeft_, 10)
                            .c(_paddingRight_, 10)
                            .c(_top_, 0);
                }
            }
        }
        // 宽屏，且不在封面
        else {
            if (T.ui.oT() === 0)
                return;

            // 调整工具栏样式
            JQ_removeClass(T.ui, _cover_);
            JQ_addClass(T.ui, _vFloatCard_);

            // 微调工具栏分隔宽度
            let btnCount = T.ui.f(".v-btn").length,
                btnWidth = JS_parseInt(V_util_getVarVal("--v-tb-btn-w")),
                space = JS_parseInt(V_util_getVarVal("--v-tb-btn-s"));
            T.btns[_toolbarSpliter_].c(_width_, "calc((" + _varNavCenterWidth_ + " - "
                    + (btnCount * btnWidth + JS_parseInt(T.ui.c(_paddingLeft_)) * 2 + (btnCount - 4) * space) + "px) / 2)");

            T.ui.c(_paddingLeft_, 10)
                .c(_paddingRight_, 10)
                .c(_top_, 0);
            // 为增加了工具栏按钮的背景去掉浮动样式
            JQ_removeClass(T.ui.ch(_vBtn__BtnGroup_), _vFloatCard_);
            JQ_removeClass(T.ui.ch(_vBtn__BtnGroup_), _float_);
        } // else
        T.ui.show();
    }
}

// ==================== 颜色方案类 ==================== //

/**
 * 构造函数
 */
function ColorScheme() {}

ColorScheme.scheme = _light_; // 当前颜色以方案，light/dark
ColorScheme.schemeBeforePrint = _light_; // 打印前的颜色方案

/**
 * 初始化
 */
ColorScheme.init = function () {
    const __lightIcon = document.querySelector("link#" + _docIcon_ + _light_);
    const __darkIcon = document.querySelector("link#" + _docIcon_ + _dark_);

    // Light Mode 时的文档图标
    function __setLightIcon() {
        // 浏览器中显示的文档图标
        JQ_remove(__darkIcon);
        document.head.append(__lightIcon);
    }

    // Dark Mode 时的文档图标
    function __setDarkIcon() {
        // 浏览器中显示的文档图标
        JQ_remove(__lightIcon);
        document.head.append(__darkIcon);
    }

    // 根据系统 Color Scheme 变化进行适配更新颜色方案
    function __syncScheme(matcher) {
        if (matcher.matches) {
            __initScheme(gTrue);
            ColorScheme.tg(_dark_);
        }
        else {
            __initScheme(gFalse);
            ColorScheme.tg(_light_);
        }
    }

    // 根据系统 Color Scheme 变化进行适配更新图标
    function __initScheme(flag) {
        if (flag) {
            __setDarkIcon();
            ColorScheme.scheme = _dark_;
        }
        else {
            __setLightIcon();
            ColorScheme.scheme = _light_;
        }
        StsColorScheme_updateIcons();
    }

    // 监听系统的 Color Scheme 变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme:dark)');
    mediaQuery.addEventListener("change", __syncScheme);

    // 初始执行
    __initScheme(mediaQuery.matches);
}

/**
 * 切换颜色方案
 * @param scheme 指定方案，为空时则轮换
 */
ColorScheme.tg = function (scheme) {
    if (scheme === gUndefined)
        scheme = (ColorScheme.scheme === _light_) ? _dark_ : _light_;

    ColorScheme.scheme = scheme;
    INFO("    Switch to ... [ " + ColorScheme.scheme + " ]");
    // 应用最新颜色方案
    ColorScheme.refresh();

    if (iNavCenter.docLib.enabled)
        iNavCenter.docLib.reload(ColorScheme.scheme);

    INFO("    DONE!");
}

/**
 * 根据指定的颜色方案进行文档刷新
 */
ColorScheme.refresh = function () {
    StsColorScheme_updateIcons();
    // iToolbar.updateIcons();

    // 批量修改颜色方案相关的 CSS 变量为指定的新值
    let ac = "--ac-",
        _alt = "-a",
        _fade = "-fade",
        _fade_bd = "-fade-bd",
        _title = "-title",
        _cur = "--cur-",
        // ---
        acRed = ac + "rd",
        acOrange = ac + "og",
        acYellow = ac + "ye",
        acLime = ac + "lm",
        acGreen = ac + "gn",
        acMineral = ac + "mn",
        acOlives = ac + "ol",
        acWine = ac + "wn",
        acAqua = ac + "aq",
        acCyan = ac + "cy",
        acBlue = ac + "bu",
        acSea = ac + "se",
        acLavender = ac + "la",
        acVine = ac + "vn",
        acPurple = ac + "pu",
        acRose = ac + "ro",
        acPink = ac + "pk",
        acGold = ac + "gd",
        acBrown = ac + "bn",
        acGray = ac + "gy",
        acBlack = ac + "bk",
        acTheme1 = ac + "t1",
        acTheme2 = ac + "t2",
        // ---
        mm = "--mm-c-",
        // ---
        mmRed = mm + "rd",
        mmOrange = mm + "og",
        mmYellow = mm + "ye",
        mmGreen = mm + "gn",
        mmCyan = mm + "cy",
        mmBlue = mm + "bu",
        mmPurple = mm + "pu",
        mmPink = mm + "pk",
        mmBrown = mm + "bn",
        mmGray = mm + "gy",
        // ---
        cm = "--cm-";

    V_util_changeCssVarSet([
        "--v-invert-dark",
        "--v-brightness-dark",
        "--d-bc",
        "--d-bi",
        // "--d-bc-tsp",
        "--fade-r",
        "--fade-g",
        "--fade-b",
        "--d-fc",
        "--fig-solid-bg",
        "--v-fig-grid-l",
        "--v-fig-grid-b",
        "--v-fig-grid-l-invert",
        "--v-fig-grid-b-invert",
        "--pn-c",
        "--pn-c-a",
        // "--pn-c-tsp",
        "--pn-fade-r",
        "--pn-fade-g",
        "--pn-fade-b",
        "--blockquote-bg",
        "--a-color",
        "--mark-bg",
        "--tbl-bd",
        "--tbl-tr-hv",
        "--tbl-th-bg",
        "--tbl-td-bg",
        "--tbl-cell-bd",
        "--tbl-row-g-alpha",
        "--toc-h-num-color",
        "--h-f",
        "--h-box-shadow",
        "--h-bg-start",
        "--h-bg-end",
        "--code-bg",
        "--std-code-shadow",
        "--rb-code-shadow",
        "--c-blk-bg",
        "--key-bg",
        "--key-reflect",
        "--key-shadow",
        "--doc-shadow",
        _cur + "pointer",
        _cur + "copy-normal",
        _cur + "copy-as-md",
        _cur + "text",
        _cur + "laser",
        _cur + "md",
        _cur + "doclib",
        _cur + "http",
        _cur + "https",
        _cur + "email",
        _cur + "docment",
        _cur + "archive",
        _cur + "risk",
        _cur + "inner",
        acRed,
        acRed + _alt,
        acRed + _fade,
        acRed + _fade_bd,
        acRed + _title,
        acOrange,
        acOrange + _alt,
        acOrange + _fade,
        acOrange + _fade_bd,
        acOrange + _title,
        acYellow,
        acYellow + _alt,
        acYellow + _fade,
        acYellow + _fade_bd,
        acYellow + _title,
        acLime,
        acLime + _alt,
        acLime + _fade,
        acLime + _fade_bd,
        acLime + _title,
        acGreen,
        acGreen + _alt,
        acGreen + _fade,
        acGreen + _fade_bd,
        acGreen + _title,
        acMineral,
        acMineral + _alt,
        acMineral + _fade,
        acMineral + _fade_bd,
        acMineral + _title,
        acOlives,
        acOlives + _alt,
        acOlives + _fade,
        acOlives + _fade_bd,
        acOlives + _title,
        acWine,
        acWine + _alt,
        acWine + _fade,
        acWine + _fade_bd,
        acWine + _title,
        acAqua,
        acAqua + _alt,
        acAqua + _fade,
        acAqua + _fade_bd,
        acAqua + _title,
        acCyan,
        acCyan + _alt,
        acCyan + _fade,
        acCyan + _fade_bd,
        acCyan + _title,
        acBlue,
        acBlue + _alt,
        acBlue + _fade,
        acBlue + _fade_bd,
        acBlue + _title,
        acSea,
        acSea + _alt,
        acSea + _fade,
        acSea + _fade_bd,
        acSea + _title,
        acLavender,
        acLavender + _alt,
        acLavender + _fade,
        acLavender + _fade_bd,
        acLavender + _title,
        acVine,
        acVine + _alt,
        acVine + _fade,
        acVine + _fade_bd,
        acVine + _title,
        acPurple,
        acPurple + _alt,
        acPurple + _fade,
        acPurple + _fade_bd,
        acPurple + _title,
        acRose,
        acRose + _alt,
        acRose + _fade,
        acRose + _fade_bd,
        acRose + _title,
        acPink,
        acPink + _alt,
        acPink + _fade,
        acPink + _fade_bd,
        acPink + _title,
        acGold,
        acGold + _alt,
        acGold + _fade,
        acGold + _fade_bd,
        acGold + _title,
        acBrown,
        acBrown + _alt,
        acBrown + _fade,
        acBrown + _fade_bd,
        acBrown + _title,
        acGray,
        acGray + _alt,
        acGray + _fade,
        acGray + _fade_bd,
        acGray + _title,
        acBlack,
        acBlack + _alt,
        acBlack + _fade,
        acBlack + _fade_bd,
        acBlack + _title,
        acTheme1,
        acTheme1 + _alt,
        acTheme1 + _fade,
        acTheme1 + _fade_bd,
        acTheme1 + _title,
        acTheme2,
        acTheme2 + _alt,
        acTheme2 + _fade,
        acTheme2 + _fade_bd,
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
        cm + _mata_,
        cm + "bulidin",
        cm + "bracket",
        cm + "atom",
        cm + "number"
    ], (ColorScheme.scheme === _dark_) ? "dk" : "lg");

    // 针对 Dark Mode 进行适配处理
    ExtFigure_adjustColorScheme(gTrue);
}

// ==================== 字体风格选项、选择器类 ==================== //

// let webfontHostAlt = "https://madmaxchow.gitee.io/openfonts/";
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
    T.localTheme = new FontThemeOption($("." + _vFontThemeOpt_ + "-local"), []);
    // Book 风格选项
    T.bookTheme = new FontThemeOption($("." + _vFontThemeOpt_ + "-book"), []);
    // 小清新字体风格选项
    T.sansTheme = new FontThemeOption($("." + _vFontThemeOpt_ + "-sans"),
        [
            "VLOOK Number" + _normal_normal_, "VLOOK Number" + _normal_bold_, "VLOOK Number" + _normal_italic_,
            "VLOOK Digital Sans" + _normal_normal_, "VLOOK Digital Sans" + _normal_500_, "VLOOK Digital Sans" + _normal_bold_, "VLOOK Digital Sans" + _normal_900_,
            "VLOOK Sans Mono" + _normal_normal_, "VLOOK Sans Mono" + _normal_500_, "VLOOK Sans Mono" + _normal_bold_, "VLOOK Sans Mono" + _normal_900_,
            "VLOOK Sans" + _normal_normal_, "VLOOK Sans" + _normal_bold_, "VLOOK Sans" + _normal_900_
            ]);
    // 艺术范字体风格选项
    T.serifTheme = new FontThemeOption($("." + _vFontThemeOpt_ + "-serif"),
        [
            "VLOOK Number" + _normal_normal_, "VLOOK Number" + _normal_bold_, "VLOOK Number" + _normal_italic_,
            "VLOOK Digital Serif" + _normal_normal_, "VLOOK Digital Serif" + _normal_bold_, "VLOOK Digital Serif" + _normal_italic_, "VLOOK Digital Serif" + _italic_bold_,
            "VLOOK Serif Mono" + _normal_normal_, "VLOOK Serif Mono" + _normal_bold_, "VLOOK Serif Mono" + _normal_italic_, "VLOOK Serif Mono" + _italic_bold_,
            "VLOOK Serif" + _normal_500_, "VLOOK Serif" + _normal_900_,
            "VLOOK Sans Mono" + _normal_normal_, "VLOOK Sans Mono" + _normal_500_, "VLOOK Sans Mono" + _normal_bold_, "VLOOK Sans Mono" + _normal_900_,
            "VLOOK Sans" + _normal_normal_, "VLOOK Sans" + _normal_bold_, "VLOOK Sans" + _normal_900_
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
    T.bookTheme.ui.uC().ck(function () {
        T.apply("book");
        T.hide();
    });
    T.sansTheme.ui.uC().ck(function () {
        T.apply("sans");
        T.initWebFont();
        T.hide();
    });
    T.serifTheme.ui.uC().ck(function () {
        T.apply("serif");
        T.initWebFont();
        T.hide();
    });

    /**
     * 初始化
     * @param theme 可选。强制指定的字体主题
     */
    T.init = function (theme) {
        // 有指定强制字体主题，同时指定的字体主题合法且与文档配套的不一致，则进行处理
        if (theme !== gUndefined
            && theme.m(/^(local|sans|serif)$/i) != null
            && theme !== T.theme) {
                T.theme = theme;
                T.apply(T.theme);
        }

        LOG("_____ FONT THEME (" + T.theme + ") _____ ");

        T.initWebFont();

        // 对于本地字体主题的状态，直接为就绪
        $(":is(." + _vFontInfo_ + "-local, ." + _vFontInfo_ + "book) > #" + _fontsetStatus_).t("✅ " + [
            "已就绪",
            _ready_
        ][V_lang_id]);
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
                    $("." + _vFontInfo_ + "sans > #" + _fontsetStatus_).t(timeOutMsg);
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
                    $("." + _vFontInfo_ + "serif > #" + _fontsetStatus_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }

        // 动态加载字体 VLOOK Number
        function __loadNumberFont() {
            let fontName = "VLOOK Number",
                srcName = "Altinn-DIN";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.loadFont(fontName, _italic_, _normal_, srcName, srcName + _Italic);
        }

        // 动态加载字体 VLOOK Digital Sans
        function __LoadDigitalSansFont() {
            let fontName = "VLOOK Digital Sans",
                srcName = "NotoSansMono";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
            T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName + _Medium, unicodeRange);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
            T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black, unicodeRange);
        }

        // 动态加载字体 VLOOK Digital Serif
        function __LoadDigitalSerifFont() {
            let fontName = "VLOOK Digital Serif",
                srcName = "LuxiMono";
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
            T.loadFont(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular, unicodeRange);
            T.loadFont(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold, unicodeRange);
        }

        // 动态加载字体 VLOOK Sans Mono
        function __loadSansMonoFont() {
            let fontName = "VLOOK Sans Mono",
                srcName = "NotoSansMono";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName +_Medium);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Serif Mono
        function __loadSerifMonoFont() {
            let fontName = "VLOOK Serif Mono",
                srcName = "LuxiMono";
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.loadFont(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular);
            T.loadFont(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold);
        }

        // 动态加载字体 VLOOK Noto Sans CJK SC
        function __loadSansCjkFont() {
            let fontName = "VLOOK Sans",
                srcName = "NotoSansCJKsc";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Noto Serif CJK SC
        function __loadSerifCjkFont() {
            let fontName = "VLOOK Serif",
                srcName = "NotoSerifCJKsc";
            T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName + _Medium);
            T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
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
     * @param unicodeRange 指定应用的字符范围
     */
    T.loadFont = function (fontFamily, fontStyle, fontWeight, srcFontName, srcFontSubName, unicodeRange) {
        if (document.fonts && !T.isExist(fontFamily, fontStyle, fontWeight)) {
            let woffURL = "url('" + webfontHostAlt + srcFontName + "-" + _woff2_ + "/" + srcFontSubName + "." + _woff2_ + "') format('" + _woff2_ + "')",
                fontFace;
            if (unicodeRange === gUndefined) {
                fontFace = new FontFace(fontFamily,
                    ((_woff2_ !== gUndefined) ? woffURL : _), {
                        style: fontStyle,
                        weight: fontWeight,
                        display: "swap"
                    });
            }
            else {
                fontFace = new FontFace(fontFamily,
                    ((_woff2_ !== gUndefined) ? woffURL : _), {
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
                    readyMsg = "✅ " + ["已就绪", _ready_][V_lang_id],
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
                    sansStatus = $("." + _vFontInfo_ + "sans > #" + _fontsetStatus_);
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
                    serifStatus = $("." + _vFontInfo_ + "serif > #" + _fontsetStatus_);
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

        while (!item.done && !isHave) {
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
            JQ_addClass(T.localTheme.ui, _selected_);
            JQ_removeClass(T.bookTheme.ui, _selected_);
            JQ_removeClass(T.sansTheme.ui, _selected_);
            JQ_removeClass(T.serifTheme.ui, _selected_);
        }
        else if (T.theme === "book") {
            JQ_removeClass(T.localTheme.ui, _selected_);
            JQ_addClass(T.bookTheme.ui, _selected_);
            JQ_removeClass(T.sansTheme.ui, _selected_);
            JQ_removeClass(T.serifTheme.ui, _selected_);
        }
        else if (T.theme === "sans") {
            JQ_removeClass(T.localTheme.ui, _selected_);
            JQ_removeClass(T.bookTheme.ui, _selected_);
            JQ_addClass(T.sansTheme.ui, _selected_);
            JQ_removeClass(T.serifTheme.ui, _selected_);
        }
        else {
            JQ_removeClass(T.localTheme.ui, _selected_);
            JQ_removeClass(T.bookTheme.ui, _selected_);
            JQ_addClass(T.serifTheme.ui, _selected_);
            JQ_removeClass(T.sansTheme.ui, _selected_);
        }
    }

    /**
     * 是否已显示
     * @returns boolean
     */
    T.isShowed = function () {
        return T.ui.c(_display_) !== _none_;
    }
    /**
     * 显示/隐藏字体风格选择器
     */
    T.tg = function () {
        if (T.isShowed()) {
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
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (T.isShowed()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

// ==================== 脚注类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 */
function FootNote(mask) {
    let T = this;
    T.ui = $("." + _vFontnotePn_); // 脚注主界面
    T.content = $("." + _vFontnotePn_ + "-content"); // 脚注内容区

    T.buttonSeeAll = $("." + _vFontnotePn_ + "-footer"); // 查看所有脚注按钮
    T.buttonSeeAll.uC().ck(function () {
        T.hide();
        // 跳转至所有脚注区域
        WINDOW_setHref("#vk-footer-area");
    });

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    /**
     * 是否已显示
     * @returns boolean
     */
    T.isShowed = function () {
        return T.ui.c(_display_) !== _none_;
    }

    /**
     * 显示脚注弹层
     */
    T.show = function () {
        // 显示关联的遮罩
        T.mask.show();

        if (V_ui_isSmallScreen())
            T.ui.c(_left_, 20)
                .c(_right_, 20);
        else
            T.ui.c(_left_, "15%")
                .c(_right_, "15%");

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
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (T.isShowed()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

/**
 * 初始化脚注
 */
FootNote.init = function () {
    // 将 Typora 的脚注调整到封底前，VLOOK 规范的文档中最后一个 <h6> 是封底
    let footnotesArea = $("." + _footnotesArea_);
    // 「有封面」模式
    if (VOM_backcover() !== gUndefined)
        footnotesArea.insertBefore(VOM_backcover());
    // 「无封面」模式
    else
        VOM_doc().ap(footnotesArea);

    // 将 VLOOK 生成的脚注区锚点调整到生成 HTML 后的实际位置
    $("#vk-footer-area").insertBefore(footnotesArea);

    // 移除默认的跳转属性
    let a = $("a[name^='ref-footnote-'], a[id^='ref-footnote-']");
    JQ_removeAttr(a, _href_);
    // 将脚注角标的事件替换为指定的处理事件
    a.uC().ck(function () {
        // 获取脚注【返回】链接对应的脚注原文信息
        let _t = $(this),
            target = $("a[name='df" + _t.a(_name_) + "'], a[id='df" + _t.a(_name_) + "']").p().clone();

        // 更新脚注弹层内容区
        LOG(target, target.t());
        iFootNote.content.hm(target);
        // 移除默认的返回链接
        JQ_remove(target.f("a[name^='dfref-footnote'], a[id^='dfref-footnote']"));

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
    StatusBar_ui = $("." + _vStatusBar_);
    if (V_pageMode !== "max")
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
        JQ_remove(item.ui);
    }
}

/**
 * 自适应显示状态栏
 */
function StatusBar_adjust() {
    // 移动端下隐藏不必要的功能入口
    if (env.device.mobile) {
        JQ_remove(StatusBar_items["zoom-view"]);
    }
}

// ==================== 文档信息类 ==================== //

let StsDocInfo_ui = gUndefined,
    DocInfo_enabled = gTrue;
/**
 * 构造函数
 */
function StsDocInfo_init() {
    StsDocInfo_ui = $("." + _vDocInfo_);
}

/**
 * 统计字数
 */
function DocInfo_countWord() {
    if (!DocInfo_enabled)
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
        times = mins + ___ + [
            "分钟",
            "minutes"
        ][V_lang_id];
    if (mins > 60)
        times = (mins / 60).toFixed(1) + ___ + [
            "小时",
            "hours"
        ][V_lang_id];
    // 默认信息
    StsDocInfo_ui.a(_dataDefault_,
        times + " / " + V_formatting_thousands(wordCount.toString()) + ___
        + [
            "字",
            "words"
        ][V_lang_id]);
    // 扩展信息
    StsDocInfo_ui.a(_dataExtend_,
        "( " + V_formatting_thousands(cjkCount.toString()) + ___ + [
            "中日韩，",
            "CJK, "
        ][V_lang_id]
        + V_formatting_thousands(latinCount.toString()) + ___ + [
            "非中日韩",
            "Non-CJK"
        ][V_lang_id] + " )");
    // hover 时显示扩展信息
    StsDocInfo_ui.hover(function () {
        StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_) + _nbsp_
            + V_ui_span("v-doc-ext-info", _, StsDocInfo_ui.a(_dataExtend_)));
    }, function () {
        StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_));
    });
    StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_));
}

// ==================== 状态栏的字体主题类 ==================== //

let StsFontTheme_ui = gUndefined;
/**
 * 构造函数
 */
function StsFontTheme_init() {
    StsFontTheme_ui = $("." + _vStsFontTheme_);
    StsFontTheme_ui.a(_dataTips_, [
        "切换 字体风格",
        "Switch Font Theme"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("A")));

    ToolTips_bind(StsFontTheme_ui);
    StsFontTheme_ui.uC().ck(function () {
        iFontTheme.tg();
    });
}

// ==================== 状态栏的颜色模式类 ==================== //

let StsColorScheme_ui = gUndefined;
/**
 * 构造函数
 */
function StsColorScheme_init() {
    StsColorScheme_ui = $("." + _vColorScheme_);
    StsColorScheme_ui.a(_dataTips_, [
        "切换 [ " + V_ui_strong("黑暗") + " / " + V_ui_strong("明亮") + " ] 模式",
        "Switch " + V_ui_strong("Dark") + " / " + V_ui_strong("Light") + " Mode"
    ][V_lang_id] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("D")));

    ToolTips_bind(StsColorScheme_ui);
    StsColorScheme_ui.uC().ck(function () {
        ColorScheme.tg();
    });
}

/**
 * 更新按钮图标
 */
function StsColorScheme_updateIcons() {
    // 调整模式切换按钮图标
    StsColorScheme_ui.hm(V_ui_svgIcon(
        (ColorScheme.scheme === _light_ ? _icoDarkMode_ : _icoLightMode_),
        20, 20, _theme_));
}

// ==================== 链接检查器类 ==================== //

let StsLinkTool_ui = gUndefined,
    LinkTool_panel_list = gUndefined,
    LinkTool_panel_header = gUndefined,
    LinkTool_panel_body = gUndefined,
    LinkTool_enabled = gTrue,
    LinkTool_icon_error = _,
    // LinkTool_icon_close = __,
    LinkTool_mask = gUndefined;

/**
 * 构造函数
 */
function StsLinkTool_init(mask) {
    // let T = this;
    StsLinkTool_ui = $("." + _vLinkChkResult_); // 检查结果
    LinkTool_panel_list = $("." + _vLinkErrorList_); // 坏链主界面
    LinkTool_panel_header = $("." + _vLinkErrorList_ + "-header");
    LinkTool_panel_body = $("." + _vLinkErrorList_ + "-items"); // 坏链内容列表
    LinkTool_enabled = gTrue;

    LinkTool_icon_error = V_ui_svgIcon(_icoLinkError_, 16, 14, _light_);
    // LinkTool_icon_close = V_ui_generateSvgIcon(_icoClose_, 16, 16, s_Light);

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
    let xmd = V_util_getParamVal("xmd"),
        newExt = ".html";
    // 全局配置，禁用转换，则停止
    if (xmd === _off_)
        return;

    // 全局配置，指定转换的后缀
    if (xmd !== gUndefined)
        newExt = "." + xmd;

    $("a[href*='.md']").e(function () {
        let _t = $(this),
            href = _t.a(_href_),
            xmd = V_util_getUrlQueryParams(href)["xmd"];
        // 单个链接指定禁用转换，则停止
        if (xmd === _off_)
            return gFalse;

        // 单个链接指定转换的后缀
        if (xmd !== gUndefined)
            _t.a(_href_, href.r(".md", "." + xmd));
        else // 默认的全局后缀
            _t.a(_href_, href.r(".md", newExt));
    });
}

/**
 * 添加坏链项目
 * @param id 坏链对象的标识
 * @param content 坏链项目显示的内容
 */
function LinkTool_addToCheck(id, content) {
    let item = $(V_ui_span(_vTocItem_, V_attr(_dataAnchor_, "#" + id), content));
    // 添加链接异常样式及属性
    JQ_addClass($(item.a(_dataAnchor_)).a(_tabindex_, 0), "v-link-error-source");
    // 添加节点
    LinkTool_panel_body.ap(item);
    item.uC().ck(function () {
        JQ_removeClass(LinkTool_panel_body.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
        JQ_addClass(item, _vTocItemCurrent_);

        V_util_gotoHash(item.a(_dataAnchor_));
        LinkTool_hide();
    });
}

/**
 * 检查链接
 */
function LinkTool_checkLink() {
    if (!LinkTool_enabled)
        return;

    let count = 0;
    // 检查所有页内链接对应的锚点是否都存在
    $(_write_ + " a").e(function () {
        let _t = $(this),
            href = _t.a(_href_);
        // 忽略无效数据
        // 对于 href="#" 的情况，在 Typora 1.6.x 开始的版本需要考虑，因为 Typora 生成的 HTML 会自动过滤无效的页内链接，直接用 # 代替
        if (href === gUndefined) // || href.length <= 1)
            return gTrue;

        // --------------------
        // 页内链接
        // 以 #mjx- 开始的链接为行间公式的页内引用块，会导致 jQuery 的正则表达式解析错误，须跳过
        if (href === "#")
            __addErrorLink(_t);
        else if (href.sW("#") && !href.sW("#mjx-")) {
            // 检索是否存在与该内链对应的锚点
            let anchor = href.s(1, href.length);
            // 没有检索到对应的锚点
            if ($(_write_ + " #" + anchor + "," + _write_ + " a" + V_attrX(_name_, anchor)).length === 0) {
                __addErrorLink(_t);
            }
        }
    });

    // 无错误链接
    if (count === 0) {
        JQ_remove(StsLinkTool_ui);
    }
    else {
        // 显示错误链接错误图标
        JQ_addClass(StsLinkTool_ui, _error_);
        StsLinkTool_ui.hm(LinkTool_icon_error);

        // 点击图标行为
        StsLinkTool_ui.uC().ck(function () {
            if (LinkTool_panel_list.isHidden())
                LinkTool_show();
            else
                LinkTool_hide();
        });
    }

    // 添加一条无效的页内链接记录
    function __addErrorLink(aObj) {
        count++;

        // 设置坏链 id 值，用于跳转定位
        let id = "vk-error-anchor" + count;
        aObj.a(_id_, id);

        LinkTool_addToCheck(id, "🔗 "
            + V_ui_strong([
                "无效页内链接",
                "Invalid Inner Link"
            ][V_lang_id] + ": ") + aObj.t());
    }
}

/**
 * 是否已显示
 * @returns boolean
 */
function LinkTool_isShowed() {
    return StsLinkTool_ui.c(_display_) !== _none_;
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

    StsLinkTool_ui.hm(LinkTool_icon_error);
    V_doc_scroll_unfreeze();
}

/**
 * 处理热键操作
 * @param code 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function LinkTool_disposeHotkey(code, combKeys, event) {
    if (LinkTool_panel_list.isHidden())
        return;

    let handled = false;
    switch (code) {
        case 27: // ESC
            ERROR(LinkTool_isShowed());
            if (LinkTool_isShowed()) {
                LinkTool_hide();
                handled = true;
            }
            break;
    }

    // 如果事件已处理，则禁止双重操作
    if (handled)
        event.preventDefault();
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
    VOM_doc().af(V_ui_div(_, "v-mask " + (style !== gUndefined ? style + ___ : _) + id + ___ + _vBackdropBlurs_,
        V_ui_copyrightInfo()));

    // 根据动效等级初始化遮罩样式
    V_ui_initEffectLevel2();

    T.ui = $(".v-mask." + id);
    T.closer = gUndefined;

    // 生成关闭提示器
    if (close !== gUndefined && close) {
        T.ui.ap(V_ui_div(_, "v-mask-close " + T.style,
            V_ui_svgIcon(_icoMaskCloser_, 16, 60, _light_)));
        T.closer = T.ui.ch(".v-mask-close");
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
        T.ui.c(_zIndex_, T.partnerUI.c(_zIndex_) - 1);

        // 对「关闭」提示器的处理
        if (T.closer !== gUndefined) {
            // 默认是 style = left 的位置
            let offset = 30,
                x = JS_parseInt(T.partnerUI.c(_left_)) + T.partnerUI.w() + offset,
                y = JS_parseInt(T.partnerUI.c(_top_)) + (T.partnerUI.h() - T.closer.h()) / 2;
            // left / right 的处理
            if (T.style === _left_ || T.style === _right_) {
                T.closer.c(_left_, T.style === _right_
                        ? JS_parseInt(T.partnerUI.c(_left_)) - T.closer.w() - offset
                        : x)
                    .c(_top_, y);
            }
            // bottom 的处理
            else if (T.style === _bottom_) {
                y = JS_parseInt(T.partnerUI.c(_bottom_)) + T.partnerUI.h() + offset;
                T.closer
                    // .c(s_Left, s_Auto)
                    // .c(s_Top, s_Auto)
                    .c(_bottom_, y + 20)
                    // .c(s_MarginLeft, "-" + (T.close.w() / 2) + 'px')
                    .c(_padding_, "0px 50%");
            }
        }

        // 绑定 VLOOK logo 的点击事件
        T.ui.f("." + _vCopyright_ + " ." + _vCopyrightSvgIco_).uC().ck(function () {
            env.show($(this));
        });

        // 点击遮罩隐藏联动对象
        T.ui.uC().ck(function () {
            // 取消冻结滚动
            V_doc_scroll_unfreeze();
            // 隐藏联动对应
            if (typeof(T.partner) === _function_)
                 T.partner();
            else
                T.partner.hide();

            T.hide();
        });

        T.ui.show();
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

let ContentFolder_enabled = gTrue,
    ContentFolder_enabled_table = gTrue,
    ContentFolder_enabled_figure = gTrue,
    ContentFolder_enabled_codeblock = gTrue,
    ContentFolder_limit = V_debugMode ? 300 : 640, // 内容须折叠的高度限值
    ContentFolder_contents = [], // 须进行折叠判断和处理的内容集
    ContentFolder_buildTimers = [],
    ContentFolder_rowNumFilter = _table_ + " tbody tr";

function ContentFolder_init() {
    if (!ContentFolder_enabled)
        return;
    // 更新 CSS 对应高度限制变量
    V_util_setVarVal("--v-ex-limit", ContentFolder_limit + "px");
}

/**
 * 添加内容
 */
function ContentFolder_add(content, type) {
    // 跳过不启用折叠，或任意父级元素是折叠引用块的情况
    if (!ContentFolder_enabled
        || content.ps(_details_ + "," + _blockquote_).length > 0) {
        // || (V_util_getTagName(content.p()) === _details_
        //     || content.ps(_details_).length > 0)) {
        return;
    }

    if (type === _table_ && ContentFolder_enabled_table === gFalse)
        return;
    if (type === _figure_ && ContentFolder_enabled_figure === gFalse)
        return;
    if (type === _codeblock_ && ContentFolder_enabled_codeblock === gFalse)
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

    // 遍历每个规则
    let rules = gStyle.cssRules || gStyle.rules;
    for (let j = rules.length - 1; j >= 0; j--) {
    // $.each(gStyle.cssRules, function(i, rule) {
        // 检查是否是要删除的规则
        let ruleText = rules[j].selectorText;
        if (ruleText !== gUndefined && ruleText.i(
                "." + _vCaptionContainer_ + "." + _expander_ + ".id-") > -1)
                gStyle.deleteRule(j);
        // if (rule.selectorText !== gUndefined && rule.selectorText.indexOf(
        //     "." + _vCaptionContainer_ + "." + _expander_ + ".id-") > -1)
            // gStyle.deleteRule(i);
    // });
    }

    // 重建需要重建的部分
    for (let i = 0, len = ContentFolder_contents.length; i < len; i++) {
        // img 类长内容
        if (V_util_getTagName(ContentFolder_contents[i]).sW("i")) {
            // 创建一个Image对象，实现图片的预下载
            let img = new Image();
            // 获得图片实际加载的 src（针对 img 指定 srcset, darksrc, darksrcset 的情况）
            img.src = ContentFolder_contents[i].get(0).currentSrc;
            // 如果图片已经存在于浏览器缓存，直接处理
            if (img.complete)
                ContentFolder_buildTimers.push(
                    setTimeout(function () {
                        ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                    }, 50)
                );
            // 等待图片下载完成后再处理
            else
                img.onload = function () {
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                }
        }
        // 非 img 类长内容
        else {
            // 设置按不同时间间隔执行，减少在处理数量过多时，会阻塞 UI
            ContentFolder_buildTimers.push(
                setTimeout(function () {
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                }, 50)
            );
        }
    }
}

/**
 * 检测内容是否过长，过长则进行处理。适用于「插图、表格、代码块」等
 * @param target 折叠的目标对象
 * @param rebuild 本次折叠是否属于重建的（如在页面加载后，由于页面正文区宽度变化后调用时属于重建）
 * @param i 折叠内容序号
 */
function ContentFolder_checkAndProcess(target, rebuild, i) {
    if (!ContentFolder_enabled)
        return;

    let container = target.p(),
        tagName = V_util_getTagName(target),
        isImg = tagName.sW("i");

    // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
    if (rebuild)
        container = container.p();

    // 已被点击展开过了，在重建时则跳过
    let expanded = container.a(_dataContentExpanded_);
    if (expanded !== gUndefined && expanded.sW("t")) {
        let folded = container.a(_dataBeforePrintFolded_);
        if (folded !== gUndefined && !expanded.sW("t")) {
            ContentFolder_buildTimers.shift();
            return;
        }
    }

    // 针对 img 内容，进行父容器的正确性处理
    if (isImg) {
        // 图像若加载晚于 img 的题注生成，其父容器则题注而不是 VLOOK 标识的 img 父容器
        if (container.a(_dataContainer_) === gUndefined)
            container = container.p();
    }

    // 初始化折叠配置
    container.a(_dataContentFolded_, _false_); // 未折叠
    container.a(_dataContentExpanded_, _false_); // 已被点击扩展了
    container.c(_height_, _auto_);
    // 针对 Mermaid 图表，不添加会导致出现滚动条
    if (tagName.sW("s"))
        container.c(_paddingBottom_, "10px");

    let h = JS_parseInt(target.c(_height_));
    // 高度超出折叠要求高度时进行折叠
    if (h > ContentFolder_limit) {
        // 构建内容展开操作区
        // ContentFolder_buildContentExpander(target, container, tagName, h, oldExpander);
        ContentFolder_buildContentExpander(target, container, tagName, i);
    }

    ContentFolder_buildTimers.shift();
}

/**
 * 构建内容展开操作区
 * @param target 为目标对象创建展开操作区（如 table）
 * @param container 指定对象所属的容器（如 table 的容器为父元素 figure）
 * @param tagName target 的 HTML 标签名
 * @param i 折叠内容序号
 */
function ContentFolder_buildContentExpander(target, container, tagName, i) {
    if (!ContentFolder_enabled)
        return;

    // 设置为已折叠
    container.a(_dataContentFolded_, _true_);

    // 表格 <table>、Mermaid <svg> 图表的特性处理
    if (tagName.sW("t") || tagName.sW("s")) {
        container.c(_height_, ContentFolder_limit)
            .c(_overflowX_, _auto_) // 可横向滚动
            .c(_overflowY_, _hidden_);
    }
    // 非表格，非 Mermaid 图表的处理
    else {
        container.c(_height_, ContentFolder_limit)
            .c(_overflowY_, _hidden_);
    }

    let w = JS_mathCeil(JS_parseFloat(container.c(_width_)));

    // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
    if (container.f(_table_).length > 0)
        JQ_addClass(container.f(ContentFolder_rowNumFilter), _vTblRowNumHidden_);

    // 重新适配展开操作区尺寸
    let tW = JS_mathCeil(JS_parseFloat(target.c(_width_)));
    if (w > tW)
        w = tW;

    container.a("data-ex-label", [
        "显示全部 ▼",
        "Show all ▼"
    ][V_lang_id]);
    let newClass = "." + _vCaptionContainer_ + "." + _expander_
        + ".id-" + i + "::before{" + _width_ + ":" + w + "px;}";
    gStyle.insertRule(newClass, 0);
    JQ_addClass(container, _expander_ + " id-" + i);

    container.a(_dataContentType_, tagName);

    // 展开按钮 click 事件处理
    container.on(_mouseUp_, function () {
        ContentFolder_expand($(this));
    });
}

/**
 * 展开被折叠的内容
 * @param container 点击的按钮所在父元素
 */
function ContentFolder_expand(container) {
    if (!ContentFolder_enabled)
        return;

    let tagName = container.a(_dataContentType_);

    // 移除内容展开操作区
    JQ_removeClass(container, _expander_);

    // 展开对应的内容
    container.a(_dataContentFolded_, _false_);
    container.a(_dataContentExpanded_, _true_);
    container.c(_height_, _auto_);
    // 针对表格 <table>、Mermaid <svg> 图表增加滚动属性
    if (tagName.sW("t") || tagName.sW("s"))
        container.c(_overflow_, _auto_);
    // 非表格、非 Mermaid 图表的处理
    else
        container.c(_overflowY_, "initial");

    // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
    if (container.f(_table_).length > 0)
        JQ_removeClass(container.f(ContentFolder_rowNumFilter), _vTblRowNumHidden_);
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
    ToolTips_ui = $("." + _vToolTips_);

    V_ui_addAnimate(ToolTips_ui, _opacity_);
}

/**
 * 绑定操作相关事件
 * @param source 对象
 * @param align 对齐方式，auto/center/right
 */
function ToolTips_bind(source, align = _auto_) {
    V_ui_bindHover(source);
    source.hover(function () {
        ToolTips_show(source, align);
    }, function () {
        ToolTips_hide();
    });
}

/**
 * 显示工具提示信息
 *
 * @param follow 提示的目标元素
 * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
 * @param classValue 指定微调的样式
 */
function ToolTips_show(follow, align, classValue) {
    if (env.device.mobile)
        return;

    ToolTips_ui.hm(follow.a(_dataTips_));

    // 强制取消最后一次延时显示的处理
    clearTimeout(ToolTips_aniTimer);
    ToolTips_aniTimer = null;
    // 强制取消隐藏后指定时间内取消持续显示的处理
    clearTimeout(ToolTips_continueTimer);
    ToolTips_continueTimer = null;

    ToolTips_lastStyle = classValue;

    const space = 10,
        tipsW = ToolTips_ui.iW(),
        tipsH = ToolTips_ui.iH(),
        ww = $(window).w() - space,
        wh = $(window).h() - space;
    let left = follow.oL(),
        top = follow.oT() - $(document).scrollTop(),
        width = follow.iW(),
        height = follow.iH();

    JQ_removeClass(ToolTips_ui, _top_ + ___ + _bottom_ + ___ + _center_ + ___ + _right_);

    // 指定对齐方式或提示超出屏幕
    if (align !== _auto_ || (left + tipsW) > ww) {
        // align: right
        JQ_addClass(ToolTips_ui, _right_);
        left = follow.oL() - tipsW + width;
        // 右侧顶边，则微调
        if (left + tipsW >= ww)
            left = left - space;

        // align: center
        if (align === _center_) {
            JQ_removeClass(ToolTips_ui, _right_);
            JQ_addClass(ToolTips_ui, _center_);
            left = follow.oL() + (width - tipsW) / 2;
        }
    }
    // 左侧顶边，则微调
    if (left <= 0)
        left = space;

    if (ToolTips_lastStyle !== gUndefined)
        JQ_addClass(ToolTips_ui, ToolTips_lastStyle);

    if (top + height + tipsH + space < wh) {
        JQ_addClass(ToolTips_ui, _top_);
        top = top + height + space;
    }
    else {
        JQ_addClass(ToolTips_ui, _bottom_);
        top = top - tipsH - space;
    }
    ToolTips_ui.c(_left_, left).c(_top_, top);

    // 延时，或立即显示提示
    let waitTime = (ToolTips_continueShow) ? 0 : ToolTips_delay;
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
    ToolTips_aniTimer = null;
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
    T.ui = $("." + _vInfoTips_);
    T.aniTimer = null;

    // 绑定点击事件
    T.ui.uC().ck = function () {
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
        T.show(message, delay, mask, _bubble_, target);
    }

    /**
     * 显示错误信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    T.error = function (message, delay, mask, target) {
        T.show(message, delay, mask, _error_, target);
    }

    /**
     * 是否已显示
     * @returns boolean
     */
    T.isShowed = function () {
        return T.ui.c(_display_) !== _none_;
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
        T.aniTimer = null;

        T.ui.hm(message);

        // 先重置为默认值
        JQ_removeClass(T.ui, _error_);
        JQ_removeClass(T.ui, _bubble_);
        T.ui.c(_width_, _)
            .c(_height_, _)
            .c(_right_, _auto_)
            .c(_bottom_, _auto_)
            .c(_borderRadius_, _varVRB_);
        if (type === _error_)
            JQ_addClass(T.ui, _error_);
        else if (type === _bubble_)
            JQ_addClass(T.ui, _bubble_);

        // 跟随事件源显示
        if (target !== gUndefined) {
            V_ui_moveToTarget(T.ui, target);
        }
        // 居中显示
        else
            V_ui_moveToCenter(T.ui);

        T.ui.show();

        // 延时后自动关闭
        if (delay != null) {
            T.aniTimer = setTimeout(function () {
                    T.hide();
                }, delay);
        }

        // 显示遮罩
        if (mask)
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
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (T.isShowed()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

// ==================== 底部提示信息类 ==================== //

/**
 * 构造函数
 * @param sourceName 配套的源对象标识
 */
function BottomTips(sourceName) {
    let T = this;
    VOM_doc().af(
        V_ui_div(_, "v-bottom-tips " + sourceName,
            V_ui_div(_, _)));

    T.ui = $(".v-bottom-tips." + sourceName);

    /**
     * 显示底部提示栏
     * @param message 提示内容
     */
    T.show = function (message) {
        T.ui.ch("div").hm(message);
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
    MoreDocContent_ui_before = $("." + _vMoreDocContent_ + "before");
    MoreDocContent_ui_after = $("." + _vMoreDocContent_ + "after")
}

/**
 * 刷新显示更多内容遮罩栏
 * @param scrollTop 文档当前滚动位置，如果为空则自动获取
 */
function MoreDocContent_refresh(scrollTop) {
    if (scrollTop === gUndefined)
        scrollTop = $(document).scrollTop();

    // before UI
    if (scrollTop > 20) {
        if (MoreDocContent_ui_before.c(_display_) === _none_)
            MoreDocContent_ui_before.show();
    }
    else
        MoreDocContent_ui_before.hide();

    // after UI
    if (scrollTop + $(window).h() > ($(document).h() - 20))
        MoreDocContent_ui_after.hide();
    else {
        if (MoreDocContent_ui_after.c(_display_) === _none_)
            MoreDocContent_ui_after.show();
    }
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
    let captionPrefix = [
            "表 ",
            "Table "
        ][V_lang_id] + V_doc_counter_table,
        caption = _,
        indexObj = gUndefined,
        anchor = _,
        dataForSearch = _;

    // 代码块 <pre>
    if (tagName.sW("pr")) {
        indexObj = iNavCenter.codeblock;
        captionPrefix = [
            "代码块 ",
            "Code Block "
        ][V_lang_id] + V_doc_counter_codeblock;
    }
    // 表格 <table>
    else if (tagName.sW("t")) {
        indexObj = iNavCenter.table;
    }

    // 尝试获得带题注语法的内容
    let fcSet = CaptionGenerator_getCaptions(target.p().pr(), tagName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注
    captionPrefix = V_ui_span(_, _, captionPrefix + CaptionGenerator_spliter);

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.x().length === 0) {
        fc = _;
        if (CaptionGenerator_autoContent) {
            if (tagName.sW("pr")) // 代码块
                fc = target.f("." + _vCodeMirrorLine_).t().x();
            else if (tagName.sW("t")) // 表格，并过滤掉列格式相关语法标识内容
                fc = target.f("td").t().x().r(/(==|\[\s]|\.\.|<<|\^\^|##\s)/ig, _);
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.x(), 20);
        }
    }
    caption = captionPrefix + fc;

    // 代码块 <pre>
    if (tagName.sW("pr")) {
        anchor = _vkIdCodeblock_ + V_doc_counter_codeblock;
        target.wrap(V_ui_div(anchor, "v-caption pr"));
        dataForSearch += target.f("." + _vCodeMirrorLine_).t();
    }
    // 表格 <table>
    else if (tagName.sW("t")) {
        anchor = _vkIdTbl_ + V_doc_counter_table;
        target.wrap(V_ui_div(anchor, "v-caption"));
        dataForSearch += target.t();
    }

    // 添加第 1 题注
    target.bf(V_ui_figcaption(_vCap1_.xD(), _, caption));
    // 添加第 2 题注
    let has2Captions = (fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.af(V_ui_figcaption(_vCap2_.xD(), _, captionPrefix + fc2));
        target.p().a(_dataCaptionCount_, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        $("#" + anchor).a(_dataTitle_, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }
}

/**
 * 针对插图（img、mermaid）生成题注
 * @param target 需要添加题注的对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
function CaptionGenerator_actionForMediaContent(target, tagName) {
    let fc = target.a(_alt_), // 默认尝试获取图片的 alt 内容作为题注内容
        fc2 = target.a(_title_), // 默认尝试获得图片的 title 作为第二题注内容
        indexObj = iNavCenter.figure,
        anchor = _,
        dataForSearch = _;

    let fcSet = null;
    // 若图片 alt 无内容，则尝试获取前面段落（如<p>、<h6>）作为第 1、2 题注的内容
    if (fc === gUndefined || fc.x().length === 0) {
        fcSet = CaptionGenerator_getCaptions(target.p().pr(), tagName);
        if (fcSet[0] != null)
            fc = fcSet[0];
        if (fcSet[1] != null)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption = _,
        captionPrefix = [
        "图 ",
        "Figure "
    ][V_lang_id] + V_doc_counter_figure;
    // 音频题注 audio
    if (tagName.sW("a")) {
        indexObj = iNavCenter.media;
        captionPrefix = [
            "音频 ",
            "Audio "
        ][V_lang_id] + V_doc_counter_audio;
    }
    // 视频频题注 video
    else if (tagName.sW("v")) {
        indexObj = iNavCenter.media;
        captionPrefix = [
            "视频 ",
            "Video "
        ][V_lang_id] + V_doc_counter_video;
    }

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == null || fc.x().length === 0) {
        fc = _;
        if (CaptionGenerator_autoContent) {
            if (tagName.sW("s")) // Mermaid SVG
                fc = target.f("g").t().x();
            // 省略中间内容处理
            fc = V_util_ellipsisText(fc.x(), 20);
        }
    }
    captionPrefix = V_ui_span(_, _, captionPrefix + CaptionGenerator_spliter);
    caption = captionPrefix + fc;

    // 为插图（mermaid）增加题注 <svg>
    if (tagName.sW("s")) {
        anchor = _vkIdFig_ + V_doc_counter_figure;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap(V_ui_div2(anchor, "v-caption mermaid", V_attr(_dataFigType_, tagName)));
        dataForSearch += target.f(_div_ + "," + _span_ + ",tspan,text").t();
    }
    // 为插图（img）增加题注 <img>
    else if (tagName.sW("i")) {
        anchor = _vkIdFig_ + V_doc_counter_figure;
        target.wrap(V_ui_div2(anchor, "v-caption", V_attr(_dataFigType_ , tagName)));
        dataForSearch += target.a(_src_);
    }
    // 为音频增加题注 audio
    else if (tagName.sW("a")) {
        anchor = _vkIdAudio_ + V_doc_counter_audio;
        target.wrap(V_ui_div2(anchor, "v-caption", V_attr(_dataFigType_, tagName)));
        dataForSearch += target.a(_src_);
    }
    // 为视频增加题注 video
    else if (tagName.sW("v")) {
        anchor = "vk-id-video" + V_doc_counter_video;
        target.wrap(V_ui_div2(anchor, "v-caption", V_attr(_dataFigType_, tagName)));
    }

    // 生成第 1 题注
    target.bf(V_ui_figcaption(_vCap1_.xD(), _, caption));
    // 生成第 2 题注
    let has2Captions = (fc !== gUndefined && fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.af(V_ui_figcaption(_vCap2_.xD(), _, captionPrefix + fc2));
        target.p().a(_dataCaptionCount_, "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        $("#" + anchor).a(_dataTitle_, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // ----------------------------------------
    // 修正在 SVG 插图套上题注后的自适应尺寸 <svg>
    if (tagName.sW("s")) {
        if (target.a(_height_) !== _none_ || target.c(_height_) !== _none_) { // 有指定高度的
            JQ_removeAttr(target, _height_);
            target.c(_height_, _);
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        let style = gUndefined;
        if (target.c(_maxWidth_) !== _none_) // CSS 中指定了最大宽度
            target.p().c(_width_, target.c(_maxWidth_));
        else if ((style = target.a(_style_)) !== gUndefined && style.i(_width_) > -1) // 通过 style 指定了宽度
            target.p().c(_width_, target.c(_width_));
        else if (target.a(_width_) !== _100pc_) // 指定了 width 属性，且不为 100%
            target.p().c(_width_, JS_parseInt(target.a(_width_)) + 4); // 4 为两边 border 的宽度
        else if (target.a(_viewBox_) !== _none_) // 指定 width 为 100% 的情况
            target.p().c(_width_, target.a(_viewBox_).sp(___)[2] + "px");
        else
            target.p().c(_width_, _100pc_);
    }
}

/**
 * 返回插图、表格、代码块上方的题注
 * @param caption 潜在的题注内容对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
function CaptionGenerator_getCaptions(caption, tagName) {
    let fcSet = [], // 题注集
        captionTagName = V_util_getTagName(caption),
        hideCaptionSrc = gFalse; // 是否隐藏题注源

    let capResult = CaptionGenerator_parseSyntax(caption);
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
    else if (captionTagName.sW("h")) {
        fcSet[0] = caption.t().x();
        fcSet[1] = null;
        // 不能直接隐藏，会影响页内链接跳转至该位置
        // 设置为不可见，并调整位置布局实现隐藏效果，同时不影响跳转
        if (captionTagName === _h6_) { // 只针对 h6，h1-h5不隐藏
           caption.c(_visibility_, _hidden_)
                .c(_position_, _absolute_);
        }
    }

    // 若成功匹配出题注，且内容不是 <img> 则隐藏原始内容
    if (hideCaptionSrc && (!tagName.sW("i") || capResult[0] === 200)) {
        JQ_remove(caption);
    }
    return fcSet;



    /**
     * 返回题注数据数组
     * @param target 题注数据的目标对象
     * @param count 题注数量
     * @param type 题注语法类型，100：标准，200：简化语法
     * @returns [] [0] 为第 1 个题注，[1] 为第 2 个题注
     */
    function __getCaptionSet(target, count, type) {
        let fcSet = [];
        // 标准语法
        if (type === 100) {
            let text = target.t().x();
            fcSet[0] = text.s(2, text.i("]", 2));
            if (count === 2) // "▲ " +
                fcSet[1] = text.s(text.i(']"', 2) + 2, text.length - 1);
        }
        // 简化语法
        else if (type === 200) {
            if (count === 2) // "▲ " +
                fcSet[1] = target.f(_mark_ + ">em").t().x();
            JQ_remove(target.f(_mark_ + ">em"));
            fcSet[0] = target.t().x();
        }
        return fcSet;
    }
}

/**
 * 解析并返回匹配的题注数量
 * @param target 题注语法内容对象
 * @returns [] [0] 语法类型, [1] 题注数量
 */
function CaptionGenerator_parseSyntax(target) {
    let reg2 = /^!\[.+]".+"$/, // 有 2 个题注
        reg1 = /^!\[.+]$/, // 只有 1 个题注
        html = _;
    // 标准语法，双题注
    if (reg2.test(target.t().x()))
        return [100, 2]; // 100: 标准语法
    // 标准语法，单题注
    else if (reg1.test(target.t().x()))
        return [100, 1]; // 100: 标准语法
    // 简化的新语法
    else if ((html = target.hm()) !== gUndefined) {
        if (html.sW("<em><mar") && html.eW("/em>")) {
            if (html.i("/em></mark>") === -1)
                return [200, 1]; // 200: 简化语法
            else
                return [200, 2]; // 200: 简化语法
        }
    }
    return [0, 0]; // 无题注
}

// ==================== 分步分级类 ==================== //

// 样式优化的目标内容
let BreadcrumbStyle_count = 0,
    BreadcrumbStyle_syntax = /(\s*(\/|\\|▸|▶︎|(&gt;))\s*)/g;

/**
 * 初始如化分步分级处理
 */
function BreadcrumbStyle_init() {
    // 对所有分步分级元素进行样式优化
    $(_write_ + " em>mark:only-child>span:first-child").e(function () {
        BreadcrumbStyle_count++;
        let _t = $(this),
            mark = _t.p();
        mark.unwrap(); // 解包 em
        // 添加新包
        mark.wrap(V_ui_span(_vBreadcrumbStyle_ + " id-" + BreadcrumbStyle_count, _, _));
        _t.unwrap(); // 解包 mark

        // ------ 正式开始处理 ------
        let bread = _t.p(), // 获得添加新包后的新父级元素
            slashOrg = "</",
            slashTmp = "<___slash___",
            html = bread.hm().rA(slashOrg, slashTmp);

        // 生成原始内容
        bread.a(_dataClipboardText_, bread.t());
        // 将目标内容替换为指定标签进行样式优化
        html = html.rA(BreadcrumbStyle_syntax, V_ui_label(_, _, ___));
        bread.hm(html.rA(slashTmp, slashOrg));

        // 点击事件处理
        bread.uC().ck(function (event) {
            let _t = $(this);
            Copyer_action(_t, _t.a(_dataClipboardText_), gFalse);
        });
    });

    // 避免与 BreadcrumbStyle 处理中的多层触发
    $(_write_ + " ." + _vBreadcrumbStyle_ + " a").ck(function (event) {
        event.stopPropagation(); // 停止事件冒泡
    });
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
    $("." + _vFences_).e(function () {
        let _t = $(this);

        // 绑定内容助手
        ContentAssistor_bind(_t, _codeblock_);

        // 折叠长代码块
        ContentFolder_add(_t, _codeblock_);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        if (_t.f("." + _vCodeMirrorLine_).length > lmc) {
            V_doc_counter_codeblock++;
            // 外套一个 <figcaption> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
            _t.wrap(V_ui_figcaption(_vCaptionContainer_, V_attr(_dataContainer_, _pre_)));

            // 先根据题注语法生成题注
            CaptionGenerator_actionForTextContent(_t, _pre_);
        }
        else {
            // 若有指定题注内容，则删除
            if (CaptionGenerator_parseSyntax(_t.pr())[0] > 0)
                JQ_remove(_t.pr());
        }
    });
}

/**
 * 复制代码块内容
 * @param source 内容源对象
 * @param event 事件对象
 */
function ExtCodeBlock_copyContent(source, event) {
    let content = _,
        lines = ContentAssistor_lastHover.ch().f(".CodeMirror-code ." + _vCodeMirrorLine_),
        lineNum = 0,
        lineCount = lines.length,
        // 用于清除或转换特殊字符
        badChars = [
            "%E2%80%8B", // ZERO WIDTH SPACE \u200b
            "%C2%A0", // NO-BREAK SPACE \u00A0
            "%0A" // NO-BREAK SPACE \u0A
        ],
        goodChars = [
            _, // 替换 ZERO WIDTH SPACE
            "%20", // for NO-BREAK SPACE
            _ // for NO-BREAK SPACE
        ];
    // 逐行读取代码
    lines.e(function () {
        lineNum++;
        let encodeText = encodeURI($(this).t());
        // 清除或转换特殊字符
        for (let i = 0; i < badChars.length; i++) {
            if (encodeText.i(badChars[i]) > -1)
                encodeText = encodeText.rA(badChars[i], goodChars[i]);
        }
        content += JS_decodeURI(encodeText) + (lineNum < lineCount ? "\n" : _);
    });

    // 复制目标内容
    if (ContentAssistor_copyAsMarkdown) {
        let lang = _;
        if (ContentAssistor_lastHover !== gUndefined)
            lang = ContentAssistor_lastHover.a(_lang_);
        content = "```" + (lang !== gUndefined ? lang : _) + "\n" + content + "\n```";
    }
    Copyer_action(source, content, gTrue);
}

// ==================== 复制类 ==================== //

let Copyer_lastActionTime = 0,
    Copyer_processing = gFalse,
    Copyer_copyModeTimer = null;

/**
 * 执行复制
 * @param source 触发复制的对象
 * @param content 要复制的内容
 * @param supportMarkdown 是否支持复制为 Markdown
 * @param successCallback 复制成功后的回调函数
 * @param errorCallback 复制失败后的回调函数
 */
function Copyer_action(source, content, supportMarkdown, successCallback, errorCallback) {
    // 控制两次复制操作的时间间隔（同时也是解决嵌套情况下的复制失效问题）
    let ts = new Date().getTime();
    if (Copyer_processing || ts - Copyer_lastActionTime < 200)
        return;
    Copyer_lastActionTime = ts;
    Copyer_processing = gTrue;

    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    let targetName = "." + source.a(_class_).rA(___, ".");
    DEBUG(targetName);
    $(targetName).a(_dataClipboardText_, content);
    DEBUG($(targetName).a(_dataClipboardText_));

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(targetName);

    // 复制成功事件
    clipboard.on("success", function(event) {
        // 显示复制成功提示
        let note = ContentAssistor_copyAsMarkdown ? " (" + V_ui_strong("as Markdown") + ")" : _,
            tips = supportMarkdown ? [
                "<br>" + V_ui_sub(_, _, "( 再次点击可复制为 Markdown )"),
                "<br>" + V_ui_sub(_, _, "( Click again to Copy as Markdown )")
                ][V_lang_id] : _;
        iInfoTips.bubble([
                "已复制",
                "Copied"
            ][V_lang_id] + (ContentAssistor_copyAsMarkdown ? _ : tips)
            + note, 2000, gFalse, source);

        event.clearSelection();

        typeof(successCallback) === _function_ && successCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();

        // 同一复制源，限时内第 2 次点击的处理（复制为 Markdown）
        if (supportMarkdown) {
            // 切换复制模式、光标、内容助手的复制图标
            if (Copyer_copyModeTimer != null) {
                clearTimeout(Copyer_copyModeTimer);
                Copyer_copyModeTimer = null;
            }
            ContentAssistor_toggleCopyMode(gTrue);
            // 限时恢复为普通复制模式
            Copyer_copyModeTimer = setTimeout(function () {
                // 切换复制模式、光标、内容助手的复制图标
                ContentAssistor_toggleCopyMode(gFalse);
                Copyer_copyModeTimer = null;
            }, 2000);
        }

        Copyer_processing = gFalse;
    });
    // 复制失败事件
    clipboard.on(_error_, function () {
        // 显示复制失败提示
        iInfoTips.error(V_ui_strong([
            "非常抱歉～暂不支持在该浏览器中复制",
            "I'm very sorry~ I don't support copying in this browser"
        ][V_lang_id]), 3000, gFalse, source);

        typeof(errorCallback) === _function_ && errorCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();
        Copyer_processing = gFalse;
    });
}

// ==================== 章节目录自动编号增强类 ==================== //

let ChpAutoNum_counter = [],
    ChpAutoNum_lastLevel = 1,
    // 自定义的自动编号格式模板（可只指定任意 h1~h6）
    ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }},h6{{#none# }}",
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }},h6{{❖ ### }}",
    // 默认的自动编号格式模板
    ChpAutoNum_tplSet = ChpAutoNum_tpl.sp(","),
    ChpAutoNum_tpl_syntax = /h([1-6]){{(.*)(#(0*)(#|zh|ZH|alpha|ALPHA|roman|ROMAN|none)(-min|-sup)?#)(.*)}}/,
    ChpAutoNum_tpl_leftPad = [_, _, _, _, _, _],
    ChpAutoNum_tpl_format = ["#", "#", "#", "#", "#", "#"], // 编号格式
    ChpAutoNum_tpl_formatOpt = [0, 0, 0, 0, 0, 0], // 特殊格式选项
    ChpAutoNum_tpl_prefix = [_, _, _, _, _, _], // 前缀
    ChpAutoNum_tpl_suffix = [_, _, _, _, _, _]; // 后缀

// 特殊格式选项
const CHPAUTONUM_TPL_FORMAT_OPT_NONE = 0, // 无
    CHPAUTONUM_TPL_FORMAT_OPT_MIN = 1, // -min
    CHPAUTONUM_TPL_FORMAT_OPT_SUP = 2; // -sup

/**
 * 初始化章节目录自动编号
 */
function ChpAutoNum_initToc() {
    let metaTpl = V_util_getMetaByName("vlook-chp-autonum");
    // 没有目录大纲，或指定关闭自动编号（同时没有指定自动编号格式模板）则跳过
    if (gTocContent.isEmpty()
        || (V_util_getVarVal("--v-chp-auto-num").x() === _off_ && metaTpl === gUndefined))
        return;

    // 重置自动编号格式模板
    ChpAutoNum_resetTpl(metaTpl);

    // 对目录大纲内的章节条目进行处理
    ChpAutoNum_resetCounter();
    gTocContent.ch("." + _mdTocItem_).e(function () {
        let item = $(this);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(item.a(_class_)));
    });

    // 对文档中的章节条目进行处理（不包括封底）
    ChpAutoNum_resetCounter();
    VOM_doc().ch("h1:not(" + _lastChild_ + "), h2, h3, h4, h5").e(function () {
        let item = $(this);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(V_util_getTagName(item)));
    });

    // 对文档中的 h6 章节条目进行处理（不包括封面）
    ChpAutoNum_resetCounter();
    VOM_doc().ch(_h6_ + ":not(" + _firstChild_ + ")").e(function () {
        let prefix = (ChpAutoNum_tpl_prefix[5]),
            result;
        if ((result = prefix.m(/var\((--.+)\)/)) != null)
            prefix = V_util_getVarVal(result[1]).rA('"', "");
        $(this).a(_dataHeaderNum_, prefix);
    });

    // 生成章节编号
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

        item.a(_dataHeaderNum_, ChpAutoNum_toString());
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
 * @param metaTpl 格式模板内容
 */
function ChpAutoNum_resetTpl(metaTpl) {
    // 判断是否有指定自定义自动编号模板
    if (metaTpl !== gUndefined)
        ChpAutoNum_tpl = metaTpl;
    // 用于测试效果
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{Chapter #alpha# }},h5{{### }},h4{{### - }},h3{{§ ###}}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{步骤 #000## }}";
    // ChpAutoNum_tpl = "h6{{X ### }}";
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }}";
    // ChpAutoNum_tpl = "h1{{#none#}},h2{{#none#}},h3{{### }},h4{{### }},h5{{#ALPHA-min# }}";

    if (ChpAutoNum_tpl.length === 0)
        return;

    // 对自动编号格式模板内容进行处理
    let tplSet = ChpAutoNum_tpl.sp(","),
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
        let result;
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
        numStr = _;

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
    let str = 0;
    for (let i = 0; i < ChpAutoNum_lastLevel; i++) {
        str = __formatNum(i, false);
        numStr += str;
        if (i < lv && str.length > 0)
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
        let ns = _,
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
        else if (format === _alpha_) {
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
        else if (format === _off_)
            ns += _;
        return ns;
    }
}

/**
 * 解析 Typora 生成的目录大纲节点样式名称对应的目录层级（h1~h6）
 * @param value 包含 h1~h6 的标识内容，如：md-toc-h1、h1 等
 * @returns number 目录层级：1~6
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
        padStr = _;
    if (gap > 0) {
        for (let i = 0; i < gap; i++)
            padStr += "0";
    }
    return padStr + value;
}

// 算法参考：https://blog.csdn.net/lavendersue/article/details/81066091
let ChpAutoNum_zhNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], // 数字
    ChpAutoNum_zhUnit = [_, "十", "百", "千", "万"]; // 单位，最大支持 99,999,999
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
        let strArr = value.toString().sp(_).reverse();
        let newNum = _;
        for (let i = 0; i < strArr.length; i++) {
          newNum = (
            (i === 0 && strArr[i] === 0) ? _
            : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? _
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
    let numeral = _;
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
    let numeral = _;
    for (let i = 0; i < ChpAutoNum_romanNum.length; i++) {
       while (value >= ChpAutoNum_romanNumArea[i]) {
          value -= ChpAutoNum_romanNumArea[i];
          numeral += ChpAutoNum_romanNum[i];
       }
    }
    return upperCase ? numeral : numeral.l();
}

// ==================== 引用块增强类 ==================== //

let ExtQuote_columnsGroupCount = 0,
    ExtQuote_processingUCH = gFalse,
    ExtQuote_quoteToColoring = gTrue;

/**
 * 初始化引用块以实现折叠支持
 */
function ExtQuote_init() {
    // 初始化引用块着色的默认颜色标识
    let dcQuote = V_util_getParamVal("quote");
    if (dcQuote !== gUndefined) {
        if (dcQuote === _off_)
            ExtQuote_quoteToColoring = gFalse;
        else {
            Quote_defalutColor = dcQuote;
            Quote_defalutColor_withoutEm = dcQuote.s(0, 2);
        }
    }

    // 遍历所有引用块、详情
    $(_blockquote_).e(function () {
    // $(_write_ + ">" + _blockquote_
    // + "," + _write_ + ">" + _blockquote_ + " " + _blockquote_
    // + ", " + _write_ + " .md-alert " +_blockquote_).e(function () {
        let _t = $(this),
            matchedQuoteFold = gFalse;
        // ====================
        // 处理引用块折叠（details）
        _t.ch(_h6_ + _firstChild_).e(function () {
            let details = __disposeDetailsFolder($(this));
            if (details)
                _t = details;
            matchedQuoteFold = true;
        });

        // 存在折叠，则标识，不参与分栏引用块的统一高度处理
        if (matchedQuoteFold) {
            _t.a(_dataFolding_, _true_);
            if (V_util_getTagName(_t.p()) === _blockquote_)
                _t.p().a(_dataFolding_, _true_);
        }
        // ====================

        // --------------------
        // 默认引用块，转换为引用块着色
        let parentTag = V_util_getTagName(_t.p());

        // 跳过列表内、引用块内的嵌套引用块
        if (parentTag === "li" || parentTag === _blockquote_ || parentTag === _details_)
            return gTrue;
        let coloringQuoteEnabled = gFalse;
        // 判断引用块内是否包含了引用块着色语法
        // 针对新语法
        _t.f(">p>em:only-child>sub:only-child").e(function () {
            let _t = $(this);
            // 颜色标签独占一行的情况下才被视为是对引用块、详情的颜色标识
            if (_t.t().m(Color_syntax) != null) {
                coloringQuoteEnabled = gTrue;
                return gFalse;
            }
        });
        // 针对旧语法
        // 即将废弃 need to remove
        if (coloringQuoteEnabled === gFalse) {
            _t.f(">p>sub").e(function () {
                let _t = $(this);
                // 颜色标签独占一行的情况下才被视为是对引用块、详情的颜色标识
                if (ExtQuote_isValidColorMark(_t)
                    && _t.t().m(Color_syntaxOld) != null) {
                        coloringQuoteEnabled = gTrue;
                        return gFalse;
                }
            });
        }

        // 引用块内不包含引用块着色语法的，则模拟指定默认的着色语法
        if (ExtQuote_quoteToColoring && !coloringQuoteEnabled)
            _t.ap("<p><em>" + V_ui_sub(_, _, Quote_defalutColor) + "</em></p>");
    });

    // 针对分栏引用块进行初始化
    ExtQuote_initColumns();

    // 针对分栏列表进行初始化
    ExtList_initColumns();

    /**
     * 对 details 详情折叠进行处理
     * @param target 带约定 details 详情折叠的对象
     * @returns object 成功匹配并处理
     */
    function __disposeDetailsFolder(target) {
        let quote = target.p();
        // 生成 details
        quote.wrap('<' + _details_ + ' id="' + V_doc_counter_details + '"></' + _details_ + '>');
        // 取消 h6，并生成 summary
        target.unwrap().wrap("<" + _summary_ + "></" + _summary_ + ">");
        // 删除无用对象
        target.ch().unwrap();

        // 获取生成的 detail 实例
        let details = $(_details_ + "#" + V_doc_counter_details),
            summary = details.ch(_summary_);
        summary.pp(V_ui_svgIcon(_icoDetailsOpen_, 18, 18, _dark_, _vSvgDetails_));

        let icon = summary.ch("." + _vSvgDetails_);
        V_ui_addAnimate(icon);
        // 跟踪切换事件
        details.on("toggle", function () {
            // 自动调整高度
            let _t = summary;
            _t.ps(_blockquote_ + V_attrX(_dataQuoteGroup_)).p().c(_height_, _auto_);
            _t.p().c(_height_, _auto_);

            if (this.open)
                JQ_addClass(icon, _vRotate45_);
            else
                JQ_removeClass(icon, _vRotate45_);
        });

        V_doc_counter_details++;
        return details;
    }
}

/**
 * 判断是否为有效的引用块着色颜色标识
 * @param target 颜色标识的对象
 */
function ExtQuote_isValidColorMark(target) {
    let pText = target.p().t().x();
    return  pText === target.t().x();
}

/**
 * 在自动生成题注处理后，进行引用块的二次初始化处理
 */
// function ExtQuote_initAfterCap() {
//     // 遍历所有 RainbowQuote_defalutColor_withoutEm 的引用块着色
//     $(".v-q." + RainbowQuote_defalutColor_withoutEm.l()).e(function () {
//         let _t = $(this);
//         let preObj = _t.pr(),
//             preObjClass = preObj.a(_class_);
//         // 对紧跟表格、插图、代码块、媒体后的引用块样式进行微调
//         if (preObjClass !== gUndefined &&
//             (preObjClass.i("v-cap-") > -1 || preObjClass.i(_vContentExpander_) > -1))
//                 JQ_removeClass(_t, RainbowQuote_defalutColor_withoutEm.l() + " em");
//     });
// }

/**
 * 对分栏引用块进行初始化
 */
function ExtQuote_initColumns() {
    // 针对分栏引用块进行修正
    $("hr + blockquote, hr + details").e(function () {
        ExtQuote_columnsGroupCount++;
        let _t = $(this),
            hr = _t.pr(),
            colCount = 0;

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        __hideHr(hr);
        colCount = hr.prevUntil(":not(hr)").length + 2; // 计算分栏数量
        // 有更多的 <hr> 则进行处理
        if (colCount > 2) {
            __hideHr(hr.prevUntil(":not(hr)"));
        }
        // 隐藏标识分栏的 <hr>
        function __hideHr(target) {
            target.c(_visibility_, _hidden_)
                .c(_margin_, 0)
                .c(_border_, 0);
        }

        // ----------------------------------------
        // 对分栏按组进行初始处理
        __groupingColumns(_t);
        _t.nextUntil(":not(blockquote, details)").e(function () {
            if (colCount > 0) {
                __groupingColumns($(this));
            }
        });

        // 进行分组标识
        function __groupingColumns(quote) {
            // 若为带折叠的引用块，则跳过
            if (quote.a(_dataFolding_))
                return;

            quote.a(_dataQuoteGroup_, ExtQuote_columnsGroupCount);
            colCount--;
        }
    });
}

/**
 * 对文档内所有分栏，按组为单位进行统一高度处理
 */
function ExtQuote_uniteColumnsHeight() {
    if (ExtQuote_processingUCH)
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
        quote = $(_blockquote_ + V_attrX(_dataQuoteGroup_, groupId) + ","
            + _details_ + V_attrX(_dataQuoteGroup_, groupId));
    quote.e(function () {
        let _t = $(this);
        _t.c(_height_, _auto_);
        // 没有被小屏强制适配为不分栏时才处理
        if (_t.c(_display_) !== _block_) {
            let height = JS_parseInt(_t.c(_height_));
            if (height > maxHeight)
                maxHeight = height;
        }
    });

    // 没有被小屏强制适配为不分栏时才处理
    if (quote.c(_display_) !== _block_) {
        // 将同一组中最大的高度
        quote.c(_height_, maxHeight);
    }
}

/**
 * 根据设备类型自适应 hover 样式
 */
function ExtQuote_adjustHoverStyle() {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $("." + _vBlockquoteFolder_).uH();
    else // 为折叠的引用块的折叠控件绑定 hover 事件
        V_ui_bindHover($("." + _vBlockquoteFolder_));
}

/**
 * 自动展开引用块（由 blockquote 转换的 details）
 */
function ExtQuote_autoUnfold() {
    if (iParagraphNav.cur() === gUndefined)
        return;

    // 针对 details 的处理
    __openDetails(iParagraphNav.cur());

    /**
     * 打开折叠的引用块（未打开的 details 标签）
     * @param target 目标标签
     */
    function __openDetails(target) {
        let parent = target.p();
        // 只针对 details 标签
        if (V_util_getTagName(parent) === _details_) {
            // 如果是嵌套的折叠引用块，则进行递归处理
            if (V_util_getTagName(parent.p()) === _details_)
                __openDetails(parent.p());
            // 未打开时才进行打开
            if (parent.a(_open_) === gUndefined)
                parent.ch(_summary_).tr(_click_);
        }
    }
}

// ==================== 列表增强类 ==================== //

/**
 * 对分栏列表进行初始化
 */
function ExtList_initColumns() {
    // 针对分栏列表进行修正
    $("hr + ul, hr + ol").e(function () {
        let _t = $(this),
            hr = _t.pr();

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        hr.c(_display_, _none_);
        let colCount = hr.prevUntil(":not(hr)").length + 2; // 计算分栏数量
        if (colCount > 2) // 有更多的 <hr>
            hr.prevUntil(":not(hr)").c(_display_, _none_);
    });
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
    $(_table_).e(function () {
        let _t = $(this),
            container = _t.p();

        V_doc_counter_table++;

        // 绑定内容助手
        ContentAssistor_bind(_t, _table_);

        // 表格自定义属性数据
        container.a(_dataContainer_, _table_);
        JQ_addClass(container, _vCaptionContainer_);

        // 表格滚动事件
        container.scroll(function () {
            TableCross_hide();
        });

        // 表格单元格初始化处理
        __initCell(_t);

        // 折叠长表格
        ContentFolder_add(_t, _table_);
        // 先根据题注语法生成题注
        CaptionGenerator_actionForTextContent(_t, _table_);
    }); // table
    sw.ed("    ├ Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    sw.st();
    $(_table_ + V_attrX(_dataCellMerge_, _true_)).e(function () {
        let _t = $(this);
        CellMerge_dispose(_t);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        _t.f("thead>tr>th").e(function () {
            let cell = $(this);
            ColumnFormatting_init(_t, cell, cell.t());
        });
    });
    sw.ed("    ├ Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标识为带列格式的表格，进行列格式化处理
    sw.st();
    $(_table_ + V_attrX(_dataColumnFmting_, _true_)).e(function () {
        ColumnFormatting_format($(this));
    });
    sw.ed("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    sw.st();
    $(_table_ + V_attrX(_dataRowGroup_, _true_)).e(function () {
        let _t = $(this);
        RowGroup_init(_t);

        // 修正行分组的首个单元格的缩进
        _t.f("tr" + V_attrX(_dataFolder_, _true_)).e(function () {
            let td = $(this).ch("td" + _first_);
            if (td.a(_dataIdentLevel_) !== gUndefined)
                td.c(_paddingLeft_, "0.5em");
        });
    });
    sw.ed("    ├ Row Group: ");

    // ----------------------------------------
    // 表格单元格重复表头引用块处理，group 模式重复将在行分组展开/收起时再进行处理
    sw.st();
    $(_table_ + V_attrX(_dataThRpt_, _true_)).e(function () {
        ThRepeater_init( $(this));
    });
    sw.ed("    └ Th Repeater: ");

    /**
     * 表格单元格初始化
     * @param table 表格对象
     */
    function __initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0;
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
                if (needCheckCellMerge
                    && table.a(_dataCellMerge_) !== _true_
                    && (CellMerge_syntax_row.test(text)
                    || CellMerge_syntax_col.test(text))) {
                        // 将表格标识为带合并单元格语法
                        table.a(_dataCellMerge_, _true_);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带列格式语法
                if (needCheckColumnFormatting) {
                    if (ColumnFormatting_init(table, th, text))
                        needCheckColumnFormatting = gFalse;
                }
                // 检测是否带重复表头语法
                if (needCheckThRpt
                    && colIndex === 0 // 只检测第 1 列
                    && ThRepeater_syntax_tag.test(text)) {
                        // 将表格标识为带行折叠语法
                        table.a(_dataThRpt_, _true_);
                        th.rHTML("## ", _);
                        needCheckThRpt = gFalse;
                }

                // ----------------------------------------
                // 添加列号标识，用于列格式化时使用
                th.a(_dataTblCol_, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 非列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross_bind(table, th);
            });
        });

        // 标记该表格列太多，用于匹配是否自动换行的自动版式
        if (colIndex > 7)
            table.a("d-col-too-more", colIndex);

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
                if (needCheckCellMerge
                    && table.a(_dataCellMerge_) !== _true_
                    && (CellMerge_syntax_row.test(text)
                    || CellMerge_syntax_col.test(text))) {
                        // 将表格标识为带合并单元格语法
                        table.a(_dataCellMerge_, _true_);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带行折叠语法
                if (needCheckRowGroup
                    && colIndex === 0 // 只检测第 1 列
                    && table.a(_dataRowGroup_) !== _true_
                    && RowGroup_syntax_tag.test(text)) {
                        // 将表格标识为带行折叠语法
                        table.a(_dataRowGroup_, _true_);
                        needCheckRowGroup = gFalse;
                }
                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<ma.+rk>$/.test(td.hm())) {
                    td.ch().ch().unwrap(); // 解包 <mark>
                    JQ_addClass(td, _vTblColFmtMark_);
                }

                // 添加列号标识，用于列格式化时使用
                td.a(_dataTblCol_, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross_bind(table, td);
            }); // find(th, td)
        }); // find(tr)
    }
}

let // 单元格内（加粗）文本着色的正则表达式
    gRE_boldRainbowText = new RegExp("(<" + _strong_ + "( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/' + _strong_ + ">)", "i"),
    // 有指定单元格内（斜体）文本着色的正则表达式
    gRE_italicRainbowText = new RegExp("(<em( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/em>)', "i"),
    // 有指定单元格内（高亮）文本着色的正则表达式
    gRE_highlightRainbowText = new RegExp("(<" + _mark_ + "( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/' + _mark_ + ">)", "i"),
    // 有指定单元格内（下划线）文本着色的正则表达式
    gRE_underlineRainbowText = new RegExp("(<u( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/u>)', "i"),
    // 代码
    gRE_code = new RegExp('(<code class="' + _vStdCode_ + '.*?(?=id-)(id-\\d+).*?(<\\/code>).*?)', "i"),
    // 标签
    gRE_tag = new RegExp('(<code class="v-tag.*?(?=id-)(id-\\d+).*?(<\\/code>).*?)', "i"),
    // 徽章
    gRE_badge = new RegExp('(<code class="v-badge-name.*?(?=id-)(id-\\d+)".*?(<\\/code><\\/code>).*?)', "i"),
    gRE_badge2 = new RegExp('(<code class="v-badge-name.*?(?=id-)(id-\\d+)\\s.*?(<\\/span><\\/code>).*?)', "i");
/**
 * 复制表格内容
 * @param source 内容源对象
 * @param event 事件对象
 */
function ExtTable_copyContent(source, event) {
    let content = _,
        trSet = ContentAssistor_lastHover.f("tr"),
        theadCount = ContentAssistor_lastHover.f("thead > tr").length,
        columnFmting = ContentAssistor_lastHover.a(_dataColumnFmting_),
        theadRepeater = ContentAssistor_lastHover.a(_dataThRpt_),
        rowGroup = ContentAssistor_lastHover.a(_dataRowGroup_),
        rowIndex = 0,
        rowCount = trSet.length,
        colIndex = 0, // 表格行的当前列（包括被合并列的）
        colCount = 0,
        alignSet = [], // 列的对齐方式
        xspanMatrix = []; // 单元格合并标识矩阵

    // 逐行读取表格内容
    trSet.e(function () {
        // 复制为 Markdown 时，在表头后添加分隔格式
        if (ContentAssistor_copyAsMarkdown && rowIndex === 1)
            content = __createTheadSpliter(content, alignSet);

        let cellSet = $(this).f("th, td");
        colIndex = 0;

        // 逐个单元格处理
        let re_LabelTag = new RegExp("<" + _label_ + " .*?><\\/" + _label_ + ">", "i");
        cellSet.e(function () {
            let htmlText = _,
                rowspan, colspan;

            // ====== 根据合并单元格预处理结果进行实际处理 =====
            // 对单元格纵向合并的填充处理
            htmlText = __disposeRowspan(htmlText);

            // ====== 对普通单元格的处理 ======

            // 读取单元格数据
            let cell = $(this),
                cellHTML = cell.hm(),
                colFmtChkbox = gFalse,
                colFmtMark = gFalse,
                // colFmtDel = gFalse,
                cellBg = cell.a(_dataRbCellBg_),
                cellWholeText = cell.a(_dataRbWholeText_);

            // 含有表格列格式时
            if (columnFmting !== gUndefined && columnFmting === _true_) {
                // 转换列格式（复选框）
                let css = cell.a(_class_);
                if (css !== gUndefined) {
                    if (css.i(_vTblColFmt_Chkbox_) !== -1) {
                        let yes = cell.ch(_svg_ + '[' + V_attr(_dataChk_, _yes_) + ']');
                        if (yes.length > 0)
                            cellHTML = cellHTML.r(/<svg .*?>([\s\S]*?)<\/svg>/i, "Y");
                        else {
                            let un = cell.ch(_svg_ + '[' + V_attr(_dataChk_, _un_) + ']');
                            if (un.length > 0)
                                cellHTML = cellHTML.r(/<svg .*?>([\s\S]*?)<\/svg>/i, "?");
                        }
                        // 复制为 Markdown 时，对表头列格式进行处理
                        if (ContentAssistor_copyAsMarkdown && rowIndex < theadCount)
                            colFmtChkbox = gTrue;
                    }

                    // ----- 复制为 Markdown 时的列格式处理 01 -----
                    // 常规（加粗/斜体/下划线/高亮/删除线）
                    if (ContentAssistor_copyAsMarkdown && rowIndex < theadCount) {
                        if (css.i(_vTblColFmtMark_) !== -1) // 高亮
                            colFmtMark = gTrue;
                        // if (css.i(_vTblColFmtDel_) !== -1) // 删除线
                        //     colFmtDel = gTrue;
                    }
                }

                // 记录列的对齐方式，用于在复制为 Markdown 时生成表头分隔分隔格式
                if (ContentAssistor_copyAsMarkdown)
                    alignSet[colIndex] = cell.c(_textAlign_);
            }

            // 转换表格分组
            if (rowGroup !== gUndefined && rowGroup === _true_) {
                let css = cell.a(_class_);
                if (css !== gUndefined && css.i(_vTblRowGSub_) !== -1) {
                    let identerCount = cell.ch('.' + _vTblRowGIdenter_).length;
                    for (let i = 0; i < identerCount; i++) {
                        // cellHTML = cellHTML.r(/<label .*?><\/label>/i,
                        cellHTML = cellHTML.r(re_LabelTag,
                            i === identerCount - 1 ? "> " : ">");
                    }
                }
            }

            // 转换单元格内容
            cellHTML = __transCellContent(cellHTML, cellBg, cellWholeText);

            // ----- 复制为 Markdown 时的列格式处理 02 -----
            if (ContentAssistor_copyAsMarkdown && rowIndex < theadCount) {
                if (colFmtChkbox) // 复选框
                    cellHTML = "[] " + cellHTML;
                // 加粗、斜体、下划线、高亮，已通过 __transCellContent() 进行了处理
                if (colFmtMark) // 高亮
                    cellHTML = "==" + cellHTML + "==";
                // if (colFmtDel) // 删除线
                //     cellHTML = "~~" + cellHTML + "~~";
                // 重复表头
                if (rowIndex === 0 && colIndex === 0 && theadRepeater !== gUndefined)
                    cellHTML = "## " + cellHTML;
            }

            // 生成要被复制的单元格内容
            htmlText += __maybeAsMarkdown("| ", _)
                + __maybeAsMarkdown(_, '"') + cellHTML + __maybeAsMarkdown(_, '"');

            // ====== 对合并单元格的处理 ======

            // 对单元格有纵向合并 rowspan 属性的处理
            rowspan = cell.a(_rowspan_);
            rowspan = (rowspan === gUndefined) ? 0 : JS_parseInt(rowspan);
            if (rowspan > 0) {
                for (let i = 0; i < rowspan - 1; i++) {
                    // 对应纵向合并的矩阵行为空则进行创建
                    if (xspanMatrix[rowIndex + i + 1] === gUndefined)
                        xspanMatrix[rowIndex + i + 1] = [];
                    // 在对应矩阵单元中标识被纵向合并的单元格
                    // 预处理，在下一轮处理中继续
                    xspanMatrix[rowIndex + i + 1][colIndex] = 1;
                }
            }

            // 对单元格有横向合并 colspan 属性的处理
            colspan = cell.a(_colspan_);
            colspan = (colspan === gUndefined) ? 0 : JS_parseInt(colspan);
            if (colspan > 0) {
                // 横向合并填充处理
                for (let i = 0; i < colspan - 1; i++) {
                    htmlText += __maybeAsMarkdown("| == ", ___) + "\t";
                    // 对应纵向合并的矩阵行为空则进行创建
                    if (xspanMatrix[rowIndex] === gUndefined)
                        xspanMatrix[rowIndex] = [];
                    // 在对应矩阵单元中标识被横向合并的单元格
                    xspanMatrix[rowIndex][colIndex + 1] = 2;
                    colIndex++;
                }
            }

            colIndex++;
            content += htmlText + __maybeAsMarkdown(___, "\t");
        }); // 逐个单元格处理结束

        // 记录表格实际列数
        if (colIndex > colCount)
            colCount = colIndex;

        // 每行最后一个非合并单元格的后续合并单元格的填充处理
        content = __disposeRowspan(content);

        rowIndex++;
        content = content.s(0, content.length - 1)
            + __maybeAsMarkdown(" |", _) + (rowIndex < rowCount ? "\n" : _);

        // ==========
        // 对单元格纵向合并的处理
        function __disposeRowspan(htmlText) {
            // 对已处理行中带纵向合并 rowspan 标识的数据进行适配处理
            if (xspanMatrix[rowIndex] !== gUndefined) {
                let rowspan = xspanMatrix[rowIndex][colIndex];
                while (rowspan !== gUndefined && rowspan === 1) {
                    htmlText += __maybeAsMarkdown("| : ", ___) + "\t";
                    colIndex++;
                    rowspan = xspanMatrix[rowIndex][colIndex];
                }
            }
            else
                xspanMatrix[rowIndex] = [];

            return htmlText;
        }


    }); // 逐行处理

    // 调试：打印标识矩阵
    __printXspanArr();

    Copyer_action(source, content, gTrue);

    // ==========

    function __createTheadSpliter(content, alignSet) {
        // 复制为 Markdown 时，在表头后添加分隔格式
        let lastAlign = _left_,
            spliter = "| ---- ";
        for (let i = 0; i < colCount; i++) {
            // 读取每列的对齐方式
            if (alignSet[i] !== gUndefined)
                lastAlign = alignSet[i];

            if (lastAlign === _left_) // 左对齐
                spliter = "| ---- ";
            else if (lastAlign === _right_) // 右对齐
                spliter = "| ---: ";
            else if (lastAlign === _center_) // 中间对齐
                spliter = "| :--: ";

            content += spliter;
        }
        content += "|\n";
        return content;
    }

    // 适配是否要复制为 Markdown
    function __maybeAsMarkdown(mdStr, plainStr) {
        return (ContentAssistor_copyAsMarkdown ? mdStr : plainStr)
    }

    // 转换单元格内容
    function __transCellContent(cellHTML, cellBg, cellWholeText) {
        // 转换徽章
        cellHTML = __transCellContent_badge(cellHTML, gRE_badge);
        cellHTML = __transCellContent_badge(cellHTML, gRE_badge2);
        // 转换标签
        cellHTML = __transCellContent_tag(cellHTML, gRE_tag);
        // 转换代码
        cellHTML = __transCellContent_code(cellHTML, gRE_code);

        // 转换文本着色、单元格背景色
        if (ContentAssistor_copyAsMarkdown) {
            // 有指定整段（整个单元格）的文本着色
            if (cellWholeText !== gUndefined)
                cellHTML = "_~" + cellWholeText + "~_" + cellHTML;

            // 有指定单元格背景色
            if (cellBg !== gUndefined)
                cellHTML += "_~" + cellBg + "!~_";

            // 有指定单元格内（加粗）文本着色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_boldRainbowText);
                // /(<strong( d-rb-text="([a-z!12]+)")?>)([\s\S]*?)(<\/strong>)/i);
            // 有指定单元格内（斜体）文本着色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_italicRainbowText);
                // /(<em( d-rb-text="([a-z!12]+)")?>)([\s\S]*?)(<\/em>)/i);
            // 有指定单元格内（高亮）文本着色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_highlightRainbowText);
                // /(<mark( d-rb-text="([a-z!12]+)")?>)([\s\S]*?)(<\/mark>)/i);
            // 有指定单元格内（下划线）文本着色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_underlineRainbowText);
                // /(<u( d-rb-text="([a-z!12]+)")?>)([\s\S]*?)(<\/u>)/i);
        }

        // 用于清除或转换特殊字符
        let badChars = [
                // /<br\s?\/?>/i, // <br>
                /&nbsp;/i, // 空格
                /&lt;/, // <
                /&gt;/, // >
                "'", // 英文单引号
                '"', // 英文双引号
                /(“)([^“]+)(“)/, // 连续第2个中文单引号
                /(‘)([^‘]+)(‘)/, // 连续第2个中文双引号
                /<.*?>/i // HTML 标签
                // /<[^>]+>/g // HTML 标签
            ],
            goodChars = [
                // "\n", // for <br>
                ___, // 空格
                "<", // <
                ">", // >
                "‘", // 中文单引号
                "“", // 中文双引号
                "$1$2”", // 中文反单引号
                "$1$2’", // 中文反双引号
                _ // for HTML 标签
            ];

        // 对 <br> 的处理 01
        let brTmp = "___br___";
        if (ContentAssistor_copyAsMarkdown) {
            cellHTML = cellHTML.rA(/<br\s?\/?>/i, brTmp);
            cellHTML = cellHTML.rA(/\$/, "\\$");
        }
        else
            cellHTML = cellHTML.rA(/<br\s?\/?>/i, "\n");

        // 清除或转换特殊字符，包括 HTML 标签
        for (let i = 0; i < badChars.length; i++)
            cellHTML = cellHTML.rA(badChars[i], goodChars[i]);

        if (ContentAssistor_copyAsMarkdown) {
            // 对 ___br___ 的处理 02
            cellHTML = cellHTML.rA(brTmp, "<br>");
            // 对 ___u___ 和 ___/u___ 的处理
            cellHTML = cellHTML.rA("___u___", "<u>");
            cellHTML = cellHTML.rA("___/u___", "</u>");
        }

        return cellHTML;
    }

    // 转换单元格内的标签
    function __transCellContent_tag(cellHTML, regExp) {
        let result = cellHTML.m(regExp);

        // 遍历处理单元格内的所有匹配的内容
        while (result != null) {
            let _t = $("." + _vTag_ + "." + result[2]);
            cellHTML = cellHTML.r(regExp,
                __maybeAsMarkdown(_t.a(_dataAsMarkdown_), _t.a(_value_)));
            // 匹配下一项
            result = cellHTML.m(regExp);
        }
        return cellHTML;
    }

    // 转换单元格内的徽章
    function __transCellContent_badge(cellHTML, regExp) {
        let result = cellHTML.m(regExp);

        // 遍历处理单元格内的所有匹配的内容
        while (result != null) {
                let _t = $("." + _vBadgeName_ + "." + result[2]);
                cellHTML = cellHTML.r(regExp,
                    __maybeAsMarkdown(_t.a(_dataAsMarkdown_), _t.a(_value_)));
                // 匹配下一项
                result = cellHTML.m(regExp);
        }
        return cellHTML;
    }

    // 转换单元格内的普通行内代码 code
    function __transCellContent_code(cellHTML, regExp) {
        let result = cellHTML.m(regExp);

        // 遍历处理单元格内的所有匹配的内容
        while (result != null) {
            let _t = $("." + _vStdCode_ + "." + result[2]);
            cellHTML = cellHTML.r(regExp,
                __maybeAsMarkdown(V_util_wrapBackquote(_t.t()), _t.t()));
            // 匹配下一项
            result = cellHTML.m(regExp);
        }
        return cellHTML;
    }

    // 转换单元格内的文本着色
    function __transCellContent_rainbowText(cellHTML, exp) {
        let result = cellHTML.m(exp);

        // 遍历处理单元格内所有格式着色内容
        while (result != null) {
            let color = result[3],
                format = result[1];
            if (color !== gUndefined)
                cellHTML = cellHTML.r(exp, "$1$4$5~($3)~");
            if (format !== gUndefined) {
                // strong
                if (format.sW("<st"))
                    cellHTML = cellHTML.r(exp, "**$4**");
                // em
                else if (format.sW("<e"))
                    cellHTML = cellHTML.r(exp, "*$4*");
                // mark
                else if (format.sW("<m"))
                    cellHTML = cellHTML.r(exp, "==$4==");
                // <u>
                else if (format.sW("<u"))
                    cellHTML = cellHTML.r(exp, "___u___$4___/u___");
            }
            // 匹配下一项
            result = cellHTML.m(exp);
        }
        return cellHTML;
    }

    // 调试：打印标识矩阵
    function __printXspanArr() {
        if (!debugMode)
            return;

        console.log("Table:", rowCount + " x " + colCount);
        let sss = "   ";
        for (let i = 0; i < colCount; i++)
            sss += ___ + i;
        console.log(sss);
        sss = "   ";
        for (let i = 0; i < colCount; i++)
            sss += " -";
        console.log(sss);
        for (let i = 0; i < rowCount; i++) {
            sss = _;
            if (xspanMatrix[i] !== gUndefined) {
                for (let j = 0; j < colCount; j++)
                    sss += (xspanMatrix[i][j] === gUndefined) ? ". " : xspanMatrix[i][j] + ___;
                console.log(i + " | " + sss);
            }
        }
    }
}

// ==================== 表格单元格合并类 ==================== //

// 单元格合并语法
let CellMerge_syntax_row = /^(:)$/, // 行，纵向合并
    CellMerge_syntax_col = /^(==)$/ // 列，横向合并

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
            if (CellMerge_syntax_row.test(cell.t())) {
                tblSpan[rowIndex][colIndex] = 1;
                needRowSpan = gTrue;
            }
            colIndex++;
            colCount++;

            // --- 列合并（横向） ---
            // 是列合并标识
            if (CellMerge_syntax_col.test(cell.t())) {
                colSpanCount++;
                JQ_remove(cell);
                if (colSpanCount === 1)
                    colSpanCell = lastCell;
            }
            // 不是列标识，则进行最近列标识数据进行处理
            else {
                if (colSpanCount > 0 && colSpanCell != null) {
                    colSpanCell.a(_colspan_, colSpanCount + 1);
                    CellMerge_emptyBlankCell(colSpanCell);
                    colSpanCell.c(_textAlign_, _center_);
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
            colSpanCell.a(_colspan_, colSpanCount + 1);
            CellMerge_emptyBlankCell(colSpanCell);
            colSpanCell.c(_textAlign_, _center_);
        }
        colSpanCount = 0;

        rowIndex++;
        colIndex = 0;
        colCount = 0;
    }); // tr

    rowIndex = 0;

    // --- 行间合并（纵向）---
    if (needRowSpan) {
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
                    if (thSpanFlag)
                        tblTd2ThData[tblTd2ThData.length] = tblData[r][c].p();
                    JQ_remove(tblData[r][c]); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    if (c + 1 < tblSpan[r].length)
                        tblData[r][c + 1].c(_paddingLeft_, V_util_getVarVal("--tbl-cell-padding"));
                } else {
                    thSpanFlag = gFalse;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell != null) {
                        rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                        CellMerge_emptyBlankCell(rowSpanCell);
                        rowSpanCell.c(_verticalAlign_, "middle");
                        rowSpanCount = 0;
                        rowSpanCell = null;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell != null) {
                rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                CellMerge_emptyBlankCell(rowSpanCell);
                rowSpanCell.c(_verticalAlign_, "middle");
            }
        } // for

        // 处理列头的纵向合并
        for (let i = 0, len = tblTd2ThData.length; i < len; i++) {
            tblData[0][0].p().p().ap(tblTd2ThData[i]);
            // 将 thead 内的 td 标签转换为 th
            let foundTd = gFalse;
            tblTd2ThData[i].f("td").e(function () {
                foundTd = gTrue;
                // 暂存 td 的属性数据
                let td = $(this),
                    style = td.a(_style_),
                    tblCol = td.a(_dataTblCol_),
                    classValue = td.a(_class_),
                    colspan = td.a(_dataColspan_);
                // td 转换为 th 标签
                td.a(_dataTd2th_, _true_);
                // td.prop(_outerHTML_, td.prop(_outerHTML_).rA("<td ", "<th "));
                td.rW(td.prop(_outerHTML_).rA("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.p().a(_style_, style);
                td.p().a(_dataTblCol_, tblCol);
                td.p().a(_class_, classValue);
                td.p().a(_dataColspan_, colspan);
            });
            // 对被从 td 转换为 th 单元格，重新绑定：鼠标点击单元格时显示阅读模式（十字光标）
            if (foundTd) {
                tblTd2ThData[i].f("th" + V_attrX(_dataTd2th_)).e(function () {
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
        cell.hm(_);
        JQ_addClass(cell, "v-empty-cell");
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

let //TableCross_enabled = gFalse,
    TableCross_ui = gUndefined,
    TableCross_lastTable = gUndefined, // 最后/当前显示阅读模式（十字光标）的表格
    TableCross_lastCell = gUndefined; // 最后/当前显示阅读模式（十字光标）的表格单元格

function TableCross_init() {
    TableCross_ui = $(_vTblX_);
    // TableCross_ui = $(".v-table-cross");
    V_ui_addAnimate(TableCross_ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
function TableCross_toggle(table) {
    // 已打开，则关闭
    if (table.a(_dataTblX_) === _true_)
        TableCross_disable(table);
    // 未打开，则打开
    else
        TableCross_enable(table);
}

// 打开表格阅读模式（十字光标）
function TableCross_enable(table) {
    // TableCross_enabled = gTrue;
    table.a(_dataTblX_, _true_);
    JQ_addClass(ContentAssistor_btns_tableCross, _selected_);

    if (table !== gUndefined && table != null)
        table.p().p().n("." + _vContentExpander_).ch(".v-btn").tr(_click_);
}

// 关闭表格阅读模式（十字光标）
function TableCross_disable(table) {
    // TableCross_enabled = gFalse;
    table.a(_dataTblX_, _false_);
    JQ_removeClass(ContentAssistor_btns_tableCross, _selected_);
    TableCross_hide();
}

/**
 * 绑定单元格，鼠标点击单元格时显示阅读模式（十字光标）
 * @param table 单元格所属表格对象
 * @param cell 单元格对象
 */
function TableCross_bind(table, cell) {
    cell.uC().ck(function (event) {
        if (table.a(_dataTblX_) !== _true_ || Copyer_processing)
            return;

        // vvv 不同表格之间点击，先强制移除动画 vvv
        if (TableCross_lastTable !== table)
            V_ui_removeAnimate(TableCross_ui);

        // 同一单元格不重复处理
        if (TableCross_lastCell === cell)
            return;

        let container = table.p().p(),
            contentFolded = container.a(_dataContentFolded_);
        // 跳过被折叠表格
        if (contentFolded !== gUndefined && contentFolded.sW("t"))
            return;

        // 若点击同时也触发了「代码 / 标签 / 徽章」的复制
        if (!Copyer_processing)
            event.stopPropagation(); // 停止事件冒泡，避免与其他事件的处理冲突（如：document.click）

        TableCross_hide();
        JQ_addClass(cell, _vTblXCell_);

        TableCross_lastCell = cell;
        TableCross_lastTable = table;

        let tblWidth = JS_parseInt(table.c(_width_)),
            tblHeight = JS_parseInt(table.c(_height_));

        let cellWidth = JS_parseInt(cell.c(_width_)),
            cellHeight = JS_parseInt(cell.c(_height_)),
            cornerLeftX = table.oL(),
            cornerUpY = table.oT(),
            cornerLeftWidth = cell.oL() - table.oL(),
            cornerUpHeight = cell.oT() - table.oT(),
            cornerRightX = cell.oL()  + cellWidth,
            cornerDownY = cell.oT() + cellHeight,
            cornerRightWidth = tblWidth - cornerLeftWidth - cellWidth,
            cornerDownHeight = tblHeight - cornerUpHeight - cellHeight;

        // 1. 左上角
        let leftUp = $(_vTblX_ + ".left-up");
        leftUp.c(_left_, cornerLeftX)
            .c(_top_, cornerUpY)
            .c(_width_, cornerLeftWidth)
            .c(_height_, cornerUpHeight)
            .c(_zIndex_, 9);

        // 2. 右上角
        let rightUp = $(_vTblX_ + ".right-up");
        rightUp.c(_left_, cornerRightX)
            .c(_top_, cornerUpY)
            .c(_width_, cornerRightWidth)
            .c(_height_,  cornerUpHeight)
            .c(_zIndex_, 9);

        // 3. 左下角
        let leftDown = $(_vTblX_ + ".left-down");
        leftDown.c(_left_, cornerLeftX)
            .c(_top_, cornerDownY)
            .c(_width_, cornerLeftWidth)
            .c(_height_, cornerDownHeight)
            .c(_zIndex_, 9);

        // 4. 右下角
        let rightDown = $(_vTblX_ + ".right-down");
        rightDown.c(_left_, cornerRightX)
            .c(_top_, cornerDownY)
            .c(_width_, cornerRightWidth)
            .c(_height_, cornerDownHeight)
            .c(_zIndex_, 9);

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

    JQ_removeClass(TableCross_lastCell, _vTblXCell_);
    TableCross_lastTable = gUndefined;
}

/**
 * 判断当前内容块是否与已显示了阅读模式（十字光标）的表格重叠
 * @param target 内容块对象
*/
// function TableCross_checkFallWith(target) {
//     return (TableCross_lastTable !== gUndefined
//         && target.ch().a(_id_) === TableCross_lastTable.a(_id_));
// }

// ==================== 表格自动换行类 ==================== //

/**
 * 切换表格自动换行开关
 */
function TableWrap_toggle(table) {
    // 已打开，则关闭
    if (table.c(_whiteSpace_) === _preWrap_)
        TableWrap_disable(table);
    // 未打开，则打开
    else
        TableWrap_enable(table);
}

// 打开表格自动换行
function TableWrap_enable(table) {
    JQ_addClass(ContentAssistor_btns_tableWrap, _selected_);
    JQ_removeClass(table, "v-table-unwrap");
    JQ_addClass(table, "v-table-wrap");
    // table.c(s_CssText, s_WhiteSpace + ":" + s_PreWrap + s_Important);
}

// 关闭表格自动换行
function TableWrap_disable(table) {
    JQ_removeClass(ContentAssistor_btns_tableWrap, _selected_);
    JQ_removeClass(table, "v-table-wrap");
    JQ_addClass(table, "v-table-unwrap");
    // table.c(s_CssText, s_WhiteSpace + ":pre" + s_Important);
}

// ==================== 表格列格式化类 ==================== //

let ColumnFormatting_syntax_checkbox_header = /\[ ?] /; // 复选框列头格式语法
let ColumnFormatting_syntax_checkbox = /(^((\[[x-]])|[Yy?？])(\s.+)*)/; // 复选框列内单元格格式语法

/**
 * 初始化
 * @param table 表格对象
 * @param cell 单元格对象
 * @param text 单元格文本内容
 */
function ColumnFormatting_init(table, cell, text) {
    if (table.a(_dataColumnFmting_) !== _true_
        && (cell.f(_strong_ + ",em,u," + _mark_ + "," + _del_).length > 0 // 普通列格式
        || cell.c(_textAlign_) === _right_ // 右对齐表示使用数值格式
        || ColumnFormatting_syntax_checkbox_header.test(text))) { // 复选框列格式
            // 将表格标识为带列格式语法
            table.a(_dataColumnFmting_, _true_);
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
        cells = table.f(V_attrX(_dataColspan_, _true_, "!=") + V_attrX(_dataTblCol_, th.a(_dataTblCol_)));
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
        tbodyCells = table.f("td" + V_attrX(_dataTblCol_, th.a(_dataTblCol_)));
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
            cellsCSS = _;

        // 粗体
        if (th.f(_strong_ + _firstChild_).length > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _vTblColFmt_Bold_ + ___;
        }

        // 斜体
        if (th.f("em" + _firstChild_).length > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _vTblColFmt_Em_ + ___;
        }

        // 高亮
        let thHTML = th.hm();
        if (thHTML.sW("<mar") && thHTML.eW("rk>") // <mark>...</mark>
            || th.a(_class_) !== gUndefined
            && th.a(_class_).i(_vTblColFmtMark_) > -1) {
                $(V_attrX(_dataTblCol_, th.a(_dataTblCol_))).f(_mark_).ch().unwrap();
                cells = ColumnFormatting_getCells(table, th, cells);
                cellsCSS += _vTblColFmtMark_ + ___;
        }

        // 批量添加以上列的常规样式
        if (cells !== gUndefined && cellsCSS.length > 0)
            JQ_addClass(cells, cellsCSS);

        // 下划线
        // if (th.f("u" + _firstChild_).length > 0) {
        //     JQ_addClass(th, _vTblColFmt_U_);
        //     tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
        //     tbodyCells.contents().wrap("<u></u>");
        // }

        // 删除线
        // if (th.f(_del_ + _firstChild_).length > 0) {
        //     JQ_addClass(th, _vTblColFmtDel_);
        //     tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
        //     tbodyCells.contents().wrap("<" + _del_ + "></" + _del_ + ">");
        // }

        // 复选框
        if (ColumnFormatting_syntax_checkbox_header.test(th.t())) {
            cells = ColumnFormatting_getCells(table, th, cells);
            JQ_addClass(cells, _vTblColFmt_Chkbox_);

            // 删除列头的复选框语法
            ColumnFormatting_removeCheckboxSyntax(th, ColumnFormatting_syntax_checkbox_header);

            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);

            tbodyCells.e(function () {
                let ce = $(this),
                    ceText = ce.t().x(),
                    typeFlag = ceText.m(ColumnFormatting_syntax_checkbox),
                    chkStatus = _no_,
                    chkStyle = _dark_;

                typeFlag = (typeFlag != null) ? typeFlag[2] : _;

                // 跳过横向合并的单元格
                if (ce.a(_colspan_) !== gUndefined)
                    return gTrue;

                // 移除单元格的复选框语法内容
                ColumnFormatting_removeCheckboxSyntax(ce, typeFlag);

                // 指定为 yes - 已选择
                if (typeFlag === "[x]" || typeFlag.l() === "y") {
                    chkStatus = _yes_;
                    chkStyle = _theme_;
                }
                // 指定为 un - 不确定选择
                else if (typeFlag === "[-]" || typeFlag === "?" || typeFlag === "？")
                    chkStatus = _un_;
                // 无指定
                else
                    ce.rHTML(_nbsp_, _);

                // 添加复选框样式（有指定的内容，或单元内容为空时才添加）
                if (typeFlag.length > 0 || ceText.length === 0)
                    ce.pp(V_ui_svgIcon(_icoChkbox__ + chkStatus, 14, 14, chkStyle, _, V_attr(_dataChk_, chkStatus)));
                else
                    // 添加差异化的文本着色
                    ce.pp("<em>" + V_ui_sub(_, _, "Gy") + "</em>");
            });
        }

        // 数值格式
        if (th.c(_textAlign_).sW("r")) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            JQ_addClass(tbodyCells, _vTblColFmtNum_);
            // 数值格式化处理
            tbodyCells.e(function () {
                let ce = $(this),
                    text = ce.t();
                // 内容为数值
                if (text.isNumber()) {
                    // 添加千位符
                    ce.hm(V_formatting_decimal( // 添加千位符
                        V_formatting_thousands(ce.hm()))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting_coloringNumber(ce, text, gTrue);
                }
                // 内容为百分数
                else if (text.isPercent()) {
                    // 对小数进行处理
                    ce.hm(V_formatting_percent( // 对小数进行处理
                        V_formatting_decimal(ce.hm()))); // 对百分数进行格式化处理
                    // 根据正负号进行着色处理
                    let coloring = ColumnFormatting_coloringNumber(ce, text, gTrue),
                        percent = text.r(/(-|\+|\s)/g, _),
                        percentValue = JS_mathRound(percent.r("%", _)),
                        percentBg = V_ui_hexToRGB(V_util_getVarVal("--h-f")),
                        bg1 = V_ui_formatRGBA(percentBg, 0.1),//"rgba(128, 128, 128, 0.1)",
                        bg2 = V_ui_formatRGBA(percentBg, 0.4),//"rgba(128, 128, 128, 0.4)",
                        bgSplit = V_ui_formatRGBA(percentBg, 0.8);//"rgba(128, 128, 128, 0.8)";

                    // 对有首色的进行渐变颜色调整
                    if (coloring) {
                        let baseBg = ce.c(_color_).r("rgb", "rgba");
                        bg1 = baseBg.r(")", ", 0.05)");
                        bg2 = baseBg.r(")", ", 0.2)");
                        bgSplit = baseBg.r(")", ", 0.7)");
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.c(_background_, _linearGradient_ + "(90deg, " + bg1 + " 0%, " + bg2 + ___ + (percentValue > 1 ? percentValue - 1 : 0)
                        + "%, " + bgSplit + ___ + percent
                        + ", transparent " + percent + ")")
                            .c(_minWidth_, "100px");
                    // 对 +/- 符号进行处理
                    ce.hm(ce.hm().r(">+", ">▴ ").r(">-", ">▾ "));
                }
                // 内容为货币
                else if (text.isCurrency()) {
                    // 对货币符号进行格式货
                    ce.hm(V_formatting_decimal( // 对货币符号进行格式货
                        V_formatting_thousands( // 添加千位符
                            V_formatting_currency(ce.hm())))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting_coloringNumber(ce, text, gFalse);
                }
            });
        } // 数值格式

        // 标识单元格是否为横向合并，横向合并的单元不应用列格式
        if (th.a(_colspan_) !== gUndefined)
            th.a(_dataColspan_, _true_);
        else
            th.a(_dataColspan_, _false_);
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
    if (mode) {
        if (text.sW("-")) {
            JQ_addClass(target, _vTblColFmtNumNegative_);
            return gTrue;
        }
        else if (text.sW("+")) {
            JQ_addClass(target, _vTblColFmtNumPositive_);
            return gTrue;
        }
    }
    // 正、负号在文本的任意位置
    else {
        if (text.i("-") > -1) {
            JQ_addClass(target, _vTblColFmtNumNegative_);
            return gTrue;
        }
        else if (text.i("+") > -1) {
            JQ_addClass(target, _vTblColFmtNumPositive_);
            return gTrue;
        }
    }
    return gFalse;
}

/**
 * 移除复选框的语法内容
 * @param target 目标单元格对象
 * @param syntaxText 要移除的语法内容
 */
function ColumnFormatting_removeCheckboxSyntax(target, syntaxText) {
    target.rHTML(syntaxText, _);
}

// ==================== 表格行分组/折叠类 ==================== //

let RowGroup_folderCount = 0, // 折叠行内行分组类型的数量
    RowGroup_syntax_tag = /^>+(\s)./, // 用于匹配行折叠语法
    RowGroup_syntax_tag2Replace = /(&gt;)+(\s)/, // 用于匹配将行折叠语法替换为指定字符
    RowGroup_spliter = "> ", // 行折叠语法与内容的分隔标识
    RowGroup_parentStack = [], // 上级行的堆栈
    RowGroup_colorStack = [], // 不同分组的背景颜色堆栈
    // 表格折叠行图标：已收起
    RowGroup_icoCloser = V_ui_svgIcon(_icoFolded_, 16, 16, _theme_);
    // 表格折叠行图标：已展开
    // RowGroup_icoOpened = V_ui_genSvgIcon("icoUnfold", 16, 16, s_Theme)

/**
 * 初始化
 * @param table 表格对象
 */
function RowGroup_init(table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    JQ_addClass(table.f(V_attrX(_dataTblCol_, "-0", "$=")), _vTblRowGNotFolder_);

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0; // 当前缩进等级
        // bgColor = new RandomColor();

    // 遍历所有行的第 1 个单元格
    table.f("td" + _firstChild_).e(function () {
        let td = $(this),
            tr = td.p(),
            text = td.t();

        // 判断每行的首列，是否有行折叠标识
        // 没有则进入下一个循环
        if (!RowGroup_syntax_tag.test(text)) {
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
                V_ui_formatRGBA(RandomColor_dissimilarRgb(), _varTblRowAlpha_));
            // 设置为行缩进行
            RowGroup_ident(tr, td, currentLevel);
        }
        // 当前等级比上一次等级要浅
        else {
            // 获得等级差进行
            let count = lastLevel - currentLevel;
            // 获得当前行对应的上级行
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    RowGroup_parentStack.pop();
                    RowGroup_colorStack.pop();
                }
                // JQ_addClass(tr, "v-rowgroup-spliter");
                // tr.ch("td").c(_backgroundColor_, "yellow");
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
    let folderRow = tr.pr();
    RowGroup_folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup_parentStack.push(RowGroup_folderCount);
    // 将当前行分组的随机背景颜色入栈
    RowGroup_colorStack.push(color);

    // 设置折叠行分组的属性
    folderRow.a(_dataFolderId_, RowGroup_folderCount);
    folderRow.a(_dataFolder_, _true_);
    folderRow.a(_dataRowFolded_, _true_);

    // 获得折叠行分组首个单元格
    let td = folderRow.ch("td" + _first_),
        tdHadIdent = td.f("." + _vTblRowGIdenter_ + _last_);
        // btnRowGroup = V_ui_span("v-tbl-row-g-btn", __, RowGroup_icoCloser);

    // 设置折叠控件样式
    if (tdHadIdent.length > 0)
        tdHadIdent.af(V_ui_span(_vTblRowGBtn_.xD(), _, RowGroup_icoCloser));
    else
        td.pp(V_ui_label(_vTblRowGBtn_.xD(), _, RowGroup_icoCloser));

    V_ui_addAnimate(td.f(_vTblRowGBtn_ + ">" + _svg_));
    // 调整折叠行的缩进样式
    JQ_removeClass(td, _vTblRowGNotFolder_);
    JQ_addClass(td, _vTblRowGFolder_);
    JQ_addClass(tdHadIdent, _vTblRowGIdenterFolder_);

    // 添加代表目录的括号及样式
    // 重新组合生成新的单元格内容，以支持原始带格式的单元格内容
    let preClass = "." + _vTblRowGIdenter_ + ", " + _vTblRowGBtn_,
        preObjs = td.f(preClass),
        cloneTd = td.clone();
    JQ_remove(cloneTd.ch(preClass));
    // td.hm(__echoOuterHTML(preObjs) + " <span class='folder-marker'>[</span> " + V_ui_strong(__ + cloneTd.hm() + _s_) + "<span class='folder-marker'>]</span>");
    td.hm(__echoOuterHTML(preObjs) + ___ + V_ui_strong(cloneTd.hm() + ___));

    // 设置展开、收起事件
    td.ch(_vTblRowGBtn_).ck(function (event) {
        RowGroup_toggle(folderRow, event);
    });

    /**
     * 遍历获得指定对象集合的所有 outerHTML 内容
     * @param objectSet 对象集合
     * @returns String
     */
    function __echoOuterHTML(objectSet) {
        let outerHTML = _;
        objectSet.e(function () {
            outerHTML += $(this).prop(_outerHTML_);
        });
        return outerHTML;
    }
}

/**
 * 展开、收起表格行分组下的表格行
 * @param folderRow 折叠按钮所在的表格行对象
 * @param event 事件对象
 */
function RowGroup_toggle(folderRow, event) {
    // 取消事件冒泡，用于避免显示表格的阅读模式（十字光标）
    event.stopPropagation();

    // 处理行分组的打开、关闭
    if (folderRow.a(_dataRowFolded_).sW("t"))
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
 * @returns boolean 处理结果。true: 已展开，false: 不符合展开条件
 */
function RowGroup_openAll(table, mode) {
    if (table.a(_dataRowGroup_) !== _true_)
        return gFalse;

    table.f(_vTblRowGBtn_).e(function () {
        let folderRow = $(this).p().p();
        if (folderRow.a(_dataRowFolded_) === _true_)
            RowGroup_open(folderRow, mode);
    });
    return gTrue;
}

/**
 * 收起全部表格行分级
 * @param table 指定的表格对象
 * @param mode 指定处理范围。auto：关闭被自动打开的，不指定时默认全部关闭
 * @returns boolean 处理结果。true: 已展开，false: 不符合展开条件
 */
function RowGroup_closeAll(table, mode) {
    if (table.a(_dataRowGroup_) !== _true_)
        return gFalse;

    // 只对第一级的行分组进行处理，非第一级的行分级为 span.v-tbl-row-g-btn
    table.f(_label_ + _vTblRowGBtn_).e(function () {
        let folderRow = $(this).p().p();
        LOG(mode, folderRow.a(_dataRowOpenMode_), folderRow.a(_dataRowFolded_));
        if (mode === _auto_) {
            if (folderRow.a(_dataRowOpenMode_) === _auto_ && folderRow.a(_dataRowFolded_) === _false_)
                RowGroup_close(folderRow);
        }
        else {
            if (folderRow.a(_dataRowFolded_) !== _true_)
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
    JQ_removeAttr(target, _dataRowGroup_);
    JQ_removeAttr(target.f("tr" + V_attrX(_dataParentFolderId_)), _dataParentFolderId_);
}

/**
 * 设置为缩进行
 * @param tr 对应的行对象
 * @param td 对应的行的首个单元格
 * @param level 缩进层级
 */
function RowGroup_ident(tr, td, level) {
    // 统一缩进节点符号转换，尾行在完成的有处理后再进行修正
    td.rHTML(RowGroup_syntax_tag2Replace, _);

    // 设置被折叠行的属性
    tr.a(_dataParentFolderId_, RowGroup_lastParent());
    // 设置缩进样式
    td.a(_dataIdentLevel_, level);
    // 调整样式
    JQ_removeClass(td, _vTblRowGNotFolder_);
    JQ_addClass(td, _vTblRowGSub_);
    // 设置被折叠行的背景色
    tr.c(_backgroundColor_, RowGroup_lastColor());

    // 生成缩进占位元素
    for (let i = 0; i < level; i++) {
        let identer = td.f("." + _vTblRowGIdenter_ + _last_),
            identObj = V_ui_label(_vTblRowGIdenter_, _);
        if (identer.length > 0)
            identer.af(identObj);
        else
            td.pp(identObj);
    }

    // 隐藏被折叠的行
    tr.c(_display_, _table_ + "-column");
}

/**
 * 展开表格行分组
 * @param folderRow 行分组对象
 * @param mode 指定打开模式。auto：系统自动打开
 */
function RowGroup_open(folderRow, mode) {
    // 处理展开行分组
    let id = folderRow.a(_dataFolderId_),
        table = folderRow.p().p(),
        subRows = table.f("tr" + V_attrX(_dataParentFolderId_, id)),
        folderButton = folderRow.ch("td" + _first_).ch(_vTblRowGBtn_ + _last_);

    folderRow.a(_dataRowFolded_, _false_);
    if (mode !== gUndefined)
        folderRow.a(_dataRowOpenMode_, mode);
    // folderButton.prop("innerHTML", RowGroup_icoOpened);
    // folderButton.hm(RowGroup_icoOpened);
    JQ_addClass(folderButton.ch(_svg_), _vRotate90_);
    subRows.c(_display_, _);

    // 如表格指定了重复表头则进行对应处理
    let thRow = table.f("thead>tr" + _lastChild_);
    if (table.a(_dataThRpt_) === "group") {
        // 从第 2 列开始进行处理
        folderRow.f("td:not(" + _firstChild_ + ")").e(function () {
            let td = $(this),
                tdHTML = td.hm().x();
            if (tdHTML.length === 0 || tdHTML === _nbsp_) {
                let colID = td.a(_dataTblCol_),
                    th = thRow.f("th" + V_attrX(_dataTblCol_, colID)).hm();
                // 如果对应的列头可能因向下合并单元格为空时，尝试找上一行对应的列头
                if (th === gUndefined) {
                    let prevThRow = thRow.pr();
                    if (prevThRow !== gUndefined)
                        th = prevThRow.f("th" + V_attrX(_dataTblCol_, colID)).hm();
                }
                // 临时将行分组中的单元格替换为对应的列头
                td.hm(th);
                JQ_addClass(td, _vThRepeater_);
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
    let id = folderRow.a(_dataFolderId_),
        subRows = $("tr" + V_attrX(_dataParentFolderId_, id)),
        folderButton = folderRow.ch("td" + _first_).ch(_vTblRowGBtn_ + _last_);

    folderRow.a(_dataRowFolded_, _true_);
    JQ_removeAttr(folderRow, _dataRowOpenMode_);
    // folderButton.prop("innerHTML", RowGroup_icoClosed);
    // folderButton.hm(RowGroup_icoClosed);
    JQ_removeClass(folderButton.ch(_svg_), _vRotate90_);

    // 折叠所有子行（包括行分组）
    subRows.e(function () {
        let tr = $(this),
            folder = tr.a(_dataFolder_);
        if (folder !== gUndefined && folder.sW("t"))
            RowGroup_close(tr);
        tr.c(_display_, _table_ + "-column");
    });

    // 如表格指定了重复表头则进行对应处理
    let table = folderRow.p().p();
    if (table.a(_dataThRpt_) === "group") {
        // 从第 2 列开始进行处理
        folderRow.f("td:not(" + _firstChild_ + ")").e(function () {
            let td = $(this);
            // 将行分组中临时替换的列头删除
            if (td.a(_class_).i(_vThRepeater_) > -1) {
                td.hm(_);
                JQ_removeClass(td, _vThRepeater_);
            }
        });
    }
}

/**
 * 根据设备类型自适应hover样式
 */
function RowGroup_adjustHoverStyle() {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(_vTblRowGBtn_).uH();
    else // 为表格行分组的折叠控件绑定 hover 事件
        V_ui_bindHover($(_vTblRowGBtn_));
}

// ==================== 表格列头重复生成器 ==================== //

let ThRepeater_syntax_tag = /^(##\s).+/; // 用于匹配表格列头重复的语法

/**
 * 初始化重复表头处理
 */
function ThRepeater_init(table) {
    let hasRowGroup = table.a(_dataRowGroup_) === _true_;

    // 带行分组时，表头重复模式为 group，其他则为 page
    table.a(_dataThRpt_, hasRowGroup ? "group" : "page");
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
                let rowSpan = JS_parseInt($(this).a(_rowspan_));
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
                    tr.af($(this).prop(_outerHTML_).rA("<th ", "<td "));
                    JQ_addClass(tr.n().ch("td"), _vThRepeater_);
                    if (colIndex === 0)
                        JQ_addClass(tr.n().ch("." + _vThRepeater_), "first");
                    else
                        JQ_addClass(tr.n().ch("." + _vThRepeater_), "not-first");
                    tr = tr.n();
                    // 取消表格行号
                    JQ_addClass(tr, "v-tr-repeater");

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

let ExtAudio_icon_loading = V_ui_svgIcon(_icoLoading_, 16, 16, _light_),
    ExtAudio_icon_play = V_ui_svgIcon(_icoPlay_, 16, 16, _light_),
    ExtAudio_icon_pause = V_ui_svgIcon(_icoPause_, 16, 16, _light_),
    ExtAudio_icon_stop = V_ui_svgIcon(_icoStop_, 16, 16, _light_),
    ExtAudio_icon_forbidden = V_ui_svgIcon(_icoForbidden_, 16, 16, _light_);

/**
 * 初始化音频数据
 */
function ExtAudio_init() {
    // 支持指定类型的音频，以及支持带参数的 URL
    let writeImg = _write_ + ___ + _img_;
    $(writeImg + "[src$='.mp3']," + writeImg + "[src$='.m4a']," + writeImg + "[src$='.ogg']," + writeImg + "[src$='.wav'],"
    + writeImg + "[src*='.mp3?']," + writeImg + "[src*='.m4a?']," + writeImg + "[src*='.ogg?']," + writeImg + "[src*='.wav?']").e(function () {
        let audioLike = $(this),
            audio = gUndefined,
            src = audioLike.a(_src_),
            container = audioLike.p(),
            params = V_util_getUrlQueryParams(src);

        // 指定为 mini 模式（扩展的自定义控件）
        if (params[_controls_] === _mini_) {
            V_doc_counter_audiomini++;

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.a(_id_, _vkIdMiniAudio_ + V_doc_counter_audiomini);

            // 添加音频播放 mini 控件
            audio.af(V_ui_div(_vkIdMiniAudio_ + V_doc_counter_audiomini + "-control", _vAudioMiniControl_,
                        V_attr(_dataTitle_, "mini audio " + V_doc_counter_audiomini)));

            // 开始加载音频
            audio.bind("loadstart", function () {
                let controls = $("#" + $(this).a(_id_) + "-control");
                JQ_addClass(controls, _vAudioMiniControl_);
                JQ_addClass(controls, _loading_);
                controls.hm(ExtAudio_icon_loading);
            });

            // 音频就绪可以开始播放
            audio.bind("canplay", function () {
                let controls = $("#" + $(this).a(_id_) + "-control");
                JQ_removeClass(controls, _loading_);

                // 绑定点击事件
                controls.uC().ck(function () {
                    __play(this, audio[0]);
                });
                controls.hm(ExtAudio_icon_play);
                controls.a(_dataPause_, params["pause"]);

                // 须显示持续时长
                let dur = params["duration"];
                if (dur !== gUndefined && dur.sW("t")) {
                    let dur2 = audio.a(_dataDuration_);
                    if (dur2 === gUndefined || !dur2.sW("t")) {
                        // 计算音频时长
                        let duration = audio[0].duration,
                            min = Math.floor(duration / 60),
                            sec = Math.floor(duration -  min * 60);
                        let minStr = min > 0 ? min + "′" : _;
                        audio.n().af(" <sup class='v-duration-info'>" + minStr + sec + "″</sup>");
                        audio.a(_dataDuration_, _true_);
                    }
                }
            });

            // 正在播放
            audio.bind(_playing_, function () {
                let controls = $("#" + $(this).a(_id_) + "-control"),
                    pause = controls.a(_dataPause_);

                JQ_addClass(controls, _vAudioMiniControl_)
                JQ_addClass(controls, _playing_);

                // 支持暂停播放
                if (pause !== gUndefined && pause.sW("t")) {
                    controls.hm(ExtAudio_icon_pause);
                }
                // 不支持暂停播放，暂时即结束
                else {
                    controls.hm(ExtAudio_icon_stop);
                    audio.currentTime = 0; // 播放都是从头开始
                }
            });

            // 播放结束后恢复按钮状态
            audio.bind("ended", function () {
                let controls = $("#" + $(this).a(_id_) + "-control");
                controls.hm(ExtAudio_icon_play);
                JQ_removeClass(controls, _playing_);
            });

            // 故障或不可用
            audio.bind(_emptied_, function () {
                let id = $(this).a(_id_) + "-control",
                    controls = $("#" + id);
                JQ_removeClass(controls, _loading_);
                controls.hm(ExtAudio_icon_forbidden);
                JQ_addClass(controls, _vAudioMiniControl_);
                JQ_addClass(controls, _disabled_);
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(id, controls.a(_dataTitle_));
            });

            // 加载错误
            audio.bind(_error_, function () {
                audio.tr(_emptied_);
            });

            // 鼠标 hover 事件
            audio.hover(function () {
                let _t =  $(this);
                if (_t.a(_class_).i(_disabled_) === -1)
                    JQ_addClass(_t, _hover_);
            }, function () {
                JQ_removeClass($(this), _hover_);
            });
        }
        // 标准控件模式
        else {
            V_doc_counter_audio++;

            // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (V_util_getTagName(container) !== "p") {
                audioLike.wrap("<p></p>");
            // if (V_util_getTagName(container) !== _figcaption_) {
            //     audioLike.wrap(V_ui_figcaption(_, _, _));
                container = audioLike.p();
            }
            // 设置容器样式数据，用于折叠内容时使用
            container.a(_dataContainer_, _audio_);
            JQ_addClass(container, _vCaptionContainer_);

            // 先根据题注语法生成题注
            CaptionGenerator_actionForMediaContent(audioLike, _audio_);

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.a(_controls_, _controls_);

            // 若有第 2 题注，则微调样式
            if (audio.n(_vCap2_).length > 0)
                audio.c(_marginBottom_, "-10px");

            // 故障或不可用
            audio.bind(_emptied_, function () {
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.p().a(_id_), audio.p().a(_dataTitle_));
            });

            // 加载错误
            audio.bind(_error_, function () {
                audio.tr(_emptied_);
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
            LinkTool_addToCheck(id, "🔈 "
                + V_ui_strong([
                    "无效的音频源",
                    "Invalid audio source"
                ][V_lang_id]) + ": " + content);
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
            "Your browser does not support the audio tag."
        ][V_lang_id];

        // 对 audio 标签的属性进行支持
        let autoplay = V_util_getUrlQueryParams(src)[_autoplay_],
            loop = V_util_getUrlQueryParams(src)[_loop_],
            preload = V_util_getUrlQueryParams(src)[_preload_];

        // 将 URL 为音频资源的 img 标签转换为 audio
        audioLike.wrap(V_ui_audio(V_attr(_src_, src), tips));
        let audio = audioLike.p();
        // 移除图片 img 标签
        JQ_remove(audioLike);

        // 设置 audio 属性
        if (autoplay !== gUndefined) audio.a(_autoplay_, _autoplay_);
        if (loop !== gUndefined) audio.a(_loop_, _loop_);
        if (preload !== gUndefined) audio.a(_preload_, _auto_);

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
        if (audio.paused) {
            audio.play();
        }
        // 播放中
        else {
            controls.hm(ExtAudio_icon_play);
            JQ_removeClass(controls, _playing_);
            audio.pause();

            // 不支持暂时播放时，暂时即结束
            if (controls.a(_dataPause_) === gUndefined)
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
    let writeImg = _write_ + ___ + _img_;
    $(writeImg + "[src$='.ogv']," + writeImg + "[src$='.mp4']," + writeImg + "[src$='.webm'],"
    + writeImg + "[src*='.ogv?']," + writeImg + "[src*='.mp4?']," + writeImg + "[src*='.webm?']").e(function () {
        let videoLike = $(this),
            video = gUndefined,
            src = videoLike.a(_src_),
            container = videoLike.p();
        V_doc_counter_video++;

        // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
        if (V_util_getTagName(container) !== "p") {
            videoLike.wrap("<p></p>");
        // if (V_util_getTagName(container) !== _figcaption_) {
        //     videoLike.wrap(V_ui_figcaption(_, _, _));
            container = videoLike.p();
        }
        // 设置容器样式数据，用于折叠内容时使用
        container.a(_dataContainer_, "video");
        JQ_addClass(container, _vCaptionContainer_);

        // 先根据题注语法生成题注
        CaptionGenerator_actionForMediaContent(videoLike, _video_);

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.bind(_emptied_, function () {
            // 将无法加载的音频信息添加到链接检查器
            __addToLinkChecker(video.p().a(_id_), video.p().a(_dataTitle_));
        });

        // 加载错误
        video.bind(_error_, function () {
            video.tr(_emptied_);
        });
    });

    /**
     * 将无效视频源的信息添加到链接检查器
     * @param id 坏链对象的标识
     * @param content 用于显示的内容
     */
    function __addToLinkChecker(id, content) {
        // 将无法加载的音频信息添加到链接检查器
        LinkTool_addToCheck(id, "📺 "
            + V_ui_strong([
                "无效的视频源",
                "Invalid video source"
            ][V_lang_id] + ": ") + content);
    }

    /**
     * 转换为 video 标签
     * @param videoLike 类 video 标签（即 src 为视频的 img 标签)
     * @param src 视频 URL
     */
    function __transToVideo(videoLike, src) {
        let tips = [
            "您的浏览器不支持视频标签。",
            "Your browser does not support the video tag."
        ][V_lang_id];

        // 对 video 标签的属性进行支持
        let autoplay = V_util_getUrlQueryParams(src)[_autoplay_],
            loop = V_util_getUrlQueryParams(src)[_loop_],
            preload = V_util_getUrlQueryParams(src)[_preload_],
            width = V_util_getUrlQueryParams(src)[_width_],
            height = V_util_getUrlQueryParams(src)[_height_];

        // 将 URL 为音频资源的 img 标签转换为 video
        videoLike.wrap(V_ui_video(V_attr(_src_, src), tips));
        let video = videoLike.p();
        // 移除图片 img 标签
        JQ_remove(videoLike);

        // 设置 video 为标准控件
        video.a(_controls_, _controls_);

        // 设置 video 属性
        if (autoplay !== gUndefined) video.a(_autoplay_, _autoplay_);
        if (loop !== gUndefined) video.a(_loop_, _loop_);
        if (preload !== gUndefined) video.a(_preload_, _auto_);
        if (width !== gUndefined) video.a(_width_, width);
        if (height !== gUndefined) video.a(_height_, height);

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

    T.lastValue = _;
    T.timerValueChanged = null;

    T.inputing = gFalse;

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
        let ui = V_ui_div(_, "v-textfield " + id,
                    V_ui_div(_, "v-textfield-icon")
                    + V_ui_input(_, _, _text_)
                    // + '<input type="text">'
                    + V_ui_div(_, "v-textfield-action")
                    + V_ui_div(_, "v-textfield-reset", V_ui_svgIcon(_icoResetInput_, 16, 16, _alpha_))
                );
        if (append) {
            target.ap(ui);
            T.ui = target.ch(".v-textfield." + id);
        }
        else {
            target.af(ui);
            T.ui = target.p().ch(".v-textfield." + id);
        }

        // 获得实例的各关键对象
        T.input = T.ui.ch(_input_);
        T.reset = T.ui.ch(".v-textfield-reset");

        /**
         * 绑定文本输入事件
         */
        T.input.on(_input_, function () {
            // 跳过中文输入法过程
            // if ($(this).prop("compositionStatus") !== "start")
            //     __processInput();
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
            // __processInput();
        });
        /**
         * 绑定文本获得焦点事件
         */
        T.input.focus(function () {
            T.inputing = gTrue; // 标记为输入中的状态

            JQ_addClass(T.ui, _vTextFieldFocus_);
            __checkComValueChanged();

            // 针对输入中文的情况，若输入了新的内容则进行查询
            function __checkComValueChanged() {
                if (T.input.prop("compositionStatus") !== "start" && T.lastValue !== T.input.val()) {
                    clearTimeout(T.timerValueChanged);
                    T.timerValueChanged = null;
                    T.lastValue = T.input.val();
                    __processInput();
                }
                T.timerValueChanged = setTimeout(__checkComValueChanged, 500);
            }
            // 触发外部重定义事件
            typeof(T.onFocus) === _function_ && T.onFocus(T.input);
        });
        /**
         * 绑定文本失去焦点事件
         */
        T.input.blur(function () {
            T.inputing = gFalse; // 标记为非输入中的状态

            JQ_removeClass(T.ui, _vTextFieldFocus_);

            clearTimeout(T.timerValueChanged);
            T.timerValueChanged = null;

            // 触发外部重定义事件
            typeof(T.onBlur) === _function_ && T.onBlur(T.input);
        });

        /**
         * 处理文本框输入的内容
         */
        function __processInput() {
            let value = T.input.val().x();

            if (value === _) {
                T.reset.hide();

                // 无内容时移除样式
                if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) !== -1) {
                    JQ_removeClass(T.action, _enabled_);
                    V_ui_unbindHover(T.action);
                }
            }
            else {
                T.reset.show();

                // 有内容时移除样式
                if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) === -1) {
                    JQ_addClass(T.action, _enabled_);
                    T.action.hover(function () {
                        T.actionHover(gTrue);
                    }, function () {
                        T.actionHover(gFalse);
                    });
                }
            }
            // 触发外部重定义事件
            typeof(T.onInput) === _function_ && T.onInput(T.input, value);
        }

        /**
         * 绑定键盘按下事件
         */
        T.input.bind("keydown", function (event) {
            let code = event.keyCode || event.which || event.charCode,
                value = T.input.val();

            let handled = false;
            switch (code) {
                case 13: // ENTER
                    if (T.action !== gUndefined)
                        T.action.tr(_click_);
                    handled = true;
                    typeof(T.pressEnter) === _function_ && T.pressEnter(T.input, value);
                    break;
                case 27: // ESC
                    // 无内容时则取消取点，退出编辑，键盘事件则由导航中心的键盘事件进行响应
                    if (value.length === 0)
                        T.input.blur();
                    // 有内容则清空内容等待重新输入
                    else
                        T.reset.tr(_click_);
                    handled = true;
                    typeof(T.pressESC) === _function_ && T.pressESC(T.input);
                    break;
            }
            // 如果事件已处理，则禁止双重操作
            if (handled)
                event.preventDefault();

            // 触发外部重定义事件
            typeof(T.onKeyDown) === _function_ && T.onKeyDown(T.input, value, code);
        });

        /**
         * 绑定重置输入内容按钮
         */
        T.reset.uC().ck(function () {
            T.input.val(_);
            T.input.select();
            T.reset.hide();

            if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) !== -1) {
                JQ_removeClass(T.action, _enabled_);
                V_ui_unbindHover(T.action);
            }
            // 触发外部重定义事件
            typeof(T.onInput) === _function_ && T.onInput(T.input, _);
        });
    }

    /**
     * 清空输入框内容
     */
    T.clear = function () {
        T.reset.tr(_click_);
    }

    /**
     * 开启输入框前图标
     * @param icon 图标
     */
    T.setIcon = function (icon) {
        T.icon = T.ui.ch(".v-textfield-icon");
        T.icon.hm(icon);
        T.icon.show();
    }

    /**
     * 开启动作按钮
     * @param icon 按钮图标
     */
    T.setAction = function (icon) {
        T.action = T.ui.ch(".v-textfield-action");
        T.action.hm(icon);
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
            typeof(T.onAction) === _function_ && T.onAction(T.input, value);
        });
    }

    /**
     * 动作按钮鼠标 hover 处理
     * @param enter true: 鼠标光标进入，false: 鼠标光标离开
     */
    T.actionHover = function (enter) {
        if (enter) {
            JQ_addClass(T.action, _hover_);
            if (T.action.a(_class_).i(_enabled_) !== -1)
                JQ_addClass(T.ui, _hoverAction_);
        }
        else {
            JQ_removeClass(T.action, _hover_);
            JQ_removeClass(T.ui, _hoverAction_);
        }
    }

    /**
     * 设置提示文本
     * @param text 提示文本
     */
    T.placeholder = function (text) {
        T.input.a(_placeholder_, text);
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
        T.ui.c(_width_, width);
        T.input.c(_width_, width
            - (T.reset.w() + JS_parseInt(T.reset.c(_paddingLeft_)) * 2)
            - (T.icon === gUndefined ? 0 : T.icon.w() + JS_parseInt(T.icon.c(_paddingLeft_)) * 2)
            - (T.action === gUndefined ? 0 : T.action.w() + JS_parseInt(T.action.c(_paddingLeft_)) * 2));
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

        let set = T.result.ch(":" + _visible_),
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
        entry : $("." + _vSegmentBtn_ + ".catalog"), // 入口
        body : $(".v-toc-catalog-body"), // 目录索引内容
        result : $("." + _vTocFilterResult_ + ".catalog") // 过滤结果面板
    }

    T.holder = holder;

    T.h = []; // 目录集
    // 针对无封面的情况
    if (VOM_cover() === gUndefined)
        T.h.push(_vkIdDocTitle_);

    T.currentHeaderIndex = -1; // 当前章节在目录集中的索引
    T.currentItem = gUndefined; // 当前章节对象

    T.foldItems = []; // 非叶子章节集
    T.lastHeaderFolder = gUndefined; // 上一个非叶子章节
    T.lastHeaderLevel = 0; // 上一个章节的层级

    T.lastDocScrollTop = 0; // 记录最后一次文档滚动位置

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 当前章节变化事件
    T.onChapterChanged = gUndefined;

    // 目录相关图标集
    // T.icon = {
    //     // 章节：已收起
    //     folded : V_ui_genSvgIcon(_icoTocFolded_, 16, 16, s_Theme),
    //     // 章节：已展开
    //     // unfold : V_ui_genSvgIcon("icoTocUnfold", 16, 16, s_Theme)
    // };

    // 更新无目录情况下的提示信息
    T.ui.body.a(_dataCatalogEmpty_, [
            "( 无目录 )",
            "( Catalog is Empty )"
        ][V_lang_id]);

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
     */
    T.typeName = function () {
        return _catalog_;
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
            $(_vTocFolder_).uH();
        else // 非移动设备时绑定样式事件
            V_ui_bindHover($(_vTocFolder_));
    }

    /**
     * 添加目录节点
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    T.add = function (item) {
        T.holder.segs.sts(this, gTrue);

        // 将章节记录到目录集中
        let a = item.ch("a"),
            href = a.a(_href_);
        T.h.push(href.s(1, href.length));

        // 自定义目录节点元数据
        item.a(_id_, _vkHeader_ + item.a(_dataRef_)); // 添加id属性
        item.a(_dataNode_, "0"); // 添加节点类型：0:叶子节点, 1:目录节点
        item.a(_dataFolded_, _false_); // 添加节点状态：true:收起, false:展开
        item.a(_title_, a.t().x());

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.af(a.t());
        a.t(_);

        // 点击目录节点事件
        item.uC().ck(function () {
            // 跳转至对应的页内锚点
            let hash = $("#" + item.a(_id_)).ch("a").a(_href_);
            V_util_gotoHash(hash);

            // 触发锚点点击事件
            typeof(T.holder.onInteractive) === _function_ && T.holder.onInteractive();
        });

        // -----------------------------------
        // 目录非叶子章节的折叠功能实现
        // 所有目录节点都添加 folding 空白控件备用
        $(V_ui_div("fd-" + _vkHeader_ + item.a(_dataRef_), _vTocFolder_.xD(), _nbsp_)).insertBefore(item.f("a"));

        // 记录所有非叶子节点的folder控件
        let lv = ChpAutoNum_parseTocHeaderLevel(item.a(_class_));
        if (T.lastHeaderFolder !== gUndefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (lv > T.lastHeaderLevel) {
                // 将最近一个子目录节点折叠控件入栈
                T.foldItems.push(T.lastHeaderFolder);

                // 为非叶子的章节添加折叠图标
                // let folder = T.lastHeaderFolder.hm(T.icon.unfold),
                // let folder = T.lastHeaderFolder.hm(T.icon.folded),
                let folder = T.lastHeaderFolder.hm(V_ui_svgIcon(_icoTocFolded_, 16, 16, _theme_, _vRotate90_)),
                    folderParent = folder.p();
                folderParent.a(_dataNode_, "1"); // 0:叶子, 1:目录
                folderParent.a(_dataFolded_, _false_); // true:收起， false:展开

                // 折叠控件事件
                V_ui_addAnimate(folder.ch(_svg_));
                folder.uC().ck(function (event) {
                    event.stopPropagation(); // 停止事件冒泡

                    let id = $(this).p().a(_id_);
                    T.disposeFold(id, ($("#" + id).a(_dataFolded_).sW("t")) ? "e" : "c", gTrue);
                });
            }
            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            else if (lv < T.lastHeaderLevel)
                T.foldItems.pop();

            // 设置当前节点的父级信息
            if (T.foldItems.length > 0)
                item.a(_dataPid_, T.foldItems[T.foldItems.length - 1].p().a(_id_));
        }

        // 更新最后处理的folder控件
        T.lastHeaderFolder = $("#fd-" + _vkHeader_ + item.a(_dataRef_));
        T.lastHeaderLevel = lv;
    }

    /**
     * 页面滚动时根据页面当前的位置，高亮对应目录中的章节
     */
    T.focusHeader = function (scrollTop) {
        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop === gUndefined)
            scrollTop = $(document).scrollTop();
        if (Math.abs(scrollTop - T.lastDocScrollTop) < 20)
            return;

        T.lastDocScrollTop = scrollTop;

        // ----------------------------------------
        // 寻找文档当前显示的章节
        // 默认为最后一章
        let curIdx = T.h.length - 1;
        for (let i = 0, len = T.h.length; i < len; i++) {
            let anchor = (!env.browser.Firefox)
                    ? T.h[i] // 非 Firefox 浏览器
                    : JS_decodeURI(T.h[i]), // Firefox 浏览器
                target = $("#" + JS_decodeURI(anchor));
            let headerHeight = target.h();
            // 将最近一个章节从文档可视空间上方滚出的章节定义为「当前章节」
            if ((target.oT() - $(document).scrollTop()) > (headerHeight * 3)) {
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
        if (T.inHeader()) {
            // ----------------------------------------
            // 更新目录内当前节点的样式
            // 先清除目录中上一次的「当前章节」的样式
            if (T.currentItem !== gUndefined)
                JQ_removeClass(T.currentItem, _vTocItemCurrent_);
            // 更新「当前章节」的样式
            T.currentItem = $("#" + _vlookToc_ + " a" + V_attrX(_href_, "#" + T.h[curIdx])).p();
            JQ_addClass(T.currentItem, _vTocItemCurrent_);

            // 若当前目录节点被折叠隐藏，则向上展开父级目录节点
            if (T.currentItem.isHidden())
                __expandUpFolder(T.currentItem.a(_dataPid_));

            // 导航中心内容自动滚动当前章节所在位置
            T.scrollToCurrent();
        }

        // 触发当前章节变化事件
        typeof(T.onChapterChanged) === _function_ && T.onChapterChanged();

        /**
         * 向上展开父级目录
         * @param id 父级目录 id 值
         */
        function __expandUpFolder(id) {
            // 展开
            T.disposeFold(id, "e", gTrue);
            // 若未到 h1（即第一级目录），则继续向上展开
            let item = $("#" + id),
                tagName = item.prop(_tagName_); // 注意！无法使用 V_util_getTagName ，会导致调用溢出
            if (tagName !== gUndefined && tagName.l() !== "h1")
                __expandUpFolder(item.a(_dataPid_));
        }
    }

    /**
     * 导航中心内容自动滚动到当前章节所在位置
     */
    T.scrollToCurrent = function () {
        if (T.currentItem === gUndefined || T.currentItem.pos() === gUndefined)
            return;

        // 根据当前节点情况，目录内的可视空间自动滚动该节点所在位置
        const preDis = T.currentItem.h() * 3, // 用于目录节点触动滚动的大小
            sTop = T.ui.body.scrollTop(), // 目录内当前滚动位置
            sBottom = sTop + T.ui.body.h(); // 当前可视空间中位于目录底部的位置

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (T.currentItem.pos().top < sTop)
            T.ui.body.scrollTop(T.currentItem.pos().top);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (T.currentItem.pos().top > (sBottom - preDis))
            T.ui.body.scrollTop(T.currentItem.pos().top - T.ui.body.h() + preDis);
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
     * @returns boolean true - 有匹配的结果，false - 无匹配的结果
     */
    T.filter = function (value) {
        if (value.x() === _)
            return gFalse;

        if (T.holder.segs.checkedItem() === T.typeName())
            T.showFilterResult();

        let matched = gFalse;
        T.ui.result.empty();
        // 遍历目录节点进行关键字匹配
        $(_tocItem_).e(function () {
            let item = $(this),
                data = item.a(_dataHeaderNum_) + item.a(_title_);
            if (data.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();

                JQ_addClass(cloneItem, _vTocItem_);
                JQ_removeClass(cloneItem, _mdTocItem_ + " md-toc-h1 md-toc-h2 md-toc-h3 md-toc-h4 md-toc-h5");
                JQ_remove(cloneItem.ch(_vTocFolder_));
                cloneItem.pp(V_ui_span(_, _, cloneItem.a(_dataHeaderNum_)));
                cloneItem.show();
                cloneItem.a(_dataKeywordMatch_, _true_);

                // 绑定同源的点击事件
                cloneItem.uC().ck(function () {
                    JQ_removeClass(T.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
                    item.tr(_click_);
                    JQ_addClass($(this), _vTocItemCurrent_);
                });

                // 将匹配的节点添加到过滤结果中
                T.ui.result.ap(cloneItem);
                matched = gTrue;
            }
        });
        // 过滤文库节点
        gToc.f("." + _vDocLibItem_).e(function () {
            let item = $(this),
                data = item.a(_title_) + item.a(_dataForSearch_);
            if (data.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                cloneItem.show();
                cloneItem.a(_dataKeywordMatch_, _true_);

                // 绑定同源的点击事件
                cloneItem.uC().ck(function () {
                    item.tr(_click_);
                });

                // 将匹配的节点添加到过滤结果中
                T.ui.result.ap(cloneItem);
                matched = gTrue;
            }
        });

        // 过滤结果为空
        if (!matched) {
            T.ui.result.empty();
            T.ui.result.ap(V_ui_div(_, "v-toc-filter-result-none",
                ["无匹配结果!",
                "No Results!"][V_lang_id]));
            TocIndex_updateStatus(this);
        }

        return gTrue;
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        if ($(_tocItem_).length > 0)
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
        JQ_removeClass(T.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
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
        V_util_gotoHash("#" + target.a(_dataAnchor_));
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
        // item.a(s_DataFolded, (action === "e") ? s_False : s_True);
        // btnFolder.hm((action === "e") ? T.icon.unfold : T.icon.folded);
        // btnFolder.hm((action === "e") ? JQ_addClass(btnFolder.ch(s_Svg), s_Rotate90) : JQ_removeClass(btnFolder.ch(s_Svg), s_Rotate90));
        if (action === "e") {
            item.a(_dataFolded_, _false_);
            JQ_addClass(btnFolder.ch(_svg_), _vRotate90_);
        }
        else {
            item.a(_dataFolded_, _true_);
            JQ_removeClass(btnFolder.ch(_svg_), _vRotate90_);
        }

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = itemSet.length; i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem != null) {
                const hd1 = ChpAutoNum_parseTocHeaderLevel(item.a(_class_));
                const hd2 = ChpAutoNum_parseTocHeaderLevel(lastItem.a(_class_));
                if (hd1 > hd2) // 当前节点层级大于上一个节点的层级，继续
                    continue;
                else if (hd1 < hd2) // 当前节点层级小于上一个节点的层级，终止
                    break;
            }

            // 如果是目录节点，同时是已展开，且执行动作为「收起」，才进行递归调用展开子节点
            if (traversal
                && item.a(_dataNode_) === "1"
                && item.a(_dataFolded_).sW("f")
                && action === "c") {
                    item.a(_dataFolded_, _true_);
                    // 递归处理
                    T.disposeFold(item.a(_id_), action, traversal);
            }

            // 收起 / 展开
            item.c(_display_, (action === "c") ? _none_ : _block_);
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
    ui.result.ap(V_ui_div(_, "v-toc-filter-result-none"));
    ui.tips = ui.result.ch(".v-toc-filter-result-none");

    TocIndex_showTips(ui);
}

/**
 * 无输入关键字的处理
 * @param indexObj 目标对象
 */
function TocIndex_noneKeyword(indexObj) {
    let ui = indexObj.ui,
        items = ui.result.ch("." + _vTocItem_);
    items.show();
    if (items.length === 0)
        TocIndex_showTips(ui);
    else {
        ui.tips.hide();
        items.a(_dataKeywordMatch_, _true_);
        TocIndex_updateStatus(indexObj);
    }
}

/**
 * 更新所属分段状态
 * @param indexObj 目标对象
 */
function TocIndex_updateStatus(indexObj) {
    TocIndex_segments.sts(indexObj,
        indexObj.ui.result.ch("." + _vTocItem_ + V_attrX(_dataKeywordMatch_)).length > 0);
}

/**
 * 显示提示信息
 */
function TocIndex_showTips(ui) {
    ui.tips.t("( " + [
        "无此类内容",
        "No such content"
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
    let item = $(V_ui_span(_vTocItem_,
                    V_attr(_dataForSearch_, V_util_clearHtmlQuot((forSearch === gUndefined || forSearch.x().length === 0) ? _ : forSearch)),
                    text));
    indexObj.ui.result.ap(item);
    // V_ui_addAnimate(item);
    item.uC().ck(function () {
        JQ_removeClass(indexObj.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
        JQ_addClass(item, _vTocItemCurrent_);

        V_util_gotoHash("#" + anchor);

        // 触发锚点点击事件
        typeof(indexObj.holder.onInteractive) === _function_ && indexObj.holder.onInteractive();
    });
}

/**
 * 按关键字过滤
 * @param indexObj 目标对象
 * @param value 过滤的关键字内容
 * @returns boolean true - 有匹配的结果，false - 无匹配的结果
 */
function TocIndex_filter(indexObj, value) {
    if (value.x().length === 0) {
        TocIndex_segments.sts(indexObj, gFalse);
        return gFalse;
    }

    // 清空索引列表项
    indexObj.ui.tips.hide();
    indexObj.ui.result.ch().hide();
    JQ_removeClass(indexObj.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
    JQ_removeAttr(indexObj.ui.result.ch(), _dataKeywordMatch_);

    // 遍历目录节点进行关键字匹配
    let matched = gFalse;
    indexObj.ui.result.ch("." + _vTocItem_).e(function () {
        let item = $(this),
            dataForSearch = item.a(_dataForSearch_);
        if (item.t().l().i(value) > -1
            || (dataForSearch !== gUndefined && dataForSearch.l().i(value) > -1)) {
                item.show();
                item.a(_dataKeywordMatch_, _true_);
                TocIndex_segments.sts(indexObj, gTrue);
                matched = gTrue;
        }
    });

    // 过滤结果为空
    if (!matched) {
        indexObj.ui.tips.t([
            "无匹配结果!",
            "No Results!"
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
    return (indexObj.ui.result.ch(_span_).length > 0);
}

/**
 * 显示索引组件
 * @param indexObj 目标对象
 */
function TocIndex_show(indexObj) {
    indexObj.ui.result.show();
    JQ_removeClass(indexObj.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);
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
        entry : $("." + _vSegmentBtn_ + ".figure"), // 入口
        result : $("." + _vTocFilterResult_ + ".figure"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
     */
    T.typeName = function () {
        return _figure_;
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
        TocIndex_show(this);
    }

    /**
     * 隐藏插图组件
     */
    T.hide = function () {
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
        entry : $("." + _vSegmentBtn_ + ".table"), // 入口
        result : $("." + _vTocFilterResult_ + ".table"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
     */
    T.typeName = function () {
        return _table_;
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
        entry : $("." + _vSegmentBtn_ + ".media"), // 入口
        result : $("." + _vTocFilterResult_ + ".media"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
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
        entry : $("." + _vSegmentBtn_ + ".codeblock"), // 入口
        result : $("." + _vTocFilterResult_ + ".codeblock"), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex_initUI(this);

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
     */
    T.typeName = function () {
        return _codeblock_;
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
        entry : $("." + _vSegmentBtn_ + ".history"), // 入口
        title : $("." + _vTocHistory_ + "-title"), // 历史记录标题
        result : $("." + _vTocHistory_ + "-result") // 历史记录面板
    };

    T.holder = holder;

    /**
     * 返回 Toc 组件类型名称
     * @returns string Toc 组件类型名称
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
        JQ_removeClass(T.ui.result.ch("." + _vTocItemCurrent_), _vTocItemCurrent_);

        // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
        let title = gUndefined,
            anchor = hash.s(1, hash.length);
        if (anchor.sW("vk-id")) // 插图/表格/多媒体/代码块索引
            title = $(hash).a(_dataTitle_);
        else if (anchor.sW("vk-err")) // 错误的内链
            title = $(hash).t();
        // 未匹配到以上 VLOOK 专属的索引锚点，则按目录索引进行处理
        if (title === gUndefined) {
            let hashObj = $(_tocItem_ + ">.md-toc-inner" + V_attrX(_href_, JS_decodeURI(hash))).p();
            title = V_ui_span(_, _, hashObj.a(_dataHeaderNum_) + ___)
                + JS_decodeURI(anchor);
        }
        let result = T.ui.result.ch(_span_ + V_attrX(_dataHistory_, hash));

        // 不存在相同的历史访问记录
        if (result.length === 0) {
            T.ui.result.pp(V_ui_span(_vTocItem_, V_attr(_dataHistory_, hash), title));
        }
        // 已存在相同的历史访问记录
        else {
            // 将相同的记录移动到最前面
            let existsItem = result.clone();
            T.ui.result.pp(existsItem);
            JQ_addClass(existsItem, _vTocItemCurrent_);
            JQ_remove(result);
        }

        // 为新增加 / 移动后的记录添加鼠标事件
        let item = T.ui.result.ch(_span_ + V_attrX(_dataHistory_, hash));
        JQ_addClass(item, _vTocItemCurrent_);
        item.a(_dataKeywordMatch_, _true_);
        item.uC().ck(function () {
            V_util_gotoHash(hash);
            // 触发锚点点击事件
            typeof(T.holder.onInteractive) === _function_ && T.holder.onInteractive();
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

        let tocItem = _span_ + "." + _vTocItem_,
            noneHistory = "div.v-toc-history-none";
        // 没有历史访问记录，也没有提示信息内容
        if (T.ui.result.ch(tocItem + ", " + noneHistory).length === 0) {
            // 添加提示信息
            T.ui.result.ap(V_ui_div(_, "v-toc-history-none",
                ["暂无记录!",
                "No records!"][V_lang_id]));
        }
        // 有历史访问记录
        else if (T.ui.result.ch(tocItem).length > 0) {
            // 移除提示信息
            JQ_remove(T.ui.result.ch(noneHistory));
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
    T.ui = $("." + _vDocLib_);
    T.iframe = gUndefined;
    T.enabled = gFalse;
    T.page = gUndefined;
    T.hash = _;
    T.counter = 0;
    T.identifier = _target_ + "=" + _vdl_;
    T.paths = [];
    T.holder = holder;

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    T.init = function () {
        let docLibValue = V_util_getMetaByName(_vlookDocLib_),
            result = null,
            docLibToc = gUndefined;

        T.iframe = $(_iframe_ + V_attrX(_name_, _vlookDocLib_));

        gToc.ap(V_ui_div(_docLibToc_, _));
        docLibToc = $("#" + _docLibToc_);

        // ------------------------------
        // 处理 YAML 中的文库配置，支持以逗号分隔的多段内容
        if (docLibValue !== gUndefined && (result = docLibValue.m(/^([^,]+(,\s*)?)+$/)) != null) {
            let docLibList = docLibValue.sp(/,\s*/);
            for (let i = 0; i < docLibList.length; i++) {
                result = docLibList[i].m(/^(\[([^\]]+)\]\(([^)\s]+)(\s+"([^"]+)")?\))$/);
                // 按 [text](url "title") 格式配置的文库
                if (result != null) {
                    let page = V_util_getUrlWithoutHash(result[3]),
                        hash = V_util_getUrlHash(result[3]),
                        text = result[2],
                        title = (result.length > 5) ? result[5] : _;
                    __addDocLibItem(text, page, hash, title);
                }
                // 按默认只有 url 方式配置的文库
                else {
                    let page = V_util_getUrlWithoutHash(docLibList[i]),
                        hash = V_util_getUrlHash(docLibList[i]);
                    __addDocLibItem(["浏览文库", "Document Library"][V_lang_id],
                        page, hash, _);
                }
            }
        }

        // ------------------------------
        // 处理文档内的文库专用链接
        let re_TargetVDL = new RegExp("[?&]target=" + _vdl_, "i");
        $("a" + V_attrX(_href_, T.identifier, "*=")).e(function () {
            let a = $(this),
                href = a.a(_href_),
                page = V_util_getUrlWithoutHash(href).r(re_TargetVDL, _),
                hash = V_util_getUrlHash(href);
            if (V_util_getUrlPathWithoutQueryAndHash(page).length > 0 || hash.length > 0)
                __addDocLibItem(a.t(), page, hash, a.a(_title_));

            JQ_removeAttr(a, _href_); // 移除 href
            a.a(_target_, _vdl_);
            a.uC().ck(function () {
                T.show(page, hash);
            });
        });

        T.reload();

        // 添加动画效果
        V_ui_addAnimate($("#" + _docLibToc_ + ">." + _vDocLibItem_
            + ", #" + _docLibToc_ + ">." + _vDocLibItem_ + ">svg"));

        LOG("    ├ DocLib: none");

        /**
         * 添加文库项
         * @param text 文库名称
         * @param page 文库页面路径
         * @param hash 文库页面锚点
         * @param title 文库用于被检查的内容
         */
        function __addDocLibItem(text, page, hash, title) {
            // 过滤重复的文库链接
            if (T.paths.includes(page + hash))
                return;
            T.paths.push(page + hash);

            T.enabled = gTrue;

            // 初始化第一个文库项
            T.counter++;
            if (T.counter === 1) {
                T.page = page;
                T.hash = hash;
            }

            // 添加文库项
            let target = V_util_getUrlQueryParams(page)[_target_],
                hasTarget = (target !== gUndefined && target.length > 0);
            docLibToc.ap(V_ui_div(_, _vDocLibItem_ + " id-" + T.counter,
                (hasTarget
                    ? V_ui_svgIcon(_icoDocLibExt_, 20, 18, _light_) // 图标：在新标签中打开
                    : V_ui_svgIcon(_icoDocLib_, 20, 18, _light_)) // 图标：在文库窗口中打开
                + _2nbsp_ + text
                ));

            // 初始化文库项数据
            let item = docLibToc.f("." + _vDocLibItem_ + ".id-" + T.counter);
            item.a(_dataPage_, page);
            item.a(_dataHash_, hash);
            item.a(_title_, text);
            // 设置用于被关键字搜索的内容
            item.a(_dataForSearch_, _vdl_ + "文库" + title);
            item.uC().ck(function () {
                if (hasTarget)
                    window.open(page + hash, target);
                else
                    T.show(page, hash);
            });

            LOG("    ├ DocLib: " + page + hash);
        }
    }

    /**
     * 重新加载文库内容
     * @param scheme （可选）指定的颜色方案，light / dark
     * @param page 指定的文库路径
     * @param hash 指定的锚点
     */
    T.reload = function (scheme, page, hash) {
        // 避免初始化时，与 ColorScheme.tg 重复加载
        if (scheme === ColorScheme.scheme && page === gUndefined
            || T.page === gUndefined)
            return;

        let cs = _;

        // 指定的颜色方案不为空时
        if (scheme !== gUndefined)
            cs = "&cs=" + scheme;

        // 指定的页面为空时（不包括 ?target=vdl 这种情况）
        if (page === gUndefined)
            page = T.page;
        // 指定的锚点为空时
        if (hash === gUndefined)
            hash = _;

        T.iframe.a(_src_,
            page + ((page.i("?") > -1) ? "&" : "?")
            + "ws=none&type=mini"
            + cs + hash);
    }

    /**
     * 是否已显示
     * @returns boolean
     */
    T.isShowed = function () {
        return T.ui.c(_display_) !== _none_;
    }

    /**
     * 显示文库
     * @param newPage 指定的文库路径
     * @param hash 指定的锚点
     */
    T.show = function (newPage, hash) {
        typeof(T.holder.onInteractive) === _function_ && T.holder.onInteractive();

        let path = V_util_getUrlPathWithoutQueryAndHash(newPage);
        // ALERT(`${path}, ${newPage}`);

        T.mask.show();
        T.ui.show();

        // 如果指定的页面为空，则使用当前页面
        if (path.length === 0) {
            path = T.page;
            newPage = T.page;
        }

        // 如果指定的锚点为空，且路径与当前页面一致，则不刷新页面
        if (hash.length === 0
            && path === V_util_getUrlPathWithoutQueryAndHash(V_util_getUrlWithoutHash(T.iframe.a(_src_))))
            return;

        // 刷新文库页面显示
        if (path === T.page)
            T.reload(gUndefined, gUndefined, hash);
        else
            T.reload(gUndefined, newPage, hash);
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
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 27: // ESC
                if (T.isShowed()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
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

    // ！！！注意！！！为适配浏览器安全策略！！！
    // 由于不同浏览器的安全策略不同，所以针对不同浏览器的图片颜色替换处理进行微调
    // 若 SVG 文件与当前 HTML 文件不在同一域名下，浏览顺会存跨域权限问题无法完成处理
    // 非 Firefox / Safari 以本地打开方式下无法进行处理
    let httpMode = WINDOW_getHref().sW("http"),
        canFillAlter = (httpMode || env.browser.Firefox || env.browser.Safari),
        hostname = window.location.hostname,
        imgHost = V_util_getMetaByName("vlook-image-host");
    if (imgHost !== gUndefined && !imgHost.eW("/"))
        imgHost += "/";

    $(_write_ + " p>" + _img_ + "," + _write_ + " .md-diagram-panel>" + _svg_ + ","
    + _write_ + " :is(" + _img_ + "[src*='#icon']," + _img_ + "g[src*='#logo']," + _img_ + "[src*='#card']," + _img_ + "[src*='#frame'])").e(function () {
        let fig = $(this),
            src = fig.a(_src_),
            src2FillAlter = src,
            container = fig.p(),
            tagName = V_util_getTagName(fig),
            // tagName = (src !== gUndefined ? _svg_ : _svg_),
            params = _,
            hash = _,
            isPostcard = gFalse;

        // ----------------------------------------
        // img 类插图的处理
        if (src !== gUndefined) {
            // 对于 img 类插图的预处理
            params = V_util_getUrlQueryParams(encodeURI(src));
            hash = V_util_getUrlHash(src);

            fig.a(_id_, "vk-id-img" + V_doc_counter_img);

            // 当前 HTML 的打开方式可进行图片「颜色替换」的适配处理
            if (canFillAlter === gTrue) {
                // 获得图片路径的域名
                let matchRes = src2FillAlter.m(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                let srcHost = matchRes && matchRes[1];

                // 对于相对路径，或与当前 HTML 域名一致
                if (srcHost == null || hostname === srcHost) {
                    // 针对 Safari 且指定了默认图床域名
                    // 进行颜色替换前，先调整原始 <img> 的 src
                    let needImgHost = (env.browser.Safari && !httpMode && imgHost !== gUndefined);
                    if (needImgHost) {
                        src2FillAlter = imgHost + src2FillAlter;
                        fig.a(_src_, src2FillAlter);
                    }

                    // 正式进行图片颜色替换处理
                    __initFillAlter(fig, params, hash, src2FillAlter);

                    // 恢复原始 <img> 的 src
                    if (needImgHost)
                        fig.a(_src_, src);
                }
            }

            // 初始化图片对「颜色方案」的适配处理
            __initColorScheme(fig, params);

            // 初始化图片对「高分屏」的适配处理
            __initHighDPI(fig, params);

            // 初始化图片对「图文卡片」的适配处理
            __initPostcard(fig, hash);

            // 对图片「加载结果」进行是跟踪检查
            __bindLoadChecker(fig);

            V_doc_counter_img++;

            // 跳过带指定显示版式的图片
            if (__isNotFigure(params, hash))
                return gTrue;

            // 插图（非明信片）的处理
            isPostcard = __isPostcard(params, hash);
            if (!isPostcard) {
                // 初始化图片背景的适配处理
                __initBackground(fig, params);

                // 添加插图容器
                container = fig.p();
                // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
                if (V_util_getTagName(container) !== "p") {
                    fig.wrap("<p></p>");
                // if (V_util_getTagName(container) !== _figcaption_) {
                //     fig.wrap(V_ui_figcaption(_, _, _));
                    container = fig.p();
                }

                // 初始化对齐方式
                __initAlign(container, hash, params);
            }
        }

        // 插图（非明信片）的处理
        if (!isPostcard) {
            // 绑定内容助手
            if (src !== gUndefined)
                ContentAssistor_bind(fig, _fig_ + _suffixImg_);
            else
                ContentAssistor_bind(fig, _fig_ + _suffixSvg_);

            V_doc_counter_figure++;

            // 处理题注
            __disposeCaption(fig, tagName);

            // 设置容器数据，用于折叠内容时使用
            container.a(_dataContainer_, tagName);
            JQ_addClass(container, _vCaptionContainer_);
            // 折叠长插图（一行多图的情况则跳过）
            let prevFig = fig.p().p();
            if (prevFig === undefined || prevFig.ch(".v-caption," + _img_).length === 1)
                ContentFolder_add(fig, _figure_);
        }
    }); // 结束初始化处理
    sw.ed("    ├ figure set: ");

    // ----------------------------------------
    // srcset 为 auto 模式的处理
    sw.st();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && V_util_getParamVal(_srcset_) === _auto_) {
            $("p" + V_attr(_dataContainer_, _img_) + ___ + _img_).e(function () {
                let fig = $(this);
                if (fig.a(_src_).i(_suffixSvg_, 1) === -1 // 跳过 svg 文件
                    && fig.a(_srcset_) === gUndefined) {
                        fig.a(_srcset_, fig.a(_src_) + " 2x");
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
       fig.a(_dataFigNum_, V_doc_counter_figure);
       JQ_addClass(fig, _vFig_);

       // 先根据题注语法生成题注
        CaptionGenerator_actionForMediaContent(fig, tagName);
    }

    /**
     * 绑定加载失败处理
     * @param fig 插图对象
     */
    function __bindLoadChecker(fig) {
        let src = fig.a(_src_);
        // 图片无法加载时加载默认图片
        fig.bind(_error_, function () {
            if (!ignoreImgLost) {
                // 将无法加载的图片信息添加到链接检查器
                let cp1 = fig.p().f(_vCap1_).hm(),
                    id = fig.p().a(_id_);
                // 非插图（无题注），则按普通的 img 来处理
                if (cp1 === gUndefined) {
                    cp1 = fig.a(_alt_);
                    id = fig.a(_id_);
                }
                // 添加无效链接项
                LinkTool_addToCheck(id, "🖼 "
                    + V_ui_strong([
                        "无效的图片源",
                        "Invalid image source"
                    ][V_lang_id] + ": ") + cp1);
            }

            __loadDefaultOnError($(this));
        });

        // 强制重新加载一次以触发error事件
        fig.a(_src_, src);
    }

    /**
     * 判断是否属于插图
     * @param params 插图路径
     * @param hash 插图路径
     * @returns boolean true：不属于插图，false：属于插图
     */
    function __isNotFigure(params, hash) {
        let iconMode = hash.i("#icon") > -1,
            logoMode = hash.i("#logo") > -1,
            frameMode = hash.i("#frame") > -1;
        return (iconMode || logoMode || frameMode);
    }

    /**
     * 判断是否属于明信片
     * @param params 插图路径
     * @param hash 插图路径
     * @returns boolean true：不属于明信片，false：属于明信片
     */
    function __isPostcard(params, hash) {
        return hash.i("#card") > -1;
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
            align = _center_;
        else if (align === gUndefined && hash.i("#right") > -1)
            align = _right_;
        else if (align === gUndefined && hash.i("#left") > -1)
            align = _left_;
        // 针对通过 URL 参数设置对齐方式
        else if (align === gUndefined && params["align"] !== gUndefined)
            align = params["align"];
        else
            return;
        // 设置父级对象的对齐方式
        container.c(_textAlign_, align);
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
        img.a(_dataFigGrid_, grid);
    }

    /**
     * 初始化图片颜色替换的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     * @param hash img 对象 hash 值
     * @param src img 对象的 src 值
     */
    function __initFillAlter(img, params, hash, src) {
        if (params[_fill_] === gUndefined)
            return;

        img.a(_dataImgFill_, params[_fill_]);

        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.i(_suffixSvg_, 1) > -1) {
            SVGInject(img[0], {
                // SVG 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    if (!__isNotFigure(params, hash))
                        ContentAssistor_bind(svgObj, _fig_ + _suffixSvg_);
                    // 对颜色进行替换的适配处理
                    ExtFigure_adjustFillAlterForSVG(svgObj.a(_dataImgFill_), svgObj);
                },
                // SVG 注入失败
                onFail : function (img, svg) {
                    ERROR("SVGInject ERROR:", $(img).a(_src_));
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
        if (params[_darksrc_] === gUndefined)
            return;

        // 适配 Dark Mode 的方式：反转
        if (params[_darksrc_] === _invert_  ) {
            img.a(_dataDarkSrc_, _invert_);
        }
        // 适配 Dark Mode 的方式：替换
        else {
            img.a(_dataDarkSrc_, _alter_);

            let src = img.a(_src_),
                path = V_util_getPath(src),
                queryString = V_util_getUrlQueryString(src);
            // 补全 URL 参数内容
            let darksrc = params[_darksrc_] + (queryString !== _ ? ("?" + queryString) : _);
            // 如果 darksrc 只含文件名，则用 src 的路径进行补全
            if (darksrc.i("/") === -1)
                darksrc = path + darksrc;

            // 初始化不同颜色方案的 src 内容
            img.a(_dataSrcLight_, img.a(_src_));
            img.a(_dataSrcDark_, darksrc);

            // 初始化不同颜色方案的 srcset 内容
            if (params[_srcset_] !== gUndefined)
                img.a(_dataSrcsetLight_, params[_srcset_]);
            if (params[_darksrcset_] !== gUndefined)
                img.a(_dataSrcsetDark_, params[_darksrcset_]);
        }
    }

    /**
     * 初始化图片高分屏的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let src = img.a(_src_),
            srcset = params[_srcset_],
            darksrcset = params[_darksrcset_];

        // Light Mode 对应的图片集
        if (srcset !== gUndefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.a(_dataSrcsetLight_, srcset);
            // 设置默认值
            img.a(_srcset_, srcset);
        }

        // Dark Mode 对应的图片集
        if (darksrcset !== gUndefined) {
            darksrcset = __transUrlSrcSet(img.a(_dataSrcDark_), darksrcset);
            img.a(_dataSrcsetDark_, darksrcset);
        }
    }

    /**
     * 初始化图片高分屏的适配处理
     * @param img img 对象
     * @param hash img 对象 src 值的锚点
     */
    function __initPostcard(img, hash) {
        // 未指定 card 参数，则跳过
        if (hash === gUndefined || hash.i(_card_) === -1)
            return;

        // 如果是嵌套在 blockquote 中，则对其进行样式调整
        let blockquote = img.parentsUntil(_blockquote_).last();
        if (blockquote.length > 0) {
            blockquote.p().c(_cssText_, _background_ + ":" + _none_ + _important_ + _padding_ + ":0" + _important_);
            blockquote.p().c(_boxShadow_, _none_);
            blockquote.p().c(_height_, _auto_);
            JQ_removeAttr(blockquote.p(), _dataQuoteGroup_);
        }

        // 插入卡片元素
        let altText = img.a(_alt_),
            altTextForSearch = altText,
            titleText = img.a(_title_),
            cardBody = img.p().n();

        // 若添加了通过引用块指定为正文内容的，则进行处理
        if (cardBody !== gUndefined && cardBody.length > 0) {
            if (V_util_getTagName(cardBody) === _blockquote_) {
                altText = cardBody.hm();
                altTextForSearch = cardBody.t();
                JQ_remove(cardBody);
            }
        }

        JQ_removeAttr(img, _title_);

        img.af(V_ui_div(_, "v-post-card v-transition-all",
                (titleText === gUndefined ? _ : V_ui_div(_, "v-card-title", titleText))
                + (altText === gUndefined ? _ : V_ui_div(_, "v-card-text", altText))
            ));

        // card 模式时绑定事件，card dual 模式时不绑定
        if (hash.i("#cardd") === -1) {
            // 图片 hover 事件
           img.hover(function () {
                let _t = $(this),
                    card = _t.n();
                if (card.c(_display_) !== _none_)
                    return;

                let padding = JS_parseInt(_t.c(_paddingLeft_)),
                    borderBottomWidth = JS_parseInt(_t.c(_borderBottomWidth_));

                // 设置卡片尺寸信息
                card.c(_width_, _t.w() + padding * 2);
                let h = JS_parseInt(card.c(_height_)),
                    imgH = _t.h() + padding * 2;
                card.c(_top_, borderBottomWidth + _t.pos().top + imgH - h);

                // 计算卡片应所在的 left 值
                card.c(_left_, _t.pos().left);

                // 显示
                card.c(_display_, _block_);
            }, function (event) {
                let _t = $(this),
                    card = _t.n();
                if (!v_ui_mouseDropIn(_t, event))
                    card.c(_display_, _none_);
            });

            // 鼠标离开文字卡片后事件
            img.n().on(_mouseLeave_, function (event) {
                if (!v_ui_mouseDropIn(img, event))
                    $(this).c(_display_, _none_);
            });
        }
        else {
            // img.c(_cssText_, _borderWidth_ + ":0" + _important_);
        }

        V_doc_counter_postcard++;

        // 题注处理
        if (titleText === gUndefined)
            titleText = _;
        if (altTextForSearch === gUndefined)
            altTextForSearch = _;
        let anchor = "vk-id-psc" + V_doc_counter_postcard,
            caption = V_ui_span(_, _, [
                "明信片 ",
                "Postcard "
                ][V_lang_id] + V_doc_counter_postcard + ".") + titleText,
            dataForSearch = titleText + altTextForSearch;
        img.a(_id_, anchor);
        img.a(_dataTitle_, caption);
        iNavCenter.figure.add(caption, anchor, dataForSearch);
    }

    /**
     * 加载默认图片
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        // let alt = target.a(s_Alt);
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        JQ_removeAttr(target, _alt_);
        JQ_removeAttr(target, _title_);
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
        if (/^@2x(,@3x)?$/.test(srcset)) {
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
        let sss = srcset.sp(",");
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
 * @param source 内容源对象
 * @param event 事件对象
 */
function ExtFigure_copySrc(source, event) {
    let content = ContentAssistor_lastHover.a(_src_);
    // 若复制为 Markdown
    if (ContentAssistor_copyAsMarkdown) {
        let alt = ContentAssistor_lastHover.a(_alt_),
            title = ContentAssistor_lastHover.a(_title_);
        content = "![" + (alt !== gUndefined ? alt : _)
            + "](" + content + (title !== gUndefined ? ' "' + title + '"' : _) + ")";
    }
    Copyer_action(source, content, gTrue);
 }

/**
 * 适配指定图片在 Light / Dark Mode 的适配处理
 * @param disposeGrid 是否进行网格背景适配处理：true / false
 */
function ExtFigure_adjustColorScheme(disposeGrid) {
    let scheme = ColorScheme.scheme,
        darkMode = scheme === _dark_;
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 1. 对适配方式为「反转」的处理
    $(_img_ + V_attrX(_dataDarkSrc_, "invert") + ", " + _svg_ + V_attrX(_dataDarkSrc_, "invert")).e(function () {
        let img = $(this),
            src = img.a(_src_);
        if (darkMode) {
            // 如果图片没有指定替换颜色时才进行处理
            if (img.a(_dataImgFill_) === gUndefined) {
                // 设置默认的 srcset
                if (src !== gUndefined)
                    img.a(_srcset_, img.a(_dataSrcsetLight_));
                // 添加反转样式
                JQ_addClass(img, _vImgInvertDark_);
            }
        }
        else {
            JQ_removeClass(img, _vImgInvertDark_);
            if (src !== gUndefined)
                img.a(_srcset_, img.a(_dataSrcsetLight_));
        }
    });
    // 2. 对适配方式为「替换」的处理
    $(_img_ + V_attrX(_dataDarkSrc_, "alter")).e(function () {
        let img = $(this);
        JQ_removeClass(img, _vImgInvertDark_);
        img.a(_src_, img.a(_dataSrc_ + scheme));
        img.a(_srcset_, img.a(_dataSrcset_ + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $(_img_ + V_attrX(_dataImgFill_, "text")
        + "," + _img_ + V_attrX(_dataImgFill_, "theme1")
        + "," + _img_ + V_attrX(_dataImgFill_, "theme2")
        + "," + _svg_ + V_attrX(_dataImgFill_, "text")
        + "," + _svg_ + V_attrX(_dataImgFill_, "theme1")
        + "," + _svg_ + V_attrX(_dataImgFill_, "theme2")).e(function () {
        let fig = $(this),
            fill = fig.a(_dataImgFill_);
        // SVG 对象，或 src 为 .svg 的 img 对象
        if (V_util_getTagName(fig).sW("s") || fig.a(_src_).i(_suffixSvg_, 1) > -1) {
            ExtFigure_adjustFillAlterForSVG(fill, fig);
        }
        // 其他情况
        else {
            if (fill === _text_)
                fig.c(_filter_, "drop-shadow(12345px 0px " + fig.p().c(_color_) + ")");
            else
                fig.c(_filter_, "drop-shadow(12345px 0px " + V_ui_var("--ac-" + fill + "-lg") + ")");

            if (fig.a(_dataFigNum_) !== gUndefined)
                fig.c(_background_, _none_);
        }
    });

    // --------------------
    // 非初始化时执行，避免与 CSS 默认配置冲突
    // 如：@media (prefers-color-scheme: dark) 部分
    if (disposeGrid) {
        // 适配图片网格背景的处理
        $(_img_ + V_attrX(_dataFigGrid_, "line")
            + "," + _img_ + V_attrX(_dataFigGrid_, "block")).e(function () {
            let img = $(this);
            // 先清空所有涉及的样式
            if (darkMode) {
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

            let gridType = img.a(_dataFigGrid_),
                darkInvert = img.a(_dataDarkSrc_) === _invert_;
            // 网络背景
            if (gridType === _line_ || gridType === _block_) {
                if (darkMode && darkInvert)
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
    svg.c(_filter_, _none_);
    // 再针对进行微调
    if (fill === _text_)
        svg.f("path, rect, ellipse, polygon").c(_fill_, svg.p().c(_color_));
    else
        svg.f("path, rect, ellipse, polygon").c(_fill_, V_ui_var("--ac-" + fill.l()));
}

// ==================== 插图导航模块 ==================== //

function FigureNav() {
    let T = this;
    T.ui = $("." + _vFigNav_); // 插图导航主界面
    T.btns = {
        ui : $(_vFigNavBtns_), // 所有导航按钮
        prev : $(_vFigNavBtns_ + ".prev"), // 上一张插图按钮
        next : $(_vFigNavBtns_ + ".next"), // 下一张插图按钮
        close : $(".v-btn-close-figure-nav"), // 关闭按钮
    };
    T.content = $("." + _vFigContent_); // 显示插图内容的控件
    T.figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

    V_ui_addAnimate(T.content.ch(_img_ + ", " + _svg_));

    // 绑定各按钮事件
    T.btns.prev.uC().ck(function () {
        T.prevFig();
    });
    T.btns.next.uC().ck(function () {
        T.nextFig();
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
                $(this).c(_transform_, "translateY(-2px)");
            }, function () {
                $(this).c(_transform_, _none_);
            });
            // 鼠标键按下事件，模拟 :active
            T.btns.ui.on(_mouseDown_, function () {
                $(this).c(_transform_, _none_);
            });
            // 鼠标键释放事件，模拟恢复正常
            T.btns.ui.on(_mouseUp_, function () {
                $(this).c(_transform_, "translateY(-2px)");
            });
        }
    }

    /**
     * 是否已显示
     * @returns boolean
     */
    T.isShowed = function () {
        return T.ui.c(_display_) !== _none_;
    }

    /**
     * 显示插图导航
     */
    T.show = function (fig) {
        if (V_doc_counter_figure === 0)
            return;

        V_doc_scroll_freeze();
        V_doc_block = gTrue;

        if (fig == null)
            fig = $(V_attrX(_dataFigNum_, T.figNum));

        // 在插图导航中显示对应插图
        T.figNum = JS_parseInt(fig.a(_dataFigNum_));

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
        let fig = $(V_attrX(_dataFigNum_, T.figNum));
        T.content.empty();
        T.content.show();
        T.content.c(_width_, $(window).w())
            .c(_height_, $(window).h());

        let newFig = fig.clone();
        newFig.c(_maxWidth_, $(window).w() - 80)
            .c(_maxHeight_, $(window).h() - 50)
            .c(_borderRadius_, _varVRB_);
        JQ_addClass(newFig, "v-interactive");
        V_ui_hide(newFig);

        // 添加鼠标移入/移出事件
        V_ui_bindHover(newFig);

        // 添加鼠标点击事件
        newFig.uC().ck(function () {
            // 跳转到对应位置
            V_util_gotoHash("#" + _vkIdFig_ + T.figNum);
            T.hide();
        });

        T.content.ap(newFig);
        V_ui_show(newFig);
    }

    /**
     * 查看上一个插图
     */
    T.prevFig = function () {
        if (T.figNum > 1) {
            T.figNum--;
            T.display();
            T.updateUI();
        }
    }

    /**
     * 查看下一个插图
     */
    T.nextFig = function () {
        if (T.figNum < V_doc_counter_figure) {
            T.figNum++;
            T.display();
            T.updateUI();
        }
    }

    /**
     * 更新插图导航界面
     */
    T.updateUI = function () {
        let pageNum = $("." + _vFigNav_ + "-title");

        pageNum.hm(V_ui_span("v-fig-page-num", _, T.figNum + "/" + V_doc_counter_figure)
            + ___ + $("#" + _vkIdFig_ + T.figNum + ">" + _vCap1_).t());

        // 更新导航按钮位置
        T.btns.prev.c(_top_, (T.ui.h() - T.btns.prev.h()) / 2);
        T.btns.next.c(_top_, T.btns.prev.c(_top_));

        // 根据当前插图索引更新浏览按钮有效状态
        T.btns.prev.c(_opacity_, "0");
        T.btns.next.c(_opacity_, "0");
        if (T.figNum > 1) {
            T.btns.prev.c(_opacity_, "1");
        }
        if (T.figNum < V_doc_counter_figure) {
            T.btns.next.c(_opacity_, "1");
        }
    }

    /**
     * 处理热键操作
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (code, combKeys, event) {
        if (iFigNav.ui.isHidden())
            return;

        let handled = false;
        switch (code) {
            case 188: // .
            case 37: // ←
                T.prevFig();
                handled = true;
                break;
            case 190: // ,
            case 39: // →
                T.nextFig();
                handled = true;
                break;
            case 27: // ESC
                if (T.isShowed()) {
                    T.hide();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        if (handled)
            event.preventDefault();
    }
}

// ==================== Mermaid - 脑图交互类 ==================== //

function mmMindmap_init() {
    // to-do: 新特性，未完成
    let rootIndex = 0,
        sectionGroup = "";
    $(_svg_ + '[aria-roledescription="mindmap"]>.mindmap-nodes>.mindmap-node').e(function () {
        let _t = $(this);
        if (rootIndex > 0) {
            // if (sectionGroup !== _t.a(_class_)) {
                // sectionGroup = _t.a(_class_);
                _t.uC().ck(function () {
                    mmMindmapToggleNode($(this));
                });
            // }
            // else {
                _t.c(_visibility_, _hidden_);
            // }
        }
        else {
            _t.uC().ck(function () {
                mmMindmapToggleRoot($(this));
            });
        }
        rootIndex++;
    });

    $(_svg_ + '[aria-roledescription="mindmap"]>.mindmap-edges>.edge').e(function () {
        let _t = $(this);
        // if (_t.a(_class_).i("edge-depth-0") === -1)
            _t.c(_visibility_, _hidden_);
    });
}

function mmMindmapToggleRoot(node) {
}

function mmMindmapToggleNode(node) {
    let c = node.a(_class_),
        si = c.i("section-"),
        secNum = 0;
    if (si > -1) {
        secNum = c.substring(si + 8, c.length);
        if (secNum.isNumber()) {
            $(_svg_ + '[aria-roledescription="mindmap"]>.mindmap-nodes>.section-' + secNum).e(function () {
                let _t = $(this);
                _t.c(_visibility_, _visible_);
            });

            $(_svg_ + '[aria-roledescription="mindmap"]>.mindmap-edges>.section-edge-' + secNum).e(function () {
                let _t = $(this);
                _t.c(_visibility_, _visible_);
            });
        }
    }
}

// ==================== 样式重制类 ==================== //

/**
 * 调整任务清单复选框的样式
 */
function Restyler_forTaskList() {
    // 遍历所有正文下的无序列表
    // $(`:is(${_write_},${_blockquote_},${_details_})>ul`).e(function () {
    //     // 遍历所有含 checkbox 组件的无序列表项
    //     $(this).f(".md-task-list-item " + _input_ + "[type='" + _checkbox_ + "']").e(function () {
    //         let li = $(this).p();
    //         // 遍历其下级无序列表
    //         li.ch("ul").e(function () {
    //             let chkIndex = 0,
    //                 doing = gFalse;

    //             // 遍历下级无序列表的所有一级子元素内 checkbox 的 checked 状态
    //             $(this).ch("li").e(function () {
    //                 // 只对有两个或以上的 checkbox 子元素，因为只有 1 个 checkbox 是无法判断是否为不确定选择
    //                 ERROR(111, $(this).t());
    //                 ERROR(222, chkIndex > 0 && $(this).f(_input_).a(_checked_));
    //                 if (chkIndex > 0 && $(this).f(_input_).a(_checked_) === gUndefined) {
    //                     doing = gTrue;
    //                     return gFalse;
    //                 }
    //                 chkIndex++;
    //             });

    //             ERROR(333, doing);
    //             // 若下级无序列表的一级子元素中，有任意一个 checkbox 为未完成的，则视为不确定选择
    //             if (doing) {
    //                 ERROR(444, li.ch(_input_)[0].indeterminate);
    //                 li.ch(_input_)[0].indeterminate = gTrue;
    //             }
    //             else if (!doing && chkIndex === 1 && $(this).f(_input_).a(_checked_) === _checked_)
    //                 li.ch(_input_).a(_checked_, gTrue);
    //         });
    //     });
    // });

    // return;

    // 对任务清单的 checkbox 组件转换为 SVG 图标
    $(_write_ + ___ + _input_ + "[type='" + _checkbox_ + "']").e(function () {
        let chkStatus = _no_, // 默认为未完成
            chkStyle = _dark_; // 默认样式

        // 已完成
        let _t =  $(this),
            checked = _t.a(_checked_);
        if (checked !== gUndefined && checked.sW("c")) { // checked
            chkStatus = _yes_;
            chkStyle = _theme_;
        }
        // 部分完成（不确定选择）
        else if (_t[0].indeterminate) {
            chkStatus = _un_;
            // chkStyle = "btn";
        }

        // 替换为 SVG 图标
        _t.bf(V_ui_svgIcon(_icoChkbox__ + chkStatus, 14, 14, chkStyle, "v-svg-input-checkbox"));
        JQ_remove(_t);
    });
}

/**
 * 调整默认的 Mermaid 样式
 */
function Restyler_forMermaid() {
    // ========== ZenUML 图 ==========
    let zenSelector = ".md-diagram-panel>div>svg[aria-roledescription='zenuml']";
    // 调整 ZenUML 尺寸因主题原因导致强制被限制大小的情况
    $(zenSelector).e(function () {
        let target = $(this);
        target.f(".zenuml.bg-skin-canvas").e(function () {
            let zenuml = $(this);
            target.c(_width_, zenuml.w())
                .c(_height_, zenuml.h());
            // 同时修正题注框的宽度、高度
            target.ps(".v-caption").c(_width_, _auto_)
                    .c(_height_, _auto_);
        });
    });
    // to-do: 临时修复方式（多个图标同名渐变色定义冲突）
    // 待 ZenUML 官方修复后可取消
    let idPrefix = "linearGradient-",
        svgIconCount = 0;
    $(zenSelector + " div[alt^='icon']>" + _svg_).e(function () {
        svgIconCount++;
        let svgIcon = $(this),
            idValue = "linearGradient-vk-fixed-" + svgIconCount;
        // 图标渐变色定义 id 更名
        svgIcon.f("defs>linearGradient" + V_attrX(_id_, idPrefix, "^=")).attr("id", idValue);
        // 更新图标渐变色定义 id 值
        svgIcon.f("g[fill^='url(#" + idPrefix + "']").attr("fill", "url(#" + idValue + ")");
    });

    // ========== 时序图 ==========
    let seqSelector = ".md-diagram-panel>div>svg[aria-roledescription='sequence']";
    // 修正顺序图整体的样式
    // $(".md-diagram-panel svg[id^='mermaidChart'][viewBox^='-']").e(function () {
    $(seqSelector).e(function () {
        let target = $(this),
            viewBox = target.a(_viewBox_).sp(/\s+/),
            paddingBottom = (target.c(_paddingBottom_));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.a(_viewBox_,
            viewBox[0] + ___ + viewBox[1] + ___ + viewBox[2] + ___
            + (JS_parseInt(viewBox[3]) + JS_parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        JQ_addClass(target, _vMermaidRestyler_);
    });

    // 更新顺序图中的角色样式
    // $(".md-diagram-panel svg[id^='mermaidChart'] g>rect[class='actor']").e(function () {
    $(seqSelector + " g>rect[class='actor']").e(function () {
        let actor = $(this),
            text = actor.n(_text_).ch(), // actor text object
            tmpText = text.t(),
            prefix = _;
        const front = /@.+/g, // 前端触点角色
            keySys = /^\*\*.+/g, // 重要系统角色
            extSys = /^--.+/g; // 外部系统角色

        // 更新 <前端触点角色> 样式
        if (front.test(tmpText)) {
            let h = actor.h(),
                line = (actor.p().pr(_line_) || actor.pr(_line_));
            actor.a(_rx_, (h - 20) / 2);
            actor.a(_ry_, (h - 20) / 2);
            actor.a("y", JS_parseInt(actor.a("y")) + 10);
            actor.a(_height_, h - 20);
            line.a("y1", JS_parseInt(line.a("y1")) + 10);
            line.a("y2", JS_parseInt(line.a("y2")) - 20);
            JQ_addClass(actor.pr(_line_), "v-actor-front");
            text.t(prefix + tmpText.s(1, tmpText.length));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText)) {
            JQ_addClass(actor, _vActorKeySys_);
            JQ_addClass(actor.pr(_line_), _vActorKeySys_);
            JQ_addClass(actor.nextAll(_text_).ch(), _vActorKeySys_);
            text.t(prefix + tmpText.s(2, tmpText.length));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText)) {
            JQ_addClass(actor, _vActorExtSys_);
            JQ_addClass(actor.nextAll(_text_).ch(), _vActorExtSys_);
            text.t(prefix + tmpText.s(2, tmpText.length));
        }
        else {
            text.t(prefix + tmpText);
        }
    });

    // 更新顺序图中消息序号的样式
    // $(".md-diagram-panel svg[id^='mermaidChart']>text.sequenceNumber").e(function () {
    $(seqSelector + ">text.sequenceNumber").e(function () {
        // 移除文本宽度，避免不同字体大小时显示效果问题
        JQ_removeAttr($(this), _textLength_);
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    // $(".md-diagram-panel svg[id^='mermaidChart'] polygon+.labelText").e(function () {
    $(seqSelector + " polygon+.labelText").e(function () {
        let fragment = $(this),
            g = fragment.p(),
            segType = fragment.t();

        // 默认的样式（par 片断）
        let bgColor = _varMmOrange_,
            borderColor = _varMmOrange_,
            titleColor = _varAcOrangeLg_;
        // 为 alt 片断设置样式
        if (segType === _alt_) {
            bgColor = _varMmRed_;
            borderColor = _varMmRed_;
            titleColor = _varAcRedLg_;
        }
        // 为 loop 片断设置样式
        else if (segType === _loop_) {
            bgColor = _varMmCyan_;
            borderColor = _varMmCyan_;
            titleColor = _varAcCyanLg_;
        }
        // 为 alt、loop、par 片断应用样式设置
        if (segType !== "opt") {
            // 背景色
            g.f("polygon.labelBox").c(_cssText_, _fill_ + ":" + bgColor + _important_);
            // 边框色
            g.f("line.loopLine").c(_cssText_, _stroke_ + ":" + borderColor + _important_);
            // 片断标题颜色
            g.f("text.loopText, text.loopText>tspan").c(_cssText_, _fill_ + ":" + titleColor + _important_);
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (segType === _alt_)
            fragment.t([
                "分支",
                "Alt."
            ][V_lang_id]);
        else if (segType === "opt")
            fragment.t([
                "可选",
                "Opt."
            ][V_lang_id]);
        else if (segType === _loop_)
            fragment.t([
                "循环",
                "Loop."
            ][V_lang_id]);
        else if (segType === "par")
            fragment.t([
                "平行",
                "Par."
            ][V_lang_id]);
    });

    // 调整片断的标题文本
    // $("svg text.loopText>tspan").e(function () {
    $(seqSelector + " text.loopText>tspan").e(function () {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(this);
        fragmentTitle.p().a(_style_, "text-anchor: start");

        // 调整文本的位置
        let label = fragmentTitle.p().p().f(".labelBox"),
            rect = label[0].getBBox();
        fragmentTitle.a("x", rect.x + rect.width + 10);

        let nextText = fragmentTitle.p().n();
        if (nextText !== gUndefined && nextText.a(_class_) !== gUndefined && nextText.a(_class_).i("loopText") > -1) {
            nextText.a("x", rect.x + rect.width + 40);
        }
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态机图节点
    let radius = V_util_getVarVal(_V_R_B_);
    // 针对 VLOOK 顺序图开始、结束节点、子图
    // $("svg .cluster rect").e(function () {
    $(seqSelector + " .cluster rect").e(function () {
        $(this).a(_rx_, radius);
        $(this).a(_ry_, radius);
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
// function RepairTool_scaleTupleByTimes(funcString, rate1, rate2) {
//     let lbIndex = funcString.i("("),
//         dotIndex = funcString.i(","),
//         rbIndex = funcString.i(")");
//
//     // 提取两个参数值
//     let r1 = funcString.s(lbIndex + 1, dotIndex),
//         r2 = funcString.s(dotIndex + 1, rbIndex);
//
//     if (rate1 !== 1) r1 = r1 * rate1;
//     if (rate2 !== 1) r2 = r2 * rate2;
//
//     return funcString.s(0, lbIndex + 1) +
//         r1 + "," + r2 + ")";
// }

// ==================== Sup/Sub Magic 模块 ==================== //

/**
 * 初始化
 */
function SupSubMagic_preprocess() {
    // ---------- 注音旧语法预处理：^[注音]^ ----------
    // 即将废弃 need to remove
    // 遍历所有 sup
    $("sup").e(function () {
        let _t = $(this),
            text = _t.t(),
            result;
        if ((result = text.m(TextPhonetic_syntaxOld)) != null)
            TextPhonetic_buildForSup(_t, result);
    });

    // ---------- 注音新语法预处理：_^注音^_ ----------
    $("em>sup:only-child").e(function () {
        let _t = $(this),
            result = [];
        result.push(""); // 主结构，在此忽略内容
        result.push(_t.t());
        TextPhonetic_buildForSup(_t.p(), result);
    });

    // ---------- 色号旧语法的预处理：~(色号)~ ----------
    // 即将废弃 need to remove
    // 遍历引用块、详情内的 sub 下标
    $(_write_ + " :is(blockquote, details)>p>sub").e(function () {
    // + _write_ + ">:is(blockquote, details) :is(blockquote, details)>p>sub").e(function () {
        let _t = $(this),
            text = _t.t(),
            colorSet;
        // 颜色标签独占一行的情况下才被视为是对引用块、详情的颜色标识
        // 否则将作为段落或指定格式的颜色标识，另行处理
        if (ExtQuote_isValidColorMark(_t)
            && (colorSet = text.m(Color_syntaxOld)) != null)
                QuoteColoring_build(_t.p().p(), _t, colorSet);
    });

    // 遍历段落内的 sub 下标（针对段落或指定格式）
    $(_write_ + " sub").e(function () {
        let _t = $(this),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntaxOld)) != null) {
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            if (text !== _t.p().t())
                RainbowTextAndCell_build(_t, colorSet);
        }
    });

    // ---------- 色号新语法的预处理：_~色号~_ ----------
    // 引用块、详情的颜色标识
    $(_write_ + " :is(blockquote, details)>p>em:only-child>sub:only-child").e(function () {
        let _t = $(this),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntax)) != null) {
            QuoteColoring_build(_t.p().p().p(), _t.p(), colorSet);
        }
    });

    // 文本着色、段落着色
    $(_write_ + " em>sub:only-child").e(function () {
        let _t = $(this),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntax)) != null) {
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            if (text !== _t.p().p().t())
                RainbowTextAndCell_build(_t.p(), colorSet);
        }
    });

    // 针对 GitHub Style Alert 移除内嵌的着色样式
    $(".md-alert").e(function () {
        let _t = $(this);
        // 取消内嵌的引用块着色、summary、引用块小标题样式
        _t.f(".v-q, summary, strong[class*='title']").e(function () {
            JQ_removeAttr($(this), _class_);
        });
        // 根据浏览器语言更换类型文本
        _t.f(".md-alert-text-note").e(function () {
            $(this).hm(V_ui_svgIcon2(_icoAlertNote_, 16, 16) + ["备注", "Note"][V_lang_id]);
        });
        _t.f(".md-alert-text-tip").e(function () {
            $(this).hm(V_ui_svgIcon2(_icoAlertTip_, 16, 16) + ["提示", "Tip"][V_lang_id]);
        });
        _t.f(".md-alert-text-important").e(function () {
            $(this).hm(V_ui_svgIcon2(_icoAlertImportant_, 16, 16) + ["重要的", "Important"][V_lang_id]);
        });
        _t.f(".md-alert-text-warning").e(function () {
            $(this).hm(V_ui_svgIcon2(_icoAlertWarning_, 16, 16) + ["注意", "Warning"][V_lang_id]);
        });
        _t.f(".md-alert-text-caution").e(function () {
            $(this).hm(V_ui_svgIcon2(_icoAlertCaution_, 16, 16) + ["警告", "Caution"][V_lang_id]);
        });
    });
}

// ==================== Sup/Sub Magic：文本注音模块 ==================== //

// 新语法：^[symbol]^
let TextPhonetic_syntaxOld = /^\[(\S+)]$/; // 旧语法

/**
 * 构建「注音」
 * @param target 源对象
 * @param result 正则表达式匹配后的结果数组
 */
function TextPhonetic_buildForSup(target, result) {
    let symbol = result[1].rA("_", ___),
        symbolCount = symbol.sp(___).length,
        targetPrev = target.pr(),
        prevText = (targetPrev === gUndefined ? _ : targetPrev.t()),
        wordText;

    // 拉丁内容结尾
    if (/(.*)[a-z]$/i.test(prevText))
        wordText = prevText.r(/(.*)(\b\w+\b)/, "$2");
    // 非拉丁内容结尾
    else
        wordText = prevText.s(prevText.length - symbolCount, prevText.length);

    // 生成注音内容
    let rubyHTML = "$1<ruby>" + wordText
        + "<rp>(</rp><rt>" + symbol
        + "</rt><rp>)" + _nbsp_ + "</rp></ruby>";
    targetPrev.hm(targetPrev.hm().r(new RegExp(String.raw`(.*)${wordText}`), rubyHTML));

    // 绑定注音的点击事件
    targetPrev.f("ruby>rt").uC().ck(function (event) {
        TextPhonetic_translation(wordText, symbol, event);
    });
    // 删除预置颜色标识
    JQ_remove(target);
}

/**
 * 释义或翻译
 * @param text 被注音的内容
 * @param symbol 注音
 * @param event 事件对象
 */
function TextPhonetic_translation(text, symbol, event) {
    event.stopPropagation(); // 停止事件冒泡

    // 默认翻译为中文的服务
    let translator = "https://www.bing.com/translator/?from=&to=zh-chs&text=",
        // translator = "https://translate.google.cn/?langpair=auto&sl=auto&op=translate&text=",
        url = translator + encodeURI(text);
    // 若 symbol 为日文假名，则跳转至翻译平台翻译 symbol
    if (/^[\u3040-\u30FF]/.test(symbol))
        url = translator + encodeURI(symbol);
    // 若 text 为中文，则跳转至汉典，翻译 text
    else if (/^[\u4e00-\u9fa5]/.test(text))
        url = "https://www.zdic.net/hans/" + encodeURI(text);

    window.open(url, text);
}

// ==================== Sup/Sub Magic：引用块着色模块 ==================== //

let Quote_defalutColor = "T1!",
    Quote_defalutColor_withoutEm = "T1";

/**
 * 构建引用块着色样式
 * @param quote 所属引用块对象
 * @param colorCode 匹配色号标签的对象
 * @param colorSet 正则表达式匹配后的结果数组
 */
function QuoteColoring_build(quote, colorCode, colorSet) {
    // let quote = colorCode.p().p(),
    //     colorP = colorCode.p(),
    let color = Quote_getColor(colorSet[1]), // 颜色标识
        em = ColorCode_isEm(colorSet) ? " em" : _, // 判断是否指定了强调样式
        tag = V_util_getTagName(quote);

    // <blockquote> 或 <details>
    if (tag.sW("bl") || tag.sW("de")) {
        // 删除预置颜色标识
        JQ_remove(colorCode.p());
        // 删除原始颜色标识后，若其所在行为空，则同时也删除所在行
        // if (colorP.t().x().length === 0)
            // JQ_remove(colorP);
        JQ_addClass(quote, "v-q " + color + em);
        JQ_addClass(quote.f(">p" + _firstChild_ + ">" + _strong_), "title-" + color + em);
        JQ_addClass(quote.f(_summary_), "title-" + color + em);
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function Quote_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return Quote_defalutColor;
    return color.l();
}

// ==================== Sup/Sub Magic：文本着色模块 ==================== //

/**
 * 构建文本着色与单元格样式
 * @param colorCode 颜色标识对象
 * @param colorSet 正则表达式匹配后的结果数组
 */
function RainbowTextAndCell_build(colorCode, colorSet) {
    let color = Badge_getColor(colorSet[1]), // 颜色标识
        tableCellBgMode = ColorCode_isEm(colorSet),
        solid = color.length < 4, // true - 单色，false - 渐变色
        gradientColors = [], // 渐变色标识数组
        renderTarget = colorCode.pr(),
        wholeRendering = gFalse;

    // 颜色标识为第 1 个子元素时，代表是要对整个段落（或单元格）进行着色
    if (!tableCellBgMode
        && renderTarget !== gUndefined && renderTarget.length === 0) {
            renderTarget = colorCode.p();
            wholeRendering = gTrue;
    }

    // 获取目标对象的 HTML 标签名称
    let tagName = V_util_getTagName(renderTarget);

    // 当颜色标识为渐变色配置时，进行拆分渐变色的预处理
    if (!solid)
        gradientColors = V_ui_splitColors(color);

    // 针对整个段落（或单元格）着色模式时
    // 针对里面的 u 和 mark 标签进行独立处理
    if (wholeRendering) {
        __disposeUnderline(renderTarget.f("u"));
        __disposeMark(renderTarget.f(_mark_));
    }

    // 文本着色
    if (!tableCellBgMode) {
        // mark 标签的处理
        if (tagName === _mark_) {
            __disposeMark(renderTarget);
        }
        // mark 以外的标签的处理，如：p u strong span 等
        else {
            __disposeText(renderTarget);
            if (tagName === "u")
                __disposeUnderline(renderTarget);
        }
    }
    // 单元格着色
    else {
        renderTarget = colorCode.p();
        tagName = V_util_getTagName(renderTarget);

        if (tagName === "th" || tagName === "td") {
            __disposeCell(renderTarget);
        }
    }

    // 删除预置颜色标识
    JQ_remove(colorCode);

    /**
     * 处理文本着色
     * @param obj 文本对象
     */
    function __disposeText(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        if (solid) {
            // 针对亮度较高的预置色，选择更深一些的 title 色值
            let title = ColorTooLight.test(color) ? "-title" : _;
            obj.c(_color_, V_ui_var("--ac-" + color + title
                + (color !== "bk" ? "-lg" : _)));
        }
        // 渐变色
        else {
            let span = obj.f(_span_);
            if (span.length === 0) // 无子元素 span 时恢复为 obj
                span = obj;
            if (span !== gUndefined) {
                span.c(_backgroundImage_, _linearGradient_ + "(90deg, "
                    + V_ui_genGradColorCSS(gradientColors, _, "-lg") + ")");
                span.c("background-clip", _text_);
                span.c("-webkit-background-clip", _text_);
                span.c("color", "transparent");
            }
        }

        if (wholeRendering)
            obj.a(_dataRbWholeText_, V_ui_campColor(color));
        else
            obj.a(_dataRbText_, V_ui_campColor(color));
    }

    /**
     * 处理下划线着色
     * @param obj 文本对象
     */
    function __disposeUnderline(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        if (solid) {
            obj.c(_borderColor_, V_ui_var("--ac-" + color
                + (color === "bk" ? _ : "-lg")));
        }
        // 渐变色
        else {
            obj.c(_borderImage_, _linearGradient_ + "(90deg, "
                + V_ui_genGradColorCSS(gradientColors, _, "-lg") + ") 0 0 1 0");
        }
    }

    /**
     * 处理标识着色
     * @param obj 文本对象
     */
    function __disposeMark(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        if (solid) {
            obj.c(_boxShadow_, "0 -.9em 0 0 " + V_ui_var("--ac-" + color + "-fade"
                + (color === "bk" ? _ : "-lg")) + " inset");
        }
        // 渐变色
        else {
            obj.c(_boxShadow_, _none_);
            obj.c(_textShadow_, _none_);
            obj.c(_backgroundImage_, _linearGradient_ + "(90deg, "
                + V_ui_genGradColorCSS(gradientColors, "-fade", "-lg") + ")");
        }
    }

    /**
     * 处理表格单元格着色
     * @param obj 文本对象
     */
    function __disposeCell(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        if (solid) {
            obj.c(_backgroundColor_, V_ui_var("--ac-" + color + "-fade"
                + (color === "bk" ? _ : "-lg" )));
        }
        // 渐变色
        else {
            obj.c(_backgroundImage_, _linearGradient_ + "(135deg, "
                + V_ui_genGradColorCSS(gradientColors, "-fade", "-lg") + ")");
        }
        obj.a(_dataRbCellBg_, V_ui_campColor(color));
    }
}

// ==================== Code Code 模块 ==================== //

let ColorCode = "(r[do]|og|ye|l[am]|g[nyd]|aq|cy|b[unk]|se|vn|p[uk]|[mw]n|ol|t[12])",
    Color_syntax = new RegExp("^\(" + ColorCode + "+)(!)?\$", "i"),
    Color_syntaxOld = new RegExp("^\\((" + ColorCode + "+)(!)?\\)$", "i"),
    Color_syntaxByClass = new RegExp("\\s(" + ColorCode + "+)\\s(em)?", "i"),
    // RainbowColor_syntax = /^\(((r[do]|og|ye|l[am]|g[nyd]|aq|cy|b[unk]|se|vn|p[uk]|[mw]n|ol|t[12])+)(!)?\)$/i,
    ColorTooLight = /ye|lm|aq|la|pk|gd|cy/i; // 属于亮度较高，用于文字显示时须要降低亮度的颜色标识

/**
 * 初始化标签、徽章、刮刮卡的默认颜色标识
 */
function ColorCode_init() {
    // 注：引用块着色的初始化在 ExtQuote 中进行
    let dcTag = V_util_getParamVal("tag"),
        dcBadge = V_util_getParamVal("badge"),
        dcCoating = V_util_getParamVal("coating");
    if (dcTag !== gUndefined)
        Tag_defalutColor = dcTag;
    if (dcBadge !== gUndefined)
        Badge_defalutColor = dcBadge;
    if (dcCoating !== gUndefined)
        Coating_defalutColor = dcCoating;
}

/**
 * （旧色号语法）处理标签、徽章、引用块、刮刮卡指定的颜色
 * need to remove
 * @param target 颜色标识对象
 * @return Array[] 正则表达式匹配的颜色标识数组
 */
function ColorCode_parseOld(target) {
    let tagName = V_util_getTagName(target),
        newColors = null;
    // <sub> 标签
    if (tagName === _sub_
        && (newColors = target.t().m(Color_syntaxOld)) != null) {
            JQ_remove(target);
    }
    return newColors;
}

/**
 * 处理标签、徽章、引用块、刮刮卡指定的颜色
 * @param target 颜色标识对象
 * @return Array[] 正则表达式匹配的颜色标识数组
 */
function ColorCode_parse(target) {
    let tagName = V_util_getTagName(target),
        newColors = null;
    // <sub> 标签
    if (tagName === "em"
        && target.ch("sub:only-child").length > 0
        && (newColors = target.t().m(Color_syntax)) != null) {
            JQ_remove(target);
    }
    return newColors;
}

/**
 * 判断是否为颜色标识的强调风格
 * @param colorSet 颜色标识的正则匹配结果集
 * @return boolean 是否强调
 */
function ColorCode_isEm(colorSet) {
    let em = colorSet[colorSet.length - 1];
    return (em !== gUndefined && em === "!");
}

/**
 * 生成预置颜色标识的 Markdown 格式
 * @param color 颜色标识
 * @param em 强调色标识
 * @param defaultColor 对应场景的默认颜色标识
 */
function ColorCode_genAsMarkdown(color, em, defaultColor) {
    return (color === defaultColor
        ? _
        : "_~" + V_ui_campColor(color) + em + "~_");
}

// ==================== Code Magic 模块 ==================== //

/**
 * 初始化
 */
function CodeMagic_init() {
    // // 初始化标签、徽章、刮刮卡的默认颜色标识
    // // 注：引用块着色的初始化在 ExtQuote 中进行
    // let dcTag = V_util_getParamVal("tag"),
    //     dcBadge = V_util_getParamVal("badge"),
    //     dcCoating = V_util_getParamVal("coating");
    // if (dcTag !== gUndefined)
    //     Tag_defalutColor = dcTag;
    // if (dcBadge !== gUndefined)
    //     Badge_defalutColor = dcBadge;
    // if (dcCoating !== gUndefined)
    //     Coating_defalutColor = dcCoating;

    // 遍历所有 不是 em>code 的范围（包标签、徽章的旧语法）
    let stdCount = 0;
    // $(":not(em):not(strong)>code:only-child").e(function () {
    $(":not(em):not(strong)>code").e(function () {
        let _t = $(this),
            codeText = _t.t(),
            result;
        // // 跳过 em>code
        // if (V_util_getTagName(_t.p()) === "em")
        //     return;
        // 先处理：徽章格式
        if ((result = codeText.m(Badge_syntax)) != null)
            Badge_build(_t, result);
        // 后处理：标签格式
        else if ((result = codeText.m(Tag_syntaxOld)) != null)
            Tag_build(_t, result);
        // 刮刮卡格式
        else if ((result = codeText.m(Coating_syntax)) != null)
            Coating_build(_t, result);
        // 文字注音格式（代码式语法）
        else if ((result = codeText.m(TextPhonetic_syntaxForCode)) != null)
            TextPhonetic_buildForCode(_t, result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else {
            stdCount++;
            JQ_addClass(_t, _vStdCode_ + " id-" + stdCount);
            _t.uC().ck(function (event) {
                if (!_t.is(ContentAssistor_lastTarget))
                    ContentAssistor_toggleCopyMode(gFalse);

                let content = _t.t();
                if (ContentAssistor_copyAsMarkdown)
                    content = "`" + content + "`";
                ContentAssistor_lastTarget = _t;
                Copyer_action(_t, content, gTrue);
            });
        }
    });

    // 处理刮刮卡（新语法）
    $("em>span:first-child+strong:last-child, em>strong:only-child").e(function () {
        let _t = $(this),
            result = [],
            tip = _t.pr();

        // 解包 em
        _t.p().wrap("<span></span>");
        _t.unwrap();

        // 构建兼容旧语法的数据结构
        result.push(""); // 主结构，在此忽略内容
        result.push(tip.length === 0 ? _ : tip.t()); // 提示的内容
        result.push(_t.t()); // 隐藏的内容

        // 生成刮刮卡
        Coating_build(_t.p(), result);
    });

    // 先处理：徽章（新语法）
    $("em>span:first-child+code, em>code:first-child+span:last-child").e(function () {
        let _t = $(this),
            value2 = _t.n(),
            result = [];

        // 解包 em
        _t.p().wrap("<code></code>");
        _t.unwrap();

        let bName = _t.pr().t(),
            bValue = _t.t(),
            bValue2 = _;
        if (V_util_getTagName(_t) === _span_) {
            bValue2 = bValue;
            bValue = bName;
            bName = "";
        }
        else {
            if (value2.length > 0)
                bValue2 = value2.t();
        }
        // ERROR(`'${bName}', '${bValue}' ,'${bValue2}'`);

        // 构建兼容旧语法的数据结构
        result.push(""); // 主结构，在此忽略内容
        // to-do: 未处理无标题的情况
        // result.push(_t.pr().t()); // 徽章标题
        // result.push(_t.t()); // 徽章内容 1
        // if (value2.length > 0) {
        //     result.push("");
        //     result.push(value2.t());
        // }
        result.push(bName); // 徽章标题
        result.push(bValue); // 徽章内容 1
        // 徽章内容 2 的处理
        if (bValue2.length > 0) {
            result.push("");
            result.push(bValue2);
        }

        // 生成徽章
        Badge_build(_t.p(), result);
    });

    // 后处理：标签（新语法）
    $("em>code:only-child").e(function () {
        let _t = $(this),
            codeText = _t.t(),
            result;

        // 解包 em
        _t.unwrap();
        // 解析处理
        if ((result = codeText.m(Tag_syntax)) != null)
            Tag_build(_t, result);
    });
}

// ==================== Code Magic：标签模块 ==================== //

// 语法：#tag#(color)
let Tag_count = 0,
    Tag_syntax = /^(.+)$/i,
    Tag_syntaxOld = /^#(.+)#$/i,
    Tag_defalutColor = "t2"; // theme1

/**
 * 构建单标签样式
 * @param target 目标 code 对象
 * @param result 正则表达式匹配后的结果数组
 */
function Tag_build(target, result) {
    let tag = result[1],
        color = Tag_getColor(),
        em = _; // 强调样式的标识

    Tag_count++;

    // 颜色标识新语法处理
    // 新色号语法：_~色号~_
    let colorSet = ColorCode_parse(target.n());
    // 即将废弃 need to removed
    // 旧色号语法：~(色号)~
    if (colorSet == null)
       colorSet = ColorCode_parseOld(target.n());
    if (colorSet != null) {
        color = Tag_getColor(colorSet[1]);
        em = ColorCode_isEm(colorSet) ? " em" : _;
    }

    // 过滤语法内容
    target.t(tag);
    let solid = color.length < 4,
        gradientColors = [], // 渐变色标识数组
        id = " id-" + Tag_count;
    if (!solid) { // 渐变
        gradientColors = V_ui_splitColors(color);
        target.a(_class_, _vTag_ + ___ + gradientColors[0] + em + id);
        target.c(_cssText_, _backgroundImage_ + ":" + _linearGradient_ + "(90deg, "
            + V_ui_genGradColorCSS(gradientColors, _, "-lg") + ")" + _important_);
    }
    else {
        target.a(_class_, _vTag_ + ___ + color + em + id);
    }

    // 复制标签内容
    target.a(_dataAsMarkdown_, __asMarkdown());
    target.a(_value_, target.t());
    target.uC().ck(function (event) {
        let _t = $(this),
            content = _t.a(_value_);

        if (!_t.is(ContentAssistor_lastTarget))
            ContentAssistor_toggleCopyMode(gFalse);

        if (ContentAssistor_copyAsMarkdown)
            content = target.a(_dataAsMarkdown_);//__asMarkdown();
        ContentAssistor_lastTarget = _t;
        Copyer_action(_t, content, gTrue);
    });

    /**
     * 生成标签的 Markdown 格式
     */
    function __asMarkdown() {
        // 用反引号包裹
        let content = "*" + V_util_wrapBackquote(tag) + "*";
        // 添加预置色号
        if (color !== Badge_defalutColor) {
            content += ColorCode_genAsMarkdown(color,
                (em.length > 0 ? "!" : _),
                Tag_defalutColor);
        }
        return content;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function Tag_getColor(color = gUndefined) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return Tag_defalutColor;
    return color.l();
}

// ==================== Code Magic：徽章模块 ==================== //

// 语法：#badge_name|badge_value|badge_value2#
let Badge_count = 0,
    Badge_syntax = /^#([^|]*)\|([^|]+)(\|([^|]+))?#$/i, // 徽章
    Badge_syntax_variable = /^(.*)({{.+}}|%.+%|\${.+}|#{.+}|\$.+\$|var\(.+\))(.*)$/i, // 变量语法
    Badge_defalutColor = "bk";

/**
 * 构建徽章样式
 * @param target 目标 code 对象
 * @param result 正则表达式匹配后的结果数组
 */
function Badge_build(target, result) {
    let color = Badge_getColor(gUndefined, target), // 颜色标识
        em = _, // 强调样式的标识
        badgeName = result[1],
        badgeValue = result[2],
        badgeValue2 = (result.length > 4) ? result[4] : gUndefined,
        varStr;

    Badge_count++;

    // 颜色标识新语法处理
    // 新色号语法：_~色号~_
    let colorSet = ColorCode_parse(target.n());
    // 即将废弃 need to removed
    // 旧色号语法：~(色号)~
    if (colorSet == null)
       colorSet = ColorCode_parseOld(target.n());
    if (colorSet != null) {
        color = Badge_getColor(colorSet[1], target);
        em = ColorCode_isEm(colorSet) ? " em" : _;
    }

    // ----- 徽章标题
    target.wrap("<code class='" + _vBadgeName_ + ___ + color + " id-" + Badge_count + "'></code>");
    // 复制徽章标题内容
    let badge = $("." + _vBadgeName_ + ".id-" + Badge_count);
    if (badgeName.length > 0)
        badge.pp(V_ui_label("", "", badgeName));
    // 点击事件
    badge.uC().ck(function (event) {
        let _t = $(this),
            content = _t.a(_value_);

        // 激活复制为 Markdown 的判断
        if (!_t.is(ContentAssistor_lastTarget))
            ContentAssistor_toggleCopyMode(gFalse);

        if (ContentAssistor_copyAsMarkdown)
            content = _t.a(_dataAsMarkdown_);//__asMarkdown();
        ContentAssistor_lastTarget = _t;
        Copyer_action(_t, content, gTrue);
    });

    // ----- 徽章内容
    JQ_addClass(target, _vBadgeValue_ + " id-" + Badge_count);
    // 处理含变量的情况
    if ((varStr = badgeValue.m(Badge_syntax_variable)) != null)
        badgeValue = badgeValue.r(varStr[2], V_ui_span("var " + color, _, varStr[2]));
    target.hm(badgeValue);
    // 指定的颜色标识带强调样式
    if (em.length > 0)
        JQ_addClass(target, color);

    // 复制徽章内容
    target.uC().ck(function (event) {
        let _t = $(this),
            value2 = _t.n();
        ERROR(111, _t.t());
        Copyer_action(_t, _t.t()
            + (value2.length > 0 ? ___ + value2.t() : _), // 如果有 value2 的处理
            gFalse);
    });

    // ----- 徽章内容2
    if (badgeValue2 !== gUndefined) {
        target.af(V_ui_span("v-badge-value2 id-" + Badge_count, _, badgeValue2));
        JQ_addClass(target.p(), _hastwo_);
        JQ_addClass(target, _hastwo_);

        target.n().uC().ck(function (event) {
            let _t = $(this);
            Copyer_action(_t, _t.t(), gFalse);
        });
    }

    // 生成 asMarkdown 内容，用于复制
    badge.a(_dataAsMarkdown_, __asMarkdown());
    // 生成普通内容，用于复制
    let nodeCnt = 0,
        plainContent = _;
    badge.contents().e(function () {
        nodeCnt++;
        plainContent += ((nodeCnt > 1) ? " " : _) + $(this).t();
    });
    badge.a(_value_, plainContent);

    /**
     * 生成徽章的 Markdown 格式
     */
    function __asMarkdown() {
        // let content = "#" + badgeName
        //     + "|" + badgeValue
        //     + ((badgeValue2 !== gUndefined) ? "|" + badgeValue2 : _)
        //     + "#";
        let content = "*" + badgeName
            + V_util_wrapBackquote(badgeValue)
            + ((badgeValue2 !== gUndefined) ? badgeValue2 : _) + "*";
        // 添加预置色号
        if (color !== Badge_defalutColor) {
            content += ColorCode_genAsMarkdown(color,
                (em.length > 0 ? "!" : _),
                Badge_defalutColor);
        }
        return content;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @param target 目标 code 对象
 * @returns string 返回有效的的颜色值
 */
function Badge_getColor(color, target = gUndefined) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined) {
        // 针对封面内的徽章（未指定颜色标识）的处理
        if (target !== gUndefined) {
            let p = target.p(),
                tagName = (p !== gUndefined ? V_util_getTagName(p) : gUndefined);
            if (tagName !== gUndefined
                && tagName.l() === _h6_ && p.p().a(_id_) === "write" )
                    return "t2";
        }
        return Badge_defalutColor;
    }
    return color.l();
}

// ==================== 进度条 ==================== //

let Progressbar_count = 0,
    Progressbar_defalutColor = "t1";

/**
 * 进度条初始化
 */
function Progressbar_init() {
    // 处理进度条
    $("strong>mark:only-child").e(function () {
        let _t = $(this).p(),
            value = _t.t();

        // 指定数值时的处理
        if (value.isNumber()) {
            // 解包 mark
            _t.hm(V_ui_label(_, _, _) + value);
            Progressbar_build(_t, value);
        }
        // 指定自动计算时的处理
        else if (value.l() === "?" || value.l() === "？") {
            let taskList = _t.p().n();
            if (taskList.length === 0)
                return;

            let count = taskList.f("li").length,
                doneCount = taskList.f("li.task-list-done").length,
                calcValue = (doneCount / count * 100).toFixed(1);

            if (calcValue >= 100)
                calcValue = 100;
            // 解包 mark
            _t.hm(V_ui_label(_, _, _) + calcValue);
            Progressbar_build(_t, calcValue);
        }
    });
}

/**
 * 构建单标签样式
 * @param target 目标 code 对象
 * @param value 进度值
 */
function Progressbar_build(target, value) {
    // 赋于样式，后续才能获取正常渲染后尺寸信息
    Progressbar_count++;
    JQ_addClass(target, "v-pgbar id-" + Progressbar_count);

    let label = target.ch(_label_),
        width = label.width(),
        outlineWidth = parseInt(label.c(_outlineWidth_)),
        rbTextSet = ["og", "gn", "cy", "bu", "vn", "pu"],
        rbText = target.a(_dataRbText_),
        autoColor = (rbText === gUndefined),
        color = _,
        colorAlt = _,
        // outlineColor = _,
        outlineStyle = "solid";

    // 根据进度值自动适配颜色
    if (autoColor) {
        if (value < 0)
            rbText = "rd";
        else if (value > 100)
            rbText = "ro";
        else if (value === 0)
            rbText = "gy";
        else
            rbText = rbTextSet[Math.floor(value / 20)];
    }
    // 指定固定颜色
    else {
        rbText = Progressbar_getColor(rbText);
    }

    color = "var(--ac-" + rbText + ")";
    colorAlt = "var(--ac-" + rbText + "-a-lg)";
    // outlineColor = color;

    if (autoColor)
        target.c(_color_, color);

    let overValue = value - 100;
    // 大于 100% 的处理
    if (overValue > 0) {
        let overWidth = overValue / 100 * width;
        // 渲染超出部分
        label.c(_boxShadow_, (overWidth + outlineWidth) + "px 0 0 0 " + color);
        label.c(_marginRight_, overWidth + 5);
        // color = colorAlt;
    }
    // 小于 0% 的处理
    else if (value < 0) {
        let overWidth = value / 100 * width;
        // 渲染超出部分
        label.c(_boxShadow_, (overWidth + + outlineWidth) + "px 0 0 0 " + color);
        label.c(_marginLeft_, Math.abs(overWidth));
        color = colorAlt;
        outlineStyle = "dashed";
    }

    // 渲染正常部分
    value = (value > 100) ? 100 : (value < 0 ? 0 : value);
    label.c(_background_, `${_linearGradient_}(90deg, ${color} ${value}%, var(--d-bc) ${value}%, var(--d-bc) 100%)`);
    // label.c(_outline_, `1px ${outlineStyle} ${outlineColor}`);
    label.c(_outlineStyle_, outlineStyle);
    // label.c(_borderColor_, color);
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function Progressbar_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return Progressbar_defalutColor;
    return color.l();
}

// ==================== Code Magic：刮刮卡模块 ==================== //

let coatingCount = 0,
    Coating_syntax = /^\/(.*?)\|(.+)\/$/i, // 语法：/tips|text/
    Coating_defalutColor = "gy";

/**
 * 构建「刮刮卡」
 * @param target 源对象
 * @param result 正则表达式匹配后的结果数组
 */
function Coating_build(target, result) {
    let tip = "••••",
        hiddenText = result[2],
        color = Coating_getColor(gUndefined);

    // 颜色标识新语法处理
    // 新色号语法：_~色号~_
    let colorSet = ColorCode_parse(target.n());
    // 即将废弃 need to removed
    // 旧色号语法：~(色号)~
    if (colorSet == null)
       colorSet = ColorCode_parseOld(target.n());
    if (colorSet != null)
        color = Coating_getColor(colorSet[1]);
    color = V_ui_var("--ac-" + color);// + "-lg");

    // 自定义提示信息
    if (result[1] !== gUndefined && result[1] !== _)
        tip = result[1];

    // 初始化「刮刮卡」数据
    coatingCount++;
    JQ_addClass(target, _vCoating_ + " id-" + coatingCount);
    target.a(_dataCoatingTip_, tip);
    target.a(_dataCoatingHidden_, hiddenText);
    target.a(_dataCoatingShowed_, _false_);
    // target.a(_title_, [
    //     "点击查看有效的原始内容",
    //     "Click to view valid original content"
    //     ][V_lang_id]);
    target.t(tip);
    target.c(_background_, __genCoatingBg(tip.length, color))
        .c(_borderColor_, color);

    // 「刮刮卡」的点击事件
    target.uC().ck(function (event) {
        Coating_toggle($(this), event);
    });

    /**
     * 根据提示信息字数生成条纹背景
     * @param charCount 提示信息字数
     * @param color 条纹背景色
     * @returns string 生成 CSS 规范的背景
     */
    function __genCoatingBg(charCount, color) {
        let count = 16,
            result = _linearGradient_ + "(135deg, ";
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
                c = (i % 2 === 0) ? color : _varDFC_;
            result += c + ___ + start + "%, " + c + ___ + end + "%"; // 分段渐变
            result += (i < count - 1) ? ", " : ")";
        }
        return result;
    }
}

/**
 * 获得获取对应的颜色标识
 * @param color 文档中指定的预置颜色标识
 * @returns string 返回有效的的颜色值
 */
function Coating_getColor(color) {
    // 没有指定颜色，则为默认颜色
    if (color === gUndefined)
        return Coating_defalutColor;
    return color.l();
}

/**
 * 显示 / 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 * @param event 事件对象
 */
function Coating_toggle(target, event) {
    // 如果有拖选的文本，则跳过处理
    if (__getSelectedText() !== _)
        return;

    if (target.a(_dataCoatingShowed_).sW("f")) {
        event.stopPropagation(); // 停止事件冒泡
        Coating_show(target);
    }
    else {
        Coating_hide(target);
    }

    // 获得当前页面拖选的文本
    function __getSelectedText() {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            return document.selection.createRange().text;
        }
        return _;
    }
}

/**
 * 显示「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_show(target) {
    // let tmp = target.t();
    JQ_addClass(target, _opened_);
    // target.c(_color_, target.c(_borderColor_));
    // 显示原始信息
    target.t(target.a(_dataCoatingHidden_));
    // 「刮刮卡」自定义数据
    // target.a(_dataCoatingHidden_, tmp);
    target.a(_dataCoatingShowed_, _true_)
}

/**
 * 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_hide(target) {
    // let tmp = target.t();
    JQ_removeClass(target, _opened_);
    // target.c(_color_, _varDBc_);
    // 显示提示信息
    target.t(target.a(_dataCoatingTip_));
    // 「刮刮卡」自定义数据
    // target.a(_dataCoatingHidden_, tmp);
    target.a(_dataCoatingShowed_, _false_);
}

// ==================== Code Magic：文本注音模块 ==================== //

// 旧语法：{text}(symbol)
let TextPhonetic_syntaxForCode = /^{(.+)}\((.+)\)$/;

/**
 * 构建「注音」（代码式语法）
 * @param target 源对象
 * @param result 正则表达式匹配后的结果数组
 */
function TextPhonetic_buildForCode(target, result) {
    let text = result[1],
        symbol = result[2];
    // 生成注音内容
    target.af("<ruby>" + text
        + "<rp>(</rp><rt>" + symbol
        + "</rt><rp>)" + _nbsp_ + "</rp></ruby>");
    // 绑定注音的点击事件
    target.n().ch("rt").uC().ck(function (event) {
        TextPhonetic_translation(text, symbol, event);
    });
    // 删除预置颜色标识
    JQ_remove(target);
}

// ==================== VLOOK UI 模块 ==================== //

/**
 * 加载欢迎页资源
 */
function VLOOKui_loadWelcomePage() {
    let title = V_util_getDocTitle(),
        date = V_util_getMetaByName("date"),
        author = V_util_getMetaByName("author"),
        defalutContent = (title !== gUndefined ? V_ui_div(_, _, title) : _)
            + (date !== gUndefined ? V_ui_div(_, "v-date", "( " + date + " )") : _)
            + (author !== gUndefined ? V_ui_div(_, "v-author", author) : _),
        metaContent = V_util_getMetaByName("vlook-welcome");

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === gUndefined)
        metaContent = defalutContent;
    metaContent += _br_ + _br_;
    // --------------------------------------------------
    // 欢迎页
    return V_ui_div(_, "v-welcome-page",
            // 文档专属图标
            V_ui_div(_, _vDocLog_ + _light_)
            + V_ui_div(_, _vDocLog_ + _dark_)
            // 欢迎信息
            + V_ui_div(_, "v-tips", metaContent.x())
            // 文档加载进度及进入按钮
            + V_ui_div(_, "v-loading", "Loading...")
        );
    // return ui;
}

/**
 * 加载图标集资源
 */
function VLOOKui_loadIconSet() {
    let ui = '<svg style="display: none;">';
        // SVG 图标集：图标|VLOOK LOGO
    ui += V_ui_symbol(_icoVLOOK_,
            '<path d="M17.15 0c2.382 0 3.245.248 4.116.714a4.856 4.856 0 0 1 2.02 2.02c.466.87.714 1.734.714 4.116v10.3c0 2.382-.248 3.245-.714 4.116a4.856 4.856 0 0 1-2.02 2.02c-.87.466-1.734.714-4.116.714H6.85c-2.382 0-3.245-.248-4.116-.714a4.856 4.856 0 0 1-2.02-2.02C.248 20.396 0 19.532 0 17.15V6.85c0-2.382.248-3.245.714-4.116a4.856 4.856 0 0 1 2.02-2.02C3.604.248 4.468 0 6.85 0h10.3zm-4.935 16.976a.26.26 0 0 0-.334 0l-.956.795a.26.26 0 0 0-.05.345l.956 1.432a.26.26 0 0 0 .434 0l.956-1.432a.26.26 0 0 0-.05-.345zM7.27 9.292a4.34 4.34 0 0 0-4.343 4.336 4.34 4.34 0 0 0 4.343 4.336 4.34 4.34 0 0 0 4.343-4.336A4.34 4.34 0 0 0 7.27 9.292zm9.554 0a4.34 4.34 0 0 0-4.343 4.336 4.34 4.34 0 0 0 4.343 4.336 4.34 4.34 0 0 0 4.343-4.336 4.34 4.34 0 0 0-4.343-4.336zm-9.554 1.3a3.038 3.038 0 0 1 3.04 3.036 3.038 3.038 0 0 1-3.04 3.035 3.038 3.038 0 0 1-3.04-3.035 3.038 3.038 0 0 1 3.04-3.035zm9.554 0a3.038 3.038 0 0 1 3.04 3.036 3.038 3.038 0 0 1-3.04 3.035 3.038 3.038 0 0 1-3.04-3.035 3.038 3.038 0 0 1 3.04-3.035zm2.883-5.174a.652.652 0 0 0-.853-.32l-.013.005-6.795 2.83-6.793-2.83-.014-.006a.65.65 0 1 0-.537 1.185l7.035 2.931.014.006c.097.043.2.06.299.055a.649.649 0 0 0 .293-.055l.014-.006 7.035-2.93.084-.048a.65.65 0 0 0 .23-.817z" fill="#FFF" fill-rule="evenodd"/>')
        // SVG 图标集：图标|导航中心
        + V_ui_symbol(_icoNavCenter_,
            '<path d="M7.087.453a.82.82 0 0 1 1.1-.366L13 2.493V17.2a.8.8 0 0 1-1.158.716L7 15.493V.82a.82.82 0 0 1 .087-.367zm12.755.797a1.5 1.5 0 0 1 .158.67v11.72a3 3 0 0 1-1.658 2.683l-3.184 1.592A.8.8 0 0 1 14 17.199V2.493L17.83.58a1.5 1.5 0 0 1 2.012.67zM5.913.453A.82.82 0 0 1 6 .82v14.673l-3.83 1.915A1.5 1.5 0 0 1 0 16.066V4.348a3 3 0 0 1 1.658-2.684L4.813.087a.82.82 0 0 1 1.1.366zM18.99 1.7a.5.5 0 0 0-.668-.23L15.61 2.79a.5.5 0 0 0-.046.874l2.71 1.693a.5.5 0 0 0 .765-.424V1.918a.5.5 0 0 0-.05-.219z"/>')
        // SVG 图标集：图标|导航中心分段控制|目录索引
        + V_ui_symbol(_icoTocTabCatalog_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 8a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h6zm-9 0a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 7a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 4a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1z"/>')
        + V_ui_symbol(_icoTocTabCatalog_ + __checked_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 10H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zm-9 0H3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 7H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 3H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z"/>')
        // SVG 图标集：图标|导航中心分段控制|插图索引
        + V_ui_symbol(_icoTocTabFigure_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM5.823 7.22a1 1 0 0 1 .288.252l1.821 2.343a1 1 0 0 0 1.34.221l1.567-1.034a1 1 0 0 1 1.331.21l1.188 1.483a.8.8 0 0 1-.624 1.3H3.288a.8.8 0 0 1-.692-1.201l1.86-3.21a1 1 0 0 1 1.367-.364zM10 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>')
        + V_ui_symbol(_icoTocTabFigure_ + __checked_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.823 7.22a1 1 0 0 0-1.367.364l-1.86 3.21a.8.8 0 0 0 .692 1.201h9.446a.8.8 0 0 0 .624-1.3L12.17 9.212a1 1 0 0 0-1.331-.21l-1.567 1.034a1 1 0 0 1-1.34-.221L6.111 7.472a1 1 0 0 0-.288-.252zM10 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>')
        // SVG 图标集：图标|导航中心分段控制|表格索引
        + V_ui_symbol(_icoTocTabTable_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5 11H1v1a2 2 0 0 0 2 2h2v-3zm5 0H6v3h4v-3zm5 0h-4v3h2a2 2 0 0 0 2-2v-1zM5 6H1v4h4V6zm5 0H6v4h4V6zm5 0h-4v4h4V6zM5 2H3a2 2 0 0 0-2 2v1h4V2zm5 0H6v3h4V2zm3 0h-2v3h4V4a2 2 0 0 0-2-2z" fill-rule="nonzero"/>')
        + V_ui_symbol(_icoTocTabTable_ + __checked_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M16 11v1a3 3 0 0 1-3 3h-1v-4h4zM4 11v4H3a3 3 0 0 1-3-3v-1h4zm7 0v4H5v-4h6zm0-5v4H5V6h6zm5 0v4h-4V6h4zm-5-5v4H5V1h6zm2 0a3 3 0 0 1 3 3v1h-4V1h1zM4 1v4H0V4a3 3 0 0 1 3-3h1zM0 6h4v4H0V6z" fill-rule="nonzero"/>')
        // SVG 图标集：图标|导航中心分段控制|多媒体索引
        + V_ui_symbol(_icoTocTabMedia_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm-1 1.001H4v12h8v-12zM3 11H1v1a2 2 0 0 0 2 2v-3zm12 0h-2v3l.15-.005A2 2 0 0 0 15 12v-1zM3.002 6h-2v4h2V6zm11.997 0h-2v4h2V6zM3 2a2 2 0 0 0-2 2v1h2zm10 0v3h2V4a2 2 0 0 0-2-2zm-2.936 6.655L7.259 10.62A.8.8 0 0 1 6 9.963V6.037a.8.8 0 0 1 1.259-.656l2.805 1.964a.8.8 0 0 1 0 1.31z" fill-rule="nonzero"/>')
        + V_ui_symbol(_icoTocTabMedia_ + __checked_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M16 11v1a3 3 0 0 1-3 3v-4h3zM3 11v4a3 3 0 0 1-3-3v-1h3zm9-10v14H4V1h8zM6.8 5.237a.8.8 0 0 0-.8.8v3.926a.8.8 0 0 0 1.259.656l2.805-1.964a.8.8 0 0 0 0-1.31L7.259 5.38a.8.8 0 0 0-.459-.144zM16 6v4h-3V6h3zM3 6v4H0V6h3zm10-5a3 3 0 0 1 3 3v1h-3V1zM3 1v4H0V4a3 3 0 0 1 3-3z" fill-rule="nonzero"/>')
        // SVG 图标集：图标|导航中心分段控制|代码块索引
        + V_ui_symbol(_icoTocTabCodeblock_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6.555 4.168a1 1 0 0 1 .277 1.387L5.201 7.999l1.631 2.446a1 1 0 0 1-.184 1.317l-.093.07a1 1 0 0 1-1.387-.277L3.353 8.832a1.5 1.5 0 0 1 0-1.664l1.815-2.723a1 1 0 0 1 1.387-.277zm2.89 0a1 1 0 0 1 1.387.277l1.815 2.723a1.5 1.5 0 0 1 0 1.664l-1.815 2.723a1 1 0 0 1-1.387.277l-.093-.07a1 1 0 0 1-.184-1.317L10.799 8 9.168 5.555a1 1 0 0 1 .277-1.387z" fill-rule="nonzero"/>')
        + V_ui_symbol(_icoTocTabCodeblock_ + __checked_,
            '<path fill="none" d="M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.454 4.168a1 1 0 0 0-1.387.277L2.252 7.168a1.5 1.5 0 0 0 0 1.664l1.815 2.723a1 1 0 0 0 1.387.277l.093-.07a1 1 0 0 0 .184-1.317L4.101 8l1.63-2.444a1 1 0 0 0-.277-1.387zm4.89 0a1 1 0 0 0-.277 1.387l1.631 2.444-1.631 2.446a1 1 0 0 0 .184 1.317l.093.07a1 1 0 0 0 1.387-.277l1.815-2.723a1.5 1.5 0 0 0 0-1.664l-1.815-2.723a1 1 0 0 0-1.387-.277z" fill-rule="nonzero"/>')
        // SVG 图标集：图标|导航中心分段控制|访问史
        + V_ui_symbol(_icoTocTabHistory_,
            '<path d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1C4.142 1 1 4.142 1 8s3.142 7 7 7 7-3.142 7-7-3.142-7-7-7zm0 1.5a1 1 0 0 1 1 1v4.45l2.164 1.25a1 1 0 0 1-1 1.732l-2.598-1.5a1 1 0 0 1-.237-.19A1 1 0 0 1 7 8.5v-5a1 1 0 0 1 1-1z"/>')
        + V_ui_symbol(_icoTocTabHistory_ + __checked_,
            '<path d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 3.5a1 1 0 0 0-1 1v5c0 .294.127.56.33.742a.979.979 0 0 0 .236.19l2.598 1.5a1 1 0 0 0 1-1.732L9 8.95V4.5a1 1 0 0 0-.883-.993z" fill-rule="nonzero"/>')
        // SVG 图标集：图标|检索
        + V_ui_symbol(_icoRetrieval_,
            '<path d="M14.999 14.596a1.375 1.375 0 0 1-1.953 0L11.46 12.94a6.372 6.372 0 0 1-3.466 1.032c-3.559 0-6.444-2.904-6.444-6.486S4.435 1 7.994 1c3.56 0 6.445 2.904 6.445 6.486a6.47 6.47 0 0 1-1.026 3.488l1.586 1.656c.54.543.54 1.423 0 1.966zM7.993 2.32c-2.834 0-5.132 2.313-5.132 5.166s2.298 5.165 5.132 5.165c2.835 0 5.133-2.312 5.133-5.165s-2.298-5.166-5.133-5.166z"/>')
        // SVG 图标集：图标|向左关闭
        // + V_ui_symbol("icoCloseTo-left",
        + V_ui_symbol(_icoMaskCloser_,
            '<path d="M13.98.176l.035.013c1.506.534 2.311 2.123 1.86 3.607L6.21 30l9.61 26.04c.546 1.475-.186 3.097-1.64 3.707l-.2.077c-1.502.532-3.154-.18-3.781-1.597l-.065-.16L.315 31.916a5.987 5.987 0 0 1 0-3.832l9.818-26.151C10.702.41 12.422-.375 13.979.176z"/>')
        // SVG 图标集：图标|插图导航的上一张
        + V_ui_symbol(_icoPrevFig_,
            '<path d="M11.03.091c.765.284 1.159 1.147.88 1.927L3.002 27l8.91 24.982a1.516 1.516 0 0 1-.75 1.87l-.13.057a1.462 1.462 0 0 1-1.834-.765l-.055-.134L.12 27.705C.112 27.685 0 27.435 0 27c0-.435.111-.684.12-.706L9.141.99A1.465 1.465 0 0 1 11.03.09z"/>')
        // SVG 图标集：图标|逐章导航的上一章'
        + V_ui_symbol(_icoPrevChapter_,
            '<path d="M7.364.293a1 1 0 0 1 0 1.414l-4.97 4.969 4.974 4.974a1 1 0 0 1-1.415 1.414L.296 7.407a.996.996 0 0 1-.291-.658.995.995 0 0 1 .288-.8L5.95.294a1 1 0 0 1 1.414 0z"/>')
        // SVG 图标集：图标|已收起的 目录节点
        + V_ui_symbol(_icoTocFolded_,
            '<path d="M11.614 8.72L7.37 12.961a1 1 0 0 1-1.414-1.414l3.542-3.543-3.542-3.543A1 1 0 1 1 7.37 3.048l4.243 4.243a.997.997 0 0 1 .293.707v.014a.997.997 0 0 1-.293.707z"/>')
        // SVG 图标集：图标|已收起的 引用块折叠 / 表格折叠行节点
        + V_ui_symbol(_icoFolded_,
            '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm-.336 3.757A1 1 0 1 0 6.25 5.172l2.835 2.835-2.835 2.836a1 1 0 1 0 1.414 1.414l3.535-3.536a.997.997 0 0 0 .293-.707V8a.997.997 0 0 0-.293-.707z"/>')
        // SVG 图标集：图标|关闭
        + V_ui_symbol(_icoClose_,
            '<path d="M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "></path>')
        // SVG 图标集：图标|清空输入
        + V_ui_symbol(_icoResetInput_,
            '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM5.737 4.606a.8.8 0 0 0-1.131 1.131L6.869 8l-2.263 2.263a.8.8 0 1 0 1.131 1.131L8 9.131l2.263 2.263a.8.8 0 1 0 1.131-1.131L9.131 8l2.263-2.263a.8.8 0 1 0-1.131-1.131L8 6.869z"/>')
        // SVG 图标集：图标|颜色模式（Light/Dark）
        + V_ui_symbol(_icoLightMode_,
            '<path d="M10 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414zm-11.314 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM10 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm9 4a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zM2 9a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h1zm15.071-6.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-12.728 0l.707.707A1 1 0 1 1 3.636 5.05l-.707-.707A1 1 0 0 1 4.343 2.93zM10 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"/>')
        // SVG 图标集：图标|深色模式
        + V_ui_symbol(_icoDarkMode_,
            '<path d="M5.646 2.646A9.003 9.003 0 0 0 9 20a9.003 9.003 0 0 0 8.354-5.646A9 9 0 0 1 5.613 2.729zM15.5 3l-1.065 2.7a1.303 1.303 0 0 1-.734.735L11 7.5l2.7 1.065c.337.133.602.398.735.734L15.5 12l1.065-2.7c.133-.337.398-.602.734-.735L20 7.5l-2.7-1.065a1.303 1.303 0 0 1-.735-.734L15.5 3zm-4.829-3l-.547 1.389a1 1 0 0 1-.564.563L8.171 2.5l1.39.548a1 1 0 0 1 .563.563L10.67 5l.548-1.389a1 1 0 0 1 .563-.563l1.39-.548-1.39-.548a1 1 0 0 1-.563-.563L10.671 0z"/>')
        // SVG 图标集：图标|聚光灯
        + V_ui_symbol(_icoSpotlight_,
            '<path d="M7 0a7 7 0 0 1 6.992 6.67A7.002 7.002 0 0 1 11 20a7 7 0 0 1-6.992-6.67A7.002 7.002 0 0 1 7 0zm4 6a7 7 0 0 0-6.992 7.33 7 7 0 0 0 9.985-6.662A6.984 6.984 0 0 0 11 6.001z"/>')
        // SVG 图标集：图标|激光笔
        + V_ui_symbol(_icoLaserPointer_,
            '<path d="M5.574 5.078a3.5 3.5 0 0 1 4.913.603l6.772 8.668a3.5 3.5 0 1 1-5.516 4.31L4.971 9.991a3.5 3.5 0 0 1 .603-4.913zm.576.769a2.5 2.5 0 1 0 3.078 3.94 2.5 2.5 0 0 0-3.078-3.94zm6.562-3.138a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 1 1-1.231-1.576l.788-.616zm-10.5 8a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 0 1-1.231-1.576l.788-.616zm-1.177-4.68l1 .034a1 1 0 0 1-.07 1.999l-1-.035a1 1 0 0 1 .07-1.999zM8.838.021a1 1 0 0 1 .77 1.186l-.208.978a1 1 0 0 1-1.956-.416l.208-.978a1 1 0 0 1 1.186-.77zM2.724 1.409a1 1 0 0 1 1.403.172l.616.788a1 1 0 0 1-1.576 1.232l-.616-.788a1 1 0 0 1 .173-1.404z"/>')
        // SVG 图标集：图标|段落导航
        + V_ui_symbol(_icoParagraphNav_,
            '<path d="M3.698 17.714v-5.036A.68.68 0 0 0 3.02 12a.68.68 0 0 0-.678.678v5.047L1.155 16.54a.689.689 0 0 0-.96 0c-.26.26-.26.69 0 .96l2.294 2.294a.67.67 0 0 0 .474.204h.068a.65.65 0 0 0 .475-.204L5.799 17.5c.26-.26.26-.689 0-.96-.237-.271-.666-.271-.926 0l-1.175 1.175zm0-15.432V7.32a.68.68 0 0 1-.678.678.68.68 0 0 1-.678-.678l.03-5.082-1.217 1.22c-.26.26-.689.26-.96 0a.689.689 0 0 1 0-.96L2.489.203A.67.67 0 0 1 2.963 0h.068c.17 0 .35.068.475.203l2.293 2.294c.26.26.26.69 0 .96-.237.272-.666.272-.926 0L3.698 2.283zM8 14h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3h8a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 7h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-6h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2z"/>')
        // SVG 图标集：图标|字体风格
        + V_ui_symbol(_icoFontTheme_,
            '<path d="M13.493 0l6.048 2.73a.5.5 0 0 1 .28.57l-.979 4.134a1 1 0 0 1-1.224.737l-1.092-.283.391 9.065a1 1 0 0 1-.999 1.043H3.94a1 1 0 0 1-1-1.04l.369-9.068-1.092.283a1 1 0 0 1-1.224-.737L.013 3.3a.5.5 0 0 1 .281-.57L6.341 0c.417 1.178 1.926 1.92 3.603 1.92 1.677 0 3.131-.742 3.55-1.92zm.84 15h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zm0-2h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zM9.49 4a1 1 0 0 0-.904.573L5.51 11.08a.644.644 0 0 0 .582.919h.379a1 1 0 0 0 .907-.578l.604-1.299h3.703l.566 1.28a1 1 0 0 0 .914.597h.39a.659.659 0 0 0 .596-.941L11.069 4.57A1 1 0 0 0 10.166 4zm.343 1.813l1.308 2.967H8.55l1.282-2.967z"/>')
        // SVG 图标集：图标|文库
        + V_ui_symbol(_icoDocLib_,
            '<path d="M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm.001 7h-14a2 2 0 0 0-2 2h6a3 3 0 0 0 6 0h6l-.005-.15A2 2 0 0 0 17 7zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 4zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 1z"/>')
        // SVG 图标集：图标|文库-新标签中打开
        + V_ui_symbol(_icoDocLibExt_,
            '<path d="M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm.002 2H11a1 1 0 0 0 0 2h3.585l-6.292 6.293a1 1 0 1 0 1.414 1.414L16 5.414V9a1 1 0 1 0 2 0L18 3c0-.017 0-.033-.003-.059v-.012a.999.999 0 0 0-.487-.789l-.023-.013-.047-.025a.995.995 0 0 0-.023-.011l-.014-.006-.025-.011a.993.993 0 0 0-.073-.027l-.014-.004-.017-.005a.993.993 0 0 0-.079-.019l-.02-.003-.017-.004A1.007 1.007 0 0 0 17.002 2h.02-.02z"/>')
        // SVG 图标集：图标|打开详情
        + V_ui_symbol(_icoDetailsOpen_,
            '<path d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm1 3H8v5H3v2h5v5h2v-5h5V8h-5V3z"/>')
        // SVG 图标集：图标|打印
        + V_ui_symbol(_icoPrint_,
            '<path d="M15 0a2 2 0 0 1 2 2v4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V2a2 2 0 0 1 2-2h10zm1 13H4v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4zm-2 2v1H6v-1h8zm3.5-7h-1a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-3.372 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM15 1H5a1 1 0 0 0-1 1v4h12V2a1 1 0 0 0-.883-.993L15 1z"/>')
        // SVG 图标集：图标|内容助力-插图浏览器中打开
        + V_ui_symbol(_icoOpenInFigureNav_,
            '<path d="M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zm0 6.507l-.117.007a1 1 0 0 0-.883.993V10L9 10a1 1 0 0 0 0 2h3.5a1.5 1.5 0 0 0 1.5-1.5V7.507a1 1 0 0 0-1-1zM6.98 2.004H3.5a1.5 1.5 0 0 0-1.5 1.5v3.062a1 1 0 0 0 1 1l.117-.006A1 1 0 0 0 4 6.566V4.004h2.98a1 1 0 1 0 0-2z"/>')
        // SVG 图标集：图标|内容助力-表格阅读模式（十字光标）
        + V_ui_symbol(_icoTableX_,
            '<path d="M13.6 0A2.4 2.4 0 0 1 16 2.4v9.2a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 11.6V2.4A2.4 2.4 0 0 1 2.4 0h11.2zM11 1H5v4.5A1.5 1.5 0 0 1 3.5 7H1v3h2.5A1.5 1.5 0 0 1 5 11.5V13h6v-1.5a1.5 1.5 0 0 1 1.5-1.5H15V7h-2.5A1.5 1.5 0 0 1 11 5.5V1zM9.5 6A1.5 1.5 0 0 1 11 7.5v2A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-2A1.5 1.5 0 0 1 6.5 6h3zm-.167 1H6.667a.667.667 0 0 0-.66.568L6 7.667v1.666c0 .335.247.612.568.66l.099.007h2.666a.667.667 0 0 0 .66-.568L10 9.333V7.667A.667.667 0 0 0 9.333 7z"/>')
        // SVG 图标集：图标|内容助力-表格自动换行
        + V_ui_symbol(_icoTableWrap_,
            '<path d="M11 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h9zm0 1H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" fill-rule="nonzero"/><path d="M2.5 2H13v1H2.5a.5.5 0 0 1 0-1z" fill-rule="nonzero"/><path d="M13 2h2.5a.5.5 0 1 1 0 1H13V2z"/><path d="M16 6.1v3.4a2.9 2.9 0 0 1-2.9 2.9h-2v-1.8h2a1.1 1.1 0 0 0 1.1-1.1V6.1H16z" fill-rule="nonzero"/><path d="M9.5 11.5c.52-.961.953-1.628 1.3-2 .347-.372.847-.705 1.5-1v6c-.673-.383-1.173-.75-1.5-1.1-.327-.35-.76-.984-1.3-1.9z"/><path d="M7 7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5zm-2.5 6h-2a.5.5 0 1 0 0 1h2a.5.5 0 1 0 0-1zm2-2h-4a.5.5 0 1 0 0 1h4a.5.5 0 1 0 0-1zm0-2h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" fill-rule="nonzero"/>')
        // SVG 图标集：图标|内容助力-画中画
        + V_ui_symbol(_icoPicInPic_,
            '<path d="M0 4.238l1 .966V11a2 2 0 0 0 1.85 1.995L3 13h4v1H3a3 3 0 0 1-3-3V4.238zM14 0a3 3 0 0 1 3 3v4h-1V3a2 2 0 0 0-1.85-1.995L14 1H5.283L4.247 0H14zm2 9a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h5zM2.121.707l3.086 3.086L7 2v5H2l1.793-1.793L.707 2.121A1 1 0 1 1 2.121.707z"/>')
        // SVG 图标集：图标|画中画的放大模式
        + V_ui_symbol(_icoZoomIn_,
            '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4 7.503l-.117.007a1 1 0 0 0-.883.993v2.492H8.4a1 1 0 0 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V8.504a1 1 0 0 0-1-1zM7.58 3H4.5A1.5 1.5 0 0 0 3 4.5v3.062a1 1 0 0 0 1 1l.117-.007A1 1 0 0 0 5 7.562V5h2.58a1 1 0 1 0 0-2z"/>')
        // SVG 图标集：图标|内容助力-画中画的缩小模式
        + V_ui_symbol(_icoZoomOut_,
            '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4.58 8H9.5A1.5 1.5 0 0 0 8 9.5v3.062a1 1 0 0 0 1 1l.117-.007a1 1 0 0 0 .883-.993V10h2.58a1 1 0 1 0 0-2zM7 2.503l-.117.007A1 1 0 0 0 6 3.503v2.492H3.4a1 1 0 1 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V3.504a1 1 0 0 0-1-1z" fill-rule="evenodd"/>')
        // SVG 图标集：图标|复制
        + V_ui_symbol(_icoCopy_,
            '<path d="M14 0a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h8zm-4 3H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-4.5 9a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1h2zm3-3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm0-3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z"/>')
        // SVG 图标集：图标|复制 as Markdown
        + V_ui_symbol(_icoCopyAsMd_,
            '<path d="M14 0a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h8zm-4 3H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm4.3 3h-1.6v2.5H11l2.5 2.5L16 8.5h-1.7V6zM4.548 6l1.549 1.838L7.645 6h1.549v5H7.645V8.132L6.097 9.971 4.548 8.132V11H3V6h1.548z"/>')
        // SVG 图标集：图标|加载中
        + V_ui_symbol(_icoLoading_,
            '<rect x="7" width="2" height="4" rx="1"/><rect transform="rotate(45 12.243 3.757)" x="11.243" y="1.757" width="2" height="4" rx="1"/><rect transform="rotate(90 14 8)" x="13" y="6" width="2" height="4" rx="1"/><rect transform="rotate(135 12.243 12.243)" x="11.243" y="10.243" width="2" height="4" rx="1"/><rect transform="rotate(180 8 14)" x="7" y="12" width="2" height="4" rx="1"/><rect transform="rotate(-135 3.757 12.243)" x="2.757" y="10.243" width="2" height="4" rx="1"/><rect transform="rotate(-90 2 8)" x="1" y="6" width="2" height="4" rx="1"/><rect transform="rotate(-45 3.757 3.757)" x="2.757" y="1.757" width="2" height="4" rx="1"/>')
        // SVG 图标集：图标|播放
        + V_ui_symbol(_icoPlay_,
            '<path d="M14.133 9.605l-7.86 6.028c-.93.633-2.223.427-2.887-.459A1.909 1.909 0 0 1 3 14.028V1.972C3 .882 3.927 0 5.07 0c.432 0 .852.128 1.203.367l7.86 6.028c.93.633 1.146 1.865.481 2.751a2.024 2.024 0 0 1-.481.459z"/><path fill="none" d="M0 0h16v16H0z"/>')
        // SVG 图标集：图标|暂停
        + V_ui_symbol(_icoPause_,
            '<path d="M3 2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 0h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="none" d="M0 0h16v16H0z"/>')
        // SVG 图标集：图标|停止
        + V_ui_symbol(_icoStop_,
            '<rect x="2" y="2" width="12" height="12" rx="2"/><path fill="none" d="M0 0h16v16H0z"/>')
        // SVG 图标集：图标|无法播放
        + V_ui_symbol(_icoForbidden_,
            '<path d="M3.11 4.523a6.001 6.001 0 0 0 8.368 8.367L3.11 4.523zM4.522 3.11l8.368 8.367A6 6 0 0 0 4.522 3.11zM8 16A8.001 8.001 0 1 1 8.002.002 8.001 8.001 0 0 1 8 16z" /><path fill="none" d="M0 0h16v16H0z"/>')
        // SVG 图标集：图标|复选框（未选择）
        + V_ui_symbol(_icoChkbox__ + _no_,
            '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 1H4l-.205.007a2.99 2.99 0 0 0-1.916.872A2.99 2.99 0 0 0 1 4v6l.007.205a2.99 2.99 0 0 0 .872 1.916A2.99 2.99 0 0 0 4 13h6l.205-.007a2.99 2.99 0 0 0 1.916-.872A2.99 2.99 0 0 0 13 10V4l-.007-.205a2.99 2.99 0 0 0-.872-1.916A2.99 2.99 0 0 0 10 1z"/>')
        // SVG 图标集：图标|复选框（已选择）
        + V_ui_symbol(_icoChkbox__ + _yes_,
            '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm.435 3.36a1 1 0 0 0-1.393.245L5.703 8.372 4.421 7.09a1 1 0 1 0-1.414 1.414l2.121 2.121a1 1 0 0 0 1.225.15l.01-.007.01-.005a.997.997 0 0 0 .292-.277l4.015-5.734a1 1 0 0 0-.245-1.393z"/>')
        // SVG 图标集：图标|复选框（不确定选择）
        + V_ui_symbol(_icoChkbox__ + _un_,
            '<path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 6H4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2z" opacity=".3"/><path d="M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 1H4l-.205.007a2.99 2.99 0 0 0-1.916.872A2.99 2.99 0 0 0 1 4v6l.007.205a2.99 2.99 0 0 0 .872 1.916A2.99 2.99 0 0 0 4 13h6l.205-.007a2.99 2.99 0 0 0 1.916-.872A2.99 2.99 0 0 0 13 10V4l-.007-.205a2.99 2.99 0 0 0-.872-1.916A2.99 2.99 0 0 0 10 1z" opacity=".3"/>')
        // SVG 图标集：图标|链接检查结果异常
        + V_ui_symbol(_icoLinkError_,
            '<path d="M8 0c.462 0 .887.24 1.11.626l6.73 11.572c.219.375.213.834-.016 1.204-.228.371-.645.598-1.095.598H1.271c-.45 0-.867-.227-1.095-.598a1.166 1.166 0 0 1-.016-1.204L6.89.626A1.28 1.28 0 0 1 8 0zm0 10.361c-.841 0-1.524.652-1.524 1.456 0 .52.29 1 .762 1.26.472.26 1.052.26 1.524 0 .471-.26.762-.74.762-1.26 0-.804-.683-1.456-1.524-1.456zm0-7.278l-.154.005c-.744.047-1.116.45-1.116 1.208v3.64c0 .808.424 1.212 1.27 1.212l.154-.005c.744-.047 1.116-.45 1.116-1.208V4.296c0-.808-.424-1.213-1.27-1.213z"/>')
        // SVG 图标集：GitHub Style Alert | Note
        + V_ui_symbol(_icoAlertNote_,
            '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm.25 7h-1a.75.75 0 0 0 0 1.5h.25v2h-.25a.75.75 0 1 0 0 1.5h2a.75.75 0 1 0 0-1.5H9V7.75A.75.75 0 0 0 8.25 7zM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>')
        // SVG 图标集：GitHub Style Alert | Tip
        + V_ui_symbol(_icoAlertTip_,
            '<path d="M5.5 0C8.637 0 11 2.31 11 5.25c0 1.516-.701 2.5-1.328 3.259l-.268.319c-.207.245-.383.453-.541.681-.208.3-.33.595-.37.877a.76.76 0 0 1-.773.616L3.2 11a.748.748 0 0 1-.692-.614c-.04-.282-.163-.577-.37-.877a8.456 8.456 0 0 0-.354-.46l-.456-.54-.237-.296C.537 7.496 0 6.577 0 5.25 0 2.31 2.363 0 5.5 0zM3.25 12h4.5a.75.75 0 1 1 0 1.5h-4.5a.75.75 0 1 1 0-1.5zm.25 3.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75z"/>')
        // SVG 图标集：GitHub Style Alert | Important
        + V_ui_symbol(_icoAlertImportant_,
            '<path d="M14.25 0C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25v-9.5C0 .784.784 0 1.75 0h12.5zM8 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.124C7 7.58 7.448 8 8 8s1-.42 1-.938V2.938C9 2.42 8.552 2 8 2z"/>')
        // SVG 图标集：GitHub Style Alert | Warning
        + V_ui_symbol(_icoAlertWarning_,
            '<path d="M9.576.933l6.213 11.471c.296.547.28 1.207-.043 1.739a1.792 1.792 0 0 1-1.533.857H1.787c-.628 0-1.21-.326-1.533-.857a1.744 1.744 0 0 1-.043-1.739L6.424.934c.673-1.245 2.479-1.245 3.152 0zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z"/>')
        // SVG 图标集：GitHub Style Alert | Caution
        + V_ui_symbol(_icoAlertCaution_,
            '<path d="M11 0c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6c0 .199-.08.39-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53L4.47.22C4.61.08 4.801 0 5 0h6zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z"/>')
    + '</svg>';
    return ui;
}

/**
 * 加载顶栏 UI 资源
 */
function VLOOKui_loadTopbar() {
    // ==================================================
    // 页面工具栏
    let ui = V_ui_div(_, _vToolbar_ + " v-focus-serch",
            // 导航中心
            V_ui_div(_, _vBtn_ + " nav-center", V_ui_svgIcon(_icoNavCenter_, 20, 18, _light_))
            // 文库
            + V_ui_div(_, _vBtn_ + " doc-lib", V_ui_svgIcon(_icoDocLib_, 20, 18, _light_))
            // 打印
            + V_ui_div(_, _vBtn_ + " print", V_ui_svgIcon(_icoPrint_, 20, 19, _light_))
            + V_ui_div(_, "v-btn-group prs",
                // 段落导航
                V_ui_div2(_, _vBtn_ + " paragraph-nav", V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoParagraphNav_, 20, 20, _light_))
                // 聚光灯
                + V_ui_div2(_, _vBtn_ + " spotlight", V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoSpotlight_, 18, 20, _light_))
                // 激光笔
                + V_ui_div2(_, _vBtn_ + " laser-pointer", V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoLaserPointer_, 18, 20, _light_))
            )
            // 分隔符
            + V_ui_div(_, _vToolbar_ + "-spliter")
        );

    // ==================================================
    // 逐章导航栏
    let classSvgChpNav = "v-svg-chp-nav";
    ui += V_ui_div(_, _vChapterNav_ + " v-focus-serch",
            // 上一章
            V_ui_div(_, _vChapterNav_ + "-prev",
                V_ui_svgIcon(_icoPrevChapter_, 10, 15, _light_, classSvgChpNav + " left")
                + V_ui_div(_, _vChapterNav_ + "-prev-text")
            )
            // 文档标题
            + V_ui_div(_, _vChapterNav_ + "-doc-title")
            // 当前章节
            + V_ui_div(_, _vChapterNav_ + "-current")
            // 下一章
            + V_ui_div(_, _vChapterNav_ + "-next",
                V_ui_div(_, _vChapterNav_ + "-next-text", "next")
                // + V_ui_genSvgIcon("icoNextChapter", 10, 15, s_Light, classSvgChpNav + " right")
                + V_ui_svgIcon(_icoPrevChapter_, 10, 15, _light_, classSvgChpNav + " right")
            )
        );

    return ui;
}

/**
 * 加载导航中心 UI 资源
 */
function VLOOKui_loadNavCenter() {
    // --------------------------------------------------
    // 导航中心
    let classTocFilterResult = _vTocFilterResult_ + " ",
        ui = V_ui_div(_, "v-nav-center " + _vFloatCard_,
            // --- 导航中心头部 ---
            V_ui_div(_, "v-nav-center-header",
                // 关键字搜索
                V_ui_div(_, "v-serch-by-keyword")
                // 分段控制器组件
                + V_ui_div(_, "v-segment toc")
                // 访问历史标题
                + V_ui_div(_, "v-toc-history-title", "访问历史"))
                // --- 导航中心内容区 ---
                + V_ui_div(_, "v-nav-center-body",
                    V_ui_div2(_, "v-toc-catalog-body", V_attr(_dataCatalogEmpty_, "( Catalog is Empty )"))
                    + V_ui_div(_, classTocFilterResult + _catalog_)
                    + V_ui_div(_, classTocFilterResult + _figure_)
                    + V_ui_div(_, classTocFilterResult + _table_)
                    + V_ui_div(_, classTocFilterResult + _media_)
                    + V_ui_div(_, classTocFilterResult + _codeblock_)
                    + V_ui_div(_, "v-toc-history-result")
                )
            + V_ui_div(_, "v-nav-center-footer")
        );

    // --------------------------------------------------
    // 导航中心收起/展开引导把手
    ui += V_ui_div(_, "v-toc-handle")

    return ui;
 }

/**
 * 加载共用的 UI 资源
 */
function VLOOKui_loadCommon() {
    // --------------------------------------------------
    // 聚光灯
    let ui = V_ui_div(_, "v-spotlight", V_ui_div(_, _));

    // --------------------------------------------------
    // 字体风格选择器
    let classFontThemeOpt = _vFontThemeOpt_,
        previewPath = "https://madmaxchow.gitee.io/vlookres/pic/";
    ui += V_ui_div(_, "v-font-theme",
            V_ui_div(_, classFontThemeOpt,
                V_ui_img(_vFontThemeOpt_ + "-local", "默认 Default", previewPath + "fs-local.png", previewPath + "fs-local@2x.png 2x")
                + V_ui_div(_, _vFontInfo_ + "local",
                    V_ui_div(_, _vFontPackage_, _font_)
                    + V_ui_div(_fontsetStatus_, _, _ready_)
                )
            )
            + V_ui_div(_, classFontThemeOpt,
                V_ui_img(_vFontThemeOpt_ + "-book", "Book", previewPath + "fs-book.png", previewPath + "fs-book@2x.png 2x")
                + V_ui_div(_, _vFontInfo_ + "book",
                    V_ui_div(_, _vFontPackage_, _font_)
                    + V_ui_div(_fontsetStatus_, _, _ready_)
                )
            )
            + V_ui_div(_, classFontThemeOpt,
                V_ui_img(_vFontThemeOpt_ + "-sans", "小清新 Sans", previewPath + "fs-sans.png", previewPath + "fs-sans@2x.png 2x")
                + V_ui_div(_, _vFontInfo_ + "sans",
                    V_ui_div(_, _vFontPackage_, _font_)
                    + V_ui_div(_fontsetStatus_, _, _notLoaded_)
                )
            )
            + V_ui_div(_, classFontThemeOpt,
                V_ui_img(_vFontThemeOpt_ + "-serif", "文艺范 Serif", previewPath + "fs-serif.png", previewPath + "fs-serif@2x.png 2x")
                + V_ui_div(_, _vFontInfo_ + "serif",
                    V_ui_div(_, _vFontPackage_, _font_)
                    + V_ui_div(_fontsetStatus_, _, _notLoaded_)
                )
            )
            + V_ui_div(_, "v-font-theme-info", "Download Font Package")
        );

    // --------------------------------------------------
    // 插图导航面板
    ui += V_ui_div(_, _vFigNav_ + ___ + _vBackdropBlurs_,
            V_ui_div(_, _vFigContent_)
            + V_ui_div(_, _vFigNav_ + "-title")
            + V_ui_div(_, _vFigNav_ + "-btns prev", V_ui_svgIcon(_icoPrevFig_, 12, 54, _light_))
            + V_ui_div(_, _vFigNav_ + "-btns next", V_ui_svgIcon(_icoPrevFig_, 12, 54, _light_))
            + V_ui_div(_, "v-btn-close-figure-nav", V_ui_svgIcon(_icoClose_, 16, 16, _light_))
        );

    // --------------------------------------------------
    // 脚注弹层
    ui += V_ui_div(_, _vFontnotePn_,
            V_ui_div(_, _vFontnotePn_ + "-content")
            + V_ui_div(_, _vFontnotePn_ + "-header")
            + V_ui_div(_, _vFontnotePn_ + "-footer", V_ui_a(_, _, "查看所有脚注"))
            + V_ui_a("vk-footer-area")
        );

    // --------------------------------------------------
    // 复制内容的按钮
    let classBtnAssistor = _vBtn_ + " assistor ";
    ui += V_ui_div(_, "v-content-assistor " + _vFloatCard_,
            V_ui_div(_, classBtnAssistor + "copy", V_ui_svgIcon(_icoCopy_, 16, 16, _light_))
            + V_ui_div(_, classBtnAssistor + "open-in-figure-nav", V_ui_svgIcon(_icoOpenInFigureNav_, 16, 14, _light_))
            + V_ui_div(_, classBtnAssistor + "table-cross", V_ui_svgIcon(_icoTableX_, 16, 14, _light_))
            + V_ui_div(_, classBtnAssistor + "table-wrap", V_ui_svgIcon(_icoTableWrap_, 16, 16, _light_))
            + V_ui_div(_, classBtnAssistor + "pic-in-pic", V_ui_svgIcon(_icoPicInPic_, 18, 16, _light_))
        );

    // --------------------------------------------------
    // 画中画容器
    let classPinBtn = "v-pip-btn zoom-out " + _vFloatCard_ + ___;
    ui += V_ui_div(_, "v-pic-in-pic",
            V_ui_div(_, classPinBtn + "zoom", V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_))
            + V_ui_div(_, classPinBtn + "close", V_ui_svgIcon(_icoResetInput_, 16, 16, _theme_))
            + V_ui_div(_, "v-content")
        );

    // --------------------------------------------------
    // 提示信息
    ui += V_ui_div(_, _vToolTips_)
        + V_ui_div(_, _vInfoTips_ + ___ + _vFloatCard_);

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += V_ui_div(_, _vMoreDocContent_ + "before cover")
        + V_ui_div(_, _vMoreDocContent_ + "after");

    // --------------------------------------------------
    // 表格阅读模式（十字光标）
    let classTableCross = _vTblX_.xD() + ___;
    ui += V_ui_div(_, classTableCross + _left_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _left_ + "-down", _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + "-down", _nbsp_);

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += V_ui_div(_, _vLinkErrorList_ + ___ + _vFloatCard_,
            V_ui_div(_, _vLinkErrorList_ + "-header")
            + V_ui_div(_, _vLinkErrorList_ + "-body",
                V_ui_div(_, _vLinkErrorList_ + "-items"))
            + V_ui_div(_, _vLinkErrorList_ + "-footer")
        )
        + V_ui_div(_, _vStatusBar_ + ___ + _vFloatCard_ + "2 v-focus-serch " + _vBackdropBlurs_,
            V_ui_div(_, _vDocInfo_, "- - / - -")
            + V_ui_div(_, _vStsFontTheme_, V_ui_svgIcon(_icoFontTheme_, 20, 18, _theme_))
            + V_ui_div(_, _vColorScheme_, V_ui_svgIcon(_icoDarkMode_, 20, 20, _theme_))
            + V_ui_div(_, _vLinkChkResult_, V_ui_svgIcon(_icoLoading_, 16, 16, _theme_))
        );

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += V_ui_iframe(_vlookStatGitee_);
    ui += V_ui_div(_, _vDocLib_ + ___ + _vFloatCard_, V_ui_iframe(_vlookDocLib_));
    return ui;
}

// ==================== 加载与初始化 VLOOK ==================== //

/**
 * 文档加载完成后执行主流程
 */
$(function() { // 等价于 $(document).ready()
    // ----------------------------------------
    // 初始化启动参数
    V_params_init();

    // 判断文档类型
    if (V_util_getParamVal("type") === _mini_) {
        V_pageMode = _mini_;
    }

    // ----------------------------------------
    INFO("- Ready");
    gTimes = iStopwatch.ed(_4space_);
    // 打印环境信息
    env.print();

    iStopwatch.st();
    INFO("=== Load VLOOK ===");

    // ----------------------------------------
    // 初始化语言
    V_lang_init();

    // to-do
    // $('meta[content^="${"]').remove();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 动效初始化
    iStopwatch.st("* Effect");
    let effect = V_util_getParamVal(_effect_);
    V_ui_effect = (effect === gUndefined) ? 2 : JS_parseInt(effect);
    V_ui_effect = env.device.mobile ? 0 : V_ui_effect;
    LOG("    └ Level [ " + V_ui_effect + " ]");
    V_ui_initEffectLevel();
    iStopwatch.ed(_cost_);

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.st("* Welcome Page Init");
    let wsMode = V_util_getParamVal("ws");
    wsMode = (wsMode === gUndefined) ? _auto_ : wsMode;
    LOG("    └ mode: " + wsMode);
    WelcomePage_init(wsMode);

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (!V_checkSpec()) {
        $(".v-welcome-page").hide();
        $("." + _vToolbar_).hide();
        $("." + _vBtn_).hide();
        return;
    }
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // 初始化关键组件实例
    iStopwatch.st("* Intance");
    V_init();
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // 获取当前文档的 style 对象
    gStyle = document.styleSheets[0];//$("head").find("style").first().get(0).sheet;
    // $.each(gStyle.cssRules, function(i, rule) {
    //     // 检查是否是要删除的规则
    //     // ERROR(222, rule.selectorText !== gUndefined && rule.selectorText.indexOf("\.expander"));
    //     if (rule.selectorText !== gUndefined && rule.selectorText.indexOf("\.expander\.id-") > 0) {
    //         ERROR(111, rule.selectorText);
    //         // sheet.deleteRule(i);
    //         // 如果只希望删除第一个匹配的规则，可以使用 return false; 来跳出循环
    //         // return false;
    //     }
    // });

    // ----------------------------------------
    // 延后加载 VLOOK 插件，避免欢迎页的 UI 刷新阻塞
    // 独立线程进行处理
    setTimeout(loadVLOOKplugin, 100);
});

/**
 * 字体加载完成后执行的主流程
 */
document.fonts.ready.then(function () {
    // 字体加载完成后的逻辑
    LOG("!!! ALL FONT READY !!!");
});

/**
 * 加载 VLOOK UI 资源
 */
function loadVLOOKui() {
    $(".v-vlook-inside").af(VLOOKui_loadWelcomePage()
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
    if (!env.browser.Chrome && !env.browser.Edge && !env.browser.Firefox && !env.browser.Safari && !env.core.webkit) {
        ALERT([
            "为获得最佳兼容性，建议使用 Chrome / Firefox / Edge 浏览器",
            "For best compatibility, it is recommended to use Chrome / Firefox / Edge browser"
        ][V_lang_id]);
    }

    iStopwatch.ed(_4space_);

    // ========================================
    // 初始化 VLOOK 核心模块
    V_initKernel();

    // ----------------------------------------
    // 修改主题默认的圆角风格
    let newRadius = V_util_getParamVal("radius");
    if (newRadius === "small" || newRadius === "big") {
        // 批量修改圆角相关的 CSS 变量为指定的新值
        V_util_changeCssVarSet([
            _V_R_B_,
            _V_R_S_,
            _V_R_T_,
            _V_R_Tag_,
            _V_R_C_
        ], newRadius);
    }
    else if (newRadius === _none_) {
        // 批量修改圆角相关的 CSS 变量为 0
        V_util_changeCssVarSet([
            _V_R_B_,
            _V_R_S_,
            _V_R_T_,
            _V_R_Tag_,
            _V_R_C_
        ]);
    }

    // ----------------------------------------
    // 统一同组的分栏引用块的高度
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
    JQ_addClass(VOM_doc(), "v-load-done v-focus-serch");
    iStopwatch.ed(_4space_);

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
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    __fork("Color Scheme", function () {
        ColorScheme.scheme = V_util_getVarVal(_varColorScheme_).x();
        INFO("    System [ " + ColorScheme.scheme + " ]");
        ColorScheme.init();
        // 判断当前文档是否强制指定了颜色方案
        let colorScheme = V_util_getParamVal("cs");
        if (colorScheme === _light_ || colorScheme === _dark_) {
            INFO("    Force use [ " + colorScheme + " ]");
            ColorScheme.tg(colorScheme);
        }
        // 若系统当前颜色方案是 dark，则强制同步
        else if (ColorScheme.scheme === _dark_)
            ColorScheme.tg(ColorScheme.scheme);
    }, 300);

    // ----------------------------------------
    // 初始化内容助手
    // 须隐藏文档原始内容前执行，避免部分样式失效
    __fork("Content Assistor", function () {
        ContentAssistor_init();
        PicInPic_init();

        // 设置表格阅读模式的开关状态（不指定则默认关闭）
        if (V_util_getParamVal("tr") === _on_)
            TableCross_toggle();
    }, 300);

    // ----------------------------------------
    // URL 带锚点的处理
    __fork("Redirect to Hash", function () {
        let redirect = V_util_redirectTo();
        if (VOM_cover() === gUndefined && !redirect) {
            iNavCenter.catalog.currentHeaderIndex = 0;
            V_ui_adjustAll();
            ExtQuote_uniteColumnsHeight();
        }
    }, 450);

    // ----------------------------------------
    // 字数统计
    __fork("Words count", function () {
        DocInfo_countWord();
    }, 500);
    // }

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.st();
    INFO("* Welcome Page Done (" + WelcomePage_mode + ")");
    WelcomePage_done();
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // VLOOK 加载完成
    gTotalTimes = iStopwatch.stop() - 200;
    INFO("=== !!! MAIN PROCESS DONE !!! ===");
    INFO("TOTAL COST   ⏱ " + gTotalTimes + " ms");
    INFO("    ├ HTML   ⏱ " + gTimes + " ms");
    INFO("    └ VLOOK  ⏱ " + (gTotalTimes - gTimes) + " ms");

    // ----------------------------------------
    // 提交统计数据
    // __fork("Push Stat", function () {
        V_report_submit(gTotalTimes - gTimes);
    // }, 350);

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
            typeof(callback) === _function_ && callback();
            sw.ed(_4space_);
        }, delay);
    }
}
