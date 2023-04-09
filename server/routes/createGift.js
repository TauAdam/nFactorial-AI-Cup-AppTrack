import * as dotenv from 'dotenv'
import express from 'express'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const router = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Syilyk!' })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.01,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })

    const giftIdea = response.data.choices[0].text
    res.status(200).json(giftIdea)
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  }
})

export default router
