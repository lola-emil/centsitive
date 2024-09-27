import { string } from "joi";
import { db } from "../config/db";
import { User } from "./user";


const TBL_NAME = "tbl_users";


export async function get(opt: Partial<User>, search?: string) {
    const query =  db<User>(TBL_NAME).select();


    const {q, ...newOpt} = opt as any;

    if(search) 
        query.whereLike("firstname", `%${search}%`)
        .orWhereLike("lastname", `%${search}%`)
        .orWhereLike("email", `%${search}%`);
    else 
        query.where(newOpt);

    return await query;
}


export async function insert(body: User) {
    const result = await db<User>(TBL_NAME).insert(body);
    return result;
}

export async function getRecent(opt: Partial<User>) {
    const result = await db<User>(TBL_NAME).select().where(opt).orderBy("created_at", "desc").limit(10);
    return result;
}

export async function update(id: number | string, data: Partial<User>) {
    const result = await db<User>(TBL_NAME).update(data).where("user_id", id);
    return result;
}

export async function deleteById(id: number | string) {
    const result = await db<User>(TBL_NAME).delete().where("user_id", id);
    return result;
}