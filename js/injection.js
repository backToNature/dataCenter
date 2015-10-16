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

    loadJs('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', function () {
        loadJs('http://backtonaturedemo.github.io/frontend/changyan/data-center/injection.js');
    });
