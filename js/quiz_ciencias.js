/* =========================================
   Logic Quiz Ciencias Naturales
   ========================================= */
const questions = [
    {
        question: "¿Cuál es la unidad básica de la vida?",
        options: ["El tejido", "La célula", "El órgano", "El átomo"],
        correct: 1
    },
    {
        question: "¿Qué gas es fundamental para la respiración humana?",
        options: ["Nitrógeno", "Dióxido de carbono", "Oxígeno", "Hidrógeno"],
        correct: 2
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Tierra", "Júpiter", "Saturno", "Marte"],
        correct: 1
    },
    {
        question: "¿Qué proceso realizan las plantas para fabricar su alimento?",
        options: ["Respiración", "Digestión", "Fotosíntesis", "Fermentación"],
        correct: 2
    },
    {
        question: "¿Cuál es el estado de la materia del agua a temperatura ambiente?",
        options: ["Sólido", "Líquido", "Gaseoso", "Plasma"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function showStartScreen() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="quiz__start">
            <h2 class="quiz__title">Quiz de Ciencias Naturales</h2>
            <p class="quiz__description">
                Practica con las 5 preguntas tipo ICFES de la semana.
                <br>
                Prepárate en compañía de tus profesores para las pruebas ICFES.
            </p>
            <button class="quiz__btn-start" onclick="startQuiz()">Comenzar Quiz</button>
        </div>
    `;
    currentQuestion = 0;
    score = 0;
}

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    const container = document.getElementById('quiz-container');

    let optionsHtml = '';
    questionData.options.forEach((option, index) => {
        optionsHtml += `
            <button class="quiz__option" onclick="selectOption(${index})">
                <span class="quiz__option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="quiz__option-text">${option}</span>
            </button>
        `;
    });

    container.innerHTML = `
        <div class="quiz__game">
            <div class="quiz__progress">Pregunta ${currentQuestion + 1} de ${questions.length}</div>
            <h3 class="quiz__question">${questionData.question}</h3>
            <div class="quiz__options">
                ${optionsHtml}
            </div>
            <div id="quiz-feedback" class="quiz__feedback"></div>
        </div>
    `;
}

function selectOption(index) {
    if (selectedOption !== null) return; // Prevent multiple clicks

    selectedOption = index;
    const correctIndex = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.quiz__option');
    const feedback = document.getElementById('quiz-feedback');

    if (index === correctIndex) {
        score++;
        options[index].classList.add('quiz__option--correct');
        feedback.innerHTML = '<span class="quiz__msg quiz__msg--success">¡Correcto!</span> <button class="quiz__btn-next" onclick="nextQuestion()">Siguiente</button>';
    } else {
        options[index].classList.add('quiz__option--wrong');
        options[correctIndex].classList.add('quiz__option--correct');
        feedback.innerHTML = '<span class="quiz__msg quiz__msg--error">Incorrecto</span> <button class="quiz__btn-next" onclick="nextQuestion()">Siguiente</button>';
    }
}

function nextQuestion() {
    selectedOption = null;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const container = document.getElementById('quiz-container');
    const percentage = (score / questions.length) * 100;
    let message = '';
    
    if (percentage === 100) message = '¡Excelente trabajo!';
    else if (percentage >= 60) message = '¡Bien hecho!';
    else message = 'Sigue practicando';

    container.innerHTML = `
        <div class="quiz__results">
            <h2>Resultados</h2>
            <div class="quiz__score-display">${score} / ${questions.length}</div>
            <p class="quiz__score-message">${message}</p>
            <button class="btn-cta" onclick="showStartScreen()">Intentar de nuevo</button>
        </div>
    `;
}

// Make functions global so inline onclick handlers work
window.startQuiz = startQuiz;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.showStartScreen = showStartScreen;

// Initialize on load if container exists
document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        showStartScreen();
    }
});
