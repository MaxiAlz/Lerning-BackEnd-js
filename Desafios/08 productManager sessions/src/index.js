import express from 'express'
import mongoose from 'mongoose'
import { productsRouter, viewRouter } from './Routes/indexRoutes.js'
import handlebars from 'express-handlebars'
import _dirname from './utils.js'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import FileStore from 'session-file-store'

import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import { cartsRouter } from './Routes/carts.router.js'
import { sessionRouter } from './Routes/session.router.js'
// import { productManager } from './Managers/index.js'

const app = express()
const PORT = 8080

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

const URI_MONGO_ATLAS = 'mongodb+srv://Maxi_Coder_BE:3iUVZ4wdaBRRLUfc@cluster0.coo8oqn.mongodb.net/?retryWrites=true&w=majority'


app.engine("hbs", handlebars.engine({
  extended: ".hbs",
  defaultLayout: "main.hbs"
}))

app.use(cors())
app.use(express.static(_dirname + '/public'))

app.set("view engine", "hbs")
app.set("views", _dirname + '/views') //aca iria el dirname


app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({ extended: true }))

// app.use(cookieParser())
//session
app.use(session({
  store: MongoStore.create({
    mongoUrl: URI_MONGO_ATLAS,
    dbName: 'ecommerce',
    mongoOptions: { useNewUrlParser: true/* , useUnifieldTopology: true  */ },
    ttl: 30
  }),
  secret: "asd455",
  resave: true,
  saveUninitialized: true
}))

function auth(req, res, next) {
  if (req.session?.user) return next()

  return res.status(401).json({ error: "error de autenticacion" })
}

//routes
app.use("/api/products", productsRouter);

app.use('/', viewRouter)

app.use('/api/carts', cartsRouter)

app.use('/api/users', sessionRouter)

mongoose.set('strictQuery', false)
// mongoose.connect('urlmongoatlas', /* { dbName: 'ecommerce' } */, callback)
mongoose.connect(URI_MONGO_ATLAS, { dbName: 'ecommerce' }, error => {
  if (error) {
    console.log("No se pudo conectar a la base de datos en mongo atlas");
    return
  }
  console.log("Conect con mongo atlas...");
  //si no ubo ningun error correr el app.listen

  const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
  server.on("error", (error) => {
    console.log(error);
  })
})


io.on("connection", async (socket) => {
  console.log(`new client conected Id: ${socket.id}`);

  socket.emit("channel_1", "hola pa")

  const products = await productModel.find()
  io.sockets.emit("products", products)
})