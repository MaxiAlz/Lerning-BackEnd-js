const express = require('express')
const router = express.Router()
const fs = require('fs')

// const allProductsFile = JSON.parse(fs.readFileSync('productos.json', 'utf-8'))

// crear carrito
router.post('/', (req, res) => {
  const allCarts = fs.readFileSync('carrito.json', 'utf-8')
  // para crear el primer carrito dentro del listado si es que esta vacio
  if (!allCarts) {
    const firstCart = {
      cid: 1,
      products: []
    }
    return fs.writeFileSync('carrito.json', JSON.stringify([firstCart]))
  }
  // const asd = fs.readFileSync('carrito.json', 'utf-8')
  const cartParsed = JSON.parse(allCarts)
  const idCart = (cartParsed.length > 0) ? cartParsed[cartParsed.length - 1].cid + 1 : 1

  const newCart = {
    cid: idCart,
    products: []
  }
  cartParsed.push(newCart)
  fs.writeFileSync('carrito.json', JSON.stringify(cartParsed))

  res.send({ sucessfull: 'Carrito creado' })
})

// listar articulos del carrito
router.get('/:cid', (req, res) => {
  const cid = req.params.cid

  const cartFounded = JSON.parse(fs.readFileSync('carrito.json', 'utf-8')).find(cart => cart.cid == cid)

  if (!cartFounded) return res.send({ error: 'No se encontro ningun carrito con el id: ' + `${cid}` })

  const { products } = cartFounded
  res.send({ products })
})

router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid //id del carrito
  const pid = req.params.pid //id del producto a agregar

  // obtener los productos del carrito
  const cartFounded = JSON.parse(fs.readFileSync('carrito.json', 'utf-8')).find(cart => cart.cid == cid)
  if (!cartFounded) return res.send({ error: 'No se encontro ningun carrito con el id: ' + `${cid}` })

  const productsFromCart = cartFounded.products
  // obtengo los productos de la  base
  const allProductsInDataBase = JSON.parse(fs.readFileSync('productos.json', 'utf-8'))

  // vagregar el producto que me manda por params
  const productToAdd = allProductsInDataBase.find(prod => prod.id == pid)
  if (!productToAdd) return res.send({ error: 'No existe producto en la lista con el id: ' + `${pid}` })



  const newProductoAdd = {
    pid: productToAdd.id,
    quantity: 1
  }
  // verifico si existe en el carrito
  const isProductInCart = productsFromCart.find(prod => prod.pid == pid)


  console.log('isProductInCart', isProductInCart);

  // si no existe lo pusheo al array de productos
  if (!isProductInCart) {
    console.log('no existe el productp');
    productsFromCart.push(newProductoAdd)
  }
  // si ya existe le aumento la cantidad
  if (isProductInCart) {
    console.log('si existe el produco en la lista');
    productsFromCart.forEach(element => {
      if (element.pid == pid) {
        element.quantity++
      }
    });
    //  isProductInCart.quantity++
    //  productsFromCart
  }

  // actualizar la bas de datos con la info nueva

  // aca obtengo todos los carritos de la BD
  const allCarts = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'))

  const dataUpdated = JSON.stringify(allCarts.map(carrito => {
    if (carrito.cid == cid) {
      carrito.products = productsFromCart
      return carrito
    }
    return carrito
  }))

  fs.writeFileSync('carrito.json', dataUpdated)
  // console.log('productsFromCart', productsFromCart) // lista de productos actualizados
  // console.log('cartFounded', cartFounded.products) //aca esta los productos del carrito actualizados

  res.send({ dataUpdated: cartFounded })
})

module.exports = router