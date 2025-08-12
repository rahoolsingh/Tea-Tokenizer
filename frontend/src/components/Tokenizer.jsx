import { useState } from "react";
import axios from "axios";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Tokenizer() {
    const [mode, setMode] = useState("encode"); // "encode" | "decode"
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [encodeStats, setEncodeStats] = useState({});
    const [decodeStats, setDecodeStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState("");

    const handleCopy = () => {
        navigator.clipboard
            .writeText(output)
            .then(() => setCopySuccess("Copied!"))
            .catch(() => setCopySuccess("Failed to copy."));
        // Clear success message after 2 seconds
        setTimeout(() => setCopySuccess(""), 2000);
    };

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
                setEncodeStats(res.data.stats);
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
                setDecodeStats(res.data.stats);
            }
        } catch (err) {
            setError(`${mode === "encode" ? "Encoding" : "Decoding"} failed.`);
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
            <div className="md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-6 text-orange-400">
                    {mode === "encode" ? "Text Encoder" : "Token Decoder"}
                </h1>

                <div className="mb-4 flex items-center gap-3">
                    {/* Mode Switch */}
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
                            : "Enter tokens, e.g. [44040,106894,38480,2103]"
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
                <div className="">
                    <div className="font-semibold text-gray-300 mb-1">
                        {mode === "encode"
                            ? "Encoded Tokens:"
                            : "Decoded Text:"}
                    </div>
                    <div className="relative ">
                        {/* copy button */}
                        <div className="absolute right-3 top-2">
                            <button
                                className="text-gray-400 hover:text-gray-300 transition"
                                onClick={handleCopy}
                            >
                                {copySuccess}
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <textarea className="bg-gray-800 border border-gray-700 p-3 rounded text-sm text-gray-100 whitespace-pre-wrap w-full h-32 ">
                            {output}
                        </textarea>
                    </div>
                </div>
            )}
            {/* Stats */}
            <div className="mt-4">
                <div className="text-gray-400">
                    {mode === "encode" && output && (
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <p>Words: {input.split(" ").length}</p>
                            <p>Input Length: {encodeStats?.originalLength}</p>
                            <p>Tokens: {encodeStats?.tokenCount}</p>
                        </div>
                    )}

                    {mode === "decode" && output && (
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <p>Token Count: {decodeStats?.tokenCount}</p>
                            <p>Output Words: {output.split(" ").length}</p>
                            <p>Output Length: {decodeStats?.decodedLength}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tokenizer;
