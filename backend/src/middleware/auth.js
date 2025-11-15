import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        // Authorization header'dan token al
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Yetkilendirme hatası: Token bulunamadı" });
        }

        try {
            // Token'ı doğrula
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
            
            // Kullanıcıyı bul
            req.user = await User.findById(decoded.id).select("-password");
            
            if (!req.user) {
                return res.status(401).json({ message: "Kullanıcı bulunamadı" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Geçersiz token" });
        }
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
};

// Rol kontrolü
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
        }
        next();
    };
};

