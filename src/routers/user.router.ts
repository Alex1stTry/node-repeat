import { Router } from "express";

import { avatarConstants } from "../constants/avatar.constants";
import { userController } from "../controllers/user.controller";
import { avatarMiddleware } from "../middlewares/avatarMiddleware";
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
  avatarMiddleware.isAvatarValid("avatar", avatarConstants),
  userController.uploadAvatar,
);
router.delete(
  "/me/add-avatar",
  tokenMiddleware.checkAccessToken,
  userController.deleteAvatar,
);

export const userRouter = router;
