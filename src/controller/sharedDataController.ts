import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import {
  getSharedDataByAdminIdService,
  getSharedDataByUserIdService,
  insertSharedDataService,
} from "../services/sharedDataService";

export async function insertSharedDataController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { adminId, savedDataId, sharedWithUserId } = req.body;

    if (!adminId || !savedDataId || !sharedWithUserId) {
      return next(
        new ApiError(
          "Todos los campos (userId, savedDataId, sharedWithUserId) son obligatorios",
          400
        )
      );
    }

    const sharedData = await insertSharedDataService(
      adminId,
      savedDataId,
      sharedWithUserId
    );

    return res.status(201).json({
      success: true,
      message: "Datos compartidos exitosamente",
      data: sharedData,
    });
  } catch (error) {
    console.error("Error al compartir los datos:", error);
    return next(new ApiError("Error al compartir los datos", 500));
  }
}

export async function getSharedDataByAdminIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const adminId = req.params["adminId"];

    if (!adminId) {
      throw new Error("Admin ID not found in request parameters");
    }

    const sharedData = await getSharedDataByAdminIdService(Number(adminId));

    return res.status(200).json({
      success: true,
      data: sharedData,
    });
  } catch (error) {
    console.error("Error al obtener los datos compartidos por adminId:", error);
    return next(
      new ApiError("Error al obtener los datos compartidos por adminId", 500)
    );
  }
}

export async function getSharedDataByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params["userId"];

    if (!userId) {
      throw new Error("El userId no existe en los parametros");
    }

    const sharedData = await getSharedDataByUserIdService(Number(userId));

    return res.status(200).json({
      success: true,
      data: sharedData,
    });
  } catch (error) {
    console.error("Error al obtener los datos compartidos por userId:", error);
    return next(
      new ApiError("Error al obtener los datos compartidos por userId", 500)
    );
  }
}
