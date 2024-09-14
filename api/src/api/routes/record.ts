import { Router } from "express";
import * as RecordController from "../controllers/record";
import asyncHandler from "../../middlewares/asyncHandler";

const router = Router();

router.get("/", asyncHandler(RecordController.getRecords));
router.post("/", asyncHandler(RecordController.addRecord));
router.patch("/:id", asyncHandler(RecordController.updateRecord));
router.delete("/:id", asyncHandler(RecordController.deleteRecord));

export default router;