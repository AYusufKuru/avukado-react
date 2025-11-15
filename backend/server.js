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
        // Production'da aynı domain'den geldiği için origin yoksa izin ver
        // (Same-origin requests don't have Origin header)
        if (!origin && ENV.NODE_ENV === "production") {
            return callback(null, true);
        }

        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:5176",
            "http://localhost:3000",
            // Sevalla domain'leri
            /^https?:\/\/.*\.sevalla\.app$/,
            /^https?:\/\/.*\.vercel\.app$/,
        ].filter(Boolean);

        // String origin kontrolü
        if (allowedOrigins.some(allowed => {
            if (typeof allowed === "string") {
                return allowed === origin;
            }
            if (allowed instanceof RegExp) {
                return allowed.test(origin);
            }
            return false;
        })) {
            return callback(null, true);
        }

        // Origin yoksa (same-origin) production'da izin ver
        if (!origin) {
            return callback(null, true);
        }

        callback(new Error("CORS policy tarafından engellendi"));
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
    // Static dosyaları serve et
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // SPA fallback - API route'ları olmayan ve static dosya bulunamayan istekler için
    app.get("*", (req, res, next) => {
        // API route ise next() ile devam et (404 dönecek)
        if (req.path.startsWith("/api")) {
            return next();
        }
        
        // Eğer static middleware response göndermişse (dosya bulundu), bir şey yapma
        // Aksi halde index.html döndür (SPA routing)
        if (!res.headersSent) {
            const indexPath = path.join(__dirname, "../frontend", "dist", "index.html");
            res.sendFile(indexPath, (err) => {
                if (err) {
                    console.error("❌ index.html gönderilemedi:", err);
                    next(err);
                }
            });
        }
    });
}

// Server Start
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
});
