import { NextFunction, Request, Response } from "express";
import { ApiResponse, ErrorResponse, handleResponse } from "../utils/response-util";

export default function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
    const apiResponse = new ApiResponse();

    if (error instanceof ErrorResponse) {
        const errorResponse = error as ErrorResponse;
        
        apiResponse.status = errorResponse.status;
        apiResponse.message = errorResponse.message;
    } else {
        apiResponse.status = 500;
        apiResponse.message = "Internal Server Error: " + error.message;
    }

    return handleResponse(apiResponse, res);
}