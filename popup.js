document.addEventListener('DOMContentLoaded', function() {
  // Listen for messages from content.js
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'h1TextArray') {
      // Log the received <h1> texts to the console
      console.log('Received <h1> texts:', message.texts);
    }
  });
});