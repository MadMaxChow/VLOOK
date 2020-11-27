    /****************************************
    starter of VLOOK.js - Typora Plugin
    V9.31-dev2
    2020-11-24
    powered by MAX°孟兆

    QQ Group: 805502564
    email: maxchow@qq.com

    https://github.com/MadMaxChow/VLOOK
    ***************************************/

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

    // 动态加载指定的 vlook 主题
    let theme = parseQueryString(window.location.href)["theme"];
    if (theme !== undefined) {
        console.log("Theme :: " + theme);
        let style = document.createElement("link");
        style.href = "https://madmaxchow.gitee.io/vlook/css/vlook-" + theme + "-solid.css?v=" + vlookVersion;
        style.rel = "stylesheet";
        style.type = "text/css";
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }

    // 动态加载 VLOOK 所须的 js 资源
    let jsSrc = [];
    jsSrc[0] = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/js/jquery.js";
    jsSrc[1] = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/js/velocity.js";
    jsSrc[2] = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/js/clipboard.js";
    jsSrc[3] = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/js/vlook.js";
    for (let i = 0; i < jsSrc.length; i++) {
        let js = document.createElement("script");
        js.setAttribute("type", "text/javascript");
        js.setAttribute("type", "text/javascript");
        js.setAttribute("src", jsSrc[i] + "?v=" + vlookVersion);
        document.getElementsByTagName("HEAD")[0].appendChild(js);
    }
