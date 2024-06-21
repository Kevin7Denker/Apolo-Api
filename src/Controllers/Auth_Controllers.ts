import { Request, Response } from "express";
import AuthRepository from "../Repository/Auth_Repository";

import { z } from "zod";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import User from "../Models/User";

class AuthController {
  private authRepository: AuthRepository;

  constructor(AuthRepository: AuthRepository) {
    this.authRepository = AuthRepository;
  }

  public async signUp(req: Request, res: Response) {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string().email(),
        phone: z.string(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
      });

      const { name, surname, email, phone, password, confirmPassword } =
        createUserBodySchema.parse(req.body);

      const user = await User.findOne({ "profile.email": email });

      if (user != null) {
        throw new Error("User Already Exists");
      }

      if (password !== confirmPassword) {
        throw new Error("The passwords need be equals");
      }

      const response = await this.authRepository.signUp(
        name,
        surname,
        email,
        phone,
        password
      );

      if (response.error) {
        throw new Error(response.error);
      }

      res.status(201).json({
        success: true,
        msg: "SignUp Successfully",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async signIn(req: Request, res: Response) {
    try {
      const createUserBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { email, password } = createUserBodySchema.parse(req.body);

      const response = await this.authRepository.signIn(email, password);

      if (response.error) {
        throw new Error(response.error);
      }

      res.status(200).json({
        success: true,
        msg: "SignIn Successfully",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async valEmail(req: Request, res: Response) {
    const token = req.params.token;

    if (!token) {
      res.status(422).json({ error: "Token invalid" });
    }

    try {
      const response = await this.authRepository.valEmail(token);

      if (response.error) {
        throw new Error(response.error);
      }

      const WelcomeMail = path.join(
        __dirname,
        "..",
        "Templates",
        "Emails",
        "Email_Welcome.html"
      );

      return res.status(200).sendFile(WelcomeMail);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.redirect(
          `https://apolo-api.onrender.com/auth/verify-email/error/${token}`
        );
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async errorValEmail(req: Request, res: Response) {
    const token = req.params.token;

    if (!token) {
      res.status(422).json({ error: "Token invalid" });
    }

    try {
      const templatePath = path.join(
        __dirname,
        "..",
        "Templates",
        "Emails",
        "Email_NotVerified.html"
      );
      const templateContent = fs.readFileSync(templatePath, "utf-8");

      const html = await ejs.render(templateContent, {
        verificationLink: `https://apolo-api.onrender.com/auth/verify-email/resend/${token}`,
      });

      res.status(200).send(html);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({
          token: { token },
          error: "Verification failed.",
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async resendValEmail(req: Request, res: Response) {
    const Expiredtoken = req.params.token;

    if (!Expiredtoken) {
      res.status(422).json({ error: "Token invalid" });
    }

    try {
      console.log("ExpiredToken at resendValEmail" + Expiredtoken);
      this.authRepository.resendValEmail(Expiredtoken);

      res.status(200).json({
        success: true,
        msg: "Email Resend Successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: "Verification failed. Please try again.",
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }
}

export default AuthController;
