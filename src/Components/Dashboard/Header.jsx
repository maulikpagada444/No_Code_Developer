import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import Cookies from "js-cookie";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Header = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const username = Cookies.get("username") || "User";
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // ✅ Close popup on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Logout handler
    const handleLogout = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;

            const accessToken = Cookies.get("access_token");
            const refreshToken = Cookies.get("refresh_token");

            await fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`, // 🔑 Refresh token
                    "X-Access-Token": accessToken,            // 🔑 Access token
                },
            });

        } catch (error) {
            console.error("Logout API error:", error);
            // even if API fails, we still logout locally
        } finally {
            // ✅ Clear cookies
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("username");
            Cookies.remove("email");
            Cookies.remove("user_id");
            Cookies.remove("project_id");

            // ✅ Redirect
            navigate("/signin");
        }
    };


    return (
        <>
            <header
                className={`
                w-full sticky top-0 z-50 backdrop-blur-xl border-b
                ${theme === "dark"
                        ? "bg-black/40 border-white/10 text-white"
                        : "bg-white/80 border-gray-200 text-black"
                    }
            `}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div className="text-lg font-semibold">
                        ✏️ Logo
                    </div>

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
                                            ? "px-4 py-1.5 rounded-lg bg-white/10"
                                            : "px-4 py-1.5 rounded-lg bg-gray-200"
                                        : "px-4 py-1.5 text-gray-400 hover:text-black"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className={`
                            flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm
                            border backdrop-blur
                            ${theme === "dark"
                                    ? "bg-white/5 border-white/10 text-white"
                                    : "bg-white border-gray-300 text-gray-700"
                                }
                        `}
                        >
                            {username}
                            <FiUser />
                        </button>

                        {open && (
                            <div
                                className={`
                                absolute right-0 mt-2 w-44 rounded-xl shadow-lg border
                                ${theme === "dark"
                                        ? "bg-[#111] border-white/10"
                                        : "bg-white border-gray-200"
                                    }
                            `}
                            >
                                <button
                                    onClick={() => {
                                        navigate("/dashboard");
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                                >
                                    <FiGrid />
                                    Dashboard
                                </button>

                                <button
                                    onClick={() => {
                                        setShowLogoutConfirm(true);
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-100"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </header>

            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`
                        w-[90%] max-w-sm rounded-2xl p-6 shadow-2xl
                        ${theme === "dark"
                                ? "bg-[#111] text-white border border-white/10"
                                : "bg-white text-black border border-gray-200"
                            }
                    `}
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            Confirm Logout
                        </h3>

                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700"
                            >
                                Yes, Logout
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default Header;