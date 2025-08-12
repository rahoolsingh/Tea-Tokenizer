import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faTerminal,
    faHeartbeat,
    faShieldAlt,
    faCopy,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "https://tea-tokenizer.onrender.com";

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded-t font-medium transition ${
            active
                ? "bg-gray-800 text-orange-400 border-t border-x border-gray-700"
                : "bg-gray-900 text-gray-400 hover:text-gray-200"
        }`}
    >
        {children}
    </button>
);

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative group">
            <pre className="bg-gray-800 border border-gray-700 p-4 rounded overflow-x-auto text-sm text-gray-100 font-mono">
                {code}
            </pre>
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
            >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            </button>
        </div>
    );
};

const EndpointSection = ({
    icon,
    method,
    path,
    description,
    requestJS,
    requestCurl,
    response,
}) => {
    const [tab, setTab] = useState("js");

    return (
        <section>
            <h2 className="text-2xl font-semibold flex items-center space-x-2 text-orange-300">
                <FontAwesomeIcon icon={icon} />{" "}
                <span>
                    {method}{" "}
                    {path && <code className="text-orange-400">{path}</code>}
                </span>
            </h2>
            <p className="mt-2 text-gray-300">{description}</p>

            {/* Tabs */}
            <div className="mt-4 flex space-x-1">
                <TabButton active={tab === "js"} onClick={() => setTab("js")}>
                    JavaScript (Axios)
                </TabButton>
                <TabButton
                    active={tab === "curl"}
                    onClick={() => setTab("curl")}
                >
                    cURL
                </TabButton>
            </div>

            {/* Code request */}
            <CodeBlock code={tab === "js" ? requestJS : requestCurl} />

            {/* Response */}
            <p className="mt-2 text-gray-300 font-semibold">Response:</p>
            <CodeBlock code={response} />
        </section>
    );
};

function ApiReference() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg mt-10">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-orange-400">
                    Tea Tokenizer API Reference
                </h1>
                <p className="mt-2 text-gray-400">
                    Base URL:{" "}
                    <a
                        href={BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:underline"
                    >
                        {BASE_URL}
                    </a>
                </p>
            </header>

            {/* Encode */}
            <EndpointSection
                icon={faCode}
                method="POST"
                path="/encode"
                description="Tokenizes input text into numeric tokens."
                requestJS={`import axios from 'axios';

axios.post("${BASE_URL}/encode", {
  text: "Grab your tea"
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
});`}
                requestCurl={`curl -X POST ${BASE_URL}/encode \\
  -H "Content-Type: application/json" \\
  -d '{ "text": "Grab your tea" }'`}
                response={`{
  "tokens": [41254, 4, 107447, 4, 95066],
  "stats": {
    "originalLength": 13,
    "tokenCount": 5,
    "unknownWordsCount": 2
  }
}`}
            />

            {/* Decode */}
            <EndpointSection
                icon={faTerminal}
                method="POST"
                path="/decode"
                description="Converts token IDs back into text."
                requestJS={`import axios from 'axios';

axios.post("${BASE_URL}/decode", {
  tokens: [41254, 4, 107447, 4, 95066]
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
});`}
                requestCurl={`curl -X POST ${BASE_URL}/decode \\
  -H "Content-Type: application/json" \\
  -d '{ "tokens": [41254, 4, 107447, 4, 95066] }'`}
                response={`{
  "text": "Grab your tea"
}`}
            />

            {/* Health */}
            <EndpointSection
                icon={faHeartbeat}
                method="GET"
                path="/health"
                description="Returns status of API, dictionary size, and unknown words count."
                requestJS={`import axios from 'axios';

axios.get("${BASE_URL}/health")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));`}
                requestCurl={`curl ${BASE_URL}/health`}
                response={`{
  "status": "healthy",
  "dictionarySize": 109582,
  "specialTokens": 6,
  "unknownWords": 27
}`}
            />

            {/* Rate Limiting */}
            <EndpointSection
                icon={faShieldAlt}
                method="Rate Limit"
                description="Limited to 10 requests per minute per origin. Applied to all endpoints."
                requestJS={`import axios from 'axios';

axios.post("${BASE_URL}/encode", { text: "test" })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));`}
                requestCurl={`curl -X POST ${BASE_URL}/encode \\
  -H "Content-Type: application/json" \\
  -d '{ "text": "test" }'`}
                response={`{
  "error": "Too many requests from this origin. Please try again later.",
  "maxLimit": 10,
  "nextReset": "2025-08-12T09:35:42.123Z"
}`}
            />
        </div>
    );
}

export default ApiReference;
