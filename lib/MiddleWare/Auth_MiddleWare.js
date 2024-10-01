var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../Models/User";
import * as dotenv from "dotenv";
dotenv.config();
class AuthMiddleWare {
    static checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            const secret = process.env.SECRET;
            if (!token) {
                return res.status(403).json({ error: "Access denied" });
            }
            try {
                yield jwt.verify(token, secret);
                return next();
            }
            catch (error) {
                return res.status(401).json({ error: "Invalid Token" });
            }
        });
    }
    static checkEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            try {
                const user = yield User.findOne({ "profile.email": email });
                if (!user || !user.validation || !user.validation.email) {
                    throw new Error("Email not verified");
                }
                return next();
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
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
}
export default AuthMiddleWare;
//# sourceMappingURL=Auth_MiddleWare.js.map