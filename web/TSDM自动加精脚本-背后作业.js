// ==UserScript==
// @name TSDM自动加精脚本-背后作业
// @namespace Hujimiya Scripts
// @grant none
// @include     *://www.tsdm.*/forum.php?mod=viewthread&tid=*
// @run-at      document-end
// ==/UserScript==

/**
 * 检测体积
 */

//todo:首先要检测帖子是否能正常打开,否则..
if (!document.querySelector("#postlist>[id^=post_]")) {
    console.error("神特么主题不存在???");
    //todo:parent.trigger("error")
    parent.jQuery(parent).trigger("JHERROR");
} else {
    var namespace = (function () {
        var NAMESPACE = "TSDM自动加精脚本-收集链接" + Math.round(Math.random() * 100000);
        window[NAMESPACE] = (function () {
            if (window[NAMESPACE]) {
                window[NAMESPACE]["conflict-debug"] = true;//不太可能 但居然出现了命名空间冲突
                return window[NAMESPACE];
            } else {
                return {};
            }
        })();
        return window[NAMESPACE];
    })();
    var size = (function () {
        var title = jQuery('#postlist  td.plc.ptm.pbn > h1')[0];
        var size = title.childNodes[2].data;
        size = size.substr(size.lastIndexOf('[') + 1, size.lastIndexOf(']') - size.lastIndexOf('[') - 1);
        size = size.substr(0, size.lastIndexOf('G'));
        size = parseFloat(size);
        console.log("[背后作业]:size="+size);
        return size;

    })();
    window.chain = (function () {
        /**
         * 构建好职责链模式
         */
        /**
         *
         * @param size
         * @param level
         * @constructor
         */
        var Chain = function (size, level) {
            this.lowerChain = null;
            this.setNext = function (nextChain) {
                this.lowerChain = nextChain;
                return this;
            };
            var config = {
                level: level,
                size: size
            };
            this.process = function (size) {
                if (size >= config.size) {
                    console.log(level);
                    goJinghua(level);
                } else {
                    this.lowerChain.process(size);
                }
            };
        };
        var j3 = new Chain(97, 3);
        var j2 = new Chain(38.5, 2);
        var j1 = new Chain(14.5, 1);
        var j0 = new Chain(-1, 0);
        j3.setNext(j2.setNext(j1.setNext(j0)));
        return j3;
    })();
    var tid = window.tid || (function getTid() {

        })();
    var hasAlreadyJing = function () {
        return !!document.querySelector("[title=精华]");
    }
    var goJinghua = function (level) {
        var goJing = function (level) {
            var A_TAG_Named_Jinghua = document.querySelector("#modmenu > a:nth-child(9)");
            var appendParent = jQuery("#append_parent");
            appendParent.bind("DOMNodeInserted", function (event){
                // console.log(event.target);
                if(!event.target.id&&event.target.tagName=="DIV"){
                    var form = jQuery("#moderateform");
                    form.find("select[name='digestlevel']").val(level);
                    form.find("#sendreasonpm").attr("checked","checked");
                    // debugger;
                    form.submit();//submit以后就跳转了所以不需要unbind事件

                }
            });
            A_TAG_Named_Jinghua.click();
        };
        if (level == 3) {
            // debugger;
            var listenParent = jQuery(document.querySelector("#postlist>div[id^=post_]"));
            listenParent.bind("DOMNodeInserted",function (event) {
                // debugger;
                if(event.target.id.indexOf("post_")==0){
                    //debugger显示这是最后一个对事件起反应的
                    //评完威望和Jl以后再加精
                    goJing(level);
                }
            });
            $rateOnEvent({
                ww:100,
                jl:3,
                comment:"3级精华加成by小武藏加精卖萌"
            })
        }else if(level!=0){
            goJing(level);
        }

    };

        var $rateOnEvent = function (config) {
            var config = config || {};
            var ww = config.ww || 0;
            var tsb = config.tsb || 0;
            var xc = config.xc || 0;
            var tr = config.tr || 0;
            var fh = config.fh || 0;
            var jl = config.jl || 0;
            var comment = config.comment || (function () {
                    if (typeof getReason == typeof $rateOnEvent) {
                        return getReason()
                    } else {
                        return false;
                    }
                })() || "Null";
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
            jQuery("#ak_rate").click()
        };



    if (localStorage["JH" + tid]) {
        switch (localStorage["JH" + tid]) {
            case "todo":
                console.log("todo");
                if (hasAlreadyJing()) {
                    localStorage.removeItem("JH" + tid);
                    parent.jQuery(parent).trigger("JHFINISH");
                } else {
                    if (isNaN(size)) {
                        console.error("检测不到体积,请手工加精");
                        //todo:补全手工加精
                        parent.jQuery(parent).trigger("JHERROR");
                    } else {
                        chain.process(size);
                    }
                }
                break;
            default:
                console.error("Error");
                debugger;
        }
    }

//todo:parent.jQuery(parent).trigger("JingHua") 如此触发父页面的事件即可

//todo:为了应对检测不出体积的时候,还需要提供手动输入体积加精的体制

//todo:还需要在没有localstorage时能单独使用本脚本
}

