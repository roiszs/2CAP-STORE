document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessages = document.querySelectorAll('.error-message');

    form.addEventListener('submit', function (event) {
        // Resetear mensajes de error
        errorMessages.forEach(error => error.textContent = '');
        
        let valid = true;

        // Validación del nombre
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'El nombre es requerido');
            valid = false;
        }

        // Validación del email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
            valid = false;
        }

        // Validación de la contraseña
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres');
            valid = false;
        }

        // Confirmar que las contraseñas coinciden
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Las contraseñas no coinciden');
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); // Evita el envío del formulario si hay errores
            return;
        }

        // Si todo es válido, proceder con el registro
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ nombre: nameInput.value, email: emailInput.value, password: passwordInput.value });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Registro exitoso');
        window.location.href = 'index.html'; // Redirigir a la página de inicio
    });

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        input.classList.add('error');
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
