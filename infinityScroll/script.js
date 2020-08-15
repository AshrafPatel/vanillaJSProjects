// DOM Elements
const loader = document.querySelector("#loader");
const imageContainer = document.querySelector("#image-container");

// Gobal Variables to store Data
let photosArray = [];
let areImagesLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;


// Set Attribute Helper
function setAttributesHelper(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// PhotosToLoad
function photosToLoad() {
    const apiKey = "JC8ZqXvCXzOuoA-P3dPW4nNUZVsuV3c8h8wzT-OuXUY";
    const count = initialLoad ? 5 : 30;
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    return apiUrl
}

// Display Photos
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    initialLoad = false;
    photosArray.forEach((photo) => {
        const aElement = document.createElement("a");
        setAttributesHelper(aElement, {
            "href": photo.links.html,
            "target": "_blank"
        });

        const imgElement = document.createElement("img");
        setAttributesHelper(imgElement, {
            "src": photo.urls.regular,
            "alt": photo.alt_description,
            "title": photo.alt_description
        });

        imgElement.addEventListener("load", checkImagesLoaded);

        aElement.appendChild(imgElement);
        imageContainer.appendChild(aElement);
    })
}

// GetPhotosArray Method Calls Display Photos On End
async function getPhotos() {
    try {
        const response = await fetch(photosToLoad());
        const data = await response.json();
        photosArray = JSON.parse(JSON.stringify(data));
        displayPhotos();
    } catch(err) {
        console.log("Could not fetch images", err)
    }
}

// Check Scroll Position
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && areImagesLoaded) {
        areImagesLoaded = false;
        getPhotos();
    }
})

// Check Images are loaded
function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        areImagesLoaded = true;
        loader.hidden = true;
    }
}

getPhotos();