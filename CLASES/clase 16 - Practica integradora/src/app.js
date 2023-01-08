import express from 'express'
import _dirname from './utils.js'
import { pokeRouter } from './routes/pokeApi.route.js'
import { pokeViews } from './routes/pokeViews.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'


const app = express()
const PORT = 8080

//esto es para traer la informacion de los post como json
app.use(express.json())

// definir el motor de plantillas
app.engine('handlebars', handlebars.engine())
// setear la ubicacion de las plantillas
app.set('views', _dirname + '/views')
//setear el motor en la aplicacion
app.set('view engine', 'handlebars')

//configuramos carpetas publicas
app.use(express.static(_dirname + '/public'))


// CONFIGURACION DE RUTAS 

//este endpoint renderiza las vistas en html (es literalmente como el router de react
app.use('/pokemon', pokeViews)

//este endpoit es el que le pega al servidor y trae los datos
app.use('/api/pokemon', pokeRouter)

app.get('/', (req, res) => {
    res.send('todo ok')
})

const MONGO_URI = 'mongodb+srv://Maxi_Coder_BE:3iUVZ4wdaBRRLUfc@cluster0.coo8oqn.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI, error => {
    if (error) {
        console.log("No se pudo conectar a la base de datos en mongo atlas");
        return
    }
    console.log("Conect con mongo atlas...");
    //si no ubo ningun error correr el app.listen
    app.listen(PORT, () => { console.log("server running port 8080...") })
})

// app.listen(PORT, () => { console.log("server running port 8080...") })


// https://cloud.mongodb.com/v2/63bb2b1e90eac42ef29e31d6#/metrics/replicaSet/63bb2b821e5ced2dc3b5bc3f/explorer/test/pokemons/find