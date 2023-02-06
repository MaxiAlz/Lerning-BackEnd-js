import { Router } from "express";
// import { productManager } from "../Managers/index.js";
import productModel from "../Models/product.model.js";

const router = Router()

router.get('/', async (req, res) => {
  //file system
  // const allProducts = await productManager.getProducts()

  //query:busca por categoria o disponibilidad debe devolver si esta disponible por el stock(es decir si el stock = nno disponible)
  //sort: debe devolver de manera ascendente o descendente, segun el precio de los productos
  try {
    const { limit, page, query, sort } = req.query

    const search = {}
    if (query) search['$or'] = [
      { category: query /* { $regex: query } */ },
      // { stock: { $regex: query } }
    ]
    //sort recibe: 'asc', 'desc', 1 o -1 respectivamente
    const paginateOptions = { limit: limit ?? 10, page: page ?? 0, sort: { price: sort } }
    const getProduct = await productModel.paginate(search, paginateOptions)

  //aca esta creando el campo next link y prevlink para la paginacion
    getProduct.prevLink = getProduct.hasPrevPage ? `?page=${getProduct.prevPage}` : '';

    getProduct.NextLink = getProduct.hasNextPage ? `?page=${getProduct.nextPage}` : ''

    getProduct.isValid = !(page <= 0 || page>getProduct.totalPages)

    // console.log(getProduct);
    const { docs, ...rest } = getProduct
    res.json({ status: 'success', payload: docs, options: rest })

  } catch (error) {
    console.log(error);
    // response.status = 'error'
  }


  // const getAllProducts = await productModel.find()
  // res.json({ success: true, msg: "all products in db",  cantidadDeProductos: `${ getAllProducts.length } `, product: getAllProducts })
})

router.post('/', async (req, res) => {
  try {
    const { tittle, description, price, code, thumbnail } = req.body

    console.log(req.body);

    if (!tittle || !description || !price || !code || !thumbnail) {
      return res.status(400).json({ error: "Todos los campos son requeridos" })
    }

    const validaProductExist = await productModel.find({ tittle: tittle })

    if (validaProductExist.length) {
      return res.status(400).json({ error: 'Ya existe un producto con el mismo nombre' })
    }

    const createNewProduct = await productModel.create(req.body)

    console.log("Se ha creado un nuevo producto");
    res.json({ success: 'created', product: createNewProduct })

    //file sistem:
    // const savedProduct = await productManager.saveProduct({ tittle, description, price, code })
    // res.send({ success: true, product: createNewProduct })

  } catch (error) {
    console.log(error);
  }
})
export { router as productsRouter };

// video en el minuto 00:48 donde empieza a hacer el formulario










// await cartModel.updateOne({ _id: cid, }, { $set: { "products.$[p].quantity": quantity, }, }, { arrayFilters: [{ "p._id": pid }] })