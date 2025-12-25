import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Header = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <header
            className={`
                w-full sticky top-0 z-50
                backdrop-blur-xl
                border-b
                ${theme === "dark"
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

                {/* Navigation */}
                <nav className="flex gap-2 text-sm font-medium">
                    {[
                        { name: "Dashboard", path: "/dashboard" },
                        { name: "Project", path: "/dashboard/project" },
                        { name: "Setting", path: "/dashboard/setting" },
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? theme === "dark"
                                        ? "px-4 py-1.5 rounded-lg bg-white/10 text-white"
                                        : "px-4 py-1.5 rounded-lg bg-gray-200 text-black"
                                    : theme === "dark"
                                        ? "px-4 py-1.5 text-gray-400 hover:text-white"
                                        : "px-4 py-1.5 text-gray-400 hover:text-black"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* User */}
                <div
                    className={`
                        flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm
                        border backdrop-blur
                        ${theme === "dark"
                            ? "bg-white/5 border-white/10 text-white"
                            : "bg-white border-gray-300 text-gray-700"
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
