document.addEventListener("DOMContentLoaded",function(){
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

// Función para manejar la navegación fija
function navegacionFija() {
    // Seleccionar la barra de navegación y otras referencias necesarias
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    // Agregar un evento de desplazamiento a la ventana
    window.addEventListener('scroll', function() {
        // Verificar si la sección sobreFestival está fuera de la vista (arriba)
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            // Agregar clases para fijar la barra de navegación y aplicar estilos al cuerpo
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            // Quitar clases para volver a la posición normal
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

// Función para manejar el desplazamiento suave al hacer clic en los enlaces de navegación
function scrollNav() {
    // Seleccionar todos los enlaces dentro de la clase .navegacion-principal
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    // Iterar sobre cada enlace
    enlaces.forEach(enlace => {
        // Agregar un controlador de eventos de clic a cada enlace
        enlace.addEventListener('click', function(e) {
            // Prevenir el comportamiento predeterminado del enlace (navegación a otra página)
            e.preventDefault();

            // Obtener el valor del atributo href del enlace actual
            const seccionScroll = e.target.attributes.href.value;

            // Seleccionar la sección correspondiente utilizando el valor de href
            const seccion = document.querySelector(seccionScroll);

            // Desplazar suavemente a la sección seleccionada
            seccion.scrollIntoView({ behavior: 'smooth' });
        });
    });
}


function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}  

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}