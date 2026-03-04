import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log("Connect to database successfully!");
  } catch (err) {
    console.log("Failed to connect to database: ", err);
    process.exit(1);
  }
};
