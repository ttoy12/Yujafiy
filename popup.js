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
    console.log('Pasted text!: ' + pastedText);
    processText(pastedText);
});

function processText(text) {
    const url = 'http://localhost:5000/api/process';
    const param = {
        id: 'test',
        sentences: [text],
        voice: 'default'
    };

    fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('failed');
                // You can handle the error here
                return Promise.reject(response);
            }
        })
        .then(data => {
            console.log(data['data']);
            return data['data'];
        })
        .catch(error => {
            console.error('Error:', error);
        });

}