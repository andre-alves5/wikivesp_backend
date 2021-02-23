import * as dotenv from 'dotenv'

dotenv.config()
let mongoUrl, port, jwtSecret
switch (process.env.NODE_ENV) {
  case 'development':
    mongoUrl = 'mongodb://localhost:27017/wikivesp'
    port = 8182
    jwtSecret = 'secret'
    break
  default:
    mongoUrl = process.env.MONGO_URL
    port = process.env.PORT
    jwtSecret = process.env.JWT_SECRET
}

export default {
  mongoUrl,
  port,
  jwtSecret
}
