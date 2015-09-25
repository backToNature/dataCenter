define(function(require, exports, module) {
    
    var $$wapData_model = require('model/wapData.js');
    var $$pie_M = require('model/pie.js');
    var $$data_M = require('model/data.js');
    var $$event = Backbone.Events;
    // 自定义
    var userSettingWays = {
        // 系统&浏览器信息
        'SYSTEMANDBROWSER': function () {
            return {
                getSystemVersionCategory: function (data) {
                    var temp;
                    _.mapObject(data, function (val, key) {

                        return val
                    });
                }
            };
        },
        // 浮条使用次数
        'FLOATBAR-USE-TIME': function (data) {

        },
        // 畅点使用次数
        'LAYER-USE-TIME': function (data) {

        },
        // 评论框展示次数
        'MAINWRAPPER-DISPLAY-TIME': function (data) {

        },
        // 弹幕关闭点击次数
        'BARRAGE-CLOSE-CLICK-NUM': function (data) {

        },
        // 弹幕启动次数
        'BARRAGE-ACTIVE-NUM': function () {

        }
    };



    $(function () {
        $('#search').on('click', function (e) {
            e.preventDefault();
            var date = $('#myDate').val(),
                hour = $('#myHours').val(),
                appid = $('#myAppid').val();
            $$data_M.getData(date, hour, appid);
        });

        // 日历组件
        $(".form_datetime").datetimepicker({
            weekStart: 1,
            todayBtn:  1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            format: 'yyyymmdd',
            autoclose: 1,
            todayHighlight: 1,
            language: 'zh-CN'
        });

        //
        $$event.on('EVT-CURRENT-CHANGED', function (data) {
            var isvType = require('widget/pies/isvType.js');
            isvType(data);
        });

    });
});