import { Request, Response } from "express";
import * as RecordRepo from "../../dal/record";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { validateRecord } from "../../utils/validation-util";


export async function getRecords(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = res.locals.userId;

    const records = await RecordRepo.select(userId, {
        ...req.query,
    });
    const overview = await RecordRepo.getOverview(userId);

    apiResponse.data = {
        overview,
        records
    };
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function addRecord(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    req.body.user_id = res.locals.userId;

    const error = validateRecord(req.body);

    if (error) 
        throw new ErrorResponse(400, error);

    const result = await RecordRepo.insert(req.body);
    
    apiResponse.status = 200;
    apiResponse.message = "Record inserted successfully";
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}

export async function updateRecord(req: Request, res: Response) {
    const recordId = req.params.id;
    const apiResponse = new ApiResponse();

    // Check if any field is present
    if (Object.keys(req.body).length == 0)
        throw new ErrorResponse(400, 'walay data para update');

    const result = await RecordRepo.update(recordId, req.body);

    apiResponse.status = 200;
    apiResponse.message = "Updated successfully";
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}

export async function deleteRecord(req: Request, res: Response) {
    const recordId = req.params.id;
    const apiResponse = new ApiResponse();

    const result = await RecordRepo.deleteRecord(recordId);

    apiResponse.status = 200;
    apiResponse.message = "Deleted successfully";
    apiResponse.data = result;
    
    return handleResponse(apiResponse, res);
}