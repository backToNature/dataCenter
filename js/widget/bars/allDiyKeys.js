
define(function(require, exports, module) {
    var $$bar = require('widget/util/bar.js');
    var $$data = require('widget/util/pickData.js');

    module.exports = function (data) {
        var categories = {
            '-BARRAGE-ACTIVE-NUM': '使用wap弹幕的次数',
            '-BARRAGE-CLOSE-CLICK-NUM': '点击关闭弹幕icon次数',
            '-MAINWRAPPER-DISPLAY-TIME': 'WAP评论框曝光次数',
            '-LAYER-USE-TIME': 'WAP畅点使用次数',
            '-FLOATBAR-USE-TIME': 'WAP浮层使用次数',
            '-COLORFUL-EGGS-USE-NUM': '彩蛋功能使用次数'
        };

        var barData = [];

        _.mapObject(categories, function (val, key) {
            var item = $$data.pickData(data, key);
            var num = $$data.count(item);
            barData.push(num);
        });

        var barCategories = _.values(categories);


        var params = {
            el: '#diyDatas',
            title: '畅言前端功能统计数据',
            pointFormat: '{series.name}: <b>{point.y}</b>',
            categories: barCategories,
            leftTitle: '畅言前端功能统计数据',
            data: barData
        };

        $$bar(params);

        $('#select_isv').on('change', function () {
            var val = $(this).val();
            barData = [];
            _.mapObject(categories, function (v, key) {
                var item = $$data.pickData(data, key);
                if (val != 'ALL') {
                    item = $$data.pickData(item, '-' + val + '-');
                }
                var num = $$data.count(item);
                barData.push(num);
            });

            params.data = barData;
            $$bar(params);
        });
    };

});