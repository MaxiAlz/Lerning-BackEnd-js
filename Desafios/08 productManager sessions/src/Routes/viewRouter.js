import { Router } from "express"
// import { productManager } from "../Managers/index.js"
import productModel from "../Models/product.model.js"

const router = Router()


router.get('/', async (req, res) => {
  //file system
  // const products = await productManager.getProducts()

  //deberia ser trayendo la clase de productManager: await productManager.getProducts()
  const products = await productModel.find().lean()
  res.render("home", { products })
})

router.get('/realTimeProducts',(req,res)=>{
  res.render('realTimeProducts')
})

router.get('/chat', (req,res)=>{
  res.render('chat')
})

export { router as viewRouter }