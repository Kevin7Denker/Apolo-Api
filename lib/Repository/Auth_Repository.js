var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ejs from "ejs";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import { SignUpEmail } from "../Services/Email/Emails.ts/Auth_Emails";
import { env } from "../Config/ServerConfig";
class AuthRepository {
    signUp(name, surname, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(12);
            const hash = yield bcrypt.hash(password, salt);
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
                const secret = env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const valToken = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });
                SignUpEmail(email, valToken);
                const userWP = Object.assign({}, user.toObject());
                if (userWP.profile && userWP.profile.password) {
                    delete userWP.profile.password;
                }
                return userWP;
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: error.message };
                }
                else {
                    return { error: "Erro desconhecido" };
                }
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ "profile.email": email });
                if (user == null) {
                    throw new Error("User not found");
                }
                const check = yield bcrypt.compare(password, user.profile.password);
                if (check == null) {
                    throw new Error("Password Incorrect");
                }
                const secret = env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });
                user.profile.lastLogin = new Date(Date.now());
                user.save();
                const userWP = Object.assign({}, user.toObject());
                if (userWP.profile && userWP.profile.password) {
                    delete userWP.profile.password;
                }
                return { token, user: userWP };
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: error.message };
                }
                else {
                    return { error: "Unknowm Error" };
                }
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndDelete(userId);
                if (user == null) {
                    throw new Error("User not found");
                }
                return true;
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: error.message };
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    valEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const verify = jwt.verify(token, secret);
                const jwtVerify = verify;
                const user = yield User.findById({ _id: jwtVerify.id });
                if (user == null) {
                    throw new Error("User not found");
                }
                user.validation.email = true;
                user.save();
                return { msg: "Validation Completed" };
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: `${error.message}` };
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    errorEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = env.SECRET;
            if (secret == null) {
                throw new Error("The secret is not defined");
            }
            if (!token) {
                throw new Error("Token not found");
            }
            try {
                const templatePath = path.join(__dirname, "../../Templates/Emails/Email_NotVerified.html");
                const templateContent = fs.readFileSync(templatePath, "utf-8");
                const html = yield ejs.render(templateContent, {
                    verificationLink: `https://apolo-api.onrender.com/auth/verify-email/resend/${token}`,
                });
                return html;
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: `${error.message}` };
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    resendValEmail(expiredToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = env.SECRET;
            if (secret == null) {
                throw new Error("The secret is not defined");
            }
            try {
                const verify = jwt.decode(expiredToken);
                const userId = verify.id;
                const user = yield User.findById({ _id: userId });
                const email = user === null || user === void 0 ? void 0 : user.profile.email;
                const secret = env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const valToken = jwt.sign({ id: user === null || user === void 0 ? void 0 : user.profile.email }, secret, {
                    expiresIn: "30m",
                });
                SignUpEmail(email, valToken);
                return { msg: "Email sent" };
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: `${error.message}` };
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
}
export default AuthRepository;
//# sourceMappingURL=Auth_Repository.js.map