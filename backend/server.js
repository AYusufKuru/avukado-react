import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/lib/db.js";
import { ENV } from "./src/lib/env.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import adsRoutes from "./src/routes/adsRoutes.js";
import lawyersRoutes from "./src/routes/lawyersRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:5176",
            "http://localhost:3000",
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy tarafından engellendi"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));
app.use(express.json()); // req body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Uploads klasörü
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/Auth", authRoutes);
app.use("/api/Ads", adsRoutes);
app.use("/api/Lawyers", lawyersRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// Make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Server Start
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
});
