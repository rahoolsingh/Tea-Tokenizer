import ApiReference from "./components/ApiReference";
import Documentation from "./components/Documentation";
import Layout from "./components/Layout";
import Tokenizer from "./components/Tokenizer";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Tokenizer />} />
                    <Route path="/api-reference" element={<ApiReference />} />
                    <Route path="/docs" element={<Documentation />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
