/**************************************
 *
 * VLOOK.js - Typora Plugin
 *
 * V10.1
 * 2021-03-19
 * powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 *
 *************************************/

/***************************************

URL 参数说明

ws
    欢迎屏模式。默认完成加载后自动关闭
    取值范围：
    none: 不显示，wait: 显示，加载完成后需手动关闭

cs
    强制指定颜色方案。
    取值范围：light，dark

fix-mermaid
    是否启用修正 Mermaid 的渲染 bug。默认启用。
    取值范围：
    false: 取消修正

reset
    重置指定数据。
    取值范围：
    true: 本地缓存的用户数据

srcset
    在 DPR > 1 时，自动将 src 直接指定 2x 图片
    取值范围：
    auto：对于没有指定 srcset 时，自动将当前图片作为 2x 资源

effect
    使用的特效等级。可指定为：
    （未完成，忽略）

theme
    动态加载指定的主题（在线版本）
    主题名称中的关键名称，如：hope, geek 等

**************************************/

let vlookVersion = "V10.1";

console.log(":::::::::::::::::::");
console.log("!!! " + (vlookDevMode === true ? "- DEBUG -" : "RELEASED" ) + " !!!");
console.log("::: " + vlookVersion + " :::");
console.log(":::::::::::::::::::");

// 初始化计时器
let iStopwatch = new Stopwatch(),
    gDocLoadTimeCost = 0,
    gTotalLoadTimeCost = 0;
iStopwatch.lapStart();
console.info("=== Load Document ===");

// UI 元素
let iToolbar = undefined,
    iOutlineNav = undefined,
    iChapterNav = undefined,
    iParagraphNav = undefined,
    iMoreDocContent = undefined,
    iSpotlight = undefined,
    iFontStyler = undefined,
    iFigureViewer = undefined,
    iWelcomeScreen = undefined,
    iToolTips = undefined,
    iInfoTips = undefined,
    iBottomTips = undefined,
    iMask = undefined,
    iFootNote = undefined,
    iContentFolding = undefined;
    iLinkChecker = undefined;

// ==================== 文档对象模型 ==================== //

function DOM() {}

// 文档的 html 对象
DOM._html = undefined;
DOM.html = function () {
    if (DOM._html === undefined) {
        DOM._html = $("html");
        if (DOM._html.length === 0)
            console.error("Instantiation failed [ DOM.html ]");
    }
    return DOM._html;
}

// 文档的 body 对象
DOM._body = undefined;
DOM.body = function () {
    if (DOM._body === undefined) {
        DOM._body = $("body");
        if (DOM._body.length === 0)
            console.error("Instantiation failed [ DOM.body ]");
    }
    return DOM._body;
}

// ==================== VLOOK 对象模型 ==================== //

function VOM() {}

// Markdown 导出为 HTML 的内容对象
VOM._doc = undefined;
VOM.doc = function () {
    if (VOM._doc === undefined) {
        VOM._doc = $("#write");
        if (VOM._doc.length === 0)
            console.error("Instantiation failed [ VOM.doc ]");
    }
    return VOM._doc;
}

// 封面对象
VOM._cover = undefined;
VOM.cover = function () {
    if (VOM._cover === undefined) {
        VOM._cover = $("#write > h6:first-child");
        if (VOM._cover.length === 0)
            console.error("Instantiation failed [ VOM.cover ]");
    }
    return VOM._cover;
}

// 封面对象
VOM._backcover = undefined;
VOM.backcover = function () {
    if (VOM._backcover === undefined) {
        VOM._backcover = $("#write > h6:last-child"); // 封底已调整到脚注后的情况
        if (VOM._backcover.length === 0) {
            VOM._backcover = $("#write > h6:last-of-type"); // 封底未调整到脚注后的情况
            if (VOM._backcover.length === 0)
                console.error("Instantiation failed [ VOM.backcover ]");
        }
    }
    return VOM._backcover;
}

// ==================== 通用方法 ==================== //

/**
 * 检查是否为空对象
 */
$.prototype.isEmpty = function () {
    return (typeof (this) == "undefined");
}

/**
 * 判断对象是否为可视
 */
$.prototype.isVisible = function () {
    return this !== undefined && this.css("visibility") === "visible";
}

/**
 * 判断对象是否已显示
 */
$.prototype.isHidden = function () {
    return this !== undefined && this.css("display") === "none";
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
     * @param slient 是否为静默模式，静默模式只反馈环境信息值，不打印到控制台
     * @return 返回环境信息值
     */
    print : function (slient) {
        let info = "::: Environmental :::\n",
            fullInfo = info;
        if (!slient) console.log(info);

        info = "    ├ Language [ "
            + env.language.base
            + (env.language.subset.length > 0 ? "_" + env.language.subset : "")
            + " ]\n";
        fullInfo += info;
        if (!slient) console.log(info);

        info = "    ├ Device   [ "
            + (env.device.mobile ? "Mobile" : "")
            + (env.device.iOS ? "/iOS" : "")
            + (env.device.android ? "/Android" : "")
            + (env.device.iPhone ? "/iPhone" : "")
            + (env.device.iPad ? "/iPad" : "")
            + "]\n";
        fullInfo += info;
        if (!slient) console.log(info);

        info = "    ├ OS       " +
            (env.os.macOS ? "[ macOS ]"
                : (env.os.Windows ? "[ Windows ]"
                    : (env.os.iOS ? "[ iOS ]"
                        : (env.os.Linux ? "[Linux]" : "[Others]"))))
            + "\n";
        fullInfo += info;
        if (!slient) console.log(info);

        info = "    ├ Browser  [ "
            + (env.browser.Chrome ? "Chrome / " + env.browserVersion.Chrome : "")
            + (env.browser.Firefox ? " Firefox / " + env.browserVersion.Firefox : "")
            + (env.browser.Safari ? " Safari / " + env.browserVersion.Safari : "")
            + (env.browser.Edge ? " Edge / " + env.browserVersion.Edge : "")
            + " ]\n";
        fullInfo += info;
        if (!slient) console.log(info);

        info = "    ├ Core     [ "
            + (env.core.gecko ? "Gecko" : "")
            + (env.core.presto ? "Presto" : "")
            + (env.core.trident ? "Trident" : "")
            + (env.core.webkit ? "WebKit" : "")
            + " ]\n";
        fullInfo += info;
        if (!slient) console.log(info);

        info = "    └ DPR      [ "
            + env.display.DPR
            + " ]\n"; // Device Pixel Ratio
        fullInfo += info;
        if (!slient) console.log(info);

        info = navigator.userAgent + "\n";
        fullInfo += info;
        if (!slient) console.log(info);

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
        alert(info);
    }
};

// ==================== VLOOK 关键信息类 ==================== //

function VLOOK() {}

// 版本信息
VLOOK.version = vlookVersion;

// 是否为开发模式
VLOOK.debugMode = vlookDebugMode;

/**
 * 在 debug 模式下输出调试信息
 */
VLOOK.debug = function (...info) {
    if (VLOOK.debugMode === true)
        console.warn(...info);
}

/**
 * 工具
 */
