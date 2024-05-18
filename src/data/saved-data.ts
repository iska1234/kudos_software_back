import { SavedData } from "../models/savedData";
import { query } from "../db/index";

export async function saveData(
  description: string,
  dataContent: string,
  userId: number
): Promise<SavedData> {
  const insertedData = (
    await query(
      "INSERT INTO saved_data (description, data_content, user_Id) VALUES ($1, $2, $3) RETURNING *",
      [description, dataContent, userId]
    )
  ).rows[0];

  return insertedData;
}

export async function getAllSavedData(userId: number): Promise<SavedData[]> {
  const result = await query(
    "SELECT sd.*, u.Name AS user_name FROM saved_data sd INNER JOIN users u ON sd.user_id = u.id WHERE sd.user_id = $1 ORDER BY sd.id ASC;",
    [userId]
  );
  return result.rows;
}

export async function getAllSavedDataBySavedDataId(
  savedDataId: number
): Promise<SavedData[]> {
  const result = await query(
    "SELECT sd.*, u.Name AS user_name FROM saved_data sd INNER JOIN users u ON sd.user_id = u.id WHERE sd.id = $1",
    [savedDataId]
  );
  return result.rows;
}
