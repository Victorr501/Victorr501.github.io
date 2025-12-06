document.addEventListener('DOMContentLoaded', () => {
    const listaActualizaciones = document.querySelector('.blog-entradas__lista');
    const paginacion = document.getElementById('paginacion-actualizaciones');
    const entradasPorPagina = 5;

    if (!listaActualizaciones) {
        return;
    }

    const entradas = Array.from(listaActualizaciones.querySelectorAll('.blog-entrada'));

    if (!paginacion || entradas.length <= entradasPorPagina) {
        return;
    }

    let paginaActual = 1;
    const totalPaginas = Math.ceil(entradas.length / entradasPorPagina);

    const mostrarPagina = (pagina) => {
        paginaActual = pagina;
        const inicio = (pagina - 1) * entradasPorPagina;
        const fin = inicio + entradasPorPagina;

        entradas.forEach((entrada, indice) => {
            const visible = indice >= inicio && indice < fin;
            entrada.style.display = visible ? '' : 'none';
        });

        actualizarControles();
    };

    const crearBoton = (texto, pagina, deshabilitado = false) => {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.textContent = texto;
        boton.className = 'paginacion__boton';

        if (deshabilitado) {
            boton.disabled = true;
        } else {
            boton.addEventListener('click', () => mostrarPagina(pagina));
        }

        return boton;
    };

    const actualizarControles = () => {
        paginacion.innerHTML = '';

        paginacion.appendChild(crearBoton('Anterior', paginaActual - 1, paginaActual === 1));

        for (let i = 1; i <= totalPaginas; i += 1) {
            const boton = crearBoton(i.toString(), i, i === paginaActual);

            if (i === paginaActual) {
                boton.classList.add('paginacion__boton--activo');
            }

            paginacion.appendChild(boton);
        }

        paginacion.appendChild(crearBoton('Siguiente', paginaActual + 1, paginaActual === totalPaginas));
        paginacion.classList.add('activa');
    };

    mostrarPagina(1);
});