import { Router } from "express";
// import { productManager } from "../Managers/index.js";
import productModel from "../Models/product.model.js";

const router = Router()

router.get('/', async (_req, res) => {
  //file system
  // const allProducts = await productManager.getProducts()

  const getAllProduct = await productModel.find()

  res.json({ success: true, products: getAllProduct })
})

router.post('/', async (req, res) => {
  try {
    const { tittle, description, price, code, thumbnail } = req.body

    if (!tittle || !description || !price || !code || !thumbnail) {
      return res.status(400).json({ error: "Todos los campos son requeridos" })
    }

    const validaProductExist = await productModel.find({ tittle: tittle })

    if (validaProductExist.length) {
      return res.status(400).json({ error: 'Ya existe un producto con el mismo nombre' })
    }

    const createNewProduct = await productModel.create(req.body)

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