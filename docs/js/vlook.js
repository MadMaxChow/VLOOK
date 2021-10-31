/**************************************
 *
 * VLOOK.js - Typora Plugin
 *
 * V12.0
 * 2021-10-30
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * email: maxchow@qq.com
 *
 *
 *
 *************************************/

/***************************************

URL 参数说明

cs
    强制指定颜色方案。light - Light Mode，dark - Dark Mode

dl
    文库功能开关。
    取值范围：none - 关闭

effects
    使用的动效等级。可指定为：0 - 关闭，1 - 标准，2 - 增强

fix-mermaid
    是否启用修正 Mermaid 的渲染 bug。默认启用。
    取值范围：false - 取消修正

lmc
    指定代码块自动生成题注并编号的行数下限，大于该行数的代码才会自动生成题注和编号

reset
    重置指定数据。
    取值范围：
    true: 本地缓存的用户数据

srcset
    在 DPR > 1 时，自动将 src 直接指定 2x 图片
    取值范围：auto - 对于没有指定 srcset 时，自动将当前图片作为 2x 资源

theme
    动态加载指定的主题（仅限在线版本）
    主题名称中的关键名称，如：vlook-hope, vlook-x-apple-support 等

type
    指定文档导航工具启用模式
    取值范围：max - 完整（默认），mini - 迷你（指定的「文库」强制为该类型）

ws
    欢迎页模式。默认完成加载后自动关闭
    取值范围：none - 不显示，wait - 显示，加载完成后需手动关闭

**************************************/

let vlookVersion = "V12.0";

console.log(":::::::::::::::::::");
console.log("!!! " + (vlookDevMode === true ? "- DEV -" : "RELEASED" ) + " !!!");
console.log("::: " + vlookVersion + " :::");
console.log(":::::::::::::::::::");

// 初始化计时器
let iStopwatch = new Stopwatch(),
    gDocLoadTimeCost = 0,
    gTotalLoadTimeCost = 0,
    gLastHash = null;
iStopwatch.lapStart();
console.info("=== Load Document ===");

// UI 元素
let iToolbar = undefined,
    iNavCenter = undefined,
    iChapterNav = undefined,
    iParagraphNav = undefined,
    iDocLib = undefined,
    iMoreDocContent = undefined,
    iSpotlight = undefined,
    iLaserPointer = undefined,
    iFontStyler = undefined,
    iFigureNav = undefined,
    iWelcomePage = undefined,
    iToolTips = undefined,
    iInfoTips = undefined,
    iFootNote = undefined,
    iContentFolder = undefined,
    iLinkChecker = undefined,
    iContentAssistor = undefined;

// ==================== 文档对象模型 ==================== //

function DOM() {}

// 文档的 html 对象
DOM.__html = undefined;
DOM.html = function () {
    if (DOM.__html === undefined) {
        DOM.__html = $("html");
        if (DOM.__html.length === 0) {
            DOM.__html = undefined;
            console.error("Instantiation failed [ DOM.html ]");
        }
    }
    return DOM.__html;
}

// 文档的 body 对象
DOM.__body = undefined;
DOM.body = function () {
    if (DOM.__body === undefined) {
        DOM.__body = $("body");
        if (DOM.__body.length === 0) {
            DOM.__body = undefined;
            console.error("Instantiation failed [ DOM.body ]");
        }
    }
    return DOM.__body;
}

// ==================== VLOOK 对象模型 ==================== //

function VOM() {}

// Markdown 导出为 HTML 的内容对象
VOM.__doc = undefined;
VOM.doc = function () {
    if (VOM.__doc === undefined) {
        VOM.__doc = $("#write");
        if (VOM.__doc.length === 0) {
            VOM.__doc = undefined;
            console.error("Instantiation failed [ VOM.doc ]");
        }
    }
    return VOM.__doc;
}

// 封面对象
VOM.__cover = undefined;
VOM.cover = function () {
    if (VOM.__cover === undefined) {
        VOM.__cover = $("#write > pre.md-meta-block:first-child + h6, #write > h6:first-child");
        if (VOM.__cover.length === 0) {
            VOM.__cover = undefined;
            if (VOM.docTitle() === undefined)
                console.warn("Instantiation failed [ VOM.cover ], maybe no cover");
        }
    }
    return VOM.__cover;
}

// 封底对象
VOM.__backcover = undefined;
VOM.backcover = function () {
    // 注意该方法调用，必须在 #vk-footer-area 的位置调整前完成
    if (VOM.__backcover === undefined) {
        let footnotes = $(".footnotes-area");
        if (footnotes !== undefined) {
            let backcover = footnotes.prev(),
                tagName = backcover.prop("tagName");
            if (tagName !== undefined && tagName.toLowerCase() === "h1")
                VOM.__backcover = backcover;
        }
        else {
            VOM.__backcover = undefined;
            console.warn("Instantiation failed [ VOM.backcover ], maybe no backcover");
        }
    }
    return VOM.__backcover;
}

// 文档标题对象（无封面模式）
VOM.__docTitle = undefined;
VOM.docTitle = function () {
    if (VOM.__docTitle === undefined) {
        VOM.__docTitle = $("#vk-id-doc-title");
        if (VOM.__docTitle.length === 0) {
            VOM.__docTitle = undefined;
            console.warn("Instantiation failed [ VOM.docTitle ]");
        }
    }
    return VOM.__docTitle;
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
    return this !== undefined
        && (this.css("display") === "none" || this.css("visibility") === "hidden" || this.css("opacity") === "0");
}

/**
 * 判断对象是否已显示
 */
$.prototype.isShowed = function () {
    return !this.isHidden();
}

/**
 * 替换 innerHTML 的内容
 *
 * @param regExp 用于匹配内容的正则表达式
 * @param replaceValue 将匹配的内容替换成该内容
*/
$.prototype.replaceHTML = function (regExp, replaceValue) {
    this.html(this.html().replace(regExp, replaceValue));
}

/**
 * 在元素前后以指定的前缀和后缀文本进行包裹
 *
 * @param prefix 前缀文本
 * @param suffix 后缀文本
*/
$.prototype.wrapText = function (prefix, suffix) {
    this.html(prefix + this.html() + suffix);
}

/**
 * 替换所有内容
 */
String.prototype.replaceAll = function (f, e) {
    const reg = new RegExp(f, "g");
    return this.replace(reg, e);
};

/**
 * 从指定内容开始，替换之后的匹配的内容
 *
 * @param startValue 从指定内容出现的位置开始进行替换
 * @param searchValue 被替换的内容
 * @param replaceValue 用于替换的新内容
 */
String.prototype.replaceAfter = function (startValue, searchValue, replaceValue) {
    let sIndex = this.indexOf(startValue);
    if (sIndex > -1) {
        let preStr = this.substring(0, sIndex),
            suffStr = this.substring(sIndex, this.length);
        return preStr + suffStr.replace(searchValue, replaceValue);
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
String.prototype.endWith = function (s) {
    if (s == null || s === "" || this.length === 0 || s.length > this.length)
        return false;
    return this.substring(this.length - s.length) === s;
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
    */

    // 浏览器内核信息
    core : function () {
        const u = navigator.userAgent;
        return {
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webkit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1 //火狐内核
        };
    }(),

    // 设备信息
    device : function () {
        const u = navigator.userAgent;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            iOS: !!u.match(/iphone os/i), // iOS 类终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android 终端或者 UC 浏览器
            iPhone: u.indexOf("iPhone") > -1, // 是否为 iPhone 或者 QQHD 浏览器
            iPad: u.indexOf("iPad") > -1 // 是否 iPad
        };
    }(),

    // 浏览器类型
    browser : function () {
        const u = navigator.userAgent;
        return {
            Chrome: u.indexOf("Chrome") > -1, // Chrome 浏览器
            Firefox: u.indexOf("Firefox") > -1, // Firefox 浏览器
            Safari: u.indexOf("Safari") > -1 && u.indexOf("Version") > -1, // Safari 浏览器
            Edge: u.indexOf(" Edg/") > -1 // Edge 浏览器
        };
    }(),

    // 浏览器版本信息
    browserVersion : function () {
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
     *
     * @param silent 是否为静默模式，静默模式只反馈环境信息值，不打印到控制台
     * @returns string 环境信息
     */
    print : function (silent) {
        let info = "::: Environmental :::\n",
            fullInfo = info;
        if (!silent) console.log(info);

        info = "    ├ Language   [ "
            + env.language.base
            + (env.language.subset.length > 0 ? "_" + env.language.subset : "")
            + " ]\n";
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    ├ Device     [ "
            + (env.device.mobile ? "Mobile" : "")
            + (env.device.iOS ? "/iOS" : "")
            + (env.device.android ? "/Android" : "")
            + (env.device.iPhone ? "/iPhone" : "")
            + (env.device.iPad ? "/iPad" : "")
            + "]\n";
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    ├ OS         " +
            (env.os.macOS ? "[ macOS ]"
                : (env.os.Windows ? "[ Windows ]"
                    : (env.os.iOS ? "[ iOS ]"
                        : (env.os.Linux ? "[Linux]" : "[Others]"))))
            + "\n";
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    ├ Browser    [ "
            + (env.browser.Chrome ? "Chrome / " + env.browserVersion.Chrome : "")
            + (env.browser.Firefox ? " Firefox / " + env.browserVersion.Firefox : "")
            + (env.browser.Safari ? " Safari / " + env.browserVersion.Safari : "")
            + (env.browser.Edge ? " Edge / " + env.browserVersion.Edge : "")
            + " ]\n";
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    ├ Core       [ "
            + (env.core.gecko ? "Gecko" : "")
            + (env.core.presto ? "Presto" : "")
            + (env.core.trident ? "Trident" : "")
            + (env.core.webkit ? "WebKit" : "")
            + " ]\n";
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    └ DPR        [ "
            + env.display.DPR
            + " ]\n"; // Device Pixel Ratio
        fullInfo += info;
        if (!silent) console.log(info);

        info = "    └ VLOOK Type [ "
            + VLOOK.type
            + " ]\n"; // Device Pixel Ratio
        fullInfo += info;
        if (!silent) console.log(info);

        info = navigator.userAgent + "\n";
        fullInfo += info;
        if (!silent) console.log(info);

        return fullInfo;
    },

    // 打印 Mermaid 缩放信息
    printMermaidDPR : function() {
        let info = "::: Mermaid DPR :::\n";
        info += "    ├ DPR of builder  [ " + RepairTool.mermaidDPR.builder
            + " ]\n";
        info += "    └ DPR of render   [ " + RepairTool.mermaidDPR.render
            + " ]\n";

        console.log(info);
        return info;
    },

    /**
     * 屏幕上显示环境信息、Mermaid 信息等
     **/
    show : function () {
        let info = env.print() + env.printMermaidDPR();
        info += "\n----------\nPowered by MAX°孟兆\n";
        alert(info);
    }
};

// ==================== VLOOK 关键信息类 ==================== //

function VLOOK() {}

// 版本信息
VLOOK.version = vlookVersion;

// 是否为开发模式
VLOOK.debugMode = vlookDebugMode;

// 插件运行类型：max, pro, mini
VLOOK.type = "max";

// VLOOK 的启动参数
VLOOK.params = {
    __url : [],
    __yaml : [],

    init : function () {
        VLOOK.params.__url = VLOOK.util.getQueryParams(window.location.href);
        let vp = VLOOK.util.getMetaByName("vlook-query");
        VLOOK.params.__yaml = VLOOK.util.getQueryParams("file.html" + (vp !== undefined ? "?" + vp : ""));
    }
}

/**
 * 在 debug 模式下输出调试信息
 */
VLOOK.debug = function (...info) {
    if (VLOOK.debugMode === true)
        console.warn(...info);
}

/**
 * VLOOK 本地数据读/写
 */
VLOOK.data = {
    // 获得数据
    get : function (key) {
        return localStorage["VLOOK-" + key];
        // return localStorage["VLOOK-" + VLOOK.version + "-" + key];
    },
    // 写入数据
    set : function (key, value) {
        localStorage["VLOOK-" + key] = value;
        // localStorage["VLOOK-" + VLOOK.version + "-" + key] = value;
    }
}

/**
 * 工具
 */
VLOOK.util = {
    /**
     * 获取 HTML <meta> 标签的内容
     * @param metaName 指定 meta 的名称
     * @returns 指定 meta 的内容
     */
    getMetaByName (metaName) {
        let content = $("meta[name='" + metaName + "']").attr("content");
        return (content === "${" + metaName + "}" ? undefined : content);
    },

    /**
     * 获取启动参数的值
     *
     * @param param 启动参数名称
     * @returns 启动参数的值
     */
    getParamValue : function (param) {
        let value = VLOOK.params.__url[param];
        // URL 中无指定，则深度通过 YAML 中获取
        if (value === undefined)
            value = VLOOK.params.__yaml[param];
        return value;
    },

    /**
     * 获取 URL 中的参数数组
     *
     * @param url 完整的 URL 内容
     */
    getQueryParams : function (url) {
        let hash = url.indexOf("#");
        url = hash > -1 ? url.substring(0, hash) : url; // 只截取 URL 中 # 前的内容

        let start = url.indexOf("?"),
            queryStr = url.substring(start > -1 ? start + 1 : url.length, url.length), // 获取url中"?"符后的字串
            args = {}, // 保存参数数据的对象
            items = (queryStr.length > 0) ? queryStr.split("&") : [], // 取得每一个参数项,
            item = null,
            len = items.length;

        // 将所有参数拆解至数组中
        for (let i = 0; i < len; i++) {
            item = items[i].split("=");
            let name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
            if (name) {
                args[name] = value;
            }
        }
        return args;
    },

    /**
     * 获取 URL 中的参数字符串
     *
     * @param url 完整的 URL 内容
     */
    getQueryString : function (url) {
        let queryIndex = url.indexOf("?");
        return queryIndex > -1 ? url.substring(queryIndex + 1, url.length) : "";
    },

    /**
     * 获得 URL 中的路径部分
     *
     * @param url URL 地址
     */
    getPath : function (url) {
        let queryIndex = url.indexOf("?"),
            tmpIndex = url.substring(0, queryIndex).lastIndexOf("/"),
            pathIndex = tmpIndex === -1 ? 0 : tmpIndex;
        return url.substring(0, pathIndex + 1);
    },

    /**
     * 进行 HTML 特殊符号进行转义
     *
     * @param text 原始文本
     * @return String 转义后文本
     */
    htmlEncode : function (text) {
        if (text.length === 0)
            return "";
        text = text.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/ /g, "&nbsp;")
            .replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;")
            .replace(/<br>/g, "");
        return text;
    },

    /**
     * 进行 HTML 标签符转义
     *
     * @param text 原始文本
     * @return String 转义后文本
     */
    htmlTagEncode : function (text) {
        if (text.length === 0)
            return "";
        text = text.replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return text;
    },

    /**
     * 进行 HTML 单、双引号转义
     *
     * @param text 原始文本
     * @return String 转义后文本
     */
    htmlQuotEncode : function (text) {
        if (text.length === 0)
            return "";
        text = text.replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;");
        return text;
    },

    /**
     * 清理 HTML 中的单、双引号
     *
     * @param text 原始文本
     * @return String 清理后的文本
     */
    clearHtmlQuot : function (text) {
        if (text.length === 0)
            return "";
        text = text.replace(/'/g, "")
            .replace(/"/g, "");
        return text;
    },

    /**
     * 处理并返回省略后的文本
     *
     * @param text 原始文本
     * @param limit 头、尾长度限制
     * @return String 省略后的文本
     */
    ellipsisText : function (text, limit) {
        // 多个空格替换为 1 个
        text = text.replace(/\s+/g, " ");

        // 不需要进行省略处理
        if (text.length <= limit * 2)
            return VLOOK.util.htmlTagEncode(text);

        // 默认先按 1 个字占 1 个字节长度取头、尾部分
        let header = text.substring(0, limit).trim(),
            tailer = text.substring(text.length - limit, text.length).trim();
        // 判断头、尾部分是否含中文
        let cjkHeader = header.match(/\p{Unified_Ideograph}/ug),
            cjkTailer = tailer.match(/\p{Unified_Ideograph}/ug);
        if (cjkHeader != null && cjkHeader.length > 0)
            header = __getChars(header, limit, cjkHeader);
        if (cjkTailer != null && cjkTailer.length > 0)
            tailer = __getCharsReversal(tailer, limit, cjkTailer);

        /**
         * 正序获取字符串（ 1 个 CJK 算两个字符）
         *
         * @param {*} str 原始字符
         * @param {*} limit 限制长度
         * @param {*} cjk CJK 字符数组
         * @returns 新的字符串
         */
        function __getChars(str, limit, cjk) {
            let count = 0;
            while (limit > 0) {
                if (cjk.indexOf(str[count]) > -1)
                    limit -= 2;
                else
                    limit--;
                count++;
            }
            return str.substring(0, count);
        }
        /**
         * 反序获取字符串（ 1 个 CJK 算两个字符）
         *
         * @param {*} str 原始字符
         * @param {*} limit 限制长度
         * @param {*} cjk CJK 字符数组
         * @returns 新的字符串
         */
        function __getCharsReversal(str, limit, cjk) {
            let count = 0,
                len = str.length - 1;
            while (limit > 0) {
                if (cjk.indexOf(str[len - count]) > -1)
                    limit -= 2;
                else
                    limit--;
                count++;
            }
            return str.substring(len + 1 - count);
        }

        return VLOOK.util.htmlTagEncode(header + " . . . " + tailer);
    },

    /**
     * 重定位至锚点
     *
     * @return boolean true：已进行重定向，false：无须进行重定向
     */
    redirectToHash : function () {
        let hash = window.location.hash;
        // 如果 URL 带锚点
        if (hash.length > 0 && hash !== "#vk-id-doc-title") {
            console.log("    ↩ Redirect to hash: " + decodeURI(hash));
            window.location.href = "#"; // 强制先清空当前 hash
            window.location.href = hash;
            // 若最后访问的锚点与本次相同，则强制进行一次微调
            setTimeout(function () {
                VLOOK.ui.tuningScrollTop(hash);
            }, 300);
            return true;
        }
        return false;
    },

    /**
     * 跳转至页内锚点，并自动进行位置微调适配
     */
    gotoHash : function (hash) {
        let lastHash = decodeURI(window.location.hash);
        window.location.href = hash;
        // 若前后锚点一样，则会导致不会触发 hashchange 事件，须强制进行一次微调
        if (lastHash === decodeURI(hash))
            VLOOK.ui.tuningScrollTop(hash);
    },

    /**
     * 获取 CSS 变量值
     *
     * @param varName CSS 变量名
     */
    getStyleValue : function (varName) {
        return getComputedStyle(document.documentElement).getPropertyValue(varName);
    },

    /**
     * 设置 CSS 变量值
     *
     * @param varName CSS 变量名
     * @param varValue CSS 变量值
     */
    setStyleValue : function (varName, varValue) {
        document.documentElement.style.setProperty(varName, varValue);
    }
} // 工具

/**
 * 通用的格式化操作
 */
VLOOK.formatting = {
    /**
     * 添加千位符
     *
     * @param value 需要进行格式化的目标字符串
     * @returns string 格式化后的字符串
     */
    thousands : function (value) {
        return value.replace(/(\d)(?=(\d{3})+(\.\d+)*(\D)*$)/g, "$1,");
    },

    /**
     * 对小数部分进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @returns string 格式化后的字符串
     */
    decimal : function (target) {
        return target.replace(/\.(\d+)/, ".<span class='mdx-tbl-col-fmt-num-decimal'>$1</span>");
    },

    /**
     * 对百分号进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @returns string 格式化后的字符串
     */
    percent : function (target) {
        return target.replace(/%</, "<span class='mdx-tbl-col-fmt-percent'> %</span><");
    },

    /**
     * 对货币符号进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @returns string 格式化后的字符串
     */
    currency : function (target) {
        // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
        return target.replace(/(>.{1,3}\s)/, "><span class='mdx-tbl-col-fmt-currency'$1</span>");
    }
}

/**
 * 检查文档结构是否符合 VLOOK 规范程度
 */
VLOOK.checkSpecification = function () {
    let valid = true,
        missContent = [
            "因以下原因无法激活 VLOOK 插件：\n\n",
            "因以下原因無法激活 VLOOK 插件：\n\n",
            "The VLOOK plugin cannot be activated for the following reasons:\n\n",
            "Le plugin VLOOK ne peut pas être activé pour les raisons suivantes:\n\n",
            "Das VLOOK-Plugin kann aus folgenden Gründen nicht aktiviert werden:\n\n",
            "El complemento VLOOK no se puede activar por las siguientes razones:\n\n",
            "Плагин VLOOK не может быть активирован по следующим причинам:\n\n",
            "次の理由により、VLOOKプラグインをアクティブ化できません：\n\n",
            "다음과 같은 이유로 VLOOK 플러그인을 활성화 할 수 없습니다 :\n\n"
            ][VLOOK.lang.id];

    // 只支持由 Typora 导出的 HTML 文件
    if (DOM.body().attr("class").indexOf("typora-export") === -1) {
        missContent += [
            "• 只支持由 Typora 导出的 HTML 文件\n",
            "• 只支持由 Typora 導出的 HTML 文件\n",
            "• Only HTML files exported by Typora are supported\n",
            "• Seuls les fichiers HTML exportés par Typora sont pris en charge\n",
            "• Es werden nur von Typora exportierte HTML-Dateien unterstützt\n",
            "• Solo se admiten archivos HTML exportados por Typora\n",
            "• Поддерживаются только файлы HTML, экспортированные Typora\n",
            "• Typora によってエクスポートされたHTMLファイルのみがサポートされています\n",
            "• Typora 에서 내 보낸 HTML 파일 만 지원됩니다\n"
            ][VLOOK.lang.id];
        valid = false;
    }

    // 缺少目录
    if ($(".md-toc").length === 0) {
        missContent += [
            "• 缺少 [TOC], 这是 GFM 标准的「目录」语法\n",
            "• 缺少 [TOC], 这是 GFM 標準的「目錄」语法\n",
            "• Missing [TOC], the GFM standard \"Table of Content\"\n",
            "• Manquant [TOC], la \"Table des matières\" standard GFM\n",
            "• Fehlendes [TOC], der GFM-Standard \"Inhaltsverzeichnis\"\n",
            "• Falta [TOC], la \"Tabla de contenido\" estándar de GFM\n",
            "• Отсутствует [TOC], стандарт GFM \"Table of Content\".\n",
            "• [TOC] がない、GFM標準の「目次」\n",
            "•GFM 표준 '목차'인 [TOC] 누락\n"
            ][VLOOK.lang.id];
    }

    // 存在不符合规范的情况
    if (valid === false) {
        missContent += [
            "\n建议参考文档模板：",
            "\n建議參考文檔模板：",
            "\nSuggestion Reference document template: ",
            "\nModèle de document de référence de suggestion: ",
            "\nVorschlag Referenzdokumentvorlage: ",
            "\nPlantilla de documento de referencia de sugerencia: ",
            "\nПредложение Шаблон справочного документа: ",
            "\n提案参照ドキュメントテンプレート：",
            "\n제안 참조 문서 템플릿 : "
        ][VLOOK.lang.id] + "\nreleased/demo/VLOOK-Document-Template.md";

        alert(missContent);
        return false;
    }

    // 符合规范
    return true;
}

/**
 * 初始化关键组件实例
 */
VLOOK.initIntance = function () {
    let stopwatch = new Stopwatch();
    stopwatch.lapStart();
    iFontStyler = new FontStyler(new BackgroundMask("font-styler", "center"));
    if (iFontStyler === false)
        alert("Instantiation failed [ iFontStyler ]");
    else
        iFontStyler.init(); // 初始化
    stopwatch.lapStop("    ├ Font Styler: ");

    // ==================== UI --------------------

    // 聚光灯
    stopwatch.lapStart();
    iSpotlight = new Spotlight(180, new BottomTips("spotlight"));
    if (iSpotlight === false)
        alert("Instantiation failed [ iSpotlight ]");
    stopwatch.lapStop("    ├ Spotlight: ");

    iLaserPointer = new LaserPointer(new BottomTips("laserPointe"));
    if (iLaserPointer === false)
        alert("Instantiation failed [ iLaserPointer ]");
    stopwatch.lapStop("    ├ LaserPointer: ");

    // 长内容折叠
    stopwatch.lapStart();
    iContentFolder = new ContentFolder();
    if (iContentFolder.length === 0)
        alert("Instantiation failed [ iContentFolder ]");
    stopwatch.lapStop("    ├ Content Folding: ");

    // 工具提示
    iToolTips = new ToolTips();
    if (iToolTips.length === 0)
        alert("Instantiation failed [ iToolTips ]");

    // 弹窗信息提示
    iInfoTips = new InfoTips(new BackgroundMask("info-tips", "center"));
    if (iInfoTips.length === 0)
        alert("Instantiation failed [ iInfoTips ]");

    // 导航中心
    stopwatch.lapStart();
    iNavCenter = new NavCenter(new BackgroundMask("nav-center", "left", true));
    if (iNavCenter === false)
        alert("Instantiation failed [ iNavCenter ]");
    stopwatch.lapStop("    ├ Nav Center: ");

    // 逐章导航
    stopwatch.lapStart();
    iChapterNav = new ChapterNav(iNavCenter);
    if (iChapterNav === false)
        alert("Instantiation failed [ iChapterNav ]");
    else {
        // 添加关联组件
        iNavCenter.chapterNav = iChapterNav;
    }
    stopwatch.lapStop("    ├ Chapter Nav: ");

    // 工具栏
    stopwatch.lapStart();
    iToolbar = new Toolbar(iNavCenter, iChapterNav);
    if (iToolbar === false)
        alert("Instantiation failed [ iToolbar ]");
    else {
        // 导航中心按钮
        iToolbar.add("outline", function () {
            iNavCenter.toggle();
        });

        // 字体风格
        iToolbar.add("font-style", function () {
            iFontStyler.toggle();
        });

        // 颜色方案（Light/Dark）
        iToolbar.add("color-scheme", function () {
            ColorScheme.toggle();
        });

        // 分隔条
        iToolbar.addSpliter("toolbar-spliter");

        // 段落导航
        iToolbar.add("paragraph-nav", function () {
            iInfoTips.inform([
                "开启方式：<br /><strong>三击文档中的「任意段落」</strong>",
                "开启方式：<br /><strong>三击文档中的「任意段落」</strong>",
                "Open method:<br /><strong>three click \"any paragraph\" in the document</strong>",
                "Méthode ouverte: <br /><strong>trois clics \"n'importe quel paragraphe\" dans le document</strong>",
                "Methode öffnen: <br /><strong>drei Klick Sie im Dokument auf \"einen beliebigen Absatz\"</strong>",
                "Método abierto: <br /><strong>haga tres clics en \"cualquier párrafo\" en el documento</strong>",
                "Метод открытия: <br /><strong>тройной щелчок «любой абзац» в документе.</strong>",
                "開く方法：<br /><strong>ドキュメント内の「任意の段落」をスリークリックします</strong>",
                "열기 방법 : <br /><strong>문서에서 \"임 의 단락\"세 번 클릭.</strong>"
            ][VLOOK.lang.id], 4000, true);
        });

        // 聚光灯
        iToolbar.add("spotlight", function () {
            iLaserPointer.hide();
            if (iSpotlight.toggle() === true)
                iParagraphNav.hide();
        });

        // 激光笔
        iToolbar.add("laser-pointer", function () {
            iSpotlight.hide();
            if (iLaserPointer.toggle() === true)
                iParagraphNav.hide();
        });

        // 打印按钮
        iToolbar.add("print", function () {
            VLOOK.print.ready();
        });

        // 添加关联组件
        iNavCenter.toolbar = iToolbar;
        iSpotlight.toolbar = iToolbar;
        iLaserPointer.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontStyler.bindButton(iToolbar.buttons["font-style"]);
    }
    stopwatch.lapStop("    ├ Toolbar: ");

    // 插图浏览器
    stopwatch.lapStart();
    iFigureNav = new FigureNav();
    if (iFigureNav === false)
        alert("Instantiation failed [ iFigureNav ]");
    stopwatch.lapStop("    ├ Figure Nav: ");

    // ----------------------------------------
    stopwatch.lapStart();

    // 文档更多内容栏遮罩栏
    iMoreDocContent = new MoreDocContent();
    if (iMoreDocContent === false)
        alert("Instantiation failed [ iMoreDocContent ]");

    // 脚注
    iFootNote = new FootNote(new BackgroundMask("foot-note", "bottom", true));
    if (iFootNote === false)
        alert("Instantiation failed [ iFootNote ]");

    // 链接检查
    iLinkChecker = new LinkChecker(new BackgroundMask("link-checker", "right", true));
    if (iLinkChecker.length === 0)
        alert("Instantiation failed [ iLinkChecker ]");

    // 内容助手
    iContentAssistor = new ContentAssistor();
    if (iContentAssistor.length === 0)
        alert("Instantiation failed [ iContentAssistor ]");

    stopwatch.lapStop("    └ Misc: ");
}

/**
 * 初始化 VLOOK 核心模块
 */
VLOOK.initKernel = function () {
    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.lapStart("* Document Logo");
    let docIconLight = $(".mdx-doc-logo-light").css("background-image"),
        docIconDark = $(".mdx-doc-logo-dark").css("background-image");
    $("head").append("<link rel='icon' id='doc-icon-light' href='" + docIconLight.substring(5, docIconLight.length - 2) + "' type='image/x-icon'/>"
        + "<link rel='icon' id='doc-icon-dark' href='" + docIconDark.substring(5, docIconDark.length - 2) + "' type='image/x-icon'/>");
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 封面、封底处理
    if (VOM.cover() === undefined) {
        let vkType = (VLOOK.type === "mini" ? " mini" : "");
        VOM.doc().prepend('<div id="vk-id-doc-title" class="mdx-doc-title' + vkType + '">' + $(document).attr("title") +'</div>');
    }

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.lapStart("* UI i18n");
    VLOOK.ui.initI18n();
    iStopwatch.lapStop("    ");

    VLOOK.ui.adjustHoverStyle();

    // ----------------------------------------
    iStopwatch.lapStart("* Code°Magic: ");
    // 重置行内代码code样式
    CodeMagic.init();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化引用块
    iStopwatch.lapStart("* Quote: ");
    ExtQuote.init();
    ExtQuote.adjustHoverStyle();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化音频数据
    iStopwatch.lapStart("* Audio: ");
    ExtAudio.init();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化视频数据
    iStopwatch.lapStart("* Video: ");
    ExtVideo.init();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化插图数据
    iStopwatch.lapStart("* Figure: ");

    ExtFigure.init();
    iStopwatch.lapStop("    COST ");

    // ----------------------------------------
    // 初始化表格
    iStopwatch.lapStart("* Table: ");
    ExtTable.init();
    iStopwatch.lapStop("    COST ");

    TableCross.init();
    RowGroup.adjustHoverStyle();

    // ----------------------------------------
    // 初始化代码块
    iStopwatch.lapStart("* Code Block: ");
    ExtCodeBlock.init();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 增强脚注
    iStopwatch.lapStart("* Foot Note: ");
    FootNote.init();
    iStopwatch.lapStop("    ");

    // 主要针对小屏情况，完成表格初始化后进行适配
    // 如果不是小屏，则由 adjustAll 触发
    iContentFolder.adjust();

    // ----------------------------------------
    // 初始化 导航中心、章节导航 数据
    iStopwatch.lapStart("* Adjust NavCenter/ChapterNav/FigureNav/Toolbar");
    if (NavCenter.init()) {
        if (!env.device.mobile)
            iNavCenter.showHandle();

        iNavCenter.adjust();
        iChapterNav.adjust();
        iToolbar.adjust();

        // 根据设备类型自适应 hover 样式
        iNavCenter.catalog.adjustHoverStyle();
        iChapterNav.adjustHoverStyle();
        iFigureNav.adjustHoverStyle();
    }
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化字体风格
    iStopwatch.lapStart("* Font Style: ");
    // 清空历史存储
    if (VLOOK.util.getParamValue("reset") === "true") {
        console.warn("!!! Reset Local Storage !!!");
        localStorage.removeItem("VLOOK-" + VLOOK.version + "-font-style");
    }
    // 若手动切换过字体风格，且与默认字体风格不同，则恢复为最后一次选择的字体风格
    const style = VLOOK.data.get("font-style");
    iFontStyler.style = VLOOK.util.getStyleValue("--vlook-default-font-style").trim();
    if (window.localStorage && style !== undefined && style !== iFontStyler.style) {
        console.info("    └ Last Font Style: " + style);
        iFontStyler.apply(style);
    }
    else {
        console.info("    └ Default Font Style: " + iFontStyler.style);
    }
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    iStopwatch.lapStart("* Binding Event");
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    document.addEventListener("mousemove", function () {
        iSpotlight.repaint(event || window.event);
        iNavCenter.snap(event || window.event);
    });

    // 绑定文档的单击事件
    $(document).unbind("click").click(function () {
        TableCross.hide();
    });

    // 绑定文档的滚动事件
    $(document).scroll(function () {
        let currentTime = new Date().getTime(),
            scrollTop = $(document).scrollTop();

        // 显示或隐藏文档更多内容遮罩栏
        if (scrollTop < 10
            || scrollTop > (scrollTop - 10)
            || currentTime - VLOOK.doc.scroll.lastUpdateTime > 500)
                iMoreDocContent.refresh(scrollTop);

        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop < 10
            || scrollTop > (scrollTop - 10)
            || currentTime - VLOOK.doc.scroll.lastUpdateTime > 500
            || (Math.abs(scrollTop - VLOOK.doc.scroll.lastTop) > 50 && (currentTime - VLOOK.doc.scroll.lastUpdateTime) > 500)) {
                // 更新控制执行频率相关判断数据
                VLOOK.doc.scroll.update(currentTime, $(document).scrollTop());
                // 根据是屏幕大小进行不同的适配控制
                VLOOK.ui.adjustAll();
        }

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iNavCenter.catalog.focusHeader();
    });

    // 绑定窗口大小缩放事件
    $(window).resize(function () {
        iNavCenter.catalog.focusHeader();
        VLOOK.ui.adjustAll();
    });

    // 绑定打印前的触发事件
    window.onbeforeprint = function () {};
    // 绑定打印后的触发事件
    window.onafterprint = function () {
        VLOOK.print.done();
    };

    // 监听页内锚点链接跳转
    // 注意：同一个锚点连续点击不会触发该事件
    $(window).on("hashchange", function(event) {
        let hash = window.location.hash,
            anchor = hash.substring(1, hash.length);
        if (anchor.trim().length === 0)
            return;

        iNavCenter.history.add(hash);

        // 锚点未显示的处理（如所在父元素被隐藏）
        let aObj = $("#" + decodeURI(anchor) + ", a[name='" + anchor + "']");
        if (aObj !== undefined && aObj.offset() !== undefined && aObj.offset().top === 0) {
            let hiddenObj = aObj.closest("blockquote");
            // 若属于被折叠的引用，则模拟点击展开，并重新定位到该引用
            if (hiddenObj.length > 0 && hiddenObj.isHidden()) {
                let folder = hiddenObj.prev().find(".mdx-blockquote-folder");
                if (folder.length > 0) {
                    folder.trigger("mouseup");
                    window.location.href = hash;
                }
            }
        }

        // 页内位置改变后，微调滚动条位置
        if (gLastHash == null || gLastHash !== hash) {
            // 其中对于 Firefox 若不延时微调会存在微调无效的情况
            setTimeout(function () {
                VLOOK.ui.tuningScrollTop(decodeURI(anchor));
            }, env.browser.Firefox ? 300 : 0);
        }
        gLastHash = hash;

        // 若导航中心没有显示，则强制进行延时适配处理（如从封面直接到指定章节）
        if (iNavCenter.showed === false)
            VLOOK.ui.adjustAllDelay();
    });

    iStopwatch.lapStop("    ");
}

/**
 * 初始化须在页面 body 显示后才能执行的部分
 */
VLOOK.initRestyle = function () {
    let stopwatch = new Stopwatch();

    // ----------------------------------------
    // 重置任务列表样式
    stopwatch.lapStart();
    Restyler.forTaskList();
    stopwatch.lapStop("    ├ TaskList: ");

    // ----------------------------------------
    // 重置脚本化图表样式，须在以上页面内容恢复显示后再处理
    stopwatch.lapStart();
    Restyler.forMermaid();
    stopwatch.lapStop("    └ Mermaid: ");
}

// VLOOK UI
VLOOK.ui = {
    effects : 0, // 0: 无动效

    /**
     * 淡入显示
     *
     * @param target 目标对象
     */
    show : function (target) {
        if (target === undefined)
            return;

        target.css({
            "visibility" : "visible",
            "opacity" : 1
        });
    },

    /**
     * 淡出隐藏
     *
     * @param target 目标对象
     */
    hide : function (target) {
        if (target === undefined)
            return;

        target.css({
            "visibility" : "hidden",
            "opacity" : 0
        });
    },

    /**
     * 获得滚动条宽度
     */
    scrollWidth : function () {
        let noScroll,
            scroll,
            div = document.createElement("DIV");
        div.style.cssText = "position: absolute; top: -9999px; width: 100px; height: 100px; overflow: hidden;";
        noScroll = document.body.appendChild(div).clientWidth;
        div.style.overflowY = "scroll";
        scroll = div.clientWidth;
        document.body.removeChild(div);
        return noScroll - scroll;
    },

    /**
     * 获得 VLOOK 与技术支持信息内容
     *
     * @returns string VLOOK 与技术支持信息内容
     */
    copyrightInfo : function () {
        return '<div class="mdx-copyright">'
            + '<svg width="24px" height="24px" style="display: inline-block; vertical-align: middle; cursor: pointer;" onclick="env.show()"><use xlink:href="#icoVLOOK-dark"></use></svg>&nbsp;&nbsp;'
            + 'Published with <a href="https://github.com/MadMaxChow/VLOOK" target="_blank"><strong>VLOOK</strong></a>™ (V12.0) &amp; <a href="https://www.typora.io" target="_blank"><strong>Typora</strong></a>.'
            + '&nbsp;&nbsp;Support: <strong><a href="https://qm.qq.com/cgi-bin/qm/qr?k=oB8wpFG_4SEMf1CL9qVy-jMw0CMfSwff&jump_from=webapi">QQ Group</a></strong> / <strong><a href="mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + VLOOK.version + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(true)) + '">Email</a></strong>.'
            + '</div>'
    },

    /**
     * 判断是否为小屏
     */
    isSmallScreen : function () {
        return $(window).width() <= 1024;
    },

    /**
     * 微调页内跳转后的滚动条位置
     *
     * @param anchor 锚点名称，不含 #，如含 # 会自动过滤
     */
    tuningScrollTop : function (anchor) {
        if (anchor !== undefined && anchor.startsWith("#"))
            anchor = anchor.substring(1, anchor.length);
        if (anchor === undefined || anchor.trim().length === 0)
            return;

        let top = parseInt(iChapterNav.ui.css("top")),
            height = parseInt(iChapterNav.ui.css("height")),
            offsetY = 10,
            target = $("#" + decodeURI(anchor) + ", a[name='" + anchor + "']"),
            tagName = target.prop("tagName");

        if (tagName !== undefined)
            tagName = tagName.toLowerCase();

        // h1-6
        if (tagName !== undefined && "h1h2h3h4h5h6".indexOf(tagName) > -1) {
            offsetY += (tagName === "h6")
                ? (top + height + 16)
                : (target.height() + 10 + (parseInt(tagName.substring(1, 2)) - 1) * 6);
            offsetY -= parseInt(VLOOK.util.getStyleValue("--vlook-top-margin"));
        }
        // 从底部脚注列表回到脚注位置
        else if (anchor.startsWith("ref-footnote"))
            offsetY += 70;
        // 其他情况
        else
            offsetY += top + height;
        // 微调滚动位置
        $(document).scrollTop($(document).scrollTop() - offsetY);
    },

    /**
     * 生成 SVG 图标
     *
     * @param icon 图标资源集标识
     * @param width 图标宽度
     * @param height 图标高度
     * @param color 内置图标样式 mdx-svg-ico-xxx 标识：light / dark / alpha / ...
     * @param style 扩展补充的 style 样式
     */
    generateSvgIcon : function (icon, width, height, color, style) {
        style = (style !== undefined) ? ' style="' + style + '"' : ""
        return '<svg width="' + width + 'px" height="' + height + 'px"' + style + '>'
            + '<use class="mdx-svg-ico-' + color + '" xlink:href="#' + icon + '">'
            + '</use></svg>';
    },

    /**
     * 初始 UI 国际化
     */
    initI18n : function () {
        iContentFolder.ui.find("div > span").attr("title", [
            "查看更多",
            "查看更多",
            "View More",
            "Voir Plus",
            "Mehr sehen",
            "Ver más",
            "Посмотреть ещё",
            "もっと見る",
            "더보기"
        ][VLOOK.lang.id]);

        iToolbar.buttons["outline"].attr("data-vk-tips", "<kbd>O</kbd> " + [
            "<strong>隐藏</strong> / <strong>显示</strong> 导航中心",
            "<strong>隱藏</strong> / <strong>顯示</strong> 大綱面板",
            "<strong>Hide</strong> / <strong>Show</strong> Outline Panel",
            "<strong>Cacher</strong> / <strong>Afficher</strong> le panneau de contour",
            "<strong>ausblenden</strong> / <strong>anzeigen</strong> Gliederungsfenster",
            "<strong>Ocultar</strong> / <strong>Mostrar</strong> panel de contorno",
            "<strong>Скрыть</strong> / <strong>показать</strong> панель",
            "アウトラインパネルの <strong>非表示</strong> / <strong>表示</strong>",
            "개요 패널 <strong>숨기기</strong> / <strong>표시</strong>"
        ][VLOOK.lang.id]);

        iToolbar.buttons["color-scheme"].attr("data-vk-tips", "<kbd>D</kbd> " + [
            "切换 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
            "切換 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
            "Switch <strong>Dark</strong> / <strong>Light</strong> Mode",
            "Basculer en mode <strong>Sombre</strong> / <strong>Clair</strong>",
            "Schalten Sie den  / <strong>Hell</strong> -Modus um",
            "Cambiar el modo <strong>Oscuro</strong> / <strong>Claro</strong>",
            "Переключить <strong>Темный</strong> / <strong>Светлый</strong> режим",
            "<strong>ダーク</strong> / <strong>ライト</strong> モードの切り替え",
            "<strong>다크</strong> / <strong>라이트</strong> 모드 전환"
        ][VLOOK.lang.id]);

        iToolbar.buttons["font-style"].attr("data-vk-tips", "<kbd>A</kbd> " + [
            "切换 字体风格",
            "切換 字體風格",
            "Switch Font Style",
            "Changer de style de police",
            "Schriftart wechseln",
            "Cambiar estilo de fuente",
            "Переключить стиль шрифта",
            "フォントスタイルの切り替え",
            "글꼴 스타일 전환"
        ][VLOOK.lang.id]);

        iToolbar.buttons["paragraph-nav"].attr("data-vk-tips", [
            "段落导航 模式",
            "段落導航 模式",
            "Paragraph Navigation mode",
            "Mode de navigation de paragraphe",
            "Absatznavigationsmodus",
            "Modo de navegación de párrafo",
            "Режим навигации по абзацам",
            "段落ナビゲーションモード",
            "단락 탐색 모드"
        ][VLOOK.lang.id]);

        iToolbar.buttons["spotlight"].attr("data-vk-tips", "<kbd>S</kbd> " + [
            "聚光灯",
            "聚光燈",
            "Spotlight>",
            "Projecteur",
            "Scheinwerfer",
            "Destacar",
            "Прожектор",
            "スポットライト",
            "스포트라이트"
        ][VLOOK.lang.id]);

        iToolbar.buttons["laser-pointer"].attr("data-vk-tips", "<kbd>P</kbd> " + [
            "激光笔",
            "激光筆",
            "Laser Pointer",
            "Pointeur Laser",
            "Laserpointer",
            "Puntero Láser",
            "Лазерный Указатель",
            "レーザーポインター",
            "레이저 포인터"
        ][VLOOK.lang.id]);

        iToolbar.buttons["print"].attr("data-vk-tips", [
            "打印...",
            "打印...",
            "Print...",
            "Imprimer...",
            "Drucken...",
            "Impresión...",
            "Печать...",
            "印刷する...",
            "인쇄..."
        ][VLOOK.lang.id]);

        iChapterNav.prev.ui.attr("data-vk-tips", "<kbd>◄</kbd> " + [
            "前一章",
            "前一章",
            "Previous Chapter",
            "Chapitre Précédent",
            "Vorheriges Kapitel",
            "Capítulo previo",
            "Предыдущая глава",
            "前の章",
            "이전 장"
        ][VLOOK.lang.id]);

        iChapterNav.next.ui.attr("data-vk-tips", "<kbd>►</kbd> " + [
            "后一章",
            "後一章",
            "Next Chapter",
            "Chapitre Suivant",
            "Nächstes Kapitel",
            "Siguiente capítulo",
            "Следующая глава",
            "次の章",
            "다음 장"
        ][VLOOK.lang.id]);

        iChapterNav.docTitle.attr("data-vk-tips", [
            "回到封面",
            "回到封面",
            "Back to cover",
            "Retour à la couverture",
            "Zurück zur Titelseite",
            "Volver a la portada",
            "Вернуться к обложке",
            "表紙に戻る",
            "표지로 돌아 가기"
        ][VLOOK.lang.id]);

        iChapterNav.current.ui.attr("data-vk-tips", [
            "回到本章的开始",
            "回到本章的開始",
            "Go back to the beginning of this chapter",
            "Retourner au début de ce chapitre",
            "Gehen Sie zurück zum Anfang dieses Kapitels",
            "Regrese al comienzo de este capítulo",
            "Вернитесь к началу этой главы",
            "この章の始めに戻る",
            "이 장의 시작 부분으로 돌아 가기"
        ][VLOOK.lang.id]);

        iFigureNav.buttons.prev.attr("title", "[ ← ] " + [
            "前一张",
            "前一張",
            "Previous",
            "Précédent",
            "Previo",
            "Próximo",
            "Предыдущая фотографияs",
            "前へ",
            "이전"
        ][VLOOK.lang.id]);

        iFigureNav.buttons.next.attr("title", "[ → ] " + [
            "后一张",
            "後一張",
            "Next",
            "Le suivant",
            "Nächster",
            "Próximo",
            "Следующий",
            "次の",
            "다음"
        ][VLOOK.lang.id]);

        iFigureNav.buttons.close.attr("title", "[ ESC ] " + [
            "关闭",
            "關閉",
            "Close",
            "Fermer",
            "Schließen",
            "Cerrar",
            "близко",
            "閉じる",
            "닫기"
        ][VLOOK.lang.id]);

        iFontStyler.ui.find(".mdx-font-package").text([
            "字体包",
            "字體包",
            "Font Package",
            "Package de polices",
            "Schriftpaket",
            "Paquete de fuentes",
            "Пакет шрифтов",
            "フォントパッケージ",
            "글꼴 패키지"
        ][VLOOK.lang.id] + " •• ");

        iFontStyler.ui.find(".mdx-font-styler-info").html([
            "若无法连接互联网加载在线版本字体，建议将字体直接下载到本地",
            "若無法連接互聯網加載在線版本字體，建議將字體直接下載到本地",
            "If you cannot connect to the Internet to load the online version of the font, it is recommended to download the font directly to the local",
            "Si vous ne pouvez pas vous connecter à Internet pour charger la version en ligne de la police, il est recommandé de télécharger la police directement sur le",
            "Wenn Sie keine Verbindung zum Internet herstellen können, um die Online-Version der Schriftart zu laden, wird empfohlen, die Schriftart direkt auf die lokale Version herunterzuladen",
            "Si no puede conectarse a Internet para cargar la versión en línea de la fuente, se recomienda descargar la fuente directamente al local.",
            "Если вы не можете подключиться к Интернету для загрузки онлайн-версии шрифта, рекомендуется загрузить шрифт непосредственно на локальный компьютер.",
            "インターネットに接続してオンラインバージョンのフォントを読み込めない場合は、フォントをローカルに直接ダウンロードすることをお勧めします。",
            "온라인 버전의 글꼴을로드하기 위해 인터넷에 연결할 수없는 경우 글꼴을 로컬로 직접 다운로드하는 것이 좋습니다."
        ][VLOOK.lang.id] + " (<a href='https://github.com/MadMaxChow/VLOOK/blob/master/FONT.md'>" + [
            "主站",
            "主站",
            "Master",
            "Maître",
            "Master",
            "Maestro",
            "Главный",
            "マスター",
            "마스터"
        ][VLOOK.lang.id] + "</a> | <a href='https://gitee.com/madmaxchow/VLOOK/blob/master/FONT.md'>" + [
            "备用",
            "備用",
            "Standby",
            "Veille",
            "Standby",
            "En espera",
            "Резервный",
            "スタンバイ",
            "대기"
        ][VLOOK.lang.id] + "</a>)");

        iFootNote.buttonSeeAll.children("a").text([
            "查看所有脚注",
            "查看所有腳註",
            "View all footnotes",
            "Afficher toutes les notes de bas de page",
            "Alle Fußnoten anzeigen",
            "Ver todas las notas al pie",
            "Просмотреть все сноски",
            "すべての脚注を見る",
            "모든 각주보기"
        ][VLOOK.lang.id] + " ▶");

        iContentAssistor.buttons.openInFigureNav.attr("data-vk-tips", [
            "全屏显示",
            "全屏顯示",
            "Full screen",
            "Plein écran",
            "Vollbild",
            "Pantalla completa",
            "Полноэкранный",
            "全画面表示",
            "전체 화면"
        ][VLOOK.lang.id]);

        iContentAssistor.buttons.tableCross.attr("data-vk-tips", "<kbd>X</kbd> " + [
            "阅读模式",
            "閱讀模式",
            "Reading mode",
            "Mode de lecture",
            "Lesemodus",
            "Modo de lectura",
            "Режим чтения",
            "読書モード",
            "읽기 모드"
        ][VLOOK.lang.id]);

        iContentAssistor.buttons.picInPic.attr("data-vk-tips", [
            "画中画",
            "畫中畫",
            "Picture in picture",
            "Image dans l'image",
            "Bild im Bild",
            "Imagen en imagen",
            "Картинка в картинке",
            "ピクチャーインピクチャー",
            "사진 속 사진"
        ][VLOOK.lang.id]);

        iContentAssistor.buttons.copyCodeBlock.attr("data-vk-tips", [
            "复制全部代码",
            "複製全部代碼",
            "Copy all code",
            "Copiez tout le code",
            "Kopieren Sie den gesamten Code",
            "Copiar todo el código",
            "Скопируйте весь код",
            "すべてのコードをコピー",
            "모든 코드 복사"
        ][VLOOK.lang.id]);
    },

    /**
     * 移动到中间
     *
     * @param source 源对象
     */
    moveToCenter : function (source) {
        let left = ($(window).width() - source.width()) / 2,
            right = "auto";
        if (env.device.mobile) { // 移动端
            left = 10;
            right = 10;
        }

        source.css({
            "left" : left,
            "right" : right,
            "top" : ($(window).height() - source.height()) / 2
        });
    },

    /**
     * 移动到中间
     *
     * @param source 源对象
     * @param target 目标对象
     */
    moveToTarget : function (source, target) {
        let left = target.offset().left,
            top = target.offset().top - $(document).scrollTop(),
            sourceWidth = source.width() + parseInt(source.css("padding-left"))
                + parseInt(source.css("padding-right"))
                + parseInt(source.css("border-width")) * 2;

        if (left + sourceWidth + 10 > $(window).width())
            left = $(window).width() - sourceWidth - 10;

        source.css({
            "left" : left,
            "top" : top + target.height() + 10
        });
    },

    /**
     * 进行文档导航相关的 UI 元素的适配处理
     */
    adjustAll : function () {
        if (iNavCenter.adjust() === true)
            iContentFolder.adjust();
        iChapterNav.adjust();
        iToolbar.adjust();
    },

    /**
     * 模拟等待页面完成跳转后，再进行导航中心布局自适应处理
     */
    adjustAllDelay : function () {
        // console.log("Adjust all delay ...");
        setTimeout(function () {
            VLOOK.ui.adjustAll()
        }, 500);
    },

    /**
     * 根据设备类型自适应hover样式
     */
    adjustHoverStyle : function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            $(".mdx-btn").unbind("hover");
            $(".mdx-segment-btn").unbind("hover");
            $(".mdx-accent-btn").unbind("hover");
        }
        // 非移动设备时绑定样式事件
        else {
            // 所有常规按钮 hover 事件处理
            VLOOK.ui.bindHover($(".mdx-btn, .mdx-btn-group"));
            // 所有导航中心分段控制按钮 hover 事件处理
            VLOOK.ui.bindHover($(".mdx-segment-btn"));
            // 所有辅助按钮 hover 事件处理
            VLOOK.ui.bindHover($(".mdx-accent-btn"));
            // 文库按钮 hover 事件处理
            VLOOK.ui.bindHover($(".mdx-doc-lib-board.item"));
        }
    },

    /**
     * 为对象绑定 hover 事件
     *
     * @param target 目标对象
     */
    bindHover : function (target) {
        target.hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
    },

    /**
     * 为对象取消 hover 事件绑定
     *
     * @param target 目标对象
     */
    unbindHover : function (target) {
        target.unbind("mouseenter").unbind("mouseleave");
    },

    /**
     * 初始化动效处理
     */
    initEffects : function () {
        // 不启用动效
        if (VLOOK.ui.effects < 1)
            VLOOK.util.setStyleValue("--vlook-transition-value", "none");
        // 动效等级为 2 或更高级时才开启毛玻璃动效（如遮罩、插图浏览器背景）
        else if (VLOOK.ui.effects >= 2)
            $(".mdx-backdrop-blurs").addClass("enabled");
        // 以下动效等级为 1 或更高级时才开启
        VLOOK.ui.addAnimate($(".mdx-btn, .mdx-btn-group, .mdx-doc-lib-board, .mdx-doc-lib-board.flip"));
        // VLOOK.ui.addAnimate($("a, a kbd, a img"));
        VLOOK.ui.addAnimate($("a kbd, a img"));
    },

    /**
     * 为指定对象添加过渡动画
     *
     * @param target 目标对象
     * @param property 应用的属性，不指定时默认为 “all”
     */
    addAnimate : function (target, property) {
        if (VLOOK.ui.effects >= 1) {
            if  (property === undefined)
                target.addClass("mdx-transition-all");
            else {
                let attrSet = property.split(" ");
                for (let i = 0; i < attrSet.length; i++)
                    target.addClass("mdx-transition-" + attrSet[i]);
            }
        }
    },

    /**
     * 为指定对象移除过渡动画
     *
     * @param target 目标对象
     * @param property 应用的属性，不指定时默认为 “all”
     */
    removeAnimate : function (target, property) {
        if  (property === undefined)
            target.removeClass("mdx-transition-all");
        else {
            let attrSet = property.split(" ");
            for (let i = 0; i < attrSet.length; i++)
                target.removeClass("mdx-transition-" + attrSet[i]);
        }
    },

    /**
     * 检查目标对象是否有指定的任意过渡动画
     *
     * @param target 目标对象
     * @returns boolean true：有，false：无
     */
    existAnimate : function (target) {
        return target.attr("class").indexOf("mdx-transition-") > -1;
    },

    /**
     * 初始化热键
     */
    initHotkey : function () {
        // 键盘按下事件
        $(document).keydown(function (event) {
            const code = event.keyCode || event.which || event.charCode;
            let combKeys = (event.ctrlKey ? "Ctrl _ " : "")
                + (event.shiftKey ? "Shift _ " : "")
                + (event.altKey ? "Alt _ " : "")
                + (event.metaKey ? "Win/Cmd _ " : "");
            VLOOK.debug("Keydown: "
                + combKeys
                + String.fromCharCode(code)
                + " [" + code + "]");
            // 按了组合键时忽略（除 Shift）
            if (event.ctrlKey || event.altKey || event.metaKey)
                return;

            // 焦点不在文档内容上时的子模块热键操作处理
            // 第一梯队，避免同时触发（如 ESC 导致同时退出多个）
            iSpotlight.disposeHotkey(code, combKeys);
            iLaserPointer.disposeHotkey(code, combKeys);
            iParagraphNav.disposeHotkey(code, combKeys);
            // 第二梯队
            iWelcomePage.disposeHotkey(code, combKeys);
            iFigureNav.disposeHotkey(code, combKeys);
            iNavCenter.disposeHotkey(code, combKeys);
            iFontStyler.disposeHotkey(code, combKeys);
            iInfoTips.disposeHotkey(code, combKeys);
            iFootNote.disposeHotkey(code, combKeys);
            iLinkChecker.disposeHotkey(code, combKeys);

            // 文档的热键操作处理，只在文档为当前焦点且没有弹层时才有效
            if (VLOOK.doc.block === true || document.activeElement.tagName.toLowerCase() !== "body")
                return;

            // 逐章导航热键操作处理
            iChapterNav.disposeHotkey(code, combKeys);

            switch (code) {
                case 79: // O
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    if (iFigureNav.ui.isShowed())
                        return;
                    iToolbar.buttons["outline"].trigger("click");
                    break;
                case 76: // L
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    if (iNavCenter.docLib.enabled === true)
                        iNavCenter.docLib.handle.trigger("click");
                    break;
                case 68: // D
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iToolbar.buttons["color-scheme"].trigger("click");
                    break;
                case 65: // A
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    if (iFontStyler.ui.isHidden())
                        iToolbar.buttons["font-style"].trigger("click");
                    else
                        iFontStyler.hide();
                    break;
                case 88: // X
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    TableCross.toggle();
                    break;
                case 80: // P
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iParagraphNav.hide();
                    iSpotlight.hide();
                    iLaserPointer.toggle();
                    break;
                case 83: // S
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iParagraphNav.hide();
                    iLaserPointer.hide();
                    iSpotlight.toggle();
                    break;
                case 27: // ESC
                    VLOOK.report.push(['Hotkey', combKeys, 'ESC', 0]);
                    if (VLOOK.doc.block === false) {
                        iToolTips.hide();
                        iLinkChecker.hide();
                    }

                    // 表格为阅读模式时，则退出
                    if (!TableCross.ui.isHidden())
                        TableCross.disable();

                    // 拦截该按键事件，避免退出全屏（如：Safari）
                    window.event.returnValue = false;
                    break;
            }
        });
    }
} // VLOOK.ui

// 语言类
VLOOK.lang = {
    id : 2,

    /**
     * 初始化语言
     */
    init : function () {
        switch (env.language.base) {
            case "zh":
                VLOOK.lang.id = 1; // 中（繁）
                if (env.language.subset.toLowerCase() === "cn" || env.language.subset.toLowerCase() === "chs")
                    VLOOK.lang.id = 0; // 中（简）
                break;
            case "en":
                VLOOK.lang.id = 2; // 英语
                break;
            case "fr":
                VLOOK.lang.id = 3; // 法语
                break;
            case "de":
                VLOOK.lang.id = 4; // 德语
                break;
            case "es":
                VLOOK.lang.id = 5; // 西班牙语
                break;
            case "ru":
                VLOOK.lang.id = 6; // 俄语
                break;
            case "ja":
                VLOOK.lang.id = 7; // 日语
                break;
            case "ko":
                VLOOK.lang.id = 8; // 韩语
                break;
            default:
                VLOOK.lang.id = 2; // 默认：英语
        }
    }
} // VLOOK.lang

// 动画类
VLOOK.animate = {
    speed : 300, // 动画速度，值越小越快
    tension : 200, // 动画张力参数
    friction : 20 // 动画摩擦力参数
}

// 文档类
VLOOK.doc = {
    block : false, // 当前文档是否被模态窗口阻塞

    // 滚动信息
    scroll : {
        lastUpdateTime : 0, // 最后一次根据滚动变动更新 UI 的时间
        lastTop : 0, // 最后一次记录的滚动位置

        /**
         * 更新页面滚动信息
         *
         * @param updateTime 最后更新滚动信息的时间时间
         * @param lastTop 最后更新的滚动位置
         */
        update : function (updateTime, lastTop) {
            this.lastUpdateTime = updateTime;
            this.lastTop = lastTop;
        },

        /**
         * 冻结文档滚动
         */
        freeze : function () {
            DOM.body().removeClass("unfreeze").addClass("freeze");
        },

        /**
         * 解冻文档滚动
         */
        unfreeze : function () {
            DOM.body().removeClass("freeze").addClass("unfreeze");
        }
    },

    // 内容计数器
    counter : {
        figure: 0, // 插图总数
        table: 0, // 表格总数
        codeblock: 0, // 代码块总数
        audio: 0, // 非 mini 模式音频总数
        audiomini: 0, // mini 模式音频总数
        video: 0, // 视频总数
    },

    /**
     * 检查页内链接坏链
     */
    link : {
        /**
         * 初始化外部链接（如：http://、https://、ftp://、站内链接等），为其添加 target 参数
         */
        adjustExternal : function () {
            $("a:not([href^='#'])").each(function () {
                let a = $(this);
                a.attr("target", a.attr("href"));
            });
        },
    },
} // VLOOK.doc

// 打印类
VLOOK.print = {
    /**
     * 打印文档前处理
     */
    ready : function () {
        VLOOK.report.push(['Style', 'Print', '', 0]);

        // 若当前为 Dark Mode 则强制临时切换为 Light 模式
        if (ColorScheme.scheme === "dark") {
            ColorScheme.schemeBeforePrint = ColorScheme.scheme;
            ColorScheme.scheme = "light";
            ColorScheme.refresh();
        }

        // 将 Mermaid 图表题注 width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
        $(".mdx-caption.mermaid").each(function () {
            $(this).attr("before-print-width", $(this).css("width"));
            $(this).css("width", "100%");
        });

        // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
        $(".mdx-caption.mermaid svg").each(function () {
            if ($(this).attr("width") === "100%") {
                // 针对流程图
                if ($(this).attr("style").indexOf("max-width:") > -1) {
                    $(this).attr("before-print-max-width", $(this).css("max-width"));
                    $(this).css("max-width", "");
                }
                // 针对状态图
                else if ($(this).attr("style").indexOf("width:") > -1) {
                    $(this).attr("before-print-width", $(this).css("width"));
                    $(this).css("width", "100%");
                }
            } else { // 针对顺序图
                $(this).attr("before-print-width", $(this).attr("width"));
                $(this).css("width", "100%");
            }
        });

        // 展开折叠的引用块
        $("[data-vk-blockquote-folded='true']").each(function () {
            ExtQuote.unfold($(this));
        });

        // 展开所有折叠的长内容
        $("[data-vk-content-folded='true']").each(function () {
            $(this).next(".mdx-content-expander").children(".mdx-btn").trigger("click");
        });

        // 展开所有折叠的表格行
        $(".mdx-tbl-row-g-btn").each(function () {
            RowGroup.open($(this).parent().parent());
        });

        // 隐藏画中画
        PicInPic.hide();

        // 若存在「刮刮卡」内容，则先让用户确认是否显示
        let blackCurtains = $(".mdx-black-curtain");
        if (blackCurtains.length > 0) {
            if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？") === true) {
                blackCurtains.each(function () {
                    if ($(this).attr("data-vk-black-curtain-showed").startsWith("f"))
                        BlackCurtain.show($(this));
                });
            }
        }

        // 调用浏览器的打印功能
        // 延后是为以上相关的异步和界面完成刷新
        setTimeout(window.print, 2000);
    },

    /**
     * 打印文档后处理
     */
    done : function () {
        // 若打印前为 Dark Mode 则先恢复为 Dark Mode
        if (ColorScheme.schemeBeforePrint === "dark") {
            ColorScheme.toggle();
        }

        // 恢复打印前的配置，详见 VLOOK.print.ready()
        $(".mdx-caption.mermaid").each(function () {
            $(this).css("width", $(this).attr("before-print-width"));
            $(this).removeAttr("before-print-width");
        });

        //恢复打印前的配置，详见 VLOOK.print.ready()
        $(".mdx-caption.mermaid svg").each(function () {
            if ($(this).attr("width") === "100%") {
                // 针对流程图
                if ($(this).attr("style").indexOf("max-width:") > -1) {
                    $(this).css("max-width", $(this).attr("before-print-max-width"));
                    $(this).removeAttr("before-print-max-width");
                }
                // 针对状态图
                else if ($(this).attr("style").indexOf("width:") > -1) {
                    $(this).css("width", $(this).attr("before-print-width"));
                    $(this).removeAttr("before-print-width");
                }
            } else { // 针对顺序图
                $(this).css("width", $(this).attr("before-print-width"));
                $(this).removeAttr("before-print-width");
            }
        });

        // 隐藏所有刮刮卡
        $(".mdx-black-curtain").each(function () {
            if ($(this).attr("data-vk-black-curtain-showed").startsWith("t"))
                BlackCurtain.hide($(this));
        });
    },
} // VLOOK.print

// 数据统计报告类
VLOOK.report = {
    /**
     * 提交统计数据
     */
    submit : function (loadTimeCost) {
        // VLOOK 基本信息
        let statData = "?p=vlook"
            + "&ver=" + VLOOK.version
            + "&thm=" + VLOOK.util.getStyleValue("--vlook-theme-name").replaceAll("\"", "").trim();

        statData += "&d=" + (env.device.mobile ? "mob" : ""); // 设备类型
        statData += "&dpr=" + env.display.DPR; // DPR

        // OS 信息
        statData += "&os=";
        if (env.os.macOS)
            statData += "macOS";
        else if (env.os.Windows)
            statData += "Windows";
        else if (env.os.iOS)
            statData += "iPhone";
        else if (env.os.Linux)
            statData += "iPhone";
        else
            statData += "others";

        // 浏览器及版本
        statData += "&b=";
        if (env.browser.Edge)
            statData += "edge&bv=" + env.browserVersion.Edge;
        else if (env.browser.Chrome)
            statData += "chrome&bv=" + env.browserVersion.Chrome;
        else if (env.browser.Firefox)
            statData += "firefox&bv=" + env.browserVersion.Firefox;
        else if (env.browser.Safari)
            statData += "safari&bv=" + env.browserVersion.Safari;
        else
            statData += "others&bv=";

        // 浏览器的颜色方案
        statData += "&cs=" + VLOOK.util.getStyleValue("--vlook-color-scheme").replaceAll("\"", "").trim();

        statData += "&lang=" + VLOOK.lang.id; // 浏览器语言
        statData += "&size=" + VOM.doc().text().length; // 文档大小
        statData += "&time=" + loadTimeCost; // 加载文档时间

        // 图片插图数据
        statData += "&img=" + $(".mdx-figure").length;
        statData += "&img-fold=" + $("p[data-vk-container='img'][data-vk-content-folded='true']").length;
        statData += "&img-fill=" + $("img:not([data-vk-img-fill])").length;
        statData += "&img-invert=" + $("img[data-vk-darksrc='invert']").length;
        statData += "&img-alter=" + $("img[data-vk-darksrc='alter']").length;
        statData += "&img-cap1=" + $("div[id^=vk-id-fig][data-vk-id-fig-type='img'] .mdx-caption-1 strong").length;
        statData += "&img-cap2=" + $("div[id^=vk-id-fig][data-vk-id-fig-type='img'] .mdx-caption-2").length;

        // Mermaid 插图数据
        let mermaid = $(".md-diagram-panel");
        statData += "&mm=" + mermaid.length;
        statData += "&mm-fold=" + $("div[data-vk-container='svg'][data-vk-content-folded='true']").length;
        statData += "&mm-cap1=" + $("div[id^=vk-id-fig][data-vk-id-fig-type='svg'] .mdx-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=vk-id-fig][data-vk-id-fig-type='svg'] .mdx-caption-2").length;

        // Mermaid 音频数据
        statData += "&audio=" + $("audio").length;
        statData += "&mm-cap1=" + $("div[id^=vk-id-audio] .mdx-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=vk-id-audio] .mdx-caption-2").length;

        // Mermaid 视频数据
        statData += "&video=" + $("video").length;
        statData += "&mm-cap1=" + $("div[id^=vk-id-video] .mdx-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=vk-id-video] .mdx-caption-2").length;

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
            if ($(this).find("g.legend").length > 0)
                pie++; // 饼图
            else if ($(this).find("g.output g.nodes").length > 0) {
                flow++; // 流程图
                if ($(this).find("g.output g.nodes g#START.node").length > 0)
                    flowSTART++; // VLOOK 标准的流程图
                else if ($(this).find("g.output g.nodes g#INIT.node").length > 0)
                    flowINIT++; // VLOOK 标准的状态图
            }
            else if ($(this).find("g.stateGroup").length > 0)
                state++; // 状态图（原生）
            else if ($(this).find("g rect.actor").length > 0)
                seq++; // 顺序图
            else if ($(this).find("g.classGroup").length > 0)
                classD++; // 类图
            else if ($(this).find("g rect.section").length > 0)
                gantt++; // 甘特图
        });
        statData += "&mm-pie=" + pie;
        statData += "&mm-flow=" + flow;
        statData += "&mm-flow-S=" + flowSTART
        statData += "&mm-flow-I=" + flowINIT
        statData += "&mm-state=" + state;
        statData += "&mm-seq=" + seq;
        statData += "&mm-class=" + classD;
        statData += "&mm-gantt=" + gantt;

        // 表格数据
        statData += "&tbl=" + $("table").length;
        statData += "&tbl-fold=" + $("figure[data-vk-container='table'][data-vk-content-folded='true']").length;
        statData += "&tbl-cap1=" + $("div[id^=vk-id-tbl] .mdx-caption-1 strong").length;
        statData += "&tbl-cap2=" + $("div[id^=vk-id-tbl] .mdx-caption-2").length;

        // 表格列格式数据
        let fmBold = 0,
            fmEm = 0,
            fmUnderline = 0,
            fmMark = 0,
            fmDel = 0,
            fmChk = 0,
            fmNum = 0;
        $("table[data-vk-column-formatting='true']").each(function () {
            if ($(this).find("thead .mdx-tbl-col-fmt-bold").length > 0)
                fmBold++;
            if ($(this).find("thead .mdx-tbl-col-fmt-em").length > 0)
                fmEm++;
            if ($(this).find("thead u").length > 0)
                fmUnderline++;
            if ($(this).find("thead .mdx-tbl-col-fmt-mark").length > 0)
                fmMark++;
            if ($(this).find("thead del").length > 0)
                fmDel++;
            if ($(this).find("thead .mdx-tbl-col-fmt-checkbox").length > 0)
                fmChk++;
            if ($(this).find("thead .mdx-tbl-col-fmt-num").length > 0)
                fmNum++;
        });
        statData += "&tbl-fm-b=" + fmBold;
        statData += "&tbl-fm-em=" + fmEm;
        statData += "&tbl-fm-u=" + fmUnderline;
        statData += "&tbl-fm-m=" + fmMark;
        statData += "&tbl-fm-d=" + fmDel;
        statData += "&tbl-fm-chk=" + fmChk;
        statData += "&tbl-fm-num=" + fmNum;

        // 带单元格合并的表格数
        statData += "&tbl-cell-merge=" + $("table[data-vk-cell-merge='true']").length;

        // 带行折叠的表格数
        statData += "&tbl-row-group=" + $("table[data-vk-row-group='true']").length;

        // 代码块数据
        statData += "&cb=" + $(".md-fences").length;
        statData += "&cb-fold=" + $("p[data-vk-container='pre'][data-vk-content-folded='true']").length;
        statData += "&cb-cap1=" + $("div[id^=vk-id-codeblock] .mdx-caption-1 strong").length;
        statData += "&cb-cap2=" + $("div[id^=vk-id-codeblock] .mdx-caption-2").length;

        // 标签数据
        statData += "&tag=" + $("code[class^=mdx-tag-c]").length;
        statData += "&tag2=" + $("code[class^=mdx-tag-name]").length;

        // 引用数据
        statData += "&bq=" + $("blockquote").length;
        statData += "&bq-fold=" + $("[data-vk-blockquote-folded='true']").length;

        // 脚注数据
        statData += "&fn=" + $(".md-footnote").length;

        // 当前文档的 URL
        statData += "&url=" + window.location.href;

        // 对数据进行编码
        statData = encodeURI(statData);

        // 提交统计数据
        let vlookStat = $("iframe[name='vlook-stat-gitee']");
        vlookStat.attr("src",
            "https://madmaxchow.gitee.io/vlook/act/" + (VLOOK.debugMode ? "dev-" : "") + "stat-gitee.html"
            + statData);
        VLOOK.debug("Stat. in Gitee:\n" + vlookStat.attr("src"));
    },

    /**
     * 上报事件统计数据（基于百度统计）
     * 为兼容在本地打开的 HTML 文件，所以通过 iframe 的方式进行数据上报
     *
     * @param data 数据数组，与百度统计的 _hmt.push(["_trackEvent", data[0], data[1], data[2], data[3]) 的参数保持一致
     */
    push : function (data) {
        $("body").append('<iframe name="vk-event-' + VLOOK.report.eventCount + '" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"'
            + ' src="https://madmaxchow.gitee.io/vlook/act/'
            + (VLOOK.debugMode ? "dev-" : "")
            + 'event-gitee.html'
            + "?category=" + (VLOOK.debugMode ? "dev-" : "") + data[0]
            + "&action=" + data[1]
            + "&label=" + data[2]
            + "&value=" + data[3]
            + "&debug=" + VLOOK.debugMode
            + '"></iframe>');

        // 默认在指定时间后回收 iframe 资源
        setTimeout(VLOOK.report.recycleResources, 10000);
        VLOOK.report.eventCount++;
    },

    /**
     * 转换标签名为 VLOOK 中的特定内容类型名称
     */
    transTagName : function (tagName) {
        if (tagName === "img" || tagName === "svg")
            return "Figure";
        else if (tagName === "table")
            return "Table";
        else if (tagName === "pre")
            return "CodeBlock";
        return "Unknown";
    },

    /**
     * 移除上报事件的资源
     */
    recycleResources : function () {
        $("iframe[name^=vk-event-]").each(function () {
            $(this).remove();
            return false; // 执行一次即跳出，即每次只删除当前最早创建的
        });
    },

    // 上报事件的累计次数，用于标识不同的上报事件 iframe 的 id
    eventCount: 0,
} // VLOOK.report

// ==================== 随机颜色类 ==================== //

// 颜色
function RandomColor() {
    this.palette = []; // 不相似颜色的色板

    /**
     * 生成随机颜色
     *
     * @returns string R/G/B 颜色分量是数组
     */
    this.generate = function () {
        let rgb = [0, 0, 0],
            d = [0, 0, 0];

        // 三原色值若偏差太少（避免饱和度过低），则重新生成
        // 偏差 0.25 仅为经验值
        while (d[0] < 0.25 || d[1] < 0.25 || d[2] < 0.25) {
            // 不取 30 以下的三原色分量
            rgb[0] = Math.floor(Math.random() * 100 + Math.random() * 120) + 30;
            rgb[1] = Math.floor(Math.random() * 100 + Math.random() * 120) + 30;
            rgb[2] = Math.floor(Math.random() * 100 + Math.random() * 120) + 30;

            d[0] = Math.abs(rgb[0] - rgb[1]) / rgb[0];
            d[1] = Math.abs(rgb[1] - rgb[2]) / rgb[1];
            d[2] = Math.abs(rgb[2] - rgb[0]) / rgb[2];
        }
        return rgb;
    }

    /**
     * 生成不相似的随机颜色
     *
     * @returns string R/G/B 颜色分量是数组
     */
    this.dissimilarRgb = function () {
        // 色板为空时，生成随机颜色后直接返回
        let rgb = [0, 0, 0];
        if (this.palette.length === 0) {
            rgb = this.generate();
            this.palette.push(rgb);
            return rgb;
        }

        // 色板不为空时，避免相似的颜色
        let finished = false,
            times = 0,
            d = [0, 0, 0];

        // 随机生成不相似的颜色（最多尝试次数上限为 20）
        while (finished === false && times < 20) {
            rgb = this.generate();
            // 判断新生成的随机颜色，色板中是否已有相似的
            let i = 0;
            for (i = 0; i < this.palette.length; i++) {
                d[0] = (this.palette[i][0] - rgb[0]) / 256;
                d[1] = (this.palette[i][1] - rgb[1]) / 256;
                d[2] = (this.palette[i][2] - rgb[2]) / 256;
                // 比例两个颜色的 RGB 色差来作为相似性的依据（0.3 为经验值，值越大差异最大）
                if (Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) < 0.3)
                    break;
            }

            // 色板中没有找到相似的颜色
            if (i === this.palette.length) {
                this.palette.push(rgb);
                finished = true;
            }
            times++;
        }
        return rgb;
    }

    /**
     * 格式化颜色为 rgba 格式
     *
     * @param rgb RGB 颜色分量数组
     * @param opacity 透明度，0:透明，1:不透明
     */
    this.format = function (rgb, opacity) {
        return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + opacity + ")";
    }

    /**
     * 重置调色板
     */
    this.reset = function () {
        VLOOL.color.palette.length = 0;
    }
}

// ==================== 处理耗时计时器类 ==================== //

/**
 * 构造函数
 */
function Stopwatch() {
    this.startTime = null; // 重置后的初始时间
    this.lapTime = null; // 每次中间计时的初始时间

    /**
     * 重置计时器
     */
    this.reset = function () {
        this.startTime = new Date().getTime();
    }

    /**
     * 一次中间计时开始
     */
    this.lapStart = function (title) {
        if (title !== undefined)
            console.log(title);
        this.lapTime = new Date().getTime();
    }

    /**
     * 一次中间计时结束
     *
     * @param prefix 输出内容前缀
     * @param silent 是否为静默模式，true：是
     */
    this.lapStop = function (prefix, silent) {
        let timeCost = new Date().getTime() - this.lapTime;
        // 非静默模式时，输出计时结果
        if (silent !== true) {
            let msg = prefix + "⏱ " + timeCost + " ms";
            if (timeCost < 300)
                console.info(msg);
            else if (timeCost < 500)
                console.warn(msg);
            else
                console.error(msg);
        }
        return timeCost;
    }

    /**
     * 计时器结束
     */
    this.stop = function () {
        return new Date().getTime() - this.startTime;
    }

    // 初始化计时器
    this.reset();
}

// ==================== 欢迎页 ==================== //

/**
 * 构造函数
 *
 * @param mode 欢迎页显示模式
 */
function WelcomePage(mode) {
    let that = this;
    this.ui = $(".mdx-welcome-page"); // 欢迎页主界面
    this.button = $(".mdx-welcome-page-loading"); // 关闭欢迎页按钮
    this.tips = $(".mdx-welcome-page-tips"); // 欢迎信息
    this.finished = false; // 是否已加载
    this.mode = mode; // 模式：

    /**
     * 完成所有内容加载后调用
     */
    this.done = function () {
        // 关闭欢迎页事件
        this.button.unbind("click").click(function () {
            that.close();
        });

        this.ui.css("cursor", "default");
        this.stopAnimation();

        this.tips.css("animation", "none");

        this.updateCloseButton(null);
        this.button.addClass("mdx-btn-welcome-page-done");

        this.finished = true;

        // auto 模式时延时自动关闭
        if (this.mode === "auto")
            this.autoClose();
        // wait 模式
        else if (this.mode === "wait")
            this.button.addClass("wait");
    }

    /**
     * 自动延时关闭
     */
    this.autoClose = function () {
        let delaySecs = 3,
            closeTimer = null;

        __timeToClose();
        function __timeToClose() {
            that.updateCloseButton(delaySecs);
            delaySecs--;
            if (delaySecs < 0) { // 倒计时结束
                clearTimeout(closeTimer);
                that.close();
            }
            else
                closeTimer = setTimeout(__timeToClose, 1000);
        }
    }

    /**
     * 更新关闭按钮
     *
     * @param sec 显示倒计时的秒数
     */
     this.updateCloseButton = function (sec) {
        that.button.html([
            "开始阅览",
            "開始閱覽",
            "Start Reading",
            "Commence À Lire",
            "Lesen Starten",
            "Haga Clic Para Comenzar",
            "Начать Чтение",
            "読み始める",
            "읽 기 시작 하 다"
        ][VLOOK.lang.id]
            + (sec == null ? "" : " <span> (" + sec + "s)</span>"));
    }

    /**
     * 停止加载时的呼吸动画
     */
    this.stopAnimation = function () {
        this.tips.css("animation", "none");
    }

    /**
     * 关闭欢迎页
     */
    this.close = function () {
        this.ui.hide();
        VLOOK.doc.scroll.unfreeze();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.finished === false || this.ui.isHidden())
            return;

        switch (code) {
            case 13: // ENTER
                // 关闭欢迎页
                this.close();
                break;
        }
    }

    // 初始执行
    if (this.mode === "none")
        this.close();
    else
        VLOOK.ui.show(this.ui);
}

// ==================== 内容助手类 ==================== //

function ContentAssistor() {
    let that = this;
    this.ui = $(".mdx-content-assistor");
    this.buttons = {
        openInFigureNav : $(".mdx-btn.assistor.open-in-figure-nav"), // 插图浏览器中打开
        tableCross : $(".mdx-btn.assistor.table-cross"), // 表格阅读模式（十字光标）
        copyCodeBlock : $(".mdx-btn.assistor.copy-code-block"), // 复制代码块
        picInPic : $(".mdx-btn.assistor.pic-in-pic") // 「画中画」
    }

    // 最后显示新标签打开按钮的内容（插图/表格等）
    this.lastHover = undefined;

    /**
     * 初始化内容助手
     */
    this.init = function () {
        // 在插图浏览器中打开
        this.buttons.openInFigureNav.unbind("click").click(function () {
            iContentAssistor.hide();
            iFigureNav.show(that.lastHover);
        });
        //  开/关表格阅读模式（十字光标）
        this.buttons.tableCross.unbind("click").click(function () {
            TableCross.toggle(that.lastHover);
        });
        // 复制代码块
        this.buttons.copyCodeBlock.unbind("click").click(function () {
            ExtCodeBlock.copy($(this));
        });
        // 画中画
        this.buttons.picInPic.unbind("click").click(function () {
            PicInPic.show(that.lastHover);
        });

        __bindButtonEvent(this.buttons.openInFigureNav);
        __bindButtonEvent(this.buttons.tableCross);
        __bindButtonEvent(this.buttons.copyCodeBlock);
        __bindButtonEvent(this.buttons.picInPic);

        /**
         * 绑定事件
         * @param source 源对象
         */
        function __bindButtonEvent(source) {
            source.hover(function () {
                iToolTips.show($(this), "auto");
            }, function () {
                iToolTips.hide();
            });
        }
    }

    /**
     * 绑定对象的 hover 行为
     *
     * @param target 目标对象
     * @param contentType 内容类型：Figure/Table/CodeBlock
     */
    this.bind = function (target, contentType) {
        target.hover(function () {
            VLOOK.ui.removeAnimate(that.ui);
            if (that.lastHover !== target)
                that.hide();
            that.lastHover = target;
            that.show(contentType);
        }, function () {
            if (__mouseDropIn(that.lastHover) === false) {
                that.hide();
            }
        });
    }

    /**
     * 显示指定内容的内容助手
     *
     * @param contentType 内容类型：Figure/Table/CodeBlock
     */
    this.show = function (contentType) {
        // 移动端不显示
        if (env.device.mobile)
            return;

        // 插图
        if (contentType === "Figure") {
            this.buttons.openInFigureNav.addClass("enabled first");
            this.buttons.tableCross.removeClass("enabled");
            this.buttons.copyCodeBlock.removeClass("enabled");
            this.buttons.picInPic.removeClass("first").addClass("enabled last");
        }
        // 表格
        else if (contentType === "Table") {
            this.buttons.openInFigureNav.removeClass("enabled");
            this.buttons.tableCross.addClass("enabled first");
            this.buttons.copyCodeBlock.removeClass("enabled");
            this.buttons.picInPic.addClass("enabled").removeClass("first").addClass("last");
        }
        // 代码块
        else if (contentType === "CodeBlock") {
            this.buttons.openInFigureNav.removeClass("enabled");
            this.buttons.tableCross.removeClass("enabled");
            this.buttons.copyCodeBlock.addClass("enabled first");
            this.buttons.picInPic.addClass("enabled").addClass("last");
        }

        // ----------------------------------------
        // 计算助手显示的位置
        let caption = this.lastHover.parent(),
            className = caption.attr("class"),
            container = caption.parent(),
            offset = 0;
            // 对于存在横向滚动的情况时，须计算其偏移量用来位置调整
        if (className !== undefined && className.indexOf("mdx-caption") > -1
            && container !== undefined) {
                className = container.attr("class");
                if (className !== undefined && className.indexOf("mdx-caption-container") > -1) {
                    let capWidth = parseInt(caption.width()),
                        conWidth = parseInt(container.width());
                    if (capWidth > conWidth)
                        offset = capWidth - conWidth + 1;
                }
        }
        this.ui.css({
            "left" : this.lastHover.offset().left
                + this.lastHover.width() + 1
                - this.ui.width()
                + parseInt(this.lastHover.css("padding-left"))
                + parseInt(this.lastHover.css("padding-right"))
                - offset,
            "top" : this.lastHover.offset().top + 3
        });

        // 须延时后再执行显示，让以上代码先完成
        setTimeout(function () {
            VLOOK.ui.addAnimate(that.ui);
            VLOOK.ui.show(that.ui);
        }, 50);
    }

    /**
     * 隐藏内容辅助动作按钮
     */
    this.hide = function () {
        VLOOK.ui.hide(this.ui);
    }

    /**
     * 判断鼠标当前位置是否落在指定对象的区域范围内
     *
     * @param target 指定对象
     */
    __mouseDropIn = function (target) {
        let e = (event || window.event),
            mx = e.pageX || e.clientX + document.body.scrollLeft,
            my = e.pageY || e.clientY + document.body.scrollTop,
            padding = parseInt(target.css("padding-top")) * 2;
        return !(mx < target.offset().left || mx > (target.offset().left + target.width() + padding)
            || my < target.offset().top || my > (target.offset().top + target.height() + padding));
    }
}

// ==================== 画中画类 ==================== //

function PicInPic() {}

PicInPic.ui = {
    body : undefined,
    content : undefined,
    close : undefined
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
    PicInPic.ui.body = $(".mdx-pic-in-pic");
    PicInPic.ui.content = $(".mdx-pic-in-pic > .mdx-content");
    PicInPic.ui.zoom = $(".mdx-pip-btn.mdx-zoom");
    PicInPic.ui.close = $(".mdx-pip-btn.mdx-close");

    // 缩放事件处理
    PicInPic.ui.zoom.unbind("click").click(function () {
        let zoom = $(this),
            pipBtn = $(".mdx-pip-btn");
        if (PicInPic.ratio === 1) {
            PicInPic.ratio = 0.75;
            pipBtn.removeClass("zoom-in").addClass("zoom-out");
            zoom.html(VLOOK.ui.generateSvgIcon("icoZoomIn", 16, 16, "theme"));
        }
        else {
            PicInPic.ratio = 1;
            pipBtn.removeClass("zoom-out").addClass("zoom-in");
            zoom.html(VLOOK.ui.generateSvgIcon("icoZoomOut", 16, 16, "theme"));
        }
        PicInPic.zoom();
    });

    PicInPic.ui.close.unbind("click").click(function () {
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
        VLOOK.ui.show(PicInPic.ui.zoom);
        VLOOK.ui.show(PicInPic.ui.close);
    }, function () {
        VLOOK.ui.hide(PicInPic.ui.zoom);
        VLOOK.ui.hide(PicInPic.ui.close);
    });
}

/**
 * 显示画中画
 *
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
     *
     * @param source 源对象
     */
    function __cloneForPicInPic (source) {
        let openAll = false,
            tagName = source.prop("tagName").toLowerCase();
        // 针对表格的处理
        if (tagName === "table") {
            // 1. 先展开所有行分组
            openAll = RowGroup.openAll(source, "auto");
            // 2. 先展开长内容
            let container = source.parent().parent();
            if (container.attr("data-vk-content-folded") === "true")
                iContentFolder.expand(container.next());
        }

        // 将来源对象的内容进行克隆
        let newClone = source.clone();
        newClone.css({
            "margin" : 0,
            "border" : 0
        });
        PicInPic.ui.content.append(newClone);

        // 针对插图的处理
        if (tagName === "img" || tagName === "svg") {
            newClone.removeAttr("data-vk-fig-num");
            if (tagName === "svg")
                newClone.addClass("mdx-mermaid-restyler");
        }

        // 对展开了所有行分组的表格进行克隆后的干净处理
        if (openAll === true) {
            RowGroup.reset(newClone); // 重置、切断
            RowGroup.closeAll(source, "auto"); // 全部收起
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
    PicInPic.ui.body.css({
        "width" : PicInPic.size.width,
        "height" : PicInPic.size.height
    });
}

/**
 * 调整画中画的基准大小，以适应内容的实际大小
 */
PicInPic.fitContentSize = function (source) {
    // 宽度
    let tagName = source.prop("tagName").toLowerCase(),
        w = source.width(),
        h = source.height(),
        sourcePadding = parseInt(source.css("padding-top")) * 2,
        uiPadding = parseInt(PicInPic.ui.body.css("padding-top")) * 2;

    // 针对图片尺寸的兼容性处理（部分浏览器不使用该处理尺寸不正常，如：Firefox）
    if (tagName === "img") {
        let img = new Image();
        img.src = source.attr("src");
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
        PicInPic.ui.body.css({
            "width" : wWithPadding,
            "transform-origin" : PicInPic.size.width + "px " + PicInPic.size.height + "px"
        });
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
        PicInPic.ui.body.css({
            "height" : hWithPadding,
            "transform-origin" : PicInPic.size.width + "px " + PicInPic.size.height + "px"
        });
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
    VLOOK.ui.removeAnimate(PicInPic.ui.zoom);
    VLOOK.ui.removeAnimate(PicInPic.ui.close);

    PicInPic.ui.body.css({
        "transform" : "scale(" + PicInPic.ratio + ")",
        "transform-origin" : PicInPic.size.width + "px " + PicInPic.size.height + "px"
    });

    setTimeout(function () {
        VLOOK.ui.addAnimate(PicInPic.ui.zoom);
        VLOOK.ui.addAnimate(PicInPic.ui.close);
    }, 50);
}

// ==================== 聚光灯类 ==================== //

/**
 * 构造函数
 *
 * @param radius 半径大小
 * @param tips 操作提示栏对象
 */
function Spotlight(radius, tips) {
    this.ui = $(".mdx-spotlight");
    this.radius = radius; // 聚光灯半径
    this.tips = tips;
    this.zoom = {
        normal: radius, // 标准大半径
        bigger: radius * 1.4, // 放大的半径
    };
    this.lastPos = {
        x : -1,
        y : -1
    };

    this.toolbar = undefined; // 联动的工具栏

    /**
     * 切换聚光灯的不同大小
     */
    this.toggleZoom = function () {
        if (this.ui.isHidden())
            return;

        VLOOK.report.push(['Presentation', 'Spotlight', 'Zoom', 0]);

        this.radius = this.radius < this.zoom.bigger
            ? this.zoom.bigger
            : this.zoom.normal;

        this.repaint();
    }

    /**
     * 使用聚光灯模式
     */
    this.useSpotlight = function () {
        this.toolbar.buttons["laser-pointer"].removeClass("selected");
        this.toolbar.buttons["spotlight"].addClass("selected");

        this.pointer = false;
        this.mode = "S";
        this.ui.show();
        $(this.pointerScope).removeClass("mdx-cursor-laser");
        this.repaint();

        let key1 = "<kbd>⇧ Shift</kbd>",
            key2 = "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>";
        this.tips.show([
            key1 + "调整聚光灯大小" + key2 + "退出",
            key1 + "調整聚光燈大小" + key2 + "退出",
            key1 + "Adjust the size of the spotlight" + key2 + "Exit",
            key1 + "Ajustez la taille du projecteur" + key2 + "Sortie",
            key1 + "Passen Sie die Größe des Scheinwerfers an" + key2 + "Ausfahrt",
            key1 + "Ajusta el tamaño del foco" + key2 + "Salida",
            key1 + "Отрегулируйте размер прожектора" + key2 + "Выход",
            key1 + "スポットライトのサイズを調整します" + key2 + "終了",
            key1 + "스포트라이트의 크기를 조정하십시오" + key2 + "종료"
        ][VLOOK.lang.id]);
    }

    /**
     * 刷新聚光灯的显示
     *
     * @param event window.event 鼠标事件对象
     */
    this.repaint = function (event) {
        // 记录鼠标最新位置，避免通过快捷键显示时无法在鼠标位置正常渲染
        if (event !== undefined) {
            if (event.clientX !== undefined)
                this.lastPos.x = event.clientX;
            if (event.clientY !== undefined)
                this.lastPos.y = event.clientY;
        }

        // 未启用则跳过
        if (this.isEnabled() === false)
            return;

        // 聚光灯模式
        if (this.pointer === false) {
            this.ui.css("background", "radial-gradient(circle at "
                + this.lastPos.x + "px " + this.lastPos.y + "px, "
                + "transparent " + this.radius + "px, "
                + "rgba(0, 0, 0, 0.4)" + (this.radius + 2) + "px, rgba(0, 0, 0, 0.9) 900px)");
        }
    }

    /**
     * 是否已显示
     */
    this.isEnabled = function () {
        return this.ui.isShowed();
    }

    /**
     * 切换聚光灯的开关
     */
    this.toggle = function () {
        VLOOK.report.push(['Presentation', 'Spotlight', 'Show/Hide', 0]);

        // 已打开，则关闭
        if (this.isEnabled()) {
            this.hide();
        }
        // 未打开，则打开
        else {
            this.useSpotlight();
            return true;
        }
        return false;
    }

    /**
     * 隐藏聚光灯
     */
    this.hide = function () {
        iMoreDocContent.refresh();
        this.tips.hide();
        this.toolbar.buttons["spotlight"].removeClass("selected");
        this.ui.hide();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (VLOOK.doc.block === true)
            return;

        switch (code) {
            case 16: // Shift
                if (this.pointer === false)
                    this.toggleZoom();
                break;
            case 27: // ESC
                this.hide();
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
    this.tips = tips;
    this.toolbar = undefined; // 联动的工具栏

    this.enable = false;

    // 激光笔模式时鼠标形状影响的范围
    this.pointerScope = "body, rt, #write, .mdx-textfield > input, .mdx-blockquote-folder, audio, video, .mdx-audio-mini-control, .mdx-tbl-row-g-btn, .mdx-textfield-action, .mdx-segment-btn, .mdx-nav-center, .md-toc-item, .mdx-toc-item, .mdx-btn, .mdx-accent-btn, .mdx-toolbar, .mdx-figure, .mdx-figure-nav, .mdx-figure-content, .mdx-figure-nav-btns, .mdx-btn-close-figure-nav, .mdx-black-curtain, a, img, .mdx-chapter-nav-prev, .mdx-chapter-nav-current, .mdx-chapter-nav-next, .mdx-link-result-error, .mdx-toc-tab-button";

    /**
     * 使用激光笔
     */
    this.useLaserPointer = function () {
        this.toolbar.buttons["spotlight"].removeClass("selected");
        this.toolbar.buttons["laser-pointer"].addClass("selected");

        this.enable = true;
        $(this.pointerScope).addClass("mdx-cursor-laser");

        this.tips.show("<kbd>ESC</kbd>" + ["退出", "退出", "Exit", "Sortie", "Ausfahrt", "Salida", "Выход", "終了", "종료"][VLOOK.lang.id]);
    }

    /**
     * 是否已显示
     */
    this.isEnabled = function () {
        return this.enable === true;
    }

    /**
     * 切换激活笔开关
     */
    this.toggle = function () {
        VLOOK.report.push(['Presentation', 'LaserPointer', 'Show/Hide', 0]);

        // 已打开，则关闭
        if (this.isEnabled()) {
            this.hide();
        }
        // 未打开，则打开
        else {
            this.useLaserPointer();
            return true;
        }
        return false;
    }

    /**
     * 隐藏激活笔
     */
    this.hide = function () {
        iMoreDocContent.refresh();
        this.tips.hide();
        this.enable = false;
        this.toolbar.buttons["laser-pointer"].removeClass("selected");
        $(this.pointerScope).removeClass("mdx-cursor-laser");
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
     this.disposeHotkey = function (code, combKeys) {
        if (VLOOK.doc.block === true)
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

// ==================== 分段控制器类 ==================== //

/**
 *
 * @param control 控件 UI 对象
 * @param group 分段控制器分组标识
 */
function SegmentControl(control, group) {
    let that = this;
    this.ui = control;
    this.group = group;

    this.last = undefined;
    this.segments = [];
    this.segmentCount = 0;

    this.ui.append('<span class="mdx-segment-indicator"></span>');
    this.indicator = this.ui.children(".mdx-segment-indicator"); // 当前选中分段的滑块

    VLOOK.ui.addAnimate(this.indicator);

    /**
     * 添加分段
     *
     * @param target 分段对应的组件
     * @param icon 分段使用的图标标识
     * @param checked 是否为默认选中
     * @param status 默认状态
     */
    this.add = function (target, icon, checked, status) {
        let name = target.typeName();
        this.segmentCount++;
        this.segments[name] = target;

        // 新增段的 UI
        let id = this.group + "-" + name,
            ui = '<input id="' + id + '" onfocus="this.blur()" type="radio" name="' + this.group
                + '"' + (status === true ? '' : ' data-vk-result="none"')
                + ' value="' + name + '"' + (checked === true ? ' checked' : '' ) + ' />'
                + '<label for="' + id + '" class="mdx-segment-btn ' + name + '" data-vk-icon="' + icon + '">'
                + VLOOK.ui.generateSvgIcon(icon, 16, 16, "dark")
                + '</label>';
        this.ui.append(ui);
        target.ui.entry = this.ui.children(".mdx-segment-btn." + name);
        VLOOK.ui.addAnimate(target.ui.entry);

        // 指定为默认选项
        if (checked === true) {
            this.last = target;
            __updateIcon(true);
        }

        // 为新添加的段绑定事件
        this.ui.find("input#" + id).change(function () {
            // 隐藏切换前选择的组件
            that.last.hide();
            __updateIcon(false);
            // 显示最新选择的组件
            that.last = that.segments[$(this).val()];
            __updateIcon(true);

            that.last.show();
            that.update();
        });

        return this.segments[name];

        /**
         * 更新分段的图标
         *
         * @param checked 是否为选择状态
         */
        function __updateIcon(checked) {
            that.last.ui.entry.html(VLOOK.ui.generateSvgIcon(that.last.ui.entry.attr("data-vk-icon")
                + (checked ? "-checked" : "") , 16, 16, "dark"));
        }
    }

    /**
     * 获得当前选中的分段
     *
     * @returns 当前选中的分段
     */
    this.checkedItem = function () {
        return this.ui.find('input[name="' + this.group + '"]:checked').val();
    }

    /**
     * 获得、设置指定分段的状态
     *
     * @returns 无 value 时，返回指定分段的状态
     */
    this.status = function (target, value) {
        let id = this.group + "-" + target.typeName();
        if (value === undefined) {
            this.ui.find('label[for="' + id + '"]').addClass("mdx-result-none");//.css("opacity", "0.2");
            return this.ui.find('input[id="' + id + '"]').attr("data-vk-result");
        }

        if (value === true) {
            this.ui.find('label[for="' + id + '"]').removeClass("mdx-result-none");//.css("opacity", "1");
            this.ui.find('input[id="' + id+ '"]').removeAttr("data-vk-result");
        }
        else {
            this.ui.find('label[for="' + id + '"]').addClass("mdx-result-none");//.css("opacity", "0.2");
            this.ui.find('input[id="' + id+ '"]').attr("data-vk-result", "none");
        }
    }

    /**
     * 更新分段控制器界面
     */
    this.update = function () {
        // 更新各分段 UI 大小、间隔等
        let space = 2,
            spacePercent = (space * (this.segmentCount - 1)) / this.ui.width() * 100,
            width = (100 - spacePercent) / this.segmentCount;
        this.ui.children(".mdx-segment-btn").css({
            "margin" : "0 0 0 " + space + "px",
            "width" : width + "%"
        });
        // 修正第一个
        this.ui.children(".mdx-segment-btn:first").css({
            "margin" : 0
        });

        // 更新当前选择分段相关 UI
        if (this.last === undefined)
            return;
        let target = this.last.ui.entry;
        this.indicator.css({
            "left" : target.position().left + parseInt(target.css("margin-left")),
            "width" : target.width()
        });
    }
}

// ==================== 导航中心类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function NavCenter(mask) {
    let that = this;
    this.ui = $(".mdx-nav-center"); // 导航中心主界面
    this.handle = $(".mdx-toc-handle"); // 导航中心引导把手

    // 关键字搜索
    this.__keywordBody = $(".mdx-search-by-keyword");
    this.keyword = new TextField(this.__keywordBody, "toc-filter-nav-center", true);

    this.closeMode = "auto"; // 关闭导航中心的方式
    this.displayMode = "float"; // 最后一次的显示方式（float/block）
    this.showed = false; // 是否已显示

    this.width = this.ui.width(); // 导航中心宽度

    this.chapterNav = undefined; // 联动的章节导航栏
    this.toolbar = undefined; // 联动的工具栏

    this.snapTimer = null; // 鼠标在边缘悬停计时器

    // 索引内容分类选择
    this.segments = new SegmentControl($(".mdx-segment.toc"), "toc-segment");
    TocIndex.segments = this.segments;

    // 目录索引组件
    this.catalog = this.segments.add(new TocCatalog(this, false), "icoTocTabCatalog", true, false);
    // 插图索引组件
    this.figure = this.segments.add(new TocFigure(this, true), "icoTocTabFigure", false, false);
    // 表格索引组件
    this.table = this.segments.add(new TocTable(this, true), "icoTocTabTable", false, false);
    // 多媒体索引组件
    this.media = this.segments.add(new TocMedia(this, true), "icoTocTabMedia", false, false);
    // 代码块索引组件
    this.codeblock = this.segments.add(new TocCodeblock(this, true), "icoTocTabCodeblock", false, false);
    // 访问历史组件
    this.history = this.segments.add(new TocHistory(this, true), "icoTocTabHistory", false, false);

    // 文库
    this.docLib = new DocLib(new BackgroundMask("doc-lib", "center"), this);

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui);

    this.segments.update();

    VLOOK.ui.addAnimate(this.handle);
    VLOOK.ui.addAnimate(this.keyword.ui);

    /**
     * 当前章节变化事件
     */
    this.catalog.onChapterChanged = function () {
        // 更新逐章导航内容
        if (that.chapterNav !== undefined)
            that.chapterNav.update();
    }

    // 关键字输入组件属性设置
    this.keyword.setIcon(VLOOK.ui.generateSvgIcon("icoRetrieval", 16, 16, "alpha"));
    this.keyword.placeholder([
        "输入搜索",
        "輸入搜尋",
        "Type to search",
        "Tapez à la recherche",
        "TYPEN, um zu suchen",
        "Tipo para buscar",
        "Тип для поиска",
        "検索するタイプ",
        "검색 할 입력하십시오"
    ][VLOOK.lang.id]);

    // 绑定输入框事件处理
    this.keyword.onInput = function (source, value) {
        that.catalog.resultNav.restart();
        that.figure.resultNav.restart();
        that.table.resultNav.restart();
        that.media.resultNav.restart();
        that.codeblock.resultNav.restart();

        if (value.trim().length === 0) {
            // 目录
            that.catalog.ui.result.empty();
            if (that.segments.checkedItem() === that.catalog.typeName())
               that.catalog.ui.body.show();
            that.catalog.hideFilterResult();
            that.catalog.scrollToCurrent();
            that.catalog.updateStatus();
            // 插图、表格、多媒体、代码块
            TocIndex.noneKeyword(that.figure);
            TocIndex.noneKeyword(that.table);
            TocIndex.noneKeyword(that.media);
            TocIndex.noneKeyword(that.codeblock);
        }
        else {
            // 目录
            that.catalog.filterByKeyword(value.toLowerCase());
            // 插图、表格、多媒体、代码块
            TocIndex.filterByKeyword(that.figure, value.toLowerCase());
            TocIndex.filterByKeyword(that.table, value.toLowerCase());
            TocIndex.filterByKeyword(that.media, value.toLowerCase());
            TocIndex.filterByKeyword(that.codeblock, value.toLowerCase());
        }
    }

    this.keyword.onFocus = function (source) {
        if (that.displayMode !== "float") {
            VOM.doc().addClass("actived");
            let search = $(".mdx-focus-search");
            search.addClass("actived");
            VLOOK.ui.addAnimate(search);
        }
    }

    this.keyword.onBlur = function (source) {
        VOM.doc().removeClass("actived");
        $(".mdx-focus-search").removeClass("actived");
    }

    // 绑定输入框事件处理
    this.keyword.pressEnter = function (source, value) {
        that.keyword.input.focus();
    }

    /**
     * 触发互动事件
     */
    this.onInteractive = function () {
        that.adjustClickHash();
    }

    // 当前文档不是 mini 类型（文库类文档一般为 mini 类型）
    if (VLOOK.type !== "mini") {
        // 文库
        if (this.docLib.length === 0)
            alert("Instantiation failed [ iDocLib ]");
        else if (VLOOK.util.getParamValue("dl") !== "none")
            this.docLib.init();
    }

    /**
     * 跳转回文档封面
     */
    this.gotoCover = function () {
        VLOOK.report.push(['Outline', 'Goto', 'Cover', 0]);
        window.location.href = "#";
        // 【有封面】模式时处理
        if (VOM.cover() !== undefined) {
            if (this.catalog.currentItem !== undefined) {
                this.catalog.currentItem.removeClass("mdx-toc-item-current");
                this.catalog.currentHeaderIndex = -1;
            }
            this.adjust();
            this.chapterNav.adjust();
            this.toolbar.adjust();
        }
        // 【无封面】模式时处理
        else {
            iToolTips.hide();
        }
    }

    /**
     * 适配锚点击事件
     */
    this.adjustClickHash = function () {
        if (that.displayMode === "float")
            that.hide("auto");
    }

    /**
     * 显示/隐藏导航中心
     *
     * @param callback 显示/隐藏导航中心后执行回调函数
     */
    this.toggle = function (callback) {
        // 导航中心已显示
        if (this.showed === true) {
            this.hide("manual");
        }
        // 导航中心未显示
        else {
            this.closeMode = "auto";
            // 在封面，或小屏
            if (this.catalog.inHeader() === false || VLOOK.ui.isSmallScreen() === true) {
                this.show("float");
            }
            // 在章节内，非小屏
            else {
                // 没有手动关闭导航中心时，自动显示导航中心
                if (this.closeMode === "auto")
                    this.show("block");
            }
        }

        typeof(callback) === "function" && callback();
        this.afterToggle();
    }

    /**
     * 显示导航中心
     *
     * @param displayMode float: 以浮动形式显示，block: 以占位形式显示
     * @returns boolean true: 需要处理显示，false: 已显示，无须重复处理
     */
    this.show = function (displayMode) {
        // 已显示，或在以动画显示过程中
        if (VLOOK.type !== "max" || this.showed === true || this.ui.offset().left > -this.width) {
            // this.handle.hide();
            return false;
        }

        this.ui.css({
            "left" : 20
        });
        this.handle.hide();

        this.displayMode = displayMode;
        // 以「占位方式」显示导航中心
        if (this.displayMode === "block") {
            // 占位方式的样式设置
            this.ui.removeClass("mdx-nav-center-float");
            this.ui.removeClass("mdx-float-card");
            this.ui.addClass("mdx-nav-center-block");

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                this.toolbar.buttons["outline"].addClass("selected");

            VOM.doc().css({
                "margin-left" : "calc(var(--vlook-nav-center-width) + 30px)"
            });

            // 因为从切换为占位显示后，会影响文档内容布局，所以须重定位至当前锚点
            if (this.showed !== true) {
                setTimeout(function () {
                    VLOOK.util.redirectToHash();
                }, 300);
            }
        }
        // 以「浮动方式」显示导航中心
        else if (this.displayMode === "float") {
            // 浮动方式的样式设置
            this.ui.removeClass("mdx-nav-center-block");
            this.ui.addClass("mdx-nav-center-float");
            this.ui.addClass("mdx-float-card");

            // 显示联动的遮罩
            this.mask.show();

            // 若文档可视空间比导航中心宽度要小，则进行微调
            if ($(window).width() < this.width + 20)
                this.ui.css("width", $(window).width() - 20);
            // 若文档空间比导航中心宽度大，则直接显示原始大小
            else
                this.ui.css("width", this.width);
        }

        this.showed = true;
        return true;
    }

    /**
     * 隐藏导航中心
     *
     * @param closeMode 关闭导航中心的的方式（auto/manual）
     * @returns boolean true: 需要处理隐藏，false: 已显示，无须重复处理
     */
    this.hide = function (closeMode) {
        // 已隐藏，或在以动画隐藏过程中
        if (this.showed === false || this.ui.offset().left < 10)
            return false;

        // 若最后一次显示以是「占位方式」显示
        if (this.displayMode === "block") {
            // 记录是否手动关闭
            this.closeMode = closeMode;

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                this.toolbar.buttons["outline"].removeClass("selected");
        }

        this.ui.css({
            "left" : VLOOK.util.getStyleValue("--vlook-nav-center-hidden-left")
        });

        // 恢复不挤压文档正文区
        VOM.doc().css({
            "margin-left" : 0
        });

        this.mask.hide();

        // 非移动设备时显示把手
        if (!env.device.mobile)
            this.showHandle();

        this.showed = false;

        return true;
    }

    /**
     * 导航中心根据规则进行布局的自适应处理
     *
     * @returns boolean true: 需要处理显示/隐藏，false: 已显示/隐藏，无须重复处理
     */
    this.adjust = function () {
        let result = false;

        // 根据导航中心宽度更新相关界面组件的样式
        if (this.showed && this.displayMode === "block")
            VOM.doc().css({
                "margin-left" : "calc(var(--vlook-nav-center-width) + 30px)"
            });

        this.width = this.ui.width();

        this.keyword.setWidth(this.width - 2 - parseInt(this.__keywordBody.css("margin-left")) * 2);

        // 根据最新窗口大小调整宽度
        this.segments.update();

        // 在封面，或为小屏
        if (this.catalog.inHeader() === false || VLOOK.ui.isSmallScreen() === true) {
            // 自动隐藏导航中心
            result = this.hide("auto");

            // 根据最新窗口大小调整收起位置
            this.ui.css({
                "left" : "var(--vlook-nav-center-hidden-left)"
            });

            // 更新工具栏导航中心按钮图标
            if (!env.device.mobile)
                this.toolbar.buttons["outline"].removeClass("selected");
        }
        // 不在封面
        else {
            // 没有手动关闭导航中心时，自动显示导航中心
            if (this.closeMode === "auto") {
                // 以占位方式显示导航中心
                result = this.show("block");

                // 根据最新窗口大小调整导航中心宽度
                this.ui.css({
                    "width" : "var(--vlook-nav-center-width)"
                });

                // 更新工具栏导航中心按钮图标
                if (!env.device.mobile)
                    this.toolbar.buttons["outline"].addClass("selected");
            }
        }
        return result;
    }

    /**
     * 显示导航中心引导把手
     */
    this.showHandle = function () {
        if (VLOOK.type !== "max")
            return;

        this.handle.css({
            "top" : ($(window).height() - this.handle.height()) / 2
        });
        that.handle.show();
    }

    /**
     * 鼠标位置变化对导航中心处理
     */
    this.snap = function (event) {
        // 已显示则跳过
        if (this.showed === true || env.device.mobile)
            return;

        // 鼠标离左边缘小于指定值时
        if (event.clientX <= 20) {
            if (this.snapTimer != null)
                return;

            this.handle.addClass("hover");

            // 延时（模拟悬停一定时间）以浮动方式显示导航中心
            this.snapTimer = setTimeout(function () {
                that.handle.removeClass("hover");
                that.show("float");
            }, 500);
        }
        else {
            // 未显示导航中心前离开边缘则取消显示
            if (this.snapTimer != null) {
                clearTimeout(this.snapTimer);
                this.snapTimer = null;
                this.handle.removeClass("hover");
            }
        }
    }

    /**
     * 显示/隐藏导航中心，并进行关联处理
     */
     this.afterToggle = function () {
        if (iNavCenter.displayMode === "block")
            iContentFolder.adjust();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        // 文档库热键操作
        this.docLib.disposeHotkey(code, combKeys);

        if (this.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                if (that.displayMode === "float")
                    that.hide();
                break;
        }
    }
}

/**
 * 为Outline中子元素添加附加属性和事件
 */
NavCenter.init = function () {
    // 提取文档中由[toc]标签生成的文档目录作为浮动outline中的内容
    let toc = $(".md-toc");
    // 没有生成目录
    if (toc.isEmpty()) {
        NavCenter.hideOnError();
        return false;
    }

    // 有生成目录，则复制 toc 内容
    let vlookToc = toc.clone();
    // 隐藏原目录
    toc.hide();
    // 将复制的目录进行唯一性标识
    vlookToc.find(".md-toc-content").attr("id", "vlook-toc")
    iNavCenter.catalog.ui.body.append(vlookToc);

    // 没有目录内容
    let tocContent = $("#vlook-toc");
    if (tocContent.isEmpty()) {
        NavCenter.hideOnError();
        return false;
    }

    // 有 Typora 生成的原始目录
    let tocSet = tocContent.children(".md-toc-h1, .md-toc-h2, .md-toc-h3, .md-toc-h4, .md-toc-h5, .md-toc-h6"),
        tocSetLength = tocSet.length,
        hasCover = (VOM.cover() !== undefined);
    tocSet.each(function (i) {
        // 只处理 h1～h5 的目录节点
        if ($(this).attr("class").indexOf("md-toc-h6") === -1) {
            if (hasCover) { // 文档有封面时
                if (i < tocSetLength - 1) // 未到最后一个元素
                    iNavCenter.catalog.add($(this));
                else // 最后一个 h1 为封底，移除
                    $(this).remove();
            }
            else
                iNavCenter.catalog.add($(this));
        }
        // 移除无效的目录节点（如：封面、封底、普通的 h6 节点）
        else
            $(this).remove();
    });

    // 默认收起所有含子章节的 h1 章节
    tocContent.children(".md-toc-h1[data-vk-node='1'][data-vk-folded='false']").each(function () {
        iNavCenter.catalog.disposeFold($(this).attr("id"), "c", true);
    });

    return true;
}

/**
 * 隐藏导航中心（异常情况使用）
 */
NavCenter.hideOnError = function () {
    iNavCenter.hide();

    console.error([
        "文档中没有找到目录信息，请用Typora最新版本导出，并应用最新VLOOK插件",
        "文檔中沒有找到目錄信息，請用Typora最新版本導出，並應用最新VLOOK插件",
        "No [TOC] information was found in the document, export it with the latest version of Typora and apply the latest VLOOK plug-in.",
        "Les informations du répertoire ne figurent pas dans la documentation, veuillez les exporter avec la dernière version de Typora et appliquer le dernier plug-in VLOOK.",
        "Das Dokument enthält keine [TOC] -Informationen. Exportieren Sie es mit der neuesten Version von Typora und wenden Sie das neueste VLOOK-Plug-In an.",
        "No se encontró información [TOC] en el documento, expórtelo con la última versión de Typora y aplique el último complemento VLOOK.",
        "Информация в каталоге не найдена в документации, пожалуйста, экспортируйте ее с последней версией Typora и примените последний плагин VLOOK",
        "ドキュメントにディレクトリ情報が見つからない場合は、Typoraの最新バージョンでエクスポートし、最新のVLOOKプラグインを適用してください",
        "설명서에 디렉토리 정보가 없으므로 Typora 최신 버전으로 내보내고 최신 VLOOK 플러그인을 적용하십시오."
    ][VLOOK.lang.id]);
}

// ==================== 逐章导航类 ==================== //

/**
 * 构造函数
 *
 * @param navCenter 关联的导航中心对象
 */
function ChapterNav(navCenter) {
    let that = this,
        __prev = ".mdx-chapter-nav-prev",
        __current = ".mdx-chapter-nav-current",
        __next = ".mdx-chapter-nav-next",
        __docTitle = ".mdx-chapter-nav-doc-title";
    // 逐章导航面板主界面
    this.ui = $(".mdx-chapter-nav");

    this.prev = {
        ui : $(__prev), // 前一章界面
        text: $(".mdx-chapter-nav-prev-text"), // 前一章文本界面
    };

    this.current = {
        ui : $(__current), // 当前章节界面
    };

    this.next = {
        ui : $(__next), // 后一章界面
        text : $(".mdx-chapter-nav-next-text"), // 后一章文本界面
    };

    // 文档标题
    this.docTitle = $(__docTitle);
    this.docTitle.text($(document).attr("title"));

    // 关联的导航中心对象
    this.navCenter = navCenter;

    if (VLOOK.type !== "max")
        this.ui.hide();

    /**
     * 初始化动效
     */
    this.adjustEffects = function (target) {
        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (VLOOK.ui.effects >= 1) {
            $(target).addClass("effect");
            VLOOK.ui.addAnimate($(target + ".effect"));
        }
        else {
            $(target).removeClass("effect").addClass("noeffect");
        }
    }
    // 初始化动效
    this.adjustEffects(__prev);
    this.adjustEffects(__current);
    this.adjustEffects(__next);
    this.adjustEffects(__docTitle);

    /**
     * 跳转至前一章节
     */
    this.prev.ui.unbind("click").click(function () {
        if (that.prev.text.attr("data-vk-anchor") === "cover")
            that.navCenter.gotoCover();
        else
            that.navCenter.catalog.gotoHeader(that.prev.text);
    });

    /**
     * 回到封面
     */
    this.docTitle.unbind("click").click(function () {
        if ($(this).attr("disabled") === undefined)
            that.navCenter.gotoCover();
    });

    /**
     * 跳转至当前章节
     */
    this.current.ui.unbind("click").click(function () {
        that.navCenter.catalog.gotoHeader(that.current.ui);
    });

    /**
     * 跳转至后一章节
     */
    this.next.ui.unbind("click").click(function () {
        that.navCenter.catalog.gotoHeader(that.next.text);
    });

    /**
     * 更新逐章导航栏 UI 及数据
     */
    this.update = function () {
        let currentIndex = this.navCenter.catalog.currentHeaderIndex;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (currentIndex > 0) {
            this.prev.ui.show();
            this.prev.ui.css("display", "block");
            this.prev.text.text($("#" + this.navCenter.catalog.headers[currentIndex - 1]).text());
            this.prev.text.attr({
                "title" : this.prev.text.text(),
                "data-vk-anchor" : this.navCenter.catalog.headers[currentIndex - 1]
            });

            // 【无封面】模式时处理
            if (VOM.cover() === undefined) {
                this.docTitle.removeClass("in-start");
                this.docTitle.removeAttr("disabled");
                this.adjustEffects(__docTitle);
                __bindEvent(this.docTitle, "center");
            }
        }
        // 当前章节为第 1 章时特殊处理，设置为「封面」
        else if (this.navCenter.catalog.inFirstHeader()) {
            this.prev.text.text(["封面", "封面", "Cover", "Couverture", "Startseite", "Cubrir", "передняя крышка", "カバー", "표지"][VLOOK.lang.id]);
            this.prev.text.attr({
                "title" : this.prev.text.text(),
                "data-vk-anchor" : "cover"
            });
        }
        // 「无封面」模式时对「文档标题」章节的特殊处理
        else if (this.navCenter.catalog.inDocTitle()) {
            this.prev.ui.hide();
            this.current.ui.hide();
            // 调整为在文档开始位置时的样式
            this.docTitle.removeClass("noeffect effect hover");
            this.docTitle.addClass("in-start");
            this.docTitle.attr("disabled", "true");
            VLOOK.ui.unbindHover(this.docTitle);
        }

        // ----------------------------------------
        // 更新「当前章节」导航内容
        if (this.navCenter.catalog.currentItem !== undefined) {
            // 【无封面】模式
            if (this.navCenter.catalog.inDocTitle())
                this.current.ui.hide();
            else
                this.current.ui.show();

            this.current.ui.text(this.navCenter.catalog.currentItem.attr("title"));
            this.current.ui.attr("data-vk-anchor", this.navCenter.catalog.headers[currentIndex]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (currentIndex < this.navCenter.catalog.headers.length - 1) {
            this.next.ui.show();
            this.next.text.text($("#" + this.navCenter.catalog.headers[currentIndex + 1]).text());
            this.next.text.attr({
                "title" : this.next.text.text(),
                "data-vk-anchor" : this.navCenter.catalog.headers[currentIndex + 1]
            });
        }
        else
            this.next.ui.hide();
    }

    /**
     * 显示逐章导航栏
     */
    this.show = function () {
        // 若已显示则直接退出
        if (VLOOK.type !== "max" || parseInt(this.ui.css("top")) >= 0)
            return;

        this.ui.addClass("mdx-float-card");
        this.ui.css({
            "top" : 0
        });
        this.ui.show();
    }

    /**
     * 隐藏逐章导航栏
     */
    this.hide = function () {
        // 若已隐藏则直接退出
        if (parseInt(this.ui.css("top")) < 0)
            return;

        this.ui.removeClass("mdx-float-card");
        this.ui.css({
            "top" : -50
        });
        this.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    this.adjust = function () {
        // 在封面时，隐藏逐章导航栏
        if (this.navCenter.catalog.inHeader() === false) {
            this.hide();

            // 初始化前 / 后章节数据
            this.prev.text.attr("data-vk-anchor", "cover");
            this.next.text.attr("data-vk-anchor", this.navCenter.catalog.headers[0]);
        }
        // 不在封面时，显示逐章导航栏
        else {
            this.show();
            this.update();
        }
    }

    /**
     * 逐章导航导航按钮在不同终端的适配处理
     */
    this.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            this.prev.ui.unbind("hover");
            this.current.ui.unbind("hover");
            this.next.ui.unbind("hover");
        }
        // 非移动设备时绑定样式事件
        else {
            // 上一章
            __bindEvent(this.prev.ui, "auto");
            // 文档标题
            __bindEvent(this.docTitle, "center");
            // 当前章节
            __bindEvent(this.current.ui, "center");
            // 下一章
            __bindEvent(this.next.ui, "right");
        }
    }

    /**
     *
     * 绑定操作相关事件
     *
     * @param source 对象
     * @param align 对齐方式，auto/center/right
     */
    function __bindEvent(source, align) {
        VLOOK.ui.bindHover(source);
        source.hover(function () {
            iToolTips.show(source, align);
        }, function () {
            iToolTips.hide();
        });
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (VLOOK.doc.block === true)
            return;

        switch (code) {
            case 188: // <
            case 37: // ←
                this.prev.ui.trigger("click");
                // 自适应页面内容显示
                this.navCenter.catalog.focusHeader();
                break;
            case 190: // >
            case 39: // →
                this.next.ui.trigger("click");
                // 强制设置滚动间隔已超时，以强制触发 focusHeader 中的处理
                VLOOK.doc.scroll.update(0, 0);
                // 自适应页面内容显示
                this.navCenter.catalog.focusHeader();
                break;
        }
    }
}

// ==================== 段落导航类 ==================== //

/**
 * 构造函数
 *
 * @param tips 操作提示栏对象
 */
function ParagraphNav(tips) {
    let that = this;
    this.tips = tips;
    this.count = 0; // 段的总数量
    this.currentIndex = -1; // 当前段索引号
    this.enabled = false; // 是否段落导航激活

    this.toolbar = undefined; // 联动的工具栏

    /**
     * 返回当前段落
     */
    this.current = function () {
        if (this.currentIndex === -1)
            return undefined;
        return $("[data-vk-id='vk-pg-" + this.currentIndex + "']");
    }

    /**
     * 切换段落导航开关
     *
     * @returns boolean true：开启，false：关闭
     */
    this.toggle = function (target) {
        this.enabled = !this.enabled;
        if (this.enabled === true) {
            VLOOK.report.push(['ParagraphNav', 'Action', 'Enabled', 0]);

            this.toolbar.buttons["paragraph-nav"].addClass("selected");
            iMoreDocContent.hideAfter();

            // 显示工具底栏提示信息
            let key1 = "<kbd>J</kbd>/<kbd>K</kbd>",
                key2 = "&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>",
                key3 = "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>";
            this.tips.show([
                key1 + "前/后段落" + key2 + "前/后十个段落" + key3 + "退出",
                key1 + "前/後段落" + key2 + "前/後十個段落" + key3 + "退出",
                key1 + "front/back paragraph" + key2 + "front/back ten paragraphs" + key3 + "Exit",
                key1 + "paragraphe avant/arrière" + key2 + "dix paragraphes avant/arrière" + key3 + "Sortie",
                key1 + "vorderer/hinterer Absatz" + key2 + "vorne/hinten 10 Absätze" + key3 + "Ausfahrt",
                key1 + "párrafo delantero/trasero" + key2 + "anverso/reverso 10 párrafos" + key3 + "Salida",
                key1 + "передний / задний абзац" + key2 + "передний / задний десять абзацев" + key3 + "Выход",
                key1 + "前後の段落" + key2 + "前後の10段落" + key3 + "終了",
                key1 + "앞 / 뒤 단락" + key2 + "앞 / 뒤 10 단락" + key3 + "종료"
            ][VLOOK.lang.id]);

            this.goto(target);
            return true;
        }
        else {
            this.hide();
        }
        return false;
    }

    /**
     * 添加段落
     */
    this.add = function (item) {
        item.attr("data-vk-id", "vk-pg-" + this.count);
        item.attr("data-vk-pg-idx", this.count);
        this.count++;

        // 单击内容块处理
        item.unbind("click").click(function () {
            // 未激活段落导航模式模式
            if (iParagraphNav.enabled === false) {
                if (ThreeClicker.tick() === true
                    && iParagraphNav.toggle(item) === true) {
                        iSpotlight.hide();
                        iLaserPointer.hide();
                        // 取消文本选择
                        window.getSelection().removeAllRanges();
                    }
            }
            else {
                // event.stopPropagation(); // 停止事件冒泡
                that.goto(item);
            }
        });
    }

    /**
     * 上一个段
     *
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    this.prev = function (step) {
        if (this.enabled === false)
            return;

        this.blurFocus();

        // 未到首段
        if (this.currentIndex > 0) {
            this.currentIndex = this.currentIndex - step;

            if (this.currentIndex < 0)
                this.currentIndex = 0;

            // 如果目标内容块 item 跳转失败，则再尝试上一个
            if (this.goto() === false)
                this.prev(1);

            return true;
        }
        return false
    }

    /**
     * 下一个段
     *
     * @param step 跳转的步长
     * @returns boolean 跳转结果，true：成功，false：失败
     */
    this.next = function (step) {
        if (this.enabled === false)
            return;

        this.blurFocus();

        // 未到末段
        if (this.currentIndex < this.count - 1) {
            this.currentIndex = this.currentIndex + step;

            // 跳转 step 后修正超出最大值的情况
            if (this.currentIndex > this.count - 1)
                this.currentIndex = this.count - 1;

            // 如果目标内容块item跳转失败，则再尝试下一个
            if (this.goto() === false)
                this.next(1);

            return true;
        }
        return false;
    }

    /**
     * 跳到指定的内容块，或最新的_blockFocusItemIndex指定的内容块
     *
     * @param target 跳转的目标。null: 指定跳到上/下一个位置，非null: 指定的目标位置
     */
    this.goto = function (target) {
        this.blurFocus();

        // 初始化目标段
        let item = (target !== undefined)
            ? target
            : this.current();

        // 若目标聚焦块为空（可能是对象已在其他处理过程中被删除）、不可视等情况
        // 则返回跳转失败
        if (item === undefined || item.isHidden() || item.offset() === undefined)
            return false;

        // 添加高亮样式
        item.addClass("mdx-pg-current-item");
        this.currentIndex = parseInt(item.attr("data-vk-pg-idx"));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.height() * 3;
        if (item.offset().top !== 0
            && ((item.offset().top - height) < $(document).scrollTop()
            || (item.offset().top + height) > ($(document).scrollTop() + $(window).height()))) {
                DOM.html().scrollTop(item.offset().top - $(window).height() / 2);
        }

        return true; // 返回跳转成功
    }

    /**
     * 让当前聚焦段其失去聚焦效果
     */
    this.blurFocus = function () {
        if (this.current() !== undefined)
            this.current().removeClass("mdx-pg-current-item");
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    this.hide = function () {
        iMoreDocContent.refresh();
        this.tips.hide();
        this.toolbar.buttons["paragraph-nav"].removeClass("selected");
        this.enabled = false;
        this.blurFocus();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.enabled === false)
            return;

        switch (code) {
            case 74: // J
                TableCross.hide();
                if (this.next(1)) // 步长1
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 75: // K
                TableCross.hide();
                if (this.prev(1)) // 步长1
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 72: // H
                TableCross.hide();
                if (this.prev(10)) // 步长10，快速移动
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 76: // L
                TableCross.hide();
                if (this.next(10)) // 步长10，快速移动
                    ExtQuote.autoUnfold(); // 自动展开引用
                break;
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

/**
 * 初始化段落导航模式
 */
ParagraphNav.init = function() {
    iParagraphNav = new ParagraphNav(new BottomTips("paragraph-nav"));
    // 添加关联组件
    iParagraphNav.toolbar = iToolbar;

    // 先清理多余的段落标签
    $("li > p:only-child").contents().unwrap();

    // 初始化
    $("h1, h2, h3, h4, h5, h6, ul > li, ol > li, p[class!=md-toc-content][class!=mdx-caption-1][class!=mdx-caption-2], figure, .md-diagram-panel, .MathJax_SVG_Display").each(function () {
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
 *
 * @returns boolean true：成功触发三击，false：未满足触发三击
 */
ThreeClicker.tick = function () {
    // 未进入激活状态
    if (ThreeClicker.activeTime === 0)
        return false;

        // 与进入激活状态时间隔小于指定时间，则满足触发三击条件
    if (new Date().getTime() - ThreeClicker.activeTime < 300)
        return true;

    // 超过指定时间隔音则恢复为未激活
    ThreeClicker.activeTime = 0;
    return false;
}

// ==================== 工具栏类 ==================== //

/**
 * 构造函数
 *
 * @param navCenter 导航中心对象
 * @param chapterNav 章节导航对象
 */
function Toolbar(navCenter, chapterNav) {
    let that = this;
    this.ui = $(".mdx-toolbar"); // 工具栏主界面
    this.buttons = []; // 工具栏按钮集
    this.navCenter = navCenter;
    this.chapterNav = chapterNav;

    if (VLOOK.type !== "max")
        this.ui.hide();

    /**
     * 添加按钮
     *
     * @param name 按钮标识
     * @param clickEvent 按钮点击事件回调函数
     */
    this.add = function (name, clickEvent) {
        this.buttons[name] = $(".mdx-btn." + name);

        this.buttons[name].unbind("click").click(function () {
            iToolTips.hide();
            typeof(clickEvent) == "function" && clickEvent();
        });

        // hover 事件处理
        this.buttons[name].hover(function () {
            let btn = $(this),
                btnGroup = btn.attr("data-vk-btn-group");
            if (btnGroup !== undefined)
                $(".mdx-btn-group." + btnGroup).addClass("hover");
            iToolTips.show(btn, "auto");
        }, function () {
            let btn = $(this),
                btnGroup = btn.attr("data-vk-btn-group");
            if (btnGroup !== undefined)
                $(".mdx-btn-group." + btnGroup).removeClass("hover");
            iToolTips.hide();
        });
    }

    /**
     * 添加分隔条
     *
     * @param name 分隔条标识
     */
    this.addSpliter = function (name) {
        this.buttons[name] = $(".mdx-" + name);
    }

    /**
     * 自适应显示工具栏
     */
    this.adjust = function () {
        if (VLOOK.type !== "max")
            return;

        // 移动端下隐藏不必要的功能入口
        if (env.device.mobile === true) {
            this.buttons["paragraph-nav"].hide();
            this.buttons["spotlight"].hide();
            this.buttons["print"].hide();
            this.buttons["toolbar-spliter"].hide();
        }

        // 如果是小屏，或在封面
        if (VLOOK.ui.isSmallScreen() || this.navCenter.catalog.inHeader() === false) {
            // 调整具栏按钮分隔空间
            VLOOK.util.setStyleValue("--vlook-toolbar-btn-space", "5px");

            let offsetY = parseInt(this.chapterNav.ui.css("top"));
            // 小屏
            if (VLOOK.ui.isSmallScreen()) {
                this.ui.css({
                    "padding-left" : 0,
                    "padding-right" : 0,
                    "top" : 50 + offsetY
                });
            }

            // 微调工具栏分隔宽度
            this.buttons["toolbar-spliter"].css({
                "width" : 20
            });

            // 调整工具栏样式
            this.ui.removeClass("mdx-float-card");
            this.ui.addClass("cover");

            // 为去掉工具栏背景的按钮添加浮动样式
            this.ui.children(".mdx-btn, .mdx-btn-group").addClass("mdx-float-card");
            this.ui.children(".mdx-btn, .mdx-btn-group").addClass("float");

            // 大屏，回到封面及最开始位置进行二次调整
            if (VLOOK.ui.isSmallScreen() === false
                && this.navCenter.catalog.inHeader() === false) {
                if ($(document).scrollTop() <= 5) {
                    this.ui.css({
                        "padding-left" : 10,
                        "padding-right" : 10,
                        "top" : 10
                    });
                }
                else {
                    this.ui.css({
                        "padding-left" : 10,
                        "padding-right" : 10,
                        "top" : 0
                    });
                }
            }
            else {
                // 小屏，在非封面位置进行二次调整
                if (VLOOK.ui.isSmallScreen() && this.navCenter.catalog.inHeader())
                    this.ui.css({
                        "paddingLeft" : 0,
                        "padding-right" : 0,
                        "top" : 50 + offsetY
                    });
                else {
                    // 小屏，在封面及最开始位置进行二次调整
                    if ($(document).scrollTop() <= 5)
                        this.ui.css({
                            "padding-left" : 10,
                            "padding-right" : 10,
                            "top" : 10
                        });
                    // 小屏，在封面位置进行二次调整
                    else
                        this.ui.css({
                            "padding-left" : 10,
                            "padding-right" : 10,
                            "top" : 0
                        });
                }
            }
        }
        // 宽屏，且不在封面
        else {
            if (this.ui.offset().top === 0)
                return;

            // 调整具栏按钮分隔空间
            VLOOK.util.setStyleValue("--vlook-toolbar-btn-space", "2px");

            // 调整工具栏样式
            this.ui.removeClass("cover");
            this.ui.addClass("mdx-float-card");

            // 微调工具栏分隔宽度
            let btnCount = this.ui.find(".mdx-btn").length,
                btnWidth = parseInt(VLOOK.util.getStyleValue("--vlook-toolbar-btn-width")),
                space = parseInt(VLOOK.util.getStyleValue("--vlook-toolbar-btn-space"));
            this.buttons["toolbar-spliter"].css({
                "width" : "calc((var(--vlook-nav-center-width) - "
                    + (btnCount * btnWidth + parseInt(this.ui.css("padding-left")) * 2 + (btnCount - 4) * space) + "px) / 2)"
            });

            this.ui.css({
                "padding-left" : 10,
                "padding-right" : 10,
                "top" : 0
            });
            // 为增加了工具栏按钮的背景去掉浮动样式
            this.ui.children(".mdx-btn, .mdx-btn-group").removeClass("mdx-float-card");
            this.ui.children(".mdx-btn, .mdx-btn-group").removeClass("float");
        } // else
        this.ui.show();
    }

    /**
     * 更新工具栏按钮图标
     */
    this.updateIcons = function () {
        // 调整模式切换按钮图标
        if (ColorScheme.scheme === "light")
            this.buttons["color-scheme"].html(
                "<svg width='18px' height='18px'><use xlink:href='#icoDarkMode' class='mdx-svg-ico-light'/></svg>"
            );
        else
            this.buttons["color-scheme"].html(
                "<svg width='20px' height='20px'><use xlink:href='#icoLightMode' class='mdx-svg-ico-light'/></svg>"
            );
    }
}

// ==================== 颜色方案类 ==================== //

/**
 * 构造函数
 */
function ColorScheme(button) {}

ColorScheme.scheme = "light"; // 当前颜色以方案，light/dark
ColorScheme.schemeBeforePrint = "light"; // 打印前的颜色方案

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
        if (matcher.matches === true) {
            __updateIcons(true);
            ColorScheme.toggle("dark");
        }
        else {
            __updateIcons(false);
            ColorScheme.toggle("light");
        }
    }

    // 根据系统 Color Scheme 变化进行适配更新图标
    function __updateIcons(flag) {
        if (flag === true) {
            __setDarkIcon();
            ColorScheme.scheme = "dark";
        }
        else {
            __setLightIcon();
            ColorScheme.scheme = "light";
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
 *
 * @param scheme 指定方案，为空时则轮换
 */
ColorScheme.toggle = function (scheme) {
    if (scheme === undefined)
        scheme = (ColorScheme.scheme === "light") ? "dark" : "light";

    ColorScheme.scheme = scheme;
    console.info("    Switch to ... [ " + ColorScheme.scheme + " ]");
    // 应用最新颜色方案
    ColorScheme.refresh();

    if (iNavCenter.docLib.enabled === true) {
        iNavCenter.docLib.reload(ColorScheme.scheme);
    }
    console.info("    DONE!");
}

/**
 * 根据指定的颜色方案进行文档刷新
 */
ColorScheme.refresh = function () {
    // CSS 变量名称列表
    const varList = [
        "--vlook-invert-dark",
        "--vlook-brightness-dark",
        "--doc-bg-color",
        "--doc-bg-color-alt",
        "--doc-bg-color-transparent",
        "--doc-bg-color-alt-transparent",
        "--fore-color",
        "--blockquote-bg",
        "--a-color",
        "--mark-color",
        "--tbl-border-color",
        "--tbl-th-bg-color",
        "--tbl-td-bg-color",
        "--tbl-cell-border-color",
        "--tbl-row-g-alpha",
        "--del-color",
        "--toc-header-num-color",
        "--header-color",
        "--header-box-shadow",
        "--header-bg-start-color",
        "--header-bg-end-color",
        "--code-bg-color",
        "--code-name-shadow-color",
        "--tips-bg-color-inset",
        "--tips-bg-color",
        "--acc-color-red",
        "--acc-color-red-alt",
        "--acc-color-red-fade",
        "--acc-color-red-title",
        "--acc-color-orange",
        "--acc-color-orange-alt",
        "--acc-color-orange-fade",
        "--acc-color-orange-title",
        "--acc-color-yellow",
        "--acc-color-yellow-alt",
        "--acc-color-yellow-fade",
        "--acc-color-yellow-title",
        "--acc-color-green",
        "--acc-color-green-alt",
        "--acc-color-green-fade",
        "--acc-color-green-title",
        "--acc-color-cyan",
        "--acc-color-cyan-alt",
        "--acc-color-cyan-fade",
        "--acc-color-cyan-title",
        "--acc-color-blue",
        "--acc-color-blue-alt",
        "--acc-color-blue-fade",
        "--acc-color-blue-title",
        "--acc-color-purple",
        "--acc-color-purple-alt",
        "--acc-color-purple-fade",
        "--acc-color-purple-title",
        "--acc-color-pink",
        "--acc-color-pink-alt",
        "--acc-color-pink-fade",
        "--acc-color-pink-title",
        "--acc-color-brown",
        "--acc-color-brown-alt",
        "--acc-color-brown-fade",
        "--acc-color-brown-title",
        "--acc-color-gray",
        "--acc-color-gray-alt",
        "--acc-color-gray-fade",
        "--acc-color-gray-title",
        "--acc-color-theme1",
        "--acc-color-theme1-alt",
        "--acc-color-theme1-fade",
        "--acc-color-theme1-title",
        "--acc-color-theme2",
        "--acc-color-theme2-alt",
        "--acc-color-theme2-fade",
        "--acc-color-theme2-title",
        "--mm-color-red",
        "--mm-color-red-alt",
        "--mm-color-orange",
        "--mm-color-orange-alt",
        "--mm-color-yellow",
        "--mm-color-yellow-alt",
        "--mm-color-green",
        "--mm-color-green-alt",
        "--mm-color-cyan",
        "--mm-color-cyan-alt",
        "--mm-color-blue",
        "--mm-color-blue-alt",
        "--mm-color-purple",
        "--mm-color-purple-alt",
        "--mm-color-pink",
        "--mm-color-pink-alt",
        "--mm-color-brown",
        "--mm-color-brown-alt",
        "--mm-color-gray",
        "--mm-color-gray-alt",
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
    ];

    iToolbar.updateIcons();

    // 生成目标颜色方案值列表
    let schemeVarList = [];
    for (let i = 0, len = varList.length; i < len; i++) {
        schemeVarList.push(VLOOK.util.getStyleValue(varList[i] + "-" + ColorScheme.scheme));
    }
    // 遍历所有变量实现 ColorScheme 切换
    for (let i = 0, len = varList.length; i < len; i++) {
        VLOOK.util.setStyleValue(varList[i], schemeVarList[i]);
    }

    // 针对 Dark Mode 进行适配处理
    ExtFigure.adjustColorScheme(true);

}

/**
 * 根据颜色方案对浏览器兼容性处理
 */
ColorScheme.afterToggle = function () {
    $(".mdx-copyright").children("svg").html("<use xlink:href='#icoVLOOK-" + ColorScheme.scheme + "'></use>");
}

// ==================== 字体风格选项、选择器类 ==================== //

/**
 * 构造函数
 *
 * @param ui 选项的 UI
 * @param fonts 字体集数组
 */
function FontStyleOption(ui, fonts) {
    this.ui = ui;
    this.fonts = fonts;
    this.fontCount = this.fonts.length;
}

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function FontStyler(mask) {
    let that = this;
    this.style = undefined; // 当前字体风格，sans：非衬线（小清新），serif：衬线（文艺范）
    this.ui = $(".mdx-font-styler"); // 字体风格切换选择界面
    // 小清新字体风格选项
    this.sansStyle = new FontStyleOption($(".mdx-fontstyle-sans"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
            ]);
    // 艺术范字体风格选项
    this.serifStyle = new FontStyleOption($(".mdx-fontstyle-serif"),
        [
            "VLOOK Number/normal/normal", "VLOOK Number/normal/bold", "VLOOK Number/italic/normal",
            "VLOOK Sans Mono/normal/normal", "VLOOK Sans Mono/normal/500", "VLOOK Sans Mono/normal/bold", "VLOOK Sans Mono/normal/900",
            "VLOOK Sans/normal/normal", "VLOOK Sans/normal/bold", "VLOOK Sans/normal/900"
        ]);
    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui);

    VLOOK.ui.addAnimate(this.ui);

    // 绑定各字体风格选项事件
    this.sansStyle.ui.unbind("click").click(function () {
        that.apply("sans");
        that.hide();
    });
    this.serifStyle.ui.unbind("click").click(function () {
        that.apply("serif");
        that.hide();
    });

    /**
     * 初始化
     */
    this.init = function () {
        // 动态加载字体 VLOOK Sans Mono
        this.loadFont("VLOOK Sans Mono", "normal", "normal", "NotoSansMono", "NotoSansMono-Regular", "ttf", "woff2");
        this.loadFont("VLOOK Sans Mono", "normal", "500", "NotoSansMono", "NotoSansMono-Medium", "ttf", "woff2");
        this.loadFont("VLOOK Sans Mono", "normal", "bold", "NotoSansMono", "NotoSansMono-Bold", "ttf", "woff2");
        this.loadFont("VLOOK Sans Mono", "normal", "900", "NotoSansMono", "NotoSansMono-Black", "ttf", "woff2");

        // 动态加载字体 VLOOK Number
        this.loadFont("VLOOK Number", "normal", "normal", "Altinn-DIN", "Altinn-DIN", "otf", "woff2");
        this.loadFont("VLOOK Number", "normal", "bold", "Altinn-DIN", "Altinn-DIN-Bold", "otf", "woff2");
        this.loadFont("VLOOK Number", "italic", "normal", "Altinn-DIN", "Altinn-DIN-Italic", "otf", "woff2");

        // 动态加载字体 VLOOK Serif Mono
        this.loadFont("VLOOK Serif Mono", "normal", "normal", "LuxiMono", "LuxiMono-Regular", "ttf", "woff2");
        this.loadFont("VLOOK Serif Mono", "normal", "bold", "LuxiMono", "LuxiMono-Bold", "ttf", "woff2");
        this.loadFont("VLOOK Serif Mono", "italic", "normal", "LuxiMono", "LuxiMono-Italic-Regular", "ttf", "woff2");
        this.loadFont("VLOOK Serif Mono", "italic", "bold", "LuxiMono", "LuxiMono-Italic-Bold", "ttf", "woff2");

        // 动态加载字体 VLOOK Noto Sans CJK SC
        this.loadFont("VLOOK Sans", "normal", "normal", "NotoSansCJKsc", "NotoSansCJKsc-Regular", "otf", "woff2");
        this.loadFont("VLOOK Sans", "normal", "bold", "NotoSansCJKsc", "NotoSansCJKsc-Bold", "otf", "woff2");
        this.loadFont("VLOOK Sans", "normal", "900", "NotoSansCJKsc", "NotoSansCJKsc-Black", "otf", "woff2");

        // 动态加载字体 VLOOK Noto Serif CJK SC
        this.loadFont("VLOOK Serif", "normal", "500", "NotoSerifCJKsc", "NotoSerifCJKsc-Medium", "otf", "woff2");
        this.loadFont("VLOOK Serif", "normal", "900", "NotoSerifCJKsc", "NotoSerifCJKsc-Black", "otf", "woff2");

        // 加载超时检测
        setTimeout(function () {
            let langTimeout = "❌ " + ["超时", "超時", "Timeout", "Temps libre", "Auszeit", "Se acabó el tiempo", "Тайм-аут", "タイムアウト", "타임 아웃"][VLOOK.lang.id];
            if (that.sansStyle.fonts.length > 0)
                $("#fontset-sans-status").text(langTimeout);
            if (that.serifStyle.fonts.length > 0)
                $("#fontset-serif-status").text(langTimeout);
        }, 600000); // 10 分钟后进行超时检测
    }

    /**
     * 绑定选择字体风格操作按钮
     *
     * @param button 绑定的工具栏按钮
     */
    this.bindButton = function (button) {
        this.button = button; // 绑定的工具栏按钮
    }

    /**
     * 加载自定义字体
     *
     * @param fontFamily 自定义字体名称
     * @param fontStyle 字体样式
     * @param fontWeight 字重
     * @param srcFontName 字体源名称
     * @param srcFontSubName 字体源子名称
     * @param suffix 字体扩展名，支持 otf ttf
     * @param woff 加载 woff 的版本，支持 woff woff2，不加载不指定
     */
    this.loadFont = function (fontFamily, fontStyle, fontWeight, srcFontName, srcFontSubName, suffix, woff) {
        if (document.fonts && !this.isExist(fontFamily, fontStyle, fontWeight)) {
            let woffURL = "url('" + fontHost + srcFontName + "-" + woff + "/" + srcFontSubName + "." + woff + "') format('woff2')",
                fontFace = new FontFace(fontFamily,
                    ((woff !== undefined) ? woffURL : ""), {
                        style: fontStyle,
                        weight: fontWeight,
                        display: "swap"
                    });

            // 指定字体加载完成后回调函数
            fontFace.load().then(function(loadedFontFace) {
                document.fonts.add(loadedFontFace);

                let fontID = fontFamily + "/" + fontStyle + "/" + fontWeight,
                    langReady = "✅ " + ["已就绪", "已就緒", "Ready", "Prêt", "Bereit", "Listo", "готов", "準備完了", "준비된"][VLOOK.lang.id],
                    langLoading = ["加载中", "加載中", "Loading", "Chargement", "Wird geladen", "Cargando", "Загрузка", "読み込み中", "로딩 중"][VLOOK.lang.id];
                console.log("_____ FONT LOADED _____ ");
                console.log(fontID);

                // 更新小清新风格字体包下载进度
                for (let i = 0; i < that.sansStyle.fonts.length; i++) {
                    if (that.sansStyle.fonts[i] === fontID) {
                        that.sansStyle.fonts.splice(i, 1);
                        break;
                    }
                }
                let sansLoadedCount = that.sansStyle.fontCount - that.sansStyle.fonts.length,
                    sansStatus = $("#fontset-sans-status");
                if (sansLoadedCount < that.sansStyle.fontCount)
                    sansStatus.text(langLoading + "... (" + Math.round(sansLoadedCount / that.sansStyle.fontCount * 100) + "%)");
                else
                    sansStatus.text(langReady);

                // 更新艺术范风格字体包下载进度
                for (let i = 0; i < that.serifStyle.fonts.length; i++) {
                    if (that.serifStyle.fonts[i] === fontID) {
                        that.serifStyle.fonts.splice(i, 1);
                        break;
                    }
                }
                let serifLoadedCount = that.serifStyle.fontCount - that.serifStyle.fonts.length,
                    serifStatus = $("#fontset-serif-status");
                if (serifLoadedCount < that.serifStyle.fontCount)
                    serifStatus.text(langLoading + "... (" + Math.round(serifLoadedCount / that.serifStyle.fontCount * 100) + "%)");
                else
                    serifStatus.text(langReady);
            });
        }
    }

    /**
     * 检测指定自定义字体是否已加载
     *
     * @param fontFamily 自定义字体名称
     * @param fontStyle 字体样式
     * @param fontWeight 字重
     */
    this.isExist = function (fontFamily, fontStyle, fontWeight) {
        let values = document.fonts.values(),
            isHave = false,
            item = values.next();
        while (!item.done && isHave === false) {
            let fontFace = item.value;
            if (fontFace.family === fontFamily
                && fontFace.style === fontStyle
                && fontFace.weight === fontWeight) {
                    isHave = true;
                    console.log("///// FONT IS EXIST /////");
                    console.log(fontFamily + "/" + fontStyle + "/" + fontWeight);
            }
            item = values.next();
        }
        return isHave;
    }

    /**
     * 显示字体风格选择器
     */
    this.show = function () {
        this.mask.show();
        VLOOK.ui.moveToCenter(this.ui);
        this.ui.show();

        if (this.style === "sans") {
            this.sansStyle.ui.addClass("selected");
            this.serifStyle.ui.removeClass("selected");
        }
        else {
            this.serifStyle.ui.addClass("selected");
            this.sansStyle.ui.removeClass("selected");
        }
    }

    /**
     * 显示/隐藏字体风格选择器
     */
    this.toggle = function () {
        if (this.ui.css("display") === "block") {
            this.hide();
        }
        else {
            this.show();
        }
    }

    /**
     * 隐藏字体风格选择器
     */
    this.hide = function () {
        this.ui.hide();
        this.mask.hide();
    }

    /**
     * 应用指定字体风格
     *
     * @param style 指定应用的字体风格（sans/serif），不指定则以为当前字体风格
     */
    this.apply = function (style) {
        // 修正无指定样式的情况
        if (style === undefined)
            style = this.style;

        VLOOK.report.push(['Style', 'FontStyle', style, 0]);

        // 需要进行字体风格应用的分类与范围
        let text = "body"
            + ", .noteText tspan";
            // + ", ruby";
        let title = "#write > pre.md-meta-block:first-child + h6, #write > h6:first-child"
            + ", .mdx-backcover, #write > h1:last-child"
            + ", .mdx-welcome-page";
        let subtitle = ".mdx-copyright"
            + ", #write > pre.md-meta-block:first-child + h6 strong, #write > h6:first-child strong"
            + ", #write > pre.md-meta-block:first-child + h6 strong::before, #write > h6:first-child strong::before"
            + ", #write > pre.md-meta-block:first-child + h6 em, #write > h6:first-child em"
            + ", h6"
            + ", .outline-item"
            + ", .md-toc-item"
            + ", .mdx-tool-tips"
            + ", .mdx-info-tips"
            + ", .mdx-content-expander"
            + ", .mdx-welcome-page-loading"
            + ", .mdx-nav-center-header"
            + ", .mdx-chapter-nav-prev-text"
            + ", .mdx-chapter-nav-current"
            + ", .mdx-chapter-nav-next-text"
            + ", ::marker";
        let tag = ".mdx-tag-c1"
            + ", .mdx-tag-c2"
            + ", .mdx-tag-c3"
            + ", .mdx-tag-c4"
            + ", .mdx-tag-c5"
            + ", .mdx-tag-c6"
            + ", .mdx-tag-name1"
            + ", .mdx-tag-name2"
            + ", .mdx-tag-name3"
            + ", .mdx-tag-name4"
            + ", .mdx-tag-name5"
            + ", .mdx-tag-name6"
            + ", .mdx-tag-value1"
            + ", .mdx-tag-value2"
            + ", .mdx-tag-value3"
            + ", .mdx-tag-value4"
            + ", .mdx-tag-value5"
            + ", .mdx-tag-value6";
        let header = "h1, h2, h3, h4, h5, h6";
        let bold = "a, strong"
            + ", table > thead > tr > th"
            + ", table > thead > tr > td"
            + ", .mdx-tbl-col-fmt-bold"
            + ", .md-fn-count"
            + ", a[name^='ref-footnote-'], a[id^='ref-footnote-']"
            + ", .pieTitleText"
            + ", .legend text"
            + ", .slice"
            + ", .mermaid .label div"
            + ", .mdx-figure .label div"
            + ", .label div"
            + ", .cluster text"
            + ", #START rect+.label div"
            + ", text.actor"
            + ", .labelText tspan"
            + ", .loopText tspan"
            + ", g.stateGroup .state-title"
            + ", g.stateGroup text"
            + ", .taskText"
            + ", .taskTextOutsideRight"
            + ", .taskTextOutsideLeft"
            + ", .titleText"
            + ", .mdx-caption > p"
            + ", rp, rt";
        let number = ".mdx-tbl-col-fmt-num";
        let code = "figure table tr::before"
            + ", tt, code"
            + ", .md-fences"
            + ", g.cardinality text"
            + ", g.classGroup text"
            + ", g.classLabel .label"
            + ", kbd";
        // 字重配置
        let fontWeight = "strong"
            + ", ::marker"
            + ", table > thead > tr > th"
            + ", table > thead > tr > td"
            + ", .mdx-tbl-col-fmt-bold"
            + ", .pieTitleText"
            + ", .legend text"
            + ", .slice"
            + ", .mdx-actor-key-sys"
            + ", .labelText tspan"
            + ", .titleText"
            + ", strong a"
            + ", .mdx-black-curtain"
            + ", #write > pre.md-meta-block:first-child + h6 sub, #write > h6:first-child sub"
            + ", #write > pre.md-meta-block:first-child + h6 sup, #write > h6:first-child sup"
            + ", #write > pre.md-meta-block:first-child + h6 em, #write > h6:first-child em";

        // 移除当前的字体风格
        $(code).removeClass("mdx-font-code-" + this.style);
        $(tag).removeClass("mdx-font-code-" + this.style);
        $(tag).removeClass("mdx-font-tag-" + this.style);
        $(text).removeClass("mdx-font-text-" + this.style);
        $(header).removeClass("mdx-font-header-" + this.style);
        $(title).removeClass("mdx-font-title-" + this.style);
        $(bold).removeClass("mdx-font-bold-" + this.style);
        $(number).removeClass("mdx-font-number-" + this.style);
        $(subtitle).removeClass("mdx-font-subtitle-" + this.style);
        $(fontWeight).removeClass("mdx-font-weight-bold-" + this.style);

        // 更新到指定的字体风格
        this.style = style;
        $(code).addClass("mdx-font-code-" + style);

        $(tag).removeClass("mdx-font-code-" + style); // 针对 code.addClass 后的二次调整
        $(tag).addClass("mdx-font-tag-" + style);

        $(text).addClass("mdx-font-text-" + style);
        $(header).addClass("mdx-font-header-" + style);

        $(bold).addClass("mdx-font-bold-" + style);

        $(number).addClass("mdx-font-number-" + this.style);

        $(subtitle).removeClass("mdx-font-header-" + style); // 针对 header.addClass 后的二次调整
        $(subtitle).removeClass("mdx-font-bold-" + style); // 针对 header.addClass 后的二次调整
        $(subtitle).addClass("mdx-font-subtitle-" + style);

        $(title).removeClass("mdx-font-header-" + style); // 针对 header.addClass 后的二次调整
        $(title).removeClass("mdx-font-subtitle-" + style); // 针对 header.addClass 后的二次调整
        $(title).addClass("mdx-font-title-" + style);

        $(fontWeight).addClass("mdx-font-weight-bold-" + style);

        // 保存最后一次应用的字体风格
        VLOOK.data.set("font-style", iFontStyler.style);
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

// ==================== 脚注类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function FootNote(mask) {
    let that = this;
    this.ui = $(".mdx-foot-note-panel"); // 脚注主界面
    this.content = $(".mdx-foot-note-panel-content"); // 脚注内容区

    this.buttonSeeAll = $(".mdx-foot-note-panel-all"); // 查看所有脚注按钮
    this.buttonSeeAll.unbind("click").click(function () {
        that.hide();
        // 跳转至所有脚注区域
        window.location.href = "#vk-footer-area";
    });

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui);

    /**
     * 显示脚注弹层
     */
    this.show = function () {
        // 显示关联的遮罩
        this.mask.show();

        if (VLOOK.ui.isSmallScreen())
            this.ui.css({
                "left" : 20,
                "right" : 20
            });
        else
            this.ui.css({
                "left" : "15%",
                "right" : "15%"
            });

        this.ui.show();
    }

    /**
     * 隐藏脚注弹层
     */
    this.hide = function () {
        this.ui.hide();
        this.mask.hide();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
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
    if (VOM.backcover() !== undefined)
        footnotesArea.insertBefore(VOM.backcover());
    // 「无封面」模式
    else
        VOM.doc().append(footnotesArea);

    // 将 VLOOK 生成的脚注区锚点调整到生成 HTML 后的实际位置
    $("#vk-footer-area").insertBefore(footnotesArea);

    // 移除默认的跳转属性
    let a = $("a[name^='ref-footnote-'], a[id^='ref-footnote-']");
    a.removeAttr("href");
    // 将脚注角标的事件替换为指定的处理事件
    a.unbind("click").click(function () {
        // 获取脚注【返回】链接对应的脚注原文信息
        let target = $("a[name='df" + $(this).attr("name") + "'], a[id='df" + $(this).attr("name") + "']").parent().clone();

        // 更新脚注弹层内容区
        console.log(target, target.text());
        iFootNote.content.html(target);
        // 移除默认的返回链接
        target.find("a[name^='dfref-footnote'], a[id^='dfref-footnote']").remove();

        // 显示脚注弹层
        iFootNote.show();
    });
}

// ==================== 链接检查器类 ==================== //

/**
 * 构造函数
 */
function LinkChecker(mask) {
    let that = this;
    this.ui = {
        list : $(".mdx-link-error-list"), // 坏链主界面
        header : $(".mdx-link-error-list-header"),
        body : $(".mdx-link-error-list-items"), // 坏链内容列表
        footer : $(".mdx-link-error-list-footer"),
        result : $(".mdx-link-chk-result") // 检查结果
    };

    this.icon = {
        error : VLOOK.ui.generateSvgIcon("icoLinkError", 20, 18, "light"),
        close : VLOOK.ui.generateSvgIcon("icoClose", 16, 16, "light")
    }

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui.list);

    // 滚动事件处理
    this.ui.body.scroll(function () {
        // 滚出了顶部则显示顶部渐变条
        if (that.ui.header.isHidden() && that.ui.body.scrollTop() > 10)
            that.ui.header.show()
        // 否则隐藏
        else if (that.ui.body.scrollTop() <= 10)
            that.ui.header.hide()
    });

    /**
     * 检查链接
     */
    this.checkLink = function () {
        let count = 0;

        // 检查所有页内链接对应的锚点是否都存在
        $("#write a").each(function () {
            let a = $(this),
                href = $(this).attr("href");
            // 忽略空链接，如 href="#"
            if (href === undefined || href.length <= 1)
                return true;

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
                    a.attr("id", id);

                    that.add(id, "🔗 <strong>" + [
                        "无效页内链接",
                        "無效頁內鏈接",
                        "Invalid Inner Link",
                        "Lien de page non valide",
                        "Ungültiger innerer Link",
                        "Enlace interno no válido",
                        "Недопустимая ссылка на страницу",
                        "ページリンクが無効です",
                        "잘못된 페이지 링크"
                    ][VLOOK.lang.id] + ":</strong> " + $(this).text());
                }
            }
        });
    }

    /**
     * 添加坏链项目
     *
     * @param id 坏链对象的标识
     * @param content 坏链项目显示的内容
     */
    this.add = function (id, content) {
        let item = $('<span data-vk-anchor="#' + id + '" class="mdx-toc-item">' + content + "</span>");
        // 添加链接异常样式及属性
        $(item.attr("data-vk-anchor")).attr("tabindex", 0).addClass("mdx-link-error-source");
        // 添加节点
        this.ui.body.append(item);
        item.unbind("click").click(function () {
            that.ui.body.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
            item.addClass("mdx-toc-item-current");

            VLOOK.util.gotoHash(item.attr("data-vk-anchor"));
            that.hide();
        });

        // 显示错误链接错误图标
        if (this.ui.result.isHidden()) {
            this.ui.result.addClass("mdx-link-result-error");
            this.ui.result.html(this.icon.error);

            // 更新状态栏中的样式
            $(".mdx-doc-info").css({
                "border-radius" : "var(--vlook-small-radius) 0 0 var(--vlook-small-radius)"
            });

            // 点击图标行为
            this.ui.result.unbind("click").click(function () {
                if (that.ui.list.isHidden())
                    that.show();
                else
                    that.hide();
            });
        }
    }

    /**
     * 显示坏链列表
     */
    this.show = function () {
        this.ui.list.show()
        that.mask.show();
    }

    /**
     * 隐藏坏链列表
     */
    this.hide = function () {
        this.ui.list.hide()
        this.mask.hide();

        this.ui.result.html(this.icon.error);
        VLOOK.doc.scroll.unfreeze();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.ui.list.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

// ==================== 背景遮罩类 ==================== //

/**
 * 构造函数
 *
 * @param id 标识
 * @param style 扩展样式：left / right / bottom / center
 * @param close 是否显示关闭提示器
 */
function BackgroundMask(id, style, close) {
    let that = this;
    this.style = style;

    // DOM.body().after
    VOM.doc().after('<div class="mdx-mask '
        + (style !== undefined ? style + ' ' : '') + id + ' mdx-backdrop-blurs">'
        + VLOOK.ui.copyrightInfo()
        + '</div>');

    // 根据动效等级初始化遮罩样式
    VLOOK.ui.initEffects();

    this.ui = $(".mdx-mask." + id);
    this.close = undefined;

    // 生成关闭提示器
    if (close !== undefined && close === true) {
        this.ui.append('<div class="mdx-mask-close ' + this.style + '">'
            + VLOOK.ui.generateSvgIcon("icoCloseTo-" + this.style, 60, 60, "light")
            + '</div>');
        this.close = this.ui.children(".mdx-mask-close");
    }

    this.partner = undefined;
    this.partnerUI = undefined;

    /**
     * 绑定联动对象
     *
     * @param partner 联动对象
     * @param ui 联动对象的 UI
     */
    this.bindPartner = function (partner, ui) {
        this.partner = partner;
        this.partnerUI = ui;
    }

    /**
     * 显示遮罩
     */
    this.show = function () {
        // 冻结滚动
        VLOOK.doc.scroll.freeze();
        VLOOK.doc.block = true;

        // 总是在 target 下显示
        this.ui.css("z-index", this.partnerUI.css("z-index") - 1);

        // 「关闭提示器」的处理
        if (this.close !== undefined) {
            // 默认是 style = left 的位置
            let offset = 30,
                x = parseInt(this.partnerUI.css("left")) + this.partnerUI.width() + offset,
                y = parseInt(this.partnerUI.css("top")) + (this.partnerUI.height() - this.close.height()) / 2;
            // left / right 的处理
            if (this.style === "left" || this.style === "right") {
                this.close.css({
                    "left" : this.style === "right"
                        ? parseInt(this.partnerUI.css("left")) - this.close.width() - offset
                        : x,
                    "top" : y
                });
            }
            // bottom 的处理
            else if (this.style === "bottom") {
                // x = parseInt(this.partnerUI.css("left")) + (this.partnerUI.width() - this.close.width()) / 2;
                y = parseInt(this.partnerUI.css("bottom")) + this.partnerUI.height() + offset;
                this.close.css({
                    "left" : "auto",
                    "top" : "auto",
                    "bottom" : y,
                    "margin-left" : "-" + (this.close.width() / 2) + 'px',
                    "padding" : "0px 50%"
                });
            }
        }

        // 点击遮罩隐藏联动对象
        this.ui.unbind("click").click(function () {
            // 取消冻结滚动
            VLOOK.doc.scroll.unfreeze();
            // 隐藏联动对应
            that.partner.hide();

            that.hide();
        });

        this.ui.show();
        // VLOOK.ui.show(this.ui);
    }

    /**
     * 隐藏遮罩
     */
    this.hide = function () {
        // 取消冻结滚动
        VLOOK.doc.scroll.unfreeze();
        VLOOK.doc.block = false;

        this.ui.hide();
    }
}

// ==================== 长内容折叠类 ==================== //

function ContentFolder() {
    let that = this;
    this.ui = $(".mdx-content-expander"); // 展开操作区的 UI 模板
    this.limit = VLOOK.debugMode ? 300 : 600; // 内容须折叠的高度限值
    this.contents = []; // 须进行折叠判断和处理的内容集
    this.buildTimers = [];

    this.rowNumFilter = "table tbody tr";

    /**
     * 添加内容
     */
    this.add = function (content) {
        this.contents.push(content);
    }

    /**
     * 适配内容展开操作区
     */
    this.adjust = function () {
        // 提前中断未完成的处理
        if (this.buildTimers.length > 0) {
            for (let i = 0, len = this.buildTimers.length; i < len; i++)
                clearTimeout(this.buildTimers.shift());
        }
        // 重新开始构建内容展开操作区
        this.rebuild();
    }

    /**
     * 重建部分内容展开操作区，主要是 img, table, .md-fences 等会因导航中心的显示/关闭
     * 导致文档宽度变化而引起的内容高度也跟随变化的情况
     * 如在不显示导航中心时因宽度较变，高度等比变高，或高度反而变短
     * 会导致应该显示展开操作区即不显示，或不应显示却显示的情况
     */
    this.rebuild = function () {
        // 重建需要重建的部分
        for (let i = 0, len = this.contents.length; i < len; i++) {
            // img 类长内容
            if (this.contents[i].prop("tagName").toLowerCase() === "img") {
                // 创建一个Image对象，实现图片的预下载
                let img = new Image();
                img.src = this.contents[i].attr("src");
                // 如果图片已经存在于浏览器缓存，直接处理
                if (img.complete)
                    this.buildTimers.push(
                        setTimeout(function () {
                            that.checkAndProcess(that.contents[i], true);
                        }, 50)
                    );
                // 等待图片下载完成后再处理
                else
                    img.onload = function () {
                        VLOOK.debug("img [" + img.src + "] loaded");
                        that.checkAndProcess(that.contents[i], true);
                    }
            }
            // 非 img 类长内容
            else {
                // 设置按不同时间间隔执行，减少在处理数量过多时，会阻塞 UI
                this.buildTimers.push(
                    setTimeout(function () {
                        that.checkAndProcess(that.contents[i], true);
                    }, 50)
                );
            }
        }
    }

    /**
     * 检测内容是否过长，过长则进行处理。适用于「插图、表格、代码块」等
     *
     * @param target 折叠的目标对象
     * @param rebuild 本次折叠是否属于重建的（如在页面加载后，由于页面正文区宽度变化后调用时属于重建）
     */
    this.checkAndProcess = function (target, rebuild) {
        let container = target.parent(),
            tagName = target.prop("tagName").toLowerCase();

        // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
        if (rebuild === true)
            container = container.parent();

        // 获得上一轮构建时生成的展开操作区，没有则初始为 undefined
        let oldExpander = container.next(),
            className = oldExpander.attr("class");
        if (className === undefined || className.indexOf("mdx-content-expander") === -1)
            oldExpander = undefined;

        // 已被点击展开过了，在重建时则跳过
        let expanded = container.attr("data-vk-content-expanded");
        if (expanded !== undefined && expanded.startsWith("t")) {
            let folded = container.attr("data-vk-before-print-folded");
            if (folded !== undefined && startsWith("t") === false) {
                this.buildTimers.shift();
                return;
            }
        }

        // 针对 img 内容，进行父容器的正确性处理
        if (tagName === "img") {
            // 图像若加载晚于 img 的题注生成，其父容器则题注而不是 VLOOK 标记的 img 父容器
            if (container.attr("data-vk-container") === undefined)
                container = container.parent();
        }

        // 初始化折叠配置
        container.attr("data-vk-content-folded", "false"); // 未折叠
        container.attr("data-vk-content-expanded", "false"); // 已被点击扩展了
        container.css("height", "auto");

        let tHeight = parseInt(target.css("height"));
        // 高度超出折叠要求高度时进行折叠
        if (tHeight > this.limit) {
            // 构建内容展开操作区
            this.buildContentExpander(target, container, tagName, tHeight, oldExpander);
        }
        // 高度没有超出折叠要求
        else {
            // 若之前须折叠，目前不需要折叠，则清除对应的展开操作区
            if (oldExpander !== undefined && className !== undefined
                && className.indexOf("mdx-content-expander") > -1)
                    oldExpander.remove();
        }

        this.buildTimers.shift();
    }

    /**
     * 构建内容展开操作区
     *
     * @param target 为目标对象创建展开操作区（如 table）
     * @param container 指定对象所属的容器（如 table 的容器为父元素 figure）
     * @param tagName target 的 HTML 标签名
     * @param tHeight target 的高度
     * @param oldExpander 上一轮重建前的展开操作区（没有则为 undefined）
     */
    this.buildContentExpander = function (target, container, tagName, tHeight, oldExpander) {
        // 设置为已折叠
        container.attr("data-vk-content-folded", "true");

        // 表格 <table>、Mermaid <svg> 图表的特性处理
        if (tagName.startsWith("t") || tagName.startsWith("s")) {
            container.css({
                "height" : this.limit,
                "overflow-x" : "auto", // 可横向滚动
                "overflow-y" : "hidden"
            });
        }
        // 非表格，非 Mermaid 图表的处理
        else {
            container.css({
                "height" : this.limit,
                "overflow-y" : "hidden"
            });
        }

        let expander,
            w = parseInt(container.css("width"));

        // 上一轮构建时没有生成展开操作区，则生成一个新的
        if (oldExpander === undefined) {
            expander = iContentFolder.ui.clone();
            container.after(expander);
        }
        // 直接复用上一轮构建时生成的展开操作区
        else
            expander = oldExpander;

        // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
        if (container.find("table").length > 0)
            container.find(this.rowNumFilter).addClass("mdx-tbl-row-num-hidden");

        // 动态生成按钮文本内容
        let btn = expander.find("div > span");
        btn.html(btn.attr("title") + " <span style='font-weight: normal;'>"
            + Math.round((1 - this.limit / tHeight) * 100) + "%</span>");

        // 重新适配展开操作区尺寸
        if (w > parseInt(target.css("width"))) {
            w = target.css("width");
            // 表格、mermarid 插图与比容器宽度小时，右下角不是圆角，须进行适配调整
            expander.css({
                "border-bottom-right-radius" : 0
            });
        }
        expander.attr("data-vk-content-type", tagName);
        expander.css({
            "margin-left" : container.css("margin-left"),
            "width" : w
        });
        // 设置为可视
        expander.css("visibility", "visible");

        // 展开按钮 click 事件处理
        expander.children(".mdx-btn").unbind("click").click(function () {
            that.expand(expander);
        });

        // 展开按钮 hover 事件处理
        VLOOK.ui.bindHover(expander.children(".mdx-btn"));
    }

    /**
     * 展开被折叠的内容
     *
     * @param expander 点击的按钮所在父元素
     */
    this.expand = function (expander) {
        let container = expander.prev(),
            tagName = expander.attr("data-vk-content-type");
        VLOOK.report.push(['Interactive', VLOOK.report.transTagName(tagName), 'ExpandLongContent', 0]);

        // 移除内容展开操作区
        expander.remove();

        // 展开对应的内容
        container.attr("data-vk-content-folded", "false");
        container.attr("data-vk-content-expanded", "true");
        container.css({
            "height" : "auto"
        });
        // 针对表格 <table>、Mermaid <svg> 图表增加滚动属性
        if (tagName.startsWith("t") || tagName.startsWith("s"))
            container.css({
                "overflow" : "auto"
            });
        // 非表格、非 Mermaid 图表的处理
        else
            container.css({
                "overflow-y" : "initial"
            });

        // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
        if (container.find("table").length > 0)
            container.find(that.rowNumFilter).removeClass("mdx-tbl-row-num-hidden");
    }
}

// ==================== 工具提示信息类 ==================== //

/**
 * 构造函数
 */
function ToolTips() {
    let that = this;
    this.ui = $(".mdx-tool-tips");
    this.aniTimer = null;
    this.lastStyle = undefined;

    VLOOK.ui.addAnimate(this.ui, "opacity");

    /**
    * 显示工具提示信息
    *
    * @param follow 提示的目标元素
    * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
    * @param style 指定微调的样式
    */
    this.show = function (follow, align, style) {
        if (env.device.mobile === true)
            return;

        clearTimeout(this.aniTimer);

        this.hide();
        this.ui.html(follow.attr("data-vk-tips"));

        this.lastStyle = style;

        const ow = this.ui.width();
        const ww = $(window).width();
        const gap = 20;
        let left = follow.offset().left;
        this.ui.css({
            "border-top-left-radius" : "0",
            "border-top-right-radius" : "var(--vlook-base-radius)"
        });

        // 指定对齐方式或提示超出屏幕
        if (align !== "auto" || (left + ow + gap) > ww) {
            // align: right
            this.ui.css({
                "border-top-left-radius" : "var(--vlook-base-radius)",
                "border-top-right-radius" : "0"
            });
            left = follow.offset().left - ow + follow.width() - gap;

            // align: center
            if (align === "center") {
                left = follow.offset().left + (follow.width() - ow) / 2 - gap / 2;
                this.ui.css({
                    "border-top-left-radius" : "var(--vlook-base-radius)",
                    "border-top-right-radius" : "var(--vlook-base-radius)"
                });
            }
        }

        if (this.lastStyle !== undefined)
            this.ui.addClass(this.lastStyle);

        this.ui.css({
            "left" : left,
            "top" : follow.offset().top - $(document).scrollTop() + follow.height() + 10
        });

        this.aniTimer = setTimeout(function () {
            VLOOK.ui.show(that.ui);
        }, 500);
    }

    /**
     * 隐藏工具提示
     */
    this.hide = function () {
        VLOOK.doc.scroll.unfreeze();
        clearTimeout(this.aniTimer);
        VLOOK.ui.hide(this.ui);
        if (this.lastStyle !== undefined)
            this.ui.removeClass(this.lastStyle);
    }
}

// ==================== 弹层提示信息类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function InfoTips(mask) {
    let that = this;
    this.ui = $(".mdx-info-tips");
    this.aniTimer = null;

    // 绑定点击事件
    this.ui.unbind("click").click = function () {
        that.hide();
    }

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui);

    /**
     * 显示通知信息
     *
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    this.inform = function (message, delay, mask, target) {
        this.show(message, delay, mask, "inform", target);
    }

    /**
     * 显示错误信息
     *
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param target 事件源，不为空时则跟随显示
     */
    this.error = function (message, delay, mask, target) {
        this.show(message, delay, mask, "error", target);
    }

    /**
     * 显示通知提示信息
     *
     * @param message 提示内容
     * @param delay 延时指定 ms 时间后自动关闭提示
     * @param mask 是否显示遮罩
     * @param type 类型。info/error
     * @param target 事件源，不为空时则跟随显示
     */
    this.show = function (message, delay, mask, type, target) {
        clearTimeout(this.aniTimer);

        this.ui.html(message);

        // 先重置为默认值
        this.ui.removeClass("error");
        this.ui.css({
            "width" : "",
            "height" : "",
            "right" : "auto",
            "bottom" : "auto",
            "border-radius" : "var(--vlook-base-radius)"
        });
        if (type === "error")
            this.ui.addClass("error");

        // 跟随事件源显示
        if (target !== undefined) {
            VLOOK.ui.moveToTarget(this.ui, target);
        }
        // 居中显示
        else
            VLOOK.ui.moveToCenter(this.ui);

        // VLOOK.ui.show(this.ui);
        this.ui.show();

        // 延时后自动关闭
        if (delay != null) {
            this.aniTimer = setTimeout(function () {
                    that.hide();
                }, delay);
        }

        // 显示遮罩
        if (mask === true)
            this.mask.show();
    }

    /**
     * 隐藏弹窗信息
     */
    this.hide = function () {
        this.ui.hide();
        this.mask.hide();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

// ==================== 底部提示信息类 ==================== //

/**
 * 构造函数
 *
 * @param id 对象标识
 */
function BottomTips(id) {
    // DOM.body().after('<div class="mdx-bottom-tips ' + id + '"><div></div></div>');
    VOM.doc().after('<div class="mdx-bottom-tips ' + id + '"><div></div></div>');

    this.ui = $(".mdx-bottom-tips." + id);

    /**
     * 显示底部提示栏
     *
     * @param message 提示内容
     */
    this.show = function (message) {
        this.ui.children("div").html(message);
        this.ui.show();
    }

    /**
     * 隐藏底部提示栏
     */
    this.hide = function () {
        this.ui.hide();
    }
}

// ==================== 文档更多内容遮罩栏 ==================== //

/**
 * 构造函数
 */
function MoreDocContent() {
    // this.chapterNav = chapterNav;
    this.ui = {
        before : $(".mdx-more-doc-content-before"),
        after : $(".mdx-more-doc-content-after")
    }

    /**
     * 刷新显示更多内容遮罩栏
     *
     * @param scrollTop 文档当前滚动位置，如果为空则自动获取
     */
    this.refresh = function (scrollTop) {
        if (scrollTop === undefined)
            scrollTop = $(document).scrollTop();

        // if (this.chapterNav.ui.css("display") === "block" &&  scrollTop > 800)
        if (scrollTop > 10)
            this.ui.before.show();
        else
            this.ui.before.hide();

        if (scrollTop + $(window).height() > ($(document).height() - 10))
            this.ui.after.hide();
        else
            this.ui.after.show();
    }

    /**
     * 隐藏更多内容遮罩栏
     */
    this.hideAfter = function () {
        this.ui.after.hide();
    }
}

// ==================== 题注生成器类 ==================== //

function CaptionGenerator() {}

CaptionGenerator.spliter = ". ";

/**
 * 生成题注
 *
 * @param target 需要添加题注的对象
 * @param tagName HTML 标签名称
 */
CaptionGenerator.actionForTextContent = function (target, tagName) {
    let caption = "",
        indexObj = undefined,
        anchor = "",
        dataForSearch = "";

    // 代码块 <pre>
    if (tagName.startsWith("p")) {
        indexObj = iNavCenter.codeblock;
        caption = [ "代码块 ", "代碼塊 ", "Code Block ", "Bloc de Code ", "Codeblock ", "Bloque de código ", "Блок Кода ", "コードブロック ", "코드 블록 "][VLOOK.lang.id]
            + (VLOOK.doc.counter.codeblock);
    }
    // 表格 <table>
    else if (tagName.startsWith("t")) {
        indexObj = iNavCenter.table;
        caption = ["表 ", "表 ", "Table ", "Table ", "Tabelle ", "Mesa ", "Таблица ", "テーブル ", "표 "][VLOOK.lang.id]
            + (VLOOK.doc.counter.table);
    }

    // 有指定的题注文本
    let fcSet = CaptionGenerator.getCaptions(target.parent().prev(), tagName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注

    // 无指定的题注文本，则取其部分内容作为自动题注内容
    if (fc == null || fc.trim().length === 0) {
        fc = "";
        if (tagName.startsWith("p")) // 代码块
            fc = target.find(".CodeMirror-line").text().trim();
        else if (tagName.startsWith("t")) // 表格
            fc = target.find("td").text().trim();
        // 省略中间内容处理
        fc = VLOOK.util.ellipsisText(fc.trim(), 20);
    }
    caption = "<span>" + caption + CaptionGenerator.spliter + "</span>" + fc;

    // 代码块 <pre>
    if (tagName.startsWith("p")) {
        anchor = "vk-id-codeblock" + VLOOK.doc.counter.codeblock;
        target.wrap("<div id='" + anchor + "' class='mdx-caption' style='width: 100%'>");
        dataForSearch += target.find(".CodeMirror-line").text();
    }
    // 表格 <table>
    else if (tagName.startsWith("t")) {
        anchor = "vk-id-tbl" + VLOOK.doc.counter.table;
        target.wrap("<div id='" + anchor + "' class='mdx-caption'>");
        dataForSearch += target.text();
    }

    // 添加第 1 题注
    target.before("<p class='mdx-caption-1'>" + caption + "</p>");
    // 添加第 2 题注
    let has2Captions = (fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='mdx-caption-2'>" + fc2 + "</p>");
        target.parent().attr("data-vk-caption-count", "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== undefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).attr("data-vk-title", caption);
        indexObj.add(caption, anchor, dataForSearch);
    }
}

/**
 * 针对插图（img、mermaid）生成题注
 *
 * @param target 需要添加题注的对象
 * @param tagName HTML 标签名称
 */
CaptionGenerator.actionForMediaContent = function (target, tagName) {
    let fc = target.attr("alt"), // 默认尝试获取图片的 alt 内容作为题注内容
        fc2 = target.attr("title"), // 默认尝试获得图片的 title 作为第二题注内容
        indexObj = iNavCenter.figure,
        anchor = "",
        dataForSearch = "";

    // 尝试获取最近的段落（如<p>、<h6>）作为题注内容
    let fcSet = CaptionGenerator.getCaptions(target.parent().prev(), tagName);
    if ((fc === undefined || fc.trim().length === 0) && fcSet[0] != null) {
        if (fcSet[0] != null)
            fc = fcSet[0];
        if (fcSet[1] != null)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption = ["图 ", "圖 ", "Figure ", "La figure ", "Zahl ", "Figura ", "карта ", "図 ", "그림 "][VLOOK.lang.id]
            + (VLOOK.doc.counter.figure);
    // 音频题注 audio
    if (tagName.startsWith("a")) {
        indexObj = iNavCenter.media;
        caption = ["音频 ", "音頻 ", "Audio ", "l'audio ", "Audio ", "Audio ", "аудио ", "オーディオ ", "오디오 "][VLOOK.lang.id]
            + (VLOOK.doc.counter.audio);
    }
    // 视频频题注 video
    else if (tagName.startsWith("v")) {
        indexObj = iNavCenter.media;
        caption = ["视频 ", "視頻 ", "Video ", "Vidéo ", "Video ", "Vídeo ", "видео ", "ビデオ ", "비디오 "][VLOOK.lang.id]
            + (VLOOK.doc.counter.video);
    }

    // 无指定的题注文本，则取其部分内容作为自动题注内容
    if (fc == null || fc.trim().length === 0) {
        fc = "";
        if (tagName.startsWith("s")) // Mermaid SVG
            fc = target.find("g").text().trim();
        // 省略中间内容处理
        fc = VLOOK.util.ellipsisText(fc.trim(), 20);
    }
    if (fc != null && fc.trim().length > 0)
        caption = "<span>" + caption + CaptionGenerator.spliter + "</span>" + fc;
    else
        caption = "<span>" + caption + "</span>";

    // 为插图（mermaid）增加题注 <svg>
    if (tagName.startsWith("s")) {
        anchor = "vk-id-fig" + VLOOK.doc.counter.figure;
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap("<div id='" + anchor + "' data-vk-fig-type='" + tagName
            + "' class='mdx-caption mermaid'></div>");
        dataForSearch += target.find("div, span, tspan, text").text();
    }
    // 为插图（img）增加题注 <img>
    else if (tagName.startsWith("i")) {
        anchor = "vk-id-fig" + VLOOK.doc.counter.figure;
        target.wrap("<div id='" + anchor + "' data-vk-fig-type='" + tagName
            + "' class='mdx-caption'></div>");
        dataForSearch += target.attr("src");
    }
    // 为音频增加题注 audio
    else if (tagName.startsWith("a")) {
        anchor = "vk-id-audio" + VLOOK.doc.counter.audio;
        target.wrap("<div id='" + anchor + "' data-vk-fig-type='" + tagName
            + "' class='mdx-caption'>");
        dataForSearch += target.attr("src");
    }
    // 为视频增加题注 video
    else if (tagName.startsWith("v")) {
        anchor = "vk-id-video" + VLOOK.doc.counter.video;
        target.wrap("<div id='" + anchor + "' data-vk-fig-type='" + tagName
            + "' class='mdx-caption'>");
    }

    // 生成第 1 题注
    target.before("<p class='mdx-caption-1'>" + caption + "</p>");
    // 生成第 2 题注
    let has2Captions = (fc !== undefined && fc2 != null && fc2.length > 0);
    if (has2Captions) {
        target.after("<p class='mdx-caption-2'>" + fc2 + "</p>");
        target.parent().attr("data-vk-caption-count", "2");
    }
    // ----------------------------------------
    // 添加到对应的内容索引
    if (indexObj !== undefined) {
        dataForSearch += has2Captions ? fc2 : "";
        $("#" + anchor).attr("data-vk-title", caption);
        indexObj.add(caption, anchor, dataForSearch);
    }

    // ----------------------------------------
    // 修正在 SVG 插图套上题注后的自适应尺寸 <svg>
    if (tagName.startsWith("s")) {
        if (target.attr("height") !== "none" || target.css("height") !== "none") { // 有指定高度的
            target.removeAttr("height");
            target.css("height", "");
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        let style = undefined;
        if (target.css("max-width") !== "none") // CSS 中指定了最大宽度
            target.parent().css("width", target.css("max-width"));
        else if ((style = target.attr("style")) !== undefined && style.indexOf("width") > -1) // 通过 style 指定了宽度
            target.parent().css("width", target.css("width"));
        else if (target.attr("width") !== "100%") // 指定了 width 属性，且不为 100%
            target.parent().css("width", parseInt(target.attr("width")) + 4); // 4 为两边 border 的宽度
        else if (target.attr("viewBox") !== "none") // 指定 width 为 100% 的情况
            target.parent().css("width", target.attr("viewBox").split(" ")[2] + "px");
        else
            target.parent().css("width", "100%");
    }
}

/**
 * 返回插图、表格、代码块上方的题注
 */
CaptionGenerator.getCaptions = function (caption, tagName) {
    let fcSet = [], // 题注集
        captionTagName = caption.prop("tagName"),
        hideCaptionSrc = false; // 是否隐藏题注源

    if (captionTagName !== undefined)
        captionTagName = captionTagName.toLowerCase();

    // 双题注的标准语法
    if (__getCaptionCount(caption) === 2) {
        fcSet[0] = __getCaptionSet(caption, 2)[0];
        fcSet[1] = __getCaptionSet(caption, 2)[1];
        hideCaptionSrc = true;
    }
    // 单题注的标准语法
    else if (__getCaptionCount(caption) === 1) {
        fcSet[0] = __getCaptionSet(caption, 1)[0];
        fcSet[1] = null;
        hideCaptionSrc = true;
    }
    // 无题注语法，但由有 h1-h6 引导
    else if (captionTagName !== undefined && captionTagName.startsWith("h")) {
        fcSet[0] = caption.text().trim();
        fcSet[1] = null;
        // 不能直接隐藏，会影响页内链接跳转至该位置
        // 设置为不可见，并调整位置布局实现隐藏效果，同时不影响跳转
        if (captionTagName === "h6") { // 只针对 h6，h1-h5不隐藏
           caption.css({
                "visibility" : "hidden",
                "position" : "absolute"
            });
        }
    }

    // 若成功匹配出题注，且为不 <img> 则隐藏原始内容
    if (hideCaptionSrc === true && tagName.startsWith("i") === false)
        caption.hide();
    return fcSet;

    /**
     * 返回匹配的题注数量
     *
     * @returns number
     */
    function __getCaptionCount(target) {
        let reg2 = /^!\[.+]".+"$/; // 有2个题注
        let reg1 = /^!\[.+]$/; // 只有1个题注
        if (reg2.test(target.text().trim()) === true)
            return 2;
        else if (reg1.test(target.text().trim()) === true)
            return 1;
        return 0; // 无题注
    }

    /**
     * 返回题注数据数组
     *
     * @returns [] [0] 为第 1 个题注，[1] 为第 2 个题注
     */
    function __getCaptionSet(target, count) {
        let fcSet = [],
            text = target.text().trim();
        fcSet[0] = text.substring(2, text.indexOf("]", 2));
        if (count === 2)
            fcSet[1] = text.substring(text.indexOf("]\"", 2) + 2, text.length - 1);
        return fcSet;
    }
}

// ==================== 代码块增强类 ==================== //

function ExtCodeBlock() {}

/**
 * 初始化代码块
 */
ExtCodeBlock.init = function () {
    // 获取自动生成题注并编号的行数下限，大于该行数的代码才会自动生成题注和编号
    let lmc = VLOOK.util.getParamValue("lmc");
    lmc = (lmc === undefined ? 1 : parseInt(lmc));
    // 遍历所有代码块
    $(".md-fences").each(function () {
        let codeblock = $(this);

        // 绑定内容助手
        iContentAssistor.bind($(this), "CodeBlock");

        // 折叠长代码块
        iContentFolder.add(codeblock);

        // 生成代码块插图题注（行数 > 1 的才进行处理）
        if (codeblock.find(".CodeMirror-line").length > lmc) {
            VLOOK.doc.counter.codeblock++;
            // 外套一个 <p> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
            codeblock.wrap("<p data-vk-container='pre' style='" +
            "border-radius: 0 0 var(--vlook-base-radius) var(--vlook-base-radius);" +
            "margin-bottom: 20px;" +
            "'></p>");

            CaptionGenerator.actionForTextContent(codeblock, "pre");
        }
        else {
            codeblock.attr("data-vk-lmc", "true");
        }
    });
}

/**
 * 复制代码块内容增强版（兼容所有浏览器）
 */
ExtCodeBlock.copy = function (source) {
    VLOOK.report.push(['Interactive', 'CodeBlock', 'Copy', 0]);
    if (iContentAssistor.lastHover === undefined)
        return;

    let code = "",
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
            if (encodeText.indexOf(badChars[i]) > -1)
                encodeText = encodeText.replaceAll(badChars[i], goodChars[i]);
        }
        code += decodeURI(encodeText) + (lineNo < lineCount ? "\n" : "");
    });

    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    let btnCopyClassName = ".mdx-btn.copy-code-block";
    $(btnCopyClassName).attr("data-clipboard-text", code);

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(btnCopyClassName);
    // 复制成功事件
    clipboard.on("success", function(e) {
        // 显示已复制动效
        let codeBlock = iContentAssistor.lastHover.children().find(".CodeMirror-sizer > div");
        VLOOK.ui.removeAnimate(codeBlock);
        codeBlock.css({
            "background-color" : "var(--mark-color)"
        });
        // 延时后消退
        setTimeout(function () {
            VLOOK.ui.addAnimate(codeBlock);
            codeBlock.css({
                "background-color" : "inherit"
            });
        }, 500);

        e.clearSelection();
    });
    // 复制失败事件
    clipboard.on("error", function() {
        // 显示复制失败提示
        iInfoTips.error([
            "非常抱歉～暂不支持在该浏览器中复制",
            "非常抱歉～暫不支持在該瀏覽器中復制",
            "I'm very sorry~ I don't support copying in this browser",
            "Je suis vraiment désolé ~ Je ne supporte pas la copie dans ce navigateur",
            "Es tut mir sehr leid ~ Ich unterstütze das Kopieren in diesem Browser nicht",
            "Lo siento mucho ~ No apoyo la copia en este navegador",
            "Я очень сожалею ~ Я не поддерживаю копирование в этом браузере",
            "すみません〜このブラウザでのコピーはサポートしていません",
            "죄송합니다 ~이 브라우저에서 복사를 지원하지 않습니다"
        ][VLOOK.lang.id], 3000, false, source);
    });
}

// ==================== 引用块增强类 ==================== //

function ExtQuote() {}

ExtQuote.icoClosed = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 2px;"><use xlink:href="#icoQuoteClosed" class="mdx-blockquote-folder-ico"/></svg>&nbsp;';
ExtQuote.icoOpened = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 2px;"><use xlink:href="#icoQuoteOpened" class="mdx-blockquote-folder-ico"/></svg>&nbsp;';

/**
 * 初始化引用块以实现折叠支持
 */
ExtQuote.init = function () {
    $("blockquote > p").each(function () {
        let target = $(this),
            next = target.next("blockquote"),
            text = target.text();

        // 默认收起
        if (text.startsWith("[+] ")
            && next.length > 0
            && next.prop("tagName").toLowerCase().startsWith("bl")) { // <blockquote>
                // 分离折叠引子中的标题
                __separateTitle(target);

                // target.css("color", "var(--header-color)");
                target.next("blockquote").css({
                    "display" : "none"
                });
                target.replaceHTML("[+] ", "<span class='mdx-blockquote-folder'>" + ExtQuote.icoClosed + "</span>");

                target.attr("data-vk-blockquote-folded", "true");

                // 因此处的 click 会与 $(document).unbind("click").click() 冲突
                // 所以改为 mouseup
                target.find(".mdx-blockquote-folder").unbind("mouseup").mouseup(function () {
                    VLOOK.report.push(['Interactive', 'Quote', 'Fold/Unfold', 0]);
                    __toggleQuoteFolding(target);
                });
        }
        // 默认展开
        else if (text.startsWith("[-] ")) {
            // 分离折叠引子中的标题
            __separateTitle(target);

            // target.css("color", "var(--header-color)");
            target.replaceHTML("[-] ", "<span class='mdx-blockquote-folder'>" + ExtQuote.icoOpened + "</span>"); // ⊖▽

            target.attr("data-vk-blockquote-folded", "false");

            // 因此处的 click 会与 $(document).unbind("click").click() 冲突
            // 所以改为 mouseup
            target.find(".mdx-blockquote-folder").unbind("mouseup").mouseup(function () {
                VLOOK.report.push(['Interactive', 'Quote', 'Fold/Unfold', 0]);
                __toggleQuoteFolding(target);
            });
        }
    });

    // 针对分栏引用进行修正
    $("hr + blockquote").each(function () {
        let hr1 = $(this).prev(),
            tag2 = hr1.prev(),
            tag3 = tag2.prev(),
            tagName2 = tag2.prop("tagName"),
            tagName3 = tag3.prop("tagName");

        if (tagName2 !== undefined)
            tagName2 = tagName2.toLowerCase();
        if (tagName3 !== undefined)
            tagName3 = tagName3.toLowerCase();

        // 隐藏 <hr>
        hr1.css("display", "none");

        // 连续两个 <hr> 标签
        if (tagName2 === "hr")
                tag2.css("display", "none");

        // 连续三个 <hr> 标签
        if (tagName3 === "hr")
            tag3.css("display", "none");
    });

    /**
     * 展开/收起引用块
     *
     * @param target 用于折叠其下引用块对象
     */
    function __toggleQuoteFolding(target) {
        if (target.attr("data-vk-blockquote-folded").startsWith("t")) {
            ExtQuote.unfold(target);
        } else {
            ExtQuote.fold(target);
        }
    }

    /**
     * 分离折叠引子中的标题
     *
     * @param target 带折叠引子的行对象
     */
    function __separateTitle(target) {
        let firstSpan = target.children("span:first"),
            text = firstSpan.text();
        // 折叠的标题与引子在同一个 <span> 对象内，则需要进行剥离
        if (text.length > 4) {
            let folder = text.substring(0, 4);
            firstSpan.html(firstSpan.replaceHTML(/\[([+\-])]\s/, ""));
            firstSpan.before("<span>" + folder + "</span>");
        }
    }
}

/**
 * 根据设备类型自适应hover样式
 */
ExtQuote.adjustHoverStyle = function () {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(".mdx-blockquote-folder").unbind("hover");
    else // 为折叠的引用的折叠控件绑定 hover 事件
        VLOOK.ui.bindHover($(".mdx-blockquote-folder"));
}

/**
 * 收起引用块
 *
 * @param target 用于折叠其下引用块对象
 */
ExtQuote.fold = function (target) {
    let nextQuote = target.next("blockquote");
    nextQuote.css("display", "none");
    target.attr("data-vk-blockquote-folded", "true");
    target.find(".mdx-blockquote-folder").html(ExtQuote.icoClosed);
}

/**
 * 展开引用块
 */
ExtQuote.unfold = function (target) {
    let nextQuote = target.next("blockquote");
    nextQuote.css("display", "block");
    target.attr("data-vk-blockquote-folded", "false");
    target.find(".mdx-blockquote-folder").html(ExtQuote.icoOpened);
}

/**
 * 自动展开引用块
 */
ExtQuote.autoUnfold = function () {
    if (iParagraphNav.current() === undefined)
        return;

    let target = iParagraphNav.current();
    // 或目标段是引用块折叠操作区，且为未展开状态
    if (target.attr("class") !== undefined) {
        let folded = target.attr("data-vk-blockquote-folded");
        if (folded !== undefined && folded.startsWith("t"))
            // 模拟操作
            ExtQuote.unfold(target);
    }
}

// ==================== 表格增强类 ==================== //

function ExtTable() {}

/**
 * 初始化表格数据
 */
ExtTable.init = function () {
    let stopwatch = new Stopwatch();

    // ----------------------------------------
    // 表格预处理
    stopwatch.lapStart();
    $("table").each(function () {
        let table = $(this),
            container = table.parent();

        VLOOK.doc.counter.table++;

        // 绑定内容助手
        iContentAssistor.bind($(this), "Table");

        // 表格自定义属性数据
        container.attr("data-vk-container", "table");
        container.addClass("mdx-caption-container");

        // 表格滚动事件
        container.scroll(function () {
            let scrollLeft = $(this).scrollLeft();
            // 根据显示时其对应表格的水平滚动的偏移量，调整阅读模式（十字光标）的位置
            $("div.mdx-table-cross").each(function () {
                $(this).css({
                    "left" : TableCross.lastCellPos[$(this).attr("data-vk-direction")] - scrollLeft
                });
            });
        });

        // 表格单元格初始化处理
        __initCell(table);

        // 折叠长表格
        iContentFolder.add(table);

        // 生成表格题注
        CaptionGenerator.actionForTextContent(table, "table");
    }); // table
    stopwatch.lapStop("    ├ Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    stopwatch.lapStart();
    $("table[data-vk-cell-merge='true']").each(function () {
        let table = $(this);
        CellMerge.dispose(table);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        table.find("thead > tr > th").each(function () {
            ColumnFormatting.init(table, $(this));
        });
    });
    stopwatch.lapStop("    ├ Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标记为带列格式的表格，进行列格式化处理
    stopwatch.lapStart();
    $("table[data-vk-column-formatting='true']").each(function () {
        ColumnFormatting.format($(this));
    });
    stopwatch.lapStop("    ├ Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    stopwatch.lapStart();
    $("table[data-vk-row-group='true']").each(function () {
        let table = $(this);
        RowGroup.init(table);

        // 修正行分组的首个单元格的缩进
        table.find("tr[data-vk-folder='true']").each(function () {
            let td = $(this).children("td:first");
            if (td.attr("data-vk-ident-level") !== undefined)
                td.css("padding-left", "0.5em");
        });
    });
    stopwatch.lapStop("    ├ Row Group: ");

    // ----------------------------------------
    // 表格单元格重复表头引用处理，group 模式重复将在行分组展开/收起时再进行处理
    stopwatch.lapStart();
    $("table[data-vk-th-rpt='true']").each(function () {
        let table = $(this);
        ThRepeater.init(table);
    });
    stopwatch.lapStop("    └ Th Repeater: ");

    /**
     * 表格单元格初始化
     *
     * @param table 表格对象
     */
    function __initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0,
            maxCol = 0;
        table.find("thead > tr").each(function () {
            colIndex = 0;
            let needCheckCellMerge = true,
                needCheckColumnFormatting = true,
                needCheckThRpt = true;
            // ----------------------------------------
            // 遍历单元格
            $(this).find("th").each(function () {
                let th = $(this),
                    text = th.text();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === true
                    && table.attr("data-vk-cell-merge") !== "true"
                    && (CellMerge.syntax.row.test(text) === true
                    || CellMerge.syntax.col.test(text) === true)) {
                        // 将表格标记为带合并单元格语法
                        table.attr("data-vk-cell-merge", "true");
                        needCheckCellMerge = false;
                }
                // 检测是否带列格式语法
                if (needCheckColumnFormatting === true) {
                    if (ColumnFormatting.init(table, th) === true)
                        needCheckColumnFormatting = false;
                }
                // 检测是否带重复表头语法
                if (needCheckThRpt === true
                    && colIndex === 0 // 只检测第 1 列
                    && ThRepeater.syntax.tag.test(text) === true) {
                        // 将表格标记为带行折叠语法
                        table.attr("data-vk-th-rpt", "true");
                        th.replaceHTML(" ##", "");
                        needCheckThRpt = false;
                }

                // ----------------------------------------
                // 添加列号标识，用于列格式化时使用
                th.attr("data-vk-tbl-col", "tbl-" + VLOOK.doc.counter.table + "-" + colIndex);
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
                needCheckCellMerge = true,
                needCheckRowGroup = true;
            // ----------------------------------------
            // 遍历单元格
            $(this).find("td").each(function () {
                let td = $(this),
                    text = td.text();
                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === true
                    && table.attr("data-vk-cell-merge") !== "true"
                    && (CellMerge.syntax.row.test(text) === true
                    || CellMerge.syntax.col.test(text) === true)) {
                        // 将表格标记为带合并单元格语法
                        table.attr("data-vk-cell-merge", "true");
                        needCheckCellMerge = false;
                }
                // 检测是否带行折叠语法
                if (needCheckRowGroup === true
                    && colIndex === 0 // 只检测第 1 列
                    && table.attr("data-vk-row-group") !== "true"
                    && RowGroup.syntax.tag.test(text) === true) {
                        // 将表格标记为带行折叠语法
                        table.attr("data-vk-row-group", "true");
                        needCheckRowGroup = false;
                }
                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<ma.+rk>$/.test(td.html()) === true) {
                    td.children().children().unwrap(); // 解包 <mark>
                    td.addClass("mdx-tbl-col-fmt-mark");
                }

                // 添加列号标识，用于列格式化时使用
                td.attr("data-vk-tbl-col", "tbl-" + VLOOK.doc.counter.table + "-" + colIndex);
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
CellMerge.syntax = {
    row : /^(:|\^\^)$/, // 行，纵向合并
    col : /^(==|<<)$/ // 列，横向合并
}

/**
 * 表格单元格合并
 *
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
        needRowSpan = false;

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
            if (CellMerge.syntax.row.test(cell.text()) === true) {
                tblSpan[rowIndex][colIndex] = 1;
                needRowSpan = true;
            }
            colIndex++;
            colCount++;

            // --- 列合并（横向） ---
            // 是列合并标记
            if (CellMerge.syntax.col.test(cell.text()) === true) {
                colSpanCount++;
                cell.remove();
                if (colSpanCount === 1)
                    colSpanCell = lastCell;
            }
            // 不是列标记，则进行最近列标记数据进行处理
            else {
                if (colSpanCount > 0 && colSpanCell != null) {
                    colSpanCell.attr("colspan", colSpanCount + 1);
                    CellMerge.emptyBlankCell(colSpanCell);
                    colSpanCell.css("text-align", "center");
                    // colSpanCell.css("vertical-align", "middle");
                }
                colSpanCount = 0;
            }
            lastCell = cell;
        }); // find(td, th)

        // 如果列合并了所有列，且内容为空，则取消表格行号等样式
        if (colCount === colSpanCount + 1 && tr.text().trim().length === 0) {
            tr.addClass("mdx-table-colspan-all");
        }

        // 列合并：对于最后一列的补充处理
        if (colSpanCount > 0 && colSpanCell != null) {
            colSpanCell.attr("colspan", colSpanCount + 1);
            CellMerge.emptyBlankCell(colSpanCell);
            colSpanCell.css("text-align", "center");
            // colSpanCell.css("vertical-align", "middle");
        }
        colSpanCount = 0;

        rowIndex++;
        colIndex = 0;
        colCount = 0;
    }); // tr

    rowIndex = 0;

    // --- 行合并（纵向）---
    if (needRowSpan === true) {
        tblTd2ThData = [];
        // 列式遍历（从左到右）
        for (let c = 0, len = tblSpan[0].length; c < len; c++) {
            let rowSpanCount = 0,
                rowSpanCell = null;
            let r = 0,
                thSpanFlag = false;

            // 列式遍历（从上到下）
            while (r < tblSpan.length) {
                if (tblSpan[r][c] === 1) { // 要合并
                    rowSpanCount++;
                    if (rowSpanCell == null) {
                        rowSpanCell = tblData[r - 1][c];
                    }
                    // 记录最大列头行合并深度
                    if (r === 1)
                        thSpanFlag = true;
                    if (thSpanFlag === true)
                        tblTd2ThData[tblTd2ThData.length] = tblData[r][c].parent();
                    tblData[r][c].remove(); // 移除要被合并的单元格

                    // 后接的单元格会变成第 1 列，但不需要预留表格行号显示的空间
                    if (c + 1 < tblSpan[r].length)
                        tblData[r][c + 1].css("padding-left", "5px");
                } else {
                    thSpanFlag = false;
                    // 单元格行合并
                    if (rowSpanCount > 0 && rowSpanCell != null) {
                        rowSpanCell.attr("rowspan", rowSpanCount + 1);
                        CellMerge.emptyBlankCell(rowSpanCell);
                        // rowSpanCell.css("text-align", "center");
                        rowSpanCell.css("vertical-align", "middle");
                        rowSpanCount = 0;
                        rowSpanCell = null;
                    }
                }
                r++;
            } // while

            // 行合并：对于最后一行的补充处理
            if (rowSpanCount > 0 && rowSpanCell != null) {
                rowSpanCell.attr("rowspan", rowSpanCount + 1);
                CellMerge.emptyBlankCell(rowSpanCell);
                // rowSpanCell.css("text-align", "center");
                rowSpanCell.css("vertical-align", "middle");
            }
        } // for

        // 处理列头的纵向合并（行合并）
        for (let i = 0, len = tblTd2ThData.length; i < len; i++) {
            tblData[0][0].parent().parent().append(tblTd2ThData[i]);
            // 将 thead 内的 td 标签转换为 th
            tblTd2ThData[i].find("td").each(function () {
                // 暂存 td 的属性数据
                let style = $(this).attr("style"),
                    tblCol = $(this).attr("data-vk-tbl-col"),
                    classValue = $(this).attr("class"),
                    colspan = $(this).attr("data-vk-colspan"),
                    td = $(this);
                // 转换为 th 标签
                // let th = $(this).contents().unwrap().wrap('<th/>');
                td.prop("outerHTML", td.prop("outerHTML").replaceAll("<td ", "<th "));
                // 将暂存的 td 的属性数据，恢复到新标签中
                td.parent().attr("style", style);
                td.parent().attr("data-vk-tbl-col", tblCol);
                td.parent().attr("class", classValue);
                td.parent().attr("data-vk-colspan", colspan);
            });
        }
    } // if

    needRowSpan = false;
}

/**
 * 清空单元格内容（无内容情况下清空空格 &nbsp;）
 *
 * @param cell 表格单元格对象
 */
CellMerge.emptyBlankCell = function (cell) {
    if (cell.text().trim().length === 0) {
        cell.html("");
        cell.addClass("mdx-empty-cell");
    }
}

// ==================== 表格阅读模式（十字光标）类 ==================== //

function TableCross() {}

TableCross.enabled = false;

TableCross.ui = undefined;

// 最后/当前显示阅读模式（十字光标）的表格
TableCross.lastTable = undefined;

// 最后/当前显示阅读模式（十字光标）的表格单元格
TableCross.lastCell = undefined;

// 表格阅读模式（十字光标）四条边的位置
TableCross.lastCellPos = {};

TableCross.init = function () {
    TableCross.ui = $(".mdx-table-cross");
    VLOOK.ui.addAnimate(TableCross.ui);
}

/**
 * 切换表格阅读模式（十字光标）开关
 */
TableCross.toggle = function (table) {
    // 已打开，则关闭
    if (TableCross.enabled)
        TableCross.disable();
    // 未打开，则打开
    else
        TableCross.enable(table);
}

// 打开表格阅读模式（十字光标）
TableCross.enable = function (table) {
    VLOOK.report.push(['Presentation', 'Table Cross', 'Enabled', 0]);

    TableCross.enabled = true;
    iContentAssistor.buttons.tableCross.addClass("selected");

    if (table !== undefined && table != null)
        table.parent().parent().next(".mdx-content-expander").children(".mdx-btn").trigger("click");
}

// 关闭表格阅读模式（十字光标）
TableCross.disable = function () {
    TableCross.enabled = false;
    iContentAssistor.buttons.tableCross.removeClass("selected");
    TableCross.hide();
}

/**
 * 绑定单元格，鼠标点击单元格时显示阅读模式（十字光标）
 *
 * @param table 单元格所属表格对象
 * @param cell 单元格对象
 */
TableCross.bind = function (table, cell) {
    cell.unbind("click").click(function () {
        if (TableCross.enabled === false)
            return;

        let container = table.parent().parent();
        // 跳过被折叠表格
        if (container.attr("data-vk-content-folded").startsWith("t")) {
            // container.next(".mdx-content-expander").children(".mdx-btn").trigger("click");
            return;
        }

        // vvv 不同表格之间点击，先强制移除动画 vvv
        if (TableCross.lastTable !== table)
            VLOOK.ui.removeAnimate(TableCross.ui);

        TableCross.hide();

        TableCross.lastCell = cell;
        TableCross.lastTable = table;

        let tdH = parseInt(TableCross.lastCell.css("height")),
            tdW = parseInt(TableCross.lastCell.css("width")),
            tbW = parseInt(TableCross.lastTable.css("width")),
            scrollLeft = container.scrollLeft();

        // 横向左边
        let crossLeft = $(".mdx-table-cross.left"),
            w1 = TableCross.lastCell.offset().left - TableCross.lastTable.offset().left;
        crossLeft.css({
            "top" : TableCross.lastCell.offset().top,
            "left" : TableCross.lastTable.offset().left,
            "height" : tdH,
            "width" : w1,
            "z-index" : 9
        });

        // 横向右边
        let crossRight = $(".mdx-table-cross.right"),
            w2 = TableCross.lastTable.offset().left + tbW - TableCross.lastCell.offset().left - tdW;
        crossRight.css({
            "top" : TableCross.lastCell.offset().top,
            "left" : TableCross.lastCell.offset().left + tdW,
            "height" : tdH,
            "width" : w2,
            "z-index" : 9
        });

        // 竖向上边
        let crossUp = $(".mdx-table-cross.up"),
            h1 = TableCross.lastCell.offset().top - TableCross.lastTable.offset().top;
        crossUp.css({
            "top" : TableCross.lastTable.offset().top,
            "left" : TableCross.lastCell.offset().left,
            "height" : h1,
            "width" : tdW,
            "z-index" : 9
        });

        // 竖向下边
        let crossDown = $(".mdx-table-cross.down"),
            h2 = TableCross.lastTable.offset().top + parseInt(TableCross.lastTable.css("height")) - TableCross.lastCell.offset().top - tdH;
        crossDown.css({
            "top" : TableCross.lastCell.offset().top + tdH,
            "left" : TableCross.lastCell.offset().left,
            "height" : h2,
            "width" : tdW,
            "z-index" : 9
        });

        // 须延时后再执行显示，让以上代码先完成
        setTimeout(function () {
            // 针对不同表格之间点击强制移除动画后的恢复
            VLOOK.ui.addAnimate(TableCross.ui);
            TableCross.adjust(crossLeft, w1, scrollLeft);
            TableCross.adjust(crossRight, w2, scrollLeft);
            TableCross.adjust(crossUp, h1, scrollLeft);
            TableCross.adjust(crossDown, h2, scrollLeft);
        }, 50);

        event.stopPropagation(); // 停止事件冒泡
    });
}

/**
 * 适配调整表格阅读模式（十字光标）位置、显示
 *
 * @param target 阅读模式（十字光标）任意边的对象实例（左/右/上/下）
 * @param size 指定要进行隐藏判断的尺寸（宽度或高度），小于该值则不显示对应的 target
 * @param scrollLeft 表格水平滚动的偏移量
 */
TableCross.adjust = function (target, size, scrollLeft) {
    // 任意边的尺寸（宽度或高度）小于最小值时隐藏
    if (size < 5)
        VLOOK.ui.hide(target);
    else {
        VLOOK.ui.show(target);
    }
    // 保存最后显示的阅读模式（十字光标）任意边的 left 值及水平方向上的滚动偏移量
    TableCross.lastCellPos[target.attr("data-vk-direction")] =  parseInt(target.css("left")) + scrollLeft;
}

/**
 * 隐藏表格阅读模式（十字光标）
 */
TableCross.hide = function () {
    VLOOK.ui.hide(TableCross.ui);

    if (TableCross.lastCell !== undefined) {
        TableCross.lastCell = undefined;
        TableCross.lastTable = undefined;
    }
}

/**
 * 判断当前内容块是否与已显示了阅读模式（十字光标）的表格重叠
 *
 * @param target 内容块对象
*/
TableCross.checkFallWith = function (target) {
    return (TableCross.lastTable !== undefined
        && target.children().attr("id") === TableCross.lastTable.attr("id"));
}

// ==================== 表格列格式化类 ==================== //

function ColumnFormatting() {}

ColumnFormatting.syntax = {
    checkbox : /^\[(\s|x|-)](\s.+)*/ // 复选框列格式语法
}

/**
 * 初始化
 *
 * @param table 表格对象
 * @param cell 单元格对象
 */
ColumnFormatting.init = function (table, cell) {
    // console.warn(cell.text(), ColumnFormatting.syntax.checkbox.test(cell.text()));
    if (table.attr("data-vk-column-formatting") !== "true"
        && (cell.find("strong, em, u, mark, del").length > 0 // 普通列格式
        || cell.css("text-align") === "right" // 右对齐表示使用数值格式
        || ColumnFormatting.syntax.checkbox.test(cell.text()) === true)) { // 复选框列格式
            // 将表格标记为带列格式语法
            table.attr("data-vk-column-formatting", "true");
            return true; // 匹配到列格式
    }
    return false; // 未匹配到列格式
}

/**
 * 返回表格内所有非合并的同列单元格对象集合
 *
 * @param table 表格格对象
 * @param th 列头单元格对象
 * @param cells 集合变量
 */
ColumnFormatting.getCells = function (table, th, cells) {
    if (cells === undefined)
        cells = table.find("[data-vk-colspan!='true'][data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']");
    return cells;
}

/**
 * 返回表格 tbody 内的同列单元格对象集合
 *
 * @param table 表格格对象
 * @param th 列头单元格对象
 * @param tbodyCells 集合变量，为 undefined 则重新生成
 */
ColumnFormatting.getTbodyCells = function (table, th, tbodyCells) {
    if (tbodyCells === undefined)
        tbodyCells = table.find("td[data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']");
    return tbodyCells;
}

/**
 * 列格式化
 *
 * @param table 表格对象
 */
ColumnFormatting.format = function (table) {
    table.find("thead th").each(function () {
        let th = $(this),
            cells = undefined,
            tbodyCells = undefined,
            cellsCSS = "";

        // 粗体
        if (th.find("strong:first-child").length > 0) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cellsCSS += "mdx-tbl-col-fmt-bold ";
        }

        // 斜体
        if (th.find("em:first-child").length > 0) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cellsCSS += "mdx-tbl-col-fmt-em ";
        }

        // 高亮
        let thHTML = th.html();
        if (thHTML.startsWith("<ma") && thHTML.endWith("rk>") // <mark>...</mark>
            || th.attr("class") !== undefined
            && th.attr("class").indexOf("mdx-tbl-col-fmt-mark") > -1) {
                $("[data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']").find("mark").children().unwrap();
                cells = ColumnFormatting.getCells(table, th, cells);
                cellsCSS += "mdx-tbl-col-fmt-mark ";
        }

        // 批量添加以上列样式
        if (cells !== undefined && cellsCSS.length > 0)
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
        if (ColumnFormatting.syntax.checkbox.test(th.text()) === true) {
            cells = ColumnFormatting.getCells(table, th, cells);
            cells.addClass("mdx-tbl-col-fmt-checkbox");

            // 删除列头的复选框语法
            ColumnFormatting.removeCheckboxSyntax(th);

            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);

            tbodyCells.each(function () {
                let ce = $(this),
                    syntaxText = ce.text(),
                    chkStatus = "uncheck",
                    chkStyle = "dark";

                // 跳过横向合并的单元格
                if (ce.attr("colspan") !== undefined)
                    return true;

                // 移除单元格的复选框语法内容
                ColumnFormatting.removeCheckboxSyntax(ce);

                // 指定为 checked- 已选择
                if (syntaxText.startsWith("[x]"))
                    chkStatus = "checked";
                // 指定为 indeterminate - 不确定选择
                else if (syntaxText.startsWith("[-]"))
                    chkStatus = "indeterminate";
                // 无指定
                else
                    ce.replaceHTML("&nbsp;", "");

                // 添加复选框样式
                ce.prepend("<svg width='14px' height='14px' style='display: inline-block; vertical-align: middle; margin-top: -4px;'><use xlink:href='#icoCheckbox_"
                    + chkStatus + "' class='mdx-svg-ico-" + chkStyle + "'/></svg>");
            });
        }

        // 数值格式
        if (th.css("text-align").startsWith("r")) {
            tbodyCells = ColumnFormatting.getTbodyCells(table, th, tbodyCells);
            // 设置为等宽字体
            tbodyCells.addClass("mdx-tbl-col-fmt-num");
            // 数值格式化处理
            tbodyCells.each(function () {
                let ce = $(this),
                    text = ce.text();
                // 内容为数值
                if (text.isNumber()) {
                    // 添加千位符
                    ce.html(VLOOK.formatting.decimal( // 添加千位符
                        VLOOK.formatting.thousands(ce.html()))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting.coloringNumber(ce, text, true);
                }
                // 内容为百分数
                else if (text.isPercent()) {
                    // 对小数进行处理
                    ce.html(VLOOK.formatting.percent( // 对小数进行处理
                        VLOOK.formatting.decimal(ce.html()))); // 对百分数进行格式化处理
                    // 根据正负号进行着色处理
                    let coloring = ColumnFormatting.coloringNumber(ce, text, true),
                        percent = text.replace(/(-|\+|\s)/g, ""),
                        percentValue = Math.round(percent.replace("%", "")),
                        bg1 = "rgba(128, 128, 128, 0.1)",
                        bg2 = "rgba(128, 128, 128, 0.4)",
                        bgSplit = "rgba(128, 128, 128, 0.8)";
                    // 对有首色的进行渐变颜色调整
                    if (coloring === true) {
                        let baseBg = ce.css("color").replace("rgb", "rgba");
                        bg1 = baseBg.replace(")", ", 0.05)");
                        bg2 = baseBg.replace(")", ", 0.2)");
                        bgSplit = baseBg.replace(")", ", 0.7)");
                    }
                    // 根据百分比生成渐变背景色、最小宽度
                    ce.css({
                        "background" : "linear-gradient(90deg, " + bg1 + " 0%, " + bg2 + " " + (percentValue > 1 ? percentValue - 1 : 0)
                        + "%, " + bgSplit + " " + percent
                        + ", transparent " + percent + ")",
                        "min-width" : "100px"
                    });
                    // 对 +/- 符号进行处理
                    ce.html(ce.html().replace(">+", ">▴ ").replace(">-", ">▾ "));
                }
                // 内容为货币
                else if (text.isCurrency()) {
                    // 对货币符号进行格式货
                    ce.html(VLOOK.formatting.decimal( // 对货币符号进行格式货
                        VLOOK.formatting.thousands( // 添加千位符
                            VLOOK.formatting.currency(ce.html())))); // 对小数进行格式化处理
                    // 根据正负号进行着色处理
                    ColumnFormatting.coloringNumber(ce, text, false);
                }
            });
        } // 数值格式

        // 标记单元格是否为横向合并，横向合并的单元不应用列格式
        if (th.attr("colspan") !== undefined)
            th.attr("data-vk-colspan", "true");
        else
            th.attr("data-vk-colspan", "false");
    });
}

/**
 * 根据数值的正、负号进行着色处理
 *
 * @param target 着色的对象
 * @param text 依据的数值文本
 * @param mode 正负号位置模式，true：在开头，false: 在任意位置
 * @returns boolean 着色结果，true：有着色，false：没有着色
 */
ColumnFormatting.coloringNumber = function (target, text, mode) {
    // 正、负号在文本的开头
    if (mode === true) {
        if (text.startsWith("-")) {
            target.addClass("mdx-tbl-col-fmt-num-negative");
            return true;
        }
        else if (text.startsWith("+")) {
            target.addClass("mdx-tbl-col-fmt-num-positive");
            return true;
        }
    }
    // 正、负号在文本的任意位置
    else {
        if (text.indexOf("-") > -1) {
            target.addClass("mdx-tbl-col-fmt-num-negative");
            return true;
        }
        else if (text.indexOf("+") > -1) {
            target.addClass("mdx-tbl-col-fmt-num-positive");
            return true;
        }
    }
    return false;
}

/**
 * 移除复选框的语法内容
 */
ColumnFormatting.removeCheckboxSyntax = function (target) {
    target.replaceHTML(/\[(\s|x|-)]\s*/, "");
}

// ==================== 表格行分组/折叠类 ==================== //

function RowGroup() {}

RowGroup.icon = {
    // 表格折叠行图标：已收起
    closed : '<svg width="12px" height="12px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 5px;"><use xlink:href="#icoRowGroupClosed" class="mdx-rowgroup-folder-ico"/></svg>',
    // 表格折叠行图标：已展开
    opened : '<svg width="12px" height="12px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 5px;"><use xlink:href="#icoRowGroupOpened" class="mdx-rowgroup-folder-ico"/></svg>'
}

RowGroup.folderCount = 0; // 折叠行内行分组类型的数量

RowGroup.syntax = {
    tag : /^>+(\s)./, // 用于匹配行折叠语法
    tag2Replace : /(&gt;)+(\s)/ // 用于匹配将行折叠语法替换为指定字符
}
// RowGroup.syntax

RowGroup.spliter = "> "; // 行折叠语法与内容的分隔标识
RowGroup.parentStack = []; // 上级行的堆栈
RowGroup.colorStack = []; // 不同分组的背景颜色堆栈

/**
 * 初始化
 *
 * @param table 表格对象
 */
RowGroup.init = function (table) {
    // 若不是在新标签打开的，将第 1 列的设置缩进样式
    table.find("[data-vk-tbl-col$='-0']").addClass("mdx-tbl-row-g-not-folder");

    let lastLevel = 0, // 上一个缩进等级
        currentLevel = 0, // 当前缩进等级
        randomColor = new RandomColor();

    // 遍历所有行的第 1 个单元格
    table.find("td:first-child").each(function () {
        let td = $(this),
            tr = td.parent(),
            text = td.text();

        // 判断每行的首列，是否有行折叠标记
        // 没有则进入下一个循环
        if (RowGroup.syntax.tag.test(text) === false) {
            lastLevel = 0;
            RowGroup.parentStack.length = 0;
            RowGroup.colorStack.length = 0;
            return true;
        }

        // 从语法中获得当前缩进等级
        currentLevel = text.indexOf(RowGroup.spliter) + 1;
        // 当前等级比上一次等级要深
        if (currentLevel > lastLevel) {
            let beforeChanged = lastLevel;
            lastLevel = currentLevel;
            // 设置为新的行分组
            RowGroup.newFolder(tr, currentLevel, beforeChanged === 0,
                randomColor.format(randomColor.dissimilarRgb(), "var(--tbl-row-g-alpha)"));
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
                    RowGroup.parentStack.pop();
                    RowGroup.colorStack.pop();
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
    return RowGroup.parentStack[RowGroup.parentStack.length - 1];
}

/**
 * 获得最近一个分组颜色对象
 */
RowGroup.lastColor = function () {
    return RowGroup.colorStack[RowGroup.colorStack.length - 1];
}

/**
 * 设置为新的行分组
 *
 * @param tr 对应的行对象
 * @param level 缩进层级
 * @param reset 是否重置回第一级
 * @param color 该分组背景色
 */
RowGroup.newFolder = function (tr, level, reset, color) {
    let folderRow = tr.prev();
    RowGroup.folderCount++;

    // 将当前行分组的 id 入栈
    RowGroup.parentStack.push(RowGroup.folderCount);
    // 将当前行分组的随机背景颜色入栈
    RowGroup.colorStack.push(color);

    // 设置折叠行分组的属性
    folderRow.attr("data-vk-folder-id", RowGroup.folderCount);
    folderRow.attr("data-vk-folder", "true");
    folderRow.attr("data-vk-row-folded", "true");

    // 上一行没有背景
    let c1 = folderRow.prev().css("background-color");
    if (c1 === "rgba(0, 0, 0, 0)" || reset === true) {
        folderRow.css({
            "background-color" :
                RowGroup.lastColor()
        });
    }
    // 上一行有背景色，则采用组合背景色表达相关性
    else {
        let c2 = RowGroup.lastColor(),
            c1Width = level * 50;
        folderRow.css({
            "background" :
                "linear-gradient(135deg, " + c1 + " " + c1Width + "px, "
                + c2 + " " + c1Width + "px)"
        });
    }

    // 获得折叠行分组首个单元格
    let td = folderRow.children("td:first"),
        tdHadIdent = td.find(".mdx-tbl-row-g-identer:last");

    // 设置折叠控件样式
    if (tdHadIdent.length > 0)
        tdHadIdent.after("<span class='mdx-tbl-row-g-btn'>" + RowGroup.icon.closed + "</span>");
    else
        td.prepend("<label class='mdx-tbl-row-g-btn'>" + RowGroup.icon.closed + "</label>");

    // 调整折叠行的缩进样式
    td.removeClass("mdx-tbl-row-g-not-folder");
    td.addClass("mdx-tbl-row-g-folder");
    tdHadIdent.addClass("mdx-tbl-row-g-identer-folder");

    // 添加代表目录的括号及样式
    // 重新组合生成新的单元格内容，以支持原始带格式的单元格内容
    let preClass = ".mdx-tbl-row-g-identer, .mdx-tbl-row-g-btn",
        preObjs = td.find(preClass),
        cloneTd = td.clone();
    cloneTd.children(preClass).remove();
    td.html(__echoOuterHTML(preObjs) + "[ <strong>" + cloneTd.html() + " </strong>]");

    // 设置展开、收起事件
    td.children(".mdx-tbl-row-g-btn").click(function () {
        RowGroup.toggle(folderRow);
    });

    /**
     * 遍历获得指定对象集合的所有 outerHTML 内容
     *
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
 *
 * @param folderRow 折叠按钮所在的表格行对象
 */
RowGroup.toggle = function (folderRow) {
    // 取消事件冒泡，用于避免显示表格的阅读模式（十字光标）
    event.stopPropagation();

    // 处理行分组的打开、关闭
    if (folderRow.attr("data-vk-row-folded").startsWith("t"))
        RowGroup.open(folderRow);
    else
        RowGroup.close(folderRow);

    // 隐藏表格的阅读模式（十字光标）
    TableCross.hide();
}

/**
 * 展开所有表格行分组
 *
 * @param table 指定的表格对象
 * @param mode 指定打开模式。auto：系统自动打开
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
RowGroup.openAll = function (table, mode) {
    if (table.attr("data-vk-row-group") !== "true")
        return false;

    table.find(".mdx-tbl-row-g-btn").each(function () {
        let folderRow = $(this).parent().parent();
        if (folderRow.attr("data-vk-row-folded") === "true")
            RowGroup.open(folderRow, mode);
    });
    return true;
}

/**
 * 收起全部表格行分级
 *
 * @param table 指定的表格对象
 * @param mode 指定处理范围。auto：关闭被自动打开的，不指定时默认全部关闭
 * @returns 处理结果。true: 已展开，false: 不符合展开条件
 */
RowGroup.closeAll = function (table, mode) {
    if (table.attr("data-vk-row-group") !== "true")
        return false;

    // 只对第一级的行分组进行处理，非第一级的行分级为 span.mdx-tbl-row-g-btn
    table.find("label.mdx-tbl-row-g-btn").each(function () {
        let folderRow = $(this).parent().parent();
        console.log(mode, folderRow.attr("data-vk-row-open-mode"), folderRow.attr("data-vk-row-folded"));
        if (mode === "auto") {
            if (folderRow.attr("data-vk-row-open-mode") === "auto" && folderRow.attr("data-vk-row-folded") === "false")
                RowGroup.close(folderRow);
        }
        else {
            if (folderRow.attr("data-vk-row-folded") !== "true")
                RowGroup.close(folderRow);
        }
    });
    return true;
}

/**
 * 重置清空表格中的行分组相关信息
 *
 * @param target 目标表格
 */
RowGroup.reset = function (target) {
    target.removeAttr("data-vk-row-group");
    target.find("tr[data-vk-parent-folder-id]").removeAttr("data-vk-parent-folder-id");
}

/**
 * 设置为缩进行
 *
 * @param tr 对应的行对象
 * @param td 对应的行的首个单元格
 * @param level 缩进层级
 */
RowGroup.ident = function (tr, td, level) {
    // 统一缩进节点符号转换，尾行在完成的有处理后再进行修正
    td.replaceHTML(RowGroup.syntax.tag2Replace, "");

    // 设置被折叠行的属性
    tr.attr("data-vk-parent-folder-id", RowGroup.lastParent());
    // 设置缩进样式
    td.attr("data-vk-ident-level", level);
    // 调整样式
    td.removeClass("mdx-tbl-row-g-not-folder");
    td.addClass("mdx-tbl-row-g-sub");
    // 设置被折叠行的背景色，层级越深颜色越深
    tr.css("background-color", RowGroup.lastColor());

    // 生成缩进占位元素
    for (let i = 0; i < level; i++) {
        let identer = td.find(".mdx-tbl-row-g-identer:last"),
            identObj = "<label class='mdx-tbl-row-g-identer'></label>";
        if (identer.length > 0)
            identer.after(identObj);
        else
            td.prepend(identObj);
    }

    // 隐藏被折叠的行
    tr.css("display", "table-column");
}

/**
 * 展开表格行分组
 *
 * @param folderRow 行分组对象
 * @param mode 指定打开模式。auto：系统自动打开
 */
RowGroup.open = function (folderRow, mode) {
    // 处理展开行分组
    let id = folderRow.attr("data-vk-folder-id"),
        table = folderRow.parent().parent(),
        subRows = table.find("tr[data-vk-parent-folder-id='" + id + "']"),
        folderButton = folderRow.children("td:first").children(".mdx-tbl-row-g-btn:last");

    folderRow.attr("data-vk-row-folded", "false");
    if (mode !== undefined)
        folderRow.attr("data-vk-row-open-mode", mode);
    folderButton.prop("innerHTML", RowGroup.icon.opened);
    subRows.css("display", "");

    // 如表格指定了重复表头则进行对应处理
    let thRow = table.find("thead > tr:last-child");
    if (table.attr("data-vk-th-rpt") === "group") {
        // 从第 2 列开始进行处理
        folderRow.find("td:not(:first-child)").each(function () {
            let td = $(this),
                tdHTML = td.html().trim();
            if (tdHTML.length === 0 || tdHTML === "&nbsp;") {
                let colID = td.attr("data-vk-tbl-col"),
                    th = thRow.find("th[data-vk-tbl-col='" + colID + "']").html();
                // 如果对应的列头可能因向下合并单元格为空时，尝试找上一行对应的列头
                if (th === undefined) {
                    let prevThRow = thRow.prev();
                    if (prevThRow !== undefined)
                        th = prevThRow.find("th[data-vk-tbl-col='" + colID + "']").html();
                }
                // 临时将行分组中的单元格替换为对应的列头
                td.html(th);
                td.addClass("mdx-th-repeater");
            }
        });
    }
}

/**
 * 折叠表格行分组
 *
 * @param folderRow 行分组对象
 */
RowGroup.close = function (folderRow) {
    // 处理折叠行分组
    let id = folderRow.attr("data-vk-folder-id"),
        subRows = $("tr[data-vk-parent-folder-id='" + id + "']"),
        folderButton = folderRow.children("td:first").children(".mdx-tbl-row-g-btn:last");

    folderRow.attr("data-vk-row-folded", "true");
    folderRow.removeAttr("data-vk-row-open-mode");
    folderButton.prop("innerHTML", RowGroup.icon.closed);

    // 折叠所有子行（包括行分组）
    subRows.each(function () {
        let tr = $(this),
            folder = tr.attr("data-vk-folder");
        if (folder !== undefined && folder.startsWith("t"))
            RowGroup.close(tr);
        tr.css("display", "table-column");
    });

    // 如表格指定了重复表头则进行对应处理
    let table = folderRow.parent().parent();
    if (table.attr("data-vk-th-rpt") === "group") {
        // 从第 2 列开始进行处理
        folderRow.find("td:not(:first-child)").each(function () {
            let td = $(this);
            // 将行分组中临时替换的列头删除
            if (td.attr("class").indexOf("mdx-th-repeater") > -1) {
                td.html("");
                td.removeClass("mdx-th-repeater");
            }
        });
    }
}

/**
 * 根据设备类型自适应hover样式
 */
RowGroup.adjustHoverStyle = function () {
    if (env.device.mobile) // 移动设备时解绑样式事件
        $(".mdx-tbl-row-g-btn").unbind("hover");
    else // 为表格行分组的折叠控件绑定 hover 事件
        VLOOK.ui.bindHover($(".mdx-tbl-row-g-btn"));
}

// ==================== 表格列头重复生成器 ==================== //

function ThRepeater() {}

ThRepeater.syntax = {
    tag : /.+(\s##)$/ // 用于匹配表格列头重复的语法
}

/**
 * 初始化重复表头处理
 */
ThRepeater.init = function (table) {
    let hasRowGroup = table.attr("data-vk-row-group") === "true";

    // 带行分组时，表头重复模式为 group，其他则为 page
    table.attr("data-vk-th-rpt", hasRowGroup ? "group" : "page");
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
                let rowSpan = parseInt($(this).attr("rowspan"));
                if (rowSpan > skipRowCount)
                skipRowCount = rowSpan - 1;
                lastSkipRowCount = skipRowCount - 1;
            });
        }

        // 每 15 行为 1 页
        if (skipRowCount === 0 && rowIndex % (pageSize + lastSkipRowCount - 1) === 0
            && rowIndex < rowCount) {
                let colIndex = 0;
                thRow.each(function () {
                    tr.after($(this).prop("outerHTML").replaceAll("<th ", "<td "));
                    tr.next().children("td").addClass("mdx-th-repeater");
                    if (colIndex === 0)
                        tr.next().children(".mdx-th-repeater").addClass("first");
                    else
                        tr.next().children(".mdx-th-repeater").addClass("not-first");
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
    loading : VLOOK.ui.generateSvgIcon("icoLoading", 16, 16, "light"),
    play : VLOOK.ui.generateSvgIcon("icoPlay", 16, 16, "light"),
    pause : VLOOK.ui.generateSvgIcon("icoPause", 16, 16, "light"),
    stop : VLOOK.ui.generateSvgIcon("icoStop", 16, 16, "light"),
    forbidden : VLOOK.ui.generateSvgIcon("icoForbidden", 16, 16, "light")
}

/**
 * 初始化音频数据
 */
ExtAudio.init = function () {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("img[src$='.mp3'],[src$='.m4a'],[src$='.ogg'],[src$='.wav'],[src*='.mp3?'],[src*='.m4a?'],[src*='.ogg?'],[src*='.wav?']").each(function () {
        let audioLike = $(this),
            audio = undefined,
            src = audioLike.attr("src"),
            params = VLOOK.util.getQueryParams(src);

        // 指定为 mini 模式（扩展的自定义控件）
        if (params["controls"] === "mini") {
            VLOOK.doc.counter.audiomini++;

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.attr("id", "vk-id-mini-audio" + VLOOK.doc.counter.audiomini);

            // 添加音频播放 mini 控件
            audio.after("<div id='vk-id-mini-audio" + VLOOK.doc.counter.audiomini + "-control"
                + "' data-vk-title='mini audio " + (VLOOK.doc.counter.audiomini)
                + "' class='mdx-audio-mini-control'></div>");

            // 开始加载音频
            audio.bind("loadstart", function () {
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.addClass("mdx-audio-mini-control").addClass("loading");
                controls.html(ExtAudio.icon.loading);
            });

            // 音频就绪可以开始播放
            audio.bind("canplay", function () {
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.removeClass("loading");

                // 绑定点击事件
                controls.unbind("click").click(function () {
                    __play(this, audio[0]);
                });
                controls.html(ExtAudio.icon.play);
                controls.attr("data-vk-pause", params["pause"]);

                // 须显示持续时长
                let dur = params["duration"];
                if (dur !== undefined && dur.startsWith("t")) {
                    let dur2 = audio.attr("data-vk-duration");
                    if (dur2 === undefined || dur2.startsWith("t") === false) {
                        // 计算音频时长
                        let duration = audio[0].duration,
                            min = Math.floor(duration / 60),
                            sec = Math.floor(duration -  min * 60);
                        let minStr = min > 0 ? min + "′" : "";
                        audio.next().after(" <sup class='mdx-duration-info'>" + minStr + sec + "″</sup>");
                        audio.attr("data-vk-duration", "true");
                    }
                }
            });

            // 正在播放
            audio.bind("playing", function () {
                let controls = $("#" + $(this).attr("id") + "-control"),
                    pause = controls.attr("data-vk-pause");

                controls.addClass("mdx-audio-mini-control").addClass("playing");

                // 支持暂停播放
                if (pause !== undefined && pause.startsWith("t")) {
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
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.html(ExtAudio.icon.play);
                controls.removeClass("playing");
            });

            // 故障或不可用
            audio.bind("emptied", function () {
                let id = $(this).attr("id") + "-control",
                    controls = $("#" + id);
                controls.removeClass("loading");
                controls.html(ExtAudio.icon.forbidden);
                controls.addClass("mdx-audio-mini-control").addClass("disabled");
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(id, controls.attr("data-vk-title"));
            });

            // 加载错误
            audio.bind("error", function () {
                audio.trigger("emptied");
            });

            // 鼠标 hover 事件
            audio.hover(function () {
                if ($(this).attr("class").indexOf("disabled") === -1)
                    $(this).addClass("hover");
            }, function () {
                $(this).removeClass("hover");
            });
        }
        // 标准控件模式
        else {
            VLOOK.doc.counter.audio++;

            // 先根据插图的语法生成题注
            CaptionGenerator.actionForMediaContent(audioLike, "audio");

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = __transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.attr("controls", "controls");

            // 若有第 2 题注，则微调样式
            if (audio.next(".mdx-caption-2").length > 0)
                audio.css("margin-bottom", "-10px");

            // 故障或不可用
            audio.bind("emptied", function () {
                // 将无法加载的音频信息添加到链接检查器
                __addToLinkChecker(audio.parent().attr("id"), audio.parent().attr("data-vk-title"));
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
            iLinkChecker.add(id, "🔈 <strong>" + [
                "无效的音频源",
                "無效的音頻源",
                "Invalid audio source",
                "Source audio invalide",
                "Ungültige Audioquelle",
                "Fuente de audio no válida",
                "Недействительный источник звука",
                "無効なオーディオ ソース",
                "잘못된 오디오 소스"
            ][VLOOK.lang.id] + ":</strong> " + content);
        }
    });

    /**
     * 转换为 audio 标签
     *
     * @param audioLike 类 audio 标签（即 src 为音频的 img 标签)
     * @param src 音频 URL
     */
    function __transToAudio(audioLike, src) {
        let tips = [
            "您的浏览器不支持音频标签。",
            "您的瀏覽器不支持音頻標籤。",
            "Your browser does not support the audio tag.",
            "Votre navigateur ne prend pas en charge la balise audio.",
            "Ihr Browser unterstützt das audio -Tag nicht.",
            "Su navegador no es compatible con la etiqueta audio.",
            "Ваш браузер не поддерживает аудио тег.",
            "お使いのブラウザは音声タグをサポートしていません。",
            "브라우저가 오디오 태그를 지원하지 않습니다."
        ][VLOOK.lang.id];

        // 对 audio 标签的属性进行支持
        let autoplay = VLOOK.util.getQueryParams(src)["autoplay"],
            loop = VLOOK.util.getQueryParams(src)["loop"],
            preload = VLOOK.util.getQueryParams(src)["preload"];

        // 将 URL 为音频资源的 img 标签转换为 audio
        audioLike.wrap("<audio src='" + src + "'>" + tips + "</audio>");
        let audio = audioLike.parent();
        // 移除图片 img 标签
        audioLike.remove();

        // 设置 audio 属性
        if (autoplay !== undefined) audio.attr("autoplay", "autoplay");
        if (loop !== undefined) audio.attr("loop", "loop");
        if (preload !== undefined) audio.attr("preload", "auto");

        return audio;
    }

    /**
     * 播放音频
     *
     * @param self 自定义的播放控件对象
     * @param audio 音频的 JavaScript 对象
     */
    function __play(self, audio) {
        let controls = $(self);

        // 已暂停、未播放
        if (audio.paused === true) {
            audio.play();
        }
        // 播放中
        else {
            controls.html(ExtAudio.icon.play);
            controls.removeClass("playing");
            audio.pause();

            // 不支持暂时播放时，暂时即结束
            if (controls.attr("data-vk-pause") === undefined)
                audio.currentTime = 0; // 播放都是从头开始
        }
    }
}

// ==================== 音频增强类 ==================== //

function ExtVideo() {}

/**
 * 初始化音频数据
 */
ExtVideo.init = function () {
    // 支持指定类型的音频，以及支持带参数的 URL
    $("img[src$='.ogv'],[src$='.mp4'],[src$='.webm'],[src*='.ogv?'],[src*='.mp4?'],[src*='.webm?']").each(function () {
        let videoLike = $(this),
            video = undefined,
            src = videoLike.attr("src");
        VLOOK.doc.counter.video++;

        // 先根据插图的语法生成题注
        CaptionGenerator.actionForMediaContent(videoLike, "video");

        // 将 URL 为音频资源的 img 标签转换为 video
        video = __transToVideo(videoLike, src);

        // 故障或不可用
        video.bind("emptied", function () {
            // 将无法加载的音频信息添加到链接检查器
            __addToLinkChecker(video.parent().attr("id"), video.parent().attr("data-vk-title"));
        });

        // 加载错误
        video.bind("error", function () {
            video.trigger("emptied");
        });
    });

    /**
     * 将无效视频源的信息添加到链接检查器
     *
     * @param id 坏链对象的标识
     * @param content 用于显示的内容
     */
    function __addToLinkChecker(id, content) {
        // 将无法加载的音频信息添加到链接检查器
        iLinkChecker.add(id, "📺 <strong>" + [
            "无效的视频源",
            "無效的視頻源",
            "Invalid video source",
            "Source vidéo non valide",
            "Ungültige Videoquelle",
            "Fuente de video no válida",
            "Недействительный источник видео",
            "無効なビデオ ソース",
            "잘못된 비디오 소스"
        ][VLOOK.lang.id] + ":</strong> " + content);
    }

    /**
     * 转换为 video 标签
     *
     * @param videoLike 类 video 标签（即 src 为视频的 img 标签)
     * @param src 视频 URL
     */
    function __transToVideo(videoLike, src) {
        let tips = [
            "您的浏览器不支持视频标签。",
            "您的瀏覽器不支持視頻標籤。",
            "Your browser does not support the video tag.",
            "Votre navigateur ne prend pas en charge la balise video.",
            "Ihr Browser unterstützt das video -Tag nicht.",
            "Su navegador no es compatible con la etiqueta video.",
            "Ваш браузер не поддерживает видео тег.",
            "お使いのブラウザは動画タグをサポートしていません。",
            "브라우저가 비디오 태그를 지원하지 않습니다."
        ][VLOOK.lang.id];

        // 对 video 标签的属性进行支持
        let autoplay = VLOOK.util.getQueryParams(src)["autoplay"],
            loop = VLOOK.util.getQueryParams(src)["loop"],
            preload = VLOOK.util.getQueryParams(src)["preload"],
            width = VLOOK.util.getQueryParams(src)["width"],
            height = VLOOK.util.getQueryParams(src)["height"];

        // 将 URL 为音频资源的 img 标签转换为 video
        videoLike.wrap("<video src='" + src + "'>" + tips + "</video>");
        let video = videoLike.parent();
        // 移除图片 img 标签
        videoLike.remove();

        // 设置 video 为标准控件
        video.attr("controls", "controls");

        // 设置 video 属性
        if (autoplay !== undefined) video.attr("autoplay", "autoplay");
        if (loop !== undefined) video.attr("loop", "loop");
        if (preload !== undefined) video.attr("preload", "auto");
        if (width !== undefined) video.attr("width", width);
        if (height !== undefined) video.attr("height", height);

        return video;
    }
}

// ==================== 文本输入框类 ==================== //

/**
 * 构造函数
 *
 * @param target 须在其后添加文本输入组件的目标对象
 * @param id 对象标识
 * @param append 添加模式。true：作为子元素添加，false：作为兄弟元素添加
 */
function TextField(target, id, append) {
    let that = this;
    // 文本输入框属性
    this.ui = undefined;
    this.icon = undefined;
    this.input = undefined;
    this.reset = undefined;
    this.action = undefined;

    this.lastValue = "";
    this.timerValueChanged = null;

    // 文本输入框事件
    this.onInput = undefined;
    this.onFocus = undefined;
    this.onBlur = undefined;
    this.onKeyDown = undefined;
    this.onAction = undefined;
    this.pressEnter = undefined;
    this.pressESC = undefined;

    /**
     * 将文本输入框实例添加到指定对象之后
     *
     * @param target 指定对象
     * @param id 添加到目标对象的 id 值
     * @param append true: 添加，false: 插入
     */
    this.__appendTo = function (target, id, append) {
        // 文本输入框 UI
        let ui = '<div class="mdx-textfield ' + id + '">'
            + '<div class="mdx-textfield-icon" style="display: none"></div>'
            + '<input type="text" />'
            + '<div class="mdx-textfield-action" style="display: none"></div>'
            + '<div class="mdx-textfield-reset">'
            + VLOOK.ui.generateSvgIcon("icoResetInput", 16, 16, "alpha")
            + '</div></div>';
        if (append === true) {
            target.append(ui);
            this.ui = target.children(".mdx-textfield." + id);
        }
        else {
            target.after(ui);
            this.ui = target.parent().children(".mdx-textfield." + id);
        }

        // 获得实例的各关键对象
        this.input = this.ui.children("input");
        this.reset = this.ui.children(".mdx-textfield-reset");

        /**
         * 绑定文本输入事件
         */
        this.input.on("input", function () {
            // 跳过中文输入法过程
            if ($(this).prop("compositionStatus") !== "start")
                __processInput();
        });
        /**
         * 绑定开始中文输入事件
         */
        this.input.on("compositionstart", function () {
            $(this).prop("compositionStatus", "start");
        });
        /**
         * 绑定结束中文输入事件
         */
        this.input.on("compositionend", function () {
            $(this).prop("compositionStatus", "end");
        });
        /**
         * 绑定文本按键事件
         */
        this.input.on("keypress", function (event) {
            __processInput();
        });
        /**
         * 绑定文本获得焦点事件
         */
        this.input.focus(function () {
            that.ui.addClass("mdx-textfield-focus");
            __checkComValueChanged();

            // 针对输入中文的情况，若输入了新的内容则进行查询
            function __checkComValueChanged() {
                if (that.input.prop("compositionStatus") !== "start" && that.lastValue !== that.input.val()) {
                    clearTimeout(that.timerValueChanged);
                    that.lastValue = that.input.val();
                    __processInput();
                }
                that.timerValueChanged = setTimeout(__checkComValueChanged, 800);
            }
            // 触发外部重定义事件
            typeof(that.onFocus) == "function" && that.onFocus(that.input);
        });
        /**
         * 绑定文本失去焦点事件
         */
        this.input.blur(function () {
            that.ui.removeClass("mdx-textfield-focus");
            clearTimeout(that.timerValueChanged);
            // 触发外部重定义事件
            typeof(that.onBlur) == "function" && that.onBlur(that.input);
        });

        /**
         * 处理文本框输入的内容
         */
        function __processInput() {
            let value = that.input.val().trim();
            if (value === "") {
                that.reset.hide();

                // 无内容时移除样式
                if (that.action !== undefined && that.action.attr("class").indexOf("enabled") !== -1) {
                    that.action.removeClass("enabled");
                    VLOOK.ui.unbindHover(that.action);
                }
            }
            else {
                that.reset.show();

                // 有内容时移除样式
                if (that.action !== undefined && that.action.attr("class").indexOf("enabled") === -1) {
                    that.action.addClass("enabled");
                    that.action.hover(function () {
                        that.actionHover(true);
                    }, function () {
                        that.actionHover(false);
                    });
                }
            }
            // 触发外部重定义事件
            typeof(that.onInput) == "function" && that.onInput(that.input, value);
        }

        /**
         * 绑定键盘按下事件
         */
        this.input.bind("keydown", function (event) {
            let code = event.keyCode || event.which || event.charCode,
                value = that.input.val();
            switch (code) {
                case 13: // ENTER
                    if (that.action !== undefined)
                        that.action.trigger("click");
                    typeof(that.pressEnter) == "function" && that.pressEnter(that.input, value);
                    break;
                case 27: // ESC
                    that.reset.trigger("click");
                    typeof(that.pressESC) == "function" && that.pressESC(that.input);
                    break;
            }
            // 触发外部重定义事件
            typeof(that.onKeyDown) == "function" && that.onKeyDown(that.input, value, code);
        });

        /**
         * 绑定重置输入内容按钮
         */
        this.reset.unbind("click").click(function () {
            that.input.val("");
            that.input.select();
            that.reset.hide();

            if (that.action !== undefined && that.action.attr("class").indexOf("enabled") !== -1) {
                that.action.removeClass("enabled");
                VLOOK.ui.unbindHover(that.action);
            }
            // 触发外部重定义事件
            typeof(that.onInput) == "function" && that.onInput(that.input, "");
        });
    }

    /**
     * 清空输入框内容
     */
    this.clear = function () {
        this.reset.trigger("click");
    }

    /**
     * 开启输入框前图标
     *
     * @param icon 图标
     */
    this.setIcon = function (icon) {
        this.icon = this.ui.children(".mdx-textfield-icon");
        this.icon.html(icon);
        this.icon.show();
    }

    /**
     * 开启动作按钮
     *
     * @param icon 按钮图标
     */
    this.setAction = function (icon) {
        this.action = this.ui.children(".mdx-textfield-action");
        this.action.html(icon);
        this.action.show();

        this.action.hover(function () {
            that.actionHover(true);
        }, function () {
            that.actionHover(false);
        });
        this.action.unbind("click").click(function () {
            let value = that.input.val();
            // 输入内容不为空
            if (value.length > 0)
                that.input.select();

            // 触发外部重定义事件
            typeof(that.onAction) == "function" && that.onAction(that.input, value);
        });
    }

    /**
     * 动作按钮鼠标 hover 处理
     *
     * @param enter true: 鼠标光标进入，false: 鼠标光标离开
     */
    this.actionHover = function (enter) {
        if (enter === true) {
            that.action.addClass("hover");
            if (that.action.attr("class").indexOf("enabled") !== -1)
                that.ui.addClass("hover-action");
        }
        else {
            that.action.removeClass("hover");
            that.ui.removeClass("hover-action");
        }
    }

    /**
     * 设置提示文本
     *
     * @param text 提示文本
     */
    this.placeholder = function (text) {
        this.input.attr("placeholder", text);
    }

    /**
     * 显示文本输入框
     */
    this.show = function () {
        this.ui.show();
    }

    /**
     * 隐藏文本输入框
     */
    this.hide = function () {
        this.ui.hide();
    }

    /**
     * 设置文本框宽度
     *
     * @param width 宽度
     */
    this.setWidth = function (width) {
        this.ui.css({
            "width" : width
        });
        this.input.css({
            "width" : width - this.reset.width()
                - (this.icon === undefined ? 0 : this.icon.width())
                - (this.action === undefined ? 0 : this.action.width())
        });
        if (this.icon !== undefined)
            this.input.addClass("set-icon");
    }

    // 生成控件
    this.__appendTo(target, id, append);
}

// ==================== 过滤结果导航器类 ==================== //

function FilterResultNavigator(result) {
    this.index = 0;
    this.result = result;

    this.nextItem = function () {
        if (this.result.isHidden())
            return;

        let set = this.result.children(":visible"),
            item = set.eq(this.index);
        this.index++;
        if (this.index >= set.length)
            this.index = 0;
        return item;
    }

    this.restart = function () {
        this.index = 0;
    }
}

// ==================== 导航中心【目录】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocCatalog(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.catalog"), // 入口
        body : $(".mdx-toc-catalog-body"), // 目录索引内容
        result : $(".mdx-toc-filter-result.catalog") // 过滤结果面板
    }

    this.holder = holder;

    this.headers = []; // 目录集
    // 针对无封面的情况
    if (VOM.cover() === undefined)
        this.headers.push("vk-id-doc-title");

    this.currentHeaderIndex = -1; // 当前章节在目录集中的索引
    this.currentItem = undefined; // 当前章节对象

    this.foldItems = []; // 非叶子章节集
    this.lastHeaderFolder = undefined; // 上一个非叶子章节
    this.lastHeaderLevel = 0; // 上一个章节的层级

    this.lastDocScrollTop = 0; // 记录最后一次文档滚动位置

    this.resultNav = new FilterResultNavigator(this.ui.result); // 过滤结果导航器

    VLOOK.ui.addAnimate(this.ui.body.find(".md-toc-item, .mdx-toc-item"));

    // 当前章节变化事件
    this.onChapterChanged = undefined;

    // 目录相关图标集
    this.icon = {
        // 章节：已收起
        folded : '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px;"><use xlink:href="#icoFolded" class="mdx-toc-folder-ico"/></svg>',
        // 章节：已展开
        unfold : '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px;"><use xlink:href="#icoUnfold" class="mdx-toc-folder-ico"/></svg>',
    };

    // 更新无目录情况下的提示信息
    this.ui.body.attr("data-vk-catalog-empty", [
        "( 无目录 )",
        "( 無目錄 )",
        "( Catalog is Empty )",
        "( Le Répertoire Est Vide )",
        "( Katalog ist Leer )",
        "( El Directorio Está Vacío )",
        "( Каталог Пуст )",
        "( カタログは空です )",
        "( 디 렉 터 리 가 비어 있 음 )"
        ][VLOOK.lang.id]);

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "catalog";
    }

    /**
     * 根据设备类型自适应hover样式
     */
    this.adjustHoverStyle = function () {
        if (env.device.mobile) // 移动设备时解绑样式事件
            $(".mdx-toc-folder").unbind("hover");
        else // 非移动设备时绑定样式事件
            VLOOK.ui.bindHover($(".mdx-toc-folder"));
    }

    /**
     * 添加目录节点
     *
     * @param item 由 Typora 生成的 [TOC] 目录节点
     */
    this.add = function (item) {
        this.holder.segments.status(this, true);

        // 将章节记录到目录集中
        let a = item.children("a"),
            href = a.attr("href");
        this.headers.push(href.substring(1, href.length));

        // 自定义目录节点元数据
        item.attr({
            "id" : "vk-header-" + item.attr("data-ref"), // 添加id属性
            "data-vk-node" : "0", // 添加节点类型：0:叶子节点, 1:目录节点
            "data-vk-folded" : "false", // 添加节点状态：true:收起, false:展开
            "title" : a.text().trim()
        });
        VLOOK.ui.addAnimate(item);

        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.after(a.text());
        a.text("");

        // 点击目录节点事件
        item.unbind("click").click(function () {
            // 跳转至对应的页内锚点
            let hash = $("#" + item.attr("id")).children("a").attr("href");
            VLOOK.util.gotoHash(hash);

            // 触发锚点点击事件
            typeof(that.holder.onInteractive) == "function" && that.holder.onInteractive();
            // typeof(that.onClickHash) == "function" && that.onClickHash();
        });

        // -----------------------------------
        // 目录非叶子章节的折叠功能实现
        // 所有目录节点都添加 folding 空白控件备用
        $("<div id='fd-vk-header-" + item.attr("data-ref")
            + "' class='mdx-toc-folder'>&nbsp;</div>").insertBefore(item.find("a"));

        // 记录所有非叶子节点的folder控件
        if (this.lastHeaderFolder !== undefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (this.parseHeaderLevel(item) > this.lastHeaderLevel) {
                // 将最近一个子目录节点折叠控件入栈
                this.foldItems.push(this.lastHeaderFolder);

                // 为非叶子的章节添加折叠图标
                let folder = this.lastHeaderFolder.html(this.icon.unfold);
                folder.parent().attr({
                    "data-vk-node" : "1", // 0:叶子, 1:目录
                    "data-vk-folded" : "false" // true:收起， false:展开
                });

                // 折叠控件事件
                folder.unbind("click").click(function () {
                    let id = $(this).parent().attr("id");
                    that.disposeFold(id, ($("#" + id).attr("data-vk-folded").startsWith("t")) ? "e" : "c", true);
                    event.cancelBubble = true;
                });
            }

            // 右当前节点比上一个节点层级高，则视为从下级回到上级
            // 并将最近一个子目录节点折叠控件出栈
            if (this.parseHeaderLevel(item) < this.lastHeaderLevel)
                this.foldItems.pop();

            // 设置当前节点的父级信息
            if (this.foldItems.length > 0)
                item.attr("data-vk-pid", this.foldItems[this.foldItems.length - 1].parent().attr("id"));
        }

        // 更新最后处理的folder控件
        this.lastHeaderFolder = $("#fd-vk-header-" + item.attr("data-ref"));
        this.lastHeaderLevel = this.parseHeaderLevel(item);
    }

    /**
     * 页面滚动时根据页面当前的位置，高亮对应目录中的章节
     */
    this.focusHeader = function () {
        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        let scrollTop = $(document).scrollTop();
        if (Math.abs(scrollTop - this.lastDocScrollTop) < 20)
            return;

        this.lastDocScrollTop = scrollTop;

        // ----------------------------------------
        // 寻找文档当前显示的章节
        // 默认为最后一章
        let currentIndex = this.headers.length - 1;
        for (let i = 0, len = this.headers.length; i < len; i++) {
            let anchor = (env.browser.Firefox === false)
                    ? this.headers[i] // 非 Firefox 浏览器
                    : decodeURI(this.headers[i]), // Firefox 浏览器
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
        if (this.currentHeaderIndex === currentIndex)
            return;

        // 章节有变化，并记录
        this.currentHeaderIndex = currentIndex;

        // 当前文档位置在实际内容章节中时
        if (this.inHeader() === true) {
            // ----------------------------------------
            // 更新目录内当前节点的样式
            // 先清除目录中上一次的「当前章节」的样式
            if (this.currentItem !== undefined)
                this.currentItem.removeClass("mdx-toc-item-current");
            // 更新「当前章节」的样式
            this.currentItem = $("#vlook-toc a[href='#" + this.headers[currentIndex] + "']").parent();
            this.currentItem.addClass("mdx-toc-item-current");

            // 若当前目录节点被折叠隐藏，则向上展开父级目录节点
            if (this.currentItem.isHidden())
                __expandUpFolder(this.currentItem.attr("data-vk-pid"));

            // 导航中心内容自动滚动当前章节所在位置
            this.scrollToCurrent();
        }

        // 触发当前章节变化事件
        typeof(that.onChapterChanged) == "function" && that.onChapterChanged();

        /**
         * 向上展开父级目录
         *
         * @param id 父级目录 id 值
         */
        function __expandUpFolder(id) {
            // 展开
            that.disposeFold(id, "e", true);
            // 若未到 h1（即第一级目录），则继续向上展开
            let item = $("#" + id),
                tagName = item.prop("tagName");
            if (tagName !== undefined && tagName.toLowerCase() !== "h1")
                __expandUpFolder(item.attr("data-vk-pid"));
        }
    }

    /**
     * 导航中心内容自动滚动到当前章节所在位置
     */
    this.scrollToCurrent = function () {
        if (this.currentItem === undefined || this.currentItem.position() === undefined)
            return;

        // 根据当前节点情况，目录内的可视空间自动滚动该节点所在位置
        const preDis = this.currentItem.height() * 3, // 用于目录节点触动滚动的大小
            sTop = this.ui.body.scrollTop(), // 目录内当前滚动位置
            sBottom = sTop + this.ui.body.height(); // 当前可视空间中位于目录底部的位置

        // 若当前节点在可视区域的上方，则滚动到该节点的位置
        if (this.currentItem.position().top < sTop)
            this.ui.body.scrollTop(this.currentItem.position().top);
        // 若当前节点在可视区域的下方，则滚动到该节点的位置
        else if (this.currentItem.position().top > (sBottom - preDis))
            this.ui.body.scrollTop(this.currentItem.position().top - this.ui.body.height() + preDis);
    }

    /**
     * 文档当前位置是否在章节内
     */
    this.inHeader = function () {
        return this.currentHeaderIndex > -1;
    }

    /**
     * 当前章节为第1章时特殊处理（有封面模式时）
     */
    this.inFirstHeader = function () {
        return (VOM.cover() !== undefined && this.currentHeaderIndex === 0);
    }

    /**
     * 当前文档位置位于文档标题（无封面模式时）
     */
    this.inDocTitle = function () {
        return (VOM.cover() === undefined && this.currentHeaderIndex === 0);
    }

    /**
     * 按关键字过滤
     *
     * @param value 过滤的关键字内容
     * @returns true - 有匹配的结果，false - 无匹配的结果
     */
    this.filterByKeyword = function (value) {
        if (value.trim() === "")
            return false;

        if (this.holder.segments.checkedItem() === this.typeName())
            this.showFilterResult();

        let matched = false;
        this.ui.result.empty();
        // 遍历目录节点进行关键字匹配
        $("#vlook-toc > .md-toc-item").each(function () {
            let item = $(this),
                title = item.attr("title");
            if (title.toLowerCase().indexOf(value) > -1) {
                // 匹配结果后，从目录节点中复制节点并移除不必要的样式和内容
                let cloneItem = item.clone();
                cloneItem.addClass("mdx-toc-item");
                cloneItem.removeClass("md-toc-item md-toc-h1 md-toc-h2 md-toc-h3 md-toc-h4 md-toc-h5");
                cloneItem.children(".mdx-toc-folder").remove();
                cloneItem.prepend("<span>" + ["章节", "章節", "Chapter", "Chapitre", "Kapitel", "Capítulo", "Глава", "章", "장"][VLOOK.lang.id] + ". </span>");
                cloneItem.show();
                cloneItem.attr("data-vk-keyword-match", "true");

                VLOOK.ui.addAnimate(cloneItem);
                // 绑定同源的点击事件
                cloneItem.unbind("click").click(function () {
                    that.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
                    item.trigger("click");
                    $(this).addClass("mdx-toc-item-current");
                });
                // 将匹配的节点添加到过滤结果中
                that.ui.result.append(cloneItem);
                matched = true;
            }
        });

        // 过滤结果为空
        if (matched === false) {
            this.ui.result.empty();
            this.ui.result.append("<div class='mdx-toc-filter-result-none'>" + [
                "无匹配结果!",
                "無匹配結果!",
                "No Results!",
                "Aucun résultat!",
                "Keine Ergebnisse!",
                "¡No hay resultados!",
                "Нет результатов!",
                "結果がありません!",
                "결과가 없습니다!"
            ][VLOOK.lang.id] + "</div>");
            // if (this.holder.segments.checkedItem() !== this.typeName())
                TocIndex.updateStatus(this);
        }

        return true;
    }

    /**
     * 更新所属分段状态
     */
    this.updateStatus = function () {
        if ($("#vlook-toc > .md-toc-item").length > 0)
            this.holder.segments.status(this, true);
        else
            this.holder.segments.status(this, false);
    }

    /**
     * 显示目录索引组件
     */
    this.show = function () {
        if (this.holder.keyword.input.val().length > 0) {
            this.ui.body.hide();
            this.showFilterResult();
        }
        else {
            this.ui.body.show();
            this.hideFilterResult();
        }
    }

    /**
     * 隐藏目录索引组件
     */
    this.hide = function () {
        this.ui.body.hide();
        this.hideFilterResult();
    }
    if (hidden) this.hide();

    /**
     * 显示过滤结果
     */
    this.showFilterResult = function () {
        this.ui.body.hide();

        this.ui.result.show();
        this.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
    }

    /**
     * 隐藏过滤结果
     */
    this.hideFilterResult = function () {
        this.ui.result.hide();
    }

    /**
     * 跳转至指定章节
     */
    this.gotoHeader = function (target) {
        VLOOK.util.gotoHash("#" + target.attr("data-vk-anchor"));
    }

    /**
     * 处理展开或收起指定章节下的子章节
     *
     * @param id 对象的id值
     * @param action 执行动作（c: collect, e: expand）
     * @param traversal 是否遍历子元素
     */
    this.disposeFold = function (id, action, traversal) {
        let lastItem = null,
            item = $("#" + id),
            itemSet = item.nextAll(),
            btnFolder = $("#fd-" + id);

        // 更新折叠控件图标
        item.attr("data-vk-folded", (action === "e") ? "false" : "true");
        btnFolder.html((action === "e") ? this.icon.unfold : this.icon.folded);

        // 将指定节点后的所有节点进行处理
        for (let i = 0, len = itemSet.length; i < len; i++) {
            let item = $(itemSet[i]);
            // 对前后节点层级不一致的处理
            if (lastItem != null) {
                const hd1 = this.parseHeaderLevel(item);
                const hd2 = this.parseHeaderLevel(lastItem);
                if (hd1 > hd2) // 当前节点层级大于上一个节点的层级，继续
                    continue;
                else if (hd1 < hd2) // 当前节点层级小于上一个节点的层级，终止
                    break;
            }

            // 如果是目录节点，同时是已展开，且执行动作为「收起」，才进行递归调用展开子节点
            if (traversal === true
                && item.attr("data-vk-node") === "1"
                && item.attr("data-vk-folded").startsWith("f")
                && action === "c") {
                    item.attr("data-vk-folded", "true");
                    // 递归处理
                    this.disposeFold(item.attr("id"), action, traversal);
            }

            // 收起 / 展开
            item.css("display", (action === "c") ? "none" : "block");
            lastItem = item;
        }
    }

    /**
     * 返回指定对象的CSS的header的样式层级
     */
    this.parseHeaderLevel = function (target) {
        let cname = target.attr("class");
        return cname.substr(cname.indexOf("md-toc-h") + "md-toc-h".length, 1)
    }
}

// ==================== 导航中心分类索引通用类 ==================== //

function TocIndex() {}

TocIndex.segments = undefined;

/**
 * 初始化 UI
 *
 * @param indexObj 目标对象
 */
TocIndex.initUI = function (indexObj) {
    let ui = indexObj.ui;

    VLOOK.ui.addAnimate(ui.entry);

    // 生成提示信息 UI
    ui.result.append("<div class='mdx-toc-filter-result-none'></div>");
    ui.tips = ui.result.children(".mdx-toc-filter-result-none");

    TocIndex.__showTips(ui);
}

/**
 * 无输入关键字的处理
 *
 * @param indexObj 目标对象
 */
TocIndex.noneKeyword = function (indexObj) {
    let ui = indexObj.ui,
        items = ui.result.children(".mdx-toc-item");
    items.show();
    if (items.length === 0)
        TocIndex.__showTips(ui);
    else {
        ui.tips.hide();
        items.attr("data-vk-keyword-match", "true");
        TocIndex.updateStatus(indexObj);
    }
    // __showTips();
}

/**
 * 更新所属分段状态
 *
 * @param indexObj 目标对象
 */
TocIndex.updateStatus = function (indexObj) {
    TocIndex.segments.status(indexObj,
        indexObj.ui.result.children(".mdx-toc-item[data-vk-keyword-match]").length > 0);
}

/**
 * 显示提示信息
 */
TocIndex.__showTips = function (ui) {
    ui.tips.text([
        "无此类内容",
        "無此類內容",
        "No such content",
        "Aucun contenu de ce type",
        "Kein solcher Inhalt",
        "No hay tal contenido",
        "Нет такого контента",
        "そのようなコンテンツはありません",
        "그러한 콘텐츠 없음"
    ][VLOOK.lang.id]);
    ui.tips.show();
}

/**
 * 添加索引项目
 *
 * @param indexObj 目标对象
 * @param text 显示的文本
 * @param anchor 锚点
 * @param forSearch 用于搜索时检索的内容
 */
TocIndex.add = function (indexObj, text, anchor, forSearch) {
    TocIndex.segments.status(indexObj, true);

    if (indexObj.ui.tips.isShowed())
        indexObj.ui.tips.hide();
    let item = $('<span class="mdx-toc-item" data-for-search="'
            + VLOOK.util.clearHtmlQuot((forSearch === undefined || forSearch.trim().length === 0) ? "" : forSearch)
            + '">' + text + "</span>");
    indexObj.ui.result.append(item);
    VLOOK.ui.addAnimate(item);
    item.unbind("click").click(function () {
        indexObj.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
        item.addClass("mdx-toc-item-current");

        VLOOK.util.gotoHash("#" + anchor);

        // 触发锚点点击事件
        typeof(indexObj.holder.onInteractive) == "function" && indexObj.holder.onInteractive();
        // typeof(indexObj.onClickHash) == "function" && indexObj.onClickHash();
    });
}

/**
 * 按关键字过滤
 *
 * @param indexObj 目标对象
 * @param value 过滤的关键字内容
 * @returns true - 有匹配的结果，false - 无匹配的结果
 */
TocIndex.filterByKeyword = function (indexObj, value) {
    if (value.trim().length === 0) {
        TocIndex.segments.status(indexObj, false);
        return false;
    }

    // 清空索引列表项
    indexObj.ui.tips.hide();
    indexObj.ui.result.children().hide();
    indexObj.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
    indexObj.ui.result.children().removeAttr("data-vk-keyword-match");

    // 遍历目录节点进行关键字匹配
    let matched = false;
    indexObj.ui.result.children(".mdx-toc-item").each(function () {
        let item = $(this),
            dataForSearch = item.attr("data-for-search");
        if (item.text().toLowerCase().indexOf(value) > -1
            || (dataForSearch !== undefined && dataForSearch.toLowerCase().indexOf(value) > -1)) {
                item.show();
                item.attr("data-vk-keyword-match", "true");
                TocIndex.segments.status(indexObj, true);
                matched = true;
        }
    });

    // 过滤结果为空
    if (matched === false) {
        indexObj.ui.tips.text([
            "无匹配结果!",
            "無匹配結果!",
            "No Results!",
            "Aucun résultat!",
            "Keine Ergebnisse!",
            "¡No hay resultados!",
            "Нет результатов!",
            "結果がありません!",
            "결과가 없습니다!"
        ][VLOOK.lang.id]);
        indexObj.ui.tips.show();
        TocIndex.segments.status(indexObj, false);
    }

    return true;
}

/**
 * 显示索引组件
 *
 * @param indexObj 目标对象
 */
TocIndex.show = function (indexObj) {
    indexObj.ui.result.show();
    indexObj.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");
}

/**
 * 隐藏索引组件
 *
 * @param indexObj 目标对象
 */
TocIndex.hide = function (indexObj) {
    indexObj.ui.result.hide();
}

// ==================== 导航中心【插图】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocFigure(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.figure"), // 入口
        result : $(".mdx-toc-filter-result.figure"), // 过滤结果面板
        tips : undefined
    };

    this.holder = holder;

    this.resultNav = new FilterResultNavigator(this.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "figure";
    }

    /**
     * 初始化插图索引
     *
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    this.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    this.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示插图组件
     */
    this.show = function () {
        // this.ui.figureNav.show();
        TocIndex.show(this);
    }

    /**
     * 隐藏插图组件
     */
    this.hide = function () {
        // this.ui.figureNav.hide();
        TocIndex.hide(this);
    }
    if (hidden) this.hide();
}

// ==================== 导航中心【表格】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocTable(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.table"), // 入口
        result : $(".mdx-toc-filter-result.table"), // 过滤结果面板
        tips : undefined
    };

    this.holder = holder;

    this.resultNav = new FilterResultNavigator(this.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "table";
    }

    /**
     * 初始化表格索引
     *
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    this.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
     this.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示表格组件
     */
    this.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏表格组件
     */
    this.hide = function () {
        TocIndex.hide(this);
    }
    if (hidden) this.hide();
}

// ==================== 导航中心【多媒体】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocMedia(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.media"), // 入口
        result : $(".mdx-toc-filter-result.media"), // 过滤结果面板
        tips : undefined
    };

    this.holder = holder;

    this.resultNav = new FilterResultNavigator(this.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "mulitmedia";
    }

    /**
     * 初始化多媒体索引
     *
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    this.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    this.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示多媒体组件
     */
    this.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏多媒体组件
     */
    this.hide = function () {
        TocIndex.hide(this);
    }
    if (hidden) this.hide();
}

// ==================== 导航中心【代码块】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocCodeblock(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.codeblock"), // 入口
        result : $(".mdx-toc-filter-result.codeblock"), // 过滤结果面板
        tips : undefined
    };

    this.holder = holder;

    this.resultNav = new FilterResultNavigator(this.ui.result); // 过滤结果导航器

    // 关键字输入组件属性设置
    TocIndex.initUI(this);

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "codeblock";
    }

    /**
     * 初始化代码块索引
     *
     * @param text 显示的文本
     * @param anchor 锚点
     * @param forSearch 用于搜索时检索的内容
     */
    this.add = function (text, anchor, forSearch) {
        TocIndex.add(this, text, anchor, forSearch);
    }

    /**
     * 更新所属分段状态
     */
    this.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示代码块组件
     */
    this.show = function () {
        TocIndex.show(this);
    }

    /**
     * 隐藏代码块组件
     */
    this.hide = function () {
        TocIndex.hide(this);
    }
    if (hidden) this.hide();
}

// ==================== 导航中心【访问历史】组件类 ==================== //

/**
 * 构造函数
 *
 * @param holder 关联的上级容器
 * @param hidden 是否默认为隐藏
 */
function TocHistory(holder, hidden) {
    let that = this;
    this.ui = {
        entry : $(".mdx-segment-btn.history"), // 入口
        title : $(".mdx-toc-history-title"), // 历史记录标题
        result : $(".mdx-toc-history-result") // 历史记录面板
    };

    this.holder = holder;

    /**
     * 返回 Toc 组件类型名称
     *
     * @returns Toc 组件类型名称
     */
    this.typeName = function () {
        return "history";
    }

    /**
     * 添加访问历史记录
     *
     * @param hash 页内锚点链接
     */
    this.add = function (hash) {
        if (hash === undefined || hash === "#" || hash.trim().length === 0)
            return;

        // 清空当前条目的样式
        that.ui.result.children(".mdx-toc-item-current").removeClass("mdx-toc-item-current");

        // 对由 VLOOK 生成的页内锚点，对其显示的条目文本进行处理
        let title = undefined,
            anchor = hash.substring(1, hash.length);
        if (anchor.startsWith("vk-id"))
            title = $(hash).attr("data-vk-title");
        else if (anchor.startsWith("vk-err")) // 错误的内链
            title = $(hash).text();
        if (title === undefined)
            title = "<span>" + ["章节", "章節", "Chapter", "Chapitre", "Kapitel", "Capítulo", "Глава", "章", "장"][VLOOK.lang.id] + ". </span>" + decodeURI(anchor);
        let result = that.ui.result.children("span[data-vk-history='" + hash + "']");

        // 不存在相同的历史访问记录
        if (result.length === 0) {
            that.ui.result.prepend('<span data-vk-history="'
                + hash + '" class="mdx-toc-item">'
                + title + '</span>');
        }
        // 已存在相同的历史访问记录
        else {
            // 将相同的记录移动到最前面
            let existsItem = result.clone();
            that.ui.result.prepend(existsItem);
            existsItem.addClass("mdx-toc-item-current");
            result.remove();
        }

        // 为新增加 / 移动后的记录添加鼠标事件
        let item = that.ui.result.children("span[data-vk-history='" + hash + "']");
        item.addClass("mdx-toc-item-current");
        item.attr("data-vk-keyword-match", "true");
        VLOOK.ui.addAnimate(item);
        item.unbind("click").click(function () {
            VLOOK.util.gotoHash(hash);
            // 触发锚点点击事件
            typeof(that.holder.onInteractive) == "function" && that.holder.onInteractive();
            // typeof(that.onClickHash) == "function" && that.onClickHash();
        });

        this.updateStatus();
    }

    /**
     * 更新所属分段状态
     */
    this.updateStatus = function () {
        TocIndex.updateStatus(this);
    }

    /**
     * 显示历史组件
     */
    this.show = function () {
        that.ui.title.show();
        that.ui.result.show();

        let tocItem = "span.mdx-toc-item",
            noneHistory = "div.mdx-toc-history-none";
        // 没有历史访问记录，也没有提示信息内容
        if (that.ui.result.children(tocItem + ", " + noneHistory).length === 0) {
            // 添加提示信息
            this.ui.result.append("<div class='mdx-toc-history-none'>" + [
                "暂无记录!",
                "暫無記錄!",
                "No records!",
                "Pas d'enregistrements!",
                "Keine Aufzeichnungen!",
                "¡No hay registros!",
                "Нет записей!",
                "記録なし!",
                "기록이 없습니다!"
            ][VLOOK.lang.id] + "</div>");
        }
        // 有历史访问记录
        else if (that.ui.result.children(tocItem).length > 0) {
            // 移除提示信息
            that.ui.result.children(noneHistory).remove();
        }
    }

    /**
     * 隐藏历史组件
     */
    this.hide = function () {
        that.ui.title.hide();
        that.ui.result.hide();
    }
    if (hidden) this.hide();
}

// ==================== 导航中心 DocLib 文库类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 * @param holder 关联的上级容器
 */
 function DocLib(mask, holder) {
    let that = this;
    this.ui = $(".mdx-doc-lib");
    this.iframe = undefined;
    this.handle = $(".mdx-doc-lib-board.item");
    this.enabled = false;
    this.src = undefined;
    // this.placeholder = "•• Loading Doc Lib ••";

    this.holder = holder;

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this, this.ui);

    VLOOK.ui.addAnimate(this.ui);

    this.init = function () {
        let docLibBoard = $(".mdx-doc-lib-board"),
            timerGetTitle = null,
            getTitleTimes = 10; // 最多尝试 10 次

        this.iframe = $("iframe[name='vlook-doc-lib']");
        this.src = VLOOK.util.getMetaByName("vlook-doc-lib");

        // 有指定文库
        if (this.src !== undefined) {
            console.log("    ├ DocLib: " + this.src);
            this.enabled = true;
            this.iframe.attr("src", this.src + "?ws=none&type=mini");
            // 尝试获得 DocLib 的文档标题
            __getDocLibTitle();
        }
        else {
            console.log("    ├ DocLib: none");
        }

        this.handle.unbind("click").click(function () {
            that.show();
        });

        /**
         * 获得文库的文档标题
         */
        function __getDocLibTitle() {
            VLOOK.data.set("doc-lib-title", "");
            timerGetTitle = setTimeout(function () {
                getTitleTimes--;
                console.warn("Try to get DocLib title (" + getTitleTimes + ")");
                let title = VLOOK.data.get("doc-lib-title");
                if (getTitleTimes > 0 && (title === undefined || title.length === 0)) {
                    __getDocLibTitle();
                }
                else {
                    if (getTitleTimes <= 0) {
                        title = [
                            "浏 览 文 库",
                            "瀏 覽 文 庫",
                            "Document Library",
                            "Bibliothèque de documents",
                            "Bibliothek der Dokumente",
                            "Biblioteca de documentos",
                            "библиотека документов",
                            "ドキュメントライブラリ",
                            "문서 라 이브 러 리"
                        ][VLOOK.lang.id];
                        console.error("    ├ DocLib: timeout");
                    }
                    docLibBoard.show();
                    that.handle.text(title);
                    that.handle.attr("title", title);
                    $(".mdx-nav-center-body, .mdx-nav-center-footer").addClass("mini");
                    clearTimeout(timerGetTitle);
                }
            }, 1000);
        }
    }

    /**
     * 重新加载文库内容
     *
     * @param scheme （可选）指定的颜色方案，light / dark
     */
    this.reload = function (scheme) {
        let cs = "";
        if (scheme !== undefined)
            cs = "&cs=" + scheme;
        this.iframe.attr("src", this.src + "?ws=none&type=mini" + cs);
    }

    /**
     * 显示文库
     */
    this.show = function () {
        typeof(this.holder.onInteractive) == "function" && this.holder.onInteractive();

        this.mask.show();
        this.ui.show();
    }

    /**
     * 隐藏文库
     */
    this.hide = function () {
        this.ui.hide();
        this.mask.hide();
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (this.ui.isHidden())
            return;

        switch (code) {
            case 27: // ESC
                this.hide();
                break;
        }
    }
}

// ==================== 插图增强类 ==================== //

function ExtFigure() {}

/**
 * 初始化插图数据
 */
ExtFigure.init = function () {
    let ignoreImgLost = false,
        stopwatch = new Stopwatch();

    // ----------------------------------------
    // 对 svg 类插图（Mermaid）进行初始化处理
    stopwatch.lapStart();
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    $(".md-diagram-panel > svg > svg > g").each(function () {
        $(this).unwrap();
    });
    stopwatch.lapStop("    ├ prepare svg: ");

    // ----------------------------------------
    // 对 img 类插图（Mermaid）进行初始化处理
    stopwatch.lapStart();
    $("#write p > img, img[src*='mode=figure'], img[src*='mode=icon'], img[src*='mode=logo'], img[src*='mode=frame'], #write .md-diagram-panel svg").each(function () {
        let fig = $(this),
            src = fig.attr("src"),
            container = fig.parent(),
            tagName = (src !== undefined ? "img" : "svg");
        // ----------------------------------------
        // img 类插图的处理
        if (src !== undefined) {
            // 对于 img 类插图的预处理
            let params = VLOOK.util.getQueryParams(src);

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
                return true;

            // 初始化图片背景的适配处理
            __initBackground(fig, params);

            // 添加插图容器
            container = fig.parent();
            // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (container.prop("tagName").toLowerCase() !== "p") {
                fig.wrap("<p></p>");
                container = fig.parent();
            }

            // 初始化对齐方式
            __initAlign(container, params);
        }

        // 绑定内容助手
        iContentAssistor.bind(fig, "Figure");

        VLOOK.doc.counter.figure++;

        // 处理题注
        __disposeCaption(fig, tagName);

        // 设置容器数据，用于折叠内容时使用
        container.attr("data-vk-container", tagName);
        container.addClass("mdx-caption-container");
        // 折叠长插图
        iContentFolder.add(fig);
    }); // 结束初始化处理
    stopwatch.lapStop("    ├ figure set: ");

    // ----------------------------------------
    // srcset 为 auto 模式的处理
    stopwatch.lapStart();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && VLOOK.util.getParamValue("srcset") === "auto") {
            $("p[data-vk-container='img'] img").each(function () {
                let fig = $(this);
                if (fig.attr("src").indexOf(".svg", 1) === -1 // 跳过 svg 文件
                    && fig.attr("srcset") === undefined) {
                        fig.attr("srcset", fig.attr("src") + " 2x");
                }
            });
    }

    // 进行图片对颜色方案的适配处理
    ExtFigure.adjustColorScheme(false);
    stopwatch.lapStop("    └ DPR & misc.: ");

    /**
     * 处理题注
     *
     * @param fig 插图对象
     * @param tagName 插图所属标签 img、svg
     */
     function __disposeCaption(fig, tagName) {
       // 设置插图属性数据
       fig.attr("data-vk-fig-num", VLOOK.doc.counter.figure);
       fig.addClass("mdx-figure");

       // 生成插图题注
       CaptionGenerator.actionForMediaContent(fig, tagName);
    }

    /**
     * 绑定加载失败处理
     *
     * @param fig 插图对象
     */
    function __bindLoadChecker(fig) {
        let src = fig.attr("src");
        // 图片无法加载时加载默认图片
        fig.bind("error", function () {
            if (ignoreImgLost === false) {
                // 将无法加载的图片信息添加到链接检查器
                let cp1 = fig.parent().find(".mdx-caption-1").html(),
                    cp2 = fig.parent().find(".mdx-caption-2").text();
                iLinkChecker.add(fig.parent().attr("id"), "🖼 <strong>" + [
                    "无效的图片源",
                    "無效的圖片源",
                    "Invalid image source",
                    "Source d'image non valide",
                    "Ungültige Bildquelle",
                    "Fuente de imagen no válida",
                    "Неверный источник изображения",
                    "無効な画像ソース",
                    "잘못된 이미지 소스"
                ][VLOOK.lang.id] + ":</strong> " + cp1 + (cp2.trim().length > 0 ? " | " + cp2 : ""));
            }

            __loadDefaultOnError($(this));
        });

        // 强制重新加载一次以触发error事件
        fig.attr("src", src);
    }

    /**
     * 判断是否属于插图
     *
     * @param src 插图路径
     * @returns true：不属于插图，false：属于插图
     */
    function __isNotFigure(src) {
        let mi = src.indexOf("mode", 5), // 分段检过提高处理性能
            iconMode = src.indexOf("=icon", mi + 4) > -1,
            logoMode = src.indexOf("=logo", mi + 4) > -1,
            frameMode = src.indexOf("=frame", mi + 4) > -1;
        return mi > -1 && (iconMode || logoMode || frameMode);
    }

    /**
     * 初始化图片对齐方式的处理
     *
     * @param container img 的题注容器对象
     * @param params img 对象 src 值的 URL 参数数组
     */
     function __initAlign(container, params) {
        let align = params["align"];
        if (align === undefined)
            return;
        container.css("text-align", align);
    }

    /**
     * 初始化图片对网格背景的的适配处理
     *
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initBackground(img, params) {
        let grid = params["grid"];
        if (grid === undefined)
            return;
        img.attr("data-vk-figure-grid", grid);
    }

    /**
     * 初始化图片颜色替换的适配处理
     *
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     * @param src img 对象的 src 值
     */
    function __initFillAlter(img, params, src) {
        if (params["fill"] === undefined)
            return;

        img.attr("data-vk-img-fill", params["fill"]);

        // 图片为 SVG 格式时，将源文件通过 SVGInject 注入到 HTML 文档中
        if (src.indexOf(".svg", 1) > -1) {
            SVGInject(img[0], {
                // SVG 注入成功
                afterInject : function (img, svg) {
                    let svgObj = $(svg);
                    // 属于插图的，则绑定内容助手
                    if (!__isNotFigure(src))
                        iContentAssistor.bind(svgObj, "Figure");
                    // 对颜色进行替换的适配处理
                    ExtFigure.adjustFillAlterForSVG(svgObj.attr("data-vk-img-fill"), svgObj);
                },
                // SVG 注入失败
                onFail : function (img, svg) {
                    console.error("SVGInject ERROR:", $(img).attr("src"));
                }
            });
        }
    }

    /**
     * 初始化图片对颜色方案（Light / Dark）的适配处理
     *
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initColorScheme(img, params) {
        // 未指定 darksrc 参数，或同时指定了 fill 参数，则跳过
        if (params["darksrc"] === undefined)
            return;

        // 适配 Dark Mode 的方式：反转
        if (params["darksrc"] === "invert") {
            img.attr("data-vk-darksrc", "invert");
        }
        // 适配 Dark Mode 的方式：替换
        else {
            img.attr("data-vk-darksrc", "alter");

            let src = img.attr("src"),
                path = VLOOK.util.getPath(src),
                queryString = VLOOK.util.getQueryString(src);
            // 补全 URL 参数内容
            let darksrc = params["darksrc"] + (queryString !== "" ? ("?" + queryString) : "");
            // 如果 darksrc 只含文件名，则用 src 的路径进行补全
            if (darksrc.indexOf("/") === -1)
                darksrc = path + darksrc;

            // 初始化不同颜色方案的 src 内容
            img.attr("data-vk-src-light", img.attr("src"));
            img.attr("data-vk-src-dark", darksrc);

            // 初始化不同颜色方案的 srcset 内容
            if (params["srcset"] !== undefined)
                img.attr("data-vk-srcset-light", params["srcset"]);
            if (params["darksrcset"] !== undefined)
                img.attr("data-vk-srcset-dark", params["darksrcset"]);
        }
    }

    /**
     * 初始化图片高分屏的适配处理
     *
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function __initHighDPI(img, params) {
        let src = img.attr("src"),
            srcset = params["srcset"],
            darksrcset = params["darksrcset"];

        // Light Mode 对应的图片集
        if (srcset !== undefined) {
            srcset = __transUrlSrcSet(src, srcset);
            img.attr("data-vk-srcset-light", srcset);
            // 设置默认值
            img.attr("srcset", srcset);
        }

        // Dark Mode 对应的图片集
        if (darksrcset !== undefined) {
            darksrcset = __transUrlSrcSet(img.attr("data-vk-src-dark"), darksrcset);
            img.attr("data-vk-srcset-dark", darksrcset);
        }
    }

    /**
     * 加载默认图片
     *
     * @param target 目标 img 对象
     */
    function __loadDefaultOnError(target) {
        let alt = target.attr("alt");
        // 将 alt 替换为 title 避免无法指定 width、height 属性
        if (alt !== undefined && alt.length > 0) {
            target.attr("title", alt);
            target.removeAttr("alt");
        }
        target.addClass("mdx-img-lost");
    }

    /**
     * 转换图片 URL 中的 srcset / darksrcset 参数为符合 <img> srcset 属性的格式
     *
     * @param src 图片 URL
     * @param srcset srcset 或 darksrcset 参数的内容
     */
    function __transUrlSrcSet(src, srcset) {
        // 针对 html 与 图片同一目录的情况
        let path = VLOOK.util.getPath(src);

        // @2x/@3x 图片资源为自动匹配名称的语法
        // 2x/3x 的文件名为 <文件名@2x.xxx> 或 <文件名@3x.xxx> 的情况
        if (/^@[2]x(,@[3]x)?$/.test(srcset) === true) {
            let pureSrc = src.substring(0, src.indexOf("?", 5)),
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
            srcset = srcset.replaceAfter(".", "@2x", " 2x");
            srcset = srcset.replaceAfter(".", "@3x", " 3x");
        }

        // 为 2x 图添加图片路径
        let sss = srcset.split(",");
        if (sss[0].indexOf("/") === -1) // 仅为文件名时才添加路径
            srcset = path + srcset;
        // 为 3x 图添加图片路径
        if (sss.length > 1 && sss[1].indexOf("/") === -1) // 仅为文件名时才添加路径
            srcset = srcset.replace(" 2x,", " 2x," + path);

        return srcset;
    }
}

/**
 * 适配指定图片在 Light / Dark Mode 的适配处理
 *
 * @param grid 是否进行网格背景适配处理：true / false
 */
ExtFigure.adjustColorScheme = function (grid) {
    let scheme = ColorScheme.scheme,
        darkMode = scheme === "dark";
    // --------------------
    // 对图片在 Dark Mode 时的适配处理
    // 1. 对适配方式为「反转」的处理
    $("img[data-vk-darksrc='invert'], svg[data-vk-darksrc='invert']").each(function () {
        let img = $(this),
            src = img.attr("src");
        if (darkMode === true) {
            // 如果图片没有指定替换颜色时才进行处理
            if (img.attr("data-vk-img-fill") === undefined) {
                // 设置默认的 srcset
                if (src !== undefined)
                    img.attr("srcset", img.attr("data-vk-srcset-light"));
                // 添加反转样式
                img.addClass("mdx-img-invert-dark");
            }
        }
        else {
            img.removeClass("mdx-img-invert-dark");
            if (src !== undefined)
                img.attr("srcset", img.attr("data-vk-srcset-light"));
        }
    });
    // 2. 对适配方式为「替换」的处理
    $("img[data-vk-darksrc='alter']").each(function () {
        let img = $(this);
        img.removeClass("mdx-img-invert-dark");
        img.attr("src", img.attr("data-vk-src-" + scheme));
        img.attr("srcset", img.attr("data-vk-srcset-" + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $("img[data-vk-img-fill='text'], img[data-vk-img-fill='theme1'], img[data-vk-img-fill='theme2'], svg[data-vk-img-fill='text'], svg[data-vk-img-fill='theme1'], svg[data-vk-img-fill='theme2']").each(function () {
        let fig = $(this),
            fill = fig.attr("data-vk-img-fill");
        // SVG 对象或 src 为 .svg 的 img 对象
        if (fig.prop("tagName").toLowerCase().startsWith("s") || fig.attr("src").indexOf(".svg", 1) > -1) {
            ExtFigure.adjustFillAlterForSVG(fill, fig);
        }
        // 其他情况
        else {
            if (fill === "text")
                fig.css("filter", "drop-shadow(12345px 0px " + fig.parent().css("color") + ")");
            else
                fig.css("filter", "drop-shadow(12345px 0px var(--acc-color-" + fill + "-light))");

            if (fig.attr("data-vk-fig-num") !== undefined)
                fig.css("background", "none");
        }
    });

    // --------------------
    // 非初始化时执行，避免与 CSS 默认配置冲突
    // 如：@media (prefers-color-scheme: dark) 部分
    if (grid === true) {
        // 适配图片网格背景的处理
        $("img[data-vk-figure-grid='line'],img[data-vk-figure-grid='block']").each(function () {
            let img = $(this);
            // 先清空所有涉及的样式
            if (darkMode === true) {
                img.removeClass("mdx-figure-solid-bg-light");
                img.removeClass("mdx-figure-grid-line-light");
                img.removeClass("mdx-figure-grid-block-light");
            }
            else {
                img.removeClass("mdx-figure-solid-bg-dark");
                img.removeClass("mdx-figure-grid-line-dark");
                img.removeClass("mdx-figure-grid-line-dark-invert");
                img.removeClass("mdx-figure-grid-block-dark");
                img.removeClass("mdx-figure-grid-block-dark-invert");
            }

            let gridType = img.attr("data-vk-figure-grid"),
                darkInvert = img.attr("data-vk-darksrc") === "invert";
            // 网络背景
            if (gridType === "line" || gridType === "block") {
                if (darkMode === true && darkInvert === true)
                    // 先添加反色后的背景，以适配反色样式后能正常显示
                    img.addClass("mdx-figure-grid-" + gridType + "-" + scheme + "-invert");
                else
                    img.addClass("mdx-figure-grid-" + gridType + "-" + scheme);
            }
            // 非网格背景
            else
                img.addClass("mdx-figure-solid-bg-" + scheme);
        });
    }
}

/**
 * 适配 *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 *
 * @param fill 图片颜色替换方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
ExtFigure.adjustFillAlterForSVG = function (fill, svg) {
    // 先取消可能会因数 darksrc=invert 的 CSS 配置影响
    svg.css({
        "filter" : "none"
    });
    // 再针对进行微调
    if (fill === "text")
        svg.find("path, rect, ellipse, polygon").css({
            "fill" : svg.parent().css("color")
        });
    else
        svg.find("path, rect, ellipse, polygon").css({
            "fill" : "var(--acc-color-" + fill + "-light)",
        });
}

// ==================== 插图导航模块 ==================== //

function FigureNav() {
    let that = this;
    this.ui = $(".mdx-figure-nav"); // 插图导航主界面
    this.buttons = {
        ui : $(".mdx-figure-nav-btns"), // 所有导航按钮
        prev : $(".mdx-figure-nav-btns.prev"), // 上一张插图按钮
        next : $(".mdx-figure-nav-btns.next"), // 下一张插图按钮
        close : $(".mdx-btn-close-figure-nav"), // 关闭按钮
    };
    this.content = $(".mdx-figure-content"); // 显示插图内容的控件
    this.figNum = 0; // 当前插图索引序号，对应 vk-id-fig 中的值

    VLOOK.ui.addAnimate(this.content.children("img, svg"));

    // 绑定各按钮事件
    this.buttons.prev.unbind("click").click(function () {
        that.prev();
    });
    this.buttons.next.unbind("click").click(function () {
        that.next();
    });
    this.buttons.close.unbind("click").click(function () {
        that.hide();
    });
    this.content.unbind("click").click(function () {
        that.hide();
    });

    /**
     * 插图导航导航按钮在不同终端的适配处理
     */
    this.adjustHoverStyle = function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            this.buttons.prev.unbind("hover");
            this.buttons.next.unbind("hover");
        }
        // 非移动设备时绑定样式事件
        else {
            this.buttons.ui.hover(function () {
                $(this).css({
                    "transform" : "translateY(-2px)"
                });
            }, function () {
                $(this).css({
                    "transform" : "none"
                });
            });
            // 鼠标键按下事件，模拟 :active
            this.buttons.ui.mousedown(function () {
                $(this).css({
                    "transform" : "none"
                });
            });
            // 鼠标键释放事件，模拟恢复正常
            this.buttons.ui.mouseup(function () {
                $(this).css({
                    "transform" : "translateY(-2px)"
                });
            });
        }
    }

    /**
     * 显示插图导航
     */
    this.show = function (fig) {
        VLOOK.report.push(['Interactive', 'Figure Nav', 'Show/Hide', 0]);
        if (VLOOK.doc.counter.figure === 0)
            return;

        VLOOK.doc.scroll.freeze();
        VLOOK.doc.block = true;

        if (fig == null)
            fig = $("[data-vk-fig-num='" + this.figNum + "']");

        // 在插图导航中显示对应插图
        this.figNum = parseInt(fig.attr("data-vk-fig-num"));

        VLOOK.ui.show(this.ui);

        this.display();
        this.updateUI();
    }

    /**
     * 关闭插图导航
     */
    this.hide = function () {
        this.content.empty();
        VLOOK.ui.hide(this.ui);

        VLOOK.doc.scroll.unfreeze();
        VLOOK.doc.block = false;
    }

    /**
     * 显示插图内容
     */
    this.display = function () {
        let fig = $("[data-vk-fig-num='" + this.figNum + "']");
        this.content.empty();
        this.content.show();
        this.content.css({
            "width" : $(window).width(),
            "height" : $(window).height()
        });

        let newFig = fig.clone();
        newFig.css({
            "max-width" : $(window).width() - 90,
            "max-height" : $(window).height() - 90,
            "border-radius" : "var(--vlook-base-radius)"
        });
        newFig.addClass("mdx-interactive");
        VLOOK.ui.hide(newFig);

        // 添加鼠标移入/移出事件
        VLOOK.ui.bindHover(newFig);

        // 添加鼠标点击事件
        newFig.unbind("click").click(function () {
            // 跳转到对应位置
            VLOOK.util.gotoHash("#vk-id-fig" + that.figNum);
            that.hide();
        });

        this.content.append(newFig);
        VLOOK.ui.show(newFig);
    }

    /**
     * 查看上一个插图
     */
    this.prev = function () {
        if (this.figNum > 0) {
            this.figNum--;
            this.display();
            this.updateUI();
        }
    }

    /**
     * 查看下一个插图
     */
    this.next = function () {
        if (this.figNum < VLOOK.doc.counter.figure - 1) {
            this.figNum++;
            this.display();
            this.updateUI();
        }
    }

    /**
     * 更新插图导航界面
     */
    this.updateUI = function () {
        let pageNum = $(".mdx-figure-nav-title");

        pageNum.html("<span class='mdx-figure-page-num'>"
            + (this.figNum + 1) + "/" + VLOOK.doc.counter.figure + "</span> "
            + $("#vk-id-fig" + this.figNum + " > .mdx-caption-1").text());

        // 更新导航按钮位置
        this.buttons.prev.css("top", (this.ui.height() - this.buttons.prev.height()) / 2);
        this.buttons.next.css({
            "top" : this.buttons.prev.css("top"),
            "right" : "10px"
        });

        // 根据当前插图索引更新浏览按钮有效状态
        this.buttons.prev.css("opacity", "0");
        this.buttons.next.css("opacity", "0");
        if (this.figNum > 0) {
            this.buttons.prev.css("opacity", "1");
        }
        if (this.figNum < VLOOK.doc.counter.figure - 1) {
            this.buttons.next.css("opacity", "1");
        }
    }

    /**
     * 处理热键操作
     *
     * @param code 非功能键键
     * @param combKeys 功能组合键 Ctrl / Shift / Alt / Win / Cmd
     */
    this.disposeHotkey = function (code, combKeys) {
        if (iFigureNav.ui.isHidden())
            return;

        switch (code) {
            case 188: // <
            case 37: // ←
                this.prev();
                break;
            case 190: // >
            case 39: // →
                this.next();
                break;
            case 27: // ESC
                this.hide();
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
                    notDone = false;
                // 遍历下级无序列表的所有一级子元素内 checkbox 的 checked 状态
                $(this).children("li").each(function () {
                    // 只对有两个或以上的 checkbox 子元素，因为只有 1 个 checkbox 是无法判断是否为不确定选择
                    if (chkCount > 0 && $(this).find("input").attr("checked") === undefined) {
                        notDone = true;
                        return false;
                    }
                    chkCount++;
                });
                // 若下级无序列表的一级子元素中，有任意一个 checkbox 为未完成的，则视为不确定选择
                if (notDone === true)
                    li.children("input")[0].indeterminate = true;
            });
        });
    });

    // 对任务列表的 checkbox 组件转换为 SVG 图标
    $("#write input[type='checkbox']").each(function () {
        let chkStatus = "uncheck", // 默认为未完成
            chkStyle = "dark"; // 默认样式

        // 已完成
        let checked = $(this).attr("checked");
        if (checked !== undefined && checked.startsWith("c")) { // checked
            chkStatus = "checked";
            chkStyle = "btn";
        }
        // 部分完成（不确定选择）
        else if ($(this)[0].indeterminate === true) {
            chkStatus = "indeterminate";
            chkStyle = "btn";
        }

        // 替换为 SVG 图标
        $(this).before("<svg width='14px' height='14px' style='position: absolute; margin-top: 0.6em; display: inline-block; vertical-align: middle;'><use xlink:href='#icoCheckbox_"
            + chkStatus + "' class='mdx-svg-ico-" + chkStyle + "'/></svg>");
        $(this).remove();
    });
}

/**
 * 调整默认的 Mermaid 样式
 */
Restyler.forMermaid = function () {
    // 修正顺序图整体的样式
    $(".md-diagram-panel svg[id^='mermaidChart'][viewBox^='-']").each(function () {
        let target = $(this),
            viewBox = target.attr("viewBox").split(/\s+/),
            paddingBottom = (target.css("padding-bottom"));
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.attr("viewBox",
            viewBox[0] + " " + viewBox[1] + " " + viewBox[2] + " "
            + (parseInt(viewBox[3]) + parseInt(paddingBottom)));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        target.addClass("mdx-mermaid-restyler");
    });

    // 更新顺序图中的角色样式
    $(".md-diagram-panel svg[id^='mermaidChart'] > g > rect[class='actor']").each(function () {
        let actor = $(this),
            text = actor.next("text").children(), // actor text object
            tmpText = text.text(),
            prefix = "";
        const person = /@.+/g, // 人物角色
            keySys = /^\*\*.+/g, // 重要系统角色
            extSys = /^--.+/g; // 外部系统角色

        // 统一调整角色的圆角
        let radius = VLOOK.util.getStyleValue("--vlook-small-radius");
        actor.attr({
            "rx" : radius,
            "ry" : radius
        });

        // 更新 <人物角色> 样式
        if (person.test(tmpText) === true) {
            let h = actor.height(),
                line = actor.prev("line");
            actor.attr({
                "rx" : (h - 20) / 2,
                "ry" : (h - 20) / 2,
                "y" : parseInt(actor.attr("y")) + 10,
                "height" : h - 20
            });
            line.attr({
                "y1" : parseInt(line.attr("y1")) + 10,
                "y2" : parseInt(line.attr("y2")) - 20
            });
            actor.prev("line").addClass("mdx-actor-person");
            text.text(prefix + tmpText.substring(1, tmpText.length));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText) === true) {
            actor.addClass("mdx-actor-key-sys");
            actor.prev("line").addClass("mdx-actor-key-sys");
            actor.nextAll("text").children().addClass("mdx-actor-key-sys");
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText) === true) {
            // actor.css("stroke-dasharray", "5 2");
            actor.addClass("mdx-actor-ext-sys");
            // actor.prev("line").addClass("mdx-actor-ext-sys");
            actor.nextAll("text").children().addClass("mdx-actor-ext-sys");
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        else {
            text.text(prefix + tmpText);
        }
    });

    // 更新顺序图中消息序号的样式
    $(".md-diagram-panel svg[id^='mermaidChart'] > text.sequenceNumber").each(function () {
        // 移除文本宽度，避免不同字体大小时显示效果问题
        $(this).removeAttr("textLength");
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    $(".md-diagram-panel polygon+.labelText").each(function () {
        let fragment = $(this),
            g = fragment.parent();

        // 默认的样式（par 片断）
        let bgColor = "var(--mm-color-orange-light)",
            borderColor = "var(--mm-color-orange-light)",
            titleColor = "var(--mm-color-orange-light)",
            labelText = "var(--mm-color-orange-alt-light)";
        // 为 alt 片断设置样式
        if (fragment.text() === "alt") {
            bgColor = "var(--mm-color-red-light)";
            borderColor = "var(--mm-color-red-light)";
            titleColor = "var(--mm-color-red-light)";
            labelText = "var(--mm-color-red-alt-light)";
        }
        // 为 loop 片断设置样式
        else if (fragment.text() === "loop") {
            bgColor = "var(--mm-color-cyan-light)";
            borderColor = "var(--mm-color-cyan-light)";
            titleColor = "var(--mm-color-cyan-light)";
            labelText = "var(--mm-color-cyan-alt-light)";
        }

        // 为 alt、loop、par 片断应用样式设置
        if (fragment.text() !== "opt") {
            // 背景色
            g.find("polygon.labelBox").css("cssText", "fill: " + bgColor + " !important;");
            // 边框色
            g.find("line.loopLine").css("cssText", "stroke: " + borderColor + " !important;");
            // 片断类型名称颜色
            g.find("text.labelText").css("cssText", "fill:" + labelText + " !important;");
            g.find("text.labelText").css("cssText", "fill:" + labelText + " !important;");
            // 片断标题颜色
            g.find("text.loopText, text.loopText > tspan").css("cssText", "fill:" + titleColor + " !important;");
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (fragment.text() === "alt")
            fragment.text(["选择", "選擇", "Alt.", "Alt.", "Alt.", "Alt.", "Alt.", "代替", "대안"][VLOOK.lang.id]);
        else if (fragment.text() === "opt")
            fragment.text(["可选",  "可選", "Opt.", "Opt.", "Opt.", "Opt.", "Opt.", "ション", "매칭"][VLOOK.lang.id]);
        else if (fragment.text() === "loop")
            fragment.text(["循环", "循環", "Loop.", "Loop.", "Loop.", "Loop.", "Loop.", "ループ", "루프"][VLOOK.lang.id]);
        else if (fragment.text() === "par")
            fragment.text(["平行", "平行", "Par.", "Par.", "Par.", "Par.", "Par.", "平行", "평행"][VLOOK.lang.id]);
    });

    // 调整片断的标题文本
    $("text.loopText > tspan").each(function () {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(this);
        fragmentTitle.parent().attr("style", "text-anchor: start");

        // 调整文本的位置
        let label = fragmentTitle.parent().parent().find(".labelBox"),
            rect = label[0].getBBox();
            // y = parseInt(fragmentTitle.parent().attr("y"));
        fragmentTitle.attr("x", rect.x + rect.width + 10);

        let nextText = fragmentTitle.parent().next();
        if (nextText !== undefined && nextText.attr("class") !== undefined && nextText.attr("class").indexOf("loopText") > -1) {
            nextText.attr("x", rect.x + rect.width + 40);
        }
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态图节点、子图
    let radius = VLOOK.util.getStyleValue("--vlook-base-radius");
    $("#START rect, #END rect, g[id^=flowchart-START] rect, #INIT ~ g > rect, g[id^=flowchart-END] rect, g[id^=flowchart-INIT] ~ g > rect, .cluster rect, rect[class=rect]").each(function () {
        $(this).attr({
            "rx" : radius,
            "ry" : radius
        });
    });
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
 *
 * @param funcString 函数字符串，如：translate(-12,-18)
 * @param rate1 对第1个参数的调整倍数
 * @param rate2 对第2个参数的调整倍数
 */
RepairTool.scaleTupleByTimes = function (funcString, rate1, rate2) {
    let lbIndex = funcString.indexOf("("),
        dotIndex = funcString.indexOf(","),
        rbIndex = funcString.indexOf(")");

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
 * 获得获取对应样式的标识
 *
 * @param color 文档中指定的预置颜色值
 * @returns string 返回有效的的颜色值，未指定时默认为 gray
 */
CodeMagic.getStyle = function (color) {
    // 没有指定样式，则为默认样式
    if (color === undefined)
        return "gray";
    return color;
}

/**
 * 初始化
 */
CodeMagic.init = function () {
    $("code").each(function () {
        let codeText = $(this).text(),
            result;

        // 药丸标签格式
        if ((result = codeText.match(RainbowGroupTag.syntax)) != null)
            RainbowGroupTag.build($(this), result);
        // 彩虹单标签格式
        else if ((result = codeText.match(RainbowTag.syntax)) != null)
            RainbowTag.build($(this), result);
        // 文字注音格式
        else if ((result = codeText.match(TextPhonetic.syntax)) != null)
            TextPhonetic.build($(this), result);
        // 刮刮卡格式
        else if ((result = codeText.match(BlackCurtain.syntax)) != null)
            BlackCurtain.build($(this), result);
        // 彩虹引用
        else if ((result = codeText.match(RainbowQuote.syntax)) != null)
            RainbowQuote.build($(this), result);
        // 普通代码增加样式标识，以用于深色模式时的识别
        else
            $(this).addClass("mdx-std-code");
    });
}

// ==================== Code Magic：彩虹单标签模块 ==================== //

function RainbowTag() {}

// 语法：#tag#(color)
RainbowTag.syntax = /^#(.+)#(\((red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)\))?$/i;

/**
 * 构建单标签样式
 *
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowTag.build = function (target, result) {
    let tag = result[1],
        color = CodeMagic.getStyle(result[3]);

    // 过滤语法内容
    target.text(tag);
    target.attr("class", "mdx-tag " + color);
}

// ==================== Code Magic：药丸标签模块 ==================== //

function RainbowGroupTag() {}

// 语法：#tag1|tag2#(color)
RainbowGroupTag.syntax = /^#(.+)\|(.+)#(\((red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)\))?$/i;

/**
 * 构建药丸标签样式
 *
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowGroupTag.build = function (target, result) {
    let color = CodeMagic.getStyle(result[4]),
        tag1 = result[1],
        tag2 = result[2];

    // 左标签
    target.wrap("<code class='mdx-tag-name " + color + "'>" + tag1 + "</code>");
    // 右标签
    target.text(tag2);
    target.attr("class", "mdx-tag-value " + color);
}

// ==================== Code Magic：彩虹引用模块 ==================== //

function RainbowQuote() {}

// 语法：>(color)
RainbowQuote.syntax = /^>\((red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)\)$/i;

/**
 * 构建彩虹引用样式
 *
 * @param target 目标 code 对象
 * @param result code 内容与语法正则表达式匹配后的结果数组
 */
RainbowQuote.build = function (target, result) {
    let quote = target.parent().parent(),
        color = CodeMagic.getStyle(result[1]);
    if (quote.prop("tagName").toLowerCase().startsWith("bl")) { // <blockquote>
        target.parent().remove();
        quote.addClass("mdx-quote " + color);
        quote.children("h6").addClass("title-" + color);
    }
}

// ==================== Code Magic：文本注音模块 ==================== //

function TextPhonetic() {}

// 语法：{text}(symbol)
TextPhonetic.syntax = /^{(.+)}\((.+)\)$/i;

/**
 * 构建「注音」
 *
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
 *
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

// ==================== Code Magic：刮刮卡模块 ==================== //

function BlackCurtain() {}

// 语法：*{tips}(text "color")
BlackCurtain.syntax = /^\*{(.*)}\(([^"]+)(\s"(red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)")?\)$/;
///^\*{(.*)}\((\S+)(\s"(red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)")?\)$/i;

/**
 * 构建「刮刮卡」
 *
 * @param target 源对象
 * @param result 语法通过正则解析后的结果数组
 */
BlackCurtain.build = function (target, result) {
    let tips = " **** ",
        text = result[2],
        curtainColor = "var(--fore-color-alt)";

    // 自定义提示信息
    if (result[1] !== undefined && result[1] !== "")
        tips = result[1];
    // 自定义颜色
    if (result[4] !== undefined) {
        curtainColor = result[4];
        curtainColor = "var(--acc-color-" + curtainColor + "-light)";
    }

    // 初始化「刮刮卡」数据
    target.addClass("mdx-black-curtain");
    target.attr("data-vk-black-curtain-data", text);
    target.attr("data-vk-black-curtain-showed", "false");
    target.attr("title", [
        "点击查看有效的原始内容",
        "點擊查看有效的原始內容",
        "Click to view valid original content",
        "Cliquez pour afficher le contenu original valide",
        "Klicken Sie hier, um gültigen Originalinhalt anzuzeigen",
        "Haga clic para ver contenido original válido",
        "Нажмите, чтобы просмотреть действительный исходный контент",
        "クリックして有効なオリジナルコンテンツを表示",
        "유효한 원본 콘텐츠를 보려면 클릭하십시오."
        ][VLOOK.lang.id]);
    target.text(tips);
    target.css({
        "background" : __generateBg(tips.length, curtainColor),
        "border-color" : curtainColor
        });

    // 「刮刮卡」的点击事件
    target.unbind("click").click(function () {
        BlackCurtain.toggle($(this));
    });

    /**
     * 根据提示信息字数生成条纹背景
     *
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
                c = (i % 2 === 0) ? color : "var(--fore-color)";
            result += c + " " + start + "%, " + c + " " + end + "%"; // 分段渐变
            result += (i < count - 1) ? "," : ")";
        }
        return result;
    }
}

/**
 * 显示 / 隐藏「刮刮卡」的内容
 *
 * @param target 刮刮卡对象
 */
BlackCurtain.toggle = function (target) {
    event.stopPropagation(); // 停止事件冒泡

    if (target.attr("data-vk-black-curtain-showed").startsWith("f"))
        BlackCurtain.show(target);
    else
        BlackCurtain.hide(target);
}

/**
 * 显示「刮刮卡」的内容
 *
 * @param target 刮刮卡对象
 */
BlackCurtain.show = function (target) {
    let tmp = target.text();
    target.addClass("opened");
    target.css("color", target.css("border-color"));
    // 显示原始信息
    target.text(target.attr("data-vk-black-curtain-data"));
    // 「刮刮卡」自定义数据
    target.attr("data-vk-black-curtain-data", tmp);
    target.attr("data-vk-black-curtain-showed", "true")
}

/**
 * 隐藏「刮刮卡」的内容
 *
 * @param target 刮刮卡对象
 */
BlackCurtain.hide = function (target) {
    let tmp = target.text();
    target.removeClass("opened");
    target.css("color", "var(--doc-bg-color)");
    // 显示提示信息
    target.text(target.attr("data-vk-black-curtain-data"));
    // 「刮刮卡」自定义数据
    target.attr("data-vk-black-curtain-data", tmp);
    target.attr("data-vk-black-curtain-showed", "false");
}

// ==================== VLOOK UI 模块 ==================== //

function VLOOKui() {}

/**
 * 加载欢迎页资源
 */
VLOOKui.loadWelcomePage = function () {
    let ui = '',
        defalutContent = '<div>Don\'t worry, the best will always appear in the most casual time.</div>'
            + '<div>不要著急，最好的總會在最不經意的時候出現。</div>'
            + '<div>Keine Sorge, das Beste wird immer in der ungezwungensten Zeit erscheinen.</div>'
            + '<div>心配しないで、最高のものが常に最もカジュアルな時間に表示されます。</div>'
            + '<div>No te preocupes, lo mejor siempre aparecerá en el momento más casual.</div>'
            + '<div>걱정하지 마세요. 최고는 항상 가장 캐주얼 한 시간에 나타납니다.</div>'
            + '<div>Ne vous inquiétez pas, le meilleur apparaîtra toujours au moment le plus décontracté.</div>'
            + '<div>Не волнуйтесь, лучшее всегда будет появляться в самое случайное время.<br><br>:</div>',
        metaContent = VLOOK.util.getMetaByName("vlook-welcome");

    // 无指定欢迎页内容，则使用默认内容
    if (metaContent === undefined)
        metaContent = defalutContent;
    // --------------------------------------------------
    // 欢迎页
    ui += '<div class="mdx-welcome-page">'
        // 文档专属图标
        + '<div class="mdx-doc-logo-light"></div><div class="mdx-doc-logo-dark"></div>'
        // 欢迎信息
        + '<div class="mdx-welcome-page-tips">'
        + metaContent.trim()
        + '</div>'
        // 文档加载进度及进入按钮
        + '<div class="mdx-welcome-page-loading">Loading...</div>'
        + '</div>';
    return ui;
}

/**
 * 加载图标集资源
 */
VLOOKui.loadIconSet = function () {
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
 * 加载文档导航工具 UI 资源
 */
VLOOKui.loadNavTools = function () {
    let ui = '';
    // --------------------------------------------------
    // 导航中心
    ui += '<div class="mdx-nav-center mdx-float-card">'
            // --- 导航中心头部 ---
            + '<div class="mdx-nav-center-header">'
                // 关键字搜索
                + '<div class="mdx-search-by-keyword"></div>'
                // 分段控制器组件
                + '<div class="mdx-segment toc"></div>'
            // 访问历史标题
            + '<div class="mdx-toc-history-title">访问历史</div>'
            + '</div>'
            // --- 导航中心内容区 ---
            + '<div class="mdx-nav-center-body">'
                + '<div class="mdx-toc-catalog-body" data-vk-catalog-empty="( Catalog is Empty )"></div>'
                + '<div class="mdx-toc-filter-result catalog"></div>'
                + '<div class="mdx-toc-filter-result figure"></div>'
                + '<div class="mdx-toc-filter-result table"></div>'
                + '<div class="mdx-toc-filter-result media"></div>'
                + '<div class="mdx-toc-filter-result codeblock"></div>'
                + '<div class="mdx-toc-history-result"></div>'
            + '</div>'
            + '<div class="mdx-nav-center-footer"></div>'
            // 文库
            + '<div class="mdx-doc-lib-board">'
                + '<div class="mdx-doc-lib-board item"></div>'
                + '<div class="mdx-doc-lib-board flip"></div>'
                + '<div class="mdx-doc-lib-board flip"></div>'
                + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 导航中心收起/展开引导把手
    ui += '<div class="mdx-toc-handle"></div>';

    // --------------------------------------------------
    // 逐章导航栏
    ui += '<div class="mdx-chapter-nav mdx-focus-search">'
            // 上一章
            + '<div class="mdx-chapter-nav-prev">'
                + VLOOK.ui.generateSvgIcon("icoPrevChapter", 10, 15, "light", "position: absolute; top: 18px; left: 10px;")
            + '<div class="mdx-chapter-nav-prev-text"></div>'
            + '</div>'
            // 文档标题
            + '<div class="mdx-chapter-nav-doc-title">Document title</div>'
            // 当前章节
            + '<div class="mdx-chapter-nav-current"></div>'
            // 下一章
            + '<div class="mdx-chapter-nav-next">'
                + '<div class="mdx-chapter-nav-next-text">next</div>'
                    + VLOOK.ui.generateSvgIcon("icoNextChapter", 10, 15, "light", "position: absolute; top: 18px; right: 10px;")
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 插图导航面板
    ui += '<div class="mdx-figure-nav mdx-backdrop-blurs">'
            + '<div class="mdx-figure-content"></div>'
            + '<div class="mdx-figure-nav-title"></div>'
            + '<div class="mdx-figure-nav-btns prev">'
                + VLOOK.ui.generateSvgIcon("icoPrevFig", 12, 54, "light")
            + '</div>'
            + '<div class="mdx-figure-nav-btns next">'
                + VLOOK.ui.generateSvgIcon("icoNextFig", 12, 54, "light")
            + '</div>'
            + '<div class="mdx-btn-close-figure-nav">'
                + VLOOK.ui.generateSvgIcon("icoClose", 16, 16, "light")
            + '</div>'
            + VLOOK.ui.copyrightInfo()
        + '</div>';
    return ui;
}

/**
 * 加载工具栏 UI 资源
 */
VLOOKui.loadToolbar = function () {
    let ui = '';
        // --------------------------------------------------
    // 页面工具栏
    ui += '<div class="mdx-toolbar mdx-focus-search">'
            // 导航中心
            + '<div class="mdx-btn outline">'
                + VLOOK.ui.generateSvgIcon("icoNavCenter", 20, 20, "light")
            + '</div>'
            // 打印
            + '<div class="mdx-btn print">'
                + VLOOK.ui.generateSvgIcon("icoPrint", 20, 19, "light")
            + '</div>'
            + '<div class="mdx-btn-group prs">'
                // 段落导航
                + '<div data-vk-btn-group="prs" class="mdx-btn paragraph-nav">'
                    + VLOOK.ui.generateSvgIcon("icoParagraphNav", 20, 20, "light")
                + '</div>'
                // 聚光灯
                + '<div data-vk-btn-group="prs" class="mdx-btn spotlight">'
                    + VLOOK.ui.generateSvgIcon("icoSpotlight", 18, 20, "light")
                + '</div>'
                // 激光笔
                + '<div data-vk-btn-group="prs" class="mdx-btn laser-pointer">'
                    + VLOOK.ui.generateSvgIcon("icoLaserPointer", 18, 20, "light")
                + '</div>'
            + '</div>'
            // 分隔符
            + '<div class="mdx-toolbar-spliter"></div>'
            // Light/Dark模式
            + '<div class="mdx-btn color-scheme">'
                + VLOOK.ui.generateSvgIcon("icoDarkMode", 18, 18, "light")
            + '</div>'
            // 字体风格
            + '<div class="mdx-btn font-style">'
                + VLOOK.ui.generateSvgIcon("icoFont", 20, 18, "light")
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 聚光灯
    ui += '<div class="mdx-spotlight"><div></div></div>';

    // --------------------------------------------------
    // 字体风格选择器
    ui += '<div class="mdx-font-styler">'
            + '<div style="float: left; margin-bottom: 30px;">'
                + '<img alt="小清新" class="mdx-fontstyle-sans" src="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-sans.png" srcset="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-sans@2x.png 2x">'
                + '<div class="mdx-fontinfo-sans"><span class="mdx-font-package">Font Package - </span><span id="fontset-sans-status">Loading... 0%</span></div>'
            + '</div>'
            + '<div style="float: right; margin-bottom: 30px;">'
                + '<img alt="文艺范" class="mdx-fontstyle-serif" src="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-serif.png" srcset="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOKres@master/pic/fs-serif@2x.png 2x">'
                + '<div class="mdx-fontinfo-serif"><span class="mdx-font-package">Font Package - </span><span id="fontset-serif-status">Loading... 0%</span></div>'
            + '</div>'
            + '<div class="mdx-font-styler-info">Download Font Package</div>'
        + '</div>';
    return ui;
}

/**
 * 加载共用的 UI 资源
 */
VLOOKui.loadCommon = function () {
    let ui = '';
    // --------------------------------------------------
    // 脚注弹层
    ui += '<div class="mdx-foot-note-panel">'
            + '<div class="mdx-foot-note-panel-content"></div>'
            + '<div class="mdx-foot-note-panel-header"></div>'
            + '<div class="mdx-foot-note-panel-all"><a>查看所有脚注</a></div>'
            + '<a id="vk-footer-area"></a>'
        + '</div>';

    // --------------------------------------------------
    // 复制代码块内容的按钮
    ui += '<div class="mdx-content-assistor mdx-float-card">'
            + '<div class="mdx-btn assistor open-in-figure-nav">'
                + VLOOK.ui.generateSvgIcon("icoOpenInFigureNav", 16, 14, "light")
            + '</div>'
            + '<div class="mdx-btn assistor table-cross">'
                + VLOOK.ui.generateSvgIcon("icoTableCross", 16, 14, "light")
            + '</div>'
            + '<div class="mdx-btn assistor copy-code-block">'
                + VLOOK.ui.generateSvgIcon("icoCopyCodeBlock", 16, 16, "light")
            + '</div>'
            + '<div class="mdx-btn assistor pic-in-pic">'
                + VLOOK.ui.generateSvgIcon("icoPicInPic", 16, 14, "light")
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 画中画容器
    ui += '<div class="mdx-pic-in-pic">'
            + '<div class="mdx-pip-btn mdx-zoom zoom-out mdx-float-card">'
                + VLOOK.ui.generateSvgIcon("icoZoomIn", 16, 16, "theme")
            + '</div>'
            + '<div class="mdx-pip-btn mdx-close zoom-out mdx-float-card">'
                + VLOOK.ui.generateSvgIcon("icoResetInput", 16, 16, "theme")
            + '</div>'
            + '<div class="mdx-content">'
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 提示信息
    ui += '<div class="mdx-tool-tips"></div>'
        + '<div class="mdx-info-tips mdx-float-card"></div>';

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += '<div class="mdx-more-doc-content-before"></div>'
        + '<div class="mdx-more-doc-content-after"></div>';

    // --------------------------------------------------
    // 表格阅读模式（十字光标）
    ui += '<div data-vk-direction="left" class="mdx-table-cross left">&nbsp;</div>'
        + '<div data-vk-direction="right" class="mdx-table-cross right">&nbsp;</div>'
        + '<div data-vk-direction="up" class="mdx-table-cross up">&nbsp;</div>'
        + '<div data-vk-direction="down" class="mdx-table-cross down">&nbsp;</div>';

    // --------------------------------------------------
    // 内容展开操作区
    ui += '<div class="mdx-content-expander">'
            + '<div class="mdx-btn">'
            + '<span></span>'
                + VLOOK.ui.generateSvgIcon("icoExtend", 20, 20, "light")
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += '<div class="mdx-link-error-list mdx-float-card">'
            + '<div class="mdx-link-error-list-header"></div>'
            + '<div class="mdx-link-error-list-body"><div class="mdx-link-error-list-items"></div></div>'
            + '<div class="mdx-link-error-list-footer"></div>'
        + '</div>'
        + '<div class="mdx-status-bar' + (VLOOK.type === "mini" ? " mini" : "") + ' mdx-float-card mdx-backdrop-blurs mdx-focus-search">'
            + '<div class="mdx-doc-info">- - / - -</div>'
            + '<div class="mdx-link-chk-result">'
                + VLOOK.ui.generateSvgIcon("icoLinkOK", 20, 18, "light")
            + '</div>'
        + '</div>';

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += '<iframe name="vlook-stat-gitee" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"></iframe>';
    ui += '<div class="mdx-doc-lib mdx-float-card"><iframe name="vlook-doc-lib"></iframe></div>';
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
    VLOOK.params.init();

    // 判断加载模式
    if (VLOOK.util.getParamValue("type") === "mini") {
        VLOOK.type = "mini";
        VLOOK.data.set("doc-lib-title", $(document).attr("title"));
    }

    // ----------------------------------------
    console.info("- Ready");
    gDocLoadTimeCost = iStopwatch.lapStop("    ");
    // 打印环境信息
    env.print();

    iStopwatch.lapStart();
    console.info("=== Load VLOOK ===");

    // ----------------------------------------
    // 初始化语言
    VLOOK.lang.init();

    // ----------------------------------------
    // 加载生成 VLOOK 界面
    loadVLOOKui();

    // ----------------------------------------
    // 动效初始化
    iStopwatch.lapStart("* Effect");
    let effects = VLOOK.util.getParamValue("effects");
    VLOOK.ui.effects = (effects === undefined) ? 2 : parseInt(effects);
    VLOOK.ui.effects = env.device.mobile ? 0 : VLOOK.ui.effects;
    console.log("    └ Level [ " + VLOOK.ui.effects + " ]");
    VLOOK.ui.initEffects();
    iStopwatch.lapStop("    COST ");

    // 先隐藏文档原始内容，减少页面重绘
    VOM.doc().hide();

    // ----------------------------------------
    // 初始化欢迎页
    iStopwatch.lapStart("* Welcome Page Init");
    let wsMode = VLOOK.util.getParamValue("ws");
    wsMode = (wsMode === undefined) ? "auto" : wsMode;
    console.log("    └ mode: " + wsMode);
    iWelcomePage = new WelcomePage(wsMode);
    if (iWelcomePage === false)
        alert("Instantiation failed [ iWelcomePage ]");

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (VLOOK.checkSpecification() === false) {
        $(".mdx-welcome-page").hide();
        $(".mdx-toolbar").hide();
        $(".mdx-btn").hide();
        return;
    }
    iStopwatch.lapStop("    COST ");

    // ----------------------------------------
    // 初始化关键组件实例
    iStopwatch.lapStart("* Intance");
    VLOOK.initIntance();
    iStopwatch.lapStop("    COST ");

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
    console.log("!!! ALL FONT READY !!!");
});

/**
 * 加载 VLOOK UI 资源
 */
function loadVLOOKui() {
    $(".mdx-vlook-inside").after(VLOOKui.loadWelcomePage()
        + VLOOKui.loadIconSet()
        + VLOOKui.loadNavTools()
        + VLOOKui.loadToolbar()
        + VLOOKui.loadCommon());
}

/**
 * 加载 VLOOK 插件
 */
function loadVLOOKplugin() {
    // ----------------------------------------
    // 推荐的浏览器类型检测
    iStopwatch.lapStart("* Browser Check");
    if (env.browser.Chrome === false && env.browser.Firefox === false && env.browser.Safari === false) {
        VLOOK.report.push(['Error', 'Browser', navigator.userAgent, ]);
        alert([
            "为获得最佳兼容性，建议使用 Chrome / Edge / Firefox 浏览器",
            "為獲得最佳兼容性，建議使用 Chrome / Edge / Firefox 瀏覽器",
            "For best compatibility, it is recommended to use Chrome / Edge / Firefox browser",
            "Pour une meilleure compatibilité, il est recommandé d'utiliser le navigateur Chrome / Edge / Firefox",
            "Für eine optimale Kompatibilität wird empfohlen, den Chrome / Edge / Firefox-Browser zu verwenden",
            "Para una mejor compatibilidad, se recomienda utilizar el navegador Chrome / Edge / Firefox",
            "Для лучшей совместимости рекомендуется использовать браузер Chrome / Edge / Firefox.",
            "最高の互換性のために、Chrome / Edge / Firefoxブラウザを使用することをお勧めします",
            "최상의 호환성을 위해 Chrome / Edge / Firefox 브라우저를 사용하는 것이 좋습니다."
        ][VLOOK.lang.id]);
    }

    iStopwatch.lapStop("    ");

    // ========================================
    // 初始化 VLOOK 核心模块
    VLOOK.initKernel();

    // ----------------------------------------
    // 段落导航初始化
    __forkThread("Paragraph Nav", function () {
        ParagraphNav.init();
    }, 100);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.lapStart("* Write Ready");
    VOM.doc().addClass("mdx-vlook-load-done mdx-focus-search");
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化外部链接
    __forkThread("External Link", function () {
        VLOOK.doc.link.adjustExternal();
    }, 100);

    // ----------------------------------------
    // 初始化全局热键
    __forkThread("Hotkey", function () {
        VLOOK.ui.initHotkey();
    }, 150);

    // ----------------------------------------
    // 初始化须在页面 body 显示后才能执行的部分
    __forkThread("Restyle", function () {
        VLOOK.initRestyle();
    }, 200);

    // ----------------------------------------
    // 检查页内链接坏链
    __forkThread("Check Hash Link", function () {
        iLinkChecker.checkLink();
    }, 250);

    // ----------------------------------------
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    __forkThread("Color Scheme", function () {
        ColorScheme.scheme = VLOOK.util.getStyleValue("--vlook-color-scheme").trim();
        console.info("    System [ " + ColorScheme.scheme + " ]");
        ColorScheme.init();
        // 判断当前文档是否强制指定了颜色方案
        let colorScheme = VLOOK.util.getParamValue("cs");
        if (colorScheme === "light" || colorScheme === "dark") {
            console.info("    Force use [ " + colorScheme + " ]");
            ColorScheme.toggle(colorScheme);
        }
        // 若系统当前颜色方案是 dark，则强制同步
        else if (ColorScheme.scheme === "dark")
            ColorScheme.toggle(ColorScheme.scheme);
    }, 300);

    // ----------------------------------------
    // 提交统计数据
    __forkThread("Push Stat", function () {
        VLOOK.report.submit(gTotalLoadTimeCost - gDocLoadTimeCost);
        VLOOK.report.push(['DocLoadTime', 'All', 'Times', gDocLoadTimeCost]);
        VLOOK.report.push(['VlookLoadTime', 'All', 'Times', gTotalLoadTimeCost - gDocLoadTimeCost]);
    }, 350);

    // ----------------------------------------
    // 初始化内容助手
    // 须隐藏文档原始内容前执行，避免部分样式失效
    __forkThread("Content Assistor", function () {
        iContentAssistor.init();
        PicInPic.init();
    }, 400);

    // ----------------------------------------
    // URL 带锚点的处理
    __forkThread("Redirect to Hash", function () {
        let redirect = VLOOK.util.redirectToHash();
        if (VOM.cover() === undefined && redirect === false) {
            iNavCenter.catalog.currentHeaderIndex = 0;
            VLOOK.ui.adjustAll();
        }
    }, 450);

    // ----------------------------------------
    // 字数统计
    __forkThread("Words count", function () {
        __countWord();
    }, 500);

    // ----------------------------------------
    // 更新欢迎页
    iStopwatch.lapStart();
    console.info("* Welcome Page Done (" + iWelcomePage.mode + ")");
    iWelcomePage.done();
    iStopwatch.lapStop("    COST ");

    // ----------------------------------------
    // VLOOK 加载完成
    gTotalLoadTimeCost = iStopwatch.stop() - 200;
    console.info("=== !!! MAIN PROCESS DONE !!! ===");
    console.info("TOTAL COST   ⏱ " + gTotalLoadTimeCost + " ms");
    console.info("    ├ HTML   ⏱ " + gDocLoadTimeCost + " ms");
    console.info("    └ VLOOK  ⏱ " + (gTotalLoadTimeCost - gDocLoadTimeCost) + " ms");

    /**
     * 创建独立线程执行
     *
     * @param msg 线程信息
     * @param callback 线程执行的回调函数
     * @param delay 0 - 立即时间，>0 - 延时执行（毫秒）
     */
    function __forkThread(msg, callback, delay) {
        setTimeout(function () {
            let stopwatch = new Stopwatch();
            stopwatch.lapStart("* thread * [" + msg + "]");
            typeof(callback) === "function" && callback();
            stopwatch.lapStop("    ");
        }, delay);
    }

    /**
     * 统计字数
     */
    function __countWord() {
        let latin = VOM.doc().text().match(/[\w\-]+/g),
            cjk = VOM.doc().text().match(/\p{Unified_Ideograph}/ug),
            docInfo = $(".mdx-doc-info");
        let latinCount = (latin == null) ? 0 : latin.length,
            cjkCount = (cjk == null) ? 0 : cjk.length,
            wordCount = latinCount + cjkCount,
            readCountPerMin = 120;

        // 计算阅读时长
        let mins = wordCount < readCountPerMin ? 1 : parseInt(wordCount / readCountPerMin),
            times = mins + " " + ["分钟", "分鐘", "minutes", "minutes", "minute", "minutos", "минута", "分", "분."][VLOOK.lang.id];
        if (mins > 60)
            times = (mins / 60).toFixed(1) + " " + ["小时", "小時", "hours", "heures", "stunden", "horas", "час", "時間", "시간."][VLOOK.lang.id];
        // 默认信息
        docInfo.attr("data-vk-default",
            times + " / " + VLOOK.formatting.thousands(wordCount.toString()) + " "
            + ["字", "字", "words", "mots", "Wörter", "palabras", "слова", "言葉", "말"][VLOOK.lang.id]);
        // 扩展信息
        docInfo.attr("data-vk-extend",
            " ( " + VLOOK.formatting.thousands(cjkCount.toString()) + " " + ["中日韩，", "中日韓，", "CJK, ", "CJK, ", "CJK, ", "CJK, ", "CJK, ", "CJK，", "CJK, "][VLOOK.lang.id]
            + VLOOK.formatting.thousands(latinCount.toString()) + " " + ["非中日韩", "非中日韓", "Non-CJK", "Non CJC", "Nicht-CJK", "No CJK", "Не-CJK", "非CJK", "비 CJK"][VLOOK.lang.id] + " )");
        // hover 时显示扩展信息
        docInfo.hover(function () {
            docInfo.html(docInfo.attr("data-vk-default") + " <span style='color: var(--fore-color-alt)'>" + docInfo.attr("data-vk-extend") + "</span>");
        }, function () {
            docInfo.html(docInfo.attr("data-vk-default"));
        });
        docInfo.html(docInfo.attr("data-vk-default"));
    }
}
