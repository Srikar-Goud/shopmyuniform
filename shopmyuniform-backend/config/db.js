import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    dns.setServers(["1.1.1.1","8.8.8.8", ])
    if (!uri) {
      throw new Error("MONGO_URI is not set in the environment");
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
