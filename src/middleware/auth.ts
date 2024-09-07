import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers["authorization"]?.slice(7);
    if (!token) return res.status(401).json({ message: "Invalid token" });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodedData as { id: number };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
