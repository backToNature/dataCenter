
define(function (require, exports, module){
    var $$data =require('widget/pickData/wap.js');
    module.exports = (function () {

        var global_obj;

        var render = function (defaultParams) {
            var pileData = $$data.branchPile(global_obj.allData, global_obj.renderArr);
            console.log(pileData);
            _.mapObject(pileData, function (val, key) {
                _.each(defaultParams, function (v) {
                    pileData[key] = $$data['pick' + v](pileData[key]);
                });
            });

            var pieData = [];
            _.mapObject(pileData, function (val, key) {
                pieData.push([key, $$data.count(val)]);
            });



            var $wrapper = $(global_obj.el).find('.singleChart_main');
            $wrapper.highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
               title: {
                   text: global_obj.title
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
                    data: pieData,
                    events: {
                        click: function (e) {
                            var name  = e.point.name;
                            if (_.isObject(global_obj.funcObj) && _.isFunction(global_obj.funcObj[name])) {
                                var renderArr = global_obj.funcObj[name](pileData[name]);
                                var allData = pileData[name];
                                var defaultParams = ['PV', 'WAP'];
                                global_obj.allData = allData;
                                renderArr = _.map(renderArr, function (val, index) {
                                    return e.point.name + '-' + val;
                                });
                                global_obj.renderArr = renderArr;
                                render(defaultParams);
                            }

                        }
                    }
                }]
            });
        };

        var eventBind = function (obj) {
            global_obj = obj;
            var $wrapper = $(global_obj.el);
            var $select_uv_pv = $wrapper.find('.select_uv_pv');
            var $select_device = $wrapper.find('.select_device');
            var $select_code_version = $wrapper.find('.select_code_version');
            $select_uv_pv.on('change', function () {
                var defaultParams = [$select_uv_pv.val(), $select_device.val()];
                render(defaultParams);
            });

            $select_device.on('change', function () {
                var defaultParams = [$select_uv_pv.val(), $select_device.val()];
                render(defaultParams);
            });

            $select_code_version.on('change', function () {
                alert(1);
            });

        };
        return {
            init: function (obj) {
                global_obj = obj;
                /**
                 * @param obj {Object}  - 传入参数
                 * @param obj.el
                 * @param obj.allData
                 * @param obj.renderData
                 */
                var defaultParams = ['PV', 'WAP'];
                render(defaultParams);
                eventBind(global_obj);
            }
        };
    }());

});
