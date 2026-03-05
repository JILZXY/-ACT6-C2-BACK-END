import express = require('express');
import type { Request, Response } from 'express';
import env = require('./config/env');
const { ENV } = env;
import cors = require('cors');
import characterRoutes = require('./routes/character.routes');
import errorMiddleware = require('./middlewares/error.middleware');
const { errorHandler } = errorMiddleware;

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL }))
app.use(express.json())

app.use('/api', characterRoutes)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`)
})
