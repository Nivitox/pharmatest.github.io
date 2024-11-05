// Script.js

import { startTimer, stopTimer } from './timer.js';
import { loadQuestions } from './questions.js';
import { displayAlternatives } from './questions.js';
import { showJustifications } from './justificaciones.js';

$(document).ready(async function() {
    let questions = await loadQuestions(); 
    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion(index) {
        const question = questions[index];

        // Restablece elementos al mostrar una nueva pregunta
        $("#verifier").removeClass("verifier-correct verifier-incorrect");
        $("#question-number").text(`Question: ${index + 1}`).css("color", "black");

        $("#question-container").html(`<h3>${question.Question}</h3>`);
        $("#image-container").empty();
        $("#result-message").text(""); // Limpia el mensaje de resultado
        $("#justification-card").addClass("hidden"); // Oculta la tarjeta de justificación

        if (question.Image === "1") {
            $("#image-container").append(`<img src="Images/${question.ID}.png" alt="Imagen de la pregunta" class="question-image">`);
        } else {
            $("#image-container").append(`<img src="Images/00000.png" alt="Imagen por defecto" class="question-image">`);
        }

        displayAlternatives(questions, index, score, checkAnswer);
        startTimer(showNextQuestion);

        $("#show-justifications, #next-question").addClass("hidden");
        $("#skip-question").removeClass("hidden");
    }

    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        stopTimer();
        $(".alternative-button").prop("disabled", true);

        if (String(selectedAnswer) === String(correctAnswer)) {
            score += 3;
            $("#result-message").text("Your answer is CORRECT").css("color", "green");
            $("#verifier").addClass("verifier-correct").removeClass("verifier-incorrect");
            $(`.alternative-button[data-answer='${correctAnswer}']`).addClass("correct-answer");
            $("#question-number").text("CORRECT 👍").css("color", "white");
        } else {
            score -= 2;
            $("#result-message").text("Your answer is INCORRECT").css("color", "red");
            $("#verifier").addClass("verifier-incorrect").removeClass("verifier-correct");
            $(`.alternative-button[data-answer='${selectedAnswer}']`).addClass("incorrect-answer");
            $(`.alternative-button[data-answer='${correctAnswer}']`).addClass("correct-answer");
            $("#question-number").text("INCORRECT 👎").css("color", "white");
        }

        $("#score").text(`Score: ${score}`);
        $("#show-justifications, #next-question").removeClass("hidden");
        $("#skip-question").addClass("hidden");
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        $("#question-container").html("<h3>Thank you for participating!</h3>");
        $("#alternatives-container, #justifications-container").empty();
        stopTimer();
    }

    // Configurar el evento click una sola vez para mostrar justificaciones
    $("#show-justifications").off("click").on("click", () => {
        showJustifications(questions, currentQuestionIndex); // Llama a la función de justificaciones
        $("#justification-card").removeClass("hidden"); // Muestra la tarjeta

        // Usamos scrollIntoView para asegurar que el contenedor de justificaciones esté visible
        $("#justification-card")[0].scrollIntoView({ behavior: "smooth", block: "center" });

        // Damos un pequeño retraso antes de enfocar
        setTimeout(() => {
            $("#justification-card").focus();
        }, 100);
    });

    // Configurar el evento click una sola vez para mostrar justificaciones
$("#show-justifications").off("click").on("click", () => {
    showJustifications(questions, currentQuestionIndex); // Llama a la función de justificaciones
    $("#justification-card").removeClass("hidden"); // Muestra la tarjeta

    // Usamos scrollIntoView para asegurar que el contenedor de justificaciones esté visible
    $("#justification-card")[0].scrollIntoView({ behavior: "smooth", block: "center" });

    // Damos un pequeño retraso antes de enfocar
    setTimeout(() => {
        $("#justification-card").focus();

        // Desplazamos la vista hacia abajo 100 píxeles después de enfocar
        $('html, body').animate({
            scrollTop: $("#justification-card").offset().top + -100
        }, 500);
    }, 100);
});

    
    $("#next-question").click(showNextQuestion);
    $("#skip-question").on("click", () => {
        score -= 1;
        $("#score").text(`Score: ${score}`);
        showNextQuestion();
    });

    showQuestion(currentQuestionIndex);
});

$(document).ready(function() {
    const scrollToTopButton = $("#scroll-to-top");

    // Mostrar el botón al desplazarse hacia abajo
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { // Ajusta el valor según necesites
            scrollToTopButton.addClass("visible"); // Añade clase para mostrar
        } else {
            scrollToTopButton.removeClass("visible"); // Elimina clase para ocultar
        }
    });

    // Hacer que el botón desplace hacia arriba
    scrollToTopButton.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500); // Desplazamiento suave hacia arriba
    });
});
