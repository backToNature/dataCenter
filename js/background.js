// 数据请求模块
var M_ajax = (function () {
    var getData = function (url, fn) {
        $.ajax({
            url: url,
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

// 数据处理模块
var M_dataDeal = (function () {
    var pickData = function (data, str) {
        var temp = _.pick(data, function (val, key) {
            if (key.indexOf(str) >= 0) {
                return val;
            }
        });
        return temp;
    };

    return {
        // 挑选出所有PV数据
        pickPV: function (data) {
            return pickData(data, 'PV_');
        },
        // 挑选出所有UV数据
        pickUV: function (data) {
            return pickData(data, 'UV_');
        },
        // 挑选出所有WAP的数据
        pickWAP: function (data) {
            return pickData(data, '-WAP-');
        },
        // 挑选出所有PC的数据
        pickPC: function (data) {
            return _.omit(data, function (val, key) {
                if (key.indexOf('-WAP-') >= 0) {
                    return val;
                }
            });
        },
        // 挑出不同isvType的数据,返回分组数据
        pickIsvType: function (data, isvArr) {
            var obj = {};
            _.each(isvArr, function (val) {
                obj[val] = pickData(data, '-' + val + '-');
            });
            return obj;
        },
        // 挑出不同codeVersion的数据,返回分组数据
        pickCodeVersion: function (data, codeVersionArr) {
            var obj = {};
            _.each(codeVersionArr, function (val) {
                obj[val] = pickData(data, '-' + val + '-');
            });
            return obj;
        },
        // 自定义挑选逻辑
        specialPick: function (data, str, fn) {
            var temp = pickData(data, str);
            if (_.isFunction(fn)) {
                fn(temp);
            } else {
                return temp;
            }
        },
        count: function (data) {
            var temp = 0, arr = _.values(data);
            _.each(arr, function (val) {
                temp += val;
            });
            return temp;
        }
    };
}());

// 图表模块
var M_chart =function (obj) {
    if (obj.type == 'pie') {
        $(obj.el).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: obj.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: obj.seriesName,
                events: {
                    click: function(e) {
                        if (_.isFunction(obj.click)) {
                            obj.click(e.point);
                        }
                    }
                },
//                data: [
//                    ['Firefox',   45.0],
//                    ['IE',       26.8],
//                    {
//                        name: 'Chrome',
//                        y: 12.8,
//                        sliced: true,
//                        selected: true
//                    },
//                    ['Safari',    8.5],
//                    ['Opera',     6.2],
//                    ['Others',   0.7]
//                ]
                data: obj.data
            }]
        });
    }

};

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

// isvType
var isvTypeArr = ['STABLE', 'BETA'];

// systemType
var systemType = ['IOS', 'ANDROID', 'OTHERSYSTEM'];

$(function () {
    var callback = function (data) {
        var pvObj = M_dataDeal.pickPV(data);
        var uvObj = M_dataDeal.pickUV(data);
        var pvSystemObj = M_dataDeal.specialPick(pvObj, 'SYSTEMANDBROWSER');
        var uvSystemObj = M_dataDeal.specialPick(uvObj, 'SYSTEMANDBROWSER');

        var pvIsvTypeObj = M_dataDeal.pickIsvType(pvSystemObj, isvTypeArr);
        var uvIsvTypeObj = M_dataDeal.pickIsvType(uvSystemObj, isvTypeArr);


        var pv = 0, uv = 0;
        pv = M_dataDeal.count(pvSystemObj);
        uv = M_dataDeal.count(uvSystemObj);

        var chart_pv_isvType = [];
        _.each(isvTypeArr, function (val) {
            chart_pv_isvType.push([val, M_dataDeal.count(pvIsvTypeObj[val])]);
        });

        M_chart({
            type: 'pie',
            el: '#pv_isvType',
            title: 'V2总PV：' + pv,
            seriesName: 'PV值',
            data: chart_pv_isvType
        });

        var chart_uv_isvType = [];
        _.each(isvTypeArr, function (val) {
            chart_uv_isvType.push([val, M_dataDeal.count(uvIsvTypeObj[val])]);
        });

        M_chart({
            type: 'pie',
            el: '#uv_isvType',
            title: 'V2总UV：' + uv,
            seriesName: 'UV值',
            data: chart_uv_isvType
        });

        var pvIosObj = M_dataDeal.specialPick(pvSystemObj, 'SYSTEMANDBROWSER-IOS');
        var uvIosObj = M_dataDeal.specialPick(uvSystemObj, 'SYSTEMANDBROWSER-IOS');
        var pvAndroidObj = M_dataDeal.specialPick(pvSystemObj, 'SYSTEMANDBROWSER-ANDROID');
        var uvAndroidObj = M_dataDeal.specialPick(uvSystemObj, 'SYSTEMANDBROWSER-ANDROID');
        var pvOtherSystemObj = M_dataDeal.specialPick(pvSystemObj, 'SYSTEMANDBROWSER-OTHERSYSTEM');
        var uvOtherSystemObj = M_dataDeal.specialPick(uvSystemObj, 'SYSTEMANDBROWSER-OTHERSYSTEM');
        var pvAllSystem = {
            IOS: pvIosObj,
            ANDROID: pvAndroidObj,
            OTHERSYSTEM: pvOtherSystemObj
        };

        var chart_pv_systemType = [];

        _.each(systemType, function (val) {
            chart_pv_systemType.push([val, M_dataDeal.count(pvAllSystem[val])]);
        });

        M_chart({
            type: 'pie',
            el: '#pv_system',
            title: 'V2总体系统PV占比',
            seriesName: 'UV值',
            data: chart_pv_systemType
        });

        var uvAllSystem = {
            IOS: uvIosObj,
            ANDROID: uvAndroidObj,
            OTHERSYSTEM: uvOtherSystemObj
        };

        var chart_uv_systemType = [];

        _.each(systemType, function (val) {
            chart_uv_systemType.push([val, M_dataDeal.count(uvAllSystem[val])]);
        });

        M_chart({
            type: 'pie',
            el: '#uv_system',
            title: 'V2总体系统UV占比',
            seriesName: 'UV值',
            data: chart_uv_systemType
        });



    };


    $('#search').on('click', function (e) {
        var date = $('#myDate').val(),
            hour = $('#myHours').val(),
            appid = $('#myAppid').val(),
            key = $('#myKey').val();
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