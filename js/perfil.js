document.addEventListener('DOMContentLoaded', function () {
    const perfilForm = document.getElementById('perfilForm');
    const perfilNombre = document.getElementById('perfil-nombre');
    const perfilCorreo = document.getElementById('perfil-correo');

    // Cargar informacion del susuario
    const nombre = localStorage.getItem('nombre') || '';
    const correo = localStorage.getItem('correo') || '';

    perfilForm.nombre.value = nombre;
    perfilForm.correo.value = correo;

    perfilNombre.textContent = nombre;
    perfilCorreo.textContent = correo;

    perfilForm.addEventListener('submit', function(e) {
        e.preventDefault();

        //Guardar cambios
        localStorage.setItem('nombre', perfilForm.nombre.value);
        localStorage.setItem('correo', perfilForm.correo.value);

        // Reflejar los cambios en la parte del perfil
        perfilNombre.textContent = perfilForm.nombre.value;
        perfilCorreo.textContent = perfilForm.correo.value;

        alert('Perfil actualizado con exito');
    });
});