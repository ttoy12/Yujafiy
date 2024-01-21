// Get the process button
const processButton = document.getElementById('processButton');
let transcript = null;
let videoID = null; 

// Function to update button state based on videoPID
function updateButtonState() {
    const processButton = document.getElementById('processButton');
    if (videoID === null || transcript === null) {
      // If either videoPID or transcriptTimestamped is null, disable the button and change color to grey
      processButton.disabled = true;
      processButton.style.backgroundColor = '#808080'; // Grey color
    } else {
      // If both videoPID and transcriptTimestamped are not null, enable the button and change color to green
      processButton.disabled = false;
      processButton.style.backgroundColor = '#4CAF50'; // Green color
    }
  }
  
  
  // Function to handle button click
  function handleButtonClick() {
    // Set variables to undefined
    videoID = null;
    transcriptTimestamped = null;
  
    // Update button state
    updateButtonState();
  
    // Add any additional logic you need after the button is pressed
    console.log('Button pressed!');
  }
  
  // Call the function initially to set the initial state
  updateButtonState();

// Add an event listener for the click event
processButton.addEventListener('click', async function() {
    console.log("process button pressed");
    // Get voice from dropdown
    let voice = document.getElementById('voicesList').value;
    console.log('Voice chosen: ' + voice);

      // Get the text from the text area
    // let pastedText = document.getElementById('textArea').value;
    // console.log('Pasted text: ' + pastedText);
    
    // Get list of URL .wav files asynchronously
    let urlList = [];
    let data = null;
    const response = await retreiveAudio(videoID, voice);
    if (response.ok)
    {
        data = response.json();
    }else
    {
        data = await processText(videoID, transcript, voice);
    }
    if(data){
        if ('data' in data){
            urlList = data['data'];
        }
        console.log(urlList);
        // Play audio files asynchronously
        await playAudioFiles(urlList);
    }
  });

// Function to process the text

async function processText(videoID, text, voiceID) {
    const url = 'http://localhost:5000/api/process';
    const param = {
        video_id: videoID,
        sentences: [text],
        voice: voiceID
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

}

async function retreiveAudio(videoID, voiceID){
    const url = `http://localhost:5000/api/retrieve?video_id=${videoID}&voice=${voiceID}`;
    const res =  await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log(res);
    return res;
}

/*
async function processJson(videoID, json, voiceID) {
    const url = 'http://localhost:5000/api/processjson';
    const param = {
        id: videoID,
        entries: json,
        voice: voiceID
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

}
*/

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

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Check if the message contains the expected data
    if (message && message.data) {
      // Access the data from the message
      // var receivedData = message.data;
      videoID = message.data.video_pid;
      transcript = message.data.transcriptTimestamped;

      console.log("Received VIDEO ID: ", videoID);
      console.log("Received Transcript Timestamped: ", transcript)
      updateButtonState();
      // Do something with the data in your popup script
    //   console.log("POPUP.js, received the data!", receivedData);
    }
  });