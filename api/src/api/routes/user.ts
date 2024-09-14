import { Router } from "express";
import Joi from "joi";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import * as UserRepo from "../../dal/user";
import bcrypt from "bcryptjs";
import asyncHandler from "../../middlewares/asyncHandler";

const router = Router();

const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required()
})

router.post("/update-password", asyncHandler(async (req, res) => {
    const userId = res.locals.userId
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { error } = updatePasswordSchema.validate({ currentPassword, newPassword, confirmPassword })

    if (error) throw new ErrorResponse(400, error.message);
    const matchedUser = await UserRepo.findById(userId);

    // validate current password
    if (!(await bcrypt.compare(currentPassword, matchedUser.password)))
        throw new ErrorResponse(400, "Current password is incorrect");

    if (newPassword == currentPassword)
        throw new ErrorResponse(400, "New and current password cannot be the same");

    // validate new and password confirmation
    if (newPassword != confirmPassword)
        throw new ErrorResponse(400, "Password doesn't match");

    await UserRepo.updatePasswordById(userId, newPassword);

    return handleResponse(new ApiResponse(200, 'Password updated'), res);
}));

export default router;