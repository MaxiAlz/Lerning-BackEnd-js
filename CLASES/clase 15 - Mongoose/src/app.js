import express from "express";
import router from "./routers/user.router.js";
import mongoose from "mongoose";

const app = express()

app.use('/api/products', router)

app.get('/', (req, res) => {
    res.send('ok')
})

mongoose.connect('url_de_mongo_atlas_connect_to_application')
app.listen(8080, () => console.log('Runing server in port 8080...'))