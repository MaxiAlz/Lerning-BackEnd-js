import { Router } from "express";
import userModel from "../Models/user.model.js";

const router = Router()

//crear nuevos usuarios
router.post('/register-user', async (req, res) => {
  try {
    const userData = req.body


    if (!userData.username || !userData.password) {
      console.log("Username y password son requeridas");
      return res.status(400).json({ error: "username y password son requeridos" })
    }

    const userCreated = await userModel.create(req.body)
    // validar que el usuario ya exista
    console.log(userCreated);
    return res.status(201).json({ user: userCreated })
  } catch (error) {
    console.log(error);
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({error: "Datos incorrectos"})
    }

    const user = await userModel.findOne({ email, password }).lean().exec()
    // console.log("user", user);
    if (!user) {
      console.log("No se encontro usuario");
      return res.status(401).json({ error: "nos se encontro el usuario" })
    }
    req.session.user = user
    // console.log(user);
    res.status(200).json({ user: user })
    // res.session?.user = user

  } catch (error) {
    console.log(error);
  }

})

router.get('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error)
      res.status(500).json({ error: "error" }).redirect('errorPage')
    }
    res.redirect('/login')
  })

})

export { router as sessionRouter }