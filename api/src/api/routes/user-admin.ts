import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as userController from "../controllers/user-admin";

const router = Router();


router.get("/", asyncHandler(userController.get));
router.post("/", asyncHandler(userController.insert));
router.put("/:id", asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.deleteById));

export default router;