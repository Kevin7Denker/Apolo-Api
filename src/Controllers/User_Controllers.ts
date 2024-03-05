import UserRepository from "../Repository/User_Repository";

import User from "../Models/User";
import { z } from "zod";

import { Request, Response } from "express";

class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async signUp(req: Request, res: Response) {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string().email(),
        phone: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
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

      const response = await this.userRepository.signUp(
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
        data: [response],
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
    const { email, password } = req.body;

    try {
      const response = await this.userRepository.signIn(email, password);

      if (response.error) {
        throw new Error(response.error);
      }

      res.status(200).json({
        success: true,
        msg: "SignIn Successfully",
        data: [response],
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
      const response = await this.userRepository.valEmail(token);

      if (response.error) {
        throw new Error(response.error);
      }

      return res.status(200).json({
        success: true,
        msg: response.msg,
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

  public async findUser(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const response = await this.userRepository.findUser(id);

      return res.status(200).json(response);
    } catch (error) {
      return error;
    }
  }
}

export default UserController;
