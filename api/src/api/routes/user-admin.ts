import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as userController from "../controllers/user-admin";

const router = Router();


router.get("/", asyncHandler(userController.get))
router.put("/:id", asyncHandler(userController.udpate));
router.delete("/:id", asyncHandler(userController.deleteById));

export default router;