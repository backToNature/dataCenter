$(function () {
    $('#toBackGround').on('click', function (e) {
        e.preventDefault();

        var createProperties  = {
            index: 0,
            url: '../background.html'
        };
        chrome.tabs.create(createProperties, function (tab) {

        })
    });
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];

        chrome.runtime.sendMessage({route: "/js/popup",data: {tabId:tab.id } }, function(res) {

        });
    });
});