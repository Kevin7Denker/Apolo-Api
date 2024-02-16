"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../Models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_Emails_1 = require("../Services/Emails.ts/Auth_Emails");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class UserRepository {
    signUp(name, surname, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(12);
            const hash = yield bcrypt_1.default.hash(password, salt);
            try {
                const user = new User_1.default({
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
                const valToken = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: "10m" });
                (0, Auth_Emails_1.SignUpEmail)(email, valToken);
                const userWP = Object.assign({}, user.toObject());
                if (userWP.profile && userWP.profile.password) {
                    delete userWP.profile.password;
                }
                return userWP;
            }
            catch (error) {
                console.error("Error creating user:", error);
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ "profile.email": email });
                if (user == null) {
                    throw new Error("User not found");
                }
                const check = yield bcrypt_1.default.compare(password, user.profile.password);
                if (check == null) {
                    throw new Error("Password Incorrect");
                }
                const secret = process.env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: "30m" });
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
                    return { error: "Erro desconhecido" };
                }
            }
        });
    }
    valEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRET;
                if (secret == null) {
                    throw new Error("The secret is not defined");
                }
                const verify = jsonwebtoken_1.default.verify(token, secret);
                const jwtVerify = verify;
                const user = yield User_1.default.findById({ _id: jwtVerify.id });
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
                    return { error: "Erro desconhecido" };
                }
            }
        });
    }
}
exports.default = UserRepository;
