// ==UserScript==
// @name 轻国动漫资源区合集类评分
// @namespace LK-lightnovel
// @grant none
// @include     https://www.lightnovel.cn/*
// @include     http://www.lightnovel.cn/*
// @run-at      document-end
// ==/UserScript==
+function () {
    const isInAnimationArea = (function () {
        const isAPost = location.search.includes("mod=viewthread");
        return isAPost && jQuery("#pt").find(">.z>a:nth-of-type(4)").text() == "动漫资源区";
    })();
    isInAnimationArea && (function () {
        var h1_ts = jQuery("h1.ts");
        const isHeji = h1_ts.find(">a").attr("href").includes("typeid=176");
        var title = h1_ts.find(">span").text();
        var title_match = title.match(/\d+(\.*\d*)G/);
        title_match && title_match[0] && (function (xxG) {
            var GiB = xxG.match(/\d*\.?\d*/)[0] - 0;
            var qb = (qb = Math.round(GiB * 30)) > 1000 ? 1000 : (qb);
            +function modifyDOM() {
                var container = jQuery("td.ptm");
                var div, btn;
                container.append(div = jQuery("<div>"));
                div.append(jQuery("<span>").text("检测到" + GiB + "GB,是否评分" + qb + "qb?"));
                div.append(btn = jQuery("<button>").text("确定评分"));
                btn.on("click", function (_$e) {
                    console.log(_$e);
                    var append_parent = jQuery("#append_parent");
                    append_parent.on("DOMNodeInserted.Hujimiya", function whenInsert(istEvt) {
                        // console.log(istEvt.target);
                        var form = append_parent.find("form#rateform");
                        (form[0]
                        && (function () {
                            append_parent.off("DOMNodeInserted.Hujimiya");
                            form.find("input#score2").val(qb);
                            form.find("input#reason").val("Musashi Machine ON");
                            form.find("button[name=ratesubmit]").click();
                        })());
                    });
                    jQuery("#ak_rate").click();
                    // var post = jQuery("#postlist").find(">div[id^=post]:first-of-type");
                    // post.on("DOMNodeInserted.Hujimiya",function (istEvt) {
                    //    debugger
                    // });
                });

            }();
        })(title_match[0]);

    })();
}();
+function rateLogCss() {
    // var $1L = jQuery("#postlist").find(">div[id^=post]:first-of-type");
    // var h3 = $1L.find("h3.psth.xs1");
    // var dl = $1L.find("dl.rate");
    var css = "<style>" +
        "#postlist>div[id^=post]:first-of-type dl.rate{" +
        "position: fixed;\
    bottom: 0;\
    background-color: white;\
    padding: 10px;\
    border: 2px solid #FF0080;" +
        "}" +
        "</style>";
    jQuery(css).appendTo(document.body);
}();
