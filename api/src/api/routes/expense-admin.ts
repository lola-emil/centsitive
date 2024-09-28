import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { getById, getExpenses, getTotal, getUsers, recentActivities, update } from "../controllers/expense-admin";

const router = Router();

router.get("/recent-activities", asyncHandler(recentActivities))
router.get("/total", asyncHandler(getTotal))
router.get("/users", asyncHandler(getUsers))
router.get("/expenses", asyncHandler(getExpenses))
router.get("/expenses/:id", asyncHandler(getById))
router.put("/expenses/:id", asyncHandler(update))

export default router;