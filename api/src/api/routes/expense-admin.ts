import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { getExpenses, getUsers, recentActivities } from "../controllers/expense-admin";

const router = Router();

router.get("/recent-activities", asyncHandler(recentActivities))
router.get("/users", asyncHandler(getUsers))
router.get("/expenses", asyncHandler(getExpenses))

export default router;