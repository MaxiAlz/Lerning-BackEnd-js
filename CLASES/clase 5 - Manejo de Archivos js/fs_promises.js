const fs = require('fs')

const filename = './examplePromesas.txt'

const operacionesAsync = async ()=>{
    // retorna una promesa, sobreescribe el contenidos
    await fs.promises.writeFile(filename,'Hoy hay fulbito')

    // leer el archivo
    const contenido = await fs.promises.readFile(filename, 'utf-8')
    console.log(contenido);

    await fs.promises.appendFile(filename, '\n alla la estan saludando')

    const contenido2 = await fs.promises.readFile(filename, 'utf-8')
    console.log( 'Nuevo contenido: ',contenido2);

    // await fs.promises.unlink(filename)
}

operacionesAsync()
