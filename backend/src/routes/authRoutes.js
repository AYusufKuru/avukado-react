import express from "express";
import { login, register, updateProfile, getProfile } from "../controllers/authController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

// Register - FormData (avukat) veya JSON (müvekkil) destekler
router.post("/register", (req, res, next) => {
    // Content-Type kontrolü
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
        // FormData ise multer kullan
        upload.fields([
            { name: "idFront", maxCount: 1 },
            { name: "idBack", maxCount: 1 },
        ])(req, res, next);
    } else {
        // JSON ise direkt devam et
        next();
    }
}, register);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;

