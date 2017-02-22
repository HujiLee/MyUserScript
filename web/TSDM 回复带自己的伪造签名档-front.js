// ==UserScript==
// @name   TSDM 自己的签名档-front
// @namespace Violentmonkey Scripts
// @grant none
// @match     *://www.tsdm.net/forum.php?*
// @match     *://www.tsdm.me/forum.php?*
// @match     *://www.tsdm.tw/forum.php?*
// @run-at      document-end
// ==/UserScript==

window.HUJIRE = [];



window.HUJIRE.func_replys = [];
HUJIRE.func_replys[1] = function () {
    //对应最底层回复框形式的回复
    var myreplay = jQuery("#fastpostmessage").val();//得到源字符串
    // myreplay = myreplay.replace(/\n/g, "<br>\n");//将所有\n转化成<br>\n的正确写法
    localStorage['myreply'] = myreplay;//存到本地存储域
    localStorage['myreply-type'] = 1;//type:1

    jQuery("#f_pst a[href*='action=reply']").click();//进行跳转


}

HUJIRE.func_replys[2] = function () {
    var myreplay = jQuery("textarea#postmessage").val();
    //myreplay = myreplay.replace(/\n/g, "<br>\n");//将所有\n转化成<br>\n的正确写法
    localStorage['myreply'] = myreplay;//存到本地存储域
    localStorage['myreply-type'] = 2;//type:2

    jQuery("form#postform .y>a").click();//跳转


}


btnStr = "    <button type=\"button\" id=\"myreply-bottom\" class=\"pn pnc vm\">" +
    "        <strong>武藏回复</strong>" +
    "    </button>";

//首先解决帖子最底部的那个"发表回复"
btnButtom1 = jQuery(btnStr);
jQuery("#fastpostform  p.ptm.pnpost").append(jQuery(btnButtom1));
jQuery(btnButtom1).bind("click", HUJIRE.func_replys[1]);


//接下来是解决楼层那种的回复
HUJIRE.apd = jQuery("#append_parent");
HUJIRE.apd.indexs = [];
//HUJIRE.apd.indexs.go = false;//用来做该form已经加载完毕的标志
//上面这句不再使用 好像会出问题
HUJIRE.apd.bind("DOMNodeInserted", function (e) {
    //console.log('Inserted!');
    //console.log(jQuery(e.target).attr("id"));
    //HUJIRE.apd.indexs.push(e.target);

    if (jQuery(e.target).attr("id") === "postform") {
        //添加按钮上去!
        btnButtom2 = jQuery(btnStr);
        jQuery("#moreconf").append(jQuery(btnButtom2));
        jQuery(btnButtom2).bind("click", HUJIRE.func_replys[2]);
    }


});
