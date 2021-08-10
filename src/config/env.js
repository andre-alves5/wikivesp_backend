import * as dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "secret";
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT;

export default {
  mongoUrl,
  port,
  jwtSecret,
};
