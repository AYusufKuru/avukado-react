import jwt from "jsonwebtoken";
import User from "../models/User.js";

// JWT token oluştur
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "your-secret-key", {
        expiresIn: "30d",
    });
};

// @desc    Kullanıcı girişi
// @route   POST /api/Auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-posta ve şifre gereklidir" });
        }

        // Kullanıcıyı bul (şifre dahil)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
        }

        // Şifreyi kontrol et
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
        }

        // Token oluştur
        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                sehir: user.sehir,
                telefon: user.telefon,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Kullanıcı kaydı
// @route   POST /api/Auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        // FormData veya JSON'dan veri al
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role || "client";
        const tckn = req.body.tckn;
        const baroNo = req.body.baroNo;
        
        // Dosya bilgileri (multer ile yüklenmişse)
        const idFront = req.files?.idFront?.[0]?.path || req.body.idFront;
        const idBack = req.files?.idBack?.[0]?.path || req.body.idBack;

        // Validasyon
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Ad, e-posta ve şifre gereklidir" });
        }

        // E-posta kontrolü
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Bu e-posta adresi zaten kullanılıyor" });
        }

        // Avukat kaydı için ek kontroller
        if (role === "lawyer") {
            if (!tckn || !baroNo) {
                return res.status(400).json({ message: "Avukat kaydı için TCKN ve Baro No gereklidir" });
            }

            // TCKN kontrolü
            if (!/^\d{11}$/.test(tckn)) {
                return res.status(400).json({ message: "TCKN 11 haneli olmalıdır" });
            }

            // Baro No kontrolü
            if (!/^\d{4,8}$/.test(baroNo)) {
                return res.status(400).json({ message: "Baro numarası hatalı" });
            }
        }

        // Kullanıcı oluştur
        const userData = {
            name,
            email,
            password,
            role: role || "client",
        };

        if (role === "lawyer") {
            userData.tckn = tckn;
            userData.baroNo = baroNo;
            if (idFront) userData.idFront = idFront;
            if (idBack) userData.idBack = idBack;
        }

        const user = await User.create(userData);

        // Token oluştur
        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Kullanıcı profilini güncelle
// @route   PUT /api/Auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
    try {
        const { name, sehir, telefon } = req.body;
        const userId = req.user._id;

        const updateData = {};
        if (name) updateData.name = name;
        if (sehir !== undefined) updateData.sehir = sehir;
        if (telefon !== undefined) updateData.telefon = telefon;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                sehir: user.sehir,
                telefon: user.telefon,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Kullanıcı profilini getir
// @route   GET /api/Auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                sehir: user.sehir,
                telefon: user.telefon,
            },
        });
    } catch (error) {
        next(error);
    }
};

