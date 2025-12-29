import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiGrid, FiSun, FiMoon } from "react-icons/fi";
import Cookies from "js-cookie";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

const Header = () => {
    const navigate = useNavigate();
    const { theme, setThemeMode } = useContext(ThemeContext);

    const username = Cookies.get("username") || "User";
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    const showAlert = (message, severity = "success", title = "") => {
        setAlert({ open: true, message, severity, title });
    };

    /* Close dropdown on outside click */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* 🔴 LOGOUT HANDLER WITH LOADER */
    const handleLogout = async () => {
        try {
            setLogoutLoading(true);

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
        } catch (error) {
            console.error("Logout API error:", error);
            showAlert(
                "You were logged out locally",
                "warning",
                "Session Expired"
            );
        } finally {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("username");
            Cookies.remove("email");
            Cookies.remove("user_id");
            Cookies.remove("project_id");

            navigate("/signin", {
                state: {
                    alert: {
                        message: "Logged out successfully",
                        severity: "success",
                    },
                },
            });

            setLogoutLoading(false);
        }
    };

    const toggleTheme = () => {
        setThemeMode(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            {/* HEADER */}
            <header
                className={`w-full sticky top-0 z-50 backdrop-blur-xl border-b
                ${theme === "dark"
                        ? "bg-black/40 border-white/10 text-white"
                        : "bg-white/80 border-gray-200 text-black"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">✏️ Logo</div>

                    <nav className="flex gap-2 text-sm font-medium">
                        {[
                            { name: "Dashboard", path: "/dashboard", end: true },
                            { name: "Project", path: "/dashboard/project" },
                            { name: "Setting", path: "/dashboard/setting" },
                        ].map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `px-4 py-1.5 rounded-lg transition
                                    ${isActive
                                        ? theme === "dark"
                                            ? "bg-white/15 text-white"
                                            : "bg-gray-200 text-black"
                                        : theme === "dark"
                                            ? "text-gray-400 hover:text-white hover:bg-white/10"
                                            : "text-gray-500 hover:text-black hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* USER MENU */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm border
                            ${theme === "dark"
                                    ? "bg-white/5 border-white/10 text-white"
                                    : "bg-white border-gray-300 text-gray-700"
                                }`}
                        >
                            {username} <FiUser />
                        </button>

                        {open && (
                            <div
                                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border
                                ${theme === "dark"
                                        ? "bg-[#111] border-white/10"
                                        : "bg-white border-gray-200"
                                    }`}
                            >
                                <button
                                    onClick={() => {
                                        navigate("/dashboard");
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                                >
                                    <FiGrid /> Dashboard
                                </button>

                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        {theme === "dark" ? <FiMoon /> : <FiSun />}
                                        Dark Mode
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`w-11 h-6 rounded-full relative
                                        ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition
                                            ${theme === "dark" ? "translate-x-5" : ""}`}
                                        />
                                    </button>
                                </div>

                                <div className="h-px bg-gray-200 dark:bg-white/10" />

                                <button
                                    onClick={() => {
                                        setShowLogoutConfirm(true);
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* LOGOUT CONFIRM MODAL */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`w-[90%] max-w-sm rounded-2xl p-6
                        ${theme === "dark"
                                ? "bg-[#111] text-white border border-white/10"
                                : "bg-white text-black border border-gray-200"
                            }`}
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
                                disabled={logoutLoading}
                                className="px-4 py-2 rounded-lg border disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                disabled={logoutLoading}
                                className={`px-4 py-2 rounded-lg bg-red-600 text-white
                                flex items-center gap-2
                                ${logoutLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                {logoutLoading && (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}
                                {logoutLoading ? "Logging out..." : "Yes, Logout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔔 ALERT */}
            <AppAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                title={alert.title}
                onClose={() =>
                    setAlert(prev => ({ ...prev, open: false }))
                }
            />
        </>
    );
};

export default Header;
