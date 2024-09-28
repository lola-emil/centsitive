import { string } from "joi";
import { db } from "../config/db";
import { Expense } from "./expense";


const TBL_NAME = "tbl_records";

export interface SearchOptions {
    category?: string;
    created_at?: string;
    searchQuery?: string;
  }

  export async function get(searchOptions: SearchOptions) {
    const { category, created_at, searchQuery } = searchOptions;
  
    // Base query string
    let query = `
      SELECT tbl_records.*, 
             tbl_users.firstname AS firstname, 
             tbl_users.lastname AS lastname
      FROM tbl_records
      JOIN tbl_users ON tbl_records.user_id = tbl_users.user_id
    `;
  
    // Conditions array to dynamically add where clauses
    let conditions: string[] = [];
    let params: (string | number)[] = [];
  
    // Apply search query if provided
    if (searchQuery) {
      const search = `%${searchQuery.toUpperCase()}%`; // For case-insensitive search
      conditions.push(`
        (UPPER(tbl_records.note) LIKE ? 
        OR UPPER(tbl_users.firstname) LIKE ? 
        OR UPPER(tbl_users.lastname) LIKE ?)
      `);
      params.push(search, search, search); // Push search string for each LIKE condition
    }
  
    // Apply month and year filtering if created_at is provided
    if (created_at) {
      // Extract the month and year from the created_at date
      conditions.push("MONTH(tbl_records.created_at) = MONTH(?) AND YEAR(tbl_records.created_at) = YEAR(?)");
      params.push(created_at, created_at); // Add the date for both month and year comparison
    }
  
    // Apply category filter if provided
    if (category) {
      conditions.push("tbl_records.category = ?");
      params.push(category); // Add category parameter
    }
  
    // If there are any conditions, add them to the query
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
  
    // Execute the query
    const [rows] = await db.raw(query, params);
    return rows;
  }

  export async function getById(id: any) {
    const result = await db<Expense>(TBL_NAME).select(
      "tbl_records.*",    
        "tbl_users.firstname as firstname",
        "tbl_users.lastname as lastname"
    ).where("record_id", id)
    .join("tbl_users", "tbl_records.user_id", "=", "tbl_users.user_id");;

    return result;
  }

  export async function getTotalExpense() {
    const result = await db<Expense>(TBL_NAME).sum("amount as total").where("status", "approved");
    return result;
  }




export async function getRecent(opt: Partial<Expense>) {
    const result = await db<Expense>(TBL_NAME).select( "tbl_records.*",    
      "tbl_users.firstname as firstname",
      "tbl_users.lastname as lastname")
    .join("tbl_users", "tbl_records.user_id", "=", "tbl_users.user_id")
    .where(opt).orderBy("created_at", "desc").limit(10);
    return result;
}

export async function update(id: any, data: Partial<Expense>) {
    const result = await db<Expense>(TBL_NAME).update(data).where("record_id", id);
    return result;
}

export async function deleteById(id: number | string) {
    const result = await db<Expense>(TBL_NAME).delete().where("record_id", id);
    return result;
}