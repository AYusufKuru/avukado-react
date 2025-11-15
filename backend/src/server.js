import express from "express";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adsRoutes from "./routes/adsRoutes.js";
import lawyersRoutes from "./routes/lawyersRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = ENV.PORT || 3000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Development için localhost portlarına izin ver
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:5176",
            "http://localhost:3000",
        ].filter(Boolean);
        
        // Origin yoksa (Postman, mobile app vb.) veya izin verilen listede ise
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Uploads klasörünü static olarak serve et
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API Routes
app.use("/api/Auth", authRoutes);
app.use("/api/Ads", adsRoutes);
app.use("/api/Lawyers", lawyersRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// make ready for deployment
if (process.env.NODE_ENV === "production") {

    console.log("🔥 Production mode: Frontend serve ediliyor");

    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    // SPA fallback (Express 5 alpha)
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route bulunamadı" });
});

// Error handler (en sonda olmalı)
app.use(errorHandler);

// Server başlat
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
});