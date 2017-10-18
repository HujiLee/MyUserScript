// ==UserScript==
// @name TSDM 获取链接的TID/链接文字/完整链接
// @namespace TSDM 获取链接的TID/链接文字/完整链接
// @grant none
// @include     http://www.tsdm.me/*
// @include     http://www.tsdm.net/*
// @include     http://www.tsdm.tw/*
// @run-at      document-end
// ==/UserScript==
jQuery('<script src="https://cdn.jsdelivr.net/npm/clipboard@1/dist/clipboard.min.js"></script>').appendTo(document.body);
(function () {
    var it = setInterval(function () {
        if (window.Clipboard) {
            clearInterval(it);
            (function () {
                var container = jQuery('<div id="popover-container" desc="popver的浮动框需要一个HTML元素">');
                container.append(jQuery('<input type="text" id="full-text">'));
                container.append(jQuery('<button id="btn-full-text" data-clipboard-action="copy" data-clipboard-target="#full-text">Copy Full Text</button>'));
                container.appendTo(document.body);
                var clipboard = new Clipboard('#btn-full-text');
                clipboard.on("success", function () {
                    console.log(arguments)
                })
            })();
        }
    }, 1000);
})();


var _$ = window.$;
var _oldJquery = window.jQuery;
window.jQuery('<link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.webui-popover/1.2.1/jquery.webui-popover.min.css">\
    <script src="https://cdn.jsdelivr.net/jquery/1.11.3/jquery.min.js"></script>').appendTo(document.body);
var it = setInterval(function () {
    console.log(jQuery.fn.jquery);//查看版本
    if (window.jQuery.fn.jquery == '1.11.3') {
        window.$ = _$;
        const JQ_1_11 = window.jQuery;
        window.jQuery('<script src="http://sandywalker.github.io/webui-popover/dist/jquery.webui-popover.min.js"></script>').appendTo(document.body);
        var it2 = setInterval(function () {
            if (window.jQuery.fn.webuiPopover) {
                clearInterval(it2);
                console.log(jQuery.fn.webuiPopover);
                window.jQuery = _oldJquery;
                window._jq_1_11 = JQ_1_11;
                (function (jQuery) {
                    jQuery('body').delegate('a[href*="tid="]', 'mouseenter', function () {
                        // debugger
                        WebuiPopovers.show(this,{title:' hello popover',url:"#popover-container",closeable:true,trigger:'sticky'});
                    });
                    jQuery('body').delegate('a[href*="tid="]', 'mouseleave', function () {
                        // WebuiPopovers.hide(this);
                    });
                })(JQ_1_11);
            }
        }, 2000);
        clearInterval(it);
    }
}, 2000);

