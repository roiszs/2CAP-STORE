document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessages = document.querySelectorAll('.error-message');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = successModal.querySelector('.close-btn2');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío inmediato del formulario

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
            return; // Detener si hay errores
        }

        // Si todo es válido, proceder con el registro
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ nombre: nameInput.value, email: emailInput.value, password: passwordInput.value });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar el modal de éxito
        if (valid) {
            // Mostrar el modal de éxito
            successModal.style.display = 'flex';

            // Esperar 3 segundos y redirigir
            setTimeout(function () {
                successModal.style.display = 'none';
                window.location.href = 'index.html';
            }, 3000);
        }
    });

    closeModalBtn.addEventListener('click', function () {
        successModal.style.display = 'none'; // Cerrar el modal
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessages = document.querySelectorAll('.error-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validación básica
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            errorMessages.forEach(msg => msg.textContent = 'Todos los campos son obligatorios.');
            return;
        }

        if (password !== confirmPassword) {
            confirmPasswordInput.nextElementSibling.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        // Guardar datos en localStorage
        const user = { name, email, password };
        localStorage.setItem('user', JSON.stringify(user));

        // Mostrar modal de éxito y redirigir a inicio
        const successModal = document.getElementById('success-modal');
        successModal.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});
