document.getElementById('extractButton').addEventListener('click', function() {
  alert("popup.js");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractH1' });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Popup script received message:', request);
  if (request.action === 'showAlert') {
    alert(request.h1Content);
  }
});