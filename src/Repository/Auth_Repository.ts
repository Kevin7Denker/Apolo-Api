import ejs from "ejs";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { AnyObject } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../Models/User";
import { SignUpEmail } from "../Services/Email/Emails.ts/Auth_Emails";
import { env } from "../Config/ServerConfig";

class AuthRepository {
  public async signUp(
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    nationality: string
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
          nationality: nationality,
        },
      });

      user.save();

      const secret = env.SECRET;

      if (secret == null) {
        throw new Error("The secret is not defined");
      }

      const valToken = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });

      SignUpEmail(email, valToken);

      const userWP: AnyObject = { ...user.toObject() };

      if (userWP.profile && userWP.profile.password) {
        delete userWP.profile.password;
      }

      return userWP;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "Erro desconhecido" };
      }
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

      const secret = env.SECRET;

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
        return { error: "Unknowm Error" };
      }
    }
  }

  public async deleteUser(userId: string) {
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        throw new Error("User not found");
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async valEmail(token: string) {
    try {
      const secret = env.SECRET;

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
        return { error: "Unknown Error" };
      }
    }
  }

  public async errorEmail(token: string) {
    const secret = env.SECRET;

    if (secret == null) {
      throw new Error("The secret is not defined");
    }

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const templatePath = path.join(
        __dirname,
        "../../Templates/Emails/Email_NotVerified.html"
      );
      const templateContent = fs.readFileSync(templatePath, "utf-8");

      const html = await ejs.render(templateContent, {
        verificationLink: `https://apolo-api.onrender.com/auth/verify-email/resend/${token}`,
      });

      return html;
    } catch (error) {
      if (error instanceof Error) {
        return { error: `${error.message}` };
      } else {
        return { error: "Unknown Error" };
      }
    }
  }

  public async resendValEmail(expiredToken: string) {
    const secret = env.SECRET;

    if (secret == null) {
      throw new Error("The secret is not defined");
    }

    try {
      const verify = jwt.decode(expiredToken) as JwtPayload;

      const userId = verify.id;

      const user = await User.findById({ _id: userId });
      const email = user?.profile.email as string;

      const secret = env.SECRET;

      if (secret == null) {
        throw new Error("The secret is not defined");
      }

      const valToken = jwt.sign({ id: user?.profile.email }, secret, {
        expiresIn: "30m",
      });

      SignUpEmail(email, valToken);

      return { msg: "Email sent" };
    } catch (error) {
      if (error instanceof Error) {
        return { error: `${error.message}` };
      } else {
        return { error: "Unknown Error" };
      }
    }
  }
}

export default AuthRepository;
