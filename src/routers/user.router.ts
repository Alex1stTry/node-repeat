import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.delete("/:id", userController.deleteById);
router.put("/:id", userController.updateById);

export const userRouter = router;
