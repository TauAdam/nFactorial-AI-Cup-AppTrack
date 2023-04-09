import * as dotenv from 'dotenv'
import express from 'express'
import { GiftSchema } from '../mongodb/models/gift.js'

dotenv.config()

const router = express.Router()

router.route('/').get(async (req, res) => {
  try {
    const gifts = await GiftSchema.find({})
    res.status(200).json({ success: true, data: gifts })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Fetching posts failed, please try again',
    })
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, idea } = req.body

    const newPost = await GiftSchema.create({
      name,
      prompt,
      idea,
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to create a post, please try again',
    })
  }
})

export default router
