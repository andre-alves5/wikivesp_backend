import * as dotenv from 'dotenv'

dotenv.config()
let mongoUrl
let port
const jwtSecret = process.env.JWT_SECRET || 'secret'
switch (process.env.NODE_ENV) {
  case 'development':
    mongoUrl = 'mongodb://localhost:27017/wikivesp'
    port = 8182
    break
  default:
    mongoUrl = process.env.MONGO_URL
    port = process.env.PORT
}

export default {
  mongoUrl,
  port,
  jwtSecret
}
