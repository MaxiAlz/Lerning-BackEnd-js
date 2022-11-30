const fs = require('fs')

const data = 'Hola pollo!'
const fileName = './ejemplo.txt'

// Guardar un archivo de forma asincronica, pero este metodo pisa la daata que ya esta en la ruta o sea la reemplaza
// fs.writeFileSync('./ejemplo.txt', data)
fs.writeFileSync('./ejemplo.txt', data)

// para agregar informacion al archivo y que no se pise se usa lo siguiente
fs.appendFileSync(fileName, 'Estoy agregando data desde appenFileSync \n')


// leer el archivo de forma sincronica(uno atras de otro)
const contenido = fs.readFileSync(fileName, 'utf-8')

// comprobar si existe un archivo
if (fs.existsSync('./ejemplo.txt')) {
    console.log('Existe el archivos');
} else console.log('no existe pa');

// borrar archivos
// fs.unlinkSync(fileName)

console.log(contenido);