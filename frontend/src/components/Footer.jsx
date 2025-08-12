import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin,
    faInstagram,
    faXTwitter,
    faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faCaretRight, faCoffee } from "@fortawesome/free-solid-svg-icons";
import chaiSamosa from "../assets/chaiSamosa.png";
import logo from "../assets/teaTokenizer.png";
import { Link } from "react-router";

function Footer() {
    return (
        <footer className="bg-[#ffeeda] py-10 mt-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start">
                {/* Left: Logo & Credits */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end md:items-center gap-4">
                    <img
                        src={chaiSamosa}
                        alt="Chai Samosa"
                        className="w-20 md:w-auto h-auto object-contain m-auto"
                    />
                </div>

                <div className="text-center md:text-left">
                    <h3 className="text-amber-700 font-bold mb-3 text-lg">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm mb-6">
                        <li>
                            <Link
                                to="https://github.com/rahoolsingh/tea-tokenizer"
                                target="_blank"
                                className="hover:text-gray-500 transition-colors"
                            >
                                GitHub Repo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/docs"
                                className="hover:text-gray-500 transition-colors"
                            >
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/api-reference"
                                className="hover:text-gray-500 transition-colors"
                            >
                                API Reference
                            </Link>
                        </li>
                    </ul>

                    <h3 className="text-amber-700 font-bold mb-3 text-lg">
                        Connect With Me
                    </h3>
                    <div className="flex justify-center md:justify-start space-x-4 text-gray-700 text-xl">
                        <Link
                            to="https://github.com/rahoolsingh"
                            target="_blank"
                            className="hover:text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </Link>
                        <Link
                            to="https://twitter.com/cosmonaut_dev"
                            target="_blank"
                            className="hover:text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                        </Link>
                        <Link
                            to="https://www.linkedin.com/in/rahoolsingh"
                            target="_blank"
                            className="hover:text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                        <Link
                            to="https://www.instagram.com/cosmonaut.dev"
                            target="_blank"
                            className="hover:text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link
                            to="https://medium.com/@rahoolsingh"
                            target="_blank"
                            className="hover:text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faMedium} />
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="Tea Tokenizer"
                            className="w-48 h-auto object-contain mx-auto"
                        />

                        <p className="text-gray-700 text-sm mt-2">
                            Built with ❤️ using React & Tailwind CSS.
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                            © {new Date().getFullYear()} Veer Rajpoot. All
                            rights reserved.
                        </p>
                        <a
                            href="https://payments.cashfree.com/forms/veer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-600 transition-colors text-orange-700 text-xs mt-4 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faCaretRight} /> Buy Me A{" "}
                            <FontAwesomeIcon icon={faCoffee} /> + Samosa
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
