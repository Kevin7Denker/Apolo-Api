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
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        }
      )
      .then(() => {
        console.log("\n Welcome to Apolo\n");
        console.log("\n Connected to server\n");
        console.log("\n Server Status: 200");
      });
  } catch (error) {
    console.log("Erro: " + error);
  }
}
