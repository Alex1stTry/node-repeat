import dotenv from "dotenv";

dotenv.config();

export const Configs = {
  PORT: process.env.APP_PORT,
  MONGO_URI: process.env.MONGO_URI,
  COUNT_OF_SALT: Number(process.env.COUNT_OF_SALT),
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  ACCESS_EXPIRE_IN: process.env.ACCESS_EXPIRE_IN,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  REFRESH_EXPIRE_IN: process.env.REFRESH_EXPIRE_IN,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
