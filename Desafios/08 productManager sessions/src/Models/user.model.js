import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel