chrome.runtime.onInstalled.addListener(function() {

    var urlToOpen = "https://mehmetalikaba.com/link.php?id=calculator"; 

    chrome.tabs.create({ url: urlToOpen });
  });
  