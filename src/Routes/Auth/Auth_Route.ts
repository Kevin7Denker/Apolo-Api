import express from "express";

import AuthRepository from "../../Repository/Auth_Repository";
import AuthController from "../../Controllers/Auth_Controllers";

const route = express.Router();

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

route.post("/signup", (req, res) => authController.signUp(req, res));
route.post("/signin", (req, res) => authController.signIn(req, res));

route.post("/complete-welcome", (req, res) => {
  authController.completeWelcome(req, res);
});

route.post("/verify-email/resend/:token", (req, res) =>
  authController.resendValEmail(req, res)
);

route.get("/verify-email/:token", (req, res) =>
  authController.valEmail(req, res)
);
route.get("/verify-email/error/:token", (req, res) =>
  authController.errorValEmail(req, res)
);

route.delete("/user/:userId", (req, res) =>
  authController.deleteUser(req, res)
);

route.post("/change-password", (req, res) =>
  authController.changePassword(req, res)
);

export default route;
