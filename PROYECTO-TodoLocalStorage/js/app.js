//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event Listeners
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        //leemos de localStorage, intenta buscar en localStorage los tweets y los convierte en json.parse
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}

//funciones
function agregarTweet(e){
    e.preventDefault();
    
    //texttarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    //validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        //evita que se ejecuten mas lineas de codigo
        return;
    }
    const tweetObj = {
        id: Date.now(),
        //tweet es igual a tweet: tweet
        tweet
    }
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //una vez agregado, creamos el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

    
}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //insertalo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        //elimina la alerta despues de 3 segundos
        mensajeError.remove();
    }, 3000);
}

//muestra un listado de los tweets
function crearHTML(){
    //limpiamos el HTML
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            //crear el HTML
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            //asignar el boton de eliminar
            li.appendChild(btnEliminar);
            //insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agrega los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    crearHTML();
}

//limpiamos el HTML
function limpiarHTML(){
    //mientras haya elementos
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}