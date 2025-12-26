import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import { useNavigate } from "react-router-dom";

const NewProjectModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className={`
                    absolute inset-0
                    ${theme === "dark"
                        ? "bg-black/50 backdrop-blur-md"
                        : "bg-black/30 backdrop-blur-sm"
                    }
                `}
                onClick={onClose}
            />

            {/* MODAL */}
            <div
                className={`
                    relative z-10 w-full max-w-md p-8
                    rounded-3xl border backdrop-blur-xl
                    ${theme === "dark"
                        ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                        : "bg-white border-gray-200 text-black shadow-xl"
                    }
                `}
            >
                <h2 className="text-2xl font-semibold text-center mb-8">
                    Project Details
                </h2>

                {/* Project Name */}
                <div className="mb-5">
                    <label
                        className={`text-sm mb-2 block ${theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                            }`}
                    >
                        Project Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Project Name"
                        className={`
                            w-full px-4 py-3 rounded-xl outline-none text-sm
                            border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                                : "bg-gray-50 border-gray-300 text-black placeholder-gray-400"
                            }
                        `}
                    />
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => navigate("/project/workspace")}
                    className="
        w-full py-3 rounded-full font-medium
        bg-white/10 border border-white/20
        hover:bg-white/20 transition
    "
                >
                    Continue
                </button>

            </div>
        </div>
    );
};

export default NewProjectModal;
