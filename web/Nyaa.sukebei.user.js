// ==UserScript==
// @name  Nyaa.sukebei
// @namespace Violentmonkey Scripts
// @grant none
// @match     https://sukebei.nyaa.se/*
// @match     http://sukebei.nyaa.se/*
// @run-at      document-end
// @require  http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js
// ==/UserScript==

//首先加载jQuery

// var sc = document.createElement("script");
// sc.src = "http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js";
// document.body.appendChild(sc);


jQuery("tr.trusted.tlistrow>.tlistname").each(function () {
    var inner = jQuery(this).find('a').html();//<a>的内容
    jQuery(this).find('a').html('LINK');
    jQuery(this).find('a').attr('title',inner);
    strs = inner.split(/\[|\]|-|\s/);
    for (var idx = 0; idx < strs.length; idx++) {

        if (strs[idx] !== '') {
            var sp = document.createElement('span');
            sp.innerHTML = strs[idx];
           // console.log(strs[idx]);
            jQuery(this).append(sp);
        }

    }
    sp.innerHTML = inner;
    sp.style.color="#FF0080";
    jQuery(this).append(sp);

    jQuery(this).find('span').css("text-decoration", " underline");
    jQuery(this).find('span').css("cursor", " pointer");
    jQuery(this).find('span').css("padding-left", '9px');


});

jQuery("tr.trusted.tlistrow>.tlistname").find('span').bind("click",function () {
    var txt = document.querySelector("input[type='text']");
    txt.value = jQuery(this).html();
    txt.select();
    document.execCommand('copy')
});