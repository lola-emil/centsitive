import { Request, Response } from "express";
import * as recordRepo from "../../dal/expense";
import { validateExpense } from "../../utils/validation-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { UploadedFile } from "express-fileupload";


export async function addExpense(req: Request, res: Response) {
    const body = req.body;
    const error = validateExpense(body);
    const apiResponse = new ApiResponse();

    console.log(body);

    // if (error) throw new ErrorResponse(400, error);


    if (req.files) {
        let uploadedFile = req.files.image as UploadedFile;

        const uploadPath = "uploads/" + uploadedFile.name;

        await uploadedFile.mv(uploadPath);

        body.document = "/uploads/" + uploadedFile.name; 
    }


    const result = await recordRepo.insert(body);
    if (result == null) throw new ErrorResponse(500, "Insertion error");

    apiResponse.status = 200;
    apiResponse.data = { expense_id: result };

    return handleResponse(apiResponse, res);
}

export async function getRecords(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = res.locals.userId;
    const date = req.query.date as string;


    // if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const expenses = await recordRepo.selectAll(userId, date);

    apiResponse.status = 200;
    apiResponse.data = expenses;

    return handleResponse(apiResponse, res);
}

export async function getRecordById(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const id = parseInt(req.params.recordId);

    const result = await recordRepo.getExpenseById(id);

    apiResponse.status = 200;
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}

// export async function updateExpense(req: Request, res: Response) {
//     const apiResponse = new ApiResponse();
//     const userId = req.params.userId;
//     const body = req.body;

//     await expenseRepo.updateById(userId, body);

//     apiResponse.status = 200;
//     apiResponse.message = "Update successful";

//     return handleResponse(apiResponse, res);
// }

export async function deleteRecord(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const recordId = req.params.recordId;

    await recordRepo.deleteById(parseInt(recordId));

    apiResponse.status = 200;
    apiResponse.message = "Record Deleted";

    return handleResponse(apiResponse, res);
}


export async function getOverview(req: Request, res: Response) {
    const userId = res.locals.userId;
    const date = req.query.date as string;

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await recordRepo.getOverview(userId, date);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function getRecent(req: Request, res: Response) {
    const userId = res.locals.userId;
    const date = req.query.date as string;

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await recordRepo.getRecentRecords(userId, date);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function searchTransaction(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = req.query.userId;
    const query = req.query.q;

    const result = await recordRepo.searchByDescriptionOrCategory(parseInt(userId + ""), query + "");

    apiResponse.status = 200;
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}