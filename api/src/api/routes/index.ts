import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";
import expenseAdminRoute from "./expense-admin";
import authGuard from "../../middlewares/authGuard";

import userRoute from "./user";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", authGuard, expenseRoute);
router.use("/expense-admin", authGuard, expenseAdminRoute);

router.use("/user", authGuard, userRoute);

export default router;