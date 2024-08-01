import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action.tokenType.enum";
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

export const authRouter = router;
