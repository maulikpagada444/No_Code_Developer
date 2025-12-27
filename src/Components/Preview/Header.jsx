import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeProvider";
import { Paperclip, User } from "lucide-react";
import { FiGrid, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

const Header = ({ mode, onModeChange }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const username = Cookies.get("username") || "User";

    const [open, setOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;

            const accessToken = Cookies.get("access_token");
            const refreshToken = Cookies.get("refresh_token");

            await fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                    "X-Access-Token": accessToken,
                },
            });
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("username");
            Cookies.remove("email");
            Cookies.remove("user_id");
            Cookies.remove("project_id");

            navigate("/signin");
        }
    };

    return (
        <>
            <header
                className={`h-[60px] flex items-center justify-between px-6 shrink-0 z-50 border-b
                    ${isDark
                        ? "bg-[#0f0f0f] border-white/10 text-white"
                        : "bg-white border-gray-200 text-black"
                    }
                `}
            >
                {/* Left Logo */}
                <div className="flex items-center gap-2">
                    <Paperclip
                        className={`h-5 w-5 -rotate-45 ${isDark ? "text-white" : "text-black"}`}
                    />
                    <span className="font-bold text-lg tracking-tight">
                        Logo
                    </span>
                </div>

                {/* TOGGLE */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 flex p-1 rounded-full border
                ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}
            `}
                >
                    <button
                        onClick={() => onModeChange("edit")}
                        className={`px-4 py-1.5 rounded-full text-sm
                        ${mode === "edit"
                                ? "bg-white text-black font-semibold"
                                : isDark
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                    `}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onModeChange("preview")}
                        className={`px-4 py-1.5 rounded-full text-sm
                        ${mode === "preview"
                                ? "bg-white text-black font-semibold"
                                : isDark
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                    `}
                    >
                        Preview
                    </button>
                </div>

                {/* Right Username Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm
                            ${isDark
                                ? "bg-white/5 border-white/10"
                                : "bg-white border-gray-200"
                            }
                        `}
                    >
                        {username}
                        <User className="h-4 w-4 opacity-70" />
                    </button>

                    {open && (
                        <div
                            className={`absolute right-0 mt-2 w-44 rounded-xl shadow-lg border
                                ${isDark
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
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                <FiGrid />
                                Dashboard
                            </button>

                            <button
                                onClick={() => {
                                    setShowLogoutConfirm(true);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`w-[90%] max-w-sm rounded-2xl p-6 shadow-2xl
                            ${isDark
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
