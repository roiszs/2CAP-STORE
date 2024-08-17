document.addEventListener('DOMContentLoaded', function () {
    const editarPerfilBtn = document.getElementById('editarPerfilBtn');
    const modalEditarPerfil = document.getElementById('modalEditarPerfil');
    const closeBtn = document.querySelector('.close-btn3', 'close-btn');
    const editarPerfilForm = document.getElementById('editarPerfilForm');
    const nombrePerfil = document.getElementById('nombrePerfil');
    const correoPerfil = document.getElementById('correoPerfil');
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage3');

    // Cargar información del usuario
    const nombre = localStorage.getItem('nombre') || '';
    const correo = localStorage.getItem('correo') || '';

    nombrePerfil.textContent = nombre;
    correoPerfil.textContent = correo;

    editarPerfilBtn.addEventListener('click', function () {
        // Cargar valores en el formulario
        editarPerfilForm.nombre.value = nombre;
        editarPerfilForm.correo.value = correo;

        // Mostrar modal
        modalEditarPerfil.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function () {
        // Ocultar modal
        modalEditarPerfil.style.display = 'none';
        successModal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target == modalEditarPerfil || e.target == successModal) {
            // Ocultar modal si se hace clic fuera del contenido del modal
            modalEditarPerfil.style.display = 'none';
            successModal.style.display = 'none';
        }
    });

    editarPerfilForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Guardar cambios
        localStorage.setItem('nombre', editarPerfilForm.nombre.value);
        localStorage.setItem('correo', editarPerfilForm.correo.value);

        // Actualizar información mostrada en el perfil
        nombrePerfil.textContent = editarPerfilForm.nombre.value;
        correoPerfil.textContent = editarPerfilForm.correo.value;

        // Ocultar modal de edición
        modalEditarPerfil.style.display = 'none';

        // Mostrar modal de éxito
        successMessage.textContent = 'Perfil actualizado con éxito';
        successModal.style.display = 'block';
    });
});

