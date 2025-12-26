import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";
import GoalStepModal from "./GoalStepModal.jsx";

// Background images
import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const ProjectWorkspace = () => {
    const { theme } = useContext(ThemeContext);
    const [showGoalStep, setShowGoalStep] = useState(false);

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
                backgroundColor: theme === "dark" ? "#000000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* GRID OVERLAY */}
            <div className="
                absolute inset-0 pointer-events-none
                bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),
                linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                bg-[size:40px_40px]
            " />

            {/* HEADER */}
            <Header />

            {/* MAIN */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1">

                {/* FEATURES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 max-w-4xl">
                    {[
                        "Clear and precise",
                        "Personalized answers",
                        "Increased efficiency",
                    ].map((title, i) => (
                        <div key={i}>
                            <div className="mb-3 text-xl">✦</div>
                            <h3 className="font-semibold mb-1">{title}</h3>
                            <p className="text-sm text-gray-500">
                                Pariatur sint laborum cillum aute consectetur irure.
                            </p>
                        </div>
                    ))}
                </div>

                {/* INPUT */}
                <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border bg-white border-gray-300">
                        <input
                            placeholder='Example: "Explain quantum computing in simple terms"'
                            className="flex-1 bg-transparent outline-none text-sm"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setShowGoalStep(true);
                                }
                            }}
                        />
                        <button
                            onClick={() => setShowGoalStep(true)}
                            className="px-6 py-2 rounded-full bg-black text-white"
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
