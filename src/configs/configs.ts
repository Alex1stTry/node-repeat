import dotenv from "dotenv";

dotenv.config();

export const Configs = {
  PORT: process.env.APP_PORT,
  MONGO_URI: process.env.MONGO_URI,
};
