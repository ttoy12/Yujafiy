// play audio function
async function playAudioFiles(url_list) {
    console.log("audio playing", url_list);
    let audio = new Audio(url_list);
    audio.play()
    // for (let url of url_list) {
    //     let audio = new Audio(url);
    //     await new Promise(r => audio.onended = r);
    //     audio.play();
    // }
}

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
processButton.addEventListener('click', async function() {
    // Get the text from the text area
    let pastedText = document.getElementById('textArea').value;
    console.log('Pasted text: ' + pastedText);
    
    // get list of url .wav files
    // url_list = await processText(pastedText);
    url_list = 'https://files.topmediai.com/text_to_speech/audio/db983b1e-b7e4-11ee-b27f-00163e04354c.wav';
    
    // play audio files
    await playAudioFiles(url_list);
});

// Function to process the text

async function processText(text) {
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

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for close button
    var closeButton = document.getElementById("closeButton");
    closeButton.addEventListener('click', function () {
        // Close the popup by getting the current window and closing it
        var views = chrome.extension.getViews({ type: "popup" });
        if (views.length > 0) {
            views[0].close();
        }
    });
});