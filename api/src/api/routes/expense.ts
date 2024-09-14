import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";
import { ApiResponse, handleResponse } from "../../utils/response-util";

const router = Router();

router.get("/transactions", asyncHandler(ExpenseController.getRecords));
router.post("/transactions", asyncHandler(ExpenseController.addRecord));
// router.patch("/transactions/:userId", asyncHandler(ExpenseController.updateExpense));
router.delete("/transactions/:recordId", asyncHandler(ExpenseController.deleteRecord));

router.get("/overview", asyncHandler(ExpenseController.getOverview));
router.get("/recent", asyncHandler(ExpenseController.getRecent));

router.get("/search", asyncHandler(ExpenseController.searchTransaction));

router.get("/current-month-year", (req, res) => {
    const currentDate = new Date();
    const  monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const apiResponse = new ApiResponse();

    apiResponse.status = 200;
    apiResponse.data = {
        time: `${monthNames[month]} ${year}`
    }

    return handleResponse(apiResponse, res);
})

export default router;