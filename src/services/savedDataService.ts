import { getAllSavedData, getAllSavedDataBySavedDataId, saveData } from "../data/saved-data";
import { SavedData } from "../models/savedData";

export async function saveUserData(
  description: string,
  dataContent: string,
  userId: number
): Promise<SavedData> {
  const savedData = await saveData(description, dataContent, userId);

  return savedData;
}

export async function getAllSavedDataService(userId: number): Promise<SavedData[]> {
  const savedData = await getAllSavedData(userId);
  return savedData;
}


export async function getAllSavedDataByIdService(savedDataId: number): Promise<SavedData[]> {
  const savedData = await getAllSavedDataBySavedDataId(savedDataId);
  return savedData;
}
