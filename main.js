document.addEventListener('DOMContentLoaded', () => {
    /* Menu Mobile Logic */
    const navToggle = document.querySelector('.header__toggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('nav__list--active');
            navToggle.classList.toggle('header__toggle--active');
        });
    }

    /* Script Carousel */
    const imgs = document.querySelectorAll('.carousel__img');
    
    if (imgs.length > 0) {
        let currentImg = 0;
        const totalImgs = imgs.length;

        function showImage(index) {
            imgs.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        function nextImage() {
            currentImg = (currentImg + 1) % totalImgs;
            showImage(currentImg);
        }

        // Change image every 4 seconds
        setInterval(nextImage, 4000);
    }

    /* Initialize Quiz if container exists */
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        showStartScreen();
    }
});

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
        <div class="quiz-start">
            <h2 class="quiz-title">Quiz de Ciencias Naturales</h2>
            <p class="quiz-description">Pon a prueba tus conocimientos con estas 5 preguntas.</p>
            <button class="btn-cta" onclick="startQuiz()">Comenzar Quiz</button>
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
            <button class="quiz-option" onclick="selectOption(${index})">
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            </button>
        `;
    });

    container.innerHTML = `
        <div class="quiz-game">
            <div class="quiz-progress">Pregunta ${currentQuestion + 1} de ${questions.length}</div>
            <h3 class="quiz-question-text">${questionData.question}</h3>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
            <div id="quiz-feedback" class="quiz-feedback"></div>
        </div>
    `;
}

function selectOption(index) {
    if (selectedOption !== null) return; // Prevent multiple clicks

    selectedOption = index;
    const correctIndex = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    if (index === correctIndex) {
        score++;
        options[index].classList.add('correct');
        feedback.innerHTML = '<span class="success-msg">¡Correcto!</span> <button class="btn-next" onclick="nextQuestion()">Siguiente</button>';
    } else {
        options[index].classList.add('wrong');
        options[correctIndex].classList.add('correct');
        feedback.innerHTML = '<span class="error-msg">Incorrecto</span> <button class="btn-next" onclick="nextQuestion()">Siguiente</button>';
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
        <div class="quiz-results">
            <h2>Resultados</h2>
            <div class="score-display">${score} / ${questions.length}</div>
            <p class="score-message">${message}</p>
            <button class="btn-cta" onclick="showStartScreen()">Intentar de nuevo</button>
        </div>
    `;
}

// Global scope binding is automatic for functions declared this way in browser,
// but inside a module or if main.js is treated strictly, we might need window.
// Since the HTML uses onclick attributes, these indeed need to be global.
// I'll explicitely bind them to window just in case this file is wrapped later,
// although currently it seems to be a standard script.
window.startQuiz = startQuiz;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.showStartScreen = showStartScreen;
