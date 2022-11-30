/* 
callback: es una funcion que se pase por argumento a otras funciones, que puede ejecupar ambar para un resultado

*/

// callbacks
const originales = [1, 5, 6, 3]

const callbackToMap = valor => valor * 2

const newValues = originales.map(callbackToMap)
console.log(newValues);

// crando un callback tipo Map

const myMap = (array, callback) => {
    const newArray = []

    for (const element of array) {
        const newElement = callback(element)
        newArray.push(newElement)
    }
    return newArray
}

const arrayNuevo = myMap(originales, x => x * 2)
console.log(arrayNuevo);

// define una funcion implicita para todos los arrays- es como crear metodos para ciertas tipos de datos
Array.prototype.myMap2 = (callback) => {
    const newArray = []
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        const newElement = callback(element)
        newArray.push(newElement)
    }
    return newArray
}

const miLista = originales.myMap2(x => x * 2)
console.log(miLista);


// callbacks 
const sumar = (num1, num2) => num1 + num2
const resta = (num1, num2) => num1 - num2
const multiplicar = (num1, num2) => num1 * num2
const dividir = (num1, num2) => num1 / num2

const realizarOperacion=(num1,num2,callback)=>{
    console.log('opracions');
    const result = callback(num1,num2)
    console.log('resultado es:', result);
}

realizarOperacion(2,5,sumar)