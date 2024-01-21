// Get the process button
const processButton = document.getElementById('processButton');

// Add an event listener for the click event
processButton.addEventListener('click', async function() {
    
    // Get voice from dropdown
    let voice = document.getElementById('voicesList').value;
    console.log('Voice chosen: ' + voice);

      // Get the text from the text area
    let pastedText = document.getElementById('textArea').value;
    console.log('Pasted text: ' + pastedText);
    
    // Get list of URL .wav files asynchronously
    let urlList = [];
    const data = await processText(pastedText, voice);
    if ('data' in data){
        urlList = data['data'];
    }
    console.log(urlList);
    // Play audio files asynchronously
    await playAudioFiles(urlList);
  });

// Function to process the text

async function processText(videoID, text, voiceID) {
    const url = 'http://localhost:5000/api/process';
    const param = {
        id: videoID,
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
    return res.json();
}

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
      var videoPID = message.data.video_pid;
      var transcriptTimestamped = message.data.transcriptTimestamped;

      console.log("Received VIDEO ID: ", videoPID);
      console.log("Received Transcript Timestamped: ", transcriptTimestamped)
      // Do something with the data in your popup script
    //   console.log("POPUP.js, received the data!", receivedData);
    }
  });