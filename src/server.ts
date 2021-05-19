import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('༼ つ ◕_◕ ༽つ Server started on port 3333!'))
