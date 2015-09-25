
define(function(require, exports, module) {
    var $$pie = require('widget/util/pie.js');
    var $$data = require('widget/util/pickData.js');

    module.exports = function (data) {
        var isvType = {
            '-STABLE-': 'stable',
            '-BETA-': 'beta'
        };
        var myData = $$data.pickData(data, '-SYSTEMANDBROWSER-');
        var pieArr = $$data.diyPieData(myData, isvType);

        var params = {
            el: '#stable_beta',
            title: '网站类型占比',
            pointFormat: '{series.name}: <b>{point.y}</b>',
            name: '数量',
            data: pieArr
        };

        $$pie(params);
    };

});