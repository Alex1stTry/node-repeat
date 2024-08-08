import { ObjectCannedACL } from "@aws-sdk/client-s3/dist-types/models";
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
  VERIFY_ACTION_TOKEN_SECRET: process.env.VERIFY_ACTION_TOKEN_SECRET,
  VERIFY_ACTION_TOKEN_EXPIRE_IN: process.env.VERIFY_ACTION_TOKEN_EXPIRE_IN,
  FRONT_UTL: process.env.FRONT_UTL,
  FORGOT_ACTION_TOKEN_SECRET: process.env.FORGOT_ACTION_TOKEN_SECRET,
  FORGOT_ACTION_TOKEN_EXPIRE_IN: process.env.FORGOT_ACTION_TOKEN_EXPIRE_IN,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_ACCESS: process.env.AWS_ACCESS,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_ENDPOINT: process.env.AWS_ENDPOINT,
  S3_ACL: process.env.S3_ACL as ObjectCannedACL,
};
