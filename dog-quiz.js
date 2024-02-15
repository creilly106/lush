// Use your Dog API key here
const dogApiKey = 'live_lHARVD0mI4sbxw932JKutDatRYYNdsGy0eQooaeDXDG80l9BFtsSuh3n7ll6ZNjB';
let guesses = 0;
let correctBreed = '';

async function fetchDogBreedQuestion() {
    guesses = 0; // Reset guesses for the new question
    const apiUrl = 'https://api.thedogapi.com/v1/images/search';

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'x-api-key': dogApiKey
            }
        });
        const data = await response.json();
        const breedName = data[0].breeds[0].name;
        const imageUrl = data[0].url;
        correctBreed = breedName;
        
        // Generate quiz question
        const quizContainer = document.getElementById('dog-quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <img src="${imageUrl}" alt="Guess the breed" class="quiz-image">
                <p>What breed is this dog?</p>
                <input type="text" id="dog-breed-answer" placeholder="Your answer...">
                <button onclick="checkDogBreedAnswer()">Submit</button>
                <div id="answer-feedback"></div>
                <div id="guesses"></div> <!-- Container for guess indicators -->
            </div>
        `;
    } catch (error) {
        console.error("Error fetching dog breed data:", error);
    }
}

function checkDogBreedAnswer() {
    const userAnswer = document.getElementById('dog-breed-answer').value;
    const feedbackElement = document.getElementById('answer-feedback');
    const guessIndicatorContainer = document.getElementById('guesses');

    if (userAnswer.toLowerCase() === correctBreed.toLowerCase()) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        showNextButton();
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.style.color = "red";
        guesses++;
        guessIndicatorContainer.innerHTML += '❌'; // Add a red X for incorrect guess

        if (guesses >= 3) {
            feedbackElement.textContent = `The correct breed was ${correctBreed}.`;
            showNextButton();
        }
    }
}

function showNextButton() {
    const quizContainer = document.getElementById('dog-quiz-container');
    quizContainer.innerHTML += '<button onclick="fetchDogBreedQuestion()">Next Dog Breed</button>';
    document.getElementById('dog-breed-answer').disabled = true; // Disable input
    const submitButton = document.querySelector('.quiz-question button');
    if (submitButton) {
        submitButton.disabled = true; // Disable submit button
    }
}

document.addEventListener('DOMContentLoaded', fetchDogBreedQuestion);
