import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
    {
        ad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ad",
            required: true,
        },
        lawyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Proposal", proposalSchema);

