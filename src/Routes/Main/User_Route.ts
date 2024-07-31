import express from "express";
import UserController from "../../Controllers/User_Controllers";
import UserRepository from "../../Repository/User_Repository";

const route = express.Router();

const userRepository = new UserRepository();

const userController = new UserController(userRepository);

route.post("/find-user/:id", (req, res) => userController.findUser(req, res));
route.post("/find-identity/:id", (req, res) =>
  userController.findIdentity(req, res)
);

export default route;
