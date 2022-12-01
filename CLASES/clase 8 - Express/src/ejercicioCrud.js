import express from 'express'

const app = express()
const server = app.listen(8080, () => console.log("Server running..."))

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({extended: true}))

let frase = 'Hola gente, como andan todos por ahi?'

app.get('/api/frase',(req,res)=>{
    // devolver objeto que tenga un campo 'frase'
    res.send({frase})
})

// api/palabras/post, devolver objeto que va a tener un campo buscada, que va a tener la frase en la posicion
app.get('/api/frase/:pos', (req,res)=>{
    const pos = req.params.pos

    const palabra = frase.split(' ')[pos-1]

    res.send({palabra})
})

// post, /api/palabras. recibe un objeto con un campo palabra y lo agrega al final de la frase
// devolver un objet con 2 campos, agregada y pos

app.post('/api/palabras',(req,res)=>{
    const palabra = req.body.palabra

     frase = frase +' '+ palabra
    const pos = frase.split(' ').length
    res.send({palabra: palabra, pos: pos})
})
