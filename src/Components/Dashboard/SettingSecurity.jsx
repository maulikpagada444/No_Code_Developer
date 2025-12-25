import React, { useContext } from "react";
import { FiLock } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const SettingSecurity = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`
                rounded-3xl p-10 border backdrop-blur-xl
                ${theme === "dark"
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }
            `}
        >
            <h2 className="text-lg font-semibold mb-1">
                Account Security
            </h2>

            <p
                className={`text-sm mb-10 ${theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
            >
                Update your profile information and public details
            </p>

            <div className="space-y-6">

                {/* Current Password */}
                <div>
                    <label className="block text-sm mb-2">
                        Current Password
                    </label>
                    <div
                        className={`
                            flex items-center px-4 py-3 rounded-lg border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "border-gray-300"
                            }
                        `}
                    >
                        <FiLock className="mr-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Enter Your Current Password"
                            className={`
                                w-full outline-none text-sm bg-transparent
                                ${theme === "dark"
                                    ? "text-white placeholder-gray-500"
                                    : "text-black placeholder-gray-400"
                                }
                            `}
                        />
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm mb-2">
                        New Password
                    </label>
                    <div
                        className={`
                            flex items-center px-4 py-3 rounded-lg border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "border-gray-300"
                            }
                        `}
                    >
                        <FiLock className="mr-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Enter Your New Password"
                            className={`
                                w-full outline-none text-sm bg-transparent
                                ${theme === "dark"
                                    ? "text-white placeholder-gray-500"
                                    : "text-black placeholder-gray-400"
                                }
                            `}
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm mb-2">
                        Confirm New Password
                    </label>
                    <div
                        className={`
                            flex items-center px-4 py-3 rounded-lg border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "border-gray-300"
                            }
                        `}
                    >
                        <FiLock className="mr-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Enter Your Confirm New Password"
                            className={`
                                w-full outline-none text-sm bg-transparent
                                ${theme === "dark"
                                    ? "text-white placeholder-gray-500"
                                    : "text-black placeholder-gray-400"
                                }
                            `}
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6">
                    <button
                        className={`
                            px-6 py-3 rounded-full font-medium flex items-center gap-2 transition
                            border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/20 hover:bg-white/10"
                                : "border-gray-300 hover:bg-gray-100"
                            }
                        `}
                    >
                        Save Changes ↗
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingSecurity;
