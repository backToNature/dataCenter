define(function(require, exports, module) {
    
    var $$data_M = require('model/data.js');
    var $$event = Backbone.Events;

    $(function () {
        $('#search').on('click', function (e) {
            e.preventDefault();
            var date = $('#myDate').val(),
                hour = $('#myHours').val(),
                appid = $('#myAppid').val();
            $$data_M.getData(date, hour, appid);
        });

        $('#rangeSearch').on('click', function (e) {
            e.preventDefault();
            var startDate = $('#startDate').val(),
                endDate = $('#endDate').val(),
                appid = $('#rangeAppid').val();
            $$data_M.getRangeData(startDate, endDate, appid);
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

            var header = require('widget/header/header.js');
            header(data);

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