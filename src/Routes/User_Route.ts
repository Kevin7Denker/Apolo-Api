import express from "express";
import UserController from "../Controllers/User_Controllers";
import UserRepository from "../Repository/User_Repository";
import UserValidation from "../Utils/Validation/User_Validation";
const route = express.Router();

const userRepository = new UserRepository();
const userValidation = new UserValidation();

const userController = new UserController(userRepository, userValidation);

route.get("/find-user=:id", (req, res) => userController.findUser(req, res));

export default route;
