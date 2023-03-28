import { Router } from "express";
import passport from "passport";

const router = Router()


//crear nuevos usuarios
router.post('/register-user', passport.authenticate('register', { failureRedirect: '/session/fail-register' }), async (req, res) => {
  // try {
  // const userData = req.body
  // userData.password = createHash(userData.password)
  // if (!userData.username || !userData.password) {
  //   console.log("Username y password son requeridas");
  //   return res.status(400).json({ error: "username y password son requeridos" })
  // }

  // const userCreated = await userModel.create(userData)
  // // // validar que el usuario ya exista
  // console.log(userCreated);
  // return res.status(201).json({ user: userCreated })
  return res.status(201).send('register succes!!')
  // } catch (error) {
  //   console.log(error);
  // }
})

router.get('/fail-register', async (req, res) => {
  console.error('failed Strategy')
  res.send({ error: 'Failed' })
})

router.post('/login-local', passport.authenticate('login', '/session/fail-login'), async (req, res) => {
  if (!req.user) {
    return res.status(400).send('Datos incorrectos')
  }
  req.session.user = req.user
  res.send('Login Success')
})
router.get('/fail-login', (req, res) => {
  console.error('Failed login');
  res.send({ error: 'Failed login' })
})

router.post('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error)
      res.status(500).json({ error: "error" })/* .redirect('errorPage') */
    }
    // res.redirect('/login')
  })
})

// login con github
router.get(
  '/login-github',
  passport.authenticate('github', {
    scope: ['user:email']
  }),
  async (req, res) => { }
)

router.get(
  '/githubCallback',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false
  }),
  async (req, res) => {
    const user = JSON.stringify(req.user)
    req.session.user = req.user
    res.redirect('/')
    res.status(200).json(req.user)
    console.log("delCallback=>",req.user);
    // res.status(200).send(user)
  }
)

export { router as sessionRouter }