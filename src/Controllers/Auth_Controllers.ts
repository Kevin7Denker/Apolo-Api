import { Request, Response } from "express";
import AuthRepository from "../Repository/Auth_Repository";
import path from "path";
import User from "../Models/User";
import { z } from "zod";

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
        const ErrorMail = path.join(
          __dirname,
          "..",
          "Templates",
          "Emails",
          "Email_NotVerified.html"
        );
        return res.status(200).sendFile(ErrorMail);
      } else {
        return { error: "Unknown Error" };
      }
    }
  }
}

export default AuthController;
