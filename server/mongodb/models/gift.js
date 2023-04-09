import mongoose from 'mongoose'

const Gift = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  idea: { type: String, required: true },
})

export const GiftSchema = mongoose.model('Gift', Gift)
