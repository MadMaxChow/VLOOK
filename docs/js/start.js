    let vkVersion = "9.31-dev20201125.03";

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
        style.href = "https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/released/css/vlook-" + theme + "-solid.css?v=" + vkVersion;
        style.rel = "stylesheet";
        style.type = "text/css";
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }

    // 加载 vlook.js
    let vlookjs = document.createElement("script");
    vlookjs.setAttribute("type", "text/javascript");
    vlookjs.setAttribute("src","https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/docs/js/vlook.js?v=" + vkVersion);

    // vlookjs.setAttribute("src","https://madmaxchow.gitee.io/vlook/js/vlook.js?v=" + ver);

    document.getElementsByTagName("HEAD")[0].appendChild(vlookjs);



    // <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/MadMaxChow/VLOOK@master/released/theme/vlook-hope.css" /> -->

