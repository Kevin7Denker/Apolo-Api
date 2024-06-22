import express from "express";
import cors from "cors";

import startServer, { env } from "./Config/ServerConfig";

import publicRoutes from "./Routes/Publics/Public_Route";
import authRoutes from "./Routes/Auth/Auth_Route";
import userRoutes from "./Routes/Main/User_Route";
import postRoutes from "./Routes/Main/Post_Route";
import assetsRoutes from "./Routes/Assets/Images_Route";

const app = express();
const port = env.PORT || 2612;

app.use(cors());
app.use(express.json());

app.options("*", cors());

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/assets", assetsRoutes);

startServer()
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log("Erro: " + error);
  });
