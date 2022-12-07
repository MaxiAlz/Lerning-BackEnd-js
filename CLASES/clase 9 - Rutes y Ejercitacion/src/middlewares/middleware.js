import express from "express";

const app = express()

// MIDDLEWARE A NIVEL DE APLICACION: funciona para toda la aplicacion
app.use(function (req, res, next) {
    console.log(req.query);

    if (req.query.name == 'maxi') {
        return res.send('maxi no puede ver la info')
    }
    console.log('Time', new Date().toLocaleDateString)
    next()
}
)

// middleware qiue solo funciona para un endpoint
function midl(req,res,next){
    req.dato1 = 'My data, not yours'
    next()
}

app.use('/', midl, (req,res)=>{
    console.log(req.dato1);
    res.send('more info')
})
