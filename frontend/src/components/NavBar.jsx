import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/teaTokenizer.png";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
    faCodeBranch,
    faBars,
    faTimes,
    faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 bg-[#ffeeda]">
            <nav className="flex justify-between items-center container mx-auto w-full">
                {/* Logo */}
                <Link to="/" className="flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-12" />
                    <p className="text-center text-xs font-bold text-amber-700">
                        A Toy Tool By Veer Rajpoot
                    </p>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-x-6">
                    <li>
                        <Link
                            to="https://github.com/rahoolsingh/Tea-Tokenizer"
                            target="_blank"
                            className="text-gray-800 hover:text-gray-600 flex items-center gap-2 group"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                            Source Code{" "}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/api-reference"
                            className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faCodeBranch} />
                            API Reference
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon
                        icon={isOpen ? faTimes : faBars}
                        size="lg"
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#ffeeda] shadow-md md:hidden">
                    <ul className="flex flex-col items-center py-4 gap-y-4">
                        <li>
                            <Link
                                to="https://github.com/rahoolsingh/Tea-Tokenizer"
                                className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                                GitHub
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/api-reference"
                                className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faCodeBranch} />
                                API Reference
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavBar;
