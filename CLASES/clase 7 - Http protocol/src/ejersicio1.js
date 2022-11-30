const express = require('express')

const app = express()

const users = [
    {id:1 ,nombre: 'German', apellido:'rodas'},
    {id:2 ,nombre: 'juan', apellido:'rodrigez'},
    {id:3 ,nombre: 'pablo', apellido:'asdd'}
]

app.use(express.urlencoded({extended: true}))

app.get('ejemploquery', (req,res)=>{
    console.log(req.query);

    res.send('ejemplo query')
})

app.get('/', (req,res) => {
    res.send(users)
})

app.get('/:id', (req,res)=>{
    const id = req.params.id
    const user = users.find( user => user.id === id)
    if(!user) return res.send({error: 'no se encontro usuario'})

    res.send({user})
})

app.listen(8080, () => {
    console.log('Escuchando 8080');
})
