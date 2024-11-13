import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || '');
        console.log("MongoDB connected: " + connect.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDb;

