// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.create({url: "https://lpdevs.herokuapp.com/dictionary"});
});
