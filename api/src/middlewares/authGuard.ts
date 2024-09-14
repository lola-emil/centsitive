import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/response-util";
import { verifyToken } from "../utils/jwt-util";
import { SECRET_KEY } from "../config/constants";

export default async function authGuard(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization");

        if (!token)
            return next(new ErrorResponse(401, "Unauthorized: No token provided"));
        if (token.split(" ")[0] !== "Bearer")
            return next(new ErrorResponse(401, "Unauthorized: Invalid token"));

        const decoded = await verifyToken(token.split(" ")[1], SECRET_KEY);
        
        res.locals.userId = (<any>decoded).user_id;

        return next();
    } catch (error) {
        return next(new ErrorResponse(401, "Unauthorized: Invalid token"));
    }
}
