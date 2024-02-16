import express from "express";
import cors from "cors";

import publicRoutes from "./Routes/Public_Route";
import authRoutes from "./Routes/Auth_Route";

import * as dotenv from "dotenv";
import connectDB from "./database";
dotenv.config();
connectDB();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(express.json());

app.options("*", cors());

app.use("/", publicRoutes);
app.use("/auth", authRoutes);

app.listen(port);
