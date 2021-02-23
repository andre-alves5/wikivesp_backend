import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import express from 'express'

const app = express()
setupMiddleware(app)
setupRoutes(app)
export default app
