// ==UserScript==
// @name TSDM 获取链接的TID/链接文字/完整链接
// @namespace TSDM 获取链接的TID/链接文字/完整链接
// @grant none
// @include     http://www.tsdm.me/*
// @include     http://www.tsdm.net/*
// @include     http://www.tsdm.tw/*
// @run-at      document-end
// ==/UserScript==
jQuery('<script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"></script>').appendTo(document.body);
const Namspace = (function () {
    var ramstring = "_"+Math.random()+"";
    window[ramstring] = {};
    return window[ramstring];
})();
(function () {
    var it = setInterval(function () {
        if (window.Clipboard) {
            clearInterval(it);
            (function () {
                var container = jQuery('<div id="popover-container" desc="popver的浮动框需要一个HTML元素">');
                var delIcon = jQuery('<i id="del-popover">X</i>');
                var delPopOver = function delPopOver() {
                    if(Namspace['popover']){
                        Namspace['popover'].destroy();
                        Namspace['popover']=null;
                    }
                };
                document.onkeydown = function (e) {
                    if(e.key=="Delete"){
                        delPopOver();
                    }
                };
                delIcon.click(delPopOver);
                container.append(delIcon);
                container.append(jQuery('<input type="text" id="full-text">\
                <button id="btn-full-text" data-clipboard-action="copy" data-clipboard-target="#full-text">Copy Full Text</button><br>'));
                container.append(jQuery('<input type="text" id="tid-only">\
                <button id="btn-tid-only" data-clipboard-action="copy" data-clipboard-target="#tid-only">Copy Tid</button><br>'));
                container.append(jQuery('<input type="text" id="full-link">\
                <button id="btn-full-link" data-clipboard-action="copy" data-clipboard-target="#full-link">Copy Full Link</button><br>'));
                container.appendTo(document.body);
                container.append(jQuery('<style>' +
                    '#popover-container{background-color: rgba(0, 0, 0, 0.29);' +
                    'padding: 5px; ' +
                    '}' +
                    'i#del-popover{' +
                    '    position: absolute;' +
                    'background-color: red;\
                width: 20px;\
                border-radius: 100%;\
                text-align: center;\
                color: white;\
                cursor:pointer}' +
                    '' +
                    '</style>'));
                var clipboards = [new Clipboard('#btn-full-text'), new Clipboard('#btn-full-link'), new Clipboard('#btn-tid-only')];
                clipboards.forEach(function (e) {
                    e.on("success", function (res) {
                        console.log(res.action, res.text)
                    })
                });
            })();
        }
    }, 1000);
})();
(function () {
    var _$ = window.$;
    var _oldJquery = window.jQuery;
    window.jQuery('<script src="https://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>').appendTo(document.body);
    var it = setInterval(function () {
        console.log(jQuery.fn.jquery);//查看版本
        if (window.jQuery.fn.jquery == '1.11.3') {
            window.$ = _$;
            const JQ_1_11 = window.jQuery;
            window.jQuery('<script src="https://unpkg.com/popper.js"></script>').appendTo(document.body);
            window.jQuery = _oldJquery;
            var it2 = setInterval(function () {
                if (window.Popper) {
                    clearInterval(it2);
                    var popper = document.querySelector("#popover-container");
                    jQuery("#wp").delegate("a[href*='tid='", "mouseenter", function () {
                        if(!Namspace['popover']){
                            var fulltext = this.innerText;
                            popper.querySelector("input#full-text").value = fulltext;
                            var fulllink = this.href;
                            popper.querySelector("input#full-link").value = fulllink;
                            var tid = (function (link) {
                                var matched = link.match(/tid=\d*/g);
                                if(matched&&matched[0]){
                                    //mathched[0] = 'tid=123456'
                                    return matched[0].match(/\d+/g)[0];
                                }
                                return "UNKNOWN";
                            })(this.href);
                            popper.querySelector("input#tid-only").value = tid;
                            var ref = this;
                            var anothorPopper = Namspace['popover'] = new Popper(ref, popper, {
                                placement: "bottom"
                            });
                        }

                    });
                }
            }, 1000);
            clearInterval(it);
        }
    }, 2000);
})()



