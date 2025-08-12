import React from "react";

const Documentation = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-gray-100 min-h-screen font-sans">
            <h1 className="text-4xl font-bold text-orange-400 mb-6">
                Tea Tokenizer
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b border-orange-400 pb-1">
                    Live Demo
                </h2>
                <a
                    href="https://tea-tokenizer.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline break-all"
                >
                    https://tea-tokenizer.vercel.app/
                </a>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b border-orange-400 pb-1">
                    GitHub Repository
                </h2>
                <a
                    href="https://github.com/rahoolsingh/Tea-Tokenizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline break-all"
                >
                    https://github.com/rahoolsingh/Tea-Tokenizer
                </a>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b border-orange-400 pb-1">
                    API Reference
                </h2>
                <a
                    href="https://tea-tokenizer.vercel.app/api-reference"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline break-all"
                >
                    https://tea-tokenizer.vercel.app/api-reference
                </a>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b border-orange-400 pb-1">
                    Project Structure
                </h2>
                <p className="mb-2">This repo contains two main folders:</p>
                <ul className="list-disc list-inside mb-2">
                    <li>
                        <code className="bg-gray-800 px-1 rounded">
                            backend/
                        </code>{" "}
                        - Express API server for tokenization.
                    </li>
                    <li>
                        <code className="bg-gray-800 px-1 rounded">
                            frontend/
                        </code>{" "}
                        - React app with UI & API reference.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3 border-b border-orange-400 pb-1">
                    Getting Started
                </h2>
                <p className="mb-2">
                    Follow these steps to run the project locally:
                </p>

                <h3 className="text-xl font-semibold mb-1 mt-4">
                    1. Clone the repository
                </h3>
                <pre className="bg-gray-800 p-3 rounded mb-3 text-sm overflow-x-auto">
                    <code>
                        git clone
                        https://github.com/rahoolsingh/Tea-Tokenizer.git
                    </code>
                </pre>

                <h3 className="text-xl font-semibold mb-1">2. Setup Backend</h3>
                <pre className="bg-gray-800 p-3 rounded mb-3 text-sm overflow-x-auto">
                    <code>{`cd Tea-Tokenizer/backend
npm install
npm run dev`}</code>
                </pre>
                <p className="mb-2 text-gray-400">
                    Create a{" "}
                    <code className="bg-gray-700 px-1 rounded">.env</code> file
                    inside the <code>backend</code> folder with the following:
                </p>
                <pre className="bg-gray-800 p-3 rounded mb-4 text-sm overflow-x-auto">
                    <code>{`CORS_ORIGIN="http://localhost:5173, http://localhost:5174"
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000`}</code>
                </pre>

                <h3 className="text-xl font-semibold mb-1">
                    3. Setup Frontend
                </h3>
                <pre className="bg-gray-800 p-3 rounded mb-3 text-sm overflow-x-auto">
                    <code>{`cd ../frontend
npm install
npm run dev`}</code>
                </pre>
                <p className="mb-2 text-gray-400">
                    Create a{" "}
                    <code className="bg-gray-700 px-1 rounded">.env</code> file
                    inside the <code>frontend</code> folder with:
                </p>
                <pre className="bg-gray-800 p-3 rounded mb-4 text-sm overflow-x-auto">
                    <code>{`VITE_API_BASE_URL=http://localhost:3000`}</code>
                </pre>
                <p className="mb-4 text-gray-400">
                    Frontend runs on{" "}
                    <code className="bg-gray-700 px-1 rounded">
                        localhost:5173
                    </code>{" "}
                    by default and proxies API requests to the backend server.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3 border-b border-orange-400 pb-1">
                    Configuration
                </h2>
                <p>
                    Use environment variables in the{" "}
                    <code className="bg-gray-700 px-1 rounded">.env</code> files
                    as shown above to customize:
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>
                        <code>MONGODB_URI</code>: MongoDB connection string for
                        backend.
                    </li>
                    <li>
                        <code>CORS_ORIGIN</code>: Allowed origins for API
                        requests (comma separated).
                    </li>
                    <li>
                        <code>PORT</code>: Backend server port (default 3000).
                    </li>
                    <li>
                        <code>VITE_API_BASE_URL</code>: Frontend base URL for
                        API requests (usually backend server URL).
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Documentation;
