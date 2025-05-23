/**************************************
 *
 * VLOOK™ JS - Typora Plugin
 *
 * V29.0
 * 2025-05-24
 * Powered by MAX°孟兆
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
    gVer = "V29.0",
    gThmVer = _,
    gThmName = _,
    gUndefined = undefined,
    gNull = null,
    gTrue = true,
    gFalse = false,
    gTransDuration = 300,
    gTransDurationLong = 600,
    gScrollEdge = 20,
    gScrollStep = 50,
    gDocument = document,
    gWindow = window,
    gLocation = gWindow.location,
    gOnlyLightMode = gFalse, // 是否始终使用 Light Mode（仅 Light Mode）
    gVlookCC = gFalse,
    gScrollMarginTop = 100,
    gHideOutlineOver = 99,
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
    gUnwrapTableScreenWidth = 1279,
    gMobileScreenWidth = 850,
    // **********
    gToc = gUndefined, // 文档大纲对象
    gVlookToc = gUndefined, // 文档大纲内容
    gStyle = gUndefined, // 文档的 style 对象
    // 以下 _xxx_ 格式变量为字符串
    _100pc_ = "100%",
    _4space_ = ___+___+___+___,
    _absolute_ = "absolute",
    _actived_ = "actived",
    __action_ = "-action",
    _address_ = "address",
    __address_ = "-" + _address_,
    _after_ = "after",
    _albb_ = "albb",
    _align_ = "align",
    _alt_ = "alt",
    _alter_ = "alter",
    _alpha_ = "alpha",
    _found_ = "found",
    _all_found_ = "all-" + _found_,
    _ariaRoledescription_ = "aria-roledescription",
    _Arrow_ = "Arrow",
    _ArrowLeft_ = _Arrow_ + "Left",
    _ArrowRight_ = _Arrow_ + "Right",
    _ArrowUp_ = _Arrow_ + "Up",
    _ArrowDown_ = _Arrow_ + "Down",
    _assistor_ = "assistor",
    _audio_ = "audio",
    _animation_ = "animation",
    _auto_ = "auto",
    _autoplay_ = _auto_ + "play",
    _background_ = "background",
    _cap_ = "cap",
    _cap__ = _cap_ + "-",
    // _capauto_ = _cap_ + _auto_,
    _close_ = "close",
    _figure_ = "figure",
    _nav_ = "nav",
    __nav_ = "-" + _nav_,
    __close_figure_nav_ = "-" + _close_ + "-" + _figure_ + "-" + _nav_,
    _composition_ = "composition",
    _corner_ = "corner",
    _group_ = "group",
    _capgroup_ = _cap_ + _group_,
    _hide_ = "hide",
    // _caphide_ = _cap_ + _hide_,
    _color_ = "color",
    __color_ = "-" + _color_,
    _background_color_ = _background_ + __color_,
    _image_ = "image",
    _background_image_ = _background_ + "-" + _image_,
    _background_clip_ = _background_ + "-clip",
    __repeat_ = "-repeat",
    _position_ = "position",
    _before_ = "before",
    _player_ = "player",
    _width_ = "width",
    _max_ = "max",
    _max_width_ = _max_ + "-" + _width_,
    __blank_ = "_blank",
    _block_ = "block",
    _blur_ = "blur",
    _quote_ = "quote",
    _blockquote_ = _block_ + _quote_,
    _body_ = "body",
    __body_ = "-" + _body_,
    _bold_ = "bold",
    _book_ = "book",
    _border_ = "border",
    _bottom_ = "bottom",
    _border_bottom_width_ = _border_ + "-" + _bottom_ + "-" + _width_,
    _left_ = "left",
    __lg_ = "-lg",
    _right_ = "right",
    _radius_ = "radius",
    _border_bottom_left_radius_ = _border_ + "-" + _bottom_ + "-" + _left_ + "-" + _radius_,
    _border_bottom_right_radius_ = _border_ + "-" + _bottom_ + "-" + _right_ + "-" + _radius_,
    _border_color_ = _border_ + __color_,
    _border_image_ = _border_ + "-" + _image_,
    _border_radius_ = _border_ + "-" + _radius_,
    _border_width_ = _border_ + "-" + _width_,
    _border_left_width_ = _border_ + "-" + _left_ + "-" + _width_,
    _border_right_width_ = _border_ + "-" + _right_ + "-" + _width_,
    _top_ = "top",
    _border_top_width_ = _border_ + "-" + _top_ + "-" + _width_,
    _scroll_ = "scroll",
    __shadow_ = "-shadow",
    _box_ = "box",
    _box_shadow_ = _box_ + __shadow_,
    _none_ = "none",
    _box_shadow_none_ = _box_shadow_ + ":" + _none_ + ";",
    _br_ = "<br>",
    _2br_ = _br_ + _br_,
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
    _checkbox_ = _check_ + _box_,
    _checked_ = _check_ + "ed",
    __checked_ = "-" + _checked_,
    _check_time_ = _check_ + "-time",
    _hash_ = "hash",
    __hash_ = "-" + _hash_,
    _checkHash_ = _check_ + _hash_,
    _wrap_ = "wrap",
    _unwrap_ = "un" + _wrap_,
    _use_ = "use",
    _date_ = "date",
    _update_ = "up" + _date_,
    _chkUpdate_ = "chk-" + _update_,
    _class_ = "class",
    _click_ = "click",
    _cloudflare_ = "cloudflare",
    _code_ = "code",
    _codeblock_ = "codeblock",
    _column_ = "column",
    _colspan_ = "colspan",
    _content_ = "content",
    _controls_ = "controls",
    __control_ = "-control",
    _cursor_ = "cursor",
    _current_ = "current",
    _current_color_ = _current_ + __color_,
    __current_ = "-" + _current_,
    _copy_rich__ = "copy-rich-",
    _start_ = "start",
    _end_ = "end",
    _cost_ = "    COST ",
    _cover_ = "cover",
    _dark_ = "dark",
    _light_ = "light",
    _src_ = "src",
    _set_ = "set",
    _srcset_ = _src_ + _set_,
    _darksrc_ = _dark_ + _src_,
    _darksrcset_ = _dark_ + _srcset_,
    _data_ = "data",
    _data__ = _data_ + "-",
    _doc_ = "doc",
    _document_ = "document",
    _Document_ = "Document",
    _focus_ = "focus",
    _fold_ = "fold",
    _folded_ = _fold_ + "ed",
    _for_ = "for",
    _formula_ = "formula",
    _gray_ = "gray",
    _data_btn_group_ = _data__ + "btn-" + _group_,
    _count_ = "count",
    _data_cap_count_ = _data__ + _cap__ + _count_,
    _id_ = "id",
    _data_cap_for_id_ = _data__ + _cap__ + _for_ + "-" + _id_,
    _toc_ = "toc",
    _tab_ = "tab",
    _data_tab_for_ = _data__ + _tab_ + "-" + _for_,
    _tab_group_ = _tab_ + "-" + _group_,
    _data_tab_group_ = _data__ + _tab_group_,
    _data_tab_group_id_ = _data_tab_group_ + "-" + _id_,
    _empty_ = "empty",
    _data_toc_empty_ = _data__ + _toc_ + "-" + _empty_,
    _cell_ = "cell",
    _data_cell_merge_ = _data__ + + _cell_ + "-merge",
    _data_chk_ = _data__ + "chk",
    _text_ = "text",
    __text_ = "-" + _text_,
    _data_clipboard_text_ = _data__ + "clipboard" + __text_,
    _data_colspan_ = _data__ + _colspan_,
    _data_column_fmting_ =_data__ + _column_ + "-fmting",
    __more_ = "-more",
    _data_col_too_more_ = _data__ + "col-too" + __more_,
    _cntr_ = "cntr",
    _data_cntr_ = _data__ + _cntr_,
    _data_content_expanded_ = _data__ + _content_ + "-expanded",
    _data_content_folded_ = _data__ + _content_ + "-" + _folded_,
    _type_ = "type",
    _data_content_type_ = _data__ + _content_ + "-" + _type_,
    _default_ = "default",
    _data_default_ = _data__ + _default_,
    _label_ = "label",
    _data_ex_label_ = _data__ + "ex-" + _label_,
    _data_extend_ = _data__ + "extend",
    _data_date_ = _data__ + _date_,
    _fig_ = "fig",
    _data_fig__ = _data__ + _fig_ + "-",
    _num_ = "num",
    _data_fig_num_ = _data_fig__ + _num_,
    _data_fig_type_ = _data_fig__ + _type_,
    _data_folded_ = _data__ + _folded_,
    _folder_ = "folder",
    _data_folder_ = _data__ + _folder_,
    _data_folder_id_ = _data__ + _folder_ + "-id",
    _data_folding_ = _data__ + "folding",
    _keyword_ = "keyword",
    _data_keywords_ = _data__ + _keyword_ + "s",
    _data_dark_src_ = _data__ + "darksrc",
    _duration_ = "duration",
    _data_duration_ = _data__ + _duration_,
    _grid_ = "grid",
    // _data_fig_grid_ = _data_fig__ + _grid_,
    _h1_5_ = "h1,h2,h3,h4,h5",
    _h1_6_ = _h1_5_ + ",h6",
    _data_cap_group_ = _data__ + _cap__ + _group_,
    _data_hash_ = _data_ + __hash_,
    _html_ = "html",
    _header_ = "header",
    __header_ = "-" + _header_,
    __num_ = "-num",
    _data_header_num_ = _data__ + _header_ + __num_,
    _history_ = "history",
    _data_history_ = _data__ + _history_,
    __icon_ = "-icon",
    _data_icon_ = _data_ + __icon_,
    _data_id_fig_type_ = _data__ + "id-" + _fig_ + "-" + _type_,
    _data_keyword_match_ = _data__ + _keyword_ + "-match",
    _data_long_ = _data__ + "long",
    _data_node_ = _data__ + "node",
    _no_ = "no",
    _no_more_ = _no_ + __more_,
    _data_no_more_ = _data__ + _no_more_,
    _page_ = "page",
    _data_page_ = _data__ + _page_,
    _data_parent_folder_id_ = _data__ + "parent-" + _folder_ + "-id",
    _data_pid_ = _data__ + "pid",
    _data_quote_group_ = _data__ + _quote_ + "-" + _group_,
    _ref_ = "ref",
    _data_ref_ = _data__ + _ref_,
    _data_rb_cell_bg_ = _data__ + "rb-" + _cell_ + "-bg",
    _data_rb_text_ = _data__ + "rb" + __text_,
    _data_rb_whole_text_ = _data__ + "rb-whole" + __text_,
    _row__ = "row-",
    _data_row__ = _data__ + _row__,
    _data_row_folded_ = _data_row__ + _folded_,
    _open_ = "open",
    _mode_ = "mode",
    __mode_ = "-" + _mode_,
    _data_row_open_mode_ = _data_row__ + _open_ + __mode_,
    _data_src_ = _data__ + _src_,
    _data_src__ = _data_src_ + "-",
    _data_src_dark_ = _data_src__ + _dark_,
    _data_src_light_ = _data_src__ + _light_,
    _data_srcset_ = _data__ + "srcset",
    _data_srcset__ = _data_srcset_ + "-",
    _data_srcset_dark_ = _data_srcset__ + _dark_,
    _data_srcset_light_ = _data_srcset__ + _light_,
    _data_td2th_ = _data__ + "td2th",
    _title_ = "title",
    __title_ = "-" + _title_,
    _data_title_ = _data__ + _title_,
    _data_id_ = _data__ + "id",
    _data_ident_level_ = _data__ + "ident-level",
    _fill_ = "fill",
    _img_ = "img",
    _data_img_fill_ = _data__ + _img_ + "-" + _fill_,
    _pause_ = "pause",
    _data_pause_ = _data__ + _pause_,
    _data_pg_idx_ = _data__ + "pg-idx",
    __result_ = "-result",
    _data_result_ = _data_ + __result_,
    _coating_ = "coating",
    _hidden_ = "hidden",
    _data_coating_hidden_ = _data__ + _coating_ + "-" + _hidden_,
    _tip_ = "tip",
    // __tip_ = "-tip",
    _data_coating_tip_ = _data__ + _coating_ + "-" + _tip_,
    _data_coating_showed_ = _data__ + _coating_ + "-showed",
    _data_row_group_ = _data_row__ + _group_,
    _data_tbl__ = _data__ + "tbl-",
    _data_tbl_col_ = _data_tbl__ + "col",
    _data_tbl_x_ = _data_tbl__ + "x",
    _data_th_rpt_ = _data__ + "th-rpt",
    _tips_ = "tips",
    _data_tips_ = _data__ + _tips_,
    _data_x_ref_ = _data__ + "x-" + _ref_,
    _del_ = "del",
    _details_ = "details",
    _DingTalk_ = "DingTalk",
    _disabled_ = "disabled",
    _display_ = "display",
    _display_mode_ ="{{" + _display_ + __mode_ + "}}",
    _div_ = "div",
    _doc_lib_ = _doc_ + "-lib",
    _doc_lib_cn_ = "文库",
    // _doc_lib_toc_ = _doc_lib_ + "-toc",
    _doc_icon_ = _doc_ + __icon_,
    _done_ = "done",
    _copy_ = "copy",
    _Copy_ = "Copy",
    _open_in_figure_nav_ = "open-in-" + _figure_ + __nav_,
    _table_ = "table",
    _table_column_ = _table_ + "-" + _column_,
    _table_cross_ = _table_ + "-cross",
    _pic_in_pic_ = "pic-in-pic",
    __doc_ = "-" + _doc_,
    __doc_title_ = __doc_ + __title_,
    _effect_ = "effect",
    _enabled_ = "enabled",
    _first_ = "first",
    _last_ = "last",
    _Enter_ = "Enter",
    _emptied_ = "emptied",
    _error_ = "error",
    _Escape_ = "Escape",
    __fd_ = "-fd",
    _failed_ = "Failed [ ",
    _false_ = "false",
    _v__ = "v-",
    _v_fig_ = _v__ + _fig_,
    _fill_width_ = "fill-" + _width_,
    _v_fill_width_ = _v__ + _fill_width_,
    _checkCount_ = _check_ + _count_,
    _welcome_ = "welcome",
    _v_welcome_page_ = _v__ + _welcome_ + "-" + _page_,
    _caption_ = "caption",
    _figcaption_ = _fig_ + _caption_,
    _fig_grid__ = _v_fig_ + "-" + _grid_ + "-",
    _solid_ = "solid",
    _fig_solid__ = _v_fig_ + "-" + _solid_ + "-",
    _filter_ = "filter",
    _attribute_ = "attribute",
    _child_ = "child",
    __child_ = "-" + _child_,
    __first_ = ":" + _first_,
    __first_child_ = __first_ + __child_,
    _flex_ = "flex",
    _float_ = "float",
    _font_ = "font",
    _Font_ = "Font",
    _style_ = "style",
    _font_style_ = _font_ + "-" + _style_,
    __footer_ = "-footer",
    _footnote_ = "footnote",
    _footnotes_ = _footnote_ + "s",
    __area_ = "-area",
    _footnotes_area_ = _footnotes_ + __area_,
    _freeze_ = "freeze",
    _function_ = "function",
    _gov_ = "gov",
    _h6_ = "h6",
    _height_ = "height",
    // _hover_ = "hover",
    // _hover_action_ = _hover_ + __action_,
    _hr_ = "hr",
    _href_ = "href",
    _http_ = "http",
    _https_ = _http_ + "s",
    _httpPrefix_ = _http_ + "://",
    _httpsPrefix_ = _https_ + "://",
    _github_ = "github",
    _github_madmaxchow_ = "github.com/MadMaxChow/",
    _openfontsPages_CloudFlare_ = _httpsPrefix_ + "openfonts.pages.dev/",
    _vlook_ = "vlook",
    _VLOOK_ = "VLOOK",
    _githubVlook_ = _github_madmaxchow_ + _VLOOK_,
    _ico_ = "ico",
    _Alert__ = "Alert-",
    _Note_ = "Note",
    _icoAlert__ = _ico_ + _Alert__,
    _note_ = "note",
    _icoAlert_note_ = _ico_ + _Alert__ + _note_,
    _Tip_ = "Tip",
    _icoAlert_tip_ = _ico_ + _Alert__ + _tip_,
    _Important_ = "Important",
    _important_ = "important",
    _icoAlert_important_ = _ico_ + _Alert__ + _important_,
    _Warning_ = "Warning",
    _warning_ = "warning",
    _icoAlert_warning_ = _ico_ + _Alert__ + _warning_,
    _Caution_ = "Caution",
    _caution_ = "caution",
    _icoAlert_caution_ = _ico_ + _Alert__ + _Caution_,
    _Mode_ = "Mode",
    _math_ = "math",
    _mobile_ = "mobile",
    _icoAutoMode_ = _ico_ + "Auto" + _Mode_,
    _icoChkbox__ = _ico_ + "Chkbox_",
    _icoCheck_ = _ico_ + "Check",
    _Close_ = "Close",
    _icoClose_ = _ico_ + _Close_,
    _icoCopy_ = _ico_ + _Copy_,
    _Dark_ = "Dark",
    _icoDarkMode_ = _ico_ + _Dark_ + _Mode_,
    _icoDetailsOpen_ = _ico_ + "DetailsOpen",
    _icoNavHistory_ = _ico_ + _nav_ + "-" + _history_,
    _icoDocLib_ = _ico_ + "DocLib",
    _icoDocLibSelf_ = _icoDocLib_ + "Self",
    _icoDocLibBm_ = _icoDocLib_ + "Bm",
    _icoDocLibExt_ = _icoDocLib_ + "Ext",
    _icoDocLibRef_ = _icoDocLib_ + "Ref",
    _icoFolded_ = _ico_ + "Folded",
    _Style_ = "Style",
    _icoFontStyle_ = _ico_ + _Font_ + _Style_,
    _icoGray_ = _ico_ + "Gray",
    _icoForbidden_ = _ico_ + "Forbidden",
    _Laser_ = "Laser",
    _Pointer_ = "Pointer",
    _icoLaserPointer_ = _ico_ + _Laser_ + _Pointer_,
    _Light_ = "Light",
    _icoLightMode_ = _ico_ + _Light_ + _Mode_,
    _icoLinkError_ = _ico_ + "LinkError",
    _icoLinkMap_ =  _ico_ + "LinkMap",
    _Loading_ = "Loading",
    _icoLoading_ = _ico_ + _Loading_,
    _icoMaskCloser_ = _ico_ + "MaskCloser",
    _icoNavCenter_ = _ico_ + "NavCenter",
    _icoNewVersion_ = _ico_ + "NewVersion",
    // _icoOpenInFigureNav_ = _ico_ + "OpenInFigureNav",
    _icoParagraphNav_ = _ico_ + "ParagraphNav",
    _Pause_ = "Pause",
    _icoPause_ = _ico_ + _Pause_,
    _icoPicInPic_ = _ico_ + "PicInPic",
    _icoPlay_ = _ico_ + "Play",
    _icoPrevFig_ = _ico_ + "PrevFig",
    _icoPrevChapter_ = _ico_ + "PrevChapter",
    _Reset_ = "Reset",
    _icoResetInput_ = _ico_ + _Reset_ + "Input",
    _Search_ = "Search",
    _icoSearch_ = _ico_ + _Search_,
    _spotlight_ = "spot" + _light_,
    _Spotlight_ = "Spot" + _light_,
    _icoSpotlight_ = _ico_ + _Spotlight_,
    _icoStop_ = _ico_ + "Stop",
    _icoTableX_ = _ico_ + "TableX",
    _icoTocFolded_ = _ico_ + "TocFolded",
    _icoIndexTab__ = _ico_ + "IndexTab-",
    _icoIndexTab_toc_ = _icoIndexTab__ + _toc_,
    _icoIndexTab_codeblock_ = _icoIndexTab__ + _codeblock_,
    _icoIndexTab_formula_ = _icoIndexTab__ + _formula_,
    _icoIndexTab_figure_ = _icoIndexTab__ + _figure_,
    _media_ = "media",
    _icoIndexTab_media_ = _icoIndexTab__ + _media_,
    _icoIndexTab_table_ = _icoIndexTab__ + _table_,
    _icoIndexTab_audio_ = _icoIndexTab__ + _audio_,
    _icoIndexTab_blockquote_ = _icoIndexTab__ + _blockquote_,
    _icoWrapUnwrap_ = _ico_ + "WrapUnwrap",
    _load_ = "load",
    _mermaid_ = "mermaid",
    _loading_ = _load_ + "ing",
    _v_loading_ = _v__ + _loading_,
    _v_long_ = _v__ + "long",
    _vlookHost_ = "madmaxchow.github.io",
    _madmaxchowHost_GitHub_ = _httpsPrefix_ + _vlookHost_,
    _vlookPagesHost_CloudFlare_ = _httpsPrefix_ + _vlook_ + "-doc.pages.dev",
    _vlookAct_ = _vlookHost_ + "/VLOOK/act/",
    // _VLOOK_Number_ = _VLOOK_ + " Number",
    _VLOOK_DIN_ = _VLOOK_ + " DIN",
    _VLOOK_DIN_DIGITAL_ = _VLOOK_DIN_ + " Digital",
    // _VLOOK_DIN_Sans_ = _VLOOK_DIN_ + " Sans",
    // _VLOOK_DIN_Serif_ = _VLOOK_DIN_ + " Serif",
    _VLOOK_Sans_Mono_ = _VLOOK_ + " Sans Mono",
    _VLOOK_Serif_Mono_ = _VLOOK_ + " Serif Mono",
    _VLOOK_Sans_ = _VLOOK_ + " Sans",
    _VLOOK_Serif_ = _VLOOK_ + " Serif",
    _VLOOK_Albb_ = _VLOOK_ + " Albb",
    _VLOOK_Albb_DT_Sans_ = _VLOOK_ + " Albb DT-Sans",
    _VLOOK_Albb_DT_JinBu_ = _VLOOK_ + " Albb DT-JinBu",
    _NotoSansMono_ = "NotoSansMono",
    _LuxiMono_ = "LuxiMono",
    _icoVLOOK_ = _ico_ + _VLOOK_,
    _icoZoomIn_ = _ico_ + "ZoomIn",
    _icoZoomOut_ = _ico_ + "ZoomOut",
    __status_ = "-status",
    _iframe_ = "iframe",
    _imageXicon_ = _image_ + "/x" + __icon_,
    _css_important_ = " !important;",
    _index_ = "index",
    _inner_ = "inner",
    _input_ = "input",
    _inset_ = "in" + _set_,
    _startReading_cn_ = "开始阅览",
    _startReading_en_ = "Start Reading",
    _in_start_ = "in-" + _start_,
    _Invalid_ = "Invalid",
    _invert_ = "invert",
    _italic_ = "italic",
    _italic_bold_ = "/" + _italic_ + "/" + _bold_,
    _item_ = "item",
    __item_ = "-item",
    __items_ = __item_ + "s",
    _kbd_ = "kbd",
    _keydown_ = "keydown",
    _lang_ = "lang",
    _pointer_ = "pointer",
    _laser_ = "laser",
    _laser_pointer_ = _laser_ + "-" + _pointer_,
    __last_ = ":" + _last_,
    __last_child_ = __last_ + __child_,
    _last_position_ = _last_ + "-" + _position_,
    _v_resume_reading_ = _v__ + "resume-reading",
    _link_ = "link",
    _xlink_href_ = "x" + _link_ + ":" + _href_,
    _link_checker_ = _link_ + "-" + _check_ + "er",
    _line_ = "line",
    _line__ = _line_ + "-",
    _linear_gradient_ = "linear-gradient",
    _local_ = "local",
    _loop_ = "loop",
    _lazy_ = "lazy",
    _margin_ = "margin",
    _map_ = "map",
    _margin_top_ = _margin_ +  "-" + _top_,
    _margin_bottom_ = _margin_ +  "-" + _bottom_,
    _margin_left_ = _margin_ + "-" + _left_,
    _margin_right_ = _margin_ + "-" + _right_,
    _mark_ = "mark",
    _mata_ = "meta",
    _max_height_ = "max-" + _height_,
    _alert_ = "alert",
    _md_alert_ = "md-" + _alert_,
    _md_diagram_panel_ = "md-diagram-panel",
    _md_fences_ = "md-fences",
    _md_math_container_parents_ = ".md-" + _math_ +"-" + _block_ + ", ." + _md_fences_ + "-" + _math_,
    _message_ = "message",
    _md_toc_ = "md-toc",
    _md_toc__ = _md_toc_ + "-",
    // _md_toc_content_ = _md_toc_ + "-" + _content_,
    _md_toc_item_ = _md_toc_ + __item_,
    _middle_ = "middle",
    _min_ = "min",
    _mindmap_ = "mindmap",
    _mini_ = "mini",
    _min_width_ = "min-" + _width_,
    _mjx__ = "#mjx-",
    _mouse_ = "mouse",
    _down_ = "down",
    __down = "-" + _down_,
    _mouseDown_ = _mouse_ + _down_,
    _up_ = "up",
    _mouseUp_ = _mouse_ + _up_,
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
    _nav_center_ = _nav_ + "-" + _center_,
    _Navigation_ = "Navigation",
    _Next_ = "Next",
    _next_ = "next",
    __next_ = "-" + _next_,
    _version_ = "version",
    _new_version_ = "new-" + _version_,
    _new_version_check_time_ = _new_version_ + "-" + _check_time_,
    _nbsp_ = "&nbsp;",
    _no_repeat_ = _no_ + __repeat_,
    _normal_ = "normal",
    _normal_normal_ = "/" + _normal_ + "/" + _normal_,
    _normal_bold_ = "/" + _normal_ + "/" + _bold_,
    _normal_500_ = "/" + _normal_ + "/500",
    _normal_900_ = "/" + _normal_ + "/900",
    _normal_italic_ = "/" + _italic_ + "/" + _normal_,
    _notLoaded_ = "⏳", //"NOT LOADED",
    _off_ = "off",
    _on_ = "on",
    __only_child_ = ":only" + __child_,
    _opacity_ = "opacity",
    _opened_ = _open_ + "ed",
    _Published_via_ = "This " + _document_ + " is published via ",
    _outerHTML_ = "outerHTML",
    _outline__ = "outline-",
    _outline_style_ = _outline__ + _style_,
    _outline_width_ = _outline__ + _width_,
    _overflow_ = "overflow",
    _overflow_x_ = _overflow_ + "-x",
    _overflow_y_ = _overflow_ + "-y",
    _padding_ = "padding",
    _padding_bottom_ = _padding_ + "-" + _bottom_,
    _padding_left_ = _padding_ + "-" + _left_,
    _padding_right_ = _padding_ + "-" + _right_,
    _padding_top_ = _padding_ + "-top",
    _paragraph_ = "paragraph",
    _paragraph_nav_ = _paragraph_ + __nav_,
    _placeholder_ = "placeholder",
    _playing_ = "playing",
    _preload_ = "preload",
    _Previous_ = "Previous",
    _pre_wrap_ = "pre-" + _wrap_,
    _prev_ = "prev",
    __prev = "-" + _prev_,
    _prs_ = "prs",
    _Ready_ = "Ready",
    _reset_ = "re" + _set_,
    _restore_ = "restore",
    _ref_footnote_ = "ref-" + _footnote_,
    _revert_layer_ = "revert-layer",
    _rowspan_ = "rowspan",
    _rx_ = "rx",
    _ry_ = "ry",
    _sans_ = "sans",
    _selected_ = "selected",
    _serif_ = "serif",
    _small_ = "small",
    _span_ = "span",
    _sub_ = "sub",
    _stt_ = "stt",
    _sup_ = "sup",
    _stroke_ = "stroke",
    _strong_ = "strong",
    _svg_ = "svg",
    __svg_ = "-svg",
    __ico_ = "-ico",
    _v_svg_ico_ = _v__ + _svg_ + __ico_,
    _suffixImg_ = "." + _img_,
    _suffixSvg_ = "." + _svg_,
    _summary_ = "summary",
    _swap_ = "swap",
    _tabindex_ = _tab_ + _index_,
    _tag_ = "tag",
    _tagName_ = _tag_ + "Name",
    _target_ = "target",
    _tbody_ = "t" + _body_,
    _text_align_ = _text_ + "-" + _align_,
    _textLength_ = _text_ + "Length",
    _text_shadow_ = _text_ + __shadow_,
    _thead_ = "thead",
    _theme_ = "theme",
    // _thm_ = "thm",
    ___v_ = "--v-",
    ___v_theme__ = ___v_ + _theme_ + "-",
    _thm_fav_logo_ = "thm-fav-logo",
    ___v_thm_fav_logo_ = "--" + _thm_fav_logo_,
    ___v_f__ = ___v_+ "f-",
    _vlook__ = _vlook_ + "-",
    _vlook_header_autonum_ = _vlook__ + _header_ + "-autonum",
    _vlook_gray_mode_ = _vlook__ + _gray_ + __mode_,
    _vlook_toc_ = _vlook__ + _toc_,
    _vlook_query_ = _vlook__ + "query",
    _vlookTocItem_ = "#" + _vlook_toc_ + ">." + _md_toc_item_,
    __spliter_ = "-spliter",
    _toolbar_ = "toolbar",
    _transform_ = "transform",
    _transform_origin_ = _transform_ + "-origin",
    _translate_ = "translate",
    _transparent_ = "transparent",
    _true_ = "true",
    _ttf_ = "ttf",
    _hastwo_ = "hastwo",
    _un_ = "un",
    _unfreeze_ = "unfreeze",
    _vdl_ = "vdl",
    _docLibIdentifier_ = _target_ + "=" + _vdl_,
    _v_cc_ = _v__ + "cc",
    _view_ = "view",
    _v_view_history_ = _v__ + _view_ + "-" + _history_,
    _vk_footer_area_ = "vk" + __footer_ + __area_,
    // _vk_footer_area_id_ = "#" + _vk_footer_area_,
    _vk_header_ = "vk" + __header_ + "-",
    _vk__ = "vk-",
    _vk_id_ = _vk__ + _id_,
    _vk_id__ = _vk_id_ + "-",
    _vk_id_doc_cover_ = _vk_id_ + __doc_ + "-" + _cover_,
    _vk_id_doc_title_ = _vk_id_ + __doc_title_,
    _vk_id_fig_ = _vk_id__ + _fig_,
    _vk_id_audio_ = _vk_id__ + _audio_,
    _video_ = "video",
    _vk_id_video_ = _vk_id__ + _video_,
    _vk_id_tbl_ = _vk_id__ + "tbl",
    _vk_id_math_ = _vk_id__ +  _math_,
    _vk_id_codeblock_ = _vk_id__ + _codeblock_,
    _vk_id_mini_audio_ = _vk_id__ + _mini_ + "-" + _audio_,
    _vk_pg__ = _vk__ + "pg-",
    _vlook_doc_lib_ = _vlook__ + _doc_lib_,
    _vlook_chk_update_cloudflare_ = _vlook__ + _chkUpdate_ + "-" + _cloudflare_,
    _vlook_chk_update_github_ = _vlook__ + _chkUpdate_ + "-" + _github_,
    _vlook_stat__ = _vlook__ + "stat-",
    _vlook_stat_gitee_ = _vlook_stat__ + "gitee",
    _vlook_stat_github_ = _vlook_stat__ + _github_,
    _vlook_stat_cloudflare_ = _vlook_stat__ + _cloudflare_,
    ___ac_ = "--ac-",
    _var_ac_rd_ = V_ui_var(___ac_ + "rd"),
    _var_ac_rd_lg_ = V_ui_var(___ac_ + "rd-lg"),
    _var_ac_cy_ = V_ui_var(___ac_ + "cy"),
    _var_ac_cy_lg_ = V_ui_var(___ac_ + "cy-lg"),
    _var_ac_og_ = V_ui_var(___ac_ + "og"),
    _var_ac_og_lg_ = V_ui_var(___ac_ + "og-lg"),
    __scheme_ = "-scheme",
    _color_scheme_ = _color_ + __scheme_,
    ___v_color_scheme_ = ___v_ + _color_scheme_,
    ___cur__ = "--cur-",
    _var_cur_copy_ = ___cur__ + _copy_,
    // _var_cur_pointer_ = ___cur__ + _pointer_,
    // _var_cur_pointer_text_ = ___cur__ + _pointer_ + __text_,
    ___d_bc_ = "--d-bc",
    _var_d_bc_ = V_ui_var(___d_bc_),
    _var_d_fc_ = V_ui_var("--d-fc"),
    _var_fig_grid__ = "--" + _fig_grid__,
    _var_mark_bg_ = V_ui_var("--mark-bg"),
    _v_nav_center_ = _v__ + _nav_center_,
    ___v_nav_center_width_ = "--" + _v_nav_center_ + "-w",
    _var_nav_center_hidden_left_ = "calc(" + V_getVarVal(___v_nav_center_width_) + " * -2)",//"--" + _vNavCenter_ + "-" + _hidden_ + "-l",
    _var_nav_center_width_ = V_ui_var(___v_nav_center_width_),
    ___v_r_ = ___v_ + "r-",
    _v_r_b_ = ___v_r_ + "b",
    _var_v_r_b_ = V_ui_var(_v_r_b_),
    _v_r_c_ = ___v_r_ + "c",
    _v_r_s_ = ___v_r_ + "s",
    _v_r_t_ = ___v_r_ + "t",
    _v_r_tag_ = ___v_r_ + _tag_,
    ___v_trans_dur_ = ___v_ + "trans-dur",
    _var_tbl_row_alpha_ = V_ui_var("--tbl-row-g-alpha"),
    _v_actor_ = _v__ + "actor",
    _v_actor_key_sys_ = _v_actor_ + "-key-sys",
    _v_actor_ext_sys_ = _v_actor_ + "-ext-sys",
    _v_audio_mini_control_ = _v__ + _audio_ + "-" + _mini_ + __control_,
    _v_backdrop_blurs_ = _v__ + "backdrop-blurs",
    _badge_ = "badge",
    _v_badge__ = _v__ + _badge_ + "-",
    _v_badge_name_ = _v_badge__ + _name_,
    _value_ = "value",
    _v_badge_value_ = _v_badge__ + _value_,
    _v_btn_ = _v__ + "btn",
    _v_btn_group_ = _v_btn_ + "-" + _group_,
    _v_btn__o__btn_group_ = "." + _v_btn_ + ",." + _v_btn_group_,
    _v_btn__n__assistor_ = "." + _v_btn_ + "." + _assistor_,
    _v_check_hash_ = _v__ + _check_ + __hash_,
    _v_color_scheme_ = _v__ + _color_scheme_,
    _v_content_ = _v__ + _content_,
    _v_content_assistor_ = _v_content_ + "-" + _assistor_,
    _v_card_ = _v__ + _card_,
    __v_cap1_ = "." + _v__ + _cap__ + "1",
    __v_cap2_ = "." + _v__ + _cap__ + "2",
    _v_cap_cntr_ = _v__ + _cap__ + _cntr_,
    _v_caption_ = _v__ + _caption_,
    _v_caption__n__mermaid_ = _v_caption_ + "." + _mermaid_,
    _v_chapter_nav_ = _v__ + "chapter" + __nav_,
    _CodeMirror_ = "CodeMirror",
    _CodeMirror_line_ = _CodeMirror_ + "-line",
    _CodeMirror_code_ = _CodeMirror_ + "-code",
    _v_copyright_ = _v__ + "copyright",
    _v_copyright_svg_ico_ = _v_copyright_ + __svg_ + __ico_,
    _v_cursor_laser_ = _v__ + _cursor_ + "-" + _laser_,
    _v_doc__ = _v__ + _doc_ + "-",
    _info_ = "info",
    _v_doc_info_ = _v_doc__ + _info_,
    _v_prs_info_ = _v__ + _prs_ + "-" + _info_,
    _v_doc_lib_ = _v_doc__ + "lib",
    _v_doc_lib_item_ = _v_doc_lib_ + __item_,
    // _v_doc_logo_ = _v_doc__ + "logo-",
    _v_thm_fav_logo_ = _v__ + _thm_fav_logo_,
    _v_nav_history_ = _v__ + _nav_ + "-" + _history_,
    _expander_ = "expander",
    _v_float_card_ = _v__ + _float_ + "-" + _card_,
    _v_float_card2_ = _v_float_card_ + "2",
    __content_ = "-" + _content_,
    _v_fig_content_ = _v_fig_ + __content_,
    _v_fig_nav_ = _v_fig_ + __nav_,
    _v_fig_nav_btn_ = _v_fig_nav_ + "-btn",
    _search_ = "search",
    _v_focus_search_ = _v__ + _focus_ + "-" + _search_,
    _v_font_info__ = _v__ + _font_ + _info_ + "-",
    _v_fontnote_pn_ = _v__ + _footnote_ + "-pn",
    _v_fontnote_pn_content_ = _v_fontnote_pn_ + __content_,
    _v_font_package_ = _v__ + _font_ + "-package",
    _v_font_style_ = _v__ + _font_style_,
    _v_font_style_download_ = _v__ + _font_style_ + "-download",
    _v_font_style_current_ = _v__ + _font_style_ + __current_,
    _v_font_style_opt_ = _v__ + _font_style_ + "-opt",
    _v_font_style_opt_local_ = _v_font_style_opt_ + "-" + _local_,
    _v_font_style_opt_book_ = _v_font_style_opt_ + "-" + _book_,
    _v_font_style_opt_gov_ = _v_font_style_opt_ + "-" + _gov_,
    _v_font_style_opt_sans_ = _v_font_style_opt_ + "-" + _sans_,
    _v_font_style_opt_serif_ = _v_font_style_opt_ + "-" + _serif_,
    _v_font_style_opt_albb_ = _v_font_style_opt_ + "-" + _albb_,
    _v_font_style_restore_ = _v__ + _font_style_ + "-" + _restore_,
    _info_tips_ = _info_ + "-" + _tips_,
    __handle_ = "-handle",
    _v_info_tips_ = _v__ + _info_tips_,
    _v_std_code_ = _v__ + "std-" + _code_,
    _v_breadcrumb_style_ = _v__ + "stepwise",
    _v_tab_box_ = _v__ + _tab_ + "-" + _box_,
    _v_tab_group_ = _v__ + _tab_group_,
    _tab_group_wrap_ = _tab_group_ + "-" + _wrap_,
    _v_table_ = _v__ + _table_,
    _v_tag_ = _v__ + _tag_,
    _v_tag_link = _v_tag_ + "-" + _link_,
    _v_tips_ = _v__ + _tips_,
    _v_toc__ = _v__ + "toc-",
    // _v_toc_body_ = _v_toc__ + _body_,
    _v_toc_title_ = _v_toc__ + _title_,
    _v_index_filter_result_ = _v__ + _index_ + "-" + _filter_ + __result_,
    _v_nav_center_handle_ = _v__ + _nav_center_ + __handle_,
    _v_tool_tips_ = _v__ + "tool-" + _tips_,
    _v_toolbar_ = _v__ + _toolbar_,
    _invert_dark_ = _invert_ + "-" + _dark_,
    _v_img__ = _v__ + _img_ + "-",
    _v_img_lost_ = _v_img__ + "lost",
    _v_img_invert_dark_ = _v_img__ + _invert_dark_,
    _v_link_chk_result_ = _v__ + _link_ + "-chk" + __result_,
    _v_link_error_ = _v__ + _link_ + "-" + _error_,
    _v_link_info_list_ = _v__ + _link_ + "-" + _info_ + "-list",
    _v_link_map_ = _v__ + _link_ + "-map",
    _v_map_item_ = _v__ + "map" + __item_,
    _mask_ = "mask",
    _v_mask_ = _v__ + _mask_,
    _v_mask_close_ = _v_mask_ + "-" + _close_,
    _v_mermaid_restyler_ = _v__ + _mermaid_ + "-restyler",
    _v_more_doc_content_ = "v" + __more_ + __doc_ + __content_ + "-",
    // _v_nav_center_block_ = _v_nav_center_ + "-" + _block_,
    // _v_nav_center_float_ = _v_nav_center_ + "-" + _float_,
    _v_new_version_ = _v__ + _new_version_,
    _v_para_nav_mask_border_ = _v__ + "para" + __nav_ + "-" + _mask_ + "-" + _border_,
    _mask_rect_ = _mask_ + "-rect",
    _v_post_card_ = _v__ + "post-" + _card_,
    _v_pic_in_pic_ = _v__ + _pic_in_pic_,
    _v_pip_btn_ = _v__ + "pip-btn",
    _v_coating_ = _v__ + _coating_,
    _rotate_ = "rotate",
    _v_rotate_ = _v__ + _rotate_,
    _v_rotate45_ = _v_rotate_ + 45,
    _v_rotate90_ = _v_rotate_ + 90,
    _v_search_by_keyword_ = _v__ + _search_ +"-by-" + _keyword_,
    _v_segment_ = _v__ + "segment",
    _v_segment_btn_ = _v_segment_ + "-btn",
    _sts_ = "sts",
    _v_sts__ = _v__ + _sts_ + "-",
    _v_sts_font_style_ = _v_sts__ + _font_style_,
    _v_sts_gray_ = _v_sts__ + _gray_,
    _v_spotlight_ = _v__ + _spotlight_,
    _v_spotlight_in_dark_ = _v_spotlight_ + "-in-" + _dark_,
    _v_status_bar_ = "v" + __status_ + "-bar",
    _v_svg_details_ = _v__ + "svg-" + _details_,
    _v_tbl__ = _v__ + "tbl-",
    _v_tbl_x_ = "." + _v_tbl__ + "x",
    _v_tbl_x_cell_ = _v_tbl__ + "x-" + _cell_,
    _v_tbl_row__ = _v_tbl__ + _row__,
    _v_tbl_row_g_folder_ = _v_tbl_row__ + "g-" + _folder_,
    __identer_ = "-identer",
    _v_tbl_row_g_identer_folder_ = _v_tbl_row__ + "g" + __identer_ + "-" + _folder_,
    _v_tbl_row_g_not_folder_ = _v_tbl_row__ + "g-not-" + _folder_,
    _v_tbl_row_g_btn_ = "." + _v_tbl_row__ + "g-btn",
    _v_tbl_row_num_hidden_ = _v_tbl_row__ + _num_ + "-" + _hidden_,
    _v_tbl_col_fmt__ = _v_tbl__ + "col-fmt-",
    _v_tbl_col_fmt_chkbox_ = _v_tbl_col_fmt__ + "chkbox",
    _v_tbl_col_fmt_bold_ = _v_tbl_col_fmt__ + _bold_,
    _v_tbl_col_fmt_em_ = _v_tbl_col_fmt__ + "em",
    _v_tbl_col_fmt_mark_ = _v_tbl_col_fmt__ + _mark_,
    _v_tbl_col_fmt_num_ = _v_tbl_col_fmt__ + _num_,
    _v_tbl_col_fmt_num_decimal_ = _v_tbl_col_fmt__ + _num_ + "-decimal",
    _v_tbl_col_fmt_num_negative_ = _v_tbl_col_fmt__ + _num_ + "-negative",
    _v_tbl_col_fmt_num_positive_ = _v_tbl_col_fmt__ + _num_ + "-positive",
    _v_tbl_col_fmt_percent_ = _v_tbl_col_fmt__ + "percent",
    _v_tbl_col_fmt_currency_ = _v_tbl_col_fmt__ + "currency",
    _v_tbl_row_g_sub_ = _v_tbl_row__ + "g-sub",
    _v_tbl_row_g_identer_ = _v_tbl_row__ + "g" + __identer_,
    _v_text_field_ = _v__ + _text_ + "field",
    _v_text_field_focus_ = _v_text_field_ + "-" + _focus_,
    _v_text_field_reset_ = _v_text_field_ + "-" + _reset_,
    _v_toc_folder_ = "." + _v_toc__ + _folder_,
    _v_toc_item_ = _v_toc__ + _item_,
    _v_item_current_ = "v" + __item_ + __current_,
    _v_transition__ = _v__ + "transition-",
    _v_transition_all_ = _v_transition__ + "all",
    _vertical_align_ = "vertical-" + _align_,
    _view_box_ = _view_ + "Box",
    _visible_ = "visible",
    _visibility_ = "visibility",
    _wait_ = "wait",
    _wheel_ = "wheel",
    _white_space_ = "white-space",
    _write_ = "write",
    _idWrite_ = "#" + _write_,
    _woff2_ = "woff2",
    // _var_write_margin_left_ = "var(" + ___v_ + _write_ + "-ml)",
    // _var_write_margin_left_def_ = "var(" + ___v_ + _write_ + "-ml-def)",
    _var_write_margin_left_ = V_ui_var(___v_ + _write_ + "-ml"),
    _var_write_margin_left_def_ = V_ui_var(___v_ + _write_ + "-ml-def"),
    _xmd_ = "xmd",
    _yes_ = "yes",
    _z_index_ = "z-" + _index_,
    _zoom_ = "zoom",
    _zoom_in_ = _zoom_ + "-in",
    _zoom_out_ = _zoom_ + "-out",
    _2nbsp_ = _nbsp_ + _nbsp_;
iStopwatch.st();

// ==================== 内置函数调用简化 ==================== //

// 控制台打印日志
const c = console;
function LOG() {
    c.log.apply(c, arguments);
}
// 控制台打印通知
function INFO() {
    c.info.apply(c, arguments);
}
// 控制台打印警告
function WARN() {
    c.warn.apply(c, arguments);
}
// 控制台打印错误
function ERROR() {
    c.error.apply(c, arguments);
}
// 在 debug 模式下输出调试信息
function DEBUG(...info) {
    V_debugMode
        && WARN(...info);
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

// 定义 addClass 简化版
function JQ_addClass(target, className) {
    target !== gUndefined
        && target.addClass(className);
}

// 定义 removeClass 简化版
function JQ_removeClass(target, className) {
    target !== gUndefined
        && target.removeClass(className);
}

// 定义 removeAttr 简化版
function JQ_removeAttr(target, attrName) {
    target !== gUndefined
        && target.removeAttr(attrName);
}

// 交替切换不同样式
function JQ_exchangeClass(target, oldClassName, newClassName) {
    if (target !== gUndefined) {
        target.removeClass(oldClassName);
        target.addClass(newClassName);
    }
}

// 定义 attr 简化版
$.prototype.a = function (key, value) {
    return (value === gUndefined ? this.attr(key) : this.attr(key, value));
}

// 定义 css 简化版
$.prototype.c = function (key, value) {
    return (value === gUndefined ? this.css(key) : this.css(key, value));
}

// 定义 click 简化版
$.prototype.ck = function (callback) {
    this.on(_click_, callback);
}

// 定义 prev 简化版
$.prototype.pr = function (value) {
    return this.prev(value);
}

// 定义 next 简化版
$.prototype.n = function (value) {
    return this.next(value);
}

// 定义 nextUtil 简化版
$.prototype.nU = function (value) {
    return this.nextUntil(value);
}

// 定义 nextAll 简化版
$.prototype.nA = function (value) {
    return this.nextAll(value);
}

// 定义 children 简化版
$.prototype.ch = function (value) {
    return this.children(value);
}

// 定义 remove 简化版
$.prototype.rm = function (value) {
    return this.remove(value);
}

// 定义 empty 简化版
$.prototype.em = function (value) {
    return this.empty(value);
}

// 定义 each 简化版
$.prototype.e = function (callback) {
    this.each(callback);
}

// 定义 find 简化版
$.prototype.f = function (value) {
    return this.find(value);
}

// 定义 html 简化版
$.prototype.hm = function (value) {
    return (value === gUndefined ? this.html(): this.html(value));
}

// 定义 val 简化版
$.prototype.v = function (value) {
    return (value === gUndefined ? this.val() : this.val(value));
}

// 定义 width 简化版
$.prototype.w = function() {
    return this.width();
}

// 定义 innerWidth 简化版
$.prototype.iW = function() {
    return this.innerWidth();
}

// 定义 outerWidth 简化版
$.prototype.oW = function (flag = gFalse) {
    return this.outerWidth(flag);
}

// 定义 height 简化版
$.prototype.h = function() {
    return this.height();
}

// 定义 innerHeight 简化版
$.prototype.iH = function() {
    return this.innerHeight();
}

// 定义 outerHeight 简化版
$.prototype.oH = function (flag = gFalse) {
    return this.outerHeight(flag);
}

// 定义 offset 简化版
$.prototype.o = function() {
    return this.offset();
}

// 定义 offset().left 简化版
$.prototype.oL = function() {
    return this.offset().left;
}

// 定义 offset().top 简化版
$.prototype.oT = function() {
    return (this.offset() === gUndefined ? 0 : this.offset().top);
}

// 定义 position 简化版
$.prototype.pos = function() {
    return this.position();
}

// 定义 parent 简化版
$.prototype.p = function() {
    return this.parent();
}

// 定义 parents 简化版
$.prototype.ps = function (value) {
    return this.parents(value);
}

// 定义 append 简化版
$.prototype.ap = function (value) {
    return this.append(value);
}

// 定义 prepend 简化版
$.prototype.pp = function (value) {
    return this.prepend(value);
}

// 定义 before 简化版
$.prototype.bf = function (value) {
    return this.before(value);
}

// 定义 after 简化版
$.prototype.af = function (value) {
    return this.after(value);
}

// 定义 replaceWith 简化版（outerHTML）
$.prototype.rW = function (value) {
    return this.replaceWith(value);
}

// 定义 text 简化版
$.prototype.t = function (value) {
    return (value === gUndefined ? this.text() : this.text(value));
}

// 定义 toggle 简化版
$.prototype.tg = function (value) {
    this.toggle(value);
}

// 定义 trigger 简化版
$.prototype.tr = function (value) {
    this.trigger(value);
}

// 定义 unbind("click") 简化版
$.prototype.uC = function() {
    return this.off(_click_);
}

// 定义 unbind("hover") 简化版
// $.prototype.uH = function() {
//     return this.off(_mouseEnter_).off(_mouseLeave_);
// }

// ==================== JavaScript 方法调用简化 ==================== //

// 定义 match 简化版
String.prototype.m = function (value) {
    return this.match(value);
}

// 定义 replace 简化版
String.prototype.r = function (searchValue, replaceValue) {
    return this.replace(searchValue, replaceValue);
}

// 定义 replaceAll 简化版
String.prototype.rA = function (regExpString, value) {
    const re = new RegExp(regExpString, "g");
    return this.replaceAll(re, value);
}

// 去掉字符串中的英文句号 .
String.prototype.xD = function() {
    return this.replaceAll(/\./g, _);
}

// 定义 trim 简化版
String.prototype.x = function() {
    return this.trim();
}

// 定义 startsWith 简化版
String.prototype.sW = function (value) {
    return this.startsWith(value);
}

// 定义 endsWith 简化版
String.prototype.eW = function (value) {
    return this.endsWith(value);
}

// 定义 indexOf 简化版
String.prototype.i = function (value) {
    return this.indexOf(value);
}

// 定义 toLowerCase 简化版
String.prototype.l = function() {
    return this.toLowerCase();
}

// 定义 toUpperCase 简化版
String.prototype.u = function() {
    return this.toUpperCase();
}

// 定义 substring 简化版
String.prototype.ss = function (start, end) {
    return this.substring(start, end);
}

// 定义 split 简化版
String.prototype.sp = function (exp) {
    return this.split(exp);
}

// 定义 toString 简化版
function JS_toString(value) {
    return (value === gUndefined || value === gNull) ? value : value.toString();
}

// 定义 parseInt 简化版
function JS_parseInt(value) {
    return parseInt(value);
}

// 定义 parseFloat 简化版
function JS_parseFloat(value) {
    return parseFloat(value);
}

// 定义 Math.round 简化版
function JS_mathRound(value) {
    return Math.round(value);
}

// 定义 Math.ceil 简化版
function JS_mathCeil(value) {
    return Math.ceil(value);
}

// 定义 decodeURIComponent 简化版
function JS_decodeURIComponent(uri) {
    let result = V_isValidURIComponent(uri);
    return (result !== gFalse) ? result : uri;
}

// 定义 encodeURI 简化版
function JS_encodeURI(uri) {
    return (uri === gUndefined ? _ : encodeURI(uri));
}

// 定义 decodeURI 简化版
function JS_decodeURI(uri) {
    return (uri === gUndefined ? _ : decodeURI(uri));
}

// ========================================
// 定义 VLOOK UI 包
let V_ui_effect = 0, // 0: 无动效
    V_ui_processingAdjust= gFalse;

/**
 * 淡入显示
 * @param target 目标对象
 */
function V_ui_fadeShow(target) {
    target !== gUndefined
        && target.c(_visibility_, _visible_).c(_opacity_, 1);
}

/**
 * 淡出隐藏
 * @param target 目标对象
 */
function V_ui_fadeHide(target) {
    target !== gUndefined
        && target.c(_visibility_, _hidden_).c(_opacity_, 0);
}

/**
 * 获得当前垂直滚动条位置
 * @param source 指定对象，不指定是默认为 document
 */
function V_ui_getScrollTop(source) {
    return (source === gUndefined ? jq_Document.scrollTop() : source.scrollTop());
}

/**
 * 获得当前水平滚动条位置
 * @param scrollContainer 指定对象，不指定是默认为 document
 */
function V_ui_getScrollLeft(scrollContainer) {
    return (scrollContainer === gUndefined ? jq_Document.scrollLeft() : scrollContainer.scrollLeft());
}

/**
 * 设置滚动条位置
 * @param pos 滚动位置
 * @param scrollMarginTopSource 应用 scroll-margin-top 的对象，为空则不应用
 * @param scrollContainer 指定的对象，不指定是默认为整个文档
 * @param animation 是否以动画方式滚动
 */
function V_ui_setScrollTop(pos, scrollMarginTopSource = gUndefined, scrollContainer = gUndefined, animation = gFalse) {
    // 标记为程序触发的滚动
    iNavCenter.toc.lastTop = 0;

    // 自动滚动至目标位置
    if (scrollContainer === gUndefined)
        scrollContainer = DOM_html();

    // 处理是否应用 scroll-margin-top 的设置
    let offset = (scrollMarginTopSource !== gUndefined
        ? parseInt(scrollMarginTopSource.c(_scroll_ + "-" + _margin_top_))
        : 0);

    animation
        // 以动画方式滚动到目标位置
        ? scrollContainer.animate({ scrollTop: (pos - offset) }, gTransDuration)
        // 直接到达目标位置
        : scrollContainer.scrollTop(pos - offset);
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
//             V_util_preventDefault(event);
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
function V_ui_getCtrlKeyUI(unwrap = gTrue, short) {
    let key = short ? "⌃"
        : (env.os.macOS ? "⌃ control" : "⌃ Ctrl");
    return unwrap ? key : V_ui_wrap_kbd(key);
}

/**
 * 获得当前 OS 环境下的 Shift 键 UI 元素
 */
function V_ui_getShiftKeyUI(unwrap = gTrue, short) {
    let key = short ? "⇧" : "⇧ shift";
    return unwrap ? key : V_ui_wrap_kbd(key);
}

/**
 * 获得当前 OS 环境下的 Alt / Option 键 UI 元素
 */
function V_ui_getAltKeyUI(unwrap = gTrue, short) {
    let str = env.os.macOS
        ? (short ? "⌥" : "⌥ option") : "Alt";
    return unwrap ? str : V_ui_wrap_kbd(str);
}

/**
 * 获得当前 OS 环境下的 Windows / Command 键 UI 元素
 */
function V_ui_getMetaKeyUI(unwrap = gTrue, short) {
    let str = env.os.macOS
        ? (short ? "⌘" : "⌘ command") : "Win";
    return unwrap ? str : V_ui_wrap_kbd(str);
}

/**
 * 获取组合键组合的描述
 * @param event 事件对象
 */
function V_ui_getCombKeys(event) {
    return (event.ctrlKey ? V_ui_getCtrlKeyUI() : _)
        + (event.shiftKey ? V_ui_getShiftKeyUI() : _)
        + (event.altKey ? V_ui_getAltKeyUI() : _)
        + (event.metaKey ? V_ui_getMetaKeyUI() : _);
}

/**
 * 获得 VLOOK 与技术支持信息内容
 * @returns string VLOOK 与技术支持信息内容
 */
function V_ui_copyrightInfo() {
    return V_ui_div(_, _v_copyright_ +___+ _v_transition_all_,
        // V_ui_svgIcon(_icoVLOOK_, 20, 20, _btnFc_, _v_copyright_svg_ico_)
        V_ui_svgIcon(_icoVLOOK_, 20, 20, _current_color_, _v_copyright_svg_ico_)
        + _2nbsp_
        + _Published_via_ + V_ui_strong(V_ui_a(_, _httpsPrefix_ + _githubVlook_, _VLOOK_, __blank_))
        + '™ (' + gVer + ')'
        // +___+ '&amp;' +___+ + V_ui_strong(V_ui_a(_, _httpsPrefix_ + "www.typora.io", "Typora", __blank_)) + '.'
        // + _2nbsp_ + 'Support: ' + V_ui_strong(V_ui_a(_, _httpsPrefix_ + "qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi", "QQ Group"))
        // + ' / ' + V_ui_strong(V_ui_a(_, 'mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + V_ver + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + JS_encodeURI(env.info(gTrue)), "Email")) + '.'
    );
}

/**
 * 判断是否为小屏（包括移动端）
 */
function V_ui_isSmallScreen() {
    return jq_Window.oW() <= gSmallScreenWidth;
}

/**
 * 返回对象的容器尺寸信息
 * @param target JavaScript 对象
 * @returns
 */
function V_ui_getRect(target) {
    return target.getBoundingClientRect();
}

/**
 * 判断是否已隐藏
 */
function V_ui_isHidden(target) {
    return target !== gUndefined
        && (target.c(_display_) === _none_ || target.c(_visibility_) === _hidden_ || target.c(_opacity_) === "0");
}

/**
 * 判断是否已显示
 */
function V_ui_isShowed(target) {
    return !V_ui_isHidden(target);
}

/**
 * 判断是否有封面
 */
function V_ui_hasCover() {
    return VOM_cover() !== gUndefined;
}

/**
 * 判断是否在任意章节中（不包括封面）
 */
function V_ui_inHeader() {
    return iNavCenter.toc.inHeader();
}

/**
 * 工具栏样式切换
 * @param float true: 浮动，false: 不浮动
 */
function V_ui_toolbarFloat(float = gTrue) {
    let tb = iToolbar.ui,
        btnGroup = tb.ch(_v_btn__o__btn_group_);
    float ? (
        // 调整工具栏样式
        JQ_removeClass(tb, _v_float_card_),
        JQ_addClass(tb, _cover_),
        // 为工具栏按钮添加浮动样式
        JQ_addClass(btnGroup, _v_float_card_),
        JQ_addClass(btnGroup, _float_)
    )
    : (
        // 调整工具栏样式
        JQ_addClass(tb, _v_float_card_),
        JQ_removeClass(tb, _cover_),
        // 去掉工具栏按钮的浮动样式
        JQ_removeClass(btnGroup, _v_float_card_),
        JQ_removeClass(btnGroup, _float_)
    );
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
    op = (op === gUndefined ? "=" : op + "=");
    attrValue = (attrValue !== gUndefined) ? op + '"' + attrValue + '"': _;
    return "[" + attrName + attrValue + "]";
}

// 内嵌的流媒体平台选择器
let gSelector_iframeVideo = _iframe_ + V_attrCSS(_src_, "bilibili.com/" + _player_, "*") + "," + _iframe_ + V_attrCSS(_src_, "douyin.com/" + _player_, "*") + "," + _iframe_ + V_attrCSS(_src_, "ixigua.com/" + _iframe_, "*") + "," + _iframe_ + V_attrCSS(_src_, "qq.com/txp/" + _iframe_, "*") + "," + _iframe_ + V_attrCSS(_src_, "youtube.com/embed", "*");

/**
 * 修改文档的图标（即用于收藏夹、标签栏的图标）
 * @param iconData 图标数据，url("data:image/png:xxxx") 中的双引号内的内容
 */
function V_ui_changeDocIcon(iconData) {
    V_byID(_doc_icon_).rm();
    $("head").ap(V_ui_linkIcon(_doc_icon_, V_getImageData(iconData)));
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
    return '<' + _svg_ +___+ _width_ + '="' + w + 'px" ' + _height_ + '="' + h + 'px" ' + _class_ + '="' + _v_svg_ico_ + '-' + _small_ + classValue + '"' + extAttr + '>'
        + '<' + _use_ +___+ _class_ + '="' + _v_svg_ico_ + '-' + color + '" ' + V_attr(_xlink_href_, "#" + icon) + '>'
        + '</' + _use_ + '></' + _svg_ + '>';
}
function V_ui_svgIcon2(icon, w, h) {
    return '<' + _svg_ +___+ _width_ + '="' + w + 'px" ' + _height_ + '="' + h + 'px">'
        + '<' + _use_ +___+ V_attr(_xlink_href_, "#" + icon) + '>'
        + '</' + _use_ + '></' + _svg_ + '>';
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
 * 展开 details ，或父级元素为 details
 * @param target 目标对象
 */
function V_ui_openDetails(target) {
    if (target === gUndefined)
        return;

    // 针对任一父级元素为 details 的情况
    let detailsParent = target.closest(_details_);
    if (V_length(detailsParent) > 0 && !detailsParent[0].open) {
        detailsParent[0].open = gTrue;
        return gTrue;
    }

    // 如果为 details 则未展开，则自动展开
    if (V_tagName(target) === _details_ && !target[0].open) {
        target[0].open = gTrue;
        return gTrue;
    }
}

/**
 * 切换页签组项目
 * @param target 目标对象
 */
function V_ui_switchToTabItem(target) {
    let tabContent = target.closest(V_attrCSS(_data_tab_group_) + "," + V_attrCSS(_data_tab_group_id_));
    if (V_length(tabContent) > 0 && tabContent.c(_display_) === _none_) {
        let anchor = tabContent.ch(V_attrCSS(_id_)).first().a(_id_),
            tab = $(_span_ + V_attrCSS(_data_tab_for_, anchor));
        // 模拟点击对应页签项
        if (V_length(tab) > 0) {
            TabGroup_tabItemClick(tab, gFalse);
            return gTrue;
        }
    }
    return gFalse;
}

/**
 * 生成 img 标签
 * @param classValue class 属性值
 * @param alt alt 属性值
 * @param src src 属性值
 * @param srcset srcset 属性值
 * @param loading loading 属性值
 */
function V_ui_img(classValue, alt, src, srcset, loading) {
    classValue = (classValue !== gUndefined && V_length(classValue) > 0) ? ___+ V_attr(_class_, classValue) : _;
    alt = (alt !== gUndefined && V_length(alt) > 0) ? ___+ V_attr(_alt_, alt) : _;
    src = (src !== gUndefined && V_length(src) > 0) ? ___+ V_attr(_src_, src) : _;
    srcset = (srcset !== gUndefined && V_length(srcset) > 0) ? ___+ V_attr(_srcset_, srcset) : _;
    loading = (loading !== gUndefined && V_length(loading) > 0) ? ___+ V_attr(_loading_, _lazy_) : _;
    return '<' + _img_ + classValue + alt + src + srcset + loading + '>';
}

/**
 * 生成 iframe 标签
 * @param id id 属性值
 * @param name name 属性值
 * @param loading loading 属性值
 */
function V_ui_iframe(id, name, loading) {
    name = (name !== gUndefined && V_length(name) > 0) ? ___+ V_attr(_name_, name) : _;
    loading = (loading !== gUndefined && V_length(loading) > 0) ? ___+ V_attr(_loading_, _lazy_) : _;
    return V_ui_htmlTag(_iframe_, id, _, name + loading, _);
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
    return V_ui_htmlTag(_figure_, _, classValue, extAttr, content);
}

/**
 * 生成 figcaption 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
*/
function V_ui_figcaption(classValue, extAttr, content) {
    return V_ui_htmlTag(_figcaption_, _, classValue, extAttr, content);
}

/**
 * 生成 nav 标签
 * @param idValue id 属性值
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_nav(idValue, classValue, extAttr, content) {
    return V_ui_htmlTag(_nav_, idValue, classValue, extAttr, content);
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
    return V_ui_htmlTag(_header_, idValue, classValue, _, content);
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
 * 生成 sup 标签
 * @param classValue class 属性值
 * @param extAttr 扩展的自定义属性及属性值，如：data-attr1="123"
 * @param content 标签的内容
 */
function V_ui_sup(classValue, extAttr, content) {
    return V_ui_htmlTag(_sup_, _, classValue, extAttr, content);
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
 * 切换当前选择的条目样式
 * @param taregt 条目集合的父元素对象
 * @param item 新的当前条目对象
 * @param isChildren 指定的 target 是子元素，默认为 false
 */
function V_ui_tg_currentItem(taregt, item, isChildren = gFalse) {
    V_ui_tg_resetCurrentItem(taregt, isChildren);
    JQ_addClass(item, _v_item_current_);
}

/**
 * 重置当前选择条目的样式
 * @param taregt 条目集合的父元素对象
 * @param isChildren 指定的 target 是子元素，默认为 false
 */
function V_ui_tg_resetCurrentItem(taregt, isChildren = gFalse) {
    JQ_removeClass(isChildren
            ? taregt
            : taregt.ch("." + _v_item_current_),
        _v_item_current_);
}

/**
 * 设置 data-no-more 属性值
 * @param target 目标对象
 * @param items 记录集
 */
function V_ui_set_dataNoMore(target, items) {
    // 以下的 ·–·–· 是莫尔斯电码（Morse Code）中用于表示结束或没有更多内容的信号是 “AR”
    target.a(_data_no_more_, V_length(items) > 0 ? "· – · – ·" : "( " + V_lang_text67() + " )");
}

/**
 * 判断鼠标当前位置是否落在指定对象的区域范围内
 * @param target 指定对象
 * @param event 事件对象
 */
function v_ui_mouseDropIn(target, event) {
    if (target === gUndefined)
        return false;
    let mx = event.pageX || V_eventClientX(event) + gDocument.body.scrollLeft,
        my = event.pageY || V_eventClientY(event) + gDocument.body.scrollTop;
    return !(mx <= target.oL() || mx >= (target.oL() + target.oW())
        || my <= target.oT() || my >= (target.oT() + target.oH()));
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
 */
function V_ui_genGradColorCSS(gradientColors, fade) {
    let css = _,
        count = V_length(gradientColors),
        color = _;
    for (let i = 0; i < count; i++) {
        color = gradientColors[i];
        css += V_ui_var(___ac_ + color + fade);
        if (i < count - 1)
            css += ",";
    }
    return css;
}

/**
 * 垂直方向滚动时对更多内容的样式处理
 * @param target 滚动内容的父级对象
 * @param vertical 垂直方向滚动，如果是水平方向滚动则为 false
 */
function V_ui_scrolling(target, vertical = gTrue) {
    let scrollStart = V_ui_getScrollTop(target),
        clientSize = target[0].clientHeight,
        scrollSize = target[0].scrollHeight,
        startCss = _top_ + __more_,
        endCss = _bottom_ + __more_;

    // 水平方向滚动时
    !vertical
        && (
            scrollStart = V_ui_getScrollLeft(target),
            clientSize = target[0].clientWidth,
            scrollSize = target[0].scrollWidth,
            startCss = _left_ + __more_,
            endCss = _right_ + __more_
        );

    // 如有可滚动的内容时
    clientSize !== scrollSize
        && JQ_addClass(target, _scroll_);

    // 向后滚动后则显示开始位置的渐变条
    scrollStart > 0
        ? JQ_addClass(target, startCss)
        // 否则隐藏
        : JQ_removeClass(target, startCss);

    // 向后滚动到最末尾，则隐藏渐变条
    if (scrollStart + clientSize >= scrollSize - 10) {
        JQ_removeClass(target, endCss);

        // 添加无更多内容的提示样式，并强制滚动到最后
        vertical
            && JQ_addClass(target, _no_more_);
    }
    // 否则显示
    else if (scrollStart + clientSize < scrollSize - 10) {
        JQ_addClass(target, endCss);
        JQ_removeClass(target, _no_more_);
    }
}

// 定义滚动事件流控与防抖函数
let V_ui_disposeScroll = V_throttle(V_ui_scrolling, 1000), // 以限流控制方式调用
    V_ui_disposeScroll_stoped = V_debounce(V_ui_scrolling, 100); // 以防抖控制方式调用

/**
 * 绑定滚动后触发更多内容样式显示事件
 * @param target 滚动内容的父级对象
 * @param vertical 垂直方向滚动，如果是水平方向滚动则为 false
*/
function V_ui_bindScrollWithMoreContent(target, vertical = gTrue) {
    if (target === gUndefined)
        return;

    target.on(_scroll_, () => {
        // 滚动限流控制执行
        V_ui_disposeScroll(target, vertical);
        // 滚动后延时再执行一次
        V_ui_disposeScroll_stoped(target, vertical);
    });
}

/**
 * 触发滚动事件处理
 * @param target 滚动事件的目标对象
 * @param vertical true：垂直方向，false：水平方向
 */
function V_ui_scrollingUpdate(target, vertical = gTrue) {
    if (target === gUndefined)
        return;

    // 不能调用触发滚动事件 .tr(_scroll_)，会因限流控制无法正常触发
    V_ui_scrolling(target, vertical);
}

/**
 * 绑定并监控对象高度变化后触发滚动样式更新处理
 * @param target 滚动内容的父级对象
 * @param vertical 垂直方向滚动，如果是水平方向滚动则为 false
 * @returns MutationObserver 对象，可用于停止监听 disconnect()
*/
function V_ui_bindObserveHeightChange(target, vertical = gTrue) {
    if (V_isLength0(target))
        return;

    let observer = new MutationObserver(mutations => {
        for (let mutation of mutations)
            if (mutation.type === _child_ + "List" || mutation.type === _attribute_ + "s") {
                V_ui_disposeScroll(target, vertical);
                V_ui_disposeScroll_stoped(target, vertical);
            }
    });

    observer.observe(target[0], {
        attributeFilter : [_style_], // 监听特定属性
        // attributes: true, // 监听属性变化（如 style）
        childList: true, // 监听子元素新增/删除
        subtree : true // 监听所有后代元素
    });

    return observer;
}

/**
 * 初始 UI 国际化
 */
function V_ui_initI18n() {
    iToolbar.btns[_nav_center_].a(_data_tips_, V_lang_text6() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("O")));

    iToolbar.btns[_doc_lib_].a(_data_tips_, V_lang_text7() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("L")));

    iToolbar.btns[_paragraph_nav_].a(_data_tips_, V_lang_text8() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("J") + " , " + V_ui_wrap_kbd("K"))
        + V_ui_sup(_, _, _2br_ + V_lang_text28() + V_lang_text(33, [
            "切换步长大小",
            " to switch the step size"
        ]) + _br_ + V_ui_wrap_kbd(V_ui_getCtrlKeyUI()) + " / " + V_ui_wrap_kbd("⇧ shift")));

    iToolbar.btns[_spotlight_].a(_data_tips_, V_lang_text9() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("S"))
        + V_ui_sup(_, _, _2br_ + V_lang_text(33, [
            "切换聚光灯大小",
            "Toggle the size of the spotlight"
        ]) + _br_ + V_ui_wrap_kbd("⇧ Shift")));

    iToolbar.btns[_laser_pointer_].a(_data_tips_, V_lang_text10() + "\n" + V_ui_sub(_, _, V_ui_wrap_kbd("P")));

    iChapterNav.prev.ui.a(_data_tips_, V_ui_wrap_kbd("←") +___+ V_lang_text15());

    iChapterNav.next.ui.a(_data_tips_, V_lang_text16() +___+ V_ui_wrap_kbd("→"));

    iChapterNav.dt.a(_data_tips_, V_lang_text(13, [
        "回到封面",
        "Go back to the " + _document_ +___+ _cover_
    ]));

    iChapterNav.cur.ui.a(_data_tips_, V_lang_text(14, [
        "回到本章的开始",
        "Go back to the beginning of this chapter"
    ]));

    FigureNav_btns.prev.a(_title_, "[ ← ] " + V_lang_text15());

    FigureNav_btns.next.a(_title_, V_lang_text16() + " [ → ]");

    FigureNav_btns.close.a(_title_, "[ ESC ] " + V_lang_text17());

    iFontStyle.ui.f("." + _v_font_style_download_).hm(V_lang_text(19, [
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
 * @param source 源对象
 */
function V_ui_moveToCenter(source) {
    let l = (jq_Window.w() - source.oW()) / 2,
        r = _auto_;
    // 移动端的处理
    V_isMobile()
        && (
            l = 10,
            r = 10
        );

    source.c(_left_, l)
        .c(_right_, r)
        .c(_top_, (jq_Window.h() - source.h()) / 2);
}

/**
 * 移动到中间
 * @param source 源对象
 * @param target 目标对象
 */
function V_ui_moveToTarget(source, target) {
    let l = target.oL(),
        w = source.oW();
    if (l + w + 10 > jq_Window.w())
        l = jq_Window.w() - w - 10;

    source.c(_left_, l)
        .c(_top_, target.oT() - V_ui_getScrollTop() + target.h() + 10);
}

/**
 * 移动到指定的角
 * @param source 源对象
 * @param corner corner1:左上角，corner2:右上角，corner3:右下角，corner4:左下角
 */
function V_ui_moveToCorner(source, corner) {
    (corner === _corner_ + "3") &&
        source.c(_right_, 20)
            .c(_bottom_, 50);
}

/**
 * 进行文档导航相关的 UI 元素的适配处理
 */
function V_ui_adjustAll() {
    if (V_ui_processingAdjust)
        return;

    V_ui_processingAdjust = gTrue;

    iNavCenter.adjust()
        && ContentFolder_adjust();
    iChapterNav.adjust();

    iToolbar.adjust();
    // 适配相关的 UI
    MoreDocContent_updateUI();

    V_ui_processingAdjust = gFalse;
}

/**
 * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
 */
let V_ui_adjustAllDelay = V_debounce(() => { // 以防抖方式执行
    V_ui_adjustAll();
    ExtQuote_uniteColumnsHeight();
}, 100);

/**
 * 根据设备类型自适应 hover 样式（单个）
 */
// function V_ui_adjustHoverStyle(target) {
//     // 移动设备时解绑样式事件
//     V_isMobile()
//         ? target.uH()
//         // 非移动设备时绑定样式事件
//         : V_ui_bindHover(target);
// }

/**
 * 根据设备类型自适应 hover 样式（多个）
 */
// function V_ui_adjustHoverStyle2() {
//     // 移动设备时解绑样式事件
//     V_isMobile() ? (
//         $(_v_btn__o__btn_group_).uH(),
//         V_byClass(_v_segment_btn_).uH(),
//         V_byClass(_v_resume_reading_).uH(),
//         NavHistory_ui.uH(),
//         NavHistory_ui.ch(_div_).uH(),
//         StatusBar_ui.ch(V_not(V_attrCSS(_class_, "-" + _info_, "*"))).uH(),
//         V_byID(_vlook_toc_, ">." + _v_doc_lib_item_).uH(),
//         V_byClass(_v_std_code_).uH(),
//         V_byClass(_v_tag_).uH(),
//         V_byClass(_v_badge_name_).uH(),
//         V_byClass(_v_badge_value_).uH(),
//         V_byClass(_v_toc_item_).uH(),
//         V_byClass(_v_map_item_).uH(),
//         $(_summary_).uH(),
//         $(_v_tbl_row_g_btn_).uH()
//     )
//     // 非移动设备时绑定样式事件
//     : (
//         // 所有常规按钮 hover 事件处理
//         V_ui_bindHover($(_v_btn__o__btn_group_)),
//         // 所有导航中心分段控制按钮 hover 事件处理
//         V_ui_bindHover(V_byClass(_v_segment_btn_)),
//         V_ui_bindHover(V_byClass(_v_resume_reading_)),
//         V_ui_bindHover(NavHistory_ui),
//         V_ui_bindHover(NavHistory_ui.ch(_div_)),
//         // 状态栏上的按钮
//         V_ui_bindHover(StatusBar_ui.ch(V_not(V_attrCSS(_class_, "-" + _info_, "*")))),
//         // 文库按钮 hover 事件处理
//         V_ui_bindHover(V_byID(_vlook_toc_, ">." + _v_doc_lib_item_)),
//         // 代码、标签类 hover 事件处理
//         V_ui_bindHover(V_byClass(_v_std_code_)),
//         V_ui_bindHover(V_byClass(_v_tag_)),
//         V_ui_bindHover(V_byClass(_v_badge_name_)),
//         V_ui_bindHover(V_byClass(_v_badge_value_), gTrue),
//         V_ui_bindHover(V_byClass(_v_toc_item_)),
//         V_ui_bindHover(V_byClass(_v_doc_lib_item_)),
//         V_ui_bindHover(V_byClass(_v_map_item_)),
//         V_ui_bindHover($(_summary_)),
//         V_ui_bindHover($(_v_tbl_row_g_btn_))
//     );
//     // }
// }

/**
 * 为对象绑定 mouseenter 和 mouseleave 事件
 * @param target 目标对象
 * @param cancleParent 是否临时模拟取消父元素的 hover 处理（即 mouseenter 和 mouseleave）
 */
// function V_ui_bindHover(target, cancleParent) {
//     target.on(_mouseEnter_, (event) => {
//         let _t = V_eventCurrentTarget(event);
//         JQ_addClass(_t, _hover_);
//         cancleParent && JQ_removeClass(_t.p(), _hover_);
//     }).on(_mouseLeave_, (event) => {
//         let _t = V_eventCurrentTarget(event);
//         JQ_removeClass(_t, _hover_);
//         cancleParent && _t.p().tr(_mouseEnter_);
//     });
// }

/**
 * 为对象取消 hover 事件绑定
 * @param target 目标对象
 */
// function V_ui_unbindHover(target) {
//     target.off(_mouseEnter_).off(_mouseLeave_);
// }

/**
 * 初始化动效处理
 */
function V_ui_initEffectLevel() {
    // 动效等级为 2 或更高级时才开启毛玻璃动效（如遮罩、插图浏览器背景）
    V_ui_effect >= 2
        ? JQ_addClass(V_byClass(_v_backdrop_blurs_), _enabled_)
        : JQ_addClass(V_byClass(_v_backdrop_blurs_), _disabled_);

    // 以下动效等级为 1 或更高级时才开启
    // 开启后会影响图片剪影的 hover 效果（会有闪烁）
    // V_ui_addAnimate($("a " + _kbd_ + ",a " + _img_));

    // 针对移动端进行微调
    // V_isMobile() && (
    //     JQ_removeClass(V_byClass(_v_backdrop_blurs_), _enabled_),
    //     JQ_addClass(V_byClass(_v_post_card_ + "." + _hover_), _disabled_)
    // );
    V_isMobile()
        && (
            JQ_removeClass(V_byClass(_v_backdrop_blurs_), _enabled_),
            JQ_addClass(V_byClass(_v_backdrop_blurs_), _disabled_)
        );
}

/**
 * 为指定对象添加过渡动画
 * @param t 目标对象
 * @param css 应用的属性，不指定时默认为 “all”
 */
function V_ui_addAnimate(t, css) {
    if (V_ui_effect >= 1) {
        if  (css === gUndefined)
            JQ_addClass(t, _v_transition_all_);
        else {
            let attrSet = css.sp(___);
            for (let i = 0; i < V_length(attrSet); i++)
                JQ_addClass(t, _v_transition__ + attrSet[i]);
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
        JQ_removeClass(t, _v_transition_all_);
    else {
        let attrSet = css.sp(___);
        for (let i = 0; i < V_length(attrSet); i++)
            JQ_removeClass(t, _v_transition__ + attrSet[i]);
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
            combKeys = V_ui_getCombKeys(event);

        DEBUG(`CombKeys[${combKeys}] key[${key}] code[${event.code}]`);

        // 热键操作处理
        iSpotlight.hotkey(key, combKeys, event);
        iLaserPointer.hotkey(key, combKeys, event);
        iParagraphNav.hotkey(key, combKeys, event);
        WelcomePage_disposeHotkey(key, combKeys, event);
        FigureNav_disposeHotkey(key, combKeys, event);
        iNavCenter.hotkey(key, combKeys, event);
        iFontStyle.hotkey(key, combKeys, event);
        iInfoTips.hotkey(key, combKeys, event);
        iFootnote.hotkey(key, combKeys, event);
        LinkTool_disposeHotkey(key, combKeys, event);

        // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
        if (V_doc_block || gDocument.activeElement.tagName.l() !== _body_)
            return;

        // 无表格启用十字光标时
        !TableCross_disposeHotkey(key, combKeys, event)
            // 逐章导航热键操作处理
            && iChapterNav.hotkey(key, combKeys, event);

        if (V_noCombKeys(combKeys)) {
            switch (key) {
                case 'n': // N 显示/隐藏导航中心
                case 'N':
                    __showHideNavCenter();
                    break;
                case '/': // / 导航中心搜索
                    // 与 Firefox 的 / 快捷键会存在冲突
                    // 所以针对 Firefox，快捷键为 Ctrl + / 或 Cmd + /
                    // 阻止默认的浏览器行为
                    if (!iNavCenter.on) {
                        __showHideNavCenter();
                    }
                    iNavCenter.kw.in.focus();

                    // 自动读取并粘贴剪粘板的文本内容
                    navigator.clipboard.readText().then((value) => {
                            iNavCenter.kw.processInput(value);
                        }).catch((value) => {
                            ERROR("GET CLIPBOARD FAILED：", value);
                        });
                    break;
                case 'l': // L 文库
                case 'L':
                    iNavCenter.lib !== gUndefined && iNavCenter.lib.on
                        && iToolbar.btns[_doc_lib_].tr(_click_);
                    break;
                case 'd': // D Light / Dark Mode
                case 'D': // D Light / Dark Mode
                    StsColorScheme_ui.tr(_click_);
                    break;
                case 'a': // A 字体风格
                case 'A':
                    V_ui_isHidden(iFontStyle.ui)
                        ? StsFontStyle_ui.tr(_click_)
                        : iFontStyle.hide();
                    break;
                case 'm': // M 链接地图
                case 'M':
                    V_ui_isShowed(StsLinkMap_ui) && !LinkTool_isShowed()
                        ? StsLinkMap_ui.tr(_click_)
                        : LinkTool_hide.hide();
                    break;
                case 'j': // J,K 段落漫游
                case 'J':
                case 'k': // J,K 段落漫游
                case 'K':
                    !iParagraphNav.on
                        && (
                            iSpotlight.hide(),
                            iLaserPointer.hide(),
                            iParagraphNav.tg()
                        );
                    break;
                case 'p': // P 激活笔
                case 'P':
                    iParagraphNav.hide();
                    iSpotlight.hide();
                    iLaserPointer.tg();
                    break;
                case 's': // S 聚光灯
                case 'S':
                    iParagraphNav.hide();
                    iLaserPointer.hide();
                    iSpotlight.tg();
                    break;
                case 'e': // E 异常链接 / 地址
                case 'E':
                    !V_ui_isHidden(StsLinkChkResult_ui)
                        && LinkTool_show(_checked_);
                    break;
                case 'h': // H 历史
                case 'H':
                    NH_ViewHistory_ui.tr(_click_);
                    break;
            }
        }

        function __showHideNavCenter() {
            if (V_ui_isShowed(FigureNav_ui))
                return;
            iToolbar.btns[_nav_center_].tr(_click_);
        }
    });
}
// 定义 VLOOK UI 包
// ========================================

INFO("=== Load " + _Document_ + " ===");

// 定义 UI 元素
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
        V_isLength0(DOM_h)
            && (
                DOM_h = gUndefined,
                ERROR(_failed_ + "DOM.html ]")
            );
    }
    return DOM_h;
}

// 文档的 body 对象
let DOM_b = gUndefined;
function DOM_body() {
    if (DOM_b === gUndefined) {
        DOM_b = $(_body_);
        V_isLength0(DOM_b)
            && (
                DOM_b = gUndefined,
                ERROR(_failed_ + "DOM." + _body_ + " ]")
            );
    }
    return DOM_b;
}

// ==================== VLOOK 对象模型 ==================== //

// 定义 Markdown 导出为 HTML 的内容对象 (#write)
let VOM_d = gUndefined;
function VOM_doc() {
    if (VOM_d === gUndefined) {
        VOM_d = $(_idWrite_);
        V_isLength0(VOM_d)
            && (
                VOM_d = gUndefined,
                ERROR(_failed_ + "VOM.doc ]")
            );
    }
    return VOM_d;
}

// 封面对象
let VOM_c = gUndefined;
function VOM_cover() {
    if (VOM_c === gUndefined) {
        // to-do: 是否可以忽略第 1 个选择器（属于是编辑时的 YAML）
        // VOM_c = $(_idWrite_ + ">pre.md-meta-block" + __first_child_ + "+" + _h6_ + "," + _idWrite_ + ">" + _h6_ + __first_child_);
        VOM_c = $(_idWrite_ + ">" + _h6_ + __first_child_);
        if (V_isLength0(VOM_c)) {
            VOM_c = gUndefined;
            VOM_docTitle() === gUndefined
                && WARN(_failed_ + "VOM.c ], maybe no " + _cover_ + ": " + WINDOW_getHref());
        }
        else
            VOM_c.a(_id_, _vk_id_doc_cover_);
    }
    return VOM_c;
}

// 封底对象
let VOM_bc = gUndefined;
function VOM_backcover() {
    // 注意该方法调用，必须在 #vk-footer-area 的位置调整前完成
    if (VOM_bc === gUndefined) {
        let fns = V_byClass(_footnotes_area_);
        if (fns !== gUndefined) {
            let backcover = fns.pr(),
                tagName = V_tagName(backcover);
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
        VOM_dt = V_byID(_vk_id_doc_title_);
        V_isLength0(VOM_dt)
            && (
                VOM_dt = gUndefined,
                WARN(_failed_ + "VOM.dt ] " + WINDOW_getHref())
            )
    }
    return VOM_dt;
}

// ==================== 通用方法 ==================== //

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
String.prototype.isNumber = function() {
    return /^([-+])*\d+(\.\d+)?$/.test(this);
}

/**
 * 判断是否为百分数
 */
String.prototype.isPercent = function() {
    return /^([-+])*\d+(\.\d+)?%$/.test(this);
}

/**
 * 判断是否为货币型
 */
String.prototype.isCurrency = function() {
    return /^(\D{1,3} )([-+])*\d+(\.\d+)?$/.test(this);
}

/**
 * 生成环境信息段
 */
function V_envInfo(title, content) {
    return "    ├ " + title + "    ["
        + content
        + "]\n";
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

    iPhone 样例：
        - (Safari) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1
        - (Chrome) Mozilla/5.0 (iPhone; CPU iPhone OS 15_02 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/97.0.04692.72 Mobile/15E148 Safari/604.1
        - (Edge) Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0
        - (Firefox) Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/40.2 Mobile/15E148 Safari/605.1.15
        // 以下情况建议暂按以内核为判断标准 //
        - (QQ) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QQ/8.9.75.613 V1_IPH_SQ_8.9.75_1_APP_A Pixel/1125 MiniAppEnable SimpleUISwitch/0 StudyMode/0 CurrentMode/0 CurrentFontScale/1.000000 QQTheme/1000 AppId/537172547 Core/WKWebView Device/Apple(iPhone XS) NetType/WIFI QBWebViewType/1 WKType/1
        - (微信) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x18002830) NetType/WIFI Language/zh_CN
        - (钉钉) Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20G75 AliApp(DingTalk/7.0.50) com.laiwang.DingTalk/31322509 Channel/201200 language/zh-Hans-CN UT4Aplus/0.0.6 WK

    iPad 平板样例：
        - (iPad mini) Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
        - (iPad Air) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15
        - (iPad Pro) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15

    Android 平板样例：
        - (Galaxy Z Fold) Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36

    Windows 平板样例：
        - (Surface Pro 7) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36
        - (Surface Duo) Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36
        - (Asus Zenbook Fold) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
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
    brwVer : function () {
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
    lang : function () {
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
    info : function (silent = gFalse) {
        let info = "::: Environmental :::\n",
            r = info;
        !silent && LOG(info);

        info = V_envInfo("Lang",
            env.lang.base + "/" + env.lang.full
            + ", " + (V_lang_custom !== gUndefined
                ? V_lang_custom
                : (V_lang > -1
                    ? ["zh", "en"][V_lang]
                    : _none_)));
        r += info;
        !silent && LOG(info);

        info = V_envInfo("Device",
            (env.device.mobile ? "Mobile" : _)
            + (env.device.android ? "/Android" : _)
            + (env.device.iPhone ? "/iPhone" : _)
            + (env.device.iPad ? "/iPad" : _));
        r += info;
        !silent && LOG(info);

        info = V_envInfo("OS",
            (env.os.macOS ? "[macOS]"
                : (env.os.Windows ? "[Windows]"
                    : (env.os.iOS ? "[iOS]"
                        : (env.os.Linux ? "[Linux]" : "[Others]")))));
        r += info;
        !silent && LOG(info);

        info = V_envInfo("Browser",
            (env.browser.Chrome ? "Chrome / " + env.brwVer.Chrome : _)
            + (env.browser.Firefox ? "Firefox / " + env.brwVer.Firefox : _)
            + (env.browser.Safari ? "Safari / " + env.brwVer.Safari : _)
            + (env.browser.Edge ? "Edge / " + env.brwVer.Edge : _));
        r += info;
        !silent && LOG(info);

        info = V_envInfo("Core",
            (env.core.gecko ? "Gecko" : _)
            + (env.core.presto ? "Presto" : _)
            + (env.core.trident ? "Trident" : _)
            + (env.core.webkit ? "WebKit" : _));
        r += info;
        !silent && LOG(info);

        info = V_envInfo("DPR",
            env.display.DPR); // Device Pixel Ratio
        r += info;
        !silent && LOG(info);

        info = V_envInfo("Plugin",
            gVer
            + (V_devMode ? "<DEV>" : "-RELEASED" )); // 插件版本
        r += info;
        !silent && LOG(info);

        info = V_envInfo("Theme",
            (gThmName = V_getTemplateThemeName())
            + " / " + (gThmVer = V_getTemplateThemeVersion())); // 文档主题
        r += info;
        !silent && LOG(info);

        info = V_envInfo(V_lang_text82() + _Mode_,
            V_pageMode); // VLOOK 插件运行类型
        r += info;
        !silent && LOG(info);

        info = navigator.userAgent + "\n";
        r += info;
        !silent && LOG(info);

        return r;
    },

    /**
     * 屏幕上显示环境信息、Mermaid 信息等
     **/
    show : function (source) {
        let info = env.info()
            + "\n----------\n" + _Published_via_ +___+ _VLOOK_ + "™\n";
        LOG(info);
        Copy_action(source, info);
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

// 定义 vlook-query 预置选项及其调校参数初始化
function V_query_init() {
    // 优先级 1
    // 读取 URL Query 中的内容
    let queryUrl = new URLSearchParams(gLocation.search);
    __append(queryUrl);

    // 优先级 2
    // 读取 YAML 中定义的 vlook-query 预置选项内容
    let tmpQuery = V_getMetaByName(_vlook_query_),
        queryYaml = new URLSearchParams((tmpQuery === gUndefined ? _ : tmpQuery));
    __append(queryYaml);

    // 优先级 3
    // 读取主题配套的 vlook-query 预置选项内容
    tmpQuery = V_getVarVal("--" + _vlook_query_);
    let queryTheme = new URLSearchParams((tmpQuery === gUndefined ? _ : tmpQuery));
    __append(queryTheme);

    // 添加指定来源的调校参数（不重复的）
    function __append(params) {
        if (V_length(JS_toString(params)) > 0)
            for (let [key, value] of params)
                !V_query_params.has(key) && V_query_params.append(key, value);
    }
}
// ========================================

// ========================================
// 定义 VLOOK 检索对象实例
// 以 id 进行检索
function V_byID(idValue, extSelector = _) {
    if (!idValue)
        throw new Error("ID is undefined");
    return $(V_attrCSS(_id_, idValue) + extSelector);
    // 不要直接用 $("#" + ...) 的方式，对于特殊符号（如 $ 等）或中文 hash 会异常
    // return $("#" + idValue);
}

// 以 className 进行检索
function V_byClass(className) {
    return $("." + className);
}
// ========================================

// ========================================
// 定义 VLOOK 本地数据读/写

/**
 * 读取数据
 * @param key 键名
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_read(key, share) {
    return localStorage.getItem((share ? _ : V_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
        + key);
}

/**
 * 写入数据
 * @param key 键名
 * @param value 键值
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_write(key, value, share) {
    localStorage.setItem((share ? _ : V_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
        + key, value);
}

/**
 * 删除数据
 * @param key 键名
 * @param share 是否为同域名所有页面共享的键值，默认为不共享
 */
function V_data_remove(key, share) {
    return localStorage.removeItem(
        (share
            ? _
            : V_getUrlWithoutQueryAndHash(WINDOW_getHref()) + "-")
        + key);
}

// ========================================

// ========================================
// 定义 VLOOK 工具包

// 判断是否为移动端
function V_isMobile() {
    return env.device.mobile;
}

/**
 * 去掉指定内容中的前后的引号
 * 但如果是多组内容连接的情况则跳过处理，如："aaa","b","cc"
 * @param content 指定内容
 */
function V_removeQuotes(content) {
    return content.replace(/^"([^"]+)"$/, "$1");
}

/**
 * 获取指定对象的所有子元素（及其子元素）的文本内容
 * @param target 指定对象
 * @param separator 子元素间添加指定分隔符
 */
function V_joinNodesText(target, separator) {
    let nodesText = [];
    __getTextNodes(nodesText, target);
    return (V_length(nodesText) > 0 ? nodesText.join(separator) : _);

    function __getTextNodes(texts, node) {
        $(node).contents().e((index, element) => {
            // 处理文本节点
            if (element.nodeType === 3) {
                let txt = $(element).t().x();
                V_length(txt) > 0 && texts.push(txt); // 添加非空文本
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
function V_countWord(content) {
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

    let chineseCount = V_length(content.m(reChinese) || []),
        japaneseCount = V_length(content.m(reJapanese) || []),
        koreanCount = V_length(content.m(reKorean) || []),
        latinLikeCount = V_length(content.m(reLatinLike) || []),
        russianCount = V_length(content.m(reRussian) || []),
        arabicCount = V_length(content.m(reArabic) || []);

    let latin = latinLikeCount + russianCount + arabicCount,
        CJK = chineseCount + japaneseCount + koreanCount;
    return {
        latin: latin,
        CJK: CJK,
        total: latin + CJK
    };
}

/**
 * 获取对象的 length 值
 * @param source 源对象
 * @param value 新取值
 */
function V_length(source, value) {
    if (value === gUndefined)
        return (source === gUndefined || source == gNull) ? 0 : source.length;
    source.length = value;
}

/**
 * 对内容按指定属性值进行排序
 * @param container 内容的容器对象
 * @param itemSet 需要进行排序的对象集合
 * @param attr 需要进行排序控制的属性名
 * @param withText 是否联合文本内容参与排序
 */
function V_sortByAttr(container, itemSet, attr, withText) {
    itemSet.sort((a, b) => {
        let objA = $(a),
            objB = $(b),
            valueA = objA.a(attr),
            valueB = objB.a(attr);
        // 联合文本内容参与排序
        if (withText) {
            valueA += objA.t();
            valueB += objB.t();
        }
        // 以下以是以字符的 unicode 编码进行比较
        // 用 localeCompare 进行比较的话，存在不同国家或地区的排序结果不同
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
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
function V_isValidURIComponent(uri) {
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
 * 对象长度为 0
 * @param target 对象
 */
function V_isLength0(target) {
    return V_length(target) === 0;
}

/**
 * 获取 HTML 文档标题
 */
function V_getDocTitle() {
    return jq_Document.a(_title_);
}

/**
 * 获取 HTML <meta> 标签的内容
 * @param metaName 指定 meta 的名称
 * @returns 指定 meta 的内容
 */
function V_getMetaByName(metaName) {
    let content = $(_mata_ + V_attrCSS(_name_, metaName)).a(_content_);
    return ((content === gUndefined || V_isLength0(content) || content === "${" + metaName + "}") ? gUndefined : content);
}

/**
 * 获取启动参数的值
 * @param pName 启动参数名称
 * @returns string 启动参数的值，如果没有找到则返回 null
 */
function V_getParamVal(pName) {
    return V_query_params.get(pName);
}

/**
 * 获取 URL 中的参数数组
 * @param u 完整的 URL 内容
 */
function V_getUrlQueryParams(u) {
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
function V_getUrlHash(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("#");
    return i > -1 ? u.ss(i, V_length(u)) : _;
}

/**
 * 获取 URL 中的参数字符串
 * @param u 完整的 URL 内容
 */
function V_getUrlQueryString(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("?");
    return i > -1 ? u.ss(i + 1, V_length(u)) : _;
}

/**
 * 获取 URL 中的不含锚点的部分
 * @param u 完整的 URL 内容
 */
function V_getUrlWithoutHash(u) {
    if (u === gUndefined)
        return _;

    let i = u.i("#");
    return i > -1 ? u.ss(0, i) : u;
}

/**
 * 获取 URL 中的不含锚点、参数的部分
 * @param u 完整的 URL 内容
 */
function V_getUrlWithoutQueryAndHash(u) {
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
function V_getPath(u) {
    let qi = u.i("?"),
        ti = u.ss(0, qi).lastIndexOf("/"),
        pi = ti === -1 ? 0 : ti;
    return u.ss(0, pi + 1);
}

/**
 * 获得当前时间
 */
function V_getTime() {
    return new Date().getTime();
}

/**
 * 获取扩展名
 * @param url 文件名
 * @returns 带 "." 的扩展名
 */
function V_getExtension(url) {
    if (url === gUndefined)
        return _;
    let parts = url.sp(".");
    return parts.length > 1 ? "." + parts.pop().sp("?")[0] : _; // 移除查询参数部分
}

/**
 * 获得当前页面拖选的文本
 */
function V_getSelectedText() {
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
function V_clearHtmlQuot(text) {
    if (V_isLength0(text))
        return _;
    return text.r(/'/g, _)
        .r(/"/g, _);
}

/**
 * 绑定加载失败处理
 * @param fig 插图对象
 */
function V_bindLoadChecker(fig) {
    let src = fig.a(_src_);
    fig.on(_load_, () => {
        // 移除针对插图的加载提示样式
        JQ_removeClass(fig.p(), _loading_);

        // 对引用块分栏内的图片重新进行统一高度处理
        let blockquote = fig.closest(_blockquote_);
        V_length(blockquote) > 0
            && ExtQuote_uniteColumnsHeightByGroupId(blockquote.a(_data_quote_group_));
    });

    // 图片无法加载时加载默认图片
    fig.on(_error_, (event) => {
        // 将无法加载的图片信息添加到链接检查器
        let cp1 = fig.p().f(__v_cap1_).hm(),
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
        LinkTool_addToCheckResult(_error_ + __address_, targetToJump,
            V_ui_label(_, _, V_lang_text63()) + cp1);

        __loadDefaultOnError(V_eventCurrentTarget(event));
    });

    // 强制重新加载一次以触发error事件
    fig.a(_src_, src);

    /**
     * 加载默认图片
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        JQ_removeAttr(target, _alt_);
        JQ_removeAttr(target, _title_);
        JQ_addClass(target, _v_img_lost_);
    }
}

/**
 * 处理并返回省略后的文本
 * @param text 原始文本
 * @param limit 头、尾长度限制
 * @return String 省略后的文本
 */
// function V_util_truncateText(text, limit) {
//     let len = V_length(text);
//     if (len <= limit)
//         return text;
//
//     // 遍历字符串，计算指定字符的总数，中文字符按 2 个字符计算
//     let frontChars = __calcCharsLen(0, 1),
//         backChars = __calcCharsLen(len - 1, -1);
//
//     // 计算要保留的前面和最后的字符的数量
//     frontChars = (frontChars > limit ? Math.ceil(frontChars / 2) : frontChars);
//     backChars = (backChars > limit ? Math.ceil(backChars / 2) : backChars);
//
//     // 截取字符串并添加省略号
//     return text.ss(0, frontChars) + '...' + text.ss(len - backChars - 1, len - 1);
//
//     /**
//      * 计算指定长度字符的总数，中文字符按 2 个字符计算
//      * @param init 初始值
//      * @param step 步长
//      */
//     function __calcCharsLen(init, step) {
//         let count = 0,
//             i = init;
//         while (count < limit) {
//             count += (text.charCodeAt(i) > 255 ? 2 : 1)
//             i += step;
//         }
//         return count;
//     }
// }

/**
 * 重定位至锚点
 * @return boolean true：已进行重定向，false：无须进行重定向
 */
function V_redirectTo() {
    let hash = WINDOW_getHash();
    // 如果 URL 带锚点
    if (V_length(hash) > 0 && hash !== "#" + _vk_id_doc_title_) {
        LOG("    ↩ Redirect to h: " + JS_decodeURI(hash));
        WINDOW_setHref("#"); // 强制先清空当前 hash
        WINDOW_setHref(hash);
        return gTrue;
    }
    return gFalse;
}

/**
 * 跳转至页内锚点，并自动进行位置微调适配
 */
function V_gotoHash(hash) {
    WINDOW_setHref((hash.sW("#") ? _ : "#") + hash);
}

/**
 * 获取 CSS 变量值
 * @param varName CSS 变量名
 */
function V_getVarVal(varName) {
    return V_removeQuotes(getComputedStyle(gDocument.documentElement).getPropertyValue(varName).trim());
}

/**
 * 设置 CSS 变量值
 * @param varName CSS 变量名
 * @param value CSS 变量值
 */
function V_setVarVal(varName, value) {
    gDocument.documentElement.style.setProperty(varName, value);
}

/**
 * 获取 CSS 变量值中的图片数据，即 url("data:image/png:xxxx") 中双引号内的数据
 * @param varName CSS 变量名
 */
function V_getImageData(varName) {
    let prefix = 'url(';
    return (varName === gUndefined ? _ : varName.ss(varName.i(prefix) + V_length(prefix), V_length(varName) - 1));
}

/**
 * 获取事件当前对象
 */
function V_eventCurrentTarget(event) {
    return $(event.currentTarget);
}

/**
 * 获取 event.clientX 值
 */
function V_eventClientX(event) {
    return event.clientX;
}

/**
 * 获取 event.clientY 值
 */
function V_eventClientY(event) {
    return event.clientY;
}

/**
 * 取消事件冒泡
 */
function V_stopPropagation(event) {
    event.stopPropagation();
}

/**
 * 取消计时器，注意调用时要将结果赋值给同名的传入参数
 * @param timer 要取消的计时器对象
 */
function V_clearTimer(timer) {
    clearTimeout(timer);
    return gNull;
}

/**
 * 获取 HTML 文档使用的模板主题
 */
function V_getTemplateThemeName() {
    return V_getVarVal(___v_theme__ + _name_);
}
/**
 * 获取 HTML 文档使用的模板主题
 */
function V_getTemplateThemeVersion() {
    return V_getVarVal(___v_theme__ + _version_);
}

/**
 * 批量修改指定的 CSS 变量集
 * @param varSet 变量数组
 * @param flag 修改为指定变量集的标识
 */
function V_changeCssVarSet(varSet, flag) {
    // 生成目标颜色方案值列表
    let tmp = [];
    if (flag !== gUndefined) {
        for (let i = 0, len = V_length(varSet); i < len; i++) {
            tmp.push(V_getVarVal(varSet[i] + "-" + flag));
        }
    }
    // 遍历所有变量实现 ColorScheme 切换
    for (let i = 0, len = V_length(varSet); i < len; i++) {
        flag !== gUndefined
            ? V_setVarVal(varSet[i], tmp[i])
            : V_setVarVal(varSet[i], 0);
    }
}

/**
 * 判断 key 是否为 Escape
 * @param key
 */
function V_isEscape(key) {
    return key === _Escape_;
}

/**
 * 判断 combkeys 是否为 Escape
 * @param key
 */
function V_noCombKeys(key) {
    return V_isLength0(key);
}

/**
 * 获取 HTML 标签名称
 * @param target 标签对象
 */
function V_tagName(target) {
    let tagName = (target === gUndefined ? _ : target.prop(_tagName_));
    return (tagName === gUndefined ? _ : tagName.l());
}

/**
 * 获取纯文本节点内容（不包括子元素）
 * @param target 对象
 */
function V_textContent(target) {
    if (target === gUndefined || V_isLength0(target))
        return _;

    let text = _;
    target[0].childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE)
            text += node.nodeValue;
    });
    return text;
}

/**
 * 阻止默认事件行为
 * @param event 事件对象
 */
function V_preventDefault(event) {
    event.preventDefault();
}

// 定义 VLOOK 工具 包
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
    return str.r(/\.(\d+)/, "." + V_ui_span(_v_tbl_col_fmt_num_decimal_, _, "$1"));
}

/**
 * 对百分号进行格式化
 * @param str 需要进行格式化的目标字符串
 * @returns string 格式化后的字符串
 */
function V_formatting_percent(str) {
    return str.r(/%</, V_ui_span(_v_tbl_col_fmt_percent_, _, " %") + "<");
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
    return str.r(/>([a-z$¥￥]{0,3})\s/i, ">" + V_ui_span(_v_tbl_col_fmt_currency_, _, "$1"));
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
    gToc = V_byClass(_md_toc_);//V_by_Class(_vMdToc_);
    if (V_isLength0(gToc)) {
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
 * 判断是否属于插图
 * @param hash 插图路径的锚点
 * @param container img 对象的父级元素
 * @returns boolean true：不属于插图，false：属于插图
 */
function V_isNotFigure(hash, container) {
    let iconMode = hash.i("#icon") > -1,
        cardMode = hash.i("#card") > -1,
        logoMode = hash.i("#logo") > -1;
    return (iconMode || cardMode || logoMode || (container !== gUndefined && V_tagName(container) === _kbd_));
}

/**
 * 获取对象的 src 属性值（同时兼容「懒加载」模式）
 * @param target 对象
 * @returns src 或 data-src 的值
 */
function V_getSrcValue(target) {
    let src = target.a(_src_);
    // 针对「懒加载」，从 data-src 获取
    return (src === gUndefined ? target.a(_data_src_) : src);
}

/**
 * 稍后执行指定的回调函数
 * @param callback 要执行相关处理的函数
 * @param wait 等待的的时长
 */
function V_later(callback, wait) {
    return setTimeout(callback, wait);
}

/**
 * 通用的防抖控制
 * @param callback 要执行相关处理的函数
 * @param wait 延时执行的时长
 */
function V_debounce(callback, wait) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), wait);
    };
}

/**
 * 通用的限流控制
 * @param callback 要执行相关处理的函数
 * @param interval 执行间隔的时长
 */
function V_throttle(callback, interval) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            callback.apply(this, args);
        }
    };
}

/**
 * 初始化关键组件实例
 */
function V_init() {
    let sw = new Stopwatch();
    sw.st();
    iFontStyle = new FontStyle(new BgMask(_font_style_, _center_), V_getVarVal(___v_f__ + _style_));
    if (V_isLength0(iFontStyle))
        ALERT(_failed_ + "iFntThm ]");
    else {
        let fontStyle = V_getParamVal(_font_); // 调校参数指定
        // 如调校参数指定为 theme ，则清空同域名配置中保存的配置数据
        if (fontStyle !== gNull && fontStyle === _theme_)
            V_data_remove(_font_style_, gTrue);
        // 如调校参数无指定，再检查在同域名配置中是否有指定
        else if (fontStyle === gNull) {
            fontStyle = V_data_read(_font_style_, gTrue);
            fontStyle = (fontStyle === gNull ? gUndefined: fontStyle);
        }
        // 初始化
        iFontStyle.init(fontStyle);
    }
    sw.ed("    ├ Font Style: ");

    // ==================== UI====================

    // 聚光灯
    sw.st();
    iSpotlight = new Spotlight(180);
    V_isLength0(iSpotlight)
        && ALERT(_failed_ + "i" + _Spotlight_ + " ]");
    sw.ed("    ├ " + _Spotlight_ + ": ");

    // 激光笔
    iLaserPointer = new LaserPointer();
    V_isLength0(iLaserPointer)
        && ALERT(_failed_ + "i" + _Pointer_ + " ]");
    sw.ed("    ├ " + _Laser_ + _Pointer_ + ": ");

    // 长内容折叠
    sw.st();
    let cf = V_getParamVal(_fold_);
    ContentFolder_enabled = (cf !== _off_);
    // 指定对象（table,figure,codeblock）启用的处理
    if (cf !== gNull && cf !== _on_ && cf !== _off_) {
        ContentFolder_enabled_table = (cf.i(_table_) > -1);
        ContentFolder_enabled_figure = (cf.i(_figure_) > -1);
        ContentFolder_enabled_codeblock = (cf.i(_codeblock_) > -1);
    }
    ContentFolder_init();
    sw.ed("    ├ Content Folding: ");

    // 工具提示
    ToolTips_init();

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BgMask(_info_tips_, _center_));
    V_isLength0(iInfoTips)
        && ALERT(_failed_ + "iInfoTips ]");

    // 导航中心
    sw.st();
    gScrollMarginTop = JS_parseInt(V_getVarVal(___v_ + _scroll_ + "-" + _margin_top_)) * 1.1;
    iNavCenter = new NavCenter(new BgMask(_nav_center_, _left_, gTrue), V_getParamVal(_nav_));
    V_isLength0(iNavCenter)
        && ALERT(_failed_ + "iNavCenter ]");
    sw.ed("    ├ Nav Center: ");

    // 逐章导航
    sw.st();
    iChapterNav = new ChapterNav();
    if (V_isLength0(iChapterNav))
        ALERT(_failed_ + "iChapNav ]");
    sw.ed("    ├ " + _Chapter_ + " Nav: ");

    // 工具栏
    sw.st();
    iToolbar = new Toolbar();
    if (V_isLength0(iToolbar))
        ALERT(_failed_ + "iTb ]");
    else {
        // 导航中心按钮
        iToolbar.add(_nav_center_, (event) => {
            // 针对当前只显示了文库的处理
            if (iNavCenter.kw.in.v() === _vdl_)
                iNavCenter.kw.clear();

            // 显示导航中心
            V_ui_isSmallScreen() && !iNavCenter.on
                ? iNavCenter.tg()
                : iNavCenter.tg();

            // 阻止默认事件行为，避免与文档单击事件冲突
            // V_stopPropagation(event);
        });

        // 文库
        iToolbar.add(_doc_lib_, (event) => {
            if (iNavCenter.lib === gUndefined)
                return;

            if (iNavCenter.lib.counter > 1) {
                // !iNavCenter.on && iNavCenter.tg();
                // 选中目录分段
                iNavCenter.segs.setChecked(_toc_);
                // 设置关键字搜索的内容
                iNavCenter.kw.processInput(_vdl_);

                // 显示导航中心
                !iNavCenter.on
                    && iNavCenter.tg();
            }
            else
                iNavCenter.lib.show(_, _);

            // 阻止默认事件行为，避免与文档单击事件冲突
            // V_stopPropagation(event);
        });

        // 段落漫游
        iToolbar.add(_paragraph_nav_, () => {
            iLaserPointer.hide();
            iSpotlight.hide();
            iParagraphNav.tg();
        });

        // 聚光灯
        iToolbar.add(_spotlight_, () => {
            iLaserPointer.hide();
            iParagraphNav.hide();
            iSpotlight.tg();
        });

        // 激光笔
        iToolbar.add(_laser_pointer_, () => {
            iSpotlight.hide();
            iParagraphNav.hide();
            iLaserPointer.tg()
        });

        // 添加关联组件
        iNavCenter.toolbar = iToolbar;
        iSpotlight.toolbar = iToolbar;
        iLaserPointer.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontStyle.bindButton(iToolbar.btns[_font_style_]);
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
    V_isLength0(iFootnote)
        && ALERT(_failed_ + "iFootnote ]");

    // 导航历史
    NavHistory_init();

    // 状态栏
    StatusBar_init();

    sw.ed("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
function V_initKernel() {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.st("* " + _Document_ + " Logo");
    V_ui_changeDocIcon(V_getVarVal(___v_thm_fav_logo_));
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 无封面时的处理
    !V_ui_hasCover()
        // 添加文档大标题
        && VOM_doc().pp(V_ui_div(_vk_id_doc_title_, _v_doc__ + _title_ +___+ V_pageMode, V_getDocTitle()));


    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.st("* UI i18n");
    V_ui_initI18n();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 处理标记不发布的内容
    // 在所有扩展语法处理前执行
    V_getParamVal("unpub") !== _off_
        && Unpublish_init();

    // ----------------------------------------
    // 初始化封面四角配置
    iStopwatch.st("* VLOOK CC: ");
    CC_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 初始化 导航中心、章节导航 数据
    iStopwatch.st("* NavCenter");
    let navOK = NavCenter_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 自动生成可通过 DOM 引用块的目录自动编号
    HeaderAutoNum_initToc();

    // ----------------------------------------
    // 题注生成器指定按章节分组编号时的预处理
    V_getParamVal(_capgroup_) !== _off_
        && (
            iStopwatch.st("* Caption preprocess: "),
            Caption_groupPreppare(),
            iStopwatch.ed(_4space_)
        );

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

    // ----------------------------------------
    // 检查 hash 集
    if (V_getParamVal(_checkHash_) === "1") {
        LinkTool_checkHashMode = gTrue;
        // 检查 hash 集
        LinkTool_checkHashSet()
            && LinkTool_checkHashUI.show();
    }

    // ========================================
    // 对 Code Magic 处理
    // 注意：须在 ExtQuote 初始化之后执行
    // 包括了：标签、引用块着色、刮刮卡、文字注音等
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
    Footnote_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 带格式复制
    iStopwatch.st("* Rich Copy: ");
    Copy_init();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 分步分级处理
    iStopwatch.st("* Stepwise: ");
    BreadcrumbStyle_init();
    iStopwatch.ed(_4space_);

    // 对 VLOOK UI 统一样式适配处理
    // V_ui_adjustHoverStyle2();

    // 主要针对小屏情况，完成表格初始化后进行适配
    // 如果不是小屏，则由 adjustAll 触发
    ContentFolder_adjust();

    // ----------------------------------------
    // 检查页内链接坏链
    // 因涉及对 xmd 的处理，需要在文库处理之前（DocLib）进行
    iStopwatch.st("* Check Hash Link: ");
    LinkTool_mdToHtml();
    LinkTool_checkLink();
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 界面适配
    iStopwatch.st("* Adjust NavCenter/ChapterNav/FigureNav/Toolbar/StatusBar");
    if (navOK) {
        !V_isMobile()
            && iNavCenter.showHandle();

        V_ui_adjustAll();

        // 根据设备类型自适应 hover 样式
        // iNavCenter.toc.adjustHoverStyle();
        // iChapterNav.adjustHoverStyle();
        // FigureNav_adjustHoverStyle();
    }
    iStopwatch.ed(_4space_);

    // ----------------------------------------
    // 文档没有任何可索引的对象时，默认不显示导航中心
    let hasToc = iNavCenter.toc.hasItem(),
        hasFigure = iNavCenter.figures.hasItem(),
        hasTable = iNavCenter.tables.hasItem(),
        hasCodeblock = iNavCenter.codeblocks.hasItem(),
        hasFormula = iNavCenter.formulas.hasItem(),
        hasMedia = iNavCenter.media.hasItem();
    if (!hasToc && !hasFigure && !hasTable && !hasMedia && !hasCodeblock)
        iNavCenter.runMode = _close_;
    // 默认选择首个不为空的索引分类
    else {
        let itemName = _toc_;
        if (hasToc)
            itemName = _toc_;
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
    // --------------------------------------------------
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    gDocument.addEventListener("mousemove", (event) => {
        iSpotlight.repaint(event);
        iNavCenter.snap(event);
    });

    // to-do
    // mmMindmap_init();

    // --------------------------------------------------
    // 绑定文档单击事件
    jq_Document.uC().ck((event) => {
        TableCross_hide();

        // 在指定范围外的情况下，导航中心的显示与隐藏
        if ($(event.target).closest(_nav_).length === 0) {
            let classValue = iNavCenter.ui.a(_class_);
            if (classValue.i(_float_) > -1 || classValue.i(_small_) > -1)
                iNavCenter.hide();
        }
    });

    // --------------------------------------------------
    // 绑定文档的鼠标滚轮事件
    gDocument.addEventListener(_wheel_, () => {
        // 忽略处理，提升性能
        return false;
    }, false);

    // --------------------------------------------------
    // 添加可见性变化事件监听器，即监控非当前窗口和当前窗口之间的切换
    gDocument.addEventListener('visibilitychange', () => {
        // 页面不可见时，暂停递归调用
        if (gDocument.hidden) {
            gIsRunning = false;
            gTimer_saveLastPosition = V_clearTimer(gTimer_saveLastPosition);
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

    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // 页面滚动事件处理
    let // disposeScroll = V_throttle(__onScrolling, 500), // 以限流控制方式调用
        disposeScroll_stoped = V_debounce(__onScrolling, 100); // 以防抖控制方式调用
    // 绑定文档滚动、页面滚动事件
    jq_Document.on(_scroll_, () => {
        // 滚动限流控制执行
        // disposeScroll();
        // 滚动后延时再执行一次
        disposeScroll_stoped();
    });
    // 滚动处理
    function __onScrolling() {
        let scrollTop = V_ui_getScrollTop();

        // 显示或隐藏文档更多内容遮罩栏
        MoreDocContent_refresh(scrollTop);

        // 更新阅读进度
        V_setVarVal(___v_ + _scroll_ + "-prog",
            parseInt(scrollTop / (VOM_doc()[0].clientHeight - $(gWindow).h()) * 100) + "%");

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iNavCenter.toc.focusHeader(scrollTop);

        // 根据屏幕大小进行不同的适配控制
        if (scrollTop > 0)
            V_ui_adjustAll();
        // 针对人工方式快速滚动到屏幕顶部后，用延时处理，避免无法识别是否在封面的情况
        else
            V_later(() => {
                V_ui_adjustAll();
            }, 100);
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    // --------------------------------------------------
    // 绑定窗口大小缩放事件
    jq_Window.on("resize", V_debounce(() => { // 以防抖控制方式执行
        // 缩放过程不处理，只在缩放操作结束后再延时执行
        TableCross_hide();
        iNavCenter.toc.focusHeader();

        V_ui_adjustAll();
        // 如果是小屏则强制隐藏
        iNavCenter.on && V_ui_isSmallScreen()
            && iNavCenter.hide();

        ExtQuote_uniteColumnsHeight();
    }, 1000));

    // --------------------------------------------------
    // 接收消息数据
    gWindow.onmessage = function(event) {
        // 校验新版本检查结果消息合法性
        let receMessage = JS_toString(event.data);
        // ！！！不要删除！！！用于测试效果
        // 用于模拟测试使用
        // receMessage = "chk-update:yes,latest:27.1";
        // receMessage = "chk-update:yes";
        // receMessage = "chk-update:no";
        LOG("<- " + event.origin + "\n" + receMessage);
        if ((event.origin !== StsNewVersion_checkOriginCloudFlare
            || event.origin !== StsNewVersion_checkOriginGitHub)
            && (!receMessage.sW(_chkUpdate_) || receMessage.length > 50)) {
                ERROR(_Invalid_ + " data from " + event.origin);
                ERROR("[" + receMessage.length + "]", receMessage);
            return;
        }

        // ！！！不要删除！！！用于测试效果
        // 用于模拟测试使用
        // receMessage = "chk-update:yes,latest:29.0";
        // receMessage = "chk-update:no,latest:26.2";
        // receMessage = "chk-update:yes";
        // 处理新版本检查结果
        V_data_write(_new_version_check_time_, V_getTime(), gTrue);
        let gVerFloat = gVer.ss(1, gVer.length);
        if (receMessage.i(":" + _yes_) > -1) {
            let verStr = "latest:",
                verStart = receMessage.i(verStr),
                latestVer = (verStart > -1
                ? receMessage.ss(verStart + V_length(verStr), receMessage.length) // 从 27.0 开始启用的新格式数据
                : JS_parseFloat(gVerFloat) + 0.01 // 兼容旧格式数据
             );
            // 显示新版本提示
            NewVersion_yes(latestVer);
            // 本地缓存检查结果
            V_data_write(_new_version_,
                receMessage.ss(verStart + V_length(verStr), receMessage.length),
                gTrue);
    }
        else
            V_data_write(_new_version_, gVerFloat, gTrue);
    };

    // --------------------------------------------------
    // 监听页内锚点链接跳转
    // 注意：同一个锚点连续点击不会触发该事件
    //
    // 对于页面滚动位置的变化，会涉及以下几种情况：
    // 1. URL 中带锚点
    // 2. 在页面中跳转到页内指定锚点
    //   - 标题类锚点（如 h1, h2）
    //   - 类标题锚点（由插件生成的，如题注内容的锚点、引用块小标题）
    //   - 非标题锚点，不是由内容生成的锚点（如索引的内容、无效链接等，以 vk- 开头）
    // 3. 在页签组中切换显示对应的内容
    //
    jq_Window.on("hashchange", () => {
        let hash = WINDOW_getHash(),
            anchor = hash.ss(1, V_length(hash));
        if (V_length(anchor.x()) === 0 || anchor.sW("#"))
            return;

        // 添加到导航历史
        NavHistoryList.add(hash);

        let hashObj = $(V_attrCSS(_id_, JS_decodeURIComponent(anchor)));
        if (V_length(hashObj) > 0) {
            // --------------------
            // 对于目标锚点在 details 内的处理（主要针对移动端的兼容性处理）
            V_ui_openDetails(hashObj)
                && V_ui_setScrollTop(hashObj.oT(), hashObj);

            // --------------------
            // 对于目标锚点所属的容器被页签组所隐藏时的处理
            if (!V_ui_switchToTabItem(hashObj))
                // 非页签组相关内容的处理（CSS 中的 scroll-margin-top 需要配合滚动处理才能生效）
                V_ui_setScrollTop(hashObj.oT(), hashObj, gUndefined, gFalse);
        }

        gLastHash = hash;

        // 若导航中心没有显示（且不是 small 模式时），则强制进行延时适配处理（如从封面直接到指定章节）
        !iNavCenter.on && !V_isMobile() && !iNavCenter.isSmall()
            && V_ui_adjustAllDelay();
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
// 灰色模式 Gray Mode

/**
 * 初始化 Gray Mode
 */
let StsGray_ui = gUndefined;
function GrayMode_init() {
    // 先判断是否通过 query 参数临时停用
    if (V_getParamVal(_gray_) === _off_)
        return;
    // 强制启用
    else if (V_getParamVal(_gray_) === "force") {
        __enableGrayMode(__today(new Date()), _);
        return;
    }

    // 获取需要增加的日期集合
    let grayModeValue = V_getMetaByName(_vlook_gray_mode_);
    // 文档无指定灰色模式配置时，尝试取主题配套的 vlook-gray-mode 预置选项内容
    if (grayModeValue === gUndefined)
        grayModeValue = V_getVarVal("--" + _vlook_gray_mode_);

    // ！！！不要删除！！！用于测试效果
    // 用于调试
    // grayModeValue = __today(new Date()) + ":测试;12-13:国家公祭日@zh;04-04:清明节@zh,ko";
    if (V_length(grayModeValue.x()) === 0)
        return;

    let valueSet = grayModeValue.sp(";");
    for (let i = 0; i < V_length(valueSet); i++) {
        let item = valueSet[i].m(/^((\d{2}-\d{2}):([^@]+))?(@([a-zA-Z,]{2,}))?$/);
        // 格式不匹配则忽略
        if (item === gNull)
            continue;

        // 匹配指定的语言环境，为空则表示不限制语言
        if (item[5] === gUndefined || item[5].l().i(env.lang.base) > -1) {
            // 获取当前日期
            if (item[2] === __today(new Date())) {
                // 启用
                __enableGrayMode(item[2], item[3]);
                break;
            }
        }
    }

    // 启用「灰色模式」
    function __enableGrayMode(date, title) {
        // 添加 灰色模式 样式
        JQ_addClass(DOM_body(), _gray_);

        StsGray_ui = V_byClass(_v_sts_gray_);
        // 灰色模式 选中样式
        JQ_addClass(StsGray_ui, _selected_);

        ToolTips_bind(StsGray_ui, V_lang_text17() +___+ V_lang_text48());

        // 设置灰色模式数据
        StsGray_ui.a(_data_date_, date);
        StsGray_ui.a(_data_title_, title);
        StsGray_ui.uC().ck(() => {
            iInfoTips.hide();
            JQ_removeClass(StsGray_ui, _selected_);
            JQ_removeClass(DOM_body(), _gray_);
        });
    }

    // 返回今天的日期（短格式），如：10-01
    function __today(date) {
        return __padZero(date.getMonth() + 1) + "-" + __padZero(date.getDate())
    }

    // 月份、日期前补零对齐
    function __padZero(value) {
        return value < 10 ? `0${value}` : value;
    }
}

/**
 * 临时关闭 Gray Mode
 */
function GrayMode_close() {
    // 当前启用了「灰色模式」的处理
    if (DOM_body().a(_class_).i(_gray_) > -1) {
        iInfoTips.bubble(
            V_ui_strong(
                V_lang_text(87, [
                    "今天是",
                    "Today is"
                ]) + _2nbsp_ + StsGray_ui.a(_data_title_) + " (" + StsGray_ui.a(_data_date_) + ")"
            ) + _2br_
            + V_lang_text(88, [
                "本页面今天会以 " + _display_mode_ + " 显示",
                "This page will be displayed in " + _display_mode_
            ]).r(_display_mode_, V_ui_strong(V_lang_text48())) + "<hr>"
            + V_ui_sub(_, _,
                V_ui_svgIcon(_icoGray_, 20, 20, _theme_)
                +___+ V_lang_text(89, [
                    "点击下面该按钮可临时关闭",
                    "Click the button below to temporarily turn it off"
                ])
            )
            , 5000, _corner_ + "3");
    }
}
// 灰色模式 Gray Mode
// ========================================

// ========================================
// 定义 VLOOK 语言类
let V_lang = -1,
    V_lang_custom = gUndefined;

/**
 * 初始化语言
 */
function V_lang_init() {
    switch (env.lang.base) {
        case "zh":
            V_lang = 0; // 简体中文
            break;
        default:
            V_lang = 1; // 英语（默认）
    }

    // 通过 meta 指定的语言包
    // 先尝试匹配语种子集
    let zhSet = env.lang.full;
    if (zhSet === "zh-tw" || zhSet === "zh-mo") // 台湾、澳门统一使用香港版本繁体
        zhSet = "zh-hk";
    let vlookLang = V_getMetaByName(_vlook__ + _lang_ + "-" + zhSet);
    // 子集为空时，再尝试匹配主语种
    if (vlookLang === gUndefined)
        vlookLang = V_getMetaByName(_vlook__ + _lang_ + "-" + env.lang.base);
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

    let text = V_getMetaByName(_vk__ + V_lang_custom + textId);
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
// 获取语言 ID 4 内容
function V_lang_text4() {
    return V_lang_text(4, [
        "已启用",
        "Enabled"
    ]);
}
// 获取语言 ID 6 内容
function V_lang_text6() {
    return V_lang_text(6, [
        "导航中心",
        _Navigation_ + " Center"
    ]);
}
// 获取语言 ID 7 内容
function V_lang_text7() {
    return V_lang_text(7, [
        "浏览" + _doc_lib_cn_,
        _Document_ + " Library"
    ]);
}
// 获取语言 ID 8 内容
function V_lang_text8() {
    return V_lang_text(8, [
        "段落漫游",
        "Paragraph Roaming"
    ]);
}
// 获取语言 ID 9 内容
function V_lang_text9() {
    return V_lang_text(8, [
        "聚光灯",
        _Spotlight_
    ]);
}
// 获取语言 ID 10 内容
function V_lang_text10() {
    return V_lang_text(10, [
        "激光笔",
        _Laser_ +___+ _Pointer_
    ]);
}
// 获取语言 ID 15 内容
function V_lang_text15() {
    return V_lang_text(15, [
        "前一个",
        _Previous_
    ]);
}
// 获取语言 ID 16 内容
function V_lang_text16() {
    return V_lang_text(16, [
        "后一个",
        _Next_
    ]);
}
// 获取语言 ID 17 内容
function V_lang_text17() {
    return V_lang_text(17, [
        "关闭",
        _Close_
    ]);
}
// 获取语言 ID 18 内容
function V_lang_text18() {
    return V_lang_text(18, [
        "公式",
        "Formel"
    ]);
}
// 获取语言 ID 22 内容
function V_lang_text22() {
    return V_lang_text(22, [
        "所有脚注",
        "All " + _footnotes_
    ]);
}
// 获取语言 ID 28 内容
function V_lang_text28() {
    return V_lang_text(28, [
        "按住",
        "Press and hold"
    ]);
}
// 获取语言 ID 35 内容
function V_lang_text35() {
    return V_lang_text(35, [
        "目录",
        "Table of Contents"
    ]);
}
// 获取语言 ID 38 内容
function V_lang_text38() {
    return V_lang_text(38, [
        "已就绪",
        _Ready_
    ]);
}
// 获取语言 ID 41 内容
function V_lang_text41() {
    return V_lang_text(41, [
        "字体风格",
        _Font_ + " " + _Style_
    ]);
}
// 获取语言 ID 44 内容
function V_lang_text44() {
    return V_lang_text(44, [
            "字数",
            "words"
        ]);
}
// 获取语言 ID 45 内容
function V_lang_text45() {
    return V_lang_text(45, [
        "外观",
        "Appearance"
    ]);
}
// 获取语言 ID 48 内容
function V_lang_text48() {
    return V_lang_text(48, [
        "灰色模式",
        "Gray " + _Mode_
    ]);
}
// 获取语言 ID 53 内容
function V_lang_text53() {
    // ⚠
    return "‼️ " + V_lang_text(53, [
        "重复的标题/题注",
        "Duplicate Title/Caption"
    ]);
}
// 获取语言 ID 54 内容
function V_lang_text54() {
    return "🚫 " + V_lang_text(54, [
        "无效页内链接",
        _Invalid_ + " Inner Link"
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
// 获取语言 ID 63 内容
function V_lang_text63() {
    // 🚫
    return "❌ " + V_lang_text(63, [
        "无效的资源地址",
        _Invalid_ + " resource address"
    ]);
}
// 获取语言 ID 65 内容
function V_lang_text65() {
    return V_lang_text(65, [
        "导航历史",
        _Navigation_ +___+ _history_
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
// 获取语言 ID 78 内容
function V_lang_text78() {
    return V_lang_text(78, [
        "继续上次的阅读",
        "Resume Reading"
    ]);
}
// 获取语言 ID 81 内容
function V_lang_text81() {
    return V_lang_text(81, [
        "异常的链接 / 地址",
        "Invalid link / address"
    ]);
}
// 获取语言 ID 82 内容
function V_lang_text82() {
    return V_lang_text(82, [
        "页面",
        "Page"
    ]);
}
// 定义 V.lang
// ========================================

// ========================================
// 文档类
let V_doc_block = gFalse; // 当前文档是否被模态窗口阻塞

/**
 * 冻结文档滚动
 */
function V_doc_scroll_freeze() {
    // 切换文档滚动控制
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
    V_doc_counter_formula = 0, // 公式总数
    V_doc_counter_audio = 0, // 非 mini 模式音频总数
    V_doc_counter_audiomini = 0, // mini 模式音频总数
    V_doc_counter_video = 0, // 视频总数
    V_doc_counter_details = 0, // 详情总数
    V_doc_counter_tagGroup = 0; // 连续内容转换为页签组的总数

/**
 * 初始化外部链接（如：http://、https://、ftp://、站内链接等）
 */
function V_doc_link_adjustExternal() {
    $("a" + V_not(V_attrCSS(_href_, "#", "^"))).e((index, element) => {
        let a = $(element),
            href = a.a(_href_);
        // 跳过指定类型链接
        if (href === gUndefined || href.x() === _ || href.sW("?")) // ? 开头的如 ?target=vdl
            return gTrue; // 跳过当前循环

        // 为其添加 target 参数
        a.a(_target_, a.a(_href_));

        // 如果指定关闭文库，则所有外部链接都自动添加同名参数
        if (iNavCenter.lib !== gUndefined && iNavCenter.lib.off) {
            let page = V_getUrlWithoutQueryAndHash(href),
                queryStr = V_getUrlQueryString(href),
                hash = V_getUrlHash(href);
            // 添加同名参数
            queryStr += ((V_length(queryStr) > 0 ? "&" : _) + "vdl=off");
            a.a(_href_, page + "?" + queryStr + hash);
        }
    });

    // 处理带链接的标签（标签链接）
    $("a>:is(." + _v_tag_ + ",." + _v_badge_name_ + ")").e((index, element) => {
        let a = $(element).p(),
            dataHref = _data__ + _href_,
            dataTarget = _data__ + _target_;

        // 对链接的属性处理
        a.a(dataHref, a.a(_href_));
        a.a(dataTarget, a.a(_target_));
        JQ_removeAttr(a, _href_);
        JQ_removeAttr(a, _target_);

        // 添加独立的打开链接的入口
        a.pp(V_ui_span(_v_tag_link, _, "→ " + V_lang_text(86, [
            "点击这里打开链接",
            "Click here to open the link"
        ])));

        // 转移链接事件处理
        a.ch("." + _v_tag_link).uC().ck(() => {
            gWindow.open(a.a(dataHref), a.a(dataTarget), "noopener,noreferrer");
        });
    });

}
// ========================================

// ========================================
// 定义 VLOOK 埋点数据统计
// 上报事件的累计次数，用于标识不同的上报事件 iframe 的 id
let V_report_count =  0;

/**
 * 提交统计数据
 */
// function V_report_submit(loadTimeCost) {
function V_report_submit() {
    // 基本信息：VLOOK
    let sd = "?p=vlook"
        + "&ver=" + V_ver
        + "&thm=" + V_getTemplateThemeName()
        + "&url=" + WINDOW_getHref();

    // if (1 === 2) {
    //     sd += "&d=" + (V_util_isMobile() ? "mob" : _) // 设备类型
    //         + "&dpr=" + env.display.DPR; // DPR

    //     // 信息：OS
    //     sd += "&os=";
    //     if (env.os.macOS)
    //         sd += "macOS";
    //     else if (env.os.Windows)
    //         sd += "Windows";
    //     else if (env.os.iOS)
    //         sd += "iPhone";
    //     else if (env.os.Linux)
    //         sd += "iPhone";
    //     else
    //         sd += "others";

    //     // 浏览器及版本
    //     sd += "&b=";
    //     if (env.browser.Edge)
    //         sd += "edge&bv=" + env.brwVer.Edge;
    //     else if (env.browser.Chrome)
    //         sd += "chrome&bv=" + env.brwVer.Chrome;
    //     else if (env.browser.Firefox)
    //         sd += "firefox&bv=" + env.brwVer.Firefox;
    //     else if (env.browser.Safari)
    //         sd += "safari&bv=" + env.brwVer.Safari;
    //     else
    //         sd += "others&bv=";

    //     // 浏览器的颜色方案
    //     sd += "&cs=" + V_util_getVarVal(___v_color_scheme_).rA('"', _);

    //     sd += "&lang=" + V_lang // 浏览器语言
    //         + "&size=" + V_length(VOM_doc().t()) // 文档大小
    //         + "&time=" + loadTimeCost; // 加载文档时间

    //     // 插图数据：图片
    //     sd += "&" + _img_ + "=" + V_length(V_byClass(_v_fig_))
    //         + "&" + _img_ + "-fold=" + V_length($("p" + V_attrCSS(_data_cntr_, _img_) + V_attrCSS(_data_content_folded_, _true_)))
    //         + "&" + _img_ + "-fill=" + V_length($(_img_ + V_not(V_attrCSS(_data_img_fill_))))
    //         + "&" + _img_ + "-" + _invert_ + "=" + V_length($(_img_ + V_attrCSS(_data_dark_src_, _invert_)))
    //         + "&" + _img_ + "-alter=" + V_length($(_img_ + V_attrCSS(_data_dark_src_, _alter_)))
    //         + "&" + _img_ + "-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_fig_, "^") + V_attrCSS(_data_id_fig_type_, _img_) +___+ __v_cap1_))
    //         + "&" + _img_ + "-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_fig_, "^") + V_attrCSS(_data_id_fig_type_, _img_) +___+ __v_cap2_));

    //     // 插图数据：Mermaid
    //     let mermaid = V_byClass(_md_diagram_panel_);
    //     sd += "&mm=" + V_length(mermaid)
    //         + "&mm-fold=" + V_length($(_div_ + V_attrCSS(_data_cntr_, _svg_) + V_attrCSS(_data_content_folded_, _true_)))
    //         + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_fig_, "^") + V_attrCSS(_data_id_fig_type_, _svg_) +___+ __v_cap1_))
    //         + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_fig_, "^") + V_attrCSS(_data_id_fig_type_, _svg_) +___+ __v_cap2_));

    //     // 音频数据
    //     sd += "&audio=" + V_length($(_audio_))
    //         + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_audio_, "^") +___+ __v_cap1_))
    //         + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_audio_, "^") +___+ __v_cap2_));

    //     // 视频数据
    //     sd += "&video=" + V_length($(_video_))
    //         + "&mm-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_video_, "^") +___+ __v_cap1_))
    //         + "&mm-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_video_, "^") +___+ __v_cap2_));

    //     // 图片细分：Mermaid 图
    //     let pie = 0,
    //         flow = 0,
    //         flowSTART = 0,
    //         flowINIT = 0,
    //         state = 0,
    //         seq = 0,
    //         classD = 0,
    //         gantt = 0;
    //     mermaid.e((index, element) => {
    //         let _t = $(element);
    //         if (V_length(_t.f("g.legend")) > 0)
    //             pie++; // 饼图
    //         else if (V_length(_t.f("g.output g.nodes")) > 0) {
    //             flow++; // 流程图
    //             if (V_length(_t.f("g.output g.nodes g#START.node")) > 0)
    //                 flowSTART++; // VLOOK 标准的流程图
    //             else if (V_length(_t.f("g.output g.nodes g#INIT.node")) > 0)
    //                 flowINIT++; // VLOOK 标准的状态机图
    //         }
    //         else if (V_length(_t.f("g.stateGroup")) > 0)
    //             state++; // 状态机图（原生）
    //         else if (V_length(_t.f("g rect.actor")) > 0)
    //             seq++; // 顺序图
    //         else if (V_length(_t.f("g.classGroup")) > 0)
    //             classD++; // 类图
    //         else if (V_length(_t.f("g rect.section")) > 0)
    //             gantt++; // 甘特图
    //     });
    //     sd += "&mm-pie=" + pie
    //         + "&mm-flow=" + flow
    //         + "&mm-flow-S=" + flowSTART
    //         + "&mm-flow-I=" + flowINIT
    //         + "&mm-state=" + state
    //         + "&mm-seq=" + seq
    //         + "&mm-class=" + classD
    //         + "&mm-gantt=" + gantt;

    //     // 表格数据
    //     sd += "&tbl=" + V_length($(_table_))
    //         + "&tbl-fold=" + V_length($(_figure_ + V_attrCSS(_data_cntr_, _table_) + V_attrCSS(_data_content_folded_, _true_)))
    //         + "&tbl-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_tbl_) +___+ __v_cap1_))
    //         + "&tbl-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_tbl_) +___+ __v_cap2_));

    //     // 表格列格式数据
    //     let fmBold = 0,
    //         fmEm = 0,
    //         fmUnderline = 0,
    //         fmMark = 0,
    //         fmDel = 0,
    //         fmChk = 0,
    //         fmNum = 0;
    //     $(_table_ + V_attrCSS(_data_column_fmting_, _true_)).e((index, element) => {
    //         let _t = $(element);
    //         if (V_length(_t.f(_thead_ + " ." + _v_tbl_col_fmt_bold_)) > 0)
    //             fmBold++;
    //         if (V_length(_t.f(_thead_ + " ." + _v_tbl_col_fmt_em_)) > 0)
    //             fmEm++;
    //         if (V_length(_t.f(_thead_ + " u")) > 0)
    //             fmUnderline++;
    //         if (V_length(_t.f(_thead_ + " ." + _v_tbl_col_fmt_mark_)) > 0)
    //             fmMark++;
    //         if (V_length(_t.f(_thead_ +___+ _del_)) > 0)
    //             fmDel++;
    //         if (V_length(_t.f(_thead_ + " ." + _v_tbl_col_fmt_chkbox_)) > 0)
    //             fmChk++;
    //         if (V_length(_t.f(_thead_ + " ." + _v_tbl_col_fmt_num_)) > 0)
    //             fmNum++;
    //     });
    //     sd += "&tbl-fm-b=" + fmBold
    //         + "&tbl-fm-em=" + fmEm
    //         + "&tbl-fm-u=" + fmUnderline
    //         + "&tbl-fm-m=" + fmMark
    //         + "&tbl-fm-d=" + fmDel
    //         + "&tbl-fm-chk=" + fmChk
    //         + "&tbl-fm-num=" + fmNum;

    //     // 带单元格合并的表格数
    //     sd += "&tbl-" + _cell_ + "-merge=" + V_length($(_table_ + V_attrCSS(_data_cell_merge_, _true_)));

    //     // 带行折叠的表格数
    //     sd += "&tbl-row-group=" + V_length($(_table_ + V_attrCSS(_data_row_group_, _true_)));

    //     // 代码块数据
    //     sd += "&cb=" + V_length(V_byClass(_md_fences_))
    //         + "&cb-fold=" + V_length($("p" + V_attrCSS(_data_cntr_, _codeblock_) + V_attrCSS(_data_content_folded_, _true_)))
    //         + "&cb-cap1=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_codeblock_) +___+ __v_cap1_))
    //         + "&cb-cap2=" + V_length($(_div_ + V_attrCSS(_id_, _vk_id_codeblock_) +___+ __v_cap2_));

    //     // 标签数据
    //     sd += "&" + _tag_ + "=" + V_length($(_code_ + V_attrCSS(_class_, _v_tag_)))
    //         + "&" + _badge_ + "=" + V_length($(_code_ + V_attrCSS(_class_, _v_badge_name_)));

    //     // 引用块折叠数据
    //     sd += "&dt=" + V_length($(_details_));

    //     // 脚注数据
    //     sd += "&fn=" + V_length(V_byClass("md-" + _footnote_));
    // }

    // 提交统计数据
    let vlookStatViaGithub = $(_iframe_ + V_attrCSS(_name_, _vlook_stat_github_)),
        vlookStatViaCloudFlare = $(_iframe_ + V_attrCSS(_name_, _vlook_stat_cloudflare_));

    vlookStatViaGithub.a(_src_, _httpsPrefix_ + _vlookAct_ + (V_devMode ? "dev-" : _) + "stat-github.html" + sd);
    DEBUG("STAT DATA (GitHub):", vlookStatViaGithub.a(_src_));

    !V_devMode
        && (
            vlookStatViaCloudFlare.a(_src_, _vlookPagesHost_CloudFlare_ + "/act/" + (V_devMode ? "dev-" : _) + "stat-cloudflare.html" + sd),
            DEBUG("STAT DATA (CloudFlare):", vlookStatViaCloudFlare.a(_src_))
        );
}
// 定义 VLOOK 埋点数据统计
// ========================================

// ==================== 处理耗时计时器类 ==================== //

/**
 * 构造函数
 */
function Stopwatch() {
    let T = this;
    V_length(T, 1);
    T.sT = gNull; // 重置后的初始时间
    T.lT = gNull; // 每次中间计时的初始时间

    /**
     * 重置计时器
     */
    T.rst = function() {
        T.sT = V_getTime();
    }

    /**
     * 一次中间计时开始
     */
    T.st = function (target) {
        target !== gUndefined && LOG(target);
        T.lT = V_getTime();
    }

    /**
     * 一次中间计时结束
     * @param pre 输出内容前缀
     * @param slient 是否为静默模式，true：是
     */
    T.ed = function (pre, slient) {
        let c = V_getTime() - T.lT;
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
    T.stop = function() {
        return V_getTime() - T.sT;
    }

    // 初始化计时器
    T.rst();
}

// ==================== 欢迎页 ==================== //

let WelcomePage_ui = gUndefined, // 欢迎页主界面
    WelcomePage_button = gUndefined, // 关闭欢迎页按钮
    WelcomePage_tips = gUndefined, // 欢迎信息
    WelcomePage_finished = gFalse, // 是否已加载
    WelcomePage_mode = _auto_; // 模式

/**
 * 构造函数
 * @param mode 欢迎页显示模式
 */
function WelcomePage_init(mode) {
    WelcomePage_ui = V_byClass(_v_welcome_page_); // 欢迎页主界面
    WelcomePage_button = V_byClass(_v_welcome_page_ + ">." + _v_loading_); // 关闭欢迎页按钮
    WelcomePage_tips = V_byClass(_v_welcome_page_ + ">." + _v_tips_); // 欢迎信息
    WelcomePage_finished = gFalse; // 是否已加载
    WelcomePage_mode = mode; // 模式

    // 初始执行
    WelcomePage_mode === _off_
        ? WelcomePage_close()
        : WelcomePage_ui.show();
}

/**
 * 完成所有内容加载后调用
 */
function WelcomePage_done() {
    // 关闭欢迎页事件
    WelcomePage_button.uC().ck(() => {
        WelcomePage_close(gTrue);
    });

    WelcomePage_ui.c(_cursor_, _default_);
    WelcomePage_stopAni();

    WelcomePage_updateCloseButton(gNull);
    JQ_addClass(WelcomePage_button, _v_btn_ + "-" + _done_);

    WelcomePage_finished = gTrue;

    // 模式：wait
    if (WelcomePage_mode === _wait_)
        JQ_addClass(WelcomePage_button, _wait_);
    // 模式：auto、指定秒数
    else {
        let delay = (WelcomePage_mode === _auto_
            ? 0 // 模式：auto，延时自动关闭
            : JS_parseInt(WelcomePage_mode)); // 模式：指定秒数
        // 控制秒数上限
        if (delay > 10)
            delay = 10;
        // 秒数有效时才处理
        delay >= 0 && WelcomePage_autoClose(delay);
    }
}

/**
 * 自动延时关闭
 * @param delay VLOOK Query 调校参数指定的延时自动关闭秒数
 */
function WelcomePage_autoClose(delay) {
    let delaySecs = delay,
        closeTimer = gNull;

    delay === 0 // auto
        ? WelcomePage_close()
        : __timeToClose();

    // 关闭倒计时
    function __timeToClose() {
        WelcomePage_updateCloseButton(delaySecs);
        delaySecs--;
        if (delaySecs < 0) { // 倒计时结束
            closeTimer = V_clearTimer(closeTimer);
            WelcomePage_close(gTrue);
        }
        else
            closeTimer = V_later(__timeToClose, 1000);
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
        ]) + (sec === gNull ? _ : ___+ V_ui_span(_, _, "(" + sec + "s)")));
}

/**
 * 停止加载时的呼吸动画
 */
function WelcomePage_stopAni() {
    WelcomePage_tips.c(_animation_, _none_);
}

/**
 * 关闭欢迎页
 * @param ani 是否以动画方式关闭
 */
function WelcomePage_close(ani = gFalse) {
    if (ani) {
        JQ_addClass(WelcomePage_ui, _close_);
        V_later(() => {
            WelcomePage_ui.hide();
        }, gTransDurationLong); // 时间与样式 .v-welcome-page.close 中的动画时长同步
    }
    else
        WelcomePage_ui.hide();

    V_doc_scroll_unfreeze();

    // 关闭「灰色模式」
    V_pageMode === _max_ && GrayMode_close();
}

/**
 * 处理热键操作
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function WelcomePage_disposeHotkey(key, combKeys, event) {
    if (!WelcomePage_finished || V_ui_isHidden(WelcomePage_ui))
        return;

    V_noCombKeys(combKeys) && key === _Enter_ && ( // 关闭欢迎页
        WelcomePage_close(gTrue),
        // 如果事件已处理，则禁止双重操作
        V_preventDefault(event)
    );
}

// ==================== 内容助手类 ==================== //

let ContentAssistor_ui = gUndefined,
    ContentAssistor_btns_copyContent = gUndefined, // 复制内容
    ContentAssistor_btns_tableCross = gUndefined, // 表格阅读模式（十字光标）
    ContentAssistor_btns_wrap = gUndefined, // 表格、代码块换行、不换行
    ContentAssistor_btns_picInPic = gUndefined, // 「画中画」
    // 最后显示新标签打开按钮的内容（插图/表格等
    ContentAssistor_lastTarget = gUndefined, // 用于代码、标签
    ContentAssistor_lastHover = gUndefined,
    ContentAssistor_lastContentType = gUndefined;

function ContentAssistor_init() {
    ContentAssistor_ui = V_byClass(_v_content_assistor_);
    ContentAssistor_btns_copyContent = $(_v_btn__n__assistor_ + "." + _copy_); // 复制内容
    ContentAssistor_btns_tableCross = $(_v_btn__n__assistor_ + "." + _table_cross_); // 表格阅读模式（十字光标）
    ContentAssistor_btns_wrap = $(_v_btn__n__assistor_ + "." + _wrap_); // 表格、代码块换行、不换行
    ContentAssistor_btns_picInPic = $(_v_btn__n__assistor_ + "." + _pic_in_pic_); // 「画中画」

    ToolTips_bind(ContentAssistor_btns_tableCross, V_lang_text(25, [
        "阅读模式",
        "Reading " + _Mode_
    ]));

    ToolTips_bind(ContentAssistor_btns_wrap,  V_lang_text(26, [
        "换行 / 不换行",
        "Line " + _break_ + " / No " + _line_ +___+ _break_
    ]));

    ToolTips_bind(ContentAssistor_btns_picInPic, V_lang_text(27, [
        "画中画",
        "Picture in picture"
    ]));

    ContentAssistor_ui.on(_mouseLeave_, (event) => {
        !v_ui_mouseDropIn(ContentAssistor_lastHover, event)
            && ContentAssistor_hide();
    });

    // 开/关：表格阅读模式（十字光标）
    ContentAssistor_btns_tableCross.uC().ck((event) => {
        TableCross_toggle(event);
    });

    // 开/关：表格、代码块的换行、不换行
    ContentAssistor_btns_wrap.uC().ck(() => {
        __actionWrap();
    });

    // 复制
    ToolTips_bind(ContentAssistor_btns_copyContent);
    ContentAssistor_btns_copyContent.uC().ck((event) => {
        __actionCopy(V_eventCurrentTarget(event), event);
    });

    // 画中画
    ContentAssistor_btns_picInPic.uC().ck(() => {
        PicInPic_show();
    });

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
    }
}

/**
 * 绑定对象的 hover 行为
 * @param target 目标对象
 * @param contentType 内容类型：Figure/Table/CodeBlock
 */
function ContentAssistor_bind(target, contentType) {
    // 鼠标悬停时事件处理
    target.on(_mouseEnter_, () => {
        if (ContentAssistor_btns_copyContent === gUndefined)
            return;

        V_ui_removeAnimate(ContentAssistor_ui);

        ContentAssistor_lastHover = target;
        ContentAssistor_lastContentType = contentType;

        if (contentType === _codeblock_)
            ContentAssistor_btns_copyContent.a(_data_tips_, V_lang_text(30, [
                "复制代码",
                _Copy_ + " code"
            ]));
        else if (contentType === _fig_ + _suffixImg_)
            ContentAssistor_btns_copyContent.a(_data_tips_, V_lang_text(31, [
                "复制图片地址",
                _Copy_ + " image link"
            ]));

        ContentAssistor_show();
    }).on(_mouseLeave_, (event) => {
        !v_ui_mouseDropIn(ContentAssistor_lastHover, event)
            && ContentAssistor_hide();
    });

    // 针对插图，点击可直接进行全屏显示
    contentType.sW(_fig_)
        && target.uC().ck(() => {
            // 在插图浏览器中打开
            ContentAssistor_hide();
            FigureNav_show();

        });
}

/**
 * 显示指定内容的内容助手
 */
function ContentAssistor_show() {
    if (ContentAssistor_lastHover === gUndefined)
        return;

    // 圆角重置样式
    JQ_removeClass(ContentAssistor_btns_copyContent, _enabled_);
    JQ_removeClass(ContentAssistor_btns_tableCross, _enabled_);
    JQ_removeClass(ContentAssistor_btns_wrap, _enabled_);
    JQ_removeClass(ContentAssistor_btns_picInPic, _enabled_);

    // 插图
    if (ContentAssistor_lastContentType.sW(_fig_)) {
        // 图片插图：非 svg
        !ContentAssistor_lastContentType.eW(_svg_)
            && JQ_addClass(ContentAssistor_btns_copyContent, _enabled_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled_);
    }
    // 表格
    else if (ContentAssistor_lastContentType === _table_) {
        // 阅读模式
        JQ_addClass(ContentAssistor_btns_tableCross, _enabled_);
        ContentAssistor_lastHover.a(_data_tbl_x_) === _true_
            ? JQ_addClass(ContentAssistor_btns_tableCross, _selected_)
            : JQ_removeClass(ContentAssistor_btns_tableCross, _selected_);
        // 换行、不换行
        JQ_addClass(ContentAssistor_btns_wrap, _enabled_);
        TableWrap_isWrap(ContentAssistor_lastHover)
            ? JQ_addClass(ContentAssistor_btns_wrap, _selected_)
            : JQ_removeClass(ContentAssistor_btns_wrap, _selected_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled_);
    }
    // 代码块
    else if (ContentAssistor_lastContentType === _codeblock_) {
        // 复制
        JQ_addClass(ContentAssistor_btns_copyContent, _enabled_);
        // 换行、不换行
        JQ_addClass(ContentAssistor_btns_wrap, _enabled_);
        CodeblockWrap_isWrap()
            ? JQ_removeClass(ContentAssistor_btns_wrap, _selected_)
            : JQ_addClass(ContentAssistor_btns_wrap, _selected_);
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled_);
    }
    // 公式
    else if (ContentAssistor_lastContentType === _formula_)
        // 画中画
        JQ_addClass(ContentAssistor_btns_picInPic, _enabled_);

    // ----------------------------------------
    // 计算助手显示的位置
    let caption = ContentAssistor_lastHover.p(),
        container = caption.p(),
        left;

    left = ContentAssistor_lastHover.oW() < container.oW()
        ? ContentAssistor_lastHover.oL() + ContentAssistor_lastHover.oW()
        : container.oL() + container.oW();
    // 显示
    ContentAssistor_ui.c(_left_, left - ContentAssistor_ui.w() - 5)
        .c(_top_, ContentAssistor_lastHover.oT() + 3);

    // 须延时后再执行显示，让以上代码先完成
    V_later(() => {
        V_ui_addAnimate(ContentAssistor_ui);
        V_ui_fadeShow(ContentAssistor_ui);
    }, 100);
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
    PicInPic_ui_body = V_byClass(_v_pic_in_pic_);
    PicInPic_ui_content = PicInPic_ui_body.ch("." + _v_content_);
    PicInPic_ui_zoom = V_byClass(_v_pip_btn_ + "." + _zoom_);
    PicInPic_ui_close = V_byClass(_v_pip_btn_ + "." + _close_);

    // 缩放事件处理
    PicInPic_ui_zoom.uC().ck((event) => {
        let _t = V_eventCurrentTarget(event),
            pipBtn = V_byClass(_v_pip_btn_);
        if (PicInPic_ratio === 1) {
            PicInPic_ratio = 0.75;
            JQ_exchangeClass(pipBtn, _zoom_in_, _zoom_out_);
            _t.hm(V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_));
        }
        else {
            PicInPic_ratio = 1;
            JQ_exchangeClass(pipBtn, _zoom_out_, _zoom_in_);
            _t.hm(V_ui_svgIcon(_icoZoomOut_, 16, 16, _theme_));
        }
        PicInPic_zoom();
    });

    PicInPic_ui_close.uC().ck(() => {
        PicInPic_hide();
    });

    PicInPic_ui_body.on(_mouseEnter_, () => {
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
    }).on(_mouseLeave_, () => {
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
    PicInPic_ui_content.em();

    // 为画中画进行克隆处理
    let pic = __cloneForPicInPic(source);

    // 缩放并显示
    PicInPic_zoom();
    PicInPic_ui_body.show();

    // 根据内容调整画中画的展示
    PicInPic_fitContentSize(pic);
    V_ui_setScrollTop(0, gFalse, PicInPic_ui_content);

    /**
     * 为画中画进行克隆处理
     * @param source 源对象
     */
    function __cloneForPicInPic (source) {
        let openAll = gFalse,
            tagName = V_tagName(source);
        // 针对表格的处理
        if (tagName === _table_) {
            // 先展开所有行分组
            openAll = RowGroup_openAll(source, _auto_);
            // 再展开长内容
            let container = source.p().p();
            container.a(_data_content_folded_) === _true_
                && ContentFolder_expand(container);
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.c(_margin_, 0)
            .c(_border_, 0);
        // 移除插图编号数据，避免存在重复对象
        JQ_removeAttr(newClone, _data_fig_num_);
        PicInPic_ui_content.ap(newClone);

        // 针对插图的处理
        let img = (tagName === _svg_),
            svg = tagName === _svg_;
        if (img || svg) {
            JQ_removeAttr(newClone, _data_fig_num_);
            svg && JQ_addClass(newClone, _v_mermaid_restyler_);
        }

        // 对展开了所有行分组的表格进行克隆后的干净处理
        openAll
            && (
                RowGroup_reset(newClone), // 重置、切断
                RowGroup_closeAll(source, _auto_) // 全部收起
            );

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
    let tagName = V_tagName(source),
        w = source.w(),
        h = source.h(),
        sourcePadding = JS_parseInt(source.c(_padding_top_)) * 2,
        uiPadding = JS_parseInt(PicInPic_ui_body.c(_padding_top_)) * 2;

    // 针对图片尺寸的兼容性处理（部分浏览器不使用该处理尺寸不正常，如：Firefox）
    if (tagName === _svg_) {
        let img = new Image();
        img.src = source.a(_src_);
        img.complete
            ? __getImgSize(img)
            : img.onload = function() {
                __getImgSize(img);
            }
    }

    // 宽度
    let wWithPadding = w + sourcePadding;
    if (w > 0 && wWithPadding < PicInPic_size_width) {
        PicInPic_size_width = w;
        PicInPic_ui_body.c(_width_, wWithPadding);
    }

    // 高度
    let hWithPadding = h + uiPadding + sourcePadding;
    if (h > 0 && hWithPadding < PicInPic_size_height) {
        // 针对会进行等比缩放的对象进行高度微调
        if ((tagName === _svg_ || tagName === _svg_)
            && h > source.h()) {
                h = source.h();
                hWithPadding = h + uiPadding + sourcePadding;
        }
        PicInPic_size_height = h;
        PicInPic_ui_body.c(_height_, hWithPadding);
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

    PicInPic_ui_body//.c(_transform_origin_, PicInPic_size_width + "px " + PicInPic_size_height + "px");
        .c(_transform_, "scale(" + PicInPic_ratio + ")");

    V_later(() => {
        V_ui_addAnimate(PicInPic_ui_zoom);
        V_ui_addAnimate(PicInPic_ui_close);
    }, 100);
}

// ==================== 聚光灯类 ==================== //

/**
 * 构造函数
 * @param radius 半径大小
 */
function Spotlight(radius) {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_spotlight_);
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
    T.toggleZoom = function() {
        if (V_ui_isHidden(T.ui))
            return;

        T.r = T.r < T.zoom.bigger
            ? T.zoom.bigger
            : T.zoom.normal;

        T.repaint();
    }

    /**
     * 使用聚光灯模式
     */
    T.show = function() {
        T.toolbar.select(_spotlight_);

        // 在 Dark Mode 时先添加微调的样式
        ColorScheme_scheme === _dark_
            && JQ_addClass(VOM_doc(), _v_spotlight_in_dark_);

        T.mode = "S";
        T.ui.show();
        JQ_removeClass($(T.pointerScope), _v_cursor_laser_);
        T.repaint();

        iInfoTips.bubble(V_lang_text9(), 2000);

        StsPrs_enable(T.toolbar.btns[_spotlight_], V_lang_text9());
    }

    /**
     * 刷新聚光灯的显示
     * @param event window.event 鼠标事件对象
     */
    T.repaint = function (event) {
        // 记录鼠标最新位置，避免通过快捷键显示时无法在鼠标位置正常渲染
        if (event !== gUndefined) {
            if (V_eventClientX(event) !== gUndefined)
                T.lastPos.x = V_eventClientX(event);
            if (V_eventClientY(event) !== gUndefined)
                T.lastPos.y = V_eventClientY(event);
        }

        // 未启用则跳过
        if (!T.isEnabled())
            return;

        // 聚光灯模式
        T.ui.c(_background_, "radial-gradient(circle at "
            + T.lastPos.x + "px " + T.lastPos.y + "px,"
            + _transparent_ +___+ T.r + "px,"
            + V_ui_formatRGBA([0, 0, 0], 0.4) + (T.r + 5) + "px," + V_ui_formatRGBA([0, 0, 0], 0.9) + "900px)");
    }

    /**
     * 是否已显示
     */
    T.isEnabled = function() {
        return V_ui_isShowed(T.ui);
    }

    /**
     * 切换聚光灯的开关
     */
    T.tg = function() {
        // 已打开，则关闭
        if (T.isEnabled())
            T.hide();
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
    T.hide = function() {
        JQ_removeClass(T.toolbar.btns[_spotlight_], _selected_);
        JQ_removeClass(VOM_doc(), _v_spotlight_in_dark_);
        T.ui.hide();
        StsPrs_disable();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = gFalse;
        if (key === "Shift") {
            T.toggleZoom();
            handled = gTrue;
        }
        else if (V_isEscape(key)) {
            V_noCombKeys(combKeys) && T.isEnabled()
                && (
                    T.hide(),
                    handled = gTrue
                );
        }

        // 如果事件已处理，则禁止双重操作
        handled && V_preventDefault(event);
    }
}

// ==================== 激光笔类 ==================== //

/**
 * 构造函数
 */
 function LaserPointer() {
    let T = this;
    V_length(T, 1);
    T.toolbar = gUndefined; // 联动的工具栏

    T.enable = gFalse;
    T.tmr = gNull;
    T.tmrTick = gFalse;

    // 激光笔模式时鼠标形状影响的范围
    T.pointerScope = "body *";

    /**
     * 使用激光笔
     */
    T.show = function() {
        T.toolbar.select(_laser_pointer_);

        T.enable = gTrue;
        JQ_addClass($(T.pointerScope), _v_cursor_laser_);

        iInfoTips.bubble(V_lang_text10(),
            2000);

        StsPrs_enable(T.toolbar.btns[_laser_pointer_], V_lang_text10());
    }

    /**
     * 是否已显示
     */
    T.isEnabled = function() {
        return T.enable;
    }

    /**
     * 切换激活笔开关
     */
    T.tg = function() {
        // 已打开，则关闭
        if (T.isEnabled())
            T.hide();
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
    T.hide = function() {
        if (T.tmr !== gNull)
            T.tmr = V_clearTimer(T.tmr);

        T.enable = gFalse;
        JQ_removeClass(T.toolbar.btns[_laser_pointer_], _selected_);
        JQ_removeClass($(T.pointerScope), _v_cursor_laser_);
        StsPrs_disable();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        if (V_noCombKeys(combKeys) && V_isEscape(key))
            T.isEnabled()
                && (
                    T.hide(),
                    // 如果事件已处理，则禁止双重操作
                    V_preventDefault(event)
                );
    }
}

// ==================== VLOOK CC （封面四角）处理 ==================== //

function CC_init() {
    gVlookCC = (V_length(V_getVarVal(___v_ + _vlook__ + "cc")) > 0);
    if (!gVlookCC || !V_ui_hasCover())
        return;

    let vlook_cc = _vlook__ + "cc",
        ccTopLeft = V_getMetaByName(vlook_cc + "-" + _top_ + "-" + _left_),
        ccTopRight =  V_getMetaByName(vlook_cc + "-" + _top_ + "-" + _right_),
        ccBottomLeft = V_getMetaByName(vlook_cc + "-" + _bottom_ + "-" + _left_),
        ccBottomRight = V_getMetaByName(vlook_cc + "-" + _bottom_ + "-" + _right_);
    ccTopLeft !== gUndefined
        && __showCC(V_byClass(_v_cc_ + "." + _top_ + "." + _left_), ccTopLeft);
    ccTopRight !== gUndefined
        && __showCC(V_byClass(_v_cc_ + "." + _top_ + "." + _right_), ccTopRight);
    ccBottomLeft !== gUndefined
        && __showCC(V_byClass(_v_cc_ + "." + _bottom_ + "." + _left_), ccBottomLeft);
    ccBottomRight !== gUndefined
        && __showCC(V_byClass(_v_cc_ + "." + _bottom_ + "." + _right_), ccBottomRight);

    function __showCC(ccObj, content) {
        ccObj.hm(V_ui_div(_, _, content));
        ccObj.c(_display_, _flex_);
    }
}


// ==================== 分段控制器类 ==================== //

/**
 * @param control 控件 UI 对象
 * @param group 分段控制器分组标识
 */
function SegmentControl(control, group) {
    let T = this;
    V_length(T, 1);
    T.ui = control;
    T.gp = group;

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
        let name = target.tNm();
        T.segCnt++;
        T.segs[name] = target;

        // 新增段的 UI
        let id = T.gp + "-" + name,
            ui = V_ui_input(id, T.gp, "radio", name, 'onfocus="this.blur()"' + (status ? ___ : ___+ _data_result_ + '="' + _none_ + '"' + (checked ? ' checked' : _)))
                + V_ui_label(_v_segment_btn_ +___+ name, V_attr(_for_, id) +___+ V_attr(_data_icon_, icon) +___+ V_attr(_title_, target.desc()),
                    V_ui_svgIcon(icon, 16, 16, _text_)
                );

        T.ui.ap(ui);
        target.ui.entry = T.ui.ch("." + _v_segment_btn_ + "." + name);

        // 指定为默认选项
        if (checked) {
            T.last = target;
            __updateIcon(gTrue);
        }

        // 为新添加的段绑定事件
        T.ui.f(_input_ + "#" + id).change((event) => {
            // 隐藏切换前选择的组件
            T.last.hide();
            __updateIcon(gFalse);
            // 显示最新选择的组件
            T.last = T.segs[V_eventCurrentTarget(event).v()];
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
            T.last.ui.entry.hm(V_ui_svgIcon(T.last.ui.entry.a(_data_icon_)
                + (checked ? __checked_ : _) , 16, 16, _text_));
        }
    }

    /**
     * 获得当前选中的分段
     * @returns string 当前选中的分段
     */
    T.checkedItemValue = function() {
        return T.ui.f(_input_ + V_attrCSS(_name_, T.gp) + ":" + _checked_).v();
    }

    /**
     * 选中指定的分段
     * @param name 分段的名称，如：catalog, figure, table, codeblock, media
     */
    T.setChecked = function (name) {
        V_byID(T.gp + "-" + name).tr(_click_);
        T.sts(name, gTrue);
    }

    /**
     * 获得、设置指定分段的状态
     * @returns 无 value 时，返回指定分段的状态
     */
    T.sts = function (typeName, value) {
        let id = T.gp + "-" + typeName;
        if (value === gUndefined)
            return T.ui.f(_input_ + V_attrCSS(_id_, id)).a(_data_result_);

        value
            ? JQ_removeAttr(T.ui.f(_input_ + V_attrCSS(_id_, id)), _data_result_)
            : T.ui.f(_input_ + V_attrCSS(_id_, id)).a(_data_result_, _none_);
    }
}

// ==================== 文档正文宽度适配可显示的宽度 ==================== //

let FillWidth_ui = gUndefined;

// 初始化可显示宽度适配
function FillWidth_init() {
    FillWidth_ui = V_byClass(_v_fill_width_);
    V_ui_addAnimate(FillWidth_ui);

    iNavCenter.adjust();

    // 点击切换适应宽度
    FillWidth_ui.uC().ck(() => {
        FillWidth_ui.a(_class_).i(_enabled_) === -1
            ? FillWidth_enable()
            : FillWidth_disable();
    });
}

// 启用适配可显示宽度
function FillWidth_enable() {
    JQ_addClass(FillWidth_ui, _enabled_);
    JQ_addClass(VOM_doc(), _fill_width_);
    JQ_addClass(MoreDocContent_ui_before, _fill_width_);
    JQ_addClass(MoreDocContent_ui_after, _fill_width_);
}

// 停用适配可显示宽度
function FillWidth_disable() {
    JQ_removeClass(FillWidth_ui, _enabled_);
    JQ_removeClass(VOM_doc(), _fill_width_);
    JQ_removeClass(MoreDocContent_ui_before, _fill_width_);
    JQ_removeClass(MoreDocContent_ui_after, _fill_width_);
}

// ==================== 文档导航/文档浏览历史类 ==================== //

let NavHistory_ui = gUndefined,
    NavHistoryList = gUndefined,
    NH_ViewHistory_ui = gUndefined;

function NavHistory_init() {
    NavHistory_ui = V_byClass(_v_nav_history_);
    V_ui_addAnimate(NavHistory_ui);
    V_ui_addAnimate(NavHistory_ui.ch(_div_));

    V_isMobile()
        && JQ_addClass(NavHistory_ui, _mobile_);

    NH_ViewHistory_ui = V_byClass(_v_view_history_);
    ToolTips_bind(NH_ViewHistory_ui, V_lang_text65() + _br_ + V_ui_sub(_, _, V_ui_wrap_kbd("H")));

    NavHistoryList = new HistoryList(this, gTrue);

    NH_ViewHistory_ui.uC().ck(() => {
        V_ui_isHidden(LinkTool_panelList)
            && LinkTool_show(_history_);
    });

    // ----------
    // 页面模式非 max（如文库）
    V_pageMode !== _max_
        && NavHistory_ui.hide();
}

/**
 * 启用导航历史入口
 */
function NavHistory_enable() {
    JQ_addClass(NH_ViewHistory_ui, _enabled_);
    !isNaN(ResumeReading_lastPosition)
        && NavHistoryList.add(ResumeReading_lastPosition.toString());
}

// ==================== 继续上次的阅读类 ==================== //

let ResumeReading_ui = gUndefined,
    ResumeReading_lastPosition = gUndefined,
    ResumeReading_minScrollTop = 1000;

function ResumeReading_init() {
    ResumeReading_ui = V_byClass(_v_resume_reading_);
    ResumeReading_lastPosition = JS_parseInt(V_data_read(_last_position_));
    // 有上次阅读位置信息时
    !isNaN(ResumeReading_lastPosition)
        ? ResumeReading_ui.c(_display_, _flex_)
        // 无上次阅读位置信息时
        : JQ_addClass(NH_ViewHistory_ui, _enabled_);

    // 点击跳转
    ResumeReading_ui.uC().ck(() => {
        V_ui_setScrollTop(ResumeReading_lastPosition, gUndefined, gUndefined, gTrue);

        ResumeReading_ui.hide();
        NavHistory_enable();

        !iNavCenter.on
            && V_ui_adjustAllDelay();
    });
}

/**
 * 处理最后浏览的位置
 * @param restore 是否从非当前窗口恢复后的调用
 */
function ResumeReading_dispose(restore) {
    if (V_pageMode !== _max_)
        return;

    // 不是恢复显示时才处理
    if (!restore && ResumeReading_lastPosition !== gNull) {
        V_later(() => {
            ResumeReading_ui.hide();
            NavHistory_enable();
        }, 6000);
    }

    __saveLastPosData();

    // 保存最后浏览位置的数据
    function __saveLastPosData() {
        if (!gIsRunning)
            return;

        let scrollTop = V_ui_getScrollTop();
        // 与最后保存的不一致则保存
        if (scrollTop > ResumeReading_minScrollTop && V_data_read(_last_position_) !== scrollTop)
            V_data_write(_last_position_, scrollTop);

        // 自动定时保存最后浏览位置
        gTimer_saveLastPosition = V_later(() => {
            __saveLastPosData();
        }, 5000);
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
    V_length(T, 1);
    T.ui = V_byClass(_v_nav_center_); // 导航中心主界面
    T.hdl = V_byClass(_v_nav_center_handle_); // 导航中心引导把手

    V_isMobile() &&
        JQ_addClass(T.ui, _mobile_);

    !V_isMobile() && V_ui_isSmallScreen() &&
        JQ_addClass(T.ui, _small_);

    // 关键字搜索
    T.__keywordBody = V_byClass(_v_search_by_keyword_);
    T.kw = new TextField(T.__keywordBody, "toc-" + _filter_ + _nav_center_, gTrue);

    T.runMode = (runMode === gNull) ? _auto_ : runMode; // 导航中心运行方式
    T.lastType = _block_; // 最后一次的显示方式（float/block）
    T.on = gFalse; // 是否已显示

    T.width = T.ui.w(); // 导航中心宽度

    T.toolbar = gUndefined; // 联动的工具栏

    T.hdlTmr = gNull; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    T.segs = new SegmentControl(V_byClass(_v_segment_+ ".toc"), "toc-segment");
    Index_segments = T.segs;

    T.lib = gUndefined;

    // 目录索引组件
    T.toc = T.segs.add(new TocIndex(this, gFalse), _icoIndexTab_toc_, gTrue, gFalse);
    // 插图索引组件
    T.figures = T.segs.add(new FiguresIndex(this, gTrue), _icoIndexTab_figure_, gFalse, gFalse);
    // 表格索引组件
    T.tables = T.segs.add(new TablesIndex(this, gTrue), _icoIndexTab_table_, gFalse, gFalse);
    // 代码块索引组件
    T.codeblocks = T.segs.add(new CodeblocksIndex(this, gTrue), _icoIndexTab_codeblock_, gFalse, gFalse);
    // 公式索引组件
    T.formulas = T.segs.add(new FormulasIndex(this, gTrue), _icoIndexTab_formula_, gFalse, gFalse);
    // 多媒体索引组件
    T.media = T.segs.add(new MediaIndex(this, gTrue), _icoIndexTab_media_, gFalse, gFalse);

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.hdl);

    /**
     * 当前章节变化事件
     */
    T.toc.onChapterChanged = function() {
        // 更新逐章导航内容
        !V_isLength0(iChapterNav)
            && iChapterNav.update();
    }

    /**
     * 当切换不同分段后的处理
     * @param name 分段标识
     */
    T.segs.onChanged = function (name) {
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
        T.kw.tips(str);
    }

    // 关键字输入组件属性设置
    T.kw.setIcon(V_ui_svgIcon(_icoSearch_, 16, 16, _text_));

    T.kw.tips(V_lang_text35() + " / ...");

    // 绑定输入框事件处理

    T.kw.onInput = function (value) {
        // 先重置
        T.toc.nav.rst();
        T.figures.nav.rst();
        T.tables.nav.rst();
        T.tables.nav.rst();
        T.media.nav.rst();
        T.codeblocks.nav.rst();
        T.formulas.nav.rst();

        // 无输入内容
        if (V_length(value.x()) === 0) {
            // 对目录的处理
            T.toc.ui.rs.em();
            T.segs.checkedItemValue() === T.toc.tNm()
                && T.toc.ui.body.show();
            T.toc.hideFilterResult();
            T.toc.scrollToCurrent();
            T.toc.upd();
            // 对 插图、表格、多媒体、代码块 的处理
            Index_noneKeyword(T.figures);
            Index_noneKeyword(T.tables);
            Index_noneKeyword(T.codeblocks);
            Index_noneKeyword(T.formulas);
            Index_noneKeyword(T.media);
        }
        // 有输入内容
        else {
            let valueSet = value.x().l().sp(/\s+/);
            // 对目录的处理
            T.toc.filter(valueSet);
            // 对 插图、表格、代码块、多媒体 的处理
            Index_filter(T.figures, valueSet);
            Index_filter(T.tables, valueSet);
            Index_filter(T.codeblocks, valueSet);
            Index_filter(T.formulas, valueSet);
            Index_filter(T.media, valueSet);
        }
    }

    T.kw.onFocus = function() {
        T.lastType !== _float_
            && (
                JQ_addClass(VOM_doc(), _actived_),
                JQ_addClass(V_byClass(_v_focus_search_), _actived_)
            );
    }

    T.kw.onBlur = function() {
        JQ_removeClass(VOM_doc(), _actived_);
        JQ_removeClass(V_byClass(_v_focus_search_), _actived_);
    }

    // 绑定输入框事件处理
    T.kw.pressEnter = function() {
        T.kw.in.focus();
    }

    /**
     * 触发互动事件
     */
    // T.onAct = function() {
    //     T.adjustClickHash();
    // }

    /**
     * 跳转回文档封面
     */
    T.gotoCover = function() {
        V_ui_setScrollTop(0);
        T.toc.lastTop = 0;

        // 有封面 模式时处理
        if (V_ui_hasCover()) {
            if (T.toc.hItem !== gUndefined) {
                V_ui_tg_resetCurrentItem(T.toc.hItem, gTrue);
                T.toc.hIdx = 0;
            }
            V_ui_adjustAll();
        }
        // 无封面 模式时处理
        else
            ToolTips_hide();
    }

    /**
     * 适配锚点击事件
     */
    // T.adjustClickHash = function() {
    //     T.lastType === _float_
    //         && T.hide(_auto_);
    // }

    /**
     * 显示/隐藏导航中心
     * @param callback 显示/隐藏导航中心后执行回调函数
     */
    T.tg = function (callback) {
        // 导航中心已显示
        if (T.on)
            T.hide(_close_);
        // 导航中心未显示
        else {
            T.runMode = _auto_;
            // 在封面，或小屏
            if (V_ui_hasCover() && !V_ui_inHeader() || V_ui_isSmallScreen()) {
                T.lastType = _float_;
                T.show();
            }
            // 在章节内，非小屏
            else {
                // 导航中心运行模式为 auto 时，自动显示导航中心
                if (T.runMode === _auto_) {
                    T.lastType = _block_;
                    T.show();
                }
            }
        }

        typeof(callback) === _function_ && callback();
        T.afterToggle();
    }

    /**
     * 显示导航中心
     * @returns boolean true: 需要处理显示，false: 已显示，无须重复处理
     */
    T.show = function () {
        // 已显示，或在以动画显示过程中
        if (V_pageMode !== _max_ || T.on) // || T.ui.oL() > -T.width)
            return gFalse;

        let left = gWritePaddingRight;
        T.ui.c(_left_, left);

        T.hdl.hide();
        JQ_removeClass(T.hdl, _enabled_);

        // 以「占位方式」显示导航中心
        if (T.lastType === _block_) {
            // 占位方式的样式设置
            JQ_removeClass(T.ui, _small_);
            JQ_removeClass(T.ui, _float_);
            JQ_removeClass(T.ui, _mobile_);
            JQ_addClass(T.ui, _block_);

            T.ui.c(_top_, V_ui_hasCover() && !V_ui_inHeader() ? 20 : 70);

            // 更新工具栏导航中心按钮图标
            !V_isMobile()
                && T.toolbar.select(_nav_center_);

            VOM_doc().c(_margin_left_, _var_write_margin_left_);
            MoreDocContent_updateUI();

            // 因为从切换为占位显示后，会影响文档内容布局，所以须调整随大小变化的内容
            !T.on
                && V_later(() => {
                    // 统一同组的分栏引用块的高度
                    ExtQuote_uniteColumnsHeight();
                }, 300);
        }
        // 以「浮动方式」显示导航中心
        else if (T.lastType === _float_) {
            JQ_removeClass(T.ui, _block_);
            JQ_addClass(T.ui, _float_);

            __adjustTop();

            // 在移动端屏宽较小时，如：
            // 手机 iPhone 12 Pro 为 390
            // 手机 iPhone 6/7/8 Plus、iPhone 14 Pro Max 为 414
            jq_Window.w() <= 425 // 与 CSS @media screen and (max-width: 850px) 同步修改
                && V_setVarVal(___v_nav_center_width_, jq_Window.w() - left * 2 + "px");

            // 显示联动的遮罩
            if (V_isMobile()) {
                JQ_removeClass(T.ui, _small_);
                JQ_removeClass(T.ui, _float_);
                T.mask.show();
            }
            else if (V_ui_isSmallScreen()) {
                JQ_addClass(T.ui, _small_);
                // T.mask.show(gFalse);
            }
        }

        T.on = gTrue;
        return gTrue;
    }

    /**
     * 隐藏导航中心
     * @param runMode 导航中心的运行模式（auto/close）
     * @returns boolean true: 需要处理隐藏，false: 已显示，无须重复处理
     */
    T.hide = function (runMode = _auto_) {
        // 已隐藏，或在以动画隐藏过程中
        if (!T.on || T.ui.oL() < 10) {
            T.on = gFalse;
            return gFalse;
        }

        // 若最后一次显示以是「占位方式」显示
        if (T.lastType === _block_) {
            // 更新运行模式
            T.runMode = runMode;

            // 统一同组的分栏引用块的高度
            ExtQuote_uniteColumnsHeight();

            // 更新工具栏导航中心按钮图标
            !V_isMobile()
                && JQ_removeClass(T.toolbar.btns[_nav_center_], _selected_);
        }

        T.ui.c(_left_, _var_nav_center_hidden_left_);

        // 恢复不挤压文档正文区
        VOM_doc().c(_cssText_, _margin_left_ + ":" + _auto_ + _css_important_);
        MoreDocContent_updateUI(VOM_doc());

        T.mask.hide();

        // 非移动设备时显示把手
        !V_isMobile()
            && T.showHandle();

        T.on = gFalse;
        return gTrue;
    }

    // 适配调整导航中心的高度
    function __adjustTop() {
        T.ui.c(_top_,V_isMobile()
            // 移动端
            ? 60
            : V_ui_isSmallScreen()
                // 非移动端，小屏
                ? !V_ui_inHeader() && V_ui_hasCover()
                    ? 70 // 有封面，在封面
                    : 100 // 无封面，或在章节内
                // 非移动端，大屏
                : 70 // 在封面、在章节内
        );
    }

    /**
     * 导航中心根据规则进行布局的自适应处理
     * @returns boolean true: 需要处理显示/隐藏，false: 已显示/隐藏，无须重复处理
     */
    T.adjust = function() {
        let result = gFalse;

        // 根据导航中心宽度更新相关界面组件的样式
        V_pageMode === _max_
            && VOM_doc().c(_cssText_, _margin_left_ + ":" + _auto_ + _css_important_);
        T.on && T.lastType === _block_
            && (
                VOM_doc().c(_margin_left_, _var_write_margin_left_),
                MoreDocContent_updateUI()
            );

        T.width = T.ui.w();

        // 有封面且在封面，或为小屏
        // if (V_ui_hasCover() && !V_ui_inHeader() || V_ui_isSmallScreen()) {
        if (V_ui_hasCover() && !V_ui_inHeader() || V_ui_isSmallScreen()) {
            // 自动隐藏导航中心
            if (!V_isMobile() && V_ui_isSmallScreen())
                result = gTrue;
            else
                result = T.hide(_auto_);

            __adjustTop();

            // 根据最新窗口大小调整收起位置
            // T.ui.c(_left_, _var_nav_center_hidden_left_);

            // 更新工具栏导航中心按钮图标
            !V_isMobile()
                && JQ_removeClass(T.toolbar.btns[_nav_center_], _selected_);
        }
        else {
            // 导航中心运行模式为 auto 时，自动显示导航中心
            if (T.runMode === _auto_) {
                // 对浮动显示的才隐藏，否则会导致滚动到最后时导致页面布局变化无法滚动最后
                // 特别是像 guide 那样最后都是小章节内容时
                T.lastType === _float_
                    && T.hide();

                // 以占位方式显示导航中心
                T.lastType = _block_;
                result = T.show();

                // 根据最新窗口大小调整导航中心宽度
                T.ui.c(_width_, _var_nav_center_width_);

                // 更新工具栏导航中心按钮图标
                !V_isMobile()
                    && T.toolbar.select(_nav_center_);
            }
        }
        return result;
    }

    /**
     * 显示导航中心引导把手
     */
    T.showHandle = function() {
        if (V_pageMode !== _max_)
            return;

        T.hdl.c(_top_, (jq_Window.h() - T.hdl.h()) / 2);
        T.hdl.show();
        JQ_addClass(T.hdl, _enabled_);
    }

    /**
     * 鼠标位置变化对导航中心处理
     */
    T.snap = function (event) {
        // 已显示则跳过
        if (T.on || V_isMobile())
            return;

        // 鼠标离左边缘小于指定值时
        let h = jq_Window.h();
        if (V_eventClientY(event) > (h * 0.3) && V_eventClientY(event) < (h * 0.7) && V_eventClientX(event) <= gWritePaddingRight) {
            if (T.hdlTmr !== gNull)
                return;

            // JQ_addClass(T.hdl, _hover_);

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            T.hdlTmr = V_later(() => {
                // JQ_removeClass(T.hdl, _hover_);
                T.lastType = _float_;
                T.show();
            }, 1000);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (T.hdlTmr !== gNull) {
                T.hdlTmr = V_clearTimer(T.hdlTmr);
                // JQ_removeClass(T.hdl, _hover_);
            }
        }
    }

    /**
     * 显示/隐藏导航中心，并进行关联处理
     */
     T.afterToggle = function() {
        iNavCenter.lastType === _block_
            && ContentFolder_adjust();
    }

    /**
     * 判断是否为小屏的显示模式（不包括移动端情况，主要针对平板或小小窗口）
     */
    T.isSmall = function() {
        return T.ui.a(_class_).i(_small_) > -1;
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        // 文档库热键操作
        T.lib !== gUndefined
            && T.lib.hotkey(key, combKeys, event);

        if (V_ui_isHidden(T.ui))
            return;

        if (V_noCombKeys(combKeys) && key === _Escape_)
            !T.kw.inputing && T.on && T.lastType === _float_
                && (
                    T.hide(),
                    // 如果事件已处理，则禁止双重操作
                    V_preventDefault(event)
                );
    }
}

/**
 * 导航中心初始化
 */
function NavCenter_init() {
    // 没有生成目录
    if (V_isLength0(gToc)) {
        NavCenter.hideErr();
        return gFalse;
    }

    // 将复制的目录进行唯一性标识
    iNavCenter.toc.ui.body.ap(gToc.f("." + _md_toc_item_));

    // 移除原目录数据，避免同名 DOM
    gToc.rm();

    gVlookToc = V_byID(_vlook_toc_);
    V_ui_set_dataNoMore(gVlookToc, gVlookToc);

    // 检查目录内容情况
    if (V_isLength0(gVlookToc)) {
        NavCenter.hideErr();
        return gFalse;
    }

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(gVlookToc);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(gVlookToc);

    // 获取主题中强制控制，对大于指定层级的标题都不显示
    gHideOutlineOver = JS_parseInt(V_getVarVal(___v_ + _hide_ + "-" + _outline__ + "over"));

    // 文库
    iNavCenter.lib = new DocLib(new BgMask(_doc_lib_, _top_), iNavCenter);
    // 当前文档不是 mini 类型（文库类文档一般为 mini 类型）
    if (V_pageMode !== _mini_)
        // 文库
        V_isLength0(iNavCenter.lib)
            ? ALERT(_failed_ + "iDocLib ]")
            : iNavCenter.lib.init();

    // 根据文库配置显示入口
    iNavCenter.lib !== gUndefined && iNavCenter.lib.on
        && iToolbar.btns[_doc_lib_].c(_display_, _flex_);

    // 有 Typora 生成的原始目录节点，针对 VLOOK 的封面规则进行调整
    let tocSet = gVlookToc.ch("." + _md_toc__+ "h1,." + _md_toc__+ "h2,." + _md_toc__+ "h3,." + _md_toc__+ "h4,." + _md_toc__+ "h5,." + _md_toc__+ "h6"),
        tocSetLength = V_length(tocSet);
    tocSet.e((index, element) => {
        let _t = $(element);
        // 只处理 h1～h5 的目录节点
        if (_t.a(_class_).i(_md_toc_ + "-h6") === -1) {
            if (V_ui_hasCover()) // 文档有封面时
                index < tocSetLength - 1 // 未到最后一个元素
                    ? iNavCenter.toc.add(_t)
                    : _t.rm(); // 最后一个 h1 为封底，移除
            else
                iNavCenter.toc.add(_t);
        }
        // 移除无效的目录节点（如：封面、封底、普通的 h6 节点）
        else
            _t.rm();
    });

    // 不指定打开，则默认收起所有含子章节的 h1 章节
    let tocAutoCloseLevel = V_getParamVal(_toc_);
    tocAutoCloseLevel = (tocAutoCloseLevel !== gNull) ? JS_parseInt(tocAutoCloseLevel) : 1;
    if (tocAutoCloseLevel >= 1 && tocAutoCloseLevel <= 5) {
        gVlookToc.ch("." + _md_toc__ + "h" + tocAutoCloseLevel + V_attrCSS(_data_node_, 1) + V_attrCSS(_data_folded_, _false_)).e((index, element) => {
            iNavCenter.toc.disposeFold($(element).a(_id_), "c", gTrue);
        });
    }

    return gTrue;
}

/**
 * 隐藏导航中心（异常情况使用）
 */
NavCenter.hideErr = function() {
    iNavCenter.hide();
    ERROR(WINDOW_getHref(), [
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
        tPrevName = _v_chapter_nav_ + __prev,
        tCurrentName = _v_chapter_nav_ + __current_,
        tNextName = _v_chapter_nav_ + __next_,
        tDocTitleName = _v_chapter_nav_ + __doc_title_;
    V_length(T, 1);

    // 逐章导航面板主界面
    T.ui = V_byClass(_v_chapter_nav_ + _);

    T.prev = {
        ui : V_byClass(tPrevName), // 前一章界面
        text: V_byClass(_v_chapter_nav_ + __prev + __text_), // 前一章文本界面
    };

    T.cur = {
        ui : V_byClass(tCurrentName), // 当前章节界面
    };

    T.next = {
        ui : V_byClass(tNextName), // 后一章界面
        text : V_byClass(_v_chapter_nav_ + __next_ + __text_), // 后一章文本界面
    };

    // 文档标题
    T.dt = V_byClass(tDocTitleName);
    T.dt.t(V_getDocTitle());

    V_pageMode !== _max_
        && T.ui.hide();

    /**
     * 初始化动效
     */
    T.init = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        V_ui_effect >= 1
            ? (
                JQ_addClass(V_byClass(target), _effect_),
                V_ui_addAnimate(V_byClass(target + "." + _effect_))
            )
            : JQ_exchangeClass(V_byClass(target), _effect_, _no_ + _effect_);
    }
    // 初始化动效
    T.init(tPrevName);
    T.init(tCurrentName);
    T.init(tNextName);
    T.init(tDocTitleName);

    /**
     * 跳转至前一章节
     */
    T.prev.ui.uC().ck(() => {
        ToolTips_hide();

        iNavCenter.toc.hIdx === 0
            ? iNavCenter.gotoCover()
            : iNavCenter.toc.gotoHeader(T.prev.text);
    });

    /**
     * 回到封面
     */
    T.dt.uC().ck((event) => {
        // JQ_removeClass(T.dt, _hover_);
        ToolTips_hide();
        // V_eventCurrentTarget(event).a(_disabled_) === gUndefined
        //     && iNavCenter.gotoCover();
        iNavCenter.gotoCover();
    });

    /**
     * 跳转至当前章节
     */
    T.cur.ui.uC().ck(() => {
        ToolTips_hide();
        iNavCenter.toc.gotoHeader(T.cur.ui);
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
    T.update = function() {
        let curIdx = iNavCenter.toc.hIdx;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (curIdx > 1) {
            T.prev.ui.show();
            T.prev.ui.c(_display_, _block_);
            T.prev.text.t(V_byID(iNavCenter.toc.h[curIdx - 1]).t());
            T.prev.text.a(_data_hash_, iNavCenter.toc.h[curIdx - 1]);

            // V_ui_adjustHoverStyle(T.dt);

            JQ_removeClass(T.dt, _in_start_);
            JQ_removeAttr(T.dt, _disabled_);
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (curIdx === 1) {
            T.prev.text.t(V_lang_text(1, [
                "文档封面",
                _Document_ +___+ _cover_
            ]));
            T.prev.ui.show();
            T.cur.ui.show();

            // V_ui_adjustHoverStyle(T.dt);

            JQ_removeClass(T.dt, _in_start_);
            JQ_removeAttr(T.dt, _disabled_);
            T.prev.text.a(_data_hash_, iNavCenter.toc.h[curIdx - 1]);
        }
        // 无封面 模式时对「文档标题」章节的特殊处理
        else if (curIdx === 0) {
            T.prev.ui.hide();
            T.cur.ui.hide();
            // 调整为在文档开始位置时的样式
            JQ_addClass(T.dt, _in_start_);
            T.dt.a(_disabled_, _true_);
            // V_ui_unbindHover(T.dt);
        }

        // ----------------------------------------
        // 更新「当前章节」导航内容
        if (iNavCenter.toc.hItem !== gUndefined) {
            // 无封面 模式
            iNavCenter.toc.inDocTitle()
                ? T.cur.ui.hide()
                : T.cur.ui.show();

            let headerNum = iNavCenter.toc.hItem.a(_data_header_num_);
            headerNum = (headerNum === gUndefined)
                ? _
                : V_ui_span(_, _, headerNum) + ___;
            T.cur.ui.hm(headerNum + iNavCenter.toc.hItem.a(_title_));
            T.cur.ui.a(_data_hash_, iNavCenter.toc.h[curIdx]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        curIdx < V_length(iNavCenter.toc.h) - 1
            ? (
                T.next.ui.show(),
                T.next.text.t(V_byID(iNavCenter.toc.h[curIdx + 1]).t()),
                T.next.text.a(_data_hash_, iNavCenter.toc.h[curIdx + 1])
            )
            : T.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    T.show = function() {
        // 若已显示则直接退出
        if (V_pageMode !== _max_)
            return;

        JQ_addClass(T.ui, _v_float_card_);

        T.ui.show();
    }

    /**
     * 隐藏逐章导航栏
     */
    T.hide = function() {
        // 若已隐藏则直接退出
        if (JS_parseInt(T.ui.c(_top_)) < 0)
            return;

        JQ_removeClass(T.ui, _v_float_card_);
        T.ui.c(_top_, -50);
        T.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    T.adjust = function() {
        // ERROR(111, "chapter adjust");
        T.ui.c(_top_, V_ui_isSmallScreen() ? 0 : 10);

        // 无封面时
        if (!V_ui_hasCover()) {
            // 在 VLOOK 生成的文档标题处
            iNavCenter.toc.hIdx === 0
                && (
                    T.show(),
                    T.update()
                )
        }
        // 有封面时
        else {
            // 在封面位置，隐藏逐章导航栏
            if (!V_ui_inHeader()) {
                V_ui_hasCover()
                    && T.hide();

                // 初始化前 / 后章节数据
                T.prev.text.a(_data_hash_, iNavCenter.toc.h[0]);
                T.next.text.a(_data_hash_, iNavCenter.toc.h[1]);
            }
            // 不在封面位置，显示逐章导航栏
            else {
                T.show();
                T.update();
            }
        }
    }

    /**
     * 逐章导航导航按钮在不同终端的适配处理
     */
    // T.adjustHoverStyle = function() {
    //     // 移动设备时解绑样式事件
    //     V_isMobile()
    //         ? (
    //             T.prev.ui.uH(),
    //             T.dt.uH(),
    //             T.cur.ui.uH(),
    //             T.next.ui.uH()
    //         )
    //         // 非移动设备时绑定样式事件
    //         : (
    //             // 上一章
    //             ToolTips_bind(T.prev.ui, _, _auto_),
    //             // 文档标题
    //             ToolTips_bind(T.dt, _, _center_),
    //             // 当前章节
    //             ToolTips_bind(T.cur.ui, _, _center_),
    //             // 下一章
    //             ToolTips_bind(T.next.ui, _, _right_)
    //         );
    // }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_doc_block)
            return;

        let handled = gFalse;
        if (V_noCombKeys(combKeys)) {
            switch (key) {
                case _ArrowLeft_: // left
                case ',':
                    T.prev.ui.tr(_click_);
                    handled = gTrue;
                    break;
                case _ArrowRight_: // right
                case '.':
                    T.next.ui.tr(_click_);
                    handled = gTrue;
                    break;
            }
        }

        // 如果事件已处理，则禁止双重操作
        handled && V_preventDefault(event);
    }
}

// ==================== 段落漫游类 ==================== //

/**
 * 构造函数
 */
function ParagraphNav() {
    let T = this;
    V_length(T, 1);
    T.count = 0; // 段的总数量
    T.idx = -1; // 当前段索引号
    T.on = gFalse; // 是否段落漫游激活

    T.toolbar = gUndefined; // 联动的工具栏
    T.bd = gUndefined;

    /**
     * 返回当前段落
     */
    T.cur = function() {
        if (T.idx === -1)
            return gUndefined;
        return $(V_attrCSS(_data_id_, _vk_pg__ + T.idx));
    }

    /**
     * 切换段落漫游开关
     * @returns boolean true：开启，false：关闭
     */
    T.tg = function (target) {
        T.on = !T.on;
        if (T.on) {
            iInfoTips.bubble(V_lang_text8(), 2000);

            T.toolbar.select(_paragraph_nav_);
            T.bd.show();

            StsPrs_enable(T.toolbar.btns[_paragraph_nav_], V_lang_text8());
            T.goto(ParagraphNav_getScreenMiddleElement());

            target !== gUndefined
                && T.goto(target);
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
        item.a(_data_id_, _vk_pg__ + T.count);
        item.a(_data_pg_idx_, T.count);
        T.count++;

        // 单击内容块处理
        item.uC().ck(() => {
            iParagraphNav.on
                && T.goto(item);
        });
    }

    /**
     * 上一个段
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    T.prevPg = function (step) {
        if (!T.on || step === 0)
            return gFalse;

        // 未到首段
        if (T.idx > 0) {
            T.idx = T.idx - step;

            if (T.idx < 0)
                T.idx = 0;

            // 如果目标内容块 item 跳转失败，则再尝试上一个
            !T.goto(0)
                && T.prevPg(1);

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
        if (!T.on || step === 0)
            return gFalse;

        // 未到末段
        if (T.idx < T.count - 1) {
            T.idx = T.idx + step;

            // 跳转 step 后修正超出最大值的情况
            if (T.idx > T.count - 1)
                T.idx = T.count - 1;

            // 如果目标内容块 item 跳转失败，则再尝试下一个
            !T.goto(0)
                && T.nextPg(1);

            return gTrue;
        }
        return gFalse;
    }

    /**
     * 跳到指定的内容块
     * @param target 跳转的目标。0: 指定跳到上/下一个位置，非0: 指定的目标位置
     */
    T.goto = function (target) {
        // 初始化目标段
        let item = (target === 0)
            ? T.cur()
            : target;

        // 对于目标段落所属的容器被页签组所隐藏时的处理
        V_ui_switchToTabItem(item);

        // 若目标聚焦块为空（可能是对象已在其他处理过程中被删除）、不可视等情况
        // 则返回跳转失败
        if (item === gUndefined || V_ui_isHidden(item) || item.o() === gUndefined)
            return gFalse;

        // 添加高亮样式
        T.idx = JS_parseInt(item.a(_data_pg_idx_));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.h() + 100;
        if (item.oT() !== 0
            && ((item.oT() - height) < V_ui_getScrollTop()
            || (item.oT() + height) > (V_ui_getScrollTop() + jq_Window.h()))) {
                V_ui_setScrollTop(item.oT(), item);
        }

        // 展开 details
        V_ui_openDetails(item);

        // 更新遮罩位置、大小
        let rect = V_ui_getRect(item[0]),
            pd = 10, // 留白宽度
            w = rect.width + pd,
            h = rect.height + pd;
        // 遮罩边框
        T.bd.c(_left_, item.oL() - pd/2);
        T.bd.c(_top_, item.oT() - pd/2);
        T.bd.c(_width_, w);
        T.bd.c(_height_, h);

        return gTrue; // 返回跳转成功
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    T.hide = function() {
        JQ_removeClass(T.toolbar.btns[_paragraph_nav_], _selected_);
        T.on = gFalse;
        StsPrs_disable();
        T.bd.hide();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (!T.on)
            return;

        let handled = gFalse;
        switch (key) {
            case 'j': // J
            case 'J':
                TableCross_hide();
                T.nextPg(__calcStep());
                handled = gTrue;
                break;
            case 'k': // K
            case 'K':
                TableCross_hide();
                T.prevPg(__calcStep());
                handled = gTrue;
                break;
            case _Escape_:
                if (V_noCombKeys(combKeys) && T.on) {
                    T.hide();
                    handled = gTrue;
                }
                break;
        }

        // 如果事件已处理，则禁止双重操作
        handled && V_preventDefault(event);

        // 计算步长
        function __calcStep() {
            // 当 j 或 k 单键时
            if (V_noCombKeys(combKeys))
                return 1;
            // 配合 shift 双键时
            if (event.shiftKey)
                return 10;
            // 配合 ctrl 或 command 双键时
            if (event.metaKey || event.ctrlKey)
                return 5;
            return 0;
        }
    }
}

/**
 * 初始化段落漫游模式
 */
function ParagraphNav_init() {
    iParagraphNav = new ParagraphNav();
    // 添加关联组件
    iParagraphNav.toolbar = iToolbar;
    iParagraphNav.bd = V_byID(_v_para_nav_mask_border_);

    // 先清理多余的段落标签
    $("li>p" + __only_child_).contents().unwrap();

    // 初始化
    $(_h1_6_ + ",ul>li," + _details_ + ",ol>li,#write>p" + V_attrCSS(_class_, _md_toc__ + _content_, "!") + ",blockquote>p,figure,." + _md_alert_ + ">p,." + _md_diagram_panel_ + ",.MathJax_SVG_Display").e((index, element) => {
        let item = $(element);
        // 跳过不可见元素、子元素有嵌套 p 的情况，如li > p
        if (item.is(":" + _visible_)
            && (V_length(item.ch("p")) === 0 && V_length(item.t().x()) > 0 || V_tagName(item) === _details_)) {
            iParagraphNav.add(item);
        }
    });
}

/**
 * 获取显示在屏幕中间位置的元素
 */
function ParagraphNav_getScreenMiddleElement() {
    let middleY = gWindow.innerHeight / 2,  // 获取屏幕中心的中线坐标
        quarterY = middleY / 2, // 获取屏幕高度的 1/4 坐标
        centerElement = gNull,
        lastElement = gNull;

    // 遍历所有支持段落漫游的对象
    $(_idWrite_ + ">" + V_attrCSS(_data_id_, _vk_pg__, "^")).e((index, element) => {
        let rect = V_ui_getRect(element);
        // 检查元素的上边缘和下边缘是否跨越屏幕中心点
        if ((rect.top <= middleY && rect.bottom >= middleY) // 跨中线的对象
            || (rect.top <= (quarterY) && rect.bottom >= (quarterY)) // 不跨中线，但跨 1/4 线
            || (rect.top >= (quarterY) && rect.bottom <= (middleY)) // 不跨中线，但在 1/4 线与中线之间
            || rect.top >= middleY) { // 中线后的对象
            centerElement = element;
            return gFalse;
        }
        lastElement = element;
    });
    if (centerElement === gNull)
        centerElement = lastElement;

    return $(centerElement);
}

// ==================== 工具栏类 ==================== //

/**
 * 构造函数
 */
function Toolbar() {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_toolbar_); // 工具栏主界面
    T.btns = []; // 工具栏按钮集

    V_pageMode !== _max_
        && T.ui.hide();

    V_ui_addAnimate(T.ui);

    /**
     * 添加按钮
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    T.add = function (name, clickEvent) {
        T.btns[name] = V_byClass(_v_btn_ + "." + name);

        T.btns[name].uC().ck((event) => {
            ToolTips_hide();
            typeof(clickEvent) === _function_ && clickEvent(event);
        });

        V_ui_addAnimate(T.btns[name]);

        // 对 mouseenter 和 mouseleave 事件处理
        T.btns[name].on(_mouseEnter_, (event) => {
            // let _t = V_eventCurrentTarget(event),
                // btnGroup = _t.a(_data_btn_group_);
            // btnGroup !== gUndefined
            //     && JQ_addClass(V_byClass(_v_btn_group_ + "." + btnGroup), _hover_);
            ToolTips_show(V_eventCurrentTarget(event), _auto_);
        }).on(_mouseLeave_, (event) => {
            // let btnGroup = V_eventCurrentTarget(event).a(_data_btn_group_);
            // btnGroup !== gUndefined
            //     && JQ_removeClass(V_byClass(_v_btn_group_ + "." + btnGroup), _hover_);
            ToolTips_hide();
        });
    }

    /**
     * 对指定按钮设置为选中状态
     * @param btnName 按钮标识
     */
    T.select = function (btnName) {
        let group = T.btns[btnName].a(_data_btn_group_);
        if (group !== gUndefined)
            for (let i = 0; i < V_length(T.btns); i++)
                T.btns[i].a(_data_btn_group_) === group
                    && JQ_removeClass(T.btns[i], _selected_);

        JQ_addClass(T.btns[btnName], _selected_);
    }

    /**
     * 自适应显示工具栏
     */
    T.adjust = function() {
        if (V_pageMode !== _max_)
            return null;

        let top, // = 0,
            bottom = _auto_,
            padding = 0,
            right = 20;

        // 如果是小屏，或在封面
        if (V_ui_isSmallScreen() || !V_ui_inHeader()) {
            // 根据无封面、有封面情况进行样式调整
            V_ui_toolbarFloat(V_ui_hasCover());

            // 大屏，回到封面及最开始位置进行二次调整
            if (!V_ui_isSmallScreen() && !V_ui_inHeader()) {
                if (V_ui_hasCover()) {
                    padding = 10;
                    top = (V_ui_getScrollTop() <= 5 ? gWritePaddingRight : 0);
                }
                else {
                    V_ui_toolbarFloat(gFalse);
                    padding = 10;
                    top = 10;
                }
            }
            // 小屏，非封面位置进行二次调整
            else {
                // 不在封面
                if (V_ui_inHeader()) {
                    V_ui_toolbarFloat();
                    top = 50;
                    right = _auto_;
                }
                // 在封面
                else {
                    padding = 10;
                    // 小屏，在封面及最开始位置进行二次调整
                    if (V_ui_getScrollTop() <= 5) {
                        // 有封面
                        if (V_ui_hasCover()) {
                            top = gWritePaddingRight;
                            right = _revert_layer_;
                        }
                        // 无封面
                        else {
                            V_ui_toolbarFloat();
                            padding = 0;
                            top = 50;
                            right = _auto_;
                        }
                    }
                    // 小屏，在封面位置进行二次调整
                    else {
                        V_ui_toolbarFloat();
                        top = 50;
                        padding = 0;
                    }
                }
            }
        }
        // 宽屏，且不在封面
        else {
            V_ui_toolbarFloat(gFalse);
            padding = 10;
            top = 10;
        }

        // 进行调整
        T.ui.c(_padding_left_, padding)
                .c(_padding_right_, padding)
                .c(_top_, top)
                .c(_bottom_, bottom)
                .c(_right_, right);
        T.ui.show();

        // 返回结果集（因为在启用动画时无法实时获得最终度量信息，需要以结果方式直接返回）
        return {
            t: top,
            l: JS_parseInt(T.ui.c(_left_)),
            r: JS_parseInt(T.ui.c(_right_)),
            p: padding
        };
    }
}

// ==================== 颜色方案类 ==================== //

let ColorScheme_auto = gTrue, // 是否为 auto 模式
    ColorScheme_systemScheme = _light_,
    ColorScheme_scheme = _light_; // 当前颜色方案，auto/light/dark

/**
 * 初始化
 */
function ColorScheme_init() {
    let scheme = V_data_read(_color_scheme_, gTrue);
    if (scheme !== gNull && (scheme === _light_ || scheme === _dark_))
        ColorScheme_auto = gFalse;

    // 监听系统的 Color Scheme 变化
    const mediaQuery = gWindow.matchMedia("(prefers-" + _color_scheme_ + ":" + _dark_ + ")");
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

    dark
        ? ColorScheme_scheme = _dark_
        : ColorScheme_scheme = _light_;

    ColorScheme_refresh();

    !LinkTool_checkHashMode
        && V_ui_changeDocIcon(V_getVarVal(___v_thm_fav_logo_));
}

/**
 * 根据指定的颜色方案对文档进行刷新
 * @param force 是否强制指定，如应用于根据调校参数指定
 */
function ColorScheme_refresh(force) {
    if (!force && ColorScheme_auto) {
        V_data_remove(_color_scheme_, gTrue);
        ColorScheme_scheme = ColorScheme_systemScheme;
    }
    else if (!force)
        V_data_write(_color_scheme_, ColorScheme_scheme, gTrue);

    // 批量修改颜色方案相关的 CSS 变量为指定的新值
    let __alt = "-a",
        __fade_bd = __fd_ + "-bd",
        // __cur__ = "--cur-",
        // ---
        acRed = ___ac_ + "rd",
        acOrange = ___ac_ + "og",
        acYellow = ___ac_ + "ye",
        acLime = ___ac_ + "lm",
        acGreen = ___ac_ + "gn",
        acMineral = ___ac_ + "mn",
        acOlives = ___ac_ + "ol",
        acWine = ___ac_ + "wn",
        acAqua = ___ac_ + "aq",
        acCyan = ___ac_ + "cy",
        acBlue = ___ac_ + "bu",
        acSea = ___ac_ + "se",
        acLavender = ___ac_ + "la",
        acVine = ___ac_ + "vn",
        acPurple = ___ac_ + "pu",
        acRose = ___ac_ + "ro",
        acPink = ___ac_ + "pk",
        acGold = ___ac_ + "gd",
        acBrown = ___ac_ + "bn",
        acGray = ___ac_ + "gy",
        acWhite = ___ac_ + "wt",
        acBlack = ___ac_ + "bk",
        acTheme1 = ___ac_ + "t1",
        acTheme2 = ___ac_ + "t2",
        // ---
        __cm__ = "--cm-";

    let __pn = "--pn",
        __tbl = "--tbl-",
        _variable = "variable",
        _string = "string",
        ___v_fl__ = "--v-fl-",
        __kbd = "--kbd",
        __kbd_bg = __kbd + "-bg",
        __kbd_reflect = __kbd + "-reflect";
    V_changeCssVarSet([
        ___v_thm_fav_logo_,
        ___v_ + _invert_dark_,
        ___v_ + _cover_ + "-" + _dark_,
        ___v_ + _selected_ + "-c",
        "--" + _img_ + "-bd-" + _invert_,
        ___d_bc_,
        "--d-bi",
        "-" + __fd_ + "-r",
        "-" + __fd_ + "-g",
        "-" + __fd_ + "-b",
        "--d-fc",
        "--bq-bg",
        "--" + _fig_ + "-" + _solid_ + "-bg",
        _var_fig_grid__ + "l",
        _var_fig_grid__ + "b",
        _var_fig_grid__ + "l-" + _invert_,
        _var_fig_grid__ + "b-" + _invert_,
        __pn + "-c",
        __pn + "-c-a",
        __pn + __fd_ + "-r",
        __pn + __fd_ + "-g",
        __pn + __fd_ + "-b",
        "--" + _blockquote_ + "-bg",
        "--a-c",
        "--a-o-c",
        "--" + _mark_ + "-bg",
        __tbl + "row-g-alpha",
        "--toc-h-num-c",
        "--h-f",
        "--h-" + _box_ + "-sd",
        "--h-bg-" + _start_,
        "--h-bg-end",
        "--code-bg",
        "--std-code" + "-sd",
        "--rb-code" + "-sd",
        ___v_fl__ + "sd",
        ___v_fl__ + "i-sd",
        ___v_fl__ + "bd",
        "--c-blk-bg",
        __kbd_bg,
        __kbd_reflect,
        __kbd + "-sd",
        __kbd_bg + "-i",
        __kbd_reflect + "-i",
        __kbd + "-sd" + "-i",
        "--" + _doc_ + "-sd",
        ___cur__ + _pointer_,
        ___cur__ + _copy_,
        // __cur + _copy_ + "-" + _normal_,
        // __cur + _copy_ + "-as-md",
        ___cur__ + _pointer_ + __text_,
        ___cur__ + _laser_,
        ___cur__ + "md",
        ___cur__ + "doclib",
        ___cur__ + _http_,
        ___cur__ + _https_,
        ___cur__ + "email",
        // ___cur__ + "docment",
        // ___cur__ + "archive",
        ___cur__ + "risk",
        ___cur__ + _inner_,
        acRed,
        acRed + __alt,
        acRed + __fd_,
        acRed + __fade_bd,
        acRed + "-tt",
        acOrange,
        acOrange + __alt,
        acOrange + __fd_,
        acOrange + __fade_bd,
        acOrange + "-tt",
        acYellow,
        acYellow + __alt,
        acYellow + __fd_,
        acYellow + __fade_bd,
        acYellow + "-tt",
        acLime,
        acLime + __alt,
        acLime + __fd_,
        acLime + __fade_bd,
        acLime + "-tt",
        acGreen,
        acGreen + __alt,
        acGreen + __fd_,
        acGreen + __fade_bd,
        acGreen + "-tt",
        acMineral,
        acMineral + __alt,
        acMineral + __fd_,
        acMineral + __fade_bd,
        acMineral + "-tt",
        acOlives,
        acOlives + __alt,
        acOlives + __fd_,
        acOlives + __fade_bd,
        acOlives + "-tt",
        acWine,
        acWine + __alt,
        acWine + __fd_,
        acWine + __fade_bd,
        acWine + "-tt",
        acAqua,
        acAqua + __alt,
        acAqua + __fd_,
        acAqua + __fade_bd,
        acAqua + "-tt",
        acCyan,
        acCyan + __alt,
        acCyan + __fd_,
        acCyan + __fade_bd,
        acCyan + "-tt",
        acBlue,
        acBlue + __alt,
        acBlue + __fd_,
        acBlue + __fade_bd,
        acBlue + "-tt",
        acSea,
        acSea + __alt,
        acSea + __fd_,
        acSea + __fade_bd,
        acSea + "-tt",
        acLavender,
        acLavender + __alt,
        acLavender + __fd_,
        acLavender + __fade_bd,
        acLavender + "-tt",
        acVine,
        acVine + __alt,
        acVine + __fd_,
        acVine + __fade_bd,
        acVine + "-tt",
        acPurple,
        acPurple + __alt,
        acPurple + __fd_,
        acPurple + __fade_bd,
        acPurple + "-tt",
        acRose,
        acRose + __alt,
        acRose + __fd_,
        acRose + __fade_bd,
        acRose + "-tt",
        acPink,
        acPink + __alt,
        acPink + __fd_,
        acPink + __fade_bd,
        acPink + "-tt",
        acGold,
        acGold + __alt,
        acGold + __fd_,
        acGold + __fade_bd,
        acGold + "-tt",
        acBrown,
        acBrown + __alt,
        acBrown + __fd_,
        acBrown + __fade_bd,
        acBrown + "-tt",
        acGray,
        acGray + __alt,
        acGray + __fd_,
        acGray + __fade_bd,
        acGray + "-tt",
        acWhite,
        acWhite + __alt,
        acWhite + __fd_,
        acWhite + __fade_bd,
        acWhite + "-tt",
        acBlack,
        acBlack + __alt,
        acBlack + __fd_,
        acBlack + __fade_bd,
        acBlack + "-tt",
        acTheme1,
        acTheme1 + __alt,
        acTheme1 + __fd_,
        acTheme1 + __fade_bd,
        acTheme1 + "-tt",
        acTheme2,
        acTheme2 + __alt,
        acTheme2 + __fd_,
        acTheme2 + __fade_bd,
        acTheme2 + "-tt",
        __cm__ + _keyword_,
        __cm__ + _variable,
        __cm__ + _variable + "-2",
        __cm__ + _variable + "-3",
        __cm__ + _tag_,
        __cm__ + _attribute_,
        __cm__ + _CodeMirror_ + "-" + _cursor_,
        __cm__ + _string,
        __cm__ + _string + "-2",
        __cm__ + "comment",
        __cm__ + _header_,
        __cm__ + _quote_,
        __cm__ + _hr_,
        __cm__ + _link_,
        __cm__ + "negative",
        __cm__ + "positive",
        __cm__ + _mata_,
        __cm__ + "bulidin",
        __cm__ + "bracket",
        __cm__ + "atom",
        __cm__ + "number"
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
    V_length(T, 1);
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
    V_length(T, 1);
    T.styleByTheme = styleName; // 主题配套字体风格
    T.style = styleName; // 当前字体风格
    T.ui = V_byClass(_v_font_style_); // 字体风格切换选择界面

    T.statusUI = gUndefined;
    T.statusTimer = gNull;

    T.restore = V_byClass(_v_font_style_restore_);

    // 字体风格选项：系统默认
    T.localStyle = new FontStyleOption(V_byClass(_v_font_style_opt_local_), [
        _VLOOK_DIN_DIGITAL_ + _normal_normal_, _VLOOK_DIN_DIGITAL_ + _normal_bold_ //_VLOOK_Number_ + _normal_italic_,
    ]);
    // 字体风格选项：Book 书香里
    T.bookStyle = new FontStyleOption(V_byClass(_v_font_style_opt_book_), [
        _VLOOK_DIN_DIGITAL_ + _normal_normal_, _VLOOK_DIN_DIGITAL_ + _normal_bold_ //_VLOOK_Number_ + _normal_italic_,
    ]);
    // 字体风格选项：Gov 公文风
    T.govStyle = new FontStyleOption(V_byClass(_v_font_style_opt_gov_), [
        _VLOOK_DIN_DIGITAL_ + _normal_normal_, _VLOOK_DIN_DIGITAL_ + _normal_bold_ //_VLOOK_Number_ + _normal_italic_,
    ])
    // 字体风格选项：Sans 小清新
    T.sansStyle = new FontStyleOption(V_byClass(_v_font_style_opt_sans_), [
            // _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            _VLOOK_DIN_DIGITAL_ + _normal_normal_, _VLOOK_DIN_DIGITAL_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            // _VLOOK_DIN_Sans_ + _normal_normal_, //_VLOOK_DIN_Sans_ + _normal_500_,
            // _VLOOK_DIN_Sans_ + _normal_bold_, //_VLOOK_DIN_Sans_ + _normal_900_,
            _VLOOK_Sans_Mono_ + _normal_normal_, //_VLOOK_Sans_Mono_ + _normal_500_,
            _VLOOK_Sans_Mono_ + _normal_bold_, //_VLOOK_Sans_Mono_ + _normal_900_,
            _VLOOK_Sans_ + _normal_normal_, _VLOOK_Sans_ + _normal_bold_//, _VLOOK_Sans_ + _normal_900_
            ]);
    // 字体风格选项：Serif 文艺范
    T.serifStyle = new FontStyleOption(V_byClass(_v_font_style_opt_serif_), [
            // _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            // _VLOOK_DIN_Serif_ + _normal_normal_, _VLOOK_DIN_Serif_ + _normal_bold_, _VLOOK_DIN_Serif_ + _normal_italic_, _VLOOK_DIN_Serif_ + _italic_bold_,
            _VLOOK_Serif_Mono_ + _normal_normal_, _VLOOK_Serif_Mono_ + _normal_bold_, _VLOOK_Serif_Mono_ + _normal_italic_, _VLOOK_Serif_Mono_ + _italic_bold_,
            _VLOOK_Serif_ + _normal_500_, _VLOOK_Serif_ + _normal_900_,
            _VLOOK_Sans_Mono_ + _normal_normal_,//_VLOOK_Sans_Mono_ + _normal_500_,
            _VLOOK_Sans_Mono_ + _normal_bold_, //_VLOOK_Sans_Mono_ + _normal_900_,
            _VLOOK_Sans_ + _normal_normal_, _VLOOK_Sans_ + _normal_bold_//, _VLOOK_Sans_ + _normal_900_
        ]);
    // 字体风格选项：活力派
    T.albbStyle = new FontStyleOption(V_byClass(_v_font_style_opt_albb_), [
            // _VLOOK_Number_ + _normal_normal_, _VLOOK_Number_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            _VLOOK_DIN_DIGITAL_ + _normal_normal_, _VLOOK_DIN_DIGITAL_ + _normal_bold_, //_VLOOK_Number_ + _normal_italic_,
            // _VLOOK_Sans_Mono_ + _normal_normal_, _VLOOK_Sans_Mono_ + _normal_500_,
            // _VLOOK_Albb_ + _normal_normal_, _VLOOK_Albb_ + _normal_bold_,
            _VLOOK_Albb_DT_Sans_ + _normal_normal_,
            _VLOOK_Albb_DT_JinBu_ + _normal_normal_
        ]);
    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    V_ui_addAnimate(T.ui);

    // 恢复为主题配套的字体风格
    T.restore.uC().ck(() => {
        V_data_remove(_font_style_, gTrue);
        T.apply(T.styleByTheme, gTrue);
        T.hide();
    });

    // 绑定各字体风格选项事件
    T.localStyle.ui.uC().ck(() => {
        T.apply(_local_);
        T.initWF();
        T.hide();
    });
    T.bookStyle.ui.uC().ck(() => {
        T.apply(_book_);
        T.initWF();
        T.hide();
    });
    T.govStyle.ui.uC().ck(() => {
        T.apply(_gov_);
        T.initWF();
        T.hide();
    });
    T.sansStyle.ui.uC().ck(() => {
        T.apply(_sans_);
        T.initWF();
        T.hide();
    });
    T.serifStyle.ui.uC().ck(() => {
        T.apply(_serif_);
        T.initWF();
        T.hide();
    });
    T.albbStyle.ui.uC().ck(() => {
        T.apply(_albb_);
        T.initWF();
        T.hide();
    });

    /**
     * 初始化
     * @param style 可选。强制指定的字体风格
     */
    T.init = function (style) {
        // 有指定强制字体风格，同时指定的字体风格合法且与文档配套的不一致，则进行处理
        if (style !== gUndefined
            && style.m(/^(local|book|gov|sans|serif|albb)$/i) !== gNull
            && style !== T.style) {
                T.style = style;
                T.apply(T.style);
        }

        LOG("_____ FONT STYLE (" + T.style + ") _____ ");

        T.syncInfo();

        T.initWF();

        // 对于本地字体风格的状态，直接为就绪
        $(":is(." + _v_font_info__ + _local_
            + ",." + _v_font_info__ + _book_
            + ",." + _v_font_info__ + _gov_ + ") > " + _span_).t("✅ " + V_lang_text38());
    }

    /**
     * 同频显示当前选择字体风格的加载信息
     */
    T.syncInfo = function() {
        // 使用自定义字体风格时的处理
        T.statusUI = V_byClass(_v_font_style_current_);

        JQ_removeClass(T.statusUI, _done_);

        // ----------
        // 页面模式 max
        if (V_pageMode === _max_) {
            // 读取高度信息，强制浏览器重新计算元素的样式，后面重新添加 done 样式时能确保动画重新触发
            T.statusUI.h();

            // 根据导航中心显示情况进行微调
            if (V_length(iNavCenter) > 0) {
                let left = iNavCenter.ui.oL();
                if (left > 0) // 正常以占位显示
                    left += iNavCenter.ui.oW() + 10;
                else // 隐藏时
                    left = 20;
                T.statusUI.c(_left_, left);
            }

            T.statusUI.c(_display_, _flex_);

            __syncLoadingInfo();
        }

        // 同步显示当前选择字体风格的加载信息
        function __syncLoadingInfo() {
            let currentFontStyle = V_byClass(_v_font_info__ + T.style);
            T.statusUI.hm(V_lang_text41() + _nbsp_ + currentFontStyle.hm());

            // 根据工具栏位置进行微调
            if (V_length(iToolbar) > 0)
                JS_parseInt(iToolbar.ui.c(_bottom_)) === 0
                    ? T.statusUI.c(_bottom_, 50)
                    : T.statusUI.c(_bottom_, _revert_layer_);

            // 已完成加载
            if (currentFontStyle.a(_class_).i(_done_) > -1) {
                JQ_addClass(T.statusUI, _done_);
                T.statusTimer = V_clearTimer(T.statusTimer);
            }
            else {
                T.statusTimer = V_later(() => {
                    __syncLoadingInfo();
                }, 2000);
            }
        }
    }

    /**
     * 初始化 WebFont
     */
    T.initWF = function() {
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

        if ((_local_ + _book_ + _gov_).i(T.style) > -1)
            // 动态加载字体 VLOOK DIN
            __loadDinFont();
        else if (T.style === _sans_) {
            // 动态加载字体 VLOOK DIN
            __loadDinFont();
            // 动态加载字体 VLOOK DIN Sans
            // __LoadDinSansFont();
            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Sans
            __loadSansCjkFont();

            // 对 Sans 字体风格的加载超时检测
            V_later(() => {
                V_length(T.sansStyle.fonts) > 0
                    && V_byClass(_v_font_info__ + "sans > " + _span_).t(timeOutMsg);
            }, 1000 * 60 * 20); // 20 分钟后进行超时检测
        }
        else if (T.style === _serif_) {
            // 动态加载字体 VLOOK DIN
            __loadDinFont();
            // 动态加载字体 VLOOK DIN Serif
            // __LoadDinSerifFont();
            // 动态加载字体 VLOOK Serif Mono
            __loadSerifMonoFont();
            // 动态加载字体 VLOOK Serif
            __loadSerifCjkFont();

            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();
            // 动态加载字体 VLOOK Sans
            __loadSansCjkFont();

            // 对 Serif 字体风格的加载超时检测
            V_later(() => {
                V_length(T.serifStyle.fonts) > 0
                    && V_byClass(_v_font_info__ + _serif_ + " > " + _span_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }
        else if (T.style === _albb_) {
            // 动态加载字体 VLOOK DIN
            __loadDinFont();

            // 动态加载字体 VLOOK Sans Mono
            __loadSansMonoFont();

            // 动态加载字体 VLOOK Albb
            // __loadAlbbFont()
            // 动态加载字体 VLOOK Albb DT-Sans
            __loadAlbbDtSansFont();
            // 动态加载字体 VLOOK Albb DT-JinBu
            __loadAlbbDtJinBuFont();

            // 对 Albb 字体风格的加载超时检测
            V_later(() => {
                V_length(T.albbStyle.fonts) > 0
                    && V_byClass(_v_font_info__ + _albb_ + " > " + _span_).t(timeOutMsg);
            }, 600000); // 10 分钟后进行超时检测
        }

        // 动态加载字体 VLOOK DIN
        function __loadDinFont() {
            let // fontName = _VLOOK_DIN_DIGITAL_,
                srcName = "Altinn-DIN";
            T.load(_VLOOK_DIN_DIGITAL_, _normal_, _normal_, srcName, srcName + _Regular);
            T.load(_VLOOK_DIN_DIGITAL_, _normal_, _bold_, srcName, srcName + _Bold);
            T.load(_VLOOK_DIN_, _normal_, _normal_, srcName, srcName + _Regular);
            T.load(_VLOOK_DIN_, _normal_, _bold_, srcName, srcName + _Bold);
        }

        // 动态加载字体 VLOOK DIN Sans
        // function __LoadDinSansFont() {
        //     let fontName = _VLOOK_DIN_Sans_,
        //         srcName = _NotoSansMono_;
        //     T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
        //     T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
        // }

        // 动态加载字体 VLOOK DIN Serif
        // function __LoadDinSerifFont() {
        //     let fontName = _VLOOK_DIN_Serif_,
        //         srcName = _LuxiMono_;
        //     let luxiMonoSubName = srcName + _Italic;
        //     T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular, unicodeRange);
        //     T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold, unicodeRange);
        //     T.load(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular, unicodeRange);
        //     T.load(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold, unicodeRange);
        // }

        // 动态加载字体 VLOOK Sans Mono
        function __loadSansMonoFont() {
            let fontName = _VLOOK_Sans_Mono_,
                srcName = _NotoSansMono_;
            T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold);
        }

        // 动态加载字体 VLOOK Serif Mono
        function __loadSerifMonoFont() {
            let fontName = _VLOOK_Serif_Mono_,
                srcName = _LuxiMono_;
            let luxiMonoSubName = srcName + _Italic;
            T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold);
            T.load(fontName, _italic_, _normal_, srcName, luxiMonoSubName + _Regular);
            T.load(fontName, _italic_, _bold_, srcName, luxiMonoSubName + _Bold);
        }

        // 动态加载字体 VLOOK Sans
        function __loadSansCjkFont() {
            let fontName = _VLOOK_Sans_,
                srcName = "NotoSansCJKsc";
            T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular);
            T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold);
        }

        // 动态加载字体 VLOOK Serif
        function __loadSerifCjkFont() {
            let fontName = _VLOOK_Serif_,
                srcName = "NotoSerifCJKsc";
            T.load(fontName, _normal_, fontWeight500, srcName, srcName + _Medium);
            T.load(fontName, _normal_, fontWeight900, srcName, srcName + _Black);
        }

        // 动态加载字体 VLOOK Albb
        // function __loadAlbbFont() {
        //     let fontName = _VLOOK_Albb_,
        //         srcName = "AlibabaPuHuiTi";
        //     T.load(fontName, _normal_, _normal_, srcName, srcName + _Regular);
        //     T.load(fontName, _normal_, _bold_, srcName, srcName + _Bold);
        // }

        // 动态加载字体 VLOOK Albb DT-Sans
        function __loadAlbbDtSansFont() {
            let //fontName = _VLOOK_Albb_DT_Sans_,
                srcName = _DingTalk_;
            T.load(_VLOOK_Albb_DT_Sans_, _normal_, _normal_, srcName, srcName + "-Sans");
        }

        // 动态加载字体 VLOOK Albb DT-JinBu
        function __loadAlbbDtJinBuFont() {
            let //fontName = _VLOOK_Albb_DT_JinBu_,
                srcName = _DingTalk_;
            T.load(_VLOOK_Albb_DT_JinBu_, _normal_, _normal_, srcName, srcName + "-JinBuTi");
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
    T.load = function (fontFamily, fontStyle, fontWeight, folderName, srcFontSubName, unicodeRange) {
        if (gDocument.fonts && !T.isExist(fontFamily, fontStyle, fontWeight)) {
            let woffURL = "url('" + webfontHostAlt + folderName + "-" + _woff2_ + "/" + srcFontSubName + "." + _woff2_ + "') format('" + _woff2_ + "')",
                fontFace;
            // 有指定字符范围
            unicodeRange === gUndefined
                ? fontFace = new FontFace(fontFamily,
                    ((_woff2_ !== gUndefined) ? woffURL : _), {
                        weight: fontWeight,
                        display: _swap_,
                        style: fontStyle
                    })
                // 无指定字符范围
                : fontFace = new FontFace(fontFamily,
                    ((_woff2_ !== gUndefined) ? woffURL : _), {
                        weight: fontWeight,
                        display: _swap_,
                        style: fontStyle,
                        unicodeRange: "U+0030-0039"
                    });

            // 指定字体加载完成后回调函数
            fontFace.load().then((loadedFontFace) => {
                gDocument.fonts.add(loadedFontFace);

                let fontID = fontFamily + "/" + fontStyle + "/" + fontWeight;
                LOG("↓↓↓ FONT LOADED ↓↓↓");
                LOG(fontID);

                // 更新字体包下载进度
                __updateDownloadProgress(fontID, _local_, T.localStyle);
                __updateDownloadProgress(fontID, _book_, T.bookStyle);
                __updateDownloadProgress(fontID, _gov_, T.govStyle);
                __updateDownloadProgress(fontID, _sans_, T.sansStyle);
                __updateDownloadProgress(fontID, _serif_, T.serifStyle);
                __updateDownloadProgress(fontID, _albb_, T.albbStyle);
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
                    status = V_byClass(_v_font_info__ + style + " > " + _span_);

                // 未加载完成
                loadedCount < fontSet.fontCount
                    ? status.t(loadingMsg + " (" + JS_mathRound(loadedCount / fontSet.fontCount * 100) + "%)")
                // 已加载完成
                    : (
                        status.t(readyMsg),
                        JQ_addClass(status.p(), _done_)
                    );
            }
        }
    }

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
    T.show = function() {
        // 如果有保存的配置，则显示 恢复 按钮
        T.restore.c(_display_, V_data_read(_font_style_, gTrue) !== gNull ? _block_ : _none_);

        T.mask.show();
        V_ui_moveToCenter(T.ui);
        T.ui.show();

        LOG(_current_ + ": " + T.style);

        JQ_removeClass(V_byClass(_v_font_style_opt_ + ">img"), _selected_);
        JQ_addClass(V_byClass(_v_font_style_opt_ + "-"  + T.style), _selected_);
    }

    /**
     * 显示/隐藏字体风格选择器
     */
    T.tg = function() {
        V_ui_isShowed(T.ui)
            ? T.hide()
            : T.show();
    }

    /**
     * 隐藏字体风格选择器
     */
    T.hide = function() {
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
        restore !== gTrue
            && V_data_write(_font_style_, styleName, gTrue);

        // 涉及的 CSS 变量名称列表
        let varFFm = ___v_f__ + "fm",
            varFw = ___v_f__ + "w";
        const varList = [
            varFFm + "-tt",
            varFFm + "-" + _stt_,
            varFFm + "-h",
            varFFm + __text_,
            varFFm + "-bd",
            varFFm + "-key",
            varFFm + __num_,
            varFFm + "-" + _tag_,
            varFFm + "-" + _code_,
            varFw + "-bd",
            varFw + "-tt",
            varFw + __text_
        ];
        // 生成目标字体风格变量值列表
        let fontVarList = [];
        for (let i = 0, len = V_length(varList); i < len; i++)
            fontVarList.push(V_getVarVal(varList[i] + "-" + T.style));

        // 遍历所有变量实现字体风格的切换
        for (let i = 0, len = V_length(varList); i < len; i++)
            V_setVarVal(varList[i], fontVarList[i]);

        T.syncInfo();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_ui_isHidden(T.ui))
            return;

        V_noCombKeys(combKeys) && V_isEscape(key)
            && V_ui_isShowed(T.ui)
                && (
                    T.hide(),
                    // 如果事件已处理，则禁止双重操作
                    V_preventDefault(event)
                );
    }
}

// ==================== 脚注类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 */
function Footnote(mask) {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_fontnote_pn_); // 脚注主界面
    T.content = V_byClass(_v_fontnote_pn_content_); // 脚注内容区

    V_ui_set_dataNoMore(T.content, [_]);

    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.content);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    T.buttonSeeAll = V_byClass(_v_fontnote_pn_ + __footer_); // 查看所有脚注按钮
    T.buttonSeeAll.uC().ck(() => {
        T.hide();
        // 跳转至所有脚注区域
        WINDOW_setHref("#" + _vk_footer_area_);
    });

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    /**
     * 显示脚注弹层
     */
    T.show = function() {
        // 显示关联的遮罩
        T.mask.show();
        T.ui.show();
        // 强制触发一次滚动事件处理，以生成需要的样式
        V_ui_scrollingUpdate(T.content);
    }

    /**
     * 隐藏脚注弹层
     */
    T.hide = function() {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_ui_isHidden(T.ui))
            return;

        V_noCombKeys(combKeys) && V_isEscape(key)
            && V_ui_isShowed(T.ui)
                && (
                    T.hide(),
                    // 如果事件已处理，则禁止双重操作
                    V_preventDefault(event)
                );
    }
}

/**
 * 初始化脚注
 */
function Footnote_init() {
    // 将 Typora 的脚注调整到封底前，VLOOK 规范的文档中最后一个 <h6> 是封底
    let footnotesArea = V_byClass(_footnotes_area_);
    if (V_isLength0(footnotesArea))
        return;

    // 有脚注时，在文库中添加直达「所有脚注」的入口
    let vkFooterArea = V_byID(_vk_footer_area_);
    V_length(vkFooterArea) > 0 && iNavCenter.lib !== gUndefined
        && iNavCenter.lib.addHashItem(V_ui_svgIcon(_icoDocLibRef_, 20, 18, _alpha_), V_lang_text22(), _vk_footer_area_);

    // 有封面 模式
    VOM_backcover() !== gUndefined
        ? VOM_backcover().bf(footnotesArea)
        // 无封面 模式
        : VOM_doc().ap(footnotesArea);

    // 将 VLOOK 生成的脚注区锚点调整到生成 HTML 后的实际位置
    footnotesArea.bf(vkFooterArea);

    // 移除默认的跳转属性
    let a = $("a" + V_attrCSS(_name_, _ref_footnote_, "^")
        + ",a" + V_attrCSS(_id_, _ref_footnote_, "^"));
    JQ_removeAttr(a, _href_);
    // 将脚注角标的事件替换为指定的处理事件
    a.uC().ck((event) => {
        // 获取脚注【返回】链接对应的脚注原文信息
        let _t = V_eventCurrentTarget(event),
            nameValue = _t.a(_name_),
            nameValue2 = "df" + _ref_footnote_,
            target = $("a" + V_attrCSS(_name_, "df" + nameValue)
                + ",a" + V_attrCSS(_id_, "df" + nameValue)).p().clone();

        // 更新脚注弹层内容区
        iFootnote.content.hm(target);
        // 移除默认的返回链接
        target.f("a" + V_attrCSS(_name_, nameValue2, "^")
            + ",a" + V_attrCSS(_id_, nameValue2, "^")).rm();

        // 显示脚注弹层
        iFootnote.show();
    });
}

// ==================== 带格式的复制处理类 ==================== //

// let Copyer_rich_ui_start = gUndefined,
//     Copyer_rich_ui_end = gUndefined;

// function Copyer_init() {
//     let ui = V_ui_div("copy-rich-start", _, _)
//         + V_ui_div("copy-rich-end", _, _);

//     V_byClass(_footnotes_area_).bf(ui);
//     Copyer_rich_ui_start = V_byID("copy-rich-start");
//     Copyer_rich_ui_end = V_byID("copy-rich-end");
// }

// /**
//  * 处理复制操作
//  * @param event 事件对象
//  */
// function Copyer_actionForRich(event) {
//     // 针对选中的内容进行处理
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0 && Copyer_rich_ui_start !== gUndefined) {
//         let range = selection.getRangeAt(0),
//             selectedContent = range.cloneContents();

//         // 将临时添加到 #write 内以正确匹配样式后再进行处理
//         Copyer_rich_ui_start.af($(selectedContent));

//         // 递归处理子元素
//         let childSet = Copyer_rich_ui_start.nU('#copy-rich-end'),
//             htmlContent = _,
//             textContent = _;
//         for (let child of childSet) {
//             __convertStylesToInline(child);
//             htmlContent += child.outerHTML;
//             textContent += child.textContent;
//         }

//         // 将完成内联样式处理的内容写入到 clipboard
//         event.clipboardData.setData(_text_ + "/" + _html_, htmlContent);
//         event.clipboardData.setData(_text_ + "/plain", textContent);

//         // 延迟移除临时复制标记内的内容，确保粘贴前内容完整
//         V_later(() => {
//             let removeStart = gFalse;
//             Copyer_rich_ui_start.p().contents().each(function () {
//                 // 如果当前节点是复制开始标记，开始删除
//                 if (this === Copyer_rich_ui_start[0])
//                     removeStart = gTrue;
//                 // 如果当前节点在复制开始与结束标记之间，且是文本或元素节点，则删除
//                 else if (removeStart && this !== Copyer_rich_ui_end[0]) {
//                     if (this.nodeType === Node.TEXT_NODE || this.nodeType === Node.ELEMENT_NODE)
//                         $(this).rm();
//                 }
//                 // 如果当前节点是复制结束标记，停止删除
//                 else if (this === Copyer_rich_ui_end[0])
//                     removeStart = gFalse;
//             });

//             Copyer_processing = gFalse;
//         }, 1000);
//     }

//     // 转换内联样式
//     function __convertStylesToInline(element) {
//         let computedStyles = window.getComputedStyle(element),
//             inlineStyle = _,
//             propertyList = [
//                 // 字体相关
//                 _font_family_,
//                 _font_size_,
//                 _font_weight_,
//                 _font_style_,
//                 _line_height_,
//                 _text_transform_,
//                 _letter_spacing_,
//                 // 颜色、背景
//                 _color_,
//                 _background_color_,
//                 _background_image_,
//                 _background_clip_,
//                 // 阴影
//                 _box_shadow_,
//                 _text_shadow_,
//                 // 边框
//                 _border_,
//                 _border_left_,
//                 _border_right_,
//                 _border_top_,
//                 _border_bottom_,
//                 _border_radius_,
//                 // 对齐
//                 _text_align_,
//                 _justify_content_,
//                 _align_items_,
//                 _vertical_align_,
//                 // 大小、布局
//                 _padding_,
//                 _margin_,
//                 _min_width_,
//                 _max_width_,
//                 _word_break_,
//                 _white_space_,
//                 _display_,
//                 _position_
//             ];

//         for (let i = 0; i < V_length(propertyList); i++)
//             inlineStyle += __genInlineStyle(computedStyles, propertyList[i]);

//         // 处理伪元素
//         // const pseudoBefore = window.getComputedStyle(element, '::before');
//         // const pseudoAfter = window.getComputedStyle(element, '::after');

//         // if (pseudoBefore.content !== _none_) {
//         //     inlineStyle += `::before { content: ${pseudoBefore.content}; } `;
//         // }
//         // if (pseudoAfter.content !== _none_) {
//         //     inlineStyle += `::after { content: ${pseudoAfter.content}; } `;
//         // }

//         // 设置内联样式
//         element.setAttribute(_style_, inlineStyle);

//         // 递归处理子元素
//         for (let child of element.children)
//             __convertStylesToInline(child);
//     }

//     // 生成指定属性名的内联样式内容
//     function __genInlineStyle(style, propertyName) {
//         let value = V_util_getComputedStyleValue(style, propertyName),
//             inlineStyle = _;
//         if (value) inlineStyle = `${propertyName}: ${value}; `;
//         return inlineStyle;
//     }
// }

// ==================== 状态栏类 ==================== //

let StatusBar_ui = gUndefined,
    StatusBar_handle = gUndefined,
    StatusBar_items = []; // 状态栏条目集

let StsLinkChkResult_ui = gUndefined,
    StsNewVersion_ui = gUndefined,
    StsColorScheme_ui = gUndefined,
    StsDocInfo_ui = gUndefined,
    StsPrsInfo_ui = gUndefined,
    StsLinkMap_ui = gUndefined,
    StsFontStyle_ui = gUndefined;

// 状态栏初始化
function StatusBar_init() {
    StsLinkChkResult_ui = V_byClass(_v_link_chk_result_); // 检查结果
    StsNewVersion_ui = V_byClass(_v_new_version_);
    StsColorScheme_ui = V_byClass(_v_color_scheme_);
    StsDocInfo_ui = V_byClass(_v_doc_info_);
    StsPrsInfo_ui = V_byClass(_v_prs_info_);

    // 点击演示工具信息栏事件处理
    StsPrsInfo_ui.uC().ck(() => {
       iParagraphNav.hide();
       iSpotlight.hide();
       iLaserPointer.hide();
    });

    StatusBar_ui = V_byClass(_v_status_bar_);
    V_ui_addAnimate(StatusBar_ui);
    V_ui_addAnimate(StatusBar_ui.ch(_div_));
    V_isMobile()
        && JQ_addClass(StatusBar_ui, _mobile_);

    // 控制隐藏、显示的按钮
    StatusBar_handle = V_byClass(_v_status_bar_ + __handle_);
    StatusBar_handle.uC().ck(() => {
        // 进行隐藏
        parseInt(StatusBar_ui.c(_right_)) > 0
            ? StatusBar_hide()
            // 进行显示
            : StatusBar_show();
    });

    // ----------
    // 功能入口：链接地图
    StsLinkMap_ui = V_byClass(_v_link_map_);
    ToolTips_bind(StsLinkMap_ui, V_lang_text3() + _br_ + V_ui_sub(_, _, V_ui_wrap_kbd("M")));
    StsLinkMap_ui.uC().ck(() => {
        V_ui_isHidden(LinkTool_panelList)
            && LinkTool_show(_map_);
    });

    // ----------
    // 功能入口：字体风格
    StsFontStyle_ui = V_byClass(_v_sts_font_style_);
    ToolTips_bind(StsFontStyle_ui, V_lang_text41() + _br_ + V_ui_sub(_, _, V_ui_wrap_kbd("A")));
    StsFontStyle_ui.uC().ck(() => {
        iFontStyle.tg();
    });

    // ----------
    // 功能入口：Light / Dark Mode 切换
    // 页面模式非 max（如文库），中仅支持 Light Mode 时不显示

    // 如没有指定仅支持 Light Mode 时才进行自动适配 Dark Mode 的处理
    gOnlyLightMode = (V_length(V_getVarVal("--v-only-" + _light_ + "-" + _mode_)) > 0);
    if (V_pageMode !== _max_ || gOnlyLightMode)
        StsColorScheme_ui.hide();

    // 页面模式非 max（如文库），或为移动端时的处理
    if (V_pageMode !== _max_ || V_isMobile()) {
        StsDocInfo_ui.hide();
        StsLinkChkResult_ui.hide();
        StsFontStyle_ui.hide();

        // 过滤掉不可见的元素
        let visibleBtn = StatusBar_ui.ch().filter(function () {
            return $(this).c(_display_) !== _none_;
        });
        // 给最后一个元素添加指定样式
        JQ_addClass(visibleBtn.last(), _last_);
    }

    // 状态栏相关的其他初始化处理
    NewVersion_init();
    StsColorScheme_init();
    LinkTool_init(new BgMask(_link_checker_, _right_, gTrue));
}

// 显示状态栏
function StatusBar_show() {
    StatusBar_ui.c(_right_, gWritePaddingRight);
    JQ_removeClass(StatusBar_handle, _hidden_);
}

// 隐藏状态栏
function StatusBar_hide() {
    StatusBar_ui.c(_right_, "-" + (StatusBar_ui.w() - StatusBar_handle.w() - 2) + "px");
    JQ_addClass(StatusBar_handle, _hidden_);
}

// ==================== 文档信息类 ==================== //

let DocInfo_enabled = gTrue;

/**
 * 统计字数
 */
function DocInfo_countWord() {
    if (!DocInfo_enabled)
        return;

    // 统计每种语言匹配到的词汇数量
    let counterResult = V_countWord(VOM_doc().t());

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

    ToolTips_bind(StsDocInfo_ui, V_ui_strong(times)
        + V_ui_sub(_, _,
            _br_ + V_lang_text(11, [
                    "中日韩",
                    "CJK"
                ])
            +___+ V_lang_text44() + ":" +___
            + V_ui_strong(V_formatting_thousands(JS_toString(counterResult.CJK)))
            + _br_ + V_lang_text(12, [
                    "非中日韩",
                    "Non-CJK"
                ])
            +___+  V_lang_text44() + ":" +___
            + V_ui_strong(V_formatting_thousands(JS_toString(counterResult.latin)))
        ));

    StsDocInfo_ui.hm(V_formatting_thousands(JS_toString(counterResult.total)));
}

// ==================== 演示工具信息类 ==================== //

// 启用演示工具栏显示
function StsPrs_enable(tool, text) {
    StatusBar_show();

    StsPrsInfo_ui.hm(
        V_ui_label(_, _, tool.hm() + text + _2nbsp_ + "•" + _2nbsp_ + V_lang_text4() + _2nbsp_ + "•" + _2nbsp_  + V_ui_wrap_kbd("ESC") + V_lang_text17())
    );
    JQ_addClass(StsPrsInfo_ui, _selected_);

    // 更新演示工具栏提示信息
    ToolTips_bind(StsPrsInfo_ui, tool.a(_data_tips_));
}

// 关闭演示工具栏显示
function StsPrs_disable() {
    JQ_removeClass(StsPrsInfo_ui, _selected_);
}

// ==================== 状态栏的颜色模式类 ==================== //

/**
 * 构造函数
 */
function StsColorScheme_init() {
    ToolTips_bind(StsColorScheme_ui, V_lang_text45() + _br_ + V_ui_sub(_, _, V_ui_wrap_kbd("D")));

    StsColorScheme_updateIcons();

    StsColorScheme_ui.uC().ck(() => {
        if (gOnlyLightMode)
            return;

        // 根据系统当前的 color scheme，确定不同模式切换的顺序
        let nextScheme = (ColorScheme_systemScheme === _light_ ? _dark_ : _light_ )
        // 切换不同模式
        if (ColorScheme_auto) {
            ColorScheme_auto = gFalse;
            ColorScheme_scheme = nextScheme;
        }
        else if (ColorScheme_scheme === nextScheme) {
            ColorScheme_auto = gFalse;
            ColorScheme_scheme = ColorScheme_systemScheme;
        }
        else if (ColorScheme_scheme === ColorScheme_systemScheme) {
            ColorScheme_auto = gTrue;
            ColorScheme_scheme = nextScheme;
        }

        StsColorScheme_updateIcons(gTrue);
        ColorScheme_refresh();
    });
}

/**
 * 更新按钮图标
 * @param showBubble 是否显示泡泡提示
 */
function StsColorScheme_updateIcons(showBubble) {
    let icon = _icoAutoMode_,
        info = V_lang_text45() + " - ",
        mode;

    // 不是 auto 模式时
    if (!ColorScheme_auto) {
        // 切换到匹配的当前模式的图标
        if (ColorScheme_scheme === _light_) {
            icon = _icoLightMode_;
            mode = V_lang_text(91, [
                "浅色",
                _Light_
            ]);
        }
        else if (ColorScheme_scheme === _dark_) {
            icon = _icoDarkMode_;
            mode = V_lang_text(92, [
                "深色",
                _Dark_
            ]);
        }
        JQ_addClass(StsColorScheme_ui, _selected_);
    }
    // 针对 auto 模式
    else {
        JQ_removeClass(StsColorScheme_ui, _selected_);
        mode = V_lang_text(90, [
            "跟随系统",
            "Automatically"
        ]);
    }

    // 更新提示
    ToolTips_bind(StsColorScheme_ui, info + V_ui_strong(mode) + _br_ + V_ui_sub(_, _, V_ui_wrap_kbd("D")));
    // 工具栏提示没有显示时，则显示泡泡信息
    showBubble && !ToolTips_isShowed()
        && iInfoTips.bubble(info + V_ui_strong(mode), 2000, _corner_ + "3");

    // 调整模式切换按钮图标
    StsColorScheme_ui.hm(V_ui_svgIcon(icon, 20, 20, _text_));
}

// ==================== 状态栏的检查新版本类 ==================== //

let StsNewVersion_checkOriginCloudFlare = _vlookPagesHost_CloudFlare_, //"https://vlook-doc.pages.dev",
    StsNewVersion_checkUrlCloudFlare = StsNewVersion_checkOriginCloudFlare + "/act/" + _chkUpdate_ + ".html?ts=" + V_getTime(),
    StsNewVersion_checkOriginGitHub = _madmaxchowHost_GitHub_,
    StsNewVersion_checkUrlGitHub = StsNewVersion_checkOriginGitHub + "/VLOOK/act/" + _chkUpdate_ + ".html?ts=" + V_getTime();
/**
 * 构造函数
 */
function NewVersion_init() {
    ToolTips_bind(StsNewVersion_ui, _VLOOK_ + "™ " + V_lang_text(36, [
        "- 已推出新版本，请更新！",
        "- A new version has been released, please update!"
    ]));
    StsNewVersion_ui.uC().ck(() => {
        gWindow.open(_httpsPrefix_ + _githubVlook_ + "/releases", "github-vlook");
    });
}

/**
 * 检查新版本
 */
function NewVersion_check() {
    let lastCheckTime = V_data_read(_new_version_check_time_, gTrue),
        latestVer = V_data_read(_new_version_, gTrue);
    // ！！！不要删除！！！用于测试效果
    // 用于模拟测试使用
    // gVer = "V25.0";
    // 在检查周期内时，直接读取本地数据
    if (lastCheckTime !== gNull
        && (V_getTime() - JS_parseInt(lastCheckTime)) < (1000 * 3600 * 24 * 7)) { // 检查周期为 7 天 (1000 * 3600 * 24 * 7)
        // 显示新版本提示
        latestVer > gVer.ss(1, gVer.length)
            && NewVersion_yes(latestVer);
        WARN("-> (" + _local_ +___+ _check_ + ") Lastest " + _version_, latestVer);
        return;
    }

    // ----------
    // 超出检查周期后才向服务端发起新的检查
    let frameCloudFlare = document.getElementById(_vlook_chk_update_cloudflare_),
        frameGitHub = document.getElementById(_vlook_chk_update_github_);

    // 等待窗口打开完成后发送消息
    frameCloudFlare.onload = function() {
        LOG("-> " + StsNewVersion_checkOriginCloudFlare);
        frameCloudFlare.contentWindow.postMessage(gVer, StsNewVersion_checkOriginCloudFlare);
    }
    frameGitHub.onload = function() {
        LOG("-> " + StsNewVersion_checkOriginGitHub);
        frameGitHub.contentWindow.postMessage(gVer, StsNewVersion_checkOriginGitHub);
    }

    // 设置检查更新的 src ，触发进行新版本检查
    frameCloudFlare.src = StsNewVersion_checkUrlCloudFlare;
    frameGitHub.src = StsNewVersion_checkUrlGitHub;

    // 检查结果的接收通过 window.onmessage 进行处理
}

/**
 * 显示新版本提示
 */
function NewVersion_yes(latestVer) {
    StsNewVersion_ui.hm(V_ui_svgIcon(_icoNewVersion_, 20, 20, _text_) + _nbsp_ + "V" + latestVer);
    JQ_addClass(StsNewVersion_ui, _enabled_);
}

// ==================== 链接检查器类 ==================== //

let LinkTool_checkHashUI = gUndefined,
    LinkTool_checkHashMode = gFalse,
    LinkTool_panelList = gUndefined,
    LinkTool_panelItems = gUndefined,
    LinkTool_enabled = gTrue,
    LinkTool_warningCount = 0,
    LinkTool_errorAnchorCount = 0,
    LinkTool_errorAddressCount = 0,
    LinkTool_headerDupSet = [], // 文本
    LinkTool_headerDupRegExSet = [], // 正则表达式
    LinkTool_pageMap = {},
    LinkTool_textMap = {},
    LinkTool_mask = gUndefined;

/**
 * 构造函数
 */
function LinkTool_init(mask) {
    LinkTool_checkHashUI = V_byClass(_v_check_hash_);
    LinkTool_panelList = V_byClass(_v_link_info_list_); // 坏链主界面
    LinkTool_panelItems = V_byClass(_v_link_info_list_ + __items_); // 坏链内容列表
    LinkTool_enabled = gTrue;

    // 读取指定允许重复的章节标题预置选项
    let headerDup = V_getMetaByName(_vlook__ + "header-dup");
    if (headerDup !== gUndefined) {
        // 直接使用分号进行分割，是由于导出的标题会自动过滤掉标点符号
        // 所以一般导出后的 HTML 不会存在标题内容中还含有标点符号的冲突
        let dups = headerDup.x().sp(";");
        for (let i = 0; i < dups.length; i++) {
            // 正则表达式
            dups[i].sW("/") && dups[i].eW("/")
                ? LinkTool_headerDupRegExSet.push(new RegExp(dups[i].substring(1, dups[i].length - 1)))
                // 文本
                : LinkTool_headerDupSet.push(dups[i]);
        }
    }

    ToolTips_bind(StsLinkChkResult_ui, V_lang_text81());
    StsLinkChkResult_ui.uC().ck(() => {
        V_ui_isHidden(LinkTool_panelList)
            && LinkTool_show(_checked_);
    });

    // 遮罩
    LinkTool_mask = mask;
    LinkTool_mask.bindPartner(() => {
        LinkTool_hide()
    }, LinkTool_panelList);

    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(LinkTool_panelItems);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}

/**
 * 将 .md 的链接转换为 .html 链接（或指定后缀）
 */
function LinkTool_mdToHtml() {
    let xmd = V_getParamVal(_xmd_),
        newExt = ".html";

    // 全局配置，禁用转换，则停止
    if (xmd === _off_)
        return;

    // 全局配置，指定转换的后缀
    if (xmd !== gNull)
        newExt = "." + xmd;

    $("a" + V_attrCSS(_href_, ".md", "*")).e((index, element) => {
        let _t = $(element),
            href = _t.a(_href_),
            xmd = V_getUrlQueryParams(href)[_xmd_];

        // 单个链接指定禁用转换，则停止
        if (xmd === _off_)
            return gTrue;

        // 单个链接指定转换的后缀
        xmd !== gUndefined
            ? _t.a(_href_, href.r(".md", "." + xmd))
            : _t.a(_href_, href.r(".md", newExt)); // 默认的全局后缀
    });
}

/**
 * 添加检查结果条目
 * @param type 类型：warning、error
 * @param targetToJump 目标对象
 * @param content 内容
 */
function LinkTool_addToCheckResult(type, targetToJump, content) {
    let id = gUndefined;
    if (type === _warning_) {
        LinkTool_warningCount++;
        id = _vk__ + _warning_ + __hash_ + LinkTool_warningCount;
    }
    else if (type === _error_ + __hash_) {
        LinkTool_errorAnchorCount++;
        id = _vk__ + _error_ + __hash_ + LinkTool_errorAnchorCount;
    }
    else if (type === _error_ + __address_) {
        LinkTool_errorAddressCount++;
        id = _vk__ + _error_ + __address_ + LinkTool_errorAddressCount;
    }
    // 异常涉及的对象无 id 属性时添加，用于后续能跳转至该位置
    targetToJump.a(_id_) === gUndefined
        && targetToJump.a(_id_, id);

    let item = $(V_ui_span(_v_toc_item_, V_attr(_data_hash_, targetToJump.a(_id_)), content));
    V_ui_addAnimate(item);
    JQ_addClass(item, type);

    // 添加链接异常样式及属性
    JQ_addClass(V_byID(item.a(_data_hash_)).a(_tabindex_, 99), _v_link_error_);
    // 添加节点
    LinkTool_panelItems.ap(item);

    // 刷新状态栏对应的按钮 UI
    JQ_addClass(StsLinkChkResult_ui, type);

    // V_ui_adjustHoverStyle(item);
    item.uC().ck(() => {
        V_ui_tg_currentItem(LinkTool_panelItems, item);

        // 如果没有拖选的文本，则继续
        V_getSelectedText() === _
            && (
                V_gotoHash(item.a(_data_hash_)),
                LinkTool_hide()
            );
    });
}

/**
 * 检查链接
 * @param hash 锚点
 */
function LinkTool_notFoundHash(hash) {
    return (!hash.sW("#")
    // && V_length($(_idWrite_ + " #" + hash + ","
        && V_length($(_idWrite_ +___+ V_attrCSS(_id_, hash) + ","
            + _idWrite_ + " a" + V_attrCSS(_name_, hash))) === 0);
}

/**
 * 检查来自 query 参数中的 hash 集合
 */
function LinkTool_checkHashSet() {
    let count = V_getParamVal(_checkCount_);
    if (count === gNull)
        return false;

    // 设置文档图标：检查中
    let var_iCheck = "--i-check";
    V_ui_changeDocIcon(V_getVarVal(var_iCheck + "ing"));

    count = JS_parseInt(count);

    // 检查当前文档中是否有指定的 hash 集
    let hash = _,
        info = V_lang_text67() +___,
        notFoundCount = 0;
    for (let i = 1; i <= count; i++) {
        hash = V_getParamVal(_hash_ + i);
        // 没有找到
        hash !== gNull && LinkTool_notFoundHash(hash)
            && (
                notFoundCount++,
                LinkTool_checkHashUI.ap(V_ui_div(_, _item_,
                    V_ui_label(_, _, info + notFoundCount + " #") + hash))
            );
    }

    // 所有 hash 都能在当前文档中找到
    let btn;
    if (notFoundCount === 0) {
        // 设置文档图标：检查通过
        V_ui_changeDocIcon(V_getVarVal(var_iCheck + "-passed"));

        JQ_addClass(LinkTool_checkHashUI, _all_found_)
        LinkTool_checkHashUI.ap(V_ui_div(_, _all_found_, V_lang_text(47, [
            "检查通过",
            "Hash check passed"
            ])));
        // 关闭标签页
        btn = $(V_ui_div(_, _v_check_hash_ + "-re" + _check_, V_lang_text17()));
    }
    // 部分 hash 不存在
    else {
        // 设置文档图标：检查不通过
        V_ui_changeDocIcon(V_getVarVal(var_iCheck + "-failed"));

        JQ_addClass(LinkTool_checkHashUI, "not-" + _found_)
        // 重新检查
        btn = $(V_ui_div(_, _v_check_hash_ + "-re" + _check_, V_lang_text(49, [
            "已修订，重新检查",
            "Hash check failed"
            ])));
    }

    // 添加操作按钮（根据以上不同检查结果生成）
    LinkTool_checkHashUI.ap(btn);
    // V_ui_adjustHoverStyle(btn);
    btn.uC().ck(() => {
        gWindow.close();
    });

    // 关闭检查结果 UI
    btn = $(V_ui_div(_, _v_check_hash_ + "-" + _close_, V_lang_text(23, [
        _startReading_cn_,
        _startReading_en_
        ])));
    LinkTool_checkHashUI.ap(btn);
    // V_ui_adjustHoverStyle(btn);
    btn.uC().ck(() => {
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

    // --------------------
    // 标题内容检查
    let headerTextSet = [],
        xRefSet = [];
    $(_idWrite_ + " :is(" + _h1_6_ + V_not(__first_child_) + ")," // h1-h6
        + _idWrite_ +___+ _blockquote_ + ExtQuote_subTitle + "," // 引用块小标题
        + _idWrite_ +___+ _summary_).e((index, element) => { // 引用块折叠
        let _t = $(element),
            text = _t.t().x();

        // 跳过无效的标题
        if (V_ui_isHidden(_t))
            return;

        // 是否有重复标题
        if (headerTextSet.indexOf(text) === -1)
            headerTextSet.push(text);
        // 重复标题的处理
        else if (LinkTool_headerDupSet.indexOf(text) === -1 // 文本匹配
            && !__matchForHeaderDupReSet(text)) // 正则表达式匹配
                __addDuplicateChapter(_t, text);

        // --------------------
        // 标题转换为 id 的检查并修正：去掉 id 中的标点符号（不符合锚点相关规范）
        let id = _t.a(_id_);
        if (id !== gUndefined) {
            let newId = LinkTool_transSpecHash(id);
            if (V_length(newId) < V_length(_t.a(_id_)) || newId !== id) {
                // 更新为规范的 id
                _t.a(_id_, newId);
                WARN("Fixed " + _header_ + " id '" + _t.t() + "' id:\n#" + id + " --> #" + newId);
            }
        }
    });

    // 题注交叉引用源 id 检查
    V_byClass(_v_cap_cntr_ + V_attrCSS(_id_)).e((index, element) => {
        let _t = $(element),
            text = _t.a(_data_cap_for_id_), //_t.a(_id_),
            cap = _t.f(_figcaption_ + ">" + _span_).t().x();

        // 记录交叉引用源数据
        V_length(cap) > 0
            && xRefSet.push([_t.a(_id_), cap]);

        // 是否有重复标题
        if (headerTextSet.indexOf(text) === -1)
            headerTextSet.push(text);
        // 重复标题的处理
        else if (LinkTool_headerDupSet.indexOf(text) === -1 // 文本匹配
            && !__matchForHeaderDupReSet(text)) // 正则表达式匹配
                __addDuplicateChapter(_t, text);
    });

    // 检查所有页内链接对应的锚点是否都存在
    $(_idWrite_ + " a, ." + _md_toc_item_ + ">a").e((index, element) => {
        let _t = $(element),
            text = _t.t().x(),
            title = _t.a(_title_),
            href = _t.a(_href_),
            page = V_getUrlWithoutHash(href),
            hash = V_getUrlHash(href),
            hashNoMark = _;

        // 获取指定对象的所有子元素（及其子元素）的文本内容
        let joinedText = V_joinNodesText(_t, " • ");
        if (V_length(joinedText) > 0)
            text = joinedText;

        // 忽略无效数据
        // 对于 href="#" 的情况，在 Typora 1.6.x 开始的版本需要考虑，因为 Typora 生成的 HTML 会自动过滤无效的页内链接，直接用 # 代替
        if (href === gUndefined)
            return gTrue;

        // --------------------
        // 链接内容检查并修正：去掉锚点中的标点符号（不符合锚点相关规范）
        if (hash !== gUndefined && !href.sW(_mjx__)) {
            hashNoMark = hash.ss(1, V_length(hash));
            if (V_length(hashNoMark) > 0) {
                let newHash = LinkTool_transSpecHash(hashNoMark);
                if (V_length(newHash) < V_length(hashNoMark) || newHash !== hashNoMark) {
                    // 更新为规范的 hash
                    hash = "#" + newHash;
                    // 更新并重新获取 href 的值
                    _t.a(_href_, V_getUrlWithoutHash(href) + hash);
                    href = _t.a(_href_);

                    WARN("Fixed link [" + _t.t() + "](#" + hashNoMark + ") hash:\n#" + hashNoMark + " --> " + href);
                }
            }
        }

        // --------------------
        // 页内链接
        // 以 #mjx- 开始的链接为行间公式的页内引用块，会导致 jQuery 的正则表达式解析错误，须跳过
        if (href === "#")
            __addErrorHash(_t, hash);
        // 检索是否存在与该内链对应的锚点
        else if (href.sW("#") && !href.sW(_mjx__)) {
            let anchor = href.ss(1, V_length(href));
            // 没有检索到对应的锚点
            LinkTool_notFoundHash(anchor)
                && __addErrorHash(_t, href);

            // --------------------
            // 如果为交叉引用，添加指定标识
            let classValue = _t.p().a(_class_);
            // 跳过 .md-toc-item 内的 a 链接
            if (classValue === gUndefined || classValue.i(_md_toc_item_) === -1) {
                for (let i = 0; i < V_length(xRefSet); i++) {
                    if (xRefSet[i][0] === anchor) {
                        _t.a(_data_x_ref_, xRefSet[i][1]);
                        break;
                    }
                }
            }
        }

        // --------------------
        // 将外部链接添加到链接地图中
        // 在链接内容检查前执行，目的是获得原始的 hash 信息便于出错时查找修正
        if (V_length(page) > 0 && !page.sW("?")
            && page.i(_docLibIdentifier_) === -1
            && !page.sW("mailto:")) {
            if (title !== gUndefined)
                title = title.x();
            if (V_isLength0(text) && V_length(title) > 0)
                text = title;
            LinkTool_addToMap(text, page, hashNoMark);
        }
    });

    // --------------------
    // 生成链接地图
    __genLinkMap();

    // 对无锚点的站内链接、外部链接进行分类排序
    V_sortByAttr(LinkTool_panelItems,
        LinkTool_panelItems.f("." + _v_map_item_ + ":is(.a,.b)"), _class_, gTrue);

    // 以正则表达式进行重复标题检查
    function __matchForHeaderDupReSet(text) {
        for (let i = 0; i < LinkTool_headerDupRegExSet.length; i++) {
            if (text.m(LinkTool_headerDupRegExSet[i]) !== gNull)
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
                V_length(h) > 0
                    && (
                        hashIndex++,
                        urlParams.append(_hash_ + hashIndex, LinkTool_transSpecHash(h))
                    );
            }

            // 生成外部页面的目标链接，用于检查对应 hash 是否存在
            urlParams.size > 1
                ? (
                    urlParams.append(_checkCount_, hashIndex),
                    urlParams.set(_checkHash_, 1), // 更新检查 hash 的标记
                    urlParams.append("ws", 0),
                    __addLinkMapItem(LinkTool_textMap[page][0], pageIndex, page, urlParams, hashIndex)
                )
                : __addLinkMapItem(LinkTool_textMap[page][0], pageIndex, page, _, 0);
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
                linkToHashSet += (++cc > 1 ? _nbsp_+_nbsp_ : _) + V_ui_a(key, page + h, h, page);
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
            extLink = (page.i("://") > -1),
            checkHash = (hashSetLen > 0 ?
                V_ui_label(_, _, V_ui_strong(hashCount) +___+ V_lang_text(51, ["个锚点", "Hash"])
                    + V_ui_a(_, page + (page.i("?") > -1 ? "&" : "?") + hashSet,
                            V_ui_svgIcon(_icoCheck_, 12, 14, _theme_) +___+ V_lang_text(52, ["检查锚点", "Check Hash"]),
                    __blank_))
                : _),

            // 生成最终的条目内容
            item = $(V_ui_div(_v_map_item_ + pageIndex,
                    // 以下 a, b 是用于对无锚点的站内链接、外部链接进行分类排序
                    _v_map_item_ +___+ (!extLink && hashCount === 0 ? "a" : extLink ? "b" : _),
                    V_ui_div(_, _,
                        (!extLink
                            ? V_ui_svgIcon(_icoDocLibBm_, 20, 18, _alpha_) // 站内链接图标
                            : V_ui_svgIcon(_icoDocLibExt_, 20, 20, _alpha_) // 站外链接图标
                        ) + _nbsp_
                        // 页面或链接的直达链接
                        + V_ui_a(_, page,
                            // 页面或链接入口
                            (V_length(text) > 0
                                ? (V_length(linkToHashSet) > 0
                                    ? V_lang_text82() : text)
                                : V_lang_text(83, ["链接", "Link"])), page)
                        // 检查锚点的链接
                        + (V_length(page) + hashSetLen > 8000
                                ? overLimit
                                : checkHash)
                    )
                    // 页面或链接内容
                    + (V_length(linkToHashSet) > 0 ? _br_ : _)
                    + V_ui_span(_, _, JS_decodeURIComponent(page))
                    // 直达锚点的链接
                    + linkToHashSet
                ));

        V_ui_addAnimate(item);
        // V_ui_adjustHoverStyle(item);

        item.f("a").uC().ck(() => {
            V_ui_tg_currentItem(LinkTool_panelItems, item);
        });

        // 有锚点的添加到前面
        hashCount > 0
            ? LinkTool_panelItems.pp(item)
            // 无锚点的添加到后面
            : LinkTool_panelItems.ap(item);
    }

    // 添加一条警示记录：重复名称章节标题
    function __addDuplicateChapter(aObj, text) {
        LinkTool_addToCheckResult(_warning_, aObj,
            V_ui_label(_, _, V_lang_text53()) + text);
    }

    // 添加一条错误记录：无效的页内链接记录
    function __addErrorHash(aObj, hash) {
        LinkTool_addToCheckResult(_error_ + __hash_, aObj,
            V_ui_label(_, _, V_lang_text54()) + aObj.t()
                + " (" + hash + ")");
    }
}

/**
 * 转换为规范的 hash 内容
 * @param hash 要处理的 hash
 */
function LinkTool_transSpecHash(hash) {
    // 将空格转换为连字符
    hash = hash.r(/\s/g, "-").l();
    hash = hash.r(/^~~(.+)~~$/g, "$1");
    // 对标点符号进行转换处理
    return hash.r(/\p{P}|\+/gu, (p) => {
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
    !(page in LinkTool_pageMap)
        && (
            LinkTool_pageMap[page] = [],
            LinkTool_textMap[page] = [],
            LinkTool_textMap[page].push(text)
        );

    // 向对应键的数组中添加内容，重复的 hash 不添加
    LinkTool_pageMap[page].indexOf(hashNoMark) === -1
        && LinkTool_pageMap[page].push(hashNoMark);
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
    let tocItems = LinkTool_panelList.f("." + _v_toc_item_ + V_not(V_attrCSS(_data_history_))),
        mapItems = LinkTool_panelList.f("." + _v_map_item_),
        historyItems = LinkTool_panelList.f("." + _v_toc_item_ + V_attrCSS(_data_history_));

    let curType = LinkTool_panelList.a(_data_content_type_);
    LinkTool_panelList.a(_data_content_type_, type);

    // 当前显示的不是指定的内容类型才进行处理
    // 已知问题：如果打开后才被添加的条目，不切换不同的类型时不会刷新显示
    if (curType === gUndefined || curType !== type) {
        // 显示当前页面页内链接的检查结果
        if (type === _checked_) {
            LinkTool_panelList.a(_data_title_, V_lang_text81());
            mapItems.hide();
            historyItems.hide();
            LinkTool_updateDataNoMore(tocItems);
            tocItems.show();
        }
        // 显示链接地图
        else if (type === _map_) {
            LinkTool_panelList.a(_data_title_, V_lang_text3());
            tocItems.hide();
            historyItems.hide();
            LinkTool_updateDataNoMore(mapItems);
            mapItems.show();
        }
        // 显示导航历史
        else if (type === _history_) {
            LinkTool_panelList.a(_data_title_, V_lang_text65());
            tocItems.hide();
            mapItems.hide();
            LinkTool_updateDataNoMore(historyItems);
            historyItems.show();
        }
    }

    // 显示面板
    LinkTool_panelList.show();
    LinkTool_mask.show();
    // 强制触发一次滚动事件处理，以生成需要的样式
    V_ui_scrollingUpdate(LinkTool_panelItems);
}

/**
 * 更新面板条目提示信息
 * @param items 条目集
 */
function LinkTool_updateDataNoMore(items) {
    V_ui_set_dataNoMore(LinkTool_panelItems, items);
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
    if (V_ui_isHidden(LinkTool_panelList))
        return;

    if (V_noCombKeys(combKeys) && V_isEscape(key))
        LinkTool_isShowed() && (
            LinkTool_hide(),
            // 如果事件已处理，则禁止双重操作
            V_preventDefault(event)
        );
}

// ==================== 背景遮罩类 ==================== //

/**
 * 构造函数
 * @param id 标识
 * @param align 扩展样式：left / right / bottom / center
 * @param close 是否显示关闭提示器
 */
function BgMask(id, align, close) {
    let T = this;
    V_length(T, 1);
    T.style = align;

    VOM_doc().af(V_ui_div(_, _v_mask_ +___+ (align !== gUndefined ? align +___ : _) + id +___+ _v_backdrop_blurs_,
        V_ui_copyrightInfo()));

    // 根据动效等级初始化遮罩样式
    // V_ui_initEffectLevel();

    T.ui = V_byClass(_v_mask_ + "." + id);
    T.closer = gUndefined;

    // 生成关闭提示器
    if (close !== gNull && close) {
        T.ui.ap(V_ui_div(_, _v_mask_close_ +___+ T.style,
            V_ui_svgIcon(_icoMaskCloser_, 14, 60, _btnFc_)));
        T.closer = T.ui.ch("." + _v_mask_close_);
    }

    T.prt = gUndefined;
    T.prtUI = gUndefined;

    /**
     * 绑定联动对象
     * @param partner 联动对象
     * @param ui 联动对象的 UI
     */
    T.bindPartner = function (partner, ui) {
        T.prt = partner;
        T.prtUI = ui;
    }

    /**
     * 显示遮罩
     */
    T.show = function(scrollingFreez = gTrue) {
        // 冻结滚动
        scrollingFreez
            && V_doc_scroll_freeze();
        V_doc_block = gTrue;

        // 总是在 target 下显示
        T.ui.c(_z_index_, T.prtUI.c(_z_index_) - 1);

        // 对「关闭」提示器的处理
        if (T.closer !== gUndefined) {
            // 默认是 style = left 的位置
            let offset = 30,
                x = JS_parseInt(T.prtUI.c(_left_)) + T.prtUI.w() + offset,
                y = JS_parseInt(T.prtUI.c(_top_)) + (T.prtUI.h() - T.closer.h()) / 2;
            // 对齐方式 left / right 的处理
            if (T.style === _left_ || T.style === _right_)
                T.closer.c(_left_, T.style === _right_
                        ? JS_parseInt(T.prtUI.c(_left_)) - T.closer.w() - offset
                        : x);
            // 对齐方式 bottom 的处理
            else if (T.style === _bottom_) {
                y = JS_parseInt(T.prtUI.c(_bottom_)) + T.prtUI.h() + offset;
                T.closer.c(_bottom_, y + 20);
            }
        }

        // 绑定 VLOOK logo 的点击事件
        T.ui.f("." + _v_copyright_ + " ." + _v_copyright_svg_ico_).uC().ck((event) => {
            env.show(V_eventCurrentTarget(event));
        });

        // 点击遮罩隐藏联动对象
        T.ui.uC().ck((event) => {
            if (event.target.tagName === "A")
                return;

            // 取消冻结滚动
            V_doc_scroll_unfreeze();
            // 隐藏联动对应
            typeof(T.prt) === _function_
                 ? T.prt()
                : T.prt.hide();

            T.hide();
        });

        T.ui.show();
    }

    /**
     * 隐藏遮罩
     */
    T.hide = function() {
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
    V_setVarVal("--v-ex-limit", ContentFolder_limit + "px");
}

/**
 * 添加内容
 */
function ContentFolder_add(content, type) {
    // 跳过不启用折叠，或任意父级元素是引用块折叠的情况
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
let ContentFolder_adjust = V_debounce(() => { // 以防抖方式执行
    if (!ContentFolder_enabled)
        return;

    // 提前中断未完成的处理
    if (V_length(ContentFolder_buildTimers) > 0)
        for (let i = 0, len = V_length(ContentFolder_buildTimers); i < len; i++)
            V_clearTimer(ContentFolder_buildTimers.shift());

    // 重新开始构建内容展开操作区
    ContentFolder_rebuild();
}, 1000);

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
        ruleText !== gUndefined && ruleText.i("." + _v_cap_cntr_ + "." + _expander_ + ".id-") > -1
            && gStyle.deleteRule(j);
    }

    // 重建需要重建的部分
    for (let i = 0, len = V_length(ContentFolder_contents); i < len; i++) {
        // 对类 img 长内容
        if (V_tagName(ContentFolder_contents[i]).sW("i")) {
            // 创建一个Image对象，实现图片的预下载
            let img = new Image();
            // 获得图片实际加载的 src（针对 img 指定 srcset, darksrc, darksrcset 的情况）
            img.src = ContentFolder_contents[i].get(0).currentSrc;
            // 如果图片已经存在于浏览器缓存，直接处理
            if (img.complete)
                ContentFolder_buildTimers.push(
                    V_later(() => {
                        ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                    }, 100)
                );
            // 等待图片下载完成后再处理
            else
                img.onload = function() {
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                }
        }
        // 非 img 类长内容
        else {
            // 设置按不同时间间隔执行，减少在处理数量过多时，会阻塞 UI
            ContentFolder_buildTimers.push(
                V_later(() => {
                    ContentFolder_checkAndProcess(ContentFolder_contents[i], gTrue, i);
                }, 100)
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
        tagName = V_tagName(target),
        isImg = tagName.sW("i");

    // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
    if (rebuild)
        container = container.p();

    // 已被点击展开过了，在重建时则跳过
    let expanded = container.a(_data_content_expanded_);
    if (expanded === _true_) {
        ContentFolder_buildTimers.shift();
        return;
    }

    // 针对 img 内容，进行父容器的正确性处理
    if (isImg) {
        // 图像若加载晚于 img 的题注生成，其父容器则题注而不是 VLOOK 标识的 img 父容器
        if (container.a(_data_cntr_) === gUndefined)
            container = container.p();
    }

    // 初始化折叠配置
    container.a(_data_content_folded_, _false_); // 未折叠
    container.a(_data_content_expanded_, _false_); // 已被点击扩展了
    container.c(_height_, _auto_);
    // 针对 Mermaid 图表，不添加会导致出现滚动条
    tagName.sW("s")
        && container.c(_padding_bottom_, "10px");

    // 高度超出折叠要求高度时进行折叠
    target.oH() > ContentFolder_limit
        // 构建内容展开操作区
        && ContentFolder_buildContentExpander(target, container, tagName, i);

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
    container.a(_data_content_folded_, _true_);

    // 表格 <table>、Mermaid <svg> 图表的特性处理
    (tagName.sW("t") || tagName.sW("s"))
        ? container.c(_height_, ContentFolder_limit)
            .c(_overflow_x_, _auto_) // 可横向滚动
            .c(_overflow_y_, _hidden_)
        // 非表格，非 Mermaid 图表的处理
        : container.c(_height_, ContentFolder_limit)
            .c(_overflow_y_, _hidden_);

    let w = JS_mathCeil(JS_parseFloat(container.c(_width_)));

    // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
    V_length(container.f(_table_)) > 0
        && JQ_addClass(container.f(ContentFolder_rowNumFilter), _v_tbl_row_num_hidden_);

    // 重新适配展开操作区尺寸
    let tW = JS_mathCeil(JS_parseFloat(target.c(_width_)));
    if (w > tW)
        w = tW;

    container.a(_data_ex_label_, V_lang_text(55, [
        "显示全部",
        "Show all"
    ]) + " ▼");
    let newClass = "." + _v_cap_cntr_ + "." + _expander_
        + ".id-" + i + "::before{" + _width_ + ":" + w + "px;}";
    gStyle.insertRule(newClass, 0);
    JQ_addClass(container, _expander_ + " id-" + i);

    container.a(_data_content_type_, tagName);

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

    let tagName = container.a(_data_content_type_);

    // 移除内容展开操作区
    JQ_removeClass(container, _expander_);

    // 展开对应的内容
    container.a(_data_content_folded_, _false_);
    container.a(_data_content_expanded_, _true_);
    container.c(_height_, _auto_);
    // 针对表格 <table>、Mermaid <svg> 图表增加滚动属性
    (tagName.sW("t") || tagName.sW("s"))
        ? container.c(_overflow_, _auto_)
        // 非表格、非 Mermaid 图表的处理
        : container.c(_overflow_y_, "initial");

    // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
    V_length(container.f(_table_)) > 0
        && JQ_removeClass(container.f(ContentFolder_rowNumFilter), _v_tbl_row_num_hidden_);
}

// ==================== 工具提示信息类 ==================== //

let ToolTips_ui = gUndefined,
    ToolTips_continueShow = gFalse, // 是否激活持续显示
    ToolTips_lastStyle = gUndefined,
    ToolTips_aniTimer = gNull,
    ToolTips_continueTimer = gNull,
    ToolTips_delay = 1000;

/**
 * 构造函数
 */
function ToolTips_init() {
    ToolTips_ui = V_byClass(_v_tool_tips_);

    V_ui_addAnimate(ToolTips_ui, _opacity_);
}

/**
 * 绑定操作相关事件
 * @param target 对象
 * @param tips 提示内容
 * @param align 对齐方式，auto/center/right
 */
function ToolTips_bind(target, tips, align) {
    tips !== gUndefined && V_length(tips.x()) > 0
        && target.a(_data_tips_, tips);

    if (align === gUndefined)
        align = _auto_;

    // V_ui_bindHover(target);

    target.on(_mouseEnter_, () => {
        ToolTips_show(target, align);
    }).on(_mouseLeave_, () => {
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
    if (V_isMobile())
        return;

    ToolTips_ui.hm(follower.a(_data_tips_));

    // 强制取消最后一次延时显示的处理
    ToolTips_aniTimer = V_clearTimer(ToolTips_aniTimer);
    // 强制取消隐藏后指定时间内取消持续显示的处理
    ToolTips_continueTimer = V_clearTimer(ToolTips_continueTimer);

    ToolTips_lastStyle = classValue;

    const space = 10,
        tipsW = ToolTips_ui.iW(),
        tipsH = ToolTips_ui.iH(),
        ww = jq_Window.w() - space,
        wh = jq_Window.h() - space;
    let left = follower.oL(),
        top = follower.oT() - V_ui_getScrollTop(),
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

    ToolTips_lastStyle !== gUndefined
        && JQ_addClass(ToolTips_ui, ToolTips_lastStyle);

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
    ToolTips_aniTimer = V_later(() => {
        ToolTips_continueShow = gTrue; // 一旦显示后，激活持续显示
        V_ui_fadeShow(ToolTips_ui);

    }, waitTime);
}

/**
 * 工具提示当前是否显示
 */
function ToolTips_isShowed() {
    return ToolTips_ui.c(_visibility_) === _visible_;
}

/**
 * 隐藏工具提示
 */
function ToolTips_hide() {
    // 隐藏后在指定时间内取消持续显示
    ToolTips_continueTimer = V_clearTimer(ToolTips_continueTimer);
    ToolTips_continueTimer = V_later(() => {
        ToolTips_continueShow = gFalse;
    }, ToolTips_delay);

    // 强制取消最后一次延时显示的处理
    ToolTips_aniTimer = V_clearTimer(ToolTips_aniTimer);
    V_ui_fadeHide(ToolTips_ui);

    ToolTips_lastStyle !== gUndefined
        && JQ_removeClass(ToolTips_ui, ToolTips_lastStyle);
}

// ==================== 弹层提示信息类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 */
function InfoTips(mask) {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_info_tips_);
    T.aniTimer = gNull;

    // 绑定点击事件
    T.ui.uC().ck = function() {
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
     * @param pos 显示位置。如果为事件源对象，则表示跟随其位置；如果为 corner3 ，则表示对应的角落；为空时则表示默认居中
     */
    T.bubble = function (message, delay, pos) {
        T.show(message, delay, gFalse, _bubble_, pos);
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
     * 显示通知提示信息
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param type 类型。info/error
     * @param targetPos 事件源/位置，如果为事件源对象，则表示跟随其位置；如果为 corner3 ，则表示对应的角落；为空时则表示默认居中
     */
    T.show = function (message, delay, mask, type, targetPos) {
        T.aniTimer = V_clearTimer(T.aniTimer);

        T.ui.hm(message);

        // 先重置为默认值
        JQ_removeClass(T.ui, _error_);
        JQ_removeClass(T.ui, _bubble_);
        T.ui.c(_left_, _)
            .c(_top_, _)
            .c(_width_, _)
            .c(_height_, _)
            .c(_right_, _auto_)
            .c(_bottom_, _auto_)

        if (type === _error_)
            JQ_addClass(T.ui, _error_);
        else if (type === _bubble_)
            JQ_addClass(T.ui, _bubble_);

        // 有指定显示位置时
        if (targetPos !== gUndefined) {
            // 跟随事件目标对象显示
            if (targetPos instanceof jQuery)
                V_ui_moveToTarget(T.ui, targetPos);
            // 在指定的角显示
            else if (targetPos.sW(_corner_))
                V_ui_moveToCorner(T.ui, targetPos);
        }
        // 居中显示
        else
            V_ui_moveToCenter(T.ui);

        T.ui.show();

        // 延时后自动关闭
        if (delay !== gNull)
            T.aniTimer = V_later(() => {
                    T.hide();
                }, delay);

        // 显示遮罩
        mask
            && T.mask.show();
    }

    /**
     * 隐藏弹窗信息
     */
    T.hide = function() {
        T.ui.hide();
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_ui_isHidden(T.ui))
            return;

        if (V_noCombKeys(combKeys) && V_isEscape(key))
            V_ui_isShowed(T.ui) && (
                T.hide(),
                // 如果事件已处理，则禁止双重操作
                V_preventDefault(event)
            );
    }
}

// ==================== 文档更多内容遮罩栏 ==================== //

let MoreDocContent_ui_before = gUndefined,
    MoreDocContent_ui_after = gUndefined,
    MoreDocContent_margin_left = 0;
/**
 * 构造函数
 */
function MoreDocContent_init() {
    MoreDocContent_ui_before = V_byClass(_v_more_doc_content_ + _before_);
    MoreDocContent_ui_after = V_byClass(_v_more_doc_content_ + _after_);
}

/**
 * 刷新显示更多内容遮罩栏
 * @param scrollTop 文档当前滚动位置，如果为空则自动获取
 */
function MoreDocContent_refresh(scrollTop) {
    if (scrollTop === gUndefined)
        scrollTop = V_ui_getScrollTop();

    // 顶部 before UI
    scrollTop > gScrollEdge
        ? JQ_removeClass(MoreDocContent_ui_before, _no_more_)
        : JQ_addClass(MoreDocContent_ui_before, _no_more_);
    // if (scrollTop > gScrollEdge)
    //     MoreDocContent_ui_before.c(_display_) === _none_
    //         && MoreDocContent_ui_before.show();
    // else
    //     MoreDocContent_ui_before.hide();

    // 底部 after UI
    (scrollTop + jq_Window.h()) > (jq_Document.h() - gScrollEdge)
        ? JQ_addClass(MoreDocContent_ui_after, _no_more_)
        : JQ_removeClass(MoreDocContent_ui_after, _no_more_);
    // if ((scrollTop + jq_Window.h()) > (jq_Document.h() - gScrollEdge))
    //     MoreDocContent_ui_after.hide();
    // else
    //     MoreDocContent_ui_after.c(_display_) === _none_
    //         && MoreDocContent_ui_after.show();
}

/**
 * 根据 write 动态更新遮罩栏 UI
 */
function MoreDocContent_updateUI() {
    // 值为 auto 时进行实际像素计算
    MoreDocContent_margin_left = V_ui_getRect(VOM_doc()[0]).left;
    if (MoreDocContent_ui_before.a(_class_).i(_fill_width_) === -1) {
        MoreDocContent_ui_before.c(_margin_left_, MoreDocContent_margin_left);
        MoreDocContent_ui_after.c(_margin_left_, MoreDocContent_margin_left);
    }
}

// ==================== 题注生成器类 ==================== //

let Caption_spliter = "  ", // ", "
    Caption_lastH1 = [], // 用于按章节分组编号时，指定对应题注类型最后的一级章节号
    Caption_lastCounter = []; // 用于按章节分组编号，指定对应题注类型最后的计数器

/**
 * 题注预处理，用于给需要生成题注的对象标记归属的一级章节
 */
function Caption_groupPreppare() {
    let selector = _img_ + ",." + _md_diagram_panel_ + "," + _table_ + "," + gSelector_codeblock + "," + _md_math_container_parents_ + "," + gSelector_iframeVideo,
        selectorSub = _img_ + "," + _svg_ + "[id^='" + _mermaid_ + "']," + _table_ + "," + gSelector_codeblock + "," + _md_math_container_parents_ + ","+ gSelector_iframeVideo;
    $(_idWrite_ + ">:is(" + _h1_5_ + ")").e((index, hx) => {
        let header = $(hx),
            betweenSet = header.nU(_h1_5_);
        betweenSet.filter(selector).add(
            betweenSet.f(selectorSub)).e((index, element) => {
                header.a(_data_header_num_)
                    && $(element).a(_data_cap_group_, header.a(_data_header_num_).x());
        });
    });
}

/**
 * 生成题注前缀内容
 * @param target 需要添加题注的对象
 * @param typeText 题注类型文本，如: 表、图
 * @param counter 题注类型计数器
 */
function Caption_prefix(target, typeText, counter) {
    let capGroup = target.a(_data_cap_group_),
        num,
        lastCount = 0;

    // 指定按章节分组编号
    if (capGroup !== gUndefined) {
        if (Caption_lastH1[typeText] !== capGroup) {
            Caption_lastH1[typeText] = capGroup;
            Caption_lastCounter[typeText] = counter - 1;
        }

        lastCount = Caption_lastCounter[typeText];
    }
    // 不按章节分组编号
    else
        capGroup = _;

    num = counter - lastCount;
    // 有分组编号数据时处理
    if (V_length(capGroup) > 0)
        if (num === 1)
            num = _;
        else
            capGroup = capGroup + "-";

    return typeText +___+ capGroup + num;
}

/**
 * 生成题注
 * @param target 需要添加题注的对象
 * @param typeName 题注类型名称
 */
function Caption_genForTextContent(target, typeName) {
    let captionPrefix = Caption_prefix(target, V_lang_text56(), V_doc_counter_table),
        caption,
        indexObj = gUndefined,
        anchor,
        dataForSearch;

    // 代码块 codeblock
    if (typeName.sW("c")) {
        indexObj = iNavCenter.codeblocks;
        captionPrefix = Caption_prefix(target, V_lang_text57(), V_doc_counter_codeblock);
    }
    // 表格 table
    else if (typeName.sW("t")) {
        indexObj = iNavCenter.tables;
    }
    // 公式 formula
    else if (typeName.sW("f")) {
        indexObj = iNavCenter.formulas;
        captionPrefix = Caption_prefix(target, V_lang_text18(), V_doc_counter_formula);
    }

    // 尝试获得带题注语法的内容
    let fcSet = Caption_getCaptions(target.p().pr(), typeName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注
    captionPrefix = V_ui_span(_, _, captionPrefix + Caption_spliter);

    // 无指定的题注内容时
    if (fc == gNull || V_length(fc.x()) === 0)
        fc = _;
    // 指定题注时生成 id 属性用于交叉引用
    else {
        target.p().a(_id_, LinkTool_transSpecHash(fc));
        target.p().a(_data_cap_for_id_, fc);
    }

    // 代码块 codeblock
    if (typeName.sW("c")) {
        anchor = _vk_id_codeblock_ + V_doc_counter_codeblock;
        target.wrap(V_ui_div(anchor, _v_caption_ +___+ _codeblock_));
        dataForSearch = target.f("." + _CodeMirror_line_).t();
    }
    // 表格 table
    else if (typeName.sW("t")) {
        anchor = _vk_id_tbl_ + V_doc_counter_table;
        target.wrap(V_ui_div(anchor, _v_caption_ +___+ _table_));
        dataForSearch = target.t();
    }
    // 公式 math
    else if (typeName.sW("f")) {
        anchor = _vk_id_math_ + V_doc_counter_formula;
        target.wrap(V_ui_div(anchor, _v_caption_ +___+ _formula_));
        dataForSearch = target.t();
    }

    // 无题注内容时，整个题注项内容清空
    fc = fc.x();
    caption = (V_isLength0(fc) ? _ : captionPrefix + fc);

    let cap1 = V_ui_figcaption(__v_cap1_.xD() + (V_isLength0(fc) ? ___ + _none_ : _),
            _, caption),
        has2Captions = (fc2 != gNull && V_length(fc2) > 0); // 计算题注数量
    // 有两个题注时
    if (has2Captions) {
        // 第 1 题注
        __insertCap1(cap1);
        // 第 2 题注
        target.af(V_ui_figcaption(__v_cap2_.xD(), _, fc2));
        target.p().a(_data_cap_count_, 2);
    }
    // 单题注时
    else {
        // 对于公式，在下方插入
        if (typeName.sW("f"))
            __insertCap1(cap1, gTrue);
        // 其他，在上方插入
        else
            __insertCap1(cap1);
    }

    // ----------------------------------------
    // 添加到对应的内容索引
    if (V_length(caption) > 0 && indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        V_byID(anchor).a(_data_title_, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // 在上方插入第 1 题注
    function __insertCap1(content, after) {
        after === gTrue
            ? target.af(content)
            : target.bf(content);
    }
}

/**
 * 针对插图（img、mermaid、音频、视频）生成题注
 * @param target 需要添加题注的对象
 * @param typeName 题注类型名称
 */
function Caption_genForMediaContent(target, typeName) {
    let fc = target.a(_alt_), // 默认尝试获取图片的 alt 内容作为题注内容
        fc2 = target.a(_title_), // 默认尝试获得图片的 title 作为第二题注内容
        indexObj = iNavCenter.figures,
        anchor,
        dataForSearch = _;

    let fcSet = gNull;
    // 若 alt 无内容，则尝试获取前面段落中是否有题注语法内容作为第 1、2 题注的内容
    if (fc == gNull || V_length(fc.x()) === 0) {
        fc = _;
        fcSet = Caption_getCaptions(target.p().pr(), typeName);
        if (fcSet[0] !== gNull)
            fc = fcSet[0];
        if (fcSet[1] !== gNull)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption,
        captionPrefix = Caption_prefix(target, V_lang_text58(), V_doc_counter_figure);
    // 音频题注 audio
    if (typeName.sW("a")) {
        indexObj = iNavCenter.media;
        captionPrefix = Caption_prefix(target, V_lang_text59(), V_doc_counter_audio);
    }
    // 视频频题注 video
    else if (typeName.sW("v")) {
        indexObj = iNavCenter.media;
        captionPrefix = Caption_prefix(target, V_lang_text60(), V_doc_counter_video);
    }

    captionPrefix = V_ui_span(_, _, captionPrefix + (V_length(fc) > 0 ? Caption_spliter : _));

    // 无指定的题注内容时
    if (fc == gNull || V_length(fc.x()) === 0)
        fc = _;
    // 指定题注时生成 id 属性用于交叉引用
    else {
        target.p().a(_id_, LinkTool_transSpecHash(fc));
        target.p().a(_data_cap_for_id_, fc);
    }

    // 为插图（mermaid）增加题注 <svg>
    if (typeName.sW("s")) {
        anchor = _vk_id_fig_ + V_doc_counter_figure;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap(V_ui_divExt(anchor, _v_caption_ +___+ _mermaid_, V_attr(_data_fig_type_, typeName)));
        dataForSearch += target.f(_div_ + "," + _span_ + ",tspan," + _text_).t();
    }
    // 为插图（img）增加题注 <img>
    else if (typeName.sW("i")) {
        anchor = _vk_id_fig_ + V_doc_counter_figure;
        target.wrap(V_ui_divExt(anchor, _v_caption_
            + (target.a(_loading_) === gUndefined ? _ : ___+ _loading_), // 懒加载时添加 loading 样式
            V_attr(_data_fig_type_ , typeName)));
        dataForSearch += target.a(_src_);
    }
    // 为音频增加题注 <audio>
    else if (typeName.sW("a")) {
        anchor = _vk_id_audio_ + V_doc_counter_audio;
        target.wrap(V_ui_divExt(anchor, _v_caption_, V_attr(_data_fig_type_, typeName)));
        dataForSearch += target.a(_src_);
    }
    // 为视频增加题注 <video>
    else if (typeName.sW("v")) {
        anchor = _vk_id_video_ + V_doc_counter_video;
        target.wrap(V_ui_divExt(anchor, _v_caption_
            + (typeName.eW(_iframe_) ? ___+ _iframe_ : _), // 内嵌视频的情况
            V_attr(_data_fig_type_, typeName)));
    }

    // 无题注内容时，整个题注项内容清空
    fc = fc.x();
    caption = (V_isLength0(fc) ? _ : captionPrefix + fc);

    let cap1 = V_ui_figcaption(__v_cap1_.xD(), _, caption),
        has2Captions = (fc != gNull && fc2 != gNull && V_length(fc2) > 0); // 计算题注数量
    // 有两个题注时
    if (has2Captions) {
        // 第 1 题注
        __insertCap1(cap1);
        // 第 2 题注
        target.af(V_ui_figcaption(__v_cap2_.xD(), _, fc2));
        target.p().a(_data_cap_count_, 2);
    }
    // 单题注时
    else {
        // 对于插图，在下方插入
        (typeName.sW("i") || typeName.sW("s"))
            ? __insertCap1(cap1, gTrue)
            // 其他，在上方插入
            : __insertCap1(cap1);
    }

    // ----------------------------------------
    // 添加到对应的内容索引
    if (V_length(caption) > 0 && indexObj !== gUndefined) {
        dataForSearch += has2Captions ? fc2 : _;
        V_byID(anchor).a(_data_title_, caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // ----------------------------------------
    // 修正在 SVG 插图套上题注后的自适应尺寸 <svg>
    if (typeName.sW("s")) {
        if (target.a(_height_) !== _none_ || target.c(_height_) !== _none_) { // 有指定高度的
            JQ_removeAttr(target, _height_);
            target.c(_height_, _);
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        let style = gUndefined;
        if (target.c(_max_width_) !== _none_) // CSS 中指定了最大宽度
            target.p().c(_width_, target.c(_max_width_));
        else if ((style = target.a(_style_)) !== gUndefined && style.i(_width_) > -1) // 通过 style 指定了宽度
            target.p().c(_width_, target.c(_width_));
        else if (target.a(_width_) !== _100pc_) // 指定了 width 属性，且不为 100%
            target.p().c(_width_, JS_parseInt(target.a(_width_)) + 4); // 4 为两边 border 的宽度
        else if (target.a(_view_box_) !== _none_) // 指定 width 为 100% 的情况
            target.p().c(_width_, target.a(_view_box_).sp(___)[2] + "px");
        else
            target.p().c(_width_, _100pc_);
    }

    // 在上方插入第 1 题注
    function __insertCap1(content, after) {
        after === gTrue
            ? target.af(content)
            : target.bf(content);
    }
}

/**
 * 返回插图、表格、代码块上方的题注
 * @param caption 潜在的题注内容对象
 * @param tagName 添加题注的目标对象的 HTML 标签名称
 */
function Caption_getCaptions(caption, tagName) {
    let fcSet = [], // 题注集
        hideCaptionSrc = gFalse; // 是否隐藏题注源

    let capResult = Caption_parseSyntax(caption);
    // 单题注
    if (capResult[1] === 1) {
        fcSet = __getCaptionSet(caption, 1, capResult[0]);
        fcSet[1] = gNull;
        hideCaptionSrc = gTrue;
    }
    // 双题注
    else if (capResult[1] === 2) {
        fcSet = __getCaptionSet(caption, 2, capResult[0]);
        hideCaptionSrc = gTrue;
    }

    // 若成功匹配出题注，且内容不是 <img> 则隐藏原始内容
    if (hideCaptionSrc && (!tagName.sW("i") || capResult[0] === 200))
        // 移除前先克隆 id 到题注容器，避免锚点无法跳转到这里
        caption.rm();

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
            target.f(_mark_ + ">em").rm();
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
function Caption_parseSyntax(target) {
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
    $(_idWrite_ + " em>" + _mark_ + __only_child_ + ">" + _span_ + __first_child_).e((index, element) => {
        BreadcrumbStyle_count++;
        let _t = $(element),
            mark = _t.p();
        mark.unwrap(); // 解包 em
        // 添加新包
        mark.wrap(V_ui_span(_v_breadcrumb_style_ + " id-" + BreadcrumbStyle_count, _, _));
        _t.unwrap(); // 解包 mark

        // ------ 正式开始处理 ------
        let bread = _t.p(), // 获得添加新包后的新父级元素
            slashOrg = "</",
            slashTmp = "<___slash___",
            html = bread.hm().rA(slashOrg, slashTmp);

        // 生成原始内容
        bread.a(_data_clipboard_text_, bread.t());
        // 将目标内容替换为指定标签进行样式优化
        html = html.rA(BreadcrumbStyle_syntax, V_ui_label(_, _, ___));
        bread.hm(html.rA(slashTmp, slashOrg));

        // 点击事件处理
        bread.uC().ck((event) => {
            let _t = V_eventCurrentTarget(event);
            Copy_action(_t, _t.a(_data_clipboard_text_));
        });
    });

    // 避免与 BreadcrumbStyle 处理中的多层触发
    $(_idWrite_ + " ." + _v_breadcrumb_style_ + " a").ck((event) => {
        V_stopPropagation(event); // 停止事件冒泡
    });
}

// ==================== 将多项连续的内容转换为页签组显示 ==================== //

let TabGroup_tabcap = _,
    TabGroup_tabico = _;

/**
 * 初始化
 */
function TabGroup_init() {
    TabGroup_tabcap = V_getParamVal(_tab_ + _cap_);
    TabGroup_tabico = V_getParamVal(_tab_ + _ico_);

    // 为指定范围的不同类型的连续内容生成页签组
    $(_idWrite_ + ">p>em" + __only_child_ + ">sup" + __only_child_).e((index, element) => {
        let _t = $(element),
            para = _t.p().p();

        let count = 0;
        // 用于调试
        para.nU(V_not("p, blockquote, div, figure")).e((index, element) => {
            let _t2 = $(element),
                classValue = _t2.a(_class_),
                tagName = V_tagName(_t2);

            if (classValue === gUndefined)
                classValue = _;

            // 引用块，但不带小标题
            if (tagName === _blockquote_ && classValue.i(_stt_) === -1)
                return gFalse; // 提前结束循环
            // 对于 div，但不是 GSA
            else if (tagName === _div_ && classValue.i(_md_alert_) === -1 && _t2.a(_data_cntr_) === gUndefined)
                return gFalse; // 提前结束循环
            // 非引用块、div，但无 data-cntr 属性
            else if (tagName !== _blockquote_ && tagName !== _div_ && _t2.a(_data_cntr_) === gUndefined)
                return gFalse; // 提前结束循环

            // 用于调试
            // 对页签关联的内容进行标记处理
            count++;
            TabGroup_setData(_t2, count);
        });

        // 有 2 个或以上的页签内容时，进行按组处理
        count > 1
            && TabGroup_disposeByGroup(para.n());

        para.rm();
    });

    // 对 VLOOK UI 统一样式适配处理
    // V_isMobile()
    //     ? V_byClass(_tab_group_wrap_ + ">" + _span_).uH()
    //     : V_ui_bindHover(V_byClass(_tab_group_wrap_ + ">" + _span_));
}

/**
 * 按组进行处理
 * @param firstContent 标签项内容的目标对象
 * @param id 对应的分组 id
 * @param type 内容类型
 */
function TabGroup_disposeByGroup(firstContent, id, type) {
    if (id === gUndefined)
        id = firstContent.a(_data_tab_group_id_);

    // 生成页签组
    firstContent.bf(V_ui_div("tab-box" + id, _v_tab_box_,
        V_ui_divExt(_tab_group_ + id, _v_tab_group_ +___+ _v_backdrop_blurs_, V_attr(_title_,
            "[Tab] / [⇧ Shift + Tab] " + V_lang_text(2, [
                "切换页签",
                "Switch tabs"
            ])),
            V_ui_div(_, _tab_group_wrap_, _)))
        );

    // 生成页签组内的首个页签
    let tabGroup = V_byID(_tab_group_ + id),
        tabBox = tabGroup.p(),
        tabGroupWrapper = tabGroup.ch("." + _tab_group_wrap_);
    __addTab(tabBox, tabGroupWrapper, firstContent, type, gTrue);

    // 生成页签组其他页签
    $(V_attrCSS(_data_tab_group_, id)).e((index, element) => {
        let content = $(element);
        __addTab(tabBox, tabGroupWrapper, content, type);
        content.hide();
    });

    // 页签组滚动事件处理
    V_ui_bindScrollWithMoreContent(tabGroup, gFalse);
    // 强制触发一次滚动事件处理，以生成需要的样式
    V_ui_scrollingUpdate(tabGroup, gFalse);

    /**
     * 添加标签项
     * @param tabBox 页签组父容器
     * @param tabGroupWrapper 页签组条目容器对象
     * @param target 标签项内容的目标对象
     * @param type 内容类型
     * @param current 是否设置为当前元素
     */
    function __addTab(tabBox, tabGroupWrapper, target, type, current = gFalse) {
        let id, // = _,
            icon = _,
            tabTitle, // = _,
            tabTitleAlt = _,
            alertType = _,
            tabicoStyle = (TabGroup_tabico === _fill_) ? __checked_ : _;

        // 无指定 type 时自动适配
        if (type === gUndefined) {
            let tagName = V_tagName(target),
                cntr = target.a(_data_cntr_);
            if (tagName === _blockquote_) {
                type = tagName;
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_blockquote_ + tabicoStyle, 16, 16, _current_color_);
            }
            else if (tagName === _div_ && cntr !== _svg_)
                type = _alert_;
            else if (cntr === _table_) {
                type = cntr;
                tabTitleAlt = V_lang_text56();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_table_ + tabicoStyle, 16, 16, _current_color_);
            }
            else if (cntr === _codeblock_) {
                type = cntr;
                tabTitleAlt = target.f("." + _md_fences_).a(_lang_);
                if (tabTitleAlt === gUndefined || V_isLength0(tabTitleAlt))
                    tabTitleAlt = V_lang_text57();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_codeblock_ + tabicoStyle, 16, 16, _current_color_);
            }
            else if (cntr === _audio_) {
                type = cntr;
                tabTitleAlt = V_lang_text59();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_audio_ + tabicoStyle, 16, 16, _current_color_);
            }
            else if (cntr === _video_) {
                type = cntr;
                tabTitleAlt = V_lang_text60();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_media_ + tabicoStyle, 16, 16, _current_color_);
            }
            else if (cntr === _formula_) {
                type = cntr;
                tabTitleAlt = V_lang_text18();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_formula_ + tabicoStyle, 16, 16, _current_color_);
            }
            else { // 默认为 cntr === _img_ || cntr === _svg_
                type = _figure_;
                tabTitleAlt = V_lang_text58();
                icon = (TabGroup_tabico === _off_) ? _ : V_ui_svgIcon(_icoIndexTab_figure_ + tabicoStyle, 16, 16, _current_color_);
            }
        }

        // 针对带小标题的引用块、GSA
        if (type === _blockquote_ || type === _alert_) {
            let firstPara = target.f(">p" + __first_child_);
            id = firstPara.a(_data_id_);
            firstPara.a(_id_, id);
            tabTitle = firstPara.t();

            // 针对 GSA
            if (type === _alert_) {
                // 提取 GSA 的类型
                alertType = target.a(_class_).m(/(alert-[^ ]+)/);
                alertType = (alertType !== gNull ? ___+ alertType[1] : _);

                // 提取 GSA 的图标
                let use = firstPara.f("." + _md_alert_ + __text_ + ">" + _svg_ + ">" + _use_ + __first_child_);
                if (V_length(use) > 0)
                    icon = V_ui_svgIcon(use.a(_xlink_href_).r("#", _), 16, 16, _current_color_);
            }
            // 针对带小标题的引用块
            else {
                JQ_addClass(firstPara.n(), _first_ + "-p");
                firstPara.hide();
            }
        }
        // 针对表格、插图、代码块、数学公式
        else {
            id = target.ch("." + _v_caption_).a(_id_);
            // 对表格、插图、数学公式的处理
            let cap1 = target.f(__v_cap1_);
            // 题注分类与编号显示在页签上
            if (TabGroup_tabcap === _on_) {
                tabTitle = cap1.t().x();
                if (V_isLength0(tabTitle))
                    tabTitle = tabTitleAlt;
                // 除代码块外，隐藏第 1 题注
                type !== _codeblock_
                    && cap1.hide();
            }
            // 题注分类与编号不显示
            else {
                tabTitle = V_textContent(cap1).x();
                if (V_isLength0(tabTitle))
                    tabTitle = tabTitleAlt;
                // 当无题注内容时，显示题注分类与编号
                if (V_isLength0(tabTitle))
                    tabTitle = cap1.t();
            }
        }

        // 添加 页签 控件
        tabGroupWrapper.ap(V_ui_span(
            (current ? _current_ : _) + alertType,
            V_attr(_data_tab_for_, id)
                + V_attr(_tabindex_, 1)
                + V_attr(_data_content_type_, type), icon + tabTitle));
            // (icon !== _ ? V_ui_svgIcon(icon, 16, 16, _theme_) : _) + tabTitle));


        // 将相关元素移入页签组父容器中
        JQ_addClass(target, _tab_ + __content_ + "-" + _target_);
        target.appendTo(tabBox);

        // 对标签绑定事件
        tabGroupWrapper.ch(_span_).e((index, element) => {
            let _item = $(element);
            _item.uC().ck(() => {
                TabGroup_disposeTabItemClick(_item);
            });
            _item.on(_focus_, () => {
                _item.tr(_click_);
            });
        });
    }
}

// 以防抖控制方式调用
let TabGroup_disposeTabItemClick = V_debounce(TabGroup_tabItemClick, 100);

/**
 * 页签组条目的点击处理
 * @param item 页签组条目对象
 * @param animation 是否以动画方式滚动
 */
function TabGroup_tabItemClick(item, animation = gTrue) {
    let tab = item.p().ch("." + _current_);
        // type = tab.a(_data_content_type_);

    // 隐藏当前标签
    JQ_removeClass(tab, _current_);
    V_byID(tab.a(_data_tab_for_)).p().hide();

    // 重新设置当前标签
    JQ_addClass(item, _current_);
    V_byID(item.a(_data_tab_for_)).p().show();

    // 滚动到内容位置
    let scrollTarget = V_byID(item.a(_data_tab_for_)).p();
    // let scrollTarget = V_byID(item.a(_data_tab_for_));
    // ERROR(100, item.a(_data_tab_for_), scrollTarget.hm(), scrollTarget.p().hm());
    V_ui_setScrollTop(scrollTarget.oT(), scrollTarget, gUndefined, animation);
}

/**
 * 设置页签关联内容的标识数据
 * @param target 关联内容的对象
 * @param index 内关联内容的序号
 */
function TabGroup_setData(target, index) {
    // 对页签组的第 1 个内容的处理
    index === 1
        ? (
            V_doc_counter_tagGroup++,
            target.a(_data_tab_group_id_, V_doc_counter_tagGroup)
        )
        // 页签组对应首个内容以外的其他内容的处理
        // 设置归属的页签组
        : target.a(_data_tab_group_, V_doc_counter_tagGroup);
}

/**
 * 根据页签组实际渲染的高度更新对应的变量
 * 用于滚动到页签对应内容时能正常预留出上方高度
 * 应用于样式 .tab-content-target
 */
function TabGroup_updateHeight() {
    // V_setVarVal(___v_ + _tab_group_ + "-h", V_byClass(_v_tab_group_ + __first_).oH(gTrue) + "px");
    V_setVarVal(___v_ + _tab_group_ + "-h", V_byClass(_v_tab_group_ + __first_).iH() + "px");
}

// ==================== 代码块增强类 ==================== //

/**
 * 初始化代码块
 */
let gSelector_codeblock = "." + _md_fences_ + V_not(V_attrCSS(_lang_, _math_));
function ExtCodeBlock_init() {
    // ------------------------------
    // 遍历所有代码块（排除被标签分组的非首个代码块）
    $(gSelector_codeblock + V_not(V_attrCSS(_data_tab_group_))).e((index, element) => {
        let _t = $(element);

        // 绑定内容助手
        ContentAssistor_bind(_t, _codeblock_);

        // 折叠长代码块
        ContentFolder_add(_t, _codeblock_);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        V_doc_counter_codeblock++;
        // 外套一个 <figure> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
        _t.wrap(V_ui_figure(_v_cap_cntr_, V_attr(_data_cntr_, _codeblock_)));

        // 先根据题注语法生成题注
        Caption_genForTextContent(_t, _codeblock_);
    });
}

/**
 * 复制代码块内容
 * @param source 内容源对象
 */
function ExtCodeBlock_copyContent(source) {
    let content = _,
        lines = ContentAssistor_lastHover.ch().f("." + _CodeMirror_code_ + " ." + _CodeMirror_line_),
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
        for (let i = 0; i < V_length(badChars); i++)
            if (encodeText.i(badChars[i]) > -1)
                encodeText = encodeText.rA(badChars[i], goodChars[i]);
        content += JS_decodeURI(encodeText) + (lineNum < lineCount ? "\n" : _);
    });

    Copy_action(source, content);
}

// ==================== 代码块换行、不换行类 ==================== //

/**
 * 切换代码块换行、不换行开关
 */
function CodeblockWrap_toggle() {
    let codeblock = ContentAssistor_lastHover;
    // 已开启，则关闭
    CodeblockWrap_isWrap(codeblock)
        ? (
            JQ_removeClass(ContentAssistor_btns_wrap, _selected_),
            JQ_removeClass(codeblock, _unwrap_)
        )
        // 未开启，则开启
        : (
            JQ_addClass(ContentAssistor_btns_wrap, _selected_),
            JQ_addClass(codeblock, _unwrap_)
        )
}

/**
 * 判断代码块是否启用了换行
 */
function CodeblockWrap_isWrap() {
    return ContentAssistor_lastHover.a(_class_).i(_unwrap_) > -1;
}

// ==================== 公式增强类 ==================== //

/**
 * 初始化公式
 */
function ExtMath_init() {
    // 遍历所有代码块
    $(_md_math_container_parents_).e((index, element) => {
        let _t = $(element);

        // 绑定内容助手
        ContentAssistor_bind(_t, _formula_);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        V_doc_counter_formula++;
        // 外套一个 <figure> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
        _t.wrap(V_ui_figure(_v_cap_cntr_, V_attr(_data_cntr_, _formula_)));

        // 先根据题注语法生成题注
        Caption_genForTextContent(_t, _formula_);
    });
}

// ==================== 复制处理类 ==================== //

let Copy_lastActionTime = 0,
    Copy_processing = gFalse,
    Copy_modeTimer = gNull;
    // 带格式复制
    // Copy_rich_ui = gUndefined,
    // Copy_rich_ui_start = gUndefined,
    // Copy_rich_ui_end = gUndefined;

// 初始化
function Copy_init() {
    // let ui = V_ui_div(_copy_rich_start_, _, _)
    //         + V_ui_div(_copy_rich_end_, _, _)
    //         + V_ui_div(_, "v-write", _);
    // DOM_body().ap(ui);
    // Copy_rich_ui = V_byClass("v-write");
    // Copy_rich_ui_start = V_byID(_copy_rich_start_);
    // Copy_rich_ui_end = V_byID(_copy_rich_end_);
}

/**
 * 执行复制
 * @param source 触发复制的对象
 * @param content 要复制的内容
 * @param successCallback 复制成功后的回调函数
 * @param errorCallback 复制失败后的回调函数
 */
function Copy_action(source, content, successCallback, errorCallback) {
    // 控制两次复制操作的时间间隔（同时也是解决嵌套情况下的复制失效问题）
    let ts = V_getTime();
    if (Copy_processing || ts - Copy_lastActionTime < 200)
        return;
    Copy_lastActionTime = ts;
    Copy_processing = gTrue;

    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    // let targetName = "." + source.a(_class_).rA(___, ".").rA("." + _hover_, _);
    let targetName = "." + source.a(_class_).rA(___, ".");
    // 测试用 DEBUG(targetName);
    $(targetName).a(_data_clipboard_text_, content);
    DEBUG($(targetName).a(_data_clipboard_text_));

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(targetName);

    // 复制成功事件
    clipboard.on("success", (event) => {
        // 显示复制成功提示
        iInfoTips.bubble(V_lang_text(62, [
                "已复制",
                "Copied"
            ]), 2000, source);
        event.clearSelection();

        typeof(successCallback) === _function_ && successCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();

        Copy_processing = gFalse;
    });
    // 复制失败事件
    clipboard.on(_error_, (e) => {
        // 显示复制失败提示
        iInfoTips.error(V_ui_strong(V_lang_text(37, [
            "抱歉～暂不支持在该浏览器中复制",
            "I'm very sorry~ I don't support copying in this browser"
        ])), 3000, gFalse, source);

        ERROR(e);

        typeof(errorCallback) === _function_ && errorCallback();

        // 销毁处理已有对象，避免多次监听
        clipboard.destroy();
        Copy_processing = gFalse;
    });
}

/**
 * 处理带格式复制的操作
 */
// async function Copy_actionForRich() {
//     // 针对选中的内容进行处理
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0 && Copy_rich_ui_start !== gUndefined) {
//         let range = selection.getRangeAt(0),
//             selectedContent = range.cloneContents();

//         // 将临时添加到 #write 内以正确匹配样式后再进行处理
//         Copy_rich_ui.a(_id_, "write");
//         Copy_rich_ui.c(_width_, VOM_doc().c(_width_));
//         Copy_rich_ui.ap($(selectedContent));

//         // 递归处理子元素
//         __convertStylesToInline(Copy_rich_ui[0]);

//         // 将完成内联样式处理的内容写入到 clipboard
//         try {
//             let clipboardItem = new ClipboardItem({
//                 "text/html": new Blob([Copy_rich_ui.hm()], { type: _text_ + "/" + _html_ }),
//                 "text/plain": new Blob([Copy_rich_ui.t()], { type: _text_ + "/plain" }) // 提供纯文本作为备用
//             });
//             // 使用 Clipboard API 写入剪贴板
//             await navigator.clipboard.write([clipboardItem]);
//             iInfoTips.bubble(V_lang_text(62, [
//                 "已复制",
//                 "Copied"
//             ]), 2000);
//             // LOG("源格式的内容已复制到剪贴板");
//         } catch (err) {
//             ALERT([
//                 "源格式的内容复制失败：",
//                 "Failed to copy content in source format: "
//             ][V_lang] + err);
//         }

//         // 延迟移除临时复制标记内的内容，确保粘贴前内容完整
//         V_later(() => {
//             // 清除临时内容
//             Copy_rich_ui.ch().rm();
//             Copy_processing = gFalse;
//         }, 1000);
//     }

//     // 转换内联样式
//     function __convertStylesToInline(element) {
//         let _t = $(element);
//         if (V_length(_t.ch()) === 0 && V_length(_t.t().x()) === 0) {
//             element.setAttribute(_style_, _display_+":"+_none_);
//             return;
//         }

//         let computedStyles = window.getComputedStyle(element),
//             inlineStyle = _,
//             propertyList = [
//                 // 字体相关
//                 _font_family_,
//                 _font_size_,
//                 _font_weight_,
//                 _font_style_,
//                 _line_height_,
//                 _text_transform_,
//                 _letter_spacing_,
//                 // 颜色、背景
//                 _color_,
//                 _background_color_,
//                 _background_image_,
//                 _background_clip_,
//                 _background_repeat_,
//                 _background_position_,
//                 // 阴影
//                 _box_shadow_,
//                 _text_shadow_,
//                 // 边框
//                 _border_,
//                 _border_left_,
//                 _border_right_,
//                 _border_top_,
//                 _border_bottom_,
//                 _border_radius_,
//                 // 对齐
//                 _text_align_,
//                 _justify_content_,
//                 _align_items_,
//                 _vertical_align_,
//                 // 大小、布局
//                 // _left_,
//                 // _width_,
//                 _padding_,
//                 _margin_,
//                 _min_width_,
//                 _max_width_,
//                 _word_break_,
//                 _white_space_,
//                 _overflow_,
//                 _overflow_wrap_,
//                 _display_,
//                 _position_,
//                 _z_index_
//             ];

//         for (let i = 0; i < V_length(propertyList); i++)
//             inlineStyle += __genInlineStyle(computedStyles, propertyList[i]);

//         // 处理伪元素
//         // const pseudoBefore = window.getComputedStyle(element, '::before');
//         // const pseudoAfter = window.getComputedStyle(element, '::after');

//         // if (pseudoBefore.content !== _none_) {
//         //     inlineStyle += `::before { content: ${pseudoBefore.content}; } `;
//         // }
//         // if (pseudoAfter.content !== _none_) {
//         //     inlineStyle += `::after { content: ${pseudoAfter.content}; } `;
//         // }

//         // 设置内联样式
//         element.setAttribute(_style_, inlineStyle);

//         // 递归处理子元素
//         for (let child of element.children)
//             __convertStylesToInline(child);
//     }

//     // 生成指定属性名的内联样式内容
//     function __genInlineStyle(style, propertyName) {
//         let value = V_util_getComputedStyleValue(style, propertyName),
//             inlineStyle = _;
//         if (value) inlineStyle = `${propertyName}:${value};`;
//         return inlineStyle;
//     }
// }

// ==================== 标记不发布的内容类 ==================== //

function Unpublish_init() {
    // --------------------
    // 指定的引用块（小标题、折叠）
    $(_idWrite_ +___+ _blockquote_ + ExtQuote_subTitle + ">" + _del_ + __only_child_ + ","
    + _idWrite_ +___+ _blockquote_ + ">h6" + __first_child_ + ">" + _del_ + __only_child_).e((index, element) => {
        let _t = $(element).p(),
            tagName = V_tagName(_t),
            target = gUndefined;

        if (tagName.sW("h6")) // h6, 扩展语法在生成 detail 前
            target = _t.p();
        else if (tagName.sW("st") || tagName.sW("ma")) // strong, mark
            target = _t.p().p();

        if (target !== gUndefined) {
            let hr = target.prev();
            // 先移除前置的可以移除的 hr
            V_tagName(hr) === _hr_
                && hr.rm();
            // 移除目标对象
            target.rm();
        }
    });

    // --------------------
    // 指定的章节
    for (let i = 1; i <= 6; i++)
        __disposeUnpubHeader(i);

    // --------------------
    // 表格指定列
    // 在表格列格式化处理的 ColumnFormatting_format() 中进行

    /**
     * 处理指定分级章节不发布内容的处理
     * @param headerNum 指定要遍历的章节等级
     */
    function __disposeUnpubHeader(headerNum) {
        $(_idWrite_ + ">h" + headerNum + ">" + _del_ + __only_child_).e((index, element) => {
            let _t = $(element).p(),
                id = _t.a(_id_);
            WARN(`Remove unpub. ${_header_}: ${_t.t()} (#${id})`);

            // 移除目录大纲中指定的章节及子章节的目录节点
            V_byClass(_md_toc_item_ + ">a" + V_attrCSS(_href_, "#" + id)).e((index, element) => {
                let tocItem = $(element).p();
                tocItem.nU(__getUntilHeaderSelector("." + _md_toc__ + "h")).rm();
                // 移除自身
                tocItem.rm();
            });

            // 移除正文中指定的章节及子章节的内容，直到下一个同级，或更高等级章节
            _t.nU(__getUntilHeaderSelector("h") + ",." + _footnotes_area_).rm(); // 比指定章节等级更高一级的，及当前等级章节
            // 移除自身
            _t.rm();
        });

        // 获取结束的选择器
        function __getUntilHeaderSelector(prefix) {
            return prefix + (headerNum === 1
                ? 1 // 一级章节
                : (headerNum - 1)  + "," + prefix + headerNum);
        }
    }
}

// ==================== 章节标题自动编号增强类 ==================== //

let HeaderAutoNum_counter = [],
    HeaderAutoNum_lastLevel = 1,
    // 自定义的自动编号格式模板（可只指定任意 h1~h6）
    HeaderAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }},h6{{#none# }}",
    // 默认的自动编号格式模板
    HeaderAutoNum_tplSet = HeaderAutoNum_tpl.sp(","),
    HeaderAutoNum_tpl_syntax = /h([1-6]){{(.*)(#(0*)(#|zh|ZH|alpha|ALPHA|roman|ROMAN|none)(-min|-sup)?#)(.*)}}/,
    HeaderAutoNum_tpl_leftPad = [_, _, _, _, _, _],
    HeaderAutoNum_tpl_format = ["#", "#", "#", "#", "#", "#"], // 编号格式
    HeaderAutoNum_tpl_formatOpt = [0, 0, 0, 0, 0, 0], // 特殊格式选项
    HeaderAutoNum_tpl_prefix = [_, _, _, _, _, _], // 前缀
    HeaderAutoNum_tpl_suffix = [_, _, _, _, _, _]; // 后缀

// 特殊格式选项
const HEADER_AUTONUM_TPL_FORMAT_OPT_NONE = 0, // 无
    HEADER_AUTONUM_TPL_FORMAT_OPT_MIN = 1, // -min
    HEADER_AUTONUM_TPL_FORMAT_OPT_SUP = 2; // -sup

/**
 * 初始化章节目录自动编号
 */
function HeaderAutoNum_initToc() {
    let metaTpl = V_getMetaByName(_vlook_header_autonum_);
    // 文档无指定自动编号格式模板时，尝试取主题配套的自动编号格式模板
    if (metaTpl === gUndefined)
        metaTpl = V_getVarVal("--" + _vlook_header_autonum_);
    // 没有目录大纲，同时没有通过预置选项、主题配置指定自动编号格式模板，则跳过
    if (metaTpl === gUndefined)
        return;

    // 重置自动编号格式模板
    HeaderAutoNum_resetTpl(metaTpl);

    // 对目录大纲内的章节条目进行处理
    if (V_length(gVlookToc) > 0) {
        HeaderAutoNum_resetCounter();
        gVlookToc.ch("." + _md_toc_item_).e((index, element) => {
            let item = $(element);
            V_ui_addAnimate(item);
            __genNumContent(item,
                HeaderAutoNum_parseTocHeaderLevel(item.a(_class_)));
        });
    }

    // 对文档中的章节条目进行处理（不包括封底）
    HeaderAutoNum_resetCounter();
    VOM_doc().ch("h1" + V_not(__last_child_) + ",h2,h3,h4,h5").e((index, element) => {
        let item = $(element);
        __genNumContent(item,
            HeaderAutoNum_parseTocHeaderLevel(V_tagName(item)));
    });

    // 对文档中的 h6 章节条目进行处理（不包括封面）
    HeaderAutoNum_resetCounter();
    VOM_doc().ch(_h6_ + V_not(__first_child_)).e((index, element) => {
        let prefix = (HeaderAutoNum_tpl_prefix[5]),
            result;
        if ((result = prefix.m(/var\((--.+)\)/)) !== gNull)
            prefix = V_getVarVal(result[1]);
        $(element).a(_data_header_num_, prefix);
    });

    // 生成标题编号
    function __genNumContent(item, lv) {
        let diff = lv - HeaderAutoNum_lastLevel,
            absDiff = Math.abs(diff);
        // 当前层级比上一层级低
        if (diff > 0)
            for (let i = 0; i < absDiff; i++)
                HeaderAutoNum_push();
        // 当前层级比上一层级高
        else if (diff < 0)
            for (let i = 0; i < absDiff; i++)
                HeaderAutoNum_pop();
        // 当前层级与上一层级一样
        else
            HeaderAutoNum_counter[HeaderAutoNum_lastLevel - 1]++;

        item.a(_data_header_num_, HeaderAutoNum_toString());
    }
}

/**
 * 进入下一级的处理
 */
function HeaderAutoNum_push() {
    HeaderAutoNum_lastLevel++;
    HeaderAutoNum_counter[HeaderAutoNum_lastLevel - 1] = 1;
}

/**
 * 返回上一级的处理
 */
function HeaderAutoNum_pop() {
    HeaderAutoNum_counter[HeaderAutoNum_lastLevel - 1] = 0;
    HeaderAutoNum_lastLevel--;
    HeaderAutoNum_counter[HeaderAutoNum_lastLevel - 1]++;
}

/**
 * 重置自动编号计数器
 */
function HeaderAutoNum_resetCounter() {
    HeaderAutoNum_counter = [0, 0, 0, 0, 0, 0];
    HeaderAutoNum_lastLevel = 1;
}

/**
 * 根据自动编号格式模板重新重置 h1~h6 自动编号格式
 * @param metaTpl 格式模板内容
 */
function HeaderAutoNum_resetTpl(metaTpl) {
    // 判断是否有指定自定义自动编号模板
    if (metaTpl === gUndefined)
        return;
    HeaderAutoNum_tpl = metaTpl;

    // ！！！不要删除！！！用于测试效果
    // HeaderAutoNum_tpl = "h1{{###. }},h2{{### }},h3{{### }},h4{{### }},h5{{### }}";
    // HeaderAutoNum_tpl = "h1{{第#zh#章 }}";
    // HeaderAutoNum_tpl = "h1{{第#zh#章 }},h2{{Chapter #alpha# }},h5{{### }},h4{{### - }},h3{{§ ###}}";
    // HeaderAutoNum_tpl = "h1{{第#zh#章 }},h2{{步骤 #000## }}";
    // HeaderAutoNum_tpl = "h6{{X ### }}";
    // HeaderAutoNum_tpl = "h1{{###. }},h2{{### }}";
    // HeaderAutoNum_tpl = "h1{{#none#}},h2{{#none#}},h3{{### }},h4{{### }},h5{{#ALPHA-min# }}";

    if (V_isLength0(HeaderAutoNum_tpl))
        return;

    // 对自动编号格式模板内容进行处理
    let tplSet = HeaderAutoNum_tpl.sp(","),
        lv;
    for (let i = 0; i < V_length(tplSet); i++) {
        lv = tplSet[i].ss(1, 2);
        if (!isNaN(lv))
            HeaderAutoNum_tplSet[lv - 1] = tplSet[i].x();
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
        if ((result = HeaderAutoNum_tplSet[lv].m(HeaderAutoNum_tpl_syntax)) !== gNull
            && V_length(result) === 8) {
                HeaderAutoNum_tpl_prefix[lv] = result[2];
                HeaderAutoNum_tpl_leftPad[lv] = result[4];
                HeaderAutoNum_tpl_format[lv] = result[5];
                HeaderAutoNum_tpl_formatOpt[lv] =
                    (result[6] === "-min") ? HEADER_AUTONUM_TPL_FORMAT_OPT_MIN
                    : (result[6] === "-sup") ? HEADER_AUTONUM_TPL_FORMAT_OPT_SUP
                    : HEADER_AUTONUM_TPL_FORMAT_OPT_NONE;
                HeaderAutoNum_tpl_suffix[lv] = result[7];
        }
    }
}

/**
 * 将当前层级信息转换为字符串
 */
function HeaderAutoNum_toString() {
    let lv = HeaderAutoNum_lastLevel - 1,
        superLv = (lv > 0) ? lv - 1 : -1,
        opt = HeaderAutoNum_tpl_formatOpt[lv],
        numStr = _;

    // 若指定了特殊的格式选项
    if (opt > HEADER_AUTONUM_TPL_FORMAT_OPT_NONE) {
        if (opt === HEADER_AUTONUM_TPL_FORMAT_OPT_SUP && superLv >= 0)
            numStr =  __formatNum(superLv, opt) + ".";
        numStr += __formatNum(lv, opt);
        // 结束并返回
        return HeaderAutoNum_tpl_prefix[lv]
            + numStr
            + HeaderAutoNum_tpl_suffix[lv];
    }

    // 没有指定特殊的格式选项
    let str = 0;
    for (let i = 0; i < HeaderAutoNum_lastLevel; i++) {
        str = __formatNum(i, false);
        numStr += str;
        if (i < lv && V_length(str) > 0)
            numStr += ".";
    }

    return HeaderAutoNum_tpl_prefix[lv]
        + numStr
        + HeaderAutoNum_tpl_suffix[lv];

    /**
     * 指定层级的编号进行格式化
     * @param i 层级
     * @param opt 特殊格式选项
     */
    function __formatNum(i, opt) {
        let ns = _,
            counter = HeaderAutoNum_counter[i],
            upperCase = (HeaderAutoNum_tpl_format[i].ss(0, 1).m(/[A-Z]/) !== gNull),
            format = HeaderAutoNum_tpl_format[i].l();

        // 十进制数字
        if (format === "#")
            ns = (HeaderAutoNum_lastLevel === 1)
                // 针对 h1
                ? HeaderAutoNum_leftPadForDecimal(counter, i)
                // 针对 h2~h5
                : (i === 0 // 第1段
                    ? JS_toString(counter) // 针对 第1段 强制变为数字（避免出现左侧补 0 的情况）
                    : HeaderAutoNum_leftPadForDecimal(counter, i))
        // 中文数字
        else if (format === "zh") {
            ns = (HeaderAutoNum_lastLevel === 1)
                // 针对 h1
                ? HeaderAutoNum_decimalToZh(counter, upperCase)
                // 针对 h2~h5
                : HeaderAutoNum_leftPadForDecimal(counter, i);
        }
        // 英文字母
        else if (format === _alpha_) {
            ns = (HeaderAutoNum_lastLevel === 1 || opt > HEADER_AUTONUM_TPL_FORMAT_OPT_NONE)
                // 针对 h1
                ? HeaderAutoNum_decimalToAlpha(counter, upperCase)
                // 针对 h2~h5
                : HeaderAutoNum_leftPadForDecimal(counter, i);
        }
        // 罗马数字
        else if (format === "roman") {
            ns = (HeaderAutoNum_lastLevel === 1 || opt > HEADER_AUTONUM_TPL_FORMAT_OPT_NONE)
                // 针对 h1
                ? HeaderAutoNum_decimalToRoman(counter, upperCase)
                // 针对 h2~h5
                : HeaderAutoNum_leftPadForDecimal(counter, i);
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
function HeaderAutoNum_parseTocHeaderLevel(value) {
    let lv = value.m(/(h([1-5]))/)[2];
    return isNaN(lv) ? 0 : JS_parseInt(lv);
}

/**
 * 左侧补 0
 * @param value 当前值
 * @param lv 级别
 * @returns
 */
function HeaderAutoNum_leftPadForDecimal(value, lv) {
    let pad = V_length(HeaderAutoNum_tpl_leftPad[lv]),
        gap = pad - V_length(JS_toString(value)),
        padStr = _;
    if (gap > 0)
        for (let i = 0; i < gap; i++)
            padStr += 0;
    return padStr + value;
}

// 算法参考：https://blog.csdn.net/lavendersue/article/details/81066091
let HeaderAutoNum_zhNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], // 数字
    HeaderAutoNum_zhUnit = [_, "十", "百", "千", "万"]; // 单位，最大支持 99,999,999
/**
 * 数字格式转换：十进制 to 中文
 * @param num 十进制数字
 * @param upperCase 是否使用大写
 */
function HeaderAutoNum_decimalToZh(num, upperCase) {
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
            : HeaderAutoNum_zhNum[strArr[i]] + (strArr[i] === 0 ? HeaderAutoNum_zhUnit[0] : HeaderAutoNum_zhUnit[i])
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
function HeaderAutoNum_decimalToAlpha(value, upperCase) {
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
let HeaderAutoNum_romanNum = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"], // 罗马数字
    HeaderAutoNum_romanNumArea = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]; // 进位区间
/**
 * 数字格式转换：十进制 to 罗马
 * @param value 十进制数字
 * @param upperCase 是否使用大写
 */
function HeaderAutoNum_decimalToRoman(value, upperCase) {
    if (value <= 0 || value >= 4000)
       return value;
    let numeral = _;
    for (let i = 0; i < V_length(HeaderAutoNum_romanNum); i++) {
       while (value >= HeaderAutoNum_romanNumArea[i]) {
          value -= HeaderAutoNum_romanNumArea[i];
          numeral += HeaderAutoNum_romanNum[i];
       }
    }
    return upperCase ? numeral : numeral.l();
}

// ==================== 引用块增强类 ==================== //

let ExtQuote_columnsGroupCount = 0,
    ExtQuote_processingUCH = gFalse,
    ExtQuote_quoteToColoring = gFalse,
    ExtQuote_subTitle = ">:is(p" + __first_child_ + ",p" + __first_child_ + "+p)>:is(" + _strong_ + "," + _mark_ + ")" + __only_child_;

/**
 * 初始化引用块以实现折叠支持
 */
function ExtQuote_init() {
    // 初始化引用块着色的默认颜色标识
    let dcQuote = V_getParamVal(_quote_);
    if (dcQuote !== gNull) {
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
        // 处理引用块折叠（details）
        _t.ch(_h6_ + __first_child_).e((i, e) => {
            let details = __disposeDetailsFolder($(e));
            if (details)
                _t = details;
            matchedQuoteFold = true;
        });

        // 存在折叠，则标识，不参与分栏引用块的统一高度处理
        if (matchedQuoteFold) {
            _t.a(_data_folding_, _true_);
            V_tagName(_t.p()) === _blockquote_
                && _t.p().a(_data_folding_, _true_);
        }
        // ====================

        // ====================
        // 为引用小标题添加锚点
        // 配合前置的 LinkTool_vlookHashComform() 进行
        _t.f(ExtQuote_subTitle).e((i, e) => {
            let title = $(e);
            title.a(_id_, LinkTool_transSpecHash(title.t()));
            JQ_addClass(title.p().p(), _stt_);
        });
        // ====================

        // --------------------
        // 默认引用块，转换为引用块着色
        let parentTag = V_tagName(_t.p());

        // 跳过列表内、引用块内的嵌套引用块
        if (parentTag === "li" || parentTag === _blockquote_ || parentTag === _details_)
            return gTrue;
        let validColorCode = gFalse;
        // 判断引用块内是否包含了引用块着色语法
        // 针对新语法
        _t.f(">p>em" + __only_child_ + ">sub" + __only_child_).e((index, element) => {
            let _t = $(element);
            // 颜色标签独占一行的情况下才被视为是对引用块、详情的颜色标识
            if (_t.t().m(Color_syntax) !== gNull) {
                validColorCode = gTrue;
                return gFalse; // 提前结束循环
            }
        });

        // 引用块内不包含引用块着色语法的，则模拟指定默认的着色语法
        ExtQuote_quoteToColoring && !validColorCode
            && _t.ap("<p><em>" + V_ui_sub(_, _, Quote_defalutColor) + "</em></p>");
    });

    // 针对分栏引用块进行初始化
    ExtQuote_initColumns();

    // 针对分栏列表进行初始化
    ExtList_initColumns();

    /**
     * 对 details 折叠进行处理
     * @param target 带约定 details 折叠的对象
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
        summary.pp(V_ui_svgIcon(_icoDetailsOpen_, 18, 18, _text_, _v_svg_details_));

        let icon = summary.ch("." + _v_svg_details_);
        V_ui_addAnimate(icon);
        // 跟踪切换事件
        details.on("toggle", (event) => {
            // 自动调整高度
            summary.ps(_blockquote_ + V_attrCSS(_data_quote_group_)).p().c(_height_, _auto_);
            summary.p().c(_height_, _auto_);

            event.currentTarget.open
                ? JQ_addClass(icon, _v_rotate45_)
                : JQ_removeClass(icon, _v_rotate45_);
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
    $(_hr_ + "+" + _blockquote_
        + "," + _hr_ + "+" + _details_
        + "," + _hr_ + "+." + _md_alert_).e((index, element) => {
        ExtQuote_columnsGroupCount++;
        let _t = $(element),
            hr = _t.pr(),
            colCount = 0;

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        __hideHr(hr);
        colCount = V_length(hr.prevUntil(V_not(_hr_))) + 2; // 计算分栏数量
        // 有更多的 <hr> 则进行处理
        colCount > 2
            && __hideHr(hr.prevUntil(V_not(_hr_)));

        // ----------------------------------------
        // 对分栏按组进行初始处理
        __groupingColumns(_t);
        _t.nU(V_not(_blockquote_ + "," + _details_ + ",." + _md_alert_)).e((index, element) => {
            colCount > 0
                && __groupingColumns($(element));
        });

        // 隐藏标识分栏的 <hr>
        function __hideHr(target) {
            target.c(_visibility_, _hidden_)
                .c(_margin_, 0)
                .c(_border_, 0);
        }

        // 进行分组标识
        function __groupingColumns(quote) {
            JQ_addClass(quote, _column_);
            // 若为带折叠的引用块，则跳过
            if (quote.a(_data_folding_))
                return;

            quote.a(_data_quote_group_, ExtQuote_columnsGroupCount);
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
    for (let i = 1; i <= ExtQuote_columnsGroupCount; i++)
        ExtQuote_uniteColumnsHeightByGroupId(i);
    ExtQuote_processingUCH = gFalse;
}

/**
 * 对指定组的分栏进行统一高度处理
 * @param groupId 分栏组 id
 */
function ExtQuote_uniteColumnsHeightByGroupId(groupId) {
    if (groupId === gUndefined)
        return;

    // 找出同一组中最大的高度
    let maxHeight = 0,
        quote = $(_blockquote_ + V_attrCSS(_data_quote_group_, groupId) + ","
            + _details_ + V_attrCSS(_data_quote_group_, groupId) + ",."
            + _md_alert_ + V_attrCSS(_data_quote_group_, groupId));
    quote.e((index, element) => {
        let _t = $(element);
        _t.c(_height_, _auto_);
        // 没有被小屏强制适配为不分栏时才处理
        if (_t.c(_display_) !== _block_) {
            let height = _t.oH();
            if (height > maxHeight)
                maxHeight = height;
        }
    });

    // 没有被小屏强制适配为不分栏时才处理
    quote.c(_display_) !== _block_ && maxHeight > 0
        // 将同一组中最大的高度
        && quote.c(_height_, maxHeight);
}

// ==================== 列表增强类 ==================== //

/**
 * 对分栏列表进行初始化
 */
function ExtList_initColumns() {
    // 针对分栏列表进行修正
    $(_hr_ + "+ul," + _hr_ + "+ol").e((index, element) => {
        let _t = $(element),
            hr = _t.pr();

        // ----------------------------------------
        // 隐藏标识分栏的 <hr>
        hr.c(_display_, _none_);
        let colCount = V_length(hr.prevUntil(V_not(_hr_))) + 2; // 计算分栏数量
        // 有更多的 <hr>
        colCount > 2
            && hr.prevUntil(V_not(_hr_)).c(_display_, _none_);
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
        container.a(_data_cntr_, _table_);
        JQ_addClass(container, _v_cap_cntr_);

        // 表格滚动事件
        container.scroll(() => {
            TableCross_hide();
        });

        // 表格单元格初始化处理
        __initCell(_t);

        // 折叠长表格
        ContentFolder_add(_t, _table_);
        // 先根据题注语法生成题注
        Caption_genForTextContent(_t, _table_);
    }); // table
    sw.ed("    ├ Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    sw.st();
    $(_table_ + V_attrCSS(_data_cell_merge_, _true_)).e((index, element) => {
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
    $(_table_ + V_attrCSS(_data_column_fmting_, _true_)).e((index, element) => {
        ColumnFormatting_format($(element));
    });
    sw.ed("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    sw.st();
    $(_table_ + V_attrCSS(_data_row_group_, _true_)).e((index, element) => {
        let _t = $(element);
        RowGroup_init(_t);

        // 修正行分组的首个单元格的缩进
        _t.f("tr" + V_attrCSS(_data_folder_, _true_)).e((i, e) => {
            let td = $(e).ch("td:" + _first_);
            td.a(_data_ident_level_) !== gUndefined
                && td.c(_padding_left_, ".5em");
        });
    });
    sw.ed("    ├ Row Group: ");

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
                needCheckColumnFormatting = gTrue;
            // ----------------------------------------
            // 遍历单元格
            $(element).f("th").e((i, e) => {
                let th = $(e),
                    text = th.t();

                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge
                    && table.a(_data_cell_merge_) !== _true_
                    && (CellMerge_syntax_row.test(text)
                    || CellMerge_syntax_col.test(text))) {
                        // 将表格标识为带合并单元格语法
                        table.a(_data_cell_merge_, _true_);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带列格式语法
                if (needCheckColumnFormatting) {
                    if (ColumnFormatting_init(table, th, text))
                        needCheckColumnFormatting = gFalse;
                }

                // ----------------------------------------
                // 添加列号标识，用于列格式化时使用
                th.a(_data_tbl_col_, "tbl-" + V_doc_counter_table + "-" + colIndex);
                colIndex++;

                // ---------- 非列头的单元格阅读模式（十字光标）处理 ----------
                // 鼠标点击单元格时显示阅读模式（十字光标）
                TableCross_bind(table, th);
            });
        });

        // 标记该表格列太多，用于匹配是否换行、不换行的自动版式
        colIndex >= 7
            && table.a(_data_col_too_more_, colIndex);

        // ----------------------------------------
        // 遍历表格「非列头」行
        table.f(_tbody_ + ">tr").e((index, element) => {
            let colIndex = 0,
                needCheckCellMerge = gTrue,
                needCheckRowGroup = gTrue;

            // ----------------------------------------
            // 遍历单元格
            $(element).f("td").e((i, e) => {
                let td = $(e),
                    text = td.t();

                // 对于屏幕较小时，调整单元格的最大宽度处理
                jq_Window.oW() <= gUnwrapTableScreenWidth
                    && TableWrap_minWidthTd(table, td);

                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge
                    && table.a(_data_cell_merge_) !== _true_
                    && (CellMerge_syntax_row.test(text)
                    || CellMerge_syntax_col.test(text))) {
                        // 将表格标识为带合并单元格语法
                        table.a(_data_cell_merge_, _true_);
                        needCheckCellMerge = gFalse;
                }
                // 检测是否带行折叠语法
                if (needCheckRowGroup
                    && colIndex === 0 // 只检测第 1 列
                    && table.a(_data_row_group_) !== _true_
                    && RowGroup_syntax_tag.test(text)) {
                        // 将表格标识为带行折叠语法
                        table.a(_data_row_group_, _true_);
                        needCheckRowGroup = gFalse;
                }
                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<ma.+rk>$/.test(td.hm())) {
                    td.ch().ch().unwrap(); // 解包 <mark>
                    JQ_addClass(td, _v_tbl_col_fmt_mark_);
                }

                // 添加列号标识，用于列格式化时使用
                td.a(_data_tbl_col_, "tbl-" + V_doc_counter_table + "-" + colIndex);
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
            // 克隆表格对象
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
                cell.rm();
                if (colSpanCount === 1)
                    colSpanCell = lastCell;
            }
            // 不是列合并标识，则进行最近列标识数据进行处理
            else {
                if (colSpanCount > 0 && colSpanCell !== gUndefined) {
                    colSpanCell.a(_colspan_, colSpanCount + 1);
                    CellMerge_emptyBlankCell(colSpanCell);
                    colSpanCell.c(_text_align_, _center_);
                }
                // 对于不是合并标识时，也清空无内容的单元格
                else
                    CellMerge_emptyBlankCell(cell);
                colSpanCount = 0;
            }
            lastCell = cell;
        }); // find(td, th)

        // 如果列合并了所有列，且内容为空，则取消表格行号等样式
        if (colCount === colSpanCount + 1 && V_length(tr.t().x()) === 0)
            JQ_addClass(tr, _v_table_ + "-colspan-all");

        // 列间合并：对于最后一列的补充处理
        if (colSpanCount > 0 && colSpanCell !== gUndefined) {
            colSpanCell.a(_colspan_, colSpanCount + 1);
            CellMerge_emptyBlankCell(colSpanCell);
            colSpanCell.c(_text_align_, _center_);
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
                    if (rowSpanCell === gNull)
                        rowSpanCell = tblData[r - 1][c];
                    // 记录最大列头行合并深度
                    if (r === 1)
                        thSpanFlag = gTrue;
                    if (thSpanFlag)
                        tblTd2ThData[V_length(tblTd2ThData)] = tblData[r][c].p();
                    tblData[r][c].rm(); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    c + 1 < V_length(tblSpan[r])
                        && tblData[r][c + 1].c(_padding_left_, V_getVarVal("--tbl-" + _cell_ + "-" + _padding_));
                } else {
                    thSpanFlag = gFalse;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell !== gNull) {
                        rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                        CellMerge_emptyBlankCell(rowSpanCell);
                        rowSpanCell.c(_vertical_align_, _middle_);
                        rowSpanCount = 0;
                        rowSpanCell = gNull;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell !== gNull) {
                rowSpanCell.a(_rowspan_, rowSpanCount + 1);
                CellMerge_emptyBlankCell(rowSpanCell);
                rowSpanCell.c(_vertical_align_, _middle_);
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
                    tblCol = td.a(_data_tbl_col_),
                    classValue = td.a(_class_),
                    colspan = td.a(_data_colspan_);
                // 将 td 转换为 th 标签
                td.a(_data_td2th_, _true_);
                td.rW(td.prop(_outerHTML_).rA("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.p().a(_style_, style);
                td.p().a(_data_tbl_col_, tblCol);
                td.p().a(_class_, classValue);
                td.p().a(_data_colspan_, colspan);
            });
            // 对被从 td 转换为 th 单元格，重新绑定：鼠标点击单元格时显示阅读模式（十字光标）
            foundTd
                && tblTd2ThData[i].f("th" + V_attrCSS(_data_td2th_)).e((index, element) => {
                    TableCross_bind(table, $(element));
                });
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
    if (cell.t().x() === _ || V_isLength0(cell)) {
        cell.hm(_);
        JQ_addClass(cell, _v__ + _empty_ + "-" + _cell_);
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

let TableCross_ui = gUndefined,
    TableCross_lastTable = gUndefined, // 最后/当前显示阅读模式（十字光标）的表格
    TableCross_lastCell = gUndefined; // 最后/当前显示阅读模式（十字光标）的表格单元格

function TableCross_init() {
    TableCross_ui = $(_v_tbl_x_);
    V_ui_addAnimate(TableCross_ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
function TableCross_toggle(event) {
    let table = ContentAssistor_lastHover;
    // 已打开，则关闭
    table !== gUndefined && table.a(_data_tbl_x_) === _true_
        ? TableCross_disable(table)
        // 未打开，则打开
        : TableCross_enable(table, event);
}

// 打开表格阅读模式（十字光标）
function TableCross_enable(table, event) {
    table.a(_data_tbl_x_, _true_);
    JQ_addClass(ContentAssistor_btns_tableCross, _selected_);

    // 默认从表体第 1 行第 1 个单元格开始
    TableCross_goto(table, table.f("tbody>tr" + __first_child_ + ">td" + __first_child_), event);
}

// 关闭表格阅读模式（十字光标）
function TableCross_disable(table) {
    if (table === gUndefined)
        table = TableCross_lastTable;
    if (table !== gUndefined) {
        table.a(_data_tbl_x_, _false_);
        TableCross_lastTable = gUndefined;
    }
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
        TableCross_goto(table, cell, event);
    });
}

/**
 * 跳转至指定单元格
 * @param table 单元格所属表格对象
 * @param cell 单元格对象
 * @param event 事件对象
 */
function TableCross_goto(table, cell, event) {
    if (table.a(_data_tbl_x_) !== _true_ || Copy_processing)
        return;

    // 首次点击，先强制移除动画
    TableCross_lastTable === gUndefined
        && V_ui_removeAnimate(TableCross_ui);

    let container = table.p().p(),
        contentFolded = container.a(_data_content_folded_);
    // 跳过被折叠表格
    if (contentFolded === _true_)
        return;

    // 若点击同时也触发了「代码 / 标签」的复制
    !Copy_processing && event
        && V_stopPropagation(event); // 停止事件冒泡，避免与其他事件的处理冲突（如：document.click）

    TableCross_hide(gTrue);
    JQ_addClass(cell, _v_tbl_x_cell_);

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
    let leftUp = $(_v_tbl_x_ + "." + _left_ + "-" + _up_);
    leftUp.c(_left_, cornerLeftX)
        .c(_top_, cornerUpY)
        .c(_width_, cornerLeftWidth)
        .c(_height_, cornerUpHeight)
        .c(_z_index_, 9);

    // 右上角
    let rightUp = $(_v_tbl_x_ + "." + _right_ + "-" + _up_);
    rightUp.c(_left_, cornerRightX)
        .c(_top_, cornerUpY)
        .c(_width_, cornerRightWidth)
        .c(_height_,  cornerUpHeight)
        .c(_z_index_, 9);

    // 左下角
    let leftDown = $(_v_tbl_x_ + "." + _left_ + "-" + _down_);
    leftDown.c(_left_, cornerLeftX)
        .c(_top_, cornerDownY)
        .c(_width_, cornerLeftWidth)
        .c(_height_, cornerDownHeight)
        .c(_z_index_, 9);

    // 右下角
    let rightDown = $(_v_tbl_x_ + "." + _right_ + "-" + _down_);
    rightDown.c(_left_, cornerRightX)
        .c(_top_, cornerDownY)
        .c(_width_, cornerRightWidth)
        .c(_height_, cornerDownHeight)
        .c(_z_index_, 9);

    // 须延时后再执行显示，让以上代码先完成
    V_later(() => {
        // 针对不同表格之间点击强制移除动画后的恢复
        V_ui_addAnimate(TableCross_ui);
        V_ui_fadeShow(leftUp);
        V_ui_fadeShow(rightUp);
        V_ui_fadeShow(leftDown);
        V_ui_fadeShow(rightDown);
    }, 50);
}

/**
 * 处理热键操作
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function TableCross_disposeHotkey(key, combKeys, event) {
    if (TableCross_lastTable === gUndefined || TableCross_lastCell === gUndefined)
        return gFalse;

    let handled = gFalse,
        newTr = gUndefined;
    // 以下未考虑在有单元格合并情况下的处理
    if (V_noCombKeys(combKeys)) {
        switch (key) {
            case _ArrowLeft_: // left
                __gotoCell(TableCross_lastCell.pr());
                handled = gTrue;
                break;
            case _ArrowRight_: // right
                __gotoCell(TableCross_lastCell.n());
                handled = gTrue;
                break;
            case _ArrowUp_: // up
                // 查找上一行
                newTr = TableCross_lastCell.p().pr();
                if (V_isLength0(newTr)) {
                    let trParent = TableCross_lastCell.p().p();
                    if (V_tagName(trParent) === _tbody_)
                        newTr = trParent.pr().ch().last();
                }
                // 有上一行时的处理
                __gotoCellByTr(newTr, _ArrowUp_);
                handled = gTrue;
                break;
            case _ArrowDown_: // down
                // 查找下一行
                newTr = TableCross_lastCell.p().n();
                if (V_isLength0(newTr)) {
                    let trParent = TableCross_lastCell.p().p();
                    if (V_tagName(trParent) === _thead_)
                        newTr = trParent.n().ch().first();
                }
                // 有下一行时的处理
                __gotoCellByTr(newTr, _ArrowDown_);
                handled = gTrue;
                break;
            case _Enter_: // Enter
                if (TableCross_lastCell.a(_class_).i(_v_tbl_row_g_folder_) > -1) {
                    // 临时保存
                    let tmp = TableCross_lastTable;
                    TableCross_lastCell.ch(_v_tbl_row_g_btn_).tr(_click_);
                    // 恢复最后选择的样式（因为在上面模拟鼠标触发时会关闭）
                    TableCross_lastTable = tmp;
                    __gotoCell(TableCross_lastCell);
                    handled = gTrue;
                }
                break;
            case _Escape_:
                // 表格为阅读模式时，则退出
                if (V_ui_isShowed(TableCross_ui)) {
                    TableCross_disable();
                    handled = gTrue;
                }
                break;
        }
    }

    // 移动到指定的 cell 对象位置
    function __gotoCell(cell) {
        V_length(cell) > 0
            && TableCross_goto(TableCross_lastTable, cell, event);
    }

    // 移动到新一行上对应 cell 对象的新位置
    function __gotoCellByTr(newTr, arrow) {
        if (V_length(newTr) > 0) {
            // 对于表格行分组（未展开时）
            newTr.c(_display_) === _table_column_
                // 尝试再寻找下一个常规行（遍历）
                ? __gotoCellByTr((arrow === _ArrowDown_) ? newTr.n() : newTr.pr(), arrow)
                // 常规行
                : __gotoCell(newTr.ch(V_attrCSS(_data_tbl_col_, TableCross_lastCell.a(_data_tbl_col_))));
        }
    }

    // 如果事件已处理，则禁止双重操作
    handled && V_preventDefault(event);

    return handled;
}

/**
 * 隐藏表格阅读模式（十字光标）
 * @param sameTable true: 同一个表格内的情况，false: 不同表格
 */
function TableCross_hide(sameTable) {
    if (TableCross_lastCell === gUndefined)
        return;

    if (sameTable) {
        JQ_removeClass(TableCross_lastCell, _v_tbl_x_cell_);
        return;
    }

    JQ_removeClass(TableCross_lastCell, _v_tbl_x_cell_);
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
    TableWrap_isWrap()
        ? TableWrap_disable(table)
        // 未开启，则开启
        : TableWrap_enable(table);
}

/**
 * 判断表格是否启用了换行
 */
function TableWrap_isWrap() {
    return ContentAssistor_lastHover.c(_white_space_) === _pre_wrap_;
}

// 开启表格换行
function TableWrap_enable(table) {
    table.f("td." + _v_long_).e((index, element) => {
        let _t = $(element);
        _t.a(_data_long_, gTrue);
        JQ_removeClass(_t, _v_long_);
    });

    JQ_addClass(ContentAssistor_btns_wrap, _selected_);
    JQ_removeClass(table, _unwrap_);
    JQ_addClass(table, _wrap_);
}

// 关闭表格换行（即不换行）
function TableWrap_disable(table) {
    table.f("td" + V_attrCSS(_data_long_, gTrue)).e((index, element) => {
        let _t = $(element);
        JQ_addClass(_t, _v_long_);
        JQ_removeAttr(_t, _data_long_);
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
            TableWrap_minWidthTd(table, $(e));
        });
    });
}

// 关闭表格换行、不换行后的处理
function TableWrap_minWidthTd(table, td) {
    // 表格列数不超指定上限时，不处理
    if (table.a(_data_col_too_more_) === gUndefined)
        return;

    let text = td.t(),
        wrapLimit = 20; // 单元格内单行字数上限（不含标点符号）

    if (table.c(_white_space_) !== _pre_wrap_ && V_length(text) > wrapLimit) {
        let lines = __cleanBr(td.hm());
        // 按行处理
        for (let i = 1; i < V_length(lines); i++) {
            let counterResult = V_countWord(lines[i]);
            // 只处理字符过多的行
            if (counterResult.latin * 2 + counterResult.CJK > wrapLimit) {
                JQ_addClass(td, _v_long_);
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
            line
                && lines.push(line);
        }
        return lines;
    }
}

// ==================== 表格列格式化类 ==================== //

let ColumnFormatting_syntax_checkbox_header = /\[ ?] ?/; // 复选框列头格式语法
let ColumnFormatting_syntax_checkbox_cell = /(^((\[[x-]])|[YyNn?？])(\s.+)*)/; // 复选框列内单元格格式语法

/**
 * 初始化
 * @param table 表格对象
 * @param cell 单元格对象
 * @param text 单元格文本内容
 */
function ColumnFormatting_init(table, cell, text) {
    if (table.a(_data_column_fmting_) !== _true_
        && (V_length(cell.f(":is(" + _strong_ + ",em,u," + _mark_ + "," + _del_ + ")" + __only_child_)) > 0 // 普通列格式
        || cell.c(_text_align_) === _right_ // 右对齐表示使用数值格式
        || ColumnFormatting_syntax_checkbox_header.test(text))) { // 复选框列格式
            // 将表格标识为带列格式语法
            table.a(_data_column_fmting_, _true_);
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
        cells = table.f(V_attrCSS(_data_colspan_, _true_, "!") + V_attrCSS(_data_tbl_col_, th.a(_data_tbl_col_)));
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
        tbodyCells = table.f("td" + V_attrCSS(_data_tbl_col_, th.a(_data_tbl_col_)));
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
        if (V_length(th.ch(_strong_ + __only_child_)) > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _v_tbl_col_fmt_bold_ +___;
        }

        // 斜体
        if (V_length(th.f("em" + __only_child_)) > 0) {
            cells = ColumnFormatting_getCells(table, th, cells);
            cellsCSS += _v_tbl_col_fmt_em_ +___;
        }

        // 高亮
        let thHTML = th.hm();
        if (thHTML.sW("<mar") && thHTML.eW("rk>") // <mark>...</mark>
            || th.a(_class_) !== gUndefined
            && th.a(_class_).i(_v_tbl_col_fmt_mark_) > -1) {
                $(V_attrCSS(_data_tbl_col_, th.a(_data_tbl_col_))).f(_mark_).ch().unwrap();
                cells = ColumnFormatting_getCells(table, th, cells);
                cellsCSS += _v_tbl_col_fmt_mark_ +___;
        }

        // 批量添加以上列的常规样式
        cells !== gUndefined && V_length(cellsCSS) > 0
            && JQ_addClass(cells, cellsCSS);

        // 删除线
        if (V_length(th.ch(_del_ + __first_child_)) > 0) {
            // 删除对应的列
            th.rm();
            ColumnFormatting_getTbodyCells(table, th, tbodyCells).rm();
        }

        // 复选框
        if (ColumnFormatting_syntax_checkbox_header.test(th.t())) {
            cells = ColumnFormatting_getCells(table, th, cells);
            JQ_addClass(cells, _v_tbl_col_fmt_chkbox_);

            // 删除列头的复选框语法
            ColumnFormatting_removeCheckboxSyntax(th, ColumnFormatting_syntax_checkbox_header);

            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);

            tbodyCells.e((i, e) => {
                let ce = $(e),
                    ceText = ce.t().x(),
                    typeFlag = ceText.m(ColumnFormatting_syntax_checkbox_cell),
                    chkStatus = _no_,
                    chkStyle = _dark_;

                typeFlag = (typeFlag !== gNull) ? typeFlag[2] : _;

                // 跳过横向合并的单元格
                if (ce.a(_colspan_) !== gUndefined)
                    return gTrue; // 跳过当前循环

                // 移除单元格的复选框语法内容
                ColumnFormatting_removeCheckboxSyntax(ce, typeFlag);

                // 指定为 yes - 已选择
                if (typeFlag.l() === "y") { // 旧语法 || typeFlag === "[x]") {
                    chkStatus = _yes_;
                    chkStyle = _theme_;
                }
                // 指定为 no - 未选择
                if (typeFlag.l() === "n") { // 旧语法 || typeFlag === "[ ]") {
                    chkStatus = _no_;
                    chkStyle = _dark_;
                }
                // 指定为 un - 不确定选择
                else if (typeFlag === "?" || typeFlag === "？") { // 旧语法 || typeFlag === "[-]") {
                    chkStatus = _un_;
                    chkStyle = _theme_;
                }
                // 无指定
                else
                    ce.rHTML(_nbsp_, _);

                // 添加复选框样式（有指定的内容，或单元内容为空时才添加）
                if (V_length(typeFlag) > 0 || V_isLength0(ceText))
                    ce.pp(V_ui_svgIcon(_icoChkbox__ + chkStatus, 14, 14, chkStyle, _, V_attr(_data_chk_, chkStatus)));
                else
                    // 添加差异化的文本颜色
                    ce.pp("<em>" + V_ui_sub(_, _, "Gy") + "</em>");
            });
        }

        // 数值格式
        if (th.c(_text_align_).sW("r")) {
            tbodyCells = ColumnFormatting_getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            JQ_addClass(tbodyCells, _v_tbl_col_fmt_num_);
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
                        bg1 = V_ui_var(___ac_ + "wt" + __fd_), // V_ui_formatRGBA(percentBg, 0.1),//"rgba(128, 128, 128, 0.1)",
                        bg2 = V_ui_var(___ac_ + "t1" + __fd_), // V_ui_formatRGBA(percentBg, 0.4),//"rgba(128, 128, 128, 0.4)",
                        bgSplit = V_ui_var(___ac_ + "t1"); // V_ui_formatRGBA(percentBg, 0.8);//"rgba(128, 128, 128, 0.8)";

                    // 对有着色的进行渐变颜色调整
                    if (coloring) {
                        let baseColor = ce.a(_class_).i(_v_tbl_col_fmt_num_negative_) > -1 ? "gn" : "rd";
                        bg1 = V_ui_var(___ac_ + "wt" + __fd_);
                        bg2 = V_ui_var(___ac_ + baseColor + __fd_);
                        bgSplit = V_ui_var(___ac_ + baseColor);
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.c(_background_, _linear_gradient_ + "(90deg," + bg1 + " 0%," + bg2 +___+ (percentValue > 1 ? percentValue - 1 : 0)
                        + "%," + bgSplit +___+ percent
                        + "," + _transparent_ +___+ percent + ")")
                            .c(_min_width_, "100px");
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
        th.a(_colspan_) !== gUndefined
            ? th.a(_data_colspan_, _true_)
            : th.a(_data_colspan_, _false_);
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
            JQ_addClass(target, _v_tbl_col_fmt_num_negative_);
            return gTrue;
        }
        else if (text.sW("+")) {
            JQ_addClass(target, _v_tbl_col_fmt_num_positive_);
            return gTrue;
        }
    }
    // 正、负号在文本的任意位置
    else {
        if (text.i("-") > -1) {
            JQ_addClass(target, _v_tbl_col_fmt_num_negative_);
            return gTrue;
        }
        else if (text.i("+") > -1) {
            JQ_addClass(target, _v_tbl_col_fmt_num_positive_);
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
    if (syntaxText === "n") { // 避免错将 <span> 中的 n 替换了
        syntaxText = ">n";
        target.rHTML(syntaxText, ">");
    }
    else
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
    RowGroup_icoCloser = V_ui_svgIcon(_icoFolded_, 16, 16, _text_);

/**
 * 初始化
 * @param table 表格对象
 */
function RowGroup_init(table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    JQ_addClass(table.f(V_attrCSS(_data_tbl_col_, "-0", "$")), _v_tbl_row_g_not_folder_);

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0; // 当前缩进等级

    // 遍历所有行的第 1 个单元格
    table.f("td" + __first_child_).e((index, element) => {
        let td = $(element),
            tr = td.p(),
            text = td.t();

        // 判断每行的首列，是否有行折叠标识
        // 没有则进入下一个循环
        if (!RowGroup_syntax_tag.test(text)) {
            lastLevel = 0;
            RowGroup_parentStack.length = 0;
            RowGroup_colorStack.length = 0;
            return gTrue; // 跳过当前循环
        }

        // 从语法中获得当前缩进等级
        currentLevel = text.i(RowGroup_spliter) + 1;
        // 当前等级比上一次等级要深
        if (currentLevel > lastLevel) {
            lastLevel = currentLevel;
            // 设置为新的行分组
            RowGroup_newFolder(tr);
            // 设置为行缩进行
            RowGroup_ident(tr, td, currentLevel);
        }
        // 当前等级比上一次等级要浅
        else {
            // 获得等级差进行
            let count = lastLevel - currentLevel;
            // 获得当前行对应的上级行
            if (count > 0)
                for (let i = 0; i < count; i++) {
                    RowGroup_parentStack.pop();
                    RowGroup_colorStack.pop();
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
function RowGroup_newFolder(tr) {
    let folderRow = tr.pr();
    RowGroup_folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup_parentStack.push(RowGroup_folderCount);

    // 设置折叠行分组的属性
    folderRow.a(_data_folder_id_, RowGroup_folderCount);
    folderRow.a(_data_folder_, _true_);
    folderRow.a(_data_row_folded_, _true_);

    // 获得折叠行分组首个单元格
    let td = folderRow.ch("td:" + _first_),
        tdHadIdent = td.f("." + _v_tbl_row_g_identer_ + __last_);

    // 设置折叠控件样式
    V_length(tdHadIdent) > 0
        ? tdHadIdent.af(V_ui_span(_v_tbl_row_g_btn_.xD(), _, RowGroup_icoCloser))
        : td.pp(V_ui_label(_v_tbl_row_g_btn_.xD(), _, RowGroup_icoCloser));

    V_ui_addAnimate(td.f(_v_tbl_row_g_btn_ + ">" + _svg_));
    // 调整折叠行的缩进样式
    JQ_removeClass(td, _v_tbl_row_g_not_folder_);
    JQ_addClass(td, _v_tbl_row_g_folder_);
    JQ_addClass(tdHadIdent, _v_tbl_row_g_identer_folder_);

    // 添加代表目录的括号及样式
    // 重新组合生成新的单元格内容，以支持原始带格式的单元格内容
    let preClass = "." + _v_tbl_row_g_identer_ + "," + _v_tbl_row_g_btn_,
        preObjs = td.f(preClass),
        cloneTd = td.clone();
    cloneTd.ch(preClass).rm();
    td.hm(__echoOuterHTML(preObjs) +___+ cloneTd.hm());

    // 设置展开、收起事件
    td.ch(_v_tbl_row_g_btn_).ck((event) => {
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
    V_stopPropagation(event);

    // 处理行分组的打开、关闭
    folderRow.a(_data_row_folded_).sW("t")
        ? RowGroup_open(folderRow)
        : RowGroup_close(folderRow);

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
    if (table.a(_data_row_group_) !== _true_)
        return gFalse;

    table.f(_v_tbl_row_g_btn_).e((index, element) => {
        let folderRow = $(element).p().p();
        folderRow.a(_data_row_folded_) === _true_
            && RowGroup_open(folderRow, mode);
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
    if (table.a(_data_row_group_) !== _true_)
        return gFalse;

    // 只对第一级的行分组进行处理，非第一级的行分级为 span.v-tbl-row-g-btn
    table.f(_label_ + _v_tbl_row_g_btn_).e((index, element) => {
        let folderRow = $(element).p().p();
        LOG(mode, folderRow.a(_data_row_open_mode_), folderRow.a(_data_row_folded_));
        if (mode === _auto_)
            if (folderRow.a(_data_row_open_mode_) === _auto_ && folderRow.a(_data_row_folded_) === _false_)
                RowGroup_close(folderRow);
        else
            if (folderRow.a(_data_row_folded_) !== _true_)
                RowGroup_close(folderRow);
    });
    return gTrue;
}

/**
 * 重置清空表格中的行分组相关信息
 * @param target 目标表格
 */
function RowGroup_reset(target) {
    JQ_removeAttr(target, _data_row_group_);
    JQ_removeAttr(target.f("tr" + V_attrCSS(_data_parent_folder_id_)), _data_parent_folder_id_);
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
    tr.a(_data_parent_folder_id_, RowGroup_lastParent());
    // 设置缩进样式
    td.a(_data_ident_level_, level);
    // 调整样式
    JQ_removeClass(td, _v_tbl_row_g_not_folder_);
    JQ_addClass(td, _v_tbl_row_g_sub_);
    // 设置被折叠行的背景色
    tr.c(_background_color_, RowGroup_lastColor());

    // 生成缩进占位元素
    for (let i = 0; i < level; i++) {
        let identer = td.f("." + _v_tbl_row_g_identer_ + __last_),
            identObj = V_ui_label(_v_tbl_row_g_identer_, _);
        V_length(identer) > 0
            ? identer.af(identObj)
            : td.pp(identObj);
    }

    // 隐藏被折叠的行
    tr.c(_display_, _table_column_);
}

/**
 * 展开表格行分组
 * @param folderRow 行分组对象
 * @param mode 指定打开模式。auto：系统自动打开
 */
function RowGroup_open(folderRow, mode) {
    // 处理展开行分组
    let id = folderRow.a(_data_folder_id_),
        table = folderRow.p().p(),
        subRows = table.f("tr" + V_attrCSS(_data_parent_folder_id_, id)),
        folderButton = folderRow.ch("td:" + _first_).ch(_v_tbl_row_g_btn_ + __last_);

    folderRow.a(_data_row_folded_, _false_);
    mode !== gUndefined
        && folderRow.a(_data_row_open_mode_, mode);
    JQ_addClass(folderButton.ch(_svg_), _v_rotate90_);
    subRows.c(_display_, _);
}

/**
 * 折叠表格行分组
 * @param folderRow 行分组对象
 */
function RowGroup_close(folderRow) {
    // 处理折叠行分组
    let id = folderRow.a(_data_folder_id_),
        subRows = $("tr" + V_attrCSS(_data_parent_folder_id_, id)),
        folderButton = folderRow.ch("td:" + _first_).ch(_v_tbl_row_g_btn_ + __last_);

    folderRow.a(_data_row_folded_, _true_);
    JQ_removeAttr(folderRow, _data_row_open_mode_);
    JQ_removeClass(folderButton.ch(_svg_), _v_rotate90_);

    // 折叠所有子行（包括行分组）
    subRows.e((index, element) => {
        let tr = $(element),
            folder = tr.a(_data_folder_);
        folder === _true_
            && RowGroup_close(tr);
        tr.c(_display_, _table_column_);
    });
}

// ==================== 音频增强类 ==================== //

let ExtAudio_icon_loading = V_ui_svgIcon(_icoLoading_, 16, 16, _btnFc_),
    ExtAudio_icon_play = V_ui_svgIcon(_icoPlay_, 16, 16, _btnFc_),
    ExtAudio_icon_pause = V_ui_svgIcon(_icoPause_, 16, 16, _btnFc_),
    ExtAudio_icon_stop = V_ui_svgIcon(_icoStop_, 16, 16, _btnFc_),
    ExtAudio_icon_forbidden = V_ui_svgIcon(_icoForbidden_, 16, 16, _btnFc_);

/**
 * 初始化音频数据
 */
function ExtAudio_init() {
    // 支持指定类型的音频，以及支持带参数的 URL
    let writeImg = _idWrite_ +___+ _img_;
    $(writeImg + V_attrCSS(_src_, _mp3_, "$") + "," + writeImg + V_attrCSS(_src_, _m4a_, "$") + "," + writeImg + V_attrCSS(_src_, _ogg_, "$") + "," + writeImg + V_attrCSS(_src_, _wav_, "$") + ","
    + writeImg + V_attrCSS(_src_, _mp3_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _m4a_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _ogg_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _wav_ + "?", "*") ).e((index, element) => {
        let audioLike = $(element),
            audio = gUndefined,
            src = audioLike.a(_src_),
            container = audioLike.p(),
            params = V_getUrlQueryParams(src);

        // 指定为 mini 模式（扩展的自定义控件）
        if (params[_controls_] === _mini_) {
            V_doc_counter_audiomini++;

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.a(_id_, _vk_id_mini_audio_ + V_doc_counter_audiomini);

            // 添加音频播放 mini 控件
            audio.af(V_ui_divExt(_vk_id_mini_audio_ + V_doc_counter_audiomini + __control_, _v_audio_mini_control_,
                V_attr(_data_title_, _mini_ +___+ _audio_ +___+ V_doc_counter_audiomini), _));

            // 开始加载音频
            audio.on(_load_+_start_, (event) => {
                let controls = V_byID(V_eventCurrentTarget(event).a(_id_) + __control_);
                JQ_addClass(controls, _v_audio_mini_control_);
                JQ_addClass(controls, _loading_);
                controls.hm(ExtAudio_icon_loading);
            });

            // 音频就绪可以开始播放
            audio.on("canplay", (event) => {
                let controls = V_byID(V_eventCurrentTarget(event).a(_id_) + __control_);
                JQ_removeClass(controls, _loading_);

                // 绑定点击事件
                controls.uC().ck((event) => {
                    __play(event.currentTarget, audio[0]);
                });
                controls.hm(ExtAudio_icon_play);
                controls.a(_data_pause_, params[_pause_]);

                // 须显示持续时长
                let dur = params[_duration_];
                if (dur === _true_) {
                    let dur2 = audio.a(_data_duration_);
                    if (dur2 !== _true_) {
                        // 计算音频时长
                        let duration = audio[0].duration,
                            min = Math.floor(duration / 60),
                            sec = Math.floor(duration -  min * 60);
                        let minStr = min > 0 ? min + "′" : _;
                        audio.n().af(" <sup " + V_attrCSS(_class_, _v__ + _duration_) + ">" + minStr + sec + "″</sup>");
                        audio.a(_data_duration_, _true_);
                    }
                }
            });

            // 正在播放
            audio.on(_playing_, (event) => {
                let controls = V_byID(V_eventCurrentTarget(event).a(_id_) + __control_),
                    pause = controls.a(_data_pause_);

                JQ_addClass(controls, _v_audio_mini_control_)
                JQ_addClass(controls, _playing_);

                // 支持暂停播放
                if (pause !== _true_)
                    controls.hm(ExtAudio_icon_pause);
                // 不支持暂停播放，暂时即结束
                else {
                    controls.hm(ExtAudio_icon_stop);
                    audio.currentTime = 0; // 播放都是从头开始
                }
            });

            // 播放结束后恢复按钮状态
            audio.on("ended", (event) => {
                let controls = V_byID(V_eventCurrentTarget(event).a(_id_) + __control_);
                controls.hm(ExtAudio_icon_play);
                JQ_removeClass(controls, _playing_);
            });

            // 故障或不可用
            audio.on(_emptied_, (event) => {
                let id = V_eventCurrentTarget(event).a(_id_) + __control_,
                    controls = V_byID(id);
                JQ_removeClass(controls, _loading_);
                controls.hm(ExtAudio_icon_forbidden);
                JQ_addClass(controls, _v_audio_mini_control_);
                JQ_addClass(controls, _disabled_);
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.p());
            });

            // 加载错误
            audio.on(_error_, () => {
                audio.tr(_emptied_);
            });

            // 鼠标 mouseenter 和 mouseleave 事件
            // audio.on(_mouseEnter_, (event) => {
            //     let _t =  V_eventCurrentTarget(event);
            //     _t.a(_class_).i(_disabled_) === -1
            //         && JQ_addClass(_t, _hover_);
            // }).on(_mouseLeave_, (event) => {
            //     JQ_removeClass(V_eventCurrentTarget(event), _hover_);
            // });
        }
        // 标准控件模式
        else {
            V_doc_counter_audio++;

            // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (V_tagName(container) !== "p") {
                audioLike.wrap("<p></p>");
                container = audioLike.p();
            }
            // 设置容器样式数据，用于折叠内容时使用
            container.a(_data_cntr_, _audio_);
            JQ_addClass(container, _v_cap_cntr_);

            // 先根据题注语法生成题注
            Caption_genForMediaContent(audioLike, _audio_);

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.a(_controls_, _controls_);

            // 若有第 2 题注，则微调样式
            V_length(audio.n(__v_cap2_)) > 0
                && audio.c(_margin_bottom_, "-10px");

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
            let title = targetToJump.a(_data_title_);
            if (title === gUndefined)
                title = targetToJump.a(_src_);

            // 将无法加载的音频信息添加到链接检查器
            LinkTool_addToCheckResult(_error_ + __address_, targetToJump,
                V_ui_label(_, _, V_lang_text63()) + title);//targetToJump.a(_dataTitle_));
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
            "Not support audio " + _tag_
            ][V_lang];

        // 对 audio 标签的属性进行支持
        let autoplay = V_getUrlQueryParams(src)[_autoplay_],
            loop = V_getUrlQueryParams(src)[_loop_],
            preload = V_getUrlQueryParams(src)[_preload_];

        // 将 URL 为音频资源的 img 标签转换为 audio
        audioLike.wrap(V_ui_audio(V_attr(_src_, src), tips));
        let audio = audioLike.p();
        // 移除图片 img 标签
        audioLike.rm();

        // 设置 audio 属性
        autoplay !== gUndefined
            && audio.a(_autoplay_, _autoplay_);
        loop !== gUndefined
            && audio.a(_loop_, _loop_);
        preload !== gUndefined
            && audio.a(_preload_, _auto_);

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
        if (audio.paused)
            audio.play();
        // 播放中
        else {
            controls.hm(ExtAudio_icon_play);
            JQ_removeClass(controls, _playing_);
            audio.pause();

            // 不支持暂时播放时，暂时即结束
            if (controls.a(_data_pause_) === gUndefined)
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
    let writeImg = _idWrite_ +___+ _img_;
    $(writeImg + V_attrCSS(_src_, _ogv_, "$") + "," + writeImg + V_attrCSS(_src_, _mp4_, "$") + "," + writeImg + V_attrCSS(_src_, _webm_, "$") + ","
        + writeImg + V_attrCSS(_src_, _ogv_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _mp4_ + "?", "*") + "," + writeImg + V_attrCSS(_src_, _webm_ + "?", "*") + ","
        + gSelector_iframeVideo.r(/\[src\*=/g, "[data-src*=") // 针对 lazyLoading 后的 src 属性变化
    ).e((index, element) => {
        let videoLike = $(element),
            tagName = V_tagName(videoLike),
            video = gUndefined,
            src = videoLike.a(_src_),
            container = videoLike.p();
        V_doc_counter_video++;

        // 确保 video 有独立的父容器，一般情况下 Typora 导出的为 <p>
        if (V_tagName(container) !== "p") {
            videoLike.wrap("<p></p>");
            container = videoLike.p();
        }
        // 设置容器样式数据，用于折叠内容时使用
        container.a(_data_cntr_, _video_);
        JQ_addClass(container, _v_cap_cntr_);

        // 先根据题注语法生成题注
        Caption_genForMediaContent(videoLike, _video_
            + (tagName === _iframe_ ? _iframe_ : _));

        // 不处理常规视频以外的标签（如内嵌的 iframe）
        if (tagName !== _img_)
            return;

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.on(_emptied_, () => {
            let targetToJump = video.p(),
                title = targetToJump.a(_data_title_);
            if (title === gUndefined)
                title = targetToJump.a(_src_);

            // 将无法加载的音频信息添加到链接检查器
            LinkTool_addToCheckResult(_error_ + __address_, targetToJump,
                V_ui_label(_, _, V_lang_text63()) + title);
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
            "Not support video " + _tag_
            ][V_lang];

        // 对 video 标签的属性进行支持
        let autoplay = V_getUrlQueryParams(src)[_autoplay_],
            loop = V_getUrlQueryParams(src)[_loop_],
            preload = V_getUrlQueryParams(src)[_preload_],
            width = V_getUrlQueryParams(src)[_width_],
            height = V_getUrlQueryParams(src)[_height_];

        // 将 URL 为音频资源的 img 标签转换为 video
        videoLike.wrap(V_ui_video(V_attr(_src_, src), tips));
        let video = videoLike.p();
        // 移除图片 img 标签
        videoLike.rm();

        // 设置 video 为标准控件
        video.a(_controls_, _controls_);

        // 设置 video 属性
        autoplay !== gUndefined
            && video.a(_autoplay_, _autoplay_);
        loop !== gUndefined
            && video.a(_loop_, _loop_);
        preload !== gUndefined
            && video.a(_preload_, _auto_);
        width !== gUndefined
            && video.a(_width_, width);
        height !== gUndefined
            && video.a(_height_, height);

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
    V_length(T, 1);
    // 文本输入框属性
    T.ui = gUndefined;
    T.icon = gUndefined;
    T.in = gUndefined;
    T.rst = gUndefined;
    T.act = gUndefined;

    T.lastV = _;
    T.chgTmr = gNull;

    T.inputing = gFalse;
    T.compSts = gUndefined;

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
        let ui = V_ui_div(_, _v_text_field_ +___+ id,
                    V_ui_div(_, _v_text_field_ + __icon_)
                    + V_ui_input(_, _, _text_)
                    + V_ui_div(_, _v_text_field_ + __action_)
                    + V_ui_div(_, _v_text_field_reset_, V_ui_svgIcon(_icoResetInput_, 16, 16, _alpha_))
                );
        if (append) {
            target.ap(ui);
            T.ui = target.ch("." + _v_text_field_ + "." + id);
        }
        else {
            target.af(ui);
            T.ui = target.p().ch("." + _v_text_field_ + "." + id);
        }

        // 获得实例的各关键对象
        T.in = T.ui.ch(_input_);
        T.rst = T.ui.ch("." + _v_text_field_reset_);

        /**
         * 绑定开始中文输入事件
         */
        T.in.on(_composition_ + _start_, () => {
            T.compSts = _start_;
        });
        /**
         * 绑定结束中文输入事件
         */
        T.in.on(_composition_ + _end_, () => {
            T.compSts = _end_;
        });

        /**
         * 绑定文本获得焦点事件
         */
        T.in.focus(() => {
            T.inputing = gTrue; // 标记为输入中的状态

            JQ_addClass(T.ui, _v_text_field_focus_);
            __checkValueChanged();

            // 针对输入中文的情况，若输入了新的内容则进行查询
            function __checkValueChanged() {
                // 针对输入中文的情况，以及若输入了新的内容再进行查询
                if (T.compSts !== gUndefined && T.compSts !== _start_ && T.lastV !== T.in.v()) {
                    T.chgTmr = V_clearTimer(T.chgTmr);
                    T.lastV = T.in.v();
                    T.processInput();
                }
                // 非中文输入的情况，以及若输入了新的内容再进行查询
                else if (T.compSts === gUndefined && T.lastV !== T.in.v()) {
                    T.lastV = T.in.v();
                    T.processInput();
                }

                // 流控处理，以固定时间间隔处理输入内容
                T.chgTmr = V_later(__checkValueChanged, 500);
            }
            // 触发外部重定义事件
            typeof(T.onFocus) === _function_ && T.onFocus();
        });

        /**
         * 绑定文本失去焦点事件
         */
        T.in.blur(() => {
            T.inputing = gFalse; // 标记为非输入中的状态

            JQ_removeClass(T.ui, _v_text_field_focus_);

            T.chgTmr = V_clearTimer(T.chgTmr);

            // 触发外部重定义事件
            typeof(T.onBlur) === _function_ && T.onBlur();
        });

        /**
         * 绑定键盘按下事件
         */
        T.in.on(_keydown_, (event) => {
            let key = event.key,//event.keyCode || event.which || event.charCode,
                value = T.in.v(),
                combKeys = V_ui_getCombKeys(event);

            let handled = gFalse;
            if (V_noCombKeys(combKeys)) {
                switch (key) {
                    case _Enter_:
                        T.act !== gUndefined
                            && T.act.tr(_click_);
                        handled = gTrue;
                        typeof(T.pressEnter) === _function_ && T.pressEnter(value);
                        break;
                    case _Escape_:
                        // 无内容时则取消取点，退出编辑，键盘事件则由导航中心的键盘事件进行响应
                        V_isLength0(value)
                            ? T.in.blur()
                            // 有内容则清空内容等待重新输入
                            : T.rst.tr(_click_);
                        handled = gTrue;
                        typeof(T.pressESC) === _function_ && T.pressESC();
                        break;
                }
            }

            // 如果事件已处理，则禁止双重操作
            handled && V_preventDefault(event);

            // 触发外部重定义事件
            typeof(T.onKeyDown) === _function_ && T.onKeyDown(value, key);
        });

        /**
         * 绑定重置输入内容按钮
         */
        T.rst.uC().ck(() => {
            T.processInput(_);
            // 清空后保持输入焦点
            JQ_removeClass(T.rst, _enabled_);

            if (T.act !== gUndefined && T.act.a(_class_).i(_enabled_) !== -1) {
                JQ_removeClass(T.act, _enabled_);
                // V_ui_unbindHover(T.act);
            }
        });
    }

    /**
     * 处理文本框输入的内容
     * @param value 如不指定则使用文本框的值，如指定值则用指定值作为输入并作为文本框中的值
     */
    T.processInput = function (value) {
        if (value === gUndefined)
            value = T.in.v().x();
        else {
            value = value.x();
            T.in.v(value);
        }

        if (value === _) {
            JQ_removeClass(T.rst, _enabled_);

            // 无内容时移除样式
            if (T.act !== gUndefined && T.act.a(_class_).i(_enabled_) !== -1) {
                JQ_removeClass(T.act, _enabled_);
                // V_ui_unbindHover(T.act);
            }
        }
        else {
            JQ_addClass(T.rst, _enabled_);

            // 有内容时移除样式
            if (T.act !== gUndefined && T.act.a(_class_).i(_enabled_) === -1) {
                JQ_addClass(T.act, _enabled_);
                // T.act.on(_mouseEnter_, () => {
                //     T.actHover(gTrue);
                // }).on(_mouseLeave_, () => {
                //     T.actHover(gFalse);
                // });
            }
        }
        // 触发外部重定义事件
        typeof(T.onInput) === _function_ && T.onInput(value);
    }

    /**
     * 清空输入框内容
     */
    T.clear = function() {
        T.rst.tr(_click_);
    }

    /**
     * 开启输入框前图标
     * @param icon 图标
     */
    T.setIcon = function (icon) {
        T.icon = T.ui.ch("." + _v_text_field_ + __icon_);
        T.icon.hm(icon);
        T.icon.c(_visibility_, _visible_);
    }

    /**
     * 开启动作按钮
     * @param icon 按钮图标
     */
    T.setAction = function (icon) {
        T.act = T.ui.ch("." + _v_text_field_ + __action_);
        T.act.hm(icon);
        T.act.show();

        // T.act.on(_mouseEnter_, () => {
        //     T.actHover(gTrue);
        // }).on(_mouseLeave_, () => {
        //     T.actHover(gFalse);
        // });
        T.act.uC().ck(() => {
            let value = T.in.v();
            // 输入内容不为空
            V_length(value) > 0
                && T.in.select();

            // 触发外部重定义事件
            typeof(T.onAction) === _function_ && T.onAction(value);
        });
    }

    /**
     * 动作按钮鼠标 hover 处理
     * @param enter true: 鼠标光标进入，false: 鼠标光标离开
     */
    // T.actHover = function (enter) {
    //     if (enter) {
    //         JQ_addClass(T.act, _hover_);
    //         T.act.a(_class_).i(_enabled_) !== -1
    //             && JQ_addClass(T.ui, _hover_action_);
    //     }
    //     else {
    //         JQ_removeClass(T.act, _hover_);
    //         JQ_removeClass(T.ui, _hover_action_);
    //     }
    // }

    /**
     * 设置提示文本
     * @param text 提示文本
     */
    T.tips = function (text) {
        T.in.a(_placeholder_, text);
    }

    /**
     * 显示文本输入框
     */
    T.show = function() {
        T.ui.show();
    }

    /**
     * 隐藏文本输入框
     */
    T.hide = function() {
        T.ui.hide();
    }

    // 生成控件
    T.__appendTo(target, id, append);
}

// ==================== 过滤结果导航器类 ==================== //

function FilterResultNavigator(result) {
    let T = this;
    V_length(T, 1);
    T.idx = 0;
    T.rs = result;

    T.nextItem = function() {
        if (V_ui_isHidden(T.rs))
            return;

        let set = T.rs.ch(":" + _visible_),
            item = set.eq(T.idx);
        T.idx++;
        if (T.idx >= V_length(set))
            T.idx = 0;
        return item;
    }

    T.rst = function() {
        T.idx = 0;
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
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _toc_), // 入口
        body : V_byID(_vlook_toc_),// V_byClass(_v_toc_body_), // 目录索引内容容器
        rs : V_byClass(_v_index_filter_result_ + "." + _toc_) // 过滤结果面板
    }

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.h = []; // 目录集
    T.h.push(!V_ui_hasCover()
        ? _vk_id_doc_title_ // 针对无封面的情况
        : _vk_id_doc_cover_); // 针对有封面的情况

    T.hIdx = 0; // 当前章节在目录集中的索引
    T.hItem = gUndefined; // 当前章节对象

    T.fdSet = []; // 非叶子章节集
    T.lastFd = gUndefined; // 上一个非叶子章节
    T.lastLv = 0; // 上一个章节的层级

    T.lastTop = 0; // 记录最后一次文档滚动位置

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 当前章节变化事件
    T.onChapterChanged = gUndefined;

    // 更新无目录情况下的提示信息
    T.ui.body.a(_data_toc_empty_, "( " + V_lang_text35() + V_lang_text66() + " )\n\n"
        + V_lang_text(46, [
            "在第一个一级标题前添加 [TOC] 以生成目录",
            "Add [TOC] before the first first-level heading to generate it"
        ]));

    /**
     * 返回 Toc 组件类型名称
     */
    T.tNm = function() {
        return _toc_;
    }

    /**
     * 返回 Toc 组件类型描述
     */
    T.desc = function() {
        return V_lang_text35();
    }

    /**
     * 是否有目录索引项目
     */
    T.hasItem = function() {
        return (V_length(T.ui.body.ch()) > 0);
    }

    /**
     * 根据设备类型自适应hover样式
     */
    // T.adjustHoverStyle = function() {
    //     V_isMobile() // 移动设备时解绑样式事件
    //         ? $(_v_toc_folder_).uH()
    //         : V_ui_bindHover($(_v_toc_folder_)); // 非移动设备时绑定样式事件
    // }

    /**
     * 添加目录节点
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    T.add = function (item) {
        T.hdr.segs.sts(this.tNm(), gTrue);

        // 将章节记录到目录集中
        let a = item.ch("a"),
            href = a.a(_href_);

        // 只处理主题指定不被隐藏的标题 / 大纲范围
        HeaderAutoNum_parseTocHeaderLevel(item.a(_class_)) <= gHideOutlineOver
            && T.h.push(LinkTool_transSpecHash(href.ss(1, V_length(href))));

        // 自定义目录节点元数据
        item.a(_id_, _vk_header_ + item.a(_data_ref_)); // 添加id属性
        item.a(_data_node_, 0); // 添加节点类型：0:叶子节点, 1:目录节点
        item.a(_data_folded_, _false_); // 添加节点状态：true:收起, false:展开
        item.a(_title_, a.t().x());

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.af(a.t());
        a.t(_);

        // V_ui_adjustHoverStyle(item);
        // 点击目录节点事件
        item.uC().ck(() => {
            // 跳转至对应的页内锚点
            let hash = V_byID(item.a(_id_)).ch("a").a(_href_);
            V_gotoHash(hash);

            // 触发锚点点击事件
            // typeof(T.hdr.onAct) === _function_ && T.hdr.onAct();
        });

        // -----------------------------------
        // 目录非叶子章节的折叠功能实现
        // 所有目录节点都添加 folding 空白控件备用
        $(V_ui_div("fd-" + _vk_header_ + item.a(_data_ref_), _v_toc_folder_.xD(), _nbsp_)).insertBefore(item.f("a"));

        // 记录所有非叶子节点的folder控件
        let lv = HeaderAutoNum_parseTocHeaderLevel(item.a(_class_));
        if (T.lastFd !== gUndefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (lv > T.lastLv) {
                // 将最近一个子目录节点折叠控件入栈
                T.fdSet.push(T.lastFd);

                // 为非叶子的章节添加折叠图标
                let folder = T.lastFd.hm(V_ui_svgIcon(_icoTocFolded_, 16, 16, _theme_, _v_rotate90_)),
                    folderParent = folder.p();
                folderParent.a(_data_node_, 1); // 0:叶子, 1:目录
                folderParent.a(_data_folded_, _false_); // true:收起， false:展开

                // 折叠控件事件
                V_ui_addAnimate(folder.ch(_svg_));
                folder.uC().ck((event) => {
                    V_stopPropagation(event); // 停止事件冒泡

                    let id = V_eventCurrentTarget(event).p().a(_id_);
                    T.disposeFold(id, (V_byID(id).a(_data_folded_).sW("t")) ? "e" : "c", gTrue);
                });
            }
            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            else if (lv < T.lastLv)
                T.fdSet.pop();

            // 设置当前节点的父级信息
            V_length(T.fdSet) > 0
                && item.a(_data_pid_, T.fdSet[V_length(T.fdSet) - 1].p().a(_id_));
        }

        // 更新最后处理的folder控件
        T.lastFd = $("#fd-" + _vk_header_ + item.a(_data_ref_));
        T.lastLv = lv;
    }

    /**
     * 页面滚动时根据页面当前的位置，高亮对应目录大纲中的章节
     */
    T.focusHeader = function (scrollTop) {
        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop === gUndefined)
            scrollTop = V_ui_getScrollTop();

        // ----------------------------------------
        // 寻找文档当前显示的章节
        // 默认为最后一章
        let curIdx = V_length(T.h) - 1;
        for (let i = 0, len = V_length(T.h); i < len; i++) {
            let anchor = JS_decodeURI(T.h[i]), // Firefox 浏览器
                target = V_byID(anchor),
                targetTop = target.oT() - V_ui_getScrollTop();

            // 匹配出当前可视空间中的「当前章节」
            if (targetTop > gScrollMarginTop) {
                curIdx = i - 1;
                break;
            }
        }

        // 章节没有变化则直接退出
        if (T.hIdx === curIdx)
            return;

        // 章节有变化，并记录
        T.hIdx = curIdx;
        T.lastTop = scrollTop;

        // 当前文档位置在实际内容章节中时
        if (T.inHeader()) {
            // ----------------------------------------
            // 更新目录内当前节点的样式
            // 更新「当前章节」的样式
            let item = V_byID(_vlook_toc_, " a" + V_attrCSS(_href_, "#" + T.h[curIdx])).p();
            V_ui_tg_currentItem(T.hItem, item, gTrue);
            T.hItem = item;

            // 若当前目录节点被折叠隐藏，则向上展开父级目录节点
            V_ui_isHidden(T.hItem)
                && __expandUpFolder(T.hItem.a(_data_pid_));

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
            if (id === gUndefined)
                return;
            // 展开
            T.disposeFold(id, "e", gTrue);
            // 若未到 h1（即第一级目录），则继续向上展开
            let item = V_byID(id),
                tagName = item.prop(_tagName_); // 注意！无法使用 V_util_getTagName ，会导致调用溢出
            tagName !== gUndefined && tagName.l() !== "h1"
                && __expandUpFolder(item.a(_data_pid_));
        }
    }

    /**
     * 目录大纲自动滚动到当前章节对应的条目位置
     */
    T.scrollToCurrent = function() {
        if (T.hItem === gUndefined || T.hItem.pos() === gUndefined)
            return;

        let itemPosTop = T.hItem.oT() - T.hItem.p().oT(),
            scrollTop = V_ui_getScrollTop(T.ui.body), // 目录内当前滚动位置
            offset = T.hItem.h() * 3;

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (itemPosTop <= offset)
            V_ui_setScrollTop(itemPosTop + scrollTop - offset, gUndefined, T.ui.body, gTrue);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (V_ui_getRect(T.hItem[0]).bottom > V_ui_getRect(T.ui.body[0]).bottom - offset)
            V_ui_setScrollTop(itemPosTop + scrollTop - T.ui.body.h() + offset * 1.5, gUndefined, T.ui.body, gTrue);
    }

    /**
     * 文档当前位置是否在章节内
     */
    T.inHeader = function() {
        return T.hIdx > 0;
    }

    /**
     * 当前章节为第 1 章时特殊处理（有封面模式时）
     */
    T.inFirstHeader = function() {
        return (V_ui_hasCover() && T.hIdx === 1);
    }

    /**
     * 当前文档位置位于文档标题（无封面模式时）
     */
    T.inDocTitle = function() {
        return (!V_ui_hasCover() && T.hIdx === 0);
    }

    /**
     * 按关键字过滤
     * @param value 过滤的关键字内容
     * @returns boolean true - 有匹配的结果，false - 无匹配的结果
     */
    T.filter = function (value) {
        if (V_isLength0(value))
            return gFalse;

        T.hdr.segs.checkedItemValue() === T.tNm()
            && T.showFilterResult();

        let matched = gFalse;
        T.ui.rs.em();
        // 遍历目录节点进行关键字匹配
        $(_vlookTocItem_).e((index, element) => {
            let item = $(element),
                data = item.a(_data_header_num_) + item.a(_title_),
                multiMatch = gTrue;

            // 进行多关键字的 and 匹配
            for (let i = 0; i < V_length(value); i++) {
                if (data.l().i(value[i]) === -1) {
                    multiMatch = gFalse;
                    break;
                }
            }

            if (multiMatch) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();

                V_ui_addAnimate(cloneItem);
                JQ_addClass(cloneItem, _v_toc_item_);
                JQ_removeClass(cloneItem, _md_toc_item_ +___+ _md_toc__ + "h1 " + _md_toc__ + "h2 " + _md_toc__ + "h3 " + _md_toc__ + "h4 " + _md_toc__ + "h5");
                cloneItem.ch(_v_toc_folder_).rm();
                cloneItem.pp(V_ui_span(_, _, cloneItem.a(_data_header_num_)));
                cloneItem.show();
                cloneItem.a(_data_keyword_match_, _true_);

                // V_ui_adjustHoverStyle(cloneItem);

                // 绑定同源的点击事件
                cloneItem.uC().ck((event) => {
                    V_ui_tg_currentItem(T.ui.rs, V_eventCurrentTarget(event));
                    item.tr(_click_);
                });

                // 将匹配的节点添加到过滤结果中
                T.ui.rs.ap(cloneItem);
                Index_segments.sts(T.tNm(), gTrue);
                matched = gTrue;
            }
        });

        // 对文库节点进行匹配
        T.ui.body.f("." + _v_doc_lib_item_).e((index, element) => {
            let item = $(element),
                data = item.t() + item.a(_data_keywords_);
            if (data.l().i(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                cloneItem.show();
                cloneItem.a(_data_keyword_match_, _true_);

                // 绑定同源的相关事件
                cloneItem.uC().ck(() => {
                    item.tr(_click_);
                });
                ToolTips_bind(cloneItem);
                // V_ui_bindHover(cloneItem);

                // 将匹配的节点添加到过滤结果中
                T.ui.rs.ap(cloneItem);
                matched = gTrue;
            }
        });

        // 匹配结果为空
        if (!matched) {
            T.ui.rs.em();
            V_ui_set_dataNoMore(T.ui.rs, []);
            Index_segments.sts(T.tNm(), gFalse);
        }
        else
            V_ui_set_dataNoMore(T.ui.rs, [_]);

        return matched;
    }

    /**
     * 更新所属分段状态
     */
    T.upd = function() {
        V_length($(_vlookTocItem_)) > 0
            ? T.hdr.segs.sts(this.tNm(), gTrue)
            : T.hdr.segs.sts(this.tNm(), gFalse);
    }

    /**
     * 显示目录索引组件
     */
    T.show = function() {
        if (V_length(T.hdr.kw.in.v()) > 0) {
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
    T.hide = function() {
        T.ui.body.hide();
        T.hideFilterResult();
    }
    hidden
        && T.hide();

    /**
     * 显示过滤结果
     */
    T.showFilterResult = function() {
        T.ui.body.hide();
        T.ui.rs.show();
    }

    /**
     * 隐藏过滤结果
     */
    T.hideFilterResult = function() {
        T.ui.rs.hide();
    }

    /**
     * 跳转至指定章节
     */
    T.gotoHeader = function (target) {
        V_gotoHash("#" + target.a(_data_hash_));
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
            itemSet = item.nA("." + _md_toc_item_),
            btnFolder = $("#fd-" + id);

        // 更新折叠控件图标
        if (action === "e") {
            item.a(_data_folded_, _false_);
            JQ_addClass(btnFolder.ch(_svg_), _v_rotate90_);
        }
        else {
            item.a(_data_folded_, _true_);
            JQ_removeClass(btnFolder.ch(_svg_), _v_rotate90_);
        }

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = V_length(itemSet); i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem !== gNull) {
                const hd1 = HeaderAutoNum_parseTocHeaderLevel(item.a(_class_));
                const hd2 = HeaderAutoNum_parseTocHeaderLevel(lastItem.a(_class_));
                if (hd1 > hd2) // 当前节点层级大于上一个节点的层级，继续
                    continue;
                else if (hd1 < hd2) // 当前节点层级小于上一个节点的层级，终止
                    break;
            }

            // 如果是目录节点，同时是已展开，且执行动作为「收起」，才进行递归调用展开子节点
            if (traversal
                && item.a(_data_node_) === "1"
                && item.a(_data_folded_).sW("f")
                && action === "c") {
                    item.a(_data_folded_, _true_);
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
    V_ui_addAnimate(ui.entry);

    // 生成提示信息 UI
    V_ui_set_dataNoMore(ui.rs, []);
}

/**
 * 无输入关键字的处理
 * @param indexObj 目标对象
 */
function Index_noneKeyword(indexObj) {
    let ui = indexObj.ui,
        items = ui.rs.ch("." + _v_toc_item_);
    items.show();
    if (V_length(items) > 0) {
        items.a(_data_keyword_match_, _true_);
        Index_updateStatus(indexObj);
    }
    V_ui_set_dataNoMore(ui.rs, items);
}

/**
 * 更新所属分段状态
 * @param indexObj 目标对象
 */
function Index_updateStatus(indexObj) {
    Index_segments.sts(indexObj.tNm(),
        V_length(indexObj.ui.rs.ch("." + _v_toc_item_ + V_attrCSS(_data_keyword_match_))) > 0);
}

/**
 * 添加索引项目
 * @param indexObj 目标对象
 * @param text 显示的文本
 * @param anchor 锚点
 * @param forSearch 用于搜索时检索的内容
 */
function Index_add(indexObj, text, anchor, forSearch) {
    Index_segments.sts(indexObj.tNm(), gTrue);

    let ui = indexObj.ui;
    V_ui_set_dataNoMore(ui.rs, [_]);

    let item = $(V_ui_span(_v_toc_item_,
                    V_attr(_data_keywords_, V_clearHtmlQuot((forSearch === gUndefined || V_length(forSearch.x()) === 0) ? _ : forSearch)),
                    text));
    ui.rs.ap(item);
    V_ui_addAnimate(item);
    item.uC().ck(() => {
        V_ui_tg_currentItem(ui.rs, item);

        V_gotoHash("#" + anchor);

        // 触发锚点点击事件
        // typeof(indexObj.hdr.onAct) === _function_ && indexObj.hdr.onAct();
    });
}

/**
 * 按关键字过滤
 * @param indexObj 目标对象
 * @param value 过滤的关键字内容
 * @returns boolean true - 有匹配的结果，false - 无匹配的结果
 */
function Index_filter(indexObj, value) {
    if (V_isLength0(value)) {
        Index_segments.sts(indexObj.tNm(), gFalse);
        return gFalse;
    }

    // 清空索引列表项
    let ui = indexObj.ui;
    ui.rs.ch().hide();

    JQ_removeAttr(ui.rs.ch(), _data_keyword_match_);
    JQ_removeAttr(ui.rs, _data_no_more_);

    V_ui_tg_resetCurrentItem(ui.rs);

    // 遍历目录节点进行关键字匹配
    let matched = gFalse;
    ui.rs.ch("." + _v_toc_item_).e((index, element) => {
        let item = $(element),
            dataForSearch = item.a(_data_keywords_),
            multiMatch = gTrue;
        // 进行多关键字的 and 匹配
        for (let i = 0; i < V_length(value); i++) {
            if (item.t().l().i(value[i]) === -1
                && (dataForSearch !== gUndefined && dataForSearch.l().i(value[i]) === -1)) {
                multiMatch = gFalse;
                break;
            }
        }
        if (multiMatch) {
                item.show();
                item.a(_data_keyword_match_, _true_);
                Index_segments.sts(indexObj.tNm(), gTrue);
                matched = gTrue;
        }
    });

    // 匹配结果为空
    if (!matched) {
        V_ui_set_dataNoMore(ui.rs, []);
        Index_segments.sts(indexObj.tNm(), gFalse);
    }
    else {
        V_ui_set_dataNoMore(ui.rs, [_]);
    }

    return matched;
}

/**
 * 是否有对应的索引项目
 * @param indexObj 目标对象
 */
function Index_hasIndexItem(indexObj) {
    return (V_length(indexObj.ui.rs.ch(_span_)) > 0);
}

/**
 * 显示索引组件
 * @param indexObj 目标对象
 */
function Index_show(indexObj) {
    indexObj.ui.rs.show();
}

/**
 * 隐藏索引组件
 * @param indexObj 目标对象
 */
function Index_hide(indexObj) {
    indexObj.ui.rs.hide();
}

// ==================== 导航中心【插图】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function FiguresIndex(holder, hidden) {
    let T = this;
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _figure_), // 入口
        rs : V_byClass(_v_index_filter_result_ + "." + _figure_) // 过滤结果面板
    };

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Figure 组件类型名称
     */
    T.tNm = function() {
        return _figure_;
    }

    /**
     * 返回 Figure 组件类型描述
     */
    T.desc = function() {
        return V_lang_text58() + " / " + V_lang_text68();
    }

    /**
     * 是否有图片索引项目
     */
    T.hasItem = function() {
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
    T.upd = function() {
        Index_updateStatus(this);
    }

    /**
     * 显示插图组件
     */
    T.show = function() {
        Index_show(this);
    }

    /**
     * 隐藏插图组件
     */
    T.hide = function() {
        Index_hide(this);
    }
    hidden
        && T.hide();
}

// ==================== 导航中心【表格】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TablesIndex(holder, hidden) {
    let T = this;
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _table_), // 入口
        rs : V_byClass(_v_index_filter_result_ + "." + _table_) // 过滤结果面板
    };

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Table 组件类型名称
     */
    T.tNm = function() {
        return _table_;
    }

    /**
     * 返回 Table 组件类型描述
     */
    T.desc = function() {
        return V_lang_text56();
    }

    /**
     * 是否有表格索引项目
     */
    T.hasItem = function() {
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
    T.upd = function() {
        Index_updateStatus(this);
    }

    /**
     * 显示表格组件
     */
    T.show = function() {
        Index_show(this);
    }

    /**
     * 隐藏表格组件
     */
    T.hide = function() {
        Index_hide(this);
    }
    hidden
        && T.hide();
}

// ==================== 导航中心【多媒体】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function MediaIndex(holder, hidden) {
    let T = this;
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _media_), // 入口
        rs : V_byClass(_v_index_filter_result_ + "." + _media_) // 过滤结果面板
    };

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Media 组件类型名称
     */
    T.tNm = function() {
        return _media_;
    }

    /**
     * 返回 Media 组件类型描述
     */
    T.desc = function() {
        return V_lang_text59() + " / " + V_lang_text60();
    }

    /**
     * 是否有多媒体索引项目
     */
    T.hasItem = function() {
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
    T.upd = function() {
        Index_updateStatus(this);
    }

    /**
     * 显示多媒体组件
     */
    T.show = function() {
        Index_show(this);
    }

    /**
     * 隐藏多媒体组件
     */
    T.hide = function() {
        Index_hide(this);
    }
    hidden
        && T.hide();
}

// ==================== 导航中心【代码块】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function CodeblocksIndex(holder, hidden) {
    let T = this;
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _codeblock_), // 入口
        rs : V_byClass(_v_index_filter_result_ + "." + _codeblock_) // 过滤结果面板
    };

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Codeblock 组件类型名称
     */
    T.tNm = function() {
        return _codeblock_;
    }

    /**
     * 返回 Codeblock 组件类型描述
     */
    T.desc = function() {
        return V_lang_text57();
    }

    /**
     * 是否有代码块索引项目
     */
    T.hasItem = function() {
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
    T.upd = function() {
        Index_updateStatus(this);
    }

    /**
     * 显示代码块组件
     */
    T.show = function() {
        Index_show(this);
    }

    /**
     * 隐藏代码块组件
     */
    T.hide = function() {
        Index_hide(this);
    }
    hidden
        && T.hide();
}

// ==================== 导航中心【公式】组件类 ==================== //

/**
 * 构造函数
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function FormulasIndex(holder, hidden) {
    let T = this;
    V_length(T, 1);
    T.ui = {
        entry : V_byClass(_v_segment_btn_ + "." + _formula_), // 入口
        rs : V_byClass(_v_index_filter_result_ + "." + _formula_) // 过滤结果面板
    };

    // 滚动事件处理
    V_ui_bindScrollWithMoreContent(T.ui.rs);
    // 容器高度变化的处理
    V_ui_bindObserveHeightChange(T.ui.rs);

    T.hdr = holder;

    T.nav = new FilterResultNavigator(T.ui.rs); // 过滤结果导航器

    // 关键字输入组件属性设置
    Index_initUI(this);

    /**
     * 返回 Formula 组件类型名称
     */
    T.tNm = function() {
        return _formula_;
    }

    /**
     * 返回 Formula 组件类型描述
     */
    T.desc = function() {
        return V_lang_text18();
    }

    /**
     * 是否有公式索引项目
     */
    T.hasItem = function() {
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
    T.upd = function() {
        Index_updateStatus(this);
    }

    /**
     * 显示公式组件
     */
    T.show = function() {
        Index_show(this);
    }

    /**
     * 隐藏公式组件
     */
    T.hide = function() {
        Index_hide(this);
    }
    hidden
        && T.hide();
}

// ==================== 导航历史的组件类 ==================== //

/**
 * 构造函数
 */
function HistoryList() {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_link_info_list_ + __items_);

    /**
     * 添加导航历史记录
     * @param hash 页内锚点链接
     */
    T.add = function (hash) {
        if (hash === gUndefined || hash === "#" || V_length(hash.x()) === 0)
            return;

        // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
        let content = gUndefined,
            anchor = hash.ss(1, V_length(hash)),
            type = _,
            lastPos = -1;
        // 插图/表格/多媒体/代码块索引
        if (anchor.sW(_vk_id_))
            content = $(hash).a(_data_title_);
        // 错误的内链 vk-error...
        else if (anchor.sW(_vk__ + _error_ + __hash_)) {
            content = V_ui_label(_, _, V_lang_text54()) + $(hash).t() + " (" + $(hash).a(_href_) + ")";
            type = ___+ _error_ + __hash_;
        }
        else if (anchor.sW(_vk__ + _error_ + __address_)) {
            let cap = $(hash).ch(__v_cap1_);
            content = V_ui_label(_, _, V_lang_text63())
                + V_ui_span(_, _, cap.ch(_span_).t()) // 题注的内容
                + cap.clone().ch().rm().end().t(); // 纯文本元素的内容
            type = ___+ _error_ + __address_;
        }
        // 重复的标题 vk-warning...
        else if (anchor.sW(_vk__ + "wa")) {
            content = V_ui_label(_, _, V_lang_text53()) + $(hash).t();
            type = ___+ _warning_;
        }
        // 全部脚注
        else if (anchor.sW(_vk_footer_area_))
            content = $(hash).t();
        // 继续上次阅读（最后浏览位置）
        else if (!hash.sW("#")) {
            lastPos = hash;
            content = V_lang_text78();
        }

        let valueForDataHistory = (lastPos === -1 ?  hash : _last_position_);

        // 未匹配到以上 VLOOK 专属的索引锚点，则按目录索引进行处理
        if (content === gUndefined) {
            let hashObj = $(_vlookTocItem_ + ">." + _md_toc__ + _inner_ + V_attrCSS(_href_, JS_decodeURI(hash))).p(),
                span = hashObj.a(_data_header_num_);
            content = V_ui_span(_, _, "§ " + (V_length(span) > 0 ? span : V_lang_text35())) + JS_decodeURI(anchor);
        }
        let result = T.ui.ch(_span_ + V_attrCSS(_data_history_, valueForDataHistory));

        // 不存在相同的历史访问记录
        if (V_isLength0(result)) {
            let needHide = LinkTool_panelList.a(_data_content_type_) === _history_ ? _ :  ___+ V_attr(_style_, _display_ + ":" + _none_),
                newItem = V_ui_span(_v_toc_item_ + type, V_attr(_data_history_, valueForDataHistory) + needHide, content);
            lastPos === -1 // 普通锚点
                ? T.ui.pp(newItem)
                : T.ui.ap(newItem); // 继续上次阅读
        }

        // 为新增加 / 移动后的记录添加鼠标事件
        let item = T.ui.ch(_span_ + V_attrCSS(_data_history_, valueForDataHistory));
        item.a(_data_keyword_match_, _true_);

        // 更新面板条目提示信息
        LinkTool_updateDataNoMore([_]);

        // !V_isMobile()
        //     && V_ui_bindHover(item);

        item.uC().ck(() => {
            V_ui_tg_currentItem(T.ui, item);

            LinkTool_hide();
            lastPos === -1
                ? V_gotoHash(hash)
                : V_ui_setScrollTop(ResumeReading_lastPosition, gUndefined, gUndefined, gTrue);
        });
    }
}

// ==================== 导航中心 DocLib 文库类 ==================== //

/**
 * 构造函数
 * @param mask 遮罩对象
 * @param holder 关联的上级容器
 */
function DocLib(mask, holder) {
    let T = this;
    V_length(T, 1);
    T.ui = V_byClass(_v_doc_lib_);
    T.toc = gUndefined;
    T.idx = -1;
    T.title = _;
    T.fstToc = gUndefined;
    T.iframe = gUndefined;
    T.off = gFalse;
    T.on = gFalse;
    T.page = gUndefined;
    T.hash = _;
    T.counter = 0;
    T.paths = [];
    T.hdr = holder;

    // 遮罩
    T.mask = mask;
    T.mask.bindPartner(this, T.ui);

    T.init = function() {
        if (V_getParamVal(_vdl_) === _off_)
            T.off = gTrue;

        // ------------------------------
        // 处理文档内的文库专用链接
        let re_TargetVDL = new RegExp("[?&]" + _target_ + "=" + _vdl_, "i");
        $("a" + V_attrCSS(_href_, _docLibIdentifier_, "*")).e((index, element) => {
            let a = $(element),
                href = a.a(_href_),
                page = V_getUrlWithoutHash(href).r(re_TargetVDL, _),
                hash = V_getUrlHash(href);

            JQ_removeAttr(a, _href_); // 移除 href

            if (!T.off) {
                a.a(_target_, _vdl_);
                a.uC().ck(() => {
                    T.show(page, hash);
                });
            }
        });

        if (T.off) // 指定关闭文库则不再进行后续处理
            return;

        // ==============================

        let docLibValue = V_getMetaByName(_vlook_doc_lib_),
            result = gNull,
            curPage = V_getUrlWithoutQueryAndHash(WINDOW_getHref());

        T.iframe = $(_iframe_ + V_attrCSS(_name_, _vlook_doc_lib_));

        T.toc = gVlookToc;

        // ------------------------------
        // 处理 YAML 中的文库配置，支持以逗号分隔的多段内容
        if (docLibValue !== gUndefined) {
            let docLibList = docLibValue.sp(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/),
                item = _,
                page = _,
                hash = _,
                text = _,
                title = _;

            // 获取目录大纲中的第 1 个条目
            T.fstToc = T.toc.ch("." + _md_toc_item_ + __first_);

            // 预处理：记录当前页面在文库清单中的位置
            for (let i = 0; i < V_length(docLibList); i++) {
                item = docLibList[i].x();
                result = item.m(/^(\[([^\]]+)]\(([^)\s]+)(\s+"([^"]+)")?\))$/);
                page = (result === gNull
                    ? page = item
                    : V_getUrlWithoutHash(result[3]));
                if (T.idx < 0 && curPage === new URL(V_getUrlWithoutQueryAndHash(page), WINDOW_getHref()).href) {
                    T.idx = i;
                    T.title = result[2];
                    break;
                }
            }

            // 正式处理
            for (let i = 0; i < V_length(docLibList); i++) {
                item = docLibList[i].x();
                result = item.m(/^(\[([^\]]+)]\(([^)\s]+)(\s+"([^"]+)")?\))$/);
                // 按 [text](url "title") 格式配置的文库
                if (result !== gNull) {
                    page = V_getUrlWithoutHash(result[3]);
                    hash = V_getUrlHash(result[3]);
                    text = result[2].x();
                    title = (V_length(result) > 5) ? result[5] : _;
                    if (V_isLength0(text) && V_length(title) > 0)
                        text = title;
                }
                // 按默认只有 url 方式配置的文库
                else {
                    page = V_getUrlWithoutHash(item);
                    hash = V_getUrlHash(item);
                    text = V_lang_text7();
                    title = _;
                }

                // 与当面不重复的文库链接才进行处理
                if (curPage !== new URL(V_getUrlWithoutQueryAndHash(page), WINDOW_getHref()).href) {
                    hash = "#" + LinkTool_transSpecHash(hash);
                    __addDocLibItem(i, text, page, hash, title);
                    // 添加到链接地图
                    LinkTool_addToMap(text, page, hash.ss(1, V_length(hash)).l());
                }
            }

            // --------------------
            // 给目录大纲添加对应当前文档的标题
            if (V_length(T.fstToc) > 0 && T.idx > -1) {
                T.fstToc.before(V_ui_divExt(_, _v_toc_title_ +___+ _current_, V_attr(_data_title_, V_lang_text(6, [
                        "当前文档",
                        "Current " + _Document_
                    ])), T.title));
                T.toc.ch(".md-toc-item:last").af(V_ui_div(_, _v_toc_title_, _));
            }
        }

        // --------------------
        // 添加动画效果
        V_ui_addAnimate($("#" + _vlook_toc_ + ">:is(." + _v_doc_lib_item_
            + ",." + _v_doc_lib_item_ + ">svg)"));

        // to-do: 首次加载时，避免设置为第 1 个文库链接后，触发浏览器的预加载
        // T.reload();

        /**
         * 添加文库项
         * @param index
         * @param text 文库名称
         * @param page 文库页面路径
         * @param hash 文库页面锚点
         * @param title 文库用于被关键字检索的内容
         */
        function __addDocLibItem(index, text, page, hash, title) {
            // 无锚点的情况
            if (hash === "#")
                hash = _;
            // 过滤重复的文库链接
            if (T.paths.includes(page + hash))
                return;
            T.paths.push(page + hash);

            T.on = gTrue;

            // 初始化第一个文库项
            T.counter++;
            if (T.counter === 1) {
                T.page = page;
                T.hash = hash;
            }

            // 添加文库项
            let target = V_getUrlQueryParams(page)[_target_],
                hasTarget = (target !== gUndefined && V_length(target) > 0),
                isSelf = (target === "_self"),
                id = _v_doc_lib_item_ + " id-" + T.counter,
                extLink = (page.i("://") > -1),
                innerIcon = (isSelf
                    ? V_ui_svgIcon(_icoDocLibSelf_, 20, 20, _alpha_) // 图标：在当前页面内打开站内链接
                    : V_ui_svgIcon(_icoDocLibBm_, 20, 18, _alpha_)), // 图标：在新标签打开站内链接
                icon = (hasTarget
                        ? (!extLink
                            ? innerIcon // 站内链接的图标
                            : V_ui_svgIcon(_icoDocLibExt_, 20, 20, _alpha_)) // 图标：在新标签中打开外部链接
                        : V_ui_svgIcon(_icoDocLib_, 20, 18, _alpha_)), // 图标：在文库窗口中打开
                content = V_ui_span(_, _, icon) + V_ui_div(_,_, text);

            // 在当前页面内打开的文库项，与目录大纲排序上进行融合
            if (isSelf || !hasTarget) {
                // 在目录大纲前添加
                T.idx > index && V_length(T.fstToc) > 0
                    ? $(V_ui_div(_, id, content)).insertBefore(T.fstToc)
                    // 在目录大纲后添加
                    : T.toc.ap(V_ui_div(_, id, content));
            }
            // 在新标签中打开的文库项
            else
                T.toc.ap(V_ui_div(_, id, content));

            // 初始化文库项数据
            let item = T.toc.f("." + _v_doc_lib_item_ + ".id-" + T.counter);
            item.a(_data_page_, page);
            ToolTips_bind(item, V_ui_strong(text) + (title === gUndefined ? _ : _br_ + V_ui_sub(_, _, title)));
            // 设置用于被关键字搜索的内容
            item.a(_data_keywords_, _vdl_ + _doc_lib_cn_ + (title === gUndefined ? _ : title));
            item.uC().ck(() => {
                if (hasTarget) {
                    // 去掉 target 参数内容
                    let urlParams = new URLSearchParams(new URL(page, gDocument.baseURI).search);
                    urlParams.delete(_target_);
                    // 新标签中打开
                    gWindow.open(V_getUrlWithoutQueryAndHash(page)
                        + JS_toString(urlParams) + hash, target);
                }
                else
                    T.show(page, hash);
            });

            LOG("    ├ DocLib: " + page + hash);
        }
    }

    /**
     * 添加 hash 条目
     * @param icon 图标
     * @param text 条目文本
     * @param hash 指定的 hash
     */
    T.addHashItem = function (icon, text, hash) {
        // 添加界面内容
        T.counter++;
        T.toc.ap(V_ui_div(_, _v_doc_lib_item_ + " id-" + T.counter,
            V_ui_span(_, _, icon) + V_ui_div(_,_, text)
        ));

        // 设置数据
        let item = T.toc.f("." + _v_doc_lib_item_ + ".id-" + T.counter);
        ToolTips_bind(item, V_ui_strong(text));
        item.a(_data_keywords_, _vdl_ + _doc_lib_cn_);

        // 处理点击事件
        item.uC().ck(() => {
            // 跳转至目标 hash
            WINDOW_setHref("#" + hash);
        });
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
            + "ws=" + _off_ + "&" + _page_ + _mode_ + "=" + _mini_
            + cs + "&ts=" + V_getTime()
            + hash);
    }

    /**
     * 显示文库
     * @param newPage 指定的文库路径
     * @param hash 指定的锚点
     */
    T.show = function (newPage, hash) {
        // typeof(T.hdr.onAct) === _function_ && T.hdr.onAct();

        let path = V_getUrlWithoutQueryAndHash(newPage);

        T.mask.show();
        // 使用 hide() show() 会导航无法保留上次显示的位置
        V_ui_fadeShow(T.ui);

        // 如果指定的页面为空，则使用当前页面
        if (V_isLength0(path)) {
            path = T.page;
            newPage = T.page;
        }

        // 如果指定的锚点为空，且路径与当前页面一致，则不刷新页面
        if (V_isLength0(hash)
            && path === V_getUrlWithoutQueryAndHash(T.iframe.a(_src_)))
            return;

        // 刷新文库页面显示
        path === T.page
            ? T.reload(gUndefined, gUndefined, hash)
            : T.reload(gUndefined, newPage, hash);
    }

    /**
     * 隐藏文库
     */
    T.hide = function() {
        // 使用 hide() show() 会导航无法保留上次显示的位置
        V_ui_fadeHide(T.ui);
        T.mask.hide();
    }

    /**
     * 处理热键操作
     * @param key 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     * @param event 事件对象
     */
    T.hotkey = function (key, combKeys, event) {
        if (V_ui_isHidden(T.ui))
            return;

        V_noCombKeys(combKeys) && V_isEscape(key)
            && V_ui_isShowed(T.ui)
                && (
                    T.hide(),
                    // 如果事件已处理，则禁止双重操作
                    V_preventDefault(event)
                );
    }
}

// ==================== 插图增强类 ==================== //

/**
 * 初始化插图数据
 */
function ExtFigure_init() {
    let sw = new Stopwatch();

    // ----------------------------------------
    // 对 svg 类插图（Mermaid）进行初始化处理
    sw.st();
    // to-do: 检查最新 Typora 集成的 Mermaid 是否已修复
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    V_byClass(_md_diagram_panel_ + ">svg>svg>g").e((index, element) => {
        $(element).unwrap();
    });
    sw.ed("    ├ prepare svg: ");

    // ----------------------------------------
    // 对 img 类插图（Mermaid）进行初始化处理
    sw.st();

    $(_idWrite_ + " :is(p,a,kbd,td,strong,mark,summary)>" + _img_ + ","
    + _idWrite_ + " ." + _md_diagram_panel_ + ">" + _svg_).e((index, element) => {
        let fig = $(element),
            src = V_getSrcValue(fig),
            container = fig.p(),
            tagName = V_tagName(fig),
            params = _,
            hash = _,
            isPostcard = gFalse;

        // ----------------------------------------
        // 对 img 类插图的处理
        if (src !== gUndefined) {
            // 对于 img 类插图的预处理
            params = V_getUrlQueryParams(JS_encodeURI(src));
            hash = V_getUrlHash(src);

            fig.a(_id_, _vk_id__ + _img_ + V_doc_counter_img);

            // 初始化图片对「颜色方案」的适配处理
            __initColorScheme(fig, params);

            // 初始化图片对「高清屏」的适配处理
            __initHighDPI(fig, params);

            // 初始化图片对「图文卡片」的适配处理
            __initPostcard(fig, src, hash);

            V_doc_counter_img++;

            // 跳过带指定显示版式的图片
            if (V_isNotFigure(hash, container))
                return gTrue;

            // 插图（非明信片）的处理
            isPostcard = __isPostcard(hash);
            if (!isPostcard) {
                // 初始化图片背景的适配处理
                // __initBackground(fig, hash);

                // 添加插图容器
                container = fig.p();
                // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
                if (V_tagName(container) !== "p") {
                    fig.wrap("<p></p>");
                    container = fig.p();
                }
            }
        }

        // 插图（非明信片）的处理
        if (!isPostcard) {
            // 绑定内容助手
            src !== gUndefined
                ? ContentAssistor_bind(fig, _fig_ + _suffixImg_)
                : ContentAssistor_bind(fig, _fig_ + _suffixSvg_);

            V_doc_counter_figure++;

            // 处理题注
            __disposeCaption(fig, tagName);

            // 设置容器数据，用于折叠内容时使用
            container.a(_data_cntr_, tagName);
            JQ_addClass(container, _v_cap_cntr_);
            // 折叠长插图（一行多图的情况则跳过）
            let prevFig = fig.p().p();
            if (prevFig === undefined || V_length(prevFig.ch("." + _v_caption_ + "," + _img_)) === 1)
                ContentFolder_add(fig, _figure_);

            V_length(hash) > 0 && hash.sW("#" + _blur_)
                && fig.wrap(V_ui_div(_, _v__ + _blur_, _));
        }
    }); // 结束初始化处理

    // 对 插图 和 明信片进行分类排序
    // V_util_sort(iNavCenter.figures.ui.rs, iNavCenter.figures.ui.rs.ch("." + _v_toc_item_));
    sw.ed("    ├ figure set: ");

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
        fig.a(_data_fig_num_, V_doc_counter_figure);
        JQ_addClass(fig, _v_fig_);

        // 先根据题注语法生成题注
        Caption_genForMediaContent(fig, tagName);
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
     * 初始化图片对颜色方案（Light / Dark）的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initColorScheme(img, params) {
        // 未指定 darksrc 参数，或同时指定了 fill 参数，则跳过
        if (params[_darksrc_] === gUndefined)
            return;

        // 适配 Dark Mode 的方式：反转
        if (params[_darksrc_] === _invert_  )
            img.a(_data_dark_src_, _invert_);
        // 适配 Dark Mode 的方式：替换
        else {
            img.a(_data_dark_src_, _alter_);

            let src = V_getSrcValue(img),
                path = V_getPath(src),
                queryString = V_getUrlQueryString(src);
            // 补全 URL 参数内容
            let darksrc = params[_darksrc_] + (queryString !== _ ? ("?" + queryString) : _);
            // 如果 darksrc 只含文件名，则用 src 的路径进行补全
            if (darksrc.i("/") === -1)
                darksrc = path + darksrc;

            // 初始化不同颜色方案的 src 内容
            img.a(_data_src_light_, V_getSrcValue(img));
            img.a(_data_src_dark_, darksrc);

            // 初始化不同颜色方案的 srcset 内容
            params[_srcset_] !== gUndefined
                && img.a(_data_srcset_light_, params[_srcset_]);
            params[_darksrcset_] !== gUndefined
                && img.a(_data_srcset_dark_, params[_darksrcset_]);
        }
    }

    /**
     * 初始化图片高清屏的适配处理
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let // src = img.a(_src_),
            src = V_getSrcValue(img),
            srcset = params[_srcset_],
            darksrcset = params[_darksrcset_];

        // 针对 Light Mode 对应的图片集
        if (srcset !== gUndefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.a(_data_srcset_light_, srcset);
            // 设置默认值
            img.a(_srcset_, srcset);
        }

        // 针对 Dark Mode 对应的图片集
        if (darksrcset !== gUndefined) {
            darksrcset = __transUrlSrcSet(img.a(_data_src_dark_), darksrcset);
            img.a(_data_srcset_dark_, darksrcset);
        }
    }

    /**
     * 初始化明信片处理
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
            inBlockquote = (V_length(blockquote) > 0);
        if (inBlockquote) {
            blockquote.c(_cssText_, _padding_ + ":0" + _css_important_);
            blockquote.c(_box_shadow_, _none_);
            blockquote.c(_height_, _auto_);
            JQ_removeAttr(blockquote, _data_quote_group_);
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
            if (V_tagName(cardBody) === _blockquote_) {
                altText = cardBody.hm();
                altTextForSearch = cardBody.t();
                cardBody.rm();
            }
        }

        JQ_removeAttr(img, _title_);

        // img.af(V_ui_article(_, _v_post_card_ +___+ _v_backdrop_blurs_ +___+ (dual ? _ : "hover "),
        img.af(V_ui_article(_, _v_post_card_ +___+ _v_backdrop_blurs_,
                (titleText === gUndefined ? _ : V_ui_header(_, _v_card_ + __title_, titleText))
                + (altText === gUndefined ? _ : V_ui_section(_, _v_card_ + __text_, altText))
            ));

        // 针对 card dual 模式的处理
        if (dual)
            // 完成图片加载后再进行处理
            img.on(_load_, () => {
                img.n().c(_width_, inBlockquote
                    ? _100pc_
                    : img.c(_width_));
            });
        // 针对 card 模式的处理
        else {
            // 图片 mouseenter 和 mouseleave 事件
            img.on(_mouseEnter_, (event) => {
                if (jq_Window.w() <= gMobileScreenWidth)
                    return;

                let _t = V_eventCurrentTarget(event),
                    card = _t.n();
                if (card.c(_display_) !== _none_)
                    return;

                _t.c(_filter_, _brightness_ + "(.8)");

                __setCardSize(_t, card, border, fitMax);

                // 显示
                card.c(_display_, _block_);
                card.on(_mouseLeave_, (event) => {
                    V_eventCurrentTarget(event).hide();
                    _t.c(_filter_, _none_);
                });
            }).on(_mouseLeave_, (event) => {
                if (jq_Window.w() <= gMobileScreenWidth)
                    return;

                let _t = V_eventCurrentTarget(event),
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
            titleText = V_getUrlWithoutQueryAndHash(src.ss(src.lastIndexOf('/') + 1));

        // 生成用于被检索的内容
        if (altTextForSearch === gUndefined)
            altTextForSearch = _;

        let anchor = _vk_id__ + "psc" + V_doc_counter_postcard,
            caption = V_ui_span(_, _, Caption_prefix(img, V_lang_text68(),  V_doc_counter_postcard) + Caption_spliter) + titleText,
            dataForSearch = titleText + altTextForSearch;
        img.a(_id_, anchor);
        img.a(_data_title_, caption);
        iNavCenter.figures.add(caption, anchor, dataForSearch);
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
        let w = img.oW();
        if (fitMax === gTrue) // 取父元素的宽度
            w = JS_parseInt(img.p().oW(gTrue));
        card.c(_width_, w);

        // 后根据实际宽度渲染结果，计算最终高度
        card.c(_top_, img.pos().top + img.oH() - card.oH() + (border ? 1 : 0));
    }

    /**
     * 转换图片地址中的 srcset / darksrcset 参数为符合 <img> srcset 属性的格式
     * @param src 图片地址
     * @param srcset srcset 或 darksrcset 参数的内容
     */
    function __transUrlSrcSet(src, srcset) {
        // 针对 html 与 图片同一目录的情况
        let path = V_getPath(src);

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
 */
function ExtFigure_copySrc(source) {
    Copy_action(source, ContentAssistor_lastHover.a(_src_));
 }

/**
 * 适配指定图片在 Light / Dark Mode 的适配处理
 */
function ExtFigure_adjustColorScheme() {
    let scheme = ColorScheme_scheme,
        darkMode = (scheme === _dark_);
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 先对适配方式为「反转」的处理
    $(_img_ + V_attrCSS(_data_dark_src_, _invert_) + "," + _svg_ + V_attrCSS(_data_dark_src_, _invert_)).e((index, element) => {
        let img = $(element),
            src = V_getSrcValue(img);
        if (darkMode) {
            // 如果图片没有指定替换颜色时才进行处理
            if (img.a(_data_img_fill_) === gUndefined) {
                // 设置默认的 srcset
                src !== gUndefined
                    && img.a(_srcset_, img.a(_data_srcset_light_));
                // 添加反转样式
                JQ_addClass(img, _v_img_invert_dark_);
            }
        }
        else {
            JQ_removeClass(img, _v_img_invert_dark_);
            src !== gUndefined
                && img.a(_srcset_, img.a(_data_srcset_light_));
        }
    });
    // 后对适配方式为「替换」的处理
    $(_img_ + V_attrCSS(_data_dark_src_, _alter_)).e((index, element) => {
        let img = $(element);
        JQ_removeClass(img, _v_img_invert_dark_);
        img.a(_src_, img.a(_data_src__ + scheme));
        img.a(_data_src_, img.a(_src_));
        img.a(_srcset_, img.a(_data_srcset__ + scheme));
        img.a(_data_srcset_, img.a(_srcset_));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $(_img_ + V_attrCSS(_data_img_fill_, _text_)
        + "," + _img_ + V_attrCSS(_data_img_fill_, _theme_ + 1)
        + "," + _img_ + V_attrCSS(_data_img_fill_, _theme_ + 2)
        + "," + _svg_ + V_attrCSS(_data_img_fill_, _text_)
        + "," + _svg_ + V_attrCSS(_data_img_fill_, _theme_ + 1)
        + "," + _svg_ + V_attrCSS(_data_img_fill_, _theme_ + 2)).e((index, element) => {
        let fig = $(element),
            fill = fig.a(_data_img_fill_);
        // 针对 SVG 对象，或 src 为 .svg 的 img 对象
        if (V_tagName(fig).sW("s") || V_getSrcValue(fig).i(_suffixSvg_, 1) > -1)
            ExtFigure_fillSVG(fill, fig);
        // 其他情况
        else {
            let dropShadowPrefix = "drop-shadow(12345px 0px ";
            if (fill === _text_)
                fig.c(_filter_, dropShadowPrefix + fig.p().c(_color_) + ")");
            else
                fig.c(_filter_, dropShadowPrefix + V_ui_var(___ac_ + fill + __lg_) + ")");

            if (fig.a(_data_fig_num_) !== gUndefined)
                fig.c(_background_, _none_);
        }
    });
}

/**
 * 对 *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 * @param fill 图片剪影方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
function ExtFigure_fillSVG(fill, svg) {
    // 跳过按钮内的 svg 处理
    if (V_tagName(svg.p()) === _kbd_)
        return;

    // 先取消可能会因数 darksrc=invert 的 CSS 配置影响
    svg.c(_filter_, _none_);
    // 再针对进行微调
    let svgSets = "path,rect,ellipse,polygon";
    fill === _text_
        ? svg.f(svgSets).c(_fill_, svg.p().c(_color_))
        : svg.f(svgSets).c(_fill_, V_ui_var(___ac_ + fill.l()));
}

// ==================== 插图导航模块 ==================== //

let FigureNav_ui = gUndefined, // 插图导航主界面
    FigureNav_btns = gUndefined,
    FigureNav_content = gUndefined, // 显示插图内容的控件
    FigureNav_figNum = 1; // 当前插图索引序号，对应 vk-id-fig 中的值

function FigureNav_init() {
    FigureNav_ui = V_byClass(_v_fig_nav_); // 插图导航主界面

    FigureNav_btns = {
        ui : V_byClass(_v_fig_nav_btn_), // 所有导航按钮
        prev : V_byClass(_v_fig_nav_btn_ + "." + _prev_), // 上一张插图按钮
        next : V_byClass(_v_fig_nav_btn_ + "." + _next_), // 下一张插图按钮
        close : V_byClass(_v_btn_ + __close_figure_nav_), // 关闭按钮
    };
    FigureNav_content = V_byClass(_v_fig_content_); // 显示插图内容的控件
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
// function FigureNav_adjustHoverStyle() {
//     // 移动设备时解绑样式事件
//     if (V_isMobile()) {
//         FigureNav_btns.prev.uH();
//         FigureNav_btns.next.uH();
//     }
//     // 非移动设备时绑定样式事件
//     else {
//         let transformValue = _translate_ + "Y(-2px)";
//         FigureNav_btns.ui.on(_mouseEnter_, (event) => {
//             V_eventCurrentTarget(event).c(_transform_, transformValue);
//         }).on(_mouseLeave_, (event) => {
//             V_eventCurrentTarget(event).c(_transform_, _none_);
//         });
//         // 鼠标键按下事件，模拟 :active
//         FigureNav_btns.ui.on(_mouseDown_, (index, element) => {
//             $(element).c(_transform_, _none_);
//         });
//         // 鼠标键释放事件，模拟恢复正常
//         FigureNav_btns.ui.on(_mouseUp_, (index, element) => {
//             $(element).c(_transform_, transformValue);
//         });
//     }
// }

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
        fig = $(V_attrCSS(_data_fig_num_, FigureNav_figNum));

    // 在插图导航中显示对应插图
    FigureNav_figNum = JS_parseInt(fig.a(_data_fig_num_));

    V_ui_fadeShow(FigureNav_ui);

    FigureNav_display();
    FigureNav_updateUI();
}

/**
 * 关闭插图导航
 */
function FigureNav_hide() {
    FigureNav_content.em();
    V_ui_fadeHide(FigureNav_ui);

    V_doc_scroll_unfreeze();
    V_doc_block = gFalse;
}

/**
 * 显示插图内容
 */
function FigureNav_display() {
    let fig = $(V_attrCSS(_data_fig_num_, FigureNav_figNum));
    FigureNav_content.em();
    FigureNav_content.show();

    JQ_addClass(FigureNav_content, _loading_);

    let newFig = fig.clone();
    // JQ_addClass(newFig, _v__ + "interactive");
    JQ_addClass(newFig, _v_fig_ + __action_);
    V_ui_fadeHide(newFig);

    // 针对懒加载进行适配处理
    gResObserver.observe(newFig[0]);

    // 添加鼠标移入/移出事件
    // V_ui_bindHover(newFig);

    // 添加鼠标点击事件
    newFig.uC().ck(() => {
        // 跳转到对应位置
        V_gotoHash("#" + _vk_id_fig_ + FigureNav_figNum);
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
    let pageNum = V_byClass(_v_fig_nav_ + __title_);

    pageNum.hm(V_ui_span(_v__ + _fig_ + "-" + _page_ + __num_, _, FigureNav_figNum + "/" + V_doc_counter_figure)
        +___+ V_byID(_vk_id_fig_ + FigureNav_figNum, ">" + __v_cap1_).t());

    // 根据当前插图索引更新浏览按钮有效状态
    FigureNav_btns.prev.c(_opacity_, 0);
    FigureNav_btns.next.c(_opacity_, 0);

    FigureNav_figNum > 1
        && FigureNav_btns.prev.c(_opacity_, 1);

    FigureNav_figNum < V_doc_counter_figure
        && FigureNav_btns.next.c(_opacity_, 1);
}

/**
 * 处理热键操作
 * @param key 非功能键键
 * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
 * @param event 事件对象
 */
function FigureNav_disposeHotkey(key, combKeys, event) {
    if (V_ui_isHidden(FigureNav_ui))
        return;

    let handled = gFalse;
    if (V_noCombKeys(combKeys)) {
        switch (key) {
            case _ArrowLeft_: // left
            case ',':
                FigureNav_prevFig();
                handled = gTrue;
                break;
            case _ArrowRight_: // right
            case '.':
                FigureNav_nextFig();
                handled = gTrue;
                break;
            case _Escape_: // esc
                if (FigureNav_isShowed()) {
                    FigureNav_hide();
                    handled = gTrue;
                }
                break;
        }
    }

    // 如果事件已处理，则禁止双重操作
    handled && V_preventDefault(event);
}

// ==================== Mermaid - 脑图交互类 ==================== //

function mmMindmap_init() {
    // to-do: 新特性，未完成
    let rootIndex = 0;
        //sectionGroup = _;
    $(_svg_ + V_attrCSS(_ariaRoledescription_, _mindmap_) + '>.mindmap-nodes>.mindmap-node').e((index, element) => {
        let _t = $(element);
        if (rootIndex > 0) {
            _t.uC().ck((event) => {
                mmMindmapToggleNode(V_eventCurrentTarget(event));
            });
            _t.c(_visibility_, _hidden_);
        }
        else {
            _t.uC().ck((event) => {
                mmMindmapToggleRoot(V_eventCurrentTarget(event));
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
    $(_idWrite_ +___+ _input_ + V_attrCSS(_type_, _checkbox_)).e((index, element) => {
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
        else if (_t[0].indeterminate)
            chkStatus = _un_;

        // 替换为 SVG 图标
        _t.bf(V_ui_svgIcon(_icoChkbox__ + chkStatus, 14, 14, chkStyle, _v__ + "svg-" + _input_ + "-" + _checkbox_));
        _t.rm();
    });
}

/**
 * 调整默认的 Mermaid 样式
 */
function Restyler_forMermaid() {
    // ========== ZenUML 图 ==========
    let zenSelector = "." + _md_diagram_panel_ + ">div>svg" + V_attrCSS(_ariaRoledescription_, "zenuml");
    // 调整 ZenUML 尺寸因主题原因导致强制被限制大小的情况
    $(zenSelector).e((index, element) => {
        let target = $(element);
        target.f(".zenuml.bg-skin-canvas").e((i, e) => {
            let zenuml = $(e);
            target.c(_width_, zenuml.w())
                .c(_height_, zenuml.h());
            // 同时修正题注框的宽度、高度
            target.ps("." + _v_caption_).c(_width_, _auto_)
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
    let seqSelector = "." + _md_diagram_panel_ + " svg" + V_attrCSS(_ariaRoledescription_, "sequence");
    // 修正顺序图整体的样式
    $(seqSelector).e((index, element) => {
        let target = $(element),
            viewBox = target.a(_view_box_).sp(/\s+/),
            paddingBottom = (target.c(_padding_bottom_));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.a(_view_box_,
            viewBox[0] +___+ viewBox[1] +___+ viewBox[2] +___
            + (JS_parseInt(viewBox[3]) + JS_parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        JQ_addClass(target, _v_mermaid_restyler_);
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
            JQ_addClass(actor.pr(_line_), _v_actor_ + "-front");
            text.t(prefix + tmpText.ss(1, V_length(tmpText)));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText)) {
            JQ_addClass(actor, _v_actor_key_sys_);
            JQ_addClass(actor.pr(_line_), _v_actor_key_sys_);
            JQ_addClass(actor.nA(_text_).ch(), _v_actor_key_sys_);
            text.t(prefix + tmpText.ss(2, V_length(tmpText)));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText)) {
            JQ_addClass(actor, _v_actor_ext_sys_);
            JQ_addClass(actor.nA(_text_).ch(), _v_actor_ext_sys_);
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
        let bgColor = _var_ac_og_,
            borderColor = _var_ac_og_,
            titleColor = _var_ac_og_lg_;
        // 为 alt 片断设置样式
        if (segType === _alt_) {
            bgColor = _var_ac_rd_;
            borderColor = _var_ac_rd_;
            titleColor = _var_ac_rd_lg_;
        }
        // 为 loop 片断设置样式
        else if (segType === _loop_) {
            bgColor = _var_ac_cy_;
            borderColor = _var_ac_cy_;
            titleColor = _var_ac_cy_lg_;
        }
        // 为 alt、loop、par 片断应用样式设置
        if (segType !== "opt") {
            // 背景色
            g.f("polygon.labelBox").c(_cssText_, _fill_ + ":" + bgColor + _css_important_);
            // 边框色
            g.f("line.loopLine").c(_cssText_, _stroke_ + ":" + borderColor + _css_important_);
            // 片断标题颜色
            g.f("text.loopText,text.loopText>tspan").c(_cssText_, _fill_ + ":" + titleColor + _css_important_);
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
        if (nextText !== gUndefined && nextText.a(_class_) !== gUndefined && nextText.a(_class_).i("loopText") > -1)
            nextText.a("x", rect.x + rect.width + 40);
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态机图节点
    let radius = V_getVarVal(_v_r_b_);
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
    V_length($(_idWrite_ +___+ _img_ + V_attrCSS(_style_, _zoom_, "*"))) > 0
        && ALERT(V_lang_text(64, [
            "⚠️ 警告 ⚠️\n\n您的文档中使用了 Typora 的图片缩放功能，会存在兼容问题！\n\n建议替换为 VLOOK™ 的「图片缩放」，如：\npic.jpg#400w\npic.jpg#200h",
            "⚠️ WARNING ⚠️\n\nIn your " + _document_ + ", you used Typora's image scaling feature, which may cause compatibility issues!\n\nIt is recommended to replace it with VLOOK™'s \"image scaling\" such as:\npic.jpg#400w\npic.jpg#200h"
        ]));
}

// ==================== Sup/Sub Magic 模块 ==================== //

/**
 * 初始化
 */
function SupSubMagic_preprocess() {
    // ---------- 注音新语法预处理：_^注音^_ ----------
    $("em" + V_not(__only_child_) + ">sup" + __only_child_).e((index, element) => {
        let _t = $(element),
            result = [];
        result.push(_); // 主结构，在此忽略内容
        result.push(_t.t());
        TextPhonetic_buildForSup(_t.p(), result);
    });

    // 遍历段落内的 sub 下标（针对段落或指定格式）
    $(_idWrite_ + " sub").e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntaxOld)) !== gNull)
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            text !== _t.p().t()
                && RainbowTextAndCell_build(_t, colorSet);
    });

    // ---------- 色号新语法的预处理：_~色号~_ ----------
    // 引用块、详情的颜色标识
    $(_idWrite_ + " :is(" + _blockquote_ + "," + _details_ + ")>p>em" + __only_child_ + ">sub" + __only_child_).e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        (colorSet = text.m(Color_syntax)) !== gNull
            && QuoteColoring_build(_t.p().p().p(), _t.p(), colorSet);
    });

    // 文本颜色、段落着色
    $(_idWrite_ + " em>sub" + __only_child_).e((index, element) => {
        let _t = $(element),
            text = _t.t(),
            colorSet;
        if ((colorSet = text.m(Color_syntax)) !== gNull)
            // 只处理非独占一行的情况（独占一行的由引用块进行处理）
            text !== _t.p().p().t()
                && RainbowTextAndCell_build(_t.p(), colorSet);
    });

    // 针对 GitHub Style Alert 移除内嵌的着色样式
    V_byClass(_md_alert_).e((index, element) => {
        let _t = $(element);
        // 取消内嵌的引用块着色、summary、引用块小标题样式
        _t.f(".v-q," + _summary_ + "," + _strong_ + V_attrCSS(_class_, _title_, "*")).e((index, element) => {
            JQ_removeAttr($(element), _class_);
        });
        // 根据浏览器语言更换类型文本
        let mdAlertText__ = "." + _md_alert_ + __text_ + "-";
        _t.f(mdAlertText__ + _note_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlert_note_, 16, 16) + V_lang_text(73, [
                "备忘",
                _Note_
            ]));
        });
        _t.f(mdAlertText__ + _tip_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlert_tip_, 16, 16) + V_lang_text(74, [
                "提示",
                _Tip_
            ]));
        });
        _t.f(mdAlertText__ + _important_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlert_important_, 16, 16) + V_lang_text(75, [
                "重要",
                _Important_
            ]));
        });
        _t.f(mdAlertText__ + _warning_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlert_warning_, 16, 16) + V_lang_text(76, [
                "注意",
                _Warning_
            ]));
        });
        _t.f(mdAlertText__ + _caution_).e((i, e) => {
            $(e).hm(V_ui_svgIcon2(_icoAlert_caution_, 16, 16) + V_lang_text(77, [
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
        targetPrev = target.pr();

    // 注音内容前没有内容则不处理
    if (V_length(targetPrev) === 0)
        return;

    let prevText = targetPrev.t(),
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
    target.rm();
}

/**
 * 释义或翻译
 * @param text 被注音的内容
 * @param symbol 注音
 * @param event 事件对象
 */
function TextPhonetic_translation(text, symbol, event) {
    V_stopPropagation(event); // 停止事件冒泡

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
        tag = V_tagName(quote);

    // 针对 <blockquote> 或 <details>
    if (tag.sW("bl") || tag.sW("de")) {
        // 删除预置颜色标识
        colorCode.p().rm();

        // 引用着色样式的处理
        JQ_addClass(quote, _v__ + "q " + color + em);

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
        solid = V_length(color) < 4 || color.i("-") > -1, // true - 单色，false - 渐变色
        gradientColors = [], // 渐变色标识数组
        renderTarget = colorCode.pr(),
        wholeRendering = gFalse;

    // 颜色标识为第 1 个子元素时，代表是要对整个段落（或单元格）进行着色
    if (!tableCellBgMode
        && renderTarget !== gUndefined && V_isLength0(renderTarget)) {
            renderTarget = colorCode.p();
            wholeRendering = gTrue;
    }

    // 获取目标对象的 HTML 标签名称
    let tagName = V_tagName(renderTarget);

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
        if (tagName === _mark_)
            __disposeMark(renderTarget);
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
        tagName = V_tagName(renderTarget);

        if (tagName === "th" || tagName === "td")
            __disposeCell(renderTarget);
    }

    // 删除预置颜色标识
    colorCode.rm();

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
            let title = ColorTooLight.test(color) ? "-tt" : _;
            obj.c(_color_, V_ui_var(___ac_ + color + title));
        }
        // 渐变色
        else {
            let span = obj.f(_span_);
            if (V_isLength0(span)) // 无子元素 span 时恢复为 obj
                span = obj;
            if (span !== gUndefined) {
                span.c(_cssText_, _background_image_ + ":" + _linear_gradient_ + "(90deg,"
                    + V_ui_genGradColorCSS(gradientColors, _, __lg_) + ")" + _css_important_ + _box_shadow_none_);
                span.c(_background_clip_, _text_);
                span.c(_color_, _transparent_);
            }
        }

        wholeRendering
            ? obj.a(_data_rb_whole_text_, V_ui_campColor(color))
            : obj.a(_data_rb_text_, V_ui_campColor(color));
    }

    /**
     * 处理下划线着色
     * @param obj 文本对象
     */
    function __disposeUnderline(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        solid
            ? obj.c(_border_color_, V_ui_var(___ac_ + color))
            // 渐变色
            : obj.c(_border_image_, _linear_gradient_ + "(90deg,"
                + V_ui_genGradColorCSS(gradientColors, _, __lg_) + ") 0 0 1 0");
    }

    /**
     * 处理标识着色
     * @param obj 文本对象
     */
    function __disposeMark(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        solid
            ? obj.c(_box_shadow_, "0 " + V_ui_var("--mark-bg-h-inset") + " 0 0 " + V_ui_var(___ac_ + color + __fd_) +___+ _inset_)
            // 渐变色
            : obj.c(_box_shadow_, _none_)
                .c(_text_shadow_, _none_)
                .c(_cssText_, _background_ + ":" + _linear_gradient_ + "(90deg,"
                    + V_ui_genGradColorCSS(gradientColors, __fd_, __lg_) + ")0 .4375em/100% " + V_ui_var("--mark-bg-h") +___+ _no_repeat_ + _css_important_ + _box_shadow_none_);
    }

    /**
     * 处理表格单元格着色
     * @param obj 文本对象
     */
    function __disposeCell(obj) {
        if (obj === gUndefined)
            return;

        // 单色
        solid
            ? obj.c(_background_color_, V_ui_var(___ac_ + color + __fd_))
            // 渐变色
            : obj.c(_cssText_, _background_image_ + ":" + _linear_gradient_ + "(135deg,"
                + V_ui_genGradColorCSS(gradientColors, __fd_, __lg_) + ")" + _css_important_ + _box_shadow_none_);

        obj.a(_data_rb_cell_bg_, V_ui_campColor(color));
    }
}

// ==================== Code Code 模块 ==================== //

let ColorCode = "(r[do]|og|ye|l[am]|g[nyd]|aq|cy|wt|b[unk]|se|vn|p[uk]|[mw]n|ol|t[12])",
    Color_syntax = new RegExp("^\(" + ColorCode + "+)(!)?\$", "i"),
    Color_syntaxOld = new RegExp("^\\((" + ColorCode + "+)(!)?\\)$", "i"),
    Color_syntaxByClass = new RegExp("\\s(" + ColorCode + "+)\\s(em)?", "i"),
    ColorTooLight = /ye|lm|aq|la|pk|gd|cy/i; // 属于亮度较高，用于文字显示时须要降低亮度的颜色标识

/**
 * 初始化标签、刮刮卡的默认颜色标识
 */
function ColorCode_init() {
    // 注：引用块着色的初始化在 ExtQuote 中进行
    let dcTag = V_getParamVal(_tag_),
        dcBadge = V_getParamVal(_badge_),
        dcCoating = V_getParamVal(_coating_);
    if (dcTag !== gNull)
        Tag_defalutColor = dcTag;
    if (dcBadge !== gNull)
        Badge_defalutColor = dcBadge;
    if (dcCoating !== gNull)
        Coating_defalutColor = dcCoating;
}

/**
 * 处理标签、引用块、刮刮卡指定的颜色
 * @param target 颜色标识对象
 * @return Array[] 正则表达式匹配的颜色标识数组
 */
function ColorCode_parse(target) {
    let tagName = V_tagName(target),
        newColors = gNull;
    // 针对 <sub> 标签
    if (tagName === "em"
        && V_length(target.ch("sub" + __only_child_)) > 0
        && (newColors = target.t().m(Color_syntax)) !== gNull)
            target.rm();
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

// ==================== Code Magic 模块 ==================== //

/**
 * 初始化
 */
function CodeMagic_init() {
    // 遍历所有 不是 em>code 的范围（包单级标签、多级标签的旧语法）
    let stdCount = 0;
    $(V_not("em") + V_not(_strong_) + ">" + _code_).e((index, element) => {
        let _t = $(element),
            codeText = _t.t(),
            result;
        // 先处理：多级标签格式
        if ((result = codeText.m(Badge_syntax)) !== gNull)
            Badge_build(_t, result);
        // 文字注音格式（代码式语法）
        else if ((result = codeText.m(TextPhonetic_syntaxForCode)) !== gNull)
            TextPhonetic_buildForCode(_t, result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else {
            stdCount++;
            JQ_addClass(_t, _v_std_code_ + " id-" + stdCount);
            _t.uC().ck(() => {
                let content = _t.t();
                ContentAssistor_lastTarget = _t;
                Copy_action(_t, content);
            });
        }
    });

    // 处理刮刮卡（新语法）
    $("em>" + _span_ + __first_child_ + "+" + _strong_ + __last_child_ + ",em>" + _strong_ + __only_child_).e((index, element) => {
        let _t = $(element),
            result = [],
            tip = _t.pr();

        // 解包 em
        _t.p().wrap(V_ui_span(_, _, _));
        _t.unwrap();

        // 构建兼容旧语法的数据结构
        result.push(_); // 主结构，在此忽略内容
        result.push(V_isLength0(tip) ? _ : tip.t()); // 提示的内容
        result.push(_t.t()); // 隐藏的内容

        // 生成刮刮卡
        Coating_build(_t.p(), result);
    });

    // 先处理：多级标签（新语法）
    $("em>" + _span_ + __first_child_ + "+" + _code_ + ",em>" + _code_ + __first_child_ + "+" + _span_ + __last_child_).e((index, element) => {
        let _t = $(element),
            value2 = _t.n(),
            result = [];

        // 解包 em
        _t.p().wrap("<" + _code_ + "></" + _code_ + ">");
        _t.unwrap();

        let bName = _t.pr().t(),
            bValue = _t.t(),
            bValue2 = _;
        if (V_tagName(_t) === _span_) {
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
        result.push(bName); // 多级标签标题（第1段）
        result.push(bValue); // 多级标签内容（第2段）
        // 多级标签内容2（第3段）的处理
        if (V_length(bValue2) > 0) {
            result.push(_);
            result.push(bValue2);
        }

        // 生成多级标签
        Badge_build(_t.p(), result);
    });

    // 后处理：标签（新语法）
    $("em>" + _code_ + __only_child_).e((index, element) => {
        let _t = $(element),
            codeText = _t.t(),
            result;

        // 解包 em
        _t.unwrap();
        // 解析处理
        (result = codeText.m(Tag_syntax)) !== gNull
            && Tag_build(_t, result);
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
    if (colorSet !== gNull) {
        color = Tag_getColor(colorSet[1]);
        em = ColorCode_isEm(colorSet) ? " em" : _;
    }

    target.t(tag);

    // 过滤语法内容
    let solid = V_length(color) < 4 || color.i("-") > -1, // 如：t1, t2-a
        gradientColors = [], // 渐变色标识数组
        id = " id-" + Tag_count;
    // 针对渐变色语法
    if (!solid) {
        em = " em"; // 强制转为强调样式（不管是否有指定）
        gradientColors = V_ui_splitColors(color);
        target.a(_class_, _v_tag_ +___+ gradientColors[0] + em + id);
        target.c(_cssText_, _background_image_ + ":" + _linear_gradient_ + "(90deg,"
            + V_ui_genGradColorCSS(gradientColors, _, __lg_) + ")" + _css_important_
            + (color.i("wt") > -1 ? _border_color_ + ":" + _var_d_bc_ + _css_important_ : _)
            + _box_shadow_none_);
    }
    // 针对单色语法
    else
        target.a(_class_, _v_tag_ +___+ color + em + id);

    // 复制标签内容
    target.a(_value_, target.t());
    target.uC().ck((event) => {
        let _t = V_eventCurrentTarget(event),
            content = _t.a(_value_);
        ContentAssistor_lastTarget = _t;
        Copy_action(_t, content);
    });
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

// ==================== Code Magic：多级标签模块 ==================== //

// 语法：#badge_name|badge_value|badge_value2#
let Badge_count = 0,
    Badge_syntax = /^#([^|]*)\|([^|]+)(\|([^|]+))?#$/i, // 多级标签
    Badge_syntax_variable = /^(.*)({{.+}}|%.+%|\${.+}|#{.+}|\$.+\$|var\(.+\))(.*)$/i, // 变量语法
    Badge_defalutColor = "t1";

/**
 * 构建多级标签样式
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
    if (colorSet !== gNull)
        color = Badge_getColor(colorSet[1], target);

    // 过滤语法内容
    let solid = V_length(color) < 4,
        gradientColors = [], // 渐变色标识数组
        id = "id-" + Badge_count;

    // ----- 多级标签标题（第1段）
    // 针对渐变色语法
    if (!solid) {
        gradientColors = V_ui_splitColors(color);
        target.wrap("<" + _code_ +___+ V_attr(_class_, _v_badge_name_ +___+ gradientColors[0] +___+ id) + "></" + _code_ + ">");
        target.p().c(_cssText_, _background_image_ + ":" + _linear_gradient_ + "(90deg,"
            + V_ui_genGradColorCSS(gradientColors, _, __lg_) + ")" + _css_important_
            + (color.i("wt") > -1 ? _border_color_ + ":" + _var_d_bc_ + _css_important_ : _)
            + _box_shadow_none_);
    }
    // 针对单色语法
    else
        target.wrap("<" + _code_ +___+ V_attr(_class_, _v_badge_name_ +___+ color +___+ id) + "></" + _code_ + ">");

    // 复制多级标签标题内容（第2段）
    let badge = V_byClass(_v_badge_name_ + "." + id);
    V_length(badgeName) > 0
        && badge.pp(V_ui_label(_, _, badgeName));

    // 点击事件
    badge.uC().ck((event) => {
        let _t = V_eventCurrentTarget(event),
            content = _t.a(_value_);

        ContentAssistor_lastTarget = _t;
        Copy_action(_t, content);
    });

    // ----- 多级标签内容（第2段）
    JQ_addClass(target, _v_badge_value_ +___+ id);
    // 处理含变量的情况
    if ((varStr = badgeValue.m(Badge_syntax_variable)) !== gNull)
        badgeValue = badgeValue.r(varStr[2], V_ui_span("var", _, varStr[2]));
    target.hm(badgeValue);

    // 复制多级标签内容（第2段）
    target.uC().ck((event) => {
        let _t = V_eventCurrentTarget(event),
            value2 = _t.n();
        Copy_action(_t, _t.t()
            + (V_length(value2) > 0 ? ___+ value2.t() : _)); // 如果有 value2 的处理
    });

    // ----- 多级标签内容2（第3段）
    if (badgeValue2 !== gUndefined) {
        target.af(V_ui_span(_v_badge_value_ + "2 " + id, _, badgeValue2));
        JQ_addClass(target.p(), _hastwo_);
        JQ_addClass(target, _hastwo_);

        target.n().uC().ck((event) => {
            let _t = V_eventCurrentTarget(event);
            Copy_action(_t, _t.t());
        });
    }

    // 生成普通内容，用于复制
    let nodeCnt = 0,
        plainContent = _;
    badge.contents().e((index, element) => {
        nodeCnt++;
        plainContent += ((nodeCnt > 1) ? ___ : _) + $(element).t();
    });
    badge.a(_value_, plainContent);
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
        // 针对封面内的多级标签（未指定颜色标识）的处理
        if (target !== gUndefined) {
            let p = target.p(),
                tagName = (p !== gUndefined ? V_tagName(p) : gUndefined);
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
    $(_strong_ + ">" + _mark_ + __only_child_).e((index, element) => {
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
            if (V_isLength0(taskList))
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
    JQ_addClass(target, _v__ + "pgbar id-" + Progressbar_count);

    let label = target.ch(_label_),
        width = label.w(),
        outlineWidth = JS_parseInt(label.c(_outline_width_)),
        rbTextSet = ["og", "gn", "bu", "vn", "pu", "bk"],
        rbText = target.a(_data_rb_text_),
        autoColor = (rbText === gUndefined),
        color,
        colorAlt,
        outlineStyle = _solid_;

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

    color = V_ui_var(___ac_ + rbText);
    colorAlt = V_ui_var(___ac_ + rbText + "-a-lg");

    autoColor
        && target.c(_color_, color);

    let overValue = value - 100,
        overWidth = overValue / 100 * width,
        shadowSuffix = "px 0 0 0 " + color;
    // 大于 100% 的处理
    if (overValue > 0) {
        overWidth = overValue / 100 * width;
        // 渲染超出部分
        label.c(_box_shadow_, (overWidth + outlineWidth) + shadowSuffix);
        label.c(_margin_right_, overWidth + 5);
    }
    // 小于 0% 的处理
    else if (value < 0) {
        overWidth = value / 100 * width;
        // 渲染超出部分
        label.c(_box_shadow_, (overWidth + outlineWidth) + shadowSuffix);
        label.c(_margin_left_, Math.abs(overWidth));
        color = colorAlt;
        outlineStyle = "dashed";
    }

    // 渲染正常部分
    value = (value > 100) ? 100 : (value < 0 ? 0 : value);
    label.c(_background_, `${_linear_gradient_}(90deg, ${color} ${value}%, ${_var_d_bc_} ${value}%, ${_var_d_bc_} 100%)`);
    label.c(_outline_style_, outlineStyle);
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
    if (colorSet !== gNull)
        color = Coating_getColor(colorSet[1]);
    color = V_ui_var(___ac_ + color);

    // 自定义提示信息
    if (result[1] !== gUndefined && result[1] !== _)
        tip = result[1];

    // 初始化「刮刮卡」数据
    coatingCount++;
    JQ_addClass(target, _v_coating_ + " id-" + coatingCount);
    target.a(_data_coating_tip_, tip);
    target.a(_data_coating_hidden_, hiddenText);
    target.a(_data_coating_showed_, _false_);
    target.t(tip);
    target.c(_background_, __genCoatingBg(V_length(tip), color))
        .c(_border_color_, color);

    // 针对「刮刮卡」的点击事件
    target.uC().ck((event) => {
        Coating_toggle(V_eventCurrentTarget(event), event);
    });

    /**
     * 根据提示信息字数生成条纹背景
     * @param charCount 提示信息字数
     * @param color 条纹背景色
     * @returns string 生成 CSS 规范的背景
     */
    function __genCoatingBg(charCount, color) {
        let count = 16,
            result = _linear_gradient_ + "(135deg,";
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
                c = (i % 2 === 0) ? color : _var_d_fc_;
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
    if (V_getSelectedText() !== _)
        return;

    target.a(_data_coating_showed_).sW("f")
        ? (
            V_stopPropagation(event), // 停止事件冒泡
            Coating_show(target)
        )
        : Coating_hide(target);
}

/**
 * 显示「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_show(target) {
    JQ_addClass(target, _opened_);
    // 显示原始信息
    target.t(target.a(_data_coating_hidden_));
    // 针对「刮刮卡」自定义数据
    target.a(_data_coating_showed_, _true_)
}

/**
 * 隐藏「刮刮卡」的内容
 * @param target 刮刮卡对象
 */
function Coating_hide(target) {
    JQ_removeClass(target, _opened_);
    // 显示提示信息
    target.t(target.a(_data_coating_tip_));
    // 针对「刮刮卡」自定义数据
    target.a(_data_coating_showed_, _false_);
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
    target.rm();
}

// ==================== VLOOK UI 模块 ==================== //

/**
 * 加载欢迎页资源
 */
function VLOOKui_welcomePage() {
    let title = V_getDocTitle(),
        date = V_getMetaByName(_date_),
        author = V_getMetaByName("author"),
        defalutContent = (title !== gUndefined ? V_ui_div(_, _, title) : _)
            + (date !== gUndefined ? V_ui_div(_, _v__ + _date_, "( " + date + " )") : _)
            + (author !== gUndefined ? V_ui_strong(author) : _),
        metaContent = V_getMetaByName(_vlook__ + _welcome_);

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === gUndefined)
        metaContent = defalutContent;
    metaContent += _2br_;
    // --------------------------------------------------
    // 欢迎页
    return V_ui_div(_, _v_welcome_page_,
            // 文档专属图标
            V_ui_div(_, _v_thm_fav_logo_)
            // 欢迎信息
            + V_ui_div(_, _v_tips_, metaContent.x())
            // 文档加载进度及进入按钮
            + V_ui_div(_, _v_loading_, _Loading_)
        );
}

/**
 * 加载 VLOOK CC 封面四角资源
 */
function VLOOKui_cc() {
    return V_ui_div(_, _v_cc_ +___+ _top_ +___+ _left_, _)
        + V_ui_div(_, _v_cc_ +___+ _top_ +___+ _right_, _)
        + V_ui_div(_, _v_cc_ +___+ _bottom_ +___+ _left_, _)
        + V_ui_div(_, _v_cc_ +___+ _bottom_ +___+ _right_, _);
}

/**
 * 加载检查 hash 资源
 */
function VLOOKui_checkHash() {
    return V_ui_div(_, _v_check_hash_, _);
}

/**
 * 加载图标集资源
 */
function VLOOKui_iconSet() {
    let ui = '<' + _svg_ +___+ V_attr(_style_, _display_ + ":" + _none_) + '>',
        tagRectX = '<rect x="',
        tagRectTransformRotate = '<rect ' + _transform_ + '="' + _rotate_ + '(',
        widthHeightRx = '" ' + _width_ + '="2" ' + _height_ + '="4" rx="1"/>',
        blankRect = 'M0 0h16v16H0z';

        // 图标集：图标|VLOOK LOGO
    ui += V_ui_symbol(_icoVLOOK_,
            V_ui_path('M14.291 0c1.985 0 2.705.207 3.43.595a4.046 4.046 0 0 1 1.684 1.683c.388.726.595 1.446.595 3.43v8.583c0 1.985-.207 2.705-.595 3.43a4.046 4.046 0 0 1-1.683 1.684c-.726.388-1.446.595-3.43.595H5.708c-1.985 0-2.705-.207-3.43-.595a4.046 4.046 0 0 1-1.684-1.683C.207 16.996 0 16.276 0 14.292V5.708c0-1.985.207-2.705.595-3.43A4.046 4.046 0 0 1 2.278.594C3.004.207 3.724 0 5.708 0h8.583zM10.18 14.146a.217.217 0 0 0-.278 0l-.797.663a.217.217 0 0 0-.041.288l.796 1.193a.217.217 0 0 0 .362 0l.796-1.193a.217.217 0 0 0-.041-.288zm-4.12-6.403a3.616 3.616 0 0 0-3.619 3.614 3.616 3.616 0 0 0 3.619 3.613 3.616 3.616 0 0 0 3.62-3.613 3.616 3.616 0 0 0-3.62-3.614zm7.962 0a3.616 3.616 0 0 0-3.62 3.614 3.616 3.616 0 0 0 3.62 3.613 3.616 3.616 0 0 0 3.619-3.613 3.616 3.616 0 0 0-3.619-3.614zM6.059 8.827c1.4 0 2.533 1.133 2.533 2.53a2.531 2.531 0 0 1-2.533 2.53 2.531 2.531 0 0 1-2.533-2.53 2.531 2.531 0 0 1 2.533-2.53zm7.962 0c1.4 0 2.533 1.133 2.533 2.53a2.531 2.531 0 0 1-2.533 2.53 2.531 2.531 0 0 1-2.533-2.53 2.531 2.531 0 0 1 2.533-2.53zm2.402-4.312a.543.543 0 0 0-.71-.267l-.011.005-5.663 2.357-5.66-2.357-.012-.005a.543.543 0 0 0-.448.987l5.863 2.443.011.005a.54.54 0 0 0 .247.045.54.54 0 0 0 .247-.045l.011-.005 5.863-2.443a.542.542 0 0 0 .262-.72z'))
        // 图标集：图标|导航中心
        + V_ui_symbol(_icoNavCenter_,
            V_ui_path('M7.087.453a.82.82 0 0 1 1.1-.366L13 2.493V17.2a.8.8 0 0 1-1.158.716L7 15.493V.82a.82.82 0 0 1 .087-.367zm12.755.797a1.5 1.5 0 0 1 .158.67v11.72a3 3 0 0 1-1.658 2.683l-3.184 1.592A.8.8 0 0 1 14 17.199V2.493L17.83.58a1.5 1.5 0 0 1 2.012.67zM5.913.453A.82.82 0 0 1 6 .82v14.673l-3.83 1.915A1.5 1.5 0 0 1 0 16.066V4.348a3 3 0 0 1 1.658-2.684L4.813.087a.82.82 0 0 1 1.1.366zM18.99 1.7a.5.5 0 0 0-.668-.23L15.61 2.79a.5.5 0 0 0-.046.874l2.71 1.693a.5.5 0 0 0 .765-.424V1.918a.5.5 0 0 0-.05-.219z'))
        // 图标集：图标|导航中心分段控制|目录索引
        + V_ui_symbol(_icoIndexTab_toc_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 8a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h6zm-9 0a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 7a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm9-3a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6zM4 4a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1z'))
        + V_ui_symbol(_icoIndexTab_toc_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 10H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zm-9 0H3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 7H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm9-4H7a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2zM4 3H3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z'))
        // 图标集：图标|导航中心分段控制|插图索引，与页签组共用
        + V_ui_symbol(_icoIndexTab_figure_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM5.823 7.22a1 1 0 0 1 .288.252l1.821 2.343a1 1 0 0 0 1.34.221l1.567-1.034a1 1 0 0 1 1.331.21l1.188 1.483a.8.8 0 0 1-.624 1.3H3.288a.8.8 0 0 1-.692-1.201l1.86-3.21a1 1 0 0 1 1.367-.364zM10 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z'))
        + V_ui_symbol(_icoIndexTab_figure_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.823 7.22a1 1 0 0 0-1.367.364l-1.86 3.21a.8.8 0 0 0 .692 1.201h9.446a.8.8 0 0 0 .624-1.3L12.17 9.212a1 1 0 0 0-1.331-.21l-1.567 1.034a1 1 0 0 1-1.34-.221L6.111 7.472a1 1 0 0 0-.288-.252zM10 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'))
        // 图标集：图标|导航中心分段控制|表格索引，与页签组共用
        + V_ui_symbol(_icoIndexTab_table_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5 11H1v1a2 2 0 0 0 2 2h2v-3zm5 0H6v3h4v-3zm5 0h-4v3h2a2 2 0 0 0 2-2v-1zM5 6H1v4h4V6zm5 0H6v4h4V6zm5 0h-4v4h4V6zM5 2H3a2 2 0 0 0-2 2v1h4V2zm5 0H6v3h4V2zm3 0h-2v3h4V4a2 2 0 0 0-2-2z'))
        + V_ui_symbol(_icoIndexTab_table_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M16 11v1a3 3 0 0 1-3 3h-1v-4h4zM4 11v4H3a3 3 0 0 1-3-3v-1h4zm7 0v4H5v-4h6zm0-5v4H5V6h6zm5 0v4h-4V6h4zm-5-5v4H5V1h6zm2 0a3 3 0 0 1 3 3v1h-4V1h1zM4 1v4H0V4a3 3 0 0 1 3-3h1zM0 6h4v4H0V6z'))
        // 图标集：图标|导航中心分段控制|多媒体索引，与页签组共用
        + V_ui_symbol(_icoIndexTab_media_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm-1 1.001H4v12h8v-12zM3 11H1v1a2 2 0 0 0 2 2v-3zm12 0h-2v3l.15-.005A2 2 0 0 0 15 12v-1zM3.002 6h-2v4h2V6zm11.997 0h-2v4h2V6zM3 2a2 2 0 0 0-2 2v1h2zm10 0v3h2V4a2 2 0 0 0-2-2zm-2.936 6.655L7.259 10.62A.8.8 0 0 1 6 9.963V6.037a.8.8 0 0 1 1.259-.656l2.805 1.964a.8.8 0 0 1 0 1.31z'))
        + V_ui_symbol(_icoIndexTab_media_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M16 11v1a3 3 0 0 1-3 3v-4h3zM3 11v4a3 3 0 0 1-3-3v-1h3zm9-10v14H4V1h8zM6.8 5.237a.8.8 0 0 0-.8.8v3.926a.8.8 0 0 0 1.259.656l2.805-1.964a.8.8 0 0 0 0-1.31L7.259 5.38a.8.8 0 0 0-.459-.144zM16 6v4h-3V6h3zM3 6v4H0V6h3zm10-5a3 3 0 0 1 3 3v1h-3V1zM3 1v4H0V4a3 3 0 0 1 3-3z'))
        // 图标集：图标|导航中心分段控制|代码块索引，与页签组共用
        + V_ui_symbol(_icoIndexTab_codeblock_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6.555 4.168a1 1 0 0 1 .277 1.387L5.201 7.999l1.631 2.446a1 1 0 0 1-.184 1.317l-.093.07a1 1 0 0 1-1.387-.277L3.353 8.832a1.5 1.5 0 0 1 0-1.664l1.815-2.723a1 1 0 0 1 1.387-.277zm2.89 0a1 1 0 0 1 1.387.277l1.815 2.723a1.5 1.5 0 0 1 0 1.664l-1.815 2.723a1 1 0 0 1-1.387.277l-.093-.07a1 1 0 0 1-.184-1.317L10.799 8 9.168 5.555a1 1 0 0 1 .277-1.387z'))
        + V_ui_symbol(_icoIndexTab_codeblock_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM5.454 4.168a1 1 0 0 0-1.387.277L2.252 7.168a1.5 1.5 0 0 0 0 1.664l1.815 2.723a1 1 0 0 0 1.387.277l.093-.07a1 1 0 0 0 .184-1.317L4.101 8l1.63-2.444a1 1 0 0 0-.277-1.387zm4.89 0a1 1 0 0 0-.277 1.387l1.631 2.444-1.631 2.446a1 1 0 0 0 .184 1.317l.093.07a1 1 0 0 0 1.387-.277l1.815-2.723a1.5 1.5 0 0 0 0-1.664l-1.815-2.723a1 1 0 0 0-1.387-.277z'))
        // 图标集：图标|导航中心分段控制|公式索引，与页签组共用
        + V_ui_symbol(_icoIndexTab_formula_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM3.735 3l3.876.003a.741.741 0 0 1 .738.706.746.746 0 0 1-.653.79l-.085.004L5.225 4.5l2.041 2.043c.18.24.202.567.054.83l-.054.084L5.226 9.5h2.386a.74.74 0 0 1 .73.662l.004.087c0 .38-.279.7-.648.745L7.61 11H3.735a.732.732 0 0 1-.64-.382.764.764 0 0 1 .011-.756l.046-.069 2.604-2.791-2.604-2.795a.763.763 0 0 1-.093-.75.736.736 0 0 1 .595-.452L3.735 3zm8.948 3.062a.76.76 0 0 1 .145 1.05l-.986 1.338 1.009 1.32a.76.76 0 0 1-.133 1.043.724.724 0 0 1-1.025-.12l-.767-1.002-.75 1.015a.724.724 0 0 1-1.018.133.76.76 0 0 1-.155-1.035l.987-1.337-1.01-1.32a.76.76 0 0 1 .133-1.044.724.724 0 0 1 1.025.12l.767 1.003.75-1.016a.725.725 0 0 1 1.028-.148z'))
        + V_ui_symbol(_icoIndexTab_formula_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10zM3.735 3l-.08.005a.736.736 0 0 0-.596.452.763.763 0 0 0 .093.75l2.604 2.795-2.604 2.791-.046.069a.764.764 0 0 0-.011.756c.13.236.375.382.64.382h3.876l.087-.006a.745.745 0 0 0 .648-.745l-.005-.087a.74.74 0 0 0-.73-.662H5.226l2.041-2.042.054-.084a.763.763 0 0 0-.054-.83l-2.04-2.043 2.385.002.085-.005a.746.746 0 0 0 .653-.789.741.741 0 0 0-.738-.706L3.735 3zm8.948 3.062a.725.725 0 0 0-1.028.148l-.75 1.016-.767-1.002a.724.724 0 0 0-1.025-.121.76.76 0 0 0-.133 1.044l1.01 1.32-.987 1.337a.76.76 0 0 0 .155 1.035.724.724 0 0 0 1.018-.133l.75-1.015.767 1.002a.724.724 0 0 0 1.025.12.76.76 0 0 0 .133-1.044L11.84 8.45l.987-1.338a.76.76 0 0 0-.145-1.05z'))
        // 图标集：图标|页签组|音频
        + V_ui_symbol(_icoIndexTab_audio_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6.625 4c.483 0 .875.392.875.875v6.25a.875.875 0 1 1-1.75 0v-6.25c0-.483.392-.875.875-.875zm2.75 1c.483 0 .875.392.875.875v4.25a.875.875 0 1 1-1.75 0v-4.25c0-.483.392-.875.875-.875zm-5.5 1c.483 0 .875.392.875.875v2.25a.875.875 0 1 1-1.75 0v-2.25C3 6.392 3.392 6 3.875 6zm8.25 0c.483 0 .875.392.875.875v2.25a.875.875 0 1 1-1.75 0v-2.25c0-.483.392-.875.875-.875z'))
        + V_ui_symbol(_icoIndexTab_audio_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM6.625 4a.875.875 0 0 0-.875.875v6.25a.875.875 0 1 0 1.75 0v-6.25A.875.875 0 0 0 6.625 4zm2.75 1a.875.875 0 0 0-.875.875v4.25a.875.875 0 1 0 1.75 0v-4.25A.875.875 0 0 0 9.375 5zm-5.5 1A.875.875 0 0 0 3 6.875v2.25a.875.875 0 1 0 1.75 0v-2.25A.875.875 0 0 0 3.875 6zm8.25 0a.875.875 0 0 0-.875.875v2.25a.875.875 0 1 0 1.75 0v-2.25A.875.875 0 0 0 12.125 6z'))
        // 图标集：图标|页签组|引用块
        + V_ui_symbol(_icoIndexTab_blockquote_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm0 1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM4 4h4a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm-.5 5h9a.5.5 0 1 1 0 1h-9a.5.5 0 0 1 0-1zm0 2h9a.5.5 0 1 1 0 1h-9a.5.5 0 1 1 0-1z'))
        + V_ui_symbol(_icoIndexTab_blockquote_ + __checked_,
            V_ui_path(blankRect, _none_)
            + V_ui_path('M0 0h16v16H0z"/><path d="M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zm-.5 10h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zm0-2h-9a.5.5 0 0 0 0 1h9a.5.5 0 1 0 0-1zM8 4H4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z'))
        // 图标集：图标|导航历史
        + V_ui_symbol(_icoNavHistory_,
            V_ui_path('M10.63 0c5.17 0 9.375 4.262 9.375 9.5S15.8 19 10.631 19c-4.05 0-7.51-2.616-8.817-6.27l1.325-.768c1.026 3.198 3.997 5.518 7.49 5.518 4.34 0 7.875-3.581 7.875-7.98 0-4.399-3.534-7.98-7.875-7.98-2.98 0-5.58 1.688-6.916 4.17l1.247.41a.625.625 0 0 1 .14 1.12L2.225 9.057a.625.625 0 0 1-.917-.297L.044 5.56a.625.625 0 0 1 .777-.823l1.445.476C3.814 2.123 6.982 0 10.631 0zm-.5 4.18c.691 0 1.25.56 1.25 1.25V9.79l2.402 1.403a1.25 1.25 0 0 1 .456 1.697l-.013.023a1.248 1.248 0 0 1-1.714.461L9.5 11.618a1.247 1.247 0 0 1-.594-.83l-.009-.049a1.26 1.26 0 0 1-.017-.21v-5.1c0-.69.56-1.249 1.25-1.249z'))
        // 图标集：图标|搜索
        + V_ui_symbol(_icoSearch_,
            V_ui_path('M14.999 14.596a1.375 1.375 0 0 1-1.953 0L11.46 12.94a6.372 6.372 0 0 1-3.466 1.032c-3.559 0-6.444-2.904-6.444-6.486S4.435 1 7.994 1c3.56 0 6.445 2.904 6.445 6.486a6.47 6.47 0 0 1-1.026 3.488l1.586 1.656c.54.543.54 1.423 0 1.966zM7.993 2.32c-2.834 0-5.132 2.313-5.132 5.166s2.298 5.165 5.132 5.165c2.835 0 5.133-2.312 5.133-5.165s-2.298-5.166-5.133-5.166z'))
        + V_ui_symbol(_icoMaskCloser_,
            V_ui_path('M11.98.176l.035.013c1.506.534 2.311 2.123 1.86 3.607L6.21 30l7.61 26.04c.546 1.475-.186 3.097-1.64 3.707l-.2.077c-1.502.532-3.154-.18-3.781-1.597l-.065-.16L.315 31.916a5.987 5.987 0 0 1 0-3.832L8.133 1.933C8.702.41 10.422-.375 11.979.176z'))
        // 图标集：图标|插图导航的上一张
        + V_ui_symbol(_icoPrevFig_,
            V_ui_path('M11.03.091c.765.284 1.159 1.147.88 1.927L3.002 27l8.91 24.982a1.516 1.516 0 0 1-.75 1.87l-.13.057a1.462 1.462 0 0 1-1.834-.765l-.055-.134L.12 27.705C.112 27.685 0 27.435 0 27c0-.435.111-.684.12-.706L9.141.99A1.465 1.465 0 0 1 11.03.09z'))
        // 图标集：图标|逐章导航的上一章'
        + V_ui_symbol(_icoPrevChapter_,
            V_ui_path('M7.364.293a1 1 0 0 1 0 1.414l-4.97 4.969 4.974 4.974a1 1 0 0 1-1.415 1.414L.296 7.407a.996.996 0 0 1-.291-.658.995.995 0 0 1 .288-.8L5.95.294a1 1 0 0 1 1.414 0z'))
        // 图标集：图标|已收起的 目录节点
        + V_ui_symbol(_icoTocFolded_,
            V_ui_path('M11.614 8.72L7.37 12.961a1 1 0 0 1-1.414-1.414l3.542-3.543-3.542-3.543A1 1 0 1 1 7.37 3.048l4.243 4.243a.997.997 0 0 1 .293.707v.014a.997.997 0 0 1-.293.707z'))
        // 图标集：图标|已收起的 表格行分组节点
        + V_ui_symbol(_icoFolded_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm-.336 3.757A1 1 0 1 0 6.25 5.172l2.835 2.835-2.835 2.836a1 1 0 1 0 1.414 1.414l3.535-3.536a.997.997 0 0 0 .293-.707V8a.997.997 0 0 0-.293-.707z'))
        // 图标集：图标|关闭
        + V_ui_symbol(_icoClose_,
            V_ui_path('M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z"' +___+ V_attr(_transform_, _translate_ + '(8.000000, 8.000000) ' + _rotate_ + '(45.000000) ' + _translate_ + '(-8.000000, -8.000000)'), _))
        // 图标集：图标|清空输入
        + V_ui_symbol(_icoResetInput_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM5.737 4.606a.8.8 0 0 0-1.131 1.131L6.869 8l-2.263 2.263a.8.8 0 1 0 1.131 1.131L8 9.131l2.263 2.263a.8.8 0 1 0 1.131-1.131L9.131 8l2.263-2.263a.8.8 0 1 0-1.131-1.131L8 6.869z'))
        // 图标集：图标|浅色外观（Light）
        + V_ui_symbol(_icoLightMode_,
            V_ui_path('M10 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414zm-11.314 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM10 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm9 4a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zM2 9a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h1zm15.071-6.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-12.728 0l.707.707A1 1 0 1 1 3.636 5.05l-.707-.707A1 1 0 0 1 4.343 2.93zM10 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z'))
        // 图标集：图标|深色外观（Dark）
        + V_ui_symbol(_icoDarkMode_,
            V_ui_path('M5.646 2.646A9.003 9.003 0 0 0 9 20a9.003 9.003 0 0 0 8.354-5.646A9 9 0 0 1 5.613 2.729zM15.5 3l-1.065 2.7a1.303 1.303 0 0 1-.734.735L11 7.5l2.7 1.065c.337.133.602.398.735.734L15.5 12l1.065-2.7c.133-.337.398-.602.734-.735L20 7.5l-2.7-1.065a1.303 1.303 0 0 1-.735-.734L15.5 3zm-4.829-3l-.547 1.389a1 1 0 0 1-.564.563L8.171 2.5l1.39.548a1 1 0 0 1 .563.563L10.67 5l.548-1.389a1 1 0 0 1 .563-.563l1.39-.548-1.39-.548a1 1 0 0 1-.563-.563L10.671 0z'))
        // 图标集：图标|外观跟随系统（Light / Dark）
        + V_ui_symbol(_icoAutoMode_,
            V_ui_path('M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 2v4a4 4 0 0 0-.2 7.995L10 14v4a8 8 0 1 0 0-16zm0 4a4 4 0 0 1 .2 7.995L10 14z'))
        // 图标集：图标|链接地图
        + V_ui_symbol(_icoLinkMap_,
            V_ui_path('M17.143 12.857c-.496 0-.956.139-1.362.362l-3.095-2.278c.103-.296.171-.61.171-.941 0-.1-.02-.194-.03-.292l2.86-1.716a2.13 2.13 0 0 0 1.456.58A2.143 2.143 0 1 0 15 6.428c0 .1.016.195.03.292l-2.71 1.625a2.852 2.852 0 0 0-1.606-1.102V5.613a2.855 2.855 0 0 0 2.143-2.756A2.86 2.86 0 0 0 10 0a2.86 2.86 0 0 0-2.857 2.857c0 1.327.914 2.437 2.143 2.756v1.631c-.697.18-1.3.617-1.689 1.223L4.951 6.88a2.143 2.143 0 1 0-2.094 1.692c.488-.001.96-.17 1.337-.48L7.156 9.87c-.002.045-.013.086-.013.131 0 .332.068.646.172.942l-3.06 2.296a2.816 2.816 0 0 0-1.398-.38A2.86 2.86 0 0 0 0 15.713a2.86 2.86 0 0 0 2.857 2.857 2.86 2.86 0 0 0 2.857-2.857c0-.54-.159-1.039-.42-1.47l2.82-2.115c.335.299.737.513 1.172.627v3.09a2.136 2.136 0 0 0-1.429 2.011 2.143 2.143 0 1 0 4.286 0 2.136 2.136 0 0 0-1.429-2.011v-3.09a2.837 2.837 0 0 0 1.174-.627l2.834 2.085c-.283.45-.435.97-.436 1.5a2.86 2.86 0 0 0 2.857 2.857A2.86 2.86 0 0 0 20 15.714a2.86 2.86 0 0 0-2.857-2.857zm-8.572-10a1.43 1.43 0 0 1 2.857 0A1.43 1.43 0 0 1 10 4.286a1.43 1.43 0 0 1-1.429-1.429zM2.857 17.143a1.43 1.43 0 0 1-1.428-1.429c0-.788.64-1.428 1.428-1.428.788 0 1.429.64 1.429 1.428a1.43 1.43 0 0 1-1.429 1.429zM10 11.429A1.43 1.43 0 0 1 8.571 10a1.43 1.43 0 0 1 2.857 0A1.43 1.43 0 0 1 10 11.429zm7.143 5.714a1.43 1.43 0 0 1-1.429-1.429 1.43 1.43 0 0 1 2.857 0 1.43 1.43 0 0 1-1.428 1.429z'))
        // 图标集：图标|聚光灯
        + V_ui_symbol(_icoSpotlight_,
            V_ui_path('M7 0a7 7 0 0 1 6.992 6.67A7.002 7.002 0 0 1 11 20a7 7 0 0 1-6.992-6.67A7.002 7.002 0 0 1 7 0zm4 6a7 7 0 0 0-6.992 7.33 7 7 0 0 0 9.985-6.662A6.984 6.984 0 0 0 11 6.001z'))
        // 图标集：图标|激光笔
        + V_ui_symbol(_icoLaserPointer_,
            V_ui_path('M5.574 5.078a3.5 3.5 0 0 1 4.913.603l6.772 8.668a3.5 3.5 0 1 1-5.516 4.31L4.971 9.991a3.5 3.5 0 0 1 .603-4.913zm.576.769a2.5 2.5 0 1 0 3.078 3.94 2.5 2.5 0 0 0-3.078-3.94zm6.562-3.138a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 1 1-1.231-1.576l.788-.616zm-10.5 8a1 1 0 1 1 1.231 1.576l-.788.616a1 1 0 0 1-1.231-1.576l.788-.616zm-1.177-4.68l1 .034a1 1 0 0 1-.07 1.999l-1-.035a1 1 0 0 1 .07-1.999zM8.838.021a1 1 0 0 1 .77 1.186l-.208.978a1 1 0 0 1-1.956-.416l.208-.978a1 1 0 0 1 1.186-.77zM2.724 1.409a1 1 0 0 1 1.403.172l.616.788a1 1 0 0 1-1.576 1.232l-.616-.788a1 1 0 0 1 .173-1.404z'))
        // 图标集：图标|段落漫游
        + V_ui_symbol(_icoParagraphNav_,
            V_ui_path('M3.5 9.5a2.5 2.5 0 1 0 0 5H8a2.5 2.5 0 0 1 2.5-2.5h6a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 8 15.5H3.3A3.51 3.51 0 0 1 0 12a3.5 3.5 0 0 1 3.3-3.494L16.5 8.5a2.5 2.5 0 1 0 0-5H12A2.5 2.5 0 0 1 9.5 6h-6A2.5 2.5 0 0 1 1 3.5v-1A2.5 2.5 0 0 1 3.5 0h6A2.5 2.5 0 0 1 12 2.5h4.8v.013a3.5 3.5 0 0 1 0 6.974V9.5H3.5z'))
        // 图标集：图标|字体风格
        + V_ui_symbol(_icoFontStyle_,
            V_ui_path('M2.26 17.998l.59-1.85h3.015l.59 1.85h1.843a.5.5 0 0 0 .465-.683l-2.648-6.74a1 1 0 0 0-.931-.635h-1.57a1 1 0 0 0-.93.634l-2.65 6.74a.5.5 0 0 0 .466.684h1.76zm3.14-3.342H3.315l.22-.682c.26-.8.534-1.741.78-2.585h.055c.275.822.535 1.785.81 2.585l.218.682zm6.745 3.544c.893 0 1.644-.364 2.31-.892h.071l.17.716h2.055v-4.058c0-2.236-1.176-3.266-3.26-3.266-1.26 0-2.408.377-3.471.942l.879 1.47c.807-.402 1.473-.628 2.11-.628.823 0 1.163.34 1.22.917-3.146.302-4.478 1.118-4.478 2.626 0 1.193.907 2.173 2.394 2.173zm.865-1.734c-.524 0-.865-.2-.865-.615 0-.503.51-.917 2.083-1.093V15.9c-.368.352-.708.565-1.218.565zM13.802 0l3.473 7.75.724.078V8.4h-4.33v-.573l1.066-.124-.727-1.864h-3.201l-.8 1.853.712.146V8.4H8.1V8.16c-.325.256-.749.37-1.314.37-.943 0-1.472-.428-1.686-1.129-.729.727-1.272 1.13-2.414 1.13-1.23 0-2.086-.676-2.086-1.766 0-1.181.743-1.818 3.043-2.428.4-.104.9-.22 1.4-.337v-.792c0-1.35-.343-1.753-1.429-1.753-.2 0-.386.013-.6.052l-.1.922c-.043.883-.528 1.233-1.071 1.233-.515 0-.872-.233-.986-.662C.97 1.78 2.213 1 4.427 1c2.029 0 2.843.792 2.843 2.674v3.492c0 .494.172.662.443.662.214 0 .372-.103.643-.493l.243.182a2.323 2.323 0 0 1-.152.262l.49-.086L12.31 0h1.492zm-8.76 4.35a7.258 7.258 0 0 0-.786.22c-1 .376-1.529.987-1.529 1.934 0 .78.4 1.143 1.072 1.143.386 0 .714-.17 1.243-.598zm7.43-2.615l-1.507 3.533h2.87l-1.363-3.533z'))
        // 图标集：图标|灰色模式（Gray Mode）
        + V_ui_symbol(_icoGray_,
            V_ui_path('M7.826 9.565a1.74 1.74 0 1 0 0-3.478 1.74 1.74 0 0 0 0 3.478zm4.348 0a1.74 1.74 0 1 0 0-3.478 1.74 1.74 0 0 0 0 3.478zm-4.348 4.348a1.74 1.74 0 1 0 0-3.478 1.74 1.74 0 0 0 0 3.478zm4.348 0a1.74 1.74 0 1 0 0-3.478 1.74 1.74 0 0 0 0 3.478zm3.84-4.783a1.304 1.304 0 1 0 0-2.608 1.304 1.304 0 0 0 0 2.608zm0 4.348a1.304 1.304 0 1 0 0-2.608 1.304 1.304 0 0 0 0 2.608zm.001 3.742a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41zM3.985 9.13a1.304 1.304 0 1 0 0-2.608 1.304 1.304 0 0 0 0 2.608zm0-3.94a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41zm0 8.288a1.304 1.304 0 1 0 0-2.608 1.304 1.304 0 0 0 0 2.608zm0 3.742a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41zm8.189.099a1.304 1.304 0 1 0 0-2.609 1.304 1.304 0 0 0 0 2.609zm-4.348 0a1.304 1.304 0 1 0 0-2.609 1.304 1.304 0 0 0 0 2.609zm4.348-12.03a1.304 1.304 0 1 0 0-2.609 1.304 1.304 0 0 0 0 2.609zm3.841-.099a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41zm-8.189.099a1.304 1.304 0 1 0 0-2.609 1.304 1.304 0 0 0 0 2.609zM19.13 8.696a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74zm0 4.347a.87.87 0 1 0 0-1.739.87.87 0 0 0 0 1.74zM.87 8.696a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74zm6.956-6.957a.87.87 0 1 0 0-1.739.87.87 0 0 0 0 1.74zm4.348 0a.87.87 0 1 0 0-1.739.87.87 0 0 0 0 1.74zM7.826 20a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74zm4.348 0a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74zM.87 13.043a.87.87 0 1 0 0-1.739.87.87 0 0 0 0 1.74z'))
        // 图标集：图标|文库
        + V_ui_symbol(_icoDocLib_,
            V_ui_path('M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm.001 7h-14a2 2 0 0 0-2 2h6a3 3 0 0 0 6 0h6l-.005-.15A2 2 0 0 0 17 7zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 4zm0-3h-14a2 2 0 0 0-2 2h18l-.005-.15A2 2 0 0 0 17 1z'))
        // 图标集：图标|文库-当前页面中打开链接
        + V_ui_symbol(_icoDocLibSelf_,
            V_ui_path('M12.5 19a.5.5 0 1 1 0 1h-5a.5.5 0 1 1 0-1h5zm3.014-19l.35.01A1.2 1.2 0 0 1 17 1.21v12.123a1.5 1.5 0 0 1-1.504 1.497h-.01a6.119 6.119 0 0 0-2.794.621 9.371 9.371 0 0 0-2.192 1.475v.046H18a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1v-1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7.5V18h-.998l-.002-.001H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5c.813 0 1.55.324 2.09.849L9.5 4c.582-1.023 1.31-1.927 2.7-2.85C13.167.51 14.472-.004 15.514 0zM7.5 4H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5V6a2 2 0 0 0-2-2zm7.978-3c-.887 0-2.04.49-2.865 1.062-1.028.712-1.508 1.397-2.001 2.062l-.112.16v11.344l.098-.074c.407-.301.841-.575 1.302-.821l.351-.18a7.118 7.118 0 0 1 3.244-.723.5.5 0 0 0 .505-.497V1.208a.2.2 0 0 0-.19-.2L15.479 1zM8 14v1H3v-1h5zm0-2v1H3v-1h5zM6 6v3H3V6h3z'))
        // 图标集：图标|文库-新标签中打开同站链接
        + V_ui_symbol(_icoDocLibBm_,
            V_ui_path('M17 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14zm1 15H2v1h16v-1zm0-2H2v1h16v-1zm-8-4H2v2h8V9zm7.4-7h-3.6a.6.6 0 0 0 0 1.2h2.15l-3.774 3.776a.6.6 0 0 0 .848.848L16.8 4.048V6.2a.6.6 0 1 0 1.199 0V2.572l-.002-.023V2.53a.598.598 0 0 0-.014-.075l-.004-.015a.6.6 0 0 0-.322-.383l-.013-.006-.014-.006-.012-.005a.595.595 0 0 0-.054-.018l-.013-.003a.6.6 0 0 0-.02-.006l-.017-.003-.05-.008h-.003l-.006-.001.006.001L17.4 2zM5 2H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z'))
        // 图标集：图标|文库-参考注释（脚注）汇总
        + V_ui_symbol(_icoDocLibRef_,
            V_ui_path('M7.5 17h5a.5.5 0 1 1 0 1h-5a.5.5 0 1 1 0-1zm0-17c1.044 0 1.964.534 2.501 1.343A2.989 2.989 0 0 1 12.5 0H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm0 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7.5V3a2 2 0 0 0-2-2zM18 1h-5.5a2 2 0 0 0-2 2v12H18a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm-2.25 5.356l-.001 4.728H17V12h-5v-.915l1.249-.001V6.965l-.624.001v-.61h3.125zM14.5 3c.69 0 1.25.546 1.25 1.22 0 .436-.238.84-.625 1.057a1.276 1.276 0 0 1-1.25 0 1.215 1.215 0 0 1-.625-1.057c0-.674.56-1.22 1.25-1.22z'))
        // 图标集：图标|文库-新标签中打开外部链接
        + V_ui_symbol(_icoDocLibExt_,
            V_ui_path('M20 10a9.95 9.95 0 0 0-.773-3.856v-.037h-.013A10.006 10.006 0 0 0 10.116.006L10.104 0l-.008.004C10.063.004 10.03 0 10 0 4.477 0 0 4.479 0 10c0 5.523 4.476 10 10 10 .031 0 .063-.004.094-.004a.07.07 0 0 1 .01.004l.012-.006C15.584 19.931 20 15.484 20 10zm-9.894 8.621c-.696-.577-1.945-2-2.517-5.037h5.028c-.573 3.045-1.821 4.466-2.511 5.037zM7.43 12.434a19.427 19.427 0 0 1 .061-5.176h5.223a19.214 19.214 0 0 1 .065 5.176H7.43zM1.15 10c0-.957.157-1.877.44-2.741h4.723a21.412 21.412 0 0 0-.177 2.81c0 .862.053 1.64.133 2.365h-4.77A8.778 8.778 0 0 1 1.15 10zm8.95-8.593c.661.589 1.803 1.982 2.41 4.7H7.69c.601-2.727 1.737-4.11 2.41-4.7zm3.796 5.852h4.514c.281.864.439 1.784.439 2.741 0 .846-.126 1.66-.349 2.434h-4.56c.08-.725.133-1.503.133-2.365 0-1.035-.066-1.968-.177-2.81zm4.04-1.152h-4.232c-.484-2.374-1.358-3.88-2.127-4.807a8.872 8.872 0 0 1 6.359 4.807zM8.66 1.263c-.774.923-1.667 2.438-2.157 4.844h-4.44a8.855 8.855 0 0 1 6.597-4.844zM1.914 13.584h4.517c.458 2.583 1.373 4.19 2.18 5.146a8.87 8.87 0 0 1-6.697-5.146zm9.716 5.109c.8-.96 1.696-2.562 2.147-5.109h4.307a8.874 8.874 0 0 1-6.454 5.109z'))
        // 图标集：图标|引用块折叠、details、summary 打开详情
        + V_ui_symbol(_icoDetailsOpen_,
            V_ui_path('M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm1 3H8v5H3v2h5v5h2v-5h5V8h-5V3z'))
        // 图标集：图标|检查
        + V_ui_symbol(_icoCheck_,
            V_ui_path('M6.323.102a19.026 19.026 0 0 0 5.27 2.566c.242.074.407.3.406.556V5.31a10.05 10.05 0 0 1-1.444 5.306L9.05 9.134A3.8 3.8 0 0 0 5.98 3.1a3.79 3.79 0 0 0-2.684 1.115 3.794 3.794 0 0 0-.18 5.137 3.802 3.802 0 0 0 5.109.607l1.65 1.625c-.963 1.183-2.212 2.055-3.668 2.374a.58.58 0 0 1-.208.042.662.662 0 0 1-.203-.036c-3.541-.78-5.858-4.828-5.794-8.66V3.225c0-.256.164-.48.405-.555A19.024 19.024 0 0 0 5.674.102a.566.566 0 0 1 .65 0zM6.02 4.447c.66 0 1.279.257 1.747.72a2.469 2.469 0 0 1-1.747 4.217A2.468 2.468 0 0 1 3.547 6.91 2.457 2.457 0 0 1 6.02 4.447z'))
        // 图标集：图标|内容助手-表格阅读模式（十字光标）
        + V_ui_symbol(_icoTableX_,
            V_ui_path('M15.6 0A2.4 2.4 0 0 1 18 2.4v11.2a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 13.6V2.4A2.4 2.4 0 0 1 2.4 0h13.2zM12 1H6v4.5A1.5 1.5 0 0 1 4.5 7H1v5h3.5A1.5 1.5 0 0 1 6 13.5V15h6v-1.5a1.5 1.5 0 0 1 1.5-1.5H17V7h-3.5A1.5 1.5 0 0 1 12 5.5V1zm-1.5 6A1.5 1.5 0 0 1 12 8.5v2a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 6 10.5v-2A1.5 1.5 0 0 1 7.5 7h3zm-.167 1H7.667A.667.667 0 0 0 7 8.667v1.666c0 .369.298.667.667.667h2.666a.667.667 0 0 0 .667-.667V8.667A.667.667 0 0 0 10.333 8z'))
        // 图标集：图标|内容助手-表格、代码的换行、不换行
        + V_ui_symbol(_icoWrapUnwrap_,
            V_ui_path('M12 0a2 2 0 0 1 2 2h5.5a.5.5 0 1 1 0 1H14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h10zM2.5 3a.5.5 0 0 1 0-1H13a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1H2.5zM17 5.1c.961.52 1.628.953 2 1.3.372.347.705.847 1 1.5l-2.001-.001L18 10.5a2.9 2.9 0 0 1-2.9 2.9h-.801l.001 2.1c-.673-.383-1.173-.75-1.5-1.1-.327-.35-.76-.984-1.3-1.9.52-.961.953-1.628 1.3-2 .347-.372.847-.705 1.5-1l-.001 2.1h.801a1.1 1.1 0 0 0 1.1-1.1l-.001-2.6H14c.383-.673.75-1.173 1.1-1.5.35-.327.984-.76 1.9-1.3zM8 7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6zm-2.5 6h-3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1zm2-2h-5a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1zm0-2h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z'))
        // 图标集：图标|内容助手-画中画
        + V_ui_symbol(_icoPicInPic_,
            V_ui_path('M16 9a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7zM1 8v5a1 1 0 0 0 1 1h3v1H2a2 2 0 0 1-2-2V8h1zm14-8a2 2 0 0 1 2 2v5h-1V2a1 1 0 0 0-.883-.993L15 1H8V0h7zM.471.508a.725.725 0 0 1 1.025 0l3.48 3.48V1.642c0-.365.295-.66.66-.661h.014a.689.689 0 0 1 .675.69L6.32 5.693a.662.662 0 0 1-.2.473.657.657 0 0 1-.466.193l-4.024.004a.689.689 0 0 1-.689-.675v-.013c0-.366.296-.662.661-.662h2.35L.47 1.534a.725.725 0 0 1 0-1.026z'))
        // 图标集：图标|画中画的放大模式
        + V_ui_symbol(_icoZoomIn_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4 7.503l-.117.007a1 1 0 0 0-.883.993v2.492H8.4a1 1 0 0 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V8.504a1 1 0 0 0-1-1zM7.58 3H4.5A1.5 1.5 0 0 0 3 4.5v3.062a1 1 0 0 0 1 1l.117-.007A1 1 0 0 0 5 7.562V5h2.58a1 1 0 1 0 0-2z'))
        // 图标集：图标|内容助手-画中画的缩小模式
        + V_ui_symbol(_icoZoomOut_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4.58 8H9.5A1.5 1.5 0 0 0 8 9.5v3.062a1 1 0 0 0 1 1l.117-.007a1 1 0 0 0 .883-.993V10h2.58a1 1 0 1 0 0-2zM7 2.503l-.117.007A1 1 0 0 0 6 3.503v2.492H3.4a1 1 0 1 0 0 2h3.1a1.5 1.5 0 0 0 1.5-1.5V3.504a1 1 0 0 0-1-1z"', 'evenodd'))
        // 图标集：图标|复制
        + V_ui_symbol(_icoCopy_,
            V_ui_path('M0 10V3a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3 3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3 3 3 0 0 1-3-3zm15-6H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z'))
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
            + V_ui_path(blankRect, _none_))
        // 图标集：图标|暂停
        + V_ui_symbol(_icoPause_,
            V_ui_path('M3 2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 0h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', _)
            + V_ui_path(blankRect, _none_))
        // 图标集：图标|停止
        + V_ui_symbol(_icoStop_,
            tagRectX + '2" y="2" ' + _width_ + '="12" ' + _height_ + '="12" rx="2"/>'
            + V_ui_path(blankRect, _none_))
        // 图标集：图标|无法播放
        + V_ui_symbol(_icoForbidden_,
            V_ui_path('M3.11 4.523a6.001 6.001 0 0 0 8.368 8.367L3.11 4.523zM4.522 3.11l8.368 8.367A6 6 0 0 0 4.522 3.11zM8 16A8.001 8.001 0 1 1 8.002.002 8.001 8.001 0 0 1 8 16z', _)
            + V_ui_path(blankRect, _none_))
        // 图标集：图标|复选框（未选择）
        + V_ui_symbol(_icoChkbox__ + _no_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm-.5 2h-5c-.69 0-1.315.28-1.768.732A2.492 2.492 0 0 0 2 4.5v5c0 .69.28 1.315.732 1.768A2.492 2.492 0 0 0 4.5 12h5c.69 0 1.315-.28 1.768-.732A2.492 2.492 0 0 0 12 9.5v-5c0-.69-.28-1.315-.732-1.768A2.492 2.492 0 0 0 9.5 2z" opacity=".5'))
        // 图标集：图标|复选框（已选择）
        + V_ui_symbol(_icoChkbox__ + _yes_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm.435 3.36a1 1 0 0 0-1.393.245L5.703 8.372 4.421 7.09a1 1 0 1 0-1.414 1.414l2.121 2.121a1 1 0 0 0 1.225.15l.01-.007.01-.005a.997.997 0 0 0 .292-.277l4.015-5.734a1 1 0 0 0-.245-1.393z'))
        // 图标集：图标|复选框（不确定选择）
        + V_ui_symbol(_icoChkbox__ + _un_,
            V_ui_path('M10 0a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h6zm0 6H4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2z" opacity=".5'))
        // 图标集：图标|有新版本
        + V_ui_symbol(_icoNewVersion_,
            V_ui_path('M10 20C4.5 20 0 15.5 0 10S4.5 0 10 0s10 4.5 10 10-4.5 10-10 10zm.885-13.548l2.211 2.21a.856.856 0 0 0 1.239 0 .854.854 0 0 0 0-1.237L11.238 4.33c-.707-.707-1.769-.707-2.476 0L5.665 7.425a.854.854 0 0 0 0 1.237.856.856 0 0 0 1.239 0l2.211-2.21v8.664c0 .53.354.884.885.884.53 0 .885-.354.885-.884V6.452z'))
        // 图标集：图标|链接检查结果异常
        + V_ui_symbol(_icoLinkError_,
            V_ui_path('M19.59 14.956l-7.846-13.7c-.96-1.675-2.528-1.675-3.488 0L.41 14.956C-.55 16.632.235 18 2.153 18h15.695c1.917 0 2.701-1.368 1.743-3.044zM8.923 5.143c.282-.307.64-.46 1.078-.46.438 0 .796.151 1.078.454.28.304.42.683.42 1.14 0 .392-.585 3.28-.78 5.38h-1.41c-.171-2.1-.806-4.988-.806-5.38 0-.45.14-.828.42-1.134zm2.136 9.989c-.296.29-.65.436-1.058.436-.408 0-.761-.145-1.058-.436a1.424 1.424 0 0 1-.442-1.056c0-.411.147-.767.442-1.065.297-.298.65-.447 1.058-.447.409 0 .762.149 1.058.447.296.298.443.654.443 1.065 0 .413-.147.765-.443 1.056z'))
        // 图标集：GitHub Style Alert | Note
        + V_ui_symbol(_icoAlert_note_,
            V_ui_path('M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm.25 7h-1a.75.75 0 0 0 0 1.5h.25v2h-.25a.75.75 0 1 0 0 1.5h2a.75.75 0 1 0 0-1.5H9V7.75A.75.75 0 0 0 8.25 7zM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'))
        // 图标集：GitHub Style Alert | Tip
        + V_ui_symbol(_icoAlert_tip_,
            V_ui_path('M5.5 0C8.637 0 11 2.31 11 5.25c0 1.516-.701 2.5-1.328 3.259l-.268.319c-.207.245-.383.453-.541.681-.208.3-.33.595-.37.877a.76.76 0 0 1-.773.616L3.2 11a.748.748 0 0 1-.692-.614c-.04-.282-.163-.577-.37-.877a8.456 8.456 0 0 0-.354-.46l-.456-.54-.237-.296C.537 7.496 0 6.577 0 5.25 0 2.31 2.363 0 5.5 0zM3.25 12h4.5a.75.75 0 1 1 0 1.5h-4.5a.75.75 0 1 1 0-1.5zm.25 3.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75z'))
        // 图标集：GitHub Style Alert | Important
        + V_ui_symbol(_icoAlert_important_,
            V_ui_path('M14.25 0C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25v-9.5C0 .784.784 0 1.75 0h12.5zM8 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.124C7 7.58 7.448 8 8 8s1-.42 1-.938V2.938C9 2.42 8.552 2 8 2z'))
        // 图标集：GitHub Style Alert | Warning
        + V_ui_symbol(_icoAlert_warning_,
            V_ui_path('M9.576.933l6.213 11.471c.296.547.28 1.207-.043 1.739a1.792 1.792 0 0 1-1.533.857H1.787c-.628 0-1.21-.326-1.533-.857a1.744 1.744 0 0 1-.043-1.739L6.424.934c.673-1.245 2.479-1.245 3.152 0zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z'))
        // 图标集：GitHub Style Alert | Caution
        + V_ui_symbol(_icoAlert_caution_,
            V_ui_path('M11 0c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6c0 .199-.08.39-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53L4.47.22C4.61.08 4.801 0 5 0h6zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7c-.552 0-1 .42-1 .938v4.125C7 9.58 7.448 10 8 10s1-.42 1-.938V4.939C9 4.42 8.552 4 8 4z'))
    + '</svg>';
    return ui;
}

/**
 * 加载工具栏 UI 资源
 */
function VLOOKui_toolbar() {
    // ==================================================
    // 页面工具栏
    return V_ui_nav(_, _v_toolbar_ +___+ _v_focus_search_, _,
            // 导航中心
            V_ui_div(_, _v_btn_ +___+ _nav_center_, V_ui_svgIcon(_icoNavCenter_, 20, 18, _btnFc_))
            // 文库
            + V_ui_div(_, _v_btn_ +___+ _doc_lib_, V_ui_svgIcon(_icoDocLib_, 20, 18, _btnFc_))
            + V_ui_div(_, _v_btn_group_ +___+ _prs_,
                // 激光笔
                V_ui_divExt(_, _v_btn_ +___+ _laser_pointer_, V_attr(_data_btn_group_, _prs_),
                    V_ui_svgIcon(_icoLaserPointer_, 18, 20, _btnFc_))
                // 聚光灯
                + V_ui_divExt(_, _v_btn_ +___+ _spotlight_, V_attr(_data_btn_group_, _prs_),
                    V_ui_svgIcon(_icoSpotlight_, 18, 20, _btnFc_))
                // 段落漫游
                + V_ui_divExt(_, _v_btn_ +___+ _paragraph_nav_, V_attr(_data_btn_group_, _prs_),
                    V_ui_svgIcon(_icoParagraphNav_, 20, 18, _btnFc_))
            )
            // 分隔符
        );
}

/**
 * 加载导航中心 UI 资源
 */
function VLOOKui_allNav() {
    // ==================================================
    // 逐章导航栏
    let classSvgChpNav = _v__ + "svg-chp" + __nav_,
        ui = V_ui_nav(_, _v_chapter_nav_ +___+ _v_focus_search_, _,
            // 上一章
            V_ui_div(_, _v_chapter_nav_ + __prev,
                V_ui_svgIcon(_icoPrevChapter_, 10, 15, _btnFc_, classSvgChpNav +___+ _left_)
                + V_ui_div(_, _v_chapter_nav_ + __prev + __text_)
            )
            // 文档标题
            + V_ui_div(_, _v_chapter_nav_ + __doc_title_)
            // 当前章节
            + V_ui_div(_, _v_chapter_nav_ + __current_)
            // 下一章
            + V_ui_div(_, _v_chapter_nav_ + __next_,
                V_ui_div(_, _v_chapter_nav_ + __next_ + __text_, _next_)
                + V_ui_svgIcon(_icoPrevChapter_, 10, 15, _btnFc_, classSvgChpNav +___+ _right_)
            )
        );

    // --------------------------------------------------
    // 导航中心
    let classTocFilterResult = _v_index_filter_result_ +___;
    ui += V_ui_nav(_, _v_nav_center_, V_attr(_data_title_, V_lang_text6()),
        // --- 导航中心头部 ---
        V_ui_div(_, _v_nav_center_ + __header_,
            // 关键字搜索
            V_ui_div(_, _v_search_by_keyword_)
            // 分段控制器组件
            + V_ui_nav(_, _v_segment_ + " toc"), _)
            // 导航历史标题
            // --- 导航中心内容区 ---
            + V_ui_div(_, _v_nav_center_ + __body_,
                V_ui_nav(_vlook_toc_, _, V_attr(_data_toc_empty_, "( " + V_lang_text35() + V_lang_text66() + " )"))
                + V_ui_nav(_, classTocFilterResult + _toc_, _)
                + V_ui_nav(_, classTocFilterResult + _figure_, _)
                + V_ui_nav(_, classTocFilterResult + _table_, _)
                + V_ui_nav(_, classTocFilterResult + _codeblock_, _)
                + V_ui_nav(_, classTocFilterResult + _formula_, _)
                + V_ui_nav(_, classTocFilterResult + _media_, _)
            )
        // + V_ui_div(_, _v_nav_center_ + __footer_)
    );

    // --------------------------------------------------
    // 导航中心收起/展开引导把手
    ui += V_ui_div(_, _v_nav_center_handle_);

    // --------------------------------------------------
    // 段落漫游遮罩
    ui += V_ui_divExt(_v_para_nav_mask_border_, _, V_attr(_data_title_, V_lang_text(34, ["暂停", _Pause_])), _);

    return ui;
 }

 /**
 * 加载文档导航/文档浏览历史 UI 资源
 */
function VLOOKui_documentNavHistory() {
    return V_ui_nav(_, _v_nav_history_, _,
        V_ui_div(_, _v_resume_reading_,
            V_lang_text78() + V_ui_svgIcon(_icoTocFolded_, 16, 16, _text_))
        + V_ui_div(_, _v_view_history_ +___+ _v_transition_all_, V_ui_svgIcon(_icoNavHistory_, 20, 19, _text_))
    );
}

/**
 * 加载共用的 UI 资源
 */
function VLOOKui_common() {
    // --------------------------------------------------
    // 聚光灯
    let ui = V_ui_div(_, _v_spotlight_, V_ui_div(_, _));

    // --------------------------------------------------
    // 字体风格选择器
    let previewPath = _vlookPagesHost_CloudFlare_ + "/pic/";
    ui += V_ui_aside(_, _v_font_style_, V_attr(_data_title_, V_lang_text41()),
            V_ui_div(_, _v_font_style_restore_, "↺ " + V_lang_text(85, ["重置回主题配套字体风格", _Reset_ + " to " + _theme_ +___+ _font_ +___+ _style_]))
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_local_, "默认 Default", previewPath + "fs-local.png", previewPath + "fs-local@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _local_ +___+ _done_,
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_book_, "书香里 Book", previewPath + "fs-book.png", previewPath + "fs-book@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _book_ +___+ _done_,
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_albb_, "活力派 Vibrant", previewPath + "fs-albb.png", previewPath + "fs-albb@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _albb_,
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_gov_, "公文风 Gov", previewPath + "fs-gov.png", previewPath + "fs-gov@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _gov_ +___+ _done_,
                    V_ui_span(_, _, "✅ " + _Ready_)
                )
            )
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_serif_, "文艺范 Artsy", previewPath + "fs-serif.png", previewPath + "fs-serif@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _serif_,
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_span(_v_font_style_opt_, _,
                V_ui_img(_v_font_style_opt_sans_, "小清新 Fresh", previewPath + "fs-sans.png", previewPath + "fs-sans@2x.png 2x", _lazy_)
                + V_ui_div(_, _v_font_info__ + _sans_,
                    V_ui_span(_, _, _notLoaded_)
                )
            )
            + V_ui_div(_, _v_font_style_download_, _)
        );

    // --------------------------------------------------
    // 正文区左下角的字体加载进度
    ui += V_ui_div(_, _v_font_style_current_ +___+ _v_float_card2_, V_lang_text41());

    // --------------------------------------------------
    // 插图导航面板
    ui += V_ui_aside(_, _v_fig_nav_ +___+ _v_backdrop_blurs_, _,
            V_ui_div(_, _v_fig_content_ +___+ _loading_)
            + V_ui_div(_, _v_fig_nav_ + __title_)
            + V_ui_div(_, _v_fig_nav_btn_ +___+ _prev_, V_ui_svgIcon(_icoPrevFig_, 12, 54, _current_color_))
            + V_ui_div(_, _v_fig_nav_btn_ +___+ _next_, V_ui_svgIcon(_icoPrevFig_, 12, 54, _current_color_))
            + V_ui_div(_, _v_btn_ + __close_figure_nav_, V_ui_svgIcon(_icoClose_, 16, 16, _btnFc_))
        );

    // --------------------------------------------------
    // 脚注弹层
    ui += V_ui_aside(_, _v_fontnote_pn_, V_attr(_data_title_, V_lang_text(84, ["脚注", "Footnote"])),
            V_ui_div(_, _v_fontnote_pn_content_, _)
            + V_ui_div(_, _v_fontnote_pn_ + __footer_, V_ui_a(_, _, V_lang_text22() + " ❯❯")
            + V_ui_a(_vk_footer_area_, _, V_lang_text22()))
        );

    // --------------------------------------------------
    // 复制内容的按钮
    let classBtnAssistor = _v_btn_ +___+ _assistor_ +___;
    ui += V_ui_div(_, _v_content_assistor_ +___+ _v_float_card_,
            V_ui_div(_, classBtnAssistor + _copy_, V_ui_svgIcon(_icoCopy_, 18, 16, _btnFc_))
            // + V_ui_div(_, classBtnAssistor + _open_in_figure_nav_, V_ui_svgIcon(_icoOpenInFigureNav_, 18, 16, _btnFc_))
            + V_ui_div(_, classBtnAssistor + _table_cross_, V_ui_svgIcon(_icoTableX_, 18, 16, _btnFc_))
            + V_ui_div(_, classBtnAssistor + _wrap_, V_ui_svgIcon(_icoWrapUnwrap_, 20, 16, _btnFc_))
            + V_ui_div(_, classBtnAssistor + _pic_in_pic_, V_ui_svgIcon(_icoPicInPic_, 18, 16, _btnFc_))
        );

    // --------------------------------------------------
    // 画中画容器
    let classPinBtn = _v_pip_btn_ +___+ _zoom_out_ +___+ _v_float_card_ +___;
    ui += V_ui_aside(_, _v_pic_in_pic_, _,
            V_ui_div(_, classPinBtn + _zoom_, V_ui_svgIcon(_icoZoomIn_, 16, 16, _theme_))
            + V_ui_div(_, classPinBtn + _close_, V_ui_svgIcon(_icoResetInput_, 16, 16, _theme_))
            + V_ui_div(_, _v_content_)
        );

    // --------------------------------------------------
    // 提示信息
    ui += V_ui_div(_, _v_tool_tips_)
        + V_ui_div(_, _v_info_tips_ +___+ _v_float_card_);

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += V_ui_div(_, _v_more_doc_content_ + _before_ +___+ _no_more_)
        + V_ui_div(_, _v_more_doc_content_ + _after_);

    // --------------------------------------------------
    // 表格阅读模式（十字光标）
    let classTableCross = _v_tbl_x_.xD() +___;
    ui += V_ui_div(_, classTableCross + _left_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + "-up", _nbsp_)
        + V_ui_div(_, classTableCross + _left_ + __down, _nbsp_)
        + V_ui_div(_, classTableCross + _right_ + __down, _nbsp_);

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += V_ui_aside(_, _v_link_info_list_ +___+ _v_float_card_, _,
            V_ui_nav(_, _v_link_info_list_ + __items_, _)
        );

    // --------------------------------------------------
    // 适配宽度
    // 对应的样式要与 v-nav-center-handle 及 hover 保持一致
    ui += V_ui_div(_, _v_fill_width_, V_ui_svgIcon(_icoMaskCloser_, 14, 60, _alpha_));

    // --------------------------------------------------
    // 状态栏
    ui += V_ui_nav(_, _v_status_bar_ +___+ _v_focus_search_, _,
            V_ui_div(_, _v_status_bar_ + __handle_, V_ui_svgIcon(_icoTocFolded_, 16, 16, _text_))
            + V_ui_div(_, _v_doc_info_, "- -")
            + V_ui_div(_, _v_prs_info_, _)
            + V_ui_div(_, _v_new_version_, V_ui_svgIcon(_icoNewVersion_, 20, 20, _text_))
            + V_ui_div(_, _v_link_chk_result_, V_ui_svgIcon(_icoLinkError_, 20, 18, _text_))
            + V_ui_div(_, _v_link_map_, V_ui_svgIcon(_icoLinkMap_, 20, 20, _text_))
            + V_ui_div(_, _v_sts_font_style_, V_ui_svgIcon(_icoFontStyle_, 18, 18, _text_))
            + V_ui_div(_, _v_sts_gray_, V_ui_svgIcon(_icoGray_, 20, 20, _text_) + _nbsp_ + V_lang_text48())
            + V_ui_div(_, _v_color_scheme_, V_ui_svgIcon(_icoDarkMode_, 20, 20, _text_))
        );

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += V_ui_iframe(_, _vlook_stat_github_);
    // 针对 debug 模式时不上报到这个渠道
    if (!V_devMode)
        ui += V_ui_iframe(_, _vlook_stat_cloudflare_);

    // --------------------------------------------------
    // 检查新版本
    ui += V_ui_iframe(_vlook_chk_update_cloudflare_, _);
    ui += V_ui_iframe(_vlook_chk_update_github_, _);

    // --------------------------------------------------
    // 文库显示区
    ui += V_ui_aside(_, _v_doc_lib_ +___+ _v_float_card_, V_attr(_data_title_, V_lang_text7()),
        V_ui_iframe(_, _vlook_doc_lib_, _lazy_)
    );
    return ui;
}

// ==================== 加载与初始化 VLOOK ==================== //

// 对插图（img）、内嵌流媒体平台（iframe）等内容，启用「懒加载」特性
function V_lazyLoading() {
    // 先调整 src 属性以避免立即加载
    $(_img_ + "," + gSelector_iframeVideo).e((index, element) => {
        let _t = $(element),
            src = _t.a(_src_),
            srcset = _t.a(_srcset_),
            ext = V_getExtension(src);
        // 只处理插图、非多媒体
        if (V_length(ext) > 1 && (_mp3_ + _m4a_ + _ogg_ + _wav_ + _mp4_ + _ogv_ + _webm_).i(ext) === -1) {
            _t.a(_loading_, _lazy_);
            _t.a(_data_src_, _t.a(_src_));
            JQ_removeAttr(_t, _src_);
            srcset !== gUndefined
                && (
                    _t.a(_data_srcset_, _t.a(_srcset_)),
                    JQ_removeAttr(_t, _srcset_)
                );
        }
    });

    // 绑定「懒加载」处理
    $(V_attrCSS(_loading_) + V_attrCSS(_data_src_)).e((index, element) => {
        gResObserver.observe(element);
    });
}

// 处理观察目标元素与视口（viewport）交集的变化情况，如果浏览到该对象时才进行加载
let gResObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let _t = $(entry.target);
            // 对 src 属性的处理
            _t.a(_src_, _t.a(_data_src_)); // 替换为真实的 URL
            JQ_removeAttr(_t, _data_src_); // 移除自定义属性
            // 对 srcset 属性的处理
            _t.a(_srcset_)
                && (
                    _t.a(_srcset_, _t.a(_data_srcset_)), // 替换为真实的 URL
                    JQ_removeAttr(_t, _data_srcset_) // 移除自定义属性
                );
            // 停止观察
            observer.unobserve(_t[0]);

            // 针对图片标签的处理
            V_tagName(_t) === _img_
                && (
                    // 图片加载结果的处理
                    V_bindLoadChecker(_t),
                    // 对图片剪影的处理
                    V_lazyLoading_imageFilling(_t, _t.a(_src_), V_getUrlQueryParams(JS_encodeURI(_t.a(_src_))))
                );
        }
    });
});

/**
 * 懒加载中对图片剪影的处理
 * @param fig img 对象
 * @param src img 对象的 src 值
 * @param params — img 对象 src 值的 URL 参数数组
 */
function V_lazyLoading_imageFilling(fig, src, params) {
    let fill = params[_fill_];
    if (fill === gUndefined)// && tagName !== _kbd_ && tagName !== "a")
        return;

    fig.a(_data_img_fill_, fill);

    // 注意：为适配浏览器安全策略！！！
    // 由于不同浏览器的安全策略不同，所以针对不同浏览器的图片剪影处理进行微调
    // 若 SVG 文件与当前 HTML 文件不在同一域名下，浏览顺会存跨域权限问题无法完成处理
    // 非 Firefox / Safari 以本地打开方式下无法进行处理
    let httpMode = WINDOW_getHref().sW(_http_),
        canImageFill = (httpMode || env.browser.Firefox || env.browser.Safari),
        hostname = gLocation.hostname,
        imgHost = V_getMetaByName(_vlook__ + _image_ + "-host");

    if (imgHost !== gUndefined && !imgHost.eW("/"))
        imgHost += "/";

    // 针对非 SVG 图片
    if (src.i(_suffixSvg_, 1) === -1)
        fig.on(_load_, () => {
            JQ_addClass(fig, _enabled_);
        });
    // 针对 SVG 图片，同时当前 HTML 的打开方式可进行图片「图片剪影」的适配处理
    else if (canImageFill === gTrue) {
        // 获得图片路径的域名
        let src2ImageFill = src,
            matchRes = src2ImageFill.m(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i),
            srcHost = matchRes && matchRes[1],
            container = fig.p(),
            hash = V_getUrlHash(src);

        // 对于相对路径，或与当前 HTML 域名一致
        if (srcHost === gNull || hostname === srcHost) {
            // 针对 Safari 且指定了默认图床域名
            // 进行图片剪影处理前，先调整原始 <img> 的 src
            let needImgHost = (env.browser.Safari && !httpMode && imgHost !== gUndefined);
            if (needImgHost) {
                src2ImageFill = imgHost + src2ImageFill;
                fig.a(_src_, src2ImageFill);
            }

            // 进行 svg 图片剪影处理，png 图片通过 css 样式实现
            __disposeSvgImageFilling(fig, container, params, hash, src2ImageFill);

            // 恢复原始 <img> 的 src
            needImgHost
                && fig.a(_src_, src);
        }
    }

    /**
     * 对 svg 图片剪影的适配处理
     * @param img img 对象
     * @param container img 对象的父级元素
     * @param params img 对象 src 值的 URL 参数数组
     * @param hash img 对象 hash 值
     * @param src img 对象的 src 值
     */
    function __disposeSvgImageFilling(img, container, params, hash, src) {
        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.i(_suffixSvg_, 1) > -1) {
            SVGInject(img[0], {
                // 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    !V_isNotFigure(hash, container)
                        && ContentAssistor_bind(svgObj, _fig_ + _suffixSvg_);
                    // 对颜色进行替换的适配处理
                    ExtFigure_fillSVG(svgObj.a(_data_img_fill_), svgObj);
                },
                // 注入失败
                onFail : function (img, svg) {
                    ERROR("SVGInject ERROR:", $(img).a(_src_));
                }
            });
        }
    }
}

/**
 * 文档加载完成后执行主流程
 */
$(() => { // 等价于 $(document).ready()

    // 读取动画持续时长配置
    gTransDuration = JS_parseInt(V_getVarVal(___v_trans_dur_ + "-js"));
    gTransDurationLong = JS_parseInt(V_getVarVal(___v_trans_dur_ + "-l-js"));

    // ----------------------------------------
    // 懒加载处理
    V_lazyLoading();

    // ----------------------------------------
    // 初始化启动参数
    V_query_init();

    // 重置所有保存在缓存的 vlook 相关数据
    if (V_getParamVal(_reset_) === _true_) {
        WARN("!!! RESET VLOOK DATA !!!");
        V_data_remove(_new_version_check_time_, gTrue);
        V_data_remove(_last_position_);
        V_data_remove(_color_scheme_, gTrue);
        V_data_remove(_font_style_, gTrue);
    }

    // 判断文档类型
    if (V_getParamVal(_page_ + _mode_) === _mini_)
        V_pageMode = _mini_;

    // ----------------------------------------
    // 初始化语言
    V_lang_init();

    // ----------------------------------------
    // 判断环境并添加对应样式标记，样式名称与 Typora 编辑时的标记保持一致
    env.os.Windows
        ? JQ_addClass(DOM_body(), "os-windows")
        : JQ_addClass(DOM_body(), _html_ + "-" + _for_ + "-mac");

    // ----------------------------------------
    INFO("- Ready");
    gTimes = iStopwatch.ed(_4space_);
    // 打印环境信息
    env.info();

    iStopwatch.st();
    INFO("=== Load VLOOK™ ===");

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 灰色模式 Gray Mode
    GrayMode_init();

    // ----------------------------------------
    // 动效初始化
    // iStopwatch.st("* Effect");
    let effect = V_getParamVal(_effect_);
    V_ui_effect = (effect === gNull) ? 2 : JS_parseInt(effect);
    V_ui_effect = V_isMobile() ? 0 : V_ui_effect;
    LOG("    └ Level [ " + V_ui_effect + " ]");
    // V_ui_initEffectLevel();
    // iStopwatch.ed(_cost_);

    // 先隐藏文档原始内容，减少页面重绘
    VOM_doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.st("* Welcome Page Init");
    let wsMode = V_getParamVal("ws");
    wsMode = (wsMode === gNull) ? _auto_ : wsMode;
    LOG("    └ mode: " + wsMode);
    WelcomePage_init(wsMode);

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (!V_checkSpec()) {
        V_byClass(_v_welcome_page_).hide();
        V_byClass(_v_toolbar_).hide();
        V_byClass(_v_btn_).hide();
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
    V_later(loadVLOOKplugin, 100);
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
    V_byClass(_v__ + _vlook__ + "inside").af(
        VLOOKui_welcomePage()
        + VLOOKui_cc()
        + VLOOKui_checkHash()
        + VLOOKui_iconSet()
        + VLOOKui_toolbar()
        + VLOOKui_allNav()
        + VLOOKui_documentNavHistory()
        + VLOOKui_common());
}

/**
 * 加载 VLOOK 插件
 */
function loadVLOOKplugin() {
    // ----------------------------------------
    // 推荐的浏览器类型检测
    iStopwatch.st("* Browser Check");
    !env.browser.Chrome && !env.browser.Edge && !env.browser.Firefox && !env.browser.Safari && !env.core.webkit
        && ALERT(V_lang_text(79, [
            "为获得最佳兼容性，建议使用 Chrome/Firefox/Edge 浏览器",
            "For best compatibility, it is recommended to use Chrome/Firefox/Edge browser"
        ]));

    iStopwatch.ed(_4space_);

    // ========================================
    // 初始化 VLOOK 核心模块
    V_initKernel();

    // // ----------------------------------------
    // // 动效初始化
    iStopwatch.st("* Effect");
    // let effect = V_getParamVal(_effect_);
    // V_ui_effect = (effect === gNull) ? 2 : JS_parseInt(effect);
    // V_ui_effect = V_isMobile() ? 0 : V_ui_effect;
    // LOG("    └ Level [ " + V_ui_effect + " ]");
    V_ui_initEffectLevel();
    iStopwatch.ed(_cost_);

    // ----------------------------------------
    // 修改主题默认的圆角风格
    let newRadius = V_getParamVal(_radius_);
    if (newRadius === _small_ || newRadius === "big") {
        // 批量修改圆角相关的 CSS 变量为指定的新值
        V_changeCssVarSet([
            _v_r_b_,
            _v_r_s_,
            _v_r_t_,
            _v_r_tag_,
            _v_r_c_
        ], newRadius);
    }
    else if (newRadius === _none_) {
        // 批量修改圆角相关的 CSS 变量为 0
        V_changeCssVarSet([
            _v_r_b_,
            _v_r_s_,
            _v_r_t_,
            _v_r_tag_,
            _v_r_c_
        ]);
    }

    // ----------------------------------------
    // 统一同组的分栏引用块的高度
    __fork("Quote Unite Columns Height", () => {
        ExtQuote_uniteColumnsHeight();
    }, 2000);

    // ----------------------------------------
    // 段落漫游初始化
    __fork(V_lang_text8(), () => {
        ParagraphNav_init();

        // ----------------------------------------
        // 连续内容转换为页签组
        let tab = V_getParamVal(_tab_);
        tab !== _off_
            && (TabGroup_init(), TabGroup_updateHeight(), V_ui_initEffectLevel());
    }, 1000);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.st("* Write Ready");
    JQ_addClass(VOM_doc(), _v__ + _load_ + "-" + _done_ +___+ _v_focus_search_ +___+ V_pageMode);
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
    // 如没有指定仅支持 Light Mode 时才进行自动适配 Dark Mode 的处理
    if (!gOnlyLightMode) {
        ColorScheme_init();
        INFO("* Appearance [ " + ColorScheme_systemScheme + " ]");
        ColorScheme_scheme = V_getVarVal(___v_color_scheme_);
        // 通过调校参数指定了颜色方案
        let colorScheme = V_getParamVal("cs");
        if (colorScheme === _light_ || colorScheme === _dark_) {
            INFO("    Force [ " + colorScheme + " ]");
            ColorScheme_scheme = colorScheme;
            StsColorScheme_updateIcons();
            ColorScheme_refresh(gTrue);
        }
        // 若没有通过调校参数指定
        else {
            if (colorScheme === gNull)
                colorScheme = V_data_read(_color_scheme_, gTrue);
            // 通过同域配置指定
            if (colorScheme !== gNull && (colorScheme === _light_ || colorScheme === _dark_)) {
                INFO("    From config [ " + colorScheme + " ]");
                ColorScheme_scheme = colorScheme;
                StsColorScheme_updateIcons();
                ColorScheme_refresh();
            }
            // 针对 auto 模式，自动适配
            else {
                INFO("    Auto [ " + ColorScheme_scheme + " ]");
                StsColorScheme_updateIcons();
                ColorScheme_refresh();
            }
        }
    }

    // ----------------------------------------
    // 初始化内容助手
    // 须隐藏文档原始内容前执行，避免部分样式失效
    __fork("Content Assistor", () => {
        ContentAssistor_init();
        PicInPic_init();

        // 设置表格阅读模式的开关状态（不指定则默认关闭）
        V_getParamVal("tr") === _on_
            && TableCross_toggle();
    }, 1000);

    // ----------------------------------------
    // 针对 URL 带锚点的处理
    __fork("Redirect to Hash", () => {
        let redirect = V_redirectTo();
        if (!V_ui_hasCover() && !redirect) {
            iNavCenter.toc.hIdx = 0;
            V_ui_adjustAll();
            ExtQuote_uniteColumnsHeight();
        }
    }, 2000);

    // ----------------------------------------
    // 字数统计
    __fork("Words " + _count_, () => {
        !V_ui_isHidden(StsDocInfo_ui)
            && DocInfo_countWord();

        // 指定默认隐藏状态栏
        V_getParamVal(_sts_) === _hide_ && DOM_body().a(_class_).i(_gray_) === -1
            && StatusBar_hide();
    }, 3000);

    // ----------------------------------------
    // 检查新版本
    !V_isMobile()
        && __fork("Checking " + _for_ +___+ _update_, () => {
            NewVersion_check();
        }, 10000);

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.st();
    INFO("* Welcome Page Done (" + WelcomePage_mode + ")");
    WelcomePage_done();
    iStopwatch.ed(_cost_);

    if (V_ui_hasCover()) {
        VOM_backcover().bf("<hr>");
        VOM_backcover().bf(V_ui_copyrightInfo());
    }
    else {
        VOM_doc().ap("<hr>");
        VOM_doc().ap(V_ui_copyrightInfo());
    }

    // ----------------------------------------
    // 针对触摸操作的样式处理
    // let boxes =  document.querySelectorAll('.btn');
    // boxes.forEach(box => {
    //     // touchstart 添加 active 样式
    //     box.addEventListener('touchstart', () => {
    //         box.classList.add('active');
    //     });
    //     // touchend 移除 active 样式
    //     box.addEventListener('touchend', () => {
    //         box.classList.remove('active');
    //     });
    //     // 防止 touchmove 过程中出现残留状态
    //     box.addEventListener('touchcancel', () => {
    //         box.classList.remove('active');
    //     });
    // });

    // ----------------------------------------
    // 显示 VLOOK 加载完成后的信息
    gTotalTimes = iStopwatch.stop();// - 200;
    INFO("=== !!! MAIN PROCESS DONE !!! ===");
    INFO("TOTAL COST   ⏱ " + gTotalTimes + " ms");
    INFO("    ├ HTML   ⏱ " + gTimes + " ms");
    INFO("    └ VLOOK™  ⏱ " + (gTotalTimes - gTimes) + " ms");

    // ----------------------------------------
    V_pageMode === _max_ && gThmVer !== gVer
        && ALERT([
            "⚠️ 注意 ⚠️\n\n本文档使用的 VLOOK™ 主题与插件版本不匹配，会影响实际使用，请将更新至匹配的版本！！！"
                + `\n\n当前主题 [ ${gThmName} ]\n`
                + `主题版本 [ ${gThmVer} ]\n\n`
                + `插件版本 [ ${gVer} ]`,
            "⚠️ WARNING ⚠️\n\nThe VLOOK™ theme and plugin version used in this " + _document_ + " do not match, which may affect actual use. Please update to the matching version !!!"
                + `\n\nCurrent Theme [ ${gThmName} ]\n`
                + `Theme Version [ ${gThmVer} ]\n\n`
                + `Plugin Version [ ${gVer} ]`
        ][V_lang]);

    // ----------------------------------------
    // 提交统计数据
    V_pageMode === _max_ // 非文库方式显示时才上报
        && V_report_submit(gTotalTimes - gTimes);

    // ----------------------------------------
    // 正文宽度适配可显示宽度
    FillWidth_init();
    // 指定默认启用正文宽度适配可显示宽度
    V_getParamVal(_fill_ + "w") === _on_
        && FillWidth_enable();

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
        V_later(() => {
            let sw = new Stopwatch();
            sw.st("-->> thread [" + msg + "]");
            typeof(callback) === _function_ && callback();
            sw.ed(_4space_);
        }, delay);
    }
}
