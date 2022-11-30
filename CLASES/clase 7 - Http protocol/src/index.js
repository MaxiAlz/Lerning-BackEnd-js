const express = require('express')

const app = express()

// crear un servidor con express
app.get('/saludo', (request, response) => {
    response.send('endpoint saludo')
})
app.get('/saludar/:nombre/:apellido', (request, response) => {
    // nombre va a venir de req.params
    console.log(request.params);

    const saludo = `saludos a ${request.params.nombre} ${request.params.apellido}`
    response.send(saludo)
})



const html =  "<h1 style='color:blue;'> Bienvenida </h1>"

const usuario = {
    name:'maxi',
    lastName:'Alzugaray',
    age:23
}

app.get('/bienvenida', (req, res) => {
    res.send(html)
})

app.get('/usuarios', (req,res)=>{
    res.send(usuario)
})

app.listen(8080, () => {
    console.log('Escuchando puerto 8080');
})
