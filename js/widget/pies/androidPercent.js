
define(function(require, exports, module) {
    var $$pie = require('widget/util/pie.js');
    var $$data = require('widget/util/pickData.js');

    module.exports = function (data) {

        var myData = $$data.pickData(data, '-SYSTEMANDBROWSER-');
        myData = $$data.pickData(myData, '-ANDROID-');
        var versionArr = $$data.pickSystemVersion(myData);

        var iosTypeArr = {};
        _.each(versionArr, function (val) {
            var key = '-' + val, value = val.replace('_', '.');
            iosTypeArr[key] = value;
        });



        var pieArr = $$data.diyPieData(myData, iosTypeArr);

        var params = {
            el: '#androidPercent',
            title: 'andorid系统版本占比',
            pointFormat: '{series.name}: <b>{point.y}</b>',
            name: '数量',
            data: pieArr
        };

        $$pie(params);
    };

});