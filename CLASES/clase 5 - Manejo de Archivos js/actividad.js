const fs = require('fs')

// leer el archivo.json
const pakJason = './package.json'


// leer el objeto como viene en string
const contentStr = fs.promises.readFile(pakJason, 'utf-8')
.then(content => {
    // console.log(content)
    console.log(content);
    // console.log('tamaño: ',content.length);
}).catch(e => console.log(e))


const contenObj = fs.promises.readFile(pakJason, 'utf-8').then(contenido => {
    const contentString = JSON.parse(contenido)
    console.log(contentString);
    // return contentString
}).catch(e => console.log(e))

// console.log(contenObj.length);


const info = {
    contenidoStr: contentStr,
    contenidoObj:contenObj,
    size: contenObj.length
}

console.log(info);