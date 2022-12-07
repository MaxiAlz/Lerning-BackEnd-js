import express from "express";
import usersRouter from './routers/usersRouter'

const app = express()
app.use(express.json())

app.use(express.static('public'))

app.use('/api/users', usersRouter)
app.use('/', (req,res)=>{
    res.send('Home')
})

app.listen(8080)
