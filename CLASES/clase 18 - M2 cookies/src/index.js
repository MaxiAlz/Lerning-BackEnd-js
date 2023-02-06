import express from 'express'
import cookieParser from 'cookie-parser'


const app = express()

//middleware
app.use(cookieParser('alugarayQvc'))

app.get('/', (req, res) => {
  res.send('ok')
})
//setear un cookie
app.get('/setCookie', (req, res) => {
  // res.cookie('cookieMaxi', /* lo que le vamos a guardar */ 'Que onda pibe', /* tiempo de vida d ela cookie */{ maxAge: 120000 }).send('Cookie seteada')
  // res.cookie('cookieMaxi', 'Que onda pibe', { maxAge: 120000 }).send('Cookie seteada')
  res.cookie('cookieMaxi', 'Que onda pibe').send('Cookie seteada')

  
})
//obtener una cookie
app.get('/getCookie', (req, res) => {
  
  res.send('info: ' + JSON.stringify(req.cookies))
})
//eliminar una cookie
app.get('/', (req, res) => {
  res.clearCookie('')
})


//*************agregar seguridad a las cookies********************** */
//en caso que la cookie sea modificada podemos decir que quedara invalida, eso se hace pasandolle un texto por el argumento de cookieParser('aca va el texto) se le llama cookie con firma

//cookie con firma
app.set('/setSignedCookie', (req,res)=>{
  res.cookie('signedCookie', 'cosa con firma', {signed: true}).send('cookie')
})



app.listen(8080, () => {
  console.log('running server ...');
})