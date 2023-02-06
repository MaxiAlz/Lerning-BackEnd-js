import { Router } from "express";
import mongoose from "mongoose";
import cartModel from "../Models/carts.model.js";
// import mongoose from "mongoose";

const router = Router()

// devuelve todos los carritos en la base
router.get('/', async (req, res) => {
  try {
    const cartsAvailables = await cartModel.find({})
    res.json(cartsAvailables)
  } catch (error) {

  }
})
// devuelve un carrito por id
router.get('/:idCart', async (req, res) => {
  try {
    const { idCart } = req.params
    const cart = await cartModel.findById(idCart).populate('products.product') /* 'products,products' */

    console.log(cart)
    res.status(200).json({ succes: true, cart })
  } catch (error) {
    console.log(error);
  }
})

router.post('/', async (req, res) => {
  try {
    const body = req.body

    const newCart = await cartModel.create(body)
    res.json({ status: 'created', payload: newCart })
  } catch (error) {
    res.json({ status: error })
  }
})
// cargar productos a un carrito
router.post('/:idCart', async (req, res) => {
  const { idCart } = req.params
  const productsFromBody = req.body

  const cart = await cartModel.findById(idCart)

  if (cart) {
    if (!!productsFromBody.length) {
      productsFromBody.map(prod => {
        // cart.products.push(prod)
        cart.products.push({ product: prod })
      })
      const cardUpdated = await cartModel.updateOne({ _id: idCart }, cart)
      res.json({ cardUpdated })
      return
    }
    return res.json({ msg: "no se agrego ningun producto" })
  }

  if (!cart) {
    res.json({ error: "No se encontro el carrito" })
  }
})

router.delete('/:idCart', async (req, res) => {
  try {

    const { idCart } = req.params

    const response = await cartModel.deleteOne({ _id: idCart })

    if (response.deletedCount != 1) {
      res.status(400).json({ error: "no se encontro el producto" })
    }

    res.json(response)

  } catch (error) {
    console.log(error);
    // return res.status(500).json({error: "no se pudo eliminar el producto"})
  }
})




// router.post('/insert-product', async (req, res) => {
//   try {
//     const { products } = req.body
//     console.log(products);

//     const cart = await cartModel.findOne()

//     const saveProducts = await cartModel.insertMany()
//     res.json({ msg: products })
//   } catch (error) {
//     console.log(error);
//   }
// })

export { router as cartsRouter }