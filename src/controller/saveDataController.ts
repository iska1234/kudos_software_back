import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { saveUserData } from "../services/savedDataService";

export async function saveDataController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { description, dataLink } = req.body;
    const userId = req.userId;

    if (!userId) {
      return next(
        new ApiError("ID de usuario no encontrado en la solicitud", 400)
      );
    }

    if (!description || !dataLink) {
      return next(
        new ApiError("Descripción y enlace de datos son obligatorios", 400)
      );
    }

    const savedData = await saveUserData(description, dataLink, userId);

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
