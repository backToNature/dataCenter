define(function (require, exports, module){
    var Model = Backbone.Model.extend({
        defaults: {
            // 所有数据
            allData: {},
            // 所有wap的数据集合
            allWapObj: {},
            // 所有系统(包括版本号)的集合
            allSystemObj: {
                'PV_LOG-WAP-BETA-V2-SYSTEMANDBROWSER-ANDROID-4_36-qq': '...'
            },
            // 所有自定义参数的集合
            diyParamsObj: {},
            // 所有类型站的集合(BETA,STABLE)
            isvTypeObj: {
                BETA: {},
                STABLE: {}
            },
            // 所有代码版本的集合
            codeVersionObj: {
                V0: {},
                V1: {},
                V2: {}
            },
            // 大体系统份额(不包括版本号)
            systemObj: {
                ANDORID: {},
                IOS: {},
                OTHERSYSTEM: {}
            }
        },
        initialize: function () {
            var _this = this;
            // 网站类型
            var isvTypeArr = ['STABLE', 'BETA'];
            // 系统类型
            var systemTypeArr = ['IOS', 'ANDROID', 'OTHERSYSTEM'];
            // 代码版本
            var codeVersionArr = ['V2'];

            var $$dataUtil = require('widget/pickData/wap.js');

            _this.on('change:allData', function () {
                var allData = _this.get('allData');
                var allWapObj = $$dataUtil.pickWAP(allData);
                _this.set('allWapObj', allWapObj);
                var allSystemObj = $$dataUtil.specialPick(allWapObj, '-SYSTEMANDBROWSER-');
                _this.set('allSystemObj', allSystemObj);

                var isvTypeObj = {};
                _.each(isvTypeArr, function (val) {
                    isvTypeObj[val] = $$dataUtil.specialPick(allWapObj, '-' + val + '-');
                });
                _this.set('isvTypeObj', isvTypeObj);

                var codeVersionObj = {};
                _.each(codeVersionArr, function (val) {
                    codeVersionObj[val] = $$dataUtil.specialPick(allWapObj, '-' + val + '-');
                });
                _this.set('codeVersionObj', codeVersionObj);

                var systemObj = {};
                _.each(systemTypeArr, function (val) {
                    systemObj[val] = $$dataUtil.specialPick(allSystemObj, '-' + val);
                });
                _this.set('systemObj', systemObj);



            });
        }
    });

    module.exports = new Model();
});