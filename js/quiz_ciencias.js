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
        correct: 3, // D
        explanation: "Al aumentar los depredadores de los insectos (las ranas), la presión de depredación sobre los insectos será mayor, reduciendo su número."
    },
    {
        question: "Un estudiante desea separar una mezcla heterogénea compuesta por agua, sal disuelta y arena. Para recuperar los tres componentes por separado (agua líquida, sal sólida y arena seca), ¿cuál es la secuencia de métodos más adecuada?",
        options: [
            "Evaporación y luego filtración.",
            "Destilación y luego tamizado.",
            "Filtración y luego destilación.",
            "Filtración y luego decantación."
        ],
        correct: 2, // C
        explanation: "La filtración separa la arena (sólido insoluble) del agua salada. Luego, la destilación separa el agua (que se evapora y condensa) de la sal (que queda como residuo)."
    },
    {
        question: "Se lanza una pelota verticalmente hacia arriba. Despreciando la resistencia del aire, ¿cuál de las siguientes afirmaciones describe correctamente la velocidad y la aceleración de la pelota en el punto más alto de su trayectoria?",
        options: [
            "La velocidad es cero y la aceleración es diferente de cero.",
            "La velocidad es constante y la aceleración aumenta.",
            "La velocidad es cero y la aceleración es cero.",
            "La velocidad es máxima y la aceleración es constante."
        ],
        correct: 0, // A
        explanation: "En el punto más alto, la velocidad es instantáneamente cero, pero la aceleración de la gravedad sigue actuando hacia abajo (diferente de cero)."
    },
    {
        question: "Los glóbulos rojos son células que transportan oxígeno en la sangre. Si se coloca una muestra de glóbulos rojos humanos en un vaso con agua destilada (sin sales), se observa que los glóbulos se hinchan y finalmente estallan. Este fenómeno ocurre porque:",
        options: [
            "Los glóbulos rojos absorben sales del agua destilada mediante transporte activo.",
            "El agua destilada es una solución hipotónica, por lo que el agua entra a la célula por ósmosis.",
            "El agua destilada es una solución hipertónica, por lo que el agua sale de la célula por ósmosis.",
            "Los glóbulos rojos absorben oxígeno del agua destilada mediante transporte activo."
        ],
        correct: 1, // B
        explanation: "El agua destilada es una solución hipotónica (menor concentración de solutos que la célula), por lo que el agua entra a los glóbulos rojos por ósmosis tratando de equilibrar las concentraciones, causándoles hinchazón."
    },
    {
        question: "En un recipiente cerrado con un émbolo móvil, se tiene un gas ideal a una temperatura y presión constantes. Si se calienta el gas manteniendo la presión constante (el émbolo puede moverse libremente), ¿qué sucederá con el volumen del gas?",
        options: [
            "El volumen permanecerá igual.",
            "El volumen aumentará.",
            "El volumen disminuirá.",
            "El volumen se estabilizará en un valor intermedio."
        ],
        correct: 1, // B
        explanation: "Según la Ley de Charles, a presión constante, el volumen de un gas ideal es directamente proporcional a su temperatura absoluta. Si la temperatura aumenta, el volumen aumenta."
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
            <button class="quiz__option" id="option-${index}" onclick="selectOption(${index})">
                <div class="quiz__option-content">
                    <span class="quiz__option-letter">${String.fromCharCode(65 + index)}.</span>
                    <span class="quiz__option-text">${option}</span>
                </div>
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
    const questionData = questions[currentQuestion];
    const correctIndex = questionData.correct;
    const options = document.querySelectorAll('.quiz__option');
    const feedback = document.getElementById('quiz-feedback');
    const successBadge = document.querySelector('.quiz__badge--success');
    const errorBadge = document.querySelector('.quiz__badge--error');

    // Remove onclick handlers to freeze state
    options.forEach(opt => opt.onclick = null);

    const explanationHtml = `
        <div class="quiz__explanation">
            <div class="quiz__explanation-title">
                ${index === correctIndex ? '✔ ¡Exacto!' : '❌ Incorrecto'}
            </div>
            <div class="quiz__explanation-text">
                ${questionData.explanation}
            </div>
        </div>
    `;

    if (index === correctIndex) {
        score++;
        if (successBadge) successBadge.innerHTML = `✔ ${score}`;
        options[index].classList.add('quiz__option--correct');
        // Inject explanation into the selected option
        options[index].innerHTML += explanationHtml;
    } else {
        incorrectScore++;
        if (errorBadge) errorBadge.innerHTML = `✖ ${incorrectScore}`;
        options[index].classList.add('quiz__option--wrong');
        options[correctIndex].classList.add('quiz__option--correct');
        
        // Show explanation in the correct option even if wrong was selected
        // Or show it in the clicked one? screenshot shows correct one.
        // Let's append to the correct option to show why it's the right answer.
        options[correctIndex].innerHTML += `
            <div class="quiz__explanation">
                <div class="quiz__explanation-title">✔ La respuesta correcta es:</div>
                <div class="quiz__explanation-text">
                    ${questionData.explanation}
                </div>
            </div>
        `;
    }

    feedback.innerHTML = '<div class="quiz__footer"><button class="quiz__btn-next" onclick="nextQuestion()">Siguiente</button></div>';
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
