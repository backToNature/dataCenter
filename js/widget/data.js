define(function(require, exports, module) {

    // 数据请求模块
    module. exports = (function () {
        var getData = function (url, fn) {
            $.ajax({
                // url: url,
                url: '../test.json',
                dataType: 'json',
                scriptCharset: 'utf-8',
                cache: false,
                success: function (data) {
                    var map = data.data[0];
                    if (_.isFunction(fn)) {
                        fn(map);
                    }
                }
            });
        };
        var host = 'http://10.10.80.157:9081/data/';
        return {
            getDay: function (date, fn) {
                var url = host + 'day/total/' + date;
                getData(url, fn);
            },
            getHour: function (date, fn) {
                var url = host + 'hour/total/' + date;
                getData(url, fn);
            },
            getDayAppid: function (date, appid, fn) {
                var url = host + 'day/' + appid + '/' + date;
                getData(url, fn);

            },
            getHourAppid: function (date, appid, fn) {
                var url = host + 'hour/' + appid + '/' + date;
                getData(url, fn);
            }
        };
    }());
});