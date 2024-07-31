import User from "../Models/User";

class UserRepository {
  public async findUser(id: string) {
    try {
      const user = await User.findOne({ _id: id });

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

  public async findIdentity(identity: string) {
    try {
      const ident = await User.findOne({ "profile.identity": identity });

      if (ident) {
        return false;
      }

      if (!ident) {
        return true;
      }

      return;
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
