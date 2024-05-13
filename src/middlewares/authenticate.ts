import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const jwtSecret =  process.env["JWT_SECRET"] || '';

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No se encontró token de autorización");
    return next(new ApiError("No autorizado", 401));
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      userRole: string;
      iat: number;
      exp: number;
    };

    console.log("Payload verificado:", payload);

    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return next(new ApiError("No autorizado", 401));
  }
}