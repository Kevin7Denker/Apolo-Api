"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controllers_1 = __importDefault(require("../Controllers/User_Controllers"));
const User_Repository_1 = __importDefault(require("../Repository/User_Repository"));
const Auth_MiddleWare_1 = __importDefault(require("../MiddleWare/Auth_MiddleWare"));
const route = express_1.default.Router();
const userRepository = new User_Repository_1.default();
const userController = new User_Controllers_1.default(userRepository);
route.post("/signup", (req, res) => userController.signUp(req, res));
route.post("/signin", Auth_MiddleWare_1.default.checkEmail, (req, res) => userController.signIn(req, res));
route.get("/verify-email=:token", (req, res) => userController.valEmail(req, res));
exports.default = route;
