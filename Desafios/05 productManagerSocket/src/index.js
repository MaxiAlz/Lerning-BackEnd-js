import express from 'express'
import { productsRouter, viewRouter } from './Routes/indexRoutes.js'
import handlebars from 'express-handlebars'

import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import { productManager } from './Managers/index.js'

const app = express()
const PORT = 8080

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

app.engine("hbs", handlebars.engine({
  extended: ".hbs",
  defaultLayout: "main.hbs"
}))

app.use(express.static("public"))

app.set("view engine", "hbs")
app.set("views", "./src/views") //aca iria el dirname

// app.get('/', (req,res)=>{
//   res.render("home")
// })

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter);
app.use('/', viewRouter)
const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

server.on("error", (error) => {
  console.log(error);
})

io.on("connection", async (socket) => {
  console.log(`new client conected Id: ${socket.id}`);

  socket.emit("channel_1", "hola pa")

  const products = await productManager.getProducts()
  io.sockets.emit("products", products)
})