import { Request, Response } from "express";
import * as UserCRUD from "../../dal/user-crud";
import { validateRegister, validateUserUpdate } from "../../utils/validation-util";
import { ErrorResponse } from "../../utils/response-util";

import bcrypt from "bcryptjs";

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
    body.password = await bcrypt.hash(body.password, 10);

    // store user to db
    await UserCRUD.insert(body);

    return res.status(200).json({
        message: "User added successfully"
    });
}


function omitNullUndefinedEmpty<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    ) as Partial<T>;
  }


export async function update(req: Request, res: Response) {
    const id = req.params.id;
    let body = req.body;


    body = omitNullUndefinedEmpty(body);
    
    let errors;

    if (!body.status)
        errors = await validateUserUpdate(body);

    if (errors)
        throw new ErrorResponse(422, errors);
    
    if (body.password)
        body.password = await bcrypt.hash(body.password, 10);

    // store ang update
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