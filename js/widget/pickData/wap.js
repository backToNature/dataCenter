

define(function (require, exports, module){
    // 数据处理模块
    module.exports = (function () {
        var pickData = function (data, str) {
            var temp = _.pick(data, function (val, key) {
                if (key.indexOf(str) >= 0) {
                    return val;
                }
            });
            return temp;
        };
        return {
            // 分堆
            branchPile: function (data, arr) {
                var temp = {};
                _.each(arr, function (val) {
                        temp[val] = pickData(data, val);
                });
                return temp;
            },
            // 挑选出所有PV数据
            pickPV: function (data) {
                return pickData(data, 'PV_');
            },
            // 挑选出所有UV数据
            pickUV: function (data) {
                return pickData(data, 'UV_');
            },
            // 挑选出所有WAP的数据
            pickWAP: function (data) {
                return pickData(data, '-WAP-');
            },
            // 挑选出所有PC的数据
            pickPC: function (data) {
                return _.omit(data, function (val, key) {
                    if (key.indexOf('-WAP-') >= 0) {
                        return val;
                    }
                });
            },
            // 挑出不同isvType的数据,返回分组数据
            pickIsvType: function (data, isvArr) {
                var obj = {};
                _.each(isvArr, function (val) {
                    obj[val] = pickData(data, '-' + val + '-');
                });
                return obj;
            },
            // 挑出不同codeVersion的数据,返回分组数据
            pickCodeVersion: function (data, codeVersionArr) {
                var obj = {};
                _.each(codeVersionArr, function (val) {
                    obj[val] = pickData(data, '-' + val + '-');
                });
                return obj;
            },
            // 挑出所有系统版本
            pickSystemVersion: function (data) {
                var versionArr = [];
                _.mapObject(data, function (val, key) {
                    var version = key.split('-');
                        version = version[version.length - 2];
                    if (!_.isUndefined(version)) {
                        var bigV = parseInt(version.split('_')[0]), smV = '_0';
                        if (bigV >= 10 || bigV <= 0) {
                            bigV = 1;
                        }
                        if (version.split('_').length > 1) {
                            smV = '_' + version.split('_')[1][0];
                        }
                        version = bigV + smV;
                        if (_.indexOf(versionArr, version) < 0 && !/[a-zA-Z]/.test(version)) {
                            versionArr.push(version);
                        }
                    }

                });
                return versionArr;
            },
            // 自定义挑选逻辑
            specialPick: function (data, str, fn) {
                var temp = pickData(data, str);
                if (_.isFunction(fn)) {
                    fn(temp);
                } else {
                    return temp;
                }
            },
            count: function (data) {
                var temp = 0, arr = _.values(data);
                _.each(arr, function (val) {
                    temp += val;
                });
                return temp;
            },
            toPieArr: function (data, arr) {
                var temp = {}, pro, self = this;
                _.each(arr, function (val) {
                    pro = self.specialPick(data, val);
                    temp[val] = self.count(pro);
                });
                return _.pairs(temp);
            }
        };
    }());


});