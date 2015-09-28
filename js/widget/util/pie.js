
define(function (require, exports, module){

    module.exports = function (obj) {
        var $wrarpper = $(obj.el).find('.singleChart_main');
        $wrarpper.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: obj.title
            },
            tooltip: {
                pointFormat: obj.pointFormat
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
                name: obj.name,
                data: obj.data,
                events: {
                    click: function (e) {
                        var point  = e.point.name;
                        var name = point.name;
                        if (_.isFunction(obj.click)) {
                            obj.click(point);
                        }
                    }
                }
            }]
        });
    };

});
