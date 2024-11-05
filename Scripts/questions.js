// // questions.js

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}

// Función para mezclar alternativas y justificaciones en una pregunta
function shuffleAlternativesAndJustifications(question) {
    const alternativesAndJustifications = [];

    // Guardar alternativas y justificaciones con sus índices
    for (let i = 1; i <= 5; i++) {
        alternativesAndJustifications.push({
            index: i, // Número de alternativa
            alternative: question[`Alternative${i}`], // Alternativa
            justification: question[`Justification${i}`] // Justificación
        });
    }

    // Mostrar el orden original de alternativas y justificaciones
    console.log("Orden original de alternativas:", alternativesAndJustifications.map(item => item.alternative));
    console.log("Orden original de justificaciones:", alternativesAndJustifications.map(item => item.justification));

    // Mezclar el array de pares
    const shuffled = shuffleArray(alternativesAndJustifications);

    // Mostrar el nuevo orden
    console.log("Nuevo orden de alternativas y justificaciones:", shuffled);

    // Asignar de nuevo las alternativas y justificaciones al objeto de pregunta después de mezclar
    shuffled.forEach((item, index) => {
        question[`Alternative${index + 1}`] = item.alternative;
        question[`Justification${index + 1}`] = item.justification;
    });
    
    // Actualizar el correctAnswer basado en el nuevo orden de alternativas
    question.correctAnswer = shuffled[0].alternative; // Asumimos que la primera alternativa mezclada es la correcta
}


// Función para cargar preguntas y aleatorizar alternativas y respuestas correctas
export async function loadQuestions() {
    const response = await fetch('Extra/preguntas.json');
    const questions = await response.json();

    // Aleatorizar las preguntas
    const shuffledQuestions = shuffleArray(questions);

    // Seleccionar una pregunta aleatoria
    const selectedQuestion = shuffledQuestions[0]; // Selecciona la primera pregunta después de aleatorizar
    
     $("#verifier").removeClass("verifier-correct verifier-incorrect").css("background-color", ""); // Limpia cualquier clase anterior y el color de fondo
    
    // Agregar correctAnswer a cada pregunta
    questions.forEach(question => {
        const alternativesAndJustifications = [
            { text: question.Alternative1, isCorrect: true, justification: question.Justification1 },
            { text: question.Alternative2, isCorrect: false, justification: question.Justification2 },
            { text: question.Alternative3, isCorrect: false, justification: question.Justification3 },
            { text: question.Alternative4, isCorrect: false, justification: question.Justification4 },
            { text: question.Alternative5, isCorrect: false, justification: question.Justification5 },
        ];

        // Mezclar alternativas y justificaciones
        const shuffled = shuffleArray(alternativesAndJustifications);

        // Asignar las alternativas y justificaciones aleatorizadas de vuelta a la pregunta
        shuffled.forEach((item, index) => {
            question[`Alternative${index + 1}`] = item.text;
            question[`Justification${index + 1}`] = item.justification; // Asegúrate de que esto esté presente
        });

        // Actualizar correctAnswer basado en el nuevo orden de alternativas
        question.correctAnswer = shuffled.find(alt => alt.isCorrect).text;
    });

    return questions;
}


export function displayAlternatives(questions, currentQuestionIndex, score, checkAnswer) {
    const question = questions[currentQuestionIndex];
    const alternativesAndJustifications = [];

    console.log("Alternativas recibidas en displayAlternatives:", 
        questions[currentQuestionIndex][`Alternative1`], 
        questions[currentQuestionIndex][`Alternative2`], 
        questions[currentQuestionIndex][`Alternative3`],
        questions[currentQuestionIndex][`Alternative4`],
        questions[currentQuestionIndex][`Alternative5`]
    );


    // Crear el array de alternativas y justificaciones para la pregunta actual
    for (let i = 1; i <= 5; i++) {
        alternativesAndJustifications.push({
            alternative: question[`Alternative${i}`],
            justification: question[`Justification${i}`]
        });
    }

    console.log("Alternativas recibidas en displayAlternatives:", alternativesAndJustifications.map(item => item.alternative));

    $("#alternatives-container").empty();
    alternativesAndJustifications.forEach((item, index) => {
        const alt = item.alternative;
        const just = item.justification;
        console.log(`Alternative ${index + 1}: ${alt}, Justification: ${just}`);
        $("#alternatives-container").append(`<button class="alternative-button" data-answer="${alt}" data-justification="${just}">${alt}</button>`);
    });

    // Contenedor para el mensaje de resultado
    //$("#alternatives-container").append('<div id="result-message" style="margin-top: 10px;"></div>');

    $(".alternative-button").on("click", function() {
        const selectedButton = $(this);
        const selectedAnswer = selectedButton.data("answer");
        const selectedJustification = selectedButton.data("justification");
        checkAnswer(selectedAnswer, selectedJustification);
        selectedButton.addClass("selected-answer");
    });

    console.log("Justificaciones salidas en displayAlternatives:", 
        questions[currentQuestionIndex][`Justification1`], 
        questions[currentQuestionIndex][`Justification2`], 
        questions[currentQuestionIndex][`Justification3`],
        questions[currentQuestionIndex][`Justification4`],
        questions[currentQuestionIndex][`Justification5`]
    );
}
