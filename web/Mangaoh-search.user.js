/**
 * Created by Administrator on 2016/4/5.
 */
// ==UserScript==
// @name Mangaoh Search页面
// @namespace Violentmonkey Scripts
// @grant none
// @include     http://www.mangaoh.co.jp/ext/search_product.php
// @run-at      document-end
// ==/UserScript==

window.mangaohLog = function(){
    console.log("window.mangaohLog()调用开始");
    txtArea = $("textarea#HujiTxt")[0];
    txtArea.innerHTML="";
    $('.media-body').has('huji>input[data-sele=1]').each(
        function(){
            writer = $(this).find('a[href*="author="]')[0].innerHTML.replace(/\n|\s/g,'');//最后的正则表达式是由于内容含空格和换行,需要特殊处理
            //window.writertmp = writer;
            bookname = $(this).has('huji>input[data-sele=1]').find('a.prd_name')[0].innerHTML.replace(/\n|\s/g,'');
            txtArea.innerHTML+="\n"+writer+" - "+bookname;
            console.log(writer+" - "+bookname);


        }
    )
    console.log("window.mangaohLog()调用结束");

}

$('.media-body').each(
    function () {
        $(this).find('div').first().each(
            function(){
                huji = document.createElement('huji');
                huji.innerHTML='<input type="checkbox" data-sele="0" style="height: 40px;width: 40px;" onclick="if(this.dataset.sele==0){this.dataset.sele=1}else{this.dataset.sele=0}">';

                this.parentNode.insertBefore(huji,this);
                console.log(this.toString()+' Added');
            }
        );
    }
);

pMangaoh = document.createElement('p');
$(pMangaoh).css('position','fixed');
pMangaoh.style.top='0';
pMangaoh.style.left="0";
pMangaoh.style.width="100%";
pMangaoh.style.backgroundColor="Red";
pMangaoh.style.textAlign="Center";
pMangaoh.style.zIndex="10000";
buttonMangaoh = document.createElement('button');
buttonMangaoh.style.width="90%";
buttonMangaoh.innerHTML="选择完毕,输出!";
pMangaoh.appendChild(buttonMangaoh);
document.body.appendChild(pMangaoh);
$(buttonMangaoh).bind("click",window.mangaohLog);

txtMangaoh = document.createElement('textarea');
txtMangaoh.setAttribute('style',"position: fixed;width: 40px;height: 205px;bottom: 0px;box-shadow: rgb(255, 0, 0) 0px 0px 12px 2px;    resize: both;");
txtMangaoh.id='HujiTxt';
document.body.appendChild(txtMangaoh);