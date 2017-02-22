// ==UserScript==
// @name   TSDM 自定义表情集 Release
// @namespace Violentmonkey Scripts
// @author 藤宫武藏
// @grant none
// @match     *://www.tsdm.net/forum.php?*
// @match     *://www.tsdm.me/forum.php?*
// @match     *://www.tsdm.tw/forum.php?*
// @run-at      document-end
// ==/UserScript==

var HUJIMIYA_MEMES = [
    ["党的恩情说不完", "http://comment.bjcnc.img.sohucs.com/pM2avET_jpg"],
    ["哦是吗", "http://0d077ef9e74d8.cdn.sohucs.com/pPpBYWv_jpg"],
    ["目瞪藏呆", "http://0d077ef9e74d8.cdn.sohucs.com/pTo1crn_png"],
    ["洋洋得藏","http://sfeomoe.com/images/2017/01/18/d0d99779cdedcee0.png"],
    ["搞着妹子头像","http://sfeomoe.com/images/2017/01/18/25ac821f9649655e.jpg"],
    ["呸","http://sfeomoe.com/images/2017/01/18/9a8784ddd626f0af.jpg"],
    ["一时语塞","http://sfeomoe.com/images/2017/01/18/68063438606cc12e.jpg"],
    ["三条狗","http://sfeomoe.com/images/2017/01/18/14963bd7ccae7d02.gif"],
    ["鸡听了只想赶快离开","http://sfeomoe.com/images/2017/01/18/98e0f74bdd7b4472.jpg"],
    ["届かない恋","http://sfeomoe.com/images/2017/01/18/43b3717d1fa1e41f.gif"],
    ["婚博会","http://sfeomoe.com/images/2017/01/18/QQ20161113210633.png"],
    ["改需求","http://sfeomoe.com/images/2017/01/18/d962dde644512eb6.gif"],
    ["我在隔壁都能听见你们说我帅","http://sfeomoe.com/images/2017/01/18/044fd78110fc5948.jpg"],
    ["操心","http://sfeomoe.com/images/2017/01/18/fb3aeed5da2018fc.gif"],
    ["给大佬递帽","http://sfeomoe.com/images/2017/01/18/8ad77b0c8aa1451d.jpg"],
    ["我不仅嗨到最晚","http://sfeomoe.com/images/2017/01/18/f2690498765ff602.jpg"],
    ["放你娘的狗屁","http://sfeomoe.com/images/2017/01/18/697f4795e4f929b3.jpg"],
    ["好奇心害死猫","http://sfeomoe.com/images/2017/01/18/0faea7fa53eb18fe.gif"],
    ["善哉","http://sfeomoe.com/images/2017/01/18/dc69a02df7ccddd9.jpg"]
];


(function () {
    var $ = jQuery;
    /** @function window.seditor_insertunit */
    var f_ins = window.seditor_insertunit;
    var selector = ".fpd";
    var panel_for_memes = (function () {
        var panel = jQuery("\n            <div id=\"huji-memes\" style=\"position:relative\">\n            </div>\n        ");
        var innerText = "";
        for (var index in HUJIMIYA_MEMES) {
            innerText += "<span id=\"mememe" + index + "\" data-hide=\"" + HUJIMIYA_MEMES[index][1] + "\">" + HUJIMIYA_MEMES[index][0] + "</span>";
        }
        panel.html(innerText);
        return panel;
    })();
    var CSS = jQuery("<style>" +
        "#huji-memes{" +
        "background-color:#FAFAFA;" +
        "background-image:url(http://comment.bjcnc.img.sohucs.com/pGVe5qW_gif);" +
        "color: #FF0080;" +
        "box-shadow: 0 0 4px #03A9F4;" +
        "display:none;" +
        "}" +
        "#huji-memes.js-show{" +
        "display:block;" +
        "}" +
        "#huji-memes>span{" +
        "margin:8px;" +
        "text-decoration:underline;" +
        "cursor:pointer;" +
        "}" +
        "</style>");
    var span_for_memes = (function () {
        var span = jQuery("<span>").append(jQuery("<button type='button' style='background-color: transparent;'>囧</button>").bind("click", function () {
            var memes = jQuery(this).parent().find("div#huji-memes").toggleClass("js-show");
            var area = jQuery(this).parents(".tedt").find("div.area");
            if (memes.hasClass("js-show")) {
                area.css("margin-top", memes.height() + "px");
            } else {
                area.css("margin-top", 0);
            }
        })).append(panel_for_memes).append(CSS);
        return span;
    })();


    /**
     * 帖子最底部的"发表回复"
     */
    (function ($fpdselector) {
        var span = span_for_memes.clone(true);
        jQuery($fpdselector).append(span);
        span.find("#huji-memes").bind("click", function (e) {
            if (e.target.id.indexOf("mememe") >= 0) {
                f_ins("fastpost", "[img]" + jQuery(e.target).data("hide") + "[/img]")
            }
        });
    })("#f_pst " + selector);

    /**
     * 楼层回复
     */
    (function ($fpdselector) {
        var apd = jQuery("#append_parent");
        var span = span_for_memes.clone(true);
        apd.bind("DOMNodeInserted", function (e) {
            if (jQuery(e.target).attr("id") === "fwin_content_reply") {
                jQuery($fpdselector).append(span);
            }
        });
        span.find("#huji-memes").bind("click", function (e) {
            if (e.target.id.indexOf("mememe") >= 0) {
                f_ins("post", "[img]" + jQuery(e.target).data("hide") + "[/img]")
            }
        });

    })("#postform " + selector);
})();

