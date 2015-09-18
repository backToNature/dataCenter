var S = KISSY;
chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    S.config({
        base:"https://s.tbcdn.cn/g/kissy/k/1.4.1/"
    });

    chrome.runtime.sendMessage({route: "/popup/init",data: {tabId:tab.id } }, function(res) {
        S.config(res.config);
        S.use(res.call, function(S, Module){
            Module.init(res.data);
        });
    });
});