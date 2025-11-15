import express from "express";
import { ENV } from "./src/lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./src/lib/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import adsRoutes from "./src/routes/adsRoutes.js";
import lawyersRoutes from "./src/routes/lawyersRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = ENV.PORT || 3000;

// ----------------------- MIDDLEWARE -----------------------
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Uploads klasörü
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ----------------------- FRONTEND SERVE -----------------------
if (ENV.NODE_ENV === "production") {
    console.log("🔥 Production mode: Frontend serve ediliyor");

    const FRONTEND_DIST = path.join(__dirname, "../frontend/dist");
    console.log("📁 Frontend dist path:", FRONTEND_DIST);

    if (!fs.existsSync(FRONTEND_DIST)) {
        console.error("❌ Dist klasörü bulunamadı! Build edilmiş mi?");
    } else {
        // Assets ve diğer static dosyaları serve et
        app.use(express.static(FRONTEND_DIST, {
            maxAge: "1d",
            etag: true,
            lastModified: true,
            index: false,
        }));

        const assetsPath = path.join(FRONTEND_DIST, "assets");
        if (fs.existsSync(assetsPath)) {
            app.use("/assets", express.static(assetsPath, {
                maxAge: "1y",
                etag: true,
            }));
            console.log("✅ Assets klasörü serve ediliyor:", assetsPath);
        } else {
            console.error("❌ Assets klasörü bulunamadı:", assetsPath);
        }
    }
}

// ----------------------- API ROUTES -----------------------
app.use("/api/Auth", authRoutes);
app.use("/api/Ads", adsRoutes);
app.use("/api/Lawyers", lawyersRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// ----------------------- SPA FALLBACK -----------------------
if (ENV.NODE_ENV === "production") {
    app.use((req, res, next) => {
        // API route değilse frontend'e yönlendir
        const indexPath = path.join(__dirname, "../frontend/dist/index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath, (err) => {
                if (err) {
                    console.error("❌ Frontend index.html okunamadı:", err);
                    res.status(500).json({ message: "Frontend dosyası bulunamadı" });
                }
            });
        } else {
            console.error("❌ index.html yok:", indexPath);
            res.status(500).json({ message: "Frontend index.html bulunamadı" });
        }
    });
} else {
    // Development modunda 404
    app.use((req, res) => {
        res.status(404).json({ message: "Route bulunamadı" });
    });
}

// ----------------------- ERROR HANDLER -----------------------
app.use(errorHandler);

// ----------------------- SERVER START -----------------------
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
});
