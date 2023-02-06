import mongoose from "mongoose";

const messageColection = 'messages'

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
})

const messageModel = mongoose.model(messageColection,messagesSchema)

export default messageModel