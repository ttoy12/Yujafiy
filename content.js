var h1Elements = document.querySelectorAll('h1');
var h1TextArray = [];

h1Elements.forEach(function(h1Element) {
  h1TextArray.push(h1Element.textContent);
});

// Send a message to the background script with an array of <h1> texts
chrome.runtime.sendMessage({ type: 'h1TextArray', texts: h1TextArray });