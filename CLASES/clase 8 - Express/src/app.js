import express from 'express'
// const express=require('express')

const app = express()
const server = app.listen(8080, () => console.log('server running'))

let users = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('ok')
})

app.post('/api/user', (req, res) => {
    const user = req.body

    if (!user) {
       return res.status(400).send({ status: 'error', error: 'valores incompletos' })
    }
    users.push(user)
    res.send({ status: 'success', message: 'user created' })
})

app.put('api/user',(req,res)=>{
    const user = req.body

    if(!user){
        res.status(400).send({status: 'error', error: 'valores incompletos'})
    }

    users.push(user)

    const idx = users.findIndex(user=> user.firstName == user.firstName)

    if(idx<0){
        return res.status(404).send({status: 'error', error: 'user not found'})
    }

    users[idx] = user
    res.send({status: 'success', message: 'user updated'})
})

app.delete('api/user/:name', (req,res)=>{
    const name = req.params.name
    const actualTotal = users.length
    users = users.filter(user=>user.firstName != name)

    if(users.length == actualTotal){
        return res.status(400).send({status:'error', error: 'user not found'})
    }

    res.send({status: 'succes',msg:'user Deleted'})
})