import UserRepository from "../Repository/User_Repository";

import { Request, Response } from "express";

class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async findUser(req: Request, res: Response) {
    const id = req.params.id;

    if (id === undefined) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const response = await this.userRepository.findUser(id);

      return res.status(200).json(response);
    } catch (error) {
      return error;
    }
  }
}

export default UserController;
