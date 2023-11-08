const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})



// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
   
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    console.log(LIST)
}


// crear un evento para escuchar el enter y para habilitar el boton 

/*botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    console.log(tarea + " esa es la tarea")
    console.log(input)

    if(tarea){
        agregarTarea(tarea,id,false,false);
        id++;
        //input.value = '';
    }

})*/

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false);
        input.value = '';
        id++;
        console.log(LIST);
        }
    }
    
})

// ...

// Evento para capturar el envío del formulario-
document.getElementById('form-agregar-tarea').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const descripcion = input.value;
  
    if (descripcion) {
      const response = await fetch('/agregar-tarea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: descripcion }),
      });
  
      if (response.ok) {
        // La tarea se agregó exitosamente
        agregarTarea(descripcion, id, false, false);
        input.value = '';
        id++;
      } else {
        console.log('Error al agregar tarea');
      }
    }
  });
  



//Marcar como realizada una tarea
lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    //localStorage.setItem('TODO',JSON.stringify(LIST))
})


//hasta aqui todo bien



