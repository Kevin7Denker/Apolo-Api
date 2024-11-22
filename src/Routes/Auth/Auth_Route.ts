import express from "express";
import { Request, Response } from "express";

import AuthRepository from "../../Repository/Auth_Repository";
import AuthController from "../../Controllers/Auth_Controllers";

const route = express.Router();

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

route.post("/signup", (req: Request, res: Response) =>
  authController.signUp(req, res)
);
route.post("/signin", (req: Request, res: Response) =>
  authController.signIn(req, res)
);

route.post("/complete-welcome", (req: Request, res: Response) => {
  authController.completeWelcome(req, res);
});

route.post("/update-image", (req: Request, res: Response) => {
  authController.updateImage(req, res);
});

route.get("/verify-email/:token", (req: Request, res: Response) =>
  authController.valEmail(req, res)
);
route.get("/verify-email/error/:token", (req: Request, res: Response) =>
  authController.errorValEmail(req, res)
);
route.get("/verify-email/resend/:token", (req: Request, res: Response) =>
  authController.resendValEmail(req, res)
);

route.delete("/user/:userId", (req: Request, res: Response) =>
  authController.deleteUser(req, res)
);

export default route;
