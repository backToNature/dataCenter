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

//getData();
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.cyDataStatus === "cyDataActive"){
//       loadJs('http://localhost/backToNaturedemo.github.io/frontend/changyan/data-center/injection.js');
//        loadJs('http://localhost:63342/dev/backToNaturedemo.github.io/frontend/changyan/data-center/injection.js');
        loadJs('http://10.2.58.184:8099/adapter.js');
    } else if (request.cyDataStatus === "cyDataClose") {
        var $cyanDataWrapper = $('#cyanData-wrapper');
        $cyanDataWrapper.css('width', 0);
        window.setTimeout(function () {
            $cyanDataWrapper.remove();
        }, 1000);
    }
});