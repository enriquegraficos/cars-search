// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// contenedor para los resultados
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max -10;

// Generar objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color:''

}

// Eventos
document.addEventListener('DOMContentLoaded', ()=> {
    mostrarAutos(autos); // muestra los autos al cargar

    // llena las opcinoes de años
    llenarSelect();
} )

// events listeners para los selects de búsqueda
// change es para leer el html en este caso el select
    marca.addEventListener('change', e => {
        datosBusqueda.marca = e.target.value;
        filtrarAuto();
    });


    year.addEventListener('change', e => {
        datosBusqueda.year = parseInt( e.target.value ); // parseInt para convertir a número
        filtrarAuto();
    });

    minimo.addEventListener('change', e => {
        datosBusqueda.minimo = e.target.value;
        filtrarAuto();
    });

    maximo.addEventListener('change', e => {
        datosBusqueda.maximo = e.target.value;
        filtrarAuto();
    });
    puertas.addEventListener('change', e => {
        datosBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto();
    });
    transmision.addEventListener('change', e => {
        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    });
    color.addEventListener('change', e => {
        datosBusqueda.color = e.target.value;
        filtrarAuto();
    })

// funciones
function mostrarAutos(autos){
    limpiarHTML(); // Elimina el HTML previo
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color,} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - ${transmision}
        `;
        // Insertar en el html
        // appendchild no va a borrar el contenido previo
        resultado.appendChild(autoHTML); // agrega el html al div vacio
    })
}

// limpiar HTML

function limpiarHTML (){
    while(resultado.firstChild){ // mientra halla algo
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select

function llenarSelect(){
    for (let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de año al select
    }
}

// Funcion que filtra en base a la búsqueda
// esta funcion tomará otra función 
// filter es iterar

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);
    

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function filtrarMarca (auto){
    const {marca} = datosBusqueda;
    if(marca){ // si marca tiene algo 
        return auto.marca === marca;
    }
    // retorna el auto completos
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year ){ // si marca tiene algo 
        return auto.year === year;
    }
    // retorna el auto completos
    return auto;

}

function noResultado(auto){

    
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('error');
    noResultado.textContent = 'Sin resultados';
    resultado.appendChild(noResultado);
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo) { // si marca tiene algo 
        return auto.precio >= minimo;
    }
    // retorna el auto completos
    return auto;

}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas ){ // si marca tiene algo 
        return auto.puertas === puertas;
    }
    // retorna el auto completos
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision ){ // si marca tiene algo 
        return auto.transmision === transmision;
    }
    // retorna el auto completos
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}