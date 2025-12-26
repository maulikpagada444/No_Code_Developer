import React, { useContext, useState } from "react";
import { FiMic } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import GoalStepModal from "./GoalStepModal.jsx";

const ProjectWorkspace = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const [showGoalStep, setShowGoalStep] = useState(false);

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                backgroundColor: isDark ? "#000000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* GRID OVERLAY */}
            <div
                className={`absolute inset-0 pointer-events-none
                ${isDark
                        ? "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
                        : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
                    }
                bg-[size:40px_40px]`}
            />

            {/* HEADER (only when modal closed) */}
            {!showGoalStep && <Header />}

            {/* MAIN */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1">

                {/* FEATURES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-4xl">
                    {["Clear and precise", "Personalized answers", "Increased efficiency"].map(
                        (title, i) => (
                            <div key={i}>
                                <div className="mb-3 text-xl text-gray-400">✦</div>
                                <h3
                                    className={`font-semibold mb-1 ${isDark ? "text-white" : "text-black"
                                        }`}
                                >
                                    {title}
                                </h3>
                                <p
                                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Pariatur sint laborum cillum aute consectetur irure.
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* INPUT */}
                <div className="w-full max-w-2xl">
                    <div
                        className={`flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl
                        ${isDark
                                ? "bg-white/5 border-white/10 text-white"
                                : "bg-white border-gray-300 text-black"
                            }`}
                    >
                        <input
                            placeholder='Example: "Explain quantum computing in simple terms"'
                            className={`flex-1 bg-transparent outline-none text-sm
                            ${isDark ? "placeholder-gray-500" : "placeholder-gray-400"}`}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setShowGoalStep(true);
                                }
                            }}
                        />

                        <button
                            onClick={() => setShowGoalStep(true)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition
                            ${isDark
                                    ? "bg-white/10 text-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "bg-black text-white hover:bg-gray-900"
                                }`}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </main>

            {/* GOAL STEP MODAL */}
            {showGoalStep && (
                <GoalStepModal onClose={() => setShowGoalStep(false)} />
            )}
        </div>
    );
};

export default ProjectWorkspace;
