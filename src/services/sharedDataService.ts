import { getSharedDataByAdminId, getSharedDataByUserId, insertSharedData } from "../data/shared-data";
import { SharedData } from "../models/sharedData";

export async function insertSharedDataService(
    adminId: number,
    savedDataId: number,
    sharedWithUserId: number
  ): Promise<SharedData> {
    const sharedData = await insertSharedData(adminId, savedDataId, sharedWithUserId);
    return sharedData;
  }

  export async function getSharedDataByAdminIdService(
    adminId: number
  ): Promise<SharedData[]> {
    const sharedData = await getSharedDataByAdminId(adminId);
    return sharedData;
  }
  

  export async function getSharedDataByUserIdService(
    userId: number
  ): Promise<SharedData[]> {
    const sharedData = await getSharedDataByUserId(userId);
    return sharedData;
  }
  