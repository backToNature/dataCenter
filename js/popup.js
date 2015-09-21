$(function () {
    $('#toBackGround').on('click', function (e) {
        e.preventDefault();
        var createProperties  = {
            index: 0,
            url: '../background.html'
        };
        chrome.tabs.create(createProperties, function (tab) {
            alert(tab.id);
        })
    });
});