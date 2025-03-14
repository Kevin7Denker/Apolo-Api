import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../Models/User";

import * as dotenv from "dotenv";
dotenv.config();

class AuthMiddleWare {
  public static async simpleCheckToken(token: string) {
    const secret = process.env.SECRET as Secret;

    if (!token) {
      throw new Error("Access denied");
    }

    try {
      const test = await jwt.verify(token, secret);

      if (test) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }

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
      return next();
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

      return next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
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
