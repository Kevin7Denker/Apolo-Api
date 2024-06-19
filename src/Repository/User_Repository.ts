import User from "../Models/User";

import * as dotenv from "dotenv";
dotenv.config();

class UserRepository {
  public async findUser(id: string) {
    try {
      const user = await User.findOne({ id_: id });

      if (user == null) {
        throw new Error("User not exists");
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        return { error: `${error.message}` };
      } else {
        return { error: "error" };
      }
    }
  }
}

export default UserRepository;
