document.addEventListener('DOMContentLoaded', ()=>{
    const proyectos = Array.from(document.querySelectorAll('#Proyectos .proyecto'));
    const paginacion = document.getElementById('paginacion');
    const proyectosPorPagina = 10;
    
    if (!paginacion || proyectos.length <= proyectosPorPagina){
        return;
    }

    let paginaAcutal = 1;
    const totalPaginas = Math.ceil(proyectos.length / proyectosPorPagina);

    const mostrarPagina = (pagina) => {
        paginaAcutal = pagina;
        const inicio = (inicio -1 ) * proyectosPorPagina;
        const fin = inicio + proyectosPorPagina;

        proyectos.forEach((proyecto, indice) => {
            const visible =indice >= inicio && indice < fin;
            proyecto.style.display = visible ? '': 'none';
        });

        
    };

    const crearBoton = (texto, pagina, deshabilitado = false) => {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.textContent = texto;
        boton.className = 'paginacion__boton';

        if (deshabilitado){
            boton.disabled = true;
        } else {
            boton.addEventListener('click', () => mostrarPagina(pagina));
        }

        return boton;
    }

    const actualizarControles = () => {
        paginacion.innerHTML = '';
        
        paginacion.appendChild(crearBoton('Anterior', paginaAcutal - 1, paginaAcutal === 1));

        for (let i = 1; i <= totalPaginas; i += 1){
            const boton = crearBoton(i.toString(), i, i === paginaAcutal);

            if(i === paginaAcutal){
                boton.classList.add('paginacion__boton--activo');
            }

            paginacion.appendChild(boton);
        }

        paginacion.append(crearBoton('Siguiente', paginaAcutal + 1, paginaAcutal === totalPaginas));
        paginacion.classList.add('activa');
    }

    mostrarPagina(1);

});