VLOOK.util = {
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
     * 重定位至锚点
     */
    redirectToHash : function () {
        // 如果 URL 带锚点
        if (window.location.hash.trim() !== "") {
            window.location.href = window.location.hash;
            // 模拟等待页面完成跳转后，再进行大纲面板布局自适应处理
            VLOOK.ui.adjustAllDelay(true);
        }
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
     * @param target 需要进行格式化的目标字符串
     * @return 格式化后的字符串
     */
    thousands : function (target) {
        return target.replace(/(\d)(?=(\d{3})+(\.\d+)*(\D)*$)/g, "$1,");
    },

    /**
     * 对小数部分进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @return 格式化后的字符串
     */
    decimal : function (target) {
        return target.replace(/\.(\d+)/, ".<span class='mdx-table-column-format-number-decimal'>$1</span>");
    },

    /**
     * 对百分号进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @return 格式化后的字符串
     */
    percent : function (target) {
        return target.replace(/%</, "<span class='mdx-table-column-format-percent'> %</span><");
    },

    /**
     * 对货币符号进行格式化
     *
     * @param target 需要进行格式化的目标字符串
     * @return 格式化后的字符串
     */
    currency : function (target) {
        // 因 html() 中含有 > 字符，所以替换的内容中须进行 > 的前后拼接调整
        return target.replace(/(>.{1,3}\s)/, "><span class='mdx-table-column-format-currency'$1</span>");
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

    // 缺少封面
    if (VOM.cover().length === 0) {
        missContent += [
            "• 缺少符合 VLOOK 规范的「封面」内容\n",
            "• 缺少符合 VLOOK 規範的「封面」內容\n",
            "• Missing \"Cover\" content that meets VLOOK specifications\n",
            "• Contenu de \"Couverture\" manquant conforme aux spécifications VLOOK\n",
            "• Fehlender \"Cover\" -Inhalt, der den VLOOK-Spezifikationen entspricht\n",
            "• Falta contenido de \"Portada\" que cumpla con las especificaciones de VLOOK\n",
            "• Отсутствует содержание \"обложки\", соответствующее спецификациям VLOOK\n",
            "• VLOOK 仕様を満たす「カバー」コンテンツがありません\n",
            "• VVLOOK 사양을 충족하는 \"커버\" 컨텐츠가 없습니다\n"
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

    // 缺少封底（有文档脚注时）
    if ($(".footnotes-area").length === 0) {
        if (VOM.backcover().length === 0) {
            missContent += [
                "• 缺少符合 VLOOK 规范的「封底」内容\n",
                "• 缺少符合 VLOOK 規範的「封底」內容\n",
                "• Missing \"Back cover\" content that meets VLOOK specifications\n",
                "• Contenu manquant \"Couverture arrière\" conforme aux spécifications VLOOK\n",
                "• Fehlender \"Back Cover\" -Inhalt, der den VLOOK-Spezifikationen entspricht\n",
                "• Falta contenido de \"Contraportada\" que cumpla con las especificaciones de VLOOK\n",
                "• Отсутствует содержимое \"задней обложки\", которое соответствует спецификациям VLOOK\n",
                "• VLOOK 仕様を満たす「裏表紙」のコンテンツがありません\n",
                "• VLOOK 사양을 충족하는 \"뒷 표지\" 내용이 없습니다\n"
                ][VLOOK.lang.id];
            valid = false;
        }
    }
    //（无文档脚注时）
    else {
        if (VOM.doc().children("h6:nth-last-child(2)").length === 0) {
            missContent += [
                "• 缺少符合 VLOOK 规范的「封底」内容\n",
                "• 缺少符合 VLOOK 規範的「封底」內容\n",
                "• Missing \"Back cover\" content that meets VLOOK specifications\n",
                "• Contenu manquant \"Couverture arrière\" conforme aux spécifications VLOOK\n",
                "• Fehlender \"Back Cover\" -Inhalt, der den VLOOK-Spezifikationen entspricht\n",
                "• Falta contenido de \"Contraportada\" que cumpla con las especificaciones de VLOOK\n",
                "• Отсутствует содержимое \"задней обложки\", которое соответствует спецификациям VLOOK\n",
                "• VLOOK仕様を満たす「裏表紙」のコンテンツがありません\n",
                "• VLOOK 사양을 충족하는 \"뒷 표지\" 내용이 없습니다\n"
                ][VLOOK.lang.id];
            valid = false;
        }
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
VLOOK.initIntance = function (newTab) {
    VLOOK.doc.newTab = newTab;

    iFontStyler = new FontStyler(new BackgroundMask());
    if (iFontStyler === false)
        alert("Instantiation failed [ iFontStyler ]");
    else
        iFontStyler.init(); // 初始化

    // ==================== UI --------------------

    // 聚光灯
    iSpotlight = new Spotlight(180);
    if (iSpotlight === false)
        alert("Instantiation failed [ iSpotlight ]");

    // 长内容折叠
    iContentFolding = new ContentFolding();
    if (iContentFolding.length === 0)
        alert("Instantiation failed [ iContentFolding ]");

    // 大纲导航
    iOutlineNav = new OutlineNav(new BackgroundMask());
    if (iOutlineNav === false)
        alert("Instantiation failed [ iOutlineNav ]");

    // 逐章导航
    iChapterNav = new ChapterNav(iOutlineNav);
    if (iChapterNav === false)
        alert("Instantiation failed [ iChapterNav ]");
    else {
        // hover 事件处理
        iChapterNav.prev.ui.hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // hover 事件处理
        iChapterNav.current.ui.hover(function () {
            iToolTips.show($(this), "center");
        }, function () {
            iToolTips.hide();
        });

        // hover 事件处理
        iChapterNav.next.ui.hover(function () {
            iToolTips.show($(this), "right");
        }, function () {
            iToolTips.hide();
        });

        // 添加关联组件
        iOutlineNav.chapterNav = iChapterNav;
    }

    // 逐段导航初始化
    ParagraphNav.init();

    // 文档更多内容栏遮罩栏
    iMoreDocContent = new MoreDocContent();
    if (iMoreDocContent === false)
        alert("Instantiation failed [ iMoreDocContent ]");

    // 工具栏
    iToolbar = new Toolbar(iOutlineNav, iChapterNav);
    if (iToolbar === false)
        alert("Instantiation failed [ iToolbar ]");
    else {
        // 大纲按钮
        iToolbar.add("outline", $(".mdx-btn-outline"));
        iToolbar.buttons["outline"].unbind("click").click(function () {
            iToolTips.hide();
            iOutlineNav.toggle();
        });
        // hover 事件处理
        iToolbar.buttons["outline"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 插图导航按钮
        iToolbar.add("figure-viewer", $(".mdx-btn-figure-viewer"));
        iToolbar.buttons["figure-viewer"].unbind("click").click(function () {
            iToolTips.hide();
            iFigureViewer.show(null);
        });
        // hover 事件处理
        iToolbar.buttons["figure-viewer"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 颜色方案（Light/Dark）
        iToolbar.add("color-scheme", $(".mdx-btn-color-scheme"));
        iToolbar.buttons["color-scheme"].unbind("click").click(function () {
            iToolTips.hide();
            ColorScheme.toggle();
        });
        iToolbar.buttons["color-scheme"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 字体风格
        iToolbar.add("font-style", $(".mdx-btn-font-style"));
        iToolbar.buttons["font-style"].unbind("click").click(function () {
            iToolTips.hide();
            iFontStyler.toggle();
        });
        // hover 事件处理
        iToolbar.buttons["font-style"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 聚光灯
        iToolbar.add("spotlight", $(".mdx-btn-spotlight"));
        iToolbar.buttons["spotlight"].unbind("click").click(function () {
            iToolTips.hide();
            iSpotlight.toggle();
        });
        iToolbar.buttons["spotlight"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 打印按钮
        iToolbar.add("print", $(".mdx-btn-print"));
        iToolbar.buttons["print"].unbind("click").click(function () {
            iToolTips.hide();
            VLOOK.print.ready();
        });
        // hover 事件处理
        iToolbar.buttons["print"].hover(function () {
            iToolTips.show($(this), "auto");
        }, function () {
            iToolTips.hide();
        });

        // 添加关联组件
        iOutlineNav.toolbar = iToolbar;

        // 绑定选择字体风格的工具栏按钮
        iFontStyler.bindButton(iToolbar.buttons["font-style"]);
    }

    iFigureViewer = new FigureNav();
    if (iFigureViewer === false)
        alert("Instantiation failed [ iFigureViewer ]");

    iToolTips = new ToolTips();
    if (iToolTips.length === 0)
        alert("Instantiation failed [ iToolTips ]");

    iInfoTips = new InfoTips(new BackgroundMask());
    if (iInfoTips.length === 0)
        alert("Instantiation failed [ iInfoTips ]");

    iBottomTips = new BottomTips();
    if (iBottomTips.length === 0)
        alert("Instantiation failed [ iBottomTips ]");

    iMask = $(".mdx-mask");
    if (iMask.length === 0)
        alert("Instantiation failed [ iMask ]");

    // 脚注
    iFootNote = new FootNote(new BackgroundMask());
    if (iFootNote === false)
        alert("Instantiation failed [ iFootNote ]");

    // 链接检查
    iLinkChecker = new LinkChecker();
    if (iLinkChecker.length === 0)
        alert("Instantiation failed [ iLinkChecker ]");
}

/**
 * 初始化 VLOOK 核心模块
 *
 * @param colorScheme 指定默认的颜色方案 light/dark
 */
VLOOK.initKernel = function (colorScheme) {
    // 应用于在新标签中打开内容时初始化颜色模式
    if (colorScheme != null)
        ColorScheme.scheme = colorScheme;

    // ----------------------------------------
    // 加载本文档主题配套的 Logo 图标
    iStopwatch.lapStart();
    console.info("- Document Logo");
    let docIconLight = $(".mdx-doc-logo-light").css("background-image"),
        docIconDark = $(".mdx-doc-logo-dark").css("background-image");
    $($("head")[0]).append("<link rel='icon' id='doc-icon-light' href='" + docIconLight.substring(5, docIconLight.length - 2) + "' type='image/x-icon'/>");
    $($("head")[0]).append("<link rel='icon' id='doc-icon-dark' href='" + docIconDark.substring(5, docIconDark.length - 2) + "' type='image/x-icon'/>");
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化国际化 UI
    iStopwatch.lapStart();
    console.info("- UI i18n");
    VLOOK.ui.initI18n();
    iStopwatch.lapStop("    ");

    // 独立线程进行处理
    setTimeout(function () {
        let stopwatch = new Stopwatch();
        // ----------------------------------------
        stopwatch.lapStart();
        // 重置行内代码code样式
        CodeMagic.init();
        stopwatch.lapStop("* Code°Magic: ");

        // ----------------------------------------
        // 初始化引用块
        stopwatch.lapStart();
        ExtQuote.init();
        stopwatch.lapStop("* Quote: ");
    }, 0);

    // 独立线程进行处理
    setTimeout(function () {
        let stopwatch = new Stopwatch();
        // ----------------------------------------
        // 初始化音频数据
        stopwatch.lapStart();
        ExtAudio.init();
        stopwatch.lapStop("* Audio: ");

        // ----------------------------------------
        // 初始化视频数据
        stopwatch.lapStart();
        ExtVideo.init();
        stopwatch.lapStop("* Video: ");

        // ----------------------------------------
        // 初始化插图数据
        stopwatch.lapStart();
        SVGInject.setOptions({
            afterInject: function(img, svg) {
                let svgObj = $(svg);
                ExtFigure.adjustFillAlterForSVG(svgObj.attr("data-vk-img-fill"), svgObj);
            }
        });
        ExtFigure.init();
        stopwatch.lapStop("* Figure: ");
    }, 0);

    // 独立线程进行处理
    setTimeout(function () {
        let stopwatch = new Stopwatch();
        // ----------------------------------------
        // 初始化表格
        stopwatch.lapStart();
        ExtTable.init();
        stopwatch.lapStop("* Table: ");

        // ----------------------------------------
        // 初始化代码块
        stopwatch.lapStart();
        ExtCodeBlock.init();
        stopwatch.lapStop("* Code Block: ");

        // ----------------------------------------
        // 增强脚注
        stopwatch.lapStart();
        FootNote.init();
        stopwatch.lapStop("* Footer Note: ");

        // 主要针对小屏情况，完成表格初始化后进行适配
        // 如果不是小屏，则由 adjustAll 触发
        iContentFolding.adjust();
    }, 500);

    // ----------------------------------------
    // 初始化Outline数据
    console.info("- Outline & Chapter Nav");
    iStopwatch.lapStart();
    if (OutlineNav.init()) {
        // 更新工具栏标题
        iOutlineNav.title.text($(document).attr("title"));

        // 自适应页面内容显示
        iOutlineNav.focusHeader();

        iOutlineNav.adjust();
        iChapterNav.adjust();
        iToolbar.adjust();
    }
    iStopwatch.lapStop("    ");

    // 独立线程进行处理
    setTimeout(function () {
        let stopwatch = new Stopwatch();
        // ----------------------------------------
        // 初始化字体风格
        stopwatch.lapStart();
        // 清空历史存储
        if (VLOOK.util.getQueryParams(window.location.href)["reset"] === "true") {
            console.warn("!!! Reset Local Storage !!!");
            localStorage.removeItem("VLOOK-" + VLOOK.version + "-font-style");
        }
        // 若手动切换过字体风格，则恢复为上次设置字体风格
        const style = localStorage["VLOOK-" + VLOOK.version + "-font-style"];
        iFontStyler.style = VLOOK.util.getStyleValue("--vlook-default-font-style").trim();
        if (window.localStorage && style !== undefined) {
            console.info("* Last Font Style: " + style);
            iFontStyler.apply(style);
        }
        else {
            console.info("* Default Font Style: " + iFontStyler.style);
            iFontStyler.apply();
        }
        stopwatch.lapStop("* Font Style: ");
    }, 0);

    // 独立线程进行处理
    setTimeout(function () {
        let stopwatch = new Stopwatch();
        // ----------------------------------------
        // 初始化外部链接
        stopwatch.lapStart();
        VLOOK.doc.link.adjustExternal();
        stopwatch.lapStop("* External Link: ");

        // ----------------------------------------
        // 在新标签中初始化时不处理
        stopwatch.lapStart();
        if (VLOOK.doc.newTab === false) {
            // 检查页内链接坏链
            iLinkChecker.checkInner();
        }
        stopwatch.lapStop("* Check Inner Bad Link: ");

        // ----------------------------------------
        // 检查重复的Header
        stopwatch.lapStart();
        VLOOK.doc.checkDuplicateHeader();
        stopwatch.lapStop("* Check Duplicate Header: ");
    }, 2000);

    // ----------------------------------------
    // 初始化全局热键
    iStopwatch.lapStart();
    console.info("- Hotkey");
    VLOOK.ui.initHotkey();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 根据设备类型自适应hover样式
    iStopwatch.lapStart();
    console.info("- Adjust for Mobile");
    VLOOK.ui.adjustHoverStyle();
    // 隐藏插图动作按钮
    ContentAssist.hideButtons();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    console.info("- Binding Event");
    iStopwatch.lapStart();
    // 绑定文档鼠标移动事件，聚光灯跟随鼠标移动
    document.addEventListener("mousemove", function () {
        iSpotlight.repaint(event || window.event);
        iOutlineNav.snap(event || window.event);
    });

    // 绑定文档的单击事件
    $(document).unbind("click").click(function () {
        if (ExtTable.cellCross.lastTable !== undefined)
            ExtTable.cellCross.hide(true);
    });

    // 绑定文档的滚动事件
    $(document).scroll(function () {
        let currentTime = new Date().getTime(),
            scrollTop = $(document).scrollTop();

        // 显示或隐藏文档更多内容遮罩栏
        if (currentTime - VLOOK.doc.scroll.lastUpdateTime > 200) {
            iMoreDocContent.refresh(scrollTop);
        }

        // ----------------------------------------
        // 控制执行频率，避免处理过快影响性能
        if (scrollTop < 100
            || currentTime - VLOOK.doc.scroll.lastUpdateTime > 1000
            || (Math.abs(scrollTop - VLOOK.doc.scroll.lastTop) > 100 && (currentTime - VLOOK.doc.scroll.lastUpdateTime) > 500)) {

            VLOOK.doc.scroll.update(currentTime, $(document).scrollTop());
            VLOOK.ui.adjustAll(false);
        }

        // 由于涉及到章节导航栏数据更新等不同逻辑处理，执行频率由 focusHeader 内进行控制
        iOutlineNav.focusHeader();
    });

    // 绑定窗口大小缩放事件
    $(window).resize(function () {
        iOutlineNav.focusHeader();

        iOutlineNav.adjust();
        iChapterNav.adjust();
        iToolbar.adjust();
    });

    // 绑定打印前的触发事件
    window.onbeforeprint = function () {};
    // 绑定打印后的触发事件
    window.onafterprint = function () {
        VLOOK.print.done();
    };

    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 特效初始化
    iStopwatch.lapStart();
    console.info("- Effect");
    let effect = VLOOK.util.getQueryParams(window.location.href)["effect"];
    if (effect === undefined)
        effect = "0";
    VLOOK.debug("    └ Level [ " + effect + " ]");
    if ("0,1,2,3".indexOf(effect) > -1) {
        VLOOK.ui.effect = parseInt(effect);
        VLOOK.ui.initEffect();
    }
    iStopwatch.lapStop("    ");
}

/**
 * 初始化须在页面 body 显示后才能执行的部分
 *
 * @param colorScheme 指定默认的颜色方案 light/dark
 */
VLOOK.initRestyle = function () {
    let stopwatch = new Stopwatch();

    // ----------------------------------------
    // 重置任务列表样式
    stopwatch.lapStart();
    Restyler.forTaskList();
    stopwatch.lapStop("- Restyle TaskList: ");

    // ----------------------------------------
    // 重置脚本化图表样式，须在以上页面内容恢复显示后再处理
    stopwatch.lapStart();
    Restyler.forMermaid();
    stopwatch.lapStop("- Restyle Mermaid: ");

    // ----------------------------------------
    // 修正 Mermaid 的渲染 BUG
    stopwatch.lapStart();
    env.printMermaidDPR();
    // 修正 Mermaid 的渲染 BUG
    if (VLOOK.util.getQueryParams(window.location.href)["fix-mermaid"] !== "false")
        RepairTool.fixMermaidRender();
    stopwatch.lapStop("- Mermaid Fix: ");
}

// VLOOK UI
VLOOK.ui = {
    effect : 0, // 0/1/2/3 启用的特效特级，0: 无特效

    /**
     * 判断是否为小屏
     */
    isSmallScreen : function () {
        return $(window).width() <= 1024;
    },

    /**
     * 初始 UI 国际化
     */
    initI18n : function () {
        iOutlineNav.title.attr("title", [
            "回到封面",
            "回到封面",
            "Back to cover",
            "Retour à la couverture",
            "Zurück zum Cover",
            "Volver a la tapa",
            "Вернуться к обложке",
            "カバーに戻る",
            "커버로 돌아 가기"
        ][VLOOK.lang.id]);

        iContentFolding.ui.find("div > span").attr("title", [
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
            "<strong>隐藏</strong> / <strong>显示</strong> 大纲面板",
            "<strong>隱藏</strong> / <strong>顯示</strong> 大綱面板",
            "<strong>Hide</strong> / <strong>Show</strong> Outline Panel",
            "<strong>Cacher</strong> / <strong>Afficher</strong> le panneau de contour",
            "<strong>ausblenden</strong> / <strong>anzeigen</strong> Gliederungsfenster",
            "<strong>Ocultar</strong> / <strong>Mostrar</strong> panel de contorno",
            "<strong>Скрыть</strong> / <strong>показать</strong> панель",
            "アウトラインパネルの <strong>非表示</strong> / <strong>表示</strong>",
            "개요 패널 <strong>숨기기</strong> / <strong>표시</strong>"
        ][VLOOK.lang.id]);

        iToolbar.buttons["figure-viewer"].attr("data-vk-tips", "<kbd>I</kbd> " + [
            "浏览插图",
            "查看文檔插圖",
            "Browse figures",
            "Parcourir la figures",
            "Zahlen durchsuchen",
            "Examinar figuras",
            "Просмотрите цифры",
            "図を参照する",
            "그림 찾아보기"
        ][VLOOK.lang.id]);

        iToolbar.buttons["color-scheme"].attr("data-vk-tips", "<kbd>D</kbd> " + [
            "切换 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
            "切換 [ <strong>黑暗</strong> / <strong>明亮</strong> ] 模式",
            "Switch <strong>Dark</strong> / <strong>Light</strong> Mode",
            "Basculer en mode <strong>sombre</strong> / <strong>clair</strong>",
            "Schalten Sie den  / <strong>Hell</strong> -Modus um",
            "Cambiar el modo <strong>Oscuro</strong> / <strong>Claro</strong>",
            "Переключить <strong>темный</strong> / <strong>светлый</strong> режим",
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

        iToolbar.buttons["spotlight"].attr("data-vk-tips", "<kbd>S</kbd> " + [
            "<strong>打开</strong> / <strong>关闭</strong> 聚光灯<br><kbd>⇧ Shift</kbd> 打开聚光灯后调整大小",
            "<strong>打開</strong> / <strong>關閉</strong> 聚光燈<br><kbd>⇧ Shift</kbd> 打開聚光燈後調整大小",
            "Turn the spotlight <strong>ON</strong> / <strong>OFF</strong><br><kbd>⇧ Shift</kbd> Resize after turning on the spotlight",
            "<strong>Allumer</strong> / <strong>éteindre</strong> le projecteur<br><kbd>⇧ Shift</kbd> Redimensionner après avoir allumé le projecteur",
            "Schalten Sie den Scheinwerfer <strong>ein</strong> / <strong>aus</strong><br><kbd>⇧ Shift</kbd> Ändern Sie die Größe nach dem Einschalten des Scheinwerfers",
            "<strong>Encienda</strong> / <strong>Encieapaguenda</strong> el foco<br><kbd>⇧ Shift</kbd> cambie el tamaño después de encender el foco",
            "<strong>Включите</strong> / <strong>выключите</strong> прожектор<br><kbd>⇧ Shift</kbd> Изменить размер после включения прожектора",
            "スポットライトをオンにする <strong>ON</strong> / <strong>OFF</strong><br><kbd>⇧ Shift</kbd> スポットライトをオンにした後のサイズ変更",
            "스포트라이트 <strong>켜기</strong> / <strong>끄기</strong><br><kbd>⇧ Shift</kbd> 스포트라이트를 켠 후 크기 조정"
        ][VLOOK.lang.id]);

        iToolbar.buttons["print"].attr("data-vk-tips", "<kbd>P</kbd> " + [
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

        iChapterNav.prev.ui.attr("data-vk-tips", "<kbd>◀</kbd> " + [
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

        iChapterNav.next.ui.attr("data-vk-tips", "<kbd>▶</kbd> " + [
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

        iFigureViewer.button.prev.attr("title", "[ ← ] " + [
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

        iFigureViewer.button.next.attr("title", "[ → ] " + [
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

        iFigureViewer.button.close.attr("title", "[ ESC ] " + [
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

        ContentAssist.button.openInNewTab().attr("title", [
            "在新标签页中打开",
            "在新標籤頁中打開",
            "Open in new tab",
            "Ouvrir dans un nouvel onglet",
            "In neuem Tab öffnen",
            "Abrir en una pestaña nueva",
            "Открыть в новой вкладке",
            "新しいタブで開く",
            "새 탭에서 열기"
        ][VLOOK.lang.id]);

        ContentAssist.button.copyCodeBlock().attr("title", [
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

    showInCenter : function (target) {
        if (env.device.mobile) {
            target.css({
                "left": 10,
                "right": 10,
                "top": ($(window).height() - target.height()) / 2
            });
        }
        else {
            target.css({
                "left": ($(window).width() - target.width()) / 2,
                "right": "auto",
                "top": ($(window).height() - target.height()) / 2
            });
        }
    },

    /**
     * 进行文档导航相关的 UI 元素的适配处理
     *
     * @param force 强制标记
     */
    adjustAll : function (force) {
        if (iOutlineNav.adjust() === true || force === true) {
            iContentFolding.adjust();
            // 对于处理带锚点的 URL 强制重新一次到锚点，避免在内容重新被折叠后文档长度变化导致位移
            if (force === true)
                window.location.href = window.location.hash;
        }
        iToolbar.adjust();
        iChapterNav.adjust();
    },

    /**
     * 模拟等待页面完成跳转后，再进行大纲面板布局自适应处理
     *
     * @param force 强制标记
     */
    adjustAllDelay : function (force) {
        setTimeout(function () {
            VLOOK.ui.adjustAll(force)
        }, 500);
    },

    /**
     * 对象根据特效级别进行适配
     *
     * @param target 目标对象
     */
    adjustEffect : function (target) {
        if (VLOOK.ui.effect >= 1) {
            target.css({
                "transition": "all " + VLOOK.animate.speed * 0.5 + "ms ease-in"
            });
        }
    },

    /**
     * 根据设备类型自适应hover样式
     */
    adjustHoverStyle : function () {
        // 移动设备时解绑样式事件
        if (env.device.mobile) {
            $(".mdx-btn").unbind("hover");
            iChapterNav.adjustHoverStyle("mobile");
            iFigureViewer.adjustHoverStyle("mobile");
        }
        // 非移动设备时绑定样式事件
        else {
            // 所有常规按钮 hover 事件处理
            $(".mdx-btn").hover(function () {
                $(this).addClass("mdx-btn-hover");
            }, function () {
                $(this).removeClass("mdx-btn-hover");
            });

            iChapterNav.adjustHoverStyle("desktop");
            iFigureViewer.adjustHoverStyle("desktop");
        }
    },

    /**
     * 初始化特效处理
     */
    initEffect : function () {
        // 针对 macOS 的指定浏览器开启模糊背景特效（如遮罩、插图浏览器背景）
        if (env.os.macOS && (env.browser.Chrome || env.browser.Edge)) {
            $(".mdx-backdrop-blurs").css({
                "backdrop-filter": "blur(10px)",
                "-webkit-backdrop-filter": "blur(10px)"
            });
        }

        let transitionTarget = "a, a:active, .CodeMirror-line, .mdx-figure, .mdx-folder-ico, .mdx-folder2-ico, .MathJax_SVG, .MathJax_SVG_Display, .md-toc-item, .mdx-btn-welcome-screen-done, .mdx-blockquote-folder, .mdx-toc-panel-title, .mdx-btn, .mdx-chapter-nav-prev, .mdx-chapter-nav-current, .mdx-chapter-nav-next, .mdx-btn-figure-prev, .mdx-btn-figure-next, .mdx-btn-close-figure-viewer, .mdx-clickable-hover, .mdx-OINTable-hover";

        // 启用 normal 级特效
        // VLOOK.ui.enableAnimation = true;
        if (VLOOK.ui.effect === 1) {
            VLOOK.ui.adjustEffect($(transitionTarget));
            VLOOK.ui.adjustEffect($("#write, .mdx-toolbar, .mdx-chapter-nav, .mdx-toc-panel"));
            // $(transitionTarget).css({
            //     "transition": "all " + VLOOK.animate.speed + "ms ease-in"
            // });
            // $("#write, .mdx-toolbar, .mdx-chapter-nav, .mdx-toc-panel").css({
            //     "transition": "all " + VLOOK.animate.speed + "ms ease-in"
            // });
        }

        // 因 CSS 的 transition 不变动渐变背景过渡效果，须通过增/减不同的预置样式实现过渡效果
        if (VLOOK.ui.effect >= 1) {
            iChapterNav.prev.ui.addClass("mdx-chapter-nav-prev-effect");
            iChapterNav.current.ui.addClass("mdx-chapter-nav-current-effect");
            iChapterNav.next.ui.addClass("mdx-chapter-nav-next-effect");
        }
        else {
            iChapterNav.prev.ui.addClass("mdx-chapter-nav-prev-noeffect");
            iChapterNav.current.ui.addClass("mdx-chapter-nav-current-noeffect");
            iChapterNav.next.ui.addClass("mdx-chapter-nav-next-noeffect");
        }

        // 启用 good 级特效
        // VLOOK.ui.effect = "good";
        if (VLOOK.ui.effect === 2) {
            VLOOK.ui.adjustEffect($(transitionTarget));
            // $(transitionTarget).css({
            //     "transition": "all " + VLOOK.animate.speed + "ms ease-in"
            // });
        }

        // 启用 best 级特效
        // VLOOK.ui.effect = "best";
        if (VLOOK.ui.effect === 3) {
            // $(".mdx-mask").css({
            //     "background-color": "rgba(255, 255, 255, 0.9)"
            // });

            // $(".mdx-backdrop-blurs").css({
            //     "backdrop-filter": "blur(15px)",
            //     "-webkit-backdrop-filter": "blur(15px)"
            // });

            // $(".mdx-welcome-screen");
        }
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

            switch (code) {
                case 74: // J
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    ExtTable.cellCross.hide(true);
                    if (iParagraphNav.next(1)) // 步长1
                        ExtQuote.autoUnfold(); // 自动展开引用
                    break;
                case 75: // K
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFontStyler.hide();
                    ExtTable.cellCross.hide(true);
                    if (iParagraphNav.prev(1)) // 步长1
                        ExtQuote.autoUnfold(); // 自动展开引用
                    break;
                case 72: // H
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    ExtTable.cellCross.hide(true);
                    if (iParagraphNav.prev(10)) // 步长10，快速移动
                        ExtQuote.autoUnfold(); // 自动展开引用
                    break;
                case 76: // L
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    ExtTable.cellCross.hide(true);
                    if (iParagraphNav.next(10)) // 步长10，快速移动
                        ExtQuote.autoUnfold(); // 自动展开引用
                    break;
                case 188: // <
                case 37: // ←
                    VLOOK.report.push(['Hotkey', combKeys, '<←', 0]);
                    iFontStyler.hide();
                    if (!iFigureViewer.ui.isHidden())
                        iFigureViewer.prev();
                    else {
                        iChapterNav.prev.ui.trigger("click");
                        // 自适应页面内容显示
                        iOutlineNav.focusHeader();
                    }
                    break;
                case 190: // >
                case 39: // →
                    VLOOK.report.push(['Hotkey', combKeys, '>→', 0]);
                    iFontStyler.hide();
                    if (!iFigureViewer.ui.isHidden())
                        iFigureViewer.next();
                    else {
                        iChapterNav.next.ui.trigger("click");
                        // 强制设置滚动间隔已超时，以强制触发 focusHeader 中的处理
                        VLOOK.doc.scroll.update(0, 0);
                        // 自适应页面内容显示
                        iOutlineNav.focusHeader();
                    }
                    break;
                case 79: // O
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFontStyler.hide();
                    if (!iFigureViewer.ui.isHidden())
                        return;
                    iToolbar.buttons["outline"].trigger("click");
                    break;
                case 73: // I
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFontStyler.hide();
                    // 文档无插图时不处理
                    if (!iToolbar.buttons["figure-viewer"].isVisible() ||
                        !iMask.isHidden())
                        return;
                    if (iFigureViewer.ui.isHidden() === true)
                        iToolbar.buttons["figure-viewer"].trigger("click");
                    else
                        iFigureViewer.hide();
                    break;
                case 68: // D
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFontStyler.hide();
                    iToolbar.buttons["color-scheme"].trigger("click");
                    break;
                case 65: // A
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFigureViewer.hide();
                    if (iFontStyler.ui.isHidden() === true)
                        iToolbar.buttons["font-style"].trigger("click");
                    else
                        iFontStyler.hide();
                    break;
                case 80: // P
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iFigureViewer.hide();
                    iFontStyler.hide();
                    iFootNote.hide();
                    iToolbar.buttons["print"].trigger("click");
                    break;
                case 83: // S
                    VLOOK.report.push(['Hotkey', combKeys, String.fromCharCode(code), 0]);
                    iToolTips.hide();
                    iFontStyler.hide();
                    iSpotlight.toggle();
                    break;
                case 16: // Shift
                    VLOOK.report.push(['Hotkey', combKeys, '', 0]);
                    if (!iSpotlight.ui.isHidden())
                        iSpotlight.toggleZoom();
                    break;
                case 13: // ENTER
                    VLOOK.report.push(['Hotkey', combKeys, 'ENTER', 0]);
                    // 关闭欢迎屏
                    if (iWelcomeScreen.finished === true)
                        iWelcomeScreen.close();
                    break;
                case 27: // ESC
                    let returnValue = true; // 默认不栏截该按键事件
                    VLOOK.report.push(['Hotkey', combKeys, 'ESC', 0]);
                    iToolTips.hide();
                    iInfoTips.hide();
                    iFontStyler.hide();
                    iLinkChecker.hide();

                    if (iOutlineNav.displayMode === "float") {
                        iOutlineNav.hide();
                        returnValue = false;
                    }

                    iSpotlight.hide();
                    iFootNote.hide();
                    iFigureViewer.hide();

                    ExtTable.cellCross.hide(true);
                    iParagraphNav.hide();

                    // 若对应 VLOOK 有匹配的 ESC 操作事件，则拦截该按键事件
                    // 避免同时浏览器的事件（如 macOS 的全屏状态）
                    if (returnValue === false) {
                        window.event.returnValue = false;
                    }
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
    speed : 500, // 动画速度，值越小越快
    tension : 200, // 动画张力参数
    friction : 20, // 动画摩擦力参数
    tipsTimer : null, // 用于自动控制提示动画
}

// 文档类
VLOOK.doc = {
    newTab : false, // 当前页面是通过 VLOOK 的在新标签打开功能生成的

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
            DOM.body().css({
                // "user-select": "none", // 禁用网页选择
                "overflow": "hidden" // 禁用网页滚动
            });
        },

        /**
         * 解冻文档滚动
         */
        unfreeze : function () {
            DOM.body().css({
                // "user-select": "text", // 恢复网页选择
                "overflow": "auto" // 恢复网页滚动
            });
        }
    },

    // 内容信息
    counter : {
        figure: 0, // 插图总数
        table: 0, // 表格总数
        codeBlock: 0, // 代码块总数
        audio: 0, // 音频总数
        video: 0, // 视频总数
    },

    // 图片加载失败后的默认填充图片（BASE64编码）
    defaultImage : "data:image/png;base64,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",
    defaultImage2x : "data:image/png;base64,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",

    /**
     * 判断当前位置是否在封面
     */
    inCover : function () {
        return $(document).scrollTop() < VOM.cover().outerHeight();
    },

    /**
     * 检查重名的Header
     */
    checkDuplicateHeader : function () {
        let h = [];
        $("h1, h2, h3, h4, h5").each(function () {
            h.push($(this).text());
        });
        let dupHeaders = [];
            //ignoreHeaders = [];//"业务规则,画图脚本,需求说明,说明,通用的业务规则,用户界面与交互,通用的用户界面与交互,页面流程,业务主流程,流程图,状态图,数据接入,需求说明,原型,状态机图";
        for (let i = 0, len = h.length; i < len; i++) {
            if (h.hasOwnProperty(i)) {
                for (let k = 0, len = h.length; k < len; k++) {
                    if (h.hasOwnProperty(k)) {
                        if (i !== k && h[i] === h[k])
                            //&& ignoreHeaders.indexOf(h[k]) < 0)
                            dupHeaders.push(h[i]);
                    }
                }
            }
        }
        // 输出警告信息
        for (let i = 0, len = dupHeaders.length; i < len; i++)
            console.warn([
                "重名的标题 [",
                "重複的標題 [",
                "Duplicate Header [",
                "Titre en double [",
                "Doppelter Header [",
                "Encabezado duplicado [",
                "Дублирующее название [",
                "重複するタイトル [",
                "중복 제목 ["
            ][VLOOK.lang.id] + i + "]：" + dupHeaders[i]);
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
        $(".mdx-figure-caption-mermaid").each(function () {
            $(this).attr("before-print-width", $(this).css("width"));
            $(this).css("width", "100%");
        });

        // 将 Mermaid 图表的 width, max-width 等属性临时禁用，并调整为 100%，以适应打印纸张宽度
        $(".mdx-figure-caption-mermaid svg").each(function () {
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
            // $(this).attr("data-vk-content-before-print-folded", $(this).attr("data-vk-content-folded"));
            ExtQuote.unfold($(this));
        });

        // 展开所有折叠的长内容
        $("[data-vk-content-folded='true']").each(function () {
            // $(this).attr("data-vk-content-before-print-folded", $(this).attr("data-vk-content-folded"));
            $(this).next(".mdx-content-expander").children(".mdx-btn").trigger("click");
        });

        // 展开所有折叠的表格行
        $(".mdx-table-rowfolding-button").each(function () {
            ExtTable.rowFolding.open($(this).parent().parent());
        });

        // 若存在「刮刮卡」内容，则先让用户确认是否显示
        let blackCurtains = $(".mdx-black-curtain");
        if (blackCurtains.length > 0) {
            if (confirm("文档含有「刮刮卡」内容，打印前是否显示实际内容？") === true) {
                blackCurtains.each(function () {
                    if ($(this).attr("data-vk-black-curtain-showed") === "false")
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
        $(".mdx-figure-caption-mermaid").each(function () {
            $(this).css("width", $(this).attr("before-print-width"));
            $(this).removeAttr("before-print-width");
        });

        //恢复打印前的配置，详见 VLOOK.print.ready()
        $(".mdx-figure-caption-mermaid svg").each(function () {
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
            if ($(this).attr("data-vk-black-curtain-showed") === "true")
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
        statData += "&img=" + $("img").length;
        statData += "&img-fold=" + $("p[data-vk-container='img'][data-vk-content-folded='true']").length;
        statData += "&img-invert=" + $("img[data-vk-darksrc='invert']").length;
        statData += "&img-alter=" + $("img[data-vk-darksrc='alter']").length;
        statData += "&img-cap1=" + $("div[id^=fig-num][data-vk-fig-type='img'] .mdx-figure-caption-1 strong").length;
        statData += "&img-cap2=" + $("div[id^=fig-num][data-vk-fig-type='img'] .mdx-figure-caption-2").length;

        // Mermaid 插图数据
        let mermaid = $(".md-diagram-panel");
        statData += "&mm=" + mermaid.length;
        statData += "&mm-fold=" + $("div[data-vk-container='svg'][data-vk-content-folded='true']").length;
        statData += "&mm-cap1=" + $("div[id^=fig-num][data-vk-fig-type='svg'] .mdx-figure-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=fig-num][data-vk-fig-type='svg'] .mdx-figure-caption-2").length;

        // Mermaid 音频数据
        statData += "&audio=" + $("audio").length;
        statData += "&mm-cap1=" + $("div[id^=audio-num] .mdx-figure-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=audio-num] .mdx-figure-caption-2").length;

        // Mermaid 视频数据
        statData += "&video=" + $("video").length;
        statData += "&mm-cap1=" + $("div[id^=video-num] .mdx-figure-caption-1 strong").length;
        statData += "&mm-cap2=" + $("div[id^=video-num] .mdx-figure-caption-2").length;

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
        statData += "&tbl-cap1=" + $("div[id^=tbl-num] .mdx-figure-caption-1 strong").length;
        statData += "&tbl-cap2=" + $("div[id^=tbl-num] .mdx-figure-caption-2").length;

        // 表格列格式数据
        let fmBold = 0,
            fmEm = 0,
            fmUnderline = 0,
            fmMark = 0,
            fmDel = 0,
            fmChk = 0,
            fmNum = 0;
        $("table[data-vk-column-formatting='true']").each(function () {
            if ($(this).find("thead mdx-table-column-format-bold").length > 0)
                fmBold++;
            if ($(this).find("thead mdx-table-column-format-em").length > 0)
                fmEm++;
            if ($(this).find("thead u").length > 0)
                fmUnderline++;
            if ($(this).find("thead mdx-table-column-format-mark").length > 0)
                fmMark++;
            if ($(this).find("thead del").length > 0)
                fmDel++;
            if ($(this).find("thead mdx-table-column-format-checkbox").length > 0)
                fmChk++;
            if ($(this).find("thead mdx-table-column-format-number").length > 0)
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
        statData += "&tbl-row-folding=" + $("table[data-vk-row-folding='true']").length;

        // 代码块数据
        statData += "&cb=" + $(".md-fences").length;
        statData += "&cb-fold=" + $("p[data-vk-container='pre'][data-vk-content-folded='true']").length;
        statData += "&cb-cap1=" + $("div[id^=code-block-num] .mdx-figure-caption-1 strong").length;
        statData += "&cb-cap2=" + $("div[id^=code-block-num] .mdx-figure-caption-2").length;

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
        let vlookStat = $("iframe[name=vlook-stat-gitee]");
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
        $("body").append('<iframe name="v-event-' + VLOOK.report.eventCount + '" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"'
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
        $("iframe[name^=v-event-]").each(function () {
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
     * @return R/G/B 颜色分量是数组
     */
    this.rgb = function () {
        let rgb = [0, 0, 0], d = [0, 0, 0];

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
     * @return R/G/B 颜色分量是数组
     */
    this.dissimilarRgb = function () {
        // 色板为空时，生成随机颜色后直接返回
        let rgb = [0, 0, 0];
        if (this.palette.length === 0) {
            rgb = this.rgb();
            this.palette.push(rgb);
            return rgb;
        }

        // 色板不为空时，避免相似的颜色
        let finished = false,
            times = 0,
            d = [0, 0, 0];

        // 随机生成不相似的颜色（最多尝试次数上限为 100）
        while (finished === false && times < 100) {
            rgb = this.rgb();
            // 判断新生成的随机颜色，色板中是否已有相似的
            let i = 0;
            for (i = 0; i < this.palette.length; i++) {
                d[0] = (this.palette[i][0] - rgb[0]) / 256;
                d[1] = (this.palette[i][1] - rgb[1]) / 256;
                d[2] = (this.palette[i][2] - rgb[2]) / 256;
                // 比例两个颜色的 RGB 色差来作为相似性的依据（0.25 为经验值）
                if (Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) > 0.25)
                    continue;
                else
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
     * 生成随机颜色
     *
     * @param rgb RGB 颜色分量数组
     * @param opacity 透明度，0:透明，1:不透明
     */
    this.format = function (rgb, opacity) {
        return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + opacity + ")";
    }

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
    this.lapStart = function () {
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

// ==================== 欢迎屏 ==================== //

/**
 * 构造函数
 *
 * @param mode 欢迎屏显示模式。none：不显示，auto：显示，并在加载完成后自动关闭。默认为显示，加载完成后手动关闭
 */
function WelcomeScreen(mode) {
    this.ui = $(".mdx-welcome-screen"); // 欢迎屏主界面
    this.buttonEnter = $(".mdx-welcome-screen-loading"); // 关闭欢迎屏按钮
    this.tips = $(".mdx-welcome-screen-tips"); // 欢迎信息
    this.finished = false; // 是否已加载
    this.mode = mode; // 模式：

    if (this.mode === "none")
        this.ui.hide();
    else
        this.ui.show();

    /**
     * 完成所有内容加载后调用
     */
    this.done = function () {
        this.ui.css("cursor", "default");
        this.stopAnimation();

        this.buttonEnter.text([
            "轻一点，轻轻一点",
            "輕一點，輕輕一點",
            "Click to Start",
            "Cliquez pour commencer",
            "Klicken Sie zum Starten",
            "Haga clic para comenzar",
            "Нажмите, чтобы начать",
            "クリックして開始",
            "클릭하여 시작"
        ][VLOOK.lang.id]);

        this.tips.css("animation", "none");
        this.buttonEnter.addClass("mdx-btn-welcome-screen-done");

        // 关闭欢迎屏事件
        let that = this;
        this.buttonEnter.unbind("click").click(function () {
            that.close();
        });

        // 模式为 none 或不为 wait 时的处理
        if (this.mode === "none" || this.mode !== "wait") {
            this.close();
        }

        this.finished = true;
    }

    /**
     * 停止加载时的呼吸动画
     */
    this.stopAnimation = function () {
        this.tips.css("animation", "none");
    }

    /**
     * 关闭欢迎屏
     */
    this.close = function () {
        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            let that = this;
            this.ui.velocity({
                top: -this.ui.height()
            }, {
                duration: VLOOK.animate.speed,
                complete : function () {
                    that.ui.hide();
                }
            });
        }
        else {
            this.ui.css({
                top: -this.ui.height()
            });
            this.ui.hide();
        }

        VLOOK.doc.scroll.unfreeze();
    }
}

// ==================== 内容辅助工具类 ==================== //

function ContentAssist() {}

ContentAssist.button = {
    openInNewTab : function () {
        return $(".mdx-btn-open-in-new-tab");
    }, // 在新标签中打开按钮

    copyCodeBlock : function () {
        return $(".mdx-btn-copy-code-block");
    }, // 复制代码块按钮
}

/**
 * 初始化内容辅助工具
 */
ContentAssist.init = function () {
    // 绑定在新标签中打开按钮事件
    ContentAssist.button.openInNewTab().unbind("click").click(function () {
        openInNewTab();
    });
    ContentAssist.button.openInNewTab().mouseout(function () {
        mouseout();
    });

    // 复制代码块按钮事件
    ContentAssist.button.copyCodeBlock().unbind("click").click(function () {
        ExtCodeBlock.copy();
    });
    ContentAssist.button.copyCodeBlock().mouseout(function () {
        mouseout();
    });

    /**
     * 鼠标移出内容动作按钮后
     */
    function mouseout() {
        if (ContentAssist.mouseDropIn() === false) {
            ContentAssist.hideButtons();
        }
    }

    /**
     * 在新标签页中打开插图/表格等内容
     */
    function openInNewTab() {
        ContentAssist.button.openInNewTab().hide();

        if (ContentAssist.lastHoverContent === undefined)
            return;

        let newTab = window.open("", "_blank"),
            content = ContentAssist.lastHoverContent.clone(), // 复制要在新标签中打开的内容
            tagName = ContentAssist.lastHoverContent.prop("tagName").toLowerCase();

        VLOOK.report.push(['Interactive', VLOOK.report.transTagName(tagName), 'OpenInNewTab', 0]);

        // 动态生成新标签的页面
        newTab.document.write("<!doctype html>");
        newTab.document.write($("html").html());
        // 取内容对应的题注为新标签页的标题
        newTab.document.title = ContentAssist.lastHoverContent.prev().text();

        // 初始化在新标签打开的页面的关键组件实例
        newTab.VLOOK.initIntance(true);
        newTab.OINT.init();

        // 内容为表格时
        if (tagName === "table") {
            // 恢复表格行号
            let rowNumFilter = "table tr > th:first-child, table tr > td:first-child, table tbody tr > td:first-child",
                container = content.wrap("<figure></figure>").parent();
            container.find(rowNumFilter).removeClass("mdx-table-row-num-hidden");

            // 添加 <h1> 是为能激活表格显示等号的样式
            newTab.OINT.append("<h6 style='display:none'></h1>");
            newTab.OINT.append(container);
        }
        // 内容为 Mermaid 图表时
        else if (tagName === "svg")
            newTab.OINT.append(content.wrap("<div class='md-diagram-panel'></div>").parent());
        // 内容为：图片、代码块
        else
            newTab.OINT.append(content);

        // 初始化在新标签打开的页面的 VLOOK
        newTab.VLOOK.initKernel(ColorScheme.scheme);

        // 将主文档中对应内容的题注数据更新到新标签中
        let caption1 = ContentAssist.lastHoverContent.prev().text(),
            caption2 = ContentAssist.lastHoverContent.next().attr("class") === "mdx-figure-caption-2" ? ContentAssist.lastHoverContent.next()
                .text() : null;
        newTab.OINT.updateFigureCaption(tagName, caption1, caption2);

        newTab.OINT.done();
    }
}

// 最后显示新标签打开按钮的内容（插图/表格等）
ContentAssist.lastHoverContent = undefined;

/**
 * 显示文档内容动作按钮
 */
ContentAssist.showOpenInNewTabButton = function () {
    // 移动端不显示该动作按钮
    if (env.device.mobile)
        return;

    // 显示在新标签打开的按钮
    ContentAssist.button.openInNewTab().hide();
    ContentAssist.button.openInNewTab().css({
        "left": ContentAssist.lastHoverContent.offset().left,
        "top": ContentAssist.lastHoverContent.offset().top
    });

    ContentAssist.button.openInNewTab().css("visibility", "visible");

    return 0; // 临时禁用

    // 动画式显示
    if (VLOOK.ui.effect >= 2) {
        ContentAssist.button.openInNewTab().velocity("fadeIn", {
            duration: VLOOK.animate.speed
        });
    }
    else {
        ContentAssist.button.openInNewTab().show();
    }
}

/**
 * 显示文档内容动作按钮
 */
ContentAssist.showCopyCodeBlockButton = function () {
    // 移动端不显示该动作按钮
    if (env.device.mobile)
        return;

    ContentAssist.button.copyCodeBlock().hide();
    ContentAssist.button.copyCodeBlock().css({
        "left": ContentAssist.lastHoverContent.offset().left
            + ContentAssist.lastHoverContent.width()
            - ContentAssist.button.copyCodeBlock().width() + 4,
        "top": ContentAssist.lastHoverContent.offset().top
    });

    ContentAssist.button.copyCodeBlock().css("visibility", "visible");

    // 动画式显示
    if (VLOOK.ui.effect >= 2)
        ContentAssist.button.copyCodeBlock().velocity("fadeIn", {
            duration: VLOOK.animate.speed
        });
    else
        ContentAssist.button.copyCodeBlock().show();
}

/**
 * 隐藏内容辅助动作按钮
 */
ContentAssist.hideButtons = function () {
    if (ContentAssist.lastHoverContent === undefined || ContentAssist.mouseDropIn() === false) {
        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            ContentAssist.button.openInNewTab().velocity("fadeOut", {
                duration: VLOOK.animate.speed
            });
            ContentAssist.button.copyCodeBlock().velocity("fadeOut", {
                duration: VLOOK.animate.speed
            });
        }
        else {
            ContentAssist.button.openInNewTab().hide();
            ContentAssist.button.copyCodeBlock().hide();
        }
    }
}

/**
 * 鼠标光标落入最后 Hover 的内容上
 */
ContentAssist.mouseDropIn = function () {
    let e = (event || window.event),
        target = ContentAssist.lastHoverContent;
    const mx = e.pageX || e.clientX + document.body.scrollLeft;
    const my = e.pageY || e.clientY + document.body.scrollTop;
    return !(mx < target.offset().left || mx > (target.offset().left + target.width()) ||
        my < target.offset().top || my > (target.offset().top + target.height()));
}

// ==================== 聚光灯类 ==================== //

/**
 * 构造函数
 * @param radius 半径大小
 */
function Spotlight(radius) {
    this.ui = $(".mdx-spotlight"); // 聚光灯主界面
    let that = this;
    this.event = undefined; // 鼠标事件对象
    this.radius = radius; // 聚光灯半径
    this.zoom = {
        normal: radius, // 标准大半径
        bigger: radius * 1.4, // 放大的半径
    };

    /**
     * 切换聚光灯的不同大小
     */
    this.toggleZoom = function () {
        if (this.ui.isHidden() === true)
            return;

        VLOOK.report.push(['Presentation', 'Spotlight', 'Zoom', 0]);

        this.radius = this.radius < this.zoom.bigger
            ? this.zoom.bigger
            : this.zoom.normal;

        this.repaint();
    }

    /**
     * 刷新聚光灯的显示
     *
     * @param event window.event 鼠标事件对象
     */
    this.repaint = function (event) {
        if (this.ui.isHidden() === true)
            return;

        // 若有指定鼠标事件对象，则更新聚光灯关联的鼠标事件对象
        if (event !== undefined)
            this.event = event;

        this.ui.css("background", "radial-gradient(circle at "
            + this.event.clientX + "px " + this.event.clientY + "px, "
            + "rgba(0, 0, 0, 0) " + this.radius + "px, "
            + "rgba(0, 0, 0, 0.7)" + (this.radius + 1) + "px)");
    }

    /**
     * 切换聚光灯的开关
     */
    this.toggle = function () {
        VLOOK.report.push(['Presentation', 'Spotlight', 'Show/Hide', 0]);

        // 未打开，则打开
        if (this.ui.isHidden() === true) {
            this.ui.show();
            iBottomTips.show([
                    "按 <kbd>⇧ Shift</kbd> 调整聚光灯大小",
                    "按 <kbd>⇧ Shift</kbd> 調整大小",
                    "Press <kbd>⇧ Shift</kbd> to adjust the size",
                    "Appuyez sur <kbd>⇧ Shift</kbd> pour ajuster la taille",
                    "Drücken Sie <kbd>⇧ Shift</kbd>, um die Größe anzupassen",
                    "Pulsa <kbd>⇧ Shift</kbd> para ajustar el tamaño",
                    "Нажмите <kbd>⇧ Shift</kbd>, чтобы настроить размер.",
                    "<kbd>⇧ Shift</kbd> を押してサイズを調整します",
                    "<kbd>⇧ Shift</kbd> 를 눌러 크기 조정"
                ][VLOOK.lang.id]);
            this.repaint();
        }
        // 已打开，则关闭
        else {
            that.hide();
        }
    }

    /**
     * 隐藏聚光灯
     */
    this.hide = function () {
        iBottomTips.hide();
        this.ui.hide();
    }
}

// ==================== 大纲导航类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function OutlineNav(mask) {
    this.ui = $(".mdx-toc-panel"); // 大纲面板主界面

    this.title = $(".mdx-toc-panel-title"); // 大纲面板标题
    let that = this;
    this.title.unbind("click").click(function () {
        that.gotoCover();
    });

    this.body = $(".mdx-toc-panel-body"); // 大纲内容

    this.headers = []; // 大纲目录集
    this.currentHeaderIndex = -1; // 当前章节在目录集中的索引
    this.currentItem = undefined; // 当前章节对象

    this.closeMode = "auto"; // 关闭大纲的方式
    this.displayMode = "float"; // 最后一次的显示方式（float/block）
    this.showed = false; // 是否已显示

    // 大纲面板宽度
    this.width = parseInt(VLOOK.util.getStyleValue("--vlook-toc-box-width"));

    this.foldItems = []; // 非叶子章节集
    this.lastHeaderFolder = undefined; // 上一个非叶子章节
    this.lastHeaderLevel = 0; // 上一个章节的层级

    // 大纲章节图标：已收起
    this.iconFolded = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px;"><use xlink:href="#icoFolded" class="mdx-folder-ico"/></svg>';
    // 大纲章节图标：已展开
    this.iconUnfold = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px;"><use xlink:href="#icoUnfold" class="mdx-folder-ico"/></svg>';

    this.lastDocScrollTop = 0; // 记录最后一次文档滚动位置

    this.chapterNav = undefined; // 联动的章节导航栏
    this.toolbar = undefined; // 联动的工具栏

    this.snapTimer = null; // 鼠标在边缘悬停计时器

    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this);


    /**
     * 添加大纲节点
     *
     * @param item 由 Typora 生成的 [TOC] 大纲节点
     */
    this.add = function (item) {
        let a = item.children("a");

        // 将章节记录到目录集中
        let href = a.attr("href");
        this.headers.push(href.substring(1, href.length));

        // 自定义大纲节点元数据
        item.css("cursor", "pointer"); // 添加鼠标形状
        item.attr({
            "id": "v-header-" + item.attr("data-ref"), // 添加id属性
            "data-vk-node": "0", // 添加节点类型：0:叶子节点, 1:目录节点
            "data-vk-folded": "false", // 添加节点状态：true:收起, false:展开
            "title": a.text().trim()
        });
        // 使用完 <a> 的内容后，将章节中的链接文字提到链接外，用于实现长章节内容截断的 CSS 新式
        a.after(a.text());
        a.text("");

        // 点击大纲节点事件
        let that = this;
        item.unbind("click").click(function () {
            VLOOK.report.push(['Outline', 'Goto', 'TOC', 0]);
            // 跳转至对应的页内锚点
            location.href = $("#" + item.attr("id")).children("a").attr("href");
            if (that.displayMode === "float") {
                that.hide("auto");
                // 模拟等待页面完成跳转后，再进行大纲面板布局自适应处理
                VLOOK.ui.adjustAllDelay(false);
            }
        });

        // -----------------------------------
        // 大纲非叶子章节的折叠功能实现
        // 所有大纲节点都添加 folding 空白控件备用
        $("<div id='fd-v-header-" + item.attr("data-ref")
            + "' class='mdx-folder'>&nbsp;</div>").insertBefore(item.find("a"));

        // 记录所有非叶子节点的folder控件
        if (this.lastHeaderFolder !== undefined) {
            // 当前节点比上一个节点层级低，则上一节点为可折叠的节点
            if (this.parseHeaderLevel(item) > this.lastHeaderLevel) {
                this.foldItems.push(this.lastHeaderFolder);

                // 为非叶子的章节添加折叠图标
                let folder = this.lastHeaderFolder.html(this.iconUnfold);
                folder.parent().attr({
                    "data-vk-node": "1", // 0:叶子, 1:目录
                    "data-vk-folded": "false" // true:收起， false:展开
                });

                // 折叠控件事件
                let that = this;
                folder.unbind("click").click(function () {
                    VLOOK.report.push(['Outline', 'Assist', 'Fold/Unfold', 0]);
                    that.foldChapterItem($(this).parent().attr("id"));
                    event.cancelBubble = true;
                });
            }
        }

        // 更新最后处理的folder控件
        this.lastHeaderFolder = $("#fd-v-header-" + item.attr("data-ref"));
        this.lastHeaderLevel = this.parseHeaderLevel(item);
    }

    /**
     * 页面滚动时根据页面当前的位置，高亮对应大纲中的章节
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
            let target = env.browser.Firefox === false
                ? $("a[name='" + this.headers[i] + "']") // 非 Firefox 浏览器
                : $("a[name='" + decodeURI(this.headers[i]) + "']"); // Firefox 浏览器
            let headerHeight = target.height();
            // 将最近一个章节从文档可视空间上方滚出的章节定义为「当前章节」
            if ((target.offset().top - $(document).scrollTop()) > (headerHeight * 2)) {
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
            // 更新大纲内当前节点的样式
            // 先清除大纲中上一次的「当前章节」的样式
            if (this.currentItem !== undefined)
                this.currentItem.removeClass("mdx-header-current");
            // 更新「当前章节」的样式
            this.currentItem = $("#vlook-toc a[href='#" + this.headers[currentIndex] + "']").parent();
            this.currentItem.addClass("mdx-header-current");

            // ----------------------------------------
            // 根据当前节点情况，大纲内的可视空间自动滚动该节点所在位置
            const preDis = this.currentItem.height() * 3, // 用于大纲节点触动滚动的大小
                sTop = this.body.scrollTop(), // 大纲内当前滚动位置
                sBottom = sTop + this.body.height(); // 当前可视空间中位于大纲底部的位置

            // 若当前节点在可视区域的上方，则滚动到该节点的位置
            if (this.currentItem.position().top < sTop)
                this.body.scrollTop(this.currentItem.position().top);
            // 若当前节点在可视区域的上方，则滚动到该节点的位置
            else if (this.currentItem.position().top > (sBottom - preDis))
                this.body.scrollTop(this.currentItem.position().top - this.body.height() + preDis);
        }

        this.chapterNav.update();
    }

    /**
     * 文档当前位置是否在章节内
     */
    this.inHeader = function () {
        return this.currentHeaderIndex > -1;
    }

    /**
     * 显示/隐藏大纲面板
     *
     * @param callback 显示/隐藏大纲后执行回调函数
     */
    this.toggle = function (callback) {
        VLOOK.report.push(['Outline', 'Assist', 'Show/Hide', 0]);

        // 大纲面板已显示
        if (this.showed === true) {
            this.hide("manual");
        }
        // 大纲面板未显示
        else {
            this.closeMode = "auto";
            // 在封面，或小屏
            if (this.inHeader() === false || VLOOK.ui.isSmallScreen() === true) {
                this.show("float");
            }
            // 在章节内，非小屏
            else {
                // 没有手动关闭大纲面板时，自动显示大纲面板
                if (this.closeMode === "auto")
                    this.show("block");
            }
        }

        typeof(callback) === "function" && callback();
        this.afterToggle();
    }

    /**
     * 显示大纲面板
     *
     * @param displayMode float: 以浮动形式显示，block: 以占位形式显示
     * @return true: 需要处理显示，false: 已显示，无须重复处理
     */
    this.show = function (displayMode) {
        if (this.showed === true // 已显示
            || this.ui.offset().left > -this.width) // 在以动画显示过程中
            return false;

        // 以「占位方式」显示大纲面板
        this.displayMode = displayMode;
        if (this.displayMode === "block") {
            // 占位方式的样式设置
            this.ui.removeClass("mdx-toc-panel-float");
            this.ui.addClass("mdx-toc-panel-block");

            // 撑开文档正文区域
            if (VLOOK.ui.effect >= 2)
                VOM.doc().velocity({
                    marginLeft: this.width + 20
                }, {
                    duration: VLOOK.animate.speed / 2
                });
            else
                VOM.doc().css({
                    marginLeft: this.width + 20
                });
        }
        // 以「浮动方式」显示大纲面板
        else if (this.displayMode === "float") {
            // 显示联动的遮罩
            this.mask.show();
            // 浮动方式的样式设置
            this.ui.removeClass("mdx-toc-panel-block");
            this.ui.addClass("mdx-toc-panel-float");

            // 若文档可视空间比大纲宽度要小，则进行微调
            if ($(window).width() < this.width + 40)
                this.ui.css("width", $(window).width() - 20);
            // 若文档空间比大纲宽度大，则直接显示原始大小
            else
                this.ui.css("width", this.width);
        }

        // 动画式显示
        if (VLOOK.ui.effect >= 2)
            this.ui.velocity({
                left: 10
            }, {
                easing: [VLOOK.animate.tension, VLOOK.animate.friction],
                duration: VLOOK.animate.speed
            });
        else
            this.ui.css({
                left: 10
            });

        // 以「占位方式」显示大纲面板时
        if (this.displayMode === "block") {
            // 重定位至锚点
            setTimeout(VLOOK.util.redirectToHash, 500);
            // 执行回调函数
            typeof(callback) === "function" && callback();
        }

        this.showed = true;

        return true;
    }

    /**
     * 隐藏大纲
     *
     * @param closeMode 关闭大纲的的方式（auto/manual）
     * @return true: 需要处理隐藏，false: 已显示，无须重复处理
     */
    this.hide = function (closeMode) {
        if (this.showed === false // 已隐藏
            || this.ui.offset().left < 10) // 在以动画隐藏过程中
            return false;

        this.showed = false;

        // 若最后一次显示以是「占位方式」显示
        if (this.displayMode === "block") {
            // 记录是否手动关闭
            this.closeMode = closeMode;

            // 则取消对正文区的占位空间
            if (VLOOK.ui.effect >= 2)
                VOM.doc().velocity({
                    marginLeft: 0
                }, {
                    duration: VLOOK.animate.speed
                });
            else
                VOM.doc().css({
                    marginLeft: 0
                });
        }

        let hiddenLeft = VLOOK.util.getStyleValue("--vlook-toc-box-hidden-left");
        // 动画式收起
        if (VLOOK.ui.effect >= 2) {
            this.ui.velocity({
                left: hiddenLeft
            }, {
                duration: VLOOK.animate.speed
            });
        }
        else {
            this.ui.css({
                left: hiddenLeft
            });
        }

        // 恢复不挤压文档正文区
        VOM.doc().css({
            marginLeft: 0
        });

        this.mask.hide();

        return true;
    }

    /**
     * 大纲面板根据规则进行布局的自适应处理
     *
     * @return true: 需要处理显示/隐藏，false: 已显示/隐藏，无须重复处理
     */
    this.adjust = function () {
        let result = false;
        // 在封面，或为小屏
        if (this.inHeader() === false || VLOOK.ui.isSmallScreen() === true) {
        // 自动隐藏大纲面板
            result = this.hide("auto");
        }
        // 不在封面
        else {
            // 没有手动关闭大纲面板时，自动显示大纲面板
            if (this.closeMode === "auto") {
                // 以占位方式显示大纲面板
                result = this.show("block");
            }
        }
        return result;
    }

    /**
     * 鼠标位置变化对大纲处理
     */
    this.snap = function (event) {
        // 已显示则跳过
        if (this.showed === true)
            return;

        // 鼠标离左边缘小于指定值时
        if (event.clientX <= 5) {
            if (this.snapTimer != null)
                return;

            // 延时（模拟悬停一定时间）以浮动方式显示大纲
            let that = this;
            this.snapTimer = setTimeout(function () {
                that.show("float");
            }, 500);
        }
        else {
            // 未显示大纲前离开边缘则取消显示
            if (this.snapTimer != null) {
                clearTimeout(this.snapTimer);
                this.snapTimer = null;
            }
        }
    }

    /**
     * 跳转回文档封面
     */
    this.gotoCover = function () {
        VLOOK.report.push(['Outline', 'Goto', 'Cover', 0]);

        location.href = "#";
        if (this.currentItem !== undefined) {
            this.currentItem.removeClass("mdx-header-current");
            this.currentHeaderIndex = -1;
        }

        iOutlineNav.adjust();
        iToolbar.adjust();
        iChapterNav.adjust();
    }

    /**
     * 跳转至指定章节
     */
    this.gotoHeader = function (target) {
        let dataAnchor = target.attr("data-vk-anchor");
        if (dataAnchor === "cover") {
            VLOOK.report.push(['ChapterNav', 'Nav', 'Cover', 0]);
            this.gotoCover();
        }
        else {
            VLOOK.report.push(['ChapterNav', 'Nav', 'Chapter', 0]);
            window.location.href = "#" + target.attr("data-vk-anchor");
        }
    }

    /**
     * 收起/展开章节目录
     *
     * @param id 对象的id值
     */
    this.foldChapterItem = function (id) {
        let tocItem = $("#" + id),
            folderIco = $("#fd-" + id + " > svg");

        // 若对应的章节已收起
        if (tocItem.attr("data-vk-folded") === "true") {
            tocItem.attr("data-vk-folded", "false");
            folderIco.prop("outerHTML", this.iconUnfold);

            this.disposeFold(id, "expand", true);
        }
        // 若对应的章节已展开
        else {
            tocItem.attr("data-vk-folded", "true");
            folderIco.prop("outerHTML", this.iconFolded);

            this.disposeFold(id, "collect", true);
        }
    }

    /**
     * 处理展开或收起指定章节下的子章节
     *
     * @param id 对象的id值
     * @param action 执行动作（collect/expand）
     * @param child 是否遍历子元素
     */
    this.disposeFold = function (id, action, child) {
        let lastItem = null,
            itemSet = $("#" + id).nextAll();
        for (let i = 0, len = itemSet.length; i < len; i++) {
            let item = $(itemSet[i]);
            if (lastItem != null) {
                const hd1 = this.parseHeaderLevel(item);
                const hd2 = this.parseHeaderLevel(lastItem);
                if (hd1 > hd2)
                    continue;
                else if (hd1 < hd2)
                    break;
            }

            // 如果是目录节点，同时是已展开的，才进行递归调用展开子节点
            if (child === true && item.attr("data-vk-node") === "1" && item.attr("data-vk-folded") === "false")
                this.disposeFold(item.attr("id"), action, child);

            if (action === "collect") // 收起
                item.css("display", "none");
            else if (action === "expand") // 展开
                item.css("display", "block");

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

    /**
     * 显示/隐藏大纲，并进行关联处理
     */
    this.afterToggle = function () {
        ContentAssist.button.openInNewTab().hide();
        if (iOutlineNav.displayMode === "block")
            iContentFolding.adjust();
    }
}

/**
 * 为Outline中子元素添加附加属性和事件
 */
OutlineNav.init = function () {
    // 提取文档中由[toc]标签生成的文档目录作为浮动outline中的内容
    let toc = $(".md-toc");
    // 没有生成目录
    if (toc.isEmpty()) {
        OutlineNav.hideOnError();
        return false;
    }

    // 有生成目录，则复制 toc 内容
    let vlookToc = toc.clone();
    // 隐藏原目录
    toc.hide();
    // 将复制的目录进行唯一性标识
    vlookToc.find(".md-toc-content").attr("id", "vlook-toc")
    iOutlineNav.body.append(vlookToc);

    // 没有目录内容
    let tocContent = $("#vlook-toc");
    if (tocContent.isEmpty()) {
        OutlineNav.hideOnError();
        return false;
    }

    // 有目录内容
    tocContent.children(".md-toc-h1, .md-toc-h2, .md-toc-h3, .md-toc-h4, .md-toc-h5, .md-toc-h6").each(function () {
        // 只处理 h1-h5，添加为实际的大纲节点
        if ($(this).attr("class").indexOf("md-toc-h6") === -1)
            iOutlineNav.add($(this));
        // 移除 h6
        else
            $(this).remove();
    });

    return true;
}

/**
 * 隐藏大纲（异常情况使用）
 */
OutlineNav.hideOnError = function () {
    iOutlineNav.hide();

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
 * @param outlineNav 关联的大纲对象
 */
function ChapterNav(outlineNav) {
    let that = this;
    // 逐章导航面板主界面
    this.ui = $(".mdx-chapter-nav");

    this.prev = {
        ui : $(".mdx-chapter-nav-prev"), // 前一章界面
        text: $(".mdx-chapter-nav-prev-text"), // 前一章文本界面
    };

    this.current = {
        ui : $(".mdx-chapter-nav-current"), // 当前章节界面
    };

    this.next = {
        ui : $(".mdx-chapter-nav-next"), // 后一章界面
        text : $(".mdx-chapter-nav-next-text"), // 后一章文本界面
    };

    // 关联的大纲对象
    this.outlineNav = outlineNav;

    /**
     * 跳转至前一章节
     */
    this.prev.ui.unbind("click").click(function () {
        that.outlineNav.gotoHeader(that.prev.text);
    });

    /**
     * 跳转至当前章节
     */
    this.current.ui.unbind("click").click(function () {
        that.outlineNav.gotoHeader(that.current.ui);
    });

    /**
     * 跳转至后一章节
     */
    this.next.ui.unbind("click").click(function () {
        that.outlineNav.gotoHeader(that.next.text);
    });

    /**
     * 更新逐章导航栏 UI 及数据
     */
    this.update = function () {
        let currentIndex = this.outlineNav.currentHeaderIndex;

        // ----------------------------------------
        // 更新「上一章」导航内容
        if (currentIndex > 0) {
            this.prev.ui.css("display", "block");
            this.prev.text.text($("a[href='#" + this.outlineNav.headers[currentIndex - 1] + "']").parent().attr("title"));
            this.prev.text.attr({
                "title": this.prev.text.text(),
                "data-vk-anchor": this.outlineNav.headers[currentIndex - 1]
            });
        }
        // 当前章节为第1章时特殊处理，设置为「封面」
        else if (currentIndex === 0) {
            this.prev.text.text([
                "封面",
                "封面",
                "Cover",
                "Couverture",
                "Startseite",
                "Cubrir",
                "передняя крышка",
                "カバー",
                "표지"
            ][VLOOK.lang.id]);
            this.prev.text.attr({
                "title": this.prev.text.text(),
                "data-vk-anchor": "cover"
            });
        }

        // ----------------------------------------
        // 更新「当前章节」导航内容
        if (this.outlineNav.currentItem !== undefined) {
            this.current.ui.text(this.outlineNav.currentItem.attr("title"));
            this.current.ui.attr("data-vk-anchor", this.outlineNav.headers[currentIndex]);
        }

        // ----------------------------------------
        // 更新「下一章」导航内容
        if (currentIndex < this.outlineNav.headers.length - 1) {
            this.next.ui.show();
            this.next.text.text($("a[href='#" + this.outlineNav.headers[currentIndex + 1] + "']").parent().attr("title"));
            this.next.text.attr({
                "title": this.next.text.text(),
                "data-vk-anchor": this.outlineNav.headers[currentIndex + 1]
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
        if (parseInt(this.ui.css("top")) >= 0)
            return;

        this.ui.addClass("mdx-float-card");
        this.ui.css({
            top: 0
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
            top: -50
        });
        this.ui.hide();
    }

    /**
     * 逐章导航栏自适应显示
     */
    this.adjust = function () {
        // 在封面时，隐藏逐章导航栏
        if (this.outlineNav.inHeader() === false) {
            this.hide();

            // 初始化前 / 后章节数据
            this.prev.text.attr("data-vk-anchor", "cover");
            this.next.text.attr("data-vk-anchor", this.outlineNav.headers[0]);
        }
        // 不在封面时，显示逐章导航栏
        else
            this.show();
    }

    /**
     * 逐章导航导航按钮在不同终端的适配处理
     *
     * @param flag "mobile": 移动端，"desktop"：桌面端
     */
    this.adjustHoverStyle = function (flag) {
        // 移动设备时解绑样式事件
        if (flag === "mobile") {
            this.prev.ui.unbind("hover");
            this.current.ui.unbind("hover");
            this.next.ui.unbind("hover");
        }
        // 非移动设备时绑定样式事件
        else {
            // 上一章
            this.prev.ui.hover(function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).addClass("mdx-chapter-nav-prev-effect-hover");
                else
                    $(this).addClass("mdx-chapter-nav-prev-noeffect-hover");
            }, function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).removeClass("mdx-chapter-nav-prev-effect-hover");
                else
                    $(this).removeClass("mdx-chapter-nav-prev-noeffect-hover");
            });
            // 当前章节
            this.current.ui.hover(function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).addClass("mdx-chapter-nav-current-effect-hover");
                else
                    $(this).addClass("mdx-chapter-nav-current-noeffect-hover");
            }, function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).removeClass("mdx-chapter-nav-current-effect-hover");
                else
                    $(this).removeClass("mdx-chapter-nav-current-noeffect-hover");
            });
            // 下一单
            this.next.ui.hover(function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).addClass("mdx-chapter-nav-next-effect-hover");
                else
                    $(this).addClass("mdx-chapter-nav-next-noeffect-hover");
            }, function () {
                if (VLOOK.ui.effect >= 1)
                    $(this).removeClass("mdx-chapter-nav-next-effect-hover");
                else
                    $(this).removeClass("mdx-chapter-nav-next-noeffect-hover");
            });
        }
    }
}

// ==================== 逐段导航类 ==================== //

/**
 * 构造函数
 */
function ParagraphNav() {
    this.count = 0; // 段的总数量
    this.currentIndex = -1; // 当前段索引号
    this.enabled = false; // 是否逐段导航激活

    /**
     * 返回当前段落
     */
    this.current = function () {
        if (this.currentIndex === -1)
            return undefined;
        return $("#v-blockfocus-" + this.currentIndex);
    }

    /**
     * 切换逐段导航开关
     */
    this.toggle = function (target) {
        this.enabled = !this.enabled;
        if (this.enabled === true) {
            VLOOK.report.push(['ParagraphNav', 'Action', 'Enabled', 0]);
            iMoreDocContent.hide();
            // 显示工具底栏提示信息
            iBottomTips.show([
                "<strong>逐段导航模式</strong>：<kbd>J</kbd>/<kbd>K</kbd>前/后段落&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>前/后十个段落&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>退出",
                "<strong>逐段導航模式</strong>：<kbd>J</kbd>/<kbd>K</kbd>前/後段落&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>前/後十個段落&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>退出",
                "<strong>Segment navigation mode</strong>: <kbd>J</kbd>/<kbd>K</kbd>front/back paragraph&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>front/back ten paragraphs&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>Exit",
                "<strong>Mode de navigation par segment</strong>: <kbd>J</kbd>/<kbd>K</kbd>paragraphe avant/arrière&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>dix paragraphes avant/arrière&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>Sortie",
                "<strong>Segmentnavigationsmodus</strong>: <kbd>J</kbd>/<kbd>K</kbd>vorderer/hinterer Absatz&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>vorne/hinten 10 Absätze&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>Ausfahrt",
                "<strong>Modo de navegación por segmentos</strong>: <kbd>J</kbd>/<kbd>K</kbd>párrafo delantero/trasero&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>anverso/reverso 10 párrafos&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>Salida",
                "<strong>Режим сегментной навигации</strong>: <kbd>J</kbd>/<kbd>K</kbd>передний / задний абзац&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>передний / задний десять абзацев,&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>Выход",
                "<strong>セグメントナビゲーションモード</strong>：<kbd>J</kbd>/<kbd>K</kbd>前後の段落&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>前後の10段落&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;<kbd>ESC</kbd>終了",
                "<strong>세그먼트 탐색 모드</strong>: <kbd>J</kbd>/<kbd>K</kbd>앞 / 뒤 단락&nbsp;&nbsp;&nbsp;&nbsp;<kbd>H</kbd>/<kbd>L</kbd>앞 / 뒤 10 단락, ESC : 종료"
            ][VLOOK.lang.id]);

            this.goto(target);
        }
        else {
            iMoreDocContent.refresh();
            iBottomTips.hide();
            this.hide();
        }
    }

    /**
     * 添加段落
     */
    this.add = function (item) {
        item.attr("id", "vk-blockfocus-" + this.count);
        item.attr("data-vk-blockfocus-idx", this.count);
        this.count++;
    }

    /**
     * 上一个段
     *
     * @param step 跳转的步长
     * @return 跳转结果，true=成功，false=失败
     */
    this.prev = function (step) {
        if (this.enabled === false)
            return;

        VLOOK.report.push(['ParagraphNav', 'Action', 'Keyboard',0]);

        this.blurFocus();

        // 未到首段
        if (this.currentIndex > 0) {
            this.currentIndex = this.currentIndex - step;

            if (this.currentIndex < 0)
                this.currentIndex = 0;

            // 如果目标内容块item跳转失败，则再尝试上一个
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
     * @return 跳转结果，true=成功，false=失败
     */
    this.next = function (step) {
        if (this.enabled === false)
            return;

        VLOOK.report.push(['ParagraphNav', 'Action', 'Keyboard', 0]);

        this.blurFocus();

        // 未到末段
        if (this.currentIndex < this.count - 1) {
            this.currentIndex = this.currentIndex + step;

            if (this.currentIndex > this.count - 1)
                this.currentIndex = this.currentIndex - 1;

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

        // 若目标聚焦块不可视，则返回跳转失败
        if (item.isHidden())
            return false;

        // 添加高亮样式
        item.addClass("mdx-current-blockfocus-item");
        this.currentIndex = parseInt(item.attr("data-vk-blockfocus-idx"));

        // 或目标段不在当前窗口显示区域内，则跳转到对应位置
        let height = item.height() * 3;
        if (item.offset().top !== 0
            && ((item.offset().top - height) < $(document).scrollTop()
            || (item.offset().top + height) > ($(document).scrollTop() + $(window).height()))) {
            // $("html").animate({
            //     scrollTop: item.offset().top - $(window).height() / 2
            // }, VLOOK.animate.speed);
            // 动画式显示
            if (VLOOK.ui.effect >= 2) {
                DOM.html().velocity("scroll", {
                    offset: item.offset().top - $(window).height() / 2,
                    duration: VLOOK.animate.speed
                });
            }
            else
                DOM.html().scrollTop(item.offset().top - $(window).height() / 2);
        }

        return true; // 返回跳转成功
    }

    /**
     * 让当前聚焦段其失去聚焦效果
     */
    this.blurFocus = function () {
        if (this.current() !== undefined)
            this.current().removeClass("mdx-current-blockfocus-item");
    }

    /**
     * 隐藏当前段落的高亮样式
     */
    this.hide = function () {
        iMoreDocContent.refresh();
        this.enabled = false;
        this.blurFocus();
    }
}

/**
 * 初始化逐段导航模式
 */
ParagraphNav.init = function() {
    iParagraphNav = new ParagraphNav();

    // 先清理多余的段落标签
    $("li > p:only-child").contents().unwrap();

    // 初始化
    $("h1, h2, h3, h4, h5, h6, ul > li, ol > li, p[class!=md-toc-content][class!=mdx-figure-caption-1][class!=mdx-figure-caption-2], figure, .md-diagram-panel, .MathJax_SVG_Display").each(function () {
        let item = $(this);
        // 跳过子元素有嵌套p的情况，如li > p
        if (item.children("p").length === 0) {
            iParagraphNav.add(item);

            // 双击内容块激活/关闭逐段导航模式模式
            item.dblclick(function () {
                iParagraphNav.toggle(item);
            });

            // 单击内容块处理
            item.unbind("click").click(function () {
                // 未激活逐段导航模式模式
                if (iParagraphNav.enabled === false)
                    return;

                VLOOK.report.push(['ParagraphNav', 'Action', 'Mouse', 0]);

                // 当前内容块内表格已显示十字光标
                if (ExtTable.cellCross.checkFallWith($(this)) === false) {
                    ExtTable.cellCross.hide(false);
                    iParagraphNav.goto(item);
                    event.stopPropagation(); // 停止事件冒泡
                }
            });
        } // if
    });
}

// ==================== 工具栏类 ==================== //

/**
 * 构造函数
 *
 * @param outlineNav 大纲导航对象
 * @param chapterNav 章节导航对象
 */
function Toolbar(outlineNav, chapterNav) {
    this.ui = $(".mdx-toolbar"); // 工具栏主界面
    this.buttons = {}; // 工具栏按钮集
    this.outlineNav = outlineNav;
    this.chapterNav = chapterNav;

    /**
     * 添加按钮
     *
     * @param name 按钮标识
     * @param button 按钮对象
     */
    this.add = function (name, button) {
        this.buttons[name] = button;
    }

    /**
     * 自适应显示工具栏
     */
    this.adjust = function () {
        // 移动端下隐藏不必要的功能入口
        if (env.device.mobile === true) {
            this.buttons["spotlight"].hide();
            this.buttons["print"].hide();
        }

        // 如果是小屏，或在封面
        if (VLOOK.ui.isSmallScreen() || this.outlineNav.inHeader() === false) {
            this.ui.children("div").addClass("mdx-float-card");

            // 小屏
            if (VLOOK.ui.isSmallScreen()) {
                this.ui.css({
                    top: 50
                });
            }

            // 调整工具栏样式
            this.ui.removeClass("mdx-backdrop-blurs");
            this.ui.removeClass("mdx-float-card");
            this.ui.css({
                width: $(window).width() - 20,
                background: "none"
            });

            // 为去掉工具栏背景的按钮添加浮动样式
            this.ui.children(".mdx-btn").addClass("mdx-btn-float");

            // 大屏，回到封面及最开始位置后进行二次调整
            if (VLOOK.ui.isSmallScreen() === false
                && this.outlineNav.inHeader() === false
                // && VLOOK.doc.inCover() === true
                && $(document).scrollTop() === 0) {
                    this.ui.css({
                    top: 10
                });
            }else {
                // 小屏，在非封面位置进行二次调整
                if (VLOOK.ui.isSmallScreen() && this.outlineNav.inHeader())
                    this.ui.css({
                        top: 50
                    });
                else {
                    // 小屏，在封面及最开始后位置进行二次调整
                    if ($(document).scrollTop() === 0)
                        this.ui.css({
                            top: 10
                        });
                    // 小屏，在封面位置进行二次调整
                    else
                        this.ui.css({
                            top: 0
                        });
                }
            }
        }
        // 宽屏，且不在封面
        else {
            if (this.ui.offset().top !== 0) {
                this.ui.css({
                    width: "var(--vlook-toc-box-width)",
                    backgroundColor: this.chapterNav.ui.css("background-color")
                });
                this.ui.children("div").removeClass("mdx-float-card");
                  this.ui.addClass("mdx-float-card");
                this.ui.css({
                    top: 0
                });

                // 为增加了工具栏按钮的背景去掉浮动样式
                this.ui.children(".mdx-btn").removeClass("mdx-btn-float");
            }
        }

        this.ui.show();
    }
}

// ==================== 颜色方案类 ==================== //

/**
 * 构造函数
 */
function ColorScheme(button) {}

ColorScheme.scheme = "light"; // 当前颜色以方案，light/dark
ColorScheme.schemeBeforePrint = "light"; // 打印前的颜色方案
// ColorScheme.syncTimer = null; // 控制与系统颜色方案同步

/**
 * 初始化
 */
ColorScheme.init = function () {
    const lightIcon = document.querySelector('link#doc-icon-light');
    const darkIcon = document.querySelector('link#doc-icon-dark');

    // Light Mode 时的文档图标
    function setLight() {
        document.head.append(lightIcon);
        darkIcon.remove();
        ColorScheme.toggle("light");
    }

    // Dark Mode 时的文档图标
    function setDark() {
        lightIcon.remove();
        document.head.append(darkIcon);
        ColorScheme.toggle("dark");
    }

    // 根据系统 Color Scheme 变化进行适配更新
    function update(matcher) {
        if (matcher.matches === true)
            setDark();
        else
            setLight();
    }
    // 监听系统的 Color Scheme 变化
    const matcher = window.matchMedia('(prefers-color-scheme:dark)');
    matcher.addListener(update);

    // 初始执行
    update(matcher);
}

/**
 * 切换颜色方案
 *
 * @param scheme 指定方案，为空时则轮换
 */
ColorScheme.toggle = function (scheme) {
    VLOOK.report.push(['Style', 'ColorScheme', '', 0]);

    if (scheme === undefined)
        scheme = (ColorScheme.scheme === "light") ? "dark" : "light";

    ColorScheme.scheme = scheme;
    console.info("... Switching to [ " + ColorScheme.scheme + " ]");

    // 应用最新颜色方案
    ColorScheme.refresh();
}

/**
 * 根据指定的颜色方案进行文档刷新
 */
ColorScheme.refresh = function () {
    let stopwatch = new Stopwatch();
    stopwatch.lapStart();

    // CSS 变量名称列表
    const varList = [
        "--vlook-invert-dark",
        "--vlook-brightness-dark",
        "--vlook-table-rowfolding-alpha",
        "--doc-bg-color",
        "--doc-bg-color-alt",
        "--doc-bg-color-transparent",
        "--doc-bg-color-alt-transparent",
        "--fore-color",
        "--blockquote-color",
        "--blockquote-bg",
        // "--shadow-color",
        "--a-color",
        "--mark-color",
        "--footer-note-bg-color",
        "--table-border-color",
        "--table-th-bg-color",
        "--table-th-border-color",
        // "--img-dark-filter",
        "--del-color",
        "--toc-header-num-color",
        "--header-color",
        "--header-box-shadow",
        "--header-bg-start-color",
        "--header-bg-end-color",
        "--code-bg-color",
        // "--code-bg-color-transparent",
        "--code-name-bg-color",
        "--code-name-shadow-color",
        "--tips-bg-color-inset",
        "--tips-bg-color",
        "--accent-color-red",
        "--accent-color-red-alt",
        "--accent-color-red-fade",
        "--accent-color-orange",
        "--accent-color-orange-alt",
        "--accent-color-orange-fade",
        "--accent-color-yellow",
        "--accent-color-yellow-alt",
        "--accent-color-yellow-fade",
        "--accent-color-green",
        "--accent-color-green-alt",
        "--accent-color-green-fade",
        "--accent-color-cyan",
        "--accent-color-cyan-alt",
        "--accent-color-cyan-fade",
        "--accent-color-blue",
        "--accent-color-blue-alt",
        "--accent-color-blue-fade",
        "--accent-color-purple",
        "--accent-color-purple-alt",
        "--accent-color-purple-fade",
        "--accent-color-pink",
        "--accent-color-pink-alt",
        "--accent-color-pink-fade",
        "--accent-color-brown",
        "--accent-color-brown-alt",
        "--accent-color-brown-fade",
        "--accent-color-gray",
        "--accent-color-gray-alt",
        "--accent-color-gray-fade",
        "--accent-color-theme1",
        "--accent-color-theme1-alt",
        "--accent-color-theme1-fade",
        "--accent-color-theme2",
        "--accent-color-theme2-alt",
        "--accent-color-theme2-fade",
        "--mermaid-accent-color-red",
        "--mermaid-accent-color-red-alt",
        "--mermaid-accent-color-orange",
        "--mermaid-accent-color-orange-alt",
        "--mermaid-accent-color-yellow",
        "--mermaid-accent-color-yellow-alt",
        "--mermaid-accent-color-green",
        "--mermaid-accent-color-green-alt",
        "--mermaid-accent-color-cyan",
        "--mermaid-accent-color-cyan-alt",
        "--mermaid-accent-color-blue",
        "--mermaid-accent-color-blue-alt",
        "--mermaid-accent-color-purple",
        "--mermaid-accent-color-purple-alt",
        "--mermaid-accent-color-pink",
        "--mermaid-accent-color-pink-alt",
        "--mermaid-accent-color-brown",
        "--mermaid-accent-color-brown-alt",
        "--mermaid-accent-color-gray",
        "--mermaid-accent-color-gray-alt",
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

    updateUI();

    // 生成目标颜色方案值列表
    let schemeVarList = [];
    for (let i = 0, len = varList.length; i < len; i++) {
        schemeVarList.push(VLOOK.util.getStyleValue(varList[i] + "-" + ColorScheme.scheme));
    }
    // 遍历所有变量实现ColorScheme切换
    for (let i = 0, len = varList.length; i < len; i++) {
        VLOOK.util.setStyleValue(varList[i], schemeVarList[i]);
    }

    // 针对 Dark Mode 进行适配处理
    ExtQuote.adjustColorScheme();
    ExtFigure.adjustColorScheme(true);

    stopwatch.lapStop("    ");

    /**
     * 更新颜色方案 UI
     */
    function updateUI() {
        if (ColorScheme.scheme === "light") {
            // 调整模式切换按钮图标
            iToolbar.buttons["color-scheme"].html(
                "<svg width='18px' height='18px'><use xlink:href='#icoDarkMode' class='mdx-svg-ico-light'/></svg>"
            );
        }
        else {
            // 调整模式切换按钮图标
            iToolbar.buttons["color-scheme"].html(
                "<svg width='20px' height='20px'><use xlink:href='#icoLightMode' class='mdx-svg-ico-light'/></svg>"
            );
        }
    }
}

/**
 * 根据颜色方案对浏览器兼容性处理
 */
ColorScheme.afterToggle = function () {
    $(".mdx-copyright").children("svg").html("<use xlink:href='#icoVLOOK-" + ColorScheme.scheme + "'></use>");

    if (ColorScheme.scheme === "dark") {
        // 因需针对不同颜色方案在不同浏览器的处理，所以不能直接通过 CSS 的 @supports ((backdrop-filter: blur(15px)) 来实现
        // 支持毛玻璃 backdrop-filter: blur() 的浏览器
        // if (env.browser.Chrome || env.browser.Safari) {
        // iMask.css({
        //     "background-color": "rgba(0, 0, 0, 0.3)"
        // });
        // iFigureViewer.css({
        //     "background-color": "rgba(0, 0, 0, 0.3)"
        // });
        // }
        // else { // 不支持
        // ColorScheme.mask.ui.css("background-color", "rgba(0, 0, 0, 0.9)");
        iOutlineNav.mask.ui.css("background-color", "rgba(0, 0, 0, 0.9)");
        iFigureViewer.ui.css("background-color", "rgba(0, 0, 0, 0.9)");
        // }
    }
    else {
        // 支持毛玻璃 backdrop-filter: blur() 的浏览器
        // if (env.browser.Chrome || env.browser.Safari) {
        // iMask.css({
        //     "background-color": "rgba(255, 255, 255, 0.3)"
        // });
        // iFigureViewer.css({
        //     "background-color": "rgba(255, 255, 255, 0.3)"
        // });
        // }
        // else { // 不支持
        // ColorScheme.mask.ui.css("background-color", "rgba(255, 255, 255, 0.9)");
        iOutlineNav.mask.ui.css("background-color", "rgba(0, 0, 0, 0.8)");
        iFigureViewer.ui.css("background-color", "rgba(0, 0, 0, 0.8)");
        // }
    }
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
    this.mask.bindPartner(this);

    // 绑定各字体风格选项事件
    let that = this;
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
        let that = this;
        setTimeout(function () {
            let langTimeout = "❌ " + [
                    "超时",
                    "超時",
                    "Timeout",
                    "Temps libre",
                    "Auszeit",
                    "Se acabó el tiempo",
                    "Тайм-аут",
                    "タイムアウト",
                    "타임 아웃"
                ][VLOOK.lang.id];
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

    /*
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
            let that = this;
            fontFace.load().then(function(loadedFontFace) {
                document.fonts.add(loadedFontFace);

                let fontID = fontFamily + "/" + fontStyle + "/" + fontWeight,
                    langReady = "✅ " + [
                        "已就绪",
                        "已就緒",
                        "Ready",
                        "Prêt",
                        "Bereit",
                        "Listo",
                        "готов",
                        "準備完了",
                        "준비된"
                    ][VLOOK.lang.id],
                    langLoading = [
                        "加载中",
                        "加載中",
                        "Loading",
                        "Chargement",
                        "Wird geladen",
                        "Cargando",
                        "Загрузка",
                        "読み込み中",
                        "로딩 중"
                    ][VLOOK.lang.id];
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
                    sansStatus.text(langLoading + "... (" + (sansLoadedCount / that.sansStyle.fontCount * 100) + "%)");
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
                    serifStatus.text(langLoading + "... (" + (serifLoadedCount / that.serifStyle.fontCount * 100) + "%)");
                else
                    serifStatus.text(langReady);
            });
        }
    }

    /*
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
        VLOOK.ui.showInCenter(this.ui);
        this.mask.show();
        this.ui.show();

        if (this.style === "sans") {
            this.sansStyle.ui.addClass("mdx-font-styler-current");
            this.serifStyle.ui.removeClass("mdx-font-styler-current");
        }
        else {
            this.serifStyle.ui.addClass("mdx-font-styler-current");
            this.sansStyle.ui.removeClass("mdx-font-styler-current");
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
        let text = "html, body"
            + ", .noteText tspan";
            // + ", ruby";
        let title = "#write > h6:first-child"
            + ", #write > h6:last-of-type"
            + ", .mdx-welcome-screen";
        let subtitle = ".mdx-copyright"
            + ", #write > h6:first-child strong"
            + ", #write > h6:first-child strong::before"
            + ", #write > h6:first-child em"
            + ", h6"
            + ", .outline-item"
            + ", .md-toc-item"
            + ", .mdx-tool-tips"
            + ", .mdx-info-tips"
            + ", .mdx-content-expander"
            + ", .mdx-welcome-screen-loading"
            + ", .mdx-toc-panel-header"
            + ", .mdx-toc-panel-title"
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
        let header = "h1, h2, h3, h4, h5, h6"
            + ", #write > h6:first-child sub"
            + ", #write > h6:first-child sup";
        let bold = "a, strong"
            + ", table > thead > tr > th"
            + ", table > thead > tr > td"
            + ", .mdx-table-column-format-bold"
            + ", .md-fn-count"
            + ", a[name^='ref-footnote-']"
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
            + ", .mdx-figure-caption > p"
            + ", rp, rt";
        let number = ".mdx-table-column-format-number";
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
            + ", .mdx-table-column-format-bold"
            + ", .pieTitleText"
            + ", .legend text"
            + ", .slice"
            + ", .mdx-actor-key-sys"
            + ", .labelText tspan"
            + ", .titleText"
            + ", strong a"
            + ", .mdx-black-curtain"
            + ", #write > h6:first-child sub"
            + ", #write > h6:first-child sup"
            + ", #write > h6:first-child em";

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

        // $(number).removeClass("mdx-font-bold-" + this.style); // 针对 bold.addClass 后的二次调整
        $(number).addClass("mdx-font-number-" + this.style);

        $(subtitle).removeClass("mdx-font-header-" + style); // 针对 header.addClass 后的二次调整
        $(subtitle).removeClass("mdx-font-bold-" + style); // 针对 header.addClass 后的二次调整
        $(subtitle).addClass("mdx-font-subtitle-" + style);

        $(title).removeClass("mdx-font-header-" + style); // 针对 header.addClass 后的二次调整
        $(title).removeClass("mdx-font-subtitle-" + style); // 针对 header.addClass 后的二次调整
        $(title).addClass("mdx-font-title-" + style);

        $(fontWeight).addClass("mdx-font-weight-bold-" + style);

        // 更新绑定的按钮图标
        this.button.html("<svg width='18px' height='16px'><use xlink:href='#icoFont-"
            + this.style
            + "' class='mdx-svg-ico-light'/></svg>");

        // 保存最后一次应用的字体风格
        localStorage["VLOOK-" + VLOOK.version + "-font-style"] = iFontStyler.style;
    }
}

// ==================== 脚注类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function FootNote(mask) {
    this.ui = $(".mdx-footer-note-panel"); // 脚注主界面
    this.content = $(".mdx-footer-note-panel-content"); // 脚注内容区

    this.buttonSeeAll = $(".mdx-footer-note-panel-all"); // 查看所有脚注按钮
    let that = this;
    this.buttonSeeAll.unbind("click").click(function () {
        that.hide();
        // 跳转至所有脚注区域
        window.location.href = "#xFooterArea";
    });
    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this);

    /**
     * 显示脚注弹层
     */
    this.show = function () {
        // 显示关联的遮罩
        this.mask.show();

        if (VLOOK.ui.isSmallScreen())
            this.ui.css({
                left: 20,
                right: 20
            });
        else
            this.ui.css({
                left: "15%",
                right: "15%"
            });

        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            this.ui.show();
            this.ui.velocity({
                bottom: 80 //+ VLOOK.animate.friction
            }, {
                easing: [VLOOK.animate.tension, VLOOK.animate.friction],
                duration: VLOOK.animate.speed
            });
        }
        else {
            this.ui.show();
            this.ui.css({
                bottom: 90
            });
        }
    }

    /**
     * 隐藏脚注弹层
     */
    this.hide = function () {
        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            let that = this;
            this.ui.velocity({
                bottom: -this.ui.height()
            }, {
                duration: VLOOK.animate.speed
            }, function () {
                that.ui.hide();
            });
        }
        else {
            this.ui.css({
                bottom: -this.ui.height()
            });
            this.ui.hide();
        }

        this.mask.hide();
    }
}

/**
 * 初始化脚注
 */
FootNote.init = function () {
    // 将脚注调整到封底前，VLOOK 规范的文档中最后一个 <h6> 是封底
    let footnotesArea = $(".footnotes-area");
    footnotesArea.insertBefore(VOM.backcover());

    // 移除默认的跳转属性
    let a = $("a[name^='ref-footnote-']");
    a.removeAttr("href");

    // 将脚注角标的事件替换为指定的处理事件
    a.unbind("click").click(function () {
        let target = $("a[name='df" + $(this).attr("name") + "']").parent().clone();

        // 更新脚注弹层内容区
        iFootNote.content.html(target);
        // 移除默认的返回链接
        target.find("a[name^='dfref-footnote']")[0].remove();

        // 显示脚注弹层
        iFootNote.show();
    });

    // 将脚注区锚点调整到生成HTML后的实际位置
    $("a[name='xFooterArea']").insertBefore(footnotesArea);
}

// ==================== 链接检查类 ==================== //

/**
 * 构造函数
 */
function LinkChecker() {
    this.ui = {
        result : $(".mdx-link-chk-result"), // 检查结果
        errorList : $(".mdx-link-error-list") // 坏链列表
    }
    this.iconError = '<svg width="20px" height="18px"><use class="mdx-svg-ico-light" xlink:href="#icoLinkError"></use></svg>';
    this.iconClose = '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoClose"></use></svg>';

    /**
     * 检查内链
     */
    this.checkInner = function () {
        let count = 0,
            badLink = "";

        // 修复 Typora 内链 BUG
        // RepairTool.fixTyporaInnerLink();

        // 检查所有页内链接对应的锚点是否都存在
        // $("#write a[href^='#']").each(function () {
        $("#write a").each(function () {
            let href = $(this).attr("href");
            // 忽略空链接，如 href="#"
            if (href === undefined || href.length <= 1)
                return true;

            // 页内链接
            if (href[0] === "#") {
                // 检索是否存在与该内链对应的锚点
                let aName = href.substring(1, href.length);
                // 没有检索到对应的锚点
                if ($("#write a[name='" + aName + "']").length === 0) {
                    count++;

                    let comment = [
                        "无效页内链接 [",
                        "無效頁內鏈接 [",
                        "Invalid Inner Link [",
                        "Lien de page non valide [",
                        "Ungültiger innerer Link [",
                        "Enlace interno no válido [",
                        "Недопустимая ссылка на страницу [",
                        "ページリンクが無効です[",
                        "잘못된 페이지 링크["
                    ][VLOOK.lang.id];

                    badLink += comment + count + "]：" + $(this).text()
                        + "(#" + aName + ")<br /><span>\"" + $(this).parent().text() + "\"</span><hr>";
                    console.error(comment + count + "]：" + $(this).text()
                        + "(#" + aName + ")\n\"" + $(this).parent().text() + "\"\n");
                }
            }
            // 非页内链接
            else {
                // todo
            }
        });

        // 存在坏链
        let that = this;
        if (badLink.length > 0) {
            this.ui.result.addClass("mdx-link-result-error");
            this.ui.result.html(this.iconError);
            this.ui.result.unbind("click").click(function () {
                if (that.ui.errorList.css("display") === "none") {
                    that.ui.errorList.show();
                    that.ui.result.html(that.iconClose);
                    VLOOK.doc.scroll.freeze();
                }
                else
                    that.hide();
            });
            this.ui.errorList.html(badLink);
        }
        // 不存在坏链
        else {
            this.ui.result.addClass("mdx-link-result-ok");
            this.ui.result.unbind("click").click(function () {
                that.ui.result.hide();
            });
            // 延时隐藏检查结果
            setTimeout(function () {
                that.ui.result.hide();
            }, 2000);
        }
    }

    /**
     * 隐藏坏链列表
     */
    this.hide = function () {
        this.ui.errorList.hide();
        this.ui.result.html(this.iconError);
        VLOOK.doc.scroll.unfreeze();
    }
}

// ==================== 背景遮罩类 ==================== //

/**
 * 构造函数
 */
function BackgroundMask() {
    this.ui = $(".mdx-mask");
    this.partner = undefined;

    /**
     * 绑定联动对象
     *
     * @param partner 联动对象
     */
    this.bindPartner = function (partner) {
        this.partner = partner;
    }

    /**
     * 显示遮罩
     */
    this.show = function () {
        // 冻结滚动
        VLOOK.doc.scroll.freeze();

        // 总是在 target 下显示
        this.ui.css("z-index", this.partner.ui.css("z-index") - 1);
        // 点击遮罩隐藏联动对象
        let that = this;
        this.ui.unbind("click").click(function () {
            // 取消冻结滚动
            VLOOK.doc.scroll.unfreeze();
            // 隐藏联动对应
            that.partner.hide();

            // 动画式显示
            if (VLOOK.ui.effect >= 2)
                $(this).velocity("fadeOut", {
                    duration: VLOOK.animate.speed
                });
            else
                $(this).hide();
        });

        // 动画式显示
        if (VLOOK.ui.effect >= 2)
            this.ui.velocity("fadeIn", {
                duration: VLOOK.animate.speed
            });
        else
            this.ui.show();
    }

    /**
     * 隐藏遮罩
     */
    this.hide = function () {
        // 取消冻结滚动
        VLOOK.doc.scroll.unfreeze();

        // 动画式显示
        if (VLOOK.ui.effect >= 2)
            this.ui.velocity("fadeOut", {
                duration: VLOOK.animate.speed
            });
        else
            this.ui.hide();
    }
}

// ==================== 长内容折叠类 ==================== //

function ContentFolding() {
    this.ui = $(".mdx-content-expander"); // 展开操作区的 UI 模板
    this.limit = VLOOK.debugMode ? 300 : 600; // 内容须折叠的高度限值
    this.contents = []; // 须进行折叠判断和处理的内容集
    this.buildTimers = [];

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
        console.log("adjust2");
        // 提前中断未完成的处理
        if (this.buildTimers.length > 0) {
            for (let i = 0, len = this.buildTimers.length; i < len; i++)
                clearTimeout(this.buildTimers.shift());
        }
        // 重新开始构建内容展开操作区
        this.rebuild();
    }

    /**
     * 重建部分内容展开操作区，主要是 img, table, .md-fences 等会因大纲面板的显示/关闭
     * 导致文档宽度变化而引起的内容高度也跟随变化的情况
     * 如在不显示大纲时因宽度较变，高度等比变高，或高度反而变短
     * 会导致应该显示展开操作区即不显示，或不应显示却显示的情况
     */
    this.rebuild = function () {
        // 重建需要重建的部分
        let that = this;
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
        // 若为在新标签打开的，则忽略
        if (VLOOK.doc.newTab === true) {
            this.buildTimers.shift();
            return;
        }

        let container = target.parent(),
            tagName = target.prop("tagName").toLowerCase();

        // 重建时已生成题注，所以实际容器对象与初始化时第一次构建会不同
        if (rebuild === true)
            container = container.parent();

        // 获得上一轮构建时生成的展开操作区，没有则初始为 undefined
        let oldExpander = container.next(),
            className = oldExpander.attr("class");
        if (oldExpander !== undefined) {
            if (className === undefined
                || className.indexOf("mdx-content-expander") === -1)
                oldExpander = undefined;
        }

        // 已被点击展开过了，在重建时则跳过
        if (container.attr("data-vk-content-expanded") === "true"
            && container.attr("data-vk-before-print-folded") !== "true") {
            this.buildTimers.shift();
            return;
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

        // 表格或 Mermaid 图表的特性处理
        if (tagName === "table" || tagName === "svg") {
            container.css({
                "height": this.limit,
                "overflow-x": "auto", // 可横向滚动
                "overflow-y": "hidden"
            });
        }
        // 非表格，非 Mermaid 图表的处理
        else {
            container.css({
                "height": this.limit,
                "overflow": "hidden"
            });
        }

        let expander = undefined,
            rowNumFilter = "table tbody tr",
            w = parseInt(container.css("width"));

        // 上一轮构建时没有生成展开操作区，则生成一个新的
        if (oldExpander === undefined) {
            expander = iContentFolding.ui.clone();
            container.after(expander);
        }
        // 直接复用上一轮构建时生成的展开操作区
        else
            expander = oldExpander;

        // 如果处理对象为表格，先隐藏表格行号，find 过滤器的内容与对应的 css 要同步更新
        if (container.find("table").length > 0)
            container.find(rowNumFilter).addClass("mdx-table-row-num-hidden");

        // 动态生成按钮文本内容
        let btn = expander.find("div > span");
        btn.html(btn.attr("title") + " <span style='font-weight: normal;'>"
            + parseInt((1 - this.limit / tHeight) * 100) + "%</span>");

        // 重新适配展开操作区尺寸
        if (w > parseInt(target.css("width"))) {
            w = target.css("width");
            // 表格、mermarid 插图与比容器宽度小时，右下角不是圆角，须进行适配调整
            expander.css({
                "border-bottom-right-radius": 0
            });
        }
        expander.attr("data-vk-content-type", tagName);
        expander.css({
            "margin-left": container.css("margin-left"),
            "width": w
        });
        // 设置为可视
        expander.css("visibility", "visible");

        // 展开按钮 click 事件处理
        expander.children(".mdx-btn").unbind("click").click(function () {
            VLOOK.report.push(['Interactive', VLOOK.report.transTagName(tagName), 'ExpandLongContent', 0]);

            let expander = $(this).parent(),
                container = expander.prev();

            // 移除内容展开操作区
            expander.remove();

            // 展开对应的内容
            container.attr("data-vk-content-folded", "false");
            container.attr("data-vk-content-expanded", "true");
            container.css({
                "height": "auto"
            });
            // 针对表格、Mermaid 图表增加滚动属性
            if (tagName === "svg" || tagName === "table")
                container.css({
                    "overflow": "auto"
                });

            // 如果处理对象为表格，恢复显示表格行号，find 过滤器的的内容与对应的 css 要同步更新
            if (container.find("table").length > 0)
                container.find(rowNumFilter).removeClass("mdx-table-row-num-hidden");
        });
        // 展开按钮 hover 事件处理
        expander.children(".mdx-btn").hover(function () {
            $(this).addClass("mdx-btn-hover");
        }, function () {
            $(this).removeClass("mdx-btn-hover");
        });
    }
}

// ==================== 工具提示信息类 ==================== //

/**
 * 构造函数
 */
function ToolTips() {
    this.ui = $(".mdx-tool-tips");

    /**
    * 显示工具提示信息
    *
    * @param follow 提示的目标元素
    * @param align 强制指定工具提示的水平对齐方式（auto/left/center/right）
    */
    this.show = function (follow, align) {
        if (env.device.mobile === true)
            return;

        clearTimeout(VLOOK.animate.tipsTimer);

        this.hide();
        this.ui.html(follow.attr("data-vk-tips"));

        const fp = follow.parent();
        const ow = this.ui.width();
        const ww = $(window).width();
        const gap = 30;
        let left = follow.offset().left;
        this.ui.css({
            "border-top-left-radius": "0",
            "border-top-right-radius": "var(--vlook-base-radius)"
        });

        // 指定对齐方式或提示超出屏幕
        if (align !== "auto" || (left + ow + gap) > ww) {
            // align: right
            this.ui.css({
                "border-top-left-radius": "var(--vlook-base-radius)",
                "border-top-right-radius": "0"
            });
            left = follow.offset().left - ow + follow.width() - gap;

            // align: center
            if (align === "center") {
                left = follow.offset().left + (follow.width() - ow) / 2 - gap / 2;
                this.ui.css({
                    "border-top-left-radius": "var(--vlook-base-radius)",
                    "border-top-right-radius": "var(--vlook-base-radius)"
                });
            }
        }

        this.ui.css({
            "left": left,
            "top": fp.offset().top - $(document).scrollTop() + fp.height() +
                (fp.css("background-color") === "rgba(0, 0, 0, 0)" ? 0 : 10)
        });

        let that = this;
        VLOOK.animate.tipsTimer = setTimeout(function () {
            if (VLOOK.ui.effect >= 2)
                that.ui.velocity("fadeIn", {
                    duration: VLOOK.animate.speed
                });
            else
                that.ui.show();
        }, 1000);
    }

    /**
     * 隐藏工具提示
     */
    this.hide = function () {
        VLOOK.doc.scroll.unfreeze();
        clearTimeout(VLOOK.animate.tipsTimer);
        this.ui.hide();
    }
}

// ==================== 弹层提示信息类 ==================== //

/**
 * 构造函数
 *
 * @param mask 遮罩对象
 */
function InfoTips(mask) {
    this.ui = $(".mdx-info-tips");
    let that = this;
    this.ui.unbind("click").click = function () {
        that.hide();
    }
    // 遮罩
    this.mask = mask;
    this.mask.bindPartner(this);

    /**
    * 显示通知提示信息
    *
    * @param message 提示内容
    * @param delay 延时指定 ms 时间后自动关闭提示
    * @param fullscreen 是否为全屏显示
    * @param mask 是否显示遮罩
    */
    this.show = function (message, delay, fullscreen, mask) {
        clearTimeout(VLOOK.animate.tipsTimer);

        this.ui.html(message);
        // 先重置为默认值
        this.ui.css({
            "width": "",
            "height": "",
            "right": "auto",
            "bottom": "auto",
            "border-radius": "var(--vlook-base-radius)"
        });

        // 全屏显示
        if (fullscreen === true) {
            this.ui.css({
                "display": "table", // 配合子元素的 display: table-cell 实现内容的垂直居中
                "width": "100%",
                "height": "100%",
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0,
                "border-radius": 0
            });
        }
        // 非全屏显示
        else {
            VLOOK.ui.showInCenter(this.ui);
        }

        // 动画式显示
        let that = this;
        if (VLOOK.ui.effect >= 2) {
            this.ui.velocity("fadeIn", {
                duration: VLOOK.animate.speed
                }, function () {
                    if (delay != null) // 延时后自动关闭
                        VLOOK.animate.tipsTimer = setTimeout(that.hide, delay);
            });
        }
        else {
            this.ui.show();
            if (delay != null) // 延时后自动关闭
                VLOOK.animate.tipsTimer = setTimeout(that.hide, delay);
        }

        // 冻结滚动
        VLOOK.doc.scroll.freeze();

        // 显示遮罩
        if (mask === true)
            this.mask.show();
    }

    /**
     * 隐藏弹窗信息
     */
    this.hide = function () {
        // 动画式显示
        if (VLOOK.ui.effect >= 2)
            this.ui.velocity("fadeOut", {
                duration: VLOOK.animate.speed
            });
        else
            this.ui.hide();

        this.mask.hide();
    }
}

// ==================== 底部提示信息类 ==================== //

/**
 * 构造函数
 */
function BottomTips() {
    this.ui = $(".mdx-bottom-tips");

    /**
     * 显示底部提示栏
     *
     * @param message 提示内容
     */
    this.show = function (message) {
        this.ui.children("div").html(message);
        if (VLOOK.ui.effect >= 2) {
            ;
        }
        else {
            this.ui.show();
        }
    }

    /**
     * 隐藏底部提示栏
     */
    this.hide = function () {
        if (VLOOK.ui.effect >= 2) {
            ;
        }
        else {
            this.ui.hide();
        }
    }
}

// ==================== 文档更多内容遮罩栏 ==================== //

/**
 * 构造函数
 */
function MoreDocContent() {
    this.ui = $(".mdx-more-doc-content");

    /**
     * 刷新显示更多内容遮罩栏
     *
     * @param scrollTop 文档当前滚动位置，如果为空则自动获取
     */
    this.refresh = function (scrollTop) {
        if (scrollTop === undefined)
            scrollTop = $(document).scrollTop();
        if (scrollTop + $(window).height() > ($(document).height() - 10)) {
            iMoreDocContent.ui.hide();
        }
        else if (VLOOK.doc.newTab === false) {
            iMoreDocContent.ui.show();
        }
    }

    /**
     * 隐藏更多内容遮罩栏
     */
    this.hide = function () {
        iMoreDocContent.ui.hide();
    }
}

// ==================== 题注生成器类 ==================== //

function CaptionGenerator() {}

/**
 * 生成题注
 *
 * @param target 需要添加题注的对象
 */
CaptionGenerator.action = function (target) {
    let tagName = target.prop("tagName").toLowerCase(),
        caption = "";
    // 代码块
    if (tagName === "pre")
        caption = [
            "代码块 ",
            "代碼塊 ",
            "Code Block ",
            "Bloc de Code ",
            "Codeblock ",
            "Bloque de código ",
            "Блок Кода ",
            "コードブロック ",
            "코드 블록 "
        ][VLOOK.lang.id] + (VLOOK.doc.counter.codeBlock + 1);
    // 表格
    else if (tagName === "table")
        caption = [
            "表 ",
            "表 ",
            "Table ",
            "Table ",
            "Tabelle ",
            "Mesa ",
            "Таблица ",
            "テーブル ",
            "표 "
        ][VLOOK.lang.id] + (VLOOK.doc.counter.table + 1);
    // 插图
    else {
        CaptionGenerator.actionForFigureLike(target, tagName);
        return;
    }

    // 有指定的题注文本
    let fcSet = CaptionGenerator.getCaptions(target.parent().prev(), tagName);
    let fc = fcSet[0], // 第 1 题注
        fc2 = fcSet[1]; // 第 2 题注

    if (fc != null && fc.trim().length > 0) {
        // 添加 <span> 用主要用于区分题注是默认无内容的，还是指定内容的
        caption = caption + ": <strong>" + fc + "</strong>";
    }

    // 代码块
    if (tagName === "pre") {
        target.wrap("<div id='code-block-num" + VLOOK.doc.counter.codeBlock
            + "' class='mdx-figure-caption' style='width: 100%'></div>");
    }
    // 表格
    else if (tagName === "table") {
        target.wrap("<div id='tbl-num" + VLOOK.doc.counter.table
            + "' class='mdx-figure-caption'></div>");
    }

    // 添加第 1 题注
    target.before("<p class='mdx-figure-caption-1'>" + caption + "</p>");

    // 添加第 2 题注
    if (fc2 != null && fc2.length > 0) {
        target.after("<p class='mdx-figure-caption-2'>" + fc2 + "</p>");
        target.parent().attr("data-vk-caption-count", "2");
    }
}

/**
 * 针对插图（img、mermaid）生成题注
 *
 * @param target 需要添加题注的对象
 * @param tagName HTML 标签名
 */
CaptionGenerator.actionForFigureLike = function (target, tagName) {
    let fc = target.attr("alt"), // 默认尝试获取图片的 alt 内容作为题注内容
    fc2 = target.attr("title"); // 默认尝试获得图片的 title 作为第二题注内容

    // 尝试获取最近的段落（如<p>、<h6>）作为题注内容
    let fcSet = CaptionGenerator.getCaptions(target.parent().prev().prev(), tagName);
    if ((fc === undefined || fc.trim().length === 0) && fcSet[0] != null) {
        if (fcSet[0] != null)
            fc = fcSet[0];
        if (fcSet[1] != null)
            fc2 = fcSet[1];
    }

    // 插图（img、mermaid）题注前缀
    let caption = [
            "图 ",
            "圖 ",
            "Figure ",
            "La figure ",
            "Zahl ",
            "Figura ",
            "карта ",
            "図 ",
            "그림 "
        ][VLOOK.lang.id] + (VLOOK.doc.counter.figure + 1);
    // 音频题注
    if (tagName === "audio")
        caption = [
            "音频 ",
            "音頻 ",
            "Audio ",
            "l'audio ",
            "Audio ",
            "Audio ",
            "аудио ",
            "オーディオ ",
            "오디오 "
        ][VLOOK.lang.id] + (VLOOK.doc.counter.audio + 1);
    // 视频频题注
    else if (tagName === "video")
        caption = [
            "视频 ",
            "視頻 ",
            "Video ",
            "Vidéo ",
            "Video ",
            "Vídeo ",
            "видео ",
            "ビデオ ",
            "비디오 "
        ][VLOOK.lang.id] + (VLOOK.doc.counter.video + 1);

    // 有指定的题注文本
    if (fc != null && fc.trim().length > 0)
        caption = caption + ": <strong>" + fc + "</strong>";

    // 为插图（mermaid）增加题注
    if (tagName === "svg")
        // 针对 Mermaid 插图，添加额外的类，用于打印前后处理时直接定位 Mermaid 插图的题注
        target.wrap("<div id='fig-num" + VLOOK.doc.counter.figure + "' data-vk-fig-type='" + tagName
            + "' class='mdx-figure-caption mdx-figure-caption-mermaid'></div>");
    // 为插图（img）增加题注
    else if (tagName === "img")
        target.wrap("<div id='fig-num" + VLOOK.doc.counter.figure + "' data-vk-fig-type='" + tagName
            + "' class='mdx-figure-caption'></div>");
    // 为音频增加题注
    else if (tagName === "audio")
        target.wrap("<div id='audio-num" + VLOOK.doc.counter.audio + "' data-vk-fig-type='" + tagName
            + "' class='mdx-figure-caption'></div>");
    // 为视频增加题注
    else if (tagName === "video")
        target.wrap("<div id='video-num" + VLOOK.doc.counter.video + "' data-vk-fig-type='" + tagName
            + "' class='mdx-figure-caption'></div>");

    // 生成第 1 题注、第 2 题注
    target.before("<p class='mdx-figure-caption-1'>" + caption + "</p>");
    if (fc !== undefined && fc2 != null && fc2.length > 0) {
        target.after("<p class='mdx-figure-caption-2'>" + fc2 + "</p>");
    }

    // 修正在 SVG 插图套上题注后的自适应尺寸
    if (tagName === "svg") {
        if (target.attr("height") !== "none" || target.css("height") !== "none") { // 有指定高度的
            target.removeAttr("height");
            target.css("height", "");
        }

        // 调整SVG插图，尽量按其真实插图的大小显示，超出浏览器宽度的，则左右滚动浏览
        if (target.css("max-width") !== "none") // CSS 中指定了最大宽度
            target.parent().css("width", target.css("max-width"));
        else if (target.attr("style").indexOf("width") > -1) // 通过 style 指定了宽度
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
        hideCaptionSrc = false; // img 不隐藏题注，其他情况默认隐藏题注源

    // 双题注的标准语法
    if (getCaptionCount(caption) === 2) {
        fcSet[0] = getCaptionSet(caption, 2)[0];
        fcSet[1] = getCaptionSet(caption, 2)[1];
        hideCaptionSrc = true;
    }
    // 单题注的标准语法
    else if (getCaptionCount(caption) === 1) {
        fcSet[0] = getCaptionSet(caption, 1)[0];
        fcSet[1] = null;
        hideCaptionSrc = true;
    }
    // 无题注语法，但由 h6 引导ss
    else if (captionTagName !== undefined && captionTagName.toLowerCase() === "h6") {
        fcSet[0] = caption.text().trim();
        fcSet[1] = null;
        hideCaptionSrc = true; // 不隐藏题注源
    }

    // 若成功匹配出题注，则隐藏原始内容
    if (tagName !== "img" && hideCaptionSrc === true) {
        caption.hide();
    }
    return fcSet;

    /**
     * 返回匹配的题注数量
     *
     * @return 0/1/2
     */
    function getCaptionCount(target) {
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
     * @return [0] 为第 1 个题注，[1] 为第 2 个题注
     */
    function getCaptionSet(target, count) {
        let fcSet = [],
            text = target.text().trim();
        fcSet[0] = text.substring(2, text.indexOf("]"));
        if (count === 2)
            fcSet[1] = text.substring(text.indexOf("]\"") + 2, text.length - 1);
        return fcSet;
    }
}

// ==================== 代码块增强类 ==================== //

function ExtCodeBlock() {}

/**
 * 初始化代码块
 */
ExtCodeBlock.init = function () {
    $(".md-fences").each(function () {
        let codeBlock = $(this);

        // 外套一个 <p> 标签，用于内容折叠时与插图、表格的 DOM 结构一致
        codeBlock.wrap("<p data-vk-container='pre' style='" +
            "border-radius: 0 0 var(--vlook-base-radius) var(--vlook-base-radius);" +
            "margin-bottom: 20px;" +
            "'></p>");

        // 添加鼠标移入/移出事件
        codeBlock.hover(function () {
            ContentAssist.lastHoverContent = $(this);
            ContentAssist.showCopyCodeBlockButton();
            if (VLOOK.doc.newTab === false)
                ContentAssist.showOpenInNewTabButton();
        }, function () {
            ContentAssist.hideButtons();
        });

        // 折叠长代码块
        iContentFolding.add(codeBlock);

        // 生成代码块插图题注
        CaptionGenerator.action(codeBlock);

        VLOOK.doc.counter.codeBlock++;
    });
}

/**
 * 复制代码块内容增强版（兼容所有浏览器）
 */
ExtCodeBlock.copy = function () {
    VLOOK.report.push(['Interactive', 'CodeBlock', 'Copy', 0]);
    if (ContentAssist.lastHoverContent === undefined)
        return;

    // 逐行读取代码
    let code = "";
    ContentAssist.lastHoverContent.children().find(".CodeMirror-code .CodeMirror-line").each(function () {
        code += $(this).text() + "\n";
    });
    // 将要复制的内容赋予给 clipboard.js 指定的对象属性 data-clipboard-text
    let btnCopyClassName = ".mdx-btn-copy-code-block";
    $(btnCopyClassName).attr("data-clipboard-text", code);

    // 创建 clipboard.js 对象用于实现复制
    let clipboard = new ClipboardJS(btnCopyClassName);
    // 复制成功事件
    clipboard.on("success", function(e) {
        // 显示复制成功提示
        iInfoTips.show([
            "已复制",
            "已復制",
            "Copied",
            "Copié",
            "Kopiert",
            "Copiado",
            "скопированный",
            "コピー済み",
            "복사"
        ][VLOOK.lang.id], 1500, false, true);

        e.clearSelection();
    });
    // 复制失败事件
    clipboard.on("error", function() {
        // 显示复制失败提示
        iInfoTips.show([
            "非常抱歉～暂不支持在该浏览器中复制",
            "非常抱歉～暫不支持在該瀏覽器中復制",
            "I'm very sorry~ I don't support copying in this browser",
            "Je suis vraiment désolé ~ Je ne supporte pas la copie dans ce navigateur",
            "Es tut mir sehr leid ~ Ich unterstütze das Kopieren in diesem Browser nicht",
            "Lo siento mucho ~ No apoyo la copia en este navegador",
            "Я очень сожалею ~ Я не поддерживаю копирование в этом браузере",
            "すみません〜このブラウザでのコピーはサポートしていません",
            "죄송합니다 ~이 브라우저에서 복사를 지원하지 않습니다"
        ][VLOOK.lang.id], 3000, false, true);
    });
}

// ==================== 引用块增强类 ==================== //

function ExtQuote() {}

ExtQuote.icoClosed = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 2px;"><use xlink:href="#icoQuoteClosed" class="mdx-folder2-ico"/></svg>&nbsp;';
ExtQuote.icoOpened = '<svg width="16px" height="16px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 2px;"><use xlink:href="#icoQuoteOpened" class="mdx-folder2-ico"/></svg>&nbsp;';

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
            && next.prop("tagName").toLowerCase() === "blockquote") {

            // 分离折叠引子中的标题
            separateTitle(target);

            target.css("color", "var(--header-color)");
            target.next("blockquote").css({
                // "background": "none",
                "display": "none"
            });
            target.html(target.html().replace("[+] ", "<span class='mdx-blockquote-folder'>" + ExtQuote.icoClosed) + "</span>"); // ▶

            target.attr("data-vk-blockquote-folded", "true");

            // 因此处的 click 会与 $(document).unbind("click").click() 冲突
            // 所以改为 mouseup
            target.find(".mdx-blockquote-folder").unbind("mouseup").mouseup(function () {
                VLOOK.report.push(['Interactive', 'Quote', 'Fold/Unfold', 0]);
                toggleQuoteFolding(target);
            });
        }
        // 默认展开
        else if (text.startsWith("[-] ")) {
            // 分离折叠引子中的标题
            separateTitle(target);

            target.css("color", "var(--header-color)");
            target.html(target.html().replace("[-] ", "<span class='mdx-blockquote-folder'>" + ExtQuote.icoOpened) + "</span>"); // ⊖▽

            target.attr("data-vk-blockquote-folded", "false");

            // 因此处的 click 会与 $(document).unbind("click").click() 冲突
            // 所以改为 mouseup
            target.find(".mdx-blockquote-folder").unbind("mouseup").mouseup(function () {
                VLOOK.report.push(['Interactive', 'Quote', 'Fold/Unfold', 0]);
                toggleQuoteFolding(target);
            });
        }

        // 针对 Dark Mode 进行适配处理
        ExtQuote.adjustColorScheme();
    });

    /**
     * 展开/收起引用块
     *
     * @param target 用于折叠其下引用块对象
     */
    function toggleQuoteFolding(target) {
        if (target.attr("data-vk-blockquote-folded") === "true") {
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
    function separateTitle(target) {
        let firstSpan = target.children("span:first"),
            text = firstSpan.text();
        // 折叠的标题与引子在同一个 <span> 对象内，则需要进行剥离
        if (text.length > 4) {
            let folder = text.substring(0, 4);
            firstSpan.html(firstSpan.replaceHTML(/\[(\+|-)]\s/, ""));
            firstSpan.before("<span>" + folder + "</span>");
        }
    }
}

/**
 * 适配引用在 Light / Dark Mode 的适配处理
 */
ExtQuote.adjustColorScheme = function () {
    // 适配彩虹引用中的 6 级标题样式的处理
    let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink", "brown", "gray", "theme1", "theme2"],
        scheme = ColorScheme.scheme,
        rmScheme = scheme === "dark" ? "light" : "dark";
    for (let i = 0; i < colors.length; i++) {
        $(".mdx-quote-title-" + colors[i])
            .addClass("mdx-quote-title-" + colors[i] + "-" + scheme)
            .removeClass("mdx-quote-title-" + colors[i] + "-" + rmScheme);
    }
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
    if (target.attr("class") !== undefined
        && target.attr("data-vk-blockquote-folded") === "true")
        // 模拟操作
        ExtQuote.unfold(target);
}

// ==================== 表格增强类 ==================== //

function ExtTable() {}

ExtTable.checkboxSyntax = /^\[(\s|x|-)](\s.+)*/; // 复选框列格式语法

// 单元格合并语法
ExtTable.cellMergeSyntax = {
    row : /^(:|\^\^)$/, // 行，纵向合并
    col : /^(==|<<)$/ // 列，横向合并
}

/**
 * 初始化表格数据
 */
ExtTable.init = function () {
    let stopwatch = new Stopwatch();

    // ----------------------------------------
    // 表格预处理
    stopwatch.lapStart();
    $("table").each(function () {
        let table = $(this);

        // 表格索引号
        table.attr("id", "data-vk-tbl-" + VLOOK.doc.counter.table);
        table.parent().attr("data-vk-container", "table");

        // 添加鼠标移入/移出事件
        table.hover(function () {
            ContentAssist.lastHoverContent = $(this);
            // 表格没有被折叠时
            if ($(this).parent().parent().attr("data-vk-content-folded") === "false") {
                // $(this).addClass("mdx-clickable-hover");
                VLOOK.ui.adjustEffect($(this));
            }
            if (VLOOK.doc.newTab === false)
                ContentAssist.showOpenInNewTabButton();
        }, function () {
            // $(this).removeClass("mdx-clickable-hover");
            ContentAssist.hideButtons();
        });

        // 表格滚动事件
        table.parent().scroll(function () {
            let scrollLeft = $(this).scrollLeft();
            // 根据显示时其对应表格的水平滚动的偏移量，调整十字光标的位置
            $("div.mdx-table-cross").each(function () {
                $(this).css({
                    "left": ExtTable.cellCross.lastCellPos[$(this).attr("data-vk-direction")] - scrollLeft
                });
            });
        });

        // 表格单元格初始化处理
        initCell(table);

        // 折叠长表格
        iContentFolding.add(table);

        // 生成表格题注
        CaptionGenerator.action(table);

        VLOOK.doc.counter.table++;
    }); // table
    stopwatch.lapStop("    ├ Table/Prepare: ");

    // ----------------------------------------
    // 表格单元格合并
    stopwatch.lapStart();
    $("table[data-vk-cell-merge='true']").each(function () {
        let table = $(this);
        cellMerge(table);

        // 合并后，针对列头纵向合并的情况二次执行列格式处理
        // ExtTable.columnFormatting.format(table);
        table.find("thead > tr > th").each(function () {
            ExtTable.columnFormatting.init(table, $(this));
        });
    });
    stopwatch.lapStop("    ├ Table/Merge: ");

    // ----------------------------------------
    // 对表格单元格初始化处理中标记为带列格式的表格，进行列格式化处理
    stopwatch.lapStart();
    $("table[data-vk-column-formatting='true']").each(function () {
        ExtTable.columnFormatting.format($(this));
    });
    stopwatch.lapStop("    ├ Table/Column Format: ");

    // ----------------------------------------
    // 表格行折叠
    stopwatch.lapStart();
    $("table[data-vk-row-folding='true']").each(function () {
        let table = $(this);
        ExtTable.rowFolding.init(table);

        // 修正目录行的首个单元格的缩进
        table.find("tr[data-vk-folder='true']").each(function () {
            let td = $(this).children("td:first");
            if (td.attr("data-vk-ident-level") !== undefined)
                td.css("padding-left", "0.5em");
        });

        // 将每层最后一个缩进行的语法前缀符转换为指定字符
        let translatedLevel = [];
        $(table.find(".mdx-table-rowfolding-sub").get().reverse()).each(function () {
            let td = $(this),
                parentId = td.parent().attr("data-vk-parent-folder-id"),
                level = td.attr("data-vk-ident-level"),
                key = "-" + parentId + "-" + level + "-";
            if (translatedLevel.includes(key) === false) {
                translatedLevel.push(key);
                td.parent().next().find(".mdx-table-rowfolding-identer:last")
                    .prev().removeClass("mdx-table-rowfolding-identer")
                    .addClass("mdx-table-rowfolding-identer-blank");
            }
        });
    });
    stopwatch.lapStop("    └ Table/Row Folding: ");

    /**
     * 表格单元格初始化
     *
     * @param table 表格对象
     */
    function initCell(table) {
        // 遍历表格「列头」行
        let colIndex = 0;
        table.find("thead > tr").each(function () {
            colIndex = 0;
            let needCheckCellMerge = true,
                needCheckColumnFormatting = true;

            // 遍历单元格
            $(this).find("th").each(function () {
                let cell = $(this);

                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === true
                    && table.attr("data-vk-cell-merge") !== "true"
                    && (ExtTable.cellMergeSyntax.row.test(cell.text()) === true
                        || ExtTable.cellMergeSyntax.col.test(cell.text()) === true)) {
                    // 将表格标记为带合并单元格语法
                    table.attr("data-vk-cell-merge", "true");
                    needCheckCellMerge = false;
                }

                // 检测是否带列格式语法
                if (needCheckColumnFormatting === true) {
                    if (ExtTable.columnFormatting.init(table, cell) === true)
                        needCheckColumnFormatting = false;
                }

                // ---------- 单元格高亮样式处理 ----------
                // 添加列号标识，用于列格式化时使用
                cell.attr("data-vk-tbl-col", "data-vk-tbl-" + VLOOK.doc.counter.table + "-" + colIndex);
                colIndex++;

                // ---------- 非列头的单元格十字光标处理 ----------
                // 鼠标点击单元格时显示十字光标
                ExtTable.cellCross.bind(table, cell);
            });
        });

        // 遍历表格「非列头」行
        table.find("tbody > tr").each(function () {
            let colIndex = 0,
                needCheckCellMerge = true,
                needCheckRowFolding = true;

            // 遍历单元格
            $(this).find("td").each(function () {
                let cell = $(this);

                // ---------- 表格排版增强预处理 ----------
                // 检测是否带合并单元格语法
                if (needCheckCellMerge === true
                    && table.attr("data-vk-cell-merge") !== "true"
                    && (ExtTable.cellMergeSyntax.row.test(cell.text()) === true
                        || ExtTable.cellMergeSyntax.col.test(cell.text()) === true)) {
                    // 将表格标记为带合并单元格语法
                    table.attr("data-vk-cell-merge", "true");
                    needCheckCellMerge = false;
                }

                // 检测是否带行折叠语法
                if (needCheckRowFolding === true
                    && colIndex === 0 // 只检测第 1 列
                    && table.attr("data-vk-row-folding") !== "true"
                    && ExtTable.rowFolding.syntaxTag.test(cell.text()) === true) {
                    // 将表格标记为带行折叠语法
                    table.attr("data-vk-row-folding", "true");
                    needCheckRowFolding = false;
                }

                // 对于单元格的内容，都以 <mark> 标签包裹的，则转换为单元格的样式
                // 同时转换后，在 Table.columnFormatting 的 init 处理中对应添加对应的过滤条件
                if (/^<mark>.+<\/mark>$/.test(cell.html()) === true) {
                    cell.children().children().unwrap(); // 解包 <mark>
                    cell.addClass("mdx-table-column-format-mark");
                }

                // ---------- 单元格高亮样式处理 ----------
                // 添加列号标识，用于列格式化时使用
                cell.attr("data-vk-tbl-col", "data-vk-tbl-" + VLOOK.doc.counter.table + "-" + colIndex);
                colIndex++;

                // ---------- 列头的单元格十字光标处理 ----------
                // 鼠标点击单元格时显示十字光标
                ExtTable.cellCross.bind(table, cell);
            }); // find(th, td)
            // colIndex = 0;
        }); // find(tr)
    }

    /**
     * 表格单元格合并
     */
    function cellMerge(table) {
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

        table.find("tr").each(function () {
            tblData[rowIndex] = [];
            tblSpan[rowIndex] = [];
            let tr = $(this);
            tr.find("td, th").each(function () {
                let cell = $(this);

                // --- 行合并预处理 ---
                // 克隆表格数据
                tblData[rowIndex][colIndex] = cell;
                tblSpan[rowIndex][colIndex] = 0;
                if (ExtTable.cellMergeSyntax.row.test(cell.text()) === true) {
                    tblSpan[rowIndex][colIndex] = 1;
                    needRowSpan = true;
                }
                colIndex++;
                colCount++;

                // --- 列合并 ---
                // 是列合并标记
                if (ExtTable.cellMergeSyntax.col.test(cell.text()) === true) {
                    colSpanCount++;
                    cell.remove();
                    if (colSpanCount === 1)
                        colSpanCell = lastCell;
                }
                // 不是列标记，则进行最近列标记数据进行处理
                else {
                    if (colSpanCount > 0 && colSpanCell != null) {
                        colSpanCell.attr("colspan", colSpanCount + 1);
                        colSpanCell.css("text-align", "center");
                    }
                    colSpanCount = 0;
                }
                lastCell = cell;
            }); // find(td, th)

            // 如果列合并了所有列，则取消表格行号等样式
            if (colCount === colSpanCount + 1) {
                tr.addClass("mdx-table-colspan-all");
                tr.children().css("padding-left", "5px");
            }

            // 列合并（对于最后一列的补充处理）
            if (colSpanCount > 0 && colSpanCell != null) {
                colSpanCell.attr("colspan", colSpanCount + 1);
                colSpanCell.css("text-align", "center");
            }
            colSpanCount = 0;

            rowIndex++;
            colIndex = 0;
            colCount = 0;
        }); // tr

        rowIndex = 0;

        // 行合并
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
                            rowSpanCount = 0;
                            rowSpanCell = null;
                        }
                    }
                    r++;
                } // while
                // 单元格行合并（对于最后一行的补充处理）
                if (rowSpanCount > 0 && rowSpanCell != null) {
                    rowSpanCell.attr("rowspan", rowSpanCount + 1);
                    rowSpanCell.css("text-align", "center");
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
                        colspan = $(this).attr("data-vk-colspan");
                    // 转换为 th 标签
                    let th = $(this).contents().unwrap().wrap('<th/>');
                    // 将暂存的 td 的属性数据，恢复到新标签中
                    th.parent().attr("style", style);
                    th.parent().attr("data-vk-tbl-col", tblCol);
                    th.parent().attr("class", classValue);
                    th.parent().attr("data-vk-colspan", colspan);
                });
            }
        } // if

        needRowSpan = false;
    }
}

/**
 * 表格单元格十字光标
 *
 * @param table 目标表格
 */
ExtTable.cellCross = {
    // 最后/当前显示十字光标的表格
    lastTable : undefined,

    // 最后/当前显示十字光标的表格单元格
    lastCell : undefined,

    // 表格十字光标四条边的位置
    lastCellPos : {},

    /**
     * 绑定单元格，鼠标点击单元格时显示十字光标
     *
     * @param table 单元格所属表格对象
     * @param cell 单元格对象
     */
    bind : function (table, cell) {
        cell.unbind("click").click(function () {
            VLOOK.report.push(['Interactive', 'Table', 'CellCross', 0]);

            if (table.parent().parent().attr("data-vk-content-folded") === "true")
                return;

            ExtTable.cellCross.hide(false);
            if (iParagraphNav !== undefined)
                iParagraphNav.hide();

            ExtTable.cellCross.lastCell = cell;
            ExtTable.cellCross.lastTable = table;

            let tdH = parseInt(ExtTable.cellCross.lastCell.css("height")),
                tdW = parseInt(ExtTable.cellCross.lastCell.css("width")),
                tbW = parseInt(ExtTable.cellCross.lastTable.css("width")),
                scrollLeft = table.parent().parent().scrollLeft();

            // 横向左边
            let crossLeft = $(".mdx-table-cross-left"),
                w = ExtTable.cellCross.lastCell.offset().left - ExtTable.cellCross.lastTable.offset().left;
                crossLeft.css({
                "top": ExtTable.cellCross.lastCell.offset().top,
                "left": ExtTable.cellCross.lastTable.offset().left,
                "height": tdH,
                "width": w,
                "z-index": 9
            });
            ExtTable.cellCross.adjust(crossLeft, w, scrollLeft);

            // 横向右边
            let crossRight = $(".mdx-table-cross-right");
            w = ExtTable.cellCross.lastTable.offset().left + tbW - ExtTable.cellCross.lastCell.offset().left - tdW;
            crossRight.css({
                "top": ExtTable.cellCross.lastCell.offset().top,
                "left": ExtTable.cellCross.lastCell.offset().left + tdW,
                "height": tdH,
                "width": w,
                "z-index": 9
            });
            ExtTable.cellCross.adjust(crossRight, w, scrollLeft);

            // 竖向上边
            let crossUp = $(".mdx-table-cross-up"),
                h = ExtTable.cellCross.lastCell.offset().top - ExtTable.cellCross.lastTable.offset().top;
                crossUp.css({
                "top": ExtTable.cellCross.lastTable.offset().top,
                "left": ExtTable.cellCross.lastCell.offset().left,
                "height": h,
                "width": tdW,
                "z-index": 9
            });
            ExtTable.cellCross.adjust(crossUp, h, scrollLeft);

            // 竖向下边
            let crossDown = $(".mdx-table-cross-down");
            h = ExtTable.cellCross.lastTable.offset().top + parseInt(ExtTable.cellCross.lastTable.css("height")) -
                ExtTable.cellCross.lastCell.offset().top - tdH;
            crossDown.css({
                "top": ExtTable.cellCross.lastCell.offset().top + tdH,
                "left": ExtTable.cellCross.lastCell.offset().left,
                "height": h,
                "width": tdW,
                "z-index": 9
            });
            ExtTable.cellCross.adjust(crossDown, h, scrollLeft);

            event.stopPropagation(); // 停止事件冒泡
        });
    },

    /**
     * 适配调整表格十字光标位置、显示
     *
     * @param target 十字光标任意边的对象实例（左/右/上/下）
     * @param limit 指定要进行隐藏判断的尺寸（宽度或高度），小于该值则不显示对应的 target
     * @param scrollLeft 表格水平滚动的偏移量
     */
    adjust : function (target, limit, scrollLeft) {
        if (limit < 5) // 任意边的尺寸（宽度或高度）小于最小值时隐藏
            target.hide();
        else {
            // 动画式显示
            if (VLOOK.ui.effect >= 2)
                target.velocity("fadeIn", {
                    duration: VLOOK.animate.speed
                });
            else
                target.show();
        }
        // 保存最后显示的十字光标任意边的 left 值及水平方向上的滚动偏移量
        ExtTable.cellCross.lastCellPos[target.attr("data-vk-direction")] =  parseInt(target.css("left")) + scrollLeft;
    },

    /**
     * 隐藏表格十字光标
     *
     * @param animate 隐藏的过程是否启用动画
     */
    hide : function (animate) {
        if (ExtTable.cellCross.lastCell === undefined)
            return;

        if (animate === true) {
            // 动画式显示
            if (VLOOK.ui.effect >= 2)
                $(".mdx-table-cross").velocity("fadeOut", {
                    duration: VLOOK.animate.speed
                });
            else
                $(".mdx-table-cross").hide();
        }
        else
            $(".mdx-table-cross").hide();

        ExtTable.cellCross.lastCell = undefined;
        ExtTable.cellCross.lastTable = undefined;
    },

    /**
     * 判断当前内容块是否与已显示了十字光标的表格重叠
     */
    checkFallWith : function (target) {
        return (ExtTable.cellCross.lastTable !== undefined
            && target.children().attr("id") === ExtTable.cellCross.lastTable.attr("id"));
    }
}

/**
 * 表格整列格式化
 */
ExtTable.columnFormatting = {
    /**
     * 初始化
     *
     * @param table 表格对象
     * @param cell 单元格对象
     */
    init : function (table, cell) {
        if (table.attr("data-vk-column-formatting") !== "true"
            && (cell.find("strong, em, u, mark, del").length > 0 // 普通列格式
                || cell.css("text-align") === "right" // 右对齐表示使用数值格式
                || ExtTable.checkboxSyntax.test(cell.text()) === true)) {
            // 将表格标记为带列格式语法
            table.attr("data-vk-column-formatting", "true");
            return true; // 匹配到列格式
        }
        return false; // 未匹配到列格式
    },

    /**
     * 返回表格内所有非合并的同列单元格对象集合
     *
     * @param th 列头单元格对象
     * @param cells 集合变量
     */
    getCells : function (th, cells) {
        if (cells === undefined)
            cells = $("[data-vk-colspan!='true'][data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']");
        return cells;
    },

    /**
     * 返回表格 tbody 内的同列单元格对象集合
     *
     * @param th 列头单元格对象
     * @param tbodyCells 集合变量
     */
    getTbodyCells : function (th, tbodyCells) {
        if (tbodyCells === undefined)
            tbodyCells = $("tbody [data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']");
        return tbodyCells;
    },

    /**
     * 列格式化
     *
     * @param table 表格对象
     */
    format : function (table) {
        table.find("thead th, thead td").each(function () {
            let th = $(this),
                cells = undefined,
                tbodyCells = undefined,
                cellsCSS = "";

            // 粗体
            if (th.find("strong:first-child").length > 0) {
                cells = ExtTable.columnFormatting.getCells(th, cells);
                cellsCSS += "mdx-table-column-format-bold ";
            }
            // 斜体
            if (th.find("em:first-child").length > 0) {
                cells = ExtTable.columnFormatting.getCells(th, cells);
                cellsCSS += "mdx-table-column-format-em ";
            }
            // 高亮
            if (th.find("mark:first-child").length > 0
                || th.attr("class") !== undefined
                && th.attr("class").indexOf("mdx-table-column-format-mark") > -1) {
                $("[data-vk-tbl-col='" + th.attr("data-vk-tbl-col") + "']").find("mark").children().unwrap();
                cells = ExtTable.columnFormatting.getCells(th, cells);
                cellsCSS += "mdx-table-column-format-mark ";
            }
            // 批量添加以上列样式
            if (cellsCSS.length > 0)
                cells.addClass(cellsCSS);

            // 下划线
            if (th.find("u:first-child").length > 0) {
                tbodyCells = ExtTable.columnFormatting.getTbodyCells(th, tbodyCells);
                tbodyCells.contents().wrap("<u></u>");
            }

            // 删除线
            if (th.find("del:first-child").length > 0) {
                tbodyCells = ExtTable.columnFormatting.getTbodyCells(th, tbodyCells);
                tbodyCells.contents().wrap("<del></del>");
            }

            // 复选框
            if (ExtTable.checkboxSyntax.test(th.text()) === true) {
                cells = ExtTable.columnFormatting.getCells(th, cells);
                cells.addClass("mdx-table-column-format-checkbox");

                // 删除列头的复选框语法
                ExtTable.columnFormatting.removeCheckboxSyntax(th);

                tbodyCells = ExtTable.columnFormatting.getTbodyCells(th, tbodyCells);
                tbodyCells.each(function () {
                    let ce = $(this),
                        syntaxText = ce.text(),
                        chkStatus = "uncheck",
                        chkStyle = "dark";

                    // 移除单元格的复选框语法内容
                    ExtTable.columnFormatting.removeCheckboxSyntax(ce);

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
            if (th.css("text-align") === "right") {
                tbodyCells = ExtTable.columnFormatting.getTbodyCells(th, tbodyCells);
                // 设置为等宽字体
                tbodyCells.addClass("mdx-table-column-format-number");
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
                        ExtTable.columnFormatting.coloringNumber(ce, text, true);
                    }
                    // 内容为百分数
                    else if (text.isPercent()) {
                        // 对小数进行处理
                        ce.html(VLOOK.formatting.percent( // 对小数进行处理
                            VLOOK.formatting.decimal(ce.html()))); // 对百分数进行格式化处理
                        // 根据正负号进行着色处理
                        let coloring = ExtTable.columnFormatting.coloringNumber(ce, text, true),
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
                            "background": "linear-gradient(90deg, " + bg1 + " 0%, " + bg2 + " " + (percentValue > 1 ? percentValue - 1 : 0)
                            + "%, " + bgSplit + " " + percent
                            + ", transparent " + percent + ")",
                            "min-width": "100px"
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
                        ExtTable.columnFormatting.coloringNumber(ce, text, false);
                    }
                });
            } // 数值格式

            // 标记单元格是否为横向合并，横向合并的单元不应用列格式
            if (th.attr("colspan") !== undefined)
                th.attr("data-vk-colspan", "true");
            else
                th.attr("data-vk-colspan", "false");
        });
    },

    /**
     * 根据数值的正、负号进行着色处理
     *
     * @param target 着色的对象
     * @param text 依据的数值文本
     * @param mode 正负号位置模式，true：在开头，false: 在任意位置
     *
     * @return 着色结果，true：有着色，false：没有着色
     */
    coloringNumber : function (target, text, mode) {
        // 正、负号在文本的开头
        if (mode === true) {
            if (text.startsWith("-")) {
                target.addClass("mdx-table-column-format-number-negative");
                return true;
            }
            else if (text.startsWith("+")) {
                target.addClass("mdx-table-column-format-number-positive");
                return true;
            }
        }
        // 正、负号在文本的任意位置
        else {
            if (text.indexOf("-") > -1) {
                target.addClass("mdx-table-column-format-number-negative");
                return true;
            }
            else if (text.indexOf("+") > -1) {
                target.addClass("mdx-table-column-format-number-positive");
                return true;
            }
        }
        return false;
    },

    /**
     * 移除复选框的语法内容
     */
     removeCheckboxSyntax : function (target) {
        target.replaceHTML(/\[(\s|x|-)]\s*/, "");
    }
}

/**
 * 表格行折叠处理
 */
ExtTable.rowFolding = {
    folderCount : 0, // 折叠行内目录行类型的数量
    syntaxTag : /^>+(\s)./, // 用于匹配行折叠语法
    syntaxTag2Replace : /(&gt;)+(\s)/, // 用于匹配将行折叠语法替换为指定字符
    spliter : "> ", // 行折叠语法与内容的分隔标识
    parentStack : [], // 上级行的堆栈
    colorStack : [], // 不同分组的背景颜色堆栈

    // 表格折叠行图标：已收起
    iconClosed : '<svg width="12px" height="12px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 5px;"><use xlink:href="#icoTableRowClosed" class="mdx-folder2-ico"/></svg>',
    // 表格折叠行图标：已展开
    iconOpened : '<svg width="12px" height="12px" style="display: inline-block; vertical-align: middle; margin-top: -4px; margin-right: 5px;"><use xlink:href="#icoTableRowOpened" class="mdx-folder2-ico"/></svg>',

    /**
     * 初始化
     *
     * @param table 表格对象
     */
    init : function (table) {
        // 若不是在新标签打开的，将第 1 列的设置缩进样式
        if (VLOOK.doc.newTab === false) {
            table.find("[data-vk-tbl-col$='-0']").addClass("mdx-table-rowfolding-not-folder");
        }

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
            if (ExtTable.rowFolding.syntaxTag.test(text) === false) {
                lastLevel = 0;
                ExtTable.rowFolding.parentStack.length = 0;
                ExtTable.rowFolding.colorStack.length = 0;
                return true;
            }

            // 从语法中获得当前缩进等级
            currentLevel = text.indexOf(ExtTable.rowFolding.spliter) + 1;
            // 当前等级比上一次等级要深
            if (currentLevel > lastLevel) {
                let beforeChanged = lastLevel;
                lastLevel = currentLevel;
                // 设置为新的目录行
                let bgColor = randomColor.format(randomColor.dissimilarRgb(), "var(--table-rowfolding-alpha)"); // light 和 dark 使用不同的透明度

                ExtTable.rowFolding.newFolder(tr, bgColor, currentLevel, beforeChanged === 0);
                // 设置为行缩进行
                ExtTable.rowFolding.ident(tr, td, currentLevel);
            }
            // 当前等级不比上一次等级要深
            else {
                // 获得等级差进行
                let count = lastLevel - currentLevel;
                // 获得当前行对应的上级行
                if (count > 0) {
                    for (let i = 0; i < count; i++) {
                        ExtTable.rowFolding.parentStack.pop();
                        ExtTable.rowFolding.colorStack.pop();
                    }
                }
                lastLevel = currentLevel;
                // 设置为行缩进行
                ExtTable.rowFolding.ident(tr, td, currentLevel);
            }
        });

        // 因为在新标签中打开的内容已无未解析的含语法的原始内容
        // 所以须对已解析后的对象直接进行绑定鼠标事件
        if (VLOOK.doc.newTab === true) {
            $(".mdx-table-rowfolding-button").each(function () {
                let folderRow = $(this).parent().parent();
                $(this).unbind("click").click(function () {
                    ExtTable.rowFolding.toggle(folderRow);
                });
            });
        }
    },

    /**
     * 获得最近一个分组目录行对象
     */
    lastParent : function () {
        return ExtTable.rowFolding.parentStack[ExtTable.rowFolding.parentStack.length - 1];
    },

    /**
     * 获得最近一个分组颜色对象
     */
    lastColor : function () {
        return ExtTable.rowFolding.colorStack[ExtTable.rowFolding.colorStack.length - 1];
    },

    /**
     * 设置为新的目录行
     *
     * @param tr 对应的行对象
     * @param color 该分组背景色
     * @param level 缩进层级
     * @param reset 是否重置回第一级
     */
    newFolder : function (tr, color, level, reset) {
        let folderRow = tr.prev();
        ExtTable.rowFolding.folderCount++;

        // 将当前目录行的 id 入栈
        ExtTable.rowFolding.parentStack.push(ExtTable.rowFolding.folderCount);
        // 生成分组的随机背景颜色
        ExtTable.rowFolding.colorStack.push(color);

        // 设置折叠目录行的属性
        folderRow.attr("data-vk-folder-id", ExtTable.rowFolding.folderCount);
        folderRow.attr("data-vk-folder", "true");
        folderRow.attr("data-vk-row-folded", "true");

        // 上一行没有背景
        let c1 = folderRow.prev().css("background-color");
        if (c1 === "rgba(0, 0, 0, 0)" || reset === true) {
            folderRow.css({
                "background-color" :
                    ExtTable.rowFolding.lastColor()
            });
        }
        // 上一行有背景色，则采用组合背景色表达相关性
        else {
            let c2 = ExtTable.rowFolding.lastColor(),
                c1Width = level * 50;
            folderRow.css({
                "background" :
                    "linear-gradient(135deg, " + c1 + " " + c1Width + "px, "
                    + c2 + " " + c1Width + "px)"
            });
        }

        // 获得折叠目录行首个单元格
        let td = folderRow.children("td:first"),
            tdSpan = td.children("span"),
            tdHadIdent = td.children(".mdx-table-rowfolding-identer:last");

        // 添加代表目录的括号及样式
        tdSpan.html("[<strong>" + tdSpan.html() + "</strong>]");

        // 设置折叠控件样式
        if (tdHadIdent.length > 0)
            tdHadIdent.after("<span class='mdx-table-rowfolding-button'>" + ExtTable.rowFolding.iconClosed + "</span>");
        else
            td.prepend("<label class='mdx-table-rowfolding-button'>" + ExtTable.rowFolding.iconClosed + "</label>");

        // 调整折叠行的缩进样式
        td.removeClass("mdx-table-rowfolding-not-folder");
        td.addClass("mdx-table-rowfolding-folder");
        tdHadIdent.addClass("mdx-table-rowfolding-identer-folder");

        // 设置展开、收起事件
        td.children(".mdx-table-rowfolding-button:first").click(function () {
            ExtTable.rowFolding.toggle(folderRow);
        });
    },

    /**
     * 展开、收起表格表分组下的表格行
     *
     * @param folderRow 折叠按钮所在的表格行对象
     */
    toggle : function (folderRow) {
        // 取消事件冒泡，用于避免显示表格的十字光标
        event.stopPropagation();

        // 处理目录行的打开、关闭
        if (folderRow.attr("data-vk-row-folded") === "true")
            ExtTable.rowFolding.open(folderRow);
        else
            ExtTable.rowFolding.close(folderRow);

        // 强制取消表格的十字光标
        ExtTable.cellCross.hide();
    },

    /**
     * 设置为缩进行
     *
     * @param tr 对应的行对象
     * @param td 对应的行的首个单元格
     * @param level 缩进层级
     */
    ident : function (tr, td, level) {
        // 统一缩进节点符号转换，尾行在完成的有处理后再进行修正
        td.replaceHTML(ExtTable.rowFolding.syntaxTag2Replace, "");

        // 设置被折叠行的属性
        tr.attr("data-vk-parent-folder-id", ExtTable.rowFolding.lastParent());
        // 设置被折叠行的背景色，层级越深颜色越深
        tr.css("background-color", ExtTable.rowFolding.lastColor());
        // 设置缩进样式
        td.attr("data-vk-ident-level", level);
        td.addClass("mdx-table-rowfolding-sub");

        // 生成缩进占位元素
        for (let i = 0; i < level; i++) {
            let identer = td.children(".mdx-table-rowfolding-identer:last"),
                identObj = "<label class='mdx-table-rowfolding-identer'></label>";
            if (identer.length > 0)
                identer.after(identObj);
            else
                td.prepend(identObj);
        }

        // 隐藏被折叠的行
        tr.css("display", "table-column");
    },

    /**
     * 打开表格目录行
     *
     * @param folderRow 目录行对象
     */
    open : function (folderRow) {
        let id = folderRow.attr("data-vk-folder-id"),
            subRows = $("tr[data-vk-parent-folder-id='" + id + "']"),
            folderButton = folderRow.children("td:first").children(".mdx-table-rowfolding-button:last");

        folderRow.attr("data-vk-row-folded", "false");
        folderButton.prop("innerHTML", ExtTable.rowFolding.iconOpened);
        subRows.css("display", "");
    },

    /**
     * 关闭折叠表格目录行
     *
     * @param folderRow 目录行对象
     */
    close : function (folderRow) {
        let id = folderRow.attr("data-vk-folder-id"),
            subRows = $("tr[data-vk-parent-folder-id='" + id + "']"),
            folderButton = folderRow.children("td:first").children(".mdx-table-rowfolding-button:last");

        folderRow.attr("data-vk-row-folded", "true");
        folderButton.prop("innerHTML", ExtTable.rowFolding.iconClosed);

        // 折叠所有子行（包括目录行）
        subRows.each(function () {
            let tr = $(this);
            if (tr.attr("data-vk-folder") === "true")
                ExtTable.rowFolding.close(tr);
            tr.css("display", "table-column");
        });
    }
}

// ==================== 音频增强类 ==================== //

function ExtAudio() {}

ExtAudio.icon = {
    loading : '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoLoading"></use></svg>',
    play : '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoPlay"></use></svg>',
    pause : '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoPause"></use></svg>',
    stop : '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoStop"></use></svg>',
    forbidden : '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoForbidden"></use></svg>',
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
            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = transToAudio(audioLike, src);
            // 设置 audio id 用于自定义 mini 控件
            audio.attr("id", "v-audio-" + VLOOK.doc.counter.audio);

            // 添加音频播放 mini 控件
            audio.after("<div id='v-audio-" + VLOOK.doc.counter.audio + "-control"
                + "' class='mdx-audio-mini-control'></div>");

            // 开始加载音频
            audio.bind("loadstart", function () {
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.addClass("mdx-audio-mini-control-loading");
                controls.html(ExtAudio.icon.loading);
            });

            // 音频就绪可以开始播放
            audio.bind("canplay", function () {
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.removeClass("mdx-audio-mini-control-loading");

                // 绑定点击事件
                controls.unbind("click").click(function () {
                    play(this, audio[0]);
                });
                controls.html(ExtAudio.icon.play);
                controls.attr("data-vk-pause", params["pause"]);

                // 须显示持续时长
                if (params["duration"] === "true"
                    && audio.attr("v-display-duration") !== "true") {
                    // 计算音频时长
                    let duration = audio[0].duration,
                        min = Math.floor(duration / 60),
                        sec = Math.floor(duration -  min * 60);
                    let minStr = min > 0 ? "<strong>" + min + "</strong>′" : "";
                    audio.next().after(" <sup class='mdx-duration-info' style='color: var(--header-color)'>" + minStr + "<strong>" + sec + "</strong>″</sup>");
                    audio.attr("v-display-duration", "true");
                }
            });

            // 正在播放
            audio.bind("playing", function () {
                let controls = $("#" + $(this).attr("id") + "-control"),
                    pause = controls.attr("data-vk-pause");

                controls.addClass("mdx-audio-mini-control-playing");

                // 支持暂停播放
                if (pause !== undefined && pause === "true") {
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
                controls.removeClass("mdx-audio-mini-control-playing");
            });

            // 故障或不可用
            audio.bind("emptied", function () {
                let controls = $("#" + $(this).attr("id") + "-control");
                controls.removeClass("mdx-audio-mini-control-loading");
                controls.html(ExtAudio.icon.forbidden);
                controls.removeClass("mdx-audio-mini-control");
                controls.addClass("mdx-audio-mini-control-disabled");
            });

            // 加载错误
            audio.bind("error", function () {
                audio.trigger("emptied");
            });
        }
        // 标准控件模式
        else {
            // 先根据插图的语法生成题注
            CaptionGenerator.actionForFigureLike(audioLike, "audio");

            // 将 URL 为音频资源的 img 标签转换为 audio
            audio = transToAudio(audioLike, src);
            // 设置 audio 为标准控件
            audio.attr("controls", "controls");

            // 若有第 2 题注，则微调样式
            if (audio.next(".mdx-figure-caption-2").length > 0)
                audio.css("margin-bottom", "-10px");
        }

        VLOOK.doc.counter.audio++;
    });

    /**
     * 转换为 audio 标签
     *
     * @param audioLike 类 audio 标签（即 src 为音频的 img 标签)
     * @param src 音频 URL
     */
    function transToAudio(audioLike, src) {
        let tips = ["您的浏览器不支持音频标签。",
            "您的瀏覽器不支持音頻標籤。",
            "Your browser does not support the <audio> tag.",
            "Votre navigateur ne prend pas en charge la balise <audio>.",
            "Ihr Browser unterstützt das <audio> -Tag nicht.",
            "Su navegador no es compatible con la etiqueta <audio>.",
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
    function play(self, audio) {
        let controls = $(self);

        // 已暂停、未播放
        if (audio.paused === true) {
            audio.play();
        }
        // 播放中
        else {
            controls.html(ExtAudio.icon.play);
            controls.removeClass("mdx-audio-mini-control-playing");
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
            src = videoLike.attr("src");

        // 先根据插图的语法生成题注
        CaptionGenerator.actionForFigureLike(videoLike, "video");

        // 将 URL 为音频资源的 img 标签转换为 video
        transToVideo(videoLike, src);

        VLOOK.doc.counter.video++;
    });

    /**
     * 转换为 video 标签
     *
     * @param videoLike 类 video 标签（即 src 为视频的 img 标签)
     * @param src 视频 URL
     */
    function transToVideo(videoLike, src) {
        let tips = ["您的浏览器不支持视频标签。",
            "您的瀏覽器不支持視頻標籤。",
            "Your browser does not support the <video> tag.",
            "Votre navigateur ne prend pas en charge la balise <video>.",
            "Ihr Browser unterstützt das <video> -Tag nicht.",
            "Su navegador no es compatible con la etiqueta <video>.",
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

// ==================== 插图增强类 ==================== //

function ExtFigure() {}

/**
 * 初始化插图数据
 */
ExtFigure.init = function () {
    let ignoreImgLost = false,
        stopwatch = new Stopwatch();

    // ----------------------------------------
    stopwatch.lapStart();
    // 针对 Mermaid 饼图为双 SVG 结构（标准的 Mermaid 是单 SVG 结构），进行规范化调整
    $(".md-diagram-panel > svg > svg > g").each(function () {
        $(this).unwrap();
    });
    stopwatch.lapStop("    ├ Figure/1: ");

    // ----------------------------------------
    stopwatch.lapStart();
    // 对所有插图（图片、Mermaid 图、插图导航的插图）进行初始化处理
    // p > .md-image:not(:only-child) img 是指 p 内只有 img 的才被视为插图
    $("p > img:only-child, p > .md-image:only-child img, img[src*='mode=figure'], img[src*='mode=icon'], .md-diagram-panel svg, .mdx-figure-content svg").each(function () {
        let fig = $(this),
            src = fig.attr("src"),
            tagName = fig.prop("tagName").toLowerCase();

        // img 插图的处理 1
        let params = null;
        if (tagName === "img") {
            params = VLOOK.util.getQueryParams(src);

            // 加载检查
            bindLoadChecker(fig, src);

            // 初始化图片背景的适配处理
            initBackground(fig, params);

            // 初始化图片颜色替换的适配处理
            initFillAlter(fig, params, src);

            // 初始化图片对颜色方案的适配处理
            initColorScheme(fig, params);

            // 初始化图片对高分屏的适配处理
            initHighDPI(fig, params);

            // 跳过带指定显示版式的图片
            if (src.indexOf("mode=icon") > -1
                || src.indexOf("mode=logo") > -1) {
                ExtFigure.adjustColorScheme(false);
                // 进行一下轮循环
                return true;
            }
        }

        // 添加插图标识数据
        fig.attr({
            "fig-id": "mdx-figure-" + VLOOK.doc.counter.figure,
            "fig-idx": VLOOK.doc.counter.figure
        });

        // 添加插图样式
        fig.css("cursor", "pointer");
        fig.addClass("mdx-figure");

        // 添加锚点，便于在插图导航直接跳转至对应插图位置（在新标签打开时不添加））
        if (VLOOK.doc.newTab === false)
            $("<a name='" + "fig-idx" + VLOOK.doc.counter.figure + "' style='position: absolute'>").insertBefore(fig.parent());

        // 添加鼠标单击事件
        fig.unbind("click").click(function () {
            if (VLOOK.doc.newTab === false)
                iFigureViewer.show(fig);
        });
        // 添加鼠标移入/移出事件
        fig.hover(function () {
            ContentAssist.lastHoverContent = $(this);

            if (VLOOK.doc.newTab === false) {
                $(this).addClass("mdx-OINTable-hover");
                ContentAssist.showOpenInNewTabButton();
            }
        }, function () {
            $(this).removeClass("mdx-OINTable-hover");
            ContentAssist.hideButtons();
        });

        // img 插图的处理 2
        if (tagName === "img") {
            let container = fig.parent();

            // 确保 img 有独立的父容器，一般情况下 Typora 导出的为 <p>
            if (container.prop("tagName").toLowerCase() !== "p") {
                fig.wrap("<p></p>");
                container = fig.parent();
            }

            // 为父容器增加 img 容器标识，用于折叠内容时使用
            container.attr("data-vk-container", "img");
            container.css({
                "border-radius": "16px",
                "margin-bottom": "20px"
            });

            // 初始化对齐方式
            initAlign(container, params);
        } // if img
        // svg (mermaid) 插图的处理
        else if (tagName === "svg") {
            fig.parent().attr("data-vk-container", "svg");
        }

        // 折叠长插图
        iContentFolding.add(fig);

        // 生成插图题注
        CaptionGenerator.action(fig);

        VLOOK.doc.counter.figure++;
    }); // 结束初始化处理
    stopwatch.lapStop("    ├ Figure/2: ");

    // ----------------------------------------
    stopwatch.lapStart();
    // 在当前环境的 DPR > 1 时，对于没有指定 srcset 的 img 类插图，自动强制将 src 直接指定 2x 图片
    // 可通过 URL 参数 srcset=auto 来启用
    if (env.display.DPR > 1
        && VLOOK.util.getQueryParams(window.location.href)["srcset"] === "auto") {
        $("p[data-vk-container='img'] img").each(function () {
            let fig = $(this);
            if (fig.attr("src").indexOf(".svg") === -1 // 跳过 svg 文件
                && fig.attr("srcset") === undefined) {
                fig.attr("srcset", fig.attr("src") + " 2x");
            }
        });
    }

    // 若文档没有插图，则隐藏插图浏览器入口
    if (VLOOK.doc.counter.figure > 0)
        iToolbar.buttons["figure-viewer"].css("visibility", "visible");

    // 进行图片对颜色方案的适配处理
    ExtFigure.adjustColorScheme(false);
    stopwatch.lapStop("    └ Figure/3: ");

    /**
     * 绑定加载失败处理
     */
    function bindLoadChecker(fig, src) {
        // 图片无法加载时加载默认图片
        fig.bind("error", function () {
            if (fig.attr("src").indexOf("vlook-lost-image.jpg") === -1)
                if (ignoreImgLost === false)
                    ignoreImgLost = !confirm([
                        "图片缺失：",
                        "圖片缺失：",
                        "Lost Image: ",
                        "Image perdue: ",
                        "Потерянное изображение: ",
                        "失われた画像：",
                        "잃어버린 이미지 : "
                    ][VLOOK.lang.id] + fig.parent().text() + "\"" + fig.attr("src") + "\"" + [
                        "\n\n继续检查吗？",
                        "\n\n繼續檢查嗎？",
                        "\n\nContinue to check?",
                        "\n\nContinuer à vérifier?",
                        "\n\nWeiter prüfen?",
                        "\n\n¿Continuar comprobando?Continue to check?",
                        "\n\nПродолжить проверку?",
                        "\n\nチェックを続けますか？",
                        "\n\n계속 확인 하시겠습니까?"
                    ][VLOOK.lang.id]);

            loadDefaultOnError($(this));
        });

        // 强制重新加载一次以触发error事件
        fig.attr("src", src);
    }

    /**
     * 初始化图片对齐方式的处理
     *
     * @param container img 的题注容器对象
     * @param params img 对象 src 值的 URL 参数数组
     */
     function initAlign(container, params) {
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
    function initBackground(img, params) {
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
    function initFillAlter(img, params, src) {
        if (params["fill"] === undefined)
            return;

        img.attr("data-vk-img-fill", params["fill"]);

        // 图片为 SVG 格式时，将源文件注入到 HTML 文档中
        if (src.indexOf(".svg") > -1)
            SVGInject(img[0]);
    }

    /**
     * 初始化图片对颜色方案（Light / Dark）的适配处理
     *
     * @param img img 对象
     * @param params img 对象 src 值的 URL 参数数组
     */
    function initColorScheme(img, params) {
        // 未指定 darksrc 参数时跳过
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
    function initHighDPI(img, params) {
        let src = img.attr("src"),
            srcset = params["srcset"],
            darksrcset = params["darksrcset"];

        // Light Mode 对应的图片集
        if (srcset !== undefined) {
            srcset = transUrlSrcSet(src, srcset);
            img.attr("data-vk-srcset-light", srcset);
            // 设置默认值
            img.attr("srcset", srcset);
        }

        // Dark Mode 对应的图片集
        if (darksrcset !== undefined) {
            darksrcset = transUrlSrcSet(img.attr("data-vk-src-dark"), darksrcset);
            img.attr("data-vk-srcset-dark", darksrcset);
        }
    }

    /**
     * 加载默认图片
     *
     * @param target 目标 img 对象
     */
    function loadDefaultOnError(target) {
        target.attr({
            "src-org": target.attr("src"),
            "src": VLOOK.doc.defaultImage,
            "srcset": VLOOK.doc.defaultImage2x + " 2x"
        });
    }

    /**
     * 转换图片 URL 中的 srcset / darksrcset 参数为符合 <img> srcset 属性的格式
     *
     * @param src 图片 URL
     * @param srcset srcset 或 darksrcset 参数的内容
     */
    function transUrlSrcSet(src, srcset) {
        // 针对 html 与 图片同一目录的情况
        let path = VLOOK.util.getPath(src);

        // @2x/@3x 图片资源为自动匹配名称的语法
        // 2x/3x 的文件名为 <文件名@2x.xxx> 或 <文件名@3x.xxx> 的情况
        if (/^@[2]x(,@[3]x)?$/.test(srcset) === true) {
            let pureSrc = src.substring(0, src.indexOf("?")),
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
        if (sss.length > 1 && [1].indexOf("/") === -1) // 仅为文件名时才添加路径
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
    // 对图片在 Dark Mode 适配的处理
    // 适配方式为「反转」的处理
    $("img[data-vk-darksrc='invert']").each(function () {
        let img = $(this);
        if (darkMode === true) {
            // 设置默认的 srcset
            img.attr("srcset", img.attr("data-vk-srcset-light"));
            // 添加反转样式
            img.addClass("mdx-img-invert-dark");
        }
        else {
            img.removeClass("mdx-img-invert-dark");
            img.attr("srcset", img.attr("data-vk-srcset-light"));
        }
    });

    // 适配方式为「替换」的处理
    $("img[data-vk-darksrc='alter']").each(function () {
        let img = $(this);
        img.removeClass("mdx-img-invert-dark");
        img.attr("src", img.attr("data-vk-src-" + scheme));
        img.attr("srcset", img.attr("data-vk-srcset-" + scheme));
    });

    // --------------------
    // 对图片指定为颜色替换的处理
    $("img[data-vk-img-fill='text'], img[data-vk-img-fill='theme1'], img[data-vk-img-fill='theme2'], svg[data-vk-img-fill='text'], svg[data-vk-img-fill='theme1'], svg[data-vk-img-fill='theme2']").each(function () {
        let img = $(this),
            fill = img.attr("data-vk-img-fill");
        // SVG 对象或 src 为 .svg 的 img 对象
        if (img.prop("tagName").toLowerCase() === "svg"
            || img.attr("src").indexOf(".svg") > -1) {
            ExtFigure.adjustFillAlterForSVG(fill, img);
        }
        // 其他情况
        else {
            if (fill === "text")
                img.css("filter", "drop-shadow(12345px 0px " + img.parent().css("color") + ")");
            else
                img.css("filter", "drop-shadow(12345px 0px var(--accent-color-" + fill + "-light))");

            if (img.attr("fig-idx") !== undefined) {
                img.css("background", "none");
            }
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
 * *.svg 格式的 img 图片注入为 SVG 实例后，对颜色进行替换的适配处理
 *
 * @param fill 图片颜色替换方式：text / theme1 / theme2
 * @param svg SVG 实例对象
 */
ExtFigure.adjustFillAlterForSVG = function (fill, svg) {
    if (fill === "text")
        svg.find("path, rect, ellipse, polygon").css({
            "fill": svg.parent().css("color")
        });
    else
        svg.find("path, rect, ellipse, polygon").css({
            "fill": "var(--accent-color-" + fill + "-light)"
        });
}

// ==================== 插图导航模块 ==================== //

function FigureNav() {
    this.ui = $(".mdx-figure-nav"); // 插图导航主界面
    this.button = {
        ui : $(".mdx-btn-figure-nav"), // 所有导航按钮
        prev : $(".mdx-btn-figure-prev"), // 上一张插图按钮
        next : $(".mdx-btn-figure-next"), // 下一张插图按钮
        close : $(".mdx-btn-close-figure-viewer"), // 关闭按钮
    };
    this.content = $(".mdx-figure-content"); // 显示插图内容的控件
    this.figIndex = -1; // 当前插图索引序号，对应 fig-idx 中的值

    // 绑定各按钮事件
    let that = this;
    this.button.prev.unbind("click").click(function () {
        that.prev();
    });
    this.button.next.unbind("click").click(function () {
        that.next();
    });
    this.button.close.unbind("click").click(function () {
        that.hide();
    });

    /**
     * 插图导航导航按钮在不同终端的适配处理
     *
     * @param flag "mobile": 移动端，"desktop"：桌面端
     */
    this.adjustHoverStyle = function (flag) {
        // 移动设备时解绑样式事件
        if (flag === "mobile") {
            this.button.prev.unbind("hover");
            this.button.next.unbind("hover");
        }
        // 非移动设备时绑定样式事件
        else {
            this.button.ui.hover(function () {
                $(this).css({
                    "transform": "translateY(-2px)"
                });
                $(this).find("svg > use").addClass("mdx-btn-figure-hover");
            }, function () {
                $(this).css({
                    "transform": "none"
                });
                $(this).find("svg > use").removeClass("mdx-btn-figure-hover");
            });
            // 鼠标键按下事件，模拟 :active
            this.button.ui.mousedown(function () {
                $(this).css({
                    "transform": "none"
                });
                $(this).find("svg > use").addClass("mdx-btn-figure-active");
            });
            // 鼠标键释放事件，模拟恢复正常
            this.button.ui.mouseup(function () {
                $(this).css({
                    "transform": "translateY(-2px)"
                });
                $(this).find("svg > use").removeClass("mdx-btn-figure-active");
            });
        }
    }

    /**
     * 显示插图导航
     */
    this.show = function (fig) {
        VLOOK.report.push(['Interactive', 'Figure Viewer', 'Show/Hide', 0]);

        VLOOK.doc.scroll.freeze();

        if (VLOOK.doc.counter.figure === 0)
            return;
        if (this.figIndex === -1)
            this.figIndex = 0;
        if (fig == null)
            fig = $("[fig-id='mdx-figure-" + this.figIndex + "']");

        this.ui.css({
            "top": this.ui.css("height")
        });

        ContentAssist.hideButtons();

        // 在插图导航中显示对应插图
        this.figIndex = parseInt(fig.attr("fig-idx"));

        this.ui.show();
        this.display();
        this.updateUI();

        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            this.ui.velocity({
                top: 0
            }, {
                easing: [VLOOK.animate.tension, VLOOK.animate.friction],
                duration: VLOOK.animate.speed
            });
        } else {
            this.ui.css({
                top: 0
            });
        }
    }

    /**
     * 关闭插图导航
     */
    this.hide = function () {
        // 动画式显示
        if (VLOOK.ui.effect >= 2) {
            let that = this;
            this.ui.velocity({
                top: this.ui.css("height")
            }, {
                duration: VLOOK.animate.speed,
                complete : function () {
                    that.content.empty();
                    that.ui.hide();
                }
            });
        } else {
            this.ui.css({
                top: this.ui.css("height")
            });
            this.content.empty();
            this.ui.hide();
        }

        // 调整插图动作按钮层级
        let actIdx = parseInt(ContentAssist.button.openInNewTab().css("z-index")),
            viewerIdx = parseInt(this.ui.css("z-index"));
        if (actIdx > viewerIdx)
            ContentAssist.button.openInNewTab().css("z-index", actIdx - viewerIdx);

        ContentAssist.hideButtons();
        VLOOK.doc.scroll.unfreeze();
    }

    /**
     * 显示插图内容
     */
    this.display = function () {
        let fig = $("[fig-id=mdx-figure-" + this.figIndex + "]");
        this.content.empty();
        this.content.show();
        this.content.css({
            "width": $(window).width(),
            "height": $(window).height()
        });

        let newFig = fig.clone();
        newFig.css({
            "max-width": $(window).width() - 90,
            "max-height": $(window).height() - 90,
            "display": "inline-block",
            "cursor": "pointer",
            "border-radius": "var(--vlook-base-radius)",
        });

        // 添加鼠标移入/移出事件
        newFig.hover(function () {
            if (VLOOK.doc.newTab === false)
                $(this).addClass("mdx-OINTable-hover");
        }, function () {
            if (VLOOK.doc.newTab === false)
                $(this).removeClass("mdx-OINTable-hover");
        });
        // 添加鼠标点击事件
        let that = this;
        newFig.unbind("click").click(function () {
            that.jumpTo();
        });

        this.content.append(newFig);
    }

    /**
     * 查看上一个插图
     */
    this.prev = function () {
        VLOOK.report.push(['Interactive', 'FigureNav', 'Prev', 0]);
        if (this.figIndex > 0) {
            this.figIndex--;
            ContentAssist.hideButtons();
            this.display();
            this.updateUI();
        }
    }

    /**
     * 查看下一个插图
     */
    this.next = function () {
        VLOOK.report.push(['Interactive', 'FigureNav', 'Next', 0]);
        if (this.figIndex < VLOOK.doc.counter.figure - 1) {
            this.figIndex++;
            ContentAssist.hideButtons();
            this.display();
            this.updateUI();
        }
    }

    /**
     * 更新插图导航界面
     */
    this.updateUI = function () {
        let pageNum = $(".mdx-figure-nav-title");

        pageNum.html("<span class='mdx-figure-page-num'>" + (this.figIndex + 1) + "/" + VLOOK.doc.counter.figure + "</span> <strong>"
            + $("#fig-num" + this.figIndex + " > .mdx-figure-caption-1").text()
            + "</strong>");

        // 更新导航按钮位置
        this.button.prev.css("top", (this.ui.height() - this.button.prev.height()) / 2);
        this.button.next.css({
            "top": this.button.prev.css("top"),
            "right": "10px"
        });

        // 根据当前插图索引更新浏览按钮有效状态
        this.button.prev.css("opacity", "0");
        this.button.next.css("opacity", "0");
        if (this.figIndex > 0) {
            this.button.prev.css("opacity", "1");
        }
        if (this.figIndex < VLOOK.doc.counter.figure - 1) {
            this.button.next.css("opacity", "1");
        }
    }

    /**
     * 通过插图导航中转到文档插图位置
     */
    this.jumpTo = function () {
        let that = this;
        this.content.unbind("click").click(function () {
            // 跳转到对应位置
            window.location.href = "#fig-idx" + that.figIndex;
            // 微调位置
            let offset = (VLOOK.ui.isSmallScreen() === true) ? 100 : 60;
            $("html").scrollTop($("a[name=fig-idx" + that.figIndex + "]").offset().top - offset);

            that.hide();
        });
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
    $("input[type='checkbox']").each(function () {
        let chkStatus = "uncheck", // 默认为未完成
            chkStyle = "dark"; // 默认样式

        // 已完成
        if ($(this).attr("checked") === "checked") {
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
            viewBox = target.attr("viewBox").split(" ");
        // 修正顺序图的下边距，前提先在 CSS 中设置了合适的 padding-bottom 值
        target.attr("viewBox",
            viewBox[0] + " " + viewBox[1] + " " + viewBox[2] + " "
            + (parseInt(viewBox[3]) + parseInt(target.css("padding-bottom"))));
        // 重置 CSS 中的 padding-bottom 值，因为已由上面的下边距值替换
        target.css("padding-bottom", "0px");
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
            "rx": radius,
            "ry": radius
        });

        // 更新 <人物角色> 样式
        if (person.test(tmpText) === true) {
            let h = actor.height(),
                line = actor.prev("line");
            actor.attr({
                "rx": (h - 20) / 2,
                "ry": (h - 20) / 2,
                "y": parseInt(actor.attr("y")) + 10,
                "height": h - 20
            });
            line.attr({
                "y1": parseInt(line.attr("y1")) + 10,
                "y2": parseInt(line.attr("y2")) - 20
            });
            actor.addClass("mdx-actor-person");
            actor.prev("line").addClass("mdx-actor-person");
            // prefix = "🙂 ";
            text.text(prefix + tmpText.substring(1, tmpText.length));
        }
        // 更新 <重要系统角色> 样式
        else if (keySys.test(tmpText) === true) {
            // actor.css("stroke-width", "3");
            // text.css("font-weight", "bold");
            actor.addClass("mdx-actor-key-sys");
            actor.prev("line").addClass("mdx-actor-key-sys");
            actor.nextAll("text").children().addClass("mdx-actor-key-sys");
            // prefix = "☢️ ";
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        // 更新 <外部系统角色> 样式
        else if (extSys.test(tmpText) === true) {
            // actor.css("stroke-dasharray", "5 2");
            actor.addClass("mdx-actor-ext-sys");
            actor.prev("line").addClass("mdx-actor-ext-sys");
            actor.nextAll("text").children().addClass("mdx-actor-ext-sys");
            // prefix = " ";
            text.text(prefix + tmpText.substring(2, tmpText.length));
        }
        else {
            // prefix = "△ ";
            text.text(prefix + tmpText);
        }
    });

    // 更新顺序图中的片断（如：loop、opt、par、alt）样式和位置
    $(".md-diagram-panel polygon+.labelText").each(function () {
        let fragment = $(this),
            g = fragment.parent();

        // 默认的样式（par 片断）
        let bgColor = "var(--mermaid-accent-color-orange-alt)";
        let borderColor = "var(--mermaid-accent-color-orange-alt)";
        let textColor = "var(--mermaid-accent-color-orange)";
        // 为 alt 片断设置样式
        if (fragment.text() === "alt") {
            bgColor = "var(--mermaid-accent-color-red-alt)";
            borderColor = "var(--mermaid-accent-color-red-alt)";
            textColor = "var(--mermaid-accent-color-red)";
        }
        // 为 loop 片断设置样式
        else if (fragment.text() === "loop") {
            bgColor = "var(--mermaid-accent-color-cyan-alt)";
            borderColor = "var(--mermaid-accent-color-cyan-alt)";
            textColor = "var(--mermaid-accent-color-cyan)";
        }

        // 为 alt、loop、par 片断应用样式设置
        if (fragment.text() !== "opt") {
            // 背景色
            g.find("polygon.labelBox").css("cssText", "fill: " + bgColor + " !important;");
            // 边框色
            g.find("line.loopLine").css("cssText", "stroke: " + borderColor + " !important;");
            // 片断类型名称颜色
            g.find("text.labelText").css("cssText", "fill:" + textColor + " !important;");
            g.find("text.labelText").css("cssText", "fill:" + textColor + " !important;");
            // 片断标题颜色
            g.find("text.loopText > tspan").css("cssText", "fill:" + textColor + " !important;");
        }

        // 将 alt(alternative)、opt(optional)、loop(loops) 片断文本翻译为其他语言
        if (fragment.text() === "alt")
            fragment.text([
                "选择",
                "選擇",
                "Alt.",
                "Alt.",
                "Alt.",
                "Alt.",
                "Alt.",
                "代替",
                "대안"
            ][VLOOK.lang.id]);
        else if (fragment.text() === "opt")
            fragment.text([
                "可选",
                "可選",
                "Opt.",
                "Opt.",
                "Opt.",
                "Opt.",
                "Opt.",
                "ション",
                "매칭"
            ][VLOOK.lang.id]);
        else if (fragment.text() === "loop")
            fragment.text([
                "循环",
                "循環",
                "Loop.",
                "Loop.",
                "Loop.",
                "Loop.",
                "Loop.",
                "ループ",
                "루프"
            ][VLOOK.lang.id]);
        else if (fragment.text() === "par")
            fragment.text([
                "平行",
                "平行",
                "Par.",
                "Par.",
                "Par.",
                "Par.",
                "Par.",
                "平行",
                "평행"
            ][VLOOK.lang.id]);
    });

    // 调整片断的标题文本
    $(".md-diagram-panel .loopText tspan").each(function () {
        // 去掉文本内容前后的中括号
        let fragmentTitle = $(this);
        fragmentTitle.parent().attr("style", "text-anchor: start");
        fragmentTitle.text(fragmentTitle.text().substr(1, fragmentTitle.text().length - 2));

        // 调整文本的位置
        let label = fragmentTitle.parent().parent().find(".labelBox"),
            rect = label[0].getBBox(),
            y = parseInt(fragmentTitle.parent().attr("y"));
        fragmentTitle.attr("x", rect.x + rect.width + 10);
        if (isNaN(y) !== true)
        fragmentTitle.attr("y", y);
    });

    // 针对 VLOOK 衍生的 Mermaid 的状态图节点、子图
    let radius = VLOOK.util.getStyleValue("--vlook-base-radius");
    $("#START rect, #END rect, g[id^=flowchart-START] rect, #INIT ~ g > rect, g[id^=flowchart-END] rect, g[id^=flowchart-INIT] ~ g > rect, .cluster rect, rect[class=rect]").each(function () {
        $(this).attr({
            "rx": radius,
            "ry": radius
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
 * 【补丁】修复 Typora (0.9.9.31.5及更早的版本) 文档内链带标点符号时，导出的 HTML 后不能跳转的 BUG
 */
RepairTool.fixTyporaInnerLink = function () {
    // 清理内链 href 中「无效」的符号，这个是目前 Typora 导出 HTML 的 BUG 引起的
    let invalidHrefSymbol = " `~!@#$%^&*()_+=[]{}\\|;:'\",.<>?/！…（【】「」、：“”，。《》？〈〉『』";
    $("a[href^='#']").each(function () {
        $(this).attr("href", $(this).attr("href").toLowerCase());
        for (let i = 0, len = invalidHrefSymbol.length; i < len; i++) {
            let href = $(this).attr("href"),
                ch = invalidHrefSymbol.substr(i, 1);
            if ($(this).attr("href").indexOf(ch) > -1) {
                let newStr = (i === 0) ? "-" : "";
                $(this).attr("href", "#" + href.substring(1, href.length).replaceAll(ch, newStr));
            }
        }
    });
}

/**
 * 【补丁】修正 Mermaid 8.5 在导出 HTML 的渲染 BUG
 */
RepairTool.fixMermaidRender = function () {
    return 0; // 临时禁用
    // 环境配置预处理
    $(".md-diagram-panel .label > g > foreignObject > div").each(function () {
        let transformValue = $(this).parent().parent().attr("transform");
        // 生成 Mermaid 时系统的 DPR = 1 时，其形状文本的父父级元素的 transform 的第 2 个参数一般大于 -10
        if (parseInt(transformValue.substring(transformValue.indexOf(",") + 1, transformValue.length - 1)) < -7)
            RepairTool.mermaidDPR.builder = 2;
        // 通过形状的标签文本的行高来判断，正常 DPR = 1 时小于 16
        if (parseInt($(this).css("line-height")) > 20)
            RepairTool.mermaidDPR.render = 2;
        return false;
    });
    env.printMermaidDPR();

    // 当前系统为 macOS，或其 DPR = 1
    // 其中，DPR = 1 默认指 Windows 无缩放分辨率，其他平台未测试
    if (env.os.macOS || env.display.DPR === 1) {
        // 生成 Mermaid 时的系统的 DPR = 1
        if (RepairTool.mermaidDPR.builder === 1) {
            // 调整流形状内的文本
            $(".md-diagram-panel .label foreignObject").each(function () {
                let text = $(this).find("div"),
                    transform = $(this).parent();
                $(this).attr("height", parseInt(text.css("height")));
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.2));
            });
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let text = $(this).find("div > span");
                $(this).attr("width", parseInt(text.css("width")));
                $(this).attr("height", parseInt(text.css("height")));
            });
        }
        else if (RepairTool.mermaidDPR.builder === 2) {
            // 流程图形状内的文本
            $(".md-diagram-panel .label foreignObject").each(function () {
                let transform = $(this).parent();
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 0.5));
            });
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let transform = $(this).parent();
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 0.5));
            });
        }
    }
    // 当前系统为 Windows，且其 DPR = 2
    else if (env.os.Windows && env.display.DPR === 2) {
        // 针对 RepairTool.mermaidDPR.render = 1，例如：Firefox
        if (RepairTool.mermaidDPR.render === 1) {
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let text = $(this).find("div > span");
                $(this).attr("width", parseInt(text.css("width")));
                $(this).attr("height", parseInt(text.css("height")) * 2);
            });

            // 针对 Chrome 浏览器
            if (env.browser.Chrome || env.browser.Edge) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 2));
                });
            }
            // 针对 Firefox 浏览器
            else if (env.browser.Firefox) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.5));
                });
            }
        }
        // RepairTool.mermaidDPR.render = 2，例如：Chrome / Edge
        else if (RepairTool.mermaidDPR.render === 2) {
            // 针对Chrome浏览器
            if (env.browser.Chrome || env.browser.Edge) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 2.3));
                });
                // 流程图线条上的文本
                $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.1));
                });
            }
        }
    }
}

/**
 * 【补丁】修正 Mermaid 8.5 在导出 HTML 的渲染 BUG
 */
RepairTool.fixMermaidRender85 = function () {
    $(".md-diagram-panel .label > g > foreignObject > div").each(function () {
        let transformValue = $(this).parent().parent().attr("transform");
        // 生成 Mermaid 时系统的 DPR = 1 时，其形状文本的父父级元素的 transform 的第 2 个参数一般大于 -10
        if (parseInt(transformValue.substring(transformValue.indexOf(",") + 1, transformValue.length - 1)) < -7)
            RepairTool.mermaidDPR.builder = 2;
        // 通过形状的标签文本的行高来判断，正常 DPR = 1 时小于 16
        if (parseInt($(this).css("line-height")) > 20)
            RepairTool.mermaidDPR.render = 2;
        return false;
    });

    // 移除 edgeLabel 内的多余 rect，由 Mermaid V8.5 添加的结构
    $(".edgeLabel > .label > rect").remove();

    // 当前系统为 macOS，或其 DPR = 1
    // 其中，DPR = 1 默认指 Windows 无缩放分辨率，其他平台未测试
    if (env.os.macOS || env.display.DPR === 1) {
        if (RepairTool.mermaidDPR.builder === 1) {
            // 调整流形状内的文本
            $(".md-diagram-panel .label foreignObject").each(function () {
                let text = $(this).find("div"),
                    transform = $(this).parent();
                $(this).attr("height", parseInt(text.css("height")));
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.2));
            });
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let text = $(this).find("div > span");
                $(this).attr("width", parseInt(text.css("width")));
                $(this).attr("height", parseInt(text.css("height")));
            });
        }
        else if (RepairTool.mermaidDPR.builder === 2) {
            // 流程图形状内的文本
            $(".md-diagram-panel .label foreignObject").each(function () {
                let transform = $(this).parent();
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 0.5));
            });
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let transform = $(this).parent();
                transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 0.5));
            });
        }
    }
    // 当前系统为 Windows，且其 DPR = 2
    else if (env.os.Windows && env.display.DPR === 2) {
        // 针对 RepairTool.mermaidDPR.render = 1，例如：Firefox
        if (RepairTool.mermaidDPR.render === 1) {
            // 流程图线条上的文本
            $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                let text = $(this).find("div > span");
                $(this).attr("width", parseInt(text.css("width")));
                $(this).attr("height", parseInt(text.css("height")) * 2);
            });

            // 针对 Chrome 浏览器
            if (env.browser.Chrome || env.browser.Edge) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 2));
                });
            }
            // 针对 Firefox 浏览器
            else if (env.browser.Firefox) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.5));
                });
            }
        }
        // RepairTool.mermaidDPR.render = 2，例如：Chrome / Edge
        else if (RepairTool.mermaidDPR.render === 2) {
            // 针对Chrome浏览器
            if (env.browser.Chrome || env.browser.Edge) {
                // 流程图形状内的文本
                $(".md-diagram-panel .label foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 2.3));
                });
                // 流程图线条上的文本
                $(".md-diagram-panel .edgeLabel foreignObject").each(function () {
                    let text = $(this).find("div"),
                        transform = $(this).parent();
                    $(this).attr("height", parseInt(text.css("height")) * 2);
                    transform.attr("transform", RepairTool.scaleTupleByTimes(transform.attr("transform"), 1, 1.1));
                });
            }
        }
    }
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
 * @return 返回有效的的颜色值
 */
