import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import publicRoutes from "./Routes/Public_Route";
import authRoutes from "./Routes/Auth_Route";
import userRoutes from "./Routes/User_Route";
import postRoute from "./Routes/Post_Route";

import * as dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const port = process.env.PORT || 10000;

const app = express();
app.use(cors());

app.use(express.json());

app.options("*", cors());

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoute);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster.irye11p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  )
  .then(() => {
    app.listen(port);
    console.log("\n Connected to server");
  })
  .catch((error) => console.log("Erro: " + error));
