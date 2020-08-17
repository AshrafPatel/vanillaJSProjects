// DOM Elements
const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

// Get Joke
async function getJoke() {
    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming,Pun?blacklistFlags=nsfw,religious,racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const sentence = data.joke!==undefined ? data.joke : data.setup + "..." + data.delivery;
        return sentence
    } catch(err) {
        console.log("Could not fetch jokes", err)
    }
}

// Say Speech
function saySpeech(word) {
    const apiKey = '90a8b6767bc54afd82a58c454aa68b97';
    VoiceRSS.speech({
        key: apiKey,
        src: word,
        hl: 'en-us',
        v: 'Linda',
        r: 1, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Event Listeners For Button and Audio Ending
audioElement.addEventListener("ended", () => {button.disabled = false}, false);
button.addEventListener("click", async () => {
    button.disabled = true;
    const joke = await getJoke()
    await saySpeech(joke)
});