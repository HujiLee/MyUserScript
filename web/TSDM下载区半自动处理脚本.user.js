// ==UserScript==
// @name TSDM下载区半自动处理脚本——藤宫武藏
// @namespace Violentmonkey Scripts
// @grant none
// @include     http://www.tsdm.net/forum.php?mod=viewthread&tid=*
// @include     http://www.tsdm.me/forum.php?mod=viewthread&tid=*
// @include     http://www.tsdm.tw/forum.php?mod=viewthread&tid=*
// @run-at      document-end
// ==/UserScript==

 //window.hujiTes = "hujimiya";
window.huji = new Object();

window.dlRamStr = [
    "2333",
    "太阳当空照 菊花对我笑",
    "{doge}",
    "[哆啦A梦惊讶]",
    "[泪扇]",
    "牛奶果然武藏野",
    "=W=",
    "暖人心田",
]


window.rateFunc = function (iww, itsb) {
    $_rate = smjq('#ak_rate');
    console.log($_rate);
    $_rate[0].click();
    console.log("Hujimiya:第一次" + iww + '|' + itsb);
    ratewd = smjq('#fwin_rate');
    wwipt = smjq('#score1')[0];
    tsbipt = smjq('#score2')[0];
    commentipt = smjq('#reason')[0];
    if (!(ratewd != null && wwipt != null && tsbipt != null && commentipt != null)) {
        console.log("Hujimiya:延时");
        window.setTimeout('rateFunc(' + iww + ',' + itsb + ')', 1000);
    } else {
        wwipt.value = iww;
        tsbipt.value = itsb;
        ramNum = Math.ceil(Math.random() * window.dlRamStr.length) - 1;//
        commentipt.value = window.dlRamStr[ramNum];//'脚本自动评分 试评';
        sub = smjq('#rateform > p > button');
        sub.click();
    }
}

window.rateFuncMore = function (iww, itsb, ixc, itr, ifh, ijl, imsg) {
    $_rate = smjq('#ak_rate');
    console.log('rateHuji=' + $_rate);
    $_rate[0].click();//点击评分按钮

    console.log("Hujimiya:More第一次" + iww + '|' + itsb);
    ratewd = smjq('#fwin_rate');
    wwipt = smjq(ratewd).find('#score1')[0];
    tsbipt = smjq(ratewd).find('#score2')[0];
    xcipt = smjq(ratewd).find('#score3')[0];
    tript = smjq(ratewd).find('#score4')[0];
    fhipt = smjq(ratewd).find('#score5')[0];
    jlipt = smjq(ratewd).find('#score6')[0];
    commentipt = smjq(ratewd).find('#reason')[0];
    if (ratewd != null && wwipt != null && tsbipt != null && commentipt != null) {
        wwipt.value = iww;
        tsbipt.value = itsb;
        xcipt.value = ixc;
        tript.value = itr;
        fhipt.value = ifh;
        jlipt.value = ijl;

        if (imsg == null) {
            commentipt.value = '评分';
        }
        else {
            commentipt.value = imsg;
        }

        sub = smjq('#rateform > p > button');
        sub.click();
    } else {
        console.log("Hujimiya:More延时");
        window.setTimeout('rateFuncMore(' + iww + ',' + itsb + ',' + ixc + ',' + itr + ',' + ifh + ',' + ijl + ',' + imsg + ')', 1000);
        //window.setTimeout('rateFuncMore(' + 5 + ',' + 5 + ',' + 0 + ',' + 1 + ',' + 1 + ',' + 0 + ',' + 0 + ')', 1000);//直接控制台运行反而有效
    }
}


window.jinghuaFunc = function (rank) {
    ranks = [0, 1, 2, 3];

    if (ranks.indexOf(rank) > -1) {
        slct = smjq('#itemcp_digest > table  td.hasd > div > select');
        console.log(slct);

        if (slct.length != 0) {
            opt = smjq(slct).find('option[value=' + rank + ']');
            opt.attr('selected', 'true');
            if (rank == 3) {
                // window.rateFuncMore(100, 0, 0, 100, 100, 3, '3级精华 by 武藏');
            }
            tellHim = smjq('#fwin_mods').find('label[for="sendreasonpm"]');
            tellHim.click();
            smjq('#modsubmit').click();
        } else {
            //setTimeout('Jing(' + rank + ');console.log(\'re\');', 1000);
        }
    }
}
var JING1 = 14.5;
var JING2 = 38.5;
var JING3 = 97;

