async function detachActiveTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const activeTab = tabs[0];
  if (!activeTab || activeTab.id == null) {
    return;
  }

  // 現在のウィンドウ位置とサイズを取得
  const currentWindow = await chrome.windows.get(activeTab.windowId);

  await chrome.windows.create({
    tabId: activeTab.id,
    focused: true,
    left: currentWindow.left,
    top: currentWindow.top,
    width: currentWindow.width,
    height: currentWindow.height,
  });
}

chrome.action.onClicked.addListener(() => {
  detachActiveTab().catch((error) => {
    console.error("Failed to detach active tab:", error);
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "detach-active-tab") {
    detachActiveTab().catch((error) => {
      console.error("Failed to detach active tab:", error);
    });
  }
});