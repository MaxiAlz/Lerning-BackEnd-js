const express = require('express')
const router = express.Router()
const products = require('../../productos.json')
const fs = require('fs')

const allproducts = products

// rutas: /products y /carts
// ruta get de products => listar todos los productos y con la limitacion , /:id traer producto mediante id
/* ruta post => agregar un producto con id(autogenerado),tittle,description,code,price,status... etc
ruta put/:id =>  debera tomar y actualizar los campos enviados desde body, menos el id
ruta delete /:id => debe eliminar el producto con el id indicado


carrito: Tendra su ruta en api/carts
ruta post: / dereba crear un carrito nuevo: con id,products[] 
ruta get/:cid => listas los productos de ese carrito
post/:cid => debe agregar los productos al carrito asignado por id
 */
// /products
router.get('/', (req, res) => {
  const { limit } = req.query
  const msg = 'La cantidad solicitada es mayor a los productos actuales'
  if (!limit) return res.json({ allproducts })

  if (limit) {
    const productsFilter = allproducts.filter(product => product.id <= limit)
    if (limit > allproducts.length) {
      productsFilter.push({ msg })
    }
    res.json({ productsFilter })
  }
})

router.get('/:idProducto', (req, res) => {
  const idProducto = req.params.idProducto
  const productoEncontrado = allproducts.find(producto => producto.id == idProducto)
  if (!productoEncontrado) return res.json({ error: "No se encontro ningun producto con ese id" })
  res.send({ productoEncontrado })
})

router.post('/', (req, res) => {
  const newProduct = req.body
  const { tittle, description, code, price, stock, category, thumbnail } = newProduct
  const id = (allproducts.length > 0) ? allproducts[allproducts.length - 1].id + 1 : 1
  newProduct.id = id
  newProduct.status = true

  if (!tittle || !description || !code || !price || !stock || !category) {
    return res.send({ error: 'Algun campo esta incompleto' })
  }

  const allProductsFile = JSON.parse(fs.readFileSync('productos.json', 'utf-8'))
  allProductsFile.push(newProduct)
  const newData = JSON.stringify(allProductsFile)
  fs.promises.writeFile('productos.json', newData)
  res.json({ succesfull: 'Nuevo producto creado' })
})

// body de prueba post
// {
//   "tittle":"Cosa nueva",
//   "description":"Descripcion del producto",
//   "code":"asd456",
//   "price":520,
//   "status": "",
//   "stock":20,
//   "category":"electronicos",
//   "thumbnails":["url_1","url_2"]
// }

router.put('/:idProducto', (req, res) => {
  const idProducto = req.params.idProducto
  const dataToUpdate = req.body //tipo objeto
  const allProductsFile = JSON.parse(fs.readFileSync('productos.json', 'utf-8'))

  const productFounded = allProductsFile.find(product => product.id == idProducto)
  if (!productFounded) return res.send({ error: 'No se encontro un producto para actualizar' })

  dataToUpdate.id = idProducto

  allProductsFile.forEach(product => {
    if (product.id == idProducto) {
      product = dataToUpdate
    }
  });
  console.log(allProductsFile);

  const dataUpdated = JSON.stringify(allProductsFile)
  fs.promises.writeFile('productos.json', dataUpdated)
  // console.log(allProductsFile);
  res.send({updated: dataToUpdate})
})

router.delete('/:idProducto', (req,res)=>{
  const idProducto = req.params.idProducto
  const allProductsFile = JSON.parse(fs.readFileSync('productos.json', 'utf-8'))
  const productToDelete = allProductsFile.find(product => product.id == idProducto)

  if(productToDelete) {
    const productsFiter = allProductsFile.filter(product => product.id != idProducto)
    fs.promises.writeFile('productos.json', JSON.stringify(productsFiter))
    return res.send({deleted: productToDelete})
  }
})
// export default router
module.exports = router