const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color');
const spinner = document.querySelector('#spinner');

// contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max -10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:'',
}

// cuando el html se carga
document.addEventListener('DOMContentLoaded', ()=> {
   
    
    // mostrarAutos(autos); // muestra los carros a cargar

    // llena las opciones de años
    llenarSelect();
  

})

// event listener para los select
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
  
    filtrarAuto();
})

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value); // convertimos string a número
    filtrarAuto();
})

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', e=> {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e=> {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})


color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
})

//funtions
function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {

        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');
        autoHTML.classList.add('text-resultado')
        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - ${precio} Color: ${color}   
        `
        
        
        resultado.appendChild(autoHTML);
        
    })
}


// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    
}

// Genera los años del select
function llenarSelect(){
    for(let i =max; i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value=i;
        opcion.textContent=i;
        year.appendChild(opcion); // agrega cada opción de año al select
    }
}


// función que filtra en base a la búsqueda

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); // generamos un arreglo nuevo
  
   if(resultado.length){
    spinner.classList.remove('container-spinner');
       setTimeout(()=>{
        spinner.classList.add('container-spinner');
        mostrarAutos(resultado);
    }, 1000)

    }
    else{
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta');
    noResultado.textContent = 'Sin resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){ // va a comparar la marca unicamente si el usuario hay seleccionado marca
        return auto.marca === marca;
    }
    return auto; // muestra todos los carros
}

// todos los datos de un formulario siempre vendrán como string
function filtrarYear(auto){
    const {year} = datosBusqueda;
   
    if(year){ // va a comparar la marca unicamente si el usuario hay seleccionado marca
        return auto.year === year; // operador stricto revisa operador y dato
    }
    return auto; // muestra todos los carros
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
   
    if(minimo){ // 
        return auto.precio >= minimo ; 
    }
    return auto; 
}



function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
   
    if(maximo){ // 
        return auto.precio <= maximo ; 
    }
    return auto; 
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
   
    if(puertas){ // 
        return auto.puertas === puertas ; 
    }
    return auto; 
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
   
    if(transmision){ // 
        return auto.transmision === transmision ; 
    }
    return auto; 
}



function filtrarColor(auto){
    const {color} = datosBusqueda;
   
    if(color){ // 
        return auto.color === color ; 
    }
    return auto; 
}

