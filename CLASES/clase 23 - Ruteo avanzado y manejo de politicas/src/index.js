import express from 'express'

const app = express()

//middleware para params
app.param('word', (req,res,next)=>{
  console.log(word)
  if (word) {
    req.word = null
  }else req.word = word

  next()
})

//custom router


app.get('/:word([a-zA-Z]+)', (req, res) => {
  const word = req.params.word

  res.send({ word })
})


// esto son cuando no entran en las rutas anteriores, devuelve una pag 404
app.get('*', (req,res)=>{
  res.status(404).send("No se puede encontrar la palabra indicada")
})


app.listen(4000, () => {
  console.log("listen 4000...");
})