// Use your Dog API key here
const dogApiKey = 'live_lHARVD0mI4sbxw932JKutDatRYYNdsGy0eQooaeDXDG80l9BFtsSuh3n7ll6ZNjB';

async function fetchDogBreedQuestion() {
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

        // Generate quiz question
        const quizContainer = document.getElementById('dog-quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <img src="${imageUrl}" alt="Guess the breed" class="quiz-image">
                <p>What breed is this dog?</p>
                <input type="text" id="dog-breed-answer" placeholder="Your answer...">
                <button onclick="checkDogBreedAnswer('${breedName}')">Submit</button>
                <div id="answer-feedback"></div> <!-- Added feedback div here -->
            </div>
        `;
    } catch (error) {
        console.error("Error fetching dog breed data:", error);
        // Optionally, handle the error by displaying a message to the user
    }
}

function checkDogBreedAnswer(correctAnswer) {
    const userAnswer = document.getElementById('dog-breed-answer').value;
    const feedbackElement = document.getElementById('answer-feedback'); // Get the feedback element

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = `Incorrect! The correct answer was ${correctAnswer}.`;
        feedbackElement.style.color = "red";
    }

    // Disable the button and input field after answering to prevent multiple answers
    document.getElementById('dog-breed-answer').disabled = true;
    document.querySelector('.quiz-question button').disabled = true;

    // Fetch a new question after a delay
    setTimeout(() => {
        fetchDogBreedQuestion();
        feedbackElement.textContent = ''; // Clear the feedback text
        document.getElementById('dog-breed-answer').disabled = false;
        document.querySelector('.quiz-question button').disabled = false;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', fetchDogBreedQuestion);
