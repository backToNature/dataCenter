$(function () {

//    $('#toBackGround').on('click', function (e) {
//        e.preventDefault();
//
//        var createProperties  = {
//            index: 0,
//            url: '../background.html'
//        };
//        chrome.tabs.create(createProperties, function (tab) {
//
//        })
//    });


    chrome.browserAction.onClicked.addListener(function(tab) {
        alert(1);
    });
});