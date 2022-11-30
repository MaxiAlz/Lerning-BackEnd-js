/* modelo de peticion-respuesta o request-response
modelo donde el cliente hace una peticion desde el lado del cliente y el servidor le responde

el servidor puede recibir multiples peticiones de cualquier lado

EL peticion no se apaga, queda siempre el programa escuchando para estar atento a cualquier peticion

cliente - requet
setrvidor - response

instalacion de nodemon de forma global: se encarga de levantar siempre el servidor y mantenerlo actualizado
*/

const http = require('http')

// creando un servidor
const server = http.createServer((request,response)=>{
    response.end('saludos poio')
})

// aca pongo a escuchar el servidor en el puerto que le indique
server.listen(8080,()=>{
    console.log('escuchando puerto 8080');
})

// para ver la respuesta en el navegador podemos usar http://127.0.0.1:8080/ o localhost:8080

// para utilizar express:
// npm initi -y
// npm i express
// crear carpeta src/index.js
