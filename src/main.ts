import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import upload from "express-fileupload";
import rateLimit from "express-rate-limit";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDoc from "../docs/swagger.json";
import { Configs } from "./configs/configs";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: "max 5 requests,wait a minute",
  }),
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

app.listen(Configs.PORT, async () => {
  // cronRunner();
  await mongoose.connect(Configs.MONGO_URI);
  console.log(`Server was started on PORT: ${Configs.PORT}`);
});
