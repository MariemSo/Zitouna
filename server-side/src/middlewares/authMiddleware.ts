import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Access denied. No token provided.",
    });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        res.status(401).json({
          success: false,
          message: "Invalid Token",
          error: err.message,
        });
        return;
      }

      if (!decoded || typeof decoded !== "object") {
        res.status(401).json({
          success: false,
          message: "Invalid Token Structure",
        });
        return;
      }

      req.user = {
        id: (decoded as any).id,
        role: (decoded as any).role,
      };

      next();
    });
  } catch (error: any) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Access Denied",
      error: error.message,
    });
  }
};
