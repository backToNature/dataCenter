define(function(require, exports, module) {
    
    var M_ajax = require('widget/reqData/ajax.js');
    var $$wapData_model = require('model/wapData.js');
    var $$pie = require('widget/chart/pie.js');
    var $$data = require('widget/pickData/wap.js');

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
        var callback = function (data) {
            $$wapData_model.set('allData', data);
            $$pie.init({
                el: '#stable_beta',
                allData: $$wapData_model.get('allSystemObj'),
                renderArr: ['BETA', 'STABLE'],
                title: 'stable与beta占比'
            });
            $$pie.init({
                el: '#system_percent',
                allData: $$wapData_model.get('allSystemObj'),
                renderArr: ['ANDROID', 'IOS', 'OTHERSYSTEM'],
                funcObj: {
                    ANDROID: function (data) {
                        return $$data.pickSystemVersion(data);
                    },
                    IOS: function () {
                        return $$data.pickSystemVersion(data);
                    }
                },
                title: '系统份额占比'
            });
        };
        $('#search').on('click', function (e) {
            e.preventDefault();
            var date = $('#myDate').val(),
                hour = $('#myHours').val(),
                appid = $('#myAppid').val();
            if (date == '') {
                return;
            }
            if (hour == 'allDay') {
                if (appid != '') {
                    M_ajax.getDayAppid(date, appid, callback);
                } else {
                    M_ajax.getDay(date, callback);
                }
            } else {
                date = date.substring(2, date.length) + '_' + hour;
                if (appid != '') {
                    M_ajax.getHourAppid(date, appid, callback);

                } else {
                    M_ajax.getHour(date, callback);
                }
            }
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
    });
});