import { string } from "joi";
import { db } from "../config/db";
import { User } from "./user";


const TBL_NAME = "tbl_users";


export async function get(opt: Partial<User>) {
    const result = await db<User>(TBL_NAME).select().where(opt);
    return result;
}

export async function getRecent(opt: Partial<User>) {
    const result = await db<User>(TBL_NAME).select().where(opt).orderBy("created_at", "desc").limit(10);
    return result;
}

export async function update(data: Partial<User>) {
    const result = await db<User>(TBL_NAME).update(data);
    return result;
}

export async function deleteById(id: number | string) {
    const result = await db<User>(TBL_NAME).delete().where("user_id", id);
    return result;
}