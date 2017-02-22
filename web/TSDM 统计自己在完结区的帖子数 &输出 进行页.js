// ==UserScript==
// @name   TSDM 统计自己在完结区的帖子数 &输出 进行页
// @namespace Violentmonkey Scripts
// @grant none
// @match     http://www.tsdm.net/home.php?mod=space&uid=*&do=thread&view=me&order=dateline&page=*
// @run-at      document-end
// ==/UserScript==
window.huji_goToNextPage = function()
{
    localStorage.pageNow = parseInt(localStorage.pageNow)+1;
    window.location = localStorage.nextLocationPattern+localStorage.pageNow;
};

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

window.huji_count_end = function(){

    //用一个string保留所有结果
    var result = "";
    for(var i=1;i<=parseInt(localStorage.countNow);i++)
    {
        result+=localStorage.getItem("hujilink"+i)+"\n";
    }

    //显示在一个TextArea里面
    textArea = document.createElement("textarea");
    textArea.style.top='0';
    textArea.style.left="0";
    textArea.style.width="90%";
    textArea.style.height="50%";
    textArea.style.backgroundColor="white";
    textArea.style.textAlign="left";
    textArea.style.position="fixed";
    textArea.style.color="red";
    textArea.style.resize="both";
    textArea.style.border="2px dotted black"
    document.body.appendChild(textArea);

    jQuery(textArea).val(result);



    //最后来一个localStorage.clear();
    localStorage.clear();

}


jQuery(document).ready(
    function(){
        if(localStorage.pageNow>1){
            huji_countThisPage();
            if(jQuery("div.pgs.cl.mtm  a.nxt")!=0)
            {
                //还有下一页 表示没遍历完
                console.log("还有下一页");
                if(parseInt(localStorage.pageNow)<=parseInt(localStorage.pageMax))
                {

                   // huji_goToNextPage();
                    setTimeout(huji_goToNextPage,5000);
                    //不要跳得那么快嘛233
                }
                else{
                    console.log("end");
                    huji_count_end();

                }
            }else{
                console.log("end");
                huji_count_end();
            }


        }
    }
);







