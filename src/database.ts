import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECT_URI}`);
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect failed " + error);
  }
};

export default connectDB;
