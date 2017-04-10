// ==UserScript==
// @name 实习僧-我的收藏增强
// @namespace Hujimiya Scripts
// @grant none
// @include     *://www.shixiseng.com/trainee/center/mcollect
// @run-at      document-end
// ==/UserScript==

console.info("[Hujimiya Info]", "实习僧go");
// console.info(jQuery("body"));
const timer_date = [];
var timer_flag   = false;
var jWin = jQuery(window);
jWin.bind("timer.go",function (event) {
    if(!timer_flag){
        timer_flag=!timer_flag;
        timer_date[0] = new Date();
    }
});
jWin.bind("timer.end",function (event) {
    timer_date[1] = new Date();
    console.info("[Hujimiya Timer]",timer_date[0],"to",timer_date[1]);
    timer_date.pop();
    timer_date.pop();
    debugger;
    jQuery(event.currentTarget).unbind("timer.go").unbind("timer.end");
});
jQuery("body").bind("DOMNodeInserted.hujimiya", function bodyOnInserted(event) {
    // console.info(event.target);
    if (event.target.classList[0] === "fun_model") {
        // debugger;
        jQuery(event.target).bind("DOMNodeInserted.hujimiya", function modelOnInserted(event) {
            if (event.target.tagName == "SCRIPT") {
                // debugger;
                (function main() {
                    const interns = jQuery(".fun_model>div[data-stype=intern]");
                    // console.info(interns);
                    const hrefs = [];
                    interns.each(function pushToHrefs(index, element) {
                        hrefs[index] = element.querySelector("a").getAttribute("href");
                    });
                    const hrefsLength = hrefs.length;
                    const PRICE_SELECTOR = "span.daymoney";//待遇
                    const COMPANYNAME_SELECTOR = ".jb_det_right_top>p:first-of-type>a";//公司名
                    const PLACE_SELECTOR = "span.city";//城市名 取title即可
                    const X_ON_TIME_STEP = 95;//同一时刻最多可以同时进行的AJAX数目
                    const loadXhr = function loadXhr(startIndex) {
                        const endIndex = Math.round(Math.min(hrefsLength - 1, startIndex + X_ON_TIME_STEP - 1));
                        const subLength = endIndex - startIndex + 1;
                        var countAjaxFinished = 0;
                        for (var i = startIndex; i <= endIndex; i++) {
                            (function (i) {
                                const ajax = jQuery.ajax(hrefs[i]);
                                jQuery(window).trigger("timer.go");
                                ajax.success(function ajaxSuc(responseText, textStatus, jqXHR) {
                                    const jhtml = jQuery(responseText);
                                    interns.eq(i)
                                        .append(jhtml.find(PLACE_SELECTOR))
                                        .append(jhtml.find(PRICE_SELECTOR))
                                        .append(jhtml.find(COMPANYNAME_SELECTOR))
                                        .css("height", "auto")
                                }).error(function ajaxErr(jqXHR, textStatus, errorString) {
                                    console.info("[Hujimiya Error]", i, hrefs[i], errorString);
                                }).then(function ajaxThen() {
                                    // console.info(index++);
                                    // debugger;
                                    countAjaxFinished++;
                                    console.count("[Hujimiya Count] Ajax获取职位信息<<" + startIndex);
                                    if (countAjaxFinished === subLength) {
                                        const nextIndex = startIndex + X_ON_TIME_STEP;
                                        if (nextIndex < hrefsLength) {
                                            loadXhr(nextIndex);
                                        } else {
                                            console.info("[Hujimiya Info]", "Complete")
                                            jQuery(window).trigger("timer.end");
                                        }
                                    }
                                });
                            })(i);
                        }
                    };
                    loadXhr(0);
                })();
                setTimeout(function clicTab() {
                    jQuery(".back_nav li:nth-of-type(2)").click();//点击"职位"使得默认就在职位tab上
                }, 1000);
                jQuery(event.currentTarget).unbind("DOMNodeInserted.hujimiya");

            }

        });
        jQuery(event.currentTarget).unbind("DOMNodeInserted.hujimiya");
    }

});



