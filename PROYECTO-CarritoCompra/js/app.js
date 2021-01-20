//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
//creamos la variable del carrito
let articulosCarrito = [];

//eventos
cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        //reseteamos el areglo
        articulosCarrito = [];

        //eliminamos todo el HTML
        limpiarHTML();
    })
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    //comprobamos que el usuario ha presionado en el boton de agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){
        //accedemos a todo el div que tiene el contenido del curso
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//eliminar curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        //iteramos sobre el carrito y mostramos su HTML
        carritoHTML();
    }
}

//lee el contenido de HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    //creamos un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                //retorna el objeto actualizado
                return curso;
            }else{
                //retorna los objetos que no son los duplicados
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito);
    carritoHTML();
}



//muestra el carrito de compras en el HTML
function carritoHTML(){

    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        //hacemos destructuring para extraer los valores
        const { imagen, titulo, precio, cantidad, id } = curso;
        //por cada arreglo en el carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        
        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compra al Storage
    sincronizarStorage();
}

//sincroniza con el localStorage
function sincronizarStorage(){  
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

}

//elimimnar los cursos del tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma rapida mejor perfomarce
    while(contenedorCarrito.firstChild){
        //eliminamos por referencia del padre hacia el hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}