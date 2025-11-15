import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "ceza",
                "ticaret",
                "miras",
                "is-hukuku",
                "icra-iflas",
                "gayrimenkul",
                "bilisim",
                "tuketici",
                "vergi",
                "aile",
            ],
        },
        city: {
            type: String,
            required: true,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "closed", "in-progress"],
            default: "open",
        },
        documents: [
            {
                name: String,
                url: String,
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        budget: {
            type: Number,
        },
        proposals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Proposal",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Ad", adSchema);

