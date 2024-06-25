import express from "express";
import path from "path";

const route = express.Router();

route.get("/logo", (_req, res) => {
  const imagePath = path.join(__dirname, "../Assets/Images/Logos/Logo.png");
  res.type("image/jpeg");
  res.sendFile(imagePath);
});

export default route;
