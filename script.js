// Fetch a random country's data
async function fetchRandomCountry() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(apiUrl);
        const countries = await response.json();
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        displayCountryCard(randomCountry);
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

function displayCountryCard(country) {
    const countryCardFront = document.querySelector('.country-card .card-front');
    const countryCardBack = document.querySelector('.country-card .card-back');
    countryCardFront.innerHTML = `<img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="max-width: 100%; height: auto;">`;
    countryCardBack.innerHTML = `<p>${country.name.common}</p><p>Capital: ${country.capital}</p>`;
}

async function fetchRandomDogBreed() {
    const apiUrl = 'https://api.thedogapi.com/v1/images/search';
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'x-api-key': 'live_lHARVD0mI4sbxw932JKutDatRYYNdsGy0eQooaeDXDG80l9BFtsSuh3n7ll6ZNjB'
            }
        });
        const data = await response.json();
        const dogBreed = data[0].breeds.length > 0 ? data[0].breeds[0] : { name: "Unknown" };
        const imageUrl = data[0].url;

        displayDogBreedCard(imageUrl, dogBreed.name);
    } catch (error) {
        console.error("Error fetching dog breed data:", error);
        // Handle the error, perhaps by showing a default image or message
    }
}


function displayDogBreedCard(imageUrl, breedName) {
    const dogBreedCardFront = document.querySelector('.dog-breed-card .card-front');
    const dogBreedCardBack = document.querySelector('.dog-breed-card .card-back');
    dogBreedCardFront.innerHTML = `<img src="${imageUrl}" alt="${breedName}" style="max-width: 100%; height: auto;">`;
    dogBreedCardBack.innerHTML = `<p>${breedName}</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchRandomCountry();
    fetchRandomDogBreed();
});
