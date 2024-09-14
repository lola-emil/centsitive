import { Response } from "express";

export class ErrorResponse extends Error {
    status: number;
    // errorId: string;

    constructor(status: number, message?: string) {
        super();

        this.status = status;

        if (this.status >= 500)
            this.message = "Internal Server Error: " + this.message;

        this.message = String(message);
    }
}

export class ApiResponse {
    status: number;
    message?: string;
    data: any;

    constructor(status = 200, message = "OK", data?: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export function handleResponse(apiResponse: ApiResponse, res: Response) {
    const { status, message, data } = apiResponse;

    res.status(status);
    res.json({ message, data });
}