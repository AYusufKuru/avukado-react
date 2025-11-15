import express from "express";
import {
    getAds,
    getAdById,
    createAd,
    updateAd,
    deleteAd,
    getAdProposals,
} from "../controllers/adsController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAds);
router.get("/:id", getAdById);
router.post("/", protect, authorize("client"), createAd);
router.put("/:id", protect, authorize("client"), updateAd);
router.delete("/:id", protect, authorize("client"), deleteAd);
router.get("/:id/proposals", protect, getAdProposals);

export default router;

