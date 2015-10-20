$(function () {
    var status = 'close';
    $('#toBackGround').on('click', function (e) {
        e.preventDefault();

        var createProperties  = {
            index: 0,
            url: '../background.html'
        };
        chrome.tabs.create(createProperties, function (tab) {

        })
    });

    $('#monitor').on('click', function (e) {
        e.preventDefault();
        // 激活标签的逻辑
        var active = function (tab) {
            chrome.tabs.sendMessage(tab.id,{
                extensionPath: path,
                cyDataStatus: "cyDataActive"
            }, function(response) {
                alert(response.farewell);
            });
        };

        // 关闭标签的逻辑
        var close = function (tab) {
            chrome.tabs.sendMessage(tab.id,{
                cyDataStatus: "cyDataClose"
            }, function(response) {
                alert(response.farewell);
            });
        };


    });

});