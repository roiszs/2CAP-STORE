document.addEventListener('DOMContentLoaded', function () {
    const editarPerfilBtn = document.getElementById('editarPerfilBtn');
    const modalEditarPerfil = document.getElementById('modalEditarPerfil');
    const closeBtn = document.querySelector('.close-btn');
    const editarPerfilForm = document.getElementById('editarPerfilForm');
    const nombrePerfil = document.getElementById('nombrePerfil');
    const correoPerfil = document.getElementById('correoPerfil');

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
    });

    window.addEventListener('click', function (e) {
        if (e.target == modalEditarPerfil) {
            // Ocultar modal si se hace clic fuera del contenido del modal
            modalEditarPerfil.style.display = 'none';
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

        // Ocultar modal
        modalEditarPerfil.style.display = 'none';

        alert('Perfil actualizado con éxito');
    });
});
