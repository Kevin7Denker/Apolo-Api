import UserValidation from "../Utils/Validation/User_Validation";
import UserRepository from "../Repository/User_Repository";

import User from "../Models/User";

import { Request, Response } from "express";
import { SignUpRequest } from "../Interface/Requests/User_Request";

class UserController {
  private userRepository: UserRepository;
  private userValidation: UserValidation;

  constructor(userRepository: UserRepository, userValidation: UserValidation) {
    this.userRepository = userRepository;
    this.userValidation = userValidation;
  }

  public async signUp(req: Request, res: Response) {
    const {
      name,
      surname,
      email,
      phone,
      password,
      confirmPassword,
    }: SignUpRequest = req.body;

    try {
      const user = await User.findOne({ "profile.email": email });

      this.userValidation.vefName(name, res);
      this.userValidation.vefSurname(surname, res);
      this.userValidation.vefEmail(email, res);
      this.userValidation.vefPhone(phone, res);
      this.userValidation.vefPassword(password, res);
      this.userValidation.vefConfirmPassword(confirmPassword, res);
      this.userValidation.vefUser(typeof user, res);
      this.userValidation.vefEquals(password, confirmPassword, res);

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
      this.userValidation.vefEmail(email, res);
      this.userValidation.vefPassword(password, res);

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
