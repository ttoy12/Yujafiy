

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
const processButton = document.getElementById('processButton');

// Add an event listener for the click event
processButton.addEventListener('click', async function() {
    
      // Get the text from the text area
    let pastedText = document.getElementById('textArea').value;
    console.log('Pasted text: ' + pastedText);
    
    // Get list of URL .wav files asynchronously
    let urlList = [];
    const data = await processText(pastedText);
    if ('data' in data){
        urlList = data['data'];
    }
    console.log(urlList);
    // Play audio files asynchronously
    await playAudioFiles(urlList);
  });

// Function to process the text

async function processText(text) {
    const url = 'http://localhost:5000/api/process';
    const param = {
        id: 'test',
        sentences: [text],
        voice: 'default'
    };

   // const res = await fetch();
   // return await res.json()
    const res =  await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    });
    console.log(res);
    return res.json();
    /*
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
    */
}
// play audio function
async function playAudioFiles(url_list) {
    console.log("audio playing", url_list);

  const playNextAudio = async (index) => {
    if (index < url_list.length) {
        console.log('playing clip', index);
      const audio = new Audio(url_list[index]);
      
      // Use the 'ended' event to play the next audio file in the list
      audio.addEventListener('ended', () => {
        playNextAudio(index + 1);
      });

      audio.play();
    }
  };
  // Start playing audio from the first URL in the list
  playNextAudio(0);
}