// ==UserScript==
// @name TSDM自动加精脚本-收集链接
// @namespace Hujimiya Scripts
// @noframes
// @grant none
// @include     *://www.tsdm.*/forum.php?mod=viewthread&tid=*
// @run-at      document-end
// ==/UserScript==
var NAMESPACE = "TSDM自动加精脚本-收集链接" + Math.round(Math.random() * 100000);
window[NAMESPACE] = (function () {
    if (window[NAMESPACE]) {
        window[NAMESPACE]["conflict-debug"] = true;//不太可能 但居然出现了命名空间冲突
        return window[NAMESPACE];
    } else {
        return {};
    }
})();
var namespace = window[NAMESPACE];
if ((function getFid() {
        var fid = window.fid || (function () {
                var A_FID_SELECTOR = "#pt div.z a:nth-last-of-type(2)";
                var fidhref = jQuery(A_FID_SELECTOR).attr("href");
                return (function () {
                    var config = {
                        "LAST&": fidhref.lastIndexOf("&"),
                        "LASTFID": fidhref.lastIndexOf("&fid=")
                    };
                    if (config["LAST&"] == config["LASTFID"]) {
                        "说明&fid=**是在末尾";
                        return Number.parseInt(fidhref.substr(config["LAST&"] + 5));
                    } else {
                        "说明&fid=*&page=***";
                        return Number.parseInt(fidhref.substring(config["LAST&"] + 5, config["LASTFID"]));
                    }
                })();
            })();
        return fid;
    })() === 77) {
    console.log("I am in 精华申请");
    namespace.tids = [];
    var getTid = function (href) {
        //href = http://www.tsdm.net/forum.php?mod=viewthread&tid=740495&fromuid=1133778
        var query = href.substr(href.indexOf("?")+1);
        var kv = (function () {
            var arr = query.split("&");
            var kv = {};
            var kvarr;
            for(var i in arr){
                kvarr = arr[i].split("=");
                kv[kvarr[0]]=kvarr[1];
            }
            return kv;
        })();
        if(kv['tid']){
            return kv["tid"];
        }else{
            throw {
                href:href,
                textMsg:"No tid!"
            };
        }
    };
    var tablePostmesssage = document.querySelector("#postlist>[id^=post_]>table [id^=postmessage]");
    var jq_links = jQuery(tablePostmesssage).find("a[href*='&tid='][href*='www.tsdm']");
    (function 数一数一共获取了多少个a() {
        var pAsAdded = jQuery("<p id='count' style='/*position:fixed;top:0;left: 0;*/width:100%;height:20px'>" ).html("一共识别了了"+jq_links.length+"个链接");
        pAsAdded.append(jQuery("<span style='height:40px;width:40px;margin:10px;background-color:white;color:black'>X</span>").bind("click",function (event) {
            var parent = pAsAdded[0].parentNode;
            parent.removeChild(pAsAdded[0]);

        }));
        jQuery(document.querySelector("#pgt")).append(pAsAdded);
    })();
    jq_links.each(function (index, element) {
        // console.log(index,element);
        try {
            namespace.tids.push(getTid(element.href));
            element.innerText=element.href
            element.style.color = "black";
            element.style.textShadow="0 0 4px red"
        } catch (e) {
            console.error(index,element);
        }
    });
    (function loadToLocalStorage() {
        for(var i in namespace.tids){
            localStorage["JH"+namespace.tids[i]]="todo";
        }
    })();
    var childFr = (function setAn_Iframe() {
       var ifr =  jQuery("<iframe id='hujiJingHua' width='' style='width:100vw;height:calc(100% / 2);position:fixed;bottom:0;left:0'>");
       jQuery("body").append(ifr);
       return ifr;
    })();
    var getFullHref = function (targettid) {
        return location.origin+"/forum.php?mod=viewthread&tid="+targettid;
    };
    var errorTids = [];
    if(namespace.tids.length>0){
        //将第一个tid转换成fullHref...
        var currentIndex = 0;
        var tidslength = namespace.tids.length;
        childFr.attr("src",getFullHref(namespace.tids[currentIndex]));
        var jq_window = jQuery(window);
        jq_window.bind("JHFINISH",function () {
            console.info(NAMESPACE+":finish!"+namespace.tids[currentIndex]);
            currentIndex++;
            if(currentIndex<tidslength){
                childFr.attr("src",getFullHref(namespace.tids[currentIndex]));
            }else{
                finishPocess();
            }

        });
        jq_window.bind("JHERROR",function () {
            console.info(NAMESPACE+":errro!"+namespace.tids[currentIndex]);
            errorTids.push(namespace.tids[currentIndex]);
            currentIndex++;
            if(currentIndex<tidslength){
                childFr.attr("src",getFullHref(namespace.tids[currentIndex]));
            }else{
                finishPocess();
            }
        });
        var finishPocess = function () {
            childFr.attr("src",location.origin);
            childFr.html("");
            if(errorTids.length>0){
                childFr.append((function () {
                    var leftLinks = jQuery("<div>");
                    for(var i in errorTids){
                        leftLinks.append(jQuery("<a>").html(errorTids[i]).attr("src",getFullHref(errorTids[i])));
                    }
                    return leftLinks;
                })())
            }
        };

    }


}




