import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    NODE_ENV: process.env.NODE_ENV || "development",
}