import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import pool from "./createPool"

export async function dbExecute(query: string, values?: any): Promise<[RowDataPacket[], FieldPacket[]]> {
    let results;
    try {
      if(values === undefined){
        results = await pool.execute<RowDataPacket[]>(query)
      } else {
        results = await pool.execute<RowDataPacket[]>(query, values)
      }
    } catch(err){
      console.error('DB: err', err);
      throw err
    }
    return results;
}

export async function dbQuery(query: string, values?: any): Promise<[RowDataPacket[], FieldPacket[]]> {
  let results;
  try {
    if(values === undefined){
      results = await pool.query<RowDataPacket[]>(query)
    } else {
      results = await pool.query<RowDataPacket[]>(query, values)
    }
  } catch(err){
    console.error('DB: err', err);
    throw err
  }
  return results;
}