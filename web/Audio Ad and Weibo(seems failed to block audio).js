// ==UserScript==
// @name TSDM屏蔽广告 微博侧边栏和石头提示音脚本
// @namespace Violentmonkey Scripts
// @grant none
// @include     http://www.tsdm.net/*
// @run-at      document-idle
// @run-at      document-end
// ==/UserScript==


/*使用说明:

使用Chrome或者Opera(以及同内核的)浏览器,
安装Violentmonkey(暴力猴)或者Greasemonkey(油猴)插件,

安装完插件后,
以暴力猴为例,接下来的大致流程是:
1.Manage scripts(管理脚本)
2.New(新建)
3.在出现的编辑框中将本脚本的所有内容复制进去
4.点击Save&Close.
5.确保暴力猴扩展"Scripts Enabled"(启用脚本),未启用的时候该按钮是带X图标的,启用后是√图标.
6.好,安心打开TSDM吧.



*/





//微博begin
weibo = smjq('#ts_sidebar_base');
console.log('检测到微博侧边栏');
weibo.remove();
console.log('移除微博侧边栏');
//微博end

//石头begin

if (location.href == "http://www.tsdm.net/home.php?mod=space&do=pm") {
    smjq('.newpm').find('input').each(function () {
        this.click()
    });
    smjq('button[name=\'markreadpm_btn\']').click();
}

function AudioHint() {
    hintDiv = document.createElement('div');
    hintDiv.id = 'shitou-hint';
    //document.body.appendChild(hintDiv);
    document.body.appendChild(hintDiv);
    hintDiv.setAttribute('style', 'display: block;position: fixed;width: 100%;min-height: 80px;background-color: rgba(255, 0, 0, 0.43);bottom: 0%;left:0%;color: white;text-align: center;font-size: 15px;');
    hintDiv.innerHTML = '检测到石头的声音,建议立即采取静音措施!<br>刷新本页面后可能出现拦不住的情况,请立即用浏览器页面静音或者用widnows的音量合成器静音.<br>';
    btn = document.createElement('button');
    btn.innerHTML = '前往消息页面,自动标记所有未读消息为已读';
    aa = document.createElement('a');
    aa.href = 'http://www.tsdm.net/home.php?mod=space&do=pm';
    aa.appendChild(btn);
    hintDiv.appendChild(aa);


}

shitou = smjq('audio');
console.log('检测到石头?' + (shitou[0] != null));
if (shitou[0] != null) {
    smjq('audio')[0].pause();
    console.log('石头.pause()');
    shitou.remove();
    console.log('石头.remove()');
    console.log('再次检测到石头?' + (smjq('audio')[0] != null));
    AudioHint();

}
//石头end


//广告begin
//ad1 = smjq('.a_pt');
//ad2 = smjq('.a_pb');
//ad3 = smjq('#tsdmadv_arch');
//放弃屏蔽广告



//广告end


if ('loading' == document.readyState) {
    console.log("This script is running at document-start time.");
} else {
    console.log("This script is running with document.readyState: " + document.readyState);
}

GM_addStyle("body { color: white; background-color: black; } img { border: 0; }");