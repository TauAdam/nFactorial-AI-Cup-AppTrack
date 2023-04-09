import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { Endpoints } from './constants/index.js'
import { connectDB } from './mongodb/connect.js'
import createGift from './routes/createGift.js'
import giftsRoute from './routes/giftsRoute.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use(Endpoints.giftRoute, giftsRoute)
app.use(Endpoints.openAiRoute, createGift)

app.get('/', async (req, res) => {
  res.send('Hello Fellars')
})

const port = 8080
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(port, () =>
      console.log(`Server has started on port http://localhost:${port}`)
    )
  } catch (error) {
    console.log(error)
  }
}

startServer()
