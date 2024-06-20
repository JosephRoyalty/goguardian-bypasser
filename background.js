chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.tabs.query({}, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          const tabUrl = tabs[i].url;
          if (tabUrl && (tabUrl.includes('goguardian.com') || tabUrl.includes('blocked.goguardian.com'))) {
            chrome.history.search({text: '', maxResults: 2}, (historyItems) => {
              for (let item of historyItems) {
                if (!item.url.includes('goguardian.com') && !item.url.includes('blocked.goguardian.com')) {
                  chrome.tabs.update(tabs[i].id, {url: item.url});
                  break;
                }
              }
            });
            break;
          }
        }
      });
    }
  });
  