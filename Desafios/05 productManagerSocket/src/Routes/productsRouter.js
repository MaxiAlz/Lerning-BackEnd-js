import { Router } from "express";
import { productManager } from "../Managers/index.js";

const router = Router()


router.get('/', async (req, res) => {
  const allProducts = await productManager.getProducts()

  res.send({ success: true, products: allProducts })
})

router.post('/', async (req, res) => {
  try {
    const { tittle, description, price, code, thumbnail } = req.body

    if (!tittle || !description || !price || !code || !thumbnail) {
      return res.status(400).send({ error: "Todos los campos son requeridos" })
    }
    const savedProduct = await productManager.saveProduct({ tittle, description, price, code })

    res.send({ success: true, product: savedProduct })

  } catch (error) {
    console.log(error);
  }
})
export { router as productsRouter };

// video en el minuto 00:48 donde empieza a hacer el formulario