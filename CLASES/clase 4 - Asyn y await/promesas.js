const divider = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {

    if (divisor == 0) reject(' no se puede dividor por cero')
    else resolve(dividendo / divisor)

  })
}

divider(34, 7)
  .then(resulado => console.log('resultado', resulado))
  .catch(error => console.log('algo salio mal', error))

new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(9)
  }, 1000);
}).then(result => { console.log(result) })

// SINCRONISMO Y ASINCRONISMO
/* debe finalizar una funcion para que se ejecute otra, se van ejecutando en cascada
las operaciones sincronicas, son bloqueantes, las tareas no se pueden ejecuar hasta que la primera no se haya terminado


ASINCRONISMO: Son tareas que funcionan en paralelo a la ejecucion del programa, cada una se ejecuta segun su propio criterio, no determinamos cuando va a terminar
no son bloqueantes,las tareas oueden irse ejecutando mientras esta esta en curso


ASYN Y AWAY

then y catch tiene varios problemas para su uso, uno d eellos es el encapsulamiento que tiene, por eso surje asyn y await

*/

// async y await

const funcionAsincrona = async()=>{
  try {
    const resultado = await divider(10,5) //vamos a esperar la resolucion de esta funcion para poder coninuar
    console.log(resultado);
  } catch (error) {
    console.log('ERROR',error);
  }
}

funcionAsincrona()