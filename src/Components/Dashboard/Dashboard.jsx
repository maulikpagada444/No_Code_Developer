import React, { useContext, useState } from "react";
import Header from "./Header";
import { FiPlus, FiEdit2, FiFolder, FiMic } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import NewProjectModal from "../Recommendation/NewProjectModal.jsx";
/* Reusable Glass Card */
const GlassCard = ({ theme, className = "", children, ...props }) => (
    <div
        {...props}
        className={`
            rounded-3xl border backdrop-blur-xl
            ${theme === "dark"
                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                : "bg-white border-gray-200"
            }
            ${className}
        `}
    >
        {children}
    </div>
);


const Dashboard = () => {
    const { theme } = useContext(ThemeContext);
    const [openNewProject, setOpenNewProject] = useState(false);

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
                        absolute inset-0 z-0 pointer-events-none
                        bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                        linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                        bg-[size:40px_40px]
                    "
                />
            )}

            {/* HEADER */}
            <Header />

            {/* MAIN */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-semibold mb-12">
                    Welcome Back, Demo
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT CARD */}
                    <GlassCard
                        theme={theme}
                        className="p-6 h-[260px] cursor-pointer hover:bg-white/10 transition"
                        onClick={() => setOpenNewProject(true)}
                    >
                        <div
                            className={`
                                w-11 h-11 rounded-lg flex items-center justify-center mb-4
                                ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
                            `}
                        >
                            <FiPlus size={20} />
                        </div>

                        <h2 className="text-lg font-semibold mb-2">
                            New Project
                        </h2>

                        <p
                            className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Lorem ipsum dolor sit amet consectetur. Fringilla pretium malesuada
                            consequat morbi ac pretium sed et nec.
                        </p>
                    </GlassCard>


                    {/* RIGHT CARD */}
                    <GlassCard theme={theme} className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`
                                        w-10 h-10 rounded-lg flex items-center justify-center
                                        ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
                                    `}
                                >
                                    <FiFolder />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Recent Project
                                    </h2>
                                    <p
                                        className={`text-sm ${theme === "dark"
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Resume work on existing builds.
                                    </p>
                                </div>
                            </div>

                            <button
                                className={`
                                    px-4 py-1.5 rounded-lg text-sm transition
                                    border
                                    ${theme === "dark"
                                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                                        : "bg-white border-gray-300 hover:bg-gray-100"
                                    }
                                `}
                            >
                                View All →
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div
                                    key={i}
                                    className={`
                                        flex items-center justify-between
                                        px-6 py-4 rounded-full border transition
                                        ${theme === "dark"
                                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                                            : "bg-white border-gray-200 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`
                                                w-9 h-9 rounded-full flex items-center justify-center
                                                ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
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
                                                Edit 1 minute ago
                                            </p>
                                        </div>
                                    </div>

                                    <FiEdit2
                                        className={
                                            theme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                </div>
            </main>

            {openNewProject && (
                <NewProjectModal onClose={() => setOpenNewProject(false)} />
            )}
            {/* MIC */}
            <div className="
                fixed bottom-10 left-10 z-20
                flex items-center gap-3
            ">
                <div
                    className={`
                        w-12 h-12 rounded-full border backdrop-blur flex items-center justify-center
                        ${theme === "dark"
                            ? "bg-white/10 border-white/20 text-gray-300"
                            : "bg-white border-gray-300 text-gray-600"
                        }
                    `}
                >
                    <FiMic />
                </div>
                <span
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Type, Jarvis Speaks
                </span>
            </div>
        </div>
    );
};

export default Dashboard;
