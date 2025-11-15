export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Sunucu hatası";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyPattern)[0];
        message = `${field} zaten kullanılıyor`;
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 404;
        message = "Kayıt bulunamadı";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

