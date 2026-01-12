/* =========================================
   Logic Quiz Ciencias Naturales
   ========================================= */
const questions = [
    {
        question: "En un ecosistema de bosque, se observa que la población de serpientes ha disminuido drásticamente debido a la caza excesiva. Las serpientes en este ecosistema se alimentan principalmente de ranas, y las ranas se alimentan de insectos. Considerando las relaciones tróficas, ¿cuál es el efecto más probable a corto plazo en este ecosistema tras la disminución de las serpientes?",
        options: [
            "La población de ranas disminuirá por falta de competencia.",
            "Los productores (plantas) aumentarán su biomasa.",
            "El ecosistema colapsará inmediatamente y todas las especies morirán.",
            "La población de insectos disminuirá rápidamente."
        ],
        correct: 3 // D
    },
    {
        question: "Un estudiante desea separar una mezcla heterogénea compuesta por agua, sal disuelta y arena. Para recuperar los tres componentes por separado (agua líquida, sal sólida y arena seca), ¿cuál es la secuencia de métodos más adecuada?",
        options: [
            "Evaporación y luego filtración.",
            "Destilación y luego tamizado.",
            "Filtración y luego destilación.",
            "Filtración y luego decantación."
        ],
        correct: 2 // C
    },
    {
        question: "Se lanza una pelota verticalmente hacia arriba. Despreciando la resistencia del aire, ¿cuál de las siguientes afirmaciones describe correctamente la velocidad y la aceleración de la pelota en el punto más alto de su trayectoria?",
        options: [
            "La velocidad es cero y la aceleración es diferente de cero.",
            "La velocidad es constante y la aceleración aumenta.",
            "La velocidad es cero y la aceleración es cero.",
            "La velocidad es máxima y la aceleración es constante."
        ],
        correct: 0 // A
    },
    {
        question: "Los glóbulos rojos son células que transportan oxígeno en la sangre. Si se coloca una muestra de glóbulos rojos humanos en un vaso con agua destilada (sin sales), se observa que los glóbulos se hinchan y finalmente estallan. Este fenómeno ocurre porque:",
        options: [
            "Los glóbulos rojos absorben sales del agua destilada mediante transporte activo.",
            "El agua destilada es una solución hipotónica, por lo que el agua entra a la célula por ósmosis.",
            "El agua destilada es una solución hipertónica, por lo que el agua sale de la célula por ósmosis.",
            "Los glóbulos rojos absorben oxígeno del agua destilada mediante transporte activo."
        ],
        correct: 1 // B (Corrected based on biological fact and internal consistency of explanation in notas.txt, even if key said C. Explanation text matches B exactly.)
    },
    {
        question: "En un recipiente cerrado con un émbolo móvil, se tiene un gas ideal a una temperatura y presión constantes. Si se calienta el gas manteniendo la presión constante (el émbolo puede moverse libremente), ¿qué sucederá con el volumen del gas?",
        options: [
            "El volumen permanecerá igual.",
            "El volumen aumentará.",
            "El volumen disminuirá.",
            "El volumen se estabilizará en un valor intermedio."
        ],
        correct: 1 // B
    }
];

let currentQuestion = 0;
let score = 0;
let incorrectScore = 0;
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
    incorrectScore = 0;
}

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    const container = document.getElementById('quiz-container');

    // Generar barra de progreso segmentada
    let segmentsHtml = '';
    for (let i = 0; i < questions.length; i++) {
        let statusClass = '';
        if (i < currentQuestion) statusClass = 'quiz__segment--completed';
        else if (i === currentQuestion) statusClass = 'quiz__segment--current';
        else statusClass = 'quiz__segment--future';
        
        segmentsHtml += `<div class="quiz__segment ${statusClass}"></div>`;
    }

    let optionsHtml = '';
    questionData.options.forEach((option, index) => {
        optionsHtml += `
            <button class="quiz__option" onclick="selectOption(${index})">
                <span class="quiz__option-letter">${String.fromCharCode(65 + index)}.</span>
                <span class="quiz__option-text">${option}</span>
            </button>
        `;
    });

    container.innerHTML = `
        <div class="quiz__game">
            <div class="quiz__header">
                <div class="quiz__progress-bar">
                    ${segmentsHtml}
                </div>
                <div class="quiz__stats">
                    <span class="quiz__counter">${currentQuestion + 1}/${questions.length}</span>
                    <span class="quiz__badge quiz__badge--error">✖ ${incorrectScore}</span>
                    <span class="quiz__badge quiz__badge--success">✔ ${score}</span>
                </div>
            </div>

            <h3 class="quiz__question">
                <span class="quiz__question-number">${currentQuestion + 1}. </span>${questionData.question}
            </h3>
            
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
    const successBadge = document.querySelector('.quiz__badge--success');
    const errorBadge = document.querySelector('.quiz__badge--error');

    if (index === correctIndex) {
        score++;
        if (successBadge) successBadge.innerHTML = `✔ ${score}`;
        options[index].classList.add('quiz__option--correct');
        // Feedback shows next button aligned right
        feedback.innerHTML = '<div class="quiz__footer"><button class="quiz__btn-next" onclick="nextQuestion()">Siguiente</button></div>';
    } else {
        incorrectScore++;
        if (errorBadge) errorBadge.innerHTML = `✖ ${incorrectScore}`;
        options[index].classList.add('quiz__option--wrong');
        options[correctIndex].classList.add('quiz__option--correct');
        feedback.innerHTML = '<div class="quiz__footer"><button class="quiz__btn-next" onclick="nextQuestion()">Siguiente</button></div>';
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
            <button class="quiz__btn-start" onclick="showStartScreen()">Intentar de nuevo</button>
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
