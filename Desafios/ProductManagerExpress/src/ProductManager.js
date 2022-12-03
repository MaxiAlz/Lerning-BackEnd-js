import express from 'express'
import products from '../productosPrueba.json' assert { type: "json" }
// import countryTable from "./data/countries.json" assert { type: "json" }
// const fs = require('fs')


const app = express()
const server = app.listen(8080, () => console.log('estuchado 8080...'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = products

app.get('/products', (req, res) => {
  const { limit } = req.query
  if (limit) {
    const msg = 'la cantidad de productos solicitados es mayor a los que existen en sistemas'
    const productFilter = productos.filter(producto => producto.id <= limit)
    // const productsFilter = productos.length < limit ? { prductsLimit: productos.filter(producto => producto.id <= limit), message: msg } : productos.filter(producto => producto.id)
    if (productos.length < limit) {
      productFilter.push({ message: msg })
    }
    res.send({ productFilter })
  }
  res.send({ allProducts: productos })
})

app.get('/products/:idProducto', (req, res) => {
  const idProducto = req.params.idProducto
  const foundedProduct = productos.find(producto => producto.id == idProducto)

  if (!foundedProduct) {
    res.send({ error: 'El producto no existe' })
  }
  res.send({ foundedProduct })
})
