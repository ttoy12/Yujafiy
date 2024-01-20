// Get the paste button
let pasteButton = document.getElementById('pasteButton');

// Add an event listener for the click event
pasteButton.addEventListener('click', function() {
    // Get the text area
    let textArea = document.getElementById('textArea');

    // Clear the text area
    textArea.value = '';

    // Use the Clipboard API to read the text from the clipboard
    navigator.clipboard.readText()
    .then(text => {
        // Set the value of the text area to the text from the clipboard
        textArea.value = text;
    })
    .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
});

// Get the process button
let processButton = document.getElementById('processButton');

// Add an event listener for the click event
processButton.addEventListener('click', function() {
    // Get the text from the text area
    let pastedText = document.getElementById('textArea').value;

    // Alert the pasted text
    alert('Pasted text: ' + pastedText);

    // Process the pasted text
    processText(pastedText);
});

// Function to process the text
function processText(text) {
    // Add your text processing code here
}
