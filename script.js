const questions = [
    { question: "What is the gas used to extinguish fires?", answers: [{ text: "carbon dioxide", correct: false }, { text: "nitrogen", correct: true }, { text: "oxygen", correct: false }, { text: "hydrogen", correct: false }] },
    { question: "What is the national animal of Australia?", answers: [{ text: "kangaroo", correct: true }, { text: "koala", correct: false }, { text: "emu", correct: false }, { text: "crocodile", correct: false }] },
    { question: "What is the process by which plants convert sunlight into energy?", answers: [{ text: "Photosynthesis", correct: true }, { text: "respiration", correct: false }, { text: "oxidation", correct: false }, { text: "evolution", correct: false }] },
    { question: "When was the first international modern Olympiad held?", answers: [{ text: "1896", correct: true }, { text: "1900", correct: false }, { text: "1912", correct: false }, { text: "1924", correct: false }] },
    { question: "What is the chemical symbol for water?", answers: [{ text: "H2O", correct: true }, { text: "O2", correct: false }, { text: "CO2", correct: false }, { text: "NaCl", correct: false }] },
    { question: "What is the largest planet in our solar system?", answers: [{ text: "Jupiter", correct: true }, { text: "Saturn", correct: false }, { text: "Earth", correct: false }, { text: "Mars", correct: false }] },
    { question: "Who wrote 'Romeo and Juliet'?", answers: [{ text: "William Shakespeare", correct: true }, { text: "Charles Dickens", correct: false }, { text: "Jane Austen", correct: false }, { text: "Mark Twain", correct: false }] },
    { question: "What is the capital of Japan?", answers: [{ text: "Tokyo", correct: true }, { text: "Kyoto", correct: false }, { text: "Osaka", correct: false }, { text: "Nagoya", correct: false }] },
    { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Diamond", correct: true }, { text: "Gold", correct: false }, { text: "Iron", correct: false }, { text: "Platinum", correct: false }] },
    { question: "What is the speed of light?", answers: [{ text: "299,792,458 meters per second", correct: true }, { text: "150,000,000 meters per second", correct: false }, { text: "1,000,000 meters per second", correct: false }, { text: "300,000 meters per second", correct: false }] }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    } else {
        score--;
    }
    scoreElement.innerText = score;
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Show Score';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Show Score') {
        alert(`Your total score is: ${score}`);
        startQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    }
});

startQuiz();
