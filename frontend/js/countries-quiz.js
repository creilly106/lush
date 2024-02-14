async function fetchCountryQuestion() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    const response = await fetch(apiUrl);
    const countries = await response.json();
    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];
    const countryName = country.name.common;
    const capital = country.capital[0];

    // Generate quiz question
    const quizContainer = document.getElementById('countries-quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <p>What is the capital of ${countryName}?</p>
            <input type="text" id="country-capital-answer" placeholder="Your answer...">
            <button onclick="checkCountryCapitalAnswer('${capital}')">Submit</button>
        </div>
    `;
}

function checkCountryCapitalAnswer(correctAnswer) {
    const userAnswer = document.getElementById('country-capital-answer').value;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        alert("Correct!");
    } else {
        alert(`Incorrect! The correct answer was ${correctAnswer}.`);
    }
    // Fetch a new question
    fetchCountryQuestion();
}

document.addEventListener('DOMContentLoaded', fetchCountryQuestion);
