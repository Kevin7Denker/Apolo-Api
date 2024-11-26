import { Request, Response } from "express";

import path from "path";
import ejs from "ejs";
import fs from "fs";

import User from "../Models/User";
import AuthRepository from "../Repository/Auth_Repository";
import AuthValidator from "../Validators/Auth";

class AuthController {
  private authRepository: AuthRepository;

  constructor(AuthRepository: AuthRepository) {
    this.authRepository = AuthRepository;
  }

  public async signUp(req: Request, res: Response) {
    const { name, surname, email, phone, password, confirmPassword } =
      AuthValidator.SignUpBodySchema.parse(req.body);

    try {
      const user = await User.findOne({ "profile.email": email });

      if (user) {
        throw new Error("User Already Exists");
      }

      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password must be the same");
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

      return res.status(201).json({
        success: true,
        msg: "SignUp Successfully",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      } else {
        return res.status(500).json({ success: false, error: "Unknown Error" });
      }
    }
  }

  public async signIn(req: Request, res: Response) {
    const { email, password } = AuthValidator.SignInBodySchema.parse(req.body);

    try {
      const response = await this.authRepository.signIn(email, password);

      if (response.error) {
        throw new Error(response.error);
      }

      return res.status(200).json({
        success: true,
        msg: "SignIn Successfully",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { userId } = AuthValidator.UserIdBodySchema.parse(req.body);

    try {
      if (!userId) {
        throw new Error("User not found");
      }

      this.authRepository.deleteUser(userId);

      return res.status(200).json({ success: true, msg: "User Deleted" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Erro desconhecido" });
      }
    }
  }

  public async valEmail(req: Request, res: Response) {
    const token = req.params.token;

    if (!token) {
      return res.status(422).json({ error: "Token invalid" });
    }

    try {
      const response = await this.authRepository.valEmail(token);

      if (response.error) {
        throw new Error(response.error);
      }

      const Welcome = path.join(
        __dirname,
        "..",
        "Templates",
        "Responses",
        "Response_Welcome.html"
      );

      return res.status(200).sendFile(Welcome);
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
      return res.status(422).json({ error: "Token invalid" });
    }

    try {
      const templatePath = path.join(
        __dirname,
        "..",
        "Templates",
        "Responses",
        "Response_NotVerified.html"
      );
      const templateContent = fs.readFileSync(templatePath, "utf-8");

      const html = await ejs.render(templateContent, {
        verificationLink: `https://apolo-api.onrender.com/auth/verify-email/resend/${token}`,
      });

      return res.status(200).send(html);
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
    const token = req.params.token;
    if (!token) {
      return res.status(422).json({ error: "Token invalid" });
    }

    try {
      this.authRepository.resendValEmail(token);

      return res.status(200).json({
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

  public async completeWelcome(req: Request, res: Response) {
    const { email, image, identity, genres, country, code } =
      AuthValidator.WelcomeBodySchema.parse(req.body);
    try {
      const response = await this.authRepository.CompleteWelcome(
        email,
        image,
        identity,
        genres,
        country,
        code
      );

      return res.status(200).json({
        success: true,
        msg: "Welcome Completed",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      } else {
        return res.status(500).json({ success: false, error: "Unknown Error" });
      }
    }
  }

  public async updateImage(req: Request, res: Response) {
    const { image, userId } = AuthValidator.UpdateImageBodySchema.parse(
      req.body
    );

    try {
      const response = await this.authRepository.updateImage(image, userId);

      return res.status(200).json({
        success: true,
        msg: "Image Updated",
        items: [response],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      } else {
        return res.status(500).json({ success: false, error: "Unknown Error" });
      }
    }
  }
}

export default AuthController;
