import express from "express";
import bodyParser from "body-parser";
import wordlist from "wordlist-english";
import cors from "cors";
import dotenv from "dotenv";
import UnknownWord from "./src/models/unknownWord.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const englishWords = wordlist["english"];

const SPECIAL_TOKENS = {
    "<UNK>": 0,
    "<BIN>": 1,
    "<NUM>": 2,
    "<PUNCT>": 3,
    "<SPACE>": 4,
    "<NEWLINE>": 5,
};

const SPECIAL_TOKEN_COUNT = Object.keys(SPECIAL_TOKENS).length;
const wordIndex = {};

englishWords.forEach((word, idx) => {
    wordIndex[word] = idx + SPECIAL_TOKEN_COUNT;
});

// This will be set dynamically after DB connection
let nextUnknownId = englishWords.length + SPECIAL_TOKEN_COUNT;

// Assign numeric ID to unknown words
async function trackUnknownWord(word) {
    let unknownWord = await UnknownWord.findOne({ word });
    if (!unknownWord) {
        unknownWord = new UnknownWord({ word, tokenId: nextUnknownId++ });
        await unknownWord.save();
    }
    return unknownWord.tokenId;
}

async function getUnknownWordId(word) {
    return await trackUnknownWord(word);
}

// Tokenization is now async
async function tokenizeText(text) {
    if (!text) return [];

    const tokens = [];
    const segments = text.split(/(\s+)/);

    for (const segment of segments) {
        if (!segment) continue;

        if (/^\s+$/.test(segment)) {
            tokens.push(
                segment.includes("\n")
                    ? SPECIAL_TOKENS["<NEWLINE>"]
                    : SPECIAL_TOKENS["<SPACE>"]
            );
            continue;
        }

        const parts = segment.split(/([^\w\s])/);
        for (const part of parts) {
            if (!part) continue;

            const cleanPart = part.toLowerCase();

            if (/^\d+$/.test(part)) {
                const num = parseInt(part, 10);
                if (num > 1000) {
                    tokens.push(SPECIAL_TOKENS["<BIN>"], num.toString(2));
                } else {
                    tokens.push(SPECIAL_TOKENS["<NUM>"], num);
                }
            } else if (/^[^\w\s]$/.test(part)) {
                tokens.push(SPECIAL_TOKENS["<PUNCT>"], part);
            } else if (/^\w+$/.test(part)) {
                if (wordIndex[cleanPart] !== undefined) {
                    tokens.push(wordIndex[cleanPart]);
                } else {
                    const unknownId = await getUnknownWordId(cleanPart);
                    tokens.push(SPECIAL_TOKENS["<UNK>"], unknownId);
                }
            } else {
                const unknownId = await getUnknownWordId(cleanPart);
                tokens.push(SPECIAL_TOKENS["<UNK>"], unknownId);
            }
        }
    }
    return tokens;
}

// Decode using mongodb
async function detokenizeTokens(tokenIds) {
    const words = [];

    // Get reverse mapping for unknown words from DB
    const unknownWords = await UnknownWord.find();
    const reverseUnknownWords = new Map();
    for (const word of unknownWords) {
        reverseUnknownWords.set(word.tokenId, word.word);
    }

    for (let i = 0; i < tokenIds.length; i++) {
        const tokenId = tokenIds[i];

        if (tokenId === SPECIAL_TOKENS["<BIN>"]) {
            const binaryStr = tokenIds[++i];
            if (typeof binaryStr === "string") {
                words.push(parseInt(binaryStr, 2).toString());
            } else {
                words.push("<INVALID_BIN>");
            }
        } else if (tokenId === SPECIAL_TOKENS["<NUM>"]) {
            const num = tokenIds[++i];
            if (typeof num === "number") {
                words.push(num.toString());
            } else {
                words.push("<INVALID_NUM>");
            }
        } else if (tokenId === SPECIAL_TOKENS["<PUNCT>"]) {
            const punct = tokenIds[++i];
            if (typeof punct === "string") {
                words.push(punct);
            } else {
                words.push("<INVALID_PUNCT>");
            }
        } else if (tokenId === SPECIAL_TOKENS["<UNK>"]) {
            const unknownId = tokenIds[++i];
            if (reverseUnknownWords.has(unknownId)) {
                words.push(reverseUnknownWords.get(unknownId));
            } else {
                words.push(`[UNKNOWN:${unknownId}]`);
            }
        } else if (tokenId === SPECIAL_TOKENS["<SPACE>"]) {
            words.push(" ");
        } else if (tokenId === SPECIAL_TOKENS["<NEWLINE>"]) {
            words.push("\n");
        } else if (
            typeof tokenId === "number" &&
            tokenId >= SPECIAL_TOKEN_COUNT
        ) {
            const wordIdx = tokenId - SPECIAL_TOKEN_COUNT;
            if (wordIdx >= 0 && wordIdx < englishWords.length) {
                words.push(englishWords[wordIdx]);
            } else {
                words.push("<INVALID_WORD>");
            }
        } else {
            words.push("<INVALID_TOKEN>");
        }
    }

    return words.join("");
}

// API
app.post("/encode", async (req, res) => {
    try {
        const text = req.body.text || "";
        const tokens = await tokenizeText(text);
        const unknownCount = await UnknownWord.countDocuments();

        res.json({
            tokens,
            stats: {
                originalLength: text.length,
                tokenCount: tokens.length,
                unknownWordsCount: unknownCount,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Encoding failed",
            message: error.message,
        });
    }
});

app.post("/decode", async (req, res) => {
    try {
        const tokenIds = req.body.tokens || [];
        const text = await detokenizeTokens(tokenIds);

        res.json({
            text,
            stats: {
                tokenCount: tokenIds.length,
                decodedLength: text.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Decoding failed",
            message: error.message,
        });
    }
});

app.get("/health", async (req, res) => {
    const unknownCount = await UnknownWord.countDocuments();
    res.json({
        status: "healthy",
        dictionarySize: englishWords.length,
        specialTokens: Object.keys(SPECIAL_TOKENS).length,
        unknownWords: unknownCount,
    });
});

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://localhost:27017/tokenizer"
        );
        console.log("MongoDB Connected");

        // Set nextUnknownId based on highest tokenId in DB
        const last = await UnknownWord.findOne().sort({ tokenId: -1 });
        if (last) {
            nextUnknownId = last.tokenId + 1;
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Enhanced Tokenizer API running on http://localhost:${PORT}`);
});
