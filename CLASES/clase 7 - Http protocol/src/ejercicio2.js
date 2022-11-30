const express = require('express')

const app = express()

const users = [
    {id:1 ,nombre: 'German', apellido:'rodas', genero: 'M'},
    {id:2 ,nombre: 'juan', apellido:'rodrigez', genero: 'M'},
    {id:3 ,nombre: 'pablo', apellido:'asdd', genero: 'M'},
    {id:4 ,nombre: 'evelyn', apellido:'sinico', genero: 'F'},
    {id:5 ,nombre: 'paula', apellido:'assad', genero: 'F'},
    {id:6 ,nombre: 'arturo', apellido:'diaz', genero: 'M'}
]
// esto es oara formatear la ur. por ejemplo quita los espacios o cosas mal ingresadas, es como un prettier de la url
app.use(express.urlencoded({extended: true}))

// utilizando querys otra forma de realizar consultas
// para consultar desde la url quedaria asi => http://localhost:8080/?gender=M Esto dvolveria los genero M
app.get('/', (req,res) => {
    const genero = req.query.gender

    if (genero && genero== 'M' || genero == 'F') {
        const userfilter = users.filter( user => user.genero == genero)
        res.send(userfilter)

    }else res.send({users})
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
