import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import Helmet from 'helmet'
import {name, version} from '../package.json' 
import {v1Router} from './api/v1'
import { connectDb } from './util/dbConnect'
import { Server } from 'http'
import { logger } from './logger'
import * as dotenv from "dotenv"

dotenv.config()

const app: Application = express()

app.use(Helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.get('/version', (req: Request, res: Response) => {
  res.json({name, version})
})
app.use('/v1',v1Router)
app.use((req: Request, res: Response) => {
  logger.error(`${req.method} ${req.url}`)
  res.status(404).json(`${req.method} ${req.url} Not found`)
})

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next?: NextFunction) => {
  logger.error(err)
  res.status(500).send('Error')
})

const PORT = process.env.port || 8080
let server:Server
// Connecting to Db
connectDb().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
  })
})
process.on('SIGTERM', () => {
  // disconnect from server as well
  if (server) {
    server.close(() => {
      logger.warn('Server Closing')
    })
  }
  logger.info('Shutting down.')
})