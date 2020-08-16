// DOM Elements
const button = document.querySelector("#button");
const videoElement = document.querySelector("#video");

// Function to select Media
async function selectMedia() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
    } catch(err) {
        console.log("Could not execute function", err)
    }
}

selectMedia();

videoElement.addEventListener("loadedmetadata", () => {
    videoElement.play()
})

button.addEventListener("click", async () => {
    button.disabled = true;
    await video.requestPictureInPicture()
    button.disabled = false;
});