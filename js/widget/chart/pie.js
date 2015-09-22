
define(function (require, exports, module){

    module.exports = (function () {
        var render = function (obj) {
            var $wrapper = $(obj.el).find('#singleChart_main');
            $wrapper.highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
//                title: {
//                    text: obj.title
//                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    name: 'Browser share',
                    data: obj.renderData
                }]
            });
        };

        var eventBind = function (obj) {
            var $wrapper = $(obj.el);
            var $select_uv_pv = $wrapper.find('.select_uv_pv');
            var $select_device = $wrapper.find('.select_device');
            var $select_code_version = $wrapper.find('.select_code_version');
            $select_uv_pv.on('change', function () {
                alert(1);
            });

            $select_device.on('change', function () {
                alert(1);
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
                render(obj);
                eventBind(obj);
            }
        };
    }());

});
