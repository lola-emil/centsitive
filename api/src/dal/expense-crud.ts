import { string } from "joi";
import { db } from "../config/db";
import { Expense } from "./expense";


const TBL_NAME = "tbl_records";


export async function get(opt: Partial<Expense>) {
    const result = await db<Expense>(TBL_NAME).select().where(opt);
    return result;
}

export async function getRecent(opt: Partial<Expense>) {
    const result = await db<Expense>(TBL_NAME).select().where(opt).orderBy("created_at", "desc").limit(10);
    return result;
}

export async function update(data: Partial<Expense>) {
    const result =await db<Expense>(TBL_NAME).update(data);
    return result;
}

export async function deleteById(id: number | string) {
    const result =await db<Expense>(TBL_NAME).delete().where("record_id", id);
    return result;
}