define(function (require, exports, module){
    var Model = Backbone.Model.extend({
        defaults: {
            list: {},
            detail: {}
        },
        initialize: function () {
            var _this = this;
        }
    });

    module.exports = new Model();
});