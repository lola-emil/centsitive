import { Request, Response } from "express";
import * as ExpenseCRUDRepo from "../../dal/expense-crud";



export async function recentActivities(req: Request, res: Response) {
    const result = await ExpenseCRUDRepo.getRecent({});

    return res.status(200).json(result);
}

export async function getUsers(req: Request, res: Response) {

}

export async function getExpenses(req: Request, res: Response) {
    let opt = req.query;
    const result = await ExpenseCRUDRepo.get(opt);

    return res.status(200).json(result);
}