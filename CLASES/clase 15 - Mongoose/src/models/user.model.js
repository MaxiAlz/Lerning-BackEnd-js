import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    age:Number,
    email: {
        type: String,
        unique: true
    }
})

export const userModel = mongoose.model(userCollection, userSchema)
