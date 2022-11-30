const fs = require('fs')


const fileName = './fileAsync.txt'
// crear archivo asincronico => recibe un parametro callback
fs.writeFile(fileName, 'hola pollito2', (error) => {
  if (error) return console.log(error);

  console.log('Archivo guardado');
  // leer archivo
  fs.readFile(fileName, 'utf-8', (error, contenido) => {
    if (error) console.log('hubo un error');

    console.log('contenido: ', contenido);
    fs.appendFile(fileName, 'hola piscui!', (error) => {
      if (error) console.log('hubo un error agreagando contenido');

      console.log('Se agrego contenido extra');

      fs.unlink(fileName, (error) => {
        if (error) console.log('hubo un error eliminando archivo');

        console.log('Archivo eliminado');
      })
    })
  })
})

