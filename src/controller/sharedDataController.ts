import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import {
  deleteSharedDataByIdService,
  getSharedDataByAdminIdService,
  getSharedDataByIdService,
  getSharedDataByUserIdService,
  getSharedDataDetailWithDeletedService,
  getSharedDataWithDeletedService,
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
      throw new Error(
        "ID de Admin no encontrado en los parámetros de solicitud"
      );
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
      throw new Error(
        "ID de Usuario no encontrado en los parámetros de solicitud"
      );
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

export async function getSharedDataBySavedDataIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sharedDataId = req.params["sharedDataId"];

    if (!sharedDataId) {
      throw new Error(
        "ID de SharedData no encontrado en los parámetros de solicitud"
      );
    }

    const sharedData = await getSharedDataByIdService(Number(sharedDataId));
    return res.status(200).json({
      success: true,
      data: sharedData,
    });
  } catch (error) {
    console.error(
      "Error al obtener los datos compartidos por sharedDataId:",
      error
    );
    return next(
      new ApiError(
        "Error al obtener los datos compartidos por sharedDataId",
        500
      )
    );
  }
}

export async function deleteSharedDataByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sharedDataId = req.params["sharedDataId"];

    if (!sharedDataId) {
      throw new Error(
        "ID de SharedData no encontrado en los parámetros de solicitud"
      );
    }

    const updatedSharedData = await deleteSharedDataByIdService(
      Number(sharedDataId)
    );

    return res.status(200).json({
      success: true,
      message: "Shared data deleted successfully",
      data: updatedSharedData,
    });
  } catch (error) {
    console.error("Error al eliminar los datos compartidos:", error);
    return next(new ApiError("Error al eliminar los datos compartidos", 500));
  }
}

export async function getSharedDataWithDeletedController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sharedData = await getSharedDataWithDeletedService();

    return res.status(200).json({
      success: true,
      data: sharedData,
    });
  } catch (error) {
    console.error(
      "Error al obtener los datos compartidos con deleted en true:",
      error
    );
    return next(
      new ApiError(
        "Error al obtener los datos compartidos con deleted en true",
        500
      )
    );
  }
}

export async function getSharedDataDetailWithDeletedController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sharedDataId = req.params["sharedDataId"];

    if (!sharedDataId) {
      throw new Error(
        "ID de SharedData no encontrado en los parámetros de solicitud"
      );
    }

    const sharedDataDetail = await getSharedDataDetailWithDeletedService(
      Number(sharedDataId)
    );
    return res.status(200).json({
      success: true,
      data: sharedDataDetail,
    });
  } catch (error) {
    console.error(
      "Error al obtener el detalle de los datos compartidos con deleted en true:",
      error
    );
    return next(
      new ApiError(
        "Error al obtener el detalle de los datos compartidos con deleted en true",
        500
      )
    );
  }
}
