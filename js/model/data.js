define(function (require, exports, module){
    var $$event = Backbone.Events;
    var $$pickData = require('widget/util/pickData.js');
    var Model = Backbone.Model.extend({
        defaults: {
            // 所有数据
            allData: {},
            // 所有全局过滤项
            allKeys: {
                clientType: '-WAP-',
                PUV: 'PV_LOG',
                CodeVersion: '-ALL-'
            },
            // 当前页面数据
            currentData: {}
        },
        initialize: function () {
            var _this = this;
            var pickData = function (data, str) {
                var temp = _.pick(data, function (val, key) {
                    if (key.indexOf(str) >= 0) {
                        return val;
                    }
                });
                return temp;
            };

            _this.on('change:allData', function () {
                var currentData = _this.get('allData');
                var allKeys = _this.get('allKeys');

                _.mapObject(allKeys, function (val, key) {
                    if (val != '-ALL-') {
                        currentData = pickData(currentData, val);
                    } else {

                    }
                });

                _this.set('currentData', currentData);

                $$event.trigger('EVT-CURRENT-CHANGED', currentData);

            });

            _this.on('change:allKeys', function () {
                var currentData = _this.get('allData');
                var allKeys = _this.get('allKeys');
                _.mapObject(allKeys, function (val, key) {
                    if (val != '-ALL-') {
                        currentData = pickData(currentData, val);
                    } else {

                    }
                });

                _this.set('currentData', currentData);
                $$event.trigger('EVT-CURRENT-CHANGED', currentData);
            });

        },
        getData: function (date, hour, appid) {
            var _this = this;
            var url = 'http://10.10.80.157:9081/data/';
            date = date.replace(/\-/g, '');

            if (hour == 'allDay') {
                if (appid != '') {
                    url = url + 'day/' + appid + '/' + date;
                } else {
                    url = url + 'day/total/' + date;
                }
            } else {
                date = date.substring(2, date.length) + '_' + hour;
                if (appid != '') {
                    url = url + 'hour/' + appid + '/' + date;
                } else {
                    url = url + 'hour/total/' + date;
                }
            }
            $.ajax({
                url: url,
//               url: '../test.json',
                dataType: 'json',
                scriptCharset: 'utf-8',
                cache: false,
                success: function (data) {
                    var map = data.data[0];
                    _this.set('allData', map);
                }
            });

        },
        getRangeData: function (startDate, endDate, appid) {
            var _this = this;
            var url = 'http://10.10.80.157:9081/data/day';

            startDate = startDate.replace(/\-/g, '');
            endDate = endDate.replace(/\-/g, '');

            if (appid == '') {
                url += '/total/' + startDate + '/' + endDate;
            } else {
                url += '/' + appid + '/' + startDate + '/' + endDate;
            }

            $.ajax({
                url: url,
//               url: '../test.json',
                dataType: 'json',
                scriptCharset: 'utf-8',
                cache: false,
                success: function (data) {
                    var map = data.data;
                    _this.set('allData', map);
                }
            });

        }

    });

    module.exports = new Model();
});