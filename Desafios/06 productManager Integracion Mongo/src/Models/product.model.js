import mongoose from "mongoose";

const productCollection = 'product'

const productSchema = new mongoose.Schema({
    tittle: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
})

const productModel = mongoose.model(productCollection, productSchema,)

export default productModel