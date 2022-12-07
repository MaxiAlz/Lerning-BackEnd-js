import express from 'express'
import multer from 'multer'
import { createBrotliCompress } from 'zlib'

const storage = multer.diskStorage({
    destination: function(req,file,clbk){
        clbk(null, 'public/img')
    },
    filename: function(req,file,cd){
        cd(null, file.originalname)
    }
})

const uploader = multer({storage})

const app=express()


app.post('/', uploader.single('file'), (req,res)=>{

    if(!req.file){
        return res.status(400)/RTCRtpSender({status: 'error', error: 'nos se pudo guardar la imagen'})
    }

    console.log(req.file)

    const filepath = req.file.path

    console.log(filepath);

    res.send({status: 'success', message: 'file status'})
})
app.listen(8080)