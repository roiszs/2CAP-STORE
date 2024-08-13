document.addEventListener('DOMContentLoaded', function () {
    const perfilForm = document.getElementById('perfilForm');

    // Cargar informacion del susuario
    const nombre = localStorage.getItem('nombre') || '';
    const correo = localStorage.getItem('correo') || '';

    perfilForm.nombre.value = nombre;
    perfilForm.correo.value = correo;

    perfilForm.addEventListener('submit', function(e) {
        e.preventDefault();

        //Guardar cambios
        localStorage.setItem('nombre', perfilForm.nombre.value);
        localStorage.setItem('correo', perfilForm.correo.value);

        alert('Perfil actualizado con exito');
    });
});