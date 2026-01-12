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
        if (successBadge) {
            successBadge.innerHTML = `✔ ${score}`;
            successBadge.classList.add('anim-success');
        }
        options[index].classList.add('quiz__option--correct', 'anim-success');
        options[index].innerHTML += explanationHtml;
        triggerConfetti(); // Fire confetti
    } else {
        incorrectScore++;
        if (errorBadge) {
            errorBadge.innerHTML = `✖ ${incorrectScore}`;
            errorBadge.classList.add('anim-shake');
        }
        options[index].classList.add('quiz__option--wrong', 'anim-shake');
        options[correctIndex].classList.add('quiz__option--correct');
        
        options[correctIndex].innerHTML += `
            <div class="quiz__explanation">
                <div class="quiz__explanation-title">✔ La respuesta correcta es:</div>
                <div class="quiz__explanation-text">
                    ${questionData.explanation}
                </div>
            </div>
        `;
        triggerSadAnim(); // Fire sad animation
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

// Animation Functions
function triggerConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('quiz__confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's'; // 1-3s
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function triggerSadAnim() {
    const container = document.getElementById('quiz-container');
    const sadEmoji = document.createElement('div');
    sadEmoji.classList.add('quiz__sad-overlay');
    sadEmoji.textContent = '😢'; // Sad face
    container.style.position = 'relative'; // Ensure relative positioning for absolute child
    container.appendChild(sadEmoji);

    // Remove after animation
    setTimeout(() => {
        sadEmoji.remove();
    }, 1500);
}

function showResults() {
    const container = document.getElementById('quiz-container');
    const percentage = Math.round((score / questions.length) * 100);
    
    const skipped = 0; 
    const wrong = incorrectScore;

    let title = '';
    let message = '';
    let titleClass = '';

    if (score === questions.length) {
        title = '¡Excelente trabajo!';
        message = '¡Felicidades! Has contestado todo correctamente. Dominas este tema.';
        titleClass = 'text-success'; // We might need to add this class or just use style
    } else if (score >= 3) {
        title = '¡Buen esfuerzo!';
        message = 'Vas por buen camino, pero aún hay margen de mejora. ¡Sigue practicando!';
        titleClass = 'text-warning';
    } else {
        title = '¡Sigue estudiando!';
        message = 'Debes repasar tus conocimientos en Ciencias Naturales. ¡No te rindas!';
        titleClass = 'text-danger';
    }

    container.innerHTML = `
        <div class="quiz__results">
            <h2 class="quiz__title" style="margin-bottom: 0.5rem;">${title}</h2>
            <p class="quiz__description" style="margin-bottom: 2rem;">${message}</p>
            
            <div class="quiz__results-grid">
                <!-- Card 1: Puntaje -->
                <div class="quiz__result-card">
                    <div class="quiz__result-label">Puntaje</div>
                    <div class="quiz__result-value quiz__result-value--primary">${score}/${questions.length}</div>
                </div>

                <!-- Card 2: Precisión -->
                <div class="quiz__result-card">
                    <div class="quiz__result-label">Precisión</div>
                    <div class="quiz__result-value">${percentage}%</div>
                </div>

                <!-- Card 3: Detalles -->
                <div class="quiz__result-card quiz__result-card--details">
                    <div class="quiz__detail-row">
                        <span>Correctas</span>
                        <span class="quiz__detail-val quiz__detail-val--green">${score}</span>
                    </div>
                    <div class="quiz__detail-row">
                        <span>Incorrectas</span>
                        <span class="quiz__detail-val quiz__detail-val--red">${wrong}</span>
                    </div>
                    <div class="quiz__detail-row">
                        <span>Omitidas</span>
                        <span class="quiz__detail-val">${skipped}</span>
                    </div>
                </div>
            </div>

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
