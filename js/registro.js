document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({ nombre, email, password });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso');
    window.location.href = 'index.html'; // Redirigir a la página de inicio
});
