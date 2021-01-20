//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = 	
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//eventos
eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar email
    btnEnviar.addEventListener('click', enviarEmail);
    

    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
    
}

//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//validar formulario
function validarFormulario(e){
    //validamos que el campo no este vacio
    if(e.target.value.length > 0){
        //eliminar los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        //cuando tenemos un error
        mostrarError('Todos los campos son obligatorios');
    }
        //
    if(e.target.type === 'email'){
        //hacemos la validacion del formulario con expresiones regulares
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            //cuando tenemos un error
            mostrarError('Email no válido');
        }
    }

    //comprobamos la validacion
    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}


//funcion que muestra un mensaje de error
function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    //comprobamos  el error para que no se repita muchas veces
    if(errores.length === 0){
        //agregamos el mensaje de error
    formulario.appendChild(mensajeError);
    }
}

//enviar email
function enviarEmail(e){
    e.preventDefault();
    
    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 minutos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        //eliminar el mensaje de exito
        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 4000);
    }, 3000);
}

//funcion que resetea el formulario
function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}