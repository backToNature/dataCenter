define(function(require, exports, module) {
    
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

        $('#select_uv_pv,#select_device,#select_code_version').on('change', function () {
            var allKeys = {
                clientType: $('#select_uv_pv').val() + '_LOG',
                PUV: '-' + $('#select_device').val() + '-',
                CodeVersion: '-' + $('#select_code_version').val() + '-'
            };
            console.log(allKeys);
            $$data_M.set('allKeys', allKeys);


        });

        // 日历组件
        $(".form_datetime").datetimepicker({
            weekStart: 1,
            todayBtn:  1,
            startView: 2,
            minView: 2,
            format: 'yyyy-mm-dd',
            autoclose: 1,
            todayHighlight: 'true',
            language: 'zh-CN'
        });

        $('.form_datetime').datetimepicker('update', new Date(new Date().valueOf() - 86400000));



        //
        $$event.on('EVT-CURRENT-CHANGED', function (data) {
            var isvType = require('widget/pies/isvType.js');
            isvType(data);

            var system = require('widget/pies/system.js');
            system(data);

            var browser = require('widget/pies/browserPercent.js');
            browser(data);

            var systemIos = require('widget/pies/iosPercent.js');
            systemIos(data);

            var systemAndriod = require('widget/pies/androidPercent.js');
            systemAndriod(data);

            var androidBrowser = require('widget/pies/androidBrowser.js');
            androidBrowser(data);

            var iosBrowser = require('widget/pies/iosBrowser.js');
            iosBrowser(data);

            var diyKeys = require('widget/bars/allDiyKeys.js');
            diyKeys(data);

        });

    });
});