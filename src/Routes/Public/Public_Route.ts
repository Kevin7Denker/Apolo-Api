import express from "express";
const route = express.Router();

import PublicController from "../../Controllers/Public_Controllers";

const publicController = new PublicController();

route.get("/", (_req, res) => {
  publicController.HelloApolo(_req, res);
});

export default route;
