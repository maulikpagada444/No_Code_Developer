import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Header = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <header
            className={`
                            sticky top-0 z-50
                            backdrop-blur-xl border-b
                            ${theme === "dark"
                    ? "bg-black/40 border-white/10"
                    : "bg-white/80 border-gray-200"
                }
                        `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                    ✏️ Logo
                </div>

                {/* User */}
                <div
                    className={`
                                    flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm border
                                    ${theme === "dark"
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-gray-300"
                        }
                                `}
                >
                    Demo User
                    <FiUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
