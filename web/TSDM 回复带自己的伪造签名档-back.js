// ==UserScript==
// @name   TSDM 自己的签名档-back
// @namespace Violentmonkey Scripts
// @grant none
// @match     *://www.tsdm.net/forum.php?mod=post&action=reply*
// @match     *://www.tsdm.tw/forum.php?mod=post&action=reply*
// @match     *://www.tsdm.me/forum.php?mod=post&action=reply*
// @run-at      document-end
// ==/UserScript==
window.HUJIRE = {};
window.HUJIRE.qianmingdang = [];


//签名档的内容用字符串形式表示
window.HUJIRE.qianmingdang.push("\n\n\n\n\n\n<br><br><br>"+
    "<div style=\"vertical-align: bottom;margin-top: 700px;\">" +
    "    <div class=\"sign\" name=\"hujisign\" style=\"\">" +
    "        <div class=\"sign_inner\" style=\"padding:10px;text-align:center;background: repeating-linear-gradient( 45deg, transparent, transparent 1em, moccasin 0, moccasin 2em, transparent 0, transparent 3em, powderblue 0, powderblue 4em, transparent 0, transparent 5em, lavender 0, lavender 6em, transparent 0, transparent 7em, beige 0, beige 8em ), repeating-linear-gradient( -45deg, transparent, transparent 1em, khaki 0, khaki 2em, transparent 0, transparent 3em, beige 0, beige 4em, transparent 0, transparent 5em, peachpuff 0, peachpuff 6em ), whitesmoke;\">" +
    "            <img style=\"max-width: 100%\" file=\"http://sucimg.itc.cn/sblog/o87428d65d813c301cb3177f646ed479a\" border=\"0\"title=\"青春の全てを、君と\">" +
    "            <img style=\"max-width: 100%\" file=\"http://ww2.sinaimg.cn/large/005NLLN7gw1f5orntk36hg30sg0g0e8c.gif\" border=\"0\" title=\"この恋、青春により。\"><br>" +
    "            <img style=\"max-width: 100%\" src=\"http://img.itc.cn/photo/o48oYNJId7P?.png\" border=\"0\" title=\"二叔么么哒\"><br>" +
    "        </div>" +
    "    </div>" +
    "</div>");

window.HUJIRE.qianmingdang.push("\n\n\n\n\n\n<br><br><br>"+
    "<div style=\"vertical-align: bottom;margin-top: 700px;\">" +
    "    <div class=\"sign\" name=\"hujisign\" style=\"\">" +
    "        <div class=\"sign_inner\" style=\"padding:10px;text-align:center;background: repeating-linear-gradient(-45deg,transparent,transparent 25%,rgba(255, 99, 71, 0.5) 0,rgba(255, 99, 71, 0.51) 50%),repeating-linear-gradient(45deg,transparent,transparent 25%,rgba(15, 37, 60, 0.52) 0,rgba(13, 49, 85, 0.52) 50%), rgba(245, 222, 179, 0.5);background-size: 10em 10em;\">" +
    "            <img style=\"max-width: 100%\" file=\"http://ww1.sinaimg.cn/large/005NLLN7gw1f7px9rktycg30cg070e8e.gif \" border=\"0\"title=\"銀色、遥か\">" +
    "            <img style=\"max-width: 100%\" file=\"http://sucimg.itc.cn/sblog/o87428d65d813c301cb3177f646ed479a\" border=\"0\" title=\"青春の全てを、君と\"><br>" +
    "            <img style=\"max-width: 100%\" src=\"http://img.itc.cn/photo/o48oYNJId7P?.png\" border=\"0\" title=\"二叔么么哒\"><br>" +
    "        </div>" +
    "    </div>" +
    "</div>");

window.HUJIRE.qianmingdang.push(
    "\n\n\n\n\n\n<br><br><br>"+
    "<div style=\"vertical-align: bottom;margin-top: 700px;\">" +
    "    <div class=\"sign\" name=\"hujisign\" style=\"\">" +
    "        <div class=\"sign_inner\" style=\"padding:10px;text-align:center;background: linear-gradient(rgba(181, 43, 41, 0.26), transparent), linear-gradient(-45deg, rgba(127, 152, 73, 0.15), transparent), linear-gradient(45deg, rgba(155, 255, 0, 0.25), transparent);\">" +
    "            <img style=\"max-width:100%;width: 100%\" file=\"http://0d077ef9e74d8.cdn.sohucs.com/pWEu1NU_png\" border=\"0\"title=\"好想守护这份笑容\">" +
    "        </div>" +
    "    </div>" +
    "</div>"
)


// min-height:700px;vertical-align: bottom;margin-top: 256px;
// vertical-align: bottom;margin-top: 700px;
if(localStorage['myreply-type']!==undefined)
{

    HUJIRE.txtArea = jQuery("textarea#e_textarea");
    //strBefore = HUJIRE.txtArea.val()+localStorage['myreply'];//加上这一步是为了应对有回复引用的时候 不过实践发现没用还会出问题呀

    strBefore = localStorage['myreply'];
    strBefore = strBefore.replace(/\n/g, "<br>\n");//将所有\n转化成<br>\n的正确写法
    HUJIRE.txtArea.val(strBefore + HUJIRE.qianmingdang[Math.floor(Math.random()*HUJIRE.qianmingdang.length)]);//填入回复内容
    // HUJIRE.txtArea.val(strBefore + HUJIRE.qianmingdang[2]);
    jQuery("#htmlon")[0].checked=true;//勾选HTML代码
    jQuery("#usesig")[0].checked=false;//不勾选使用签名档

    //提交前删除掉localstorage
    localStorage.removeItem("myreply");
    localStorage.removeItem("myreply-type");

    jQuery("#postsubmit").click();//提交!


}

