
define(function(require, exports, module) {
    var $$bar = require('widget/util/bar.js');
    var $$data = require('widget/util/pickData.js');
    var $$data_M = require('model/data.js');

    module.exports = function (data) {


        $('#select_uv_pv,#select_device,#select_code_version').on('change', function () {
            var allKeys = {
                clientType: '-' + $('#select_device').val() + '-',
                PUV: $('#select_uv_pv').val() + '_LOG',
                CodeVersion: '-' + $('#select_code_version').val() + '-'
            };

            $$data_M.set('allKeys', allKeys);
        });

        var count = $$data.count($$data.pickData(data, '-SYSTEMANDBROWSER-'));

        $('#total').html('<strong>量：</strong>' + count);


    };

});