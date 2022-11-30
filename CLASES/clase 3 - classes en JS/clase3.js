/* 
operador exponencial **
manejo de arrai includes

*/
//  Operador exponencial **
const valores = [1, 5, 6, 3, 2]
const potencia = valores.map((numero,indice) => numero**indice)
// console.log(potencia);

// metodo include
let nombre = ['juan', 'maxi', 'emiliano', 'juancito','pepito','raul']
if(nombre.includes('juan')){
    console.log('juan llego!');
}else {
    console.log('no esta juan');
}

// ECMASCRIPT  8 => implementacion del objeto Object

// entri

const impuestos = {
    'impuestoIVA': 16,
    'renta': 80,
    'carro':170
}

// devuelve en pares de arrays con llave valor => ['impuestoIVA': 16]
let parLlaveValor = Object.entries(impuestos)
// console.log(parLlaveValor);

// devuelve las key con un array de strings  con sus nombres
let justKey = Object.keys(impuestos)
console.log(justKey);

// devuelve un array de valores
let justValues = Object.values(impuestos)
console.log(justValues);

// reduce: Sirve para ir acumulando un valor, es un objeto que acumula
// ejemplo que acumule los impuestos totales
let impuestosTotales = justValues.reduce((acumulado, elemento)=>{
    console.log("=>",acumulado,elemento);
    return elemento+acumulado
})
console.log(impuestosTotales);

// ESCMASCRIPT 9 resolver promesas con .finally() para atender una promesa, se cumpla o no se cumpla
// Desestructuracion o spreed operator

const objeto1 ={
    fieldas1:222,
    fielsd2: 'cosa',
    fiedld3:true
}

const objeto2={
    field1:'casas',
    field2: [2,3,5,8,9]
}

// desestructuracion
const {fieldas1,fielsd2} = objeto1
console.log(fieldas1,fielsd2);

// unir los 2 objetos en unos

const objeto3 = {...objeto1, ...objeto2}
console.log(objeto3);

const objeto4={
    asd:'asda',
    dfg:'rtrt',
    thf:true
}
// REST OPERATOR
const {asd,...rest}=objeto4
console.log(rest);

// RRAY FLAT => es para limpiar los array que estan mas ordenads
const arrayAnidado = [1,8,5,2,-5,-9,[21,63,54,-53, [8,5]]]

const resolve = arrayAnidado.flat()
console.log(resolve);

// ECMASCRITPT 11 => operador nulish
// const varTest = undefined
const varTest = 0

// los 0,undefie y null generan falsos
const varAsignable = varTest || "sin valor"
console.log("varAsignable",varAsignable);

// verifica el 0 como un valor posible
const varAsignable2= varTest ?? "sin valor"
console.log("varAsignable2",varAsignable2);


// instanciar atributos privados y publicos

class Persona {
    // atributo privado
    #fullname
    constructor(name,lastName){
        this.name = name,
        this.lastName=lastName
        this.#fullname= `${name} ${lastName}}`
    }
    // para acceder a las variables privadas

    // getter
    getFullname=()=>{
        return this.#fullname
    }
}

let juan = new Persona('juancito', 'viglioco')
console.log(juan.name); 
console.log(juan.getFullname()); 