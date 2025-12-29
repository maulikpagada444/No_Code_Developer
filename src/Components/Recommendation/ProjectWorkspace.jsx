import React, { useContext, useState } from "react";
import { FiMic } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import GoalStepModal from "./GoalStepModal.jsx";
import AppAlert from "../common/AppAlert.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import Cookies from "js-cookie";

const ProjectWorkspace = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [showGoalStep, setShowGoalStep] = useState(false);
    const [language, setLanguage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(null);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    const showAlert = (message, severity = "error", title = "") => {
        setAlert({ open: true, message, severity, title });
    };

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return;

        try {
            setLoading(true);

            const token = Cookies.get("access_token");

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/recommendation/generated_question`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        prompt,
                        language: language || "english",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === false) {
                throw new Error(data?.message || "Generation failed");
            }

            // ✅ Save session id
            if (data.session_id) {
                Cookies.set("session_id", data.session_id);
            }

            // ✅ Set first question
            if (data.questions?.length) {
                setFirstQuestion(data.questions[0]);
                setShowGoalStep(true);
            } else {
                showAlert("No questions generated", "warning");
            }

        } catch (error) {
            console.error("❌ Generate Error:", error);
            showAlert(error.message || "Server not reachable", "error", "Generation Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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

                {!showGoalStep && <Header />}

                {!showGoalStep && (
                    <div className="absolute top-[92px] right-6 z-30">
                        <LanguageSelector
                            theme={theme}
                            value={language}
                            onChange={(lang) => setLanguage(lang)}
                        />
                    </div>
                )}

                {/* MAIN */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-4xl">
                        {["Clear and precise", "Personalized answers", "Increased efficiency"].map(
                            (title, i) => (
                                <div key={i}>
                                    <div className="mb-3 text-xl text-gray-400">✦</div>
                                    <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                                        {title}
                                    </h3>
                                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
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
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder='Example: "Explain quantum computing in simple terms"'
                                disabled={loading}
                                className={`flex-1 bg-transparent outline-none text-sm
                                ${isDark ? "placeholder-gray-500" : "placeholder-gray-400"}`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleGenerate();
                                    }
                                }}
                            />

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition
                                flex items-center gap-2
                                ${isDark
                                        ? "bg-white/10 text-white hover:bg-white hover:text-black"
                                        : "bg-black text-white hover:bg-gray-900"
                                    }
                                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                {loading && (
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                )}
                                {loading ? "Generating..." : "Send"}
                            </button>
                        </div>
                    </div>
                </main>

                {/* GOAL STEP MODAL */}
                {showGoalStep && (
                    <GoalStepModal
                        firstQuestion={firstQuestion}
                        onClose={() => setShowGoalStep(false)}
                    />
                )}
            </div>

            {/* 🔔 ALERT */}
            <AppAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                title={alert.title}
                onClose={() =>
                    setAlert((prev) => ({ ...prev, open: false }))
                }
            />
        </>
    );
};

export default ProjectWorkspace;
