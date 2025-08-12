import mongoose from "mongoose";

const rateLimiterSchema = new mongoose.Schema(
    {
        origin: { type: String, required: true },
        count: { type: Number, default: 0 },
        lastRequest: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const RateLimiter = mongoose.model("RateLimiter", rateLimiterSchema);

export default RateLimiter;
