import { db } from "../config/db";

const TBL_NAME = "tbl_records";
export interface Expense {
    record_id: string;
    note: string;
    category: string;
    amount: number;
    user_id: string;
    created_at: Date;
    delete_time: Date;

    status: "approved" | "rejected" | "pending";

    document: string;
}

// Insert new record/transaction to database
export async function insert(expense: Expense) {
    try {
        await db<Expense>(TBL_NAME).insert(expense);
        let newExpense = await db<Expense>(TBL_NAME).select("record_id");
        return newExpense[0].record_id;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get all records/transactions by user_id
export async function selectAll(userId: number, date?: string) {
    
    if (!date || date == "") date = new Date().toISOString();

    try {
        const result = await db<Expense>(TBL_NAME)
            .select()
            .where("user_id", userId)
            .andWhere("delete_time", null)
            .andWhereRaw("MONTH(created_at) = MONTH(?)", [date])
            .andWhereRaw("YEAR(created_at) = YEAR(?)", [date])
            .orderBy('created_at', 'desc');

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Update record/transaction by id
export async function updateById(id: number, data: Expense) {
    try {
        await db<Expense>(TBL_NAME)
            .update(data)
            .where("record_id", id)
            .orderBy('created_at', 'desc');
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get overview of records/transactions
export async function getOverview(userId: number, date?: string) {

    if (!date || date == "") date = new Date().toISOString();

    try {
        let rows = await db<Expense>(TBL_NAME)
            .column("category")
            .sum({ total_expense: "amount" })
            .groupBy("category")
            .where("user_id", userId)
            .andWhere("delete_time", null)
            .andWhereRaw("MONTH(created_at) = MONTH(?)", [date])
            .andWhereRaw("YEAR(created_at) = YEAR(?)", [date])
            .orderBy('created_at', 'desc');

        let totalSum = rows.reduce((sum, row) =>
            sum + row.total_expense, 0);

        let result = rows.map(row => ({
            category: row.category,
            total_expense: row.total_expense,
            percentage: parseFloat(((row.total_expense / totalSum) * 100).toFixed(2))
        }));

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get the 5 latest added records/transactions from database
export async function getRecentRecords(userId: number, date?: string) {

    if (!date || date == "") date = new Date().toISOString();

    try {
        let rows = await db<Expense>(TBL_NAME)
            .select()
            .where("user_id", userId)
            .andWhere("delete_time", null)
            .andWhereRaw("MONTH(created_at) = MONTH(?)", [date])
            .andWhereRaw("YEAR(created_at) = YEAR(?)", [date])
            .orderBy("created_at", "desc").limit(5);

        return rows;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function getTotalExpenseById(userId: number, date?: string) {
    
    if (!date || date == "") date = new Date().toISOString();

    try {
        const result = await db<Expense>(TBL_NAME)
            .column("amount")
            .sum({ total_expense: "amount" })
            .where("user_id", userId)
            .andWhere("delete_time", null)
            .andWhereRaw("MONTH(created_at) = MONTH(?)", [date])
            .andWhereRaw("YEAR(created_at) = YEAR(?)", [date]);

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function searchByDescriptionOrCategory(userId: number, query: string) {
    try {
        const result = await db<Expense>(TBL_NAME)
            .select()
            .where("user_id", userId)
            .andWhere('delete_time', null)
            .andWhere(function () {
                this.whereILike("note", `%${query}%`)
                    .orWhereILike("category", `%${query}%`);
            }).orderBy('created_at', 'desc');

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function deleteById(id: number) {
    try {
        const result = await db<Expense>(TBL_NAME).update({ delete_time: new Date() }).where("record_id", id);
        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}