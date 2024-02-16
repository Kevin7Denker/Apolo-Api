import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://denker:EKKY1WPlmchFL5pb@cluster.irye11p.mongodb.net/Apolo?directConnection=true"
    );
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect failed " + error);
  }
};

export default connectDB;
