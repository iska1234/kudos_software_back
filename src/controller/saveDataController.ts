import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { getAllSavedDataByIdService, getAllSavedDataService, saveUserData } from "../services/savedDataService";

export async function saveDataController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { description, dataContent } = req.body;
    const userId = req.userId;

    if (!userId) {
      return next(
        new ApiError("ID de usuario no encontrado en la solicitud", 400)
      );
    }

    if (!description || !dataContent) {
      return next(
        new ApiError("Descripción y enlace de datos son obligatorios", 400)
      );
    }

    const savedData = await saveUserData(description, dataContent, userId);

    return res.status(201).json({
      success: true,
      message: "Datos guardados exitosamente",
      data: savedData,
    });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    return next(new ApiError("Error al guardar los datos", 500));
  }
}

export async function getAllSavedDataController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params['userId']; 

    if (!userId) {
      throw new Error("User ID not found in request parameters");
    }

    const savedData = await getAllSavedDataService(Number(userId));

    return res.status(200).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    console.error("Error al obtener todos los datos guardados:", error);
    return next(new ApiError("Error al obtener todos los datos guardados", 500));
  }
}


export async function getAllSavedDataByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const savedDataId = req.params['savedDataId']; 

    if (!savedDataId) {
      throw new Error("Saved data ID not found in request parameters");
    }

    const savedData = await getAllSavedDataByIdService(Number(savedDataId));

    return res.status(200).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    console.error("Error al obtener los datos guardados por ID:", error);
    return next(new ApiError("Error al obtener los datos guardados por ID", 500));
  }
}
