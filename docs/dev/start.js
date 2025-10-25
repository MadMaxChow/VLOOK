/**************************************
 *
 * starter of VLOOK.js - Typora Plugin
 * (配合 vlook-min.js 进行使用)
 *
 * V2025.10.1
 * 2025-10-18
 * Powered by MAX°孟兆
 *
 * QQ Group: 805502564
 * Telegram Channel: t.me/vlook_markdown
 * email: maxchow@qq.com
 *
 * https://github.com/MadMaxChow/VLOOK
 * https://gitee.com/madmaxchow/VLOOK
 *
 *************************************/

let sVer = "V2025.10.1";

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

// 在线模式下的语言包加载
let V_live_lang_data = undefined, // 在线模式下的语言包数据
    liveLang = navigator.language.toLowerCase();
// // 针对香港、台湾和澳门的中文语言包进行统一处理
// if (liveLang.indexOf(`zh-`) > -1)
//     liveLang = `zh-td`; // 繁体中文
// // 其他语言的统一处理
// else
liveLang = liveLang.indexOf(`zh-`) > -1 // 针对香港、台湾和澳门的中文语言包进行统一处理
    ? `zhtd` // 繁体中文
    : navigator.language.substring(0, 2).toLowerCase(); // 其他语言的统一处理

// 动态加载 VLOOK 所须的 js 资源
let jsSrc = [
        "de,es,fr,pt,ru,ar,ko,ja,zhtd,".indexOf(liveLang + `,`) < 0 ? "" : jsHost + "lang/" + liveLang + ".js", // 只加载支持的语言包
        jsHost + "clipboard.js",
        // jsHost + "clipboard.js",
        jsHost + "svg-inject.js",
        jsHost + "vlook-min.js"
    ];

for (let i = 0; i < jsSrc.length; i++) {
    if (jsSrc[i].length === 0) continue;
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.defer = true;
    js.src = jsSrc[i] + "?ts=" + (devMode === true
        ? Date.now()
        : ts
    );
    document.getElementsByTagName("HEAD")[0].appendChild(js);
}
