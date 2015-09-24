define(function (require, exports, module){
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
            systemPercents: {}

        },
        initialize: function () {
            var _this = this;
            console.log(_this.attributes);
        }
    });

    module.exports = new Model();
});