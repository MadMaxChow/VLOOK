/**************************************
 *
 * starter of VLOOK.js - Typora Plugin
 * (配合 vlook.js 进行使用)
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

let sVer = "V15.1";

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

// 动态加载指定的 VLOOK 主题
let theme = parseQueryString(window.location.href)["theme"],
    themmeVersion = getComputedStyle(document.documentElement).getPropertyValue("--v-theme-version").trim().replace(/"/g, "");
if (theme !== undefined || (sVer.indexOf("dev") === -1 && themmeVersion !== sVer)) {
    if (theme === undefined && themmeVersion !== sVer)
        theme = getComputedStyle(document.documentElement).getPropertyValue("--v-theme-name").trim().replace(/"/g, "");

    theme = (theme === "") ? "vlook-owl" : theme;
    console.log("Reload Theme :: " + theme);
    console.log("Theme Version :: " + themmeVersion);
    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = cssHost + theme + ".css?ts=" + (devMode === true ? new Date().getTime() : Math.round(new Date().getTime()/1000/60)); // 1000/60/60/24 按天
    console.log(style);
    document.getElementsByTagName("HEAD").item(0).appendChild(style);
}

// 动态加载 VLOOK 所须的 js 资源
let jsSrc = [
    jsHost + "jquery.js",
// jsHost + "js/velocity.js",
    jsHost + "clipboard.js",
    jsHost + "vlook-min.js",
    // jsHost + "vlook.js",
    // jsHost + (startVersion.indexOf("dev") > 0 ? "vlook.js" : "vlook-min.js"),
    jsHost + "svg-inject.js"];
for (let i = 0; i < jsSrc.length; i++) {
    let js = document.createElement("script");
    js.setAttribute("type", "text/javascript");
    // js.setAttribute("async", "async"); // 异步
    js.setAttribute("src", jsSrc[i] + "?ts=" + (devMode === true ? new Date().getTime() : Math.round(new Date().getTime()/1000/60))); // 1000/60/60/24 按天
    document.getElementsByTagName("HEAD")[0].appendChild(js);
}
