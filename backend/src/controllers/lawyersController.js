import User from "../models/User.js";

// @desc    Tüm avukatları getir
// @route   GET /api/Lawyers
// @access  Public
export const getLawyers = async (req, res, next) => {
    try {
        const { q, city, tag } = req.query;
        const query = { role: "lawyer", isVerified: true };

        // Arama sorgusu
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
            ];
        }

        // Şehir filtresi (eğer User modelinde city alanı varsa)
        // if (city) {
        //     query.city = city;
        // }

        const lawyers = await User.find(query).select("-password");

        // Tag filtresi (eğer User modelinde tags alanı varsa)
        // let filteredLawyers = lawyers;
        // if (tag) {
        //     filteredLawyers = lawyers.filter((lawyer) =>
        //         lawyer.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        //     );
        // }

        res.json({ data: lawyers });
    } catch (error) {
        next(error);
    }
};

// @desc    Tek avukat getir
// @route   GET /api/Lawyers/:id
// @access  Public
export const getLawyerById = async (req, res, next) => {
    try {
        const lawyer = await User.findOne({
            _id: req.params.id,
            role: "lawyer",
        }).select("-password");

        if (!lawyer) {
            return res.status(404).json({ message: "Avukat bulunamadı" });
        }

        res.json({ data: lawyer });
    } catch (error) {
        next(error);
    }
};

