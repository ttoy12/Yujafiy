// background.js

// Your background script logic goes here
// Example: Listen for extension installation and handle messages from content.js

// Event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function(details) {
    console.log('Extension installed or updated:', details.reason);
  });
  
  // Event listener for messages from content.js
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Message received in background.js:', message);
  
    // You can perform further actions based on the message content
    // For example, send a notification or store the data
  });