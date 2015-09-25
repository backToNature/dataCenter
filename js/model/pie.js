define(function (require, exports, module){
    var $$data = require('model/data.js');
    var Model = Backbone.Model.extend({
        defaults: {
            // 站点类型比
            isvPercents: {
                el: '#xxx',
                pointFormat: '{series.name}: <b>{point.y}</b>',
                name: '数量',
                click: function (point) {
                    alert(point);
                },
                data: [
                    ['STABLE', 1231546],
                    ['BETA', 14234]
                ]
            },
            // 系统占比
            systemPercents: {}

        },
        initialize: function () {
            var _this = this;

            _.mapObject(_this.attributes, function (val, key) {
                _this.on('change:' + key, function () {
                    console.log(213);
                });
            });

        }
    });

    module.exports = new Model();
});