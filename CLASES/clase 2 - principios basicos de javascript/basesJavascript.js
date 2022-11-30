// tiposd e datos y variables

// ECMASCRIPT Es un estandard que se encarga de regir como debe ser interpretado javascript.

let i = 0

function myFunction() {
  i = 1
  let j = 2

  if (true) {
    console.log(i);
    console.log(j);
  }
}

myFunction()

// la variable const prohibe la reasignacion de valor

const user="usuario 1"
user = "hector" //ime da error, no puedo reasignar el valor

// sin embargo
const usuario = {name: "Hector"}
usuario.name = "pedro" //si se puede, por que modifico el valor y no el tipo de variable, sigue siendo un objeto

// FUNCIONES
// Es un blocke de codigo que trabaja sobre un scope interno

// FUNCIONES COMUNES
function miNombreEs(name) {
  let variable = name

  return variable
}

// FUNCIONES FLECHAS 
const saludarAlMostro =(name)=>{
  console.log('hola pa', name)
}
// principales ventajas de la => es que las podemos usar globalmente en cualquier lado, basicamente usarla como variables

let lista = []
const mostrarLista =()=>{
  if(!lista.length){
    console.log("lista vacia");
  }
  lista.forEach((element)=>{
    console.log(element)
  })

  return `longitud de la lista es ${lista.length}`
}

// classes en javascript
  