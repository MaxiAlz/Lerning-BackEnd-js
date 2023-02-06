import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const productCollection = 'products'

const productSchema = new mongoose.Schema({
  tittle: String,
  description: String,
  category: {
    type: String,
    enum: ['computer', 'watchs', 'cellPhones', 'electrodomestics', 'transports', 'speakers', "otros"],
    default: "otros"
  },
  price: Number,
  thumbnail: String,
  code: String,
  stock: { type: Number, default: 10 }
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema,)

export default productModel