import mongoose from "mongoose";

const unknownWordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        tokenId: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const UnknownWord = mongoose.model("UnknownWord", unknownWordSchema);

export default UnknownWord;
