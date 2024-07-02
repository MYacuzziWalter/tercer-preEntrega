// Buenas Fabri...como va?
// quiero hacer como final la lista de tareas, donde se pueda ver la fecha
// en la que agregaste la tarea...que despues de cierto tiempo la tarea
// se borre automaticamente
// a cada tarea lo podria poner un comentario si quisiera
// poner un recordatorio cada vez que abra la app con la siguiente tarea a hacer
const input = document.querySelector('input');
const botonAgregar = document.querySelector('.btnAgregar');
const listaDeTareas = document.querySelector('ul');
const listaVacia = document.querySelector('.vacio');

// Cargar las tareas del local, si no hay ninguna tarea guardada previamente
// empezamos con al array tareas vacio.
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// guardar las tareas en el Local bajo la key tareas, y las pasamos a string para poder guardarlas 
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


// cada vez que cliqueamos sobre el boton pushamos el texto escrito en el imput
// tomamos el texto y guardamos la tarea 
// esto sucede si el al menos ingreso un caracter 
// despues hacemos que el input se reinicie 
botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();

    const texto = input.value;

    if (texto !== "") {
        tareas.push(texto);
        guardarTareas();
        agregarTarea(texto);
        input.value = "";
    } else {
        // Mostrar un mensaje si el input está vacío

        alert("Por favor, ingrese una tarea."); 
    }
});


// cada vez que el usuario crea una tarea... creamos una lista con el parrafo dentro.
//  a la lista le agregamos el texto y el boton para poder eliminar la tarea
// a todo eso lo anidamos dentro de la ul
// 
function agregarTarea(texto) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = texto;

    li.appendChild(p);
    li.appendChild(addBotonX());
    listaDeTareas.appendChild(li);
    listaVacia.style.display = 'none';
}



// el boton que agregamos a la lista junto con el parrafo le damos la funcion de borrar
// le damos un estilo al boton con classlist
// 
function addBotonX() {
    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = "X";
    botonBorrar.classList = "btnBorrar";

    botonBorrar.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        const texto = item.querySelector('p').textContent;
        tareas = tareas.filter(tarea => tarea !== texto);
        guardarTareas();
        listaDeTareas.removeChild(item);
        if (tareas.length === 0) {
            listaVacia.style.display = 'block';
        }
    });

    return botonBorrar;
}

// Cargar las tareas al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    tareas.forEach(tarea in agregarTarea(tarea));
    if (tareas.length === 0) {
        listaVacia.style.display = 'block';
    }
});













//cambiar de modo oscuro/claro, implementado de la clase JSON
let modo = localStorage.getItem('modo')


if (modo) {
    document.body.classList = modo
}

let boton = document.querySelector('.cambiar')

boton.onclick = ()=> {

    if (document.body.classList == 'modo_oscuro') {
        document.body.classList = 'modo_claro'
    } else {
        document.body.classList = 'modo_oscuro'
    }
    let modo_pantalla = document.body.classList

    localStorage.setItem('modo', modo_pantalla)
}


