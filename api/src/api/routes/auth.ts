import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as AuthController from "../controllers/auth";
import authGuard from "../../middlewares/authGuard";

const router = Router();

// router.post("/register", asyncHander(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));
router.post("/update-password", authGuard, asyncHandler(AuthController.updatePassword))
export default router;