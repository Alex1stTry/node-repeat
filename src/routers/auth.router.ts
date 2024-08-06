import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action.token-type.enum";
import { commonMiddleware } from "../middlewares/common.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.login,
);
router.post(
  "/refresh",
  tokenMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post(
  "/log-out",
  tokenMiddleware.checkAccessToken,
  authController.logOut,
);
router.post(
  "/verify",
  tokenMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY),
  authController.verifyAndUpdate,
);
router.post(
  "/forgot-password",
  tokenMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.forgotPass),
  authController.forgotPass,
);
router.put(
  "/forgot-password",
  tokenMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  commonMiddleware.isBodyValid(UserValidator.setForgotPass),
  authController.setForgotPass,
);
router.post(
  "/reset-password",
  tokenMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.setNewPassword),
  authController.setNewPass,
);
export const authRouter = router;
