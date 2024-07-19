import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";

const router = Router();

router.get("/", userController.getList);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.post("/", validationMiddleware.isBodyValid, userController.create);
router.delete("/:id", userController.deleteById);
router.put("/:id", userController.updateById);

export const userRouter = router;
