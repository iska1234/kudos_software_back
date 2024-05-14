import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { userSchema } from "../models/users";
import { loginUserToken, registerUserToken } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, age, role} = userSchema.parse(req.body);

    const user = await registerUserToken(name, email, password, age || 0, role);
    
    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return next(new ApiError("Error al registrar usuario: " + (error as Error).message, 400));
  }
};


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;


    const { id, token } = await loginUserToken(email, password);

    req.session.userId = id;
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: { token },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return next(new ApiError("Credenciales incorrectas", 401));
  }
};


export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.clearCookie("connect.sid");
      res.json({ ok: true, message: "Logout exitoso" });
    }
  });
};