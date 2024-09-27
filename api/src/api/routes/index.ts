import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";
import expenseAdminRoute from "./expense-admin";
import authGuard from "../../middlewares/authGuard";

import userRoute from "./user";
import userAdminRoute from "./user-admin";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", authGuard, expenseRoute);
router.use("/expense-admin", authGuard, expenseAdminRoute);

router.use("/user", authGuard, userRoute);
router.use("/user-admin", authGuard, userAdminRoute);

export default router;