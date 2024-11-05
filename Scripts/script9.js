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

        // Reiniciar el botón de justificaciones
        resetJustificationButton();

        // Configurar el evento click para mostrar justificaciones
        $("#show-justifications").off("click").on("click", () => {
            const justificationsContainer = $("#justification-card #justifications-container");

            if (justificationsContainer.hasClass("hidden")) {
                showJustifications(questions, currentQuestionIndex); // Muestra las justificaciones
                justificationsContainer.removeClass("hidden"); // Muestra el contenedor de justificaciones
                $("#justification-card").removeClass("hidden"); // Asegúrate de que la tarjeta se muestre

                // Usamos scrollIntoView para asegurar que el contenedor de justificaciones esté visible
                $("#justification-card")[0].scrollIntoView({ behavior: "smooth", block: "center" });

                // Damos un pequeño retraso antes de enfocar
                setTimeout(() => {
                    $("#justification-card").focus();

                    // Ajustamos el desplazamiento para que aparezca más abajo
                    $('html, body').animate({
                        scrollTop: $("#justification-card").offset().top + 100 // Ajusta el valor como sea necesario
                    }, 500);
                }, 100);
                
                // Cambia el texto y el ícono del botón
                $(this).text("Ocultar Justificaciones");
                $(this).find('.justification-icon').text("🔼"); // Cambia el ícono aquí
            } else {
                justificationsContainer.addClass("hidden"); // Oculta el contenedor de justificaciones
                $(this).text("Mostrar Justificaciones");
                $(this).find('.justification-icon').text("🔽"); // Cambia el ícono aquí
            }
        });
    }

    function resetJustificationButton() {
        const button = $("#show-justifications");
        button.text("Mostrar Justificaciones");
        button.find('.justification-icon').text("🔽"); // Cambia el ícono inicial aquí si es necesario
        $("#justification-card #justifications-container").addClass("hidden"); // Asegúrate de ocultar el contenedor al cambiar de pregunta
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
