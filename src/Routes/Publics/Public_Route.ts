import express from "express";
const route = express.Router();

route.get("/", (_req, res) => {
  res.status(200).json({ msg: "Welcome to Apolo " });
});

export default route;
