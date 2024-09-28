import { Request, Response } from "express";
import * as ExpenseCRUDRepo from "../../dal/expense-crud";

function omitNullUndefinedEmpty<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    ) as Partial<T>;
  }

export async function recentActivities(req: Request, res: Response) {
    const result = await ExpenseCRUDRepo.getRecent({});

    return res.status(200).json(result);
}

export async function getUsers(req: Request, res: Response) {

}

export async function getTotal(req: Request, res: Response) {
  const result = await ExpenseCRUDRepo.getTotalExpense();

  return res.status(200).json(result)
}

export async function getExpenses(req: Request, res: Response) {
    let query = req.query;

    query = omitNullUndefinedEmpty(query);

    const result = await ExpenseCRUDRepo.get(query);

    return res.status(200).json(result);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id;

  console.log(id);
  const result = await ExpenseCRUDRepo.getById(id);

    return res.status(200).json(result);

}


export async function update(req: Request, res: Response) {
  const id = req.params.id;
  let body = req.body;
  body = omitNullUndefinedEmpty(body);


  await ExpenseCRUDRepo.update(id, body);

  return res.status(200).json({
    message: "Updated successfully"
  })
}