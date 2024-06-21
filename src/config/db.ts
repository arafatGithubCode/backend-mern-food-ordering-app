import mongoose from "mongoose";
import dev from "./config";

const dbUrl = dev.db.url;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB is connected!");
  } catch (error: any) {
    console.log("MongoDB in Not connected!");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
