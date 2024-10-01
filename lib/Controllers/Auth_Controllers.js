var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import ejs from "ejs";
import fs from "fs";
import User from "../Models/User";
import AuthValidator from "../Validators/Auth";
class AuthController {
    constructor(AuthRepository) {
        this.authRepository = AuthRepository;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, email, phone, password, confirmPassword } = AuthValidator.SignUpBodySchema.parse(req.body);
                const user = yield User.findOne({ "user.profile.email": email });
                if (user !== null) {
                    throw new Error("User Already Exists");
                }
                if (password !== confirmPassword) {
                    throw new Error("The passwords need to be equal");
                }
                const response = yield this.authRepository.signUp(name, surname, email, phone, password);
                if (response.error) {
                    throw new Error(response.error);
                }
                return res.status(201).json({
                    success: true,
                    msg: "SignUp Successfully",
                    items: [response],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        success: false,
                        error: error.message,
                    });
                }
                else {
                    return res.status(500).json({ success: false, error: "Unknown Error" });
                }
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = AuthValidator.SignInBodySchema.parse(req.body);
                const response = yield this.authRepository.signIn(email, password);
                if (response.error) {
                    throw new Error(response.error);
                }
                return res.status(200).json({
                    success: true,
                    msg: "SignIn Successfully",
                    items: [response],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(404).json({
                        success: false,
                        error: error.message,
                    });
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                if (!userId) {
                    throw new Error("User not found");
                }
                this.authRepository.deleteUser(userId);
                return res.status(200).json({ success: true, msg: "User Deleted" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                else {
                    return res.status(500).json({ error: "Erro desconhecido" });
                }
            }
        });
    }
    valEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            if (!token) {
                return res.status(422).json({ error: "Token invalid" });
            }
            try {
                const response = yield this.authRepository.valEmail(token);
                if (response.error) {
                    throw new Error(response.error);
                }
                const Welcome = path.join(__dirname, "..", "Templates", "Responses", "Response_Welcome.html");
                return res.status(200).sendFile(Welcome);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.redirect(`https://apolo-api.onrender.com/auth/verify-email/error/${token}`);
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    errorValEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            if (!token) {
                return res.status(422).json({ error: "Token invalid" });
            }
            try {
                const templatePath = path.join(__dirname, "..", "Templates", "Responses", "Response_NotVerified.html");
                const templateContent = fs.readFileSync(templatePath, "utf-8");
                const html = yield ejs.render(templateContent, {
                    verificationLink: `https://apolo-api.onrender.com/auth/verify-email/resend/${token}`,
                });
                return res.status(200).send(html);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        token: { token },
                        error: "Verification failed.",
                    });
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
    resendValEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Expiredtoken = req.params.token;
            if (!Expiredtoken) {
                return res.status(422).json({ error: "Token invalid" });
            }
            try {
                this.authRepository.resendValEmail(Expiredtoken);
                return res.status(200).json({
                    success: true,
                    msg: "Email Resend Successfully",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        error: "Verification failed. Please try again.",
                    });
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
}
export default AuthController;
//# sourceMappingURL=Auth_Controllers.js.map