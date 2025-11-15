import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // Varsayılan olarak şifreyi getirme
        },
        role: {
            type: String,
            enum: ["client", "lawyer"],
            default: "client",
        },
        // Avukat özel alanları
        tckn: {
            type: String,
            sparse: true, // Sadece avukatlar için
        },
        baroNo: {
            type: String,
            sparse: true,
        },
        idFront: {
            type: String, // Dosya path veya URL
        },
        idBack: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false, // Avukatlar için doğrulama durumu
        },
        // Müvekkil özel alanları
        sehir: {
            type: String,
            trim: true,
        },
        telefon: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Şifre hash'leme
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Şifre karşılaştırma
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// JSON'a dönüştürürken şifreyi çıkar
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("User", userSchema);

