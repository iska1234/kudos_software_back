import { saveData } from "../data/saved-data";
import { SavedData } from "../models/savedData";

export async function saveUserData(
    description: string,
    dataLink: string,
    userId: number
  ): Promise<SavedData> {

    const savedData = await saveData(description, dataLink, userId);
  
    return savedData;
  }