export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://dbappuser:Univesp01@cluster0.chc5y.gcp.mongodb.net/wikivespdb?retryWrites=true&w=majority',
  port: process.env.PORT || 8080,
  jwtSecret: process.env.AUTH_SECRET || '272A63C9E9C5D34A99D6D949A163CBD0'
}
