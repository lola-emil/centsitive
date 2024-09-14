import { Request, Response } from "express";
import * as userRepo from "../../dal/user";
import { validateLogin, validateRegister } from "../../utils/validation-util";
import { signToken } from "../../utils/jwt-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { compare } from "bcryptjs";
import { SECRET_KEY } from "../../config/constants";

export async function login(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const user = req.body;
    const error = await validateLogin(user);

    if (error) throw new ErrorResponse(400, error);

    const matchedUser = await userRepo.findByEmail(user.email);
    const token = await signToken({ user_id: matchedUser?.user_id }, SECRET_KEY);

    apiResponse.status = 200;
    apiResponse.message = "Login successful";
    apiResponse.data = {
        user_id: matchedUser?.user_id,
        name: matchedUser?.firstname + " " + matchedUser?.lastname,
        token
    };

    return handleResponse(apiResponse, res);
}

export async function updatePassword(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const userId = req.query.userId;

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    let { currentPassword, newPassword } = req.body;
    const matchedUser = await userRepo.findById(userId.toString());
    
    if (!matchedUser)
        throw new ErrorResponse(400, "Invalid user Id");

    if (!currentPassword || !newPassword)
        throw new ErrorResponse(400, "Please fill all the required fields");

    const currentPasswordMatches = await compare(currentPassword, matchedUser.password);

    if (!currentPasswordMatches)
        throw new ErrorResponse(400, "Current password doesn't match");

    await userRepo.updatePasswordById(userId.toString(), newPassword);

    apiResponse.status = 200;
    apiResponse.message = "Password updated successfully";

    return handleResponse(apiResponse, res);
}