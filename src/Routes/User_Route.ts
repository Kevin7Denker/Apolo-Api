import express from "express";
import UserController from "../Controllers/User_Controllers";
import UserRepository from "../Repository/User_Repository";
const route = express.Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

route.get("/find-user=:id", (req, res) => userController.findUser(req, res));

export default route;
