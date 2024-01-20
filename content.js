chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content script received message:', request);
    if (request.action === 'extractH1') {
      var h1Content = document.querySelector('h1').textContent;
      chrome.runtime.sendMessage({ action: 'showAlert', h1Content: h1Content });
    }
});