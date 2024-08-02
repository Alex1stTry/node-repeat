import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get("/me", tokenMiddleware.checkAccessToken, userController.getMe);

router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);

router.put(
  "/me",
  tokenMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  authController.setForgotPass,
);
router.delete("/me", tokenMiddleware.checkAccessToken, userController.deleteMe);

export const userRouter = router;
