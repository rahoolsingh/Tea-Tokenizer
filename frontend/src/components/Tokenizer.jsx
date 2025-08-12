import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Tokenizer() {
    const [mode, setMode] = useState("encode"); // "encode" | "decode"
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        setOutput("");

        try {
            if (mode === "encode") {
                const res = await axios.post(`${API_BASE_URL}/encode`, {
                    text: input,
                });
                setOutput(JSON.stringify(res.data.tokens, null, 2));
            } else {
                let parsedTokens;
                try {
                    parsedTokens = JSON.parse(input);
                } catch {
                    setError("Tokens must be a valid JSON array.");
                    setLoading(false);
                    return;
                }
                const res = await axios.post(`${API_BASE_URL}/decode`, {
                    tokens: parsedTokens,
                });
                setOutput(res.data.text || res.data.words?.join(" ") || "");
            }
        } catch (err) {
            setError(`${mode === "encode" ? "Encoding" : "Decoding"} failed.`);
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-orange-400">
                Tokenizer Utility
            </h1>

            {/* Mode Switch */}
            <div className="mb-4 flex items-center gap-3">
                <label className="font-semibold text-gray-300">Mode:</label>
                <select
                    className="border border-gray-700 bg-gray-800 text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={mode}
                    onChange={(e) => {
                        setMode(e.target.value);
                        setInput("");
                        setOutput("");
                    }}
                >
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>

            {/* Input */}
            <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-2">
                    {mode === "encode"
                        ? "Text to Encode"
                        : "Tokens to Decode (JSON array)"}
                </label>
                <textarea
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        mode === "encode"
                            ? "Enter text to encode..."
                            : 'Enter tokens, e.g. [44040,106894,38480,2103,"<BIN>","1000000000"]'
                    }
                />
            </div>

            {/* Submit Button */}
            <button
                className="mb-4 px-4 py-2 bg-orange-500 text-gray-900 font-semibold rounded hover:bg-orange-400 transition"
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
            >
                {loading
                    ? mode === "encode"
                        ? "Encoding..."
                        : "Decoding..."
                    : mode === "encode"
                    ? "Encode"
                    : "Decode"}
            </button>

            {/* Error */}
            {error && (
                <div className="mb-4 text-red-400 font-semibold">{error}</div>
            )}

            {/* Output */}
            {output && (
                <div>
                    <div className="font-semibold text-gray-300 mb-1">
                        {mode === "encode"
                            ? "Encoded Tokens:"
                            : "Decoded Text:"}
                    </div>
                    <pre className="bg-gray-800 border border-gray-700 p-3 rounded text-sm text-gray-100 whitespace-pre-wrap">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default Tokenizer;
