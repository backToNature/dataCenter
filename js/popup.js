$(function () {

    $('#toBackGround').on('click', function (e) {
        e.preventDefault();

        var createProperties = {
            index: 0,
            url: '../background.html'
        };
        chrome.tabs.create(createProperties, function (tab) {

        })
    });

    $('#mailto').on('click', function (e) {
        e.preventDefault();
        location.href = 'mailto:iweb@sohu-rd.com';
    });


    var active = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {cyDataStatus: "cyDataActive"}, function (response) {
                console.log(response);
            });
        });
    };
    var close = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {cyDataStatus: "cyDataClose"}, function (response) {
                console.log(response);
            });
        });
    };
    $('#monitor').on('click', function (e) {
        e.preventDefault();
        var status = window.localStorage.getItem('iconStatus');

        console.log(status);
        if (!status || status == 0) {
            // 激活标签的逻辑
            chrome.browserAction.setIcon({path: './images/icon.png'});
            window.localStorage.setItem('iconStatus', 1);
            active();
        } else {
            // 关闭标签的逻辑
            chrome.browserAction.setIcon({path: './images/icon-black.png'});
            window.localStorage.setItem('iconStatus', 0);
            close();
        }

//        var active = function (tab) {
//            chrome.tabs.sendMessage(tab.id,{
//                extensionPath: path,
//                cyDataStatus: "cyDataActive"
//            }, function(response) {
//                alert(response.farewell);
//            });
//        };
//
//        // 关闭标签的逻辑
//        var close = function (tab) {
//            chrome.tabs.sendMessage(tab.id,{
//                cyDataStatus: "cyDataClose"
//            }, function(response) {
//                alert(response.farewell);
//            });
//        };

    });

});