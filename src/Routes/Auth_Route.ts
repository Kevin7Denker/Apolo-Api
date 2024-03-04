import express from "express";
import UserController from "../Controllers/User_Controllers";
import UserRepository from "../Repository/User_Repository";
import AuthMiddleWare from "../MiddleWare/Auth_MiddleWare";
import UserValidation from "../Utils/Validation/User_Validation";

const route = express.Router();

const userRepository = new UserRepository();
const userValidation = new UserValidation();
const userController = new UserController(userRepository, userValidation);

route.post("/signup", (req, res) => userController.signUp(req, res));
route.post("/signin", AuthMiddleWare.checkEmail, (req, res) =>
  userController.signIn(req, res)
);

route.get("/verify-email=:token", (req, res) =>
  userController.valEmail(req, res)
);

export default route;
