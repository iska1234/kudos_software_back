import { SavedData } from "../models/savedData";
import { query } from "../db/index";

export async function saveData(
  description: string,
  dataLink: string,
  userId: number
): Promise<SavedData> {
  const insertedData = (
    await query(
      "INSERT INTO saved_data (description, data_link, user_Id) VALUES ($1, $2, $3) RETURNING *",
      [description, dataLink, userId]
    )
  ).rows[0];

  return insertedData;
}
