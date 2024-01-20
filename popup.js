document.getElementById('pasteButton').addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
        let textArea = document.getElementById('textArea');
        textArea.value = text;
        let event = new Event('input', {
        bubbles: true,
        cancelable: true,
        });
        textArea.dispatchEvent(event);
    });
});

document.getElementById('processButton').addEventListener('click', function() {
    let pastedText = document.getElementById('textArea').value;
    alert('Pasted text: ' + pastedText);
    processText(pastedText);
});

function processText(text) {

}