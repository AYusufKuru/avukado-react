import mongoose from "mongoose"
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
       const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("mongodb connected:", conn.connection.host);
        
    } catch (error) {
        console.error("error connection to MONGODP", error)
        process.exit(1)
    }
}