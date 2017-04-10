// ==UserScript==
// @name 实习僧-我的收藏增强
// @namespace Hujimiya Scripts
// @grant none
// @include     *://www.shixiseng.com/trainee/center/mcollect
// @run-at      document-end
// ==/UserScript==

console.info("[Hujimiya Info]","实习僧go");
// console.info(jQuery("body"));
jQuery("body").bind("DOMNodeInserted.hujimiya", function bodyOnInserted(event) {
    console.info(event.target)
    if (event.target.classList[0] === "fun_model") {
        // debugger;
        jQuery(event.target).bind("DOMNodeInserted.hujimiya", function modelOnInserted(event) {

            if (event.target.tagName == "SCRIPT") {
                // debugger;
                {
                    var interns = jQuery(".fun_model>div[data-stype=intern]");
                    // console.info(interns);
                    var hrefs = [];
                    interns.each(function pushToHrefs(index, element) {
                        hrefs[index] = element.querySelector("a").getAttribute("href");
                    });
                    var index = 0;
                    var length = hrefs.length;
                    const PRICE_SELECTOR = "span.daymoney";//待遇
                    const COMPANYNAME_SELECTOR = ".jb_det_right_top>p:first-of-type>a";//公司名
                    const PLACE_SELECTOR = "span.city";//城市名 取title即可
                    var loadXhr = function loadXhr(index) {
                        var ajax = jQuery.ajax(hrefs[index]);
                        ajax.success(function ajaxSuc(responseText, textStatus, jqXHR) {
                            var jhtml = jQuery(responseText);
                            interns.eq(index)
                                .append(jhtml.find(PLACE_SELECTOR))
                                .append(jhtml.find(PRICE_SELECTOR))
                                .append(jhtml.find(COMPANYNAME_SELECTOR))
                                .css("height", "auto")
                        }).error(function ajaxErr(jqXHR, textStatus, errorString) {
                            console.info("[Hujimiya Error]", index, hrefs[index], errorString);
                        }).then(function ajaxThen() {
                            // console.info(index++);
                            // debugger;
                            index++;
                            console.count("[Hujimiya Count] Ajax获取职位信息");
                            if (index < length) {
                                loadXhr(index);
                            } else {
                                console.info("[Hujimiya Info]","Complete")
                            }
                        });

                    };
                    loadXhr(0);
                }
                setTimeout(function clicTab() {
                    jQuery(".back_nav li:nth-of-type(2)").click();//点击"职位"使得默认就在职位tab上
                }, 1000);
                jQuery(event.currentTarget).unbind("DOMNodeInserted.hujimiya");

            }

        });
        jQuery(event.currentTarget).unbind("DOMNodeInserted.hujimiya");
    }

});



