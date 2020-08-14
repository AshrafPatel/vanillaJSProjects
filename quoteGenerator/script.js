const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

//  Get Quote from API Function
async function getQuote() {
    const api = `http://api.forismatic.com/api/1.0/?
                    method=getQuote&
                    lang=en&
                    format=json`;
    try {
        loading();
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"
        const response = await fetch(proxyUrl + api);
        const data = await response.json();
        authorText.innerText = data.quoteAuthor=="" ?  "Unknown" : data.quoteAuthor;
        data.quoteText.length > 120 ? quoteText.classList.add("long-text") : quoteText.classList.remove("long-text");
        quoteText.innerText = data.quoteText;
        console.log(data);
        complete();
    } catch(err) {
        console.log("Sorry there was an issue trying to get quote", err);
        getQuote();
    }
}

// Tweet Quote Function
function tweetQuote() {
    const author = authorText.innerText;
    const quote = quoteText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show Complete
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
quoteBtn.addEventListener("click", getQuote)

getQuote();