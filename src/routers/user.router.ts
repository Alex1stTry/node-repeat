import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userController.create,
);
router.delete("/:id", userController.deleteById);
router.put(
  "/:id",
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateById,
);

export const userRouter = router;
