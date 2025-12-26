import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Header = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <header
            className={`
                sticky top-0 z-50
                backdrop-blur-xl border-b
                transition-colors duration-300
                ${isDark
                    ? "bg-black/40 border-white/10 text-white"
                    : "bg-white/80 border-gray-200 text-black"
                }
            `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                    ✏️ Logo
                </div>

                {/* User Badge */}
                <div
                    className={`
                        flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm
                        border backdrop-blur
                        cursor-pointer transition
                        ${isDark
                            ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
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
