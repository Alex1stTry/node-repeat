import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateById,
);
router.delete(
  "/:id",
  tokenMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  userController.deleteById,
);

export const userRouter = router;
