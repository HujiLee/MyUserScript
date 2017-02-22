// ==UserScript==
// @name TSDM主版评分辅助脚本V2
// @namespace Hujimiya Scripts
// @noframes
// @grant none
// @include     *://www.tsdm.*/forum.php?mod=viewthread&tid=*
// @run-at      document-idle
// @run-at      document-end
// ==/UserScript==
window.Gm = GM_info;
window.T = this;

(function () {
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
    if (fid == 8) {
        var REASONS =[
            "2333",
            "太阳当空照 菊花对我笑",
            "{doge}",
            "[哆啦A梦惊讶]",
            "[泪扇]",
            "牛奶果然武藏野",
            "=W=",
            "暖人心田"
        ];
        var getReason = function () {
            var ram = Math.round(Math.random()*100)%REASONS.length;
            return REASONS[ram];
        };
        var NAMESPACE = "Huji-主版评分-V2-" + Math.round(Math.random() * 100000);
        var _conslelog = console.log;
        console.log = function (arg) {
            console.info(NAMESPACE+":"+arg);
        };
        window[NAMESPACE] = (function () {
            if (window[NAMESPACE]) {
                window[NAMESPACE]["conflict-debug"] = true;//不太可能 但居然出现了命名空间冲突
                return window[NAMESPACE];
            } else {
                return {};
            }
        })();


        (function run() {
            console.log("RUN");
            var $rateOnEvent = function (config) {
                var config = config || {};
                var ww = config.ww || 0;
                var tsb = config.tsb || 0;
                var xc = config.xc || 0;
                var tr = config.tr || 0;
                var fh = config.fh || 0;
                var jl = config.jl || 0;
                var comment = config.comment ||(function () {
                        if(typeof getReason==typeof $rateOnEvent){
                            return getReason()
                        }else{
                            return false;
                        }
                    })() ||"Null";
                var appendParent = jQuery("#append_parent");

                appendParent.bind("DOMNodeInserted", function (event) {
                    // console.log(event.target.id);
                    if (event.target.id == "floatlayout_topicadmin") {
                        // console.log(233);
                        var form = jQuery(event.target).find("#rateform");
                        form.find("#score1").val(ww);
                        form.find("#score2").val(tsb);
                        form.find("#score3").val(xc);
                        form.find("#score4").val(tr);
                        form.find("#score5").val(fh);
                        form.find("#score6").val(jl);
                        form.find("#reason").val(comment);
                        form.find("button").click();
                        jQuery(this).unbind("DOMNodeInserted");
                    }



                });
                jQuery.when(jQuery("#ak_rate").click()).done(
                    function () {
                    }
                );
            };

            /**
             * 添加HTML元素上去用于半自动评分
             */
            (function () {
                var p = jQuery("<p  style='color:white;text-shadow:0 0 4px #FF0080,0 0 4px #FF0080,0 0 4px #FF0000;text-align:center'>多少话:</p>");
                var howManyJi = 1;
                var inputNumber = jQuery("<input type='number' value='1' step='1' style='width:30px'>").bind("input", function (event) {
                    //p;//debug
                    howManyJi = Number.parseInt(event.target.value);
                });
                p.append(inputNumber);
                p.append("<span>话</span>");
                var getPingfen = function () {
                    var howMany = (function () {
                        var result = Number.parseInt(howManyJi);
                        if(Number.isNaN(result)){
                            return 1;
                        }else {
                            return result;
                        }
                    })();
                    var ww = 5 * howMany;
                    var tsb = 25 * howMany;
                    return {
                        ww: ww,
                        tsb: tsb
                    };
                };
                var buttonToGo = jQuery("<button> 评分</button>").bind("click", function (e) {
                    $rateOnEvent(getPingfen());
                });
                p.append(buttonToGo);
                p.insertBefore("#modmenu");


            })();


        })();
        console.log = _conslelog;
    }

})();

