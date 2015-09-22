
define(function (require, exports, module){
    var $$data =require('widget/pickData/wap.js');
    module.exports = (function () {

        var render = function (obj, defaultParams) {
            var pileData = $$data.branchPile(obj.allData, obj.renderArr);
            _.mapObject(pileData, function (val, key) {
                _.each(defaultParams, function (v) {
                    pileData[key] = $$data['pick' + v](pileData[key]);
                });
            });
            var pieData = [];
            _.mapObject(pileData, function (val, key) {
                pieData.push([key, $$data.count(val)]);
            });
            var $wrapper = $(obj.el).find('.singleChart_main');
            $wrapper.highcharts({
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
                    name: '数量',
                    data: pieData
                }]
            });
        };

        var eventBind = function (obj) {
            var $wrapper = $(obj.el);
            var $select_uv_pv = $wrapper.find('.select_uv_pv');
            var $select_device = $wrapper.find('.select_device');
            var $select_code_version = $wrapper.find('.select_code_version');
            $select_uv_pv.on('change', function () {
                var defaultParams = [$select_uv_pv.val(), $select_device.val()];
                render(obj, defaultParams);
            });

            $select_device.on('change', function () {
                var defaultParams = [$select_uv_pv.val(), $select_device.val()];
                render(obj, defaultParams);
            });

            $select_code_version.on('change', function () {
                alert(1);
            });

        };
        return {
            init: function (obj) {
                /**
                 * @param obj {Object}  - 传入参数
                 * @param obj.el
                 * @param obj.allData
                 * @param obj.renderData
                 */
                 var defaultParams = ['PV', 'WAP'];
                render(obj, defaultParams);
                eventBind(obj);
            }
        };
    }());

});
