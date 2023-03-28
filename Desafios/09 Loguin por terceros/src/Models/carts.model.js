import mongoose, { Schema } from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
  name: String,
  // products: [{ type: mongoose.Types.ObjectId, ref: 'products' }, { default: [] }]
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        }
      }
    ],
    default: []
  }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel