chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content.js: Content script received message:', request);
  
    if (request.action === 'extractH1') {
      var h1Element = document.querySelector('h1');
  
      if (h1Element) {
        var h1Content = h1Element.textContent;
        chrome.runtime.sendMessage({ action: 'showAlert', h1Content: h1Content });
      } else {
        chrome.runtime.sendMessage({ action: 'showAlert', h1Content: 'No <h1> element found' });
      }
    }
  });