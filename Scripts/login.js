console.log('El archivo login.js se está cargando.');

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica las credenciales
    if (validateCredentials(username, password)) {
        // Si las credenciales son correctas, redirigir a la página de home
        window.location.href = 'home.html'; // Cambia a la URL de tu página de inicio
    } else {
        // Mostrar mensaje de error
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Usuario o contraseña incorrectos. Intente nuevamente.';
        errorMessage.style.display = 'block';
    }
});

// Función para validar las credenciales (puedes modificar esto según tu lógica)
function validateCredentials(username, password) {
    const validUsername = 'admin'; // Cambia esto a tu usuario válido
    const validPassword = '1234'; // Cambia esto a tu contraseña válida

    console.log(validPassword);
    return username === validUsername && password === validPassword;
}
