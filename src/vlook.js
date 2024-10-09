/**************************************
 *
 * VLOOK™ JS - Typora Plugin
 *
 * V26.1
 * 2024-09-24
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * Telegram Channel: t.me/vlook_markdown
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 * https://gitee.com/madmaxchow/VLOOK
 * https://vlook-doc.pages.dev
 *
 *************************************/

let _ = "",
    ___ = " ",
    gVer = "V26.1",
    gThmVer = _,
    gThmName = _,
    gUndefined = undefined,
    gNull = null,
    gTrue = true,
    gFalse = false,
    gTransDuration = 300,
    gScrollEdge = 20,
    gScrollStep = 100,
    gDocument = document,
    gWindow = window,
    gLocation = gWindow.location,
    jq_Document = $(gDocument),
    jq_Window = $(gWindow),
    gWritePaddingRight = 20, // 取值与 base.less 的 @writePaddingRight 保持一致
    // ----------
    iStopwatch = new Stopwatch(), // 初始化计时器
    gTimes = 0,
    gTotalTimes = 0,
    gLastHash = gNull,
    gIsRunning = gTrue,
    gTimer_saveLastPosition = gNull,
    // **********
    // 修改时须同步修改 media.less 中的同名变量
    gSmallScreenWidth = 1270,
    gUnwrapTableScreenWidth = 1439,
    // **********
    gToc = gUndefined, // 文档大纲对象
    gTocContent = gUndefined, // 文档大纲内容
    gStyle = gUndefined, // 文档的 style 对象
    // 以下 _xxx_ 格式变量为字符串
    _100pc_ = "100%",
    _4space_ = ___+___+___+___,
    _absolute_ = "absolute",
    _actived_ = "actived",
    __action_ = "-action",
    _after_ = "after",
    _albb_ = "albb",
    _align_ = "align",
    _alt_ = "alt",
    _alter_ = "alter",
    _alpha_ = "alpha",
    _ariaRoledescription_ = "aria-roledescription",
    _arrow_ = "Arrow",
    _arrowLeft_ = _arrow_ + "Left",
    _arrowRight_ = _arrow_ + "Right",
    _assistor_ = "assistor",
    _audio_ = "audio",
    _animation_ = "animation",
    _auto_ = "auto",
    _autoplay_ = _auto_ + "play",
    _Markdown_ = "Markdown",
    _as_Markdown_ = "as" +___+ _Markdown_,
    _background_ = "background",
    _color_ = "color",
    _backgroundColor_ = _background_ + "-" + _color_,
    _image_ = "image",
    _backgroundImage_ = _background_ + "-" + _image_,
    _before_ = "before",
    _player_ = "player",
    _print_ = "print",
    _beforePrint_ = _before_ + "-" + _print_ + "-",
    _width_ = "width",
    _max_ = "max",
    _maxWidth_ = _max_ + "-" + _width_,
    _beforePrintWidth_ = _beforePrint_ + _width_,
    _beforePrintMaxWidth_ = _beforePrint_ + _maxWidth_,
    __blank_ = "_blank",
    _block_ = "block",
    _quote_ = "quote",
    _blockquote_ = _block_ + _quote_,
    _body_ = "body",
    __body_ = "-" + _body_,
    _bold_ = "bold",
    _book_ = "book",
    _border_ = "border",
    _bottom_ = "bottom",
    _borderBottomWidth_ = _border_ + "-" + _bottom_ + "-" + _width_,
    _left_ = "left",
    _right_ = "right",
    _radius_ = "radius",
    _borderBottomLeftRadius_ = _border_ + "-" + _bottom_ + "-" + _left_ + "-" + _radius_,
    _borderBottomRightRadius_ = _border_ + "-" + _bottom_ + "-" + _right_ + "-" + _radius_,
    _borderColor_ = _border_ + "-" + _color_,
    _borderImage_ = _border_ + "-" + _image_,
    _borderRadius_ = _border_ + "-" + _radius_,
    _borderWidth_ = _border_ + "-" + _width_,
    _borderLeftWidth_ = _border_ + "-" + _left_ + "-" + _width_,
    _top_ = "top",
    _borderTopWidth_ = _border_ + "-" + _top_ + "-" + _width_,
    _scroll_ = "scroll",
    __shadow_ = "-shadow",
    _boxShadow_ = "box" + __shadow_,
    _none_ = "none",
    _boxShadow_None_ = _boxShadow_ + ":" + _none_ + ";",
    _br_ = "<br>",
    _break_ = "break",
    _brightness_ = "brightness",
    _bubble_ = "bubble",
    _btnFc_ = "btn-fc",
    _card_ = "card",
    _catalog_ = "catalog",
    _center_ = "center",
    _cssText_ = "cssText",
    _Chapter_ = "Chapter",
    _check_ = "check",
    _checkbox_ = _check_ + "box",
    _checked_ = _check_ + "ed",
    __checked_ = "-" + _checked_,
    _hash_ = "hash",
    _checkHash_ = _check_ + _hash_,
    _wrap_ = "wrap",
    _unwrap_ = "un" + _wrap_,
    _update_ = "update",
    _chkUpdate_ = "chk-" + _update_,
    _class_ = "class",
    _click_ = "click",
    _close_ = "close",
    _cloudFlare_ = "cloudflare",
    _code_ = "code",
    _codeblock_ = "codeblock",
    __column_ = "-column",
    _colspan_ = "colspan",
    _content_ = "content",
    _controls_ = "controls",
    __control_ = "-control",
    _cursor_ = "cursor",
    __current_ = "-current",
    _cost_ = "    COST ",
    _cover_ = "cover",
    _dark_ = "dark",
    _light_ = "light",
    _darksrc_ = _dark_ + "src",
    _darksrcset_ = _dark_ + "srcset",
    __anchor_ = "-anchor",
    _dataAnchor_ = "d" + __anchor_,
    _dataAsMarkdown_ = "d-as-markdown",
    _document_ = "document",
    _Document_ = "Document",
    _fold_ = "fold",
    _folded_ = _fold_ + "ed",
    _for_ = "for",
    _formula_ = "formula",
    _found_ = "found",
    _dataBeforePrintFolded_ = "d-" + _before_ + "-" + _print_ + "-" + _folded_,
    _gray_ = "gray",
    _group_ = "group",
    _dataBtnGroup_ = "d-btn-" + _group_,
    _count_ = "count",
    _dataCaptionCount_ ="d-cap-" + _count_,
    _toc_ = "toc",
    _dataTocEmpty_ = "d-" + _toc_ + "-empty",
    // _dataCatalogEmpty_ = "d-" + _catalog_ + "-empty",
    _dataCellMerge_ = "d-cell-merge",
    _dataChk_ = "d-chk",
    _text_ = "text",
    __text_ = "-" + _text_,
    _dataClipboardText_ = "data-clipboard" + __text_,
    _dataColspan_ = "d-colspan",
    _dataColumnFmting_ = "d" + __column_ + "-fmting",
    _dataContainer_ = "d-cntr",
    _dataContentExpanded_ = "d-" + _content_ + "-expanded",
    _dataContentFolded_ = "d-" + _content_ + "-" + _folded_,
    _type_ = "type",
    _dataContentType_ = "d-" + _content_ + "-" + _type_,
    _dataDefault_ = "d-default",
    _dataExtend_ = "d-extend",
    _fig_ = "fig",
    _dataFig__ = "d-" + _fig_ + "-",
    _dataFigNum_ = _dataFig__ + "num",
    _dataFigType_ = _dataFig__ + _type_,
    _dataFolded_ = "d-" + _folded_,
    _folder_ = "folder",
    _dataFolder_ = "d-" + _folder_,
    _dataFolderId_ = "d-" + _folder_ + "-id",
    _dataFolding_ = "d-folding",
    _keyword_ = "keyword",
    _dataKeywords_ = "d-" + _keyword_ + "s",
    _dataDarkSrc_ = "d-darksrc",
    _dataDuration_ = "d-duration",
    _dataFigGrid_ = _dataFig__ + "grid",
    _h1_6_ = "h1,h2,h3,h4,h5,h6",
    _dataH1_ = "d-h1",
    _dataHash_ = "d-hash",
    _html_ = "html",
    __header_ = "-header",
    _dataHeaderNum_ = "d" + __header_ + "-num",
    // _history_ = "history",
    // _dataHistory_ = "d-" + _history_,
    __icon_ = "-icon",
    _dataIcon_ = "d" + __icon_,
    _dataIdFigType_ = "d-id-" + _fig_ + "-" + _type_,
    _dataKeywordMatch_ = "d-" + _keyword_ + "-match",
    _dataLong_ = "d-long",
    _dataNode_ = "d-node",
    _page_ = "page",
    _dataPage_ = "d-" + _page_,
    _dataParentFolderId_ = "d-parent-" + _folder_ + "-id",
    _dataPid_ = "d-pid",
    _dataQuoteGroup_ = "d-" + _quote_ + "-" + _group_,
    _dataRef_ = "data-ref",
    _dataRbCellBg_ = "d-rb-cell-bg",
    _dataRbText_ = "d-rb" + __text_,
    _dataRbWholeText_ = "d-rb-whole" + __text_,
    _dataRow__ = "d-row-",
    _dataRowFolded_ = _dataRow__ + _folded_,
    __mode_ = "-mode",
    _open_ = "open",
    _dataRowOpenMode_ = _dataRow__ + _open_ + __mode_,
    _dataSrc_ = "d-src-",
    _dataSrcDark_ = _dataSrc_ + _dark_,
    _dataSrcLight_ = _dataSrc_ + _light_,
    _dataSrcset_ = "d-srcset-",
    _dataSrcsetDark_ = _dataSrcset_ + _dark_,
    _dataSrcsetLight_ = _dataSrcset_ + _light_,
    _dataTd2th_ = "d-td2th",
    _title_ = "title",
    __title_ = "-" + _title_,
    _dataTitle_ = "d" + __title_,
    _dataId_ = "d-id",
    _dataIdentLevel_ = "d-ident-level",
    _dataImgFill_ = "d-img-fill",
    _dataPause_ = "d-pause",
    _dataPgIdx_ = "d-pg-idx",
    __result_ = "-result",
    _dataResult_ = "d" + __result_,
    _coating_ = "coating",
    _hidden_ = "hidden",
    _dataCoatingHidden_ = "d-" + _coating_ + "-" + _hidden_,
    __tip_ = "-tip",
    _dataCoatingTip_ = "d-" + _coating_ + __tip_,
    _dataCoatingShowed_ = "d-" + _coating_ + "-showed",
    _dataRowGroup_ = _dataRow__ + _group_,
    _dTbl__ = "d-tbl-",
    _dataTblCol_ = _dTbl__ + "col",
    _dataTblX_ = _dTbl__ + "x",
    _dataThRpt_ = "d-th-rpt",
    _tips_ = "tips",
    _dataTips_ = "d-" + _tips_,
    _del_ = "del",
    _details_ = "details",
    _disabled_ = "disabled",
    _display_ = "display",
    _div_ = "div",
    _docLib_ = "doc-lib",
    _docLibToc_ = _docLib_ + "-toc",
    _docIcon_ = "doc" + __icon_,
    _done_ = "done",
    _copy_ = "copy",
    _Copy_ = "Copy",
    _figure_ = "figure",
    _openInFigureNav_ = "open-in-" + _figure_ + "-nav",
    _table_ = "table",
    _tableCross_ = _table_ + "-cross",
    // _tableOfContents_ = "Table of Contents",
    _picInPic_ = "pic-in-pic",
    __docTitle_ = "-doc" + __title_,
    _effect_ = "effect",
    _enabled_ = "enabled",
    _first_ = "first",
    _enabled__first_ = _enabled_ +___+ _first_,
    _last_ = "last",
    _enabled__last_ = _enabled_ +___+ _last_,
    _enter_ = "Enter",
    _emptied_ = "emptied",
    _error_ = "error",
    _escape_ = "Escape",
    __fade_ = "-fade",
    _failed_ = "Failed [ ",
    _false_ = "false",
    _vFig_ = "v-" + _fig_,
    _fitWidth_ = "fit-" + _width_,
    _vFitWidth_ = "v-" + _fitWidth_,
    _vCheckCount_ = _check_ + _count_,
    _welcome_ = "welcome",
    _vWelcomePage_ = "v-" + _welcome_ + "-" + _page_,
    _figGrid__ = _vFig_ + "-grid-",
    _figSolid__ = _vFig_ + "-solid-",
    _fill_ = "fill",
    _filter_ = "filter",
    _first__enable__last_ = _first_ +___+ _enabled_ +___+ _last_,
    __child_ = "-child",
    _firstChild_ = ":" + _first_ + __child_,
    _flex_ = "flex",
    _float_ = "float",
    _font_ = "font",
    _Font_ = "Font",
    _style_ = "style",
    _fontStyle_ = _font_ + "-" + _style_,
    __footer_ = "-footer",
    _footnote_ = "footnote",
    _footnotes_ = _footnote_ + "s",
    _footnotesArea_ = _footnotes_ + "-area",
    _freeze_ = "freeze",
    _function_ = "function",
    _gov_ = "gov",
    _h6_ = "h6",
    _height_ = "height",
    _hover_ = "hover",
    _hoverAction_ = _hover_ + __action_,
    _href_ = "href",
    _http_ = "http",
    _httpPrefix_ = _http_ + "://",
    _httpsPrefix_ = _http_ + "s://",
    _github_ = "github",
    _github_madmaxchow_ = "github.com/MadMaxChow/",
    _openfontsPages_CloudFlare_ = _httpsPrefix_ + "openfonts.pages.dev/",
    _VLOOK_ = "VLOOK",
    _githubVlook_ = _github_madmaxchow_ + _VLOOK_,
    _ico_ = "ico",
    _Alert_ = "Alert",
    _Note_ = "Note",
    _icoAlertNote_ = _ico_ + _Alert_ + _Note_,
    _Tip_ = "Tip",
    _icoAlertTip_ = _ico_ + _Alert_ + _Tip_,
    _Important_ = "Important",
    _icoAlertImportant_ = _ico_ + _Alert_ + _Important_,
    _Warning_ = "Warning",
    _icoAlertWarning_ = _ico_ + _Alert_ + _Warning_,
    _Caution_ = "Caution",
    _icoAlertCaution_ = _ico_ + _Alert_ + _Caution_,
    _Mode_ = "Mode",
    _math_ = "math",
    _icoAutoMode_ = _ico_ + "Auto" + _Mode_,
    _icoChkbox__ = _ico_ + "Chkbox_",
    _icoCheck_ = _ico_ + "Check",
    _Close_ = "Close",
    _icoClose_ = _ico_ + _Close_,
    _icoCopy_ = _ico_ + _Copy_,
    _icoCopyAsMd_ = _ico_ + _Copy_ + "AsMd",
    _icoDarkMode_ = _ico_ + "Dark" + _Mode_,
    _icoDetailsOpen_ = _ico_ + "DetailsOpen",
    _icoDocLib_ = _ico_ + "DocLib",
    _icoDocLibExt_ = _ico_ + "DocLibExt",
    _icoFolded_ = _ico_ + "Folded",
    _Style_ = "Style",
    _icoFontStyle_ = _ico_ + _Font_ + _Style_,
    _icoForbidden_ = _ico_ + "Forbidden",
    _icoLaserPointer_ = _ico_ + "LaserPointer",
    _icoLightMode_ = _ico_ + "Light" + _Mode_,
    _icoLinkError_ = _ico_ + "LinkError",
    _icoLinkMap_ =  _ico_ + "LinkMap",
    _Loading_ = "Loading",
    _icoLoading_ = _ico_ + _Loading_,
    _icoMaskCloser_ = _ico_ + "MaskCloser",
    _icoNavCenter_ = _ico_ + "NavCenter",
    _icoNewVersion_ = _ico_ + "NewVersion",
    _icoOpenInFigureNav_ = _ico_ + "OpenInFigureNav",
    _icoParagraphNav_ = _ico_ + "ParagraphNav",
    _icoPause_ = _ico_ + "Pause",
    _icoPicInPic_ = _ico_ + "PicInPic",
    _icoPlay_ = _ico_ + "Play",
    _icoPrevFig_ = _ico_ + "PrevFig",
    _icoPrevChapter_ = _ico_ + "PrevChapter",
    _icoPrint_ = _ico_ + "Print",
    _icoResetInput_ = _ico_ + "ResetInput",
    _Search_ = "Search",
    _icoSearch_ = _ico_ + _Search_,
    _spotlight_ = "spot" + _light_,
    _Spotlight_ = "Spot" + _light_,
    _icoSpotlight_ = _ico_ + _Spotlight_,
    _icoStop_ = _ico_ + "Stop",
    _icoTableX_ = _ico_ + "TableX",
    _icoTocFolded_ = _ico_ + "TocFolded",
    _icoIndexTab_ = _ico_ + "IndexTab",
    _icoIndexTabToc_ = _icoIndexTab_ + "Toc",
    _icoIndexTabCodeblock_ = _icoIndexTab_ + "Codeblock",
    _icoIndexTabFormula_ = _icoIndexTab_ + "Formula",
    _icoIndexTabFigure_ = _icoIndexTab_ + "Figure",
    // _History_ = "History",
    // _icoTocTabHistory_ = _icoTocTab_ + _History_,
    _icoIndexTabMedia_ = _icoIndexTab_ + "Media",
    _icoIndexTabTable_ = _icoIndexTab_ + "Table",
    _icoWrapUnwrap_ = _ico_ + "WrapUnwrap",
    _load_ = "load",
    _mermaid_ = "mermaid",
    _loading_ = _load_ + "ing",
    _vLoading_ = "v-" + _loading_,
    _vLong_ = "v-long",
    _vlookHost_ = "madmaxchow.github.io",
    _madmaxchowHost_GitHub_ = _httpsPrefix_ + _vlookHost_,
    _vlookPagesHost_CloudFlare_ = _httpsPrefix_ + "vlook-doc.pages.dev",
    _vlookAct_ = _vlookHost_ + "/VLOOK/act/",
    _VLOOK_Number_ = _VLOOK_ + " Number",
    _VLOOK_Digital_Sans_ = _VLOOK_ + " Digital Sans",
    _VLOOK_Digital_Serif_ = _VLOOK_ + " Digital Serif",
    _VLOOK_Sans_Mono_ = _VLOOK_ + " Sans Mono",
    _VLOOK_Serif_Mono_ = _VLOOK_ + " Serif Mono",
    _VLOOK_Sans_ = _VLOOK_ + " Sans",
    _VLOOK_Serif_ = _VLOOK_ + " Serif",
    _VLOOK_Albb_ = _VLOOK_ + " Albb",
    _VLOOK_Albb_DT_Sans_ = _VLOOK_ + " Albb DT-Sans",
    _VLOOK_Albb_DT_JinBu_ = _VLOOK_ + " Albb DT-JinBu",
    // _No_content_en_ = "No content",
    // _No_content_cn_ = "无内容",
    _NotoSansMono_ = "NotoSansMono",
    _LuxiMono_ = "LuxiMono",
    _icoVLOOK_ = _ico_ + _VLOOK_,
    _icoZoomIn_ = _ico_ + "ZoomIn",
    _icoZoomOut_ = _ico_ + "ZoomOut",
    _id_ = "id",
    __status_ = "-status",
    // _fontsetStatus_ = _font_ + "set" + __status_,
    _iframe_ = "iframe",
    _imageXicon_ = _image_ + "/x" + __icon_,
    _img_ = "img",
    _important_ = " !important;",
    _inner_ = "inner",
    _input_ = "input",
    _start_ = "start",
    _startReading_cn_ = "开始阅览",
    _startReading_en_ = "Start Reading",
    _inStart_ = "in-" + _start_,
    _Invalid_ = "Invalid",
    _invert_ = "invert",
    _italic_ = "italic",
    _italic_bold_ = "/" + _italic_ + "/" + _bold_,
    __items_ = "-items",
    _kbd_ = "kbd",
    _keydown_ = "keydown",
    _label_ = "label",
    _lang_ = "lang",
    _pointer_ = "pointer",
    _laserPointer_ = "laser-" + _pointer_,
    __last_ = ":" + _last_,
    _lastChild_ = __last_ + __child_,
    _position_ = "position",
    _lastPosition_ = _last_ + "-" + _position_,
    _vResumeReading_ = "v-resume-reading",
    _link_ = "link",
    _linkChecker_ = _link_ + "-" + _check_ + "er",
    _line_ = "line",
    _linearGradient_ = "linear-gradient",
    _local_ = "local",
    _loop_ = "loop",
    _margin_ = "margin",
    _map_ = "map",
    _marginBottom_ =_margin_ +  "-" + _bottom_,
    _marginLeft_ = _margin_ + "-" + _left_,
    _marginRight_ = _margin_ + "-" + _right_,
    _mark_ = "mark",
    _mata_ = "meta",
    _maxHeight_ = "max-height",
    _mdAlert_ = "md-alert",
    _mdDiagramPanel_ = "md-diagram-panel",
    _mdFences_ = "md-fences",
    _media_ = "media",
    _message_ = "message",
    _item_ = "item",
    _mdTocItem_ = "md-toc-" + _item_,
    _middle_ = "middle",
    _min_ = "min",
    _mindmap_ = "mindmap",
    _mini_ = "mini",
    _minWidth_ = "min-" + _width_,
    _mjx__ = "#mjx-",
    _mouse_ = "mouse",
    _mouseDown_ = _mouse_ + "down",
    _mouseUp_ = _mouse_ + "up",
    _mouseEnter_ = _mouse_ + "enter",
    _mouseLeave_ = _mouse_ + "leave",
    _mp3_ = ".mp3",
    _mp4_ = ".mp4",
    _m4a_ = ".m4a",
    _ogg_ = ".ogg",
    _ogv_ = ".ogv",
    _wav_ = ".wav",
    _webm_ = ".webm",
    _name_ = "name",
    _nav_ = "nav",
    _navCenter_ = _nav_ + "-" + _center_,
    _Next_ = "Next",
    __next_ = "-next",
    _newVersion_ = "new-version",
    _nbsp_ = "&nbsp;",
    _no_ = "no",
    _normal_ = "normal",
    _normal_normal_ = "/" + _normal_ + "/" + _normal_,
    _normal_bold_ = "/" + _normal_ + "/" + _bold_,
    _normal_500_ = "/" + _normal_ + "/500",
    _normal_900_ = "/" + _normal_ + "/900",
    _normal_italic_ = "/" + _italic_ + "/" + _normal_,
    _notLoaded_ = "⏳", //"NOT LOADED",
    _off_ = "off",
    _on_ = "on",
    _onlyChild_ = ":only" + __child_,
    _opacity_ = "opacity",
    _opened_ = _open_ + "ed",
    _outerHTML_ = "outerHTML",
    _outlineStyle_ = "outline-" + _style_,
    _outlineWidth_ = "outline-" + _width_,
    _overflow_ = "overflow",
    _overflowX_ = _overflow_ + "-x",
    _overflowY_ = _overflow_ + "-y",
    _padding_ = "padding",
    _paddingBottom_ = _padding_ + "-" + _bottom_,
    _paddingLeft_ = _padding_ + "-" + _left_,
    _paddingRight_ = _padding_ + "-" + _right_,
    _paddingTop_ = _padding_ + "-top",
    _paragraph_ = "paragraph",
    _paragraphNav_ = _paragraph_ + "-nav",
    _placeholder_ = "placeholder",
    _playing_ = "playing",
    // _pre_ = "pre",
    _preload_ = "preload",
    _Previous_ = "Previous",
    _preWrap_ = "pre-" + _wrap_,
    __prev = "-prev",
    _Ready_ = "Ready",
    __reset_ = "-reset",
    _restore_ = "restore",
    _refFootnote_ = "ref-" + _footnote_,
    _rowspan_ = "rowspan",
    _rx_ = "rx",
    _ry_ = "ry",
    _sans_ = "sans",
    _selected_ = "selected",
    _serif_ = "serif",
    _span_ = "span",
    _sub_ = "sub",
    _src_ = "src",
    _srcset_ = "srcset",
    _stroke_ = "stroke",
    _strong_ = "strong",
    _svg_ = "svg",
    _suffixImg_ = "." + _img_,
    _suffixSvg_ = "." + _svg_,
    _summary_ = "summary",
    _tabindex_ = "tabindex",
    _tagName_ = "tagName",
    _target_ = "target",
    _tbody_ = "t" + _body_,
    _textAlign_ = _text_ + "-" + _align_,
    _textLength_ = _text_ + "Length",
    _textShadow_ = _text_ + __shadow_,
    _thead_ = "thead",
    _theme_ = "theme",
    _vlook__ = "vlook-",
    _vlookToc_ = _vlook__ + _toc_,
    _vlookQuery_ = _vlook__ + "query",
    _tocItem_ = "#" + _vlookToc_ + ">." + _mdTocItem_,
    __spliter_ = "-spliter",
    _toolbar_ = "toolbar",
    _toolbarSpliter_ = _toolbar_ + __spliter_,
    _transform_ = "transform",
    _transformOrigin_ = _transform_ + "-origin",
    _true_ = "true",
    _ttf_ = "ttf",
    _hastwo_ = "hastwo",
    _un_ = "un",
    _unfreeze_ = "unfreeze",
    _vdl_ = "vdl",
    _docLibIdentifier_ = _target_ + "=" + _vdl_,
    _vkFooterArea_ = "vk-footer-area",
    _vkFooterAreaId_ = "#" + _vkFooterArea_,
    _vkHeader_ = "vk" + __header_ + "-",
    _vkIdDocTitle_ = "vk-id" + __docTitle_,
    _vkIdFig_ = "vk-id-fig",
    _vkIdAudio_ = "vk-id-" + _audio_,
    _video_ = "video",
    _vkIdVideo_ = "vk-id-" + _video_,
    _vkIdTbl_ = "vk-id-tbl",
    _vkIdMath_ = "vk-id-math",
    _vkIdCodeblock_ = "vk-id-" + _codeblock_,
    _vkIdMiniAudio_ = "vk-id-mini-" + _audio_,
    _vlookDocLib_ = _vlook__ + _docLib_,
    _vlookChkUpdateCloudFlare_ = _vlook__ + _chkUpdate_ + "-" + _cloudFlare_,
    _vlookChkUpdateGitHub_ = _vlook__ + _chkUpdate_ + "-" + _github_,
    _vlookStat__ = _vlook__ + "stat-",
    _vlookStatGitee_ = _vlookStat__ + "gitee",
    _vlookStatGitHub_ = _vlookStat__ + _github_,
    _vlookStatCloudFlare_ = _vlookStat__ + _cloudFlare_,
    _varAcRedLg_ = V_ui_var("--ac-rd-lg"),
    _varAcOrangeLg_ = V_ui_var("--ac-og-lg"),
    _varAcCyanLg_ = V_ui_var("--ac-cy-lg"),
    __scheme_ = "-scheme",
    _colorScheme_ = _color_ + __scheme_,
    _varColorScheme_ = "--v-" + _colorScheme_,
    _varCurCopy_ = "--cur-" + _copy_,
    _varDBc_ = V_ui_var("--d-bc"),
    _varDFC_ = V_ui_var("--d-fc"),
    _varFigGrid__ = "--" + _figGrid__,
    _varMarkBg_ = V_ui_var("--mark-bg"),
    _varMmCyan_ = V_ui_var("--mm-c-cy"),
    _varMmOrange_ = V_ui_var("--mm-c-og"),
    _varMmRed_ = V_ui_var("--mm-c-rd"),
    _vNavCenter_ = "v-nav-" + _center_,
    __NavCenterWidth_ = "--" + _vNavCenter_ + "-w",
    _varNavCenterHiddenLeft_ = "calc(" + V_util_getVarVal(__NavCenterWidth_) + " * -2)",//"--" + _vNavCenter_ + "-" + _hidden_ + "-l",
    _varNavCenterWidth_ = V_ui_var(__NavCenterWidth_),
    _V_R_ = "--v-r-",
    _V_R_B_ = _V_R_ + "b",
    _varVRB_ = V_ui_var(_V_R_B_),
    _V_R_C_ = _V_R_ + "c",
    _V_R_S_ = _V_R_ + "s",
    _V_R_T_ = _V_R_ + "t",
    _V_R_Tag_ = _V_R_ + "tag",
    _varTblRowAlpha_ = V_ui_var("--tbl-row-g-alpha"),
    _vActor_ = "v-actor",
    _vActorKeySys_ = _vActor_ + "-key-sys",
    _vActorExtSys_ = _vActor_ + "-ext-sys",
    _vAudioMiniControl_ = "v-" + _audio_ + "-mini-control",
    _vBackdropBlurs_ = "v-backdrop-blurs",
    _vBadge_ = "v-badge-",
    _vBadgeName_ = _vBadge_ + "name",
    _value_ = "value",
    _vBadgeValue_ = _vBadge_ + _value_,
    _vBtn_ = "v-btn",
    _vBtnGroup_ = _vBtn_ + "-" + _group_,
    _vBtn__BtnGroup_ = "." + _vBtn_ + ",." + _vBtnGroup_,
    _vBtn_Assistor_ = "." + _vBtn_ + "." + _assistor_,
    _vCheckHash_ = "v-" + _check_ + "-" + _hash_,
    _vColorScheme_ = "v-" + _colorScheme_,
    _vContent_ = "v-" + _content_,
    _vContentAssistor_ = _vContent_ + "-" + _assistor_,
    _vCard_ = "v-" + _card_,
    _vCap1_ = ".v-cap-1",
    _vCap2_ = ".v-cap-2",
    _vCaptionContainer_ = "v-cap-cntr",
    _vCaption_ = "v-caption",
    _vCaption_Mermaid_ = _vCaption_ + "." + _mermaid_,
    _vChapterNav_ = "v-chapter-nav",
    _vCodeMirrorLine_ = "CodeMirror-line",
    _vCopyright_ = "v-copyright",
    _vCopyrightSvgIco_ = _vCopyright_ + "-svg-ico",
    _vCursorLaser_ = "v-" + _cursor_ + "-laser",
    _vDoc__ = "v-doc-",
    _info_ = "info",
    _vDocInfo_ = _vDoc__ + _info_,
    _vDocLib_ = _vDoc__ + "lib",
    _vDocLibItem_ = _vDocLib_ + "-" + _item_,
    _vDocLogo_ = _vDoc__ + "logo-",
    _Exit_en_ = "Exit",
    _Exit_cn_ = "退出",
    _expander_ = "expander",
    _vFloatCard_ = "v-" + _float_ + "-" + _card_,
    _vFigContent_ = _vFig_ + "-" + _content_,
    _vFigNav_ = _vFig_ + "-nav",
    _vFigNavBtns_ = "." + _vFigNav_ + "-btns",
    _search_ = "search",
    _vFocusSearch_ = "v-focus-" + _search_,
    _vFontInfo__ = "v-" + _font_ + _info_ + "-",
    _vFontnotePn_ = "v-" + _footnote_ + "-pn",
    _vFontPackage_ = "v-" + _font_ + "-package",
    _vFontStyle_ = "v-" + _fontStyle_,
    _vFontStyleDownload_ = "v-" + _fontStyle_ + "-download",
    _vFontStyleCurrent_ = "v-" + _fontStyle_ + __current_,
    _vFontStyleOpt_ = "v-" + _fontStyle_ + "-opt",
    _vFontStyleRestore_ = "v-" + _fontStyle_ + "-" + _restore_,
    _infoTips_ = _info_ + "-" + _tips_,
    _handle_ = "handle",
    _vInfoTips_ = "v-" + _infoTips_,
    _vStdCode_ = "v-std-" + _code_,
    _vBreadcrumbStyle_ = "v-stepwise",
    _vTable_ = "v-" + _table_,
    _vTag_ = "v-tag",
    _vTips_ = "v-" + _tips_,
    _vToc__ = "v-toc-",
    _vTocBody_ = _vToc__ + _body_,
    // _vTocCatalogBody_ = _vToc__ + _catalog_ + __body_,
    _vTocFilterResultNone_ = _vToc__ + _filter_ + __result_ + "-" + _none_,
    _vTocHandle_ = _vToc__ + _handle_,
    // _vTocHistory_ = _vToc__ + _history_,
    _vToolTips_ = "v-tool-" + _tips_,
    _vToolbar_ = "v-" + _toolbar_,
    _vImgInvertDark_ = "v-img-" + _invert_ + "-" + _dark_,
    _vLinkChkResult_ = "v-" + _link_ + "-chk" + __result_,
    _vLinkInfoList_ = "v-" + _link_ + "-" + _info_ + "-list",
    _vLinkMap_ = "v-" + _link_ + "-map",
    _vMapItem_ = "v-map-" + _item_,
    _vMask_ = "v-mask",
    _vMaskClose_ = _vMask_ + "-" + _close_,
    _mdToc_ = "md-toc",
    _mdToc__ = _mdToc_ + "-",
    _vMermaidRestyler_ = "v-" + _mermaid_ + "-restyler",
    _vMoreDocContent_ = "v-more-doc-" + _content_ + "-",
    _vNavCenterBlock_ = _vNavCenter_ + "-block",
    _vNavCenterFloat_ = _vNavCenter_ + "-" + _float_,
    _vNewVersion_ = "v-" + _newVersion_,
    _vPgCurrentItem_ = "v-pg" + __current_ + "-" + _item_,
    _vPrint_ = "v-" + _print_,
    _vPostCard_ = "v-post-" + _card_,
    _vPicInPic_ = "v-" + _picInPic_,
    _vPipBtn_ = "v-pip-btn",
    _vCoating_ = "v-" + _coating_,
    _vRotate_ = "v-rotate",
    _vRotate45_ = _vRotate_ + 45,
    _vRotate90_ = _vRotate_ + 90,
    _vSearchByKeyword_ = "v-" + _search_ +"-by-" + _keyword_,
    _vSegment_ = "v-segment",
    _vSegmentBtn_ = _vSegment_ + "-btn",
    _vStsFontStyle_ = "v-sts-" + _fontStyle_,
    _vSpotlight_ = "v-" + _spotlight_,
    _vSpotlightInDark_ = _vSpotlight_ + "-in-" + _dark_,
    _vStatusBar_ = "v" + __status_ + "-bar",
    _vSvgDetails_ = "v-svg-" + _details_,
    _vTbl__ = "v-tbl-",
    _vTblX_ = "." + _vTbl__ + "x",
    _vTblXCell_ = _vTbl__ + "x-cell",
    _vTblRow_ = _vTbl__ + "row-",
    _vTblRowGFolder_ = _vTblRow_ + "g-" + _folder_,
    __identer_ = "-identer",
    _vTblRowGIdenterFolder_ = _vTblRow_ + "g" + __identer_ + "-" + _folder_,
    _vTblRowGNotFolder_ = _vTblRow_ + "g-not-" + _folder_,
    _vTblRowGBtn_ = "." + _vTblRow_ + "g-btn",
    _vTblRowNumHidden_ = _vTblRow_ + "num-" + _hidden_,
    _vTblColFmt__ = _vTbl__ + "col-fmt-",
    _vTblColFmt_Chkbox_ = _vTblColFmt__ + "chkbox",
    _vTblColFmt_Bold_ = _vTblColFmt__ + _bold_,
    _vTblColFmt_Em_ = _vTblColFmt__ + "em",
    _vTblColFmtMark_ = _vTblColFmt__ + _mark_,
    _vTblColFmtNum_ = _vTblColFmt__ + "num",
    _vTblColFmtNumDecimal_ = _vTblColFmt__ + "num-decimal",
    _vTblColFmtNumNegative_ = _vTblColFmt__ + "num-negative",
    _vTblColFmtNumPositive_ = _vTblColFmt__ + "num-positive",
    _vTblColFmtPercent_ = _vTblColFmt__ + "percent",
    _vTblColFmtCurrency_ = _vTblColFmt__ + "currency",
    _vTblRowGSub_ = _vTblRow_ + "g-sub",
    _vTblRowGIdenter_ = _vTblRow_ + "g" + __identer_,
    _vTextField_ = "v-textfield",
    _vTextFieldFocus_ = _vTextField_ + "-focus",
    _vThRepeater_ = "v-th-repeater",
    _vTocFolder_ = "." + _vToc__ + _folder_,
    _vTocFilterResult_ = _vToc__ + _filter_ + __result_,
    _vTocItem_ = _vToc__ + _item_,
    _vItemCurrent_ = "v-" + _item_ + __current_,
    _vTransition__ = "v-transition-",
    _vTransitionAll_ = _vTransition__ + "all",
    _verticalAlign_ = "vertical-" + _align_,
    _viewBox_ = "viewBox",
    _visible_ = "visible",
    _visibility_ = "visibility",
    _wait_ = "wait",
    _warning_ = "warning",
    _wheel_ = "wheel",
    _whiteSpace_ = "white-space",
    _write_ = "write",
    __write_ = "#" + _write_,
    _woff2_ = "woff2",
    _writeMarginLeft_ = "var(--v-" + _write_ + "-ml)",//"calc(" + _varNavCenterWidth_ + " + 30px)",
    _writeMarginLeftDef_ = "var(--v-" + _write_ + "-ml-def)",
    _xmd_ = "xmd",
    _yes_ = "yes",
    _zIndex_ = "z-index",
    _zoom_ = "zoom",
    _zoomIn_ = _zoom_ + "-in",
    _zoomOut_ = _zoom_ + "-out",
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
    return gLocation.href;
}

// 设置文档 URL
function WINDOW_setHref(value) {
    gLocation.href = value;
}

// 获得文档 URL 的 hash
function WINDOW_getHash() {
    return gLocation.hash;
}

// ==================== JQuery 方法调用简化 ==================== //

// addClass 简化版
function JQ_addClass(target, className) {
    if (target !== gUndefined)
        target.addClass(className);
}

// removeClass 简化版
function JQ_removeClass(target, className) {
    if (target !== gUndefined)
        target.removeClass(className);
}

// removeAttr 简化版
function JQ_removeAttr(target, attrName) {
    if (target !== gUndefined)
        target.removeAttr(attrName);
}

// 交替切换不同样式
function JQ_exchangeClass(target, oldClassName, newClassName) {
    if (target !== gUndefined) {
        target.removeClass(oldClassName);
        target.addClass(newClassName);
    }
}

// remove 简化版
function JQ_remove(target) {
    if (target !== gUndefined)
        target.remove();
}

// attr 简化版
$.prototype.a = function (key, value) {
    return (value === gUndefined ? this.attr(key) : this.attr(key, value));
}

// css 简化版
$.prototype.c = function (key, value) {
    return (value === gUndefined ? this.css(key) : this.css(key, value));
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
    return (value === gUndefined ? this.html(): this.html(value));
}

// val 简化版
$.prototype.v = function (value) {
    return (value === gUndefined ? this.val() : this.val(value));
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
$.prototype.oW = function (flag = gFalse) {
    return this.outerWidth(flag);
}

// height 简化版
$.prototype.h = function () {
    return this.height();
}

// innerHeight 简化版
$.prototype.iH = function () {
    return this.innerHeight();
}

// outerHeight 简化版
$.prototype.oH = function (flag = gFalse) {
    return this.outerHeight(flag);
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
    return (this.offset() === gUndefined ? 0 : this.offset().top);
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
    return (value === gUndefined ? this.text() : this.text(value));
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
    return this.unbind(_mouseEnter_).unbind(_mouseLeave_);
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

// toUpperCase 简化版
String.prototype.u = function () {
    return this.toUpperCase();
}

// substring 简化版
String.prototype.ss = function (start, end) {
    return this.substring(start, end);
}

// split 简化版
String.prototype.sp = function (exp) {
    return this.split(exp);
}

// toString 简化版
function JS_toString(value) {
    if (value === gUndefined || value === gNull)
        return value;
    return value.toString();
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

// decodeURIComponent 简化版
function JS_decodeURIComponent(uri) {
    let result = V_util_isValidURIComponent(uri);
    if (result !== gFalse)
        return result;
    return uri;
}

// encodeURI 简化版
function JS_encodeURI(uri) {
    return (uri === gUndefined ? _ : encodeURI(uri));
}

// decodeURI 简化版
function JS_decodeURI(uri) {
    return (uri === gUndefined ? _ : decodeURI(uri));
}

// ======================================== //

INFO("=== Load " + _Document_ + " ===");

// UI 元素
let iToolbar = gUndefined,
    iNavCenter = gUndefined,
    iChapterNav = gUndefined,
    iParagraphNav = gUndefined,
    iSpotlight = gUndefined,
    iLaserPointer = gUndefined,
    iFontStyle = gUndefined,
    iFigNav = gUndefined,
    iInfoTips = gUndefined,
    iFootnote = gUndefined;

// ==================== 文档对象模型 ==================== //

// 文档的 html 对象
let DOM_h = gUndefined;
function DOM_html() {
    if (DOM_h === gUndefined) {
        DOM_h = $(_html_);
        if (V_length(DOM_h) === 0) {
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
        DOM_b = $(_body_);
        if (V_length(DOM_b) === 0) {
            DOM_b = gUndefined;
            ERROR(_failed_ + "DOM." + _body_ + " ]");
        }
    }
    return DOM_b;
}

// ==================== VLOOK 对象模型 ==================== //

// Markdown 导出为 HTML 的内容对象
let VOM_d = gUndefined;
function VOM_doc() {
    if (VOM_d === gUndefined) {
        VOM_d = $(__write_);
        if (V_length(VOM_d) === 0) {
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
        VOM_c = $(__write_ + ">pre.md-meta-block" + _firstChild_ + "+" + _h6_ + "," + __write_ + ">" + _h6_ + _firstChild_);
        if (V_length(VOM_c) === 0) {
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
        let fns = V_byClass(_footnotesArea_);
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
        VOM_dt = V_byID(_vkIdDocTitle_);
        if (V_length(VOM_dt) === 0) {
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
// $.prototype.isEmpty = function () {
//     // return (typeof (this) === "undefined");
//     return (this === gUndefined) || (this !== gUndefined && V_length(this) === 0);
// }

/**
 * 判断对象是否已隐藏
 */
$.prototype.isHidden = function () {
    let _t = this;
    return _t !== gUndefined
        && (_t.c(_display_) === _none_ || _t.c(_visibility_) === _hidden_ || _t.c(_opacity_) === "0");
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
        let pre = T.ss(0, i),
            suff = T.ss(i, V_length(T));
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
            Chrome: u.m(/Chrome\/[\d.]+/gi) ? u.m(/Chrome\/[\d.]+/gi)[0].m(/\d+/)[0] : 0, // Chrome 浏览器版本
            Firefox: u.m(/Firefox\/[\d.]+/gi) ? u.m(/Firefox\/[\d.]+/gi)[0].m(/\d+/)[0] : 0, // Firefox 浏览器版本
            Safari: u.m(/Version\/[\d.]+.+Safari\/[\d.]+/gi) ? u.m(/Version\/[\d.]+.+Safari\/[\d.]+/gi)[0].m(/\d+/)[0] : 0, // Safari 浏览器版本
            Edge: u.m(/Edg\/[\d.]+/gi) ? u.m(/Edg\/[\d.]+/gi)[0].m(/\d+/)[0] : 0 // Edge 浏览器版本
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
            base: lang.ss(0, 2),
            subset: lang.ss(3, V_length(lang))
        };
    }(),

    // 显示信息
    display : function () {
        return {
            DPR : gWindow.devicePixelRatio
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
            + env.language.base + "/" + env.language.full
            + " (" + (V_lang_custom !== gUndefined
                ? V_lang_custom
                : (V_lang > -1
                    ? ["zh", "en"][V_lang]
                    : _none_))
            + ") ]\n";
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

        info = "    ├ VLOOK™ Plugin [ "
            + gVer
            + (V_devMode ? " < DEV >" : " RELEASED" )
            + " ]\n"; // 插件版本
        r += info;
        if (!silent) LOG(info);

        info = "    ├ VLOOK™ Theme  [ "
            + (gThmName = V_util_getTemplateThemeName())
            + " / " + (gThmVer = V_util_getTemplateThemeVersion())
            + " ]\n"; // 文档主题
        r += info;
        if (!silent) LOG(info);

        info = "    └ VLOOK™ Type   [ "
            + V_pageMode
            + " ]\n"; // VLOOK 插件运行类型
        r += info;
        if (!silent) LOG(info);

        info = navigator.userAgent + "\n";
        r += info;
        if (!silent) LOG(info);

        return r;
    },

    /**
     * 屏幕上显示环境信息、Mermaid 信息等
     **/
    show : function (source) {
        let info = env.print()
            + "\n----------\nPowered by MAX°孟兆\n";
        console.log(info);
        Copyer_action(source, info, gFalse);
        ALERT(info);
    }
};

// ==================== VLOOK 关键信息类 ==================== //

let V_ver = gVer, // VLOOK 版本信息
    V_devMode = devMode, // 开发模式
    V_debugMode = debugMode, // 调试模式
    V_pageMode = _max_, // 页面模式：max, pro, mini
    V_query_params = new URLSearchParams(); // VLOOK 的调校参数
    //V_params_yaml = gNull; // VLOOK 文档的 YAML

// vlook-query 预置选项及其调校参数初始化
function V_query_init() {
    // 优先级 1
    // 读取 URL Query 中的内容
    let queryUrl = new URLSearchParams(gLocation.search);
    __append(queryUrl);

    // 优先级 2
    // 读取 YAML 中定义的 vlook-query 预置选项内容
    let tmpQuery = V_util_getMetaByName(_vlookQuery_),
        queryYaml = new URLSearchParams((tmpQuery === gUndefined ? _ : tmpQuery));
    __append(queryYaml);

    // 优先级 3
    // 读取主题配套的 vlook-query 预置选项内容
    tmpQuery = V_util_removeQuotes(V_util_getVarVal("--v-query").x());
    let queryTheme = new URLSearchParams((tmpQuery === gUndefined ? _ : tmpQuery));
    __append(queryTheme);

    // 添加指定来源的调校参数（不重复的）
    function __append(params) {
        if (V_length(JS_toString(params)) > 0) {
            for (let [key, value] of params) {
                if (!V_query_params.has(key)) {
                    V_query_params.append(key, value);
                }
            }
        }
    }
}
// ========================================

// ========================================
// VLOOK 检索对象实例
// 以 id 进行检索
function V_byID(idName) {
    return $("#" + idName);
}

// 以 className 进行检索
function V_byClass(className) {
    return $("." + className);
}
// ========================================

// ========================================
// VLOOK 本地数据读/写

/**
 * 读取数据
 * @param key 键名
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_read(key, share) {
    return localStorage.getItem((share ? _ : V_util_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
        + key);
}

/**
 * 写入数据
 * @param key 键名
 * @param value 键值
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_write(key, value, share) {
    localStorage.setItem((share ? _ : V_util_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
        + key, value);
}

/**
 * 删除数据
 * @param key 键名
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_remove(key, share) {
    return localStorage.removeItem((share ? _ : V_util_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
    + key);
}

// ========================================

// ========================================
// VLOOK 工具包

// 判断是否为移动端
function V_util_isMobile() {
    return env.device.mobile;
}

/**
 * 去掉指定内容中的前后的引号
 * @param content 指定内容
 */
function V_util_removeQuotes(content) {
    if (content === gUndefined)
        return gUndefined;
    let  len ;
    if ((len = V_length(content)) > 2)
        return content.ss(1, len - 1);
    return content;
}

/**
 * 获取指定对象的所有子元素（及其子元素）的文本内容
 * @param target 指定对象
 * @param separator 子元素间添加指定分隔符
 */
function V_util_joinNodesText(target, separator) {
    let nodesText = [];
    __getTextNodes(nodesText, target);
    return (V_length(nodesText) > 0 ? nodesText.join(separator) : _);

    function __getTextNodes(texts, node) {
        $(node).contents().e((index, element) => {
            // 处理文本节点
            if (element.nodeType === 3) {
                let txt = $(element).t().x();
                if (V_length(txt) > 0)
                    texts.push(txt); // 添加非空文本
            }
            // 处理元素节点
            else if (element.nodeType === 1)
                __getTextNodes(texts, element); // 递归处理嵌套元素
        });
    }
}

/**
 * 统计文本内容的字数（单词数）
 * @param content 文本内容
 * @return result.total - 总字数；result.latin - 非中日韩字数；result.CJK - 中日韩字数
 */
function V_util_countWord(content) {
    // 匹配中文字符
    let reChinese = /[\u4e00-\u9fa5]/g,
        // 匹配日文字符
        reJapanese = /[\u3040-\u30ff\u31f0-\u31ff\uFF66-\uFF9F]/g,
        // 匹配韩文字符
        reKorean = /[\uac00-\ud7af]/g,
        // 使用 Unicode 字符类匹配拉丁语系的完整单词（包括英文、法文、西班牙文等）
        reLatinLike = /\b[\p{L}\p{M}\p{N}]+\b/gu,
        // 匹配俄文单词和数字
        reRussian = /[\u0400-\u04FF]+/g,
        // 匹配阿拉伯语字符和数字
        reArabic = /[\u0600-\u06FF]+/g;

    let chineseCount = V_length(content.match(reChinese) || []),
        japaneseCount = V_length(content.match(reJapanese) || []),
        koreanCount = V_length(content.match(reKorean) || []),
        latinLikeCount = V_length(content.match(reLatinLike) || []),
        russianCount = V_length(content.match(reRussian) || []),
        arabicCount = V_length(content.match(reArabic) || []);

    // ERROR(content);
    // ERROR(111, "Chinese", content.match(reChinese));
    // ERROR(222, "Japanese", content.match(reJapanese));
    // ERROR(333, "Korean", content.match(reKorean));
    // ERROR(444, "Latin", content.match(reLatinLike));
    // ERROR(555, "Russian", content.match(reRussian));
    // ERROR(666, "Arabic", content.match(reArabic));

    let latin = latinLikeCount + russianCount + arabicCount,
        CJK = chineseCount + japaneseCount + koreanCount;
    return {
        latin: latin,
        CJK: CJK,
        total: latin + CJK
    };
}

/**
 * 获得当前滚动条位置
 * @param source 指定对象，不指定是默认为 document
 */
function V_util_getScrollTop(source) {
    return (source === gUndefined ? jq_Document.scrollTop() : source.scrollTop());
}

/**
 * 获取对象的 length 值
 * @param source 源对象
 */
function V_length(source) {
    return (source === gUndefined || source === gNull) ? 0 : source.length;
}

/**
 * 设置滚动条位置
 * @param pos 滚动位置
 * @param source 指定的对象，不指定是默认为 document
 */
function V_util_setScrollTop(pos, source) {
    source === gUndefined ? jq_Document.scrollTop(pos) : source.scrollTop(pos);
}

/**
 * 对内容进行排序
 * @param container 内容的容器对象
 * @param itemSet 需要进行排序的对象集合
 */
function V_util_sort(container, itemSet) {
    itemSet.sort((a, b) => {
        let textA = $(a).t().ss(0, 1),
            textB = $(b).t().ss(0, 1);
        // 以下以是以字符的 unicode 编码进行比较
        // 用 localeCompare 进行比较的话，存在不同国家或地区的排序结果不同
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    // 按重新排序的节点进行显示
    itemSet.e((index, element) => {
        $(element).detach().appendTo(container);
    });
}

/**
 * 对 URI 进行解码
 * @param uri
 * @returns 解码失败侧返回 false，成功则返回解码后的内容
 */
function V_util_isValidURIComponent(uri) {
    let result = _;
    try {
        // 尝试解码 URI 组件
        result = decodeURIComponent(uri);
        return result;
    } catch (e) {
        // 解码出现错误，说明 URI 不合法
        return false;
    }
}

/**
 * 获取 HTML 文档标题
 */
function V_util_getDocTitle() {
    return jq_Document.a(_title_);
}

/**
 * 获取 HTML <meta> 标签的内容
 * @param metaName 指定 meta 的名称
 * @returns 指定 meta 的内容
 */
function V_util_getMetaByName(metaName) {
    let content = $(_mata_ + V_attrCSS(_name_, metaName)).a(_content_);
    return ((content === gUndefined || V_length(content) === 0 || content === "${" + metaName + "}") ? gUndefined : content);
}

/**
 * to-do: removed
 *
 * 获取启动参数的值
 * @param pName 启动参数名称
 * @returns string 启动参数的值，如果没有找到则返回 null
 */
function V_util_getParamVal(pName) {
    return V_query_params.get(pName);
}

/**
 * 获取 URL 中的参数数组
 * @param u 完整的 URL 内容
 */
function V_util_getUrlQueryParams(u) {
    if (u === gUndefined)
        return {};

    let h = u.i("#");
    u = h > -1 ? u.ss(0, h) : u; // 只截取 URL 中 # 前的内容

    let si = u.i("?"),
        queryStr = u.ss(si > -1 ? si + 1 : V_length(u), V_length(u)), // 获取url中"?"符后的字串
        paramSet = {}, // 保存参数数据的对象
        itemSet = (V_length(queryStr) > 0) ? queryStr.sp("&") : [], // 取得每一个参数项,
        item = gNull,
        itemCount = V_length(itemSet);

    // 将所有参数拆解至数组中
    for (let i = 0; i < itemCount; i++) {
        item = itemSet[i].sp("=");
        paramSet[JS_decodeURIComponent(item[0])] = JS_decodeURIComponent(item[1]);
    }
    return paramSet;
}

/**
 * 获取 URL 中的锚点
 * @param u 完整的 URL 内容
 */
function V_util_getUrlHash(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("#");
    return i > -1 ? u.ss(i, V_length(u)) : _;
}

/**
 * 获取 URL 中的参数字符串
 * @param u 完整的 URL 内容
 */
function V_util_getUrlQueryString(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("?");
    return i > -1 ? u.ss(i + 1, V_length(u)) : _;
}

/**
 * 获取 URL 中的不含锚点的部分
 * @param u 完整的 URL 内容
 */
function V_util_getUrlWithoutHash(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("#");
    return i > -1 ? u.ss(0, i) : u;
}

/**
 * 获取 URL 中的不含锚点、参数的部分
 * @param u 完整的 URL 内容
 */
function V_util_getUrlWithoutQueryAndHash(u) {
    if (u === gUndefined)
        return _;

    let queryIdx = u.i('?');
    if (queryIdx > -1)
        u = u.ss(0, queryIdx);
    else {
        let hashIdx = u.i('#');
        if (hashIdx > -1)
            u = u.ss(0, hashIdx);
    }
    return u;
}

/**
 * 获得 URL 中的路径部分
 * @param u URL 地址
 */
function V_util_getPath(u) {
    let qi = u.i("?"),
        ti = u.ss(0, qi).lastIndexOf("/"),
        pi = ti === -1 ? 0 : ti;
    return u.ss(0, pi + 1);
}

/**
 * 获得当前时间
 */
function V_util_getTime() {
    return new Date().getTime();
}

/**
 * 获得当前页面拖选的文本
 */
function V_util_getSelectedText() {
    if (gWindow.getSelection)
        return JS_toString(gWindow.getSelection());
    else if (gDocument.selection && gDocument.selection.type !== "Control")
        return gDocument.selection.createRange().text;
    return _;
}

/**
 * 清理 HTML 中的单、双引号
 * @param text 原始文本
 * @return String 清理后的文本
 */
function V_util_clearHtmlQuot(text) {
    if (V_length(text) === 0)
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
function V_util_truncateText(text, limit) {
    let len = V_length(text);
    if (len <= limit)
        return text;

    // 遍历字符串，计算指定字符的总数，中文字符按 2 个字符计算
    let frontChars = __calcCharsLen(0, 1),
        backChars = __calcCharsLen(len - 1, -1);

    // 计算要保留的前面和最后的字符的数量
    frontChars = (frontChars > limit ? Math.ceil(frontChars / 2) : frontChars);
    backChars = (backChars > limit ? Math.ceil(backChars / 2) : backChars);

    // 截取字符串并添加省略号
    return text.ss(0, frontChars) + '...' + text.ss(len - backChars - 1, len - 1);

    /**
     * 计算指定长度字符的总数，中文字符按 2 个字符计算
     * @param init 初始值
     * @param step 步长
     */
    function __calcCharsLen(init, step) {
        let count = 0,
            i = init;
        while (count < limit) {
            count += (text.charCodeAt(i) > 255 ? 2 : 1)
            i += step;
        }
        return count;
    }
}

/**
 * 重定位至锚点
 * @return boolean true：已进行重定向，false：无须进行重定向
 */
function V_util_redirectTo() {
    let hash = WINDOW_getHash();
    // 如果 URL 带锚点
    if (V_length(hash) > 0 && hash !== "#" + _vkIdDocTitle_) {
        LOG("    ↩ Redirect to h: " + JS_decodeURI(hash));
        WINDOW_setHref("#"); // 强制先清空当前 hash
        WINDOW_setHref(hash);
        // 若最后访问的锚点与本次相同，则强制进行一次微调
        setTimeout(() => {
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
 * 检查是否为空对象
 */
// function V_util_isEmpty(target) {
//     return (target === gUndefined) || (target !== gUndefined && V_length(target) === 0);
// }

/**
 * 获取 CSS 变量值
 * @param varName CSS 变量名
 */
function V_util_getVarVal(varName) {
    return getComputedStyle(gDocument.documentElement).getPropertyValue(varName);
}

/**
 * 获取 CSS 变量值中的图片数据，即 url("data:image/png:xxxx") 中双引号内的数据
 * @param varName CSS 变量名
 */
function V_util_getImageData(varName) {
    return (varName === gUndefined ? _ : varName.ss(5, V_length(varName) - 2));
}

/**
 * 设置 CSS 变量值
 * @param varName CSS 变量名
 * @param value CSS 变量值
 */
function V_util_setVarVal(varName, value) {
    gDocument.documentElement.style.setProperty(varName, value);
}
/**
 * 获取 HTML 文档使用的模板主题
 */
function V_util_getTemplateThemeName() {
    return V_util_getVarVal("--v-theme-name").rA('"', _).x();
}
/**
 * 获取 HTML 文档使用的模板主题
 */
function V_util_getTemplateThemeVersion() {
    return V_util_getVarVal("--v-theme-version").rA('"', _).x();
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
        for (let i = 0, len = V_length(varSet); i < len; i++) {
            tmp.push(V_util_getVarVal(varSet[i] + "-" + flag));
        }
    }
    // 遍历所有变量实现 ColorScheme 切换
    for (let i = 0, len = V_length(varSet); i < len; i++) {
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
    str = str.r(gRE_CurrencyNoEscape2, ">$1");
    // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
    return str.r(/>([a-z$¥￥]{0,3})\s/i, ">" + V_ui_span(_vTblColFmtCurrency_, _, "$1"));
}
// ========================================

// ========================================
// 检查文档结构是否符合 VLOOK 规范程度
function V_checkSpec () {
    let v = gTrue,
        c = [
            "因以下原因无法激活 VLOOK™ 插件：\n\n",
            "The VLOOK™ plugin cannot be activated for the following reasons:\n\n"
            ][V_lang];

    // 只支持由 Typora 导出的 HTML 文件
    if (DOM_body().a(_class_).i("typora-export") === -1) {
        c += [
            "• 只支持由 Typora 导出的 HTML 文件\n",
            "• Only HTML files exported by Typora are supported\n"
            ][V_lang];
        v = gFalse;
    }

    // 缺少目录
    gToc = V_byClass(_mdToc_);//V_by_Class(_vMdToc_);
    if (V_length(gToc) === 0) {
        c += [
            "• 缺少 [TOC], 这是 GFM 标准的「目录」语法\n",
            '• Missing [TOC], the GFM standard "' + V_lang_text35() + '"\n'
            ][V_lang];
    }

    // 存在不符合规范的情况
    if (!v) {
        c += [
            "\n建议参考推荐的文档模板或示例：",
            "\nIt is recommended to refer to the suggested " + _document_ + " templates or samples:"
        ][V_lang] + "\nreleased/samples/*.md";

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
    iFontStyle = new FontStyle(new BgMask(_fontStyle_, _center_), V_util_getVarVal("--v-f-" + _style_));
    if (iFontStyle === gFalse)
        ALERT(_failed_ + "iFntThm ]");
    else {
        let fontStyle = V_util_getParamVal(_font_); // 调校参数指定
        // 如调校参数指定为 theme ，则清空同域名配置中保存的配置数据
        if (fontStyle != gNull && fontStyle === _theme_)
            V_data_remove(_fontStyle_, gTrue);
        // 如调校参数无指定，再检查在同域名配置中是否有指定
        else if (fontStyle == gNull) {
            fontStyle = V_data_read(_fontStyle_, gTrue);
            fontStyle = (fontStyle == gNull ? gUndefined: fontStyle);
        }
        // 初始化
        iFontStyle.init(fontStyle);
    }
    sw.ed("    ├ Font Style: ");

    // ==================== UI====================

    // 聚光灯
    sw.st();
    iSpotlight = new Spotlight(180);
    if (iSpotlight === gFalse)
        ALERT(_failed_ + "iSpotlight ]");
    sw.ed("    ├ Spotlight: ");

    // 激光笔
    iLaserPointer = new LaserPointer();
    if (iLaserPointer === gFalse)
        ALERT(_failed_ + "iPter ]");
    sw.ed("    ├ LaserPointer: ");

    // 长内容折叠
    sw.st();
    let cf = V_util_getParamVal(_fold_);
    ContentFolder_enabled = (cf !== _off_);
    // 指定对象（table,figure,codeblock）启用的处理
    if (cf != gNull && cf !== _on_ && cf !== _off_) {
        ContentFolder_enabled_table = (cf.i(_table_) > -1);
        ContentFolder_enabled_figure = (cf.i(_figure_) > -1);
        ContentFolder_enabled_codeblock = (cf.i(_codeblock_) > -1);
    }
    ContentFolder_init();
    sw.ed("    ├ Content Folding: ");

    // 工具提示
    ToolTips_init();

    // 底部提示
    BottomTips_init();

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BgMask(_infoTips_, _center_));
    if (V_length(iInfoTips) === 0)
        ALERT(_failed_ + "iInfoTips ]");

    // 导航中心
    sw.st();
    iNavCenter = new NavCenter(new BgMask(_navCenter_, _left_, gTrue), V_util_getParamVal(_nav_));
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
    sw.ed("    ├ " + _Chapter_ + " Nav: ");

    // 工具栏
    sw.st();
    iToolbar = new Toolbar(iNavCenter, iChapterNav);
    if (iToolbar === gFalse)
        ALERT(_failed_ + "iTb ]");
    else {
        // 导航中心按钮
        iToolbar.add(_navCenter_, () => {
            // 针对当前只显示了文库的处理
            if (iNavCenter.keyword.input.v() === _vdl_) {
                iNavCenter.keyword.clear();
                // 小屏时仍正常切换显示大纲
                if (V_ui_isSmallScreen())
                    iNavCenter.tg();
                return;
            }

            iNavCenter.tg();
        });

        // 文库
        iToolbar.add(_docLib_, () => {
            if (iNavCenter.docLib === gUndefined)
                return;

            if (iNavCenter.docLib.counter > 1) {
                if (!iNavCenter.showed)
                    iNavCenter.tg();
                // 选中目录分段
                iNavCenter.segs.setChecked(_toc_);
                // iNavCenter.segs.setChecked(_catalog_);
                // 设置关键字搜索的内容
                // iNavCenter.keyword.input.v(_vdl_);
                iNavCenter.keyword.processInput(_vdl_);
                // iNavCenter.keyword.onInput(_vdl_);
            }
            else
                iNavCenter.docLib.show(_, _);
        });

        // 分隔条
        iToolbar.addSpliter(_toolbarSpliter_);

        // 段落导航
        iToolbar.add(_paragraphNav_, () => {
            iInfoTips.inform(V_lang_text(4, [
                    "如何开启？",
                    "How to enable?"
                ])
                + _br_ + _br_ + V_ui_strong(V_lang_text(5, [
                    "在文档中的任何段落上用鼠标三击",
                    "Triple-click with the mouse on any " + _paragraph_ + " in the " + _document_
                ])), 10000, gTrue);
        });

        // 聚光灯
        iToolbar.add(_spotlight_, () => {
            iLaserPointer.hide();
            iParagraphNav.hide();
            iSpotlight.tg();
        });

        // 激光笔
        iToolbar.add(_laserPointer_, () => {
            iSpotlight.hide();
            iParagraphNav.hide();
            iLaserPointer.tg()
        });

        // 添加关联组件
        iNavCenter.toolbar = iToolbar;
        iSpotlight.toolbar = iToolbar;
        iLaserPointer.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontStyle.bindButton(iToolbar.btns[_fontStyle_]);
    }
    sw.ed("    ├ Toolbar: ");

    // 插图浏览器
    FigureNav_init();

    // ----------------------------------------
    sw.st();

    // 文档更多内容栏遮罩栏
    MoreDocContent_init();

    // 脚注
    iFootnote = new Footnote(new BgMask(_footnote_, _bottom_, gTrue));
    if (iFootnote === gFalse)
        ALERT(_failed_ + "iFootnote ]");

    // 状态栏
    StatusBar_init();

    // 状态栏相关
    NewVersion_init();
    StsColorScheme_init();
    LinkTool_init(new BgMask(_linkChecker_, _right_, gTrue));

    sw.ed("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
function V_initKernel() {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.st("* " + _Document_ + " Logo");
    V_ui_changeDocIcon(V_util_getVarVal("--thm-fav-logo-lg"));
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 无封面时的处理
    if (VOM_cover() === gUndefined) {
        // 添加文档大标题
        VOM_doc().pp(V_ui_div(_vkIdDocTitle_, _vDoc__ + _title_ +___+ V_pageMode, V_util_getDocTitle()));
    }

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.st("* UI i18n");
    V_ui_initI18n();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化题注生成器配置
    if (V_util_getParamVal("capauto") === _off_)
        CaptionGenerator_autoContent = gFalse;

    if (V_util_getParamVal("capgroup") !== _off_) {
        iStopwatch.st("* Caption preprocess: ");
        CaptionGenerator_preprocess();
        iStopwatch.ed(_4space_);
    }

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
    // 须在 ExtFigure 处理前，避免详情折叠处理中，对其内含有 svg 颜色替换处理导致 DOM 冲突而失效
    iStopwatch.st("* Quote: ");
    ExtQuote_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 检查 hash 集
    if (V_util_getParamVal(_checkHash_) === "1") {
        LinkTool_checkHashMode = gTrue;
        // 检查 hash 集
        if (LinkTool_checkHashSet())
            LinkTool_checkHashUI.show();
    }

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

    // ----------------------------------------
    // 初始化代码块
    iStopwatch.st("* Code Block: ");
    ExtCodeBlock_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化公式
    iStopwatch.st("* Math: ");
    ExtMath_init();
    iStopwatch.ed(_4space_);

    // ========================================
    // 对 Code Magic 处理
    // 注意：须在 ExtQuote 初始化之后执行
    // 包括了：标签、徽章、引用块着色、刮刮卡、文字注音等
    iStopwatch.st("* Code & Xscript °Magic: ");
    ColorCode_init();
    CodeMagic_init();
    SupSubMagic_preprocess();
    Progressbar_init();
    iStopwatch.ed(_4space_);
    // ========================================

    // ----------------------------------------
    // 增强脚注
    iStopwatch.st("* Foot Note: ");
    Footnote.init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 分步分级处理
    iStopwatch.st("* Stepwise: ");
    BreadcrumbStyle_init();
    iStopwatch.ed(_4space_);

    // 对 VLOOK UI 统一样式适配处理
    V_ui_adjustHoverStyle2();

    // 主要针对小屏情况，完成表格初始化后进行适配
    // 如果不是小屏，则由 adjustAll 触发
    ContentFolder_adjust();

    // ----------------------------------------
    // 初始化 导航中心、章节导航 数据
    iStopwatch.st("* NavCenter");
    let navOK = NavCenter.init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 界面适配
    iStopwatch.st("* Adjust NavCenter/ChapterNav/FigureNav/Toolbar/StatusBar");
    if (navOK) {
        if (!V_util_isMobile())
            iNavCenter.showHandle();

        // iNavCenter.adjust();
        // iChapterNav.adjust();
        // iToolbar.adjust();
        V_ui_adjustAll();

        // 根据设备类型自适应 hover 样式
        iNavCenter.toc.adjustHoverStyle();
        iChapterNav.adjustHoverStyle();
        FigureNav_adjustHoverStyle();
    }
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 检查页内链接坏链
    // 因涉及对 xmd 的处理，需要在文库处理之前（DocLib）进行
    iStopwatch.st("* Check Hash Link: ");
    LinkTool_mdToHtml();
    LinkTool_checkLink();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 自动生成可通过 DOM 引用块的目录自动编号
    ChpAutoNum_initToc();

    // ----------------------------------------
    // 文档没有任何可索引的对象时，默认不显示导航中心
    let hasToc = iNavCenter.toc.hasIndexItem(),
        hasFigure = iNavCenter.figures.hasIndexItem(),
        hasTable = iNavCenter.tables.hasIndexItem(),
        hasCodeblock = iNavCenter.codeblocks.hasIndexItem(),
        hasFormula = iNavCenter.formulas.hasIndexItem(),
        hasMedia = iNavCenter.media.hasIndexItem();
    if (!hasToc && !hasFigure && !hasTable && !hasMedia && !hasCodeblock)
            iNavCenter.runMode = "closed";
    // 默认选择首个不为空的索引分类
    else {
        let itemName = _toc_;
        // let itemName = _catalog_;
        if (hasToc)
            itemName = _toc_;
        // itemName = _catalog_;
        else if (hasFigure)
            itemName = _figure_;
        else if (hasTable)
            itemName = _table_;
        else if (hasFormula)
            itemName = _formula_;
        else if (hasCodeblock)
            itemName = _codeblock_;
        else if (hasMedia)
            itemName = _media_;

        iNavCenter.segs.setChecked(itemName);
    }

    // ----------------------------------------
    iStopwatch.st("* Binding Event");
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    gDocument.addEventListener("mousemove", (event) => {
        iSpotlight.repaint(event);
        iNavCenter.snap(event);
    });

    // to-do
    // mmMindmap_init();

    // 绑定文档的单击事件
    jq_Document.uC().ck((event) => {
        TableCross_hide();
    });

    // 绑定文档的鼠标滚轮事件
    // gDocument.addEventListener("mousewheel", (event) => {
    gDocument.addEventListener(_wheel_, (event) => {
        // 忽略处理，提升性能
        return false;
    }, false);

    // 添加可见性变化事件监听器，即监控非当前窗口和当前窗口之间的切换
    gDocument.addEventListener('visibilitychange', (event) => {
        // 页面不可见时，暂停递归调用
        if (gDocument.hidden) {
            gIsRunning = false;
            clearTimeout(gTimer_saveLastPosition);
        }
        // 页面可见时，继续递归调用
        else {
            if (!gIsRunning) {
                gIsRunning = true;
                // 恢复保存最后浏览位置的功能
                ResumeReading_dispose(gTrue);
            }
        }
    });

    // 绑定文档滚动、页面滚动事件
    jq_Document.on(_scroll_, () => {
        let currentTime = V_util_getTime(),
            scrollTop = V_util_getScrollTop(),
            scrollBottom = scrollTop + jq_Window.h(),
            timeInterval = gFalse,
            docHeight = jq_Document.h();

        // 显示或隐藏文档更多内容遮罩栏
        if (scrollTop < gScrollEdge
            || scrollBottom > (docHeight - gScrollEdge)
            || currentTime - V_doc_scroll_lastUpdate > 500)
                MoreDocContent_refresh(scrollTop);

        // ----------------------------------------
        // 控制执行频率，避免处理过多影响性能
        if (scrollTop < gScrollEdge
            || scrollBottom > (docHeight - gScrollEdge)
            || (timeInterval = (currentTime - V_doc_scroll_lastUpdate) > 500)
            || (timeInterval && Math.abs(scrollTop - V_doc_scroll_lastTop) > gScrollStep)) {
                // 更新控制执行频率相关判断数据
                V_doc_scroll_update(currentTime, V_util_getScrollTop());
                // 根据是屏幕大小进行不同的适配控制
                V_ui_adjustAll();
        }

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iNavCenter.toc.focusHeader(scrollTop);
    });

    // 绑定窗口大小缩放事件
    jq_Window.on("resize", () => {
        TableCross_hide();
        iNavCenter.toc.focusHeader();
        V_ui_adjustAll();
        ExtQuote_uniteColumnsHeight();
    });

    // 接收消息数据
    gWindow.onmessage = function(event) {
        // 校验消息合法性
        let receMessage = JS_toString(event.data);
        LOG("<- " + event.origin + "\n" + receMessage);
        if ((event.origin !== StsNewVersion_checkOriginCloudFlare
            && event.origin !== StsNewVersion_checkOriginGitHub)
            || (!receMessage.sW(_chkUpdate_) && receMessage.length > 15))
            return;

        // 处理消息
        if (receMessage.i(":yes") > -1)
            JQ_addClass(StsNewVersion_ui, _enabled_);
    };

    // 绑定打印前的触发事件
    gWindow.onbeforeprint = function () {
        if (V_pageMode === _mini_)
            return;
        // 不是通过 VLOOK 打印按钮进行打印时进行提醒
        if (V_print_mode !== _VLOOK_)
            ALERT(V_lang_text(80, [
                "注意！为确保打印正常，建议使用文档内的【打印】功能进行打印！",
                "Attention! To ensure proper printing, it is recommended to use the [Print] function within the " + _document_ + "!"
            ]));
    };
    // 绑定打印后的触发事件
    gWindow.onafterprint = function () {
        if (V_pageMode === _mini_)
            return;
        V_print_done();
    };

    // 监听页内锚点链接跳转
    // 注意：同一个锚点连续点击不会触发该事件
    jq_Window.on("hashchange", (event) => {
        let hash = WINDOW_getHash(),
            anchor = hash.ss(1, V_length(hash));
        if (V_length(anchor.x()) === 0 || anchor.sW("#"))
            return;

        // iNavCenter.history.add(hash);

        // 页内位置改变后，微调滚动条位置
        if (gLastHash == gNull || gLastHash !== hash) {
            // 其中对于 Firefox 若不延时微调会存在微调无效的情况
            setTimeout(() => {
                V_ui_tuningScrollTop(JS_decodeURI(anchor));
            }, env.browser.Firefox ? 300 : 0);
        }
        gLastHash = hash;

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

    // ----------------------------------------
    // 检查是否使用了 Typora 的图片缩放功能
    Restyler_forImgZoom();
    sw.ed("    └ Img Zoom: ");
}

// ========================================
// VLOOK UI 包
let V_ui_effect = 0, // 0: 无动效
    V_ui_processingAdjust= gFalse;

/**
 * 淡入显示
 * @param target 目标对象
 */
function V_ui_fadeShow(target) {
    if (target === gUndefined)
        return;

    target.c(_visibility_, _visible_)
        .c(_opacity_, 1);
}

/**
 * 淡出隐藏
 * @param target 目标对象
 */
function V_ui_fadeHide(target) {
    if (target === gUndefined)
        return;

    target.c(_visibility_, _hidden_)
        .c(_opacity_, 0);
}

// --- 保留备用 ---
// --- 目前通过调整父级元素（ body, content ）的 overflow 属性解决 ---
/**
 * 停止滚动事件，在指定对象滚动到顶部、底部后冒泡到其他对象
 * @param target 滚动内容对象
 */
// function V_ui_stopScrollPropagation(target) {
//     target[0].addEventListener(_wheel_, (event) => {
//         let scrollTop = V_util_getScrollTop(target),
//             isAtTop = (scrollTop === 0),
//             isAtBottom = (Math.round(scrollTop + target.oH()) >= Math.round(target[0].scrollHeight));

//         // 如果到达顶部或底部，阻止默认的滚动行为
//         if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0))
//             event.preventDefault();
//     });
// }

/**
 * 用 <kdb> 标签包裹内容
 * @param content 被包裹的内容
 */
function V_ui_wrap_kbd(content) {
    return "<kbd>" + content + "</kbd>"
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
 * 获得 VLOOK 与技术支持信息内容
 * @returns string VLOOK 与技术支持信息内容
 */
function V_ui_copyrightInfo() {
    return V_ui_div(_, _vCopyright_,
        V_ui_svgIcon(_icoVLOOK_, 20, 20, _btnFc_, _vCopyrightSvgIco_)
        + _2nbsp_
        + 'Published with ' + V_ui_a(_, _httpsPrefix_ + _githubVlook_, V_ui_strong(_VLOOK_), __blank_)
        + '™ (V26.1) &amp; ' + V_ui_a(_, _httpsPrefix_ + "www.typora.io", V_ui_strong("Typora"), __blank_) + '.' + _2nbsp_
        + 'Support: ' + V_ui_a(_, _httpsPrefix_ + "qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi", V_ui_strong("QQ Group"))
        + ' / ' + V_ui_a(_, 'mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + V_ver + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + JS_encodeURI(env.print(gTrue)), V_ui_strong("Email")) + '.'
    );
}

/**
 * 判断是否为小屏
 */
function V_ui_isSmallScreen() {
    return jq_Window.oW() <= gSmallScreenWidth;
}

/**
 * 判断是否在任意章节中（不包括封面）
 */
function V_ui_inHeader() {
    return iNavCenter.toc.inHeader();
}

/**
 * 微调页内跳转后的滚动条位置
 * @param anchor 锚点名称，不含 #，如含 # 会自动过滤
 */
function V_ui_tuningScrollTop(anchor) {
    if (anchor !== gUndefined && anchor.sW("#"))
        anchor = anchor.ss(1, V_length(anchor));
    if (anchor === gUndefined || V_length(anchor.x()) === 0 || anchor.sW("#"))
        return;

    let t = JS_parseInt(iChapterNav.ui.c(_top_)),
        h = JS_parseInt(iChapterNav.ui.c(_height_)),
        y = 10,
        aObj = V_byID(JS_decodeURI(anchor) + ",a" + V_attrCSS(_name_, anchor)),
        tag = V_util_getTagName(aObj);

    // 判断是否为 h1-6
    if ("h1h2h3h4h5h6".i(tag) > -1) {
        y += (tag === _h6_)
            ? (t + h + 16)
            : (aObj.h() + 10 + (JS_parseInt(tag.ss(1, 2)) - 1) * 6);
        y -= JS_parseInt(V_util_getVarVal("--v-top-margin"));
    }
    // 从底部脚注列表回到脚注位置
    else if (anchor.sW(_refFootnote_))
        y += 70;
    // 其他情况
    else
        y += t + h;
    // 微调滚动位置
    V_util_setScrollTop(V_util_getScrollTop() - y);
}

/**
 * 生成 jQuery / CSS 选择器 :not() 的内容
 * @param value 属性值
 */
function V_not(value) {
    return ":not(" + value + ")";
}

/**
 * 生成 HTML 标签属性与值内容（指定关系运算符）
 * @param attrName 属性名称
 * @param attrValue 属性值
 */
function V_attr(attrName, attrValue) {
    return attrName + '="' + attrValue + '"';
}

/**
 * 生成 jQuery / CSS 选择器的属性与值内容
 * @param attrName 属性名称
 * @param attrValue 属性值
 * @param op 关系运算符，不指定时默认为 =，可添加指定前缀，如 * ^ !
 */
function V_attrCSS(attrName, attrValue, op) {
    if (op === gUndefined)
        op = "=";
    else
        op += "=";
    attrValue = (attrValue !== gUndefined) ? op + '"' + attrValue + '"': _;
    if (V_length(attrName) > 0 )
        attrValue += "]";
    return "[" + attrName + attrValue;
}

/**
 * 修改文档的图标（即用于收藏夹、标签栏的图标）
 * @param iconData 图标数据，url("data:image/png:xxxx") 中的双引号内的内容
 */
function V_ui_changeDocIcon(iconData) {
    JQ_remove(V_byID(_docIcon_));
    $("head").ap(V_ui_linkIcon(_docIcon_, V_util_getImageData(iconData)));
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
    // 生成 class 内容
    classValue = (classValue !== gUndefined && V_length(classValue) > 0) ? ___+ classValue : _;
    // 生成扩展的属及值
    extAttr = (extAttr !== gUndefined && V_length(extAttr) > 0) ? ___+ extAttr : _;
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
 * 生成 svg 的 path 标签
 * @param d d 属性的内容
 * @param fill fill 属性的内容
 * @returns
 */
function V_ui_path(d, fill) {
    fill = (fill !== gUndefined && V_length(fill) > 0) ? ___+ V_attr(_fill_, fill) : _;
    return '<path d="' + d + '"' + fill + '/>';
}

/**
 * 生成 img 标签
 * @param classValue class 属性值
 * @param alt alt 属性值
 * @param src src 属性值
 * @param srcset srcset 属性值
 */
function V_ui_img(classValue, alt, src, srcset) {
    classValue = (classValue !== gUndefined && V_length(classValue) > 0) ? ___+ V_attr(_class_, classValue) : _;
    alt = (alt !== gUndefined && V_length(alt) > 0) ? ___+ V_attr(_alt_, alt) : _;
    src = (src !== gUndefined && V_length(src) > 0) ? ___+ V_attr(_src_, src) : _;
    srcset = (srcset !== gUndefined && V_length(srcset) > 0) ? ___+ V_attr(_srcset_, srcset) : _;
    return '<' + _img_ + classValue + alt + src + srcset + '>';
}

/**
 * 生成 iframe 标签
 * @param id id 属性值
 * @param name name 属性值
 */
function V_ui_iframe(id, name) {
    name = (name !== gUndefined && V_length(name) > 0) ? ___+ V_attr(_name_, name) : _;
    return V_ui_htmlTag(_iframe_, id, _, name, _);
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
    id = (id !== gUndefined && V_length(id) > 0) ? ___+ V_attr(_id_, id) : _;
    name = (name !== gUndefined && V_length(name) > 0) ? ___+ V_attr(_name_, name) : _;
    type = (type !== gUndefined && V_length(type) > 0) ? ___+ V_attr(_type_, type) : _;
    value = (value !== gUndefined && V_length(value) > 0) ? ___+ V_attr(_value_, value) : _;
    extAttr = (extAttr !== gUndefined && V_length(extAttr) > 0) ? ___+ extAttr : _;
    return '<' + _input_ + id + name + type + value + extAttr + ' />';
}

/**
 * 生成 figure 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
*/
function V_ui_figure(classValue, extAttr, content) {
    return V_ui_htmlTag("figure", _, classValue, extAttr, content);
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
 * 生成 nav 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param content 标签的内容
 */
function V_ui_nav(idValue, classValue, content) {
    return V_ui_htmlTag(_nav_, idValue, classValue, _, content);
}

/**
 * 生成 aside 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_aside(idValue, classValue, extAttr, content) {
    return V_ui_htmlTag("aside", idValue, classValue, extAttr, content);
}

/**
 * 生成 article 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param content 标签的内容
 */
function V_ui_article(idValue, classValue, content) {
    return V_ui_htmlTag("article", idValue, classValue, _, content);
}

/**
 * 生成 header 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param content 标签的内容
 */
function V_ui_header(idValue, classValue, content) {
    return V_ui_htmlTag("header", idValue, classValue, _, content);
}

/**
 * 生成 section 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param content 标签的内容
 */
function V_ui_section(idValue, classValue, content) {
    return V_ui_htmlTag("section", idValue, classValue, _, content);
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
function V_ui_divExt(idValue, classValue, extAttr, content) {
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
 * 生成 link icon 标签
 * @param idValue id 属性值
 * @param href href 的内容
 */
function V_ui_linkIcon(idValue, href) {
    return "<" + _link_ + " rel='icon' id='" + idValue + "' href='" + href + "'/>";
}

/**
 * 生成 a 标签
 * @param idValue id 属性值
 * @param href href 属性值
 * @param content 标签的内容
 * @param target href 属性值
 */
function V_ui_a(idValue, href, content, target) {
    href = (href !== gUndefined && V_length(href) > 0) ? ___+ V_attr(_href_, href): _;
    target = (target !== gUndefined && V_length(target) > 0) ? ___+ V_attr(_target_, target) : _;
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
    // 标签的 id 属性
    idValue = (idValue !== gUndefined && V_length(idValue) > 0) ? ___+ V_attr(_id_, idValue) : _;
    // 标签的 class 属性
    classValue = (classValue !== gUndefined && V_length(classValue) > 0) ? ___+ V_attr(_class_, classValue) : _;
    // 标签的扩展属性与取值
    extAttr = (extAttr !== gUndefined && V_length(extAttr) > 0) ? ___+ extAttr : _;
    // 标签的内容
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
    if (target === gUndefined)
        return false;
    let mx = event.pageX || event.clientX + gDocument.body.scrollLeft,
        my = event.pageY || event.clientY + gDocument.body.scrollTop;
    return !(mx <= target.oL() || mx >= (target.oL() + JS_parseInt(target.oW()))
        || my <= target.oT() || my >= (target.oT() + JS_parseInt(target.oH())));
}

/**
 * 将预置颜色标识转换为驼峰格式
 * @param color 预置的颜色标识
 */
function V_ui_campColor(color) {
    // 渐变色
    if (V_length(color) > 3) {
        let gradientColors = V_ui_splitColors(color),
            count = V_length(gradientColors),
            colorStr = _, gColor;
        for (let i = 0; i < count; i++) {
            gColor = gradientColors[i];
            colorStr += gColor.charAt(0).u() + gColor.slice(1);
        }
        return colorStr;
    }
    // 单色
    return color.charAt(0).u() + color.slice(1);
}

/**
 * 拆分渐变的预置颜色标识
 * @param color 预置的颜色标识
 * @return Array[] 颜色标识数组
 */
function V_ui_splitColors(color) {
    let gradientColors = color.l().sp(/(\S{2})/i);
    return gradientColors.filter(item => item !== _);
}

/**
 * 将 HEX 颜色格式转换为 RGB 数组
 * @param hex 十六进制格式颜色，如：#F1A2C3
 */
function V_ui_hexToRGB(hex) {
    let rgb = [];
    rgb.push(JS_parseInt(hex.ss(1, 3), 16));
    rgb.push(JS_parseInt(hex.ss(3, 5), 16));
    rgb.push(JS_parseInt(hex.ss(5, 7), 16));

    return rgb;
}

/**
 * 格式化颜色为 rgba 格式
 * @param rgb RGB 颜色分量数组
 * @param opacity 透明度，0:透明，1:不透明
 */
function V_ui_formatRGBA(rgb, opacity) {
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
}

/**
 * 生成文本渐变色 CSS 代码
 * @param gradientColors 渐变色色号内容，如：RdBuYe
 * @param fade 透明度子标识
 * @param suffix 颜色后缀子标识
 */
function V_ui_genGradColorCSS(gradientColors, fade, suffix) {
    let css = _,
        count = V_length(gradientColors),
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
    iToolbar.btns[_navCenter_].a(_dataTips_, V_lang_text6() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("O")));

    iToolbar.btns[_docLib_].a(_dataTips_, V_lang_text7() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("L")));

    iToolbar.btns[_paragraphNav_].a(_dataTips_, V_lang_text(8, [
        "段落导航 模式",
        "Paragraph Navigation mode"
    ]));

    iToolbar.btns[_spotlight_].a(_dataTips_, V_lang_text(9, [
        "聚光灯",
        _Spotlight_
    ]) + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("S")));

    iToolbar.btns[_laserPointer_].a(_dataTips_, V_lang_text(10, [
        "激光笔",
        "Laser Pointer"
    ]) + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("P")));

    iChapterNav.prev.ui.a(_dataTips_, V_ui_wrap_kbd("←") +___+ V_lang_text(15, [
        "前一个",
        _Previous_
    ]));

    iChapterNav.next.ui.a(_dataTips_, V_lang_text(16, [
        "后一个",
        _Next_
    ]) +___+ V_ui_wrap_kbd("→"));

    iChapterNav.dt.a(_dataTips_, V_lang_text(13, [
        "回到封面",
        "Go back to the " + _document_ +___+ _cover_
    ]));

    iChapterNav.current.ui.a(_dataTips_, V_lang_text(14, [
        "回到本章的开始",
        "Go back to the beginning of this chapter"
    ]));

    FigureNav_btns.prev.a(_title_, "[ ← ] " + V_lang_text(15, [
        "前一个",
        _Previous_
    ]));

    FigureNav_btns.next.a(_title_, V_lang_text(16, [
        "后一个",
        _Next_
    ]) + " [ → ]");

    FigureNav_btns.close.a(_title_, "[ ESC ] " + V_lang_text(17, [
        "关闭",
        _Close_
    ]));

    // iFontTheme.ui.f("." + _vFontPackage_).t(V_lang_text(18, [
    //     "字体",
    //     _Font_
    // ]) +___);

    iFontStyle.ui.f("." + _vFontStyleDownload_).hm(V_lang_text(19, [
        "若无法连接互联网加载在线版本字体，建议将字体直接下载到本地",
        "If you cannot connect to the Internet to load the online version of the font, it is recommended to download the font directly to the local"
    ]) + " (" + V_ui_a(_, "https://pan.baidu.com/s/1TSHwjuOOpR8UM08Fs8vOxg?pwd=9981", V_lang_text(20, [
        "主站链接",
        "Primary link"
    ])) + " | " + V_ui_a(_, "https://drive.google.com/file/d/1EkWwYtGBovdH53fF3fubLYPgKle3JrRR/view?usp=sharing", V_lang_text(21, [
        "备用链接",
        "Secondary link"
    ])) + ")");
}

/**
 * 移动到中间
 * @param target 源对象
 */
function V_ui_moveToCenter(target) {
    let l = (jq_Window.w() - target.w()) / 2,
        r = _auto_;
    if (V_util_isMobile()) { // 移动端
        l = 10;
        r = 10;
    }

    target.c(_left_, l)
        .c(_right_, r)
        .c(_top_, (jq_Window.h() - target.h()) / 2);
}

/**
 * 移动到中间
 * @param source 源对象
 * @param target 目标对象
 */
function V_ui_moveToTarget(source, target) {
    let l = target.oL(),
        w = JS_parseInt(source.oW());

    if (l + w + 10 > jq_Window.w())
        l = jq_Window.w() - w - 10;

    source.c(_left_, l)
        .c(_top_, target.oT() - V_util_getScrollTop() + target.h() + 10);
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

    let measure = iToolbar.adjust();
    // 适配相关的 UI
    ResumeReading_updateUI(measure);
    StatusBar_updateUI(measure);
    // iFontStyle.updateUI(measure);

    MoreDocContent_updateUI();

    V_ui_processingAdjust = gFalse;
}

/**
 * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
 */
function V_ui_adjustAllDelay() {
    setTimeout(() => {
        V_ui_adjustAll();
        ExtQuote_uniteColumnsHeight();
    }, 500);
}

/**
 * 根据设备类型自适应 hover 样式（单个）
 */
function V_ui_adjustHoverStyle(target) {
    // 移动设备时解绑样式事件
    if (V_util_isMobile())
        target.uH();
    // 非移动设备时绑定样式事件
    else
        V_ui_bindHover(target);
}

/**
 * 根据设备类型自适应 hover 样式（多个）
 */
function V_ui_adjustHoverStyle2() {
    // 移动设备时解绑样式事件
    if (V_util_isMobile()) {
        $(_vBtn__BtnGroup_).uH();
        V_byClass(_vSegmentBtn_).uH();
        V_byClass(_vResumeReading_).uH();
        StatusBar_ui.f(V_not(V_attrCSS(_class_, _vDocInfo_, "*"))).uH();
        V_byID(_docLibToc_ + ">." + _vDocLibItem_).uH();
        V_byClass(_vStdCode_ + ",." + _vTag_ + ",." + _vBadgeName_).uH();
        V_byClass(_vBadgeValue_).uH();
        V_byClass(_vTocItem_).uH();
        V_byClass(_vMapItem_).uH();
        $(_summary_).uH();
        $(_vTblRowGBtn_).uH();
    }
    // 非移动设备时绑定样式事件
    else {
        // 所有常规按钮 hover 事件处理
        V_ui_bindHover($(_vBtn__BtnGroup_));
        // 所有导航中心分段控制按钮 hover 事件处理
        V_ui_bindHover(V_byClass(_vSegmentBtn_));
        V_ui_bindHover(V_byClass(_vResumeReading_));
        // 状态栏上的按钮
        V_ui_bindHover(StatusBar_ui.ch(V_not(V_attrCSS(_class_, _vDocInfo_, "*"))));
        // 文库按钮 hover 事件处理
        V_ui_bindHover(V_byID(_docLibToc_ + ">." + _vDocLibItem_));
        // 代码、标签类 hover 事件处理
        V_ui_bindHover(V_byClass(_vStdCode_));
        V_ui_bindHover(V_byClass(_vBadgeName_));
        V_ui_bindHover(V_byClass(_vBadgeValue_), gTrue);
        V_ui_bindHover(V_byClass(_vTocItem_));
        V_ui_bindHover(V_byClass(_vMapItem_));
        V_ui_bindHover($(_summary_));
        V_ui_bindHover($(_vTblRowGBtn_));
    }
}

/**
 * 为对象绑定 mouseenter 和 mouseleave 事件
 * @param target 目标对象
 * @param cancleParent 是否临时模拟取消父元素的 hover 处理（即 mouseenter 和 mouseleave）
 */
function V_ui_bindHover(target, cancleParent) {
    target.on(_mouseEnter_, (event) => {
        let _t = $(event.currentTarget);
        JQ_addClass(_t, _hover_);
        if (cancleParent)
            JQ_removeClass(_t.p(), _hover_);
    }).on(_mouseLeave_, (event) => {
        let _t = $(event.currentTarget);
        JQ_removeClass(_t, _hover_);
        if (cancleParent)
            _t.p().tr(_mouseEnter_);
    });
}

/**
 * 为对象取消 hover 事件绑定
 * @param target 目标对象
 */
function V_ui_unbindHover(target) {
    target.unbind(_mouseEnter_).unbind(_mouseLeave_);
}

/**
 * 初始化动效处理
 */
function V_ui_initEffectLevel() {
    // 动效等级为 2 或更高级时才开启毛玻璃动效（如遮罩、插图浏览器背景）
    if (V_ui_effect >= 2)
        JQ_addClass(V_byClass(_vBackdropBlurs_), _enabled_);

    // 以下动效等级为 1 或更高级时才开启
    // 开启后会影响图片剪影的 hover 效果（会有闪烁）
    // V_ui_addAnimate($("a " + _kbd_ + ",a " + _img_));

    // 针对移动端进行微调
    if (V_util_isMobile()) {
        JQ_removeClass(V_byClass(_vBackdropBlurs_), _enabled_);
        JQ_addClass(V_byClass(_vPostCard_ + "." + _hover_), _disabled_);
    }
}

/**
 * 为指定对象添加过渡动画
 * @param t 目标对象
 * @param css 应用的属性，不指定时默认为 “all”
 */
function V_ui_addAnimate(t, css) {
    if (V_ui_effect >= 1) {
        if  (css === gUndefined)
            JQ_addClass(t, _vTransitionAll_);
        else {
            let attrSet = css.sp(___);
            for (let i = 0; i < V_length(attrSet); i++)
                JQ_addClass(t, _vTransition__ + attrSet[i]);
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
        for (let i = 0; i < V_length(attrSet); i++)
            JQ_removeClass(t, _vTransition__ + attrSet[i]);
    }
}

/**
 * 初始化热键
 */
function V_ui_initHotkey() {
    // 键盘按下事件
    jq_Document.on(_keydown_, (event) => {
        const // code = event.code,//event.keyCode || event.which || event.charCode,
            key = event.key,
            combKeys = (event.ctrlKey ? V_ui_getCtrlKeyUI(true) : _)
                + (event.shiftKey ? V_ui_getShiftKeyUI(true) : _)
                + (event.altKey ? V_ui_getAltKeyUI(true) : _)
                + (event.metaKey ? V_ui_getMetaKeyUI(true) : _);

        DEBUG(`CombKeys[${combKeys}] key[${key}] code[${event.code}]`);

        // 按下 alt / option 键
        if (V_ui_holdKey_Alt(event) === gTrue) {
            ContentAssistor_toggleCopyMode(gTrue);
        }

        // 热键操作处理
        iSpotlight.disposeHotkey(key, combKeys, event);
        iLaserPointer.disposeHotkey(key, combKeys, event);
        iParagraphNav.disposeHotkey(key, combKeys, event);
        WelcomePage_disposeHotkey(key, combKeys, event);
        FigureNav_disposeHotkey(key, combKeys, event);
        iNavCenter.disposeHotkey(key, combKeys, event);
        iFontStyle.disposeHotkey(key, combKeys, event);
        iInfoTips.disposeHotkey(key, combKeys, event);
        iFootnote.disposeHotkey(key, combKeys, event);
        LinkTool_disposeHotkey(key, combKeys, event);

        // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
        if (V_doc_block || gDocument.activeElement.tagName.l() !== _body_)
            return;

        // 逐章导航热键操作处理
        iChapterNav.disposeHotkey(key, combKeys, event);

        let handled = false;
        switch (key) {
            case 'o': // O 显示/隐藏导航中心
            case 'O':
                __showHideNavCenter();
                handled = true;
                break;
            case '/': // / 导航中心搜索
                // 与 Firefox 的 / 快捷键会存在冲突
                // 所以针对 Firefox，快捷键为 Ctrl + / 或 Cmd + /
                // 阻止默认的浏览器行为
                event.preventDefault();
                if (!iNavCenter.showed) {
                    __showHideNavCenter();
                }
                iNavCenter.keyword.input.focus();

                // 自动读取并粘贴剪粘板的文本内容
                navigator.clipboard.readText().then((value) => {
                        iNavCenter.keyword.processInput(value);
                        // iNavCenter.keyword.input.v(value);
                        // iNavCenter.keyword.input.select();
                    }).catch((value) => {
                        ERROR("GET CLIPBOARD FAILED：", value);
                    });
                handled = true;
                break;
            case 'l': // L 文库
            case 'L':
                if (iNavCenter.docLib !== gUndefined && iNavCenter.docLib.enabled)
                    iToolbar.btns[_docLib_].tr(_click_);
                handled = true;
                break;
            case 'd': // D Light / Dark Mode
            case 'D': // D Light / Dark Mode
                StsColorScheme_ui.tr(_click_);
                handled = true;
                break;
            case 'a': // A 字体风格
            case 'A':
                if (iFontStyle.ui.isHidden())
                    StsFontStyle_ui.tr(_click_);
                else
                    iFontStyle.hide();
                handled = true;
                break;
            case 'm': // M 链接地图
            case 'M':
                if (!StsLinkMap_ui.isHidden() && !LinkTool_isShowed())
                    StsLinkMap_ui.tr(_click_);
                else
                    LinkTool_hide.hide();
                handled = true;
                break;
            case 'p': // P 激活笔
            case 'P':
                iParagraphNav.hide();
                iSpotlight.hide();
                iLaserPointer.tg();
                handled = true;
                break;
            case 's': // S 聚光灯
            case 'S':
                iParagraphNav.hide();
                iLaserPointer.hide();
                iSpotlight.tg();
                handled = true;
                break;
            case _escape_: // ESC 退出处理
                // 表格为阅读模式时，则退出
                if (!TableCross_ui.isHidden()) {
                    TableCross_disable();
                    handled = true;
                }
                break;
        }

        // 如果事件已处理，则禁止事件冒泡
        if (handled)
            event.preventDefault();

        function __showHideNavCenter() {
            if (FigureNav_ui.isShowed())
                return;
            iToolbar.btns[_navCenter_].tr(_click_);
        }
    });

    // 松开任意键
    jq_Document.on("keyup", (event) => {
        // 更新复制模式
        if (ContentAssistor_copyAsMarkdown === gTrue)
            ContentAssistor_toggleCopyMode(gFalse);
    });
}
// VLOOK UI 包
// ========================================

// ========================================
// Gray Mode
/**
 * 初始化 Gray Mode
 */
function GrayMode_init() {
    // 先判断是否通过 query 参数临时停用
    if (V_util_getParamVal(_gray_) === _off_)
        return;

    // 获取当前日期
    const date = new Date(),
        today = __padZero(date.getMonth() + 1)
            + "-" + __padZero(date.getDate());

    // 获取需要增加的日期集合
    let grayMode = V_util_getMetaByName(_vlook__ + _gray_ + __mode_),
        grayModeDaySet = [];

    // 处理指定要增加的日期集合
    if (grayMode !== gUndefined) {
        if (/^((\d{1,2}-\d{1,2});?)+$/g.test(grayMode.x())) {
            let addSet = grayMode.sp(";");
            for (let i = 0; i < V_length(addSet); i++) {
                let item = _,
                    itemSet = addSet[i].sp("-");
                // 补零处理
                for (let j = 0; j < V_length(itemSet); j++) {
                    item += __padZero(JS_parseInt(itemSet[j]))
                        + (j === 0 ? "-" : _);
                }
                grayModeDaySet.push(item);
            }
        }
    }

    // 中文语言环境中，默认添加的日期
    if (V_lang === 0)
        // 注意预置的默认日期需要补零处理，如：04-01
        grayModeDaySet.push("12-13"); // 中国国家公祭日 12-13

    // 今天如果与 Gray Mode 日期集任一日期匹配则启用
    if (grayModeDaySet.indexOf(today) > -1)
        DOM_body().c(_filter_, "grayscale(100%)");

    // 月份、日期前补零对齐
    function __padZero(value) {
        return value < 10 ? `0${value}` : value;
    }
}
// Gray Mode
// ========================================

// ========================================
// VLOOK 语言类
let V_lang = -1,
    V_lang_custom = gUndefined;

/**
 * 初始化语言
 */
function V_lang_init() {
    switch (env.language.base) {
        case "zh":
            V_lang = 0; // 简体中文
            break;
        default:
            V_lang = 1; // 英语（默认）
    }

    // 通过 meta 指定的语言包
    // 先尝试匹配语种子集
    let zhSet = env.language.full;
    if (zhSet === "zh-tw" || zhSet === "zh-mo") // 台湾、澳门统一使用香港版本繁体
        zhSet = "zh-hk";
    let vlookLang = V_util_getMetaByName(_vlook__ + _lang_ + "-" + zhSet);
    // 子集为空时，再尝试匹配主语种
    if (vlookLang === gUndefined)
        vlookLang = V_util_getMetaByName(_vlook__ + _lang_ + "-" + env.language.base);
    if (vlookLang !== gUndefined)
        V_lang_custom = vlookLang;
}

/**
 * 获得适配当前语言的 UI 文本
 * @param buildInTextSet 内置的中英文本
 * @param textId 文本标识，主要作为指定语言包时进行匹配，如：1、97，对应语言包中的 text1、text97
 */
function V_lang_text(textId, buildInTextSet) {
    if (V_lang_custom === gUndefined)
        return buildInTextSet[V_lang];

    let text = V_util_getMetaByName("vk-" + V_lang_custom + textId);
    return text === gUndefined
        ? buildInTextSet[V_lang]
        : text;
}

// 获取语言 ID 3 内容
function V_lang_text3() {
    return V_lang_text(3, [
        "链接地图",
        "Link Map"
    ]);
}
// 获取语言 ID 6 内容
function V_lang_text6() {
    return V_lang_text(6, [
        "导航中心",
        "Navigation Center"
    ]);
}
// 获取语言 ID 7 内容
function V_lang_text7() {
    return V_lang_text(7, [
        "浏览文库",
        _Document_ + " Library"
    ]);
}
// 获取语言 ID 14 内容
function V_lang_text41() {
    return V_lang_text(41, [
        "字体风格",
        _Font_ + " " + _Style_
    ]);
}
// 获取语言 ID 18 内容
function V_lang_text18() {
    return V_lang_text(18, [
        "公式",
        "Formel"
    ]);
}
// 获取语言 ID 18 内容
// function V_lang_text18() {
//     return V_lang_text(18, [
//         "历史",
//         _History_
//     ]);
// }
// 获取语言 ID 22 内容
function V_lang_text22() {
    return V_lang_text(22, [
        "所有脚注",
        "All " + _footnotes_
    ]);
}
// 获取语言 ID 35 内容
function V_lang_text35() {
    return V_lang_text(35, [
        "目录",
        "Table of Contents"
    ]);
}
// 获取语言 ID 35 内容
// function V_lang_text35() {
//     return V_lang_text(35, [
//         "搜索",
//         _Search_
//     ]);
// }
// 获取语言 ID 38 内容
function V_lang_text38() {
    return V_lang_text(38, [
        "已就绪",
        _Ready_
    ]);
}
// 获取语言 ID 56 内容
function V_lang_text56() {
    return V_lang_text(56, [
        "表",
        "Table"
    ]);
}
// 获取语言 ID 57 内容
function V_lang_text57() {
    return V_lang_text(57, [
        "代码块",
        "Code Block"
    ]);
}
// 获取语言 ID 58 内容
function V_lang_text58() {
    return V_lang_text(58, [
        "图",
        "Figure"
    ]);
}
// 获取语言 ID 59 内容
function V_lang_text59() {
    return V_lang_text(59, [
        "音频",
        "Audio"
    ]);
}
// 获取语言 ID 60 内容
function V_lang_text60() {
    return V_lang_text(60, [
        "视频",
        "Video"
    ]);
}
// 获取语言 ID 66 内容
function V_lang_text66() {
    return V_lang_text(66, [
        "是空的",
        " is empty"
    ]);
}
// 获取语言 ID 67 内容
function V_lang_text67() {
    return V_lang_text(67, [
        "未找到",
        "Not found"
    ]);
}
// 获取语言 ID 68 内容
function V_lang_text68() {
    return V_lang_text(68, [
        "明信片",
        "Postcard"
    ]);
}
// // 获取语言 ID 86 内容
// function V_lang_text86() {
//     return V_lang_text(86, [
//         "公式",
//         "Formel"
//     ]);
// }
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
    V_doc_counter_math = 0, // 公式总数
    V_doc_counter_audio = 0, // 非 mini 模式音频总数
    V_doc_counter_audiomini = 0, // mini 模式音频总数
    V_doc_counter_video = 0, // 视频总数
    V_doc_counter_details = 0; // 详情总数

/**
 * 初始化外部链接（如：http://、https://、ftp://、站内链接等），为其添加 target 参数
 */
function V_doc_link_adjustExternal() {
    $("a" + V_not(V_attrCSS(_href_, "#", "^"))).e((index, element) => {
        let a = $(element),
            href = a.a(_href_);
        // 跳过指定类型链接
        if (href === gUndefined || href.x() === _ || href.sW("?")) // ? 开头的如 ?target=vdl
            return gTrue;

        a.a(_target_, a.a(_href_));

        // 如果指定关闭文库，则所有外部链接都自动添加同名参数
        if (iNavCenter.docLib !== gUndefined && iNavCenter.docLib.off) {
            let page = V_util_getUrlWithoutQueryAndHash(href),
                queryStr = V_util_getUrlQueryString(href),
                hash = V_util_getUrlHash(href);
            // 添加同名参数
            queryStr += ((V_length(queryStr) > 0 ? "&" : _) + "vdl=off");
            a.a(_href_, page + "?" + queryStr + hash);
        }
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
    if (ColorScheme_scheme === _dark_) {
        ColorScheme_schemeBeforePrint = ColorScheme_scheme;
        ColorScheme_scheme = _light_;
        ColorScheme_refresh();
    }

    // 将 Mermaid 图表题注 width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    V_byClass(_vCaption_Mermaid_).e((index, element) => {
        let _t = $(element);
        _t.a(_beforePrintWidth_, _t.c(_width_));
        _t.c(_width_, _100pc_);
    });

    // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
    V_byClass(_vCaption_Mermaid_ +___+ _svg_).e((index, element) => {
        let _t = $(element);
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
    $(_details_ + V_not(V_attrCSS(_open_))).e((index, element) => {
        $(element).ch(_summary_).tr(_click_);
    });

    // 展开所有折叠的长内容
    $(V_attrCSS(_dataContentFolded_, _true_)).e((index, element) => {
        $(element).tr(_mouseUp_);
    });

    // 展开所有折叠的表格行
    $(_vTblRowGBtn_).e((index, element) => {
        RowGroup_open($(element).p().p());
    });

    // 隐藏画中画
    PicInPic_hide();

    // 若存在「刮刮卡」内容，则先让用户确认是否显示
    let coatings = V_byClass(_vCoating_);
    if (V_length(coatings) > 0) {
        if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？")) {
            coatings.e((index, element) => {
                let _t = $(element);
                if (_t.a(_dataCoatingShowed_).sW("f"))
                    Coating_show(_t);
            });
        }
    }

    // 调用浏览器的打印功能
    // 延后是为以上相关的异步和界面完成刷新
    setTimeout(() => {
        gWindow.print();
    }, 1000);
}

/**
 * 打印文档后处理
 */
function V_print_done () {
    // 若打印前为 Dark Mode 则先恢复为 Dark Mode
    if (ColorScheme_schemeBeforePrint === _dark_) {
        ColorScheme_scheme = ColorScheme_schemeBeforePrint;
        ColorScheme_refresh();
    }

    // 恢复打印前的配置，详见 V_print_ready()
    V_byClass(_vCaption_Mermaid_).e((index, element) => {
        let _t = $(element);
        _t.c(_width_, _t.a(_beforePrintWidth_));
        JQ_removeAttr(_t, _beforePrintWidth_);
    });

    // 恢复打印前的配置，详见 V_print_ready()
    V_byClass(_vCaption_Mermaid_ +___+ _svg_).e((index, element) => {
        let _t = $(element);
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
    // 基本信息：VLOOK
    let sd = "?p=vlook"
        + "&ver=" + V_ver
        + "&thm=" + V_util_getTemplateThemeName()
        + "&url=" + WINDOW_getHref();

    if (1 === 2) {
        sd += "&d=" + (V_util_isMobile() ? "mob" : _) // 设备类型
            + "&dpr=" + env.display.DPR; // DPR

        // 信息：OS
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

        sd += "&lang=" + V_lang // 浏览器语言
            + "&size=" + V_length(VOM_doc().t()) // 文档大小
            + "&time=" + loadTimeCost; // 加载文档时间

        // 插图数据：图片
        sd += "&" + _img_ + "=" + V_length(V_byClass(_vFig_))
            + "&" + _img_ + "-fold=" + V_length($("p" + V_attrCSS(_dataContainer_, _img_) + V_attrCSS(_dataContentFolded_, _true_)))
            + "&" + _img_ + "-fill=" + V_length($(_img_ + V_not(V_attrCSS(_dataImgFill_))))
            + "&" + _img_ + "-" + _invert_ + "=" + V_length($(_img_ + V_attrCSS(_dataDarkSrc_, _invert_)))
            + "&" + _img_ + "-alter=" + V_length($(_img_ + V_attrCSS(_dataDarkSrc_, _alter_)))
            + "&" + _img_ + "-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdFig_, "^") + V_attrCSS(_dataIdFigType_, _img_) +___+ _vCap1_))
            + "&" + _img_ + "-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdFig_, "^") + V_attrCSS(_dataIdFigType_, _img_) +___+ _vCap2_));

        // 插图数据：Mermaid
        let mermaid = V_byClass(_mdDiagramPanel_);
        sd += "&mm=" + V_length(mermaid)
            + "&mm-fold=" + V_length($(_div_ + V_attrCSS(_dataContainer_, _svg_) + V_attrCSS(_dataContentFolded_, _true_)))
            + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdFig_, "^") + V_attrCSS(_dataIdFigType_, _svg_) +___+ _vCap1_))
            + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdFig_, "^") + V_attrCSS(_dataIdFigType_, _svg_) +___+ _vCap2_));

        // 音频数据
        sd += "&audio=" + V_length($(_audio_))
            + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdAudio_, "^") +___+ _vCap1_))
            + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdAudio_, "^") +___+ _vCap2_));

        // 视频数据
        sd += "&video=" + V_length($(_video_))
            + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdVideo_, "^") +___+ _vCap1_))
            + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdVideo_, "^") +___+ _vCap2_));

        // 图片细分：Mermaid 图
        let pie = 0,
            flow = 0,
            flowSTART = 0,
            flowINIT = 0,
            state = 0,
            seq = 0,
            classD = 0,
            gantt = 0;
        mermaid.e((index, element) => {
            let _t = $(element);
            if (V_length(_t.f("g.legend")) > 0)
                pie++; // 饼图
            else if (V_length(_t.f("g.output g.nodes")) > 0) {
                flow++; // 流程图
                if (V_length(_t.f("g.output g.nodes g#START.node")) > 0)
                    flowSTART++; // VLOOK 标准的流程图
                else if (V_length(_t.f("g.output g.nodes g#INIT.node")) > 0)
                    flowINIT++; // VLOOK 标准的状态机图
            }
            else if (V_length(_t.f("g.stateGroup")) > 0)
                state++; // 状态机图（原生）
            else if (V_length(_t.f("g rect.actor")) > 0)
                seq++; // 顺序图
            else if (V_length(_t.f("g.classGroup")) > 0)
                classD++; // 类图
            else if (V_length(_t.f("g rect.section")) > 0)
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
        sd += "&tbl=" + V_length($(_table_))
            + "&tbl-fold=" + V_length($(_figure_ + V_attrCSS(_dataContainer_, _table_) + V_attrCSS(_dataContentFolded_, _true_)))
            + "&tbl-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdTbl_) +___+ _vCap1_))
            + "&tbl-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdTbl_) +___+ _vCap2_));

        // 表格列格式数据
        let fmBold = 0,
            fmEm = 0,
            fmUnderline = 0,
            fmMark = 0,
            fmDel = 0,
            fmChk = 0,
            fmNum = 0;
        $(_table_ + V_attrCSS(_dataColumnFmting_, _true_)).e((index, element) => {
            let _t = $(element);
            if (V_length(_t.f(_thead_ + " ." + _vTblColFmt_Bold_)) > 0)
                fmBold++;
            if (V_length(_t.f(_thead_ + " ." + _vTblColFmt_Em_)) > 0)
                fmEm++;
            if (V_length(_t.f(_thead_ + " u")) > 0)
                fmUnderline++;
            if (V_length(_t.f(_thead_ + " ." + _vTblColFmtMark_)) > 0)
                fmMark++;
            if (V_length(_t.f(_thead_ +___+ _del_)) > 0)
                fmDel++;
            if (V_length(_t.f(_thead_ + " ." + _vTblColFmt_Chkbox_)) > 0)
                fmChk++;
            if (V_length(_t.f(_thead_ + " ." + _vTblColFmtNum_)) > 0)
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
        sd += "&tbl-cell-merge=" + V_length($(_table_ + V_attrCSS(_dataCellMerge_, _true_)));

        // 带行折叠的表格数
        sd += "&tbl-row-group=" + V_length($(_table_ + V_attrCSS(_dataRowGroup_, _true_)));

        // 代码块数据
        sd += "&cb=" + V_length(V_byClass(_mdFences_))
            + "&cb-fold=" + V_length($("p" + V_attrCSS(_dataContainer_, _codeblock_) + V_attrCSS(_dataContentFolded_, _true_)))
            + "&cb-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdCodeblock_) +___+ _vCap1_))
            + "&cb-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vkIdCodeblock_) +___+ _vCap2_));

        // 标签数据
        sd += "&tag=" + V_length($(_code_ + V_attrCSS(_class_, _vTag_)))
            + "&badge=" + V_length($(_code_ + V_attrCSS(_class_, _vBadgeName_)));

        // 详情折叠数据
        sd += "&dt=" + V_length($(_details_));

        // 脚注数据
        sd += "&fn=" + V_length(V_byClass("md-" + _footnote_));
    }

    // 提交统计数据
    let vlookStatViaGithub = $(_iframe_ + V_attrCSS(_name_, _vlookStatGitHub_)),
        vlookStatViaCloudFlare = $(_iframe_ + V_attrCSS(_name_, _vlookStatCloudFlare_));

    vlookStatViaGithub.a(_src_, _httpsPrefix_ + _vlookAct_ + (V_devMode ? "dev-" : _) + "stat-github.html" + sd);
    DEBUG("STAT DATA (GitHub):", vlookStatViaGithub.a(_src_));

    if (!V_devMode) {
        // vlookStatViaCloudFlare.a(_src_, _httpsPrefix_ + _vlook__ + "doc.pages.dev/act/" + (V_devMode ? "dev-" : _) + "stat-cloudflare.html" + sd);
        vlookStatViaCloudFlare.a(_src_, _vlookPagesHost_CloudFlare_ + "/act/" + (V_devMode ? "dev-" : _) + "stat-cloudflare.html" + sd);
        DEBUG("STAT DATA (CloudFlare):", vlookStatViaCloudFlare.a(_src_));
    }
}
// VLOOK 埋点数据统计
// ========================================

// ==================== 随机颜色类 ==================== //

// let RandomColor_palette = []; // 不相似颜色的色板

// /**
//  * 生成随机颜色
//  * @returns number[] R/G/B 颜色分量是数组
//  */
// function RandomColor_generate() {
//     let c = [0, 0, 0];
//     c[0] = Math.floor(Math.random() * 255);
//     c[1] = Math.floor(Math.random() * 255);
//     c[2] = Math.floor(Math.random() * 255);
//     return c;
// }

// /**
//  * 生成不相似的随机颜色
//  * @returns number[] R/G/B 颜色分量是数组
//  */
// function RandomColor_dissimilarRgb() {
//     // 色板为空时，生成随机颜色后直接返回
//     let c = [0, 0, 0];
//     if (V_length(RandomColor_palette) === 0) {
//         c = RandomColor_generate();
//         RandomColor_palette.push(c);
//         return c;
//     }

//     // 色板不为空时，避免相似的颜色
//     let flag = gFalse,
//         t = 0,
//         d = [0, 0, 0];

//     // 随机生成不相似的颜色（最多尝试次数上限为 20）
//     while (!flag && t < 20) {
//         c = RandomColor_generate();
//         // 判断新生成的随机颜色，色板中是否已有相似的
//         let idx = 0;
//         for (let i = 0; i < V_length(RandomColor_palette); i++) {
//             idx = i;
//             d[0] = (RandomColor_palette[i][0] - c[0]) / 256;
//             d[1] = (RandomColor_palette[i][1] - c[1]) / 256;
//             d[2] = (RandomColor_palette[i][2] - c[2]) / 256;
//             // 比例两个颜色的 RGB 色差来作为相似性的依据（0.3 为经验值，值越大差异最大）
//             if (Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) < 0.3)
//                 break;
//         }

//         // 色板中没有找到相似的颜色
//         if (idx === V_length(RandomColor_palette)) {
//             RandomColor_palette.push(c);
//             flag = gTrue;
//         }
//         t++;
//     }
//     return c;
// }

// ==================== 处理耗时计时器类 ==================== //

/**
 * 构造函数
 */
function Stopwatch() {
    let T = this;
    T.sT = gNull; // 重置后的初始时间
    T.lT = gNull; // 每次中间计时的初始时间

    /**
     * 重置计时器
     */
    T.reset = function () {
        T.sT = V_util_getTime();
    }

    /**
     * 一次中间计时开始
     */
    T.st = function (target) {
        if (target !== gUndefined)
            LOG(target);
        T.lT = V_util_getTime();
    }

    /**
     * 一次中间计时结束
     * @param pre 输出内容前缀
     * @param slient 是否为静默模式，true：是
     */
    T.ed = function (pre, slient) {
        let c = V_util_getTime() - T.lT;
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
        return V_util_getTime() - T.sT;
    }

    // 初始化计时器
    T.reset();
}

// ==================== 欢迎页 ==================== //

let WelcomePage_ui = gUndefined, // 欢迎页主界面
    WelcomePage_button = gUndefined, // 关闭欢迎页按钮
    WelcomePage_tips = gUndefined, // 欢迎信息
    WelcomePage_finished = gFalse, // 是否已加载
    WelcomePage_mode = "auto"; // 模式

/**
 * 构造函数
 * @param mode 欢迎页显示模式
 */
function WelcomePage_init(mode) {
    WelcomePage_ui = V_byClass(_vWelcomePage_); // 欢迎页主界面
    WelcomePage_button = V_byClass(_vWelcomePage_ + ">." + _vLoading_); // 关闭欢迎页按钮
    WelcomePage_tips = V_byClass(_vWelcomePage_ + ">." + _vTips_); // 欢迎信息
    WelcomePage_finished = gFalse; // 是否已加载
    WelcomePage_mode = mode; // 模式
    // V_ui_stopScrollPropagation(WelcomePage_ui);

    // 初始执行
    if (WelcomePage_mode === _off_)
        WelcomePage_close();
    else
        V_ui_fadeShow(WelcomePage_ui);
}

/**
 * 完成所有内容加载后调用
 */
function WelcomePage_done() {
    // 关闭欢迎页事件
    WelcomePage_button.uC().ck(() => {
        WelcomePage_close();
    });

    WelcomePage_ui.c(_cursor_, "default");
    WelcomePage_stopAni();

    WelcomePage_tips.c(_animation_, _none_);

    WelcomePage_updateCloseButton(gNull);
    JQ_addClass(WelcomePage_button, _vBtn_ + "-" + _done_);

    WelcomePage_finished = gTrue;

    // 模式：auto，延时自动关闭
    let delay = JS_parseInt(WelcomePage_mode);
    if (delay > 60) // 控制秒数上限
        delay = 60;
    if (WelcomePage_mode === _auto_ || delay >= 0)
        WelcomePage_autoClose(delay);
    // 模式：wait
    else if (WelcomePage_mode === _wait_)
        JQ_addClass(WelcomePage_button, _wait_);
}

/**
 * 自动延时关闭
 * @param delay VLOOK Query 调校参数指定的延时自动关闭秒数
 */
function WelcomePage_autoClose(delay) {
    let delaySecs = delay,
        closeTimer = gNull;

    __timeToClose();

    // 关闭倒计时
    function __timeToClose() {
        WelcomePage_updateCloseButton(delaySecs);
        delaySecs--;
        if (delaySecs < 0) { // 倒计时结束
            clearTimeout(closeTimer);
            closeTimer = gNull;
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
    WelcomePage_button.hm(V_lang_text(23, [
        _startReading_cn_,
        _startReading_en_
        ]) + (sec == gNull ? _ : ___+ V_ui_span(_, _, "(" + sec + "s)")));
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
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function WelcomePage_disposeHotkey(key, combKeys, event) {
    if (!WelcomePage_finished || WelcomePage_ui.isHidden())
        return;

    let handled = false;
    switch (key) {
        case _enter_: // 关闭欢迎页
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
    ContentAssistor_btns_wrap = gUndefined, // 表格、代码块换行、不换行
    ContentAssistor_btns_picInPic = gUndefined, // 「画中画」
    ContentAssistor_copyAsMarkdown = gFalse, // 复制模式
    // 最后显示新标签打开按钮的内容（插图/表格等
    ContentAssistor_lastTarget = gUndefined, // 用于代码、标签、徽章
    ContentAssistor_lastHover = gUndefined,
    ContentAssistor_lastContentType = gUndefined;

function ContentAssistor_init() {
    ContentAssistor_ui = V_byClass(_vContentAssistor_);
    ContentAssistor_btns_copyContent = $(_vBtn_Assistor_ + "." + _copy_); // 复制内容
    ContentAssistor_btns_openInFigureNav = $(_vBtn_Assistor_ + "." + _openInFigureNav_); // 插图浏览器中打开
    ContentAssistor_btns_tableCross = $(_vBtn_Assistor_ + "." + _tableCross_); // 表格阅读模式（十字光标）
    ContentAssistor_btns_wrap = $(_vBtn_Assistor_ + "." + _wrap_); // 表格、代码块换行、不换行
    ContentAssistor_btns_picInPic = $(_vBtn_Assistor_ + "." + _picInPic_); // 「画中画」

    ContentAssistor_btns_openInFigureNav.a(_dataTips_, V_lang_text(24, [
        "全屏显示",
        "Full screen"
    ]));

    ContentAssistor_btns_tableCross.a(_dataTips_, V_lang_text(25, [
        "阅读模式",
        "Reading mode"
    ]));

    ContentAssistor_btns_wrap.a(_dataTips_,  V_lang_text(26, [
        "换行 / 不换行",
        "Line " + _break_ + " / No " + _line_ +___+ _break_
    ]));

    ContentAssistor_btns_picInPic.a(_dataTips_, V_lang_text(27, [
        "画中画",
        "Picture in picture"
    ]));

    ContentAssistor_ui.on(_mouseLeave_, (event) => {
        if (!v_ui_mouseDropIn(ContentAssistor_lastHover, event))
            ContentAssistor_hide();
    });

    /**
     * 初始化内容助手
     */
    // 在插图浏览器中打开
    ContentAssistor_btns_openInFigureNav.uC().ck(() => {
        ContentAssistor_hide();
        FigureNav_show();
    });

    // 开/关：表格阅读模式（十字光标）
    ContentAssistor_btns_tableCross.uC().ck(() => {
        TableCross_toggle();
    });

    // 开/关：表格、代码块的换行、不换行
    ContentAssistor_btns_wrap.uC().ck(() => {
        __actionWrap();
    });

    // 复制
    ContentAssistor_btns_copyContent.uC().ck((event) => {
        __actionCopy($(event.currentTarget), event);
    });

    // 画中画
    ContentAssistor_btns_picInPic.uC().ck(() => {
        PicInPic_show();
    });

    ToolTips_bind(ContentAssistor_btns_copyContent);
    ToolTips_bind(ContentAssistor_btns_openInFigureNav);
    ToolTips_bind(ContentAssistor_btns_tableCross);
    ToolTips_bind(ContentAssistor_btns_wrap);
    ToolTips_bind(ContentAssistor_btns_picInPic);

    // 处理【换行、不换行】
    function __actionWrap() {
        if (ContentAssistor_lastHover === gUndefined)
            return;

        // 表格
        if (ContentAssistor_lastContentType === _table_)
            TableWrap_toggle();
        // 代码块
        else if (ContentAssistor_lastContentType === _codeblock_)
            CodeblockWrap_toggle();
    }

    // 处理【复制】操作
    function __actionCopy(target, event) {
        if (ContentAssistor_lastHover === gUndefined)
            return;

        // 代码块
        if (ContentAssistor_lastContentType === _codeblock_)
            ExtCodeBlock_copyContent(target, event);
        // 图片插图
        else if (ContentAssistor_lastContentType === _fig_ + _suffixImg_)
            ExtFigure_copySrc(target, event);
        // 表格
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
        V_util_setVarVal(_varCurCopy_, V_util_getVarVal(_varCurCopy_ + "-as-md"));
        ContentAssistor_btns_copyContent.hm(V_ui_svgIcon(_icoCopyAsMd_, 18, 16, _light_));
    }
    else {
        // 恢复复制光标、内容助手的复制图标
        V_util_setVarVal(_varCurCopy_, V_util_getVarVal(_varCurCopy_ + "-" + _normal_));
        ContentAssistor_btns_copyContent.hm(V_ui_svgIcon(_icoCopy_, 18, 16, _light_));
    }
}

/**
 * 绑定对象的 hover 行为
 * @param target 目标对象
 * @param contentType 内容类型：Figure/Table/CodeBlock
 */
function ContentAssistor_bind(target, contentType) {
    // 鼠标悬停时事件处理
    target.on(_mouseEnter_, (event) => {
        if (ContentAssistor_btns_copyContent === gUndefined)
            return;

        V_ui_removeAnimate(ContentAssistor_ui);

        // 更新复制模式
        if (ContentAssistor_lastHover !== target)
            ContentAssistor_toggleCopyMode(gFalse);

        ContentAssistor_lastHover = target;
        ContentAssistor_lastContentType = contentType;

        let asMarkdown =  "\n" + V_ui_sub(_, _, V_lang_text(28, [
            "按住",
            "Press and hold"
            ])
            + _2nbsp_+ V_ui_getAltKeyUI() + _2nbsp_ + "- " + V_lang_text(29, [
                "复制为 " + _Markdown_,
                _Copy_ +___+ _as_Markdown_
                ]));
        if (contentType === _codeblock_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, V_lang_text(30, [
                "复制代码",
                _Copy_ + " code"
            ]) + asMarkdown);
        }
        else if (contentType === _fig_ + _suffixImg_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, V_lang_text(31, [
                "复制图片地址",
                _Copy_ + " image link"
            ]) + asMarkdown);
        }
        else if (contentType === _table_) {
            ContentAssistor_btns_copyContent.a(_dataTips_, V_lang_text(32, [
                "复制表格内容",
                _Copy_ + " table content"
            ]) + asMarkdown);
        }

        ContentAssistor_show();
    }).on(_mouseLeave_, (event) => {
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
    JQ_removeClass(ContentAssistor_btns_wrap, _first__enable__last_);
    JQ_removeClass(ContentAssistor_btns_picInPic, _first__enable__last_);

    // 插图
    if (ContentAssistor_lastContentType.sW(_fig_)) {
        // 图片插图：svg
        if (ContentAssistor_lastContentType.eW(_svg_)) {
            JQ_addClass(ContentAssistor_btns_openInFigureNav, _enabled__first_);
        }
        // 图片插图：非 svg
        else {
            JQ_addClass(ContentAssistor_btns_copyContent, _enabled__first_);
            JQ_addClass(ContentAssistor_btns_openInFigureNav, _enabled_);
        }
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
        // 换行、不换行
        JQ_addClass(ContentAssistor_btns_wrap, _enabled_);
        if (TableWrap_isWrap(ContentAssistor_lastHover))
            JQ_addClass(ContentAssistor_btns_wrap, _selected_);
        else
            JQ_removeClass(ContentAssistor_btns_wrap, _selected_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled__last_);
    }
    // 代码块
    else if (ContentAssistor_lastContentType === _codeblock_) {
        // 复制
        JQ_addClass(ContentAssistor_btns_copyContent, _enabled__first_);
        // 换行、不换行
        JQ_addClass(ContentAssistor_btns_wrap, _enabled_);
        if (CodeblockWrap_isWrap())
            JQ_removeClass(ContentAssistor_btns_wrap, _selected_);
        else
            JQ_addClass(ContentAssistor_btns_wrap, _selected_);
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
    if (className !== gUndefined && className.i(_vCaption_) > -1
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
    let w = JS_parseInt(ContentAssistor_lastHover.oW())
        - JS_parseInt(ContentAssistor_lastHover.c(_borderLeftWidth_));
    ContentAssistor_ui.c(_left_, ContentAssistor_lastHover.oL()
            + w
            - ContentAssistor_ui.w()
            - offset)
        .c(_top_, ContentAssistor_lastHover.oT()
            + JS_parseInt(ContentAssistor_lastHover.c(_borderTopWidth_)));

    // 须延时后再执行显示，让以上代码先完成
    setTimeout(() => {
        V_ui_addAnimate(ContentAssistor_ui);
        V_ui_fadeShow(ContentAssistor_ui);
    }, 50);
}

/**
 * 隐藏内容辅助动作按钮
 */
function ContentAssistor_hide() {
    V_ui_fadeHide(ContentAssistor_ui);
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
    PicInPic_ui_body = V_byClass(_vPicInPic_);
    PicInPic_ui_content = PicInPic_ui_body.ch("." + _vContent_);
    PicInPic_ui_zoom = V_byClass(_vPipBtn_ + "." + _zoom_);
    PicInPic_ui_close = V_byClass(_vPipBtn_ + "." + _close_);

    // 缩放事件处理
    PicInPic_ui_zoom.uC().ck((event) => {
        let _t = $(event.currentTarget),
            pipBtn = V_byClass(_vPipBtn_);
        if (PicInPic_ratio === 1) {
            PicInPic_ratio = 0.75;
            JQ_exchangeClass(pipBtn, _zoomIn_, _zoomOut_);
            _t.hm(V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_));
        }
        else {
            PicInPic_ratio = 1;
            JQ_exchangeClass(pipBtn, _zoomOut_, _zoomIn_);
            _t.hm(V_ui_svgIcon(_icoZoomOut_, 16, 16, _theme_));
        }
        PicInPic_zoom();
    });

    PicInPic_ui_close.uC().ck(() => {
        PicInPic_hide();
    });

    PicInPic_ui_body.on(_mouseEnter_, (event) => {
        // 高度过小时调整操作按钮位置
        if (PicInPic_ui_body.h() < 30) {
            JQ_addClass(PicInPic_ui_zoom, _min_);
            JQ_addClass(PicInPic_ui_close, _min_);
        }
        else {
            JQ_removeClass(PicInPic_ui_zoom, _min_);
            JQ_removeClass(PicInPic_ui_close, _min_);
        }
        V_ui_fadeShow(PicInPic_ui_zoom);
        V_ui_fadeShow(PicInPic_ui_close);
    }).on(_mouseLeave_, (event) => {
        V_ui_fadeHide(PicInPic_ui_zoom);
        V_ui_fadeHide(PicInPic_ui_close);
    });
}

/**
 * 显示画中画
 */
function PicInPic_show() {
    let source = ContentAssistor_lastHover;
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
    V_util_setScrollTop(0, PicInPic_ui_content);

    /**
     * 为画中画进行克隆处理
     * @param source 源对象
     */
    function __cloneForPicInPic (source) {
        let openAll = gFalse,
            tagName = V_util_getTagName(source);
        // 针对表格的处理
        if (tagName === _table_) {
            // 先展开所有行分组
            openAll = RowGroup_openAll(source, _auto_);
            // 再展开长内容
            let container = source.p().p();
            if (container.a(_dataContentFolded_) === _true_)
                ContentFolder_expand(container);
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.c(_margin_, 0)
            .c(_border_, 0);
        // 移除插图编号数据，避免存在重复对象
        JQ_removeAttr(newClone, _dataFigNum_);
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
        w = jq_Window.w() / 2.5,
        h = jq_Window.h() / 3;
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

    setTimeout(() => {
        V_ui_addAnimate(PicInPic_ui_zoom);
        V_ui_addAnimate(PicInPic_ui_close);
    }, 50);
}

// ==================== 聚光灯类 ==================== //

/**
 * 构造函数
 * @param radius 半径大小
 */
function Spotlight(radius) {
    let T = this;
    T.ui = V_byClass(_vSpotlight_);
    T.r = radius; // 聚光灯半径
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

        T.r = T.r < T.zoom.bigger
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

        // 在 Dark Mode 时先添加微调的样式
        if (ColorScheme_scheme === _dark_)
            JQ_addClass(VOM_doc(), _vSpotlightInDark_);

        T.mode = "S";
        T.ui.show();
        JQ_removeClass($(T.pointerScope), _vCursorLaser_);
        T.repaint();

        let key1 = V_ui_wrap_kbd("⇧ Shift") + _2nbsp_,
            key2 = _2nbsp_ + _2nbsp_ + "-" + _2nbsp_ + _2nbsp_ + V_ui_wrap_kbd("ESC") + _2nbsp_;
        BottomTips_show(key1 + V_lang_text(33, [
                "调整聚光灯大小",
                "Change the size of the spotlight"
            ]) + key2 + V_lang_text(34, [
                _Exit_cn_,
                _Exit_en_
            ]));
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
            + T.lastPos.x + "px " + T.lastPos.y + "px,"
            + "transparent " + T.r + "px,"
            + "rgba(0,0,0,.4)" + (T.r + 5) + "px,rgba(0,0,0,.9) 900px)");
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
        BottomTips_hide();
        JQ_removeClass(T.toolbar.btns[_spotlight_], _selected_);
        JQ_removeClass(VOM_doc(), _vSpotlightInDark_);
        T.ui.hide();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (key) {
            case 'Shift':
                T.toggleZoom();
                handled = true;
                break;
            case _escape_:
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
 */
 function LaserPointer() {
    let T = this;
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

        BottomTips_show(V_ui_wrap_kbd("ESC") + _2nbsp_ + V_lang_text(34, [
            _Exit_cn_,
            _Exit_en_
        ]));
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
        BottomTips_hide();
        T.enable = gFalse;
        JQ_removeClass(T.toolbar.btns[_laserPointer_], _selected_);
        JQ_removeClass($(T.pointerScope), _vCursorLaser_);
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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

    T.onChanged = gUndefined;

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
            ui = V_ui_input(id, T.group, "radio", name, 'onfocus="this.blur()"' + (status ? ___ : ___+ _dataResult_ + '="' + _none_ + '"' + (checked ? ' checked' : _)))
                + V_ui_label(_vSegmentBtn_ +___+ name, V_attr(_for_, id) +___+ V_attr(_dataIcon_, icon) +___+ V_attr(_title_, target.typeDesc()),
                    V_ui_svgIcon(icon, 16, 16, _dark_)
                );

        T.ui.ap(ui);
        target.ui.entry = T.ui.ch("." + _vSegmentBtn_ + "." + name);

        // 指定为默认选项
        if (checked) {
            T.last = target;
            __updateIcon(gTrue);
        }

        // T.ui.on(_mouseEnter_, (event) => {
        // }).on(_mouseLeave_, (event) => {
        // });

        // 为新添加的段绑定事件
        T.ui.f(_input_ + "#" + id).change((event) => {
            // 隐藏切换前选择的组件
            T.last.hide();
            __updateIcon(gFalse);
            // 显示最新选择的组件
            T.last = T.segs[$(event.currentTarget).v()];
            __updateIcon(gTrue);

            T.last.show();

            typeof(T.onChanged) === _function_ && T.onChanged(name);
        });

        return T.segs[name];

        /**
         * 更新分段的图标
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
    T.checkedItemValue = function () {
        return T.ui.f(_input_ + V_attrCSS(_name_, T.group) + ":" + _checked_).v();
    }

    /**
     * 选中指定的分段
     * @param name 分段的名称，如：catalog, figure, table, codeblock, media
     */
    T.setChecked = function (name) {
        V_byID(T.group + "-" + name).tr(_click_);
        T.sts(name, gTrue);
    }

    /**
     * 获得、设置指定分段的状态
     * @returns 无 value 时，返回指定分段的状态
     */
    T.sts = function (typeName, value) {
        let id = T.group + "-" + typeName;
        if (value === gUndefined)
            return T.ui.f(_input_ + V_attrCSS(_id_, id)).a(_dataResult_);

        if (value)
            JQ_removeAttr(T.ui.f(_input_ + V_attrCSS(_id_, id)), _dataResult_);
        else
            T.ui.f(_input_ + V_attrCSS(_id_, id)).a(_dataResult_, _none_);
    }
}

// ==================== write 适应宽度 ==================== //

let FitWidth_ui = gUndefined;

function FitWidth_init() {
    FitWidth_ui = V_byClass(_vFitWidth_);

    V_ui_addAnimate(FitWidth_ui);
    iNavCenter.adjust();

    // 点击切换适应宽度
    FitWidth_ui.uC().ck(() => {
        if (FitWidth_ui.a(_class_).i(_enabled_) === -1) {
            JQ_addClass(FitWidth_ui, _enabled_);
            JQ_addClass(VOM_doc(), _fitWidth_);
            JQ_addClass(MoreDocContent_ui_before, _fitWidth_);
            JQ_addClass(MoreDocContent_ui_after, _fitWidth_);
        }
        else {
            JQ_removeClass(FitWidth_ui, _enabled_);
            JQ_removeClass(VOM_doc(), _fitWidth_);
            JQ_removeClass(MoreDocContent_ui_before, _fitWidth_);
            JQ_removeClass(MoreDocContent_ui_after, _fitWidth_);
        }
    });
}


// ==================== 继续上次的阅读类 ==================== //

let ResumeReading_ui = gUndefined,
    ResumeReading_lastPosition = gUndefined,
    ResumeReading_minScrollTop = 1000;
    // ResumeReading_hideTimer1 = gNull,
    // ResumeReading_hideTimer2 = gNull;

function ResumeReading_init() {
    ResumeReading_ui = V_byClass(_vResumeReading_);
    ResumeReading_lastPosition = JS_parseInt(V_data_read(_lastPosition_));

    V_ui_addAnimate(ResumeReading_ui);

    // 点击跳转
    ResumeReading_ui.uC().ck(() => {
        // clearTimeout(ResumeReading_hideTimer1);
        // clearTimeout(ResumeReading_hideTimer2);
        V_util_setScrollTop(ResumeReading_lastPosition);
        V_ui_fadeHide(ResumeReading_ui);

        if (!iNavCenter.showed)
            V_ui_adjustAllDelay();
    });
}

/**
 * 保存最后浏览的位置
 * @param restore 是否从非当前窗口恢复后的调用
 */
function ResumeReading_dispose(restore) {
    if (V_pageMode !== _max_)
        return;

    // 不是恢复显示时才处理
    if (!restore && ResumeReading_lastPosition != gNull) {
        ResumeReading_updateUI(iToolbar.adjust());
        // V_ui_fadeShow(ResumeReading_ui);
        ResumeReading_ui.c(_display_, _flex_);
        JQ_addClass(ResumeReading_ui.ch(_span_), _done_);
        JQ_addClass(ResumeReading_ui, _done_);
        // 延时后自动消失
        // ResumeReading_hideTimer1 = setTimeout(() => {
        //     ResumeReading_ui.ch(_span_).hide(); // 隐藏按钮文字
        //     ResumeReading_hideTimer2 = setTimeout(() => {
        //         V_ui_fadeHide(ResumeReading_ui);
        //     }, 5000);
        // }, 8000);
    }

    __saveLastPosData();

    // 保存最后浏览位置的数据
    function __saveLastPosData() {
        if (!gIsRunning)
            return;

        let scrollTop = V_util_getScrollTop();
        // 与最后保存的不一致则保存
        if (scrollTop > ResumeReading_minScrollTop && V_data_read(_lastPosition_) !== scrollTop) {
            V_data_write(_lastPosition_, scrollTop);
            DEBUG("LAST POSITION:", scrollTop);
        }

        // 自动定时保存最后浏览位置
        gTimer_saveLastPosition = setTimeout(() => {
            __saveLastPosData();
        }, 5000);
    }
}

/**
 * 更新继续上次的阅读的 UI
 * @param measure 参考的度量信息
 */
function ResumeReading_updateUI(measure) {
    setTimeout(() => {
        let top = 70, // 与 .v-resume-reading 中的取值同步
            right = gWritePaddingRight; // 与 .v-resume-reading 中的取值同步

        if (measure != gNull) {
            top = measure.t + 10;
            // 非移动端要显示聚光灯、激活笔等内容，要进行高度修正
            if (!V_util_isMobile())
                top += JS_parseInt(iToolbar.ui.c(_height_));
            // 对于工具栏不是展开，或是在小屏时的微调
            if (measure.r <= gWritePaddingRight || V_ui_isSmallScreen()) {
                top -= 10;
                right = measure.r + measure.p;
            }
            // 针对移动端
            if (V_util_isMobile())
                top = measure.t + 10;
        }

        ResumeReading_ui.c(_top_, top);
        ResumeReading_ui.c(_right_, right);

        // 根据动画开启情况进行适配
    }, V_ui_effect >= 2 ? gTransDuration / 2 : 0);
}

// ==================== 导航中心类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param runMode 关闭模式
 */
function NavCenter(mask, runMode = _auto_) {
    let T = this;
    T.ui = V_byClass(_vNavCenter_); // 导航中心主界面
    T.handle = V_byClass(_vTocHandle_); // 导航中心引导把手

    // 关键字搜索
    T.__keywordBody = V_byClass(_vSearchByKeyword_);
    T.keyword = new TextField(T.__keywordBody, "toc-" + _filter_ + "-nav-" + _center_, gTrue);

    T.runMode = (runMode == gNull) ? _auto_ : runMode; // 导航中心运行方式
    T.lastDisplayType = _float_; // 最后一次的显示方式（float/block）
    T.showed = gFalse; // 是否已显示

    T.width = T.ui.w(); // 导航中心宽度

    T.chpNav = gUndefined; // 联动的章节导航栏
    T.toolbar = gUndefined; // 联动的工具栏

    T.snapTimer = gNull; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    T.segs = new SegmentControl(V_byClass(_vSegment_+ ".toc"), "toc-segment");
    Index_segments = T.segs;

    // 目录索引组件
    T.toc = T.segs.add(new TocIndex(this, gFalse), _icoIndexTabToc_, gTrue, gFalse);
    // 插图索引组件
    T.figures = T.segs.add(new FiguresIndex(this, gTrue), _icoIndexTabFigure_, gFalse, gFalse);
    // 表格索引组件
    T.tables = T.segs.add(new TablesIndex(this, gTrue), _icoIndexTabTable_, gFalse, gFalse);
    // 代码块索引组件
    T.codeblocks = T.segs.add(new CodeblocksIndex(this, gTrue), _icoIndexTabCodeblock_, gFalse, gFalse);
    // 公式索引组件
    T.formulas = T.segs.add(new FormulasIndex(this, gTrue), _icoIndexTabFormula_, gFalse, gFalse);
    // 多媒体索引组件
    T.media = T.segs.add(new MediaIndex(this, gTrue), _icoIndexTabMedia_, gFalse, gFalse);
    // 访问历史组件
    // T.history = T.segs.add(new TocHistory(this, gTrue), _icoTocTabHistory_, gFalse, gFalse);

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.handle);

    /**
     * 当前章节变化事件
     */
    T.toc.onChapterChanged = function () {
        // 更新逐章导航内容
        if (T.chpNav !== gUndefined)
            T.chpNav.update();
    }

    /**
     * 当切换不同分段后的处理
     * @param name 分段标识
     */
    T.segs.onChanged = function (name) {
        // let str = V_lang_text35();
        let str = V_lang_text35();
        if (name === _figure_)
            str = V_lang_text58() + " / " + V_lang_text68();
        else if (name === _table_)
            str = V_lang_text56();
        else if (name === _codeblock_)
            str = V_lang_text57();
        else if (name === _media_)
            str = V_lang_text59() + " / " + V_lang_text60();
        else if (name === _formula_)
            str = V_lang_text18();
        str += " / ...";
        // else if (name === _history_)
        //     str += ___ + V_lang_text(18, [
        //         "历史",
        //         _History_
        //     ]);
        T.keyword.placeholder(str);
    }

    // 关键字输入组件属性设置
    T.keyword.setIcon(V_ui_svgIcon(_icoSearch_, 16, 16, _dark_));

    T.keyword.placeholder(V_lang_text35() + " / ...");
    // T.keyword.placeholder(V_lang_text35() +___+ "Table of Contents" + " / ...");

    // 绑定输入框事件处理
    // T.keyword.onInput = function (source, value) {
    T.keyword.onInput = function (value) {
        // 先重置
        T.toc.resultNav.reset();
        T.figures.resultNav.reset();
        T.tables.resultNav.reset();
        T.tables.resultNav.reset();
        T.media.resultNav.reset();
        T.codeblocks.resultNav.reset();
        T.formulas.resultNav.reset();

        // 无输入内容
        if (V_length(value.x()) === 0) {
            // 对目录的处理
            T.toc.ui.result.empty();
            if (T.segs.checkedItemValue() === T.toc.typeName())
               T.toc.ui.body.show();
            T.toc.hideFilterResult();
            T.toc.scrollToCurrent();
            T.toc.updateStatus();
            // 对 插图、表格、多媒体、代码块 的处理
            Index_noneKeyword(T.figures);
            Index_noneKeyword(T.tables);
            Index_noneKeyword(T.codeblocks);
            Index_noneKeyword(T.formulas);
            Index_noneKeyword(T.media);
        }
        // 有输入内容
        else {
            // 对目录的处理
            T.toc.filter(value.l());
            // 对 插图、表格、代码块、多媒体 的处理
            Index_filter(T.figures, value.l());
            Index_filter(T.tables, value.l());
            Index_filter(T.codeblocks, value.l());
            Index_filter(T.formulas, value.l());
            Index_filter(T.media, value.l());

            // let itemName = _catalog_;
            // // 目录
            // if (T.toc.filter(value.l()))
            //     itemName = _catalog_;
            // // 插图、表格、代码块、多媒体
            // else if (TocIndex_filter(T.figure, value.l()))
            //     itemName = _figure_;
            // else if (TocIndex_filter(T.table, value.l()))
            //     itemName = _table_;
            // else if (TocIndex_filter(T.codeblock, value.l()))
            //     itemName = _codeblock_;
            // else if (TocIndex_filter(T.media, value.l()))
            //     itemName = _media_;
            // 选中从左起有匹配记录的第 1 个分段
            // T.segs.setChecked(itemName);
        }
    }

    // T.keyword.onFocus = function (source) {
    T.keyword.onFocus = function () {
        if (T.lastDisplayType !== _float_) {
            JQ_addClass(VOM_doc(), _actived_);
            let search = V_byClass(_vFocusSearch_);
            JQ_addClass(search, _actived_);
        }
    }

    // T.keyword.onBlur = function (source) {
    T.keyword.onBlur = function () {
        JQ_removeClass(VOM_doc(), _actived_);
        JQ_removeClass(V_byClass(_vFocusSearch_), _actived_);
    }

    // 绑定输入框事件处理
    T.keyword.pressEnter = function () {
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
        V_util_setScrollTop(0);
        // 有封面 模式时处理
        if (VOM_cover() !== gUndefined) {
            if (T.toc.currentItem !== gUndefined) {
                JQ_removeClass(T.toc.currentItem, _vItemCurrent_);
                T.toc.currentHeaderIndex = -1;
            }
            // T.adjust();
            // T.chpNav.adjust();
            // T.toolbar.adjust();
            V_ui_adjustAll();
        }
        // 无封面 模式时处理
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
            if (!V_ui_inHeader() || V_ui_isSmallScreen()) {
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
        if (V_pageMode !== _max_ || T.showed || T.ui.oL() > -T.width) {
            return gFalse;
        }

        let left = gWritePaddingRight;
        T.ui.c(_left_, left);
        T.handle.hide();

        T.lastDisplayType = lastDisplayType;
        // 以「占位方式」显示导航中心
        if (T.lastDisplayType === _block_) {
            // 占位方式的样式设置
            JQ_removeClass(T.ui, _vNavCenterFloat_);
            JQ_removeClass(T.ui, _vFloatCard_);
            JQ_addClass(T.ui, _vNavCenterBlock_);

            // 更新工具栏导航中心按钮图标
            if (!V_util_isMobile())
                JQ_addClass(T.toolbar.btns[_navCenter_], _selected_);

            VOM_doc().c(_marginLeft_, _writeMarginLeft_);
            MoreDocContent_updateUI();

            // 因为从切换为占位显示后，会影响文档内容布局，所以须调整随大小变化的内容
            if (!T.showed) {
                setTimeout(() => {
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

            // 在移动端屏宽较小时，如：
            // 手机 iPhone 12 Pro 为 390
            // 手机 iPhone 6/7/8 Plus、iPhone 14 Pro Max 为 414
            if (jq_Window.w() <= 425) // 与 CSS @media screen and (max-width: 850px) 同步修改
                V_util_setVarVal(__NavCenterWidth_, jq_Window.w() - left * 2 + "px");

            // 显示联动的遮罩
            T.mask.show();
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
            if (!V_util_isMobile())
                JQ_removeClass(T.toolbar.btns[_navCenter_], _selected_);
        }

        T.ui.c(_left_, _varNavCenterHiddenLeft_);

        // 恢复不挤压文档正文区
        VOM_doc().c(_cssText_, _marginLeft_ + ":" + _auto_ + _important_);
        MoreDocContent_updateUI(VOM_doc());

        T.mask.hide();

        // 非移动设备时显示把手
        if (!V_util_isMobile())
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
        if (V_pageMode === _max_)
            VOM_doc().c(_cssText_, _marginLeft_ + ":" + _auto_ + _important_);
        if (T.showed && T.lastDisplayType === _block_) {
            VOM_doc().c(_marginLeft_, _writeMarginLeft_);
            MoreDocContent_updateUI();
        }

        T.width = T.ui.w();

        // 在封面，或为小屏
        if (!V_ui_inHeader() || V_ui_isSmallScreen()) {
            // 自动隐藏导航中心
            result = T.hide(_auto_);

            // 根据最新窗口大小调整收起位置
            T.ui.c(_left_, _varNavCenterHiddenLeft_);

            // 更新工具栏导航中心按钮图标
            if (!V_util_isMobile())
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
                if (!V_util_isMobile())
                    JQ_addClass(T.toolbar.btns[_navCenter_], _selected_);
            }
        }
        return result;
    }

    /**
     * 显示导航中心引导把手
     */
    T.showHandle = function () {
        if (V_pageMode !== _max_)
            return;

        T.handle.c(_top_, (jq_Window.h() - T.handle.h()) / 2);
        T.handle.show();
    }

    /**
     * 鼠标位置变化对导航中心处理
     */
    T.snap = function (event) {
        // 已显示则跳过
        if (T.showed || V_util_isMobile())
            return;

        // 鼠标离左边缘小于指定值时
        let h = jq_Window.h();
        if (event.clientY > (h * 0.3) && event.clientY < (h * 0.7) && event.clientX <= gWritePaddingRight) {
            if (T.snapTimer != gNull)
                return;

            JQ_addClass(T.handle, _hover_);

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            T.snapTimer = setTimeout(() => {
                JQ_removeClass(T.handle, _hover_);
                T.show(_float_);
            }, 1000);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (T.snapTimer != gNull) {
                clearTimeout(T.snapTimer);
                T.snapTimer = gNull;
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
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        // 文档库热键操作
        if (T.docLib !== gUndefined)
            T.docLib.disposeHotkey(key, combKeys, event);

        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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
    // 没有生成目录
    if (V_length(gToc) === 0) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // 转换到生成的 <nav> 下
    let vlookToc = gToc.clone(false), // false 指不复制子元素
        tocContent = gToc.ch("." + _mdToc__ + _content_),
        navToc = $(V_ui_nav(_, _, _));
    // 克隆属性数据
    $.each(tocContent.prop("attributes"), (index, element) => {
        navToc.attr(element.name, element.value);
    });
    navToc.hm(tocContent.hm());
    vlookToc.hm(navToc.prop(_outerHTML_));

    // 移除原目录数据，避免同名 DOM
    JQ_remove(gToc);
    // 将复制的目录进行唯一性标识
    vlookToc.f("." + _mdToc__ + _content_).a(_id_, _vlookToc_);
    iNavCenter.toc.ui.body.ap(vlookToc);

    gTocContent = V_byID(_vlookToc_);
    gToc = gTocContent.p(); // 更新引用块
    // if (V_length(gToc) > 0)
    //     V_ui_stopScrollPropagation(gToc.p());
    // 检查目录内容情况
    if (V_length(gTocContent) === 0) {
        NavCenter.hideOnError();
        return gFalse;
    }

    // ----------------------------------------
    // 标记不发布的内容
    // 须在 gTocContent 赋值后，以及在 catalog.add() 前执行
    if (V_util_getParamVal("unpub") !== _off_)
        Unpublished_init();

    // 文库
    iNavCenter.docLib = new DocLib(new BgMask(_docLib_, _center_), this);
    // 当前文档不是 mini 类型（文库类文档一般为 mini 类型）
    if (V_pageMode !== _mini_) {
        // 文库
        if (iNavCenter.docLib === gUndefined)
            ALERT(_failed_ + "iDocLib ]");
        else
            iNavCenter.docLib.init();
    }
    // 根据文库配置显示入口
    if (iNavCenter.docLib !== gUndefined && iNavCenter.docLib.enabled)
        iToolbar.btns[_docLib_].c(_display_, "flex");

    // 有 Typora 生成的原始目录节点，针对 VLOOK 的封面规则进行调整
    let tocSet = gTocContent.ch("." + _mdToc__+ "h1,." + _mdToc__+ "h2,." + _mdToc__+ "h3,." + _mdToc__+ "h4,." + _mdToc__+ "h5,." + _mdToc__+ "h6"),
        tocSetLength = V_length(tocSet),
        hasCover = (VOM_cover() !== gUndefined);
    tocSet.e((index, element) => {
        let _t = $(element);
        // 只处理 h1～h5 的目录节点
        if (_t.a(_class_).i(_mdToc_ + "-h6") === -1) {
            if (hasCover) { // 文档有封面时
                if (index < tocSetLength - 1) // 未到最后一个元素
                    iNavCenter.toc.add(_t);
                else // 最后一个 h1 为封底，移除
                    JQ_remove(_t);
            }
            else
                iNavCenter.toc.add(_t);
        }
        // 移除无效的目录节点（如：封面、封底、普通的 h6 节点）
        else
            JQ_remove(_t);
    });

    // 不指定打开，则默认收起所有含子章节的 h1 章节
    let tocAutoCloseLevel = V_util_getParamVal(_toc_);
    tocAutoCloseLevel = (tocAutoCloseLevel != gNull) ? JS_parseInt(tocAutoCloseLevel) : 1;
    if (tocAutoCloseLevel >= 1 && tocAutoCloseLevel <=5) {
        gTocContent.ch("." + _mdToc__ + "h" + tocAutoCloseLevel + V_attrCSS(_dataNode_, 1) + V_attrCSS(_dataFolded_, _false_)).e((index, element) => {
            iNavCenter.toc.disposeFold($(element).a(_id_), "c", gTrue);
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
        "文档中没有找到目录信息，请用 Typora 最新版本导出，并应用最新 VLOOK™ 插件",
        "No [TOC] information was found in the " + _document_ + ", export it with the latest version of Typora and apply the latest VLOOK™ plug-in."
    ][V_lang]);
}

// ==================== 逐章导航类 ==================== //

/**
 * 构造函数
 */
function ChapterNav() {
    let T = this,
        __prevName = _vChapterNav_ + __prev,
        __currentName = _vChapterNav_ + __current_,
        __nextName = _vChapterNav_ + __next_,
        __docTitleName = _vChapterNav_ + __docTitle_;
    // 逐章导航面板主界面
    T.ui = V_byClass(_vChapterNav_ + _);

    T.prev = {
        ui : V_byClass(__prevName), // 前一章界面
        text: V_byClass(_vChapterNav_ + __prev + __text_), // 前一章文本界面
    };

    T.current = {
        ui : V_byClass(__currentName), // 当前章节界面
    };

    T.next = {
        ui : V_byClass(__nextName), // 后一章界面
        text : V_byClass(_vChapterNav_ + __next_ + __text_), // 后一章文本界面
    };

    // 文档标题
    T.dt = V_byClass(__docTitleName);
    T.dt.t(V_util_getDocTitle());

    if (V_pageMode !== _max_)
        T.ui.hide();

    /**
     * 初始化动效
     */
    T.adjustEffectLevel = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (V_ui_effect >= 1) {
            JQ_addClass(V_byClass(target), _effect_);
            V_ui_addAnimate(V_byClass(target + ".effect"));
        }
        else {
            JQ_exchangeClass(V_byClass(target), _effect_, "noeffect");
        }
    }
    // 初始化动效
    T.adjustEffectLevel(__prevName);
    T.adjustEffectLevel(__currentName);
    T.adjustEffectLevel(__nextName);
    T.adjustEffectLevel(__docTitleName);

    /**
     * 跳转至前一章节
     */
    T.prev.ui.uC().ck(() => {
        ToolTips_hide();
        if (T.prev.text.a(_dataAnchor_) === _cover_)
            iNavCenter.gotoCover();
        else
            iNavCenter.toc.gotoHeader(T.prev.text);
    });

    /**
     * 回到封面
     */
    T.dt.uC().ck((event) => {
        ToolTips_hide();
        if ($(event.currentTarget).a(_disabled_) === gUndefined)
            iNavCenter.gotoCover();
    });

    /**
     * 跳转至当前章节
     */
    T.current.ui.uC().ck(() => {
        ToolTips_hide();
        iNavCenter.toc.gotoHeader(T.current.ui);
    });

    /**
     * 跳转至后一章节
     */
    T.next.ui.uC().ck(() => {
        ToolTips_hide();
        iNavCenter.toc.gotoHeader(T.next.text);
    });

    /**
     * 更新逐章导航栏 UI 及数据
     */
    T.update = function () {
        let curIdx = iNavCenter.toc.currentHeaderIndex;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (curIdx > 0) {
            T.prev.ui.show();
            T.prev.ui.c(_display_, _block_);
            T.prev.text.t(V_byID(iNavCenter.toc.h[curIdx - 1]).t());
            T.prev.text.a(_dataAnchor_, iNavCenter.toc.h[curIdx - 1]);

            // 无封面 模式时处理
            if (VOM_cover() === gUndefined) {
                JQ_removeClass(T.dt, _inStart_);
                JQ_removeAttr(T.dt, _disabled_);
                T.adjustEffectLevel(__docTitleName);
                ToolTips_bind(T.dt, _center_);
            }
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (iNavCenter.toc.inFirstHeader()) {
            T.prev.text.t(V_lang_text(1, [
                "文档封面",
                _Document_ +___+ _cover_
            ]));
            T.prev.text.a(_dataAnchor_, _cover_);
        }
        // 无封面 模式时对「文档标题」章节的特殊处理
        else if (iNavCenter.toc.inDocTitle()) {
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
        if (iNavCenter.toc.currentItem !== gUndefined) {
            // 无封面 模式
            if (iNavCenter.toc.inDocTitle())
                T.current.ui.hide();
            else
                T.current.ui.show();

            let headerNum = iNavCenter.toc.currentItem.a(_dataHeaderNum_);
            if (headerNum === gUndefined)
                headerNum = _;
            T.current.ui.hm(V_ui_span(_, _, headerNum) + ___
                + iNavCenter.toc.currentItem.a(_title_));
            T.current.ui.a(_dataAnchor_, iNavCenter.toc.h[curIdx]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (curIdx < V_length(iNavCenter.toc.h) - 1) {
            T.next.ui.show();
            T.next.text.t(V_byID(iNavCenter.toc.h[curIdx + 1]).t());
            T.next.text.a(_dataAnchor_, iNavCenter.toc.h[curIdx + 1]);
        }
        else
            T.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    T.show = function () {
        // 若已显示则直接退出
        if (V_pageMode !== _max_)
            return;

        JQ_addClass(T.ui, _vFloatCard_);

        T.ui.c(_top_, V_ui_isSmallScreen() ? 0 : 10);
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
        if (!V_ui_inHeader()) {
            T.hide();

            // 初始化前 / 后章节数据
            T.prev.text.a(_dataAnchor_, _cover_);
            T.next.text.a(_dataAnchor_, iNavCenter.toc.h[0]);
        }
        // 不在封面时，显示逐章导航栏
        else {
            T.show();
            T.update();
        }
    }

    /**
     * 逐章导航导航按钮在不同终端的适配处理
     */
    T.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (V_util_isMobile()) {
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
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = false;
        switch (key) {
            case _arrowLeft_:
            case ',':
                T.prev.ui.tr(_click_);
                // 自适应页面内容显示
                iNavCenter.toc.focusHeader();
                handled = true;
                break;
            case _arrowRight_:
            case '.':
                T.next.ui.tr(_click_);
                // 强制设置滚动间隔已超时，以强制触发 focusHeader 中的处理
                V_doc_scroll_update(0, 0);
                // 自适应页面内容显示
                iNavCenter.toc.focusHeader();
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
 */
function ParagraphNav() {
    let T = this;
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
        return $(V_attrCSS(_dataId_, "vk-pg-" + T.curIdx));
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
            BottomTips_show(key1 + V_lang_text(16, [
                    "前一个",
                    _Previous_
                ]) + key2 + V_lang_text(17, [
                    "后一个",
                    _Next_
                ]) + key3 + V_lang_text(34, [
                    _Exit_cn_,
                    _Exit_en_
                ]));

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
        item.uC().ck(() => {
            // 未激活段落导航模式模式
            if (!iParagraphNav.enabled) {
                if (ThreeClicker_tick()
                    && iParagraphNav.tg(item)) {
                        iSpotlight.hide();
                        iLaserPointer.hide();
                        BottomTips_show();
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
            && ((item.oT() - height) < V_util_getScrollTop()
            || (item.oT() + height) > (V_util_getScrollTop() + jq_Window.h()))) {
                V_util_setScrollTop(item.oT() - jq_Window.h() / 2, DOM_html());
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
        BottomTips_hide();
        JQ_removeClass(T.toolbar.btns[_paragraphNav_], _selected_);
        T.enabled = gFalse;
        T.blurFocus();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (!T.enabled)
            return;

        let handled = false;
        switch (key) {
            case 'j':
            case 'J':
                TableCross_hide();
                if (T.nextPg(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用块
                handled = true;
                break;
            case 'k':
            case 'K':
                TableCross_hide();
                if (T.prevPg(1)) // 步长1
                    ExtQuote_autoUnfold(); // 自动展开引用块
                handled = true;
                break;
            case _escape_:
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
    iParagraphNav = new ParagraphNav();
    // 添加关联组件
    iParagraphNav.toolbar = iToolbar;

    // 先清理多余的段落标签
    $("li>p" + _onlyChild_).contents().unwrap();

    // 初始化
    $(_h1_6_ + ",ul>li," + _summary_ + ",ol>li,p" + V_attrCSS(_class_, _mdToc__ + _content_, "!") + ",figure,.md-alert,." + _mdDiagramPanel_ + ",.MathJax_SVG_Display").e((index, element) => {
        let item = $(element);
        // 跳过不可见元素、子元素有嵌套 p 的情况，如li > p
        if (item.is(":" + _visible_)
            && (V_length(item.ch("p")) === 0 || V_util_getTagName(item) === _details_)) {
            iParagraphNav.add(item);

            // 双击内容块
            item.on("dblclick", () => {
                // 激活三击检查
                // 配合段落的单击事件对 ThreeClicker_tick() 的判断实现
                if (!V_util_isMobile())
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
    ThreeClicker_activeTime = V_util_getTime();
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
    if (V_util_getTime() - ThreeClicker_activeTime < 300) {
        // 取消文本选择
        gWindow.getSelection().removeAllRanges();
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
    T.ui = V_byClass(_vToolbar_); // 工具栏主界面
    T.btns = []; // 工具栏按钮集
    T.chpNav = chpNav;

    if (V_pageMode !== _max_)
        T.ui.hide();

    V_ui_addAnimate(T.ui);

    /**
     * 添加按钮
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    T.add = function (name, clickEvent) {
        T.btns[name] = V_byClass(_vBtn_ + "." + name);

        T.btns[name].uC().ck(() => {
            ToolTips_hide();
            typeof(clickEvent) === _function_ && clickEvent();
        });

        V_ui_addAnimate(T.btns[name]);

        // 对 mouseenter 和 mouseleave 事件处理
        T.btns[name].on(_mouseEnter_, (event) => {
            let _t = $(event.currentTarget),
                btnGroup = _t.a(_dataBtnGroup_);
            if (btnGroup !== gUndefined)
                JQ_addClass(V_byClass(_vBtnGroup_ + "." + btnGroup), _hover_);
            ToolTips_show(_t, _auto_);
        }).on(_mouseLeave_, (event) => {
            let btnGroup = $(event.currentTarget).a(_dataBtnGroup_);
            if (btnGroup !== gUndefined)
                JQ_removeClass(V_byClass(_vBtnGroup_ + "." + btnGroup), _hover_);
            ToolTips_hide();
        });
    }

    /**
     * 添加分隔条
     * @param name 分隔条标识
     */
    T.addSpliter = function (name) {
        T.btns[name] = V_byClass("v-" + name);
    }

    /**
     * 自适应显示工具栏
     */
    T.adjust = function () {
        if (V_pageMode !== _max_)
            return null;

        // 移动端下隐藏不必要的功能入口
        if (V_util_isMobile()) {
            T.btns[_paragraphNav_].hide();
            T.btns[_spotlight_].hide();
            T.btns[_laserPointer_].hide();
            T.btns[_toolbarSpliter_].hide();
        }

        let resultTop = 0,
            resultPadding = 0;

        // 如果是小屏，或在封面
        if (V_ui_isSmallScreen() || !V_ui_inHeader()) {
            let offsetY = 0;
            // 小屏
            if (V_ui_isSmallScreen()) {
                resultPadding = 0;
                resultTop = 50 + offsetY;
                T.ui.c(_paddingLeft_, resultPadding)
                    .c(_paddingRight_, resultPadding)
                    .c(_top_, resultTop);
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
                && !V_ui_inHeader()) {
                resultPadding = 10;
                if (V_util_getScrollTop() <= 5) {
                    resultTop = gWritePaddingRight;
                    T.ui.c(_paddingLeft_, resultPadding)
                        .c(_paddingRight_, resultPadding)
                        .c(_top_, resultTop);
                }
                else {
                    resultTop = 0;
                    T.ui.c(_paddingLeft_, resultPadding)
                        .c(_paddingRight_, resultPadding)
                        .c(_top_, resultTop);
                }
            }
            else {
                // 小屏，在非封面位置进行二次调整
                if (V_ui_isSmallScreen() && V_ui_inHeader()) {
                    resultPadding = 0;
                    resultTop = 50 + offsetY;
                    T.ui.c(_paddingLeft_, resultPadding)
                        .c(_paddingRight_, resultPadding)
                        .c(_top_, resultTop);
                }
                else {
                    resultPadding = 10;
                    // 小屏，在封面及最开始位置进行二次调整
                    if (V_util_getScrollTop() <= 5) {
                        resultTop = gWritePaddingRight;
                        T.ui.c(_paddingLeft_, resultPadding)
                            .c(_paddingRight_, resultPadding)
                            .c(_top_, resultTop);
                    }
                    // 小屏，在封面位置进行二次调整
                    else {
                        resultTop = 0;
                        T.ui.c(_paddingLeft_, resultPadding)
                            .c(_paddingRight_, resultPadding)
                            .c(_top_, resultTop);
                    }
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
            let btnCount = V_length(T.ui.f("." + _vBtn_)),
                btnWidth = JS_parseInt(V_util_getVarVal("--v-tb-btn-w")),
                space = JS_parseInt(V_util_getVarVal("--v-tb-btn-s"));
            T.btns[_toolbarSpliter_].c(_width_, "calc((" + _varNavCenterWidth_ + " - "
                    + (btnCount * btnWidth + JS_parseInt(T.ui.c(_paddingLeft_)) * 2 + (btnCount - 4) * space) + "px) / 2)");

            resultPadding = 10;
            resultTop = 10;
            T.ui.c(_paddingLeft_, resultPadding)
                .c(_paddingRight_, resultPadding)
                .c(_top_, resultTop);
            // 为增加了工具栏按钮的背景去掉浮动样式
            JQ_removeClass(T.ui.ch(_vBtn__BtnGroup_), _vFloatCard_);
            JQ_removeClass(T.ui.ch(_vBtn__BtnGroup_), _float_);
        } // else
        T.ui.show();

        // ERROR(111, T.ui.offset().left);
        // ERROR(111, T.ui.c(_left_));
        // 返回结果集（因为在启用动画时无法实时获得最终度量信息，需要以结果方式直接返回）
        return {
            t: resultTop,
            l: JS_parseInt(T.ui.c(_left_)),
            r: JS_parseInt(T.ui.c(_right_)),
            p: resultPadding
        };
    }
}

// ==================== 颜色方案类 ==================== //

let ColorScheme_auto = gTrue, // 是否为 auto 模式
    ColorScheme_systemScheme = _light_,
    ColorScheme_scheme = _light_, // 当前颜色方案，auto/light/dark
    ColorScheme_schemeBeforePrint = _light_; // 打印前的颜色方案

/**
 * 初始化
 */
function ColorScheme_init() {
    let scheme = V_data_read(_colorScheme_, gTrue);
    if (scheme != gNull && (scheme === _light_ || scheme === _dark_))
        ColorScheme_auto = gFalse;

    // 监听系统的 Color Scheme 变化
    const mediaQuery = gWindow.matchMedia("(prefers-" + _colorScheme_ + ":" + _dark_ + ")");
    mediaQuery.addEventListener("change", __syncScheme);

    // 初始化
    ColorScheme_systemScheme = mediaQuery.matches ? _dark_ : _light_;
    ColorScheme_scheme = ColorScheme_systemScheme;

    // 根据系统 Color Scheme 变化进行适配更新颜色方案
    function __syncScheme(matcher) {
        ColorScheme_adjustScheme(matcher.matches);
    }
}

// 根据系统 Color Scheme 变化进行适配更新图标
function ColorScheme_adjustScheme(dark) {
    ColorScheme_systemScheme = dark ? _dark_ : _light_;
    if (!ColorScheme_auto)
        return;

    if (dark) {
        __setDarkIcon();
        ColorScheme_scheme = _dark_;
    }
    else {
        __setLightIcon();
        ColorScheme_scheme = _light_;
    }

    ColorScheme_refresh();

    // 在 Light Mode 时的文档图标
    function __setLightIcon() {
        if (LinkTool_checkHashMode)
            return;
        // 浏览器中显示的文档图标
        V_ui_changeDocIcon(V_util_getVarVal("--thm-fav-logo-lg"));
    }

    // 在 Dark Mode 时的文档图标
    function __setDarkIcon() {
        if (LinkTool_checkHashMode)
            return;
        // 浏览器中显示的文档图标
        V_ui_changeDocIcon(V_util_getVarVal("--thm-fav-logo-dk"));
    }
}

/**
 * 根据指定的颜色方案对文档进行刷新
 * @param force 是否强制指定，如应用于根据调校参数指定
 */
function ColorScheme_refresh(force) {
    if (!force && ColorScheme_auto) {
        V_data_remove(_colorScheme_, gTrue);
        ColorScheme_scheme = ColorScheme_systemScheme;
    }
    else if (!force)
        V_data_write(_colorScheme_, ColorScheme_scheme, gTrue);

    // 批量修改颜色方案相关的 CSS 变量为指定的新值
    let ac = "--ac-",
        __alt = "-a",
        __fade_bd = __fade_ + "-bd",
        _title = __title_,
        __cur = "--cur-",
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

    let __pn = "--pn",
        __tbl = "--tbl-",
        _variable = "variable",
        _string = "string";
    V_util_changeCssVarSet([
        "--v-" + _invert_ + "-" + _dark_,
        "--v-" + _brightness_ + "-" + _dark_,
        "--" + _img_ + "-bd-" + _invert_,
        "--d-bc",
        "--d-bi",
        "-" + __fade_ + "-r",
        "-" + __fade_ + "-g",
        "-" + __fade_ + "-b",
        "--d-fc",
        "--" + _fig_ + "-solid-bg",
        _varFigGrid__ + "l",
        _varFigGrid__ + "b",
        _varFigGrid__ + "l-" + _invert_,
        _varFigGrid__ + "b-" + _invert_,
        __pn + "-c",
        __pn + "-c-a",
        __pn + __fade_ + "-r",
        __pn + __fade_ + "-g",
        __pn + __fade_ + "-b",
        "--" + _blockquote_ + "-bg",
        "--a-" + _color_,
        "--a-" + _hover_ + "-" + _color_,
        "--" + _mark_ + "-bg",
        __tbl + "bd",
        __tbl + "tr-hv",
        __tbl + "th-bg",
        __tbl + "td-bg",
        __tbl + "cell-bd",
        __tbl + "row-g-alpha",
        "--toc-h-num-" + _color_,
        "--h-f",
        "--h-box" + __shadow_,
        "--h-bg-" + _start_,
        "--h-bg-end",
        "--code-bg",
        "--std-code" + __shadow_,
        "--rb-code" + __shadow_,
        "--v-fl-sd",
        "--v-fl-i-sd",
        "--c-blk-bg",
        "--key-bg",
        "--key-reflect",
        "--key" + __shadow_,
        "--doc" + __shadow_,
        __cur + _pointer_,
        __cur + _copy_ + "-" + _normal_,
        __cur + _copy_ + "-as-md",
        __cur + _text_,
        __cur + "laser",
        __cur + "md",
        __cur + "doclib",
        __cur + _http_,
        __cur + "https",
        __cur + "email",
        __cur + "docment",
        __cur + "archive",
        __cur + "risk",
        __cur + _inner_,
        acRed,
        acRed + __alt,
        acRed + __fade_,
        acRed + __fade_bd,
        acRed + _title,
        acOrange,
        acOrange + __alt,
        acOrange + __fade_,
        acOrange + __fade_bd,
        acOrange + _title,
        acYellow,
        acYellow + __alt,
        acYellow + __fade_,
        acYellow + __fade_bd,
        acYellow + _title,
        acLime,
        acLime + __alt,
        acLime + __fade_,
        acLime + __fade_bd,
        acLime + _title,
        acGreen,
        acGreen + __alt,
        acGreen + __fade_,
        acGreen + __fade_bd,
        acGreen + _title,
        acMineral,
        acMineral + __alt,
        acMineral + __fade_,
        acMineral + __fade_bd,
        acMineral + _title,
        acOlives,
        acOlives + __alt,
        acOlives + __fade_,
        acOlives + __fade_bd,
        acOlives + _title,
        acWine,
        acWine + __alt,
        acWine + __fade_,
        acWine + __fade_bd,
        acWine + _title,
        acAqua,
        acAqua + __alt,
        acAqua + __fade_,
        acAqua + __fade_bd,
        acAqua + _title,
        acCyan,
        acCyan + __alt,
        acCyan + __fade_,
        acCyan + __fade_bd,
        acCyan + _title,
        acBlue,
        acBlue + __alt,
        acBlue + __fade_,
        acBlue + __fade_bd,
        acBlue + _title,
        acSea,
        acSea + __alt,
        acSea + __fade_,
        acSea + __fade_bd,
        acSea + _title,
        acLavender,
        acLavender + __alt,
        acLavender + __fade_,
        acLavender + __fade_bd,
        acLavender + _title,
        acVine,
        acVine + __alt,
        acVine + __fade_,
        acVine + __fade_bd,
        acVine + _title,
        acPurple,
        acPurple + __alt,
        acPurple + __fade_,
        acPurple + __fade_bd,
        acPurple + _title,
        acRose,
        acRose + __alt,
        acRose + __fade_,
        acRose + __fade_bd,
        acRose + _title,
        acPink,
        acPink + __alt,
        acPink + __fade_,
        acPink + __fade_bd,
        acPink + _title,
        acGold,
        acGold + __alt,
        acGold + __fade_,
        acGold + __fade_bd,
        acGold + _title,
        acBrown,
        acBrown + __alt,
        acBrown + __fade_,
        acBrown + __fade_bd,
        acBrown + _title,
        acGray,
        acGray + __alt,
        acGray + __fade_,
        acGray + __fade_bd,
        acGray + _title,
        acBlack,
        acBlack + __alt,
        acBlack + __fade_,
        acBlack + __fade_bd,
        acBlack + _title,
        acTheme1,
        acTheme1 + __alt,
        acTheme1 + __fade_,
        acTheme1 + __fade_bd,
        acTheme1 + _title,
        acTheme2,
        acTheme2 + __alt,
        acTheme2 + __fade_,
        acTheme2 + __fade_bd,
        acTheme2 + _title,
        mmRed,
        mmRed + __alt,
        mmOrange,
        mmOrange + __alt,
        mmYellow,
        mmYellow + __alt,
        mmGreen,
        mmGreen + __alt,
        mmCyan,
        mmCyan + __alt,
        mmBlue,
        mmBlue + __alt,
        mmPurple,
        mmPurple + __alt,
        mmPink,
        mmPink + __alt,
        mmBrown,
        mmBrown + __alt,
        mmGray,
        mmGray + __alt,
        cm + _keyword_,
        cm + _variable,
        cm + _variable + "-2",
        cm + _variable + "-3",
        cm + "tag",
        cm + "attribute",
        cm + "CodeMirror-cursor",
        cm + _string,
        cm + _string + "-2",
        cm + "comment",
        cm + "header",
        cm + _quote_,
        cm + "hr",
        cm + "link",
        cm + "negative",
        cm + "positive",
        cm + _mata_,
        cm + "bulidin",
        cm + "bracket",
        cm + "atom",
        cm + "number"
    ], (ColorScheme_scheme === _dark_) ? "dk" : "lg");

    // 针对 Dark Mode 进行适配处理
    ExtFigure_adjustColorScheme(gTrue);
}

// ==================== 字体风格选项、选择器类 ==================== //

let webfontHostAlt = _openfontsPages_CloudFlare_ + "/";
// let webfontHostAlt = _vlookOriginGitHub_ + "/openfonts/";
// let webfontHostAlt = _httpsPrefix_ + "madmaxchow.gitee.io/openfonts/";
// let webfontHostAlt = _httpsPrefix_ + "cdn.jsdelivr.net/gh/MadMaxChow/openfonts@master/";

/**
 * 构造函数
 * @param ui 选项的 UI
 * @param fonts 字体集数组
 */
function FontStyleOption(ui, fonts) {
    let T = this;
    T.ui = ui;
    T.fonts = fonts;
    T.fontCount = V_length(T.fonts);
}

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param styleName 默认的字体风格
 */
function FontStyle(mask, styleName) {
    let T = this;
    T.styleByTheme = styleName; // 主题配套字体风格
    T.style = styleName; // 当前字体风格
    T.ui = V_byClass(_vFontStyle_); // 字体风格切换选择界面
    // V_ui_stopScrollPropagation(T.ui);

    T.current = gUndefined;
    T.currentTimer = gNull;

    T.restore = V_byClass(_vFontStyleRestore_);

    // 字体风格选项：系统默认
    T.localStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-"  + _local_), []);
    // 字体风格选项：Book 书香里
    T.bookStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-" + _book_), []);
    // 字体风格选项：Gov 公文风
    T.govStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-" + _gov_), []);
    // 字体风格选项：Sans 小清新
    T.sansStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-" + _sans_), [
            _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            _VLOOK_Digital_Sans_ + _normal_normal_, //_VLOOK_Digital_Sans_ + _normal_500_,
            _VLOOK_Digital_Sans_ + _normal_bold_, //_VLOOK_Digital_Sans_ + _normal_900_,
            _VLOOK_Sans_Mono_ + _normal_normal_, //_VLOOK_Sans_Mono_ + _normal_500_,
            _VLOOK_Sans_Mono_ + _normal_bold_, //_VLOOK_Sans_Mono_ + _normal_900_,
            _VLOOK_Sans_ + _normal_normal_, _VLOOK_Sans_ + _normal_bold_//, _VLOOK_Sans_ + _normal_900_
            ]);
    // 字体风格选项：Serif 文艺范
    T.serifStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-" + _serif_), [
            _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            _VLOOK_Digital_Serif_ + _normal_normal_, _VLOOK_Digital_Serif_ + _normal_bold_, _VLOOK_Digital_Serif_ + _normal_italic_, _VLOOK_Digital_Serif_ + _italic_bold_,
            _VLOOK_Serif_Mono_ + _normal_normal_, _VLOOK_Serif_Mono_ + _normal_bold_, _VLOOK_Serif_Mono_ + _normal_italic_, _VLOOK_Serif_Mono_ + _italic_bold_,
            _VLOOK_Serif_ + _normal_500_, _VLOOK_Serif_ + _normal_900_,
            _VLOOK_Sans_Mono_ + _normal_normal_,//_VLOOK_Sans_Mono_ + _normal_500_,
            _VLOOK_Sans_Mono_ + _normal_bold_, //_VLOOK_Sans_Mono_ + _normal_900_,
            _VLOOK_Sans_ + _normal_normal_, _VLOOK_Sans_ + _normal_bold_//, _VLOOK_Sans_ + _normal_900_
        ]);
    // 字体风格选项：活力派
    T.albbStyle = new FontStyleOption(V_byClass(_vFontStyleOpt_ + "-" + _albb_), [
            _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            _VLOOK_Sans_Mono_ + _normal_normal_, //_VLOOK_Sans_Mono_ + _normal_500_,
            _VLOOK_Albb_ + _normal_normal_, _VLOOK_Albb_ + _normal_bold_,
            _VLOOK_Albb_DT_Sans_ + _normal_normal_,
            _VLOOK_Albb_DT_JinBu_ + _normal_normal_
        ]);
    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    // 恢复为主题配套的字体风格
    T.restore.uC().ck(() => {
        V_data_remove(_fontStyle_, gTrue);
        // T.style = V_util_getVarVal("--v-f-" + _style_);
        T.apply(T.styleByTheme, gTrue);
        T.hide();
    });

    // 绑定各字体风格选项事件
    T.localStyle.ui.uC().ck(() => {
        T.apply(_local_);
        T.hide();
    });
    T.bookStyle.ui.uC().ck(() => {
        T.apply(_book_);
        T.hide();
    });
    T.govStyle.ui.uC().ck(() => {
        T.apply(_gov_);
        T.hide();
    });
    T.sansStyle.ui.uC().ck(() => {
        T.apply(_sans_);
        T.initWebFont();
        T.hide();
    });
    T.serifStyle.ui.uC().ck(() => {
        T.apply(_serif_);
        T.initWebFont();
        T.hide();
    });
    T.albbStyle.ui.uC().ck(() => {
        T.apply(_albb_);
        T.initWebFont();
        T.hide();
    });

    /**
     * 初始化
     * @param style 可选。强制指定的字体风格
     */
    T.init = function (style) {
        // 有指定强制字体风格，同时指定的字体风格合法且与文档配套的不一致，则进行处理
        if (style !== gUndefined
            && style.m(/^(local|book|gov|sans|serif|albb)$/i) != gNull
            && style !== T.style) {
                T.style = style;
                T.apply(T.style);
        }

        LOG("_____ FONT STYLE (" + T.style + ") _____ ");

        T.syncInfo();

        T.initWebFont();

        // 对于本地字体风格的状态，直接为就绪
        // $(":is(." + _vFontInfo_ + "local,." + _vFontInfo_ + "book) > #" + _fontsetStatus_).t("✅ " + V_lang_text(38, [
        $(":is(." + _vFontInfo__ + _local_
            + ",." + _vFontInfo__ + _book_
            + ",." + _vFontInfo__ + _gov_ + ") > " + _span_).t("✅ " + V_lang_text38());
    }

    /**
     * 同频显示当前选择字体风格的加载信息
     */
    T.syncInfo = function () {
        // 使用自定义字体风格时的处理
        // if ((_sans_ + _serif_ + _albb_).i(T.style) > -1) {
            T.current = V_byClass(_vFontStyleCurrent_);

            JQ_removeClass(T.current, _done_);
            // 读取尺寸信息，强制浏览器重新计算元素的样式，后面重新添加 done 样式时能确保动画重新触发
            T.current.h();
            T.current.c(_display_, _flex_);
            // T.currentLoading.c(_visibility_, _visible_);

            __syncLoadingInfo();
        // }

        // 同步显示当前选择字体风格的加载信息
        function __syncLoadingInfo() {
            let currentFontStyle = V_byClass(_vFontInfo__ + T.style);
            T.current.hm(V_lang_text41() + _nbsp_ + currentFontStyle.hm());
            // 已完成加载
            if (currentFontStyle.a(_class_).i(_done_) > -1) {
                JQ_addClass(T.current, _done_);
                clearTimeout(T.currentTimer);
                T.currentTimer = gNull;
            }
            else {
                T.currentTimer = setTimeout(() => {
                    __syncLoadingInfo();
                }, 2000);
            }
        }
        // function __clearLoadingInfoTimer() {
        //     clearTimeout(T.currentTimer);
        //     T.currentTimer = gNull;
        // }
    }

    /**
     * 初始化 WebFont
     */
    T.initWebFont = function () {
        let fontWeight500 = 500,
            fontWeight900 = 900,
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
        let timeOutMsg = "❌ " + V_lang_text(39, ["超时", "Timeout"]);

        if (T.style === _local_) {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
        }
        else if (T.style === _sans_) {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
            // 动态加载字体 VLOOK Digital Sans
            __LoadDigitalSansFont();
            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Sans
            __loadSansCjkFont();

            // 对 Sans 字体风格的加载超时检测
            setTimeout(() => {
                if (V_length(T.sansStyle.fonts) > 0)
                    V_byClass(_vFontInfo__ + "sans > " + _span_).t(timeOutMsg);
                    // V_byClass(_vFontInfo_ + "sans > #" + _fontsetStatus_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }
        else if (T.style === _serif_) {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();
            // 动态加载字体 VLOOK Digital Serif
            __LoadDigitalSerifFont();
            // 动态加载字体 VLOOK Serif Mono
            __loadSerifMonoFont();
            // 动态加载字体 VLOOK Serif
            __loadSerifCjkFont();

            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Sans
            __loadSansCjkFont();

            // 对 Serif 字体风格的加载超时检测
            setTimeout(() => {
                if (V_length(T.serifStyle.fonts) > 0)
                    V_byClass(_vFontInfo__ + "serif > " + _span_).t(timeOutMsg);
                    // V_byClass(_vFontInfo_ + "serif > #" + _fontsetStatus_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }
        else if (T.style === _albb_) {
            // 动态加载字体 VLOOK Number
            __loadNumberFont();

            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();

            // 动态加载字体 VLOOK Albb
            __loadAlbbFont()
            // 动态加载字体 VLOOK Albb DT-Sans
            __loadAlbbDtSansFont();
            // 动态加载字体 VLOOK Albb DT-JinBu
            __loadAlbbDtJinBuFont();

            // 对 Albb 字体风格的加载超时检测
            setTimeout(() => {
                if (V_length(T.albbStyle.fonts) > 0)
                    V_byClass(_vFontInfo__ + "albb > " + _span_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }

        // 动态加载字体 VLOOK Number
        function __loadNumberFont() {
            let fontName = _VLOOK_Number_,
                srcName = "Altinn-DIN";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            // T.loadFont(fontName, _italic_, _normal_, srcName, srcName + _Italic);
        }

        // 动态加载字体 VLOOK Digital Sans
        function __LoadDigitalSansFont() {
            let fontName = _VLOOK_Digital_Sans_,
                srcName = _NotoSansMono_;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
            // T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName + _Medium, unicodeRange);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
            // T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black, unicodeRange);
        }

        // 动态加载字体 VLOOK Digital Serif
        function __LoadDigitalSerifFont() {
            let fontName = _VLOOK_Digital_Serif_,
                srcName = _LuxiMono_;
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
            T.loadFont(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular, unicodeRange);
            T.loadFont(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold, unicodeRange);
        }

        // 动态加载字体 VLOOK Sans Mono
        function __loadSansMonoFont() {
            let fontName = _VLOOK_Sans_Mono_,
                srcName = _NotoSansMono_;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            // T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName +_Medium);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            // T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Serif Mono
        function __loadSerifMonoFont() {
            let fontName = _VLOOK_Serif_Mono_,
                srcName = _LuxiMono_;
            let luxiMonoSubName = srcName + _Italic;
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.loadFont(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular);
            T.loadFont(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold);
        }

        // 动态加载字体 VLOOK Sans
        function __loadSansCjkFont() {
            let fontName = _VLOOK_Sans_,
                srcName = "NotoSansCJKsc";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            // T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Serif
        function __loadSerifCjkFont() {
            let fontName = _VLOOK_Serif_,
                srcName = "NotoSerifCJKsc";
            T.loadFont(fontName, _normal_, fontWeight500, srcName, srcName + _Medium);
            T.loadFont(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Albb
        function __loadAlbbFont() {
            let fontName = _VLOOK_Albb_,
                srcName = "AlibabaPuHuiTi";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.loadFont(fontName, _normal_, _bold_, srcName, srcName + _Bold);
        }

        // 动态加载字体 VLOOK Albb DT-Sans
        function __loadAlbbDtSansFont() {
            let fontName = _VLOOK_Albb_DT_Sans_,
                srcName = "DingTalk";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + "-Sans");
        }

        // 动态加载字体 VLOOK Albb DT-JinBu
        function __loadAlbbDtJinBuFont() {
            let fontName = _VLOOK_Albb_DT_JinBu_,
                srcName = "DingTalk";
            T.loadFont(fontName, _normal_, _normal_, srcName, srcName + "-JinBuTi");
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
     * @param folderName 字体目录名称
     * @param srcFontSubName 字体源子名称
     * @param unicodeRange 指定应用的字符范围
     */
    T.loadFont = function (fontFamily, fontStyle, fontWeight, folderName, srcFontSubName, unicodeRange) {
        if (gDocument.fonts && !T.isExist(fontFamily, fontStyle, fontWeight)) {
            let woffURL = "url('" + webfontHostAlt + folderName + "-" + _woff2_ + "/" + srcFontSubName + "." + _woff2_ + "') format('" + _woff2_ + "')",
                fontFace;
            // 有指定字符范围
            if (unicodeRange === gUndefined) {
                fontFace = new FontFace(fontFamily,
                    ((_woff2_ !== gUndefined) ? woffURL : _), {
                        style: fontStyle,
                        weight: fontWeight,
                        display: "swap"
                    });
            }
            // 无指定字符范围
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
            fontFace.load().then((loadedFontFace) => {
                gDocument.fonts.add(loadedFontFace);

                let fontID = fontFamily + "/" + fontStyle + "/" + fontWeight;
                    // readyMsg = "✅ " + V_lang_text(38, ["已就绪", _Ready_]),
                    // loadingMsg = V_lang_text(40, ["加载中", _Loading_]);

                LOG("↓↓↓ FONT LOADED ↓↓↓");
                LOG(fontID);

                // --------------------
                // 更新「小清新」风格字体包下载进度
                __updateDownloadProgress(fontID, _sans_, T.sansStyle);
                // // 剔除已下载的字体字形
                // for (let i = 0; i < V_length(T.sansStyle.fonts); i++) {
                //     if (T.sansStyle.fonts[i] === fontID) {
                //         T.sansStyle.fonts.splice(i, 1);
                //         break;
                //     }
                // }
                // // 计算进度
                // let sansLoadedCount = T.sansStyle.fontCount - V_length(T.sansStyle.fonts),
                //     sansStatus = V_byClass(_vFontInfo__ + "sans > " + _span_);
                // if (sansLoadedCount < T.sansStyle.fontCount)
                //     sansStatus.t(loadingMsg + " (" + JS_mathRound(sansLoadedCount / T.sansStyle.fontCount * 100) + "%)");
                // else {
                //     sansStatus.t(readyMsg);
                //     JQ_addClass(sansStatus.p(), _done_);
                // }

                // --------------------
                // 更新「文艺范」风格字体包下载进度
                __updateDownloadProgress(fontID, _serif_, T.serifStyle);
                // // 剔除已下载的字体字形
                // for (let i = 0; i < V_length(T.serifStyle.fonts); i++) {
                //     if (T.serifStyle.fonts[i] === fontID) {
                //         T.serifStyle.fonts.splice(i, 1);
                //         break;
                //     }
                // }
                // // 计算进度
                // let serifLoadedCount = T.serifStyle.fontCount - V_length(T.serifStyle.fonts),
                //     serifStatus = V_byClass(_vFontInfo__ + "serif > " + _span_);
                // if (serifLoadedCount < T.serifStyle.fontCount)
                //     serifStatus.t(loadingMsg + " (" + JS_mathRound(serifLoadedCount / T.serifStyle.fontCount * 100) + "%)");
                // else {
                //     serifStatus.t(readyMsg);
                //     JQ_addClass(serifStatus.p(), _done_);
                // }

                // --------------------
                // 更新「活力派」风格字体包下载进度
                __updateDownloadProgress(fontID, _albb_, T.albbStyle);
                // 剔除已下载的字体字形
                // for (let i = 0; i < V_length(T.albbStyle.fonts); i++) {
                //     if (T.albbStyle.fonts[i] === fontID) {
                //         T.albbStyle.fonts.splice(i, 1);
                //         break;
                //     }
                // }
                // // 计算进度
                // let albbLoadedCount = T.albbStyle.fontCount - V_length(T.albbStyle.fonts),
                //     albbStatus = V_byClass(_vFontInfo__ + "albb > " + _span_);
                // if (albbLoadedCount < T.albbStyle.fontCount)
                //     albbStatus.t(loadingMsg + " (" + JS_mathRound(albbLoadedCount / T.albbStyle.fontCount * 100) + "%)");
                // else {
                //     albbStatus.t(readyMsg);
                //     JQ_addClass(albbStatus.p(), _done_);
                // }
            });

            // 更新字体下载进度
            function __updateDownloadProgress(fontID, style, fontSet) {
                let readyMsg = "✅ " + V_lang_text38(),
                    loadingMsg = V_lang_text(40, ["加载中", _Loading_]);

                // 剔除已下载的字体字形
                for (let i = 0; i < V_length(fontSet.fonts); i++) {
                    if (fontSet.fonts[i] === fontID) {
                        fontSet.fonts.splice(i, 1);
                        break;
                    }
                }

                // 计算进度
                let loadedCount = fontSet.fontCount - V_length(fontSet.fonts),
                    status = V_byClass(_vFontInfo__ + style + " > " + _span_);

                // 未加载完成
                if (loadedCount < fontSet.fontCount)
                    status.t(loadingMsg + " (" + JS_mathRound(loadedCount / fontSet.fontCount * 100) + "%)");
                // 已加载完成
                else {
                    status.t(readyMsg);
                    JQ_addClass(status.p(), _done_);
                }
            }
        }
    }

    // /**
    //  * 更新当前字体风格加载信息 UI
    //  * @param measure 参考的度量信息
    //  */
    // // T.updateUI = function (measure) {
    //     // if (T.current === gUndefined)
    //     //     return;

    //     // // ERROR(111, T.currentLoading.c(_opacity_), );
    //     // if (T.current.c(_display_) === _none_)
    //     //     return;

    //     // let left = gWritePaddingRight;
    //     // if (measure != gNull) {
    //     //     // 对于工具栏不是展开，或是在小屏时的微调
    //     //     if (measure.r <= gWritePaddingRight || V_ui_isSmallScreen())
    //     //         left = measure.l + measure.p;
    //     // }
    //     // // ERROR(111, left);

    //     // T.current.c(_left_, left);
    // // }

    /**
     * 检测指定自定义字体是否已加载
     * @param fontFamily 自定义字体名称
     * @param fontStyle 字体样式
     * @param fontWeight 字重
     */
    T.isExist = function (fontFamily, fontStyle, fontWeight) {
        let values = gDocument.fonts.values(),
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
        // 如果有保存的配置，则显示 恢复 按钮
        T.restore.c(_display_, V_data_read(_fontStyle_, gTrue) != gNull ? _block_ : _none_);

        T.mask.show();
        V_ui_moveToCenter(T.ui);
        T.ui.show();

        LOG("'" + T.style + "'");

        // ERROR(111, _vFontStyleOpt_ + ">img");
        // ERROR(222, _vFontStyleOpt_ + "-"  + T.style);
        JQ_removeClass(V_byClass(_vFontStyleOpt_ + ">img"), _selected_);
        JQ_addClass(V_byClass(_vFontStyleOpt_ + "-"  + T.style), _selected_);
        // if (T.style === _local_) {
        //     JQ_addClass(T.localStyle.ui, _selected_);
        //     // JQ_addClass(T.bookStyle.ui, _selected_);
        //     // JQ_removeClass(T.sansStyle.ui, _selected_);
        //     // JQ_removeClass(T.serifStyle.ui, _selected_);
        // }
        // else if (T.style === _book_) {
        //     // JQ_removeClass(T.localStyle.ui, _selected_);
        //     JQ_addClass(T.bookStyle.ui, _selected_);
        //     // JQ_removeClass(T.sansStyle.ui, _selected_);
        //     // JQ_removeClass(T.serifStyle.ui, _selected_);
        // }
        // else if (T.style === _sans_) {
        //     // JQ_removeClass(T.localStyle.ui, _selected_);
        //     // JQ_removeClass(T.bookStyle.ui, _selected_);
        //     JQ_addClass(T.sansStyle.ui, _selected_);
        //     // JQ_removeClass(T.serifStyle.ui, _selected_);
        // }
        // else if (T.style === _serif_) {
        //     // JQ_removeClass(T.localStyle.ui, _selected_);
        //     // JQ_removeClass(T.bookStyle.ui, _selected_);
        //     JQ_addClass(T.serifStyle.ui, _selected_);
        //     // JQ_removeClass(T.sansStyle.ui, _selected_);
        // }
        // else if (T.style === _albb_) {
        //     // JQ_removeClass(T.localStyle.ui, _selected_);
        //     // JQ_removeClass(T.bookStyle.ui, _selected_);
        //     JQ_addClass(T.albbStyle.ui, _selected_);
        //     // JQ_removeClass(T.serifStyle.ui, _selected_);
        // }
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
     * @param styleName 指定应用的字体风格（local/book/gov/sans/serif/albb），不指定则以为当前字体风格
     * @param restore 是否为恢复模式
     */
    T.apply = function (styleName, restore) {
        // 修正无指定样式的情况
        if (styleName === gUndefined)
            styleName = T.style;

        T.style = styleName;
        if (restore !== gTrue)
            V_data_write(_fontStyle_, styleName, gTrue);

        // 涉及的 CSS 变量名称列表
        let varFFm = "--v-f-fm",
            varFw = "--v-f-w";
        const varList = [
            varFFm + __title_,
            varFFm + "-subtitle",
            varFFm + "-h",
            varFFm + __text_,
            varFFm + "-bd",
            varFFm + "-key",
            varFFm + "-num",
            varFFm + "-tag",
            varFFm + "-" + _code_,
            varFw + "-bd",
            varFw + __title_,
            varFw + __text_
        ];
        // 生成目标字体风格变量值列表
        let fontVarList = [];
        for (let i = 0, len = V_length(varList); i < len; i++) {
            fontVarList.push(V_util_getVarVal(varList[i] + "-" + T.style));
        }
        // 遍历所有变量实现字体风格的切换
        for (let i = 0, len = V_length(varList); i < len; i++) {
            V_util_setVarVal(varList[i], fontVarList[i]);
        }

        T.syncInfo();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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
function Footnote(mask) {
    let T = this;
    T.ui = V_byClass(_vFontnotePn_); // 脚注主界面
    T.content = V_byClass(_vFontnotePn_ + "-" + _content_); // 脚注内容区
    // V_ui_stopScrollPropagation(T.content);

    T.buttonSeeAll = V_byClass(_vFontnotePn_ + __footer_); // 查看所有脚注按钮
    T.buttonSeeAll.uC().ck(() => {
        T.hide();
        // 跳转至所有脚注区域
        WINDOW_setHref(_vkFooterAreaId_);
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
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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
Footnote.init = function () {
    // 将 Typora 的脚注调整到封底前，VLOOK 规范的文档中最后一个 <h6> 是封底
    let footnotesArea = V_byClass(_footnotesArea_);
    // 有封面 模式
    if (VOM_backcover() !== gUndefined)
        footnotesArea.insertBefore(VOM_backcover());
    // 无封面 模式
    else
        VOM_doc().ap(footnotesArea);

    // 将 VLOOK 生成的脚注区锚点调整到生成 HTML 后的实际位置
    $(_vkFooterAreaId_).insertBefore(footnotesArea);

    // 移除默认的跳转属性
    let a = $("a" + V_attrCSS(_name_, _refFootnote_, "^")
        + ",a" + V_attrCSS(_id_, _refFootnote_, "^"));
    JQ_removeAttr(a, _href_);
    // 将脚注角标的事件替换为指定的处理事件
    a.uC().ck((event) => {
        // 获取脚注【返回】链接对应的脚注原文信息
        let _t = $(event.currentTarget),
            nameValue = _t.a(_name_),
            nameValue2 = "df" + _refFootnote_,
            target = $("a" + V_attrCSS(_name_, "df" + nameValue)
                + ",a" + V_attrCSS(_id_, "df" + nameValue)).p().clone();

        // 更新脚注弹层内容区
        iFootnote.content.hm(target);
        // 移除默认的返回链接
        JQ_remove(target.f("a" + V_attrCSS(_name_, nameValue2, "^")
            + ",a" + V_attrCSS(_id_, nameValue2, "^")));

        // 显示脚注弹层
        iFootnote.show();
    });
}

// ==================== 状态栏类 ==================== //

let StatusBar_ui = gUndefined,
    StatusBar_handle = gUndefined,
    StatusBar_items = []; // 状态栏条目集

let StsLinkChkResult_ui = gUndefined,
    StsNewVersion_ui = gUndefined,
    StsColorScheme_ui = gUndefined,
    StsDocInfo_ui = gUndefined,
    StsLinkMap_ui = gUndefined,
    StsFontStyle_ui = gUndefined,
    StsPrint_ui = gUndefined;
/**
 * 构造函数
 */
function StatusBar_init() {
    StsLinkChkResult_ui = V_byClass(_vLinkChkResult_); // 检查结果
    StsNewVersion_ui = V_byClass(_vNewVersion_);
    StsColorScheme_ui = V_byClass(_vColorScheme_);
    StsDocInfo_ui = StsDocInfo_ui = V_byClass(_vDocInfo_);

    StatusBar_ui = V_byClass(_vStatusBar_);
    V_ui_addAnimate(StatusBar_ui.f(_div_));

    // 控制隐藏、显示的按钮
    StatusBar_handle = V_byClass("v-" + _handle_);
    StatusBar_handle.uC().ck(() => {
        // 进行隐藏
        if (parseInt(StatusBar_ui.c(_right_)) > 0) {
            StatusBar_ui.c(_right_, "-" + (StatusBar_ui.w() - StatusBar_handle.w() + 2) + "px");
            JQ_addClass(StatusBar_handle, _hidden_);
        }
        // 进行显示
        else {
            StatusBar_ui.c(_right_, gWritePaddingRight);
            JQ_removeClass(StatusBar_handle, _hidden_);
        }
    });

    // ----------
    // 功能入口：打印
    StsPrint_ui = V_byClass(_vPrint_);
    StsPrint_ui.a(_dataTips_, V_lang_text(2, [
        "打印...",
        "Print..."
    ]));
    ToolTips_bind(StsPrint_ui);
    StsPrint_ui.uC().ck(() => {
        V_print_ready();
    });

    // ----------
    // 功能入口：链接地图
    StsLinkMap_ui = V_byClass(_vLinkMap_);
    StsLinkMap_ui.a(_dataTips_, V_lang_text3() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("M")));

    ToolTips_bind(StsLinkMap_ui);
    StsLinkMap_ui.uC().ck(() => {
        if (LinkTool_panelList.isHidden())
            LinkTool_show(_map_);
        else
            LinkTool_hide();
    });

    // ----------
    // 功能入口：字体风格
    StsFontStyle_ui = V_byClass(_vStsFontStyle_);
    StsFontStyle_ui.a(_dataTips_, V_lang_text41() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("A")));

    ToolTips_bind(StsFontStyle_ui);
    StsFontStyle_ui.uC().ck(() => {
        iFontStyle.tg();
    });

    // ----------
    // 页面模式非 max（如文库）
    if (V_pageMode !== _max_)
        StsColorScheme_ui.hide();
    // 页面模式非 max（如文库），或为移动端时的处理
    if (V_pageMode !== _max_ || V_util_isMobile()) {
        StsDocInfo_ui.hide();
        StsPrint_ui.hide();
        StsLinkChkResult_ui.hide();
        StsFontStyle_ui.hide();

        // 过滤掉不可见的元素
        let visibleBtn = StatusBar_ui.ch().filter(function () {
            return $(this).c(_display_) !== _none_;
        });
        // 给最后一个元素添加指定样式
        JQ_addClass(visibleBtn.last(), _last_);
    }
}

/**
 * 更新状态栏 UI
 * @param measure 参考的度量信息
 */
function StatusBar_updateUI(measure) {
    if (StatusBar_handle !== gUndefined && StatusBar_handle.a(_class_).i(_hidden_) > -1)
        return;

    let right = gWritePaddingRight;
    if (measure != gNull) {
        // 对于工具栏不是展开，或是在小屏时的微调
        if (measure.r <= gWritePaddingRight || V_ui_isSmallScreen())
            right = measure.r + measure.p;
    }

    StatusBar_ui.c(_right_, right);
    iFontStyle.current.c(_right_, right);
}

// ==================== 文档信息类 ==================== //

let DocInfo_enabled = gTrue;
    // gRE_cjk = /\p{Unified_Ideograph}/ug;

/**
 * 构造函数
 */
// function StsDocInfo_init() {
//     StsDocInfo_ui = V_byClass(_vDocInfo_);
// }

/**
 * 统计字数
 */
function DocInfo_countWord() {
    if (!DocInfo_enabled)
        return;

    // let latin = VOM_doc().t().m(/[\w\-]+/g),
    //     cjk = VOM_doc().t().m(gRE_cjk);
    // ERROR(111, V_length(latin), ((latin)));
    // ERROR(222, V_length(cjk), ((cjk)));
    // let latinCount = (latin == gNull) ? 0 : V_length(latin),
    //     cjkCount = (cjk == gNull) ? 0 : V_length(cjk),
    //     wordCount = latinCount + cjkCount,
    //     readCountPerMin = 180;

    // 匹配中文字符
    // const chineseRegex = /[\u4e00-\u9fa5]/g;
    // // 匹配日文字符
    // const japaneseRegex = /[\u3040-\u30ff\u31f0-\u31ff\uFF66-\uFF9F]/g;
    // // 匹配韩文字符
    // const koreanRegex = /[\uac00-\ud7af]/g;
    // // 匹配英文单词
    // const englishRegex = /\b[a-zA-Z]+\b/g;
    // // 匹配法文、西班牙文、葡萄牙语、德文等拉丁字母的语言（含变音符号）
    // const nonEnglishRegex = /\b[\u00C0-\u024F]+\b/g;
    // // 匹配俄文单词
    // const russianRegex = /\b[\u0400-\u04FF]+\b/g;
    // // 匹配阿拉伯语字符
    // const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/g;

    // // 匹配中文字符
    // let reChinese = /[\u4e00-\u9fa5]/g,
    //     // 匹配日文字符
    //     reJapanese = /[\u3040-\u30ff\u31f0-\u31ff\uFF66-\uFF9F]/g,
    //     // 匹配韩文字符
    //     reKorean = /[\uac00-\ud7af]/g,
    //     // 使用 Unicode 字符类匹配拉丁语系的完整单词（包括英文、法文、西班牙文等）
    //     reLatinLike = /\b[\p{L}\p{M}\p{N}]+\b/gu,
    //     // 匹配俄文单词和数字
    //     reRussian = /[\u0400-\u04FF]+/g,
    //     // 匹配阿拉伯语字符和数字
    //     reArabic = /[\u0600-\u06FF]+/g;

    // 统计每种语言匹配到的词汇数量
    // let chineseCount = 0, japaneseCount = 0, koreanCount = 0,
    //     latinLikeCount = 0, russianCount = 0, arabicCount = 0;
    let counterResult = V_util_countWord(VOM_doc().t());
    // 验证各语言统计数据
    // let countResult = V_util_countWord("中文，Français, Detusch. 한국어. 文書ライブラリ。閱讀，Русский язык, Español. Português,العربية");

    // let latinCount = latinLikeCount + russianCount + arabicCount,
    //     cjkCount = chineseCount + japaneseCount + koreanCount,
    //     wordCount =latinCount + cjkCount;
    // let wordCount = counterResult.latin + counterResult.CJK;

    // 计算阅读时长
    let readCountPerMin = 200,
        mins = counterResult.total < readCountPerMin ? 1 : JS_parseInt(counterResult.total / readCountPerMin),
        times = mins +___+ V_lang_text(42, [
            "分钟",
            "minute(s)"
        ]);
    if (mins > 60)
        times = (mins / 60).toFixed(1) +___+ V_lang_text(43, [
            "小时",
            "hour(s)"
        ]);
    // 默认信息
    StsDocInfo_ui.a(_dataDefault_,
        times + " • " + V_formatting_thousands(JS_toString(counterResult.total)) +___+ V_lang_text(44, [
            "字",
            "words"
        ]));
    // 扩展信息
    StsDocInfo_ui.a(_dataExtend_,
        V_formatting_thousands(JS_toString(counterResult.CJK)) +___+ V_lang_text(11, [
            "中日韩",
            "CJK"
        ])
        +  " • " + V_formatting_thousands(JS_toString(counterResult.latin)) +___+ V_lang_text(12, [
            "非中日韩",
            "Non-CJK"
        ]));

    // 移动端时：通过点击事件切换扩展信息
    if (V_util_isMobile()) {
        StsDocInfo_ui.uC().ck((event) => {
            if (StsDocInfo_ui.hm() === StsDocInfo_ui.a(_dataExtend_))
                StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_));
            else
                StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataExtend_));
        });
    }
    // 非移动端时：通过鼠标 mouseenter 和 mouseleave 切换扩展信息
    else {
        StsDocInfo_ui.on(_mouseEnter_, (event) => {
            StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataExtend_));
        }).on(_mouseLeave_, (event) => {
            StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_));
        });
    }
    StsDocInfo_ui.hm(StsDocInfo_ui.a(_dataDefault_));

    // 统计字数
    // function __counting(content) {
    //     // 匹配中文字符
    //     let reChinese = /[\u4e00-\u9fa5]/g,
    //         // 匹配日文字符
    //         reJapanese = /[\u3040-\u30ff\u31f0-\u31ff\uFF66-\uFF9F]/g,
    //         // 匹配韩文字符
    //         reKorean = /[\uac00-\ud7af]/g,
    //         // 使用 Unicode 字符类匹配拉丁语系的完整单词（包括英文、法文、西班牙文等）
    //         reLatinLike = /\b[\p{L}\p{M}\p{N}]+\b/gu,
    //         // 匹配俄文单词和数字
    //         reRussian = /[\u0400-\u04FF]+/g,
    //         // 匹配阿拉伯语字符和数字
    //         reArabic = /[\u0600-\u06FF]+/g;

    //     let chineseCount = V_length(content.match(reChinese) || []),
    //         japaneseCount = V_length(content.match(reJapanese) || []),
    //         koreanCount = V_length(content.match(reKorean) || []),
    //         latinLikeCount = V_length(content.match(reLatinLike) || []),
    //         russianCount = V_length(content.match(reRussian) || []),
    //         arabicCount = V_length(content.match(reArabic) || []);

    //     return {
    //         latin: latinLikeCount + russianCount + arabicCount,
    //         CJK: chineseCount + japaneseCount + koreanCount
    //     };
    //     // ERROR(content);
    //     // ERROR(111, "Chinese", content.match(reChinese));
    //     // ERROR(222, "Japanese", content.match(reJapanese));
    //     // ERROR(333, "Korean", content.match(reKorean));
    //     // ERROR(444, "Latin", content.match(reLatinLike));
    //     // ERROR(555, "Russian", content.match(reRussian));
    //     // ERROR(666, "Arabic", content.match(reArabic));
    // }
}

// ==================== 状态栏的字体风格类 ==================== //

// let StsFontTheme_ui = gUndefined;
/**
 * 构造函数
 */
// function StsFontTheme_init() {
//     StsFontTheme_ui = V_byClass(_vStsFontTheme_);
//     if (V_pageMode !== _max_ || V_util_isMobile())
//         StsFontTheme_ui.hide();

//     StsFontTheme_ui.a(_dataTips_, [
//         "切换 字体风格",
//         "Switch Font Theme"
//     ][V_lang] + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("A")));

//     ToolTips_bind(StsFontTheme_ui);
//     StsFontTheme_ui.uC().ck(() => {
//         iFontTheme.tg();
//     });
// }

// ==================== 状态栏的颜色模式类 ==================== //

/**
 * 构造函数
 */
function StsColorScheme_init() {
    if (V_pageMode !== _max_) // || V_util_isMobile())
        StsColorScheme_ui.hide();

    StsColorScheme_ui.a(_dataTips_, V_lang_text(45, [
        "切换 自动/明亮/黑暗 模式",
        "Switch Auto/Light/Dark " + _Mode_
    ]) + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("D")));

    StsColorScheme_updateIcons();

    ToolTips_bind(StsColorScheme_ui);
    StsColorScheme_ui.uC().ck(() => {
        // 根据系统当前的 color scheme，确定不同模式切换的顺序
        let nextScheme = (ColorScheme_systemScheme === _light_ ? _dark_ : _light_ )
        // 切换不同模式
        if (ColorScheme_auto) {
            ColorScheme_auto = gFalse;
            ColorScheme_scheme = nextScheme;
        }
        else if (ColorScheme_scheme === nextScheme) {
            ColorScheme_scheme = ColorScheme_systemScheme;
        }
        else if (ColorScheme_scheme === ColorScheme_systemScheme) {
            ColorScheme_auto = gTrue;
            ColorScheme_scheme = nextScheme;
        }

        StsColorScheme_updateIcons();
        ColorScheme_refresh();
    });
}

/**
 * 更新按钮图标
 */
function StsColorScheme_updateIcons() {
    let icon = _icoAutoMode_;
    // 不是 auto 模式时
    if (!ColorScheme_auto) {
        // 切换到匹配的当前模式的图标
        if (ColorScheme_scheme === _light_)
            icon = _icoLightMode_;
        else if (ColorScheme_scheme === _dark_)
            icon = _icoDarkMode_;
    }
    // 调整模式切换按钮图标
    StsColorScheme_ui.hm(V_ui_svgIcon(icon, 20, 20, _theme_));
}

// ==================== 状态栏的检查新版本类 ==================== //

let StsNewVersion_checkOriginCloudFlare = _vlookPagesHost_CloudFlare_, //"https://vlook-doc.pages.dev",
    StsNewVersion_checkUrlCloudFlare = StsNewVersion_checkOriginCloudFlare + "/act/" + _chkUpdate_ + ".html?ts=" + V_util_getTime(),
    StsNewVersion_checkOriginGitHub = _madmaxchowHost_GitHub_,
    StsNewVersion_checkUrlGitHub = StsNewVersion_checkOriginGitHub + "/VLOOK/act/" + _chkUpdate_ + ".html?ts=" + V_util_getTime();
/**
 * 构造函数
 */
function NewVersion_init() {
    StsNewVersion_ui.a(_dataTips_, _VLOOK_ + "™ " + V_lang_text(36, [
        "- 已推出新版本，请更新！",
        "- A new version has been released, please update!"
    ]));

    ToolTips_bind(StsNewVersion_ui);
    StsNewVersion_ui.uC().ck(() => {
        gWindow.open(_httpsPrefix_ + _githubVlook_ + "/releases", "github-vlook");
    });
}

/**
 * 检查新版本
 */
function NewVersion_check() {
    let frameCloudFlare = document.getElementById(_vlookChkUpdateCloudFlare_),
        frameGitHub = document.getElementById(_vlookChkUpdateGitHub_);

    // 等待窗口打开完成后发送消息
    frameCloudFlare.onload = function () {
        LOG("-> " + StsNewVersion_checkOriginCloudFlare);
        frameCloudFlare.contentWindow.postMessage(gVer, StsNewVersion_checkOriginCloudFlare);
    }
    frameGitHub.onload = function() {
        LOG("-> " + StsNewVersion_checkOriginGitHub);
        frameGitHub.contentWindow.postMessage(gVer, StsNewVersion_checkOriginGitHub);
    }

    // 设置检查更新的 src
    frameCloudFlare.src = StsNewVersion_checkUrlCloudFlare;
    frameGitHub.src = StsNewVersion_checkUrlGitHub;
}

// ==================== 链接检查器类 ==================== //

let LinkTool_checkHashUI = gUndefined,
    LinkTool_checkHashMode = gFalse,
    LinkTool_panelList = gUndefined,
    LinkTool_panelHeader = gUndefined,
    LinkTool_panelItems = gUndefined,
    LinkTool_enabled = gTrue,
    LinkTool_warningCount = 0,
    LinkTool_errorCount = 0,
    LinkTool_chpDupSet = [], // 文本
    LinkTool_chpDupReSet = [], // 正则表达式
    LinkTool_pageMap = {},
    LinkTool_textMap = {},
    LinkTool_mask = gUndefined;

/**
 * 构造函数
 */
function LinkTool_init(mask) {
    // StsLinkChkResult_ui = V_byClass(_vLinkChkResult_); // 检查结果
    LinkTool_checkHashUI = V_byClass(_vCheckHash_);
    LinkTool_panelList = V_byClass(_vLinkInfoList_); // 坏链主界面
    LinkTool_panelHeader = V_byClass(_vLinkInfoList_ + __header_);
    LinkTool_panelItems = V_byClass(_vLinkInfoList_ + __items_); // 坏链内容列表
    LinkTool_enabled = gTrue;

    // V_ui_stopScrollPropagation(LinkTool_panelItems);

    // 读取指定允许重复的章节标题预置选项
    let chpDup = V_util_getMetaByName(_vlook__ + "chp-dup");
    if (chpDup !== gUndefined) {
        let cds = chpDup.x().sp(";");
        for (let i = 0; i < cds.length; i++) {
            // 正则表达式
            if (cds[i].sW("/") && cds[i].eW("/"))
                LinkTool_chpDupReSet.push(new RegExp(cds[i].substring(1, cds[i].length - 1)));
            // 文本
            else
                LinkTool_chpDupSet.push(cds[i]);
        }
    }

    StsLinkChkResult_ui.uC().ck((event) => {
        if (LinkTool_panelList.isHidden())
            LinkTool_show(_checked_);
        else
            LinkTool_hide();
    });

    // 遮罩
    LinkTool_mask = mask;
    LinkTool_mask.bindPartner(() => {
        LinkTool_hide()
    }, LinkTool_panelList);

    // 滚动事件处理
    LinkTool_panelItems.on(_scroll_, () => {
        let scrollTop = V_util_getScrollTop(LinkTool_panelItems);
        // 滚出了顶部则显示顶部渐变条
        if (LinkTool_panelHeader.isHidden() && scrollTop > 10)
            LinkTool_panelHeader.show()
        // 否则隐藏
        else if (scrollTop <= 10)
            LinkTool_panelHeader.hide()
    });
}

/**
 * 将 .md 的链接转换为 .html 链接（或指定后缀）
 */
function LinkTool_mdToHtml() {
    let xmd = V_util_getParamVal(_xmd_),
        newExt = ".html";

    // 全局配置，禁用转换，则停止
    if (xmd === _off_)
        return;

    // 全局配置，指定转换的后缀
    if (xmd != gNull)
        newExt = "." + xmd;

    $("a" + V_attrCSS(_href_, ".md", "*")).e((index, element) => {
        let _t = $(element),
            href = _t.a(_href_),
            xmd = V_util_getUrlQueryParams(href)[_xmd_];

        // 单个链接指定禁用转换，则停止
        if (xmd === _off_)
            return gTrue;

        // 单个链接指定转换的后缀
        if (xmd !== gUndefined)
            _t.a(_href_, href.r(".md", "." + xmd));
        else // 默认的全局后缀
            _t.a(_href_, href.r(".md", newExt));
    });
}

/**
 * 添加检查结果条目
 * @param type 类型：warning、error
 * @param targetToJump 目标对象
 * @param content 内容
 */
function LinkTool_addToCheckResult(type, targetToJump, content) {
    let id = targetToJump.a(_id_);
    if (id === gUndefined) {
        if (type === _warning_) {
            LinkTool_warningCount++;
            id = "vk-" + _warning_ + __anchor_ + LinkTool_warningCount
        }
        else if (type === _error_) {
            LinkTool_errorCount++;
            id = "vk-" + _error_ + __anchor_ + LinkTool_errorCount;
        }
        // 标记目标对象
        targetToJump.a(_id_, id);
    }

    let item = $(V_ui_span(_vTocItem_, V_attr(_dataAnchor_, "#" + id), content));
    V_ui_addAnimate(item);
    JQ_addClass(item, type);

    // 添加链接异常样式及属性
    JQ_addClass($(item.a(_dataAnchor_)).a(_tabindex_, 0), "v-link-error-source");
    // 添加节点
    LinkTool_panelItems.ap(item);

    // 刷新状态栏对应的按钮 UI
    JQ_addClass(StsLinkChkResult_ui, type);

    V_ui_adjustHoverStyle(item);
    item.uC().ck(() => {
        JQ_removeClass(LinkTool_panelItems.ch("." + _vItemCurrent_), _vItemCurrent_);
        JQ_addClass(item, _vItemCurrent_);

        // 如果没有拖选的文本，则继续
        if (V_util_getSelectedText() === _) {
            V_util_gotoHash(item.a(_dataAnchor_));
            LinkTool_hide();
        }
    });
}

/**
 * 检查链接
 * @param hash 锚点
 */
function LinkTool_notFoundHash(hash) {
    return (!hash.sW("#")
        && V_length($(__write_ + " #" + hash + ","
            + __write_ + " a" + V_attrCSS(_name_, hash))) === 0);
}

/**
 * 检查来自 query 参数中的 hash 集合
 */
function LinkTool_checkHashSet() {
    let count = V_util_getParamVal(_vCheckCount_);
    if (count == gNull)
        return false;

    // 设置文档图标：检查中
    let var_iCheck = "--i-check";
    V_ui_changeDocIcon(V_util_getVarVal(var_iCheck + "ing"));

    count = JS_parseInt(count);

    // 检查当前文档中是否有指定的 hash 集
    let hash = _,
        info = V_lang_text67() +___,
        // info = V_lang_text(46, [
        //     "没有找到",
        //     "Not found"
        // ]) +___,
        notFoundCount = 0;
    for (let i = 1; i <= count; i++) {
        hash = V_util_getParamVal(_hash_ + i);
        // 没有找到
        if (hash != gNull && LinkTool_notFoundHash(hash)) {
            notFoundCount++;
            LinkTool_checkHashUI.ap(V_ui_div(_, _item_,
                V_ui_label(_, _, info + notFoundCount + " #") + hash));
        }
    }

    // 所有 hash 都能在当前文档中找到
    let btn;
    if (notFoundCount === 0) {
        // 设置文档图标：检查通过
        V_ui_changeDocIcon(V_util_getVarVal(var_iCheck + "-passed"));

        JQ_addClass(LinkTool_checkHashUI, "all-" + _found_)
        LinkTool_checkHashUI.ap(V_ui_div(_, "all-" + _found_, V_lang_text(47, [
            "检查通过",
            "Hash check Passed"
            ])));
        // 关闭标签页
        btn = $(V_ui_div(_, _vCheckHash_ + "-re" + _check_, V_lang_text(48, [
            "关闭文档",
            _Close_ +___+ _document_
            ])));
    }
    // 部分 hash 不存在
    else {
        // 设置文档图标：检查不通过
        V_ui_changeDocIcon(V_util_getVarVal(var_iCheck + "-failed"));

        JQ_addClass(LinkTool_checkHashUI, "not-" + _found_)
        // 重新检查
        btn = $(V_ui_div(_, _vCheckHash_ + "-re" + _check_, V_lang_text(49, [
            "已修订，重新检查",
            "Hash check failed"
            ])));
    }

    // 添加操作按钮（根据以上不同检查结果生成）
    LinkTool_checkHashUI.ap(btn);
    V_ui_adjustHoverStyle(btn);
    btn.uC().ck((event) => {
        gWindow.close();
    });

    // 关闭检查结果 UI
    btn = $(V_ui_div(_, _vCheckHash_ + "-" + _close_, V_lang_text(23, [
        _startReading_cn_,
        _startReading_en_
        ])));
    LinkTool_checkHashUI.ap(btn);
    V_ui_adjustHoverStyle(btn);
    btn.uC().ck((event) => {
        LinkTool_checkHashUI.hide();
    });

    return true;
}

/**
 * 检查链接
 */
function LinkTool_checkLink() {
    if (!LinkTool_enabled)
        return;

    // 检查所有页内链接对应的锚点是否都存在
    $(__write_ + " a" + V_not(V_attrCSS(_class_, _mdToc__ + _inner_, "*"))).e((index, element) => {
        let _t = $(element),
            text = _t.t().x(),
            title = _t.a(_title_),
            href = _t.a(_href_),
            page = V_util_getUrlWithoutHash(href),
            hash = V_util_getUrlHash(href),
            hashNoMark = _;

        // 获取指定对象的所有子元素（及其子元素）的文本内容
        let joinedText = V_util_joinNodesText(_t, " • ");
        if (V_length(joinedText) > 0)
            text = joinedText;

        // 忽略无效数据
        // 对于 href="#" 的情况，在 Typora 1.6.x 开始的版本需要考虑，因为 Typora 生成的 HTML 会自动过滤无效的页内链接，直接用 # 代替
        if (href === gUndefined)
            return gTrue;

        // --------------------
        // 链接内容检查并修正：链接的锚点是否使用了标点符号（不符合锚点相关规范）
        if (hash !== gUndefined && !href.sW(_mjx__)) {
            hashNoMark = hash.ss(1, V_length(hash));
            if (V_length(hashNoMark) > 0) {
                let newHash = LinkTool_disposeNonConformHash(hashNoMark);
                if (V_length(newHash) < V_length(hashNoMark) || newHash !== hashNoMark) {
                    // 更新为规范的 hash
                    hash = "#" + newHash;
                    // 更新并重新获取 href 的值
                    _t.a(_href_, V_util_getUrlWithoutHash(href) + hash);
                    href = _t.a(_href_);

                    WARN("Fixed link [" + _t.t() + "](" + href + ") hash:\n#" + hashNoMark + " --> " + "#" + newHash);
                }
            }
        }

        // --------------------
        // 页内链接
        // 以 #mjx- 开始的链接为行间公式的页内引用块，会导致 jQuery 的正则表达式解析错误，须跳过
        if (href == "#")
            __addErrorLink(_t, hash);
        else if (href.sW("#") && !href.sW(_mjx__)) {
            // 检索是否存在与该内链对应的锚点
            let anchor = href.ss(1, V_length(href));
            // 没有检索到对应的锚点
            if (LinkTool_notFoundHash(anchor))
                __addErrorLink(_t, href);
        }

        // --------------------
        // 将外部链接添加到链接地图中
        // 在链接内容检查前执行，目的是获得原始的 hash 信息便于出错时查找修正
        if (V_length(page) > 0 && !page.sW("?")
            && page.i(_docLibIdentifier_) === -1
            && !page.sW("mailto:")) {
            if (title !== gUndefined)
                title = title.x();
            if (V_length(text) === 0 && V_length(title) > 0)
                text = title;
            LinkTool_addToMap(text, page, hashNoMark);
        }
    });

    // --------------------
    // 生成链接地图
    __genLinkMap();

    // --------------------
    // 标题内容检查
    let headerTextSet = [];
    $(__write_ + " :is(" + _h1_6_ + V_not(_firstChild_) + "),"
        + __write_ +___+ _blockquote_ + ExtQuote_subTitle + ","
        + __write_ +___+ _summary_).e((index, element) => {
        let _t = $(element),
            text = _t.t().x();

        // 跳过无效的标题
        if (_t.c(_visibility_) === _hidden_)
            return;

        // 是否有重复标题
        if (headerTextSet.indexOf(text) === -1)
            headerTextSet.push(text);
        // 重复标题的处理
        else {
            if (LinkTool_chpDupSet.indexOf(text) === -1 // 文本匹配
                && !__matchForChpDupReSet(text)) // 正则表达式匹配
                    __addDuplicateChapter(_t);

        }
    });

    // 以正则表达式进行重复标题检查
    function __matchForChpDupReSet(text) {
        for (let i = 0; i < LinkTool_chpDupReSet.length; i++) {
            if (text.m(LinkTool_chpDupReSet[i]) != gNull)
                return gTrue;
        }
        return gFalse;
    }

    // 生成链接地图
    function __genLinkMap() {
        let pageIndex = 0;
        for (let page in LinkTool_pageMap) {
            pageIndex++;

            // 生成外部页面需要被检查的 hash 对应的 query 参数
            let urlParams = new URLSearchParams(),
                hashIndex = 0;
            urlParams.append(_checkHash_, 0); // 初始检查 hash 的标记
            for (let i = 0; i < V_length(LinkTool_pageMap[page]); i++) {
                let h = LinkTool_pageMap[page][i];
                if (V_length(h) > 0) {
                    hashIndex++;
                    urlParams.append(_hash_ + hashIndex, LinkTool_disposeNonConformHash(h));
                }
            }

            // 生成外部页面的目标链接，用于检查对应 hash 是否存在
            if (urlParams.size > 1) {
                urlParams.append(_vCheckCount_, hashIndex);
                urlParams.set(_checkHash_, 1); // 更新检查 hash 的标记
                urlParams.append("ws", 0);
                __addLinkMapItem(LinkTool_textMap[page][0], pageIndex, page, urlParams, hashIndex);
            }
            else {
                __addLinkMapItem(LinkTool_textMap[page][0], pageIndex, page, _, 0);
            }
        }
    }

    // 添加一条链接地图记录
    function __addLinkMapItem(text, pageIndex, page, urlParams, hashCount) {
        // 生成直达各锚点的入口
        let linkToHashSet = _,
            cc = 0;
        for (let [key, value] of urlParams) {
            if (key.sW(_hash_)) {
                let h = "#" + value;
                linkToHashSet += (++cc > 1 ? _nbsp_+_nbsp_ : _) + V_ui_a(_, page + h, h, page);
            }
        }

        let // 超出长度上限时显示的内容
            overLimit = V_ui_label(_, _, hashCount + V_lang_text(50, [
                "超出 URL 最大长度",
                "Maximum URL length exceeded"
            ])),

            // 未超出长度上限，且有锚点时，则生成检查入口
            hashSet = JS_toString(urlParams),
            hashSetLen = V_length(hashSet),
            checkHash = (hashSetLen > 0 ?
                V_ui_label(_, _, V_ui_strong(hashCount) +___+ V_lang_text(51, ["个锚点", "Hash"])
                    + V_ui_a(_, page + (page.i("?") > -1 ? "&" : "?") + hashSet,
                            V_ui_svgIcon(_icoCheck_, 12, 14, _theme_) +___+ V_lang_text(52, ["检查锚点", "Check Hash"]),
                    __blank_))
                : _),

            // 生成最终的条目内容
            item = $(V_ui_div(_vMapItem_ + pageIndex, _vMapItem_,
                    // 页面或链接内容
                    V_ui_span(_, _, JS_decodeURIComponent(page))
                    // 页面或链接的直达链接
                    + V_ui_a(_, page,
                        // 页面或链接入口
                        "🔗 " + (V_length(text) > 0
                            ? (V_length(linkToHashSet) > 0
                                ? V_lang_text(82, ["页面", "Page"]) : text)
                            : V_lang_text(83, ["链接", "Link"])), page)
                    // 检查锚点的链接
                    + (V_length(page) + hashSetLen > 8000
                            ? overLimit
                            : checkHash)
                    // 直达锚点的链接
                    + (V_length(linkToHashSet) > 0 ? _br_ : _)
                    + linkToHashSet
                ));

        V_ui_addAnimate(item);
        V_ui_adjustHoverStyle(item);

        item.f("a").uC().ck(() => {
            JQ_removeClass(LinkTool_panelItems.ch("." + _vItemCurrent_), _vItemCurrent_);
            JQ_addClass(item, _vItemCurrent_);
        });

        // 有锚点的添加到前面
        if (hashCount > 0)
            LinkTool_panelItems.pp(item);
        // 无锚点的添加到后面
        else
            LinkTool_panelItems.ap(item);
    }

    // 添加一条警示记录：重复名称章节标题
    function __addDuplicateChapter(aObj) {
        LinkTool_addToCheckResult(_warning_, aObj,
            V_ui_label(_, _, "⚠️ " + V_lang_text(53, [
                "重复的标题名称",
                "Duplicate " + _Chapter_ + " Name"
            ])) + aObj.t());
    }

    // 添加一条错误记录：无效的页内链接记录
    function __addErrorLink(aObj, hash) {
        LinkTool_addToCheckResult(_error_, aObj,
            V_ui_label(_, _, "⛔️ " + V_lang_text(54, [
                    "无效页内链接",
                    _Invalid_ + " Inner Link"
                ])) + aObj.t()
                + ("#" + aObj.t() === hash ? _ : " (" + hash + ")"));
    }
}

/**
 * 处理不规范的 hash 内容
 * @param hash 要处理的 hash
 */
function LinkTool_disposeNonConformHash(hash) {
    // 将空格转换为连字符
    hash = hash.l().r(/\s/g, "-");
    hash = hash.r(/^~~(.+)~~$/g, "$1");
    // 对标点符号进行转换处理
    return hash.r(/\p{P}/gu, (p) => {
        if (p === "-") return "-";
        else if (p === "–") return "--";
        else if (p === "—") return "---";
        return _;
      });
}

/**
 * 添加到链接地图
 * @param text 链接文本
 * @param page 页面地址（不含 hash）
 * @param hashNoMark 页面 hash（不含 #）
 */
function LinkTool_addToMap(text, page, hashNoMark) {
    // 如果键不存在，创建一个空数组用于保存内容
    if (!(page in LinkTool_pageMap)) {
        LinkTool_pageMap[page] = [];
        LinkTool_textMap[page] = [];
        LinkTool_textMap[page].push(text);
    }

    // 向对应键的数组中添加内容，重复的 hash 不添加
    if (LinkTool_pageMap[page].indexOf(hashNoMark) === -1)
        LinkTool_pageMap[page].push(hashNoMark);
}

/**
 * 是否已显示
 * @returns boolean
 */
function LinkTool_isShowed() {
    return LinkTool_panelList.c(_display_) !== _none_;
}

/**
 * 显示链接面板
 * @param type 显示的内容，checked: 链接检查结果；map: 链接地图
 */
function LinkTool_show(type) {
    // 获取不同条目的对象
    let tocItems = LinkTool_panelList.f("." + _vTocItem_),
        mapItems = LinkTool_panelList.f("." + _vMapItem_);

    let curType = LinkTool_panelList.a(_dataContentType_);
    LinkTool_panelList.a(_dataContentType_, type);

    // 当前显示的不是指定的内容类型才进行处理
    if (curType === gUndefined || curType !== type) {
        // 显示当前页面页内链接的检查结果
        if (type === _checked_) {
            LinkTool_panelList.a(_dataTitle_, V_lang_text(81, [
                "异常的链接 / 地址",
                "Invalid link / address"
            ]));
            mapItems.hide();
            tocItems.show();
        }
        // 显示链接地图
        else if (type === _map_) {
            LinkTool_panelList.a(_dataTitle_, V_lang_text3());
            tocItems.hide();
            mapItems.show();
        }
    }

    // 显示面板
    LinkTool_panelList.show();
    LinkTool_mask.show();
}

/**
 * 隐藏坏链列表
 */
function LinkTool_hide() {
    LinkTool_panelList.hide()
    LinkTool_mask.hide();

    V_doc_scroll_unfreeze();
}

/**
 * 处理热键操作
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function LinkTool_disposeHotkey(key, combKeys, event) {
    if (LinkTool_panelList.isHidden())
        return;

    let handled = false;
    switch (key) {
        case _escape_:
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
 * @param extStyle 扩展样式：left / right / bottom / center
 * @param close 是否显示关闭提示器
 */
function BgMask(id, extStyle, close) {
    let T = this;
    T.style = extStyle;

    VOM_doc().af(V_ui_div(_, _vMask_ +___+ (extStyle !== gUndefined ? extStyle +___ : _) + id +___+ _vBackdropBlurs_,
        V_ui_copyrightInfo()));

    // 根据动效等级初始化遮罩样式
    V_ui_initEffectLevel();

    T.ui = V_byClass(_vMask_ + "." + id);
    // V_ui_stopScrollPropagation(T.ui);
    T.closer = gUndefined;

    // 生成关闭提示器
    if (close != gNull && close) {
        T.ui.ap(V_ui_div(_, _vMaskClose_ +___+ T.style,
            V_ui_svgIcon(_icoMaskCloser_, 16, 60, _light_)));
        T.closer = T.ui.ch("." + _vMaskClose_);
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
            // 对齐方式 left / right 的处理
            if (T.style === _left_ || T.style === _right_) {
                T.closer.c(_left_, T.style === _right_
                        ? JS_parseInt(T.partnerUI.c(_left_)) - T.closer.w() - offset
                        : x);
            }
            // 对齐方式 bottom 的处理
            else if (T.style === _bottom_) {
                y = JS_parseInt(T.partnerUI.c(_bottom_)) + T.partnerUI.h() + offset;
                T.closer.c(_bottom_, y + 20);
            }
        }

        // 绑定 VLOOK logo 的点击事件
        T.ui.f("." + _vCopyright_ + " ." + _vCopyrightSvgIco_).uC().ck((event) => {
            env.show($(event.currentTarget));
        });

        // 点击遮罩隐藏联动对象
        T.ui.uC().ck(() => {
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
    ContentFolder_limit = V_devMode ? 300 : 640, // 内容须折叠的高度限值
    ContentFolder_contents = [], // 须进行折叠判断和处理的内容集
    ContentFolder_buildTimers = [],
    ContentFolder_rowNumFilter = _table_ +___+ _tbody_ + " tr";

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
    // 跳过不启用折叠，或任意父级元素是详情折叠的情况
    if (!ContentFolder_enabled
        || V_length(content.ps(_blockquote_ + "," + _details_)) > 0) {
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
    if (V_length(ContentFolder_buildTimers) > 0) {
        for (let i = 0, len = V_length(ContentFolder_buildTimers); i < len; i++)
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
    for (let j = V_length(rules) - 1; j >= 0; j--) {
        // 检查是否是要删除的规则
        let ruleText = rules[j].selectorText;
        if (ruleText !== gUndefined && ruleText.i(
                "." + _vCaptionContainer_ + "." + _expander_ + ".id-") > -1)
                gStyle.deleteRule(j);
    }

    // 重建需要重建的部分
    for (let i = 0, len = V_length(ContentFolder_contents); i < len; i++) {
        // 对类 img 长内容
        if (V_util_getTagName(ContentFolder_contents[i]).sW("i")) {
            // 创建一个Image对象，实现图片的预下载
            let img = new Image();
            // 获得图片实际加载的 src（针对 img 指定 srcset, darksrc, darksrcset 的情况）
            img.src = ContentFolder_contents[i].get(0).currentSrc;
            // 如果图片已经存在于浏览器缓存，直接处理
            if (img.complete)
                ContentFolder_buildTimers.push(
                    setTimeout(() => {
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
                setTimeout(() => {
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

    let h = JS_parseInt(target.oH());
    // 高度超出折叠要求高度时进行折叠
    if (h > ContentFolder_limit) {
        // 构建内容展开操作区
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
    if (V_length(container.f(_table_)) > 0)
        JQ_addClass(container.f(ContentFolder_rowNumFilter), _vTblRowNumHidden_);

    // 重新适配展开操作区尺寸
    let tW = JS_mathCeil(JS_parseFloat(target.c(_width_)));
    if (w > tW)
        w = tW;

    container.a("d-ex-label", V_lang_text(55, [
        "显示全部",
        "Show all"
    ]) + " ▼");
    let newClass = "." + _vCaptionContainer_ + "." + _expander_
        + ".id-" + i + "::before{" + _width_ + ":" + w + "px;}";
    gStyle.insertRule(newClass, 0);
    JQ_addClass(container, _expander_ + " id-" + i);

    container.a(_dataContentType_, tagName);

    // 展开按钮 click 事件处理
    container.on(_mouseUp_, () => {
        ContentFolder_expand(container);
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
    if (V_length(container.f(_table_)) > 0)
        JQ_removeClass(container.f(ContentFolder_rowNumFilter), _vTblRowNumHidden_);
}

// ==================== 工具提示信息类 ==================== //

let ToolTips_ui = gUndefined,
    ToolTips_continueShow = gFalse, // 是否激活持续显示
    ToolTips_lastStyle = gUndefined,
    ToolTips_aniTimer = gNull,
    ToolTips_continueTimer = gNull,
    ToolTips_delay = 2000;

/**
 * 构造函数
 */
function ToolTips_init() {
    ToolTips_ui = V_byClass(_vToolTips_);

    V_ui_addAnimate(ToolTips_ui, _opacity_);
}

/**
 * 绑定操作相关事件
 * @param source 对象
 * @param align 对齐方式，auto/center/right
 */
function ToolTips_bind(source, align = _auto_) {
    V_ui_bindHover(source);

    source.on(_mouseEnter_, (event) => {
        ToolTips_show(source, align);
    }).on(_mouseLeave_, (event) => {
        ToolTips_hide();
    });
}

/**
 * 显示工具提示信息
 *
 * @param follower 提示的目标元素
 * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
 * @param classValue 指定微调的样式
 */
function ToolTips_show(follower, align, classValue) {
    if (V_util_isMobile())
        return;

    ToolTips_ui.hm(follower.a(_dataTips_));

    // 强制取消最后一次延时显示的处理
    clearTimeout(ToolTips_aniTimer);
    ToolTips_aniTimer = gNull;
    // 强制取消隐藏后指定时间内取消持续显示的处理
    clearTimeout(ToolTips_continueTimer);
    ToolTips_continueTimer = gNull;

    ToolTips_lastStyle = classValue;

    const space = 10,
        tipsW = ToolTips_ui.iW(),
        tipsH = ToolTips_ui.iH(),
        ww = jq_Window.w() - space,
        wh = jq_Window.h() - space;
    let left = follower.oL(),
        top = follower.oT() - V_util_getScrollTop(),
        width = follower.iW(),
        height = follower.iH();

    JQ_removeClass(ToolTips_ui, _top_ +___+ _bottom_ +___+ _center_ +___+ _right_);

    // 指定对齐方式或提示超出屏幕
    if (align !== _auto_ || (left + tipsW) > ww) {
        // 对齐方式: right
        JQ_addClass(ToolTips_ui, _right_);
        left = follower.oL() - tipsW + width;
        // 右侧顶边，则微调
        if (left + tipsW >= ww)
            left = left - space;

        // 对齐方式: center
        if (align === _center_) {
            JQ_removeClass(ToolTips_ui, _right_);
            JQ_addClass(ToolTips_ui, _center_);
            left = follower.oL() + (width - tipsW) / 2;
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
    ToolTips_aniTimer = setTimeout(() => {
        ToolTips_continueShow = gTrue; // 一旦显示后，激活持续显示
        V_ui_fadeShow(ToolTips_ui);

    }, waitTime);
}

/**
 * 隐藏工具提示
 */
function ToolTips_hide() {
    // 隐藏后在指定时间内取消持续显示
    clearTimeout(ToolTips_continueTimer);
    ToolTips_continueTimer = setTimeout(() => {
        ToolTips_continueShow = gFalse;
    }, ToolTips_delay);

    // 强制取消最后一次延时显示的处理
    clearTimeout(ToolTips_aniTimer);
    ToolTips_aniTimer = gNull;
    V_ui_fadeHide(ToolTips_ui);

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
    T.ui = V_byClass(_vInfoTips_);
    T.aniTimer = gNull;

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
        T.aniTimer = gNull;

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
        if (delay != gNull) {
            T.aniTimer = setTimeout(() => {
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
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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

let BottomTips_ui = gUndefined;
/**
 * 构造函数
 */
function BottomTips_init() {
    let tipsClass = "v-" + _bottom_ + "-" + _tips_;
    VOM_doc().af(V_ui_div(_, tipsClass,
        V_ui_div(_, _)));
    BottomTips_ui = V_byClass(tipsClass);
}

/**
 * 显示底部提示栏
 * @param message 提示内容
 */
function BottomTips_show(message) {
    if (message !== gUndefined)
        BottomTips_ui.ch("div").hm(message);
    BottomTips_ui.show();
    MoreDocContent_ui_after.hide();
}

/**
 * 隐藏底部提示栏
 */
function BottomTips_hide() {
    BottomTips_ui.hide();
    MoreDocContent_ui_after.show();
}

// ==================== 文档更多内容遮罩栏 ==================== //

let MoreDocContent_ui_before = gUndefined,
    MoreDocContent_ui_after = gUndefined;
/**
 * 构造函数
 */
function MoreDocContent_init() {
    MoreDocContent_ui_before = V_byClass(_vMoreDocContent_ + _before_);
    MoreDocContent_ui_after = V_byClass(_vMoreDocContent_ + _after_);
    JQ_addClass(MoreDocContent_ui_before, V_pageMode);
    JQ_addClass(MoreDocContent_ui_after, V_pageMode);
}

/**
 * 刷新显示更多内容遮罩栏
 * @param scrollTop 文档当前滚动位置，如果为空则自动获取
 */
function MoreDocContent_refresh(scrollTop) {
    if (scrollTop === gUndefined)
        scrollTop = V_util_getScrollTop();

    // 顶部 before UI
    if (scrollTop > gScrollEdge) {
        if (MoreDocContent_ui_before.c(_display_) === _none_)
            MoreDocContent_ui_before.show();
    }
    else
        MoreDocContent_ui_before.hide();

    // 底部 after UI
    if ((scrollTop + jq_Window.h()) > (jq_Document.h() - gScrollEdge))
        MoreDocContent_ui_after.hide();
    else {
        if (MoreDocContent_ui_after.c(_display_) === _none_)
            MoreDocContent_ui_after.show();
    }
}

/**
 * 根据 write 动态更新遮罩栏 UI
 */
function MoreDocContent_updateUI() {
    // 值为 auto 时进行实际像素计算
    let mlValue = VOM_doc()[0].getBoundingClientRect().left;

    if (MoreDocContent_ui_before.a(_class_).i(_fitWidth_) === -1) {
        MoreDocContent_ui_before.c(_marginLeft_, mlValue);
        MoreDocContent_ui_after.c(_marginLeft_, mlValue);
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
    CaptionGenerator_lastH1 = [], // 用于按章节分组编号时，指定对应题注类型最后的一级章节号
    CaptionGenerator_lastCounter = [], // 用于按章节分组编号，指定对应题注类型最后的计数器
    CaptionGenerator_autoContent = gTrue; // 自动根据内索引对象内容生成题注

/**
 * 题注预处理，用于给需要生成题注的对象标记归属的一级章节
 */
function CaptionGenerator_preprocess() {
    let h1Counter = 1,
        selector = _img_ + ",." + _mdDiagramPanel_ + "," + _table_ + ",." + gSelector_CodeBlock + "," + gSelector_iframeVideo,
        selectorSub = _img_ + "," + _svg_ + "[id^='" + _mermaid_ + "']," + _table_ + ",." + gSelector_CodeBlock + "," + gSelector_iframeVideo;
    $(__write_ + " h1").e((index, element) => {
        let betweenSet = $(element).nextUntil("h1");
        betweenSet.filter(selector).add(
            betweenSet.f(selectorSub)).e((index, element) => {
                let _t = $(element);
                _t.a(_dataH1_, h1Counter);
                // ERROR(111, V_util_getTagName(_t));
        });
        h1Counter++;
    });
}

/**
 * 生成题注前缀内容
 * @param target 需要添加题注的对象
 * @param typeText 题注类型文本，如: 表、图
 * @param counter 题注类型计数器
 * @returns
 */
function CaptionGenerator_prefix(target, typeText, counter) {
    let h1 = target.a(_dataH1_),
        h1Num = 0,
        lastCount = 0;

    // 指定按章节分组编号
    if (h1 !== gUndefined) {
        h1Num = JS_parseInt(h1);
        h1 = h1 + "-";
        // 更新最后章节、计数器取值
        // 以下为示例数据推算
        // counter = 1, data-h1 = 1, lastCounter[table] = 0 (counter - 1), table-1-1 (counter - lastCounter)
        // ---
        // counter = 2, data-h1 = 2, lastCounter[table] = 1 (counter - 1), table-2-1  (counter - lastCounter)
        // counter = 3, data-h1 = 2, lastCounter[table] = 1, table-2-2  (counter - lastCounter)
        // counter = 4, data-h1 = 2, lastCounter[table] = 1, table-2-3  (counter - lastCounter)
        // counter = 5, data-h1 = 2, lastCounter[table] = 1, table-2-4  (counter - lastCounter)
        // ---
        // counter = 6, data-h1 = 3, lastCounter[table] = 5 (counter - 1), table-3-1 (counter - lastCounter)
        // counter = 7, data-h1 = 3, lastCounter[table] = 5, table-3-2 (counter - lastCounter)
        // counter = 8, data-h1 = 3, lastCounter[table] = 5, table-3-3 (counter - lastCounter)
        // counter = 9, data-h1 = 3, lastCounter[table] = 5, table-3-4 (counter - lastCounter)
        // counter = 10, data-h1 = 3, lastCounter[table] = 5, table-3-5 (counter - lastCounter)
        // counter = 11, data-h1 = 3, lastCounter[table] = 5, table-3-6 (counter - lastCounter)
        // ---
        // counter = 12, data-h1 = 4, lastCounter[table] = 11, table-4-1 (counter - lastCounter)
        // counter = 13, data-h1 = 4, lastCounter[table] = 11, table-4-2 (counter - lastCounter)
        // counter = 14, data-h1 = 4, lastCounter[table] = 11, table-4-3 (counter - lastCounter)
        if (CaptionGenerator_lastH1[typeText] !== h1Num) {
            CaptionGenerator_lastH1[typeText] = h1Num;
            CaptionGenerator_lastCounter[typeText] = counter - 1;
        }

        if (h1Num > 0)
            lastCount = CaptionGenerator_lastCounter[typeText];
    }
    // 不按章节分组编号
    else
        h1 = _;

    return typeText +___+ h1 + (counter - lastCount);
}

/**
 * 生成题注
 * @param target 需要添加题注的对象
 * @param typeName 题注类型名称
 */
function CaptionGenerator_actionForTextContent(target, typeName) {
    let captionPrefix = CaptionGenerator_prefix(target, V_lang_text56(), V_doc_counter_table),
        caption,
        indexObj = gUndefined,
        anchor,
        dataForSearch,
        lang = _;

    // 代码块 codeblock
    if (typeName.sW("c")) {
        lang = target.a(_lang_).x();
        indexObj = iNavCenter.codeblocks;
        captionPrefix = CaptionGenerator_prefix(target, V_lang_text57(), V_doc_counter_codeblock);
    }
    // 表格 table
    else if (typeName.sW("t")) {
        indexObj = iNavCenter.tables;
    }
    // 公式 formula
    else if (typeName.sW("f")) {
        indexObj = iNavCenter.formulas;
        captionPrefix = CaptionGenerator_prefix(target, V_lang_text18(), V_doc_counter_math);
    }

    // 尝试获得带题注语法的内容
    let fcSet = CaptionGenerator_getCaptions(target.p().pr(), typeName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注
    captionPrefix = V_ui_span(_, _, captionPrefix + CaptionGenerator_spliter);

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == gNull || V_length(fc.x()) === 0) {
        fc = _;
        // 开启了自动生成题注
        if (CaptionGenerator_autoContent) {
            // 表格，并过滤掉列格式相关语法标识内容
            if (typeName.sW("t")) {
                fc = target.f("thead>tr:" + _first_).t().x().r(/(==|:|[Y?]|\[ ?]|## )/ig, _);
                fc = V_util_truncateText(fc, 10);
            }
            // 代码块
            else if (typeName.sW("c")) {
                // 若没有指定题注，则用 lang 属性的内容作为题注
                if (V_length(lang) > 0)
                    fc = __genFromLang();
                else {
                    fc = target.f("." + _vCodeMirrorLine_).t().x();
                    // 省略中间内容处理
                    fc = V_util_truncateText(fc, 10);
                }
            }
            // 公式
            else if (typeName.sW("f")) {
                fc = target.x();
                fc = V_util_truncateText(fc, 10);
            }
        }
        // 未开启自动生成题注
        else {
            if (V_length(lang) > 0)
                fc = __genFromLang();
        }
    }

    // 代码块 codeblock
    if (typeName.sW("c")) {
        anchor = _vkIdCodeblock_ + V_doc_counter_codeblock;
        target.wrap(V_ui_div(anchor, _vCaption_ + " codeblock"));
        dataForSearch = target.f("." + _vCodeMirrorLine_).t();
    }
    // 表格 table
    else if (typeName.sW("t")) {
        anchor = _vkIdTbl_ + V_doc_counter_table;
        target.wrap(V_ui_div(anchor, _vCaption_ + " tbl"));
        dataForSearch = target.t();
    }
    // 公式 math
    else if (typeName.sW("f")) {
        anchor = _vkIdMath_ + V_doc_counter_math;
        target.wrap(V_ui_div(anchor, _vCaption_ + " div"));
        dataForSearch = target.t();
    }

    caption = captionPrefix + fc;

    // 添加第 1 题注
    target.bf(V_ui_figcaption(_vCap1_.xD(),
        (V_length(lang) > 0 ? V_attr(_lang_, " (" + lang + ")") : _), caption));
    // 添加第 2 题注
    let has2Captions = (fc2 != gNull && V_length(fc2) > 0);
    if (has2Captions) {
        target.af(V_ui_figcaption(_vCap2_.xD(), _, fc2));
        target.p().a(_dataCaptionCount_, 2);
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        V_byID(anchor).a(_dataTitle_, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // 从属性 lang 生成题注内容
    function __genFromLang() {
        let result = lang.u();
        lang = _;
        JQ_removeAttr(target, _lang_);
        return result;
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
        indexObj = iNavCenter.figures,
        anchor,
        dataForSearch = _;

    let fcSet = gNull;
    // 若图片 alt 无内容，则尝试获取前面段落（如<p>、<h6>）作为第 1、2 题注的内容
    if (fc === gUndefined || V_length(fc.x()) === 0) {
        fcSet = CaptionGenerator_getCaptions(target.p().pr(), tagName);
        if (fcSet[0] != gNull)
            fc = fcSet[0];
        else {
            // 使用图片的文件名作为题注
            if (tagName.sW("i")) {
                let src = target.a(_src_);
                fc = V_util_getUrlWithoutQueryAndHash(src.ss(src.lastIndexOf('/') + 1));
            }
        }
        if (fcSet[1] != gNull)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption,
        captionPrefix = CaptionGenerator_prefix(target, V_lang_text58(), V_doc_counter_figure);
    // 音频题注 audio
    if (tagName.sW("a")) {
        indexObj = iNavCenter.media;
        captionPrefix = CaptionGenerator_prefix(target, V_lang_text59(), V_doc_counter_audio);
    }
    // 视频频题注 video
    else if (tagName.sW("v")) {
        indexObj = iNavCenter.media;
        captionPrefix = CaptionGenerator_prefix(target, V_lang_text60(), V_doc_counter_video);
    }

    // 无指定的题注文本，同时开启了自动生成题注，则取其部分内容作为自动题注内容
    if (fc == gNull || V_length(fc.x()) === 0) {
        fc = _;
        if (CaptionGenerator_autoContent) {
            if (tagName.sW("s")) // Mermaid SVG
                fc = target.f("g").t().x();
            // 省略中间内容处理
            fc = V_util_truncateText(fc.x(), 10);
        }
    }
    captionPrefix = V_ui_span(_, _, captionPrefix + CaptionGenerator_spliter);
    caption = captionPrefix + fc;

    // 为插图（mermaid）增加题注 <svg>
    if (tagName.sW("s")) {
        anchor = _vkIdFig_ + V_doc_counter_figure;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap(V_ui_divExt(anchor, _vCaption_ +___+ _mermaid_, V_attr(_dataFigType_, tagName)));
        dataForSearch += target.f(_div_ + "," + _span_ + ",tspan," + _text_).t();
    }
    // 为插图（img）增加题注 <img>
    else if (tagName.sW("i")) {
        anchor = _vkIdFig_ + V_doc_counter_figure;
        target.wrap(V_ui_divExt(anchor, _vCaption_, V_attr(_dataFigType_ , tagName)));
        dataForSearch += target.a(_src_);
    }
    // 为音频增加题注 audio
    else if (tagName.sW("a")) {
        anchor = _vkIdAudio_ + V_doc_counter_audio;
        target.wrap(V_ui_divExt(anchor, _vCaption_, V_attr(_dataFigType_, tagName)));
        dataForSearch += target.a(_src_);
    }
    // 为视频增加题注 video
    else if (tagName.sW("v")) {
        anchor = _vkIdVideo_ + V_doc_counter_video;
        target.wrap(V_ui_divExt(anchor, _vCaption_
            + (tagName.eW(_iframe_) ? ___+ _iframe_ : _), // 内嵌视频的情况
            V_attr(_dataFigType_, tagName)));
    }

    // 生成第 1 题注
    target.bf(V_ui_figcaption(_vCap1_.xD(), _, caption));
    // 生成第 2 题注
    let has2Captions = (fc !== gUndefined && fc2 != gNull && V_length(fc2) > 0);
    if (has2Captions) {
        target.af(V_ui_figcaption(_vCap2_.xD(), _, fc2));
        target.p().a(_dataCaptionCount_, 2);
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        V_byID(anchor).a(_dataTitle_, caption);
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
        fcSet[1] = gNull;
        hideCaptionSrc = gTrue;
    }
    // 无题注语法，但由有 h1-h6 引导
    else if (captionTagName.sW("h")) {
        fcSet[0] = caption.t().x();
        fcSet[1] = gNull;
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
            fcSet[0] = text.ss(2, text.i("]", 2));
            if (count === 2) // "▲ " +
                fcSet[1] = text.ss(text.i(']"', 2) + 2, V_length(text) - 1);
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

let BreadcrumbStyle_count = 0,
    // 匹配面包屑内容中的指定分隔符号，但不包括 HTML 标签内的内容
    BreadcrumbStyle_syntax = /(\s*(\/|\\|▸|▶︎|(&gt;)|(-&gt;)|→)\s*)(?![^<>]*>)/g;

/**
 * 初始如化分步分级处理
 */
function BreadcrumbStyle_init() {
    // 对所有分步分级元素进行样式优化
    $(__write_ + " em>" + _mark_ + _onlyChild_ + ">" + _span_ + _firstChild_).e((index, element) => {
        BreadcrumbStyle_count++;
        let _t = $(element),
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
        bread.uC().ck((event) => {
            let _t = $(event.currentTarget);
            Copyer_action(_t, _t.a(_dataClipboardText_), gFalse);
        });
    });

    // 避免与 BreadcrumbStyle 处理中的多层触发
    $(__write_ + " ." + _vBreadcrumbStyle_ + " a").ck((event) => {
        event.stopPropagation(); // 停止事件冒泡
    });
}

// ==================== 代码块增强类 ==================== //

/**
 * 初始化代码块
 */
let gSelector_CodeBlock = _mdFences_ + V_not(V_attrCSS(_lang_, _math_));
function ExtCodeBlock_init() {
    // 遍历所有代码块
    V_byClass(gSelector_CodeBlock).e((index, element) => {
        let _t = $(element);

        // 绑定内容助手
        ContentAssistor_bind(_t, _codeblock_);

        // 折叠长代码块
        ContentFolder_add(_t, _codeblock_);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        V_doc_counter_codeblock++;
        // 外套一个 <figure> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
        _t.wrap(V_ui_figure(_vCaptionContainer_, V_attr(_dataContainer_, _codeblock_)));

        // 先根据题注语法生成题注
        CaptionGenerator_actionForTextContent(_t, _codeblock_);
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
        lineCount = V_length(lines),
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
    lines.e((index, element) => {
        lineNum++;
        let encodeText = JS_encodeURI($(element).t());
        // 清除或转换特殊字符
        for (let i = 0; i < V_length(badChars); i++) {
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

// ==================== 代码块换行、不换行类 ==================== //

/**
 * 切换代码块换行、不换行开关
 */
function CodeblockWrap_toggle() {
    let codeblock = ContentAssistor_lastHover;
    // 已开启，则关闭
    if (CodeblockWrap_isWrap(codeblock)) {
        JQ_removeClass(ContentAssistor_btns_wrap, _selected_);
        JQ_removeClass(codeblock, _unwrap_);
    }
    // 未开启，则开启
    else {
        JQ_addClass(ContentAssistor_btns_wrap, _selected_);
        JQ_addClass(codeblock, _unwrap_);
    }
}

/**
 * 判断代码块是否启用了换行
 */
function CodeblockWrap_isWrap() {
    return ContentAssistor_lastHover.a(_class_).i(_unwrap_) > -1;
}

// ==================== 公式增强类 ==================== //

/**
 * 初始化代码块
 */
function ExtMath_init() {
    // 遍历所有代码块
    V_byClass("mathjax-block").e((index, element) => {
        let _t = $(element);

        // 绑定内容助手
        // ContentAssistor_bind(_t, _codeblock_);

        // 折叠长代码块
        // ContentFolder_add(_t, _codeblock_);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        V_doc_counter_math++;
        // 外套一个 <figure> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
        _t.wrap(V_ui_figure(_vCaptionContainer_, V_attr(_dataContainer_, _div_)));

        // 先根据题注语法生成题注
        CaptionGenerator_actionForTextContent(_t, _formula_);
    });
}

// ==================== 复制类 ==================== //

let Copyer_lastActionTime = 0,
    Copyer_processing = gFalse,
    Copyer_copyModeTimer = gNull;

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
    let ts = V_util_getTime();
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
    clipboard.on("success", (event) => {
        // 显示复制成功提示
        let note = ContentAssistor_copyAsMarkdown ? " (" + V_ui_strong(_as_Markdown_) + ")" : _,
            tips = supportMarkdown
                ? "<br>" + V_ui_sub(_, _, "( " + V_lang_text(61, [
                    "再次点击可复制为 " + _Markdown_,
                    "Click again to " + _Copy_ +___+ _as_Markdown_
                ]) + " )")
                : _;
        iInfoTips.bubble(V_lang_text(62, [
                "已复制",
                "Copied"
            ]) + (ContentAssistor_copyAsMarkdown ? _ : tips)
            + note, 2000, gFalse, source);

        event.clearSelection();

        typeof(successCallback) === _function_ && successCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();

        // 同一复制源，限时内第 2 次点击的处理（复制为 Markdown）
        if (supportMarkdown) {
            // 切换复制模式、光标、内容助手的复制图标
            if (Copyer_copyModeTimer != gNull) {
                clearTimeout(Copyer_copyModeTimer);
                Copyer_copyModeTimer = gNull;
            }
            ContentAssistor_toggleCopyMode(gTrue);
            // 限时恢复为普通复制模式
            Copyer_copyModeTimer = setTimeout(() => {
                // 切换复制模式、光标、内容助手的复制图标
                ContentAssistor_toggleCopyMode(gFalse);
                Copyer_copyModeTimer = gNull;
            }, 2000);
        }

        Copyer_processing = gFalse;
    });
    // 复制失败事件
    clipboard.on(_error_, () => {
        // 显示复制失败提示
        iInfoTips.error(V_ui_strong(V_lang_text(37, [
            "抱歉～暂不支持在该浏览器中复制",
            "I'm very sorry~ I don't support copying in this browser"
        ])), 3000, gFalse, source);

        typeof(errorCallback) === _function_ && errorCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();
        Copyer_processing = gFalse;
    });
}

// ==================== 标记不发布的内容类 ==================== //

function Unpublished_init() {
    // --------------------
    // 指定章节
    for (let i = 1; i <= 6; i++)
        __disposUnpubHeader(i);

    // --------------------
    // 指定的引用块（小标题、折叠）
    $(__write_ +___+ _blockquote_ + ExtQuote_subTitle + ">del," + __write_ +___+ _summary_ + ">del").e((index, element) => {
        let _t = $(element).p(),
            tagName = V_util_getTagName(_t),
            target = gUndefined;

        if (tagName.sW("su")) // summary
            target = _t.p();
        else if (tagName.sW("st")) // strong
            target = _t.p().p();

        if (target !== gUndefined) {
            let hr = target.prev(),
                hrStyle = hr.a(_style_);
            // 先移除前置的可以移除的 hr
            if (hrStyle !== gUndefined && hrStyle.i(_hidden_) > -1)
                JQ_remove(hr);
            // 移除目标对象
            JQ_remove(target);
        }
    });

    // --------------------
    // 表格指定列
    // 在表格列格式化处理的 ColumnFormatting_format() 中进行

    /**
     * 处理指定分级章节不发布内容的处理
     * @param headerNum 指定要遍历的章节等级
     */
    function __disposUnpubHeader(headerNum) {
        $(__write_ + " h" + headerNum + ">del").e((index, element) => {
            let _t = $(element).p(),
                id = _t.a(_id_);
            WARN(`Remove unpub. header: ${_t.t()} (#${id})`);

            // 移除正文中指定的章节及子章节的内容，直到下一个同级，或更高等级章节
            JQ_remove(_t.nextUntil(
                "h" + (headerNum === 1
                    ? 1 // 一级章节
                    : (headerNum - 1) + ",h" + headerNum))); // 比指定章节等级更高一级的，及当前等级章节
            // 移除自身
            JQ_remove(_t);

            // 移除目录大纲中对应的条目
            JQ_remove(gTocContent.f(".md-toc-inner" + V_attrCSS(_href_, "#" + id)).p());
        });
    }
}

// ==================== 章节目录自动编号增强类 ==================== //

let ChpAutoNum_counter = [],
    ChpAutoNum_lastLevel = 1,
    // 自定义的自动编号格式模板（可只指定任意 h1~h6）
    ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }},h6{{#none# }}",
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
    let metaTpl = V_util_getMetaByName(_vlook__ + "chp-autonum");
    // 文档无指定自动编号格式模板时，尝试取主题配套的自动编号格式模板
    if (metaTpl === gUndefined)
        metaTpl = V_util_removeQuotes(V_util_getVarVal("--v-chp-auto-num").x());
    // 没有目录大纲，同时没有通过预置选项、主题配置指定自动编号格式模板，则跳过
    if (V_length(gTocContent) === 0 || metaTpl === gUndefined)
        return;

    // 重置自动编号格式模板
    ChpAutoNum_resetTpl(metaTpl);

    // 对目录大纲内的章节条目进行处理
    ChpAutoNum_resetCounter();
    gTocContent.ch("." + _mdTocItem_).e((index, element) => {
        let item = $(element);
        V_ui_addAnimate(item);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(item.a(_class_)));
    });

    // 对文档中的章节条目进行处理（不包括封底）
    ChpAutoNum_resetCounter();
    VOM_doc().ch("h1" + V_not(_lastChild_) + ",h2,h3,h4,h5").e((index, element) => {
        let item = $(element);
        __genNumContent(item,
            ChpAutoNum_parseTocHeaderLevel(V_util_getTagName(item)));
    });

    // 对文档中的 h6 章节条目进行处理（不包括封面）
    ChpAutoNum_resetCounter();
    VOM_doc().ch(_h6_ + V_not(_firstChild_)).e((index, element) => {
        let prefix = (ChpAutoNum_tpl_prefix[5]),
            result;
        if ((result = prefix.m(/var\((--.+)\)/)) != gNull)
            prefix = V_util_getVarVal(result[1]).rA('"', _);
        $(element).a(_dataHeaderNum_, prefix);
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
        // item.a(_dataHeaderNum_, ChpAutoNum_toString() + ___);
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
    if (metaTpl === gUndefined)
        return;
    ChpAutoNum_tpl = metaTpl;
    // ！！！不要删除！！！用于测试效果
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{Chapter #alpha# }},h5{{### }},h4{{### - }},h3{{§ ###}}";
    // ChpAutoNum_tpl = "h1{{第#zh#章 }},h2{{步骤 #000## }}";
    // ChpAutoNum_tpl = "h6{{X ### }}";
    // ChpAutoNum_tpl = "h1{{###. }},h2{{### }}";
    // ChpAutoNum_tpl = "h1{{#none#}},h2{{#none#}},h3{{### }},h4{{### }},h5{{#ALPHA-min# }}";

    if (V_length(ChpAutoNum_tpl) === 0)
        return;

    // 对自动编号格式模板内容进行处理
    let tplSet = ChpAutoNum_tpl.sp(","),
        lv;
    for (let i = 0; i < V_length(tplSet); i++) {
        lv = tplSet[i].ss(1, 2);
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
        if ((result = ChpAutoNum_tplSet[lv].m(ChpAutoNum_tpl_syntax)) != gNull
            && V_length(result) === 8) {
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
        if (i < lv && V_length(str) > 0)
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
            upperCase = (ChpAutoNum_tpl_format[i].ss(0, 1).m(/[A-Z]/) != gNull),
            format = ChpAutoNum_tpl_format[i].l();

        // 十进制数字
        if (format === "#")
            ns = (ChpAutoNum_lastLevel === 1)
                // 针对 h1
                ? ChpAutoNum_leftPadForDecimal(counter, i)
                // 针对 h2~h5
                : (i === 0 // 第1段
                    ? JS_toString(counter) // 针对 第1段 强制变为数字（避免出现左侧补 0 的情况）
                    : ChpAutoNum_leftPadForDecimal(counter, i))
        // 中文数字
        else if (format === "zh") {
            ns = (ChpAutoNum_lastLevel === 1)
                // 针对 h1
                ? ChpAutoNum_decimalToZh(counter, upperCase)
                // 针对 h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        // 英文字母
        else if (format === _alpha_) {
            ns = (ChpAutoNum_lastLevel === 1 || opt > CHPAUTONUM_TPL_FORMAT_OPT_NONE)
                // 针对 h1
                ? ChpAutoNum_decimalToAlpha(counter, upperCase)
                // 针对 h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        // 罗马数字
        else if (format === "roman") {
            ns = (ChpAutoNum_lastLevel === 1 || opt > CHPAUTONUM_TPL_FORMAT_OPT_NONE)
                // 针对 h1
                ? ChpAutoNum_decimalToRoman(counter, upperCase)
                // 针对 h2~h5
                : ChpAutoNum_leftPadForDecimal(counter, i);
        }
        else if (format === _off_)
            ns = _;
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
    let pad = V_length(ChpAutoNum_tpl_leftPad[lv]),
        gap = pad - V_length(JS_toString(value)),
        padStr = _;
    if (gap > 0) {
        for (let i = 0; i < gap; i++)
            padStr += 0;
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
    if (V_length(JS_toString(noWan)) < 4)
        noWan = "0" + noWan;

    let numeral = overWan ? __numToZh(overWan) + "万" + __numToZh(noWan) : __numToZh(num);
    // 对于 10－19 的特殊处理
    if (num >= 10 && num <= 19)
        numeral = numeral.r("一十", "十");
    return upperCase ? __toZhUpperCase(numeral) : numeral;

    // 阿拉伯数字转换为中文数字
    function __numToZh(value) {
        let strArr = JS_toString(value).sp(_).reverse();
        let newNum = _;
        for (let i = 0; i < V_length(strArr); i++) {
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
    for (let i = 0; i < V_length(ChpAutoNum_romanNum); i++) {
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
    ExtQuote_quoteToColoring = gFalse,
    ExtQuote_subTitle = ">:is(p" + _firstChild_ + ",p" + _firstChild_ + "+p)>:is(" + _strong_ + "," + _mark_ + ")" + _onlyChild_;

/**
 * 初始化引用块以实现折叠支持
 */
function ExtQuote_init() {
    // 初始化引用块着色的默认颜色标识
    let dcQuote = V_util_getParamVal(_quote_);
    if (dcQuote != gNull) {
        if (dcQuote !== _off_) {
            ExtQuote_quoteToColoring = gTrue;
            Quote_defalutColor = dcQuote;
            Quote_defalutColor_withoutEm = dcQuote.ss(0, 2);
        }
    }

    // 遍历所有引用块、详情
    $(_blockquote_).e((index, element) => {
        let _t = $(element),
            matchedQuoteFold = gFalse;
        // ====================
        // 处理详情折叠（details）
        _t.ch(_h6_ + _firstChild_).e((i, e) => {
            let details = __disposeDetailsFolder($(e));
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

        // ====================
        // 为引用小标题添加锚点
        // 配合前置的 LinkTool_vlookHashComform() 进行
        _t.f(ExtQuote_subTitle).e((i, e) => {
            let title = $(e);
            title.a(_id_, LinkTool_disposeNonConformHash(title.t()));
        });
        // ====================

        // --------------------
        // 默认引用块，转换为引用块着色
        let parentTag = V_util_getTagName(_t.p());

        // 跳过列表内、引用块内的嵌套引用块
        if (parentTag === "li" || parentTag === _blockquote_ || parentTag === _details_)
            return gTrue;
        let validColorCode = gFalse;
        // 判断引用块内是否包含了引用块着色语法
        // 针对新语法
        _t.f(">p>em" + _onlyChild_ + ">sub" + _onlyChild_).e((index, element) => {
            let _t = $(element);
            // 颜色标签独占一行的情况下才被视为是对引用块、详情的颜色标识
            if (_t.t().m(Color_syntax) != gNull) {
                validColorCode = gTrue;
                return gFalse;
            }
        });

        // 引用块内不包含引用块着色语法的，则模拟指定默认的着色语法
        if (ExtQuote_quoteToColoring && !validColorCode)
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
        quote.wrap('<' + _details_ +___+ V_attr(_id_, V_doc_counter_details) + '></' + _details_ + '>');
        // 取消 h6，并生成 summary
        target.unwrap().wrap("<" + _summary_ + " " + V_attr(_id_, target.a(_id_)) + "></" + _summary_ + ">");
        // 删除无用对象
        target.ch().unwrap();

        // 获取生成的 detail 实例
        let details = $(_details_ + "#" + V_doc_counter_details),
            summary = details.ch(_summary_);
        summary.pp(V_ui_svgIcon(_icoDetailsOpen_, 18, 18, _dark_, _vSvgDetails_));

        let icon = summary.ch("." + _vSvgDetails_);
        V_ui_addAnimate(icon);
        // 跟踪切换事件
        details.on("toggle", (event) => {
            // 自动调整高度
            summary.ps(_blockquote_ + V_attrCSS(_dataQuoteGroup_)).p().c(_height_, _auto_);
            summary.p().c(_height_, _auto_);

            if (event.currentTarget.open)
                JQ_addClass(icon, _vRotate45_);
            else
                JQ_removeClass(icon, _vRotate45_);
        });

        V_doc_counter_details++;
        return details;
    }
}

/**
 * 对分栏引用块进行初始化
 */
function ExtQuote_initColumns() {
    // 针对分栏引用块进行修正
    $("hr + " + _blockquote_ + ",hr + " + _details_ + ",hr + ." + _mdAlert_).e((index, element) => {
        ExtQuote_columnsGroupCount++;
        let _t = $(element),
            hr = _t.pr(),
            colCount = 0;

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        __hideHr(hr);
        colCount = V_length(hr.prevUntil(V_not("hr"))) + 2; // 计算分栏数量
        // 有更多的 <hr> 则进行处理
        if (colCount > 2) {
            __hideHr(hr.prevUntil(V_not("hr")));
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
        _t.nextUntil(V_not(_blockquote_ + "," + _details_ + ",." + _mdAlert_)).e((index, element) => {
            if (colCount > 0) {
                __groupingColumns($(element));
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
        quote = $(_blockquote_ + V_attrCSS(_dataQuoteGroup_, groupId) + ","
            + _details_ + V_attrCSS(_dataQuoteGroup_, groupId) + ",."
            + _mdAlert_ + V_attrCSS(_dataQuoteGroup_, groupId));
    quote.e((index, element) => {
        let _t = $(element);
        _t.c(_height_, _auto_);
        // 没有被小屏强制适配为不分栏时才处理
        if (_t.c(_display_) !== _block_) {
            let height = JS_parseInt(_t.oH());
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
            // 如果是嵌套的详情折叠，则进行递归处理
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
    $("hr+ul,hr+ol").e((index, element) => {
        let _t = $(element),
            hr = _t.pr();

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        hr.c(_display_, _none_);
        let colCount = V_length(hr.prevUntil(V_not("hr"))) + 2; // 计算分栏数量
        if (colCount > 2) // 有更多的 <hr>
            hr.prevUntil(V_not("hr")).c(_display_, _none_);
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
    $(_table_).e((index, element) => {
        let _t = $(element),
            container = _t.p();

        V_doc_counter_table++;

        // 绑定内容助手
        ContentAssistor_bind(_t, _table_);

        // 表格自定义属性数据
        container.a(_dataContainer_, _table_);
        JQ_addClass(container, _vCaptionContainer_);

        // 表格滚动事件
        container.scroll(() => {
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
    $(_table_ + V_attrCSS(_dataCellMerge_, _true_)).e((index, element) => {
        let _t = $(element);
        CellMerge_dispose(_t);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        _t.f(_thead_ + ">tr>th").e((i, e) => {
            let cell = $(e);
            ColumnFormatting_init(_t, cell, cell.t());
        });
    });
    sw.ed("    ├ Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标识为带列格式的表格，进行列格式化处理
    sw.st();
    $(_table_ + V_attrCSS(_dataColumnFmting_, _true_)).e((index, element) => {
        ColumnFormatting_format($(element));
    });
    sw.ed("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    sw.st();
    $(_table_ + V_attrCSS(_dataRowGroup_, _true_)).e((index, element) => {
        let _t = $(element);
        RowGroup_init(_t);

        // 修正行分组的首个单元格的缩进
        _t.f("tr" + V_attrCSS(_dataFolder_, _true_)).e((i, e) => {
            let td = $(e).ch("td:" + _first_);
            if (td.a(_dataIdentLevel_) !== gUndefined)
                td.c(_paddingLeft_, ".5em");
        });
    });
    sw.ed("    ├ Row Group: ");

    // ----------------------------------------
    // 表格单元格重复表头引用块处理，group 模式重复将在行分组展开/收起时再进行处理
    sw.st();
    $(_table_ + V_attrCSS(_dataThRpt_, _true_)).e((index, element) => {
        ThRepeater_init($(element));
    });
    sw.ed("    └ Th Repeater: ");

    /**
     * 表格单元格初始化
     * @param table 表格对象
     */
    function __initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0;
        table.f(_thead_ + ">tr").e((index, element) => {
            colIndex = 0;
            let needCheckCellMerge = gTrue,
                needCheckColumnFormatting = gTrue,
                needCheckThRpt = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(element).f("th").e((i, e) => {
                let th = $(e),
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

        // 标记该表格列太多，用于匹配是否换行、不换行的自动版式
        if (colIndex > 7)
            table.a("d-col-too-more", colIndex);

        // ----------------------------------------
        // 遍历表格「非列头」行
        // ERROR(333, table.hm());
        table.f(_tbody_ + ">tr").e((index, element) => {
            let colIndex = 0,
                needCheckCellMerge = gTrue,
                needCheckRowGroup = gTrue;

            // ----------------------------------------
            // 遍历单元格
            $(element).f("td").e((i, e) => {
                let td = $(e),
                    text = td.t();
                // ERROR(444, td.t());

                // 对于屏幕较小时，调整单元格的最大宽度处理
                if (jq_Window.oW() <= gUnwrapTableScreenWidth)
                    TableWrap_disableDisposeTd(table, td);

                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                // ERROR(111, text, needCheckCellMerge, table.a(_dataCellMerge_) !== _true_, (CellMerge_syntax_row.test(text)) || CellMerge_syntax_col.test(text));
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

let // 单元格内（加粗）文本颜色的正则表达式
    gRE_boldRainbowText = new RegExp("(<" + _strong_ + "( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/' + _strong_ + ">)", "i"),
    // 有指定单元格内（斜体）文本颜色的正则表达式
    gRE_italicRainbowText = new RegExp("(<em( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/em>)', "i"),
    // 有指定单元格内（高亮）文本颜色的正则表达式
    gRE_highlightRainbowText = new RegExp("(<" + _mark_ + "( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/' + _mark_ + ">)", "i"),
    // 有指定单元格内（下划线）文本颜色的正则表达式
    gRE_underlineRainbowText = new RegExp("(<u( " + _dataRbText_ + '="([a-z!12]+)")?>)([\\s\\S]*?)(<\\/u>)', "i"),
    // 代码
    gRE_code = new RegExp('(<' + _code_ +___+ _class_ + '="' + _vStdCode_ + '.*?(?=id-)(id-\\d+).*?(<\\/' + _code_ + '>).*?)', "i"),
    // 标签
    gRE_tag = new RegExp('(<' + _code_ +___+ _class_ + '="' + _vTag_ + '.*?(?=id-)(id-\\d+).*?(<\\/' + _code_ + '>).*?)', "i"),
    // 徽章
    gRE_badge = new RegExp('(<' + _code_ +___+ _class_ + '="' + _vBadgeName_ + '.*?(?=id-)(id-\\d+)".*?(<\\/' + _code_ + '><\\/' + _code_ + '>).*?)', "i"),
    gRE_badge2 = new RegExp('(<' + _code_ +___+ _class_ + '="' + _vBadgeName_ + '.*?(?=id-)(id-\\d+)\\s.*?(<\\/span><\\/' + _code_ + '>).*?)', "i");
/**
 * 复制表格内容
 * @param source 内容源对象
 * @param event 事件对象
 */
function ExtTable_copyContent(source, event) {
    let content = _,
        trSet = ContentAssistor_lastHover.f("tr"),
        theadCount = V_length(ContentAssistor_lastHover.f(_thead_ + ">tr")),
        columnFmting = ContentAssistor_lastHover.a(_dataColumnFmting_),
        theadRepeater = ContentAssistor_lastHover.a(_dataThRpt_),
        rowGroup = ContentAssistor_lastHover.a(_dataRowGroup_),
        rowIndex = 0,
        rowCount = V_length(trSet),
        colIndex = 0, // 表格行的当前列（包括被合并列的）
        colCount = 0,
        alignSet = [], // 列的对齐方式
        xspanMatrix = []; // 单元格合并标识矩阵

    // 逐行读取表格内容
    trSet.e((index, element) => {
        // 复制为 Markdown 时，在表头后添加分隔格式
        if (ContentAssistor_copyAsMarkdown && rowIndex === 1)
            content = __createTheadSpliter(content, alignSet);

        let cellSet = $(element).f("th,td");
        colIndex = 0;

        // 逐个单元格处理
        let re_LabelTag = new RegExp("<" + _label_ + " .*?><\\/" + _label_ + ">", "i");
        cellSet.e((i, e) => {
            let htmlText = _,
                rowspan, colspan;

            // ====== 根据合并单元格预处理结果进行实际处理 =====
            // 对单元格纵向合并的填充处理
            htmlText = __disposeRowspan(htmlText);

            // ====== 对普通单元格的处理 ======

            // 读取单元格数据
            let cell = $(e),
                cellHTML = cell.hm(),
                colFmtChkbox = gFalse,
                colFmtMark = gFalse,
                cellBg = cell.a(_dataRbCellBg_),
                cellWholeText = cell.a(_dataRbWholeText_);

            // 含有表格列格式时
            if (columnFmting !== gUndefined && columnFmting === _true_) {
                // 转换列格式（复选框）
                let css = cell.a(_class_);
                if (css !== gUndefined) {
                    if (css.i(_vTblColFmt_Chkbox_) !== -1) {
                        let yes = cell.ch(_svg_ + V_attrCSS(_dataChk_, _yes_));
                        if (V_length(yes) > 0)
                            cellHTML = cellHTML.r(/<svg .*?>([\s\S]*?)<\/svg>/i, "Y");
                        else {
                            let un = cell.ch(_svg_ + V_attrCSS(_dataChk_, _un_));
                            if (V_length(un) > 0)
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
                    let identerCount = V_length(cell.ch('.' + _vTblRowGIdenter_));
                    for (let i = 0; i < identerCount; i++) {
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
                    cellHTML = "[]" + cellHTML;
                // 加粗、斜体、下划线、高亮，已通过 __transCellContent() 进行了处理
                if (colFmtMark) // 高亮
                    cellHTML = "==" + cellHTML + "==";
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
        content = content.ss(0, V_length(content) - 1)
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

        // 转换文本颜色、单元格背景色
        if (ContentAssistor_copyAsMarkdown) {
            // 有指定整段（整个单元格）的文本颜色
            if (cellWholeText !== gUndefined)
                cellHTML = "_~" + cellWholeText + "~_" + cellHTML;

            // 有指定单元格背景色
            if (cellBg !== gUndefined)
                cellHTML += "_~" + cellBg + "!~_";

            // 有指定单元格内（加粗）文本颜色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_boldRainbowText);
            // 有指定单元格内（斜体）文本颜色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_italicRainbowText);
            // 有指定单元格内（高亮）文本颜色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_highlightRainbowText);
            // 有指定单元格内（下划线）文本颜色
            cellHTML = __transCellContent_rainbowText(cellHTML,
                gRE_underlineRainbowText);
        }

        // 用于清除或转换特殊字符
        let badChars = [
                /&nbsp;/i, // 空格
                /&lt;/, // <
                /&gt;/, // >
                "'", // 英文单引号
                '"', // 英文双引号
                /(“)([^“]+)(“)/, // 连续第2个中文单引号
                /(‘)([^‘]+)(‘)/, // 连续第2个中文双引号
                /<.*?>/i // HTML 标签
            ],
            goodChars = [
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
        for (let i = 0; i < V_length(badChars); i++)
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
        while (result != gNull) {
            let _t = V_byClass(_vTag_ + "." + result[2]);
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
        while (result != gNull) {
                let _t = V_byClass(_vBadgeName_ + "." + result[2]);
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
        while (result != gNull) {
            let _t = V_byClass(_vStdCode_ + "." + result[2]);
            cellHTML = cellHTML.r(regExp,
                __maybeAsMarkdown(V_util_wrapBackquote(_t.t()), _t.t()));
            // 匹配下一项
            result = cellHTML.m(regExp);
        }
        return cellHTML;
    }

    // 转换单元格内的文本颜色
    function __transCellContent_rainbowText(cellHTML, exp) {
        let result = cellHTML.m(exp);

        // 遍历处理单元格内所有格式着色内容
        while (result != gNull) {
            let color = result[3],
                format = result[1];
            if (color !== gUndefined)
                cellHTML = cellHTML.r(exp, "$1$4$5~($3)~");
            if (format !== gUndefined) {
                // 加粗 strong
                if (format.sW("<st"))
                    cellHTML = cellHTML.r(exp, "**$4**");
                // 斜体 em
                else if (format.sW("<e"))
                    cellHTML = cellHTML.r(exp, "*$4*");
                // 高亮 mark
                else if (format.sW("<m"))
                    cellHTML = cellHTML.r(exp, "==$4==");
                // 下划线 <u>
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
            sss += ___+ i;
        console.log(sss);
        sss = "   ";
        for (let i = 0; i < colCount; i++)
            sss += " -";
        console.log(sss);
        for (let i = 0; i < rowCount; i++) {
            sss = _;
            if (xspanMatrix[i] !== gUndefined) {
                for (let j = 0; j < colCount; j++)
                    sss += (xspanMatrix[i][j] === gUndefined) ? ". " : xspanMatrix[i][j] +___;
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
        colSpanCell = gNull,
        colIndex = 0,
        colCount = 0,
        lastCell = gNull,
        tblData = [],
        tblSpan = [],
        tblTd2ThData = [],
        rowIndex = 0,
        needRowSpan = gFalse;

    // 遍历表格行
    table.f("tr").e((index, element) => {
        tblData[rowIndex] = [];
        tblSpan[rowIndex] = [];
        let tr = $(element);
        tr.f("td,th").e((i, e) => {
            let cell = $(e);

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
                if (colSpanCount > 0 && colSpanCell !== gUndefined) {
                    colSpanCell.a(_colspan_, colSpanCount + 1);
                    CellMerge_emptyBlankCell(colSpanCell);
                    colSpanCell.c(_textAlign_, _center_);
                }
                colSpanCount = 0;
            }
            lastCell = cell;
        }); // find(td, th)

        // 如果列合并了所有列，且内容为空，则取消表格行号等样式
        if (colCount === colSpanCount + 1 && V_length(tr.t().x()) === 0) {
            JQ_addClass(tr, _vTable_ + "-colspan-all");
        }

        // 列间合并：对于最后一列的补充处理
        if (colSpanCount > 0 && colSpanCell !== gUndefined) {
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
        for (let c = 0, len = V_length(tblSpan[0]); c < len; c++) {
            let rowSpanCount = 0,
                rowSpanCell = gNull;
            let r = 0,
                thSpanFlag = gFalse;

            // 列式遍历（从上到下）
            while (r < V_length(tblSpan)) {
                if (tblSpan[r][c] === 1) { // 要合并
                    rowSpanCount++;
                    if (rowSpanCell == gNull) {
                        rowSpanCell = tblData[r - 1][c];
                    }
                    // 记录最大列头行合并深度
                    if (r === 1)
                        thSpanFlag = gTrue;
                    if (thSpanFlag)
                        tblTd2ThData[V_length(tblTd2ThData)] = tblData[r][c].p();
                    JQ_remove(tblData[r][c]); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    if (c + 1 < V_length(tblSpan[r]))
                        tblData[r][c + 1].c(_paddingLeft_, V_util_getVarVal("--tbl-cell-padding"));
                } else {
                    thSpanFlag = gFalse;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell != gNull) {
                        rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                        CellMerge_emptyBlankCell(rowSpanCell);
                        rowSpanCell.c(_verticalAlign_, _middle_);
                        rowSpanCount = 0;
                        rowSpanCell = gNull;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell != gNull) {
                rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                CellMerge_emptyBlankCell(rowSpanCell);
                rowSpanCell.c(_verticalAlign_, _middle_);
            }
        } // for

        // 处理列头的纵向合并
        for (let i = 0, len = V_length(tblTd2ThData); i < len; i++) {
            tblData[0][0].p().p().ap(tblTd2ThData[i]);
            // 将 thead 内的 td 标签转换为 th
            let foundTd = gFalse;
            tblTd2ThData[i].f("td").e((index, element) => {
                foundTd = gTrue;
                // 暂存 td 的属性数据
                let td = $(element),
                    style = td.a(_style_),
                    tblCol = td.a(_dataTblCol_),
                    classValue = td.a(_class_),
                    colspan = td.a(_dataColspan_);
                // 将 td 转换为 th 标签
                td.a(_dataTd2th_, _true_);
                td.rW(td.prop(_outerHTML_).rA("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.p().a(_style_, style);
                td.p().a(_dataTblCol_, tblCol);
                td.p().a(_class_, classValue);
                td.p().a(_dataColspan_, colspan);
            });
            // 对被从 td 转换为 th 单元格，重新绑定：鼠标点击单元格时显示阅读模式（十字光标）
            if (foundTd) {
                tblTd2ThData[i].f("th" + V_attrCSS(_dataTd2th_)).e((index, element) => {
                    TableCross_bind(table, $(element));
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
    // 无子元素，或内容只有一个空格的情况
    if (V_length(cell) === 0 || cell.t() === ___) {
        cell.hm(_);
        JQ_addClass(cell, "v-empty-cell");
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

let TableCross_ui = gUndefined,
    TableCross_lastTable = gUndefined, // 最后/当前显示阅读模式（十字光标）的表格
    TableCross_lastCell = gUndefined; // 最后/当前显示阅读模式（十字光标）的表格单元格

function TableCross_init() {
    TableCross_ui = $(_vTblX_);
    V_ui_addAnimate(TableCross_ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
function TableCross_toggle() {
    let table = ContentAssistor_lastHover;
    // ERROR(111, table.a(_dataTblX_));
    // 已打开，则关闭
    if (table.a(_dataTblX_) === _true_)
        TableCross_disable(table);
    // 未打开，则打开
    else
        TableCross_enable(table);
}

// 打开表格阅读模式（十字光标）
function TableCross_enable(table) {
    table.a(_dataTblX_, _true_);
    JQ_addClass(ContentAssistor_btns_tableCross, _selected_);
}

// 关闭表格阅读模式（十字光标）
function TableCross_disable(table) {
    if (table !== gUndefined)
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
    cell.uC().ck((event) => {
        if (table.a(_dataTblX_) !== _true_ || Copyer_processing)
            return;

        // 首次点击，先强制移除动画
        if (TableCross_lastTable === gUndefined)
            V_ui_removeAnimate(TableCross_ui);

        // 同一单元格不重复处理
        // to-do: 开启后会导致同一单元格第 1 次点击后就失效
        // if (TableCross_lastCell === cell)
        //     return;

        let container = table.p().p(),
            contentFolded = container.a(_dataContentFolded_);
        // 跳过被折叠表格
        if (contentFolded !== gUndefined && contentFolded.sW("t"))
            return;

        // 若点击同时也触发了「代码 / 标签 / 徽章」的复制
        if (!Copyer_processing)
            event.stopPropagation(); // 停止事件冒泡，避免与其他事件的处理冲突（如：document.click）

        TableCross_hide(gTrue);
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

        // 左上角
        let leftUp = $(_vTblX_ + ".left-up");
        leftUp.c(_left_, cornerLeftX)
            .c(_top_, cornerUpY)
            .c(_width_, cornerLeftWidth)
            .c(_height_, cornerUpHeight)
            .c(_zIndex_, 9);

        // 右上角
        let rightUp = $(_vTblX_ + ".right-up");
        rightUp.c(_left_, cornerRightX)
            .c(_top_, cornerUpY)
            .c(_width_, cornerRightWidth)
            .c(_height_,  cornerUpHeight)
            .c(_zIndex_, 9);

        // 左下角
        let leftDown = $(_vTblX_ + ".left-down");
        leftDown.c(_left_, cornerLeftX)
            .c(_top_, cornerDownY)
            .c(_width_, cornerLeftWidth)
            .c(_height_, cornerDownHeight)
            .c(_zIndex_, 9);

        // 右下角
        let rightDown = $(_vTblX_ + ".right-down");
        rightDown.c(_left_, cornerRightX)
            .c(_top_, cornerDownY)
            .c(_width_, cornerRightWidth)
            .c(_height_, cornerDownHeight)
            .c(_zIndex_, 9);

        // 须延时后再执行显示，让以上代码先完成
        setTimeout(() => {
            // 针对不同表格之间点击强制移除动画后的恢复
            V_ui_addAnimate(TableCross_ui);
            V_ui_fadeShow(leftUp);
            V_ui_fadeShow(rightUp);
            V_ui_fadeShow(leftDown);
            V_ui_fadeShow(rightDown);
        }, 50);
    });
}

/**
 * 隐藏表格阅读模式（十字光标）
 * @param sameTable true: 同一个表格内的情况，false: 不同表格
 */
function TableCross_hide(sameTable) {
    if (TableCross_lastCell === gUndefined)
        return;

    if (sameTable) {
        JQ_removeClass(TableCross_lastCell, _vTblXCell_);
        return;
    }

    JQ_removeClass(TableCross_lastCell, _vTblXCell_);
    V_ui_fadeHide(TableCross_ui);
    TableCross_lastTable = gUndefined;
}

// ==================== 表格换行、不换行类 ==================== //

/**
 * 切换表格换行、不换行开关
 */
function TableWrap_toggle() {
    let table = ContentAssistor_lastHover;
    // 已开启，则关闭
    if (TableWrap_isWrap())
        TableWrap_disable(table);
    // 未开启，则开启
    else
        TableWrap_enable(table);
}

/**
 * 判断表格是否启用了换行
 */
function TableWrap_isWrap() {
    return ContentAssistor_lastHover.c(_whiteSpace_) === _preWrap_;
}

// 开启表格换行、不换行
function TableWrap_enable(table) {
    table.f("td." + _vLong_).e((index, element) => {
        let _t = $(element);
        _t.a(_dataLong_, gTrue);
        JQ_removeClass(_t, _vLong_);
    });

    JQ_addClass(ContentAssistor_btns_wrap, _selected_);
    JQ_removeClass(table, _unwrap_);
    JQ_addClass(table, _wrap_);
}

// 关闭表格换行、不换行
function TableWrap_disable(table) {
    table.f("td" + V_attrCSS(_dataLong_, gTrue)).e((index, element) => {
        let _t = $(element);
        JQ_addClass(_t, _vLong_);
        JQ_removeAttr(_t, _dataLong_);
    });

    JQ_removeClass(ContentAssistor_btns_wrap, _selected_);
    JQ_removeClass(table, _wrap_);
    JQ_addClass(table, _unwrap_);

    // 关闭表格换行、不换行后的处理
    table.f(_tbody_ + ">tr").e((index, element) => {
        // ----------------------------------------
        // 遍历单元格
        $(element).f("td").e((i, e) => {
            // 对于字符过多时调整单元格宽度
            TableWrap_disableDisposeTd(table, $(e));
        });
    });
}

// 关闭表格换行、不换行后的处理
function TableWrap_disableDisposeTd(table, td) {
    let text = td.t(),
        wrapLimit = 40; // CJK 字数

    if (table.c(_whiteSpace_) !== _preWrap_ && V_length(text) > wrapLimit) {
        let lines = __cleanBr(td.hm());
        // 按行处理
        for (let i = 1; i < V_length(lines); i++) {
            let counterResult = V_util_countWord(lines[i]);
            // 只处理字符过多的行
            if (counterResult.latin > wrapLimit * 0.5 // 非 CJK 折算
                || counterResult.total > wrapLimit) {
                JQ_addClass(td, _vLong_);
                break;
            }
        }
    }

    // 过滤掉 <br> 标签
    function __cleanBr(text) {
        const parser = new DOMParser(), // 创建 DOMParser 实例
            doc = parser.parseFromString(text, "text/html"), // 将文本解析为 DOM 文档
            textNodes = doc.querySelectorAll(V_not("br") + " *"), // 获取所有文本节点
            lines = []; // 将文本节点的内容按换行符分割
        for (let node of textNodes) {
            let line = node.textContent.trim();
            if (line)
                lines.push(line);
        }
        return lines;
    }
}

// ==================== 表格列格式化类 ==================== //

let ColumnFormatting_syntax_checkbox_header = /\[ ?] ?/; // 复选框列头格式语法
let ColumnFormatting_syntax_checkbox = /(^((\[[x-]])|[Yy?？])(\s.+)*)/; // 复选框列内单元格格式语法

/**
 * 初始化
 * @param table 表格对象
 * @param cell 单元格对象
 * @param text 单元格文本内容
 */
function ColumnFormatting_init(table, cell, text) {
    // ERROR(111, cell.t());
    // ERROR(222, cell.f(":is(" + _strong_ + ",em,u," + _mark_ + "," + _del_ + ")" + _onlyChild_).t());
    if (table.a(_dataColumnFmting_) !== _true_
        && (V_length(cell.f(":is(" + _strong_ + ",em,u," + _mark_ + "," + _del_ + ")" + _onlyChild_)) > 0 // 普通列格式
        // && (V_length(cell.f(_strong_ + ",em,u," + _mark_ + "," + _del_)) > 0 // 普通列格式
        || cell.c(_textAlign_) === _right_ // 右对齐表示使用数值格式
        || ColumnFormatting_syntax_checkbox_header.test(text))) { // 复选框列格式
            // 将表格标识为带列格式语法
            table.a(_dataColumnFmting_, _true_);
            // ERROR(333, "match");
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
        cells = table.f(V_attrCSS(_dataColspan_, _true_, "!") + V_attrCSS(_dataTblCol_, th.a(_dataTblCol_)));
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
        tbodyCells = table.f("td" + V_attrCSS(_dataTblCol_, th.a(_dataTblCol_)));
    return tbodyCells;
}

/**
 * 列格式化
 * @param table 表格对象
 */
function ColumnFormatting_format(table) {
    table.f(_thead_ + " th").e((index, element) => {
        let th = $(element),
            cells = gUndefined,
            tbodyCells = gUndefined,
            cellsCSS = _;

        // 粗体
        if (V_length(th.ch(_strong_ + _onlyChild_)) > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _vTblColFmt_Bold_ +___;
        }

        // 斜体
        // ERROR(111, th.t(), th.f("em" + _onlyChild_).t());
        if (V_length(th.f("em" + _onlyChild_)) > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _vTblColFmt_Em_ +___;
        }

        // 高亮
        let thHTML = th.hm();
        if (thHTML.sW("<mar") && thHTML.eW("rk>") // <mark>...</mark>
            || th.a(_class_) !== gUndefined
            && th.a(_class_).i(_vTblColFmtMark_) > -1) {
                $(V_attrCSS(_dataTblCol_, th.a(_dataTblCol_))).f(_mark_).ch().unwrap();
                cells = ColumnFormatting_getCells(table, th, cells);
                cellsCSS += _vTblColFmtMark_ +___;
        }

        // 批量添加以上列的常规样式
        if (cells !== gUndefined && V_length(cellsCSS) > 0)
            JQ_addClass(cells, cellsCSS);

        // 删除线
        if (V_length(th.ch(_del_ + _firstChild_)) > 0) {
            // ERROR(111, ColumnFormatting_getTbodyCells(table, th, tbodyCells).t());
            // 删除对应的列
            JQ_remove(th);
            JQ_remove(ColumnFormatting_getTbodyCells(table, th, tbodyCells));
        }

        // 复选框
        if (ColumnFormatting_syntax_checkbox_header.test(th.t())) {
            cells = ColumnFormatting_getCells(table, th, cells);
            JQ_addClass(cells, _vTblColFmt_Chkbox_);

            // 删除列头的复选框语法
            ColumnFormatting_removeCheckboxSyntax(th, ColumnFormatting_syntax_checkbox_header);

            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);

            tbodyCells.e((i, e) => {
                let ce = $(e),
                    ceText = ce.t().x(),
                    typeFlag = ceText.m(ColumnFormatting_syntax_checkbox),
                    chkStatus = _no_,
                    chkStyle = _dark_;

                typeFlag = (typeFlag != gNull) ? typeFlag[2] : _;

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
                else if (typeFlag === "[-]" || typeFlag === "?" || typeFlag === "？") {
                    chkStatus = _un_;
                    chkStyle = _theme_;
                }
                // 无指定
                else
                    ce.rHTML(_nbsp_, _);

                // 添加复选框样式（有指定的内容，或单元内容为空时才添加）
                if (V_length(typeFlag) > 0 || V_length(ceText) === 0)
                    ce.pp(V_ui_svgIcon(_icoChkbox__ + chkStatus, 14, 14, chkStyle, _, V_attr(_dataChk_, chkStatus)));
                else
                    // 添加差异化的文本颜色
                    ce.pp("<em>" + V_ui_sub(_, _, "Gy") + "</em>");
            });
        }

        // 数值格式
        if (th.c(_textAlign_).sW("r")) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            JQ_addClass(tbodyCells, _vTblColFmtNum_);
            // 数值格式化处理
            tbodyCells.e((i, e) => {
                let ce = $(e),
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

                    // 对有着色的进行渐变颜色调整
                    if (coloring) {
                        let baseBg = ce.c(_color_).r("rgb", "rgba");
                        bg1 = baseBg.r(")", ",.05)");
                        bg2 = baseBg.r(")", ",.2)");
                        bgSplit = baseBg.r(")", ",.7)");
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.c(_background_, _linearGradient_ + "(90deg," + bg1 + " 0%," + bg2 +___+ (percentValue > 1 ? percentValue - 1 : 0)
                        + "%," + bgSplit +___+ percent
                        + ",transparent " + percent + ")")
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

/**
 * 初始化
 * @param table 表格对象
 */
function RowGroup_init(table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    JQ_addClass(table.f(V_attrCSS(_dataTblCol_, "-0", "$")), _vTblRowGNotFolder_);

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0; // 当前缩进等级

    // 遍历所有行的第 1 个单元格
    table.f("td" + _firstChild_).e((index, element) => {
        let td = $(element),
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
            // let beforeChanged = lastLevel;
            lastLevel = currentLevel;
            // 设置为新的行分组
            // RowGroup_newFolder(tr, currentLevel, beforeChanged === 0,
            //     V_ui_formatRGBA(RandomColor_dissimilarRgb(), _varTblRowAlpha_));
            RowGroup_newFolder(tr);
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
    return RowGroup_parentStack[V_length(RowGroup_parentStack) - 1];
}

/**
 * 获得最近一个分组颜色对象
 */
function RowGroup_lastColor() {
    return RowGroup_colorStack[V_length(RowGroup_colorStack) - 1];
}

/**
 * 设置为新的行分组
 * @param tr 对应的行对象
 */
//  * @param level 缩进层级
//  * @param reset 是否重置回第一级
//  * @param color 该分组背景色
 // function RowGroup_newFolder(tr, level, reset, color) {
function RowGroup_newFolder(tr) {
    let folderRow = tr.pr();
    RowGroup_folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup_parentStack.push(RowGroup_folderCount);
    // 将当前行分组的随机背景颜色入栈
    // RowGroup_colorStack.push(color);

    // 设置折叠行分组的属性
    folderRow.a(_dataFolderId_, RowGroup_folderCount);
    folderRow.a(_dataFolder_, _true_);
    folderRow.a(_dataRowFolded_, _true_);

    // 获得折叠行分组首个单元格
    let td = folderRow.ch("td:" + _first_),
        tdHadIdent = td.f("." + _vTblRowGIdenter_ + __last_);

    // 设置折叠控件样式
    if (V_length(tdHadIdent) > 0)
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
    let preClass = "." + _vTblRowGIdenter_ + "," + _vTblRowGBtn_,
        preObjs = td.f(preClass),
        cloneTd = td.clone();
    JQ_remove(cloneTd.ch(preClass));
    td.hm(__echoOuterHTML(preObjs) +___+ cloneTd.hm());

    // 设置展开、收起事件
    td.ch(_vTblRowGBtn_).ck((event) => {
        RowGroup_toggle(folderRow, event);
    });

    /**
     * 遍历获得指定对象集合的所有 outerHTML 内容
     * @param objectSet 对象集合
     * @returns String
     */
    function __echoOuterHTML(objectSet) {
        let outerHTML = _;
        objectSet.e((index, element) => {
            outerHTML += $(element).prop(_outerHTML_);
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

    table.f(_vTblRowGBtn_).e((index, element) => {
        let folderRow = $(element).p().p();
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
    table.f(_label_ + _vTblRowGBtn_).e((index, element) => {
        let folderRow = $(element).p().p();
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
    JQ_removeAttr(target.f("tr" + V_attrCSS(_dataParentFolderId_)), _dataParentFolderId_);
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
        let identer = td.f("." + _vTblRowGIdenter_ + __last_),
            identObj = V_ui_label(_vTblRowGIdenter_, _);
        if (V_length(identer) > 0)
            identer.af(identObj);
        else
            td.pp(identObj);
    }

    // 隐藏被折叠的行
    tr.c(_display_, _table_ + __column_);
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
        subRows = table.f("tr" + V_attrCSS(_dataParentFolderId_, id)),
        folderButton = folderRow.ch("td:" + _first_).ch(_vTblRowGBtn_ + __last_);

    folderRow.a(_dataRowFolded_, _false_);
    if (mode !== gUndefined)
        folderRow.a(_dataRowOpenMode_, mode);
    JQ_addClass(folderButton.ch(_svg_), _vRotate90_);
    subRows.c(_display_, _);

    // 如表格指定了重复表头则进行对应处理
    let thRow = table.f(_thead_ + ">tr" + _lastChild_);
    if (table.a(_dataThRpt_) === _group_) {
        // 从第 2 列开始进行处理
        folderRow.f("td" + V_not(_firstChild_)).e((index, element) => {
            let td = $(element),
                tdHTML = td.hm().x();
            if (V_length(tdHTML) === 0 || tdHTML === _nbsp_) {
                let colID = td.a(_dataTblCol_),
                    th = thRow.f("th" + V_attrCSS(_dataTblCol_, colID)).hm();
                // 如果对应的列头可能因向下合并单元格为空时，尝试找上一行对应的列头
                if (th === gUndefined) {
                    let prevThRow = thRow.pr();
                    if (prevThRow !== gUndefined)
                        th = prevThRow.f("th" + V_attrCSS(_dataTblCol_, colID)).hm();
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
        subRows = $("tr" + V_attrCSS(_dataParentFolderId_, id)),
        folderButton = folderRow.ch("td:" + _first_).ch(_vTblRowGBtn_ + __last_);

    folderRow.a(_dataRowFolded_, _true_);
    JQ_removeAttr(folderRow, _dataRowOpenMode_);
    JQ_removeClass(folderButton.ch(_svg_), _vRotate90_);

    // 折叠所有子行（包括行分组）
    subRows.e((index, element) => {
        let tr = $(element),
            folder = tr.a(_dataFolder_);
        if (folder !== gUndefined && folder.sW("t"))
            RowGroup_close(tr);
        tr.c(_display_, _table_ + __column_);
    });

    // 如表格指定了重复表头则进行对应处理
    let table = folderRow.p().p();
    if (table.a(_dataThRpt_) === _group_) {
        // 从第 2 列开始进行处理
        folderRow.f("td" + V_not(_firstChild_)).e((index, element) => {
            let td = $(element);
            // 将行分组中临时替换的列头删除
            if (td.a(_class_).i(_vThRepeater_) > -1) {
                td.hm(_);
                JQ_removeClass(td, _vThRepeater_);
            }
        });
    }
}

// ==================== 表格列头重复生成器 ==================== //

let ThRepeater_syntax_tag = /^(##\s).+/; // 用于匹配表格列头重复的语法

/**
 * 初始化重复表头处理
 */
function ThRepeater_init(table) {
    let hasRowGroup = table.a(_dataRowGroup_) === _true_;

    // 带行分组时，表头重复模式为 group，其他则为 page
    table.a(_dataThRpt_, hasRowGroup ? _group_ : _page_);
    if (hasRowGroup)
        return;

    // 处理 page 模式的表头重复
    let rowIndex = 1,
        pageSize = 15 + rowIndex,
        thRow = table.f(_thead_ + ">tr"),
        skipRowCount = 0,
        lastSkipRowCount = 0,
        tbody = table.f(_tbody_ + ">tr"),
        rowCount = V_length(tbody);

    tbody.e((index, element) => {
        let tr = $(element),
            td = tr.ch("td[" + _rowspan_ + "]");

        // 跳过有跨行合并的行
        if (V_length(td) > 0) {
            td.e((i, e) => {
                let rowSpan = JS_parseInt($(e).a(_rowspan_));
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
                thRow.e((i, e) => {
                    tr.af($(e).prop(_outerHTML_).rA("<th ", "<td "));
                    JQ_addClass(tr.n().ch("td"), _vThRepeater_);
                    if (colIndex === 0)
                        JQ_addClass(tr.n().ch("." + _vThRepeater_), _first_);
                    else
                        JQ_addClass(tr.n().ch("." + _vThRepeater_), "not-" + _first_);
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
    let writeImg = __write_ +___+ _img_;
    $(writeImg + V_attrCSS(_src_, _mp3_, "$") + "," + writeImg + V_attrCSS(_src_, _m4a_, "$") + "," + writeImg + V_attrCSS(_src_, _ogg_, "$") + "," + writeImg + V_attrCSS(_src_, _wav_, "$") + ","
    + writeImg + V_attrCSS(_src_, _mp3_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _m4a_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _ogg_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _wav_ + "?", "*") ).e((index, element) => {
        let audioLike = $(element),
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
            audio.af(V_ui_divExt(_vkIdMiniAudio_ + V_doc_counter_audiomini + __control_, _vAudioMiniControl_,
                V_attr(_dataTitle_, _mini_ +___+ _audio_ +___+ V_doc_counter_audiomini), _));

            // 开始加载音频
            audio.on(_load_+_start_, (event) => {
                let controls = V_byID($(event.currentTarget).a(_id_) + __control_);
                JQ_addClass(controls, _vAudioMiniControl_);
                JQ_addClass(controls, _loading_);
                controls.hm(ExtAudio_icon_loading);
            });

            // 音频就绪可以开始播放
            audio.on("canplay", (event) => {
                let controls = V_byID($(event.currentTarget).a(_id_) + __control_);
                JQ_removeClass(controls, _loading_);

                // 绑定点击事件
                controls.uC().ck((event) => {
                    __play(event.currentTarget, audio[0]);
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
                        audio.n().af(" <sup " + V_attrCSS(_class_, "v-duration") + ">" + minStr + sec + "″</sup>");
                        audio.a(_dataDuration_, _true_);
                    }
                }
            });

            // 正在播放
            audio.on(_playing_, (event) => {
                let controls = V_byID($(event.currentTarget).a(_id_) + __control_),
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
            audio.on("ended", (event) => {
                let controls = V_byID($(event.currentTarget).a(_id_) + __control_);
                controls.hm(ExtAudio_icon_play);
                JQ_removeClass(controls, _playing_);
            });

            // 故障或不可用
            audio.on(_emptied_, (event) => {
                let id = $(event.currentTarget).a(_id_) + __control_,
                    controls = V_byID(id);
                JQ_removeClass(controls, _loading_);
                controls.hm(ExtAudio_icon_forbidden);
                JQ_addClass(controls, _vAudioMiniControl_);
                JQ_addClass(controls, _disabled_);
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.p());
            });

            // 加载错误
            audio.on(_error_, () => {
                audio.tr(_emptied_);
            });

            // 鼠标 mouseenter 和 mouseleave 事件
            audio.on(_mouseEnter_, (event) => {
                let _t =  $(event.currentTarget);
                if (_t.a(_class_).i(_disabled_) === -1)
                    JQ_addClass(_t, _hover_);
            }).on(_mouseLeave_, (event) => {
                JQ_removeClass($(event.currentTarget), _hover_);
            });
        }
        // 标准控件模式
        else {
            V_doc_counter_audio++;

            // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (V_util_getTagName(container) !== "p") {
                audioLike.wrap("<p></p>");
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
            if (V_length(audio.n(_vCap2_)) > 0)
                audio.c(_marginBottom_, "-10px");

            // 故障或不可用
            audio.on(_emptied_, () => {
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.p());
            });

            // 加载错误
            audio.on(_error_, () => {
                audio.tr(_emptied_);
            });
        }

        /**
         * 将无效音频源的信息添加到链接检查器
         *
         * @param targetToJump 坏链对象
         */
        function __addToLinkChecker(targetToJump) {
            let title = targetToJump.a(_dataTitle_);
            if (title === gUndefined)
                title = targetToJump.a(_src_);

            // 将无法加载的音频信息添加到链接检查器
            LinkTool_addToCheckResult(_error_, targetToJump,
                V_ui_label(_, _, "🚫 🔈 " + V_lang_text(63, [
                    "无效的音频源",
                    _Invalid_ + " audio address"
                ])) + title);//targetToJump.a(_dataTitle_));
        }
    });

    /**
     * 转换为 audio 标签
     * @param audioLike 类 audio 标签（即 src 为音频的 img 标签)
     * @param src 音频 URL
     */
    function __transToAudio(audioLike, src) {
        let tips = [
            "不支持音频标签",
            "Not support audio tag"
            ][V_lang];

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
let gSelector_iframeVideo = _iframe_ + V_attrCSS(_src_, "bilibili.com/" + _player_, "*") + "," + _iframe_ + V_attrCSS(_src_, "douyin.com/" + _player_, "*") + "," + _iframe_ + V_attrCSS(_src_, "ixigua.com/" + _iframe_, "*") + "," + _iframe_ + V_attrCSS(_src_, "qq.com/txp/" + _iframe_, "*") + "," + _iframe_ + V_attrCSS(_src_, "youtube.com/embed", "*");
function ExtVideo_init() {
    // 支持指定类型的音频，以及支持带参数的 URL
    let writeImg = __write_ +___+ _img_;
    $(writeImg + V_attrCSS(_src_, _ogv_, "$") + "," + writeImg + V_attrCSS(_src_, _mp4_, "$") + "," + writeImg + V_attrCSS(_src_, _webm_, "$") + ","
        + writeImg + V_attrCSS(_src_, _ogv_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _mp4_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _webm_ + "?", "*") + ","
        + gSelector_iframeVideo
    ).e((index, element) => {
        let videoLike = $(element),
            video = gUndefined,
            src = videoLike.a(_src_),
            container = videoLike.p();
        V_doc_counter_video++;

        // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
        if (V_util_getTagName(container) !== "p") {
            videoLike.wrap("<p></p>");
            container = videoLike.p();
        }
        // 设置容器样式数据，用于折叠内容时使用
        container.a(_dataContainer_, _video_);
        JQ_addClass(container, _vCaptionContainer_);

        // 先根据题注语法生成题注
        CaptionGenerator_actionForMediaContent(videoLike, _video_ + _iframe_);

        // 不处理常规视频以外的标签（如内嵌的 iframe）
        if (V_util_getTagName(video) !== _img_)
            return;

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.on(_emptied_, () => {
            let targetToJump = video.p(),
                title = targetToJump.a(_dataTitle_);
            if (title === gUndefined)
                title = targetToJump.a(_src_);

            // 将无法加载的音频信息添加到链接检查器
            LinkTool_addToCheckResult(_error_, targetToJump,
                V_ui_label(_, _, "🚫 📺 " + V_lang_text(64, [
                    "无效的视频源",
                    _Invalid_ + " video address"
                ])) + title);
            });

        // 加载错误
        video.on(_error_, () => {
            video.tr(_emptied_);
        });
    });

    /**
     * 转换为 video 标签
     * @param videoLike 类 video 标签（即 src 为视频的 img 标签)
     * @param src 视频 URL
     */
    function __transToVideo(videoLike, src) {
        let tips = [
            "不支持视频标签",
            "Not support video tag"
            ][V_lang];

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
    T.timerValueChanged = gNull;

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
        let ui = V_ui_div(_, _vTextField_ +___+ id,
                    V_ui_div(_, _vTextField_ + __icon_)
                    + V_ui_input(_, _, _text_)
                    + V_ui_div(_, _vTextField_ + __action_)
                    + V_ui_div(_, _vTextField_ + __reset_, V_ui_svgIcon(_icoResetInput_, 16, 16, _alpha_))
                );
        if (append) {
            target.ap(ui);
            T.ui = target.ch("." + _vTextField_ + "." + id);
        }
        else {
            target.af(ui);
            T.ui = target.p().ch("." + _vTextField_ + "." + id);
        }

        // 获得实例的各关键对象
        T.input = T.ui.ch(_input_);
        T.reset = T.ui.ch("." + _vTextField_ + __reset_);

        /**
         * 绑定开始中文输入事件
         */
        T.input.on("compositionstart", (index, element) => {
            $(element).prop("compositionStatus", _start_);
        });
        /**
         * 绑定结束中文输入事件
         */
        T.input.on("compositionend", (index, element) => {
            $(element).prop("compositionStatus", "end");
        });
        /**
         * 绑定文本获得焦点事件
         */
        T.input.focus(() => {
            T.inputing = gTrue; // 标记为输入中的状态

            JQ_addClass(T.ui, _vTextFieldFocus_);
            __checkComValueChanged();

            // 针对输入中文的情况，若输入了新的内容则进行查询
            function __checkComValueChanged() {
                if (T.input.prop("compositionStatus") !== _start_ && T.lastValue !== T.input.v()) {
                    clearTimeout(T.timerValueChanged);
                    T.timerValueChanged = gNull;
                    T.lastValue = T.input.v();
                    T.processInput();
                    // __processInput();
                }
                T.timerValueChanged = setTimeout(__checkComValueChanged, 500);
            }
            // 触发外部重定义事件
            typeof(T.onFocus) === _function_ && T.onFocus();
            // typeof(T.onFocus) === _function_ && T.onFocus(T.input);
        });

        /**
         * 绑定文本失去焦点事件
         */
        T.input.blur(() => {
            T.inputing = gFalse; // 标记为非输入中的状态

            JQ_removeClass(T.ui, _vTextFieldFocus_);

            clearTimeout(T.timerValueChanged);
            T.timerValueChanged = gNull;

            // 触发外部重定义事件
            typeof(T.onBlur) === _function_ && T.onBlur();
            // typeof(T.onBlur) === _function_ && T.onBlur(T.input);
        });

        /**
         * 处理文本框输入的内容
         */
        // function __processInput() {
        //     let value = T.input.v().x();

        //     if (value === _) {
        //         T.reset.c(_visibility_, _hidden_);

        //         // 无内容时移除样式
        //         if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) !== -1) {
        //             JQ_removeClass(T.action, _enabled_);
        //             V_ui_unbindHover(T.action);
        //         }
        //     }
        //     else {
        //         T.reset.c(_visibility_, _visible_);

        //         // 有内容时移除样式
        //         if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) === -1) {
        //             JQ_addClass(T.action, _enabled_);
        //             T.action.on(_mouseEnter_, (event) => {
        //                 T.actionHover(gTrue);
        //             }).on(_mouseLeave_, (event) => {
        //                 T.actionHover(gFalse);
        //             });
        //         }
        //     }
        //     // 触发外部重定义事件
        //     // typeof(T.onInput) === _function_ && T.onInput(T.input, value);
        //     typeof(T.onInput) === _function_ && T.onInput(value);
        // }

        /**
         * 绑定键盘按下事件
         */
        T.input.on(_keydown_, (event) => {
            let key = event.key,//event.keyCode || event.which || event.charCode,
                value = T.input.v();

            let handled = false;
            switch (key) {
                case _enter_:
                    if (T.action !== gUndefined)
                        T.action.tr(_click_);
                    handled = true;
                    typeof(T.pressEnter) === _function_ && T.pressEnter(value);
                    // typeof(T.pressEnter) === _function_ && T.pressEnter(T.input, value);
                    break;
                case _escape_:
                    // 无内容时则取消取点，退出编辑，键盘事件则由导航中心的键盘事件进行响应
                    if (V_length(value) === 0)
                        T.input.blur();
                    // 有内容则清空内容等待重新输入
                    else
                        T.reset.tr(_click_);
                    handled = true;
                    // typeof(T.pressESC) === _function_ && T.pressESC(T.input);
                    typeof(T.pressESC) === _function_ && T.pressESC();
                    break;
            }
            // 如果事件已处理，则禁止双重操作
            if (handled)
                event.preventDefault();

            // 触发外部重定义事件
            typeof(T.onKeyDown) === _function_ && T.onKeyDown(value, key);
            // typeof(T.onKeyDown) === _function_ && T.onKeyDown(T.input, value, key);
        });

        /**
         * 绑定重置输入内容按钮
         */
        T.reset.uC().ck(() => {
            // T.input.v(_);
            T.processInput(_);
            // 清空后保持输入焦点
            JQ_removeClass(T.reset, _enabled_);
            // T.reset.c(_visibility_, _hidden_);

            if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) !== -1) {
                JQ_removeClass(T.action, _enabled_);
                V_ui_unbindHover(T.action);
            }
            // 触发外部重定义事件
            // typeof(T.onInput) === _function_ && T.onInput(_);
            // typeof(T.onInput) === _function_ && T.onInput(T.input, _);
        });
    }

    /**
     * 处理文本框输入的内容
     * @param value 如不指定则使用文本框的值，如指定值则用指定值作为输入并作为文本框中的值
     */
    T.processInput = function (value) {
        // let value = T.input.v().x();
        if (value === gUndefined)
            value = T.input.v().x();
        else {
            value = value.x();
            T.input.v(value);
        }

        if (value === _) {
            JQ_removeClass(T.reset, _enabled_);
            // T.reset.c(_visibility_, _hidden_);

            // 无内容时移除样式
            if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) !== -1) {
                JQ_removeClass(T.action, _enabled_);
                V_ui_unbindHover(T.action);
            }
        }
        else {
            JQ_addClass(T.reset, _enabled_);
            // T.reset.c(_visibility_, _visible_);

            // 有内容时移除样式
            if (T.action !== gUndefined && T.action.a(_class_).i(_enabled_) === -1) {
                JQ_addClass(T.action, _enabled_);
                T.action.on(_mouseEnter_, (event) => {
                    T.actionHover(gTrue);
                }).on(_mouseLeave_, (event) => {
                    T.actionHover(gFalse);
                });
            }
        }
        // 触发外部重定义事件
        // typeof(T.onInput) === _function_ && T.onInput(T.input, value);
        typeof(T.onInput) === _function_ && T.onInput(value);
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
        T.icon = T.ui.ch("." + _vTextField_ + __icon_);
        T.icon.hm(icon);
        T.icon.c(_visibility_, _visible_);
        // T.icon.show();
    }

    /**
     * 开启动作按钮
     * @param icon 按钮图标
     */
    T.setAction = function (icon) {
        T.action = T.ui.ch("." + _vTextField_ + __action_);
        T.action.hm(icon);
        T.action.show();

        T.action.on(_mouseEnter_, (event) => {
            T.actionHover(gTrue);
        }).on(_mouseLeave_, (event) => {
            T.actionHover(gFalse);
        });
        T.action.uC().ck((event) => {
            let value = T.input.v();
            // 输入内容不为空
            if (V_length(value) > 0)
                T.input.select();

            // 触发外部重定义事件
            typeof(T.onAction) === _function_ && T.onAction(value);
            // typeof(T.onAction) === _function_ && T.onAction(T.input, value);
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
    // T.setWidth = function (width) {
    //     T.ui.c(_width_, width);
    //     T.input.c(_width_, width
    //         - JS_parseInt(T.reset.oW())
    //         - (T.icon === gUndefined ? 0 : JS_parseInt(T.icon.oW()))
    //         - (T.action === gUndefined ? 0 : JS_parseInt(T.action.oW())));
    //         // - (T.reset.w() + JS_parseInt(T.reset.c(_paddingLeft_)) * 2)
    //         // - (T.icon === gUndefined ? 0 : T.icon.w() + JS_parseInt(T.icon.c(_paddingLeft_)) * 2)
    //         // - (T.action === gUndefined ? 0 : T.action.w() + JS_parseInt(T.action.c(_paddingLeft_)) * 2));
    //     if (T.icon !== gUndefined)
    //         JQ_addClass(T.input, "set" + __icon_);
    // }

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
        if (T.index >= V_length(set))
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
function TocIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _toc_), // 入口
        // entry : V_byClass(_vSegmentBtn_ + "." + _catalog_), // 入口
        body : V_byClass(_vTocBody_), // 目录索引内容
        result : V_byClass(_vTocFilterResult_ + "." + _toc_) // 过滤结果面板
        // result : V_byClass(_vTocFilterResult_ + "." + _catalog_) // 过滤结果面板
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

    // 更新无目录情况下的提示信息
    T.ui.body.a(_dataTocEmpty_, "( " + V_lang_text35() + V_lang_text66() + " )\n\n"
        + V_lang_text(46, [
            "在第一个一级标题前添加 [TOC] 以生成目录",
            "Add [TOC] before the first first-level heading to generate it"
        ]));

    /**
     * 返回 Toc 组件类型名称
     */
    T.typeName = function () {
        // return _catalog_;
        return _toc_;
    }

    /**
     * 返回 Toc 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text35();
    }

    /**
     * 是否有目录索引项目
     */
    T.hasIndexItem = function () {
        return (V_length(T.ui.body.ch()) > 0);
    }

    /**
     * 根据设备类型自适应hover样式
     */
    T.adjustHoverStyle = function () {
        if (V_util_isMobile()) // 移动设备时解绑样式事件
            $(_vTocFolder_).uH();
        else // 非移动设备时绑定样式事件
            V_ui_bindHover($(_vTocFolder_));
    }

    /**
     * 添加目录节点
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    T.add = function (item) {
        T.holder.segs.sts(this.typeName(), gTrue);

        // 将章节记录到目录集中
        let a = item.ch("a"),
            href = a.a(_href_);
        T.h.push(href.ss(1, V_length(href)));

        // 自定义目录节点元数据
        item.a(_id_, _vkHeader_ + item.a(_dataRef_)); // 添加id属性
        item.a(_dataNode_, 0); // 添加节点类型：0:叶子节点, 1:目录节点
        item.a(_dataFolded_, _false_); // 添加节点状态：true:收起, false:展开
        item.a(_title_, a.t().x());

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.af(a.t());
        a.t(_);

        V_ui_adjustHoverStyle(item);
        // 点击目录节点事件
        item.uC().ck((event) => {
            // 跳转至对应的页内锚点
            let hash = V_byID(item.a(_id_)).ch("a").a(_href_);
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
                let folder = T.lastHeaderFolder.hm(V_ui_svgIcon(_icoTocFolded_, 16, 16, _theme_, _vRotate90_)),
                    folderParent = folder.p();
                folderParent.a(_dataNode_, 1); // 0:叶子, 1:目录
                folderParent.a(_dataFolded_, _false_); // true:收起， false:展开

                // 折叠控件事件
                V_ui_addAnimate(folder.ch(_svg_));
                folder.uC().ck((event) => {
                    event.stopPropagation(); // 停止事件冒泡

                    let id = $(event.currentTarget).p().a(_id_);
                    T.disposeFold(id, (V_byID(id).a(_dataFolded_).sW("t")) ? "e" : "c", gTrue);
                });
            }
            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            else if (lv < T.lastHeaderLevel)
                T.foldItems.pop();

            // 设置当前节点的父级信息
            if (V_length(T.foldItems) > 0)
                item.a(_dataPid_, T.foldItems[V_length(T.foldItems) - 1].p().a(_id_));
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
            scrollTop = V_util_getScrollTop();
        if (Math.abs(scrollTop - T.lastDocScrollTop) < gScrollStep)
            return;

        T.lastDocScrollTop = scrollTop;

        // ----------------------------------------
        // 寻找文档当前显示的章节
        // 默认为最后一章
        let curIdx = V_length(T.h) - 1;
        for (let i = 0, len = V_length(T.h); i < len; i++) {
            let anchor = (!env.browser.Firefox)
                    ? T.h[i] // 非 Firefox 浏览器
                    : JS_decodeURI(T.h[i]), // Firefox 浏览器
                target = V_byID(JS_decodeURI(anchor));
            let headerHeight = target.h();
            // 将最近一个章节从文档可视空间上方滚出的章节定义为「当前章节」
            if ((target.oT() - V_util_getScrollTop()) > (headerHeight * 3)) {
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
                JQ_removeClass(T.currentItem, _vItemCurrent_);
            // 更新「当前章节」的样式
            T.currentItem = V_byID(_vlookToc_ + " a" + V_attrCSS(_href_, "#" + T.h[curIdx])).p();
            JQ_addClass(T.currentItem, _vItemCurrent_);

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
            let item = V_byID(id),
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
            sTop = V_util_getScrollTop(T.ui.body), // 目录内当前滚动位置
            sBottom = sTop + T.ui.body.h(); // 当前可视空间中位于目录底部的位置

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (T.currentItem.pos().top < sTop)
            V_util_setScrollTop(T.currentItem.pos().top, T.ui.body);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (T.currentItem.pos().top > (sBottom - preDis))
            V_util_setScrollTop(T.currentItem.pos().top - T.ui.body.h() + preDis, T.ui.body);
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

        if (T.holder.segs.checkedItemValue() === T.typeName())
            T.showFilterResult();

        let matched = gFalse;
        T.ui.result.empty();
        // 遍历目录节点进行关键字匹配
        $(_tocItem_).e((index, element) => {
            let item = $(element),
                data = item.a(_dataHeaderNum_) + item.a(_title_);
            if (data.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();

                V_ui_addAnimate(cloneItem);
                JQ_addClass(cloneItem, _vTocItem_);
                JQ_removeClass(cloneItem, _mdTocItem_ +___+ _mdToc__ + "h1 " + _mdToc__ + "h2 " + _mdToc__ + "h3 " + _mdToc__ + "h4 " + _mdToc__ + "h5");
                JQ_remove(cloneItem.ch(_vTocFolder_));
                cloneItem.pp(V_ui_span(_, _, cloneItem.a(_dataHeaderNum_)));
                cloneItem.show();
                cloneItem.a(_dataKeywordMatch_, _true_);

                V_ui_adjustHoverStyle(cloneItem);

                // 绑定同源的点击事件
                cloneItem.uC().ck((event) => {
                    JQ_removeClass(T.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);
                    item.tr(_click_);
                    JQ_addClass($(event.currentTarget), _vItemCurrent_);
                });

                // 将匹配的节点添加到过滤结果中
                T.ui.result.ap(cloneItem);
                matched = gTrue;
            }
        });
        // 过滤文库节点
        gToc.f("." + _vDocLibItem_).e((index, element) => {
            let item = $(element),
                data = item.a(_title_) + item.a(_dataKeywords_);
            if (data.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                cloneItem.show();
                cloneItem.a(_dataKeywordMatch_, _true_);

                // 绑定同源的点击事件
                cloneItem.uC().ck((event) => {
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
            T.ui.result.ap(V_ui_div(_, _vTocFilterResultNone_, V_lang_text67()));
            Index_updateStatus(this);
        }

        return matched;
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        if (V_length($(_tocItem_)) > 0)
            T.holder.segs.sts(this.typeName(), gTrue);
        else
            T.holder.segs.sts(this.typeName(), gFalse);
    }

    /**
     * 显示目录索引组件
     */
    T.show = function () {
        if (V_length(T.holder.keyword.input.v()) > 0) {
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
        JQ_removeClass(T.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);
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
        let lastItem = gNull,
            item = V_byID(id),
            itemSet = item.nextAll(),
            btnFolder = $("#fd-" + id);

        // 更新折叠控件图标
        if (action === "e") {
            item.a(_dataFolded_, _false_);
            JQ_addClass(btnFolder.ch(_svg_), _vRotate90_);
        }
        else {
            item.a(_dataFolded_, _true_);
            JQ_removeClass(btnFolder.ch(_svg_), _vRotate90_);
        }

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = V_length(itemSet); i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem != gNull) {
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

let Index_segments = gUndefined;

/**
 * 初始化 UI
 * @param indexObj 目标对象
 */
function Index_initUI(indexObj) {
    let ui = indexObj.ui;
    // V_ui_stopScrollPropagation(ui.result);

    V_ui_addAnimate(ui.entry);

    // 生成提示信息 UI
    ui.result.ap(V_ui_div(_, _vTocFilterResultNone_));
    ui.tips = ui.result.ch("." + _vTocFilterResultNone_);

    Index_showTips(ui);
}

/**
 * 无输入关键字的处理
 * @param indexObj 目标对象
 */
function Index_noneKeyword(indexObj) {
    let ui = indexObj.ui,
        items = ui.result.ch("." + _vTocItem_);
    items.show();
    if (V_length(items) === 0)
        Index_showTips(ui);
    else {
        ui.tips.hide();
        items.a(_dataKeywordMatch_, _true_);
        Index_updateStatus(indexObj);
    }
}

/**
 * 更新所属分段状态
 * @param indexObj 目标对象
 */
function Index_updateStatus(indexObj) {
    Index_segments.sts(indexObj.typeName(),
        V_length(indexObj.ui.result.ch("." + _vTocItem_ + V_attrCSS(_dataKeywordMatch_))) > 0);
}

/**
 * 显示提示信息
 */
function Index_showTips(ui) {
    ui.tips.t("( " + V_lang_text67() + " )");
    ui.tips.show();
}

/**
 * 添加索引项目
 * @param indexObj 目标对象
 * @param text 显示的文本
 * @param anchor 锚点
 * @param forSearch 用于搜索时检索的内容
 */
function Index_add(indexObj, text, anchor, forSearch) {
    Index_segments.sts(indexObj.typeName(), gTrue);

    if (indexObj.ui.tips.isShowed())
        indexObj.ui.tips.hide();
    let item = $(V_ui_span(_vTocItem_,
                    V_attr(_dataKeywords_, V_util_clearHtmlQuot((forSearch === gUndefined || V_length(forSearch.x()) === 0) ? _ : forSearch)),
                    text));
    indexObj.ui.result.ap(item);
    V_ui_addAnimate(item);
    item.uC().ck((event) => {
        JQ_removeClass(indexObj.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);
        JQ_addClass(item, _vItemCurrent_);

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
function Index_filter(indexObj, value) {
    if (V_length(value.x()) === 0) {
        Index_segments.sts(indexObj.typeName(), gFalse);
        return gFalse;
    }

    // 清空索引列表项
    indexObj.ui.tips.hide();
    indexObj.ui.result.ch().hide();
    JQ_removeClass(indexObj.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);
    JQ_removeAttr(indexObj.ui.result.ch(), _dataKeywordMatch_);

    // 遍历目录节点进行关键字匹配
    let matched = gFalse;
    indexObj.ui.result.ch("." + _vTocItem_).e((index, element) => {
        let item = $(element),
            dataForSearch = item.a(_dataKeywords_);
        if (item.t().l().i(value) > -1
            || (dataForSearch !== gUndefined && dataForSearch.l().i(value) > -1)) {
                item.show();
                item.a(_dataKeywordMatch_, _true_);
                Index_segments.sts(indexObj.typeName(), gTrue);
                matched = gTrue;
        }
    });

    // 过滤结果为空
    if (!matched) {
        indexObj.ui.tips.t("( " + V_lang_text67() + " )");
        indexObj.ui.tips.show();
        Index_segments.sts(indexObj.typeName(), gFalse);
    }

    return matched;
}

/**
 * 是否有对应的索引项目
 * @param indexObj 目标对象
 */
function Index_hasIndexItem(indexObj) {
    return (V_length(indexObj.ui.result.ch(_span_)) > 0);
}

/**
 * 显示索引组件
 * @param indexObj 目标对象
 */
function Index_show(indexObj) {
    indexObj.ui.result.show();
    JQ_removeClass(indexObj.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);
}

/**
 * 隐藏索引组件
 * @param indexObj 目标对象
 */
function Index_hide(indexObj) {
    indexObj.ui.result.hide();
}

// ==================== 导航中心【插图】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function FiguresIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _figure_), // 入口
        result : V_byClass(_vTocFilterResult_ + "." + _figure_), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Figure 组件类型名称
     */
    T.typeName = function () {
        return _figure_;
    }

    /**
     * 返回 Figure 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text58() + " / " + V_lang_text68();
    }

    /**
     * 是否有图片索引项目
     */
    T.hasIndexItem = function () {
        return Index_hasIndexItem(this);
    }

    /**
     * 初始化插图索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        Index_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        Index_updateStatus(this);
    }

    /**
     * 显示插图组件
     */
    T.show = function () {
        Index_show(this);
    }

    /**
     * 隐藏插图组件
     */
    T.hide = function () {
        Index_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【表格】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TablesIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _table_), // 入口
        result : V_byClass(_vTocFilterResult_ + "." + _table_), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Table 组件类型名称
     */
    T.typeName = function () {
        return _table_;
    }

    /**
     * 返回 Table 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text56();
    }

    /**
     * 是否有表格索引项目
     */
    T.hasIndexItem = function () {
        return Index_hasIndexItem(this);
    }

    /**
     * 初始化表格索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        Index_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        Index_updateStatus(this);
    }

    /**
     * 显示表格组件
     */
    T.show = function () {
        Index_show(this);
    }

    /**
     * 隐藏表格组件
     */
    T.hide = function () {
        Index_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【多媒体】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function MediaIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _media_), // 入口
        result : V_byClass(_vTocFilterResult_ + "." + _media_), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Media 组件类型名称
     */
    T.typeName = function () {
        return _media_;
    }

    /**
     * 返回 Media 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text59() + " / " + V_lang_text60();
    }

    /**
     * 是否有多媒体索引项目
     */
    T.hasIndexItem = function () {
        return Index_hasIndexItem(this);
    }

    /**
     * 初始化多媒体索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        Index_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        Index_updateStatus(this);
    }

    /**
     * 显示多媒体组件
     */
    T.show = function () {
        Index_show(this);
    }

    /**
     * 隐藏多媒体组件
     */
    T.hide = function () {
        Index_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【代码块】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function CodeblocksIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _codeblock_), // 入口
        result : V_byClass(_vTocFilterResult_ + "." + _codeblock_), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Codeblock 组件类型名称
     */
    T.typeName = function () {
        return _codeblock_;
    }

    /**
     * 返回 Codeblock 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text57();
    }

    /**
     * 是否有代码块索引项目
     */
    T.hasIndexItem = function () {
        return Index_hasIndexItem(this);
    }

    /**
     * 初始化代码块索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        Index_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        Index_updateStatus(this);
    }

    /**
     * 显示代码块组件
     */
    T.show = function () {
        Index_show(this);
    }

    /**
     * 隐藏代码块组件
     */
    T.hide = function () {
        Index_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【公式】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function FormulasIndex(holder, hidden) {
    let T = this;
    T.ui = {
        entry : V_byClass(_vSegmentBtn_ + "." + _formula_), // 入口
        result : V_byClass(_vTocFilterResult_ + "." + _formula_), // 过滤结果面板
        tips : gUndefined
    };

    T.holder = holder;

    T.resultNav = new FilterResultNavigator(T.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Formula 组件类型名称
     */
    T.typeName = function () {
        return _formula_;
    }

    /**
     * 返回 Formula 组件类型描述
     */
    T.typeDesc = function () {
        return V_lang_text18();
    }

    /**
     * 是否有公式索引项目
     */
    T.hasIndexItem = function () {
        return Index_hasIndexItem(this);
    }

    /**
     * 初始化公式索引
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    T.add = function (text, anchor, forSearch) {
        Index_add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    T.updateStatus = function () {
        Index_updateStatus(this);
    }

    /**
     * 显示公式组件
     */
    T.show = function () {
        Index_show(this);
    }

    /**
     * 隐藏公式组件
     */
    T.hide = function () {
        Index_hide(this);
    }
    if (hidden) T.hide();
}

// ==================== 导航中心【访问历史】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
// function TocHistory(holder, hidden) {
//     let T = this;
//     T.ui = {
//         entry : V_byClass(_vSegmentBtn_ + "." + _history_), // 入口
//         // title : V_byClass(_vTocHistory_ + __title_), // 历史记录标题
//         result : V_byClass(_vTocHistory_ + __result_) // 历史记录面板
//     };
//     // V_ui_stopScrollPropagation(T.ui.result);

//     T.holder = holder;

//     /**
//      * 返回 Toc 组件类型名称
//      * @returns string Toc 组件类型名称
//      */
//     T.typeName = function () {
//         return _history_;
//     }

//     /**
//      * 是否有访问历史索引项目
//      */
//     T.hasIndexItem = function () {
//         return TocIndex_hasIndexItem(this);
//     }

//     /**
//      * 添加访问历史记录
//      * @param hash 页内锚点链接
//      */
//     T.add = function (hash) {
//         if (hash === gUndefined || hash === "#" || V_length(hash.x()) === 0)
//             return;

//         // 清空当前条目的样式
//         JQ_removeClass(T.ui.result.ch("." + _vItemCurrent_), _vItemCurrent_);

//         // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
//         let title = gUndefined,
//             anchor = hash.ss(1, V_length(hash));
//         if (anchor.sW("vk-id")) // 插图/表格/多媒体/代码块索引
//             title = $(hash).a(_dataTitle_);
//         else if (anchor.sW("vk-err") // 错误的内链
//             || anchor.sW(_vkFooterArea_)) // 全部脚注
//             title = $(hash).t();
//         // 未匹配到以上 VLOOK 专属的索引锚点，则按目录索引进行处理
//         if (title === gUndefined) {
//             let hashObj = $(_tocItem_ + ">." + _mdToc__ + _inner_ + V_attrCSS(_href_, JS_decodeURI(hash))).p();
//             // title = V_ui_span(_, _, hashObj.a(_dataHeaderNum_) +___)
//             title = V_ui_span(_, _, "§ " + hashObj.a(_dataHeaderNum_))
//                 + JS_decodeURI(anchor);
//         }
//         let result = T.ui.result.ch(_span_ + V_attrCSS(_dataHistory_, hash));

//         // 不存在相同的历史访问记录
//         if (V_length(result) === 0) {
//             T.ui.result.pp(V_ui_span(_vTocItem_, V_attr(_dataHistory_, hash), title));
//         }
//         // 已存在相同的历史访问记录
//         else {
//             // 将相同的记录移动到最前面
//             let existsItem = result.clone();
//             T.ui.result.pp(existsItem);
//             JQ_addClass(existsItem, _vItemCurrent_);
//             JQ_remove(result);
//         }

//         // 为新增加 / 移动后的记录添加鼠标事件
//         let item = T.ui.result.ch(_span_ + V_attrCSS(_dataHistory_, hash));
//         JQ_addClass(item, _vItemCurrent_);
//         item.a(_dataKeywordMatch_, _true_);
//         item.uC().ck((event) => {
//             V_util_gotoHash(hash);
//             // 触发锚点点击事件
//             typeof(T.holder.onInteractive) === _function_ && T.holder.onInteractive();
//         });

//         T.updateStatus();
//     }

//     /**
//      * 更新所属分段状态
//      */
//     T.updateStatus = function () {
//         TocIndex_updateStatus(this);
//     }

//     /**
//      * 显示历史组件
//      */
//     T.show = function () {
//         // T.ui.title.show();
//         T.ui.result.show();

//         let tocItem = _span_ + "." + _vTocItem_,
//             noneHistory = "div.v-toc-history-none";
//         // 没有历史访问记录，也没有提示信息内容
//         if (V_length(T.ui.result.ch(tocItem + "," + noneHistory)) === 0) {
//             // 添加提示信息
//             T.ui.result.ap(V_ui_div(_, "v-toc-history-none", "( " + V_lang_text(67, [
//                 _No_content_cn_,
//                 _No_content_en_
//             ]) + " )"));
//         }
//         // 有历史访问记录
//         else if (V_length(T.ui.result.ch(tocItem)) > 0) {
//             // 移除提示信息
//             JQ_remove(T.ui.result.ch(noneHistory));
//         }
//     }

//     /**
//      * 隐藏历史组件
//      */
//     T.hide = function () {
//         // T.ui.title.hide();
//         T.ui.result.hide();
//     }
//     if (hidden) T.hide();
// }

// ==================== 导航中心 DocLib 文库类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param holder 关联的上级容器
 */
function DocLib(mask, holder) {
    let T = this;
    T.ui = V_byClass(_vDocLib_);
    T.iframe = gUndefined;
    T.off = gFalse;
    T.enabled = gFalse;
    T.page = gUndefined;
    T.hash = _;
    T.counter = 0;
    T.paths = [];
    T.holder = holder;

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    T.init = function () {
        if (V_util_getParamVal(_vdl_) === _off_)
            T.off = gTrue;

        // ------------------------------
        // 处理文档内的文库专用链接
        let re_TargetVDL = new RegExp("[?&]" + _target_ + "=" + _vdl_, "i");
        $("a" + V_attrCSS(_href_, _docLibIdentifier_, "*")).e((index, element) => {
            let a = $(element),
                href = a.a(_href_),
                page = V_util_getUrlWithoutHash(href).r(re_TargetVDL, _),
                hash = V_util_getUrlHash(href);

            JQ_removeAttr(a, _href_); // 移除 href

            if (!T.off) {
                a.a(_target_, _vdl_);
                a.uC().ck((event) => {
                    T.show(page, hash);
                });
            }
        });

        if (T.off) // 指定关闭文库则不再进行后续处理
            return;

        // ==============================

        let docLibValue = V_util_getMetaByName(_vlookDocLib_),
            result = gNull,
            docLibToc = gUndefined;

        T.iframe = $(_iframe_ + V_attrCSS(_name_, _vlookDocLib_));

        gToc.ap(V_ui_div(_docLibToc_, _));
        docLibToc = V_byID(_docLibToc_);

        // ------------------------------
        // 处理 YAML 中的文库配置，支持以逗号分隔的多段内容
        if (docLibValue !== gUndefined && (result = docLibValue.m(/^([^,]+(,\s*)?)+$/)) != gNull) {
            let docLibList = docLibValue.sp(/, /),
                page = _,
                hash = _;
            for (let i = 0; i < V_length(docLibList); i++) {
                result = docLibList[i].m(/^(\[([^\]]+)]\(([^)\s]+)(\s+"([^"]+)")?\))$/);
                // 按 [text](url "title") 格式配置的文库
                let text = _link_;
                if (result != gNull) {
                    page = V_util_getUrlWithoutHash(result[3]);
                    hash = V_util_getUrlHash(result[3]);
                    text = result[2].x();
                    let title = (V_length(result) > 5) ? result[5] : _;
                    if (V_length(text) === 0 && V_length(title) > 0)
                        text = title;
                    __addDocLibItem(text, page, hash, title);
                }
                // 按默认只有 url 方式配置的文库
                else {
                    page = V_util_getUrlWithoutHash(docLibList[i]);
                    hash = V_util_getUrlHash(docLibList[i]);
                    __addDocLibItem(V_lang_text7(),
                        page, hash, _);
                }
                // 添加到链接地图
                LinkTool_addToMap(text, page, hash.ss(1, V_length(hash)).l());
            }
        }

        // --------------------
        // 添加动画效果
        V_ui_addAnimate(V_byID(_docLibToc_ + ">." + _vDocLibItem_
            + ",#" + _docLibToc_ + ">." + _vDocLibItem_ + ">svg"));

        T.reload();

        /**
         * 添加文库项
         * @param text 文库名称
         * @param page 文库页面路径
         * @param hash 文库页面锚点
         * @param title 文库用于被关键字检索的内容
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
                hasTarget = (target !== gUndefined && V_length(target) > 0);
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
            item.a(_dataKeywords_, _vdl_ + "文库" + (title === gUndefined ? _ : title));
            item.uC().ck((event) => {
                if (hasTarget) {
                    // 去掉 target 参数内容
                    let urlParams = new URLSearchParams(new URL(page, gLocation.origin).search);
                    urlParams.delete(_target_);
                    // 新标签中打开
                    gWindow.open(V_util_getUrlWithoutQueryAndHash(page)
                        + JS_toString(urlParams) + hash, target);
                }
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
        // 避免初始化时，与 ColorScheme_refresh 重复加载
        if (scheme === ColorScheme_scheme
            && (page === gUndefined || T.page === gUndefined))
            return;

        let cs = _;

        // 指定的颜色方案不为空时
        if (scheme !== gUndefined)
            cs = "&cs=" + scheme;

        // 指定的页面为空时（不包括 ?target=vdl 这种情况）
        if (page === gUndefined)
            page = T.page;
        if (page === gUndefined)
            return;

        // 指定的锚点为空时
        if (hash === gUndefined)
            hash = _;

        T.iframe.a(_src_,
            page + ((page.i("?") > -1) ? "&" : "?")
            + "ws=" + _off_ + "&v" + _type_ + "=" + _mini_
            + cs + "&ts=" + V_util_getTime()
            + hash);
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

        let path = V_util_getUrlWithoutQueryAndHash(newPage);

        T.mask.show();
        T.ui.show();

        // 如果指定的页面为空，则使用当前页面
        if (V_length(path) === 0) {
            path = T.page;
            newPage = T.page;
        }

        // 如果指定的锚点为空，且路径与当前页面一致，则不刷新页面
        if (V_length(hash) === 0
            && path === V_util_getUrlWithoutQueryAndHash(V_util_getUrlWithoutHash(T.iframe.a(_src_))))
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
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.disposeHotkey = function (key, combKeys, event) {
        if (T.ui.isHidden())
            return;

        let handled = false;
        switch (key) {
            case _escape_:
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
    // to-do: 检查最新 Typora 集成的 Mermaid 是否已修复
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    V_byClass(_mdDiagramPanel_ + ">svg>svg>g").e((index, element) => {
        $(element).unwrap();
    });
    sw.ed("    ├ prepare svg: ");

    // ----------------------------------------
    // 对 img 类插图（Mermaid）进行初始化处理
    sw.st();

    // 注意：为适配浏览器安全策略！！！
    // 由于不同浏览器的安全策略不同，所以针对不同浏览器的图片剪影处理进行微调
    // 若 SVG 文件与当前 HTML 文件不在同一域名下，浏览顺会存跨域权限问题无法完成处理
    // 非 Firefox / Safari 以本地打开方式下无法进行处理
    let httpMode = WINDOW_getHref().sW(_http_),
        canImageFill = (httpMode || env.browser.Firefox || env.browser.Safari),
        hostname = gLocation.hostname,
        imgHost = V_util_getMetaByName(_vlook__ + _image_ + "-host");
    if (imgHost !== gUndefined && !imgHost.eW("/"))
        imgHost += "/";

    $(__write_ + " :is(p,a,td,strong)>" + _img_ + ","
    + __write_ + " ." + _mdDiagramPanel_ + ">" + _svg_ + ","
    // + _write_ + " :is("
    //     + _img_ + V_attrCSS(_src_, "#icon", "*") + ","
    //     + _img_ + V_attrCSS(_src_, "#logo", "*") + ","
    //     + _img_ + V_attrCSS(_src_, "#" + _card_, "*") + ","
    //     + _img_ + V_attrCSS(_src_, "#logo#border", "*")
    // + "),"
    + __write_ + " a kbd>" + _img_).e((index, element) => {
        let fig = $(element),
            src = fig.a(_src_),
            src2ImageFill = src,
            container = fig.p(),
            tagName = V_util_getTagName(fig),
            params = _,
            hash = _,
            isPostcard = gFalse;

        // ----------------------------------------
        // 对 img 类插图的处理
        if (src !== gUndefined) {
            // 对于 img 类插图的预处理
            params = V_util_getUrlQueryParams(JS_encodeURI(src));
            hash = V_util_getUrlHash(src);

            fig.a(_id_, "vk-id-img" + V_doc_counter_img);

            // 当前 HTML 的打开方式可进行图片「颜色替换」的适配处理
            if (canImageFill === gTrue) {
                // 获得图片路径的域名
                let matchRes = src2ImageFill.m(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                let srcHost = matchRes && matchRes[1];

                // 对于相对路径，或与当前 HTML 域名一致
                if (srcHost == gNull || hostname === srcHost) {
                    // 针对 Safari 且指定了默认图床域名
                    // 进行颜色替换前，先调整原始 <img> 的 src
                    let needImgHost = (env.browser.Safari && !httpMode && imgHost !== gUndefined);
                    if (needImgHost) {
                        src2ImageFill = imgHost + src2ImageFill;
                        fig.a(_src_, src2ImageFill);
                    }

                    // 进行 svg 图片剪影处理，png 图片通过 css 样式实现
                    __initSvgImageFill(fig, container, params, hash, src2ImageFill);

                    // 恢复原始 <img> 的 src
                    if (needImgHost)
                        fig.a(_src_, src);
                }
            }

            // 初始化图片对「颜色方案」的适配处理
            __initColorScheme(fig, params);

            // 初始化图片对「高清屏」的适配处理
            __initHighDPI(fig, params);

            // 初始化图片对「图文卡片」的适配处理
            __initPostcard(fig, src, hash);

            // 对图片「加载结果」进行是跟踪检查
            __bindLoadChecker(fig);

            V_doc_counter_img++;

            // 跳过带指定显示版式的图片
            if (__isNotFigure(container, hash))
                return gTrue;

            // 插图（非明信片）的处理
            isPostcard = __isPostcard(hash);
            if (!isPostcard) {
                // 初始化图片背景的适配处理
                __initBackground(fig, params);

                // 添加插图容器
                container = fig.p();
                // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
                if (V_util_getTagName(container) !== "p") {
                    fig.wrap("<p></p>");
                    container = fig.p();
                }
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
            if (prevFig === undefined || V_length(prevFig.ch("." + _vCaption_ + "," + _img_)) === 1)
                ContentFolder_add(fig, _figure_);

            if (V_length(hash) > 0 && hash.sW("#blur")) {
                fig.wrap(V_ui_div(_, "v-blur", _));
            }
        }
    }); // 结束初始化处理

    // 对 插图 和 明信片进行分类排序
    V_util_sort(iNavCenter.figures.ui.result, iNavCenter.figures.ui.result.ch("." + _vTocItem_));
    // let figureItems = iNavCenter.figures.ui.result.ch("." + _vTocItem_);
    // figureItems.sort((a, b) => {
    //     let textA = $(a).t().ss(0, 1),
    //         textB = $(b).t().ss(0, 1);
    //     // 以下以是以字符的 unicode 编码进行比较
    //     // 用 localeCompare 进行比较的话，存在不同国家或地区的排序结果不同
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
    // // 按重新排序的节点进行显示
    // figureItems.e((index, element) => {
    //     $(element).detach().appendTo(iNavCenter.figures.ui.result);
    // });
    sw.ed("    ├ figure set: ");

    // ----------------------------------------
    // 对 srcset 为 auto 模式的处理
    sw.st();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && V_util_getParamVal(_srcset_) === _auto_) {
            $("p" + V_attr(_dataContainer_, _img_) +___+ _img_).e((index, element) => {
                let fig = $(element);
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
        fig.on(_error_, (event) => {
            if (!ignoreImgLost) {
                // 将无法加载的图片信息添加到链接检查器
                let cp1 = fig.p().f(_vCap1_).hm(),
                    targetToJump = fig.p();
                // 非插图（无题注），则按普通的 img 来处理
                if (cp1 === gUndefined) {
                    cp1 = fig.a(_alt_);
                    targetToJump = fig;//.a(_id_);
                }
                // 对 alt 也为空时
                if (cp1 === gUndefined)
                    cp1 = fig.a(_src_);
                // 添加无效链接项
                LinkTool_addToCheckResult(_error_, targetToJump,
                    V_ui_label(_, _, "🚫 🖼 " + V_lang_text(65, [
                        "无效的图片源",
                        _Invalid_ + " image address"
                    ])) + cp1);
            }

            __loadDefaultOnError($(event.currentTarget));
        });

        // 强制重新加载一次以触发error事件
        fig.a(_src_, src);
    }

    /**
     * 判断是否属于插图
     * @param container img 对象的父级元素
     * @param hash 插图路径的锚点
     * @returns boolean true：不属于插图，false：属于插图
     */
    function __isNotFigure(container, hash) {
        let iconMode = hash.i("#icon") > -1,
            //frameMode = hash.i("#frame") > -1,
            logoMode = hash.i("#logo") > -1;
        //return (iconMode || logoMode || frameMode || (container !== gUndefined && V_util_getTagName(container) === _kbd_));
        return (iconMode || logoMode || (container !== gUndefined && V_util_getTagName(container) === _kbd_));
    }

    /**
     * 判断是否属于明信片
     * @param hash 插图路径
     * @returns boolean true：不属于明信片，false：属于明信片
     */
    function __isPostcard(hash) {
        return hash.i("#" + _card_) > -1;
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
     * 初始化 svg 图片剪影的适配处理
     *
     * @param img img 对象
     * @param container img 对象的父级元素
     * @param params img 对象 src 值的 URL 参数数组
     * @param hash img 对象 hash 值
     * @param src img 对象的 src 值
     */
    function __initSvgImageFill(img, container, params, hash, src) {
        let fill = params[_fill_];
        if (fill === gUndefined)// && V_util_getTagName(container) !== _kbd_)
            return;

        if (fill === gUndefined)
            fill = _kbd_;
        img.a(_dataImgFill_, (fill === gUndefined ? _kbd_ : fill));

        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.i(_suffixSvg_, 1) > -1) {
            SVGInject(img[0], {
                // 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    if (!__isNotFigure(container, hash))
                        ContentAssistor_bind(svgObj, _fig_ + _suffixSvg_);
                    // 对颜色进行替换的适配处理
                    ExtFigure_adjustFillAlterForSVG(svgObj.a(_dataImgFill_), svgObj);
                },
                // 注入失败
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
     * 初始化图片高清屏的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let src = img.a(_src_),
            srcset = params[_srcset_],
            darksrcset = params[_darksrcset_];

        // 针对 Light Mode 对应的图片集
        if (srcset !== gUndefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.a(_dataSrcsetLight_, srcset);
            // 设置默认值
            img.a(_srcset_, srcset);
        }

        // 针对 Dark Mode 对应的图片集
        if (darksrcset !== gUndefined) {
            darksrcset = __transUrlSrcSet(img.a(_dataSrcDark_), darksrcset);
            img.a(_dataSrcsetDark_, darksrcset);
        }
    }

    /**
     * 初始化图片高清屏的适配处理
     * @param img img 对象
     * @param src img 对象 src 值
     * @param hash img 对象 src 值中的锚点
     */
    function __initPostcard(img, src, hash) {
        // 未指定 card 参数，则跳过
        if (hash === gUndefined || hash.i(_card_) === -1)
            return;

        // 如果是嵌套在 blockquote 中，则对其进行样式调整
        let blockquote = img.closest(_blockquote_),
            inBlockquote =(V_length(blockquote) > 0);
        if (inBlockquote) {
            blockquote.c(_cssText_, _padding_ + ":0" + _important_);
            blockquote.c(_boxShadow_, _none_);
            blockquote.c(_height_, _auto_);
            JQ_removeAttr(blockquote, _dataQuoteGroup_);
        }

        // 插入卡片元素
        let altText = img.a(_alt_),
            altTextForSearch = altText,
            titleText = img.a(_title_),
            cardBody = img.closest("p").n(), // 考虑明信片带 a 链接等情况
            border = (hash.i("#border") > -1 ? gTrue : gFalse),
            fitMax = (hash.i("#fitmax") > -1 ? gTrue : gFalse),
            dual = (hash.i("#cardd") > -1 ? gTrue : gFalse);

        // 若添加了通过引用块指定为正文内容的，则进行处理
        if (cardBody !== gUndefined && V_length(cardBody) > 0) {
            if (V_util_getTagName(cardBody) === _blockquote_) {
                altText = cardBody.hm();
                altTextForSearch = cardBody.t();
                JQ_remove(cardBody);
            }
        }

        JQ_removeAttr(img, _title_);

        img.af(V_ui_article(_, _vPostCard_ +___+ _vBackdropBlurs_ +___+ (dual ? _ : "hover "),
                (titleText === gUndefined ? _ : V_ui_header(_, _vCard_ + __title_, titleText))
                + (altText === gUndefined ? _ : V_ui_section(_, _vCard_ + __text_, altText))
            ));

        // 针对 card dual 模式的处理
        if (dual) {
            // 完成图片加载后再进行处理
            img.on(_load_, (event) => {
                img.n().c(_width_, inBlockquote
                    ? _100pc_
                    : img.c(_width_));
            });
        }
        // 针对 card 模式的处理
        else {
            // 图片 mouseenter 和 mouseleave 事件
            img.on(_mouseEnter_, (event) => {
                let _t = $(event.currentTarget),
                    card = _t.n();
                if (card.c(_display_) !== _none_)
                    return;

                _t.c(_filter_, _brightness_ + "(.8)");

                __setCardSize(_t, card, border, fitMax);

                // 显示
                card.c(_display_, _block_);
                card.on(_mouseLeave_, (event) => {
                    $(event.currentTarget).hide();
                    _t.c(_filter_, _none_);
                });
            }).on(_mouseLeave_, (event) => {
                let _t = $(event.currentTarget),
                    card = _t.n();
                if (!v_ui_mouseDropIn(_t, event)) {
                    _t.c(_filter_, _none_);
                    card.c(_display_, _none_);
                }
            });

        }

        V_doc_counter_postcard++;

        // 无指定 title 时，使用图片的文件名作为题注
        if (titleText === gUndefined)
            titleText = V_util_getUrlWithoutQueryAndHash(src.ss(src.lastIndexOf('/') + 1));

        // 生成用于被检索的内容
        if (altTextForSearch === gUndefined)
            altTextForSearch = _;

        let anchor = "vk-id-psc" + V_doc_counter_postcard,
            caption = V_ui_span(_, _, CaptionGenerator_prefix(img, V_lang_text68(),  V_doc_counter_postcard) + CaptionGenerator_spliter) + titleText,
            dataForSearch = titleText + altTextForSearch;
        img.a(_id_, anchor);
        img.a(_dataTitle_, caption);
        iNavCenter.figures.add(caption, anchor, dataForSearch);
    }

    /**
     * 加载默认图片
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        JQ_removeAttr(target, _alt_);
        JQ_removeAttr(target, _title_);
        JQ_addClass(target, "v-img-lost");
    }

    /**
     * 设置明信片尺寸
     * @param img 明信片对象
     * @param card 明信片的文本对象
     * @param border 明信片的是否有指定 #border
     * @param fitMax 明信片的是否有指定 #fitmax
     */
    function __setCardSize(img, card, border, fitMax) {
        // 先调整宽度
        let w = JS_parseInt(img.oW());
        if (fitMax === gTrue) // 取父元素的宽度
            w = JS_parseInt(img.p().oW(gTrue));
        card.c(_width_, w);

        // 后根据实际宽度渲染结果，计算最终高度
        let h = JS_parseInt(card.oH()),
            imgH = JS_parseInt(img.oH());
        card.c(_top_, img.pos().top + imgH - h + (border ? 1 : 0));
    }

    /**
     * 转换图片地址中的 srcset / darksrcset 参数为符合 <img> srcset 属性的格式
     * @param src 图片地址
     * @param srcset srcset 或 darksrcset 参数的内容
     */
    function __transUrlSrcSet(src, srcset) {
        // 针对 html 与 图片同一目录的情况
        let path = V_util_getPath(src);

        // 针对 @2x/@3x 图片资源为自动匹配名称的语法
        // 针对 2x/3x 的文件名为 <文件名@2x.xxx> 或 <文件名@3x.xxx> 的情况
        if (/^@2x(,@3x)?$/.test(srcset)) {
            let pureSrc = src.ss(0, src.i("?", 5)),
                fileName = pureSrc.ss(0, pureSrc.lastIndexOf(".")), // 图片资源文件名（不含扩展名）
                suffix = pureSrc.ss(pureSrc.lastIndexOf("."), V_length(pureSrc)); // 图片资源扩展名
            // 自动补全图片资源 URL
            srcset = srcset.r(/@2x/, fileName + "@2x" + suffix + " 2x");
            srcset = srcset.r(/@3x/, fileName + "@3x" + suffix + " 3x");
        }
        // 针对 @2x/@3x 图片资源为指定文件名的语法
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
        if (V_length(sss) > 1 && sss[1].i("/") === -1) // 仅为文件名时才添加路径
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
    let scheme = ColorScheme_scheme,
        darkMode = scheme === _dark_;
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 先对适配方式为「反转」的处理
    $(_img_ + V_attrCSS(_dataDarkSrc_, _invert_) + "," + _svg_ + V_attrCSS(_dataDarkSrc_, _invert_)).e((index, element) => {
        let img = $(element),
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
    // 后对适配方式为「替换」的处理
    $(_img_ + V_attrCSS(_dataDarkSrc_, _alter_)).e((index, element) => {
        let img = $(element);
        JQ_removeClass(img, _vImgInvertDark_);
        img.a(_src_, img.a(_dataSrc_ + scheme));
        img.a(_srcset_, img.a(_dataSrcset_ + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $(_img_ + V_attrCSS(_dataImgFill_, _text_)
        + "," + _img_ + V_attrCSS(_dataImgFill_, _theme_ + 1)
        + "," + _img_ + V_attrCSS(_dataImgFill_, _theme_ + 2)
        + "," + _svg_ + V_attrCSS(_dataImgFill_, _text_)
        + "," + _svg_ + V_attrCSS(_dataImgFill_, _theme_ + 1)
        + "," + _svg_ + V_attrCSS(_dataImgFill_, _theme_ + 2)).e((index, element) => {
        let fig = $(element),
            fill = fig.a(_dataImgFill_);
        // 针对 SVG 对象，或 src 为 .svg 的 img 对象
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
        $(_img_ + V_attrCSS(_dataFigGrid_, "line")
            + "," + _img_ + V_attrCSS(_dataFigGrid_, _block_)).e((index, element) => {
            let img = $(element),
                _lineDark = "line-" + _dark_,
                _blockDark = _block_ + "-" + _dark_;
            // 先清空所有涉及的样"line-dark"式
            if (darkMode) {
                JQ_removeClass(img, _figSolid__ + "bg-" + _light_);
                JQ_removeClass(img, _figGrid__ + "line-" + _light_);
                JQ_removeClass(img, _figGrid__ + _block_ + "-" + _light_);
            }
            else {
                JQ_removeClass(img, _figSolid__ + "bg-" + _dark_);
                JQ_removeClass(img, _figGrid__ + _lineDark);
                JQ_removeClass(img, _figGrid__ + _lineDark + "-" + _invert_);
                JQ_removeClass(img, _figGrid__ + _blockDark);
                JQ_removeClass(img, _figGrid__ + _blockDark + "-" + _invert_);
            }

            let gridType = img.a(_dataFigGrid_),
                darkInvert = img.a(_dataDarkSrc_) === _invert_;
            // 网络背景
            if (gridType === _line_ || gridType === _block_) {
                if (darkMode && darkInvert)
                    // 先添加反色后的背景，以适配反色样式后能正常显示
                    JQ_addClass(img, _figGrid__ + gridType + "-" + scheme + "-" + _invert_);
                else
                    JQ_addClass(img, _figGrid__ + gridType + "-" + scheme);
            }
            // 非网格背景
            else
                JQ_addClass(img, _figSolid__ + "bg-" + scheme);
        });
    }
}

/**
 * 适配 *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 * @param fill 图片剪影方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
function ExtFigure_adjustFillAlterForSVG(fill, svg) {
    // 先取消可能会因数 darksrc=invert 的 CSS 配置影响
    svg.c(_filter_, _none_);
    // 再针对进行微调
    let svgSets = "path,rect,ellipse,polygon";
    if (fill === _text_)
        svg.f(svgSets).c(_fill_, svg.p().c(_color_));
    else
        svg.f(svgSets).c(_fill_, V_ui_var("--ac-" + fill.l()));
}

// ==================== 插图导航模块 ==================== //

let FigureNav_ui = gUndefined, // 插图导航主界面
    FigureNav_btns = gUndefined,
    FigureNav_content = gUndefined, // 显示插图内容的控件
    FigureNav_figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

function FigureNav_init() {
    FigureNav_ui = V_byClass(_vFigNav_); // 插图导航主界面
    // V_ui_stopScrollPropagation(FigureNav_ui);

    FigureNav_btns = {
        ui : $(_vFigNavBtns_), // 所有导航按钮
        prev : $(_vFigNavBtns_ + ".prev"), // 上一张插图按钮
        next : $(_vFigNavBtns_ + ".next"), // 下一张插图按钮
        close : V_byClass(_vBtn_ + "-close-figure-nav"), // 关闭按钮
    };
    FigureNav_content = V_byClass(_vFigContent_); // 显示插图内容的控件
    FigureNav_figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

    V_ui_addAnimate(FigureNav_content.ch(_img_ + "," + _svg_));

    // 绑定各按钮事件
    FigureNav_btns.prev.uC().ck(() => {
        FigureNav_prevFig();
    });
    FigureNav_btns.next.uC().ck(() => {
        FigureNav_nextFig();
    });
    FigureNav_btns.close.uC().ck(() => {
        FigureNav_hide();
    });
    FigureNav_content.uC().ck(() => {
        FigureNav_hide();
    });
}

/**
 * 插图导航导航按钮在不同终端的适配处理
 */
function FigureNav_adjustHoverStyle() {
    // 移动设备时解绑样式事件
    if (V_util_isMobile()) {
        FigureNav_btns.prev.uH();
        FigureNav_btns.next.uH();
    }
    // 非移动设备时绑定样式事件
    else {
        FigureNav_btns.ui.on(_mouseEnter_, (event) => {
            $(event.currentTarget).c(_transform_, "translateY(-2px)");
        }).on(_mouseLeave_, (event) => {
            $(event.currentTarget).c(_transform_, _none_);
        });
        // 鼠标键按下事件，模拟 :active
        FigureNav_btns.ui.on(_mouseDown_, (index, element) => {
            $(element).c(_transform_, _none_);
        });
        // 鼠标键释放事件，模拟恢复正常
        FigureNav_btns.ui.on(_mouseUp_, (index, element) => {
            $(element).c(_transform_, "translateY(-2px)");
        });
    }
}

/**
 * 是否已显示
 * @returns boolean
 */
function FigureNav_isShowed() {
    return FigureNav_ui.c(_display_) !== _none_;
}

/**
 * 显示插图导航
 */
function FigureNav_show() {
    if (V_doc_counter_figure === 0)
        return;

    let fig = ContentAssistor_lastHover;

    V_doc_scroll_freeze();
    V_doc_block = gTrue;

    if (fig === gUndefined)
        fig = $(V_attrCSS(_dataFigNum_, FigureNav_figNum));

    // 在插图导航中显示对应插图
    FigureNav_figNum = JS_parseInt(fig.a(_dataFigNum_));

    V_ui_fadeShow(FigureNav_ui);

    FigureNav_display();
    FigureNav_updateUI();
}

/**
 * 关闭插图导航
 */
function FigureNav_hide() {
    FigureNav_content.empty();
    V_ui_fadeHide(FigureNav_ui);

    V_doc_scroll_unfreeze();
    V_doc_block = gFalse;
}

/**
 * 显示插图内容
 */
function FigureNav_display() {
    let fig = $(V_attrCSS(_dataFigNum_, FigureNav_figNum));
    FigureNav_content.empty();
    FigureNav_content.show();
    FigureNav_content.c(_width_, jq_Window.w())
        .c(_height_, jq_Window.h());

    let newFig = fig.clone();
    JQ_addClass(newFig, "v-interactive");
    V_ui_fadeHide(newFig);

    // 添加鼠标移入/移出事件
    V_ui_bindHover(newFig);

    // 添加鼠标点击事件
    newFig.uC().ck(() => {
        // 跳转到对应位置
        V_util_gotoHash("#" + _vkIdFig_ + FigureNav_figNum);
        FigureNav_hide();
    });

    FigureNav_content.ap(newFig);
    V_ui_fadeShow(newFig);
}

/**
 * 查看上一个插图
 */
function FigureNav_prevFig() {
    if (FigureNav_figNum > 1) {
        FigureNav_figNum--;
        FigureNav_display();
        FigureNav_updateUI();
    }
}

/**
 * 查看下一个插图
 */
function FigureNav_nextFig() {
    if (FigureNav_figNum < V_doc_counter_figure) {
        FigureNav_figNum++;
        FigureNav_display();
        FigureNav_updateUI();
    }
}

/**
 * 更新插图导航界面
 */
function FigureNav_updateUI() {
    let pageNum = V_byClass(_vFigNav_ + __title_);

    pageNum.hm(V_ui_span("v-" + _fig_ + "-" + _page_ + "-num", _, FigureNav_figNum + "/" + V_doc_counter_figure)
        +___+ V_byID(_vkIdFig_ + FigureNav_figNum + ">" + _vCap1_).t());

    // 更新导航按钮位置
    FigureNav_btns.prev.c(_top_, (FigureNav_ui.h() - FigureNav_btns.prev.h()) / 2);
    FigureNav_btns.next.c(_top_, FigureNav_btns.prev.c(_top_));

    // 根据当前插图索引更新浏览按钮有效状态
    FigureNav_btns.prev.c(_opacity_, 0);
    FigureNav_btns.next.c(_opacity_, 0);
    if (FigureNav_figNum > 1) {
        FigureNav_btns.prev.c(_opacity_, 1);
    }
    if (FigureNav_figNum < V_doc_counter_figure) {
        FigureNav_btns.next.c(_opacity_, 1);
    }
}

/**
 * 处理热键操作
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function FigureNav_disposeHotkey(key, combKeys, event) {
    if (FigureNav_ui.isHidden())
        return;

    let handled = false;
    switch (key) {
        case _arrowLeft_:
        case ',':
            FigureNav_prevFig();
            handled = true;
            break;
        case _arrowRight_:
        case '.':
            FigureNav_nextFig();
            handled = true;
            break;
        case _escape_:
            if (FigureNav_isShowed()) {
                FigureNav_hide();
                handled = true;
            }
            break;
    }

    // 如果事件已处理，则禁止双重操作
    if (handled)
        event.preventDefault();
}

// ==================== Mermaid - 脑图交互类 ==================== //

function mmMindmap_init() {
    // to-do: 新特性，未完成
    let rootIndex = 0,
        sectionGroup = _;
    $(_svg_ + V_attrCSS(_ariaRoledescription_, _mindmap_) + '>.mindmap-nodes>.mindmap-node').e((index, element) => {
        let _t = $(element);
        if (rootIndex > 0) {
            _t.uC().ck((event) => {
                mmMindmapToggleNode($(event.currentTarget));
            });
            _t.c(_visibility_, _hidden_);
        }
        else {
            _t.uC().ck((event) => {
                mmMindmapToggleRoot($(event.currentTarget));
            });
        }
        rootIndex++;
    });

    $(_svg_ + V_attrCSS(_ariaRoledescription_, _mindmap_) + '>.mindmap-edges>.edge').e((index, element) => {
        $(element).c(_visibility_, _hidden_);
    });
}

function mmMindmapToggleRoot(node) {
}

function mmMindmapToggleNode(node) {
    let cssValue = node.a(_class_),
        si = cssValue.i("section-"),
        secNum = 0;
    if (si > -1) {
        secNum = cssValue.ss(si + 8, V_length(cssValue));
        if (secNum.isNumber()) {
            $(_svg_ + V_attrCSS(_ariaRoledescription_, _mindmap_) + '>.mindmap-nodes>.section-' + secNum).e((index, element) => {
                $(element).c(_visibility_, _visible_);
            });

            $(_svg_ + V_attrCSS(_ariaRoledescription_, _mindmap_) + '>.mindmap-edges>.section-edge-' + secNum).e((index, element) => {
                $(element).c(_visibility_, _visible_);
            });
        }
    }
}

// ==================== 样式重制类 ==================== //

/**
 * 调整任务清单复选框的样式
 */
function Restyler_forTaskList() {
    // 对任务清单的 checkbox 组件转换为 SVG 图标
    $(__write_ +___+ _input_ + V_attrCSS(_type_, _checkbox_)).e((index, element) => {
        let chkStatus = _no_, // 默认为未完成
            chkStyle = _dark_; // 默认样式

        // 已完成
        let _t =  $(element),
            checked = _t.a(_checked_);
        if (checked !== gUndefined && checked.sW("c")) { // checked
            chkStatus = _yes_;
            chkStyle = _theme_;
        }
        // 部分完成（不确定选择）
        else if (_t[0].indeterminate) {
            chkStatus = _un_;
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
    let zenSelector = "." + _mdDiagramPanel_ + ">div>svg" + V_attrCSS(_ariaRoledescription_, "zenuml");
    // 调整 ZenUML 尺寸因主题原因导致强制被限制大小的情况
    $(zenSelector).e((index, element) => {
        let target = $(element);
        target.f(".zenuml.bg-skin-canvas").e((i, e) => {
            let zenuml = $(e);
            target.c(_width_, zenuml.w())
                .c(_height_, zenuml.h());
            // 同时修正题注框的宽度、高度
            target.ps("." + _vCaption_).c(_width_, _auto_)
                    .c(_height_, _auto_);
        });
    });
    // to-do: 临时修复方式（多个图标同名渐变色定义冲突）
    // 待 ZenUML 官方修复后可取消
    let idPrefix = "linearGradient-",
        svgIconCount = 0;
    $(zenSelector + " div" + V_attrCSS(_alt_, "icon", "^") + ">" + _svg_).e((index, element) => {
        svgIconCount++;
        let svgIcon = $(element),
            idValue = "linearGradient-vk-fixed-" + svgIconCount;
        // 图标渐变色定义 id 更名
        svgIcon.f("defs>linearGradient" + V_attrCSS(_id_, idPrefix, "^")).attr("id", idValue);
        // 更新图标渐变色定义 id 值
        svgIcon.f("g" + V_attrCSS(_fill_, "url(#" + idPrefix, "^")).attr(_fill_, "url(#" + idValue + ")");
    });

    // ========== 时序图 ==========
    let seqSelector = "." + _mdDiagramPanel_ + " svg" + V_attrCSS(_ariaRoledescription_, "sequence");
    // 修正顺序图整体的样式
    $(seqSelector).e((index, element) => {
        let target = $(element),
            viewBox = target.a(_viewBox_).sp(/\s+/),
            paddingBottom = (target.c(_paddingBottom_));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.a(_viewBox_,
            viewBox[0] +___+ viewBox[1] +___+ viewBox[2] +___
            + (JS_parseInt(viewBox[3]) + JS_parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        JQ_addClass(target, _vMermaidRestyler_);
    });

    // 更新顺序图中的角色样式
    const front = /@.+/g, // 前端触点角色
        keySys = /^\*\*.+/g, // 重要系统角色
        extSys = /^--.+/g; // 外部系统角色
    $(seqSelector + " g>rect" + V_attrCSS(_class_, "actor", "*")).e((index, element) => {
        let actor = $(element),
            text = actor.n(_text_).ch(), // actor text object
            tmpText = text.t(),
            prefix = _;

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
            JQ_addClass(actor.pr(_line_), _vActor_ + "-front");
            text.t(prefix + tmpText.ss(1, V_length(tmpText)));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText)) {
            JQ_addClass(actor, _vActorKeySys_);
            JQ_addClass(actor.pr(_line_), _vActorKeySys_);
            JQ_addClass(actor.nextAll(_text_).ch(), _vActorKeySys_);
            text.t(prefix + tmpText.ss(2, V_length(tmpText)));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText)) {
            JQ_addClass(actor, _vActorExtSys_);
            JQ_addClass(actor.nextAll(_text_).ch(), _vActorExtSys_);
            text.t(prefix + tmpText.ss(2, V_length(tmpText)));
        }
        else {
            text.t(prefix + tmpText);
        }
    });

    // 更新顺序图中消息序号的样式
    $(seqSelector + ">text.sequenceNumber").e((index, element) => {
        // 移除文本宽度，避免不同字体大小时显示效果问题
        JQ_removeAttr($(element), _textLength_);
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    $(seqSelector + " polygon+.labelText").e((index, element) => {
        let fragment = $(element),
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
            g.f("text.loopText,text.loopText>tspan").c(_cssText_, _fill_ + ":" + titleColor + _important_);
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (segType === _alt_)
            fragment.t(V_lang_text(69, [
                "分支",
                "Alt."
            ]));
        else if (segType === "opt")
            fragment.t(V_lang_text(70, [
                "可选",
                "Opt."
            ]));
        else if (segType === _loop_)
            fragment.t(V_lang_text(71, [
                "循环",
                "Loop."
            ]));
        else if (segType === "par")
            fragment.t(V_lang_text(72, [
                "并行",
                "Par."
            ]));
    });

    // 调整片断的标题文本
    $(seqSelector + " text.loopText>tspan").e((index, element) => {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(element);
        fragmentTitle.p().a(_style_, "text-anchor:"  +_start_);

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
    $(seqSelector + " .cluster rect").e((index, element) => {
        $(element).a(_rx_, radius)
            .a(_ry_, radius);
    });
}

/**
 * 针对使用了 Typora 的图片缩放功能的检查与提示
 */
function Restyler_forImgZoom() {
    ERROR(111, $(__write_ +___+ _img_ + V_attrCSS(_style_, "zoom", "*")).length, V_length($(__write_ +___+ _img_ + V_attrCSS(_style_, "zoom", "*"))));
    if (V_length($(__write_ +___+ _img_ + V_attrCSS(_style_, "zoom", "*"))) > 0)
        ALERT(V_lang_text(86, [
            "⚠️ 警告 ⚠️\n\n您的文档中使用了 Typora 的图片缩放功能，会存在兼容问题！\n\n建议替换为 VLOOK™ 的「图片缩放」，如：\npic.jpg#400w\npic.jpg#200h",
            "⚠️ WARNING ⚠️\n\nIn your " + _document_ + ", you used Typora's image scaling feature, which may cause compatibility issues!\n\nIt is recommended to replace it with VLOOK™'s \"image scaling\" such as:\npic.jpg#400w\npic.jpg#200h"
        ]));
        // ALERT([
        //     "⚠️ 警告 ⚠️\n\n您的文档中使用了 Typora 的图片缩放功能，会存在兼容问题！\n\n建议替换为 VLOOK™ 的「图片缩放」，如：\npic.jpg#400w\npic.jpg#200h",
        //     "⚠️ WARNING ⚠️\n\nIn your " + _document_ + ", you used Typora's image scaling feature, which may cause compatibility issues!\n\nIt is recommended to replace it with VLOOK™'s \"image scaling\" such as:\npic.jpg#400w\npic.jpg#200h"
        // ][V_lang]);
}

// ==================== Sup/Sub Magic 模块 ==================== //

/**
 * 初始化
 */
function SupSubMagic_preprocess() {
    // ---------- 注音新语法预处理：_^注音^_ ----------
    $("em>sup" + _onlyChild_).e((index, element) => {
        let _t = $(element),
            result = [];
        result.push(_); // 主结构，在此忽略内容
        result.push(_t.t());
        TextPhonetic_buildForSup(_t.p(), result);
    });

    // 遍历段落内的 sub 下标（针对段落或指定格式）
    $(__write_ + " sub").e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntaxOld)) != gNull) {
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            if (text !== _t.p().t())
                RainbowTextAndCell_build(_t, colorSet);
        }
    });

    // ---------- 色号新语法的预处理：_~色号~_ ----------
    // 引用块、详情的颜色标识
    $(__write_ + " :is(" + _blockquote_ + "," + _details_ + ")>p>em" + _onlyChild_ + ">sub" + _onlyChild_).e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntax)) != gNull) {
            QuoteColoring_build(_t.p().p().p(), _t.p(), colorSet);
        }
    });

    // 文本颜色、段落着色
    $(__write_ + " em>sub" + _onlyChild_).e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntax)) != gNull) {
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            if (text !== _t.p().p().t())
                RainbowTextAndCell_build(_t.p(), colorSet);
        }
    });

    // 针对 GitHub Style Alert 移除内嵌的着色样式
    V_byClass(_mdAlert_).e((index, element) => {
        let _t = $(element);
        // 取消内嵌的引用块着色、summary、引用块小标题样式
        _t.f(".v-q," + _summary_ + "," + _strong_ + V_attrCSS(_class_, _title_, "*")).e((index, element) => {
            JQ_removeAttr($(element), _class_);
        });
        // 根据浏览器语言更换类型文本
        let mdAlertText = "." + _mdAlert_ + __text_;
        _t.f(mdAlertText + "-note").e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlertNote_, 16, 16) + V_lang_text(73, [
                "备忘",
                _Note_
            ]));
        });
        _t.f(mdAlertText + __tip_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlertTip_, 16, 16) + V_lang_text(74, [
                "提示",
                _Tip_
            ]));
        });
        _t.f(mdAlertText + "-important").e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlertImportant_, 16, 16) + V_lang_text(75, [
                "重要",
                _Important_
            ]));
        });
        _t.f(mdAlertText + "-warning").e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlertWarning_, 16, 16) + V_lang_text(76, [
                "注意",
                _Warning_
            ]));
        });
        _t.f(mdAlertText + "-caution").e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlertCaution_, 16, 16) + V_lang_text(77, [
                "警告",
                _Caution_
            ]));
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
        symbolCount = V_length(symbol.sp(___)),
        targetPrev = target.pr(),
        prevText = (targetPrev === gUndefined ? _ : targetPrev.t()),
        wordText;

    // 拉丁内容结尾
    if (/(.*)[a-z]$/i.test(prevText))
        wordText = prevText.r(/(.*)(\b\w+\b)/, "$2");
    // 非拉丁内容结尾
    else
        wordText = prevText.ss(V_length(prevText) - symbolCount, V_length(prevText));

    // 生成注音内容
    let rubyHTML = "$1<ruby>" + wordText
        + "<rp>(</rp><rt>" + symbol
        + "</rt><rp>)" + _nbsp_ + "</rp></ruby>";
    targetPrev.hm(targetPrev.hm().r(new RegExp(String.raw`(.*)${wordText}`), rubyHTML));

    // 绑定注音的点击事件
    targetPrev.f("ruby>rt").uC().ck((event) => {
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
    let translator = _httpsPrefix_ + "www.bing.com/translator/?from=&to=zh-chs&text=",
        // translator = _httpsPrefix_ + "translate.google.cn/?langpair=auto&sl=auto&op=translate&text=",
        url = translator + JS_encodeURI(text);
    // 若 symbol 为日文假名，则跳转至翻译平台翻译 symbol
    if (/^[\u3040-\u30FF]/.test(symbol))
        url = translator + JS_encodeURI(symbol);
    // 若 text 为中文，则跳转至汉典，翻译 text
    else if (/^[\u4e00-\u9fa5]/.test(text))
        url = _httpsPrefix_ + "www.zdic.net/hans/" + JS_encodeURI(text);

    gWindow.open(url, text);
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
    let color = Quote_getColor(colorSet[1]), // 颜色标识
        em = ColorCode_isEm(colorSet) ? " em" : _, // 判断是否指定了强调样式
        tag = V_util_getTagName(quote);

    // 针对 <blockquote> 或 <details>
    if (tag.sW("bl") || tag.sW("de")) {
        // 删除预置颜色标识
        JQ_remove(colorCode.p());

        // 引用着色样式的处理
        JQ_addClass(quote, "v-q " + color + em);

        // 针对 detail 的处理
        JQ_addClass(quote.f(_summary_), _title_ + "-" + color + em);

        // 引用块小标题的处理
        JQ_addClass(quote.f(ExtQuote_subTitle), _title_ + "-" + color + em);
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

// ==================== Sup/Sub Magic：文本颜色模块 ==================== //

/**
 * 构建文本颜色与单元格样式
 * @param colorCode 颜色标识对象
 * @param colorSet 正则表达式匹配后的结果数组
 */
function RainbowTextAndCell_build(colorCode, colorSet) {
    let color = Badge_getColor(colorSet[1]), // 颜色标识
        tableCellBgMode = ColorCode_isEm(colorSet),
        solid = V_length(color) < 4, // true - 单色，false - 渐变色
        gradientColors = [], // 渐变色标识数组
        renderTarget = colorCode.pr(),
        wholeRendering = gFalse;

    // 颜色标识为第 1 个子元素时，代表是要对整个段落（或单元格）进行着色
    if (!tableCellBgMode
        && renderTarget !== gUndefined && V_length(renderTarget) === 0) {
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

    // 文本颜色
    if (!tableCellBgMode) {
        // 针对 mark 标签的处理
        if (tagName === _mark_) {
            __disposeMark(renderTarget);
        }
        // 针对 mark 以外的标签的处理，如：p u strong span 等
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

        if (tagName === "th" || tagName === "td")
            __disposeCell(renderTarget);
    }

    // 删除预置颜色标识
    JQ_remove(colorCode);

    /**
     * 处理文本颜色
     * @param obj 文本对象
     */
    function __disposeText(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        if (solid) {
            // 针对亮度较高的预置色，选择更深一些的 title 色值
            let title = ColorTooLight.test(color) ? __title_ : _;
            obj.c(_color_, V_ui_var("--ac-" + color + title
                + (color !== "bk" ? "-lg" : _)));
        }
        // 渐变色
        else {
            let span = obj.f(_span_);
            if (V_length(span) === 0) // 无子元素 span 时恢复为 obj
                span = obj;
            if (span !== gUndefined) {
                span.c(_cssText_, _backgroundImage_ + ":" + _linearGradient_ + "(90deg,"
                    + V_ui_genGradColorCSS(gradientColors, _, "-lg") + ")" + _important_ + _boxShadow_None_);
                span.c("background-clip", _text_);
                span.c("-webkit-background-clip", _text_);
                span.c(_color_, "transparent");
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
            obj.c(_borderImage_, _linearGradient_ + "(90deg,"
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
            obj.c(_boxShadow_, "0 var(--mark-bg-h-inset) 0 0 " + V_ui_var("--ac-" + color + __fade_
                + (color === "bk" ? _ : "-lg")) + " inset");
        }
        // 渐变色
        else {
            obj.c(_boxShadow_, _none_);
            obj.c(_textShadow_, _none_);
            obj.c(_cssText_, _background_ + ":" + _linearGradient_ + "(90deg,"
                + V_ui_genGradColorCSS(gradientColors, __fade_, "-lg") + ")0 .4375em/100% var(--mark-bg-h) no-repeat" + _important_ + _boxShadow_None_);
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
            obj.c(_backgroundColor_, V_ui_var("--ac-" + color + __fade_
                + (color === "bk" ? _ : "-lg" )));
        }
        // 渐变色
        else {
            obj.c(_cssText_, _backgroundImage_ + ":" + _linearGradient_ + "(135deg,"
                + V_ui_genGradColorCSS(gradientColors, __fade_, "-lg") + ")" + _important_ + _boxShadow_None_);
        }
        obj.a(_dataRbCellBg_, V_ui_campColor(color));
    }
}

// ==================== Code Code 模块 ==================== //

let ColorCode = "(r[do]|og|ye|l[am]|g[nyd]|aq|cy|b[unk]|se|vn|p[uk]|[mw]n|ol|t[12])",
    Color_syntax = new RegExp("^\(" + ColorCode + "+)(!)?\$", "i"),
    Color_syntaxOld = new RegExp("^\\((" + ColorCode + "+)(!)?\\)$", "i"),
    Color_syntaxByClass = new RegExp("\\s(" + ColorCode + "+)\\s(em)?", "i"),
    ColorTooLight = /ye|lm|aq|la|pk|gd|cy/i; // 属于亮度较高，用于文字显示时须要降低亮度的颜色标识

/**
 * 初始化标签、徽章、刮刮卡的默认颜色标识
 */
function ColorCode_init() {
    // 注：引用块着色的初始化在 ExtQuote 中进行
    let dcTag = V_util_getParamVal("tag"),
        dcBadge = V_util_getParamVal("badge"),
        dcCoating = V_util_getParamVal("coating");
    if (dcTag != gNull)
        Tag_defalutColor = dcTag;
    if (dcBadge != gNull)
        Badge_defalutColor = dcBadge;
    if (dcCoating != gNull)
        Coating_defalutColor = dcCoating;
}

/**
 * 处理标签、徽章、引用块、刮刮卡指定的颜色
 * @param target 颜色标识对象
 * @return Array[] 正则表达式匹配的颜色标识数组
 */
function ColorCode_parse(target) {
    let tagName = V_util_getTagName(target),
        newColors = gNull;
    // 针对 <sub> 标签
    if (tagName === "em"
        && V_length(target.ch("sub" + _onlyChild_)) > 0
        && (newColors = target.t().m(Color_syntax)) != gNull) {
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
    let em = colorSet[V_length(colorSet) - 1];
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
    // 遍历所有 不是 em>code 的范围（包标签、徽章的旧语法）
    let stdCount = 0;
    $(V_not("em") + V_not(_strong_) + ">" + _code_).e((index, element) => {
        let _t = $(element),
            codeText = _t.t(),
            result;
        // 先处理：徽章格式
        if ((result = codeText.m(Badge_syntax)) != gNull)
            Badge_build(_t, result);
        // 文字注音格式（代码式语法）
        else if ((result = codeText.m(TextPhonetic_syntaxForCode)) != gNull)
            TextPhonetic_buildForCode(_t, result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else {
            stdCount++;
            JQ_addClass(_t, _vStdCode_ + " id-" + stdCount);
            _t.uC().ck((event) => {
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
    $("em>" + _span_ + _firstChild_ + "+" + _strong_ + _lastChild_ + ",em>" + _strong_ + _onlyChild_).e((index, element) => {
        let _t = $(element),
            result = [],
            tip = _t.pr();

        // 解包 em
        _t.p().wrap(V_ui_span(_, _, _));
        _t.unwrap();

        // 构建兼容旧语法的数据结构
        result.push(_); // 主结构，在此忽略内容
        result.push(V_length(tip) === 0 ? _ : tip.t()); // 提示的内容
        result.push(_t.t()); // 隐藏的内容

        // 生成刮刮卡
        Coating_build(_t.p(), result);
    });

    // 先处理：徽章（新语法）
    $("em>" + _span_ + _firstChild_ + "+" + _code_ + ",em>" + _code_ + _firstChild_ + "+" + _span_ + _lastChild_).e((index, element) => {
        let _t = $(element),
            value2 = _t.n(),
            result = [];

        // 解包 em
        _t.p().wrap("<" + _code_ + "></" + _code_ + ">");
        _t.unwrap();

        let bName = _t.pr().t(),
            bValue = _t.t(),
            bValue2 = _;
        if (V_util_getTagName(_t) === _span_) {
            bValue2 = bValue;
            bValue = bName;
            bName = _;
        }
        else {
            if (V_length(value2) > 0)
                bValue2 = value2.t();
        }

        // 构建兼容旧语法的数据结构
        result.push(_); // 主结构，在此忽略内容
        result.push(bName); // 徽章标题
        result.push(bValue); // 徽章内容 1
        // 徽章内容 2 的处理
        if (V_length(bValue2) > 0) {
            result.push(_);
            result.push(bValue2);
        }

        // 生成徽章
        Badge_build(_t.p(), result);
    });

    // 后处理：标签（新语法）
    $("em>" + _code_ + _onlyChild_).e((index, element) => {
        let _t = $(element),
            codeText = _t.t(),
            result;

        // 解包 em
        _t.unwrap();
        // 解析处理
        if ((result = codeText.m(Tag_syntax)) != gNull)
            Tag_build(_t, result);
    });
}

// ==================== Code Magic：标签模块 ==================== //

// 语法：#tag#(color)
let Tag_count = 0,
    Tag_syntax = /^(.+)$/i,
    Tag_defalutColor = "t2-a"; // theme1

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
    if (colorSet != gNull) {
        color = Tag_getColor(colorSet[1]);
        em = ColorCode_isEm(colorSet) ? " em" : _;
    }

    // 过滤语法内容
    target.t(tag);
    let solid = V_length(color) < 4,
        gradientColors = [], // 渐变色标识数组
        id = " id-" + Tag_count;
    if (!solid) { // 渐变
        gradientColors = V_ui_splitColors(color);
        target.a(_class_, _vTag_ +___+ gradientColors[0] + em + id);
        target.c(_cssText_, _backgroundImage_ + ":" + _linearGradient_ + "(90deg,"
            + V_ui_genGradColorCSS(gradientColors, _, "-lg") + ")" + _important_ + _boxShadow_None_);
    }
    else {
        target.a(_class_, _vTag_ +___+ color + em + id);
    }

    // 复制标签内容
    target.a(_dataAsMarkdown_, __asMarkdown());
    target.a(_value_, target.t());
    target.uC().ck((event) => {
        let _t = $(event.currentTarget),
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
                (V_length(em) > 0 ? "!" : _),
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
    Badge_defalutColor = "t1";

/**
 * 构建徽章样式
 * @param target 目标 code 对象
 * @param result 正则表达式匹配后的结果数组
 */
function Badge_build(target, result) {
    let color = Badge_getColor(gUndefined, target), // 颜色标识
        badgeName = result[1],
        badgeValue = result[2],
        badgeValue2 = (V_length(result) > 4) ? result[4] : gUndefined,
        varStr;

    Badge_count++;

    // 颜色标识新语法处理
    // 新色号语法：_~色号~_
    let colorSet = ColorCode_parse(target.n());
    if (colorSet != gNull) {
        color = Badge_getColor(colorSet[1], target);
    }

    // ----- 徽章标题
    target.wrap("<" + _code_ +___+ V_attr(_class_, _vBadgeName_ +___+ color + " id-" + Badge_count) + "></" + _code_ + ">");
    // 复制徽章标题内容
    let badge = V_byClass(_vBadgeName_ + ".id-" + Badge_count);
    if (V_length(badgeName) > 0)
        badge.pp(V_ui_label(_, _, badgeName));
    // 点击事件
    badge.uC().ck((event) => {
        let _t = $(event.currentTarget),
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
    if ((varStr = badgeValue.m(Badge_syntax_variable)) != gNull)
        badgeValue = badgeValue.r(varStr[2], V_ui_span("var " + color, _, varStr[2]));
    target.hm(badgeValue);

    // 复制徽章内容
    target.uC().ck((event) => {
        let _t = $(event.currentTarget),
            value2 = _t.n();
        Copyer_action(_t, _t.t()
            + (V_length(value2) > 0 ? ___+ value2.t() : _), // 如果有 value2 的处理
            gFalse);
    });

    // ----- 徽章内容2
    if (badgeValue2 !== gUndefined) {
        target.af(V_ui_span(_vBadgeValue_ + "2 id-" + Badge_count, _, badgeValue2));
        JQ_addClass(target.p(), _hastwo_);
        JQ_addClass(target, _hastwo_);

        target.n().uC().ck((event) => {
            let _t = $(event.currentTarget);
            Copyer_action(_t, _t.t(), gFalse);
        });
    }

    // 生成 asMarkdown 内容，用于复制
    badge.a(_dataAsMarkdown_, __asMarkdown());
    // 生成普通内容，用于复制
    let nodeCnt = 0,
        plainContent = _;
    badge.contents().e((index, element) => {
        nodeCnt++;
        plainContent += ((nodeCnt > 1) ? ___ : _) + $(element).t();
    });
    badge.a(_value_, plainContent);

    // 生成徽章的 Markdown 格式
    function __asMarkdown() {
        let content = "*" + badgeName
            + V_util_wrapBackquote(badgeValue)
            + ((badgeValue2 !== gUndefined) ? badgeValue2 : _) + "*";
        // 添加预置色号
        if (color !== Badge_defalutColor) {
            content += ColorCode_genAsMarkdown(color,
                _,
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
                && tagName.l() === _h6_ && p.p().a(_id_) === _write_ )
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
    $(_strong_ + ">" + _mark_ + _onlyChild_).e((index, element) => {
        let _t = $(element).p(),
            value = _t.t();

        // 指定数值时的处理
        if (value.isNumber()) {
            // 解包 mark
            _t.hm(V_ui_label(_, _, _) + value);
            Progressbar_build(_t, value);
        }
        // 指定自动计算时的处理
        else if (value === "?" || value === "？") {
            let taskList = _t.p().n();
            if (V_length(taskList) === 0)
                return;

            let count = V_length(taskList.f("li" + V_not(":has(ul)"))),
                doneCount = V_length(taskList.f("li" + V_not(":has(ul)") + ".task-list-" + _done_)),
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
        outlineWidth = JS_parseInt(label.c(_outlineWidth_)),
        rbTextSet = ["og", "gn", "bu", "vn", "pu", "bk"],
        rbText = target.a(_dataRbText_),
        autoColor = (rbText === gUndefined),
        color,
        colorAlt,
        outlineStyle = "solid";

    // 根据进度值自动适配颜色
    if (autoColor) {
        if (value < 0)
            rbText = "rd";
        else if (value === 0)
            rbText = "gy";
        else if (value > 100)
            rbText = "ro";
        else
            rbText = rbTextSet[Math.floor(value / 20)];
    }
    // 指定固定颜色
    else {
        rbText = Progressbar_getColor(rbText);
    }

    color = "var(--ac-" + rbText + ")";
    colorAlt = "var(--ac-" + rbText + "-a-lg)";

    if (autoColor)
        target.c(_color_, color);

    let overValue = value - 100;
    // 大于 100% 的处理
    if (overValue > 0) {
        let overWidth = overValue / 100 * width;
        // 渲染超出部分
        label.c(_boxShadow_, (overWidth + outlineWidth) + "px 0 0 0 " + color);
        label.c(_marginRight_, overWidth + 5);
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
    label.c(_outlineStyle_, outlineStyle);
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
    if (colorSet != gNull)
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
    target.t(tip);
    target.c(_background_, __genCoatingBg(V_length(tip), color))
        .c(_borderColor_, color);

    // 针对「刮刮卡」的点击事件
    target.uC().ck((event) => {
        Coating_toggle($(event.currentTarget), event);
    });

    /**
     * 根据提示信息字数生成条纹背景
     * @param charCount 提示信息字数
     * @param color 条纹背景色
     * @returns string 生成 CSS 规范的背景
     */
    function __genCoatingBg(charCount, color) {
        let count = 16,
            result = _linearGradient_ + "(135deg,";
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
            result += c +___+ start + "%," + c +___+ end + "%"; // 分段渐变
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
    if (V_util_getSelectedText() !== _)
        return;

    if (target.a(_dataCoatingShowed_).sW("f")) {
        event.stopPropagation(); // 停止事件冒泡
        Coating_show(target);
    }
    else {
        Coating_hide(target);
    }
}

/**
 * 显示「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_show(target) {
    JQ_addClass(target, _opened_);
    // 显示原始信息
    target.t(target.a(_dataCoatingHidden_));
    // 针对「刮刮卡」自定义数据
    target.a(_dataCoatingShowed_, _true_)
}

/**
 * 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_hide(target) {
    JQ_removeClass(target, _opened_);
    // 显示提示信息
    target.t(target.a(_dataCoatingTip_));
    // 针对「刮刮卡」自定义数据
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
    target.n().ch("rt").uC().ck((event) => {
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
            + (author !== gUndefined ? V_ui_strong(author) : _),
        metaContent = V_util_getMetaByName(_vlook__ + _welcome_);

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === gUndefined)
        metaContent = defalutContent;
    metaContent += _br_ + _br_;
    // --------------------------------------------------
    // 欢迎页
    return V_ui_div(_, _vWelcomePage_,
            // 文档专属图标
            V_ui_div(_, _vDocLogo_ + _light_)
            // 欢迎信息
            + V_ui_div(_, _vTips_, metaContent.x())
            // 文档加载进度及进入按钮
            + V_ui_div(_, _vLoading_, _Loading_)
        );
}

/**
 * 加载检查 hash 资源
 */
function VLOOKui_checkHash() {
    return V_ui_div(_, _vCheckHash_, _);
}

/**
 * 加载图标集资源
 */
function VLOOKui_loadIconSet() {
    let ui = '<svg style="display: none;">',
        tagRectX = '<rect x="',
        tagRectTransformRotate = '<rect transform="rotate(',
        widthHeightRx = '" width="2" height="4" rx="1"/>';

        // 图标集：图标|VLOOK LOGO
    ui += V_ui_symbol(_icoVLOOK_,
            V_ui_path('M14.291 0c1.985 0 2.705.207 3.43.595a4.046 4.046 0 0 1 1.684 1.683c.388.726.595 1.446.595 3.43v8.583c0 1.985-.207 2.705-.595 3.43a4.046 4.046 0 0 1-1.683 1.684c-.726.388-1.446.595-3.43.595H5.708c-1.985 0-2.705-.207-3.43-.595a4.046 4.046 0 0 1-1.684-1.683C.207 16.996 0 16.276 0 14.292V5.708c0-1.985.207-2.705.595-3.43A4.046 4.046 0 0 1 2.278.594C3.004.207 3.724 0 5.708 0h8.583zM10.18 14.146a.217.217 0 0 0-.278 0l-.797.663a.217.217 0 0 0-.041.288l.796 1.193a.217.217 0 0 0 .362 0l.796-1.193a.217.217 0 0 0-.041-.288zm-4.12-6.403a3.616 3.616 0 0 0-3.619 3.614 3.616 3.616 0 0 0 3.619 3.613 3.616 3.616 0 0 0 3.62-3.613 3.616 3.616 0 0 0-3.62-3.614zm7.962 0a3.616 3.616 0 0 0-3.62 3.614 3.616 3.616 0 0 0 3.62 3.613 3.616 3.616 0 0 0 3.619-3.613 3.616 3.616 0 0 0-3.619-3.614zM6.059 8.827c1.4 0 2.533 1.133 2.533 2.53a2.531 2.531 0 0 1-2.533 2.53 2.531 2.531 0 0 1-2.533-2.53 2.531 2.531 0 0 1 2.533-2.53zm7.962 0c1.4 0 2.533 1.133 2.533 2.53a2.531 2.531 0 0 1-2.533 2.53 2.531 2.531 0 0 1-2.533-2.53 2.531 2.531 0 0 1 2.533-2.53zm2.402-4.312a.543.543 0 0 0-.71-.267l-.011.005-5.663 2.357-5.66-2.357-.012-.005a.543.543 0 0 0-.448.987l5.863 2.443.011.005a.54.54 0 0 0 .247.045.54.54 0 0 0 .247-.045l.011-.005 5.863-2.443a.542.542 0 0 0 .262-.72z'))
        // 图标集：图标|导航中心
        + V_ui_symbol(_icoNavCenter_,
            V_ui_path('M7.087.453a.82.82 0 0 1 1.1-.366L13 2.493V17.2a.8.8 0 0 1-1.158.716L7 15.493V.82a.82.82 0 0 1 .087-.367zm12.755.797a1.5 1.5 0 0 1 .158.67v11.72a3 3 0 0 1-1.658 2.683l-3.184 1.592A.8.8 0 0 1 14 17.199V2.493L17.83.58a1.5 1.5 0 0 1 2.012.67zM5.913.453A.82.82 0 0 1 6 .82v14.673l-3.83 1.915A1.5 1.5 0 0 1 0 16.066V4.348a3 3 0 0 1 1.658-2.684L4.813.087a.82.82 0 0 1 1.1.366zM18.99 1.7a.5.5 0 0 0-.668-.23L15.61 2.79a.5.5 0 0 0-.046.874l2.71 1.693a.5.5 0 0 0 .765-.424V1.918a.5.5 0 0 0-.05-.219z', _))
        // 图标集：图标|导航中心分段控制|目录索引
        + V_ui_symbol(_icoIndexTabToc_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 8a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h6zm-9 0a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 7a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 4a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1z', _))
        + V_ui_symbol(_icoIndexTabToc_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 10H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zm-9 0H3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 7H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 3H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z', _))
        // 图标集：图标|导航中心分段控制|插图索引
        + V_ui_symbol(_icoIndexTabFigure_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM5.823 7.22a1 1 0 0 1 .288.252l1.821 2.343a1 1 0 0 0 1.34.221l1.567-1.034a1 1 0 0 1 1.331.21l1.188 1.483a.8.8 0 0 1-.624 1.3H3.288a.8.8 0 0 1-.692-1.201l1.86-3.21a1 1 0 0 1 1.367-.364zM10 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', _))
        + V_ui_symbol(_icoIndexTabFigure_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.823 7.22a1 1 0 0 0-1.367.364l-1.86 3.21a.8.8 0 0 0 .692 1.201h9.446a.8.8 0 0 0 .624-1.3L12.17 9.212a1 1 0 0 0-1.331-.21l-1.567 1.034a1 1 0 0 1-1.34-.221L6.111 7.472a1 1 0 0 0-.288-.252zM10 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z', _))
        // 图标集：图标|导航中心分段控制|表格索引
        + V_ui_symbol(_icoIndexTabTable_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5 11H1v1a2 2 0 0 0 2 2h2v-3zm5 0H6v3h4v-3zm5 0h-4v3h2a2 2 0 0 0 2-2v-1zM5 6H1v4h4V6zm5 0H6v4h4V6zm5 0h-4v4h4V6zM5 2H3a2 2 0 0 0-2 2v1h4V2zm5 0H6v3h4V2zm3 0h-2v3h4V4a2 2 0 0 0-2-2z', _))
        + V_ui_symbol(_icoIndexTabTable_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M16 11v1a3 3 0 0 1-3 3h-1v-4h4zM4 11v4H3a3 3 0 0 1-3-3v-1h4zm7 0v4H5v-4h6zm0-5v4H5V6h6zm5 0v4h-4V6h4zm-5-5v4H5V1h6zm2 0a3 3 0 0 1 3 3v1h-4V1h1zM4 1v4H0V4a3 3 0 0 1 3-3h1zM0 6h4v4H0V6z', _))
        // 图标集：图标|导航中心分段控制|多媒体索引
        + V_ui_symbol(_icoIndexTabMedia_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm-1 1.001H4v12h8v-12zM3 11H1v1a2 2 0 0 0 2 2v-3zm12 0h-2v3l.15-.005A2 2 0 0 0 15 12v-1zM3.002 6h-2v4h2V6zm11.997 0h-2v4h2V6zM3 2a2 2 0 0 0-2 2v1h2zm10 0v3h2V4a2 2 0 0 0-2-2zm-2.936 6.655L7.259 10.62A.8.8 0 0 1 6 9.963V6.037a.8.8 0 0 1 1.259-.656l2.805 1.964a.8.8 0 0 1 0 1.31z', _))
        + V_ui_symbol(_icoIndexTabMedia_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M16 11v1a3 3 0 0 1-3 3v-4h3zM3 11v4a3 3 0 0 1-3-3v-1h3zm9-10v14H4V1h8zM6.8 5.237a.8.8 0 0 0-.8.8v3.926a.8.8 0 0 0 1.259.656l2.805-1.964a.8.8 0 0 0 0-1.31L7.259 5.38a.8.8 0 0 0-.459-.144zM16 6v4h-3V6h3zM3 6v4H0V6h3zm10-5a3 3 0 0 1 3 3v1h-3V1zM3 1v4H0V4a3 3 0 0 1 3-3z', _))
        // 图标集：图标|导航中心分段控制|代码块索引
        + V_ui_symbol(_icoIndexTabCodeblock_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6.555 4.168a1 1 0 0 1 .277 1.387L5.201 7.999l1.631 2.446a1 1 0 0 1-.184 1.317l-.093.07a1 1 0 0 1-1.387-.277L3.353 8.832a1.5 1.5 0 0 1 0-1.664l1.815-2.723a1 1 0 0 1 1.387-.277zm2.89 0a1 1 0 0 1 1.387.277l1.815 2.723a1.5 1.5 0 0 1 0 1.664l-1.815 2.723a1 1 0 0 1-1.387.277l-.093-.07a1 1 0 0 1-.184-1.317L10.799 8 9.168 5.555a1 1 0 0 1 .277-1.387z', _))
        + V_ui_symbol(_icoIndexTabCodeblock_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.454 4.168a1 1 0 0 0-1.387.277L2.252 7.168a1.5 1.5 0 0 0 0 1.664l1.815 2.723a1 1 0 0 0 1.387.277l.093-.07a1 1 0 0 0 .184-1.317L4.101 8l1.63-2.444a1 1 0 0 0-.277-1.387zm4.89 0a1 1 0 0 0-.277 1.387l1.631 2.444-1.631 2.446a1 1 0 0 0 .184 1.317l.093.07a1 1 0 0 0 1.387-.277l1.815-2.723a1.5 1.5 0 0 0 0-1.664l-1.815-2.723a1 1 0 0 0-1.387-.277z', _))
        // 图标集：图标|导航中心分段控制|公式索引
        + V_ui_symbol(_icoIndexTabFormula_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM3.735 3l3.876.003a.741.741 0 0 1 .738.706.746.746 0 0 1-.653.79l-.085.004L5.225 4.5l2.041 2.043c.18.24.202.567.054.83l-.054.084L5.226 9.5h2.386a.74.74 0 0 1 .73.662l.004.087c0 .38-.279.7-.648.745L7.61 11H3.735a.732.732 0 0 1-.64-.382.764.764 0 0 1 .011-.756l.046-.069 2.604-2.791-2.604-2.795a.763.763 0 0 1-.093-.75.736.736 0 0 1 .595-.452L3.735 3zm8.948 3.062a.76.76 0 0 1 .145 1.05l-.986 1.338 1.009 1.32a.76.76 0 0 1-.133 1.043.724.724 0 0 1-1.025-.12l-.767-1.002-.75 1.015a.724.724 0 0 1-1.018.133.76.76 0 0 1-.155-1.035l.987-1.337-1.01-1.32a.76.76 0 0 1 .133-1.044.724.724 0 0 1 1.025.12l.767 1.003.75-1.016a.725.725 0 0 1 1.028-.148z', _))
        + V_ui_symbol(_icoIndexTabFormula_ + __checked_,
            V_ui_path('M0 0h16v16H0z', _none_)
            + V_ui_path('M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zM3.735 3l-.08.005a.736.736 0 0 0-.596.452.763.763 0 0 0 .093.75l2.604 2.795-2.604 2.791-.046.069a.764.764 0 0 0-.011.756c.13.236.375.382.64.382h3.876l.087-.006a.745.745 0 0 0 .648-.745l-.005-.087a.74.74 0 0 0-.73-.662H5.226l2.041-2.042.054-.084a.763.763 0 0 0-.054-.83l-2.04-2.043 2.385.002.085-.005a.746.746 0 0 0 .653-.789.741.741 0 0 0-.738-.706L3.735 3zm8.948 3.062a.725.725 0 0 0-1.028.148l-.75 1.016-.767-1.002a.724.724 0 0 0-1.025-.121.76.76 0 0 0-.133 1.044l1.01 1.32-.987 1.337a.76.76 0 0 0 .155 1.035.724.724 0 0 0 1.018-.133l.75-1.015.767 1.002a.724.724 0 0 0 1.025.12.76.76 0 0 0 .133-1.044L11.84 8.45l.987-1.338a.76.76 0 0 0-.145-1.05z', _))
        // 图标集：图标|导航中心分段控制|访问史
        // + V_ui_symbol(_icoTocTabHistory_,
        //     V_ui_path('M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1C4.142 1 1 4.142 1 8s3.142 7 7 7 7-3.142 7-7-3.142-7-7-7zm0 1.5a1 1 0 0 1 1 1v4.45l2.164 1.25a1 1 0 0 1-1 1.732l-2.598-1.5a1 1 0 0 1-.237-.19A1 1 0 0 1 7 8.5v-5a1 1 0 0 1 1-1z', _))
        // + V_ui_symbol(_icoTocTabHistory_ + __checked_,
        //     V_ui_path('M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 3.5a1 1 0 0 0-1 1v5c0 .294.127.56.33.742a.979.979 0 0 0 .236.19l2.598 1.5a1 1 0 0 0 1-1.732L9 8.95V4.5a1 1 0 0 0-.883-.993z', _))
        // 图标集：图标|搜索
        + V_ui_symbol(_icoSearch_,
            V_ui_path('M14.999 14.596a1.375 1.375 0 0 1-1.953 0L11.46 12.94a6.372 6.372 0 0 1-3.466 1.032c-3.559 0-6.444-2.904-6.444-6.486S4.435 1 7.994 1c3.56 0 6.445 2.904 6.445 6.486a6.47 6.47 0 0 1-1.026 3.488l1.586 1.656c.54.543.54 1.423 0 1.966zM7.993 2.32c-2.834 0-5.132 2.313-5.132 5.166s2.298 5.165 5.132 5.165c2.835 0 5.133-2.312 5.133-5.165s-2.298-5.166-5.133-5.166z', _))
        + V_ui_symbol(_icoMaskCloser_,
            V_ui_path('M13.98.176l.035.013c1.506.534 2.311 2.123 1.86 3.607L6.21 30l9.61 26.04c.546 1.475-.186 3.097-1.64 3.707l-.2.077c-1.502.532-3.154-.18-3.781-1.597l-.065-.16L.315 31.916a5.987 5.987 0 0 1 0-3.832l9.818-26.151C10.702.41 12.422-.375 13.979.176z', _))
        // 图标集：图标|插图导航的上一张
        + V_ui_symbol(_icoPrevFig_,
            V_ui_path('M11.03.091c.765.284 1.159 1.147.88 1.927L3.002 27l8.91 24.982a1.516 1.516 0 0 1-.75 1.87l-.13.057a1.462 1.462 0 0 1-1.834-.765l-.055-.134L.12 27.705C.112 27.685 0 27.435 0 27c0-.435.111-.684.12-.706L9.141.99A1.465 1.465 0 0 1 11.03.09z', _))
        // 图标集：图标|逐章导航的上一章'
        + V_ui_symbol(_icoPrevChapter_,
            V_ui_path('M7.364.293a1 1 0 0 1 0 1.414l-4.97 4.969 4.974 4.974a1 1 0 0 1-1.415 1.414L.296 7.407a.996.996 0 0 1-.291-.658.995.995 0 0 1 .288-.8L5.95.294a1 1 0 0 1 1.414 0z', _))
        // 图标集：图标|已收起的 目录节点
        + V_ui_symbol(_icoTocFolded_,
            V_ui_path('M11.614 8.72L7.37 12.961a1 1 0 0 1-1.414-1.414l3.542-3.543-3.542-3.543A1 1 0 1 1 7.37 3.048l4.243 4.243a.997.997 0 0 1 .293.707v.014a.997.997 0 0 1-.293.707z', _))
        // 图标集：图标|已收起的 表格行分组节点
        + V_ui_symbol(_icoFolded_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm-.336 3.757A1 1 0 1 0 6.25 5.172l2.835 2.835-2.835 2.836a1 1 0 1 0 1.414 1.414l3.535-3.536a.997.997 0 0 0 .293-.707V8a.997.997 0 0 0-.293-.707z', _))
        // 图标集：图标|关闭
        + V_ui_symbol(_icoClose_,
            V_ui_path('M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z"' + ' transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "', _))
        // 图标集：图标|清空输入
        + V_ui_symbol(_icoResetInput_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM5.737 4.606a.8.8 0 0 0-1.131 1.131L6.869 8l-2.263 2.263a.8.8 0 1 0 1.131 1.131L8 9.131l2.263 2.263a.8.8 0 1 0 1.131-1.131L9.131 8l2.263-2.263a.8.8 0 1 0-1.131-1.131L8 6.869z', _))
        // 图标集：图标|颜色模式（Light/Dark）
        + V_ui_symbol(_icoLightMode_,
            V_ui_path('M10 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414zm-11.314 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM10 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm9 4a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zM2 9a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h1zm15.071-6.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-12.728 0l.707.707A1 1 0 1 1 3.636 5.05l-.707-.707A1 1 0 0 1 4.343 2.93zM10 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z', _))
        // 图标集：图标|深色模式
        + V_ui_symbol(_icoDarkMode_,
            V_ui_path('M5.646 2.646A9.003 9.003 0 0 0 9 20a9.003 9.003 0 0 0 8.354-5.646A9 9 0 0 1 5.613 2.729zM15.5 3l-1.065 2.7a1.303 1.303 0 0 1-.734.735L11 7.5l2.7 1.065c.337.133.602.398.735.734L15.5 12l1.065-2.7c.133-.337.398-.602.734-.735L20 7.5l-2.7-1.065a1.303 1.303 0 0 1-.735-.734L15.5 3zm-4.829-3l-.547 1.389a1 1 0 0 1-.564.563L8.171 2.5l1.39.548a1 1 0 0 1 .563.563L10.67 5l.548-1.389a1 1 0 0 1 .563-.563l1.39-.548-1.39-.548a1 1 0 0 1-.563-.563L10.671 0z', _))
        // 图标集：图标|自动颜色模式
        + V_ui_symbol(_icoAutoMode_,
            V_ui_path('M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 2v4a4 4 0 0 0-.2 7.995L10 14v4a8 8 0 1 0 0-16zm0 4a4 4 0 0 1 .2 7.995L10 14z', _))
        // 图标集：图标|链接地图
        + V_ui_symbol(_icoLinkMap_,
            V_ui_path('M17.143 12.857c-.496 0-.956.139-1.362.362l-3.095-2.278c.103-.296.171-.61.171-.941 0-.1-.02-.194-.03-.292l2.86-1.716a2.13 2.13 0 0 0 1.456.58A2.143 2.143 0 1 0 15 6.428c0 .1.016.195.03.292l-2.71 1.625a2.852 2.852 0 0 0-1.606-1.102V5.613a2.855 2.855 0 0 0 2.143-2.756A2.86 2.86 0 0 0 10 0a2.86 2.86 0 0 0-2.857 2.857c0 1.327.914 2.437 2.143 2.756v1.631c-.697.18-1.3.617-1.689 1.223L4.951 6.88a2.143 2.143 0 1 0-2.094 1.692c.488-.001.96-.17 1.337-.48L7.156 9.87c-.002.045-.013.086-.013.131 0 .332.068.646.172.942l-3.06 2.296a2.816 2.816 0 0 0-1.398-.38A2.86 2.86 0 0 0 0 15.713a2.86 2.86 0 0 0 2.857 2.857 2.86 2.86 0 0 0 2.857-2.857c0-.54-.159-1.039-.42-1.47l2.82-2.115c.335.299.737.513 1.172.627v3.09a2.136 2.136 0 0 0-1.429 2.011 2.143 2.143 0 1 0 4.286 0 2.136 2.136 0 0 0-1.429-2.011v-3.09a2.837 2.837 0 0 0 1.174-.627l2.834 2.085c-.283.45-.435.97-.436 1.5a2.86 2.86 0 0 0 2.857 2.857A2.86 2.86 0 0 0 20 15.714a2.86 2.86 0 0 0-2.857-2.857zm-8.572-10a1.43 1.43 0 0 1 2.857 0A1.43 1.43 0 0 1 10 4.286a1.43 1.43 0 0 1-1.429-1.429zM2.857 17.143a1.43 1.43 0 0 1-1.428-1.429c0-.788.64-1.428 1.428-1.428.788 0 1.429.64 1.429 1.428a1.43 1.43 0 0 1-1.429 1.429zM10 11.429A1.43 1.43 0 0 1 8.571 10a1.43 1.43 0 0 1 2.857 0A1.43 1.43 0 0 1 10 11.429zm7.143 5.714a1.43 1.43 0 0 1-1.429-1.429 1.43 1.43 0 0 1 2.857 0 1.43 1.43 0 0 1-1.428 1.429z', _))
        // 图标集：图标|聚光灯
        + V_ui_symbol(_icoSpotlight_,
            V_ui_path('M7 0a7 7 0 0 1 6.992 6.67A7.002 7.002 0 0 1 11 20a7 7 0 0 1-6.992-6.67A7.002 7.002 0 0 1 7 0zm4 6a7 7 0 0 0-6.992 7.33 7 7 0 0 0 9.985-6.662A6.984 6.984 0 0 0 11 6.001z', _))
        // 图标集：图标|激光笔
        + V_ui_symbol(_icoLaserPointer_,
            V_ui_path('M5.574 5.078a3.5 3.5 0 0 1 4.913.603l6.772 8.668a3.5 3.5 0 1 1-5.516 4.31L4.971 9.991a3.5 3.5 0 0 1 .603-4.913zm.576.769a2.5 2.5 0 1 0 3.078 3.94 2.5 2.5 0 0 0-3.078-3.94zm6.562-3.138a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 1 1-1.231-1.576l.788-.616zm-10.5 8a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 0 1-1.231-1.576l.788-.616zm-1.177-4.68l1 .034a1 1 0 0 1-.07 1.999l-1-.035a1 1 0 0 1 .07-1.999zM8.838.021a1 1 0 0 1 .77 1.186l-.208.978a1 1 0 0 1-1.956-.416l.208-.978a1 1 0 0 1 1.186-.77zM2.724 1.409a1 1 0 0 1 1.403.172l.616.788a1 1 0 0 1-1.576 1.232l-.616-.788a1 1 0 0 1 .173-1.404z', _))
        // 图标集：图标|段落导航
        + V_ui_symbol(_icoParagraphNav_,
            V_ui_path('M3.698 17.714v-5.036A.68.68 0 0 0 3.02 12a.68.68 0 0 0-.678.678v5.047L1.155 16.54a.689.689 0 0 0-.96 0c-.26.26-.26.69 0 .96l2.294 2.294a.67.67 0 0 0 .474.204h.068a.65.65 0 0 0 .475-.204L5.799 17.5c.26-.26.26-.689 0-.96-.237-.271-.666-.271-.926 0l-1.175 1.175zm0-15.432V7.32a.68.68 0 0 1-.678.678.68.68 0 0 1-.678-.678l.03-5.082-1.217 1.22c-.26.26-.689.26-.96 0a.689.689 0 0 1 0-.96L2.489.203A.67.67 0 0 1 2.963 0h.068c.17 0 .35.068.475.203l2.293 2.294c.26.26.26.69 0 .96-.237.272-.666.272-.926 0L3.698 2.283zM8 14h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3h8a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 7h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-6h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3h11a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2z', _))
        // 图标集：图标|字体风格
        + V_ui_symbol(_icoFontStyle_,
            V_ui_path('M2.26 17.998l.59-1.85h3.015l.59 1.85h1.843a.5.5 0 0 0 .465-.683l-2.648-6.74a1 1 0 0 0-.931-.635h-1.57a1 1 0 0 0-.93.634l-2.65 6.74a.5.5 0 0 0 .466.684h1.76zm3.14-3.342H3.315l.22-.682c.26-.8.534-1.741.78-2.585h.055c.275.822.535 1.785.81 2.585l.218.682zm6.745 3.284c.893 0 1.644-.364 2.31-.892h.071l.17.716h2.055v-4.058c0-2.236-1.176-3.266-3.26-3.266-1.26 0-2.408.377-3.471.942l.879 1.47c.807-.402 1.473-.628 2.11-.628.823 0 1.163.34 1.22.917-3.146.302-4.478 1.118-4.478 2.626 0 1.193.907 2.173 2.394 2.173zm.865-1.734c-.524 0-.865-.2-.865-.615 0-.503.51-.917 2.083-1.093v1.143c-.368.352-.708.565-1.218.565zM13.802 0l3.473 7.75.724.078V8.4h-4.33v-.573l1.066-.124-.727-1.864h-3.201l-.8 1.853.712.146V8.4H8.1V8.16c-.325.256-.749.37-1.314.37-.943 0-1.472-.428-1.686-1.129-.729.727-1.272 1.13-2.414 1.13-1.23 0-2.086-.676-2.086-1.766 0-1.181.743-1.818 3.043-2.428.4-.104.9-.22 1.4-.337v-.792c0-1.35-.343-1.753-1.429-1.753-.2 0-.386.013-.6.052l-.1.922c-.043.883-.528 1.233-1.071 1.233-.515 0-.872-.233-.986-.662C.97 1.78 2.213 1 4.427 1c2.029 0 2.843.792 2.843 2.674v3.492c0 .494.172.662.443.662.214 0 .372-.103.643-.493l.243.182a2.323 2.323 0 0 1-.152.262l.49-.086L12.31 0h1.492zm-8.76 4.35a7.258 7.258 0 0 0-.786.22c-1 .376-1.529.987-1.529 1.934 0 .78.4 1.143 1.072 1.143.386 0 .714-.17 1.243-.598zm7.43-2.615l-1.507 3.533h2.87l-1.363-3.533z', _))
        // 图标集：图标|文库
        + V_ui_symbol(_icoDocLib_,
            V_ui_path('M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm.001 7h-14a2 2 0 0 0-2 2h6a3 3 0 0 0 6 0h6l-.005-.15A2 2 0 0 0 17 7zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 4zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 1z', _))
        // 图标集：图标|文库-新标签中打开
        + V_ui_symbol(_icoDocLibExt_,
            V_ui_path('M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm.002 2H11a1 1 0 0 0 0 2h3.585l-6.292 6.293a1 1 0 1 0 1.414 1.414L16 5.414V9a1 1 0 1 0 2 0L18 3c0-.017 0-.033-.003-.059v-.012a.999.999 0 0 0-.487-.789l-.023-.013-.047-.025a.995.995 0 0 0-.023-.011l-.014-.006-.025-.011a.993.993 0 0 0-.073-.027l-.014-.004-.017-.005a.993.993 0 0 0-.079-.019l-.02-.003-.017-.004A1.007 1.007 0 0 0 17.002 2h.02-.02z', _))
        // 图标集：图标|详情折叠、details、summary 打开详情
        + V_ui_symbol(_icoDetailsOpen_,
            V_ui_path('M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm1 3H8v5H3v2h5v5h2v-5h5V8h-5V3z', _))
        // 图标集：图标|打印
        + V_ui_symbol(_icoPrint_,
            V_ui_path('M14 0a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2a2 2 0 0 1 2-2h8zm2 11H4v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5zm-2 3v1H6v-1h8zm0-2v1H6v-1h8zm3.5-6h-1a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-3.372 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM14 1H6a1 1 0 0 0-1 1v2h10V2a1 1 0 0 0-.883-.993L14 1z', _))
        // 图标集：图标|检查
        + V_ui_symbol(_icoCheck_,
            V_ui_path('M6.323.102a19.026 19.026 0 0 0 5.27 2.566c.242.074.407.3.406.556V5.31a10.05 10.05 0 0 1-1.444 5.306L9.05 9.134A3.8 3.8 0 0 0 5.98 3.1a3.79 3.79 0 0 0-2.684 1.115 3.794 3.794 0 0 0-.18 5.137 3.802 3.802 0 0 0 5.109.607l1.65 1.625c-.963 1.183-2.212 2.055-3.668 2.374a.58.58 0 0 1-.208.042.662.662 0 0 1-.203-.036c-3.541-.78-5.858-4.828-5.794-8.66V3.225c0-.256.164-.48.405-.555A19.024 19.024 0 0 0 5.674.102a.566.566 0 0 1 .65 0zM6.02 4.447c.66 0 1.279.257 1.747.72a2.469 2.469 0 0 1-1.747 4.217A2.468 2.468 0 0 1 3.547 6.91 2.457 2.457 0 0 1 6.02 4.447z', _))
        // 图标集：图标|内容助手-插图浏览器中打开
        + V_ui_symbol(_icoOpenInFigureNav_,
            V_ui_path('M3 0h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 8.507a1 1 0 0 0-1 1V12.5A1.5 1.5 0 0 0 3.5 14H7a1 1 0 0 0 0-2H4V9.506a1 1 0 0 0-.883-.993L3 8.507zm12-.94a1 1 0 0 0 1-1V3.503a1.5 1.5 0 0 0-1.5-1.5h-3.48a1 1 0 0 0 0 2H14v2.562a1 1 0 0 0 .884.994l.116.006z'))
        // 图标集：图标|内容助手-表格阅读模式（十字光标）
        + V_ui_symbol(_icoTableX_,
            V_ui_path('M15.6 0A2.4 2.4 0 0 1 18 2.4v11.2a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 13.6V2.4A2.4 2.4 0 0 1 2.4 0h13.2zM12 1H6v4.5A1.5 1.5 0 0 1 4.5 7H1v5h3.5A1.5 1.5 0 0 1 6 13.5V15h6v-1.5a1.5 1.5 0 0 1 1.5-1.5H17V7h-3.5A1.5 1.5 0 0 1 12 5.5V1zm-1.5 6A1.5 1.5 0 0 1 12 8.5v2a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 6 10.5v-2A1.5 1.5 0 0 1 7.5 7h3zm-.167 1H7.667A.667.667 0 0 0 7 8.667v1.666c0 .369.298.667.667.667h2.666a.667.667 0 0 0 .667-.667V8.667A.667.667 0 0 0 10.333 8z', _))
        // 图标集：图标|内容助手-表格、代码的换行、不换行
        + V_ui_symbol(_icoWrapUnwrap_,
            V_ui_path('M12 0a2 2 0 0 1 2 2h5.5a.5.5 0 1 1 0 1H14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h10zM2.5 3a.5.5 0 0 1 0-1H13a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1H2.5zM17 5.1c.961.52 1.628.953 2 1.3.372.347.705.847 1 1.5l-2.001-.001L18 10.5a2.9 2.9 0 0 1-2.9 2.9h-.801l.001 2.1c-.673-.383-1.173-.75-1.5-1.1-.327-.35-.76-.984-1.3-1.9.52-.961.953-1.628 1.3-2 .347-.372.847-.705 1.5-1l-.001 2.1h.801a1.1 1.1 0 0 0 1.1-1.1l-.001-2.6H14c.383-.673.75-1.173 1.1-1.5.35-.327.984-.76 1.9-1.3zM8 7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6zm-2.5 6h-3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1zm2-2h-5a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1zm0-2h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z', _))
        // 图标集：图标|内容助手-画中画
        + V_ui_symbol(_icoPicInPic_,
            V_ui_path('M16 9a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7zM1 8v5a1 1 0 0 0 1 1h3v1H2a2 2 0 0 1-2-2V8h1zm14-8a2 2 0 0 1 2 2v5h-1V2a1 1 0 0 0-.883-.993L15 1H8V0h7zM.471.508a.725.725 0 0 1 1.025 0l3.48 3.48V1.642c0-.365.295-.66.66-.661h.014a.689.689 0 0 1 .675.69L6.32 5.693a.662.662 0 0 1-.2.473.657.657 0 0 1-.466.193l-4.024.004a.689.689 0 0 1-.689-.675v-.013c0-.366.296-.662.661-.662h2.35L.47 1.534a.725.725 0 0 1 0-1.026z', _))
        // 图标集：图标|画中画的放大模式
        + V_ui_symbol(_icoZoomIn_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4 7.503l-.117.007a1 1 0 0 0-.883.993v2.492H8.4a1 1 0 0 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V8.504a1 1 0 0 0-1-1zM7.58 3H4.5A1.5 1.5 0 0 0 3 4.5v3.062a1 1 0 0 0 1 1l.117-.007A1 1 0 0 0 5 7.562V5h2.58a1 1 0 1 0 0-2z', _))
        // 图标集：图标|内容助手-画中画的缩小模式
        + V_ui_symbol(_icoZoomOut_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4.58 8H9.5A1.5 1.5 0 0 0 8 9.5v3.062a1 1 0 0 0 1 1l.117-.007a1 1 0 0 0 .883-.993V10h2.58a1 1 0 1 0 0-2zM7 2.503l-.117.007A1 1 0 0 0 6 3.503v2.492H3.4a1 1 0 1 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V3.504a1 1 0 0 0-1-1z" fill-rule="evenodd', _))
        // 图标集：图标|复制
        + V_ui_symbol(_icoCopy_,
            V_ui_path('M16 0a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2h8zm-5 3H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-4.5 9a.5.5 0 1 1 0 1h-3a.5.5 0 1 1 0-1h3zm3-3a.5.5 0 1 1 0 1h-6a.5.5 0 1 1 0-1h6zm0-3a.5.5 0 1 1 0 1h-6a.5.5 0 1 1 0-1h6z', _))
        // 图标集：图标|复制 as Markdown
        + V_ui_symbol(_icoCopyAsMd_,
            V_ui_path('M16 0a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2h8zm-5 3H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM4.75 6L6.5 8.206 8.25 6H10v6H8.25V8.559L6.5 10.765 4.75 8.559V12H3V6h1.75zM15.3 5h-1.6v3.5H12l2.5 2.5L17 8.5h-1.7V5z', _))
        // 图标集：图标|加载中
        + V_ui_symbol(_icoLoading_,
            tagRectX + '7' + widthHeightRx
            + tagRectTransformRotate + '45 12.243 3.757)" x="11.243" y="1.757' + widthHeightRx
            + tagRectTransformRotate + '90 14 8)" x="13" y="6' + widthHeightRx
            + tagRectTransformRotate + '135 12.243 12.243)" x="11.243" y="10.243' + widthHeightRx
            + tagRectTransformRotate + '180 8 14)" x="7" y="12' + widthHeightRx
            + tagRectTransformRotate + '-135 3.757 12.243)" x="2.757" y="10.243' + widthHeightRx
            + tagRectTransformRotate + '-90 2 8)" x="1" y="6' + widthHeightRx
            + tagRectTransformRotate + '-45 3.757 3.757)" x="2.757" y="1.757' + widthHeightRx)
        // 图标集：图标|播放
        + V_ui_symbol(_icoPlay_,
            V_ui_path('M14.133 9.605l-7.86 6.028c-.93.633-2.223.427-2.887-.459A1.909 1.909 0 0 1 3 14.028V1.972C3 .882 3.927 0 5.07 0c.432 0 .852.128 1.203.367l7.86 6.028c.93.633 1.146 1.865.481 2.751a2.024 2.024 0 0 1-.481.459z', _)
            + V_ui_path('M0 0h16v16H0z', _none_))
        // 图标集：图标|暂停
        + V_ui_symbol(_icoPause_,
            V_ui_path('M3 2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 0h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', _)
            + V_ui_path('M0 0h16v16H0z', _none_))
        // 图标集：图标|停止
        + V_ui_symbol(_icoStop_,
            tagRectX + '2" y="2" width="12" height="12" rx="2"/>'
            + V_ui_path('M0 0h16v16H0z', _none_))
        // 图标集：图标|无法播放
        + V_ui_symbol(_icoForbidden_,
            V_ui_path('M3.11 4.523a6.001 6.001 0 0 0 8.368 8.367L3.11 4.523zM4.522 3.11l8.368 8.367A6 6 0 0 0 4.522 3.11zM8 16A8.001 8.001 0 1 1 8.002.002 8.001 8.001 0 0 1 8 16z', _)
            + V_ui_path('M0 0h16v16H0z', _none_))
        // 图标集：图标|复选框（未选择）
        + V_ui_symbol(_icoChkbox__ + _no_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm-.5 2h-5c-.69 0-1.315.28-1.768.732A2.492 2.492 0 0 0 2 4.5v5c0 .69.28 1.315.732 1.768A2.492 2.492 0 0 0 4.5 12h5c.69 0 1.315-.28 1.768-.732A2.492 2.492 0 0 0 12 9.5v-5c0-.69-.28-1.315-.732-1.768A2.492 2.492 0 0 0 9.5 2z" opacity=".5', _))
        // 图标集：图标|复选框（已选择）
        + V_ui_symbol(_icoChkbox__ + _yes_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm.435 3.36a1 1 0 0 0-1.393.245L5.703 8.372 4.421 7.09a1 1 0 1 0-1.414 1.414l2.121 2.121a1 1 0 0 0 1.225.15l.01-.007.01-.005a.997.997 0 0 0 .292-.277l4.015-5.734a1 1 0 0 0-.245-1.393z', _))
        // 图标集：图标|复选框（不确定选择）
        + V_ui_symbol(_icoChkbox__ + _un_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 6H4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2z" opacity=".5', _))
        // 图标集：图标|有新版本
        + V_ui_symbol(_icoNewVersion_,
            V_ui_path('M10 20C4.5 20 0 15.5 0 10S4.5 0 10 0s10 4.5 10 10-4.5 10-10 10zm.885-13.548l2.211 2.21a.856.856 0 0 0 1.239 0 .854.854 0 0 0 0-1.237L11.238 4.33c-.707-.707-1.769-.707-2.476 0L5.665 7.425a.854.854 0 0 0 0 1.237.856.856 0 0 0 1.239 0l2.211-2.21v8.664c0 .53.354.884.885.884.53 0 .885-.354.885-.884V6.452z', _))
        // 图标集：图标|链接检查结果异常
        + V_ui_symbol(_icoLinkError_,
            V_ui_path('M19.59 14.956l-7.846-13.7c-.96-1.675-2.528-1.675-3.488 0L.41 14.956C-.55 16.632.235 18 2.153 18h15.695c1.917 0 2.701-1.368 1.743-3.044zM8.923 5.143c.282-.307.64-.46 1.078-.46.438 0 .796.151 1.078.454.28.304.42.683.42 1.14 0 .392-.585 3.28-.78 5.38h-1.41c-.171-2.1-.806-4.988-.806-5.38 0-.45.14-.828.42-1.134zm2.136 9.989c-.296.29-.65.436-1.058.436-.408 0-.761-.145-1.058-.436a1.424 1.424 0 0 1-.442-1.056c0-.411.147-.767.442-1.065.297-.298.65-.447 1.058-.447.409 0 .762.149 1.058.447.296.298.443.654.443 1.065 0 .413-.147.765-.443 1.056z', _))
        // 图标集：GitHub Style Alert | Note
        + V_ui_symbol(_icoAlertNote_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm.25 7h-1a.75.75 0 0 0 0 1.5h.25v2h-.25a.75.75 0 1 0 0 1.5h2a.75.75 0 1 0 0-1.5H9V7.75A.75.75 0 0 0 8.25 7zM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z', _))
        // 图标集：GitHub Style Alert | Tip
        + V_ui_symbol(_icoAlertTip_,
            V_ui_path('M5.5 0C8.637 0 11 2.31 11 5.25c0 1.516-.701 2.5-1.328 3.259l-.268.319c-.207.245-.383.453-.541.681-.208.3-.33.595-.37.877a.76.76 0 0 1-.773.616L3.2 11a.748.748 0 0 1-.692-.614c-.04-.282-.163-.577-.37-.877a8.456 8.456 0 0 0-.354-.46l-.456-.54-.237-.296C.537 7.496 0 6.577 0 5.25 0 2.31 2.363 0 5.5 0zM3.25 12h4.5a.75.75 0 1 1 0 1.5h-4.5a.75.75 0 1 1 0-1.5zm.25 3.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75z', _))
        // 图标集：GitHub Style Alert | Important
        + V_ui_symbol(_icoAlertImportant_,
            V_ui_path('M14.25 0C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25v-9.5C0 .784.784 0 1.75 0h12.5zM8 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.124C7 7.58 7.448 8 8 8s1-.42 1-.938V2.938C9 2.42 8.552 2 8 2z', _))
        // 图标集：GitHub Style Alert | Warning
        + V_ui_symbol(_icoAlertWarning_,
            V_ui_path('M9.576.933l6.213 11.471c.296.547.28 1.207-.043 1.739a1.792 1.792 0 0 1-1.533.857H1.787c-.628 0-1.21-.326-1.533-.857a1.744 1.744 0 0 1-.043-1.739L6.424.934c.673-1.245 2.479-1.245 3.152 0zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z', _))
        // 图标集：GitHub Style Alert | Caution
        + V_ui_symbol(_icoAlertCaution_,
            V_ui_path('M11 0c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6c0 .199-.08.39-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53L4.47.22C4.61.08 4.801 0 5 0h6zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z', _))
    + '</svg>';
    return ui;
}

/**
 * 加载顶栏 UI 资源
 */
function VLOOKui_loadTopbar() {
    // ==================================================
    // 页面工具栏
    let ui = V_ui_nav(_, _vToolbar_ +___+ _vFocusSearch_,
            // 导航中心
            V_ui_div(_, _vBtn_ +___+ _navCenter_, V_ui_svgIcon(_icoNavCenter_, 20, 18, _light_))
            // 文库
            + V_ui_div(_, _vBtn_ +___+ _docLib_, V_ui_svgIcon(_icoDocLib_, 20, 18, _light_))
            + V_ui_div(_, _vBtnGroup_ + " prs",
                // 段落导航
                V_ui_divExt(_, _vBtn_ +___+ _paragraphNav_, V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoParagraphNav_, 20, 20, _light_))
                // 聚光灯
                + V_ui_divExt(_, _vBtn_ +___+ _spotlight_, V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoSpotlight_, 18, 20, _light_))
                // 激光笔
                + V_ui_divExt(_, _vBtn_ +___+ _laserPointer_, V_attr(_dataBtnGroup_, "prs"),
                    V_ui_svgIcon(_icoLaserPointer_, 18, 20, _light_))
            )
            // 分隔符
            + V_ui_div(_, _vToolbar_ + __spliter_)
        );

    // ==================================================
    // 逐章导航栏
    let classSvgChpNav = "v-svg-chp-nav";
    ui += V_ui_nav(_, _vChapterNav_ +___+ _vFocusSearch_,
            // 上一章
            V_ui_div(_, _vChapterNav_ + __prev,
                V_ui_svgIcon(_icoPrevChapter_, 10, 15, _light_, classSvgChpNav +___+ _left_)
                + V_ui_div(_, _vChapterNav_ + __prev + __text_)
            )
            // 文档标题
            + V_ui_div(_, _vChapterNav_ + __docTitle_)
            // 当前章节
            + V_ui_div(_, _vChapterNav_ + __current_)
            // 下一章
            + V_ui_div(_, _vChapterNav_ + __next_,
                V_ui_div(_, _vChapterNav_ + __next_ + __text_, "next")
                + V_ui_svgIcon(_icoPrevChapter_, 10, 15, _light_, classSvgChpNav +___+ _right_)
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
    let classTocFilterResult = _vTocFilterResult_ +___,
        ui = V_ui_divExt(_, _vNavCenter_ +___+ _vFloatCard_, V_attr(_dataTitle_, V_lang_text6()) + '"',
            // --- 导航中心头部 ---
            V_ui_div(_, _vNavCenter_ + __header_,
                // 关键字搜索
                V_ui_div(_, _vSearchByKeyword_)
                // 分段控制器组件
                + V_ui_nav(_, _vSegment_ + " toc"))
                // 访问历史标题
                // + V_ui_div(_, _vToc__ + _history_ + __title_, V_lang_text18()))
                // --- 导航中心内容区 ---
                + V_ui_div(_, _vNavCenter_ + __body_,
                    V_ui_divExt(_, _vTocBody_, V_attr(_dataTocEmpty_, "( " + V_lang_text35() + V_lang_text66() + " )"))
                    + V_ui_nav(_, classTocFilterResult + _toc_)
                    // + V_ui_nav(_, classTocFilterResult + _catalog_)
                    + V_ui_nav(_, classTocFilterResult + _figure_)
                    + V_ui_nav(_, classTocFilterResult + _table_)
                    + V_ui_nav(_, classTocFilterResult + _codeblock_)
                    + V_ui_nav(_, classTocFilterResult + _formula_)
                    + V_ui_nav(_, classTocFilterResult + _media_)
                    // + V_ui_nav(_, _vToc__ + _history_ + __result_)
                )
            + V_ui_div(_, _vNavCenter_ + __footer_)
        );

    // --------------------------------------------------
    // 导航中心收起/展开引导把手
    ui += V_ui_div(_, _vTocHandle_);

    return ui;
 }

 /**
 * 加载继续上次的阅读 UI 资源
 */
function VLOOKui_loadResumeReading() {
    return V_ui_div(_, _vResumeReading_ +___+ _vFloatCard_,
        V_ui_span(_, _, V_lang_text(78, [
                "继续上次的阅读",
                "Resume Reading"
            ])) + V_ui_svgIcon(_icoTocFolded_, 16, 16, _theme_));
 }

/**
 * 加载共用的 UI 资源
 */
function VLOOKui_loadCommon() {
    // --------------------------------------------------
    // 聚光灯
    let ui = V_ui_div(_, _vSpotlight_, V_ui_div(_, _));

    // --------------------------------------------------
    // 字体风格选择器
    let //classFontThemeOpt = _vFontThemeOpt_,
        previewPath = _vlookPagesHost_CloudFlare_ + "/pic/";
        // previewPath = _httpsPrefix_ + _vlook__ + "doc.pages.dev/pic/";
    ui += V_ui_aside(_, _vFontStyle_, V_attr(_dataTitle_, V_lang_text41()),
            V_ui_div(_, _vFontStyleRestore_, "↺ " + V_lang_text(85, ["恢复字体样式", "Restore " + _font_ + " " + _style_]))
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _local_, "默认 Default", previewPath + "fs-local.png", previewPath + "fs-local@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _local_ +___+ _done_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _Ready_)
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _book_, "书香里 Book", previewPath + "fs-book.png", previewPath + "fs-book@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _book_ +___+ _done_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _Ready_)
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _albb_, "活力派 Vibrant", previewPath + "fs-albb.png", previewPath + "fs-albb@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _albb_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _notLoaded_)
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _gov_, "公文风 Gov", previewPath + "fs-gov.png", previewPath + "fs-gov@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _gov_ +___+ _done_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _Ready_)
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _serif_, "文艺范 Artsy", previewPath + "fs-serif.png", previewPath + "fs-serif@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _serif_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _notLoaded_)
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_span(_vFontStyleOpt_, _,
                V_ui_img(_vFontStyleOpt_ + "-" + _sans_, "小清新 Fresh", previewPath + "fs-sans.png", previewPath + "fs-sans@2x.png 2x")
                + V_ui_div(_, _vFontInfo__ + _sans_,
                    // V_ui_div(_, _vFontPackage_, _Font_)
                    // V_ui_div(_fontsetStatus_, _, _notLoaded_)
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_div(_, _vFontStyleDownload_, _)
        );

    // --------------------------------------------------
    // 正文区左下角的字体加载进度
    ui += V_ui_div(_, _vFontStyleCurrent_ +___+ _vFloatCard_ + "2", V_lang_text41());

    // --------------------------------------------------
    // 插图导航面板
    ui += V_ui_aside(_, _vFigNav_ +___+ _vBackdropBlurs_, _,
            V_ui_div(_, _vFigContent_)
            + V_ui_div(_, _vFigNav_ + __title_)
            + V_ui_div(_, _vFigNav_ + "-btns prev", V_ui_svgIcon(_icoPrevFig_, 12, 54, _light_))
            + V_ui_div(_, _vFigNav_ + "-btns next", V_ui_svgIcon(_icoPrevFig_, 12, 54, _light_))
            + V_ui_div(_, _vBtn_ + "-close-figure-nav", V_ui_svgIcon(_icoClose_, 16, 16, _light_))
        );

    // --------------------------------------------------
    // 脚注弹层
    ui += V_ui_aside(_, _vFontnotePn_, V_attr(_dataTitle_, V_lang_text(84, ["脚注", "Footnote"])),
            V_ui_div(_, _vFontnotePn_ + "-" + _content_)
            + V_ui_div(_, _vFontnotePn_ + __header_)
            + V_ui_div(_, _vFontnotePn_ + __footer_, V_ui_a(_, _, V_lang_text22() + " ❯❯"))
            + V_ui_a(_vkFooterArea_, _, V_lang_text22())
        );

    // --------------------------------------------------
    // 复制内容的按钮
    let classBtnAssistor = _vBtn_ +___+ _assistor_ +___;
    ui += V_ui_div(_, _vContentAssistor_ +___+ _vFloatCard_,
            V_ui_div(_, classBtnAssistor + _copy_, V_ui_svgIcon(_icoCopy_, 16, 16, _light_))
            + V_ui_div(_, classBtnAssistor + _openInFigureNav_, V_ui_svgIcon(_icoOpenInFigureNav_, 18, 16, _light_))
            + V_ui_div(_, classBtnAssistor + _tableCross_, V_ui_svgIcon(_icoTableX_, 18, 16, _light_))
            + V_ui_div(_, classBtnAssistor + _wrap_, V_ui_svgIcon(_icoWrapUnwrap_, 20, 16, _light_))
            + V_ui_div(_, classBtnAssistor + _picInPic_, V_ui_svgIcon(_icoPicInPic_, 18, 16, _light_))
        );

    // --------------------------------------------------
    // 画中画容器
    let classPinBtn = _vPipBtn_ +___+ _zoomOut_ +___+ _vFloatCard_ +___;
    ui += V_ui_aside(_, _vPicInPic_, _,
            V_ui_div(_, classPinBtn + _zoom_, V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_))
            + V_ui_div(_, classPinBtn + _close_, V_ui_svgIcon(_icoResetInput_, 16, 16, _theme_))
            + V_ui_div(_, _vContent_)
        );

    // --------------------------------------------------
    // 提示信息
    ui += V_ui_div(_, _vToolTips_)
        + V_ui_div(_, _vInfoTips_ +___+ _vFloatCard_);

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += V_ui_div(_, _vMoreDocContent_ + _before_)
        + V_ui_div(_, _vMoreDocContent_ + _after_);

    // --------------------------------------------------
    // 表格阅读模式（十字光标）
    let classTableCross = _vTblX_.xD() +___;
    ui += V_ui_div(_, classTableCross + _left_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _left_ + "-down", _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + "-down", _nbsp_);

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += V_ui_aside(_, _vLinkInfoList_ +___+ _vFloatCard_, _,
            V_ui_div(_, _vLinkInfoList_ + __header_)
            + V_ui_div(_, _vLinkInfoList_ + __body_,
                V_ui_nav(_, _vLinkInfoList_ + __items_))
            + V_ui_div(_, _vLinkInfoList_ + __footer_)
        )

    // --------------------------------------------------
    // 适配宽度
    ui += V_ui_div(_, _vFitWidth_, V_ui_svgIcon(_icoMaskCloser_, 16, 60, _alpha_));

    // --------------------------------------------------
    // 状态栏
    ui += V_ui_nav(_, _vStatusBar_ +___+ _vFloatCard_ + "2 " + _vFocusSearch_,
            V_ui_div(_, "v-" + _handle_, V_ui_svgIcon(_icoTocFolded_, 16, 16, _theme_))
            + V_ui_div(_, _vDocInfo_, "- - / - -")
            + V_ui_div(_, _vNewVersion_, V_ui_svgIcon(_icoNewVersion_, 20, 20, _theme_))
            + V_ui_div(_, _vLinkChkResult_, V_ui_svgIcon(_icoLinkError_, 20, 18, _theme_))
            + V_ui_div(_, _vLinkMap_, V_ui_svgIcon(_icoLinkMap_, 20, 20, _theme_))
            + V_ui_div(_, _vPrint_, V_ui_svgIcon(_icoPrint_, 20, 18, _theme_))
            + V_ui_div(_, _vStsFontStyle_, V_ui_svgIcon(_icoFontStyle_, 18, 18, _theme_))
            + V_ui_div(_, _vColorScheme_, V_ui_svgIcon(_icoDarkMode_, 20, 20, _theme_))
        );

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += V_ui_iframe(_, _vlookStatGitHub_);
    // 针对 debug 模式时不上报到这个渠道
    if (!V_devMode)
        ui += V_ui_iframe(_, _vlookStatCloudFlare_);

    // --------------------------------------------------
    // 检查新版本
    ui += V_ui_iframe(_vlookChkUpdateCloudFlare_, _);
    ui += V_ui_iframe(_vlookChkUpdateGitHub_, _);

    // --------------------------------------------------
    // 文库显示区
    ui += V_ui_aside(_, _vDocLib_ +___+ _vFloatCard_, V_attr(_dataTitle_, V_lang_text7()),
        V_ui_iframe(_, _vlookDocLib_)
    );
    return ui;
}

// ==================== 加载与初始化 VLOOK ==================== //

/**
 * 文档加载完成后执行主流程
 */
$(() => { // 等价于 $(document).ready()

    // 读取动画持续时长配置
    gTransDuration = JS_parseInt(V_util_getVarVal("--v-trans-dur"));

    // ----------------------------------------
    // 初始化启动参数
    V_query_init();

    // 判断文档类型
    if (V_util_getParamVal("v" + _type_) === _mini_) {
        V_pageMode = _mini_;
    }

    // ----------------------------------------
    // 初始化语言
    V_lang_init();

    // ----------------------------------------
    INFO("- Ready");
    gTimes = iStopwatch.ed(_4space_);
    // 打印环境信息
    env.print();

    iStopwatch.st();
    INFO("=== Load VLOOK™ ===");

    // ----------------------------------------
    // 灰度模式 Gray Mode
    GrayMode_init();

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 动效初始化
    iStopwatch.st("* Effect");
    let effect = V_util_getParamVal(_effect_);
    V_ui_effect = (effect == gNull) ? 2 : JS_parseInt(effect);
    V_ui_effect = V_util_isMobile() ? 0 : V_ui_effect;
    LOG("    └ Level [ " + V_ui_effect + " ]");
    V_ui_initEffectLevel();
    iStopwatch.ed(_cost_);

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.st("* Welcome Page Init");
    let wsMode = V_util_getParamVal("ws");
    wsMode = (wsMode == gNull) ? _auto_ : wsMode;
    LOG("    └ mode: " + wsMode);
    WelcomePage_init(wsMode);

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (!V_checkSpec()) {
        V_byClass(_vWelcomePage_).hide();
        V_byClass(_vToolbar_).hide();
        V_byClass(_vBtn_).hide();
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
    gStyle = gDocument.styleSheets[0];

    // ----------------------------------------
    // 延后加载 VLOOK 插件，避免欢迎页的 UI 刷新阻塞
    // 独立线程进行处理
    setTimeout(loadVLOOKplugin, 100);
});

/**
 * 字体加载完成后执行的主流程
 */
gDocument.fonts.ready.then(() => {
    // 字体加载完成后的逻辑
    LOG("!!! ALL FONT READY !!!");
});

/**
 * 加载 VLOOK UI 资源
 */
function loadVLOOKui() {
    V_byClass("v-vlook-inside").af(
        VLOOKui_loadWelcomePage()
        + VLOOKui_checkHash()
        + VLOOKui_loadIconSet()
        + VLOOKui_loadTopbar()
        + VLOOKui_loadNavCenter()
        + VLOOKui_loadResumeReading()
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
        ALERT(V_lang_text(79, [
            "为获得最佳兼容性，建议使用 Chrome/Firefox/Edge 浏览器",
            "For best compatibility, it is recommended to use Chrome/Firefox/Edge browser"
        ]));
    }

    iStopwatch.ed(_4space_);

    // ========================================
    // 初始化 VLOOK 核心模块
    V_initKernel();

    // ----------------------------------------
    // 修改主题默认的圆角风格
    let newRadius = V_util_getParamVal(_radius_);
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
    __fork("Quote Unite Columns Height", () => {
        ExtQuote_uniteColumnsHeight();
    }, 1000);

    // ----------------------------------------
    // 段落导航初始化
    __fork("Paragraph Nav", () => {
        ParagraphNav.init();
    }, 3000);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.st("* Write Ready");
    JQ_addClass(VOM_doc(), "v-load-" + _done_ +___+ _vFocusSearch_ +___+ V_pageMode);
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化外部链接
    // __fork("External Link", () => {
        V_doc_link_adjustExternal();
    // }, 100);

    // ----------------------------------------
    // 初始化全局热键
    __fork("Hotkey", () => {
        V_ui_initHotkey();
    }, 3000);

    // ----------------------------------------
    // 初始化须在页面 body 显示后才能执行的部分
    // __fork("Restyle", () => {
        V_initRestyle();
    // }, 200);

    // ----------------------------------------
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    // __fork("Color Scheme", () => {
        ColorScheme_init();
        INFO("    System [ " + ColorScheme_systemScheme + " ]");
        ColorScheme_scheme = V_util_getVarVal(_varColorScheme_).x();
        // 通过调校参数指定了颜色方案
        let colorScheme = V_util_getParamVal("cs");
        if (colorScheme === _light_ || colorScheme === _dark_) {
            INFO("    Force use [ " + colorScheme + " ]");
            ColorScheme_scheme = colorScheme;
            StsColorScheme_updateIcons();
            ColorScheme_refresh(gTrue);
        }
        // 若没有通过调校参数指定
        else {
            if (colorScheme == gNull)
                colorScheme = V_data_read(_colorScheme_, gTrue);
            // 通过同域配置指定
            if (colorScheme != gNull && (colorScheme === _light_ || colorScheme === _dark_)) {
                INFO("    From config [ " + colorScheme + " ]");
                ColorScheme_scheme = colorScheme;
                StsColorScheme_updateIcons();
                ColorScheme_refresh();
            }
            // 针对 auto 模式，自动适配
            else {
                INFO("    Auto use [ " + colorScheme + " ]");
                StsColorScheme_updateIcons();
                ColorScheme_refresh();
            }
        }
    // }, 300);

    // ----------------------------------------
    // 初始化内容助手
    // 须隐藏文档原始内容前执行，避免部分样式失效
    __fork("Content Assistor", () => {
        ContentAssistor_init();
        PicInPic_init();

        // 设置表格阅读模式的开关状态（不指定则默认关闭）
        if (V_util_getParamVal("tr") === _on_)
            TableCross_toggle();
    }, 2000);

    // ----------------------------------------
    // 针对 URL 带锚点的处理
    __fork("Redirect to Hash", () => {
        let redirect = V_util_redirectTo();
        if (VOM_cover() === gUndefined && !redirect) {
            iNavCenter.toc.currentHeaderIndex = 0;
            V_ui_adjustAll();
            ExtQuote_uniteColumnsHeight();
        }
    }, 450);

    // ----------------------------------------
    // 字数统计
    __fork("Words " + _count_, () => {
        DocInfo_countWord();
    }, 500);

    // ----------------------------------------
    // 检查新版本
    if (!V_util_isMobile()) {
        __fork("Checking " + _for_ +___+ _update_, () => {
            NewVersion_check();
        }, 5000);
    }

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.st();
    INFO("* Welcome Page Done (" + WelcomePage_mode + ")");
    WelcomePage_done();
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // 显示 VLOOK 加载完成后的信息
    gTotalTimes = iStopwatch.stop();// - 200;
    INFO("=== !!! MAIN PROCESS DONE !!! ===");
    INFO("TOTAL COST   ⏱ " + gTotalTimes + " ms");
    INFO("    ├ HTML   ⏱ " + gTimes + " ms");
    INFO("    └ VLOOK™  ⏱ " + (gTotalTimes - gTimes) + " ms");

    // ----------------------------------------
    if (V_pageMode === _max_ && gThmVer !== gVer) {
        ALERT([
            "⚠️ 注意 ⚠️\n\n本文档使用的 VLOOK™ 主题与插件版本不匹配，会影响实际使用，请将更新至匹配的版本！！！"
                + `\n\n当前主题 [ ${gThmName} ]\n`
                + `主题版本 [ ${gThmVer} ]\n\n`
                + `插件版本 [ ${gVer} ]`,
            "⚠️ WARNING ⚠️\n\nThe VLOOK™ theme and plugin version used in this " + _document_ + " do not match, which may affect actual use. Please update to the matching version !!!"
                + `\n\nCurrent Theme [ ${gThmName} ]\n`
                + `Theme Version [ ${gThmVer} ]\n\n`
                + `Plugin Version [ ${gVer} ]`
        ][V_lang]);
    }

    // ----------------------------------------
    // 提交统计数据
    // __fork("Push Stat", function () {
        if (V_pageMode === _max_) // 非文库方式显示时才上报
            V_report_submit(gTotalTimes - gTimes);
    // }, 350);

    // ----------------------------------------
    // 适应宽度
    FitWidth_init();

    // 更新文档更多内容遮罩栏 UI
    MoreDocContent_updateUI(VOM_doc());

    // ----------------------------------------
    // 继续上次的阅读
    ResumeReading_init();
    ResumeReading_dispose(gFalse);

    /**
     * 创建独立线程执行
     * @param msg 线程信息
     * @param callback 线程执行的回调函数
     * @param delay 0 - 立即时间，>0 - 延时执行（毫秒）
     */
    function __fork(msg, callback, delay) {
        setTimeout(() => {
            let sw = new Stopwatch();
            sw.st("* thread * [" + msg + "]");
            typeof(callback) === _function_ && callback();
            sw.ed(_4space_);
        }, delay);
    }
}
