define(function(require, exports, module) {
    var status = 'close';
    var path = location.href.replace('background.html', '');

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
    var close = function () {
        chrome.tabs.sendMessage(tab.id,{
            cyDataStatus: "cyDataClose"
        }, function(response) {
            alert(response.farewell);
        });
    };


    var eventBind = function () {
        chrome.browserAction.onClicked.addListener(function(tab) {
            var path;
            if (status === 'active') {
                path = './images/icon-black.png';
                chrome.browserAction.setIcon({path: path});
                status = 'close';
                close(tab);
            } else if (status === 'close') {
                path = './images/icon.png';
                chrome.browserAction.setIcon({path: path});
                status = 'active';
                active(tab);
            }
        });

        chrome.tabs.onUpdated.addListener(function(id, info, tab) {
            if(info.status === 'complete' && status === 'active') {
                chrome.tabs.sendMessage(tab.id,{
                    extensionPath: path,
                    cyDataStatus: "cyDataActive"
                }, function(response) {
                    alert(response.farewell);
                });
            }
        });

    };

    var init = function () {
        eventBind();
    };


    module.exports = init;
});