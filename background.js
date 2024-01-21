// background.js
var tabIdToDebug; // define tabIdToDebug in the outer scope
var requestIdToResponse = {};

chrome.tabs.query({url: "https://media.ucsc.edu/*"}, function(tabs) {
  if (tabs.length > 0) {
    tabIdToDebug = tabs[0].id; // assign the tab ID of the first tab that matches the URL

    chrome.debugger.attach({tabId: tabIdToDebug}, '1.0', function() {
      chrome.debugger.sendCommand({tabId: tabIdToDebug}, 'Network.enable', {}, function() {
        chrome.debugger.onEvent.addListener(allEventHandler);
      });
    });
  }
});

function allEventHandler(debuggeeId, message, params) {
  if (tabIdToDebug != debuggeeId.tabId) {
    return;
  }

  if (message == 'Network.responseReceived') {
    if (params.response.url.includes('VideoJSON')) {
      requestIdToResponse[params.requestId] = params.response;
    }
  } else if (message == 'Network.loadingFinished') {
    if (params.requestId in requestIdToResponse) {
      chrome.debugger.sendCommand({tabId: tabIdToDebug}, 'Network.getResponseBody', {requestId: params.requestId}, function(response) {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        } else {
          console.log('Response body: ', response.body);
          console.log('Type of response body: ', typeof response.body);
  
            // Parse the JSON string to a JavaScript object
            var json = JSON.parse(response.body);
  
            // Access the elements at [video][transcriptTimestamped]
            var transcriptTimestamped = json.video.transcriptText.transcript;
            console.log('Type of response body: ', typeof transcriptTimestamped);
            console.log('Transcript Timestamped: ', transcriptTimestamped.slice(0,1000));
        }
      });
    }
  }
}
