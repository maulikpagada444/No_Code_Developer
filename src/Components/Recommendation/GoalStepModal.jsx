import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";
import Cookies from "js-cookie";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const GoalStepModal = ({ onClose, firstQuestion }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [question, setQuestion] = useState(firstQuestion);
    const [selected, setSelected] = useState(null);
    const [textAnswer, setTextAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [history, setHistory] = useState([]);

    // 🔹 SAFE OPTION LIST (handles all backend formats)
    const optionList =
        question?.options ||
        question?.optional?.options ||
        null;

    // 🔹 OPTION TYPE DETECTION (future proof)
    const isOptionType =
        ["options", "color", "optional", "select"].includes(question?.type) ||
        Array.isArray(optionList);

    const handleContinue = async () => {
        if (!question) return;

        const answer =
            question.type === "text"
                ? textAnswer
                : selected;

        if (!answer) return;

        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                    body: JSON.stringify({
                        session_id: Cookies.get("session_id"),
                        question_id: question.id,
                        answer,
                    }),
                }
            );

            const data = await res.json();
            console.log("⬅️ Next-question response:", data);

            const nextQuestion =
                data?.next_question ||
                data?.questions?.[0] ||
                data?.question ||
                null;

            if (nextQuestion?.id) {
                setHistory(prev => [...prev, question]); // 🔥 save current
                setQuestion(nextQuestion);
                setSelected(null);
                setTextAnswer("");
                return;
            }

            if (data?.completed === true) {
                setIsFinished(true);
                return;
            }

            console.warn("⚠️ Unexpected backend response:", data);

        } catch (err) {
            console.error("❌ Next Question Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        if (history.length === 0) return;

        const prevQuestion = history[history.length - 1];

        setHistory(prev => prev.slice(0, -1)); // last remove
        setQuestion(prevQuestion);
        setSelected(null);
        setTextAnswer("");
    };


    /* ---------------- FINISHED SCREEN ---------------- */
    if (isFinished) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="bg-white rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                        ✅ Setup Completed
                    </h2>
                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-2 border rounded-full hover:bg-black hover:text-white transition"
                    >
                        Go to Workspace
                    </button>
                </div>
            </div>
        );
    }

    if (!question) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                backgroundColor: isDark ? "#000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Header />

            {/* GRID */}
            <div className="absolute inset-0 pointer-events-none
                bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),
                linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
                bg-[size:40px_40px]"
            />

            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
                <div
                    className={`w-full max-w-5xl rounded-[28px] p-12 border backdrop-blur-xl
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        ${isDark
                            ? "bg-black/70 border-white/10 text-white"
                            : "bg-white border-gray-300 text-black"
                        }`}
                >
                    {/* TOP */}
                    <div className="flex justify-between text-xs mb-6 opacity-70">
                        <span>INITIALIZING ENGINE......</span>
                        <span>STEP</span>
                    </div>

                    <div className={`h-px mb-10 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />

                    {/* QUESTION */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold mb-2">
                            {question.question}
                        </h2>
                        {question._topic_label && (
                            <p className="text-sm opacity-70">
                                {question._topic_label}
                            </p>
                        )}
                    </div>

                    {/* OPTIONS / COLOR / OPTIONAL / SELECT */}
                    {isOptionType && optionList && (
                        <div className="grid md:grid-cols-3 gap-10 mb-16">
                            {optionList.map((opt, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelected(opt)}
                                    className={`rounded-2xl p-8 text-center cursor-pointer border transition
                                        ${selected === opt
                                            ? isDark
                                                ? "border-white bg-white/10"
                                                : "border-black shadow-md"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <h3 className="font-medium">{typeof opt === 'object' ? opt.label : opt}</h3>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TEXT INPUT */}
                    {question.type === "text" && (
                        <textarea
                            rows="6"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            className={`w-full rounded-xl border px-5 py-4 mb-16 resize-none bg-transparent outline-none
                                ${isDark ? "border-white/10" : "border-gray-300"}`}
                        />
                    )}

                    {/* YES / NO */}
                    {question.type === "yesno" && (
                        <div className="flex justify-center gap-8 mb-16">
                            {["Yes", "No"].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setSelected(val)}
                                    className={`px-12 py-4 rounded-2xl text-lg font-medium border transition
                                        ${selected === val
                                            ? isDark
                                                ? "bg-white text-black border-white"
                                                : "bg-black text-white border-black"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* FOOTER */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePreview}
                            disabled={history.length === 0}
                            className={`text-sm transition
        ${history.length === 0
                                    ? "opacity-40 cursor-not-allowed"
                                    : isDark
                                        ? "text-white hover:underline"
                                        : "text-black hover:underline"
                                }`}
                        >
                            ← Previews
                        </button>
                        <button
                            disabled={
                                loading ||
                                (question.type === "text" && !textAnswer) ||
                                (question.type !== "text" && !selected)
                            }
                            onClick={handleContinue}
                            className={`px-10 py-2.5 rounded-full border transition
                                ${selected || textAnswer
                                    ? isDark
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                    : "opacity-40 cursor-not-allowed border-gray-400"
                                }`}
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalStepModal;
