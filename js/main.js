document.addEventListener('DOMContentLoaded', () => {
    inicializarPaginacion();
    inicializarCursos();
});

function inicializarPaginacion() {
    const proyectos = Array.from(document.querySelectorAll('#Proyectos .proyecto'));
    const paginacion = document.getElementById('paginacion');
    const proyectosPorPagina = 10;
    
    if (!paginacion || proyectos.length <= proyectosPorPagina) {
        return;
    }

    let paginaActual = 1;
    const totalPaginas = Math.ceil(proyectos.length / proyectosPorPagina);

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

        for (let i = 1; i <= totalPaginas; i += 1){
            const boton = crearBoton(i.toString(), i, i === paginaActual);

            if(i === paginaActual){
                boton.classList.add('paginacion__boton--activo');
            }

            paginacion.appendChild(boton);
        }

        paginacion.append(crearBoton('Siguiente', paginaActual + 1, paginaActual === totalPaginas));
        paginacion.classList.add('activa');
    }

    const mostrarPagina = (pagina) => {
        paginaActual = pagina;
        const inicio = (pagina - 1) * proyectosPorPagina;
        const fin = inicio + proyectosPorPagina;

        proyectos.forEach((proyecto, indice) => {
            const visible = indice >= inicio && indice < fin;
            proyecto.style.display = visible ? '' : 'none';
        });

        actualizarControles();
    };

    mostrarPagina(1);

};

function inicializarCursos() {
    const grupos = document.querySelectorAll('.cursos__grupo');

    grupos.forEach((grupo) => {
        const titulo = grupo.querySelector('h3');
        const lista = grupo.querySelector('.cursos__lista');

        if (!titulo || !lista) {
            return;
        }

        const alternarLista = () => {
            const estaOculta = lista.style.display === 'none';

            if (estaOculta) {
                lista.style.display = 'flex';
                titulo.style.fontSize = '1.5rem';
                titulo.setAttribute('aria-expanded', 'true');
                lista.setAttribute('aria-hidden', 'false');
            } else {
                lista.style.display = 'none';
                titulo.style.fontSize = '';
                titulo.setAttribute('aria-expanded', 'false');
                lista.setAttribute('aria-hidden', 'true');
            }
        };

        lista.style.display = 'none';
        titulo.style.cursor = 'pointer';
        titulo.setAttribute('role', 'button');
        titulo.setAttribute('tabindex', '0');
        titulo.setAttribute('aria-expanded', 'false');
        lista.setAttribute('aria-hidden', 'true');

        titulo.addEventListener('click', alternarLista);
        titulo.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternarLista();
            }
        });
    });
}