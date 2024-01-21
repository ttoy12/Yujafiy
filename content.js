// Function to play the video
function playVideo() {
    // Identify the video player element on the page
    const videoElement = document.querySelector('video');

    // Check if a video element is found
    if (videoElement) {
        // Play the video
        videoElement.play();
        console.log('Video playback started.');
    } else {
        console.log('Video element not found.');
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'playVideo') {
        // Call the playVideo function when a message is received
        playVideo();
    }
});
