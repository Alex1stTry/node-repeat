import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.put("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const users = await userHelper.reader();
//     const { name, email } = req.body;
//     const userId = +req.params.id;
//     const index = users.findIndex((user) => (user.id = userId));
//     if (index === -1) {
//       res.status(404).json("user not found");
//     }
//     users[index] = {
//       ...users[index],
//       name,
//       email,
//     };
//     await userHelper.writer(users);
//     res.status(200).json(users[index]);
//   } catch (e) {
//     res.status(500).json(e.message);
//   }
// });
app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
  },
);
process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, async () => {
  await mongoose.connect(configs.MONGO_URI);
  console.log(`server started on ${configs.APP_PORT}`);
});
