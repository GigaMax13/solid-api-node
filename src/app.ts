import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import { BODY_LIMIT } from './utils/Environment'
import { Routes } from './routes'

const app = express()

app.disable('x-powered-by')

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(
  bodyParser.json({
    limit: BODY_LIMIT
  })
)

app.get(['/', '/status'], (req, res) => {
  res.send('ok')
})

app.use(Routes)

app.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Not found.'
  })
})

export { app }
