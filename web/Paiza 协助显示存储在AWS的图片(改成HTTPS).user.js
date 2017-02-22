/**
 * Created by Administrator on 2016/11/4 0004.
 */
// ==UserScript==
// @name Paiza 协助显示存储在AWS的图片(改成HTTPS)
// @namespace Violentmonkey Scripts
// @grant none
// @include     https://paiza.jp/challenges*
// @run-at      document-end
// ==/UserScript==

jQuery("img[src*='amazon'][src^='http:']").map(function (x) {
    this.src = this.src.replace('http',"https")
});