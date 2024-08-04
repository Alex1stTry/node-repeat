import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { Configs } from "./configs/configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  cronRunner();
  await mongoose.connect(Configs.MONGO_URI);
  console.log(`Server was started on PORT: ${Configs.PORT}`);
});
