import express from 'express'
import mongoose from 'mongoose'
import { productsRouter, viewRouter } from './Routes/indexRoutes.js'
import handlebars from 'express-handlebars'
import _dirname from './utils.js'

import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
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

app.use(express.static(_dirname + '/public'))

app.set("view engine", "hbs")
app.set("views", _dirname + '/views') //aca iria el dirname


app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter);

app.use('/', viewRouter)

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

  const products = await  productModel.find()
  io.sockets.emit("products", products)
})