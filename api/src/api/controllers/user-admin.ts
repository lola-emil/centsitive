import { Request, Response } from "express";
import * as UserCRUD from "../../dal/user-crud";
import { validateRegister } from "../../utils/validation-util";
import { ErrorResponse } from "../../utils/response-util";

export async function get(req: Request, res: Response) {
    const query = req.query;

    const result = await UserCRUD.get(query, query.q ? query.q + "" : "");

    return res.status(200).json(result);
}


export async function insert(req: Request, res: Response) {
    const body = req.body;

    const errors = await validateRegister(body);

    if (errors)
        throw new ErrorResponse(422, errors);


    // butngan nalang
    body.position = "employee";
    
    // store user to db
    await UserCRUD.insert(body);

    return res.status(200).json({
        message: "User added successfully"
    });
}

export async function udpate(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    await UserCRUD.update(id, body);

    return res.status(200).json({
        message: "Updated successful"
    });
}


export async function deleteById(req: Request, res: Response) {
    const id = req.params.id;

    await UserCRUD.deleteById(id);

    return res.status(200).json({
        message: "Deleted successfully"
    });
}