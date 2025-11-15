import Ad from "../models/Ad.js";

// @desc    Tüm ilanları getir
// @route   GET /api/Ads
// @access  Public
export const getAds = async (req, res, next) => {
    try {
        const { category, city, status, client } = req.query;
        const query = {};

        if (category) query.category = category;
        if (city) query.city = city;
        if (status) query.status = status;
        if (client) query.client = client;

        const ads = await Ad.find(query)
            .populate("client", "name email")
            .sort({ createdAt: -1 });

        res.json({ data: ads });
    } catch (error) {
        next(error);
    }
};

// @desc    Tek ilan getir
// @route   GET /api/Ads/:id
// @access  Public
export const getAdById = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id)
            .populate("client", "name email")
            .populate({
                path: "proposals",
                populate: {
                    path: "lawyer",
                    select: "name email baroNo",
                },
            });

        if (!ad) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }

        res.json({ data: ad });
    } catch (error) {
        next(error);
    }
};

// @desc    İlan oluştur
// @route   POST /api/Ads
// @access  Private (Client)
export const createAd = async (req, res, next) => {
    try {
        const adData = {
            ...req.body,
            client: req.user._id,
        };

        const ad = await Ad.create(adData);
        await ad.populate("client", "name email");

        res.status(201).json({ data: ad });
    } catch (error) {
        next(error);
    }
};

// @desc    İlan güncelle
// @route   PUT /api/Ads/:id
// @access  Private (Client - sadece kendi ilanı)
export const updateAd = async (req, res, next) => {
    try {
        let ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }

        // Sadece ilan sahibi güncelleyebilir
        if (ad.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Bu ilanı güncelleme yetkiniz yok" });
        }

        ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate("client", "name email");

        res.json({ data: ad });
    } catch (error) {
        next(error);
    }
};

// @desc    İlan sil
// @route   DELETE /api/Ads/:id
// @access  Private (Client - sadece kendi ilanı)
export const deleteAd = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }

        // Sadece ilan sahibi silebilir
        if (ad.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Bu ilanı silme yetkiniz yok" });
        }

        await ad.deleteOne();

        res.json({ message: "İlan silindi", id: req.params.id });
    } catch (error) {
        next(error);
    }
};

// @desc    İlan tekliflerini getir
// @route   GET /api/Ads/:id/proposals
// @access  Private
export const getAdProposals = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }

        // Sadece ilan sahibi veya avukatlar teklifleri görebilir
        const isOwner = ad.client.toString() === req.user._id.toString();
        const isLawyer = req.user.role === "lawyer";

        if (!isOwner && !isLawyer) {
            return res.status(403).json({ message: "Bu teklifleri görme yetkiniz yok" });
        }

        const Proposal = (await import("../models/Proposal.js")).default;
        const proposals = await Proposal.find({ ad: req.params.id })
            .populate("lawyer", "name email baroNo")
            .sort({ createdAt: -1 });

        res.json({ data: proposals });
    } catch (error) {
        next(error);
    }
};

