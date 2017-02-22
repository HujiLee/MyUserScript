// ==UserScript==
// @name   TSDM 统计自己在完结区的帖子数 &输出 起始页
// @namespace Violentmonkey Scripts
// @grant none
// @match     http://www.tsdm.net/home.php?mod=space&do=thread&view=me
// @match     http://www.tsdm.net/home.php?mod=space&uid=*&do=thread&view=me&order=dateline&page=1
// @run-at      document-end
// ==/UserScript==
var smjq = jQuery;
localStorage.removeItem("pageNow");
localStorage.removeItem("countNow");


console.log("I can 暴力统计帖子数||现在第一页");

//获取第二页的链接,以便今后跳转
var nextLocation = jQuery("a[href*='order=dateline&page=2']").attr('href').toString();
nextLocationPattern = nextLocation.replace("page=2","page=");
localStorage.nextLocationPattern = nextLocationPattern;



window.huji_goToNextPage = function()
{
    localStorage.pageNow = parseInt(localStorage.pageNow)+1;
    window.location = localStorage.nextLocationPattern+localStorage.pageNow;
}

window.huji_countThisPage = function(){
    banquming = localStorage.BanQuMing;
    jQuery("#delform  th").has('a').each(function(){
        if(jQuery(this).next()[0].innerText==banquming)
        {
            //console.log(jQuery(this).find('a')[0]);
            localStorage.countNow = parseInt( localStorage.countNow)+1;

            localStorage.setItem("hujilink"+localStorage.countNow,jQuery(this).find('a')[0].innerHTML + "\n"+jQuery(this).find('a')[0].href);
        }
    });
}

//开始计数!
window.huji_startCount = function()
{
    console.log("Start Count!");
    localStorage.pageNow = 1;
    localStorage.countNow = 0;
    if(jQuery(iptCount).val()=="") {
        localStorage.BanQuMing = "完结动漫";
    }
    else{
        localStorage.BanQuMing =jQuery(iptCount).val();
    }

    localStorage.pageMax = jQuery(iptPageMax).val();


    huji_countThisPage();
    huji_goToNextPage();


}





//添加按钮   begin
pCount = document.createElement("P");
btnCount = document.createElement("button");
btnCount.innerHTML="开始自动统计??区!";
btnCount.style.width="50%";
pCount.appendChild(btnCount);
smjq(pCount).css('position','fixed');
pCount.style.top='0';
pCount.style.left="0";
pCount.style.width="100%";
pCount.style.backgroundColor="red";
pCount.style.textAlign="Center";
document.body.appendChild(pCount);

iptCount = document.createElement("input");
iptCount.type = "text";

iptCount.placeholder = "输入版块名!否则默认为完结动漫";
iptCount.style.width="20%";
pCount.appendChild(iptCount);
pCount.appendChild(document.createElement("br"));

iptPageMaxLabel = document.createElement("label");
iptPageMaxLabel.innerHTML="一共需要遍历多少页?(默认10页):";
iptPageMaxLabel.style.color="white";
pCount.appendChild(iptPageMaxLabel);


iptPageMax = document.createElement("input");
iptPageMax.type = "number";
iptPageMax.setAttribute("value","10");
iptPageMax.placeholder = "一共需要遍历多少页?(默认10页)";
pCount.appendChild(iptPageMax);



smjq(btnCount).bind("click",window.huji_startCount);
//添加按钮  end