CodeMagic.getStyle = function (color) {
    // 没有指定样式，则为默认样式
    if (color === undefined)
        return "red";
    return color;
}

/**
 * 初始化
 */
CodeMagic.init = function () {
    $("code").each(function () {
        let codeText = $(this).text(),
            result = null;

        // 药丸标签格式
        if ((result = codeText.match(RainbowGroupTag.syntax)) != null) {
            RainbowGroupTag.build($(this), result);
        }
        // 彩虹单标签格式
        else if ((result = codeText.match(RainbowTag.syntax)) != null) {
            RainbowTag.build($(this), result);
        }
        // 文字注音格式
        else if ((result = codeText.match(TextPhonetic.syntax)) != null) {
            TextPhonetic.build($(this), result);
        }
        // 刮刮卡格式
        else if ((result = codeText.match(BlackCurtain.syntax)) != null) {
            BlackCurtain.build($(this), result);
        }
        // 彩虹引用
        else if ((result = codeText.match(RainbowQuote.syntax)) != null) {
            RainbowQuote.build($(this), result);
        }
        // 普通代码增加样式标识，以用于深色模式时的识别
        else
            $(this).addClass("mdx-std-code");

        // 因为在新标签中打开的内容已无未解析的含语法的原始内容
        // 所以须对已解析后的对象直接进行绑定鼠标事件
        if (VLOOK.doc.newTab === true) {
            $(".mdx-black-curtain").unbind("click").click(function () {
                BlackCurtain.toggle($(this));
            });
        }
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
    target.attr("class", "mdx-tag-" + color);
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

    // 增加外容器
    target.wrap("<div style='display: inline; white-space: pre;'></div>");
    // 左标签
    target.before("<code class='mdx-tag-name-" + color + "'>"
        + tag1 + "</code>");
    // 右标签
    target.text(tag2);
    target.attr("class", "mdx-tag-value-" + color);
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
    if (quote.prop("tagName").toLowerCase() === "blockquote") {
        target.parent().remove();
        quote.addClass("mdx-quote-" + color);
        quote.find("h6").addClass("mdx-quote-title-" + color);
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
BlackCurtain.syntax = /^\*{(.*)}\((\S+)(\s"(red|orange|yellow|green|cyan|blue|purple|pink|brown|gray|theme1|theme2)")?\)$/i;

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
        curtainColor = "var(--accent-color-" + curtainColor + "-light)";
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
        "background": generateBg(tips.length, curtainColor),
        "border-color": curtainColor
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
     * @return 生成 CSS 规范的背景
     */
    function generateBg(charCount, color) {
        let count = 16,
            step = 10,
            result = "linear-gradient(135deg, ";
        // 根据字数调整条纹数量
        if (charCount <= 8)
            count = 4;
        else if (charCount <= 12)
            count = 8;
        else if (charCount <= 20)
            count = 10;
        // 计算每个条纹的步长
        step = 100 / count;
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

    if (target.attr("data-vk-black-curtain-showed") === "false")
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
    target.addClass("mdx-black-curtain-opened");
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
    target.removeClass("mdx-black-curtain-opened");
    target.css("color", "var(--doc-bg-color)");
    // 显示提示信息
    target.text(target.attr("data-vk-black-curtain-data"));
    // 「刮刮卡」自定义数据
    target.attr("data-vk-black-curtain-data", tmp);
    target.attr("data-vk-black-curtain-showed", "false");
}

// ==================== 新标签打开类 ==================== //

// ↓ ↓ ↓ ↓ ↓ 以下是属新标签中打开的页面使用  ↓ ↓ ↓ ↓ ↓

/**
 * 针对在新标签中打开的页面进行二次初始化
 */
function OINT() {}

OINT.init = function () {
    $(".mdx-before-write").remove();
    $("#write").remove();
    DOM.body().append("<div id='write'></div>");
    iToolbar.ui.remove();
    iOutlineNav.ui.remove();
    iChapterNav.ui.remove();
    iMoreDocContent.hide();
    ContentAssist.button.openInNewTab().remove();
}

/**
 * 在新标签页中打开的页面中添加元素
 */
OINT.append = function (content) {
    $("#write").append(content);
}

/**
 * 更新插图的题注（用于在新标签打开插图、表格后的强制更新对应内容）
 */
OINT.updateFigureCaption = function (type, caption1, caption2) {
    let splitIdx = caption1.indexOf(" - "),
        prefix = null,
        cap = null;

    // 存在自定义题注内容
    if (splitIdx > -1) {
        prefix = caption1.substring(0, caption1.indexOf(" - ") + 3);
        cap = caption1.substring(caption1.indexOf(" - ") + 3, caption1.length);
        $(".mdx-figure-caption > .mdx-figure-caption-1").html(prefix + "<strong>" + cap + "</strong>");
    } else
        $(".mdx-figure-caption > .mdx-figure-caption-1").html(caption1);

    if (type !== "img" && caption2 != null) {
        $(".mdx-figure-caption").append("<p class='mdx-figure-caption-2'>");
        $(".mdx-figure-caption > .mdx-figure-caption-2").text(caption2);
    }
}

/**
 * 完成在新标签打开页面后进行收尾处理
 */
OINT.done = function() {
    // 设置为可滚动
    DOM.body().css({
        "overflow": "scroll"
    });

    VOM.doc().css({
        "filter": "none"
    });
}

// ↑ ↑ ↑ ↑ ↑ 以上是属新标签中打开的页面使用 ↑ ↑ ↑ ↑ ↑

// ==================== 加载与初始化 VLOOK ==================== //

/**
 * 文档加载完成后执行主流程
 */
$(document).ready(function () {
    // 完成页面加载后，移除预加载的初始 UI
    $("#VLOOK").remove();

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
    // 初始化内容辅助工具
    // 须隐藏文档原始内容前执行，避免部分样式失效
    ContentAssist.init();

    // 先隐藏文档原始内容，减少页面重绘
    VOM.doc().hide();

    // ----------------------------------------
    // 初始化欢迎屏
    console.info("- Welcome Screen Init");
    let wsMode = VLOOK.util.getQueryParams(window.location.href)["ws"];
    console.log("    └ mode: " + wsMode);
    iWelcomeScreen = new WelcomeScreen(wsMode);
    if (iWelcomeScreen === false)
        alert("Instantiation failed [ iWelcomeScreen ]");

    // 文档不符合 VLOOK 规范则不加载 VLOOK 插件
    if (VLOOK.checkSpecification() === false) {
        $(".mdx-welcome-screen").hide();
        $(".mdx-toolbar").hide();
        $(".mdx-btn").hide();
        return;
    }
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化关键组件实例
    iStopwatch.lapStart();
    console.info("- Intance");
    VLOOK.initIntance(false);
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 延后加载 VLOOK 插件，避免欢迎屏的 UI 刷新阻塞
    // 独立线程进行处理
    setTimeout(loadVLOOK, 100);
});

/**
 * 字体加载完成后执行的主流程
 */
document.fonts.ready.then(function() {
    // 字体加载完成后的逻辑
    console.log("!!! ALL FONT READY !!!");
});

/**
 * 加载 VLOOK 插件
 */
function loadVLOOKui() {
    let ui = '';
    // --------------------------------------------------
    // 欢迎屏
    ui += '<div class="mdx-welcome-screen mdx-backdrop-blurs">';
    // 文档专属图标
    ui += '<div class="mdx-doc-logo-light"></div><div class="mdx-doc-logo-dark"></div>';
    // 欢迎信息
    ui += '<div class="mdx-welcome-screen-tips">';
    ui += '<div>Don\'t worry, the best will always appear in the most casual time.</div>';
    ui += '<div>不要著急，最好的總會在最不經意的時候出現。</div>';
    ui += '<div>Keine Sorge, das Beste wird immer in der ungezwungensten Zeit erscheinen.</div>';
    ui += '<div>心配しないで、最高のものが常に最もカジュアルな時間に表示されます。</div>';
    ui += '<div>No te preocupes, lo mejor siempre aparecerá en el momento más casual.</div>';
    ui += '<div>걱정하지 마세요. 최고는 항상 가장 캐주얼 한 시간에 나타납니다.</div>';
    ui += '<div>Ne vous inquiétez pas, le meilleur apparaîtra toujours au moment le plus décontracté.</div>';
    ui += '<div>Не волнуйтесь, лучшее всегда будет появляться в самое случайное время.<br><br>:</div>';
    ui += '</div>';
    // 文档加载进度及进入按钮
    ui += '<div class="mdx-welcome-screen-loading">Loading...</div>';
    ui += '</div>';

    // --------------------------------------------------
    // SVG图标集
    ui += '<svg style="display: none;">';
    // SVG 图标集：图标|VLOOK LOGO for Light Mode
    ui += '<symbol id="icoVLOOK-light">';
    ui += '<g id="VLOOK-light" fill="#303438">';
    ui += '<path d="M17.1496192,2.76763582e-16 C19.5316459,-1.60807611e-16 20.3954263,0.24801843 21.2662596,0.713745193 C22.1370929,1.17947196 22.820528,1.86290705 23.2862548,2.73374039 C23.7519816,3.60457372 24,4.46835414 24,6.85038077 L24,17.1496192 C24,19.5316459 23.7519816,20.3954263 23.2862548,21.2662596 C22.820528,22.1370929 22.1370929,22.820528 21.2662596,23.2862548 C20.3954263,23.7519816 19.5316459,24 17.1496192,24 L6.85038077,24 C4.46835414,24 3.60457372,23.7519816 2.73374039,23.2862548 C1.86290705,22.820528 1.17947196,22.1370929 0.713745193,21.2662596 C0.24801843,20.3954263 1.07205074e-16,19.5316459 -1.84509055e-16,17.1496192 L1.84509055e-16,6.85038077 C-1.07205074e-16,4.46835414 0.24801843,3.60457372 0.713745193,2.73374039 C1.17947196,1.86290705 1.86290705,1.17947196 2.73374039,0.713745193 C3.60457372,0.24801843 4.46835414,1.60807611e-16 6.85038077,-2.76763582e-16 L17.1496192,2.76763582e-16 Z M12.2146664,16.9756299 C12.1180865,16.895267 11.9779135,16.895267 11.8813336,16.9756299 L11.8813336,16.9756299 L10.9253862,17.7710616 C10.8229145,17.856327 10.8013222,18.0051829 10.875344,18.1160496 L10.875344,18.1160496 L11.8312914,19.5478266 C11.8503268,19.576337 11.8748008,19.600811 11.9033112,19.6198464 C12.0229961,19.6997558 12.1847992,19.6675114 12.2647086,19.5478266 L12.2647086,19.5478266 L13.220656,18.1160496 C13.2946778,18.0051829 13.2730855,17.856327 13.1706138,17.7710616 L13.1706138,17.7710616 Z M7.27085714,9.29167619 C4.87236337,9.29167619 2.928,11.2331323 2.928,13.6280398 C2.928,16.0229473 4.87236337,17.9644035 7.27085714,17.9644035 C9.66935091,17.9644035 11.6137143,16.0229473 11.6137143,13.6280398 C11.6137143,11.2331323 9.66935091,9.29167619 7.27085714,9.29167619 Z M16.8251429,9.29167619 C14.4266491,9.29167619 12.4822857,11.2331323 12.4822857,13.6280398 C12.4822857,16.0229473 14.4266491,17.9644035 16.8251429,17.9644035 C19.2236366,17.9644035 21.168,16.0229473 21.168,13.6280398 C21.168,11.2331323 19.2236366,9.29167619 16.8251429,9.29167619 Z M7.27085714,10.5925853 C8.94980278,10.5925853 10.3108571,11.9516046 10.3108571,13.6280398 C10.3108571,15.3044751 8.94980278,16.6634944 7.27085714,16.6634944 C5.5919115,16.6634944 4.23085714,15.3044751 4.23085714,13.6280398 C4.23085714,11.9516046 5.5919115,10.5925853 7.27085714,10.5925853 Z M16.8251429,10.5925853 C18.5040885,10.5925853 19.8651429,11.9516046 19.8651429,13.6280398 C19.8651429,15.3044751 18.5040885,16.6634944 16.8251429,16.6634944 C15.1461972,16.6634944 13.7851429,15.3044751 13.7851429,13.6280398 C13.7851429,11.9516046 15.1461972,10.5925853 16.8251429,10.5925853 Z M19.7076586,5.41807306 C19.5576382,5.09691923 19.1785253,4.95542019 18.8553524,5.09721484 L18.8553524,5.09721484 L18.84192,5.10328717 L12.047,7.93263636 L5.25388278,5.10328717 L5.24045038,5.09721484 C4.91727744,4.95542019 4.53816455,5.09691923 4.38814418,5.41807306 C4.2360402,5.74368736 4.37695721,6.13068784 4.70306552,6.28244085 L4.70306552,6.28244085 L11.738187,9.21340744 L11.7516194,9.21947977 C11.8488977,9.26216139 11.9512445,9.2791746 12.0508883,9.27366779 C12.1486432,9.27848497 12.2488474,9.26130919 12.3441834,9.21947977 L12.3441834,9.21947977 L12.3576158,9.21340744 L19.3927372,6.28244085 L19.4770033,6.23544395 C19.7420451,6.06083144 19.8459349,5.71408606 19.7076586,5.41807306 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|VLOOK LOGO for Dark Mode
    ui += '<symbol id="icoVLOOK-dark">';
    ui += '<g id="VLOOK-dark" fill="#FFFFFF">';
    ui += '<path d="M17.1496192,-1.49959326e-15 C19.5316459,-1.93716445e-15 20.3954263,0.24801843 21.2662596,0.713745193 C22.1370929,1.17947196 22.820528,1.86290705 23.2862548,2.73374039 C23.7519816,3.60457372 24,4.46835414 24,6.85038077 L24,17.1496192 C24,19.5316459 23.7519816,20.3954263 23.2862548,21.2662596 C22.820528,22.1370929 22.1370929,22.820528 21.2662596,23.2862548 C20.3954263,23.7519816 19.5316459,24 17.1496192,24 L6.85038077,24 C4.46835414,24 3.60457372,23.7519816 2.73374039,23.2862548 C1.86290705,22.820528 1.17947196,22.1370929 0.713745193,21.2662596 C0.24801843,20.3954263 1.07205074e-16,19.5316459 -1.84509055e-16,17.1496192 L1.84509055e-16,6.85038077 C-1.07205074e-16,4.46835414 0.24801843,3.60457372 0.713745193,2.73374039 C1.17947196,1.86290705 1.86290705,1.17947196 2.73374039,0.713745193 C3.60457372,0.24801843 4.46835414,-1.61554923e-15 6.85038077,-2.05312042e-15 L17.1496192,-1.49959326e-15 Z M12.1666664,16.9756299 C12.0700865,16.895267 11.9299135,16.895267 11.8333336,16.9756299 L11.8333336,16.9756299 L10.8773862,17.7710616 C10.7749145,17.856327 10.7533222,18.0051829 10.827344,18.1160496 L10.827344,18.1160496 L11.7832914,19.5478266 C11.8023268,19.576337 11.8268008,19.600811 11.8553112,19.6198464 C11.9749961,19.6997558 12.1367992,19.6675114 12.2167086,19.5478266 L12.2167086,19.5478266 L13.172656,18.1160496 C13.2466778,18.0051829 13.2250855,17.856327 13.1226138,17.7710616 L13.1226138,17.7710616 Z M7.22285714,9.29167619 C4.82436337,9.29167619 2.88,11.2331323 2.88,13.6280398 C2.88,16.0229473 4.82436337,17.9644035 7.22285714,17.9644035 C9.62135091,17.9644035 11.5657143,16.0229473 11.5657143,13.6280398 C11.5657143,11.2331323 9.62135091,9.29167619 7.22285714,9.29167619 Z M16.7771429,9.29167619 C14.3786491,9.29167619 12.4342857,11.2331323 12.4342857,13.6280398 C12.4342857,16.0229473 14.3786491,17.9644035 16.7771429,17.9644035 C19.1756366,17.9644035 21.12,16.0229473 21.12,13.6280398 C21.12,11.2331323 19.1756366,9.29167619 16.7771429,9.29167619 Z M7.22285714,10.5925853 C8.90180278,10.5925853 10.2628571,11.9516046 10.2628571,13.6280398 C10.2628571,15.3044751 8.90180278,16.6634944 7.22285714,16.6634944 C5.5439115,16.6634944 4.18285714,15.3044751 4.18285714,13.6280398 C4.18285714,11.9516046 5.5439115,10.5925853 7.22285714,10.5925853 Z M16.7771429,10.5925853 C18.4560885,10.5925853 19.8171429,11.9516046 19.8171429,13.6280398 C19.8171429,15.3044751 18.4560885,16.6634944 16.7771429,16.6634944 C15.0981972,16.6634944 13.7371429,15.3044751 13.7371429,13.6280398 C13.7371429,11.9516046 15.0981972,10.5925853 16.7771429,10.5925853 Z M19.6596586,5.41807306 C19.5096382,5.09691923 19.1305253,4.95542019 18.8073524,5.09721484 L18.8073524,5.09721484 L18.79392,5.10328717 L11.999,7.93263636 L5.20588278,5.10328717 L5.19245038,5.09721484 C4.86927744,4.95542019 4.49016455,5.09691923 4.34014418,5.41807306 C4.1880402,5.74368736 4.32895721,6.13068784 4.65506552,6.28244085 L4.65506552,6.28244085 L11.690187,9.21340744 L11.7036194,9.21947977 C11.8008977,9.26216139 11.9032445,9.2791746 12.0028883,9.27366779 C12.1006432,9.27848497 12.2008474,9.26130919 12.2961834,9.21947977 L12.2961834,9.21947977 L12.3096158,9.21340744 L19.3447372,6.28244085 L19.4290033,6.23544395 C19.6940451,6.06083144 19.7979349,5.71408606 19.6596586,5.41807306 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|大纲
    ui += '<symbol id="icoOutline">';
    ui += '<path d="M6,0 L19,0 C19.5522847,0 20,0.44771525 20,1 C20,1.55228475 19.5522847,2 19,2 L6,2 C5.44771525,2 5,1.55228475 5,1 C5,0.44771525 5.44771525,0 6,0 Z M1,0 L2,0 C2.55228475,0 3,0.44771525 3,1 C3,1.55228475 2.55228475,2 2,2 L1,2 C0.44771525,2 0,1.55228475 0,1 C0,0.44771525 0.44771525,0 1,0 Z M1,6 L2,6 C2.55228475,6 3,6.44771525 3,7 C3,7.55228475 2.55228475,8 2,8 L1,8 C0.44771525,8 0,7.55228475 0,7 C0,6.44771525 0.44771525,6 1,6 Z M1,12 L2,12 C2.55228475,12 3,12.4477153 3,13 C3,13.5522847 2.55228475,14 2,14 L1,14 C0.44771525,14 0,13.5522847 0,13 C0,12.4477153 0.44771525,12 1,12 Z M6,6 L19,6 C19.5522847,6 20,6.44771525 20,7 C20,7.55228475 19.5522847,8 19,8 L6,8 C5.44771525,8 5,7.55228475 5,7 C5,6.44771525 5.44771525,6 6,6 Z M6,12 L19,12 C19.5522847,12 20,12.4477153 20,13 C20,13.5522847 19.5522847,14 19,14 L6,14 C5.44771525,14 5,13.5522847 5,13 C5,12.4477153 5.44771525,12 6,12 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|插图导航的上一张
    ui += '<symbol id="icoPrevFig">';
    ui += '<path d="M11.0303682,0.091084328 C11.7948436,0.375093579 12.1890102,1.237894 11.9107639,2.018203 L3.00130389,26.9997408 L11.9107639,51.981797 C12.1726428,52.7162055 11.8388895,53.5236859 11.1613701,53.8529228 L11.0303682,53.9089157 C10.310862,54.1762185 9.51976648,53.8355526 9.19721032,53.1440006 L9.14235361,53.0102855 C5.13199059,41.7636939 2.12421833,33.3287502 0.11903682,27.7054544 C0.11186687,27.6853471 0,27.43485 0,26.9997408 C0,26.5646315 0.111310594,26.3162129 0.119265149,26.2939053 C2.12439592,20.6707518 5.13209207,12.2360215 9.14235361,0.989714523 C9.4205999,0.20940552 10.2658928,-0.192924923 11.0303682,0.091084328 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|插图导航的下一张
    ui += '<symbol id="icoNextFig">';
    ui += '<path d="M11.0303682,0.091084328 C11.7948436,0.375093579 12.1890102,1.237894 11.9107639,2.018203 L3.00130389,26.9997408 L11.9107639,51.981797 C12.1726428,52.7162055 11.8388895,53.5236859 11.1613701,53.8529228 L11.0303682,53.9089157 C10.310862,54.1762185 9.51976648,53.8355526 9.19721032,53.1440006 L9.14235361,53.0102855 C5.13199059,41.7636939 2.12421833,33.3287502 0.11903682,27.7054544 C0.11186687,27.6853471 0,27.43485 0,26.9997408 C0,26.5646315 0.111310594,26.3162129 0.119265149,26.2939053 C2.12439592,20.6707518 5.13209207,12.2360215 9.14235361,0.989714523 C9.4205999,0.20940552 10.2658928,-0.192924923 11.0303682,0.091084328 Z" transform="translate(6.000000, 27.000000) scale(-1, 1) translate(-6.000000, -27.000000) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|逐章导航的上一章';
    ui += '<symbol id="icoPrevChapter">';
    ui += '<path d="M2.56507664,7.09086552 L7.5381691,12.063958 C7.92869339,12.4544823 7.92869339,13.0876472 7.5381691,13.4781715 C7.14764481,13.8686958 6.51447983,13.8686958 6.12395554,13.4781715 L0.467101288,7.82131729 C0.287321184,7.64153719 0.190303885,7.41033487 0.176049391,7.17505536 C0.145971879,6.88568746 0.241806749,6.58570828 0.463554001,6.36396103 L6.12040825,0.707106781 C6.51093254,0.316582489 7.14409752,0.316582489 7.53462181,0.707106781 C7.9251461,1.09763107 7.9251461,1.73079605 7.53462181,2.12132034 L2.56507664,7.09086552 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|逐章导航的下一章
    ui += '<symbol id="icoNextChapter">';
    ui += '<path d="M2.73310223,7.09086552 L7.70619469,12.063958 C8.09671898,12.4544823 8.09671898,13.0876472 7.70619469,13.4781715 C7.3156704,13.8686958 6.68250542,13.8686958 6.29198113,13.4781715 L0.635126876,7.82131729 C0.455346772,7.64153719 0.358329473,7.41033487 0.344074979,7.17505536 C0.313997467,6.88568746 0.409832337,6.58570828 0.631579589,6.36396103 L6.28843384,0.707106781 C6.67895813,0.316582489 7.31212311,0.316582489 7.7026474,0.707106781 C8.09317169,1.09763107 8.09317169,1.73079605 7.7026474,2.12132034 L2.73310223,7.09086552 Z"transform="translate(4.168887, 7.092639) scale(-1, 1) translate(-4.168887, -7.092639) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|已收起的大纲节点
    ui += '<symbol id="icoFolded">';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '<path d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M7.66396103,3.75735931 C7.27343674,3.36683502 6.64027176,3.36683502 6.24974747,3.75735931 C5.85922318,4.1478836 5.85922318,4.78104858 6.24974747,5.17157288 L6.24974747,5.17157288 L9.08528137,8.00710678 L6.24974747,10.8426407 C5.85922318,11.233165 5.85922318,11.86633 6.24974747,12.2568542 C6.64027176,12.6473785 7.27343674,12.6473785 7.66396103,12.2568542 L7.66396103,12.2568542 L11.1994949,8.72132034 C11.3947571,8.5260582 11.4923882,8.27013588 11.4923882,8.01421356 L11.4923882,8.01421356 L11.4923882,8 C11.4923882,7.74407768 11.3947571,7.48815536 11.1994949,7.29289322 L11.1994949,7.29289322 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|已展开的大纲节点
    ui += '<symbol id="icoUnfold">';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '<path d="M11.500027,1.86500179 C12.0523118,1.86500179 12.500027,2.31271704 12.500027,2.86500179 C12.500027,3.41728654 12.0523118,3.86500179 11.500027,3.86500179 L5.49500179,3.86500179 L5.49500179,9.87002705 C5.49500179,10.4223118 5.04728654,10.870027 4.49500179,10.870027 C3.94271704,10.870027 3.49500179,10.4223118 3.49500179,9.87002705 L3.49500179,2.87002705 C3.49500179,2.59244142 3.60810365,2.34127215 3.79073809,2.16008851 C3.97127215,1.97810365 4.22244142,1.86500179 4.50002705,1.86500179 L11.500027,1.86500179 Z" transform="translate(7.997514, 6.367514) rotate(-135.000000) translate(-7.997514, -6.367514) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|已收起的引用折叠
    ui += '<symbol id="icoQuoteClosed">';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '<path d="M11,1 C13.209139,1 15,2.790861 15,5 L15,11 C15,13.209139 13.209139,15 11,15 L5,15 C2.790861,15 1,13.209139 1,11 L1,5 C1,2.790861 2.790861,1 5,1 L11,1 Z M8,3 C7.44771525,3 7,3.44771525 7,4 L7,4 L7,7 L4,7 C3.44771525,7 3,7.44771525 3,8 C3,8.55228475 3.44771525,9 4,9 L4,9 L7,9 L7,12 C7,12.5522847 7.44771525,13 8,13 C8.55228475,13 9,12.5522847 9,12 L9,12 L9,9 L12,9 C12.5522847,9 13,8.55228475 13,8 C13,7.44771525 12.5522847,7 12,7 L12,7 L9,7 L9,4 C9,3.44771525 8.55228475,3 8,3 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|已展开的引用折叠
    ui += '<symbol id="icoQuoteOpened">';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '<path d="M11,1 C13.209139,1 15,2.790861 15,5 L15,11 C15,13.209139 13.209139,15 11,15 L5,15 C2.790861,15 1,13.209139 1,11 L1,5 C1,2.790861 2.790861,1 5,1 L11,1 Z M11,2 L5,2 C3.34314575,2 2,3.34314575 2,5 L2,5 L2,11 C2,12.6568542 3.34314575,14 5,14 L5,14 L11,14 C12.6568542,14 14,12.6568542 14,11 L14,11 L14,5 C14,3.34314575 12.6568542,2 11,2 L11,2 Z"></path>';
    ui += '<rect x="4" y="7" width="8" height="2" rx="1"></rect>';
    ui += '</symbol>';
    // SVG 图标集：图标|已收起的表格折叠行节点
    ui += '<symbol id="icoTableRowClosed">';
    ui += '<rect fill-opacity="0" x="1" y="1" width="10" height="10"></rect>';
    ui += '<path d="M8,0 C10.209139,-4.05812251e-16 12,1.790861 12,4 L12,8 C12,10.209139 10.209139,12 8,12 L4,12 C1.790861,12 2.705415e-16,10.209139 0,8 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L8,0 Z M6,2 C5.44771525,2 5,2.44771525 5,3 L5,3 L5,5 L3,5 C2.44771525,5 2,5.44771525 2,6 C2,6.55228475 2.44771525,7 3,7 L3,7 L5,7 L5,9 C5,9.55228475 5.44771525,10 6,10 C6.55228475,10 7,9.55228475 7,9 L7,9 L7,7 L9,7 C9.55228475,7 10,6.55228475 10,6 C10,5.44771525 9.55228475,5 9,5 L9,5 L7,5 L7,3 C7,2.44771525 6.55228475,2 6,2 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|已展开的表格折叠行节点
    ui += '<symbol id="icoTableRowOpened">';
    ui += '<rect fill-opacity="0" x="1" y="1" width="10" height="10"></rect>';
    ui += '<path d="M8,0 C10.209139,-4.05812251e-16 12,1.790861 12,4 L12,8 C12,10.209139 10.209139,12 8,12 L4,12 C1.790861,12 2.705415e-16,10.209139 0,8 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L8,0 Z M8,1 L4,1 C2.34314575,1 1,2.34314575 1,4 L1,4 L1,8 C1,9.65685425 2.34314575,11 4,11 L4,11 L8,11 C9.65685425,11 11,9.65685425 11,8 L11,8 L11,4 C11,2.34314575 9.65685425,1 8,1 L8,1 Z"></path>';
    ui += '<rect x="3" y="5" width="6" height="2" rx="1"></rect>';
    ui += '</symbol>';
    // SVG 图标集：图标|展开长内容
    ui += '<symbol id="icoExtend">';
    ui += '<path d="M13,1.65685425 C13.5522847,1.65685425 14,2.1045695 14,2.65685425 C14,3.209139 13.5522847,3.65685425 13,3.65685425 L8,3.65685425 L8,8.65685425 C8,9.209139 7.55228475,9.65685425 7,9.65685425 C6.44771525,9.65685425 6,9.209139 6,8.65685425 L6,2.65685425 C6,2.1045695 6.44771525,1.65685425 7,1.65685425 L13,1.65685425 Z" transform="translate(10.000000, 5.656854) rotate(-135.000000) translate(-10.000000, -5.656854) "></path>';
    ui += '<path d="M13,7.65685425 C13.5522847,7.65685425 14,8.1045695 14,8.65685425 C14,9.209139 13.5522847,9.65685425 13,9.65685425 L8,9.65685425 L8,14.6568542 C8,15.209139 7.55228475,15.6568542 7,15.6568542 C6.44771525,15.6568542 6,15.209139 6,14.6568542 L6,8.65685425 C6,8.1045695 6.44771525,7.65685425 7,7.65685425 L13,7.65685425 Z" transform="translate(10.000000, 11.656854) rotate(-135.000000) translate(-10.000000, -11.656854) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|关闭
    ui += '<symbol id="icoClose">';
    ui += '<path d="M7,7 L7,-1 C7,-1.55228475 7.44771525,-2 8,-2 C8.55228475,-2 9,-1.55228475 9,-1 L9,7 L17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L9,9 L9,17 C9,17.5522847 8.55228475,18 8,18 C7.44771525,18 7,17.5522847 7,17 L7,9 L-1,9 C-1.55228475,9 -2,8.55228475 -2,8 C-2,7.44771525 -1.55228475,7 -1,7 L7,7 Z" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|插图导航
    ui += '<symbol id="icoFigure">';
    ui += '<path d="M2,0 L15,0 C16.1045695,-2.02906125e-16 17,0.8954305 17,2 L17,12 C17,13.1045695 16.1045695,14 15,14 L2,14 C0.8954305,14 -1.13551567e-13,13.1045695 -1.13686838e-13,12 L-1.13686838e-13,2 C-1.13822108e-13,0.8954305 0.8954305,2.02906125e-16 2,0 Z M11,6 C12.1045695,6 13,5.1045695 13,4 C13,2.8954305 12.1045695,2 11,2 C9.8954305,2 9,2.8954305 9,4 C9,5.1045695 9.8954305,6 11,6 Z M2.03225639,10.5528128 C1.96084272,10.6932426 1.92361915,10.8485585 1.92361915,11.0061035 C1.92361915,11.5583883 2.3713344,12.0061035 2.92361915,12.0061035 L14.2120421,12.0061035 C14.4392714,12.0061035 14.6597254,11.9287155 14.8370963,11.7866848 C15.2681995,11.4414769 15.3378313,10.8121525 14.9926234,10.3810493 L12.9645536,7.84835144 C12.6449335,7.44920285 12.075683,7.35548344 11.6449719,7.63110012 L9.29545309,9.13458249 C9.28589453,9.14069912 9.27623255,9.14665259 9.26647134,9.15244033 C8.79141623,9.43411583 8.17796486,9.27735069 7.89628936,8.80229559 L6.14615975,5.85064382 C6.04943866,5.68752049 5.90832711,5.55526275 5.73928706,5.46929968 C5.247001,5.21895416 4.64497916,5.41508571 4.39463363,5.90737177 L2.03225639,10.5528128 Z M18,12.5 L18,2 C19.1045695,2 20,2.8954305 20,4 L20,15 C20,16.1045695 19.1045695,17 18,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L15.5,15 C16.8807119,15 18,13.8807119 18,12.5 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|图片墙
    ui += '<symbol id="icoFigureGrid">';
    ui += '<rect height="6" id="Rectangle-5" rx="1" width="6" x="0" y="0"></rect>';
    ui += '<rect height="6" id="Rectangle-5-Copy" rx="1" width="6" x="8" y="0"></rect>';
    ui += '<rect height="6" id="Rectangle-5-Copy-2" rx="1" width="6" x="16" y="0"></rect>';
    ui += '<rect height="6" id="Rectangle-5-Copy-5" rx="1" width="6" x="0" y="8"></rect>';
    ui += '<rect height="6" id="Rectangle-5-Copy-4" rx="1" width="6" x="8" y="8"></rect>';
    ui += '<rect height="6" id="Rectangle-5-Copy-3" rx="1" width="6" x="16" y="8"></rect>';
    ui += '</symbol>';
    // SVG 图标集：图标|亮色模式
    ui += '<symbol id="icoLightMode">';
    ui += '<path d="M10.8333333,0.83333334 L10.8333333,2.5 C10.8333333,2.9602373 10.4602373,3.33333334 10,3.33333334 C9.5397627,3.33333334 9.16666666,2.9602373 9.16666666,2.5 L9.16666666,0.83333334 C9.16666666,0.373096045 9.5397627,8.45442195e-17 10,0 C10.4602373,-8.45442195e-17 10.8333333,0.373096045 10.8333333,0.83333334 Z M10,16.6666667 C9.5397627,16.6666667 9.16666666,17.0397627 9.16666666,17.5 L9.16666666,19.1666667 C9.16666666,19.626904 9.5397627,20 10,20 C10.4602373,20 10.8333333,19.626904 10.8333333,19.1666667 L10.8333333,17.5 C10.8333333,17.0397627 10.4602373,16.6666667 10,16.6666667 Z M2.92895834,2.92895834 C2.77266874,3.08523989 2.68486548,3.29720799 2.68486548,3.51822917 C2.68486548,3.73925035 2.77266874,3.95121845 2.92895834,4.1075 L4.1075,5.28604166 C4.43294529,5.61148694 4.96059636,5.61148694 5.28604165,5.28604165 C5.61148694,4.96059636 5.61148694,4.43294529 5.28604166,4.1075 L4.1075,2.92895834 C3.95121845,2.77266874 3.73925035,2.68486548 3.51822917,2.68486548 C3.29720799,2.68486548 3.08523989,2.77266874 2.92895834,2.92895834 Z M14.7139583,14.7139583 C14.3886401,15.0393749 14.3886401,15.5668751 14.7139583,15.8922917 L14.7139583,15.8925 L15.8925,17.0710417 C16.1030262,17.2815679 16.4098748,17.3637877 16.6974589,17.2867298 C16.985043,17.2096718 17.2096718,16.985043 17.2867298,16.6974589 C17.3637877,16.4098748 17.2815679,16.1030262 17.0710417,15.8925 L15.8925,14.7139583 C15.7362456,14.5576177 15.5242673,14.4697791 15.3032292,14.4697791 C15.082191,14.4697791 14.8702128,14.5576177 14.7139583,14.7139583 Z M0,10 C5.6362813e-17,10.4602373 0.373096045,10.8333333 0.83333334,10.8333333 L2.5,10.8333333 C2.9602373,10.8333333 3.33333334,10.4602373 3.33333334,10 C3.33333334,9.5397627 2.9602373,9.16666666 2.5,9.16666666 L0.83333334,9.16666666 C0.373096045,9.16666666 5.6362813e-17,9.5397627 0,10 Z M16.6666667,10 C16.6666667,10.4602373 17.0397627,10.8333333 17.5,10.8333333 L19.1666667,10.8333333 C19.626904,10.8333333 20,10.4602373 20,10 C20,9.5397627 19.626904,9.16666666 19.1666667,9.16666666 L17.5,9.16666666 C17.0397627,9.16666666 16.6666667,9.5397627 16.6666667,10 Z M2.92895834,17.0710417 C3.08523989,17.2273313 3.29720799,17.3151345 3.51822917,17.3151345 C3.73925035,17.3151345 3.95121845,17.2273313 4.1075,17.0710417 L5.28583334,15.8925 C5.60509309,15.5660706 5.60221508,15.0435127 5.27937916,14.7206197 C4.95654324,14.3977267 4.43398579,14.3947563 4.1075,14.7139583 L2.92895834,15.8925 C2.77266874,16.0487816 2.68486548,16.2607497 2.68486548,16.4817708 C2.68486548,16.702792 2.77266874,16.9147601 2.92895834,17.0710417 Z M14.7139583,5.28604166 C15.0393749,5.61135993 15.5668751,5.61135993 15.8922917,5.28604166 L15.8925,5.28604166 L17.0710417,4.1075 C17.396487,3.78205471 17.396487,3.25440363 17.0710417,2.92895834 C16.7455964,2.60351305 16.2179453,2.60351305 15.8925,2.92895834 L14.7139583,4.1075 C14.5576177,4.26375444 14.4697791,4.4757327 14.4697791,4.69677083 C14.4697791,4.91780896 14.5576177,5.12978722 14.7139583,5.28604166 Z M15,10 C15,12.7614583 12.7614583,15 10,15 C7.23854166,15 5,12.7614583 5,10 C5,7.23854166 7.23854166,5 10,5 C12.7614583,5 15,7.23854166 15,10 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|深色模式
    ui += '<symbol id="icoDarkMode">';
    ui += '<path d="M4.1439375,12.4783274 C8.7496875,12.4783274 12.4801875,8.74489828 12.4801875,4.14181693 C12.4801875,2.62583206 12.045375,1.22347573 11.33775,0 C15.17625,1.10703459 18,4.60533142 18,8.800025 C18,13.8801213 13.8825,18 8.802,18 C4.6074375,18 1.107,15.1744742 0,11.3375418 C1.22625,12.0429388 2.628,12.4783274 4.1439375,12.4783274 Z M4.44974747,8.44974747 L3.74264069,10.2426407 L3.03553391,8.44974747 L1.24264069,7.74264069 L3.03553391,7.03553391 L3.74264069,5.24264069 L4.44974747,7.03553391 L6.24264069,7.74264069 L4.44974747,8.44974747 Z M8.39411255,4.39411255 L7.82842712,5.82842712 L7.2627417,4.39411255 L5.82842712,3.82842712 L7.2627417,3.2627417 L7.82842712,1.82842712 L8.39411255,3.2627417 L9.82842712,3.82842712 L8.39411255,4.39411255 Z M3.75269119,2.75269119 L3.32842712,3.82842712 L2.90416306,2.75269119 L1.82842712,2.32842712 L2.90416306,1.90416306 L3.32842712,0.828427125 L3.75269119,1.90416306 L4.82842712,2.32842712 L3.75269119,2.75269119 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|聚光灯
    ui += '<symbol id="icoSpotlight">';
    ui += '<path d="M11.1949511,14.3025696 L9.89553711,18.0009016 C9.79558219,18.5006762 9.19585266,19.0004508 8.3962133,19.4002705 C7.49661902,19.8000902 6.29715998,20 4.99774602,20 C3.69833205,20 2.49887301,19.8000902 1.59927873,19.4002705 C0.599729531,18.9004959 0,18.2008114 0,17.501127 C0,17.1013073 0.199909844,16.7014876 0.399819687,16.4016229 L8.59612314,7.40568004 L10.8950863,4.90680703 L15.093193,0.208925781 C15.2931028,0.0090159375 15.5929676,0.00901595703 15.7928774,0.108970859 C15.9927872,0.208925762 16.0927422,0.508790527 15.9927872,0.708700371 L13.4939142,7.90545465 L11.1949511,14.3025696 Z M11.7640774,15.7965261 L14.2708176,8.82245531 L19.5911644,15.1022089 C19.8910291,15.4020737 19.9909841,15.8018933 19.9909841,16.0018032 C19.9909841,16.4016229 19.7910742,17.0013524 18.6915701,17.501127 C17.8919307,17.8009918 16.9923364,18.0009016 15.9927872,18.0009016 C14.993238,18.0009016 13.9936888,17.8009918 13.2940044,17.6010819 C12.3944101,17.2012622 12.0945454,16.8014426 11.9945904,16.4016229 L11.7640774,15.7965261 Z M8.17832315,6.3290416 L5.99729521,0.708700371 C5.89734029,0.508790547 5.89734029,0.308880703 6.19720506,0.108970859 C6.49706982,-0.0909389844 6.69697967,0.0090159375 6.89688951,0.208925781 L10.218134,4.11138806 L8.17832315,6.3290416 Z M7.99639363,18.5006762 C8.59612314,18.2008114 8.99594283,17.9009467 8.99594283,17.501127 C8.99594283,17.1013073 8.59612316,16.8014426 7.99639363,16.5015778 C7.19675426,16.201713 6.09725016,16.0018032 4.99774602,16.0018032 C3.89824188,16.0018032 2.79873775,16.201713 1.9990984,16.5015778 C1.39936889,16.8014426 0.999549199,17.1013073 0.999549199,17.501127 C0.999549199,17.9009467 1.39936887,18.2008114 1.9990984,18.5006762 C2.79873777,18.800541 3.89824188,19.0004508 4.99774602,19.0004508 C6.09725016,19.0004508 7.19675428,18.800541 7.99639363,18.5006762 Z M12.9941396,16.0018032 C12.9940532,16.3589269 13.5655733,16.6889352 14.4933936,16.8675054 C15.4212139,17.0460756 16.5643606,17.0460756 17.4921809,16.8675054 C18.4200012,16.6889352 18.9915213,16.3589269 18.9914349,16.0018032 C18.9915213,15.6446794 18.4200012,15.3146712 17.4921809,15.136101 C16.5643606,14.9575308 15.4212139,14.9575308 14.4933936,15.136101 C13.5655733,15.3146712 12.9940532,15.6446794 12.9941396,16.0018032 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|非衬线字（小清新）体风格
    ui += '<symbol id="icoFont-sans">';
    ui += '<path d="M18,16 L14.0598232,16 L12.4935418,12.2464833 L5.32290959,12.2464833 L3.84228416,16 L0,16 L6.98708362,0 L10.8171312,0 L18,16 Z M11.3310673,9.55987559 L8.8592794,3.62602064 L6.4364378,9.55987559 L11.3310673,9.55987559 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|衬线（文艺范）字体风格
    ui += '<symbol id="icoFont-serif">';
    ui += '<path d="M10.45,11.2169143 L4.4625,11.2169143 L3.75,12.8525809 C3.5166655,13.3978058 3.4,13.8480227 3.4,14.203245 C3.4,14.6741211 3.59166475,15.0210772 3.975,15.2441238 C4.20000112,15.3762995 4.75416225,15.4754298 5.6375,15.5415177 L5.6375,16 L0,16 L0,15.5415177 C0.608336375,15.4506469 1.10833138,15.2007559 1.5,14.7918372 C1.89166862,14.3829185 2.37499713,13.5382455 2.95,12.257793 L9.0125,0 L9.25,0 L15.3625,12.6295355 C15.9458363,13.9347709 16.4249981,14.7567265 16.8,15.0954268 C17.0833347,15.3515173 17.4833307,15.5002128 18,15.5415177 L18,16 L9.8,16 L9.8,15.5415177 L10.1375,15.5415177 C10.7958366,15.5415177 11.258332,15.4506482 11.525,15.2689066 C11.7083342,15.1367308 11.8,14.9467311 11.8,14.6989016 C11.8,14.5502038 11.7750002,14.3973779 11.725,14.2404192 C11.7083332,14.1660704 11.5833345,13.8562881 11.35,13.3110632 L10.45,11.2169143 Z M10.025,10.2619342 L7.5,4.49650206 L4.9,10.2619342 L10.025,10.2619342 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|打印
    ui += '<symbol id="icoPrint">';
    ui += '<path d="M15,7.38964445e-12 C16.1045695,7.38944155e-12 17,0.8954305 17,2 L17,6 L18,6 C19.1045695,6 20,6.8954305 20,8 L20,14 C20,15.1045695 19.1045695,16 18,16 L17,16 L17,17 C17,18.1045695 16.1045695,19 15,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,8 C-1.3527075e-16,6.8954305 0.8954305,6 2,6 L3,6 L3,2 C3,0.8954305 3.8954305,7.38984736e-12 5,7.38964445e-12 L15,7.38964445e-12 Z M16,13 L4,13 L4,17 C4,17.5522847 4.44771525,18 5,18 L5,18 L15,18 C15.5522847,18 16,17.5522847 16,17 L16,17 L16,13 Z M14,15 L14,16 L6,16 L6,15 L14,15 Z M17.5,8 L16.5,8 C16.2238576,8 16,8.22385763 16,8.5 C16,8.77614237 16.2238576,9 16.5,9 L16.5,9 L17.5,9 C17.7761424,9 18,8.77614237 18,8.5 C18,8.22385763 17.7761424,8 17.5,8 L17.5,8 Z M14.1275656,8 C13.8514233,8 13.6275656,8.22385763 13.6275656,8.5 C13.6275656,8.77614237 13.8514233,9 14.1275656,9 C14.403708,9 14.6275656,8.77614237 14.6275656,8.5 C14.6275656,8.22385763 14.403708,8 14.1275656,8 Z M15,1 L5,1 C4.44771525,1 4,1.44771525 4,2 L4,2 L4,6 L16,6 L16,2 C16,1.48716416 15.6139598,1.06449284 15.1166211,1.00672773 L15,1 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|新标签打开
    ui += '<symbol id="icoNewTab">';
    ui += '<path d="M17.9987947,9 C18.5510794,9 18.9987924,9.44771525 18.9987924,10 L18.9987924,16 C18.9987924,16.5522847 18.5510794,17 17.9987947,17 C17.4465099,17 16.9987947,16.5522847 16.9987947,16 L16.9982218,12.47 L11.7071091,17.7054567 C11.3165848,18.095981 10.6834198,18.095981 10.2928955,17.7054567 C9.90237124,17.3149324 9.90237124,16.6817674 10.2928955,16.2912431 L15.6402218,11 L11.9987947,11 C11.4465099,11 10.9987947,10.5522847 10.9987947,10 C10.9987947,9.44771525 11.4465099,9 11.9987947,9 L17.9987947,9 Z"></path>';
    ui += '<path d="M1,5 L1,13.499817 C1,14.2795131 1.59488808,14.9202656 2.35553999,14.9929504 L2.5,14.999817 L8.51827299,14.999817 C8.79441537,14.999817 9.01827299,15.2236746 9.01827299,15.499817 C9.01827299,15.7452769 8.84139783,15.9494253 8.60814863,15.9917613 L8.51827299,15.999817 L2.5,15.999817 C1.1745166,15.999817 0.089961328,14.968281 0.00531767968,13.6641926 L0,13.499817 L0,2.5 C0,1.1745166 1.03153594,0.089961328 2.33562431,0.00531767968 L2.5,-1.95399252e-14 L16.5,-1.95399252e-14 C17.8254834,-1.95399252e-14 18.9100387,1.03153594 18.9946823,2.33562431 L19,2.5 L19,6.49976186 C19,6.77590424 18.7761424,6.99976186 18.5,6.99976186 C18.2545401,6.99976186 18.0503916,6.8228867 18.0080557,6.58963749 L18,6.49976186 L18,5 L1,5 Z M1,4 L18,4 L18,2.5 C18,1.72030388 17.4051119,1.07955132 16.64446,1.00686658 L16.5,1 L2.5,1 C1.72030388,1 1.07955132,1.59488808 1.00686658,2.35553999 L1,2.5 L1,4 Z"></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|复制代码块
    ui += '<symbol id="icoCopyCodeBlock">';
    ui += '<path d="M15.91965,0 C17.0679061,0.0012395937 17.998512,0.931644206 18,2.07989999 L18,13.6701 C17.998512,14.8183558 17.0679061,15.7487604 15.91965,15.75 L13.05,15.75 L13.05,15.9201 C13.0487599,17.068283 12.118283,17.9987599 10.9701,18 L2.07989999,18 C0.931716995,17.9987599 0.00124007732,17.068283 0,15.9201 L0,4.32989999 C0.00124007732,3.18171699 0.931716995,2.25124007 2.07989999,2.25 L4.95,2.25 L4.95,2.07989999 C4.95148801,0.931644206 5.88209392,0.0012395937 7.03035,0 L15.91965,0 Z M2.08035,16.65 L10.96965,16.65 C11.3725278,16.6492579 11.6990096,16.3229773 11.7,15.9201 L11.7,4.32989999 C11.7,3.92759999 11.3724,3.6 10.9701,3.6 L2.08035,3.6 C1.67805,3.6 1.34999999,3.92759999 1.34999999,4.32989999 L1.34999999,15.9201 C1.34999999,16.32285 1.67805,16.65 2.08035,16.65 Z M9.22500001,6.29999999 C9.5977922,6.29999999 9.89999998,6.6022078 9.89999998,6.97499999 C9.89999998,7.34779219 9.5977922,7.65 9.22500001,7.65 L3.82499999,7.65 C3.45220779,7.65 3.15000001,7.34779219 3.15000001,6.97499999 C3.15000001,6.6022078 3.45220779,6.29999999 3.82499999,6.29999999 L9.22500001,6.29999999 L9.22500001,6.29999999 Z M9.22500001,9.45 C9.5977922,9.45 9.89999998,9.7522078 9.89999998,10.125 C9.89999998,10.4977922 9.5977922,10.8 9.22500001,10.8 L3.82499999,10.8 C3.45220779,10.8 3.15000001,10.4977922 3.15000001,10.125 C3.15000001,9.7522078 3.45220779,9.45 3.82499999,9.45 L9.22500001,9.45 L9.22500001,9.45 Z M7.42500001,12.6 C7.79779221,12.6 8.10000001,12.9022078 8.10000001,13.275 C8.10000001,13.6477922 7.79779221,13.95 7.42500001,13.95 L3.82499999,13.95 C3.45220778,13.95 3.14999999,13.6477922 3.14999999,13.275 C3.14999999,12.9022078 3.45220778,12.6 3.82499999,12.6 L7.42500001,12.6 Z" transform="translate(9.000000, 9.000000) scale(-1, 1) translate(-9.000000, -9.000000) "></path>';
    ui += '</symbol>';
    // SVG 图标集：图标|加载中
    ui += '<symbol id="icoLoading">';
    ui += '<g id="loading">';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '<path d="M6.72865086,1.26496983 C6.71911605,1.71977213 6.95629588,2.14416725 7.34865392,2.37436546 C7.74101196,2.60456367 8.2271863,2.60456367 8.61954434,2.37436546 C9.01190238,2.14416725 9.24908222,1.71977213 9.23954741,1.26496983 C9.23959745,0.816309443 9.00026873,0.401708736 8.61172578,0.177364095 C8.22318283,-0.0469805467 7.74446372,-0.0469805467 7.35592077,0.177364095 C6.96737782,0.401708736 6.72804909,0.816309443 6.72809913,1.26496983 L6.72865086,1.26496983 L6.72865086,1.26496983 Z M1.85885777,3.33890086 C1.85885777,4.01230737 2.4047616,4.5582112 3.07816811,4.5582112 C3.75157462,4.5582112 4.29747845,4.01230737 4.29747845,3.33890086 C4.29747845,2.66549435 3.75157462,2.11959052 3.07816811,2.11959052 C2.4047616,2.11959052 1.85885777,2.66549435 1.85885777,3.33890086 L1.85885777,3.33890086 Z M0.00285776562,7.92428017 C0.00293049529,8.5373029 0.499903995,9.03421744 1.11292673,9.03421744 C1.72594946,9.03421744 2.22292296,8.5373029 2.22299569,7.92428017 C2.22292296,7.31125744 1.72594946,6.8143429 1.11292673,6.8143429 C0.499903995,6.8143429 0.00293049529,7.31125744 0.00285776562,7.92428017 Z M1.96809914,12.9275905 C1.96816693,13.4601736 2.39992984,13.8918816 2.93251293,13.8918816 C3.46509602,13.8918816 3.89685893,13.4601736 3.89692672,12.9275905 C3.89685893,12.3950074 3.46509602,11.9632995 2.93251293,11.9632995 C2.39992984,11.9632995 1.96816693,12.3950074 1.96809914,12.9275905 L1.96809914,12.9275905 Z M7.18382328,15.0175215 C7.18382328,15.4809837 7.55953357,15.856694 8.0229957,15.856694 C8.48645782,15.856694 8.86216811,15.4809837 8.86216811,15.0175215 C8.86216811,14.5540594 8.48645782,14.1783491 8.0229957,14.1783491 C7.55953357,14.1783491 7.18382328,14.5540594 7.18382328,15.0175215 Z M12.5874095,13.0920043 C12.5874095,13.4241369 12.8566562,13.6933836 13.1887888,13.6933836 C13.5209214,13.6933836 13.7901681,13.4241369 13.7901681,13.0920043 C13.7901681,12.7598717 13.5209214,12.490625 13.1887888,12.490625 C12.8566562,12.490625 12.5874095,12.7598717 12.5874095,13.0920043 Z M15.0892026,7.90138363 C15.0892026,8.13677119 15.2800219,8.32759052 15.5154095,8.32759052 C15.7507971,8.32759052 15.9416164,8.13677119 15.9416164,7.90138363 C15.9416164,7.66599606 15.7507971,7.47517673 15.5154095,7.47517673 C15.2800219,7.47517673 15.0892026,7.66599606 15.0892026,7.90138363 Z M13.8089267,3.4310388 C13.8089267,3.59916189 13.9452174,3.73545259 14.1133405,3.73545259 C14.2814636,3.73545259 14.4177543,3.59916189 14.4177543,3.4310388 C14.4177543,3.2629157 14.2814636,3.126625 14.1133405,3.126625 C13.9452174,3.126625 13.8089267,3.2629157 13.8089267,3.4310388 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|播放
    ui += '<symbol id="icoPlay">';
    ui += '<g id="play">';
    ui += '<path d="M14.1329221,9.60458431 L6.2734657,15.6325342 C5.34309563,16.2655554 4.05015741,16.0602894 3.38560736,15.1740596 C3.13481735,14.8396114 3,14.4388779 3,14.0278733 L3,1.97197357 C3,0.882882638 3.92685626,-1.95399252e-14 5.07019139,-1.95399252e-14 C5.50166685,-1.95399252e-14 5.92235968,0.128421099 6.2734657,0.367312671 L14.1329221,6.39526252 C15.0632922,7.02828376 15.2787819,8.25988003 14.6142318,9.14610977 C14.4814505,9.32318416 14.318816,9.4781026 14.1329221,9.60458431 Z"></path>';
    ui += '<rect id="Rectangle" fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|暂停
    ui += '<symbol id="icoPause">';
    ui += '<g id="pause">';
    ui += '<path d="M4,2 C5.1045695,2 6,2.8954305 6,4 L6,12 C6,13.1045695 5.1045695,14 4,14 L3,14 C1.8954305,14 1,13.1045695 1,12 L1,4 C1,2.8954305 1.8954305,2 3,2 L4,2 Z M13,2 C14.1045695,2 15,2.8954305 15,4 L15,12 C15,13.1045695 14.1045695,14 13,14 L12,14 C10.8954305,14 10,13.1045695 10,12 L10,4 C10,2.8954305 10.8954305,2 12,2 L13,2 Z"></path>';
    ui += '<rect  fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|停止
    ui += '<symbol id="icoStop">';
    ui += '<g id="stop">';
    ui += '<rect x="2" y="2" width="12" height="12" rx="2"></rect>';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|无法播放
    ui += '<symbol id="icoForbidden">';
    ui += '<g id="forbidden">';
    ui += '<path d="M3.11014702,4.52295457 C1.18968426,7.22400289 1.82212581,10.9699964 4.52157146,12.8902277 C6.60400096,14.3708881 9.39599904,14.3708881 11.4784285,12.8902277 L3.11014702,4.52295457 Z M4.52157146,3.10977226 L12.889853,11.4770454 C14.8103157,8.77599711 14.1798024,5.03000361 11.4784285,3.10977226 C9.39599904,1.62911194 6.60400096,1.62911194 4.52157146,3.10977226 L4.52157146,3.10977226 Z M8,16 C3.58062184,16 0,12.4178817 0,8.00096397 C0,3.58404627 3.58062184,0 8,0 C12.4193782,0 16,3.58211833 16,8.00096397 C16,12.4198096 12.4193782,16 8,16 Z"></path>';
    ui += '<rect fill-opacity="0" x="0" y="0" width="16" height="16"></rect>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|复选框（未选择）
    ui += '<symbol id="icoCheckbox_uncheck">';
    ui += '<g id="uncheck">';
    ui += '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 -1.73547709e-16,12.209139 0,10 L0,4 C-7.1463071e-16,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,1 L4,1 L3.79460158,1.00692108 C3.04801112,1.05740265 2.37633177,1.38102754 1.87867966,1.87867966 C1.33578644,2.42157288 1,3.17157288 1,4 L1,4 L1,10 L1.00692108,10.2053984 C1.05740265,10.9519889 1.38102754,11.6236682 1.87867966,12.1213203 C2.42157288,12.6642136 3.17157288,13 4,13 L4,13 L10,13 L10.2053984,12.9930789 C10.9519889,12.9425974 11.6236682,12.6189725 12.1213203,12.1213203 C12.6642136,11.5784271 13,10.8284271 13,10 L13,10 L13,4 L12.9930789,3.79460158 C12.9425974,3.04801112 12.6189725,2.37633177 12.1213203,1.87867966 C11.5784271,1.33578644 10.8284271,1 10,1 L10,1 Z" opacity="0.5"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|复选框（已选择）
    ui += '<symbol id="icoCheckbox_checked">';
    ui += '<g id="checked">';
    ui += '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 -1.13860385e-13,12.209139 -1.13686838e-13,10 L-1.13686838e-13,4 C-1.14401468e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10.4345054,3.35937475 C9.98210026,3.04259723 9.35855448,3.15254517 9.04177696,3.60495035 L9.04177696,3.60495035 L5.70337129,8.3716637 L4.42132034,7.08974545 C4.03079605,6.69922116 3.39763107,6.69922116 3.00710678,7.08974545 C2.61658249,7.48026975 2.61658249,8.11343472 3.00710678,8.50395902 L3.00710678,8.50395902 L5.12842712,10.6252794 C5.44611554,10.9429678 5.92437612,11.0022192 6.30159501,10.8029483 C6.31888566,10.7941174 6.33594939,10.7847657 6.35288228,10.7742207 L6.36250295,10.7684416 L6.36250295,10.7684416 L6.37216074,10.7632115 C6.48435662,10.6938722 6.58459456,10.6010641 6.665046,10.4861675 L6.665046,10.4861675 L10.6800811,4.75210323 C10.9968586,4.29969805 10.8869106,3.67615226 10.4345054,3.35937475 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|复选框（不确定选择）
    ui += '<symbol id="icoCheckbox_indeterminate">';
    ui += '<g id="indeterminate">';
    ui += '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 2.27200128e-13,12.209139 2.27373675e-13,10 L2.27373675e-13,4 C2.26659045e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,6 L4,6 C3.44771525,6 3,6.44771525 3,7 C3,7.55228475 3.44771525,8 4,8 L4,8 L10,8 C10.5522847,8 11,7.55228475 11,7 C11,6.44771525 10.5522847,6 10,6 L10,6 Z" opacity="0.5"></path>';
    ui += '<path d="M10,0 C12.209139,-8.49901461e-16 14,1.790861 14,4 L14,10 C14,12.209139 12.209139,14 10,14 L4,14 C1.790861,14 1.1351329e-13,12.209139 1.13686838e-13,10 L1.13686838e-13,4 C1.12972207e-13,1.790861 1.790861,-3.82769592e-17 4,0 L10,0 Z M10,1 L4,1 L3.79460158,1.00692108 C3.04801112,1.05740265 2.37633177,1.38102754 1.87867966,1.87867966 C1.33578644,2.42157288 1,3.17157288 1,4 L1,4 L1,10 L1.00692108,10.2053984 C1.05740265,10.9519889 1.38102754,11.6236682 1.87867966,12.1213203 C2.42157288,12.6642136 3.17157288,13 4,13 L4,13 L10,13 L10.2053984,12.9930789 C10.9519889,12.9425974 11.6236682,12.6189725 12.1213203,12.1213203 C12.6642136,11.5784271 13,10.8284271 13,10 L13,10 L13,4 L12.9930789,3.79460158 C12.9425974,3.04801112 12.6189725,2.37633177 12.1213203,1.87867966 C11.5784271,1.33578644 10.8284271,1 10,1 L10,1 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|链接检查结果正常
    ui += '<symbol id="icoLinkOK">';
    ui += '<g id="linkok">';
    ui += '<path d="M10.8685137,7.01413306 C10.8603674,6.99758704 10.8549366,6.98104102 10.8467903,6.964495 C10.8440748,6.96173733 10.8440748,6.95897966 10.8413594,6.95346432 C10.6458484,6.55360221 10.2249565,6.29438125 9.75790233,6.33023095 C9.14693029,6.37986901 8.6880224,6.92312996 8.73690017,7.54360565 C8.75047732,7.7035505 8.79392422,7.849707 8.86181,7.98207515 C9.17136917,8.69079628 9.03559761,9.55394691 8.46535704,10.1358152 L5.47838262,13.1747673 C4.73706988,13.9276112 3.53141839,13.9276112 2.79010565,13.1747673 C2.04879291,12.4219235 2.04879291,11.1975181 2.79010565,10.4446743 L3.90343247,9.31402964 L3.89528618,9.30575664 C4.15325215,9.07962771 4.30260087,8.73491899 4.27544656,8.36539124 C4.2265688,7.74491555 3.69162883,7.27886936 3.08065679,7.32850741 C2.78739022,7.35056877 2.53213967,7.48845226 2.34749035,7.69251982 L2.34477492,7.68976215 L1.20972464,8.84246811 C-0.403241546,10.480524 -0.403241546,13.1334023 1.20972464,14.7714581 C2.82269082,16.409514 5.43493572,16.409514 7.04790191,14.7714581 L10.0430226,11.7297484 C11.2975519,10.4529473 11.569095,8.56394347 10.8685137,7.01413306 L10.8685137,7.01413306 Z"></path>';
    ui += '<path d="M14.7923119,1.22854188 C13.1793458,-0.409513961 10.5671009,-0.409513961 8.95413467,1.22854188 L5.95901396,4.27025164 C4.7044847,5.54429507 4.43294158,7.43329886 5.13080742,8.98310927 C5.13895371,8.99965529 5.14438457,9.01620131 5.15253087,9.03274733 C5.1552463,9.035505 5.1552463,9.03826267 5.15796173,9.04377801 C5.35347278,9.44364012 5.77436463,9.70286108 6.24141881,9.66701138 C6.85239085,9.61737332 7.31129874,9.07411238 7.26242098,8.45363668 C7.24884382,8.29369183 7.20539692,8.14753533 7.13751114,8.01516718 C6.82795197,7.30644605 6.96372354,6.44329542 7.53396411,5.86142709 L10.523654,2.82523268 C11.2649667,2.07238883 12.4706182,2.07238883 13.2119309,2.82523268 C13.9532437,3.57807653 13.9532437,4.8024819 13.2119309,5.55532575 L12.0986041,6.68597036 L12.1067504,6.69424336 C11.8487844,6.92037229 11.6994357,7.26508101 11.72659,7.63460876 C11.7754678,8.25508445 12.3104077,8.72113064 12.9213798,8.67149259 C13.2146464,8.64943123 13.4698969,8.51154774 13.6545462,8.30748018 L13.6572617,8.31023785 L14.7923119,7.15753189 C16.4025627,5.51947604 16.4025627,2.86384006 14.7923119,1.22854188 Z"></path>';
    ui += '<path d="M16,10 C18.2091404,10 20,11.7908606 20,14 C20,16.2091394 18.2091404,18 16,18 C13.7908596,18 12,16.2091394 12,14 C12,11.7908606 13.7908596,10 16,10 Z M17.6822792,12.5943032 L17.6771246,12.5990389 L15.1407928,14.9394845 L14.2240628,14.1910878 L14.2147843,14.1837134 C14.0430722,14.0516383 13.7963288,14.079336 13.6584279,14.2482481 C13.5194611,14.4184535 13.5431028,14.6682744 13.7103242,14.8095238 L13.7156012,14.8138925 L14.8814335,15.7656793 L14.890712,15.7730537 C14.9667027,15.831608 15.0611853,15.8609385 15.1569732,15.8557099 C15.2615489,15.8607738 15.3639537,15.8247085 15.4422806,15.7552294 L15.4484837,15.7496024 L18.2223678,13.189882 L18.2311046,13.1815815 C18.38585,13.0301092 18.3929966,12.7820183 18.2451708,12.6218261 C18.0961916,12.4603582 17.8456041,12.4486675 17.6822792,12.5943032 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    // SVG 图标集：图标|链接检查结果异常
    ui += '<symbol id="icoLinkError">';
    ui += '<g id="linkerror">';
    ui += '<path d="M15,9 C15.2886741,9 15.5545759,9.15405217 15.6943297,9.40226501 L15.6943297,9.40226501 L19.8999835,16.8412623 C20.0367271,17.0829025 20.0330292,17.3776316 19.8902645,17.6158855 C19.7474998,17.8541393 19.4870188,18.0002871 19.2056539,18 L19.2056539,18 L10.7943461,18 C10.5129812,18.0002871 10.2525002,17.8541393 10.1097355,17.6158855 C9.96697079,17.3776316 9.9632729,17.0829025 10.1000165,16.8412623 L10.1000165,16.8412623 L14.3056703,9.40226501 C14.4454241,9.15405217 14.7113259,9 15,9 Z M15,15.6606918 C14.4741015,15.6606918 14.0477765,16.0796293 14.0477765,16.5964148 C14.0477765,16.9307164 14.2292692,17.2396238 14.5238882,17.4067746 C14.8185072,17.5739254 15.1814928,17.5739254 15.4761118,17.4067746 C15.7707308,17.2396238 15.9522235,16.9307164 15.9522235,16.5964148 C15.9522235,16.0796293 15.5258985,15.6606918 15,15.6606918 Z M15,10.9820772 L14.8732573,10.9874923 C14.4287394,11.0272027 14.2064804,11.2853208 14.2064804,11.7618463 L14.2064804,11.7618463 L14.2064804,14.1011536 C14.2064804,14.6209997 14.4709869,14.8809227 15,14.8809227 L15,14.8809227 L15.1267427,14.8755077 C15.5712606,14.8357972 15.7935196,14.5776792 15.7935196,14.1011536 L15.7935196,14.1011536 L15.7935196,11.7618463 C15.7935196,11.2420002 15.5290131,10.9820772 15,10.9820772 L15,10.9820772 Z"></path>';
    ui += '<path d="M8.61062487,5.50299998 C8.99983668,5.47312522 9.35057989,5.68914268 9.51350577,6.02236112 C9.51576863,6.02695723 9.51576863,6.02925529 9.51803149,6.03155335 C9.52482007,6.0453417 9.52934579,6.05913005 9.53613436,6.07291839 C10.1199521,7.36442707 9.89366615,8.9385969 8.8482251,10.0025978 L8.8482251,10.0025978 L6.35229118,12.5373559 C5.00815269,13.9024025 2.83128194,13.9024025 1.48714346,12.5373559 C0.14300497,11.1723094 0.14300497,8.96157748 1.48714346,7.59653094 L1.48714346,7.59653094 L2.43301869,6.63594264 C2.58915599,6.46818439 2.80186477,6.35328149 3.04625359,6.33489702 C3.55539695,6.29353198 4.00118026,6.6819038 4.04191173,7.19896688 C4.06454032,7.50690667 3.94008305,7.79416394 3.72511141,7.98260471 L3.72511141,7.98260471 L3.73189999,7.98949888 L2.80412763,8.93170272 C2.18636701,9.55907259 2.18636701,10.5794104 2.80412763,11.2067803 C3.42188825,11.8341502 4.42659783,11.8341502 5.04435844,11.2067803 L5.04435844,11.2067803 L7.53350379,8.67432021 C8.00870426,8.18942994 8.12184723,7.47013774 7.86388126,6.8795368 C7.80730978,6.76923001 7.77110403,6.64743293 7.75978973,6.51414556 C7.71905826,5.99708248 8.1014815,5.54436502 8.61062487,5.50299998 Z M11.392581,0.774705066 C13.2202354,0.200475309 15.1422982,1.22245422 15.6882515,3.05875357 C16.2332857,4.89196151 15.1943311,6.84595101 13.3686747,7.42124311 L13.3686747,7.42124311 L12.0825475,7.82533072 C11.8659287,7.90015044 11.6241744,7.90174296 11.3997609,7.80324188 C10.9307943,7.60073671 10.7195205,7.04854216 10.9263032,6.57288029 C11.0508923,6.29036211 11.2956406,6.09515815 11.5739169,6.0296979 L11.5739169,6.0296979 L11.5711596,6.02042366 L12.8326718,5.62406979 C13.6726544,5.36015611 14.151674,4.45925129 13.9007561,3.61529553 C13.6498381,2.77133977 12.7627322,2.29965719 11.9227497,2.56357087 L11.9227497,2.56357087 L8.53512766,3.62792603 C7.88790836,3.83296561 7.45032181,4.41494552 7.4008219,5.05752289 C7.39898565,5.18147671 7.37377317,5.30601472 7.32118847,5.42901222 C7.11440581,5.90467409 6.56420816,6.12486304 6.09524153,5.92235788 C5.73756255,5.76601184 5.52928873,5.41061578 5.5418703,5.0399123 C5.54203006,5.03479182 5.54310893,5.03276276 5.54218982,5.02967135 C5.5426691,5.01430991 5.54514636,5.00001083 5.54562564,4.98464939 C5.63846977,3.57129144 6.57729636,2.2876168 7.99880532,1.84099365 L7.99880532,1.84099365 Z"></path>';
    ui += '<path d="M0.782543585,3.4507195 L3.40869759,3.9137813 C3.7712938,3.9777168 4.01340614,4.32348905 3.94947064,4.68608526 C3.88553515,5.04868146 3.53976289,5.2907938 3.17716669,5.22685831 L0.551012682,4.7637965 C0.188416479,4.69986101 -0.0536958622,4.35408875 0.0102396313,3.99149255 C0.0741751249,3.62889634 0.419947383,3.386784 0.782543585,3.4507195 Z M3.67286326,0.33344465 L5.0061966,2.64284573 C5.19029151,2.96170748 5.08104141,3.36943441 4.76217966,3.55352933 C4.44331791,3.73762425 4.03559098,3.62837414 3.85149606,3.30951239 L2.51816273,1.00011132 C2.33406781,0.681249568 2.44331791,0.273522631 2.76217966,0.0894277143 C3.08104141,-0.0946672023 3.48876835,0.0145829012 3.67286326,0.33344465 Z"></path>';
    ui += '</g>';
    ui += '</symbol>';
    ui += '</svg>';

    // --------------------------------------------------
    // 遮罩
    ui += '<div class="mdx-mask mdx-backdrop-blurs">';
    ui += '<div class="mdx-copyright">';
    ui += '<svg height="24px" width="24px" style="display: inline-block; vertical-align: middle; cursor: pointer;" onclick="env.show()">';
    ui += '<use xlink:href="#icoVLOOK-dark"></use>';
    ui += '</svg>&nbsp;&nbsp;';
    ui += '<a href="https://github.com/MadMaxChow/VLOOK" target="_blank"><strong>VLOOK™</strong></a> (V10.1) for <a href="https://www.typora.io" target="_blank">Typora</a>. Powered by <strong><a href="mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + VLOOK.version + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(true)) + '">MAX°孟兆</a></strong>';
    ui += '</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 大纲面板
    ui += '<div class="mdx-toc-panel mdx-float-card">';
    ui += '<div class="mdx-toc-panel-header"><div class="mdx-toc-panel-title">大纲</div></div>';
    ui += '<div class="mdx-toc-panel-body-scroll"><div class="mdx-toc-panel-body"></div></div>';
    ui += '<div class="mdx-toc-panel-footer"></div>';
    ui += '</div>';

    // --------------------------------------------------
    // 逐章导航栏
    ui += '<div class="mdx-chapter-nav mdx-backdrop-blurs">';
    // 上一章
    ui += '<div class="mdx-chapter-nav-prev">';
    ui += '<svg height="15px" style="position: absolute; top: 18px; left: 10px; cursor: pointer;" width="10px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoPrevChapter"></use>prev';
    ui += '</svg>';
    ui += '<div class="mdx-chapter-nav-prev-text"></div>';
    ui += '</div>';
    // 当前章节
    ui += '<div class="mdx-chapter-nav-current"></div>';
    // 下一章
    ui += '<div class="mdx-chapter-nav-next">';
    ui += '<div class="mdx-chapter-nav-next-text">next</div>';
    ui += '<svg height="15px" style="position: absolute; top: 18px; right: 10px; cursor: pointer;" width="10px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoNextChapter"></use>next';
    ui += '</svg>';
    ui += '</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 插图导航面板
    ui += '<div class="mdx-figure-nav mdx-backdrop-blurs">';
    ui += '<div class="mdx-figure-content"></div>';
    ui += '<div class="mdx-figure-nav-title"></div>';
    ui += '<div class="mdx-btn-figure-nav mdx-btn-figure-prev">';
    ui += '<svg width="12px" height="54px"><use class="mdx-svg-ico-light" xlink:href="#icoPrevFig"></use></svg>';
    ui += '</div>';
    ui += '<div class="mdx-btn-figure-nav mdx-btn-figure-next">';
    ui += '<svg width="12px" height="54px"><use class="mdx-svg-ico-light" xlink:href="#icoNextFig"></use></svg>';
    ui += '</div>';
    ui += '<div class="mdx-btn-close-figure-viewer">';
    ui += '<svg width="16px" height="16px"><use class="mdx-svg-ico-light" xlink:href="#icoClose"></use></svg>';
    ui += '</div>';
    ui += '<div class="mdx-copyright">';
    ui += '<svg width="24px" height="24px" style="display: inline-block; vertical-align: middle; cursor: pointer;" onclick="env.show()"><use xlink:href="#icoVLOOK-dark"></use></svg>&nbsp;&nbsp;';
    ui += '<a href="https://github.com/MadMaxChow/VLOOK" target="_blank"><strong>VLOOK™</strong></a> (V10.1) for <a href="https://www.typora.io" target="_blank">Typora</a>. Powered by <strong><a href="mailto:67870144@qq.com?subject=Feedback%20about%20VLOOK%20' + VLOOK.version + '&body=Hi,%0D%0A%0D%0A====================%0D%0A%0D%0A' + encodeURI(env.print(true)) + '">MAX°孟兆</a></strong>';
    ui += '</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 页面工具栏
    ui += '<div class="mdx-toolbar mdx-backdrop-blurs">';
    // 页面工具栏按钮：大纲
    ui += '<div class="mdx-btn mdx-btn-outline">';
    ui += '<svg width="20px" height="14px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoOutline"></use>';
    ui += '</svg>';
    ui += '</div>';
    // 页面工具栏按钮：插图
    ui += '<div class="mdx-btn mdx-btn-figure-viewer">';
    ui += '<svg width="20px" height="18px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoFigure"></use>';
    ui += '</svg>';
    ui += '</div>';
    // 页面工具栏按钮：打印
    ui += '<div class="mdx-btn mdx-btn-print">';
    ui += '<svg width="20px" height="19px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoPrint"></use>';
    ui += '</svg>';
    ui += '</div>';
    // 页面工具栏按钮：聚光灯
    ui += '<div class="mdx-btn mdx-btn-spotlight">';
    ui += '<svg width="20px" height="20px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoSpotlight"></use>';
    ui += '</svg>';
    ui += '</div>';
    // 页面工具栏按钮：字体风格
    ui += '<div class="mdx-btn mdx-btn-font-style">';
    ui += '<svg width="16px" height="18px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoSerifFont"></use>';
    ui += '</svg>';
    ui += '</div>';
    // 页面工具栏按钮：Light/Dark模式
    ui += '<div class="mdx-btn mdx-btn-color-scheme">';
    ui += '<svg width="20px" height="20px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoLightMode"></use>';
    ui += '</svg>';
    ui += '</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 脚注弹层
    ui += '<div class="mdx-footer-note-panel">';
    ui += '<div class="mdx-footer-note-panel-content"></div>';
    ui += '<div class="mdx-footer-note-panel-header"></div>';
    ui += '<div class="mdx-footer-note-panel-all"><a>查看所有脚注 ▶</a></div>';
    ui += '<a name="xFooterArea"></a>';
    ui += '</div>';

    // --------------------------------------------------
    // 在新标签打开的按钮
    ui += '<div class="mdx-btn mdx-btn-open-in-new-tab">';
    ui += '<svg width="20px" height="18px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoNewTab"></use>';
    ui += '</svg>';
    ui += '</div>';

    // --------------------------------------------------
    // 复制代码块内容的按钮
    ui += '<div class="mdx-btn mdx-btn-copy-code-block">';
    ui += '<svg width="18px" height="18px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoCopyCodeBlock"></use>';
    ui += '</svg>';
    ui += '</div>';

    // --------------------------------------------------
    // 聚光灯
    ui += '<div class="mdx-spotlight"><div></div></div>';

    // --------------------------------------------------
    // 提示信息
    ui += '<div class="mdx-tool-tips mdx-backdrop-blurs"></div>';
    ui += '<div class="mdx-info-tips mdx-float-card mdx-backdrop-blurs"></div>';
    ui += '<div class="mdx-bottom-tips"><div></div></div>';

    // --------------------------------------------------
    // 字体风格选择器
    ui += '<div class="mdx-font-styler">';
    ui += '<div style="float: left; margin-bottom: 30px;">';
    ui += '<img alt="小清新" class="mdx-fontstyle-sans" src="https://s3.ax1x.com/2021/01/05/skD94P.png?mode=logo" srcset="https://s3.ax1x.com/2021/01/05/skDpNt.png 2x,https://s3.ax1x.com/2021/01/05/skDP9f.png 3x">';
    ui += '<div class="mdx-fontinfo-sans"><span class="mdx-font-package">Font Package - </span><span id="fontset-sans-status">Loading... 0%</span></div>';
    ui += '</div>';
    ui += '<div style="float: right; margin-bottom: 30px;">';
    ui += '<img alt="文艺范" class="mdx-fontstyle-serif" src="https://s3.ax1x.com/2021/01/05/skDkjg.png?mode=logo" srcset="https://s3.ax1x.com/2021/01/05/skDEuQ.png 2x,https://s3.ax1x.com/2021/01/05/skDFgS.png 3x">';
    ui += '<div class="mdx-fontinfo-serif"><span class="mdx-font-package">Font Package - </span><span id="fontset-serif-status">Loading... 0%</span></div>';
    ui += '</div>';
    ui += '<div class="mdx-font-styler-info">Download Font Package</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 文档更多内容遮罩栏
    ui += '<div class="mdx-more-doc-content"></div>';

    // --------------------------------------------------
    // 表格十字光标
    ui += '<div data-vk-direction="left" class="mdx-table-cross mdx-table-cross-left">&nbsp;</div>';
    ui += '<div data-vk-direction="right" class="mdx-table-cross mdx-table-cross-right">&nbsp;</div>';
    ui += '<div data-vk-direction="up" class="mdx-table-cross mdx-table-cross-up">&nbsp;</div>';
    ui += '<div data-vk-direction="down" class="mdx-table-cross mdx-table-cross-down">&nbsp;</div>';

    // --------------------------------------------------
    // 内容展开操作区
    ui += '<div class="mdx-content-expander">';
    ui += '<div class="mdx-btn">';
    ui += '<span></span>';
    ui += '<svg width="20px" height="20px">';
    ui += '<use class="mdx-svg-ico-light" xlink:href="#icoExtend"></use>';
    ui += '</svg>';
    ui += '</div>';
    ui += '</div>';

    // --------------------------------------------------
    // 页面坏链检查结果及错误列表
    ui += '<div class="mdx-link-error-list"></div>';
    ui += '<div class="mdx-link-chk-result mdx-float-card"><svg width="20px" height="18px"><use class="mdx-svg-ico-light" xlink:href="#icoLinkOK"></use></svg></div>';

    // --------------------------------------------------
    //统计数据上报中转页面
    ui += '<iframe name="vlook-stat-gitee" style="display: block; margin: 0; border: none; overflow: hidden; width: 100%; height: 0;"></iframe>';

    $(".mdx-before-write").after(ui);
}

/**
 * 加载 VLOOK 插件
 */
function loadVLOOK() {
    // 推荐的浏览器类型检测
    if (env.browser.Chrome === false &&
        env.browser.Firefox === false) {
        // env.browser.Safari === false) {
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

    // 锁定页面滚动
    VLOOK.doc.scroll.freeze();

    // ----------------------------------------
    // 初始化 VLOOK 核心模块
    VLOOK.initKernel(null);

    // ----------------------------------------
    // 完成初始化后恢复显示
    iStopwatch.lapStart();
    console.info("- Writer Ready");
    VOM.doc().show();
    VOM.doc().css({
        "filter": "none"
    });
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // 初始化须在页面 body 显示后才能执行的部分
    // 独立线程进行处理
    setTimeout(VLOOK.initRestyle,500);

    // ----------------------------------------
    // 更新欢迎屏
    iStopwatch.lapStart();
    console.info("- Welcome Screen Done");
    iWelcomeScreen.done();
    iStopwatch.lapStop("    ");

    // ----------------------------------------
    // VLOOK 加载完成
    gTotalLoadTimeCost = iStopwatch.stop() - 200;
    console.info("=== ALL DONE !!! ===");
    console.info("- Total Time Cost");
    console.info("    ├ Docment ⏱ " + gDocLoadTimeCost + " ms");
    console.info("    └ VLOOK   ⏱ " + (gTotalLoadTimeCost - gDocLoadTimeCost) + " ms");
    console.info("    ⏱ " + gTotalLoadTimeCost + " ms");

    // 提交统计数据
    VLOOK.report.submit(gTotalLoadTimeCost - gDocLoadTimeCost);
    VLOOK.report.push(['DocLoadTime', 'All', 'Times', gDocLoadTimeCost]);
    VLOOK.report.push(['VlookLoadTime', 'All', 'Times', gTotalLoadTimeCost - gDocLoadTimeCost]);

    // ----------------------------------------
    // 初始化，并安装自动适配器，实时跟随系统 Color Scheme 的变化
    ColorScheme.init();
    // 判断是否强制使用指定的颜色方案
    ColorScheme.scheme = VLOOK.util.getStyleValue("--vlook-color-scheme").trim();
    console.info("System Color Scheme [ " + ColorScheme.scheme + " ]");
    let colorScheme = VLOOK.util.getQueryParams(window.location.href)["cs"];
    if (colorScheme === "light" || colorScheme === "dark") {
        console.info("Change Color Scheme to [ " + colorScheme + " ]");
        ColorScheme.toggle(colorScheme);
    }

    // URL 带锚点的处理
    VLOOK.util.redirectToHash();
}
