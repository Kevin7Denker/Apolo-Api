import { Request, Response } from "express";

import User from "../Models/User";
import AuthRepository from "../Repository/Auth_Repository";
import AuthValidator from "../Validators/Auth";

class AuthController {
  private authRepository: AuthRepository;

  constructor(AuthRepository: AuthRepository) {
    this.authRepository = AuthRepository;
  }

  public async signUp(req: Request, res: Response) {
    try {
      const { name, surname, email, phone, password, confirmPassword } =
        AuthValidator.SignUpBodySchema.parse(req.body);

      const user = await User.findOne({ "profile.email": email });

      if (user !== null) {
        throw new Error("User Already Exists");
      }

      if (password !== confirmPassword) {
        throw new Error("The passwords need to be equal");
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
    try {
      const { email, password } = AuthValidator.SignInBodySchema.parse(
        req.body
      );

      const result = await this.authRepository.signIn(email, password);

      if (result.error) {
        throw new Error(result.error);
      }

      return res.status(200).json({
        success: true,
        msg: "SignIn Successfully",
        items: [result],
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
    const userId = req.params.userId;

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

      if (response.file) {
        return res.status(200).sendFile(response.file);
      } else {
        return res.status(404).json({ error: "File not found" });
      }
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
      const result = await this.authRepository.errorEmail(token);

      return res.status(200).send(result);
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
      return res.status(422).json({ error: "Token invalid" });
    }

    try {
      const result = await this.authRepository.resendValEmail(Expiredtoken);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.file) {
        return res.status(200).sendFile(result.file);
      } else {
        throw new Error("File not found");
      }
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
}

export default AuthController;
