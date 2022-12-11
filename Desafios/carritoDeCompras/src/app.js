const express = require("express") ;
// import productsRouter from './routes/productsRouter'
const productsRouter = require('./routes/productsRouter')
const cartRouter = require('./routes/cartRouter')
const app = express()

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({ extended: true }))


app.use('/api/products',productsRouter)

app.use('/api/carts', cartRouter)


app.listen(8080)
console.log('servidor running...');