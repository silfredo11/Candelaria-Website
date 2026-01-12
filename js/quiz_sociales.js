/* =========================================
   Logic Quiz Sociales y Ciudadanas
   ========================================= */
const questions = [
    {
        question: "Un grupo de ciudadanos está inconforme con la construcción de una carretera que atravesará un humedal protegido. ¿Cuál es el mecanismo de participación más adecuado para que la comunidad decida si acepta o rechaza este proyecto específico de impacto local?",
        options: [
            "El Voto Popular",
            "La Consulta Popular",
            "El Cabildo Abierto",
            "La Iniciativa Legislativa"
        ],
        correct: 1, // B
        explanation: "La Consulta Popular es el mecanismo mediante el cual una pregunta de carácter general sobre un asunto de trascendencia nacional, departamental, municipal, distrital o local, es sometida por el gobernante a consideración del pueblo."
    },
    {
        question: "La Acción de Tutela es un mecanismo constitucional cuyo objetivo principal es:",
        options: [
            "Reformar la Constitución Política.",
            "Juzgar a los congresistas por corrupción.",
            "Proteger los derechos fundamentales de los ciudadanos cuando estos sean vulnerados.",
            "Elegir al Presidente de la República."
        ],
        correct: 2, // C
        explanation: "La Acción de Tutela (Art. 86) busca la protección inmediata de los derechos constitucionales fundamentales cuando estos resulten vulnerados o amenazados."
    },
    {
        question: "¿Cuál de las siguientes es una característica fundamental del Estado Social de Derecho definido en la Constitución de 1991?",
        options: [
            "La prevalencia del interés particular sobre el general.",
            "La centralización absoluta del poder en el Presidente.",
            "El respeto de la dignidad humana, el trabajo y la solidaridad.",
            "La prohibición de la propiedad privada."
        ],
        correct: 2, // C
        explanation: "El Estado Social de Derecho se funda en el respeto de la dignidad humana, en el trabajo y la solidaridad de las personas que la integran y en la prevalencia del interés general."
    },
    {
        question: "Un alcalde decide decretar el 'Toque de Queda' para menores de edad en su municipio debido a problemas de seguridad. Esta medida entra en conflicto con el derecho a la libre circulación. En este caso, ¿qué principio constitucional prevalece?",
        options: [
            "El derecho absoluto de los menores a hacer lo que quieran.",
            "La prevalencia del interés general y la protección de los niños y adolescentes.",
            "La autoridad del alcalde no tiene límites.",
            "El derecho a la libre circulación está por encima de la seguridad."
        ],
        correct: 1, // B
        explanation: "Los derechos de los niños prevalecen sobre los derechos de los demás, y el Estado tiene el deber de protegerlos. Además, el interés general de la seguridad pública puede limitar ciertas libertades individuales temporalmente."
    },
    {
        question: "¿Qué es el Referendo?",
        options: [
            "Una reunión pública de los concejos municipales.",
            "La convocatoria al pueblo para que apruebe o rechace un proyecto de norma jurídica o derogue una norma vigente.",
            "La elección de candidatos a corporaciones públicas.",
            "Una demanda contra el Estado."
        ],
        correct: 1, // B
        explanation: "El Referendo es la convocatoria que se hace al pueblo para que apruebe o rechace un proyecto de norma jurídica o derogue o no una norma ya vigente."
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
            <h2 class="quiz__title">Quiz de Sociales y Ciudadanas</h2>
            <div class="quiz__topic-badge">
                Tema de la semana: Mecanismos de Participación
            </div>
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
    startCountdown();
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
        playSound('success'); // Play sound
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
        playSound('error'); // Play sound
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

// Sound Functions using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'success') {
        // "Ding" sound (Sine wave, high pitch)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        oscillator.frequency.exponentialRampToValueAtTime(1174.66, audioCtx.currentTime + 0.1); // D6
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'error') {
        // "Buzz" sound (Sawtooth wave, low pitch)
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'tick') {
        // "Tick" sound (Woodblock style)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'start') {
        // "Go!" sound (Ascending chord)
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.linearRampToValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.6);
    } else if (type === 'victory') {
        // Victory Fanfare (Major Arpeggio: C-E-G-C)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const times = [0, 0.15, 0.30, 0.60];
        
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gn = audioCtx.createGain();
            osc.connect(gn);
            gn.connect(audioCtx.destination);
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + times[i]);
            
            gn.gain.setValueAtTime(0.05, audioCtx.currentTime + times[i]);
            gn.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + times[i] + 0.3);
            
            osc.start(audioCtx.currentTime + times[i]);
            osc.stop(audioCtx.currentTime + times[i] + 0.3);
        });
    } else if (type === 'defeat') {
        // Defeat (Descending: G-F#-F)
        const notes = [392.00, 369.99, 349.23];
        const times = [0, 0.4, 0.8];
        
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gn = audioCtx.createGain();
            osc.connect(gn);
            gn.connect(audioCtx.destination);
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + times[i]);
            
            gn.gain.setValueAtTime(0.05, audioCtx.currentTime + times[i]);
            gn.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + times[i] + 0.6);
            
            osc.start(audioCtx.currentTime + times[i]);
            osc.stop(audioCtx.currentTime + times[i] + 0.6);
        });
    }
}

// Countdown Function
function startCountdown() {
    const container = document.getElementById('quiz-container');
    container.style.position = 'relative'; // Ensure positioning context
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'quiz__countdown';
    container.appendChild(overlay);

    let count = 3;

    function tick() {
        if (count > 0) {
            overlay.innerHTML = `<span class="anim-pop-in">${count}</span>`;
            playSound('tick');
            setTimeout(() => {
                count--;
                tick();
            }, 1000);
        } else {
            overlay.innerHTML = `<span class="anim-pop-in">¡Ya!</span>`;
            playSound('start');
            setTimeout(() => {
                overlay.remove();
                loadQuestion();
            }, 1000);
        }
    }

    tick();
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
        titleClass = 'text-success'; 
        playSound('victory');
        triggerConfetti();
    } else if (score >= 3) {
        title = '¡Buen esfuerzo!';
        message = 'Vas por buen camino, pero aún hay margen de mejora. ¡Sigue practicando!';
        titleClass = 'text-warning';
        playSound('victory');
        triggerConfetti();
    } else {
        title = '¡Sigue estudiando!';
        message = 'Debes repasar tus conocimientos en Competencias Ciudadanas. ¡No te rindas!';
        titleClass = 'text-danger';
        playSound('defeat');
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

            <!-- Recursos de Estudio -->
            <div class="quiz__resources">
                <h3 class="quiz__resources-title">📚 Recursos de Estudio Recomendados</h3>
                <div class="quiz__resources-grid">
                    <a href="https://www.corteconstitucional.gov.co/inicio/Constitucion%20politica%20de%20Colombia.pdf" target="_blank" class="quiz__resource-link">
                        <span class="quiz__resource-icon">📜</span>
                        <span class="quiz__resource-text">Constitución Política</span>
                    </a>
                    <a href="https://www.youtube.com/results?search_query=mecanismos+participacion+ciudadana+colombia" target="_blank" class="quiz__resource-link">
                        <span class="quiz__resource-icon">🎥</span>
                        <span class="quiz__resource-text">Video: Mecanismos Part.</span>
                    </a>
                     <a href="https://www.youtube.com/results?search_query=icfes+sociales+y+ciudadanas" target="_blank" class="quiz__resource-link">
                        <span class="quiz__resource-icon">📝</span>
                        <span class="quiz__resource-text">Video: Prep. Sociales</span>
                    </a>
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
