import React, { useState, useContext } from "react";
import Header from "./Header";
import SettingProfile from "./SettingProfile";
import SettingSecurity from "./SettingSecurity";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Setting = () => {
    const [tab, setTab] = useState("profile");
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`
                min-h-screen relative overflow-hidden
                ${theme === "dark"
                    ? "bg-[#0b0b0b] text-white"
                    : "bg-[#fafafa] text-black"
                }
            `}
        >
            {/* GRID BACKGROUND (dark only) */}
            {theme === "dark" && (
                <div
                    className="
                        absolute inset-0 pointer-events-none
                        bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                        linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                        bg-[size:40px_40px]
                    "
                />
            )}

            <Header />

            <div className="relative max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold mb-8">
                    Setting
                </h1>

                {/* Tabs */}
                <div
                    className={`
                        inline-flex p-1 rounded-full border backdrop-blur
                        ${theme === "dark"
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-gray-200"
                        }
                    `}
                >
                    <button
                        onClick={() => setTab("profile")}
                        className={`
                            px-6 py-2 rounded-full text-sm transition
                            ${tab === "profile"
                                ? theme === "dark"
                                    ? "bg-white/10 text-white"
                                    : "bg-gray-200 text-black"
                                : theme === "dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                        `}
                    >
                        Profile
                    </button>

                    <button
                        onClick={() => setTab("security")}
                        className={`
                            px-6 py-2 rounded-full text-sm transition
                            ${tab === "security"
                                ? theme === "dark"
                                    ? "bg-white/10 text-white"
                                    : "bg-gray-200 text-black"
                                : theme === "dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                        `}
                    >
                        Security
                    </button>
                </div>

                {/* Content */}
                <div className="mt-10">
                    {tab === "profile" && <SettingProfile />}
                    {tab === "security" && <SettingSecurity />}
                </div>
            </div>
        </div>
    );
};

export default Setting;
