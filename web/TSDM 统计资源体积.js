// ==UserScript==
// @name TSDM管理面板统计资源体积
// @namespace Violentmonkey Scripts
// @grant none
// @include     http://www.tsdm.net/forum.php?mod=modcp&action=thread*
// @run-at      document-end
// ==/UserScript==

"anime".toUpperCase();//"ANIME"

var guide = smjq("#moderate > div.pgs.cl.mtm").clone();

smjq("#ct > div.mn > div > form").after(guide);//把分页条放到前面来不用下拉

window.smjq = smjq || jQuery;
window.huji = window.huji || {};
huji.thisPage = {
    href: location.href,
    GB: 0
};

smjq("#moderate>table").find("th").each(function () {
    var stron = smjq("<strong style='color: #FF0080;text-shadow: 0 0 2px white,0 0 2px black,0 0 2px black;font-size: larger;background-color: white;'>").html("???");
    var a = smjq(this).find('a');
    a.html = a.html();
    var size = a.html.substr(a.html.lastIndexOf('[') + 1, a.html.lastIndexOf(']') - a.html.lastIndexOf('[') - 1);
    // console.log(size);
    if (size.lastIndexOf("G") == size.length - 1) {
        var trynum = (Number(eval(size.substr(0, size.length - 1))));
        huji.thisPage.GB += trynum ? trynum : 0;
        stron.html("检测到" + trynum + "GB")

    }
    else if (size.lastIndexOf("GB") == size.length - 2) {
        //noinspection JSDuplicatedDeclaration
        var trynum2 = (Number(eval(size.substr(0, size.length - 2))));
        huji.thisPage.GB += trynum2 ? trynum2 : 0;
        stron.html("检测到" + trynum2 + "GB")
    }

    smjq(this).append(stron);

});

window.localStorage.setItem(
    smjq("#moderate > table").find('tbody:nth-of-type(2)').find('cite a[href*=uid]').html() +
    "page:" + smjq("#moderate > div.pgs.cl.mtm > div > strong").html(), huji.thisPage.GB);