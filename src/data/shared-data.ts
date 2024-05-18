import { query } from "../db";
import { SharedData } from "../models/sharedData";

export async function insertSharedData(
  adminId: number,
  savedDataId: number,
  sharedWithUserId: number
): Promise<SharedData> {
  const insertedData = (
    await query(
      "INSERT INTO shared_data (adminId, savedDataId, sharedWithUserId) VALUES ($1, $2, $3) RETURNING *",
      [adminId, savedDataId, sharedWithUserId]
    )
  ).rows[0];

  return insertedData;
}

export async function getSharedDataByAdminId(
  adminId: number
): Promise<SharedData[]> {
  const result = await query(
    `SELECT sd.*, u.Name AS shared_with_user_name
       FROM shared_data sd
       INNER JOIN users u ON sd.sharedWithUserId = u.id
       WHERE sd.adminId = $1`,
    [adminId]
  );
  return result.rows;
}

export async function getSharedDataByUserId(
  userId: number
): Promise<SharedData[]> {
  const result = await query(
    `SELECT sd.*, u.Name AS shared_with_user_name
       FROM shared_data sd
       INNER JOIN users u ON sd.sharedWithUserId = u.id
       WHERE sd.sharedWithUserId = $1`,
    [userId]
  );
  return result.rows;
}
