import express from "express";
import bodyParser from "body-parser";
import wordlist from "wordlist-english";

const app = express();
app.use(bodyParser.json());

const englishWords = wordlist["english"];

// gicving id to each word from dictionary
const wordIndex = {};
englishWords.map((word, idx) => {
    wordIndex[word] = idx + 1;
});

// Encoding API
app.post("/encode", (req, res) => {
    const text = req.body.text || "";
    const tokens = text
        .toLowerCase()
        .split(/\s+/)
        .map((word) => {
            if (/^\d+$/.test(word)) {
                // check for number
                const binary = parseInt(word, 10).toString(2);
                return [`<BIN>`, binary];
            }
            return [wordIndex[word] || 0];
        })
        .flat();

    res.json({ tokens });
});

// Decode API
app.post("/decode", (req, res) => {
    const tokenIds = req.body.tokens || [];
    const words = [];
    for (let i = 0; i < tokenIds.length; i++) {
        if (tokenIds[i] === "<BIN>") {
            const binaryStr = tokenIds[i + 1];
            const num = parseInt(binaryStr, 2);
            words.push(num.toString());
            i++; // skip binary
        } else if (typeof tokenIds[i] === "number") {
            words.push(englishWords[tokenIds[i] - 1] || "<UNK>");
        } else {
            words.push("<UNK>");
        }
    }
    res.json({ text: words.join(" ") });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Tokenizer API running on http://localhost:${PORT}`);
});
