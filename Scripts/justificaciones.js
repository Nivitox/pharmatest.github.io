// justificaciones.js

export function showJustifications(questions, currentQuestionIndex) {
    // Selecciona el contenedor dentro de la nueva tarjeta
    $("#justification-card #justifications-container").empty().removeClass("hidden");
    
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    for (let i = 1; i <= 5; i++) {
        const alt = questions[currentQuestionIndex][`Alternative${i}`];
        const just = questions[currentQuestionIndex][`Justification${i}`];

        // Comprobar si la alternativa es correcta o incorrecta
        const isCorrect = alt === correctAnswer;

        // Aplicar el formato adecuado según la respuesta
        const justificationClass = isCorrect ? "justification correct" : "justification incorrect";
        const icon = isCorrect ? "✔️" : "❌";

        $("#justification-card #justifications-container").append(
            `<div class="${justificationClass}">
                <span class="justification-icon">${icon}</span>
                <p class="justification-text">${just}</p>
            </div>`
        );
    }

    $("#show-justifications").addClass("hidden");

    // Manejo de ocultar/mostrar justificaciones
    document.getElementById("show-justifications").addEventListener("click", function() {
        const justifications = document.querySelector("#justification-card #justifications-container");
        if (justifications.classList.contains("hidden")) {
            justifications.classList.remove("hidden");
            //this.textContent = "Ocultar Justificaciones";
        } else {
            justifications.classList.add("hidden");
            //this.textContent = "Mostrar Justificaciones";
        }
    });
}
