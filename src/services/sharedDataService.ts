import {
  deleteSharedDataById,
  getSharedDataByAdminId,
  getSharedDataById,
  getSharedDataByUserId,
  getSharedDataDetailWithDeleted,
  getSharedDataWithDeleted,
  insertSharedData,
  restoreSharedDataById,
} from "../data/shared-data";
import { SharedData } from "../models/sharedData";

export async function insertSharedDataService(
  adminId: number,
  savedDataId: number,
  sharedWithUserId: number
): Promise<SharedData> {
  const sharedData = await insertSharedData(
    adminId,
    savedDataId,
    sharedWithUserId
  );
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

export async function getSharedDataByIdService(
  savedDataId: number
): Promise<SharedData[]> {
  const sharedData = await getSharedDataById(savedDataId);
  return sharedData;
}

export async function deleteSharedDataByIdService(sharedDataId: number): Promise<SharedData | null> {
  const deletedData = await deleteSharedDataById(sharedDataId);
  return deletedData;
}

export async function restoreSharedDataByIdService(sharedDataId: number): Promise<SharedData | null> {
  const deletedData = await restoreSharedDataById(sharedDataId);
  return deletedData;
}


export async function getSharedDataWithDeletedService(): Promise<SharedData[]> {
  const sharedData = await getSharedDataWithDeleted();
  return sharedData;
}

export async function getSharedDataDetailWithDeletedService(
  sharedDataId: number
): Promise<SharedData | null> {
  const sharedDataDetail = await getSharedDataDetailWithDeleted(sharedDataId);
  return sharedDataDetail;
}