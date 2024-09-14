import { db } from "../config/db";


const TBL_NAME = "tbl_previous_records";

export interface PreviousRecord {
    id: number;
    record_id: string;
    category: string;
    note: string;
    amount: string;
    user_id: string;
    update_time: Date;
}

type Option = {
    page?: number,
    per_page?: number,
    limit?: number,
    q?: string,
    cols?: (keyof PreviousRecord)[],
    recordOpt?: {
        record_id: string,
        // deleted: boolean
    }
};

export async function select(opt?: Option) {
    let sql = `SELECT ${opt?.cols ? opt.cols : '*'} FROM ${TBL_NAME}
    WHERE ${opt?.recordOpt?.record_id ? 'record_id = ' + '"' + opt.recordOpt.record_id + '"' : ''}
    `;

    const result = db.raw(sql);

    return (await result)[0];
}
