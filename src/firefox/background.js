(function () {
    'use strict';

    function closeTabsByKeyword(keyword) {
        if (!keyword) {
            chrome.tabs.query({}, function (tabs) {
                tabs.filter(t => t.url === 'about:newtab').forEach(t => chrome.tabs.remove(t));
            });
        } else {
            chrome.tabs.query({}, function (tabs) {
                tabs.filter(t => t.url.contains(keyword) || tab.title.contains(keyword)).forEach(t => chrome.tabs.remove(t));
            });
        }

        chrome.tabs.query({}, function (tabs) {
            for (const tab of tabs) {
                console.log(tab);
                if (tab.url.match(keyword) || tab.title.match(keyword)) {
                    console.log(tab);
                    chrome.tabs.remove(tab.id);
                }
            }
        });
    }

    chrome.runtime.onMessage.addListener(function (response) {
        if (response.event !== 'text-entered') {
            return;
        }

        closeTabsByKeyword(response.text);
    });

    chrome.contextMenus.create({
        title: 'Close all tabs from this domain',
        onclick: function (event) {
            const keyword = new URL(event.pageUrl).hostname;
            closeTabsByKeyword(keyword);
        }
    });
})();
