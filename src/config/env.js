import * as dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT;

const secret = process.env.AUTH_SECRET;
const expiresIn = process.env.AUTH_EXPIRES_IN;

const url = process.env.APP_URL;
const urlSite = process.env.URL_SITE;

const storage = process.env.STORAGE_TYPE;
const bucket = process.env.BUCKET_NAME;

export default {
  mongoUrl,
  port,
  jwtSecret,
  secret,
  expiresIn,
  url,
  urlSite,
  storage,
  bucket
};
