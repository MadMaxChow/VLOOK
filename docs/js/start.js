    /****************************************
    starter of VLOOK.js - Typora Plugin
    V9.31-dev20201128
    2020-11-24
    powered by MAX°孟兆

    QQ Group: 805502564
    email: maxchow@qq.com

    https://github.com/MadMaxChow/VLOOK
    ***************************************/

   let vlookVersion = "9.31-dev20201128";

    /**
     * 获取 URL 中的参数数组
     */
    function parseQueryString(url) {
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
    }

    // 资源域名配置
    let cssHost = "https://madmaxchow.gitee.io/vlook/",
        fontHost = "https://cdn.jsdelivr.net/gh/madmaxchow/openfonts@master/";
    jsHost = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/";
    // Debug 模式
    if (vlookDevMode === true) {
        jsHost = "http://localhost/";
        // fontHost = "http://localhost:8080/font/";
        cssHost = jsHost;
    }

    // 动态加载指定的 VLOOK 主题
    let theme = parseQueryString(window.location.href)["theme"];
    if (theme !== undefined) {
        console.log("Theme :: " + theme);
        let style = document.createElement("link");
        style.href = cssHost + "css/vlook-" + theme + "-solid.css?v=" + vlookVersion + (vlookDevMode === true ? new Date().getTime() : "");
        style.rel = "stylesheet";
        style.type = "text/css";
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }
    else {
        console.log(getComputedStyle(document.documentElement).getPropertyValue("--vlook-theme-version"));
    }

    // 动态加载 VLOOK 所须的 js 资源
    let jsSrc = [];
    jsSrc[0] = jsHost + "js/jquery.js";
    jsSrc[1] = jsHost + "js/velocity.js";
    jsSrc[2] = jsHost + "js/clipboard.js";
    jsSrc[3] = jsHost + "js/vlook.js";
    for (let i = 0; i < jsSrc.length; i++) {
        let js = document.createElement("script");
        js.setAttribute("type", "text/javascript");
        js.setAttribute("async", "async"); // 异步
        js.setAttribute("src", jsSrc[i] + "?v=" + vlookVersion + (vlookDevMode === true ? new Date().getTime() : ""));
        document.getElementsByTagName("HEAD")[0].appendChild(js);
    }
