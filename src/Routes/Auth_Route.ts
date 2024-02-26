import express from "express";
import UserController from "../Controllers/User_Controllers";
import UserRepository from "../Repository/User_Repository";
import AuthMiddleWare from "../MiddleWare/Auth_MiddleWare";

const route = express.Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

route.get("/", (req, res) => {
  res.send("Auth!");
});
route.post("/signup", (req, res) => userController.signUp(req, res));
route.post("/signin", AuthMiddleWare.checkEmail, (req, res) =>
  userController.signIn(req, res)
);

route.get("/verify-email=:token", (req, res) =>
  userController.valEmail(req, res)
);

export default route;
