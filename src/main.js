
// support Firefox and Chrome
if (!browser) {
    var browser = chrome;
}

browser.contextMenus.create({
    id: "close-other-tabs",
    title: "Close other tabs",
    onclick: handleContextMenuRequest
});

chrome.browserAction.onClicked.addListener(handleBrowserActionRequest);

function handleContextMenuRequest(info, tab) {
    console.log("Handling context-menu request...", [info, tab]);
    closeOtherTabs(tab);
}

function handleBrowserActionRequest(tab) {
    console.log("Handling browser-action request...", tab);
    closeOtherTabs(tab);
}

function closeOtherTabs(currentTab)  {
    console.log("Closing other tabs...", currentTab);

    // Close all other tabs except the current one
    browser.tabs.query({ windowId: currentTab.windowId }, (tabs) => {

        const tabsToClose = tabs.filter(tab => tab.id !== currentTab.id);
        const tabIdsToClose = tabsToClose.map(tab => tab.id);

        console.log("Closing tabs...", tabIdsToClose)
        browser.tabs.remove(tabIdsToClose, () => console.log("Tabs closed.", tabIdsToClose))
    });
}