import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user: { role: string }) => {
  const jwtSecret =  process.env["JWT_SECRET"] || '';
  return jwt.sign({ role: user.role }, jwtSecret, {
    expiresIn: "1d",
  });
};
