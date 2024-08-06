import express from "express";
import UserController from "../../Controllers/User_Controllers";
import UserRepository from "../../Repository/User_Repository";

const route = express.Router();

const userRepository = new UserRepository();

const userController = new UserController(userRepository);

route.post("/find-identity/:id", (req, res) =>
  userController.findIdentity(req, res)
);

route.post("/find-user-by-email/:email", (req, res) => {
  userController.findUserByEmail(req, res);
});

export default route;
