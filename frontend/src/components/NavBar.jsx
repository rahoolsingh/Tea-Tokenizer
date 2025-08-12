import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/teaTokenizer.png";
import { faGithub, faReadme } from "@fortawesome/free-brands-svg-icons";
import {
    faCodeBranch,
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 bg-[#ffeeda]">
            <nav className="flex justify-between items-center container mx-auto w-full">
                {/* Logo */}
                <div className="flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-12" />
                    <p className="text-center text-xs font-bold text-amber-700">
                        A Toy Tool By Veer Rajpoot
                    </p>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-x-4">
                    <li>
                        <a
                            href="#"
                            className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faReadme} />
                            Documentation
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faCodeBranch} />
                            API Reference
                        </a>
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
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faReadme} />
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faCodeBranch} />
                                API Reference
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavBar;
