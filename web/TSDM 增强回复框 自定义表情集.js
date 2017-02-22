// ==UserScript==
// @name   TSDM 增强回复主题对话框 自定义表情集
// @namespace Violentmonkey Scripts
// @grant none
// @match     http://www.tsdm.me/forum.php?*
// @run-at      document-end
// ==/UserScript==

var HUJIMIYA_MEMES = [
    ["党的恩情说不完", "http://comment.bjcnc.img.sohucs.com/pM2avET_jpg"],
    ["哦是吗", "http://0d077ef9e74d8.cdn.sohucs.com/pPpBYWv_jpg"],
    ["目瞪藏呆", "http://0d077ef9e74d8.cdn.sohucs.com/pTo1crn_png"]
];


(function () {
    var $ = jQuery;
    /** @function window.seditor_insertunit */
    var f_ins = window.seditor_insertunit;
    var selector = ".fpd";
    var panel_for_memes = (function () {
        var panel = jQuery(`
            <div id="huji-memes" style="position:relative">
            </div>
        `);
        var innerText = "";
        for (var index in HUJIMIYA_MEMES) {
            innerText+="<span id=\"mememe"+index+"\" data-hide=\""+HUJIMIYA_MEMES[index][1]+"\">"+HUJIMIYA_MEMES[index][0]+"</span>";
        }
        panel.html(innerText);
        return panel;
    })();
    var CSS = jQuery(`<style>
#huji-memes{
background-color:#F00076;
display:none;
color:white;
}
#huji-memes.js-show{
display:block;
}
#huji-memes>span{
margin:8px;
text-decoration:underline;
cursor:pointer;
}
</style>`)
    var span_for_memes = (function () {
        var span = jQuery("<span>").append(jQuery("<button type='button' style='background-color: transparent;'>囧</button>").bind("click",function () {
            console.log(233);
            var memes = jQuery(this).parent().find("div#huji-memes").toggleClass("js-show");
            var area= jQuery(this).parents(".tedt").find("div.area");
            if(memes.hasClass("js-show")){
                area.css("margin-top",memes.height()+"px");
            }else{
                area.css("margin-top",0);
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
        span.find("#huji-memes").bind("click",function (e) {
            console.log(e)
            if(e.target.id.indexOf("mememe")>=0){
                f_ins("fastpost","[img]"+jQuery(e.target).data("hide")+"[/img]")
            }
        });
    })("#f_pst "+selector);

    /**
     * 楼层回复
     */
    (function ($fpdselector) {
        var apd = jQuery("#append_parent");
        var span = span_for_memes.clone(true);
        apd.bind("DOMNodeInserted",function (e) {
            console.log(jQuery(e.target).attr("id"));
            if(jQuery(e.target).attr("id")==="fwin_content_reply"){

                jQuery($fpdselector).append(span);
            }
        });
        console.log("2330145");
        span.find("#huji-memes").bind("click",function (e) {
            console.log(e)
            if(e.target.id.indexOf("mememe")>=0){
                f_ins("post","[img]"+jQuery(e.target).data("hide")+"[/img]")
            }
        });

    })("#postform "+selector);
})();

