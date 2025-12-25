import React, { useContext } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const ProjectCard = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`
                rounded-2xl overflow-hidden transition
                backdrop-blur-xl border
                ${theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 hover:shadow-md"
                }
            `}
        >
            {/* Thumbnail */}
            <div
                className={`
                    h-[160px]
                    ${theme === "dark"
                        ? "bg-gradient-to-b from-white/10 to-white/5"
                        : "bg-gradient-to-b from-gray-100 to-gray-200"
                    }
                `}
            />

            {/* Content */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`
                            w-9 h-9 rounded-full flex items-center justify-center border
                            ${theme === "dark"
                                ? "bg-white/10 border-white/20"
                                : "bg-white border-gray-300"
                            }
                        `}
                    >
                        🎮
                    </div>

                    <div>
                        <p className="text-sm font-medium">
                            Portfolio_2024
                        </p>
                        <p
                            className={`text-xs ${theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-400"
                                }`}
                        >
                            edit 1 minute ago
                        </p>
                    </div>
                </div>

                <FiMoreVertical
                    className={`
                        ${theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500"
                        }
                    `}
                />
            </div>
        </div>
    );
};

export default ProjectCard;
