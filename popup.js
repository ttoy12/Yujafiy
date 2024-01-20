// document.getElementById('extractButton').addEventListener('click', function() {
//   // alert("popup.js");
//   console.log("POPUP.js");
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     // alert("Button pressed");
//     console.log(tabs, tabs[0].id);
//     var p = chrome.tabs.sendMessage(tabs[0].id, { action: 'extractH1' });
//     p.catch(function(err) {
//       console.log("err", err);
//     });
//     // console.log("ret", ret);
//   });
// });

document.getElementById('extractButton').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractH1' }, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Message sent to content script');
      }
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  alert("POPUP.JS");
  console.log('Popup script received message:', request);
  if (request.action === 'showAlert') {
    alert(request.h1Content);
  }
});
