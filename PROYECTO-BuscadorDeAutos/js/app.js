//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
//contenedor para los resultados
const resultado = document.querySelector('#resultado');


//año maximo y minimo
const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//eventos
document.addEventListener('DOMContentLoaded', ()=> {
    //muestra los automoviles al cargar
    mostrarAutos(autos);

    //llena las opciones de años
    llenarSelect();
});

//event Listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    //llamamos a  la funcion para filtrar el auto dada una marca
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
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
    console.log(datosBusqueda)
});

//funciones
function mostrarAutos(autos){
    //elimina el HTML previo
    limpiarHTML();
    autos.forEach( auto => {
        //utilizamos destructuring para extraer los datos
        const { marca, modelo, year, puertas, transmision, precio, color } =  auto;
        //creamos un parrafo para cada automovil
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} -  Precio: ${precio} - Color: ${color};
            
        `;

        //insertar en el html
        resultado.appendChild(autoHTML);
    });
}

//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelect(){
    
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion .value = i;
        opcion.textContent = i;
        //agregamos la opcion de año al select
        year.appendChild(opcion);
    }
}

//funcion que filtra en base a la busquda
function filtrarAuto(){
    
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}
//funcion que muestra un mensaje cuando no hay resultados
function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados, Intenta con otras palabras de Búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const { marca} = datosBusqueda;
    //filtramos por la marca
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

//filtramos por el año
function filtrarYear(auto){
    const { year} = datosBusqueda;
    if(year){
        return auto.year === year;
    }
    return auto;
}

//filtramos por precio minimo
function filtrarMinimo(auto){
    const { minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

//filtranos por precio maximo
function filtrarMaximo(auto){
    const { maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

//filtramos por puertas
function filtrarPuertas(auto){
    const { puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}