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

// Production'da frontend static dosyalarını serve et (API route'larından ÖNCE)
if (ENV.NODE_ENV === "production") {
    console.log("🔥 Production mode: Frontend serve ediliyor");
    const frontendDistPath = path.join(__dirname, "../../frontend/dist");
    console.log("📁 Frontend dist path:", frontendDistPath);
    
    // Static dosyaları serve et
    app.use(express.static(frontendDistPath, {
        maxAge: "1d", // Cache için
        etag: true,
        lastModified: true,
    }));
}

// API Routes
app.use("/api/Auth", authRoutes);
app.use("/api/Ads", adsRoutes);
app.use("/api/Lawyers", lawyersRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// Production'da SPA fallback (API route'larından SONRA)
if (ENV.NODE_ENV === "production") {
    app.use((req, res, next) => {
        // API route'ları değilse frontend'e yönlendir
        const indexPath = path.join(__dirname, "../../frontend/dist/index.html");
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error("❌ Frontend index.html bulunamadı:", err);
                res.status(500).json({ message: "Frontend dosyası bulunamadı" });
            }
        });
    });
} else {
    // Development'ta 404 handler
    app.use((req, res) => {
        res.status(404).json({ message: "Route bulunamadı" });
    });
}

// Error handler (en sonda olmalı)
app.use(errorHandler);

// Server başlat
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
});