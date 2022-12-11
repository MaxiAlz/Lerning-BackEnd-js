// const express = require('express')
// const app=express()

import express, { application } from 'express'
import handlebars from 'express-handlebars'

const app=express()

// inicializar motor de plantillas
app.engine('andlerbars',handlebars.engine())
// aca seleccionamos cual es la carpeta
app.set('views','src/views')
// le decimos que renderice con el motor que le pasamos
app.set('view engine', 'handlebars')


app.get('/', (req,res)=>{
    const testUser = {
        name: 'pablo',
        lastName: 'Cosito'
    }

    res.render('index',testUser)
})

const server = app.listen(8080, ()=>{console.log('server running 8080...')})


