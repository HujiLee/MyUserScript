// ==UserScript==
// @name TSDM管理面板批量删除回帖咯
// @namespace Violentmonkey Scripts
// @grant none
// @include     http://www.tsdm.me/forum.php?mod=modcp&action=thread&op=post
// @include     http://www.tsdm.net/forum.php?mod=modcp&action=thread&op=post
// @include     http://www.tsdm.tw/forum.php?mod=modcp&action=thread&op=post
// @run-at      document-end
// ==/UserScript==

window.deleteAllPost = function(){
    smjq("label[for=chkall]").click();
    smjq("label[for=nocredit]").click();
    smjq("#deletesubmit").click();
}





if(smjq("input[name^='delete']").length!=0)
{
    pCount = document.createElement("P");
    btnCount = document.createElement("button");
    btnCount.innerHTML="删除本页全部&更新积分(&如果还有下一页就刷新)";
    btnCount.style.width="80%";
    pCount.appendChild(btnCount);
    smjq(pCount).css('position','fixed');
    pCount.style.top='0';
    pCount.style.left="0";
    pCount.style.width="100%";
    pCount.style.backgroundColor="Red";
    pCount.style.textAlign="Center";
    document.body.appendChild(pCount);

    smjq(btnCount).bind("click",window.deleteAllPost);
}