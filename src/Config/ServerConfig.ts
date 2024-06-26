import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

export const env = process.env;

export default async function startServer() {
  try {
    const dbUser = env.DB_USER;
    const dbPass = env.DB_PASSWORD;
    const dbName = env.DB_NAME;

    await mongoose
      .connect(
        `mongodb+srv://${dbUser}:${dbPass}@cluster.irye11p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
        {
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 45000,
        }
      )
      .then(() => {
        console.log("\n Welcome to Apolo\n");
        console.log(" Connected to server\n");
      });
  } catch (error) {
    console.log("Erro: " + error);
  }
}
