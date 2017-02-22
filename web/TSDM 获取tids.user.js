// ==UserScript==
// @name TSDM 下载区主版tid
// @namespace Violentmonkey Scripts
// @grant none
// @include http://www.tsdm.net/forum.php?mod=forumdisplay&fid=8*
// @run-at      document-end
// ==/UserScript==

jQuery("#ts_sidebar_base").remove();

(function () {
    //创建元素要用,css要用
    var classNameForCheckBox = "js-check";
    var classNameForA = "js-select";

    /**
     * 创建checkbox元素 绑定事件
     */
    (function () {
        var fidas = jQuery("a.xst");
        var checkbox = jQuery("<input type='checkbox' class='js-check'>".replace("js-check", classNameForCheckBox))[0];
        jQuery(checkbox).bind("click", function () {
            // console.log(this);
            jQuery(this).siblings("a").toggleClass(classNameForA);
        });
        fidas.each(function () {
            /*console.log(this);
             console.log(jQuery(this).parent());*/
            try {
                jQuery(this).parent().prepend(jQuery(checkbox).clone(true));
            } catch (e) {

            } finally {

            }

        });
    })();

    /**
     * 创建CSS类并附到网页
     */
    (function () {
        var cssForCheckBox = jQuery("<style>" +
            "." + classNameForCheckBox +
            `{-webkit-appearance: none;\n            border: 3px black solid;\n            width: 15px;\n            height: 15px;\n            border-radius: 50%;\n            cursor:pointer;\n            box-shadow: 0px 0px 5px black;` +
            "}" +
            "." +
            classNameForCheckBox +
            ":checked{" +
            `background-color: #FF0080;
            border-color: white;
            box-shadow: 0px 0px 10px #FF0080;` +
            "}" +
            "</style>");
        var cssForA = jQuery("<style>" +
            "." +
            classNameForA +
            "{" +
            `   text-shadow: 0 0 4px #FF0080,0 0 4px #FF0080;
                color: white !important;` +
            "}" +
            "</style>")
        jQuery("body").append(cssForCheckBox).append(cssForA);
    })();

    /**
     * 创建执行按钮和返回结果的textarea
     */
    (function () {
        var getParameter = function (href, paraname) {
            var reg = new RegExp("(^|&)" +
                paraname + "=([^&]*)(&|$)");
            var r = href.match(reg);
            if (r) {
                return r[2];
            } else {
                return null;
            }
        };
        jQuery("body").append(
            jQuery(`<div class="tid-div"></div>`).append(
                jQuery(`<button>导出tids</button>`).bind("click", function () {
                    var as = jQuery('.' + classNameForA);
                    var arr = [];
                    as.each(function () {
                        arr.push(getParameter(this.href, 'tid'));
                    });
                    jQuery("#fid-result").html(
                        arr.join(",")
                    );
                })
            ).append(
                jQuery(`<button>Reset</button>`).bind("click", function () {
                    jQuery('.' + classNameForA).removeClass(classNameForA);
                    jQuery('.' + classNameForCheckBox).each(function () {
                        this.checked = false;
                    });
                })
            ).append(
                jQuery(`<style>\n                .tid-div{\n                position:fixed;width:50vw;height:50px;left:0;top:0;background-color:rgba(255,255,255,0.5)\n                }\n                .tid-div button{\n                display: inline-block;\n	outline: none;\n	cursor: pointer;\n	text-align: center;\n	text-decoration: none;\n	font: 14px/100% Arial, Helvetica, sans-serif;\n	padding: .5em 2em .55em;\n	text-shadow: 0 1px 1px rgba(0,0,0,.3);\n	-webkit-border-radius: .5em; \n	-moz-border-radius: .5em;\n	border-radius: .5em;\n	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);\n	-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);\n	box-shadow: 0 1px 2px rgba(0,0,0,.2);\n                }\n</style>`)
            )
        ).append(jQuery(`<textarea id="fid-result"
          style="position: fixed;width: 480px;right: 0px;top: 0px;resize: both;margin: 0px;height: calc(100% / 6);background-color: rgba(255, 255, 255, 0.76);"
          placeholder="这里显示你选择了的fid"></textarea>`))


    })();

})();





