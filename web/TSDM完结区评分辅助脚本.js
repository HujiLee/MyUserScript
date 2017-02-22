/**
 * Created by Administrator on 2016/4/8.
 */
// ==UserScript==
// @name TSDM完结区辅助脚本——藤宫武藏
// @namespace Hujimiya Craft
// @grant none
// @include     http://www.tsdm.net/forum.php?mod=viewthread&tid=*
// @run-at      document-end
// ==/UserScript==


//首先需要检测一下当前页面用的是啥jQuery入口 $还是smjq?
window.hjq;
//用hjq统一替换
if ($("body") == null && smjq("body") != null) {
    window.hjq = function (selector) {
        return smjq(selector);
    }
}
else {
    window.hjq = function (selector) {
        return $(selector);
    }
}

window.hjq.getGB = function () {
    title = document.querySelector("#postlist  td.plc.ptm.pbn > h1").childNodes[2].data;
    substrs = title.split("]");
    var GB = 0;
    for (var x = substrs.length - 1; x >= 0; x--) {
        if (substrs[x].split("[").length > 1) {
            y = substrs[x].split("[")[1];
            if (y.indexOf("GB") == y.length - 1) {
                GB = y.split("GB")[0];
                return GB;
            }
            else if (y.indexOf("G") == y.length - 1) {
                GB = y.split("G")[0];
                return GB;
            }
        }


    }
    return GB;

}
window.hjq.creatDivToOprate = function () {
    postlist = hjq("#postlist")[0];
    MyDiv = document.createElement("div");
    MyDivCss = "    height: 100px;" +
        "width: 100%;" +
        "background-color: transparent;" +
        "background-image: url(http://img.itc.cn/photo/j4n1niJKTyP);" +
        "background-size: auto 100%;" +
        "display: flex;" +
        "flex-direction: column;"
    MyDiv.id = "Hujimiya-Div";
    MyDiv.setAttribute("style", MyDivCss);
    postlist.parentNode.insertBefore(MyDiv, postlist);




}
window.hjq.creatDivToOprate.rate = function(){
    //负责创建完相应的HTML以后,点击按钮评分的实现函数

}


var fid = 9;//定义完结区的fid为9

thisLocation = window.location.href;
if (thisLocation.indexOf("fid=" + 9) != -1) {
    console.log("完结区 浏览版面");
    //高亮 待编辑
}
else if (thisLocation.indexOf("mod=viewthread") != -1) {
    fidhref = hjq("#pt>div.z > a:nth-last-of-type(2)").attr("href");
    if (fidhref.indexOf("fid=" + fid) >= 0) {
        console.log("完结区 具体到帖子");
        rateBtn = hjq("a#ak_rate");
        if (rateBtn != null && rateBtn.length != 0) {
            console.log("完结区 具体到帖子 第一页");
            window.hjq.creatDivToOprate();
            console.log("getGB函数结果:" + window.hjq.getGB());

        }
        else {
            console.log("完结区 具体到帖子 不在帖子的第一页");
        }


    }


}
