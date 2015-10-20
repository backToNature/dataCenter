/**
 * Created by haoguo on 2015/10/15.
 */
function loadJs(src, fun) {
    var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    script.setAttribute('src', src);

    if (typeof fun === 'function') {
        if (window.attachEvent) {
            script.onreadystatechange = function () {
                var r = script.readyState;
                if (r === 'loaded' || r === 'complete') {
                    script.onreadystatechange = null;
                    fun();
                }
            };
        } else {
            script.onload = fun;
        }
    }

    head.appendChild(script);
}

function loadCss(url) {
    var container = document.getElementsByTagName("head")[0];
    var addStyle = document.createElement("link");
    addStyle.rel = "stylesheet";
    addStyle.type = "text/css";
    addStyle.media = "screen";
    addStyle.href = url;
    container.appendChild(addStyle);
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.cyDataStatus === "cyDataActive"){
        loadJs('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', function () {
            loadCss('http://localhost:63342/dev/backToNaturedemo.github.io/frontend/changyan/data-center/tpl.css');
//            loadJs('http://backtonaturedemo.github.io/frontend/changyan/data-center/injection.js');

            localforage.setItem('cyData_extension', request);
            loadJs('http://localhost:63342/dev/backToNaturedemo.github.io/frontend/changyan/data-center/injection.js', function () {
            });

        });
    } else if (request.cyDataStatus === "cyDataClose") {

    }
});