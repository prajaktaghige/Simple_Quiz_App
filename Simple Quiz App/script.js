const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: "Who is the creator of JavaScript?",
        answers: {
            a: "Brendan Eich",
            b: "Tim Berners-Lee",
            c: "James Gosling"
        },
        correctAnswer: "a"
    },
    {
        question: "Which language runs in a web browser?",
        answers: {
            a: "Java",
            b: "C",
            c: "JavaScript"
        },
        correctAnswer: "c"
    },
    {
        question: "What does CSS stand for?",
        answers: {
            a: "Central Style Sheets",
            b: "Cascading Style Sheets",
            c: "Cascading Simple Sheets"
        },
        correctAnswer: "b"
    }
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);
