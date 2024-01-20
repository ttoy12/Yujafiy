document.addEventListener('DOMContentLoaded', function() {
    // Your code to interact with the DOM goes here
    // Example: Get the title element with ID 'titleText'
    var titleElement = document.getElementById('titleText');
    if (titleElement) {
      titleElement.textContent = 'Hello, Extension!';
    }
  });