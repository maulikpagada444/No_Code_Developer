import React, { useContext } from "react";
import { FiUser, FiMail, FiUpload } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const SettingProfile = () => {
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
                Profile Information
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

                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                    <div
                        className={`
                            w-20 h-20 rounded-full border
                            ${theme === "dark"
                                ? "bg-white/10 border-white/20"
                                : "bg-gray-50 border-gray-300"
                            }
                        `}
                    />
                    <button
                        className={`
                            border px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition
                            ${theme === "dark"
                                ? "bg-white/5 border-white/20 hover:bg-white/10"
                                : "hover:bg-gray-100"
                            }
                        `}
                    >
                        <FiUpload />
                        Change Photo
                    </button>
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm mb-2">
                        Username
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
                        <FiUser className="mr-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Your Username"
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

export default SettingProfile;
