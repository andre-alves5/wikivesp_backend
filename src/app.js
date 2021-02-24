/*
import express, { Express } from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

import './config/db_connection'

dotenv.config()

class App {
  app: Express
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
      res.header(
        'Access-Control-Allow-Headers',
        'X-PINGOTHER, Content-Type, Authorization'
      )
      this.app.use(cors())
      next()
    })
  }

  routes () {
    this.app.use(routes)
  }
}

export default new App().app
*/
