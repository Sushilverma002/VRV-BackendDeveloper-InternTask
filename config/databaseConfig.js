import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URL = process.env.DB_URL;

const ConnectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Db is connected.");
  } catch (error) {
    console.log(error);
    console.log("DB is not connected.");
  }
};

export default ConnectDb;
