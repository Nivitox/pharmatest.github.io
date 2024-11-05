// Timer.js

let timer;
const timeLimit = 90;

function startTimer(callback) {
    let timeLeft = timeLimit;
    $("#timer").text(`Time: ${timeLeft} sec`);

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        $("#timer").text(`Time: ${timeLeft} sec`);

        if (timeLeft <= 0) {
            clearInterval(timer);
            callback();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Exporta las funciones
export { startTimer, stopTimer };
