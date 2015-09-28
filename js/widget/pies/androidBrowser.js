
define(function(require, exports, module) {
    var $$pie = require('widget/util/pie.js');
    var $$data = require('widget/util/pickData.js');

    module.exports = function (data) {
        var browserType = {
            '-chrome': '谷歌',
            '-baidu': '手机百度',
            '-UC': 'UC',
            '-QQ': '手机QQ',
            '-qq': 'qq浏览器',
            '-360': '360',
            '-weixin': '微信',
            '-opera': 'opera',
            '-OTHERBROWSER': '其他浏览器',
            '-sogou': '搜狗'
        };


        var myData = $$data.pickData(data, '-SYSTEMANDBROWSER-');
        myData = $$data.pickData(myData, '-ANDROID-');
        var pieArr = $$data.diyPieData(myData, browserType);

        var params = {
            el: '#androidBrowser',
            title: '安卓系统浏览器份额',
            pointFormat: '{series.name}: <b>{point.y}</b>',
            name: '数量',
            data: pieArr
        };

        $$pie(params);
    };

});