// ==UserScript==
// @name TSDM 增强编辑帖子的颜色选择
// @namespace TSDM 增强编辑帖子的颜色选择
// @grant none
// @include     http://www.tsdm.me/forum.php?mod=post&action=edit*
// @include     http://www.tsdm.net/forum.php?mod=post&action=edit*
// @include     http://www.tsdm.tw/forum.php?mod=post&action=edit*
// @run-at      document-idle
// @require  http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js
// ==/UserScript==

const COLORS = [
    "#FF0080",
    "#FF8800",
    "#00FF88",
    "#8800FF",
    "#00A0F0",
    "#9c664e",
    "#234567",
    "#3BF3CB"
];
var appendParent = jQuery("#append_parent");
appendParent.bind("DOMNodeInserted.ColorEnv",function (event) {
   if(event.target.id=="e_forecolor_menu"){
       var colorBox = jQuery(".p_pop.colorbox");
       // console.log(colorBox);
       var hujimiyasColorBox = jQuery("<huji>");
       // console.log(hujimiyasColorBox);
       (function () {
           for(var i in COLORS){
               var color = COLORS[i].toUpperCase();
               hujimiyasColorBox.append(
                   jQuery("<input type='button'>").attr("title",color).css("background-color",color).data("color",color)
               )
           }
       })();
       hujimiyasColorBox.delegate("input[type=button]","click",function (event) {
           // console.log(this.style);
           // debugger;
           var discuzcode = window["discuzcode"];
           discuzcode("forecolor",jQuery(this).data("color"));
       });
       colorBox.append(hujimiyasColorBox);

       //解除此事件监听
       appendParent.unbind("DOMNodeInserted.ColorEnv");
   }
});