console.log('Hujimiya:武藏的自动脚本已加载');
pstlst = smjq('#postlist')[0]; //准备好可以插入
pstlstp = pstlst.parentElement; //
fidhref = smjq('#pt div.z').find('a:nth-last-of-type(2)').attr('href');
if (fidhref.substr(fidhref.indexOf('fid=') + 4, 1) == '8' && fidhref.substr(fidhref.indexOf('fid=') + 4, 2) != '85') {
    console.log('Hujimiya:检测到是动漫下载区外区');

    console.log("Hujimiya:即将执行");
    //window.rateFunc(5,25);
    pWaiqu = document.createElement('p');
    pWaiqu.innerHTML = "检测到是下载区外区帖子,是否直接评5+25?<button style=\"margin-left: 20px;width:200px;\"onclick=\"window.rateFunc(5,25);\">评!</button>";
    pstlstp.insertBefore(pWaiqu, pstlst);
    smjq(pWaiqu).css('color', 'red');
    smjq(pWaiqu).css('background-color', 'rgba(0,0,0,0)');
    smjq(pWaiqu).css('text-align', 'center');
    smjq(pWaiqu).css('font-size', '14pt');
} else {
    //加精华
    //先检测多少GB
    title = smjq('#postlist  td.plc.ptm.pbn > h1')[0];
    size = title.childNodes[2].data;
    size = size.substr(size.lastIndexOf('[') + 1, size.lastIndexOf(']') - size.lastIndexOf('[') - 1);
    size = size.substr(0, size.lastIndexOf('G'));
    size = parseFloat(size);
    //体积检测完毕

    //插入一个p来显示检测到的体积
    pJingHua = document.createElement('p');
    smjq(pJingHua).css('color', 'red');
    smjq(pJingHua).css('background-color', 'rgba(0,0,0,0)');
    smjq(pJingHua).css('text-align', 'center');
    smjq(pJingHua).css('font-size', '14pt');
    pJingHua.innerHTML = '检测本帖体积为' + size + 'GB';
    if (size >= JING3) {
        pJingHua.innerHTML += "\n是否加3级精华?<button style=\"margin-left: 20px;width:100px;\"onclick=\"window.jinghuaFunc(3);\">加精华!</button>";
        pJingHua.innerHTML += "<button style=\"margin-left: 20px;width:200px;\"onclick=\"window.setTimeout('rateFuncMore(100,0,0,100,100,3,\\'3精加成\\')',1000);\">三精多加100WW和3JL(可能要点击两次)</button>";

    }
    else if (size >= JING2) {
        pJingHua.innerHTML += "\n是否加2级精华?<button style=\"margin-left: 20px;width:200px;\"onclick=\"window.jinghuaFunc(2);\">加精华!</button>";
    }
    else if (size >= JING1) {
        pJingHua.innerHTML += "\n是否加1级精华?<button style=\"margin-left: 20px;width:200px;\"onclick=\"window.jinghuaFunc(1);\">加精华!</button>";
    }
    else {
        pJingHua.innerHTML += "\n不需要加精华";
    }
    pstlstp.insertBefore(pJingHua, pstlst);
    styleHuji = document.createElement('style');//创建style隐藏掉加精华的那个框
    styleHuji.innerHTML = "div#fwin_mods {display: none;}";
    pstlstp.insertBefore(styleHuji, pstlst);
    console.log('style插入完毕');

    //点击加精华
    jinghuaanniu = smjq('#modmenu > a[onclick*=\'digest\'');
    jinghuaanniu.click();

    if (fidhref.substr(fidhref.indexOf('fid=') + 4, 1) == '9') {
        console.log('Hujimiya:检测到是动漫下载区-完结区');

    }


}




