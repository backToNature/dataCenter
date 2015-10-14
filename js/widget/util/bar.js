
define(function (require, exports, module){
    module.exports = function (obj) {
        var $wrarpper = $(obj.el).find('.singleChart_main');
        console.log(obj.data);
        $wrarpper.highcharts({
            chart: {
                type: 'column',
                margin: [ 50, 50, 100, 80]
            },
            title: {
                text: obj.title
            },
            scrollbar: {
                enabled: true
            },
            xAxis: {
                categories: obj.categories,
                labels: {
                    rotation: 0,
                    align: 'center',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                min: 1,
                max: 6
            },
            yAxis: {
                min: 0,
                title: {
                    text: obj.leftTitle
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: obj.pointFormat
            },
            series: [{
                name: 'Population',
                data: obj.data,
                dataLabels: {
                    enabled: true,
                    rotation: 0,
                    color: '#000',
                    align: 'center',
                    x: 4,
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 3px black'
                    }
                }
            }]
        });
    };

});
