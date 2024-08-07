import { Router } from "express";

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
  userController.updateMe,
);
router.delete("/me", tokenMiddleware.checkAccessToken, userController.deleteMe);

router.post(
  "/me/add-avatar",
  tokenMiddleware.checkAccessToken,
  // userController.uploadAvatar,
);

export const userRouter = router;
