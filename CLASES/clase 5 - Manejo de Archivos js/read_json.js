const fs = require('fs')

fs.promises.readFile('DB.json', 'utf-8')
.then(contenido => {
    console.log(contenido);

    // editar contenido
    const jsonContenido = JSON.parse(contenido)
    jsonContenido.edad = 33
    console.log(jsonContenido);
})
.catch(e=>{
    console.log(e);
})