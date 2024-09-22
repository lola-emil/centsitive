import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";
import { ApiResponse, handleResponse } from "../../utils/response-util";
import fileUpload from "express-fileupload";
import { getTotalExpense } from "../../dal/expense";
const router = Router();

router.use(fileUpload());

router.get("/transactions", asyncHandler(ExpenseController.getRecords));
router.get("/transactions/:recordId", asyncHandler(ExpenseController.getRecordById));

router.post("/transactions", asyncHandler(ExpenseController.addExpense));
// router.patch("/transactions/:userId", asyncHandler(ExpenseController.updateExpense));
router.delete("/transactions/:recordId", asyncHandler(ExpenseController.deleteRecord));

router.get("/overview", asyncHandler(ExpenseController.getOverview));
router.get("/recent", asyncHandler(ExpenseController.getRecent));

router.get("/search", asyncHandler(ExpenseController.searchTransaction));

router.get("/format-month-year", (req, res) => {
    const date = req.query.date ? new Date(req.query.date as string) : new Date();


    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const year = date.getFullYear();
    const month = date.getMonth();

    const apiResponse = new ApiResponse();

    apiResponse.status = 200;
    apiResponse.data = {
        time: `${monthNames[month]} ${year}`
    };

    return handleResponse(apiResponse, res);
});

router.get("/total-expense", async (req, res) => {
    let result = await getTotalExpense();

    return res.status(200).json({
        total: (result[0] as any).total
    });
});

export default router;