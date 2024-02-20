import bcrypt from "bcrypt";
import User from "../Models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AnyObject } from "mongoose";
import { SignUpEmail } from "../Services/Emails.ts/Auth_Emails";

import * as dotenv from "dotenv";
dotenv.config();

class UserRepository {
  public async signUp(
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string
  ) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    try {
      const user = new User({
        profile: {
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          password: hash,
        },
      });

      user.save();

      const secret = process.env.SECRET;

      if (secret == null) {
        throw new Error("The secret is not defined");
      }

      const valToken = jwt.sign({ id: user._id }, secret, { expiresIn: "10m" });

      SignUpEmail(email, valToken);

      const userWP: AnyObject = { ...user.toObject() };

      if (userWP.profile && userWP.profile.password) {
        delete userWP.profile.password;
      }

      return userWP;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const user = await User.findOne({ "profile.email": email });

      if (user == null) {
        throw new Error("User not found");
      }

      const check = await bcrypt.compare(password, user.profile!.password);

      if (check == null) {
        throw new Error("Password Incorrect");
      }

      const secret = process.env.SECRET;

      if (secret == null) {
        throw new Error("The secret is not defined");
      }

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });
      user.profile!.lastLogin = new Date(Date.now());

      user.save();

      const userWP: AnyObject = { ...user.toObject() };

      if (userWP.profile && userWP.profile.password) {
        delete userWP.profile.password;
      }

      return { token, user: userWP };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "Erro desconhecido" };
      }
    }
  }

  public async valEmail(token: string) {
    try {
      const secret = process.env.SECRET;

      if (secret == null) {
        throw new Error("The secret is not defined");
      }

      const verify: string | JwtPayload = jwt.verify(token, secret);
      const jwtVerify = verify as JwtPayload;
      const user = await User.findById({ _id: jwtVerify.id });

      if (user == null) {
        throw new Error("User not found");
      }

      user.validation!.email = true;
      user.save();

      return { msg: "Validation Completed" };
    } catch (error) {
      if (error instanceof Error) {
        return { error: `${error.message}` };
      } else {
        return { error: "Erro desconhecido" };
      }
    }
  }

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
