import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../Models/User_Models/User";

import * as dotenv from "dotenv";
dotenv.config();

class AuthMiddleWare {
  public static async checkToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET as Secret;

    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }

    try {
      await jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid Token" });
    }
  }

  public static async checkEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const email = req.body.email;

    try {
      const user = await User.findOne({ "profile.email": email });

      if (!user || !user.validation || !user.validation.email) {
        throw new Error("Email not verified");
      }

      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }
}

export default AuthMiddleWare;
