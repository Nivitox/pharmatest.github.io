// sticky.js

// // Selecciona el contenedor 'verifier'
// const verifier = document.querySelector('.verifier');

// // Maneja el evento de desplazamiento
// window.addEventListener('scroll', () => {
//     // Verifica si el contenedor ha alcanzado la parte superior de la pantalla
//     if (window.scrollY >= verifier.offsetTop) {
//         verifier.classList.add('stuck');
//     } else {
//         verifier.classList.remove('stuck');
//     }
// });

window.addEventListener('scroll', () => {
    if (window.scrollY >= verifier.offsetTop) {
        verifier.classList.add('stuck');
        verifier.style.top = '0px'; // Ajusta esta altura como desees
    } else {
        verifier.classList.remove('stuck');
        verifier.style.top = ''; // Resetea el top a su valor original
    }
});
